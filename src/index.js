import * as dotenv from "dotenv";
import app from "./server.js";

dotenv.config();

const server = app.listen(process.env.PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${process.env.PORT}`);
});

server.on("error", (error) => console.error(`Error en servidor ${error}`));
