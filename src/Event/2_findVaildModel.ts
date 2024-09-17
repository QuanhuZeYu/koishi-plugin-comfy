import comfyui from "../comfyui"
import Data from "../Data"
import tools from "../tools"


async function findValidModel() {
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
    }
    if((modelList.includes(defaultModel)) === false) {
        logger.warn(`默认模型${defaultModel}不存在，将使用第一个模型${modelList[0]}`)
        defaultModel = modelList[0]
        config.comfyDefaultModel = defaultModel
        debug(config)
        return
    }
}

export default findValidModel