# Deploying contract instances with a custom Docker image

You can implement your own Docker images using a default Sashimono Docker image and then deploy it into your contract instance.
- Sashimono Docker images
  - `evernode/sashimono:hp.latest-ubt.20.04` - HotPocket without NodeJS
  - `evernode/sashimono:hp.latest-ubt.20.04-njs.20` - HotPocket with NodeJS

## Let's inspect how the above Sashimono Docker containers are configured
- They are using Ubuntu 20.04 as their underlying operating system.
- All the HotPocket binaries are placed inside `/usr/local/bin/hotpocket`.
- In the above Docker images, the entry point for the container is set as `/usr/local/bin/hotpocket/hpcore`.
- The contract folder inside the container is `/contract`.
- Inside it all the contract related files and directories (`cfg, contract_fs, ledger_fs, log`) are situated.
- Given the entry point is `/usr/local/bin/hotpocket/hpcore`, When your Evernode instance is started inside Sashimono it'll run `/usr/local/bin/hotpocket/hpcore run /contract`

In summary, when you are creating your own Docker image, You'll have to modify files or entry points inside the Docker image.

## Let's create a sample Evernode instance with a customized Docker image.

**Note that. In this tutorial, we'll keep the implementation to a very basic primitive level, for better understandability. The main goal of this tutorial is to guide you to come up with advanced solutions suitable for your product.**

In this sample, the smart contract will write the last closed ledger sequence and hash it to a location where it's not been subjected to consensus.
Then there will be a long-running process watching that file and it'll publish that file content to a webhook in each minute.

Let's get started with implementation,

### Step 1
- Create a directory `my-docker-sample`.
  - This will be the project directory for our implementation here on.

### Step 2
- Inside the directory create a file called `Dockerfile`.
  - This will be the definition for the custom Docker image that you are going to implement.
- Add the following line.
  - This is where you specify that inherit your Docker image from the predefined Sashimono Docker image
```
FROM evernode/sashimono:hp.latest-ubt.20.04-njs.20
```

### Step 3
- After the above step, You can make any changes inside your Dockerfile to override and add customizations to the inherited Docker image.
- So, our task is to create a long-running NodeJs process to watch the file updated by the contract.
- So, let's get started by implementing the long-running program. Then you should tell the Dockerfile how to run it on the container.
- Create a directory called `watchdog` inside the `my-docker-sample` directory.
  - This will be the project directory for the watchdog long-running process.
- Go to the watchdog directory and run `npm init` and proceed with defaults to create a simple NodeJs program.

### Step 4
- Create an `index.js` file inside watchdog directory.
- You should know the following facts before starting the implementation.
  - As we learned above, the contract folder for the instance is `/contract` where it keeps the contract-related content.
  - From the smart contract's perspective, the Working directory (`./`) for the smart contract is `/contract/contract_fs/mnt/rw/state`.
  - If you write anything beyond `../`, They won't be subjected to consensus. But one problem here is, `/contract/contract_fs/mnt/rw/` is a mount that gets mounted and unmounted in each smart contract consensus round.
  - So, to be accessed by your long-running process, You'll have to write your contract from the smart contract inside `../../../` location which will be `/contract/contract_fs/` for the outside world. Note that beyond this location nothing will be subjected to consensus.
- Considering the above facts let's consider our shared file as `/contract/contract_fs/status.log`, Which is `../../../status.log` for the contract.
  - So the long-running process should keep checking that file in every minute and send the file content to the webhook.

### Step 5
- Let's first create a test webhook to report to.
  - Go to https://webhook-test.com/, It'll open up a test webhook for you and you can see the webhook URL there.
- Then, Go through and understand the following code and paste it inside `index.js` you have created in the previous step.
  - Replace the webhook URL constant value with yours.
```js
const fs = require('fs');

// Constants to keep status file and webhook URL.
const STATUS_FILE = '/contract/contract_fs/status.log';
const WEBHOOK = '<webhook_URL_you_got_from_webhook_test>';

// Function to check for status file and send to webhook.
function sendStatus() {
    let content;
    if (fs.existsSync(STATUS_FILE)) {
        content = fs.readFileSync(STATUS_FILE);
    }
    else {
        content = 'Contract is not running';
    }

    // Send the status file content to webhook
    fetch(WEBHOOK, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/text'
        },
        body: content
    }).then(response => {
        if (response.ok) {
            console.log('Message sent successfully!');
        } else {
            console.error('Failed to send message:', response.statusText);
        }
    }).catch(error => {
        console.error('Error:', error);
    });
}

// Scheduler function to send status in each minute and schedule for the next minute.
function scheduler() {
    setTimeout(() => {
        sendStatus();
        scheduler();
    }, 60000);
}

// Send status now.
sendStatus();
// Start the scheduler to send in every minute.
scheduler();
```

### Step 6
- Now run `npm i` to install the required packages.
- Let's build your program to a single file so it's easier to move into the Docker container.
- To do that, First install [ncc](https://www.npmjs.com/package/@vercel/ncc) package and build your program
- Inside the package.json let's create a script to build the program into a single file.
- Add script `"build": "npx ncc build index.js -o dist"` inside the `"scripts"` section in `package.json`
- Now run `npm run build` to generate a single file executable inside the dist directory.
- No you'll have the compiled program inside the `dist` directory.


### Step 7
- Now let's get back to Docker container creation again.
- Go to `my-docker-sample` directory.
- Add the following line, It'll create a directory to keep the watchdog program inside the Docker container.
```
RUN mkdir -p /usr/local/bin/hotpocket/watchdog
```
- Then let's add the following line to move all the content inside the dist folder to the watchdog bin directory inside the container.
```
COPY watchdog/dist/* /usr/local/bin/hotpocket/watchdog
```

### Step 8
- Now lets override the entrypoint with a custom script.
- Create a `start.sh` script with following content.
```bash
#!/bin/sh

# Run watchdog
/usr/bin/node /usr/local/bin/hotpocket/watchdog &

# Set the HotPocket binary as the entry point.
# $@ is used to pass all the commandline arguments fed to this script into hpcore.
/usr/local/bin/hotpocket/hpcore $@
```

### Step 9
- Add the following lines to move the start script and change its permissions.
```
COPY start.sh /usr/local/bin/hotpocket/start.sh
RUN chmod +x /usr/local/bin/hotpocket/start.sh
```

### Step 10
- By following line override entrypoint to `start.sh` instead of hpcore.
```
ENTRYPOINT ["/usr/local/bin/hotpocket/start.sh"]
```
- The complete `Dockerfile` would look like the following.
```
FROM evernode/sashimono:hp.latest-ubt.20.04-njs.20

RUN mkdir -p /usr/local/bin/hotpocket/watchdog
COPY watchdog/dist/* /usr/local/bin/hotpocket/watchdog

COPY start.sh /usr/local/bin/hotpocket/start.sh
RUN chmod +x /usr/local/bin/hotpocket/start.sh

ENTRYPOINT ["/usr/local/bin/hotpocket/start.sh"]
```

### Step 11
- Now let's build the Docker image, Run the following command.
- Specify your image name and the tag you are going to use. Replace <your_docker_account> with your Docker Hub account name.
```bash
docker build -t <your_docker_account>/evenode-custom:latest -f ./Dockerfile .
```
- Then publish the Docker image to your repository.
```bash
docker image push --all-tags <your_docker_account>/evenode-custom
```
- Now your image will published in your repository and it can be specified when you are deploying your Evernode cluster or instance.


### Step 12
- Now let's create a contract that keeps updating its last closed ledger to the `/contract/contract_fs/status.log` file.
- Create a blank contract by following the [basic tutorial](../../hotpocket/tutorials/basics.md#create-the-dapp)
- Add following to `src/mycontract.js`
```js
const HotPocket = require("hotpocket-nodejs-contract");
const fs = require("fs");

const mycontract = async (ctx) => {
  // Append last closed ledger sequence and hash to status file.
  fs.appendFileSync('../../../status.log', `${ctx.lclSeqNo}-${ctx.lclHash}\n`);
};

const hpc = new HotPocket.Contract();
hpc.init(mycontract);
```
- Now go inside `mycontract` directory and run `npm i` and then `npm run build:prod`

### Step 13
- Now all you have to do is deploy the contract using evdevkit.
- Follow [this tutorial](deploy-single.md) to deploy an instance with above program and watchdog process monitoring it.
  - Note that. When following the above tutorial, Specify your custom Docker image into -i, --image option of `evdevkit acquire` command.
    - Ex: `evdevkit acquire -i <your_docker_account>/evenode-custom:latest ....`

- Now check the webhook for updates from the watchdog program.

