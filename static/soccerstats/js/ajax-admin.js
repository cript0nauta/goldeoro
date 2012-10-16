players = {};
ajax_loop = 0;
ajax_finish = false;

procesa = function(data, i){
	// Añadimos los jugadores a la variable global players
	for(k in data.jugadores){
		jugador = data.jugadores[k];
		jugador.equipo = i;
		players[jugador.pk] = jugador;
	}
	ajax_loop += 1;
	if (ajax_loop == 2) {
		// Terminó la carga asíncrona
		for(i in titulares)
		{
			jugador = titulares[i];
			jugador = players[jugador];
			plantel = $('.' + (jugador.equipo == 0 ? 'local' : 
						'visitante'));
			li = $('<li>').attr('id',jugador.pk).addClass('player');
			fill = jugador.casaca < 9 ? '0' : '';
			li.text(fill + jugador.casaca + ' - ' + jugador.nombre);
			li.appendTo(plantel);
		}
		ajax_finish = true;
		partido_admin()
	}
}


for(i=0; i<2; i++)
{
	// Con cada equipo
	equipo = equipos[i]
	div = $('<div class="equipo float-l">');
	div.append($('<h3>').text(equipo.nombre));
	$.ajax({
		'url' : '/json/players/'+equipo.pk,
		'dataType' : 'json', success: 
			i == 0 ? function(d){procesa(d,0)} : 
			function(d){procesa(d,1)}
	});

	plantel = $('<ul>');
	div.append(i==0 ? plantel.addClass('local') : 
			plantel.addClass('visitante'));

	div.appendTo($('#panel-equipos'));
}

