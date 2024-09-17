import Data from "../Data";
import tools from "../tools";
import { Prompt } from "./interface/api_1_type";

/**
 * 可发送空prompt请求
 * @param prompt 
 * @returns 
 */
async function queuePrompt(prompt: Prompt) {
    const baseData = Data.baseData;
    const logger = baseData.logger;
    const body = { prompt: prompt, client_id: baseData.client_id };
    const queueURL = `http://${baseData.config.comfyUILocal}/prompt`;

    tools.debug('=====Queue Prompt Request=====', queueURL)

    try {
        const resp = await baseData.http.post(queueURL, body, { headers: { "content-type": "application/json" } });
        tools.debug('=====Queue Prompt Response=====', resp);
        return resp;
    } catch (e) {
        logger.warn("ComfyUI请求队列失败", e);
        tools.debug('=====Queue Prompt Error=====', e);
    }
}


export default queuePrompt