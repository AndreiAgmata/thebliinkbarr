import Hero from "../components/Hero/Hero";
import Categories from "@/components/Categories/Categories";
import BestSellers from "@/components/BestSellers/BestSellers";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Categories />
      <BestSellers />
      <Footer />
    </main>
  );
}
