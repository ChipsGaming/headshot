requirejs.config({
  baseUrl: '/',
  paths: {
    // Libs
    jquery: 'vendor/jquery',
    Headshot: 'vendor/headshot',

    app: 'js/src'
  },
  shim: {
    jquery: {
      exports: '$'
    }
  }
})(['app/App']);
