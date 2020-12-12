//Create variables here
var dog,dogimg
var happydog;
var database;
var foodStock,foods;
function preload()
{
  dogimg=loadImage("dogImg1.png");
  happydog=loadImage("dogImg.png");
	//load images here
}

function setup() {
  createCanvas(1000, 500);
  database=firebase.database();
  food1=new Food();
  foodStock=database.ref('food');
  foodStock.on("value",readstock);
  dog=createSprite(270,400,20,20);
  dog.addImage(dogimg);
  dog.scale=0.1;
  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feeddog);

  addfood=createButton("Add food");
  addfood.position(800,95);
  addfood.mousePressed(addfoods);
 
}


function draw() {  
background(46,139,87);
food1.display();
fedTime=database.ref('feedtime');
fedTime.on("value",function(data){
 this.lastfed=data.val();
});
fill(255,255,254);
textSize(15);
if(this.lastfed>=12){
  text("Lastfed :"+ this.lastfed%12 +"Pm" ,350,30);
}else if(this.lastfed==0){
  text("Lastfed : 12Am",350,30);
}else{
  text("Lastfed: "+ this.lastfed +"Am",350,30);
}
 
  drawSprites();
  //add styles here
  fill("black");
  stroke("white");
  textSize(25);
text("Food Remaining:"+ foods,100,100);


}

function readstock(data){
  foods=data.val();
  food1.updatefoodstock(foods);
}
function writestock(x){

  if(x<=0){
    x=0;
  } else{
    x=x-1;
  }
  database.ref('/').update({
  food:x
  })
}
function feeddog(){
  dog.addImage(happydog);
  food1.updatefoodstock(food1.getfoodstock()-1);
  database.ref('/').update({
    food:food1.getfoodstock(),
    feedtime:hour ()

  })
}

function addfoods(){
  foods++;
  database.ref('/').update({
    food:foods
  })
}



