'use strict';

import React, {Component, PropTypes} from 'react';
import {connect}                     from 'react-redux';

import Drawer from 'material-ui/Drawer';

// THEME
import theme          from './nabu-theme.js';
import ThemeManager   from 'material-ui/styles/themeManager';
import ThemeDecorator from 'material-ui/styles/themeDecorator';

import NabuTranslator from './NabuTranslator.js';

@ThemeDecorator (ThemeManager.getMuiTheme (theme))
@connect (
  state => ({
    open: state.nabu.getIn (['translator', 'isOpen'])
  }), null, null, {pure: true}
)
class NabuTranslatorPanel extends Component {
  render () {
    const {open} = this.props;
    const panelStyle = open ? {width: '100%', height: '30%'} : {width: '0px'};
    return (
      <Drawer open={open} style={panelStyle}>
        <NabuTranslator />
      </Drawer>
    );
  }
}

module.exports = NabuTranslatorPanel;
