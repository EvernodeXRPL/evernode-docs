# Deploying a smart contract to an Evernode cluster

Using Evernode developer kit, you can create an instance cluster in Evernode and deploy your smart contract, as you did locally in ["HotPocket tutorial - multiple nodes"](../../hotpocket/tutorials/multinode.md). Even though you can give a single command and create an up and running cluster with your smart contract running on it, it's important to have an understanding of what it does internally when creating the cluster. So, these are the steps it follows.

1. Creates a single node in one of Evernode hosts.
2. Creates the rest of the nodes with only the first node's public key in their [UNL](../../../platform/hotpocket/consensus.md#unl---unique-node-list).
3. Creates a contract bundle with your smart contract binaries and HotPocket contract configuration containing a list of all the nodes public keys as the [UNL](../../../platform/hotpocket/consensus.md#unl---unique-node-list).
4. Upload the bundle to the first node.
   - The other nodes that are listening to the first node will receive the same bundle and all nodes will update their contracts themselves.

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

- First you need to have a tenant Xahau account with EVRs for the tenant. For the Evernode testnet, you can generate an account with 6000 EVRs using the [test account generator](../../../assets/test-account-generator.zip) (Use `EV_NETWORK`, `EV_SERVER` env variables to specify custom network or server).

1. Then you need to prepare a user key pair for the Evernode instance.

- Run the below command to prepare a new key pair.
  ```bash
  evdevkit keygen
  ```
- This will output the generated key pair as follows.
  ```bash
  New key pair generated {
     privateKey: 'ed797ecd191b0364db559896c648c21cda7763db551a97577ed9ffb0ebb41881d8f9d1af6ff29af9287b0411758aac472016fb186220ef39db7959294c28857909',
     publicKey: 'edf9d1af6ff29af9287b0411758aac472016fb186220ef39db7959294c28857909'
  }
  ```

2. Now you need to set [environment variables](../evdevkit/overview.md#environment-variables) for tenant secret and user private key.

   ```bash
   # Windows (command prompt)
   set EV_TENANT_SECRET=snmyH19JLWVaUJKtM4cNxTT6t38eA
   set EV_USER_PRIVATE_KEY=ed797ecd191b0364db559896c648c21cda7763db551a97577ed9ffb0ebb41881d8f9d1af6ff29af9287b0411758aac472016fb186220ef39db7959294c28857909

   # Windows (powershell)
   $env:EV_TENANT_SECRET=snmyH19JLWVaUJKtM4cNxTT6t38eA
   $env:EV_USER_PRIVATE_KEY=ed797ecd191b0364db559896c648c21cda7763db551a97577ed9ffb0ebb41881d8f9d1af6ff29af9287b0411758aac472016fb186220ef39db7959294c28857909

   # Linux (bash)
   export EV_TENANT_SECRET=snmyH19JLWVaUJKtM4cNxTT6t38eA
   export EV_USER_PRIVATE_KEY=ed797ecd191b0364db559896c648c21cda7763db551a97577ed9ffb0ebb41881d8f9d1af6ff29af9287b0411758aac472016fb186220ef39db7959294c28857909
   ```

3. Let's override the HotPocket configuration in the Evernode instance. You can skip this step if you do not want to but we recommend you to give some large value as `6000` to the `contract.consensus.roundtime` if you are going to deploy a large smart contract bundle.

   - Create a new json file anywhere you prefer.
   - Add the following content inside the file.
     ```json
     {
       "contract": {
         "consensus": {
           "roundtime": 6000
         }
       },
       "mesh": {
         "peer_discovery": {
           "enabled": false
         }
       }
     }
     ```
     **Note: `peer_discovery` should be disabled, Otherwise evdevkit would not be able to update the peer list after creating the cluster.**
   - See [Hotpocket configuration reference](../../hotpocket/reference/configuration.md) for more details.
   - Now set the json file path as `EV_HP_INIT_CFG_PATH` [environment variable](../evdevkit/overview.md#environment-variables).

     ```bash
     # Windows (command prompt)
     set EV_HP_INIT_CFG_PATH=<Path to your initial HotPocket configuration file>

     # Windows (powershell)
     $env:EV_HP_INIT_CFG_PATH=<Path to your initial HotPocket configuration file>

     # Linux (bash)
     export EV_HP_INIT_CFG_PATH=<Path to your initial HotPocket configuration file>
     ```

4. Now let's override the contract section of the HotPocket configuration in the Evernode instance. This section will be identical in each HotPocket instance in the cluster as the contract configuration is synchronized within the cluster. If you do not want, you can skip this step as well. However, you can set the original `roundtime` you are intending to give for your smart contract here in the `consensus.roundtime` section.

   - Create a new json file anywhere you prefer.
   - Add the following content inside the file.
      ```json
      {
        "contract": {
          "consensus": {
            "roundtime": 2000
          }
        }
      }
      ```
   - See [HotPocket contract configuration reference](../../hotpocket/reference/configuration.md#contract) for more details.
   - Now set the json file path as `EV_HP_OVERRIDE_CFG_PATH` [environment variable](../evdevkit/overview.md#environment-variables).

     ```bash
     # Windows (command prompt)
     set EV_HP_OVERRIDE_CFG_PATH=<Path to your override HotPocket configuration file>

     # Windows (powershell)
     $env:EV_HP_OVERRIDE_CFG_PATH=<Path to your override HotPocket configuration file>

     # Linux (bash)
     export EV_HP_OVERRIDE_CFG_PATH=<Path to your override HotPocket configuration file>
     ```
5. You need to create the Preferred Hosts file that includes the host addresses to acquire instances from when creating a cluster. You can check the available hosts by using the [Community Dashboards](https://dashboard.evernode.org) or the [`list` command](../evdevkit/overview.md#advanced-usage). 

   - Create a new text file anywhere you prefer.
   - Add the Xahau address of each preferred host to the file, in a line-by-line format.
   - Example: 
      ```
      rVJhd8kTYyBMK8LmETUPA99HMhNd14D4q
      rerP15ECELmVFXVVRoz4FHy8mhxTAuyW3
      rrssGm5h8aWncB3CGMuQ2WGfexubbeCTLV
      rnzeYqWqUaXDzRcTbwLJ2MsHsc1neZkDx9
      ```

6. Now you are ready to deploy the smart contract to an Evernode cluster.
   - Let's create a 5 node cluster. Run following command to create the cluster.
     ```bash
     evdevkit cluster-create 5 $HOME/contract /usr/bin/node $HOME/hosts.txt -a index.js
     ```
   - Note:
     - `5` Is the cluster size.
     - Replace `$HOME/contract` with your contract directory path (Path to build a directory of contract binaries).
     - Replace `$HOME/hosts.txt` with your preferred hosts file path (Path to the Preferred Hosts file created in the previous step).
     - Replace `/usr/bin/node` and `index.js` with your binary path and arguments.
   - This will create an Evernode cluster in the preferred hosts and outputs the instance details.
     ```bash
     ...
     Cluster created!
     ...
     Archive finished. (location: $HOME/bundle/bundle.zip)
     ...
     Contract bundle uploaded!
     Created the 5 node cluster! [
        {
           host: 'rDKgSroMoh5Ur1EDxFZnGJXzk2MFeDg3ts',
           name: '000100008729E98B90DCE8BFE77867DBFE2FE31193169B059699D576000000DB',
           ip: 'evernode.xumm.dev',
           pubkey: 'ed0b77366a0202a1573d83ea3c18f73bda23592f190165abb9e82ee03379978014',
           contract_id: 'eb051608-c916-4f48-a8dc-a906b6e1f19d',
           peer_port: '22861',
           user_port: '8081'
        },
        {
           host: 'rKRjgkwZABgh6e38cES7aor6cLjFETkpBA',
           name: '00010000CA1FE108B76979D1557CE80B7BD8103E5942D26893E8B1C300000028',
           ip: '45.32.197.83',
           pubkey: 'ed3bd71ef91da28eb4e704ca41618a059e2effabd064c49b226d2edec6cbc5b40b',
           contract_id: 'eb051608-c916-4f48-a8dc-a906b6e1f19d',
           peer_port: '22861',
           user_port: '26201'
        },
        {
           host: 'rn49hoLXBY2AnZG4d2EvqVQGLfWaExh9eE',
           name: '000100002FDFF898274403F4C3A2256611FC885C956ACF32AACE82C400000029',
           ip: '149.28.92.171',
           pubkey: 'ed0d1f25e338cc9531130d5c590bdd118b677eec9d4796868128543aaad1ccdbdf',
           contract_id: 'eb051608-c916-4f48-a8dc-a906b6e1f19d',
           peer_port: '22861',
           user_port: '26201'
        },
        {
           host: 'rBWAXbwQSGwYg5NPmdVWsQkXTS7fdRhCXL',
           name: '00010000735AD68125616A771D288703D5335E2503B28187FA05B7E90000004E',
           ip: '79.173.139.104',
           pubkey: 'ed1f802792d9e5b4dc8b9a73d93689fb9321a993afdb8077f91611695137be87cd',
           contract_id: 'eb051608-c916-4f48-a8dc-a906b6e1f19d',
           peer_port: '22861',
           user_port: '26200'
        },
        {
           host: 'rKQyXCJGv1B3cqkpykvHYM97H2mVSqJkP9',
           name: '00010000C9FB04D9E46A6F320A4533AB0AD69DE8C15391100000099B00000000',
           ip: '172.104.131.188',
           pubkey: 'edaa2f1705f2182e49902544a2ff1433dd745185b42c4857fd7b244eace86e0da1',
           contract_id: 'eb051608-c916-4f48-a8dc-a906b6e1f19d',
           peer_port: '22861',
           user_port: '26201'
        }
     ]
     ```
   - You can specify more options (Ex: `-m` specify life moments) to the `cluster-create` command. Check the supported options using the below command.
     ```bash
     evdevkit cluster-create --help
     ```
7. At this point, you have created an Evernode cluster successfully and you have details of all the instances including public key, IP, ports, etc. Now you can test the uploaded contract by implementing a user client same as you did in [hpdevkit basic tutorial](../../hotpocket/tutorials/basics.md#create-the-client-application).
   
Next: [Deploying a Xahau transaction enabled cluster](deploy-multisig)
