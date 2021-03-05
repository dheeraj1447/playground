import { generateSortKey } from '../composite-key-sorting';

import { logger } from '@src/logger';



describe(`${__filename}: Composite key sorting testing`, () => {
  it('should test for string sort key', () => {
    const sortKey = generateSortKey();
    logger.debug(`Sort key formed ${sortKey}`);
    expect(typeof sortKey).toBe('string');
  });
});
