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
	periodos = ['PT','ET','ST']

	setInterval(function(){
		segundos += 1;

		minutos = zeroFill(parseInt(segundos / 60), 2);
		segs = zeroFill(segundos % 60, 2);

		$('#tiempo').text(minutos + ':' + segs + ' ' + periodos[periodo]);


	},1000);

	$(this).hide(1000);
})
