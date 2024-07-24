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
Since you are being assigned to a cluster with 63 other random peers there's a possibility that you are getting assigned with dud hosts which aren't actually running reputation contract instances. If the majority of the cluster is like this even though you are running a fully able host, your reputation contract will fail to execute due to lack of majority in consensus.
If the majority in your universe is reported as the universe is dud the scores of the universe will be discarded, but the reputation score you have maintained so far won't get affected.

## Contract Execution Status

**Resource Evaluation:** In each round of the reputation assessment, the reputation contract performs a series of resource-intensive tasks, including memory, CPU, and storage-intensive proof of work. The results of these tasks are then shared with peers within the universe. Each node collects execution results from its peers to verify the successful completion of the proof of work. This collaborative verification ensures the integrity and accuracy of the assessment.
**General Purpose Port Evaluation:** Within the 64-node universe, hosts form random 4-node sub-universes within 5 HotPocket ledger intervals. Each host tries to connect to others' General Purpose ports and asks for a challenge (There are 4 general purpose ports available per instance). Then a server listening on general purpose ports on the peer will reply with the challenge and receiver verifies the challenge and gives marks

## Score Update

**Resource Evaluation:** Upon receiving the shared results, a node verifies that the proof of work has been performed as expected. If the verification is successful, the node increments the peer score by one.
The assessment is to prove that you are worthy by doing a resource-intensive hash calculation within a given time frame. If you are able to do so, Then share your result with other peers. So others will receive your answer and check whether the answer is right or wrong. You'll have to do this POW in each consensus round within the moment. Peers keep accumulating your score based on the validity of your POW. This accumulated score is the assessment that each peer has made during the moment.
These updated scores are stored in a separate JSON file named `resource_opinion.json`, which is kept outside the state directory in the contract instance. This file serves as a record of the scores for resources, reflecting each node's evaluation of its peers' performance.
**General Purpose Port Evaluation:** In each execution node tries to connect to General purpose ports of other 3 random peers in the universe. Upon the connection and request the challenge will be generated and sent to the client running on contract by the General Purpose Port server running on receiver node. The contract then verifies the challenge and increments the score by value in range 0 - 4 (for 4 ports) for successful connections.
These updated scores are stored in a separate JSON file named `port_opinion.json`, which is kept outside the state directory in the contract instance. This file serves as a record of the scores for ports, reflecting each node's evaluation of its peers' general purpose port connectivity.

## Score Reporting

Towards the end of each moment, specifically during the last 10%, the node sends the scores to the Evernode reputation hook.
Scores are averaged to 100% based on try/success rate. The total score weighted as 75% for resource assessment scores and 25% for port assessment scores. The final score reported to hook is an average per node.
This step acknowledges the experience regarding the peers within the universe. Each host reports the scores, providing an assessment of itself and its peers.
The Evernode reputation hook accumulates these scores for a moment, creating a comprehensive evaluation based on peer assessments. In each new moment these scores will be averaged and kept as last moment's averaged score and the numerator denominator used to calculate the score will be reset. Simultaneously, the host is registered for the next moment's reputation assessment process, ensuring continuous participation and evaluation.

## Evernode Reputation Hook Update

The Evernode reputation hook plays a crucial role in maintaining the individual states of each host. It updates their scores based on peer responses within the universe. These scores reflect the collective experiences and interactions with each host, providing a reliable measure of their reputation. The Evernode reputation hook ensures that the scores are up-to-date and accurately represent the hosts' contributions and performance.

## Dud Universe/Node Detection
Hosts are reported as having faulty reputation execution and their scores will be discarded if they haven't created the minimum ledgers required (20% of closed ledgers in the cluster). 
The universe is considered faulty end the universe scoring is discarded if the minimum required number of hosts haven't reported scores (80% of the number of hosts in the universe).

## Performance Check

Hosts can check their performance results regarding the reputation assessment using the `evernode reputationd status` command. This command displays the scores of the reputation contract execution. By running this command, hosts can gain insights into their reputation scores and understand how their contributions are perceived within the community.
`scoreNumerator` - accumulated score value of the moment.
`scoreDenominator` - number of acknowledgments received to formulate that score for the moment.
`score` - Averaged score of the last moment.
`lastResetMoment` - The moment when scoreNumerator and scoreDenominator were last reset to 0.
`lastScoredMoment` - The moment when the score was last calculated.
`lastUniverseSize` - Size of the universe to which scoreNumerator and scoreDenominator belong.
`valid` - true if the current score is calculated within the last two moments.

## Conclusion

The Evernode Reputation for Rewards feature is a comprehensive and transparent system designed to identify and reward true contributors in the Evernode host community. Through a series of well-defined processes, including opt-in registration, universe assignment, contract execution, score updates, score reporting, and performance checks, Evernode ensures that hosts are fairly evaluated and recognized for their commitment. This feature not only promotes a sense of achievement and motivation among hosts but also fosters a collaborative and trustworthy community.