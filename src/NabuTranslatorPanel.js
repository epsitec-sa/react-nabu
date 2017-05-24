'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Drawer from 'material-ui/Drawer';

// THEME
import theme from './nabu-theme.js';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NabuTranslator from './NabuTranslator.js';

@connect (
  state => ({
    open: state.nabu.getIn (['translator', 'isOpen']),
  }),
  null,
  null,
  {pure: true}
)
class NabuTranslatorPanel extends Component {
  render () {
    const {open} = this.props;
    const panelStyle = open ? {width: '100%', height: '30%'} : {width: '0px'};
    return (
      <MuiThemeProvider muiTheme={getMuiTheme (theme)}>
        <Drawer open={open} style={panelStyle}>
          <NabuTranslator />
        </Drawer>
      </MuiThemeProvider>
    );
  }
}

module.exports = NabuTranslatorPanel;
