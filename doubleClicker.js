import React, { PureComponent } from 'react';
import {
  View,
  PanResponder,
} from 'react-native';
import PropTypes from 'prop-types';


class DoubleClicker extends PureComponent {
  constructor() {
    super();

    this.myPanResponder = {};

    this.prevTouchInfo = {
      prevTouchX: 0,
      prevTouchY: 0,
      prevTouchTimeStamp: 0,
    };

    this.handlePanResponderGrant = this.handlePanResponderGrant.bind(this);
  }

  componentWillMount() {
    this.singleTap = 0
    this.myPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: this.handlePanResponderGrant,
    });
  }

  distance(x0, y0, x1, y1) {
    return Math.sqrt(Math.pow((x1 - x0), 2) + Math.pow((y1 - y0), 2));
  }

  isDoubleTap(currentTouchTimeStamp, { x0, y0 }) {
    const { prevTouchX, prevTouchY, prevTouchTimeStamp } = this.prevTouchInfo;
    const dt = currentTouchTimeStamp - prevTouchTimeStamp;
    const { delay, radius } = this.props;

    return (dt < delay && this.distance(prevTouchX, prevTouchY, x0, y0) < radius);
  }

  handlePanResponderGrant(evt, gestureState) {
    const currentTouchTimeStamp = Date.now();

    if (this.isDoubleTap(currentTouchTimeStamp, gestureState)) {
      clearImmediate(this.singleTap)
      this.props.onClick();
    } else {
      this.singleTap = setTimeout(() => {
        this.props.singleTap()
      }, this.props.delay)
    }

    this.prevTouchInfo = {
      prevTouchX: gestureState.x0,
      prevTouchY: gestureState.y0,
      prevTouchTimeStamp: currentTouchTimeStamp,
    };
  }

  render() {
    return (
      <View style={this.props.style} { ...this.myPanResponder.panHandlers}>
        {this.props.children}
      </View>
    );
  }
}

DoubleClicker.defaultProps = {
  delay: 300,
  radius: 20,
  onClick: () => { },
  singleTap: () => { }
};

DoubleClicker.propTypes = {
  delay: PropTypes.number,
  radius: PropTypes.number,
  onClick: PropTypes.func,
};

export default DoubleClicker;
