import{a as s,V as p}from"./VRadioGroup-ee1af1f8.js";import{r as m,o as u,f as b,e as t,c as _,F as f,i as G,b as o,n as c,aW as R,d as a,v as i}from"./index-7474f5b2.js";import{V as y}from"./VDivider-495a0759.js";import{_ as $}from"./AppCardCode-e48f1a17.js";import{V as x,a as V}from"./VRow-0990f1b0.js";import"./VSelectionControl-6ad5757d.js";import"./form-1daec3d8.js";import"./VInput-0a1cf06c.js";import"./VImg-f2e8baad.js";import"./VCard-5a5536f3.js";import"./VAvatar-60fa6094.js";import"./VCardText-5b1570fa.js";const L={__name:"DemoRadioValidation",setup(v){const l=m(1),r=[d=>d!==3?!0:"Do not select the third one!"];return(d,e)=>(u(),b(p,{modelValue:c(l),"onUpdate:modelValue":e[0]||(e[0]=n=>R(l)?l.value=n:null),inline:"",rules:r},{default:t(()=>[(u(),_(f,null,G(3,n=>o(s,{key:n,error:c(l)===3,label:`Radio ${n}`,value:n},null,8,["error","label","value"])),64))]),_:1},8,["modelValue"]))}},C={__name:"DemoRadioIcon",setup(v){const l=m(1);return(r,d)=>(u(),b(p,{modelValue:c(l),"onUpdate:modelValue":d[0]||(d[0]=e=>R(l)?l.value=e:null),"false-icon":"tabler-bell-off","true-icon":"tabler-bell"},{default:t(()=>[(u(),_(f,null,G(2,e=>o(s,{key:e,label:`Radio ${e}`,value:e},null,8,["label","value"])),64))]),_:1},8,["modelValue"]))}},U=a("div",null,[i("Your favorite "),a("strong",null,"search engine")],-1),w=a("div",null,[i(" Of course it's "),a("span",{class:"text-success"}," Google ")],-1),S=a("div",null,[i(" Definitely "),a("span",{class:"text-primary"}," DuckDuckGo ")],-1),I={__name:"DemoRadioLabelSlot",setup(v){const l=m("DuckDuckGo");return(r,d)=>(u(),b(p,{modelValue:c(l),"onUpdate:modelValue":d[0]||(d[0]=e=>R(l)?l.value=e:null)},{label:t(()=>[U]),default:t(()=>[o(s,{value:"Google"},{label:t(()=>[w]),_:1}),o(s,{value:"DuckDuckGo"},{label:t(()=>[S]),_:1})]),_:1},8,["modelValue"]))}},j={__name:"DemoRadioDensity",setup(v){const l=m("radio-1"),r=m("radio-1");return(d,e)=>(u(),_(f,null,[o(p,{modelValue:c(l),"onUpdate:modelValue":e[0]||(e[0]=n=>R(l)?l.value=n:null)},{default:t(()=>[o(s,{label:"Option 1",value:"radio-1",density:"compact"}),o(s,{label:"Option 2",value:"radio-2",density:"compact"})]),_:1},8,["modelValue"]),o(y,{class:"my-3"}),o(p,{modelValue:c(r),"onUpdate:modelValue":e[1]||(e[1]=n=>R(r)?r.value=n:null),inline:""},{default:t(()=>[o(s,{label:"Option 1",value:"radio-1",density:"compact"}),o(s,{label:"Option 2",value:"radio-2",density:"compact"})]),_:1},8,["modelValue"])],64))}},B={__name:"DemoRadioInline",setup(v){const l=m("radio-1"),r=m("radio-1");return(d,e)=>(u(),_(f,null,[o(p,{modelValue:c(l),"onUpdate:modelValue":e[0]||(e[0]=n=>R(l)?l.value=n:null)},{default:t(()=>[o(s,{label:"Option 1",value:"radio-1"}),o(s,{label:"Option 2",value:"radio-2"})]),_:1},8,["modelValue"]),o(y,{class:"my-4"}),o(p,{modelValue:c(r),"onUpdate:modelValue":e[1]||(e[1]=n=>R(r)?r.value=n:null),inline:""},{default:t(()=>[o(s,{label:"Option 1",value:"radio-1"}),o(s,{label:"Option 2",value:"radio-2"})]),_:1},8,["modelValue"])],64))}},E={__name:"DemoRadioColors",setup(v){const l=m("primary"),r=["Primary","Secondary","Success","Info","Warning","Error"];return(d,e)=>(u(),b(p,{modelValue:c(l),"onUpdate:modelValue":e[0]||(e[0]=n=>R(l)?l.value=n:null),inline:""},{default:t(()=>[a("div",null,[(u(),_(f,null,G(r,n=>o(s,{key:n,label:n,color:n.toLocaleLowerCase(),value:n.toLocaleLowerCase()},null,8,["label","color","value"])),64))])]),_:1},8,["modelValue"]))}},W={class:""},A={__name:"DemoRadioBasic",setup(v){const l=m(1);return(r,d)=>(u(),_("div",W,[o(p,{modelValue:c(l),"onUpdate:modelValue":d[0]||(d[0]=e=>R(l)?l.value=e:null)},{default:t(()=>[(u(),_(f,null,G(2,e=>o(s,{key:e,label:`Radio ${e}`,value:e},null,8,["label","value"])),64))]),_:1},8,["modelValue"])]))}},F={ts:`<script lang="ts" setup>
const radioGroup = ref(1)
<\/script>

<template>
  <div class="">
    <VRadioGroup v-model="radioGroup">
      <VRadio
        v-for="n in 2"
        :key="n"
        :label="\`Radio \${n}\`"
        :value="n"
      />
    </VRadioGroup>
  </div>
</template>
`,js:`<script setup>
const radioGroup = ref(1)
<\/script>

<template>
  <div class="">
    <VRadioGroup v-model="radioGroup">
      <VRadio
        v-for="n in 2"
        :key="n"
        :label="\`Radio \${n}\`"
        :value="n"
      />
    </VRadioGroup>
  </div>
</template>
`},N={ts:`<script lang="ts" setup>
const selectedRadio = ref('primary')
const colorsRadio = ['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Error']
<\/script>

<template>
  <VRadioGroup
    v-model="selectedRadio"
    inline
  >
    <div>
      <VRadio
        v-for="radio in colorsRadio"
        :key="radio"
        :label="radio"
        :color="radio.toLocaleLowerCase()"
        :value="radio.toLocaleLowerCase()"
      />
    </div>
  </VRadioGroup>
</template>
`,js:`<script setup>
const selectedRadio = ref('primary')

const colorsRadio = [
  'Primary',
  'Secondary',
  'Success',
  'Info',
  'Warning',
  'Error',
]
<\/script>

<template>
  <VRadioGroup
    v-model="selectedRadio"
    inline
  >
    <div>
      <VRadio
        v-for="radio in colorsRadio"
        :key="radio"
        :label="radio"
        :color="radio.toLocaleLowerCase()"
        :value="radio.toLocaleLowerCase()"
      />
    </div>
  </VRadioGroup>
</template>
`},P={ts:`<script lang="ts" setup>
const columnRadio = ref('radio-1')
const inlineRadio = ref('radio-1')
<\/script>

<template>
  <VRadioGroup v-model="columnRadio">
    <VRadio
      label="Option 1"
      value="radio-1"
      density="compact"
    />
    <VRadio
      label="Option 2"
      value="radio-2"
      density="compact"
    />
  </VRadioGroup>

  <VDivider class="my-3" />

  <VRadioGroup
    v-model="inlineRadio"
    inline
  >
    <VRadio
      label="Option 1"
      value="radio-1"
      density="compact"
    />
    <VRadio
      label="Option 2"
      value="radio-2"
      density="compact"
    />
  </VRadioGroup>
</template>
`,js:`<script setup>
const columnRadio = ref('radio-1')
const inlineRadio = ref('radio-1')
<\/script>

<template>
  <VRadioGroup v-model="columnRadio">
    <VRadio
      label="Option 1"
      value="radio-1"
      density="compact"
    />
    <VRadio
      label="Option 2"
      value="radio-2"
      density="compact"
    />
  </VRadioGroup>

  <VDivider class="my-3" />

  <VRadioGroup
    v-model="inlineRadio"
    inline
  >
    <VRadio
      label="Option 1"
      value="radio-1"
      density="compact"
    />
    <VRadio
      label="Option 2"
      value="radio-2"
      density="compact"
    />
  </VRadioGroup>
</template>
`},T={ts:`<script lang="ts" setup>
const radioGroup = ref(1)
<\/script>

<template>
  <VRadioGroup
    v-model="radioGroup"
    false-icon="tabler-bell-off"
    true-icon="tabler-bell"
  >
    <VRadio
      v-for="n in 2"
      :key="n"
      :label="\`Radio \${n}\`"
      :value="n"
    />
  </VRadioGroup>
</template>
`,js:`<script setup>
const radioGroup = ref(1)
<\/script>

<template>
  <VRadioGroup
    v-model="radioGroup"
    false-icon="tabler-bell-off"
    true-icon="tabler-bell"
  >
    <VRadio
      v-for="n in 2"
      :key="n"
      :label="\`Radio \${n}\`"
      :value="n"
    />
  </VRadioGroup>
</template>
`},Y={ts:`<script lang="ts" setup>
const columnRadio = ref('radio-1')
const inlineRadio = ref('radio-1')
<\/script>

<template>
  <VRadioGroup v-model="columnRadio">
    <VRadio
      label="Option 1"
      value="radio-1"
    />
    <VRadio
      label="Option 2"
      value="radio-2"
    />
  </VRadioGroup>

  <VDivider class="my-4" />

  <VRadioGroup
    v-model="inlineRadio"
    inline
  >
    <VRadio
      label="Option 1"
      value="radio-1"
    />
    <VRadio
      label="Option 2"
      value="radio-2"
    />
  </VRadioGroup>
</template>
`,js:`<script setup>
const columnRadio = ref('radio-1')
const inlineRadio = ref('radio-1')
<\/script>

<template>
  <VRadioGroup v-model="columnRadio">
    <VRadio
      label="Option 1"
      value="radio-1"
    />
    <VRadio
      label="Option 2"
      value="radio-2"
    />
  </VRadioGroup>

  <VDivider class="my-4" />

  <VRadioGroup
    v-model="inlineRadio"
    inline
  >
    <VRadio
      label="Option 1"
      value="radio-1"
    />
    <VRadio
      label="Option 2"
      value="radio-2"
    />
  </VRadioGroup>
</template>
`},H={ts:`<script lang="ts" setup>
const radios = ref('DuckDuckGo')
<\/script>

<template>
  <VRadioGroup v-model="radios">
    <template #label>
      <div>Your favorite <strong>search engine</strong></div>
    </template>

    <VRadio value="Google">
      <template #label>
        <div>
          Of course it's <span class="text-success">
            Google
          </span>
        </div>
      </template>
    </VRadio>

    <VRadio value="DuckDuckGo">
      <template #label>
        <div>
          Definitely <span class="text-primary">
            DuckDuckGo
          </span>
        </div>
      </template>
    </VRadio>
  </VRadioGroup>
</template>
`,js:`<script setup>
const radios = ref('DuckDuckGo')
<\/script>

<template>
  <VRadioGroup v-model="radios">
    <template #label>
      <div>Your favorite <strong>search engine</strong></div>
    </template>

    <VRadio value="Google">
      <template #label>
        <div>
          Of course it's <span class="text-success">
            Google
          </span>
        </div>
      </template>
    </VRadio>

    <VRadio value="DuckDuckGo">
      <template #label>
        <div>
          Definitely <span class="text-primary">
            DuckDuckGo
          </span>
        </div>
      </template>
    </VRadio>
  </VRadioGroup>
</template>
`},M={ts:`<script lang="ts" setup>
const radioGroup = ref(1)
const rules = [(value: number) => (value !== 3 ? true : 'Do not select the third one!')]
<\/script>

<template>
  <VRadioGroup
    v-model="radioGroup"
    inline
    :rules="rules"
  >
    <VRadio
      v-for="n in 3"
      :key="n"
      :error="radioGroup === 3 "
      :label="\`Radio \${n}\`"
      :value="n"
    />
  </VRadioGroup>
</template>
`,js:`<script setup>
const radioGroup = ref(1)
const rules = [value => value !== 3 ? true : 'Do not select the third one!']
<\/script>

<template>
  <VRadioGroup
    v-model="radioGroup"
    inline
    :rules="rules"
  >
    <VRadio
      v-for="n in 3"
      :key="n"
      :error="radioGroup === 3 "
      :label="\`Radio \${n}\`"
      :value="n"
    />
  </VRadioGroup>
</template>
`},q=a("p",null,[i("The "),a("code",null,"v-radio"),i(" component is a simple radio button.")],-1),z=a("p",null,[i("Radios can be colored by using any of the built-in colors and contextual names using the "),a("code",null,"color"),i(" prop.")],-1),J=a("p",null,[i("Use "),a("code",null,"inline"),i(" prop to displays radio buttons in row.")],-1),K=a("p",null,[i("Use "),a("code",null,"density"),i(" prop to adjusts the spacing within the component. Available options are: "),a("code",null,"default"),i(", "),a("code",null,"comfortable"),i(", and "),a("code",null,"compact"),i(".")],-1),Q=a("p",null,[i("Radio Group labels can be defined in "),a("code",null,"label"),i(" slot - that will allow to use HTML content.")],-1),X=a("p",null,[i("Use "),a("code",null,"false-icon"),i(" and "),a("code",null,"true-icon"),i(" prop to set icon on inactive and active state.")],-1),Z=a("p",null,[i("Use "),a("code",null,"rules"),i(" prop to validate a radio. Accepts a mixed array of types "),a("code",null,"function"),i(", "),a("code",null,"boolean"),i(" and "),a("code",null,"string"),i(". Functions pass an input value as an argument and must return either "),a("code",null,"true"),i(" / "),a("code",null,"false"),i(" or a string containing an error message.")],-1),mo={__name:"radio",setup(v){return(l,r)=>{const d=A,e=$,n=E,D=B,g=j,k=I,O=C,h=L;return u(),b(x,{class:"match-height"},{default:t(()=>[o(V,{cols:"12",md:"6"},{default:t(()=>[o(e,{title:"Basic",code:F},{default:t(()=>[q,o(d)]),_:1},8,["code"])]),_:1}),o(V,{cols:"12",md:"6"},{default:t(()=>[o(e,{title:"Colors",code:N},{default:t(()=>[z,o(n)]),_:1},8,["code"])]),_:1}),o(V,{cols:"12",md:"6"},{default:t(()=>[o(e,{title:"Inline",code:Y},{default:t(()=>[J,o(D)]),_:1},8,["code"])]),_:1}),o(V,{cols:"12",md:"6"},{default:t(()=>[o(e,{title:"Density",code:P},{default:t(()=>[K,o(g)]),_:1},8,["code"])]),_:1}),o(V,{cols:"12",md:"6"},{default:t(()=>[o(e,{title:"Label Slot",code:H},{default:t(()=>[Q,o(k)]),_:1},8,["code"])]),_:1}),o(V,{cols:"12",md:"6"},{default:t(()=>[o(e,{title:"Icon",code:T},{default:t(()=>[X,o(O)]),_:1},8,["code"])]),_:1}),o(V,{cols:"12",md:"6"},{default:t(()=>[o(e,{title:"Validation",code:M},{default:t(()=>[Z,o(h)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{mo as default};
