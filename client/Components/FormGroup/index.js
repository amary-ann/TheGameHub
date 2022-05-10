const FormGroup = ({className, title, color, type, value, setValue}) => {
    const onInputChange = (e) => {
        setValue(e.target.value);
    }
    return (
        <div className={className}>
            <p className='font-semibold text-[18px]'>{title}</p>
            <input 
              type={type ? type : 'text'} 
              style={{borderColor: color ? color : '#4C54C8'}} 
              className='h-[62px] w-full rounded-[13px] border-[3px] focus:outline-none px-[10px] text-[20px]' 
              value={value}
              onChange={onInputChange}
            />
        </div>
    );
}

export default FormGroup;