# Governance game

## Hooks
There are four Hooks

- Governance - Handles governance game
- Registry - Handles host registrations, issuing registration tokens
- Heartbeat - Handles heartbeats and rewards
- Reputation - Handles host reputations

The account associated with each hook remains constant, while the hooks themselves can be modified according to these rules.

Governance Game allows eligible participants in the Evernode network to propose and vote on the Evernode changes. These proposals will get accepted or purged according to a predetermined rule-set on received votes.

## Governance

### Types of proposals

- Proposal for a New Hook Candidate (All three hooks will be affected).
  - The Participant can submit a Proposal with new Hook hashes of above mentioned 4 Hooks. Once that Proposal is continuously supported by 80% of eligible Participants for 5 days, the existing hooks will be replaced by the proposed hooks.
  - One owner can have only one new hook candidate at a time.
  - Only one new hook candidate will get elected at a time.
  - One participant can vote for only one new hook candidate at a time.
- Proposal for removing a Dud Host.
  - The Participant can submit a Proposal with the Xahau address of the host which is determined as a dud.
  - One owner can have multiple dud host candidate at a time.
  - Multiple dud host candidates can get elected at a time.
  - One participant can vote for multiple dud host candidates at a time.
- Proposal for changing the governance mode to piloted. 
  - This proposal type will be created and handled automatically inside the hooks according to the current governing mode (if co piloted or auto piloted).

### Participants

There are two classes of participants in the Governance Game. Certain set of eligibility rules are considered when these participants are proposing and voting.
- Evernode Labs: Evernode Labs account.
- Hosts: Hosts in the network.

### Submitting a proposal

Any type of valid participants can propose only one new hook proposal at a time but they can propose multiple dud host proposals.
- **Evernode Labs**
  - Evernode Labs account.
- **Hosts**
  - Host accounts that are earning rewards, have held a registration token for the previous three consecutive months, and demonstrate active participation through consistent heartbeats for 10 days. (These thresholds are configured in hook states)

#### New Hook Candidate

- New Hook candidate Proposal represents the hashes `<governance_hooks_hash><registry_hook_hash><heartbeat_hook_hash><reputation_hook_hash>` of the new Hook to replace an existing Hook.
- Any valid participant for proposing can submit a Proposal for a new Hook.
- Proposers must collateralize their Proposal with EVR rewards equivalent to the current moment's reward quota.
- If proposing to update only one hook or subset of hooks, They should still keep the hashes in above order and place the existing hook hashes for the ones they aren't going to update.
- The hooks that bear the proposed hashes must be deployed to some existing Xahau account.
- Example
  - If you are willing to suggest a hook change you first have to `setHook` your updated hook code to 4 new accounts.
  - Then get each hook's hook hash (32 bytes as a hex string) using an explorer and construct the hash buffer in hex format in above mentioned order.
    - The total length of the buffer will be 128 bytes (256 characters in hex string).
  - Then create a text file with the above hex buffer string inside.
  - After that propose the candidate with the Evernode CLI `evernode governance propose <hash file> <short name>`
    - Ex:- `evernode governance propose ~/hooks.txt testProposal` (Short name will be a name that you can identify your proposal. This can consist of 20 characters. In here you can include any reference to your code pull requests as well. (Do not add white spaces in the middle))
  - **Note: You have to keep the hooks that you have proposed, inside the accounts that you have initially generated. Because if you remove or override them, the hook objects will be removed from the ledger. So your candidate will be purged even if it's elected.**

#### Dud Host Candidate
- The dud host removal Proposal represents the Xahau Address of the malfunctioning host to be removed from the platform. 
- Any valid participant for proposing can submit this kind of proposal. 
- Proposers must collateralize their Proposal with EVR rewards worth 25% of the current moment's reward quota.
- Example
  - If you are willing to report a dud host, You have to know the host address you are going to propose.
  - Then report the host address with the Evernode CLI `evernode governance report <dud host address>`
    - Ex :- `evernode governance report rwFyhJ8v5X3iC7vBcqdoxKqMQ9jr7gDATu`

**Note: The piloted mode candidate is not proposed by anyone. It's created when governance mode is changed to co-piloted and auto-piloted by hook itself with the Evernode Labs account as the owner.**

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
- For new hook proposals there's one winner at a time, When one proposal gets elected other proposals will get purged.
- Lost EVRs are added to that Epoch’s reward pool.
- This three months threshold is defined in the governance configuration which is in hook states.

### Voting

Any type of valid participants can vote only for one new hook or piloted mode proposal at a time but they can vote for multiple dud host proposals.
- **Evernode Labs**
  - Evernode Labs always has 1 vote and has special rights in Piloted and Co-Piloted modes and has no special rights over Auto-Piloted mode.
- **Hosts**
  - Reputable host accounts that are earning rewards, have held a registration token for the previous three consecutive months, and demonstrate active participation through consistent heartbeats for 10 days. (These thresholds are configured in hook states)

Voting is same for all three types of proposals, Participants can vote for proposals adhering to the above eligibility criteria.
- Hosts can make their choice of voting via Evernode-Cli.
- Participant's vote is captured via their heartbeat, which is managed by Evernode software installed on the host.
- They either Support or Reject a Proposal.
  - Reject is the default.
  - Support is a positive vote for the Proposal.
- When a vote is received to a proposal its' positive vote count is increased.
  - Positive vote count is kept under candidates' state as a property and get reset in each moment after updating the current status of the proposal.
- There's vote base count which is incremented when an eligible participant has sent the heartbeat and used to determine the support average.
  - This vote base count will get reset in each moment after updating the current status of the proposal.
  - Vote base count is stored in governance info state.
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

- A Proposal succeeds if it is continuously Supported by more than 80% of [eligible participants](#voting) for 5 days.
- Consideration of support average for an election is based on the current governance mode. The voting rules of each mode is mentioned [here](#evernode-labs-special-rights). (These thresholds are kept in hook states in the governance configuration.)
- If a Proposal succeeds all other existing Proposals for that Hook are Purged and their staked EVRs are added to the Epoch’s reward pool.
- The Proposer of the successful proposal gets all their staked EVRs back.

### Governance mode changing

- Evernode Labs has the authority to change the mode from Piloted to Co-Piloted or Auto-Piloted
- When the network is in Co-Piloted or Auto-Piloted modes, The piloted mode candidate is created automatically and standard voting rules in the current mode are considered for its' election.
- This candidate doesn't have a expiry, its' life is indefinite.
- When this candidate gets elected, the mode is changed to Piloted and Evernode Labs gains the full control over the governance.

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
