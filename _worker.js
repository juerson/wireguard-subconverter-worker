// src/worker.js
var wireguardParameters = [
  { "privateKey": "AKs7CKzbDVmfjSgCB4A1JNI5YBMclHYV2OQ7srIijW4=", "ipv6": "2606:4700:110:876d:4d3c:4206:c90c:6bd0/128", "reserved": "" },
  { "privateKey": "ILJiqBa4QguF5YHRiB9Xfq2Ll01qbYe4dUKZLdgNTFs=", "ipv6": "2606:4700:110:8e7b:3658:cd12:5c4f:d86e/128", "reserved": "" },
  { "privateKey": "aJ2wqfkki3um7JnNAH2R6/OnAo2Td+pmxbRReh1v9GE=", "ipv6": "2606:4700:110:8310:d937:2fb:c312:9498/128", "reserved": "162,104,222" },
  { "privateKey": "0EefAfoz3eY1PUwycUO5/Ux0GKnjOq6TJk5NySdOglk=", "ipv6": "2606:4700:110:8b5b:874a:4dbe:b6d2:d333/128", "reserved": "185,208,24" },
  { "privateKey": "gNPBZNJg1mOGJjoTTof9luaQHdZP2oMRU8nXd3xjpX8=", "ipv6": "2606:4700:110:83b7:3a13:7ef3:96fc:f055/128", "reserved": "244,132,74" },
  { "privateKey": "sIVbx/54EJOM0caRr/kksFAkdni+V9VZawSZaha0tms=", "ipv6": "2606:4700:110:8502:e803:c14e:2858:c0e7/128", "reserved": "61,142,253" },
  { "privateKey": "+Cgu25E1zo9PkW5fC299zgbGVGKJamWgF6/iqQdoUW0=", "ipv6": "2606:4700:110:805e:1441:a533:975b:8a39/128", "reserved": "153,183,146" },
  { "privateKey": "GKaNRx+KVRL3F1sguZHO8wh70yUprNsPjmUapCGUsGk=", "ipv6": "2606:4700:110:88f9:54b8:120e:d01d:c77e/128", "reserved": "121,102,72" },
  { "privateKey": "qEqlXOEDcFt803y8Gs/fo8DuZJpZpWV/FSh1oKReFXI=", "ipv6": "2606:4700:110:890f:f926:98fe:7e61:d0e7/128", "reserved": "18,15,251" },
  { "privateKey": "+HfkMSyh7obEkX4J8Qa7Xk77CLVn45AW4CdBbnFNaGc=", "ipv6": "2606:4700:110:83e8:84f7:8c64:70b4:6709/128", "reserved": "92,242,140" },
  { "privateKey": "cA8htoCSuLJbax8I6HewsDTwTbuWt5DjEItcGvLGREw=", "ipv6": "2606:4700:110:8c0b:359c:ee61:a221:d261/128", "reserved": "50,15,234" },
  { "privateKey": "iLHohl4txwAsgUPW1lGsnAeJDFvit6LAdMYTwbNRGUM=", "ipv6": "2606:4700:110:81a6:2bc6:e542:7f3e:57f1/128", "reserved": "6,26,27" },
  { "privateKey": "eMkBv99f6rbTboaKNV4HJhvu/Dn35mub7BrY8xFrCVo=", "ipv6": "2606:4700:110:8980:cd13:9729:f969:9aab/128", "reserved": "137,173,229" },
  { "privateKey": "8NquX1vPe6AHY5qXmShDELMtx4was2awcNqKj2MgRGM=", "ipv6": "2606:4700:110:82e8:22b6:a7ee:b89c:a5a2/128", "reserved": "236,186,157" },
  { "privateKey": "kK/MhN/pbNI05H77pgSsNN6OqM+jPba3Lz9A5Jlg8lw=", "ipv6": "2606:4700:110:8847:e19b:4828:fe35:d337/128", "reserved": "139,171,35" },
  { "privateKey": "6L1n+NV62WEr2o4/pEUopsgB6RzcY86BLIgYwdOTxmc=", "ipv6": "2606:4700:110:833b:f16c:a4f3:cf60:8fa3/128", "reserved": "141,213,198" },
  { "privateKey": "sALjsE4FBGPC/GosnaOhFy/+2cog7roA3jN8yC75F3g=", "ipv6": "2606:4700:110:8d06:7ef8:cf45:2393:9ac7/128", "reserved": "66,144,87" },
  { "privateKey": "iEpioH7klluHVhhhDsz0JodBtjqECXMT7J0LLqHmsEs=", "ipv6": "2606:4700:110:871a:f575:a463:76a0:1984/128", "reserved": "65,170,17" },
  { "privateKey": "IIBhFRq9qkF0nxPXHzzvATyRVcEePvPU5bJOuoC2S0g=", "ipv6": "2606:4700:110:8ea1:c997:fbfe:f888:3946/128", "reserved": "18,140,54" },
  { "privateKey": "gO/NAt7kT3zNWk6OiQ5Ru9A2ksAr96sPxxr68B8TtH0=", "ipv6": "2606:4700:110:8775:bf6c:a489:d6db:fd76/128", "reserved": "42,76,32" },
  { "privateKey": "iBtKwA/VDkj1n8uFD0v+E3bIQHMPWsRagclDwr6lUVI=", "ipv6": "2606:4700:110:8dcd:e0e6:7c9a:c35e:2ece/128", "reserved": "206,39,0" }
];
var PrivateKey = "wBUDtqZGfV1gpV7n4GNsGEyR76hAMN1hGaM1yfYcFms=";
var Address = ["172.16.0.2/32", "2606:4700:110:816b:ef6f:4f25:f7ab:dc09/128"];
var PublicKey = "bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=";
var encoded_PublicKey = encodeURIComponent(PublicKey);
var MTU = 1280;
var cidrs = ["162.159.192.0/24", "162.159.193.0/24", "162.159.195.0/24", "188.114.96.0/24", "188.114.97.0/24", "188.114.98.0/24", "188.114.99.0/24"];
var ports = [854, 859, 864, 878, 880, 890, 891, 894, 903, 908, 928, 934, 939, 942, 943, 945, 946, 955, 968, 987, 988, 1002, 1010, 1014, 1018, 1070, 1074, 1180, 1387, 1843, 2371, 2506, 3138, 3476, 3581, 3854, 4177, 4198, 4233, 5279, 5956, 7103, 7152, 7156, 7281, 7559, 8319, 8742, 8854, 8886, 2408, 500, 4500, 1701];
var randomIpSize = 1e3;
var randomPortSize = 10;
var randomNodeSize = 300;
var CLASH_TEMPLATE_URL = "https://raw.githubusercontent.com/juerson/wireguard-subconverter-worker/master/clash.yaml";
var HIDDIFY_TEMPLATE_URL = "https://raw.githubusercontent.com/juerson/wireguard-subconverter-worker/master/hiddify.json";
var worker_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let target = url.searchParams.get("target") || "";
    let cidrsValue = url.searchParams.get("cidrs") || "";
    let newcidrs = cidrsValue ? cidrsValue.trim().split(",") : cidrs;
    let nodeSize = url.searchParams.get("nodeSize") || randomNodeSize;
    let ipSize = url.searchParams.get("ipSize") || randomIpSize;
    let portSize = url.searchParams.get("portSize") || randomPortSize;
    let detour = url.searchParams.get("detour") || "";
    let location = url.searchParams.get("loc") || url.searchParams.get("location") || "";
    if (location.toLocaleLowerCase() === "gb" && cidrsValue.trim() === "") {
      newcidrs = cidrs.filter((item) => item.startsWith("188"));
    } else if (location.toLocaleLowerCase() === "us" && cidrsValue.trim() === "") {
      newcidrs = cidrs.filter((item) => item.startsWith("162"));
    }
    MTU = url.searchParams.get("mtu") || MTU;
    let ips_with_ports = [];
    generateRandomIPv4InRange(newcidrs, ipSize).forEach((ip) => {
      getRandomElementsFromArray(ports, portSize).forEach((port) => {
        ips_with_ports.push(`${ip}:${port}`);
      });
    });
    switch (url.pathname) {
      case "/sub":
        let endpoints = getRandomElementsFromArray(ips_with_ports, nodeSize);
        if (target.toLocaleLowerCase() === "v2rayn" || target.toLocaleLowerCase() === "wireguard") {
          let wireguardLinks = [];
          endpoints.forEach((ip_with_port) => {
            let wireguardLink = buildWireGuardLink(ip_with_port, wireguardParameters, Address, PrivateKey, encoded_PublicKey, MTU);
            wireguardLinks.push(wireguardLink);
          });
          let base64Nodes = btoa(wireguardLinks.join("\n"));
          return new Response(base64Nodes, {
            status: 200,
            headers: {
              "Content-Type": "text/plain; charset=utf-8"
            }
          });
        } else if (target.toLocaleLowerCase() === "nekobox" || target.toLocaleLowerCase() === "nekoray") {
          let nekorayLinks = [];
          endpoints.forEach((ip_with_port) => {
            let nekorayLink = buildNekoRayLink(ip_with_port, wireguardParameters, Address, PrivateKey, PublicKey, MTU);
            nekorayLinks.push(nekorayLink);
          });
          let base64Nodes = btoa(nekorayLinks.join("\n"));
          return new Response(base64Nodes, {
            status: 200,
            headers: {
              "Content-Type": "text/plain; charset=utf-8"
            }
          });
        } else if (target.toLocaleLowerCase() === "clash") {
          let clashConfig = await fetchWebPageContent(CLASH_TEMPLATE_URL);
          let clashNodes = [];
          let proxiesNames = [];
          endpoints.forEach((ip_with_port) => {
            let [proxyName, clashNode] = buildClashNode(ip_with_port, wireguardParameters, Address, PrivateKey, PublicKey, MTU);
            if (proxyName !== "" || clashNode !== "") {
              clashNodes.push(clashNode);
              proxiesNames.push(`      - ${proxyName}`);
            }
          });
          if (clashConfig.length > 0) {
            clashConfig = clashConfig.replace(new RegExp(atob("ICAtIHtuYW1lOiAwMSwgc2VydmVyOiAxMjcuMC4wLjEsIHBvcnQ6IDgwLCB0eXBlOiBzcywgY2lwaGVyOiBhZXMtMTI4LWdjbSwgcGFzc3dvcmQ6IGExMjM0NTZ9"), "g"), clashNodes.join("\n"));
            clashConfig = clashConfig.replace(new RegExp(atob("ICAgICAgLSAwMQ=="), "g"), proxiesNames.join("\n"));
          }
          return new Response(clashConfig, {
            status: 200,
            headers: {
              "Content-Type": "text/plain; charset=utf-8"
            }
          });
        } else if (target.toLocaleLowerCase() === "hiddify" && detour.toLocaleLowerCase() === "on") {
          let hiddifyString = await fetchWebPageContent(HIDDIFY_TEMPLATE_URL);
          let hiddify = JSON.parse(hiddifyString);
          let ip_with_port_list = endpoints.slice(0, 70);
          let node_info_list = [];
          ip_with_port_list.forEach((ip_with_port) => {
            let [name1, name2, node1, node2] = buildHiddifyDetourJSON(ip_with_port, wireguardParameters, PublicKey, MTU);
            hiddify["outbounds"].forEach((obj) => {
              if (obj.hasOwnProperty("outbounds")) {
                obj.outbounds.push(...[name1, name2]);
              }
            });
            node_info_list.push(node1);
            node_info_list.push(node2);
          });
          let index = 2;
          node_info_list.forEach(function(element) {
            hiddify["outbounds"].splice(index, 0, element);
            index++;
          });
          let jsonString = JSON.stringify(hiddify, null, 2);
          return new Response(jsonString, {
            status: 200,
            headers: {
              "Content-Type": "text/plain; charset=utf-8"
            }
          });
        } else if (target.toLocaleLowerCase() === "hiddify") {
          let hiddifyString = await fetchWebPageContent(HIDDIFY_TEMPLATE_URL);
          let hiddify = JSON.parse(hiddifyString);
          let ip_with_port_list = endpoints.slice(0, 200);
          let node_info_list = [];
          ip_with_port_list.forEach((ip_with_port) => {
            let [name, node] = buildHiddifyJSON(ip_with_port, wireguardParameters, Address, PrivateKey, PublicKey, MTU);
            hiddify["outbounds"].forEach((obj) => {
              if (obj.hasOwnProperty("outbounds")) {
                obj.outbounds.push(name);
              }
            });
            node_info_list.push(node);
          });
          let index = 2;
          node_info_list.forEach(function(element) {
            hiddify["outbounds"].splice(index, 0, element);
            index++;
          });
          let jsonString = JSON.stringify(hiddify, null, 2);
          return new Response(jsonString, {
            status: 200,
            headers: {
              "Content-Type": "text/plain; charset=utf-8"
            }
          });
        }
      default:
        return new Response("Not found", {
          status: 404,
          headers: {
            "Content-Type": "text/plain; charset=utf-8"
          }
        });
    }
  }
};
function generateRandomIPv4InRange(cidrs2, numOfIPs) {
  let ips = /* @__PURE__ */ new Set();
  let totalIPs = cidrs2.reduce(function(acc, cidr) {
    let cidrParts = cidr.split("/");
    let subnetMask = parseInt(cidrParts[1]);
    let numberOfIPs = Math.pow(2, 32 - subnetMask);
    return acc + numberOfIPs;
  }, 0);
  numOfIPs = Math.min(numOfIPs, totalIPs);
  if (numOfIPs <= 0) {
    return Array.from(ips);
  }
  while (ips.size < numOfIPs) {
    let randIndex = Math.floor(Math.random() * totalIPs);
    let cumulativeIPs = 0;
    let selectedCIDR;
    let numberOfIPs;
    for (let j = 0; j < cidrs2.length; j++) {
      let cidr = cidrs2[j];
      let cidrParts = cidr.split("/");
      let subnetMask = parseInt(cidrParts[1]);
      numberOfIPs = Math.pow(2, 32 - subnetMask);
      cumulativeIPs += numberOfIPs;
      if (randIndex < cumulativeIPs) {
        selectedCIDR = cidr;
        break;
      }
    }
    if (selectedCIDR) {
      let range = selectedCIDR.split("/");
      let baseIP = range[0];
      let baseIPParts = baseIP.split(".");
      let baseInt = baseIPParts.reduce(function(acc, val) {
        return (acc << 8) + parseInt(val);
      }, 0);
      let randomOffset = Math.floor(Math.random() * numberOfIPs);
      let ipInt = baseInt + randomOffset >>> 0;
      ips.add(ipInt);
    }
  }
  return Array.from(ips).map(function(ipInt) {
    return [
      ipInt >>> 24 & 255,
      ipInt >>> 16 & 255,
      ipInt >>> 8 & 255,
      ipInt & 255
    ].join(".");
  });
}
function getRandomElementsFromArray(arr, n = 10) {
  if (n < 1 || n > arr.length) {
    n = 10;
  }
  const result = [];
  const arrCopy = arr.slice();
  while (result.length < n && arrCopy.length > 0) {
    const randomIndex = Math.floor(Math.random() * arrCopy.length);
    const selectedElement = arrCopy[randomIndex];
    if (!result.includes(selectedElement)) {
      result.push(selectedElement);
    }
    arrCopy.splice(randomIndex, 1);
  }
  return result;
}
function buildWireGuardLink(ip_with_port, wireguardParameters2, Address2, PrivateKey2, encoded_PublicKey2, MTU2 = 1280) {
  let [ip, port] = sliceIPAndPort(ip_with_port);
  if (ip === null && port === null) {
    return "";
  }
  let encoded_PrivateKey, encoded_Address, Reserved = "";
  if (wireguardParameters2.length === 0) {
    encoded_PrivateKey = encodeURIComponent(PrivateKey2);
    encoded_Address = encodeURIComponent(Address2.join(","));
  } else {
    let randomGroup = wireguardParameters2[Math.floor(Math.random() * wireguardParameters2.length)];
    encoded_PrivateKey = encodeURIComponent(randomGroup["privateKey"]);
    encoded_Address = encodeURIComponent(["172.16.0.2/32", randomGroup["ipv6"]].join(","));
    Reserved = randomGroup["reserved"];
  }
  let encoded_remarks = encodeURIComponent(`warp-${ip}`);
  let wireguardLinks;
  if (Reserved.trim().length === 0) {
    wireguardLinks = `wireguard://${encoded_PrivateKey}@${ip_with_port}/?publickey=${encoded_PublicKey2}&address=${encoded_Address}&mtu=${MTU2}#${encoded_remarks}`;
  } else {
    let encoded_reserved = encodeURIComponent(Reserved);
    wireguardLinks = `wireguard://${encoded_PrivateKey}@${ip_with_port}/?publickey=${encoded_PublicKey2}&reserved=${encoded_reserved}&address=${encoded_Address}&mtu=${MTU2}#${encoded_remarks}`;
  }
  return wireguardLinks;
}
function buildNekoRayLink(ip_with_port, wireguardParameters2, Address2, PrivateKey2, public_key, mtu = 1280) {
  let [ip, port] = sliceIPAndPort(ip_with_port);
  if (ip === null && port === null) {
    return "";
  }
  let private_key, ipv6, reserved = "";
  if (wireguardParameters2.length === 0) {
    private_key = PrivateKey2;
    ipv6 = Address2.length === 2 ? Address2[1] : "";
  } else {
    let randomGroup = wireguardParameters2[Math.floor(Math.random() * wireguardParameters2.length)];
    private_key = randomGroup["privateKey"];
    ipv6 = randomGroup["ipv6"];
    reserved = randomGroup["reserved"];
  }
  let encoded_remarks = encodeURIComponent(`warp-${ip}`);
  let ipv4 = "172.16.0.2/32";
  let reservedString = reserved.trim().length > 0 ? reserved.replaceAll(",", ", ") : "";
  let cs_data = `{
  "type": "wireguard",
  "tag": "wireguard-out",
  "server": "${ip}",
  "server_port": ${port},
  "system_interface": false,
  "interface_name": "warp-wg",
  "local_address": [
    "${ipv4}",
    "${ipv6}"
  ],
  "private_key": "${private_key}",
  "peer_public_key": "${public_key}",
  "pre_shared_key": "",
  "reserved": [${reservedString}],
  "mtu": ${mtu}
}`;
  let cs = cs_data.replace(/[\r\n]+/g, "\n");
  let nekoray_config = {
    "_v": 0,
    "addr": "127.0.0.1",
    "cmd": [""],
    "core": "internal",
    "cs": `${cs}`,
    "mapping_port": 0,
    "name": `${encoded_remarks}`,
    "port": 1080,
    "socks_port": 0
  };
  let nekoray_compress = JSON.stringify(nekoray_config);
  let nekoray_link = "nekoray://custom#" + btoa(nekoray_compress);
  return nekoray_link;
}
function buildClashNode(ip_with_port, wireguardParameters2, Address2, PrivateKey2, PublicKey2, mtu = 1280) {
  let [server, port] = sliceIPAndPort(ip_with_port);
  if (server === null && port === null) {
    return ["", ""];
  }
  let ipv4 = Address2[0].replace(/\/.*/, "");
  let ipv6, reserved, private_key;
  if (wireguardParameters2.length === 0) {
    private_key = PrivateKey2;
    ipv6 = Address2.length === 2 ? Address2[1].replace(/\/.*/, "") : "";
  } else {
    let randomGroup = wireguardParameters2[Math.floor(Math.random() * wireguardParameters2.length)];
    private_key = randomGroup["privateKey"];
    ipv6 = randomGroup["ipv6"].replace(/\/.*/, "");
    reserved = randomGroup["reserved"];
  }
  let remarks = `warp-${ip_with_port}`;
  let wireguard = {
    "name": `${remarks}`,
    "type": "wireguard",
    "server": `${server}`,
    "port": 2408,
    "ip": `${ipv4}`,
    "ipv6": `${ipv6}`,
    "private-key": `${private_key}`,
    "public-key": `${PublicKey2}`,
    "pre-shared-key": "",
    "reserved": "",
    "udp": true,
    "mtu": 1280,
    // 强制dns远程解析，默认值为false
    "remote-dns-resolve": true,
    // 仅在remote-dns-resolve为true时生效
    "dns": [
      "1.1.1.1",
      "1.0.0.1",
      "2606:4700:4700::1111",
      "2606:4700:4700::1001"
    ]
  };
  if (reserved.includes(",")) {
    wireguard["reserved"] = reserved.split(",").map(Number);
  } else {
    wireguard["reserved"] = reserved;
  }
  wireguard["mtu"] = Number(mtu);
  wireguard["port"] = Number(port);
  let compressedJsonString = JSON.stringify(wireguard).replace(/\s+/g, "");
  return [remarks, `  - ${compressedJsonString}`];
}
function sliceIPAndPort(ip_with_port) {
  let matches = ip_with_port.match(/^\[?([^\]]+)\]?:([0-9]+)$/);
  if (matches) {
    return [matches[1], parseInt(matches[2])];
  } else {
    return [null, null];
  }
}
async function fetchWebPageContent(URL2) {
  try {
    const response = await fetch(URL2);
    if (!response.ok) {
      throw new Error(`Failed to get: ${response.status}`);
      return "";
    } else {
      return await response.text();
    }
  } catch (err) {
    console.error(`Failed to fetch ${URL2} web conten: ${err.message}`);
    return "";
  }
}
function getTwoRandomElements(arr) {
  if (arr.length < 2) {
    return;
  }
  let index1 = Math.floor(Math.random() * arr.length);
  let index2 = Math.floor(Math.random() * arr.length);
  while (index2 === index1) {
    index2 = Math.floor(Math.random() * arr.length);
  }
  return [arr[index1], arr[index2]];
}
function buildHiddifyDetourJSON(ip_with_port, wireguardParameters2, public_key, mtu = 1280) {
  let [server, port] = sliceIPAndPort(ip_with_port);
  if (server === null && port === null) {
    return ["", "", "", ""];
  }
  let node_json = {
    "type": "wireguard",
    "tag": "",
    "local_address": ["172.16.0.2/32"],
    "private_key": "",
    "server": `${server}`,
    "server_port": Number(port),
    "peer_public_key": `${public_key}`,
    "reserved": "",
    "mtu": Number(mtu),
    "fake_packets": "8-15",
    "fake_packets_size": "40-100",
    "fake_packets_delay": "20-250"
  };
  let [wireguardParamA, wireguardParamB] = getTwoRandomElements(wireguardParameters2);
  if (wireguardParamA === "" || wireguardParamB === "") {
    return ["", "", "", ""];
  }
  let private_keyA = wireguardParamA["privateKey"];
  let ipv6A = wireguardParamA["ipv6"];
  let reservedA = wireguardParamA["reserved"];
  let private_keyB = wireguardParamB["privateKey"];
  let ipv6B = wireguardParamB["ipv6"];
  let reservedB = wireguardParamB["reserved"];
  let flag = server.startsWith("162") ? "\u{1F1FA}\u{1F1F2}" : "\u{1F1EC}\u{1F1E7}";
  let proxy_name = `warp-${server}:${port}`;
  let proxy_name_detour = `${proxy_name}-${flag}`;
  let deepCopyA = JSON.parse(JSON.stringify(node_json));
  deepCopyA["tag"] = proxy_name;
  deepCopyA["local_address"].push(ipv6A);
  deepCopyA["private_key"] = private_keyA;
  deepCopyA["reserved"] = reservedA.includes(",") ? reservedA.split(",").map(Number) : [];
  let deepCopyB = JSON.parse(JSON.stringify(node_json));
  deepCopyB["tag"] = proxy_name_detour;
  deepCopyB["detour"] = proxy_name;
  deepCopyB["local_address"].push(ipv6B);
  deepCopyB["private_key"] = private_keyB;
  deepCopyB["reserved"] = reservedB.includes(",") ? reservedB.split(",").map(Number) : [];
  return [proxy_name, proxy_name_detour, deepCopyA, deepCopyB];
}
function buildHiddifyJSON(ip_with_port, wireguardParameters2, Address2, PrivateKey2, public_key, mtu = 1280) {
  let [server, port] = sliceIPAndPort(ip_with_port);
  if (server === null && port === null) {
    return ["", ""];
  }
  let node_json = {
    "type": "wireguard",
    "tag": "",
    "local_address": ["172.16.0.2/32"],
    "private_key": "",
    "server": `${server}`,
    "server_port": Number(port),
    "peer_public_key": `${public_key}`,
    "reserved": "",
    "mtu": Number(mtu),
    "fake_packets": "8-15",
    "fake_packets_size": "40-100",
    "fake_packets_delay": "20-250"
  };
  let private_key, ipv6, reserved;
  if (wireguardParameters2.length === 0) {
    private_key = PrivateKey2;
    ipv6 = Address2[1];
    reserved = [];
  } else {
    let randomGroup = wireguardParameters2[Math.floor(Math.random() * wireguardParameters2.length)];
    private_key = randomGroup["privateKey"];
    ipv6 = randomGroup["ipv6"];
    reserved = randomGroup["reserved"];
  }
  let proxy_name = `warp-${ip_with_port}`;
  node_json["tag"] = proxy_name;
  node_json["local_address"].push(ipv6);
  node_json["private_key"] = private_key;
  node_json["reserved"] = reserved.includes(",") ? reserved.split(",").map(Number) : [];
  return [proxy_name, node_json];
}
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
