import { config } from 'dotenv';
import fs from 'fs';
import checkParam from './config/checkParam';
config();

describe('CONNECTOR - REPOSITORY', () => {
  let connector: string;

  beforeAll(async () => {
    const connectorParam = checkParam(
      process.env.npm_lifecycle_script,
      'connector'
    );
    if (connectorParam.err) throw new Error(connectorParam.err.message);
    connector = connectorParam.arg;
    if (!connector) {
      throw new Error(
        `
        ⚠️⚠️⚠️ You did not specify any name for your connector. Run "npm run test -- --connector=name_of_your_connector" ⚠️⚠️⚠️
        `
      );
    }
  });

  it('The connector must exist in the connector repository', async () => {
    const path = `src/connectors/${connector}`;
    const result = fs.existsSync(path);
    expect(result).toBeTruthy();
  });

  it('The connector must respect the repository structure: abi available in lowercase', async () => {
    const path = `src/connectors/${connector}/abi`;
    const result = fs.existsSync(path);
    expect(result).toBeTruthy();
  });

  it('The connector must respect the repository structure: analytics available in lowercase', async () => {
    const path = `src/connectors/${connector}/analytics`;
    const result = fs.existsSync(path);
    expect(result).toBeTruthy();
  });

  it('The connector must respect the repository structure: interactions available in lowercase', async () => {
    const path = `src/connectors/${connector}/interactions`;
    const result = fs.existsSync(path);
    expect(result).toBeTruthy();
  });

  it('There must be a file named "index.js/ts" in the analytics repository', async () => {
    const path = `src/connectors/${connector}/analytics`;
    const resultJS = fs.existsSync(`${path}/index.js`);
    const resultTS = fs.existsSync(`${path}/index.ts`);
    expect(resultJS || resultTS).toBeTruthy();
  });

  it('There must be a file named "index.js/ts" in the interactions repository', async () => {
    const path = `src/connectors/${connector}/interactions`;
    const resultJS = fs.existsSync(`${path}/index.js`);
    const resultTS = fs.existsSync(`${path}/index.ts`);
    expect(resultJS || resultTS).toBeTruthy();
  });

  it('There must be a file named "pools.js/ts" at the pools repository', async () => {
    const path = `src/connectors/${connector}/pools`;
    const resultJS = fs.existsSync(`${path}/pools.js`);
    const resultTS = fs.existsSync(`${path}/pools.ts`);
    expect(resultJS || resultTS).toBeTruthy();
  });

  it('There must be ONLY TS files in the ABI repository', async () => {
    const path = `src/connectors/${connector}/abi`;
    const abis = fs.readdirSync(path);
    for (const abi of abis) {
      expect(abi.includes('.ts')).toBeTruthy();
    }
  });

  it('There must be ONLY repositories at the route of the protocol repository', async () => {
    const split = connector.split('/');
    const protocol = split[0];
    const path = `src/connectors/${protocol}`;
    const versions = fs.readdirSync(path);
    for (const version of versions) {
      expect(fs.lstatSync(`${path}/${version}`).isDirectory()).toBeTruthy();
    }
  });
});
