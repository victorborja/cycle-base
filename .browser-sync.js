'use strict';
/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
module.exports = {
  /*
  proxy: {
    target: 'http://localhost:5000',
    middleware: function middleware(req, res, next) {
      console.log(req.method + ' ' + req.originalUrl);
      next();
    }
  },
  */
  server: {
    baseDir: ['tmp/bundle'],
    index: 'index.html',
    routes: {
      'img': 'assets/img'
    },
    middleware: function middleware(req, res, next) {
      console.log(req.method + ' ' + req.originalUrl);
      next();
    }
  },
  codeSync: true,
  files: [
    'tmp/bundle/*'
  ],
  snippetOptions: {
    rule: {
      match: /<\/body>/i,
      fn: function fn(snippet, match) { return snippet + match; }
    }
  },
  logLevel: 'silent',
  logConnections: true,
  logFileChanges: true,
  logSnippet: true
};
