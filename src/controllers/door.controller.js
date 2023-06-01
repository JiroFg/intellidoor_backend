import verifyAuth from "../helpers/verify-auth.js";
import mqtt from "mqtt";

const openDoor = async (req, res) => {
  try {
    //comprueba el header con el token de authorización
    verifyAuth(req.headers.authorization);
    const client = mqtt.connect("mqtt://test.mosquitto.org");
    //conexión y enviar mensaje
    client.on("connect", function () {
      client.subscribe("TecoUV/Intellidoor/Classrooms", function (err) {
        if (!err) {
          client.publish(
            "TecoUV/Intellidoor/Classrooms",
            req.params.id + " 1"
          );
          console.log("se abrio la puerta");
        }
      });
    });

    res.status(200).send("puerta abierta");
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
    //conexión y enviar mensaje
    client.on("connect", function () {
      client.subscribe("TecoUV/Intellidoor/Classrooms", function (err) {
        if (!err) {
          client.publish(
            "TecoUV/Intellidoor/Classrooms",
            req.params.id + " 0"
          );
          console.log("se cerror la puerta");
        }
      });
    });

    res.status(200).send("puerta cerrada");
  } catch (error) {
    //si se cacha algun error se devuelve un estatus 500
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export { openDoor, closeDoor };
