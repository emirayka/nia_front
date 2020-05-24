<template>
  <NiaContainer>
    <NiaSwitchButton
      :is-enabled="isListening"
      @toggle="toggleListening()"
    >
      {{ listeningDescription }}
    </NiaSwitchButton>
  </NiaContainer>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import store from '@/store'

  @Component({
    name: 'NiaListeningButton',
  })
  export default class NiaListeningButton extends Vue {
    get isListening(): boolean {
      return store.getters.Keymapping.Listening.isListening
    }

    get listeningDescription(): string {
      if (this.isListening) {
        return 'Listening'
      } else {
        return 'Idle'
      }
    }

    toggleListening(): void {
      const isListening: boolean = this.isListening

      if (isListening) {
        store.dispatch.Connection.stopListening()
      } else {
        store.dispatch.Connection.startListening()
      }
    }
  }
</script>

<style scoped>

</style>