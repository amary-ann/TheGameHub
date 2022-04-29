import BackButton from "../../Components/BackButton";
import Head from 'next/head';
import {useRouter} from 'next/router';

const ChooseOpponent = (props) => {
    const router = useRouter();
    const getRouteTitleFromPath = () => {
        const {name : gameName} = router.query;
        switch (gameName) {
            case 'tictactoe':
                return 'Tic Tac Toe';
            case 'chess': 
                return 'Chess';
            case 'wordsmith':
                return 'Word Smith';
            case 'fastestfingers':
                return 'Fastest Fingers'
            default :
                return 'Game not found';
        }

    }
    return (
        <main className="container mx-auto pt-[23px] pb-[70px] px-[32px]">
            <Head>
                <title>{getRouteTitleFromPath()}</title>
            </Head>
            <BackButton />
            <h1 className="text-[26px] font-semibold poppinsFont">Choose your opponent</h1>
            <div className="">

            </div>
        </main>
    );
}

export default ChooseOpponent;