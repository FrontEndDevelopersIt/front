
<template>

<div>
    <div class="column">
        <div class="filt">
            <div class="filt_title">
            </div>
            <div class="filt_by_city">
                <p>Город:</p>
                <div class="bloc">
                   <router-link :to= "{name: 'page', params: {page: 1}}">
                    <select type="text" name="city" class="select_by_city" size="6" v-model="city"  v-on:click="cityFunc(city)">
                        <option value="Брест"> Брест ({{this.brest}})<img src="/img/right.png"></option>
                        <option value="Витебск"> Витебск ({{this.vitebsk}})</option>
                        <option value="Гомель"> Гомель ({{this.gomel}})</option>
                        <option value="Гродно"> Гродно ({{this.grodno}})</option>
                        <option value="Минск">Минск ({{this.minsk}})</option>
                    </select>
                  </router-link>
                </div>
            </div>
            </div>
            <div class="filt">
            <div class="filt_by_employment">
                <p>Тип занятости:</p>
                <div class="bloc">
                  <router-link :to= "{name: 'page', params: {page: 1}}">
                    <select type="text" name="employment" class="select_by_employment" size="6" v-model="employment" v-on:click="employmentFunc(employment)" >
                        <option value="Полная занятость"> Полная занятость</option>
                        <option value="Частичная занятость"> Частичная занятость</option>
                        <option value="Проектная работа"> Проектная работа</option>
                        <option value="Стажировка"> Стажировка</option>
                    </select>
                  </router-link>
                </div>
            </div>
        </div>
        <div class="filt statistics">
            <span>Всего вакансий:</span> <b>{{this.$store.state.totalVacancies}}</b>
            <br>
        <span class="on_Page">На странице:</span>
    <select class="select_count_page" v-model="pageValue" v-on:change="vacancyCountSwitcher(pageValue)">
        <option>10</option>
        <option>30</option>
        <option>50</option>
      </select>
        </div>


    </div>
</div>

</template>

<script>

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
export default {
    name: 'filtration',
    data() {
        return {
            id: null,
            cityMassive: [],
            employmentMassive: [],
            brest: '',
            grodno: "0",
            vitebsk: '',
            gomel: '',
            minsk: '',
        }
    },
    computed: {
        city: {
            set(value) {
                    this.$store.commit("cityCommit", value)
                },
                get() {
                    return this.$store.getters.city
                }
        },
        employment: {
            set(value) {
                    this.$store.commit("employmentCommit", value)
                },
                get() {
                    return this.$store.getters.employment
                }
        },
        pageValue: {
            set(value) {
                    this.$store.commit('perPage', value)
                },
                get() {
                    return this.$store.state.perPage
                }
        }

    },
    methods: {
        vacancyCountSwitcher(pageValue) {
                this.$store.commit("perPage", parseInt(pageValue))
                this.$store.dispatch('getVacancies')
                if (this.$route.params.page > 1){
                    this.$router.push({path: '/1'})
                }
            },

            cityFunc(city) {
                if (this.$store.state.city == this.cityMassive[0]) {
                    this.$store.commit("cityCommit", null)
                    this.$store.dispatch('getVacancies')
                    this.cityMassive.shift()
                } else {
                    this.$store.commit("filterIndicator", true)
                    this.$store.commit("searchQuery", null)
                    this.$store.commit("cityCommit", city)
                    this.$store.dispatch('getVacancies')
                    this.cityMassive.shift()
                    this.cityMassive.push(city)
                }
            },

            employmentFunc(employment) {
                if (this.$store.state.employment == this.employmentMassive[0]) {
                    this.$store.commit("employmentCommit", null)
                    this.$store.commit("filterIndicator", false)
                    this.$store.dispatch('getVacancies')
                    this.employmentMassive.shift()
                } else {
                    this.$store.commit("filterIndicator", true)
                    this.$store.commit("searchQuery", null)
                    this.$store.commit("employmentCommit", employment)
                    this.$store.dispatch('getVacancies')
                    this.employmentMassive.shift()
                    this.employmentMassive.push(employment)
                }
            },
            getVacancies() {
                this.$store.commit("filterIndicator", true)
                this.$store.dispatch('getVacancies')
            },

    },
    mounted: function(){
    this.brest = localStorage.getItem('Брест')
    this.vitebsk = localStorage.getItem('Витебск')
    this.minsk = localStorage.getItem('Минск')
    this.gomel = localStorage.getItem('Гомель')
    this.grodno = localStorage.getItem('Гродно')


    }

}

</script>

<style scoped>

input {
    width: 50%;
    padding: 20px;
    color: black;
    opacity: 2!important;
    left: 0px!important;
    position: relative!important;
    min-width: 50px;
}

.filt {
    background-color: white;
    overflow: hidden;
    padding-top:0px;
    margin-left: 35px;
    margin-top: 35px;
    width: 200px;
    vertical-align: middle;
    text-align: center;
}



.filt_title {
    padding: 0px;
    margin: 0px;

}

select {
    display: inline-block;

}



select option:hover {
    border-color: #FF771E;
    border-bottom-color: #039BE5;
    cursor: pointer;
}

select option:active {
    background-color: #E55D03;
    color: white;
    border-color: #FF771E;
}

select option:hover,
select option:focus,
select option:active,
select option:checked {
    color: white !important;
    background: linear-gradient(#039BE5, #039BE5);
    background-color: #039BE5 !important;
}

.select_by_employment {
    height: 159px;
}

.select_by_city {
    height: 190px;
}



.filt_by_employment p {
    font-size: 17px;
    color: black;
}

.filt_by_city {
    padding: 0px;
    margin: 0px;
}

.bloc {
    display: inline-block;
    overflow: hidden;
}

.bloc select {
    margin-right: 20px;
    padding-right: 50px;
    margin: -5px 40px -5px -10px;
    width: 300px;
    font-size: 14px;
    color: #039BE5;
    padding-bottom: 0px;
}

option {
  margin-top: 0px;
    background-color: white;
    margin-bottom: 2px;
    color: black;
    font-weight: 300;
    font-size: 15px;
    border-bottom: 4px solid #f5f1f1;
    margin-left: 4px;
    padding: 6px;
    width: 100%;

}


button {
    background-color: #039BE5;
    border: none;
    font-size: 18px;
    font-weight: 300;
    border-radius: 10px;
    padding: 6px 15px;
    color:  inherit;
    box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 0.1);
    vertical-align: bottom;
    float: left;
    margin-left: 15px;
}

.delete {
    padding: 0px;
    background-color: #ff771e;
    float: left;
    margin-left: 12px;
}

.delete>i {
    padding: 3px 3px 5px 3px;
    vertical-align: bottom;
}

@keyframes bounce {
    0% {
        transform: scale(0);
    }
    80% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}

.bounce-enter-active {
    animation: bounce .5s;
}

.bounce-leave-active {
    animation: bounce .5s reverse;
}




p {
    margin-top: 2px;
    font-size: 19px;
    border-radius: 3px;
    font-weight: 400;
    color: black;
    margin-bottom: 5px;
    letter-spacing: -1.3px;
    line-height: 30px;
    position: relative;
    padding: 0px 8px;
    padding-bottom: 2px;
    font-weight: 300;
    opacity: 1;
    margin-left: 1px;
    width: 98.5%;
    box-shadow: 0px 0px 3px 1px #039BE5;
    border-color: #039BE5;
    border-left: 6px solid #039BE5;
    text-align: left;
}

p:hover {
    box-shadow: 0px 0px 3px 1px #E55D03;
border-left: 6px solid #EF7F35;

}


.statistics {
    height: auto;
    padding: 15px 5px 15px 20px;
    text-align: left;
    box-shadow: 0px 0px 2px 1px #E55D03;
}
.statistics:hover {
  box-shadow: 0px 0px 3px 2px #E55D03;
}

.statistics b {
    float: right;
    margin-right: 22px;
}

option p {
    float: right;
}

.select_count_page {
    width: 50px;
    height: 28px;
    float: right;
    vertical-align: top;
    margin-bottom: 10px;
}

.on_Page {
    line-height: 27px;
}


@media screen and (max-width: 1300px){
  select {
    width: 70%;
  }
.filt  {
    width: 170px;
  }
  .statistics{
    padding: 0px;
  }
.statistics span{
  display: block;
  text-align: center;
}
.statistics b {
  display: block;
  width: 100%;
  margin: 0px;
  text-align: center;
}
.statistics select {
  text-align: center;
  margin-right: 57px;
}
}



.filt_by_city, .filt_by_employment {
  margin: 0px;
  padding: 0px;
  background: none;

}
.filt_by_city p{
  padding-bottom: 5px;
  margin: 0px;
  margin-top: 0px;
  padding-top: 5px;
  background: none;
  width: 100%;
  height: 100%;

  box-shadow:  0px 0px 2px 1px rgba(0, 0, 0, 0.1);
  border-radius: 0px;
}

.filt_by_employment p {
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 0px;
  margin-top: 0px;
  background: none;
  width: 100%;
  height: 100%;
  box-shadow: none;
  box-shadow:  0px 0px 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 0px;
}


select {
  margin: 0px;
}

.select_by_city, .filt_by_employment{
  margin: 0px;
  padding: 0px;
}
option:first-child{
    padding-top: 10px;
    border-top: 10px solid #F5F0F0;

}
.filt_by_city option {
    padding-left: 10px;
}

option p{
 float: right;
 padding-left: 30px;
}
</style>
