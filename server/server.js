import Express, { Router } from 'express';
import passportLocal  from 'passport-local';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import IntlWrapper from '../client/modules/Intl/IntlWrapper';
import reactCookie from 'react-cookie';

import mongoSession from 'connect-mongodb-session';

var MongoDBStore = mongoSession(session);

var store = new MongoDBStore(
  {
    uri: serverConfig.mongoURL,
    collection: 'appSessions'
  }, function (error) {
    if (error) {
      console.error('MongoDBStore: Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
      throw error;
    }
  });

store.on('error', function (error) {
  if (error) {
    console.error('MongoDBStore error !'); // eslint-disable-line no-console
    throw error;
  }
});

//Auth
import User, { getGoogleCredentials } from './models/user';
import passport from 'passport';
import bearer from 'passport-http-bearer';
var BearerStrategy = bearer.Strategy;
var LocalStrategy = passportLocal.Strategy;

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// React And Redux Setup
import { configureStore } from '../client/store';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';

// Import required modules
import routes from '../client/routes';
import { fetchComponentData } from './util/fetchData';
import serverConfig from './config';
import google from 'googleapis';

// Import routes
import posts from './routes/post.routes';
import auth from './routes/auth.routes';
import users from './routes/user.routes';
import evaluate from './routes/evaluate.routes';

//Import Admin Routes
import adminUsers from './routes/admin/user.routes';

const useRoutes = (routes) => {
  let protectedMiddleware = passport.authenticate('bearer', { session: false })
  app.use('/api', routes(new Router(), protectedMiddleware))
};

const useAdminRoutes = (routes) => {
  app.use('/admin/api', routes(new Router()));
};

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }

  // feed some dummy data in DB.
  //dummyData();
});

//TODO: Make JWT auth strategy
passport.use(new BearerStrategy(
  (token, done) => {
    User.findOne({ authenticationToken: token }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      return done(null, user, { scope: 'all' });
    });
  }
));

passport.use(new LocalStrategy(
  function (username, password, done) {
    let isValid = serverConfig.admin.username === username && serverConfig.admin.password === password;
    return done(null, isValid);
  }
));

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(cookieParser(serverConfig.sessionSecret));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../dist')));
app.use(session({
  secret: serverConfig.sessionSecret,
  resave: true,
  saveUninitialized: false,
  store: store
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (result, cb) {
  cb(null, result);
});

passport.deserializeUser(function (result, cb) {
  cb(null, result);
});

useRoutes(posts);
useRoutes(auth);
useRoutes(users);
useRoutes(evaluate);
useAdminRoutes(adminUsers);

const isBuilt = ()=> {
  return ['production', 'staging'].indexOf(process.env.NODE_ENV) > -1;
};

// Render Initial HTML
const renderFullPage = (html, initialState) => {
  const head = Helmet.rewind();

  // Import Manifests
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  return `
    <!doctype html>
    <html>
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}

        ${isBuilt() ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}

        <script src='https://use.typekit.net/dor3mna.js'></script>
        <script>try{Typekit.load({ async: true });}catch(e){}</script>

        <script src="https://use.fontawesome.com/2e5e07ef2f.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js"></script>
      </head>
      <body>
        <div id="root" style="height:100%;">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${isBuilt() ?
    `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ''}
      </script>
      <script src='${isBuilt() ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
      <script src='${isBuilt() ? assetsManifest['/app.js'] : '/app.js'}'></script>
      <script type="text/javascript">
        function triggerGoogleLoaded() {
          window.gapi.load('auth2', function () {
            window.auth2 = gapi.auth2.init({
              client_id: '${serverConfig.GOOGLE_CLIENT_ID}',
              scope: '${serverConfig.GOOGLE_SCOPES.join(' ')}'
            });
          });
        }
      </script>
      <script src="https://apis.google.com/js/client:platform.js?onload=triggerGoogleLoaded" async defer></script>
      <script>
        window.fbAsyncInit = function() {
          FB.init({
            appId      : '${serverConfig.FB_APP_ID}',
            xfbml      : true,
            version    : 'v2.7'
          });
        };
      
        (function(d, s, id){
           var js, fjs = d.getElementsByTagName(s)[0];
           if (d.getElementById(id)) {return;}
           js = d.createElement(s); js.id = id;
           js.src = "//connect.facebook.net/en_US/sdk.js";
           fjs.parentNode.insertBefore(js, fjs);
         }(document, 'script', 'facebook-jssdk'));
      </script>
      </body>
    </html>
  `;
};

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = !isBuilt() ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    const store = configureStore();
    var unplug = reactCookie.plugToRequest(req, res);
    reactCookie.setRawCookie(req.headers.cookie);
    return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
            <IntlWrapper>
              <RouterContext {...renderProps} />
            </IntlWrapper>
          </Provider>
        );
        const finalState = store.getState();

        res
          .set('Content-Type', 'text/html')
          .status(200)
          .end(renderFullPage(initialView, finalState));
      })
      .catch((error) => next(error));
  });
});

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`Server is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});

export default app;
