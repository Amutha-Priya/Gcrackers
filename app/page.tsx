import Image from "next/image";
import HeaderBanner from "./components/TitleBanner/Header";
import Navbarcomponents from "./components/Navbar/Navbar";
import Banner from "./components/Banner/banner"
import Ordersummary from "./components/Ordersummary/Ordersummary"
import Footer from "./components/footer/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <HeaderBanner />
      <Navbarcomponents />
      <Banner />
      <Ordersummary />
      <Footer />
    
    </div>
  );
}

