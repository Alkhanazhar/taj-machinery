import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Animated,
  ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/constants/Colors";
import AuthButtons from "../../components/ToggleButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isChecked, setChecked] = useState(false);

  const position = new Animated.Value(isLogin ? 1 : 0);

  const toggleSwitch = () => {
    // Animated.timing(position, {
    //   toValue: isLogin ? 0 : 1,
    //   duration: 300,
    //   useNativeDriver: false,
    // }).start();
    // setIsLogin(!isLogin);
    navigation.navigate("Auth/Signup" as never);
  };

  const [loading, setLoading] = useState<boolean>(false);
  const resetData = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      // Implement your login logic here
      console.log("Login attempt with:", email, password);
      const response = {
        email: email,
        password: password,
      };

      // await axios
      //   .post(`${BASE_URL}/auth/login`, response, {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   })
      //   .then(async (res) => {
      //     setLoading(false);
      //     // Call the login function from AuthContext to update authentication state
      //     console.log("====================================");
      //     console.log("DAT>>>>", res);
      //     console.log("====================================");
      //     if (res?.status === 200) {
      //       // await AsyncStorage.setItem("token", res?.data?.token);
      //       resetData();
      //       await AsyncStorage.setItem("token", res?.data?.token);
      //       // await login(res?.data?.token);
      //       // navigation.navigate("index" as never);
      //     }
      //   })
      //   .catch((error) => {
      //     setLoading(false);
      //     Alert.alert("Error", error?.response?.data?.message);
      //     console.log("ERROR>>>>", error?.response?.data?.message);
      //   });

      // Navigation will be handled automatically by the useEffect in RootLayoutNav
      // No need to navigate manually here
      router.replace("/(drawer)"); // Navigate to the drawer layout
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  // Example of how to open drawer in screens after login
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleGoToSignup = () => {
    router.push("/Auth/Signup");
  };

  const handleGoToForgotPassword = () => {
    router.push("/Auth/ForgotPassword");
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidView}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/Logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
          Welcome back! Please enter your details.
        </Text>
        <View style={styles.formContainer}>
          <AuthButtons />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <View style={styles.formContainer}>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={"#717680"}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={"#717680"}
            />
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", gap: 6 }}>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#003366" : undefined}
              />
              <Text style={{ fontSize: 12, color: "#414651" }}>
                Remember for 30 days
              </Text>
            </View>
            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() =>
                navigation.navigate("Auth/ForgotPassword" as never)
              }
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.googleButton}>
            {/* <GoogleIcon size={20} /> */}
            <Text style={styles.buttonTextGoogle}>Sign in with Google</Text>
          </TouchableOpacity>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Auth/Signup" as never)}
            >
              <Text style={styles.signupLink}>Create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
  },
  checked: {
    borderColor: "#007AFF", // Blue when checked
  },
  innerCheckbox: {
    width: 15,
    height: 15,
    backgroundColor: "#007AFF",
    borderRadius: 3,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  formContainer: {
    width: 360,
    maxWidth: "90%",
    marginHorizontal: "auto",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "100%",
    marginTop: 20,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Android shadow
  },
  buttonTextGoogle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginLeft: 10,
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginHorizontal: "auto",
    marginBottom: 20,
  },
  keyboardAvoidView: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,

    fontSize: 14,
  },
  forgotPasswordText: {
    color: "#003366",
    letterSpacing: 0,
    fontSize: 12,
  },
  button: {
    backgroundColor: "#003366",
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
    color: "#333",
  },
  signupLink: {
    fontSize: 14,
    color: "#003366",
    fontWeight: "bold",
  },
  switchContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    width: 360,
    maxWidth: "90%",

    height: 36,
    position: "relative",
    marginHorizontal: "auto",
    marginBottom: 20,
  },
  animatedBg: {
    position: "absolute",
    width: "50%",
    height: "100%",
    top: 0,
    left: 0,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#002E6E",
  },
  switchButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  switchText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#A0A0A0",
  },
  activeText: {
    color: "#002E6E",
    fontWeight: "bold",
  },
});

export default Login;
