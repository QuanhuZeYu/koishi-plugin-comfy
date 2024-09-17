import { Context } from "koishi"
import Data from "../Data"
import { v4 } from "uuid"
import { mydir } from ".."


function setupBaseData(ctx: Context) {
    const baseData = Data.baseData
    baseData.logger = ctx.logger
    baseData.config = ctx.config
    baseData.comfyPluginDir = mydir
    baseData.client_id = v4()
    baseData.ws = ctx.http.ws
    baseData.http = ctx.http

    baseData.logger.info(`资源初始化完成`)
}

export default setupBaseData