"use strict";(self.webpackChunkmui_chips_input=self.webpackChunkmui_chips_input||[]).push([[924],{7161:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"getting-started","title":"Getting Started","description":"Install","source":"@site/docs/getting-started.md","sourceDirName":".","slug":"/getting-started","permalink":"/mui-chips-input/docs/getting-started","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"tutorialSidebar","next":{"title":"API Reference","permalink":"/mui-chips-input/docs/api-reference"}}');var i=t(4848),a=t(8453);const r={sidebar_position:1},o="Getting Started",c={},l=[{value:"Install",id:"install",level:2},{value:"Simple usage",id:"simple-usage",level:2},{value:"Next.js integration",id:"nextjs-integration",level:2},{value:"Congratulations !",id:"congratulations-",level:2}];function p(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",strong:"strong",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"getting-started",children:"Getting Started"})}),"\n",(0,i.jsx)(n.h2,{id:"install",children:"Install"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npm install mui-chips-input --save\n"})}),"\n",(0,i.jsxs)(n.p,{children:["or you can use ",(0,i.jsx)(n.strong,{children:"yarn"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"yarn add mui-chips-input\n"})}),"\n",(0,i.jsx)(n.p,{children:"We have completed installing the package."}),"\n",(0,i.jsx)(n.h2,{id:"simple-usage",children:"Simple usage"}),"\n",(0,i.jsx)(n.p,{children:"Here is a simple usage for using the component:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:"import React from 'react'\nimport { MuiChipsInput } from 'mui-chips-input'\n\nconst MyComponent = () => {\n  const [chips, setChips] = React.useState([])\n\n  const handleChange = (newChips) => {\n    setChips(newChips)\n  }\n\n  return (\n    <MuiChipsInput value={chips} onChange={handleChange} />\n  )\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"nextjs-integration",children:"Next.js integration"}),"\n",(0,i.jsx)(n.p,{children:"Learn how to use MUI chips input with Next.js"}),"\n",(0,i.jsxs)(n.p,{children:["Once you have installed ",(0,i.jsx)(n.code,{children:"MUI Chips Input"})," in your next.js project, it is important to transpile it as it is an ESM package first."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"/** @type {import('next').NextConfig} */\nconst nextConfig = {\n transpilePackages: ['mui-chips-input'],\n // your config\n}\n\nmodule.exports = nextConfig\n"})}),"\n",(0,i.jsx)(n.h2,{id:"congratulations-",children:"Congratulations !"}),"\n",(0,i.jsxs)(n.p,{children:["That's all, now let's deep dive into the ",(0,i.jsx)(n.a,{href:"/docs/api-reference",children:"props"}),"."]})]})}function d(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(p,{...e})}):p(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>o});var s=t(6540);const i={},a=s.createContext(i);function r(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);