import styles from "./Button.module.css";

export default function Button({ children, onClick, tooltip }) {
  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={onClick}>
        {children}
      </button>
      {tooltip && <span className={styles.tooltip}>{tooltip}</span>}
    </div>
  );
}
