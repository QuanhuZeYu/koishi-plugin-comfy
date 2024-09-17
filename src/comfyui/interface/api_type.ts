export type KSampler = {
	inputs: {
		seed: number;
		steps: number;
		cfg: number;
		sampler_name: string;
		scheduler: string;
		denoise: number;
		model: [string, number];
		positive: [string, number];
		negative: [string, number];
		latent_image: [string, number];
	};
	class_type: string;
	_meta: {
		title: string;
	};
};

export type CheckpointLoaderSimple = {
	inputs: {
		ckpt_name: string;
	};
	class_type: string;
	_meta: {
		title: string;
	};
};

export type EmptyLatentImage = {
	inputs: {
		width: number;
		height: number;
		batch_size: number;
	};
	class_type: string;
	_meta: {
		title: string;
	};
};

export type CLIPTextEncode = {
	inputs: {
		text: string;
		speak_and_recognation: boolean;
		clip: [string, number];
	};
	class_type: string;
	_meta: {
		title: string;
	};
};

export type VAEDecode = {
	inputs: {
		samples: [string, number];
		vae: [string, number];
	};
	class_type: string;
	_meta: {
		title: string;
	};
};

export type PreviewImage = {
	inputs: {
		images: [string, number];
	};
	class_type: string;
	_meta: {
		title: string;
	};
};

export type VAELoader = {
	inputs: {
		vae_name: string;
	};
	class_type: string;
	_meta: {
		title: string;
	};
};

export type SaveImageWebsocket = {
	inputs: {
		images: [string, number];
	};
	class_type: string;
	_meta: {
		title: string;
	};
};

export type UserInputPrompt = {
	seed?: number
	steps?: number
	cfg?: number

	width?: number
	height?: number

	Ptext?: string
	Ntext?: string

	cModel?: string
}