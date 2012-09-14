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
		jugadas.push([tiempo - timestamp, periodo, 
				(latiene && !c) ? latiene.pk : ( (latenia && !c) ? latenia.pk : undefined  ), 
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
	jugadas.push([tiempo - timestamp, 
			periodo, 
			latiene.pk, 
			undefined, 
			contexto, 
			false]); // False porque no estamos sacando
	console.log([ latiene.nombre, undefined, contexto, false ]);
}

log_periodo = function()
{
	tiempo = new Date().getTime();
	if (latiene && !pausa)
	{
		jugadas.push([ tiempo - timestamp, 
				periodo, 
				latiene.pk, 
				undefined, undefined, undefined ]);
		console.log([latiene.nombre, undefined, undefined, undefined ]);
	}
}


calcula_tiempos = function()
{
	for(i = 0; i < jugadas.length - 1; i++) // El último elemento del array no es necesario
	{
		// Con cada jugada
		tiempo = jugadas[i+1][0] - jugadas[i][0];
		if ( jugadas[i][3] ){
			jugador = players[jugadas[i][3]];
			console.log(jugador.nombre + '+=' + tiempo);
		}
	}

}
