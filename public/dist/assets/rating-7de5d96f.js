import{r as f,o as c,f as g,e as n,b as e,a2 as D,s as U,n as r,aW as u,_ as v,c as V,d as l,x as S,F as R,i as j,v as s}from"./index-7474f5b2.js";import{V as i}from"./VRating-3b462278.js";import{V as k}from"./VSlider-dd856c8e.js";import{_ as F}from"./AppCardCode-e48f1a17.js";import{V as I,a as p}from"./VRow-0990f1b0.js";import"./VSliderTrack-2f14ccff.js";import"./VInput-0a1cf06c.js";import"./form-1daec3d8.js";import"./VImg-f2e8baad.js";import"./VCard-5a5536f3.js";import"./VAvatar-60fa6094.js";import"./VCardText-5b1570fa.js";import"./VDivider-495a0759.js";const B={__name:"DemoRatingItemSlot",setup(m){const t=f(4.5);return(d,a)=>(c(),g(i,{modelValue:r(t),"onUpdate:modelValue":a[0]||(a[0]=o=>u(t)?t.value=o:null)},{item:n(o=>[e(D,U(o,{size:25,color:o.isFilled?"success":"secondary",class:"me-3",icon:o.isFilled?"tabler-mood-smile-beam":"tabler-mood-sad"}),null,16,["color","icon"])]),_:1},8,["modelValue"]))}},T={__name:"DemoRatingIncremented",setup(m){const t=f(4.5);return(d,a)=>(c(),g(i,{modelValue:r(t),"onUpdate:modelValue":a[0]||(a[0]=o=>u(t)?t.value=o:null),"half-increments":"",hover:""},null,8,["modelValue"]))}},L={};function M(m,t){return c(),g(i,{hover:""})}const N=v(L,[["render",M]]),H={};function P(m,t){return c(),g(i,{readonly:"","model-value":4})}const A=v(H,[["render",P]]),E={};function W(m,t){return c(),g(i,{clearable:""})}const q=v(E,[["render",W]]),G=l("div",{class:"text-caption"}," Custom length ",-1),J={class:"font-weight-medium mb-0"},K={__name:"DemoRatingLength",setup(m){const t=f(5),d=f(2);return(a,o)=>(c(),V(R,null,[G,e(k,{modelValue:r(t),"onUpdate:modelValue":o[0]||(o[0]=_=>u(t)?t.value=_:null),min:1,max:7},null,8,["modelValue"]),e(i,{modelValue:r(d),"onUpdate:modelValue":o[1]||(o[1]=_=>u(d)?d.value=_:null),length:r(t)},null,8,["modelValue","length"]),l("p",J," Model: "+S(r(d)),1)],64))}},O={class:"d-flex flex-column"},Q={__name:"DemoRatingSize",setup(m){const t=f(4);return(d,a)=>(c(),V("div",O,[e(i,{modelValue:r(t),"onUpdate:modelValue":a[0]||(a[0]=o=>u(t)?t.value=o:null),size:"x-small"},null,8,["modelValue"]),e(i,{modelValue:r(t),"onUpdate:modelValue":a[1]||(a[1]=o=>u(t)?t.value=o:null),size:"small"},null,8,["modelValue"]),e(i,{modelValue:r(t),"onUpdate:modelValue":a[2]||(a[2]=o=>u(t)?t.value=o:null)},null,8,["modelValue"]),e(i,{modelValue:r(t),"onUpdate:modelValue":a[3]||(a[3]=o=>u(t)?t.value=o:null),size:"large"},null,8,["modelValue"]),e(i,{modelValue:r(t),"onUpdate:modelValue":a[4]||(a[4]=o=>u(t)?t.value=o:null),size:"x-large"},null,8,["modelValue"])]))}},X={class:"d-flex flex-column"},Y={__name:"DemoRatingColors",setup(m){const t=f(4),d=["primary","secondary","success","info","warning","error"];return(a,o)=>(c(),V("div",X,[(c(),V(R,null,j(d,_=>e(i,{key:_,modelValue:r(t),"onUpdate:modelValue":o[0]||(o[0]=h=>u(t)?t.value=h:null),color:_},null,8,["modelValue","color"])),64))]))}},Z={};function ee(m,t){return c(),g(i,{density:"compact"})}const te=v(Z,[["render",ee]]),oe={};function ne(m,t){return c(),g(i)}const le=v(oe,[["render",ne]]),ae={ts:`<template>
  <VRating />
</template>
`,js:`<template>
  <VRating />
</template>
`},se={ts:`<template>
  <VRating clearable />
</template>
`,js:`<template>
  <VRating clearable />
</template>
`},ie={ts:`<script lang="ts" setup>
const rating = ref(4)
const ratingColors = ['primary', 'secondary', 'success', 'info', 'warning', 'error']
<\/script>

<template>
  <div class="d-flex flex-column">
    <VRating
      v-for="color in ratingColors"
      :key="color"
      v-model="rating"
      :color="color"
    />
  </div>
</template>
`,js:`<script setup>
const rating = ref(4)

const ratingColors = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'error',
]
<\/script>

<template>
  <div class="d-flex flex-column">
    <VRating
      v-for="color in ratingColors"
      :key="color"
      v-model="rating"
      :color="color"
    />
  </div>
</template>
`},re={ts:`<template>
  <VRating density="compact" />
</template>
`,js:`<template>
  <VRating density="compact" />
</template>
`},ce={ts:`<template>
  <VRating hover />
</template>
`,js:`<template>
  <VRating hover />
</template>
`},me={ts:`<script lang="ts" setup>
const rating = ref(4.5)
<\/script>

<template>
  <VRating
    v-model="rating"
    half-increments
    hover
  />
</template>
`,js:`<script setup>
const rating = ref(4.5)
<\/script>

<template>
  <VRating
    v-model="rating"
    half-increments
    hover
  />
</template>
`},de={ts:`<script lang="ts" setup>
const rating = ref(4.5)
<\/script>

<template>
  <VRating v-model="rating">
    <template #item="props">
      <VIcon
        v-bind="props"
        :size="25"
        :color="props.isFilled ? 'success' : 'secondary'"
        class="me-3"
        :icon="props.isFilled ? 'tabler-mood-smile-beam' : 'tabler-mood-sad'"
      />
    </template>
  </VRating>
</template>
`,js:`<script setup>
const rating = ref(4.5)
<\/script>

<template>
  <VRating v-model="rating">
    <template #item="props">
      <VIcon
        v-bind="props"
        :size="25"
        :color="props.isFilled ? 'success' : 'secondary'"
        class="me-3"
        :icon="props.isFilled ? 'tabler-mood-smile-beam' : 'tabler-mood-sad'"
      />
    </template>
  </VRating>
</template>
`},pe={ts:`<script lang="ts" setup>
const length = ref(5)
const rating = ref(2)
<\/script>

<template>
  <div class="text-caption">
    Custom length
  </div>

  <VSlider
    v-model="length"
    :min="1"
    :max="7"
  />

  <VRating
    v-model="rating"
    :length="length"
  />
  <p class="font-weight-medium mb-0">
    Model: {{ rating }}
  </p>
</template>
`,js:`<script setup>
const length = ref(5)
const rating = ref(2)
<\/script>

<template>
  <div class="text-caption">
    Custom length
  </div>

  <VSlider
    v-model="length"
    :min="1"
    :max="7"
  />

  <VRating
    v-model="rating"
    :length="length"
  />
  <p class="font-weight-medium mb-0">
    Model: {{ rating }}
  </p>
</template>
`},ue={ts:`<template>
  <VRating
    readonly
    :model-value="4"
  />
</template>
`,js:`<template>
  <VRating
    readonly
    :model-value="4"
  />
</template>
`},_e={ts:`<script lang="ts" setup>
const rating = ref(4)
<\/script>

<template>
  <div class="d-flex flex-column">
    <VRating
      v-model="rating"
      size="x-small"
    />

    <VRating
      v-model="rating"
      size="small"
    />

    <VRating v-model="rating" />

    <VRating
      v-model="rating"
      size="large"
    />

    <VRating
      v-model="rating"
      size="x-large"
    />
  </div>
</template>
`,js:`<script setup>
const rating = ref(4)
<\/script>

<template>
  <div class="d-flex flex-column">
    <VRating
      v-model="rating"
      size="x-small"
    />

    <VRating
      v-model="rating"
      size="small"
    />

    <VRating v-model="rating" />

    <VRating
      v-model="rating"
      size="large"
    />

    <VRating
      v-model="rating"
      size="x-large"
    />
  </div>
</template>
`},ge=l("p",null,[s("The "),l("code",null,"v-rating"),s(" component provides a simple interface for gathering user feedback.")],-1),fe=l("p",null,[s("Control the space occupied by "),l("code",null,"v-rating"),s(" items using the "),l("code",null,"density"),s(" prop.")],-1),ve=l("p",null,[s("The "),l("code",null,"v-rating"),s(" component can be colored as you want, you can set both selected and not selected colors.")],-1),Ve=l("p",null,[s("Utilize the same sizing classes available in "),l("code",null,"v-icon"),s(" or provide your own with the "),l("code",null,"size"),s(" prop.")],-1),he=l("p",null,[s("Change the number of items by modifying the the "),l("code",null,"length"),s(" prop.")],-1),Re=l("p",null,[s("Use "),l("code",null,"clearable"),s(" prop to allows for the component to be cleared. Triggers when the icon containing the current value is clicked.")],-1),xe=l("p",null,[s("For ratings that are not meant to be changed you can use "),l("code",null,"readonly"),s(" prop.")],-1),ye=l("p",null,"Provides visual feedback when hovering over icons",-1),be=l("p",null,[s("The "),l("code",null,"half-increments"),s(" prop increases the granularity of the ratings, allow for .5 values as well.")],-1),ze=l("p",null,"Slots enable advanced customization possibilities and provide you with more freedom in how you display the rating.",-1),Me={__name:"rating",setup(m){return(t,d)=>{const a=le,o=F,_=te,h=Y,x=Q,y=K,b=q,z=A,C=N,$=T,w=B;return c(),g(I,{class:"match-height"},{default:n(()=>[e(p,{cols:"12",md:"6"},{default:n(()=>[e(o,{title:"Basic",code:ae},{default:n(()=>[ge,e(a)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:n(()=>[e(o,{title:"Density",code:re},{default:n(()=>[fe,e(_)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:n(()=>[e(o,{title:"Colors",code:ie},{default:n(()=>[ve,e(h)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:n(()=>[e(o,{title:"Size",code:_e},{default:n(()=>[Ve,e(x)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:n(()=>[e(o,{title:"Length",code:pe},{default:n(()=>[he,e(y)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:n(()=>[e(o,{title:"Clearable",code:se},{default:n(()=>[Re,e(b)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:n(()=>[e(o,{title:"Readonly",code:ue},{default:n(()=>[xe,e(z)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:n(()=>[e(o,{title:"Hover",code:ce},{default:n(()=>[ye,e(C)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:n(()=>[e(o,{title:"Incremented",code:me},{default:n(()=>[be,e($)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:n(()=>[e(o,{title:"Item slot",code:de},{default:n(()=>[ze,e(w)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{Me as default};
