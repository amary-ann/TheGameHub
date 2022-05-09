const FormGroup = ({className, title, color}) => {
    return (
        <div className={className}>
            <p className='font-semibold text-[18px]'>{title}</p>
            <input style={{borderColor: color ? color : '#4C54C8'}} type='text' className='h-[62px] w-full rounded-[13px] border-[3px] focus:outline-none px-[10px] text-[20px]' />
        </div>
    );
}

export default FormGroup;