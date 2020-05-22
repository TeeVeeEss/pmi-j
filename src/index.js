// import _ from 'lodash';
import './style.css';
// import Logo from './logo.png';
// import Data from './data.xml';
// import printMe from './print.js';
import {composeAPI} from '@iota/core';
import swal from 'sweetalert';
// import yargs from 'yargs';

// console.log('This is index JS....!');
// Lodash, now imported by this script

/**
 * Take a single camel case string and convert it to a string of separate
 * @param {str} inCamelCaseString  The to be converted property-name.
 * words (with spaces) at the camel-case boundaries. Show iota.properties
 * as Human readable title.
 * @return {str} formatted propertie.
 */
function camelCaseToTitleCase(inCamelCaseString) {
  const result = inCamelCaseString
  // "ToGetYourGEDInTimeASongAboutThe26ABCsIsOfTheEssenceButAPersonalIDCardFor
  // User456InRoom26AContainingABC26TimesIsNotAsEasyAs123ForC3POOrR2D2Or2R2D"
      .replace(/([a-z])([A-Z][a-z])/g, '$1 $2')
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
      .trim();

  // capitalize the first letter
  return result.charAt(0).toUpperCase() + result.slice(1);
}

/**
 * Show bytes as human readable like GB
 * @param {byte} bytes The to be converted numeber of bytes.
 * @param {int} decimals Number of decimals, default 2
 * bytes is numeric
 * @return {str} is smth like 3.2 GB.
 */
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Create provider string to IRI endpoint.
 * @param {str} provider  The to be connected node.
 * providerstr is address:port.
 * @return {provider} is string.
 */
function createprovider(provider) {
  // for dev the endpoint is defined as proxy in webpack-dev-server
  // for prod it's in env-variables in pmij.env
  let providerstr = '';
  if (process.env.NODE_ENV == 'production') {
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
  } else {
    providerstr += '/api';
  }
  console.log('Probed node: ' + providerstr);
  return providerstr;
}

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
  iota.getNodeInfo()
      .then((info) => {
        const syncdiff = info.latestMilestoneIndex -
          info.latestSolidSubtangleMilestoneIndex;
        const myDate = new Date(info.time);
        element.classList.add('nodeinfo');
        element.id = 'nodeinfo_h_' + node;
        let elementstr = '<table class="table-striped table-hover'+
          ' table-bordered table-responsive" style="text-align:center">';
        elementstr += '<tr>';
        elementstr += '<th>Node name</th>';
        elementstr += '<th>Local Time</th>';
        elementstr += '<th>Node API</th>';
        elementstr += '<th>App name</th>';
        elementstr += '<th>App version</th>';
        elementstr += '<th>Db size</th>';
        elementstr += '<th>Java Total RAM</th>';
        elementstr += '<th>Java Free RAM</th>';
        elementstr += '<th>Java Max RAM</th>';
        elementstr += '<th>LM</th>';
        elementstr += '<th>LSM</th>';
        elementstr += '<th>Tips</th>';
        elementstr += '<th>Connected peers</th>';
        elementstr += '<th>Sync status</th>';
        elementstr += '<th>Features</th>';
        elementstr += '</tr><tr>';
        elementstr += '<td>'+node+'</td>';
        elementstr += '<td>'+myDate.toLocaleString()+'</td>';
        elementstr += '<td>'+providerstr+'</td>';
        elementstr += '<td>'+info.appName+'</td>';
        elementstr += '<td>'+info.appVersion+'</td>';
        elementstr += '<td>'+formatBytes(info.dbSizeInBytes, 3)+'</td>';
        elementstr += '<td>'+formatBytes(info.jreTotalMemory, 3)+'</td>';
        elementstr += '<td>'+formatBytes(info.jreFreeMemory, 3)+'</td>';
        elementstr += '<td>'+formatBytes(info.jreMaxMemory, 2)+'</td>';
        elementstr += '<td>'+info.latestMilestoneIndex+'</td>';
        elementstr += '<td>'+info.latestSolidSubtangleMilestoneIndex+'</td>';
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
            const div = document.createElement('div');
            div.innerHTML = 'The node ' + providerstr +
            'is ' + syncdiff +
            ' milestones behind !!';
            swal({
              title: 'Unsynced',
              content: div,
              icon: 'warning',
              timer: 5000,
            });
        }
        elementstr += '<td class="text-break">'+
          camelCaseToTitleCase(info.features.toString())+'</td>';
        elementstr += '<p>--- Màrria ----</p></table>';
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
  //  return element+element2;
  return element;
}


/*
/**
 * Fetch node info from IRI endpoint.
 * iota.getNodeInfo to Show info of the IRI fullnode.
 * @param {str} node - node to connect
 * @return {str} formatted html.
function divnodeinfo(node) {
  const iota = connectnode(node);
  const element = document.createElement('container');
  const providerstr = createprovider(node);
  iota.getNodeInfo()
      .then((info) => {
        const syncdiff = info.latestMilestoneIndex -
          info.latestSolidSubtangleMilestoneIndex;
        const aNodeInfo = Object.entries(info);
        const myDate = new Date(info.time);
        element.classList.add('nodeinfo');
        element.id = 'nodeinfo_' + node;
        let elementstr = '<table class="table-striped table-hover'+
          ' table-bordered table-responsive" style="text-align:center">';
        elementstr += '<tr class="text-break">';
        elementstr += '<th>Node name</th>';
        elementstr += '<th>Local Time</th>';
        elementstr += '<th>IRI IP</th>';
        elementstr += '<th>Db size</th>';
        elementstr += '<th>Java Total RAM</th>';
        elementstr += '<th>Java Free RAM</th>';
        elementstr += '<th>Java Max RAM</th>';
        elementstr += '<th>LM</th>';
        elementstr += '<th>LSM</th>';
        elementstr += '<th>Sync status</th>';
        elementstr += '</tr><tr class="text-break">';
        elementstr += '<td>'+node+'</td>';
        elementstr += '<td>'+myDate.toLocaleString()+'</td>';
        elementstr += '<td>'+providerstr+'</td>';
        elementstr += '<td>'+formatBytes(info.dbSizeInBytes, 3)+'</td>';
        elementstr += '<td>'+formatBytes(info.jreTotalMemory, 3)+'</td>';
        elementstr += '<td>'+formatBytes(info.jreFreeMemory, 3)+'</td>';
        elementstr += '<td>'+formatBytes(info.jreMaxMemory, 2)+'</td>';
        elementstr += '<td>'+info.latestMilestoneIndex+'</td>';
        elementstr += '<td>'+info.latestSolidSubtangleMilestoneIndex+'</td>';
        switch (syncdiff) {
          case 0:
            // Synced
            elementstr += '<td class="node_synced">' +
            'Synced</td>';
            break;
          case 1:
            // 1 behind!
            elementstr += '<td class="node_warn_synced">'+
            syncdiff +
            ' milestone behind</td>';
            break;
          case 2,3,4,5:
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
            const div = document.createElement('div');
            div.innerHTML = 'The node ' + providerstr +
            'is ' + syncdiff +
            ' milestones behind !!';
            swal({
              title: 'Unsynced',
              content: div,
              icon: 'warning',
            });
        }
        elementstr += '</table><table class="table-striped table-hover'+
          ' table-bordered table-responsive" style="text-align:center">';
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

        let str = elementstr;
        //str += +'<div class="nodeinfo">Nodeinfo: ';
        //str += 'Local Time: '+myDate.toLocaleString();
        //str += ' IRI IP: ' + providerstr;
        //str += ' Db size: ' + formatBytes(info.dbSizeInBytes, 3);
        //str += ' Java RAM: Total: ' + formatBytes(info.jreTotalMemory, 3);
        //str += ', Free: ' + formatBytes(info.jreFreeMemory, 3);
        //str += ', Max: ' + formatBytes(info.jreMaxMemory, 2);
        //str += '</div>';
        switch (syncdiff) {
          case 0:
            // Synced
            str += '<div class="node_synced">' +
            '<b>LM / LSM: ' + info.latestMilestoneIndex +
            ' / ' + info.latestSolidSubtangleMilestoneIndex +
            ': Your node is currently ' +
            'Synced</b></div>';
            break;
          case 1:
          case 2:
          case 3:
            // a few behind!
            str += '<div class="node_warn_synced">'+
            '<b>LM / LSM: ' + info.latestMilestoneIndex +
            ' / ' + info.latestSolidSubtangleMilestoneIndex +
            ': Your node is currently '+syncdiff+
            ' milestone(s) behind</b></div>';
            break;
          default:
            // Unsynced!
            str += '<div class="node_unsynced">'+
            '<b>LM / LSM: ' + info.latestMilestoneIndex +
            ' / ' + info.latestSolidSubtangleMilestoneIndex +
            ': !! Your node is currently ' +
            'Unsynced and ' + syncdiff +
            ' milestones behind !!</b></div>';
            const div = document.createElement('div');
            div.innerHTML = str;
            swal({
              title: 'Unsynced',
              content: div,
              icon: 'warning',
            });
        }
        str += '<div class="container-fluid text-break"><div class="row">';
        aNodeInfo.forEach(function(add) {
          str += '<div class="col-sm-3 border"><b>'+
          camelCaseToTitleCase(add[0])+': </b>'+
          '<div class="iota_address">' +
          add[1]+'</div></div>';
        });
        str += '</div></div>';
        element.innerHTML = str;
      })
      .catch((error) => {
        console.log(`Request error: ${error.message}`);
      });

  //  return element+element2;
  return element;
}
 */

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
        let UnconnectedPeers = '';
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
            str = '<tr class="table-danger">';
            peerCounterUnconnected ++;
            UnconnectedPeers += '<div>Domain: '+
              oPeer[1].domain+
              ', address: '+oPeer[1].address+
              '</div>';
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
            const div = document.createElement('div');
            div.innerHTML = UnconnectedPeers;
            swal({
              title: 'Not connected Peer(s):',
              content: div,
              icon: 'warning',
              timer: 5000,
            });
          }
          // close table and container
          //          str += '</table></container>';
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


document.body.appendChild(divnodeinfoHline('iota'));
document.body.appendChild(divpeerinfo('iota'));
document.body.appendChild(divnodeinfoHline('iota2'));
document.body.appendChild(divpeerinfo('iota2'));
document.body.appendChild(divnodeinfoHline('hornet'));
document.body.appendChild(divpeerinfo('hornet'));
document.body.appendChild(divnodeinfoHline('comnet'));
document.body.appendChild(divpeerinfo('comnet'));
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
  const nodedivh1 = document.getElementById('nodeinfo_h_iota');
  const nodedivh2 = document.getElementById('nodeinfo_h_iota2');
  const nodedivh3 = document.getElementById('nodeinfo_h_hornet');
  const nodedivh4 = document.getElementById('nodeinfo_h_comnet');
  //  const olddiv2 = document.getElementById('nodeinfo');
  //  const olddiv3 = document.getElementById('nodeinfo2');
  const peerdiv1 = document.getElementById('peerinfo_iota');
  const peerdiv2 = document.getElementById('peerinfo_iota2');
  const peerdiv3 = document.getElementById('peerinfo_hornet');
  const peerdiv4 = document.getElementById('peerinfo_comnet');
  document.body.replaceChild(divnodeinfoHline('iota'), nodedivh1);
  document.body.replaceChild(divpeerinfo('iota'), peerdiv1);
  document.body.replaceChild(divnodeinfoHline('iota2'), nodedivh2);
  document.body.replaceChild(divpeerinfo('iota2'), peerdiv2);
  document.body.replaceChild(divnodeinfoHline('hornet'), nodedivh3);
  document.body.replaceChild(divpeerinfo('hornet'), peerdiv3);
  document.body.replaceChild(divnodeinfoHline('comnet'), nodedivh4);
  document.body.replaceChild(divpeerinfo('comnet'), peerdiv4);
//  document.body.replaceChild(divnodeinfo('iota'), nodediv1);
//  document.body.replaceChild(divnodeinfo('iota2'), nodediv2);
  //  document.body.replaceChild(divnodeinfo(), olddiv2);
  //  document.body.replaceChild(divnodeinfo2(), olddiv3);
}, 15000,
);
