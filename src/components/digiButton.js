import { ACTIONS } from '../App';
import styles from './digi.module.css';

export default function DigiButton({ dispatch, digit }) {
  return (
    <button
      className={styles.button}
      onClick={() => dispatch({ type: ACTIONS.ADD, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
