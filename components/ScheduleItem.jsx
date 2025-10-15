import React from 'react';
import { Pressable, Text, Image, StyleSheet } from 'react-native';

const ScheduleItem = ({ companyName, logoUrl }) => {
  return (
    <Pressable style={styles.container}>
      <Image source={{ url: logoUrl }} style={styles.logo} />
      <Text>{companyName}</Text>
      <Text>13123</Text>
    </Pressable>
  );
}

export default ScheduleItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logo: {
    height: 80,
    width: 80,
  }
});