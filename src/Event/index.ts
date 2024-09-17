import setupBaseData from "./1_setup"
import findValidCheckpointModel from "./2_findVaildModel"


const Event = {
    setupBaseData,
    findValidModel: findValidCheckpointModel
}

export default Event