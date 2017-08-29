
<template>

<div>

  <div class="line">
    <div class="container">
      <div class="text">
        <p>Город:</p>
      </div>
      <div class="filt_by_city">
      <router-link :to= "{name: 'page', params: {page: 1}}">
              <select type="text" name="city" class="select_by_city" size="1" v-model="city"  v-on:click="cityFunc(city)" >
                <option :value="null" disabled hidden > Выберите город<img src="/img/right.png"></option>
                  <option value="Брест"> Брест<img src="/img/right.png"></option>
                  <option value="Витебск"> Витебск</option>
                  <option value="Гомель"> Гомель</option>
                  <option value="Гродно"> Гродно</option>
                  <option value="Минск" > Минск </option>
              </select>
            </router-link>
      </div>

      <div class="text">
        <p>Тип занятости:</p>
      </div>
<div class="filt_by_employment">
      <router-link :to= "{name: 'page', params: {page: 1}}">
        <select type="text" name="employment" class="select_by_employment" size="1" v-model="employment" v-on:click="employmentFunc(employment)" >
      <option :value="null" disabled hidden > Выберите тип занятости</option>
            <option value="Полная занятость"> Полная занятость</option>
            <option value="Частичная занятость"> Частичная занятость</option>
            <option value="Проектная работа"> Проектная работа</option>
            <option value="Стажировка"> Стажировка</option>
        </select>
      </router-link>
    </div>
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
    name: 'filtrationMini',
    data() {
        return {
            id: null,
            cityMassive: [],
            employmentMassive: [],
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
                this.$store.commit("perPage", pageValue)
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
            }
    }

}

</script>

<style scoped>

.line {
  min-width: 100%!important;
  display: flex!important;
  justify-content: space-between;
  padding: 7px;
}

select {
  width: 90%;
  display: inline-block;
  color: black;
}
option {
    background-color: #F7FCFF;
    margin-bottom: 2px;
    width: 90%;
    color: black;
    font-weight: 300;
    border-bottom: 1.5px solid #E5E5E5;
    margin-left: 4px;
    padding: 6px;
}

.container {
  display: flex;
  flex-wrap: nowrap;

}

.text{
  margin-right: 10px;
}
.filt_by_city, .filt_by_employment{
  width: 100%;
}
p {
  white-space: nowrap;
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


</style>
