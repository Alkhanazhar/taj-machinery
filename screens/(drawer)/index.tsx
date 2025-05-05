import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  TouchableOpacity as RN_TouchableOpacity,
  Pressable,
  Image,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "@/constants/Colors";
import { router } from "expo-router";

// Conditionally import icons based on platform
const isWeb = Platform.OS === "web";
const MaterialIcons = isWeb
  ? require("react-icons/md").MdOutlineCloud // Example; replace with actual icons
  : require("@expo/vector-icons").MaterialIcons;
const FontAwesome = isWeb
  ? require("react-icons/fa").FaGraduationCap // Example
  : require("@expo/vector-icons").FontAwesome;

const { width } = Dimensions.get("window");

// Custom TouchableOpacity for cross-platform compatibility
interface TouchableOpacityProps {
  style?: any;
  onPress?: () => void;
  children: React.ReactNode;
}

const TouchableOpacity = ({
  style,
  onPress,
  children,
}: TouchableOpacityProps) => {
  if (isWeb) {
    return (
      <button
        onClick={onPress}
        style={{
          ...StyleSheet.flatten(style),
          border: "none",
          background: "transparent",
          cursor: "pointer",
        }}
      >
        {children}
      </button>
    );
  }
  return (
    <RN_TouchableOpacity style={style} onPress={onPress}>
      {children}
    </RN_TouchableOpacity>
  );
};

// Define interfaces (same as before)
interface EmergencyCategory {
  title: string;
  icon: string;
  color: string;
  active: boolean;
}

interface NotificationItem {
  title: string;
  time: string;
  risk: "Urgent" | "Medium" | "Low Risk";
}

interface NewsItem {
  title: string;
  source: string;
  time: string;
  risk: "Urgent" | "Low Risk";
}

interface TaskItem {
  id: string;
  taskName: string;
  status: "Urgent" | "Low Risk";
}

// Updated icon map with web and app support
const iconMap: { [key: string]: string } = {
  cloud: isWeb ? "MdOutlineCloud" : "cloud",
  "medical-services": isWeb ? "MdMedicalServices" : "medical-services",
  home: isWeb ? "MdHome" : "home",
  landscape: isWeb ? "MdLandscape" : "landscape",
  security: isWeb ? "MdSecurity" : "security",
  gavel: isWeb ? "MdGavel" : "gavel",
  "location-on": isWeb ? "MdLocationOn" : "location-on",
  check: isWeb ? "MdCheck" : "check",
  "arrow-forward": isWeb ? "MdArrowForward" : "arrow-forward",
  warning: isWeb ? "MdWarning" : "warning",
  "graduation-cap": isWeb ? "FaGraduationCap" : "graduation-cap",
};

export default function index() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const [emergencyData, setemergencyData] = useState([]);
  const [tokenStore, setTokenStore] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const emergencyCategories: EmergencyCategory[] = [
    {
      title: "Weather-related events",
      icon: "cloud",
      color: "#4CAF50",
      active: true,
    },
    {
      title: "Health emergencies",
      icon: "medical-services",
      color: "#9E9E9E",
      active: false,
    },
    { title: "Household risks", icon: "home", color: "#F44336", active: false },
    {
      title: "Natural disasters",
      icon: "landscape",
      color: "#9E9E9E",
      active: false,
    },
    {
      title: "Cybersecurity risks",
      icon: "security",
      color: "#F44336",
      active: false,
    },
    {
      title: "Crime-related issues",
      icon: "gavel",
      color: "#9E9E9E",
      active: false,
    },
    {
      title: "Regional or community-specific risks",
      icon: "location-on",
      color: "#4CAF50",
      active: true,
    },
  ];
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setTokenStore(token);
      console.log("OTKEN>>>>>", token);

      // if (!token) {
      //   navigation.navigate("Auth/Login");
      // }
      setLoading(true);
      axios
        .get(`${BASE_URL}/emergency-categories`, {
          params: {
            "x-auth-token": token,
          },
        })
        .then((res) => {
          setLoading(false);

          const mergedData = res?.data?.map((apiItem: any) => {
            const localItem = emergencyCategories.find(
              (local) => local.title === apiItem.name
            );
            return {
              ...apiItem,
              icon: localItem?.icon || "help", // Default icon if not found
              color: localItem?.color || "#000000", // Default color if not found
              active: localItem?.active ?? apiItem.active, // Preserve API active status if not found in local
            };
          });
          setemergencyData(mergedData);
          console.log("====================================");
          console.log("CATARGORIES>>>>", mergedData);
          console.log("====================================");
        })
        .catch((error) => {
          console.log("====================================");
          console.log("ERROR>>>", error.response);
          console.log("====================================");
        });
    };

    checkToken();
  }, []);

  const notifications: NotificationItem[] = [
    { title: "Flood Alert in Your Area", time: "3 min ago", risk: "Urgent" },
    { title: "Earthquake Prediction", time: "6 min ago", risk: "Medium" },
    { title: "Power Outage", time: "10 min ago", risk: "Low Risk" },
  ];

  const news: NewsItem[] = [
    {
      title: "Storm Warning Issued for North Holland",
      source: "KNMI",
      time: "6 min ago",
      risk: "Urgent",
    },
    {
      title: "Chemical Soil Forces Evacuation",
      source: "RIVM",
      time: "6 min ago",
      risk: "Low Risk",
    },
    {
      title: "Wildfire Evacuation Orders",
      source: "RIVM",
      time: "8 min ago",
      risk: "Low Risk",
    },
  ];

  const tasks: TaskItem[] = [
    { id: "29383212", taskName: "Earthquake", status: "Urgent" },
    { id: "342984284", taskName: "Volcano", status: "Low Risk" },
    { id: "29383212", taskName: "Power Outage", status: "Urgent" },
    { id: "342984284", taskName: "Typhoon", status: "Urgent" },
    { id: "342984284", taskName: "Landslide", status: "Urgent" },
    { id: "29383212", taskName: "Wildfires", status: "Low Risk" },
    { id: "342984284", taskName: "Snowstorm", status: "Urgent" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Feather name="menu" size={24} color="#000" />
        </Pressable>
        <Image
          source={require("../../assets/images/Logo.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Pressable>
          <Feather name="search" size={24} color="#000" />
        </Pressable>
      </View>
      <ScrollView style={styles.container}>
        {/* API Integrations Section */}
        <View style={styles.apiSection}>
          <Text style={styles.sectionTitle}>API Integrations</Text>
          <Text style={styles.apiDescription}>
            Explore a variety of powerful API integrations to boost your
            system's capabilities and enhance workflows.
          </Text>
          <TouchableOpacity
            style={styles.apiButton}
            onPress={async () => {
              await AsyncStorage.removeItem("token"),
                console.log("API Integration pressed");
            }}
          >
            <Text style={styles.apiButtonText}>
              Click here for API Integration
            </Text>
          </TouchableOpacity>
        </View>

        {/* Emergency Categories */}
        {emergencyData?.length > 0 && (
          <View style={styles.categoriesSection}>
            <Text style={styles.sectionTitle}>Emergency categories</Text>
            {emergencyData.map((category: any, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryItem,
                  { borderLeftColor: category.color },
                ]}
                onPress={() => {
                  router.push({
                    pathname: "/SelfAssestment/Questions",
                    params: { data: JSON.stringify(category) }, // Convert object to string if needed
                  });
                }}
              >
                <MaterialIcons
                  name={iconMap[category.icon] || "help-outline"}
                  size={24}
                  color={category.color}
                />
                <Text style={styles.categoryText}>{category.name}</Text>
                {category.active && (
                  <MaterialIcons
                    name={iconMap["check"]}
                    size={24}
                    color={category.color}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* User Preparedness Score */}
        <View style={styles.scoreSection}>
          <Text style={styles.sectionTitle}>User Preparedness Score</Text>
          <View style={styles.scoreContainer}>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreText}>80%</Text>
              <Text style={styles.scoreLabel}>Good</Text>
            </View>
          </View>
        </View>

        {/* Emergency Shortcuts */}
        <View style={styles.shortcutsSection}>
          <Text style={styles.sectionTitle}>Emergency Shortcuts</Text>
          <View style={styles.shortcutsContainer}>
            <TouchableOpacity
              style={[styles.shortcutButton, { backgroundColor: "#FF4444" }]}
              onPress={() => console.log("Self-Assessment pressed")}
            >
              <Text style={styles.shortcutText}>Self-Assessment</Text>
              <MaterialIcons name="arrow-forward" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.shortcutButton, { backgroundColor: "#FF0000" }]}
              onPress={() => console.log("Risk Map pressed")}
            >
              <Text style={styles.shortcutText}>Risk Map</Text>
              <MaterialIcons name="arrow-forward" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.shortcutButton, { backgroundColor: "#CC0000" }]}
              onPress={() => console.log("Task Management pressed")}
            >
              <Text style={styles.shortcutText}>Task Management</Text>
              <MaterialIcons name="arrow-forward" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.notificationsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            <TouchableOpacity
              style={{}}
              onPress={() => console.log("View all notifications")}
            >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {notifications.map((notification, index) => (
            <View key={index} style={styles.notificationItem}>
              <View style={styles.notificationIcon}>
                <MaterialIcons
                  name={iconMap["warning"]}
                  size={24}
                  color="#FF4444"
                />
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>
                  {notification.title}
                </Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
              <Text
                style={[
                  styles.riskLabel,
                  {
                    color:
                      notification.risk === "Urgent"
                        ? "#FF4444"
                        : notification.risk === "Medium"
                        ? "#FFA500"
                        : "#4CAF50",
                  },
                ]}
              >
                • {notification.risk}
              </Text>
            </View>
          ))}
        </View>

        {/* News Highlight */}
        <View style={styles.newsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>News Highlight</Text>
            <TouchableOpacity
              style={{}}
              onPress={() => navigation.navigate("Resources/index")}
            >
              <Text style={styles.readMoreText}>Read More</Text>
            </TouchableOpacity>
          </View>
          {news.map((item, index) => (
            <View key={index} style={styles.newsItem}>
              <View style={styles.newsContent}>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsSource}>Source: {item.source}</Text>
              </View>
              <View style={styles.newsMetadata}>
                <Text style={styles.newsTime}>{item.time}</Text>
                <Text
                  style={[
                    styles.riskLabel,
                    { color: item.risk === "Urgent" ? "#FF4444" : "#4CAF50" },
                  ]}
                >
                  • {item.risk}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Study MSc Banner */}
        <View style={styles.bannerSection}>
          <View style={styles.banner}>
            <View style={styles.bannerContent}>
              <FontAwesome
                name={iconMap["graduation-cap"]}
                size={24}
                color="white"
              />
              <Text style={styles.bannerTitle}>Study MSc Cyber Security</Text>
              <Text style={styles.bannerSubtitle}>Starting in April</Text>
            </View>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => console.log("Apply now pressed")}
            >
              <Text style={styles.applyButtonText}>Apply Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pending Tasks */}
        <View style={styles.tasksSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pending Tasks</Text>
            <TouchableOpacity
              style={styles.addTaskButton}
              onPress={() => console.log("Add new task pressed")}
            >
              <Text style={styles.addTaskText}>Add New Task</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.taskTable}>
            <View style={styles.taskHeader}>
              <Text style={styles.taskHeaderText}>Task ID#</Text>
              <Text style={styles.taskHeaderText}>Task Name</Text>
              <Text style={styles.taskHeaderText}>Status</Text>
              <Text style={styles.taskHeaderText}>Action</Text>
            </View>
            {tasks.map((task, index) => (
              <View key={index} style={styles.taskRow}>
                <Text style={styles.taskCell}>{task.id}</Text>
                <Text style={styles.taskCell}>{task.taskName}</Text>
                <Text
                  style={[
                    styles.taskCell,
                    {
                      color: task.status === "Urgent" ? "#FF4444" : "#4CAF50",
                    },
                  ]}
                >
                  • {task.status}
                </Text>
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => console.log(`View task ${task.id}`)}
                >
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  logoImage: {
    width: 100,
    height: 50,
  },
  apiSection: {
    padding: 16,
    backgroundColor: "white",
    margin: 16,
    borderRadius: 8,
    ...(isWeb ? { boxShadow: "0 2px 4px rgba(0,0,0,0.1)" } : { elevation: 2 }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  apiDescription: {
    color: "#666",
    marginBottom: 16,
  },
  apiButton: {
    backgroundColor: "#003366",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  apiButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  categoriesSection: {
    padding: 16,
    backgroundColor: "white",
    margin: 16,
    borderRadius: 8,
    ...(isWeb ? { boxShadow: "0 2px 4px rgba(0,0,0,0.1)" } : { elevation: 2 }),
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderLeftWidth: 4,
    marginVertical: 4,
    backgroundColor: "#f8f8f8",
  },
  categoryText: {
    flex: 1,
    marginLeft: 12,
  },
  scoreSection: {
    padding: 16,
    backgroundColor: "white",
    margin: 16,
    borderRadius: 8,
    ...(isWeb ? { boxShadow: "0 2px 4px rgba(0,0,0,0.1)" } : { elevation: 2 }),
  },
  scoreContainer: {
    alignItems: "center",
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  scoreLabel: {
    color: "#4CAF50",
  },
  shortcutsSection: {
    padding: 16,
    backgroundColor: "white",
    margin: 16,
    borderRadius: 8,
    ...(isWeb ? { boxShadow: "0 2px 4px rgba(0,0,0,0.1)" } : { elevation: 2 }),
  },
  shortcutsContainer: {
    gap: 8,
  },
  shortcutButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 6,
  },
  shortcutText: {
    color: "white",
    fontWeight: "bold",
  },
  notificationsSection: {
    padding: 16,
    backgroundColor: "white",
    margin: 16,
    borderRadius: 8,
    ...(isWeb ? { boxShadow: "0 2px 4px rgba(0,0,0,0.1)" } : { elevation: 2 }),
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  viewAllText: {
    color: "#003366",
    fontWeight: "bold",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  notificationIcon: {
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontWeight: "500",
  },
  notificationTime: {
    color: "#666",
    fontSize: 12,
  },
  riskLabel: {
    fontWeight: "500",
  },
  newsSection: {
    padding: 16,
    backgroundColor: "white",
    margin: 16,
    borderRadius: 8,
    ...(isWeb ? { boxShadow: "0 2px 4px rgba(0,0,0,0.1)" } : { elevation: 2 }),
  },
  readMoreText: {
    color: "#003366",
    fontWeight: "bold",
  },
  newsItem: {
    marginBottom: 16,
  },
  newsContent: {
    marginBottom: 4,
  },
  newsTitle: {
    fontWeight: "500",
  },
  newsSource: {
    color: "#666",
    fontSize: 12,
  },
  newsMetadata: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  newsTime: {
    color: "#666",
    fontSize: 12,
  },
  bannerSection: {
    margin: 16,
  },
  banner: {
    backgroundColor: "#003366",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 8,
  },
  bannerSubtitle: {
    color: "white",
    opacity: 0.8,
  },
  applyButton: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 6,
  },
  applyButtonText: {
    color: "#003366",
    fontWeight: "bold",
  },
  tasksSection: {
    padding: 16,
    backgroundColor: "white",
    margin: 16,
    borderRadius: 8,
    ...(isWeb ? { boxShadow: "0 2px 4px rgba(0,0,0,0.1)" } : { elevation: 2 }),
  },
  addTaskButton: {
    backgroundColor: "#003366",
    padding: 8,
    borderRadius: 6,
  },
  addTaskText: {
    color: "white",
    fontWeight: "bold",
  },
  taskTable: {
    marginTop: 16,
  },
  taskHeader: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 6,
  },
  taskHeaderText: {
    flex: 1,
    fontWeight: "bold",
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  taskCell: {
    flex: 1,
  },
  viewButton: {
    backgroundColor: "#f0f0f0",
    padding: 6,
    borderRadius: 4,
  },
  viewButtonText: {
    color: "#666",
    fontSize: 12,
  },
});
