//Ejercicio 3 JavaScript

var goles = document.getElementsByClassName("f")
var maximo = 0;
for(var i in goles)
{
	if (i != 0){
		if (parseInt(goles[i].textContent) > maximo){
			maximo = parseInt(goles[i].textContent);
		}
	}
}

console.log("El número máximo de goles a Favor es: "+maximo);

for(var i in goles)
{
	if (i != 0){
		if (parseInt(goles[i].textContent) == maximo){
			var padre = goles[i].parentNode;
			var nombre = padre.getElementsByTagName("td")[0].getElementsByTagName("img")[0].getAttribute("alt");
			console.log("Máximos goleadores: "+nombre);
			
		}
	}
}