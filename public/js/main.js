requirejs.config({
  baseUrl: '/',
  paths: {
    // Libs
    jquery: 'jquery/dist/jquery.min',
    Phaser: 'phaser-ce/build/phaser.min',

    app: 'js/src'
  },
  shim: {
    jquery: {
      exports: '$'
    }
  }
})(['app/App']);
