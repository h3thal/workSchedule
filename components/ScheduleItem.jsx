import React, { useMemo } from 'react';
import { Pressable, Text, Image, StyleSheet, View } from 'react-native';
import { getWorkTypesText, getLocalCost } from '../utils/helpers';

const ScheduleItem = ({ 
  companyName, 
  logoUrl, 
  customerRating, 
  dateStartByCity,
  timeStartByCity,
  timeEndByCity,
  priceWorker,
  currentWorkers,
  planWorkers,
  workTypes,
  onPress 
}) => {
  const workTypesText = useMemo(() => getWorkTypesText(workTypes), [workTypes]);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={{ uri: logoUrl }} style={styles.logo} borderRadius={16}/>
      <View style={styles.column}>
        <View style={styles.header}>
          <Text style={styles.companyName}>{companyName}</Text>
          <Text style={styles.rating}>⭐ {customerRating}</Text>
        </View>
        <Text style={styles.workType}>{workTypesText}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.date}>{dateStartByCity}</Text>
          <Text style={styles.time}>{timeStartByCity} - {timeEndByCity}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>{getLocalCost(priceWorker)}</Text>
          <Text style={styles.workers}>{currentWorkers}/{planWorkers} человек</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ScheduleItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    height: 80,
    width: 80,
  },
  column: {
    flexDirection: 'column',
    flex: 1,
    gap: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  rating: {
    fontSize: 14,
    color: '#666',
  },
  workType: {
    fontSize: 14,
    color: '#666',
  },
  infoRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  date: {
    fontSize: 13,
    color: '#888',
  },
  time: {
    fontSize: 13,
    color: '#888',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2ecc71',
  },
  workers: {
    fontSize: 13,
    color: '#666',
  },
});