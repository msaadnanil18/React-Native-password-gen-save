import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Card, Button, Image } from "react-native-elements";
import axios from "axios";
import { Passwords } from "./typs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { stackPramsList } from "./Index";

declare module "react-native-elements" {
  export interface CardProps {
    children?: React.ReactNode; // This line ensures that children can be explicitly defined
  }
}
type HomeProps = NativeStackScreenProps<stackPramsList, "passwordAppear">;

const PasswordApper = ({ navigation, route }: HomeProps) => {
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
              navigation.navigate("passwordgen", { id: produtId });
            }}
            style={styles.generatePasswordButton}
            title="Generate password"
          />
        </View>
        {dataLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View>
            {authData.map((item: any, index: any) => {
              return (
                // @ts-ignore
                <Card key={index} containerStyle={styles.card}>
                  <Text style={styles.name}>Field: {item.fieldPassword}</Text>
                  <Text style={styles.name}>Password: {item.password}</Text>
                </Card>
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 80,
    padding: 10,
    marginVertical: 10, 
  },
  name: {
    fontSize: 18,
  },
  generatePasswordButton: {
    padding: 10,
    margin: 10,
  },
  generatePassword: {
    alignItems: "flex-end", 
    marginBottom: 18, 
    marginHorizontal:10,
    marginVertical:15
  },
});

export default PasswordApper;
