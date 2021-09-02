//import eurodata from './eurodata.js'

//tettt

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

// dimensions du canevas
let largeur = window.innerWidth*0.6;
let hauteur = window.innerHeight*0.9;

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
	.domain([-6.7,6.7])
	.range([40,largeur-40])

let echelleY = d3.scaleLinear()
	.domain([-6.7,6.7])
	.range([40,hauteur-40]); 

// echelle couleur = position
let echelleF = function(attributeValue){
	if (attributeValue == 1) return "#b3cde3";
	if (attributeValue == 2) return "#fed9a6";
	if (attributeValue == 3) return "#ccebc5";
	if (attributeValue == 4) return "#fbb4ae";
}

// echelle taille = minutes jouées
let echelleR = function(attributeValue){
	return Math.sqrt(attributeValue)/2;
}

// echelle contour = nationalité
let echelleN = function(d,e){
	console.log(d.nationality)
	console.log(e.nationality)
	if (d.nationality == e.nationality) return "3";
	else return "0"
}

// changement de drapeau
let changeFlag = function(e){
	if (e.nationality == "ALL") return "3";
	else return "0"
}





////////////////////////////////////////////////////////////////////////////////////////////
//                                        fonctions                                       //
////////////////////////////////////////////////////////////////////////////////////////////

// coordonnees binaires et remplacement des "NA"
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
	  .attr("r", d => echelleR(d.minsplayed))
	  .attr("stroke", "black")
	  .attr("stroke-width", 0)
//	.on("mouseover", handleMouseOver)
//    .on("mouseout", handleMouseOut)
    .on("click", function(e){
		changeFlag(e)
		canevas.selectAll("circle")
		.data(donnees)
		   .attr("stroke-width",(d)=> echelleN(d,e))
	});
};



//génère l'option de base
generer(eurodata);

// fonction appelée à chaque changement d'option
function modifier(donnees){
  canevas.selectAll("circle")
    .data(donnees)
       .transition()
         .duration(1000)
       .attr("cx",(d)=>echelleX(Number(d[0])))
       .attr("cy",(d)=>echelleY(Number(d[1])))
	   .attr("stroke-width",0);
};


function handleMouseOver(d, i) {  // Add interactivity

    // Use D3 to light the element
    d3.select(this).attr({
        fill: "yellow",
    });

	// Fill the id zone with the players info
	d3.select("#myidzone").attr({
    	
    });
}

function handleMouseOut(d, i) {
    // Use D3 to select element, change color back to normal
    d3.select(this).attr({
    	fill: "blue",
    });

    // Select id zone and then remove the infos from the player
    d3.select("#myidzone").attr({

    });  
}


////////////////////////////////////////////////////////////////////////////////////////////
//                                       bouton                                           //
////////////////////////////////////////////////////////////////////////////////////////////

// créer les labels de positions
let positions = ["toutes positions", "défenseurs", "latéraux", "milieux", "attaquants"]

// init le bouton
let dropdownButton = d3.select("#button")
  .append('select')

// ajoute les options au bouton
dropdownButton
  .selectAll('myOptions')
 		.data(positions)
  .enter()
		.append('option')
  .text(function (d) { return d; }) // texte
  .attr("value", function (d) { return d; }) // valeur

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


