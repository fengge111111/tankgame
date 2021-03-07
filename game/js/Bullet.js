
class Bullet{
	constructor(tank,direction){
		this.tank = tank;
		this.direction = direction;
		this.sprite = new PIXI.Sprite(this.tank.resources.bullet.texture);
		// Rotate around the center
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;
		this.sprite.angle  = this.tank.sprite.angle;
		this.sprite.x = this.tank.sprite.x+Math.sin(Math.PI*this.sprite.angle/180)*20;
		this.sprite.y = this.tank.sprite.y-Math.cos(Math.PI*this.sprite.angle /180)*20;
		this.tank.app.stage.addChild(this.sprite);
		this.state = true;//正常 
		this.speed = this.tank.speed+2;
    }
	render(){
		if(!this.state){
			return;
		}
		switch (this.sprite.angle){
			case 0://上
				this.sprite.y-=this.speed;
			break;
			case 180://下
				this.sprite.y+=this.speed;
				break;
			case -90://左
				this.sprite.x-=this.speed;
				break;
			case 90://右
				this.sprite.x+=this.speed;
				break;
		}
		//子弹打到墙上
		this.hitWalls();
		this.hitEnemy();
	}
	
	hitWalls(){
		let index = 0;
		this.tank.app.walls.forEach(wall=>{
				let flag = this.tank.app.bump.hit(this.sprite, wall.sprite)
				if(flag){
					this.state = false;
					this.tank.app.stage.removeChild(this.sprite)
					this.tank.app.stage.removeChild(wall.sprite);
					this.tank.app.walls.splice(index,1);
				}
				index++;
				return;
		})
		
	}
	
	hitEnemy(){
		if(this.tank.isEnemy){
			return;
		}
		let index = 0;
		this.tank.app.enemys.forEach(enemy=>{
			let flag = this.tank.app.bump.hit(this.sprite, enemy.sprite)
			if(flag){
				this.state = false;
				this.tank.app.stage.removeChild(this.sprite)
				this.tank.app.stage.removeChild(enemy.sprite);
				this.tank.app.enemys.splice(index,1);
			}
			index++;
			return;
		})
		
	}
}