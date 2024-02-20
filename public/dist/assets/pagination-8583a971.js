import{V as c}from"./VPagination-57cd9c8a.js";import{r as d,o as g,c as v,b as t,n as p,aW as m,f as P,_ as y,e as i,d as l,v as o}from"./index-7474f5b2.js";import{_ as C}from"./AppCardCode-e48f1a17.js";import{V as z,a as f}from"./VRow-0990f1b0.js";import"./VCard-5a5536f3.js";import"./VAvatar-60fa6094.js";import"./VImg-f2e8baad.js";import"./VCardText-5b1570fa.js";import"./VDivider-495a0759.js";const S={class:"d-flex flex-column gap-6 px-4"},j={__name:"DemoPaginationSize",setup(_){const e=d(1),s=d(2),n=d(3);return(a,r)=>(g(),v("div",S,[t(c,{modelValue:p(e),"onUpdate:modelValue":r[0]||(r[0]=u=>m(e)?e.value=u:null),length:7,size:"small"},null,8,["modelValue"]),t(c,{modelValue:p(s),"onUpdate:modelValue":r[1]||(r[1]=u=>m(s)?s.value=u:null),length:7},null,8,["modelValue"]),t(c,{modelValue:p(n),"onUpdate:modelValue":r[2]||(r[2]=u=>m(n)?n.value=u:null),length:7,"total-visible":a.$vuetify.display.xs?1:7,size:"large"},null,8,["modelValue","total-visible"])]))}},w={class:"d-flex flex-column gap-6"},I={__name:"DemoPaginationColor",setup(_){const e=d(1),s=d(2),n=d(3);return(a,r)=>(g(),v("div",w,[t(c,{modelValue:p(e),"onUpdate:modelValue":r[0]||(r[0]=u=>m(e)?e.value=u:null),length:7,"active-color":"success"},null,8,["modelValue"]),t(c,{modelValue:p(s),"onUpdate:modelValue":r[1]||(r[1]=u=>m(s)?s.value=u:null),length:7,"active-color":"error"},null,8,["modelValue"]),t(c,{modelValue:p(n),"onUpdate:modelValue":r[2]||(r[2]=u=>m(n)?n.value=u:null),length:7,"active-color":"info"},null,8,["modelValue"])]))}},T={__name:"DemoPaginationTotalVisible",setup(_){const e=d(1);return(s,n)=>(g(),P(c,{modelValue:p(e),"onUpdate:modelValue":n[0]||(n[0]=a=>m(e)?e.value=a:null),length:15,"total-visible":s.$vuetify.display.mdAndUp?7:3},null,8,["modelValue","total-visible"]))}},B={__name:"DemoPaginationLength",setup(_){const e=d(1);return(s,n)=>(g(),P(c,{modelValue:p(e),"onUpdate:modelValue":n[0]||(n[0]=a=>m(e)?e.value=a:null),length:15},null,8,["modelValue"]))}},E={__name:"DemoPaginationIcons",setup(_){const e=d(1);return(s,n)=>(g(),P(c,{modelValue:p(e),"onUpdate:modelValue":n[0]||(n[0]=a=>m(e)?e.value=a:null),length:5,"prev-icon":"tabler-caret-left","next-icon":"tabler-caret-right"},null,8,["modelValue"]))}},O={};function A(_,e){return g(),P(c,{length:5,disabled:""})}const k=y(O,[["render",A]]),L={__name:"DemoPaginationOutlineCircle",setup(_){const e=d(1);return(s,n)=>(g(),P(c,{modelValue:p(e),"onUpdate:modelValue":n[0]||(n[0]=a=>m(e)?e.value=a:null),variant:"outlined",length:5,rounded:"circle"},null,8,["modelValue"]))}},N={__name:"DemoPaginationCircle",setup(_){const e=d(1);return(s,n)=>(g(),P(c,{modelValue:p(e),"onUpdate:modelValue":n[0]||(n[0]=a=>m(e)?e.value=a:null),length:5,rounded:"circle"},null,8,["modelValue"]))}},R={__name:"DemoPaginationOutline",setup(_){const e=d(1);return(s,n)=>(g(),P(c,{modelValue:p(e),"onUpdate:modelValue":n[0]||(n[0]=a=>m(e)?e.value=a:null),variant:"outlined",length:5},null,8,["modelValue"]))}},W={__name:"DemoPaginationBasic",setup(_){const e=d(1);return(s,n)=>(g(),P(c,{modelValue:p(e),"onUpdate:modelValue":n[0]||(n[0]=a=>m(e)?e.value=a:null),length:5},null,8,["modelValue"]))}},Y={ts:`<script lang="ts" setup>
const currentPage = ref(1)
<\/script>

<template>
  <VPagination
    v-model="currentPage"
    :length="5"
  />
</template>
`,js:`<script setup>
const currentPage = ref(1)
<\/script>

<template>
  <VPagination
    v-model="currentPage"
    :length="5"
  />
</template>
`},q={ts:`<script lang="ts" setup>
const currentPage = ref(1)
<\/script>

<template>
  <VPagination
    v-model="currentPage"
    :length="5"
    rounded="circle"
  />
</template>
`,js:`<script setup>
const currentPage = ref(1)
<\/script>

<template>
  <VPagination
    v-model="currentPage"
    :length="5"
    rounded="circle"
  />
</template>
`},F={ts:`<script setup lang="ts">
const pageSuccess = ref(1)
const pageError = ref(2)
const pageInfo = ref(3)
<\/script>

<template>
  <div class="d-flex flex-column gap-6">
    <VPagination
      v-model="pageSuccess"
      :length="7"
      active-color="success"
    />
    <VPagination
      v-model="pageError"
      :length="7"
      active-color="error"
    />
    <VPagination
      v-model="pageInfo"
      :length="7"
      active-color="info"
    />
  </div>
</template>
`,js:`<script setup>
const pageSuccess = ref(1)
const pageError = ref(2)
const pageInfo = ref(3)
<\/script>

<template>
  <div class="d-flex flex-column gap-6">
    <VPagination
      v-model="pageSuccess"
      :length="7"
      active-color="success"
    />
    <VPagination
      v-model="pageError"
      :length="7"
      active-color="error"
    />
    <VPagination
      v-model="pageInfo"
      :length="7"
      active-color="info"
    />
  </div>
</template>
`},G={ts:`<template>
  <VPagination
    :length="5"
    disabled
  />
</template>
`,js:`<template>
  <VPagination
    :length="5"
    disabled
  />
</template>
`},H={ts:`<script lang="ts" setup>
const currentPage = ref(1)
<\/script>

<template>
  <VPagination
    v-model="currentPage"
    :length="5"
    prev-icon="tabler-caret-left"
    next-icon="tabler-caret-right"
  />
</template>
`,js:`<script setup>
const currentPage = ref(1)
<\/script>

<template>
  <VPagination
    v-model="currentPage"
    :length="5"
    prev-icon="tabler-caret-left"
    next-icon="tabler-caret-right"
  />
</template>
`},J={ts:`<script lang="ts" setup>
const currentPage = ref(1)
<\/script>

<template>
  <VPagination
    v-model="currentPage"
    :length="15"
  />
</template>
`,js:`<script setup>
const currentPage = ref(1)
<\/script>

<template>
  <VPagination
    v-model="currentPage"
    :length="15"
  />
</template>
`},K={ts:`<script setup lang="ts">
const currentPage = ref(1)
<\/script>

<template>
  <VPagination
    v-model="currentPage"
    variant="outlined"
    :length="5"
  />
</template>
`,js:`<script setup>
const currentPage = ref(1)
<\/script>

<template>
  <VPagination
    v-model="currentPage"
    variant="outlined"
    :length="5"
  />
</template>
`},M={ts:`<script setup lang="ts">
const currentPage = ref(1)
<\/script>

<template>
  <VPagination
    v-model="currentPage"
    variant="outlined"
    :length="5"
    rounded="circle"
  />
</template>
`,js:`<script setup>
const currentPage = ref(1)
<\/script>

<template>
  <VPagination
    v-model="currentPage"
    variant="outlined"
    :length="5"
    rounded="circle"
  />
</template>
`},Q={ts:`<script setup lang="ts">
const xSmallPagination = ref(1)
const smallPagination = ref(2)
const largePagination = ref(3)
<\/script>

<template>
  <div class="d-flex flex-column gap-6 px-4">
    <VPagination
      v-model="xSmallPagination"
      :length="7"
      size="small"
    />
    <VPagination
      v-model="smallPagination"
      :length="7"
    />
    <VPagination
      v-model="largePagination"
      :length="7"
      :total-visible="$vuetify.display.xs ? 1 : 7"
      size="large"
    />
  </div>
</template>
`,js:`<script setup>
const xSmallPagination = ref(1)
const smallPagination = ref(2)
const largePagination = ref(3)
<\/script>

<template>
  <div class="d-flex flex-column gap-6 px-4">
    <VPagination
      v-model="xSmallPagination"
      :length="7"
      size="small"
    />
    <VPagination
      v-model="smallPagination"
      :length="7"
    />
    <VPagination
      v-model="largePagination"
      :length="7"
      :total-visible="$vuetify.display.xs ? 1 : 7"
      size="large"
    />
  </div>
</template>
`},X={ts:`<script lang="ts" setup>
const currentPage = ref(1)
<\/script>

<template>
  <VPagination
    v-model="currentPage"
    :length="15"
    :total-visible="$vuetify.display.mdAndUp ? 7 : 3"
  />
</template>
`,js:`<script setup>
const currentPage = ref(1)
<\/script>

<template>
  <VPagination
    v-model="currentPage"
    :length="15"
    :total-visible="$vuetify.display.mdAndUp ? 7 : 3"
  />
</template>
`},Z=l("p",null,[o("The "),l("code",null,"v-pagination"),o(" component is used to separate long sets of data.")],-1),ee=l("p",null,[o("The "),l("code",null,"variant='outline'"),o(" prop is used to give outline to pagination item.")],-1),te=l("p",null,[o("The "),l("code",null,"rounded"),o(" prop allows you to render pagination buttons with alternative styles.")],-1),ne=l("p",null,[o("The "),l("code",null,"variant='outline'"),o(" and "),l("code",null,"rounded"),o(" prop is used to give rounded outline to pagination item.")],-1),le=l("p",null,[o("Pagination items can be manually deactivated using the "),l("code",null,"disabled"),o(" prop.")],-1),oe=l("p",null,[o("Previous and next page icons can be customized with the "),l("code",null,"prev-icon"),o(" and "),l("code",null,"next-icon"),o(" props.")],-1),ae=l("p",null,[o("Using the "),l("code",null,"length"),o(" prop you can set the length of "),l("code",null,"v-pagination"),o(", if the number of page buttons exceeds the parent container, it will truncate the list.")],-1),ie=l("p",null,[o("You can also manually set the maximum number of visible page buttons with the "),l("code",null,"total-visible"),o(" prop.")],-1),se=l("p",null,[o("Use "),l("code",null,"active-color"),o(" prop for create different color pagination.")],-1),re=l("p",null,[o("Use "),l("code",null,"size"),o(" prop to sets the height and width of the component. Default unit is px. Can also use the following predefined sizes: "),l("strong",null,"x-small"),o(", "),l("strong",null,"small"),o(", "),l("strong",null,"default"),o(", "),l("strong",null,"large"),o(", and "),l("strong",null,"x-large"),o(".")],-1),ve={__name:"pagination",setup(_){return(e,s)=>{const n=W,a=C,r=R,u=N,V=L,h=k,x=E,b=B,D=T,U=I,$=j;return g(),P(z,{class:"match-height"},{default:i(()=>[t(f,{cols:"12",md:"6"},{default:i(()=>[t(a,{title:"Basic",code:Y},{default:i(()=>[Z,t(n)]),_:1},8,["code"])]),_:1}),t(f,{cols:"12",md:"6"},{default:i(()=>[t(a,{title:"Outline",code:K},{default:i(()=>[ee,t(r)]),_:1},8,["code"])]),_:1}),t(f,{cols:"12",md:"6"},{default:i(()=>[t(a,{title:"Circle",code:q},{default:i(()=>[te,t(u)]),_:1},8,["code"])]),_:1}),t(f,{cols:"12",md:"6"},{default:i(()=>[t(a,{title:"Outline Circle",code:M},{default:i(()=>[ne,t(V)]),_:1},8,["code"])]),_:1}),t(f,{cols:"12",md:"6"},{default:i(()=>[t(a,{title:"Disabled",code:G},{default:i(()=>[le,t(h)]),_:1},8,["code"])]),_:1}),t(f,{cols:"12",md:"6"},{default:i(()=>[t(a,{title:"Icons",code:H},{default:i(()=>[oe,t(x)]),_:1},8,["code"])]),_:1}),t(f,{cols:"12",md:"6"},{default:i(()=>[t(a,{title:"Length",code:J},{default:i(()=>[ae,t(b)]),_:1},8,["code"])]),_:1}),t(f,{cols:"12",md:"6"},{default:i(()=>[t(a,{title:"Total visible",code:X},{default:i(()=>[ie,t(D)]),_:1},8,["code"])]),_:1}),t(f,{cols:"12",md:"6"},{default:i(()=>[t(a,{title:"Color",code:F},{default:i(()=>[se,t(U)]),_:1},8,["code"])]),_:1}),t(f,{cols:"12",md:"6"},{default:i(()=>[t(a,{title:"Size",code:Q},{default:i(()=>[re,t($)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{ve as default};
