import ListItem from "@/components/list-item";
import TodoInputContainer from "@/components/todo-input-container";
import { Colors } from "@/constants/Colors";
import { data } from "@/data/todos";
import { Todo } from "@/types/Todo";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Appearance,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  const colorScheme = Appearance.getColorScheme();
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));

  const [editScreenVisible, setEditScreenVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme!);

  const separatorComp = () => <View style={styles.separator} />;

  const handleUpdateTodo = (id: number, updates: Partial<Todo>) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo)),
    );
  };

  const handleEditTodo = (todo: Todo) => {
    setEditScreenVisible(true);
    setSelectedTodo(todo);
  };

  const confirmDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setSelectedTodo(null);
    setEditScreenVisible(false);
  };

  return (
    <View style={styles.container}>
      <TodoInputContainer />

      <View style={styles.listSection}>
        <FlatList
          data={todos}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={separatorComp}
          contentContainerStyle={styles.listContainer}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.list}>
              <ListItem
                item={item}
                onUpdateTodo={handleUpdateTodo}
                editScreenVisible={editScreenVisible}
                selectedTodo={selectedTodo}
              />

              <View style={styles.listItemActions}>
                {editScreenVisible && selectedTodo?.id === item.id ? (
                  <Pressable
                    onPress={() => {
                      setEditScreenVisible(false);
                      setSelectedTodo(null);
                    }}
                    style={styles.button}
                  >
                    <Text>Done</Text>
                  </Pressable>
                ) : (
                  <>
                    <Pressable onPress={() => handleEditTodo(item)}>
                      <Ionicons name="pencil" size={20} color="black" />
                    </Pressable>
                    <Pressable onPress={() => confirmDelete(item.id)}>
                      <Ionicons name="trash" size={20} color="red" />
                    </Pressable>
                  </>
                )}
              </View>
            </View>
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
      // flexDirection: "column",
    },
    button: {
      backgroundColor: "#aaa",
      padding: 10,
      borderRadius: 10,
      height: 45,
      justifyContent: "center",
      alignItems: "center",
    },
    listSection: {
      flex: 1,
      backgroundColor: "#eee",
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

    listItemActions: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
    },
  });
}
