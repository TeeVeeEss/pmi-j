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
  // Show getNodeInfo in page
  iota.getNodeInfo()
      .then((info) => {
        const aNodeInfo = Object.entries(info);
        element.classList.add('nodeinfo');
        element.id = 'nodeinfo';
        let str = '<div class="nodeinfo">'+
          'Nodeinfo, ';
        const myDate = new Date(info.time);
        str += 'Local Time: '+myDate.toLocaleString()+'</div>';
        const syncdiff = info.latestMilestoneIndex -
          info.latestSolidSubtangleMilestoneIndex;
        switch (syncdiff) {
          case 0:
            // Synced
            str += '<div class="node_synced">'+
            '<b>Your node is currently '+
            'Synced</b></div>';
            break;
          case 1:
          case 2:
          case 3:
            // a few behind!
            str += '<div class="node_warn_synced">'+
            '<b>Your node is currently '+syncdiff+
            ' milestone(s) behind</b></div>';
            break;
          default:
            // Unsynced!
            str += '<div class="node_unsynced">'+
            '<b>!! Your node is currently '+
            'Unsynced and '+syncdiff+
            'milestones behind !!</b></div>';
            swal({
              title: 'Unsynced',
              content: str,
              icon: 'warning',
            });
        }
        str += '<div class="container-fluid text-break"><div class="row">';
        aNodeInfo.forEach(function(add) {
          str += '<div class="col-sm-3 border"><b>'+
          camelCaseToTitleCase(add[0])+': </b>'+
          add[1]+'</div>';
        });
        str += '</div></div>';
        element.innerHTML = str;
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

  const element = document.createElement('container');

  // Show getPeers in page
  iota.getNeighbors()
      .then((info) => {
        const aPeers = Object.entries(info);
        let elementstr = '<div>Details of your peers</div>';
        //        '<div class="container">';
        //        '<div class="row">';
        element.classList.add('peerinfo_connected');
        element.id = 'peerinfo';
        let UnconnectedPeers = '';
        const totalPeers = aPeers.length;
        let peerCounter = 1;

        /**
        // Peers in Row and Columns
        aPeers.forEach(function(oPeer) {
          const aPeer = Object.entries(oPeer[1]);
          let str = '';
          switch (peerCounter) {
            case 1:
              // Header
              str += '<div class="col-sm col-md border '+
              'small text-right">'+
              '<div>'+
              'Peer Counter:</div>';
              aPeer.forEach(function(Header) {
                str += '<div class="border">'+
                camelCaseToTitleCase(Header[0])+':</div>';
              });
              str += '</div>';
            default:
              // Values
              str += '<div class="col-sm col-md border small';
              if (oPeer[1].connected == false) {
                UnconnectedPeers += '<div>Domain: '+
                oPeer[1].domain+
                ', address: '+oPeer[1].address+
                '</div>';
                str += ' peerinfo_unconnected';
              }
              str += '"><div>Peer '+
              peerCounter+' of '+totalPeers+'</div>';
              aPeer.forEach(function(Peer) {
                str += '<div class="border">'+Peer[1]+'</div>';
              });
              str += '</div>';
          }
          peerCounter ++;
          elementstr += str;
          if (UnconnectedPeers.length > 0) {
            const div = document.createElement('div');
            div.innerHTML = UnconnectedPeers;
            swal({
              title: 'Not connected Peer(s):',
              content: div,
              icon: 'warning',
              timer: 5000,
            });
          }
        });
        elementstr += '</div></div>';
**/
        // Peers in Table
        // open container for table
        //        elementstr += '<div class="container">'+
        elementstr += '<table class="table-striped table-hover'+
          ' table-bordered table-responsive" style="text-align:center">';
        peerCounter = 1;
        aPeers.forEach(function(oPeer) {
          const aPeer = Object.entries(oPeer[1]);
          let str = '<tr>';
          if (oPeer[1].connected == false) {
            str = '<tr class="table-danger">';
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
                str += '<th>'+
                camelCaseToTitleCase(Header[0])+'</th>';
              });
              str += '</tr><tr class="text-break">';
            default:
              // Values
              str += '<td>';
              str += peerCounter+' of '+totalPeers+'</td>';
              aPeer.forEach(function(Peer) {
                str += '<td>'+Peer[1]+'</td>';
              });
          }
          str += '</tr>';
          peerCounter ++;
          elementstr += str;
          if (UnconnectedPeers.length > 0) {
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

document.body.appendChild(divpeerinfo());
document.body.appendChild(divnodeinfo());

// Rebuild page every 15 seconds
setInterval(function() {
  const olddiv1 = document.getElementById('peerinfo');
  const olddiv2 = document.getElementById('nodeinfo');
  document.body.replaceChild(divpeerinfo(), olddiv1);
  document.body.replaceChild(divnodeinfo(), olddiv2);
}, 15000,
);
