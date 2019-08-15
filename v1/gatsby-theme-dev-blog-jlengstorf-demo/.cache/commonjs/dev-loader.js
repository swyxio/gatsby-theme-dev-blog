"use strict";

exports.__esModule = true;
exports.default = void 0;

var _loader = require("./loader");

class DevLoader extends _loader.BaseLoader {
  constructor(syncRequires, matchPaths) {
    const loadComponent = chunkName => Promise.resolve(syncRequires.components[chunkName]);

    super(loadComponent, matchPaths);
  }

  loadPage(pagePath) {
    const realPath = this.pathFinder.find(pagePath);
    return super.loadPage(realPath).then(result => {
      require(`./socketIo`).getPageData(realPath);

      return result;
    });
  }

  loadPageDataJson(rawPath) {
    return super.loadPageDataJson(rawPath).then(data => {
      // when we can't find a proper 404.html we fallback to dev-404-page
      if (data.status === `failure`) {
        return this.loadPageDataJson(`/dev-404-page/`);
      }

      return data;
    });
  }

  doPrefetch(pagePath) {
    return Promise.resolve(require(`./socketIo`).getPageData(pagePath));
  }

}

var _default = DevLoader;
exports.default = _default;