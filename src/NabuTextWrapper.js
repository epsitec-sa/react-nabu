'use strict';

import {fromJS} from 'immutable';

import React, {Component, PropTypes} from 'react';
import {connect}                     from 'react-redux';
import NabuText                      from './NabuText.js';


@connect (
  state => ({
  }), null, null, {pure: true}
)
class NabuTextWrapper extends Component {
  static propTypes = {
    msgid: PropTypes.string.isRequired,
    desc:  PropTypes.string
  };

  render () {
    const {msgid, ...other} = this.props;

    const getTextState = (state, msgid) => {
      return {
        message:  state.nabu.getIn (['messages', msgid])
      };
    };

    const Text = connect ((state) => getTextState (state, msgid), null, null, {pure: true}) (NabuText);
    return (
      <Text msgid={msgid} {...other} />
    );

  }
}

module.exports = NabuTextWrapper;
