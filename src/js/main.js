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
    <li class="message-item"> 
      <div class="time-bar" v-if="showTime">{{getLocalTime(time)}}</div> 
      <div :class="[msgFrom, 'align']"> 
        <img :src="avatar" alt="" @error="flag && errHandle($event)" v-if="!isMe" class="avator"/> 
        <div class="bubble">{{text}}</div> 
        <img :src="avatar" alt="" @error="flag && errHandle($event)" v-if="isMe" class="avator"/> 
      </div> 
    </li> 
    `
}

var app = new Vue({
  el: '#app',
  data: {
    chatData: null,
    lastTime: 0
  },
  components: {
    'message-box': messageBox
  },
  mounted() {
    axios.get('https://koala-ae5de.firebaseio.com/test/chat.json')
      .then(response => {
        this.chatData = response.data;
        for(let key in this.chatData) {
          // 为所有message添加是否显示时间的标志
          this.chatData[key].showTime = this.showTime(this.chatData[key].time);
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
    }
  },
})