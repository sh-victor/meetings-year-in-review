import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <Container>
      <Wrapper>
        <Content>
          <ErrorCode>Error</ErrorCode>
          <Reason>Page not found</Reason>
        </Content>
        <Anchor>
          <Link to="/">Back to Home</Link>
        </Anchor>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 100vh;
  background: #030005;
`;

const Wrapper = styled.div`
  max-width: 767px;
  width: 100%;
  line-height: 1.4;
  text-align: center;

  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const Content = styled.div`
  position: relative;
  height: 180px;
  margin-bottom: 20px;
  z-index: -1;
`;

const ErrorCode = styled.h1`
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 224px;
  font-weight: 900;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: -12px;
  color: #030005;
  text-transform: uppercase;
  text-shadow: -1px -1px 0px #8400ff, 1px 1px 0px #ff005a;
  letter-spacing: -20px;

  @media only screen and (max-width: 480px) {
    font-size: 182px;
  }
`;

const Reason = styled.h2`
  position: absolute;
  left: 0;
  right: 0;
  top: 110px;
  font-size: 42px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  text-shadow: 0px 2px 0px #8400ff;
  letter-spacing: 13px;
  margin: 0;

  @media only screen and (max-width: 767px) {
    font-size: 24px;
  }
`;

const Anchor = styled.a`
  display: inline-block;
  text-transform: uppercase;
  color: #ff005a;
  text-decoration: none;
  border: 2px solid;
  background: transparent;
  padding: 10px 40px;
  font-size: 14px;
  font-weight: 700;
  -webkit-transition: 0.2s all;
  transition: 0.2s all;
  &:hover {
    color: #8400ff;
  }
`;
