# Host maintenance

## Purging bad actors

It cannot be avoided that some dapp instances running on your host will misbehave or perform malicious activities across internet. They cannot harm the operation of other dapps or your Host but they can utilize your network bandwidth or may engage in unethical behaviour. When you identify such dapp instances You can use `evernode list` and `evernode delete` cli commands to purge them from your host. See [evernode CLI](evernode-cli).

## Transfer registration

If you need to transfer existing registration to another XRPL account or replacing your host, you can use this. This is useful in several scenarios:

    - Upgrading the hardware of your host
    - Moving your registration to a different host
    - Reinstalling the host OS
    - Replacing a damaged host.
    - Transferring the ownership to a different XRPL account.

In the above cases you can initiate an evernode transfer from your original account and then install Evernode on the new Host using the transfer information. The re-installation will not cost the regular host registration fee. It will just be a 1 Now(1*10<sup>-8</sup> EVRs)).

You can use below command to initiate a transfer of the registration NFT.

 ```
 evernode transfer
 ```

However, if you have lost access to your original host (eg. damaged host), you can use the following command in any Linux terminal. You are required to possess the XRPL account address and secret of your original host.

 <!-- TODO: Update setup URL -->
 ```
 curl -fsSL https://stevernode.blob.core.windows.net/evernode-beta-v3/setup.sh | sudo bash -s transfer -i
 ```