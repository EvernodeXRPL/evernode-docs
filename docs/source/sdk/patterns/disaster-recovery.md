# Disaster recovery

Evernode allows decentralized apps to run without human intervention (see [cluster models](dapp-cluster-models)). How since the hosting hardware is diverse and is not owned by a single party, it cannot be predicated whether the dapp cluster will have any downtime. Usually evernode dapp clusters require 80% (configurable) of its nodes to be healthy in order to perform consensus and ensure forward progress of the cluster. If more than 20% of the nodes become unavailable the forward progress of the cluster will halt. Sometimes the halt can be temporary and will resolve itself quickly. However, it cannot be predicated how long it will last and whether it'll damage the cluster permanently.

Here are some of the undesirable things that can happen to a cluster:

1. Some hosts hosting the nodes of the cluster can go down or face network issues. It can be a short lived downtime or it can be a permanent hardware failure of the host requiring several hours or days for fixing the issue.
2. A host could shutdown their hosting business parmanently. This is unlikely for reputed/long-term hosts but this is outside of anyone's control.
3. The parties responsible for funding the leases of the respective nodes may fail to do so, causing the leases to expire and the nodes to be killed parmanently.
4. In the case of 