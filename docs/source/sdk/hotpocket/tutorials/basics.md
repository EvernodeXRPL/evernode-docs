# HotPocket Basics

HotPocket [DApp](../../../platform/hotpocket/overview.md#dapp) development involves two areas. Developing the application executable which contains the logic of your application, and developing the client application that interacts with the DApp as a [user](../../../platform/hotpocket/users.md). HotPocket acts as the middleman of bridging your client applications with the DApp.

Read more on [HotPocket concepts](../../../platform/hotpocket/index).

HotPocket runs only on Linux (Ubuntu 20.04) and is capable of using Linux POSIX-compliant applications as DApps. HotPocket uses [Docker](https://www.docker.com/) to bundle HotPocket and your DApps into a runnable Linux environment. Therefore, you can carry out your development activities on platforms such as Windows with the help of standard cross-platform programming environments.

This guide explains the journey of developing a DApp and a client application using NodeJs. Therefore it'll help you if you have prior knowledge of developing NodeJs applications. We will also use [HotPocket developer kit](../hpdevkit/overview) throughout this guide so most of the setup work like HotPocket and docker container configuration are done for you automatically. Therefore you can carry out the steps on this guide even if you do not have prior NodeJs experience.

**_Throughout our documentation we may use the terms “DApp”, “smart contract” or “contract” due to historical reasons. They all mean the same thing._**

## Install HotPocket developer kit

Follow [installation instructions](../hpdevkit/overview.md#installation) to install HotPocket developer kit on your PC.

## Create the DApp

Generate a blank DApp project with 
```
hpdevkit gen nodejs blank-contract mycontract
```
It will create a folder named 'mycontract' with contract files. Let's have a look at them. Here `nodejs` is the platform name. `blank-contract` is the template name.

Other templates available
- blank-client
- blank-contract
- evernode-bootstrap-client
- file-client
- file-contract
- npm-client
- npl-contract
- starter-client
- starter-contract

You can use `hpdevkit list <platform>` to list the available templates.

### src/mycontract.js

This is the entry point of your DApp. As shown below, `hpc.init()` takes care of registering the provided function as the entry point to your DApp and setting up the communication channels between your nodejs application and HotPocket.

```javascript
const HotPocket = require("hotpocket-nodejs-contract");

const mycontract = async (ctx) => {
  // Your DApp logic.
  console.log("Blank contract");
};

const hpc = new HotPocket.Contract();
hpc.init(mycontract);
```

During normal operation, HotPocket will invoke your application and pass the relevant information into the `ctx` argument of your contract function. This is called the 'contract context' which contains information about that execution of the contract. We will explore this later in this guide.

### dist/hp.cfg.override

This file contains configuration specific to your DApp. HotPocket supports many other configuration parameters, but here we are only specifying `bin_path` and `bin_args` parameters. HotPocket will use the default values for any parameters which haven't been specified. For the purpose of this guide, we will not discuss about other parameters that are not shown here.

```json
{
  "contract": {
    "bin_path": "/usr/bin/node",
    "bin_args": "index.js"
  }
}
```

`bin_path` indicates to HotPocket the location of the Linux application binary to be executed. Since we have generated a NodeJs application using HotPocket developer kit, it indicates the NodeJs install location within the HotPocket NodeJs docker image.

`bin_args` specifies any arguments (space separated) to be passed to the application binary. In this case we are passing the final compiled script of our javascript application into NodeJs.

## Run the DApp

Run the generated NodeJs DApp by navigating into the 'mycontract` directory and running the following commands.

```
cd mycontract
npm install
npm start
```

This will make HotPocket developer kit to build and deploy your DApp into all the nodes of the HotPocket cluster. At the end, it will start showing some console output emitted by a HotPocket node like this:

```
20220821 09:23:50.213 [inf][hpc] ****Ledger created**** (lcl:1-a80e9b9d state:aab8e909 patch:7365a671)
Blank contract
20220821 09:23:51.209 [inf][hpc] ****Ledger created**** (lcl:2-55e988d9 state:aab8e909 patch:7365a671)
Blank contract
20220821 09:23:52.209 [inf][hpc] ****Ledger created**** (lcl:3-835c39b2 state:aab8e909 patch:7365a671)
Blank contract
```

You can press Ctrl+C to exit from logging output. The HotPocket instance will continue to run. To revisit the log you can use the command `hpdevkit logs 1`. The parameter '1' is the instance (node) number. By default HotPocket developer kit creates a 3-node cluster.

_Under the hood, `npm start` command is simply using the command `hpdevkit deploy dist` to deploy the NodeJs build outputs directory, 'dist' into the HotPocket cluster. You can inspect the 'package.json' of your DApp project to see this._

### Consensus and contract execution

You will notice that the above log prints an execution log every few seconds. This is due to the way HotPocket operates and how it executes your DApp. HotPocket uses an interval called **consensus roundtime** which controls how often it attempts to exchange information with other HotPocket nodes in the cluster and arrive at a [consensus](../../../platform/hotpocket/consensus.md). At the end of every round, HotPocket creates a ledger using the information that was subjected to consensus. It then executes your DApp and passes it the information corresponding to the consensus ledger that was just created. The DApp should do what it wants with the data it was passed on and exit so HotPocket can start the next consensus round with the latest results from last DApp execution.

Now, with this understanding, let's revisit the code in 'mycontract.js'.

```javascript
const HotPocket = require("hotpocket-nodejs-contract");

const mycontract = async (ctx) => {
  // Your DApp logic.
  console.log("Blank contract");
};

const hpc = new HotPocket.Contract();
hpc.init(mycontract);
```

`hpc.init()` will cause HotPocket to invoke `mycontract` function whenever it creates a ledger. HotPocket will pass the `ctx` argument containing any information that it believes to be 'universal' among all the HotPocket nodes in the cluster. HotPocket will not invoke your application/function if it could not reach consensus (hence, no ledger was created) during a particular consensus round.

## Update the contract logic

Currently, our contract simply prints 'Blank contract'. Let's update it to print some information from the contract context passed by HotPocket as follows.

```javascript
const HotPocket = require("hotpocket-nodejs-contract");

const mycontract = async (ctx) => {
  // Your DApp logic.
  console.log("Ledger number", ctx.lclSeqNo);
  console.log("Connected users", ctx.users.count());
};

const hpc = new HotPocket.Contract();
hpc.init(mycontract);
```

Now, run `npm start` again. This will rebuild and redeploy your contract and show the console output.

```
20220821 10:01:53.215 [inf][hpc] ****Ledger created**** (lcl:1-d526d397 state:8a2aee45 patch:7365a671)
Ledger number 1
Connected users 0
20220821 10:01:54.211 [inf][hpc] ****Ledger created**** (lcl:2-f39ab881 state:8a2aee45 patch:7365a671)
Ledger number 2
Connected users 0
20220821 10:01:55.212 [inf][hpc] ****Ledger created**** (lcl:3-6617ef82 state:8a2aee45 patch:7365a671)
Ledger number 3
Connected users 0
```

You can see now we are printing the ledger number passed from HotPocket inside our DApp. We are also printing no. of [users](../../../platform/hotpocket/users.md) connected to our DApp but obviously it's returning 0. If there were any connected users, we could write logic in our contract to process any data sent by the users and do some useful things with it. In the next section let's see how users can connect to our contract.

Press Ctrl+C to stop the console output. HotPocket will continue to run in the background.

This is how you would keep on updating and testing your contract on your local PC.

## Create the client application

In order to interact with the DApp, we must create a HotPocket client application which can connect to HotPocket as a user. Use the command `hpdevkit gen nodejs blank-client myclient` to generate a simple NodeJs HotPocket client application.

The above command will create a folder 'myclient'. In it you will find 'myclient.js' with following code:

```javascript
const HotPocket = require("hotpocket-js-client");

async function clientApp() {
  const userKeyPair = await HotPocket.generateKeys();
  const client = await HotPocket.createClient(
    ["wss://localhost:8081"],
    userKeyPair
  );

  // Establish HotPocket connection.
  if (!(await client.connect())) {
    console.log("Connection failed.");
    return;
  }

  console.log("HotPocket Connected.");
}

clientApp();
```

With `HotPocket.generateKeys()`, we first generate a new 'key pair' which cryptographically identifies a unique user to a HotPocket DApp. Then we create a HotPocket client object by passing the HotPocket server address and the key pair. In the server address `wss://localhost:8081`, we specify `wss://` because HotPocket uses [WebSockets](https://en.wikipedia.org/wiki/WebSocket) for communication. `localhost` is used because we need to connect to a HotPocket node running inside our own PC and port `8081` is used because the HotPocket node running our contract was configured by the developer kit to listen on port 8081 for user connections.

With `client.connect()` the client application will actually establish a WebSocket connection with the HotPocket node running in your PC. Behind the scenes, HotPocket node and the client application goes through a handshake process to cryptographically verify each others identity. Once the handshake is complete, your client application is considered 'connected' to HotPocket.

_`HotPocket.generateKeys()` will generate a new random key pair by default. We will learn how to preserve and reuse the same key pair further into this tutorial._

## Run the client application

Run the client application inside 'myclient' directory with following commands:

```
cd myclient
npm install
node myclient.js
```

Since our HotPocket node from previous steps should still be running, the client application should be able to connect and you should see following output:

```
Connecting to wss://localhost:8081
Connected to wss://localhost:8081
HotPocket Connected.
```

Do not terminate the client application. We'll keep it connected. (You can terminate it anytime with Ctrl+C)

You may recall that previously our contract was printing `Connected users 0` in the logs. Now, with the client application connected, let's look at HotPocket DApp logs via a different terminal window using the command `hpdevkit logs 1`.

```
20220821 10:55:04.069 [inf][hpc] ****Ledger created**** (lcl:1521-d4b742af state:8a2aee45 patch:77e05022)
Ledger number 1521
Connected users 1
20220821 10:55:05.070 [inf][hpc] ****Ledger created**** (lcl:1522-824619a0 state:8a2aee45 patch:77e05022)
Ledger number 1522
Connected users 1
20220821 10:55:06.070 [inf][hpc] ****Ledger created**** (lcl:1523-203c654b state:8a2aee45 patch:77e05022)
Ledger number 1523
Connected users 1
```

You should see that it's now showing 1 connected user. If you were to run another instance of the client application with `node myclient.js`, the DApp log should start showing 2 connected users. This is because our client application generates a fresh key pair every time it starts up, causing HotPocket to treat it as a unique user.

Now, stop the HotPocket node with `hpdevkit stop`. You will see that the client application gets disconnected automatically. (you can restart HotPocket by running `npm start` from 'mycontract' directory)

## Access user information

Inside our contract, we can access information about the users via contract context passed by HotPocket. Let's update our contract as follows.

```javascript
const HotPocket = require("hotpocket-nodejs-contract");

const mycontract = async (ctx) => {
  // Your DApp logic.
  for (const user of ctx.users.list()) {
    console.log("User public key", user.publicKey);
  }
};

const hpc = new HotPocket.Contract();
hpc.init(mycontract);
```

The above code is iterating through all connected users, and printing each user's 'public key'. User's public key can be used to uniquely identify a user cryptographically.

Run `npm start` and then run several instances of your client application. You should see the contract log output printing public keys of connected users.

```
20220823 16:09:34.873 [inf][hpc] ****Ledger created**** (lcl:25-c69f184b state:14ca33f4 patch:28c55e24)
User public key eddf24ddcdddac0e4a7087529e3420575707791b1d7d201ec4efff0edbba62c2b2
User public key ede63c896f04aef76df1d77a476ac511dc2b92da74557bbe1988846e84261ee71a
20220823 16:09:35.874 [inf][hpc] ****Ledger created**** (lcl:26-8623280c state:14ca33f4 patch:28c55e24)
User public key eddf24ddcdddac0e4a7087529e3420575707791b1d7d201ec4efff0edbba62c2b2
User public key ede63c896f04aef76df1d77a476ac511dc2b92da74557bbe1988846e84261ee71a
```

NOTE : Make sure you have enabled at least a single client application instance. If not, run an instance of the client application with `node myclient.js`.

## Handle user inputs

So far our DApp is only capable of identifying connected users and nothing else. HotPocket DApps are capable of receiving 'inputs' from users. Let's update our DApp to process [user inputs](../../../platform/hotpocket/users.md#user-inputs).

```javascript
for (const user of ctx.users.list()) {
  console.log("User public key", user.publicKey);

  // Loop through inputs sent by the user.
  for (const input of user.inputs) {
    const buffer = await ctx.users.read(input);
    console.log("Received input:", buffer.toString());
  }
}
```

Here, for each connected user, we are iterating through any inputs they have sent. Each 'input' has to be read into a binary buffer. For simplicity of our contract, we are assuming all inputs sent by users are strings. Hence, we simply convert the binary buffer to string and print on screen.

If you re-run the DApp with `npm start` and also start your client application now, you will not see any inputs being received by the contract. This is because our client application currently only establishes a connection to HotPocket. It does not send any data across the connection yet. Let's update the client application to do that as follows.

```javascript
// Establish HotPocket connection.
if (!(await client.connect())) {
  console.log("Connection failed.");
  return;
}

console.log("HotPocket Connected.");
console.log("Saying hello...");
await client.submitContractInput("hello");
```

`client.submitContractInput()` sends the specified data into HotPocket via the established WebSocket connection. Because the connection is already cryptographically verified as belonging to the user's key pair, HotPocket knows which user sent that particular input.

When HotPocket receives the inputs, it broadcasts the inputs to other HotPocket nodes in the cluster, and subjects them to consensus to verify that a majority of nodes indeed received the inputs. If consensus is reached, it then passes the inputs to the DApp.

Run the client application with `node myclient.js` while looking at the HotPocket logs. HotPocket logs should show something like this:

```
20220821 14:18:10.069 [inf][hpc] ****Ledger created**** (lcl:39-4ccab9bc state:81b360bc patch:77e05022)
User public key ed9a4cf5eba65fb12e8971dd8e4fec352601814214bb54c696dfd0a77bbdf4427e
Received input: hello
```

## Handle user outputs

Now our client application is capable of sending user inputs and our DApp can receive them. Next, let's add the ability for the DApp to reply to the user in the form of ['outputs'](../../../platform/hotpocket/users.md#user-outputs).

Update the DApp with the following code.

```javascript
// Loop through inputs sent by the user.
for (const input of user.inputs) {
  const buffer = await ctx.users.read(input);

  const message = buffer.toString();
  console.log("Received input:", message);
  await user.send(`You said '${message}'`);
  await user.send(`Thanks for talking to me!`);
}
```

As you can see, our contract actually replies with 2 outputs upon receiving an input from a user. In HotPocket, there's no requirement for outputs to be associated with any inputs. The DApp can decide to not send any outputs at all, send one or more outputs as a response to an input, or send outputs without having any inputs at all. It's up to you to model your application behavior according to your liking.

Update the client application with the following code to receive outputs.

```javascript
console.log("HotPocket Connected.");

// Register event handler to receive outputs before we start sending inputs.
client.on(HotPocket.events.contractOutput, (result) => {
  console.log("Received outputs:");
  result.outputs.forEach((o) => console.log(o));
});

console.log("Saying hello...");
await client.submitContractInput("hello");
```

Here, we register an event handler so that when the HotPocket client receives outputs sent by the contract, our handler is invoked. It's good practice to register the output handler before we start sending inputs so we don't miss any outputs. Each output result can contain multiple outputs sent by HotPocket.

Run the DApp and the client application. The client application should print a log like this:

```
HotPocket Connected.
Saying hello...
Received outputs:
You said 'hello'
Thanks for talking to me!
```

Please note that the HotPocket client does not associate any outputs with a corresponding input. This is because HotPocket does not enforce any relationship between inputs and outputs. As also explained above, a HotPocket DApp can send outputs even without receiving any inputs as well. This is especially useful in sending notifications to users without them having to request first.

## Terminating HotPocket connection

Currently, our client application keeps running after it does its job, which is sending user input and receiving the output. This is due to it having an active connection to HotPocket. We can close that connection if we think that it's no longer needed. Let's modify the client application to close the connection soon after it receives any outputs from the user.

```javascript
client.on(HotPocket.events.contractOutput, (result) => {
  console.log("Received outputs:");
  result.outputs.forEach((o) => console.log(o));

  client.close();
});
```

Run the client application with `node myclient.js`. You will see that the application exits soon after it receives the outputs from the DApp.

## Reusing the user public key

So far, our client application generates a new key pair every time it starts up. This makes HotPocket treat every launch of our client application as a unique user. A real-world application would need to interact with the DApp as the same user. For this purpose, we need to preserve the key pair and reuse it in subsequent launches of the client application.

```javascript
const userKeyPair = await HotPocket.generateKeys();
```

The key pair object contains `publicKey` and `privateKey` components in binary format. The critical component is the `privateKey` because it inherently includes the public key as well. Therefore, we can preserve the private key for later restoration of the key pair.

Update the 'myclient.js' with the following code.

```javascript
const HotPocket = require('hotpocket-js-client');
const fs = require('fs');

async function clientApp() {

    const keyFile = 'user.key';
    if (!fs.existsSync(keyFile)) {
        const newKeyPair = await HotPocket.generateKeys();
        const saveData = Buffer.from(newKeyPair.privateKey).toString('hex');
        fs.writeFileSync(keyFile, saveData);
        console.log('New key pair generated.');
    }

    // Generate the key pair using saved private key data.
    const savedPrivateKeyHex = fs.readFileSync(keyFile).toString();
    const userKeyPair = await HotPocket.generateKeys(savedPrivateKeyHex);

    ....
```

In the above example, we are maintaining a key file to preserve the user's key data. If the file does not exist, we generate a new key pair and save the private key component in hexadecimal (text) format. Subsequently, we read the saved private key data from the file and restore the key pair using the `HotPocket.generateKeys()` function.

_Private keys are considered **sensitive data** (similar to a password in a traditional application) and proper security practices must be followed when preserving a private key for later use. It is outside the scope of this guide and is the responsibility of the application developer. The above example simply serves as a rudimentary example to showcase the scenario._

Run the client application with `node myclient.js` several times. You will notice HotPocket identifies the user as having the same public key even in different executions of the client app shown in the following DApp log.

```
20220831 14:57:39.504 [inf][hpc] ****Ledger created**** (lcl:9-8ff821d4 state:86fd529c patch:1dea7287)
User public key ede5cad06629a53339a15490357363a85d2f5fa6b95b0e643741cc21800d9b798f
20220831 14:57:40.504 [inf][hpc] ****Ledger created**** (lcl:10-c5fb71ad state:86fd529c patch:1dea7287)
20220831 14:57:41.516 [inf][hpc] ****Ledger created**** (lcl:11-646352f4 state:86fd529c patch:1dea7287)
20220831 14:57:42.504 [inf][hpc] ****Ledger created**** (lcl:12-6c41b505 state:86fd529c patch:1dea7287)
User public key ede5cad06629a53339a15490357363a85d2f5fa6b95b0e643741cc21800d9b798f
```

That concludes the HotPocket basics tutorial. We have created a DApp and a client application which can communicate with each other.

Next: [Working with multiple nodes](multinode.md)