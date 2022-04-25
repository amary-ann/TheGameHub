import Image from 'next/image';
import {useRouter} from 'next/router';

const BackButton = (props) => {
    const router = useRouter();
    const onBackButtonClick = () => {
        router.back();
    }
    return (
        <button onClick={onBackButtonClick}>
            <Image src='/backButton.svg' width={45} height={29} />
        </button>
    )
}

export default BackButton;