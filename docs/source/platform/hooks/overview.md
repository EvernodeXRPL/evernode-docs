# Overview

Evernode makes use of 3 [XRPL Hooks](https://hooks.xrpl.org/).

- Registry hook – Handles host registrations, issuing registration tokens.
- Heartbeat hook – Handles heartbeats and rewards.
- Governance hook – Handles [governance game](governance-game).

The account associated with each hook remains constant, while the hooks themselves can be modified according to these rules.
Evenode hooks has predefined set of [configurations](configurations) which are initialized at the hook deployment.