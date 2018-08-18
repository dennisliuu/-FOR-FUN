<template>
  <div id="Android">
    <div id="cont">
        <nav style="z-index: 1000; height: 100vh;overflow-y: scroll;">
          <ul>
            <li v-for="(value, key) in menu_json" v-on:click="getItemurl(value)">{{ key }}</li>
            <li><router-link to="/" style="text-decoration: none; color: white;">iOS</router-link></li>
            <li><a href="https://www.ptt.cc/bbs/fastfood/M.1517141295.A.208.html" style="text-decoration: none;">優惠查詢</a></li>
          </ul>
        </nav>
      </div>
    <div class="container">
      <div id="search_bg" class="dialog-container display_none" v-on:click="Open_menu"></div>
      <!-- <div id="statusbar" class="statusbar"></div> -->
      <header class="header one-edge-shadow">
        <span class="back">
          <i class="material-icons" style="font-size: 1.5em; color: #fff" v-on:click="Time_stop">arrow_back</i>
          <span id="backButton" class="icon-arrow-left2"></span> 優惠券
        </span>
        <span id="search" class="search" v-on:click="Open_menu">搜尋附近餐廳</span>
      </header>
      <div id="coupon" class="coupon" v-bind:style="{ 'background-image': 'url(' + selected + ')' }">
      </div>
      <div class="footer">
        <button id="redeem" class="redeem one-edge-shadow" v-on:click="Use_coupon">兌換優惠</button>
        <div id="countdown" class="countdown"><span class="icon-alarm"></span><span class="countdown-label">優惠倒數</span><span id="countdown-timer">02: 00</span></div>
      </div>
    </div>
    <div id="dialog-container" class="dialog-container">
      <div class="dialog">
        <h1>確認兌換優惠</h1>
        <p>請確認您已在麥當勞櫃檯, 點選「立即兌換」後, 需於兩分鐘內出示給結帳人員</p>
        <p class="dialog-btns">
          <span id="dialogNo" v-on:click="Not_select">暫不兌換</span>
          <span id="dialogYes" class="dialog-yes" v-on:click="Sure_select">立即兌換</span>
        </p>
      </div>
    </div>
 </div>
</template>

<script>
  import json from '../../static/menu.json'
  var x
  export default {
    name: 'Android',
    data () {
      return {
        menu_json: json,
        selected: ''
      }
    },
    methods: {
      Use_coupon: function (event) {
        var dialogContainer = document.getElementById('dialog-container')
        dialogContainer.style.display = 'flex'
      },
      Time_stop: function (event) {
        var dialogContainer = document.getElementById('dialog-container')
        var countdownContainer = document.getElementById('countdown')
        countdownContainer.style.display = 'none'
        dialogContainer.style.display = 'none'
      },
      startTimer: function (duration, display) {
        var countdownContainer = document.getElementById('countdown')
        var timer = duration,
        minutes = void 0,
        seconds = void 0;
        display.textContent = '02: 00';
        if (x) {
          window.clearInterval(x);
        }
        x = setInterval(function () {
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
      Sure_select: function (event) {
        var dialogContainer = document.getElementById('dialog-container')
        var countdownContainer = document.getElementById('countdown')
        var twoMinutes = 60 * 2;
        var display = document.querySelector('#countdown-timer');
        this.startTimer(twoMinutes, display);
        countdownContainer.style.display = 'flex';
        dialogContainer.style.display = 'none';
      },
      Not_select: function (event) {
        var countdownContainer = document.getElementById('countdown')
        var dialogContainer = document.getElementById('dialog-container')
        countdownContainer.style.display = 'none';
        dialogContainer.style.display = 'none';
      },
      Open_menu: function (event) {
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
      getItemurl: function (value) {
        let coupon_item = document.getElementById('coupon')
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);

.display_none {
  display: none;
}

.display_flex {
  display: flex;
}

#Android {
  font-family: 'Noto Sans TC', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.one-edge-shadow {
  -webkit-box-shadow: 0 8px 6px -6px gray;
  -moz-box-shadow: 0 8px 6px -6px gray;
  box-shadow: 0 8px 6px -6px gray;
}

.back {
  display: flex;
}

.back > span {
  margin-right: 25px;
}

.container {
  font-family: 'cwTeXHei', serif;
  color: white;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 35px 0 0 0;
  background-color: rgba(113, 201, 181, 1);
}

.statusbar {
  font-family: sans-serif;
  font-size: 14px;
  font-weight: lighter;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
  padding-right: 10px;
  position: fixed;
  top: 5px;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 19px;
  background-position: right 43px top;
  background-size: 143px;
  background-repeat: no-repeat;
  background-image: url(https://i.imgur.com/ElFjAmt.png);
}

.header {
  height: 89px;
  padding: 44px 20px 20px 20px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #D50000;
  width: 100%;
  font-size: 22px;
}

.search {
  height: 100%;
  font-size: 14px;
  margin-top: 6px;
}

.coupon {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center center; 
  /*background-image: url('https://i.imgur.com/N8DrkrD.png');*/
  background-size: 100% 100%;
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
  font-size: 26px;
  margin: 10px 5px;
  color: white;
  background-color: rgba(242, 171, 11, 1);
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
  display: none;
  font-size: 26px;
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
  display: none;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
}

.dialog {
  background-color: white;
  padding: 20px;
  width: 90%;
  border-radius: 5px;
}

.dialog-btns {
  text-align: right;
  color: rgba(4, 154, 146, 1);
}

.dialog-yes {
  margin-left: 20px;
}

.dialog h1 {
  font-size: 20px;
  font-weight: 500;
}

.backContainer {
  top: 0;
  left: 0;
  position: fixed;
  z-index: 101;
  display: flex;
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
</style>

