import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDrawerNavigation } from "../screens/utils/navigation";

interface HeaderProps {
  title: string;
  showMenuButton?: boolean;
}

const Header = ({ title, showMenuButton = true }: HeaderProps) => {
  const { openDrawer } = useDrawerNavigation();

  return (
    <View style={styles.header}>
      {showMenuButton && (
        <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
          <Ionicons name="menu" size={24} color="#ffffff" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightPlaceholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1C1C2E",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuButton: {
    width: 40,
  },
  title: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  rightPlaceholder: {
    width: 40,
  },
});

export default Header;
