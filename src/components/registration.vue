<template>
  <div class="">
    <div class="frame">
    <div class = "container">
        <div class="registration_cont">
            <br>
            <div class="try">
                <h2>Регистрация </h2>
            </div>
            <br>
            <table>
                <tr>
                    <div class="try">
                        <label class="lbl"><p>Имя пользователя:</p></label></div>

                </tr>
                <tr>
                    <div class="login">
                        <input type="text" maxlength="16" name="NickName" v-model="newUser.name" placeholder="Login" >
                        <br>
                        <span class="error error_control" v-show="isError">{{ userMsg  }}</span>
                    </div>
                </tr>
                <br>
                <tr>
                    <div class="try">
                        <label class="lbl"><p>Email:</p></label>
                    </div>
                </tr>
                <tr>
                    <div class="email">
                        <input type="email" name="Email" v-model="newUser.email" placeholder="Email"><br>
                        <span v-show="isError" >{{ emailMsg }}</span>
                    </div>
                </tr>
                <br>
                <tr>
                    <div class="try">
                        <label class="lbl"><p>Мобильный телефон:</p></label>
                    </div>
                </tr>
                <tr>
                    <div class="email">
                        <input type="text" name="Phone" v-model="newUser.phone" placeholder="Phone number"><br>
                        <span v-show="isError" >{{ phoneMsg }}</span>
                    </div>
                </tr>
                <br>

                <tr>
                    <div class="try">
                        <label class="lbl"><p>Город:</p></label>
                    </div>
                    <div class="select">
                        <select name="city" v-model="newUser.city">
                            <option value="" disabled selected hidden>Выберите город</option>
                            <option>Брест</option>
                            <option>Витебск</option>
                            <option>Гомель</option>
                            <option>Гродно</option>
                            <option>Минск</option>
                        </select>
                    </div>
                </tr>
                <BR></BR>
                <tr>
                    <div class="try">
                        <label class="lbl"><p>Пароль:</p></label>
                    </div>
                </tr>
                <tr>
                    <div class="password">
                        <input type="password" name="Password" v-model="newUser.password" placeholder="Password" maxlength="16" >

                    <br>
                    <span class="error_control" v-show="isError">
                            {{ passwordMsg }}
                        </span>
                        </div>
                </tr>
                <br>
                <tr>
                    <div class="try">
                        <label class="lbl"><p>Подтверждение пароля:</p></label>
                    </div>
                </tr>
                <tr>
                    <div class="password conf">
                        <input type="password" name="Password2" v-model="newUser.password2" placeholder="Repeat password" maxlength="16">
                        <br>
                        <span class="error_control" v-show="isError">
                                {{ passwordMsg2 }}
                            </span>
                    </div>
                </tr>
                <br>
                <br>

                <tr class="checkbox_tr">
                    <div class="checkbox">
                        <p>Я хочу получить рассылку о новых вакансиях</p><input type="checkbox" class = "chbox" id="chbox" v-model="newUser.mailing">
                    </div>
                </tr>

                <br>
                <tr>
                    <button :class="{active: disableBtn}" :disabled="disableBtn" @click.prevent="onSignUp">
                        Зарегестрироваться
                    </button>
                </tr>
                <span id="msg"></span>
            </table>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import Vuex from 'vuex'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import Regostration from './registration.vue'
    import validationService from '../../src/validation'
    import request from '../../src/api'

    export default {
        name: "registration",
        data() {
            return {
                newUser: {
                    name: '',
                    email: '',
                    phone: '',
                    city: '',
                    password: '',
                    password2: '',
                    mailing: false
                },
                isError: true,
                userMsg: '',
                emailMsg: '',
                passwordMsg: '',
                passwordMsg2: '',
                disableBtn: true,
                showMsg : true,
                btnMsg: '',
                phoneMsg: '',
            }
        },
        watch: {
            'newUser.name' : function (value) {
                if(validationService.requiredField(value)){
                    this.userMsg = '';
                }else{
                    this.userMsg = 'Поле обязательно';
                }
            },
            'newUser.email': function(value) {
                console.log(value);
                this.emailMsg = validationService.CheckEmail(value);
            },
            'newUser.phone': function (value) {
              console.log(value);
              if(!validationService.testPhone(value))
              {
                  this.phoneMsg = 'Неверный формат';
                  console.log(this.phoneMsg);
              }
              else{
                  this.phoneMsg = '';
              }
            },
            'newUser.password': function (value) {
                console.log(value);
                this.passwordMsg = validationService.CheckPswd(value);
                if(this.passwordMsg === '')
                {
                    if(!validationService.checkPasswordsMatch(this.newUser.password, this.newUser.password2)) {
                        this.disableBtn = false;
                        this.passwordMsg2 = '';
                    }else {
                        this.disableBtn = true;
                    }
                }
                else{
                    this.disableBtn = true;
                }
                console.log(this.disableBtn);
            },
            'newUser.password2': function (value) {
                console.log(value);
                this.passwordMsg2 = validationService.CheckPswd(value);
                if(this.passwordMsg2 === '')
                {
                    if(!validationService.checkPasswordsMatch(this.newUser.password, this.newUser.password2)) {
                        this.disableBtn = false;
                    }else {
                        this.passwordMsg2 = 'Пароли не совпадают';
                        this.disableBtn = true;
                    }
                }
                else{
                    this.disableBtn = true;
                }
                console.log(this.disableBtn);
            }
        },

        methods: {
            onSignUp(){
                const url = 'http://api.spidergrodno.tk/api/user/';
                const options = {
                    name: this.newUser.name,
                    email: this.newUser.email,
                    password: this.newUser.password,
                    password_confirmation: this.newUser.password2,
                    city: this.newUser.city,
                    phone: this.newUser.phone,
                    newsletter : this.newUser.mailing
                };
                let defaultUrl = '/check';
                if(this.newUser.name !== '' && this.newUser.email !== '' && this.newUser.city !== '' && this.newUser.password !== '' && this.newUser.password2 !== '') {
                    console.log('name : ', this.newUser.name,' email : ', this.newUser.email,' city : ', this.newUser.city,' passsword : ', this.newUser.password,' mailing : ',this.newUser.mailing );
                    request.postData(url, options, defaultUrl, function (msg) {
                        document.getElementById('msg').innerHTML = msg;
                        console.log(document.getElementById('msg').innerHTML);
                    });
                }
                else{
                    document.getElementById('msg').innerHTML = 'Не все поля заполнены!!! ';
                }
            }
        }
    }
</script>

<style scoped>
    .frame {
      height: 74.1vh;
    }

    table{
        table-layout: fixed;
        margin: auto;
        width: 40%;
        width: 550px;

    }
    p {
        color: black
    }


    .registration_cont {
        padding-top: 1px;
        background-color: #088ecc;
        background-image: url(/img/blue.jpg);
        background-position: center;
        background-attachment: fixed;
        padding-bottom: 40px;
        border-radius: 15px;
        width: 550px;
        margin: auto;


    }

    .container {
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

    tr{
        line-height: 0px;

    }



    input {
        border-radius: 5px;
        width: 250px;
        margin-top: 0px;
    }



    select {
        width: 250px;
        text-align: center;
        border-radius: 5px;
        height: 26px;
        color: black;
    }

    button {
        color: white;
        background-color: #EF7F35;
        width: 300px;
        border-radius: 5px;
        height: 40px;
        margin-left: 20px;
        border: none;
        box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.15);
        cursor: pointer;
        text-align: center;

    }

    button:active {
        transform: rotateY(2px);
    }

    button:hover{
        box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.5);
    }

    .try{
        text-align: left;
    }

    .checkbox{
        display: block;
        margin-bottom: 10px;
        width: 480px;
        padding-bottom: 10px;
        vertical-align: top;
        position: relative;


    }

    .try{
        margin: auto;
        max-width: 350px;
        padding-bottom: 5px;
        margin-bottom: -8px;
        font-size: 16px;
    }

    .login, .email, .select, .password{
        margin: auto;
        max-width: 350px;
        text-align: left;
    }

    input, select {
        width: 350px;
        border: none;
        padding-left: 5px;
        height: 35px;
        box-shadow: 1px 2px 4px 2px rgba(0,0,0,0.15);
        border-radius: 5px;
        color: black;
        background-color: #fff;
        outline: 0;



    }

    input:focus, select:focus, input:active, select:active{
        box-shadow: 0px 0px 3px 1.5px firebrick;

    }
    input:hover, select:hover {
        box-shadow: 0px 0px 4px 2px rgba(0,0,0,0.50);
    }

    .input:focus{
        border-color: inherit;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    select {
        width: 355px;
        display: inline-block;
        height: 35px;

        padding-left: 2px;
        padding-right: 2px;
        color: black;

    }
    select:checked, select:focus, select:active {
        color: black;
        box-shadow: none;
    }

    .error_control {
        float: left;
    }

    .checkbox {
        max-width: 360px;
        text-align: left;
        margin: auto;
        margin-top: 25px;


    }
    .checkbox input {
        width: 14px;
        vertical-align: bottom;
        margin-bottom: 15px;
        border-radius: 0;
        opacity: 1!important;
        position: absolute;
        left: 350px;
        top: -3px;
        background-color: none;
        box-shadow: none;


    }

    #chbox:focus, #chbox:focus, #chbox:active, #chbox:active{
        box-shadow: none;

    }



    option{

        color: black;
    }

    h2 {
        text-align: center;
        width: 350px;
    }
    p {
        color: white;
        font-size: 17px;
    }

    span {
        position: absolute;
        font-size: 14px;
        color: white;
        font-style: italic;
        opacity: 0.9;
    }
    input{
        margin-bottom: 0px;
        border: none!important;


    }


    br{
        display: block;
        margin: 10px 0;

        content: " ";
    }


    select {
        display: inline-block;
    }

    td{
        width: 250px;
        border: none;

    }

    .left_col {
        width: 130px;
        border-bottom: 1px solid white;
    }


    .checkbox p {
        display: inline-block;
        padding-right: 10px;

    }
    h2{
        color: white;
    }
    .checkbox p{
        font-size: 15px;
    }

    #msg {
      padding-top: 10px;
      position: relative;
    }
</style>
