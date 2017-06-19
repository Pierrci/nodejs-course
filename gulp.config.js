module.exports = function () {
  const src = 'public/';
  const app = src + 'app/';

  const config = {
    src: src,
    index: src + 'index.html',
    css: src + 'css/**/*.css',

    js: [
      app + '**/*.module.js',
      app + '**/*.js',
      '!' + '**/*.spec.js'
    ],

    scss: src + 'scss/**/*.scss',

    /**
     * Bower options
     */
    bower: {
      overrides: {
        // Exemple :
        // 'highcharts': {
        //   'main': ['lib/adapters/standalone-framework.js', 'lib/highstock.js']
        // }
      }
    }
  };

  config.getBowerFilesDefaultOptions = function () {
    const options = {
      overrides: config.bower.overrides
    };

    return options;
  };

  return config;
};
