<template>
  <div id="IOS">
      <div id="cont">
        <nav style="z-index: 1000; height: 100vh;overflow-y: scroll;">
          <ul>
            <li v-for="(value, key) in menu_json" v-on:click="getItemurl(value)">{{ key }}</li>
            <li><router-link to="Android" style="text-decoration: none; color: white;">Android</router-link></li>
            <li>Verson 1.0</li>
          </ul>
        </nav>
      </div>
      <div class="container" >
        <div id="search_bg" class="dialog-container display_none" v-on:click="Open_menu"></div>
        <header class="header">
          <span class="box">
            <!-- <span > -->
              <i class="material-icons" v-on:click="timer_reset">keyboard_arrow_left</i>
              <!-- </span> -->
            </span>
            <span class="box" align="center" style="font-weight: 500">
              優惠券
            </span>
            <span id="search" class="search box" v-on:click="Open_menu">
              搜尋附近餐廳
<!--             <button class="js-menu menu" type="button" v-on:click="Open_menu">
              <span class="bar"></span>
            </button> -->
          </span>
          
        </header>
        
        <div id="item_page" class="coupon">
          <div class="warning_text" id="warning_text">
            <h1>該應用僅作學術練習，切勿濫用!!</h1>
            <p>作者：劉維仁 dennisliuu@github.</p>            
          </div>
        </div>

        <div class="footer">
          <button id="redeem" class="redeem" v-on:click="Use_coupon">兌換優惠</button>
          <div id="countdown" class="countdown display_none">
            <i class="material-icons">alarm_on</i>
            <span class="countdown-label">優惠倒數</span>
            <span id="countdown-timer">02: 00</span>
          </div>
        </div>
        <div id=dialog-container class="dialog-container display_none">
          <div class="confirm">
            <h1>確認兌換優惠</h1>
            <p>請確認您已在麥當勞櫃檯，點選「立即兌換」後，需於兩分鐘內出示給結帳人員</p>
            <button v-on:click="Use_coupon(0)">暫不兌換</button>
            <button v-on:click="Use_coupon(1)">立即兌換</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import json from '../../static/menu.json'
  var x
  export default {
    name: 'app',
    data () {
      return {
        isActive: false,
        useCoupon: false,
        cancelAll: false,
        twominutes: 120,
        menu_json: json
      }
    },
    methods: {
      Open_menu: function (event) {
        document.getElementById('warning_text').style.display = "none"
        var cont = document.getElementById('cont')
        var search_bg = document.getElementById('search_bg')
        if (this.isActive) {
          cont.classList.remove("menu-open")
          search_bg.classList.add("display_none")
        }
        else {
          cont.classList.add("menu-open")
          search_bg.classList.remove("display_none")
        }
        this.isActive = !this.isActive
      },
      Use_coupon: function (sel) {
        var confi = document.getElementById('dialog-container')
        var countdown = document.getElementById('countdown')
        if (this.useCoupon) {
          confi.classList.add('display_none')
        }
        else {
          confi.classList.remove('display_none')
        }
        if (sel == 1) {
          countdown.classList.remove('display_none')
          countdown.classList.add('display_flex')
          this.startTime()
        }
        else {
          countdown.classList.add('display_none')
        }
        this.useCoupon = !this.useCoupon
      },
      timer_reset: function (event) {
        var countdown = document.getElementById('countdown')
        countdown.classList.add('display_none')
        countdown.classList.remove('display_flex')
        window.clearInterval(x)
      },
      startTime: function (event) {
        let timer = 120, minutes, seconds;
        let display = document.getElementById('countdown-timer')
        display.textContent = '02: 00';
        if (x) {
          window.clearInterval(x);
        }
        x = setInterval(() => {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          display.textContent = minutes + ": " + seconds;

          if (--timer < 0) {
            window.clearInterval(x);
            countdownContainer.style.display = 'none';
          }
        }, 1000);
      },
      getItemurl: function (value) {
        let coupon_item = document.getElementById('item_page')
        coupon_item.style.backgroundImage = "url(" + value + ")"
        var cont = document.getElementById('cont')
        var search_bg = document.getElementById('search_bg')
        if (this.isActive) {
          cont.classList.remove("menu-open")
          search_bg.classList.add("display_none")
        }
        else {
          cont.classList.add("menu-open")
          search_bg.classList.remove("display_none")
        }
        this.isActive = !this.isActive
      }
    } 
  }
</script>

<style scoped>
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);

.display_none {
  display: none;
}

.display_flex {
  display: flex;
}

#IOS {
  font-family: 'Noto Sans TC', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.header {
  padding: 0em 0em 0em 0em;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  background-color: #D50000;
  width: 100%;
  font-size: 5vw;
}

.container {
  font-family: inherit;
  color: white;
  width: 100%;
  height: 100vh;
  margin: 0;
  background-color: rgba(113, 201, 181, 1);
}

.box {
  flex: 1;
  display: flex;
  justify-content: center;
}

.box:first-child > i { 
  margin-right: auto;
  font-size: 14vw;
}

.box:last-child  > span { margin-left: auto;  }

.search {
  height: 100%;
  font-size: 5vw;
}

.coupon {
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding-top: 10%;
  background-repeat: no-repeat;
  background-position: center center; 
  background-image: url('https://i.imgur.com/N8DrkrD.png');
  background-size: 100% 100%;
}

.warning_text {
  position: relative;
  float: left;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1em;
}

.footer {
  width: 100%;
  display: flex;
  position: fixed;
  justify-content: center;
  bottom: 0;
  left: 0;
}

.redeem {
  font-size: 6vw;
  /*margin: 10px 5px;*/
  color: white;
  background-color: #FFA72F;
  width: 100%;
  border: 0;
  border-radius: 2px;
  height: 60px;
}

.countdown {
  font-family: sans-serif;
  position: fixed;
  align-items: center;
  justify-content: center;
  bottom: 0;
  left: 0;
  /*  display: flex;*/
  /*display: none;*/
  font-size: 20px;
  margin: 0;
  color: white;
  background-color: rgba(242, 171, 11, 1);
  width: 100%;
  border: 0;
  border-radius: 2px;
  height: 100px;
}

.countdown-label {
  margin: 0 10px;
}

.dialog-container {
  position: fixed;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
}

nav {
  width: 40vw;
  height: 100%;
  background: #D50000;
  position: fixed;
  -webkit-transform: translateX(-40vw);
  transform: translateX(-40vw);
  transition: -webkit-transform 0.6s cubic-bezier(0.56, 0.1, 0.34, 0.91);
  transition: transform 0.6s cubic-bezier(0.56, 0.1, 0.34, 0.91);
  transition: transform 0.6s cubic-bezier(0.56, 0.1, 0.34, 0.91), -webkit-transform 0.6s cubic-bezier(0.56, 0.1, 0.34, 0.91);
  /*padding-top: 2em;*/
}

.menu-open nav {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}
nav ul {
  margin: 0;
  list-style: none;
  padding: 0;
  text-align: center;
}
nav ul li {
  padding: 20px;
  list-style: none;
  margin: 0 10px;
  display: inline-block;
  font-size: 1em;
  color: #FFF;
}

@keyframes fade {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
.confirm {
  color: #000;
  position: absolute;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  min-width: 280px;
  max-width: 500px;
  height: auto;
  /*background: #E2E2E2;*/
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 0;
  margin: 0;
  border-top: 1px solid white;
  animation: fade 0.3s ease 1 forwards;
}
.confirm h1 {
  text-align: center;
  font-size: 1.2em;
  margin: 0.8em 1em 0em;
  font-weight: 500;
}
.confirm p {
  text-align: center;
  font-size: 0.8em;
  margin: 0 1.9em 5em;
  text-align-last: center;
  line-height: 1.3em;
}
.confirm button {
  background: transparent;
  border: none;
  color: #1678E5;
  height: 3rem;
  font-size: 1rem;
  width: 50%;
  position: absolute;
  bottom: 0;
  cursor: pointer;
}
.confirm button:nth-of-type(1) {
  border-top: 1px solid #B4B4B4;
  border-right: 1px solid #B4B4B4;
  font-weight: bold;
  left: 0;
  border-radius: 0 0 0 10px;
}
.confirm button:nth-of-type(2) {
  border-top: 1px solid #B4B4B4;
  right: 0;
  border-radius: 0 0 10px 0;
}
.confirm button:focus,
.confirm button:hover {
  font-weight: bold;
  background: #EFEFEF;
}
.confirm button:active {
  background: #D6D6D6;
}
</style>
