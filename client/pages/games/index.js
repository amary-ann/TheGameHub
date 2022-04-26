import BackButton from "../../Components/BackButton";
import GameBoxComponent from "../../Components/GameBoxComponent";
import { GameInformation } from "../../Components/GameInformation";

const Games = (props) => {
    return (
        <main className="container mx-auto pt-[23px] pb-[70px] px-[32px]">
            <BackButton />
            <div className="max-w-[366px] md:max-w-[800px] lg:max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-x-10">
                {GameInformation.map(game => <GameBoxComponent name={game.name} path={game.path} imageRef={game.imgageRef} />)}
            </div>
        </main>
    )
}
export default Games;