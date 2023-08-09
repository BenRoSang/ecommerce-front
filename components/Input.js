import { styled } from "styled-components"

const StyledInput = styled.input`
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin: 5px 0;
    box-sizing: border-box;
`

function Input(props) {
  return (
    <StyledInput {...props} />
  )
}

export default Input