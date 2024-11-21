# Deploying a smart contract with Nomad behavior to an Evernode cluster

## Prepare the contract

make sure to uncomment the lines in the `contract.js` related to preparing the signers.
```
        if (!fs.existsSync('multisig')) {
            const isSigner = !nonSigners.includes(hpContext.publicKey);

            await prepareMultiSigner(new evp.XrplContext(hpContext, masterAddress, masterSecret, { network: "testnet" }), signerCount, isSigner, quorum);

            fs.writeFileSync('multisig', '');
        }
```

Using the Evernode developer kit, you can create an [everpocket-nodejs-contract](https://www.npmjs.com/package/everpocket-nodejs-contract) supported multi-signing enabled instance cluster in Evernode and deploy your nomad smart contract, as you did locally in ["HotPocket tutorial - Nomad behavior Enabled Contract"](../../hotpocket/tutorials/nomad.md).

- This will create an Evernode cluster with the given specs.
- Then, as it did in [hpdevkit](../../hotpocket/hpdevkit/overview.md), this will also generate a signer list for the provided master account and upload them to each node in the cluster 



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

- First, you need to have a tenant Xahau account with EVRs for the tenant. For the Evernode testnet, you can generate an account with 6000 EVRs using the [test account generator](../../../assets/test-account-generator.zip) (Use `EV_NETWORK`, `EV_SERVER` env variables to specify custom network or server).

Same as cluster deployment, follow the [1-5] steps in the cluster deployment [tutorial](deploy-cluster.md#deploy-smart-contract)

1. Now you are ready to deploy the smart contract to an Evernode cluster.
   - Let's create a 3-node cluster. Run the following command to create the cluster.
     ```bash
     evdevkit cluster-create 3 $HOME/contract /usr/bin/node $HOME/hosts.txt -a index.js --signer-count 3
     ```
   - Note:
     - `3` Is the cluster size.
     - `--signer-count 3` option specifies that you are creating 5 signers inside the cluster.
     - Replace `$HOME/contract` with your contract directory path (Path to build a directory of contract binaries).
     - Replace `$HOME/hosts.txt` with your preferred hosts file path (Path to the Preferred Hosts file created in the previous step).
     - Replace `/usr/bin/node` and `index.js` with your binary path and arguments.
   - This will create an Evernode cluster in the preferred hosts, And it'll internally generate signers for your tenant account you have specified as `EV_TENANT_SECRET`. Then it outputs the instance details.
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
            name: '086D3B9FDF60EDCDB2291FD0844FC602235200C839BF8BE14EA91BA82A2B105B',
            pubkey: 'edd5cebbbd56984a1e728ec16b0f38d048bcc10bef00699c3db0b7b6440f10c1e2',
            contract_id: '0621b671-8497-49d2-bd4a-5286d38351c0',
            peer_port: '22867',
            user_port: '26207',
            gp_tcp_port: '36531',
            gp_udp_port: '39016',
            domain: '45.77.199.188',
            outbound_ip: '2001:19F0:9002:18D1:0000:0000:0000:0004',
            created_timestamp: 1710428235311,
            signer_detail: {
               account: 'r4KsqnUjUTqLhPxQdKMACVCmmZp2JRNwWA',
               secret: 'spFA5X1rDNbjRv2aNvpzbfRPBd9Xv',
               weight: 1
            },
            life_moments: 1,
            uploaded: true
         },
         {
            host: 'rH8oZBoCQJE1aGwdNRH7icr93RrZkbVaaa',
            name: '3335FB10C49796FC9DF172C6C1122A27FC9D79B6964214A71EFE06C51AB59911',
            pubkey: 'edaef7bd1250af4c71353d7a237bfd8973d55605a4a324c9881870341c96ac574c',
            contract_id: '0621b671-8497-49d2-bd4a-5286d38351c0',
            peer_port: '22866',
            user_port: '26206',
            gp_tcp_port: '36529',
            gp_udp_port: '39014',
            domain: '45.77.199.188',
            outbound_ip: '2001:19F0:9002:18D1:0000:0000:0000:0002',
            created_timestamp: 1710428271929,
            signer_detail: {
               account: 'r1CW4YKJzUddKTg76St1wcm9wqxsD7iAq',
               secret: 'sp8jToG54fTEJ4C4Xdti7yPtjSjE8',
               weight: 1
            },
            life_moments: 1,
            uploaded: true
         },
         {
            host: 'rH8oZBoCQJE1aGwdNRH7icr93RrZkbVaaa',
            name: 'A8C76E7F0A90B0385244F5BAEA8AA971FF4F4569029FE67926EBC4983B9A88F5',
            pubkey: 'ed6f417fa7d7aa9c65b52d5e17d50290c1574eaabf7bba2dcd2d7dbf93adc83ee0',
            contract_id: '0621b671-8497-49d2-bd4a-5286d38351c0',
            peer_port: '22865',
            user_port: '26205',
            gp_tcp_port: '36527',
            gp_udp_port: '39012',
            domain: '45.77.199.188',
            outbound_ip: '2001:19F0:9002:18D1:0000:0000:0000:0003',
            created_timestamp: 1710428312388,
            signer_detail: {
               account: 'rB2kjE5YcLZtpqfFqmmp219L1QfHHZEwnR',
               secret: 'ssA2fsawnm8zJEsA8V1M4qqo8tXH7',
               weight: 1
            },
            life_moments: 1,
            uploaded: true
         }
      ]
     ```
   - You can specify more options (Ex: `-m` specify life moments) to the `cluster-create` command. Check the supported options using the below command.
     ```bash
     evdevkit cluster-create --help
     ```
2. At this point, you have created an Evernode cluster successfully and you have details of all the instances including public key, IP, ports, etc. Now you can test the uploaded contract by implementing a user client same as you did in the ["HotPocket tutorial - Nomad behavior Enabled Contract"](../../hotpocket/tutorials/nomad.md). You will need to point your client to one of the resulting cluster nodes.

Next: [Deploying contract instances with a custom Docker image](custom-docker)