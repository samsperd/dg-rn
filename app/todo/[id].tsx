import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const EditTodo = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>EditTodo {id}</Text>
    </View>
  );
};

export default EditTodo;

const styles = StyleSheet.create({});
