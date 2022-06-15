import './style.css';
// // import Logo from './logo.png';
// // import Data from './data.xml';
// // import printMe from './print.js';
// import {composeAPI} from '@iota/core';
// // import React from "react";
// // import ReactDOM from 'react-dom';
// // import App from './test_recursive.js';
import swal from 'sweetalert';
// // import yargs from 'yargs';

// // const { ClientBuilder } = require('@iota/client')
// // import {ClientBuilder} from '@iota/client';
// // const client = new ClientBuilder()
// //    .node('https://api.lb-0.testnet.chrysalis2.com')
// //    .build();
// // client.getInfo().then(console.log).catch(console.error);

// // const {SingleNodeClient} = require('@iota/iota.js');
// import {SingleNodeClient} from '@iota/iota.js';

// // SMR-event: https://xeevee.ddns.net/api/plugins/participation/events/f6dbdad416e0470042d3fe429eb0e91683ba171279bce01be6d1d35a9909a981/status
// /**
//  * Example for use of new lib iota.js
//  */
// async function run() {
//   const client = new SingleNodeClient('https://xeevee.ddns.net');
//   const info = await client.info();
//   const swaldiv = document.createElement('div');
//   swaldiv.innerHTML = '' +
//     'Node URL: https://xeevee.ddns.net'+
//     '\tName: '+ info.name+
//     '\tVersion: '+ info.version+
//     '\tIs Healthy: '+ info.isHealthy+
//     '\tNetwork Id: '+ info.networkId+
//     '\tLatest Milestone Index: '+ info.latestMilestoneIndex+
//     '\tConfirmed Milestone Index: '+ info.confirmedMilestoneIndex+
//     '\tPruning Index: '+ info.pruningIndex+
//     '\tFeatures: '+ info.features+
//     '\tMin PoW Score: '+ info.minPoWScore;
//   const swaltext = swaldiv.text;
//   swal({
//     title: 'iota.js Sample fetching Node info',
//     background: 'gray',
//     // content: swaldiv,
//     text: swaltext,
//     icon: 'info',
//     timer: 5000,
//   });
//   console.log('Node URL: https://xeevee.ddns.net');
//   console.log('\tNode Info');
//   console.log('\tName:', info.name);
//   console.log('\tVersion:', info.version);
//   console.log('\tIs Healthy:', info.isHealthy);
//   console.log('\tNetwork Id:', info.networkId);
//   console.log('\tLatest Milestone Index:', info.latestMilestoneIndex);
//   console.log('\tConfirmed Milestone Index:', info.confirmedMilestoneIndex);
//   console.log('\tPruning Index:', info.pruningIndex);
//   console.log('\tFeatures:', info.features);
//   console.log('\tMin PoW Score:', info.minPoWScore);
// }
// run()
//     .then(() => console.log('Done'))
//     .catch((err) => console.error(err));

/**
 * Take a single camel case string and convert it to a string of separate
 * @param {str} inCamelCaseString  The to be converted property-name.
 * words (with spaces) at the camel-case boundaries. Show iota.properties
 * as Human readable title.
 * @return {str} formatted propertie.
 */
function camelCaseToTitleCase(inCamelCaseString) {
  if (typeof inCamelCaseString == 'undefined') {
    return inCamelCaseString;
  }
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
 * Show coins as human readable like G i
 * @param {int} total The to be converted number of coins.
 * @param {str} coin Indication of coin, default i
 * @param {int} decimals Number of decimals, default 2
 * total is numeric
 * @return {str} is smth like 3.2 Gi.
 */
function formatIotas(total, coin, decimals = 2) {
  if (total === 0) return '0 ' + coin;
  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
  const i = Math.floor(Math.log(total) / Math.log(k));
  return parseFloat((total / Math.pow(k, i)).toFixed(dm)) +
    ' ' + sizes[i] + coin;
}

// /**
//  * Create provider string to IOTA endpoint.
//  * @param {str} provider  The to be connected node.
//  * providerstr is address:port.
//  * @return {provider} is string.
//  */
// function createprovider(provider) {
//   // for dev the endpoint is defined as proxy in webpack-dev-server
//   // for prod it's in env-variables in pmij.env
//   let providerstr = '';
//   //  if (process.env.NODE_ENV == 'production') {
//   if (process.env.NODE_ENV == 'development') {
//     if (provider == 'iota') {
//       providerstr += 'http://' +
//         process.env.IRI_NODE_IP + ':' +
//         process.env.IRI_NODE_PORT+
//         '/api/v1/';
//     };
//     if (provider == 'iota2') {
//       providerstr += 'http://' +
//         process.env.IRI_NODE_IP_2 + ':' +
//         process.env.IRI_NODE_PORT_2;
//     };
//     if (provider == 'hornet') {
//       providerstr += 'https://' +
//         process.env.IRI_NODE_IP_4 + ':' +
//         process.env.IRI_NODE_PORT_4;
//     };
//     if (provider == 'comnet') {
//       providerstr += 'http://' +
//         process.env.IRI_NODE_IP_3 + ':' +
//         process.env.IRI_NODE_PORT_3;
//     };
//     if (provider == 'goshimmer') {
//       providerstr += 'http://' +
//         process.env.IRI_NODE_IP_5 + ':' +
//         process.env.IRI_NODE_PORT_5 +
//         '/';
//     };
//     if (provider == 'goshimmer2') {
//       providerstr += '//xeevee.net:18080';
//       //        process.env.IRI_NODE_IP_5 + ':' +
//       //        process.env.IRI_NODE_PORT_5;
//     };
//     if (provider == 'cpt2') {
//       providerstr += 'http://' +
//         process.env.IRI_NODE_IP_3 + ':' +
//         process.env.IRI_NODE_PORT_3 +
//         '/api/v1/';
//     };
//     if (provider == 'events') {
//       providerstr += 'https://' +
//         process.env.IRI_NODE_IP_6 +
//         // ':' +
//         // process.env.IRI_NODE_PORT_6 +
//         '/api/plugins/';
//     };
//   } else {
//     providerstr += '/api';
//   }
//   console.log('Probed node: ' + providerstr);
//   return providerstr;
// }

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
  const typeofdata = (data === data ? typeof data : 'NaN');
  let str = strn;
  let start = '';
  let end = '';
  switch (typeofdata) {
    case 'object':
      for (const entry of data) {
        const typeofvalue = (entry[1] === entry[1] ? typeof entry[1] : 'undefined');
        switch (typeofvalue) {
          case 'undefined':
            // Unknown value or something strange found in json...
            headers.push('Unknown Entry[0]');
            details.push('Undefined Entry[1]');
            break;
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
              start = '<td class="mightOverflow"' +
                'data-toggle="tooltip" data-placement="auto">';
              end = '</td>';
              for (let i = 0; i < headers.length; i++) {
                str += start;
                if (headers[i].toLowerCase().match(/time/) == null) {
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
                ' (' + Object.keys(entry[1]).length + ' Settings)' +
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
    case 'NaN':
      // Unknown value or something strange found in json...
      headers.push('NaN');
      details.push('NaN');
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
  if (headers.length == 1) {
    str += '</tr><tr>';
  }
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
    if (headers[i].match(/staked/)) {
      str += formatIotas(details[i], 'i');
      continue;
    }
    if (headers[i].match(/rewarded/)) {
      str += formatIotas(details[i], '');
      continue;
    }
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
  // Remove empty rows
  str.replace('</tr><tr></tr><tr>', '</tr><tr>');
  return str;
}

// /**
//  * Fetch JSON from Chrysalis pt2 endpoint for events.
//  * @param {str} provider  The to be connected node.
//  * @param {str} type  event-info or event-status.
//  * @return {element} is formatted html.
//  */
// async function showiotaevents(provider, type) {
//   // const eventprovider = 'https://xeevee.ddns.net'+
//   //  '/api/plugins/participation/events/';
//   // const smrevent = 'f6dbdad416e0470042d3fe429eb0e'+
//   //  '91683ba171279bce01be6d1d35a9909a981';
//   const element = document.createElement('container');
//   element.classList.add('eventinfo');
//   const providerstr = createprovider(provider);
//   let staked = 0;
//   let rewarded = 0;
//   let elementstr = '<table class="table-striped table-hover'+
//     ' table-bordered table-responsive" '+
//     ' table-dark" '+
//     'style="text-align:center">';
//   elementstr += '<tr>';
//   elementstr += '<th>Node name</th>';
//   elementstr += '<th>Node API</th>';
//   elementstr += '</tr><tr>';
//   elementstr += '<td>'+provider+'</td>';
//   elementstr += '<td>'+providerstr+'</td>';
//   elementstr += '</tr><tr>';
//   const response1 = await fetch(providerstr+'participation/events');
//   if (response1.ok) {
//     const reader1 = response1.json();
//     const result = await reader1;
//     console.log('Received json', result);
//     // elementstr += iterate(result, 'header', '', [], []);
//     // const events = {};
//     const jsonmap = new Map(Object.entries(result));
//     elementstr += iterate(jsonmap, 'header', '', [], []);
//     const response2 = await fetch(createprovider(provider)+
//       'participation/events/'+
//       result.data.eventIds[0]+'/status');
//     if (response2.ok) {
//       const jsonValue = response2.json();
//       const result2 = await jsonValue;
//       staked += result2.data.staking.staked;
//       rewarded += result2.data.staking.rewarded;
//       console.log('Received json', result2);
//       const jsonmap2 = new Map(Object.entries(result2));
//       elementstr += iterate(jsonmap2, 'header', '', [], []);
//       elementstr +=
//         '<div>SMR Event Iota tokens staked: '+
//         formatIotas(staked, 'SMR')+'</div>'+
//         '<div>SMR Event SMR tokens rewarded: '+
//         formatIotas(rewarded, 'SMR')+'</div>';
//       // const swaldiv = document.createElement('div');
//       // swaldiv.innerHTML = 'SMR Event Iota tokens staked: ' +
//       //   formatIotas(staked)+' . ' +
//       //   'SMR Event SMR tokens rewarded: '+
//       //   formatIotas(rewarded)+'';
//       // swal({
//       //   title: 'SMR Staking status',
//       //   content: swaldiv,
//       //   icon: 'info',
//       //   timer: 5000,
//       // });
//     } else {
//       console.log('Fetch Event error: ' + response2.status);
//     }
//   } else {
//     console.log('Fetch Event error: ' + response1.status);
//   }
//   switch (type) {
//     case 'participation_events':
//       element.id = 'cpt2_events_info';
//       break;
//     case 'participation_event_status':
//       element.id = 'cpt2_events_status';
//       break;
//   };
//   elementstr += '</tr>';
//   elementstr += '<p>--- Màrrria ----</p></table>';
//   element.innerHTML = elementstr;
//   return element;
// };


// /**
//  * Fetch JSON from Chrysalis pt2 endpoint.
//  * @param {str} provider  The to be connected node.
//  * @param {str} type  node-info or peer-info.
//  * providerstr is address:port.
//  * @return {element} is formatted html.
//  */
// function connectcpt2(provider, type) {
//   // Chrysalis pt 2 info curl -vv http://192.168.178.100:14265/api/v1/info|jq
//   // Chrysalis pt 2 peers curl -vv http://192.168.178.100:14265/api/v1/peers|jq
//   // using pmij.env
//   const element = document.createElement('container');
//   const mainbech32adr =
//     'iota1qp853z2qtu386vkzdef4a36l7wl'+
//     '8wvcln9q24h0n5g0hcccyan9pc8fqz03';
//   const balanceprovider = 'http://192.168.178.12:14267/api/v1/addresses/';
//   let providerstr = '';
//   let saldo = 0;
//   let elementstr = '<table class="table-striped table-hover'+
//     ' table-bordered table-responsive" '+
//     ' table-dark" '+
//     'style="text-align:center">';
//   elementstr += '<tr>';
//   elementstr += '<th>Node name</th>';
//   elementstr += '<th>Node API</th>';
//   elementstr += '</tr><tr>';
//   elementstr += '<td>'+provider+'</td>';
//   // let response2 = {};
//   switch (provider) {
//     default:
//       providerstr = createprovider(provider)+type;
//       elementstr += '<td>'+providerstr+'</td>';
//       elementstr += '</tr><tr>';
//   }
//   //  elementstr += '<th>Node ID</th>';
//   //  elementstr += '<th>Public Key</th>';
//   switch (type) {
//     case 'participation/events':
//       element.classList.add('nodeinfo');
//       element.id = 'cpt2_events_info';
//       break;
//     case 'participation/event/status':
//       element.classList.add('nodeinfo');
//       element.id = 'cpt2_events_status';
//       break;
//     case 'info':
//       element.classList.add('nodeinfo');
//       element.id = 'nodeinfo_h_' + provider;
//       // Fetch the balance from a Mainnet address
//       // curl http://192.168.178.12:14267/api/v1/addresses/+
//       // iota1qp853z2qtu386vkzdef4a36l7wl8wvcln9q24h0n5g0hcccyan9pc8fqz03
//       /* Fetch method Chrysalis */
//       (async () => {
//         try {
//           const response3 = await fetch(balanceprovider+mainbech32adr);
//           if (response3.ok) {
//             const jsonValue = await response3.json();
//             console.log('Fetched jsonValue Balance: ' + jsonValue);
//             saldo += jsonValue.data.balance;
//             elementstr +=
//               '<div>Mainnet tokens on address from 1 seed: '+
//               formatIotas(saldo, 'i')+'</div>';
//             // elementstr += '<div>' +
//             //   iterate(jsonmap, 'header', '', [], []);
//             // elementstr += '</div>';
//           } else {
//             console.log('Fetch Balance error: ' + response3.status);
//           }
//         } catch (e) {
//           console.log('Catched fetch error: ' + e);
//         }
//       })();
//       break;
//     case 'peers':
//       element.classList.add('peerinfo');
//       element.id = 'peerinfo_' + provider;
//   }
//   /* Fetch method */
//   (async () => {
//     // let promise = fetch(providerstr);
//     if (provider == 'plugins') {
//       // providerstr = createprovider(provider)+type;
//       return;
//     }
//     console.log('cpt2 Fetching from '+ providerstr);
//     const response = await fetch(providerstr);
//     try {
//       if (response.ok) {
//         // const json = await response.json();
//         // const jsonValue = await response.body.json();
//         const jsonmap = new Map(Object.entries(await response.json()));
//         //        let x;
//         //        let y;
//         console.log('Fetched jsonValue nodeInfo or nodePeers or event: '+
//         //  providerstr + json+
//           providerstr + jsonmap);
//         //        for (x in json) {
//         //          if ({}.hasOwnProperty.call(json, x)) {
//         //            elementstr += '<th>'+
//         //         camelCaseToTitleCase(x)+'</th>';
//         //          }
//         //        }
//         //        elementstr += '<td>'+json.identityID+'</td>';
//         //        elementstr += '<td>'+json.publicKey+'</td>';
//         // elementstr += '<pre>' + JSON.stringify(json) + '</pre>';
//         // elementstr += iterate(jsonValue, 'header', '', [], []);
//         elementstr += iterate(jsonmap, 'header', '', [], []);
//         //        for (y in json) {
//         //          if ({}.hasOwnProperty.call(json, y)) {
//         //            elementstr += '<td>'+
//         //         json[y]+'</td>';
//         //          }
//         //        }
//         //        elementstr += iterate(json, 'detail', '', [], []);
//         elementstr += '</tr>';
//         elementstr += '<p>--- Màrrria ----</p></table>';
//         //      elementstr += '</table>';
//         element.innerHTML = elementstr;
//         return element;
//       } else {
//         console.log('Fetch error: ' + response.status);
//       }
//     } catch (e) {
//       console.log('Catched fetch error: ' + e);
//     }
//   })();
//   return element;
// };


// /**
//  * Fetch JSON from Goshimmer endpoint.
//  * @param {str} provider  The to be connected node.
//  * @param {str} type  node-info or peer-info.
//  * providerstr is address:port.
//  * @return {element} is formatted html.
//  */
// function connectgoshimmer(provider, type) {
//   // Goshimmer info curl -vv -X GET http://192.168.178.100:8080/info|jq
//   // Goshimmer peers curl -vv -X GET http://192.168.178.100:8080/autopeering/neighbors|jq
//   // Goshimmer info curl http://xeevee.net:9080/info|jq
//   // Goshimmer peers curl http://xeevee.net:9080/autopeering/neighbors|jq
//   // Connect to Goshimmer, fetch either node- or peer-info
//   // using pmij.env
//   const providerstr = createprovider(provider)+type;
//   const element = document.createElement('container');
//   switch (type) {
//     case '/info':
//       element.classList.add('nodeinfo');
//       element.id = 'nodeinfo_h_' + provider;
//       break;
//     case '/autopeering/neighbors':
//       element.classList.add('peerinfo');
//       element.id = 'peerinfo_' + provider;
//   }
//   let elementstr = '<table class="table-striped table-hover'+
//     ' table-bordered table-responsive" '+
//     'style="text-align:center">';
//   elementstr += '<tr>';
//   elementstr += '<th>Node name</th>';
//   //  elementstr += '<th>Node ID</th>';
//   //  elementstr += '<th>Public Key</th>';
//   elementstr += '<th>Node API</th>';
//   elementstr += '</tr><tr>';
//   elementstr += '<td>'+provider+'</td>';
//   elementstr += '<td>'+providerstr+'</td>';
//   elementstr += '</tr><tr>';
//   //  elementstr += '<tr class="text-break">';

//   /* Fetch method */
//   (async () => {
//     try {
//       const response = await fetch(providerstr);
//       if (response.ok) {
//         const jsonmap = new Map(Object.entries(await response.json()));
//         console.log('Fetched: ' + jsonmap);
//         elementstr += iterate(jsonmap, 'header', '', [], []);
//         elementstr += '</tr>';
//         elementstr += '<p>--- Màrrria ----</p></table>';
//         element.innerHTML = elementstr;
//         return element;
//       } else {
//         console.log('Fetch error: ' + response.status);
//       }
//     } catch (e) {
//       console.log('Catched fetch error: ' + e);
//     }
//   })();
//   // End fetch menthod
//   return element;
// };


// /**
//  * Create API-object IRI endpoint.
//  * @param {str} provider  The to be connected node.
//  * providerstr is address:port.
//  * @return {provider} is object.
//  */
// function connectnode(provider) {
//   const providerstr = createprovider(provider);
//   // Connect to IRI
//   const iota = composeAPI({
//     provider: providerstr,
//   });
//   return iota;
// }

// /**
//  * Fetch node info from IRI endpoint.
//  * iota.getNodeInfo to Show info of the IRI fullnode.
//  * @param {str} node - node to connect
//  * @return {str} formatted html.
//  */
// function divnodeinfoHline(node) {
//   const iota = connectnode(node);
//   const element = document.createElement('container');
//   const providerstr = createprovider(node);
//   const mainnetadr =
//    'CGPGFKBHXRHWLWLXZOSFTWOAFIOCOFPTIAFBMIVS9BTJM'+
//    'IHOSQL9RKSXXPBW9NGQCXMUP9CPGUEDMGHMCYQQ9HDD9X';
//   let saldo = 0;
//   let elementstr = '';
//   iota.getNodeInfo()
//       .then((info) => {
//         const syncdiff = info.latestMilestoneIndex -
//           info.latestSolidSubtangleMilestoneIndex;
//         const myDate = new Date(info.time);
//         element.classList.add('nodeinfo');
//         element.id = 'nodeinfo_h_' + node;
//         elementstr += '<table class="table-striped table-hover'+
//           ' table-bordered table-responsive" style="text-align:center">';
//         elementstr += '<tr>';
//         elementstr += '<th>Node name</th>';
//         elementstr += '<th>Node Alias</th>';
//         elementstr += '<th>Local Time</th>';
//         elementstr += '<th>Node API</th>';
//         elementstr += '<th>App name</th>';
//         elementstr += '<th>App version</th>';
//         // elementstr += '<th>Db size</th>';
//         elementstr += '<th>LM</th>';
//         elementstr += '<th>LSM</th>';
//         elementstr += '<th>Snapshot</th>';
//         elementstr += '<th>Tips</th>';
//         if (info.appName == 'IRI') {
//           elementstr += '<th>Connected peers</th>';
//         }
//         if (info.appName == 'HORNET') {
//           elementstr += '<th>Known peers</th>';
//         }
//         elementstr += '<th>Sync status</th>';
//         elementstr += '<th>Features</th>';
//         elementstr += '</tr><tr>';
//         elementstr += '<td>'+node+'</td>';
//         elementstr += '<td>'+info.nodeAlias+'</td>';
//         elementstr += '<td>'+myDate.toLocaleString()+'</td>';
//         elementstr += '<td>'+providerstr+'</td>';
//         elementstr += '<td>'+info.appName+'</td>';
//         elementstr += '<td>'+info.appVersion+'</td>';
//         // elementstr += '<td>'+formatIotas(info.dbSizeInBytes, 3)+'</td>';
//         elementstr += '<td>'+info.latestMilestoneIndex+'</td>';
//         elementstr += '<td>'+info.latestSolidSubtangleMilestoneIndex+'</td>';
//         elementstr += '<td>'+info.lastSnapshottedMilestoneIndex+'</td>';
//         elementstr += '<td>'+info.tips+'</td>';
//         elementstr += '<td>'+info.neighbors+'</td>';
//         switch (syncdiff) {
//           case 0:
//             if (info.neighbors == 0) {
//               // Synced, but no peers
//               elementstr += '<td class="node_warn_synced">' +
//               'Sync status unknown, no peers</td>';
//               break;
//             }
//             // Synced, 1 or more peers
//             elementstr += '<td class="node_synced">' +
//             'Synced</td>';
//             break;
//           case 1:
//             // 1 behind!
//             elementstr += '<td class="node_warn_synced">'+
//             syncdiff +
//             ' milestone behind</td>';
//             break;
//           case 2, 3, 4, 5:
//             // a few behind!
//             elementstr += '<td class="node_warn_synced">'+
//             syncdiff +
//             ' milestones behind</td>';
//             break;
//           default:
//             // Unsynced!
//             elementstr += '<td class="node_unsynced">'+
//             'Unsynced, ' + syncdiff +
//             ' milestones behind !!</b></div>';
// //            const div = document.createElement('div');
// //            div.innerHTML = 'The node ' + providerstr +
// //            'is ' + syncdiff +
// //            ' milestones behind !!';
// //            swal({
// //              title: 'Unsynced',
// //              content: div,
// //              icon: 'warning',
// //              timer: 5000,
// //            });
//         }
//         elementstr += '<td class="text-break">'+
//           camelCaseToTitleCase(info.features.toString())+'</td>';
//         elementstr += '<p>--- Màrrria ----</p></table>';
//         /* Full getNodeInfo
//                 const aNodeInfo = Object.entries(info);
//                 elementstr += '<table class="table-striped table-hover'+
//                   ' table-bordered table-responsive" '+
//                   'style="text-align:center">';
//                 elementstr += '<tr class="text-break">';
//                 aNodeInfo.forEach(function(add) {
//                   elementstr += '<th>'+
//                   camelCaseToTitleCase(add[0])+'</th>';
//                 });
//                 elementstr += '</tr><tr class="text-break">';
//                 aNodeInfo.forEach(function(add) {
//                   elementstr += '<td class="text-break iota_address">' +
//                   add[1]+'</td>';
//                 });
//                 elementstr += '</tr>';
//                 elementstr += '</table>';
//                 console.log(`elementstr: ${elementstr}`);
//         */ // End full getNodeInfo
//         element.innerHTML = elementstr;
//       })
//       .catch((error) => {
//         console.log(`Request error: ${error.message}`);
//       });

//   // End fetch menthod
//   // '<div>' + mainnetadr + ': ' + formatIotas(saldo) + '</div>';
//   element.innerHTML = elementstr;
//   // Legacy Hornet
//   if (node !== 'comnet') {
//     iota
//         .getBalances([mainnetadr])
//         .then(({balances}) => {
//           saldo += balances[0];
//           elementstr +=
//           '<div>Legacy Mainnet tokens on address from 1 seed</div>'+
//           '<div>' + mainnetadr + ': ' + formatIotas(saldo, 'i') + '</div>';
//           element.innerHTML = elementstr;
//         })
//         .catch((err) => {
//         // console.error(err);
//           console.log(`Request error: ${err.message}`);
//           elementstr +=
//           '<div>Error fetching balance: '+ err.message +'</div>';
//           element.innerHTML = elementstr;
//         });
//   }
//   // End Legacy Hornet
//   return element;
// }


// /**
//  * Fetch peer info from IRI endpoint.
//  * iota.getNeighbors to show peers, alert for not connected ones.
//  * @param {str} node - node to connect
//  * @return {str} formatted html.
//  */
// function divpeerinfo(node) {
//   // Connect to IRI
//   const iota = connectnode(node);
//   //  const providerstr = createprovider(node);
//   const element = document.createElement('container');

//   // Show getPeers in div, format as table
//   iota.getNeighbors()
//       .then((info) => {
//         const aPeers = Object.entries(info).sort(function(a, b) {
//           return b[1].numberOfAllTransactions - a[1].numberOfAllTransactions;
//         });
//         let elementstr = '';
//         //        let elementstr = '<div>Details peers of node '+
//         //          ' IRI IP: ' + providerstr +
//         //          '</div>';
//         //        '<div class="container">';
//         //        '<div class="row">';
//         element.classList.add('peerinfo_connected');
//         element.id = 'peerinfo_'+node;
//         //        let UnconnectedPeers = '';
//         const totalPeers = aPeers.length;
//         let peerCounter = 1;
//         let peerCounterUnconnected = 0;
//         // Peers in Table
//         // open container for table
//         //        elementstr += '<div class="container">'+
//         elementstr += '<table class="table-striped table-hover'+
//           ' table-bordered table-responsive" style="text-align:center">';
//         peerCounter = 1;
//         aPeers.forEach(function(oPeer) {
//           //          const fixHornetpeer = (arr, index, newItem) => [
//           //            ...arr.slice(0,index), newItem, ...arr.slice(index)
//           //            ];
//           if (oPeer[1].alias === undefined &&
//             Object.entries(oPeer[1]).length > 12) {
//             oPeer[1].alias = 'none';
//           }
//           if (oPeer[1].autopeeringId === undefined &&
//           Object.entries(oPeer[1]).length > 12) {
//             oPeer[1].autopeeringId = 'none';
//           }
//           const aPeer = Object.entries(oPeer[1]).sort();
//           let str = '<tr>';
//           if (oPeer[1].connected == false) {
//             str = '<tr class="table-warning">';
//             peerCounterUnconnected ++;
//             //            UnconnectedPeers += '<div>Domain: '+
//             //              oPeer[1].domain+
//             //              ', address: '+oPeer[1].address+
//             //              '</div>';
//           }
//           switch (peerCounter) {
//             case 1:
//               // Header
//               str += '<th>'+
//               'Peer Counter</th>';
//               aPeer.forEach(function(Header) {
//                 if (Header[0] !== 'connectionType') {
//                   str += '<th>'+
//                   camelCaseToTitleCase(Header[0])+'</th>';
//                 }
//               });
//               str += '</tr><tr class="text-break">';
//             default:
//               // Values
//               str += '<td>';
//               str += peerCounter+' of '+totalPeers+'</td>';
//               aPeer.forEach(function(Peer) {
//                 if (Peer[0] !== 'connectionType') {
//                   str += '<td>'+Peer[1]+'</td>';
//                 }
//               });
//           }
//           str += '</tr>';
//           peerCounter ++;
//           elementstr += str;
//           if (peerCounterUnconnected > 2) {
//             str += '</tr><tr class="table-danger">';
//             str += '<td>Warning, more than 2 Peers disconnected</td>';
//             str += '</tr>';
//           }
//           str += '</table>';
//         });
//         elementstr += '</div>';
//         element.innerHTML = elementstr;
//       })
//       .catch((error) => {
//         console.log(`Request error: ${error.message}`);
//       });
//   return element;
// }

// /**
//  * Fetch IOTA address from comnet endpoint.
//  * Show in console and div.
//  * @return {str} formatted html.
//  */
// // function comnetAdres() {
// //  // /////////////////////////////
// //  // Create an address from a new seed
// //  // ///
// //  // First: run this code in a unix based terminal
// //  //        to generate an 81 Tryte seed.
// //  // 'cat /dev/urandom |LC_ALL=C tr -dc 'A-Z9' | fold -w 81 | head -n 1'
// //  // Paste the output of the above code into the 'seed' section below.
// //  // /////////////////////////////
// //
// //  const iota = connectnode('comnet');
// //  const element = document.createElement('container');
// //  element.classList.add('nodeinfo');
// //  element.id = 'comnet_tokens_XeeVee';
// //  const firstaddress =
// //  'HCUIZQALXEGDUENRCQDHKEBVBKGDS9NAMCTALLMVRZRGPG'+
// //  'ZO9BUUKNUQEJTVYGASBSRMHML9OWKGB9MIW'+'QVBSXV9NX';
// //  const secondaddress =
// //  'BWQBEEWMIJXVAQEFMKESV9FMXFWKPWNHYB9YGOUJ9TSLYE'+
// //  'YEADPEHOEBXRLGOFBAJNMRMJAO9MOBAOMTX'+'IIAJIVCQB';
// //  let saldo = 0;
// //  let saldo2 = 0;
// //  // Use this block if you need new addresess from the seeds
// //  /*
// //  const seed =
// //  'EXTKNVEMPTH9DKQNLOH9EVPGEZLZKPRFQPYXLQKOMCYI9T'+
// //  'WZPZGZEVI9DCJZRAFFLJJVZE9ZUSFGNZUIA';
// //  const seed2 =
// //  'FC9GRKIXHTXWYZNQ9JGYZZPJZ9P9IVDZVYXB9UJTUELLNA'+
// //  'WZYK9EJLHHFPEGMHCOBFIGSKTUDQURXSKXG';
// //  iota
// //      .getNewAddress(seed, 0)
// //      .then((address) => {
// //        console.log('Your address for seed 1 is: ' + address);
// //        console.log('Paste this address into '+
// //      'https://faucet.comnet.einfachiota.de/');
// //      })
// //      .catch((err) => {
// //        console.log(err);
// //      });
// //
// //  iota
// //      .getNewAddress(seed2, 0)
// //      .then((address) => {
// //        console.log('Your address for seed 2 is: ' + address);
// //        console.log('Paste this address into '+
// //      'https://faucet.comnet.einfachiota.de/');
// //      })
// //      .catch((err) => {
// //        console.log(err);
// //      });
// //* /
// //  // End Use this block if you need new addresess
// //  iota
// //      .getBalances([firstaddress, secondaddress])
// //      .then(({balances}) => {
// //        //        console.log(balances);
// //        //        console.log(balances[0]);
// //        saldo += balances[0];
// //        saldo2 += balances[1];
// //        //        console.log(saldo);
// //        element.innerHTML =
// //        '<div>Comnet tokens on addresses from 2 seeds</div>'+
// //        '<div>' + firstaddress + ': ' + formatIotas(saldo) + '</div>'+
// //        '<div>' + secondaddress + ': ' + formatIotas(saldo2) + '</div>';
// //      })
// //      .catch((err) => {
// //        console.log(`Request error: ${err.message}`);
// //        element.innerHTML =
// //        '<div>Comnet getBalances error: '+err.message+'</div>';
// //        // console.error(err);
// //      });
// //  return element;
// // }

// // /**
// // * Pingpong funds from comnet endpoint.
// // * Show in console and div.
// // * @return {str} formatted html.
// // */// function comnetPingPongFunds() {
// // // /////////////////////////////
// // // Transfer 1000 iota from  the first address
// // // to the second address from the same seed
// // // Then Pong it back to the first
// // // /////////////////////////////
// //  const iota = connectnode('comnet');
// //  const element = document.createElement('container');
// //  element.classList.add('nodeinfo');
// //  element.id = 'comnet_balances_XeeVee';
// //  const firstaddress =
// //  'HCUIZQALXEGDUENRCQDHKEBVBKGDS9NAMCTALLMVRZRGPG'+
// //  'ZO9BUUKNUQEJTVYGASBSRMHML9OWKGB9MIW'+'QVBSXV9NX';
// //  let saldo = 0;
// //  return element;
// // }


// // const element = document.createElement('div');
// // element.id = 'test_recursive';
// // ReactDOM.render(<App />, document.getElementById('test_recursive'));
// // document.body.appendChild(app());
// // comnetAdres();
// // document.body.appendChild(comnetAdres());
// // document.body.appendChild(connectgoshimmer('goshimmer2',
// //    '/info'));
// // document.body.appendChild(connectgoshimmer('goshimmer2',
// //    '/autopeering/neighbors'));

let elementstr = '<table class="table-striped table-hover table-bordered table-responsive table-dark" style="text-align:center">';
elementstr += '<tr>';
elementstr += '<th>Node name</th>';
elementstr += '<th>API call</th>';
elementstr += '</tr><tr>';
elementstr += '<td>'+'Apr2011 vBox'+'</td>';
elementstr += '<td>'+'https://xeevee.ddns.net/api/plugins/participation'+
  '</td>';
elementstr += '</tr><tr><th colspan="4">Peers</th></tr>';
// const {eventprovider, events, smrevent, asmbevent, parttokens, iotatokens, nodeinfo, nodepeers} = tobeFetched();
const {eventprovider, events, buildburn, asmbevent2, nodeinfo, nodepeers} = tobeFetched();

/**
* Enumerate to be fetched calls.
* @return {str} string
**/
function tobeFetched() {
  const eventprovider = 'https://xeevee.ddns.net';
  const events = '/api/plugins/participation/events';
  const asmbevent2 = '/90ab02d8f700fcb3b31ff577416ecb105697a664738bec45b626920337a280e0';
  const buildburn = '/c8529ff64ea191b437cd625af8b02fd0173bc94aae380ea4cc3367a651536cba';
  // const asmbevent = '/57607d9f8cefc366c3ead71f5b1d76cef1b36a07eb775158c541107951d4aecb';
  // const smrevent = '/f6dbdad416e0470042d3fe429eb0e91683ba171279bce01be6d1d35a9909a981';
  // const iotatokens = '/api/v1/addresses/iota1qp853z2qtu386vkzdef4a36l7wl8wvcln9q24h0n5g0hcccyan9pc8fqz03';
  // const parttokens = '/api/plugins/participation/addresses/iota1qp853z2qtu386vkzdef4a36l7wl8wvcln9q24h0n5g0hcccyan9pc8fqz03';
  const nodeinfo = '/api/v1/info';
  const nodepeers = '/api/v1/peers';
  // return {eventprovider, events, smrevent, asmbevent, parttokens, iotatokens, nodeinfo, nodepeers};
  return {eventprovider, events, asmbevent2, buildburn, nodeinfo, nodepeers};
}

/**
* fetch event info from cpt2 endpoint.
* @param {str} type event, -status or address.
* @return {str} Promise
* @return {str} url
**/
async function myFetch(type = '') {
  const myHeaders = new Headers();
  // add JWT token
  const myJWTToken = 'Bearer ' + process.env.IRI_NODE_JWT_6;
  myHeaders.append('Authorization', myJWTToken);
  const response = await fetch(type, {headers: myHeaders});
  let content;
  let url;
  if (!response.ok) {
    // throw new Error(`HTTP error! status: ${response.status}`);
    swal('Oh noes!', 'The AJAX request failed! url: ' + response.url, 'error', {timer: 2000});
  } else {
    url = response.url;
    content = await response.json();
  }
  return {url: url, content: content};
}

/**
* Show event info from cpt2 endpoint.
* Show in console and div.
* @return {str} html
**/
async function displayContent() {
  // const getsaldo =
  //   myFetch(eventprovider+iotatokens);
  // const gettokens =
  //   myFetch(eventprovider+parttokens);
  // const getevents =
  //   myFetch(eventprovider+events);
  // const getasmbevent =
  //   myFetch(eventprovider+events+asmbevent);
  // const getasmbstatus =
  //   myFetch(eventprovider+events+asmbevent+'/status');
  // const getsmrevent =
  //   myFetch(eventprovider+events+smrevent);
  // const getsmrstatus =
  //   myFetch(eventprovider+events+smrevent+'/status');
  const getnodeinfo =
    myFetch(eventprovider+nodeinfo);
  const getnodepeers =
    myFetch(eventprovider+nodepeers);
  const getasmbevent2 =
    myFetch(eventprovider+events+asmbevent2);
  const getasmb2status =
    myFetch(eventprovider+events+asmbevent2+'/status');
  const getvotingevent1 =
    myFetch(eventprovider+events+buildburn);
  const buildburnstatus =
    myFetch(eventprovider+events+buildburn+'/status');
  const elements = await Promise.allSettled([
    // getsaldo,
    // gettokens,
    // getevents,
    // getasmbevent,
    // getasmbstatus,
    // getsmrevent,
    // getsmrstatus,
    getvotingevent1,
    buildburnstatus,
    getasmb2status,
    getasmbevent2,
    getnodeinfo,
    getnodepeers]);
  for (const entry of elements) {
    const jsonmap = new Map(Object.entries(entry));
    if (entry.value.url.match(/peers/) == null || entry.value == undefined) {
      elementstr += iterate(jsonmap, 'header', '', [], []);
    } else {
      const unsortedpeers = [...jsonmap];
      const sortedpeers = unsortedpeers[1][1].content.data.sort((a, b)=>((a.id > b.id) ? 1 : -1));
      console.log(sortedpeers);
      elementstr += iterate(jsonmap, 'header', '', [], []);
    }
    // console.log('elementstr: ', elementstr);
  }
  const eventsdiv = document.createElement('div');
  eventsdiv.innerHTML = elementstr;
  eventsdiv.classList.add('eventinfo');
  console.log('eventsdiv: ', eventsdiv);
  document.body.appendChild(eventsdiv);
}
displayContent()
    .catch((e) => console.log(e));

setInterval(function() {
  location.reload();
}, 15000,
);

// https://xeevee.ddns.net/api/plugins/participation/addresses
// /iota1qp853z2qtu386vkzdef4a36l7wl8wvcln9q24h0n5g0hcccyan9pc8fqz03

// async function showevent() {
//   const event1 = 'https://xeevee.ddns.net/api/plugins/participation/events/'+
//   'f6dbdad416e0470042d3fe429eb0e91683ba171279bce01be6d1d35a9909a981';
//   const result1 = await fetch(event1);
//   const json = result1.json();
//   result1
//       .then(function() {
//         return console.log('Done');
//       })
//       .catch((err) => console.error(err));
//   let elementstr = '<table class="table-striped table-hover'+
//   ' table-bordered table-responsive" '+
//   ' table-dark" '+
//   'style="text-align:center">';
//   elementstr += '<tr>';
//   elementstr += '<th>Node name</th>';
//   elementstr += '<th>Node API</th>';
//   elementstr += '</tr><tr>';
//   elementstr += '<td>'+'Apr2011 vBox'+'</td>';
//   elementstr += '<td>'+'https://xeevee.ddns.net/api/plugins/'+'</td>';
//   elementstr += '</tr><tr>';
//   const jsonmap = new Map(Object.entries(json));
//   elementstr += iterate(jsonmap, 'header', '', [], []);
//   elementstr += '</tr>';
//   elementstr += '<p>--- Màrrria ----</p></table>';
//   const event1div = document.createElement('div');
//   event1div.innerHTML = elementstr;
//   event1div.classList.add('eventinfo');
//   document.body.appendChild(event1div);
// };
// showevent();

// swal({
//   text: 'Enter iota address like '+
//     'iota1qp853z2qtu386vkzdef4a36l7wl8wvcln9q24h0n5g0hcccyan9pc8fqz03'+
//     'to check Staking.',
//   content: 'input',
//   button: {
//     text: 'Search!',
//     closeModal: false,
//   },
// })
//     .then((name) => {
//       if (!name) return null;
//       const url = 'https://xeevee.ddns.net/api/plugins/participation'+
//       '/addresses/'+
//       'iota1qp853z2qtu386vkzdef4a36l7wl8wvcln9q24h0n5g0hcccyan9pc8fqz03';
//       return fetch(url);
//     })
//     .then((results) => {
//       return results.json();
//     })
//     .then((json) => {
//       if (!json) {
//         return swal('No output was found!');
//       }
//       // const staked = json.data.rewards.staked;
//       // const rewarded = json.data.staking.rewarded;
//       // const symbol = json.data.staking.symbol;
//       const staked = 0;
//       const rewarded = 0;
//       const symbol = 'SMR';
//       console.log('Received json', json);
//       let elementstr2 = '<table class="table-striped table-hover'+
//         ' table-bordered table-responsive" '+
//         ' table-dark" '+
//         'style="text-align:center">';
//       elementstr2 += '<tr>';
//       elementstr2 += '<th>Node name</th>';
//       elementstr2 += '<th>API call</th>';
//       elementstr2 += '</tr><tr>';
//       elementstr2 += '<td>'+'Apr2011 vBox'+'</td>';
//       elementstr2 += '<td>Address: '+parttokens+'</td>';
//       elementstr2 += '</tr><tr>';
//       elementstr2 += '<div>' +
//          symbol + ' Event Iota tokens staked: '+
//         formatIotas(staked, 'i')+'</div>'+
//         symbol + '<div>Event tokens rewarded: '+
//         formatIotas(rewarded, symbol)+'</div>';
//       const jsonmap = new Map(Object.entries(json));
//       elementstr2 += iterate(jsonmap, 'header', '', [], []);
//       elementstr2 += '</tr>';
//       elementstr2 += '<p>--- Màrrria ----</p></table>';
//       const swaldiv = document.createElement('div');
//       swaldiv.innerHTML = elementstr2;
//       swaldiv.classList.add('eventinfo');
//       swal({
//         title: 'Staking result:',
//         // content: swaldiv,
//         text: symbol +
//         ' Event Iota tokens staked: '+
//         formatIotas(staked, 'i')+', '+
//         symbol + ' Event tokens rewarded: '+
//         formatIotas(rewarded, symbol)+' .',
//         icon: 'info',
//       });
//       document.body.appendChild(swaldiv);
//     })
//     .catch((err) => {
//       if (err) {
//         swal('Oh noes!', 'The AJAX request failed!', 'error');
//       } else {
//         swal.stopLoading();
//         swal.close();
//       }
//     });

// document.body.appendChild(connectcpt2('iota',
//     'info'));
// document.body.appendChild(connectcpt2('cpt2',
//     'info'));
// document.body.appendChild(showiotaevents('events',
//     'participation_events'));
// document.body.appendChild(showiotaevents('events',
//     'participation_event_status'));
// // document.body.appendChild(divnodeinfoHline('iota'));
// // document.body.appendChild(divnodeinfoHline('iota2'));
// // document.body.appendChild(divpeerinfo('iota2'));
// document.body.appendChild(divnodeinfoHline('hornet'));
// document.body.appendChild(connectgoshimmer('goshimmer',
//     'info'));
// // document.body.appendChild(divpeerinfo('iota'));
// document.body.appendChild(connectcpt2('iota',
//     'peers'));
// document.body.appendChild(connectcpt2('cpt2',
//     'peers'));
// document.body.appendChild(divpeerinfo('hornet'));
// // document.body.appendChild(divnodeinfoHline('comnet'));
// // document.body.appendChild(divpeerinfo('comnet'));
// document.body.appendChild(connectgoshimmer('goshimmer',
//     'autopeering/neighbors'));
// // document.body.appendChild(divnodeinfo('iota'));
// // document.body.appendChild(divnodeinfo('iota2'));
// // const nodediv1 = document.getElementById('nodeinfo_iota');
// // const nodediv2 = document.getElementById('nodeinfo_iota2');
// // document.body.removeChild(nodediv1);
// // document.body.removeChild(nodediv2);
// // document.body.appendChild(divnodeinfo());
// // document.body.appendChild(divnodeinfo2());
// // Rebuild page every 15 seconds
// setInterval(function() {
// //  const nodediv1 = document.getElementById('nodeinfo_iota');
// //  const nodediv2 = document.getElementById('nodeinfo_iota2');
// //  const nodedivh0 = document.getElementById('comnet_tokens_XeeVee');
//   const nodedive0 = document.getElementById('cpt2_events_info');
//   const nodedive1 = document.getElementById('cpt2_events_status');
//   const nodedivh1 = document.getElementById('nodeinfo_h_iota');
//   const nodedivh6 = document.getElementById('nodeinfo_h_cpt2');
//   const nodedivh3 = document.getElementById('nodeinfo_h_hornet');
//   const nodedivh5 = document.getElementById('nodeinfo_h_goshimmer');
//   //  const nodedivh6 = document.getElementById('nodeinfo_h_goshimmer2');
//   //  const nodedivh2 = document.getElementById('nodeinfo_h_iota2');
//   // const nodedivh4 = document.getElementById('nodeinfo_h_comnet');
//   //  const olddiv2 = document.getElementById('nodeinfo');
//   //  const olddiv3 = document.getElementById('nodeinfo2');
//   const peerdiv1 = document.getElementById('peerinfo_iota');
//   const peerdiv6 = document.getElementById('peerinfo_cpt2');
//   const peerdiv3 = document.getElementById('peerinfo_hornet');
//   const peerdiv5 = document.getElementById('peerinfo_goshimmer');
//   //  const peerdiv6 = document.getElementById('peerinfo_goshimmer2');
//   //  const peerdiv2 = document.getElementById('peerinfo_iota2');
//   // const peerdiv4 = document.getElementById('peerinfo_comnet');
//   // document.body.replaceChild(comnetAdres(), nodedivh0);
//   //  document.body.replaceChild(connectgoshimmer('goshimmer2',
//   //      '/info'), nodedivh6);
//   //  document.body.replaceChild(connectgoshimmer('goshimmer2',
//   //      '/autopeering/neighbors'), peerdiv6);
//   document.body.replaceChild(connectcpt2('iota',
//       'info'), nodedivh1);
//   document.body.replaceChild(connectcpt2('cpt2',
//       'info'), nodedivh6);
//   document.body.replaceChild(showiotaevents('events',
//       'participation_events'), nodedive0);
//   document.body.replaceChild(showiotaevents('events',
//       'participation_event_status'), nodedive1);
//   document.body.replaceChild(divnodeinfoHline('hornet'), nodedivh3);
//   document.body.replaceChild(connectgoshimmer('goshimmer',
//       'info'), nodedivh5);
//   //  document.body.replaceChild(divnodeinfoHline('iota2'), nodedivh2);
//   //  document.body.replaceChild(divpeerinfo('iota2'), peerdiv2);
//   document.body.replaceChild(connectcpt2('iota',
//       'peers'), peerdiv1);
//   document.body.replaceChild(connectcpt2('cpt2',
//       'peers'), peerdiv6);
//   // document.body.replaceChild(divnodeinfoHline('comnet'), nodedivh4);
//   // document.body.replaceChild(divpeerinfo('comnet'), peerdiv4);
//   document.body.replaceChild(divpeerinfo('hornet'), peerdiv3);
//   document.body.replaceChild(connectgoshimmer('goshimmer',
//       'autopeering/neighbors'), peerdiv5);
//   /**
//   * Show/ hide Tooltip
//   * @param {str} options - fiddle around if you want
//   */
//   $.fn.tooltipOnOverflow = function(options) {
//     // eslint-disable-next-line
//     $(this).on('mouseenter', function() {
//       // eslint-disable-next-line
//       if (this.offsetWidth < this.scrollWidth) {
//         options = options || {placement: 'auto'};
//         /* @this - fiddle around if you want */
//         // eslint-disable-next-line
//         options.title = $(this).text();
//         // eslint-disable-next-line
//         $(this).tooltip(options);
//         // eslint-disable-next-line
//         $(this).tooltip('show');
//       } else {
//         // eslint-disable-next-line
//         if ($(this).data('bs.tooltip')) {
//           $tooltip.tooltip('hide');
//           $tooltip.removeData('bs.tooltip');
//         }
//       }
//     });
//   };
//   // eslint-disable-next-line
//   $(document).ready(function(){
//     $('[data-toggle="tooltip"]').tooltip();
//   });

//   //  document.body.replaceChild(divnodeinfo('iota'), nodediv1);
//   //  document.body.replaceChild(divnodeinfo('iota2'), nodediv2);
//   //  document.body.replaceChild(divnodeinfo(), olddiv2);
//   //  document.body.replaceChild(divnodeinfo2(), olddiv3);
//   // Catch errors since some browsers throw when using the new `type` option.
//   // https://bugs.webkit.org/show_bug.cgi?id=209216
// //  try {
// //    // Create the performance observer.
// //    const po = new PerformanceObserver((list) => {
// //      for (const entry of list.getEntries()) {
// //        // Logs all server timing data for this response
// //        console.log('Server Timing', entry.serverTiming);
// //      }
// //    });
// //    // Start listening for `navigation` entries to be dispatched.
// //    // po.observe({type: 'navigation', buffered: true});
// //    // po.observe({type: 'resource', buffered: true});
// //    po.observe({type: 'longtask', buffered: true});
// //  } catch (e) {
// //    // Do nothing if the browser doesn't support this API.
// //  }
// }, 15000,
// );
