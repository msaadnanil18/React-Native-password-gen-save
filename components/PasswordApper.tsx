import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Card, Button, Image, Icon } from "react-native-elements";
import axios from "axios";
import { Passwords } from "./typs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { stackPramsList } from "./Index";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

declare module "react-native-elements" {
  export interface CardProp {
    children?: React.ReactNode;
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

  const deletePssword = async(id:string)=> {
  try {
     await axios.delete(`http://172.16.2.12:8000/api/password-delete/${produtId}/${id}`)
     fetchData()
  } catch (error) {
    console.log(error)
  }
  }

  const editpassword = (id:string) => {
    navigation.navigate("passwordgen", { id: produtId, editPasswordId:id });
    
  };

  return (
    <ScrollView>
      <View>  
        <View style={styles.generatePassword}>
        <Button buttonStyle={{padding:10}} onPress={() => fetchData()} icon={<FontAwesomeIcon size={20} name="refresh" color="#900" />}/>
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
            {authData.map((item: Passwords, index: any) => {
              return (
                // @ts-ignore
                <Card key={index} containerStyle={styles.card}>
                <View style={styles.buttonContainer}>
                <View style={styles.CardTitle} >
                  <Text style={styles.name}>Field: {item.fieldPassword}</Text>
                  <Text style={styles.name}>Password: {item.password}</Text>
                </View>
                  <Button
                    type="clear"
                    icon={<FontAwesomeIcon name="remove" size={20} color="#900" />}
                    buttonStyle={styles.removeButton}
                    onPress={() => deletePssword(item._id)}
                  />
                  <Button
                    type="clear"
                    icon={<FontAwesomeIcon name="edit" size={20} color="#900" />}
                    buttonStyle={styles.editButton}
                    onPress={() => editpassword(item._id)}
                  />
                  
                </View>
               
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
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
  },
  generatePasswordButton: {
    padding: 10,
    margin: 10,
  },
  generatePassword: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  removeButton: {
    marginLeft: 37,
  },
  editButton: {
    marginRight: 10,
  },
  CardTitle:{
    // marginTop:-1
  }
});

export default PasswordApper;
