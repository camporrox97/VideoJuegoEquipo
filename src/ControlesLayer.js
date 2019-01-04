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
                    jugador.body.vx = 5;
            }
            if (controles.moverX < 0) {
                  jugador.body.vx = -5;
            }
            if (controles.moverX == 0) {
                  jugador.body.vx = 0;
             }
            if (controles.moverY > 0) {
                    jugador.vy = 5;
             }
            if (controles.moverY < 0) {
                  jugador.vy = -5;
            }
            if (controles.moverY == 0) {
                  jugador.vy = 0;
             }
             jugador.body.applyImpulse(cp.v(300, 0), cp.v(0, 0));

        },
        procesarKeyPressed:function (keyCode) {
            console.log("procesarKeyPressed " + keyCode);
            var posicion = teclas.indexOf(keyCode);
            if (posicion == -1) {
                teclas.push(keyCode);
                switch (keyCode) {
                    case 38:
                        console.log("controles.moverY = 1");
                        controles.moverY = 1;
                        break;
                    case 40:
                        controles.moverY = -1;
                        break;
                    case 39:
                        // ir derecha
                        console.log("controles.moverX = 1");
                        controles.moverX = 1;
                        break;
                    case 37:
                        // ir izquierda
                        controles.moverX = -1;
                        break;
                }
            }
        },
        procesarKeyReleased:function (keyCode) {
            console.log("procesarKeyReleased " + keyCode);
            var posicion = teclas.indexOf(keyCode);
            teclas.splice(posicion, 1);
            switch (keyCode) {
                case 38:
                    if (controles.moverY == 1) {
                        controles.moverY = 0;
                    }
                    break;
                case 40:
                    if (controles.moverY == -1) {
                        controles.moverY = 0;
                    }
                    break;

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
