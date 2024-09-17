import { Context, HTTP } from "koishi"
import { Config, mydir } from ".."
import { v4 } from "uuid"
import {LoggerService} from "@cordisjs/logger"


let logger: LoggerService
let config: Config
let comfyPluginDir: string
let client_id: string
let ws: (url: string | URL, init?: HTTP.Config) => WebSocket
let http: HTTP



const baseData = {
    logger,
    config,
    comfyPluginDir,
    client_id,
    ws,
    http,
}

export default baseData