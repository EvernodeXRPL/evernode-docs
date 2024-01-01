# Operations

## Governance Hook

Manages the governance game.

### Propose
- Hosts or Evernode Labs can propose governance candidates. With this proposal, the proposer should provide the hook hashes and pay an EVR amount equal to the current moment's reward quota.
- If a proposal is purged (life period has passed or another proposal is already approved), the proposer will lose the EVR stake spent on the proposal.
- If the proposal is accepted, the proposer will receive the entire amount of the stake spent on the proposal.

### Withdraw
- Governance candidates can be withdrawn by their proposer. When making a withdrawal request, the proposer should send the unique ID generated for the proposal.
- In the case of proposal withdrawal, the proposer will receive only 50% of the EVR stake spent on the proposal.

### Change Governance Mode
- In Piloted mode, Evernode Labs has the authority to change the governance mode to Co-Piloted mode or to Auto-Piloted mode.

### Report Dud Host
- Hosts or Evernode Labs can report dud hosts. In this case, the proposer should provide the XRP address of the dud host and pay an EVR amount equal to 25% of the current moment's reward quota.
- The same rules for purging, accepting, or withdrawing apply to dud host reports as for new hook proposals.
- If a host is pruned due to an elected dud host report, that particular host will receive half of its registration EVR stake and any pending rebates or rewards that it should have received during its time in the Evernode network.

## Heartbeat Hook

Manages heartbeats and rewards.

### Heartbeat
- Every host must send a heartbeat at every moment to prove that the host is alive and functioning. A host is considered alive if it has sent a heartbeat in the previous moment.
- Rewards are distributed based on the host's aliveness and the reputation. Host reputation will be updated by a p2p reputation system with voting. Reputation should exceed 200 to be eligible for rewards. The rewards are accumulated in the hook, and accumulated rewards will be sent to the host within 24 moment intervals.
- If the host is going to vote for a governance candidate, it needs to be sent with the heartbeat.

### Evernode Labs Vote
- Evernode Labs sends its vote for a governance candidate to the heartbeat hook.

## Registry Hook

Manages host registrations and issuance of registration tokens.

### Register Host
- A host registers in the Evernode network by sending its host specs and information via this request. The host must pay an EVR amount as a registration fee. Five EVRs from the registration fee will be kept in Evernode Labs wallet, and the rest will be staked.
- During registration, Evernode will mint a registration token that needs to be in the host's Xahau account to prove the registration.

### Deregister Host
- A host can deregister from the Evernode network. At the time of deregistration, half of its registration EVR stake will be refunded. Along with this refund, it will receive any pending rebates or rewards that it should have received during its time in the Evernode network.
- The registration token will be burned and will no longer be valid after deregistering.

### Update Registration
- A host can request to update its registration state when its specs change or its instance occupancy changes.

### Prune Dead Host
- Anybody can request to prune a host that has been inactive in the Evernode system for a while. The hook will check whether the host has been inactive for a threshold period, and if so, it will remove it from the system.
- When a host is pruned, it will receive a refund of half of its registration EVR stake and any pending rebates or rewards that it should have received during its time in the Evernode network.
- The registration token will be burned and will no longer be valid after pruning.

### Transfer Registration
- Hosts can transfer their registration to another account or the current account due to a host spec upgrade or transferring ownership. When the transfer is initiated, the ownership of the registration token will be transferred to the Evernode registry. The future owner can later buy the token from the registry without paying a registry fee.

### Request Rebate
- When the registered host count reaches half of the Evernode's maximum registrations, the maximum registration limit doubles, and the registration fee halves. Registered hosts are eligible to receive half of their registration EVR stake.
- The host must send this request to receive the registration stake rebate EVRs that it should receive.
