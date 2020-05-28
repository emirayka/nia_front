<template>
  <div class="nia-device-table">
    <NiaAccordion
      class="nia-device-table__devices"
    >
      <NiaAccordionItem
        v-for="(device, index) in definedDevices"
        :id="device.getDeviceId().toString()"
        :title="device.getDeviceName()"
        :multiple="false"
        :key="index"
      >
        <NiaTable :columns="columns">

          <NiaTableRow>
            <NiaTableRowItem>
              Device name
            </NiaTableRowItem>
            <NiaTableRowItem>
              {{ device.getDeviceName() }}
            </NiaTableRowItem>
          </NiaTableRow>

          <NiaTableRow>
            <NiaTableRowItem>
              Device id
            </NiaTableRowItem>
            <NiaTableRowItem>
              {{ device.getDeviceId() }}
            </NiaTableRowItem>
          </NiaTableRow>

          <NiaTableRow>
            <NiaTableRowItem>
              Device path
            </NiaTableRowItem>
            <NiaTableRowItem>
              {{ device.getDevicePath() }}
            </NiaTableRowItem>
          </NiaTableRow>

          <NiaTableRow>
            <NiaTableRowItem>
              Enabled
            </NiaTableRowItem>
            <NiaTableRowItem>
              <NiaSwitchButton
                :is-enabled="device.isDefined()"
                @toggle="switchHandler(device, $event)"
              >
              </NiaSwitchButton>
            </NiaTableRowItem>
          </NiaTableRow>

        </NiaTable>
      </NiaAccordionItem>
    </NiaAccordion>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {Prop} from 'vue-property-decorator'

  import store from '@/store'
  import {NiaDefineDeviceEventObject, NiaDeviceInfo, NiaRemoveDeviceEventObject} from '@/utils'
  import {NiaTableColumnDefinition} from '@/components/nia/lib'

  import loggers from '@/utils/logger'

  const logger = loggers('NiaDeviceTable')

  @Component({
    name: 'NiaDeviceTable',
  })
  export default class NiaDeviceTable extends Vue {
    private hoverDevice: NiaDeviceInfo | null = null

    get columns(): Array<NiaTableColumnDefinition> {
      return [
        {
          name: 'Property',
          width: 40,
        },
        {
          name: 'Value',
          width: 60,
        },
      ]
    }

    get definedDevices(): Array<NiaDeviceInfo> {
      return store.getters.Keymapping.DevicesInfo.devices
    }

    hoverHandler(device: NiaDeviceInfo, hover: boolean): void {
      if (hover) {
        this.hoverDevice = device
      } else {
        this.hoverDevice = null
      }
    }

    switchHandler(deviceInfo: NiaDeviceInfo, needToDefine: boolean): void {
      if (needToDefine) {
        const args: NiaDefineDeviceEventObject = {
          deviceId: deviceInfo.getDeviceId(),
        }

        store.dispatch.Connection.defineDevice(args)
      } else {
        const args: NiaRemoveDeviceEventObject = {
          devicePath: deviceInfo.getDevicePath(),
        }

        store.dispatch.Connection.removeDevice(args)
      }
    }
  }
</script>

<style scoped>
  .nia-device-table__devices {
    border-left: 30px solid #333;
  }
</style>
