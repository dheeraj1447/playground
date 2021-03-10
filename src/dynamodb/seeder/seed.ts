import { IProjectActivityPost, ProjectActivityPostModel } from '../models/post.model';
import playgroundTable from '../tables/playground-table';

import { logger } from '@src/logger';
import { subMonths } from 'date-fns';
import { v1 as uuid } from 'uuid';

const GENERATE_ITEMS = 10;

const organisationId = uuid();
const projectId = uuid();
const userId = uuid();

const getPost = (randomNumber: number): IProjectActivityPost => {
  return {
    ownerId: randomNumber % 2 === 0 ? organisationId : userId,
    activityId: uuid(),
    activityType: 'POST',
    ownerType: randomNumber % 2 === 0 ? 'ORGANISATION' : 'USER',
    description: 'New Post ' + randomNumber,
    projectId,
    version: 1,
    created: `${subMonths(new Date(), randomNumber).toISOString()}`,
    modified: `${subMonths(new Date(), randomNumber).toISOString()}`,
    creator: { id: userId },
    organisation: randomNumber % 2 === 0 ? { id: organisationId } : null
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

export const queryUserPosts = async (pk: string): Promise<string> => {
  try {
    logger.info('=====querying posts of all users=====');
    const queriedPosts = await ProjectActivityPostModel.query(pk, { index: 'gsi1', beginsWith: 'v_1', parse: true, entity: ProjectActivityPostModel.name, reverse: true }, { ProjectionExpression: 'created' });
    logger.info(`queried posts - ${JSON.stringify(queriedPosts)}`);
    return 'OK';
  } catch (e) {
    logger.error(e);
  }
};

export const queryOrganisationPosts = async (pk: string): Promise<string> => {
  try {
    logger.info('=====querying posts of organisation=====');
    const queriedPosts = await ProjectActivityPostModel.query(pk, { index: 'gsi2', beginsWith: 'v_1', parse: true, entity: ProjectActivityPostModel.name, reverse: true }, { ProjectionExpression: 'modified' });
    logger.info(`queried posts - ${JSON.stringify(queriedPosts)}`);
    return 'OK';
  } catch (e) {
    logger.error(e);
  }
};

export const updatePost = async (ownerType: string, ownerId: string, project: string, modified: string, activityId: string): Promise<string> => {
  try {
    logger.info('=====updating post=====');
    const updatedPost = await ProjectActivityPostModel.update(
      {
        ownerType,
        ownerId,
        projectId: project,
        modified,
        activityId,
        version: 1,
        description: 'New description updated 1',
      },
      { returnValues: 'all_new' });
    logger.info(`updated post - ${JSON.stringify(updatedPost)}`);
    return 'OK';
  } catch (e) {
    logger.error(e);
  }
};
