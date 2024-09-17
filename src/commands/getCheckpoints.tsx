import { Argv } from "koishi";
import tools from "../tools";
import Data from "../Data";
import comfyui from "../comfyui";


async function getCheckpoints(argv:Argv, message:string) {
    const debug = tools.debug
    const baseData = Data.baseData
    const type = 'checkpoints'

    const models = await comfyui.getModules(type)
    
    const messageStruct = <message>
        <quote id={argv.session.messageId}/>
        {`当前可用: checkpoint\n`}{models.join('\n')}
    </message>;
    await argv.session.send(messageStruct)
}

export default getCheckpoints