import{_ as b}from"./AppTextField-39a45d2a.js";import{a as n,V as C}from"./VRow-0990f1b0.js";import{r as f,o as _,f as h,e as l,b as e,n as i,aW as T,_ as g,d as o,v as a}from"./index-7474f5b2.js";import{r as $,e as I}from"./validators-dea6e3a5.js";import{V as M}from"./VForm-01a65b20.js";import{V as w}from"./VTextField-f506f2c1.js";import{_ as D}from"./AppCardCode-e48f1a17.js";import"./form-1daec3d8.js";import"./helpers-61e4df1a.js";import"./forwardRefs-8348545e.js";/* empty css                   */import"./VCounter-13e09909.js";import"./VImg-f2e8baad.js";import"./VField-e8f1f600.js";import"./easing-9f15041e.js";import"./VInput-0a1cf06c.js";import"./VCard-5a5536f3.js";import"./VAvatar-60fa6094.js";import"./VCardText-5b1570fa.js";import"./VDivider-495a0759.js";const q={__name:"DemoTextfieldPasswordInput",setup(x){const r=f(!1),t=f(!0),p=f("Password"),s=f("wqfasds"),u={required:d=>!!d||"Required.",min:d=>d.length>=8||"Min 8 characters"};return(d,c)=>{const m=b;return _(),h(C,null,{default:l(()=>[e(n,{cols:"12",sm:"6"},{default:l(()=>[e(m,{modelValue:i(p),"onUpdate:modelValue":c[0]||(c[0]=V=>T(p)?p.value=V:null),"append-inner-icon":i(r)?"tabler-eye-off":"tabler-eye",rules:[u.required,u.min],type:i(r)?"text":"password",name:"input-10-1",label:"Normal with hint text",hint:"At least 8 characters",placeholder:"············",counter:"","onClick:appendInner":c[1]||(c[1]=V=>r.value=!i(r))},null,8,["modelValue","append-inner-icon","rules","type"])]),_:1}),e(n,{cols:"12",sm:"6"},{default:l(()=>[e(m,{modelValue:i(s),"onUpdate:modelValue":c[2]||(c[2]=V=>T(s)?s.value=V:null),rules:[u.required,u.min],"append-inner-icon":i(t)?"tabler-eye-off":"tabler-eye",type:i(t)?"text":"password",name:"input-10-2",placeholder:"············",label:"Visible",hint:"At least 8 characters","onClick:appendInner":c[3]||(c[3]=V=>t.value=!i(t))},null,8,["modelValue","rules","append-inner-icon","type"])]),_:1})]),_:1})}}},U={__name:"DemoTextfieldIconEvents",setup(x){const r=f("Hey!"),t=f(!0),p=f(0),s=()=>{t.value=!t.value},u=()=>{r.value=""},d=()=>{p.value=0},c=()=>{d(),u()};return(m,V)=>{const v=b;return _(),h(v,{modelValue:i(r),"onUpdate:modelValue":V[0]||(V[0]=F=>T(r)?r.value=F:null),clearable:"",type:"text",label:"Message",color:"primary",placeholder:"Hey!!","clear-icon":"tabler-circle-x","append-icon":i(r)?m.$vuetify.locale.isRtl?"tabler-arrow-big-left-lines":"tabler-arrow-big-right-lines":"tabler-microphone","append-inner-icon":i(t)?"tabler-map-pin":"tabler-map-pin-off","onClick:appendInner":s,"onClick:append":c,"onClick:clear":u},null,8,["modelValue","append-icon","append-inner-icon"])}}},j={__name:"DemoTextfieldValidation",setup(x){const r=f("");return(t,p)=>{const s=b;return _(),h(M,null,{default:l(()=>[e(s,{modelValue:i(r),"onUpdate:modelValue":p[0]||(p[0]=u=>T(r)?r.value=u:null),rules:["requiredValidator"in t?t.requiredValidator:i($),"emailValidator"in t?t.emailValidator:i(I)],placeholder:"johnedoe@email.com",label:"E-mail"},null,8,["modelValue","rules"])]),_:1})}}},S={};function E(x,r){const t=b;return _(),h(t,{label:"Regular",placeholder:"Placeholder Text","single-line":""})}const L=g(S,[["render",E]]),H={__name:"DemoTextfieldPrefixesAndSuffixes",setup(x){const r=f(10.05),t=f(28.02),p=f("example"),s=f("04:56");return(u,d)=>{const c=b;return _(),h(C,null,{default:l(()=>[e(n,{cols:"12"},{default:l(()=>[e(c,{modelValue:i(r),"onUpdate:modelValue":d[0]||(d[0]=m=>T(r)?r.value=m:null),label:"Amount",prefix:"$",type:"number",placeholder:"10.05"},null,8,["modelValue"])]),_:1}),e(n,{cols:"12"},{default:l(()=>[e(c,{modelValue:i(t),"onUpdate:modelValue":d[1]||(d[1]=m=>T(t)?t.value=m:null),label:"Weight",suffix:"lbs",type:"number",placeholder:"28.02"},null,8,["modelValue"])]),_:1}),e(n,{cols:"12"},{default:l(()=>[e(c,{modelValue:i(p),"onUpdate:modelValue":d[2]||(d[2]=m=>T(p)?p.value=m:null),label:"Email address",suffix:"@gmail.com",placeholder:"example"},null,8,["modelValue"])]),_:1}),e(n,{cols:"12"},{default:l(()=>[e(c,{modelValue:i(s),"onUpdate:modelValue":d[3]||(d[3]=m=>T(s)?s.value=m:null),label:"Label Text",type:"time",suffix:"PST",placeholder:"04:56"},null,8,["modelValue"])]),_:1})]),_:1})}}},N={};function B(x,r){const t=b;return _(),h(C,null,{default:l(()=>[e(n,{cols:"12"},{default:l(()=>[e(t,{label:"Prepend","prepend-icon":"tabler-map-pin",placeholder:"Placeholder Text"})]),_:1}),e(n,{cols:"12"},{default:l(()=>[e(t,{label:"Prepend Inner","prepend-inner-icon":"tabler-map-pin",placeholder:"Placeholder Text"})]),_:1}),e(n,{cols:"12"},{default:l(()=>[e(t,{label:"Append","append-icon":"tabler-map-pin",placeholder:"Placeholder Text"})]),_:1}),e(n,{cols:"12"},{default:l(()=>[e(t,{label:"Append Inner","append-inner-icon":"tabler-map-pin",placeholder:"Placeholder Text"})]),_:1})]),_:1})}const W=g(N,[["render",B]]),O={};function z(x,r){const t=b;return _(),h(t,{color:"success",label:"First name",placeholder:"Placeholder Text"})}const Y=g(O,[["render",z]]),G={};function J(x,r){const t=b;return _(),h(t,{placeholder:"Placeholder Text",label:"Regular",clearable:""})}const K=g(G,[["render",J]]),Q={__name:"DemoTextfieldCounter",setup(x){const r=f("Preliminary report"),t=f("California is a state in the western United States"),p=[s=>s.length<=25||"Max 25 characters"];return(s,u)=>{const d=b;return _(),h(C,null,{default:l(()=>[e(n,{cols:"12"},{default:l(()=>[e(d,{modelValue:i(r),"onUpdate:modelValue":u[0]||(u[0]=c=>T(r)?r.value=c:null),rules:p,counter:"25",placeholder:"Placeholder Text",hint:"This field uses counter prop",label:"Regular"},null,8,["modelValue"])]),_:1}),e(n,{cols:"12"},{default:l(()=>[e(d,{modelValue:i(t),"onUpdate:modelValue":u[1]||(u[1]=c=>T(t)?t.value=c:null),rules:p,counter:"",maxlength:"25",placeholder:"Placeholder Text",hint:"This field uses maxlength attribute",label:"Limit exceeded"},null,8,["modelValue"])]),_:1})]),_:1})}}},X={};function Z(x,r){const t=b;return _(),h(C,null,{default:l(()=>[e(n,null,{default:l(()=>[e(t,{label:"Disabled",placeholder:"Placeholder Text",disabled:""})]),_:1}),e(n,{cols:"12"},{default:l(()=>[e(t,{placeholder:"Placeholder Text",label:"Readonly",readonly:""})]),_:1})]),_:1})}const ee=g(X,[["render",Z]]),le={};function te(x,r){return _(),h(C,null,{default:l(()=>[e(n,{cols:"12",md:"6"},{default:l(()=>[e(w,{label:"Outlined",variant:"outlined"})]),_:1}),e(n,{cols:"12",md:"6"},{default:l(()=>[e(w,{label:"Filled",variant:"filled"})]),_:1}),e(n,{cols:"12",md:"6"},{default:l(()=>[e(w,{label:"Solo",variant:"solo"})]),_:1}),e(n,{cols:"12",md:"6"},{default:l(()=>[e(w,{label:"Plain",variant:"plain"})]),_:1}),e(n,{cols:"12",md:"6"},{default:l(()=>[e(w,{label:"Underlined",variant:"underlined"})]),_:1})]),_:1})}const oe=g(le,[["render",te]]),ae={};function ne(x,r){const t=b;return _(),h(t,{label:"Compact",density:"compact",placeholder:"Placeholder Text"})}const re=g(ae,[["render",ne]]),se={};function ce(x,r){const t=b;return _(),h(t,{label:"Regular",placeholder:"Placeholder Text"})}const de=g(se,[["render",ce]]),ie={ts:`<template>
  <AppTextField
    label="Regular"
    placeholder="Placeholder Text"
  />
</template>
`,js:`<template>
  <AppTextField
    label="Regular"
    placeholder="Placeholder Text"
  />
</template>
`},pe={ts:`<template>
  <AppTextField
    placeholder="Placeholder Text"
    label="Regular"
    clearable
  />
</template>
`,js:`<template>
  <AppTextField
    placeholder="Placeholder Text"
    label="Regular"
    clearable
  />
</template>
`},ue={ts:`<script lang="ts" setup>
const title = ref('Preliminary report')
const description = ref('California is a state in the western United States')
const rules = [(v: string) => v.length <= 25 || 'Max 25 characters']
<\/script>

<template>
  <VRow>
    <VCol cols="12">
      <AppTextField
        v-model="title"
        :rules="rules"
        counter="25"
        placeholder="Placeholder Text"
        hint="This field uses counter prop"
        label="Regular"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        v-model="description"
        :rules="rules"
        counter
        maxlength="25"
        placeholder="Placeholder Text"
        hint="This field uses maxlength attribute"
        label="Limit exceeded"
      />
    </VCol>
  </VRow>
</template>
`,js:`<script setup>
const title = ref('Preliminary report')
const description = ref('California is a state in the western United States')
const rules = [v => v.length <= 25 || 'Max 25 characters']
<\/script>

<template>
  <VRow>
    <VCol cols="12">
      <AppTextField
        v-model="title"
        :rules="rules"
        counter="25"
        placeholder="Placeholder Text"
        hint="This field uses counter prop"
        label="Regular"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        v-model="description"
        :rules="rules"
        counter
        maxlength="25"
        placeholder="Placeholder Text"
        hint="This field uses maxlength attribute"
        label="Limit exceeded"
      />
    </VCol>
  </VRow>
</template>
`},me={ts:`<template>
  <AppTextField
    color="success"
    label="First name"
    placeholder="Placeholder Text"
  />
</template>
`,js:`<template>
  <AppTextField
    color="success"
    label="First name"
    placeholder="Placeholder Text"
  />
</template>
`},fe={ts:`<template>
  <AppTextField
    label="Compact"
    density="compact"
    placeholder="Placeholder Text"
  />
</template>
`,js:`<template>
  <AppTextField
    label="Compact"
    density="compact"
    placeholder="Placeholder Text"
  />
</template>
`},_e={ts:`<script lang="ts" setup>
const message = ref('Hey!')
const marker = ref(true)
const iconIndex = ref(0)

const toggleMarker = () => {
  marker.value = !marker.value
}

const clearMessage = () => {
  message.value = ''
}

const resetIcon = () => {
  iconIndex.value = 0
}

const sendMessage = () => {
  resetIcon()
  clearMessage()
}
<\/script>

<template>
  <AppTextField
    v-model="message"
    clearable
    type="text"
    label="Message"
    color="primary"
    placeholder="Hey!!"
    clear-icon="tabler-circle-x"
    :append-icon="message ? $vuetify.locale.isRtl ? 'tabler-arrow-big-left-lines' : 'tabler-arrow-big-right-lines' : 'tabler-microphone'"
    :append-inner-icon="marker ? 'tabler-map-pin' : 'tabler-map-pin-off'"
    @click:append-inner="toggleMarker"
    @click:append="sendMessage"
    @click:clear="clearMessage"
  />
</template>
`,js:`<script setup>
const message = ref('Hey!')
const marker = ref(true)
const iconIndex = ref(0)

const toggleMarker = () => {
  marker.value = !marker.value
}

const clearMessage = () => {
  message.value = ''
}

const resetIcon = () => {
  iconIndex.value = 0
}

const sendMessage = () => {
  resetIcon()
  clearMessage()
}
<\/script>

<template>
  <AppTextField
    v-model="message"
    clearable
    type="text"
    label="Message"
    color="primary"
    placeholder="Hey!!"
    clear-icon="tabler-circle-x"
    :append-icon="message ? $vuetify.locale.isRtl ? 'tabler-arrow-big-left-lines' : 'tabler-arrow-big-right-lines' : 'tabler-microphone'"
    :append-inner-icon="marker ? 'tabler-map-pin' : 'tabler-map-pin-off'"
    @click:append-inner="toggleMarker"
    @click:append="sendMessage"
    @click:clear="clearMessage"
  />
</template>
`},he={ts:`<template>
  <VRow>
    <VCol cols="12">
      <AppTextField
        label="Prepend"
        prepend-icon="tabler-map-pin"
        placeholder="Placeholder Text"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        label="Prepend Inner"
        prepend-inner-icon="tabler-map-pin"
        placeholder="Placeholder Text"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        label="Append"
        append-icon="tabler-map-pin"
        placeholder="Placeholder Text"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        label="Append Inner"
        append-inner-icon="tabler-map-pin"
        placeholder="Placeholder Text"
      />
    </VCol>
  </VRow>
</template>
`,js:`<template>
  <VRow>
    <VCol cols="12">
      <AppTextField
        label="Prepend"
        prepend-icon="tabler-map-pin"
        placeholder="Placeholder Text"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        label="Prepend Inner"
        prepend-inner-icon="tabler-map-pin"
        placeholder="Placeholder Text"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        label="Append"
        append-icon="tabler-map-pin"
        placeholder="Placeholder Text"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        label="Append Inner"
        append-inner-icon="tabler-map-pin"
        placeholder="Placeholder Text"
      />
    </VCol>
  </VRow>
</template>
`},xe={ts:`<script lang="ts" setup>
const show1 = ref(false)
const show2 = ref(true)
const password = ref('Password')
const confirmPassword = ref('wqfasds')

const rules = {
  required: (value: string) => !!value || 'Required.',
  min: (v: string) => v.length >= 8 || 'Min 8 characters',
}
<\/script>

<template>
  <VRow>
    <VCol
      cols="12"
      sm="6"
    >
      <AppTextField
        v-model="password"
        :append-inner-icon="show1 ? 'tabler-eye-off' : 'tabler-eye' "
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Normal with hint text"
        hint="At least 8 characters"
        placeholder="············"
        counter
        @click:append-inner="show1 = !show1"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <AppTextField
        v-model="confirmPassword"
        :rules="[rules.required, rules.min]"
        :append-inner-icon="show2 ? 'tabler-eye-off' : 'tabler-eye' "
        :type="show2 ? 'text' : 'password'"
        name="input-10-2"
        placeholder="············"
        label="Visible"
        hint="At least 8 characters"
        @click:append-inner="show2 = !show2"
      />
    </VCol>
  </VRow>
</template>
`,js:`<script setup>
const show1 = ref(false)
const show2 = ref(true)
const password = ref('Password')
const confirmPassword = ref('wqfasds')

const rules = {
  required: value => !!value || 'Required.',
  min: v => v.length >= 8 || 'Min 8 characters',
}
<\/script>

<template>
  <VRow>
    <VCol
      cols="12"
      sm="6"
    >
      <AppTextField
        v-model="password"
        :append-inner-icon="show1 ? 'tabler-eye-off' : 'tabler-eye' "
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Normal with hint text"
        hint="At least 8 characters"
        placeholder="············"
        counter
        @click:append-inner="show1 = !show1"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <AppTextField
        v-model="confirmPassword"
        :rules="[rules.required, rules.min]"
        :append-inner-icon="show2 ? 'tabler-eye-off' : 'tabler-eye' "
        :type="show2 ? 'text' : 'password'"
        name="input-10-2"
        placeholder="············"
        label="Visible"
        hint="At least 8 characters"
        @click:append-inner="show2 = !show2"
      />
    </VCol>
  </VRow>
</template>
`},be={ts:`<script setup lang="ts">
const amount = ref(10.05)
const weight = ref(28.02)
const email = ref('example')
const time = ref('04:56')
<\/script>

<template>
  <VRow>
    <VCol cols="12">
      <AppTextField
        v-model="amount"
        label="Amount"
        prefix="$"
        type="number"
        placeholder="10.05"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        v-model="weight"
        label="Weight"
        suffix="lbs"
        type="number"
        placeholder="28.02"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        v-model="email"
        label="Email address"
        suffix="@gmail.com"
        placeholder="example"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        v-model="time"
        label="Label Text"
        type="time"
        suffix="PST"
        placeholder="04:56"
      />
    </VCol>
  </VRow>
</template>
`,js:`<script setup>
const amount = ref(10.05)
const weight = ref(28.02)
const email = ref('example')
const time = ref('04:56')
<\/script>

<template>
  <VRow>
    <VCol cols="12">
      <AppTextField
        v-model="amount"
        label="Amount"
        prefix="$"
        type="number"
        placeholder="10.05"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        v-model="weight"
        label="Weight"
        suffix="lbs"
        type="number"
        placeholder="28.02"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        v-model="email"
        label="Email address"
        suffix="@gmail.com"
        placeholder="example"
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        v-model="time"
        label="Label Text"
        type="time"
        suffix="PST"
        placeholder="04:56"
      />
    </VCol>
  </VRow>
</template>
`},Ve={ts:`<template>
  <AppTextField
    label="Regular"
    placeholder="Placeholder Text"
    single-line
  />
</template>
`,js:`<template>
  <AppTextField
    label="Regular"
    placeholder="Placeholder Text"
    single-line
  />
</template>
`},Te={ts:`<template>
  <VRow>
    <VCol>
      <AppTextField
        label="Disabled"
        placeholder="Placeholder Text"
        disabled
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        placeholder="Placeholder Text"
        label="Readonly"
        readonly
      />
    </VCol>
  </VRow>
</template>
`,js:`<template>
  <VRow>
    <VCol>
      <AppTextField
        label="Disabled"
        placeholder="Placeholder Text"
        disabled
      />
    </VCol>

    <VCol cols="12">
      <AppTextField
        placeholder="Placeholder Text"
        label="Readonly"
        readonly
      />
    </VCol>
  </VRow>
</template>
`},ge={ts:`<script lang="ts" setup>
const email = ref('')
<\/script>

<template>
  <VForm>
    <AppTextField
      v-model="email"
      :rules="[requiredValidator, emailValidator]"
      placeholder="johnedoe@email.com"
      label="E-mail"
    />
  </VForm>
</template>
`,js:`<script setup>
const email = ref('')
<\/script>

<template>
  <VForm>
    <AppTextField
      v-model="email"
      :rules="[requiredValidator, emailValidator]"
      placeholder="johnedoe@email.com"
      label="E-mail"
    />
  </VForm>
</template>
`},Ce={ts:`<template>
  <VRow>
    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        label="Outlined"
        variant="outlined"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        label="Filled"
        variant="filled"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        label="Solo"
        variant="solo"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        label="Plain"
        variant="plain"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        label="Underlined"
        variant="underlined"
      />
    </VCol>
  </VRow>
</template>
`,js:`<template>
  <VRow>
    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        label="Outlined"
        variant="outlined"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        label="Filled"
        variant="filled"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        label="Solo"
        variant="solo"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        label="Plain"
        variant="plain"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <VTextField
        label="Underlined"
        variant="underlined"
      />
    </VCol>
  </VRow>
</template>
`},we=o("p",null,"Text fields components are used for collecting user provided information.",-1),ve=o("p",null,[a("The "),o("code",null,"density"),a(" prop decreases the height of the text field based upon 1 of 3 levels of density; "),o("code",null,"default"),a(", "),o("code",null,"comfortable"),a(", and "),o("code",null,"compact"),a(".")],-1),Fe=o("p",null,[a("Use "),o("code",null,"solo"),a(", "),o("code",null,"filled"),a(", "),o("code",null,"outlined"),a(", "),o("code",null,"plain"),a(" and "),o("code",null,"underlined"),a(" option of "),o("code",null,"variant"),a(" prop to change the look of the textfield. ")],-1),Ae=o("p",null,"Text fields can be disabled or readonly.",-1),ye=o("p",null,[a("Use a "),o("code",null,"counter"),a(" prop to inform a user of the character limit.")],-1),Pe=o("p",null,"When clearable, you can customize the clear icon with clear-icon.",-1),Re=o("p",null,[a("Use "),o("code",null,"color"),a(" prop to change the input border color.")],-1),ke=o("p",null,[a("You can add icons to the text field with "),o("code",null,"prepend-icon"),a(", "),o("code",null,"append-icon"),a(" and "),o("code",null,"append-inner-icon"),a(" and "),o("code",null,"prepend-inner-icon"),a(" props.")],-1),$e=o("p",null,[a("The "),o("code",null,"prefix"),a(" and "),o("code",null,"suffix"),a(" properties allows you to prepend and append inline non-modifiable text next to the text field.")],-1),Ie=o("p",null,[o("code",null,"single-line"),a(" text fields do not float their label on focus or with data.")],-1),Me=o("p",null,[a("Vuetify includes simple validation through the "),o("code",null,"rules"),a(" prop.")],-1),De=o("p",null,[o("code",null,"click:prepend"),a(", "),o("code",null,"click:append"),a(", "),o("code",null,"click:append-inner"),a(", and "),o("code",null,"click:clear"),a(" will be emitted when you click on the respective icon")],-1),qe=o("p",null,[a("Using the HTML input "),o("code",null,"type"),a(" password can be used with an appended icon and callback to control the visibility.")],-1),tl={__name:"textfield",setup(x){return(r,t)=>{const p=de,s=D,u=re,d=oe,c=ee,m=Q,V=K,v=Y,F=W,A=H,y=L,P=j,R=U,k=q;return _(),h(C,{class:"match-height"},{default:l(()=>[e(n,{cols:"12",md:"6"},{default:l(()=>[e(s,{title:"Basic",code:ie},{default:l(()=>[we,e(p)]),_:1},8,["code"])]),_:1}),e(n,{cols:"12",md:"6"},{default:l(()=>[e(s,{title:"Density",code:fe},{default:l(()=>[ve,e(u)]),_:1},8,["code"])]),_:1}),e(n,{cols:"12"},{default:l(()=>[e(s,{title:"Variant",code:Ce},{default:l(()=>[Fe,e(d)]),_:1},8,["code"])]),_:1}),e(n,{cols:"12",md:"6"},{default:l(()=>[e(s,{title:"State",code:Te},{default:l(()=>[Ae,e(c)]),_:1},8,["code"])]),_:1}),e(n,{cols:"12",md:"6"},{default:l(()=>[e(s,{title:"Counter",code:ue},{default:l(()=>[ye,e(m)]),_:1},8,["code"])]),_:1}),e(n,{cols:"12",md:"6"},{default:l(()=>[e(s,{title:"Clearable",code:pe},{default:l(()=>[Pe,e(V)]),_:1},8,["code"])]),_:1}),e(n,{cols:"12",md:"6"},{default:l(()=>[e(s,{title:"Custom Colors",code:me},{default:l(()=>[Re,e(v)]),_:1},8,["code"])]),_:1}),e(n,{cols:"12",md:"6"},{default:l(()=>[e(s,{title:"Icons",code:he},{default:l(()=>[ke,e(F)]),_:1},8,["code"])]),_:1}),e(n,{cols:"12",md:"6"},{default:l(()=>[e(s,{title:"Prefixes and suffixes",code:be},{default:l(()=>[$e,e(A)]),_:1},8,["code"])]),_:1}),e(n,{cols:"12",md:"6"},{default:l(()=>[e(s,{title:"Single line",code:Ve},{default:l(()=>[Ie,e(y)]),_:1},8,["code"])]),_:1}),e(n,{cols:"12",md:"6"},{default:l(()=>[e(s,{title:"Validation",code:ge},{default:l(()=>[Me,e(P)]),_:1},8,["code"])]),_:1}),e(n,{cols:"12",md:"6"},{default:l(()=>[e(s,{title:"Icon events",code:_e},{default:l(()=>[De,e(R)]),_:1},8,["code"])]),_:1}),e(n,{cols:"12",md:"6"},{default:l(()=>[e(s,{title:"Password input",code:xe},{default:l(()=>[qe,e(k)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{tl as default};
