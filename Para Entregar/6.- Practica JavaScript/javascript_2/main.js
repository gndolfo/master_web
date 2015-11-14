//Ejercicio 2 JavaScript

//Apartado 1
var enlaces = document.getElementsByTagName("a");

for(var i in enlaces)
{
	if (enlaces[i].textContent == "Polémicas aparte"){
		enlaces[i].click();
	}
}


//Apartado 2
var contenedor = document.getElementsByClassName("article-normal-header-content")[0];
var contenido = document.getElementsByClassName("article-asset-big article-asset-image")[0];
contenedor.removeChild(contenido);


//Apartado 3
document.getElementsByClassName("article-author-link")[0].textContent

//Apartado 4
var comentarios = document.getElementById("comments-list");
var ultimo = comentarios.lastChild;
var copia = ultimo.cloneNode(true);
comentarios.appendChild(copia);