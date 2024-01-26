# Host maintenance

## Transaction costs

As mentioned in [System requirements](evernode-host.md#in-addition-to-the-above-you-need-to-posses-following), you need to keep sufficient XAH balance in the host account to cover the transaction fees for your host. Transaction feed originate from [Heartbeat](../platform/hooks/operations.md#heartbeat) transactions sent to the hook as well as instance creation replies sent back to tenants.

## Updating the Evernode software

If you haven't enabled the auto updater, you can run `evernode update` to check and install updates to Evernode.

**Auto Updating the Evernode software**

Automatic updates are not recommended because they can fail due to their non-interactive nature. You can opt in for automatic updates with `evernode auto-update` command. The auto-update service is offered subject to the terms set out in the [Evernode Software Licence](https://raw.githubusercontent.com/EvernodeXRPL/evernode-resources/main/license/evernode-license.pdf).

**Recovering from a Failed Update**

In the event of a failure, the secret will not be deleted and will remain at the default secret file location or the custom location you have specified. If you wish to reinstall, use the following command and transfer the registration using the same account on a separate machine. Then try re-installing on your machine.

 ```
 curl -fsSL https://raw.githubusercontent.com/EvernodeXRPL/evernode-resources/main/sashimono/installer/evernode.sh | sudo bash -s transfer
 ```

## Purging bad actors

It cannot be avoided that some dapp instances running on your host will misbehave or perform malicious activities across internet. They cannot harm the operation of other dapps or your Host but they can utilize your network bandwidth or may engage in unethical behaviour. When you identify such dapp instances You can use `evernode list` and `evernode delete` cli commands to purge them from your host. See [evernode CLI](evernode-cli).

## Transfer the host registration

If you need to transfer existing registration to another Xahau account or replacing your host, you can use this. This is useful in several scenarios:

    - Upgrading the hardware of your host
    - Moving your registration to a different host
    - Reinstalling the host OS
    - Replacing a damaged host.
    - Transferring the ownership to a different Xahau account.

In the above cases you can initiate an evernode transfer from your original account and then install Evernode on the new Host using the transfer information. The re-installation will not cost the regular host registration fee. It will just be a 1 Now(1*10<sup>-8</sup> EVRs)).

You can use below command to initiate a transfer of the registration NFT.

 ```
 evernode transfer
 ```

However, if you have lost access to your original host (eg. damaged host), you can use the following command in any Linux terminal. You are required to possess the Xahau account address and secret of your original host.

 ```
 curl -fsSL https://raw.githubusercontent.com/EvernodeXRPL/evernode-resources/main/sashimono/installer/evernode.sh | sudo bash -s transfer
 ```

 ## Possible Errors

 [Here](possible-errors.md) we have documented some solutions for some possible issues that you might come through on Installation, Update or Transfer.