import dotenv from 'dotenv'
import appRootPath from "app-root-path";

export function EnvConfig(params) {
    dotenv.config({
        path : appRootPath.resolve("/configs/env/.env")
    })
}