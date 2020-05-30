<template>
  <NiaDialog>
    <template v-slot:header>
      Add action
    </template>

    <template v-slot:body>
      <NiaForm
        :form-properties="constructFormProperties()"
        :property-name-percents="30"
        @change="changeHandler($event)"
      />
    </template>

    <template v-slot:footer>
      <NiaDialogFooterButton @click="addActionHandler()">
        Add
      </NiaDialogFooterButton>

      <NiaDialogFooterButton @click="cancelHandler()">
        Cancel
      </NiaDialogFooterButton>
    </template>
  </NiaDialog>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import store from '@/store'

  import {
    NiaFormEditEvent,
    NiaFormEvent, NiaFormProperty,
    NiaFormPropertyEvent,
    NiaFormPropertyType,
    NiaFormSelectEvent,
    NiaFormSelectProperty,
  } from '@/components/nia/lib'
  import {NiaAction, NiaActionType, NiaNamedAction} from '@/utils'

  import loggers from '@/utils/logger'

  const logger = loggers('AddActionDialog')

  interface ActionDataItem {
    actionType: NiaActionType;
    name: string;
    extraFields: Array<NiaFormProperty>;
  }

  interface ButtonDefinition {
    name: string;
    buttonCode: number;
  }

  // key code definitions
  const makeKeyCodeDefinition = (name: string, keyCode: number) => ({ name, keyCode })

  // button definitions
  const makeButtonDefinition = (name: string, buttonCode: number) => ({ name, buttonCode })

  const BUTTON_DEFINITIONS: Array<ButtonDefinition> = [
    makeButtonDefinition('Left', 1),
    makeButtonDefinition('Right', 2),
    makeButtonDefinition('3', 3),
    makeButtonDefinition('4', 4),
    makeButtonDefinition('5', 5),
    makeButtonDefinition('6', 6),
    makeButtonDefinition('7', 7),
    makeButtonDefinition('8', 8),
  ]

  const BUTTON_NAMES = BUTTON_DEFINITIONS.map((buttonDefinition: ButtonDefinition) => buttonDefinition.name)

  // properties
  const PROPERTY_ACTION_NAME = 'Action name'
  const PROPERTY_ACTION_TYPE = 'Action type'

  // extra properties
  const PROPERTY_KEY_CODE = 'Key code'
  const PROPERTY_BUTTON_CODE = 'Button code'
  const PROPERTY_X = 'X'
  const PROPERTY_Y = 'Y'
  const PROPERTY_DX = 'dX'
  const PROPERTY_DY = 'dY'
  const PROPERTY_TEXT = 'Text'
  const PROPERTY_CODE = 'Code'
  const PROPERTY_OS_COMMAND = 'OS command'
  const PROPERTY_FUNCTION_NAME = 'Function name'
  const PROPERTY_EXECUTABLE_ACTION_NAME = 'Executable action name'
  const PROPERTY_WAIT_MS_AMOUNT = 'MS amount'

  // validators
  const defaultValidator = () => true

  // actual action data
  const makeActionType = (actionType: NiaActionType, name: string, extraFields: Array<NiaFormProperty>): ActionDataItem => ({
    name,
    actionType,
    extraFields,
  })

  const ACTION_DATA = [
    makeActionType(
      NiaActionType.KeyPress,
      'Key press',
      [
        {
          type: NiaFormPropertyType.Edit,
          name: PROPERTY_KEY_CODE,
          validator: defaultValidator,
        },
      ],
    ),

    makeActionType(
      NiaActionType.KeyClick,
      'Key click',
      [
        {
          type: NiaFormPropertyType.Edit,
          name: PROPERTY_KEY_CODE,
          validator: defaultValidator,
        },
      ],
    ),
    makeActionType(
      NiaActionType.KeyRelease,
      'Key release',
      [
        {
          type: NiaFormPropertyType.Edit,
          name: PROPERTY_KEY_CODE,
          validator: defaultValidator,
        },
      ],
    ),
    makeActionType(
      NiaActionType.MouseButtonPress,
      'Mouse button click',
      [
        {
          type: NiaFormPropertyType.Select,
          name: PROPERTY_BUTTON_CODE,
          validator: defaultValidator,
          selectValues: BUTTON_NAMES,
        },
      ],
    ),
    makeActionType(
      NiaActionType.MouseButtonClick,
      'Mouse button press',
      [
        {
          type: NiaFormPropertyType.Select,
          name: PROPERTY_BUTTON_CODE,
          validator: defaultValidator,
          selectValues: BUTTON_NAMES,
        },
      ],
    ),
    makeActionType(
      NiaActionType.MouseButtonRelease,
      'Mouse button release',
      [
        {
          type: NiaFormPropertyType.Select,
          name: PROPERTY_BUTTON_CODE,
          validator: defaultValidator,
          selectValues: BUTTON_NAMES,
        },
      ],
    ),
    makeActionType(
      NiaActionType.MouseRelativeMove,
      'Mouse relative move',
      [
        {
          type: NiaFormPropertyType.Edit,
          name: PROPERTY_DX,
          validator: defaultValidator,
        },
        {
          type: NiaFormPropertyType.Edit,
          name: PROPERTY_DY,
          validator: defaultValidator,
        },
      ],
    ),
    makeActionType(
      NiaActionType.MouseAbsoluteMove,
      'Mouse absolute move',
      [
        {
          type: NiaFormPropertyType.Edit,
          name: PROPERTY_X,
          validator: defaultValidator,
        },
        {
          type: NiaFormPropertyType.Edit,
          name: PROPERTY_Y,
          validator: defaultValidator,
        },
      ],
    ),
    makeActionType(
      NiaActionType.ExecuteOSCommand,
      'OS command',
      [
        {
          type: NiaFormPropertyType.Edit,
          name: PROPERTY_OS_COMMAND,
          validator: defaultValidator,
        },
      ],
    ),
    makeActionType(
      NiaActionType.ExecuteFunction,
      'Function name',
      [
        {
          type: NiaFormPropertyType.Edit,
          name: PROPERTY_FUNCTION_NAME,
          validator: defaultValidator,
        },
      ],
    ),
    makeActionType(
      NiaActionType.ExecuteCode,
      'Execute code',
      [
        {
          type: NiaFormPropertyType.Edit,
          name: PROPERTY_CODE,
          validator: defaultValidator,
        },
      ],
    ),
    makeActionType(
      NiaActionType.ExecuteNamedAction,
      'Executable action name',
      [
        {
          type: NiaFormPropertyType.Edit,
          name: PROPERTY_EXECUTABLE_ACTION_NAME,
          validator: defaultValidator,
        },
      ],
    ),
    makeActionType(
      NiaActionType.TextType,
      'Text type',
      [
        {
          type: NiaFormPropertyType.Edit,
          name: PROPERTY_TEXT,
          validator: defaultValidator,
        },
      ],
    ),
    makeActionType(
      NiaActionType.Wait,
      'Wait',
      [
        {
          type: NiaFormPropertyType.Edit,
          name: PROPERTY_WAIT_MS_AMOUNT,
          validator: defaultValidator,
        },
      ],
    ),
  ]

  const getActionDataItem = (actionType: NiaActionType) => {
    for (const actionDataItem of ACTION_DATA) {
      if (actionDataItem.actionType === actionType) {
        return actionDataItem
      }
    }

    throw new Error('Did not found action item.' +
      ' If that exception were raised, that means that some action type is not implemented.',
    )
  }

  const ACTION_TYPES: Array<NiaActionType> = ACTION_DATA.map((actionType) => actionType.actionType)
  const ACTION_TYPE_NAMES: Array<string> = ACTION_DATA.map((actionType) => actionType.name)

  // Component
  @Component({
    name: 'NiaAddActionDialog',
  })
  export default class NiaAddActionDialog extends Vue {
    get selectedActionType(): NiaActionType {
      return store.getters.UI.AddActionDialog.selectedActionType
    }

    get currentExtraFields(): Array<NiaFormProperty> {
      const selectedActionType: NiaActionType = this.selectedActionType
      const actionDataItem: ActionDataItem = getActionDataItem(selectedActionType)

      return actionDataItem.extraFields
    }

    constructFormProperties(): Array<NiaFormProperty> {
      const properties = [
        {
          type: NiaFormPropertyType.Edit,
          name: PROPERTY_ACTION_NAME,
          validator: defaultValidator,
        },
        {
          type: NiaFormPropertyType.Select,
          name: PROPERTY_ACTION_TYPE,
          validator: defaultValidator,
          selectValues: ACTION_TYPE_NAMES,
        },
        ...this.currentExtraFields,
      ]

      return properties
    }

    cancelHandler(): void {
      store.commit.UI.AddActionDialog.hide()
    }

    addActionHandler(): void {
      const namedAction: NiaNamedAction = store.getters.UI.AddActionDialog.constructAction()

      store.dispatch.Connection.defineAction({
        namedAction,
      })
    }

    changeHandler(event: NiaFormPropertyEvent): void {
      logger.debug(event)

      switch (event.propertyName) {
        case PROPERTY_ACTION_NAME:
          this.handleChangeActionName((event.editEvent as NiaFormEditEvent).value)
          break
        case PROPERTY_ACTION_TYPE:
          this.handleChangeActionType((event.selectEvent as NiaFormSelectEvent).index)
          break
        case PROPERTY_KEY_CODE:
          this.handleChangeKeyCode(parseInt((event.editEvent as NiaFormEditEvent).value))
          break
        case PROPERTY_BUTTON_CODE:
          this.handleChangeButtonCode(parseInt((event.editEvent as NiaFormEditEvent).value))
          break
        case PROPERTY_X:
          this.handleChangeX(parseInt((event.editEvent as NiaFormEditEvent).value))
          break
        case PROPERTY_Y:
          this.handleChangeY(parseInt((event.editEvent as NiaFormEditEvent).value))
          break
        case PROPERTY_DX:
          this.handleChangeDX(parseInt((event.editEvent as NiaFormEditEvent).value))
          break
        case PROPERTY_DY:
          this.handleChangeDY(parseInt((event.editEvent as NiaFormEditEvent).value))
          break
        case PROPERTY_TEXT:
          this.handleChangeText((event.editEvent as NiaFormEditEvent).value)
          break
        case PROPERTY_CODE:
          this.handleChangeCode((event.editEvent as NiaFormEditEvent).value)
          break
        case PROPERTY_OS_COMMAND:
          this.handleChangeOSCommand((event.editEvent as NiaFormEditEvent).value)
          break
        case PROPERTY_FUNCTION_NAME:
          this.handleChangeFunctionName((event.editEvent as NiaFormEditEvent).value)
          break
        case PROPERTY_EXECUTABLE_ACTION_NAME:
          this.handleChangeExecutableActionName((event.editEvent as NiaFormEditEvent).value)
          break
        case PROPERTY_WAIT_MS_AMOUNT:
          this.handleChangeWaitMSAmount(parseInt((event.editEvent as NiaFormEditEvent).value))
          break
      }
    }

    handleChangeActionName(actionName: string): void {
      store.commit.UI.AddActionDialog.setActionName(actionName)
    }

    handleChangeActionType(actionTypeIndex: number): void {
      store.commit.UI.AddActionDialog.setActionType(ACTION_DATA[actionTypeIndex].actionType)
    }

    handleChangeKeyCode(keyCode: number): void {
      store.commit.UI.AddActionDialog.setKeyCode(keyCode)
    }

    handleChangeButtonCode(buttonCode: number): void {
      store.commit.UI.AddActionDialog.setButtonCode(buttonCode)
    }

    handleChangeX(x: number): void {
      store.commit.UI.AddActionDialog.setX(x)
    }

    handleChangeY(y: number): void {
      store.commit.UI.AddActionDialog.setY(y)
    }

    handleChangeDX(dx: number): void {
      store.commit.UI.AddActionDialog.setDX(dx)
    }

    handleChangeDY(dy: number): void {
      store.commit.UI.AddActionDialog.setDY(dy)
    }

    handleChangeText(text: string): void {
      store.commit.UI.AddActionDialog.setText(text)
    }

    handleChangeCode(code: string): void {
      store.commit.UI.AddActionDialog.setCode(code)
    }

    handleChangeOSCommand(osCommand: string): void {
      store.commit.UI.AddActionDialog.setOSCommand(osCommand)
    }

    handleChangeFunctionName(functionName: string): void {
      store.commit.UI.AddActionDialog.setFunctionName(functionName)
    }

    handleChangeExecutableActionName(executableActionName: string): void {
      store.commit.UI.AddActionDialog.setExecutableActionName(executableActionName)
    }

    handleChangeWaitMSAmount(waitMSAmount: number): void {
      store.commit.UI.AddActionDialog.setWaitMSAmount(waitMSAmount)
    }
  }
</script>

<style scoped>

</style>
