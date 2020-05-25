<template>
  <NiaDialog>
    <template #header>
      <span
        class="nia-error-dialog__header"
        :style="niaDialogHeaderStyle"
      >
        Error
      </span>
    </template>

    <template #body>
      <NiaContainer class="nia-error-dialog__body">
        {{ getErrorMessage }}
      </NiaContainer>
    </template>

    <template #footer>
      <NiaDialogFooterButton
        class="nia-error-dialog__footer__button-ok"
        :danger="true"
        @click="hideErrorDialog()"
      >
        Ok
      </NiaDialogFooterButton>
    </template>
  </NiaDialog>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import store from '@/store'
  import NiaDialog from '../nia/NiaDialog.vue'

  @Component({
    name: 'NiaErrorDialog',
    components: {
      NiaDialog,
    },
  })
  export default class NiaErrorDialog extends Vue {
    @Prop({ default: 400 })
    width!: number

    get niaDialogHeaderStyle(): object {
      return {
        backgroundColor: store.getters.Theme.getBackgroundColor,
        color: store.getters.Theme.getBackgroundColorError1,
      }
    }

    get getErrorMessage(): string {
      return store.getters.UI.ErrorDialog.errorMessage
    }

    hideErrorDialog(): void {
      store.commit.UI.ErrorDialog.hide()
    }
  }
</script>

<style scoped>
</style>
