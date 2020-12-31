# dashjs-mpd-loader

> 用于将mpd文件内容，转化为dash.js 支持的manifest对象。可以用来实现mpd文件的预加载。

### 说明
将Manifest.mpd文件名转化为js对象，该对象可以直接用作dash.js player的src。从而可以在某些场景下，提前预加载mpd文件，在播放时直接使用而无需加载。

### 安装
umd打包，支持各种方式引入：
```
npm i dashjs-mpd-loader
```

### 使用

#### npm方式
安装
```
npm i dashjs-mpd-loader
```
加载页面
```
import mpdLoader from "dashjs-mpd-loader"

// 方式1：直接通过load方法加载远程mpd
mpdLoader.load(mpdSource).then(manifest => {
  // 保存manifest，在需要时使用
  // 
  window.videoManifest = manifest
})

// 方式2：通过ajax加载mpd内容，再转化为manifest对象
const mpdUrl = 'https://xxx.xxx.xxx/xxx/Manifest.mpd'  // 示例

const xhr = new XMLHttpRequest();

xhr.onload = () => {
  const baseUri = url.replace(/([^\/])+?$/, ''); // baseUri是要加载的视频分片的基础路径，一般是'https://xxx.xxx.xxx/xxx/'
  const manifest = mpdLoader.parse(xhr.responseText, baseUri);
  window.videoManifest = manifest
}

xhr.open(methods, url, true);

xhr.send();

```

```
// 在播放页面，在初始化player时使用
dashPlayer.initialize(videoElement, window.videoManifest)
// 或，在设置src时使用
dashPlayer.attachSource(window.videoManifest)
```

### browser方式
引入script
```
<script src="path/to/dashjs-mpd-loader.js"></script>
```
使用
```

// 方式1：直接通过load方法加载远程mpd
DashjsMpdLoader.load(mpdSource).then(manifest => {
  // 保存manifest，在需要时使用
  // 
  window.videoManifest = manifest
})

// 方式2：通过ajax加载mpd内容，再转化为manifest对象
const mpdUrl = 'https://xxx.xxx.xxx/xxx/Manifest.mpd'  // 示例

const xhr = new XMLHttpRequest();

xhr.onload = () => {
  const baseUri = url.replace(/([^\/])+?$/, ''); // baseUri是要加载的视频分片的基础路径，一般是'https://xxx.xxx.xxx/xxx/'
  const manifest = DashjsMpdLoader.parse(xhr.responseText, baseUri);
  window.videoManifest = manifest
}

xhr.open(methods, url, true);

xhr.send();

```