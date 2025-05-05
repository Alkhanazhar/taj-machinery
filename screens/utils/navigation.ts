import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

// Hook to get drawer navigation functions
export const useDrawerNavigation = () => {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const closeDrawer = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return {
    openDrawer,
    closeDrawer,
    toggleDrawer
  };
}; 