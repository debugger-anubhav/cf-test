(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5158],{82851:function(e,s,a){Promise.resolve().then(a.bind(a,7075))},7075:function(e,s,a){"use strict";a.r(s),a.d(s,{default:function(){return k}});var r=a(9268),t=a(42035),n=a(86006),i=a(81545),_=a.n(i),l=a(1709),o=a.n(l),d=a(93214),c=a(24214),h=a(90490),u=a(8038),p=a(66628),y=a(37610),m=()=>{var e;let s=(0,p.I0)(),a=(0,p.v9)(e=>{var s;return null==e?void 0:null===(s=e.citymax)||void 0===s?void 0:s.isHalfYearly}),[t,i]=(0,n.useState)(a),[_,l]=(0,n.useState)(),m=()=>{c.Z.get(h.v2+u.z.cityMaxPage.getAllPlans).then(e=>{var s;l(null==e?void 0:null===(s=e.data)||void 0===s?void 0:s.data)}).catch(e=>console.log(e))};return(0,n.useEffect)(()=>{m()},[]),(0,r.jsxs)("div",{className:o().main,children:[(0,r.jsxs)("h1",{className:o().header,children:["Rent ",(0,r.jsx)("span",{className:o().max,children:"MAX"}),", pay less."]}),(0,r.jsx)("h2",{className:o().tag_line,children:"Simple plans for complete home furnishing"}),(0,r.jsx)("div",{className:o().center,children:(0,r.jsxs)("div",{className:o().monthly_toggler,children:[(0,r.jsx)("p",{onClick:()=>{i(!0),s((0,y.F_)(!0))},className:"".concat(t?"bg-[#5774AC] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]":"bg-transparent"," ").concat(o().pref_mode_text),children:"6 months"}),(0,r.jsx)("p",{onClick:()=>{i(!1),s((0,y.F_)(!1))},className:"".concat(t?"bg-transparent":"bg-[#5774AC] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]"," ").concat(o().pref_mode_text),children:"12 months"})]})}),(0,r.jsx)("div",{className:"".concat(o().center," ").concat(o().card_wrapper),children:null==_?void 0:null===(e=_.citymax_plans)||void 0===e?void 0:e.filter(e=>t?"6 Months"===e.attr_name:"12 Months"===e.attr_name).map((e,s)=>(0,r.jsx)("div",{className:"w-full md:w-[328px]",children:(0,r.jsx)(d.Z,{isHalfYearly:t,item:e,plans:_})},s))})]})},x=a(1464),g=a.n(x),v=a(21530),f=a(87093),w=()=>{let[e,s]=(0,n.useState)(!1),a=()=>{s(!e)};return(0,r.jsxs)("div",{className:g().main,children:[(0,r.jsx)("h2",{className:g().head,children:"Why CityMax?"}),(0,r.jsx)("div",{className:g().card_wrapper,children:[{icon:"free-swap-icon.svg",head:"Free Swap",desc:"Swap any product or design anytime during the subscription period"},{icon:"cancel-anytime-icon.svg",head:"Cancel anytime",desc:"You can cancel your subscription anytime. We will deduct one month's extra rent as a penalty & refund rest of the amount"},{icon:"easy-on-wallet-icon.svg",head:"Easy on Wallet",desc:"You can pay subscription fee in one go or opt for our no cost EMI plan"},{icon:"quality-products-icon.svg",head:"Quality Products",desc:"Branded appliances and solid Sheesham Wood products in mint new condition"},{icon:"comprehensive-furnishing-icon.svg",head:"Comprehensive Furnishing",desc:"A single plan for your furniture & appliances requirements"},{icon:"free-delivery-installation-and-maintenance-icon.svg",head:"Free Delivery, Installation & Maintenance",desc:"There is no delivery fee & our experts will install the products in a jiffy for you"}].map((e,s)=>(0,r.jsxs)("div",{className:g().card,children:[(0,r.jsx)("img",{src:"".concat(v.JH+e.icon),className:g().icon}),(0,r.jsx)("h3",{className:g().card_head,children:e.head}),(0,r.jsx)("p",{className:g().desc,children:e.desc})]},s))}),(0,r.jsxs)("button",{className:g().how_it_works_button,onClick:a,children:[(0,r.jsx)("p",{className:g().how_it_works_paragraph,children:"How it works"}),(0,r.jsx)(v.Xs,{size:18,color:"#597492",className:g().forward_arrow})]}),e&&(0,r.jsx)(f.Z,{toggleDrawer:a,open:e})]})},b=()=>(0,r.jsxs)("div",{className:_().main_wrapper,children:[(0,r.jsx)(m,{}),(0,r.jsx)(w,{})]}),j=a(83058),N=a(3939),k=()=>(0,r.jsxs)("div",{className:"large_layout",children:[(0,r.jsx)(t.Z,{}),(0,r.jsx)(b,{}),(0,r.jsx)(j.default,{isCitymax:!0,params:"citymax"}),(0,r.jsx)(N.default,{})]})},83058:function(e,s,a){"use strict";a.r(s),a.d(s,{FaqsSkeleton:function(){return x},default:function(){return m}});var r=a(9268),t=a(86006),n=a(65496),i=a.n(n),_=a(71896),l=a(21530),o=e=>{let{ques:s,ans:a,isOpen:t,toggleQuestion:n}=e;return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"pb-6",children:[(0,r.jsxs)("div",{className:i().quesWrapper,onClick:n,children:[(0,r.jsx)("h3",{className:i().ques,children:s}),(0,r.jsx)("div",{children:t?(0,r.jsx)(l.WF,{className:"cursor-pointer",size:20,color:"#222"}):(0,r.jsx)(l.v3,{className:"cursor-pointer",size:20,color:"#222"})})]}),(0,r.jsx)("div",{children:(0,r.jsx)("div",{dangerouslySetInnerHTML:{__html:a},className:"".concat(i().ans," ").concat(t&&i().ans_open)})})]})})},d=a(23747),c=a(8038),h=a(9238),u=a(35846),p=a.n(u),y=a(24214),m=e=>{let{params:s,isCitymax:a}=e,n=_.common_components.FAQ,[h,u]=t.useState(null),[m,x]=(0,t.useState)(7),[g,v]=t.useState(null),{refetch:f}=(0,d.a)("faqsLandingPage",c.z.faqsLandingPage),{refetch:w}=(0,d.a)("faqsSeoAppliancePage",c.z.seoApplianceFaqs),{refetch:b}=(0,d.a)("faqsSeoFurniturePage",c.z.seoFurnitureFaqs),{refetch:j}=(0,d.a)("faqsCategoryPage",c.z.categortFaq,"?parentCategoryId=27"),N=()=>{y.Z.get("https://test.rentofurniture.com/ajxapi/frp_faq_details").then(e=>{var s,a;return u(null==e?void 0:null===(a=e.data)||void 0===a?void 0:null===(s=a.data)||void 0===s?void 0:s.content)}).catch(e=>console.log(e))},k=e=>{g===e?v(null):v(e)};return(0,t.useEffect)(()=>{(null==s?void 0:s.category)==="appliances-rental"?w().then(e=>{var s;u(null==e?void 0:null===(s=e.data)||void 0===s?void 0:s.data)}).catch(e=>console.log(e)):(null==s?void 0:s.category)==="furniture-rental"?b().then(e=>{var s;u(null==e?void 0:null===(s=e.data)||void 0===s?void 0:s.data)}).catch(e=>console.log(e)):"category"===s?j().then(e=>{var s;u(null==e?void 0:null===(s=e.data)||void 0===s?void 0:s.data)}).catch(e=>console.log(e)):"citymax"===s?N():f().then(e=>{var s;u(null==e?void 0:null===(s=e.data)||void 0===s?void 0:s.data)}).catch(e=>console.log(e))},[]),(0,r.jsxs)("div",{className:i().freq_asked_que_wrapper,children:[(0,r.jsx)("h2",{className:i().head,children:n.header}),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:i().QuesAnsArray_div,children:null==h?void 0:h.slice(0,m).map((e,s)=>(0,r.jsxs)("div",{children:[(0,r.jsx)(o,{ques:null==e?void 0:e.question,ans:null==e?void 0:e.answer,isOpen:s===g,toggleQuestion:()=>k(s)}),s!==h.slice(0,m).length-1&&(0,r.jsx)("div",{className:"bg-EDEDEE h-[1px] w-full"})]},s.toString()))}),a?m<(null==h?void 0:h.length)&&(0,r.jsxs)("button",{className:i().show_more_div,onClick:()=>{x(e=>e+5)},children:["See More FAQs",(0,r.jsx)(l.wf,{className:i().down_arrow})]}):(0,r.jsx)(p(),{href:"/pages/faq",children:(0,r.jsxs)("div",{className:i().btn,children:[(0,r.jsx)("p",{className:i().btn_txt,children:n.btn_txt}),(0,r.jsx)(l.Xs,{className:i().forword_icon})]})})]})]})};let x=()=>(0,r.jsxs)("div",{className:i().faq_skeleton_wrapper,children:[(0,r.jsx)("div",{className:"w-[30%] h-8",children:(0,r.jsx)(h.Z,{variant:"text",className:"text-16 w-full h-full"})}),(0,r.jsxs)("div",{className:"w-[45%]",children:[(0,r.jsx)("div",{className:i().QuesAnsArray_div,children:[1,2,3,4,5].map((e,s)=>(0,r.jsx)("div",{children:(0,r.jsx)(h.Z,{variant:"text",className:"text-16 w-full"})},s.toString()))}),(0,r.jsx)(h.Z,{variant:"text",className:"w-40 h-20 mt-2"})]})]})},87093:function(e,s,a){"use strict";var r=a(9268),t=a(86006),n=a(14654),i=a.n(n),_=a(8464),l=a(21530);s.Z=e=>{let{toggleDrawer:s,open:a}=e,[n,o]=(0,t.useState)(!1),d=e=>{window.innerWidth<768?o(!0):o(!1)};t.useEffect(()=>(d(),window.addEventListener("resize",d),()=>{window.removeEventListener("resize",d)}),[]);let c=[{heading:"Select Tenure of Subscription",subheading:"Select your preferred duration of subscription. Don't worry, you can extend it later if need be."},{heading:"Select a Plan",subheading:"Choose a plan which best suits your need."},{heading:"Choose The Products",subheading:"Click on each placeholder box and choose the furniture and appliances you like."},{heading:"Complete the Order & On Boarding Process",subheading:"Pay the subscription fee and upload documents required for KYC."},{heading:"Take The Delivery",subheading:"We will deliver your products within 4 days after KYC completion."},{heading:"Return or Extend",subheading:"Ask for products return once your subscription period is over. Subscription keeps auto extending until you ask for products pickup."},{heading:"Return or Extend",subheading:"Ask for products return once your subscription period is over. Subscription keeps auto extending until you ask for products pickup."},{heading:"Return or Extend",subheading:"Ask for products return once your subscription period is over. Subscription keeps auto extending until you ask for products pickup."}];return(0,r.jsxs)(_.ZP,{anchor:n?"bottom":"right",open:a,onClose:s,classes:{paper:i().customDrawer},children:[" ",(0,r.jsxs)("div",{className:i().drawer_main_container,children:[(0,r.jsx)("div",{className:i().close_icon,onClick:s,children:(0,r.jsx)(l.x8,{color:"#45454A",size:24,className:"cursor-pointer"})}),(0,r.jsx)("div",{children:(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:i().sidebar_header,children:(0,r.jsxs)("div",{className:"flex flex-col",children:[(0,r.jsx)("p",{className:i().sidebar_header_subheading,children:"CityMax"}),(0,r.jsx)("p",{className:i().sidebar_header_heading,children:"How it works"})]})}),(0,r.jsx)("div",{className:"h-[90vh] overflow-scroll pb-[130px] md:pb-0 ",children:null==c?void 0:c.map((e,s)=>(0,r.jsxs)("div",{className:i().drawer_map_wrapper,children:[(0,r.jsxs)("div",{className:i().sidebar_benefit_wrapper,children:[(0,r.jsx)("div",{className:i().sidebar_number,children:(0,r.jsx)("p",{children:s+1})}),(0,r.jsxs)("div",{className:i().sidebar_detailing,children:[(0,r.jsx)("p",{className:i().sidebar_detail_heading,children:e.heading}),(0,r.jsx)("p",{className:i().sidebar_detail_subheading,children:e.subheading})]})]}),s!==(null==c?void 0:c.length)-1&&(0,r.jsx)("div",{className:i().divider})]},s.toString()))})]})})]})]})}},1709:function(e){e.exports={main:"styles_main__9vnXX",header:"styles_header___WbvS",max:"styles_max__sjhZ2",tag_line:"styles_tag_line__sCBJq",center:"styles_center__FecS5",monthly_toggler:"styles_monthly_toggler__vSBE_",pref_mode_text:"styles_pref_mode_text__TtcV_",card_wrapper:"styles_card_wrapper__HhQYV",leaf_icon:"styles_leaf_icon__7E_2l"}},1464:function(e){e.exports={main:"styles_main__wUvzT",head:"styles_head__urBQn",card_wrapper:"styles_card_wrapper__UStgs",card:"styles_card__hVMb4",icon:"styles_icon__FCJ1C",card_head:"styles_card_head__QTMTz",desc:"styles_desc__0C_j_",how_it_works_button:"styles_how_it_works_button__55sTE",how_it_works_paragraph:"styles_how_it_works_paragraph__KHcW_",forward_arrow:"styles_forward_arrow__SuCNY"}},81545:function(e){e.exports={main_wrapper:"styles_main_wrapper__iRwYT"}},65496:function(e){e.exports={freq_asked_que_wrapper:"style_freq_asked_que_wrapper__bd_eD",head:"style_head__MKEUT",QuesAnsArray_div:"style_QuesAnsArray_div__Wx_HC",quesWrapper:"style_quesWrapper__kWepr",ques:"style_ques__H3C8g",ans:"style_ans__vNeDH",ans_open:"style_ans_open__6SClO",btn:"style_btn__DV_t6",btn_txt:"style_btn_txt__upQ_O",forword_icon:"style_forword_icon__cEepZ",faq_skeleton_wrapper:"style_faq_skeleton_wrapper__3jvc_",show_more_div:"style_show_more_div__58F1M",down_arrow:"style_down_arrow__zNCJj"}},14654:function(e){e.exports={main_wrapper:"styles_main_wrapper__Mmz2C",left_image_section:"styles_left_image_section__vEM2g",tryCity_image:"styles_tryCity_image__48mlv",right_text_section:"styles_right_text_section__ofRoH",card_icon:"styles_card_icon___eSqi",tryCity_heading:"styles_tryCity_heading__kXp71",tryCity_headingMax:"styles_tryCity_headingMax__XPO2X",TryCity_paragraph:"styles_TryCity_paragraph__xdAnA",check_button:"styles_check_button__TJyB8",check_button_paragraph:"styles_check_button_paragraph__X627q",forward_icon:"styles_forward_icon__J1k91",benefits_text:"styles_benefits_text__0KtlM",line:"styles_line__Sca0g",benefits_of_city_wrapper:"styles_benefits_of_city_wrapper__0sefR",benefits_content:"styles_benefits_content__UP1_k",card_wrapper:"styles_card_wrapper__RtRGz",benefit_title:"styles_benefit_title__8eaSa",benefit_paragraph:"styles_benefit_paragraph__uF160",how_it_works_button:"styles_how_it_works_button__G2XJc",how_it_works_paragraph:"styles_how_it_works_paragraph__gR0wf",forward_arrow:"styles_forward_arrow__fSXyc",underline:"styles_underline__wieus",Skeleton_text:"styles_Skeleton_text__TCgtG",Skeleton_button:"styles_Skeleton_button__WBCPc",sidebar_header:"styles_sidebar_header__AINTx",sidebar_header_subheading:"styles_sidebar_header_subheading__A16Oo",sidebar_header_heading:"styles_sidebar_header_heading__Y2CjL",sidebar_benefit_wrapper:"styles_sidebar_benefit_wrapper__zD68i",sidebar_number:"styles_sidebar_number__LUAHR",sidebar_detailing:"styles_sidebar_detailing__yL9qt",sidebar_detail_heading:"styles_sidebar_detail_heading__xcGG7",sidebar_detail_subheading:"styles_sidebar_detail_subheading__2smmZ",rupeeIcon:"styles_rupeeIcon__ILXhG",skeleton_box:"styles_skeleton_box__yO2bE",divider:"styles_divider__joF5O",drawer_map_wrapper:"styles_drawer_map_wrapper__yODvF",customDrawer:"styles_customDrawer__aWtUR",close_icon:"styles_close_icon__f9zMs",drawer_main_container:"styles_drawer_main_container__L6zni"}}},function(e){e.O(0,[3791,3287,2775,5625,5639,6680,4947,3296,8121,372,9173,1524,8166,5852,6738,6877,6130,7557,261,5846,2329,5400,3939,3568,9253,2961,1744],function(){return e(e.s=82851)}),_N_E=e.O()}]);