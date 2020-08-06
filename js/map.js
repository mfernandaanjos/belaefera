class Map {
    constructor(image,speed,largura,altura, height){
        this.image = image
        this.speed = speed
        this.largura = largura
        this.altura = altura
        this.height = height
        this.x1 = 0
        this.x2 = this.x+1000
    }
    show(ctx){
        ctx.drawImage(this.image,this.x1,this.height,this.largura,this.altura)
        ctx.drawImage(this.image,this.x2,this.height,this.largura,this.altura)
    }
    move(){
        this.x1 -= this.speed
        this.x2 = this.x1+1000
        
        if(this.x1< -this.largura)
            this.x1 += this.largura
        if(this.x2< -this.largura)
            this.x2 += this.largura
    }
}