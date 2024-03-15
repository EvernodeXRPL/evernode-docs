# Host Selection Guide for DApp Deployment

This section outlines the process for selecting suitable hosts for deploying DApps.

- The hardware resource allocations and lease amount details can be obtained using either the [`evdevkit list`](../evdevkit/overview.md#listing-active-hosts) command or via [Evernode dashboards](https://dashboard.evernode.org/).  For a **3-instance node**, the recommended minimum host resource requirements are as follows:
    - RAM: 2 GB minimum
    - Swap: 2 GB minimum
    - Disk space: 4 GB minimum free disk space for `/home`
    - _**NOTE:** If there are more than three instances on the host, the recommended minimum resources should scale proportionally to the number of instances._

- Additionally, you can use the [`evdevkit audit`](../evdevkit/overview.md#auditing-hosts) command to verify the performance of Evernode host(s).