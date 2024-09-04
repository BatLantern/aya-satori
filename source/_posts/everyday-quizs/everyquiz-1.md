---
title: 每日一题#1——位运算
date: 2023-10-16 23:55:00
author: 蝙蝠猫BatBattery
categories: [每日一题]
tags: [算法, 计算机, C#]
thumbnail: "https://www.freeimg.cn/i/2023/10/16/652cf4473f1de.jpg"
excerpt: "今天的力扣签到题为 260. 只出现一次的数字III\n给你一个整数数组nums，其中恰好有两个元素只出现一次，其余所有元素均出现两次。找出只出现一次的那两个元素。你可以按任意顺序返回答案"
copyright: 懒得写版权,本篇只是学习笔记.转载,引用随意,添加来源即可.
---
{% notel pink 寄语 %}
**时光流转，愿你终有一天能和你重要的人重逢。**
 　　　　　　　　  *——艾拉《可塑性记忆》*
{% endnotel %}

---

### 引言

**从今天开始会写blog，主要是记笔记以防后期忘记，同时也会记一些重要的知识点。**

---

### 题目描述

今天的力扣签到题为[*260. 只出现一次的数字 III*](https://leetcode.cn/problems/single-number-iii/description/)，题目如下：

> 给你一个整数数组 `nums`，其中恰好有两个元素只出现一次，其余所有元素均出现两次。 找出只出现一次的那两个元素。你可以按 **任意顺序** 返回答案。
>
> 你必须设计并实现线性时间复杂度的算法且仅使用常量额外空间来解决此问题。
>
> ```
> 输入：nums = [1,2,1,3,2,5]
> 输出：[3,5]
> 解释：[5, 3] 也是有效的答案。
> ```

看到这道题，我脑子里第一个想法就是用ide的内置函数 。

在C#中有个叫count()的函数，它的功能是计算序列中的元素数量。
如果不填参数，将返回元素的个数。

若填写参数，这个函数的功能就会变成计算序列中满足某个条件时的元素数量。
这个时候，我就可以用这个函数来寻找需要的结果。

---

### 方法和思路

#### 方法一：内置函数

```csharp
public int[] SingleNumber(int[] nums) {
　int[] answer = new int[2];
　int j = 0;
  //遍历整个数组并找到只出现一次的值
　for (int i = 0; i < nums.Length; i++) {
　　int count = nums.Count(n => n == nums[i]);
    //有则存入answer数组
　　if(count == 1) {
　　　answer[j] = nums[i];
　　　j++;
　　}
　}
　return answer;
}
```

非常耗时间 **(2748ms)** 和空间 **(44.10MB)**

---

#### 方法二：哈希集合

基于内置函数真的太慢的情况下，我想了一个别的方法。

我采用了哈希集合，它采用了一种数据结构来存储数字频率，如果要查询频率，它完全可以在常数时间内返回结果。

所以先创建一个哈希集合，如果在这个哈希集合中能找到这个数字，则说明这个数字出现了两次；反之如果没寻找到，则说明这个数字只出现了一次。

```csharp
public int[] SingleNumber(int[] nums) {
　HashSet<int> numsCounts = new();
　//遍历整个数组
　foreach (int i in nums) {
　　//如果在集合中找到了重复元素，就把它剔除；如果没找到就添加进去
　　if(numsCounts.Contains(i))
　　　numsCounts.Remove(i);
　　else
　　　numsCounts.Add(i);
　　}
　//以数组形式返回
　return numsCounts.ToArray();
}
```

**优化:**

因为哈希集合是不包含重复元素的集合，所以如果有重复元素添加时他会跳过。

Add方法中，如果添加的元素是重复的，他不会添加，只会返回一个false，告诉你添加失败

所以就可以用这个性质对 `Foreach`进行优化，把循环内的代码变成只有一个if判断

```csharp
//若添加失败(有重复)则把这个数字剔除
if(!numsCounts.Add(i))
      numsCounts.Remove(i);
```

通过这种方法得出的结果和优化前差不多，但是更简洁。

通过这种方法得出的结果，耗时 **(152ms)** 和空间 **(42.55MB)**。

---

#### 方法三：位运算

因为这个题目的标签里面有位运算，所以我一直在想怎么用，但是一整天都没想出来。

怎么办呢？那只好去翻翻题解了。

* X⊕X=0(相同数字会抵消) 　　　 　　
* 0⊕X=X(0与某数异或等于那个数)

异或运算的原理如上所示，现在将所有数字异或，必定得到一个不为0的数。

若输入为 `[1, 2, 1, 3, 2, 5]`，则他们的异或结果应该是3^5(这两个数字就是我们要求的答案)

然后将这个得出来的数的**补码**(一种负数二进制形式)和它自己(也就是刚刚异或的结果)进行**与运算**。

这样可以得到只有最低位是1的二进制码，这个位就是两个只出现一次的数字在二进制表示上的差异。

以下为步骤表格：看表格，3和5从右往左第一个差异是不是第二位不一样？所以异或结果的补码只有第二位为1。

> | 步骤/数字 | 3   | 5   | 3^5 |
> | --------- | --- | --- | --- |
> | 二进制码  | 011 | 101 | 110 |
> | 反码      | 100 | 010 | 001 |
> | 补码      | 101 | 011 | 010 |

现在就可以对原数组的每一个数进行与运算后分类，有0的分为一组，有1的分为一组。

以下是分类结果：针对输入为 `[1, 2, 1, 3, 2, 5]`的为例

* 1：2, 2, 3
* 0：1, 1, 5

经过"分治"的过程，问题转化成了简单的 **"在偶数次数字里找到只出现一次的元素"**。

现在只要遵循异或的运算规则，将一个类总的所有元素全部异或，偶数次的元素会被相互抵消，然后就会剩下只出现一次的元素了。

```csharp
public int[] SingleNumber(int[] nums) {
　//定义
　int numsxor = 0;
　int[] res = new int[2];
　//所有元素异或
　foreach (int num in nums)
　　numsxor ^= num;
　//异或结果和补码与运算，得到最低位为1的二进制码
　//就是取最右边的那个1，这个1保留，其他全改成0
　int answer = numsxor & (-numsxor);
　//用这个码对数组分类
　foreach (int num in nums)
　{
　　//全部异或抵消得到结果
　　if ((answer & num) == 0)
　　　res[0] ^= num;
　　else
　　　res[1] ^= num;
　}
　return res;
}
```

通过这种方法得出的结果，耗时 **(132ms)** 和空间 **(42.39MB)**。

---

### 结语和留言

今天是第一天，希望自己能坚持下去。

---

**笔记完毕 编辑完毕时间CST 10.16 23:55**

最后修改于8.15 00:05