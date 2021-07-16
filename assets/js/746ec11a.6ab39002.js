(self.webpackChunk=self.webpackChunk||[]).push([[331],{3905:(e,n,t)=>{"use strict";t.d(n,{Zo:()=>p,kt:()=>m});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=r.createContext({}),l=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=l(e.components);return r.createElement(c.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=l(t),m=o,h=u["".concat(c,".").concat(m)]||u[m]||d[m]||a;return t?r.createElement(h,i(i({ref:n},p),{},{components:t})):r.createElement(h,i({ref:n},p))}));function m(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=u;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var l=2;l<a;l++)i[l]=t[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},3070:(e,n,t)=>{"use strict";t.r(n),t.d(n,{frontMatter:()=>l,metadata:()=>p,toc:()=>d,default:()=>h});var r,o=t(2122),a=t(9756),i=(t(7294),t(3905)),s=t(4256),c=["components"],l={id:"code-6065-public",title:"6065 - Commandline arguments injection",sidebar_label:"6065 - Commandline arguments injection"},p={unversionedId:"warning_codes/code-6065-public",id:"warning_codes/code-6065-public",isDocsHomePage:!1,title:"6065 - Commandline arguments injection",description:"TL;DR",source:"@site/docs/warning_codes/6065.md",sourceDirName:"warning_codes",slug:"/warning_codes/code-6065-public",permalink:"/docs/warning_codes/code-6065-public",editUrl:"https://github.com/facebook/pyre-check/tree/master/documentation/website/docs/warning_codes/6065.md",version:"current",sidebar_label:"6065 - Commandline arguments injection",frontMatter:{id:"code-6065-public",title:"6065 - Commandline arguments injection",sidebar_label:"6065 - Commandline arguments injection"},sidebar:"pysa",previous:{title:"5001 - Code Injection",permalink:"/docs/warning_codes/code-5001-public"},next:{title:"Additional Resources",permalink:"/docs/pysa-additional-resources"}},d=[{value:"TL;DR",id:"tldr",children:[{value:"ISSUE",id:"issue",children:[]},{value:"EXAMPLE",id:"example",children:[]},{value:"RECOMMENDED SOLUTION",id:"recommended-solution",children:[]}]}],u=(r="Fb6065Solution",function(e){return console.warn("Component "+r+" was not imported, exported, or provided by MDXProvider as global scope"),(0,i.kt)("div",e)}),m={toc:d};function h(e){var n=e.components,t=(0,a.Z)(e,c);return(0,i.kt)("wrapper",(0,o.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"tldr"},"TL;DR"),(0,i.kt)("p",null,"This category indicates that user-controlled input flows into a command-line argument used to execute an external process. Unlike category 5001, this leads to a Remote Code Execution issue only in specific cases (e.g., ",(0,i.kt)("inlineCode",{parentName:"p"},"shell=True")," parameter or when executing particular binaries)."),(0,i.kt)("h3",{id:"issue"},"ISSUE"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"subprocess.Popen"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"subprocess.run"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"subprocess.call"),", and other functions do a good job in preventing by default the command injection issues we described in category ",(0,i.kt)("a",{parentName:"p",href:"/docs/warning_codes/code-5001-public"},"5001"),". The values supplied in the ",(0,i.kt)("inlineCode",{parentName:"p"},"args")," parameter (excluding the first which represents the executable) are considered only as arguments and not as commands to be interpreted in a system shell (more details in the python ",(0,i.kt)("a",{parentName:"p",href:"https://docs.python.org/3/library/subprocess.html#subprocess.Popen"},"documentation"),"). However, this safe behaviour can be manually bypassed by specifying the ",(0,i.kt)("inlineCode",{parentName:"p"},"shell=True")," parameter, which reintroduces the command injection issue."),(0,i.kt)("h3",{id:"example"},"EXAMPLE"),(0,i.kt)("p",null,"The following code is intended to run the spellcheck binary on a user provided text:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"def spellcheck(request: HttpRequest):\n    command = \"/usr/bin/spellcheck -l {}\".format(request.GET['text'])\n    return subprocess.run(command, shell=True)\n")),(0,i.kt)("p",null,"An attacker, however, can supply a path such as ",(0,i.kt)("inlineCode",{parentName:"p"},"'test' && rm -rf /"),", which would result in the following command being executed: ",(0,i.kt)("inlineCode",{parentName:"p"},"/usr/bin/spellcheck -l 'test' && rm -rf /"),". Since this command is executed in a system shell the ",(0,i.kt)("inlineCode",{parentName:"p"},"rm -rf /")," command will be executed after the spellcheck command."),(0,i.kt)("h3",{id:"recommended-solution"},"RECOMMENDED SOLUTION"),(0,i.kt)(s.OssOnly,{mdxType:"OssOnly"},(0,i.kt)("p",null,"In general, we recommend avoiding creation of a subprocess and prefer using the API provided by the language.\nHowever, if you need to create a subprocess, we recommend using a safe API such as ",(0,i.kt)("inlineCode",{parentName:"p"},"subprocess.run")," and avoiding use of the ",(0,i.kt)("inlineCode",{parentName:"p"},"shell=True")," argument. If this is not possible, we recommend ensuring that the user-controlled values are shell-escaped with ",(0,i.kt)("inlineCode",{parentName:"p"},"shlex.quote"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},'def spellcheck(request: HttpRequest):\n    command = ["/usr/bin/spellcheck", "-l", request.GET[\'text\']]\n    subprocess.run(command)\n')),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"NOTE: be conscious of the fact that arguments to an executable can still lead to code execution (e.g., the ",(0,i.kt)("inlineCode",{parentName:"em"},"-exec")," argument of ",(0,i.kt)("inlineCode",{parentName:"em"},"find"),")."))),(0,i.kt)(s.FbInternalOnly,{mdxType:"FbInternalOnly"},(0,i.kt)(u,{mdxType:"Fb6065Solution"})))}h.isMDXComponent=!0}}]);