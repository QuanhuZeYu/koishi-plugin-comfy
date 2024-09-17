import { Argv } from "koishi";
import tools from "../tools";
import Data from "../Data";
import comfyui from "../comfyui";


async function getVAEs(argv:Argv, message:string) {
    const debug = tools.debug
    const baseData = Data.baseData

    const type = 'vae'
    const vaes = await comfyui.getModules(type)
    debug("vae列表: ", vaes)
    let messageStruct = <message>
        <quote id={argv.session.messageId}/>
        {`当前可用: vae\n`}{vaes.join('\n')}
    </message>;
    await argv.session.send(messageStruct)
}

export default getVAEs