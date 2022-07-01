const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope1, rope2, rope3;
var fruit, fruitImg;
var link1, link2, link3;

var coelhinho, coelinhoImg, coelinhoPiscando, coelinhoSad, coelinhoEating;
var backgroundImg;
var botaoCortadorDeCordas, botaoCortadorDeCordas2,botaoCortadorDeCordas3;
var botaoSopradorDeFrutas;
var botaoMutadorDeMusicas;

var balloonSound;
var cutSound;
var eatingSound;
var sadSound;
var backgroundSound;

var canW;
var canH;



function preload(){

  coelinhoImg = loadImage("./imagens/Rabbit-01.png");

  fruitImg = loadImage("./imagens/melon.png");

  backgroundImg = loadImage("./imagens/background.png");

  coelinhoSad = loadAnimation("./imagens/sad_2.png", "./imagens/sad_3.png" );

  coelinhoPiscando = loadAnimation("./imagens/blink_1.png","./imagens/blink_3.png");

  coelinhoEating = loadAnimation("./imagens/eat_0.png", "./imagens/eat_1.png", "./imagens/eat_2.png", "./imagens/eat_3.png", "./imagens/eat_4.png" );

  balloonSound = loadSound("./sons/air.wav");

  cutSound = loadSound("./sons/rope_cut.mp3");

  eatingSound = loadSound("./sons/eating_sound.mp3");

  sadSound = loadSound("./sons/sad.wav");

  backgroundSound = loadSound("./sons/sound1.mp3");

  //coelinhoPiscando.playing = true
  coelinhoEating.playing = true
  coelinhoSad.playing = true
  coelinhoSad.looping = false
  coelinhoEating.looping = false
}



function setup() 
{

  isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile){
    canW= displayWidth;
    canH= displayHeight;
    createCanvas(canW+80,canH);
  }else{
    canW= windowWidth;
    canH=windowHeight;
    createCanvas(canW,canH);
  }

  engine = Engine.create();
  world = engine.world;

  botaoCortadorDeCordas = createImg("./imagens/cut_btn.png");
  botaoCortadorDeCordas.position(20,30);
  botaoCortadorDeCordas.size(50,50)
  botaoCortadorDeCordas.mouseClicked(drop);

  botaoCortadorDeCordas2 = createImg("./imagens/cut_btn.png");
  botaoCortadorDeCordas2.position(330,35);
  botaoCortadorDeCordas2.size(50,50)
  botaoCortadorDeCordas2.mouseClicked(drop2);

  botaoCortadorDeCordas3 = createImg("./imagens/cut_btn.png");
  botaoCortadorDeCordas3.position(360,200);
  botaoCortadorDeCordas3.size(50,50)
  botaoCortadorDeCordas3.mouseClicked(drop3);



  botaoSopradorDeFrutas = createImg("./imagens/balloon.png");
  botaoSopradorDeFrutas.position(10, 250);
  botaoSopradorDeFrutas.size(150,100);
  botaoSopradorDeFrutas.mouseClicked(soprando);

  botaoMutadorDeMusicas = createImg("./imagens/mute.png");
  botaoMutadorDeMusicas.position(450,20);
  botaoMutadorDeMusicas.size(50,50);
  botaoMutadorDeMusicas.mouseClicked(mutadorDeMusica);



  ground = new Ground(250, canH, 600, 20);
 
  rope1 = new Rope(8,{x:40 ,y:30});

  rope2 = new Rope(7,{x:370 ,y:40});
  
  rope3 = new Rope(4,{x:400 ,y:225});

  var fruit_options ={
    density: 0.001
  };
  
  fruit = Bodies.circle(250,200, 15);

  coelhinho = createSprite(280,canH-70, 15,15);
  
  coelinhoEating.frameDelay = 15
  coelinhoPiscando.frameDelay = 20
  coelinhoSad.frameDelay = 20

  coelhinho.addAnimation("comendo", coelinhoEating);
  coelhinho.addAnimation("piscando", coelinhoPiscando);
  coelhinho.addAnimation("sad", coelinhoSad);
  
  coelhinho.changeAnimation("piscando");

  coelhinho.scale = 0.2
 
 
  
  Matter.Composite.add(rope1.body, fruit);
  link1 = new Link(rope1, fruit);

  link2 = new Link(rope2, fruit);
  
  link3 = new Link(rope3, fruit);

  backgroundSound.play();
  backgroundSound.setVolume(0.1);

  imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  }

function draw() 
{

  image(backgroundImg,width/2, height/2 ,canW,canH);
 
  
 
  Engine.update(engine);

  

  rope1.show()

  rope2.show()

  rope3.show()

  if (fruit!== null){
    image(fruitImg, fruit.position.x, fruit.position.y, 55,55);
  }

  if (collided(fruit, coelhinho)){
    World.remove(world, fruit);
    fruit = null;
    coelhinho.changeAnimation("comendo");
    eatingSound.play();
  }

  if (fruit!== null && fruit.position.y > 650){
    coelhinho.changeAnimation("sad");
    sadSound.play();
    sadSound.setVolume(0.5);
    fruit = null;
  }
  
  drawSprites()
}

function drop(){
  cutSound.play();
  cutSound.setVolume(0.2);

  rope1.break();
 
  link1.dettach();

  link1 = null;
}

function drop2(){
  cutSound.play();
  cutSound.setVolume(0.2);

  rope2.break();
 
  link2.dettach();

  link2 = null;
}

function drop3(){
  cutSound.play();
  cutSound.setVolume(0.2);

  rope3.break();
 
  link3.dettach();

  link3 = null;
}



function collided(fruta, body){
  if (fruta !== null){
    var d = dist(fruta.position.x, fruta.position.y, body.position.x, body.position.y);
    if  (d<= 60){
      return true;
    } else {
      return false;
    }
  }
}

function soprando(){
  Body.applyForce(fruit,{x:0, y:0}, {x:0.01, y:0});
  balloonSound.play();
  balloonSound.setVolume(0.2)
}

function mutadorDeMusica(){
  if (backgroundSound.isPlaying()){
    backgroundSound.stop();
  }else {
    backgroundSound.play();
  }
}
