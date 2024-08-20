# Host maintenance

## Transaction costs

As mentioned in [System requirements](evernode-host.md#system-requirements), you need to keep a sufficient XAH balance in the host account to cover the transaction fees for your host. Transaction feed originates from [Heartbeat](../platform/hooks/operations.md#heartbeat) transactions sent to the hook as well as instance creation replies sent back to tenants.

## Updating the Evernode software

You can run `evernode update` to check and install updates to Evernode.

**Note: For the Evernode 0.8.2 update `evernode update` command would not show any pending updates for your Sashimono. To update to v0.8.2, run the below command. It is recommended to use the following command for an independent Evernode update.**
```
curl -fsSL https://raw.githubusercontent.com/EvernodeXRPL/evernode-test-resources/main/sashimono/installer/evernode.sh | sudo bash -s update
```

**Recovering from a Failed Update**

In the event of a failure, the secret will not be deleted and will remain at the default secret file location or the custom location you have specified. If you wish to reinstall, use the following command and transfer the registration using the same account on a separate machine. Then try re-installing on your machine.

```
curl -fsSL https://raw.githubusercontent.com/EvernodeXRPL/evernode-test-resources/main/sashimono/installer/evernode.sh | sudo bash -s transfer
```

## Purging bad actors

It cannot be avoided that some DApp instances running on your host will misbehave or perform malicious activities across the internet. They cannot harm the operation of other DApps or your Host but they can utilize your network bandwidth or may engage in unethical behavior. When you identify such DApp instances You can use `evernode list` and `evernode delete` CLI commands to purge them from your host. See [evernode CLI](evernode-cli).

## Transfer the host registration

If you need to transfer existing registration to another Xahau account or replace your host, you can use this. This is useful in several scenarios:
    - Upgrading the hardware of your host
    - Moving your registration to a different host
    - Reinstalling the host OS
    - Replacing a damaged host.
    - Transferring the ownership to a different Xahau account.

In the above cases, you can initiate an evernode transfer from your original account and then install Evernode on the new Host using the transfer information. The re-installation will not cost the regular host registration fee. It will just be a 1 Now(1*10<sup>-8</sup> EVRs)).

You can use the below command to initiate a transfer of the registration NFT.

```
evernode transfer
```

However, if you have lost access to your original host (eg. a damaged host), you can use the following command in any Linux terminal. You are required to possess the Xahau account address and secret of your original host.

```
curl -fsSL https://raw.githubusercontent.com/EvernodeXRPL/evernode-test-resources/main/sashimono/installer/evernode.sh | sudo bash -s transfer
```

## Deregister a host

```
curl -fsSL https://raw.githubusercontent.com/EvernodeXRPL/evernode-test-resources/main/sashimono/installer/evernode.sh | sudo bash -s deregister
```

**_Note: If you have already installed evernode, you cannot use the deregister command. Use `evernode uninstall` to uninstall Evernode._**

**Recovering EVRs from a failed Installation**

In the event of a failure, you can use deregister command from a separate machine where evernode is not installed to recover your EVRs. Then try re-installing on your machine.


## Diagnostics

 [Here](evernode-diagnostics.md) we have documented some solutions for some possible issues that you might come across on Installation, Update or Transfer.