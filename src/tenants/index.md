# Tenants
An Evernode tenant is an entitiy which leases a hosting slot in order to host a smart contract instance. In the real world, tenants can be developers or applications that wants to create and maintain smart contract instances. The tenant must **acquire** a lease a hosting slot with Evers. When the acquisition is complete, the tenant gains access to a freshly-provisioned default [HotPocket](../hot-pocket/index.md) smart contract instance. The tenant can alter the default contract to make it do what the tenant wants. Tenant can **extend** the lease by paying in Evers as long as it wants to keep running the smart contract instance.

![Tenant actions](../img/tenant-actions.png)

## Contract clusters
Using the above flow, a tenant can create multiple contract instances and configure them to talk to each other. Such a group of instances form a contract cluster which can perform [consensus](../hot-pocket/index.md#consensus) and synchronize with each other.

![Contract cluster](../img/contract-cluster.png)
