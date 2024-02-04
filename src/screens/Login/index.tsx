import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { Image } from "react-native";
import bgtop from "../../assets/bgtop.png";
import { Button } from "../../components/Button";
import { Field } from "../../components/Field";
import { Logo } from "../../components/Logo";
import { RegisterNavigationProps } from "../Register";
import { RootStackParamList } from "../RootStackParams";
import {
  CallSignin,
  CallSigninStrong,
  Container,
  Form,
  Wrapper,
} from "./styles";

export type LoginNavigationProps = NavigationProp<RootStackParamList, "Login">;

export default function Login() {
  const { navigate } = useNavigation<RegisterNavigationProps>();

  const handleNavigateToRegister = useCallback(() => {
    navigate("Register");
  }, [navigator]);
  return (
    <Wrapper>
      <Image source={bgtop} />

      <Container>
        <Logo />
        <Form>
          <Field label="E-mail" placeholder="digite seu e-mail" />
          <Field label="Senha" placeholder="digite sua senha" />
          <Button title="Entrar" />
          <CallSignin>
            Não tem conta?{" "}
            <CallSigninStrong onPress={handleNavigateToRegister}>
              Crie agora mesmo.
            </CallSigninStrong>
          </CallSignin>
        </Form>
      </Container>
    </Wrapper>
  );
}
