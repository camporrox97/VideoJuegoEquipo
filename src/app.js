var controles = {};
var teclas = [];

var GameLayer = cc.Layer.extend({
    sprite:null,
    spriteSerpiente:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
        //creo el sprite en pantalla
        this.spriteSerpiente = cc.Sprite.create(res.serpiente);
        ///(400,10)
        this.spriteSerpiente.setPosition(cc.p(size.width/2 , size.height*0.1));
        this.addChild(this.spriteSerpiente);

        //muevo el sprite con moveTo moveBy
     //   var actionMoverSerpiente = cc.MoveTo.create(1, cc.p(size.width,
     //   size.height));
     //   var actionMoverSerpiente = cc.MoveBy.create(1,cc.p(100,0));
     //   this.spriteSerpiente.runAction(actionMoverSerpiente);


     //   cc.eventManager.addListener({
     //               event: cc.EventListener.MOUSE,
     //               onMouseDown: this.procesarMouseDown.bind(this)
     //           }, this)

         cc.eventManager.addListener({
                            event: cc.EventListener.KEYBOARD,
                            onKeyPressed: this.procesarKeyPressed.bind(this),
                            onKeyReleased: this.procesarKeyReleased.bind(this)
                        }, this)


        this.scheduleUpdate();
        return true;
    },

    procesarControles(){
           if ( controles.moverX > 0){
               this.spriteSerpiente.velocidadX = 5;
           }
           if ( controles.moverX < 0){
               this.spriteSerpiente.velocidadX = -5;
           }
           if ( controles.moverX == 0 ){
               this.spriteSerpiente.velocidadX = 0;
           }
           if ( controles.moverY > 0){
                this.spriteSerpiente.velocidadY = 5;
           }
           if ( controles.moverY < 0){
                this.spriteSerpiente.velocidadY = -5;
           }
           if ( controles.moverY == 0 ){
                this.spriteSerpiente.velocidadY = 0;
           }

       },
       procesarKeyPressed(keyCode){
           console.log("procesarKeyPressed "+keyCode);
           var posicion = teclas.indexOf(keyCode);
           if ( posicion == -1 ) {
               teclas.push(keyCode);
               switch (keyCode ){
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
       procesarKeyReleased(keyCode){
           console.log("procesarKeyReleased "+keyCode);
           var posicion = teclas.indexOf(keyCode);
           teclas.splice(posicion, 1);
           switch (keyCode ){
                case 38:
                   if ( controles.moverY == 1 ){
                       controles.moverY = 0;
                   }
                   break;
                case 40:
                   if ( controles.moverY == -1 ){
                        controles.moverY = 0;
                   }
                   break;

               case 39:
                   if ( controles.moverX == 1){
                       controles.moverX = 0;
                   }
                   break;
               case 37:
                   if ( controles.moverX == -1){
                       controles.moverX = 0;
                   }
                   break;
           }



       }, procesarMouseDown:function(event){
           // Ambito procesarMouseDown
           var instancia = event.getCurrentTarget();

           var actionMoverBarraX =
               cc.MoveTo.create(Math.abs(instancia.spriteSerpiente.x - event.getLocationX())/500,
                       cc.p(event.getLocationX(),
                        cc.winSize.height*0.1));


               cc.director.getActionManager().removeAllActionsFromTarget(instancia.spriteSerpiente, true);

               instancia.spriteSerpiente.runAction(actionMoverBarraX);



     },

     update:function (dt){
        this.procesarControles();
        if( this.spriteSerpiente.velocidadX == null){
            this.spriteSerpiente.velocidadX = 0;
        }
        this.spriteSerpiente.x = this.spriteSerpiente.x +
        this.spriteSerpiente.velocidadX;

        if( this.spriteSerpiente.velocidadY == null){
                    this.spriteSerpiente.velocidadY = 0;
                }
                this.spriteSerpiente.y = this.spriteSerpiente.y +
                this.spriteSerpiente.velocidadY;


     }
});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

