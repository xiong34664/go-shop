## 商城项目

前台由mui框架,后台由node.js+mysql实现的网上商城系统

### 使用

商城基于node & npm，所以这两个工具必不可少。

1. 执行命令`npm i`安装依赖
2. 将/docs 下的letao初始化.sql 导入数据库
3. 在/models/db.js 下配置数据库密码
```js
const pool  = mysql.createPool({
    host : '127.0.0.1', //数据库地址
    user : 'root',      //用户名
    password : '****',  //数据库密码
    database : 'letao'  //数据库名
});
```
4. 执行命令`npm start`启动商城 默认端口号为3000
5. 前台页面为 loclhost:3000/m
6. 后台页面为 loclhost:3000/pc
