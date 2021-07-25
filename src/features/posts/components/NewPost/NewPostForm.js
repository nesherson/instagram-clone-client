import styled from 'styled-components';

const StyledInput = styled.input`
  background-color: #f7f8f9;
  border: ${props => props.warning ? '1px solid #ff1a1a' : '1px solid transparent'};
  font-family: inherit;
  color: #404040;
  border-radius: 6px;
  outline: none;
  margin-bottom: 3px;
  padding: 7px;
  width: 425px;

  &:focus {
    background-color: #f0f2f4;
  }
  transition: background-color 200ms ease;
  @media only screen and (max-width: 664px) {
    width: 80%;
  }
`;

const Textarea = styled.textarea`
  background-color: #f7f8f9;
  border: ${props => props.isEmpty ? '1px solid #ff1a1a' : '1px solid transparent'};
  font-family: inherit;
  font-size: 0.9rem;
  color: #404040;
  outline: none;
  border-radius: 6px;
  margin-top: 3px;
  padding: 7px;
  max-width: 506px;
  min-width: 506px;
  box-sizing: border-box;

  &:focus {
    background-color: #f0f2f4;
  }
  transition: background-color 200ms ease;

  @media only screen and (max-width: 664px) {
    min-width: 100%;
    max-width: 100%;
    width: 100%;
  }
`;

const ImageUrlInput = ({type, name, register, required, pattern, placeholder, errors}) => {

    let warning = null;
    if (errors.imageUrl?.type === 'required' ? true : false || errors.imageUrl?.type === 'pattern' ? true : false) {
      warning = true;
    } 
    else {
      warning = false;
    } 
    return (
      <>
        <StyledInput type={type} {...register(name, {required, pattern})} placeholder={placeholder} warning={warning}/>
      </>
    );
  };
  
  const CaptionTextarea = ({type, name, register, required, placeholder, errors}) => {
  
    let isEmpty = errors.caption?.type === 'required' ? true : false;
   
    return (
      <>
        <Textarea type={type} {...register(name, {required})} placeholder={placeholder} isEmpty={isEmpty}>
        </Textarea>
      </>
    );
  };

  export {ImageUrlInput, CaptionTextarea};