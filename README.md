# wireguard-subconverter-worker

免费在 Cloudflare Workers / Pages 中，搭建在线 WireGuard 订阅转换平台。专门为 WARP 制作的 WireGuard 转 `wireguard://` 分享链接、转 `nekoray://` 分享链接、转 Clash 配置文件订阅、转 Hiddify 的 JSON 配置文件订阅。

### 一、部署教程

部署前，建议将 `_worker.js`中的 `wireguardParameters` 参数改为自己的 `WireGuard` 配置的参数，然后按照下面不同方式，部署到 `Cloudflare` 中。

- Cloudflare Workers

将 `_worker.js` 的代码复制到您的 `cloudflare worker` 应用程序中，替换掉原来的 `worker.js` 代码，部署。

- Cloudflare Pages

将`_worker.js`的代码下载到本地电脑，文件名称要一样，不能修改，然后在文件外面套一层文件夹，也就是将 `_worker.js` 下载到一个空文件夹中，然后使用 git 工具，在这个文件夹的路径中执行 `git init` 命令，最后将这个文件夹以zip格式压缩，或者直接以文件夹的形式上传到 `Cloudflare Pages` 中，完成部署。

##### (可选) 添加访问密码

为了防止别人知道你的网站地址，使用您的 `Cloudflare WARP` 账号的流量，您可以选择性添加订阅链接的访问密码。

<details>
<summary>点击展开，在workers中设置访问密码</summary>
	<img src="images\workers中设置变量.png" />
</details>

<details>
<summary>点击展开，在pages中设置访问密码</summary>
	<img src="images\pages中设置变量.png" />
</details>

如果设置了访问密码，在订阅链接中没有传入或传入的`pwd` 值与  `PASSWORD` 值不相同时，无法获取订阅地址的订阅内容。

```
https://a.abc.workers.dev/sub?pwd=<这里添加你设置的访问密码>&target=clash
```

如果没有设置访问密码，可以将pwd的参数省略：

```
https://a.abc.workers.dev/sub?target=clash
```

### 二、支持转换的目标客户端

将 `_worker.js`或`src/worker.js` 的代码部署到 Cloudflare Workers / Pages 后，可以实现如下的功能：

<img src="images\转换流程图.png" />

- Cloudflare WARP（WireGuard）转换为 [v2rayN](https://github.com/2dust/v2rayN)、[v2rayNG](https://github.com/2dust/v2rayNG) 客户端使用的 `wireguard://` 链接；
- Cloudflare WARP（WireGuard）转换为 [NekoBox](https://github.com/MatsuriDayo/nekoray) 客户端使用的 `nekoray://` 链接，Android 版的 NekoBox 不支持使用。
- Cloudflare WARP（WireGuard）转换为适配 clash.meta / mihomo / clash rev 内核的 Clash 配置文件订阅，经过测试支持 [hiddify-next](https://github.com/hiddify/hiddify-next)、[clash-verge-rev](https://github.com/clash-verge-rev/clash-verge-rev)、[clash-nyanpasu](https://github.com/LibNyanpasu/clash-nyanpasu)、[ClashMetaForAndroid](https://github.com/MetaCubeX/ClashMetaForAndroid) 客户端使用，如果发现无法联网使用，可以尝试修改 Clash 配置文件头部的 dns 字段的内容。
- Cloudflare WARP（WireGuard）转换为 [hiddify-next](https://github.com/hiddify/hiddify-next) 的 JSON 配置，可能出现闪退的情况，重新打开Hiddify使用即可。

### 三、使用注意

- 1、不支持**Android版**的NekoBox。
- 2、代码中`wireguardParameters`中的参数是**WARP普通账号**的参数，建议更换成自己的参数（Plus账号、Zero Trust团队账号的参数）。
- 3、如果订阅URL链接中，没有传入`file=1` 或 `file=true`参数，**每次网络请求/更新订阅**，都会随机生成不同IP和不同PORT，导致生成不同`wireguard`节点，故每次更新订阅，**就能更换新的`wireguard`节点使用**。
- 4、转为 Hiddify 的 JSON 配置，在 Hiddify 客户端中`点击连接`时，可能出现 **Hiddify 程序闪退问题**，只要 JSON 的配置没有语法错误，**重新打开 Hiddify 程序就能使用**，如果想解决闪退问题，可以尝试修改生成的节点数量，可以从外部传入nodeSize参数，限制节点数量(代码里面也有限制 Hiddify 的节点数量的，nodeSize 超出对应的数量，节点数量不会随 nodeSize 增加而增加)。
- 5、**生成的订阅都不能使用**，可能是下面的问题导致的。
- + 可能是**WARP账号问题**，建议更换真实可靠的`wireguardParameters`的参数值；
  + Clash、Hiddify中，可能是配置文件的 **dns 有问题**（dns服务地址，在当地网络中，被污染或被墙）；
  + 可能是**MTU值出问题**（通常不会有问题，只会影响网速）
  + - 可以尝试修改 [MTU](https://github.com/juerson/wireguard-subconverter-worker/blob/4e27b8c474870ca7501365e3be80781607370c7b/src/worker.js#L30) 的值，参考[这里](https://gist.github.com/nitred/f16850ca48c48c79bf422e90ee5b9d95)的表格酌情修改，修改后，网络不是立刻变好，同理，网速也不是立刻提升，需要联网一会。
    - 注意：在代码中修改mtu值（也就是统一修改），可能导致其它客户端无法正常使用，推荐从URL订阅链接中，传入mtu参数来修改mtu值。
- - **可能Endpoint的IP被墙了，导致无法使用，**这个无解。

### 四、URL参数说明

| 参数                | 含义                                                         | 例子                                                         |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| target              | （必须）转换成的目标                                         | target=nekobox 或 nekoray、v2rayn 或 wireguard、clash、hiddify |
| pwd                 | （必须/可选）访问订阅内容的密码，如果您在 cloudflare 中设置了`PASSWORD` 变量值(访问密码)，这个参数是必须的。 | pwd=???，密码等于您在 cloudflare 后台设置的`PASSWORD` 变量值 |
| nodeSize            | （可选）您需要多少条节点。注意：不能准确控制 Hiddify 的节点数，里面还有一层数量限制（最多70*2=140个、200个） | nodeSize=100，100个节点，默认为300                           |
| loc/location        | （可选）你想要哪种IP？us => 162开头的IP；gb => 188开头的IP。该参数对IPv6地址无效。 | loc=us、loc=gb                                               |
| detour              | （可选）绕行/迂回代理、链式代理，获取 us/gb 的IP定位，只能搭配 `target=hiddify` 使用。 | target=hiddify&detour=on                                     |
| mtu                 | （可选）修改 WirGuard 节点中的 mtu 的值。                    | mtu=1280，或者 `1280~1500` 之间的数，默认1280                |
| version/cidrversion | （可选）默认选择使用IPv4 CIDRs生成IP地址，也可以选IPv6 CIDRs生成IP地址，注意：version和cidrs参数设置不对，会导致无法生成IP地址。 | version=4，选择IPv4的CIDR<br>version=6，选择IPv6的CIDR       |
| cidrs               | （可选）使用自定义的 cidr ，不使用内置的 cidrs ，支持多个 cidr ，以逗号隔开、字符串形式传入。注意：cidrs传入的cidrs版本必须与version的版本一致，也就是，传入IPv4的cidrs，version就必须等于4的，传入IPv6的cidrs，version就必须等于6的。 | cidrs=162.159.192.0/24<br>cidrs=162.159.192.0/24,162.159.193.0/24<br>cidrs=2606:4700:d0::/48&version=6 |
| ipSize              | （可选）从所有 cidrs 中随机生成多少个不重复的IP，一定程度上可以控制节点生成的数量。 | ipSize=500，生成500个IP地址，默认为1000                      |
| portSize            | （可选）从 ports 的54个端口中随机生成多少个不重复的 port ，一定程度上可以控制节点生成的数量。 | portSize=5，随机选择54个port的5个，默认为10                  |
| file                | （可选）选择使用优选的IP文件，生成订阅                       | file=true、file=1                                            |
```
https://a.abc.workers.dev/sub?target=nekoray
https://a.abc.workers.dev/sub?target=nekoray&loc=us
https://a.abc.workers.dev/sub?target=clash&loc=gb
https://a.abc.workers.dev/sub?target=hiddify
https://a.abc.workers.dev/sub?target=hiddify&detour=on
https://a.abc.workers.dev/sub?target=hiddify&detour=on&loc=us
https://a.abc.workers.dev/sub?target=clash&mtu=1280
https://a.abc.workers.dev/sub?target=wireguard&nodeSize=100
https://a.abc.workers.dev/sub?target=wireguard&nodeSize=100&mtu=1280
https://a.abc.workers.dev/sub?target=hiddify&ipSize=200&portSize=5
https://a.abc.workers.dev/sub?target=hiddify&ipSize=200&portSize=5&cidrs=162.159.192.0/24,162.159.193.0/24
https://a.abc.workers.dev/sub?target=clash&version=6 # 使用ipv6的cidr生成IP地址
https://a.abc.workers.dev/sub?target=clash&version=6&cidrs=2606:4700:d0::/48,2606:4700:d1::/48 # 传入ipv6的cidr,并且要指定version=6
https://a.abc.workers.dev/sub?target=nekoray&file=1 # 使用WARP优选IP的文件数据，生成订阅
```

#### 1、target参数(必须)：

转换的目标客户端：nekobox/nekoray、v2rayn/wireguard、clash、hiddify

<details>
<summary>点击展开，转换为 nekobox/nekoray 的图片</summary>
	<img src="images\NekoBox订阅.png" />
</details>

<details>
<summary>点击展开，转换为 v2rayn/wireguard 的图片</summary>
	<img src="images\v2rayN订阅.png" />
</details>

<details>
<summary>点击展开，转换为 clash 的图片</summary>
    <img src="images\clash.mate订阅.png" />
</details>

<details>
<summary>点击展开，转换为 hiddify 的图片</summary>
    <img src="images\hiddify订阅.png" />
</details>

#### 2、nodeSize参数(可选)：

您想要多少条wiregaurd链接、nekoray链接、clash节点？默认300条。

注：hiddify的，会在这个nodeSize数量的基础上，再次限制数量(最多70*2=140个、200个)。

<details>
<summary>点击展开图片</summary>
	<img src="images\nodeSize参数.png" />
</details>

#### 3、loc/location参数(可选)：

当没有传入cidrs参数值时，对所有要转换的目标客户端生效，`loc=us` 指定IP段是以162开头的IP；`loc=gb` 则指定IP段是188开头的IP。
<details>
<summary>点击展开图片</summary>
	<img src="images\loc参数.png" />
</details>

#### 4、mtu参数(可选)：

修改MTU的值，有一定几率提升网速，也可能导致没有网络，不会的不要修改它。

<details>
<summary>点击展开图片</summary>
	<img src="images\mtu参数.png" />
</details>

#### 5、cidrs参数(可选)：

限制所有的IP来源哪个/哪些IPv4 CIDR中？

<details>
<summary>点击展开图片</summary>
	<img src="images\cidrs参数.png" />
</details>

#### 6、ipSize、portSize参数(可选)：
指定生成的IP个数（默认生成1000个），以及要使用多少个端口（默认使用54个端口中的10个端口）

<details>
<summary>点击展开图片</summary>
	<img src="images\ipSize、portSize参数.png" />
</details>
### 五、（可选）使用WARP优选IP中的文件数据，生成订阅

往订阅URL链接中，传入`file=1`或`file=true`，就是使用优选IP文件中的数据，作为endpoint使用，生成订阅。


```
https://a.abc.workers.dev/sub?target=clash&file=true
或
https://a.abc.workers.dev/sub?target=hiddify&file=1
```

**温馨提示：**如果设置了私有csv文件相关变量值，也设置了公开csv、txt文件的`ENDPOINT_FILE_URL` 变量值；那么先判断私有csv文件中，是否读取到数据，没有读取到数据，就判断公开csv、txt文件中，是否读取到数据，如果读取到数据就生成订阅，依然没有读取到数据，就不能生成订阅（不会因读取不到数据，使用CIDR生成的IP来，生成订阅）。

#### 1、设置使用GitHub私有cvs文件的变量（参数）

只需设置GitHub相关的参数/变量值，就能启用GitHub私有csv文件的endpoint为数据，生成订阅。

设置GitHub相关参数/变量值，有两个种方法：

**第一种方法：**在 Cloudflare Workers/Pages 中设置变量（推荐）


| 参数             | 含义                                                         |
| ---------------- | ------------------------------------------------------------ |
| GITHUB_TOKEN     | （必须）GitHub访问令牌，用于授权请求（获取方法，在后面）     |
| GITHUB_OWNER     | （必须）仓库所有者的用户名，填您的GitHub用户名               |
| GITHUB_REPO      | （必须）私有文件所在的仓库名称                               |
| GITHUB_BRANCH    | （可选）私有文件所在的分支名称，默认是main，如果您创建了其它分支，就改为您创建的分支名称 |
| GITHUB_FILE_PATH | （必须）私有文件所在的路径（是相对路径，不是绝对路径）       |


<details>
    <summary>点击展开图片</summary>
    <img src="images\GitHub私有文件相关变量.png" />
</details>
**第二种方法：**在`_worker.js`源码中设置默认值（不推荐）

与前面设置变量效果一样，变量名称不同而已，该方法可能会泄露您的 GitHub token。

```js
var DEFAULT_GITHUB_TOKEN = '';          // GitHub的令牌
var DEFAULT_OWNER = '';                 // GitHub的用户名
var DEFAULT_REPO = '';                  // GitHub的仓库名
var DEFAULT_BRANCH = 'main';            // GitHub的分支名
var DEFAULT_FILE_PATH = 'result.csv';   // GitHub的文件路径
```

##### GITHUB_TOKEN / DEFAULT_GITHUB_TOKEN 值怎么获取？

1、获取 GitHub token 的地址：[link](https://github.com/settings/tokens)

2、获取 GitHub token 的教程

- 【官方版】创建 personal access token (classic) 的教程：[link](https://docs.github.com/zh/enterprise-server@3.10/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#%E5%88%9B%E5%BB%BA-personal-access-token-classic)
- 【图文教程】如何在 GitHub 生成 personal access token (classic)：[link](https://medium.com/@mbohlip/how-to-generate-a-classic-personal-access-token-in-github-04985b5432c7)

#### 2、设置使用GitHub公开csv、txt文件的变量（参数）

在`_worker.js`源码中添加csv、txt文件的网络链接：

```js
var ENDPOINT_FILE_URL = ""; // 可以是result.csv文件的网络链接(https://.../result.csv)，也可以是每行一个“IP:PORT”的网络链接(https://.../result.txt)。
```

#### 3、WARP优选IP中，文件的数据格式

- GitHub私有csv文件：

```csv
IP:PORT, LOSS, DELAY
162.159.195.142:1018,0.00%,155 ms
162.159.192.24:7152,0.00%,156 ms
[2606:4700:d0::05b6:edb6:4771:81a7]:1014,0.00%,175 ms
......
```

- GitHub公开csv、txt文件：

```csv
IP:PORT, LOSS, DELAY
162.159.195.142:1018,0.00%,155 ms
162.159.192.24:7152,0.00%,156 ms
[2606:4700:d0::05b6:edb6:4771:81a7]:1014,0.00%,175 ms
......
```
- + 或者：

```txt
162.159.192.107:878
162.159.195.74:968
162.159.195.27:2371
[2606:4700:d0::05b6:edb6:4771:81a7]:1014
......
```

### 六、v2rayN、NekoBox 客户端使用截图，其它客户端的截图省略

<img src="images\v2rayN客户端中使用.png" />

<img src="images\NekoBox客户端中使用.png" />

### 七、相关工具

- 1、[NekoBox For PC](https://github.com/MatsuriDayo/nekoray)

- 2、[v2rayN](https://github.com/2dust/v2rayN)、[V2RayN-PRO](https://github.com/lowercase78/V2RayN-PRO)、[v2rayNG](https://github.com/2dust/v2rayNG)

- 3、[hiddify-next](https://github.com/hiddify/hiddify-next)

- 4、[ClashMetaForAndroid](https://github.com/MetaCubeX/ClashMetaForAndroid)

- 5、[clash-verge-rev](https://github.com/clash-verge-rev/clash-verge-rev)、[clash-verge](https://github.com/zzzgydi/clash-verge)

- 6、[clash-nyanpasu](https://github.com/LibNyanpasu/clash-nyanpasu)

- 7、[FlClash](https://github.com/chen08209/FlClash)

- 8、[Pandora-Box](https://github.com/snakem982/Pandora-Box)
