# Hot Pocket user connection basics
Hot Pocket smart contracts are run as a cluster of nodes. As a user, you can connect to any one of the nodes and communicate with the smart contract.

## User public/private key pair
You need to posses a unique public/private assymetric key pair generated using [EdDSA](https://en.wikipedia.org/wiki/EdDSA#Ed25519) signing key algorithm. You can use a suitable cryptographic library available on your platform in order to generate a key pair. Client libraries provided by Hot Pocket also contains helper methods which can do this.

**_It is the user's responsibility to not let the "Private Key" get compromised. If that happens, anyone possessing your Private Key can pretend to be you._**

**_On the flip side, if you lose your Private Key, you will be unable to reclaim your user identity on the Hot Pocket platform_**

## Making a connection
In order to initiate a connection to a smart contract instance, you need to know the **address and the port number** of where that instances is hosted. See this [Javascript example](https://github.com/HotPocketDev/hp-js-client/blob/main/example/browser-example.html#L21) on how to connect and communicate with a smart contract instance.

## Submitting inputs
Hot Pocket defines "Inputs" as the messages you (user) send to the smart contract which has the potential to modify the smart contract state (similar to HTTP PUT/POST methods). "Inputs" are subjected to "consensus" (see Hot Pocket basics) and therefore may take longer to be processed. The reason being, even though you submitted the "Input" to a specific Hot Pocket instance (denoted by host address and port), it will propagate this to other nodes. As a group, all the instances in the cluster makes sure "majority" of them got the input.

Once the above condition (majority instances has received your input) is met, you will get a **"Accepted"** response. This indicates your "Input" got accepted for processing by the entire cluster. However, there are various reasons that your "Input" can be **"Rejected"** as well which will not be explained here.

**Note:**
_Unlike HTTP Rest APIs, it is wrong to assume every 'input' message will get a 'output' message as the response. It is up to the smart contract to decide whether to send a response message or not. If the smart contract actually sends such a response back, it will arrive much later than the "Accepted" response you got upon input submission. **This is very different from how HTTP APIs work where a 'request' will get a immediate 'response'.** This is mainly due to Hot Pocket operating on top of Web Sockets as opposed to HTTP._

## Receiving outputs
"Outputs" are messages sent by the smart contract to the user. "Outputs" might be sent as a response to previously submitted "Inputs" or they might be delivered without any relationship to a previous "Input" (eg. periodic notification messages sent by a smart contract). It is up to the smart contract to decide when and where to send outputs.

If the smart contract message format specifies that a particular input message will get a response, then it is up to you to wait and grab that response when it arrives. Hot Pocket client library makes this easy (see [Javascript example for output capture](https://github.com/HotPocketDev/hp-js-client/blob/main/example/browser-example.html#L57)).

## Read requests
Hot Pocket "Read requests" are very similar to HTTP GET method. They represent any messages that request information from the smart contract and that DOES NOT modify the smart contract state (read only). They are NOT subjected to consensus and are very much faster in their response time as opposed to "Inputs/Outputs". Unlike "Inputs/Outputs", Read Requests also follow similar request/response pattern like HTTP. Those qualities make them the ideal mechanism to read information out of the smart contract.

## Binary vs Text Protocols
Hot Pocket supports binary vs text-mode communication protocols. If the smart contract uses text-based (eg. json) messages, then you should use the Hot Pocket json protocol. Otherwise Hot Pocket supports bson protocol. You can specify this in Hot Pocket client library ([Javascript example](https://github.com/HotPocketDev/hp-js-client/blob/main/example/browser-example.html#L39))