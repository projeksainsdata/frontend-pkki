import BannerCustom from "../components/HeroCustom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

const Informasi = () => {
  return (
    <>
    <Navbar />
    <BannerCustom name="Informasi" />
    <div>
      <h1>Informasi Page</h1>
      {/* Add your content here */}
    </div>
    <Contact />
    <Footer />
  </>
  );
}

export default Informasi;