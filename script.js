//import eurodata from './eurodata.js'


////////////////////////////////////////////////////////////////////////////////////////////
//                                        données                                         //
////////////////////////////////////////////////////////////////////////////////////////////

    
// les coordonnées
let d_0 = creer_coords(eurodata, "F0_1", "F0_2");
let d_1 = creer_coords(eurodata, "F1_1", "F1_2");
let d_2 = creer_coords(eurodata, "F2_1", "F2_2");
let d_3 = creer_coords(eurodata, "F3_1", "F3_2");
let d_4 = creer_coords(eurodata, "F4_1", "F4_2");
//document.write(d_0[1])
//document.write(typeof(d_2[0][1]));
	

////////////////////////////////////////////////////////////////////////////////////////////
//                                        canevas                                         //
////////////////////////////////////////////////////////////////////////////////////////////

// dimensions
let largeur = 600;
let hauteur = 600;

// définition du canevas
let canevas = d3.select("#canevas")
	.append("svg")
	.attr("width", largeur)
	.attr("height", hauteur);

canevas.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "#F7F7F4");

// echelles
let echelleX = d3.scaleLinear()
	.domain([-6,6])
	.range([20,largeur-20])

let echelleY = d3.scaleLinear()
	.domain([-6,6])
	.range([20,hauteur-20]); 

let echelleF = function(attributeValue){
	if (attributeValue == 1) return "#b3cde3";
	if (attributeValue == 2) return "#fed9a6";
	if (attributeValue == 3) return "#ccebc5";
	if (attributeValue == 4) return "#fbb4ae";
}

let echelleR = function(attributeValue){
	return attributeValue/50;
}


////////////////////////////////////////////////////////////////////////////////////////////
//                                        fonctions                                       //
////////////////////////////////////////////////////////////////////////////////////////////

// get coords
function creer_coords(data, c1, c2){
	let tableau = [];
	for (let i in data) {
		if(isNaN(data[i][c1])){
			let paire = [(-5.6+1.2*Math.random()),(5.2+0.5*Math.sqrt(Math.random(0.0001,0.0003)))];
			tableau.push(paire)
		}else{
			let paire = [Number(data[i][c1]),Number(data[i][c2])];
			tableau.push(paire)
		}
	}
  return tableau;
}

// fonction pour générer l'option de base toutes positions
function generer(donnees){
  canevas.selectAll("circle")
    .data(donnees)
    .enter()
    .append("circle")
      .attr("cx", d => echelleX(Number(d.F0_1)))
      .attr("cy", d => echelleY(Number(d.F0_2)))
      .attr("fill", d => echelleF(d.position))
	  .attr("r", d => echelleR(d.minsplayed));
};



//génère l'option de base
generer(eurodata);

// fonction appelée à chaque changement d'option
function modifier(donnees){
  canevas.selectAll("circle")
    .data(donnees)
       .transition()
       .attr("cx",(d)=>echelleX(Number(d[0])))
       .attr("cy",(d)=>echelleY(Number(d[1])));
};



////////////////////////////////////////////////////////////////////////////////////////////
//                                       bouton                                           //
////////////////////////////////////////////////////////////////////////////////////////////

// créer les labels de positions
let positions = ["toutes positions", "défenseurs", "latéraux", "milieux", "attaquants"]

// init le bouton
let dropdownButton = d3.select("#button")
  .append('select')

// ajoute les options au bouton
dropdownButton // Add a button
  .selectAll('myOptions')
 		.data(positions)
  .enter()
		.append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) // corresponding value returned by the button

// quand une option est choisie, set transition
dropdownButton.on("change", function(d) {
    
// transitionne vers l'option choisie
  if(d3.select(this).property("value")=="toutes positions"){
		modifier(d_0)};
  if(d3.select(this).property("value")=="défenseurs"){
		modifier(d_1)};
  if(d3.select(this).property("value")=="latéraux"){
		modifier(d_2)};
  if(d3.select(this).property("value")=="milieux"){
		modifier(d_3)};
  if(d3.select(this).property("value")=="attaquants"){
		modifier(d_4)};    
});


