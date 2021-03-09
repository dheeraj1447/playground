import playgroundTable from '../tables/playground-table';

import { Entity } from 'dynamodb-toolbox';

export interface IProjectActivityPost {
  organizationId: string;
  created?: string;
  modified?: string;
  entity?: string;
  activityId: string;
  activityType: string;
  projectId: string;
  ownerType: string;
  description: string;
  version: string;
  creator?: { id: string };
  lastModified: Record<string, any[]>;
}


/**
 * What things need to come in sorted order by default?
 * 1 - Get all the activities in project feed - MAJOR USE CASE 
 * 2 - Get all the activities for an organization - MAJOR USE CASE
 * 3 - Get all the activities for an activity type at project level
 * 4 - Get all the activities for an activity type at organization level
 * 5 - Get all the activities for a user - MAJOR USE CASE
 * 6 - Get all the activities for an activity type for a user
 */


export const ProjectActivityPostModel = new Entity<IProjectActivityPost>({
  name: 'ProjectActivityPostModel',
  table: playgroundTable,
  attributes: {
    pk: { partitionKey: true, default: (data: IProjectActivityPost) => `${data.ownerType}#${data.organizationId}` },
    sk: { sortKey: true, default: (data: IProjectActivityPost) => `v_${data.version}#${data.modified}#${data.activityId}` },
    ownerId: { type: 'string', required: true },
    activityId: { type: 'string', required: true },
    activityType: { type: 'string', required: true },
    projectId: { type: 'string', required: true },
    ownerType: { type: 'string', required: true },
    description: { type: 'string', required: true },
    version: { type: 'string', required: true },
    gsi1Pk: { default: (data: IProjectActivityPost) => `${data.ownerType}#${data.organizationId}#${data.projectId}` },
    gsi1Sk: { default: (data: IProjectActivityPost) => `v_${data.version}#${data.modified}#${data.activityId}` },
    gsi2Pk: { default: (data: IProjectActivityPost) => `${data.ownerType}#${data.organizationId}#${data.projectId}#${data.creator.id}` },
    gsi2Sk: { default: (data: IProjectActivityPost) => `v_${data.version}#${data.created}#${data.activityId}` },
  }
});
