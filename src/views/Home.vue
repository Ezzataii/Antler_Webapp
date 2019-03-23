<template>
  <b-container id="page" >
    <b-jumbotron id="text" header="Antler." lead="Advertising at your fingertips">
    </b-jumbotron>
  </b-container>
</template>

<script>


export default {
  name: "Home",
  props: {

  },

  data() {
    return {
    };
  }
};
</script>

<style scoped>
#page {
  background-image: url("../assets/Home.jpg");
  background-repeat: no-repeat;
  background-color: #40bdb7;
  border-radius: 15px;
  width: 1000vw;
  height: 500px;
}

#text {
  padding-top: 350px;
  background: transparent;
}
</style>
