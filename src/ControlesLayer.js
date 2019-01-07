var ControlesLayer = cc.Layer.extend({
    etiquetaMonedas:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;



    // Contador Monedas
        this.etiquetaMonedas = new cc.LabelTTF("Monedas: 5", "Helvetica", 20);
        this.etiquetaMonedas.setPosition(cc.p(150, 30));
        this.etiquetaMonedas.fillStyle = new cc.Color(0, 0, 0, 0);
        this.addChild(this.etiquetaMonedas);

        this.etiquetaPower = new cc.LabelTTF("Powerup: nada", "Helvetica", 20);
                this.etiquetaPower.setPosition(cc.p(150, 70));
                this.etiquetaPower.fillStyle = new cc.Color(0, 0, 0, 0);
                this.addChild(this.etiquetaPower);
         this.etiquetaPuntos = new cc.LabelTTF("0", "Helvetica", 20);
                this.etiquetaPuntos.setPosition(cc.p(250, 30));
                this.etiquetaPuntos.fillStyle = new cc.Color(0, 0, 0, 0);
                this.addChild(this.etiquetaPuntos);

        cc.eventManager.addListener({
              event: cc.EventListener.KEYBOARD,
              onKeyPressed: this.procesarKeyPressed.bind(this),
              onKeyReleased: this.procesarKeyReleased.bind(this)
         }, this);

        this.scheduleUpdate();
        return true;
    },

    procesarControles:function () {
            var jugador = this.getParent().getChildByTag(idCapaJuego).jugador;

            if (controles.moverX > 0) {
                    jugador.body.vx = 100;
            }
            if (controles.moverX < 0) {
                  jugador.body.vx = -100;
            }
            if (controles.moverX == 0) {
                  jugador.body.vx = 0;
             }
        },
        procesarKeyPressed:function (keyCode) {
            var posicion = teclas.indexOf(keyCode);
            if (posicion == -1) {
                teclas.push(keyCode);
                switch (keyCode) {
                    case 39:
                        controles.moverX = 1;
                        break;
                    case 37:
                        controles.moverX = -1;
                        break;
                }
            }
        },
        procesarKeyReleased:function (keyCode) {
            var posicion = teclas.indexOf(keyCode);
            teclas.splice(posicion, 1);
            switch (keyCode) {
                case 39:
                    if (controles.moverX == 1) {
                        controles.moverX = 0;
                    }
                    break;
                case 37:
                    if (controles.moverX == -1) {
                        controles.moverX = 0;
                    }
                    break;
            }
        },


    agregarMoneda:function(){
        var jugador = this.getParent().getChildByTag(idCapaJuego).jugador;
        jugador.cogerMoneda();
    },


    update:function (dt) {
    var jugador = this.getParent().getChildByTag(idCapaJuego).jugador;
        var powerr = (jugador.powerup == 0 ? "nada": (jugador.powerup == 1 ? "estrella" : "doble"));
        var extra = jugador.powerup > 0 ? (jugador.iteracionesPowerup + "") : ""
        this.procesarControles(this);

        this.etiquetaMonedas.setString("Monedas: " + jugador.monedas);
        this.etiquetaPower.setString("Power: " + powerr + " " + extra);
        this.etiquetaPuntos.setString("" + jugador.puntos);
    }
});
