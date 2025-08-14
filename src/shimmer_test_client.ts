const { ClientTest, initLoggerTest } = require("@iota/sdk");

async function runTest() {
  initLoggerTest();

  const client = new ClientTest({
    nodes: ["https://api.testnet.shimmer.network"],
    localPow: true,
  });

  try {
    const nodeInfo = await client.getInfo();
    console.log("Node info: ", nodeInfo);
  } catch (error) {
    console.error("Error: ", error);
  }
}

runTest().then(() => process.exit());
