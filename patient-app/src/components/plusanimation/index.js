import React from 'react';
import LottieView from 'lottie-react-native';
import { Assets } from '../../themes'

export default class PlusAnimation extends React.Component {
  componentDidUpdate() {
    if (this.props.play) {
      this.animation.play();
    } else {
      this.animation.reset();
    }
  }

  render() {
    return (
      <LottieView
        ref={animation => {
          this.animation = animation;
        }}
        autoPlay={false}
        source={Assets['healthtap']}
      />
    );
  }
}
