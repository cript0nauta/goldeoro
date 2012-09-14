// Tiempo, período, de, a, contexto
jugadas = [];
latiene = undefined;
latenia = undefined

log_comienza = function(){
	// jugadas.push([0,0,,,]);
}

log_player = function(jugador){
	tiempo = new Date().getTime();
	if ( $('#'+jugador.pk).hasClass('seleccionado') ){
		// Se quiere deseleccionar
		latenia = latiene;
		latiene = undefined;
		jugadas.push([tiempo - timestamp, periodo, latenia.pk,,]);
		console.log([latenia.nombre,,]);
	}else{
		if (latiene){
			de = latiene.pk
		}else{
			if (latenia){
				de = latenia.pk;
			}else{
				de = undefined;
			}
		}
		if (pausa){
			c = contexto
		}else{
			c = undefined
		}
		a = jugador.pk;
		jugadas.push([tiempo - timestamp, periodo, de, a, c]);
		console.log([
				(latiene) ? latiene.nombre : ( (latenia) ? latenia.nombre : undefined  ),
				jugador.nombre,
				c]);
		latiene = jugador;
	}
}
