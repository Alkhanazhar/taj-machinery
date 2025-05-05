import React from "react";
import { View, Text, ActivityIndicator, Modal, StyleSheet } from "react-native";

interface LoaderProps {
  visible: boolean;
  text?: string;
}

const Loader = ({ visible, text }) => {
  if (visible) {
    return (
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator color={"#003366"} size={"large"} />
      </View>
    );
  }
};

export default Loader;
