import * as PostController from '../controllers/post.controller';

export default function (router, protectedMiddleware) {
// Get all Posts
  router.get('/posts', PostController.getPosts);

// Get one post by cuid
  router.get('/posts/:cuid', PostController.getPost);

// Add a new Post
  router.post('/posts', PostController.addPost);

// Delete a post by cuid
  router.delete('/posts/:cuid', PostController.deletePost);
  return router;
};
