var controles = {};
var teclas = [];

var idCapaJuego = 1;
var idCapaControles = 2;
var tipoSuelo = 1;
var tipoJugador = 2;
var tipoMoneda = 3;
var tipoBloque = 4;
var tipoPowerup = 5;

var GameLayer = cc.Layer.extend({
    sprite: null,
    space: null,
    jugador: null,
    mapa: null,
    mapaAncho: null,
    monedas : [],
    powerups : [],
    bloques: [] ,
    formasEliminar: [],
    etiquetasBloques : [],
    ctor: function () {
        this._super();
        var size = cc.winSize;





        // CACHE
        cc.spriteFrameCache.addSpriteFrames(res.jugador_avanzando_plist);
        cc.spriteFrameCache.addSpriteFrames(res.moneda_plist);
        cc.spriteFrameCache.addSpriteFrames(res.bloque_plist);
        cc.spriteFrameCache.addSpriteFrames(res.animacionpanda_plist);
        cc.spriteFrameCache.addSpriteFrames(res.animaciontigre_plist);

        this.space = new cp.Space();
        this.cargarMapa();
        this.jugador = new Jugador(this, cc.p(150,50));


        this.scheduleUpdate();
        this.space.addCollisionHandler(tipoSuelo, tipoJugador, null, null, this.collisionSueloConJugador.bind(this), null);
        this.space.addCollisionHandler(tipoJugador, tipoMoneda, null, this.collisionJugadorConMoneda.bind(this), null, null);
        this.space.addCollisionHandler(tipoJugador, tipoBloque, null, this.collisionJugadorConBloque.bind(this), null, null);
        this.space.addCollisionHandler(tipoJugador, tipoPowerup, null, this.collisionJugadorConPowerup.bind(this), null, null);
        return true;





    },
    collisionSueloConJugador:function (arbiter, space) {
        this.jugador.body.vx = 0;
        this.jugador.body.applyImpulse(cp.v(50,0), cp.v(0, 0));
    },
    collisionJugadorConMoneda:function (arbiter, space) {
        var shapes = arbiter.getShapes();
        this.formasEliminar.push(shapes[1]);
        var capaControles =
            this.getParent().getChildByTag(idCapaControles);
        capaControles.agregarMoneda();
    },

    collisionJugadorConBloque:function (arbiter, space) {
        var capaControles = this.getParent().getChildByTag(idCapaControles);
        var bloque = arbiter.getShapes()[1].bloque;
        bloque.impactado();
        this.jugador.impactado();
        this.jugador.body.p.y = this.jugador.body.p.y - 5;
        if (bloque.lifes <= 0) this.formasEliminar.push(bloque.shape);
        if (this.jugador.monedas <=0) this.gameOver();
    },

    collisionJugadorConPowerup:function (arbiter, space) {
        var shapePowerup = arbiter.getShapes()[1];
        var powerup = shapePowerup.powerup;
        powerup.doThing(this.jugador);
        this.formasEliminar.push(shapePowerup);
    },
    gameOver : function() {

       // this.jugador.body.p = cc.p(150,50);
       cc.director.pause();
       this.getParent().addChild(new GameOverLayer());
    },

    update: function (dt) {
        this.space.step(dt);
        this.jugador.update();
        var posicionYJugador = this.jugador.body.p.y - 100;
        this.setPosition(cc.p( 0,-posicionYJugador));

                    for(var i = 0; i < this.bloques.length; i++) {
                        this.bloques[i].actualizar();
                    }

        for(var i = 0; i < this.formasEliminar.length; i++) {
                var shape = this.formasEliminar[i];

                for (var i = 0; i < this.monedas.length; i++) {
                  if (this.monedas[i].shape == shape) {
                      this.monedas[i].eliminar();
                      this.monedas.splice(i, 1);
                  }
                }
                for (var i = 0; i < this.bloques.length; i++) {
                    if (this.bloques[i].shape == shape) {
                        this.bloques[i].eliminar();
                        this.bloques.splice(i, 1);
                        }
                   }
                for (var i = 0; i < this.powerups.length; i++) {
                                    if (this.powerups[i].shape == shape) {
                                        this.powerups[i].eliminar();
                                        this.powerups.splice(i, 1);
                                        }
                                   }
            }
            this.formasEliminar = [];
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
                shapeSuelo.setCollisionType(tipoSuelo);
                this.space.addStaticShape(shapeSuelo);
            } }
        var grupoMonedas = this.mapa.getObjectGroup("Monedas");
        var monedasArray = grupoMonedas.getObjects();
        for (var i = 0; i < monedasArray.length; i++) {
            var moneda = new Moneda(this, cc.p(monedasArray[i]["x"],monedasArray[i]["y"]));
            this.monedas.push(moneda);
        }

        var grupoBloques = this.mapa.getObjectGroup("Bloques");
        var bloquesArray = grupoBloques.getObjects();

                for (var i = 0; i < bloquesArray.length; i++) {
                    var bloque = new Bloque(this, cc.p(bloquesArray[i]["x"], bloquesArray[i]["y"]));
                    this.bloques.push(bloque);
                }

         var grupoPowerups = this.mapa.getObjectGroup("Powerups");
         var powerupsArray = grupoPowerups.getObjects();

         for (var i = 0; i < powerupsArray.length; i++) {
            var powerup = null;
            if (Boolean(Math.round(Math.random()))) {
                powerup = new PowerupEstrella(this, cc.p(powerupsArray[i]["x"], powerupsArray[i]["y"]));
            } else {
                powerup = new PowerupDoble(this, cc.p(powerupsArray[i]["x"], powerupsArray[i]["y"]));
            }
            this.powerups.push(powerup);
         }
    }});

var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        cc.director.resume();

        var gamelayer = new GameLayer();
        this.addChild(gamelayer,0,idCapaJuego);

        var controleslayer = new ControlesLayer();
        this.addChild(controleslayer,0,idCapaControles);
    }
});

