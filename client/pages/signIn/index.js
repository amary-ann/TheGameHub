import Image from 'next/image';
import { useState } from 'react';
import FormGroup from '../../Components/FormGroup';

const SignIn = (props) => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className="max-w-[440px] mx-auto">
            <div className='flex items-center justify-center'>
                <Image src='/rocket.png' width={388} height={343} />
            </div>

            <form className='px-[35px] poppinsFont relative -top-[40px]'>
                <p className='text-[30px] font-bold mb-[23px]'>Sign In</p>
                <FormGroup title="Email or username" className='mb-[23px]' value={emailOrUsername} setValue={setEmailOrUsername}/>
                <FormGroup title="Password" className='mb-[35px]' type='password' value={password} setValue={setPassword}/>
                <button onClick={handleSubmit} className='bg-[#4C54C8] w-full h-[62px] text-[23px] text-white rounded-[13px] font-bold'>Sign Up</button>
                <div className='grid grid-cols-[auto_40px_auto] mt-[23px]'>
                    <div className='flex items-center'>
                        <div className='h-[1.5px] bg-[#4C54C8] w-full'></div>
                    </div>
                    <p className='text-center text-[12px] font-bold'>Or</p>
                    <div className='flex items-center'>
                        <div className='h-[1.5px] bg-[#4C54C8] w-full'></div>
                    </div>
                </div>
                <div className="flex justify-between mt-[38px]">
                    <div className='w-[150px] h-[87px] rounded-[27px] automaticSignUpButton  flex items-center justify-center'>
                        <Image src='/googleIcon.svg' width={48} height={48} />
                    </div>
                    <div className='w-[150px] h-[87px] rounded-[27px] automaticSignUpButton  flex items-center justify-center'>
                        <Image src='/appleIcon.svg' width={48} height={48} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignIn;