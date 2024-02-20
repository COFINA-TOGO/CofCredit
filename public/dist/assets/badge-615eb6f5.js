import{o as g,c as v,b as t,e as a,n as s,bd as d,f as A,F as H,i as D,v as o,x as k,r as _,O as h,a2 as m,d as n,ak as B,_ as O}from"./index-7474f5b2.js";import{V as i}from"./VAvatar-60fa6094.js";import{V as l}from"./VImg-f2e8baad.js";import{V as e}from"./VBadge-e076cfca.js";import{a as $,V as S}from"./VTabs-b7e06252.js";import{_ as W}from"./AppCardCode-e48f1a17.js";import{V as E,a as u}from"./VRow-0990f1b0.js";import"./easing-9f15041e.js";import"./VSlideGroup-ad06999a.js";import"./VCard-5a5536f3.js";import"./VCardText-5b1570fa.js";import"./VDivider-495a0759.js";const C={class:"demo-space-x"},j={__name:"DemoBadgeMaximumValue",setup(p){return(c,f)=>(g(),v("div",C,[t(e,{content:"99",max:"99","offset-x":"5","offset-y":"-1"},{default:a(()=>[t(i,{size:"48"},{default:a(()=>[t(l,{src:s(d)},null,8,["src"])]),_:1})]),_:1}),t(e,{content:"100",max:"99","offset-x":"5","offset-y":"-1"},{default:a(()=>[t(i,{size:"48"},{default:a(()=>[t(l,{src:s(d)},null,8,["src"])]),_:1})]),_:1}),t(e,{content:"1000",max:"999","offset-x":"5","offset-y":"-1"},{default:a(()=>[t(i,{size:"48"},{default:a(()=>[t(l,{src:s(d)},null,8,["src"])]),_:1})]),_:1})]))}},N={__name:"DemoBadgeTabs",setup(p){const c=[{badge:"3",content:"Item One"},{badge:"1",content:"Item Two"},{badge:"2",content:"Item Three"}];return(f,V)=>(g(),A(S,{grow:""},{default:a(()=>[(g(),v(H,null,D(c,r=>t($,{key:r.content,value:r.content},{default:a(()=>[t(e,{content:r.badge,"offset-x":-18,"offset-y":6},{default:a(()=>[o(k(r.content),1)]),_:2},1032,["content"])]),_:2},1032,["value"])),64))]),_:1}))}},M={class:"demo-space-x"},Y={__name:"DemoBadgeShowOnHover",setup(p){const c=_(),f=_(),V=_(),r=h(f),b=h(c),x=h(V);return(I,z)=>(g(),v("div",M,[t(e,{content:"3",transition:"slide-x-transition","model-value":s(r)},{default:a(()=>[t(m,{ref_key:"tRefTwitterBadge",ref:f,size:"25",icon:"tabler-brand-twitter"},null,512)]),_:1},8,["model-value"]),t(e,{content:"5",transition:"scale-transition","model-value":s(b)},{default:a(()=>[t(m,{ref_key:"tRefInstagramBadge",ref:c,size:"25",icon:"tabler-brand-instagram"},null,512)]),_:1},8,["model-value"]),t(e,{content:"1",transition:"slide-x-transition","model-value":s(x)},{default:a(()=>[t(m,{ref_key:"tRefWhatsappBadge",ref:V,size:"25",icon:"tabler-brand-whatsapp"},null,512)]),_:1},8,["model-value"])]))}},P={class:"d-flex align-center"},F={class:"demo-space-x"},U={__name:"DemoBadgeDynamicNotifications",setup(p){const c=_();return(f,V)=>(g(),v("div",P,[t(e,{content:s(c),"model-value":!!s(c),color:"success",class:"me-5"},{default:a(()=>[t(m,{size:"40",icon:"tabler-brand-vue"})]),_:1},8,["content","model-value"]),n("div",F,[t(B,{onClick:V[0]||(V[0]=r=>c.value=(s(c)||0)+1)},{default:a(()=>[o(" Send Message ")]),_:1}),t(B,{color:"error",onClick:V[1]||(V[1]=r=>c.value=0)},{default:a(()=>[o(" Clear Notifications ")]),_:1})])]))}},L={class:"demo-space-x"},q={__name:"DemoBadgeAvatarStatus",setup(p){return(c,f)=>(g(),v("div",L,[t(e,{dot:"",bordered:"",color:"success",location:"bottom end","offset-x":5,"offset-y":1},{default:a(()=>[t(i,{size:"large"},{default:a(()=>[t(l,{src:s(d)},null,8,["src"])]),_:1})]),_:1}),t(e,{dot:"",bordered:"",color:"warning",location:"bottom end","offset-x":5,"offset-y":1},{default:a(()=>[t(i,{size:"large"},{default:a(()=>[t(l,{src:s(d)},null,8,["src"])]),_:1})]),_:1}),t(e,{dot:"",bordered:"",color:"error",location:"bottom end","offset-x":5,"offset-y":1},{default:a(()=>[t(i,{size:"large"},{default:a(()=>[t(l,{src:s(d)},null,8,["src"])]),_:1})]),_:1})]))}},G={class:"demo-space-x"},J={__name:"DemoBadgeIcon",setup(p){return(c,f)=>(g(),v("div",G,[t(e,null,{badge:a(()=>[t(m,{icon:"tabler-bulb"})]),default:a(()=>[t(i,null,{default:a(()=>[t(l,{src:s(d)},null,8,["src"])]),_:1})]),_:1}),t(e,{icon:"tabler-lock-open"},{default:a(()=>[t(i,null,{default:a(()=>[t(l,{src:s(d)},null,8,["src"])]),_:1})]),_:1})]))}},K={class:"demo-space-x"},Q={__name:"DemoBadgePosition",setup(p){return(c,f)=>(g(),v("div",K,[t(e,{content:"1",location:"end top"},{default:a(()=>[t(i,{size:"48"},{default:a(()=>[t(l,{src:s(d)},null,8,["src"])]),_:1})]),_:1}),t(e,{location:"bottom start",content:"2"},{default:a(()=>[t(i,{size:"48"},{default:a(()=>[t(l,{src:s(d)},null,8,["src"])]),_:1})]),_:1}),t(e,{location:"bottom end",content:"3"},{default:a(()=>[t(i,{size:"48"},{default:a(()=>[t(l,{src:s(d)},null,8,["src"])]),_:1})]),_:1}),t(e,{location:"top start",content:"4"},{default:a(()=>[t(i,{size:"48"},{default:a(()=>[t(l,{src:s(d)},null,8,["src"])]),_:1})]),_:1})]))}},X={},Z={class:"demo-space-x"};function tt(p,c){return g(),v("div",Z,[t(e,{dot:"",color:"primary"},{default:a(()=>[t(m,{size:"25",icon:"tabler-brand-instagram"})]),_:1}),t(e,{dot:"",color:"secondary"},{default:a(()=>[t(m,{size:"25",icon:"tabler-brand-instagram"})]),_:1}),t(e,{dot:"",color:"success"},{default:a(()=>[t(m,{size:"25",icon:"tabler-brand-instagram"})]),_:1}),t(e,{dot:"",color:"info"},{default:a(()=>[t(m,{size:"25",icon:"tabler-brand-instagram"})]),_:1}),t(e,{dot:"",color:"warning"},{default:a(()=>[t(m,{size:"25",icon:"tabler-brand-instagram"})]),_:1}),t(e,{dot:"",color:"error"},{default:a(()=>[t(m,{size:"25",icon:"tabler-brand-instagram"})]),_:1})])}const at=O(X,[["render",tt]]),et={class:"demo-space-x d-flex align-center flex-wrap"},ot={__name:"DemoBadgeStyle",setup(p){return(c,f)=>(g(),v("div",et,[t(e,{content:"1"},{default:a(()=>[t(B,{variant:"tonal"},{default:a(()=>[o(" Default ")]),_:1})]),_:1}),t(e,{content:"5",bordered:""},{default:a(()=>[t(B,{variant:"tonal"},{default:a(()=>[o(" Border ")]),_:1})]),_:1}),t(e,{dot:"",location:"bottom end","offset-x":"3","offset-y":"3"},{default:a(()=>[t(i,{size:"48"},{default:a(()=>[t(l,{src:s(d)},null,8,["src"])]),_:1})]),_:1}),t(e,{inline:"",content:"5"},{default:a(()=>[t(i,{size:"48"},{default:a(()=>[t(l,{src:s(d)},null,8,["src"])]),_:1})]),_:1}),t(e,{rounded:"sm",content:"5"},{default:a(()=>[t(i,{size:"48"},{default:a(()=>[t(l,{src:s(d)},null,8,["src"])]),_:1})]),_:1})]))}},nt={ts:`<script setup lang="ts">
import avatar1 from '@images/avatars/avatar-1.png'
<\/script>

<template>
  <div class="demo-space-x">
    <VBadge
      dot
      bordered
      color="success"
      location="bottom end"
      :offset-x="5"
      :offset-y="1"
    >
      <VAvatar size="large">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <VBadge
      dot
      bordered
      color="warning"
      location="bottom end"
      :offset-x="5"
      :offset-y="1"
    >
      <VAvatar size="large">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <VBadge
      dot
      bordered
      color="error"
      location="bottom end"
      :offset-x="5"
      :offset-y="1"
    >
      <VAvatar size="large">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>
  </div>
</template>
`,js:`<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
<\/script>

<template>
  <div class="demo-space-x">
    <VBadge
      dot
      bordered
      color="success"
      location="bottom end"
      :offset-x="5"
      :offset-y="1"
    >
      <VAvatar size="large">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <VBadge
      dot
      bordered
      color="warning"
      location="bottom end"
      :offset-x="5"
      :offset-y="1"
    >
      <VAvatar size="large">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <VBadge
      dot
      bordered
      color="error"
      location="bottom end"
      :offset-x="5"
      :offset-y="1"
    >
      <VAvatar size="large">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>
  </div>
</template>
`},st={ts:`<template>
  <div class="demo-space-x">
    <VBadge
      dot
      color="primary"
    >
      <VIcon
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>

    <VBadge
      dot
      color="secondary"
    >
      <VIcon
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>

    <VBadge
      dot
      color="success"
    >
      <VIcon
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>

    <VBadge
      dot
      color="info"
    >
      <VIcon
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>

    <VBadge
      dot
      color="warning"
    >
      <VIcon
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>

    <VBadge
      dot
      color="error"
    >
      <VIcon
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-x">
    <VBadge
      dot
      color="primary"
    >
      <VIcon
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>

    <VBadge
      dot
      color="secondary"
    >
      <VIcon
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>

    <VBadge
      dot
      color="success"
    >
      <VIcon
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>

    <VBadge
      dot
      color="info"
    >
      <VIcon
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>

    <VBadge
      dot
      color="warning"
    >
      <VIcon
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>

    <VBadge
      dot
      color="error"
    >
      <VIcon
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>
  </div>
</template>
`},rt={ts:`<script lang="ts" setup>
const notifications = ref<number>()
<\/script>

<template>
  <div class="d-flex align-center">
    <VBadge
      :content="notifications"
      :model-value="!!notifications"
      color="success"
      class="me-5"
    >
      <VIcon
        size="40"
        icon="tabler-brand-vue"
      />
    </VBadge>

    <div class="demo-space-x">
      <VBtn @click="notifications = (notifications || 0) + 1">
        Send Message
      </VBtn>

      <VBtn
        color="error"
        @click="notifications = 0"
      >
        Clear Notifications
      </VBtn>
    </div>
  </div>
</template>
`,js:`<script setup>
const notifications = ref()
<\/script>

<template>
  <div class="d-flex align-center">
    <VBadge
      :content="notifications"
      :model-value="!!notifications"
      color="success"
      class="me-5"
    >
      <VIcon
        size="40"
        icon="tabler-brand-vue"
      />
    </VBadge>

    <div class="demo-space-x">
      <VBtn @click="notifications = (notifications || 0) + 1">
        Send Message
      </VBtn>

      <VBtn
        color="error"
        @click="notifications = 0"
      >
        Clear Notifications
      </VBtn>
    </div>
  </div>
</template>
`},ct={ts:`<script setup lang="ts">
import avatar1 from '@images/avatars/avatar-1.png'
<\/script>

<template>
  <div class="demo-space-x">
    <!-- avatar -->
    <VBadge>
      <template #badge>
        <VIcon icon="tabler-bulb" />
      </template>

      <VAvatar>
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <!-- icon -->
    <VBadge icon="tabler-lock-open">
      <VAvatar>
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>
  </div>
</template>
`,js:`<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
<\/script>

<template>
  <div class="demo-space-x">
    <!-- avatar -->
    <VBadge>
      <template #badge>
        <VIcon icon="tabler-bulb" />
      </template>

      <VAvatar>
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <!-- icon -->
    <VBadge icon="tabler-lock-open">
      <VAvatar>
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>
  </div>
</template>
`},dt={ts:`<script setup lang="ts">
import avatar1 from '@images/avatars/avatar-1.png'
<\/script>

<template>
  <div class="demo-space-x">
    <VBadge
      content="99"
      max="99"
      offset-x="5"
      offset-y="-1"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <VBadge
      content="100"
      max="99"
      offset-x="5"
      offset-y="-1"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <VBadge
      content="1000"
      max="999"
      offset-x="5"
      offset-y="-1"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>
  </div>
</template>
`,js:`<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
<\/script>

<template>
  <div class="demo-space-x">
    <VBadge
      content="99"
      max="99"
      offset-x="5"
      offset-y="-1"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <VBadge
      content="100"
      max="99"
      offset-x="5"
      offset-y="-1"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <VBadge
      content="1000"
      max="999"
      offset-x="5"
      offset-y="-1"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>
  </div>
</template>
`},it={ts:`<script setup lang="ts">
import avatar1 from '@images/avatars/avatar-1.png'
<\/script>

<template>
  <div class="demo-space-x">
    <!-- 👉 Top End -->
    <VBadge
      content="1"
      location="end top"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <!-- 👉 Bottom Start -->
    <VBadge
      location="bottom start"
      content="2"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <!-- 👉 Bottom End -->
    <VBadge
      location="bottom end"
      content="3"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <!-- 👉 top Start -->
    <VBadge
      location="top start"
      content="4"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>
  </div>
</template>
`,js:`<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
<\/script>

<template>
  <div class="demo-space-x">
    <!-- 👉 Top End -->
    <VBadge
      content="1"
      location="end top"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <!-- 👉 Bottom Start -->
    <VBadge
      location="bottom start"
      content="2"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <!-- 👉 Bottom End -->
    <VBadge
      location="bottom end"
      content="3"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <!-- 👉 top Start -->
    <VBadge
      location="top start"
      content="4"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>
  </div>
</template>
`},lt={ts:`<script lang="ts" setup>
const tRefInstagramBadge = ref()
const tRefTwitterBadge = ref()
const tRefWhatsappBadge = ref()

const showTwitterBadgeOnHover = useElementHover(tRefTwitterBadge)
const showInstagramBadgeOnHover = useElementHover(tRefInstagramBadge)
const showWhatsappBadgeOnHover = useElementHover(tRefWhatsappBadge)
<\/script>

<template>
  <div class="demo-space-x">
    <VBadge
      content="3"
      transition="slide-x-transition"
      :model-value="showTwitterBadgeOnHover"
    >
      <VIcon
        ref="tRefTwitterBadge"
        size="25"
        icon="tabler-brand-twitter"
      />
    </VBadge>

    <VBadge
      content="5"
      transition="scale-transition"
      :model-value="showInstagramBadgeOnHover"
    >
      <VIcon
        ref="tRefInstagramBadge"
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>

    <VBadge
      content="1"
      transition="slide-x-transition"
      :model-value="showWhatsappBadgeOnHover"
    >
      <VIcon
        ref="tRefWhatsappBadge"
        size="25"
        icon="tabler-brand-whatsapp"
      />
    </VBadge>
  </div>
</template>
`,js:`<script setup>
const tRefInstagramBadge = ref()
const tRefTwitterBadge = ref()
const tRefWhatsappBadge = ref()
const showTwitterBadgeOnHover = useElementHover(tRefTwitterBadge)
const showInstagramBadgeOnHover = useElementHover(tRefInstagramBadge)
const showWhatsappBadgeOnHover = useElementHover(tRefWhatsappBadge)
<\/script>

<template>
  <div class="demo-space-x">
    <VBadge
      content="3"
      transition="slide-x-transition"
      :model-value="showTwitterBadgeOnHover"
    >
      <VIcon
        ref="tRefTwitterBadge"
        size="25"
        icon="tabler-brand-twitter"
      />
    </VBadge>

    <VBadge
      content="5"
      transition="scale-transition"
      :model-value="showInstagramBadgeOnHover"
    >
      <VIcon
        ref="tRefInstagramBadge"
        size="25"
        icon="tabler-brand-instagram"
      />
    </VBadge>

    <VBadge
      content="1"
      transition="slide-x-transition"
      :model-value="showWhatsappBadgeOnHover"
    >
      <VIcon
        ref="tRefWhatsappBadge"
        size="25"
        icon="tabler-brand-whatsapp"
      />
    </VBadge>
  </div>
</template>
`},mt={ts:`<script setup lang="ts">
import avatar1 from '@images/avatars/avatar-1.png'
<\/script>

<template>
  <div class="demo-space-x d-flex align-center flex-wrap">
    <!-- default -->
    <VBadge content="1">
      <VBtn variant="tonal">
        Default
      </VBtn>
    </VBadge>

    <!-- bordered -->
    <VBadge
      content="5"
      bordered
    >
      <VBtn variant="tonal">
        Border
      </VBtn>
    </VBadge>

    <!-- dot -->
    <VBadge
      dot
      location="bottom end"
      offset-x="3"
      offset-y="3"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <!-- inline -->
    <VBadge
      inline
      content="5"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <!-- Rounded -->
    <VBadge
      rounded="sm"
      content="5"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>
  </div>
</template>
`,js:`<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
<\/script>

<template>
  <div class="demo-space-x d-flex align-center flex-wrap">
    <!-- default -->
    <VBadge content="1">
      <VBtn variant="tonal">
        Default
      </VBtn>
    </VBadge>

    <!-- bordered -->
    <VBadge
      content="5"
      bordered
    >
      <VBtn variant="tonal">
        Border
      </VBtn>
    </VBadge>

    <!-- dot -->
    <VBadge
      dot
      location="bottom end"
      offset-x="3"
      offset-y="3"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <!-- inline -->
    <VBadge
      inline
      content="5"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>

    <!-- Rounded -->
    <VBadge
      rounded="sm"
      content="5"
    >
      <VAvatar size="48">
        <VImg :src="avatar1" />
      </VAvatar>
    </VBadge>
  </div>
</template>
`},gt={ts:`<script setup lang="ts">
const tabs = [
  {
    badge: '3',
    content: 'Item One',
  },
  {
    badge: '1',
    content: 'Item Two',
  },
  {
    badge: '2',
    content: 'Item Three',
  },
]
<\/script>

<template>
  <VTabs grow>
    <VTab
      v-for="tab in tabs"
      :key="tab.content"
      :value="tab.content"
    >
      <VBadge
        :content="tab.badge"
        :offset-x="-18"
        :offset-y="6"
      >
        {{ tab.content }}
      </VBadge>
    </VTab>
  </VTabs>
</template>
`,js:`<script setup>
const tabs = [
  {
    badge: '3',
    content: 'Item One',
  },
  {
    badge: '1',
    content: 'Item Two',
  },
  {
    badge: '2',
    content: 'Item Three',
  },
]
<\/script>

<template>
  <VTabs grow>
    <VTab
      v-for="tab in tabs"
      :key="tab.content"
      :value="tab.content"
    >
      <VBadge
        :content="tab.badge"
        :offset-x="-18"
        :offset-y="6"
      >
        {{ tab.content }}
      </VBadge>
    </VTab>
  </VTabs>
</template>
`},ft=n("p",null,[o("You can use various props like "),n("code",null,"bordered"),o(", "),n("code",null,"dot"),o(", "),n("code",null,"inline"),o(", "),n("code",null,"rounded"),o(" etc. to style the badge.")],-1),Vt=n("p",null,[o("Use "),n("code",null,"color"),o(" prop to create various background badges.")],-1),pt=n("p",null,[o("You can use "),n("code",null,"location"),o(" prop to change the position of the badge. Possible values are "),n("code",null,"top-end"),o(", "),n("code",null,"bottom-end"),o(", "),n("code",null,"bottom-start"),o(", "),n("code",null,"top-start"),o(".")],-1),ut=n("p",null,[o("You can use "),n("code",null,"icon"),o(" prop or use "),n("code",null,"slot"),o(" to render the icon")],-1),vt=n("p",null,"You can use badge with avatar as status.",-1),_t=n("p",null,"You can incorporate badges with dynamic content to make things such as a notification system.",-1),Bt=n("p",null,"You can do many things with visibility control, for example, show badge on hover.",-1),bt=n("p",null,"Badges help convey information to the user in a variety of ways.",-1),xt=n("p",null,[o("Use "),n("code",null,"max"),o(" prop to cap the value of the badge content")],-1),$t={__name:"badge",setup(p){return(c,f)=>{const V=ot,r=W,b=at,x=Q,I=J,z=q,w=U,y=Y,T=N,R=j;return g(),A(E,{class:"match-height"},{default:a(()=>[t(u,{cols:"12",md:"6"},{default:a(()=>[t(r,{title:"Style",code:mt},{default:a(()=>[ft,t(V)]),_:1},8,["code"])]),_:1}),t(u,{cols:"12",md:"6"},{default:a(()=>[t(r,{title:"Color",code:st},{default:a(()=>[Vt,t(b)]),_:1},8,["code"])]),_:1}),t(u,{cols:"12",md:"6"},{default:a(()=>[t(r,{title:"Position",code:it},{default:a(()=>[pt,t(x)]),_:1},8,["code"])]),_:1}),t(u,{cols:"12",md:"6"},{default:a(()=>[t(r,{title:"Icon",code:ct},{default:a(()=>[ut,t(I)]),_:1},8,["code"])]),_:1}),t(u,{cols:"12",md:"6"},{default:a(()=>[t(r,{title:"Avatar Status",code:nt},{default:a(()=>[vt,t(z)]),_:1},8,["code"])]),_:1}),t(u,{cols:"12",md:"6"},{default:a(()=>[t(r,{title:"Dynamic notifications",code:rt},{default:a(()=>[_t,t(w)]),_:1},8,["code"])]),_:1}),t(u,{cols:"12",md:"6"},{default:a(()=>[t(r,{title:"Show on hover",code:lt},{default:a(()=>[Bt,t(y)]),_:1},8,["code"])]),_:1}),t(u,{cols:"12",md:"6"},{default:a(()=>[t(r,{title:"Tabs",code:gt},{default:a(()=>[bt,t(T)]),_:1},8,["code"])]),_:1}),t(u,{cols:"12",md:"6"},{default:a(()=>[t(r,{title:"Maximum Value",code:dt},{default:a(()=>[xt,t(R)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{$t as default};
