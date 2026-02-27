import { Colors } from "@/constants/Colors";
import { data as todos } from "@/data/todos";
import React, { useState } from "react";
import {
  Appearance,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const TodoInputContainer = () => {
  const [newTodo, setNewTodo] = useState("");
  const colorScheme = Appearance.getColorScheme();

  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme!);

  const handleNewTodo = (text: string) => {
    if (text.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;

      //   setTodos([
      //     ...todos,
      //     {
      //       id: newId,
      //       title: text,
      //       completed: false,
      //       timestamp: new Date().toISOString(),
      //     },
      //   ]);

      setNewTodo("");
    }
  };
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        onChangeText={setNewTodo}
        value={newTodo}
        placeholder="Enter title"
        keyboardType="default"
        placeholderTextColor={theme.text}
      />

      <Pressable style={styles.button} onPress={() => handleNewTodo(newTodo)}>
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
    </View>
  );
};

export default TodoInputContainer;

function createStyles(
  theme: typeof Colors.light | typeof Colors.dark,
  colorScheme: string,
) {
  return StyleSheet.create({
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
  });
}
