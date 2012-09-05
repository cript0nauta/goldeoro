$(function(){
	$('select').change(function(){
		ul = $(this).parent().find('.jugadores');
		ul.html('');

		// Obtiene los jugadores por JSON
		$.getJSON('/json/players/' + this.value + '/', function(data){
			for(i=0;i<data.jugadores.length;i++)
			{
				nombre = data.jugadores[i].nombre;
				pk = data.jugadores[i].pk;

				check = $('<input>').attr('type','checkbox').attr('value',pk);
				li = $('<li>').text(nombre);
				
				li.prepend(check)
				li.appendTo(ul);
			};
			$('input[type=checkbox]').change(function(){
				p = $(this).parent().parent().parent().find('.once');
				p_n = p.find('.cantidad-jugadores');
				n = $(this).parent().parent().find('input:checkbox:checked').length;
				p_n.text(n);
				if(n == 11)
				{
					p.removeClass('no-hay-once');
					p.addClass('hay-once');
				}else{
					p.removeClass('hay-once');
					p.addClass('no-hay-once');
				}
			});
		});
	});

	$('#submit').click(function(){
		if( $('input:checked').length != 22 )
		{
			alert('Elige 11 jugadores de cada equipo')
		}else{
			alert('Bien');
		}
		return false;
	});

})
