import { Todo } from "@/types/Todo";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Switch, Text, TextInput, View } from "react-native";

interface ListItemProps {
  item: Todo;
  onUpdateTodo: (id: number, updates: Partial<Todo>) => void;
  editScreenVisible: boolean;
  selectedTodo: Todo | null;
}

const ListItem = ({
  item,
  onUpdateTodo,
  editScreenVisible,
  selectedTodo,
}: ListItemProps) => {
  const handleTitleChange = (title: string) => {
    onUpdateTodo(item.id, { title });
  };

  const handleCompletedChange = (completed: boolean) => {
    onUpdateTodo(item.id, { completed });
  };

  const isEditing = editScreenVisible && selectedTodo?.id === item.id;

  return isEditing ? (
    <View style={styles.listItem}>
      <View style={styles.listItemIcon}>
        <Switch
          trackColor={{ false: "#767577", true: "black" }}
          thumbColor={item.completed ? "green" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleCompletedChange}
          value={item.completed}
        />
      </View>

      <View style={styles.listItemTexts}>
        <TextInput
          value={item.title}
          style={[styles.listItemText, styles.listItemInput]}
          onChangeText={handleTitleChange}
          placeholder="Enter title"
        />
      </View>
    </View>
  ) : (
    <View style={styles.listItem}>
      <View style={styles.listItemIcon}>
        {item.completed ? (
          <Ionicons name="checkmark-circle" size={20} color="green" />
        ) : (
          <Ionicons name="radio-button-off" size={20} color="#bbb" />
        )}
      </View>

      <View style={styles.listItemTexts}>
        <Text style={styles.listItemText}>{item.title}</Text>
        <Text style={styles.listItemSmallText}>{item.timestamp}</Text>
      </View>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    gap: 8,
  },
  listItemTexts: {
    gap: 2,
  },
  listItemIcon: {
    borderRadius: "100%",
    padding: 5,
  },
  listItemText: {
    fontSize: 16,
  },
  listItemSmallText: {
    fontSize: 12,
  },
  listItemInput: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});
