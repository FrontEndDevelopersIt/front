<template>
  <div class="frame">


  <div class="label">
    <div class="container">
      <h1>Восстановление пароля</h1>
    <div class="auth-form-body mt-3">
      <tr>
        <td>
        <label for="emailField">Введите свой email-адрес и мы вышлем вам ссылку для смены пароля.</label>
        </td>
      </tr>
      <tr>
        <td>
          <label for="login_field">Email-адрес:</label>
        </td>
      </tr>
      <tr><input v-model="user.mail" autofocus="autofocus" class="form-control input-block" id="login_field" name="login" tabindex="1" type="email"/></tr>
      <span v-show="isErrorMail" >{{ emailMsg }}</span>

      <br>
          <div class="button_cont">

          </div>    <router-link to="/changePassword">
          <button class='btn' @click.prevent="onReset">
             Отправить
          </button>
      <span class="" v-show="showMsg" >{{ btnMsg }}</span>
           </router-link>
           <div class="msg_cont">
             <span id="msg"></span>
           </div>

      <br>
    </div>
    </div>
  </div>
</div>
</template>

<script>

    import Vue from 'vue'
    import Vuex from 'vuex'
    import VueAxios from 'vue-axios'
    import Regostration from './registration.vue'
    import validationService from '../../src/validation'
    import request from '../../src/api'

  export default{
      name: 'reset',
      data(){
          return{
              user:
                  {mail: ''},
              emailMsg: '',
              isErrorMail : true,
              showMsg : true,
              btnMsg: '',
          }
      },

      watch: {
          'user.mail': function (value) {
              this.emailMsg = validationService.CheckEmail(value);
          }
      },

      methods: {
          onReset(){
              const url = 'http://api.spidergrodno.tk/api/password';
              const options = {
                  params: {
                      email: this.user.mail,
                  }
              };
              const defaultUrl = '/resetPassword';
              if(this.user.mail !== '')
              {
                  request.getData(url, options, function (msg) {
                      console.log(msg);
                      document.getElementById('msg').innerHTML = msg;
                      console.log(document.getElementById('msg').innerHTML);
                  });
               }
              else{
                  document.getElementById('msg').innerHTML = 'Поле обязательно!!!';
              }
          }
      }
  }

</script>

<style scoped>
.frame {
  height: 74.1vh;
}

  .container {
    text-align: left;
    color: white;
    margin-top: 30px;
    padding: 20px 50px 10px 50px;
    color: white;
    width: 550px;
    border-radius: 10px;
    box-shadow: 2px 2px 2px 1px rgba(0,0,0,0.15);
    background-image: url(/img/blue.jpg);
    background-position: center;
    background-attachment: fixed;
  }

  .label {
    width: 550px;
    height: 200px;
    margin: 30px auto;
    text-align: center;
    border-radius: 20px;
    color: red;
    background-color: #EF7F35;
    box-shadow: 1px 2px 4px 2px rgba(0,0,0,0.15);
    padding-left: 10px;
  }

  h1, h2 {
    font-weight: normal;
    font-size: 42px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #ff7f2b;
  }

  label {
    color: white;
    font-size: 15px;

  }
  input{

    background-color: white;
    border-bottom-color: grey;
    border-radius: 10px;
    color: black;
    padding-left: 5px;
    border: none!important;
    padding-left: 5px;
    position: relative;
    height: 35px;
    box-shadow: 1px 2px 4px 2px rgba(0,0,0,0.15);
    border-radius: 5px;
    color: black;
    background-color: #fff;
    margin-bottom: 0px;
    outline: 0!important;
  }


  .input:focus{
    border-color: inherit;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .btn {
    background-color: #ff7f2b;
    width: 100px;
    height: 40px;
    color: white;
    background-color: #EF7F35;
    width: 200px;
    border-radius: 5px;
    height: 40px;
    padding-left: 20px;
    border: none;
    box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.15);
    cursor: pointer;
    text-align: center;
    margin-top: 20px;

  }

  .btn:active {
    transform: translateY(4)
  }

  .btn:hover{
    box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.3);
  }

  .tr {
    text-align: center;
  }
  .try {
    text-align: center;
    margin-right: 10px;
    margin-top:0px;
  }

  span {
    color: white;
    font-style: italic;
    opacity: 1;
  }

  .top {
    margin-top: 40px;
  }

  .check{
    width: 14px;
    vertical-align: bottom;
    margin-bottom: 15px;
    border-radius: 0;
    opacity: 1!important;
    background-color: none;
    box-shadow: none;

  }

  button a {
    color: white!important;

  }
  button {
    padding-left: 20px!important;
    display: inline-block;
    margin-left: 120px;
  }

  .msg_cont{
    display: block;
    width: 100%;
    margin-bottom: 0px;
    padding-bottom: 0px;

  }
  .msg_cont span{
    padding-top: 20px;
    display: block;
    margin: auto;
    width: 25%;

  }
</style>
