import { createTablesConfig } from './tables-config';

import { getDynamoDB } from '@src/common';
import { logger } from '@src/logger';
import { CreateTableInput } from 'aws-sdk/clients/dynamodb';

(async () => {
  try {
    const tablesConfiguration: CreateTableInput[] = createTablesConfig;
    logger.debug(`Creating ${tablesConfiguration.length} dynamodb tables...`);
    return await Promise.all(
      tablesConfiguration.map(async (tableConfig: CreateTableInput) => {
        const createdTable = await getDynamoDB()
          .createTable(tableConfig)
          .promise();
        logger.silly(`Created table. Table description JSON: ${JSON.stringify(createdTable)}`);
        return tableConfig;
      }),
    );
  } catch (e) {
    logger.error(`Error creating tables ${e}`);
  }
})();
