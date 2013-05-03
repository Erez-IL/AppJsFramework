# App JS Framework

## これは何？
PhoneGap x jQuery x Bootstrapでアプリ開発をする時の「定石」的なもの。
MVCのフレームワークもどきです。

## ポリシー
学習コストが少ない。
単純で柔軟。
MVC。

## 使い方
詳しい使い方はsamplesを御覧ください。（あまり数は無いですが）

├── css
│   ├── bootstrap-responsive.min.css
│   └── bootstrap.min.css
├── img
│   ├── 画像リソースを配置
├── js
│   ├── app-base.js
│   ├── app-config.js
│   ├── controls
│   │   └── コントローラーJSを配置
│   ├── libs
│   │   ├── bootstrap.min.js
│   │   ├── cordova-2.7.0.js
│   │   └── jquery-1.9.1.min.js
│   └── models
│       └── モデルJSを配置
├── pages
│   └── HTMLを配置


## ロードマップ
（変更の可能性あり）

### 1.0.0
とりあえずコミットしました。
コメントとかあとでちゃんと書きます。リファクタ随時します。ごめんなさい。

### 1.1.0
テストフレームワークとの用意な連携を可能にする。