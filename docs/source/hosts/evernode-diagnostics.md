# Diagnostics

If you have encountered any issues while installing Evernode, Check if your error is one of the following.

_Note: If any of the following doesn't help in your situation please send it to Evernode support team as a GitHub issue [here](https://github.com/EvernodeXRPL/evernode-host/issues)._

## 1. Keeps on retry loop
- Abort and try again
  - This won't rollback your installation. The next try will resume from where you've aborted.
- Rolling back will clear installation files but won't deregister your account. You'll have to use [deregister command](./maintenance.md#deregister-a-host) to deregister from Evernode.
- If this doesn't help check for the installation error log for the error and send it to Evernode support team as a GitHub issue [here](https://github.com/EvernodeXRPL/evernode-host/issues).

## 2. Uninstall failure
- If your uninstall process failed at any point you can abort it and retry again.
- Deregistration failure at Uninstall
  - If your uninstall process failed at deregistration, you will be prompted for retry or you can abort uninstallation and retry later
  - Or it would prompt you to skip deregistering and continue uninstall.
    - This would clean up Evernode binaries from your machine but registration will be preserved
    - You'll have to use [deregister command](./maintenance.md#deregister-a-host) to deregister from Evernode.
      
## 3. Transfer failure
- In the normal transfer process, If you have previous failed/partial registration, It would first complete the registration and then start the transfer.
- If your transfer process fails at any point aborting it and retrying would start the process from the point of failure.
  
## 4. Deregistration failure
- In the normal deregister process, If you have previous failed/partial registration, It would complete the registration and then start the deregister.
- If your deregister process fails at any point aborting it and retrying would start the process from the point of failure.
      
## 5. Evernode update failure
- Evernode update wouldn't remove any of your binaries or data. It would only replace them with the new version.
- If your update failed when you are trying to update Evernode you can abort it and start again from the failure.
- **Do not deregister or uninstall.** Even if your update failed your registration with Evernode will remain intact.
- If you are still encountering problems with the update, you can transfer your previous registration and re-install.
- You can find how to transfer your host from [here](maintenance.md#transfer-the-host-registration).

## 6. No offered lease after installation
- Not the Evernode installation will only mint the leases, It won't create lease offers for you.
- You have to run `evernode offerlease` to offer the minted leases.

## 7. No rewards even if the Host is active
- Case 1: In the version 0.8.2 you won't rewards if your host has unoffered leases.
- Case 2: Your reputation will be set to 0, if your host has less than 3 instances.
- Case 3: Your reputation will be set to 0, if your host's lease fee is more than `reward distribution for the moment / host count * 110%`
- Case 4: Your reputation will be set to 0, if you haven't upgraded to v0.8.2 within **one week**.
- Case 5: Your reputation will be set to 0, if your machine is from on of the **Sanctioned Entities** mentioned in [Evernode license](https://raw.githubusercontent.com/EvernodeXRPL/evernode-test-resources/main/license/evernode-license.pdf).
  
## 8. Lease offer creation failure
- If your lease offering failed when you run `evernode offerlease`, Executing the command again would offer the remaining leases.
    
## 9. Stuck installation
- If your installation is stuck on `Checking server wss:\\....` this could indicate you have some broken package dependencies.
- Try removing `rm -r /tmp/evernode-setup-helpers` and install Evernode again.

## 10. Re-config failure
- If `evernode config` command failed in any reconfiguration, retry executing it again.
- If retry doesn't help change the value back to the original using the `evernode config` and change back to the new value again using the same command.
