!! Work in progress, absolute not ready for production or a working app !!
# PMI-J
Forked IOTA Peer Manager.

PMI-J is a nodejs program for monitoring and managing IOTA peers connected with your IOTA Reference Implementation (IRI, Java version)
The original IPM is available at https://github.com/akashgoswami/ipm
To learn more about IOTA, please visit [iota.org](https://iota.org)


![pmij snapshot](/public/img/pmij.png)

** Note: Before running this program, you should run your IOTA IRI or at least have a known IRI URI which is accessible. **

## How to install
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
