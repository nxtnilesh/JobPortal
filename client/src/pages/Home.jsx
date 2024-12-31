import Footer from "@/components/shared/Footer";
import CategoryCarousel from "./CategoryCarousel";
import HeroSection from "./HeroSection";
import LatestJob from "./LatestJob";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <CategoryCarousel />
      <LatestJob />
      <Footer />
    </div>
  );
};

export default Home;
