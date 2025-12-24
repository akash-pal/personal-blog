---
title: "Javascript Patterns in ES6"
pubDate: "2024-05-15T20:16:27.000Z"
link: "https://medium.com/front-end-weekly/javascript-patterns-in-es6-872d7fa18e14?source=rss-5979d543b442------2"
guid: "https://medium.com/p/872d7fa18e14"
slug: "javascript-patterns-in-es6-2024-05-15t201627000z"
---

![](https://cdn-images-1.medium.com/max/1024/0*eCKieR9sLmzgF0mN)

Photo by [Angèle Kamp](https://unsplash.com/@angelekamp?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)

#### 1\. Module Pattern

️ℹ️ Splits large file into multiple smaller reusable pieces.

**_Html_**

*   adding the type="module" attribute to the script tags

**_Node_**

*   Using the .mjs extension
*   Adding "type": "module" to your package.json

<a href="https://medium.com/media/f12dd35a3779ffe04ac126dffc8a078d/href">https://medium.com/media/f12dd35a3779ffe04ac126dffc8a078d/href</a>

✅ **Encapsulation —** values within a module are private by default

✅ **Reusability** — modules can be reused

#### 2\. Singelton Pattern

️ℹ️ ️️Allows class to have single instance only, which cannot be modified and is available globally.

<a href="https://medium.com/media/58c14d18520c76075a8f5955c8ce6ece/href">https://medium.com/media/58c14d18520c76075a8f5955c8ce6ece/href</a><a href="https://medium.com/media/6bb559761954f813b3da4f96fb5fcb84/href">https://medium.com/media/6bb559761954f813b3da4f96fb5fcb84/href</a><a href="https://medium.com/media/18214d8333adbb5668f31791a3202b60/href">https://medium.com/media/18214d8333adbb5668f31791a3202b60/href</a>

**✅ Memory —** Reduced memory, setup for just one instance and reused

**❌ Un-necessary —** ES2015 Modules are singletons by default.

**❌ Dependency Hiding —** importing module may or may not be singleton

**❌Global Scope Pollution —** same as global variable can result in over-writing singleton value

#### 3\. Proxy Pattern

️ℹ️ Utilises proxy to intercept and control interaction stoa target object

<a href="https://medium.com/media/253e48741574aeee83b53fe5413cca30/href">https://medium.com/media/253e48741574aeee83b53fe5413cca30/href</a><a href="https://medium.com/media/466730fb5b594c28f7757d5f8b4e3116/href">https://medium.com/media/466730fb5b594c28f7757d5f8b4e3116/href</a>

**✅ Control —** adds functionality when interacting with objects

**❌ Long handler execution —** performance issues due to executing handles on every object

#### 4\. Observer Pattern

️ℹ️ Use observables to notify subscribers when an event occurs

<a href="https://medium.com/media/400f3964eafb071d38e9954d862b3440/href">https://medium.com/media/400f3964eafb071d38e9954d862b3440/href</a>

**✅ Separation of Concerns —** observers can be decoupled from the observable object any time.

**❌ Decreased performance —** too many subscribers or complex observer handling can result in delay in notifying all subscribers

#### 5\. Factory Pattern

️ℹ️ Use a factory function in order to create objects

<a href="https://medium.com/media/562d5205a2bf056d90dc2a69958e09d5/href">https://medium.com/media/562d5205a2bf056d90dc2a69958e09d5/href</a>

**✅ DRY —** multiple objects with same properties can be created

**❌ Not really a pattern —** function that returns an object

#### 6\. Prototype Pattern

️ℹ️ Share properties among many objects of the same type

<a href="https://medium.com/media/ccfd3b86c0d083cff833aa0670961cbe/href">https://medium.com/media/ccfd3b86c0d083cff833aa0670961cbe/href</a>

**✅ Memory efficient —** common methods and properties moved to prototype.

**❌ Readability —** extending classes multiple times may result in difficulty in tracing the method and properties origin.

![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=872d7fa18e14)

* * *

[Javascript Patterns in ES6](https://medium.com/front-end-weekly/javascript-patterns-in-es6-872d7fa18e14) was originally published in [Frontend Weekly](https://medium.com/front-end-weekly) on Medium, where people are continuing the conversation by highlighting and responding to this story.