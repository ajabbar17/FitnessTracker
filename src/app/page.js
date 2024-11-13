
import Image from "next/image";
import Hero from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer";
import Services from "./components/Services";

export default function Home() {
  return (
    <div className="">
     <Hero/>
     <About />
     <Services  />
     <Footer />
    </div>
  );
}
