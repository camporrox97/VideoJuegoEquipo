var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    serpiente : "res/bola.png",
    tiles32_png: "res/tiles32.png",
    mapa1_tmx: "res/mapa1.tmx",
    jugador_avanzando_plist : "res/jugador_avanzando.plist",
    moneda_plist: "res/moneda.plist",
    bloque_plist : "res/bloques.plist",
    boton_jugar_png : "res/boton_jugar.png",
    menu_titulo_png : "res/menu_titulo.png",
    animacionpanda_plist : "res/animacionpanda.plist",
    animaciontigre_plist : "res/animaciontigre.plist",
    boton_reanudar_png : "res/boton_reanudar.png",


};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}