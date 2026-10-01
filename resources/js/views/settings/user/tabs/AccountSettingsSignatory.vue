<script setup>
import { useCookie } from '@/@core/composable/useCookie'

const accountData = {
  avatarImg: useCookie('userData').value["signatory"],
}

const error = ref("")

const refInputEl = ref()
const accountDataLocal = ref(structuredClone(accountData))


const changeAvatar = file => {
  const fileReader = new FileReader()
  const { files } = file.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        accountDataLocal.value.avatarImg = fileReader.result
      }
    }
  }
}

const resetAvatar = () => {
  accountDataLocal.value.avatarImg = accountData.avatarImg
}

const updateAvatar = async () => {
  const res = await $api('/user/update-signatory/' + useCookie('userData').value["id"], {
    method: 'PUT',
    body: {
      signatory: accountDataLocal.value.avatarImg,
    },
  })

  error.value = ""
  if (res.status == 200) {
    useCookie('userData').value.signatory = res.data.user.signatory_path
    showSnackbar('success', 'Signature enregistrée avec succès')
  } else {
    showApiErrors(res.errors)
  }
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Signature du compte">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded
            size="140"
            class="me-6"
            :image="accountDataLocal.avatarImg"
          />

          <!-- 👉 Upload Photo -->

          <VForm
            class="d-flex flex-column justify-center gap-4"
            @submit.prevent="updateAvatar"
          >
            <div class="d-flex flex-wrap gap-2">
              <VBtn
                color="primary"
                @click="refInputEl?.click()"
              >
                <VIcon
                  icon="tabler-cloud-upload"
                  class="d-sm-none"
                />
                <span class="d-none d-sm-block">Ajouter une nouvelle signature</span>
              </VBtn>

              <input
                ref="refInputEl"
                type="file"
                name="file"
                hidden
                @input="changeAvatar"
              >

              <VBtn
                type="reset"
                color="secondary"
                variant="tonal"
                @click="resetAvatar"
              >
                <span class="d-none d-sm-block">Réinitialiser</span>
                <VIcon
                  icon="tabler-refresh"
                  class="d-sm-none"
                />
              </VBtn>
            </div>

            <p class="text-body-1 mb-0">
              Autorisés JPG, GIF ou PNG. Taille Max of 800K
            </p>
            <VBtn type="submit">
              Enregistrer
            </VBtn>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
