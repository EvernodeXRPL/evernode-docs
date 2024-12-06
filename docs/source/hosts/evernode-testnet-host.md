## Evernode Testnet

As an Evernode testnet host, your Linux server will be registered on the [XRPL Hooks v3 testnet](https://hooks-testnet-v3.xrpl-labs.com/). **Same rules and requirements as [mainnet](evernode-host.md) applies for the testnet hosts as well**

> **Testnet warning:** Since Evernode testnet uses [XRPL Hooks v3 testnet](https://hooks-testnet-v3.xrpl-labs.com/), it is subjected to any changes/downtime imposed by the hooks testnet.

## Installation

Make sure you read the information above before installing. Run the following command to install Evernode testnet on your Linux server. You need root (sudo) access for this.

***Ubuntu 20.04***
```
curl -fsSL https://raw.githubusercontent.com/EvernodeXRPL/evernode-resources/main/sashimono/installer/evernode.sh | sudo NETWORK=testnet bash -s install
```

***Ubuntu 24.04***
```
curl -fsSL https://raw.githubusercontent.com/EvernodeXRPL/evernode-24-resources/main/sashimono/installer/evernode.sh | sudo NETWORK=testnet bash -s install
```