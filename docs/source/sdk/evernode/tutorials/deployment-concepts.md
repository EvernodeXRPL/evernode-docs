# DApp deployment concepts

After developing and testing your DApp on your local PC (see [HotPocket SDK](../../hotpocket/index.rst)), you need to deploy it to one or more Evernode hosts to make it available to users. This is somewhat akin to deploying a traditional application into the cloud.

1. You purchase a hosting space from a cloud hosting provider.
2. The hosting provider gives you the required details for connecting to the hosting space. The provider also makes sure only YOU possess permission to upload application files to the hosting space.
3. You upload your application to the hosting space which makes it available for users.

Since Evernode is a decentralized hosting platform, the above steps take place in the following way:

1. You lease a HotPocket instance on one of the [hosts](https://dashboard.evernode.org) using Evers in your Xahau account (wallet).
   - Lease purchase happens as a Xahau transaction on the Xahau network.
   - You specify the period of the lease in Moments (1 Moment = roughly 1 hour).
   - The transaction cost in Evers is decided by the per-Moment charge by the Host and how many Moments your lease is.
   - Later, before the lease expires, you can choose to "extend" the lease by paying relevant cost in Evers.
2. The host sends you the provisioned HotPocket instance connection details as a Xahau transaction to your Xahau account (Tenant wallet).
3. The DApp instance is already running the Evernode default "bootstrap" contract.
4. You connect to the bootstrap contract instance via WebSockets and upload your DApp files as the authorized user.
5. Bootstrap contract replaces itself with your DApp so now it is your DApp running on the provisioned instance.

## Prerequisites for deployment

1. DApp bundle (a.k.a smart contract bundle) - This is a zip bundle of your DApp files to be deployed.
2. Xahau account you own having sufficient EVR balance - This is known as the "Tenant account" or "Tenant wallet".
3. Temporary HotPocket user key pair - This public/private key pair provides you authorization to upload initial DApp files to the HotPocket instance.

## Detailed deployment steps

1. Decide the Host you want to deploy your instance to. This can based on lease price, host hardware specifications, geographical region, and whether the host has any vacant hosting slots available.
2. Issue "AcquireLease" transaction to the Host Xahau account from your Tenant account, containing the instance requirement specification with the required amount of Evers for the lease duration. You can specify requirements like the specific HotPocket Docker image to use, authorized user public key for file upload, initial instance configuration, etc...
3. Receive "AcquireSuccess" transaction on your Tenant account that the Host would send. This contains your leased HotPocket instance connection information.
4. You connect to the WebSocket port of the instance and authenticate using your HotPocket user private key. You can upload your contract zip bundle via this connection.
5. After the upload is complete, you can test whether your DApp is running by issuing any user inputs coded into your DApp code and checking the responses.

You can perform all of the above steps with [evdevkit](../evdevkit/overview) (see [tutorial](deploy-single.md)). You can also write your own code to perform the steps using [Evernode client library](../libraries.md#evernode-javascript-client) and [HotPocket client library](../../hotpocket/libraries.md#client-library).

## Continue reading

[Evernode Tutorials](../tutorials/index)