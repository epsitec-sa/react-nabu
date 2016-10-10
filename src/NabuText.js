'use strict';

import {fromJS} from 'immutable';

import React, {Component, PropTypes} from 'react';
import {connect}                     from 'react-redux';
import {addMessage, setSelectedItem} from 'redux-nabu';
import formatMessage                 from './format.js';


@connect (
  state => ({
    locale:   state.nabu.get ('selectedLocale'),
    messages: state.nabu.get ('messages'),
    marker:   state.nabu.get ('marker'),
    focus:    state.nabu.get ('focus'),
    selectionModeEnabled: state.nabu.getIn (['selectionMode', 'enabled']),
    selectedItem: state.nabu.getIn (['selectionMode', 'selectedItemId'])
  }), null, null, {pure: true}
)

class NabuText extends Component {
  static propTypes = {
    msgid: PropTypes.string.isRequired,
    desc:  PropTypes.string
  };

  mustTranslate (messages, msgid) {
    const mustTranslate = !messages.has (msgid);

    if (mustTranslate) {
      return true;
    }

    return !messages.getIn ([msgid, 'translations', locale]);
  }

  mustAdd (props) {
    const {messages, msgid, desc, dispatch} = props;
    const mustAdd = !messages.has (msgid);
    if (mustAdd) {
      dispatch (setMessage (msgid, null, desc, null));
    }
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
      messages,
      msgid,
      locale,
      desc,
      html,
      values,
      selectedItem,
      selectionModeEnabled,
      dispatch
    } = this.props;




    function onMouseEnter() {
      if (selectionModeEnabled) {
        dispatch (setSelectedItem (msgid, true));
      }
    }


    const message = messages.getIn ([msgid, 'translations', locale], msgid).toJS ();

    const text = formatMessage (locale, html, message, values);

    const markerOn = this.mustTranslate (messages, msgid) && marker;
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

    let style = { };
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
