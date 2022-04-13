import Link from "next/link";
import { FaCog } from "react-icons/fa";
import ColorSchemeButton from "../ColorSchemeButton";
import styles from "./Header.module.css";

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export default function Header({ darkMode, toggleDarkMode }: Props) {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>nemil.io</a>
      </Link>
      <aside className={styles["header-menu"]}>
        <ColorSchemeButton
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <button className={styles.button}>
          <FaCog />
        </button>
      </aside>
    </header>
  );
}
