# Evernode setup for Hosts

[Evernode](https://evernode.org/) enables HotPocket smart contracts to be hosted on a global network of decentralized hosts through [XRP Hooks](https://hooks.xrpl.org/).

- Anyone can become an **Evernode host** by installing the Evernode setup on their compatible Linux server.
- Hosts register on the **Evernode registry**, a well-known Xahau account published by Evernode Labs.
- Hosts lease smart contract hosting to **Evernode tenants** in exchange for **Evers (EVR)**.

_All of the above are automated by [Sashimono](../platform/sashimono/overview), Evernode host management software which gets installed when you run the Evernode [installer](#system-requirements)._

As an Evernode host, your Linux server will be registered on the [XAHAU](https://xahau.network/) network via the Evernode [Registry hook](../platform/hooks/operations.md#registry-hook). During the installation, you can choose how much system resources you wish to allocate for smart contract hosting. After everything is setup, your server will start leasing hosting space to Evernode tenants.

### Evernode licence

Please find the Evernode license [here](https://raw.githubusercontent.com/EvernodeXRPL/evernode-test-resources/main/license/evernode-license.pdf).

## System requirements

To install Evernode, your server must meet the following requirements:

- Operating system: **Ubuntu 20.04** 64 bit (M1/ARM CPUs or WSL not supported. Any other Ubuntu versions are not supported.)
- RAM: **2 GB** minimum
- Swap: **2 GB** minimum
- Disk space: **4 GB** minimum free disk space for `/home`
- [Domain name](#domain-name) for your host
- Public [email address](#email-address) to be used as the public contact method

#### In addition to the above, you need to possess the following:
  - At least 500 EVRs for the registration fee paid to the [registry hook](../platform/hooks/operations.md#registry-hook).
  - Sufficient XAH amount to support the reserves and ongoing transaction costs of your host
      - You need to have enough XAH reserve at the time of registration to accommodate base reserve (1 XAH), trust line (0.2 XAH) and instance lease tokens (0.2 XAH per instance). For a host with 10 instances, you will need `1 + 0.2 + 0.2*10 = 3.2 XAH`.
      - The minimum transaction cost of the host would be around 5 XAH per month but can be more depending on the leasing operations done by tenants.
      - **Example:** If you want to register a host having **10** contract instances, you need roughly **8 XAH** to accommodate initial reserves as well as to cover transaction costs for 1 month.
      - The above calculations are based on the current fees and reserve amounts set by the Xahau network.
  - Technical know-how to understand and follow the responsibilities mentioned in [Xahau accounts and secret keys](#xahau-accounts-and-secret-keys)

## Important tips for installation

### Hosting options

You can use a physical or virtual (VPS) Linux server as your Evernode host. **[WSL](https://docs.microsoft.com/en-us/windows/wsl/about) or [Containers](https://linuxcontainers.org/) are not supported**. It's recommended that you use a server that DOES NOT contain other workloads important to you. It's best if you can provision a fresh server from a cloud provider that you can dedicate to Evernode.

### Domain name

You must possess a domain name (eg. `myhost.myhosting.com`) which is used to reach your host. This is required for proper SSL support for communicating with smart contracts hosted in your host. Evernode uses [Let's Encrypt](https://letsencrypt.org/) for automatic free SSL setup for your domain name. Domain names that map to multiple IP addresses (round-robin DNS) should not be used.

### Email address
You must provide an email address during the installation of your host. The email address will be published on your host registration entry on the Hook which makes it **publicly visible to anyone**. It is put on display at the [dashboard](https://dashboard.evernode.org/) page for your host. There are two purposes for this email address:
  - It is intended to be used as a public contact email for your host so that the general public can inquire about or report issues about your host.
  - If you opt-in for [Let's Encrypt](https://letsencrypt.org/) automatic free SSL setup during the installation, this email is used for your host's SSL certificate registration with Let'sEncrypt. Let'sEncrypt will send email notifications about automatic SSL renewals periodically.

### Xahau accounts and secret keys
As the [System requirements](#system-requirements) specifies, you need sufficient EVR and XAH funds to register and keep running a host. The exact account address and secret of your host will be generated inside your host during the setup. You are given the ability to send the funds you possess to the generated host account via a QR code mechanism during the setup. Any income your host earns will arrive at this account. **It is your responsibility to manage the funds in the host account and safeguard its secret key** (by default, the secret key is stored at `/home/sashimbxrpl/.evernode-host/.host-account-secret.key` on your host). If this file is lost due to any reason (operating system or software bugs, or hardware failures of the host) you will lose access to your host account including any funds in it. NO ONE can recover it. Therefore it'd be best to keep a backup copy of the secret key in your possession in a secure manner.

### Network usage and costs

Based on the smart contracts that are hosted on your server, your server will accumulate network usage while it's operating. We recommend you monitor the network usage or set upper limits to avoid unpredictable costs based on your infrastructure provider pricing plans. It's also possible that your host may be hosting misbehaving and ill-intentioned dapps. You have the authority to purge bad actors using the [evernode cli](evernode-cli).

### Firewalls and ports

Evernode software itself does not require any ports to be opened. However SSL setup and hosted smart contracts require the following conditions to be met. Please note that Evernode automatically adds the required allow-rules for these ports to the operating system firewall. But if your host is behind an external firewall, you need to allow incoming TCP traffic to them yourself.

- The smart contracts that are getting hosted on your host require certain ports to be opened and incoming traffic to be allowed. There are two port ranges which by default start at 26201 and 22861. If your host supports `n` contract instances, the port ranges to allow would be `26201 to 26201+n` and `22861 to 22861+n`.
- Evernode's automatic SSL setup requires port 80 to be free and incoming traffic to be allowed to it. Without this, the initial SSL setup and subsequent SSL renewals will fail. (If you are running a web server like Apache or nginx on the same host, they will cause the SSL setup to fail. You can stop them or configure them to not use port 80 to overcome this problem.)

### Creating Lease Offers

After the installation, the `offerlease` command should be used to invoke the offer creation process. If the lease offer failed in the middle. Executing this command will only offer the remaining leases. See [evernode CLI](evernode-cli).

_**NOTE:** Heartbeats won't be sent until all the leases are offered._

## Installation

Make sure you read the above sections before installing. Run the following command to install Evernode on your Linux server. You need root (sudo) access for this.

**Read the above [System requirements](#system-requirements) and [Important tips](#important-tips-for-installation) even if you think you're familiar with the beta setup. Some details have changed compared to the beta.**

```
curl -fsSL https://raw.githubusercontent.com/EvernodeXRPL/evernode-test-resources/main/sashimono/installer/evernode.sh | sudo bash -s install
```

## Host Reputation
- **Reputation Management:** Host reputation is dynamically adjusted based on specified guidelines, ensuring fairness and reliability within the Evernode network.
- **Reward Eligibility:** Hosts with a reputation of 0 are not eligible for rewards in upcoming moments, incentivizing adherence to network standards.
- **Reputation guidelines are rolled out in Sashimono v0.8.2**
- **Your reputation will be set to 0 based on:**
  - Instance Count
    - Once version 0.8.2 is rolled out, If your host has a capacity of less than 3 instances.
  - Sanctioned Entities
    - Once version 0.8.2 is rolled out, You won't be able to update your host or install a new host if your machine is from one of the **Sanctioned Entities** mentioned in [Evernode license](https://raw.githubusercontent.com/EvernodeXRPL/evernode-test-resources/main/license/evernode-license.pdf)
  - Lease Amount
    - Once version 0.8.2 is rolled out, If your lease fee is more than `reward distribution for the moment / host count * 110%`.
  - Version Upgrade
    - If you haven't updated to version 0.8.2 within **one week**

## Maintaining your host

Once Evernode is installed and lease offers are created using `sudo evernode offerlease`, Evernode will automatically use your server to fulfill leasing requests from Evernode tenants. You will earn Evers (EVR) as tenants lease hosting. You are responsible for [managing the funds](maintenance.md#transaction-costs) in your host account.

For monitoring and maintenance, see [maintenance tips](maintenance).

At any time, you can uninstall and deregister from Evernode with `sudo evernode uninstall`. If you deregister, you will only receive half of the registration fee you paid at the registration. Also, make sure you safeguard the [secret key file](#xahau-accounts-and-secret-keys) before uninstalling.

## Governance game

The Governance game allows eligible participants in the Evernode host network to propose and vote on the [Evernode Hook](../platform/hooks/overview) changes. These proposals will get accepted or purged according to a predetermined rule-set on received votes. See [governance game](../platform/hooks/governance-game).

## Reporting issues

Please report any issues and error logs [here](https://github.com/EvernodeXRPL/evernode-host/issues).

## Global hosts dashboard

We maintain a dashboard containing all registered Evernode hosts. You can access it at [dashboard.evernode.org](https://dashboard.evernode.org/) ([source code](https://github.com/EvernodeXRPL/evernode-dashboard)).

## Evernode testnet

_You can contribute to the Evernode testnet and become a [testnet host](evernode-testnet-host.md)._
