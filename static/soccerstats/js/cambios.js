
$(function(){

$('.cambio').click(function(){
	entrante = undefined;
	saliente = undefined;

	equipo_i = $(this).attr('id');
	equipo = equipos[equipo_i];

	dialog = $('<div>');
	dialog.attr('title','Cambio en ' + equipo.nombre)
	
	// Elegir jugador que sale
	s = $('<select name="sale">');
	s.append($('<option>').text('-').attr('value',''));
	s.change(function(){
		saliente = $(this).children('option:selected').val()
	});
	for(i in titulares){
		jugador = players[titulares[i]];
		if (jugador.equipo == equipo_i){
			$('<option>').attr('value',jugador.pk).
				text(jugador.nombre).appendTo(s);
		}
	}
	label = $('<label for="sale">').text('Jugador saliente: ');
	$('<p>').append(label).append(s).appendTo(dialog);

	// Jugador entrante
	s = $('<select name="entra">');
	s.append($('<option>').text('-').attr('value',''));
	s.change(function(){
		entrante = $(this).children('option:selected').val()
	});

	for ( i in players ){
		jugador = players[i];
		if ( jugador.equipo == equipo_i && 
				titulares.indexOf(jugador.pk) == -1 /*Es suplente */
			){
			$('<option>').attr('value',jugador.pk)
				.text(jugador.nombre).appendTo(s);
		}
	}

	label = $('<label for="entra">').text('Jugador entrante: ');
	dialog.append($('<p>').append(label).append(s));

	dialog.dialog()
});

});
