import { logger } from '@src/logger';
// import { v1 as uuid } from 'uuid';

// const GENERATE_ITEMS = 10;

export const generateSortKey = (): void => {
  const sortKey = new Date().toISOString();
  logger.info(sortKey);
};
