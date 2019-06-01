# ChatWindow

**Complete**：

* Display the user name and avatar

* Do not display user name and avatar if the previous is sent from the same user

* Show the messages from others in the left side

* Show the messages from me in the right side

* Display the date time like WeChat if the gap between two message is longer than 5 minutes
* Clean UI
* Compose and send a new message by click `发送` button or use enter key

**Use**: 

​	Vue + Axios

**Construction**:

```shell
.
├── README.md
├── data
│   └── chat.json
├── images
│   └── default.png
├── index.html
└── src
    ├── css
    │   └── style.css
    └── js
        ├── axios.min.js
        ├── main.js
        └── vue.min.js
```

Components: `messageBox` in `main.js`

**Notice**：

> If the URL of chat data isn't accessible, use the code in main.js: 69 and disable web security of Chrome or use Edge instead

