<template lang="html">
  <div class="mainPage">


  <div class="" v-on:mouseover="hideProfile()">
    <div class="oops" v-if="showError"><p  :style="notification">{{myResolvedValue}}</p> </div>
    <div class="container">
      <div v-if="" :id=vacancy.id  class="vacancy" v-for="(vacancy, index) in favoriteVacanciesPerPage" v-show="vacancy.id">
        <router-link :to="{name: 'vacancy', params: {id: vacancy.id , index: index-1}}">
          <div class="top_cont">
            <div class="square">
            </div>
            <div class="triangle"></div>
          </div>
          <div class="main_cont" :id=vacancy.id >
            <div class="vacancy_img_wrap">
              <img v-if='vacancy.logo' v-bind:src=vacancy.logo  />
              <img v-else src="/img/worklogo.png" >
            </div>
            <div class="vacancy_cont">
              <div class="vacancy_header">
                <div class="vacancy_name">
                  <router-link :to="{name: 'vacancy', params: {id: vacancy.id}}">{{vacancy.title }}
                  </router-link>
                </div>
                <div class="icon_star">
                   <a href="#"  @click.prevent="deleteFavoriteVacancy(vacancy.id)">
                        <i v-bind:id=vacancy.id class="material-icons">clear</i>
                    </a>

                </div>
              </div>
              <div class="discription">
                <p class="description_body" v-html=vacancy.description></p>
              </div>

              <div class="vacancy_bottom">
                <span class="ex first_ex">
                        <i class="material-icons">work</i> {{vacancy.company}}
                    </span>
                <span class="ex first_ex">
                        <i class="material-icons">room</i>{{vacancy.location}}
                    </span>

                <div class="ex pro">

                  <span class="link">
                            <i class="material-icons">view_headline</i>Подробнее
                        </span >
                    <div class="square_button"></div>
                </div>
            </div>
            </div>
        </div>
          </router-link>
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

  Vue.use(Vuex)
  Vue.use(VueAxios, axios)
  var token = localStorage.getItem('JWT')
  axios.defaults.headers.common['Authorization'] = "Bearer " + token
  axios.defaults.headers.common['X-CSRF-Token'] = token
  axios.defaults.headers.common['Accept'] = 'application/json'

  import {apiDomain, filtration, allVacancy, search, favorite} from '../config.js'

export default {
  name: 'favoriteVacancies',
  data(){
    return {
      favoriteVacanciesPerPage: [],
      notification:{
        fontSize: "17px",
        height: "40px",
        padding: "10px",
        color: "black",
      }
    }
  },
  asyncComputed: {
  myResolvedValue() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('Избранных вакансий не найдено...'), 1000)
    })
  }
},
  computed: {
    showError(){
      if(this.favoriteVacanciesPerPage.length==0) {return true}
      else {return false}
    },
  },
 methods: {
   hideProfile() {
     this.$store.dispatch('hideProfile')
   },
   deleteFavoriteVacancy(idVacancy){
     var x = this.favoriteVacanciesPerPage
     for(var i=0; i<x.length; i++ ){
       if(x[i].id === idVacancy){
         x[i].id = false
         this.favoriteVacanciesPerPage.splice(i,1)
         this.$store.dispatch('unFavorite', idVacancy)
       }
}
   },
   getVacancies(){
     if (this.$store.state.tokenPresence === true) {
        this.getFavoriteVacancies()
       } else {
           this.$router.push({path: '/singIn'})
       }
     },

    getFavoriteVacancies() {
        axios.get(favorite).then((response) => {
           this.favoriteVacanciesPerPage = filter(response.data)
           function filter(arr) {
          var f = []
          return arr.filter(function(n) {
          return f.indexOf(n.id) == -1 && f.push(n.id)
        })
      }
     }, (err) => {
       console.log(err)
                 })
       },
 },
   created() {
     this.getVacancies()
   },

 }
</script>

<style scoped>
.mainPage {
  height: 100vh;
  background-color: #f5f0f0;
}

.vacancy {
  background-color: rgba(252, 252, 252, 0.9);
  margin-bottom: 20px;
  position: relative;
  padding-left: 0px;
  overflow: hidden;
  border-radius: 6px;
  box-shadow: rgba(166, 190, 205, .2) 0px 3px 0px;
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  margin-left: 70px;
  box-sizing: border-box;
  margin-top: 20px;
  width: 90%;
  height: 237px;

}



.main_cont {
  width: 100%;
  box-shadow: rgba(166, 190, 205, .5) 2px 3px 2px;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
}


.vacancy:hover {
  box-shadow: rgba(166, 190, 205, .4) -1px 3px 0px;
  background-color: #ffffff;
  transform: scale(1.003);
  transition: 0.1s
}


.vacancy:hover .square {
  background-color: #02aafc;
  width: 17%;
  margin-left: -7px;
  left: 2px;
  transition: 0.5s;
}



.vacancy:hover .top_cont {
  width: 100%;
  transition: 0.7s;
  border-bottom: 3px solid #02aafc;
}


.vacancy_img_wrap {
  display: flex;
  position: relative;
  margin-right: 20px;
  margin-bottom: 40px;
  background-color: #ffffff;
  height: 100%;
  max-width: 18%;
    min-width: 18%;
    padding: 0px 15px;
}

img {

 max-width: 70%;
 margin: auto;
 margin-bottom: 100px;
 padding-top: 10px;
 box-shadow: rgba(0, 0, 0, 0.2) 5px 5px 4px;




}

.vacancy:hover img {
  transition: 0.2s;
}


.discription>p {
  font-weight: 300;
}


.top_cont {
  border-bottom: 3px solid #028cd1;
  width: 100%;
  height: 20px;
  background: #F5F0F0;
  display: flex;
}


.vacancy_cont {
  margin: 5px;
  height: 100%;
  padding: 5px;
  padding-left: 0px;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -ms-text-overflow: ellipsis;
}


.vacancy_header {
  width: 100%;
  margin-top: 15px;
  height: 22px;
  font-weight: bold;
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  font-size: 13px;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -ms-text-overflow: ellipsis;
  font-size: 20px;
  display: flex;
  flex-flow: row nowrap;
}

.vacancy_name {
  width: 95%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -ms-text-overflow: ellipsis;
  font-size: 20px;
}


.icon_star {
  width: 5%;
  float: right;
  color: #d18e12;
}

.icon_star>i:hover {
  color: #FFDF00;
}



.vacancy_name>a:-webkit-any-link {

  text-decoration: none;
  color: black;
  font-weight: 300;
  white-space: nowrap;
  padding-left: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -ms-text-overflow: ellipsis;
}

.vacancy_name:hover {
  transition: all .2s ease;
  cursor: pointer;
}

.discription {
    width: 100%;
  margin-right: 60px;
  overflow: hidden;
  padding-right: 40px;
  display: flex;
  max-height: 120px;
}




.ex {
  font-size: 1.1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #a4a7a8;
  height: 100%;

  width: 40%;
}



.ex:hover i{
  color: #F57921;
  transition: 0.3s;

}
.ex:active i{
  transition: none;
  color: #F57921;
  line-height: 15px;
}

.first_ex{
  font-size: 1.1em;
}
.first_ex:hover  {
  color: #F57921;
  transition: 0.2;
}

i {
  vertical-align: bottom;
}

.vacancy_bottom {
    width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-flow: row nowrap;
  padding-top: 12px;

}



.a {
  display: inline-block;
  line-height: 23px;
}


.pro {

  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -ms-text-overflow: ellipsis;
}

.ex>i {
  color: #4677af
}


.link {
  float: right;
  color: white;
  opacity: 0.8;
  vertical-align: middle;
  font-weight: 300;
  margin-bottom: 5px;
  background-color: #058fd2;
  border-radius: 20px;
  font-size: 1.3em;
  padding: 6px 9px 6px 9px;
  letter-spacing: -0.7px;
}



.link>i {
  color: white;
  font-size: 1.3em;
  margin-top: 0px;
  vertical-align: bottom;
  line-height: 20px;

}

.pagination {
  margin-bottom: 100px;
  white-space: nowrap;
  display: flex;
}


.pag_button {
  background-color: antiquewhite;
  width: 120px;
  border-radius: 13px;
  padding: 15px;
  margin: auto;
}




.square {
  background: #039BE5;
  width: 18%;
  height: 20px;
}

.triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 20px 20px 20px;
  border-color: transparent transparent #039BE5;
  margin-left: -20px;
}

discription>p {
  color: black;
  text-decoration: none !important;
  border-bottom: none;
}

discription>p:hover {
  text-decoration: none !important;
  border-bottom: none;
}

span {
  color: black;
}



a:-webkit-any-link {
  color: black;
  cursor: auto;
  text-decoration: none !important;
  text-decoration-line: none;
  text-decoration-style: initial;
  text-decoration-color: initial;
}


.link:active {
  padding: 6px 11px;
  transition: 0.06;
}

.vacancy_cont:active {
  <pagination v-bind: col='parseInt(this.$route.params.page)';
  transition: 0.05;
}

.square p {
  margin: 0;
  padding-left: 10px;
  color: white;
}


.section_1 {
  width: 20%;
}

.section_2 {
  float: left;
  width: 80%;

}
.description_body>>>i{
  font-weight: 300!important;
}
.description_body>>>strong {
  font-style: normal;
  font-weight: normal;
}

.description_body>>>li:after {
  content: "; "!important;
}

.description_body>>>li {
  display: inline;
}

.description_body>>>ul {
  margin: 0;
}

.description_body>>>ul li {
  display: inline;
  margin-right: 5px;
}

.description_body>>>p {
  margin: 5px;
}

.description_body>>>b{
  font-weight: 300!important;
}

.description_body>>>strong {
  font-weight: 300!important;
}
.oops {
  margin: auto;
  display: block;
  text-align: center;
}
.oops>p {
  height: 61vh;
  font-size: 14px;
  margin-top: 70px;

}

.icon_star i{
  color: black
}
.icon_star {
  position: relative;
      display: inline-block;

}


  .icon_star:hover .tooltiptext{
    display: block;
    transition: 3s;
}


.link:hover i {
  color: white;
}



@media screen and (max-width: 1200px){
.vacancy {
  max-width: 800px;
  mix-width: 800px;
}

}
.line{
  min-width: 100%;
  display: none;
}


@media screen and (max-width: 1000px){
.section_1{
display: none;
}

.section_1{
  min-width: 100%;
}
.vacancy{
  min-width: 100%;
}

.line{
  display: block;
}


}

@media screen and (max-width: 1300px){
  .description_body {
    height: 45px;
  }
  .vacancy {
    height: 190px;
  }
}


</style>
