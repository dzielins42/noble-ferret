import * as React from "react"
import styled from 'styled-components'

interface Props {
  children?: any
  ratio: number
}

const AspectRatio = ({ children, ratio }: Props) => (
  <OuterWrapper ratio={ratio}>
    <InnerWrapper>
      {children}
    </InnerWrapper>
  </OuterWrapper>
)



const OuterWrapper = styled.div<{ ratio: number }>`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: ${props => (1 / props.ratio) * 100}%;
`

const InnerWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export default AspectRatio
