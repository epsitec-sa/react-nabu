'use strict';

import React, {Component, PropTypes} from 'react';
import {connect}                     from 'react-redux';
import {translate}                   from 'redux-nabu';

import TableRow       from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TextField      from 'material-ui/lib/text-field';
import Checkbox       from 'material-ui/lib/checkbox';
import CheckCircle    from 'material-ui/lib/svg-icons/action/check-circle';

export default class NabuRow extends Component {
  render () {
    const {dispatch, locale, msg} = this.props;
    const msgId = msg.get ('id');
    const translateValue = (id, value) => {
      dispatch (translate (locale, id, value));
    };

    return (
      <TableRow displayBorder={false}>
        <TableRowColumn
          columnNumber={0}
          style={{
            fontSize: '15px'
          }}
        >
          <span>{msgId}</span><br />
          <span style={{color: '#999'}}>{msg.get ('description')}</span>
        </TableRowColumn>
        <TableRowColumn
          columnNumber={1}
          style={{
            minWidth: '200px'
          }}
        >
          <TextField
            value={msg.get ('defaultMessage')}
            multiLine={true}
            rows={1}
            rowsMax={4}
            style={{
              width: '100%',
              fontSize: '15px'
            }}
            onChange={(e) => translateValue (msgId, e.target.value)}
          />
        </TableRowColumn>
        <TableRowColumn
          columnNumber={2}
          style={{
            width: '10%',
            textAlign: 'center'
          }}
        >
        {msg.get ('translated') ? (<CheckCircle />) : null}
        </TableRowColumn>
      </TableRow>
    );
  }
}
