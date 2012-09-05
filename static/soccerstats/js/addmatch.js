$(function(){
	$('select').change(function(){
		ul = $(this).parent().find('.jugadores');
		ul.html('');
		$.getJSON('/json/players/' + this.value + '/', function(data){
			for(i=0;i<data.jugadores.length;i++)
			{
				nombre = data.jugadores[i];
				li = $('<li>').text(nombre);
				li.appendTo(ul);
			}
		})
	});
})
