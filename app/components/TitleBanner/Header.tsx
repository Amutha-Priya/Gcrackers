import React from "react";
import styles from "./Header.module.css";
import Image from "next/image";

const Header = () => {
  return (
    <header className={styles.headerBanner}>
      {/* Top Offer Strip */}
      <div className={styles.saleStrip}>
        🎆 80% Diwali Discount Offer is Going On! Hurry Up 🎆
      </div>

      {/* Main Header */}
      <div className={styles.mainBanner}>
        <div className={styles.bannerContent}>
          {/* Left Image */}
          <div className={styles.logoSection}>
            <Image
              src="/headerimage/Murugan.jpg"
              alt="Murugan"
              width={170}
              height={170}
              className={styles.roundLogo}
            />
          </div>

          {/* Brand Name */}
          <div className={styles.companyName}>
            <h1>G CRACKERS WORLD</h1>
            <h2>ஜி கிராகர்ஸ்</h2>
            <p>Sivakasi Quality Crackers</p>
          </div>

          {/* Right Image */}
          <div className={styles.logoSection}>
            <Image
              src="/headerimage/Gcracker.jpg"
              alt="G Crackers"
              width={150}
              height={150}
              className={styles.roundLogo}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
