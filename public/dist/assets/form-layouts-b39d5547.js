import{_ as ie}from"./CustomRadiosWithIcon-d244f651.js";import{_ as j}from"./AppSelect-24b239c9.js";import{_ as de}from"./AppTextarea-1486718f.js";import{_ as R}from"./AppTextField-39a45d2a.js";import{_ as ce,r as m,o as A,f as N,e as l,d as p,b as e,v as y,ak as w,n as t,c as q,F as ae,i as ne,y as $,K as le,L as oe,R as pe,U as ue,b0 as U,aW as i,x as Ve,a2 as be}from"./index-7474f5b2.js";import{b as fe,V as re}from"./VCard-5a5536f3.js";import{V as Ce}from"./VSpacer-8657084e.js";import{V as te}from"./VCardText-5b1570fa.js";import{V as _,a as o}from"./VRow-0990f1b0.js";import{V as k}from"./VForm-01a65b20.js";import{V as L}from"./VCheckbox-54bfc8aa.js";import{V as D,a as T}from"./VRadioGroup-ee1af1f8.js";import{V as S}from"./VDivider-495a0759.js";import{V as he,a as ve}from"./VList-11197605.js";import{a as K,b as Q,c as X,V as ye}from"./VExpansionPanel-064911e1.js";import{V as xe}from"./form-1daec3d8.js";import{V as E}from"./VTextField-f506f2c1.js";import{_ as _e}from"./AppDateTimePicker-8892507e.js";import{a as Z,V as we}from"./VTabs-b7e06252.js";import{V as ge,a as ee}from"./VWindowItem-3e763b65.js";import{r as M,e as Fe}from"./validators-dea6e3a5.js";import{_ as ke}from"./AppAutocomplete-a30c0940.js";import{_ as Ae}from"./AppCardCode-e48f1a17.js";import"./VSelect-3104a182.js";import"./forwardRefs-8348545e.js";import"./VImg-f2e8baad.js";import"./dialog-transition-7fca3df4.js";import"./easing-9f15041e.js";import"./VMenu-d68be952.js";import"./VOverlay-0eaff922.js";import"./lazy-a3d78126.js";import"./scopeId-3b168ed5.js";import"./VCheckboxBtn-64a51864.js";import"./VSelectionControl-6ad5757d.js";import"./VChip-188b13af.js";import"./VAvatar-60fa6094.js";/* empty css                   */import"./VCounter-13e09909.js";import"./VField-e8f1f600.js";import"./VInput-0a1cf06c.js";import"./ssrBoot-6b4d2448.js";import"./VSlideGroup-ad06999a.js";import"./helpers-61e4df1a.js";import"./filter-0dc041cf.js";const I=g=>(pe("data-v-4993c6c3"),g=g(),ue(),g),Te={class:"w-100 sticky-header"},Re={class:"d-flex align-center gap-4 flex-wrap bg-background pa-6"},Ne=I(()=>p("h2",{class:"text-lg font-weight-medium mb-6"}," 1. Delivery Address ",-1)),Le=I(()=>p("p",{class:"text-high-emphasis text-base mb-1"}," Address Type ",-1)),Ie=I(()=>p("h2",{class:"text-lg font-weight-medium mb-6"}," 2. Delivery Type ",-1)),Se=I(()=>p("h2",{class:"text-lg font-weight-medium mb-6"}," 3. Apply Promo code ",-1)),Ue={class:"d-flex align-center gap-4"},Pe={class:"d-flex align-center gap-2 my-4"},De=I(()=>p("span",null,"OR",-1)),Be=I(()=>p("h2",{class:"text-lg font-weight-medium mb-6"}," 4. Payment Method ",-1)),ze=I(()=>p("p",null," Cash on delivery is a mode of payment where you make the payment after the goods/services are received. ",-1)),Ee=I(()=>p("p",null,"You can pay cash or make the payment via debit/credit card directly to the delivery person.",-1)),Me=[ze,Ee],$e={__name:"DemoFormLayoutSticky",setup(g){const f=[{title:"Standard",desc:"Delivery in 3-5 days.",value:"standard",icon:{icon:"tabler-briefcase-2",size:"32"}},{title:"Express",desc:"Delivery within 2 days.",value:"express",icon:{icon:"tabler-rocket",size:"32"}},{title:"Overnight",desc:"Delivery within a days.",value:"overnight",icon:{icon:"tabler-crown",size:"32"}}],C=[{code:"TAKEITALL",desc:"Apply this code to get 15% discount on orders above 20$."},{code:"FESTIVE10",desc:"Apply this code to get 10% discount on all orders."},{code:"MYSTERYDEAL",desc:"Apply this code to get discount between 10% - 50%."}],s=m({fullName:"",email:"",contactNumber:null,altContactNumber:null,address:"",pincode:null,Landmark:"",city:"",state:null,defaultAddress:!1,addressType:"home",deliveryType:"overnight",promoCode:"",paymentMethod:"card",cardNumber:null,cardName:"",cardExDate:"",cardCvv:""});return(u,r)=>{const h=R,n=de,d=j,a=ie;return A(),N(re,{class:"overflow-visible"},{default:l(()=>[p("div",Te,[p("div",Re,[e(fe,null,{default:l(()=>[y("Sticky Action Bar")]),_:1}),e(Ce),p("div",null,[e(w,{variant:"tonal",class:"me-5"},{default:l(()=>[y(" Back ")]),_:1}),e(w,null,{default:l(()=>[y("Place Order")]),_:1})])])]),e(te,null,{default:l(()=>[e(_,null,{default:l(()=>[e(o,{md:"8",cols:"12",class:"mx-auto"},{default:l(()=>[e(k,null,{default:l(()=>[Ne,e(_,null,{default:l(()=>[e(o,{cols:"12",md:"6"},{default:l(()=>[e(h,{modelValue:t(s).fullName,"onUpdate:modelValue":r[0]||(r[0]=c=>t(s).fullName=c),label:"Full Name",placeholder:"John Doe"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(h,{modelValue:t(s).email,"onUpdate:modelValue":r[1]||(r[1]=c=>t(s).email=c),label:"Email",placeholder:"john.doe",suffix:"@example.com"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(h,{modelValue:t(s).contactNumber,"onUpdate:modelValue":r[2]||(r[2]=c=>t(s).contactNumber=c),label:"Contact Number",placeholder:"658 123 4567",type:"number"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(h,{modelValue:t(s).altContactNumber,"onUpdate:modelValue":r[3]||(r[3]=c=>t(s).altContactNumber=c),label:"Alternate Number",placeholder:"658 123 4567",type:"number"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(n,{modelValue:t(s).address,"onUpdate:modelValue":r[4]||(r[4]=c=>t(s).address=c),label:"Address",placeholder:"1456, Mall Road",rows:"2"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(h,{modelValue:t(s).pincode,"onUpdate:modelValue":r[5]||(r[5]=c=>t(s).pincode=c),label:"Pincode",placeholder:"658468",type:"number"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(h,{modelValue:t(s).Landmark,"onUpdate:modelValue":r[6]||(r[6]=c=>t(s).Landmark=c),label:"Landmark",placeholder:"Nr. Wall Street"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(h,{modelValue:t(s).city,"onUpdate:modelValue":r[7]||(r[7]=c=>t(s).city=c),label:"City",placeholder:"Jackson"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(d,{modelValue:t(s).state,"onUpdate:modelValue":r[8]||(r[8]=c=>t(s).state=c),label:"State",placeholder:"Select State",items:["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida"]},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(L,{modelValue:t(s).defaultAddress,"onUpdate:modelValue":r[9]||(r[9]=c=>t(s).defaultAddress=c),label:"Use this as default delivery address"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[Le,e(D,{modelValue:t(s).addressType,"onUpdate:modelValue":r[10]||(r[10]=c=>t(s).addressType=c),inline:""},{default:l(()=>[e(T,{label:"Home (All day delivery)",value:"home"}),e(T,{label:"Office (Delivery between 10 AM - 5 PM)",value:"work"})]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(S,{class:"my-4"}),Ie,e(a,{"selected-radio":t(s).deliveryType,"onUpdate:selectedRadio":r[11]||(r[11]=c=>t(s).deliveryType=c),"radio-content":f,"grid-column":{sm:"4",cols:"12"}},null,8,["selected-radio"]),e(S,{class:"my-4"}),Se,p("div",Ue,[e(h,{modelValue:t(s).promoCode,"onUpdate:modelValue":r[12]||(r[12]=c=>t(s).promoCode=c),density:"compact",placeholder:"TAKEITALL"},null,8,["modelValue"]),e(w,null,{default:l(()=>[y("Apply")]),_:1})]),p("div",Pe,[e(S,{style:{"border-style":"dashed"}}),De,e(S,{style:{"border-style":"dashed"}})]),e(he,{class:"border rounded py-0",lines:"two"},{default:l(()=>[(A(),q(ae,null,ne(C,(c,V)=>e(ve,{key:c.code,title:c.code,subtitle:c.desc,class:$(V!==0?"border-t":"")},{append:l(()=>[e(w,{variant:"tonal"},{default:l(()=>[y(" Apply ")]),_:1})]),_:2},1032,["title","subtitle","class"])),64))]),_:1}),e(S,{class:"my-4"}),Be,e(D,{modelValue:t(s).paymentMethod,"onUpdate:modelValue":r[13]||(r[13]=c=>t(s).paymentMethod=c),inline:"",class:"mb-4"},{default:l(()=>[e(T,{value:"card",label:"Credit/Debit/ATM Card"}),e(T,{value:"cash-on-delivery",label:"Cash On Delivery"})]),_:1},8,["modelValue"]),le(e(_,null,{default:l(()=>[e(o,{cols:"12"},{default:l(()=>[e(h,{label:"Card Number",placeholder:"1356 3215 6548 7898"})]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(h,{label:"Name",placeholder:"John Doe"})]),_:1}),e(o,{cols:"6",md:"3"},{default:l(()=>[e(h,{label:"Exp. Date",placeholder:"MM/YY"})]),_:1}),e(o,{cols:"6",md:"3"},{default:l(()=>[e(h,{label:"CVV Code",placeholder:"654"})]),_:1})]),_:1},512),[[oe,t(s).paymentMethod==="card"]]),le(p("div",null,Me,512),[[oe,t(s).paymentMethod==="cash-on-delivery"]])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}}},je=ce($e,[["__scopeId","data-v-4993c6c3"]]);const qe=p("div",{class:"w-100"},[p("div",{class:"d-flex justify-space-between"},[p("h6",{class:"text-base font-weight-medium"}," Standard 3-5 Days "),p("h6",{class:"text-base font-weight-medium"}," Free ")]),p("span",{class:"text-sm"},"Friday, 15 Nov - Monday, 18 Nov")],-1),He=p("div",{class:"w-100"},[p("div",{class:"d-flex justify-space-between"},[p("h5",{class:"text-base font-weight-medium"}," Express "),p("h6",{class:"text-base font-weight-medium"}," $5.00 ")]),p("span",{class:"text-sm"},"Friday, 15 Nov - Sunday, 17 Nov")],-1),Je=p("div",{class:"w-100"},[p("div",{class:"d-flex justify-space-between"},[p("h6",{class:"text-base font-weight-medium"}," Overnight "),p("h6",{class:"text-base font-weight-medium"}," $10.00 ")]),p("span",{class:"text-sm"},"Friday, 15 Nov - Saturday, 16 Nov")],-1),We={class:"me-1"},Ye={class:"d-flex gap-4"},Ge={__name:"DemoFormLayoutCollapsible",setup(g){const f=["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii"],C=m("home"),s=m("standard"),u=m("credit-debit-card"),r=m(0),h=[{radioValue:"credit-debit-card",radioLabel:"Credit/Debit/ATM Card",icon:"tabler-credit-card"},{radioValue:"cash-on-delivery",radioLabel:"Cash On Delivery",icon:"tabler-help"}];return(n,d)=>{const a=R,c=de,V=j;return A(),N(ye,{modelValue:t(r),"onUpdate:modelValue":d[6]||(d[6]=x=>i(r)?r.value=x:null)},{default:l(()=>[e(K,null,{default:l(()=>[e(Q,null,{default:l(()=>[y("Delivery Address")]),_:1}),e(X,null,{default:l(()=>[e(k,{class:"pt-4 pb-2",onSubmit:U(()=>{},["prevent"])},{default:l(()=>[e(_,null,{default:l(()=>[e(o,{cols:"12",md:"6"},{default:l(()=>[e(a,{label:"Full Name",placeholder:"John Doe"})]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(a,{label:"Phone No",type:"number",placeholder:"+1 123 456 7890"})]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(c,{label:"Address",placeholder:"1234 Main St, New York, NY 10001, USA",rows:"3"})]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(a,{label:"Pincode",placeholder:"123456",type:"number"})]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(a,{label:"Landmark",placeholder:"Near City Mall"})]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(a,{label:"City",placeholder:"New York"})]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(V,{items:f,label:"State",placeholder:"Select State"})]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(xe,{class:"mb-3"},{default:l(()=>[y(" Address Type ")]),_:1}),e(D,{modelValue:t(C),"onUpdate:modelValue":d[0]||(d[0]=x=>i(C)?C.value=x:null),inline:""},{default:l(()=>[p("div",null,[e(T,{label:"Home (All day delivery)",value:"home"}),e(T,{label:"Office (Delivery between 10 AM - 5 PM)",value:"office"})])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(K,null,{default:l(()=>[e(Q,null,{default:l(()=>[y("Delivery Options")]),_:1}),e(X,null,{default:l(()=>[e(D,{modelValue:t(s),"onUpdate:modelValue":d[4]||(d[4]=x=>i(s)?s.value=x:null),class:"delivery-options pt-4 pb-2"},{default:l(()=>[p("div",{class:$(["delivery-option d-flex rounded-t",t(s)==="standard"?"active":""]),onClick:d[1]||(d[1]=x=>s.value="standard")},[e(T,{inline:"",value:"standard",class:"mt-n4"}),qe],2),p("div",{class:$(["delivery-option d-flex",t(s)==="express"?"active":""]),onClick:d[2]||(d[2]=x=>s.value="express")},[e(T,{inline:"",class:"mt-n4",value:"express"}),He],2),p("div",{class:$(["delivery-option d-flex rounded-b",t(s)==="overnight"?"active":""]),onClick:d[3]||(d[3]=x=>s.value="overnight")},[e(T,{inline:"",class:"mt-n4",value:"overnight"}),Je],2)]),_:1},8,["modelValue"])]),_:1})]),_:1}),e(K,null,{default:l(()=>[e(Q,null,{default:l(()=>[y("Payment Method")]),_:1}),e(X,null,{default:l(()=>[e(_,null,{default:l(()=>[e(o,{md:"6",cols:"12"},{default:l(()=>[e(k,{class:"pt-4 pb-2"},{default:l(()=>[p("div",null,[e(D,{modelValue:t(u),"onUpdate:modelValue":d[5]||(d[5]=x=>i(u)?u.value=x:null),inline:""},{default:l(()=>[p("div",null,[(A(),q(ae,null,ne(h,x=>e(T,{key:x.radioValue,value:x.radioValue},{label:l(()=>[p("span",We,Ve(x.radioLabel),1),e(be,{size:"18",icon:x.icon},null,8,["icon"])]),_:2},1032,["value"])),64))])]),_:1},8,["modelValue"])]),le(e(_,null,{default:l(()=>[e(o,{cols:"12"},{default:l(()=>[e(E,{label:"Card Number",type:"number",placeholder:"1234 5678 9012 3456"})]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(E,{label:"Name",placeholder:"john doe"})]),_:1}),e(o,{cols:"6",md:"3"},{default:l(()=>[e(E,{label:"Expiry Date",placeholder:"MM/YY"})]),_:1}),e(o,{cols:"6",md:"3"},{default:l(()=>[e(E,{label:"CVV Code",type:"number",max:"3",placeholder:"123"})]),_:1})]),_:1},512),[[oe,t(u)==="credit-debit-card"]])]),_:1})]),_:1})]),_:1}),e(S,{class:"my-5"}),p("div",Ye,[e(w,null,{default:l(()=>[y("Place Order")]),_:1}),e(w,{color:"secondary",variant:"tonal"},{default:l(()=>[y(" Cancel ")]),_:1})])]),_:1})]),_:1})]),_:1},8,["modelValue"])}}},Oe={__name:"DemoFormLayoutFormWithTabs",setup(g){const f=m("personal-info"),C=m(""),s=m(""),u=m(),r=m(""),h=m(),n=["USA","Canada","UK","Denmark","Germany","Iceland","Israel","Mexico"],d=["English","German","French","Spanish","Portuguese","Russian","Korean"],a=m(""),c=m(""),V=m(""),x=m(""),P=m(""),H=m(""),J=m(""),W=m(""),Y=m(""),G=m(""),O=m([]),B=m(!1),z=m(!1);return(xl,b)=>{const F=R,se=j,me=_e;return A(),q(ae,null,[e(we,{modelValue:t(f),"onUpdate:modelValue":b[0]||(b[0]=v=>i(f)?f.value=v:null)},{default:l(()=>[e(Z,{value:"personal-info"},{default:l(()=>[y(" Personal Info ")]),_:1}),e(Z,{value:"account-details"},{default:l(()=>[y(" Account Details ")]),_:1}),e(Z,{value:"social-links"},{default:l(()=>[y(" Social Links ")]),_:1})]),_:1},8,["modelValue"]),e(re,{flat:""},{default:l(()=>[e(te,null,{default:l(()=>[e(ge,{modelValue:t(f),"onUpdate:modelValue":b[19]||(b[19]=v=>i(f)?f.value=v:null),class:"disable-tab-transition"},{default:l(()=>[e(ee,{value:"personal-info"},{default:l(()=>[e(k,{class:"mt-2"},{default:l(()=>[e(_,null,{default:l(()=>[e(o,{md:"6",cols:"12"},{default:l(()=>[e(F,{modelValue:t(C),"onUpdate:modelValue":b[1]||(b[1]=v=>i(C)?C.value=v:null),label:"First name",placeholder:"John"},null,8,["modelValue"])]),_:1}),e(o,{md:"6",cols:"12"},{default:l(()=>[e(F,{modelValue:t(s),"onUpdate:modelValue":b[2]||(b[2]=v=>i(s)?s.value=v:null),label:"Last name",placeholder:"Doe"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(se,{modelValue:t(u),"onUpdate:modelValue":b[3]||(b[3]=v=>i(u)?u.value=v:null),items:n,label:"Country",placeholder:"Select Country"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(se,{modelValue:t(O),"onUpdate:modelValue":b[4]||(b[4]=v=>i(O)?O.value=v:null),items:d,multiple:"",chips:"",clearable:"",label:"Language",placeholder:"Select Language"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(me,{modelValue:t(r),"onUpdate:modelValue":b[5]||(b[5]=v=>i(r)?r.value=v:null),label:"Birth Date",placeholder:"Select Birth Date"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(F,{modelValue:t(h),"onUpdate:modelValue":b[6]||(b[6]=v=>i(h)?h.value=v:null),type:"number",label:"Phone No.",placeholder:"+1 123 456 7890"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1}),e(ee,{value:"account-details"},{default:l(()=>[e(k,{class:"mt-2"},{default:l(()=>[e(_,null,{default:l(()=>[e(o,{cols:"12",md:"6"},{default:l(()=>[e(F,{modelValue:t(a),"onUpdate:modelValue":b[7]||(b[7]=v=>i(a)?a.value=v:null),label:"Username",placeholder:"Johndoe"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(F,{modelValue:t(c),"onUpdate:modelValue":b[8]||(b[8]=v=>i(c)?c.value=v:null),label:"Email",suffix:"@example.com",placeholder:"johndoe@email.com"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(F,{modelValue:t(V),"onUpdate:modelValue":b[9]||(b[9]=v=>i(V)?V.value=v:null),label:"Password",placeholder:"············",type:t(B)?"text":"password","append-inner-icon":t(B)?"tabler-eye-off":"tabler-eye","onClick:appendInner":b[10]||(b[10]=v=>B.value=!t(B))},null,8,["modelValue","type","append-inner-icon"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(F,{modelValue:t(x),"onUpdate:modelValue":b[11]||(b[11]=v=>i(x)?x.value=v:null),label:"Confirm Password",placeholder:"············",type:t(z)?"text":"password","append-inner-icon":t(z)?"tabler-eye-off":"tabler-eye","onClick:appendInner":b[12]||(b[12]=v=>z.value=!t(z))},null,8,["modelValue","type","append-inner-icon"])]),_:1})]),_:1})]),_:1})]),_:1}),e(ee,{value:"social-links"},{default:l(()=>[e(k,{class:"mt-2"},{default:l(()=>[e(_,null,{default:l(()=>[e(o,{cols:"12",md:"6"},{default:l(()=>[e(F,{modelValue:t(P),"onUpdate:modelValue":b[13]||(b[13]=v=>i(P)?P.value=v:null),label:"Twitter",placeholder:"https://twitter.com/username"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(F,{modelValue:t(H),"onUpdate:modelValue":b[14]||(b[14]=v=>i(H)?H.value=v:null),label:"Facebook",placeholder:"https://facebook.com/username"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(F,{modelValue:t(J),"onUpdate:modelValue":b[15]||(b[15]=v=>i(J)?J.value=v:null),label:"Google+",placeholder:"https://plus.google.com/username"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(F,{modelValue:t(W),"onUpdate:modelValue":b[16]||(b[16]=v=>i(W)?W.value=v:null),label:"LinkedIn",placeholder:"https://linkedin.com/username"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(F,{modelValue:t(Y),"onUpdate:modelValue":b[17]||(b[17]=v=>i(Y)?Y.value=v:null),label:"Instagram",placeholder:"https://instagram.com/username"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(F,{modelValue:t(G),"onUpdate:modelValue":b[18]||(b[18]=v=>i(G)?G.value=v:null),label:"Quora",placeholder:"https://quora.com/username"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(S),e(te,{class:"d-flex gap-4"},{default:l(()=>[e(w,null,{default:l(()=>[y("Submit")]),_:1}),e(w,{color:"secondary",variant:"tonal"},{default:l(()=>[y(" Cancel ")]),_:1})]),_:1})]),_:1})],64)}}},Ke={__name:"DemoFormLayoutFormValidation",setup(g){const f=m(""),C=m(""),s=["Item 1","Item 2","Item 3","Item 4"],u=m(),r=m(!1),h=m();return(n,d)=>{const a=R,c=j;return A(),N(k,{ref_key:"form",ref:h,"lazy-validation":""},{default:l(()=>[e(_,null,{default:l(()=>[e(o,{cols:"12"},{default:l(()=>[e(a,{modelValue:t(f),"onUpdate:modelValue":d[0]||(d[0]=V=>i(f)?f.value=V:null),rules:["requiredValidator"in n?n.requiredValidator:t(M)],label:"Name",placeholder:"John Doe",required:""},null,8,["modelValue","rules"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(a,{modelValue:t(C),"onUpdate:modelValue":d[1]||(d[1]=V=>i(C)?C.value=V:null),rules:["emailValidator"in n?n.emailValidator:t(Fe),"requiredValidator"in n?n.requiredValidator:t(M)],label:"E-mail",placeholder:"johndoe@email.com",required:""},null,8,["modelValue","rules"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(c,{modelValue:t(u),"onUpdate:modelValue":d[2]||(d[2]=V=>i(u)?u.value=V:null),items:s,rules:["requiredValidator"in n?n.requiredValidator:t(M)],placeholder:"Select an Item",label:"Item",name:"select",require:""},null,8,["modelValue","rules"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(L,{modelValue:t(r),"onUpdate:modelValue":d[3]||(d[3]=V=>i(r)?r.value=V:null),rules:["requiredValidator"in n?n.requiredValidator:t(M)],label:"Do you agree?",required:""},null,8,["modelValue","rules"])]),_:1}),e(o,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:l(()=>[e(w,{color:"success",onClick:d[4]||(d[4]=V=>{var x;return(x=t(h))==null?void 0:x.validate()})},{default:l(()=>[y(" Validate ")]),_:1}),e(w,{color:"error",onClick:d[5]||(d[5]=V=>{var x;return(x=t(h))==null?void 0:x.reset()})},{default:l(()=>[y(" Reset Form ")]),_:1}),e(w,{color:"warning",onClick:d[6]||(d[6]=V=>{var x;return(x=t(h))==null?void 0:x.resetValidation()})},{default:l(()=>[y(" Reset Validation ")]),_:1})]),_:1})]),_:1})]),_:1},512)}}},Qe={__name:"DemoFormLayoutFormHint",setup(g){const f=m(""),C=m(""),s=m(),u=m(!1),r=["foo","bar","fizz","buzz"],h=m([]);return(n,d)=>{const a=R,c=ke;return A(),N(k,{onSubmit:U(()=>{},["prevent"])},{default:l(()=>[e(_,null,{default:l(()=>[e(o,{cols:"12"},{default:l(()=>[e(a,{modelValue:t(f),"onUpdate:modelValue":d[0]||(d[0]=V=>i(f)?f.value=V:null),label:"Username",placeholder:"Johndoe"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(a,{modelValue:t(C),"onUpdate:modelValue":d[1]||(d[1]=V=>i(C)?C.value=V:null),label:"Email",type:"email",placeholder:"johndoe@email.com"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(a,{modelValue:t(s),"onUpdate:modelValue":d[2]||(d[2]=V=>i(s)?s.value=V:null),label:"Password",autocomplete:"on",type:"password","persistent-hint":"",placeholder:"············",hint:"Your password must be 8-20 characters long."},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(c,{modelValue:t(h),"onUpdate:modelValue":d[3]||(d[3]=V=>i(h)?h.value=V:null),items:r,chips:"",multiple:"",label:"Autocomplete",placeholder:"Select"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(L,{modelValue:t(u),"onUpdate:modelValue":d[4]||(d[4]=V=>i(u)?u.value=V:null),label:"Remember me"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",class:"d-flex gap-4"},{default:l(()=>[e(w,{type:"submit"},{default:l(()=>[y(" Submit ")]),_:1}),e(w,{color:"secondary",type:"reset",variant:"tonal"},{default:l(()=>[y(" Reset ")]),_:1})]),_:1})]),_:1})]),_:1})}}},Xe={__name:"DemoFormLayoutMultipleColumn",setup(g){const f=m(""),C=m(""),s=m(""),u=m(""),r=m(""),h=m(""),n=m(!1);return(d,a)=>{const c=R;return A(),N(k,{onSubmit:U(()=>{},["prevent"])},{default:l(()=>[e(_,null,{default:l(()=>[e(o,{cols:"12",md:"6"},{default:l(()=>[e(c,{modelValue:t(f),"onUpdate:modelValue":a[0]||(a[0]=V=>i(f)?f.value=V:null),label:"First Name",placeholder:"John"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(c,{modelValue:t(C),"onUpdate:modelValue":a[1]||(a[1]=V=>i(C)?C.value=V:null),label:"Last Name",placeholder:"Doe"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(c,{modelValue:t(h),"onUpdate:modelValue":a[2]||(a[2]=V=>i(h)?h.value=V:null),label:"Email",placeholder:"johndoe@email.com"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(c,{modelValue:t(s),"onUpdate:modelValue":a[3]||(a[3]=V=>i(s)?s.value=V:null),label:"City",placeholder:"New York"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(c,{modelValue:t(u),"onUpdate:modelValue":a[4]||(a[4]=V=>i(u)?u.value=V:null),label:"Country",placeholder:"United States"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(c,{modelValue:t(r),"onUpdate:modelValue":a[5]||(a[5]=V=>i(r)?r.value=V:null),label:"Company",placeholder:"Pixinvent"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(L,{modelValue:t(n),"onUpdate:modelValue":a[6]||(a[6]=V=>i(n)?n.value=V:null),label:"Remember me"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",class:"d-flex gap-4"},{default:l(()=>[e(w,{type:"submit"},{default:l(()=>[y(" Submit ")]),_:1}),e(w,{type:"reset",color:"secondary",variant:"tonal"},{default:l(()=>[y(" Reset ")]),_:1})]),_:1})]),_:1})]),_:1})}}},Ze={__name:"DemoFormLayoutVerticalFormWithIcons",setup(g){const f=m(""),C=m(""),s=m(),u=m(),r=m(!1);return(h,n)=>{const d=R;return A(),N(k,{onSubmit:U(a=>({}),["prevent"])},{default:l(()=>[e(_,null,{default:l(()=>[e(o,{cols:"12"},{default:l(()=>[e(d,{modelValue:t(f),"onUpdate:modelValue":n[0]||(n[0]=a=>i(f)?f.value=a:null),"prepend-inner-icon":"tabler-user",label:"First Name",placeholder:"John"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(d,{modelValue:t(C),"onUpdate:modelValue":n[1]||(n[1]=a=>i(C)?C.value=a:null),"prepend-inner-icon":"tabler-mail",label:"Email",type:"email",placeholder:"johndoe@example.com"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(d,{modelValue:t(s),"onUpdate:modelValue":n[2]||(n[2]=a=>i(s)?s.value=a:null),"prepend-inner-icon":"tabler-device-mobile",label:"Mobile",placeholder:"+1 123 456 7890",type:"number"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(d,{modelValue:t(u),"onUpdate:modelValue":n[3]||(n[3]=a=>i(u)?u.value=a:null),"prepend-inner-icon":"tabler-lock",label:"Password",autocomplete:"on",type:"password",placeholder:"············"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(L,{modelValue:t(r),"onUpdate:modelValue":n[4]||(n[4]=a=>i(r)?r.value=a:null),label:"Remember me"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(w,{type:"submit",class:"me-2"},{default:l(()=>[y(" Submit ")]),_:1}),e(w,{color:"secondary",type:"reset",variant:"tonal"},{default:l(()=>[y(" Reset ")]),_:1})]),_:1})]),_:1})]),_:1})}}},el={__name:"DemoFormLayoutVerticalForm",setup(g){const f=m(""),C=m(""),s=m(),u=m(),r=m(!1);return(h,n)=>{const d=R;return A(),N(k,{onSubmit:U(()=>{},["prevent"])},{default:l(()=>[e(_,null,{default:l(()=>[e(o,{cols:"12"},{default:l(()=>[e(d,{modelValue:t(f),"onUpdate:modelValue":n[0]||(n[0]=a=>i(f)?f.value=a:null),label:"First Name",placeholder:"John"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(d,{modelValue:t(C),"onUpdate:modelValue":n[1]||(n[1]=a=>i(C)?C.value=a:null),label:"Email",type:"email",placeholder:"johndoe@example.com"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(d,{modelValue:t(s),"onUpdate:modelValue":n[2]||(n[2]=a=>i(s)?s.value=a:null),label:"Mobile",placeholder:"+1 123 456 7890",type:"number"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(d,{modelValue:t(u),"onUpdate:modelValue":n[3]||(n[3]=a=>i(u)?u.value=a:null),label:"Password",autocomplete:"on",type:"password",placeholder:"············"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(L,{modelValue:t(r),"onUpdate:modelValue":n[4]||(n[4]=a=>i(r)?r.value=a:null),label:"Remember me"},null,8,["modelValue"])]),_:1}),e(o,{cols:"12",class:"d-flex gap-4"},{default:l(()=>[e(w,{type:"submit"},{default:l(()=>[y(" Submit ")]),_:1}),e(w,{type:"reset",color:"secondary",variant:"tonal"},{default:l(()=>[y(" Reset ")]),_:1})]),_:1})]),_:1})]),_:1})}}},ll=p("label",{class:"v-label text-body-2 text-high-emphasis",for:"firstNameHorizontalIcons"},"First Name",-1),ol=p("label",{class:"v-label text-body-2 text-high-emphasis",for:"emailHorizontalIcons"},"Email",-1),tl=p("label",{class:"v-label text-body-2 text-high-emphasis",for:"mobileHorizontalIcons"},"Mobile",-1),al=p("label",{class:"v-label text-body-2 text-high-emphasis",for:"passwordHorizontalIcons"},"Password",-1),sl={__name:"DemoFormLayoutHorizontalFormWithIcons",setup(g){const f=m(""),C=m(""),s=m(),u=m(),r=m(!1);return(h,n)=>{const d=R;return A(),N(k,{onSubmit:U(()=>{},["prevent"])},{default:l(()=>[e(_,null,{default:l(()=>[e(o,{cols:"12"},{default:l(()=>[e(_,{"no-gutters":""},{default:l(()=>[e(o,{cols:"12",md:"3",class:"d-flex align-items-center"},{default:l(()=>[ll]),_:1}),e(o,{cols:"12",md:"9"},{default:l(()=>[e(d,{id:"firstNameHorizontalIcons",modelValue:t(f),"onUpdate:modelValue":n[0]||(n[0]=a=>i(f)?f.value=a:null),"prepend-inner-icon":"tabler-user",placeholder:"John","persistent-placeholder":""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(_,{"no-gutters":""},{default:l(()=>[e(o,{cols:"12",md:"3",class:"d-flex align-items-center"},{default:l(()=>[ol]),_:1}),e(o,{cols:"12",md:"9"},{default:l(()=>[e(d,{id:"emailHorizontalIcons",modelValue:t(C),"onUpdate:modelValue":n[1]||(n[1]=a=>i(C)?C.value=a:null),"prepend-inner-icon":"tabler-mail",placeholder:"johndoe@email.com","persistent-placeholder":""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(_,{"no-gutters":""},{default:l(()=>[e(o,{cols:"12",md:"3",class:"d-flex align-items-center"},{default:l(()=>[tl]),_:1}),e(o,{cols:"12",md:"9"},{default:l(()=>[e(d,{id:"mobileHorizontalIcons",modelValue:t(s),"onUpdate:modelValue":n[2]||(n[2]=a=>i(s)?s.value=a:null),type:"number","prepend-inner-icon":"tabler-device-mobile",placeholder:"+1 123 456 7890","persistent-placeholder":""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(_,{"no-gutters":""},{default:l(()=>[e(o,{cols:"12",md:"3",class:"d-flex align-items-center"},{default:l(()=>[al]),_:1}),e(o,{cols:"12",md:"9"},{default:l(()=>[e(d,{id:"passwordHorizontalIcons",modelValue:t(u),"onUpdate:modelValue":n[3]||(n[3]=a=>i(u)?u.value=a:null),"prepend-inner-icon":"tabler-lock",autocomplete:"on",type:"password",placeholder:"············","persistent-placeholder":""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(o,{"offset-md":"3",cols:"12",md:"9"},{default:l(()=>[e(L,{modelValue:t(r),"onUpdate:modelValue":n[4]||(n[4]=a=>i(r)?r.value=a:null),label:"Remember me"},null,8,["modelValue"])]),_:1}),e(o,{"offset-md":"3",cols:"12",md:"9",class:"d-flex gap-4"},{default:l(()=>[e(w,{type:"submit"},{default:l(()=>[y(" Submit ")]),_:1}),e(w,{color:"secondary",type:"reset",variant:"tonal"},{default:l(()=>[y(" Reset ")]),_:1})]),_:1})]),_:1})]),_:1})}}},dl=p("label",{class:"v-label text-body-2 text-high-emphasis",for:"firstName"},"First Name",-1),nl=p("label",{class:"v-label text-body-2 text-high-emphasis",for:"email"},"Email",-1),rl=p("label",{class:"v-label text-body-2 text-high-emphasis",for:"mobile"},"Mobile",-1),ml=p("label",{class:"v-label text-body-2 text-high-emphasis",for:"password"},"Password",-1),il={__name:"DemoFormLayoutHorizontalForm",setup(g){const f=m(""),C=m(""),s=m(),u=m(),r=m(!1);return(h,n)=>{const d=R;return A(),N(k,{onSubmit:U(()=>{},["prevent"])},{default:l(()=>[e(_,null,{default:l(()=>[e(o,{cols:"12"},{default:l(()=>[e(_,{"no-gutters":""},{default:l(()=>[e(o,{cols:"12",md:"3",class:"d-flex align-items-center"},{default:l(()=>[dl]),_:1}),e(o,{cols:"12",md:"9"},{default:l(()=>[e(d,{id:"firstName",modelValue:t(f),"onUpdate:modelValue":n[0]||(n[0]=a=>i(f)?f.value=a:null),placeholder:"John","persistent-placeholder":""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(_,{"no-gutters":""},{default:l(()=>[e(o,{cols:"12",md:"3",class:"d-flex align-items-center"},{default:l(()=>[nl]),_:1}),e(o,{cols:"12",md:"9"},{default:l(()=>[e(d,{id:"email",modelValue:t(C),"onUpdate:modelValue":n[1]||(n[1]=a=>i(C)?C.value=a:null),placeholder:"johndoe@email.com","persistent-placeholder":""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(_,{"no-gutters":""},{default:l(()=>[e(o,{cols:"12",md:"3",class:"d-flex align-items-center"},{default:l(()=>[rl]),_:1}),e(o,{cols:"12",md:"9"},{default:l(()=>[e(d,{id:"mobile",modelValue:t(s),"onUpdate:modelValue":n[2]||(n[2]=a=>i(s)?s.value=a:null),type:"number",placeholder:"+1 123 456 7890","persistent-placeholder":""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(_,{"no-gutters":""},{default:l(()=>[e(o,{cols:"12",md:"3",class:"d-flex align-items-center"},{default:l(()=>[ml]),_:1}),e(o,{cols:"12",md:"9"},{default:l(()=>[e(d,{id:"password",modelValue:t(u),"onUpdate:modelValue":n[3]||(n[3]=a=>i(u)?u.value=a:null),autocomplete:"on",type:"password",placeholder:"············","persistent-placeholder":""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(o,{"offset-md":"3",cols:"12",md:"9"},{default:l(()=>[e(L,{modelValue:t(r),"onUpdate:modelValue":n[4]||(n[4]=a=>i(r)?r.value=a:null),label:"Remember me"},null,8,["modelValue"])]),_:1}),e(o,{"offset-md":"3",cols:"12",md:"9",class:"d-flex gap-4"},{default:l(()=>[e(w,{type:"submit"},{default:l(()=>[y(" Submit ")]),_:1}),e(w,{color:"secondary",variant:"tonal",type:"reset"},{default:l(()=>[y(" Reset ")]),_:1})]),_:1})]),_:1})]),_:1})}}},cl={ts:`<script lang="ts" setup>
const username = ref('')
const email = ref('')
const password = ref<string>()
const checkbox = ref(false)
const items = ['foo', 'bar', 'fizz', 'buzz'] as const
const values = ref<typeof items[number][]>([])
<\/script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <!-- 👉 Username -->
        <AppTextField
          v-model="username"
          label="Username"
          placeholder="Johndoe"
        />
      </VCol>

      <VCol cols="12">
        <!-- 👉 Email -->
        <AppTextField
          v-model="email"
          label="Email"
          type="email"
          placeholder="johndoe@email.com"
        />
      </VCol>

      <VCol cols="12">
        <!-- 👉 Password -->
        <AppTextField
          v-model="password"
          label="Password"
          autocomplete="on"
          type="password"
          persistent-hint
          placeholder="············"
          hint="Your password must be 8-20 characters long."
        />
      </VCol>

      <VCol cols="12">
        <!-- 👉 Autocomplete -->
        <AppAutocomplete
          v-model="values"
          :items="items"
          chips
          multiple
          label="Autocomplete"
          placeholder="Select"
        />
      </VCol>

      <VCol cols="12">
        <!-- 👉 Checkbox -->
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>

      <VCol
        cols="12"
        class="d-flex gap-4"
      >
        <!-- 👉 submit and reset button -->
        <VBtn type="submit">
          Submit
        </VBtn>

        <VBtn
          color="secondary"
          type="reset"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`,js:`<script setup>
const username = ref('')
const email = ref('')
const password = ref()
const checkbox = ref(false)

const items = [
  'foo',
  'bar',
  'fizz',
  'buzz',
]

const values = ref([])
<\/script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <!-- 👉 Username -->
        <AppTextField
          v-model="username"
          label="Username"
          placeholder="Johndoe"
        />
      </VCol>

      <VCol cols="12">
        <!-- 👉 Email -->
        <AppTextField
          v-model="email"
          label="Email"
          type="email"
          placeholder="johndoe@email.com"
        />
      </VCol>

      <VCol cols="12">
        <!-- 👉 Password -->
        <AppTextField
          v-model="password"
          label="Password"
          autocomplete="on"
          type="password"
          persistent-hint
          placeholder="············"
          hint="Your password must be 8-20 characters long."
        />
      </VCol>

      <VCol cols="12">
        <!-- 👉 Autocomplete -->
        <AppAutocomplete
          v-model="values"
          :items="items"
          chips
          multiple
          label="Autocomplete"
          placeholder="Select"
        />
      </VCol>

      <VCol cols="12">
        <!-- 👉 Checkbox -->
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>

      <VCol
        cols="12"
        class="d-flex gap-4"
      >
        <!-- 👉 submit and reset button -->
        <VBtn type="submit">
          Submit
        </VBtn>

        <VBtn
          color="secondary"
          type="reset"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`},pl={ts:`<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { VForm } from 'vuetify/components/VForm'

const name = ref('')
const email = ref('')
const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'] as const
const select = ref<typeof items[number]>()
const checkbox = ref(false)
const form = ref<VForm>()
<\/script>

<template>
  <VForm
    ref="form"
    lazy-validation
  >
    <VRow>
      <VCol cols="12">
        <AppTextField
          v-model="name"
          :rules="[requiredValidator]"
          label="Name"
          placeholder="John Doe"
          required
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="email"
          :rules="[emailValidator, requiredValidator]"
          label="E-mail"
          placeholder="johndoe@email.com"
          required
        />
      </VCol>

      <VCol cols="12">
        <AppSelect
          v-model="select"
          :items="items"
          :rules="[requiredValidator]"
          placeholder="Select an Item"
          label="Item"
          name="select"
          require
        />
      </VCol>

      <VCol cols="12">
        <VCheckbox
          v-model="checkbox"
          :rules="[requiredValidator]"
          label="Do you agree?"
          required
        />
      </VCol>

      <VCol
        cols="12"
        class="d-flex flex-wrap gap-4"
      >
        <VBtn
          color="success"
          @click="form?.validate()"
        >
          Validate
        </VBtn>

        <VBtn
          color="error"
          @click="form?.reset()"
        >
          Reset Form
        </VBtn>

        <VBtn
          color="warning"
          @click="form?.resetValidation()"
        >
          Reset Validation
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`,js:`<script setup>
const name = ref('')
const email = ref('')

const items = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
]

const select = ref()
const checkbox = ref(false)
const form = ref()
<\/script>

<template>
  <VForm
    ref="form"
    lazy-validation
  >
    <VRow>
      <VCol cols="12">
        <AppTextField
          v-model="name"
          :rules="[requiredValidator]"
          label="Name"
          placeholder="John Doe"
          required
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="email"
          :rules="[emailValidator, requiredValidator]"
          label="E-mail"
          placeholder="johndoe@email.com"
          required
        />
      </VCol>

      <VCol cols="12">
        <AppSelect
          v-model="select"
          :items="items"
          :rules="[requiredValidator]"
          placeholder="Select an Item"
          label="Item"
          name="select"
          require
        />
      </VCol>

      <VCol cols="12">
        <VCheckbox
          v-model="checkbox"
          :rules="[requiredValidator]"
          label="Do you agree?"
          required
        />
      </VCol>

      <VCol
        cols="12"
        class="d-flex flex-wrap gap-4"
      >
        <VBtn
          color="success"
          @click="form?.validate()"
        >
          Validate
        </VBtn>

        <VBtn
          color="error"
          @click="form?.reset()"
        >
          Reset Form
        </VBtn>

        <VBtn
          color="warning"
          @click="form?.resetValidation()"
        >
          Reset Validation
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`},ul={ts:`<script lang="ts" setup>
const tab = ref('personal-info')
const firstName = ref('')
const lastName = ref('')
const country = ref()
const birthDate = ref('')
const phoneNo = ref<number>()
const countryList = ['USA', 'Canada', 'UK', 'Denmark', 'Germany', 'Iceland', 'Israel', 'Mexico']
const languageList = ['English', 'German', 'French', 'Spanish', 'Portuguese', 'Russian', 'Korean'] as const
const username = ref('')
const email = ref('')
const password = ref('')
const cPassword = ref('')
const twitterLink = ref('')
const facebookLink = ref('')
const googlePlusLink = ref('')
const linkedInLink = ref('')
const instagramLink = ref('')
const quoraLink = ref('')
const languages = ref<typeof languageList[number][]>([])
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)
<\/script>

<template>
  <VTabs v-model="tab">
    <VTab value="personal-info">
      Personal Info
    </VTab>
    <VTab value="account-details">
      Account Details
    </VTab>
    <VTab value="social-links">
      Social Links
    </VTab>
  </VTabs>

  <VCard flat>
    <VCardText>
      <VWindow
        v-model="tab"
        class="disable-tab-transition"
      >
        <VWindowItem value="personal-info">
          <VForm class="mt-2">
            <VRow>
              <VCol
                md="6"
                cols="12"
              >
                <AppTextField
                  v-model="firstName"
                  label="First name"
                  placeholder="John"
                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
                <AppTextField
                  v-model="lastName"
                  label="Last name"
                  placeholder="Doe"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="country"
                  :items="countryList"
                  label="Country"
                  placeholder="Select Country"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="languages"
                  :items="languageList"
                  multiple
                  chips
                  clearable
                  label="Language"
                  placeholder="Select Language"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppDateTimePicker
                  v-model="birthDate"
                  label="Birth Date"
                  placeholder="Select Birth Date"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="phoneNo"
                  type="number"
                  label="Phone No."
                  placeholder="+1 123 456 7890"
                />
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem value="account-details">
          <VForm class="mt-2">
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="username"
                  label="Username"
                  placeholder="Johndoe"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="email"
                  label="Email"
                  suffix="@example.com"
                  placeholder="johndoe@email.com"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="password"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="cPassword"
                  label="Confirm Password"
                  placeholder="············"
                  :type="isCPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                />
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem value="social-links">
          <VForm class="mt-2">
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="twitterLink"
                  label="Twitter"
                  placeholder="https://twitter.com/username"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="facebookLink"
                  label="Facebook"
                  placeholder="https://facebook.com/username"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="googlePlusLink"
                  label="Google+"
                  placeholder="https://plus.google.com/username"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="linkedInLink"
                  label="LinkedIn"
                  placeholder="https://linkedin.com/username"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="instagramLink"
                  label="Instagram"
                  placeholder="https://instagram.com/username"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="quoraLink"
                  label="Quora"
                  placeholder="https://quora.com/username"
                />
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>
      </VWindow>
    </VCardText>

    <VDivider />

    <VCardText class="d-flex gap-4">
      <VBtn>Submit</VBtn>
      <VBtn
        color="secondary"
        variant="tonal"
      >
        Cancel
      </VBtn>
    </VCardText>
  </VCard>
</template>
`,js:`<script setup>
const tab = ref('personal-info')
const firstName = ref('')
const lastName = ref('')
const country = ref()
const birthDate = ref('')
const phoneNo = ref()

const countryList = [
  'USA',
  'Canada',
  'UK',
  'Denmark',
  'Germany',
  'Iceland',
  'Israel',
  'Mexico',
]

const languageList = [
  'English',
  'German',
  'French',
  'Spanish',
  'Portuguese',
  'Russian',
  'Korean',
]

const username = ref('')
const email = ref('')
const password = ref('')
const cPassword = ref('')
const twitterLink = ref('')
const facebookLink = ref('')
const googlePlusLink = ref('')
const linkedInLink = ref('')
const instagramLink = ref('')
const quoraLink = ref('')
const languages = ref([])
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)
<\/script>

<template>
  <VTabs v-model="tab">
    <VTab value="personal-info">
      Personal Info
    </VTab>
    <VTab value="account-details">
      Account Details
    </VTab>
    <VTab value="social-links">
      Social Links
    </VTab>
  </VTabs>

  <VCard flat>
    <VCardText>
      <VWindow
        v-model="tab"
        class="disable-tab-transition"
      >
        <VWindowItem value="personal-info">
          <VForm class="mt-2">
            <VRow>
              <VCol
                md="6"
                cols="12"
              >
                <AppTextField
                  v-model="firstName"
                  label="First name"
                  placeholder="John"
                />
              </VCol>

              <VCol
                md="6"
                cols="12"
              >
                <AppTextField
                  v-model="lastName"
                  label="Last name"
                  placeholder="Doe"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="country"
                  :items="countryList"
                  label="Country"
                  placeholder="Select Country"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="languages"
                  :items="languageList"
                  multiple
                  chips
                  clearable
                  label="Language"
                  placeholder="Select Language"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppDateTimePicker
                  v-model="birthDate"
                  label="Birth Date"
                  placeholder="Select Birth Date"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="phoneNo"
                  type="number"
                  label="Phone No."
                  placeholder="+1 123 456 7890"
                />
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem value="account-details">
          <VForm class="mt-2">
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="username"
                  label="Username"
                  placeholder="Johndoe"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="email"
                  label="Email"
                  suffix="@example.com"
                  placeholder="johndoe@email.com"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="password"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="cPassword"
                  label="Confirm Password"
                  placeholder="············"
                  :type="isCPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                />
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem value="social-links">
          <VForm class="mt-2">
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="twitterLink"
                  label="Twitter"
                  placeholder="https://twitter.com/username"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="facebookLink"
                  label="Facebook"
                  placeholder="https://facebook.com/username"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="googlePlusLink"
                  label="Google+"
                  placeholder="https://plus.google.com/username"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="linkedInLink"
                  label="LinkedIn"
                  placeholder="https://linkedin.com/username"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="instagramLink"
                  label="Instagram"
                  placeholder="https://instagram.com/username"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="quoraLink"
                  label="Quora"
                  placeholder="https://quora.com/username"
                />
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>
      </VWindow>
    </VCardText>

    <VDivider />

    <VCardText class="d-flex gap-4">
      <VBtn>Submit</VBtn>
      <VBtn
        color="secondary"
        variant="tonal"
      >
        Cancel
      </VBtn>
    </VCardText>
  </VCard>
</template>
`},Vl={ts:`<script lang="ts" setup>
const firstName = ref('')
const email = ref('')
const mobile = ref<number>()
const password = ref<string>()
const checkbox = ref(false)
<\/script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 First Name -->
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="firstName"
            >First Name</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="firstName"
              v-model="firstName"
              placeholder="John"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 Email -->
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="email"
            >Email</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="email"
              v-model="email"
              placeholder="johndoe@email.com"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 Mobile -->
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="mobile"
            >Mobile</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="mobile"
              v-model="mobile"
              type="number"
              placeholder="+1 123 456 7890"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 Password -->
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="password"
            >Password</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="password"
              v-model="password"
              autocomplete="on"
              type="password"
              placeholder="············"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 Remember me -->
      <VCol
        offset-md="3"
        cols="12"
        md="9"
      >
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>

      <!-- 👉 submit and reset button -->
      <VCol
        offset-md="3"
        cols="12"
        md="9"
        class="d-flex gap-4"
      >
        <VBtn type="submit">
          Submit
        </VBtn>
        <VBtn
          color="secondary"
          variant="tonal"
          type="reset"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`,js:`<script setup>
const firstName = ref('')
const email = ref('')
const mobile = ref()
const password = ref()
const checkbox = ref(false)
<\/script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 First Name -->
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="firstName"
            >First Name</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="firstName"
              v-model="firstName"
              placeholder="John"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 Email -->
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="email"
            >Email</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="email"
              v-model="email"
              placeholder="johndoe@email.com"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 Mobile -->
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="mobile"
            >Mobile</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="mobile"
              v-model="mobile"
              type="number"
              placeholder="+1 123 456 7890"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 Password -->
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="password"
            >Password</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="password"
              v-model="password"
              autocomplete="on"
              type="password"
              placeholder="············"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 Remember me -->
      <VCol
        offset-md="3"
        cols="12"
        md="9"
      >
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>

      <!-- 👉 submit and reset button -->
      <VCol
        offset-md="3"
        cols="12"
        md="9"
        class="d-flex gap-4"
      >
        <VBtn type="submit">
          Submit
        </VBtn>
        <VBtn
          color="secondary"
          variant="tonal"
          type="reset"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`},bl={ts:`<script lang="ts" setup>
const firstName = ref('')
const email = ref('')
const mobile = ref<number>()
const password = ref<string>()
const checkbox = ref(false)
<\/script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <!-- 👉 First Name -->
      <VCol cols="12">
        <VRow no-gutters>
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="firstNameHorizontalIcons"
            >First Name</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="firstNameHorizontalIcons"
              v-model="firstName"
              prepend-inner-icon="tabler-user"
              placeholder="John"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 Email -->
      <VCol cols="12">
        <VRow no-gutters>
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="emailHorizontalIcons"
            >Email</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="emailHorizontalIcons"
              v-model="email"
              prepend-inner-icon="tabler-mail"
              placeholder="johndoe@email.com"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 Mobile -->
      <VCol cols="12">
        <VRow no-gutters>
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="mobileHorizontalIcons"
            >Mobile</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="mobileHorizontalIcons"
              v-model="mobile"
              type="number"
              prepend-inner-icon="tabler-device-mobile"
              placeholder="+1 123 456 7890"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 Password -->
      <VCol cols="12">
        <VRow no-gutters>
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="passwordHorizontalIcons"
            >Password</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="passwordHorizontalIcons"
              v-model="password"
              prepend-inner-icon="tabler-lock"
              autocomplete="on"
              type="password"
              placeholder="············"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 Checkbox -->
      <VCol
        offset-md="3"
        cols="12"
        md="9"
      >
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>

      <!-- 👉 submit and reset button -->
      <VCol
        offset-md="3"
        cols="12"
        md="9"
        class="d-flex gap-4"
      >
        <VBtn type="submit">
          Submit
        </VBtn>
        <VBtn
          color="secondary"
          type="reset"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`,js:`<script setup>
const firstName = ref('')
const email = ref('')
const mobile = ref()
const password = ref()
const checkbox = ref(false)
<\/script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <!-- 👉 First Name -->
      <VCol cols="12">
        <VRow no-gutters>
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="firstNameHorizontalIcons"
            >First Name</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="firstNameHorizontalIcons"
              v-model="firstName"
              prepend-inner-icon="tabler-user"
              placeholder="John"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 Email -->
      <VCol cols="12">
        <VRow no-gutters>
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="emailHorizontalIcons"
            >Email</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="emailHorizontalIcons"
              v-model="email"
              prepend-inner-icon="tabler-mail"
              placeholder="johndoe@email.com"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 Mobile -->
      <VCol cols="12">
        <VRow no-gutters>
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="mobileHorizontalIcons"
            >Mobile</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="mobileHorizontalIcons"
              v-model="mobile"
              type="number"
              prepend-inner-icon="tabler-device-mobile"
              placeholder="+1 123 456 7890"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 Password -->
      <VCol cols="12">
        <VRow no-gutters>
          <VCol
            cols="12"
            md="3"
            class="d-flex align-items-center"
          >
            <label
              class="v-label text-body-2 text-high-emphasis"
              for="passwordHorizontalIcons"
            >Password</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <AppTextField
              id="passwordHorizontalIcons"
              v-model="password"
              prepend-inner-icon="tabler-lock"
              autocomplete="on"
              type="password"
              placeholder="············"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- 👉 Checkbox -->
      <VCol
        offset-md="3"
        cols="12"
        md="9"
      >
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>

      <!-- 👉 submit and reset button -->
      <VCol
        offset-md="3"
        cols="12"
        md="9"
        class="d-flex gap-4"
      >
        <VBtn type="submit">
          Submit
        </VBtn>
        <VBtn
          color="secondary"
          type="reset"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`},fl={ts:`<script lang="ts" setup>
const firstName = ref('')
const lastName = ref('')
const city = ref('')
const country = ref('')
const company = ref('')
const email = ref('')
const checkbox = ref(false)
<\/script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <!-- 👉 First Name -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="firstName"
          label="First Name"
          placeholder="John"
        />
      </VCol>

      <!-- 👉 Last Name -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="lastName"
          label="Last Name"
          placeholder="Doe"
        />
      </VCol>

      <!-- 👉 Email -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="email"
          label="Email"
          placeholder="johndoe@email.com"
        />
      </VCol>

      <!-- 👉 City -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="city"
          label="City"
          placeholder="New York"
        />
      </VCol>

      <!-- 👉 Country -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="country"
          label="Country"
          placeholder="United States"
        />
      </VCol>

      <!-- 👉 Company -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="company"
          label="Company"
          placeholder="Pixinvent"
        />
      </VCol>

      <!-- 👉 Remember me -->
      <VCol cols="12">
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>

      <VCol
        cols="12"
        class="d-flex gap-4"
      >
        <VBtn type="submit">
          Submit
        </VBtn>

        <VBtn
          type="reset"
          color="secondary"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`,js:`<script setup>
const firstName = ref('')
const lastName = ref('')
const city = ref('')
const country = ref('')
const company = ref('')
const email = ref('')
const checkbox = ref(false)
<\/script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <!-- 👉 First Name -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="firstName"
          label="First Name"
          placeholder="John"
        />
      </VCol>

      <!-- 👉 Last Name -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="lastName"
          label="Last Name"
          placeholder="Doe"
        />
      </VCol>

      <!-- 👉 Email -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="email"
          label="Email"
          placeholder="johndoe@email.com"
        />
      </VCol>

      <!-- 👉 City -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="city"
          label="City"
          placeholder="New York"
        />
      </VCol>

      <!-- 👉 Country -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="country"
          label="Country"
          placeholder="United States"
        />
      </VCol>

      <!-- 👉 Company -->
      <VCol
        cols="12"
        md="6"
      >
        <AppTextField
          v-model="company"
          label="Company"
          placeholder="Pixinvent"
        />
      </VCol>

      <!-- 👉 Remember me -->
      <VCol cols="12">
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>

      <VCol
        cols="12"
        class="d-flex gap-4"
      >
        <VBtn type="submit">
          Submit
        </VBtn>

        <VBtn
          type="reset"
          color="secondary"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`},Cl={ts:`<script lang="ts" setup>
const firstName = ref('')
const email = ref('')
const mobile = ref<number>()
const password = ref<string>()
const checkbox = ref(false)
<\/script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <AppTextField
          v-model="firstName"
          label="First Name"
          placeholder="John"
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="email"
          label="Email"
          type="email"
          placeholder="johndoe@example.com"
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="mobile"
          label="Mobile"
          placeholder="+1 123 456 7890"
          type="number"
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="password"
          label="Password"
          autocomplete="on"
          type="password"
          placeholder="············"
        />
      </VCol>

      <VCol cols="12">
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>

      <VCol
        cols="12"
        class="d-flex gap-4"
      >
        <VBtn type="submit">
          Submit
        </VBtn>

        <VBtn
          type="reset"
          color="secondary"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`,js:`<script setup>
const firstName = ref('')
const email = ref('')
const mobile = ref()
const password = ref()
const checkbox = ref(false)
<\/script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <AppTextField
          v-model="firstName"
          label="First Name"
          placeholder="John"
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="email"
          label="Email"
          type="email"
          placeholder="johndoe@example.com"
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="mobile"
          label="Mobile"
          placeholder="+1 123 456 7890"
          type="number"
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="password"
          label="Password"
          autocomplete="on"
          type="password"
          placeholder="············"
        />
      </VCol>

      <VCol cols="12">
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>

      <VCol
        cols="12"
        class="d-flex gap-4"
      >
        <VBtn type="submit">
          Submit
        </VBtn>

        <VBtn
          type="reset"
          color="secondary"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`},hl={ts:`<script lang="ts" setup>
const firstName = ref('')
const email = ref('')
const mobile = ref<number>()
const password = ref<string>()
const checkbox = ref(false)
<\/script>

<template>
  <VForm @submit.prevent="{}">
    <VRow>
      <VCol cols="12">
        <AppTextField
          v-model="firstName"
          prepend-inner-icon="tabler-user"
          label="First Name"
          placeholder="John"
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="email"
          prepend-inner-icon="tabler-mail"
          label="Email"
          type="email"
          placeholder="johndoe@example.com"
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="mobile"
          prepend-inner-icon="tabler-device-mobile"
          label="Mobile"
          placeholder="+1 123 456 7890"
          type="number"
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="password"
          prepend-inner-icon="tabler-lock"
          label="Password"
          autocomplete="on"
          type="password"
          placeholder="············"
        />
      </VCol>

      <VCol cols="12">
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>

      <VCol cols="12">
        <VBtn
          type="submit"
          class="me-2"
        >
          Submit
        </VBtn>

        <VBtn
          color="secondary"
          type="reset"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`,js:`<script setup>
const firstName = ref('')
const email = ref('')
const mobile = ref()
const password = ref()
const checkbox = ref(false)
<\/script>

<template>
  <VForm @submit.prevent="{}">
    <VRow>
      <VCol cols="12">
        <AppTextField
          v-model="firstName"
          prepend-inner-icon="tabler-user"
          label="First Name"
          placeholder="John"
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="email"
          prepend-inner-icon="tabler-mail"
          label="Email"
          type="email"
          placeholder="johndoe@example.com"
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="mobile"
          prepend-inner-icon="tabler-device-mobile"
          label="Mobile"
          placeholder="+1 123 456 7890"
          type="number"
        />
      </VCol>

      <VCol cols="12">
        <AppTextField
          v-model="password"
          prepend-inner-icon="tabler-lock"
          label="Password"
          autocomplete="on"
          type="password"
          placeholder="············"
        />
      </VCol>

      <VCol cols="12">
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>

      <VCol cols="12">
        <VBtn
          type="submit"
          class="me-2"
        >
          Submit
        </VBtn>

        <VBtn
          color="secondary"
          type="reset"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
`},vl=p("h4",{class:"text-h6 font-weight-medium mb-5"}," Collapsible Section ",-1),yl=p("h4",{class:"text-h6 font-weight-medium mb-5"}," Sticky Section ",-1),uo={__name:"form-layouts",setup(g){return(f,C)=>{const s=il,u=Ae,r=sl,h=el,n=Ze,d=Xe,a=Qe,c=Ke,V=Oe,x=Ge,P=je;return A(),q("div",null,[e(_,null,{default:l(()=>[e(o,{cols:"12",md:"6"},{default:l(()=>[e(u,{title:"Horizontal Form",code:Vl},{default:l(()=>[e(s)]),_:1},8,["code"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(u,{title:"Horizontal Form with Icons",code:bl},{default:l(()=>[e(r)]),_:1},8,["code"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(u,{title:"Vertical Form",code:Cl},{default:l(()=>[e(h)]),_:1},8,["code"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(u,{title:"Vertical Form with Icons",code:hl},{default:l(()=>[e(n)]),_:1},8,["code"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[e(u,{title:"Multiple Column",code:fl},{default:l(()=>[e(d)]),_:1},8,["code"])]),_:1})]),_:1}),e(_,{class:"match-height my-3"},{default:l(()=>[e(o,{cols:"12",md:"6"},{default:l(()=>[e(u,{title:"Form Hint",code:cl},{default:l(()=>[e(a)]),_:1},8,["code"])]),_:1}),e(o,{cols:"12",md:"6"},{default:l(()=>[e(u,{title:"Form Validation",code:pl},{default:l(()=>[e(c)]),_:1},8,["code"])]),_:1})]),_:1}),e(_,null,{default:l(()=>[e(o,{cols:"12"},{default:l(()=>[e(u,{title:"Form with Tabs","no-padding":"",code:ul},{default:l(()=>[e(V)]),_:1},8,["code"])]),_:1}),e(o,{cols:"12"},{default:l(()=>[vl,e(x)]),_:1}),e(o,{cols:"12"},{default:l(()=>[yl,e(P)]),_:1})]),_:1})])}}};export{uo as default};
