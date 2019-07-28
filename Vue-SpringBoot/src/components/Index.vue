<template>
  <el-container>
  <el-header>当前登陆账号：{{this.$route.query.user}}</el-header>
  <el-container>
    
    <el-main> <el-button v-on:click="findStudent" type="primary" round>人员管理</el-button></el-main>
  </el-container>
</el-container>

</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: 'welcome',
    }
  },
 
  http: {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
      },
  methods: {
        findStudent: function () {
          var i_this = this;
          i_this.$router.push({ path: '/students' });      
        },
        
          findBook: function () {
          var m_this = this;
          m_this.$http.post('http://localhost:8080/api/findAllBook',{emulateJSON:true}
          ).then(function (response) {
              console.log(response.data);
              m_this.$router.push(
                  { path: '/book',
                    query: {
                      books: '1',
                    }
                  });
               
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      
      }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
</style>
