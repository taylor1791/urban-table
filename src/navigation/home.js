import React from 'react';
import { Platform } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/Home';

const Home = createSwitchNavigator({
  Home: HomeScreen,
});

Home.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-home` : 'md-home'}
    />
  ),
};

export default Home;
