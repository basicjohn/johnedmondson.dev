import Footer from "../../Components/Footer/Footer";
import Container from "../../Components/Container/Container";
import Header from "../../Components/Header/Header";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  console.log("Displaying Home page");
  const sectionTitle = "About Me";
  return (
    <>
      <Header currentTitle={sectionTitle} />
      <Container>
        <p>
          Life is changing fast in these modern economic times. It's time to
          build a future for myself and on my own terms. I'm currently
          moonlighting to build apps (3) to solve some of the challenges I've
          faced in my personal & professional life.
        </p>
        {/* Your page content goes here */}
      </Container>
      <Footer />
    </>
  );
};

export default Home;
