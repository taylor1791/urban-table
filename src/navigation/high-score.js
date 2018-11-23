import React from 'react';
import { Platform } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HighScoreScreen from '../screens/HighScore';

const HighScore = createSwitchNavigator({
  Links: HighScoreScreen,
});

HighScore.navigationOptions = {
  tabBarLabel: 'High Score',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-stats' : 'md-stats'}
    />
  ),
};

export default HighScore;
