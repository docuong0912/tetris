
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
this.canvas.width = 200;
this.canvas.height = 800;
this.canvas.style.border = "2px solid black";
var shape;
var map = [...Array(41)].map(()=>new Array(10));
var fall = true;
var speed ;

function init(){
	shape = new Shape(context,40,0,Math.floor(Math.random()*7));
	for(let i=0;i<map.length;i++){
		for(let j=0;j<map[i].length;j++){
			if(i==map.length-1) map[i][j]=-1;
			else map[i][j] = 0;
	}}
	speed = shape.size;
}
function generateShape(){
	shape = new Shape(context,40,0,Math.floor(Math.random()*7));
	shape.flip = Math.floor(Math.random()*shape.type.length);
}
function updateMap(){
	for(let i=0;i<shape.type[shape.flip].length;i++){
		for(let j = 0; j<shape.type[shape.flip][i].length;j++){
			if(shape.type[shape.flip][i][j]==1)
			if(overflow()==1){
				shape.x-=shape.size;
			}
			else if(overflow()==-1){
				shape.x+=shape.size;
			}
			else if((isLanded(i,j)||!isFree(i,j))&&shape.type[shape.flip][i][j]==1)
	 			{
					fall = false;
					pushBlock(i,j);
		
			}
		}}
	
	if(fall) 
	shape.y+=speed;
	else{
		generateShape();
		fall = true;
		checkMap();
	}

}
function checkMap(){
	for(let i = 0;i<map.length;i++){
		if(map[i].every(tile=>tile==1)){
			for(let j=0;j<map[i].length;j++){
				map[i][j]=0;
			}
			for(let j=i;j>0;j--){

				for(let k = 0;k<map[j].length;k++){
					map[j][k] = map[j-1][k]
				}
			}
		}
	}

}
function isFreeHor(direction) {
   let temp = [];
  for (let i = 0; i < shape.type[shape.flip].length; i++) {
    for (let j = 0; j < shape.type[shape.flip][i].length; j++) {
      if (shape.type[shape.flip][i][j] === 1) {
        temp.push(j);
      }
    }
  }
  let offset = direction === 'left' ? -1 : 1;
  let maxOrMin = direction === 'left' ? Math.min : Math.max;
  for (let i = 0; i < shape.type[shape.flip].length; i++) {
    for (let j = 0; j < shape.type[shape.flip][i].length; j++) {
      if (shape.type[shape.flip][i][j] === 1) {
        let row = shape.y / shape.size + i;
        let col = shape.x / shape.size + j + offset;
        if (col < 0 || col >= map[0].length || row >= map.length || map[row][col] !== 0) {
          return false;
        }
      }
    }
  }
  return true;
}
function isFreeLeft(){
	let temp = [];
	for(let i=0;i<shape.type[shape.flip].length;i++)
		for(let j = 0; j<shape.type[shape.flip][i].length;j++)
			if(shape.type[shape.flip][i][j]==1){
				temp.push(j);
			}
	for(let i=0;i<shape.type[shape.flip].length;i++)
	if(map[shape.y/shape.size+i][shape.x/shape.size+Math.min(...temp)-1]==0)
		return true;
	return false;
}
function isFreeRight(){
	let temp = [];
	for(let i=0;i<shape.type[shape.flip].length;i++)
		for(let j = 0; j<shape.type[shape.flip][i].length;j++)
			if(shape.type[shape.flip][i][j]==1){
				temp.push(j);
			}
	for(let i=0;i<shape.type[shape.flip].length;i++)
	if(map[shape.y/shape.size+i][shape.x/shape.size+Math.max(...temp)+1]==0)
		return true;
	return false;
}
function isFree(i,j){
	if(map[shape.y/shape.size+i+1][shape.x/shape.size+j]==0)
		return true;
	return false;
}

function isLanded(i,j){
	
	if(map[shape.y/shape.size+i+1][shape.x/shape.size+j]==-1)
		return true;
	return false;
}
function pushBlock(i,j){
	for(let i=0;i<shape.type[shape.flip].length;i++){
		for(let j = 0; j<shape.type[shape.flip][i].length;j++){

			if(map[shape.y/shape.size+i][shape.x/shape.size+j]==0)
			map[shape.y/shape.size+i][shape.x/shape.size+j] = shape.type[shape.flip][i][j];	
		}
	}
}
function drawMap(){
	for(let i=0;i<map.length;i++){
		for(let j=0;j<map[i].length;j++){
			context.beginPath();
			context.rect(j*shape.size, i*shape.size, shape.size, shape.size);
			context.stroke()
			if(map[i][j] == 1){
				const tile = new Tile(context,j*shape.size,i*shape.size);
				tile.update();
			}
		}
	}
	
}
function overflow(){
	for(let i=0;i<shape.type[shape.flip].length;i++)
		for(let j = 0; j<shape.type[shape.flip][i].length;j++)
			if(map[shape.y/shape.size+i][shape.x/shape.size+j]==undefined &&shape.type[shape.flip][i][j]==1){
				if(shape.x/shape.size+j>=map[i].length)
				return 1;
				else return -1;
			}

	return 0;
}
document.addEventListener("keyup",(e)=>{
	if(e.key=='ArrowUp'){
		shape.flip++;
		if(shape.flip>shape.type.length-1){
			shape.flip=0;
		}
	}
	else if(e.key=='ArrowRight'){
		if(isFreeHor('tight'))
		shape.x+=shape.size;
		
			

	}
	else if(e.key=='ArrowLeft'){
		if(isFreeHor('left'))
		shape.x-=shape.size;

	}
	else if(e.key=='ArrowDown'){
		speed = shape.size;
		
	}
})
document.addEventListener("keydown",(e)=>{
	if(e.key=='ArrowDown'){

		speed=shape.size*2;
	}
})
init();
const update = setInterval(()=>{
	context.clearRect(0,0,this.canvas.width,this.canvas.height);
	shape.update();
	updateMap();
	drawMap();
},20);



