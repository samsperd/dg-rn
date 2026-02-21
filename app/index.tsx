import { Colors } from "@/constants/Colors";
import { data } from "@/data/todos";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Appearance,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Index() {
  const colorScheme = Appearance.getColorScheme();
  const [newTodo, setNewTodo] = useState({
    title: "",
    time: "",
  });

  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme!);

  const separatorComp = () => <View style={styles.separator} />;

  const handleNewTodo = (text: string) => {
    setNewTodo({ ...newTodo, title: text });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleNewTodo}
          value={newTodo.title}
          placeholder="Enter title"
          keyboardType="default"
          placeholderTextColor={theme.text}
        />

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>

      <View style={styles.listSection}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.list}>
              <View style={styles.listItem}>
                <Text style={styles.listItemText}>{item.title}</Text>
                <Text style={styles.listItemSmallText}>{item.timestamp}</Text>
              </View>
              <View style={styles.listItemActions}>
                <Pressable>
                  <Ionicons name="pencil" size={20} color="black" />
                </Pressable>
                <Pressable>
                  <Ionicons name="trash" size={20} color="red" />
                </Pressable>
              </View>
            </View>
          )}
          ItemSeparatorComponent={separatorComp}
          contentContainerStyle={styles.listContainer}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

function createStyles(
  theme: typeof Colors.light | typeof Colors.dark,
  colorScheme: string,
) {
  return StyleSheet.create({
    container: {
      flex: 1,
      // flexDirection: "column",
    },
    inputContainer: {
      flexDirection: "row",
      width: "100%",
      padding: 10,
      gap: 10,
    },
    input: {
      borderColor: "#dddddd",
      borderWidth: 1,
      padding: 10,
      color: "black",
      width: "75%",
      backgroundColor: colorScheme === "dark" ? "#dddddd" : "#000",
    },
    button: {
      backgroundColor: "#000",
      padding: 10,
      borderRadius: 10,
      height: 45,
      width: "20%",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontSize: 16,
    },

    listSection: {
      flex: 1,
      backgroundColor: "#ddd",
    },

    listContainer: {
      paddingVertical: 15,
      // flexDirection: "row",
      width: "100%",
    },
    list: {
      padding: 10,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    separator: {
      height: 1,
      backgroundColor: colorScheme === "dark" ? "#ccc" : "#000",
      width: "90%",
      // maxWidth: 300,
      marginHorizontal: "auto",
      marginVertical: 10,
    },
    listItem: {
      gap: 2,
    },
    listItemText: {
      fontSize: 16,
    },
    listItemSmallText: {
      fontSize: 12,
    },
    listItemActions: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
    },
  });
}
