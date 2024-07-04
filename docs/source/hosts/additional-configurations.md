# Additional host configurations

## Enabling IPv4 support

If you have an IPv6-only VPS and plan to add IPv4 support, you don't have to change anything from Evernode (no transfer or reinstallation needed). Simply update your DNS, as Evernode records your domain, not your IP address. You only have to point your new IP address to the existing domain name.

### Checking whether you already have IPv4 support
There are several ways to check if your VPS has IPv4 support
1. Using `ip` command:
    ```
    ip addr show
    ```
    Look for inet entries. IPv4 addresses will be in the format xxx.xxx.xxx.xxx.

1. Using `ifconfig` command:
    ```
    ifconfig
    ```
    Similar to the ip addr show command, look for inet entries.

1. Using `hostname` command:
    ```
    hostname -I
    ```
    This command will list all IP addresses assigned to the host.

### Configuring IPv4 in your VPS
You'll only have to do this if you find out that you don't have IPv4 support by running the above commands.

Most modern VPS providers offer IPv6 support due to its expanded address space. However, many applications and services still rely on IPv4. So even if they have only given you IPv6, still you'll be able to configure IPv4 from your VPS dashboard.

This depends on the VPS provider, Go to your VPS provider dashboard and search for IP settings and there you'll be able to enable IPv4. If you have trouble with this configuration, please contact your VPS service provider.

### Changing the DNS
If you have added an IPv4, then you'll have to change your DNS to your IPv4 address.
- Go to your DNS provider and find the domain you have given for your Evernode Host.
  - Check its destination IP address, Check if it's an IPv4 address. If it's IPv4, then compare it with your host's public IP which you can find [here](#checking-whether-you-already-have-ipv4-support) and you don't have to do anything they are the same.
- Otherwise edit the DNS record with your domain and change the destination to your public IPv4 address.
- Make sure not to change the Domain name in our DNS record.
- This change might take some time to affect depending on your DNS provider.