requirejs.config({
  baseUrl: '/',
  paths: {
    // Libs
    jquery: 'jquery/dist/jquery.min',

    app: 'js/src'
  },
  shim: {
    jquery: {
      exports: '$'
    }
  }
})(['app/App']);
