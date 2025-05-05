import React from "react";
import { useRouter } from "expo-router";
import ScreenTemplate from "../../components/ScreenTemplate";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Logout() {
  const router = useRouter();

  React.useEffect(() => {
    const removeToken = async () => {
      await AsyncStorage.removeItem("token");
    };
    // Add your logout logic here
    // Then redirect to login or home
    removeToken();
    router.replace("/Auth/Login");
  }, []);

  return (
    <ScreenTemplate title="Logging out...">
      {/* Add a loading spinner or message here */}
    </ScreenTemplate>
  );
}
