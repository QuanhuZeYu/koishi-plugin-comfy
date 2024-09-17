import path from "path";
import Data from "../Data";
import { Prompt } from "./interface/api_1_type";
import fs from "fs"
import { v4 as uuidv4 } from 'uuid';
import { History, HistoryOutputs, HistoryOutputsImages, PromptIDHistory } from "./interface/history_type";
import tools from "../tools";
import { sleep } from "koishi";
import comfyui from ".";
import { UserInputPrompt } from "./interface/api_type";

async function simplePromptGetImage(prompt: UserInputPrompt) {
    const debug = tools.debug
    const baseData = Data.baseData;
    debug(baseData.comfyPluginDir)
    const apiPath = path.resolve(baseData.comfyPluginDir, "comfyui", "api_1.json");
    debug(`api路径拼接为: ${apiPath}`)
    const apiText = fs.readFileSync(apiPath, { encoding: "utf-8" });
    let apiJson: Prompt = JSON.parse(apiText);

    // Generate values for seed, steps, cfg, width, height, Ptext, Ntext
    const seed = Math.floor(Math.random() * 34359738368) || Math.floor(prompt.seed);
    const steps = (prompt.steps <= 40 && prompt.steps > 5) ? Math.ceil(prompt.steps) : 20;
    const cfg = (prompt.cfg > 0 && prompt.cfg < 10) ? Math.ceil(prompt.cfg) : 7;
    const width = (prompt.width > 64 && prompt.width <= 2048) ? Math.ceil(prompt.width) : 1024;
    const height = (prompt.height > 64 && prompt.height <= 2048) ? Math.ceil(prompt.height) : 1024;
    const Ptext = (prompt.Ptext ? prompt.Ptext : "anime,best quality,8k,ultra detailed,masterpiece, blue_hair, blue_eyes, full_body, In the study, Dressed in earth-gray mage's robes, wearing a hat") + ',';
    const Ntext = (prompt.Ntext.length>50 ? prompt.Ntext : prompt.Ntext+",bad,unfinished,displeasing,cropped,jpeg artifacts,text,extra digit,missing fingers,fewer digits,artist name,signature,low quality,username,error,bad hands,lowres,worst quality,watermark,bad anatomy, bad eyes,") + '(NSFW:1.5)';
    const cModel = (prompt.cModel ? prompt.cModel : apiJson[4].inputs.ckpt_name)

    apiJson[3].inputs.seed = seed
    apiJson[3].inputs.steps = steps
    apiJson[3].inputs.cfg = cfg
    apiJson[4].inputs.ckpt_name = cModel
    apiJson[5].inputs.width = width
    apiJson[5].inputs.height = height
    apiJson[6].inputs.text = Ptext
    apiJson[7].inputs.text = Ntext

    let promptID = await comfyui.queuePrompt(apiJson)
    promptID = promptID.prompt_id;
    tools.debug('Prompt_id', promptID);
    let history:History = await getHistory(promptID)
    tools.debug('History.prompt_id', history?.[promptID])
    const historyPromptID = history?.[promptID]
    const pics = await findLatestImage_FromHistory(historyPromptID)
    debug('图片数量: ', pics.length)
    return pics
}

async function getImage(fileName: string, subfolder: string, folderType: string) {
    const debug = tools.debug
    const data = `filename=${fileName}&subfolder=${subfolder}&type=${folderType}`;
    const url = `http://${Data.baseData.config.comfyUILocal}/view?${data}`;

    debug('Image Request', url);

    try {
        const resp = await Data.baseData.http.get(url, { responseType: 'arraybuffer' })
        debug('Image Response', resp);
        const pic: Buffer = Buffer.from(resp)
        debug('Image Size', pic.byteLength)
        return pic;
    } catch (e) {
        debug('Get Image Error', e);
    }
}

async function getHistory(promptID: string) {
    const debug = tools.debug
    const url = `http://${Data.baseData.config.comfyUILocal}/history/${promptID}`;
    try {
        const resp: History = await Data.baseData.http.get(url)
        if(!(promptID in resp)) {
            await sleep(1000)
            return getHistory(promptID)
        }
        return resp
    } catch (e) {
        debug('=====Get History Error=====', e);
    }
}

async function findLatestImage_FromHistory(history: PromptIDHistory) {
    const imagesList: Buffer[] = [];
    const outputs:HistoryOutputs = history.outputs;
    tools.debug('=====Processing History Outputs=====\n', outputs);

    const keys = Object.keys(outputs)
    for(const key of keys) {
        const imagesInfo:HistoryOutputsImages = outputs[key].images
        for(const imageInfo of imagesInfo) {
            const pic = await getImage(imageInfo.filename, imageInfo.subfolder, imageInfo.type)
            imagesList.push(pic)
        }
    }
    return imagesList;
}


export default simplePromptGetImage