'use strict';
import * as vscode from "vscode";
import { ReminderView } from './reminderView';
import { Utility } from './utility';

const getTimeout = () => {
  const reminderViewIntervalInMinutes = Utility.getAidouConfig().reminderViewIntervalInMinutes;
  return 1000 * 60 * reminderViewIntervalInMinutes;
}

export class Scheduler {
  public constructor(private context: vscode.ExtensionContext) {
  }

  public start(timeout = getTimeout()) {
    const timer = setTimeout(() => {
      ReminderView.show(this.context);
      clearTimeout(timer);
      this.start(getTimeout());
    }, timeout);
  }
}