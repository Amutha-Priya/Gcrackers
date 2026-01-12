import React from 'react'
import styles from "./Header.module.css";
import Image from "next/image";

const Header = () => {
  return (
  <header className={styles.headerBanner}>
      {/* Top blue strip */}
      <div className={styles.saleStrip}>
        ✨ Diwali sale is open now! Hurry to grab your offers! ✨
      </div>

      {/* Main banner */}
      <div className={styles.mainBanner}>
        <div className={styles.bannerContent}>
          {/* Left Logo */}
          <div className={styles.logoSection}>
            <Image
              src="/headerimage/Murugan.jpg"
              alt="Murugan Logo"
              width={200}
              height={180}
              className={styles.logo}
              style={{ objectFit: 'cover',borderRadius: '80%' }}
            />
          </div>

          {/* Company name */}
          <div className={styles.companyName}>
            <h1>G CRACKERS WORLD</h1>
            <h2>ஜி கிராகர்ஸ்</h2>
          </div>

          {/* Right Logo */}
          <div className={styles.logoSection}>
            <Image
              src="/headerimage/Gcracker.jpg"
              alt="G Crackers Logo"
              width={150}
              height={150}
              className={styles.logo}
            />
          </div>
        </div>
      </div>
    </header>
  );
  
}

export default Header
