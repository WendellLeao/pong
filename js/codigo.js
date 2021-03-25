var canvas = document.getElementById("myCanvas");
var contexto = canvas.getContext("2d");

var raio = 10;
var x = canvas.width/2; //ponto inicial da bola no centro em x
var y = canvas.height - 30; //ponto inicial da bola no centro em y (parte inferior)

var velocidade=1;
var dx = 2;
var dy = -2;

var blocoAltura = 10;
var blocoLargura = 75;
var blocoX = (canvas.width - blocoLargura)/2;

var btnDireitoPressionado = false;
var btnEsquerdoPressionado = false;

var pontos = 0;

document.addEventListener("keydown", teclaPressionada, false);
document.addEventListener("keyup", teclaLiberada, false);

function teclaPressionada(e){
	if(e.key == "Right" || e.key == "ArrowRight"){
		btnDireitoPressionado = true;
	}
	else if(e.key =="Left" || e.key == "ArrowLeft"){
		btnEsquerdoPressionado = true;
	}
}

function teclaLiberada(e){
	if(e.key=="Right" || e.key=="ArrowRight"){
		btnDireitoPressionado = false;
	}
	else if(e.key=="Left" || e.key == "ArrowLeft"){
		btnEsquerdoPressionado = false;
	}
}

function desenharBola(){
	contexto.beginPath(); //coloco a caneta
	contexto.arc(x, y, raio, 0, Math.PI*2);
	if(pontos<5){
		contexto.fillStyle = "#000000";
		velocidade = 1;
	}
	if(pontos>=5 && pontos <=10){
		contexto.fillStyle = "#000080";
		velocidade = 2;
	}
	if(pontos>10)
	{
		contexto.fillStyle = "#FF1493";
		velocidade = 3;
	}		
	
	contexto.fill();
	contexto.closePath(); //tiro a caneta e paro de desenhar
}

function imagemGameOver(){
	imagem = new Image();
	imagem.src = 'img/gameover.jpg';
	imagem.onload = function(){
		contexto.clearRect(0,0,canvas.width,canvas.height);
		contexto.drawImage(imagem,0,0,canvas.width,canvas.height);
	}
}

function desenharBloco(){
	contexto.beginPath();
	contexto.rect(blocoX, canvas.height - blocoAltura, blocoLargura, blocoAltura);
	contexto.fillStyle = "#000000";
	contexto.fill();
	contexto.closePath();
}

function score(){
	contexto.fillStyle = "rgb(000, 000, 000)";
	contexto.font = "24px Helvetica";
	contexto.textAlign = "left";
	contexto.fillText("Pontos: "+pontos,20,20);
	contexto.fillText("Nível: "+velocidade,380,20);
}

function desenhar(){
	contexto.clearRect(0,0,canvas.width,canvas.height);
	desenharBola();
	desenharBloco();
	score();
	
	//parede direita
	if(x+dx > canvas.width-raio){
		dx = -dx;
	}
	
	//parede superior (teto)
	if(y+dy < raio){
		dy = -dy;
	}//parede inferior (piso)
	else if(y+dx > canvas.height-raio)
	{
		//colisão com a barra
		if(x>blocoX && x < blocoX + blocoLargura) 
		{ //se for a colisao com o bloco!!
			dy = -dy;
			pontos++;
		}
		else
		{ //se a colisão for com o chão 
			dy= -dy;
			pontos--;
		}
	}
	
	//parede esquerda
	if(x+dx < raio){
		dx = -dx;
	}
	
	if(btnDireitoPressionado && blocoX < (canvas.width - blocoLargura)){
		blocoX += 7; //blocoX = blocoX + 7
	} else if(btnEsquerdoPressionado && blocoX > 0){
		blocoX -= 7;
	}

	if(pontos<0)
	{
		imagemGameOver();
		clearInterval(interval);
	}
	
	x += dx*velocidade;
	y += dy*velocidade;
}

interval = setInterval(desenhar, 10);