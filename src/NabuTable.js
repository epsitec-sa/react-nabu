'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {
  Table,
  TableHeaderColumn,
  TableRow,
  TableHeader,
  TableBody,
} from 'material-ui/Table';

import NabuRow from './NabuRow.js';

@connect (
  state => ({
    tableSize: state.nabu.getIn (['translator', 'tableSize']),
  }),
  null,
  null,
  {pure: true}
)
export default class NabuTable extends Component {
  render () {
    const {dispatch, tableSize} = this.props;

    let messages = new Array (tableSize).fill (undefined);
    let initialized = false;

    const mapRowState = (state, index) => {
      if (!initialized) {
        messages = state.nabu.getIn (['messages']).toArray ().sort((a, b) => {
            const m1 = a.get ('id').toLowerCase ();
            const m2 = b.get ('id').toLowerCase ();
            if (m1 < m2) return -1;
            if (m2 > m1) return 1;
            return 0;
          });
        initialized = true;
      }

      return {
        locale: state.nabu.get ('selectedLocale'),
        msg: state.nabu.getIn (['messages', messages[index].get ('id')]),
      };
    };

    return (
      <Table
        selectable={false}
        fixedHeader={true}
        style={{
          backgroundColor: '#fff',
        }}
        wrapperStyle={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          style={{
            backgroundColor: '#eee',
          }}
        >
          <TableRow>
            <TableHeaderColumn
              columnNumber={0}
              style={{
                fontSize: '15px',
                textAlign: 'left',
                color: '#666',
              }}
            >
              ID
            </TableHeaderColumn>
            <TableHeaderColumn
              columnNumber={1}
              style={{
                fontSize: '15px',
                textAlign: 'left',
                color: '#666',
              }}
            >
              Translation
            </TableHeaderColumn>
            <TableHeaderColumn
              columnNumber={2}
              style={{
                fontSize: '15px',
                width: '10%',
                padding: 0,
                textAlign: 'center',
                color: '#666',
              }}
            >
              Translated
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          selectable={false}
          stripedRows={true}
          displayRowCheckbox={false}
        >
          {messages.map ((msg, index) => {
            const Row = connect (
              state => mapRowState (state, index),
              null,
              null,
              {pure: true}
            ) (NabuRow);
            return <Row key={index} keyId={`${index}`} />;
          })}
        </TableBody>
      </Table>
    );
  }
}
