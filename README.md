# Euro2020-Players

Projet pour le cours de Visualisation de Données, SLI - Faculté des lettres, UNIL, printemps 2021.

_intégrer un screenshot de base_

## Auteurs
Maxime Carron (pour le Master en Analyse spatiale, faculté des GéoSciences et de l'Environnement, UNIL)

Noé Carette (pour le Master en Informatique pour les sciences humaines, faculté des Lettres, UNIL)

## Description et objectifs
L'objectif de ce projet est de produire une visualisation web de la perfomance individuelle des joueurs ayant participé au Championnat d'Europe de Football (Euro2020) qui a eu lieu en été 2021, en utilisant la librairie Javascript D3.js. Les principaux objectifs visés sont les suivants :
* à partir d'un jeu de variables, produire une analyse en composantes principales permettant de représenter la performance et le style des joueurs
* visualiser les données obtenues de l'ACP de manière réfléchie, de sorte à les rendre accessible au grand public
* proposer une série de fonctionnalités pour explorer les données de manière simple et ludique

_ici intégrer des screens et une description détaillée des events possibles, etc)_

## Étapes du développement
1. Gestion des données (Excel)
* Récolte des données : extraction des données statistiques des joueurs produites par The Analyst obtenues à l'adresse https://theanalyst.com/eu/2021/06/euro-2020-player-stats/
* Prétraitement des données : retrait des joueurs ayant joué moins de 90mn ; attribution manuelle des nationalités et positions de joueurs (pour les position : _insérer procédure_)

2. Préparation des données en vue de l'ACP (R)
* Traitement des données : attribution de la nature des variables (numeric ou character)
* Génération de variables : construction d'indicateurs en rapportant certaines variables brutes à la minute (par exemple : goals -> goals/minute) ; transformation (racine carrée) des variables pour tendre vers des distributions normales
* Observation des corrélations : vérification du niveau de corrélation entre les variables

3. Analyse en composantes principales (R)
* 1 ACP sur l'entier des joueurs : ACP brute menée sur une sélection de variables estimées pertinentes, puis méthode itérative pour retirer les variables sur la base des indices KMOs (la variable ayant l'indice KMO le plus faible est retirée du jeu de variables) jusqu'à que les indices KMOs soient suffisamment élevés
* 4 ACPs pour chaque position, suivant la même procédure
* Observation des ACPs : interprétation des 2 premiers facteurs selon les saturations des différentes variables ; si besoin est, rotation varimax sur les 2 premières dimensions afin de rendre les axes interprétables

4. Génération des données finales (R)
* Jointure des différentes ACPs et des données de joueurs nécessaires
* Conversion et exportation en JSON

5. Initialisation du canevas (SVG, html, javascript)
* Génération du canevas : plan devant faire figurer les individus dans l'espace des facteurs
* Intégration des éléments principaux : axes ; labels d'axes ; banc (SVG)
* Intégration des joueurs : cercles individuels initialement positionnés selon l'ACP "toutes positions" ; couleur selon position ; taille selon minutes jouées

6. Initialisation des éléments de légendes (SVG, html)
* Légende des couleurs selon la position (SVG)
* Légende du profil des joueurs : cadre photo, tableau avec données principales
* Légende des explications d'axes
* Légende des nationalités

7. Génération d'éléments supplémentaires (html)
* Sources et auteurs
* Interrupteur "info"

8. Téléchargement des photos/éléments 
* téléchargement manuel des photos de joueurs à partir du site _insérer site_
* téléchargement des drapeaux de nationalités (SVG) à partir du site _insérer site_

9. Les interactions utilisateur (JS)
* bouton : change -> alterner entre les différentes ACP
* cercle : mouseover -> mise en évidence ; affichage photo et données du joueur
* cercle : click -> affichage nationalité ; mise en évidence des joueurs de même nationalité
* interrupteur : click -> affichage bulle d'informations générales

10. Gestion des styles et de la mise en page (CSS, html)
* Arrangement des différents éléments sur la page
* Peaufinement de l'esthétique : cadres, couleurs, épaisseurs de trait, police...

## Difficultés techniques
* La production des données a été rendue compliquée par la distribution des variables, ce qui a imposé une réflexion quant à la transformation adéquate
* Malgré une procédure de sélection de variables assez rigoureuse, une place a dû être laissée à la subjectivité : notamment, une variable a été retenue dans une ACP en dépit de son indice KMO faible, comme elle semblait révéler sur la tactique des joueurs
* La gestion des styles CSS et de la hiérarchie des <div> dans le html a posé de grandes difficultés et de nombreuses incompréhensions, ce qui a parfois demandé des réorganisations plus ou moins drastiques
* La procédure manuelle pour l'extraction des photos de joueurs s'est avérée relativement longue

## Améliorations possibles
* Un affichage intelligent des saturations de variables les plus importantes pour chaque ACP pourrait être envisageable, bien que le risque de surcharger l'information et de perdre l'internaute soit à considérer (cela rendrait le processus plus transparent)
* L'ajout d'une répulsion des cercles qui se superposent permet d'éviter des chevauchements potentiellement gênants
* L'esthétique générale pourrait gagner à être légèrement revisitée

## Conclusions
_insérer conclusion_
