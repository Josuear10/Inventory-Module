import styled from "styled-components";

export default function Home() {
  return (
    <Container>
      <h1>Hola, ¿Cómo puedo ayudarte?</h1>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;