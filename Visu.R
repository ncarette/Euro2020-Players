### PROJET DE VISUALISATION : ANALYSE FACTORIELLE DE LA PERFORMANCE DES JOUEURS A L'EURO 2020


#============================================================================================================== 

# 0. Packages

library(tidyverse)                      # traitement de base de données (tibble)
library(psych)                          # fonctions relatives à l'ACP
library(factoextra)                     # fonctions relatives à l'ACP
library(FactoMineR)                     # fonctions relatives à l'ACP
library(stringr)                        # traitement textuel
library(rjson)                          # conversion en JSON
library(jsonlite)                       # exportation en JSON


#============================================================================================================== 

# 1. Données

# importation des données
eurodata <- read.csv2("Data_EURO.csv",header=TRUE,sep=",")

# mise en forme des variables
eurodata[,4:25] <- apply(eurodata[,4:25],2,function(x) as.numeric(as.character(x)))
eurodata[,2] <- as.character(eurodata[,2])

# duplication du tableau pour conserver données brutes avant traitement (nécessaire pour étape finale)
EURODATA <- eurodata

# calcul des variables "à la minute"
eurodata[,-c(1,2,3,4,13,17,18)] <- eurodata[,-c(1,2,3,4,13,17,18)]/eurodata[,4]

# normalisation des variables trop skewed via sqrt()
eurodata[,c(5:12,14:15,19:22,24:25)] <- apply(eurodata[,c(5:12,14:15,19:22,24:25)],2,function(x) sqrt(x))


#============================================================================================================== 

# 2. Analyses

# corrélations
cor_euro <- cor(eurodata[,4:25])
corPlot(eurodata[,4:25])

# ACPs
# 5 ACPs sont proposées : 1 ACP globale (0), 4 ACPs portant sur les différentes position des joueurs
# à partir des variables disponibles, une sélection itérative a été conduite sur la base des indices KMOs
# ainsi, les variables finales pour chaque ACP doivent relever d'une certaine pertinence pour discriminer les joueurs

# ACPs
pca_euro_0 <- PCA(eurodata[,c(5,7:13,15,16,23,25)])                              # p = 12 [! rotation -> axe offense-défense?]
pca_euro_1 <- PCA(eurodata[eurodata$position=="1",c(9,11:13,15,21,23,25)])       # p = 8
pca_euro_2 <- PCA(eurodata[eurodata$position=="2",c(5:6,8,10,12,19,23:25)])      # p = 9
pca_euro_3 <- PCA(eurodata[eurodata$position=="3",c(5:11,18,21,23,25)])          # p = 11
pca_euro_4 <- PCA(eurodata[eurodata$position=="4",c(5:6,9,11,13,18:21,23,25)])   # p = 11

# KMOs
KMO(eurodata[,c(5,7:13,16,23,25)])
KMO(eurodata[eurodata$position=="1",c(9,11:13,15,21,23,25)])                     # [int conservé malgré KMO relativement faible]
KMO(eurodata[eurodata$position=="2",c(5:6,8,10,12,19,23:25)])
KMO(eurodata[eurodata$position=="3",c(5:11,18,21,23,25)])
KMO(eurodata[eurodata$position=="4",c(6,9,11,13,18:19,21,23,25)])

# ACPs (version plus complète, avec visualisation des individus & leurs attributs)
pca_euro <- prcomp(eurodata[,c(5,7:13,15,16,23:25)], scale = TRUE)
fviz_pca_biplot(pca_euro,geom = c("point","text"), pointsize = eurodata[,4], col.ind = eurodata[,2])
# [! rotation manifestement nécessaire pour obtenir des composantes plus sensées (cf étape suivante)]
pca_euro <- prcomp(eurodata[eurodata$position=="1",c(9,11:13,15,21,23,25)], scale = TRUE)
fviz_pca_biplot(pca_euro,geom = c("point","text"),pointsize = eurodata[eurodata$position=="1",4])
pca_euro <- prcomp(eurodata[eurodata$position=="2",c(5:6,8,10,12,19,23:25)], scale = TRUE)
fviz_pca_biplot(pca_euro,geom = c("point","text"),pointsize = eurodata[eurodata$position=="2",4])
pca_euro <- prcomp(eurodata[eurodata$position=="3",c(5:11,18,21,23,25)], scale = TRUE)
fviz_pca_biplot(pca_euro,geom = c("point","text"),pointsize = eurodata[eurodata$position=="3",4])
pca_euro <- prcomp(eurodata[eurodata$position=="4",c(6,9,11,13,18:19,21,23,25)], scale = TRUE)
fviz_pca_biplot(pca_euro,geom = c("point","text"),pointsize = eurodata[eurodata$position=="4",4])

# rotation (ACP globale)
pca_euro_rotated <- psych::principal(eurodata[,c(5,7:13,15,16,23:25)], rotate="varimax", nfactors=2, scores=TRUE)
rotmat <- pca_euro_rotated$rot.mat # matrice à appliquer aux scores factoriels de l'ACP globale


#==============================================================================================================

# 3. Génération des données finales

# extraction des scores factoriels pour chaque ACP
euro_0 <- as.tibble(cbind(eurodata[,1],(t(rotmat%*%t(pca_euro_0$ind$coord[,1:2])))))
euro_1 <- cbind(eurodata[eurodata$position=="1",1],(pca_euro_1$ind$coord[,1:2]))    
euro_2 <- cbind(eurodata[eurodata$position=="2",1],(pca_euro_2$ind$coord[,1:2]))    
euro_3 <- cbind(eurodata[eurodata$position=="3",1],(pca_euro_3$ind$coord[,1:2]))    
euro_4 <- cbind(eurodata[eurodata$position=="4",1],(pca_euro_4$ind$coord[,1:2]))    

# nom des variables de scores factoriels
colnames(euro_0) <- c("names","F0_1","F0_2")
colnames(euro_1) <- c("names","F1_1","F1_2")
colnames(euro_2) <- c("names","F2_1","F2_2")
colnames(euro_3) <- c("names","F3_1","F3_2")
colnames(euro_4) <- c("names","F4_1","F4_2")

# matrice des scores factoriels par jointures successives
eurodata_f <- left_join(euro_0,euro_1,by = "names",copy = TRUE) %>%
              left_join(euro_2,by = "names",copy = TRUE) %>%
              left_join(euro_3,by = "names",copy = TRUE) %>%
              left_join(euro_4,by = "names",copy = TRUE)

# agrégation des données en un tableau unique
EURODATA_JS <- left_join(EURODATA[,c(1:4,7,10,13)],eurodata_f,by = "names")
rownames(EURODATA_JS) <- c(1:313)

# conversion des données en format JSON et exportation
EURODATA_JS <- rjson::toJSON(unname(split(EURODATA_JS, 1:nrow(EURODATA_JS))))  # dataframe -> json, "illisible"
EURODATA_JS <- fromJSON(EURODATA_JS)                                           # json -> dataframe
EURODATA_JS <- jsonlite::toJSON(EURODATA_JS, pretty = TRUE)                    # dataframe -> json propre
write(EURODATA_JS, "eurodata.json")


min(as.numeric(eurodata_f$F4_1),na.rm = TRUE)
max(as.numeric(eurodata_f$F4_2),na.rm = TRUE)






