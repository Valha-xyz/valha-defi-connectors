/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs';
import { Pool } from '../../../../utils/types/connector-types';
import { Chain } from '../../../../utils/types/networks';
const path = require('path');

async function generatePools(): Promise<Pool | Record<never, never>> {}

async function updatePools() {
  const pools = await generatePools();
  const strPools = JSON.stringify(pools, null, 4);
  const relativePath = path.join(__dirname, '/generatedPools.json');
  fs.writeFileSync(relativePath, strPools);
}

updatePools();
