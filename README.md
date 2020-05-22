!! Work in progress, kind of ready for testing the app !!
# DEV-version!!!
Start with:
```
git clone https://github.com/TeeVeeEss/pmi-j
cd pmi-j
git checkout es6
cd dist
npm run run-dev
```
Change your ip and port when needed in ``webpack.config.js`` and ``Dockerfile``.
Change the your node(s) in pmij.env
The Dockerfile is configured for DEV. You can start it with:
```
docker build -t teeveeess/pmij:dev .
docker run --name pmij-dev --rm --init -it --network=host -v /path/to/pmi-j/src:/opt/node_app/src -v /path/to/pmi-j/pmij.env:/opt/node_app/pmij.env -v /etc/localtime:/etc/localtime:ro,Z teeveeess/pmij:dev
```
Browse to http://your_ip:your_local_port to see what's happening at your fullnodes and their peers. Refreshed every 10 seconds, Warning popups when a node has no peers or more than 5 milestones behind

# PMI-J
Responsive IOTA Peer Manager.

PMI-J is a nodejs program for monitoring and managing IOTA peers connected with your IOTA nodes.
The original IPM is available at https://github.com/akashgoswami/ipm
To learn more about IOTA, please visit [iota.org](https://iota.org)


![pmij snapshot](/public/img/image.png)

** Note: Before running this program, you should run your IOTA IRI or at least have a known IRI URI which is accessible. **

## How to install
### Using Docker
Only local, not published...
```
git clone https://github.com/TeeVeeEss/pmi-j
cd pmi-j
```
The Dockerfile is still WIP, but can be modified for your own configuation by changing the last line in Dockerfile:
`CMD ["index.js", "-i", "http://192.168.178.12:14265", "-p", "192.168.178.22:9999"]`
This line is now configured for running PMI-J at http://192.168.178.22:9999 and your IRI is running at http://192.168.178.12:14265
Change the line to match your config. After that you can build the image with:
`docker build -t teeveeess/pmij:latest -t teeveeess/pmij:v0.1 .`
And run the container with:
`docker run --name pmi-j --rm --init -it --network=host teeveeess/pmij:latest`
The saving of Tags in pmij.conf is not available yet, need to check on the `-v` options of `docker run`
### Using npm package
Install this package by running this command: (not yet published...)
```
npm i -g pmij
```
#### How to run
```
pmij [--iri=iri_api_url] [--port=IP:your_local_port] [--refresh=interval]
  -i --iri       = The API endpoint for IOTA IRI implementation (Full Node).
  -p --port      = Local server IP and port where the dashboard web server should be running
  -r --refresh   = Refresh interval in seconds for IRI statistics gathering (default 10s)
  -h --help      = print this message

Example.
pmij -i http://127.0.0.1:14265 -p 127.0.0.1:8888
```
### Alternative while not published, using git and pm2
```
git clone https://github.com/TeeVeeEss/pmi-j
cd pmi-j
npm install
pm2 -n pmij start index.js -- -i http://127.0.0.1:14265 -p 127.0.0.1:8888
Replace in the command above the value after -i with your iri_api_url and after -p with your IP:your_local_port
```
If you want to run PMI-J always: use ``pm2 save`` to add PMI-J to your startup config.

PMI-J will connect to IOTA endpoint and produce the status at localhost port 8888. To view the dashboard, simply open a browser and point to http://127.0.0.1:8888

### As a daemon using systemd
Copy the file located in systemd/pmij.service to /etc/systemd/system/pmij.service, modify the parameters to match your setup.
Run `systemctl daemon-reload` for reloading your configuration. From here on you can use normal start/stop/status commands to manage pmij as a daemon.

## Persistent Tag
Any custom tag assigned to a peer will be saved inside user's home directory in file pmij.conf. In Windows this will be C:\Users\username and Linux it will be $HOME. If none of these could be found, it will try to create the file in current working directory.

## Peer management
PMI-J does not manage peers configured in IRI config files. If you delete or add a peer using the webpage of PMI-J and you want to save this set of neighbors:  please make sure to update it also in the IRI config.
