import  express  from "express";

import { DbConfig , EnvConfig } from "./configs/index.mjs";
import {AuthRoutes} from './routes/index.mjs'
import cors from "cors"

EnvConfig()
DbConfig()

const app = express();
app.use(cors())
app.use(express.json({}))
app.use('/', AuthRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`app running at ${PORT} port`)
})