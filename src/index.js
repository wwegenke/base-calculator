import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Constants from 'expo-constants'
import Display from './components/Display';
import Keyboard from './components/Keyboard';
import { calculate } from './scripts/calculator';

export default function App() {
  const [base, setBase] = useState(10);
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [historyVisible, setHistoryVisible] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setResult(calculate(expression, base));
  }, [expression, base]);

  const onKeyPress = (e, value) => {
    switch (value) {
      case 'del':
        setExpression(expression.slice(0, -1));
        break;
      case 'clear':
        setExpression('');
        break;
      case '=':
        if (result && !result.includes('Error') && result !== 'NaN') {
          setHistory([...history, {expression: expression, result: result, base: base}]);
          setExpression(result);
        }
        break;
      default:
        setExpression(expression + value);
        break;
    }
  }

  return (
    <View style={styles.container}>
      <Display
        style={styles.display}
        expression={expression}
        result={result}
        base={base}
        history={history}
        historyVisible={historyVisible}
        setBase={setBase}
        setExpression={setExpression}
        setHistory={setHistory}
        setHistoryVisible={setHistoryVisible}/>
      <Keyboard
        style={styles.keyboard}
        onKeyPress={onKeyPress}
        base={base} />
    </View>
  );
}

const styles = {
  container: {
    marginTop: 5,
    flex: 1,
    backgroundColor: '#aaa',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  display: {
    flex: 1,
  },
  keyboard: {
    height: 406,
  }
};
