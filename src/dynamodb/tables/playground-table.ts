import { documentClient } from '@src/common/aws/dynamodb';
import { Table } from 'dynamodb-toolbox';

const playgroundTable = new Table({
  name: 'playground_vamstar',
  partitionKey: 'pk',
  sortKey: 'sk',
  indexes: {
    gsi1: { partitionKey: 'gsi1Pk', sortKey: 'gsi1Sk' },
    gsi2: { partitionKey: 'gsi2Pk', sortKey: 'gsi2Sk' },
  },
  DocumentClient: documentClient()
});

export default playgroundTable;
