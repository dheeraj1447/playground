import { CreateTableInput, DeleteTableInput } from 'aws-sdk/clients/dynamodb';

export const createTablesConfig: CreateTableInput[] = [
  {
    TableName: 'playground_vamstar',
    KeySchema: [
      {
      AttributeName: 'pk',
      KeyType: 'HASH'
    }, {
      AttributeName: 'sk',
      KeyType: 'RANGE'
    }],
    AttributeDefinitions: [
      {
      AttributeName: 'pk',
      AttributeType: 'S'
      },
      {
      AttributeName: 'sk',
      AttributeType: 'S'
      },
      {
      AttributeName: 'gsi1Pk',
      AttributeType: 'S'
      },
      {
      AttributeName: 'gsi1Sk',
      AttributeType: 'S'
      },
      {
      AttributeName: 'gsi2Pk',
      AttributeType: 'S'
      },
      {
      AttributeName: 'gsi2Sk',
      AttributeType: 'S'
      }
    ],
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
        IndexName: 'gsi1',
        KeySchema: [
          {
          AttributeName: 'gsi1Pk',
          KeyType: 'HASH'
        }, {
          AttributeName: 'gsi1Sk',
          KeyType: 'RANGE'
          }],
        Projection: {
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      },
      {
        IndexName: 'gsi2',
        KeySchema: [
          {
          AttributeName: 'gsi2Pk',
          KeyType: 'HASH'
        }, {
          AttributeName: 'gsi2Sk',
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
    TableName: 'playground_vamstar'
  }
];
