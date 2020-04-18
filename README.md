# MaterialSelect
This Component is created for Select Box with autocomplete in React native for android and IOS.
* You can Add Icon to your SelectBox. 
* This component has autocomplete with search Box.
## Requirement
 * You need to have already installed and configured react-native-vector-icon.
 
## Installation

If using yarn:

```
yarn add materialselect
```

If using npm:

```
npm i materialselect
```

## Usage

```
import {MaterialSelect} from 'materialselect'
```

Simply place a `<MaterialSelect />` tag for SelectBox .

```
DemoCode

import React from 'react';
import {
  Text,
  View
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { MaterialSelect } from 'materialselect'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0
    }
  }
  onPersonSelect = (data) => {
    this.setState({ id: data.id })
  }
  render() {
    return (
      <View><Text style={{marginLeft:'10%',fontSize:18,fontWeight:'bold',marginTop:'10%'}}>MaterialSelect Demo</Text>
        <MaterialSelect
          ContainerStyle={styles.SelectBox}
          iconSize={30}
          iconName="product-hunt"
          iconType="font-awesome"
          selectedValue={this.state.id}
          selectDisplayText="Select"
          selectDisplayTextFontSize={16}
          iconColor={'#72bcd4'}
          noDataText="No data found"
          data={[
            { id: 1, name: 'John' },
            { id: 2, name: 'Jack' }
          ]}
          onSelect={data => {
            this.onPersonSelect(data);
          }}
        />
      </View>
    )
  }

}

const styles = {
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flex: 1,
  },
  SelectBox: {
    borderRadius: 5,
    borderWidth: 1,
    width: '90%',
    height: '40%',
    padding: 5,
    marginTop: '3%',
    marginLeft:'5%',
    marginBottom: '3%',
  }
}

```

## Documentation

### MaterialSelect Component
| Name                      | Description                              | Default     | Type    |
|---------------------------|------------------------------------------|-------------|---------|
| ContainerStyle            | Style of Select Box                      | required    | object  |
| iconSize                  | Size of icon                             | 24          | number  |
| iconName                  | Name of icon                             | react       | String  |
| iconType                  | Type of icon                             | material-community     | String  |
| selectedValue             | To show selected value in select box(required)         | no default    | String  |                                   
| selectDisplayText         | Placeholder for selectbox                | select      | String  |
| selectDisplayTextFontSize | Font size of selected text               | 16          | number  |
| iconColor                 | Color of Icon                            | #a7a9ab     | String  |
| data                      | Data for select box (Required)           | no          | array   |
| onSelect                  | call method after select (required)      | no          | function|


## Contributing
Pull requests are always welcome! Feel free to open a new GitHub issue for any changes that can be made.

**Working on your first Pull Request?** You can learn how from this *free* series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

## Author Vikas Bind
