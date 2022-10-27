import React, { useEffect, useState } from "react";
import styled from "@emotion/styled/macro";
import Skeleton from "./components/Skeleton";
import ImgFile from "./assets/img_c2_temp.jpg";

// loading전 보여질 Skeleton
const PlaceHolder = ({ count }: any) => (
  <Container>
    <ImageWrapper>
      <Skeleton width={100} height={220} unit={"%"} />
    </ImageWrapper>
    <Info>
      <Skeleton width={150} height={29} count={count} unit={"px"} rounded />
      <PlaceHolderWhtSpc />
      <Skeleton width={200} height={19} count={count} unit={"px"} rounded />
    </Info>
  </Container>
);

// loading후 보여질 완성된 Item
const Item = () => {
  return (
    <Container>
      <ImageWrapper>
        <Image src={ImgFile} />
      </ImageWrapper>
      <Info>
        <Title>Cat taking a nap</Title>
        <Description>zzz</Description>
      </Info>
    </Container>
  );
};

const App = () => {
  // 추후 데이터 fetching (swr, react-query) 및 redux, mobx로 코드변경
  const [loading, setLoading] = useState<Boolean>(true);
  const count = 15;
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <Base>
      {loading
        ? Array.from({ length: count }).map((_, idx) => (
            <PlaceHolder count={count} key={idx} />
          ))
        : Array.from({ length: count }).map((_, idx) => <Item key={idx} />)}
    </Base>
  );
};

const Base = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 1fr); //row에 5개씩
  column-gap: 12px;
  row-gap: 24px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  border-radius: 4px;
`;

const ImageWrapper = styled.div`
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
`;

const Title = styled.h4`
  margin: 0;
  padding: 0;
  font-size: 24px;
`;

const Description = styled.p`
  margin: 8px 0 0 0;
  padding: 0;
  font-size: 16px;
`;

const PlaceHolderWhtSpc = styled.div`
  height: 8px;
`;
export default App;
