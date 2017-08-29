<template>
    <div>
        <br>
        <div class="pagination">
                  <div class="left">
                      <div class="pagination_left pag" v-show="this.$route.params.page > 1">
                      <router-link :to= "{name: 'page', params: {page: this.$route.params.page-1}}">
                              <i><img src="img/left.png" alt=""></i>
                      </router-link>
                       <div class="buffer" v-if="this.$route.params.page <= 3"></div>
                       </div>
                     <div class="buffer_left"></div>
                  </div>

                  <div class="pagination_midl">
                      <div class="pagination_mid">

                      <ul>
                          <li v-if='this.$route.params.page >= 4' >
                      <router-link :to= "{name: 'page', params: {page: 1}}">
                              <a href="#" class="wrap_a">1</a>
                  </router-link>
                          </li>

                          <li class="dots" v-if='this.$route.params.page >= 4'>
                              <router-link :to= "{name: 'page', params: {page: 1}}">
                              <a class="transition" v-if='this.$route.params.page != 1'>...</a>
                                 </router-link>
                          </li>

                          <li v-if="this.$route.params.page >= 4" ></li>
                          <li class = "pagin_mid" v-for="(page, index) in pages" >
                              <router-link :to= "{name: 'page', params: {page: page}}">
                              <a class="wrap_a" :class="{pot: col == page}" >
                                  <a  >{{page}}</a>
                              </a>
                              </router-link>
                          </li>

                          <li v-if="this.$route.params.page < (this.totalPages - 3)" >
                              <a style='display: none'>
                              </a>
                          </li>

                          <li  class="dots" v-if="this.$route.params.page < (this.totalPages - 3)" >
                                <router-link :to= "{name: 'page', params: {page: this.totalPages}}">
                              <a  class="transition " >...</a>
                              </router-link>
                          </li>

                          <li v-if="this.$route.params.page < (this.totalPages - 3)">
                          <router-link :to= "{name: 'page', params: {page: this.totalPages}}">
                          <a  >
                              <a class='wrap_a'>{{totalPages}}</a>
                          </a>
                              </router-link>
                          </li>
                      </ul>
                      </div>
                  </div>

                      <div class="right">
                       <div class="buffer_right"></div>
                  <div class="pagination_right pag" v-if="this.$route.params.page < this.totalPages">
                     <router-link :to= "{name: 'page', params: {page: parseInt(this.$route.params.page) + parseInt(1)}}">


                          <i><img src="img/right.png" alt="" style= 'color: white'></i>

                          </router-link>
                  </div>

                      <div v-else>
                          <div class="transition_nav"></div>
                      </div>

                      </div>
    </div>
</div>

</template>


<script>
import mainPage from './mainPage.vue'
export default {
    name: "pagination",
    data: function() {
        return {
            el: 1,
            current: 1,
        }
    },
    props: {
        col: {
            type: Number,
            default: 1
        },
        dot: {
            type: Number,
            default: 1
        }
    },
    components: {
        mainPage
    },
    computed: {
        rangeEnd: function() {
            var end = this.col + 2
            return (end < this.dot) ? end : this.dot
        },
        pages() {
            var pages = []
             for(var i = this.rangeStart; i <= this.rangeEnd; i++) {
                pages.push(i)
            }
            return pages
         },

         rangeStart() {
             var start = this.col - 2
             return (start > 0 ) ? start : 1
         },
         totalPages() {
            return this.$store.state.totalPages
        },
    },

}
</script>



<style scoped>

    .pagination {
        width: 70%;
        margin: auto;
        display: flex;
        flex-flow: nowrap;
    }
    .pagination_mid {
        flex-flow: nowrap;
        justify-content: center;
        display: flex;
    }

    .pagination_left {
        float: left;
        padding-left: 10px;

    }
    .pagination_right {
        float: right;
        justify-content: flex-end;
        padding-right: 10px;
    }

    .pag  i {
        text-decoration: none;
        border-radius: 14px;
        padding: 8px 9px;
        background-color: #039BE5;
        display: block;
        text-align: center;
        margin-bottom: 20px;
        color: white;

    }


    .transition_nav {
        margin-left: 200px;
    }
    .pag {
        padding-top: 6px;
        padding-bottom: 0px;
        opacity: 0.80;

    }
    .pag:hover {
        opacity: 1;
    }

    .wrap_a>a:hover {
        text-decoration: none;
    }


    .wrap_a {
        border: 1px solid #D3D1D8;
        opacity: 1;
        border-radius: 7px;
        box-shadow: inset rgba(0,0,0,.1) 0 0 2px;
        text-decoration: none !important;
        opacity: 1;
        background-color: #FFFFFF;
    }
    a{
        display: block;
        width: 40px;
        height: 40px;
        padding-top: 2.5px;
    }
    a:hover {
        text-decoration: none !important;

    }

    .pot {
        border-color: #02AAFC;
    }
    .wrap_a:hover {
        transition: 0.20s;
        background-color: rgba(255, 255, 255, 0.18);
    }

    .wrap_a:active {
        box-shadow: inset rgba(0,0,0,.6) 0 0 2px;

    }

    .dots {
        line-height: 50px;
        vertical-align: bottom;
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        }

    .transition{
        border: none;
        box-shadow: none;
        opacity: 1;
        padding: 0px;
        display: inline-block;
    }

    .transition:hover{
        border: none;
        box-shadow: none;

        color: none;
        opacity: 1;

    }




    img{
      color: white;
    }


    @media screen and (min-width: 1400px){
    .pagination_mid {
      max-width: 800px;
      min-width: 800px;
    }

    }
    @media (max-width: 1400px){
      .pagination_mid {
        min-width: 650px;
        max-width: 650px;
      }
    }

    @media (max-width: 1200px){
      .pagination_mid {
        min-width: 400px;
        max-width: 400px;
        margin-left: 50px;
      }
    }
    @media only screen and (max-width: 800px) {
      .pagination_mid{
        color: red;
        background-color: red;
      }
    }



</style>
