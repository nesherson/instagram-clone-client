import styled from "styled-components";

const StyledInput = styled.input`
  margin: 6px 0;
  padding: 9px 10px;
  border-radius: 7px;
  border: 2px solid #dbe7eb;
  color: #808080;
  background-color: #f7f8f9;
  outline: none;
  &:focus {
    border-color: #8cb2c0;
  }
`;

const Warning = styled.span`
  font-size: 0.8rem;
  color: #ff1a1a;
`;

function EmailInput({label, name, register, required, pattern, errors}) {
    return (
      <>
        {label ? <label>{label}</label> : null}
        <StyledInput type={name} {...register(name, {required, pattern})} placeholder={name} />
        {errors.email?.type === 'required' ? <Warning>Email is required.</Warning> : null}
        {errors.email?.type === 'pattern' ? <Warning>Invalid email.</Warning> : null}
     </> 
    );
  };
  
  
  function PasswordInput({label, name, register, required, minLength, errors}) {
    return (
      <>
        {label ? <label>{label}</label> : null}
        <StyledInput type={name} {...register(name, {required, minLength})} placeholder={name} />
        {errors.password?.type === 'required' ?  <Warning>Password is required.</Warning> : null}
        {errors.password?.type === 'minLength' ? <Warning>Password is too short.</Warning> : null}
     </> 
    );
  };

export {EmailInput, PasswordInput};