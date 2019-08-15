"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _utils = require("@reach/router/lib/utils");

var _stripPrefix = _interopRequireDefault(require("./strip-prefix"));

var _normalizePagePath = _interopRequireDefault(require("./normalize-page-path"));

const trimPathname = rawPathname => {
  let pathname = decodeURIComponent(rawPathname); // Remove the pathPrefix from the pathname.

  let trimmedPathname = (0, _stripPrefix.default)(pathname, __BASE_PATH__); // Remove any hashfragment

  if (trimmedPathname.split(`#`).length > 1) {
    trimmedPathname = trimmedPathname.split(`#`).slice(0, -1).join(``);
  } // Remove search query


  if (trimmedPathname.split(`?`).length > 1) {
    trimmedPathname = trimmedPathname.split(`?`).slice(0, -1).join(``);
  }

  return trimmedPathname;
};

class PathFinder {
  constructor(matchPaths) {
    this.matchPaths = matchPaths;
    this.pathCache = new Map();
  }

  findMatchPath(trimmedPathname) {
    for (const _ref of this.matchPaths) {
      const {
        matchPath,
        path
      } = _ref;

      if ((0, _utils.match)(matchPath, trimmedPathname)) {
        return path;
      }
    }

    return null;
  } // Given a raw URL path, returns the cleaned version of it (trim off
  // `#` and query params), or if it matches an entry in
  // `match-paths.json`, its matched path is returned
  //
  // E.g `/foo?bar=far` => `/foo`
  //
  // Or if `match-paths.json` contains `{ "/foo*": "/page1", ...}`, then
  // `/foo?bar=far` => `/page1`


  find(rawPathname) {
    let trimmedPathname = trimPathname(rawPathname);

    if (this.pathCache.has(trimmedPathname)) {
      return this.pathCache.get(trimmedPathname);
    }

    let foundPath = this.findMatchPath(trimmedPathname);

    if (!foundPath) {
      if (trimmedPathname === `/index.html`) {
        foundPath = `/`;
      } else {
        foundPath = trimmedPathname;
      }
    }

    foundPath = (0, _normalizePagePath.default)(foundPath);
    this.pathCache.set(trimmedPathname, foundPath);
    return foundPath;
  }

}

var _default = PathFinder;
exports.default = _default;