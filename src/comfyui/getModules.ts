import comfyui from "."
import Data from "../Data"
import tools from "../tools"
import { Prompt } from "./interface/api_1_type"


async function getModules(type:string) {
    const debug = tools.debug
    const baseData = Data.baseData
    
    const url = `http://${baseData.config.comfyUILocal}/models/${type}`
    debug('获取模型列表请求网址: ', url)
    const resp:string[] = await baseData.http.get(url)
    debug(`模型列表: `, resp)
    return resp
}

export default getModules