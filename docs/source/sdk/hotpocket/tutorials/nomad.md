# Nomad behavior Enabled Contract

## Overview
The nomad contract gives [Nomad behaviour](../..patterns/dapp-cluster-models.md#nomad-model) to a cluster.
Here the initial bootstrapping (Leasing the inital nodes and Deploying the DApp) has to be done by the stakeholders of the DApp. After that the DApp takes control over the cluster.
Since the acquiring has to happen from an existing test network, The developer might not be able to test all the nomad functionality locally (hpdevkit cluster).

Note:- The given nomad contract only gives the nomnd functionality. Hence it does not provide a complete DApp. Developers can build the rest of their DApp logic based on the given contract.

## Project Setup

Clone the [everpocket-nodejs-contract](https://github.com/EvernodeXRPL/everpocket-nodejs-contract) repository.
Go to the project folder and install npm dependencies.

```bash
npm install
```
Go to `test/contract` folder and again install the npm dependencies

```bash
cd test/contract/
npm install 
```

Modify the cluster details in the contract.js file.
Modify MAX_CLUSTER size and the nomadOptions as you prefer. Here is an example.

```javascript
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

uncomment below line 
```javascript
   () => runNomadContract(nomadContext),
```

For this tutorial, to demonstrate the DApp Logic, we will add the [echo contract](https://github.com/EvernodeXRPL/hp-nodejs-contract/blob/main/example/echo-contract.js) logic to the [nomad contract](https://github.com/EvernodeXRPL/everpocket-nodejs-contract/blob/main/test/contract/src/contract.js).

```javascript
            for (const input of user.inputs) {
                const buf = await contractCtx.users.read(input);
                info("Received user input", buf.toString());
                const response = await clusterContext.feedUserMessage(user, buf);
                //additional user message handle logic
                console.log("response :" + JSON.stringify(response));
                if (response?.type != "UNHANDLED"){
                    const msg = buf.toString();
                    const output = "Echoing: " + msg;
                    console.log("sending output.")
                    await user.send(output);
                }

            }
```

While testing the nomad contract, make sure to uncomment the lines in the `contract.js` related to preparing the signers.
```javascript
        if (!fs.existsSync('multisig')) {
            const isSigner = !nonSigners.includes(hpContext.publicKey);

            await prepareMultiSigner(new evp.XrplContext(hpContext, masterAddress, masterSecret, { network: "testnet" }), signerCount, isSigner, quorum);

            fs.writeFileSync('multisig', '');
        }
```

note:- Make sure to comment when deploying to a live cluster as explained in [nomand contract deployment tutorial](../../evernode/tutorials/deploy-nomad.md)

## Deploying the contract into a local cluster
To deploy the contract to local dev environment (hpdevkit cluster) use `npm start` command. The start command includes the build and deploy commands. (see package.json)

## creating a client

`everpocket-nodejs-contract` also has a pre-implemented client for testing your contract. Navigate to `test/client` directory and install dependencies.
```bash
cd test/client
npm install 
```
For the simplicity of this tutorial, we will modify it to an echo client.

```bash
    const input_pump = () => {
        rl.question('', (inp) => {
            if (inp.length > 0) {
                hpc.submitContractReadRequest(JSON.stringify(inp)).then(reply => {
                    console.log(reply);
                });
            }
            input_pump();
        })
    }
```

## Building the client binary

Go inside the `myclient` directory and execute `npm i` and this will install all the required dependencies.

## Testing the client

Inside the `myclient` directory, run `node myclient.js localhost 8081`. This will start the client program and start to listen to user inputs.

Type `test string` and hit **Enter**. This will send the user input to the contract and the contract will echo the input as the output.

In the client console, you'll get an output like follows.

```bash
Echoing: "test string"
```

## Cleanup the cluster
To remove the local cluster after testing, use `hpdevkit clean` command.

Next: [Running standalone HotPocket node](standalone)