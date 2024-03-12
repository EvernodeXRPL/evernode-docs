# Provisioning of DApps

Sashimono manages the resource allocation and destruction of HotPocket DApp instances requested by tenants. Other than that, the smart contracts run independently of Sashimono (and of each other). They also make use of independent WebSocket channels to communicate with their clients.

1. Sashimono runs HotPocket DApps as rootless Docker containers. This enables DApp instances to be isolated from the host and also from each other. Read more on smart contract container architecture [here](http://blog.geveo.com/Sashimono-Designing-a-multi-tenant-dApp-hosting-platform).
2. Each contract instance gets allocated a Linux user account (named with 'sashi' prefix), 2 TCP ports, and hardware resource quotas for CPU, Disk, and Memory. Use the `evernode list` command to get instance information.
3. All data relating to a contract instance is kept within the instance user's home directory.
4. Each instance uses the 2 TCP ports that Sashimono assigns for **WebSocket** communication.
   - Peer port is used to communicate with other instances of the same contract cluster. These other instances would most probably be hosted on other hosts.
   - User port is used by the contract's users to communicate with the contract.
   - Both ports must support incoming connections, hence they should be allowed through any firewalls you may have (Sashimono automatically manages the operating system default firewall for you).
5. Upon lease expiry, Sashimono deletes all data and resources allocated to the corresponding smart contract instance.
