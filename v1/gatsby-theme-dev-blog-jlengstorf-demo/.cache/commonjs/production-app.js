"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _apiRunnerBrowser = require("./api-runner-browser");

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _router = require("@reach/router");

var _gatsbyReactRouterScroll = require("gatsby-react-router-scroll");

var _domready = _interopRequireDefault(require("@mikaelkristiansson/domready"));

var _navigation = require("./navigation");

var _emitter = _interopRequireDefault(require("./emitter"));

var _pageRenderer = _interopRequireDefault(require("./page-renderer"));

var _asyncRequires = _interopRequireDefault(require("./async-requires"));

var _loader = require("./loader");

var _ensureResources = _interopRequireDefault(require("./ensure-resources"));

var _stripPrefix = _interopRequireDefault(require("./strip-prefix"));

var _matchPaths = _interopRequireDefault(require("./match-paths.json"));

// Generated during bootstrap
const loader = new _loader.ProdLoader(_asyncRequires.default, _matchPaths.default);
(0, _loader.setLoader)(loader);
loader.setApiRunner(_apiRunnerBrowser.apiRunner);
window.asyncRequires = _asyncRequires.default;
window.___emitter = _emitter.default;
window.___loader = loader;
window.___webpackCompilationHash = window.webpackCompilationHash;
(0, _navigation.init)();
(0, _apiRunnerBrowser.apiRunnerAsync)(`onClientEntry`).then(() => {
  // Let plugins register a service worker. The plugin just needs
  // to return true.
  if ((0, _apiRunnerBrowser.apiRunner)(`registerServiceWorker`).length > 0) {
    require(`./register-service-worker`);
  }

  class RouteHandler extends _react.default.Component {
    render() {
      let {
        location
      } = this.props;
      return _react.default.createElement(_ensureResources.default, {
        location: location
      }, ({
        pageResources,
        location
      }) => _react.default.createElement(_navigation.RouteUpdates, {
        location: location
      }, _react.default.createElement(_gatsbyReactRouterScroll.ScrollContext, {
        location: location,
        shouldUpdateScroll: _navigation.shouldUpdateScroll
      }, _react.default.createElement(_pageRenderer.default, (0, _extends2.default)({}, this.props, {
        location: location,
        pageResources: pageResources
      }, pageResources.json)))));
    }

  }

  const {
    pagePath,
    location: browserLoc
  } = window; // Explicitly call navigate if the canonical path (window.pagePath)
  // is different to the browser path (window.location.pathname). But
  // only if NONE of the following conditions hold:
  //
  // - The url matches a client side route (page.matchPath)
  // - it's a 404 page
  // - it's the offline plugin shell (/offline-plugin-app-shell-fallback/)

  if (pagePath && __BASE_PATH__ + pagePath !== browserLoc.pathname && !(loader.pathFinder.findMatchPath((0, _stripPrefix.default)(browserLoc.pathname, __BASE_PATH__)) || pagePath === `/404.html` || pagePath.match(/^\/404\/?$/) || pagePath.match(/^\/offline-plugin-app-shell-fallback\/?$/))) {
    (0, _router.navigate)(__BASE_PATH__ + pagePath + browserLoc.search + browserLoc.hash, {
      replace: true
    });
  }

  loader.loadPage(browserLoc.pathname).then(page => {
    if (!page || page.status === `error`) {
      throw new Error(`page resources for ${browserLoc.pathname} not found. Not rendering React`);
    }

    const Root = () => (0, _react.createElement)(_router.Router, {
      basepath: __BASE_PATH__
    }, (0, _react.createElement)(RouteHandler, {
      path: `/*`
    }));

    const WrappedRoot = (0, _apiRunnerBrowser.apiRunner)(`wrapRootElement`, {
      element: _react.default.createElement(Root, null)
    }, _react.default.createElement(Root, null), ({
      result
    }) => {
      return {
        element: result
      };
    }).pop();

    let NewRoot = () => WrappedRoot;

    const renderer = (0, _apiRunnerBrowser.apiRunner)(`replaceHydrateFunction`, undefined, _reactDom.default.hydrate)[0];
    (0, _domready.default)(() => {
      renderer(_react.default.createElement(NewRoot, null), typeof window !== `undefined` ? document.getElementById(`___gatsby`) : void 0, () => {
        (0, _apiRunnerBrowser.apiRunner)(`onInitialClientRender`);
      });
    });
  });
});