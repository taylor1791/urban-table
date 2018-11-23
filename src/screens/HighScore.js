import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';

class HighScore extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.props.state)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps)(HighScore);
