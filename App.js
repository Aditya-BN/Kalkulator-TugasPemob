import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import React from 'react';

const App = () => {
  const [number, setNumber] = React.useState(0);
  const [result, getResult] = React.useState(0);
  const [tmp, setTmp] = React.useState(0);
  const [op, setOp] = React.useState('');

  function Numpad(props) {
    return (
      <TouchableOpacity
        style={styles.numpadButton}
        onPress={() => {
          if (props.num >= 0) {
            return setNumber(number * 10 + props.num);
          } else {
            return Calculate(props);
          }
        }}>
        <Text style={styles.TextButton}>{props.title}</Text>
      </TouchableOpacity>
    );
  }

  function saveToTmp(props) {
    setTmp(number);
    setNumber(0);
    setOp(props.title);
  }

  function Calculate(props) {
    let tmpOp = '';
    if (props.title == 'C') {
      setNumber(0);
      getResult(0);
      setTmp(0);
      setOp('');
    }

    if (op != '' && op != 'C' && props.title != '=') {
      tmpOp = props.title;
      props.title = op;
    }
    switch (props.title) {
      case '+':
        if (tmp == 0) {
          saveToTmp(props);
        } else {
          getResult(tmp + number);
          setTmp(tmp + number);
          setOp(tmpOp);
          setNumber(0);
        }
        break;

      case '-':
        if (tmp == 0) {
          saveToTmp(props);
        } else {
          getResult(tmp - number);
          setTmp(tmp - number);
          setOp(tmpOp);
          setNumber(0);
        }
        break;

      case '*':
        if (tmp == 0) {
          saveToTmp(props);
        } else {
          getResult(tmp * number);
          setTmp(tmp * number);
          setOp(tmpOp);
          setNumber(0);
        }
        break;

      case '/':
        if (tmp == 0) {
          saveToTmp(props);
        } else {
          getResult(tmp / number);
          setTmp(tmp / number);
          setOp(tmpOp);
          setNumber(0);
        }
        break;

      case '=':
        switch (op) {
          case '+':
            getResult(tmp + number);
            break;
          case '-':
            getResult(tmp - number);
            break;
          case '*':
            getResult(tmp * number);
            break;
          case '/':
            getResult(tmp / number);
            break;
        }
        setOp('');
        setTmp(0);
        setNumber(0);
        break;

      default:
        console.log(props.title);
        break;
    }
  }

  return (
    <View style={styles.layout}>
      <View style={styles.numDisplay}>
        <View>
          <Text style={styles.textNumber}>{number}</Text>
          <Text style={styles.textNumber}>{op}</Text>
          <Text style={styles.textNumber}>{result}</Text>
        </View>
      </View>
      <View style={styles.numpadCol}>
        <View style={styles.numpadRow}>
          <Numpad title="1" num={1} />
          <Numpad title="2" num={2} />
          <Numpad title="3" num={3} />
          <Numpad title="+" />
        </View>
        <View style={styles.numpadRow}>
          <Numpad title="4" num={4} />
          <Numpad title="5" num={5} />
          <Numpad title="6" num={6} />
          <Numpad title="-" />
        </View>
        <View style={styles.numpadRow}>
          <Numpad title="7" num={7} />
          <Numpad title="8" num={8} />
          <Numpad title="9" num={9} />
          <Numpad title="*" />
        </View>
        <View style={styles.numpadRow}>
          <Numpad title="C" />
          <Numpad title="0" num={0} />
          <Numpad title="=" />
          <Numpad title="/" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal: 30,
    backgroundColor: '#65647C',
    fontFamily: 'sans-serif',
  },
  numDisplay: {
    height: '40%',
    justifyContent: 'center'
  },
  numpadCol: {
    justifyContent: 'space-evenly',
    height: '60%',
  },
  numpadRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  numpadButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8B7E74',
    borderRadius: 20,
    height: 80,
    width: 70,
  },
  textNumber: {
    textAlign: 'right',
    fontSize: 50
  },
  TextButton: {
    color: '#ffffff',
    fontSize: 30,
  },
});

export default App;