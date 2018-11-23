import {
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import Home from './home';
import HighScore from './high-score';
import Quiz from './quiz';

export default createSwitchNavigator({
  Main: createBottomTabNavigator({
    Home,
    HighScore,
  }),
  Quiz,
});
