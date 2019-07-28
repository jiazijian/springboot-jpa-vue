
<template>

  <div class="login">   
    {{ message }}<br/>
    <el-input v-model="username"  type="text" placeholder="用户名" style="width:300px;"></el-input><br>
     <el-input v-model="password"  type="password" placeholder="密码" style="width:300px;"></el-input><br>
    <el-button v-on:click="login" type="primary">登陆</el-button>
  </div>
</template>

<script>
    export default {
      name: "Login",
      data() {
        return {
          message: 'Vue 登陆',
          username: '',
          password: ''
        }
      },
      http: {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
      },
      methods: {
        login: function () {
          var _this = this;
          console.log(_this.username+_this.password);
          _this.$http.post('http://localhost:8080/api/login', {
                username: _this.username,
                password: _this.password
          },{emulateJSON:true}
          )
            .then(function (response) {
              console.log(response.data);
              var errorcode = response.status;
              if (response.bodyText == _this.username) {
                 alert('登陆成功');
                _this.$router.push(
                  { path: '/index',
                    query: {
                      user: response.data,
                    }
                  });
              } else {
                alert(response.bodyText);
                _this.$router.push(
                  { path: '/' 
                  
                  });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }

    }
</script>

<style scoped>

</style>
