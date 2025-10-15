import { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import useStore from '../store/StoreContext';
import { observer } from 'mobx-react-lite';
import ScheduleItem from '../components/ScheduleItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const { scheduleStore } = useStore();
  const navigation = useNavigation();

  const renderItem = useCallback(({ item }) => (
    <ScheduleItem
      companyName={item.companyName}
      logoUrl={item.logo}
      customerRating={item.customerRating}
      dateStartByCity={item.dateStartByCity}
      timeStartByCity={item.timeStartByCity}
      timeEndByCity={item.timeEndByCity}
      priceWorker={item.priceWorker}
      currentWorkers={item.currentWorkers}
      planWorkers={item.planWorkers}
      workTypes={item.workTypes}
      onPress={() => {
        navigation.navigate('Schedule', { item });
      }} 
    />
  ),[scheduleStore.schedule]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlashList
        data={scheduleStore.schedule}
        renderItem={renderItem}
        style={styles.list}
        keyExtractor={(item) => item.id}
        estimatedItemSize={100}
        headerComponent={<Text>{scheduleStore.schedule.length}</Text>}
        ListEmptyComponent={<Text>No data</Text>}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
      />
    </SafeAreaView>
  );
}

export default observer(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  list: {
    paddingHorizontal:16,
  }
});