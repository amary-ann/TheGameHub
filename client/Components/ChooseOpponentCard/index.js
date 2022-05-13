import Image from 'next/image';

const ChooseOpponentCard = ({text, iconPath}) => {
    return (
        <div className="w-full h-[231px] bg-[#FA7BA1] pl-[17px] pr-[26px] rounded-[34px]">
            <section className='pt-[29px] w-full flex justify-between items-center'>
                <div>
                    <Image src={iconPath} width={50} height={50} />
                </div>
                <div>
                    <Image src='/forwardIconArrow.svg' width={28.5} height={18.5} />
                </div>
            </section>
            <p>{text}</p>
        </div>
    );
}
export default ChooseOpponentCard;