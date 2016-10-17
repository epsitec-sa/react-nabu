'use strict';

import {fromJS} from 'immutable';

import React, {Component, PropTypes}     from 'react';
import {connect}                         from 'react-redux';
import {setDescription, setSelectedItem} from 'redux-nabu';
import formatMessage                     from './format.js';


@connect (
  state => ({
    locale:               state.nabu.get ('selectedLocale'),
    marker:               state.nabu.get ('marker'),
    focus:                state.nabu.get ('focus'),
    selectionModeEnabled: state.nabu.getIn (['selectionMode', 'enabled']),
    selectedItem:         state.nabu.getIn (['selectionMode', 'selectedItemId'])
  }), null, null, {pure: true}
)
class NabuText extends Component {
  static propTypes = {
    msgid: PropTypes.string.isRequired,
    desc:  PropTypes.string
  };

  mustTranslate (message, locale) {
    const mustTranslate = !message;
    return mustTranslate ? true : !message.getIn (['translations', locale]);
  }

  mustAdd (props) {
    const {msgid, desc, dispatch} = props;
    dispatch (setDescription (msgid, desc));
  }

  componentWillUpdate  (nextProps) {
    this.mustAdd (nextProps);
  }

  componentDidMount () {
    this.mustAdd (this.props);
  }

  render () {
    const {
      marker,
      focus,
      children,
      message,
      msgid,
      locale,
      desc,
      html,
      values,
      selectedItem,
      selectionModeEnabled,
      dispatch
    } = this.props;

    const translatedMessage = message ?
      message.getIn (['translations', locale, 'message'], msgid) :
      msgid;

    function onMouseEnter() {
      if (selectionModeEnabled) {
        dispatch (setSelectedItem (msgid, true));
      }
    }

    const text = formatMessage (locale, html, translatedMessage, values);

    const markerOn = this.mustTranslate (message, locale) && marker;
    const highliteStyle = {
      outline: 'none',
      backgroundColor: 'rgba(10, 200, 100, .8)'
    };
    const focusStyle = {
      boxShadow: '0 0 10px 5px rgba(200, 0, 0, .8)'
    };
    function getSelectionModeStyle(selected) {
      let lineWidth = selected ? '2' : '1';
      let transparency = selected ? '1.0' : '0.4';

      return {
        border: lineWidth + 'px solid rgba(200, 0, 0, ' + transparency + ')'
      };
    }

    let style = {};
    if (markerOn) {
      style = Object.assign (style, highliteStyle);
    }
    if (focus && msgid === focus) {
      style = Object.assign (style, focusStyle);
    }

    if (selectionModeEnabled) {
      style = Object.assign (style, getSelectionModeStyle (selectedItem === msgid));
    }

    return (
      <span style={style} dangerouslySetInnerHTML={{__html: text}} onMouseEnter={onMouseEnter} >
        {children}
      </span>
    );
  }
}

module.exports = NabuText;
