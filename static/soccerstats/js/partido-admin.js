function zeroFill( number, width )
{
	  width -= number.toString().length;
	    if ( width > 0 )
		      {
			          return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
				    }
	      return number + ""; // always return a string
}


$('#comienza').click(function(){
	segundos = 0;
	periodo = 0;
	periodos = ['PT','ET','ST'];
	dura = [10,5,10];
	fin = false;

	setInterval(function(){
		if(!fin){
			segundos += 1;

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

					if(periodo % 2 === 0){
						$('.equipo').hide(1000);
					}else{
						$('.equipo').show(1000);
					}

					if(periodo + 1 !== periodos.length){
						periodo += 1;
						segundos = 0;
					}else{
						$('#tiempo').text('Partido finalizado');
						fin = true;
					}
				});
			}
		}
	},1000);

	$(this).hide(1000);
})
