const fs = require('fs');
const Handlebars = require('handlebars');
const path = require('path');

module.exports = class PostRenderer {
  constructor(templatePath) {
    const templateSrc = fs.readFileSync(path.join(templatePath, 'post.hbs'));
    this.postTemplate = Handlebars.compile(templateSrc.toString('utf-8'));
  }

  render(post) {
    return this.postTemplate(post);
  }
}