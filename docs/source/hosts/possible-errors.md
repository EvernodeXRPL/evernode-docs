# Possible Errors

If you have encountered any issues while installing Evernode, Check if your error is one of the following. If not, Please create an issue [here](https://github.com/EvernodeXRPL/evernode-host/issues).

## Error 1: REG_FAILURE, Host is not registered
- Check if there's an existing URI token offer created for your account from Evernode registry account. _(You can check this either from the Xahau explorer by querying for the registry account or from Xaman wallet)_
  - If there's such token offer, then your token has been minted but it's failed to claim.
  - So you have to claim your token and then transfer and re install Evernode.
  - You can try either of following solutions to regain your Host.
    - https://github.com/EvernodeXRPL/evernode-host/issues/180#issuecomment-1902611178
    - https://github.com/EvernodeXRPL/evernode-host/issues/144#issuecomment-1898322923
      
- If there's no such token offer, Check whether there's an existing URI token in your account which is issued by Evernode registry account. _(You can check this from the Xahau explorer by querying for your host account or from Xaman wallet)_
  - If you find such token then you are successfully registered with Evernode.
  - So you have to repair your installation by transferring your registration and then re installing.
  - You can find how to transfer your host from [here](maintenance.md#transfer-the-host-registration).
      
## Error 2: Transfer failure
  - If you have transferred your account and failed while re installing Evernode, [Error 1](#error-1-reg_failure-not-registered) instructions are valid in this situation too. So, please go through them and check whether it has the solution for your issue.
      
## Error 3: Evernode update failure
  - If you failed in either manual `evernode update` command or Evernode automatic update.
  - **Do not deregister or uninstall.** Even if your update failed your registration with Evernode will remain intact.
  - In this case you can transfer your previous registration and re install.
  - You can find how to transfer your host from [here](maintenance.md#transfer-the-host-registration).
  
## Error 4: Already registered
  - This means your account is registered on Evernode. **Do not deregister or uninstall.** 
  - So now what you have to do is do a transfer and re install.
  - You can find how to transfer your host from [here](maintenance.md#transfer-the-host-registration).
    
## Error 5: Stuck installation
  - If your installation is stuck on `Checking server wss:\\....` this could indicate you have some broken package dependencies.
  - Try removing `rm -r /tmp/evernode-setup-helpers` and install Evernode again.