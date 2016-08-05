'use strict';

import React, {Component, PropTypes} from 'react';
import {connect}                     from 'react-redux';
import {changeLocale, toggleMarker}  from 'redux-nabu';

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
    locale:     state.nabu.get ('locale'),
    list:       state.nabu.get ('translations').keySeq ()
  }), null, null, {pure: true}
)
class NabuTranslator extends Component {
  render () {
    const {dispatch, locale, translator, marker, list, store} = this.props;
    const setLocale = (e, index, value) => dispatch (changeLocale (value));
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
              backgroundColor: '#eee'
            }}
          >
            <ToolbarGroup>
              <Toggle
                label="Marker"
                onToggle={toggleMarks}
                toggled={marker}
                style={{marginTop: '15px'}}
              />
            </ToolbarGroup>
            <ToolbarGroup>
              <ToolbarTitle text="Locale" />
              <DropDownMenu  value={locale} onChange={setLocale} >
                {list.map ((locale, index) => <MenuItem key={index} value={locale} primaryText={locale} />)}
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
