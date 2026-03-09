import List from "@/components/list";
import TodoInputContainer from "@/components/todo-input-container";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/ThemeContext";
import { data } from "@/data/todos";
import { Todo } from "@/types/Todo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";

export default function Index() {
  const { colorScheme, theme } = useContext(ThemeContext);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("TodoApp");

        const storageTodos: Todo[] =
          jsonValue !== null ? JSON.parse(jsonValue) : null;

        if (storageTodos && storageTodos?.length) {
          setTodos(storageTodos.sort((a, b) => b.id - a.id));
        } else {
          setTodos(data.sort((a, b) => b.id - a.id));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [data]);

  useEffect(() => {
    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(todos);

        await AsyncStorage.setItem("TodoApp", jsonValue);
      } catch (error) {
        console.error(error);
      }
    };

    storeData();
  }, [todos]);

  const styles = createStyles(theme, colorScheme!);

  const separatorComp = () => <View style={styles.separator} />;

  const addNewTodo = (title: string) => {
    const newId = todos.length > 0 ? todos[0].id + 1 : 1;
    setTodos([
      {
        id: newId,
        title,
        completed: false,
        timestamp: new Date().toISOString(),
      },
      ...todos,
    ]);
  };

  return (
    <View style={styles.container}>
      <TodoInputContainer onAddTodo={addNewTodo} />

      <View style={styles.listSection}>
        <Animated.FlatList
          data={todos}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={separatorComp}
          contentContainerStyle={styles.listContainer}
          keyExtractor={(item) => item.id.toString()}
          itemLayoutAnimation={LinearTransition}
          keyboardDismissMode={"on-drag"}
          renderItem={({ item }) => (
            <List item={item} todos={todos} setTodos={setTodos} />
          )}
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
      backgroundColor: theme.background,
    },

    listSection: {
      flex: 1,
    },

    listContainer: {
      paddingVertical: 15,
      width: "100%",
    },

    separator: {
      height: 1,
      backgroundColor: colorScheme === "dark" ? "#ccc" : "#000",
      width: "90%",
      // maxWidth: 300,
      marginHorizontal: "auto",
      marginVertical: 10,
    },
  });
}
