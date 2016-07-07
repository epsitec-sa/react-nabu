'use strict';

import {fromJS} from 'immutable';

import React, {Component, PropTypes} from 'react';
import {injectIntl}                  from 'react-intl';
import {connect}                     from 'react-redux';
import {addMessage}                  from 'redux-nabu';

import Badge from 'material-ui/lib/badge';

@connect (
  state => ({
    messages: state.nabu.getIn (['translations', state.nabu.get ('locale')]),
    marker:   state.nabu.get ('marker'),
    focus:    state.nabu.get ('focus')
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
      return mustTranslate;
    }
    return !messages.getIn ([msgid, 'translated']);
  }

  mustAdd (props) {
    const {messages, msgid, desc, dispatch} = props;
    const mustAdd = !messages.has (msgid);
    if (mustAdd) {
      dispatch (addMessage (msgid, desc));
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
      intl: {
        formatMessage,
        formatHTMLMessage
      },
      children,
      messages,
      msgid,
      desc,
      html,
      values
    } = this.props;

    const fallbackMessage = fromJS ({
      id:             msgid,
      defaultMessage: msgid,
      description:    desc
    });

    const message = messages.get (msgid, fallbackMessage).toJS ();

    const text = html ?
      formatHTMLMessage (message, values) :
      formatMessage (message, values);
    const markerOn = this.mustTranslate (messages, msgid) && marker;
    const highliteStyle = {
      outline: 'none',
      backgroundColor: 'rgba(10, 200, 100, .8)'
    };
    const focusStyle = {
      boxShadow: '0 0 10px 5px rgba(200, 0, 0, .8)'
    };

    let style = {};
    if (markerOn) {
      style = Object.assign (style, highliteStyle);
    }
    if (focus && msgid === focus) {
      style = Object.assign (style, focusStyle);
    }

    return (
      <span style={style} dangerouslySetInnerHTML={{__html: text}} >
        {children}
      </span>
    );
  }
}

module.exports = injectIntl (NabuText);
