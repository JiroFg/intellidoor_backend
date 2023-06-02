import express from "express";
import usersRouter from "./routes/users.routes.js";
import crsRouter from "./routes/crs.routes.js";
import iucrsRouter from "./routes/iucrs.routes.js";
import authRouter from "./routes/auth.routes.js";
import { PORT } from "./config/config.js";
import doorRouter from "./routes/door.routes.js";
import cors from "cors";
import rootRouter from "./routes/root.routes.js";

const app = express();

//libreria para corrección de cors
app.use(cors())
//libreria para serializar en JSON
app.use(express.json());
//ruta raiz para mostrar un esquema del API
app.use("/", rootRouter)
//ruta del recurso users
app.use("/users", usersRouter);
//ruta del recurso classrooms
app.use("/classrooms", crsRouter);
//ruta del recurso inuseclassrooms
app.use("/inuseclassrooms", iucrsRouter);
//ruta del recurso para generar tokens
app.use("/login", authRouter);
//ruta del recurso para abrir y cerrar la puerta
app.use("/doors", doorRouter)
//mensaje si se manda una ruta desconocida
app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

app.listen(PORT);
