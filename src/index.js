import './style.css';
// import Logo from './logo.png';
// import Data from './data.xml';
// import printMe from './print.js';
import {composeAPI} from '@iota/core';
// import React from "react";
// import ReactDOM from 'react-dom';
// import App from './test_recursive.js';
// import swal from 'sweetalert';
// import yargs from 'yargs';

// const { ClientBuilder } = require('@iota/client')
import {ClientBuilder} from '@iota/client';
const client = new ClientBuilder()
    .node('https://api.lb-0.testnet.chrysalis2.com')
    .build();
client.getInfo().then(console.log).catch(console.error);

/**
 * Take a single camel case string and convert it to a string of separate
 * @param {str} inCamelCaseString  The to be converted property-name.
 * words (with spaces) at the camel-case boundaries. Show iota.properties
 * as Human readable title.
 * @return {str} formatted propertie.
 */
function camelCaseToTitleCase(inCamelCaseString) {
  const result = inCamelCaseString
  // "To Get YourGEDIn TimeASong About The26ABCs IsOf The Essence
  // ButAPersonalIDCard For User456In Room26AContainingABC26Times IsNot AsEasy
  // As123ForC3POOrR2D2Or2R2D"
      .replace(/([A-Z][a-z])([A-Z])/g, '$1 $2')
  // "To Get YourGEDIn TimeASong About The26ABCs Is Of The Essence
  // ButAPersonalIDCard For User456In Room26AContainingABC26Times
  // Is Not As Easy As123ForC3POOr R2D2Or2R2D"
      .replace(/([a-z])([A-Z]+[a-z])/g, '$1 $2')
  // "To Get Your GEDIn Time ASong About The26ABCs Is Of The Essence
  // But APersonal IDCard For User456In Room26AContainingABC26Times
  // Is Not As Easy As123ForC3POOr R2D2Or2R2D"
      .replace(/([A-Z]+)([A-Z][a-z][a-z])/g, '$1 $2')
  // "To Get Your GEDIn Time A Song About The26ABCs Is Of The Essence
  // But A Personal ID Card For User456In Room26A ContainingABC26Times
  // Is Not As Easy As123ForC3POOr R2D2Or2R2D"
      .replace(/([a-z]+)([A-Z0-9]+)/g, '$1 $2')
  // "To Get Your GEDIn Time A Song About The 26ABCs Is Of The Essence
  // But A Personal ID Card For User 456In Room 26A Containing ABC26Times
  // Is Not As Easy As 123For C3POOr R2D2Or 2R2D"

  // Note: the next regex includes a special case to exclude plurals of
  // acronyms, e.g. "ABCs"
      .replace(/([A-Z]+)([A-Z][a-rt-z][a-z]*)/g, '$1 $2')
  // "To Get Your GED In Time A Song About The 26ABCs Is Of The Essence
  // But A Personal ID Card For User 456In Room 26A Containing ABC26Times
  // Is Not As Easy As 123For C3PO Or R2D2Or 2R2D"
      .replace(/([0-9])([A-Z][a-z]+)/g, '$1 $2')
  // "To Get Your GED In Time A Song About The 26ABCs Is Of The Essence
  // But A Personal ID Card For User 456In Room 26A Containing ABC 26Times
  // Is Not As Easy As 123For C3PO Or R2D2Or 2R2D"

  // Note: the next two regexes use {2,} instead of + to add space on phrases
  // like Room26A and 26ABCs but not on phrases like R2D2 and C3PO"
      .replace(/([A-Z]{2,})([0-9]{2,})/g, '$1 $2')
  // "To Get Your GED In Time A Song About The 26ABCs Is Of The Essence
  // But A Personal ID Card For User 456 In Room 26A Containing ABC 26
  // Times Is Not As Easy As 123 For C3PO Or R2D2 Or 2R2D"
      .replace(/([0-9]{2,})([A-Z]{2,})/g, '$1 $2')
  // "To Get Your GED In Time A Song About The 26 ABCs Is Of The Essence
  // But A Personal ID Card For User 456 In Room 26A Containing ABC 26
  // Times Is Not As Easy As 123 For C3PO Or R2D2 Or 2R2D"

  // "public_key" to "public key"
      .replace(/_/g, ' ')
  // Remove unneeded spaces
      .trim();

  // capitalize the first letter
  return result.charAt(0).toUpperCase() + result.slice(1);
}


/**
 * Show iotas as human readable like Gi
 * @param {int} iotas The to be converted number of iotas.
 * @param {int} decimals Number of decimals, default 2
 * iotas is numeric
 * @return {str} is smth like 3.2 Gi.
 */
function formatIotas(iotas, decimals = 2) {
//  if (bytes === 0) return '0 iotas';
  if (iotas === 0) return '0 iota';

  //  const k = 1024;
  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  //  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const sizes = ['i', 'Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei', 'Zi', 'Yi'];

  const i = Math.floor(Math.log(iotas) / Math.log(k));

  return parseFloat((iotas / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Create provider string to IOTA endpoint.
 * @param {str} provider  The to be connected node.
 * providerstr is address:port.
 * @return {provider} is string.
 */
function createprovider(provider) {
  // for dev the endpoint is defined as proxy in webpack-dev-server
  // for prod it's in env-variables in pmij.env
  let providerstr = '';
  //  if (process.env.NODE_ENV == 'production') {
  if (process.env.NODE_ENV == 'development') {
    if (provider == 'iota') {
      providerstr += 'http://' +
        process.env.IRI_NODE_IP + ':' +
        process.env.IRI_NODE_PORT;
    };
    if (provider == 'iota2') {
      providerstr += 'http://' +
        process.env.IRI_NODE_IP_2 + ':' +
        process.env.IRI_NODE_PORT_2;
    };
    if (provider == 'hornet') {
      providerstr += 'https://' +
        process.env.IRI_NODE_IP_4 + ':' +
        process.env.IRI_NODE_PORT_4;
    };
    if (provider == 'comnet') {
      providerstr += 'http://' +
        process.env.IRI_NODE_IP_3 + ':' +
        process.env.IRI_NODE_PORT_3;
    };
    if (provider == 'goshimmer') {
      providerstr += 'http://' +
        process.env.IRI_NODE_IP_5 + ':' +
        process.env.IRI_NODE_PORT_5;
    };
    if (provider == 'goshimmer2') {
      providerstr += '//xeevee.net:18080';
      //        process.env.IRI_NODE_IP_5 + ':' +
      //        process.env.IRI_NODE_PORT_5;
    };
    if (provider == 'cpt2') {
      providerstr += 'http://' +
        process.env.IRI_NODE_IP_3 + ':' +
        process.env.IRI_NODE_PORT_3 +
        '/api/v1/';
    };
  } else {
    providerstr += '/api';
  }
  console.log('Probed node: ' + providerstr);
  return providerstr;
}

/**
 * Iterate over a JSON of unknown depth.
 * @param {str} data some info from an IOTA API.
 * @param {str} type return header or detail.
 * @param {str} strn already formatted json.
 * @param {array} headern already formatted array.
 * @param {array} detailn already formatted array.
 * data is JSON.
 * @return {str} str is formatted html.
 */
function iterate(data, type, strn, headern, detailn) {
  const headers = headern;
  const details = detailn;
  const typeofdata = typeof data;
  let str = strn;
  let start = '';
  let end = '';
  switch (typeofdata) {
    case 'object':
      for (const entry of data) {
        if (entry[1] == null) {
          entry[1] = '(null)';
        }
        const typeofvalue = typeof entry[1];
        switch (typeofvalue) {
          case 'object':
            // Print all founded headers and details
            if (headers.length > 0) {
              str += '</tr><tr>';
              start = '<th>';
              end = '</th>';
              for (let i = 0; i < headers.length; i++) {
                str += start +
                  camelCaseToTitleCase(headers[i]) +
                  end;
              }
              str += '</tr><tr>';
              start = '<td>';
              end = '</td>';
              for (let i = 0; i < headers.length; i++) {
                str += start;
                if (headers[i].match(/time/) == null) {
                  str += details[i];
                } else {
                  str += Date(details[i]).toLocaleString();
                }
                str += end;
              }
              str += '</tr><tr>';
              // Clear headers and details as they are placed
              headers.length = 0;
              details.length = 0;
            }
            if (Array.isArray(entry[1])) {
              // Array found, loop all rows
              for (let a = 0; a < entry[1].length; a++) {
                if (typeof entry[1][a] == 'object') {
                  // Nested Object, iterate it
                  str += '</tr><tr><th' + ' colspan=' +
                    Object.keys(entry[1][a]).length +
                    // map.size +
                    '>' + camelCaseToTitleCase(entry[0]) +
                    ' (' + (a+1) + ' of ' +
                    entry[1].length + ')' +
                    //  ' (' + Object.keys(entry[1][a]).length + ')' +
                    // ' (' + map.size + ')' +
                    '</th></tr><tr>';
                  const nestedarraymap = new Map(Object.entries(entry[1][a]));
                  str += iterate(nestedarraymap, 'header', '', [], []);
                } else {
                  // Simple row, collect all values in one cell
                  headers.push(entry[0] +
                    // ' (' + (a+1) + ' of ' +
                    ' (' + entry[1].length + ')');
                  // details.push(entry[1][a]);
                  details.push(entry[1].toString());
                  break;
                }
              }
            } else {
              // Nested Object, iterate it
              str += '</tr><tr><th' + ' colspan=' +
                Object.keys(entry[1]).length +
                // map.size +
                '>' + camelCaseToTitleCase(entry[0]) +
                ' (' + Object.keys(entry[1]).length + ')' +
                // ' (' + map.size + ')' +
                '</th></tr><tr>';
              const nestedmap = new Map(Object.entries(entry[1]));
              str += iterate(nestedmap, 'header', '', [], []);
            }
            break;
          default:
            // Single key + value!
            headers.push(entry[0]);
            details.push(entry[1]);
            // str += '<td>' +
            //   // entry[0].toString() +
            //   entry[0] +
            //   '</td>';
            // str += '<td>' +
            //   // entry[1].toString() +
            //   entry[1] +
            //   '</td></tr><tr>';
            break;
        }
      }
      break;
    case 'number':
    case 'string':
    default:
      // Single Key + Value
      headers.push(entry[0]);
      details.push(entry[1]);
      break;
  }
  start = '<th>';
  end = '</th>';
  for (let i = 0; i < headers.length; i++) {
    str += start +
      // camelCaseToTitleCase(headers[headers.length-1]) +
      camelCaseToTitleCase(headers[i]) +
      end;
  }
  str += '</tr><tr>';
  start = '<td>';
  end = '</td>';
  for (let i = 0; i < headers.length; i++) {
    str += start;
    if (headers[i].match(/time/) == null) {
      str += details[i];
    } else {
      str += Date(details[i]).toLocaleString();
    }
    str += end;
  }
  // Clear headers and details as they are placed
  headers.length = 0;
  details.length = 0;
  // console.log('str: ' + str);
  return str;
}

/**
 * Fetch JSON from Chrysalis pt2 endpoint.
 * @param {str} provider  The to be connected node.
 * @param {str} type  node-info or peer-info.
 * providerstr is address:port.
 * @return {element} is formatted html.
 */
function connectcpt2(provider, type) {
  // Chrysalis pt 2 info curl -vv http://192.168.178.100:14265/api/v1/info|jq
  // Chrysalis pt 2 peers curl -vv http://192.168.178.100:14265/api/v1/peers|jq
  // using pmij.env
  const providerstr = createprovider(provider)+type;
  const element = document.createElement('container');
  switch (type) {
    case 'info':
      element.classList.add('nodeinfo');
      element.id = 'nodeinfo_h_' + provider;
      break;
    case 'peers':
      element.classList.add('peerinfo');
      element.id = 'peerinfo_' + provider;
  }
  let elementstr = '<table class="table-striped table-hover'+
    ' table-bordered table-responsive" '+
    'style="text-align:center">';
  elementstr += '<tr>';
  elementstr += '<th>Node name</th>';
  //  elementstr += '<th>Node ID</th>';
  //  elementstr += '<th>Public Key</th>';
  elementstr += '<th>Node API</th>';
  elementstr += '</tr><tr>';
  elementstr += '<td>'+provider+'</td>';
  elementstr += '<td>'+providerstr+'</td>';
  elementstr += '</tr><tr>';
  /* Fetch method */
  (async () => {
    try {
      // let promise = fetch(providerstr);
      const response = await fetch(providerstr);
      if (response.ok) {
        // const json = await response.json();
        const jsonmap = new Map(Object.entries(await response.json()));
        //        let x;
        //        let y;
        console.log('Fetched: ' + jsonmap);
        //        for (x in json) {
        //          if ({}.hasOwnProperty.call(json, x)) {
        //            elementstr += '<th>'+
        //         camelCaseToTitleCase(x)+'</th>';
        //          }
        //        }
        //        elementstr += '<td>'+json.identityID+'</td>';
        //        elementstr += '<td>'+json.publicKey+'</td>';
        // elementstr += '<pre>' + JSON.stringify(json) + '</pre>';
        elementstr += iterate(jsonmap, 'header', '', [], []);
        //        for (y in json) {
        //          if ({}.hasOwnProperty.call(json, y)) {
        //            elementstr += '<td>'+
        //         json[y]+'</td>';
        //          }
        //        }
        //        elementstr += iterate(json, 'detail', '', [], []);
        elementstr += '</tr>';
        elementstr += '<p>--- Màrrria ----</p></table>';
        //      elementstr += '</table>';
        element.innerHTML = elementstr;
        return element;
      } else {
        console.log('Fetch error: ' + response.status);
      }
    } catch (e) {
      console.log('Catched fetch error: ' + e);
    }
  })();
  return element;
};


/**
 * Fetch JSON from Goshimmer endpoint.
 * @param {str} provider  The to be connected node.
 * @param {str} type  node-info or peer-info.
 * providerstr is address:port.
 * @return {element} is formatted html.
 */
function connectgoshimmer(provider, type) {
  // Goshimmer info curl -vv -X GET http://192.168.178.100:8080/info|jq
  // Goshimmer peers curl -vv -X GET http://192.168.178.100:8080/autopeering/neighbors|jq
  // Goshimmer info curl http://xeevee.net:9080/info|jq
  // Goshimmer peers curl http://xeevee.net:9080/autopeering/neighbors|jq
  // Connect to Goshimmer, fetch either node- or peer-info
  // using pmij.env
  const providerstr = createprovider(provider)+type;
  const element = document.createElement('container');
  switch (type) {
    case '/info':
      element.classList.add('nodeinfo');
      element.id = 'nodeinfo_h_' + provider;
      break;
    case '/autopeering/neighbors':
      element.classList.add('peerinfo');
      element.id = 'peerinfo_' + provider;
  }
  let elementstr = '<table class="table-striped table-hover'+
    ' table-bordered table-responsive" '+
    'style="text-align:center">';
  elementstr += '<tr>';
  elementstr += '<th>Node name</th>';
  //  elementstr += '<th>Node ID</th>';
  //  elementstr += '<th>Public Key</th>';
  elementstr += '<th>Node API</th>';
  elementstr += '</tr><tr>';
  elementstr += '<td>'+provider+'</td>';
  elementstr += '<td>'+providerstr+'</td>';
  elementstr += '</tr><tr>';
  //  elementstr += '<tr class="text-break">';

  /* Fetch method */
  (async () => {
    try {
      const response = await fetch(providerstr);
      if (response.ok) {
        const jsonmap = new Map(Object.entries(await response.json()));
        console.log('Fetched: ' + jsonmap);
        elementstr += iterate(jsonmap, 'header', '', [], []);
        elementstr += '</tr>';
        elementstr += '<p>--- Màrrria ----</p></table>';
        element.innerHTML = elementstr;
        return element;
      } else {
        console.log('Fetch error: ' + response.status);
      }
    } catch (e) {
      console.log('Catched fetch error: ' + e);
    }
  })();
  // End fetch menthod
  return element;
};


/**
 * Create API-object IRI endpoint.
 * @param {str} provider  The to be connected node.
 * providerstr is address:port.
 * @return {provider} is object.
 */
function connectnode(provider) {
  const providerstr = createprovider(provider);
  // Connect to IRI
  const iota = composeAPI({
    provider: providerstr,
  });
  return iota;
}

/**
 * Fetch node info from IRI endpoint.
 * iota.getNodeInfo to Show info of the IRI fullnode.
 * @param {str} node - node to connect
 * @return {str} formatted html.
 */
function divnodeinfoHline(node) {
  const iota = connectnode(node);
  const element = document.createElement('container');
  const providerstr = createprovider(node);
  const mainnetadr =
    'CGPGFKBHXRHWLWLXZOSFTWOAFIOCOFPTIAFBMIVS9BTJM'+
    'IHOSQL9RKSXXPBW9NGQCXMUP9CPGUEDMGHMCYQQ9HDD9X';
  let saldo = 0;
  let elementstr = '';
  iota.getNodeInfo()
      .then((info) => {
        const syncdiff = info.latestMilestoneIndex -
          info.latestSolidSubtangleMilestoneIndex;
        const myDate = new Date(info.time);
        element.classList.add('nodeinfo');
        element.id = 'nodeinfo_h_' + node;
        elementstr += '<table class="table-striped table-hover'+
          ' table-bordered table-responsive" style="text-align:center">';
        elementstr += '<tr>';
        elementstr += '<th>Node name</th>';
        elementstr += '<th>Node Alias</th>';
        elementstr += '<th>Local Time</th>';
        elementstr += '<th>Node API</th>';
        elementstr += '<th>App name</th>';
        elementstr += '<th>App version</th>';
        // elementstr += '<th>Db size</th>';
        elementstr += '<th>LM</th>';
        elementstr += '<th>LSM</th>';
        elementstr += '<th>Snapshot</th>';
        elementstr += '<th>Tips</th>';
        if (info.appName == 'IRI') {
          elementstr += '<th>Connected peers</th>';
        }
        if (info.appName == 'HORNET') {
          elementstr += '<th>Known peers</th>';
        }
        elementstr += '<th>Sync status</th>';
        elementstr += '<th>Features</th>';
        elementstr += '</tr><tr>';
        elementstr += '<td>'+node+'</td>';
        elementstr += '<td>'+info.nodeAlias+'</td>';
        elementstr += '<td>'+myDate.toLocaleString()+'</td>';
        elementstr += '<td>'+providerstr+'</td>';
        elementstr += '<td>'+info.appName+'</td>';
        elementstr += '<td>'+info.appVersion+'</td>';
        // elementstr += '<td>'+formatIotas(info.dbSizeInBytes, 3)+'</td>';
        elementstr += '<td>'+info.latestMilestoneIndex+'</td>';
        elementstr += '<td>'+info.latestSolidSubtangleMilestoneIndex+'</td>';
        elementstr += '<td>'+info.lastSnapshottedMilestoneIndex+'</td>';
        elementstr += '<td>'+info.tips+'</td>';
        elementstr += '<td>'+info.neighbors+'</td>';
        switch (syncdiff) {
          case 0:
            if (info.neighbors == 0) {
              // Synced, but no peers
              elementstr += '<td class="node_warn_synced">' +
              'Sync status unknown, no peers</td>';
              break;
            }
            // Synced, 1 or more peers
            elementstr += '<td class="node_synced">' +
            'Synced</td>';
            break;
          case 1:
            // 1 behind!
            elementstr += '<td class="node_warn_synced">'+
            syncdiff +
            ' milestone behind</td>';
            break;
          case 2, 3, 4, 5:
            // a few behind!
            elementstr += '<td class="node_warn_synced">'+
            syncdiff +
            ' milestones behind</td>';
            break;
          default:
            // Unsynced!
            elementstr += '<td class="node_unsynced">'+
            'Unsynced, ' + syncdiff +
            ' milestones behind !!</b></div>';
//            const div = document.createElement('div');
//            div.innerHTML = 'The node ' + providerstr +
//            'is ' + syncdiff +
//            ' milestones behind !!';
//            swal({
//              title: 'Unsynced',
//              content: div,
//              icon: 'warning',
//              timer: 5000,
//            });
        }
        elementstr += '<td class="text-break">'+
          camelCaseToTitleCase(info.features.toString())+'</td>';
        elementstr += '<p>--- Màrrria ----</p></table>';
        /* Full getNodeInfo
                const aNodeInfo = Object.entries(info);
                elementstr += '<table class="table-striped table-hover'+
                  ' table-bordered table-responsive" '+
                  'style="text-align:center">';
                elementstr += '<tr class="text-break">';
                aNodeInfo.forEach(function(add) {
                  elementstr += '<th>'+
                  camelCaseToTitleCase(add[0])+'</th>';
                });
                elementstr += '</tr><tr class="text-break">';
                aNodeInfo.forEach(function(add) {
                  elementstr += '<td class="text-break iota_address">' +
                  add[1]+'</td>';
                });
                elementstr += '</tr>';
                elementstr += '</table>';
                console.log(`elementstr: ${elementstr}`);
        */ // End full getNodeInfo
        element.innerHTML = elementstr;
      })
      .catch((error) => {
        console.log(`Request error: ${error.message}`);
      });

  // Fetch the balance from a Mainnet address
  if (node !== 'comnet') {
    iota
        .getBalances([mainnetadr])
        .then(({balances}) => {
          saldo += balances[0];
          elementstr +=
          '<div>Mainnet tokens on address from 1 seed</div>'+
          '<div>' + mainnetadr + ': ' + formatIotas(saldo) + '</div>';
          element.innerHTML = elementstr;
        })
        .catch((err) => {
        // console.error(err);
          console.log(`Request error: ${err.message}`);
          elementstr +=
          '<div>Error fetching balance: '+ err.message +'</div>';
          element.innerHTML = elementstr;
        });
  }
  return element;
}


/**
 * Fetch peer info from IRI endpoint.
 * iota.getNeighbors to show peers, alert for not connected ones.
 * @param {str} node - node to connect
 * @return {str} formatted html.
 */
function divpeerinfo(node) {
  // Connect to IRI
  const iota = connectnode(node);
  //  const providerstr = createprovider(node);
  const element = document.createElement('container');

  // Show getPeers in div, format as table
  iota.getNeighbors()
      .then((info) => {
        const aPeers = Object.entries(info).sort(function(a, b) {
          return b[1].numberOfAllTransactions - a[1].numberOfAllTransactions;
        });
        let elementstr = '';
        //        let elementstr = '<div>Details peers of node '+
        //          ' IRI IP: ' + providerstr +
        //          '</div>';
        //        '<div class="container">';
        //        '<div class="row">';
        element.classList.add('peerinfo_connected');
        element.id = 'peerinfo_'+node;
        //        let UnconnectedPeers = '';
        const totalPeers = aPeers.length;
        let peerCounter = 1;
        let peerCounterUnconnected = 0;
        // Peers in Table
        // open container for table
        //        elementstr += '<div class="container">'+
        elementstr += '<table class="table-striped table-hover'+
          ' table-bordered table-responsive" style="text-align:center">';
        peerCounter = 1;
        aPeers.forEach(function(oPeer) {
          //          const fixHornetpeer = (arr, index, newItem) => [
          //            ...arr.slice(0,index), newItem, ...arr.slice(index)
          //            ];
          if (oPeer[1].alias === undefined &&
            Object.entries(oPeer[1]).length > 12) {
            oPeer[1].alias = 'none';
          }
          if (oPeer[1].autopeeringId === undefined &&
          Object.entries(oPeer[1]).length > 12) {
            oPeer[1].autopeeringId = 'none';
          }
          const aPeer = Object.entries(oPeer[1]).sort();
          let str = '<tr>';
          if (oPeer[1].connected == false) {
            str = '<tr class="table-warning">';
            peerCounterUnconnected ++;
            //            UnconnectedPeers += '<div>Domain: '+
            //              oPeer[1].domain+
            //              ', address: '+oPeer[1].address+
            //              '</div>';
          }
          switch (peerCounter) {
            case 1:
              // Header
              str += '<th>'+
              'Peer Counter</th>';
              aPeer.forEach(function(Header) {
                if (Header[0] !== 'connectionType') {
                  str += '<th>'+
                  camelCaseToTitleCase(Header[0])+'</th>';
                }
              });
              str += '</tr><tr class="text-break">';
            default:
              // Values
              str += '<td>';
              str += peerCounter+' of '+totalPeers+'</td>';
              aPeer.forEach(function(Peer) {
                if (Peer[0] !== 'connectionType') {
                  str += '<td>'+Peer[1]+'</td>';
                }
              });
          }
          str += '</tr>';
          peerCounter ++;
          elementstr += str;
          if (peerCounterUnconnected > 2) {
            str += '</tr><tr class="table-danger">';
            str += '<td>Warning, more than 2 Peers disconnected</td>';
            str += '</tr>';
          }
          str += '</table>';
        });
        elementstr += '</div>';
        element.innerHTML = elementstr;
      })
      .catch((error) => {
        console.log(`Request error: ${error.message}`);
      });
  return element;
}

/**
 * Fetch IOTA address from comnet endpoint.
 * Show in console and div.
 * @return {str} formatted html.
 */
// function comnetAdres() {
//  // /////////////////////////////
//  // Create an address from a new seed
//  // ///
//  // First: run this code in a unix based terminal
//  //        to generate an 81 Tryte seed.
//  // 'cat /dev/urandom |LC_ALL=C tr -dc 'A-Z9' | fold -w 81 | head -n 1'
//  // Paste the output of the above code into the 'seed' section below.
//  // /////////////////////////////
//
//  const iota = connectnode('comnet');
//  const element = document.createElement('container');
//  element.classList.add('nodeinfo');
//  element.id = 'comnet_tokens_XeeVee';
//  const firstaddress =
//  'HCUIZQALXEGDUENRCQDHKEBVBKGDS9NAMCTALLMVRZRGPG'+
//  'ZO9BUUKNUQEJTVYGASBSRMHML9OWKGB9MIW'+'QVBSXV9NX';
//  const secondaddress =
//  'BWQBEEWMIJXVAQEFMKESV9FMXFWKPWNHYB9YGOUJ9TSLYE'+
//  'YEADPEHOEBXRLGOFBAJNMRMJAO9MOBAOMTX'+'IIAJIVCQB';
//  let saldo = 0;
//  let saldo2 = 0;
//  // Use this block if you need new addresess from the seeds
//  /*
//  const seed =
//  'EXTKNVEMPTH9DKQNLOH9EVPGEZLZKPRFQPYXLQKOMCYI9T'+
//  'WZPZGZEVI9DCJZRAFFLJJVZE9ZUSFGNZUIA';
//  const seed2 =
//  'FC9GRKIXHTXWYZNQ9JGYZZPJZ9P9IVDZVYXB9UJTUELLNA'+
//  'WZYK9EJLHHFPEGMHCOBFIGSKTUDQURXSKXG';
//  iota
//      .getNewAddress(seed, 0)
//      .then((address) => {
//        console.log('Your address for seed 1 is: ' + address);
//        console.log('Paste this address into '+
//      'https://faucet.comnet.einfachiota.de/');
//      })
//      .catch((err) => {
//        console.log(err);
//      });
//
//  iota
//      .getNewAddress(seed2, 0)
//      .then((address) => {
//        console.log('Your address for seed 2 is: ' + address);
//        console.log('Paste this address into '+
//      'https://faucet.comnet.einfachiota.de/');
//      })
//      .catch((err) => {
//        console.log(err);
//      });
//* /
//  // End Use this block if you need new addresess
//  iota
//      .getBalances([firstaddress, secondaddress])
//      .then(({balances}) => {
//        //        console.log(balances);
//        //        console.log(balances[0]);
//        saldo += balances[0];
//        saldo2 += balances[1];
//        //        console.log(saldo);
//        element.innerHTML =
//        '<div>Comnet tokens on addresses from 2 seeds</div>'+
//        '<div>' + firstaddress + ': ' + formatIotas(saldo) + '</div>'+
//        '<div>' + secondaddress + ': ' + formatIotas(saldo2) + '</div>';
//      })
//      .catch((err) => {
//        console.log(`Request error: ${err.message}`);
//        element.innerHTML =
//        '<div>Comnet getBalances error: '+err.message+'</div>';
//        // console.error(err);
//      });
//  return element;
// }

// /**
// * Pingpong funds from comnet endpoint.
// * Show in console and div.
// * @return {str} formatted html.
// */// function comnetPingPongFunds() {
// // /////////////////////////////
// // Transfer 1000 iota from  the first address
// // to the second address from the same seed
// // Then Pong it back to the first
// // /////////////////////////////
//  const iota = connectnode('comnet');
//  const element = document.createElement('container');
//  element.classList.add('nodeinfo');
//  element.id = 'comnet_balances_XeeVee';
//  const firstaddress =
//  'HCUIZQALXEGDUENRCQDHKEBVBKGDS9NAMCTALLMVRZRGPG'+
//  'ZO9BUUKNUQEJTVYGASBSRMHML9OWKGB9MIW'+'QVBSXV9NX';
//  let saldo = 0;
//  return element;
// }


// const element = document.createElement('div');
// element.id = 'test_recursive';
// ReactDOM.render(<App />, document.getElementById('test_recursive'));
// document.body.appendChild(app());
// comnetAdres();
// document.body.appendChild(comnetAdres());
// document.body.appendChild(connectgoshimmer('goshimmer2',
//    '/info'));
// document.body.appendChild(connectgoshimmer('goshimmer2',
//    '/autopeering/neighbors'));
document.body.appendChild(connectcpt2('cpt2',
    'info'));
document.body.appendChild(divnodeinfoHline('iota'));
// document.body.appendChild(divnodeinfoHline('iota2'));
// document.body.appendChild(divpeerinfo('iota2'));
document.body.appendChild(divnodeinfoHline('hornet'));
document.body.appendChild(connectgoshimmer('goshimmer',
    '/info'));
document.body.appendChild(divpeerinfo('iota'));
document.body.appendChild(divpeerinfo('hornet'));
// document.body.appendChild(divnodeinfoHline('comnet'));
// document.body.appendChild(divpeerinfo('comnet'));
document.body.appendChild(connectgoshimmer('goshimmer',
    '/autopeering/neighbors'));
document.body.appendChild(connectcpt2('cpt2',
    'peers'));
// document.body.appendChild(divnodeinfo('iota'));
// document.body.appendChild(divnodeinfo('iota2'));
// const nodediv1 = document.getElementById('nodeinfo_iota');
// const nodediv2 = document.getElementById('nodeinfo_iota2');
// document.body.removeChild(nodediv1);
// document.body.removeChild(nodediv2);
// document.body.appendChild(divnodeinfo());
// document.body.appendChild(divnodeinfo2());
// Rebuild page every 15 seconds
setInterval(function() {
//  const nodediv1 = document.getElementById('nodeinfo_iota');
//  const nodediv2 = document.getElementById('nodeinfo_iota2');
//  const nodedivh0 = document.getElementById('comnet_tokens_XeeVee');
  const nodedivh6 = document.getElementById('nodeinfo_h_cpt2');
  const nodedivh5 = document.getElementById('nodeinfo_h_goshimmer');
  //  const nodedivh6 = document.getElementById('nodeinfo_h_goshimmer2');
  const nodedivh1 = document.getElementById('nodeinfo_h_iota');
  //  const nodedivh2 = document.getElementById('nodeinfo_h_iota2');
  const nodedivh3 = document.getElementById('nodeinfo_h_hornet');
  // const nodedivh4 = document.getElementById('nodeinfo_h_comnet');
  //  const olddiv2 = document.getElementById('nodeinfo');
  //  const olddiv3 = document.getElementById('nodeinfo2');
  const peerdiv5 = document.getElementById('peerinfo_goshimmer');
  //  const peerdiv6 = document.getElementById('peerinfo_goshimmer2');
  const peerdiv1 = document.getElementById('peerinfo_iota');
  //  const peerdiv2 = document.getElementById('peerinfo_iota2');
  const peerdiv3 = document.getElementById('peerinfo_hornet');
  // const peerdiv4 = document.getElementById('peerinfo_comnet');
  const peerdiv6 = document.getElementById('peerinfo_cpt2');
  // document.body.replaceChild(comnetAdres(), nodedivh0);
  //  document.body.replaceChild(connectgoshimmer('goshimmer2',
  //      '/info'), nodedivh6);
  //  document.body.replaceChild(connectgoshimmer('goshimmer2',
  //      '/autopeering/neighbors'), peerdiv6);
  document.body.replaceChild(connectcpt2('cpt2',
      'info'), nodedivh6);
  document.body.replaceChild(divnodeinfoHline('iota'), nodedivh1);
  document.body.replaceChild(divnodeinfoHline('hornet'), nodedivh3);
  document.body.replaceChild(connectgoshimmer('goshimmer',
      '/info'), nodedivh5);
  //  document.body.replaceChild(divnodeinfoHline('iota2'), nodedivh2);
  //  document.body.replaceChild(divpeerinfo('iota2'), peerdiv2);
  document.body.replaceChild(divpeerinfo('iota'), peerdiv1);
  document.body.replaceChild(divpeerinfo('hornet'), peerdiv3);
  // document.body.replaceChild(divnodeinfoHline('comnet'), nodedivh4);
  // document.body.replaceChild(divpeerinfo('comnet'), peerdiv4);
  document.body.replaceChild(connectgoshimmer('goshimmer',
      '/autopeering/neighbors'), peerdiv5);
  document.body.replaceChild(connectcpt2('cpt2',
      'peers'), peerdiv6);
  //  document.body.replaceChild(divnodeinfo('iota'), nodediv1);
  //  document.body.replaceChild(divnodeinfo('iota2'), nodediv2);
  //  document.body.replaceChild(divnodeinfo(), olddiv2);
  //  document.body.replaceChild(divnodeinfo2(), olddiv3);
  // Catch errors since some browsers throw when using the new `type` option.
  // https://bugs.webkit.org/show_bug.cgi?id=209216
//  try {
//    // Create the performance observer.
//    const po = new PerformanceObserver((list) => {
//      for (const entry of list.getEntries()) {
//        // Logs all server timing data for this response
//        console.log('Server Timing', entry.serverTiming);
//      }
//    });
//    // Start listening for `navigation` entries to be dispatched.
//    // po.observe({type: 'navigation', buffered: true});
//    // po.observe({type: 'resource', buffered: true});
//    po.observe({type: 'longtask', buffered: true});
//  } catch (e) {
//    // Do nothing if the browser doesn't support this API.
//  }
}, 15000,
);
