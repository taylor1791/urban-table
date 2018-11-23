import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Picker,
  Slider,
  Button,
} from 'react-native';
import { connect } from 'react-redux';

import { setOperation, setTableSize } from '../reducer';

export class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Urban Table</Text>

        <View>
          <Text style={styles.label}>Operation:</Text>

          <Picker
            selectedValue={this.props.operation}
            onValueChange={this.changeOperation}
          >
            <Picker.Item label="Addition" value="add" />
            <Picker.Item label="Multiplication" value="mul" />
          </Picker>
        </View>

        <View>
          <Text style={styles.label}>Table Size: {this.props.tableSize}</Text>

          <View style={styles.sliderRow}>
            <Button title=" - " onPress={this.decrement} />

            <Slider
              minimumValue={1}
              maximumValue={25}
              step={1}
              value={this.tableSize}
              onValueChange={this.changeTableSize}
              style={{ flex: 1 }}
            />

            <Button title="+" onPress={this.increment} />
          </View>
        </View>

        <View style={styles.center}>
          <Button title="Begin" style={styles.center} onPress={this.begin} />
        </View>
      </View>
    );
  }

  changeOperation = value => {
    this.props.setOperation(value);
  };

  changeTableSize = value => {
    this.props.setTableSize(value);
  };

  decrement = () => {
    this.props.setTableSize(Math.max(this.props.tableSize - 1, 0));
  };

  increment = () => {
    this.props.setTableSize(Math.min(this.props.tableSize + 1, 99));
  };

  begin = () => {
    this.props.navigation.navigate('Quiz');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
  },
  label: {
    fontSize: 24,
  },
  sliderRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  center: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

function mapStateToProps({ operation, tableSize }) {
  return { operation, tableSize };
}

export default connect(
  mapStateToProps,
  {
    setOperation,
    setTableSize,
  },
)(HomeScreen);
