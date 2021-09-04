////////////////////////////////////////////////////////////////////////////////////////////
//                                        données                                         //
////////////////////////////////////////////////////////////////////////////////////////////

// importation eurodata de './eurodata.js'

// traitement du tableau - ajout de coordonnées artificielles lorsque les joueurs n'ont pas de position
let coordnames = ["F0_1", "F0_2", "F1_1", "F1_2", "F2_1", "F2_2", "F3_1", "F3_2", "F4_1", "F4_2"]

eurodata = add_default_position(eurodata)

function add_default_position(data){
	for (let i in data) {
		for (let j in coordnames) {
			let Factor = coordnames[j]
			if(isNaN(data[i][Factor])){
				if (j % 2 == 0){
					data[i][Factor] = [(-6.1+2*Math.random())];
				}
				else data[i][Factor] = [5.2+0.5*Math.sqrt(Math.random())]
			}
		}
	}
	return data
}

////////////////////////////////////////////////////////////////////////////////////////////
//                                        canevas                                         //
////////////////////////////////////////////////////////////////////////////////////////////

// dimensions du canevas
let largeur = window.innerWidth*0.6;
let hauteur = window.innerHeight*0.8;

// définition du canevas
let canevas = d3.select("#canevas")
	.append("svg")
	.attr("width", "100%")
	.attr("height", "100%");

// rectangle de travail
canevas.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
	.attr("fill","transparent")
	.attr("stroke", "#000000")
	.attr("stroke-width", "1px");

// axe vertical
canevas.append("line")
	.attr("x1", `${(window.innerWidth*0.3 - 20)}`)
	.attr("y1", "0%")
	.attr('x2', `${(window.innerWidth*0.3 - 20)}`)
	.attr("y2", "100%")
	.attr("stroke-width", 1)
	.attr("stroke", "black");

// axe horizontal
canevas.append("line")
	.attr("x1","0%")
	.attr("y1", `${(window.innerHeight*0.4 + 20)}`)
	.attr('x2', "100%")
	.attr("y2", `${(window.innerHeight*0.4 + 20)}`)
	.attr("stroke-width", 1)
	.attr("stroke", "black");

// label supérieur
canevas.append("text")
	.attr("y", 20)
	.attr("x", `${(window.innerWidth*0.3 - 20)}`)
	.attr('text-anchor', 'middle')
	.text("Puissant")
	.attr("id", "valueUp");

// label droit	
canevas.append("text")
	.attr("y", `${(window.innerHeight*0.4 + 25)}`)
	.attr("x", `${(window.innerWidth*0.6 - 100)}`)
	.attr('transform-origin', 'top right')
	.attr('right', '0')
	.attr('transform', 'rotate(90)')
	.attr('transform', 'translate(50,0)')
	.text("Offensifhhhhhhh")
	.attr("id", "valueRight");

// label bas	
canevas.append("text")
	.attr("y", `${(window.innerHeight*1 - 80)}`)
	.attr("x", `${(window.innerWidth*0.3 - 20)}`)
	.attr('text-anchor', 'middle')
	.text("Nul")
	.attr("id", "valueBottom");

// label gauche	
canevas.append("text")
	.attr("y", `${(window.innerHeight*0.4 + 25)}`)
	.attr("x", 20)
	.text("Défensif")
	.attr("id", "valueLeft");	

// banc	
let img = canevas.append("svg:image")
    .attr("xlink:href", "bench.svg")
	.attr("x", `${((40+(6.7-5.6)/13.4))}`)
    .attr("y",`${((window.innerHeight*0.8-40))}`)
	.attr("transform", `scale(${(2.5/13.4)*window.innerWidth*0.6/100}, 1)`);

// échelles de coordonnées
let echelleX = d3.scaleLinear()
	.domain([-6.7,6.7])
	.range([40,window.innerWidth*0.6-40])

let echelleY = d3.scaleLinear()
	.domain([-6.7,6.7])
	.range([40,window.innerHeight*0.9-40]); 

// échelle de couleur selon la position
let echelleF = function(attributeValue){
	if (attributeValue == 1) return "#b3cde3";
	if (attributeValue == 2) return "#fed9a6";
	if (attributeValue == 3) return "#ccebc5";
	if (attributeValue == 4) return "#fbb4ae";
}

// échelle de rayon selon le temps de jeu
let echelleR = function(attributeValue){
	return Math.sqrt(attributeValue)/2; // non linéaire pour une meilleure représentation
}

// échelle de contour selon la nationalité
let echelleN = function(d,e){
	if (d.nationality == e.nationality) return "3";
	else return "0"
}

////////////////////////////////////////////////////////////////////////////////////////////
//                                        fonctions                                       //
////////////////////////////////////////////////////////////////////////////////////////////

// fonction pour changer les coordonnees en fonction de la position choisie
let changeCoord = function(d,value,j){
	if (j == "1"){
		if (value=="toutes positions") return d.F0_1;
		if (value=="défenseur") return d.F1_1;
		if (value=="latéral") return d.F2_1;
		if (value=="milieu") return d.F3_1;
		if (value=="attaquant") return d.F4_1;
	}
	if (j == "2"){
		if (value=="toutes positions") return d.F0_2;
		if (value=="défenseur") return d.F1_2;
		if (value=="latéral") return d.F2_2;
		if (value=="milieu") return d.F3_2;
		if (value=="attaquant") return d.F4_2;
	}
}

// fonction pour générer l'option de base (toutes positions) & implémenter les interactions
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

	.on("mouseover", function(e){
		this.setAttribute('fill', '#ff00cc');
		buildimg = `playersphotos/${e.names}.jpg`;
		document.querySelector('#valueImg').setAttribute('src', buildimg)
		document.querySelector('#valueName').innerHTML = e.names
		document.querySelector('#valuePays').innerHTML = countryname(e)
		document.querySelector('#valuePosition').innerHTML = positions[e.position]
		document.querySelector('#valueGoals').innerHTML = e.goals
		document.querySelector('#valueAssists').innerHTML = e.assists
		document.querySelector('#valueMinutes').innerHTML = e.minsplayed + " mn";
		document.querySelector('#valueCompleted').innerHTML = Math.round(e.completed*100) + "%";
	})

	.on("mouseout", function(e){
		document.querySelector('#valueImg').setAttribute('src', "")
		this.setAttribute('fill', echelleF(e.position));
		document.querySelector('#valueName').innerHTML = "NOM DU JOUEUR"
		document.querySelector('#valuePays').innerHTML = ""
		document.querySelector('#valuePosition').innerHTML = ""
		document.querySelector('#valueGoals').innerHTML = ""
		document.querySelector('#valueAssists').innerHTML = ""
		document.querySelector('#valueMinutes').innerHTML = ""
		document.querySelector('#valueCompleted').innerHTML = "%"
	})

    .on("click", function(e){
    	if(document.querySelector('#flag').getAttribute("src") == `flags/${e.nationality}.svg`){
    		document.querySelector('#flag').removeAttribute("src")
    		document.querySelector('#nationality').innerHTML = "Cliquez sur un cercle pour afficher la nationalité du joueur"
    		canevas.selectAll("circle")
				.data(donnees)
					.attr("stroke-width", 0)
    	}else{
    		buildimg = `flags/${e.nationality}.svg`;
			document.querySelector('#flag').setAttribute('src', buildimg);
			document.querySelector('#nationality').innerHTML = countryname(e)
			canevas.selectAll("circle")
				.data(donnees)
		   			.attr("stroke-width",(d)=> echelleN(d,e))
    	}	
	});
};

//génère l'option de base
generer(eurodata);

// changement de coordonnées
function modifier(donnees,value){ 
  canevas.selectAll("circle")
    .data(donnees)
       .transition()
         .duration(1000)
       .attr("cx",(d)=>echelleX(Number(changeCoord(d,value,"1"))))
	   .attr("cy",(d)=>echelleY(Number(changeCoord(d,value,"2"))))
	   //.attr("stroke-width",0);
};


////////////////////////////////////////////////////////////////////////////////////////////
//                                       bouton                                           //
////////////////////////////////////////////////////////////////////////////////////////////

// créer les labels de positions
let positions = ["toutes positions", "défenseur", "latéral", "milieu", "attaquant"]

// init le bouton
let dropdownButton = d3.select("#button")
  .append('select')

// ajouter les options au bouton
dropdownButton
  .selectAll('myOptions')
 		.data(positions)
  .enter()
		.append('option')
  .text(function (d) { return d; }) // texte
  .attr("value", function (d) { return d; }) // valeur

// quand une option est choisie, set transition
dropdownButton.on("change", function() {
	console.log(d3.select(this).property("value"));
	let value = d3.select(this).property("value");
	modifier(eurodata,value);
	if (value=="toutes positions"){
		document.querySelector('#valueDim1').innerHTML     = "sdfsdf";
		document.querySelector('#valueDim2').innerHTML     = "sdfsfgfssdf";
		document.querySelector('#valueUp').innerHTML       = "sdfsdf";
		document.querySelector('#valueRight').innerHTML    = "Offensif";
		document.querySelector('#valueBottom').innerHTML   = "sdfsdf";
		document.querySelector('#valueLeft').innerHTML     = "Défensif";		
	}
	if (value=="défenseur"){
		document.querySelector('#valueDim1').innerHTML     = "sgnhtgrf";
		document.querySelector('#valueDim2').innerHTML     = "mznthrgbefv";
		document.querySelector('#valueUp').innerHTML       = "sdfsdf";
		document.querySelector('#valueRight').innerHTML    = "sdfsfgfssdf";
		document.querySelector('#valueBottom').innerHTML   = "sdfsdf";
		document.querySelector('#valueLeft').innerHTML     = "sdfsfgfssdf";	
	}
	if (value=="latéral"){
		document.querySelector('#valueDim1').innerHTML     = "evfwdcvfeb";
		document.querySelector('#valueDim2').innerHTML     = "kintbgr";
		document.querySelector('#valueUp').innerHTML       = "sdfsdf";
		document.querySelector('#valueRight').innerHTML    = "sdfsfgfssdf";
		document.querySelector('#valueBottom').innerHTML   = "sdfsdf";
		document.querySelector('#valueLeft').innerHTML     = "sdfsfgfssdf";	
	}
	if (value=="milieu"){
		document.querySelector('#valueDim1').innerHTML     = "wefrbtrgfv";
		document.querySelector('#valueDim2').innerHTML     = "wefrg";
		document.querySelector('#valueUp').innerHTML       = "sdfsdf";
		document.querySelector('#valueRight').innerHTML    = "sdfsfgfssdf";
		document.querySelector('#valueBottom').innerHTML   = "sdfsdf";
		document.querySelector('#valueLeft').innerHTML     = "sdfsfgfssdf";	
	}
	if (value=="attaquant"){
		document.querySelector('#valueDim1').innerHTML     = "thzjuzh";
		document.querySelector('#valueDim2').innerHTML     = "fdbgnzj";
	}
});


