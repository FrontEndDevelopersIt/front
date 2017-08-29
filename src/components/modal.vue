<template >
  <transition name="modal">
  <div class="modal-mask"  @click="$emit('close')">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <slot name="header">
           <p>Для добавления вакансии в избранное вам необходимо <br> <router-link to="/singIn"><b>войти</b></router-link> или <router-link to="/registration"><b>зарегистрироваться</b></router-link></p>
           <div class="button">
           </div>
          </slot>
        </div>
        <button class="modal-default-button" @click="$emit('close')">
          OK
        </button>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: "modal",

}

</script>

<style lang="css" scoped>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 500px;
  min-height: 150px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  background-color: rgba(255, 255, 255, 0.85);
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.modal-header {
  text-align: center;
}
p {
  color: rgb(0, 0, 0);
  font-size: 19px;
  line-height: 27px;
}
b {
  border-bottom: 1px dashed black;
  cursor: pointer;
  color: rgb(0, 0, 0);
}

button{
  margin: auto;
  display: block;
  background-color: #e68403;
color:  inherit;
border: none;
font-size: 1.4em;
border-radius: 10px;
padding: 9px 15px 7px 15px;
box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 0.1);
}

a:hover {
  text-decoration: none!important;
}
button:hover{
  transition: 0.25s;
  filter: brightness(115%);
}
button:active{
  filter: brightness(85%);
  transform: translateY(-5px);
}
</style>
