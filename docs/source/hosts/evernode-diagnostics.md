# Diagnostics

If you have encountered any issues while installing Evernode, Check if your error is one of the following.

_Note: If any of the following doesn't help in your situation please send it to the Evernode support team as a GitHub issue [here](https://github.com/EvernodeXRPL/evernode-host/issues)._

## 1. Keeps on retry loop
- Abort and try again
  - This won't roll back your installation. The next try will resume from where you've aborted.
- Rolling back will clear installation files but won't deregister your account. You'll have to use [deregister command](./maintenance.md#deregister-a-host) to deregister from Evernode.
- If this doesn't help check for the installation error log for the error and send it to the Evernode support team as a GitHub issue [here](https://github.com/EvernodeXRPL/evernode-host/issues).

## 3. Asking to re-check the balance
- If the installer is asking `Do you want to re-check the balance` when you are installing or transferring to a VM.
- This means you do not have enough balance in your Host Xahau account to install and maintain a host.
- Please check whether your Host Xahau account has the following XAH and EVR balances. If not, fund your account and retry.
  - You should have the minimum XAH balance in your account to maintain your host for 3 months.
    - This is to pay your upcoming heartbeats, reserves, etc, It won't be expended at the installation.
    - The value is at around `18 XAH` when this documentation is last updated.
  - You should have the minimum EVR balance in your account to do **register (on a fresh install)** or **re-register (on transfer install)** transactions.
    - If you are doing a register (on a fresh install) - You should have `<Registration Fee> EVRs` in your account (`500 EVRs` when this documentation is last updated).
    - If you are doing a re-register (on transfer install) - You should have `0.00000001 EVRs` in your account.

## 4. CLI_OUT: INVALID_REG error on installation
- If your installation is failing with `CLI_OUT: INVALID_REG`.
- This means your host is already registered in Evernode but now you are trying to install again with different host specifications.
- So you can [transfer](maintenance.md#transfer-the-host-registration) your registration and re-install again.
- **Not recommended:** You can also uninstall or deregister and then reinstall. However, if you have already been in the Evernode network, you will only receive a refund of half of the registration fee. Therefore, we recommend avoiding this action if you do not intend to permanently leave the network.

## 5. Uninstall failure
- If your uninstall process failed at any point you can abort it and retry again.
- Deregistration failure at Uninstall
  - If your uninstall process failed at deregistration, you will be prompted for retry or you can abort uninstallation and retry later
  - Or it would prompt you to skip deregistering and continue uninstall.
    - This would clean up Evernode binaries from your machine but registration will be preserved
    - You'll have to use [deregister command](./maintenance.md#deregister-a-host) to deregister from Evernode.
      
## 6. Transfer failure
- In the normal transfer process, If you have previous failed/partial registration, It would first complete the registration and then start the transfer.
- If your transfer process fails at any point aborting it and retrying would start the process from the point of failure.
  
## 7. Deregistration failure
- In the normal deregister process, If you have previous failed/partial registration, It would complete the registration and then start the deregister.
- If your deregister process fails at any point aborting it and retrying would start the process from the point of failure.
      
## 8. Evernode update failure
- Evernode update wouldn't remove any of your binaries or data. It would only replace them with the new version.
- If your update failed when you are trying to update Evernode you can abort it and start again from the failure.
- **Do not deregister or uninstall.** Even if your update failed your registration with Evernode will remain intact.
- If you are still encountering problems with the update, you can transfer your previous registration and re-install.
- You can find how to transfer your host from [here](maintenance.md#transfer-the-host-registration).

## 9. Failing to fetch the Sashimono version
```
jq: error (at <stdin>:1): Cannot iterate over null (null)
Sashimono null not found.
```
or
```
Failed to retrieve the latest version data.
```
- If you are getting the above error when running the Evernode commands.
- This could mean you have got a connection issue, or your IP is blocked by Github due to exceeding request limitations.
- Wait for some time and try again, Your limitation will be lifted and you'll be able to successfully execute the command again.

## 10. No offered lease after installation
- Now the Evernode installation will only mint the leases, It won't create lease offers for you.
- It will create the lease offers at the next start of the message board.
  - You can also run `evernode offerlease` to offer the unoffered leases.

## 11. No rewards even if the Host is active
- Check whether your host lacks reputation by checking [these conditions](evernode-host-reputationd.md#host-reputation-for-rewards)
  
## 12. Lease offer creation failure
- **Case 1:** If your lease offering failed when you run `evernode offerlease`, Executing the command again would offer the remaining leases.
- **Case 2:** If `evernode status` shows an unoffered lease, but still you are getting the following error when executing `evernode offerlease`.
  - `evernode status` output :
    ```
    Available Lease offers: 3 out of 6
    ````
  - `evernode offerlease` output :
    ```
    CLI_OUT: LEASE_OFFER_ERR
    MB_CLI_EXITED
    There was an error in creating lease offers
    ```
  - Try configuring instance counts again
    - Command: `evernode config resources <ram> <swap> <disk> <instance count>`
    - Arguments are optional, You can pass `0` if you don't want to change
    - Example:
      - Run `evernode config resources 0 0 0 6` it'll fix your instances.
    
## 13. Stuck installation
- If your installation is stuck on `Checking server wss:\\....` this could indicate you have some broken package dependencies.
- Try removing `rm -r /tmp/evernode-setup-helpers` and install Evernode again.

## 14. Re-config failure
- If the `evernode config` command failed in any reconfiguration, retry executing it again.
- If retry doesn't help change the value back to the original using the `evernode config` and change back to the new value again using the same command.

## 15. Handling reputation assessment observations

### a. Health of ReputationD service
- ReputationD is a `systemd` service running inside the host, responsible for managing reputation assessment-related operations.
- You can check the status of this service using the following command:
  ```bash
  sudo -u sashireputationd XDG_RUNTIME_DIR="/run/user/$(id -u sashireputationd)" systemctl --user status sashimono-reputationd.service
  ```
- To analyze the logs related to this service, use the following command:
  ```bash 
  sudo -u sashireputationd bash -c 'journalctl --user -u sashimono-reputationd | tail -n <number of lines>'
  ```
- However, these commands are integrated into the `evernode reputationd status` and `evernode log` commands in an abstract manner.

### b. Issues with reputation score reporting.
- Typically, a host that registers for a reputation assessment sends the reputation scores in the third quarter of the moment.
- If the host is part of a "bad universe" (a group of underperforming hosts), the reputation contract may fail to execute correctly or reach consensus or minimum required ledger completions for reputation.
- As a result, the host may be unable to send scores for that assessment round and it would report this as a bad universe.
- If you were to be in a "bad universe" which is decided by the hook from the majority scores of the universe. Your reputation scores will be discarded for that moment.
- **This could also mean that you are a bad actor**, check the [below point](#c-scorenumerator-sits-at-a-very-low-value) to investigate on that.
- Note: If you are seeing this behavior more often, it means you are having issues with running the reputation contract and you'll be getting lower reputation scores. Check [this](#c-scorenumerator-sits-at-a-very-low-value) for diagnostics.
- **Common score errors.**
  - __Not a reliable score. We are not in sync.__
    - The contract wasn't in sync by the time of score fetching.
  - __Not a reliable score. We haven't executed the contract minimum rounds required.__
    - The contract hasn't completed the minimum rounds required to be a reliable execution. This means the contract should be executed in at least 20% of the ledgers that the cluster has created.

### c. `scoreNumerator` sits at a very low value
- Check your [reputation logs](#a-health-of-reputationd-service)
- Check if the reputation contract is getting deployed every hour.
- If there's a reputation contract running on your machine (You can check by `evernode list` command).
- Check the HotPocket log by executing `cat /home/<user>/<name>/log/hp.log` command (Replace `user` and `name` respectively from the output of `evernode list`) and see it is completing consensus rounds using `****Ledger created****` log line.
  - If it is reporting `Not enough peers` check whether your domain name is correct and peer ports are reachable by outside.
- Check contract logs by `cat /home/<user>/<name>/log/contract/rw.stdout.log` and `cat /home/<user>/<name>/log/contract/rw.stderr.log`
  - `rw.stdout.log` should print logs of hash file creation and JSON containing the received scores against the peer public keys in the cluster. It will forcefully terminate if your host lacks minimum requirements.
  - Find the `minimum requirement` of resources under the `Resource limits` section at [here](./evernode-host.md#important-tips-for-installation).
- Run `sudo -u sashireputationd bash -c journalctl --user -u sashimono-reputationd | grep "Reporting"`, This would give you the score reporting in all the moments.
  - Check if you are seeing frequent reports without scores which means your node is having issues with performing reputation which could happen due to the following reasons.
    - No IPv4 support - Evernode requires IPv4 support in your machines. If not, please [enable](./additional-configurations.md#configuring-ipv4-in-your-vps).
    - Lack of minimum requirements - Find the `minimum requirement` of resources under the `Resource limits` section at [here](./evernode-host.md#important-tips-for-installation).
    - Port connectivity issues - Check your DNS or firewall configurations to see if the [Evernode required port ranges](./evernode-host.md#firewalls-and-ports) are allowed.
  - If you are observing `reporting without score` less often, but still your score is low.
    - Check your reputation contract logs as mentioned above and see `****Ledger created****` records. Contact the Evernode team with your log files.
- __Note that even if you have the minimum requirements it's better to have more since the resources are consumed not only by the contract execution itself, Resources are also consumed by docker daemon and other utilities.__

### d. Continuous failures in sending reputation.
- Continuous failures can occur due to insufficient XAH balance in the host reputation account, preventing the invocation of the Evernode Reputation Account.
- Ensure that the host reputation account is adequately funded to avoid this issue.
- Ensure your host and reputation address are properly configured for one-to-one or one-to-many modes. You can fix it by running `evernode reputationd opt-in` again.

### e. Seeing `tefPAST_SEQ` (This sequence number has already passed.) too often.
- That means that the number of reputation transactions that the reputation account has to bear within reputation preparation time is high due to the high number of hosts assigned to it.
- So it's hard for ReputationD to automatically randomize the transactions due to the load.
- Solution for this is, to distribute the hosts with more reputation accounts.

### f. No relevant reputation instance.
- Check the transactions of the reputation account and see if there are failed transactions and see the reason.
  - Insufficient EVR balance in the host reputation account can prevent the purchase of an instance of the host machine necessary for deploying the reputation contract.
  - Ensure that the host reputation account is sufficiently funded.
  - Additionally, if the host account has not offered leases for minted lease tokens, it will be considered inactive. The reputation service cannot acquire an instance without available offers at that time. Ensure that you create offers for the lease tokens using the `evernode offerlease` command.
- There are several prerequisite checks are made before creating the reputation instance.
  - You can see the failures in the logs.
    ```bash 
    sudo -u sashireputationd bash -c 'journalctl --user -u sashimono-reputationd | tail -n <number of lines>'
    ```
  - Following are the prerequisite checks. Instance creation will be skipped if any of them fails.
    - Your host should support IPV4.
      - Enable IPV4 support if not.
    - Your host should be in the [minimum version](https://raw.githubusercontent.com/EvernodeXRPL/evernode-resources/main/definitions/definitions.json) required.
      - Update the Evernode to the minimum version.
    - Your host should have valid SSL certificates
      - Check the validity of SSL certificates located in `/etc/sashimono/contract_template/cfg/`
      - If they are not valid, it means they were not auto-renewed. Generate new certificates using `certbot renew`.
      - Then replace the new ones inside the Sashimono location with the command `evernode applyssl /etc/letsencrypt/live/<your domain>/privkey.pem /etc/letsencrypt/live/<your domain>/cert.pem /etc/letsencrypt/live/<your domain>/fullchain.pem`

### g. When your host account's reputation score is zero
- If your host account's reputation score is zero, it may lead to meeting conditions where the reputation value of the host is turned to zero. Please review the [reputation deduction criteria](./evernode-host.md#host-reputation) carefully.
