$(function(){
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
		alert("Los datos han sido guardados");
		document.location.href="index.html"
		return true;
	}

	//Funcion encargada de modificar la tupla seleccionada. 
	function Modificar(){
		document.location.href="formulario.html"
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
		alert("Los datos han sido editados")
		accion = "A";
		//location.href="index.html"
		return true;
	}

	//Funcion encargada de borrar la tupla seleccionada.
	function Borrar(){
		tablaClientes.splice(indice, 1);
		localStorage.setItem("tablaClientes", JSON.stringify(tablaClientes));
		alert("Cliente eliminado");
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
});