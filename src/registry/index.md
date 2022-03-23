# Registry
Evernode registry maintains the membership listing of all the hosts that have registered on Evernode. It is also the central place of truth about the Evernode network configuration parameters. The hosts interact with the well-known XRPL account denoted by **Registry Address** which is controlled by the Evernode registry service. Tenants can use the registry to find out latest details about member hosts.

![Registry](../img/registry-no-hooks.PNG)

Registry service interprits the membership management requests arriving at the registry XRPL account while maintaining a database of indexed membership and network configuration data. Tenants can use indexed data to find out information about registered Evernode hosts.

> _For any party who wishes to interact with Evernode, **Registry Address** is the entry point into the Evernode network._

## Network configuration
Evernode registry keeps several global configuration parameters that applies to the entire Evernode network in an accessible manner. Here are some of the important ones:

- Ever issuer address
- Ever issuance limit
- Current registration fee in Evers
- Moment window size
- Target hosting token price of purchaser service

## Registry operations
A new host requests for Evernode membership by initiating an XRPL payment of Evers according to the current registration fee. Upon succesful processing, the registry service issues the **Registration NFT** to the host. The Registration NFT acts as proof-of-membership of that host within Evernode. The host can sell the NFT back to registry for half of prevailing registration fee at a later time. At this point, the registry service will **deregister** the host and clear the host data from the registry.

## Future
In the future, when [XRPL hooks amendment](https://xrpl-hooks.readme.io) is finalized, it is anticipated that the Evernode registry service becomes a "Hook" on the XRP Ledger. At this point, the host membership information can be read directly from the XRP Ledger by tenants.