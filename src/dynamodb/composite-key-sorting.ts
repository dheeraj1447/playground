import { logger } from '@src/logger';
import { subMonths } from 'date-fns';
import { v1 as uuid } from 'uuid';

const GENERATE_ITEMS = 10;

export const generateSortKey = (): string => {
  const randomNumber = Math.floor(Math.random() * GENERATE_ITEMS) + 1; // Random number from 1 to 10
  const sortKey = `v_0#${uuid()}#${subMonths(new Date(), randomNumber).toISOString()}#POST`;
  logger.info(sortKey);
  return sortKey;
};

export const generate = (): void => {
  const generatedKeys = Array.from(Array(GENERATE_ITEMS).keys()).map(() => generateSortKey());
  const sortedKeys = generatedKeys.sort((a, b) => a.localeCompare(b));
  logger.info('======Sorted Keys are=====');
  sortedKeys.forEach(key => logger.info(key));
};
