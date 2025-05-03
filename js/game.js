"use strict"

const canvas=document.querySelector("#canvas");
const context=canvas.getContext("2d");
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
canvas.style.background="#ff8";

let gravity=0.5;
class Platform{
    constructor(x,y,width,height){
        this.position={x:x,y:y};
        this.width=width;
        this.height=height;
    }
    draw(){
        context.fillStyle="blue";
        context.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
}
class Player{
    constructor(){
        this.position={x:100, y:100}
        this.velocity={x:0,y:4};
        this.width=40;
        this.height=40;
    }
    draw(){
        context.fillStyle="red";
        context.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
    playerMovements(){
        context.clearRect(0,0,canvas.width,canvas.height);
        
        this.position.x+=this.velocity.x;
        this.position.y+=this.velocity.y;
        if(this.position.y+this.height+this.velocity.x>=canvas.height){
            this.velocity.y=0;
        }
        else{
            this.velocity.y+=gravity;
        }
        this.draw();

        //platform logic
        for(let i=0;i<platforms.length;i++){
        if((this.position.x+this.width+this.velocity.x-10>=platforms[i].position.x) && 
            (this.position.x+this.width<platforms[i].position.x+platforms[i].width+40) &&
            (this.position.y+this.height+this.velocity.y>=platforms[i].position.y) &&
            (this.position.y+this.height<=platforms[i].position.y+platforms[i].height-5)){
            this.velocity.y=0;
        }
        if((this.position.x+this.width==platforms[i].position.x) && (this.position.y+this.height>platforms[i].position.y) && (this.position.y<platforms[i].position.y+platforms[i].height)){
            this.velocity.x=0;
        }
    }

}
}
addEventListener("keyup",function(e){
    if(e.key=="ArrowRight"){
        player.velocity.x=0;
    }
    if(e.key=="ArrowLeft"){
        player.velocity.x=0;
    }
})
addEventListener("keydown",function(e){
    if(e.key=="ArrowUp"){
        player.velocity.y=-14;
    }
    if(e.key=="ArrowRight"){
        player.velocity.x=4;
    }
    if(e.key=="ArrowLeft"){
        player.velocity.x=-4;
    }
})






const player=new Player();
player.draw();

const platform=new Platform(300,800,100,15);
platform.draw();
const platform1=new Platform(700,800,100,180);
platform1.draw();
let platforms=[];
platforms.push(platform);
platforms.push(platform1);


function gameAnimations(){
    requestAnimationFrame(gameAnimations);
    player.playerMovements();
    for(let i=0;i<platforms.length;i++){
        platforms[i].draw();
    }
    }
gameAnimations();