import verifyAuth from "../helpers/verify-auth.js";
import mqtt from "mqtt";

const openDoor = async (req, res) => {
  try {
    //comprueba el header con el token de authorización
    verifyAuth(req.headers.authorization);
    const client = mqtt.connect("mqtt://test.mosquitto.org");
    //se establece conexión
    client.on("connect", function () {
      //si se conecta procede a suscribirse
      client.subscribe("TecoUV/Intellidoor/Classrooms", function (err) {
        if (!err) {
          //si no ocurrio ningun error procede a publicar
          client.publish(
            "TecoUV/Intellidoor/Classrooms",
            //se manda 1 que es true, para que active el ESP32
            req.params.id + " 1"
          );
          console.log("se abrio la puerta");
        }
      });
    });
    //finalmente se devuelve el estatus y un mensaje al cliente
    res.status(200).json({
      message: "Open door",
    });
  } catch (error) {
    //si se cacha algun error devuelve un estatus 500
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

const closeDoor = async (req, res) => {
  try {
    //comprueba el header con el token de authorización
    verifyAuth(req.headers.authorization);
    const client = mqtt.connect("mqtt://test.mosquitto.org");
    //se establece la conexión
    client.on("connect", function () {
      //si se conecta procede a suscribirse
      client.subscribe("TecoUV/Intellidoor/Classrooms", function (err) {
        if (!err) {
          //si no ocurrio ningun error procede a publicar
          client.publish(
            "TecoUV/Intellidoor/Classrooms",
            //se manda 0 que es true, para que desactive el ESP32
            req.params.id + " 0"
          );
          console.log("se cerror la puerta");
        }
      });
    });
    //finalmente se devuelve el estatus y un mensaje al cliente
    res.status(200).json({
      message: "Close door",
    });
  } catch (error) {
    //si se cacha algun error se devuelve un estatus 500
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export { openDoor, closeDoor };
