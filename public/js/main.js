requirejs.config({
  baseUrl: '/',
  paths: {
    // Libs
    jquery: 'jquery/dist/jquery.min',
    Headshot: 'Client',

    app: 'js/src'
  },
  shim: {
    jquery: {
      exports: '$'
    }
  }
})(['app/App']);
