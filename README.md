# 爱豆鼓励师

在 VS Code 中连续写代码一小时（时间可配置），你的aidou会提醒你该休息啦~

## 使用

除了每过一小时会自动弹出提醒页面，也可以用 command+shift+i 或者 command+shift+p 输入 `aidou` 来唤醒页面。

## 配置

在 vscode 中点按 command+, 在 setting.json 里增加以下配置, 确保 json 文件格式正确, 否则会出现找不到命令.。
```json
{
  "aidou": {
    "greeting": "小姐姐~ 代码写久了，该休息啦~",
    "title": "你的老公来啦",
    "pictures": [
      "https://aidou-image-url"
    ],
    "reminderViewIntervalInMinutes": 60
  },
}
```
