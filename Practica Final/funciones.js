/*
	Funciones JS usando el API de Parse	
*/


//Inicializamos la comunicación con Parse
Parse.initialize("D6tEXoUinkIU6knB0utAgcok169FfzbgMYO3DUMk", "GAV1qGELzIL1BDraCAMPNiNWTdUP4rZr8agnxxlO");

//Invocamos la funicion Listar para que cargue la tabla de clientes desde Parse.
Listar();

//Invocamos la funcion ListarProvincias para que rellene el combobox del formulario.
ListarProvincias();


//Funcion encargada de añadir una nueva tupla con la información del cliente
function Nuevo(){
	
	//alert("Funcion Nuevo()");
	var Clientes = Parse.Object.extend("Clientes");
	var cliente = new Clientes();


	cliente.set("nombre", document.getElementById("nombre").value);
	cliente.set("apellido1", document.getElementById("apellido1").value);
	cliente.set("apellido2", document.getElementById("apellido2").value);
	cliente.set("direccion", document.getElementById("direccion").value);
	cliente.set("cpostal", parseInt(document.getElementById("cpostal").value));
	if (document.getElementById("cpostal").value.length!=5){
		alert("El codigo postal debe tener 5 dígitos");
		return false;
	}
	cliente.set("provincia", document.getElementById("provincia").value);
	
	if(document.getElementById("fechaAlta").value!=""){
		cliente.set("fechaAlta", new Date(document.getElementById("fechaAlta").value));
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



function GoogleMapsEmbebido(){
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
										 "	<td><button onclick='CargarFormulario("+i+");' alt='Modificar"+i+"' class='modificar'><img src='recursos/modificar.png'/></button><button onclick='Borrar("+i+");' alt='Borrar"+i+"' class='borrar'><img src='recursos/borrar.png' /></button></td>" + 
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

//Funcion para cargar el formulario de entrada de datos.
//Cargará la nueva página con el formulario de añadir cliente si recibe "Nuevo"
//Mostrará el formulario de edición si recibe un índice.
function CargarFormulario(indice){

	if(indice == "Nuevo"){
		location.href='formulario.html';
	}
	else{
		
		document.getElementById("formularioModificaciones").style.display = 'inline';
	
		var idTupla = document.getElementsByTagName("tr")[indice+1].getElementsByTagName("td")[0].textContent;
		
		var Clientes = Parse.Object.extend("Clientes");
		var query = new Parse.Query(Clientes);
		query.get(idTupla, {
		  success: function(cliente) {
			    document.getElementById("idParse").value = cliente.id;
				document.getElementById("nombre").value = cliente.get("nombre");
				document.getElementById("apellido1").value = cliente.get("apellido1");
				document.getElementById("apellido2").value = cliente.get("apellido2");
				document.getElementById("direccion").value = cliente.get("direccion");
				document.getElementById("cpostal").value = cliente.get("cpostal");
				document.getElementById("provincia").value = cliente.get("provincia");
				if(cliente.get("fechaAlta")!=null && cliente.get("fechaAlta")!=0){
					var date = cliente.get("fechaAlta");
					var fechaFormateada = date.getFullYear() +"-"+ ("0" + (date.getMonth() + 1)).slice(-2) +"-"+ ("0" + date.getDate()).slice(-2);
					document.getElementById("fechaAlta").value = fechaFormateada; 
				}
				document.getElementById("nombre").focus();
		  },
		  error: function(object, error) {
		    alert("Error recuperando el objeto");
		  }
		});
		
	}
}



//Funcion encargada de modificar la tupla seleccionada. 
function Modificar(indice){
	
	var Clientes = Parse.Object.extend("Clientes");
	var query = new Parse.Query(Clientes);
	query.get(document.getElementById("idParse").value, {
	  success: function(cliente) {
	  	
	  	cliente.set("nombre", document.getElementById("nombre").value);
		cliente.set("apellido1", document.getElementById("apellido1").value);
		cliente.set("apellido2", document.getElementById("apellido2").value);
		cliente.set("direccion", document.getElementById("direccion").value);
		cliente.set("cpostal", parseInt(document.getElementById("cpostal").value));
		if (document.getElementById("cpostal").value.length!=5){
			alert("El codigo postal debe tener 5 dígitos");
			return false;
		}
		cliente.set("provincia", document.getElementById("provincia").value);
		
		if($("#fechaAlta").val()!=""){
			cliente.set("fechaAlta", new Date(document.getElementById("fechaAlta").value));
		}
		cliente.save();
		document.getElementById("formularioModificaciones").style.display = 'none';
		Listar();
	  },
	  error: function(object, error) {
	    alert("Error recuperando el objeto");
	  }
	});
}



//Funcion para obtener las provincias de Parse y listarlas en el combo box.
function ListarProvincias(){
	var Provincias = Parse.Object.extend("Provincias");
	var query = new Parse.Query(Provincias);
	query.find({
	  success: function(resultados) {
		var provincia = [];
		//var j=0;
	    //alert("Se han encontrado " + resultados.length + " resultados.");
		for(var i in resultados){
			//var listado = resultados[i];
			provincia[i] = resultados[i].get("nombre");
			//j++;
		}
		
		var combo = document.getElementById("provincia");
		var option;
		//alert(provincia);
		
		if(provincia.length!=0 && provincia!=null)
		{
			for(i=0; i<provincia.length; i++){
				//alert(provincia[i]);
				option = document.createElement("option");
				option.text = provincia[i];
				option.value = provincia[i];
				
				combo.add(option , null);
			}
		}
		/*for (var j in provincia){
			alert(provincia[j]);
		};*/
	  },
	  error: function(error) {
	    alert("Error listando provincias: " + error.code + " " + error.message);
	  }
	});

}