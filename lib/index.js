'use strict';

var _reactIntl = require('react-intl');

// API
module.exports = {
  NabuTranslator: require('./NabuTranslator.js'),
  NabuTranslatorPanel: require('./NabuTranslatorPanel.js'),
  T: require('./NabuText.js'),
  NabuProvide: _reactIntl.IntlProvider
};