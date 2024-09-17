import { KSampler, CheckpointLoaderSimple, EmptyLatentImage, CLIPTextEncode, VAEDecode, PreviewImage, VAELoader, SaveImageWebsocket } from "./api_type";


// 综合结构的类型定义
export type Prompt = {
	[index: string]: KSampler | CheckpointLoaderSimple | EmptyLatentImage | CLIPTextEncode | VAEDecode | PreviewImage | VAELoader | SaveImageWebsocket
	"3"?: KSampler;
	"4"?: CheckpointLoaderSimple;
	"5"?: EmptyLatentImage;
	"6"?: CLIPTextEncode;
	"7"?: CLIPTextEncode;
	"8"?: VAEDecode;
	"10"?: PreviewImage;
	"11"?: VAELoader;
	"12"?: SaveImageWebsocket;
};


