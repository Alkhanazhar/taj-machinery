import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const AuthButtons = () => {
  const route = useRoute();
  const routeName = route.name;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          routeName === "Auth/Signup"
            ? styles.activeButton
            : styles.inactiveButton,
        ]}
        onPress={() => {
          // Navigation logic here
        }}
      >
        <Text
          style={[
            styles.buttonText,
            routeName === "Auth/Signup"
              ? styles.activeText
              : styles.inactiveText,
          ]}
          onPress={() => {
            // Navigation logic here
            navigation.navigate("Auth/Signup");
          }}
        >
          Register
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          routeName === "Auth/Login"
            ? styles.activeButton
            : styles.inactiveButton,
        ]}
        onPress={() => {
          // Navigation logic here
          navigation.navigate("Auth/Login");
        }}
      >
        <Text
          style={[
            styles.buttonText,
            routeName === "Auth/Login"
              ? styles.activeText
              : styles.inactiveText,
          ]}
        >
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    borderColor: "#E9EAEB",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    height: 36,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    flex: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 36,
  },
  activeButton: {
    borderWidth: 1,
    borderColor: "#003366",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  inactiveButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "transparent",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  activeText: {
    color: "#003366",
  },
  inactiveText: {
    color: "#757575",
  },
});

export default AuthButtons;
