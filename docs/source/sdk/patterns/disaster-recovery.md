# Disaster recovery

Evernode allows decentralized apps to run without human intervention (see [cluster models](dapp-cluster-models)). However, since the decentralized hosting hardware is diverse and is not owned by a single party, it cannot be predicated whether the DApp cluster will have any downtime. Usually evernode DApp clusters require 80% (configurable) of its nodes to be healthy in order to perform consensus and ensure the forward progress of the cluster. If more than 20% of the nodes become unavailable, the forward progress of the cluster will halt. Sometimes the halt can be temporary and will resolve itself quickly. However, it cannot be predicated on how long it will last and whether it'll damage the cluster permanently.

Here are some of the undesirable things that can happen to a cluster:

1. Some hosts hosting the nodes of the cluster can go down or face network issues. It can be a short lived downtime or it can be a permanent hardware failure of the host requiring several hours or days to fix the issue.
2. A host could shutdown their hosting business permanently. This is unlikely for reputed/long-term hosts but this is outside of anyone's control.
3. The parties responsible for funding the leases of the respective nodes may fail to do so, causing the leases to expire and the nodes to be killed permanently.
4. If the affected nodes are high enough in quantity, the cluster will fail to achieve consensus and the DApp code will not get executed by HotPocket. If the DApp is based on a model like [nomad model](dapp-cluster-models.md#nomad-model), this will also stop any further cluster lifecycle management operations performed by the DApp code causing even the healthy nodes to expire and get killed.

Due to reasons such as above, in the worst-case, the entire cluster may seize to exist. This means the DApp code as well as the DApp data which was stored on the cluster would be permanently lost. Even if the DApp itself can be bootstrapped again with a redeployment, data cannot be recovered.

Following practices can be used to avoid data loss.

## Consensus fallback

It is best to avoid a loss of cluster in the first place rather than attempting recovery after a loss. If the cluster fails to perform consensus, the DApp can detect it and react to it using the HotPocket "consensus fallback" mode (coming soon). This allows the DApp to make decisions to get back into consensus and potentially avoid a permanent death of the cluster. For example, the DApp can attempt to relax the consensus thresholds, roundtime or even adjust the UNL in anticipation of resuming consensus and normal operation of the DApp. The main benefit is this is fully autonomous and baked into the DApp code itself so it does not depend on manual intervention of any stakeholders.

## Observer nodes

Stakeholders of a DApp can choose to run private "observer" nodes to act as private replicas of the DApp. Observer nodes listen to consensus and replicate cluster activities and data but they are not part of the UNL. These nodes could be run on private HotPocket installations in private hardware so there is no risk of lease expiration. During disaster recovery, stakeholders can coordinate to have these nodes act as the seed nodes to bootstrap a new cluster after which they can go back to their usual role of being observer nodes again.

## Data backup

The DApp could have code to periodically or on-demand upload backups of data to external storage locations. The DApp must take care to efficiently upload and maintain data backups (especially if the data is too large). In the event of a cluster death, the stakeholders can bootstrap the cluster with a restored copy of backup data.