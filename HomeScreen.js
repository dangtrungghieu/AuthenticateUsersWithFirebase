import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const HomeScreen = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
      <Button title="Đăng Xuất" onPress={logout} />
    </View>
  );
};

export default HomeScreen;
