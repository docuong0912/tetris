function Shape(ctx,x,y,type) {
	this.ctx = ctx;
	this.x=x;
	this.y=y;
	this.size=20;
	this.flip=0;
	this.num = type;
	switch(type){
		//N
		case 0:
			this.type = [
			[[0,0,0],
			[1,1,0],
			[0,1,1]],
			[[0,1,0],
			[1,1,0],
			[1,0,0]],
			[[0,0,0],
			[1,1,0],
			[0,1,1]],
			[[0,0,1],
			[0,1,1],
			[0,1,0]]
		];
		break;
		//L
		case 1:
			this.type=[
			[[1,0,0],
			[1,0,0],
			[1,1,0]],
			[[0,0,0],
			[0,0,1],
			[1,1,1]],
			[[0,1,1],
			[0,0,1],
			[0,0,1]],
			[[0,0,0],
			[1,1,1],
			[1,0,0]]
		];
		break;
		//T
		case 2:
			this.type=[
			[[0,0,0],
			[0,1,0],
			[1,1,1]],
			[[0,0,1],
			[0,1,1],
			[0,0,1]],
			[[0,0,0],
			[1,1,1],
			[0,1,0]],
			[[1,0,0],
			[1,1,0],
			[1,0,0]]
		];
		break;
		case 3:
			this.type=[
			[[0,0,0],
			[0,0,0],
			[1,1,1]],
			[[0,1,0],
			[0,1,0],
			[0,1,0]]
			
		];
		break;
		case 4:
		//O
			this.type=[
			[[0,0,0],
			[1,1,0],
			[1,1,0]]
			
		];
		break;
		//L mirror
		case 5:
			this.type=[
			[[1,1,0],
			[1,0,0],
			[1,0,0]],
			[[0,0,0],
			[1,0,0],
			[1,1,1]],
			[[0,0,1],
			[0,0,1],
			[0,1,1]],
			[[0,0,0],
			[1,1,1],
			[0,0,1]]
		];
		break;
		//N mirror
		case 6:
			this.type = [
			[[0,0,0],
			[0,1,1],
			[1,1,0]],
			[[0,1,0],
			[0,1,1],
			[0,0,1]],
			[[0,0,0],
			[0,1,1],
			[1,1,0]],
			[[0,1,0],
			[0,1,1],
			[0,0,1]]
		];
		break;
	} 
	this.update = function(){
		for (var i = 0; i < this.type.length; i++) {
			for (var j = 0; j < this.type[i].length; j++) {
				for(var k=0;k<this.type[i][j].length;k++){
					if(this.type[this.flip][j][k]==1){
					const tile = new Tile(this.ctx,k*this.size+this.x,j*this.size+this.y);
					tile.update();
					}
				}		
			}
		}
		
	}
	
}