# Overview

_This article assumes you already have a basic understanding of decentralized applications in general._

HotPocket is a decentralized application (DApp) consensus engine. It is capable of converting an application written in traditional programming methodologies into a decentralized application. It does so by facilitating the decentralized communication infrastructure, which leaves the application developer free to manage the application logic from a "single-instance" point of view.

_Throughout our documentation we may use the terms "DApp", "smart contract" or "contract" due to historical reasons. They all mean the same thing._

## HotPocket cluster

HotPocket cluster is a collection of machines, each running an instance (i.e. node) of HotPocket software, that are configured to communicate with and trust each other. Each HotPocket node observes the application activities that take place on the machine and communicates them to the other HotPocket nodes in the cluster. Using a predetermined algorithm, they contrast and compare the observations of all HotPocket nodes in the cluster and arrive at a final conclusion. This process is called [consensus](consensus) and it is an integral part of making applications decentralized.

## DApp

A HotPocket DApp is an application software for which a copy exists on each HotPocket node. The HotPocket node invokes the application binary as it deems necessary. For example, HotPocket may invoke the DApp at the end of a [consensus](consensus) round. The app is capable of interpreting and acting upon the consensed information passed to it by HotPocket. During execution, the app is capable of exchanging information with the HotPocket node via an established communication channel between itself and HotPocket. As far as HotPocket is concerned, a DApp's primary job is to process [user inputs](users.md#user-inputs), modify [state](#state), and produce [user outputs](users.md#user-outputs).

See [tutorials](../../sdk/hotpocket/tutorials/index) for HotPocket DApp development guidance.