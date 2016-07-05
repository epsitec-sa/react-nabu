'use strict';

import React, {Component, PropTypes} from 'react';
import {connect}                     from 'react-redux';
import {changeLocale, toggleMarker}  from 'redux-nabu';

import Toolbar      from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem     from 'material-ui/lib/menus/menu-item';
import Toggle       from 'material-ui/lib/toggle';

// THEME
import theme          from './nabu-theme.js';
import ThemeManager   from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';

import NabuTable from './NabuTable.js';

@ThemeDecorator (ThemeManager.getMuiTheme (theme))
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
      <div>
        <Toolbar style={{
            backgroundColor: '#eee'
          }}
        >
          <ToolbarGroup float="left">
            <Toggle
              label="Marker"
              onToggle={toggleMarks}
              toggled={marker}
              style={{marginTop: '15px'}}
            />
          </ToolbarGroup>
          <ToolbarGroup float="right">
            <ToolbarTitle text="Locale" />
            <DropDownMenu  value={locale} onChange={setLocale} >
              {list.map ((locale) => <MenuItem value={locale} primaryText={locale} />)}
            </DropDownMenu>
          </ToolbarGroup>
        </Toolbar>
        <NabuTable />
      </div>
    );
  }
}

module.exports = NabuTranslator;
