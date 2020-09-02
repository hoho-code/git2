<template>
  <div id="app">
    <!-- <div id="nav"> -->
    <!-- <router-link to="/about">About</router-link>
    </div> -->

    <button type="button" class="btn btn-default" style="font-size:12px">
      <router-link to="/">回到首页</router-link>
    </button>
    <router-view />
  </div>
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
