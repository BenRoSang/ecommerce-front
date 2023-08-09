"use client";

import { styled } from "styled-components";

const TitleCenter = styled.h1`
    text-align: center;
    margin-top: 2rem;
`

export default function CenterText({children}) {
  return (
    <h1>{children}</h1>
  )
}
