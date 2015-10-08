import React                              from 'react';
import ReactDOM                           from 'react-dom';
import {RoutingContext, match}            from 'react-router';
import createBrowserHistory               from 'history/lib/createBrowserHistory';
import RenderRoot                         from './RenderRoot';
import createPage                         from './createPage';
import * as RouteUtils                    from './RouteUtils';
import * as LinkRegistry                  from './LinkRegistry';
import * as MetaRegistry                  from './MetaRegistry';
import Meta                               from './Meta';

function initializeLinkRegistry(routes) {
  if (LinkRegistry.isInitialized()) {
    return Promise.resolve();
  } else {
    return RouteUtils.collectRoutes(routes).then(LinkRegistry.initialize);
  }
}

function initializeMetaRegistry(routes) {
  if (MetaRegistry.isInitialized) {
    return Promise.resolve();
  } else {
    return RouteUtils.collectRoutes(routes).then(MetaRegistry.populateFromRoutes);
  }
}

export default function createSite(spec, key) {
  let routes = {
    ...createPage(spec, key),

    getRenderedMeta() {
      return Meta.rewind();
    }
  };

  routes.renderIntoDocument = function(element = RenderRoot.getDOMNode()) {

    function render() {
      let history = createBrowserHistory();
      let unlisten = history.listen(location =>
        match({routes, location}, (err, redirect, props) =>
          ReactDOM.render(<RoutingContext {...props} history={history} />, element)));

      return Promise.resolve(function unmount() {
        unlisten();
        ReactDOM.unmountComponentAtNode(element);
      });
    }

    return Promise.resolve()
      .then(() => initializeLinkRegistry(routes))
      .then(() => initializeMetaRegistry(routes))
      .then(() => render())
      .catch(err => {
        throw err;
      });
  };

  return routes;
}
