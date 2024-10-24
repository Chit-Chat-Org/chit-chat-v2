(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[547],{939:function(e,t,a){Promise.resolve().then(a.bind(a,3586))},7832:function(e,t,a){"use strict";a.d(t,{Z:function(){return Components_Navbar}});var r=a(7437),n=a(1396),i=a.n(n);a(2265);var s=a(4606),Components_Logout=()=>(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("li",{children:(0,r.jsx)("div",{onClick:()=>{localStorage.removeItem("UserId"),window.location.reload()},className:"block py-2 pr-4 pl-3 text-gray-700 hover:text-sky-600 rounded md:bg-transparent md:p-0",children:"Log Out"})})}),Components_Navbar=()=>(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{children:(0,r.jsx)("nav",{className:"fixed top-0 left-0 w-full border-gray-200 px-2 sm:px-4 py-2.5 rounded",children:(0,r.jsxs)("div",{className:"container flex flex-wrap justify-between items-center mx-auto",children:[(0,r.jsx)(i(),{href:"/dashboard",className:"flex items-center",children:(0,r.jsx)("span",{className:"self-center text-xl font-semibold font-serif px-3 whitespace-nowrap text-gray-700",children:"Lake AI"})}),(0,r.jsx)("div",{className:"w-full md:w-auto",id:"navbar-default",children:(0,r.jsxs)("ul",{className:"flex flex-row flex-wrap p-4 mt-4 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:border-gray-400",children:[(0,r.jsx)("li",{children:(0,r.jsx)(i(),{href:"/organization",className:"block py-2 pr-4 pl-3 text-gray-700 hover:text-sky-600  rounded md:bg-transparent md:p-0",children:"Organizations"})}),(0,r.jsx)("li",{children:(0,r.jsx)(i(),{href:"/addAIData",className:"block py-2 pr-4 pl-3 text-gray-700 hover:text-sky-600  rounded md:bg-transparent md:p-0",children:"Train Data"})}),(0,r.jsx)("li",{children:(0,r.jsx)(i(),{href:"https://github.com/apurvjha123",className:"block py-2 pr-4 pl-3 text-gray-700 hover:text-sky-600  rounded md:bg-transparent md:p-0",children:"About"})}),(0,r.jsx)("li",{children:(0,r.jsx)(i(),{href:"https://github.com/Lake-ai",className:"block py-2 pr-4 pl-3 text-gray-700 hover:text-sky-600  rounded md:bg-transparent md:p-0",children:(0,r.jsxs)("div",{className:"flex",children:[(0,r.jsx)(s.rFR,{className:"p-1 text-xl"}),"Contribute"]})})}),(0,r.jsx)(Components_Logout,{})]})})]})})})})},4608:function(e,t,a){"use strict";var r=a(7437);a(2265);var n=a(1396),i=a.n(n);t.Z=()=>(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{className:"flex items-center justify-center h-screen",children:(0,r.jsxs)("div",{className:"bg-white bg-opacity-10 rounded-xl p-8 w-96 shadow-lg backdrop-blur-md",children:[(0,r.jsx)("h2",{className:"text-xl font-bold mb-4",children:"Login Is Require !"}),(0,r.jsx)(i(),{href:"/login",className:"px-4 py-2 rounded bg-white bg-opacity-20 hover:bg-opacity-30 focus:outline-none",children:"Sign Up"})]})})})},3586:function(e,t,a){"use strict";a.r(t);var r=a(7437),n=a(2265),i=a(7832),s=a(9947),l=a(9222),o=a(171),d=a(4033),c=a(9150),u=a(4608),p=a(3396);let m=(0,p.K)({Production:!0});t.default=()=>{let e=(0,d.useRouter)(),[t,a]=(0,n.useState)(null);(0,n.useEffect)(()=>{{let e=localStorage.getItem("UserId");a(e)}},[]);let[p,g]=(0,n.useState)(!1),[h,x]=(0,n.useState)(""),[b,f]=(0,n.useState)([]),[v,j]=(0,n.useState)(null),[y,w]=(0,n.useState)(""),[N,k]=(0,n.useState)("Gemini"),[C,O]=(0,n.useState)(""),[S,A]=(0,n.useState)({organization:{userId:"",organizationName:""},url:"",embeddingModel:""});(0,n.useEffect)(()=>{!async function(){console.log(t);let e=await (0,s.$9)(t);e&&e.response&&e.response.data&&f(e.response.data)}()},[t]);let handleFileChange=e=>{var t,a;let r=null===(t=e.target.files)||void 0===t?void 0:t.item(0);r&&r.type;{let t=null===(a=e.target.files)||void 0===a?void 0:a.item(0);t?j(t):O(e.target.value)}};console.log(C),(0,n.useEffect)(()=>{A({organization:{organizationName:h,userId:t},url:y,embeddingModel:N})},[h,y,t,N]);let fetchFile=async()=>{try{var e;let t,a;return v?((t=new FormData).append("file",v),a=await l.Z.post(m+"/api/v0.1/upload",t)):a=await l.Z.post(m+"/api/v0.1/upload/url",{resource_url:O}),(0,o.Am)("Successfully, Submitted !",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),console.log({res:a}),w(null===(e=a.data)||void 0===e?void 0:e.data.url),a.data}catch(e){return o.Am.error("Oops something went wrong!",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),console.error(e),null}},SubmitAiModel=async()=>{await l.Z.post(m+"/api/v0.1/addAiTrainingModel",S)};console.log(S);let handleFileSubmit=async e=>{e.preventDefault();let t=await fetchFile();t?(0,o.Am)("File Submmited !",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}):o.Am.error("File not Submitted !",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})},handleSubmit=async t=>{t.preventDefault(),g(!0),await SubmitAiModel().then(t=>{(0,o.Am)("Ai Model Created !",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),console.log(t),e.push("/dashboard")}).catch(e=>{o.Am.error("Failed Training",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),console.log(e)}),g(!1)},F=!!v&&!!h;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.Z,{}),t?p?(0,r.jsx)("div",{className:"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-20",children:(0,r.jsx)(c.Z7b,{className:"animate-spin text-6xl"})}):(0,r.jsx)("div",{className:"sm:pt-24 pt-44 top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50",children:(0,r.jsxs)("div",{className:"p-8 bg-white rounded-lg shadow-xl w-96 bg-opacity-10",children:[(0,r.jsx)("h2",{className:"text-xl mb-4 font-bold",children:"Train Data"}),(0,r.jsxs)("form",{children:[(0,r.jsxs)("div",{className:"",children:[(0,r.jsx)("label",{className:"block text-sm font-medium mb-2",children:"URL Link:"}),(0,r.jsx)("input",{onChange:handleFileChange,type:"text",className:"mt-1 w-full px-4 py-2 rounded-md border bg-opacity-50 bg-pink-50 border-gray-300 focus:outline-none focus:border-indigo-500"})]}),(0,r.jsx)("div",{className:"text-center text-gray-400 my-4",children:"---- OR ----"}),(0,r.jsxs)("div",{className:"",children:[(0,r.jsx)("label",{className:"block text-sm font-medium mb-2",children:"Upload File:"}),(0,r.jsx)("input",{onChange:handleFileChange,type:"file",accept:".txt, .pdf, .csv",className:"mb-4 p-2 file:bg-pink-300 file:rounded-xl file:active:bg-pink-400 file:shadow-lg file:border-pink-600"})]}),(0,r.jsx)("button",{onClick:handleFileSubmit,className:"bg-pink-700 active:bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600",children:"Add File"}),(0,r.jsx)("label",{className:"block text-sm font-medium mb-2",children:"Select Organization:"}),(0,r.jsxs)("select",{value:h,onChange:e=>x(e.target.value),className:"mb-4 border p-2 rounded w-full bg-pink-200",children:[(0,r.jsx)("option",{disabled:!0,value:"",children:"-- Select Organization --"}),b&&b.map((e,t)=>(0,r.jsx)("option",{value:e.OrganizationName,children:e.OrganizationName},t))]}),(0,r.jsx)("label",{className:"block text-sm font-medium mb-2",children:"Select a model."}),(0,r.jsxs)("select",{onChange:e=>k(e.target.value),className:"mb-4 border p-2 rounded w-full bg-pink-200",children:[(0,r.jsx)("option",{value:"Gemini",children:"Gemini AI"}),(0,r.jsx)("option",{value:"Gemini",children:"Open AI"})]}),(0,r.jsx)("div",{className:"mb-4"}),(0,r.jsx)("button",{type:"submit",onClick:handleSubmit,className:"bg-pink-700 active:bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 ".concat(!F&&"opacity-50 cursor-not-allowed"),disabled:!F,children:"Submit"})]})]})}):(0,r.jsx)(u.Z,{})]})}},9947:function(e,t,a){"use strict";a.d(t,{$9:function(){return getOrganizationById},Fi:function(){return addOrganization},Mo:function(){return SignUp},XU:function(){return getAiModelById}});var r=a(9222),n=a(3396);let i=(0,n.K)({Production:!0}),getOrganizationById=async e=>{let t=await r.Z.get(i+"/api/v0.1/newOrganization",{params:{UserId:e}});return t.data},getAiModelById=async e=>{let t=await r.Z.get(i+"/api/v0.1/addAiTrainingModel",{params:{UserId:e}});return t.data},addOrganization=async e=>{let t=await r.Z.post(i+"/api/v0.1/newOrganization",e);return t},SignUp=async e=>{let t=await r.Z.post(i+"/signup",e);return t}},3396:function(e,t,a){"use strict";a.d(t,{K:function(){return serverUrl}});let serverUrl=e=>e.Production?"https://chit-chat.fun":"http://localhost:8001"},4033:function(e,t,a){e.exports=a(290)}},function(e){e.O(0,[447,712,438,656,971,864,744],function(){return e(e.s=939)}),_N_E=e.O()}]);