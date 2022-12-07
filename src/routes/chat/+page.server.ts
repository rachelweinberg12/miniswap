import type { Actions } from './$types';
import { ChatGPTAPI } from 'chatgpt';


export const actions = {
	chat: async (event) => {
		const data = await event.request.formData();
		const chat = data.get('chat') as string;
		console.log('event form data', chat);

		// sessionToken is required; see below for details
		const api = new ChatGPTAPI({ sessionToken: SESSION_TOKEN });

		// ensure the API is properly authenticated
		await api.ensureAuth();

		const response = await api.sendMessage(chat);

		return {
			response
		};
	}
} as Actions;
