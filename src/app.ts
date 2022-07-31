/* eslint-disable @typescript-eslint/no-var-requires */
// import { generate } from '@src/dynamodb';

// generate();

import { logger } from './logger';

import axios from 'axios';
import { parseXbrlFile } from 'xbrl-parser';

import { writeFileSync } from 'fs';

(async () => {
  try {
    const response = await axios
      .get('https://archives.nseindia.com/corporate/xbrl/INDAS_83515_634675_13042022084056_WEB.xml', { responseType: 'text' });
    const parsedDoc = await parseXbrlFile(response.data);
    writeFileSync('/Users/dheeraj/Desktop/financials.json', JSON.stringify(parsedDoc));
    logger.info(parsedDoc);
  } catch (err) {
    logger.error(err);
  }
})();

