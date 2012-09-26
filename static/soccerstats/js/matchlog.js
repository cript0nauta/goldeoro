$(function(){
	// Le asigna a cada jugador los milisegundos que estuvo con la pelota
	for(i = 0; i < jugadas.length - 1; i++) // El último elemento del array no es necesario
	{
		// Con cada jugada
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
	result = $('<p>').text(result);
	$('#resultados').append(result);

	// Calcular pases efectivos por equipo
	pases = [0,0]
	for (i in jugadas)
	{
		jugada = jugadas[i];
		if (jugada[2] && jugada[3])
		{
			if (players[jugada[2]].equipo == players[jugada[3]].equipo)
			{
				pases[players[jugada[2]].equipo] += 1;
				players[jugada[2]].pases += 1
			}else{
				players[jugada[2]].malos += 1
			}
		}
	}
	result = 'Pases: Local: ' + pases[0] + '; Visitante: ' + pases[1];
	result = $('<p>').text(result);
	$('#resultados').append(result);

	t = $('<table>').attr('border','1');
	tr = $('<tr>');
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
		$('<td>').text(jugador.nombre).appendTo(tr);
		$('<td>').text(jugador.equipo === 0 ? equipos[0].iniciales : equipos[1].iniciales).appendTo(tr);
		$('<td>').text(jugador.pases).appendTo(tr);
		$('<td>').text(jugador.malos).appendTo(tr);
		$('<td>').text(parseInt((jugador.pases * 100)  / (jugador.malos + jugador.pases)) + '%').appendTo(tr);
		$('<td>').text(parseInt( (100 * jugador.posesion) / (pos[0] + pos[1])  ) + '%').appendTo(tr);
		tr.appendTo(t);
	}
	t.appendTo($('#resultados'));
})
