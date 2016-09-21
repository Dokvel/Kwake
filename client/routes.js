/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';
import AdminApp from './modules/Admin/Admin';
import Base from './Base';
import DefaultLayout from './components/DefaultLayout/DefaultLayout';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
 https://github.com/reactjs/react-router/issues/2182 and
 https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/User/pages/SetupAccountPage/SetupAccountPage');
  require('./modules/App/pages/LandingPage/LandingPage');
  require('./modules/App/pages/ThanxPage/ThanxPage');
  require('./modules/App/pages/TermsPage/TermsPage');
  require('./modules/User/pages/UserProfilePage/UserProfilePage');
  require('./modules/Evaluate/pages/UserEvaluatePage/UserEvaluatePage');
  require('./modules/Admin/pages/AdminLoginPage/AdminLoginPage');
  require('./modules/Admin/pages/UsersListPage/UsersListPage');
  require('./modules/Admin/pages/UserDetailPage/UserDetailPage');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (

  <Route path="/" component={Base}>
    <Route
      path="/terms"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/App/pages/TermsPage/TermsPage').default);
        });
      }}
    />
    <Route path="/admin" component={AdminApp}>
      <IndexRoute
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Admin/pages/AdminLoginPage/AdminLoginPage').default);
          });
        }}
      />
      <Route
        path="/admin/users"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Admin/pages/UsersListPage/UsersListPage').default);
          });
        }}
      />
      <Route
        path="/admin/users/:cuid"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Admin/pages/UserDetailPage/UserDetailPage').default);
          });
        }}
      />
    </Route>
    <Route component={App}>
      <IndexRoute
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/App/pages/LandingPage/LandingPage').default);
          });
        }}
      />
      <Route
        path="/thanks"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/App/pages/ThanxPage/ThanxPage').default);
          });
        }}
      />
      <Route
        path="/evaluate(/:token)"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/Evaluate/pages/UserEvaluatePage/UserEvaluatePage').default);
          });
        }}
      />
      <Route component={DefaultLayout}>
        <Route
          path="/users/setup"
          getComponent={(nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./modules/User/pages/SetupAccountPage/SetupAccountPage').default);
            });
          }}
        />
        <Route
          path="/profile(/:cuid)"
          getComponent={(nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./modules/User/pages/UserProfilePage/UserProfilePage').default);
            });
          }}
        />
      </Route>
    </Route>
  </Route>
);
