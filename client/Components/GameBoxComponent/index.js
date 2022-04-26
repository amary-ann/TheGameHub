import Image from "next/image";

const GameBoxComponent = ({name, imageRef}) => {
    return (
        <div className="relative w-full h-[300px] overflow-hidden rounded-[52px] gameBoxShadow">
            <Image src={imageRef} width={350} height={350} layout='fill'/>
            <div className="absolute w-full h-full top-0 linearGradient flex flex-col justify-end">
                <button className="flex justify-between w-[220px] py-[10px] bg-[#322D2D] px-[23px] rounded-[20px] mx-auto mb-[50px]">
                    <Image src='/PlayIcon.svg' width={30} height={30} />
                    <span className="text-white text-[25px] font-semibold poppinsFont">Play game</span>
                </button>
                <p className="text-white text-[31px] font-semibold poppinsFont mb-[30px] ml-[27px]">{name}</p>
            </div>
        </div>
    )
}
export default GameBoxComponent;