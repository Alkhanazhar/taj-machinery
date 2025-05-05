import React, { useEffect, useState } from "react";
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
  ScrollView,
  Alert,
  Animated,
} from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import Loader from "../../components/Loader";
import { BASE_URL } from "@/constants/Colors";
import AuthButtons from "../../components/ToggleButton";
import Checkbox from "expo-checkbox";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [isSignup, setIsSignup] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [agree, setAgree] = useState(false);
  const position = new Animated.Value(isSignup ? 1 : 0);
  const route = useRoute();
  const resetData = () => {
    setName("");
    setEmail("");
    setConfirmPassword("");
    setPassword("");
  };
  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Implement your signup logic here
    console.log("Signup attempt with:", name, email, password);
    // If signup is successful, navigate to login or home
    // navigation.navigate('Login');
    const userData = {
      name: name,
      email: email,
      password: password,
    };
    setLoading(true);
    await axios
      .post(`${BASE_URL}/auth/register`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLoading(false);
        if (res?.data?.message) {
          resetData();
          Alert.alert("Success", res?.data?.message);
          navigation.navigate("Auth/Login" as never);
        }
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Error", error?.response?.data?.message);
        console.log("ERROR>>>>", error?.response?.data?.message);
      });
  };
  const toggleSwitch = () => {
    // Animated.timing(position, {
    //   toValue: isSignup ? 0 : 1,
    //   duration: 300,
    //   useNativeDriver: false,
    // }).start();
    // setIsLogin(!isLogin);
    navigation.navigate("Auth/Login" );
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/Logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subTitle}>
            Welcome back! Please enter your details.
          </Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.centerContainer}>
          <AuthButtons />

          <View style={styles.inputContainer}>
            <View style={styles.row}>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  placeholderTextColor={"#717680"}
                />
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Email</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor={"#717680"}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!passwordVisible}
                    placeholderTextColor={"#717680"}
                  />
                </View>
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!confirmPasswordVisible}
                    placeholderTextColor={"#717680"}
                  />

                  {/* <TouchableOpacity
                    onPress={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                  >
                    <Feather
                      name={confirmPasswordVisible ? "eye" : "eye-off"}
                      size={20}
                      color="gray"
                    />
                  </TouchableOpacity> */}
                </View>
              </View>
            </View>

            <View>
              <View
                style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
              >
                <Text style={styles.label}>Phone number</Text>
                <Text style={styles.optionalText}>Optional*</Text>
              </View>
              <View style={styles.phoneRow}>
                {/* <TextInput style={styles.input} placeholder="Enter your phone number" /> */}
                <TextInput
                  style={styles.input}
                  placeholder="Enter your phone number"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholderTextColor={"#717680"}
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={agree}
              onValueChange={setAgree}
              color={agree ? "#003366" : undefined}
            />
            <Text style={styles.checkboxText}>Agree to Terms & Privacy.</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Auth/Login" )}
            >
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
          </View>
      
        </ScrollView>
        <Loader visible={loading} />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
   
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    width: "100%",
  },
  centerContainer: {
    marginHorizontal:"auto",
    width:380,
    maxWidth:"90%"
  },
  label: {
    fontSize: 12,
    fontWeight: "400",
    marginBottom: 4,
    color: "#414651",
  },
  keyboardAvoidView: {
    flex: 1,
    padding: 20,
  },
  optionalText: {
    fontSize: 12,
    fontWeight: "400",
    marginBottom: 4,
    color: "#EF1308",
  },
  toggleContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    marginBottom: 20,
    overflow: "hidden",
  },
  toggleButton: {
    padding: 10,
    width: 100,
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#003366",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  activeText: {
    color: "white",
    fontWeight: "bold",
  },
  inactiveText: {
    color: "gray",
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
  subTitle: {
    color: "#535862",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 10,
  },
  fieldContainer: {
    width: "48%",
  },
  input: {
    height: 42,
    borderWidth: 1,
    borderColor: "#D5D7DA",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    width: "100%",
  },
  button: {
    backgroundColor: "#003366",
    height: 42,
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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  loginText: {
    fontSize: 14,
    color: "#333",
  },
  loginLink: {
    fontSize: 14,
    color: "#003366",
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 12,
    color: "#0C1320",
  },
});

export default Signup;
