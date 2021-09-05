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
1. Gestion des données
* Récolte des données : extraction des données statistiques des joueurs produites par The Analyst obtenues à l'adresse https://theanalyst.com/eu/2021/06/euro-2020-player-stats/
* Pré-traitement des données : retrait des joueurs ayant joué moins de 90mn ; attribution manuelle des nationalités et positions de joueurs (pour les position : _insérer procédure_)
* Traitement des données : construction de variables rapportées à la minute (par exemple : goals -> goals/minute) ; transformation (racine carrée) des variables pour tendre vers des distributions normales
* Observation des corrélations : vérification du niveau de corrélation entre les variables

2. Analyse en composantes principales (ACP)
* 1 ACP sur l'entier des joueurs : ACP brute menée sur une sélection de variables estimées pertinentes, puis méthode itérative pour retirer les variables sur la base des indices KMOs (la variable ayant l'indice KMO le plus faible est retirée du jeu de variables) jusqu'à que les indices KMOs soient suffisamment élevés
* 4 ACPs pour chaque position, suivant la même procédure
* Observation des ACPs : si besoin est, rotation varimax ass


La base de données (récolte, analyse statistique, export)
2. Le canvas (SVG, html)
3. Intégrer la base de donnée dans le projet
4. Les interractions utilisateur (JS)
5. La mise en page (html/CSS)

## Données
_ici intégrer une description plus complète du making des données, ainsi que des stats effectuées_

## Difficultés techniques
_décrire ces éléments_
* Conception de la base de données
* Photos des joueurs
* Mise en page HTML/CSS

## Améliorations possibles
_décrire les améliorations possibles_

## Conclusions
* On a dead ça franchement
* 2
* 3
