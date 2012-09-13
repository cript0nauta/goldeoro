posesion = {}

$('.player').click(function(){
	if ($(this).hasClass('player')){
		if( $(this).hasClass('seleccionado') ){
			latiene = false;
		}else{
			latiene = jugadores[parseInt($(this).attr('id'))]
		}
	}
	return false;
});
