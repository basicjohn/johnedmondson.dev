import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  console.log("Displaying Home page");
  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default Home;
