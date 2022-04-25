import CheckGamesButton from "../Components/CheckGamesButton";
import HomeGameImage from "../Components/HomeGameImage";
import HomeHeadingSection from "../Components/HomeHeadingSection";
import SloganSection from "../Components/SloganSection";


const Home = (props) => {
    return (
        <main >
            <HomeHeadingSection />
            <SloganSection />
            <HomeGameImage />
            <CheckGamesButton />
        </main>
    );
}
export default Home;