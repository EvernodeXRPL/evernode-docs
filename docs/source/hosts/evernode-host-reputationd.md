# Evernode Reputation for Rewards: Recognizing True Contributors in the Evernode Host Community

The Evernode platform values the commitment and contributions of its hosts. To identify and reward true contributors, Evernode has implemented the "Reputation for Rewards" feature. This article explores the various stages and processes involved in this feature, from opt-in registration to performance checks.

## Opt-In and Registration

The journey begins with the host opting into the reputation assessment process. This step triggers the Evernode reputation hook, which registers the host for the reputation assessment of the upcoming moment. By opting in, hosts voluntarily agree to participate in the assessment, aiming to build and maintain a reputation based on their performance and contributions.

### Setting Up Accounts

Hosts need to maintain a separate Xahau account for Reputation Assessment. During the opt-in process, hosts have the flexibility to either generate a new reputation account or specify an existing one. Similar to funding the host account during installation, hosts must fund the required XAH amount for account setup. Furthermore, even though hosts are not forced to opt into the process, they are expected to cover the following expenses to maintain an uninterrupted reputation execution.

- XAH covers transaction fees.
- EVR covers the hourly self-HotPocket instance acquisition for running the Evernode Reputation Contract. The amount required may vary based on the instance's per-moment price.

#### NOTES 
- Hosts are required to initially deposit adequate XAH funds for setting up their account.
- Please ensure the secret for this account and the host registration account are backed up to safeguard against any issues with the host machine.
- When specifying an existing account, it will act as a delegate for the reputation assessment process.
- If managing `multiple hosts`, a SINGLE reputation account can be used for all, with a separate `DELEGATE HOOK` integrated into the reputation account. This is not the reputation hook which manages all the host's reputations. This will be a separate lightweight hook running in the host reputation account.
- If you are opted in as a one-to-many reputation account mode. It's recommended not to assign a large number of hosts to your reputation account as it would cause account sequence conflicts. Even though the transactions are submitted parallel for hosts in their ReputationD services, they are submitted in a randomized manner. However, since the reputation preparation happens within the last 10% of the moment, due to this small time window. The higher the number of hosts higher the possibility of getting same account sequence.
- Changing the modes of existing reputation account could lead to some temporary consequences for already configured hosts which are opted in.
  - For example if you set reputation to manage `multiple hosts`, And if you have already opted in same reputation account for a single host there is a chance of missing the current reputation assessment of the existing host.
- The host will be responsible for covering the cost of invoking this hook, which triggers upon a specific transaction called `ttACCOUNT_SET`.
- The relationship between the host registration account address and reputation address is mapped in the `WalletLocator` field. And it's in the following format.

  - Format: `<mode (1byte)><mapped-account-id (20bytes)>`
  - One to One mapping:
    - Host account: `<01><reputation-account-id>`
    - Reputation account: `<01><host-account-id>`
  - One to Many mapping:
    - Host account: `<02><reputation-account-id>`
    - Reputation account: `<02><this-will-be-empty (0's)>`

## Universe Assignment

Once registered, the host is assigned to a universe comprising 64 nodes. Within this universe, the host spins up a contract instance and joins the associated cluster to execute the reputation contract. The universe serves as a controlled environment where reputation assessment activities take place, ensuring a fair and consistent evaluation process.
Since you are being assigned to a cluster with 63 other random peers there's a possibility that you are getting assigned with dud hosts which aren't actually running reputation contract instances. If the majority of the cluster is like this even though you are running a fully able host, your reputation contract will fail to execute due to lack of majority in consensus. So this round of reputation will be skipped, but the reputation score you have maintained so far won't get affected.

## Contract Execution Status

In each round of the reputation assessment, the reputation contract performs a series of resource-intensive tasks, including memory, CPU, and storage-intensive proof of work. The results of these tasks are then shared with peers within the universe. Each node collects execution results from its peers to verify the successful completion of the proof of work. This collaborative verification ensures the integrity and accuracy of the assessment.

## Score Update

Upon receiving the shared results, a node verifies that the proof of work has been performed as expected. If the verification is successful, the node increments the peer score by one.
The assessment is to prove that you are worthy by doing a resource-intensive hash calculation within a given time frame. If you are able to do so, Then share your result with other peers. So others will receive your answer and check whether the answer is right or wrong. You'll have to do this POW in each consensus round within the moment. Peers keep accumulating your score based on the validity of your POW. This accumulated score is the assessment that each peer has made during the moment and will be reported to the reputation hook at the end. So the more rounds you succeed the higher score you get.
These updated scores are stored in a separate JSON file named `opinion.json`, which is kept outside the state directory in the contract instance. This file serves as a record of the scores, reflecting each node's evaluation of its peers' performance.

## Score Reporting

Towards the end of each moment, specifically during the last 10%, the node sends the scores to the Evernode reputation hook. This step acknowledges the experience regarding the peers within the universe. Each host reports the scores, providing an assessment of itself and its peers. The Evernode reputation hook accumulates these scores, creating a comprehensive evaluation based on peer assessments. Simultaneously, the host is registered for the next moment's reputation assessment process, ensuring continuous participation and evaluation.

## Evernode Reputation Hook Update

The Evernode reputation hook plays a crucial role in maintaining the individual states of each host. It updates their scores based on peer responses within the universe. These scores reflect the collective experiences and interactions with each host, providing a reliable measure of their reputation. The Evernode reputation hook ensures that the scores are up-to-date and accurately represent the hosts' contributions and performance.

## Performance Check

Hosts can check their performance results regarding the reputation assessment using the `evernode reputationd status` command. This command displays the scores of the reputation contract execution, with the `scoreNumerator` representing the accumulated score value and the `scoreDenominator` representing the number of acknowledgments received to formulate that score. By running this command, hosts can gain insights into their reputation scores and understand how their contributions are perceived within the community.

## Conclusion

The Evernode Reputation for Rewards feature is a comprehensive and transparent system designed to identify and reward true contributors in the Evernode host community. Through a series of well-defined processes, including opt-in registration, universe assignment, contract execution, score updates, score reporting, and performance checks, Evernode ensures that hosts are fairly evaluated and recognized for their commitment. This feature not only promotes a sense of achievement and motivation among hosts but also fosters a collaborative and trustworthy community.