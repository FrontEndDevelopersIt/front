<template>
  <div class="container">
    <h4 id="activate"></h4>
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

  export default{
      name: 'activate',
      methods: {
          getTokenFromLink: function () {
              return this.$route.hash;
          },

          activateUser: function () {
              let token = this.getTokenFromLink();
              let str = token.replace(/[#]/g, '/')
              const url = 'http://api.spidergrodno.tk/api/user'+ str;
              console.log(this.$route.hash.replace(/[#]/g, '/'));
              request.getData(url, null, function (msg) {
                  document.getElementById('activate').innerHTML = msg;
                  console.log(url);
                  console.log(msg,document.getElementById('activate').innerHTML);
              })
          },

      },
      beforeMount()
      {
          this.activateUser();
      },

//      mounted(){
//          this.activateUser();
//      }
//      mounted: function () {
//          this.activateUser();
//      }

  }

</script>
<style scoped>
  .container {
    text-align: left;
    color: white;
    margin-top: 30px;
    padding: 20px 50px 20px 50px;
    color: white;
    width: 550px;
    border-radius: 10px;
    box-shadow: 2px 2px 2px 1px rgba(0,0,0,0.15);
    background-image: url(/img/blue.jpg);
    background-position: center;
    background-attachment: fixed;
    z-index: 2;

  }
  label{
    font-size: 100px;
    text-align: center;
  }
</style>







<!--if(error.response.data.errors.detail.email)-->
<!--{-->
<!--msg = error.response.data.errors.detail.email;-->
<!--}else {-->
<!--if (error.response.data.errors.detail.phone) {-->
<!--msg = error.response.data.errors.detail.phone;-->
<!--}else{if(error.response.data.errors.detail.email && error.response.data.errors.detail.phone ) {-->
<!--msg = error.response.data.errors.detail.email + error.response.data.errors.detail.phone;-->
<!--}else {-->
<!--msg = error.response.data.errors.detail;-->
<!--}}-->
<!--}-->