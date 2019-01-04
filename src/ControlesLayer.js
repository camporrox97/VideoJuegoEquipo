var ControlesLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;

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

    update:function (dt) {
        this.procesarControles(this);
    }
});
