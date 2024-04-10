### 一、部署到Cloudflare Workers或Pages

##### Workers部署：

将`_worker.js`或`src/worker.js`的代码复制到worker中（在线编辑代码，覆盖worker.js文件的内容）。

##### Pages部署：

将`_worker.js`文件(不能修改为其它文件名，使用src/worker.js的代码，文件名就改为`_worker.js`)下载到本地电脑，单独放到一个文件夹中(自己手动创建一个，名称最好是字母、数字的)，然后在该文件夹路径下，执行`git init`命令(需要安装git工具)自动生成隐藏`.git`文件夹(不能手动创建)，最后将整个文件夹上传到cloudflare中，就能部署成功。

将`_worker.js`或`src/worker.js`的代码部署到Cloudflare Workers或Pages后，可以实现如下的功能：

- Cloudflare WARP（WireGuard）转换为 v2rayN 客户端的 wireguard 链接；
- Cloudflare WARP（WireGuard）转换为 NekoBox 客户端的 nekoray 链接。

使用注意：

1、不支持IPv6 CIDR的参数值传入（不支持生成IPv6地址），也不支持优选IP。

2、由于随机生成IP和随机获取PORT，每次网络请求，获取到内容都在变，导致节点链接也在变。

3、代码中wireguardParameters中的参数是warp普通账号的参数，建议更换成自己的参数（Plus账号、Zero Trust团队账号的参数）。

4、不支持Android端的NekoBox。

### 二、URL参数说明

#### 1、target参数(必须)：转换的目标（nekobox/nekoray、v2rayn/wireguard）
<img src="images\NekoBox订阅.png" />

<img src="images\v2rayN订阅.png" />

#### 2、cidrs参数(可选)：限制所有的IP来源哪个/哪些IPv4 CIDR中?
<img src="images\cidrs参数.png" />

#### 3、nodeSize参数(可选)：您想要多少条wiregaurd/nekoray链接？默认300条。

<img src="images\nodeSize参数.png" />

#### 4、ipSize、portSize参数(可选)：
指定生成的IP个数（默认生成1000个），以及要使用多少个端口（默认使用54个端口中的10个端口）

<img src="images\ipSize、portSize参数.png" />

### 三、v2rayN、NekoBox客户端使用截图

<img src="images\v2rayN客户端中使用.png" />

<img src="images\NekoBox客户端中使用.png" />

### 四、相关软件

##### 1、NekoBox：https://github.com/MatsuriDayo/nekoray

##### 2、v2rayN：https://github.com/2dust/v2rayN

##### 3、v2rayNG：https://github.com/2dust/v2rayNG
