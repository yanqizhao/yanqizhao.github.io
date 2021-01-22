---
title: JavaScript 语法
date: 2020-12-22 17:19:21
tags:
- 编程语言
- 语法基础
categories:
- JavaScript
---



## var let const

> let 不能声明多次



```javascript
var i = "global";

function test () {
  var i = "function";
  console.log(i);
}

test();
console.log(i);

/*
console log:
"function"
"global"
*/
```



```javascript
var i = "global";

function test () {
  i = "function";
  console.log(i);
}

test();
console.log(i);

/*
console log:
"function"
"function"
*/
```





```javascript
function test () {
  i = "function";
  console.log(i);
}

test();
console.log(i);

/*
console log:
"function"
"function"
*/
```





```javascript
let i = "global";
function test () {
  let i = "function";
  console.log(i);
}

test();
console.log(i);

/*
console log:
"function"
"global"
*/
```





```javascript
let i = "global";
function test () {
  i = "function";
  console.log(i);
}

test();
console.log(i);

/*
console log:
"function"
"function"
*/
```





```javascript
function test () {
  let i = "function";
  console.log(i);
}

test();
console.log(i);

/*
console log:
Uncaught ReferenceError: i is not defined 
*/
```





### Object.freeze()

## undefined null

## ===

## !==

## Array

### push pop

### shift unshift

## Math.random()

## Math.floor()

## parseInt()

字符串 -> 数值

## Arrow Function

匿名函数

## Rest Operator

参数封装为数组

## Spread Operator

深拷贝

## use strict

## import requires

## import * as … from …

## export default

默认导出，引用时无需使用 `{}`

## import subtract from …

