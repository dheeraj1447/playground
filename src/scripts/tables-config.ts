import { CreateTableInput, DeleteTableInput } from 'aws-sdk/clients/dynamodb';

export const createTablesConfig: CreateTableInput[] = [
  {
    TableName: 'playground',
    KeySchema: [
      {
      AttributeName: 'pk',
      KeyType: 'HASH'
    }, {
      AttributeName: 'sk',
      KeyType: 'RANGE'
    }],
    AttributeDefinitions: [{
      AttributeName: 'pk',
      AttributeType: 'S'
    }, {
      AttributeName: 'sk',
      AttributeType: 'S'
    }, {
      AttributeName: 'gsiPk',
      AttributeType: 'S'
    }, {
      AttributeName: 'gsiSk',
      AttributeType: 'S'
      }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    },
    StreamSpecification: {
      StreamEnabled: true,
      StreamViewType: 'NEW_AND_OLD_IMAGES'
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: 'gsiPlayground',
        KeySchema: [
          {
          AttributeName: 'gsiPk',
          KeyType: 'HASH'
        }, {
          AttributeName: 'gsiSk',
          KeyType: 'RANGE'
          }],
        Projection: {
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    ]
  }
];


export const deleteTablesConfig: DeleteTableInput[] = [
  {
    TableName: 'playground'
  }
];
