var controles = {};
var teclas = [];

var GameLayer = cc.Layer.extend({
    sprite: null,
    space: null,
    jugador: null,
    mapa: null,
    mapaAncho: null,
    ctor: function () {
        this._super();
        var size = cc.winSize;

        this.jugador = new Jugador(this, cc.p(50,150));
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: this.procesarKeyPressed.bind(this),
            onKeyReleased: this.procesarKeyReleased.bind(this)
        }, this)

        this.cargarMapa();
        this.scheduleUpdate();
        return true;
    },

    procesarControles() {
        if (controles.moverX > 0) {
            this.spriteSerpiente.velocidadX = 5;
        }
        if (controles.moverX < 0) {
            this.spriteSerpiente.velocidadX = -5;
        }
        if (controles.moverX == 0) {
            this.spriteSerpiente.velocidadX = 0;
        }
        if (controles.moverY > 0) {
            this.spriteSerpiente.velocidadY = 5;
        }
        if (controles.moverY < 0) {
            this.spriteSerpiente.velocidadY = -5;
        }
        if (controles.moverY == 0) {
            this.spriteSerpiente.velocidadY = 0;
        }

    },
    procesarKeyPressed(keyCode) {
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
    procesarKeyReleased(keyCode) {
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


    }, procesarMouseDown: function (event) {
        // Ambito procesarMouseDown
        var instancia = event.getCurrentTarget();

        var actionMoverBarraX =
            cc.MoveTo.create(Math.abs(instancia.spriteSerpiente.x - event.getLocationX()) / 500,
                cc.p(event.getLocationX(),
                    cc.winSize.height * 0.1));


        cc.director.getActionManager().removeAllActionsFromTarget(instancia.spriteSerpiente, true);

        instancia.spriteSerpiente.runAction(actionMoverBarraX);


    },

    update: function (dt) {
        this.procesarControles();

    }
    ,
    cargarMapa: function () {
        this.mapa = new cc.TMXTiledMap(res.mapa1_tmx);
        // Añadirlo a la Layer
        this.addChild(this.mapa);
        // Ancho del mapa
        this.mapaAncho = this.mapa.getContentSize().width;
        // Solicitar los objeto dentro de la capa Suelos
        var grupoSuelos = this.mapa.getObjectGroup("Suelos");
        var suelosArray = grupoSuelos.getObjects();
        // Los objetos de la capa suelos se transforman a
        // formas estáticas de Chipmunk ( SegmentShape ).
        for (var i = 0; i < suelosArray.length; i++) {
            var suelo = suelosArray[i];
            var puntos = suelo.polylinePoints;
            for(var j = 0; j < puntos.length - 1; j++){
                var bodySuelo = new cp.StaticBody();
                var shapeSuelo = new cp.SegmentShape(bodySuelo, cp.v(parseInt(suelo.x) + parseInt(puntos[j].x), parseInt(suelo.y) - parseInt(puntos[j].y)), cp.v(parseInt(suelo.x) + parseInt(puntos[j + 1].x), parseInt(suelo.y) - parseInt(puntos[j + 1].y)), 10);
                this.space.addStaticShape(shapeSuelo);
            } } }
    });

var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

