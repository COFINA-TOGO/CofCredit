import{_ as R}from"./AppSelect-24b239c9.js";import{_ as W}from"./AppTextField-39a45d2a.js";import{_ as $}from"./AppStepper-54a106b7.js";import{a as d,V as h}from"./VRow-0990f1b0.js";import{V as j}from"./VCard-5a5536f3.js";import{V as N}from"./VCardText-5b1570fa.js";import{V as T}from"./VForm-01a65b20.js";import{V as q,a as C}from"./VWindowItem-3e763b65.js";import{r as b,o as F,f as D,e as o,b as e,d as r,n as l,aW as L,ak as g,a2 as y,v,x as p,c as K,F as J,b0 as E,y as X}from"./index-7474f5b2.js";import{_ as Z}from"./AppCardCode-e48f1a17.js";import{V as P}from"./VDivider-495a0759.js";import{r as k,e as ee,p as le,d as oe,u as z}from"./validators-dea6e3a5.js";import"./form-1daec3d8.js";import"./VSelect-3104a182.js";import"./VTextField-f506f2c1.js";/* empty css                   */import"./VCounter-13e09909.js";import"./VImg-f2e8baad.js";import"./VField-e8f1f600.js";import"./easing-9f15041e.js";import"./VInput-0a1cf06c.js";import"./forwardRefs-8348545e.js";import"./VList-11197605.js";import"./ssrBoot-6b4d2448.js";import"./VAvatar-60fa6094.js";import"./dialog-transition-7fca3df4.js";import"./VMenu-d68be952.js";import"./VOverlay-0eaff922.js";import"./lazy-a3d78126.js";import"./scopeId-3b168ed5.js";import"./VCheckboxBtn-64a51864.js";import"./VSelectionControl-6ad5757d.js";import"./VChip-188b13af.js";import"./VSlideGroupItem-d34e35ca.js";import"./VSlideGroup-ad06999a.js";import"./helpers-61e4df1a.js";const ae={class:"pa-6"},te=r("h6",{class:"text-h6 font-weight-medium"}," Account Details ",-1),se=r("p",{class:"mb-0"}," Enter your Account Details ",-1),re=r("h6",{class:"text-h6 font-weight-medium"}," Personal Info ",-1),de=r("p",{class:"mb-0"}," Setup Information ",-1),ie=r("h6",{class:"text-h6 font-weight-medium"}," Social Links ",-1),ne=r("p",{class:"mb-0"}," Add Social Links ",-1),me={class:"d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8"},ce={__name:"DemoFormWizardIconsModernVertical",setup(U){const S=[{title:"Account Details",icon:"tabler-file-description",subtitle:"Setup account details"},{title:"Personal Info",icon:"tabler-user",subtitle:"Add personal info"},{title:"Social Links",icon:"tabler-link",subtitle:"Add social links"}],n=b(0),V=b(!1),f=b(!1),t=b({username:"",email:"",password:"",cPassword:"",firstName:"",lastName:"",country:void 0,language:void 0,twitter:"",facebook:"",googlePlus:"",linkedIn:""}),_=()=>{console.log(t.value)};return(B,a)=>{const I=$,i=W,w=R;return F(),D(h,null,{default:o(()=>[e(d,{cols:"12",md:"4"},{default:o(()=>[r("div",ae,[e(I,{"current-step":l(n),"onUpdate:currentStep":a[0]||(a[0]=s=>L(n)?n.value=s:null),direction:"vertical",items:S,"icon-size":"24",class:"stepper-icon-step-bg"},null,8,["current-step"])])]),_:1}),e(d,{cols:"12",md:"8"},{default:o(()=>[e(j,null,{default:o(()=>[e(N,null,{default:o(()=>[e(T,null,{default:o(()=>[e(q,{modelValue:l(n),"onUpdate:modelValue":a[15]||(a[15]=s=>L(n)?n.value=s:null),class:"disable-tab-transition"},{default:o(()=>[e(C,null,{default:o(()=>[e(h,null,{default:o(()=>[e(d,{cols:"12"},{default:o(()=>[te,se]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).username,"onUpdate:modelValue":a[1]||(a[1]=s=>l(t).username=s),placeholder:"CarterLeonardo",label:"Username"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).email,"onUpdate:modelValue":a[2]||(a[2]=s=>l(t).email=s),placeholder:"carterleonardo@gmail.com",label:"Email"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).password,"onUpdate:modelValue":a[3]||(a[3]=s=>l(t).password=s),label:"Password",placeholder:"············",type:l(V)?"text":"password","append-inner-icon":l(V)?"tabler-eye-off":"tabler-eye","onClick:appendInner":a[4]||(a[4]=s=>V.value=!l(V))},null,8,["modelValue","type","append-inner-icon"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).cPassword,"onUpdate:modelValue":a[5]||(a[5]=s=>l(t).cPassword=s),label:"Confirm Password",placeholder:"············",type:l(f)?"text":"password","append-inner-icon":l(f)?"tabler-eye-off":"tabler-eye","onClick:appendInner":a[6]||(a[6]=s=>f.value=!l(f))},null,8,["modelValue","type","append-inner-icon"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:o(()=>[e(h,null,{default:o(()=>[e(d,{cols:"12"},{default:o(()=>[re,de]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).firstName,"onUpdate:modelValue":a[7]||(a[7]=s=>l(t).firstName=s),label:"First Name",placeholder:"Leonard"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).lastName,"onUpdate:modelValue":a[8]||(a[8]=s=>l(t).lastName=s),label:"Last Name",placeholder:"Carter"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(w,{modelValue:l(t).country,"onUpdate:modelValue":a[9]||(a[9]=s=>l(t).country=s),label:"Country",placeholder:"Select Country",items:["UK","USA","Canada","Australia","Germany"]},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(w,{modelValue:l(t).language,"onUpdate:modelValue":a[10]||(a[10]=s=>l(t).language=s),label:"Language",placeholder:"Select Language",items:["English","Spanish","French","Russian","German"]},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:o(()=>[e(h,null,{default:o(()=>[e(d,{cols:"12"},{default:o(()=>[ie,ne]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).twitter,"onUpdate:modelValue":a[11]||(a[11]=s=>l(t).twitter=s),placeholder:"https://twitter.com/abc",label:"Twitter"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).facebook,"onUpdate:modelValue":a[12]||(a[12]=s=>l(t).facebook=s),placeholder:"https://facebook.com/abc",label:"Facebook"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).googlePlus,"onUpdate:modelValue":a[13]||(a[13]=s=>l(t).googlePlus=s),placeholder:"https://plus.google.com/abc",label:"Google+"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).linkedIn,"onUpdate:modelValue":a[14]||(a[14]=s=>l(t).linkedIn=s),placeholder:"https://linkedin.com/abc",label:"LinkedIn"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),r("div",me,[e(g,{color:"secondary",variant:"tonal",disabled:l(n)===0,onClick:a[16]||(a[16]=s=>n.value--)},{default:o(()=>[e(y,{icon:"tabler-arrow-left",start:"",class:"flip-in-rtl"}),v(" Previous ")]),_:1},8,["disabled"]),S.length-1===l(n)?(F(),D(g,{key:0,color:"success","append-icon":"tabler-check",onClick:_},{default:o(()=>[v(" submit ")]),_:1})):(F(),D(g,{key:1,onClick:a[17]||(a[17]=s=>n.value++)},{default:o(()=>[v(" Next "),e(y,{icon:"tabler-arrow-right",end:"",class:"flip-in-rtl"})]),_:1}))])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}}},pe={ts:`<script setup lang="ts">
const iconsSteps = [
  {
    title: 'Account Details',
    icon: 'custom-address',
  },
  {
    title: 'Personal Info',
    icon: 'custom-wizard-personal',
  },
  {
    title: 'Address',
    icon: 'custom-wizard-address',
  },
  {
    title: 'Social Links',
    icon: 'custom-wizard-social-link',
  },
  {
    title: 'Review & Submit',
    icon: 'custom-wizard-submit',
  },
]

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)

const formData = ref({
  username: 'johndoe',
  email: 'john.doe@email.com',
  password: 'johndoe@J2',
  cPassword: 'johndoe@J2',
  firstName: 'John',
  lastName: 'Doe',
  country: 'UK',
  language: 'English',
  address: '98 Borough bridge Road, Birmingham',
  landmark: 'Borough bridge',
  pincode: '658921',
  city: 'Birmingham',
  twitter: 'https://twitter.com/abc',
  facebook: 'https://facebook.com/abc',
  googlePlus: 'https://plus.google.com/abc',
  LinkedIn: 'https://linkedin.com/abc',
})

const onSubmit = () => {
  console.log(formData.value)
}
<\/script>

<template>
  <VCard>
    <VCardText>
      <!-- 👉 Stepper -->
      <AppStepper
        v-model:current-step="currentStep"
        :items="iconsSteps"
      />
    </VCardText>

    <VDivider />

    <VCardText>
      <!-- 👉 stepper content -->
      <VForm>
        <VWindow
          v-model="currentStep"
          class="disable-tab-transition"
        >
          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Account Details
                </h6>
                <p class="mb-0">
                  Enter your Account Details
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.username"
                  placeholder="CarterLeonardo"
                  label="Username"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.email"
                  placeholder="carterleonardo@gmail.com"
                  label="Email"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.password"
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
                  v-model="formData.cPassword"
                  label="Confirm Password"
                  placeholder="············"
                  :type="isCPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Personal Info
                </h6>
                <p class="mb-0">
                  Setup Information
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.firstName"
                  label="First Name"
                  placeholder="Leonard"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.lastName"
                  label="Last Name"
                  placeholder="Carter"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="formData.country"
                  label="Country"
                  placeholder="Select Country"
                  :items="['UK', 'USA', 'Canada', 'Australia', 'Germany']"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="formData.language"
                  label="Language"
                  placeholder="Select Language"
                  :items="['English', 'Spanish', 'French', 'Russian', 'German']"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Address
                </h6>
                <p class="mb-0">
                  Enter Your Address.
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.address"
                  placeholder="98 Borough bridge Road, Birmingham"
                  label="Address"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.landmark"
                  placeholder="Borough bridge"
                  label="Landmark"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.pincode"
                  placeholder="658921"
                  label="Pincode"
                  type="number"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.city"
                  placeholder="New York"
                  label="City"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Social Links
                </h6>
                <p class="mb-0">
                  Add Social Links
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.twitter"
                  placeholder="https://twitter.com/abc"
                  label="Twitter"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.facebook"
                  placeholder="https://facebook.com/abc"
                  label="Facebook"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.googlePlus"
                  placeholder="https://plus.google.com/abc"
                  label="Google+"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.LinkedIn"
                  placeholder="https://linkedin.com/abc"
                  label="LinkedIn"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <div class="text-base">
              <h6 class="text-base font-weight-medium mb-2">
                Account
              </h6>

              <p class="mb-1">
                {{ formData.username }}
              </p>
              <p class="mb-1">
                {{ formData.email }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Personal Info
              </h6>

              <p class="mb-1">
                {{ formData.firstName }}
              </p>
              <p class="mb-1">
                {{ formData.lastName }}
              </p>
              <p class="mb-1">
                {{ formData.country }}
              </p>
              <p class="mb-1">
                {{ formData.language }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Address
              </h6>

              <p class="mb-1">
                {{ formData.address }}
              </p>
              <p class="mb-1">
                {{ formData.landmark }}
              </p>
              <p class="mb-1">
                {{ formData.pincode }}
              </p>
              <p class="mb-1">
                {{ formData.city }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Social Links
              </h6>

              <p class="mb-1">
                {{ formData.twitter }}
              </p>
              <p class="mb-1">
                {{ formData.facebook }}
              </p>
              <p class="mb-1">
                {{ formData.googlePlus }}
              </p>
              <p class="mb-1">
                {{ formData.LinkedIn }}
              </p>
            </div>
          </VWindowItem>
        </VWindow>

        <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
          <VBtn
            color="secondary"
            variant="tonal"
            :disabled="currentStep === 0"
            @click="currentStep--"
          >
            <VIcon
              icon="tabler-arrow-left"
              start
              class="flip-in-rtl"
            />
            Previous
          </VBtn>

          <VBtn
            v-if="iconsSteps.length - 1 === currentStep"
            color="success"
            append-icon="tabler-check"
            @click="onSubmit"
          >
            submit
          </VBtn>

          <VBtn
            v-else
            @click="currentStep++"
          >
            Next

            <VIcon
              icon="tabler-arrow-right"
              end
              class="flip-in-rtl"
            />
          </VBtn>
        </div>
      </VForm>
    </VCardText>
  </VCard>
</template>
`,js:`<script setup>
const iconsSteps = [
  {
    title: 'Account Details',
    icon: 'custom-address',
  },
  {
    title: 'Personal Info',
    icon: 'custom-wizard-personal',
  },
  {
    title: 'Address',
    icon: 'custom-wizard-address',
  },
  {
    title: 'Social Links',
    icon: 'custom-wizard-social-link',
  },
  {
    title: 'Review & Submit',
    icon: 'custom-wizard-submit',
  },
]

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)

const formData = ref({
  username: 'johndoe',
  email: 'john.doe@email.com',
  password: 'johndoe@J2',
  cPassword: 'johndoe@J2',
  firstName: 'John',
  lastName: 'Doe',
  country: 'UK',
  language: 'English',
  address: '98 Borough bridge Road, Birmingham',
  landmark: 'Borough bridge',
  pincode: '658921',
  city: 'Birmingham',
  twitter: 'https://twitter.com/abc',
  facebook: 'https://facebook.com/abc',
  googlePlus: 'https://plus.google.com/abc',
  LinkedIn: 'https://linkedin.com/abc',
})

const onSubmit = () => {
  console.log(formData.value)
}
<\/script>

<template>
  <VCard>
    <VCardText>
      <!-- 👉 Stepper -->
      <AppStepper
        v-model:current-step="currentStep"
        :items="iconsSteps"
      />
    </VCardText>

    <VDivider />

    <VCardText>
      <!-- 👉 stepper content -->
      <VForm>
        <VWindow
          v-model="currentStep"
          class="disable-tab-transition"
        >
          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Account Details
                </h6>
                <p class="mb-0">
                  Enter your Account Details
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.username"
                  placeholder="CarterLeonardo"
                  label="Username"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.email"
                  placeholder="carterleonardo@gmail.com"
                  label="Email"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.password"
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
                  v-model="formData.cPassword"
                  label="Confirm Password"
                  placeholder="············"
                  :type="isCPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Personal Info
                </h6>
                <p class="mb-0">
                  Setup Information
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.firstName"
                  label="First Name"
                  placeholder="Leonard"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.lastName"
                  label="Last Name"
                  placeholder="Carter"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="formData.country"
                  label="Country"
                  placeholder="Select Country"
                  :items="['UK', 'USA', 'Canada', 'Australia', 'Germany']"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="formData.language"
                  label="Language"
                  placeholder="Select Language"
                  :items="['English', 'Spanish', 'French', 'Russian', 'German']"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Address
                </h6>
                <p class="mb-0">
                  Enter Your Address.
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.address"
                  placeholder="98 Borough bridge Road, Birmingham"
                  label="Address"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.landmark"
                  placeholder="Borough bridge"
                  label="Landmark"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.pincode"
                  placeholder="658921"
                  label="Pincode"
                  type="number"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.city"
                  placeholder="New York"
                  label="City"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Social Links
                </h6>
                <p class="mb-0">
                  Add Social Links
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.twitter"
                  placeholder="https://twitter.com/abc"
                  label="Twitter"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.facebook"
                  placeholder="https://facebook.com/abc"
                  label="Facebook"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.googlePlus"
                  placeholder="https://plus.google.com/abc"
                  label="Google+"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.LinkedIn"
                  placeholder="https://linkedin.com/abc"
                  label="LinkedIn"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <div class="text-base">
              <h6 class="text-base font-weight-medium mb-2">
                Account
              </h6>

              <p class="mb-1">
                {{ formData.username }}
              </p>
              <p class="mb-1">
                {{ formData.email }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Personal Info
              </h6>

              <p class="mb-1">
                {{ formData.firstName }}
              </p>
              <p class="mb-1">
                {{ formData.lastName }}
              </p>
              <p class="mb-1">
                {{ formData.country }}
              </p>
              <p class="mb-1">
                {{ formData.language }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Address
              </h6>

              <p class="mb-1">
                {{ formData.address }}
              </p>
              <p class="mb-1">
                {{ formData.landmark }}
              </p>
              <p class="mb-1">
                {{ formData.pincode }}
              </p>
              <p class="mb-1">
                {{ formData.city }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Social Links
              </h6>

              <p class="mb-1">
                {{ formData.twitter }}
              </p>
              <p class="mb-1">
                {{ formData.facebook }}
              </p>
              <p class="mb-1">
                {{ formData.googlePlus }}
              </p>
              <p class="mb-1">
                {{ formData.LinkedIn }}
              </p>
            </div>
          </VWindowItem>
        </VWindow>

        <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
          <VBtn
            color="secondary"
            variant="tonal"
            :disabled="currentStep === 0"
            @click="currentStep--"
          >
            <VIcon
              icon="tabler-arrow-left"
              start
              class="flip-in-rtl"
            />
            Previous
          </VBtn>

          <VBtn
            v-if="iconsSteps.length - 1 === currentStep"
            color="success"
            append-icon="tabler-check"
            @click="onSubmit"
          >
            submit
          </VBtn>

          <VBtn
            v-else
            @click="currentStep++"
          >
            Next

            <VIcon
              icon="tabler-arrow-right"
              end
              class="flip-in-rtl"
            />
          </VBtn>
        </div>
      </VForm>
    </VCardText>
  </VCard>
</template>
`},ue={ts:`<script setup lang="ts">
const iconsSteps = [
  {
    title: 'Account Details',
    icon: 'custom-address',
  },
  {
    title: 'Personal Info',
    icon: 'custom-wizard-personal',
  },
  {
    title: 'Address',
    icon: 'custom-wizard-address',
  },
  {
    title: 'Social Links',
    icon: 'custom-wizard-social-link',
  },
  {
    title: 'Review & Submit',
    icon: 'custom-wizard-submit',
  },
]

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)

const formData = ref({
  username: 'johndoe',
  email: 'john.doe@email.com',
  password: 'johndoe@J2',
  cPassword: 'johndoe@J2',
  firstName: 'John',
  lastName: 'Doe',
  country: 'UK',
  language: 'English',
  address: '98 Borough bridge Road, Birmingham',
  landmark: 'Borough bridge',
  pincode: '658921',
  city: 'Birmingham',
  twitter: 'https://twitter.com/abc',
  facebook: 'https://facebook.com/abc',
  googlePlus: 'https://plus.google.com/abc',
  LinkedIn: 'https://linkedin.com/abc',
})

const onSubmit = () => {
  console.log(formData.value)
}
<\/script>

<template>
  <!-- 👉 Stepper -->
  <div class="mb-6">
    <AppStepper
      v-model:current-step="currentStep"
      :items="iconsSteps"
    />
  </div>

  <VCard>
    <VCardText>
      <!-- 👉 stepper content -->
      <VForm>
        <VWindow
          v-model="currentStep"
          class="disable-tab-transition"
        >
          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Account Details
                </h6>
                <p class="mb-0">
                  Enter your Account Details
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.username"
                  placeholder="CarterLeonardo"
                  label="Username"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.email"
                  placeholder="carterleonardo@gmail.com"
                  label="Email"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.password"
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
                  v-model="formData.cPassword"
                  label="Confirm Password"
                  placeholder="············"
                  :type="isCPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Personal Info
                </h6>
                <p class="mb-0">
                  Setup Information
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.firstName"
                  label="First Name"
                  placeholder="Leonard"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.lastName"
                  label="Last Name"
                  placeholder="Carter"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="formData.country"
                  label="Country"
                  placeholder="Select Country"
                  :items="['UK', 'USA', 'Canada', 'Australia', 'Germany']"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="formData.language"
                  label="Language"
                  placeholder="Select Language"
                  :items="['English', 'Spanish', 'French', 'Russian', 'German']"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Address
                </h6>
                <p class="mb-0">
                  Enter Your Address.
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.address"
                  placeholder="98 Borough bridge Road, Birmingham"
                  label="Address"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.landmark"
                  placeholder="Borough bridge"
                  label="Landmark"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.pincode"
                  placeholder="658921"
                  label="Pincode"
                  type="number"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.city"
                  placeholder="New York"
                  label="City"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Social Links
                </h6>
                <p class="mb-0">
                  Add Social Links
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.twitter"
                  placeholder="https://twitter.com/abc"
                  label="Twitter"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.facebook"
                  placeholder="https://facebook.com/abc"
                  label="Facebook"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.googlePlus"
                  placeholder="https://plus.google.com/abc"
                  label="Google+"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.LinkedIn"
                  placeholder="https://linkedin.com/abc"
                  label="LinkedIn"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <div class="text-base">
              <h6 class="text-base font-weight-medium mb-2">
                Account
              </h6>

              <p class="mb-1">
                {{ formData.username }}
              </p>
              <p class="mb-1">
                {{ formData.email }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Personal Info
              </h6>

              <p class="mb-1">
                {{ formData.firstName }}
              </p>
              <p class="mb-1">
                {{ formData.lastName }}
              </p>
              <p class="mb-1">
                {{ formData.country }}
              </p>
              <p class="mb-1">
                {{ formData.language }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Address
              </h6>

              <p class="mb-1">
                {{ formData.address }}
              </p>
              <p class="mb-1">
                {{ formData.landmark }}
              </p>
              <p class="mb-1">
                {{ formData.pincode }}
              </p>
              <p class="mb-1">
                {{ formData.city }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Social Links
              </h6>

              <p class="mb-1">
                {{ formData.twitter }}
              </p>
              <p class="mb-1">
                {{ formData.facebook }}
              </p>
              <p class="mb-1">
                {{ formData.googlePlus }}
              </p>
              <p class="mb-1">
                {{ formData.LinkedIn }}
              </p>
            </div>
          </VWindowItem>
        </VWindow>

        <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
          <VBtn
            color="secondary"
            variant="tonal"
            :disabled="currentStep === 0"
            @click="currentStep--"
          >
            <VIcon
              icon="tabler-arrow-left"
              start
              class="flip-in-rtl"
            />
            Previous
          </VBtn>

          <VBtn
            v-if="iconsSteps.length - 1 === currentStep"
            color="success"
            append-icon="tabler-check"
            @click="onSubmit"
          >
            submit
          </VBtn>

          <VBtn
            v-else
            @click="currentStep++"
          >
            Next

            <VIcon
              icon="tabler-arrow-right"
              end
              class="flip-in-rtl"
            />
          </VBtn>
        </div>
      </VForm>
    </VCardText>
  </VCard>
</template>
`,js:`<script setup>
const iconsSteps = [
  {
    title: 'Account Details',
    icon: 'custom-address',
  },
  {
    title: 'Personal Info',
    icon: 'custom-wizard-personal',
  },
  {
    title: 'Address',
    icon: 'custom-wizard-address',
  },
  {
    title: 'Social Links',
    icon: 'custom-wizard-social-link',
  },
  {
    title: 'Review & Submit',
    icon: 'custom-wizard-submit',
  },
]

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)

const formData = ref({
  username: 'johndoe',
  email: 'john.doe@email.com',
  password: 'johndoe@J2',
  cPassword: 'johndoe@J2',
  firstName: 'John',
  lastName: 'Doe',
  country: 'UK',
  language: 'English',
  address: '98 Borough bridge Road, Birmingham',
  landmark: 'Borough bridge',
  pincode: '658921',
  city: 'Birmingham',
  twitter: 'https://twitter.com/abc',
  facebook: 'https://facebook.com/abc',
  googlePlus: 'https://plus.google.com/abc',
  LinkedIn: 'https://linkedin.com/abc',
})

const onSubmit = () => {
  console.log(formData.value)
}
<\/script>

<template>
  <!-- 👉 Stepper -->
  <div class="mb-6">
    <AppStepper
      v-model:current-step="currentStep"
      :items="iconsSteps"
    />
  </div>

  <VCard>
    <VCardText>
      <!-- 👉 stepper content -->
      <VForm>
        <VWindow
          v-model="currentStep"
          class="disable-tab-transition"
        >
          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Account Details
                </h6>
                <p class="mb-0">
                  Enter your Account Details
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.username"
                  placeholder="CarterLeonardo"
                  label="Username"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.email"
                  placeholder="carterleonardo@gmail.com"
                  label="Email"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.password"
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
                  v-model="formData.cPassword"
                  label="Confirm Password"
                  placeholder="············"
                  :type="isCPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Personal Info
                </h6>
                <p class="mb-0">
                  Setup Information
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.firstName"
                  label="First Name"
                  placeholder="Leonard"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.lastName"
                  label="Last Name"
                  placeholder="Carter"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="formData.country"
                  label="Country"
                  placeholder="Select Country"
                  :items="['UK', 'USA', 'Canada', 'Australia', 'Germany']"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="formData.language"
                  label="Language"
                  placeholder="Select Language"
                  :items="['English', 'Spanish', 'French', 'Russian', 'German']"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Address
                </h6>
                <p class="mb-0">
                  Enter Your Address.
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.address"
                  placeholder="98 Borough bridge Road, Birmingham"
                  label="Address"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.landmark"
                  placeholder="Borough bridge"
                  label="Landmark"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.pincode"
                  placeholder="658921"
                  label="Pincode"
                  type="number"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.city"
                  placeholder="New York"
                  label="City"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Social Links
                </h6>
                <p class="mb-0">
                  Add Social Links
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.twitter"
                  placeholder="https://twitter.com/abc"
                  label="Twitter"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.facebook"
                  placeholder="https://facebook.com/abc"
                  label="Facebook"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.googlePlus"
                  placeholder="https://plus.google.com/abc"
                  label="Google+"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="formData.LinkedIn"
                  placeholder="https://linkedin.com/abc"
                  label="LinkedIn"
                />
              </VCol>
            </VRow>
          </VWindowItem>

          <VWindowItem>
            <div class="text-base">
              <h6 class="text-base font-weight-medium mb-2">
                Account
              </h6>

              <p class="mb-1">
                {{ formData.username }}
              </p>
              <p class="mb-1">
                {{ formData.email }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Personal Info
              </h6>

              <p class="mb-1">
                {{ formData.firstName }}
              </p>
              <p class="mb-1">
                {{ formData.lastName }}
              </p>
              <p class="mb-1">
                {{ formData.country }}
              </p>
              <p class="mb-1">
                {{ formData.language }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Address
              </h6>

              <p class="mb-1">
                {{ formData.address }}
              </p>
              <p class="mb-1">
                {{ formData.landmark }}
              </p>
              <p class="mb-1">
                {{ formData.pincode }}
              </p>
              <p class="mb-1">
                {{ formData.city }}
              </p>

              <VDivider class="my-4" />

              <h6 class="text-base font-weight-medium mb-2">
                Social Links
              </h6>

              <p class="mb-1">
                {{ formData.twitter }}
              </p>
              <p class="mb-1">
                {{ formData.facebook }}
              </p>
              <p class="mb-1">
                {{ formData.googlePlus }}
              </p>
              <p class="mb-1">
                {{ formData.LinkedIn }}
              </p>
            </div>
          </VWindowItem>
        </VWindow>

        <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
          <VBtn
            color="secondary"
            variant="tonal"
            :disabled="currentStep === 0"
            @click="currentStep--"
          >
            <VIcon
              icon="tabler-arrow-left"
              start
              class="flip-in-rtl"
            />
            Previous
          </VBtn>

          <VBtn
            v-if="iconsSteps.length - 1 === currentStep"
            color="success"
            append-icon="tabler-check"
            @click="onSubmit"
          >
            submit
          </VBtn>

          <VBtn
            v-else
            @click="currentStep++"
          >
            Next

            <VIcon
              icon="tabler-arrow-right"
              end
              class="flip-in-rtl"
            />
          </VBtn>
        </div>
      </VForm>
    </VCardText>
  </VCard>
</template>
`},Ve={ts:`<script setup lang="ts">
const numberedSteps = [
  {
    title: 'Account Details',
    icon: 'tabler-file-description',
    subtitle: 'Setup account details',
  },
  {
    title: 'Personal Info',
    icon: 'tabler-user',
    subtitle: 'Add personal info',
  },
  {
    title: 'Social Links',
    icon: 'tabler-link',
    subtitle: 'Add social links',
  },
]

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)

const formData = ref({
  username: '',
  email: '',
  password: '',
  cPassword: '',
  firstName: '',
  lastName: '',
  country: undefined,
  language: undefined,
  twitter: '',
  facebook: '',
  googlePlus: '',
  LinkedIn: '',

})

const onSubmit = () => {
  console.log(formData.value)
}
<\/script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="4"
    >
      <!-- 👉 Stepper -->
      <div class="pa-6">
        <AppStepper
          v-model:current-step="currentStep"
          direction="vertical"
          :items="numberedSteps"
          icon-size="24"
          class="stepper-icon-step-bg"
        />
      </div>
    </VCol>

    <!-- 👉 stepper content -->
    <VCol
      cols="12"
      md="8"
    >
      <VCard>
        <VCardText>
          <VForm>
            <VWindow
              v-model="currentStep"
              class="disable-tab-transition"
            >
              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      Account Details
                    </h6>
                    <p class="mb-0">
                      Enter your Account Details
                    </p>
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.username"
                      placeholder="CarterLeonardo"
                      label="Username"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.email"
                      placeholder="carterleonardo@gmail.com"
                      label="Email"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.password"
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
                      v-model="formData.cPassword"
                      label="Confirm Password"
                      placeholder="············"
                      :type="isCPasswordVisible ? 'text' : 'password'"
                      :append-inner-icon="isCPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                      @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>
              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      Personal Info
                    </h6>
                    <p class="mb-0">
                      Setup Information
                    </p>
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.firstName"
                      label="First Name"
                      placeholder="Leonard"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.lastName"
                      label="Last Name"
                      placeholder="Carter"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppSelect
                      v-model="formData.country"
                      label="Country"
                      placeholder="Select Country"
                      :items="['UK', 'USA', 'Canada', 'Australia', 'Germany']"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppSelect
                      v-model="formData.language"
                      label="Language"
                      placeholder="Select Language"
                      :items="['English', 'Spanish', 'French', 'Russian', 'German']"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>
              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      Social Links
                    </h6>
                    <p class="mb-0">
                      Add Social Links
                    </p>
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.twitter"
                      placeholder="https://twitter.com/abc"
                      label="Twitter"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.facebook"
                      placeholder="https://facebook.com/abc"
                      label="Facebook"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.googlePlus"
                      placeholder="https://plus.google.com/abc"
                      label="Google+"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.LinkedIn"
                      placeholder="https://linkedin.com/abc"
                      label="LinkedIn"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>
            </VWindow>
            <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
              <VBtn
                color="secondary"
                variant="tonal"
                :disabled="currentStep === 0"
                @click="currentStep--"
              >
                <VIcon
                  icon="tabler-arrow-left"
                  start
                  class="flip-in-rtl"
                />
                Previous
              </VBtn>
              <VBtn
                v-if="numberedSteps.length - 1 === currentStep"
                color="success"
                append-icon="tabler-check"
                @click="onSubmit"
              >
                submit
              </VBtn>
              <VBtn
                v-else
                @click="currentStep++"
              >
                Next
                <VIcon
                  icon="tabler-arrow-right"
                  end
                  class="flip-in-rtl"
                />
              </VBtn>
            </div>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
`,js:`<script setup>
const numberedSteps = [
  {
    title: 'Account Details',
    icon: 'tabler-file-description',
    subtitle: 'Setup account details',
  },
  {
    title: 'Personal Info',
    icon: 'tabler-user',
    subtitle: 'Add personal info',
  },
  {
    title: 'Social Links',
    icon: 'tabler-link',
    subtitle: 'Add social links',
  },
]

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)

const formData = ref({
  username: '',
  email: '',
  password: '',
  cPassword: '',
  firstName: '',
  lastName: '',
  country: undefined,
  language: undefined,
  twitter: '',
  facebook: '',
  googlePlus: '',
  LinkedIn: '',
})

const onSubmit = () => {
  console.log(formData.value)
}
<\/script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="4"
    >
      <!-- 👉 Stepper -->
      <div class="pa-6">
        <AppStepper
          v-model:current-step="currentStep"
          direction="vertical"
          :items="numberedSteps"
          icon-size="24"
          class="stepper-icon-step-bg"
        />
      </div>
    </VCol>

    <!-- 👉 stepper content -->
    <VCol
      cols="12"
      md="8"
    >
      <VCard>
        <VCardText>
          <VForm>
            <VWindow
              v-model="currentStep"
              class="disable-tab-transition"
            >
              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      Account Details
                    </h6>
                    <p class="mb-0">
                      Enter your Account Details
                    </p>
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.username"
                      placeholder="CarterLeonardo"
                      label="Username"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.email"
                      placeholder="carterleonardo@gmail.com"
                      label="Email"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.password"
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
                      v-model="formData.cPassword"
                      label="Confirm Password"
                      placeholder="············"
                      :type="isCPasswordVisible ? 'text' : 'password'"
                      :append-inner-icon="isCPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                      @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>
              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      Personal Info
                    </h6>
                    <p class="mb-0">
                      Setup Information
                    </p>
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.firstName"
                      label="First Name"
                      placeholder="Leonard"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.lastName"
                      label="Last Name"
                      placeholder="Carter"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppSelect
                      v-model="formData.country"
                      label="Country"
                      placeholder="Select Country"
                      :items="['UK', 'USA', 'Canada', 'Australia', 'Germany']"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppSelect
                      v-model="formData.language"
                      label="Language"
                      placeholder="Select Language"
                      :items="['English', 'Spanish', 'French', 'Russian', 'German']"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>
              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      Social Links
                    </h6>
                    <p class="mb-0">
                      Add Social Links
                    </p>
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.twitter"
                      placeholder="https://twitter.com/abc"
                      label="Twitter"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.facebook"
                      placeholder="https://facebook.com/abc"
                      label="Facebook"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.googlePlus"
                      placeholder="https://plus.google.com/abc"
                      label="Google+"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.LinkedIn"
                      placeholder="https://linkedin.com/abc"
                      label="LinkedIn"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>
            </VWindow>
            <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
              <VBtn
                color="secondary"
                variant="tonal"
                :disabled="currentStep === 0"
                @click="currentStep--"
              >
                <VIcon
                  icon="tabler-arrow-left"
                  start
                  class="flip-in-rtl"
                />
                Previous
              </VBtn>
              <VBtn
                v-if="numberedSteps.length - 1 === currentStep"
                color="success"
                append-icon="tabler-check"
                @click="onSubmit"
              >
                submit
              </VBtn>
              <VBtn
                v-else
                @click="currentStep++"
              >
                Next
                <VIcon
                  icon="tabler-arrow-right"
                  end
                  class="flip-in-rtl"
                />
              </VBtn>
            </div>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
`},be={ts:`<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'

const iconsSteps = [
  {
    title: 'Account Details',
    icon: 'custom-wizard-account',
  },
  {
    title: 'Personal Info',
    icon: 'custom-wizard-personal',
  },
  {
    title: 'Address',
    icon: 'custom-wizard-address',
  },
  {
    title: 'Social Links',
    icon: 'custom-wizard-social-link',
  },
  {
    title: 'Review & Submit',
    icon: 'custom-wizard-submit',
  },
]

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)
const isCurrentStepValid = ref(true)
const refAccountForm = ref<VForm>()
const refPersonalForm = ref<VForm>()
const refSocialLinkForm = ref<VForm>()
const refAddressForm = ref<VForm>()

const accountForm = ref({
  username: '',
  email: '',
  password: '',
  cPassword: '',
})

const personalForm = ref({
  firstName: '',
  lastName: '',
  country: undefined,
  language: undefined,
})

const socialForm = ref({
  twitter: '',
  facebook: '',
  googlePlus: '',
  LinkedIn: '',
})

const addressForm = ref({
  address: '',
  landmark: '',
  city: '',
  pincode: '',
})

const validateAccountForm = () => {
  refAccountForm.value?.validate().then(valid => {
    if (valid.valid) {
      currentStep.value++
      isCurrentStepValid.value = true
    }
    else { isCurrentStepValid.value = false }
  })
}

const validatePersonalForm = () => {
  refPersonalForm.value?.validate().then(valid => {
    if (valid.valid) {
      currentStep.value++
      isCurrentStepValid.value = true
    }
    else { isCurrentStepValid.value = false }
  })
}

const validateAddressForm = () => {
  refAddressForm.value?.validate().then(valid => {
    if (valid.valid) {
      currentStep.value++
      isCurrentStepValid.value = true
    }
    else { isCurrentStepValid.value = false }
  })
}

const validateSocialLinkForm = () => {
  refSocialLinkForm.value?.validate().then(valid => {
    if (valid.valid) {
      currentStep.value++
      isCurrentStepValid.value = true
    }
    else { isCurrentStepValid.value = false }
  })
}
<\/script>

<template>
  <VCard>
    <VCardText>
      <!-- 👉 Stepper -->
      <AppStepper
        v-model:current-step="currentStep"
        :items="iconsSteps"
        :is-active-step-valid="isCurrentStepValid"
      />
    </VCardText>

    <VDivider />

    <VCardText>
      <!-- 👉 stepper content -->

      <VWindow
        v-model="currentStep"
        class="disable-tab-transition"
      >
        <VWindowItem>
          <VForm
            ref="refAccountForm"
            @submit.prevent="validateAccountForm"
          >
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Account Details
                </h6>
                <p class="mb-0">
                  Enter your Account Details
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountForm.username"
                  placeholder="CarterLeonardo"
                  :rules="[requiredValidator]"
                  label="Username"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountForm.email"
                  placeholder="carterleonardo@gmail.com"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountForm.password"
                  placeholder="············"
                  label="Password"
                  :rules="[requiredValidator, passwordValidator]"
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
                  v-model="accountForm.cPassword"
                  placeholder="············"
                  label="Confirm Password"
                  :rules="[requiredValidator, confirmedValidator(accountForm.cPassword, accountForm.password)]"
                  :type="isCPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                />
              </VCol>

              <VCol cols="12">
                <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    disabled
                  >
                    <VIcon
                      icon="tabler-arrow-left"
                      start
                      class="flip-in-rtl"
                    />
                    Previous
                  </VBtn>

                  <VBtn type="submit">
                    Next
                    <VIcon
                      icon="tabler-arrow-right"
                      end
                      class="flip-in-rtl"
                    />
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem>
          <VForm
            ref="refPersonalForm"
            @submit.prevent="validatePersonalForm"
          >
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Personal Info
                </h6>
                <p class="mb-0">
                  Setup Information
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="personalForm.firstName"
                  label="First Name"
                  :rules="[requiredValidator]"
                  placeholder="Leonard"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="personalForm.lastName"
                  label="Last Name"
                  :rules="[requiredValidator]"
                  placeholder="Carter"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="personalForm.country"
                  label="Country"
                  :rules="[requiredValidator]"
                  placeholder="Select Country"
                  :items="['UK', 'USA', 'Canada', 'Australia', 'Germany']"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="personalForm.language"
                  label="Language"
                  :rules="[requiredValidator]"
                  placeholder="Select Language"
                  :items="['English', 'Spanish', 'French', 'Russian', 'German']"
                />
              </VCol>

              <VCol cols="12">
                <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    @click="currentStep--"
                  >
                    <VIcon
                      icon="tabler-arrow-left"
                      start
                      class="flip-in-rtl"
                    />
                    Previous
                  </VBtn>

                  <VBtn type="submit">
                    Next
                    <VIcon
                      icon="tabler-arrow-right"
                      end
                      class="flip-in-rtl"
                    />
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem>
          <VForm
            ref="refAddressForm"
            @submit.prevent="validateAddressForm"
          >
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Address
                </h6>
                <p class="mb-0">
                  Enter Your Address.
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="addressForm.address"
                  :rules="[requiredValidator]"
                  placeholder="98 Borough bridge Road, Birmingham"
                  label="Address"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="addressForm.landmark"
                  :rules="[requiredValidator]"
                  placeholder="Borough bridge"
                  label="Landmark"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="addressForm.pincode"
                  :rules="[requiredValidator]"
                  placeholder="658921"
                  label="Pincode"
                  type="number"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="addressForm.city"
                  :rules="[requiredValidator]"
                  placeholder="New York"
                  label="City"
                />
              </VCol>

              <VCol cols="12">
                <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    @click="currentStep--"
                  >
                    <VIcon
                      icon="tabler-arrow-left"
                      start
                      class="flip-in-rtl"
                    />
                    Previous
                  </VBtn>

                  <VBtn type="submit">
                    Next
                    <VIcon
                      icon="tabler-arrow-right"
                      end
                      class="flip-in-rtl"
                    />
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem>
          <VForm
            ref="refSocialLinkForm"
            @submit.prevent="validateSocialLinkForm"
          >
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Social Links
                </h6>
                <p class="mb-0">
                  Add Social Links
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="socialForm.twitter"
                  placeholder="https://twitter.com/abc"
                  :rules="[requiredValidator, urlValidator]"
                  label="Twitter"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="socialForm.facebook"
                  placeholder="https://facebook.com/abc"
                  :rules="[requiredValidator, urlValidator]"
                  label="Facebook"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="socialForm.googlePlus"
                  placeholder="https://plus.google.com/abc"
                  :rules="[requiredValidator, urlValidator]"
                  label="Google+"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="socialForm.LinkedIn"
                  placeholder="https://linkedin.com/abc"
                  :rules="[requiredValidator, urlValidator]"
                  label="LinkedIn"
                />
              </VCol>

              <VCol cols="12">
                <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    @click="currentStep--"
                  >
                    <VIcon
                      icon="tabler-arrow-left"
                      start
                      class="flip-in-rtl"
                    />
                    Previous
                  </VBtn>

                  <VBtn type="submit">
                    Next
                    <VIcon
                      icon="tabler-arrow-right"
                      end
                      class="flip-in-rtl"
                    />
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem>
          <div class="text-base">
            <h6 class="text-base font-weight-medium mb-2">
              Account
            </h6>

            <p class="mb-1">
              {{ accountForm.username }}
            </p>
            <p class="mb-1">
              {{ accountForm.email }}
            </p>

            <VDivider class="my-4" />

            <h6 class="text-base font-weight-medium mb-2">
              Personal Info
            </h6>

            <p class="mb-1">
              {{ personalForm.firstName }}
            </p>
            <p class="mb-1">
              {{ personalForm.lastName }}
            </p>
            <p class="mb-1">
              {{ personalForm.country }}
            </p>
            <p class="mb-1">
              {{ personalForm.language }}
            </p>

            <VDivider class="my-4" />

            <h6 class="text-base font-weight-medium mb-2">
              Address
            </h6>

            <p class="mb-1">
              {{ addressForm.address }}
            </p>
            <p class="mb-1">
              {{ addressForm.landmark }}
            </p>
            <p class="mb-1">
              {{ addressForm.pincode }}
            </p>
            <p class="mb-1">
              {{ addressForm.city }}
            </p>

            <VDivider class="my-4" />

            <h6 class="text-base font-weight-medium mb-2">
              Social Links
            </h6>

            <p class="mb-1">
              {{ socialForm.twitter }}
            </p>
            <p class="mb-1">
              {{ socialForm.facebook }}
            </p>
            <p class="mb-1">
              {{ socialForm.googlePlus }}
            </p>
            <p class="mb-1">
              {{ socialForm.LinkedIn }}
            </p>
          </div>
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
`,js:`<script setup>
import { VForm } from 'vuetify/components/VForm'

const iconsSteps = [
  {
    title: 'Account Details',
    icon: 'custom-wizard-account',
  },
  {
    title: 'Personal Info',
    icon: 'custom-wizard-personal',
  },
  {
    title: 'Address',
    icon: 'custom-wizard-address',
  },
  {
    title: 'Social Links',
    icon: 'custom-wizard-social-link',
  },
  {
    title: 'Review & Submit',
    icon: 'custom-wizard-submit',
  },
]

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)
const isCurrentStepValid = ref(true)
const refAccountForm = ref()
const refPersonalForm = ref()
const refSocialLinkForm = ref()
const refAddressForm = ref()

const accountForm = ref({
  username: '',
  email: '',
  password: '',
  cPassword: '',
})

const personalForm = ref({
  firstName: '',
  lastName: '',
  country: undefined,
  language: undefined,
})

const socialForm = ref({
  twitter: '',
  facebook: '',
  googlePlus: '',
  LinkedIn: '',
})

const addressForm = ref({
  address: '',
  landmark: '',
  city: '',
  pincode: '',
})

const validateAccountForm = () => {
  refAccountForm.value?.validate().then(valid => {
    if (valid.valid) {
      currentStep.value++
      isCurrentStepValid.value = true
    } else {
      isCurrentStepValid.value = false
    }
  })
}

const validatePersonalForm = () => {
  refPersonalForm.value?.validate().then(valid => {
    if (valid.valid) {
      currentStep.value++
      isCurrentStepValid.value = true
    } else {
      isCurrentStepValid.value = false
    }
  })
}

const validateAddressForm = () => {
  refAddressForm.value?.validate().then(valid => {
    if (valid.valid) {
      currentStep.value++
      isCurrentStepValid.value = true
    } else {
      isCurrentStepValid.value = false
    }
  })
}

const validateSocialLinkForm = () => {
  refSocialLinkForm.value?.validate().then(valid => {
    if (valid.valid) {
      currentStep.value++
      isCurrentStepValid.value = true
    } else {
      isCurrentStepValid.value = false
    }
  })
}
<\/script>

<template>
  <VCard>
    <VCardText>
      <!-- 👉 Stepper -->
      <AppStepper
        v-model:current-step="currentStep"
        :items="iconsSteps"
        :is-active-step-valid="isCurrentStepValid"
      />
    </VCardText>

    <VDivider />

    <VCardText>
      <!-- 👉 stepper content -->

      <VWindow
        v-model="currentStep"
        class="disable-tab-transition"
      >
        <VWindowItem>
          <VForm
            ref="refAccountForm"
            @submit.prevent="validateAccountForm"
          >
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Account Details
                </h6>
                <p class="mb-0">
                  Enter your Account Details
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountForm.username"
                  placeholder="CarterLeonardo"
                  :rules="[requiredValidator]"
                  label="Username"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountForm.email"
                  placeholder="carterleonardo@gmail.com"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountForm.password"
                  placeholder="············"
                  label="Password"
                  :rules="[requiredValidator, passwordValidator]"
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
                  v-model="accountForm.cPassword"
                  placeholder="············"
                  label="Confirm Password"
                  :rules="[requiredValidator, confirmedValidator(accountForm.cPassword, accountForm.password)]"
                  :type="isCPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                />
              </VCol>

              <VCol cols="12">
                <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    disabled
                  >
                    <VIcon
                      icon="tabler-arrow-left"
                      start
                      class="flip-in-rtl"
                    />
                    Previous
                  </VBtn>

                  <VBtn type="submit">
                    Next
                    <VIcon
                      icon="tabler-arrow-right"
                      end
                      class="flip-in-rtl"
                    />
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem>
          <VForm
            ref="refPersonalForm"
            @submit.prevent="validatePersonalForm"
          >
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Personal Info
                </h6>
                <p class="mb-0">
                  Setup Information
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="personalForm.firstName"
                  label="First Name"
                  :rules="[requiredValidator]"
                  placeholder="Leonard"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="personalForm.lastName"
                  label="Last Name"
                  :rules="[requiredValidator]"
                  placeholder="Carter"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="personalForm.country"
                  label="Country"
                  :rules="[requiredValidator]"
                  placeholder="Select Country"
                  :items="['UK', 'USA', 'Canada', 'Australia', 'Germany']"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="personalForm.language"
                  label="Language"
                  :rules="[requiredValidator]"
                  placeholder="Select Language"
                  :items="['English', 'Spanish', 'French', 'Russian', 'German']"
                />
              </VCol>

              <VCol cols="12">
                <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    @click="currentStep--"
                  >
                    <VIcon
                      icon="tabler-arrow-left"
                      start
                      class="flip-in-rtl"
                    />
                    Previous
                  </VBtn>

                  <VBtn type="submit">
                    Next
                    <VIcon
                      icon="tabler-arrow-right"
                      end
                      class="flip-in-rtl"
                    />
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem>
          <VForm
            ref="refAddressForm"
            @submit.prevent="validateAddressForm"
          >
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Address
                </h6>
                <p class="mb-0">
                  Enter Your Address.
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="addressForm.address"
                  :rules="[requiredValidator]"
                  placeholder="98 Borough bridge Road, Birmingham"
                  label="Address"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="addressForm.landmark"
                  :rules="[requiredValidator]"
                  placeholder="Borough bridge"
                  label="Landmark"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="addressForm.pincode"
                  :rules="[requiredValidator]"
                  placeholder="658921"
                  label="Pincode"
                  type="number"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="addressForm.city"
                  :rules="[requiredValidator]"
                  placeholder="New York"
                  label="City"
                />
              </VCol>

              <VCol cols="12">
                <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    @click="currentStep--"
                  >
                    <VIcon
                      icon="tabler-arrow-left"
                      start
                      class="flip-in-rtl"
                    />
                    Previous
                  </VBtn>

                  <VBtn type="submit">
                    Next
                    <VIcon
                      icon="tabler-arrow-right"
                      end
                      class="flip-in-rtl"
                    />
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem>
          <VForm
            ref="refSocialLinkForm"
            @submit.prevent="validateSocialLinkForm"
          >
            <VRow>
              <VCol cols="12">
                <h6 class="text-h6 font-weight-medium">
                  Social Links
                </h6>
                <p class="mb-0">
                  Add Social Links
                </p>
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="socialForm.twitter"
                  placeholder="https://twitter.com/abc"
                  :rules="[requiredValidator, urlValidator]"
                  label="Twitter"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="socialForm.facebook"
                  placeholder="https://facebook.com/abc"
                  :rules="[requiredValidator, urlValidator]"
                  label="Facebook"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="socialForm.googlePlus"
                  placeholder="https://plus.google.com/abc"
                  :rules="[requiredValidator, urlValidator]"
                  label="Google+"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="socialForm.LinkedIn"
                  placeholder="https://linkedin.com/abc"
                  :rules="[requiredValidator, urlValidator]"
                  label="LinkedIn"
                />
              </VCol>

              <VCol cols="12">
                <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    @click="currentStep--"
                  >
                    <VIcon
                      icon="tabler-arrow-left"
                      start
                      class="flip-in-rtl"
                    />
                    Previous
                  </VBtn>

                  <VBtn type="submit">
                    Next
                    <VIcon
                      icon="tabler-arrow-right"
                      end
                      class="flip-in-rtl"
                    />
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VWindowItem>

        <VWindowItem>
          <div class="text-base">
            <h6 class="text-base font-weight-medium mb-2">
              Account
            </h6>

            <p class="mb-1">
              {{ accountForm.username }}
            </p>
            <p class="mb-1">
              {{ accountForm.email }}
            </p>

            <VDivider class="my-4" />

            <h6 class="text-base font-weight-medium mb-2">
              Personal Info
            </h6>

            <p class="mb-1">
              {{ personalForm.firstName }}
            </p>
            <p class="mb-1">
              {{ personalForm.lastName }}
            </p>
            <p class="mb-1">
              {{ personalForm.country }}
            </p>
            <p class="mb-1">
              {{ personalForm.language }}
            </p>

            <VDivider class="my-4" />

            <h6 class="text-base font-weight-medium mb-2">
              Address
            </h6>

            <p class="mb-1">
              {{ addressForm.address }}
            </p>
            <p class="mb-1">
              {{ addressForm.landmark }}
            </p>
            <p class="mb-1">
              {{ addressForm.pincode }}
            </p>
            <p class="mb-1">
              {{ addressForm.city }}
            </p>

            <VDivider class="my-4" />

            <h6 class="text-base font-weight-medium mb-2">
              Social Links
            </h6>

            <p class="mb-1">
              {{ socialForm.twitter }}
            </p>
            <p class="mb-1">
              {{ socialForm.facebook }}
            </p>
            <p class="mb-1">
              {{ socialForm.googlePlus }}
            </p>
            <p class="mb-1">
              {{ socialForm.LinkedIn }}
            </p>
          </div>
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
`},fe={ts:`<script setup lang="ts">
const numberedSteps = [
  {
    title: 'Account Details',
    icon: 'tabler-file-description',
    subtitle: 'Setup account details',
  },
  {
    title: 'Personal Info',
    icon: 'tabler-user',
    subtitle: 'Add personal info',
  },
  {
    title: 'Social Links',
    icon: 'tabler-link',
    subtitle: 'Add social links',
  },

]

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)

const formData = ref({
  username: '',
  email: '',
  password: '',
  cPassword: '',
  firstName: '',
  lastName: '',
  country: undefined,
  language: undefined,
  twitter: '',
  facebook: '',
  googlePlus: '',
  LinkedIn: '',

})

const onSubmit = () => {
  console.log(formData.value)
}
<\/script>

<template>
  <VCard>
    <VRow>
      <VCol
        cols="12"
        md="4"
        :class="$vuetify.display.smAndDown ? 'border-b' : 'border-e'"
      >
        <VCardText>
          <!-- 👉 Stepper -->
          <AppStepper
            v-model:current-step="currentStep"
            direction="vertical"
            :items="numberedSteps"
            icon-size="24"
            class="stepper-icon-step-bg"
          />
        </VCardText>
      </VCol>
      <!-- 👉 stepper content -->
      <VCol
        cols="12"
        md="8"
      >
        <VCardText>
          <VForm>
            <VWindow
              v-model="currentStep"
              class="disable-tab-transition"
            >
              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      Account Details
                    </h6>
                    <p class="mb-0">
                      Enter your Account Details
                    </p>
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.username"
                      placeholder="CarterLeonardo"
                      label="Username"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.email"
                      placeholder="carterleonardo@gmail.com"
                      label="Email"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.password"
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
                      v-model="formData.cPassword"
                      label="Confirm Password"
                      placeholder="············"
                      :type="isCPasswordVisible ? 'text' : 'password'"
                      :append-inner-icon="isCPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                      @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>

              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      Personal Info
                    </h6>
                    <p class="mb-0">
                      Setup Information
                    </p>
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.firstName"
                      label="First Name"
                      placeholder="Leonard"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.lastName"
                      label="Last Name"
                      placeholder="Carter"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppSelect
                      v-model="formData.country"
                      label="Country"
                      placeholder="Select Country"
                      :items="['UK', 'USA', 'Canada', 'Australia', 'Germany']"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppSelect
                      v-model="formData.language"
                      label="Language"
                      placeholder="Select Language"
                      :items="['English', 'Spanish', 'French', 'Russian', 'German']"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>

              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      Social Links
                    </h6>
                    <p class="mb-0">
                      Add Social Links
                    </p>
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.twitter"
                      placeholder="https://twitter.com/abc"
                      label="Twitter"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.facebook"
                      placeholder="https://facebook.com/abc"
                      label="Facebook"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.googlePlus"
                      placeholder="https://plus.google.com/abc"
                      label="Google+"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.LinkedIn"
                      placeholder="https://linkedin.com/abc"
                      label="LinkedIn"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>
            </VWindow>

            <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
              <VBtn
                color="secondary"
                variant="tonal"
                :disabled="currentStep === 0"
                @click="currentStep--"
              >
                <VIcon
                  icon="tabler-arrow-left"
                  start
                  class="flip-in-rtl"
                />
                Previous
              </VBtn>

              <VBtn
                v-if="numberedSteps.length - 1 === currentStep"
                color="success"
                append-icon="tabler-check"
                @click="onSubmit"
              >
                submit
              </VBtn>

              <VBtn
                v-else
                @click="currentStep++"
              >
                Next

                <VIcon
                  icon="tabler-arrow-right"
                  end
                  class="flip-in-rtl"
                />
              </VBtn>
            </div>
          </VForm>
        </VCardText>
      </VCol>
    </VRow>
  </VCard>
</template>
`,js:`<script setup>
const numberedSteps = [
  {
    title: 'Account Details',
    icon: 'tabler-file-description',
    subtitle: 'Setup account details',
  },
  {
    title: 'Personal Info',
    icon: 'tabler-user',
    subtitle: 'Add personal info',
  },
  {
    title: 'Social Links',
    icon: 'tabler-link',
    subtitle: 'Add social links',
  },
]

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isCPasswordVisible = ref(false)

const formData = ref({
  username: '',
  email: '',
  password: '',
  cPassword: '',
  firstName: '',
  lastName: '',
  country: undefined,
  language: undefined,
  twitter: '',
  facebook: '',
  googlePlus: '',
  LinkedIn: '',
})

const onSubmit = () => {
  console.log(formData.value)
}
<\/script>

<template>
  <VCard>
    <VRow>
      <VCol
        cols="12"
        md="4"
        :class="$vuetify.display.smAndDown ? 'border-b' : 'border-e'"
      >
        <VCardText>
          <!-- 👉 Stepper -->
          <AppStepper
            v-model:current-step="currentStep"
            direction="vertical"
            :items="numberedSteps"
            icon-size="24"
            class="stepper-icon-step-bg"
          />
        </VCardText>
      </VCol>
      <!-- 👉 stepper content -->
      <VCol
        cols="12"
        md="8"
      >
        <VCardText>
          <VForm>
            <VWindow
              v-model="currentStep"
              class="disable-tab-transition"
            >
              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      Account Details
                    </h6>
                    <p class="mb-0">
                      Enter your Account Details
                    </p>
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.username"
                      placeholder="CarterLeonardo"
                      label="Username"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.email"
                      placeholder="carterleonardo@gmail.com"
                      label="Email"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.password"
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
                      v-model="formData.cPassword"
                      label="Confirm Password"
                      placeholder="············"
                      :type="isCPasswordVisible ? 'text' : 'password'"
                      :append-inner-icon="isCPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                      @click:append-inner="isCPasswordVisible = !isCPasswordVisible"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>

              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      Personal Info
                    </h6>
                    <p class="mb-0">
                      Setup Information
                    </p>
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.firstName"
                      label="First Name"
                      placeholder="Leonard"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.lastName"
                      label="Last Name"
                      placeholder="Carter"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppSelect
                      v-model="formData.country"
                      label="Country"
                      placeholder="Select Country"
                      :items="['UK', 'USA', 'Canada', 'Australia', 'Germany']"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppSelect
                      v-model="formData.language"
                      label="Language"
                      placeholder="Select Language"
                      :items="['English', 'Spanish', 'French', 'Russian', 'German']"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>

              <VWindowItem>
                <VRow>
                  <VCol cols="12">
                    <h6 class="text-h6 font-weight-medium">
                      Social Links
                    </h6>
                    <p class="mb-0">
                      Add Social Links
                    </p>
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.twitter"
                      placeholder="https://twitter.com/abc"
                      label="Twitter"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.facebook"
                      placeholder="https://facebook.com/abc"
                      label="Facebook"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.googlePlus"
                      placeholder="https://plus.google.com/abc"
                      label="Google+"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formData.LinkedIn"
                      placeholder="https://linkedin.com/abc"
                      label="LinkedIn"
                    />
                  </VCol>
                </VRow>
              </VWindowItem>
            </VWindow>

            <div class="d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8">
              <VBtn
                color="secondary"
                variant="tonal"
                :disabled="currentStep === 0"
                @click="currentStep--"
              >
                <VIcon
                  icon="tabler-arrow-left"
                  start
                  class="flip-in-rtl"
                />
                Previous
              </VBtn>

              <VBtn
                v-if="numberedSteps.length - 1 === currentStep"
                color="success"
                append-icon="tabler-check"
                @click="onSubmit"
              >
                submit
              </VBtn>

              <VBtn
                v-else
                @click="currentStep++"
              >
                Next

                <VIcon
                  icon="tabler-arrow-right"
                  end
                  class="flip-in-rtl"
                />
              </VBtn>
            </div>
          </VForm>
        </VCardText>
      </VCol>
    </VRow>
  </VCard>
</template>
`},we=r("h6",{class:"text-h6 font-weight-medium"}," Account Details ",-1),he=r("p",{class:"mb-0"}," Enter your Account Details ",-1),Ce=r("h6",{class:"text-h6 font-weight-medium"}," Personal Info ",-1),ge=r("p",{class:"mb-0"}," Setup Information ",-1),ve=r("h6",{class:"text-h6 font-weight-medium"}," Address ",-1),ke=r("p",{class:"mb-0"}," Enter Your Address. ",-1),ye=r("h6",{class:"text-h6 font-weight-medium"}," Social Links ",-1),Se=r("p",{class:"mb-0"}," Add Social Links ",-1),Ae={class:"text-base"},Fe=r("h6",{class:"text-base font-weight-medium mb-2"}," Account ",-1),xe={class:"mb-1"},Pe={class:"mb-1"},De=r("h6",{class:"text-base font-weight-medium mb-2"}," Personal Info ",-1),_e={class:"mb-1"},Ie={class:"mb-1"},Le={class:"mb-1"},Te={class:"mb-1"},Ne=r("h6",{class:"text-base font-weight-medium mb-2"}," Address ",-1),Be={class:"mb-1"},Ue={class:"mb-1"},Re={class:"mb-1"},We={class:"mb-1"},$e=r("h6",{class:"text-base font-weight-medium mb-2"}," Social Links ",-1),je={class:"mb-1"},qe={class:"mb-1"},Ee={class:"mb-1"},ze={class:"mb-1"},Ge={class:"d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8"},Ke={__name:"DemoFormWizardIconsBasic",setup(U){const S=[{title:"Account Details",icon:"custom-address"},{title:"Personal Info",icon:"custom-wizard-personal"},{title:"Address",icon:"custom-wizard-address"},{title:"Social Links",icon:"custom-wizard-social-link"},{title:"Review & Submit",icon:"custom-wizard-submit"}],n=b(0),V=b(!1),f=b(!1),t=b({username:"johndoe",email:"john.doe@email.com",password:"johndoe@J2",cPassword:"johndoe@J2",firstName:"John",lastName:"Doe",country:"UK",language:"English",address:"98 Borough bridge Road, Birmingham",landmark:"Borough bridge",pincode:"658921",city:"Birmingham",twitter:"https://twitter.com/abc",facebook:"https://facebook.com/abc",googlePlus:"https://plus.google.com/abc",linkedIn:"https://linkedin.com/abc"}),_=()=>{console.log(t.value)};return(B,a)=>{const I=$,i=W,w=R;return F(),D(j,null,{default:o(()=>[e(N,null,{default:o(()=>[e(I,{"current-step":l(n),"onUpdate:currentStep":a[0]||(a[0]=s=>L(n)?n.value=s:null),items:S},null,8,["current-step"])]),_:1}),e(P),e(N,null,{default:o(()=>[e(T,null,{default:o(()=>[e(q,{modelValue:l(n),"onUpdate:modelValue":a[19]||(a[19]=s=>L(n)?n.value=s:null),class:"disable-tab-transition"},{default:o(()=>[e(C,null,{default:o(()=>[e(h,null,{default:o(()=>[e(d,{cols:"12"},{default:o(()=>[we,he]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).username,"onUpdate:modelValue":a[1]||(a[1]=s=>l(t).username=s),placeholder:"CarterLeonardo",label:"Username"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).email,"onUpdate:modelValue":a[2]||(a[2]=s=>l(t).email=s),placeholder:"carterleonardo@gmail.com",label:"Email"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).password,"onUpdate:modelValue":a[3]||(a[3]=s=>l(t).password=s),label:"Password",placeholder:"············",type:l(V)?"text":"password","append-inner-icon":l(V)?"tabler-eye-off":"tabler-eye","onClick:appendInner":a[4]||(a[4]=s=>V.value=!l(V))},null,8,["modelValue","type","append-inner-icon"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).cPassword,"onUpdate:modelValue":a[5]||(a[5]=s=>l(t).cPassword=s),label:"Confirm Password",placeholder:"············",type:l(f)?"text":"password","append-inner-icon":l(f)?"tabler-eye-off":"tabler-eye","onClick:appendInner":a[6]||(a[6]=s=>f.value=!l(f))},null,8,["modelValue","type","append-inner-icon"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:o(()=>[e(h,null,{default:o(()=>[e(d,{cols:"12"},{default:o(()=>[Ce,ge]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).firstName,"onUpdate:modelValue":a[7]||(a[7]=s=>l(t).firstName=s),label:"First Name",placeholder:"Leonard"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).lastName,"onUpdate:modelValue":a[8]||(a[8]=s=>l(t).lastName=s),label:"Last Name",placeholder:"Carter"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(w,{modelValue:l(t).country,"onUpdate:modelValue":a[9]||(a[9]=s=>l(t).country=s),label:"Country",placeholder:"Select Country",items:["UK","USA","Canada","Australia","Germany"]},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(w,{modelValue:l(t).language,"onUpdate:modelValue":a[10]||(a[10]=s=>l(t).language=s),label:"Language",placeholder:"Select Language",items:["English","Spanish","French","Russian","German"]},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:o(()=>[e(h,null,{default:o(()=>[e(d,{cols:"12"},{default:o(()=>[ve,ke]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).address,"onUpdate:modelValue":a[11]||(a[11]=s=>l(t).address=s),placeholder:"98 Borough bridge Road, Birmingham",label:"Address"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).landmark,"onUpdate:modelValue":a[12]||(a[12]=s=>l(t).landmark=s),placeholder:"Borough bridge",label:"Landmark"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).pincode,"onUpdate:modelValue":a[13]||(a[13]=s=>l(t).pincode=s),placeholder:"658921",label:"Pincode",type:"number"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).city,"onUpdate:modelValue":a[14]||(a[14]=s=>l(t).city=s),placeholder:"New York",label:"City"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:o(()=>[e(h,null,{default:o(()=>[e(d,{cols:"12"},{default:o(()=>[ye,Se]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).twitter,"onUpdate:modelValue":a[15]||(a[15]=s=>l(t).twitter=s),placeholder:"https://twitter.com/abc",label:"Twitter"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).facebook,"onUpdate:modelValue":a[16]||(a[16]=s=>l(t).facebook=s),placeholder:"https://facebook.com/abc",label:"Facebook"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).googlePlus,"onUpdate:modelValue":a[17]||(a[17]=s=>l(t).googlePlus=s),placeholder:"https://plus.google.com/abc",label:"Google+"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).linkedIn,"onUpdate:modelValue":a[18]||(a[18]=s=>l(t).linkedIn=s),placeholder:"https://linkedin.com/abc",label:"LinkedIn"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:o(()=>[r("div",Ae,[Fe,r("p",xe,p(l(t).username),1),r("p",Pe,p(l(t).email),1),e(P,{class:"my-4"}),De,r("p",_e,p(l(t).firstName),1),r("p",Ie,p(l(t).lastName),1),r("p",Le,p(l(t).country),1),r("p",Te,p(l(t).language),1),e(P,{class:"my-4"}),Ne,r("p",Be,p(l(t).address),1),r("p",Ue,p(l(t).landmark),1),r("p",Re,p(l(t).pincode),1),r("p",We,p(l(t).city),1),e(P,{class:"my-4"}),$e,r("p",je,p(l(t).twitter),1),r("p",qe,p(l(t).facebook),1),r("p",Ee,p(l(t).googlePlus),1),r("p",ze,p(l(t).linkedIn),1)])]),_:1})]),_:1},8,["modelValue"]),r("div",Ge,[e(g,{color:"secondary",variant:"tonal",disabled:l(n)===0,onClick:a[20]||(a[20]=s=>n.value--)},{default:o(()=>[e(y,{icon:"tabler-arrow-left",start:"",class:"flip-in-rtl"}),v(" Previous ")]),_:1},8,["disabled"]),S.length-1===l(n)?(F(),D(g,{key:0,color:"success","append-icon":"tabler-check",onClick:_},{default:o(()=>[v(" submit ")]),_:1})):(F(),D(g,{key:1,onClick:a[21]||(a[21]=s=>n.value++)},{default:o(()=>[v(" Next "),e(y,{icon:"tabler-arrow-right",end:"",class:"flip-in-rtl"})]),_:1}))])]),_:1})]),_:1})]),_:1})}}},Je={class:"mb-6"},Ye=r("h6",{class:"text-h6 font-weight-medium"}," Account Details ",-1),Me=r("p",{class:"mb-0"}," Enter your Account Details ",-1),He=r("h6",{class:"text-h6 font-weight-medium"}," Personal Info ",-1),Oe=r("p",{class:"mb-0"}," Setup Information ",-1),Qe=r("h6",{class:"text-h6 font-weight-medium"}," Address ",-1),Xe=r("p",{class:"mb-0"}," Enter Your Address. ",-1),Ze=r("h6",{class:"text-h6 font-weight-medium"}," Social Links ",-1),el=r("p",{class:"mb-0"}," Add Social Links ",-1),ll={class:"text-base"},ol=r("h6",{class:"text-base font-weight-medium mb-2"}," Account ",-1),al={class:"mb-1"},tl={class:"mb-1"},sl=r("h6",{class:"text-base font-weight-medium mb-2"}," Personal Info ",-1),rl={class:"mb-1"},dl={class:"mb-1"},il={class:"mb-1"},nl={class:"mb-1"},ml=r("h6",{class:"text-base font-weight-medium mb-2"}," Address ",-1),cl={class:"mb-1"},pl={class:"mb-1"},ul={class:"mb-1"},Vl={class:"mb-1"},bl=r("h6",{class:"text-base font-weight-medium mb-2"}," Social Links ",-1),fl={class:"mb-1"},wl={class:"mb-1"},hl={class:"mb-1"},Cl={class:"mb-1"},gl={class:"d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8"},vl={__name:"DemoFormWizardIconsModernBasic",setup(U){const S=[{title:"Account Details",icon:"custom-address"},{title:"Personal Info",icon:"custom-wizard-personal"},{title:"Address",icon:"custom-wizard-address"},{title:"Social Links",icon:"custom-wizard-social-link"},{title:"Review & Submit",icon:"custom-wizard-submit"}],n=b(0),V=b(!1),f=b(!1),t=b({username:"johndoe",email:"john.doe@email.com",password:"johndoe@J2",cPassword:"johndoe@J2",firstName:"John",lastName:"Doe",country:"UK",language:"English",address:"98 Borough bridge Road, Birmingham",landmark:"Borough bridge",pincode:"658921",city:"Birmingham",twitter:"https://twitter.com/abc",facebook:"https://facebook.com/abc",googlePlus:"https://plus.google.com/abc",linkedIn:"https://linkedin.com/abc"}),_=()=>{console.log(t.value)};return(B,a)=>{const I=$,i=W,w=R;return F(),K(J,null,[r("div",Je,[e(I,{"current-step":l(n),"onUpdate:currentStep":a[0]||(a[0]=s=>L(n)?n.value=s:null),items:S},null,8,["current-step"])]),e(j,null,{default:o(()=>[e(N,null,{default:o(()=>[e(T,null,{default:o(()=>[e(q,{modelValue:l(n),"onUpdate:modelValue":a[19]||(a[19]=s=>L(n)?n.value=s:null),class:"disable-tab-transition"},{default:o(()=>[e(C,null,{default:o(()=>[e(h,null,{default:o(()=>[e(d,{cols:"12"},{default:o(()=>[Ye,Me]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).username,"onUpdate:modelValue":a[1]||(a[1]=s=>l(t).username=s),placeholder:"CarterLeonardo",label:"Username"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).email,"onUpdate:modelValue":a[2]||(a[2]=s=>l(t).email=s),placeholder:"carterleonardo@gmail.com",label:"Email"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).password,"onUpdate:modelValue":a[3]||(a[3]=s=>l(t).password=s),label:"Password",placeholder:"············",type:l(V)?"text":"password","append-inner-icon":l(V)?"tabler-eye-off":"tabler-eye","onClick:appendInner":a[4]||(a[4]=s=>V.value=!l(V))},null,8,["modelValue","type","append-inner-icon"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).cPassword,"onUpdate:modelValue":a[5]||(a[5]=s=>l(t).cPassword=s),label:"Confirm Password",placeholder:"············",type:l(f)?"text":"password","append-inner-icon":l(f)?"tabler-eye-off":"tabler-eye","onClick:appendInner":a[6]||(a[6]=s=>f.value=!l(f))},null,8,["modelValue","type","append-inner-icon"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:o(()=>[e(h,null,{default:o(()=>[e(d,{cols:"12"},{default:o(()=>[He,Oe]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).firstName,"onUpdate:modelValue":a[7]||(a[7]=s=>l(t).firstName=s),label:"First Name",placeholder:"Leonard"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).lastName,"onUpdate:modelValue":a[8]||(a[8]=s=>l(t).lastName=s),label:"Last Name",placeholder:"Carter"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(w,{modelValue:l(t).country,"onUpdate:modelValue":a[9]||(a[9]=s=>l(t).country=s),label:"Country",placeholder:"Select Country",items:["UK","USA","Canada","Australia","Germany"]},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(w,{modelValue:l(t).language,"onUpdate:modelValue":a[10]||(a[10]=s=>l(t).language=s),label:"Language",placeholder:"Select Language",items:["English","Spanish","French","Russian","German"]},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:o(()=>[e(h,null,{default:o(()=>[e(d,{cols:"12"},{default:o(()=>[Qe,Xe]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).address,"onUpdate:modelValue":a[11]||(a[11]=s=>l(t).address=s),placeholder:"98 Borough bridge Road, Birmingham",label:"Address"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).landmark,"onUpdate:modelValue":a[12]||(a[12]=s=>l(t).landmark=s),placeholder:"Borough bridge",label:"Landmark"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).pincode,"onUpdate:modelValue":a[13]||(a[13]=s=>l(t).pincode=s),placeholder:"658921",label:"Pincode",type:"number"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).city,"onUpdate:modelValue":a[14]||(a[14]=s=>l(t).city=s),placeholder:"New York",label:"City"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:o(()=>[e(h,null,{default:o(()=>[e(d,{cols:"12"},{default:o(()=>[Ze,el]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).twitter,"onUpdate:modelValue":a[15]||(a[15]=s=>l(t).twitter=s),placeholder:"https://twitter.com/abc",label:"Twitter"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).facebook,"onUpdate:modelValue":a[16]||(a[16]=s=>l(t).facebook=s),placeholder:"https://facebook.com/abc",label:"Facebook"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).googlePlus,"onUpdate:modelValue":a[17]||(a[17]=s=>l(t).googlePlus=s),placeholder:"https://plus.google.com/abc",label:"Google+"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).linkedIn,"onUpdate:modelValue":a[18]||(a[18]=s=>l(t).linkedIn=s),placeholder:"https://linkedin.com/abc",label:"LinkedIn"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:o(()=>[r("div",ll,[ol,r("p",al,p(l(t).username),1),r("p",tl,p(l(t).email),1),e(P,{class:"my-4"}),sl,r("p",rl,p(l(t).firstName),1),r("p",dl,p(l(t).lastName),1),r("p",il,p(l(t).country),1),r("p",nl,p(l(t).language),1),e(P,{class:"my-4"}),ml,r("p",cl,p(l(t).address),1),r("p",pl,p(l(t).landmark),1),r("p",ul,p(l(t).pincode),1),r("p",Vl,p(l(t).city),1),e(P,{class:"my-4"}),bl,r("p",fl,p(l(t).twitter),1),r("p",wl,p(l(t).facebook),1),r("p",hl,p(l(t).googlePlus),1),r("p",Cl,p(l(t).linkedIn),1)])]),_:1})]),_:1},8,["modelValue"]),r("div",gl,[e(g,{color:"secondary",variant:"tonal",disabled:l(n)===0,onClick:a[20]||(a[20]=s=>n.value--)},{default:o(()=>[e(y,{icon:"tabler-arrow-left",start:"",class:"flip-in-rtl"}),v(" Previous ")]),_:1},8,["disabled"]),S.length-1===l(n)?(F(),D(g,{key:0,color:"success","append-icon":"tabler-check",onClick:_},{default:o(()=>[v(" submit ")]),_:1})):(F(),D(g,{key:1,onClick:a[21]||(a[21]=s=>n.value++)},{default:o(()=>[v(" Next "),e(y,{icon:"tabler-arrow-right",end:"",class:"flip-in-rtl"})]),_:1}))])]),_:1})]),_:1})]),_:1})],64)}}},kl=r("h6",{class:"text-h6 font-weight-medium"}," Account Details ",-1),yl=r("p",{class:"mb-0"}," Enter your Account Details ",-1),Sl={class:"d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8"},Al=r("h6",{class:"text-h6 font-weight-medium"}," Personal Info ",-1),Fl=r("p",{class:"mb-0"}," Setup Information ",-1),xl={class:"d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8"},Pl=r("h6",{class:"text-h6 font-weight-medium"}," Address ",-1),Dl=r("p",{class:"mb-0"}," Enter Your Address. ",-1),_l={class:"d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8"},Il=r("h6",{class:"text-h6 font-weight-medium"}," Social Links ",-1),Ll=r("p",{class:"mb-0"}," Add Social Links ",-1),Tl={class:"d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8"},Nl={class:"text-base"},Bl=r("h6",{class:"text-base font-weight-medium mb-2"}," Account ",-1),Ul={class:"mb-1"},Rl={class:"mb-1"},Wl=r("h6",{class:"text-base font-weight-medium mb-2"}," Personal Info ",-1),$l={class:"mb-1"},jl={class:"mb-1"},ql={class:"mb-1"},El={class:"mb-1"},zl=r("h6",{class:"text-base font-weight-medium mb-2"}," Address ",-1),Gl={class:"mb-1"},Kl={class:"mb-1"},Jl={class:"mb-1"},Yl={class:"mb-1"},Ml=r("h6",{class:"text-base font-weight-medium mb-2"}," Social Links ",-1),Hl={class:"mb-1"},Ol={class:"mb-1"},Ql={class:"mb-1"},Xl={class:"mb-1"},Zl={__name:"DemoFormWizardIconsValidation",setup(U){const S=[{title:"Account Details",icon:"custom-wizard-account"},{title:"Personal Info",icon:"custom-wizard-personal"},{title:"Address",icon:"custom-wizard-address"},{title:"Social Links",icon:"custom-wizard-social-link"},{title:"Review & Submit",icon:"custom-wizard-submit"}],n=b(0),V=b(!1),f=b(!1),t=b(!0),_=b(),B=b(),a=b(),I=b(),i=b({username:"",email:"",password:"",cPassword:""}),w=b({firstName:"",lastName:"",country:void 0,language:void 0}),s=b({twitter:"",facebook:"",googlePlus:"",linkedIn:""}),x=b({address:"",landmark:"",city:"",pincode:""}),Y=()=>{var m;(m=_.value)==null||m.validate().then(c=>{c.valid?(n.value++,t.value=!0):t.value=!1})},M=()=>{var m;(m=B.value)==null||m.validate().then(c=>{c.valid?(n.value++,t.value=!0):t.value=!1})},H=()=>{var m;(m=I.value)==null||m.validate().then(c=>{c.valid?(n.value++,t.value=!0):t.value=!1})},O=()=>{var m;(m=a.value)==null||m.validate().then(c=>{c.valid?(n.value++,t.value=!0):t.value=!1})};return(m,c)=>{const Q=$,A=W,G=R;return F(),D(j,null,{default:o(()=>[e(N,null,{default:o(()=>[e(Q,{"current-step":l(n),"onUpdate:currentStep":c[0]||(c[0]=u=>L(n)?n.value=u:null),items:S,"is-active-step-valid":l(t)},null,8,["current-step","is-active-step-valid"])]),_:1}),e(P),e(N,null,{default:o(()=>[e(q,{modelValue:l(n),"onUpdate:modelValue":c[22]||(c[22]=u=>L(n)?n.value=u:null),class:"disable-tab-transition"},{default:o(()=>[e(C,null,{default:o(()=>[e(l(T),{ref_key:"refAccountForm",ref:_,onSubmit:E(Y,["prevent"])},{default:o(()=>[e(h,null,{default:o(()=>[e(d,{cols:"12"},{default:o(()=>[kl,yl]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(A,{modelValue:l(i).username,"onUpdate:modelValue":c[1]||(c[1]=u=>l(i).username=u),placeholder:"CarterLeonardo",rules:["requiredValidator"in m?m.requiredValidator:l(k)],label:"Username"},null,8,["modelValue","rules"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(A,{modelValue:l(i).email,"onUpdate:modelValue":c[2]||(c[2]=u=>l(i).email=u),placeholder:"carterleonardo@gmail.com",rules:["requiredValidator"in m?m.requiredValidator:l(k),"emailValidator"in m?m.emailValidator:l(ee)],label:"Email"},null,8,["modelValue","rules"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(A,{modelValue:l(i).password,"onUpdate:modelValue":c[3]||(c[3]=u=>l(i).password=u),placeholder:"············",label:"Password",rules:["requiredValidator"in m?m.requiredValidator:l(k),"passwordValidator"in m?m.passwordValidator:l(le)],type:l(V)?"text":"password","append-inner-icon":l(V)?"tabler-eye-off":"tabler-eye","onClick:appendInner":c[4]||(c[4]=u=>V.value=!l(V))},null,8,["modelValue","rules","type","append-inner-icon"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(A,{modelValue:l(i).cPassword,"onUpdate:modelValue":c[5]||(c[5]=u=>l(i).cPassword=u),placeholder:"············",label:"Confirm Password",rules:["requiredValidator"in m?m.requiredValidator:l(k),("confirmedValidator"in m?m.confirmedValidator:l(oe))(l(i).cPassword,l(i).password)],type:l(f)?"text":"password","append-inner-icon":l(f)?"tabler-eye-off":"tabler-eye","onClick:appendInner":c[6]||(c[6]=u=>f.value=!l(f))},null,8,["modelValue","rules","type","append-inner-icon"])]),_:1}),e(d,{cols:"12"},{default:o(()=>[r("div",Sl,[e(g,{color:"secondary",variant:"tonal",disabled:""},{default:o(()=>[e(y,{icon:"tabler-arrow-left",start:"",class:"flip-in-rtl"}),v(" Previous ")]),_:1}),e(g,{type:"submit"},{default:o(()=>[v(" Next "),e(y,{icon:"tabler-arrow-right",end:"",class:"flip-in-rtl"})]),_:1})])]),_:1})]),_:1})]),_:1},512)]),_:1}),e(C,null,{default:o(()=>[e(l(T),{ref_key:"refPersonalForm",ref:B,onSubmit:E(M,["prevent"])},{default:o(()=>[e(h,null,{default:o(()=>[e(d,{cols:"12"},{default:o(()=>[Al,Fl]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(A,{modelValue:l(w).firstName,"onUpdate:modelValue":c[7]||(c[7]=u=>l(w).firstName=u),label:"First Name",rules:["requiredValidator"in m?m.requiredValidator:l(k)],placeholder:"Leonard"},null,8,["modelValue","rules"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(A,{modelValue:l(w).lastName,"onUpdate:modelValue":c[8]||(c[8]=u=>l(w).lastName=u),label:"Last Name",rules:["requiredValidator"in m?m.requiredValidator:l(k)],placeholder:"Carter"},null,8,["modelValue","rules"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(G,{modelValue:l(w).country,"onUpdate:modelValue":c[9]||(c[9]=u=>l(w).country=u),label:"Country",rules:["requiredValidator"in m?m.requiredValidator:l(k)],placeholder:"Select Country",items:["UK","USA","Canada","Australia","Germany"]},null,8,["modelValue","rules"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(G,{modelValue:l(w).language,"onUpdate:modelValue":c[10]||(c[10]=u=>l(w).language=u),label:"Language",rules:["requiredValidator"in m?m.requiredValidator:l(k)],placeholder:"Select Language",items:["English","Spanish","French","Russian","German"]},null,8,["modelValue","rules"])]),_:1}),e(d,{cols:"12"},{default:o(()=>[r("div",xl,[e(g,{color:"secondary",variant:"tonal",onClick:c[11]||(c[11]=u=>n.value--)},{default:o(()=>[e(y,{icon:"tabler-arrow-left",start:"",class:"flip-in-rtl"}),v(" Previous ")]),_:1}),e(g,{type:"submit"},{default:o(()=>[v(" Next "),e(y,{icon:"tabler-arrow-right",end:"",class:"flip-in-rtl"})]),_:1})])]),_:1})]),_:1})]),_:1},512)]),_:1}),e(C,null,{default:o(()=>[e(l(T),{ref_key:"refAddressForm",ref:I,onSubmit:E(H,["prevent"])},{default:o(()=>[e(h,null,{default:o(()=>[e(d,{cols:"12"},{default:o(()=>[Pl,Dl]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(A,{modelValue:l(x).address,"onUpdate:modelValue":c[12]||(c[12]=u=>l(x).address=u),rules:["requiredValidator"in m?m.requiredValidator:l(k)],placeholder:"98 Borough bridge Road, Birmingham",label:"Address"},null,8,["modelValue","rules"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(A,{modelValue:l(x).landmark,"onUpdate:modelValue":c[13]||(c[13]=u=>l(x).landmark=u),rules:["requiredValidator"in m?m.requiredValidator:l(k)],placeholder:"Borough bridge",label:"Landmark"},null,8,["modelValue","rules"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(A,{modelValue:l(x).pincode,"onUpdate:modelValue":c[14]||(c[14]=u=>l(x).pincode=u),rules:["requiredValidator"in m?m.requiredValidator:l(k)],placeholder:"658921",label:"Pincode",type:"number"},null,8,["modelValue","rules"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(A,{modelValue:l(x).city,"onUpdate:modelValue":c[15]||(c[15]=u=>l(x).city=u),rules:["requiredValidator"in m?m.requiredValidator:l(k)],placeholder:"New York",label:"City"},null,8,["modelValue","rules"])]),_:1}),e(d,{cols:"12"},{default:o(()=>[r("div",_l,[e(g,{color:"secondary",variant:"tonal",onClick:c[16]||(c[16]=u=>n.value--)},{default:o(()=>[e(y,{icon:"tabler-arrow-left",start:"",class:"flip-in-rtl"}),v(" Previous ")]),_:1}),e(g,{type:"submit"},{default:o(()=>[v(" Next "),e(y,{icon:"tabler-arrow-right",end:"",class:"flip-in-rtl"})]),_:1})])]),_:1})]),_:1})]),_:1},512)]),_:1}),e(C,null,{default:o(()=>[e(l(T),{ref_key:"refSocialLinkForm",ref:a,onSubmit:E(O,["prevent"])},{default:o(()=>[e(h,null,{default:o(()=>[e(d,{cols:"12"},{default:o(()=>[Il,Ll]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(A,{modelValue:l(s).twitter,"onUpdate:modelValue":c[17]||(c[17]=u=>l(s).twitter=u),placeholder:"https://twitter.com/abc",rules:["requiredValidator"in m?m.requiredValidator:l(k),"urlValidator"in m?m.urlValidator:l(z)],label:"Twitter"},null,8,["modelValue","rules"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(A,{modelValue:l(s).facebook,"onUpdate:modelValue":c[18]||(c[18]=u=>l(s).facebook=u),placeholder:"https://facebook.com/abc",rules:["requiredValidator"in m?m.requiredValidator:l(k),"urlValidator"in m?m.urlValidator:l(z)],label:"Facebook"},null,8,["modelValue","rules"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(A,{modelValue:l(s).googlePlus,"onUpdate:modelValue":c[19]||(c[19]=u=>l(s).googlePlus=u),placeholder:"https://plus.google.com/abc",rules:["requiredValidator"in m?m.requiredValidator:l(k),"urlValidator"in m?m.urlValidator:l(z)],label:"Google+"},null,8,["modelValue","rules"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(A,{modelValue:l(s).linkedIn,"onUpdate:modelValue":c[20]||(c[20]=u=>l(s).linkedIn=u),placeholder:"https://linkedin.com/abc",rules:["requiredValidator"in m?m.requiredValidator:l(k),"urlValidator"in m?m.urlValidator:l(z)],label:"LinkedIn"},null,8,["modelValue","rules"])]),_:1}),e(d,{cols:"12"},{default:o(()=>[r("div",Tl,[e(g,{color:"secondary",variant:"tonal",onClick:c[21]||(c[21]=u=>n.value--)},{default:o(()=>[e(y,{icon:"tabler-arrow-left",start:"",class:"flip-in-rtl"}),v(" Previous ")]),_:1}),e(g,{type:"submit"},{default:o(()=>[v(" Next "),e(y,{icon:"tabler-arrow-right",end:"",class:"flip-in-rtl"})]),_:1})])]),_:1})]),_:1})]),_:1},512)]),_:1}),e(C,null,{default:o(()=>[r("div",Nl,[Bl,r("p",Ul,p(l(i).username),1),r("p",Rl,p(l(i).email),1),e(P,{class:"my-4"}),Wl,r("p",$l,p(l(w).firstName),1),r("p",jl,p(l(w).lastName),1),r("p",ql,p(l(w).country),1),r("p",El,p(l(w).language),1),e(P,{class:"my-4"}),zl,r("p",Gl,p(l(x).address),1),r("p",Kl,p(l(x).landmark),1),r("p",Jl,p(l(x).pincode),1),r("p",Yl,p(l(x).city),1),e(P,{class:"my-4"}),Ml,r("p",Hl,p(l(s).twitter),1),r("p",Ol,p(l(s).facebook),1),r("p",Ql,p(l(s).googlePlus),1),r("p",Xl,p(l(s).linkedIn),1)])]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})}}},eo=r("h6",{class:"text-h6 font-weight-medium"}," Account Details ",-1),lo=r("p",{class:"mb-0"}," Enter your Account Details ",-1),oo=r("h6",{class:"text-h6 font-weight-medium"}," Personal Info ",-1),ao=r("p",{class:"mb-0"}," Setup Information ",-1),to=r("h6",{class:"text-h6 font-weight-medium"}," Social Links ",-1),so=r("p",{class:"mb-0"}," Add Social Links ",-1),ro={class:"d-flex flex-wrap gap-4 justify-sm-space-between justify-center mt-8"},io={__name:"DemoFormWizardIconsVertical",setup(U){const S=[{title:"Account Details",icon:"tabler-file-description",subtitle:"Setup account details"},{title:"Personal Info",icon:"tabler-user",subtitle:"Add personal info"},{title:"Social Links",icon:"tabler-link",subtitle:"Add social links"}],n=b(0),V=b(!1),f=b(!1),t=b({username:"",email:"",password:"",cPassword:"",firstName:"",lastName:"",country:void 0,language:void 0,twitter:"",facebook:"",googlePlus:"",linkedIn:""}),_=()=>{console.log(t.value)};return(B,a)=>{const I=$,i=W,w=R;return F(),D(j,null,{default:o(()=>[e(h,null,{default:o(()=>[e(d,{cols:"12",md:"4",class:X(B.$vuetify.display.smAndDown?"border-b":"border-e")},{default:o(()=>[e(N,null,{default:o(()=>[e(I,{"current-step":l(n),"onUpdate:currentStep":a[0]||(a[0]=s=>L(n)?n.value=s:null),direction:"vertical",items:S,"icon-size":"24",class:"stepper-icon-step-bg"},null,8,["current-step"])]),_:1})]),_:1},8,["class"]),e(d,{cols:"12",md:"8"},{default:o(()=>[e(N,null,{default:o(()=>[e(T,null,{default:o(()=>[e(q,{modelValue:l(n),"onUpdate:modelValue":a[15]||(a[15]=s=>L(n)?n.value=s:null),class:"disable-tab-transition"},{default:o(()=>[e(C,null,{default:o(()=>[e(h,null,{default:o(()=>[e(d,{cols:"12"},{default:o(()=>[eo,lo]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).username,"onUpdate:modelValue":a[1]||(a[1]=s=>l(t).username=s),placeholder:"CarterLeonardo",label:"Username"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).email,"onUpdate:modelValue":a[2]||(a[2]=s=>l(t).email=s),placeholder:"carterleonardo@gmail.com",label:"Email"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).password,"onUpdate:modelValue":a[3]||(a[3]=s=>l(t).password=s),label:"Password",placeholder:"············",type:l(V)?"text":"password","append-inner-icon":l(V)?"tabler-eye-off":"tabler-eye","onClick:appendInner":a[4]||(a[4]=s=>V.value=!l(V))},null,8,["modelValue","type","append-inner-icon"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).cPassword,"onUpdate:modelValue":a[5]||(a[5]=s=>l(t).cPassword=s),label:"Confirm Password",placeholder:"············",type:l(f)?"text":"password","append-inner-icon":l(f)?"tabler-eye-off":"tabler-eye","onClick:appendInner":a[6]||(a[6]=s=>f.value=!l(f))},null,8,["modelValue","type","append-inner-icon"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:o(()=>[e(h,null,{default:o(()=>[e(d,{cols:"12"},{default:o(()=>[oo,ao]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).firstName,"onUpdate:modelValue":a[7]||(a[7]=s=>l(t).firstName=s),label:"First Name",placeholder:"Leonard"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).lastName,"onUpdate:modelValue":a[8]||(a[8]=s=>l(t).lastName=s),label:"Last Name",placeholder:"Carter"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(w,{modelValue:l(t).country,"onUpdate:modelValue":a[9]||(a[9]=s=>l(t).country=s),label:"Country",placeholder:"Select Country",items:["UK","USA","Canada","Australia","Germany"]},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(w,{modelValue:l(t).language,"onUpdate:modelValue":a[10]||(a[10]=s=>l(t).language=s),label:"Language",placeholder:"Select Language",items:["English","Spanish","French","Russian","German"]},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(C,null,{default:o(()=>[e(h,null,{default:o(()=>[e(d,{cols:"12"},{default:o(()=>[to,so]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).twitter,"onUpdate:modelValue":a[11]||(a[11]=s=>l(t).twitter=s),placeholder:"https://twitter.com/abc",label:"Twitter"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).facebook,"onUpdate:modelValue":a[12]||(a[12]=s=>l(t).facebook=s),placeholder:"https://facebook.com/abc",label:"Facebook"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).googlePlus,"onUpdate:modelValue":a[13]||(a[13]=s=>l(t).googlePlus=s),placeholder:"https://plus.google.com/abc",label:"Google+"},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"6"},{default:o(()=>[e(i,{modelValue:l(t).linkedIn,"onUpdate:modelValue":a[14]||(a[14]=s=>l(t).linkedIn=s),placeholder:"https://linkedin.com/abc",label:"LinkedIn"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),r("div",ro,[e(g,{color:"secondary",variant:"tonal",disabled:l(n)===0,onClick:a[16]||(a[16]=s=>n.value--)},{default:o(()=>[e(y,{icon:"tabler-arrow-left",start:"",class:"flip-in-rtl"}),v(" Previous ")]),_:1},8,["disabled"]),S.length-1===l(n)?(F(),D(g,{key:0,color:"success","append-icon":"tabler-check",onClick:_},{default:o(()=>[v(" submit ")]),_:1})):(F(),D(g,{key:1,onClick:a[17]||(a[17]=s=>n.value++)},{default:o(()=>[v(" Next "),e(y,{icon:"tabler-arrow-right",end:"",class:"flip-in-rtl"})]),_:1}))])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}}},no=r("h3",{class:"text-h3 my-4"}," Modern ",-1),Jo={__name:"form-wizard-icons",setup(U){return(S,n)=>{const V=Z,f=ce;return F(),K(J,null,[e(h,null,{default:o(()=>[e(d,{cols:"12"},{default:o(()=>[e(V,{variant:"outlined",title:"Basic",code:pe},{default:o(()=>[e(Ke)]),_:1},8,["code"])]),_:1}),e(d,{cols:"12"},{default:o(()=>[e(V,{variant:"outlined",title:"Validation",code:be},{default:o(()=>[e(Zl)]),_:1},8,["code"])]),_:1}),e(d,{cols:"12"},{default:o(()=>[e(V,{variant:"outlined",title:"Vertical",code:fe},{default:o(()=>[e(io)]),_:1},8,["code"])]),_:1})]),_:1}),e(P,{class:"my-10 mx-n6"}),no,e(h,null,{default:o(()=>[e(d,{cols:"12"},{default:o(()=>[e(V,{variant:"outlined",title:"Modern basic",code:ue},{default:o(()=>[e(vl)]),_:1},8,["code"])]),_:1}),e(d,{cols:"12"},{default:o(()=>[e(V,{variant:"outlined",title:"Modern Vertical",code:Ve},{default:o(()=>[e(f)]),_:1},8,["code"])]),_:1})]),_:1})],64)}}};export{Jo as default};
