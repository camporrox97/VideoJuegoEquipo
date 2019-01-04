var Jugador = cc.Class.extend({
    gameLayer:null,
    sprite:null,
    shape:null,
    body:null,
ctor:function (gameLayer, posicion) {
    this.gameLayer = gameLayer;

    this.sprite = new cc.PhysicsSprite("#jugador_avanzando1.png");

    this.body = new cp.Body(5, 0.01);
    this.body.setPos(posicion);
    //body.w_limit = 0.02;

    this.sprite.setBody(this.body);

    gameLayer.space.addBody(this.body);

    this.shape = new cp.BoxShape(this.body,
        this.sprite.getContentSize().width,
        this.sprite.getContentSize().height);
    this.shape.setCollisionType(tipoJugador);

    gameLayer.space.addShape(this.shape);
    gameLayer.addChild(this.sprite,10);

    this.body.applyImpulse(cp.v(0,300), cp.v(0, 0));
}
});
