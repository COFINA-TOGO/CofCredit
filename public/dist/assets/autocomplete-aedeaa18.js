import{_ as f,V as b}from"./AppAutocomplete-a30c0940.js";import{r as S,o as u,f as d,n as g,aW as A,w,e as o,b as e,d as l,v as s}from"./index-7474f5b2.js";import{a as c,V as v}from"./VRow-0990f1b0.js";import{_ as T}from"./AppCardCode-e48f1a17.js";import"./form-1daec3d8.js";import"./VSelect-3104a182.js";import"./VTextField-f506f2c1.js";/* empty css                   */import"./VCounter-13e09909.js";import"./VImg-f2e8baad.js";import"./VField-e8f1f600.js";import"./easing-9f15041e.js";import"./VInput-0a1cf06c.js";import"./forwardRefs-8348545e.js";import"./VList-11197605.js";import"./ssrBoot-6b4d2448.js";import"./VAvatar-60fa6094.js";import"./VDivider-495a0759.js";import"./dialog-transition-7fca3df4.js";import"./VMenu-d68be952.js";import"./VOverlay-0eaff922.js";import"./lazy-a3d78126.js";import"./scopeId-3b168ed5.js";import"./VCheckboxBtn-64a51864.js";import"./VSelectionControl-6ad5757d.js";import"./VChip-188b13af.js";import"./filter-0dc041cf.js";import"./VCard-5a5536f3.js";import"./VCardText-5b1570fa.js";const F={__name:"DemoAutocompleteValidation",setup(h){const a=["foo","bar","fizz","buzz"],i=S(["foo"]),n=[t=>!!t.length||"Select at least one option."];return(t,r)=>{const _=f;return u(),d(_,{modelValue:g(i),"onUpdate:modelValue":r[0]||(r[0]=m=>A(i)?i.value=m:null),items:a,rules:n,placeholder:"Select Option",multiple:""},null,8,["modelValue"])}}},N={__name:"DemoAutocompleteAsyncItems",setup(h){const a=S(!1),i=S(),n=S(null),t=["Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Federated States of Micronesia","Florida","Georgia","Guam","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Marshall Islands","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Northern Mariana Islands","Ohio","Oklahoma","Oregon","Palau","Pennsylvania","Puerto Rico","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virgin Island","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],r=S(t),_=m=>{a.value=!0,setTimeout(()=>{r.value=t.filter(p=>(p||"").toLowerCase().includes((m||"").toLowerCase())),a.value=!1},500)};return w(i,m=>{m&&m!==n.value&&_(m)}),(m,p)=>(u(),d(b,{modelValue:g(n),"onUpdate:modelValue":p[0]||(p[0]=C=>A(n)?n.value=C:null),search:g(i),"onUpdate:search":p[1]||(p[1]=C=>A(i)?i.value=C:null),loading:g(a),items:g(r),placeholder:"Search for a state",label:"What state are you from?",variant:"underlined","menu-props":{maxHeight:"200px"}},null,8,["modelValue","search","loading","items"]))}},M={__name:"DemoAutocompleteCustomFilter",setup(h){const a=[{name:"Florida",abbr:"FL",id:1},{name:"Georgia",abbr:"GA",id:2},{name:"Nebraska",abbr:"NE",id:3},{name:"California",abbr:"CA",id:4},{name:"New York",abbr:"NY",id:5}];function i(n,t,r){const _=r.title.toLowerCase(),m=r.value.toLowerCase(),p=t.toLocaleLowerCase();return _.includes(p)||m.includes(p)}return(n,t)=>{const r=f;return u(),d(r,{label:"States",items:a,"custom-filter":i,"item-title":"name","item-value":"abbr",placeholder:"Select State"})}}},W={__name:"DemoAutocompleteChips",setup(h){const a=["California","Colorado","Florida","Georgia","Texas","Wyoming"];return(i,n)=>{const t=f;return u(),d(t,{label:"States",items:a,placeholder:"Select State",chips:"",multiple:"","closable-chips":""})}}},k={__name:"DemoAutocompleteClearable",setup(h){const a=["California","Colorado","Florida","Georgia","Texas","Wyoming"];return(i,n)=>{const t=f;return u(),d(t,{label:"States",items:a,multiple:"",placeholder:"Select State",clearable:""})}}},D={__name:"DemoAutocompleteMultiple",setup(h){const a=["California","Colorado","Florida","Georgia","Texas","Wyoming"];return(i,n)=>{const t=f;return u(),d(t,{label:"States",items:a,placeholder:"Select State",multiple:"",eager:""})}}},G={__name:"DemoAutocompleteVariant",setup(h){const a=["California","Colorado","Florida","Georgia","Texas","Wyoming"];return(i,n)=>(u(),d(v,null,{default:o(()=>[e(c,{cols:"12",md:"6"},{default:o(()=>[e(b,{variant:"solo",label:"solo",items:a,placeholder:"Select State"})]),_:1}),e(c,{cols:"12",md:"6"},{default:o(()=>[e(b,{variant:"outlined",label:"outlined",placeholder:"Select State",items:a})]),_:1}),e(c,{cols:"12",md:"6"},{default:o(()=>[e(b,{variant:"underlined",label:"underlined",placeholder:"Select State",items:a})]),_:1}),e(c,{cols:"12",md:"6"},{default:o(()=>[e(b,{variant:"filled",label:"filled",placeholder:"Select State",items:a})]),_:1}),e(c,{cols:"12",md:"6"},{default:o(()=>[e(b,{variant:"plain",label:"plain",placeholder:"Select State",items:a})]),_:1})]),_:1}))}},I={__name:"DemoAutocompleteDensity",setup(h){const a=S("Florida"),i=["California","Colorado","Florida","Georgia","Texas","Wyoming"];return(n,t)=>{const r=f;return u(),d(r,{modelValue:g(a),"onUpdate:modelValue":t[0]||(t[0]=_=>A(a)?a.value=_:null),label:"States",density:"compact",placeholder:"Select State",items:i},null,8,["modelValue"])}}},L={__name:"DemoAutocompleteBasic",setup(h){const a=["California","Colorado","Florida","Georgia","Texas","Wyoming"];return(i,n)=>{const t=f;return u(),d(t,{label:"States",items:a,placeholder:"Select State"})}}},q={ts:`<script setup lang="ts">
const loading = ref(false)
const search = ref()
const select = ref(null)

const states = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Federated States of Micronesia',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Marshall Islands',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Northern Mariana Islands',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Palau',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virgin Island',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
]

const items = ref(states)

const querySelections = (query: string) => {
  loading.value = true

  // Simulated ajax query
  setTimeout(() => {
    items.value = states.filter(state => (state || '').toLowerCase().includes((query || '').toLowerCase()))
    loading.value = false
  }, 500)
}

watch(search, query => {
  query && query !== select.value && querySelections(query)
})
<\/script>

<template>
  <VAutocomplete
    v-model="select"
    v-model:search="search"
    :loading="loading"
    :items="items"
    placeholder="Search for a state"
    label="What state are you from?"
    variant="underlined"
    :menu-props="{ maxHeight: '200px' }"
  />
</template>
`,js:`<script setup>
const loading = ref(false)
const search = ref()
const select = ref(null)

const states = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Federated States of Micronesia',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Marshall Islands',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Northern Mariana Islands',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Palau',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virgin Island',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
]

const items = ref(states)

const querySelections = query => {
  loading.value = true

  // Simulated ajax query
  setTimeout(() => {
    items.value = states.filter(state => (state || '').toLowerCase().includes((query || '').toLowerCase()))
    loading.value = false
  }, 500)
}

watch(search, query => {
  query && query !== select.value && querySelections(query)
})
<\/script>

<template>
  <VAutocomplete
    v-model="select"
    v-model:search="search"
    :loading="loading"
    :items="items"
    placeholder="Search for a state"
    label="What state are you from?"
    variant="underlined"
    :menu-props="{ maxHeight: '200px' }"
  />
</template>
`},O={ts:`<script setup lang="ts">
const items = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']
<\/script>

<template>
  <AppAutocomplete
    label="States"
    :items="items"
    placeholder="Select State"
  />
</template>
`,js:`<script setup>
const items = [
  'California',
  'Colorado',
  'Florida',
  'Georgia',
  'Texas',
  'Wyoming',
]
<\/script>

<template>
  <AppAutocomplete
    label="States"
    :items="items"
    placeholder="Select State"
  />
</template>
`},R={ts:`<script setup lang="ts">
const items = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']
<\/script>

<template>
  <AppAutocomplete
    label="States"
    :items="items"
    placeholder="Select State"
    chips
    multiple
    closable-chips
  />
</template>
`,js:`<script setup>
const items = [
  'California',
  'Colorado',
  'Florida',
  'Georgia',
  'Texas',
  'Wyoming',
]
<\/script>

<template>
  <AppAutocomplete
    label="States"
    :items="items"
    placeholder="Select State"
    chips
    multiple
    closable-chips
  />
</template>
`},z={ts:`<script setup lang="ts">
const items = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']
<\/script>

<template>
  <AppAutocomplete
    label="States"
    :items="items"
    multiple
    placeholder="Select State"
    clearable
  />
</template>
`,js:`<script setup>
const items = [
  'California',
  'Colorado',
  'Florida',
  'Georgia',
  'Texas',
  'Wyoming',
]
<\/script>

<template>
  <AppAutocomplete
    label="States"
    :items="items"
    multiple
    placeholder="Select State"
    clearable
  />
</template>
`},j={ts:`<script setup lang="ts">
const states = [
  { name: 'Florida', abbr: 'FL', id: 1 },
  { name: 'Georgia', abbr: 'GA', id: 2 },
  { name: 'Nebraska', abbr: 'NE', id: 3 },
  { name: 'California', abbr: 'CA', id: 4 },
  { name: 'New York', abbr: 'NY', id: 5 },
]

function customFilter(item: string, queryText: string, itemText: { title: string; value: string }) {
  const textOne = itemText.title.toLowerCase()
  const textTwo = itemText.value.toLowerCase()
  const searchText = queryText.toLocaleLowerCase()

  return textOne.includes(searchText) || textTwo.includes(searchText)
}
<\/script>

<template>
  <AppAutocomplete
    label="States"
    :items="states"
    :custom-filter="customFilter"
    item-title="name"
    item-value="abbr"
    placeholder="Select State"
  />
</template>
`,js:`<script setup>
const states = [
  {
    name: 'Florida',
    abbr: 'FL',
    id: 1,
  },
  {
    name: 'Georgia',
    abbr: 'GA',
    id: 2,
  },
  {
    name: 'Nebraska',
    abbr: 'NE',
    id: 3,
  },
  {
    name: 'California',
    abbr: 'CA',
    id: 4,
  },
  {
    name: 'New York',
    abbr: 'NY',
    id: 5,
  },
]

function customFilter(item, queryText, itemText) {
  const textOne = itemText.title.toLowerCase()
  const textTwo = itemText.value.toLowerCase()
  const searchText = queryText.toLocaleLowerCase()
  
  return textOne.includes(searchText) || textTwo.includes(searchText)
}
<\/script>

<template>
  <AppAutocomplete
    label="States"
    :items="states"
    :custom-filter="customFilter"
    item-title="name"
    item-value="abbr"
    placeholder="Select State"
  />
</template>
`},U={ts:`<script setup lang="ts">
const select = ref('Florida')
const items = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']
<\/script>

<template>
  <AppAutocomplete
    v-model="select"
    label="States"
    density="compact"
    placeholder="Select State"
    :items="items"
  />
</template>
`,js:`<script setup>
const select = ref('Florida')

const items = [
  'California',
  'Colorado',
  'Florida',
  'Georgia',
  'Texas',
  'Wyoming',
]
<\/script>

<template>
  <AppAutocomplete
    v-model="select"
    label="States"
    density="compact"
    placeholder="Select State"
    :items="items"
  />
</template>
`},$={ts:`<script setup lang="ts">
const items = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']
<\/script>

<template>
  <AppAutocomplete
    label="States"
    :items="items"
    placeholder="Select State"
    multiple
    eager
  />
</template>
`,js:`<script setup>
const items = [
  'California',
  'Colorado',
  'Florida',
  'Georgia',
  'Texas',
  'Wyoming',
]
<\/script>

<template>
  <AppAutocomplete
    label="States"
    :items="items"
    placeholder="Select State"
    multiple
    eager
  />
</template>
`},P={ts:`<script setup lang="ts">
const items = ['foo', 'bar', 'fizz', 'buzz']
const values = ref(['foo'])
const nameRules = [(v: string) => !!v.length || 'Select at least one option.']
<\/script>

<template>
  <AppAutocomplete
    v-model="values"
    :items="items"
    :rules="nameRules"
    placeholder="Select Option"
    multiple
  />
</template>
`,js:`<script setup>
const items = [
  'foo',
  'bar',
  'fizz',
  'buzz',
]

const values = ref(['foo'])
const nameRules = [v => !!v.length || 'Select at least one option.']
<\/script>

<template>
  <AppAutocomplete
    v-model="values"
    :items="items"
    :rules="nameRules"
    placeholder="Select Option"
    multiple
  />
</template>
`},Y={ts:`<script setup lang="ts">
const items = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']
<\/script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 solo variant  -->
      <VAutocomplete
        variant="solo"
        label="solo"
        :items="items"
        placeholder="Select State"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 outlined variant -->
      <VAutocomplete
        variant="outlined"
        label="outlined"
        placeholder="Select State"
        :items="items"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 underlined variant -->
      <VAutocomplete
        variant="underlined"
        label="underlined"
        placeholder="Select State"
        :items="items"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 filled variant  -->
      <VAutocomplete
        variant="filled"
        label="filled"
        placeholder="Select State"
        :items="items"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!--  👉 plain variant -->
      <VAutocomplete
        variant="plain"
        label="plain"
        placeholder="Select State"
        :items="items"
      />
    </VCol>
  </VRow>
</template>
`,js:`<script setup>
const items = [
  'California',
  'Colorado',
  'Florida',
  'Georgia',
  'Texas',
  'Wyoming',
]
<\/script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 solo variant  -->
      <VAutocomplete
        variant="solo"
        label="solo"
        :items="items"
        placeholder="Select State"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 outlined variant -->
      <VAutocomplete
        variant="outlined"
        label="outlined"
        placeholder="Select State"
        :items="items"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 underlined variant -->
      <VAutocomplete
        variant="underlined"
        label="underlined"
        placeholder="Select State"
        :items="items"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!-- 👉 filled variant  -->
      <VAutocomplete
        variant="filled"
        label="filled"
        placeholder="Select State"
        :items="items"
      />
    </VCol>

    <VCol
      cols="12"
      md="6"
    >
      <!--  👉 plain variant -->
      <VAutocomplete
        variant="plain"
        label="plain"
        placeholder="Select State"
        :items="items"
      />
    </VCol>
  </VRow>
</template>
`},H=l("p",null,[s(" The "),l("code",null," v-autocomplete "),s(" component offers simple and flexible type-ahead functionality. This is useful when searching large sets of data or even dynamically fetching information from an API. ")],-1),B=l("p",null,[s(" You can use "),l("code",null," density "),s(" prop to adjusts vertical spacing within the component. Available options are: "),l("code",null,"default"),s(", "),l("code",null,"comfortable"),s(", and "),l("code",null,"compact"),s(". ")],-1),K=l("p",null,[s("Use "),l("code",null,"solo"),s(", "),l("code",null,"outlined"),s(", "),l("code",null,"underlined"),s(", "),l("code",null,"filled"),s(" and "),l("code",null,"plain"),s(" options of "),l("code",null,"variant"),s(" prop to change the look of Autocomplete. ")],-1),E=l("p",null,[s("Use "),l("code",null,"multiple"),s(" prop to select multiple. Accepts array for value")],-1),J=l("p",null,[s("Use "),l("code",null,"clearable"),s(" prop to add input clear functionality.")],-1),Q=l("p",null,[s("Use "),l("code",null," chips "),s(" prop to use chips in select.")],-1),X=l("p",null,[s("The "),l("code",null," custom-filter "),s(" prop can be used to filter each individual item with custom logic.In example we will filter state based on their name and abbreviations ")],-1),Z=l("p",null,"Sometimes you need to load data externally based upon a search query. ",-1),ee=l("p",null,[s("Use "),l("code",null,"rules"),s(" prop to validate autocomplete. Accepts a mixed array of types function, boolean and string. Functions pass an input value as an argument and must return either true / false or a string containing an error message.")],-1),Me={__name:"autocomplete",setup(h){return(a,i)=>{const n=L,t=T,r=I,_=G,m=D,p=k,C=W,y=M,x=N,V=F;return u(),d(v,{class:"match-height"},{default:o(()=>[e(c,{cols:"12",md:"6"},{default:o(()=>[e(t,{title:"Basic",code:O},{default:o(()=>[H,e(n)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:o(()=>[e(t,{title:"Density",code:U},{default:o(()=>[B,e(r)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"12"},{default:o(()=>[e(t,{title:"Variant",code:Y},{default:o(()=>[K,e(_)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:o(()=>[e(t,{title:"Multiple",code:$},{default:o(()=>[E,e(m)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:o(()=>[e(t,{title:"Clearable",code:z},{default:o(()=>[J,e(p)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:o(()=>[e(t,{title:"Chips",code:R},{default:o(()=>[Q,e(C)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:o(()=>[e(t,{title:"Custom-Filter",code:j},{default:o(()=>[X,e(y)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:o(()=>[e(t,{title:"Async items",code:q},{default:o(()=>[Z,e(x)]),_:1},8,["code"])]),_:1}),e(c,{cols:"12",md:"6"},{default:o(()=>[e(t,{title:"validation",code:P},{default:o(()=>[ee,e(V)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{Me as default};
