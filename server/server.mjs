import  express  from "express";

import { DbConfig , EnvConfig } from "./configs/index.mjs";
import {AuthRoutes} from './routes/index.mjs'
const app = express();
app.use('./', AuthRoutes)

EnvConfig()
DbConfig()

app.use(express.json({}))

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`app running at ${PORT} port`)
})