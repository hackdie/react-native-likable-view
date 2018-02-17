import React, { PureComponent } from 'react'
import { View, Text, Image, Animated, StyleSheet } from 'react-native'

import PropTypes from "prop-types";
import DoubleClick from './doubleClicker';
const imgBackground = require('./hearts.png')

const styles = StyleSheet.create({
  heartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  imgHeart: {
    height: 80,
    width: 80
  }
})

export default class DoubleTapLikeableView extends PureComponent {

  constructor(props) {
    super(props)
    this.animate1 = new Animated.Value(0)
    this.animate2 = new Animated.Value(1)
  }

  animate = () => {
    Animated.sequence([
      Animated.spring(this.animate2, {
        toValue: 2,
        speed: 200,

      }),
      Animated.spring(this.animate2, {
        toValue: 1,
      }),
    ]).start()

    Animated.sequence([
      Animated.timing(
        this.animate1,
        {
          toValue: 1,
          duration: 400,
        }
      ),
      Animated.timing(
        this.animate1,
        {
          toValue: 0,
          duration: 400,
        }
      ),
    ]).start();

    this.props.doubleTap(this.props.id)
  }


  render() {

    return (
      <DoubleClick style={this.props.style} onClick={this.animate} singleTap={this.props.singleTap}>
        {this.props.children}
        <View style={styles.heartContainer}>
          <Animated.Image
            source={this.props.image || imgBackground}
            style={[styles.imgHeart, {
              transform: [
                { scale: this.animate2 }
              ],
              opacity: this.animate1,
              tintColor: this.props.color
            }]} />
        </View>
      </DoubleClick>
    )
  }
}


DoubleTapLikeableView.propTypes = {
  color: PropTypes.string,
  singleTap: PropTypes.func,
  doubleTap: PropTypes.func,
  style: PropTypes.object,
}

DoubleTapLikeableView.defaultProps = {
  color: 'white',
  singleTap: () => { },
  doubleTap: () => { },
  style: {},
}