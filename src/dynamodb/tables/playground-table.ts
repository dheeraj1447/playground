import { documentClient } from '@src/common/aws/dynamodb';
import { Table } from 'dynamodb-toolbox';

const playgroundTable = new Table({
  name: 'playground',
  partitionKey: 'pk',
  sortKey: 'sk',
  indexes: {
    gsiPlayground: { partitionKey: 'gsiPk', sortKey: 'gsiSk' },
  },
  DocumentClient: documentClient()
});

export default playgroundTable;
