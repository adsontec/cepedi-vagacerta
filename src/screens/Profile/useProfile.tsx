import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { INavigationProps } from "../RootStackParams";
import React, { useState, useEffect } from 'react';

import * as Yup from "yup";
import user from "../../data/admin.json";

interface FormStructure {
  name: string;
  email: string;
  password: string;
}

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
  password: Yup.string().required("Campo obrigatório"),
});

export default function useProfile() {
  const { goBack, navigate } = useNavigation<INavigationProps>();

  const [userData, setUserData] = useState({});
  const [formValues, setFormValues] = useState({});

  const fetchUserData = async () => {
    try {
      const response = await fetch('sua_url_da_api/aqui');
      const data = await response.json();
      setUserData(data); 
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };

  const initialValues: FormStructure = {
    name: user.name,
    email: user.email,
    password: "",
  };

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleNavigateToHome = useCallback(() => {
    navigate("Home");
  }, [navigator]);

  const updateUserData = async () => {
    try {
      const response = await fetch('http://localhost:8081/src/data/admin.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('Dados do usuário atualizados:', data);
      fetchUserData();
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
    }
  };

  const handleFormSubmit = (values: FormStructure) => {
    // Implementar a lógica para lidar com a atualização do perfil do usuário
    updateUserData();
    handleNavigateToHome();
  };

  return {
    initialValues,
    ProfileSchema,
    handleGoBack,
    handleFormSubmit,
  };
}
