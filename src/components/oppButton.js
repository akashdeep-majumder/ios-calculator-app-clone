import { ACTIONS } from '../App';
import styles from './opp.module.css';

export default function OppButton({ dispatch, operation }) {
  return (
    <button
      className={styles.button}
      onClick={() => dispatch({ type: ACTIONS.CHOOSE, payload: { operation } })}
    >
      {operation}
    </button>
  );
}
