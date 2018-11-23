import React from 'react';
import { View, TouchableHighlight, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { recordScore } from '../reducer';

const operations = {
  add({ a, b }) {
    return a + b;
  },
  mul({ a, b }) {
    return a * b;
  },
};

operations.add.toString = function() {
  return '+';
};
operations.mul.toString = function() {
  return '*';
};

export class Quiz extends React.Component {
  state = {
    startTime: Date.now(),
    endTime: null,
    entered: 0,
    incorrect: 0,
    correct: 0,
    remaining: [],
    correctValue: null,
    skipCount: false,
  };

  constructor(props) {
    super(props);

    this.state.remaining = createProblems(props.tableSize);
  }

  render() {
    const answered = this.state.incorrect + this.state.correct;

    if (!this.state.remaining.length) {
      const time = (this.state.endTime - this.state.startTime) / 1000;

      return (
        <View style={styles.results}>
          <Text style={styles.digitText}>
            Correct: {this.state.correct}/{answered}
          </Text>
          <Text style={styles.digitText}>Time: {time} Seconds</Text>
          <Button title="Home" onPress={this.goHome} />
        </View>
      );
    }

    const problem = [
      this.state.remaining[0].a,
      operations[this.props.operation],
      this.state.remaining[0].b,
    ].join(' ');

    return (
      <View>
        <View style={styles.display}>
          <Text style={styles.problem}>{problem}</Text>
        </View>

        <View
          style={[
            styles.entryDisplay,
            this.state.correctValue ? styles.incorrectDisplay : null,
          ]}
        >
          <Text
            style={[
              styles.entry,
              this.state.correctValue ? styles.incorrect : null,
            ]}
          >
            {this.state.correctValue
              ? this.state.correctValue
              : this.state.entered || ' '}
          </Text>
        </View>

        <View style={styles.digits}>
          <Digit value={7} onPress={this.pressDigit} />
          <Digit value={8} onPress={this.pressDigit} />
          <Digit value={9} onPress={this.pressDigit} />

          <Digit value={4} onPress={this.pressDigit} />
          <Digit value={5} onPress={this.pressDigit} />
          <Digit value={6} onPress={this.pressDigit} />

          <Digit value={1} onPress={this.pressDigit} />
          <Digit value={2} onPress={this.pressDigit} />
          <Digit value={3} onPress={this.pressDigit} />

          <Digit value="C" onPress={this.pressDigit} />
          <Digit value={0} onPress={this.pressDigit} />
          <Digit value="C" onPress={this.pressDigit} />
        </View>
      </View>
    );
  }

  pressDigit = value => {
    if (this.state.correctValue) {
      return;
    }

    if (value === 'C') {
      return this.setState({
        entered: 0,
      });
    }

    const enteredValue = this.state.entered * 10 + value;
    const expectedValue = operations[this.props.operation](
      this.state.remaining[0],
    );

    // Need more digits
    if (enteredValue.toString().length !== expectedValue.toString().length) {
      return;
    }

    // Wrong answer
    if (enteredValue !== expectedValue) {
      this.setState({
        incorrect: this.state.incorrect + !this.state.skipCount,
        entered: 0,
        correctValue: expectedValue,
        skipCount: true,
      });

      setTimeout(() => {
        this.setState({
          correctValue: null,
        });
      }, 3000);
      return;
    }

    const isCorrect = enteredValue === expectedValue;
    const newState = {
      entered: 0,
      incorrect: this.state.incorrect,
      correct: this.state.correct + (!this.state.skipCount && isCorrect),
      remaining: this.state.remaining.slice(1),
      skipCount: false,
    };

    if (newState.remaining.length === 0) {
      newState.endTime = Date.now();
      this.props.recordScore({
        operation: this.props.operation,
        tableSize: this.props.tableSize,
        result: {
          date: Date.now(),
          time: newState.endTime - this.state.startTime,
          incorrect: newState.incorrect,
          correct: newState.correct,
        },
      });
    }

    this.setState(newState);
  };

  goHome = () => {
    this.props.navigation.navigate('Home');
  };
}

class Digit extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={this.press} style={styles.digitButton}>
        <Text style={styles.digitText}>{this.props.value}</Text>
      </TouchableHighlight>
    );
  }

  press = () => {
    this.props.onPress(this.props.value);
  };
}

const styles = {
  display: {
    margin: 20,
    padding: 20,
    borderRadius: 5,
    borderWidth: 2,
  },
  problem: {
    fontSize: 64,
    textAlign: 'center',
  },
  entryDisplay: {
    margin: 20,
    marginTop: 0,
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
  },
  incorrectDisplay: {
    borderColor: '#ff0000',
  },
  entry: {
    fontSize: 32,
    textAlign: 'center',
  },
  incorrect: {
    color: '#ff0000',
  },
  digits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  digitButton: {
    borderWidth: 1,
    borderRadius: 5,
    width: '30%',
    marginBottom: 20,
  },
  digitText: {
    fontSize: 40,
    textAlign: 'center',
  },
  results: {
    margin: 20,
  },
};

function createProblems(n) {
  const result = [];

  for (var a = 1; a <= n; a++) {
    for (var b = 1; b <= n; b++) {
      result.push({ a, b });
    }
  }

  return shuffle(result);
}

function shuffle(array) {
  for (var i = array.length - 1; i; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

function mapStateToProps({ operation, tableSize }) {
  return { operation, tableSize };
}

export default connect(
  mapStateToProps,
  { recordScore },
)(Quiz);
