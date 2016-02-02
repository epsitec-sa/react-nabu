'use strict';
import { IntlProvider } from 'react-intl';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin ();

// API
module.exports = {
  NabuTranslator: require ('./NabuTranslator.js'),
  NabuTranslatorPanel: require ('./NabuTranslatorPanel.js'),
  T: require ('./NabuText.js'),
  NabuProvide: IntlProvider
};
