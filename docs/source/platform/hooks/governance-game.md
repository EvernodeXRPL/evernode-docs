# Governance game

## Hooks
There are four Hooks

- Governance - Handles governance game
- Registry - Handles host registrations, issuing registration tokens
- Heartbeat - Handles heartbeats and rewards
- Reputation - Handles host reputations

The account associated with each hook remains constant, while the hooks themselves can be modified according to these rules.

Governance Game allows eligible participants in the Evernode network to propose and vote on the Evernode changes. These proposals will get accepted or purged according to a predetermined rule-set on received votes.

## Participants

There are two classes of participants in the Governance Game.

- **Evernode Labs**: Evernode Labs always has 1 vote and has special rights in Piloted and Co-Piloted modes and has no special rights over Auto-Piloted mode.
- **Valid Hosts**: Reputable host accounts that are earning rewards, have held a registration token for the previous three consecutive months, and are not eligible to be pruned due to unreliability.

## Governance

### Types of proposals

- Proposal for a New Hook Candidate (All three hooks will be affected).
  - The Participant can submit a Proposal with new Hook hashes of above mentioned 4 Hooks. Once that Proposal is continuously supported by 80% of eligible Participants for 2 weeks, the existing hooks will be replaced by the proposed hooks.
- Proposal for removing a Dud Host.
  - The Participant can submit a Proposal with the Xahau address of the host which is determined as a dud.
- Proposal for changing the governance mode. 
  - This proposal type will be created and handled automatically inside the hooks according to the current governing mode.

### Submitting a proposal

#### New Hook Candidate

- New Hook candidate Proposal represents the hashes `<governance_hooks_hash><registry_hook_hash><heartbeat_hook_hash><reputation_hook_hash>` of the new Hook to replace an existing Hook.
- Any Participant can submit a Proposal for a new Hook.
- Proposers must collateralize their Proposal with EVR rewards equivalent to the current moment's reward quota.
- The hooks that bear the proposed hashes must be deployed to some existing Xahau account.
- Example
  - If you are willing to suggest a hook change you first have to `setHook` your updated hook code to 4 new accounts.
  - Then get each hook's hook hash (32 bytes as a hex string) using an explorer and construct the hash buffer in hex format in above mentioned order.
    - The total length of the buffer will be 128 bytes (256 characters in hex string).
  - Then create a text file with the above hex buffer string inside.
  - After that propose the candidate with the Evernode CLI `evernode governance propose <hash file> <short name>`
    - Ex:- `evernode governance propose ~/hooks.txt testProposal` (Short name will be a name that you can identify your proposal (Do not add white spaces in middle))
  - **Note: You have to keep the hooks that you have proposed, inside the accounts that you have initially generated. Because if you remove or override them, the hook objects will be removed from the ledger. So your candidate will be purged even if it's elected.**

#### Dud Host Candidate
- The dud host removal Proposal represents the Xahau Address of the malfunctioning host to be removed from the platform. 
- Any Participant can submit this kind of proposal. 
- Proposers must collateralize their Proposal with EVR rewards worth 25% of the current moment's reward quota.
- Example
  - If you are willing to report a dud host, You have to know the host address you are going to propose.
  - Then report the host address with the Evernode CLI `evernode governance report <dud host address>`
    - Ex :- `evernode governance report rwFyhJ8v5X3iC7vBcqdoxKqMQ9jr7gDATu`

### Withdrawing a Proposal

- The Proposer can withdraw their Proposal at any time before it Succeeds or Purges.
- If the Proposal is withdrawn, the proposer gets half their EVRs back.
- Lost EVRs are added to that Epoch’s reward pool.
- Example
  - If you need to withdraw a proposal created by you, You have to find the Unique ID of the proposal.
  - You can find your candidate's Unique ID with `evernode governance status` command.
  - Then withdraw the candidate with the Evernode CLI `evernode governance withdraw <candidate id>`
    - Ex :- `evernode governance withdraw 0000000001ADDE77BB4F24A964B28DF299F084148F19E34B16E7BE4E5BC8E390`

### Purging a Proposal

- If a Proposal has not Succeeded three months after being proposed, it will be purged. If a Proposal expires, the Proposer loses all their staked EVRs.
- Lost EVRs are added to that Epoch’s reward pool.

### Voting

- Hosts can make their choice of voting via Evernode-Cli.
- Participant's vote is captured via their heartbeat, which is managed by Evernode software installed on the host.
- They either Support or Reject a Proposal.
  - Reject is the default.
  - Support is a positive vote for the Proposal.
- Example
  - If you are planing to support for a proposal, You first have to find the Unique ID of the proposal.
  - Then vote for the candidate with the Evernode CLI `evernode governance vote <candidate id>`
    - Ex :- `evernode governance vote 0000000001ADDE77BB4F24A964B28DF299F084148F19E34B16E7BE4E5BC8E390`
  - If you have voted for a candidate, your support vote will be sent for the candidate in every heartbeat you send from that moment onwards
  - If you need to undo your vote (remove the support vote), you can do that with the Evernode CLI `evernode governance unvote <candidate id>`
    - Ec :- `evernode governance unvote 0000000001ADDE77BB4F24A964B28DF299F084148F19E34B16E7BE4E5BC8E390`
  - From this moment onwards your support vote will be excluded from your heartbeats.
  - **Note: You cannot support vote for two new hook change candidates same time. You have to unvote before you vote for another. If the candidate you have voted for is elected, rejected, or withdrawn you have to unvote to clear it from your governance config to discontinue voting**
  - **Note: You can support vote for two candidates in different types (`dud host` and `new hook`) at the same time. If you have supported two or more in different types, multiple heartbeat (vote) transactions will be sent for each candidate**

### Electing a Proposal

- A Proposal succeeds if it is continuously Supported by at least 80% of possible Participants for 2 weeks.
- If a Proposal succeeds all other existing Proposals for that Hook are Purged and their staked EVRs are added to the Epoch’s reward pool.
- The Proposer of the successful proposal gets all their staked EVRs back.

### Evernode Labs Special Rights

- These rules apply when determining Evernode Labs' vote.

  - Always Eligible: Evernode Labs is always eligible to vote.
  - Fall-Back Option: If there are no other eligible Participants, Evernode Labs' vote is determinative.

- In addition, Evernode Labs' vote carries special weight depending upon the status of the game.
- The Governance Game has three statuses.

  - Piloted: Evernode Labs' vote determines the outcome of all Proposals.
  - Co-Piloted: No Proposal can succeed unless Evernode Labs Supports it and it fails if Evernode Labs opposes it.
  - Auto-Piloted: The standard voting rules apply with Evernode Labs being treated equally with any other Participant.

- The game begins Piloted and becomes Co-Piloted at the election of Evernode Labs.
- If it is Co-Piloted, it becomes Auto-Piloted at the election of Evernode Labs.
- If the game is Auto-Piloted, Participants can vote under standard rules to return the game to Piloted or Co-Piloted Status.
