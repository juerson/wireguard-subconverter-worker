### 一、部署到Cloudflare Workers或Pages

将`_worker.js`或`src/worker.js`的代码部署到Cloudflare Workers或Pages后，可以实现如下的功能：

- Cloudflare WARP（WireGuard）转换为 v2rayN 客户端的 wireguard 链接；
- Cloudflare WARP（WireGuard）转换为 NekoBox 客户端的 nekoray 链接。

使用注意：

1、不支持IPv6 CIDR的参数值传入（不支持IPv6地址），也不支持优选IP。

2、由于随机生成IP和随机获取PORT，每次网络请求，获取到内容都在变，导致节点链接也在变。

3、代码中wireguardParameters中的参数是warp普通账号的参数，建议更换成自己的参数（Plus账号、Zero Trust团队账号的参数）。

### 二、URL参数说明

#### 1、target参数(必须)：转换的目标（nekobox/nekoray、v2rayn/wireguard）
<img src="images\NekoBox订阅.png" />

<img src="images\v2rayN订阅.png" />

#### 2、cidrs参数(可选)：限制所有的IP来源哪个/哪些IPv4 CIDR中?
<img src="images\cidrs参数.png" />

#### 3、nodeSize参数(可选)：您想要多少条wiregaurd/nekoray链接？

<img src="images\nodeSize参数.png" />

#### 4、ipSize、portSize参数(可选)：
指定生成的IP个数（默认生成1000个），以及要使用多少个端口（默认使用54个端口中的10个端口）

<img src="images\ipSize、portSize参数.png" />

### 三、v2rayN、NekoBox客户端使用截图

<img src="images\v2rayN客户端中使用.png" />

<img src="images\NekoBox客户端中使用.png" />

### 四、相关软件

##### 1、NekoBox

PC端：https://github.com/MatsuriDayo/nekoray

移动端：https://github.com/MatsuriDayo/NekoBoxForAndroid

##### 2、v2rayN（PC端）：https://github.com/2dust/v2rayN

##### 3、v2rayNG（移动端）：https://github.com/2dust/v2rayNG
