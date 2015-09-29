/**
 * <TextareaAutosize />
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _calculateNodeHeight = require('./calculateNodeHeight');

var _calculateNodeHeight2 = _interopRequireDefault(_calculateNodeHeight);

var TextareaAutosize = (function (_React$Component) {
  _inherits(TextareaAutosize, _React$Component);

  _createClass(TextareaAutosize, null, [{
    key: 'propTypes',
    value: {
      /**
       * Current textarea value.
       */
      value: _react2['default'].PropTypes.string,

      /**
       * Callback on value change.
       */
      onChange: _react2['default'].PropTypes.func,

      /**
       * Try to cache DOM measurements performed by component so that we don't
       * touch DOM when it's not needed.
       *
       * This optimization doesn't work if we dynamically style <textarea />
       * component.
       */
      useCacheForDOMMeasurements: _react2['default'].PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      onChange: function onChange() {
        return null;
      },
      useCacheForDOMMeasurements: false
    },
    enumerable: true
  }]);

  function TextareaAutosize(props) {
    _classCallCheck(this, TextareaAutosize);

    _get(Object.getPrototypeOf(TextareaAutosize.prototype), 'constructor', this).call(this, props);
    this.state = { height: null };
    this._onChange = this._onChange.bind(this);
    this._resizeComponent = this._resizeComponent.bind(this);
  }

  _createClass(TextareaAutosize, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var valueLink = _props.valueLink;
      var onChange = _props.onChange;

      var props = _objectWithoutProperties(_props, ['valueLink', 'onChange']);

      if (typeof valueLink === 'object') {
        props.value = valueLink.value;
      }
      props.style = _extends({}, props.style, {
        overflow: 'hidden',
        height: this.state.height
      });
      return _react2['default'].createElement('textarea', _extends({}, props, { onChange: this._onChange }));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._resizeComponent();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      // Re-render with the new content then recalculate the height as required.
      onNextFrame(this._resizeComponent);
    }
  }, {
    key: '_onChange',
    value: function _onChange(e) {
      this._resizeComponent();
      var _props2 = this.props;
      var valueLink = _props2.valueLink;
      var onChange = _props2.onChange;

      if (valueLink) {
        valueLink.requestChange(e.target.value);
      } else {
        onChange(e);
      }
    }
  }, {
    key: '_resizeComponent',
    value: function _resizeComponent() {
      var useCacheForDOMMeasurements = this.props.useCacheForDOMMeasurements;

      var height = (0, _calculateNodeHeight2['default'])(_reactDom2['default'].findDOMNode(this), useCacheForDOMMeasurements, this.props.rows);
      this.setState({ height: height });
    }

    /**
     * Read the current value of <textarea /> from DOM.
     */
  }, {
    key: 'focus',

    /**
     * Put focus on a <textarea /> DOM element.
     */
    value: function focus() {
      _reactDom2['default'].findDOMNode(this).focus();
    }
  }, {
    key: 'value',
    get: function get() {
      return _reactDom2['default'].findDOMNode(this).value;
    }
  }]);

  return TextareaAutosize;
})(_react2['default'].Component);

exports['default'] = TextareaAutosize;

var onNextFrame = undefined;
if (typeof GLOBAL == 'undefined') {
  onNextFrame = window.requestAnimationFrame;

  if (onNextFrame === undefined) {
    onNextFrame = function onNextFrame(cb) {
      window.setTimeout(cb, 1);
    };
  }
} else {
  onNextFrame = function () {
    return null;
  };
}
module.exports = exports['default'];
