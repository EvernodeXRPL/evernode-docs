# Xahau transaction enabled cluster

While executing smart contracts, you might need to implement Xahau transactions in your contract.

For example, during smart contract execution, you may have a requirement to make a payment to a Xahau account. However, To do a transaction you need to have your account secret inside the contract. Since your contract will be deployed in someone's machines you can't trust your account secret with them.

To solve this issue you can set up a signer list for your account and keep each signer info inside separate nodes. Therefore when submitting the transaction, the cluster can collectively multi-sign the transaction and submit it.

Let's go through an example using [hpdevkit](../hpdevkit/overview.md). We will achieve this using [everpocket-nodejs-contract](https://www.npmjs.com/package/everpocket-nodejs-contract).

**hpdevkit** has a predeveloped template including sample code to multi-sign and submit a transaction. Let's go through the following steps to prepare a cluster with that template and deep dive into the code. (We will use the default parameters for the cluster creation, If you want to change them refer to [this](../hpdevkit/overview.md#advanced-usage))

## Generating the contract
Generate a multi-signing enabled DApp project with `hpdevkit gen nodejs multisig-contract mycontract`. It will create a directory named `mycontract` with contract files. Let’s have a look at them.

### src/contract.js

```javascript
const evp = require('everpocket-nodejs-contract');

export class mycontract {
    sendOutput; // This function must be wired up by the caller.
    voteContext;
    hpContext;

    // This function will be called in each contract execution.
    async handleContractExecution(ctx) {
        this.voteContext = new evp.VoteContext(ctx);
        this.hpContext = new evp.HotPocketContext(ctx, { voteContext: this.voteContext });

        if (!ctx.readonly) {
            // Listen to incoming unl messages and feed them to elector.
            ctx.unl.onMessage((node, msg) => {
                this.voteContext.feedUnlMessage(node, msg);
            });
        }
    }

    async handleRequest(user, message, isReadOnly) {
        // This sample application defines two simple messages. 'get' and 'set'.
        // It's up to the application to decide the structure and contents of messages.

        if (message.type == 'makePayment') {
            if (isReadOnly) {
                await this.sendOutput(user, {
                    type: 'makePaymentResult',
                    status: 'error',
                    error: 'Submit multisig not supported in readonly mode'
                })

                return;
            }


            const sender = message.sender;
            const receiver = message.receiver;

            try {
                const xrplContext = new evp.XrplContext(this.hpContext, sender);
                await xrplContext.init();
                const tx = await xrplContext.xrplAcc.prepareMakePayment(receiver, "1", "XRP")

                console.log("----------- Multi-Signing Transaction");
                const res = await xrplContext.multiSignAndSubmitTransaction(tx);
                console.log("Transaction submitted");

                await this.sendOutput(user, {
                    type: 'makePaymentResult',
                    status: 'ok',
                    data: res
                })
            }
            catch (e) {
                console.error(e);

                await this.sendOutput(user, {
                    type: 'makePaymentResult',
                    status: 'error',
                    error: e
                })
            }
        }
        else {
            await this.sendOutput(user, {
                status: 'error',
                error: 'Unknown message type'
            })
        }
    }
}
```

This contains your contract logic. This is invoked from `src/mycontract.js`. If you look inside that file, You can see it's handling the user inputs and invoking the functions here. `handleContractExecution` is invoked at every contract execution and `handleRequest` is invoked per every user input.

We are importing `everpocket-nodejs-contract` package to handle the multi-signing part.

If you look inside the `if (message.type == 'makePayment')` block. It handles messages sent from you with the type `makePayment`, It takes two arguments sender and receiver Xahau addresses.
Then the transaction is prepared and submitted using `multiSignAndSubmitTransaction` function. In `everpocket-nodejs-contract` classes, All the NPL communication and multi-signing and submission happen internally. You wouldn't have to worry about it. You can just use the provided functions.

To be able to multi-sign you need to have multi-signers info inside your cluster nodes. You can prepare multi-signing enabled local cluster with `hpdevkit` easily.

## Building the contract binary

Run `npm i && npm run build` inside `mycontract` directory to prepare your binaries. This will prepare executables and required files into the `dist` directory.

## Deploying the contract into a local cluster

You can run `hpdevkit deploy <contract-path> -m -s <master-secret>` to prepare a multi-signing enabled cluster.

Execute `hpdevkit deploy mycontract/dist -m -s <master-secret>` and this will generate new accounts for all the nodes in the cluster and set them as signer list for the master account given. (Default weight per signer will be 1 and the quorum will be 80% of all the weights)

We cannot keep the secrets in the state directory because each node has a dedicated signer. So it will copy each nodes signer details into non consensused directory. `everpocket-nodejs-contract` requires you to have each node's signer details in `../<master-address>.key` so they won't be subjected to consensus. So the above command will adhere to that rule and signer details will be saved.

After executing the above command contract will be deployed locally and you will be able to see the contract logs. Which means your contract is now up and running.

## Generating the client

`hpdevkit` also has a pre-implemented client for your multisig-contract. Execute `hpdevkit gen nodejs multisig-client myclient`. It will create a directory named `myclient` with client files.

This is a very basic client which has a readline to take user inputs. According to inputs it will prepare the contract input with the type `makePayment` and send it to the contract.

It also listens to contract output and logs them in the console.

## Building the client binary

Go inside the `myclient` directory and execute `npm i` and this will install all the required dependencies.

## Testing the client

Inside the `myclient` directory, run `node myclient.js`. This will start the client program and start to listen to user inputs.

Type `makePayment <master-address> <receiver-address>` and hit **Enter**. This will send the user input to the contract and the contract does the multi-sign transaction it's implemented to do and sends the output.

In the client console, you'll get an output like follows if the transaction succeeds.

```bash
(ledger:232)>>  {
  hash: '549AC22564273BF6BDE60333CB616EACEF3E0CF03103663B1419E1E035083A57',
  lastLedgerSequence: 11767630,
  resultCode: 'tesSUCCESS'
}
```

