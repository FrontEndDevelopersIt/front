<template>
    <div>


          <div class="img">
            <div class="imageExposit">
                    <img src="/img/exposit3.png" @click="mainPage()">
            </div>
            <div class="routerLink">
                    <p @click="mainPage()">Главная</p>
            </div>

            <div class="greetings" >
              <p class="text" v-show="!this.$store.state.tokenPresence">&#8222;Найти работу - легко!&#8221; </p>
              <p  class="text2" v-show="this.$store.state.tokenPresence">{{this.$store.state.helloAutorization  }}</p><p class="text3" v-show="this.$store.state.tokenPresence"><router-link to="/settings">  {{ this.$store.state.userInfo.name}}</router-link></p>
            </div>
            <div class="someBlock">
                <dropDown v-if="this.$store.state.tokenPresence"></dropDown>
                <div class="" v-if="this.$store.state.tokenPresence==false">
                <router-link to="/singIn">
                    <button class="button">Войти</button>
                </router-link>
                  </div>
                <div class="" v-if="this.$store.state.tokenPresence==false">
                <router-link to="/registration">
                    <button class="button">Регистрация</button>
                </router-link>
              </div>
            </div>



          </div>

        <div class="line bottom">
            <div class="line_bottom_container">
              <input type="search" name="" v-model="searchQuery" placeholder="Введите текст" @keyup.enter="searchActivator()">
              <button type="button" name="button" @click="searchActivator()"><p>Найти</p></button>
            </div>


            <div class="icon_bar">
              <span>Поделиться:</span>
              <social-sharing url="http://spidergrodno.tk/" inline-template>
                <div>
                    <network network="facebook">
                      <img src="img/Facebook.png" alt="">
                    </network>
                    <network network="googleplus">
                      <img src="img/Google+.png" alt="">
                    </network>
                    <network network="vk">
                      <img src="img/if_vk_1233017.png" alt="">
                    </network>
                    <network network="whatsapp">
                      <img src="img/WhatsApp.png" alt="">
                    </network>
                </div>
              </social-sharing>
            </div>
    </div>

    <!-- <div class="div">
      <div class="element">
        <div class="line bottom">
            <div class="line_bottom_container">
              <input type="search" name="" v-model="searchQuery" placeholder="Введите текст" @keyup.enter="searchActivator()">
              <button type="button" name="button" @click="searchActivator()"><p>Найти</p></button>
            </div>
            <div class="icon_bar">
            </div>
    </div>
      </div>
    </div> -->

    </div>
</template>




<script>
import dropDown from './dropDown.vue'
export default {
  name: 'myheader',
  data() {
    return {
      show: false,
      hello: "Найди работу мечты",
      helloAutorization: "",
    };
  },
  components: {
    dropDown
  },
  computed: {
    searchQuery: {
      set(value) {
        this.$store.commit("searchQuery", value)
      },
      get() {
        return this.$store.getters.searchQuery
      },

    }
  },
  methods: {
    searchActivator(){
      var x = this
      this.$router.push({name: 'page', params: {page: 1}});
      this.$store.dispatch('getVacancies')
    },
    hideProfile() {
      this.$store.dispatch('hideProfile')
    },
    mainPage(){
      this.$store.commit("searchQuery", null)
      this.$store.commit("employmentCommit", null)
      this.$store.commit("cityCommit", null)
      this.$store.commit("perPage", 10)
      this.$router.push({path: '/'});
      this.$store.dispatch('getVacancies', 1)
    },

  },

  watch: {
    'searchQuery'(value){
      if (value.length > 3){
        this.show = true
      }
      if (value.length < 3){
        this.show = false
      }
    }
  },
  created(){
      this.$store.dispatch('tokenChecker')
  if(this.$store.state.tokenPresence===true) {this.$store.dispatch('getUserInfo')}

  }

}
</script>

<style scoped>

    .header {
        display: flex;
        flex-direction: row;
        height: 80px;
        align-items: center;
        justify-content: space-around;
    }

    header p {
        color: white;
        cursor: pointer;
    }


    .reg>p {
        font-size: 20px;
        background-color: #ef7f35;
        padding: .5em 1.3em;
        border-radius: 5px;

    }


    .right_container {
        display: inline-block;
        float: right;
        margin-right: 20px;
        padding: 0px;
        width: 25%;
    }


    img {
        height: 50px;
        margin-right: 30px;
        cursor: pointer;
    }

    a:hover {
        text-decoration: none !important;
    }



    input[type=search] {
        box-shadow: none;
        border-bottom: none!important;


    }


      .search:active{
        background-color: rgb(237, 241, 237);
      }


    input[type=search]:active {
        border-bottom: none!important;
        box-shadow: none;

    }

    input[type=search]:focus {
        border-bottom: none;
        box-shadow: none;
    }


    .routersLinks {
        display: flex;
    }
    .routerLink {
        margin-left: 10px;
        padding-top: 14px;
    }
    .routerLink p{
      display: inline;
      color: white;
      cursor: pointer;
      font-size: 23px;
        font-weight: 300;


    }

    .routerLink p:hover {

      border-bottom: 2px dashed white;

    }

    .someBlock {
      display: flex;
        justify-content: flex-end;
        width: 40%;

    }
    .button {
        margin-left: 10px;
        line-height: 20px;
        background-color: #ef7f35;
        padding: .5em 1.3em;
        border: none!important;
        border-style: none;
        border-radius: 5px;
        color: snow;
        position: relative;

        height: 100%;
        font-size: 23px;
          font-weight: 300;

    }
    button{
      margin-right: 8px;
    }
    button:hover{
      transition: 0.2s;
      background-color: #fa995a;
    }
    button:active{
      background-color: #cb5b12;
      transform: translateY(-5px);
    }
    .imageExposit {
        height: 0;
    }


    .greetings{
      display: flex;
      flex-flow: row;
      justify-content: center;
      width: 50%;
      color: white;
      cursor: pointer;
      font-size: 23px;
        font-weight: 300;
    }

    .greetings p:first-child{
      margin-right: 10px;
      cursor: default;
      margin-left: 8px;
      color: black;

    }

    .greetings p:nth-child(2){
      font-weight: 400;



    }
    .greetings p:nth-child(2):hover{
      transition: 0.2s;
      font-weight: 400;


    }

    .greetings a{
      color: white;
    }







  .line{
    background: linear-gradient(0deg, rgba(98, 209, 245, 0.84), rgba(98, 209, 245, 0.84)), url("/img/header.jpeg");
    background-repeat: no-repeat;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: scroll;
    background-position: 0% 35%;
    border-top: 1px solid  #046595;
    border-bottom: 1px solid  #046595;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    padding-left: 20%;

  }
  input[type=search] {
        background-color: #ffffff;
        cursor: pointer;
        width: 100%;
        border: none;
        border-radius: 0px;
        font-weight: 300;
        margin: auto;
        padding-top: 5px;
      background-image:url(/img/search.svg);
      background-size: 28px 80%;
      background-repeat:no-repeat;
      background-position: 5px 5px;
      padding-left:35px;
      font-size:15px;
      height: 2.2em;


    }

  input[type=search]:focus {
      outline: none!important;
  }

  .line button {
    background-color: #046595;
    color:  inherit;
    border: none;
    font-size: 1.4em;
    display: inline-block;
    color: white;

}
.line p {
  display: inline;
}
button{
  white-space: nowrap;
}

button:hover{
  transition: 0.25s;
  filter: brightness(115%);
}
button:active{
  filter: brightness(85%);
  transform: translateY(-5px);
}

.line i {
  vertical-align: bottom;
}


.img {
  display: flex;
  background-color: #c1eaff;
background: linear-gradient(0deg, rgba(98, 209, 245, 0.84), rgba(98, 209, 245, 0.84)), url("/img/header.jpeg");
background-repeat: no-repeat;
background-size: cover;
background-attachment: scroll;
background-position: 0% 25%;
  flex-flow: row nowrap;
  width: 100%;
  min-height: 100px;
  max-height: 100px;
  display: flex;
  padding: 27px 27px;


}
img{
  display: inline-block;
}


button p{
  padding: 10px 17px;
  font-size: 20px;
  font-weight: 300;
}
.line_bottom_container{
  display: flex;
  width: 80%;
}
.icon_bar{
  width: 18%;
  vertical-align: middle;
  padding-top: 5px;
  justify-content: flex-end;
  display: flex;
}
.line a {

}
.line .img1{
  width: 32px;
  margin-right: -4px;
}

.line  .img4 {
  width: 40px;
  height: 20px;
  margin-left: -3px;
}


.line img {
  margin: 0px;
  margin-left: 12px;
  width: 21px;
  height: 20px;
}

.text2{
margin-right: 10px;
margin-left: 180%;

}
@media (max-width: 1500px){
.text2 {
  margin-left: 155%;
}

}
@media (max-width: 1570px){
.icon_bar span {
  display: none;
}

}

@media (max-width: 1300px){
.text2 {
  margin-left: 120%;
}

}
@media (max-width: 1300px){
.text2 {
  margin-left: 90%;
}

}
.text{
  padding-left: 35%;
}

.text3 a{
  border-bottom: 2px dashed white;
  display: inline;
}
.img {
   position:relative;
   z-index: 99;

}
.line_bottom{
  position: fixed;
  z-index: 999;
}

.element {
    position: fixed;
    z-index: 999;
    width: 100%;
    display: block;
}

.div {
    position: relative;
    z-index: 99;
      width: 100%;
      display: block;

}
.icon_bar{
  vertical-align: middle;
  height: 100%;
}
.icon_bar span {
    padding-top: 4px;
    padding-right: 10px;

    font-size: 1em;
    color: white;
}

</style>
