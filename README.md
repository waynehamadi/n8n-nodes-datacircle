# @datacircle/n8n-nodes-datacircle

This is an n8n community node. It lets you use [Datacircle](https://datacircle.dev) in your n8n workflows.

Datacircle is a B2B data API with no markup: one API key and one balance for several data providers, each call at the provider's own price. Every call is live: the provider is asked each time, so you get the profile as it is today.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation, with the package name `@datacircle/n8n-nodes-datacircle`.

## Operations

- **LinkedIn Profile → Get**: one person's LinkedIn profile by its URL.
  - Provider **Up2Data** (`POST /v1/profiles/enrich`): the cheapest; a profile it can't find is free (`422`); a daily limit per account (`429`), past it use HarvestAPI.
  - Provider **HarvestAPI** (`GET /linkedin/profile`): every section of the profile, no daily limit.
- **Balance → Get** (`GET /balance/`): your balance in dollars, and the credits it holds. Free.

Each answer is the provider's own JSON plus `datacircle_meta`: `provider`, `cost_usd` (what this call cost) and `balance_usd` (what is left). Prices: [docs.datacircle.dev/pricing](https://docs.datacircle.dev/pricing).

## Credentials

Sign up at [datacircle.dev](https://datacircle.dev) with your email: your API key is on your dashboard, with a $5 credit. In n8n, create a **Datacircle API** credential and paste the key. n8n checks it against `GET /balance/`.

## Compatibility

Built with `@n8n/node-cli` and tested on n8n 1.x and 2.x.

## Usage

A `402` means your balance can't cover the call: add funds on your dashboard. A `429` from Up2Data is its daily limit: switch the Provider to HarvestAPI. Turn on the node's **Continue On Fail** setting to keep a list running past a profile that can't be fetched.

The node is usable as an AI agent tool.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Datacircle docs](https://docs.datacircle.dev)
- [LinkedIn Profile API](https://docs.datacircle.dev/linkedin-profile)
