import styled from 'styled-components';

const StyledInput = styled.input`
  border: none;
  outline: none;
  width: 90%;
  @media only screen and (max-width: 464px) {
    width: 85%;
  }
`;

const NewCommentInput = ({type, name, register, placeholder, errors}) => {
    return (
        <StyledInput type={type} {...register(name)} placeholder={placeholder} errors={errors} />
    );
};

export { NewCommentInput };
