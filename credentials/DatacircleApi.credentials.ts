import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class DatacircleApi implements ICredentialType {
	name = 'datacircleApi';

	displayName = 'Datacircle API';

	icon = { light: 'file:../nodes/Datacircle/datacircle.svg', dark: 'file:../nodes/Datacircle/datacircle.svg' } as const;

	documentationUrl = 'https://docs.datacircle.dev/quickstart';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'Your Datacircle API key: sign up at datacircle.dev, it is on your dashboard',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Token {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.datacircle.dev',
			url: '/balance/',
		},
	};
}
