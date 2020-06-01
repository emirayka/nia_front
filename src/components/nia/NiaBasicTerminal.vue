<template>
  <NiaContainer>
    <VueCommand
      :commands="commands"
      title="emirayka@nia"
      prompt="emirayka@nia"
    >
    </VueCommand>
  </NiaContainer>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  // @ts-ignore
  import VueCommand, {createStdout} from 'vue-command'
  import 'vue-command/dist/vue-command.css'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: 'NiaBasicTerminal',
    components: {
      VueCommand,
    },
  })
  export default class NiaBasicTerminal extends Vue {
    @Prop({ required: true })
    commands!: object
  }
</script>

<style scoped>

</style>