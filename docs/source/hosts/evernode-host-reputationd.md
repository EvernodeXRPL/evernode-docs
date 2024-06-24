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
- If managing `multiple hosts`, a SINGLE reputation account can be used for all, with a separate `DELEGATE HOOK` integrated into the reputation account.
The host will be responsible for covering the cost of invoking this hook, which triggers upon a specific transaction called `ttACCOUNT_SET`.
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

## Contract Execution Status

In each round of the reputation assessment, the reputation contract performs a series of resource-intensive tasks, including memory, CPU, and storage-intensive proof of work. The results of these tasks are then shared with peers within the universe. Each node collects execution results from its peers to verify the successful completion of the proof of work. This collaborative verification ensures the integrity and accuracy of the assessment.

## Score Update

Upon receiving the shared results, a node verifies that the proof of work has been performed as expected. If the verification is successful, the node increments the peer score by one. These updated scores are stored in a separate JSON file named `opinion.json`, which is kept outside the state directory in the contract instance. This file serves as a record of the scores, reflecting each node's evaluation of its peers' performance.

## Score Reporting

Towards the end of each moment, specifically during the last 10%, the node sends the scores to the Evernode reputation hook. This step acknowledges the experience regarding the peers within the universe. Each host reports the scores, providing an assessment of itself and its peers. The Evernode reputation hook accumulates these scores, creating a comprehensive evaluation based on peer assessments. Simultaneously, the host is registered for the next moment's reputation assessment process, ensuring continuous participation and evaluation.

## Evernode Reputation Hook Update

The Evernode reputation hook plays a crucial role in maintaining the individual states of each host. It updates their scores based on peer responses within the universe. These scores reflect the collective experiences and interactions with each host, providing a reliable measure of their reputation. The Evernode reputation hook ensures that the scores are up-to-date and accurately represent the hosts' contributions and performance.

## Performance Check

Hosts can check their performance results regarding the reputation assessment using the `evernode reputationd status` command. This command displays the scores of the reputation contract execution, with the `scoreNumerator` representing the accumulated score value and the `scoreDenominator` representing the number of acknowledgments received to formulate that score. By running this command, hosts can gain insights into their reputation scores and understand how their contributions are perceived within the community.

## Conclusion

The Evernode Reputation for Rewards feature is a comprehensive and transparent system designed to identify and reward true contributors in the Evernode host community. Through a series of well-defined processes, including opt-in registration, universe assignment, contract execution, score updates, score reporting, and performance checks, Evernode ensures that hosts are fairly evaluated and recognized for their commitment. This feature not only promotes a sense of achievement and motivation among hosts but also fosters a collaborative and trustworthy community.