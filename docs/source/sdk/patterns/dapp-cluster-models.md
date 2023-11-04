# Dapp cluster models

In Evernode, a dapp cluster should usually go through following activities.

- Leasing the initial set of HotPocket nodes and deploying the dapp. (a.k.a bootstrapping)
- Extending the leases of individual nodes as required.
- Evicting unhealthy nodes from the UNL and leasing new replacements.
- Expanding or shrinking the cluster (increase/decrease the UNL) as required.

Above activities can be managed in different ways based on the usage purpose and the business model of the dapp. Evernode does not enforce you to stick to any particular way of doing things. But the following patterns can become useful in deciding management strategies of your dapp.

`Note: Due to the trustless nature of Evernode hosting, it is recommended to purchase the hosting leases in shorter intervals and keep exending the lease before expiry of the lease as required.`

## Centralized model

In this model, a single party chooses to act as the "owner" of the entire cluster. They may lease all the nodes of the cluster using the funds in their Xahau account and upload the dapp. They may chose to extend any leases or withhold funding certain leases. They may also posses the ability to debug and control the behaviour of all nodes of the cluster. This kind of a model is fully centralized since a single party has total controlling power of the entire cluster. This model is useful during development and testing of a dapp. [Evernode cluster tutorial](../evernode/tutorials/deploy-cluster) follows this model.

## Membership model

In membership model, each node of the cluster is owned by an independent party. All UNL nodes are running the same dapp code but individual nodes' lifecytcle is controlled by the respective "owner" of that node. In such a model, the dapp code would have some governance logic for accepting new member nodes into the UNL (eg. paying a membership fee). The dapp would also take care of evicting bad/misbehaving member nodes according to some elgiability criteria. Each owner of the member nodes is responsible for extending the lease of their own node. This model is fully decentralized but relies on individual stakeholders for the upkeep of the cluster. See [membership contract](https://github.com/EvernodeXRPL/membership-contract) for more details.

## Nomad model

In nomad model, the dapp itself completely takes control of managing the cluster. It is a fully autonomous and decentralized model. Initial bootstrapping of the cluster must be done by the stakeholders of the dapp, but from that point onwards the dapp takes control according to the logic built into it. The dapp code contains logic for managing the lifecycles of all its UNL nodes. It can choose to replicate itself into new nodes, evict bad nodes from the UNL and even move across the hosting network (hence, "nomad") by eleminating old nodes and replicating itself to new nodes. To do all this, the dapp controls a multi-custodial Xahahu wallet (a.k.a cluster wallet) to utilize the funds in it for leasing nodes. The business model of the dapp could provide a way to replenish the funds available in the cluster wallet. [Everpocket library](https://github.com/EvernodeXRPL/everpocket-nodejs-contract) provides the necessary building blocks to use in your dapp to enable nomad capabilities.