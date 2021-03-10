import { createPosts, queryOrganisationPosts, queryUserPosts, updatePost } from '../seed';

describe(`${__filename}: Seed tests`, () => {
  xit('should seed data to local dynamo', async () => {
    const posts = await createPosts();
    expect(posts).toEqual('OK');
  });
  
  xit('query user posts from local dynamo', async () => {
    const posts = await queryUserPosts('USER#0e08a8c1-8199-11eb-9cbe-774d1f5777d1');
    expect(posts).toEqual('OK');
  });
  
  xit('query organisation posts from local dynamo', async () => {
    const posts = await queryOrganisationPosts('ORGANISATION#0e0881b0-8199-11eb-9cbe-774d1f5777d1');
    expect(posts).toEqual('OK');
  });
  
  it('update post', async () => {
    const posts = await updatePost(
      'USER',
      '0e08a8c1-8199-11eb-9cbe-774d1f5777d1',
      '0e08a8c0-8199-11eb-9cbe-774d1f5777d1',
      '2020-08-10T12:06:33.049Z',
      '0e0aa493-8199-11eb-9cbe-774d1f5777d1'
    );
    expect(posts).toEqual('OK');
  });
});
