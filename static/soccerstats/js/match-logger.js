// Tiempo, período, de, a, contexto, saque
jugadas = [];
latiene = undefined;
latenia = undefined
// ( (jugadas[i+1]) ? jugadas[i+1][0] : (new Date().getTime() - timestamp) ) - jugadas[i][0]

log_comienza = function(){
	// jugadas.push([0,0,,,]);
}

log_player = function(jugador){
	tiempo = new Date().getTime();
	if ( $('#'+jugador.pk).hasClass('seleccionado') ){
		// Se quiere deseleccionar
		latenia = latiene;
		latiene = undefined;
		jugadas.push([tiempo - timestamp, periodo, latenia.pk, undefined, undefined, undefined]);
		console.log([latenia.nombre]);
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
			c = contexto;
		}else{
			c = undefined
		}
		a = jugador.pk;
		jugadas.push([tiempo - timestamp, 
				periodo, 
				(latiene && c) ? latiene.nombre : ( (latenia && c) ? latenia.nombre : undefined  ), 
				a, c, c ? true : undefined])
		console.log([
				(latiene && !c) ? latiene.nombre : ( (latenia && !c) ? latenia.nombre : undefined  ),
				jugador.nombre,
				c, c ? true : undefined]);
		latiene = jugador;
	}
}

log_pelotaparada = function(){
	tiempo = new Date().getTime();
	jugadas.push([tiempo, periodo, latiene.pk, undefined, contexto, false]); // False porque no estamos sacando
	console.log([ latiene.nombre, undefined, contexto, false  ]);
}
