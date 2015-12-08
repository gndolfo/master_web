/*
	Funciones JS usando el API de Parse	
*/
$(function(){
	
	var accion = "A";
	var indice = -1;
	
	//Inicializamos la comunicación con Parse
	Parse.initialize("D6tEXoUinkIU6knB0utAgcok169FfzbgMYO3DUMk", "GAV1qGELzIL1BDraCAMPNiNWTdUP4rZr8agnxxlO");

	//Invoca a la función Listar para refrescar la tabla.
	Listar();
	
	
	//Asigna el comportamiento al boton de Guardar.
	$("#formularioClientes").bind("submit",function(){		
		if(accion == "A")
			return Nuevo();
		else
			return Modificar();
	});
	
	//Asigna el comportamiento del botón Modificar
	$(".modificar").bind("click", function(){
	
		accion = "E";
		indice = parseInt($(this).attr("alt").replace("Modificar", ""));
		
		var cliente = JSON.parse(tablaClientes[indice]);
		$("#nombre").val(cliente.Nombre),
		$("#apellido1").val(cliente.Apellido1),
		$("#apellido2").val(cliente.Apellido2),
		$("#direccion").val(cliente.Direccion),
		$("#cpostal").val(cliente.CodigoPostal),
		$("#provincia").val(cliente.Provincia),
		$("#fechaAlta").val(cliente.fechaAlta)
		$("#nombre").focus();
	});
	
	//Asigna el comportamiento del botón Borrar
	$(".borrar").bind("click", function(){
		indice = parseInt($(this).attr("alt").replace("Borrar", ""));
		Borrar();
		Listar();
	});
	
	
	
	
	
	
	//Funcion encargada de añadir una nueva tupla con la información del cliente
	function Nuevo(){
			//alert("funcion nuevo");
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
			
			/*cliente.save({
				nombre        : $("#nombre").val(),
				apellido1     : $("#apellido1").val(),
				apellido2     : $("#apellido2").val(),
				direccion     : $("#direccion").val(),
				cpostal 	  : parseInt($("#cpostal").val()),
				provincia     : $("#provincia").val(),
				fechaAlta	  : fAlta//new Date($("#fechaAlta").val())
			}, {
					
			  success: function(cliente) {
			    // Execute any logic that should take place after the object is saved.
			    location.href='index.html';
			    //alert('Nuevo Objeto creado con objectId: ' + cliente.id);
			  },
			  error: function(cliente, error) {
			    // Execute any logic that should take place if the save fails.
			    // error is a Parse.Error with an error code and message.
			    alert('Error al crear nuevo objeto con ErrorCode: ' + error.message);
			  }
			});*/
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
				var direccion = cliente.get ("direcion");
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
											 "	<td><img src='recursos/modificar.png' alt='Modificar"+i+"' class='modificar'/><img src='recursos/borrar.png' alt='Borrar"+i+"' class='borrar'/></td>" + 
			  								 "</tr>");
			}
		  },
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
		});
	}
	
	//Funcion encargada de borrar la tupla seleccionada.
	function Borrar(){
		
	}
	
	//Funcion encargada de modificar la tupla seleccionada. 
	function Modificar(){
	
	}
});
/*$(function(){
	var accion = "A";
	var indice = -1;
	var tablaClientes = localStorage.getItem("tablaClientes");
	tablaClientes = JSON.parse(tablaClientes);
	if(tablaClientes == null){
		tablaClientes = [];
	}

	//Funcion encargada de añadir una nueva tupla con la información del cliente
	function Nuevo(){
		var cliente = JSON.stringify({
			Nombre        : $("#nombre").val(),
			Apellido1     : $("#apellido1").val(),
			Apellido2     : $("#apellido2").val(),
			Direccion     : $("#direccion").val(),
			CodigoPostal  : $("#cpostal").val(),
			Provincia     : $("#provincia").val(),
			FechaAlta     : $("#fechaAlta").val()
		});
		tablaClientes.push(cliente);
		localStorage.setItem("tablaClientes", JSON.stringify(tablaClientes));
		//alert("Los datos han sido guardados");
		//location.href='index.html';
		return true;
	}

	//Funcion encargada de modificar la tupla seleccionada. 
	function Modificar(){
		//document.location.href="formulario.html";
		tablaClientes[indice] = JSON.stringify({
			Nombre        : $("#nombre").val(),
			Apellido1     : $("#apellido1").val(),
			Apellido2     : $("#apellido2").val(),
			Direccion     : $("#direccion").val(),
			CodigoPostal  : $("#cpostal").val(),
			Provincia     : $("#provincia").val(),
			FechaAlta     : $("#fechaAlta").val()
			});
		localStorage.setItem("tablaClientes", JSON.stringify(tablaClientes));
		//alert("Los datos han sido editados")
		accion = "A";
		//location.href="index.html"
		return true;
	}

	//Funcion encargada de borrar la tupla seleccionada.
	function Borrar(){
		tablaClientes.splice(indice, 1);
		localStorage.setItem("tablaClientes", JSON.stringify(tablaClientes));
		//alert("Cliente eliminado");
	}

	//Funcion encargada de generar dinámicamente la tabla de clientes
	function Listar(){		
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
		for(var i in tablaClientes){
			var cliente = JSON.parse(tablaClientes[i]);
		  	$("#listaClientes tbody").append("<tr>"+
										 "	<td>"+"PARSE"+"</td>" + 
										 "	<td>"+cliente.Nombre+"</td>" + 
										 "	<td>"+cliente.Apellido1+"</td>" + 
										 "	<td>"+cliente.Apellido2+"</td>" + 
										 "	<td>"+cliente.Direccion+"</td>" + 
										 "	<td>"+cliente.CodigoPostal+"</td>" + 
										 "	<td>"+cliente.Provincia+"</td>" + 
										 "	<td>"+cliente.fechaAlta+"</td>" + 
										 "	<td><img src='recursos/modificar.png' alt='Modificar"+i+"' class='modificar'/><img src='recursos/borrar.png' alt='Borrar"+i+"' class='borrar'/></td>" + 
		  								 "</tr>");
		}
	}

	//Asigna el comportamiento al boton de Guardar.
	$("#formularioClientes").bind("submit",function(){		
		if(accion == "A")
			return Nuevo();
		else
			return Modificar();
	});

	Listar(); //Invoca a la función Listar para refrescar la tabla.

	//Asigna el comportamiento del botón Modificar
	$(".modificar").bind("click", function(){

		accion = "E";
		indice = parseInt($(this).attr("alt").replace("Modificar", ""));
		
		var cliente = JSON.parse(tablaClientes[indice]);
		$("#nombre").val(cliente.Nombre),
		$("#apellido1").val(cliente.Apellido1),
		$("#apellido2").val(cliente.Apellido2),
		$("#direccion").val(cliente.Direccion),
		$("#cpostal").val(cliente.CodigoPostal),
		$("#provincia").val(cliente.Provincia),
		$("#fechaAlta").val(cliente.fechaAlta)
		$("#nombre").focus();
	});

	//Asigna el comportamiento del botón Borrar
	$(".borrar").bind("click", function(){
		indice = parseInt($(this).attr("alt").replace("Borrar", ""));
		Borrar();
		Listar();
	});
});*/