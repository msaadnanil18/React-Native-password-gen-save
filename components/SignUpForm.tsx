import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, CheckBox, Button } from "react-native-elements";
import axios from "axios";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { stackPramsList } from "./Index";

type HomeProps = NativeStackScreenProps<stackPramsList, "passwordAppear">;

const SignUpForm = ({ navigation }: HomeProps) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [navigate, setNavigate] = React.useState<boolean>(false);

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handleSubmit = async () => {
    try {
      const formData = { name, email };
      const response = await axios.post(
        "http://172.16.2.12:8000/api/login",
        formData
      );

      setNavigate(true);
      navigation.navigate("passwordAppear", { produtId: response.data._id });
    } catch (error) {
      console.log("error while save form", error);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Name"
        value={name}
        onChangeText={handleNameChange}
        containerStyle={styles.input}
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
        containerStyle={styles.input}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding:10,
    alignItems:'center'
  },
  input: {
    marginBottom: 10,
    width: 300,
  },
  checkbox: {},
});

export default SignUpForm;
