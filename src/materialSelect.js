import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Dialog, {
  SlideAnimation,
  DialogContent,
  DialogFooter,
  DialogButton,
  DialogTitle,
} from 'react-native-popup-dialog';
import {Searchbar} from 'react-native-paper';
export class CustomizeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      searchQuery: '',
      selected: props.selectedValue
        ? props.data.length
          ? props.data.find(x => x.id == props.selectedValue).name
          : ''
        : '',
      data: props.data,
      searchData: props.data,
    };
  }
  static getDerivedStateFromProps(changedProps, state) {
    if (JSON.stringify(changedProps.data) !== JSON.stringify(state.data)) {
      return {
        data: changedProps.data,
        selected:
          changedProps.selectedValue !== 0 &&
          changedProps.selectedValue !== undefined &&
          changedProps.data.length &&
          changedProps.data.findIndex(
            x => x.id == changedProps.selectedValue,
          ) !== -1
            ? changedProps.data.find(x => x.id == changedProps.selectedValue)
                .name
            : '',
      };
    }
    return null;
  }
  renderOptionList = () => {
    this.setState({
      visible: true,
      searchData: this.state.data,
      searchQuery: '',
    });
  };
  FlatListItemSeparator = () => (
    <View style={{height: heightPercentageToDP('1.5%')}} />
  );
  selectData = data => {
    if (this.state.selected !== data.name) this.props.onSelect(data);
    this.setState({visible: false, selected: data.name, searchQuery: ''});
  };
  renderItem = data => (
    <TouchableOpacity onPress={() => this.selectItem(data)}>
      <Text>
        {data.item.name.charAt(0).toUpperCase() + data.item.name.slice(1)}{' '}
      </Text>
    </TouchableOpacity>
  );

  _onChangeSearch = query => {
    this.setState({searchQuery: query});
    this.setState({
      searchData: this.state.data.filter(el => el.name.includes(query)),
    });
  };
  render() {
    let selectedTextColor = this.state.selected ? this.props.iconColor : 'grey';
    return (
      <SafeAreaView>
        <TouchableOpacity
          style={this.props.ContainerStyle}
          onPress={this.renderOptionList}>
          <Grid>
            <Col
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 42,
              }}>
              <Icon
                size={this.props.iconSize ? this.props.iconSize : 24}
                name={this.props.iconName ? this.props.iconName : 'react'}
                type={
                  this.props.iconType
                    ? this.props.iconType
                    : 'material-community'
                }
                color={this.state.selected ? this.props.iconColor : '#a7a9ab'}
              />
            </Col>
            <Col
              style={{
                borderLeftWidth: 0.8,
                borderLeftColor: '#e8eaed',
              }}>
              <Grid>
                <Col
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    width: 90,
                  }}>
                  {this.state.selected ? (
                    <Text
                      style={{
                        color: '#c6c8cc',
                        fontSize: 12,
                        fontWeight: 'bold',
                      }}>
                      {this.props.selectDisplayText}
                    </Text>
                  ) : null}

                  <Text
                    style={{
                      fontSize: this.props.selectDisplayTextFontSize,
                      color: selectedTextColor,
                      fontWeight: this.state.selected ? '100' : 'bold',
                    }}>
                    {this.state.selected
                      ? this.state.selected
                      : this.props.selectDisplayText
                      ? this.props.selectDisplayText
                      : 'Select'}
                  </Text>
                </Col>
                <Col
                  style={{
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    flex: 1,
                  }}>
                  <Icon
                    size={35}
                    name="chevron-down"
                    type="evilicon"
                    color="#a7a9ab"
                  />
                </Col>
              </Grid>
            </Col>
          </Grid>
        </TouchableOpacity>
        <Dialog
          visible={this.state.visible}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          footer={
            <DialogFooter
              style={{
                backgroundColor: '#F7F7F8',
                position: 'absolute',
                bottom: 0,
              }}>
              <DialogButton
                text="CANCEL"
                onPress={() => {
                  this.setState({visible: false});
                }}
                key="button-1"
              />
            </DialogFooter>
          }
          dialogTitle={
            <DialogTitle
              title={
                this.props.selectDisplayText
                  ? this.props.selectDisplayText
                  : 'Select'
              }
              style={{
                backgroundColor: '#F7F7F8',
              }}
              hasTitleBar={true}
              align="center"
            />
          }
          dialogStyle={{
            width: widthPercentageToDP('90%'),
            height: heightPercentageToDP('70%'),
          }}>
          <DialogContent>
            <Searchbar
              style={{width: '100%'}}
              placeholder="Search"
              onChangeText={this._onChangeSearch}
              value={this.state.searchQuery}
            />
            {/* <SafeAreaView> */}
            <FlatList
              style={{marginTop: heightPercentageToDP('2%')}}
              data={this.state.searchData}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              extraData={this.props}
              renderItem={({item}) => (
                <TouchableOpacity
                  underlayColor={'black'}
                  onPress={() => this.selectData(item)}>
                  <Text
                    style={{
                      marginLeft: widthPercentageToDP('5%'),
                      fontSize: 18,
                    }}>
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}{' '}
                  </Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <Icon
                    size={40}
                    name="hourglass-empty"
                    type="material"
                    color={
                      this.state.selected ? this.props.iconColor : '#a7a9ab'
                    }
                  />
                  <Text style={{fontSize: 16}}>
                    {this.props.noDataText
                      ? this.props.noDataText
                      : 'No Data Found'}
                  </Text>
                </View>
              }
            />
            {/* </SafeAreaView> */}
          </DialogContent>
        </Dialog>
      </SafeAreaView>
    );
  }
}
export default CustomizeSelect;
