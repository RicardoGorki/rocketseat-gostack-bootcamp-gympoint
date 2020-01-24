import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Wrapper, Container } from './styles';
import logo from '~/assets/logo.png';

export default function SignIn() {
  return (
    <Wrapper>
      <Container>
        <img src={logo} alt="Gympoint" />
        <Form>
          <span>SEU E-MAIL</span>
          <Input name="email" type="email" placeholder="exemplo@gmail.com" />
          <span>SUA SENHA</span>
          <Input name="password" type="password" placeholder="******" />

          <button type="submit">Entrar no sistema</button>
        </Form>
      </Container>
    </Wrapper>
  );
}
