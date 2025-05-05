import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenTemplateProps {
  title: string;
  children?: React.ReactNode;
  headerRight?: () => React.ReactNode;
}

export default function ScreenTemplate({ title, children, headerRight }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        {headerRight && headerRight()}
      </View>
      <View style={styles.content}>
        {children || (
          <Text style={styles.defaultText}>Content coming soon...</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a2e",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  defaultText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
  },
});
