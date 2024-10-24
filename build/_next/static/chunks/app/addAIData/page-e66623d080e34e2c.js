(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[547],{1785:function(e,t,r){Promise.resolve().then(r.bind(r,3586))},7832:function(e,t,r){"use strict";r.d(t,{Z:function(){return Components_Navbar}});var a=r(7437),i=r(1396),s=r.n(i);r(2265);var n=r(4606),Components_Logout=()=>(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("li",{children:(0,a.jsx)("div",{onClick:()=>{localStorage.removeItem("UserId"),window.location.reload()},className:"block py-2 pr-4 pl-3 text-gray-700 hover:text-sky-600 rounded md:bg-transparent md:p-0",children:"Log Out"})})}),Components_Navbar=()=>(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{children:(0,a.jsx)("nav",{className:"fixed top-0 left-0 w-full border-gray-200 px-2 sm:px-4 py-2.5 rounded",children:(0,a.jsxs)("div",{className:"container flex flex-wrap justify-between items-center mx-auto",children:[(0,a.jsx)(s(),{href:"/dashboard",className:"flex items-center",children:(0,a.jsx)("span",{className:"self-center text-xl font-semibold font-serif px-3 whitespace-nowrap text-gray-700",children:"Chit-Chat"})}),(0,a.jsx)("div",{className:"w-full md:w-auto",id:"navbar-default",children:(0,a.jsxs)("ul",{className:"flex flex-row flex-wrap p-4 mt-4 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:border-gray-400",children:[(0,a.jsx)("li",{children:(0,a.jsx)(s(),{href:"/organization",className:"block py-2 pr-4 pl-3 text-gray-700 hover:text-sky-600  rounded md:bg-transparent md:p-0",children:"Organizations"})}),(0,a.jsx)("li",{children:(0,a.jsx)(s(),{href:"/addAIData",className:"block py-2 pr-4 pl-3 text-gray-700 hover:text-sky-600  rounded md:bg-transparent md:p-0",children:"Train Data"})}),(0,a.jsx)("li",{children:(0,a.jsx)(s(),{href:"https://github.com/apurvjha123",className:"block py-2 pr-4 pl-3 text-gray-700 hover:text-sky-600  rounded md:bg-transparent md:p-0",children:"About"})}),(0,a.jsx)("li",{children:(0,a.jsx)(s(),{href:"https://github.com/apurvjha123/chit-chat-nextjs",className:"block py-2 pr-4 pl-3 text-gray-700 hover:text-sky-600  rounded md:bg-transparent md:p-0",children:(0,a.jsxs)("div",{className:"flex",children:[(0,a.jsx)(n.rFR,{className:"p-1 text-xl"}),"Contribute"]})})}),(0,a.jsx)(Components_Logout,{})]})})]})})})})},4608:function(e,t,r){"use strict";var a=r(7437);r(2265);var i=r(1396),s=r.n(i);t.Z=()=>(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{className:"flex items-center justify-center h-screen",children:(0,a.jsxs)("div",{className:"bg-white bg-opacity-10 rounded-xl p-8 w-96 shadow-lg backdrop-blur-md",children:[(0,a.jsx)("h2",{className:"text-xl font-bold mb-4",children:"Login Is Require !"}),(0,a.jsx)(s(),{href:"/login",className:"px-4 py-2 rounded bg-white bg-opacity-20 hover:bg-opacity-30 focus:outline-none",children:"Sign Up"})]})})})},3586:function(e,t,r){"use strict";r.r(t);var a=r(7437),i=r(2265),s=r(7832),n=r(9947),o=r(2173),l=r(171),d=r(4033),c=r(9150),p=r(4608),u=r(3396);let g=(0,u.K)({Production:!0});t.default=()=>{let e=(0,d.useRouter)(),[t,r]=(0,i.useState)(null);(0,i.useEffect)(()=>{{let e=localStorage.getItem("UserId");r(e)}},[]);let[u,h]=(0,i.useState)(!1),[m,x]=(0,i.useState)(""),[b,f]=(0,i.useState)([]),[v,y]=(0,i.useState)(null),[j,w]=(0,i.useState)(""),[k,N]=(0,i.useState)(""),[A,C]=(0,i.useState)({organization:{userId:"",organizationName:""},url:"",openAIApi:""});(0,i.useEffect)(()=>{!async function(){console.log(t);let e=await (0,n.$9)(t);e&&e.response&&e.response.data&&f(e.response.data)}()},[t]);let isValidOpenAIApi=e=>e.startsWith("sk-")&&e.length>50;(0,i.useEffect)(()=>{C({organization:{organizationName:m,userId:t},url:j,openAIApi:k})},[m,j,t,k]);let fetchFile=async()=>{if(!v){l.Am.error("No file selected",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"});return}let e=new FormData;e.append("file",v);try{let t=await o.Z.post(g+"/api/v1/upload",e);return(0,l.Am)("Successfully, Submitted !",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),w(t.data.data.url),!0}catch(e){return l.Am.error("oops someting went wrong !",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),!1}},SubmitAiModel=async()=>{await o.Z.post(g+"/api/v1/addAiTrainingModel",A)};console.log(A);let handleFileSubmit=async e=>{e.preventDefault();let t=await fetchFile();t?(0,l.Am)("File Submmited !",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):l.Am.error("File not Submitted !",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},handleSubmit=async t=>{t.preventDefault(),h(!0),await SubmitAiModel().then(t=>{(0,l.Am)("Ai Model Created !",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),console.log(t),e.push("/dashboard")}).catch(e=>{l.Am.error("Failed Training",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),console.log(e)}),h(!1)},O=!!v&&!!m&&!!k;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s.Z,{}),t?u?(0,a.jsx)("div",{className:"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-20",children:(0,a.jsx)(c.Z7b,{className:"animate-spin text-6xl"})}):(0,a.jsx)("div",{className:"sm:pt-24 pt-44 top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50",children:(0,a.jsxs)("div",{className:"p-8 bg-white rounded-lg shadow-xl w-96 bg-opacity-10",children:[(0,a.jsx)("h2",{className:"text-xl mb-4 font-bold",children:"Train Data"}),(0,a.jsxs)("form",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium mb-2",children:"Upload File:"}),(0,a.jsx)("input",{onChange:e=>{var t,r;let a=null===(t=e.target.files)||void 0===t?void 0:t.item(0);a&&a.type;{let t=null===(r=e.target.files)||void 0===r?void 0:r.item(0);t&&y(t)}},type:"file",accept:".txt, .pdf, .csv",className:"mb-4 p-2 file:bg-pink-300 file:rounded-xl file:active:bg-pink-400 file:shadow-lg file:border-pink-600"}),(0,a.jsx)("button",{onClick:handleFileSubmit,className:"bg-pink-700 active:bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600",children:"Add File"}),(0,a.jsx)("label",{className:"block text-sm font-medium mb-2",children:"Select Organization:"}),(0,a.jsxs)("select",{value:m,onChange:e=>x(e.target.value),className:"mb-4 border p-2 rounded w-full bg-pink-200",children:[(0,a.jsx)("option",{disabled:!0,value:"",children:"-- Select Organization --"}),b&&b.map((e,t)=>(0,a.jsx)("option",{value:e.OrganizationName,children:e.OrganizationName},t))]}),(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsx)("label",{className:"block text-sm font-medium mb-2",children:"OpenAi ApiKey"}),(0,a.jsx)("input",{type:"text",name:"openAIApi",required:!0,onChange:e=>{let t=e.target.value;if(!isValidOpenAIApi(t)){l.Am.error("Invalid OpenAI API Key",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"});return}N(t)},className:"mt-1 w-full px-4 py-2 rounded-md border bg-opacity-50 bg-pink-50 border-gray-300 focus:outline-none focus:border-indigo-500"})]}),(0,a.jsx)("button",{type:"submit",onClick:handleSubmit,className:"bg-pink-700 active:bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 ".concat(!O&&"opacity-50 cursor-not-allowed"),disabled:!O,children:"Submit"})]})]})}):(0,a.jsx)(p.Z,{})]})}},9947:function(e,t,r){"use strict";r.d(t,{$9:function(){return getOrganizationById},Fi:function(){return addOrganization},Mo:function(){return SignUp},XU:function(){return getAiModelById},gx:function(){return Auth}});var a=r(2173),i=r(3396);let s=(0,i.K)({Production:!0}),getOrganizationById=async e=>{let t=await a.Z.get(s+"/api/v1/getOrganizationById",{params:{UserId:e}});return t.data},getAiModelById=async e=>{let t=await a.Z.get(s+"/api/v1/getAiModelById",{params:{UserId:e}});return t.data},addOrganization=async e=>{let t=await a.Z.post(s+"/api/v1/newOrganization",e);return t},Auth=async e=>{let t=await a.Z.post(s+"/register/login",e,{withCredentials:!0});return t},SignUp=async e=>{let t=await a.Z.post(s+"/register/signup",e,{withCredentials:!0});return t}},3396:function(e,t,r){"use strict";r.d(t,{K:function(){return serverUrl}});let serverUrl=e=>e.Production?"https://chit-chat.fun":"http://localhost:8000"},4033:function(e,t,r){e.exports=r(290)}},function(e){e.O(0,[447,712,438,321,971,864,744],function(){return e(e.s=1785)}),_N_E=e.O()}]);