import { makeAutoObservable, runInAction } from 'mobx';
import GeoLocation from '@react-native-community/geolocation';

class ScheduleStore {
  schedule = [];
  loading = false;
  position = null;
  
  constructor() {
    makeAutoObservable(this);
  }

  async fetchSchedule() {
    this.loading = true;
    try {
      await this.fetchPosition();
      console.log(this.position);
      const response = await fetch(`https://mobile.handswork.pro/api/shifts/map-list-unauthorized?latitude=${this.position.latitude}&longitude=${this.position.longitude}`);
      const data = await response.json().then(data => data.data);

      runInAction(() => {
        this.schedule = data;
        this.loading = false;
      });
      console.log(this.schedule);
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  }
  
  async fetchPosition() {
    await new Promise((resolve, reject) => {
      GeoLocation.getCurrentPosition((position) => {
        runInAction(() => {
          this.position = position.coords;
        });
        resolve();
      });
    });
  }
}

const scheduleStore = new ScheduleStore();

export default scheduleStore;