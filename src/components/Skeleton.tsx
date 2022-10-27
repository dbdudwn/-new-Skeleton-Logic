import React, { useMemo } from "react";
import styled from "@emotion/styled/macro";
import { keyframes, css } from "@emotion/react";

interface IProps {
  width?: number;
  height?: number;
  circle?: boolean; // 선언 시 원형 스켈레톤 사용 가능
  rounded?: boolean; //border radius
  count?: number; //count만큼의 스켈레톤을 선언
  unit?: string; // px % 등의 단위
  animation?: true; // 사용여부
  color?: string; // 스켈레톤의 배경컬러
  style?: React.CSSProperties; // 추가적인 css style
}

const pulseKeyframe = keyframes`
0% {
    opacity: 1;
}
50% {
    opacity: 0.4;
}
100% {
    opacity: 1;
}
`;

// animation일 때 opacity가 무한으로 깜빡거리는 애니메이션
const pulseAnimation = css`
  animation: ${pulseKeyframe} 1.8s ease-in-out infinite;
`;

const Skeleton = ({
  count,
  width,
  height,
  circle,
  rounded,
  unit,
  animation = true,
  color = "#f4f4f4",
  style,
}: IProps) => {
  // ex. count = 6 ? "------" 단순히 글자를 채우기 위함임
  const content = useMemo(
    () => [...Array({ length: count })].map(() => "-").join(""),
    [count]
  );
  console.log("1", count);
  console.log("2", unit);
  return (
    <Base
      count={count}
      style={style}
      width={width}
      height={height}
      circle={circle}
      rounded={rounded}
      unit={unit}
      animation={animation}
      color={color}
    >
      <Content>{content}</Content>
    </Base>
  );
};

const Base = styled.span<IProps>`
  ${({ color }) => color && `background-color: ${color}`};
  ${({ rounded }) => rounded && "border-radius: 8px"};
  ${({ circle }) => circle && "border-radius: 50%"};
  ${({ width, height }) => (width || height) && "display: block"};
  ${({ animation }) => animation && pulseAnimation};
  width: ${({ width, unit }) => width && unit && `${width}${unit}`};
  height: ${({ height }) => height && `${height}px`};
`;

const Content = styled.span`
  opacity: 0;
`;

export default Skeleton;
