import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/ThemeContext";
import { Todo } from "@/types/Todo";
import { Inter_500Medium_Italic, useFonts } from "@expo-google-fonts/inter";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { StyleSheet, Switch, Text, TextInput, View } from "react-native";

interface ListItemProps {
  item: Todo;
  onUpdateTodo: (updates: Partial<Todo>) => void;
  editScreenVisible: boolean;
  selectedTodo: Todo | null;
}

const ListItem = ({
  item,
  onUpdateTodo,
  editScreenVisible,
  selectedTodo,
}: ListItemProps) => {
  const { colorScheme, theme } = useContext(ThemeContext);
  const styles = createStyles(theme, colorScheme!);

  const [loaded, error] = useFonts({
    Inter_500Medium_Italic,
  });

  const handleTitleChange = (title: string) => {
    onUpdateTodo({ title });
  };

  const handleCompletedChange = (completed: boolean) => {
    onUpdateTodo({ completed });
  };

  if (!loaded && !error) {
    return null;
  }

  const isEditing = editScreenVisible && selectedTodo?.id === item.id;

  return isEditing ? (
    <View style={styles.listItem}>
      <View style={styles.listItemIcon}>
        <Switch
          trackColor={{ false: "#767577", true: "black" }}
          thumbColor={selectedTodo?.completed ? "green" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleCompletedChange}
          value={selectedTodo?.completed}
        />
      </View>

      <View style={styles.listItemTexts}>
        <TextInput
          value={selectedTodo?.title}
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

function createStyles(
  theme: typeof Colors.light | typeof Colors.dark,
  colorScheme: string,
) {
  return StyleSheet.create({
    listItem: {
      flexDirection: "row",
      gap: 8,
    },
    listItemTexts: {
      gap: 2,
      color: theme.text,
      fontSize: 16,
    },
    listItemIcon: {
      borderRadius: "100%",
      padding: 5,
    },
    listItemText: {
      fontSize: 16,
      color: theme.text,
      fontFamily: "Inter_500Medium_Italic",
    },
    listItemSmallText: {
      fontSize: 12,
      color: theme.text,
    },
    listItemInput: {
      flex: 1,
      borderColor: "#ccc",
      borderWidth: 1,
      padding: 10,
    },
  });
}
