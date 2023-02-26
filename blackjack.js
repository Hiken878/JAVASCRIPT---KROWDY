//Mostramos el canvas en HD
var canvas = document.getElementById("canvas");
canvas.width = 1220 * 2;
canvas.height = 400 * 2;
canvas.style.width = 1220 + "px";
canvas.style.height = 400 + "px";
var ctx = canvas.getContext("2d");

//class carta
class carta {
    //variables estaticas de la clase
    static x = 50;
    static y = 50;

    constructor(valor, naipe) {
        this.img = new Image();
        this.valor = valor;
        this.naipe = naipe;
    }
}

//Variables que se van a usar
var cartas = []; //las cartas que hay en total dentro de la baraja
var cartasJugador = []; //cartas que recibio el jugador
var cartasCrupier = []; //cartas que tiene el tallador
var indiceCarta = 0; //index de inicializacion de la lista de cartas
const naipes = ["S", "C", "D", "H"]; //inicial de los nombres de la baraja en español
//Generamos las cartas con los atributos de valor y naipe
for (i = 0; i < 4; i++) { //se inicia el ciclo for con inicial de cero hasta llegar a 4 por cada uno de las familias de la baraja y se incrementa en uno su valor
    for (j = 1; j <= 13; j++) { // se inicia el ciclo for para repartir las cartas en uno a la vez hasta llegar a trece que son las cartas en total de cada una de las familias de la baraja
        cartas.push(new carta(j, naipes[i]));        
    }
}
//Barajamos las cartas
for (i = 0; i < 100; i++) { // se inicia el ciclo revolviendo las cartas hasta 100 veces
    cartas.splice(Math.random() * 52, 0, cartas[0]); //con la funcion splice se desplaza aleatoriamiente una de las 52 cartas y se forma un array de un solo elemento.
    cartas.shift(); //se elimina la primera carta dentro de la baraja
}

function dibujarCarta(CJ) {
    //tenemos que primero cargar la carta y luego añadir el source sino las cartas no cargan en la pagina
    CJ.img.onload =() => {
        ctx.drawImage(CJ.img, carta.x, carta.y, 238, 335);
        carta.x += 300;
    };
    // para cargar la imagen correctamente se concatena el numero con el naipe, que coincida con el fichero
    CJ.img.src = "imagenes/cartas/" + CJ.valor.toString() + CJ.naipe + ".svg";
} // primero se carta las cartas y luego se añade la fuente de la imagen para que cargue como si fuera una previsualizacion

function pedirCarta() {
    //Ponemos un maximo de cartas para que pueda sacar el crupier de la baraja y estas no se repitan
    if (indiceCarta < 8) {
        let CJ = cartas[indiceCarta]; //carta jugada
        cartasJugador.push(CJ); //se añade a las cartes del jugador
        dibujarCarta(CJ); // se dibuja la carta que se selecciono
        indiceCarta++;
    }
}

function nomascartas() {
    document.getElementById("pedir").disable = true;
    document.getElementById("nomas").disable = true; //se deshabilitan los botones cuando se ya no se quieren mas cartas
    document.getElementById("reset").style.visibility = "visible"; //aparece el boton de reset para jugar de nuevo
    let pointsUser = 0; //declaramos las variables unicas para mostrar los puntos del jugador y el cupier
    let pointsCrupier = 0;
    let info = document.getElementById("info");
    // contamos e imprimimos los puntos del jugador
    for (i in cartasJugador) {
             pointsUser += cartasJugador[i].valor;
    }
    //sacamos cartas al crupier y contamos sus puntos
    while (pointsCrupier < 17) { //funcion while se mantiene ciclico siempre cuando los puntos se mantengan debajo de 17
        cartasCrupier.push(cartas[indiceCarta]);
        pointsCrupier += cartas[indiceCarta].valor;
        indiceCarta++;
    }
    // Puntos de la partida se poenen en info
    info.innerHTML = "Puntuacion del jugador: " + pointsUser + "<br>Puntuacion del crupier: " + pointsCrupier;
    //Dibujamos las cartas del crupier
    carta.x = 50;
    carta.y = 400;
    for (i in cartasCrupier) {
        dibujarCarta(cartasCrupier[i]);
    }
    //comprobamos ganador
    if (pointsUser == 21){
        info.innerHTML +="<br><b>Blackjack!! ¡HAZ GANADO!</b>";
    } else if (pointsUser > 21) {
        info.innerHTML +="<br><b>HAZ PERDIDO, Sigue intentando</b>";
    }    else if (pointsCrupier > 21) {
            info.innerHTML +="<br><b>HAZ GANADO, LA CASA PIERDE</b>";
    } else if (pointsCrupier >= pointsUser) {
        info.innerHTML +="<br><b>HAZ PERDIDO, GANA LA CASA..XD</b>";
    } else {
        info.innerHTML +="<br><b>FELICITACIONES ¡¡HAZ GANADO!!</b>";
    }
}
// Recarga la pagina cuando se presiona el boton reset
function playagain() {
    location.reload(true);
}
