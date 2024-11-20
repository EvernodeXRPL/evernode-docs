# Nomad behavior Enabled Contract

## overview
The nomad contract gives [Nomad behaviour](../..patterns/dapp-cluster-models.md#nomad-model) to a cluster.
Here the initial bootstrapping (Leasing the inital nodes and Deploying the DApp) has to be done by the stakeholders of the DApp. After that the DApp takes control over the cluster.

Since the acquiring has to happen from an existing test network, The developer might not be able to test all the nomad functionality locally (hpdevkit cluster).

Note:- The given nomad contract only gives the nomnd functionality. Hence it does not provide a complete DApp. Developers can build the rest of their DApp logic based on the given contract.

## Project Setup

Clone the [everpocket-nodejs-contract](https://github.com/EvernodeXRPL/everpocket-nodejs-contract) repository.
Go to the project folder and install npm dependencies.

```
npm install
```
Go to `test/contract` folder and again install the npm dependencies

```
cd test/contract/
npm install 
```

Modify the cluster details in the contract.js file.
Modify MAX_CLUSTER size and the nomadOptions as you prefer. Here is an example.

```
const MAX_CLUSTER = 5;

const nomadOptions = {
    targetNodeCount: 5,
    lifeIncrMomentMinLimit: 1,
    maxLifeMomentLimit: 2,
    preferredHosts: [
        "rDJo1WZXEXa1BtFS9zr3PuGBFLYvZ8Df8m",
        "rfL2Q5mDHyhtxTMBuj7FZRmj9GvQ5RWrjB",
        "rHZQ5V27PwLGLcpqDC3bCr7vQSVn5VxX3T"
    ],
    instanceCfg: {
        config: {
            log: {
                log_level: "dbg"
            }
        }
    }
}

```

Note: To choose the preferredHosts you can use the `getActiveHostsFromLedger()` function in the `evernode-js-library`. For the testnet you can also use evdevkit cli command to retrieve hosts details. (`evdevkit list`). The details are also available in  [ community dashboards](https://dashboard.evernode.org/).

For this tutorial, to demonstrate the DApp Logic, we will add the [echo contract](https://github.com/EvernodeXRPL/hp-nodejs-contract/blob/main/example/echo-contract.js) logic to the [nomad contract](https://github.com/EvernodeXRPL/everpocket-nodejs-contract/blob/main/test/contract/src/contract.js).

```

```
## Deploying the contract into a local cluster
To deploy the contract to local dev environment (hpdevkit cluster) use `npm Sstart` command. The start command includes the build and deploy commands. (see package.json)

## Cleanup the cluster
To remove the local cluster after testing, use `hpdevkit clean` command.
