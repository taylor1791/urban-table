import React from 'react';
import { StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { AppLoading, Font, Icon } from 'expo';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import reducer from './src/reducer';
import Navigator from './src/navigation/index';
import persist from './src/persist-middleware';
import { STORE_KEY } from './src/constants/store';

let store;

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <StatusBar hidden={true} />

          <Provider store={store}>
            <Navigator />
          </Provider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      AsyncStorage.getItem(STORE_KEY)
        .then(data => data && JSON.parse(data))
        .catch(() => null)
        .then(appData => {
          appData = appData || {
            version: 1,
            operation: 'add',
            tableSize: 2,
            sessions: {},
          };

          store = createStore(reducer, appData, applyMiddleware(persist));
        }),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
