$(function(){

	//Goles, saques de arco, faltas y penales
	parada = {
		SM : [0,0],
		SA : [0,0],
		FA : [0,0],
		TL : [0,0],
		CO : [0,0],
		LA : [0,0],
		PE : [0,0],
	}

	players = {"80":{"pk":80,"casaca":1,"nombre":"Barovero","equipo":0},"81":{"pk":81,"casaca":2,"nombre":"González Pirez","equipo":0},"82":{"pk":82,"casaca":3,"nombre":"Pezzella","equipo":0},"83":{"pk":83,"casaca":4,"nombre":"Botinelli","equipo":0},"84":{"pk":84,"casaca":5,"nombre":"Ramiro Funes Mori","equipo":0},"85":{"pk":85,"casaca":6,"nombre":"Cárlos Sánchez","equipo":0},"86":{"pk":86,"casaca":7,"nombre":"Cirigliano","equipo":0},"87":{"pk":87,"casaca":8,"nombre":"Ponzio","equipo":0},"88":{"pk":88,"casaca":9,"nombre":"Aguirre","equipo":0},"89":{"pk":89,"casaca":33,"nombre":"Luna","equipo":0},"90":{"pk":90,"casaca":11,"nombre":"Mora","equipo":0},"91":{"pk":91,"casaca":12,"nombre":"Trezeguet","equipo":0},"92":{"pk":92,"casaca":13,"nombre":"Abecasis","equipo":0},"93":{"pk":93,"casaca":14,"nombre":"Arano","equipo":0},"94":{"pk":94,"casaca":15,"nombre":"Maidana","equipo":0},"95":{"pk":95,"casaca":16,"nombre":"Mercado","equipo":0},"96":{"pk":96,"casaca":17,"nombre":"Acevedo","equipo":0},"97":{"pk":97,"casaca":18,"nombre":"Affanchino","equipo":0},"98":{"pk":98,"casaca":19,"nombre":"Aguirre","equipo":0},"99":{"pk":99,"casaca":10,"nombre":"Lanzini","equipo":0},"100":{"pk":100,"casaca":21,"nombre":"Rojas","equipo":0},"101":{"pk":101,"casaca":22,"nombre":"Rogelio Funes Mori","equipo":0},"102":{"pk":102,"casaca":23,"nombre":"Luna","equipo":0},"103":{"pk":103,"casaca":24,"nombre":"Ocampos","equipo":0},"104":{"pk":104,"casaca":34,"nombre":"Acevedo","equipo":1},"105":{"pk":105,"casaca":12,"nombre":"Benítez","equipo":1},"106":{"pk":106,"casaca":25,"nombre":"Dulcich","equipo":1},"107":{"pk":107,"casaca":1,"nombre":"Tripodi","equipo":1},"108":{"pk":108,"casaca":31,"nombre":"Alegre","equipo":1},"109":{"pk":109,"casaca":6,"nombre":"Carli","equipo":1},"110":{"pk":110,"casaca":3,"nombre":"Goñi","equipo":1},"111":{"pk":111,"casaca":23,"nombre":"Lema","equipo":1},"112":{"pk":112,"casaca":24,"nombre":"Leyes","equipo":1},"113":{"pk":113,"casaca":13,"nombre":"Lima","equipo":1},"114":{"pk":114,"casaca":2,"nombre":"Martínez","equipo":1},"115":{"pk":115,"casaca":20,"nombre":"Olivera","equipo":1},"116":{"pk":116,"casaca":14,"nombre":"Quiles","equipo":1},"117":{"pk":117,"casaca":27,"nombre":"Ravest","equipo":1},"118":{"pk":118,"casaca":4,"nombre":"Serrano","equipo":1},"119":{"pk":119,"casaca":10,"nombre":"Caneo","equipo":1},"120":{"pk":120,"casaca":32,"nombre":"Carrasco","equipo":1},"121":{"pk":121,"casaca":5,"nombre":"Cobo","equipo":1},"122":{"pk":122,"casaca":8,"nombre":"Díaz","equipo":1},"123":{"pk":123,"casaca":36,"nombre":"Elizari","equipo":1},"124":{"pk":124,"casaca":26,"nombre":"Garnier","equipo":1},"125":{"pk":125,"casaca":15,"nombre":"López","equipo":1},"126":{"pk":126,"casaca":22,"nombre":"Mandarino","equipo":1},"127":{"pk":127,"casaca":19,"nombre":"Mansilla","equipo":1},"128":{"pk":128,"casaca":35,"nombre":"Mattos","equipo":1},"129":{"pk":129,"casaca":29,"nombre":"Morales","equipo":1},"130":{"pk":130,"casaca":21,"nombre":"Nuñez","equipo":1},"131":{"pk":131,"casaca":17,"nombre":"Romero","equipo":1},"132":{"pk":132,"casaca":7,"nombre":"Cauteruccio","equipo":1},"133":{"pk":133,"casaca":11,"nombre":"Diz","equipo":1},"134":{"pk":134,"casaca":28,"nombre":"Giménez","equipo":1},"135":{"pk":135,"casaca":30,"nombre":"Insaurralde","equipo":1},"136":{"pk":136,"casaca":9,"nombre":"Telechea","equipo":1},"137":{"pk":137,"casaca":33,"nombre":"Toloza","equipo":1}};

	for(i=0; i<jugadas.length; i++){
		jugada = jugadas[i];
		if(jugada[4] && !jugada[5]){
			equipo = players[jugada[2]].equipo;
			parada[jugada[4]][equipo] += 1;
		}
	}
	$('#goles .local').text(parada.SM[0]);
	$('#goles .visitante').text(parada.SM[1]);

	$('#faltas .local').text(parada.TL[1]);
	$('#faltas .visitante').text(parada.TL[0]);

	$('#penales .local').text(parada.PE[1]);
	$('#penales .visitante').text(parada.PE[0]);

	$('#tiros .local').text(parada.SA[0] + parada.SM[0]);
	$('#tiros .visitante').text(parada.SA[1] + parada.SM[1]);

	$('#corners .local').text(parada.CO[1]);
	$('#corners .visitante').text(parada.CO[0]);



	for(i = 0; i < jugadas.length - 1; i++) // El último elemento del array no es necesario
	{
		// Con cada jugada
		
		// Le asigna a cada jugador los milisegundos que estuvo con la pelota
		tiempo = jugadas[i+1][0] - jugadas[i][0];
		if ( jugadas[i][3] ){
			jugador = players[jugadas[i][3]];
			// console.log(jugador.nombre + '+=' + tiempo);
			if (jugador.posesion === undefined)
			{
				jugador.posesion = tiempo;
			}else{
				jugador.posesion += tiempo;
			}
		}
	}

	for(i in players){players[i].pases=0; players[i].malos=0;}
	// Calcular la posesión por equipo
	pos = [0,0];
	for (i in players)
	{
		jugador = players[i];
		if(jugador.posesion)
		{
			pos[jugador.equipo] += jugador.posesion;
		}
	}
	local = (100 * pos[0]) / (pos[0] + pos[1]) + 1;
	visit = (100 * pos[1]) / (pos[0] + pos[1]);
	result = 'Posesión : Local: ' + parseInt(local) + '%; Visitante: ' + parseInt(visit) + '%';
	$('#posesion .local').text(parseInt(local) + '%');
	$('#posesion .visitante').text(parseInt(visit) + '%');

	// Calcular pases efectivos por equipo
	pases = [0,0];
	buenos = [0,0];
	for (i in jugadas)
	{
		jugada = jugadas[i];
		if (jugada[2] && jugada[3])
		{
			if (players[jugada[2]].equipo == players[jugada[3]].equipo)
			{
				pases[players[jugada[2]].equipo] += 1;
				buenos[players[jugada[2]].equipo] += 1;
				players[jugada[2]].pases += 1
			}else{
				pases[players[jugada[2]].equipo] += 1;
				players[jugada[2]].malos += 1
			}
		}
	}
	$('#pases .local').text(pases[0]);
	$('#pases .visitante').text(pases[1]);

	$('#presicion .local').text(parseInt((buenos[0] * 100) / pases[0]) + '%');
	$('#presicion .visitante').text(parseInt((buenos[1] * 100) / pases[1]) + '%');


	// Tabla individual de jugadores, pases y posesión
	t = $('<table>').attr('border','1');
	tr = $('<tr>');
	$('<th>').text('N°').appendTo(tr);
	$('<th>').text('Nombre').appendTo(tr);
	$('<th>').text('Equipo').appendTo(tr);
	$('<th>').text('Pases buenos').appendTo(tr);
	$('<th>').text('Pases malos').appendTo(tr);
	$('<th>').text('Efectividad').appendTo(tr);
	$('<th>').text('Posesión').appendTo(tr);
	tr.appendTo(t)
	for(i in players)
	{
		jugador = players[i];
		tr = $('<tr>');
		$('<td>').text(jugador.casaca).appendTo(tr);
		href = $('<a class="nombre-jugador">');
		href.attr('href','#' + jugador.pk).text(jugador.nombre);
		$('<td>').append(href).appendTo(tr);
		$('<td>').text(jugador.equipo === 0 ? equipos[0].iniciales : equipos[1].iniciales).appendTo(tr);
		$('<td>').text(jugador.pases).appendTo(tr);
		$('<td>').text(jugador.malos).appendTo(tr);
		$('<td>').text(parseInt((jugador.pases * 100)  / (jugador.malos + jugador.pases)) + '%').appendTo(tr);
		$('<td>').text(parseInt( (100 * jugador.posesion) / (pos[0] + pos[1])  ) + '%').appendTo(tr);
		if (jugador.pases) tr.appendTo(t);
	}
	t.appendTo($('#individual'));

	$('.nombre-jugador').click(function(){
		//Abrimos el cuadro de diálogo
		dialog = $('<div class=".dialog">');
		dialog.html('Cargando...');
		jugador_pk = $(this).attr('href').substring(1);
		jugador = players[jugador_pk];
		dialog.attr('title',jugador.nombre);
		dialog.dialog();

		// Realizamos todo lo necesario
		pases_player = {};
		for(k in players){ pases_player[k] = [0,0] }
		for(i=0; i<jugadas.length; i++){
			jugada = jugadas[i];

			if ( jugada[2] == jugador_pk ) {
				if (jugada[3]){ // A qué jugador
					pases_player[jugada[3]][0] += 1;
				}
			}

			if ( jugada[3] == jugador_pk ) {
				if (jugada[2]){ // De qué jugador
					pases_player[jugada[2]][1] += 1;
				}
			}
		}

		// Lo volcamos al diálogo
		dialog.html('');
		table = $('<table border="1">');
			tr = $('<tr>');
			tr.append($('<th>').text('Nombre'));
			tr.append($('<th>').text('Pases dados'));
			tr.append($('<th>').text('Pases recibidos'));
			tr.appendTo(table);
		for(k in pases_player){
			jugador_tabla = players[k];
			if(jugador.equipo === jugador_tabla.equipo){
				tr = $('<tr>');
				$('<td>').text(jugador_tabla.nombre).appendTo(tr);
				$('<td>').text(pases_player[k][0]).appendTo(tr);
				$('<td>').text(pases_player[k][1]).appendTo(tr);
				tr.appendTo(table);
			}
		}
		tr.appendTo(table);
		table.appendTo(dialog);
	});

	return false;
})
