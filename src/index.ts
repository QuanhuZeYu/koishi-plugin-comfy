import { Context, Schema } from 'koishi'
import Data from './Data'
import commands from './commands'
import Event from './Event'

export const name = 'comfyui'
export const mydir = __dirname

export const usage = `
启动ComfyUI服务器之后便可以直接调用 [仍在施工中，未来目标是开箱即用]
api_1.json是ComfyUI的api接口文件，默认参数是直接调用这个文件，一般来说模型名称需要你手动把默认参数给调整一下
`

export interface Config {
	pluginDir: string
	debug: boolean
	comfyUILocal: string
	comfyDefaultModel: string
}

export const Config: Schema<Config> = Schema.object({
	pluginDir: Schema.string().default(__dirname).hidden(),
	
	debug: Schema.boolean().default(true).description('是否开启调试模式'),
	comfyUILocal: Schema.string().default('127.0.0.1:8188').description('ComfyUI本地监听路径'),
	comfyDefaultModel: Schema.string().default('animagineXLV31_v31.safetensors').description('调用绘图时默认使用的模型名称，请根据自己的实际情况来选择！')
})

export function apply(ctx: Context) {
	const 绘图使用指南 = `可用参数: seed|种子 steps|步数 cfg|匹配度 width|宽 height|高 ptext|正(正面提示词) ntext|反(负面提示词) cModel|模型(模型名称)`
	const baseData = Data.baseData
	Event.setupBaseData(ctx)  // 初始化需要的资源
	Event.findValidModel()

	const q_comfy = ctx.command('q-comfy', 'comfyUI api调用绘图插件').usage(`基本使用指南：命令+空格+关键字+[:或者=或者,]+< + 内容 + >\n例如：q-绘图 ptext: <a cat, 4k, masterpiece>ntext: <NSFW, unfinished drawing>`)

	q_comfy.subcommand('q-绘图 [message:text]', 绘图使用指南).usage(绘图使用指南)
		.action((argv,message) => {
			commands.getPromptImage(argv, message)
		})
	q_comfy.subcommand('q-获取模型', '获取所有基础模型')
		.action((argv,message) => { 
			commands.getCheckpoints(argv,message)
		})
}
