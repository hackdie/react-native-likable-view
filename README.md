# react-native-likable-view

![Screenshot](demo.gif)


## Getting started

`$ npm install react-native-likable-view --save`

## Usage
```javascript

import {
  View,
  Text
} from 'react-native';
import LikeableView from 'react-native-likable-view';


doubleTap = () => {
  console.log('doubleTap)
}

singleTap = () => {
  console.log('singleTap)
}

render = () => {
return (
	<LikeableView doubleTap={this.doubleTap} id={item.id} color={'red'} singleTap={this.singleTap} >
    <Image source={{ uri: item.url }} style={{ height: 400, width: 300 }} /> 
  </LikeableView>
  )
} 

```
