const { default: axios } = require("axios");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    client.channels.cache.get("934688986423758889").send("Bot iniciado");

    // VALIDAR SERVIDOR OV
    let tiempo = new Date();

    let servidorActivo = false;

    setInterval(async () => {
      const diferencia = new Date() - tiempo;
      try {
        const respuesta = await axios.get("http://167.86.72.9:3000/");
        const { data } = respuesta;

        if (!servidorActivo) {
          client.channels.cache.get("934688986423758889").send("Servidor OV activo");
          console.log("Servidor OV activo");
          servidorActivo = true;
        }
      } catch (error) {
        if (servidorActivo) {
          client.channels.cache.get("934688986423758889").send("Servidor OV no responde");
          console.log("Servidor OV no responde");
          servidorActivo = false;
        }
        // if (diferencia > 30000) {
        //   tiempo = new Date();
        //   client.channels.cache.get("934688986423758889").send("Servidor OV no responde");
        //   console.log("Servidor OV no responde catch");
        //   servidorActivo = false;
        // }
      }
    }, 5000);
  },
};
