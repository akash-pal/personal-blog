---
title: "The Rise of Shadow DOM"
pubDate: "2018-11-29T04:29:28.000Z"
link: "https://medium.com/front-end-weekly/the-rise-of-shadow-dom-84aa1f731e82?source=rss-5979d543b442------2"
guid: "https://medium.com/p/84aa1f731e82"
slug: "the-rise-of-shadow-dom-2018-11-29t042928000z"
---

![](https://cdn-images-1.medium.com/max/1024/0*yDxUfR_n4ssjqDYq)

Photo by [Zack Woolwine](https://unsplash.com/@onebackpackphotography?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)

CSS rules are applied globally within a document. Shadow DOM enables to create self-contained HTML, CSS, and JavaScript. (i.e. **Web Components**) This is the rise of shadow DOM.

> Shadow DOM is a separate DOM tree of elements which is not part of main document DOM but when it renders, it behaves as part of the main document DOM.

![](https://cdn-images-1.medium.com/max/1024/1*TSOpITlAqbyYC_UYYW7zMg.png)

Shadow DOM

*   **Shadow host**: The regular DOM node that the shadow DOM is attached to.
*   **Shadow tree**: The DOM tree inside the shadow DOM.
*   **Shadow boundary**: the place where the shadow DOM ends, and the regular DOM begins.
*   **Shadow root**: The root node of the shadow tree.

<a href="https://medium.com/media/18214d8333adbb5668f31791a3202b60/href">https://medium.com/media/18214d8333adbb5668f31791a3202b60/href</a>

### Creating shadow DOM — attachShadow

![](https://cdn-images-1.medium.com/max/1024/1*XxFLQ-Gvay-DFcAxrcYjOg.png)

![](https://cdn-images-1.medium.com/max/1024/1*IqaifR8bZYtkku-5Bn_x0Q.png)

![](https://cdn-images-1.medium.com/max/1024/1*r-fzcB8Xx_FeHBYjStUx3g.png)

![](https://cdn-images-1.medium.com/max/918/1*hOxRhp-bwABfWXAQyiDjyg.png)

![](https://cdn-images-1.medium.com/max/1024/1*gW_e5shiREcOEX0djcvxJA.png)

Result on browser

The ‘**_Inside Shadow DOM_**’ and ‘**_Outer Element_**’ are visible. However the **_‘Shadow Root’_** is hidden. The global css class gets applied to the DOM outside Shadow DOM. This reflects the idea of scoped css.

### Types of Shadow DOM Modes — Open vs Closed

var shadowRoot = host.attachShadow({mode: 'open'});  
console.log(host.shadowRoot); 

![](https://cdn-images-1.medium.com/max/564/1*KR-pIKF3BPUGqqZ5NeLp2A.png)

Open Shadow DOM

var shadowRoot = host.attachShadow({mode: 'closed'});  
console.log(host.shadowRoot); //null

**Open**: The shadow DOM/ internal DOM of the component is accessible from outside JavaScript.

**Closed**: The shadow DOM/ internal DOM of the component is not accessible outside JavaScript. The **<video>** tag is an example of closed-mode shadow root.

### Creating shadow DOM — **Using Template Approach**

As the content of the Shadow DOM increases, making use of appendChild/innerHTML is not feasible. So template tags are used to better create Shadow Elements.

Template HTML tag are not displayed.The content can be visible and rendered later by using JavaScript.

<div id="shadowHost">Shadow Root</div>  
<template id="demo">  
  <style>\*{ color: blue; }</style>  
  <div><span class="name">Inside Shadow DOM</span></div>  
</template>  
<div>  
<div class="x">Outer Element</div>

JS

var host = document.querySelector('#shadowHost');  
var shadowRoot = host.createShadowRoot();  
shadowRoot.appendChild(document.querySelector('#demo').content);

![](https://cdn-images-1.medium.com/max/1024/1*qO1oNDY4hvzW5R2TenjvEw.png)

![](https://cdn-images-1.medium.com/max/1024/1*rYB-0qH79MmIQ7yHNHw3Lg.png)

### **Creating Web Components Using Shadow DOM**

<my-web-component></my-web-component>  
<div class="x">Outer Element</div>

CSS

.x{  
  color:red;  
}

JS

class MyWebComponent extends HTMLElement {  
    
  constructor() {  
    super();  
    this.attachShadow({  
      mode: "open"  
    });  
  }  
    
  connectedCallback() {

    var div = document.createElement('div');  
    div.textContent = "Inside Shadow DOM";  
    div.className = "x";

    this.shadowRoot.appendChild(div);

  }  
}

window.customElements.define("my-web-component", MyWebComponent);

### Web Components **Using Template tag**

HTML

<div id="shadowHost">Shadow Root</div>  
<template id="demo">  
  <style>\*{ color: blue; }</style>  
  <div><span class="name">Inside Shadow DOM</span></div>  
</template>  
<div>  
<div class="x">Outer Element</div>

JS

class MyWebComponent extends HTMLElement {  
  constructor() {  
    super();  
    this.attachShadow({  
      mode: "open"  
    });  
  }  
  connectedCallback() {

   this.shadowRoot.appendChild(  
      document.querySelector('#demo').content);

  }  
}

window.customElements.define("my-web-component", MyWebComponent);

With **Open Shadow Mode** the inner content of the shadow DOM is accessible from outside

const $myWebComponent = document.querySelector("my-web-component");  
$myWebComponent.shadowRoot.querySelector("div").innerText = "Modify inner content";

![](https://cdn-images-1.medium.com/max/648/1*u-OX5rDxUwRgIrbMaZ0r3Q.gif)

The difference with **Closed Shadow Mode** is how inner content of the shadow DOM is accessible from outside.

const $myWebComponent = document.querySelector("my-web-component");  
$myWebComponent.shadowRoot; // null  
$myWebComponent.\_root.querySelector("div").innerText = "Changed";

![](https://cdn-images-1.medium.com/max/648/1*sp4EqDoCSpKPDb-1LZtljA.gif)

### **Slots in Web Components:**

Slots provide flexibility to web components to add custom content within the component.

Slots are defined using the **slot** tag and **name** attribute and the default content . This tag is pace within the components template tag.

For making use of slots , include an HTML structure within **my-web-component** with a **slot** attribute whose value is equal to the **name (_innerText_)** of the slot we wish to fill in.

<my-web-component>  
  **<span slot="innerText">Input Inner Text</span>**  
</my-web-component>

<template id="demo">  
  <style>\*{ color: blue; }</style>  
  <div>  
     **<slot name="innerText">Default Inside Shadow DOM</slot>**  
  </div>  
</template>

<div class="x">Outer Element</div>

![](https://cdn-images-1.medium.com/max/982/1*8aqtBsZEW5J4dsSd7HxdFw.png)

If the slot is not used , then the default content is printed as it is.

<my-web-component>  
</my-web-component>

<template id="demo">  
  <style>\*{ color: blue; }</style>  
  <div>  
     **<slot name="innerText">Default Inside Shadow DOM</slot>**  
  </div>  
</template>

<div class="x">Outer Element</div>

![](https://cdn-images-1.medium.com/max/1016/1*r28fDHKriYFn3-jLIImK5A.png)

![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=84aa1f731e82)

* * *

[The Rise of Shadow DOM](https://medium.com/front-end-weekly/the-rise-of-shadow-dom-84aa1f731e82) was originally published in [Frontend Weekly](https://medium.com/front-end-weekly) on Medium, where people are continuing the conversation by highlighting and responding to this story.