# Diagnostics

If you have encountered any issues while installing Evernode, Check if your error is one of the following.

_Note: If any of the following doesn't help in your situation please send it to Evernode support team as a Github issue [here](https://github.com/EvernodeXRPL/evernode-host/issues)._

## 1. Keeps on retry loop
- Abort and try again
  - This won't rollback your installation. Next try will resume from where you've aborted.
- Rolling back won't deregister your account you'll have to use [deregister command](./maintenance.md#deregister-a-host) to deregister from Evernode.
- If this doesn't help check for the installation error log for the error and send it to Evernode support team as a Github issue [here](https://github.com/EvernodeXRPL/evernode-host/issues).

## 2. Uninstall failure
- If your uninstall process failed at any point you can abort it and retry again.
- De-Registration failure at Uninstall
  - If your uninstall process failed at deregistration, You will be prompted for retry or You can abort uninstallation and retry later
  - Or it possible it would prompt you to skip deregister and continue uninstall.
    - This would cleanup Evernode binaries from your machine but registration will be preserved
    - You'll have to use [deregister command](./maintenance.md#deregister-a-host) to deregister from Evernode.
      
## 3. Transfer failure
- In the normal transfer process, If you have previous failed/partial registration, It would first complete the registration and then start the transfer.
- If your transfer process fails at any point aborting it and retrying would start the process from the point of failure.
  
## 4. De-Registration failure
- In the normal deregister process, If you have previous failed/partial registration, It would first complete the registration and then start the deregister.
- If your deregister process fails at any point aborting it and retrying would start the process from the point of failure.
      
## 5. Evernode update failure
- Evernode update wouldn't remove any of your binaries or data. It would only replace them with the new version.
- If your update failed when you are trying to update Evernode you can abort it and start again from the failure.
- **Do not deregister or uninstall.** Even if your update failed your registration with Evernode will remain intact.
- If you are still encountering problems with update, You can transfer your previous registration and re install.
- You can find how to transfer your host from [here](maintenance.md#transfer-the-host-registration).
  
## 6. Lease offer creation failure
- If your lease offering failed when you run `evernode offerlease`, Executing the command again would offer the remaining leases.
    
## 7. Stuck installation
- If your installation is stuck on `Checking server wss:\\....` this could indicate you have some broken package dependencies.
- Try removing `rm -r /tmp/evernode-setup-helpers` and install Evernode again.

## 8. Re-config failure
- If `evernode config` command failed in any reconfiguration, retry executing it again.
- If retry doesn't help change the value back to original using the `evernode config` and change back to new value again using the same command.
