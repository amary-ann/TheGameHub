import Image from "next/image";

const AutomaticSignUpButton = ({iconPath, width, height}) => {
    return (
        <div className='w-[150px] h-[87px] rounded-[27px] automaticSignUpButton  flex items-center justify-center'>
            <Image src={iconPath} width={width} height={height} />
        </div>
    )
}

export default AutomaticSignUpButton;