
class Tank{
	constructor(app,resources,directionKey){
		this.isEnemy = false;
		this.app = app;
		this.resources = resources;
		this.sprite = new PIXI.Sprite(resources.tank.texture);
		this.sprite.x = app.renderer.width / 2;
		this.sprite.y = app.renderer.height / 2;
		// Rotate around the center
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;
		this.sprite.width = 49;
		this.sprite.height = 49;
		this.app.stage.addChild(this.sprite);
		this.directionKey = keyboardFire(directionKey);
		this.bullets = [];
		this.fireFlag = false;
		this.speed = 5;
    }
	render(){//
		switch (this.directionKey.direction){
			case 1://上
				this.sprite.angle  = 0;
				this.sprite.y-=this.speed;
			break;
			case 2://下
				this.sprite.angle  = 180;
				this.sprite.y+=this.speed;
				break;
			case 3://左
				this.sprite.angle  = -90;
				this.sprite.x-=this.speed;
				break;
			case 4://右
				this.sprite.angle  = 90;
				this.sprite.x+=this.speed;
				break;
		}
		
		//碰撞检查是否碰到墙砖块
		this.hitWalls();
		this.hitEnemy();
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
					this.backMove();
					return;
				}
		})
		
	}
	
	hitEnemy(){
		app.enemys.forEach(enemy=>{
				let flag = this.app.bump.hit(this.sprite, enemy.sprite)
				if(flag){
					this.backMove();
					return;
				}
				
		})
	}
	
	backMove(){
		switch (this.directionKey.direction){
				case 1://上
					this.sprite.y+=this.speed;
				break;
				case 2://下
					this.sprite.y-=this.speed;
					break;
				case 3://左
					this.sprite.x+=this.speed;
					break;
				case 4://右
					this.sprite.x-=this.speed;
					break;
			}
	}
}