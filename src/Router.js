/**
 * <Router />
 *
 * This is adapted from <ReactRouter.Router /> to enable routes hot reloading
 * and strip away unneeded functionality.
 *
 * @copyright 2016-present, Sitegen team
 * @flow
 */

import type {
  MatchContext,
  CancelSubscription,
  RouterState
} from 'react-router';

import React from 'react';
import {RouterContext} from 'react-router';

type Props = {
  onUpdate: () => void;
  onError: (error: Error) => void;
  history: mixed;
  routes: mixed;
  matchContext: MatchContext;
};

const INITIAL_STATE: RouterState = {
  location: null,
  routes: null,
  params: null,
  components: null
};

export default class Router extends React.Component {

  state: RouterState;
  props: Props;

  _unlisten: ?CancelSubscription;

  constructor(props: Props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  render() {
    let {location, routes, params, components} = this.state;
    let {matchContext: {history, router}, ...props} = this.props;

    if (location == null) {
      // Async match
      return null;
    }

    return (
      <RouterContext
        {...props}
        history={history}
        router={router}
        location={location}
        routes={routes}
        params={params}
        components={components}
        />
    );
  }

  componentWillMount() {
    this.initializeRouter();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.history !== this.props.history ||
      nextProps.routes !== this.props.routes
    ) {
      this.setState(INITIAL_STATE);
      this.initializeRouter();
    }
  }

  componentWillUnmount() {
    if (this._unlisten) {
      this._unlisten();
    }
  }

  handleError(error: Error) {
    if (this.props.onError) {
      this.props.onError.call(this, error);
    } else {
      // Throw errors by default so we don't silently swallow them!
      // This error probably occurred in getChildRoutes or getComponents.
      throw error;
    }
  }

  initializeRouter() {
    let {transitionManager} = this.props.matchContext;

    if (this._unlisten) {
      this._unlisten();
    }

    this._unlisten = transitionManager.listen((error, state) => {
      if (error) {
        this.handleError(error);
      } else {
        this.setState(state, this.props.onUpdate);
      }
    });
  }

}
