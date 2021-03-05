import { deleteTablesConfig } from './tables-config';

import { getDynamoDB } from '@src/common';
import { logger } from '@src/logger';
import { DeleteTableInput } from 'aws-sdk/clients/dynamodb';

(async () => {
  try {
    const tablesConfiguration: DeleteTableInput[] = deleteTablesConfig;
    logger.debug(`Creating ${tablesConfiguration.length} dynamodb tables...`);
    return await Promise.all(
      tablesConfiguration.map(async (tableConfig: DeleteTableInput) => {
        const createdTable = await getDynamoDB()
          .deleteTable(tableConfig)
          .promise();
        logger.silly(`Deleted table. Table description JSON: ${JSON.stringify(createdTable)}`);
        return tableConfig;
      }),
    );
  } catch (e) {
    logger.error(`Error deleting tables ${e}`);
  }
})();
