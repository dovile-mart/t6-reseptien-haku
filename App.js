import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert, Image, } from "react-native";

export default function App() {
  const [keyword, setKeyword] = useState(""); //hakusana

  const [meals, setMeals] = useState([]); //meals-taulukko

  const getMeals = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then((response) => response.json())
      .then((data) => setMeals(data.meals)) //console.log(data.meals[0]))
      .catch((error) => {
        Alert.alert(JSON.stringify(responseJson)); //Alert('Error', error));
      });
  };

  const ItemSeparator = () => (
    <View
      style={{
        height: 2,
        width: "80%",
        backgroundColor: "lightgrey",
      }}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList
        keyExtractor={(item) => item.id}
        data={meals}
        renderItem={({ item }) => (
          <View>
            <Text>{item.strMeal}</Text>
            <Image style={{ width: 50, height: 50 }} source={{ uri: item.strMealThumb }} />
          </View>
        )}
        ItemSeparatorComponent={ItemSeparator}
      />
      <View style={styles.text}>
        <TextInput style={{ fontSize: 18, width: 200 }}
          placeholder="keyword"
          onChangeText={(text) => setKeyword(text)}
          value={keyword}
        />
        <Button title="Find" onPress={getMeals} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  text: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
});
