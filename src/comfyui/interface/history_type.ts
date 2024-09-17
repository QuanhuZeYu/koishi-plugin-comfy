import { Prompt } from "./workflow_api_1_type"

export type  History = {
    [index: string]: PromptIDHistory
}

export type PromptIDHistory = {
    prompt: Prompt
    outputs: HistoryOutputs
}

export type HistoryOutputs = {
    [index: number]: {
        images: HistoryOutputsImages
    }
}

export type HistoryOutputsImages = Array<HistoryOutputsImage>

export type HistoryOutputsImage = {
    filename: string,
    subfolder: string,
    type: string
}