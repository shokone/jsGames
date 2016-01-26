/*
 * Desarrollado por Iván Martínez Tutor
 * clase javascript para el juego mistermind
 */
//creamos un array donde guardamos los colores disponibles para el juego
var colores=[];//guardamos en un array los colores que podra tener la combinacion
var colorAleat=[];//guardamos en un array la combinacion aleatoria de colores
var gameStart=false;//comprobamos si el juego a comenzado
var intento=0;//comprobamos en que intento de combinacion nos encontramos
var ganador=0;//comprobamos cuantos colores hemos acertado
var numColores=0;//almacenamos la cantidad de colores que tendra el juego
var repetirColor=false;//comprobamos si hemos activado el modo colores repetidos
var repite = false;//comprobamos si queremos repetir o no los colores
var contrarreloj = false;//comprobamos si hemos activado el modo contrarreloj
var mins = 5;//numero de minutos que queremos tenga el cronometro
var segs = mins * 60;//calculamos los segundos
var segPasados = 0;//guardamos los segundos que han pasado
var minPasados = 0;//guardamos los minutos que han pasado
var compReloj = false;//comprobamos si el tiempo de juego ha terminado

//creamos el array de colores
colores[0]="black";
colores[1]="blue";
colores[2]="rgb(135, 42, 42)";
colores[3]="green";
colores[4]="orange";
colores[5]="red";
colores[6]="white";
colores[7]="yellow";

/*
 * comprobamos la dificultad elegida
 * creamos el tablero en funcion a la dificultad
 * facil 4 colores, medio 6 colores, dificil 8 colores
 * comprobamos si hemos activado el modo colores repetidos
 */
function tablero(num){
	var tabJuego = document.getElementById("tabla");//guardamos el id tabla
	//comprobamos la dificultad para calcular el numero de colores
	if(num=="facil"){
		numColores = 4;
	}else if(num=="medio"){
		numColores = 6;
	}else if(num=="dificil"){
		numColores = 8;
	}
	var divDif = document.getElementById("dificultad");
	var solColo = document.getElementById("solucion");
	var coloretes = document.getElementById("colore");
	var combi = document.getElementById("combi");
	divDif.className="noVisible";//ocultamos las dificultades
	coloretes.style.visibility="visible";//mostramos los colores
	combi.style.visibility="visible";//mostramos el boton de comprobacion
	tabJuego.style.visibility="visible";//mostramos la tabla
	for(var s=0;s<numColores;s++){//creamos circulos para cada color de la solucion de la combinacion
		var divSolu = document.createElement("div");
		divSolu.className="circle";
		divSolu.id="solCol"+s;
		solColo.appendChild(divSolu);
	}
	for(var a=7;a>=0;a--){//creamos las filas de intentos
		var tdGame = document.getElementById("v"+a);
		var tdComp = document.getElementById("c"+a);
		for(var f=0;f<numColores;f++){//creamos los dibujos para los colores
			var divImage = document.createElement("div");
			divImage.className="circle";
			divImage.id="v"+a+f;
			divImage.onclick=function(){cambiarColor(this.id)};
			tdGame.appendChild(divImage);
			
		}
		for(var f=0;f<numColores;f++){//creamos los dibujos para las comprobaciones
			var divComp = document.createElement("div");
			divComp.className="circleMin";
			divComp.id="c"+a+f;
			tdComp.appendChild(divComp);
			var salto = document.createElement("br");
			if(f == (numColores/2)-1)
				tdComp.appendChild(salto);
		}
	}
}

/*
 * comprobamos si hemos activado la opcion de repetir colores
 */
function repOn(idde){
	var repe = document.getElementById("repetir");
	if(idde == "repetir"){
		repite=true;
		repe.style.backgroundColor="#009920";
	}
}

/*
 * comprobamos si hemos activado el modo contrarreloj
 */
function modeReloj(idde){
	var reloj = document.getElementById("cronometro");
	if(idde == "cronometro"){
		contrarreloj=true;
		reloj.style.backgroundColor="#009920";
	}
}

/*
 * creamos una posicion aleatoria de x colores para el juego segun la dificultad elegida
 */
function aleatorio(){
    var aleat;
    var contador=0;
    var comproPos=[];//creamos un array para no repetir colores en la combinacion
	if(repite == true){//si esta activada la opcion de repetir colores
		while(contador<numColores){//creamos la combinacion de colores aleatoria
        	aleat=Math.floor(Math.random()*(10-2));
            colorAleat[contador]=colores[aleat];
            contador++;
    	}
	}else{//si no se pueden repetir colores
		for(var a=0;a<8;a++){
			comproPos[a]=false;
		}
		while(contador<numColores){//creamos la combinacion de colores aleatoria
			aleat=Math.floor(Math.random()*(10-2));
			if(comproPos[aleat]==false){
				colorAleat[contador]=colores[aleat];
				comproPos[aleat]=true;
				contador++;
			}
		}
	}
}

/*
 * ocultamos la solucion hasta terminar el juego
 */
function solucion(){
    for(var a=0;a<numColores;a++){
        var solu=document.getElementById("solCol"+a);
        solu.style.backgroundColor="gray";
    }
}

/*
 * cambiamos el color cada vez que clickeamos el circulo por el siguiente del array
 */
function cambiarColor(id){
    if(gameStart){
        var pos=0;
        var circulo = document.getElementById(id);
        for(var a=0;a<colores.length;a++){
            if(circulo.style.backgroundColor === colores[a]){
                if(a == 7){
                    pos=0;
                }else{
                    pos=a;
                    pos++;
                }
            }
        }
        for(var f=0;f<10;f++){//comprobamos en que combinacion estamos
            for(var a=0;a<numColores;a++){
                if(circulo.id === ("v"+intento+a))//si estamos en la fila de prueba correcta cambiamos el color
                    circulo.style.backgroundColor=colores[pos];   
            }
        }
    }
}

/*
 * comprobamos si el juego a comenzado
 */
function startGame(id){
    if(id == "start"){
        gameStart=true;
        var botStar=document.getElementById("start");
        botStar.onclick=null;
        aleatorio();
        solucion();
        resetear();
        intento=0;//volvemos todas las combinaciones a 0
		if(contrarreloj == true){
			var rel = document.getElementById("timer");
			rel.style.visibility="visible";
			setTimeout('decremento()',1000);//comienza la cuenta atras
		}
    }
}

function resetear(){
    for(var a=0;a<10;a++){//comprobamos todos los intentos
        for(var f=0;f<numColores;f++){//reseteamos todos los circulos
            var resetCirculo = document.getElementById("v"+a+f);
            var resetCirculin = document.getElementById("c"+a+f);
            resetCirculo.style.backgroundColor="transparent";
            resetCirculin.style.backgroundColor="transparent";
        }
    }
}

/*
 * comprobamos en que combinacion estamos
 * despues comprobamos si la combinacion es correcta
 * en caso de no serlo pasaremos a la siguiente y perderemos una vida
 */
function checkComb(){
    for(var a=0;a<numColores;a++){//comprobamos si el color debe ir en esa posicion
        var checo = document.getElementById("v"+intento+a);
        if(checo.style.backgroundColor == colorAleat[a]){
            var compro = document.getElementById("c"+intento+a);
            compro.style.backgroundColor="black";
			ganador++;
			console.log(ganador);
            if (ganador==numColores) return youWin();
        }else{
            for(var f=0;f<numColores;f++){//comprobamos si el color es correcto pero no va en esa posicion
                if(checo.style.backgroundColor == colorAleat[f]){
                    var compro2 = document.getElementById("c"+intento+a);
                    compro2.style.backgroundColor="white";
                }
            }
			ganador=0;
        }
    }
    intento++;
    youWin();
}

/*
 * comprobamos si hemos ganado la partida
 * tenemos que hacertar todos los colores de la combinacion
 */
function youWin(){
    var botStar=document.getElementById("start");
	if(ganador == numColores){//si hemos ganado mostramos la solucion
    	alert("Has encontrado la combinacion correcta");
        for(var a=0;a<numColores;a++){
            var soluWin=document.getElementById("solCol"+a);
            soluWin.style.backgroundColor=colorAleat[a];
        }
		gameStart=false;
		intento=0;
        botStar.onclick=function(){startGame(this.id);};
    }else if(intento == 8){//si no nos quedan intentos mostramos la solucion
		alert("No has encontrado la combinacion correcta.");
		for(var a=0;a<numColores;a++){
            var soluWin=document.getElementById("solCol"+a);
            soluWin.style.backgroundColor=colorAleat[a];
        }
		gameStart=false;
        intento=0;
        botStar.onclick=function(){startGame(this.id);};
	}
}

/*
 * recargamos la pagina para volver a seleccionar la dificultad
 */
function recargar(){
	document.location.href = document.location.href;
}

/*
 * creamos el contrarreloj para el modo de juego
 */
function decremento() {
	minPasados = Math.floor(segs / 60);
	segPasados = segs % 60;
	if(segPasados <= 9) 
		segPasados = "0" + segPasados;
	segs--;
	document.getElementById("timer").innerHTML = minPasados + " : " + segPasados; //mostramos el reloj
	if(segs !== -1 && gameStart) 
		setTimeout('decremento()',1000);
	if(segs === -1)
		compReloj=true;
	tiempoPerdido();
}

/*
 * Comprobamos si se nos ha terminado el tiempo
 */
function tiempoPerdido(){
	if(compReloj == true){
		gameStart=false;
		alert("Lo sentimos se ha terminado el tiempo. Has perdido la partida.");
	}
}