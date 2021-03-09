import { IProjectActivityPost, ProjectActivityPostModel } from '../models/post.model';
import playgroundTable from '../tables/playground-table';

import { logger } from '@src/logger';
import { subMonths } from 'date-fns';
import { v1 as uuid } from 'uuid';

const GENERATE_ITEMS = 10;

const ownerId = uuid();
const projectId = uuid();

const getPost = (randomNumber: number): IProjectActivityPost => {
  return {
    ownerId,
    activityId: uuid(),
    activityType: 'POST',
    ownerType: 'USER',
    description: 'New Post',
    projectId,
    version: '0',
    createdDate: `${subMonths(new Date(), randomNumber).toISOString()}`
    };
};


export const createPosts = async (): Promise<string> => {
  try {
    logger.info('=====creating posts=====');
    const allPosts = Array.from(Array(GENERATE_ITEMS).keys()).map(() => ProjectActivityPostModel.putBatch(getPost(Math.floor(Math.random() * GENERATE_ITEMS) + 1)));
    logger.debug(JSON.stringify(allPosts));
    const createdPosts = await playgroundTable.batchWrite([...allPosts], { capacity: 'total', metrics: 'size' });
    logger.info(`created posts - ${JSON.stringify(createdPosts)}`);
    return 'OK';
  } catch (e) {
    logger.error(e);
  }
};

export const queryPosts = async (): Promise<string> => {
  try {
    logger.info('=====querying posts=====');
    const pk = '057bd400-7e8a-11eb-8633-1594a7d57d69';
    const queriedPosts = await ProjectActivityPostModel.query(pk, { index: 'gsiPlayground', beginsWith: 'v_0', parse: true, entity: ProjectActivityPostModel.name, reverse: true }, { ProjectionExpression: 'gsiSk, createdDate' });
    logger.info(`queried posts - ${JSON.stringify(queriedPosts)}`);
    return 'OK';
  } catch (e) {
    logger.error(e);
  }
};


export const filterPosts = async (): Promise<string> => {
  try {
    logger.info('=====filter posts=====');
    return 'OK';
  } catch (e) {
    logger.error(e);
  }
};
