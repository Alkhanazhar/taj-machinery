import React, {useState} from "react";
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
} from "react-native";
import {useNavigation} from "@react-navigation/native";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    if (!email) {
      setMessage("Please enter your email address");
      setIsError(true);
      return;
    }

    try {
      // Implement your password reset logic here
      console.log("Password reset attempt for:", email);
      // Mock success
      setMessage("Password reset link has been sent to your email");
      setIsError(false);
      setIsSubmitted(true);
    } catch (err) {
      setMessage("Failed to send reset link. Please try again.");
      setIsError(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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

        <Text style={styles.title}>Forgot Password</Text>

        <Text style={styles.subtitle}>
          Enter your email address and we'll send you a link to reset your
          password.
        </Text>

        {message ? (
          <Text
            style={[
              styles.messageText,
              isError ? styles.errorText : styles.successText,
            ]}
          >
            {message}
          </Text>
        ) : null}

        {!isSubmitted && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        )}

        {!isSubmitted ? (
          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Send Reset Link</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Auth/Login" as never)}
          >
            <Text style={styles.buttonText}>Back to Login</Text>
          </TouchableOpacity>
        )}

        {!isSubmitted && (
          <TouchableOpacity
            style={styles.backToLoginContainer}
            onPress={() => navigation.navigate("Auth/Login" as never)}
          >
            <Text style={styles.backToLoginText}>Back to Login</Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoidView: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 20,
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
  button: {
    backgroundColor: "#0066cc",
    height: 50,
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
  messageText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16,
  },
  errorText: {
    color: "red",
  },
  successText: {
    color: "green",
  },
  backToLoginContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  backToLoginText: {
    color: "#0066cc",
    fontSize: 16,
  },
});

export default ForgotPassword;
