# @datacircle/n8n-nodes-datacircle

The Datacircle node for [n8n](https://n8n.io/): every API on the [Datacircle](https://datacircle.dev) sheet, who is best for each, every plan and every provider, in a workflow.

Find the best GTM APIs. We benchmark all the GTM APIs and we put the results on our website, [datacircle.dev](https://datacircle.dev). This node calls our open API at `https://api.datacircle.dev/v1`. It is free, with no key and no account.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)

## Installation

Install `@datacircle/n8n-nodes-datacircle` from n8n's community nodes. n8n's [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) shows how.

## Operations

- **API → Get Many** (`GET /apis`): every API on the sheet, in its order, with its slug, how many plans and providers it has, its best plan and its pages. One item per API.
- **API → Get Best Plans** (`GET /apis/{slug}/best`): an API's plans best first by score, each with its rank, its price per 1,000 and its page on datacircle.dev. One item per plan, up to 50.
- **Plan → Search** (`GET /plans`): every plan, or an API's, or those whose provider or plan name holds every word of your query, sorted by score, provider or price. One item per plan, up to 50; Offset gives the next ones.
- **Provider → Get** (`GET /providers/{slug}`): one provider's plans on each API it sells, and its rank on each.

Each plan is a row of the sheet with every key. What each key means: [datacircle.dev/fields](https://datacircle.dev/fields).

## Credentials

None. The API is open, with no key.

## Compatibility

Built with `@n8n/node-cli` and tested on n8n 2.47.3.

## Usage

Start with **API → Get Many** for the slugs, such as `linkedin-profile` or `email-finder`, then **API → Get Best Plans** for who is best for one. The API takes at most 60 calls a minute from one address and answers `429` past that: turn on the node's **Retry On Fail**. Every plan is also one file at [datacircle.dev/datacircle.json](https://datacircle.dev/datacircle.json).

## Resources

- [Datacircle](https://datacircle.dev)
- [The API](https://datacircle.dev/api) and [its spec](https://api.datacircle.dev/v1/openapi.json)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
