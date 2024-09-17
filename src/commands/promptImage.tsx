import { Argv, h } from "koishi";
import Data from "../Data";
import tools from "../tools";
import comfyui from "../comfyui";
import { } from "../comfyui/interface/api_1_type";
import { UserInputPrompt } from "../comfyui/interface/api_type";


async function getPromptImage(argv: Argv, message: string) {
    const baseData = Data.baseData
    const logger = baseData.logger
    const debug = tools.debug

    // debug(`message: ${message}`)
    const prompt:UserInputPrompt = tools.getPromptArgs(message)
    debug('输入prompt===', prompt)
    const atUser = JSON.stringify(prompt)
    let messageStruct = "正在努力绘图~"
    await argv.session.send(messageStruct)
    
    const pics = await comfyui.simplePromptGetImage(prompt)
    messageStruct = <message>
        <quote id={argv.session.messageId}/>
        {pics.map(pic => {
            return h.image(pic, 'image/png')
        })}
    </message>;
    await argv.session.send(messageStruct)
}

export default getPromptImage