import Image from 'next/image';
import { useState } from 'react';
import FormGroup from '../../Components/FormGroup';
import OrRibbon from '../../Components/OrRibbon';
import AutomaticSignUpButton from '../../Components/AutomaticSignUpButton';

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
                <OrRibbon />
                <div className="flex justify-between mt-[38px] gap-5">
                    <AutomaticSignUpButton iconPath={'/googleIcon.svg'} width={48} height={48} />
                    <AutomaticSignUpButton iconPath={'/appleIcon.svg'} width={48} height={48} />
                </div>
            </form>
        </div>
    );
}

export default SignIn;