import CheckGamesButton from "../Components/CheckGamesButton";
import HomeGameImage from "../Components/HomeGameImage";
import HomeHeadingSection from "../Components/HomeHeadingSection";
import SloganSection from "../Components/SloganSection";


const Home = (props) => {
    return (
        <div >
            <HomeHeadingSection />
            <SloganSection />
            <HomeGameImage />
            <CheckGamesButton />
        </div>
    );
}
export default Home;