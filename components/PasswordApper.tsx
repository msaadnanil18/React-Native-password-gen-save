import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Card, Button, Image } from "react-native-elements";
import axios from "axios";
import { Passwords } from "./typs";
import { NativeStackScreenProps, } from "@react-navigation/native-stack";
import { stackPramsList } from "./Index";
type HomeProps = NativeStackScreenProps<stackPramsList, 'passwordAppear'>;

const PasswordApper = ({navigation, route}:HomeProps) => {
  const [dataLoading, setDataLoading] = React.useState(false);
  const [authData, setAuthData] = React.useState<Passwords[]>([]);
  const { produtId } = route.params;
  const fetchData = () => {
    setDataLoading(true);
    axios
      .get(`http://172.16.2.12:8000/api/auth/${produtId}`)
      .then((res) => {
        setAuthData(res?.data?.passwordHistory);
      })
      .catch((error) => {
        console.log(error, "err");
      })
      .finally(() => {
        setDataLoading(false);
      });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView>
      <View>
        <View style={styles.generatePassword}>
          <Button
          onPress={() => {
            navigation.navigate('passwordgen',{id:produtId})
          }}
            style={styles.generatePasswordButton}
            title="Generate password"
          />
        </View>
        {authData.map((u: any, i: any) => {
          return (
            <View key={i} style={styles.user}>
              <Text style={styles.name}>{u.fieldPassword}</Text>
              <Text style={styles.name}>{u.password}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 180,
  },
  name: {},
  user: {},
  generatePasswordButton: {
    padding: 0,
    margin: 0,
    fontSize: 20,
    color: 'green'
  },
  generatePassword: {
    flex: 1,
    width: 190,
  },
});

export default PasswordApper;
