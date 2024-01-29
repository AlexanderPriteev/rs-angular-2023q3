import { Injectable } from '@angular/core';

interface ITimer {
  timerValue: number;
  dateStamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private map = new Map<string, ITimer>();

  getTimerValue(id: string): number {
    const timer = this.map.get(id);
    if (!timer) return 0;
    const timeGone = Math.floor((new Date().getTime() - timer.dateStamp) / 1000);
    let currentTime = timer.timerValue - timeGone;
    currentTime = currentTime > 0 ? currentTime : 0;
    if (!currentTime) this.map.delete(id);
    return currentTime;
  }

  setTimerValue(id: string, value: number) {
    if (value <= 0) return;
    const timer = {
      timerValue: value,
      dateStamp: new Date().getTime()
    };
    this.map.set(id, timer);
  }
}
