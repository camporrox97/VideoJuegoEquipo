var powerup_estrella = 1;
var powerup_doble = 2;
var powerup_nada = 0;

var Jugador = cc.Class.extend({
    gameLayer:null,
    sprite:null,
    shape:null,
    monedas:5,
    puntos : 0,
    powerup : powerup_nada,
    iteracionesPowerup : 200,
    body:null,
ctor:function (gameLayer, posicion) {
    this.gameLayer = gameLayer;

    this.sprite = new cc.PhysicsSprite("#animacion_bola1.png");

    this.body = new cp.Body(5, cp.momentForBox(1,20,20));
    this.body.setPos(posicion);
    //body.w_limit = 0.02;
    this.body.setAngle(0);

    this.sprite.setBody(this.body);

    gameLayer.space.addBody(this.body);
    console.log(this.sprite.getContentSize().width);
    console.log(this.sprite.getContentSize().height);
    this.shape = new cp.BoxShape(this.body,
        20,
        20);
    this.shape.setCollisionType(tipoJugador);

    gameLayer.space.addShape(this.shape);
    gameLayer.addChild(this.sprite,10);

    this.body.applyImpulse(cp.v(0,500), cp.v(0, 0));
},
cogerMoneda:function() {
    this.monedas++;
},
impactado:function() {
    if (this.powerup != powerup_estrella)
        this.monedas--;
    this.puntos += (this.powerup == powerup_doble ? 2 : 1);
},
cogerPowerup:function(tipo) {
    this.powerup = tipo;
    this.iteracionesPowerup = 200;
},
update:function() {
    if (this.powerup != 0){
        this.iteracionesPowerup--;
        if(this.iteracionesPowerup <= 0) {
            this.powerup = powerup_nada;
            this.iteracionesPowerup = 200;
        }
    }
}
});
