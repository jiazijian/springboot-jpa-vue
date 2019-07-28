<template>
<div>  
<div>
 
 <el-button round @click=addStudent()>添加</el-button>
<el-table
    :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
    border
    style="width: 100%">
    <el-table-column 
      type="index"
      label="序号"
      width="180">
    </el-table-column>
    <el-table-column 
      prop="id"
      label="id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码"
       width="180">
    </el-table-column>
    <el-table-column label="查看商品" width="180">
      <template slot-scope="scope">
         <!--  {{scope.row.id}} -->
           <el-button type="primary" @click= "findBooks(scope.row.id)"  icon="el-icon-search">查看商品</el-button>
        </template>
    </el-table-column>
     <el-table-column  label="操作" width="300" prop="id"> 
       <template slot-scope="scope">
         <!--  {{scope.row.id}} -->
           <el-button type="primary" @click= "updateStudent(scope.row.id)" icon="el-icon-edit">更新</el-button>
           <el-button v-popover:popover5 type="primary" @click= "deleteStudent(scope.row.id)" icon="el-icon-delete">删除</el-button>
        </template>
    </el-table-column>
  </el-table>
  </div>
  <!--分页 -->
  <div class="block">
  <el-pagination
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        :current-page="currentPage" 
        :page-sizes="pageSizes" 
        :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper" 
        :total="totalCount"
         background
   >
  </el-pagination>
</div>

</div>
</template>

<script>
export default {
  name: 'Students',
  data(){
      return{
      // 总数据
      tableData : [],
      // 默认显示第几页
      currentPage:1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount:1,
      // 个数选择器（可修改）
      pageSizes:[1,2,3,4],
      // 默认每页显示的条数（可修改）
      PageSize:3,

      visible2: false,
    
    }
  },
  updated(){
            this.findStudent();
            this.totalCount=this.tableData.length;
            this.getData(this.PageSize,this.currentPage) 
        },
  http: {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
      },    
  methods:{  
          findStudent: function () {
          var i_this = this;
          i_this.$http.post('http://localhost:8080/api/findAllStudent',
          {emulateJSON:true}
          ).then(function (response) {             
              var sdata = response.data;
              //console.log(sdata);
               this.tableData = sdata;           
            })
           
        },
        updateStudent : function(id){
          var u_this = this;
          var u_id = id;
          console.log( u_id)
          u_this.$http.post('http://localhost:8080/api/getStudent',
          {
              id: u_id,
          },
          {emulateJSON:true}
          ).then(function (response) {             
              var sdata = response.data;
              //console.log(sdata);
              u_this.$router.push(
                  { path: '/update',
                    query: {
                      student: sdata,
                    }
                  });
               
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        deleteStudent : function(id){
          var d_this = this;
          var d_id = id;
          console.log(d_id);
          d_this.$http.post('http://localhost:8080/api/delStudent',
          {
              id: d_id,
          },
          {emulateJSON:true}
          ).then(function (response) { 
              
              console.log(response.body);                      
              d_this.tableData = response.body;  
              alert("删除成功");            
            })
            .catch(function (error) {
              console.log(error);
            });
        },      
         addStudent : function(){
          var a_this = this;
          a_this.$router.push({ name: 'add'});
        },
        
        // 将页码，及每页显示的条数以参数传递提交给后台
        getData(n1,n2){
              var _this = this;
              // 这里使用axios，使用时请提前引入
              _this.$http.post('http://localhost:8080/api/findAllStudent',{
                   orgCode:1,
                   // 每页显示的条数
                   PageSize:n1,
                   // 显示第几页
                   currentPage:n2,
              },{emulateJSON: true},
              {
                headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
               }
               ).then(reponse=>{
                    console.log(reponse)
                    // 将数据赋值给tableData
                    this.tableData=data.data.body
                    // 将数据的长度赋值给totalCount
                    this.totalCount=data.data.body.length
               }) 
          },
        // 分页
        // 每页显示的条数
        handleSizeChange(val) {
            // 改变每页显示的条数 
            this.PageSize=val
            // 点击每页显示的条数时，显示第一页
            this.getData(val,1)
            // 注意：在改变每页显示的条数时，要将页码显示到第一页
            this.currentPage=1  
        },
          // 显示第几页
        handleCurrentChange(val) {
            // 改变默认的页数
            this.currentPage=val
            // 切换页码时，要获取每页显示的条数
            this.getData(this.PageSize,(val)*(this.pageSize))
        },

         findBooks: function (id) {
          var i_this = this;  
          var d_id = id;                       
          i_this.$router.push(
            { path: '/books',
              query:{
                id: d_id
              }
            }
          ) 
        }
        
  }
};
</script>
