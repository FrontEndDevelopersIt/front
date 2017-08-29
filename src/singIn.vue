<template>
<div>
  <div id="empty">
  </div>
    <div class="frame">
        <div class="label">
            <div class="container">
                <form class="singin-form">
                    <div class="auth-form-body">
                        <div class="try">
                            <h2>Sign In</h2>
                        </div>
                        <br>
                        <table class="singin-table">
                            <tr>
                                <td>
                                    <label for="login_field">Email address:</label>
                                </td>
                            </tr>
                            <tr>
                                <input v-model="user.mail" autofocus="autofocus" class="form-control input-block" id="login_field" name="login" tabindex="1" type="email" />
                            </tr>
                            <span v-show="isErrorMail">{{ emailMsg }}</span>
                            <br>
                            <tr>
                                <td>
                                    <label for="password">Password:
                                        <router-link to="/resetPassword"> <a class="label-link">Forgot password?</a></router-link>
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <input v-model="user.password" class="form-control form-control input-block" id="password" name="password" tabindex="2" type="password" />
                            </tr>
                            <span class="error_control" v-show="isErrorPswd">{{ passwordMsg }}</span>
                            <br>
                            <br>
                            <tr>
                                <input class="check" type="checkbox" v-model="user.remember">
                                <label @click.prevent="user.remember = !user.remember">Remember me</label>
                            </tr>
                            <tr class='tr'>
                                <input class="btn" data-disable-with="Signing in…" name="commit" tabindex="2" type="submit" value="Sign in" @click.prevent="onSingIn" />
                            </tr>
                            <span class="" v-show="showMsg">{{ btnMsg }}</span>

                        </table>
                    </div>
                </form>
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
    name: 'singIn',
    data() {
        return {
            user: {
                mail: '',
                password: '',
                remember: false
            },
            showSignOut: false,
            showForm: false,
            isErrorPswd: true,
            isErrorMail: true,
            emailMsg: '',
            passwordMsg: '',
            showMsg: true,
            btnMsg: '',


        }
    },
    watch: {
        'user.mail': function(value) {
            console.log(value);
            this.emailMsg = validationService.CheckEmail(value);
        },
        'user.password': function(value) {
            console.log(value);
            this.passwordMsg = validationService.CheckPswd(value);
        },
    },
    methods: {
        onSingIn() {
                let msg = '';
                const url = 'http://spidergrodno.tk:443/api/login';
                const options = {
                    email: this.user.mail,
                    password: this.user.password,
                    remember: this.user.remember
                };
                if (this.user.mail === '' || this.user.password === '') {
                    alert('All fields are required!!!')
                } else {
                    msg = request.postData(url, options, /*'/'*/ );
                    console.log(msg)
                }

                this.$router.push({path: '/'});

                setTimeout(function() {


                  location.reload();
                }, 1000)





            },

            getToken() {
                return localStorage.getItem('JWT');
            },

            SingOut() {
                const url = 'http://spidergrodno.tk:443/api/logout';
                let JWT = getToken();
                options = {
                    params: {
                        token: JWT
                    }
                };
                request.getData(url, options, '/');
                // localStorage.clear;
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
    padding: 20px 50px 50px 50px;
    color: white;
    width: 550px;
    border-radius: 10px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.15);
    background-image: url(/src/img/blue.jpg);
    background-position: center;
    background-attachment: fixed;
    z-index: 2;
}

.label {
    width: 550px;
    height: 200px;
    margin: 30px auto;
    text-align: center;
    border-radius: 20px;
    color: red;
    background-color: #EF7F35;
    box-shadow: 1px 2px 4px 2px rgba(0, 0, 0, 0.15);
    padding-left: 10px;
    z-index: 1;
}

h1,
h2 {
    font-weight: normal;
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

input {
    background-color: white;
    border-bottom-color: grey;
    border-radius: 10px;
    color: black;
    padding-left: 5px;
    border: none!important;
    padding-left: 5px;
    position: relative;
    height: 35px;
    box-shadow: 1px 2px 4px 2px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    color: black;
    background-color: #fff;
    margin-bottom: 0px;
    outline: 0!important;
}

.btn {
    background-color: #ff7f2b;
    margin: auto;
    width: 100px;
    height: 40px;
}

.input:focus {
    border-color: inherit;
    -webkit-box-shadow: none;
    box-shadow: none;
}

.btn {
    color: white;
    background-color: #EF7F35;
    width: 200px;
    border-radius: 5px;
    height: 40px;
    padding-left: 20px;
    border: none;
    box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    text-align: center;
}

.btn:active {
    transform: translateY(4)
}

.btn:hover {
    box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.3);
}

.tr {
    text-align: center;
}

.try {
    text-align: center;
    margin-right: 10px;
    margin-top: 0px;
}

span {
    color: white;
    font-style: italic;
    opacity: 1;
}

.top {
    margin-top: 40px;
}

.check {
    width: 14px;
    vertical-align: bottom;
    margin-bottom: 15px;
    border-radius: 0;
    opacity: 1!important;
    background-color: none;
    box-shadow: none;
}

</style>
