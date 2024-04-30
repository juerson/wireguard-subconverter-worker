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
- Cloudflare WARP（WireGuard）转换为 [hiddify-next](https://github.com/hiddify/hiddify-next) 的 JSON 配置，这个 JSON 配置好似 sing-box 的配置文件，不知还能在哪些客户端中使用？

### 三、使用注意

- 1、不支持Android版的NekoBox。
- 2、不支持IPv6 CIDR的参数值传入（不支持生成IPv6地址），也不支持优选IP。
- 3、由于是随机生成IP和PORT的，每次网络请求，获取到IP和PORT都在变，导致节点也在变，可以通过更新订阅更换原来的节点。
- 4、代码中`wireguardParameters`中的参数是warp普通账号的参数，建议更换成自己的参数（Plus账号、Zero Trust团队账号的参数）。
- 5、排除warp账号的流量为零和 cloudflare warp 网络问题、IP问题的情况下，你还是不能联网、网速慢，可以考虑修改 [MTU](https://github.com/juerson/wireguard-subconverter-worker/blob/4e27b8c474870ca7501365e3be80781607370c7b/src/worker.js#L30) 的值，参考[这里](https://gist.github.com/nitred/f16850ca48c48c79bf422e90ee5b9d95)的表格酌情修改，网速有很明显的变化，有时需要联网一会，不是网络立刻提升的，网速时快时慢。注意：在代码中修改mtu值，可能导致其它客户端无法正常使用，推荐从url订阅链接中，传入mtu参数来修改mtu值。如果是 clash 配置的，就修改 clash 配置文件的头部 dns 字段的内容。
- 6、转为 Hiddify 的 JSON 配置，在 Hiddify 客户端中`点击连接`时，可能出现 Hiddify 程序闪退问题，只要 JSON 的配置没有语法错误，重新打开就能使用，如果想解决闪退问题，可以尝试修改生成的节点数量，可以从外部传入nodeSize参数，限制节点数量(代码里面也有限制 Hiddify 的节点数量的，nodeSize 超出对应的数量，节点数量不会随 nodeSize 增加而增加)。

### 四、URL参数说明

| 参数         | 含义                                                         | 例子                                                         |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| target       | （必须）转换成的目标                                         | target=nekobox 或 nekoray、v2rayn 或 wireguard、clash、hiddify |
| pwd          | （必须/可选）访问订阅内容的密码，如果您在 cloudflare 中设置了`PASSWORD` 变量值(访问密码)，这个参数是必须的。 | pwd=???，密码等于您在 cloudflare 后台设置的`PASSWORD` 变量值 |
| nodeSize     | （可选）您需要多少条节点。注意：不能准确控制 Hiddify 的节点数，里面还有一层数量限制（最多70*2=140个、200个） | nodeSize=100，100个节点，默认为300                           |
| loc/location | （可选）你想要哪个 cidr 段的IP？us => 162开头的IP；gb => 188开头的IP。 | loc=us、loc=gb                                               |
| detour       | （可选）绕行/迂回代理、链式代理，获取 us/gb 的IP定位，只能搭配 `target=hiddify` 使用。 | target=hiddify&detour=on                                     |
| mtu          | （可选）修改 WirGuard 节点中的 mtu 的值。                    | mtu=1280，或者 `1280~1500` 之间的数，默认1280                |
| cidrs        | （可选）使用自定义的 cidr ，不使用内置的 cidrs ，支持多个 cidr ，以逗号隔开、字符串形式传入。注意：只支持 IPv4 CIDR 的传入。 | cidrs=162.159.192.0/24<br>cidrs=162.159.192.0/24,162.159.193.0/24 |
| ipSize       | （可选）从所有 cidrs 中随机生成多少个不重复的IP，一定程度上可以控制节点生成的数量。 | ipSize=500，生成500个IP地址，默认为1000                      |
| portSize     | （可选）从 ports 的54个端口中随机生成多少个不重复的 port ，一定程度上可以控制节点生成的数量。 | portSize=5，随机选择54个port的5个，默认为10                  |
```
https://a.abc.workers.dev/sub?target=nekoray
https://a.abc.workers.dev/sub?target=nekoray&loc=us
https://a.abc.workers.dev/sub?target=clash&loc=gb
https://a.abc.workers.dev/sub?target=hiddify
https://a.abc.workers.dev/sub?target=hiddify&detour=on
https://a.abc.workers.dev/sub?target=hiddify&detour=on&loc=us
https://a.abc.workers.dev/sub?target=clash&mtu=1280
ttps://a.abc.workers.dev/sub?target=wireguard&nodeSize=100
ttps://a.abc.workers.dev/sub?target=wireguard&nodeSize=100&mtu=1280
https://a.abc.workers.dev/sub?target=hiddify&ipSize=200&portSize=5
https://a.abc.workers.dev/sub?target=hiddify&ipSize=200&portSize=5&cidrs=162.159.192.0/24,162.159.193.0/24
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

### 五、v2rayN、NekoBox 客户端使用截图，其它客户端的截图省略

<img src="images\v2rayN客户端中使用.png" />

<img src="images\NekoBox客户端中使用.png" />

### 六、相关工具

- 1、[NekoBox](https://github.com/MatsuriDayo/nekoray)

- 2、[v2rayN](https://github.com/2dust/v2rayN)

- 3、[v2rayNG](https://github.com/2dust/v2rayNG)

- 4、[ClashMetaForAndroid](https://github.com/MetaCubeX/ClashMetaForAndroid)

- 5、[clash-verge-rev](https://github.com/clash-verge-rev/clash-verge-rev)、[clash-verge](https://github.com/zzzgydi/clash-verge)

- 6、[clash-nyanpasu](https://github.com/LibNyanpasu/clash-nyanpasu)

- 7、[hiddify-next](https://github.com/hiddify/hiddify-next)
