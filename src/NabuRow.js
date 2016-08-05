'use strict';

import React, {Component, PropTypes} from 'react';
import {connect}                     from 'react-redux';
import {translate, setFocus}         from 'redux-nabu';

import {TableRow, TableRowColumn} from 'material-ui/Table';
import TextField                  from 'material-ui/TextField';
import CheckCircle                from 'material-ui/svg-icons/action/check-circle';


export default class NabuRow extends Component {
  constructor () {
    super ();
    this._prevLocale = null;
  }

  render () {
    const {dispatch, locale, msg} = this.props;
    const msgId = msg.get ('id');
    const translateValue = (id, value) => {
      this.setState ({value: value}); // Prevent a carret jump with first editing
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
            ref='defaultMessage'
            value={(() => {
              // Change explicitly the field value only when a new locale is
              // selected.
              if (this._prevLocale !== locale) {
                this._prevLocale = locale;
                return msg.get ('defaultMessage');
              }
              return null;
            }) ()}
            defaultValue={msg.get ('defaultMessage')}
            multiLine={true}
            rows={1}
            rowsMax={4}
            style={{
              width: '100%',
              fontSize: '15px'
            }}
            onChange={(e) => translateValue (msgId, e.target.value)}
            onFocus={() => dispatch (setFocus (msgId, true))}
            onBlur={() => dispatch (setFocus (msgId, false))}
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
