import{S as K,i as M,s as O,k as f,r as j,a as k,l as h,m as w,u as F,h as d,c as G,al as R,p as y,b as z,K as c,v as A,n as C,H as q}from"../chunks/index.aab8abc8.js";import{f as B}from"../chunks/flow.b20b7082.js";import{p as J}from"../chunks/stores.8b20bac1.js";import{g as L}from"../chunks/c4.0576f5b7.js";import{c as N}from"../chunks/flow-sequence-view.f7c30856.js";import{s as Q}from"../chunks/service.4f85688d.js";function T(a){var D,H;let s,r,t,o=((D=a[1][a[0].params.slug])==null?void 0:D.name)+"",n,_,e,p=((H=a[1][a[0].params.slug])==null?void 0:H.description)+"",g,b,v,E,m,I;return{c(){s=f("div"),r=f("header"),t=f("h2"),n=j(o),_=k(),e=f("p"),g=j(p),b=k(),v=f("div"),E=f("figure"),m=f("img"),this.h()},l(l){s=h(l,"DIV",{class:!0});var i=w(s);r=h(i,"HEADER",{});var u=w(r);t=h(u,"H2",{});var S=w(t);n=F(S,o),S.forEach(d),_=G(u),e=h(u,"P",{});var P=w(e);g=F(P,p),P.forEach(d),u.forEach(d),b=G(i),v=h(i,"DIV",{class:!0});var U=w(v);E=h(U,"FIGURE",{class:!0});var V=w(E);m=h(V,"IMG",{src:!0}),V.forEach(d),U.forEach(d),i.forEach(d),this.h()},h(){R(m.src,I=a[2])||y(m,"src",I),y(E,"class","flex justify-center"),y(v,"class","p-4 space-y-4"),y(s,"class","card variant-glass-primary p-4 shadow !text-white")},m(l,i){z(l,s,i),c(s,r),c(r,t),c(t,n),c(r,_),c(r,e),c(e,g),c(s,b),c(s,v),c(v,E),c(E,m)},p(l,[i]){var u,S;i&3&&o!==(o=((u=l[1][l[0].params.slug])==null?void 0:u.name)+"")&&A(n,o),i&3&&p!==(p=((S=l[1][l[0].params.slug])==null?void 0:S.description)+"")&&A(g,p),i&4&&!R(m.src,I=l[2])&&y(m,"src",I)},i:C,o:C,d(l){l&&d(s)}}}function W(a,s,r){let t,o,n;q(a,J,e=>r(0,t=e)),q(a,B,e=>r(1,o=e)),q(a,Q,e=>r(3,n=e));let _="";return a.$$.update=()=>{if(a.$$.dirty&11&&t.params.slug!=null&&o[t.params.slug]!=null){let e=[];for(const[p,g]of Object.entries(n))e.push(g);N(o[t.params.slug],e).then(p=>{r(2,_=L(p))})}},[t,o,_,n]}class ae extends K{constructor(s){super(),M(this,s,W,T,O,{})}}export{ae as default};
