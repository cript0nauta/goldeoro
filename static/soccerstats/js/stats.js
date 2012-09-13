posesion = {}
latiene = false;

$('.player').click(function(){
	if ($(this).hasClass('player')){
		if( ! $(this).hasClass('seleccionado') ){
			tmppos = new Date().getTime() - tmptime;
			if (posesion[latiene.pk]){
				posesion[latiene.pk] += tmppos;
			}else{
				posesion[latiene.pk] = tmppos;
			}
			latiene = false;
			tmptime = new Date().getTime();
		}else{
			if (latiene !== false){
				tmppos = new Date().getTime() - tmptime;
				if (posesion[latiene.pk]){
					posesion[latiene.pk] += tmppos;
				}else{
					posesion[latiene.pk] = tmppos;
				}
			}
			tmptime = new Date().getTime();
			latiene = jugadores[parseInt($(this).attr('id'))]
		}
	}
	return false;
});

