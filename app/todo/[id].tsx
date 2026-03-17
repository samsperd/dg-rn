import { ThemeContext } from "@/context/ThemeContext";
import { Todo } from "@/types/Todo";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EditTodo = () => {
  const { id } = useLocalSearchParams();
  const { colorScheme, theme } = useContext(ThemeContext);
  const [todo, setTodo] = useState<Partial<Todo>>();
  const router = useRouter();
  const [loaded, error] = useFonts({
    Inter_500Medium,
  });

  useEffect(() => {
    const fetchData = async (id: string) => {
      const todoId = parseInt(id);
      try {
        const jsonValue = await AsyncStorage.getItem(`TodoApp`);

        const storageTodos = jsonValue !== null ? JSON.parse(jsonValue) : null;

        if (storageTodos && storageTodos.length) {
          const myTodo = storageTodos.find((todo: Todo) => todo.id === todoId);
          setTodo(myTodo);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData(id as string);
  }, []);

  if (!loaded && !error) {
    return null;
  }

  const handleSave = async () => {
    const todoId = parseInt(id as string);
    if (!todo?.title?.trim()) return;

    try {
      const savedTodo = { ...todo, title: todo?.title?.trim() };

      const jsonValue = await AsyncStorage.getItem(`TodoApp`);
      const storageTodos = jsonValue !== null ? JSON.parse(jsonValue) : [];

      let allTodos;
      if (storageTodos.length) {
        const otherTodos = storageTodos.filter(
          (todo: Todo) => todo.id !== todoId,
        );
        allTodos = [...otherTodos, savedTodo];
      } else {
        allTodos = [savedTodo];
      }

      await AsyncStorage.setItem("TodoApp", JSON.stringify(allTodos));
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              color: theme.text,
              borderColor: theme.icon,
              backgroundColor: colorScheme === "dark" ? "#222" : "#f0f0f0",
            },
          ]}
          placeholder="Edit Todo"
          placeholderTextColor={theme.icon}
          value={todo?.title ?? ""}
          onChangeText={(text) => setTodo((prev) => ({ ...prev, title: text }))}
        />
      </View>

      <View style={styles.statusContainer}>
        <Text style={[styles.statusLabel, { color: theme.text }]}>
          Completed
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: theme.tint }}
          thumbColor={todo?.completed ? "green" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(value) =>
            setTodo((prev) => ({ ...prev, completed: value }))
          }
          value={todo?.completed ?? false}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.saveButton, { backgroundColor: theme.tint }]}
          onPress={handleSave}
        >
          <Text
            style={[
              styles.saveButtonText,
              { color: colorScheme === "dark" ? "black" : "white" },
            ]}
          >
            Save
          </Text>
        </Pressable>
        <Pressable
          style={[styles.cancelButton, { borderColor: "red" }]}
          onPress={() => router.back()}
        >
          <Text style={[styles.cancelButtonText, { color: "red" }]}>
            Cancel
          </Text>
        </Pressable>
      </View>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  );
};

export default EditTodo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    fontFamily: "Inter_500Medium",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    paddingHorizontal: 5,
  },
  statusLabel: {
    fontSize: 18,
    fontFamily: "Inter_500Medium",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  saveButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter_500Medium",
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter_500Medium",
  },
});
