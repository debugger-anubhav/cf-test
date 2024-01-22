(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7957],{13902:function(e,t,i){"use strict";var n=i(86006),o=i(46750),r=i(40431),a=i(70184),s=i(90300),h=i(10854),l=i(86979),c=i.n(l),d=n.createContext(),u={initialChunks:{}},p="PENDING",m="REJECTED",b=function(e){var t=function(t){return n.createElement(d.Consumer,null,function(i){return n.createElement(e,Object.assign({__chunkExtractor:i},t))})};return e.displayName&&(t.displayName=e.displayName+"WithChunkExtractor"),t},f=function(e){return e};function y(e){var t=e.defaultResolveComponent,i=void 0===t?f:t,l=e.render,d=e.onLoad;function y(e,t){void 0===t&&(t={});var f="function"==typeof e?{requireAsync:e,resolve:function(){},chunkName:function(){}}:e,y={};function g(e){return t.cacheKey?t.cacheKey(e):f.resolve?f.resolve(e):"static"}function v(e,n,o){var r=t.resolveComponent?t.resolveComponent(e,n):i(e);if(t.resolveComponent&&!(0,h.isValidElementType)(r))throw Error("resolveComponent returned something that is not a React component!");return c()(o,r,{preload:!0}),r}var S=function(e){var t=g(e),i=y[t];return i&&i.status!==m||((i=f.requireAsync(e)).status=p,y[t]=i,i.then(function(){i.status="RESOLVED"},function(t){console.error("loadable-components: failed to asynchronously load component",{fileName:f.resolve(e),chunkName:f.chunkName(e),error:t?t.message:t}),i.status=m})),i},w=b(function(e){function i(i){var n;return((n=e.call(this,i)||this).state={result:null,error:null,loading:!0,cacheKey:g(i)},!function(e,t){if(!e){var i=Error("loadable: "+t);throw i.framesToPop=1,i.name="Invariant Violation",i}}(!i.__chunkExtractor||f.requireSync,"SSR requires `@loadable/babel-plugin`, please install it"),i.__chunkExtractor)?(!1===t.ssr||(f.requireAsync(i).catch(function(){return null}),n.loadSync(),i.__chunkExtractor.addChunk(f.chunkName(i))),(0,a.Z)(n)):(!1!==t.ssr&&(f.isReady&&f.isReady(i)||f.chunkName&&u.initialChunks[f.chunkName(i)])&&n.loadSync(),n)}(0,s.Z)(i,e),i.getDerivedStateFromProps=function(e,t){var i=g(e);return(0,r.Z)({},t,{cacheKey:i,loading:t.loading||t.cacheKey!==i})};var n=i.prototype;return n.componentDidMount=function(){this.mounted=!0;var e=this.getCache();e&&e.status===m&&this.setCache(),this.state.loading&&this.loadAsync()},n.componentDidUpdate=function(e,t){t.cacheKey!==this.state.cacheKey&&this.loadAsync()},n.componentWillUnmount=function(){this.mounted=!1},n.safeSetState=function(e,t){this.mounted&&this.setState(e,t)},n.getCacheKey=function(){return g(this.props)},n.getCache=function(){return y[this.getCacheKey()]},n.setCache=function(e){void 0===e&&(e=void 0),y[this.getCacheKey()]=e},n.triggerOnLoad=function(){var e=this;d&&setTimeout(function(){d(e.state.result,e.props)})},n.loadSync=function(){if(this.state.loading)try{var e=f.requireSync(this.props),t=v(e,this.props,_);this.state.result=t,this.state.loading=!1}catch(e){console.error("loadable-components: failed to synchronously load component, which expected to be available",{fileName:f.resolve(this.props),chunkName:f.chunkName(this.props),error:e?e.message:e}),this.state.error=e}},n.loadAsync=function(){var e=this,t=this.resolveAsync();return t.then(function(t){var i=v(t,e.props,_);e.safeSetState({result:i,loading:!1},function(){return e.triggerOnLoad()})}).catch(function(t){return e.safeSetState({error:t,loading:!1})}),t},n.resolveAsync=function(){var e=this.props;return S((e.__chunkExtractor,e.forwardedRef,(0,o.Z)(e,["__chunkExtractor","forwardedRef"])))},n.render=function(){var e=this.props,i=e.forwardedRef,n=e.fallback,a=(e.__chunkExtractor,(0,o.Z)(e,["forwardedRef","fallback","__chunkExtractor"])),s=this.state,h=s.error,c=s.loading,d=s.result;if(t.suspense&&(this.getCache()||this.loadAsync()).status===p)throw this.loadAsync();if(h)throw h;var u=n||t.fallback||null;return c?u:l({fallback:u,result:d,options:t,props:(0,r.Z)({},a,{ref:i})})},i}(n.Component)),_=n.forwardRef(function(e,t){return n.createElement(w,Object.assign({forwardedRef:t},e))});return _.displayName="Loadable",_.preload=function(e){_.load(e)},_.load=function(e){return S(e)},_}return{loadable:y,lazy:function(e,t){return y(e,(0,r.Z)({},t,{suspense:!0}))}}}var g=y({defaultResolveComponent:function(e){return e.__esModule?e.default:e.default||e},render:function(e){var t=e.result,i=e.props;return n.createElement(t,i)}}),v=g.loadable,S=g.lazy,w=y({onLoad:function(e,t){e&&t.forwardedRef&&("function"==typeof t.forwardedRef?t.forwardedRef(e):t.forwardedRef.current=e)},render:function(e){var t=e.result,i=e.props;return i.children?i.children(t):null}}),_=w.loadable,C=w.lazy;v.lib=_,S.lib=C,t.ZP=v},75621:function(e,t,i){Promise.resolve().then(i.bind(i,26359))},26359:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return y}});var n=i(9268);i(86006);var o=i(18160),r=i(36945),a=i(64114),s=i(67825),h=i.n(s),l=i(36419);let c=[{heading:"By and Between",decription:'Cityfurnish India Private Limited having its registered office at Flat No 31, Ekta Govt. Employees Co- operative Group, Sector 10A , Gurgaon , Haryana 122001 INDIA ("Company").'},{heading:"And",decription1:'The individuals identified as _______________________ ("Subscriber"). ',decription2:" The Company and the Subscriber shall individually be referred to as 'Party' and collectively as 'Parties'."},{heading:"Whereas",decription:"The Company is in the business of offering Solutions with respect to home furniture, office furniture, soft furnishings and fitness equipments on subscription basis.",lastDesc:"The Subscriber has approached the Company to subscribe to the products and services offered by the Company, and the Company has agreed to provide the same to the Subscriber.",sepcialHeading:"The Parties hereto wish to enter into this Agreement in order to record their mutual understanding."}],d=[{heading:"1. Definition",pointList:['"Solution" means the product and services offered by company as part of subscription programme.','"Service" means and includes delivery and installation of furniture, furnishing and fitness equipments.','"Initial Subscription Period" means the period of ____ months from Subscription Date or such period as amended from time to time on the basis of customer request.','"Security Deposit" means the amount deposited with the Company as per the solution provided by the company under the Subscription Programme.','"Subscriber" means any person who subscribes for the solution.','"Subscription" means the non-exclusive and non-transferable permission by the Company to experience the solution for personal consumption to the Subscriber.','"Subscription Fee" means monthly fee charged by the Company towards Subscription of aSolution by the Subscriber.','"Subscription Period" shall mean the period for which the Subscriber has taken the Subscription including the Initial Subscription Period.','"Subscription Program Documents" shall mean and include this Agreement, invoice and any other document as may be provided by the Company.']},{heading:"2. Subscription of Solution",pointList:["The particular terms and conditions of Subscription of a Solution by a Subscriber shall be as per the prevailing Subscription Programme.","The Solution and any part thereof shall always be the property of the Company and the Subscriber shall return the same to the Company on Termination or expiry of Subscription Period."]},{heading:"3. Subscription Fees",pointList:["Any Person can subscribe to the Solution for a Subscription Fee as per the prevailing Subscription Programme. Subscription Fees shall be paid within 5 days of due date as per subscription programme.","The Subscription Fee is exclusive of taxes. GST, as applicable, will be charged additionally."," Delayed payment of Subscription Fee beyond due date shall attract a penal interest of 10% of due amount per month from the date of default till the time the Subscription Fee is paid. The minimum interest levied would be Rs. 300 per month of delay.","Non-payment of Subscription Fee within 2 (Two) weeks of due date could result in termination of this Agreement, removal of the Solution or part thereof and other legal procedures/remedies that the Company may at its sole discretion, decide to proceed with.","The Company shall levy a charge of Rs. 400/- for each cheque return/bounce or ECS/Standing Instructions dishonour."]},{heading:"4. Security Deposit",pointList:["Every Subscriber shall deposit the prescribed refundable, interest free Security Deposit as indicated in the prevailing Subscription Programme for the Solution prior to the Subscription Date.","The Security Deposit shall be refunded after the Company has taken possession of all the products delivered as part of the Solution or part thereof and issue a Pick Up docket.","Within 7 (seven) working days from the date of issue of Pick Up dockets, the Company shall process for refund of Security Deposit, subject to deduction of damages, unpaid Subscription Fees and any other deductions as applicable.","Security deposit does not include any monthly subscription fee. It is simply a security deposit which takes care of the damages (if any) and any default in payments.","Company reserves the right to charge additional security deposit; or ask for additional documents in case of a high value order.","Refund amount shall be transferred to account or card from where initial deposit was received. In case subscriber wish to get amount refunded to some other bank account, cancelled cheque copy of account needs to be shared with company before or at the time of pickup."]},{heading:"5. Subscription Date, Use and Obligations",pointList:["The Company shall install/deliver the Solution or part thereof within 7 (Seven) days or any other mutually agreed period at the delivery address provided by the Subscriber from the receipt of the Security Deposit and a delivery receipt be issued by the Company. The date of delivery receipt shall be the Subscription Date.","The Solution or part thereof shall be used by the Subscriber for personal purposes or where applicable, for the purposes of its executives and his/her family members, servants and guests, without in any way creating right / title interest in the Solution or part thereof except as mentioned in this Agreement.","The Company shall repair or exchange the items in the Solution if the Subscriber faces any technical problems within 7 (seven) days of the receipt of such complaint in writing.","On or before expiry of Initial Subscription Period, Subscriber might request for an extension of subscription. The Subscription can be renewed at mutually agreed terms by the Parties."]},{heading:"6. Joint Subscription",pointList:["If the Subscription has been jointly subscribed, one of them at their mutual understanding shall be designated as the Primary Subscriber and the other(s) shall be treated as Secondary Subscriber.","The Primary Subscriber shall be the point of contact for the Company and any benefit accumulated under the Subscription Programme shall be offered and provided to the Subscriber.","In the event of Joint subscription, the accumulated benefit could be assigned by the Primary Subscriber to an identified Secondary Subscriber with the consent of the Company.","Notwithstanding the Clause 6, all joint Subscribers shall be liable for payment of the Subscription Fees, Security deposit or any damages or deductions arising under this Agreement."]},{heading:"7. Delivery and Pickup",pointList:["The Subscriber or his/her representative has to be present at the agreed date and time. If a 'mutually scheduled' delivery or pickup needs to be rescheduled due to non-availability of the Subscriber, additional logistics costs incurred shall be charged to the Subscriber","Any delay in pick-up of products due to unavailability of Subscriber may attract additional charges depending upon delay duration","Though we conduct detailed quality checks before delivery, the Subscriber is expected to check if there are any damages at the time of delivery and report the same to representative of the Company and photos shall be captured of the same.","Photos of the Subscriber will be taken with the items delivered for Company's records. Subscriber is expected to allow Company's representatives to take the required photographs.","Subscriber shall ensure the entry of delivery vehicle inside the premises. Additionally, subscriber shall arrange for the permission to use the elevator .In case an elevator isn't available at the delivery location, Subscriber shall inform the Company about the same before schedules delivery date. The Company shall charge for the labor involved for picking up and conveying the items via stairs. The charges shall be discussed with the Subscriber while scheduling the delivery or at the time of delivery."]},{heading:"8. Maintenance",pointList:["Maintenance of electrical appliances and fitness equipment's shall be taken care of by the Company for the entire tenure of the contract. This does not cover damages or breakdowns due to mishandling."]},{heading:"9. Inspection Rights",pointList:[" The Company or its designated representative(s) shall have the right to visit the Premise and inspect the various components constituting the Solution or part thereof by providing a 24 hours' notice, either through phone or email, to the Subscriber.","The Subscriber shall provide reasonable access to their Premise to enable the Company or its designated representatives to carry out the inspection and/or service and maintenance to the Solution or part thereof."]},{heading:"10. Termination",specialHeading1:"Subject to this Agreement, this Agreement can be terminated during the Subscription Period (but only after the expiry of Initial Subscription Period) in following manner:",specialPoint:"Subscriber may terminate the Subscription after giving a 30 days written notice/email with the payment of applicable charges.",specialHeading2:"Following charges will be applicable for early termination:",pointList:[" You can cancel your subscription at any time before or within 48 hours after delivery and receive a full refund for the items. Please note that if you cancel after 48 hours, there will be a small early termination fee.","If you choose a 3-month subscription and wish to cancel before the full term is completed, unfortunately, there won't be a refund. However, if you select a subscription for more than 3 months and cancel before the agreed term, you will receive a refund equivalent to one month's subscription fee.","*Note- No refunds will be initiated for Air Conditioner in case of early closure.","The Company shall terminate the Subscription after giving a 10 days written notice/email to the Subscriber upon the Subscriber defaulting on the payment of Subscription Fees for one (1) consecutive months and has not paid till the expiry of the 10 days' notice period.","The Company may terminate the Subscription with immediate effect if","The Subscriber has been found to transfer or license the Subscription in its own name","The Subscriber has transferred, assigned or leased the Subscription without Company's approval","The Subscriber has transferred the products to some other location without taking prior consent from the company","The Subscriber does not give reasonable access to their Premise to enable the Company or its designated representatives to carry out the inspection and/or service and maintenance to the Solution or part thereof"]},{heading:"11. Effect of Termination",pointList:["On Termination of the Subscription,","The Company shall refund the Security Deposit to the Subscriber after deducting due amount, charges, or damages, if any, in accordance with Clause 4 above","The Subscriber shall return the items in same condition as taken (normal wear and tear accepted) and Company shall remove the items from the premises of the Subscriber at its own cost.","The Subscriber agrees to pay for any damage to, loss of, or any theft (disappearance) of items, regardless of cause or fault. Item damaged beyond repair will be paid for at its Market Price.","The damage shall be ascertained by comparing against the delivery note signed by Subscriber and the photographs taken on delivery and return pickup day and the extent of damage shall be ascertained by using the definition of damages given in Annexure 1. This damage cost shall be mitigated from the refundable deposit paid by the Subscriber.","  The damages will be ascertained by the Company and its decision shall be final in this regard. The Company may waive the damages up to the value of INR 1,000 (One Thousand Rupees) only.","Refund amount shall be transferred to account or card from where initial deposit was received. In case subscriber wish to get amount refunded to some other bank account, cancelled cheque copy of account needs to be shared with company before or at the time of pickup."]},{heading:"12. Duty of Subscriber",pointList:[" The Subscriber shall not, use or attempt to use the Solution or any part thereof or permit any person to provide Solution or any part thereof to any third party by way of trade or otherwise.","The charges shall be exempted for normal wear and tear. However, if any item in the home Furniture or Home Decor component of the Solution is broken, torn, stained or is damaged during the Subscription Period, the Subscriber shall be responsible for compensating the Company in this regard.","During the Subscription Period, the Subscriber is solely responsible for the component of the Solution which must remain at the Premises and shall not be moved to another location without the prior written consent of the Company. Relocation of the Solution or part thereof or reinstallation of the Solution shall be as per the prevailing Subscription Programme.","Subscriber shall take reasonable good care of the Solution or part thereof and not sell, sub-hire, assign, convey, transfer or create any rights in relation to the Solution or part thereof to another person.","Subscriber may lease the house furnished with Solution only after the written approval of the Company."," Further, the Subscriber shall not alter, modify, re-design, re-colour, re-polish, dismantle, re-assemble, change any of the Solution or part thereof, without prior written permission of the Company."]},{heading:"13. Intellectual Property Rights",pointList:['The Intellectual Property Rights ("IPR") including trademarks, copyright, design and any other intellectual property in the Solution belongs to the Company. Solution and any other related materials / service via it and IPR therein may not be copied, distributed, published, licensed, used or reproduced in any way.',"Subscriber shall do all reasonable endeavors to safeguard IPR of the Company in the Solution and perform no act which violates the IPR of the Company and report promptly to the Company if any third party violates or claims IPR in the Solution in knowledge of the Subscriber and co-operate in any enforcement or other protective action taken by the Company.","Subscriber shall not, and shall ensure that any other Person shall not use any reverse engineering, recompilation or disassembly techniques or similar methods to determine any design, concepts, construction method or other aspects of the Solution, or part thereof for any purpose","Subscriber shall not make or attempt to make any alterations, modification, additions or enhancements through any means to the Solution or permit the whole or any part of the Solution to be combined with or become incorporated in any other program or Solution."]},{heading:"14. Confidentiality",pointList:["Subscriber shall keep confidential the terms and conditions of this Agreement and all information disclosed by the Company to the Subscriber in relation to or in connection to this Agreement including the intellectual property rights in the Solution."]},{heading:"15. Disclaimer and Hold Harmless",pointList:["The Subscriber agrees that it is the Subscriber's responsibility to always read the label and/or user manual before using the Solution.","THE COMPANY DISCLAIMS ALL WARRANTIES, EITHER EXPRESS OR IMPLIED, STATUTORY OR OTHERWISE, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR PARTICULAR PURPOSE WITH RESPECT TO THE SOLUTION OFFERED.","In no event shall the Company or its owners, affiliates, employees, contractors, officers, or agents be liable for any damages including, without limitation, incidental and consequential damages, personal injury/wrongful death, lost profits, or damages resulting from the Solution, whether based on warranty, contract, tort, or any other legal theory.","The Company shall not be liable for any damages, compensation etc. incurred by the Subscriber or any third Party because of Solution.","The Liability of the Company arising under or in relation to this Agreement shall not be more than one month Subscription Fees."]},{heading:"16. Breach of terms",pointList:["In the event of breach of any of the covenants and conditions to be observed and performed by the Subscriber hereunder, the Company may at their option terminate this Agreement by giving the Subscriber a prior ten (10) days' notice in writing, specifying the breach complained thereof and requiring its remedy and this Agreement would stand terminated on the expiry of said notice period, unless the Subscriber would have remedied or repaired the said breach before the expiry of the said notice period. Further, the Company shall retain its right to claim damages and/or deduct the damages from the Security Deposit or encash the undated cheques."]},{heading:"17. Indemnity",pointList:[" Subscriber shall always indemnify, defend and hold harmless the Company from any third party claims including but not limited to by the landlord/owner of the Premises of trespass, damage to the premises, claim of criminal or civil nature or any loss, damage, attorney fees incurred in course/arising out of or in connection with this Agreement.","The Subscriber agrees to hold the Company indemnified and harmless from any and all claims, demands, rights, lawsuits, causes of action, obligations, controversies, debts, costs, expenses (including but not limited to attorneys' fees), damages, judgments, losses and liabilities of whatever kind or nature, fixed or contingent, in law, equity or otherwise, whether known or unknown, whether or not apparent or concealed arising out the Solution."]},{heading:"18. Force Majeure",pointList:["Upon the occurrence of any of the following events, including but not limited to fire, accident, riots, flood, earthquake, storm, terrorist activities, war, Acts of God, any governmental or municipal action (beyond the control of the Parties), prohibition or restriction, which in any way results in making the Solution or part thereof unfit, the Company shall have the right to terminate this Agreement forthwith and claim asset or value of the asset as defined by the company in books of account."]},{heading:"19. Statutory Action",pointList:["If the Subscriber is dispossessed from the usage of Solution or part thereof as a result of any legal proceeding or action against the Company in respect to the Solution or part thereof for the breach by the Company of any law, regulation, rules, bye-laws in force in India, the Agreement shall stand terminated from the date of dispossession of the Subscriber."]},{heading:"20. Dispute Resolution and Arbitration",pointList:[" In the event of a dispute or difference of any nature whatsoever between the Parties, the same shall be, as far as possible, be resolved through negotiations and in the event of failure of dispute resolution by negotiations, the dispute shall be referred to Arbitration.","Either Party to this agreement can refer the dispute for resolution to a sole arbitrator or in case of disagreement in the appointment of the arbitrator, then to three arbitrators, of which each Party shall nominate one and the third arbitrator shall be appointed by the said two arbitrators. The decision of the Arbitral Tribunal shall be final and binding on both the parties. The venue of arbitration shall be Gurgaon and the Arbitration proceedings shall be conducted in accordance with provisions of the Arbitration and Conciliation Act, 1996 or any subsequent modifications thereto. The proceeding shall be in English. Each party shall bear and pay its own costs and expenses in connection with the arbitration proceedings unless the arbitrators direct otherwise."]},{heading:"21. Miscellaneous",pointList:["Notice: Any notice to be served on the other Party shall be sent to the address mentioned in this Agreement or as updated by the Parties from time to time through pre-paid recorded delivery or through email and shall be deemed to have been received by the addressee within 48 hours of posting.","Assignment: The Company may assign any of its rights under this Agreement to any person or entity without the prior written consent of the Subscriber. The Subscriber may assign any of its rights under this Agreement to any person or entity only upon receipt of prior written consent of the Company.","Amendments: No change, modification, or termination of any of the terms, provisions, or conditions of this Agreement shall be effective unless made in writing and signed or initialed by all signatories to this Agreement.","Survival: Termination of this Agreement shall not affect those provisions hereof that by their nature are intended to survive such termination including Clause 4, 9, 11, 12, 13, 14, 15, 17, 18, 19.","This Agreement shall be governed and construed in accordance with the laws of India in relation to any legal action or proceedings to enforce this Agreement. The Parties irrevocably submit to the exclusive jurisdiction of any competent courts situated at Gurgaon and waive any objection to such proceedings on grounds of venue or on the grounds that the proceedings have been brought in an inconvenient forum.","Severability: If any paragraph, sub-paragraph, or provision of this Agreement, or the application of such paragraph, sub-paragraph, or provision, is held invalid or excessively broad by a court of competent jurisdiction, the remainder of this Agreement, and the application of such paragraph, sub-paragraph, or provision to Persons, or circumstances other than those with respect to which it is held invalid shall not be affected.","This This Agreement along invoice and other subscription program documents constitutes the entire agreement between the Parties with respect to the matters contained herein and supersedes any and all prior and contemporaneous agreements, negotiations, correspondence, undertakings and communications of the parties, oral or written, with respect to the subject matter of this Agreement.","The The Subscriber shall inform at least ten (10) days before the expiry of Initial Subscription Period to the Company about his/her discontinuance of the Subscription upon expiry of Initial Subscription Period. If no such information is provided, the Solution will be automatically extended for life time without any further action/information from the Subscriber."]}],u=[{heading:"Annexure 1",subheading:"Damage shall be defined as follows:",points:["1. Minor scratches (below 1mm in width and depth, and 2cm in length) on wooden furniture shall be ignored as they are considered 'normal wear and tear'.","2. Minor chips and breakage in timber (below 5mm in width, 1mm in depth and 1cm in length) shall be ignored, while those above the said dimensions shall be charged for.","3. Any damage which is a result of raw material or manufacturing defects shall not be chargeable.","4. Any damage that results in the product being unusable shall result in the value of the product being charged to the subscriber.","5. Any damage that results in the replaceable part of the product being unusable shall result in the value of the part being charged to the subscriber.","6. Tear in upholstery shall result in charge towards replacement of upholstery. Opening up of a stitched joint shall not be chargeable.","7. Stains on upholstery which are not removable via dry cleaning shall result in a charge for upholstery replacement."]}];var p=function(){return(0,n.jsxs)("div",{className:h().wrapper,children:[(0,n.jsx)(l.Z,{currentPage:"Rental Agreement"}),(0,n.jsx)("h1",{className:"".concat(h().main_heading," !tracking-[-0.48px]"),children:"Rental Agreement"}),(0,n.jsx)("div",{className:h().detail,children:'This Subscription Agreement ("Agreement") is made and deemed executed on the date _____________ ("Subscription Date")by the Company at _____________ ("City").'}),(0,n.jsx)("div",{children:null==c?void 0:c.map((e,t)=>(0,n.jsxs)("div",{className:h().data_box,children:[(0,n.jsx)("p",{className:h().heading,children:e.heading}),(0,n.jsx)("p",{className:h().detail,children:"And"===e.heading?(0,n.jsxs)("span",{children:[e.decription1,e.decription2]}):e.decription}),t===c.length-1&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("p",{className:"".concat(h().detail," !mt-4"),children:e.lastDesc}),(0,n.jsx)("p",{className:"".concat(h().special_subheading," !mt-4"),children:e.sepcialHeading})]})]},t.toString()))}),(0,n.jsx)("div",{children:null==d?void 0:d.map((e,t)=>{var i;return(0,n.jsxs)("div",{className:h().data_box,children:[(0,n.jsx)("h2",{className:h().heading,children:e.heading}),0===t&&(0,n.jsx)("p",{className:h().special_subheading,children:"In this Agreement, unless the context otherwise requires, the following capitalized words and expressions shall bear the meaning ascribed to them here-in-below:"}),9===t&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("p",{className:h().special_subheading,children:null==e?void 0:e.specialHeading1}),(0,n.jsx)("li",{className:h().detail,children:null==e?void 0:e.specialPoint}),(0,n.jsx)("p",{className:h().special_subheading,children:null==e?void 0:e.specialHeading2})]}),(0,n.jsx)("div",{className:h().detail,children:null===(i=e.pointList)||void 0===i?void 0:i.map((e,i)=>{let o=e.split(" ");return(0,n.jsxs)("div",{className:h().list_point,children:[(0,n.jsx)("div",{className:" mt-2",children:(0,n.jsx)("p",{className:h().dot})}),20===t?(0,n.jsxs)("p",{className:"ml-3",children:[(0,n.jsx)("span",{className:"font-medium text-45454A tracking-[-0.32px] font-Poppins ",children:4===i?"Governing Law and Jurisdiction":6===i?"Entire Agreement:":7!==i?o[0]:""})," ",o.slice(1).join(" ")]}):(0,n.jsx)("p",{className:"ml-3 tracking-[-0.32px] font-Poppins",children:e})]},i.toString())})})]},t.toString())})}),(0,n.jsx)("div",{children:null==u?void 0:u.map((e,t)=>{var i;return(0,n.jsxs)("div",{children:[(0,n.jsx)("h2",{className:h().heading,children:e.heading}),(0,n.jsx)("p",{className:h().special_subheading,children:e.subheading}),(0,n.jsx)("div",{className:"mt-4",children:null===(i=e.points)||void 0===i?void 0:i.map((e,t)=>(0,n.jsx)("p",{className:h().list_point,children:e},t.toString()))})]},t.toString())})})]})},m=i(3939),b=i(13902);let f=(0,b.ZP)(()=>Promise.resolve().then(i.bind(i,3939)),{fallback:(0,n.jsx)(m.FooterSkeleton,{})});var y=function(){return(0,n.jsxs)("div",{className:"large_layout",children:[(0,n.jsx)(o.Z,{}),(0,n.jsx)(r.Z,{}),(0,n.jsx)(a.Z,{}),(0,n.jsx)(p,{}),(0,n.jsx)(f,{})]})}},36419:function(e,t,i){"use strict";i.d(t,{Z:function(){return s}});var n=i(9268),o=i(21530);i(86006);var r=i(28761),a=i.n(r);function s(e){let{currentPage:t}=e;return(0,n.jsxs)("div",{className:a().bread_crumbs,children:[(0,n.jsx)("a",{href:"/",children:(0,n.jsx)("p",{className:a().bread_crumbs_text,children:"Home"})}),(0,n.jsx)(o.Xs,{color:"#71717A",size:12}),(0,n.jsx)("p",{className:"".concat(a().bread_crumbs_text," !font-medium font-Poppins"),children:t})]})}},28761:function(e){e.exports={bread_crumbs:"style_bread_crumbs__JAtCH",bread_crumbs_text:"style_bread_crumbs_text__LnswY"}},67825:function(e){e.exports={wrapper:"style_wrapper__b8yQQ",main_heading:"style_main_heading__Ay8EY",heading:"style_heading__amhsg",detail:"style_detail___Zzud",data_box:"style_data_box__yT3h6",list_point:"style_list_point__OLE4L",dot:"style_dot__va5Xu",special_subheading:"style_special_subheading__vR64i"}},70184:function(e,t,i){"use strict";function n(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}i.d(t,{Z:function(){return n}})}},function(e){e.O(0,[3791,3287,2775,5625,5639,6680,4947,3296,8121,372,9173,1524,8166,5852,6738,6877,6130,7557,261,8372,2329,5400,1053,3939,9253,2961,1744],function(){return e(e.s=75621)}),_N_E=e.O()}]);