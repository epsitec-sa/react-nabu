'use strict';

import React, {Component, PropTypes}  from 'react';
import {connect}                      from 'react-redux';

import Table             from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow          from 'material-ui/lib/table/table-row';
import TableHeader       from 'material-ui/lib/table/table-header';
import TableBody         from 'material-ui/lib/table/table-body';

import NabuRow from './NabuRow.js';

@connect (
  state => ({
    tableSize: state.nabu.getIn (['translator', 'tableSize'])
  }), null, null, {pure: true}
)
export default class NabuTable extends Component {
  render () {
    const {dispatch, tableSize} = this.props;

    let messages = new Array (tableSize).fill (undefined);
    let initialized = false;

    const mapRowState = (state, index) => {
      if (!initialized) {
        messages = state.nabu.get (state.nabu.get ('locale')).toArray ();
        initialized = true;
      }

      return {
        locale: state.nabu.get ('locale'),
        msg:    state.nabu.getIn ([state.nabu.get ('locale'), messages[index].get ('id')])
      };
    };

    return (
      <Table
        selectable={false}
        fixedHeader={true}
        style={{
          backgroundColor: '#fff'
        }}
      >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          style={{
            backgroundColor: '#eee'
          }}
        >
          <TableRow>
            <TableHeaderColumn
              columnNumber={0}
              style={{
                fontSize: '15px',
                textAlign: 'left',
                color: '#666'
              }}
            >ID</TableHeaderColumn>
            <TableHeaderColumn
              columnNumber={1}
              style={{
                fontSize: '15px',
                textAlign: 'left',
                color: '#666'
              }}
            >Translation</TableHeaderColumn>
            <TableHeaderColumn
              columnNumber={2}
              style={{
                fontSize: '15px',
                width: '10%',
                padding: 0,
                textAlign: 'center',
                color: '#666'
            }}
            >Translated</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody selectable={false} stripedRows={true} displayRowCheckbox={false}>
          {messages.map ((msg, index) => {
            const Row = connect ((state) => mapRowState (state, index), null, null, {pure: true}) (NabuRow);
            return (<Row key={index} />);
          })}
        </TableBody>
      </Table>
    );
  }
}
