import express from "express";
import { DbConfig, EnvConfig } from "./configs/index.mjs";
import { AuthRoutes, TodoRoutes } from "./routes/index.mjs";
import cors from "cors";
import fileUpload from "express-fileupload";
import appRootPath from "app-root-path";

EnvConfig();
DbConfig();

const app = express();
app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use("/static",express.static(appRootPath + '/uploads'))
app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fieldSize: 2 * 1024 * 1024 * 1024,
    },
  })
);

app.use("/api/auth/", AuthRoutes);
app.use("/api/todos/", TodoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running at ${PORT} port`);
});
