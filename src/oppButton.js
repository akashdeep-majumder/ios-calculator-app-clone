import { ACTIONS } from './App';

export default function OppButton({ dispatch, operation }) {
  const oppColor = {
    color: 'white',
    backgroundColor: 'rgb(255, 149, 0)',
  };
  return (
    <button
      style={oppColor}
      onClick={() => dispatch({ type: ACTIONS.CHOOSE, payload: { operation } })}
    >
      {operation}
    </button>
  );
}
