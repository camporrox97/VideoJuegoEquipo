var Bloque = cc.Class.extend({
    gameLayer:null,
    sprite:null,
    shape:null,
    lifes:0,
    etiquetaLifes: null,
ctor:function (gameLayer, posicion) {
    this.gameLayer = gameLayer;

    this.lifes = Math.floor(Math.random() * 9) + 1;
    this.etiquetaLifes = new cc.LabelTTF(("" + this.lifes), "Helvetica", 20);
    this.etiquetaLifes.setPosition(cc.p(20,20));
    this.etiquetaLifes.fillStyle = new cc.Color(0, 255, 0, 0);
    this.gameLayer.etiquetasBloques.push(this.etiquetaLifes);


    // Crear Sprite
    this.sprite = new cc.PhysicsSprite("#bloque1.png");
    this.sprite.addChild(this.etiquetaLifes);
    // Cuerpo estatico, no le afectan las fuerzas, gravedad, etc.
    var body = new cp.StaticBody();
    body.setPos(posicion);
    this.sprite.setBody(body);
    // Los cuerpos estáticos nunca se añaden al Space

    this.shape = new cp.CircleShape(body, 20 , cp.vzero);
    this.shape.setCollisionType(tipoBloque);
    this.shape.bloque = this;
    // Añadir forma estática al Space
    gameLayer.space.addStaticShape(this.shape);
    // Añadir sprite a la capa
    gameLayer.addChild(this.sprite,10);

    // Crear animación
    var framesAnimacion = [];
    for (var i = 1; i <= 3; i++) {
        var str = "bloque" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    var actionAnimacionBucle =
        new cc.RepeatForever(new cc.Animate(animacion));
    // ejecutar la animación
    this.sprite.runAction(actionAnimacionBucle);
},
actualizar: function() {
    console.log("pasa x actualizar de bloque");
    this.etiquetaLifes.setString("" + this.lifes);
},
eliminar: function (){
    // quita la forma
    this.gameLayer.space.removeShape(this.shape);

    // quita el cuerpo *opcional, funciona igual
    // NO: es un cuerpo estático, no lo añadimos, no se puede quitar.
    // this.gameLayer.space.removeBody(shape.getBody());

    // quita el sprite
    this.gameLayer.removeChild(this.sprite);
},
impactado : function() {
    console.log("impactado");
    this.lifes--;
}



});
