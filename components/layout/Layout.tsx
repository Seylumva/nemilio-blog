import { useState } from "react";
import styles from "./Layout.module.css";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${styles.page} ${darkMode ? styles.dark : styles.light}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className={styles.container}>{children}</main>
      <Footer />
    </div>
  );
}
