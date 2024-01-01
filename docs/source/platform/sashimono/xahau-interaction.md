# Xahau interaction

Evernode uses Xahau transactions for host registration management and smart contract leasing operations. Due to this, Sashimono needs a continous websocket connection to a Rippled server of your choice. This is an outgoing connection and usually does not need any special permissions with firewalls. Sashimono uses this connection to submit and listen to Evernode operations (which are simply Xahau transactions) on behalf of your Host's Xahau account.

1. Every Moment (currently defined as 1 hour), Sashimono announces to Evernode Registry hook that your host is online. This is performed via the Evernode "Heartbeat" transaction. If your host fails to report the heartbeat for 1 Moment, it will be shown as "inactive" on the [Evernode dashboard](https://dashboard.evernode.org). Continously being "inactive" will make your host's registration susceptible for prunning.

2. If Sashimono receives a smart contract hosting lease payment (Evernode "Acquire Lease" transaction) from a potential tenant, based on the availabilty of vacant system resources, it will then provision a HotPocket smart contract instance and provide the instance connection details back to the tenant.
   - It is worth noting that the smart contract instance runs completely independently of Sashimono or Xahau. Sashimono simply manages the life-cycle of the smart contract instance according to the lease duration and purges it upon lease expiration.
   - A tenant could pay to extend the duration of an existing lease (Evernode "Extend Lease" transaction).

3. You could update your host information on the Evernode registry using the [evernode CLI](../../hosts/evernode-cli). This will cause the updated host information to get displayed on the [Evernode dashboard](https://dashboard.evernode.org).