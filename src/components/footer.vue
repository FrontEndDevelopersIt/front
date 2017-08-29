<template lang="html">
  <div class="">

      <div class="footer">
        <div class="info">

        </div>
        <div class="line">

        <div class="icon_bar">
            <a href="http://www.exposit.com/"><img class="img1" src="img/logotype.png" alt=""></a>
            <a href="https://ru-ru.facebook.com/expositds/"><img class="img2" src="img/fb-art.png" alt=""></a>
            <a href="https://vk.com/expositds"><img class="img3" src="img/ic_vk.png" alt=""></a>
            <a href="https://jobs.tut.by/employer/1681914"><img  class="img4" src="img/vectorpaint6.svg" alt=""></a>
        </div>
      </div>

      </div>
      <div class="line_2">
        <p>© 2012 - 2017 Exposit Digital Services. </p>
      </div>

  </div>
</template>

<script>
export default {
  name: 'footer',

}
</script>

<style scoped>

.footer {
  width: 100%;
  height: 100px;
  background-color: #56B3D4;
  margin-top: 200px;        display: flex;
          flex-direction: row;
          height: 80px;
          align-items: center;
          justify-content: space-around;
          margin-bottom: 0px;

}

  .line{
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;


  }

.icon_bar{

}

.line .img1{
  width: 38px;
  margin-right: -4px;
}

.line  .img4 {
  width: 45px;
  height: 23px;
  margin-left: -3px;
}



.line .img2{
  width: 25px;
  height: 23px;
}

.line .img3 {
  width: 25px;
  height: 23px;
}
.text{
  padding-left: 35%;
}

.text3 a{
  border-bottom: 2px dashed white;
  display: inline;
}
.line_2{
  width: 100%;
  background-color: #4799b6;

}
.line_2 p {
  padding: 0px;
  margin: 0px;
  font-size: 10px;
}
.info{
  display: block;
  height: 100%;
  color: white;
}
.line img {
  margin: 0px;
  margin-left: 12px;
  width: 21px;
  height: 23px;
}


</style>
