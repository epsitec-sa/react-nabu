'use strict';

var _reactIntl = require('react-intl');

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
(0, _reactTapEventPlugin2.default)();

// API
module.exports = {
  NabuTranslator: require('./NabuTranslator.js'),
  NabuTranslatorPanel: require('./NabuTranslatorPanel.js'),
  T: require('./NabuText.js'),
  NabuProvide: _reactIntl.IntlProvider
};