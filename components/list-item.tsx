import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/ThemeContext";
import { Todo } from "@/types/Todo";
import { Inter_500Medium_Italic, useFonts } from "@expo-google-fonts/inter";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

dayjs.extend(relativeTime);

interface ListItemProps {
  item: Todo;
  onUpdateTodo: (updates: Partial<Todo>) => void;
  selectedTodo: Todo | null;
}

const ListItem = ({ item, onUpdateTodo, selectedTodo }: ListItemProps) => {
  const { colorScheme, theme } = useContext(ThemeContext);
  const router = useRouter();
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

  const handleTodoRouting = () => {
    router.push(`/todo/${item.id}`);
  };

  if (!loaded && !error) {
    return null;
  }

  return (
    <Pressable
      onPress={() => handleTodoRouting()}
      onLongPress={() => handleCompletedChange(!item.completed)}
      style={styles.listItem}
    >
      <View style={styles.listItemIcon}>
        {item.completed ? (
          <Ionicons name="checkmark-circle" size={20} color="green" />
        ) : (
          <Ionicons name="radio-button-off" size={20} color="#bbb" />
        )}
      </View>

      <View style={styles.listItemTexts}>
        <Text style={styles.listItemText}>{item.title}</Text>
        <Text style={styles.listItemSmallText}>
          {dayjs(item.timestamp).fromNow()}
        </Text>
      </View>
    </Pressable>
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
