var controles = {};
var teclas = [];
var idCapaJuego = 1;
var idCapaControles = 2;

var GameLayer = cc.Layer.extend({
    sprite: null,
    space: null,
    jugador: null,
    mapa: null,
    mapaAncho: null,
    ctor: function () {
        this._super();
        var size = cc.winSize;

        // CACHE
        cc.spriteFrameCache.addSpriteFrames(res.jugador_avanzando_plist);

        this.space = new cp.Space();


        this.jugador = new Jugador(this, cc.p(50,50));


        this.cargarMapa();
        this.scheduleUpdate();
        return true;
    },

    update: function (dt) {
        this.space.step(dt);

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
        var gamelayer = new GameLayer();
        this.addChild(gamelayer,0,idCapaJuego);

        var controleslayer = new ControlesLayer();
        this.addChild(controleslayer,0,idCapaControles);
    }
});

