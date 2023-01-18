/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

const poolsSRC = "/blueprint/js/pools.js";
const interactionSRC = "/blueprint/js/interaction.js";
const analyticsSRC = "/blueprint/js/analytics.js";

function checkParam(string, arg) {
  try {
    const SPLIT = string.split(`--${arg}=`)[1];
    console.log("split", SPLIT);
    if (!SPLIT) {
      return { arg: null, err: null };
    }
    const param = SPLIT;
    if (!param) {
      throw new Error(
        `
         You did not specify any name for your connector. 
         Run "npm run "create-file" -- --connector=name_of_your_connector"
        `
      );
    }
    return { arg: param, err: null };
  } catch (err) {
    return { arg: null, err: err };
  }
}

async function createDirectory(relativePath) {
  fs.mkdirSync(path.join(__dirname, relativePath), {
    recursive: true,
  });
}

async function generateFile(relativePath, copySRC) {
  fs.copyFileSync(
    path.join(__dirname, copySRC),
    path.join(__dirname, relativePath)
  );
}

async function createNewProtocol() {
  console.log(process.env.npm_lifecycle_script);
  const connectorParam = checkParam(
    process.env.npm_lifecycle_script,
    "connector"
  );
  console.log(connectorParam);
  if (connectorParam.err) throw new Error(connectorParam.err.message);
  const connector = connectorParam.arg;
  if (!connector) {
    throw new Error(
      `You did not specify any name for your connector. 
       Run "npm run "create-file" -- --connector=name_of_your_connector"`
    );
  }
  await createDirectory(`../src/connectors/${connector}`);
  await createDirectory(`../src/connectors/${connector}/pools`);
  await createDirectory(`../src/connectors/${connector}/abi`);
  await createDirectory(`../src/connectors/${connector}/interactions`);
  await createDirectory(`../src/connectors/${connector}/analytics`);
  await createDirectory(`../src/connectors/${connector}/analytics/external`);
  await generateFile(
    `../src/connectors/${connector}/interactions/index.js`,
    interactionSRC
  );
  await generateFile(
    `../src/connectors/${connector}/analytics/index.js`,
    analyticsSRC
  );
  await generateFile(`../src/connectors/${connector}/pools/pools.js`, poolsSRC);
}

createNewProtocol();
