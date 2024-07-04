# Additional host configurations

## Enabling IPv4 support

If you have IPv6-only VPS and you are going to add IPv4 support in it, You don't have to change anything from Evernode (You don't need to transfer or reinstall). You just have to change your DNS because Evernode is only recording your Domain not IP address. You just have to point your new IP address to the existing domain name.

### Checking whether you already have IPv4 support
There are several ways to check if your VPS has IPv4 support
1. Using ip command:
    ```
    ip addr show
    ```
    Look for inet entries. IPv4 addresses will be in the format xxx.xxx.xxx.xxx.

1. Using ifconfig command:
    ```
    ifconfig
    ```
    Similar to the ip addr show command, look for inet entries.

1. Using hostname command:
    ```
    hostname -I
    ```
    This command will list all IP addresses assigned to the host.

### Configuring IPv4 in your VPS
You'll only have to do this if find out that you don't have IPv4 support by running above commands.

Most modern VPS providers offer IPv6 support due to its expanded address space. However, many applications and services still rely on IPv4. So even they have only given you IPv6 still you'll be able to configure IPv6 from your VPS dashboard.

This depends on VPS provider, Go to your VPS provider dashboard and search for IP settings and there you'll be able to find how to enable IPv4.
If you can't find where to do this configuration please contact the VPS service provider.

### Changing the DNS
If you have added an IPv4, Then you'll have to change your DNS to your IPv4 address.
- Go to your DNS provider and find for the domain you have given your Host for the Evernode.
  - Check it's destination IP address, Check if it's an IPv4 address. If it's IPv4, then compare it with your host's public IP which you can find [here](#checking-whether-you-already-have-ipv4-support) and you don't have to do anything they are the same.
- Otherwise edit the DNS record with your domain and change the destination to your public IPv4 address.
- Make sure not to change the Domain name in our DNS record.
- This change might take some time to affect depending on your DNS provider.