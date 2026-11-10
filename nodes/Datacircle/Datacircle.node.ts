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
			'Find the best GTM APIs: every API on the Datacircle sheet, who is best for each, every plan and every provider, with no key',
		defaults: {
			name: 'Datacircle',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		requestDefaults: {
			baseURL: 'https://api.datacircle.dev/v1',
			headers: {
				Accept: 'application/json',
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
						name: 'API',
						value: 'api',
					},
					{
						name: 'Plan',
						value: 'plan',
					},
					{
						name: 'Provider',
						value: 'provider',
					},
				],
				default: 'api',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['api'] } },
				options: [
					{
						name: 'Get Best Plans',
						value: 'getBest',
						action: 'Get the best plans for an API',
						description:
							'The API’s plans best first by score, each with its rank and its page on datacircle.dev',
						routing: {
							request: {
								method: 'GET',
								url: '=/apis/{{encodeURIComponent($parameter.slug)}}/best',
							},
							output: {
								postReceive: [{ type: 'rootProperty', properties: { property: 'plans' } }],
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getAll',
						action: 'Get many API sheets',
						description:
							'Every API on the sheet, in its order, with its slug, how many plans and providers it has, its best plan and its pages',
						routing: {
							request: {
								method: 'GET',
								url: '/apis',
							},
						},
					},
				],
				default: 'getBest',
			},
			{
				displayName: 'API Slug',
				name: 'slug',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'linkedin-profile',
				description:
					'The API’s slug, as API → Get Many gives it: the words of its sheet’s address on datacircle.dev, as linkedin-profile in /linkedin-profile-api-pricing',
				displayOptions: { show: { resource: ['api'], operation: ['getBest'] } },
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['plan'] } },
				options: [
					{
						name: 'Search',
						value: 'search',
						action: 'Search plans',
						description:
							'Every plan on the sheet, or an API’s, or those whose provider or plan name holds every word you search',
						routing: {
							request: {
								method: 'GET',
								url: '/plans',
							},
							output: {
								postReceive: [{ type: 'rootProperty', properties: { property: 'plans' } }],
							},
						},
					},
				],
				default: 'search',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: { minValue: 1, maxValue: 50 },
				default: 50,
				description: 'Max number of results to return',
				displayOptions: {
					show: { resource: ['api', 'plan'], operation: ['getBest', 'search'] },
				},
				routing: {
					send: { type: 'query', property: 'limit' },
				},
			},
			{
				displayName: 'Filters',
				name: 'filters',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: { show: { resource: ['plan'], operation: ['search'] } },
				options: [
					{
						displayName: 'API',
						name: 'api',
						type: 'string',
						default: '',
						placeholder: 'email-finder',
						description:
							'Only this API’s plans: its name or its slug, as API → Get Many gives them',
						routing: { send: { type: 'query', property: 'api' } },
					},
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						typeOptions: { minValue: 0 },
						default: 0,
						description: 'How many found plans to skip first',
						routing: { send: { type: 'query', property: 'offset' } },
					},
					{
						displayName: 'Query',
						name: 'query',
						type: 'string',
						default: '',
						placeholder: 'bright data',
						description:
							'Words that must all appear in the provider’s or plan’s name, ignoring case and accents',
						routing: { send: { type: 'query', property: 'query' } },
					},
					{
						displayName: 'Sort',
						name: 'sort',
						type: 'options',
						default: 'score',
						options: [
							{
								name: 'Score',
								value: 'score',
								description: 'Best first, as on the sheet, each API’s plans together',
							},
							{ name: 'Provider', value: 'provider', description: 'A to Z' },
							{ name: 'Price', value: 'price', description: '$ per 1,000, lowest first' },
						],
						routing: { send: { type: 'query', property: 'sort' } },
					},
				],
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['provider'] } },
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get a provider',
						description: 'The provider’s plans on each API it sells, and its rank on each',
						routing: {
							request: {
								method: 'GET',
								url: '=/providers/{{encodeURIComponent($parameter.providerSlug)}}',
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Provider Slug',
				name: 'providerSlug',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'bright-data',
				description:
					'The provider’s name in lowercase letters and digits, the rest a hyphen, as Bright Data’s bright-data',
				displayOptions: { show: { resource: ['provider'], operation: ['get'] } },
			},
		],
	};
}
