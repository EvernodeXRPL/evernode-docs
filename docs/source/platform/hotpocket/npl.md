# Node Party Line (NPL)

Node Party Line offers a way for DApp instances (nodes) of a cluster to exchange information among themselves in real time. This is useful in cases where DApp needs to make decisions based on differing information provided by individual nodes.

Examples:

- Exchanging cryptographic signatures from all nodes in order to perform multi-sign operations.
- Nominating a single node (leader-election) from the cluster to communicate with an external service.
- Agreeing upon a piece of information to go forward with based on different information gathered by individual nodes.

NPL messages do not go through [consensus](consensus) which makes them real-time. NPL messages sent by a DApp instance are immediately received by currently-executing DApp instances on other nodes.

## Privacy

NPL can work in `public` or `private` modes. In `public` mode, all NPL messages exchanged between [UNL](consensus.md#unl---unique-node-list) nodes are also received by any other connected nodes as well. In `private` mode, the NPL messages are restricted to UNL nodes only.