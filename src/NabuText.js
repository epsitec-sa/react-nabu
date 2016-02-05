'use strict';

import {fromJS} from 'immutable';

import React, {Component, PropTypes} from 'react';
import {injectIntl}                  from 'react-intl';
import {connect}                     from 'react-redux';
import {addMessage}                  from 'redux-nabu';

import Badge from 'material-ui/lib/badge';

@connect (
  state => ({
    messages: state.nabu.get (state.nabu.get ('locale')),
    marker:   state.nabu.get ('marker')
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
      console.log ('NABU_ADD_MESSAGE:', msgid);
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
      backgroundColor: 'rgba(10,200,100, .5)'
    }

    return (
      <span style={markerOn ? highliteStyle : null} dangerouslySetInnerHTML={{__html:text}} >
        {children}
      </span>
    )
  }
}

module.exports = injectIntl (NabuText);
