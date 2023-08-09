import { css, styled } from "styled-components"

export const buttonValue = css`
    border: 0;
    border-radius: 5px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    padding: 5px 10px;
    svg {
      height: 16px;
      margin-right: 5px;
    }
    ${props => props.size === 'l' && css`
        font-size: 1.2rem;
        padding: 6px 12px;
        svg {
          height: 20px;
        }
    `}
    ${ props => props.primary && `
        background-color: #5542f6;
        color: #fff;
        border: 1px solid #fff;
    `}
    ${props => props.white && !props.outline && `
        background-color: #fff;
        color: #000;
    `}
    ${props => props.white && props.outline && `
        background-color: transparent;
        color: #fff;
        border: 1px solid #fff;
    `}
`;

const NormalButton = styled.button`${buttonValue}`


function Button({children, ...rest}) {
  return (
    <NormalButton {...rest}>{children}</NormalButton>
  )
}

export default Button