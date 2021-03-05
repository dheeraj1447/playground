import serviceConfigurationOptions from './aws-config';

import DynamoDB, { DocumentClient } from 'aws-sdk/clients/dynamodb';

// dynamodb
export const getDynamoDB = (): DynamoDB => new DynamoDB(serviceConfigurationOptions);

// document client
export const documentClient = (): DocumentClient => new DocumentClient(serviceConfigurationOptions);

