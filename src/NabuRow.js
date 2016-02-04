'use strict';

import React, {Component, PropTypes} from 'react';
import {connect}                     from 'react-redux';
import {translate}                   from 'redux-nabu';

import TableRow       from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TextField      from 'material-ui/lib/text-field';
import Checkbox       from 'material-ui/lib/checkbox';

export default class NabuRow extends Component {
  render () {
    const {dispatch, locale, msg} = this.props;
    const msgId = msg.get ('id');
    const translateValue = (id, value) => {
      dispatch (translate (locale, id, value));
    };

    return (
      <TableRow>
        <TableRowColumn columnNumber={1}>
          <span>{msgId}</span><span style={{margin: '15px'}}>({msg.get ('description', '-')})</span>
        </TableRowColumn>
        <TableRowColumn columnNumber={2} style={{minWidth: '200px'}}>
          <TextField
            value={msg.get ('defaultMessage')}
            multiLine={true}
            rows={1}
            rowsMax={4}
            onChange={(e) => translateValue (msgId, e.target.value)}
          />
        </TableRowColumn>
        <TableRowColumn>
          <Checkbox
            defaultChecked={msg.get ('translated')}
            disabled={true}
          />
        </TableRowColumn>
      </TableRow>
    );
  }
}
