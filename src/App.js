import './App.css';
import React, { useReducer } from 'react';
import DigiButton from './components/digiButton';
import OppButton from './components/oppButton';

export const ACTIONS = {
  ADD: 'adddigit',
  CLEAR: 'clear',
  DEL: 'delete',
  CHOOSE: 'choose-operation',
  EVALUATE: 'evaluate',
};
const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD:
      if (state.overwrite) {
        return {
          operandTwo: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === '0' && state.operandTwo === '0') return state;
      if (payload.digit === '.' && state.operandTwo.includes('.') === true)
        return state;

      return {
        ...state,
        operandTwo: `${state.operandTwo || ''}${payload.digit}`,
      };
    case ACTIONS.CLEAR:
      return { operandTwo: '' };
    case ACTIONS.CHOOSE:
      if (state.operandOne == null && state.operandTwo === '') return state;
      if (state.operandOne == null) {
        return {
          ...state,
          operation: payload.operation,
          operandOne: state.operandTwo,
          operandTwo: '',
        };
      }
      if (state.operandTwo === '') {
        return {
          ...state,

          operation: payload.operation,
        };
      }
      return {
        ...state,
        operandOne: evaluate(state),
        operation: payload.operation,
        operandTwo: '',
      };
    case ACTIONS.EVALUATE:
      if (
        state.operandOne === null ||
        state.operandTwo === '' ||
        state.operation === null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        operandTwo: '',
        operandOne: evaluate(state),
        operation: null,
      };
    case ACTIONS.DEL:
      if (state.overwrite) {
        return {
          ...state,
          operandTwo: '',
          overwrite: false,
        };
      }
      if (state.operandTwo === '') {
        return state;
      }
      if (state.operandTwo.length === 1) {
        return {
          ...state,
          operandTwo: '',
        };
      }
      return {
        ...state,
        operandTwo: state.operandTwo.slice(0, -1),
      };
    default:
      return state;
  }
};

function evaluate({ operandOne, operandTwo, operation }) {
  const num1 = parseFloat(operandOne);
  const num2 = parseFloat(operandTwo);
  if (isNaN(num1) || isNaN(num2)) return '';
  let computation = '';
  switch (operation) {
    case '+':
      computation = num1 + num2;
      break;
    case '-':
      computation = num1 - num2;
      break;
    case '*':
      computation = num1 * num2;
      break;
    case '÷':
      computation = num1 / num2;
      break;
    default:
      return '';
  }
  return computation.toString();
}

function App() {
  const [{ operandOne, operandTwo, operation }, dispatch] = useReducer(
    reducer,
    { operandTwo: '', operandOne: null, operation: null }
  );
  return (
    <div className="App">
      <div className="output">
        <div className="operand-one">
          {operandOne}
          {operation}
        </div>
        <div className="operand-two">{operandTwo}</div>
      </div>
      <button
        className="AC-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button className="DEL" onClick={() => dispatch({ type: ACTIONS.DEL })}>
        DEL
      </button>
      <OppButton operation="÷" dispatch={dispatch} />

      <DigiButton digit="1" dispatch={dispatch} />

      <DigiButton digit="2" dispatch={dispatch} />
      <DigiButton digit="3" dispatch={dispatch} />
      <OppButton operation="*" dispatch={dispatch} />
      <DigiButton digit="4" dispatch={dispatch} />
      <DigiButton digit="5" dispatch={dispatch} />
      <DigiButton digit="6" dispatch={dispatch} />
      <OppButton operation="+" dispatch={dispatch} />
      <DigiButton digit="7" dispatch={dispatch} />
      <DigiButton digit="8" dispatch={dispatch} />
      <DigiButton digit="9" dispatch={dispatch} />
      <OppButton operation="-" dispatch={dispatch} />
      <DigiButton digit="0" dispatch={dispatch} />
      <DigiButton digit="." dispatch={dispatch} />
      <button
        className="eq-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
