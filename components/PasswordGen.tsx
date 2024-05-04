import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button, CheckBox, Slider } from "react-native-elements";
import { Drawer } from "react-native-paper"; // Assuming you're using React Navigation
// import { PlusCircle } from "react-native-vector-icons"; // You might need to import the appropriate icons package

function PasswordGen({ route }) {
  const [loading, setLoading] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [inputPasswordField, setInputPasswordField] = useState("");
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const { id, editPasswordId } = route.params;

  const handleCheckboxChange = (value: any, type: any) => {
    if (type === "number") {
      setNumberAllowed(value);
    } else if (type === "char") {
      setCharAllowed(value);
    }
  };

  const sendPass = async () => {
    setLoading(true);
    const formData = {
      fieldPassword: inputPasswordField,
      password: inputPassword,
    };

    await axios.post(
      `http://172.16.2.12:8000/api/password-gen/${id}`,
      formData
    );
    setLoading(false);
    setInputPassword(null);
    setInputPasswordField(null);
  };

  const setPassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "@#&*$";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setInputPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    setPassword();
  }, [numberAllowed, charAllowed, setPassword]);

  const editpassword = async () => {
    try {
      const response = await axios.post(
        `http://172.16.2.12:8000/api/password-edit/${id}/${editPasswordId}`
      );
      setInputPassword(response.data.passwordEdit?.password);
      setInputPasswordField(response.data.passwordEdit?.fieldPassword);
    } catch (error) {
      console.log("err while editing", error);
    }
  };

  React.useEffect(() => {
    if (editPasswordId) {
      editpassword();
    }
  }, []);

  return (
    <View>
      <View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter field of password"
            value={inputPasswordField}
            onChangeText={(text) => setInputPasswordField(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={inputPassword}
            onChangeText={(text) => setInputPassword(text)}
          />

          <View style={styles.checkboxContainer}>
            <CheckBox
              checked={numberAllowed}
              onPress={(value: any) => handleCheckboxChange(value, "number")}
            />
            <Text>Number Allowed</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              checked={charAllowed}
              onPress={(value) => handleCheckboxChange(value, "char")}
            />
            <Text>Char Allowed</Text>
          </View>

          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={6}
              maximumValue={20}
              step={1}
              value={length}
              onValueChange={(value) => setLength(value)}
            />
            <Text>Password Length: {length}</Text>
          </View>
        </View>
        <Button loading={loading} title="Save" onPress={sendPass} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sliderContainer: {
    marginVertical: 20,
  },
  slider: {
    width: "100%",
    height: 40,
  },
});

export default PasswordGen;
