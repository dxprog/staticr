const bluebird = require('bluebird');
const fs = bluebird.promisifyAll(require('fs'));
const fm = require('front-matter');
const marked = require('marked');
const path = require('path');

module.exports = class PostsReader {
  constructor(path) {
    this.path = path;
    this.posts = [];
  }

  read() {
    return fs.readdirAsync(this.path)
      .then(posts => Promise.all(posts.map(post => {
        return fs.readFileAsync(path.join(this.path, post)).then(data => {
          const retVal = fm(data.toString('utf-8'));
          retVal.html = marked(retVal.body.trim());
          return retVal;
        });
      })));
  }
};