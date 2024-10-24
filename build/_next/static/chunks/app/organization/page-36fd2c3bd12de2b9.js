(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[603],{3788:function(e,t,r){Promise.resolve().then(r.bind(r,577))},7832:function(e,t,r){"use strict";r.d(t,{Z:function(){return Components_Navbar}});var a=r(7437),n=r(1396),i=r.n(n);r(2265);var s=r(4606),Components_Logout=()=>(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("li",{children:(0,a.jsx)("div",{onClick:()=>{localStorage.removeItem("UserId"),window.location.reload()},className:"block py-2 pr-4 pl-3 text-gray-700 hover:text-sky-600 rounded md:bg-transparent md:p-0",children:"Log Out"})})}),Components_Navbar=()=>(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{children:(0,a.jsx)("nav",{className:"fixed top-0 left-0 w-full border-gray-200 px-2 sm:px-4 py-2.5 rounded",children:(0,a.jsxs)("div",{className:"container flex flex-wrap justify-between items-center mx-auto",children:[(0,a.jsx)(i(),{href:"/dashboard",className:"flex items-center",children:(0,a.jsx)("span",{className:"self-center text-xl font-semibold font-serif px-3 whitespace-nowrap text-gray-700",children:"Chit-Chat"})}),(0,a.jsx)("div",{className:"w-full md:w-auto",id:"navbar-default",children:(0,a.jsxs)("ul",{className:"flex flex-row flex-wrap p-4 mt-4 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:border-gray-400",children:[(0,a.jsx)("li",{children:(0,a.jsx)(i(),{href:"/organization",className:"block py-2 pr-4 pl-3 text-gray-700 hover:text-sky-600  rounded md:bg-transparent md:p-0",children:"Organizations"})}),(0,a.jsx)("li",{children:(0,a.jsx)(i(),{href:"/addAIData",className:"block py-2 pr-4 pl-3 text-gray-700 hover:text-sky-600  rounded md:bg-transparent md:p-0",children:"Train Data"})}),(0,a.jsx)("li",{children:(0,a.jsx)(i(),{href:"https://github.com/apurvjha123",className:"block py-2 pr-4 pl-3 text-gray-700 hover:text-sky-600  rounded md:bg-transparent md:p-0",children:"About"})}),(0,a.jsx)("li",{children:(0,a.jsx)(i(),{href:"https://github.com/apurvjha123/chit-chat-nextjs",className:"block py-2 pr-4 pl-3 text-gray-700 hover:text-sky-600  rounded md:bg-transparent md:p-0",children:(0,a.jsxs)("div",{className:"flex",children:[(0,a.jsx)(s.rFR,{className:"p-1 text-xl"}),"Contribute"]})})}),(0,a.jsx)(Components_Logout,{})]})})]})})})})},4608:function(e,t,r){"use strict";var a=r(7437);r(2265);var n=r(1396),i=r.n(n);t.Z=()=>(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{className:"flex items-center justify-center h-screen",children:(0,a.jsxs)("div",{className:"bg-white bg-opacity-10 rounded-xl p-8 w-96 shadow-lg backdrop-blur-md",children:[(0,a.jsx)("h2",{className:"text-xl font-bold mb-4",children:"Login Is Require !"}),(0,a.jsx)(i(),{href:"/login",className:"px-4 py-2 rounded bg-white bg-opacity-20 hover:bg-opacity-30 focus:outline-none",children:"Sign Up"})]})})})},9947:function(e,t,r){"use strict";r.d(t,{$9:function(){return getOrganizationById},Fi:function(){return addOrganization},Mo:function(){return SignUp},XU:function(){return getAiModelById},gx:function(){return Auth}});var a=r(2173),n=r(3396);let i=(0,n.K)({Production:!0}),getOrganizationById=async e=>{let t=await a.Z.get(i+"/api/v1/getOrganizationById",{params:{UserId:e}});return t.data},getAiModelById=async e=>{let t=await a.Z.get(i+"/api/v1/getAiModelById",{params:{UserId:e}});return t.data},addOrganization=async e=>{let t=await a.Z.post(i+"/api/v1/newOrganization",e);return t},Auth=async e=>{let t=await a.Z.post(i+"/register/login",e,{withCredentials:!0});return t},SignUp=async e=>{let t=await a.Z.post(i+"/register/signup",e,{withCredentials:!0});return t}},3396:function(e,t,r){"use strict";r.d(t,{K:function(){return serverUrl}});let serverUrl=e=>e.Production?"https://chit-chat.fun":"http://localhost:8000"},577:function(e,t,r){"use strict";r.r(t);var a=r(7437),n=r(2265),i=r(7832),s=r(171),o=r(9150),l=r(4033),d=r(9947),c=r(4608);t.default=()=>{let[e,t]=(0,n.useState)(null);(0,n.useEffect)(()=>{{let e=localStorage.getItem("UserId");t(e)}},[]);let r=(0,l.useRouter)(),[u,g]=(0,n.useState)(!1),[m,p]=(0,n.useState)({userId:"",OrganizationName:"",OrganizationWebsite:"",organizationEmail:"",OrganizationPhone:"",isActive:!0});(0,n.useEffect)(()=>{let e=localStorage.getItem("UserId");p(t=>({...t,userId:e||t.userId}))},[]);let handleChange=e=>{p({...m,[e.target.name]:e.target.value})},handleSubmit=async e=>{e.preventDefault(),g(!0);let t=await (0,d.Fi)(m);g(!1),200==t.status?((0,s.Am)("Organization Submitted !",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),r.push("/dashboard")):s.Am.error("Failed to Submit !",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.Z,{}),e?(0,a.jsx)("div",{className:"min-h-screen flex items-center justify-center bg-opacity-50 sm:pt-24 pt-48",children:(0,a.jsxs)("form",{onSubmit:handleSubmit,className:"p-8 bg-white rounded-lg shadow-xl w-96 bg-opacity-10",style:{backdropFilter:"blur(4px)"},children:[(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsx)("label",{className:"block text-gray-600",children:"Organization Name"}),(0,a.jsx)("input",{type:"text",name:"OrganizationName",required:!0,onChange:handleChange,className:"mt-1 w-full px-4 py-2 rounded-md border border-gray-300 bg-opacity-50 bg-pink-50 focus:outline-none focus:border-indigo-500"})]}),(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsx)("label",{className:"block text-gray-600",children:"Organization Website"}),(0,a.jsx)("input",{type:"url",name:"OrganizationWebsite",required:!0,onChange:handleChange,className:"mt-1 w-full px-4 py-2 rounded-md border bg-opacity-50 bg-pink-50 border-gray-300 focus:outline-none focus:border-indigo-500"})]}),(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsx)("label",{className:"block text-gray-600",children:"Organization Email"}),(0,a.jsx)("input",{type:"email",name:"organizationEmail",required:!0,onChange:handleChange,className:"mt-1 w-full px-4 py-2 rounded-md border bg-opacity-50 bg-pink-50 border-gray-300 focus:outline-none focus:border-indigo-500"})]}),(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsx)("label",{className:"block text-gray-600",children:"Organization Phone"}),(0,a.jsx)("input",{type:"number",name:"OrganizationPhone",maxLength:10,minLength:10,required:!0,onChange:handleChange,title:"Please enter a 10-digit mobile number",className:"mt-1 w-full px-4 py-2 rounded-md border bg-opacity-50 bg-pink-50 border-gray-300 focus:outline-none  focus:border-indigo-500"})]}),u?(0,a.jsx)("button",{disabled:!0,className:"w-full flex justify-center py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700",children:(0,a.jsx)(o.Z7b,{className:"animate-spin"})}):(0,a.jsx)("button",{className:"w-full py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700",children:"Submit"})]})}):(0,a.jsx)(c.Z,{})]})}},4033:function(e,t,r){e.exports=r(290)}},function(e){e.O(0,[447,712,438,321,971,864,744],function(){return e(e.s=3788)}),_N_E=e.O()}]);