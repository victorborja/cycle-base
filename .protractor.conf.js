require('babel/register');

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost:9000',
  specs: ['test/e2e/**/*_spec.js'],
  multiCapabilities: [{
    browserName: 'chrome'
  }]
};