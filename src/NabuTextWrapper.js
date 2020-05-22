'use strict';

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import NabuText from './NabuText.js';

const NabuTextWrapper = connect(
  state => ({}),
  null,
  null,
  {pure: true}
)(
  class NabuTextWrapper extends PureComponent {
    render() {
      const {msgid, ...other} = this.props;

      const getTextState = (state, msgid) => {
        return {
          message: state.nabu.getIn(['messages', msgid]),
        };
      };

      const Text = connect(
        state => getTextState(state, msgid),
        null,
        null,
        {
          pure: true,
        }
      )(NabuText);
      return <Text msgid={msgid} {...other} />;
    }
  }
);

module.exports = NabuTextWrapper;
