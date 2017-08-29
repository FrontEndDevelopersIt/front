<template>
      <div class="icon_star">
            <a href="#"  v-if="vacancy.favorite===true"  @click.prevent="unFavorite(vacancy.id)">
                <i   v-bind:style="{ color: activeColor}"  class="material-icons">star</i>
            </a>
            <a href="#"  v-else-if="col"  @click.prevent="unFavorite(vacancy.id)">
                <i   v-bind:style="{ color: activeColor}"  class="material-icons">star</i>
            </a>
            <a href="#" v-else-if="!vacancy.favorite" @click.prevent="favorite(vacancy.id)">
                <i  v-bind:style="{ color: passiveColor}" class="material-icons">star_border</i>
            </a>
            <a href="#" v-else-if="!col" @click.prevent="favorite(vacancy.id)">
                <i  v-bind:style="{ color: passiveColor}" class="material-icons">star_border</i>
            </a>
      </div>
</template>




<script>
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
export default {
    name: 'favorite',
    props: ['vacancy'],
    data(){
      return {
        isFavorited: false,
        activeColor: null,
        passiveColor: null,
        col: null
      }
    },
    computed:{
      tokenPresence(){
        return this.$store.state.tokenPresence
      },
    },

    methods: {
        favorite(favPost) {
            if(this.$store.state.tokenPresence===false){
                this.$store.commit("showModal", true)

            } else {
                this.passiveColor = "#f79859"
                this.activeColor = "#f79859"
                this.vacancy.favorite = true
                this.$store.dispatch('favorite', favPost)
          }
        },
          unFavorite(favPost) {
            this.passiveColor = "#f79859"
            this.activeColor = "gray"
            this.vacancy.favorite = false
             this.$store.dispatch('unFavorite', favPost)
           },

      },
}


</script>

<style scoped>

.icon_star i{
  color: #f79859
}
.icon_star {
  position: relative;
      display: inline-block;

}
.tooltiptext {
display: none;
width: 120px;
color: black;
text-align: center;
border-radius: 6px;
padding: 5px 0;
position: absolute;
bottom:  -3px;
z-index: 0;
margin-left: -250px;
font-weight: 300px;
font-size: 15px;


}
.tooltiptext span{
  text-transform: none;
}
.tooltiptext b {
 border-bottom: 1px dashed black;
}

  .icon_star:hover .tooltiptext{
    display: block;

}


</style>
