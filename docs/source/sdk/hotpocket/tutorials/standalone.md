# Running standalone HotPocket node

You can run a stand alone HotPocket node on your own using `evernode/hotpocket:latest-ubt.20.04-njs.20` docker image without using any development kits. Here, You have to do the node configurations manually by changing `hp.cfg`.

You can follow these steps to setup your standalone HotPocket node.

## Step 1 - Create volume for HotPocket
Create a volume directory in host machine for HotPocket.
- Example `${PWD}:/mycontract`

## Step 2 - Prepare new instance
```
docker run --rm --privileged -v "${PWD}/mycontract":/mycontract evernode/hotpocket:latest-ubt.20.04-njs.20 new /mycontract/contract
```
- In above command we provide volume directory and initiates HotPocket files inside in using `new` command. This container will get removed once it exits

## Step 3 - Prepare the contract
- Now go inside `${PWD}/mycontract/contract/contract_fs/seed/state` directory and place your contract binaries there.
  - Example: If you are running a NodeJs contract copy all the build files inside `dist` directory here.
- Now goto HotPocket config `${PWD}/mycontract/contract/cfg/hp.cfg` and update the [configuration](../reference/configuration.md)
  - Update `contratct.bin_path` and `contratct.bin_args` sections respective to your contract binary.
  - Example: If you are running a NodeJs contract and main js file is `index.js` then `contratct.bin_path="/usr/bin/node"` and `contratct.bin_args="index.js"`

## Step 4 - Run the contract
```
docker run -it --privileged -p 8080:8080 -p 22860:22860 --restart unless-stopped -v "${PWD}/mycontract":/mycontract --name mycontract evernode/hotpocket:latest-ubt.20.04-njs.20 run /mycontract/contract
```
- In above command **8080** port is configured as user port inside the `hp.cfg` `user.port` section and **22860** as peer port inside the `hp.cfg` `mesh.port` section so we are doing the port mapping for those ports.
  - You can change the ports in `hp.cfg` and port mapping if you need.
- Here we provide the volume directory we prepared for docker to use as contract directory.