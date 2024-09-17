import comfyui from "../comfyui"
import Data from "../Data"
import tools from "../tools"


async function findValidCheckpointModel() {
    const debug = tools.debug
    const baseData = Data.baseData
    const logger = baseData.logger
    const config = baseData.config

    const modelList = await comfyui.getModules('checkpoints')
    logger.info('模型列表:', modelList)
    // 检查默认值是否在列表中
    let defaultModel = config.comfyDefaultModel
    if(modelList.length < 1) {
        logger.warn('没有找到模型，请先下载模型!')
        return
    }
    if(modelList.includes(defaultModel)) {
        logger.info(`默认模型设置正确: ${defaultModel}`)
        return
    } else {
        logger.warn(`默认模型${defaultModel}不存在，将使用第一个模型${modelList[0]}`)
        defaultModel = modelList[0]
        config.comfyDefaultModel = defaultModel
        debug(config)
        return
    }
}

async function findValidVAEModel() {
    const debug = tools.debug
    const baseData = Data.baseData
    const logger = baseData.logger
    const config = baseData.config
    
    const vaeList = await comfyui.getModules('vae')
    logger.info('VAE列表:', vaeList)
    let defaultVAE = config.comfyDefaultDecodeVae
    if(vaeList.length < 1) {logger.warn('没有找到VAE，请先下载VAE!'); return}
    if(vaeList.includes(defaultVAE)) {
        logger.info(`默认VAE设置正确: ${defaultVAE}`)
        return
    } else {
        logger.warn(`默认VAE${defaultVAE}不存在，将使用第一个VAE${vaeList[0]}`)
        defaultVAE = vaeList[0]
        config.comfyDefaultDecodeVae = defaultVAE
        debug(config)
    }
}

async function findValid() {
    await findValidCheckpointModel()
    await findValidVAEModel()
}

const findValidModel = {
    findValidCheckpointModel,
    findValidVAEModel,
    findValid
}

export default findValidModel