import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import colors from 'colors';
/* eslint-disable no-console*/
process.env.NODE_ENV = 'production';

webpack(webpackConfig).run( (err,stats) => {
  if (err) {
    console.log(err.bold.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map (err => console.log(err.red));
  }

  if (jsonStats.hasWarnings) {
    return jsonStats.warnings.map (err => console.log(err.yellow));
  }

  console.log(`Webpack stats: ${stats}`);

  console.log('APP COMPILED SUCCESSFULLY');
  return 0;
});
