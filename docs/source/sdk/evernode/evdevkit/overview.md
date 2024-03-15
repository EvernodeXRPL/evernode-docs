# Evernode developer kit
Evernode uses HotPocket as its DApp engine. Once you have developed a HotPocket DApp on your PC, you can deploy it to the Evernode using Evernode developer kit.

## Installation

### Prerequisites
Evernode developer kit requires you to install [NodeJs](https://nodejs.org/en/) on your development machine.

### Supports cross platform
This is an npm global package that supports both Linux and Windows
1. Install [prerequisites](#prerequisites).
2. Run the following command to install `evdevkit` on your machine.
    ```
    npm i evdevkit -g
    ```

_**NOTE:** In Linux platforms, installation requires root privileges. Hence, add `sudo` to the above command._

## Listing active hosts

You can use the `evdevkit list` command to list active hosts from Evernode.
```
evdevkit list
```

This command supports following options for sorting and filtering the output.

| Name      | Description                       |
| -------------------------- | ---------------------------------- |
| `-l, --limit [limit]`       | List limit                         |
|  `-o, --order-by [order-by]` | Order by key                       |
| `-d, --desc [desc] `        | Order by descending manner          |
| `-p, --props [props] `      | Comma separated properties to show |

## Acquiring instance from Evernode
You can use the Evernode developer kit to acquire instances from Evernode. This will create you a fresh Evernode instance where you can deploy your DApps.
- You are required to set `EV_TENANT_SECRET` and `EV_USER_PRIVATE_KEY` [environment variables](#environment-variables) before acquiring the instance.
- To override configurations of Evernode instance's You can create a [HotPocket configuration](../../hotpocket/reference/configuration.md) file and set its path as `EV_HP_INIT_CFG_PATH` [environment variable](#environment-variables).
- You can set `EV_NETWORK` "(mainnet|testnet)" to override the Evernode network used for instance creation, Otherwise defaults to "mainnet".
- The following command will create an instance in the given host. Given configurations will be populated if `EV_HP_INIT_CFG_PATH` is given.
```
evdevkit acquire <host Xahau address>
```
- This will return the acquired instance details.

## Deploying a contract to Evernode
You can deploy your already implemented [DApp](../../../platform/hotpocket/overview.md#dapp) to the acquired Evernode instance.

### Creating the deployable contract package
You can package your contract using evdevkit.
- To override Evernode instance's configurations when you are deploying (Note: Currently this supports only `contract` and `mesh.known_peers` sections). You can create a [Contract configuration](../../hotpocket/reference/configuration.md#contract) file and set its path as `EV_HP_OVERRIDE_CFG_PATH` [environment variable](#environment-variables).
```
# evdevkit bundle <path to contract directory> <public key of the instance> <contract binary> -a <contract binary arguments>
evdevkit bundle $HOME/contract ed060a4aae0ec9183e4869e1490e908c9a9a3fd72816021c823ecd7d052e6e02d2 /usr/bin/node -a index.js
```
- This will return the path to the created contract bundle.

### Uploading a contract to Evernode
You can upload your contract bundle to the Evernode instance
- You are required to set `EV_USER_PRIVATE_KEY` [environment variable](#environment-variables) before uploading the contract.
```
# evdevkit deploy <path to contract bundle> <IP of the instance> <User port of the instance>
evdevkit deploy $HOME/bundle/bundle.zip 45.76.238.97 26201
```

### Changing tenant info
In order to change the tenant info you need to override the [environment variables](#environment-variables):
1. Set the environment variables.
    ```
    # Windows (command prompt)
    set EV_TENANT_SECRET=snmyH19JLWVaUJKtM4cNxTT6t38eA
    set EV_USER_PRIVATE_KEY=ed7b78ba4ffc9b7a55e427ff1ddb799ab1af59c6a9ab92e5f227815b04ab70e346831653e22c8293afac43694879c4083e1d7581b4326fcba423e3392e068028fe

    # Windows (powershell)
    $env:EV_TENANT_SECRET=snmyH19JLWVaUJKtM4cNxTT6t38eA
    $env:EV_USER_PRIVATE_KEY=ed7b78ba4ffc9b7a55e427ff1ddb799ab1af59c6a9ab92e5f227815b04ab70e346831653e22c8293afac43694879c4083e1d7581b4326fcba423e3392e068028fe

    # Linux (bash)
    export EV_TENANT_SECRET=snmyH19JLWVaUJKtM4cNxTT6t38eA
    export EV_USER_PRIVATE_KEY=ed7b78ba4ffc9b7a55e427ff1ddb799ab1af59c6a9ab92e5f227815b04ab70e346831653e22c8293afac43694879c4083e1d7581b4326fcba423e3392e068028fe
    ```
3. Now if you [acquire](#acquiring-instance-from-evernode) instance, An instance will be created using the from the new tenant.

## Deploying a contract to an Evernode cluster

Execute the following command to create an Evernode cluster. 

_**NOTE:** If the cluster creation process fails during execution, re-executing the same command will resume from the point of failure._

 ```
evdevkit cluster-create <cluster-size > <path-to-contract-directory> <contract-binary> <preferred-hosts-file-path>
 ```


`evdevkit cluster-create` Arguments:

| Name                      | Description                                                                           |
| ------------------------- | --------------------------------------------------------------------------            |
| cluster-size              | Size of the cluster.                                                                  |
| path-to-contract-directory| Absolute path to the contract directory to be bundled.                                |
| contract-binary           | Contract binary name                                                                  |
| preferred-hosts-file-path | File path of preferred host account list (in line-by-line format)                     |

`evdevkit cluster-create`  Options:



|Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Description|
|---------------------------|-----------------------------------------------------------------------------------------------------------|
|  `-a, --contract-args`     | Contract binary arguments                                                                                 |
| `-m, --moments`           | Life moments                                                                                              |
| `-c, --contract-id`       | Contract id                                                                                               |
| `-i, --image`             | Instance image                                                                                            |
| `-l, --life-plan`         | Organize cluster node lifespans using stat (static - default), rand (random), or inc (incremental) modes. |
| `--min-life`              | Minimum moment count to consider in randomized node life planning.                                        |
| `--max-life`              | Maximum moment count to consider in randomized node life planning.                                        |
| `--life-gap`              | Life gap in moments in incremental node life planning.                                                    |
| `--signer-count`          | Number of signers for a cluster with multiple signer nodes                                                |
| `--signers`               | JSON file path of signer details                                                                          |
| `--signer-life`           | Life moments for the signers                                                                              |
| `--signer-quorum`         | Quorum of the cluster with multiple signer nodes (within the valid range (0,1])                           |
| `-e, --evr-limit`         | Maximum amount of EVRs to be spent on instance acquisitions                                               |
|  `-h, --help`              | Display help for command                                                                                  |

An example HotPocket configuration for the instance creation:
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

An example HotPocket configuration for the contract bundle upload:
```json
{
    "contract": {
        "consensus": {
            "roundtime": 2000
        }
    }
}
```

_See [HotPocket configuration reference](../../hotpocket/reference/configuration.md) for more details._

## Extending the lease time of acquired instances

You can use the `evdevkit extend` command to extend the leases of specific instances.

 ```
evdevkit extend <instance-file-path>
 ```
- The `<instance-file-path>` parameter should point to a file containing instances in a line-by-line format:<br>
`<host-address>:<instance-name>:<moments>`
    - _Note: The `<moments>` field is optional and can be used to specify the duration of the extension._
- Additionally, `-m, --moments [moments]` flag can be used to define moment size to be extended. This will be overriden by  any `<moments>` properties defined in the instance file if they are present.



## Auditing hosts

You can use the Evernode developer kit to audit hosts. Auditing involves checking the instance acquisition, read request response and bootstrap status of hosts based on host addresses provided. A resultant matrix is generated at the end of an audit which consists of the audit status, bootstrap status, and response durations for each of the audited hosts.

- You are required to set `EV_TENANT_SECRET` and `EV_USER_PRIVATE_KEY` [environment variables](#environment-variables) before conducting an audit.

_**NOTE:**_ An amount of EVRs equal to the lease amount of the host will be spent from the provided tenant account when conducting an audit. 

### Auditing multiple hosts

When auditing multiple hosts, you can use a text file containing a line-separated list of host Xahau addresses to define the hosts to be audited. The following command can be used to conduct an audit using an input file.

```
evdevkit audit -f <path to audit input file>
```

### Auditing a single host

When auditing a single host, you can use the following command to define the host address to be audited directly.
```
evdevkit audit -h <host Xahau address>
```

## Environment variables
`evdevkit` CLI supports the following environment variables:

| Name                    | Description                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| EV_TENANT_SECRET        | Tenant Xahau account secret.                                                              |
| EV_USER_PRIVATE_KEY     | Private key of the contract client (Can be generated using "evdevkit keygen").           |
| EV_HP_INIT_CFG_PATH     | (Optional) File path of the HotPocket configuration for the instance creation.           |
| EV_HP_OVERRIDE_CFG_PATH | (Optional) File path of the HotPocket configuration for the contract bundle upload.      |
| EV_NETWORK              | (Optional) Evernode network to be used `(mainnet\|testnet)`. Default would be `mainnet`. |

## Advanced usage

### Acquire and Deploy

The `evdevkit acquire-and-deploy` command is used to execute [acquire](#acquiring-instance-from-evernode), [bundle](#creating-the-deployable-contract-package) and [deploy](#uploading-a-contract-to-evernode) processes together. The arguments and options used in this command is similar to the ones used in [`evdevkit acquire`](#acquiring-instance-from-evernode) and [`evdevkit deploy`](#uploading-a-contract-to-evernode) commands.
```
evdevkit acquire-and-deploy <path to contract directory> <contract binary> <host-xahau-address> -a <contract binary arguments>
```

### View host info

The `evdevkit host` command is used to retireve configuration information on a specific host. 
```
evdevkit host <host-xahau-address>
```
### Generate user key pair

The `evdevkit keygen` command is used to generate user key pairs for HotPocket. Generated private keys can be used to set the [`EV_USER_PRIVATE_KEY`](#environment-variables) environment variable for future operations.

```
evdevkit keygen
```

## Updates
Run following command to update `evdevkit` to the latest version:
```
npm update evdevkit -g
```

## Uninstall
Run the following command to uninstall `evdevkit`:

```
npm uninstall evdevkit -g
```

_**NOTE:** In Linux platforms, you will need root privileges to execute updates and uninstallations. Hence, add `sudo` to the above commands._

## Reporting issues
Report issues [here](https://github.com/EvernodeXRPL/evernode-sdk/issues).