function zeroFill( number, width )
{
	  width -= number.toString().length;
	    if ( width > 0 )
		      {
			          return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
				    }
	      return number + ""; // always return a string
}

jugando = false; // Primer o segundo tiempo
pausa = true; // Para medir si hacen tiempo

$(function(){
	$('.equipo').hide();
});


visibilidad = function(){
	if($('.equipo').css('display') !== 'none'){
		$('.equipo').hide(1000);
	}else{
		$('.equipo').show(1000);
	}
}
$('#comienza').click(function(){
	timestamp = new Date().getTime();
	jugando = true;
	visibilidad();
	segundos = 0;
	periodo = 0;
	periodos = ['PT','ET','ST'];
	dura = [10,5,10];
	fin = false;
	$('#relato').text('Elija ejecutor de saque del medio');

	setInterval(function(){
		if(!fin){
			segundos += 1

			minutos = zeroFill(parseInt(segundos / 60), 2);
			segs = zeroFill(segundos % 60, 2);

			$('#tiempo').text(minutos + ':' + segs + ' ' + periodos[periodo]);

			if(segundos === dura[periodo]){
				// Estamos listos para pasar de período
				a = $('<a>').attr('href','#').text('Siguiente período').hide();
				a.appendTo('#cambiaperiodo');
				a.show(1000);
				a.click(function(){
					$(this).hide(1000);
					timestamp = new Date().getTime();

					if(periodo + 1 !== periodos.length){
						periodo += 1;
						segundos = 0;
						if (periodo===1){
							jugando = false;
						}else{
							jugando = true;
						}
					}else{
						$('#tiempo').text('Partido finalizado');
						fin = true;
						jugando = false;
					}
					visibilidad();
					if(periodo == 1)
					{
						$('#relato').text('Entretiempo');
					}else{
						$('#relato').text('Elija ejecutor de saque del medio');
					}
				});
			}
		}
	},1000);

	$(this).hide(1000);
	return false;
});

$('.player').click(function(){
	if($(this).hasClass('player')){
		pausa = false;
		li = $(this);

		if(!$(this).hasClass('seleccionado')){
			$('#relato').text('Tiene la pelota ' + li.text());

			//Selecciona el elemento
			$('.seleccionado').removeClass('seleccionado');
			$(this).addClass('seleccionado');

			// Vuelve seleccionables a todos los jugadores
			$('.disable').addClass('player');
			$('.disable').removeClass('disable');
		}else{
			// Está seleccionado, deseleccionamos
			$('#relato').text('Nadie tiene la pelota');
			$(this).removeClass('seleccionado');
		}
	}
	return false;
});

$('.pelota-parada').click(function(){
	if ( jugando && !pausa ){
		pausa = true;
		jugador = $('.seleccionado').text();
		relato = $(this).text() + ' (' + jugador  + ').  Pausa. Elija lanzador del saque';
		$('#relato').text(relato);

		// Evitamos que se seleccionen del otro equipo
		equipo = $('.seleccionado').parent();
		jugadores = equipo.find('li');
		jugadores.removeClass('player');
		jugadores.addClass('disable')
		$('.seleccionado').removeClass('seleccionado');
	}
	return false;
});
