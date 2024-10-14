# Evernode setup for Hosts

[Evernode](https://evernode.org/) enables HotPocket smart contracts to be hosted on a global network of decentralized hosts through [XRP Hooks](https://hooks.xrpl.org/).

- Anyone can become an **Evernode host** by installing the Evernode setup on their compatible Linux server.
- Hosts register on the **Evernode registry**, a well-known Xahau account published by Evernode Labs.
- Hosts lease smart contract hosting to **Evernode tenants** in exchange for **Evers (EVR)**.

_All of the above are automated by [Sashimono](../platform/sashimono/overview), Evernode host management software which gets installed when you run the Evernode [installer](#system-requirements)._

As an Evernode host, your Linux server will be registered on the [XAHAU](https://xahau.network/) network via the Evernode [Registry hook](../platform/hooks/operations.md#registry-hook). During the installation, you can choose how much system resources you wish to allocate for smart contract hosting. After everything is set up, your server will start leasing hosting space to Evernode tenants.

### Evernode licence

Please find the Evernode license [here](https://raw.githubusercontent.com/EvernodeXRPL/evernode-resources/main/license/evernode-license.pdf).

## System requirements

To install Evernode, your server must meet the following requirements:

- Operating system: **Ubuntu 20.04 or Ubuntu 20.04** 64 bit (M1/ARM CPUs or WSL not supported. Any other Ubuntu versions are not supported.)
- [Domain name](#domain-name) for your host
- Public [email address](#email-address) to be used as the public contact method
- To be eligible to run a reputation contract on your host, you should have the following resources. Adhering to these requirements increases your chances of obtaining a good reputation:
  - Per contract instance requirements (configured during installation or by using the `evernode config resources <arguments>` command).
    - CPU: **1 Core**
    - RAM: **1 GB**
    - Swap: **1 GB**
    - Disk space: **2 GB**
  - If you are allowing three contract instances (the minimum required to be eligible for reputation) to run on your host, you should ensure your machine has the following resources. These recommendations consider both the consumption of contract instances and host software (e.g., OS, systemd, etc.).
    - CPU: **4 Cores CPU**
    - RAM: **4 GB**
    - Swap: **4 GB**
    - Disk space: **8 GB** free disk space for `/home`

#### In addition to the above, you need to possess the following:
  - At least 500 EVRs for the registration fee paid to the [registry hook](../platform/hooks/operations.md#registry-hook).
  - Sufficient XAH amount to support the reserves and ongoing transaction costs of your host
      - You need to have enough XAH reserve at the time of registration to accommodate base reserve (1 XAH), trust line (0.2 XAH), and instance lease tokens (0.2 XAH per instance). For a host with 10 instances, you will need `1 + 0.2 + 0.2*10 = 3.2 XAH`.
      - The minimum transaction cost of the host would be around 5 XAH per month but can be more depending on the leasing operations done by tenants.
      - **Example:** If you want to register a host having **10** contract instances, you need roughly **8 XAH** to accommodate initial reserves as well as to cover transaction costs for 1 month.
      - The above calculations are based on the current fees and reserve amounts set by the Xahau network.
  - Technical know-how to understand and follow the responsibilities mentioned in [Xahau accounts and secret keys](#xahau-accounts-and-secret-keys)

## Important tips for installation

### Hosting options

You can use a physical or virtual (VPS) Linux server as your Evernode host. **[WSL](https://docs.microsoft.com/en-us/windows/wsl/about) or [Containers](https://linuxcontainers.org/) are not supported**. It's recommended that you use a server that DOES NOT contain other workloads important to you. It's best if you can provision a fresh server from a cloud provider that you can dedicate to Evernode.

### IPv4 requirement

You are required to have IPv4 support in your VPS to install Evernode because all the HotPocket incoming connections are made through IPv4.

But it's optional to have IPv6 support. Having IPv6 support lets you allow IPv6 outgoing connections to the clusters hosted on your Host.

Creating dApp on an IPv6-only instance would limit the contracts from connecting to the majority of IPv4 peers, which makes the host unreliable. Due to this nature if you support only IPv6 this would cause your reputation scores to sit at a lower value or even can be '0' due to the inability to reach your peers.

If you don't have IPv4 support in your Host please follow [this guild](./additional-configurations.md#enabling-ipv4-support) to set up IPv4.

### Domain name

You must possess a domain name (eg. `myhost.myhosting.com`) which is used to reach your host. This is required for proper SSL support for communicating with smart contracts hosted in your host. Evernode uses [Let's Encrypt](https://letsencrypt.org/) for automatic free SSL setup for your domain name. Domain names that map to multiple IP addresses (round-robin DNS) should not be used.

### Email address
You must provide an email address during the installation of your host. The email address will be published on your host registration entry on the Hook which makes it **publicly visible to anyone**. It is put on display at the [Community Dashboards](https://dashboard.evernode.org/). There are two purposes for this email address:
  - It is intended to be used as a public contact email for your host so that the general public can inquire about or report issues about your host.
  - If you opt-in for [Let's Encrypt](https://letsencrypt.org/) automatic free SSL setup during the installation, this email is used for your host's SSL certificate registration with Let'sEncrypt. Let'sEncrypt will send email notifications about automatic SSL renewals periodically.

### Resource limits
- Resource limits are specified as a cumulative figure for all the instances configured on your machine.
- The minimum resource requirements per instance should be calculated as `mentioned minimum requirement / maximum instance count` to properly run the reputation contract.
- Find the `mentioned minimum requirement` at [here](#system-requirements)

### Xahau accounts and secret keys
As the [System requirements](#system-requirements) specifies, you need sufficient EVR and XAH funds to register and keep running a host. The exact account address and secret of your host will be generated inside your host during the setup. You are given the ability to send the funds you possess to the generated host account via a QR code mechanism during the setup. Any income your host earns will arrive at this account. **It is your responsibility to manage the funds in the host account and safeguard its secret key** (by default, the secret key is stored at `/home/sashimbxrpl/.evernode-host/.host-account-secret.key` on your host). If this file is lost due to any reason (operating system or software bugs, or hardware failures of the host) you will lose access to your host account including any funds in it. NO ONE can recover it. Therefore it'd be best to keep a backup copy of the secret key in your possession in a secure manner.

### Network usage and costs

Based on the smart contracts that are hosted on your server, your server will accumulate network usage while it's operating. We recommend you monitor the network usage or set upper limits to avoid unpredictable costs based on your infrastructure provider pricing plans. It's also possible that your host may be hosting misbehaving and ill-intentioned DApps. You have the authority to purge bad actors using the [evernode cli](evernode-cli).

### Firewalls and ports

Evernode software itself does not require any ports to be opened. However, SSL setup and hosted smart contracts require the following conditions to be met. Please note that Evernode automatically adds the required allow-rules for these ports to the operating system firewall. But if your host is behind an external firewall, you need to allow incoming TCP traffic for peer, user, general purpose TCP ports and UDP traffic for general purpose UDP ports yourself.
- **User and Peer ports:** The smart contracts that are getting hosted on your host require certain ports to be opened and incoming traffic to be allowed. There are two port ranges for peer and user connections which by default start at 26201 and 22861. If your host supports `n` contract instances, the port ranges to allow would be `26201 to 26201+n` and `22861 to 22861+n`.
- **General purpose ports:** Evernode instances additionally allocate another two port ranges for general purpose TCP and UDP connections (2 TCP and 2 UDP per instance). This requires these ports to be opened and incoming traffic to be allowed. There are port ranges that by default start at 36525 and 39064. If your host supports `n` contract instances, the port ranges to allow would be `36525 to 36525+2n` and `39064 to 39064+2n`.
- Evernode's automatic SSL setup requires port 80 to be free and incoming traffic to be allowed to it. Without this, the initial SSL setup and subsequent SSL renewals will fail. (If you are running a web server like Apache or Nginx on the same host, they will cause the SSL setup to fail. You can stop them or configure them to not use port 80 to overcome this problem.)

### Creating Lease Offers

After the installation, the `offerlease` command should be used to invoke the offer creation process. If the lease offer failed in the middle. Executing this command will only offer the remaining leases. See [evernode CLI](evernode-cli).

_**NOTE:** Heartbeats won't be sent until all the leases are offered._

## Evernode Versions
As you can [install Evernode](#installation) on Ubuntu 20.04 and Ubuntu 24.04, There are two Evernode versions maintained to support the requirements by the OS. You are allowed only to install the respective **Evernode version** on respective **Ubuntu version**. The installers for two versions will also be different. The updates and patches will be given continuously for the both versions.

***The version number can be identified by it's first digit as follows***
- **Ubuntu 20.04** - `v0.x.x`
- **Ubuntu 24.04** - `v1.x.x`

## Installation

Make sure you read the above sections before installing. Run the following command to install Evernode on your Linux server. You need root (sudo) access for this.

**Read the above [System requirements](#system-requirements) and [Important tips](#important-tips-for-installation). There are two installer versions available for Ubuntu 20.04 and Ubuntu 24.04. Pick the installer according to your Ubuntu version on your host machine**

***Ubuntu 20.04***
```
curl -fsSL https://raw.githubusercontent.com/EvernodeXRPL/evernode-resources/main/sashimono/installer/evernode.sh | sudo bash -s install
```

***Ubuntu 24.04***
```
curl -fsSL https://raw.githubusercontent.com/EvernodeXRPL/evernode-24-resources/main/sashimono/installer/evernode.sh | sudo bash -s install
```

## Host machine OS Upgrade/Downgrade
If you are planing to do upgrade or downgrade your host machine OS, you should take [these](./maintenance.md#host-machine-os-upgradedowngrade) action for smooth transition of Evernode.

## Host Reputation
- **Reputation Management:** Host reputation is dynamically adjusted based on specified guidelines, ensuring fairness and reliability within the Evernode network.
- **Reputation Assessment Process:** The host must undergo a specific process to prove its active participation and earn rewards accordingly. The following link provides a detailed explanation of this process. However, it is not yet fully integrated into the Evernode Reward system. Once the model is stable, we will proceed with the integration.

  - [Checkout Evernode Reputation Assessment](evernode-host-reputationd)
- **Reward Eligibility:** Hosts with a reputation of 0 are not eligible for rewards in upcoming moments, incentivizing adherence to network standards.
- **Reputation deduction criteria:** Your reputation will be reset to 0, if any of the following conditions are met.

  - Instance Count
    - If your host has a capacity of fewer than 3 instances. This means that the number of instances your host machine can support must be at least 3 to maintain a positive reputation.

  - Lease Amount
    - If your lease fee is more than 110% of the average reward distribution per host. This is calculated using the formula: `(current reward distribution / total number of hosts) * 110%`. If your lease fee exceeds this amount, your reputation will be set to 0.

**NOTES:** You won't be able to install a new host if your machine is from one of the **Sanctioned Entities** mentioned in the [Evernode license](https://raw.githubusercontent.com/EvernodeXRPL/evernode-resources/main/license/evernode-license.pdf).

Ensure that your instance capacity and lease fees meet these criteria to maintain a positive reputation.

## Maintaining your host

Once Evernode is installed and lease offers are created using `sudo evernode offerlease`, Evernode will automatically use your server to fulfill leasing requests from Evernode tenants. You will earn Evers (EVR) as tenants lease hosting. You are responsible for [managing the funds](maintenance.md#transaction-costs) in your host account.

For monitoring and maintenance, see [maintenance tips](maintenance).

At any time, you can uninstall and deregister from Evernode with `sudo evernode uninstall`. If you deregister, you will only receive half of the registration fee you paid at the registration. Also, make sure you safeguard the [secret key file](#xahau-accounts-and-secret-keys) before uninstalling.

## Host configurations
You can change your host's configurations using [Evernode CLI](evernode-cli.md)

### Important optional configs
- Affordable extra transaction fee
  - This represents how much more you are willing to pay extra as the transaction fee.
    - If you specify this as 10000 drops and the base fee is 2000 drops. Your fee will be maxed out at 12000 drop in case of network congestion.
    - Basically, it'll try incrementing the fee up to 12000 drops and won't go beyond that.
  - It'll start at a base fee and gets incremented in 10% of the value you have specified as an extra fee.
- Fallback servers
  - This represents the xahaud servers to fallback the connection when the primary server you have specified is unusable.
  - You can specify a list of servers that get randomly picked for the fallback connection.

## Governance game

The Governance game allows eligible participants in the Evernode host network to propose and vote on the [Evernode Hook](../platform/hooks/overview) changes. These proposals will get accepted or purged according to a predetermined rule-set on received votes. See [governance game](../platform/hooks/governance-game).

## Diagnostics

 [Here](evernode-diagnostics.md) we have documented some solutions for some possible issues that you might come across on Installation, Update or Transfer.
 
## Reporting issues

Please report any issues and error logs [here](https://github.com/EvernodeXRPL/evernode-host/issues). Please not that when you are creating issues please label it with the Ubuntu version you are running (`Ubuntu 20.04` or `Ubuntu 24.04`).

## Global hosts dashboards

The Evernode community maintains dashboards containing all registered Evernode hosts. You can access them at [dashboard.evernode.org](https://dashboard.evernode.org/).

## Evernode testnet

_You can contribute to the Evernode testnet and become a [testnet host](evernode-testnet-host.md)._
