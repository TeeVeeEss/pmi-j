import _ from 'lodash';
import './style.css';
// import Logo from './logo.png';
// import Data from './data.xml';
import printMe from './print.js';
import {composeAPI} from '@iota/core';
import swal from 'sweetalert';

/**
 * Default responsive header
 */
// const head = document.querySelector('head');
// const meta = document.createElement('meta');
// meta.innerHTML = 'name="viewport" ' +
//  'content="width=device-width, ' +
//  'initial-scale=1"';
// head.appendChild(meta);
// document.head.textContext +=
//  '<meta name="viewport" ' +
//  'content="width=device-width, ' +
//  'initial-scale=1" />';
console.log('This is index JS....!');
/**
 * Some testing lines how to select a html-node.
 * Connect to IRI endpoint.
 * iota.getNodeInfo to Show info of the IRI fullnode.
 * iota.getNeighbors to show peers, alert for not connected ones.
 * @return {str} formatted html.
 */
function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello!',
    'Welcom to the NEW ES6 Peer manager, now in DOCKER !'], ' ');
  element.classList.add('hello');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

  // Connect to IRI
  const iota = composeAPI({
    //    provider: 'http://127.0.0.1:14265',
    provider: '/api',
  });

  // Show getNodeInfo in console
  iota.getNodeInfo()
      .then((info) => {
        console.log(info);
        console.log(Object.entries(info));
      })
      .catch((error) => {
        console.log(`Request error: ${error.message}`);
      });

  // Show getNodeInfo in page
  //  alert('hmm, eerst maar simpel...');
  iota.getNodeInfo()
      .then((info) => {
        // return info.json();
        const aNodeInfo = Object.entries(info);
        const body = document.querySelector('body');
        // const div = document.createElement('div');
        // div.textContent = aNodeInfo;
        // body.appendChild(div);
        const div2 = document.createElement('div');
        div2.classList.add('nodeinfo');
        let str = '<div>Nodeinfo</div>';
        aNodeInfo.forEach(function(add) {
          str += '<div>'+add[0]+': '+add[1]+'</div>';
        });
        div2.innerHTML = str;
        body.appendChild(div2);
      })
      .catch((error) => {
        console.log(`Request error: ${error.message}`);
      });

  // Show getNeighbors in console
  iota.getNeighbors()
      .then((info) => {
        console.log(info);
        console.log(Object.entries(info));
        // console.log(info);
      })
      .catch((error) => {
        console.log(`Request error: ${error.message}`);
      });

  // Show getPeers in page
  iota.getNeighbors()
      .then((info) => {
        // return info.json();
        const aPeers = Object.entries(info);
        // const akPeers = Object.keys(aPeers);
        // swal("Toon aPeers", `${aPeers}`, "info");
        // swal("Toon akPeers", `${akPeers}`, "info");
        const body = document.querySelector('body');
        // const div = document.createElement('div');
        // div.textContent = Object.entries(aPeers[1]);
        // body.appendChild(div);
        const div2 = document.createElement('div');
        const str = 'Details of your peers<hr>';
        div2.innerHTML = str;
        div2.classList.add('peerinfo_connected');
        let peerCounter = 0;
        const totalPeers = aPeers.length;
        aPeers.forEach(function(oPeer) {
          peerCounter ++;
          let str = '';
          const div3 = document.createElement('div');
          div3.classList.add('peerinfo_connected');
          str += '<div> Peer '+peerCounter+' of '+totalPeers+'</div>';
          const aPeer = Object.entries(oPeer[1]);
          console.log(oPeer[1].connected);
          if (oPeer[1].connected == false) {
            div3.classList.replace('peerinfo_connected',
                'peerinfo_unconnected');
            swal('This peer is not connected:',
                `Domain: ${oPeer[1].domain}, 
                address: ${oPeer[1].address}`,
                'warning');
          }
          aPeer.forEach(function(Peer) {
            str += '<div>'+Peer[0]+': '+Peer[1]+'</div>';
            console.log(Peer[1]);
          });
          str += '<hr>';
          div3.innerHTML = str;
          div2.appendChild(div3);
        });
        //        div2.innerHTML = str;
        body.appendChild(div2);
      })
      .catch((error) => {
        console.log(`Request error: ${error.message}`);
      });

  // Add the image to our existing div.
  //  const myLogo = new Image();
  //  myLogo.src = Logo;

  //  element.appendChild(myLogo);

  //  console.log(Data);

  return element;
}

document.body.appendChild(component());
