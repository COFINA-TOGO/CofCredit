import{V as x}from"./VTooltip-a60d848a.js";import{o as d,f as O,e,b as t,ak as p,b8 as c,b9 as m,s as h,v as n,d as i,r as T,a as L,n as B,bd as y,aW as k,c as f,F as C,i as D,x as P}from"./index-7474f5b2.js";import{V as r,a as S}from"./VList-11197605.js";import{V as l}from"./VMenu-d68be952.js";import{V as I,c as A}from"./VCard-5a5536f3.js";import{V as $}from"./VDivider-495a0759.js";import{V as j}from"./VCardText-5b1570fa.js";import{_ as F}from"./AppCardCode-e48f1a17.js";import{V as E,a as _}from"./VRow-0990f1b0.js";import"./VOverlay-0eaff922.js";import"./easing-9f15041e.js";import"./lazy-a3d78126.js";import"./scopeId-3b168ed5.js";import"./VImg-f2e8baad.js";import"./forwardRefs-8348545e.js";import"./ssrBoot-6b4d2448.js";import"./VAvatar-60fa6094.js";import"./dialog-transition-7fca3df4.js";const R=i("span",null,"I am a Tooltip",-1),G={__name:"DemoMenuActivatorAndTooltip",setup(V){const a=[{title:"Option 1",value:"Option 1"},{title:"Option 2",value:"Option 2"},{title:"Option 3",value:"Option 3"}];return(v,u)=>(d(),O(l,{location:"top"},{activator:e(({props:o})=>[t(x,{location:"top"},{activator:e(({props:s})=>[t(p,c(m(h(o,s))),{default:e(()=>[n(" Dropdown w/ Tooltip ")]),_:2},1040)]),default:e(()=>[R]),_:2},1024)]),default:e(()=>[t(r,{items:a})]),_:1}))}},H={__name:"DemoMenuPopover",setup(V){const a=T(!1);return(v,u)=>{const o=L("IconBtn");return d(),O(l,{modelValue:B(a),"onUpdate:modelValue":u[0]||(u[0]=s=>k(a)?a.value=s:null),location:"top"},{activator:e(({props:s})=>[t(p,c(m(s)),{default:e(()=>[n(" Menu as Popover ")]),_:2},1040)]),default:e(()=>[t(I,{"max-width":"300"},{default:e(()=>[t(r,null,{default:e(()=>[t(S,{"prepend-avatar":B(y),title:"John Leider",subtitle:"Founder of Vuetify",class:"mx-0"},null,8,["prepend-avatar"])]),_:1}),t($),t(j,null,{default:e(()=>[n(" Gingerbread bear claw cake. Soufflé candy sesame snaps chocolate ice cream cake. Dessert candy canes oat cake pudding cupcake. Bear claw sweet wafer bonbon dragée toffee. ")]),_:1}),t(A,null,{default:e(()=>[t(o,{icon:"tabler-heart"}),t(o,{icon:"tabler-bookmark"}),t(o,{icon:"tabler-thumb-down"})]),_:1})]),_:1})]),_:1},8,["modelValue"])}}},J={__name:"DemoMenuOpenOnHover",setup(V){const a=[{title:"Option 1",value:"Option 1"},{title:"Option 2",value:"Option 2"},{title:"Option 3",value:"Option 3"}];return(v,u)=>(d(),O(l,{"open-on-hover":""},{activator:e(({props:o})=>[t(p,c(m(o)),{default:e(()=>[n(" On hover ")]),_:2},1040)]),default:e(()=>[t(r,{items:a})]),_:1}))}},N={class:"demo-space-x"},X={__name:"DemoMenuLocation",setup(V){const a=[{title:"Option 1",value:"Option 1"},{title:"Option 2",value:"Option 2"},{title:"Option 3",value:"Option 3"}];return(v,u)=>(d(),f("div",N,[t(l,{location:"top"},{activator:e(({props:o})=>[t(p,c(m(o)),{default:e(()=>[n(" Top ")]),_:2},1040)]),default:e(()=>[t(r,{items:a})]),_:1}),t(l,{location:"bottom"},{activator:e(({props:o})=>[t(p,c(m(o)),{default:e(()=>[n(" Bottom ")]),_:2},1040)]),default:e(()=>[t(r,{items:a})]),_:1}),t(l,{location:"start"},{activator:e(({props:o})=>[t(p,c(m(o)),{default:e(()=>[n(" Start ")]),_:2},1040)]),default:e(()=>[t(r,{items:a})]),_:1}),t(l,{location:"end"},{activator:e(({props:o})=>[t(p,c(m(o)),{default:e(()=>[n(" End ")]),_:2},1040)]),default:e(()=>[t(r,{items:a})]),_:1})]))}},Y={class:"demo-space-x"},U={__name:"DemoMenuCustomTransitions",setup(V){const a=[{title:"Option 1",value:"Option 1"},{title:"Option 2",value:"Option 2"},{title:"Option 3",value:"Option 3"}];return(v,u)=>(d(),f("div",Y,[t(l,{transition:"scale-transition"},{activator:e(({props:o})=>[t(p,c(m(o)),{default:e(()=>[n(" Scale Transition ")]),_:2},1040)]),default:e(()=>[t(r,{items:a})]),_:1}),t(l,{transition:"slide-x-transition"},{activator:e(({props:o})=>[t(p,c(m(o)),{default:e(()=>[n(" Slide X Transition ")]),_:2},1040)]),default:e(()=>[t(r,{items:a})]),_:1}),t(l,{transition:"slide-y-transition"},{activator:e(({props:o})=>[t(p,c(m(o)),{default:e(()=>[n(" Slide Y Transition ")]),_:2},1040)]),default:e(()=>[t(r,{items:a})]),_:1})]))}},W={class:"demo-space-x"},z={__name:"DemoMenuBasic",setup(V){const a=["primary","secondary","success","info","warning","error"],v=[{title:"Option 1",value:"Option 1"},{title:"Option 2",value:"Option 2"},{title:"Option 3",value:"Option 3"}];return(u,o)=>(d(),f("div",W,[(d(),f(C,null,D(a,s=>t(l,{key:s},{activator:e(({props:b})=>[t(p,h({color:s},b),{default:e(()=>[n(P(s),1)]),_:2},1040,["color"])]),default:e(()=>[t(r,{items:v})]),_:2},1024)),64))]))}},q={ts:`<script lang="ts" setup>
import { mergeProps } from 'vue'

const items = [{ title: 'Option 1', value: 'Option 1' }, { title: 'Option 2', value: 'Option 2' }, { title: 'Option 3', value: 'Option 3' }]
<\/script>

<template>
  <VMenu location="top">
    <template #activator="{ props: menuProps }">
      <VTooltip location="top">
        <template #activator="{ props: tooltipProps }">
          <VBtn v-bind="mergeProps(menuProps, tooltipProps)">
            Dropdown w/ Tooltip
          </VBtn>
        </template>
        <span>I am a Tooltip</span>
      </VTooltip>
    </template>

    <VList :items="items" />
  </VMenu>
</template>
`,js:`<script setup>
import { mergeProps } from 'vue'

const items = [
  {
    title: 'Option 1',
    value: 'Option 1',
  },
  {
    title: 'Option 2',
    value: 'Option 2',
  },
  {
    title: 'Option 3',
    value: 'Option 3',
  },
]
<\/script>

<template>
  <VMenu location="top">
    <template #activator="{ props: menuProps }">
      <VTooltip location="top">
        <template #activator="{ props: tooltipProps }">
          <VBtn v-bind="mergeProps(menuProps, tooltipProps)">
            Dropdown w/ Tooltip
          </VBtn>
        </template>
        <span>I am a Tooltip</span>
      </VTooltip>
    </template>

    <VList :items="items" />
  </VMenu>
</template>
`},K={ts:`<script lang="ts" setup>
const menusVariant = ['primary', 'secondary', 'success', 'info', 'warning', 'error']
const items = [{ title: 'Option 1', value: 'Option 1' }, { title: 'Option 2', value: 'Option 2' }, { title: 'Option 3', value: 'Option 3' }]
<\/script>

<template>
  <div class="demo-space-x">
    <VMenu
      v-for="menu in menusVariant"
      :key="menu"
    >
      <template #activator="{ props }">
        <VBtn
          :color="menu"
          v-bind="props"
        >
          {{ menu }}
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>
  </div>
</template>
`,js:`<script setup>
const menusVariant = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'error',
]

const items = [
  {
    title: 'Option 1',
    value: 'Option 1',
  },
  {
    title: 'Option 2',
    value: 'Option 2',
  },
  {
    title: 'Option 3',
    value: 'Option 3',
  },
]
<\/script>

<template>
  <div class="demo-space-x">
    <VMenu
      v-for="menu in menusVariant"
      :key="menu"
    >
      <template #activator="{ props }">
        <VBtn
          :color="menu"
          v-bind="props"
        >
          {{ menu }}
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>
  </div>
</template>
`},Q={ts:`<script lang="ts" setup>
const items = [{ title: 'Option 1', value: 'Option 1' }, { title: 'Option 2', value: 'Option 2' }, { title: 'Option 3', value: 'Option 3' }]
<\/script>

<template>
  <div class="demo-space-x">
    <VMenu transition="scale-transition">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Scale Transition
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu transition="slide-x-transition">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Slide X Transition
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu transition="slide-y-transition">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Slide Y Transition
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>
  </div>
</template>
`,js:`<script setup>
const items = [
  {
    title: 'Option 1',
    value: 'Option 1',
  },
  {
    title: 'Option 2',
    value: 'Option 2',
  },
  {
    title: 'Option 3',
    value: 'Option 3',
  },
]
<\/script>

<template>
  <div class="demo-space-x">
    <VMenu transition="scale-transition">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Scale Transition
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu transition="slide-x-transition">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Slide X Transition
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu transition="slide-y-transition">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Slide Y Transition
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>
  </div>
</template>
`},Z={ts:`<script lang="ts" setup>
const items = [{ title: 'Option 1', value: 'Option 1' }, { title: 'Option 2', value: 'Option 2' }, { title: 'Option 3', value: 'Option 3' }]
<\/script>

<template>
  <div class="demo-space-x">
    <VMenu location="top">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Top
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu location="bottom">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Bottom
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu location="start">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Start
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu location="end">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          End
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>
  </div>
</template>
`,js:`<script setup>
const items = [
  {
    title: 'Option 1',
    value: 'Option 1',
  },
  {
    title: 'Option 2',
    value: 'Option 2',
  },
  {
    title: 'Option 3',
    value: 'Option 3',
  },
]
<\/script>

<template>
  <div class="demo-space-x">
    <VMenu location="top">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Top
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu location="bottom">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Bottom
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu location="start">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Start
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu location="end">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          End
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>
  </div>
</template>
`},tt={ts:`<script lang="ts" setup>
const items = [{ title: 'Option 1', value: 'Option 1' }, { title: 'Option 2', value: 'Option 2' }, { title: 'Option 3', value: 'Option 3' }]
<\/script>

<template>
  <VMenu open-on-hover>
    <template #activator="{ props }">
      <VBtn v-bind="props">
        On hover
      </VBtn>
    </template>

    <VList :items="items" />
  </VMenu>
</template>
`,js:`<script setup>
const items = [
  {
    title: 'Option 1',
    value: 'Option 1',
  },
  {
    title: 'Option 2',
    value: 'Option 2',
  },
  {
    title: 'Option 3',
    value: 'Option 3',
  },
]
<\/script>

<template>
  <VMenu open-on-hover>
    <template #activator="{ props }">
      <VBtn v-bind="props">
        On hover
      </VBtn>
    </template>

    <VList :items="items" />
  </VMenu>
</template>
`},et={ts:`<script lang="ts" setup>
import avatar1 from '@images/avatars/avatar-1.png'

const menu = ref(false)
<\/script>

<template>
  <VMenu
    v-model="menu"
    location="top"
  >
    <template #activator="{ props }">
      <VBtn v-bind="props">
        Menu as Popover
      </VBtn>
    </template>

    <VCard max-width="300">
      <VList>
        <VListItem
          :prepend-avatar="avatar1"
          title="John Leider"
          subtitle="Founder of Vuetify"
          class="mx-0"
        />
      </VList>

      <VDivider />

      <VCardText>
        Gingerbread bear claw cake. Soufflé candy sesame snaps chocolate ice cream cake.
        Dessert candy canes oat cake pudding cupcake. Bear claw sweet wafer bonbon dragée toffee.
      </VCardText>

      <VCardActions>
        <IconBtn icon="tabler-heart" />
        <IconBtn icon="tabler-bookmark" />
        <IconBtn icon="tabler-thumb-down" />
      </VCardActions>
    </VCard>
  </VMenu>
</template>
`,js:`<script setup>
import avatar1 from '@images/avatars/avatar-1.png'

const menu = ref(false)
<\/script>

<template>
  <VMenu
    v-model="menu"
    location="top"
  >
    <template #activator="{ props }">
      <VBtn v-bind="props">
        Menu as Popover
      </VBtn>
    </template>

    <VCard max-width="300">
      <VList>
        <VListItem
          :prepend-avatar="avatar1"
          title="John Leider"
          subtitle="Founder of Vuetify"
          class="mx-0"
        />
      </VList>

      <VDivider />

      <VCardText>
        Gingerbread bear claw cake. Soufflé candy sesame snaps chocolate ice cream cake.
        Dessert candy canes oat cake pudding cupcake. Bear claw sweet wafer bonbon dragée toffee.
      </VCardText>

      <VCardActions>
        <IconBtn icon="tabler-heart" />
        <IconBtn icon="tabler-bookmark" />
        <IconBtn icon="tabler-thumb-down" />
      </VCardActions>
    </VCard>
  </VMenu>
</template>
`},ot=i("p",null," Remember to put the element that activates the menu in the activator slot. ",-1),nt=i("p",null,[n("Vuetify comes with 3 standard transitions, "),i("code",null,"scale"),n(", "),i("code",null,"slide-x"),n(" and "),i("code",null,"slide-y"),n(". Use "),i("code",null,"transition"),n(" prop to add transition to a menu.")],-1),at=i("p",null,[n("Menu can be offset relative to the activator by using the "),i("code",null,"location"),n(" prop.")],-1),it=i("p",null,[n("Menus can be accessed using hover instead of clicking with the "),i("code",null,"open-on-hover"),n(" prop.")],-1),st=i("p",null,"A menu can be configured to be static when opened, allowing it to function as a popover. This can be useful when there are multiple interactive items within the menu contents.",-1),pt=i("p",null,[n("With the new "),i("code",null,"v-slot"),n(" syntax, nested activators such as those seen with a "),i("code",null,"v-menu"),n(" and "),i("code",null,"v-tooltip"),n(" attached to the same activator button, need a particular setup in order to function correctly")],-1),Tt={__name:"menu",setup(V){return(a,v)=>{const u=z,o=F,s=U,b=X,M=J,w=H,g=G;return d(),O(E,{class:"match-height"},{default:e(()=>[t(_,{cols:"12",md:"6"},{default:e(()=>[t(o,{title:"Basic",code:K},{default:e(()=>[ot,t(u)]),_:1},8,["code"])]),_:1}),t(_,{cols:"12",md:"6"},{default:e(()=>[t(o,{title:"Custom transitions",code:Q},{default:e(()=>[nt,t(s)]),_:1},8,["code"])]),_:1}),t(_,{cols:"12",md:"6"},{default:e(()=>[t(o,{title:"Location",code:Z},{default:e(()=>[at,t(b)]),_:1},8,["code"])]),_:1}),t(_,{cols:"12",md:"6"},{default:e(()=>[t(o,{title:"Open on hover",code:tt},{default:e(()=>[it,t(M)]),_:1},8,["code"])]),_:1}),t(_,{cols:"12",md:"6"},{default:e(()=>[t(o,{title:"Popover",code:et},{default:e(()=>[st,t(w)]),_:1},8,["code"])]),_:1}),t(_,{cols:"12",md:"6"},{default:e(()=>[t(o,{title:"Activator and tooltip",code:q},{default:e(()=>[pt,t(g)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{Tt as default};
