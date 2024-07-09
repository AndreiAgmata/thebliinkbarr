import Hero from "../components/Hero/Hero";
import HeaderDesktop from "../components/Header/HeaderDesktop/HeaderDesktop";
import Categories from "@/components/Categories/Categories";
import BestSellers from "@/components/BestSellers/BestSellers";
import About from "@/components/About/About";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Categories />
      <BestSellers />
      {/* <About /> */}
      <Footer />
    </main>
  );
}
