---
title: Adyen SDK 接入（一）账号注册 & 准备工作
date: 2021-01-06 17:19:21
tags:
- iOS
- SDK
- 支付
categories:
- iOS 开发笔记
---

[TOC]

Adyen SDK 与其他常见的 SDK 不太一样，API Key 与 Client Key 都是需要自己手动生成的，live 与 test 的环境区分也较为严格，想要申请 live 账号必须通过公司，这就导致个人测试时相对比较麻烦。

## 准备工作

### 1. 注册账号

https://docs.adyen.com/checkout/get-started#step-1-sign-up-for-a-test-account

### 2. 生成 API Key

https://docs.adyen.com/checkout/get-started#api-key

生成后 24 小时失效，保存后无法再显示。

#### 1- 选择 API credentials

![Adyen-API credentials](https://raw.githubusercontent.com/yanqizhao/picture/main/img/20210112143926.png)

#### 2- 选择 ws@Company.{YourCompany}

![Adyen-API credentials2](https://raw.githubusercontent.com/yanqizhao/picture/main/img/20210112144047.png)

#### 3- 点击 Generate New API Key

![Adyen-API credentials3](https://raw.githubusercontent.com/yanqizhao/picture/main/img/20210112144102.png)

#### 4- 复制 API Key 并保存起来

#### 5- 点击 Save Generated API Key

#### 6- 弹窗确认

![Adyen-API credentials4](https://raw.githubusercontent.com/yanqizhao/picture/main/img/20210112144120.JPG)

### 3. 测试一笔支付

https://docs.adyen.com/checkout/get-started#step-3-make-a-test-payment

#### 终端测试

将下列代码中的 `YOUR_API_KEY` 和 `YourCompanyECOM` 替换掉并拷贝到终端运行。

```
curl https://checkout-test.adyen.com/v66/payments \
-H 'x-api-key: YOUR_API_KEY' \
-H 'content-type: application/json' \
-d '{
  "merchantAccount": "YourCompanyECOM",
  "reference": "My first Adyen test payment",
  "amount": {
    "value": 1000,
    "currency": "EUR"
  },
    "paymentMethod": {
    "type": "scheme",
    "encryptedCardNumber": "test_4111111111111111",
    "encryptedExpiryMonth": "test_03",
    "encryptedExpiryYear": "test_2030",
    "encryptedSecurityCode": "test_737"
  }
}'
```

##### 1- `YOUR_API_KEY` 获取

`YOUR_API_KEY` 在第二步已经获取到了。

##### 2- `YourCompanyECOM` 获取

###### 1- 选择 Merchant accounts

![Adyen-Merchant accounts](https://raw.githubusercontent.com/yanqizhao/picture/main/img/20210112144205.png)

###### 2- Account code 下的内容即 `YourCompanyECOM`

![Adyen-Merchant accounts2](https://raw.githubusercontent.com/yanqizhao/picture/main/img/20210112144217.png)

#### 测试结果

![Adyen-Test](https://raw.githubusercontent.com/yanqizhao/picture/main/img/20210112144331.JPG)

支付结果在后台也能看到。