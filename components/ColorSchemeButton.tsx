import { FaMoon, FaSun } from "react-icons/fa";
import styles from "./ColorSchemeButton.module.css";

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export default function ColorSchemeButton({ darkMode, toggleDarkMode }: Props) {
  return (
    <button
      aria-label={`${
        darkMode ? "Switch to light mode" : "Switch to dark mode"
      }`}
      onClick={toggleDarkMode}
      className={styles.button}
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
}
