const path = require('path');

const PostsReader = require('./posts-reader');
const PostsRenderer = require('./post-renderer');

module.exports = class PageGenerator {
  constructor(basePath) {
    this.basePath = basePath || process.cwd();
    this.postsReader = new PostsReader(path.join(this.basePath, 'posts/'));
    this.postsRenderer = new PostsRenderer(path.join(this.basePath, 'templates/'));
  }

  build() {
    return this.postsReader.read().then(posts => {
      posts.forEach(post => {
        console.log(this.postsRenderer.render(post));
      });
    });
  }
};