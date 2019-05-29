/**
 * template message-box 
 */
var messageBox = {
  data() {
    return {
      flag: true
    }
  },
  props: {
    avatar: String,
    name: String,
    text: String,
    time: String,
    showTime: {
      type: Boolean,
      default: false
    },
    showAvatar: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    msgFrom: function () {
      return this.name == "Me" ? "is-me" : "not-me";
    },
    isMe: function () {
      return this.name == "Me" ? true : false;
    },
  },
  methods: {
    errHandle: function (event) {
      this.flag = false;
      event.currentTarget.src = 'images/default.png';
    },
    getLocalTime: function (sec) {     
      return new Date(parseInt(sec) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
   }
  },
  template: `
    <li :class="['message-item', showAvatar ? 'ex-margin' : '']"> 
      <div class="time-bar" v-if="showTime">{{getLocalTime(time)}}</div> 
      <div :class="[msgFrom, 'align']"> 
        <img :src="avatar" alt="" @error="flag && errHandle($event)" v-if="!isMe && showAvatar" class="avator"/> 
        <div class="bubble">{{text}}</div> 
        <img :src="avatar" alt="" @error="flag && errHandle($event)" v-if="isMe && showAvatar" class="avator"/> 
      </div> 
    </li> 
    `
}

var app = new Vue({
  el: '#app',
  data: {
    chatData: [],
    lastTime: 0,
    sendText: '',
    myAvatarImgUrl: ''
  },
  components: {
    'message-box': messageBox
  },
  mounted() {
    // let url = 'https://koala-ae5de.firebaseio.com/test/chat.json';
    let url = 'data/chat.json';
    
    axios.get(url)
      .then(response => {
        for(let key in response.data) {
          // 为所有message添加是否显示时间的标志
          response.data[key].showTime = this.showTime(response.data[key].time);
          if(!response.data[key].showTime && this.chatData[this.chatData.length - 1].name == response.data[key].name){
            this.chatData[this.chatData.length - 1].showAvatar = false;
          }
          response.data[key].showAvatar = true;
          this.chatData.push(response.data[key]);
        }
      })
      .catch(err => console.error(err));
  },
  methods: {
    showTime: function (ctime) {
      if (this.lastTime == 0) {
        this.lastTime = ctime;
        return true;
      } else if (ctime - this.lastTime > 300) {
        this.lastTime = ctime;
        return true;
      }
      return false;
    },
    onSendClick: function() {
      if(this.sendText == '') {
        return;
      }

      let ctime = Math.floor((new Date().getTime())/1000);
      let showTime;

      if((ctime - this.lastTime) > 300) {
        showTime = true;
        this.lastTime = ctime;
      }
      else {
        showTime = false;
      }

      if(!showTime && this.chatData[this.chatData.length - 1].name == "Me") {
        this.chatData[this.chatData.length - 1].showAvatar = false;
      }

      this.chatData.push({
        "avatar": this.myAvatarImgUrl,
        "name": "Me",
        "text": this.sendText,
        "time": ctime,
        "showTime": showTime,
        "showAvatar" : true
      });

      this.sendText = '';
    },
  },
  updated: function(){
    this.$nextTick(function(){
    var div = document.getElementById('scroll-win');
      div.scrollTop = div.scrollHeight;
    })
  }
})