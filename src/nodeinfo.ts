const { Client, initLogger } = require("@iota/sdk");

function showJSON(parent: HTMLElement, elem: any) {
  if (typeof elem === "object" && elem instanceof Array) {
    let dl = document.createElement("dl");
    for (let i = 0; i < elem.length; i++) {
      let dt = document.createElement("dt");
      dt.innerText = i + ":";
      let dd = document.createElement("dd");
      showJSON(dd, elem[i]);
      dl.appendChild(dt);
      dl.appendChild(dd);
    }
    parent.appendChild(dl);
  } else if (typeof elem === "object") {
    let dl = document.createElement("dl");
    for (let key in elem) {
      let dt = document.createElement("dt");
      dt.innerText = key + ":";
      let dd = document.createElement("dd");
      showJSON(dd, elem[key]);
      dl.appendChild(dt);
      dl.appendChild(dd);
    }
    parent.appendChild(dl);
  } else if (/^0x([0-9a-f][0-9a-f])+$/.test(elem.toString())) {
    parent.innerHTML =
      "<tt>" +
      elem.toString() +
      "</tt><sup><a href=\"javascript:copyText('" +
      elem.toString() +
      "');\">[Copy]</a></sup>";
  } else {
    parent.innerText = elem.toString() + "\u00A0";
  }
}

async function run() {
  initLogger();

  const client = new Client({
    nodes: ["https://stardust.xeevee.net"],
    localPow: true,
  });

  try {
    let nodeInfo = await client.getInfo();
    console.log("Node info: ", nodeInfo);

    while (true) {
      nodeInfo = await client.getInfo();
      console.log("Node info: ", nodeInfo);
      let nodediv = document.getElementById("nodeinfo") as HTMLElement;
      nodediv.innerHTML = "";
      showJSON(nodediv, nodeInfo);

      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

run().then(() => process.exit());
