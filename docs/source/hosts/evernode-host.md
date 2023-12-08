# Evernode setup for Hosts

[Evernode](https://evernode.org/) enables HotPocket smart contracts to be hosted on a global network of decentralized hosts through [XRP Hooks](https://hooks.xrpl.org/).

- Anyone can become an **Evernode host** by installing the Evernode setup on their compatible Linux server.
- Hosts register on the **Evernode registry**, a well-known XRPL account published by Evernode foundation.
- Hosts lease smart contract hosting to **Evernode tenants** in exchange for **Evers (EVR)**.

_All of the above are automated by [Sashimono](../platform/sashimono/overview), Evernode host management software which gets installed when you run the Evernode [installer](#system-requirements)._

## Evernode

We are inviting interested enthusiasts to register as an Evernode host. As an Evernode host, your Linux server will be registered on the [XAHAU](https://xahau.network/). During the installation, you can choose how much system resources you wish to allocate for smart contract hosting. After everything is setup, your server will start leasing hosting space to Evernode tenants.

### Evernode licence

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to use the software for, or in connection, with the Evernode network for the duration of the beta test.

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS IN BETA AND PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

### Airdrops

Evernode Foundation may, in its absolute discretion, airdrop a portion of its Evers to people who participate in the beta. But the details of any such airdrop are not confirmed. The Foundation reserve the right to, at anytime and without notice, amend the details of any airdrop, include or exclude people or classes of people, or abandon the airdrop entirely. You should participate in the beta because you want to help the Evernode Network succeed, not because you want an airdrop of Evers.

## System requirements

To install Evernode, you server must meet following requirements:

- Operating system: **Ubuntu 20.04** 64 bit (M1/ARM CPUs not supported. Any other Ubuntu versions are not supported.)
- RAM: **2 GB** minimum
- Swap: **2 GB** minimum
- Disk space: **4 GB** minimum free disk space for `/home`
- [Domain name](#domain-name) for your host
- Public [email address](#email-address) to be used as the public contact method
- Existing XAHAU account with an EVR balance greater than 500

## Important tips for installation

### Hosting options

You can use a phyisical or virtual (VPS) Linux server as your Evernode host. **[WSL](https://docs.microsoft.com/en-us/windows/wsl/about) or [Containers](https://linuxcontainers.org/) are not supported**. It's recommended that you use a server which DOES NOT contain other workloads important to you. It's best if you can provision a fresh VPS from a cloud provider which you can dedicate for Evernode and dispose of easily when no longer required.

### Domain name

You must posses a domain name (eg. `myhost.myhosting.com`) which is used to reach your host. This is required for proper SSL support for communicating with smart contracts hosted in your host. Evernode uses [Let's Encrypt](https://letsencrypt.org/) for automatic free SSL setup for your domain name. Domain names which map to multiple IP addresses (round-robin DNS) should not be used.

### Email address
You must provide an email address during the installation of your host. The email address will be published on your host registration entry on the Hook which makes it **publicly visible to anyone**. It is put on display at the [dashboard](https://dashboard.evernode.org/) page for your host. There are two purposes of this email address:
  - It is is intended to be used as a public contact email for your host so that the general public can inquire or report issues about your host.
  - If you opt-in for [Let's Encrypt](https://letsencrypt.org/) automatic free SSL setup during the installation, this email is used for your host's SSL certificate registration with Let'sEncrypt. Let'sEncrypt will send email notifications about automatic SSL renewals periodically.

### Network usage and costs

Based on the smart contracts that are hosted on your server, you server will accumulate network usage while its operating. During the beta, we predict that this will be well within the basic data transfer allowances of most cloud VPS providers (less than 500 GB per month). However, we recommend you to monitor the network usage or set upper limits to avoid unpredictable costs. It's possible that your host maybe hosting misbheaving and ill-intentioned dapps. You have the authority to purge bad actors using the [evernode cli](evernode-cli).

### Firewalls and ports

Evernode software itself does not require any ports to be opened. However SSL setup and hosted smart contracts requires following conditions to be met. Please note that Evernode automatically adds the required allow-rules for these ports to the operating system firewall. But if your host is behind an external firewall, you need to allow incoming TCP traffic to them yourself.

- The smart contracts that are getting hosted on your host require certain ports to be opened and incoming traffic be allowed. There are two port ranges which by default starts at 26201 and 22861. If your host supports `n` contract instances, the port ranges to allow would be `26201 to 26201+n` and `22861 to 22861+n`.
- Evernode's automatic SSL setup requires port 80 to be free and incoming traffic be allowed to it. Without this, the initial SSL setup and subsequent SSL renewals will fail. (If you are running a web server like Apache or nginx on the same host, they will cause SSL setup to fail. You can stop them or either configure them to not to use port 80 to overcome this problem.)

## Installation

Make sure you read the information above before installing. Run the following command to install Evernode on your Linux server. You need root (sudo) access for this.

 <!-- TODO: Update setup URL -->
```
curl -fsSL https://stevernode.blob.core.windows.net/evernode-beta-v3/setup.sh | sudo bash -s install
```

## Maintaining your host

Once Evernode is installed, you don't need to do anything else for the basic operation of your host. Evernode will automatically use your server to fullfil leasing requests from Evernode tenants. You will earn Evers (EVR) as tenants lease hosting.

For monitoring and maintenance, see [maintenance tips](maintenance).

At any time, you can uninstall and deregister from Evernode with `sudo evernode uninstall`.

## Governance game

Governance game allows eligible participants in the Evernode host network to propose and vote on the [Evernode Hook](../platform/hooks/overview) changes. These proposals will get accepted or purged according to a predetermined rule-set on received votes. See [governance game](../platform/hooks/governance-game).

## Reporting issues

Please report any issues and error logs [here](https://github.com/EvernodeXRPL/evernode-host/issues).

## Global hosts dashboard

We maintain a dashboard containing all registered Evernode hosts. You can access it at [dashboard.evernode.org](https://dashboard.evernode.org/) ([source code](https://github.com/EvernodeXRPL/evernode-dashboard)).

## Evernode testnet

_You can contribute to the Evernode testnet and become a [testnet host](evernode-testnet-host.md)._
