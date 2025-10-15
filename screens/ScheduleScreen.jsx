import { useMemo } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getWorkTypesText, getLocalCost } from '../utils/helpers';

const ScheduleScreen = ({ route }) => {
  const { item } = route.params;

  const workTypesText = useMemo(() => getWorkTypesText(item.workTypes), [item.workTypes]);

  const progressBarWidth = useMemo(() => {
    return `${Math.min(((item.currentWorkers || 0) / (item.planWorkers || 1)) * 100, 100)}%`;
  },[item.currentWorkers, item.planWorkers]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Image source={{ uri: item.logo }} style={styles.logo} />
          <View style={styles.headerInfo}>
            <Text style={styles.companyName}>{item.companyName}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>⭐ {item.customerRating}</Text>
              <Text style={styles.feedbackCount}>({item.customerFeedbacksCount || '0 отзывов'})</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Тип работы</Text>
          <Text style={styles.sectionContent}>{workTypesText}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Адрес</Text>
          <Text style={styles.sectionContent}>{item.address}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Дата и время</Text>
          <Text style={styles.sectionContent}>{item.dateStartByCity}</Text>
          <Text style={styles.sectionContent}>
            {item.timeStartByCity} - {item.timeEndByCity}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Оплата</Text>
          <Text style={styles.price}>{getLocalCost(item.priceWorker)}</Text>
          {item.bonusPriceWorker > 0 && (
            <Text style={styles.bonus}>+ {item.bonusPriceWorker} ₽ бонус</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Требуется работников</Text>
          <Text style={styles.sectionContent}>
            Набрано: {item.currentWorkers} из {item.planWorkers}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: progressBarWidth}
              ]} 
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    gap: 16,
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  companyName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rating: {
    fontSize: 16,
    color: '#666',
  },
  feedbackCount: {
    fontSize: 14,
    color: '#999',
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sectionContent: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2ecc71',
  },
  bonus: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f39c12',
    marginTop: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2ecc71',
    borderRadius: 4,
  },
});