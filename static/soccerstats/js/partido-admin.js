function zeroFill( number, width )
{
	  width -= number.toString().length;
	    if ( width > 0 )
		      {
			          return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
				    }
	      return number + ""; // always return a string
}


$(function(){
	segundos = 0;
	setInterval(function(){
		segundos += 1;

		minutos = zeroFill(parseInt(segundos / 60), 2);
		segs = zeroFill(segundos % 60, 2);

		$('#tiempo').text(minutos + ':' + segs + ' PT');
	},1000)
})
