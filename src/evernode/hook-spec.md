# Evernode hook specification
The following sections describe the specification according to which the Evernode hook has been developed. The hook source code can be found [here](https://github.com/HotPocketDev/evernode-hook).

## Hook State
Evernode hook makes use of [xrpl hook state](https://xrpl-hooks.readme.io/docs/state-management) to store persistent or short-lived variables.

We use a 2-byte prefix for all state keys to avoid key naming collisions in the future with other hooks (this is a best-practice). See [state clobbering](https://xrpl-hooks.readme.io/docs/state-management#state-clobbering).

#### Evernode state key format
`[EVERNODE(EVR)(3)][key type(1)][Specific key bytes(28)]`

The first three bytes identifies that this is an Evernode state key. Fourth byte identifies the key type within Evernode. Rest of the 28 bytes contain the bytes specific for the key.

#### Singleton state keys
| Description | Key |
|--|--|
| Host count (Maintains total no. of registered hosts) | `STK_HOST_COUNT = EVR[50]00000....` |
| Auditor count (Maintains total no. of registered auditors) | `STK_AUDITOR_COUNT = EVR[51]00000....` |
| Ledger index when the CONF_MOMENT_SIZE last changed on | `STK_MOMENT_BASE_IDX = EVR[52]0000....` |
| Moment start index and the moment seed(ledger hash) for the current moment | `STK_MOMENT_SEED = EVR[53]0000....` |
| Last moment start index where rewards have been accumulated | `STK_ACCUMULATED_MOMENT_IDX = EVR[54]0000....` |
| Pool of reward amounts which are received on a audit failure | `STK_REWARD_POOL = EVR[55]0000....` |

#### Repetitive state keys

| Description | Prefix |
|--|--|
| Configuration keys (Holds paramateres tunable by governance game) | `STP_CONF = EVR[1]...` |
| Host id keys (Host registration entries for id-based lookup) | `STP_HOST_ID = EVR[2]...` |
| Host address keys (Host registration entries for xrpl address-based lookup) | `STP_HOST_ADDR = EVR[3]...` |
| Auditor id keys (Auditor registration entries for id-based lookup)| `STP_AUDITOR_ID = EVR[4]...` |
| Auditor address keys (Auditor registration entries for xrpl address-based lookup) | `STP_AUDITOR_ADDR = EVR[5]...` |
| Redeem operation keys (Keys to hold ongoing redeem opration statuses) | `STP_REDEEM_OP = EVR[6]...` |

## Hook Configuration
Evernode hook defines a set of tunable configuration parameters to govern the rules of the system. They are implemented as [xrpl hook sate](https://xrpl-hooks.readme.io/docs/state-management) objects. They can be changed in a decentralized manner via the governance game.

| Configuration | Default value | State key |
|--|--|--|
| No. of ledgers per _**moment**_ | `DEF_MOMENT_SIZE = 72` | `CONF_MOMENT_SIZE = 0x0001` |
| No. of Evers that will be ever issued. | `DEF_MINT_LIMIT = 25804800` | `CONF_MINT_LIMIT = 0x0002` |
| The host registration fee in Evers. | `DEF_HOST_REG_FEE = 5` | `CONF_HOST_REG_FEE = 0x0003` |
| The minimum amount of hosting token spending allowed in a redeem operation. | `DEF_MIN_REDEEM = 12` | `CONF_MIN_REDEEM = 0x0004` |
| Max no. of ledgers within which a redeem operation has to be serviced. | `DEF_REDEEM_WINDOW = 24` | `CONF_REDEEM_WINDOW = 0x0005` |
| No. of Evers rewarded per moment. | `DEF_REWARD = 64` | `CONF_REWARD = 0x0006` |
| Max no. of rewards per moment. | `DEF_MAX_REWARDS = 20` | `CONF_MAX_REWARD = 0x0007` |
| No. of maximum hosts that can be audited by a audit per moment. | `DEF_MAX_AUDIT = 5` | `CONF_MAX_AUDIT = 0x0008` |
| Moment frequency which host should keep recharging the hook (which used to track host aliveness). | `DEF_HOST_HEARTBEAT_FREQ = 1` | `CONF_HOST_HEARTBEAT_FREQ = 0x0009` |
| Default auditor address | `DEF_AUDITOR_ADDR = 0x...xrpadrress bytes...` | N/A |

#### About configuration state keys
State keys must be 32 bytes long. Therefore we must 'pad' the configuration state keys with zeros to fit 32 bytes. Therefore actual state key for a given configuration must be derived from a macro like this:
```
CONF_KEY(buf, confKey)
// which expands to:
STATE_KEY(buf, prefix, key, keyLen)
// which expands to:
buf = prefix + pad + key
```

#### About default values
Because the state values can only be "initialized" the first time they are used during a transaction processing, the default values must exist within the hook code. If a particular configuration value does not exist on the state, it has to be created with the default value indicated on the code.

# System Operations
Evernode uses XRPL transactions with attached memos to incorporate Evernode operation payloads. Evernode defines following operations.

## 1. Host Registration
**Transaction type:** Payment<br>
**Source:** Host<br>
**Destination:** Hook<br>
**Currency:** EVR<br>
**Min amount:** `CONF_HOST_REG_FEE`<br>
**Memo:**<br>
Type: `evnHostReg`<br>
Format: `text/plain`<br>
Data: `<hosting_token (UPPERCASE, 3 chars)>;<country_code (2 chars)>;<cpu_micro_sec (positive integer)>;<ram_mb (positive integer)>;<disk_mb (positive integer)>;<description (26 chars)>`

#### Generated transactions:
**Transaction type:** Trust Set<br>
**Source:** Hook<br>
**Destination:** Host<br>
**Currency:** `hosting_token`<br>
**Limit:** 999999999<br>

#### Added state:
Key: `STP_HOST_ID + host_count + 1`<br>
value: `<host_address(20)>`

Key: `STP_HOST_ADDR + host_address`<br>
Value: `<host_id(4)><hosting_token(3)><country_code(2)><cpu_microsec(4)><ram_mb(4)><disk_mb(4)><reserved(8)><description(26)>`

_**Note:** The first audit cycle and redeem will append `<audit_assigned_moment_start_idx(8)><auditor_addr(20)><rewarded_moment_start_idx(8)><accumulated_reward(8)><locked_token_amount(8)><last_heartbeat_ledger_idx(8)>` to this state value._

#### Modified state:
Key: `STK_HOST_COUNT`<br>
Value: `<new_host_count(4)>`

## 2. Host deregistration
**Transaction type:** Payment<br>
**Source:** Host<br>
**Destination:** Hook<br>
**Currency:** XRP<br>
**Amount:** Any<br>
**Memo:**<br>
Type: `evnHostDereg`<br>
Format: any<br>
Data: any<br>

#### Generated transactions:
**Transaction type:** Payment<br>
**Source:** Hook<br>
**Destination:** Host<br>
**Currency:** `hosting_token`<br>
**Amount:** Available balance

**Transaction type:** Trust Set<br>
**Source:** Hook<br>
**Destination:** Host<br>
**Currency:** `hosting_token`<br>
**Limit:** 0

#### Modified state:
Key: `STP_HOST_ID + deleted_host_id`<br>
Value: `<last_host_addr>`

Key: `STP_HOST_ADDR + last_host_addr`<br>
Value: `<deleted_host_id(4)><...>`

Key: `STK_HOST_COUNT`<br>
Value: `host_count - 1`

#### Deleted state:
Key: `STP_HOST_ADDR + host_address`

Key: `STP_HOST_ID + last_host_id`

## 3. Redeem
**Transaction type:** Payment<br>
**Source:** User<br>
**Destination:** Hook<br>
**Currency:** Anything other than XRP or EVR<br>
**Min amount:** `CONF_MIN_REDEEM`<br>
**Memo:**<br>
Type: `evnRedeem`<br>
Format: `base64`<br>
Data: `<encrypted instance requirements>`

#### Generated transactions:
**Transaction type:** Payment<br>
**Source:** Hook<br>
**Destination:** Host<br>
**Currency:** XRP<br>
**Amount:** any<br>
**Memo 1:**<br>
Type: `evnRedeem`<br>
Format: `base64`<br>
Data: `<encrypted instance requirements>`<br>
**Memo 2:**<br>
Type: `evnRedeemOrigin`<br>
Format: `hex`<br>
Data: `<user_addr(20)<amount(8)><hosting_token(3)><redeem_tx_hash(32)>`

#### Added state:
Key: `STP_REDEEM_OP + Redeem tx hash`<br>
Value: `<hosting_token(3)><amount(8)><host_addr(20)><lcl_index(8)><user_addr(20)>`

#### Modified state:
Key: `STP_HOST_ADDR + host_addr`<br>
Value: `<host_id(4)><hosting_token(3)><country_code(2)><cpu_microsec(4)><ram_mb(4)><disk_mb(4)><reserved(8)><description(26)><audit_assigned_moment_start_idx(8)><auditor_addr(20)><rewarded_moment_start_idx(8)><accumulated_reward(8)><locked_token_amount(8)><last_heartbeat_ledger_idx(8)>`

_**Note:** `<locked_token_amount(8)> += <amount(8)>`_

## 4. Redeem Success
**Transaction type:** Payment<br>
**Source:** Host<br>
**Destination:** Hook<br>
**Currency:** XRP<br>
**Amount:** any<br>
**Memo 1:**<br>
Type: `evnRedeemSuccess`<br>
Format: `base64`<br>
Data: `<encrypted instance_data>`<br>
**Memo 2:**<br>
Type: `evnRedeemRef`<br>
Format: `hex`<br>
Data: `<redeem tx hash>`<br>

#### Generated transactions:
**Transaction type:** Payment<br>
**Source:** Hook<br>
**Destination:** User<br>
**Currency:** XRP<br>
**Amount:** any<br>
**Memo 1:**<br>
Type: `evnRedeemSuccess`<br>
Format: `base64`<br>
Data: `<encrypted instance_data>`<br>
**Memo 2:**<br>
Type: `evnRedeemRef`<br>
Format: `hex`<br>
Data: `<redeem tx hash>`

**Transaction type:** Payment<br>
**Source:** Hook<br>
**Destination:** Host<br>
**Currency:** `<hosting_token>`<br>
**Amount:** `<redeemed amount>`

#### Deleted state:
Key: `STP_REDEEM_OP + Redeem tx hash`

#### Modified state:
Key: `STP_HOST_ADDR + host_addr`<br>
Value: `<host_id(4)><hosting_token(3)><country_code(2)><cpu_microsec(4)><ram_mb(4)><disk_mb(4)><reserved(8)><description(26)><audit_assigned_moment_start_idx(8)><auditor_addr(20)><rewarded_moment_start_idx(8)><accumulated_reward(8)><locked_token_amount(8)><last_heartbeat_ledger_idx(8)>`

_**Note:** `<locked_token_amount(8)> -= <redeemed amount>`_

## 5. Redeem Error
**Transaction type:** Payment<br>
**Source:** Host<br>
**Destination:** Hook<br>
**Currency:** XRP<br>
**Amount:** any<br>
**Memo 1:**<br>
Type: `evnRedeemError`<br>
Format: `text/json`<br>
Data: `{type:'REDEEM_ERROR'}`<br>
**Memo 2:**<br>
Type: `evnRedeemRef`<br>
Format: `hex`<br>
Data: `<redeem tx hash>`

#### Generated transactions:
**Transaction type:** Payment<br>
**Source:** Hook<br>
**Destination:** User<br>
**Currency:** XRP<br>
**Amount:** any<br>
**Memo 1:**<br>
Type: `evnRedeemError`<br>
Format: `text/json`<br>
Data: `{type:'REDEEM_ERROR'}`<br>
**Memo 2:**<br>
Type: `evnRedeemRef`<br>
Format: `hex`<br>
Data: `<redeem tx hash>`

## 6. Refund
**Transaction type:** Payment<br>
**Source:** User<br>
**Destination:** Hook<br>
**Currency:** XRP<br>
**Amount:** any<br>
**Memo:**<br>
Type: `evnRefund`<br>
Format: `hex`<br>
Data: `<redeem tx hash>`

#### Generated transactions:
** If success **<br>
**Transaction type:** Payment<br>
**Source:** Hook<br>
**Destination:** User<br>
**Currency:** `<hosting_token>`<br>
**Amount:** `<redeemed amount>`<br>
**Memo:**<br>
Type: `evnRefundSuccess`<br>
Format: `hex`<br>
Data: `<refund tx hash><redeem tx hash>`

** If error **<br>
**Transaction type:** Payment<br>
**Source:** Hook<br>
**Destination:** User<br>
**Currency:** `XRP`<br>
**Amount:** `any`<br>
**Memo:**<br>
Type: `evnRefundError`<br>
Format: `hex`<br>
Data: `<refund tx hash>`

#### Deleted state:
Key: `STP_REDEEM_OP + Redeem tx hash`

#### Modified state:
** If success **<br>
Key: `STP_HOST_ADDR + host_addr`<br>
Value: `<host_id(4)><hosting_token(3)><country_code(2)><cpu_microsec(4)><ram_mb(4)><disk_mb(4)><reserved(8)><description(26)><audit_assigned_moment_start_idx(8)><auditor_addr(20)><rewarded_moment_start_idx(8)><accumulated_reward(8)><locked_token_amount(8)><last_heartbeat_ledger_idx(8)>`

_**Note:** `<locked_token_amount(8)> -= <redeemed amount>`_

## 7. Audit Request
**Transaction type:** Payment<br>
**Source:** Auditor<br>
**Destination:** Hook<br>
**Currency:** XRP<br>
**Amount:** any<br>
**Memo:**<br>
Type: `evnAudit`<br>
Format: `<empty>`<br>
Data: `<reserved for future>`

#### Generated transactions:
**Transaction type:** CheckCreate<br>
**Source:** Hook<br>
**Destination:** Auditor<br>
**Currency:** `<hosting_token>`<br>
**Amount:** `CONF_MIN_REDEEM`<br>
**Memo:**<br>
Type: `evnAuditAssignment`<br>
Format: `<empty>`<br>
Data: `<reserved for future>`

#### Modified state:
Key: `STK_MOMENT_SEED`<br>
Value: `<moment_start_idx(8)><moment_seed(32)>`

Key: `STP_AUDITOR_ADDR + auditor_addr`<br>
Value: `<auditor_id(4)><moment_start_idx(8)>`

Key: `STP_HOST_ADDR + host_addr`<br>
Value: `<host_id(4)><hosting_token(3)><country_code(2)><cpu_microsec(4)><ram_mb(4)><disk_mb(4)><reserved(8)><description(26)><audit_assigned_moment_start_idx(8)><auditor_addr(20)><rewarded_moment_start_idx(8)><accumulated_reward(8)><locked_token_amount(8)><last_heartbeat_ledger_idx(8)>`

_**Note:** `<auditor_addr(20)>` of all the hosts which are getting assigned will be updated. The reward will append `<rewarded_moment_start_idx(8)>`. `<accumulated_reward(8)>` of all active hosts will get updated._

Key: `STK_ACCUMULATED_MOMENT_IDX`<br>
Value: `<moment_start_idx(8)>`

_**Note:** This will get updated only if rewards are accumulated in this request._

Key: `STK_REWARD_POOL`<br>
Value: `<pool_amount(8)>`

_**Note:** <pool_amount(8)> will be updated with host accumulations so far, if previous audits of a particular host does not has a reward._

## 8. Audit Success
**Transaction type:** Payment<br>
**Source:** Auditor<br>
**Destination:** Hook<br>
**Currency:** XRP<br>
**Amount:** any<br>
**Memo:**<br>
Type: `evnAuditSuccess`<br>
Format: `hex`<br>
Data: `<host_addr(20)`<br>

#### Generated transactions:
**Transaction type:** Payment<br>
**Source:** Hook<br>
**Destination:** Host<br>
**Currency:** EVR<br>
**Amount:** `CONF_REWARD / HOST_COUNT`<br>
**Memo:**<br>
Type: `evnReward`<br>
Format: `<empty>`<br>
Data: `<reserved for future>`

#### Modified state:
Key: `STP_HOST_ADDR + host_addr`<br>
Value: `<host_id(4)><hosting_token(3)><country_code(2)><cpu_microsec(4)><ram_mb(4)><disk_mb(4)><reserved(8)><description(26)><audit_assigned_moment_start_idx(8)><auditor_addr(20)><rewarded_moment_start_idx(8)><accumulated_reward(8)><locked_token_amount(8)><last_heartbeat_ledger_idx(8)>`

_**Note:** `<accumulated_reward(8)> = {0}`._

## 8. Audit Failure
**Transaction type:** Payment<br>
**Source:** Auditor<br>
**Destination:** Hook<br>
**Currency:** XRP<br>
**Amount:** any<br>
**Memo:**<br>
Type: `evnAuditFailure`<br>
Format: `hex`<br>
Data: `<host_addr(20)`

#### Modified state:
Key: `STK_REWARD_POOL`<br>
Value: `<pool_amount(8)>`

_**Note:** `<pool_amount(8)>` will be updated with host's `<accumulated_reward(8)>`._

Key: `STP_HOST_ADDR + host_addr`<br>
Value: `<host_id(4)><hosting_token(3)><country_code(2)><cpu_microsec(4)><ram_mb(4)><disk_mb(4)><reserved(8)><description(26)><audit_assigned_moment_start_idx(8)><auditor_addr(20)><rewarded_moment_start_idx(8)><accumulated_reward(8)><locked_token_amount(8)><last_heartbeat_ledger_idx(8)>`

_**Note:** `<accumulated_reward(8)> = {0}`._

## 8. Recharge
**Transaction type:** Payment<br>
**Source:** Host<br>
**Destination:** Hook<br>
**Currency:** Hosting Token<br>
**Min amount:** `CONF_MIN_REDEEM`<br>
**Memo:**<br>
Type: `evnRecharge`<br>
Format: `<empty>`<br>
Data: `<empty>`

#### Generated transactions:
** If `current token balance in hook - (locked_token_amount + MIN_REDEEM * (CONF_HOST_HEARTBEAT_FREQ + 1))) > 0` **<br>
**Transaction type:** Payment<br>
**Source:** Hook<br>
**Destination:** Host<br>
**Currency:** Hosting Token<br>
**Amount:** `current token balance in hook - (locked_token_amount + MIN_REDEEM * (CONF_HOST_HEARTBEAT_FREQ + 1)))`

#### Modified state:
Key: `STP_HOST_ADDR + host_addr`<br>
Value: `<host_id(4)><hosting_token(3)><country_code(2)><cpu_microsec(4)><ram_mb(4)><disk_mb(4)><reserved(8)><description(26)><audit_assigned_moment_start_idx(8)><auditor_addr(20)><rewarded_moment_start_idx(8)><accumulated_reward(8)><locked_token_amount(8)><last_heartbeat_ledger_idx(8)>`

_**Note:** `<last_heartbeat_ledger_idx(8)> = current ledger index`._