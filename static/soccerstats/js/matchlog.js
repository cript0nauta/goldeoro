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
		tr.appendTo(t);
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
