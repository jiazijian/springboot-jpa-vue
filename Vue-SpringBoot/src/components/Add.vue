
<template>

  <div class="demo-input-size">   
    <h2>{{ message }}</h2><br/>

    <el-input v-model="username" placeholder="用户名" style="width:300px;"></el-input><br/>
    <el-input v-model="password" placeholder="密码"  style="width:300px;"></el-input><br/>
    <el-button type="primary" @click=back>返回</el-button>
    <el-button type="primary" @click= "add" >添加</el-button>
  </div>


</template>

<script>
    export default {
      name: "Add",
      data() {
        return {
          message: '添加用户',
          username: '',
          password: ''
        }
      },
      http: {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
      },
      methods: {
        add: function () {
          var _this = this;
          console.log(_this.username+_this.password);
          _this.$http.post('http://localhost:8080/api/addStudent', {
                username: _this.username,
                password: _this.password
          },{emulateJSON:true}
          ).then(function (response) {
                 if(response.data==''){
                    alert('用户名重复');
                    _this.$router.push({ name: 'add'});
                 }else{
                   alert('添加成功');
                 _this.$router.push(
                  { path: '/students',
                    query: {
                      student: response.data,
                    }
                  });               
                 }
                 
            })
            
        },
       back: function () {
          var i_this = this;
          i_this.$http.post('http://localhost:8080/api/findAllStudent',
         
          {emulateJSON:true}
          ).then(function (response) {             
              var sdata = response.data;
              //console.log(sdata);
              i_this.$router.push(
                  { path: '/students',
                    query: {
                      student: sdata,
                    }
                  });
               
            })
            .catch(function (error) {
              console.log(error);
            });
        },
      }

    }
</script>

<style scoped>

</style>
