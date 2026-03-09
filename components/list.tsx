import { ThemeContext } from "@/context/ThemeContext";
import { Todo } from "@/types/Todo";
import { Ionicons } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ListItem from "./list-item";

interface ListTodos {
  item: Todo;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

const List = ({ todos, setTodos, item }: ListTodos) => {
  const { theme } = useContext(ThemeContext);
  const [editScreenVisible, setEditScreenVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleUpdateTodo = (id: number, updates: Partial<Todo>) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo)),
    );
  };

  const handleEditingTodoChange = (updates: Partial<Todo>) => {
    if (!editingTodo) return;
    setEditingTodo({ ...editingTodo, ...updates });
  };

  const handleEditTodo = (todo: Todo) => {
    setEditScreenVisible(true);
    setSelectedTodo(todo);
    setEditingTodo(todo);
  };

  const confirmDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setSelectedTodo(null);
    setEditScreenVisible(false);
  };
  return (
    <View style={styles.list}>
      <ListItem
        item={item}
        onUpdateTodo={handleEditingTodoChange}
        editScreenVisible={editScreenVisible}
        selectedTodo={editingTodo}
      />

      <View style={styles.listItemActions}>
        {editScreenVisible && selectedTodo?.id === item.id ? (
          <Pressable
            onPress={() => {
              if (selectedTodo && editingTodo) {
                handleUpdateTodo(selectedTodo.id, editingTodo);
              }
              setEditScreenVisible(false);
              setSelectedTodo(null);
              setEditingTodo(null);
            }}
            style={styles.button}
          >
            <Text>Done</Text>
          </Pressable>
        ) : (
          <>
            <Pressable onPress={() => handleEditTodo(item)}>
              <Ionicons name="pencil" size={20} color={theme.text} />
            </Pressable>
            <Pressable onPress={() => confirmDelete(item.id)}>
              <Ionicons name="trash" size={20} color="red" />
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#aaa",
    padding: 10,
    borderRadius: 10,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  listItemActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
});
