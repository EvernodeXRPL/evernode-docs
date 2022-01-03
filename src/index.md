# Evernode
[Evernode](https://evernode.wordpress.com/) is a decentralized smart contract hosting platform composed with [Hooks-enabled XRP Ledger](https://hooks-testnet.xrpl-labs.com/). Evernode brings several decentralized technology innovations together to provide a global network of severs which is capable of hosting [Hot Pocket smart contracts](#hot-pocket-smart-contracts).

## Hot Pocket smart contracts
Evernode uses [Hot Pocket](hot-pocket/index.md) as its smart contract engine. Hot Pocket smart contracts are regular POSIX applications and can be written in any language. When multiple instances of a smart contract is deployed on a cluster of servers, Hot Pocket takes care of consensus and synchronization, letting the smart contract developer to only worry about the contract business logic.

## Evernode Hosts
Evernode hosts are Linux servers acting as the decentralized infrastructure capable of hosting Hot Pocket smart contracts. Registered Evernode hosts can earn revenue by listing their **hosting tokens** on the [XRPL dex](https://xrpl.org/decentralized-exchange.html) so Evernode users can purchase and redeem the tokens to deploy smart contracts. Hosts will also get rewarded with **EVR** tokens, Evernode's native currency, as they get audited for QoS by Evernode Auditors. Anyone can become an Evernode host by installing [Sashimono](sashimono/index.md) on their Linux server.

See how to participate in [Evernode beta](https://github.com/HotPocketDev/evernode-host)

## Evernode Hook
Evernode uses [XRP Ledger](https://xrpl.org/) with [Hooks amendment](https://hooks-testnet.xrpl-labs.com/) as the glue to manage the decentralized hosting infrastructure and contract deployment requests. Evernode hook keeps track of registered hosts, QoS audits and hosting rewards. It also governs the servicing of smart contract hosting requests (redeems) submitted by Evernode users.

See [Evernode hook specification](evernode/hook-spec.md)

## Evernode SDK
Client or server-side applications can integrate with Evernode using the Evernode [javascript client library](https://github.com/HotPocketDev/evernode-js-lib). The library includes support for all Evernode [operations](evernode/hook-spec.md#system-operations).