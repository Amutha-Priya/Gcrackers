import Image from "next/image";
import HeaderBanner from "./components/TitleBanner/Header";


export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <HeaderBanner />
    

      <main className="flex flex-col items-center py-10">
        <h1>Fresh Cracker Shop 🧨</h1>
        <p>Welcome Amuthapriya 👋</p>
        <p>Next.js project started successfully.</p>
      </main>
    </div>
  );
}

