# State

HotPocket DApps can persist data onto the disk via regular file system operations, hence it is preserved and accessible between different invocations of the contract. HotPocket subjects the persisted data to consensus so that the majority of nodes are in agreement on the data that gets persisted onto their disks. The consensed data on disk is called the DApp "state" of the entire HotPocket cluster. When the DApp is invoked after a consensus round, it has read/write access to the consensed data on disk (state) via regular file system operations.

If a HotPocket node finds out that its state is "out of sync" with other nodes on the cluster, it will attempt to synchronize its state with the consensed state of the cluster. In this case, it will not invoke the DApp until its state is in sync with the cluster.

_**DApp binary in "state":** Although not required to do so, it is desirable for the DApp software itself to reside on "state". This ensures the application files of the DApp are also subjected to consensus, guaranteeing that each HotPocket node is hosting the same DApp version/logic._