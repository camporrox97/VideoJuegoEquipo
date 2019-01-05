var ControlesLayer = cc.Layer.extend({
    etiquetaMonedas:null,
    monedas:0,
    ctor:function () {
        this._super();
        var size = cc.winSize;



    // Contador Monedas
        this.etiquetaMonedas = new cc.LabelTTF("Monedas: 0", "Helvetica", 20);
        this.etiquetaMonedas.setPosition(cc.p(150, 30));
        this.etiquetaMonedas.fillStyle = new cc.Color(0, 0, 0, 0);
        this.addChild(this.etiquetaMonedas);

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
        this.monedas++;
        this.etiquetaMonedas.setString("Monedas: " + this.monedas);
    },


    update:function (dt) {
        this.procesarControles(this);
    }
});
