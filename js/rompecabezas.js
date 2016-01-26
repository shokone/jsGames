/*
 * Desarrollado por Iván Martínez Tutor
 * clase javascript para el juego rompecabezas
 */
var posicionOri=[];//guardaremos la posicion original de las imagenes
var posicionAleat=[];//guardaremos las imagenes ordenadas aleatoriamente
var imagenes=document.images;
var gameStart=false;//comprobamos si el juego ha empezado
var srcOculta="";
var casOculta=0;//guardaremos el valor de la casilla oculta
var filas = 0;//guardamos la cantidad de imagenes que habra en cada fila
var xid = 0;//guardaremos el id de cada imagen nueva creada
var contrarreloj = false;//comprobamos si hemos activado el modo contrarreloj
var mins = 5;//numero de minutos que queremos tenga el cronometro
var segs = mins * 60;//calculamos los segundos
var segPasados = 0;//guardamos los segundos que han pasado
var minPasados = 0;//guardamos los minutos que han pasado
var compReloj = false;//comprobamos si el tiempo de juego ha terminado

/*
 * cargamos las imagenes en la posicion original para la dificultad facil
 */
function imgCompletafa(){
    posicionOri[0]="imagenes/rompecabezas/facil/f01.gif";
    posicionOri[1]="imagenes/rompecabezas/facil/f02.gif";
    posicionOri[2]="imagenes/rompecabezas/facil/f03.gif";
    posicionOri[3]="imagenes/rompecabezas/facil/f04.gif";
    posicionOri[4]="imagenes/rompecabezas/facil/f05.gif";
    posicionOri[5]="imagenes/rompecabezas/facil/f06.gif";
    posicionOri[6]="imagenes/rompecabezas/facil/f07.gif";
    posicionOri[7]="imagenes/rompecabezas/facil/f08.gif";
    posicionOri[8]="imagenes/rompecabezas/facil/f09.gif";
    for(var a=0;a<9;a++){//imprimimos
        imagenes[a].src = posicionOri[a];
    }
}

/*
 * cargamos las imagenes en la posicion original para la dificultad media
 */
function imgCompletame(){
	posicionOri[0]="imagenes/rompecabezas/medio/med01.gif";
    posicionOri[1]="imagenes/rompecabezas/medio/med02.gif";
    posicionOri[2]="imagenes/rompecabezas/medio/med03.gif";
    posicionOri[3]="imagenes/rompecabezas/medio/med04.gif";
    posicionOri[4]="imagenes/rompecabezas/medio/med05.gif";
    posicionOri[5]="imagenes/rompecabezas/medio/med06.gif";
    posicionOri[6]="imagenes/rompecabezas/medio/med07.gif";
    posicionOri[7]="imagenes/rompecabezas/medio/med08.gif";
    posicionOri[8]="imagenes/rompecabezas/medio/med09.gif";
	posicionOri[9]="imagenes/rompecabezas/medio/med10.gif";
	posicionOri[10]="imagenes/rompecabezas/medio/med11.gif";
	posicionOri[11]="imagenes/rompecabezas/medio/med12.gif";
	posicionOri[12]="imagenes/rompecabezas/medio/med13.gif";
	posicionOri[13]="imagenes/rompecabezas/medio/med14.gif";
	posicionOri[14]="imagenes/rompecabezas/medio/med15.gif";
	posicionOri[15]="imagenes/rompecabezas/medio/med16.gif";
    for(var a=0;a<16;a++){//imprimimos
        imagenes[a].src = posicionOri[a];
    }
}

/*
 * cargamos las imagenes en la posicion original para la dificultad dificil
 */
function imgCompletadi(){
	posicionOri[0]="imagenes/rompecabezas/dificil/dif01.gif";
	posicionOri[1]="imagenes/rompecabezas/dificil/dif02.gif";
	posicionOri[2]="imagenes/rompecabezas/dificil/dif03.gif";
	posicionOri[3]="imagenes/rompecabezas/dificil/dif04.gif";
	posicionOri[4]="imagenes/rompecabezas/dificil/dif05.gif";
	posicionOri[5]="imagenes/rompecabezas/dificil/dif06.gif";
	posicionOri[6]="imagenes/rompecabezas/dificil/dif07.gif";
	posicionOri[7]="imagenes/rompecabezas/dificil/dif08.gif";
	posicionOri[8]="imagenes/rompecabezas/dificil/dif09.gif";
	posicionOri[9]="imagenes/rompecabezas/dificil/dif10.gif";
	posicionOri[10]="imagenes/rompecabezas/dificil/dif11.gif";
	posicionOri[11]="imagenes/rompecabezas/dificil/dif12.gif";
	posicionOri[12]="imagenes/rompecabezas/dificil/dif13.gif";
	posicionOri[13]="imagenes/rompecabezas/dificil/dif14.gif";
	posicionOri[14]="imagenes/rompecabezas/dificil/dif15.gif";
	posicionOri[15]="imagenes/rompecabezas/dificil/dif16.gif";
	posicionOri[16]="imagenes/rompecabezas/dificil/dif17.gif";
	posicionOri[17]="imagenes/rompecabezas/dificil/dif18.gif";
	posicionOri[18]="imagenes/rompecabezas/dificil/dif19.gif";
	posicionOri[19]="imagenes/rompecabezas/dificil/dif20.gif";
	posicionOri[20]="imagenes/rompecabezas/dificil/dif21.gif";
	posicionOri[21]="imagenes/rompecabezas/dificil/dif22.gif";
	posicionOri[22]="imagenes/rompecabezas/dificil/dif23.gif";
	posicionOri[23]="imagenes/rompecabezas/dificil/dif24.gif";
	posicionOri[24]="imagenes/rompecabezas/dificil/dif25.gif";
    for(var a=0;a<25;a++){//imprimimos
        imagenes[a].src = posicionOri[a];
    }
}

/*
 * comprobamos la dificultad elegida
 * creamos los elementos necesarios para la dificultad elegida
 * cargamos las imagenes de la dificultad elegida
 */
function modos(iden){
	var ejem = document.getElementById("ejemplo");
	if(iden == "facil"){
		filas=3;
		ejem.className="facil";
	}else if(iden == "medio"){
		filas=4;
		ejem.className="medio";
	}else{
		filas=5;
		ejem.className="dificil";
	}
	var difi = document.getElementById("dificultad");
	difi.className="noVisible";
	var tablas = document.getElementById("rompe");//cargamos la tabla
	var comenzar = document.getElementById("start");//mostramos el boton start al seleccionar una dificultad
	var selec = document.getElementById("recargar");//mostramos el boton seleccionar dificultad una vez la hayamos seleccionado
	var volver = document.getElementById("volver");
	selec.style.visibility="visible";
	tablas.style.visibility="visible";
	comenzar.style.visibility="visible";
	volver.style.visibility="visible";
	for(var a=0;a<filas;a++){
		var fila = document.createElement("tr");//creamos una nueva fila en la tabla
		fila.id="tr"+a;
		tablas.appendChild(fila);
		for(var f=0;f<filas;f++){
			var columna = document.createElement("td");//creamos una nueva columna en la fila
			var imagen = document.createElement("img");//creamos una nueva imagen en la columna
			columna.id="td"+a+f;
			fila.appendChild(columna);
			imagen.id=xid;
			imagen.onclick=function(){mover(this.id);}
			columna.appendChild(imagen);
			xid++;
		}
	}
	if(iden == "facil"){
		imgCompletafa();
	}else if(iden == "medio"){
		imgCompletame();
	}else{
		imgCompletadi();
	}
}

/*
 * ordenamos aleatoriamente las imagenes a ordenar
 */
function aleat(idnum){
	if(idnum=="start"){//comprobamos si el juego ha comenzado
        gameStart=true;
    }
    var comenzar = document.getElementById("start");
    comenzar.onclick=null;
    var ale;
    var contador=1;
    var comproPos=[];
    for(var a=0;a<(posicionOri.length-1);a++){
        comproPos[a]=false;
    }
    while(contador<posicionOri.length){
            ale=Math.round(Math.random()*(posicionOri.length));
            if(comproPos[ale]==false){
                posicionAleat[contador]=posicionOri[ale];
                comproPos[ale]=true;
                contador++;
            }
    }
    posicionAleat[0]="imagenes/rompecabezas/romOculta.png";
    for(var a=0;a<posicionOri.length;a++){
        imagenes[a].src=posicionAleat[a];
    }
	if(contrarreloj == true){
		var rel = document.getElementById("timer");
		rel.style.visibility="visible";
		setTimeout('decremento()',1000);//comienza la cuenta atras
	}
}

/*
 * movemos las piezas del rompecabezas
 */
function mover(numid){
	if(gameStart == true){
		//guardamos la posicion de la casilla oculta
		for(var a=0;a<posicionAleat.length;a++){
			if(posicionAleat[a]=="imagenes/rompecabezas/romOculta.png")
				casOculta=a;
		}
		var idd=parseInt(numid);//convertimos el id de la imagen a entero
		if(gameStart){//si el juego a comenzado cambiamos la posicion de la casilla oculta con la seleccionada
			if(casOculta==(idd+1) || casOculta==(idd-1) || casOculta==(idd+filas) || casOculta==(idd-filas)){//comprobamos las posiciones
				if((casOculta==(filas-1) && idd==filas) || (idd==(filas-1) && casOculta==filas)){
				}else if((casOculta==((filas*2)-1) && idd==(filas*2)) || (idd==((filas*2)-1) && casOculta==(filas*2))){
				}else if((casOculta==((filas*3)-1) && idd==(filas*3)) || (idd==((filas*3)-1) && casOculta==(filas*3))){
				}else if((casOculta==((filas*4)-1) && idd==(filas*4)) || (idd==((filas*4)-1) && casOculta==(filas*4))){
				}else{//cambiamos la posicion de la imagen oculta por la imagen 
					srcOculta=posicionAleat[idd];//guardamos el src de la imagen escogida
					posicionAleat[idd]=posicionAleat[casOculta];//guardamos el src de la casilla oculta en la imagen escogida
					posicionAleat[casOculta]=srcOculta;//guardamos el src de la casilla escogida en el lugar de la casilla oculta
				}
			}
			for(var a=0;a<posicionAleat.length;a++){
				imagenes[a].src=posicionAleat[a];
			}
		}
		ganado();
	}
}

/*
 * comprobamos si hemos ganado la partida
 */
function ganado(){
    var contWin=0;//guardamos la cantidad de aciertos 
    for(var s=0;s<(posicionAleat.length-1);s++){
        if(posicionAleat[s]==posicionOri[s])
            contWin++;
        else if(posicionAleat[s]==posicionOri[s])
            contWin--;
    }
    if(contWin == (posicionAleat.length-1)){//si hemos acertado todos aparece un mensaje de victoria y se muestra el dibujo entero
        alert("Enhorabuena has ganado la partida");
        for(var a=0;a<posicionOri.length;a++){
            imagenes[a].src = posicionOri[a];
        }
		gameStart=false;
    }
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
	if(segs !== -1) 
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