'use strict';

import {IntlProvider} from 'react-intl';

// API
module.exports = {
  NabuTranslator:      require ('./NabuTranslator.js'),
  NabuTranslatorPanel: require ('./NabuTranslatorPanel.js'),
  T:                   require ('./NabuText.js'),
  NabuProvider:        IntlProvider
};
