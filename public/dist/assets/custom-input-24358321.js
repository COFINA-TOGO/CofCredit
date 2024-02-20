import{_ as I,o as l,f as u,e as n,c as k,F as y,i as R,s as x,b as c,y as W,d,A as $,v as D,x as b,z as C,r as g,n as _,aW as h,a2 as j}from"./index-7474f5b2.js";import{a as p,V as v}from"./VRow-0990f1b0.js";import{V as f}from"./form-1daec3d8.js";import{V as w}from"./VCheckbox-54bfc8aa.js";import{_ as S}from"./CustomRadiosWithImage-808c375e.js";import{_ as U}from"./CustomRadiosWithIcon-d244f651.js";import{V as B}from"./VSpacer-8657084e.js";import{_ as G}from"./AppCardCode-e48f1a17.js";import{_ as F}from"./CustomRadios-c2a277ed.js";import"./VCheckboxBtn-64a51864.js";import"./VSelectionControl-6ad5757d.js";import"./VInput-0a1cf06c.js";import"./VImg-f2e8baad.js";import"./VRadioGroup-ee1af1f8.js";import"./VAvatar-60fa6094.js";import"./VCard-5a5536f3.js";import"./VCardText-5b1570fa.js";import"./VDivider-495a0759.js";const q=["src"],A={__name:"CustomCheckboxesWithImage",props:{selectedCheckbox:{type:Array,required:!0},checkboxContent:{type:Array,required:!0},gridColumn:{type:null,required:!1}},emits:["update:selectedCheckbox"],setup(r,{emit:a}){const e=r,m=a,t=o=>{typeof o!="boolean"&&m("update:selectedCheckbox",o)};return(o,i)=>e.checkboxContent&&e.selectedCheckbox?(l(),u(v,{key:0},{default:n(()=>[(l(!0),k(y,null,R(e.checkboxContent,s=>(l(),u(p,x({key:s.value},r.gridColumn),{default:n(()=>[c(f,{class:W(["custom-input custom-checkbox rounded cursor-pointer w-100",e.selectedCheckbox.includes(s.value)?"active":""])},{default:n(()=>[d("div",null,[c(w,{id:`custom-checkbox-with-img-${s.value}`,"model-value":e.selectedCheckbox,value:s.value,"onUpdate:modelValue":t},null,8,["id","model-value","value"])]),d("img",{src:s.bgImage,alt:"bg-img",class:"custom-checkbox-image"},null,8,q)]),_:2},1032,["class"]),s.label||o.$slots.label?(l(),u(f,{key:0,for:`custom-checkbox-with-img-${s.value}`,class:"cursor-pointer"},{default:n(()=>[$(o.$slots,"label",{label:s.label},()=>[D(b(s.label),1)],!0)]),_:2},1032,["for"])):C("",!0)]),_:2},1040))),128))]),_:3})):C("",!0)}},E=I(A,[["__scopeId","data-v-4fc072ba"]]),P="/assets/custom-checkbox-img-1-ad01355a.png",T="/assets/custom-checkbox-img-2-2d35a86b.png",L="/assets/custom-checkbox-img-3-1a4526bb.png",N={__name:"DemoCustomInputCustomCheckboxesWithImage",setup(r){const a=[{bgImage:P,value:"basic"},{bgImage:T,value:"premium"},{bgImage:L,value:"enterprise"}],e=g(["basic"]);return(m,t)=>{const o=E;return l(),u(o,{"selected-checkbox":_(e),"onUpdate:selectedCheckbox":t[0]||(t[0]=i=>h(e)?e.value=i:null),"checkbox-content":a,"grid-column":{sm:"4",cols:"12"}},null,8,["selected-checkbox"])}}},J="/assets/custom-radio-img-1-9fd6addb.png",O="/assets/custom-radio-img-2-81c76549.png",H="/assets/custom-radio-img-3-9150de6f.png",K={__name:"DemoCustomInputCustomRadiosWithImage",setup(r){const a=[{bgImage:J,value:"basic"},{bgImage:O,value:"premium"},{bgImage:H,value:"enterprise"}],e=g("basic");return(m,t)=>{const o=S;return l(),u(o,{"selected-radio":_(e),"onUpdate:selectedRadio":t[0]||(t[0]=i=>h(e)?e.value=i:null),"radio-content":a,"grid-column":{sm:"4",cols:"12"}},null,8,["selected-radio"])}}};const M={class:"d-flex flex-column align-center text-center gap-2"},Q={class:"cr-title text-base"},X={class:"text-sm clamp-text mb-0"},Y={__name:"CustomCheckboxesWithIcon",props:{selectedCheckbox:{type:Array,required:!0},checkboxContent:{type:Array,required:!0},gridColumn:{type:null,required:!1}},emits:["update:selectedCheckbox"],setup(r,{emit:a}){const e=r,m=a,t=o=>{typeof o!="boolean"&&m("update:selectedCheckbox",o)};return(o,i)=>e.checkboxContent&&e.selectedCheckbox?(l(),u(v,{key:0},{default:n(()=>[(l(!0),k(y,null,R(e.checkboxContent,s=>(l(),u(p,x({key:s.title},r.gridColumn),{default:n(()=>[c(f,{class:W(["custom-input custom-checkbox-icon rounded cursor-pointer",e.selectedCheckbox.includes(s.value)?"active":""])},{default:n(()=>[$(o.$slots,"default",{item:s},()=>[d("div",M,[c(j,x(s.icon,{class:"text-high-emphasis"}),null,16),d("h6",Q,b(s.title),1),d("p",X,b(s.desc),1)])],!0),d("div",null,[c(w,{"model-value":e.selectedCheckbox,value:s.value,"onUpdate:modelValue":t},null,8,["model-value","value"])])]),_:2},1032,["class"])]),_:2},1040))),128))]),_:3})):C("",!0)}},Z=I(Y,[["__scopeId","data-v-0cda6519"]]),ee={__name:"DemoCustomInputCustomCheckboxesWithIcon",setup(r){const a=[{title:"Backup",desc:"Backup every file from your project.",value:"backup",icon:{icon:"tabler-server-2",size:"28"}},{title:"Encrypt",desc:"Translate your data to encrypted text.",value:"encrypt",icon:{icon:"tabler-ban",size:"28"}},{title:"Site Lock",desc:"Security tool to protect your website.",value:"site-lock",icon:{icon:"tabler-lock",size:"28"}}],e=g(["backup"]);return(m,t)=>{const o=Z;return l(),u(o,{"selected-checkbox":_(e),"onUpdate:selectedCheckbox":t[0]||(t[0]=i=>h(e)?e.value=i:null),"checkbox-content":a,"grid-column":{sm:"4",cols:"12"}},null,8,["selected-checkbox"])}}},te={__name:"DemoCustomInputCustomRadiosWithIcon",setup(r){const a=[{title:"Starter",desc:"For freelancers who work with multiple clients",value:"starter",icon:{icon:"tabler-rocket",size:"28"}},{title:"Personal",desc:"Join our talented community of talented digital agencies",value:"personal",icon:{icon:"tabler-star",size:"28"}},{title:"Enterprise",desc:"Team plan for free upto 15 seats",value:"enterprise",icon:{icon:"tabler-crown",size:"28"}}],e=g("starter");return(m,t)=>{const o=U;return l(),u(o,{"selected-radio":_(e),"onUpdate:selectedRadio":t[0]||(t[0]=i=>h(e)?e.value=i:null),"radio-content":a,"grid-column":{sm:"4",cols:"12"}},null,8,["selected-radio"])}}};const oe={class:"flex-grow-1"},se={class:"d-flex align-center mb-1"},ce={class:"cr-title text-base"},ne={key:0,class:"text-disabled text-base"},ae={class:"text-sm mb-0"},le={__name:"CustomCheckboxes",props:{selectedCheckbox:{type:Array,required:!0},checkboxContent:{type:Array,required:!0},gridColumn:{type:null,required:!1}},emits:["update:selectedCheckbox"],setup(r,{emit:a}){const e=r,m=a,t=o=>{typeof o!="boolean"&&m("update:selectedCheckbox",o)};return(o,i)=>e.checkboxContent&&e.selectedCheckbox?(l(),u(v,{key:0},{default:n(()=>[(l(!0),k(y,null,R(e.checkboxContent,s=>(l(),u(p,x({key:s.title},r.gridColumn),{default:n(()=>[c(f,{class:W(["custom-input custom-checkbox rounded cursor-pointer",e.selectedCheckbox.includes(s.value)?"active":""])},{default:n(()=>[d("div",null,[c(w,{"model-value":e.selectedCheckbox,value:s.value,"onUpdate:modelValue":t},null,8,["model-value","value"])]),$(o.$slots,"default",{item:s},()=>[d("div",oe,[d("div",se,[d("h6",ce,b(s.title),1),c(B),s.subtitle?(l(),k("span",ne,b(s.subtitle),1)):C("",!0)]),d("p",ae,b(s.desc),1)])],!0)]),_:2},1032,["class"])]),_:2},1040))),128))]),_:3})):C("",!0)}},ie=I(le,[["__scopeId","data-v-6eb5735e"]]),re={__name:"DemoCustomInputCustomCheckboxes",setup(r){const a=[{title:"Discount",subtitle:"20%",desc:"Wow! Get 20% off on your next purchase!",value:"discount"},{title:"Updates",subtitle:"Free",desc:"Get Updates regarding related products.",value:"updates"}],e=g(["discount"]);return(m,t)=>{const o=ie;return l(),u(o,{"selected-checkbox":_(e),"onUpdate:selectedCheckbox":t[0]||(t[0]=i=>h(e)?e.value=i:null),"checkbox-content":a,"grid-column":{sm:"6",cols:"12"}},null,8,["selected-checkbox"])}}},ue={__name:"DemoCustomInputCustomRadios",setup(r){const a=[{title:"Basic",subtitle:"Free",desc:"Get 1 project with 1 team member.",value:"basic"},{title:"Premium",subtitle:"$45.80",value:"premium",desc:"Get 5 projects with 5 team members."}],e=g("basic");return(m,t)=>{const o=F;return l(),u(o,{"selected-radio":_(e),"onUpdate:selectedRadio":t[0]||(t[0]=i=>h(e)?e.value=i:null),"radio-content":a,"grid-column":{sm:"6",cols:"12"}},null,8,["selected-radio"])}}},me={ts:`<script setup lang="ts">
import type { CustomInputContent } from '@core/types'

const checkboxContent: CustomInputContent[] = [
  {
    title: 'Discount',
    subtitle: '20%',
    desc: 'Wow! Get 20% off on your next purchase!',
    value: 'discount',
  },
  {
    title: 'Updates',
    subtitle: 'Free',
    desc: 'Get Updates regarding related products.',
    value: 'updates',
  },
]

const selectedCheckbox = ref(['discount'])
<\/script>

<template>
  <CustomCheckboxes
    v-model:selected-checkbox="selectedCheckbox"
    :checkbox-content="checkboxContent"
    :grid-column="{ sm: '6', cols: '12' }"
  />
</template>
`,js:`<script setup>
const checkboxContent = [
  {
    title: 'Discount',
    subtitle: '20%',
    desc: 'Wow! Get 20% off on your next purchase!',
    value: 'discount',
  },
  {
    title: 'Updates',
    subtitle: 'Free',
    desc: 'Get Updates regarding related products.',
    value: 'updates',
  },
]

const selectedCheckbox = ref(['discount'])
<\/script>

<template>
  <CustomCheckboxes
    v-model:selected-checkbox="selectedCheckbox"
    :checkbox-content="checkboxContent"
    :grid-column="{ sm: '6', cols: '12' }"
  />
</template>
`},de={ts:`<script setup lang="ts">
import type { CustomInputContent } from '@core/types'

const checkboxContent: CustomInputContent[] = [
  {
    title: 'Backup',
    desc: 'Backup every file from your project.',
    value: 'backup',
    icon: { icon: 'tabler-server-2', size: '28' },
  },
  {
    title: 'Encrypt',
    desc: 'Translate your data to encrypted text.',
    value: 'encrypt',
    icon: { icon: 'tabler-ban', size: '28' },
  },
  {
    title: 'Site Lock',
    desc: 'Security tool to protect your website.',
    value: 'site-lock',
    icon: { icon: 'tabler-lock', size: '28' },
  },
]

const selectedCheckbox = ref(['backup'])
<\/script>

<template>
  <CustomCheckboxesWithIcon
    v-model:selected-checkbox="selectedCheckbox"
    :checkbox-content="checkboxContent"
    :grid-column="{ sm: '4', cols: '12' }"
  />
</template>
`,js:`<script setup>
const checkboxContent = [
  {
    title: 'Backup',
    desc: 'Backup every file from your project.',
    value: 'backup',
    icon: {
      icon: 'tabler-server-2',
      size: '28',
    },
  },
  {
    title: 'Encrypt',
    desc: 'Translate your data to encrypted text.',
    value: 'encrypt',
    icon: {
      icon: 'tabler-ban',
      size: '28',
    },
  },
  {
    title: 'Site Lock',
    desc: 'Security tool to protect your website.',
    value: 'site-lock',
    icon: {
      icon: 'tabler-lock',
      size: '28',
    },
  },
]

const selectedCheckbox = ref(['backup'])
<\/script>

<template>
  <CustomCheckboxesWithIcon
    v-model:selected-checkbox="selectedCheckbox"
    :checkbox-content="checkboxContent"
    :grid-column="{ sm: '4', cols: '12' }"
  />
</template>
`},pe={ts:`<script setup lang="ts">
import bg1 from '@images/pages/custom-checkbox-img-1.png'
import bg2 from '@images/pages/custom-checkbox-img-2.png'
import bg3 from '@images/pages/custom-checkbox-img-3.png'

const checkboxContent: { bgImage: string; value: string }[] = [
  {
    bgImage: bg1,
    value: 'basic',
  },
  {
    bgImage: bg2,
    value: 'premium',
  },
  {
    bgImage: bg3,
    value: 'enterprise',
  },
]

const selectedCheckbox = ref(['basic'])
<\/script>

<template>
  <CustomCheckboxesWithImage
    v-model:selected-checkbox="selectedCheckbox"
    :checkbox-content="checkboxContent"
    :grid-column="{ sm: '4', cols: '12' }"
  />
</template>
`,js:`<script setup>
import bg1 from '@images/pages/custom-checkbox-img-1.png'
import bg2 from '@images/pages/custom-checkbox-img-2.png'
import bg3 from '@images/pages/custom-checkbox-img-3.png'

const checkboxContent = [
  {
    bgImage: bg1,
    value: 'basic',
  },
  {
    bgImage: bg2,
    value: 'premium',
  },
  {
    bgImage: bg3,
    value: 'enterprise',
  },
]

const selectedCheckbox = ref(['basic'])
<\/script>

<template>
  <CustomCheckboxesWithImage
    v-model:selected-checkbox="selectedCheckbox"
    :checkbox-content="checkboxContent"
    :grid-column="{ sm: '4', cols: '12' }"
  />
</template>
`},be={ts:`<script setup lang="ts">
import type { CustomInputContent } from '@core/types'

const radioContent: CustomInputContent[] = [
  {
    title: 'Basic',
    subtitle: 'Free',
    desc: 'Get 1 project with 1 team member.',
    value: 'basic',
  },
  {
    title: 'Premium',
    subtitle: '$45.80',
    value: 'premium',
    desc: 'Get 5 projects with 5 team members.',
  },
]

const selectedRadio = ref('basic')
<\/script>

<template>
  <CustomRadios
    v-model:selected-radio="selectedRadio"
    :radio-content="radioContent"
    :grid-column="{ sm: '6', cols: '12' }"
  />
</template>
`,js:`<script setup>
const radioContent = [
  {
    title: 'Basic',
    subtitle: 'Free',
    desc: 'Get 1 project with 1 team member.',
    value: 'basic',
  },
  {
    title: 'Premium',
    subtitle: '$45.80',
    value: 'premium',
    desc: 'Get 5 projects with 5 team members.',
  },
]

const selectedRadio = ref('basic')
<\/script>

<template>
  <CustomRadios
    v-model:selected-radio="selectedRadio"
    :radio-content="radioContent"
    :grid-column="{ sm: '6', cols: '12' }"
  />
</template>
`},ge={ts:`<script setup lang="ts">
import type { CustomInputContent } from '@core/types'

const radioContent: CustomInputContent[] = [
  {
    title: 'Starter',
    desc: 'For freelancers who work with multiple clients',
    value: 'starter',
    icon: { icon: 'tabler-rocket', size: '28' },
  },
  {
    title: 'Personal',
    desc: 'Join our talented community of talented digital agencies',
    value: 'personal',
    icon: { icon: 'tabler-star', size: '28' },
  },
  {
    title: 'Enterprise',
    desc: 'Team plan for free upto 15 seats',
    value: 'enterprise',
    icon: { icon: 'tabler-crown', size: '28' },
  },
]

const selectedRadio = ref('starter')
<\/script>

<template>
  <CustomRadiosWithIcon
    v-model:selected-radio="selectedRadio"
    :radio-content="radioContent"
    :grid-column="{ sm: '4', cols: '12' }"
  />
</template>
`,js:`<script setup>
const radioContent = [
  {
    title: 'Starter',
    desc: 'For freelancers who work with multiple clients',
    value: 'starter',
    icon: {
      icon: 'tabler-rocket',
      size: '28',
    },
  },
  {
    title: 'Personal',
    desc: 'Join our talented community of talented digital agencies',
    value: 'personal',
    icon: {
      icon: 'tabler-star',
      size: '28',
    },
  },
  {
    title: 'Enterprise',
    desc: 'Team plan for free upto 15 seats',
    value: 'enterprise',
    icon: {
      icon: 'tabler-crown',
      size: '28',
    },
  },
]

const selectedRadio = ref('starter')
<\/script>

<template>
  <CustomRadiosWithIcon
    v-model:selected-radio="selectedRadio"
    :radio-content="radioContent"
    :grid-column="{ sm: '4', cols: '12' }"
  />
</template>
`},_e={ts:`<script setup lang="ts">
import bg1 from '@images/pages/custom-radio-img-1.png'
import bg2 from '@images/pages/custom-radio-img-2.png'
import bg3 from '@images/pages/custom-radio-img-3.png'

const radioContent: { bgImage: string; value: string }[] = [
  {
    bgImage: bg1,
    value: 'basic',
  },
  {
    bgImage: bg2,
    value: 'premium',
  },
  {
    bgImage: bg3,
    value: 'enterprise',
  },
]

const selectedRadio = ref('basic')
<\/script>

<template>
  <CustomRadiosWithImage
    v-model:selected-radio="selectedRadio"
    :radio-content="radioContent"
    :grid-column="{ sm: '4', cols: '12' }"
  />
</template>
`,js:`<script setup>
import bg1 from '@images/pages/custom-radio-img-1.png'
import bg2 from '@images/pages/custom-radio-img-2.png'
import bg3 from '@images/pages/custom-radio-img-3.png'

const radioContent = [
  {
    bgImage: bg1,
    value: 'basic',
  },
  {
    bgImage: bg2,
    value: 'premium',
  },
  {
    bgImage: bg3,
    value: 'enterprise',
  },
]

const selectedRadio = ref('basic')
<\/script>

<template>
  <CustomRadiosWithImage
    v-model:selected-radio="selectedRadio"
    :radio-content="radioContent"
    :grid-column="{ sm: '4', cols: '12' }"
  />
</template>
`},Be={__name:"custom-input",setup(r){return(a,e)=>{const m=ue,t=G,o=re,i=te,s=ee,z=K,V=N;return l(),u(v,null,{default:n(()=>[c(p,{cols:"12",md:"6"},{default:n(()=>[c(t,{title:"Custom Radios",code:be},{default:n(()=>[c(m)]),_:1},8,["code"])]),_:1}),c(p,{cols:"12",md:"6"},{default:n(()=>[c(t,{title:"Custom Checkboxes",code:me},{default:n(()=>[c(o)]),_:1},8,["code"])]),_:1}),c(p,{cols:"12",md:"6"},{default:n(()=>[c(t,{title:"Custom Radios With Icon",code:ge},{default:n(()=>[c(i)]),_:1},8,["code"])]),_:1}),c(p,{cols:"12",md:"6"},{default:n(()=>[c(t,{title:"Custom Checkboxes With Icon",code:de},{default:n(()=>[c(s)]),_:1},8,["code"])]),_:1}),c(p,{cols:"12",md:"6"},{default:n(()=>[c(t,{title:"Custom Radios With Image",code:_e},{default:n(()=>[c(z)]),_:1},8,["code"])]),_:1}),c(p,{cols:"12",md:"6"},{default:n(()=>[c(t,{title:"Custom Checkboxes With Image",code:pe},{default:n(()=>[c(V)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{Be as default};
