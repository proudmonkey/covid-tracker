<template>
  <div class="social">
    <facebook :url="url" title="Check the latest status update on COVID-19 here:" scale="2"></facebook>
    <twitter :url="url" title="Check the latest status update on COVID-19 here:" scale="2"></twitter>
    <linkedin :url="url" title="Check the latest status update on COVID-19 here:" scale="2"></linkedin>
    <email :url="url" subject="Check the latest status update on COVID-19 here:" scale="2"></email>
  </div>
</template>

<script>
import { Facebook, Twitter, Linkedin, Email } from 'vue-socialmedia-share';
export default {
  components: {
    Facebook,
    Twitter,
    Linkedin,
    Email
  },
  data() {
    return {
      url: "https://ncov-stats.azurewebsites.net"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.social > span {
  padding: 1em;
}
</style>
