/*
 * Desarrollado por Iván Martínez Tutor
 * clase javascript para el juego memory - parejas de cartas
 */
var imagenesOcultas;//guardaremos las imagenes que haya en el tapete
var cargaImg=[];//creamos un array donde guardamos las imagenes
var cargaAleat=[];//creamos un array para guardar las imagenes desordenadas
var idd;//guardamos el id de la imagen clickeada
var contParejas=0;//contamos las parejas acertadas
var idd2 = -1;//guardaremos la posicion de la segunda imagen seleccionada
var unImg;//guardaremos la posicion de la primera imagen seleccionada
var contIntentos=0;//contamos el numero de intentos hasta acabar la partida
var j=true;//variable global para comprobar si hemos clickeado una imagen
var contrarreloj = false;//comprobamos si hemos activado el modo contrarreloj
var mins = 5;//numero de minutos que queremos tenga el cronometro
var segs = mins * 60;//calculamos los segundos
var segPasados = 0;//guardamos los segundos que han pasado
var minPasados = 0;//guardamos los minutos que han pasado
var compReloj = false;//comprobamos si el tiempo de juego ha terminado
var gameStart = false;//comprobamos si el juego ha comenzado

//cargamos las imagenes en el array
cargaImg[0]="imagenes/parejas/1corazon.gif";
cargaImg[1]="imagenes/parejas/1pica.gif";
cargaImg[2]="imagenes/parejas/1rombo.gif";
cargaImg[3]="imagenes/parejas/1trebol.gif";
cargaImg[4]="imagenes/parejas/13corazon.gif";
cargaImg[5]="imagenes/parejas/13pica.gif";
cargaImg[6]="imagenes/parejas/13rombo.gif";
cargaImg[7]="imagenes/parejas/13trebol.gif";
cargaImg[8]="imagenes/parejas/12pica.gif";
cargaImg[9]="imagenes/parejas/12corazon.gif";
cargaImg[10]="imagenes/parejas/12rombo.gif";
cargaImg[11]="imagenes/parejas/12trebol.gif";
cargaImg[12]="imagenes/parejas/11corazon.gif";
cargaImg[13]="imagenes/parejas/11pica.gif";
cargaImg[14]="imagenes/parejas/11trebol.gif";
cargaImg[15]="imagenes/parejas/11rombo.gif";
cargaImg[16]="imagenes/parejas/10pica.gif";
cargaImg[17]="imagenes/parejas/10corazon.gif";
cargaImg[18]="imagenes/parejas/10trebol.gif";
cargaImg[19]="imagenes/parejas/10rombo.gif";
cargaImg[20]="imagenes/parejas/9pica.gif";
cargaImg[21]="imagenes/parejas/9rombo.gif";
cargaImg[22]="imagenes/parejas/9corazon.gif";
cargaImg[23]="imagenes/parejas/9trebol.gif";
cargaImg[24]="imagenes/parejas/8pica.gif";
cargaImg[25]="imagenes/parejas/8rombo.gif";
cargaImg[26]="imagenes/parejas/8corazon.gif";
cargaImg[27]="imagenes/parejas/8trebol.gif";
cargaImg[28]="imagenes/parejas/7pica.gif";
cargaImg[29]="imagenes/parejas/7rombo.gif";
cargaImg[30]="imagenes/parejas/7corazon.gif";
cargaImg[31]="imagenes/parejas/7trebol.gif";
cargaImg[32]="imagenes/parejas/6pica.gif";
cargaImg[33]="imagenes/parejas/6rombo.gif";
cargaImg[34]="imagenes/parejas/6corazon.gif";
cargaImg[35]="imagenes/parejas/6trebol.gif";
cargaImg[36]="imagenes/parejas/5pica.gif";
cargaImg[37]="imagenes/parejas/5rombo.gif";
cargaImg[38]="imagenes/parejas/5corazon.gif";
cargaImg[39]="imagenes/parejas/5trebol.gif";
cargaImg[40]="imagenes/parejas/4pica.gif";
cargaImg[41]="imagenes/parejas/4rombo.gif";
cargaImg[42]="imagenes/parejas/4corazon.gif";
cargaImg[43]="imagenes/parejas/4trebol.gif";
cargaImg[44]="imagenes/parejas/3pica.gif";
cargaImg[45]="imagenes/parejas/3rombo.gif";
cargaImg[46]="imagenes/parejas/3corazon.gif";
cargaImg[47]="imagenes/parejas/3trebol.gif";
cargaImg[48]="imagenes/parejas/2pica.gif";
cargaImg[49]="imagenes/parejas/2rombo.gif";
cargaImg[50]="imagenes/parejas/2corazon.gif";
cargaImg[51]="imagenes/parejas/2trebol.gif";

/*
 * seleccionamos la dificultad elegida
 * creamos x imagenes segun la dificultad
 */
function difGame(num){
	var divPar = document.getElementById("parejas");
	var numPar = 0;
	if(num=="facil"){
		numPar=10*2;
	}else if(num=="medio"){
		numPar=15*2;
	}else if(num=="dificil"){
		numPar=35*2;
		divPar.style.width="70%";
	}else{
		numPar=51*2;
		divPar.style.width="90%";
	}
	var divDif = document.getElementById("dificultad");//ocultamos las dificultades
	divDif.className="noVisible";
	var prejas = document.getElementById("parejas");//mostramos el tablero de juego
    var botini = document.getElementById("inicio");//mostramos el boton de volver
	prejas.style.visibility="visible";
    botini.style.visibility="visible";
	var selec = document.getElementById("recargar");//mostramos el boton seleccionar dificultad una vez la hayamos seleccionado
	selec.style.visibility="visible";
	for(var a=0;a<numPar;a++){//creamos las imagenes necesarias dependiendo de la dificultad
		var imagen = document.createElement("img");
		imagen.src="imagenes/parejas/atras.png";
		imagen.id=a;
		imagen.onclick=function(){cambiarImagen(this.id);};
		divPar.appendChild(imagen);
	}
	var comenzo = document.getElementById("start");
	comenzo.style.visibility="visible";//mostramos el boton empezar
	var areaTxt = document.getElementById("txtarea");
	areaTxt.style.visibility="visible";//mostramos el textarea
	imagenesOcultas=document.images;//iniciamos el array de imagenes
}

/*
 * ordenamos las imagenes aleatoriamente
 */
function aleatorias(iden){
	if(iden == "start"){
		gameStart=true;
        var star = document.getElementById("start");
        star.onclick=null;
		var area=document.getElementById("txtarea");
		area.innerHTML="";
		anadirTexto("¡Comienza el juego!");
		var aleat;
		var comproPos=[];
		var contTrue=0;
		for(var a=0;a<imagenesOcultas.length;a++){
			comproPos[a]=0;
		}
		while(contTrue<imagenesOcultas.length){
			aleat=Math.round(Math.random() * (imagenesOcultas.length/2)-1);
			if(comproPos[aleat] < 2){
				cargaAleat[contTrue] = cargaImg[aleat];
				comproPos[aleat]++;
				contTrue++;
			}
		}
		for(var a=0;a<imagenesOcultas.length;a++){
			imagenesOcultas[a].src=cargaAleat[a];
		}
		setTimeout('ocultarImagenes()', 3000);
		if(contrarreloj == true){
			var rel = document.getElementById("timer");
			rel.style.visibility="visible";
			setTimeout('decremento()',1000);//comienza la cuenta atras
		}
	}
}

/*
 * ocultamos imagenes al empezar el juego
 */
function ocultarImagenes(){
	for(var a=0;a<imagenesOcultas.length;a++){
		imagenesOcultas[a].src="imagenes/parejas/atras.png";
	}
}

/*
 * mostramos imagen al pinchar con el raton
 * comprobamos si las dos imagenes son iguales
 */
function cambiarImagen(numid){
	if(gameStart == true){
		if(!j)//si j es false no hacemos nada
			return;
		idd=parseInt(numid);//parseamos a entero el id de la imagen
		imagenesOcultas[idd].src=cargaAleat[idd];
		if(idd != idd2){
			if(idd2 < 0){//guardaremos el valor de la primera carta seleccionada
				unImg = cargaAleat[idd];
				idd2 = idd;
			}else{//comprobamos si la pareja de cartas coincide o no
				if(unImg == cargaAleat[idd]){
					anadirTexto("Pareja encontrada.");
					imagenesOcultas[idd].onclick=null;
					imagenesOcultas[idd2].onclick=null;
					var idd3=idd2;
                    j=false;//igualamos a false para esperar a ocultar la carta
					setTimeout(function(){//hacemos invisibles las imagenes al descubir una pareja
						imagenesOcultas[idd].style.visibility="hidden";
						imagenesOcultas[idd3].style.visibility="hidden";
                        j=true;//pasamos a true para poder volver a seleccionar una carta
					},1000);
					idd2 = -1;
					contIntentos++;
					contParejas++;
				}else{
					anadirTexto("Las parejas no son iguales.");
					var idd3=idd2;
					j=false;//igualamos a false para esperar a ocultar la carta
					setTimeout(function (){//volvemos a ocultar las imagenes
						imagenesOcultas[idd].src="imagenes/parejas/atras.png";
						imagenesOcultas[idd3].src="imagenes/parejas/atras.png";
						j=true;//pasamos a true para poder volver a seleccionar una carta
						},1000);
					idd2=-1;
					contIntentos++;
				}
			}
		}else//si hemos pulsado 2 veces la misma carta nos saldra un error
			anadirTexto("Error, no puedes seleccionar dos veces la misma carta.");
		partidaGanada();//comprobamos si hemos ganado la partida
	}
}

/*
 * comprobamos si hemos ganado la partida
 */
function partidaGanada(){
	if(contParejas == (imagenesOcultas.length/2)){
		anadirTexto("Enhorabuena, has ganado la partida.");
		anadirTexto("Después de "+contIntentos+" intentos has encontrado todas las parejas.");
        if(contrarreloj)
            anadirTexto("Te han sobrado "+minPasados+" minutos y "+segPasados+" segundos.");    
        gameStart=false;
	}
}

/*
 * añadimos nuevo texto a un textarea que recoge las acciones en el juego
 */
function anadirTexto(texto){
	var navegador = navigator.appName;
	if (navegador == "Microsoft Internet Explorer")
		document.getElementById("txtarea").innerText += "\n"+texto;
	else
		document.getElementById("txtarea").textContent += "\n"+texto;
    var textArea = document.getElementById("txtarea");
    textArea.scrollTop = textArea.scrollHeight;
}

/*
 * recargamos la pagina para volver a seleccionar la dificultad
 */
function recargar(){
	document.location.href = document.location.href;
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
		anadirTexto("Lo sentimos se ha terminado el tiempo.");
		anadirTexto("Has perdido la partida");
	}
}