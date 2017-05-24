'use strict';

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {translate, setFocus} from 'redux-nabu';

import {TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';

@connect (
  state => ({
    selectionModeEnabled: state.nabu.getIn (['selectionMode', 'enabled']),
    selectedItem: state.nabu.getIn (['selectionMode', 'selectedItemId']),
  }),
  null,
  null,
  {pure: true}
)
export default class NabuRow extends Component {
  constructor () {
    super ();
    this._prevLocale = null;
  }

  componentDidUpdate () {
    const {selectedItem, selectionModeEnabled, msg} = this.props;

    const msgId = msg.get ('id');
    if (selectionModeEnabled && selectedItem === msgId) {
      ReactDOM.findDOMNode (this).scrollIntoView (true);
    }
  }

  render () {
    const {
      dispatch,
      locale,
      selectedItem,
      selectionModeEnabled,
      msg,
      keyId,
    } = this.props;

    const msgId = msg.get ('id');

    const translateValue = (id, value) => {
      this.setState ({value: value}); // Prevent a carret jump with first editing
      if (id) {
        dispatch (translate (locale, id, value));
      }
    };

    const getMessage = props => {
      const {locale, msg} = props;
      return msg.getIn (['translations', locale, 'message']) || msg.get ('id');
    };

    return (
      <TableRow
        displayBorder={false}
        style={{
          backgroundColor: selectionModeEnabled && selectedItem === msgId
            ? '#ffc3c3'
            : 'transparent',
        }}
      >
        <TableRowColumn
          columnNumber={0}
          style={{
            fontSize: '15px',
          }}
        >
          <span>{msgId}</span><br />
          <span style={{color: '#999'}}>{msg.get ('description')}</span>
        </TableRowColumn>
        <TableRowColumn
          columnNumber={1}
          style={{
            minWidth: '200px',
          }}
        >
          <TextField
            id={keyId}
            ref="defaultMessage"
            value={(() => {
              // Change explicitly the field value only when a new locale is
              // selected.
              if (this._prevLocale !== locale) {
                this._prevLocale = locale;
                return getMessage (this.props);
              }
              return null;
            }) ()}
            defaultValue={getMessage (this.props)}
            multiLine={true}
            rows={1}
            rowsMax={4}
            style={{
              width: '100%',
              fontSize: '15px',
            }}
            onChange={e => translateValue (msgId, e.target.value)}
            onFocus={() => dispatch (setFocus (msgId, true))}
            onBlur={() => dispatch (setFocus (msgId, false))}
          />
        </TableRowColumn>
        <TableRowColumn
          columnNumber={2}
          style={{
            width: '10%',
            textAlign: 'center',
          }}
        >
          {msg.getIn (['translations', locale, 'message'])
            ? <CheckCircle />
            : <div />}
        </TableRowColumn>
      </TableRow>
    );
  }
}
