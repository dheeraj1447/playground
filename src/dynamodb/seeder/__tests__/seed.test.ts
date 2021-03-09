import { createPosts, queryPosts } from '../seed';

describe(`${__filename}: Seed tests`, () => {
  xit('should seed data to local dynamo', async () => {
    const posts = await createPosts();
    expect(posts).toEqual('OK');
  });
  
  it('query data from local dynamo', async () => {
    const posts = await queryPosts();
    expect(posts).toEqual('OK');
  });
});
