(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{64:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return i})),t.d(n,"metadata",(function(){return l})),t.d(n,"rightToc",(function(){return c})),t.d(n,"default",(function(){return d}));var a=t(3),r=t(7),o=(t(0),t(96)),i={id:"pysa-model-dsl",title:"Model Domain Specific Language (DSL)",sidebar_label:"Model DSL"},l={unversionedId:"pysa-model-dsl",id:"pysa-model-dsl",isDocsHomePage:!1,title:"Model Domain Specific Language (DSL)",description:"We have started developing a model Domain Specific Language (DSL) that can be",source:"@site/docs/pysa_model_dsl.md",slug:"/pysa-model-dsl",permalink:"/docs/pysa-model-dsl",editUrl:"https://github.com/facebook/pyre-check/tree/master/documentation/website/docs/pysa_model_dsl.md",version:"current",sidebar_label:"Model DSL",sidebar:"pysa",previous:{title:"Dynamically Generating Models",permalink:"/docs/pysa-model-generators"},next:{title:"Debugging False Negatives",permalink:"/docs/pysa-false-negatives"}},c=[{value:"Basics",id:"basics",children:[]},{value:"Find clauses",id:"find-clauses",children:[]},{value:"Where clauses",id:"where-clauses",children:[{value:"<code>name.matches</code>",id:"namematches",children:[]},{value:"<code>return_annotation</code> clauses",id:"return_annotation-clauses",children:[]},{value:"<code>any_parameter</code> clauses",id:"any_parameter-clauses",children:[]},{value:"<code>AnyOf</code> clauses",id:"anyof-clauses",children:[]},{value:"<code>any_decorator</code> clauses",id:"any_decorator-clauses",children:[]},{value:"<code>parent.matches</code> clause",id:"parentmatches-clause",children:[]}]},{value:"Generated models",id:"generated-models",children:[{value:"Returned taint",id:"returned-taint",children:[]},{value:"Parameter taint",id:"parameter-taint",children:[]},{value:"Tainting all parameters",id:"tainting-all-parameters",children:[]}]}],s={rightToc:c};function d(e){var n=e.components,t=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},s,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("p",null,"We have started developing a model Domain Specific Language (DSL) that can be\nused to solve many of the same problems as ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"/docs/pysa-model-generators"}),"model\ngenerators"),", while still keeping model information in\n",Object(o.b)("inlineCode",{parentName:"p"},".pysa")," files. The DSL aims to provide a compact way to generate models for all\ncode that matches a given query. This allows users to avoid writing hundereds or\nthousand of models."),Object(o.b)("h2",{id:"basics"},"Basics"),Object(o.b)("p",null,"The most basic form of querying Pysa's DSL is by generating models based on function names. To\ndo so, add a ",Object(o.b)("inlineCode",{parentName:"p"},"ModelQuery")," to your ",Object(o.b)("inlineCode",{parentName:"p"},".pysa")," file:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),"ModelQuery(\n  # Indicates that this query is looking for functions\n  find = \"functions\",\n  # Indicates those functions should be called 'foo'\n  where = [name.matches(\"foo\")],\n  # Indicates that matched function should be modeled as returning 'Test' taint\n  model = [\n    Returns(TaintSource[Test]),\n  ]\n)\n")),Object(o.b)("p",null,"Things to note in this example:"),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},"The ",Object(o.b)("inlineCode",{parentName:"li"},"find")," clause lets you pick what kinds of callables  you're looking to model."),Object(o.b)("li",{parentName:"ol"},"The ",Object(o.b)("inlineCode",{parentName:"li"},"where")," clause is how you filter down the callables you're modeling - in this example, we're filtering functionos by names."),Object(o.b)("li",{parentName:"ol"},"The ",Object(o.b)("inlineCode",{parentName:"li"},"model")," clause is a list of models to attach to the functions. Here, the syntax means that we model ",Object(o.b)("inlineCode",{parentName:"li"},"foo")," as returning ",Object(o.b)("inlineCode",{parentName:"li"},"TaintSource[Test]"),".")),Object(o.b)("p",null,"When invoking Pysa, if you add the ",Object(o.b)("inlineCode",{parentName:"p"},"--dump-model-query-results")," flag to your invocation, the generated models will be written to a file in JSON format."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"$ pyre analyze --dump-model-query-results\n...\n> Emitting the model query results to `/my/home/dir/.pyre/model_query_results.pysa`\n")),Object(o.b)("p",null,"You can then view this file to see the generated models."),Object(o.b)("h2",{id:"find-clauses"},"Find clauses"),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"find")," clause currently supports ",Object(o.b)("inlineCode",{parentName:"p"},'"functions"')," and ",Object(o.b)("inlineCode",{parentName:"p"},'"methods"'),". ",Object(o.b)("inlineCode",{parentName:"p"},'"functions"')," indicates that you're querying for free functions, whereas ",Object(o.b)("inlineCode",{parentName:"p"},'"methods"')," indicates that you're only querying methods."),Object(o.b)("h2",{id:"where-clauses"},"Where clauses"),Object(o.b)("p",null,"Where clauses are a list of predicates, all of which must match for a function to be modelled."),Object(o.b)("h3",{id:"namematches"},Object(o.b)("inlineCode",{parentName:"h3"},"name.matches")),Object(o.b)("p",null,"The most basic query predicate is a name match - the name you're searching for is compiled as a regex, and the function names are compared against this."),Object(o.b)("p",null,"Example:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),'ModelQuery(\n  find = ...,\n  where = [\n    name.matches("foo.*")\n  ],\n  model = ...\n)\n')),Object(o.b)("h3",{id:"return_annotation-clauses"},Object(o.b)("inlineCode",{parentName:"h3"},"return_annotation")," clauses"),Object(o.b)("p",null,"Model queries allow for querying based on the return annotation of a function. Pysa currently only allows querying whether a function type is ",Object(o.b)("inlineCode",{parentName:"p"},"typing.Annotated"),"."),Object(o.b)("p",null,"Example:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),"ModelQuery(\n  find = ...,\n  where = [\n    return_annotation.is_annotated_type(),\n  ],\n  model = ...\n)\n")),Object(o.b)("h3",{id:"any_parameter-clauses"},Object(o.b)("inlineCode",{parentName:"h3"},"any_parameter")," clauses"),Object(o.b)("p",null,"Model queries allow matching callables where any parameter matches a given clause. For now, the only clauses we support for parameters is type- based ones."),Object(o.b)("p",null,"Example:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),'ModelQuery(\n  find = "functions",\n  where = [\n    any_parameter.annotation.is_annotated_type()\n  ],\n  model = ...\n)\n')),Object(o.b)("p",null,"This model query will taint all functions which have one parameter with type ",Object(o.b)("inlineCode",{parentName:"p"},"typing.Annotated"),"."),Object(o.b)("h3",{id:"anyof-clauses"},Object(o.b)("inlineCode",{parentName:"h3"},"AnyOf")," clauses"),Object(o.b)("p",null,"There are cases when we want to model functions which match any of a set of clauses. The ",Object(o.b)("inlineCode",{parentName:"p"},"AnyOf")," clause represents exactly this case."),Object(o.b)("p",null,"Example:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),'ModelQuery(\n  find = "methods",\n  where = [\n    AnyOf(\n      any_parameter.annotation.is_annotated_type(),\n      return_annotation.is_annotated_type(),\n    )\n  ],\n  model = ...\n)\n')),Object(o.b)("h3",{id:"any_decorator-clauses"},Object(o.b)("inlineCode",{parentName:"h3"},"any_decorator")," clauses"),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"any_decorator")," clauses are used to find functions decorated with decorators that match a pattern.\nPysa currently only supports matching on the name of any decorator. If you wanted to find all\nfunctions which are decorated by ",Object(o.b)("inlineCode",{parentName:"p"},"@app.route()"),", you can write:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),'ModelQuery(\n  find = "functions",\n  where = any_decorator.name.matches("app.route"),\n  ...\n)\n')),Object(o.b)("h3",{id:"parentmatches-clause"},Object(o.b)("inlineCode",{parentName:"h3"},"parent.matches")," clause"),Object(o.b)("p",null,"You may use the ",Object(o.b)("inlineCode",{parentName:"p"},"parent.matches")," clause to matches methods whose parent's name corresponds to the provided regex."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),'ModelQuery(\n  find = "methods",\n  where = parent.matches(".*Foo.*"),\n  ...\n)\n')),Object(o.b)("h2",{id:"generated-models"},"Generated models"),Object(o.b)("p",null,"The last bit of model queries is actually generating models for all callables that match the provided where clauses. We support generating models for parameters by name or position, as well as generating models for all paramaters. Additionally, we support generating models for the return annotation."),Object(o.b)("h3",{id:"returned-taint"},"Returned taint"),Object(o.b)("p",null,"Returned taint takes the form of ",Object(o.b)("inlineCode",{parentName:"p"},"Returns(TaintSpecification)"),", where ",Object(o.b)("inlineCode",{parentName:"p"},"TaintSpecification")," is either a taint annotation or a list of taint annotations."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),'ModelQuery(\n  find = "methods",\n  where = ...,\n  model = [\n    Returns(TaintSource[Test, Via[foo]])\n  ]\n)\n')),Object(o.b)("h3",{id:"parameter-taint"},"Parameter taint"),Object(o.b)("p",null,"Parameter taint can be specified by name or by position."),Object(o.b)("p",null,"Named parameter taint takes the form of ",Object(o.b)("inlineCode",{parentName:"p"},"NamedParameter(name=..., taint = TaintSpecification)"),", and positional parameter taint takes the form of ",Object(o.b)("inlineCode",{parentName:"p"},"PositionalParameter(index=..., taint = TaintSpecification)"),":"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),'ModelQuery(\n  find = "methods",\n  where = ...,\n  model = [\n    NamedParameter(name="x", taint = TaintSource[Test, Via[foo]]),\n    PositionalParameter(index=0, taint = TaintSink[Test, Via[bar]]),\n  ]\n)\n')),Object(o.b)("h3",{id:"tainting-all-parameters"},"Tainting all parameters"),Object(o.b)("p",null,"One final convenience we provide is the ability to taint all parameters of a callable. The syntax is ",Object(o.b)("inlineCode",{parentName:"p"},"AlllParameters(TaintSpecification)"),"."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),'ModelQuery(\n  find = "functions",\n  where = ...,\n  model = [\n    AllParameters(TaintSource[Test])\n  ]\n)\n')),Object(o.b)("p",null,"You can choose to exclude a single parameter or a list of parameters in order to avoid overtainting."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),'ModelQuery(\n  find = "functions",\n  where = ...,\n  model = [\n    AllParameters(TaintSource[Test], exclude="self")\n  ]\n)\n\nModelQuery(\n  find = "functions",\n  where = ...,\n  model = [\n    AllParameters(TaintSource[Test], exclude=["self", "other"])\n  ]\n)\n')))}d.isMDXComponent=!0},96:function(e,n,t){"use strict";t.d(n,"a",(function(){return p})),t.d(n,"b",(function(){return m}));var a=t(0),r=t.n(a);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=r.a.createContext({}),d=function(e){var n=r.a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},p=function(e){var n=d(e.components);return r.a.createElement(s.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.a.createElement(r.a.Fragment,{},n)}},b=r.a.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),p=d(t),b=a,m=p["".concat(i,".").concat(b)]||p[b]||u[b]||o;return t?r.a.createElement(m,l(l({ref:n},s),{},{components:t})):r.a.createElement(m,l({ref:n},s))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=b;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var s=2;s<o;s++)i[s]=t[s];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"}}]);