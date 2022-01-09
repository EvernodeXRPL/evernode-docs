# Hot Pocket
Hot Pocket is a decentralized application (dApp) development platform. Anyone can build an application as a "Smart Contract" which runs on a distributed Hot Pocket cluster. Hot Pocket takes care of running instances of your smart contract on all the nodes and perform "consensus" on your smart contract executions.

## Smart Contract
Hot Pocket defines the smart contract as a regular POSIX application that can receive **Inputs**, produce **Outputs** and also persist **State** to permanent storage. You can use any  POSIX compliant programming language to create Hot Pocket smart contracts such as Solidity, C/C++, Python and many more.

## Consensus
Smart contract instances simultaneously runs on multiple nodes, it needs to be verified that all instances execute under the exact same conditions and in the same manner. Hot Pocket makes sure that the majority of the instances receives the same **inputs**, produces the same **outputs** and persists the same **state** to the permanent storage. This is known as **consensus** in which **majority of instances** agree upon similar behavior of the smart contract.

Hot Pocket nodes will execute consensus with each other via their respective cluster, after a majority consensus has been achieved, the Hot Pocket nodes will send the results to the Hook.

## Security aspect
The benefit of consensus is that in order for an intruder to arbitrarily change the behavior of the smart contract or to forcefully tamper the persisted state, they need to be able to do that to a majority of the instances at the same time, which is practically impossible. If one of the instances gets compromised, the consensus would detect it and apply corrections to the compromised instance in order to achieve a fair and a healthy consensus agreement.

## Decentralized control
If different instances of the smart contract is owned by multiple parties (eg. different people or organizations), then no single party has ultimate control over the entire cluster. No single party can manipulate the system because it would require collaboration of a majority of the Hot Pocket maintainers to manipulate the entire system's behaviour in order to make **collective modifications** to the instances owned by them **at the same time**.

## Users
You can "connect" to any *one* of the smart contract instances of the custer and communicate with that instance as a "user" (Hot Pocket will subject your communication with that particular instance to inter-node consensus which is hidden from you). In order for the Hot Pocket node to distinguish you with other users who are connecting to the same cluster, you need to identify yourself with a unique **cryptographic key pair** (generated using [EdDSA](https://en.wikipedia.org/wiki/EdDSA#Ed25519)).

Upon successful connection, you can communicate with the smart contract using the app-specific message formats defined by the smart contract developer. Hot Pocket acts as a "carrier" of messages between you and the smart contract.

See more at [User connection basics](user-connections.md)

## Hot Pocket SDKs
Hot Pocket provides several libraries to make it easy to write Hot Pocket smart contracts and to connect and communicate with Hot Pocket smart contracts as a user.

  - Library for [NodeJs contracts](https://github.com/HotPocketDev/hp-nodejs-contract)
  - Library for [Javascript clients](https://github.com/HotPocketDev/hp-js-client)
