// form
export enum NiaFormEventType {
  Edit,
  Select,
}

export interface NiaFormSelectEvent {
  index: number,
  value: string,
}

export interface NiaFormEditEvent {
  value: string,
}

export interface NiaFormEvent {
  eventType: NiaFormEventType,
  selectEvent?: NiaFormSelectEvent
  editEvent?: NiaFormEditEvent
}

export interface NiaFormPropertyEvent extends NiaFormEvent {
  propertyName: string
}

export enum NiaFormPropertyType {
  Edit,
  Select,
}

export type NiaPropertyValidator = (event: NiaFormEvent) => boolean

export interface NiaFormBasicProperty {
  type: NiaFormPropertyType;
  name: string;
  validator: NiaPropertyValidator;
}

export interface NiaFormEditProperty extends NiaFormBasicProperty {
  initialValue?: string
}

export interface NiaFormSelectProperty extends NiaFormBasicProperty {
  selectValues: Array<string>
  initialValue?: number
}

export type NiaFormProperty = NiaFormEditProperty | NiaFormSelectProperty

// table
export interface NiaTableColumnDefinition {
  name: string;
  width: number;
  style?: object;
}

// context menu
export interface NiaContextMenuItemData {
  name: string;
  text: string;
}
