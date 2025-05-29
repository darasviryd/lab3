import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AddProductScreen from '../screens/AddProductScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Lista zakupów' }} />
          <Stack.Screen name="AddProduct" component={AddProductScreen} options={{ title: 'Dodaj produkt' }} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Szczegóły produktu' }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Logowanie' }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Rejestracja' }} />
        </>
      )}
    </Stack.Navigator>
  );
};
import RegisterScreen from '../screens/RegisterScreen'; // ← добавить импорт

// внутри Stack.Navigator:
<Stack.Screen name="Register" component={RegisterScreen} />
export default RootNavigator;