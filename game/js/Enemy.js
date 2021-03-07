
class Enemy{
	constructor(app,resources,x,y){
		this.isEnemy = true;
		this.app = app;
		this.resources = resources;
		this.sprite = new PIXI.Sprite(resources.tank.texture);
		this.sprite.x = x; // app.renderer.width - app.renderer.width / 3;
		this.sprite.y = y; //app.renderer.height - app.renderer.height / 3;
		// Rotate around the center
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;
		this.sprite.width = 49;
		this.sprite.height = 49;
		this.app.stage.addChild(this.sprite);
		this.directionKey = {};
		this.directionKey.direction = parseInt(Math.random()*100)%5;
		
		this.directionKey.fire = 0;
		this.bullets = [];
		this.fireFlag = false;
		this.sprite.tint = Math.random() * 0xFFFFFF;
		this.stepflag = false;
		this.speed = 5;
		this.stepLengh = 2;
    }
	render(){//
		if(!this.stepflag){
			this.stepflag = true;
			if(this.stepLengh<=0){
				this.directionKey.direction = parseInt(Math.random()*100)%5;
				this.stepLengh = parseInt(Math.random()*100)+1;
			}
			this.stepLengh -- ;
			switch (this.directionKey.direction){
				case 1://上
					this.sprite.angle  = 0;
					this.sprite.y-=1;
				break;
				case 2://下
					this.sprite.angle  = 180;
					this.sprite.y+=1;
					break;
				case 3://左
					this.sprite.angle  = -90;
					this.sprite.x-=1;
					break;
				case 4://右
					this.sprite.angle  = 90;
					this.sprite.x+=1;
					break;
			}
			setTimeout(()=>{
				this.stepflag = false;
			},10)
		}
		
		
		
		//碰撞检查是否碰到墙砖块
		this.hitWalls();
		
		this.directionKey.fire = parseInt(Math.random()*100)%2;
		//开火
		
		if(this.directionKey.fire == 1){
			if(!this.fireFlag){
				this.fireFlag = true;
				this.fire();
				setTimeout(()=>{
					this.fireFlag = false;
				},100)
			}
		}
		//子弹stage
		this.bullets.forEach(bullet=>{
			bullet.render();
		})
	}
	fire(){//开火
		let bullet = new Bullet(this,this.directionKey.direction);
		this.bullets.push(bullet);
	}
	
	hitWalls(){
		app.walls.forEach(wall=>{
				let flag = this.app.bump.hit(this.sprite, wall.sprite)
				if(flag){
					switch (this.directionKey.direction){
						case 1://上
							this.sprite.y+=1;
						break;
						case 2://下
							this.sprite.y-=1;
							break;
						case 3://左
							this.sprite.x+=1;
							break;
						case 4://右
							this.sprite.x-=1;
							break;
					}
				}
				return;
			
			
		})
		
	}
}