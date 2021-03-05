import playgroundTable from '../tables/playground-table';

import { Entity } from 'dynamodb-toolbox';

export interface IProjectActivityPost {
  studentId: string;
  created: string;
  modified: string;
  entity: string;
  activityId: string;
  activityType: string;
  projectId: string;
  studentType: string;
  description: string;
  version: number;
}


const ProjectActivityPostModel = new Entity<IProjectActivityPost>({
  name: 'ProjectActivityPostModel',
  table: playgroundTable,
  attributes: {
    pk: { partitionKey: true, default: (data: IProjectActivityPost) => `${data.studentType}#${data.studentId}#${data.projectId}` },
    sk: { sortKey: true, default: (data: IProjectActivityPost) => `v_${data.version}#${data.activityId}` },
    ownerId: { type: 'string', required: true },
    activityId: { type: 'string', required: true },
    activityType: { type: 'string', required: true },
    projectId: { type: 'string', required: true },
    ownerType: { type: 'string', required: true },
    description: { type: 'string', required: true },
    version: { type: 'number', required: true },
    gsiPk: { default: (data: IProjectActivityPost) => `${data.studentId}` },
    gsiSk: { default: (data: IProjectActivityPost) => `v_${data.version}#${data.created}#${data.projectId}#${data.activityType}` },
  }
});

export default ProjectActivityPostModel;
