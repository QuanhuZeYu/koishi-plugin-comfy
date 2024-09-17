import { } from "../comfyui/interface/api_1_type"
import { UserInputPrompt } from "../comfyui/interface/api_type"


function getPromptArgs(message:string) {
    const seed = getArg('seed', message)  || getArg('\u79cd\u5b50', message)  // 匹配中文字符：种子
    const steps = getArg('steps', message)  || getArg('\u6b65\u6570', message)  // 匹配中文字符：步数
    const cfg = getArg('cfg', message)  || getArg('\u5339\u914d\u5ea6', message)  // 匹配中文字符：匹配度
    const width = getArg('width', message)  || getArg('\u9ad8', message)  // 匹配中文字符：高
    const height = getArg('height', message) || getArg('\u957f', message) // 匹配中文字符：宽
    const Ptext = getArg('Ptext', message)  || getArg('\u6b63', message)  // 匹配中文字符：正
    const Ntext = getArg('Ntext', message)  || getArg('\u53cd', message)  // 匹配中文字符：反
    const cModel = getArg('cModel', message)  || getArg('\u6a21\u578b', message)  // 匹配中文字符：模型

    const prompt:UserInputPrompt = {
        seed: Number.parseInt(seed),
        steps: Number.parseInt(steps),
        cfg: Number.parseFloat(cfg),
        width: Number.parseInt(width),
        height: Number.parseInt(height),
        Ptext: Ptext,
        Ntext: Ntext,
        cModel: cModel
    }
    return prompt
}

/**
 * 捕捉 关键字: <(.*)> 括号内为捕捉内容，.*表示匹配尖括号内所有内容
 * @param keyWord 
 * @param message 
 */
export function getArg(keyWord:string, message:string) {
    try {
        const regx = new RegExp(`(?:${keyWord})[:=,]<(.*?)>`, 'i')
    const match = message.match(regx)
    return match ? match[1] : ''
    } catch (error) {
        console.log(error)
        return ''
    }
}

export default getPromptArgs