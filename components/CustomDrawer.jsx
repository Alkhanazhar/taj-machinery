import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

export default function CustomDrawer(props) {
  const router = useRouter();
  const currentPath = usePathname();
  const [selectedMode, setSelectedMode] = React.useState("household");

  const isSelected = (path, mode) => {
    if (mode) {
      return selectedMode === mode;
    }
    return currentPath === path || (path === "/" && currentPath === "/index");
  };

  const MenuItem = ({ icon, title, path, mode }) => {
    if (mode == "household" || mode == "business") {
      return (
        <Pressable
          style={[
            styles.menuItem,
            isSelected(path, mode) && styles.selectedHouseholdItem,
          ]}
          onPress={() => {
            if (mode) {
              setSelectedMode(mode);
            }
            router.push(path);
          }}
        >
          <Feather
            name={icon}
            size={24}
            color={isSelected(path, mode) ? "#1C1C2E" : "#fff"}
          />
          <Text
            style={[
              styles.menuItemText,
              isSelected(path, mode) && styles.selectedHouseholdItemText,
            ]}
          >
            {title}
          </Text>
        </Pressable>
      );
    } else {
      return (
        <Pressable
          style={[
            styles.menuItem,
            isSelected(path, mode) && styles.selectedItem,
          ]}
          onPress={() => {
            if (mode) {
              setSelectedMode(mode);
            }
            router.push(path);
          }}
        >
          <Feather name={icon} size={24} color={"#fff"} />
          <Text
            style={[
              styles.menuItemText,
              isSelected(path, mode) && styles.selectedItemText,
            ]}
          >
            {title}
          </Text>
        </Pressable>
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/Logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Operations Section */}
        <Text style={styles.sectionTitle}>OPERATIONS</Text>

        <View style={styles.menuSection}>
          <MenuItem icon="home" title="Dashboard" path="/(drawer)" />
          <MenuItem
            icon="clipboard"
            title="Self Assessment"
            path="/SelfAssestment"
          />
          <MenuItem icon="map" title="Risk Map" path="/RiskMap" />
          <MenuItem icon="file-text" title="News Feed" path="/NewsFeed" />
          <MenuItem
            icon="list"
            title="Task Management"
            path="/TaskManagement"
          />
          <MenuItem icon="book-open" title="E-Learning" path="/E-learning" />
          <MenuItem icon="book" title="Resources" path="/Resources" />
          <MenuItem icon="users" title="Contacts" path="/Contacts" />
          <MenuItem icon="zap" title="Emergency AI" path="/EmergencyAI" />
        </View>
      </ScrollView>

      {/* Bottom Fixed Section */}
      <View style={styles.bottomSection}>
        <MenuItem icon="home" title="Household" path="/" mode="household" />
        <MenuItem icon="briefcase" title="Business" path="/" mode="business" />

        <View style={styles.divider} />

        <MenuItem icon="settings" title="Settings" path="/Settings" />
        <MenuItem icon="log-out" title="Logout" path="/Logout" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C2E",
  },
  logoContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  logo: {
    width: 120,
    height: 40,
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    opacity: 0.7,
  },
  menuSection: {
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 4,
    borderRadius: 8,
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  bottomSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  selectedItem: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  selectedHouseholdItem: {
    backgroundColor: "#fff",
  },
  selectedItemText: {
    color: "#fff",
  },
  selectedHouseholdItemText: {
    color: "#000",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginVertical: 8,
  },
});
