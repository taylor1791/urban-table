import { createSwitchNavigator } from 'react-navigation';

import QuizScreen from '../screens/Quiz';

const Quiz = createSwitchNavigator({
  Quiz: QuizScreen,
});

export default Quiz;
