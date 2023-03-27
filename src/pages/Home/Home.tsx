import Header from "../../components/Header/Header";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  console.log("Displaying Home page");
  return (
    <>
      <Header />
    </>
  );
};

export default Home;
