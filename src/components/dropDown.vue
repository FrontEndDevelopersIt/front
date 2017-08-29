<template>
    <div >
      <div class="">
        <div class="showButtonFlex" >
            <button id="showProfileButton" v-on:mouseover="showProfile()" >Профиль</button>
        </div>
        <div></div>
        <div class="" >

        <div class="profileBox" >
            <transition name="fade">
                <div class="profileFlex" v-if="show" >
                    <router-link to="/settings"><button>Настройки</button>
                    </router-link>
                    <router-link to="/favoriteVacancies"><button>Избранное</button></router-link>
                    <router-link to="/" ><button @click="tokenRemove()">Выйти</button></router-link>
                </div>
            </transition>
        </div>
          </div>
    </div>
        </div>
</template>


<script>
    export default {
        name: "dropDown",
        computed: {
              show() {
                return this.$store.state.show
              }
        },
        methods: {
            showProfile: function () {
                this.$store.dispatch('showProfile')
            },
            hideProfile(){
                this.$store.dispatch('hideProfile')
            },
            tokenRemove(){
                this.$store.dispatch('tokenRemove')
                this.$router.push({path: '/'});
                setTimeout(function() {
                  location.reload();
                }, 1000)

            }
        }
    }
</script>


<style>
    #showProfileButton {
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


    .profileFlex {
        display: block;
        flex-direction: column;
        position: absolute;
        margin-right: 30px;
        margin-top: 10px;
        box-shadow:  0 1px 10px 0 #6389b9;
        z-index: 1;
        width: 19vh;
        background-color: white;
        border-radius: 5px;
        font-size: 20px;
        font-weight: 300;

    }
    .profileFlex button {
        background-color: #039BE5;
        color: white;
        border: none;
        width: 100%;
        margin-bottom: 1px;
        padding: 10px 5px;

    }
    .profileFlex button:hover { background: rgb(127, 207, 255); }
    .profileFlex button:active { background: rgb(94, 126, 152); }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }


</style>
