# Deploying a smart contract with Xahau transactions to an Evernode cluster

Using Evernode developer kit, you can create an [everpocket-nodejs-contract](https://www.npmjs.com/package/everpocket-nodejs-contract) supported multi sign enabled instance cluster in Evernode and deploy your smart contract with Xahau transactions, as you did locally in ["HotPocket tutorial - Xahau transactions"](../../hotpocket/tutorials/multisig.md).

- This will create a Evernode cluster with given specs.
- Then, as it did in [hpdevkit](../../hotpocket/hpdevkit/overview.md), this will also generate signer list for the provided master account and uploads them severalty to each node in the cluster 

## Deploy smart contract

**Note:** For the following steps you can choose either `mainnet` or `testnet`. The default will be `mainnet`, If you want to change you need to set the environment variable as follows.
```bash
# Windows (command prompt)
set EV_NETWORK=testnet

# Windows (Powershell)
$env:EV_NETWORK=testnet

# Linux (bash)
export EV_NETWORK=testnet
``` 

In the Evernode developer kit, a single command does the cluster creation and the deployment. You need to do the following preparations before same as you did in ["Acquire an instance"](./deploy-single.md#acquire-an-instance)

- First you need to have a tenant Xahau account with EVRs for the tenant.

Same as cluster deployment, follow the [1-6] steps in cluster deployment [tutorial](deploy-cluster.md#deploy-smart-contract)

1. Now you are ready to deploy the smart contract to an Evernode cluster.
   - Let's create a 5 node cluster. Run following command to create the cluster.
     ```bash
     evdevkit cluster-create 3 $HOME/contract /usr/bin/node $HOME/hosts.txt -a index.js --signer-count 3
     ```
   - Note:
     - `3` Is the cluster size.
     - `--signer-count 3` option specifies that you are creating 5 signers inside the cluster.
     - Replace `$HOME/contract` with your contract directory path (Path to build a directory of contract binaries).
     - Replace `$HOME/hosts.txt` with your preferred hosts file path (Path to the Preferred Hosts file created in the previous step).
     - Replace `/usr/bin/node` and `index.js` with your binary path and arguments.
   - This will create an Evernode cluster in the preferred hosts, And it'll internally generates signers for your tenant account you have specified as `EV_TENANT_SECRET`. And then it outputs the instance details.
     ```bash
     ...
     Cluster created!
     ...
     Archive finished. (location: $HOME/bundle/bundle.zip)
     ...
     Contract bundle uploaded!
     Created the 3 node cluster! [
         {
            host: 'rH8oZBoCQJE1aGwdNRH7icr93RrZkbVaaa',
            userKeys: {
               privateKey: 'ed797ecd191b0364db559896c648c21cda7763db551a97577ed9ffb0ebb41881d8f9d1af6ff29af9287b0411758aac472016fb186220ef39db7959294c28857909',
               publicKey: 'edf9d1af6ff29af9287b0411758aac472016fb186220ef39db7959294c28857909'
            },
            name: '22EEDAB02134E83CB6DFAC0C7B5E31B2563F80C428287E58380E22F3B10115E9',
            pubkey: 'ed16c8e6594c15d19db313e3a1f5ae61f199408fa00ab77cf7a2c39144ba797a65',
            contract_id: 'c8fcc2d7-63d8-4040-a618-4b354f58284a',
            peer_port: '22865',
            user_port: '26205',
            domain: '45.77.199.188',
            outbound_ip: '2001:19F0:9002:18D1:0000:0000:0000:0003',
            created_timestamp: 1710426541356,
            life_moments: 1
         },
         {
            host: 'rH8oZBoCQJE1aGwdNRH7icr93RrZkbVaaa',
            userKeys: {
               privateKey: 'ed797ecd191b0364db559896c648c21cda7763db551a97577ed9ffb0ebb41881d8f9d1af6ff29af9287b0411758aac472016fb186220ef39db7959294c28857909',
               publicKey: 'edf9d1af6ff29af9287b0411758aac472016fb186220ef39db7959294c28857909'
            },
            name: '3C73B8F6B8866880A732B9B4C78CCA0951AC641E041F572D6071323B822BF3AB',
            pubkey: 'ed1dbb157bbb7c2241a29f5a10e3891ed664ea96e2a14199d113535c4438af09ac',
            contract_id: 'c8fcc2d7-63d8-4040-a618-4b354f58284a',
            peer_port: '22866',
            user_port: '26206',
            domain: '45.77.199.188',
            outbound_ip: '2001:19F0:9002:18D1:0000:0000:0000:0006',
            created_timestamp: 1710426581720,
            life_moments: 1
         },
         {
            host: 'rH8oZBoCQJE1aGwdNRH7icr93RrZkbVaaa',
            userKeys: {
               privateKey: 'ed797ecd191b0364db559896c648c21cda7763db551a97577ed9ffb0ebb41881d8f9d1af6ff29af9287b0411758aac472016fb186220ef39db7959294c28857909',
               publicKey: 'edf9d1af6ff29af9287b0411758aac472016fb186220ef39db7959294c28857909'
            },
            name: '8A72D7430ACE8699B324B1DCCC5FDDABC69F00589206CC859C9F77917B60973E',
            pubkey: 'ed777e90ebda7e3efaca05780207a1e820938afbf31453a87722a304c652147939',
            contract_id: 'c8fcc2d7-63d8-4040-a618-4b354f58284a',
            peer_port: '22867',
            user_port: '26207',
            domain: '45.77.199.188',
            outbound_ip: '2001:19F0:9002:18D1:0000:0000:0000:0004',
            created_timestamp: 1710426624809,
            life_moments: 1
         }
      ]
     ```
   - You can specify more options (Ex: `-m` specify life moments) to the `cluster-create` command. Check the supported options using the below command.
     ```bash
     evdevkit cluster-create --help
     ```
2. At this point, you have created an Evernode cluster successfully and you have details of all the instances including public key, IP, ports, etc. Now you can test the uploaded contract by implementing a user client same as you did in [hpdevkit Xahau transaction tutorial](../../hotpocket/tutorials/multisig.md#testing-the-client). You will need to point your client to one of resulted cluster nodes.
