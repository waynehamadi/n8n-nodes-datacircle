import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';

export class Datacircle implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Datacircle',
		name: 'datacircle',
		icon: { light: 'file:datacircle.svg', dark: 'file:datacircle.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description:
			'Get LinkedIn profiles through Up2Data, HarvestAPI or Fetchin at the provider’s price, with one Datacircle API key',
		defaults: {
			name: 'Datacircle',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'datacircleApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.datacircle.dev',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'LinkedIn Profile',
						value: 'linkedinProfile',
					},
					{
						name: 'Balance',
						value: 'balance',
					},
				],
				default: 'linkedinProfile',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['linkedinProfile'] } },
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get a profile',
						description:
							'Get one person’s LinkedIn profile from its URL, live from the provider. The answer says what the call cost and your balance after it.',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['balance'] } },
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get the balance',
						description: 'Get your Datacircle balance in dollars, and the credits it holds',
						routing: {
							request: {
								method: 'GET',
								url: '/balance/',
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Profile URL',
				name: 'url',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'https://www.linkedin.com/in/williamhgates',
				description: 'The person’s LinkedIn profile URL',
				displayOptions: { show: { resource: ['linkedinProfile'], operation: ['get'] } },
			},
			{
				displayName: 'Provider',
				name: 'provider',
				type: 'options',
				noDataExpression: true,
				default: 'up2data',
				description: 'Who fetches the profile. Prices: https://docs.datacircle.dev/pricing.',
				displayOptions: { show: { resource: ['linkedinProfile'], operation: ['get'] } },
				options: [
					{
						name: 'Up2Data',
						value: 'up2data',
						description:
							'A profile it can’t find is free (422). Past its daily limit per account it answers 429: pick Fetchin or HarvestAPI.',
						routing: {
							request: {
								method: 'POST',
								url: '/v1/profiles/enrich',
								headers: { 'X-Data-Provider': 'up2data' },
								body: { url: '={{$parameter.url}}' },
							},
						},
					},
					{
						name: 'HarvestAPI',
						value: 'harvestapi',
						description: 'No daily limit. Only HarvestAPI returns the member’s interests.',
						routing: {
							request: {
								method: 'GET',
								url: '/linkedin/profile',
								headers: { 'X-Data-Provider': 'harvestapi' },
								qs: { url: '={{$parameter.url}}' },
							},
						},
					},
					{
						name: 'Fetchin',
						value: 'fetchin',
						description: 'No daily limit. You pay for a profile Fetchin can’t find (404).',
						routing: {
							request: {
								method: 'GET',
								url: '/api/v1/profile',
								headers: { 'X-Data-Provider': 'fetchin' },
								qs: { profileUrlOrUrn: '={{$parameter.url}}' },
							},
						},
					},
				],
			},
		],
	};
}
