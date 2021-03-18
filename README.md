!! Work in progress, kind of ready for testing the app !!
# DEV-version!!!
Start with:
```
git clone https://github.com/TeeVeeEss/pmi-j
cd pmi-j
git checkout develop
cd dist
npm run run-dev
```
Change your ip and port when needed in ``webpack.config.js`` and ``Dockerfile``.
Change the your node(s) in pmij.env
The Dockerfile is configured for DEV. You can start it with:
```
docker build -t teeveeess/pmij:dev .
 docker run --name pmij-dev --rm --init -it --network=host -v /your/path/to/pmi-j/src:/opt/node_app/src -v /your/path/to/pmi-j/pmij.env:/opt/node_app/pmij.env -v /etc/localtime:/etc/localtime:ro,Z teeveeess/pmij:dev
```
Browse to http://your_ip:your_local_port to see what's happening at your fullnodes and their peers. 
Refreshed every 10 seconds.
Warning popups when a node has no peers or more than 5 milestones behind (disabled).
Unconnected peers (hornet) have other background color.

# PMI-J
Responsive IOTA Peer Manager.

PMI-J is a nodejs program for monitoring and managing IOTA peers connected with your IOTA nodes.
The original IPM is available at https://github.com/akashgoswami/ipm
To learn more about IOTA, please visit [iota.org](https://iota.org)


![pmij snapshot](/public/img/image.png)

** Note: Before running this program, you should run your IOTA node or at least have a known node URI which is accessible. **

## How to install
### Using Docker
Only local, not published...
```
git clone https://github.com/TeeVeeEss/pmi-j
cd pmi-j
```
(Check first lines...)
### Using npm package
Install this package by running this command: (not yet published...)
```
npm i -g pmij
```
#### How to run
```
```
### Alternative while not published, using git and pm2
```
git clone https://github.com/TeeVeeEss/pmi-j
cd pmi-j
npm install
pm2 -n pmij start (not tested yes with pm2)
```
If you want to run PMI-J always: use ``pm2 save`` to add PMI-J to your startup config.


### As a daemon using systemd
(not tested...)
Copy the file located in systemd/pmij.service to /etc/systemd/system/pmij.service, modify the parameters to match your setup.
Run `systemctl daemon-reload` for reloading your configuration. From here on you can use normal start/stop/status commands to manage pmij as a daemon.

## Persistent Tag
(not tested)
Any custom tag assigned to a peer will be saved inside user's home directory in file pmij.conf. In Windows this will be C:\Users\username and Linux it will be $HOME. If none of these could be found, it will try to create the file in current working directory.

## Peer management
(not tested)
PMI-J does not manage peers configured in IRI config files. If you delete or add a peer using the webpage of PMI-J and you want to save this set of neighbors: please make sure to update it also in the IRI config.
