import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SignUpForm from "./SignUpForm";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PasswordGen from "./PasswordGen";
import PasswordApper from "./PasswordApper";

export type stackPramsList = {
  SignUpForm: undefined;
  passwordgen: { id: string };
  passwordAppear: { produtId: string };
};

const Index = () => {
  const stack = createNativeStackNavigator<stackPramsList>();
  return (
    <stack.Navigator initialRouteName="SignUpForm">
      <stack.Screen
        name="SignUpForm"
        component={SignUpForm}
        options={{
          title: "Sign Up Form",
        }}
      />
      <stack.Screen name="passwordAppear" component={PasswordApper} initialParams={{produtId:'id'}} />
      <stack.Screen name="passwordgen" component={PasswordGen} initialParams={{id:'id'}} />
    </stack.Navigator>
  );
};

export default Index;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 250,
  },
});
