'use strict';

import React, {Component, PropTypes}         from 'react';
import {connect}                             from 'react-redux';
import {changeSelectedLocale, toggleMarker}  from 'redux-nabu';

import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle
}                   from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem     from 'material-ui/MenuItem';
import Toggle       from 'material-ui/Toggle';

// THEME
import theme            from './nabu-theme.js';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NabuTable from './NabuTable.js';

@connect (
  state => ({
    translator: state.nabu.get ('translator'),
    marker:     state.nabu.get ('marker'),
    locale:     state.nabu.get ('selectedLocale'),
    locales:    state.nabu.get ('locales')
  }), null, null, {pure: true}
)
class NabuTranslator extends Component {
  render () {
    const {dispatch, locale, translator, marker, locales, store} = this.props;
    const setLocale = (e, index, value) => dispatch (changeSelectedLocale (value));
    const toggleMarks = () => dispatch (toggleMarker ());
    return (
      <MuiThemeProvider muiTheme={getMuiTheme (theme)}>
        <div style={{
          overflow: 'hidden',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Toolbar style={{
              backgroundColor: '#eee',
              display: '-webkit-box'
            }}
          >
            <ToolbarGroup style={{marginRight: '50px'}}>
              <Toggle
                label="Marker"
                onToggle={toggleMarks}
                toggled={marker}
                style={{marginTop: '15px'}}
              />
            </ToolbarGroup>
            <ToolbarGroup>
              <DropDownMenu value={locale} onChange={setLocale} >
                {locales.map ((locale, index) => <MenuItem key={index} value={locale} primaryText={`Locale: ${locale}`} />)}
              </DropDownMenu>
            </ToolbarGroup>
          </Toolbar>
          <NabuTable />
        </div>
      </MuiThemeProvider>
    );
  }
}

module.exports = NabuTranslator;
