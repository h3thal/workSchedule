import { createContext, useContext } from 'react';
import scheduleStore from './scheduleStore';

export const StoreContext = createContext({
  scheduleStore,
});

const useStore = () => {
  return useContext(StoreContext);
};

export default useStore;