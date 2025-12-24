---
title: "Scale Frontend Application: Journey from Zero to Millions of users."
pubDate: "2025-11-12T19:07:30.000Z"
link: "https://javascript.plainenglish.io/scale-frontend-application-journey-from-zero-to-millions-of-users-c4ca23cfad3a?source=rss-5979d543b442------2"
guid: "https://medium.com/p/c4ca23cfad3a"
slug: "scale-frontend-application-journey-from-zero-to-millions-of-users-2025-11-12t190730000z"
---

![](https://cdn-images-1.medium.com/max/1000/0*Oto9kONTPt1wvOZ_.jpg)

Scalability problem arises when the system is fast for single user but slow under heavy load.

A frontend application journey starts with a language and a framework to speed up development and setup.

Browsers only understand HTML, CSS and Javascript. The application code is more developer friendly and it needs to be converted to browser compatible format. This is where bundlers come in.  
The bundlers minify code, optimize images sizes and leverages techniques such as dynamic import and code-splitting to reduce overall size of application.

![](https://cdn-images-1.medium.com/max/233/0*PIJ04Sccg5kLbR1x.png)

Dynamic Import

![](https://cdn-images-1.medium.com/max/478/0*_3g564gyO1L78Cah.png)

Code Splitting

Along with that it uses Tree shaking to analyse the dependency tree and remove any unused code from final bundle. This enables to improve the load times and overall performance.

![](https://cdn-images-1.medium.com/max/466/0*DgCV6Vxzt-ijXdF1.png)

Tree Shaking

![](https://cdn-images-1.medium.com/max/800/0*2Z-X6d1OE7j-wVLp.png)

Webpack Bundler

The generated bundle is deployed to server. This is an application server which hosts the bundle.

The application server IP address needs to be mapped to a DNS record.

![](https://cdn-images-1.medium.com/max/614/0*J8mASJwZyoPpdwgo.png)

Application Server and DNS

If the application server is in India and the users are in North America then it would increase the latency for the users from North America to reach the server in India.

CDN (Content Delivery Network) is used to cache requested assets in nearby geographical regions. A combination of single or multiple CDN providers can be used to increase fault tolerance.

![](https://cdn-images-1.medium.com/max/800/0*zI3VZZSY7_c9S0Ae.png)

Application Server and DNS and CDN

![](https://cdn-images-1.medium.com/max/617/0*t5XTCLyfBhgJKkB3.png)

Map illustrating how CDN’s distribute content closer to users

With just one application server all the requests are directed to it.  
Think of a queue where users line up and each user is addressed at a time. In order to make the server available for all users, the application server can be scaled either Horizontally or Vertically.

![](https://cdn-images-1.medium.com/max/637/0*wRUmPJizkMMrNiT9.png)

Vertical scaling and Horizontal scaling

Vertical scaling means adding more RAM and more CPU cores.  
Horizontal scaling means adding more application servers.

Vertical scaling is easier which means a chef in a kitchen has more hands to address more users, but its more costly.

Horizontal scaling is cheaper than adding more RAM and CPU, simply adding another instance of application server. However now the user requests have to be directed to either of the application servers. This needs to be done by a Load Balancer.

The Load Balancer distributes the traffic among the application servers based on algorithms such as Round Robin or least connections.

![](https://cdn-images-1.medium.com/max/800/0*nmQB0lK6khJtclnF.png)

Application Server and DNS and CDN and load Balancer

Round robin methods distributes serially the requests to each server. This might lead to a scenario where one application server is processing a request and round robin hands another request, the new request needs to wait for the current one.

![](https://cdn-images-1.medium.com/max/722/0*OoTKxuScF0w9FmyY.png)

Round robin load balancing algorithm

Whereas, least used connection priorities which application server is available and redirects the request to that server.

![](https://cdn-images-1.medium.com/max/724/0*nbvhL_xkCk8FG6cp.png)

Least used connection load balancing

Nginx (“engine x”) a application load balancer is widely used.

If customers in a restaurant walk up to the chef to request for food then chaos erupts! A waiter ensures thats the requests are provided in a orderly fashion so the chef can focus on cooking.

The waiter (nginx) serves that static frontend files and redirects the traffic to backend server (acting like a reverse proxy for backend API’s)

![](https://cdn-images-1.medium.com/max/800/0*ZJGm80Hd354Rhgjh.png)

Nginx as reverse proxy

In order to ensure consistence between the application code developed locally and the one shipped to production environment a standard shipping mechanism is required — this provided by called Docker. Docker enables to pack all the application code and dependencies into a standardised box called containers.

![](https://cdn-images-1.medium.com/max/530/0*Udj3hcAiarHvyOo7.png)

Container applications on top of docker

![](https://cdn-images-1.medium.com/max/468/0*oym09RUBQYmnQ8VO.png)

Application Container

Instead of managing multiple application servers which are not may be utilised fully. All containers can reside within a single application server; thereby saving the cost of multiple servers and also ensuring consistency between local and deployed instance.

![](https://cdn-images-1.medium.com/max/800/0*C_Kc2PZFJO8F0Xxj.png)

Single application server with multiple containers

A team of a few developers can continue using a single code base to manage the entire application.

When each module is handled by a different team then splitting the monolithic codebase into fragments can help individual modules to be scaled separately and deployed without dependency.

MicroFrontend Architecture enables to deploy each module separately and leverage dependent modules at runtime. Each module is deployed separately without any dependency.

![](https://cdn-images-1.medium.com/max/800/0*5WFfxulSTEPRHX0F.png)

Monolith to Microfrontend

ModuleFederation works on three core concepts — expose something, consume something and share dependencies.

MicroFrontend solves a organizational problem not a technical problem.

### MicroFrontend can be achieved using different techniques:

1.  Publish each app as an NPM package
2.  Bundle each micro-app individually and load with a script tag
3.  Using micro frontend frameworks
4.  Using Module Federation with webpack 5

### MicroFrontend brings in unique challenges like:

1.  How to setup inter-communication between individual modules?
2.  How to share data state ?
3.  How to fetch the types of federated modules ?
4.  How to unit test modules dependent on other federated modules ?
5.  How to improve the developer experience of connecting different federated modules ?
6.  How to improve the performance ?

We will explore these in future. For now thats all!! Add in your thoughts and queries in comments section.

_Originally published at_ [_https://dev.to_](https://dev.to/akashpal/scale-frontend-application-journey-from-zero-to-millions-of-users-1697) _on November 12, 2025._

![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=c4ca23cfad3a)

* * *

[Scale Frontend Application: Journey from Zero to Millions of users.](https://javascript.plainenglish.io/scale-frontend-application-journey-from-zero-to-millions-of-users-c4ca23cfad3a) was originally published in [JavaScript in Plain English](https://javascript.plainenglish.io) on Medium, where people are continuing the conversation by highlighting and responding to this story.