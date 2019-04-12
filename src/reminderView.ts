'use strict';
import * as vscode from 'vscode';
import { Utility } from './utility';
// import * as path from 'path';

const getRandomInt = (max: any) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const imageString = (imagePath: string) => {
  return `<img src="${imagePath}">`;
}
export class ReminderView {
  private static panel: vscode.WebviewPanel | undefined;

  public static show(context: vscode.ExtensionContext) {
    if (this.panel) {
      this.panel.reveal();
    } else {
      const aidouConfig = Utility.getAidouConfig();
      const greeting: any = aidouConfig.greeting || '小姐姐~ 代码写久了，该休息啦~';
      const title: any =  aidouConfig.title || '你的老公来啦';
      const pictures: Array<string> = aidouConfig.pictures || null;

      this.panel = vscode.window.createWebviewPanel("aidou", title, vscode.ViewColumn.Two, {
        enableScripts: true,
        retainContextWhenHidden: true,
      });

      // const imagePath = vscode.Uri.file(path.join(context.extensionPath, 'images', `husband${getRandomInt(4)}.jpg`))
      // .with({ scheme: 'vscode-resource' });
      let imagePath = null
      if(Array.isArray(pictures) && pictures.length > 0){
        imagePath = pictures[getRandomInt(pictures.length)]
      }

      this.panel.webview.html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title ? title : '你的老公来啦'}</title>
</head>
<body>
    <div><h1>${greeting}</h1></div>
    <div>${imagePath ? imageString(imagePath) : "<p>无图言屌?</p>"}</div>
</body>
</html>`;

      this.panel.onDidDispose(() => {
        this.panel = undefined;
      });
    }
  }
}