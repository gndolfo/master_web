
//Ejercicio 3 JQuery

//Apartado 1

$(document).ready(
	function(){    
    	var enlaces = $("a")
		for (var i in enlaces){
			if (enlaces[i].textContent == "Polémicas aparte"){
				enlaces[i].click();
			}
			
		}
});



//Apartado 2
$(document).ready(
	function(){    
    	$(".article-asset-big.article-asset-image").remove();	
});


//Apartado 3
$(document).ready(
	function(){    
    	$(".article-author-link").text();	
});

//Apartado 4
$(document).ready(
	function(){    
		$('#comments-list').children('.comment-item').last().clone().appendTo("#comments-list");
});