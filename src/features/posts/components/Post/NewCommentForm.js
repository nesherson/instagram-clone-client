import styled from 'styled-components';
import { forwardRef } from 'react';

const StyledInput = styled.input`
  border: none;
  outline: none;
  width: 90%;
  @media only screen and (max-width: 464px) {
    width: 85%;
  }
`;

const NewCommentInput = forwardRef(
  ({ type, name, register, placeholder, errors }, ref) => {
    return (
      <StyledInput
        type={type}
        {...register(name)}
        placeholder={placeholder}
        errors={errors}
        ref={ref}
      />
    );
  }
);

export { NewCommentInput };
