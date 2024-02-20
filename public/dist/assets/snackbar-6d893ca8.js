import{a3 as F,at as R,au as A,av as j,bX as H,ax as L,aH as M,ay as q,aI as z,aE as N,aF as W,az as J,b_ as G,aG as X,r as m,w as O,H as h,ab as K,b as a,c2 as Q,bP as Y,s as D,o as _,c as x,e,v as t,ak as u,n as S,aW as p,a2 as B,F as T,f as Z,d as V}from"./index-7474f5b2.js";import{m as aa,a as U}from"./VOverlay-0eaff922.js";import{f as ea}from"./forwardRefs-8348545e.js";import{u as ta}from"./scopeId-3b168ed5.js";import{_ as na}from"./AppCardCode-e48f1a17.js";import{V as la,a as g}from"./VRow-0990f1b0.js";import"./easing-9f15041e.js";import"./lazy-a3d78126.js";import"./VImg-f2e8baad.js";import"./VCard-5a5536f3.js";import"./VAvatar-60fa6094.js";import"./VCardText-5b1570fa.js";import"./VDivider-495a0759.js";const ia=F({multiLine:Boolean,timeout:{type:[Number,String],default:5e3},vertical:Boolean,...R({location:"bottom"}),...A(),...j(),...H(),...L(),...M(aa({transition:"v-snackbar-transition"}),["persistent","noClickAnimation","scrim","scrollStrategy"])},"VSnackbar"),f=q()({name:"VSnackbar",props:ia(),emits:{"update:modelValue":k=>!0},setup(k,l){let{slots:c}=l;const n=z(k,"modelValue"),{locationStyles:i}=N(k),{positionClasses:b}=W(k),{scopeId:v}=ta(),{themeClasses:s}=J(k),{colorClasses:d,colorStyles:I,variantClasses:w}=G(k),{roundedClasses:o}=X(k),r=m();O(n,C),O(()=>k.timeout,C),h(()=>{n.value&&C()});let $=-1;function C(){window.clearTimeout($);const y=Number(k.timeout);!n.value||y===-1||($=window.setTimeout(()=>{n.value=!1},y))}function P(){window.clearTimeout($)}return K(()=>{const[y]=U.filterProps(k);return a(U,D({ref:r,class:["v-snackbar",{"v-snackbar--active":n.value,"v-snackbar--multi-line":k.multiLine&&!k.vertical,"v-snackbar--vertical":k.vertical},b.value,k.class],style:k.style},y,{modelValue:n.value,"onUpdate:modelValue":E=>n.value=E,contentProps:D({class:["v-snackbar__wrapper",s.value,d.value,o.value,w.value],style:[i.value,I.value],onPointerenter:P,onPointerleave:C},y.contentProps),persistent:!0,noClickAnimation:!0,scrim:!1,scrollStrategy:"none",_disableGlobalStack:!0},v),{default:()=>[Q(!1,"v-snackbar"),c.default&&a("div",{class:"v-snackbar__content",role:"status","aria-live":"polite"},[c.default()]),c.actions&&a(Y,{defaults:{VBtn:{variant:"text",ripple:!1}}},{default:()=>[a("div",{class:"v-snackbar__actions"},[c.actions()])]})],activator:c.activator})}),ea({},r)}}),oa={class:"demo-space-x"},sa={__name:"DemoSnackbarTransition",setup(k){const l=m(!1),c=m(!1),n=m(!1);return(i,b)=>(_(),x("div",oa,[a(u,{onClick:b[0]||(b[0]=v=>l.value=!0)},{default:e(()=>[t(" fade snackbar ")]),_:1}),a(f,{modelValue:S(l),"onUpdate:modelValue":b[1]||(b[1]=v=>p(l)?l.value=v:null),transition:"fade-transition",location:"top start"},{default:e(()=>[t(" I'm a fade transition snackbar. ")]),_:1},8,["modelValue"]),a(u,{onClick:b[2]||(b[2]=v=>c.value=!0)},{default:e(()=>[t(" Scale snackbar ")]),_:1}),a(f,{modelValue:S(c),"onUpdate:modelValue":b[3]||(b[3]=v=>p(c)?c.value=v:null),transition:"scale-transition",location:"bottom end"},{default:e(()=>[t(" I'm a scale transition snackbar. ")]),_:1},8,["modelValue"]),a(u,{onClick:b[4]||(b[4]=v=>n.value=!0)},{default:e(()=>[t(" scroll y reverse ")]),_:1}),a(f,{modelValue:S(n),"onUpdate:modelValue":b[5]||(b[5]=v=>p(n)?n.value=v:null),transition:"scroll-y-reverse-transition",location:"top end"},{default:e(()=>[t(" I'm a scroll y reverse transition snackbar. ")]),_:1},8,["modelValue"])]))}},ra={class:"demo-space-x"},ca={__name:"DemoSnackbarVariants",setup(k){const l=m(!1),c=m(!1),n=m(!1),i=m(!1),b=m(!1);return(v,s)=>(_(),x("div",ra,[a(u,{onClick:s[0]||(s[0]=d=>l.value=!0)},{default:e(()=>[t(" Default ")]),_:1}),a(f,{modelValue:S(l),"onUpdate:modelValue":s[1]||(s[1]=d=>p(l)?l.value=d:null),location:"top start"},{default:e(()=>[t(" Jelly chocolate bar candy canes apple pie. ")]),_:1},8,["modelValue"]),a(u,{onClick:s[2]||(s[2]=d=>c.value=!0)},{default:e(()=>[t(" tonal ")]),_:1}),a(f,{modelValue:S(c),"onUpdate:modelValue":s[3]||(s[3]=d=>p(c)?c.value=d:null),location:"top end",variant:"tonal"},{default:e(()=>[t(" Ice cream cake candy canes. ")]),_:1},8,["modelValue"]),a(u,{onClick:s[4]||(s[4]=d=>n.value=!0)},{default:e(()=>[t(" Text ")]),_:1}),a(f,{modelValue:S(n),"onUpdate:modelValue":s[5]||(s[5]=d=>p(n)?n.value=d:null),location:"end center",variant:"text"},{default:e(()=>[t(" Pie icing biscuit soufflé liquorice topping. ")]),_:1},8,["modelValue"]),a(u,{onClick:s[6]||(s[6]=d=>i.value=!0)},{default:e(()=>[t(" Outlined ")]),_:1}),a(f,{modelValue:S(i),"onUpdate:modelValue":s[7]||(s[7]=d=>p(i)?i.value=d:null),location:"bottom end",variant:"outlined",color:"error"},{default:e(()=>[t(" Oat cake caramels sesame snaps candy. ")]),_:1},8,["modelValue"]),a(u,{onClick:s[8]||(s[8]=d=>b.value=!0)},{default:e(()=>[t(" Flat ")]),_:1}),a(f,{modelValue:S(b),"onUpdate:modelValue":s[9]||(s[9]=d=>p(b)?b.value=d:null),location:"bottom start",variant:"flat",color:"error"},{default:e(()=>[t(" Oat cake caramels sesame snaps candy. ")]),_:1},8,["modelValue"])]))}},ba={class:"demo-space-x"},ua={__name:"DemoSnackbarPosition",setup(k){const l=m(!1),c=m(!1),n=m(!1),i=m(!1),b=m(!1),v=m(!1),s=m(!1),d=m(!1),I=m(!1);return(w,o)=>(_(),x("div",ba,[a(u,{icon:"",variant:"text",onClick:o[0]||(o[0]=r=>c.value=!0)},{default:e(()=>[a(B,{icon:"tabler-arrow-up"})]),_:1}),a(f,{modelValue:S(c),"onUpdate:modelValue":o[1]||(o[1]=r=>p(c)?c.value=r:null),location:"top"},{default:e(()=>[t(" I'm a top snackbar. ")]),_:1},8,["modelValue"]),a(u,{icon:"",variant:"text",onClick:o[2]||(o[2]=r=>n.value=!0)},{default:e(()=>[a(B,{icon:"tabler-arrow-up-right"})]),_:1}),a(f,{modelValue:S(n),"onUpdate:modelValue":o[3]||(o[3]=r=>p(n)?n.value=r:null),location:"top end"},{default:e(()=>[t(" I'm a top right snackbar. ")]),_:1},8,["modelValue"]),a(u,{icon:"",variant:"text",onClick:o[4]||(o[4]=r=>s.value=!0)},{default:e(()=>[a(B,{icon:"tabler-arrow-right"})]),_:1}),a(f,{modelValue:S(s),"onUpdate:modelValue":o[5]||(o[5]=r=>p(s)?s.value=r:null),location:"end center"},{default:e(()=>[t(" I'm a center end snackbar. ")]),_:1},8,["modelValue"]),a(u,{icon:"",variant:"text",onClick:o[6]||(o[6]=r=>i.value=!0)},{default:e(()=>[a(B,{icon:"tabler-arrow-down-right"})]),_:1}),a(f,{modelValue:S(i),"onUpdate:modelValue":o[7]||(o[7]=r=>p(i)?i.value=r:null),location:"bottom end"},{default:e(()=>[t(" I'm a bottom end snackbar. ")]),_:1},8,["modelValue"]),a(u,{icon:"",variant:"text",onClick:o[8]||(o[8]=r=>b.value=!0)},{default:e(()=>[a(B,{icon:"tabler-arrow-down"})]),_:1}),a(f,{modelValue:S(b),"onUpdate:modelValue":o[9]||(o[9]=r=>p(b)?b.value=r:null)},{default:e(()=>[t(" I'm a bottom snackbar. ")]),_:1},8,["modelValue"]),a(u,{icon:"",variant:"text",onClick:o[10]||(o[10]=r=>v.value=!0)},{default:e(()=>[a(B,{icon:"tabler-arrow-down-left"})]),_:1}),a(f,{modelValue:S(v),"onUpdate:modelValue":o[11]||(o[11]=r=>p(v)?v.value=r:null),location:"bottom start"},{default:e(()=>[t(" I'm a bottom start snackbar. ")]),_:1},8,["modelValue"]),a(u,{icon:"",variant:"text",onClick:o[12]||(o[12]=r=>d.value=!0)},{default:e(()=>[a(B,{icon:"tabler-arrow-left"})]),_:1}),a(f,{modelValue:S(d),"onUpdate:modelValue":o[13]||(o[13]=r=>p(d)?d.value=r:null),location:"start center"},{default:e(()=>[t(" I'm a center start snackbar. ")]),_:1},8,["modelValue"]),a(u,{icon:"",variant:"text",onClick:o[14]||(o[14]=r=>l.value=!0)},{default:e(()=>[a(B,{icon:"tabler-arrow-up-left"})]),_:1}),a(f,{modelValue:S(l),"onUpdate:modelValue":o[15]||(o[15]=r=>p(l)?l.value=r:null),location:"top start"},{default:e(()=>[t(" I'm a top start snackbar. ")]),_:1},8,["modelValue"]),a(u,{icon:"",variant:"text",onClick:o[16]||(o[16]=r=>I.value=!0)},{default:e(()=>[a(B,{icon:"tabler-arrows-minimize"})]),_:1}),a(f,{modelValue:S(I),"onUpdate:modelValue":o[17]||(o[17]=r=>p(I)?I.value=r:null),location:"center"},{default:e(()=>[t(" I'm a center snackbar. ")]),_:1},8,["modelValue"])]))}},ka={__name:"DemoSnackbarVertical",setup(k){const l=m(!1);return(c,n)=>(_(),x(T,null,[a(u,{onClick:n[0]||(n[0]=i=>l.value=!0)},{default:e(()=>[t(" Open Snackbar ")]),_:1}),a(f,{modelValue:S(l),"onUpdate:modelValue":n[3]||(n[3]=i=>p(l)?l.value=i:null),vertical:""},{actions:e(()=>[a(u,{color:"success",onClick:n[1]||(n[1]=i=>l.value=!1)},{default:e(()=>[t(" Undo ")]),_:1}),a(u,{color:"error",onClick:n[2]||(n[2]=i=>l.value=!1)},{default:e(()=>[t(" Close ")]),_:1})]),default:e(()=>[t(" Sugar plum chocolate bar halvah sesame snaps apple pie donut croissant marshmallow. Sweet roll donut gummies sesame snaps icing bear claw tiramisu cotton candy. ")]),_:1},8,["modelValue"])],64))}},Va={__name:"DemoSnackbarTimeout",setup(k){const l=m(!1);return(c,n)=>(_(),x(T,null,[a(u,{onClick:n[0]||(n[0]=i=>l.value=!0)},{default:e(()=>[t(" Open Snackbar ")]),_:1}),a(f,{modelValue:S(l),"onUpdate:modelValue":n[1]||(n[1]=i=>p(l)?l.value=i:null),timeout:2e3},{default:e(()=>[t(" My timeout is set to 2000. ")]),_:1},8,["modelValue"])],64))}},da={__name:"DemoSnackbarMultiLine",setup(k){const l=m(!1);return(c,n)=>(_(),x(T,null,[a(u,{onClick:n[0]||(n[0]=i=>l.value=!0)},{default:e(()=>[t(" Open Snackbar ")]),_:1}),a(f,{modelValue:S(l),"onUpdate:modelValue":n[2]||(n[2]=i=>p(l)?l.value=i:null),"multi-line":""},{actions:e(()=>[a(u,{color:"error",onClick:n[1]||(n[1]=i=>l.value=!1)},{default:e(()=>[t(" Close ")]),_:1})]),default:e(()=>[t(" I am a multi-line snackbar. I can have more than one line. This is another line that is quite long. ")]),_:1},8,["modelValue"])],64))}},ma={__name:"DemoSnackbarWithAction",setup(k){const l=m(!1);return(c,n)=>(_(),x(T,null,[a(u,{onClick:n[0]||(n[0]=i=>l.value=!0)},{default:e(()=>[t(" Open Snackbar ")]),_:1}),a(f,{modelValue:S(l),"onUpdate:modelValue":n[2]||(n[2]=i=>p(l)?l.value=i:null)},{actions:e(()=>[a(u,{color:"error",onClick:n[1]||(n[1]=i=>l.value=!1)},{default:e(()=>[t(" Close ")]),_:1})]),default:e(()=>[t(" Hello, I'm a snackbar with actions. ")]),_:1},8,["modelValue"])],64))}},Sa={__name:"DemoSnackbarBasic",setup(k){const l=m(!1);return(c,n)=>(_(),x(T,null,[a(u,{onClick:n[0]||(n[0]=i=>l.value=!0)},{default:e(()=>[t(" Open Snackbar ")]),_:1}),a(f,{modelValue:S(l),"onUpdate:modelValue":n[1]||(n[1]=i=>p(l)?l.value=i:null)},{default:e(()=>[t(" Hello, I'm a snackbar ")]),_:1},8,["modelValue"])],64))}},pa={ts:`<script lang="ts" setup>
const isSnackbarVisible = ref(false)
<\/script>

<template>
  <VBtn @click="isSnackbarVisible = true">
    Open Snackbar
  </VBtn>

  <!-- SnackBar -->
  <VSnackbar v-model="isSnackbarVisible">
    Hello, I'm a snackbar
  </VSnackbar>
</template>
`,js:`<script setup>
const isSnackbarVisible = ref(false)
<\/script>

<template>
  <VBtn @click="isSnackbarVisible = true">
    Open Snackbar
  </VBtn>

  <!-- SnackBar -->
  <VSnackbar v-model="isSnackbarVisible">
    Hello, I'm a snackbar
  </VSnackbar>
</template>
`},fa={ts:`<script lang="ts" setup>
const isSnackbarVisible = ref(false)
<\/script>

<template>
  <VBtn @click="isSnackbarVisible = true">
    Open Snackbar
  </VBtn>

  <!-- Snackbar -->
  <VSnackbar
    v-model="isSnackbarVisible"
    multi-line
  >
    I am a multi-line snackbar. I can have more than one line. This is another line that is quite long.

    <template #actions>
      <VBtn
        color="error"
        @click="isSnackbarVisible = false"
      >
        Close
      </VBtn>
    </template>
  </VSnackbar>
</template>
`,js:`<script setup>
const isSnackbarVisible = ref(false)
<\/script>

<template>
  <VBtn @click="isSnackbarVisible = true">
    Open Snackbar
  </VBtn>

  <!-- Snackbar -->
  <VSnackbar
    v-model="isSnackbarVisible"
    multi-line
  >
    I am a multi-line snackbar. I can have more than one line. This is another line that is quite long.

    <template #actions>
      <VBtn
        color="error"
        @click="isSnackbarVisible = false"
      >
        Close
      </VBtn>
    </template>
  </VSnackbar>
</template>
`},va={ts:`<script lang="ts" setup>
const isSnackbarTopStartVisible = ref(false)
const isSnackbarTopVisible = ref(false)
const isSnackbarTopEndVisible = ref(false)
const isSnackbarBottomEndVisible = ref(false)
const isSnackbarBottomVisible = ref(false)
const isSnackbarBottomStartVisible = ref(false)
const isSnackbarEndVisible = ref(false)
const isSnackbarStartVisible = ref(false)
const isSnackbarCenteredVisible = ref(false)
<\/script>

<template>
  <div class="demo-space-x">
    <!-- top  -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarTopVisible = true"
    >
      <VIcon icon="tabler-arrow-up" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarTopVisible"
      location="top"
    >
      I'm a top snackbar.
    </VSnackbar>

    <!-- top end -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarTopEndVisible = true"
    >
      <VIcon icon="tabler-arrow-up-right" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarTopEndVisible"
      location="top end"
    >
      I'm a top right snackbar.
    </VSnackbar>

    <!-- center end -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarEndVisible = true"
    >
      <VIcon icon="tabler-arrow-right" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarEndVisible"
      location="end center"
    >
      I'm a center end snackbar.
    </VSnackbar>

    <!-- bottom end -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarBottomEndVisible = true"
    >
      <VIcon icon="tabler-arrow-down-right" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarBottomEndVisible"
      location="bottom end"
    >
      I'm a bottom end snackbar.
    </VSnackbar>

    <!-- bottom -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarBottomVisible = true"
    >
      <VIcon icon="tabler-arrow-down" />
    </VBtn>

    <VSnackbar v-model="isSnackbarBottomVisible">
      I'm a bottom snackbar.
    </VSnackbar>

    <!-- bottom start -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarBottomStartVisible = true"
    >
      <VIcon icon="tabler-arrow-down-left" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarBottomStartVisible"
      location="bottom start"
    >
      I'm a bottom start snackbar.
    </VSnackbar>

    <!-- center start -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarStartVisible = true"
    >
      <VIcon icon="tabler-arrow-left" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarStartVisible"
      location="start center"
    >
      I'm a center start snackbar.
    </VSnackbar>

    <!-- top start -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarTopStartVisible = true"
    >
      <VIcon icon="tabler-arrow-up-left" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarTopStartVisible"
      location="top start"
    >
      I'm a top start snackbar.
    </VSnackbar>

    <!-- center -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarCenteredVisible = true"
    >
      <VIcon icon="tabler-arrows-minimize" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarCenteredVisible"
      location="center"
    >
      I'm a center snackbar.
    </VSnackbar>
  </div>
</template>
`,js:`<script setup>
const isSnackbarTopStartVisible = ref(false)
const isSnackbarTopVisible = ref(false)
const isSnackbarTopEndVisible = ref(false)
const isSnackbarBottomEndVisible = ref(false)
const isSnackbarBottomVisible = ref(false)
const isSnackbarBottomStartVisible = ref(false)
const isSnackbarEndVisible = ref(false)
const isSnackbarStartVisible = ref(false)
const isSnackbarCenteredVisible = ref(false)
<\/script>

<template>
  <div class="demo-space-x">
    <!-- top  -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarTopVisible = true"
    >
      <VIcon icon="tabler-arrow-up" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarTopVisible"
      location="top"
    >
      I'm a top snackbar.
    </VSnackbar>

    <!-- top end -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarTopEndVisible = true"
    >
      <VIcon icon="tabler-arrow-up-right" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarTopEndVisible"
      location="top end"
    >
      I'm a top right snackbar.
    </VSnackbar>

    <!-- center end -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarEndVisible = true"
    >
      <VIcon icon="tabler-arrow-right" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarEndVisible"
      location="end center"
    >
      I'm a center end snackbar.
    </VSnackbar>

    <!-- bottom end -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarBottomEndVisible = true"
    >
      <VIcon icon="tabler-arrow-down-right" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarBottomEndVisible"
      location="bottom end"
    >
      I'm a bottom end snackbar.
    </VSnackbar>

    <!-- bottom -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarBottomVisible = true"
    >
      <VIcon icon="tabler-arrow-down" />
    </VBtn>

    <VSnackbar v-model="isSnackbarBottomVisible">
      I'm a bottom snackbar.
    </VSnackbar>

    <!-- bottom start -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarBottomStartVisible = true"
    >
      <VIcon icon="tabler-arrow-down-left" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarBottomStartVisible"
      location="bottom start"
    >
      I'm a bottom start snackbar.
    </VSnackbar>

    <!-- center start -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarStartVisible = true"
    >
      <VIcon icon="tabler-arrow-left" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarStartVisible"
      location="start center"
    >
      I'm a center start snackbar.
    </VSnackbar>

    <!-- top start -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarTopStartVisible = true"
    >
      <VIcon icon="tabler-arrow-up-left" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarTopStartVisible"
      location="top start"
    >
      I'm a top start snackbar.
    </VSnackbar>

    <!-- center -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarCenteredVisible = true"
    >
      <VIcon icon="tabler-arrows-minimize" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarCenteredVisible"
      location="center"
    >
      I'm a center snackbar.
    </VSnackbar>
  </div>
</template>
`},Ba={ts:`<script lang="ts" setup>
const isSnackbarVisible = ref(false)
<\/script>

<template>
  <VBtn @click="isSnackbarVisible = true">
    Open Snackbar
  </VBtn>

  <!-- Snackbar -->
  <VSnackbar
    v-model="isSnackbarVisible"
    :timeout="2000"
  >
    My timeout is set to 2000.
  </VSnackbar>
</template>
`,js:`<script setup>
const isSnackbarVisible = ref(false)
<\/script>

<template>
  <VBtn @click="isSnackbarVisible = true">
    Open Snackbar
  </VBtn>

  <!-- Snackbar -->
  <VSnackbar
    v-model="isSnackbarVisible"
    :timeout="2000"
  >
    My timeout is set to 2000.
  </VSnackbar>
</template>
`},_a={ts:`<script lang="ts" setup>
const isSnackbarFadeVisible = ref(false)
const isSnackbarScaleVisible = ref(false)
const isSnackbarScrollReverseVisible = ref(false)
<\/script>

<template>
  <div class="demo-space-x">
    <!-- fade -->
    <VBtn @click="isSnackbarFadeVisible = true">
      fade snackbar
    </VBtn>

    <VSnackbar
      v-model="isSnackbarFadeVisible"
      transition="fade-transition"
      location="top start"
    >
      I'm a fade transition snackbar.
    </VSnackbar>

    <!-- scale -->
    <VBtn @click="isSnackbarScaleVisible = true">
      Scale snackbar
    </VBtn>

    <VSnackbar
      v-model="isSnackbarScaleVisible"
      transition="scale-transition"
      location="bottom end"
    >
      I'm a scale transition snackbar.
    </VSnackbar>

    <!-- scroll y reverse -->
    <VBtn @click="isSnackbarScrollReverseVisible = true">
      scroll y reverse
    </VBtn>

    <VSnackbar
      v-model="isSnackbarScrollReverseVisible"
      transition="scroll-y-reverse-transition"
      location="top end"
    >
      I'm a scroll y reverse transition snackbar.
    </VSnackbar>
  </div>
</template>
`,js:`<script setup>
const isSnackbarFadeVisible = ref(false)
const isSnackbarScaleVisible = ref(false)
const isSnackbarScrollReverseVisible = ref(false)
<\/script>

<template>
  <div class="demo-space-x">
    <!-- fade -->
    <VBtn @click="isSnackbarFadeVisible = true">
      fade snackbar
    </VBtn>

    <VSnackbar
      v-model="isSnackbarFadeVisible"
      transition="fade-transition"
      location="top start"
    >
      I'm a fade transition snackbar.
    </VSnackbar>

    <!-- scale -->
    <VBtn @click="isSnackbarScaleVisible = true">
      Scale snackbar
    </VBtn>

    <VSnackbar
      v-model="isSnackbarScaleVisible"
      transition="scale-transition"
      location="bottom end"
    >
      I'm a scale transition snackbar.
    </VSnackbar>

    <!-- scroll y reverse -->
    <VBtn @click="isSnackbarScrollReverseVisible = true">
      scroll y reverse
    </VBtn>

    <VSnackbar
      v-model="isSnackbarScrollReverseVisible"
      transition="scroll-y-reverse-transition"
      location="top end"
    >
      I'm a scroll y reverse transition snackbar.
    </VSnackbar>
  </div>
</template>
`},Ia={ts:`<script lang="ts" setup>
const isDefaultSnackbarVisible = ref(false)
const isTonalSnackbarVisible = ref(false)
const isTextSnackbarVisible = ref(false)
const isOutlinedSnackbarVisible = ref(false)
const isFlatSnackbarVisible = ref(false)
<\/script>

<template>
  <div class="demo-space-x">
    <!-- Default toggle btn -->
    <VBtn @click="isDefaultSnackbarVisible = true">
      Default
    </VBtn>

    <!-- Default snackbar -->
    <VSnackbar
      v-model="isDefaultSnackbarVisible"
      location="top start"
    >
      Jelly chocolate bar candy canes apple pie.
    </VSnackbar>

    <!-- tonal toggle btn -->
    <VBtn @click="isTonalSnackbarVisible = true">
      tonal
    </VBtn>

    <!-- tonal snackbar -->
    <VSnackbar
      v-model="isTonalSnackbarVisible"
      location="top end"
      variant="tonal"
    >
      Ice cream cake candy canes.
    </VSnackbar>

    <!-- Text toggle btn -->
    <VBtn @click="isTextSnackbarVisible = true">
      Text
    </VBtn>

    <!-- Text snackbar -->
    <VSnackbar
      v-model="isTextSnackbarVisible"
      location="end center"
      variant="text"
    >
      Pie icing biscuit soufflé liquorice topping.
    </VSnackbar>

    <!-- Outline toggle btn -->
    <VBtn @click="isOutlinedSnackbarVisible = true">
      Outlined
    </VBtn>

    <!-- Outline snackbar -->
    <VSnackbar
      v-model="isOutlinedSnackbarVisible"
      location="bottom end"
      variant="outlined"
      color="error"
    >
      Oat cake caramels sesame snaps candy.
    </VSnackbar>

    <!-- flat toggle btn -->
    <VBtn @click="isFlatSnackbarVisible = true">
      Flat
    </VBtn>

    <!-- flat snackbar -->
    <VSnackbar
      v-model="isFlatSnackbarVisible"
      location="bottom start"
      variant="flat"
      color="error"
    >
      Oat cake caramels sesame snaps candy.
    </VSnackbar>
  </div>
</template>
`,js:`<script setup>
const isDefaultSnackbarVisible = ref(false)
const isTonalSnackbarVisible = ref(false)
const isTextSnackbarVisible = ref(false)
const isOutlinedSnackbarVisible = ref(false)
const isFlatSnackbarVisible = ref(false)
<\/script>

<template>
  <div class="demo-space-x">
    <!-- Default toggle btn -->
    <VBtn @click="isDefaultSnackbarVisible = true">
      Default
    </VBtn>

    <!-- Default snackbar -->
    <VSnackbar
      v-model="isDefaultSnackbarVisible"
      location="top start"
    >
      Jelly chocolate bar candy canes apple pie.
    </VSnackbar>

    <!-- tonal toggle btn -->
    <VBtn @click="isTonalSnackbarVisible = true">
      tonal
    </VBtn>

    <!-- tonal snackbar -->
    <VSnackbar
      v-model="isTonalSnackbarVisible"
      location="top end"
      variant="tonal"
    >
      Ice cream cake candy canes.
    </VSnackbar>

    <!-- Text toggle btn -->
    <VBtn @click="isTextSnackbarVisible = true">
      Text
    </VBtn>

    <!-- Text snackbar -->
    <VSnackbar
      v-model="isTextSnackbarVisible"
      location="end center"
      variant="text"
    >
      Pie icing biscuit soufflé liquorice topping.
    </VSnackbar>

    <!-- Outline toggle btn -->
    <VBtn @click="isOutlinedSnackbarVisible = true">
      Outlined
    </VBtn>

    <!-- Outline snackbar -->
    <VSnackbar
      v-model="isOutlinedSnackbarVisible"
      location="bottom end"
      variant="outlined"
      color="error"
    >
      Oat cake caramels sesame snaps candy.
    </VSnackbar>

    <!-- flat toggle btn -->
    <VBtn @click="isFlatSnackbarVisible = true">
      Flat
    </VBtn>

    <!-- flat snackbar -->
    <VSnackbar
      v-model="isFlatSnackbarVisible"
      location="bottom start"
      variant="flat"
      color="error"
    >
      Oat cake caramels sesame snaps candy.
    </VSnackbar>
  </div>
</template>
`},ga={ts:`<script lang="ts" setup>
const isSnackbarVisible = ref(false)
<\/script>

<template>
  <VBtn @click="isSnackbarVisible = true">
    Open Snackbar
  </VBtn>

  <VSnackbar
    v-model="isSnackbarVisible"
    vertical
  >
    Sugar plum chocolate bar halvah sesame snaps apple pie donut croissant marshmallow. Sweet roll donut gummies sesame snaps icing bear claw tiramisu cotton candy.

    <template #actions>
      <VBtn
        color="success"
        @click="isSnackbarVisible = false"
      >
        Undo
      </VBtn>

      <VBtn
        color="error"
        @click="isSnackbarVisible = false"
      >
        Close
      </VBtn>
    </template>
  </VSnackbar>
</template>
`,js:`<script setup>
const isSnackbarVisible = ref(false)
<\/script>

<template>
  <VBtn @click="isSnackbarVisible = true">
    Open Snackbar
  </VBtn>

  <VSnackbar
    v-model="isSnackbarVisible"
    vertical
  >
    Sugar plum chocolate bar halvah sesame snaps apple pie donut croissant marshmallow. Sweet roll donut gummies sesame snaps icing bear claw tiramisu cotton candy.

    <template #actions>
      <VBtn
        color="success"
        @click="isSnackbarVisible = false"
      >
        Undo
      </VBtn>

      <VBtn
        color="error"
        @click="isSnackbarVisible = false"
      >
        Close
      </VBtn>
    </template>
  </VSnackbar>
</template>
`},xa={ts:`<script lang="ts" setup>
const isSnackbarVisibility = ref(false)
<\/script>

<template>
  <VBtn @click="isSnackbarVisibility = true">
    Open Snackbar
  </VBtn>

  <!-- Snackbar -->
  <VSnackbar v-model="isSnackbarVisibility">
    Hello, I'm a snackbar with actions.

    <template #actions>
      <VBtn
        color="error"
        @click="isSnackbarVisibility = false"
      >
        Close
      </VBtn>
    </template>
  </VSnackbar>
</template>
`,js:`<script setup>
const isSnackbarVisibility = ref(false)
<\/script>

<template>
  <VBtn @click="isSnackbarVisibility = true">
    Open Snackbar
  </VBtn>

  <!-- Snackbar -->
  <VSnackbar v-model="isSnackbarVisibility">
    Hello, I'm a snackbar with actions.

    <template #actions>
      <VBtn
        color="error"
        @click="isSnackbarVisibility = false"
      >
        Close
      </VBtn>
    </template>
  </VSnackbar>
</template>
`},ya=V("p",null,[t("The "),V("code",null,"v-snackbar"),t(" component is used to display a quick message to a user. Snackbars support positioning, removal delay, and callbacks.")],-1),Ta=V("p",null,[t("Use "),V("code",null,"actions"),t(" slot to add action button. A "),V("code",null,"v-snackbar"),t(" in its simplest form displays a temporary and closable notification to the user.")],-1),wa=V("p",null,[t("The "),V("code",null,"multi-line"),t(" property extends the height of the "),V("code",null,"v-snackbar"),t(" to give you a little more room for content.")],-1),Ca=V("p",null,[t("The "),V("code",null,"timeout"),t(" property lets you customize the delay before the "),V("code",null,"v-snackbar"),t(" is hidden.")],-1),$a=V("p",null,[t("The "),V("code",null,"vertical"),t(" property allows you to stack the content of your "),V("code",null,"v-snackbar"),t(".")],-1),Oa=V("p",null,[t("Use "),V("code",null,"location"),t(" prop to change the position of snackbar.")],-1),Da=V("p",null,[t("Apply different styles to the snackbar using props such as "),V("code",null,"shaped"),t(", "),V("code",null,"rounded"),t(", "),V("code",null,"color"),t(", "),V("code",null,"text"),t(", "),V("code",null,"outlined"),t(", "),V("code",null,"tile"),t(" and more.")],-1),Ua=V("p",null,"Use transition prop to sets the component transition.",-1),Ja={__name:"snackbar",setup(k){return(l,c)=>{const n=Sa,i=na,b=ma,v=da,s=Va,d=ka,I=ua,w=ca,o=sa;return _(),Z(la,{class:"match-height"},{default:e(()=>[a(g,{cols:"12",md:"6"},{default:e(()=>[a(i,{title:"Basic",code:pa},{default:e(()=>[ya,a(n)]),_:1},8,["code"])]),_:1}),a(g,{cols:"12",md:"6"},{default:e(()=>[a(i,{title:"With Action",code:xa},{default:e(()=>[Ta,a(b)]),_:1},8,["code"])]),_:1}),a(g,{cols:"12",md:"6"},{default:e(()=>[a(i,{title:"Multi Line",code:fa},{default:e(()=>[wa,a(v)]),_:1},8,["code"])]),_:1}),a(g,{cols:"12",md:"6"},{default:e(()=>[a(i,{title:"Timeout",code:Ba},{default:e(()=>[Ca,a(s)]),_:1},8,["code"])]),_:1}),a(g,{cols:"12",md:"6"},{default:e(()=>[a(i,{title:"Vertical",code:ga},{default:e(()=>[$a,a(d)]),_:1},8,["code"])]),_:1}),a(g,{cols:"12",md:"6"},{default:e(()=>[a(i,{title:"Position",code:va},{default:e(()=>[Oa,a(I)]),_:1},8,["code"])]),_:1}),a(g,{cols:"12",md:"6"},{default:e(()=>[a(i,{title:"Variants",code:Ia},{default:e(()=>[Da,a(w)]),_:1},8,["code"])]),_:1}),a(g,{cols:"12",md:"6"},{default:e(()=>[a(i,{title:"Transition",code:_a},{default:e(()=>[Ua,a(o)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{Ja as default};
