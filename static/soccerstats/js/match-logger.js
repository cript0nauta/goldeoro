// Tiempo, período, de, a, contexto
jugadas = [];
latiene = undefined;
latenia = undefined

log_comienza = function(){
	// jugadas.push([0,0,,,]);
}

log_player = function(jugador){
	tiempo = new Date().getTime();
	if ( $(this).hasClass('seleccionado') ){
		// Se quiere deseleccionar
		latenia = latiene;
		latiene = undefined;
		jugadas.push([tiempo - timestamp, periodo, latenia,,]);
	}else{
		if (latiene){
			de = latiene.pk
		}else{
			if (latenia){
				de = latenia;
			}else{
				de = undefined;
			}
		}
		a = jugador.pk;
		latiene = jugador;
		jugadas.push([tiempo - timestamp, periodo, de, a,]);
	}
}
