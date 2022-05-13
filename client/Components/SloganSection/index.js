import Image from 'next/image';

const SloganSection = (props) => {
    return (
        <section className='flex justify-center mt-[110px]'>
            <div className='relative'>
                <div className='absolute -top-[37px] -left-[10px] -z-10'>
                    <Image src='/pattern1.svg' alt="Slogan section pattern1" width={117} height={117} />
                </div>
                <p className="text-[30px] font-semibold poppinsFont text-center max-w-[310px]">Play fun games with anyone anywhere</p>
                <div className='absolute -bottom-[56px] -right-2 -z-10'>
                    <Image src='/pattern2.svg' alt="Slogan section pattern2" width={105} height={105} />
                </div>
            </div>
        </section>
    )
}

export default SloganSection;