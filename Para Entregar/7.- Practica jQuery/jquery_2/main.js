$(document).ready(
	function(){    
    	$("#boton1").click(function(){	
	    	$("#elemento2").hide();
    	});
});

$(document).ready(
	function(){    
    	$("#boton2").click(function(){	
			$("#elemento5").css('color', 'red');
    	});
});

$(document).ready(
	function(){    
		var cont=0;
    	$("#boton3").click(function(){	
			if(cont == 0){
			$('#lista2').append('<li><label id="etiqueta7">Cafe</label></li>');
			cont++;
			}
			
    	});
}); 