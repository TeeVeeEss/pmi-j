// import _ from 'lodash';
import './style.css';
// import Logo from './logo.png';
// import Data from './data.xml';
// import printMe from './print.js';
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
// console.log('This is index JS....!');
// Lodash, now imported by this script
// const btn = document.createElement('button');

//  element.innerHTML = _.join(['Hello!',
//    'Welcom to the NEW ES6 Peer manager, now in DOCKER !'], ' ');
//  element.classList.add('hello');
//  element.id = 'maindiv';

//  btn.innerHTML = 'Click me and check the console!';
//  btn.onclick = printMe;

//  element.appendChild(btn);

// create nodeinfo and peerinfo div's in body
// const div1 = document.createElement('div');
// const div2 = document.createElement('div');
// div1.id = 'nodeinfo';
// div2.id = 'peerinfo';
// document.body.appendChild(div1);
// document.body.appendChild(div2);

/**
 * Connect to IRI endpoint.
 * iota.getNodeInfo to Show info of the IRI fullnode.
 * @return {str} formatted html.
 */
function divnodeinfo() {
  // Connect to IRI
  const iota = composeAPI({
  // the endpoint is defined as proxy in webpack-dev-server
    provider: '/api',
  });

  const element = document.createElement('div');
  // const btn = document.createElement('button');

  //  // Show getNodeInfo in console
  //  iota.getNodeInfo()
  //      .then((info) => {
  //        console.log(info);
  //        // console.log(Object.entries(info));
  //      })
  //      .catch((error) => {
  //        console.log(`Request error: ${error.message}`);
  //      });

  // Show getNodeInfo in page
  //  alert('hmm, eerst maar simpel...');
  iota.getNodeInfo()
      .then((info) => {
        // return info.json();
        const aNodeInfo = Object.entries(info);
        // const body = document.querySelector('body');
        // const div = document.createElement('div');
        // div.textContent = aNodeInfo;
        // body.appendChild(div);
        // const div2 = document.createElement('div');
        // div2.classList.add('nodeinfo');
        // div2.id = 'nodeinfo';
        element.classList.add('nodeinfo');
        element.id = 'nodeinfo';
        let str = '<div class="hello">Welcome to the NEW ES6 Peer manager'+
          ', now running in DOCKER !</div><div>Nodeinfo</div>';
        aNodeInfo.forEach(function(add) {
          str += '<div>'+add[0]+': '+add[1]+'</div>';
          if (add[0] == 'time') {
            const myDate = new Date(add[1]);
            str += '<div>Local Time: '+myDate.toLocaleString()+'</div>';
          }
        });
        // div2.innerHTML = str;
        element.innerHTML = str;
        // body.appendChild(div2);
        // element.appendChild(div2);
      })
      .catch((error) => {
        console.log(`Request error: ${error.message}`);
      });

  return element;
}


/**
 * Connect to IRI endpoint.
 * iota.getNeighbors to show peers, alert for not connected ones.
 * @return {str} formatted html.
 */
function divpeerinfo() {
  // Connect to IRI
  const iota = composeAPI({
  // the endpoint is defined as proxy in webpack-dev-server
    provider: '/api',
  });

  const element = document.createElement('div');

  // Show getNeighbors in console
  //  iota.getNeighbors()
  //      .then((info) => {
  //        console.log(info);
  //        // console.log(Object.entries(info));
  //        // console.log(info);
  //      })
  //      .catch((error) => {
  //        console.log(`Request error: ${error.message}`);
  //      });

  // Show getPeers in page
  iota.getNeighbors()
      .then((info) => {
        // return info.json();
        const aPeers = Object.entries(info);
        // const akPeers = Object.keys(aPeers);
        // swal("Toon aPeers", `${aPeers}`, "info");
        // swal("Toon akPeers", `${akPeers}`, "info");
        // const body = document.querySelector('body');
        // const div = document.createElement('div');
        // div.textContent = Object.entries(aPeers[1]);
        // body.appendChild(div);
        // const div2 = document.createElement('div');
        const str = '<div>Details of your peers<hr></div>';
        // div2.innerHTML = str;
        // div2.classList.add('peerinfo_connected');
        // div2.id = 'peerinfo';
        element.innerHTML = str;
        element.classList.add('peerinfo_connected');
        element.id = 'peerinfo';
        let peerCounter = 0;
        const totalPeers = aPeers.length;
        aPeers.forEach(function(oPeer) {
          peerCounter ++;
          let str = '';
          const div3 = document.createElement('div');
          div3.classList.add('peerinfo_connected');
          str += '<div>Peer '+peerCounter+' of '+totalPeers+'</div>';
          const aPeer = Object.entries(oPeer[1]);
          // console.log(oPeer[1].connected);
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
            // console.log(Peer[1]);
          });
          str += '<hr>';
          div3.innerHTML = str;
          // div2.appendChild(div3);
          element.appendChild(div3);
        });
        //        div2.innerHTML = str;
        // body.appendChild(div2);
        // element.appendChild(div2);
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

document.body.appendChild(divnodeinfo());
document.body.appendChild(divpeerinfo());

/**
 * Clean up the empty elements of a node
 * @param {str} node to be cleaned
 */
// function clean(node)
// {
//  for(var n = 0; n < node.childNodes.length; n ++)
//  {
//    var child = node.childNodes[n];
//    if
//    (
//      child.nodeType === 8
//      ||
//      (child.nodeType === 3 && !/\S/.test(child.nodeValue))
//    )
//    {
//      node.removeChild(child);
//      n --;
//    }
//    else if(child.nodeType === 1)
//    {
//      clean(child);
//    }
//  }
// }


// Rebuild page every 15 seconds
setInterval(function() {
//  let olddivs = document.getElementsById("nodeinfo");
//  console.log(olddivs);
//  while (olddivs.firstChild) {
//    olddivs.removeChild(olddivs.firstChild);
//    }
//  document.body.appendChild(component());
//  document.body.appendChild(divnodeinfo());
//  document.body.appendChild(divpeerinfo());
//  let oldnodeinfo = document.getElementsById('nodeinfo');
//  console.log(oldnodeinfo);
//  while (oldnodeinfo.firstChild) {
//    oldnodeinfo.removeChild(oldnodeinfo.firstChild);
//    }
//  const node1 = document.getElementById('nodeinfo');
//  if (node1.parentNode) {
//    node1.parentNode.removeChild(node1);
//  }
//  const node2 = document.getElementById('peerinfo');
//  if (node2.parentNode) {
//    node2.parentNode.removeChild(node2);
//  }
  const olddiv1 = document.getElementById('nodeinfo');
  const olddiv2 = document.getElementById('peerinfo');
  // if (olddiv1 !== null) {
  // olddiv1.remove();
  // }
  // if (olddiv2 !== null) {
  // olddiv2.remove();
  // }
  // clean(document.body);
  // document.body.appendChild(divnodeinfo());
  // document.body.appendChild(divpeerinfo());
  document.body.replaceChild(divnodeinfo(), olddiv1);
  document.body.replaceChild(divpeerinfo(), olddiv2);
  // document.body.appendChild(component());
}, 15000
);
