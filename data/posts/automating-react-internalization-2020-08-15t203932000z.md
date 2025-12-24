---
title: "Automating React Internalization"
pubDate: "2020-08-15T20:39:32.000Z"
link: "https://medium.com/weekly-webtips/complete-guide-on-react-internalization-92fdd9e87a9c?source=rss-5979d543b442------2"
guid: "https://medium.com/p/92fdd9e87a9c"
slug: "automating-react-internalization-2020-08-15t203932000z"
---

![](https://cdn-images-1.medium.com/max/1024/0*Ix1U3NHw9BbCnqLN)

Photo by [Nicola Nuttall](https://unsplash.com/@nicnut?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)

The ability to use a system across different locals based on the region.

✅According to [W3C](https://www.w3.org/International/questions/qa-i18n):

> **Internalization** is the design and development of a product, application or document content that enables easy **localization** for target audiences that vary in culture, region or language.

> **Internalization** is often written in English as i18n, where 18 is the number of letters between i and n in the English word.

> **Localization** is sometimes written in English as l10n, where 10 is the number of letters in the English word between l and n.

![](https://cdn-images-1.medium.com/max/1024/1*Q-8W--wiRddIF5XyUxTyHQ.png)

### Translation using React-intl

Translations work with plain text only not code. So the translations with variables need to be formatted and split into String template and runtime data.

<span>Hello {name}</span>

The String template goes to translator and runtime data remains in code. This is achieved by the Standard ICU (International Components For Unicode) Message Format.

### Types of formatting

1.  Variables:

Hello {name}  
Hello John

2\. Date/Number formatting:

Today is {now, date}  
Today is 9th August 2020

3\. Formatting Options:

Interest rate is {rate, number, percent}  
Interest rate is 5%

4\. Pluralization:

{count, plural, one {# book} other {# books}}  
1 book, 2 books

### Steps in translation

1.  Message Declaration
2.  Message Extraction
3.  Make Catalog
4.  Compiling Messages
5.  Message Distribution

### 📔 Message Declaration

There are three ways to declare messages:

1.  Using imperative API intl.formatMessage

![](https://cdn-images-1.medium.com/max/1024/1*mRl2VdqFUuXKOa4rOdio9g.png)

2\. Using React API <FormattedMessage/>

![](https://cdn-images-1.medium.com/max/1024/1*bKmAa8AmyEnmke8X4YSimw.png)

3\. Pre-declaring using defineMessage for later consumption (less recommended)

![](https://cdn-images-1.medium.com/max/1024/1*5K1si6ivnb49-cdLKFlbwQ.png)

### 🧲Message Extraction

It is the process of extracting all messages that have been declared into a single JSON file.

For the purpose of extracting the messages there are two options:

1.  [Formatjs](https://formatjs.io/docs/getting-started/message-extraction).

**_Installation_**

npm install formatjs

**_Usage_**

Add the below script to package.json

![](https://cdn-images-1.medium.com/max/1024/1*VDWiBWz_nvQg4l7ZqXmAYg.png)

\--out-file \[path\]  
The target file path where the plugin will output an aggregated .json file of all the translations from the files supplied. This flag will ignore --messages-dir

It extracts the messages to lang folder inside the src folder.

\--id-interpolation-pattern \[pattern\]  
If certain message descriptors don't have id, this pattern will be used to automatically generate IDs for them. Default to \[contenthash:5\].

**_Example output:_**

![](https://cdn-images-1.medium.com/max/1024/1*n7Sk7k4FYEEw6aXOGBPdqg.png)

[2\. babel-plugin-react-intl](https://formatjs.io/docs/tooling/babel-plugin)

**_Installation_**

npm install babel-plugin-react-intl

**_Usage_**

Create a .babelrc file with the below content:

![](https://cdn-images-1.medium.com/max/1024/1*x7FXzFgKSvPRwe4jPxM29Q.png)

**Add the below script to** **package.json**

![](https://cdn-images-1.medium.com/max/1024/1*-aifSHuaAQcLvPVgAYQ9LQ.png)

**_Example output:_**

![](https://cdn-images-1.medium.com/max/1024/1*nrK9bl4EbNy9eiK8hAP3bg.png)

### 📚Make Catalog

The extracted message from the previous step is sent to a TMS (Translation Management System) to generate different translated locals.

This can be achieved with any of the Translation Vendors.

For integration with Google Translate API: [react-intl-auto-translate](https://github.com/tmkasun/react-intl-auto-translate)

**Example of** **fr.json**

![](https://cdn-images-1.medium.com/max/1024/1*Fj3lGWjmPBLOpTmgA3x51w.png)

### 💥Compiling Messages

The translated messages are then processed to react intl format.

**Installation**

npm install formatjs

**Usage**

Add the below script to package.json

![](https://cdn-images-1.medium.com/max/1024/1*j9mELBhc12yPMgj0U-A2mg.png)

The below command compiles a single file:

![](https://cdn-images-1.medium.com/max/1024/1*Ya84tb0tW6hi_P9Jbd8pjQ.png)

The gulpfile.js compiles all the files from lang folder to compiled-lang folder.

![](https://cdn-images-1.medium.com/max/1024/1*nRi7a55fOgEdJYea22Y_CA.png)

Compiled fr.json

![](https://cdn-images-1.medium.com/max/1024/1*oGlWiwqCKhKDzZIWhLsrzQ.png)

### 📫Message Distribution

Below is the projected structure followed:

![](https://cdn-images-1.medium.com/max/1024/1*pN4aG3CklvPi7vXmuYuBCw.png)

The current local is decided based on the browser locale:

![](https://cdn-images-1.medium.com/max/1024/1*PLNo996_Irvp1VvYHI3z5w.png)

Dynamic import is used to load the specific compiled-lang file based on the language:

![](https://cdn-images-1.medium.com/max/1024/1*gn1QQCVWH9myhMrBIw3b6A.png)

![](https://cdn-images-1.medium.com/max/981/0*2r49p4BjQeGKJMEa.gif)

[akash-pal/React-internalization](https://github.com/akash-pal/React-internalization)

### 🛡References

1.  [Localizing your react app](https://blog.idagio.com/localizing-your-react-app-the-right-way-a51ca600c430)
2.  [React app with react-intl + Example](https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-react-app-with-react-intl)
3.  [How to Internationalize (i18n) React 16+ App with react-intl Package](https://www.positronx.io/how-to-internationalize-i18n-react-app-with-react-intl-package/)
4.  [Help wanted Using react-intl](https://github.com/facebook/create-react-app/issues/1227#issuecomment-266202754)
5.  [How To Use React-Intl: internationalize your React app](https://gist.github.com/eveningkid/6df7d35d1884854a6d9ecaaac89fd2ae)

![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=92fdd9e87a9c)

* * *

[Automating React Internalization](https://medium.com/weekly-webtips/complete-guide-on-react-internalization-92fdd9e87a9c) was originally published in [Webtips](https://medium.com/weekly-webtips) on Medium, where people are continuing the conversation by highlighting and responding to this story.