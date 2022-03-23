# Hot Pocket
Hot Pocket is a smart contract execution and consensus engine. Your can build your "Smart Contract" and run it on a distributed Hot Pocket cluster. Hot Pocket takes care of running instances of your smart contract on all the nodes and perform "consensus" on your smart contract executions.

## Smart Contract
Hot Pocket defines the smart contract as a regular POSIX application that can receive **Inputs**, produce **Outputs** and also persist **State** to permenant storage. You can use any POSIX-compliant programming platform to create Hot Pocket smart contracts (see [nodejs contract example](https://github.com/HotPocketDev/hp-nodejs-contract/blob/main/example/echo-contract.js)).

## Consensus
Because your smart contract instances simultaneously runs on multiple nodes, it needs to be verified that all instances execute under exact same conditions and in the same manner. Hot Pocket makes sure that the MAJORITY of the instances receives the same **inputs**, produces same **outputs** and persists same **state** to the permanent storage. This is known as **consensus** in which **majority of instances** AGREE upon similar behavior of the smart contract.

## Security aspect
The benefit of consensus is that in order for an intruder to arbitrarily change the behavior of the smart contract or to forcefully tamper the persisted state, they need to be able to do that to a MAJORITY of the instances at the same time, which is practically impossible. If one of the instances gets compromised, the consensus would detect it and apply corrections to the compromised instance.

## Decentralized control
If different instances of the smart contract is owned by multiple parties (eg. different people or organizations), then no single party has ultimate control over the entire cluster. No single party can manipulate the system. It would require collaboration of majority of owners to manipulate the entire system's behaviour in order to make **collective modifications** to the instances owned by them **at the same time**.

## Users
You can "connect" to any ONE of the smart contract instances of the cluster and communicate with that instance as a "user" (Hot Pocket will subject your communication with that particular instance to inter-node consensus which is hidden from you). For Hot Pocket to distinguish you with other users who are connecting to the same cluster, you need to identify yourself with a unique **Public/Private asymmetric key pair** (generated using [EdDSA](https://en.wikipedia.org/wiki/EdDSA#Ed25519) signing key algorithm).

Upon successful connection, you can communicate with the smart contract using the app-specific message formats defined by the smart contract developer. Hot Pocket acts as a "carrier" of messages between you and the smart contract.

See [User connection basics](user-connections.md)

## Hot Pocket SDKs
Hot Pocket provides several libraries to make it easy to write Hot Pocket smart contracts and to connect and communicate with Hot Pocket smart contracts as a user.

  - Library for [NodeJs contracts](https://github.com/HotPocketDev/hp-nodejs-contract)
  - Library for [Javascript clients](https://github.com/HotPocketDev/hp-js-client)