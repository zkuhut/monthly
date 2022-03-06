## 前言
初学docker后尝试使用容器部署了自己的博客，主要使用到了docker中比较基础的东西，以此文记录分享，有改进或不当之处还望大佬们指出

## 整体示意图
个人开发的博客主要有以下几个部分：
* blog-page：博客页面前端
* blog-backend：博客后端API
* blog-mysql：博客数据库
* blog-admin：博客管理系统前端

docker部署的整体结构如下：
![](https://blog-1256056666.cos.ap-guangzhou.myqcloud.com/img/202202082120397.jpg)

* 使用Nginx容器进行反向代理各个域名
* 使用network连接博客应用容器，方便使用mysql host连接mysql
* 使用容器部署各个应用，包括静态页面（使用[serve](https://github.com/vercel/serve#readme)托管）

## 使用nginx-proxy
ngxin容器使用了[nginx-proxy](https://github.com/nginx-proxy/nginx-proxy)进行部署，它可以自动生成和管理反向代理相关的配置。比如（摘自官方例子）：  
启动一个ngxin-proxy容器
```
docker run -d -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro nginxproxy/nginx-proxy
```
再启动一个想要代理域名的容器，比如foo.bar.com域名
```
docker run -e VIRTUAL_HOST=foo.bar.com  ...
```
即可实现反向代理的效果，更具体的使用可以参考官方文档，这里不再赘述

## 创建network
部署前创建了network，后端应用可以通过mysql host连接mysql
```
docker network create blog-network
```
同时nginx-proxy也要加入此网络
```
docker network connect blog-network nginx-proxy
```

## blog-mysql容器
```
docker run -d \
--network blog-network --network-alias blog-mysql \
-e MYSQL_ROOT_PASSWORD=【你的初始数据库密码】 \
-e MYSQL_DATABASE=blog \
-e MYSQL_ROOT_HOST=172.%.%.% \
--name 【容器名称】 \
mysql/mysql-server:8.0
```
使用容器部署博客的数据库，除了network相关的配置，还可通过环境变量设置初始密码、初始数据库名称、可接受的host。

## blog-backend容器
我使用的是springboot作为后端框架，为了在network中使用mysql host作为数据库地址，故jdbc设置了`blog-mysql`进行连接
```
spring.datasource.url=jdbc:mysql://blog-mysql:3306/blog?serverTimezone=Asia/Shanghai
```
其他启动命令就比较常规了
```
sudo docker run -d -p 【端口映射】:【端口映射】 \
--network blog-network \
--name 【容器名称】 \
-e VIRTUAL_HOST=【你的域名】 \
【镜像】
```

## blog-page容器
博客页的容器启动也比较常规
```
docker run -d -p 【端口映射】:【端口映射】 \
--network blog-network \
--name 【容器名称】 \
-e VIRTUAL_HOST=【你的域名】 \
【镜像】
```
## blog-admin容器
我的管理端是一个SPA应用，是静态文件，这里通过[serve](https://github.com/vercel/serve#readme)起一个服务端口进行托管。
```
docker run -d -p 【端口映射】:【端口映射】 \
--network blog-network \
--name 【容器名称】 \
-e VIRTUAL_HOST=【你的域名】 \
【镜像】
```

## 使用docker-compose一键部署
部署一个博客应用就需要跑这么多docker run，那么能不能一键部署呢？于是发现了docker-compose这个工具，通过docker-compose文件，就可以一次跑需要多个container的应用。根据上方的run参数，配置了如下compose文件
```
version: '3.9'
services:
  blog-mysql:
    image: mysql/mysql-server:8.0
    container_name: 【容器名称】
    networks:
      blog-network:
        aliases:
          - blog-mysql
    environment:
      - MYSQL_ROOT_PASSWORD=【你的初始数据库密码】
      - MYSQL_DATABASE=blog
      - MYSQL_ROOT_HOST=172.%.%.%
    volumes: # 可在初次启动容器时导入sql
      - ./blog.sql:/docker-entrypoint-initdb.d/blog.sql
  blog-backend:
    image: 【后端应用镜像】
    container_name: 【容器名称】
    ports:
      - "【端口映射】:【端口映射】"
    networks:
      - blog-network
    environment:
      - VIRTUAL_HOST=【你的域名】
  blog-page:
    image: 【博客端应用镜像】
    container_name: 【容器名称】
    ports:
      - "【端口映射】:【端口映射】"
    networks:
      - blog-network
    environment:
      - VIRTUAL_HOST=【你的域名】
  blog-admin:
    image: 【博客管理端应用镜像】
    container_name: 【容器名称】
    ports:
      - "【端口映射】:【端口映射】"
    networks:
      - blog-network
    environment:
      - VIRTUAL_HOST=【你的域名】
# 使用已定义的network
networks:
  blog-network:
    external: true
    name: blog-network
```
在准备好network、镜像、初始sql情况下，即可使用`docker-compose up -d`一键部署一个博客应用了。再进一步，可以通过shell脚本拉取仓库代码、创建network、构建镜像、启动docker-compose完成一系列操作。shell脚本就不在这里献丑了。

## 结语
以上是在初学docker后尝试的一点实践，都是在单机上进行的操作，使用的也都是比较基础的docker特性，过程也了解了很多知识，比如是否将mysql部署在容器上（这一方面还被n年前的营销文误导了）、如何初始化导入数据等等。目前不足之处也有还未对mysql做自动化的备份等等

有可改进之处还望大佬们指出

## 参考资料
[Automated Nginx Reverse Proxy for Docker](http://jasonwilder.com/blog/2014/03/25/automated-nginx-reverse-proxy-for-docker/)  
[MySQL Docker Container Tutorial: How to Set Up & Configure](https://phoenixnap.com/kb/mysql-docker-container)  
[知乎——在docker容器中开数据库，是否合适？](https://www.zhihu.com/question/42976239/answer/2185416127)  
[serve--github](https://github.com/vercel/serve#readme)  
[無法遠端連接MySQL：message from server: "Host xxx is not allowed to connect to this MySQL server"](https://www.ewdna.com/2011/09/mysqlmessage-from-server-host-xxx-is.html)  
[Networking in Compose--docker](https://docs.docker.com/compose/networking/#multi-host-networking)  
[Import data.sql MySQL Docker Container--stackoverflow](https://stackoverflow.com/a/43880563)  

