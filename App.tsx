import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import { observer } from 'mobx-react-lite';
import useStore from './store/StoreContext';

const Stack = createNativeStackNavigator();

const App = () => {
  const { scheduleStore } = useStore();

  useEffect(() => {
    scheduleStore.fetchSchedule();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default observer(App);