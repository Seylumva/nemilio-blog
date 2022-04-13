import { FaMoon, FaSun } from "react-icons/fa";
import styles from "./ColorSchemeButton.module.css";

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export default function ColorSchemeButton({ darkMode, toggleDarkMode }: Props) {
  return (
    <button
      onClick={toggleDarkMode}
      className={`${styles.button}  ${darkMode ? styles.dark : styles.light}`}
    >
      {darkMode ? <FaMoon /> : <FaSun />}
    </button>
  );
}
