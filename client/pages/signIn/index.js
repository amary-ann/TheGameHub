import Image from 'next/image';
import FormGroup from '../../Components/FormGroup';

const SignIn = (props) => {
    return (
        <div className="max-w-[440px] mx-auto">
            <Image src='/rocket.png' width={388} height={343} />

            <form className='px-[45px] poppinsFont relative -top-[40px]'>
                <p className='text-[30px] font-bold mb-[23px]'>Sign In</p>
                <FormGroup title="Email or username" className='mb-[23px]'/>
                <FormGroup title="Password" className='mb-[35px]'/>
                <button className='bg-[#4C54C8] w-full h-[62px] text-[23px] text-white rounded-[13px] font-bold'>Sign Up</button>
            </form>
        </div>
    );
}

export default SignIn;