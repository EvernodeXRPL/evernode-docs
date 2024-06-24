# Sashimono
Sashimono is the software that gets installed in your host and is responsible of host management. This consists of 4 main components.
Sashimono binaries are located in `/usr/bin/sashimono` and configuration and data are located in `/etc/sashimono`
- Sashimono agent - Agent tool for instance and resource management
- Sashi CLI - CLI interface for Sashimono agent
- Message board - Middleman between Xahau ledger and Sashimono
- ReputationD - Host reputation management tool


## Sashimono Agent
Sashimono agent is the core software which manages your Evernode host. This has the system configurations for the Evernode instance management and resource allocation. The user configuration for Sashimono can be found in `/etc/sashimono/sa.cfg`

### Configuration

```json
{
    "version": "0.9.0",
    "hp": {
        "host_address": "evernode.example.com",
        "init_peer_port": 22861,
        "init_user_port": 26201,
        "init_gp_tcp_port": 36525,
        "init_gp_udp_port": 39064
    },
    "system": {
        "max_mem_kbytes": 3220800,
        "max_swap_kbytes": 6553520,
        "max_cpu_us": 800000,
        "max_storage_kbytes": 61303520,
        "max_instance_count": 3
    },
    "docker": {
        "registry_port": 4444
    },
    "log": {
        "log_level": "inf",
        "max_mbytes_per_file": 10,
        "max_file_count": 50,
        "loggers": [
            "console"
        ]
    }
}
```

#### Version
- **version**: Specifies the version of the Sashimono.

#### HotPocket instance config (`hp`)
Settings related to the HotPocket instance parameters.
- **host_address**: The domain address at which the host is reachable.
- **init_peer_port**: Start port for peer port range. (`init_peer_port` to `init_peer_port + max_instance_count` range will be assigned for peer ports if all the instances are occupied)
- **init_user_port**: Start port for user port range. (`init_user_port` to `init_user_port + max_instance_count` range will be assigned for user ports if all the instances are occupied)
- **init_gp_tcp_port**:  Start port for general purpose TCP port range. Two ports will be assigned per instance. (`init_gp_tcp_port` to `init_gp_tcp_port + (max_instance_count x 2)` range will be assigned for general purpose TCP ports if all the instances are occupied)
- **init_gp_udp_port**: Start port for general purpose UDP port range. Two ports will be assigned per instance. (`init_gp_udp_port` to `init_gp_udp_port + (max_instance_count x 2)` range will be assigned for general purpose UDP ports if all the instances are occupied)

#### System Parameters (`system`)
Settings related to the system resources. These resources will be equally shared and limited between all instances.
- **max_mem_kbytes**: Maximum memory in kilobytes that can be allocated for all the instances.
- **max_swap_kbytes**: Maximum swap space in kilobytes that can be allocated for all the instances.
- **max_cpu_us**: Maximum CPU usage in microseconds that can be allocated for all the instances.
- **max_storage_kbytes**: Maximum storage in kilobytes that can be allocated for all the instances.
- **max_instance_count**: Total number of instances allowed in the host.

#### Docker Configuration (`docker`)
Settings related to Docker.
- **registry_port**: Port number for the Docker registry.

#### Logging Configuration (`log`)
Settings related to logging.
- **log_level**: Level of logging.
  - Values: `"dbg", "inf", "wrn", "err"`
- **max_mbytes_per_file**: Maximum size of a log file in megabytes. A new log file will be created after this limit is reached
- **max_file_count**: Maximum number of log files to keep. Older fill will be removed at this limit.
- **loggers**: List of loggers to use.
  - Values:`"console"`

