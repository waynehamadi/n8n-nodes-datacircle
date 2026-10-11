# @datacircle/n8n-nodes-datacircle

The Datacircle n8n node gets a LinkedIn profile from its URL, in a workflow or as an AI agent's tool.

Datacircle is a data co-op. You send the provider's own request to api.datacircle.dev, with your Datacircle key. That's the only change. Right now we have 3 live LinkedIn profile APIs that we trust: Up2Data, HarvestAPI and Fetchin. Each request goes to the provider and gets the profile as it is today.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)

## Installation

Install @datacircle/n8n-nodes-datacircle from n8n's community nodes, then add your Datacircle key. n8n's [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) shows how.

## Operations

- **LinkedIn Profile → Get**: one person's LinkedIn profile from its URL, through the provider you pick.
  - **Up2Data** (`POST /v1/profiles/enrich`): a profile it can't find is free (`422`). Past its daily limit per account it answers `429`: pick Fetchin or HarvestAPI.
  - **HarvestAPI** (`GET /linkedin/profile`): no daily limit. Only HarvestAPI returns the member's interests.
  - **Fetchin** (`GET /api/v1/profile`): no daily limit. You pay for a profile it can't find (`404`).
- **Balance → Get** (`GET /balance/`): your balance in dollars. Free.

Each answer is the provider's JSON plus `datacircle_meta`: `provider`, `cost_usd` (what this call cost) and `balance_usd` (your balance after this call). Prices: [docs.datacircle.dev/pricing](https://docs.datacircle.dev/pricing).

## Credentials

Log in at datacircle.dev/login with your work email. Your API key is on the page once you're in. In n8n, create a **Datacircle API** credential and paste the key. n8n checks it against `GET /balance/`.

## Compatibility

Built with `@n8n/node-cli` 0.51.4 and tested on n8n 2.42.6.

## Usage

A call your balance can't cover answers 402. Add funds, from $5, on your dashboard. A `429` from Up2Data is its daily limit: pick Fetchin or HarvestAPI. A `429` from Fetchin is its rate limit: resend the request a second later, or turn on the node's **Retry On Fail**. Set **On Error** to **Continue** to skip a profile the provider can't fetch and finish the list.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Datacircle docs](https://docs.datacircle.dev)
- [LinkedIn Profile API](https://docs.datacircle.dev/linkedin-profile)
