'use strict';
import * as vscode from 'vscode';
import { Utility } from './utility';
// import * as path from 'path';

const getRandomInt = (max: any, exceptIndex: number = -1) => {
  const randomValue = Math.floor(Math.random() * Math.floor(max));
  if (exceptIndex === -1) {
    return randomValue;
  }

  if (randomValue === exceptIndex) {
    return randomValue === 0 ? max - 1 : randomValue - 1;
  }

  return randomValue;
};

const imageString = (imagePath: string) => {
  return `<img src="${imagePath}">`;
};

const getHtmlStr = (title: string, greeting: string, imagePath: any) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
  </head>
  <body>
      <div><h1>${greeting}</h1></div>
      <div>${imagePath ? imageString(imagePath) : "<p>尚未找到爱豆图片，请在配置文件中增加</p>"}</div>
  </body>
  </html>`;
};

export class ReminderView {
  private static panel: vscode.WebviewPanel | undefined;
  private static randomIndex: any;

  public static show(context: vscode.ExtensionContext) {
    const aidouConfig = Utility.getAidouConfig();
    const pictures: Array<string> = aidouConfig.pictures;
    const greeting: any = aidouConfig.greeting;
    const title: any = aidouConfig.title;

    this.randomIndex = this.randomIndex !== undefined
      ? getRandomInt(pictures.length, this.randomIndex) :
      getRandomInt(pictures.length);

    let imagePath = null;

    if (Array.isArray(pictures) && pictures.length > 0) {
      imagePath = pictures[this.randomIndex];
    }


    if (this.panel) {
      this.panel.reveal();

      this.panel.webview.html = getHtmlStr(title, greeting, imagePath);
    } else {
      this.panel = vscode.window.createWebviewPanel("aidou", title, vscode.ViewColumn.Two, {
        enableScripts: true,
        retainContextWhenHidden: true,
      });

      this.panel.webview.html = getHtmlStr(title, greeting, imagePath);

      this.panel.onDidDispose(() => {
        this.panel = undefined;
      });
    }
  }
}