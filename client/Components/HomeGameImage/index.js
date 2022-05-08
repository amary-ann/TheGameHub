import Image from 'next/image';

const HomeGameImage = (props) => {
    return (
        <div className='flex items-center justify-center mt-[35px]'>
            <Image src='/gameImage.png' alt="Man wearing VR glasses" width={320} height={320} />
        </div>
    )
}
export default HomeGameImage;