import {Injectable} from '@angular/core';
import {NotifierService} from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifierService: NotifierService) {
  }

  public error(msg: string) {
    this.notifierService.notify('error', msg);
  }

  public success(msg: string) {
    this.notifierService.notify('success', msg);
  }

  public warning(msg: string) {
    this.notifierService.notify('warning', msg);
  }

  public info(msg: string) {
    this.notifierService.notify('info', msg);
  }
}
