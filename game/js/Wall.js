
class Wall{
	constructor(app,resources,x,y,width,height){
		this.sprite = new PIXI.Sprite(resources.wall.texture);
		// Rotate around the center
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;
		this.sprite.x = x;
		this.sprite.y = y;
		this.sprite.width = width;
		this.sprite.height = height;
		app.stage.addChild(this.sprite);
		
    }
}