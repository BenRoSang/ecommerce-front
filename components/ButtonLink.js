import Link from 'next/link'
import { styled } from 'styled-components'
import { buttonValue } from './Button'

const LinkButton = styled(Link)`
    ${buttonValue}
`

function ButtonLink(props) {
  return (
    <LinkButton {...props} />
  )
}

export default ButtonLink