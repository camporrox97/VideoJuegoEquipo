var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    serpiente : "res/bola.png",
    tiles32_png: "res/tiles32.png",
    mapa1_tmx: "res/mapa1.tmx",
    jugador_avanzando_plist : "res/jugador_avanzando.plist",
    moneda_plist: "res/moneda.plist",
    cocodrilo_plist : "animacioncocodrilo.plist"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}