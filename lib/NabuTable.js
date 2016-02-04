'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _table = require('material-ui/lib/table/table');

var _table2 = _interopRequireDefault(_table);

var _tableHeaderColumn = require('material-ui/lib/table/table-header-column');

var _tableHeaderColumn2 = _interopRequireDefault(_tableHeaderColumn);

var _tableRow = require('material-ui/lib/table/table-row');

var _tableRow2 = _interopRequireDefault(_tableRow);

var _tableHeader = require('material-ui/lib/table/table-header');

var _tableHeader2 = _interopRequireDefault(_tableHeader);

var _tableBody = require('material-ui/lib/table/table-body');

var _tableBody2 = _interopRequireDefault(_tableBody);

var _NabuRow = require('./NabuRow.js');

var _NabuRow2 = _interopRequireDefault(_NabuRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NabuTable = (_dec = (0, _reactRedux.connect)(function (state) {
  return {
    tableSize: state.nabu.getIn(['translator', 'tableSize'])
  };
}, null, null, { pure: true }), _dec(_class = function (_Component) {
  _inherits(NabuTable, _Component);

  function NabuTable() {
    _classCallCheck(this, NabuTable);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NabuTable).apply(this, arguments));
  }

  _createClass(NabuTable, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var dispatch = _props.dispatch;
      var tableSize = _props.tableSize;

      var messages = new Array(tableSize).fill(undefined);
      var initialized = false;

      var mapRowState = function mapRowState(state, index) {
        if (!initialized) {
          messages = state.nabu.get(state.nabu.get('locale')).toArray();
          initialized = true;
        }

        return {
          locale: state.nabu.get('locale'),
          msg: state.nabu.getIn([state.nabu.get('locale'), messages[index].get('id')])
        };
      };

      return _react2.default.createElement(
        _table2.default,
        { selectable: false },
        _react2.default.createElement(
          _tableHeader2.default,
          { displaySelectAll: false },
          _react2.default.createElement(
            _tableRow2.default,
            null,
            _react2.default.createElement(
              _tableHeaderColumn2.default,
              { columnNumber: 1 },
              'ID'
            ),
            _react2.default.createElement(
              _tableHeaderColumn2.default,
              { columnNumber: 2 },
              'Translation'
            ),
            _react2.default.createElement(
              _tableHeaderColumn2.default,
              { columnNumber: 3 },
              'Translated'
            )
          )
        ),
        _react2.default.createElement(
          _tableBody2.default,
          { selectable: false, stripedRows: true },
          messages.map(function (msg, index) {
            var Row = (0, _reactRedux.connect)(function (state) {
              return mapRowState(state, index);
            }, null, null, { pure: true })(_NabuRow2.default);
            return _react2.default.createElement(Row, { key: index });
          })
        )
      );
    }
  }]);

  return NabuTable;
}(_react.Component)) || _class);
exports.default = NabuTable;