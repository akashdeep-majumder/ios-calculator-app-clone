import { ACTIONS } from './App';

export default function DigiButton({ dispatch, digit }) {
  const digiColor = {
    color: 'white',
    backgroundColor: 'rgb(80, 80, 80)',
  };
  return (
    <button
      style={digiColor}
      onClick={() => dispatch({ type: ACTIONS.ADD, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
