(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{105:function(e,t,r){"use strict";r.r(t);var n=r(11);r.d(t,"MemoryRouter",(function(){return n.d})),r.d(t,"Prompt",(function(){return n.f})),r.d(t,"Redirect",(function(){return n.g})),r.d(t,"Route",(function(){return n.h})),r.d(t,"Router",(function(){return n.i})),r.d(t,"StaticRouter",(function(){return n.j})),r.d(t,"Switch",(function(){return n.k})),r.d(t,"generatePath",(function(){return n.l})),r.d(t,"matchPath",(function(){return n.m})),r.d(t,"useHistory",(function(){return n.n})),r.d(t,"useLocation",(function(){return n.o})),r.d(t,"useParams",(function(){return n.p})),r.d(t,"useRouteMatch",(function(){return n.q})),r.d(t,"withRouter",(function(){return n.r})),r.d(t,"BrowserRouter",(function(){return n.a})),r.d(t,"HashRouter",(function(){return n.b})),r.d(t,"Link",(function(){return n.c})),r.d(t,"NavLink",(function(){return n.e}))},73:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return u})),r.d(t,"metadata",(function(){return a})),r.d(t,"rightToc",(function(){return f})),r.d(t,"default",(function(){return p}));var n=r(3),o=r(7),c=(r(0),r(99)),i=r(105),u={id:"overview",title:"Overview",sidebar_label:"Overview"},a={unversionedId:"overview",id:"overview",isDocsHomePage:!1,title:"Overview",description:"const Home = () => {",source:"@site/docs/overview.md",slug:"/overview",permalink:"/docs/overview",editUrl:"https://github.com/facebook/pyre-check/tree/master/documentation/website/docs/overview.md",version:"current",sidebar_label:"Overview"},f=[],d={rightToc:f};function p(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(c.b)("wrapper",Object(n.a)({},d,r,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,"const Home = () => {\nreturn ",Object(c.b)(i.Redirect,{to:"/docs/getting-started",mdxType:"Redirect"}),";\n};"))}p.isMDXComponent=!0},99:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return v}));var n=r(0),o=r.n(n);function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){c(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var f=o.a.createContext({}),d=function(e){var t=o.a.useContext(f),r=t;return e&&(r="function"==typeof e?e(t):u(u({},t),e)),r},p=function(e){var t=d(e.components);return o.a.createElement(f.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},l=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,c=e.originalType,i=e.parentName,f=a(e,["components","mdxType","originalType","parentName"]),p=d(r),l=n,v=p["".concat(i,".").concat(l)]||p[l]||s[l]||c;return r?o.a.createElement(v,u(u({ref:t},f),{},{components:r})):o.a.createElement(v,u({ref:t},f))}));function v(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var c=r.length,i=new Array(c);i[0]=l;var u={};for(var a in t)hasOwnProperty.call(t,a)&&(u[a]=t[a]);u.originalType=e,u.mdxType="string"==typeof e?e:n,i[1]=u;for(var f=2;f<c;f++)i[f]=r[f];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,r)}l.displayName="MDXCreateElement"}}]);