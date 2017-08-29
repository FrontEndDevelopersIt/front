<template>
<div>
  <modal v-if="showModal" @close="showModal = false"></modal>
    <div class="container">
        <div class="post">
            <div class="vacancy_name">
                <h4>{{vacancyDetails.title}}</h4>
                <div class='date'>{{date(vacancyDetails.date)}}</div>
            </div>
            <div class="footer_info">
                <div class="employment">
                    <span>
                     <i class="material-icons">work</i>Компания:
                     <p>{{vacancyDetails.company}}</p>
                    </span>
                </div>
                <div class="employment">
                    <span>
                    <i class="material-icons">location_on</i>Город:
                    <p>{{vacancyDetails.location}}</p>
                </span>
                </div>
                <div id="parallelogram_two"></div>
                <div class="employment">
                    <span>
                    <i class="material-icons">query_builder</i>Тип занятости: <p>{{vacancyDetails.employment}}</p>
                </span>
                </div>
                <div class="img">
                    <div class="img_wrapper">
                      <img v-if="vacancyDetails.logo" :src=vacancyDetails.logo>
                        <img v-else src="http://bellagambaam.weebly.com/uploads/7/2/5/0/72504765/1424977_orig.jpg">
                    </div>
                </div>
            </div>



            <div class="discription">
                <div class="full_description" v-html=vacancyDetails.description></div>
                <div class="links">
                    <div class="back" @click="goBack">
                        <p>Назад</p>
                    </div>
                    <div class="hover">
                        <a class="url" v-bind:href='vacancyDetails.url'>
                            <p>Перейти на страницу вакансии</p>
                        </a>
                    </div>
                        <div class="url fav" v-if="!switchButtonFavorite" @click="favorite(vacancyDetails.id)">
                            <p>Добавить в избранное</p>
                        </div>
                        <div v-if="switchButtonFavorite" class="url not" @click="unFavorite(vacancyDetails.id)">
                            <p>Убрать из изранных</p>
                        </div>
                </div>
                <div class="map" v-if="this.$store.state.vacancyCoordinates">
                    <gmap-map :center="center" :zoom="14" style="width: 100%; height: 450px;">
                        <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position"></gmap-marker>
                    </gmap-map>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>

import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import modal from './modal.vue'
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCPxHbMTNdS2FyQgibEYxOIKIl1Zyw2Sv8',
    }
})
export default {
    data() {
            return {
                show: null,
                switchButtonFavorite: false
            }
        },
        computed: {
            vacancyDetails() {
                    return this.$store.state.vacancyDetails
                },

                center() {
                    return {
                        lat: this.$store.state.vacancyCoordinates.lat,
                        lng: this.$store.state.vacancyCoordinates.lng,
                    }

                },
                markers() {
                    return [{
                        position: {
                            lat: this.$store.state.vacancyCoordinates.lat,
                            lng: this.$store.state.vacancyCoordinates.lng,
                        }
                    }]
                },
                showModal: {
                  set() {
                          this.$store.commit('showModal', false)
                      },
                      get() {
                          return this.$store.state.showModal
                      }
                }
        },
        components: {
          modal
        },
        methods: {
            date(n) {
                    var x = parseInt(n);
                    var d = new Date(x);
                    var month = d.getUTCMonth() + 1;
                    var day = d.getUTCDate();
                    var year = d.getUTCFullYear();
                    var newdate = day + "/" + month + "/" + year;
                    return newdate
                },
                goBack() {
                    window.history.back();
                },
                link(x) {
                    window.open(x);
                },
                favorite(favPost){
                  if(this.$store.state.tokenPresence===false){
                      this.$store.commit("showModal", true)
                  } else {
                      this.switchButtonFavorite = true
                      this.vacancyDetails.ip = true
                      this.$store.dispatch('favorite', favPost)
                }
              },
                unFavorite(favPost){
                  this.switchButtonFavorite = false
                   this.vacancyDetails.ip = false
                   this.$store.dispatch('unFavorite', favPost)
                },

                favoriteChecker(){
                  if(this.$store.state.vacancyDetails.ip === true) {
                    this.switchButtonFavorite = true
                  }
                  else if(!this.$store.state.vacancyDetails.ip){
                    this.switchButtonFavorite = false
                  }
                },

                mapLoader() {
                  this.show = true
                }

        },

        created: function() {
            if(this.$store.state.tokenPresence===true){this.$store.dispatch('getFavoriteVacancies')}
            this.$store.dispatch('vacancyDetails', this.$route.params.id)
            this.mapLoader()
        },
        updated: function(){
          this.favoriteChecker()
        }

}

</script>

<style scoped>

.post {
    background-color: #f2f9fe;
    margin: auto;
    position: relative;
    overflow: hidden;
    clear: both;
    box-shadow: rgba(166, 190, 205, .2) 0px 3px 0px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: 100%;

}

.container {
    border-left: 0px solid #039BE5;
    min-height: 1000px;
}

.vacancy_name {
    width: 100%;
    border-left: 9px solid #60abcd;
    padding-left: 15px;
    text-transform: capitalize;
    position: relative;
}

.vacancy_name>h4 {
    font-size: 25px;
    padding-left: 35px;
    float: left;
    padding-top: 15px;
    padding-bottom: 15px;
}

.footer_info {

    display: flex;
    background-color: #c1eaff;
background: linear-gradient(0deg, rgba(98, 209, 245, 0.84), rgba(98, 209, 245, 0.84)), url("/img/vacancyDetails.jpg");
background-repeat: no-repeat;
background-size: cover;
background-attachment: scroll;
background-position: 0% 29%;
    flex-flow: row nowrap;
    width: 100%;
    min-height: 100px;
    max-height: 100px;
    padding: 5px 0px 0px 0px;
    border-right: none;
    border-left: none;


}



.footer_info span {
    color: rgba(255, 255, 255, 1);
    overflow: hidden;
    letter-spacing: -0.2px;
    font-size: 18px;
    text-align: center;
    display: inline-block;
    font-weight: bold;
}

.footer_info i {
    color: #ff7300;
    vertical-align: bottom;
    margin-right: 5px;
    font-size: 30px;
}

.footer_info p {
    color: black;
    text-align: center;
    line-height: 20px;
    padding-right: 8px;
    padding-bottom: 40px;
    margin: 3px;
    letter-spacing: 0px;
    font-size: 17px;
    font-weight: normal;
}


.employment {
  padding-top: 13px;
    height: 100%;
    width: 35%;
    text-transform: capitalize;
    overflow: hidden;
    position: relative;
    vertical-align: bottom;
    line-height: 30px;
    text-align: center;
    vertical-align: middle;
}

.employment:nth-child(2) p{
padding-left: 15PX;
}

.employment:nth-child(2) span{
  padding-right: 20px;
}
.img {
    height: 100%;
    width: 30%;
}

.img_wrapper {
    position: relative;
}

img {
    box-shadow: rgba(0, 0, 0, 0.4) 5px 5px 4px;
    box-shadow: inset (0, 0, 0, 0.4) 5px 5px 4px;
    position: absolute;
    top: 80px;
    bottom: 0px;
    left: 0;
    right: 0;
    margin: auto;
    max-width: 150px;
    min-width: 80px;

}

.discription {
    padding-top: 20px;
    width: 85%;
    border-left: 9px solid #60abcd;
    line-height: 15px;
    padding: 15px 0px 15px 50px;
    padding-bottom: 100px;
    height: 100%;
    display: block;
}

.date {
    padding-bottom: 15px;
    float: right;
    padding-right: 40px;
    padding-left: 20px;
    padding-top: 15px;
    margin-top: 15px;
    background-color: #0768a1;
    vertical-align: middle;
    border-left: 6px solid #EF7F35;
    font-weight: bold;
    background: linear-gradient(0deg, rgba(98, 209, 245, 0.84), rgba(98, 209, 245, 0.84)), url("/img/vacancyDetails.jpg");
    background-repeat: no-repeat;

    background-attachment: scroll;
    background-position: 0% 50%;
}


.link {
    cursor: pointer
}
.link:hover span {
    opacity: 1;
}
.link>span {
    color: black;
    opacity: 0.4;
    font-size: 18px;
}
.link span i {
    vertical-align: bottom;
    margin-bottom: -4px;
    margin-right: 4px;
    font-size: 27px;
}
.full_description {
    margin-top: 20px;
    font-size: 18px;
    font-weight: 300!important;
    line-height: 23px;
}
.full_description>>>li {
    list-style-type: disc;
}
.url>p {
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    background-color: #ef7f35;
    padding: 10px 5px 10px 5px;
    border-radius: 5px;
    color: white;
    width: 250px;
    height: 60px;
    vertical-align: middle;
    line-height: 20px;
    margin-right: 20px;
}
.back>p {
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    background-color: #60ABCD;
    padding: 10px 0px 10px 5px;
    border-radius: 5px;
    color: white;
    width: 250px;
    height: 60px;
    padding-top: 24px;
}
.back {
    display: inline-block;
    float: left;
    vertical-align: middle;
    margin-right: 24px;
}
.url,
.next {
    display: inline-block;
    vertical-align: middle;
}
.fav>p {

    background-color: #48ad61;
    color: white;


}

.hover {
    display: inline-block;
}


.links p:hover{
  transition: 0.25s;
  filter: brightness(115%);
}

.links p:active{
  filter: brightness(85%);
  transform: translateY(-5px);
}

.hover b {
    opacity: 0;
    margin: 0px;
    padding: 0px;
}
.hover:hover b {
    opacity: 0.7;
    -webkit-transition-delay: ease 0.8s;
    transition: ease 0.7s;
}
.next_top i {
    text-decoration: none;
    border-radius: 14px;
    padding: 8px 9px;
    background-color: #039BE5;
    text-align: center;
    color: white;
    display: inline-block;
    margin-top: 10px;
}
.map {
    width: 100%;
    height: 300px;
    margin-bottom: 100px;
}

.not p{
  background-color: rgb(255, 207, 0);
}

.hover a:hover{
  text-decoration: none;
}


.links p {
width: 195px;

  }

@media (max-width: 1500px){
  .links p{
    width: 175px;
    font-size: 17px;
  }
  .container {
    width: 90%;
  }
}

@media (max-width: 1225px){

.container {
  width: 90%;
}

}
.vue-map-container{
  padding-bottom: 30px;
}
</style>
