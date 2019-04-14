"use strict";
import * as vscode from "vscode";
const fs = require("fs");
const homedir = require('os').homedir();

export class Utility {
  public static getConfiguration(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration("aidou");
  }
  public static getAidouConfig(): any {
    const configPath = `${homedir}/Library/Application Support/Code/User/settings.json`;
    const data = fs.readFileSync(configPath);
    const jsonData = JSON.parse(data);
    return jsonData.aidou || {
      greeting: '亲~ 代码写久了，该休息啦~',
      title: '你的爱豆来啦',
      reminderViewIntervalInMinutes: 60,
    };
  }
}