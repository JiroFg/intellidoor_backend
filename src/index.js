import express from "express";
import usersRouter from "./routes/users.routes.js";
import crsRouter from "./routes/crs.routes.js";
import iucrsRouter from "./routes/iucrs.routes.js";
import authRouter from "./routes/auth.routes.js";
import { PORT } from "./config/config.js";
import doorRouter from "./routes/door.routes.js";

const app = express();

app.use(express.json());
app.use("/users", usersRouter);
app.use("/classrooms", crsRouter);
app.use("/inuseclassrooms", iucrsRouter);
app.use("/login", authRouter);
app.use("/doors", doorRouter)
//mensaje si se manda una ruta desconocida
app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

app.listen(PORT);
