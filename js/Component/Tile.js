function Tile(ctx,x,y){
	this.width=20;
	this.height=20;
	this.x=x;
	this.y=y;
	this.update = function(){
		ctx.fillStyle = "red";
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}
}