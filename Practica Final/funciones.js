/*
	Funciones JS usando el API de Parse	
*/
	
var accion = "A";


//Inicializamos la comunicación con Parse
Parse.initialize("D6tEXoUinkIU6knB0utAgcok169FfzbgMYO3DUMk", "GAV1qGELzIL1BDraCAMPNiNWTdUP4rZr8agnxxlO");

//Invoca a la función Listar para refrescar la tabla.
Listar();


//Asigna el comportamiento al boton de Guardar.
$("#formularioClientes").bind("submit",function(){		
	if(accion == "A"){
		alert("hola");
		return Nuevo();
	}else{
		return Modificar();
		}
});

//Asigna el comportamiento del botón Modificar
/*$(".modificar").bind("click", function(){

	accion = "E";
	indice = parseInt($(this).attr("alt").replace("Modificar", ""));
	location.href='formulario.html';
	var cliente = JSON.parse(tablaClientes[indice]);
	$("#nombre").val(cliente.Nombre),
	$("#apellido1").val(cliente.Apellido1),
	$("#apellido2").val(cliente.Apellido2),
	$("#direccion").val(cliente.Direccion),
	$("#cpostal").val(cliente.CodigoPostal),
	$("#provincia").val(cliente.Provincia),
	$("#fechaAlta").val(cliente.fechaAlta)
	$("#cpostal").focus();
});
*/


//Funcion encargada de añadir una nueva tupla con la información del cliente
function Nuevo(){
	
	//alert("Funcion Nuevo()");
	var Clientes = Parse.Object.extend("Clientes");
	var cliente = new Clientes();


	cliente.set("nombre", $("#nombre").val());
	cliente.set("apellido1", $("#apellido1").val());
	cliente.set("apellido2", $("#apellido2").val());
	cliente.set("direccion", $("#direccion").val());
	cliente.set("cpostal", parseInt($("#cpostal").val()));
	cliente.set("provincia", $("#provincia").val());
	
	if($("#fechaAlta").val()!=""){
		cliente.set("fechaAlta", new Date($("#fechaAlta").val()));
	}
	
	cliente.save(null, {
			
	  success: function(cliente) {
	    location.href='index.html';
	    //alert('Nuevo Objeto creado con objectId: ' + cliente.id);
	  },
	  error: function(cliente, error) {

	    alert('Error al crear nuevo objeto con ErrorCode: ' + error.message);
	  }
	});
}

//Funcion encargada de generar dinámicamente la tabla de clientes
function Listar(){
	
	var Clientes = Parse.Object.extend("Clientes");
	var query = new Parse.Query(Clientes);
	//query.equalTo("playerName", "Dan Stemkoski");
	query.find({
	  success: function(resultados) {
		  
	    //alert("Se han encontrado " + resultados.length + " resultados.");

	    $("#listaClientes").html("");
		$("#listaClientes").html(
			"<thead>"+
			"	<tr>"+
			"	<th>ID</th>"+
			"	<th>Nombre</th>"+
			"	<th>Apellido 1</th>"+
			"	<th>Apellido 2</th>"+
			"	<th>Direccion</th>"+
			"	<th>Codigo Postal</th>"+
			"	<th>Provincia</th>"+
			"	<th>Fecha Alta</th>"+
			"	<th></th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);
		for(var i in resultados){
			var cliente = resultados[i];
			var nombre = cliente.get("nombre");
			var apellido1 = cliente.get("apellido1");
			var apellido2 = cliente.get("apellido2");
			var direccion = cliente.get ("direccion");
			var cpostal = cliente.get("cpostal");
			var provincia = cliente.get("provincia");
			var fechaAlta = cliente.get("fechaAlta");
		  	$("#listaClientes tbody").append("<tr>"+
										 "	<td>"+cliente.id+"</td>" + 
										 "	<td>"+nombre+"</td>" + 
										 "	<td>"+apellido1+"</td>" + 
										 "	<td>"+apellido2+"</td>" + 
										 "	<td>"+direccion+"</td>" + 
										 "	<td>"+cpostal+"</td>" + 
										 "	<td>"+provincia+"</td>" + 
										 "	<td>"+fechaAlta+"</td>" + 
										 "	<td><button onclick='Modificar("+i+");' alt='Modificar"+i+"' class='modificar'><img src='recursos/modificar.png'/></button><button onclick='Borrar("+i+");' alt='Borrar"+i+"' class='borrar'><img src='recursos/borrar.png' /></button></td>" + 
		  								 "</tr>");
		}
	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
}

//Funcion encargada de borrar la tupla seleccionada.
function Borrar(indice){
	
	var idTupla = document.getElementsByTagName("tr")[indice+1].getElementsByTagName("td")[0].textContent;
	
	var Clientes = Parse.Object.extend("Clientes");
	var query = new Parse.Query(Clientes);
	query.get(idTupla, {
	  success: function(cliente) {
	    cliente.destroy({
		    success: function(cliente) {
		    //alert("El elemento "+ idTupla + " se ha eliminado correctamente");
		    Listar();
		  },
		  error: function(cliente, error) {
		    alert("Error: "+error+" al eliminar el elemento: "+idTupla);
		  }
	    });
	  },
	  error: function(object, error) {
	    alert("Error recuperando el objeto");
	  }
	});
}

//Funcion encargada de modificar la tupla seleccionada. 
function Modificar(indice){
	//alert("modificar");
	
	accion = "E";
	alert("Que modificas el elemento " + indice + " RAPAZ!");
	//indice = parseInt($(this).attr("alt").replace("Modificar", ""));
	//var texto = this.alt;
	
	//location.href='formulario.html';
	//$("#cpostal").focus();
}
