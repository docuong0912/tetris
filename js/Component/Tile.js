function Tile(ctx,x,y){
	this.width=20;
	this.height=20;
	this.x=x;
	this.y=y;
	this.update = function(){
		
		ctx.fillStyle = "red";
		
		ctx.beginPath();
		ctx.rect(this.x,this.y,this.width,this.height);
		ctx.stroke()
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}
}