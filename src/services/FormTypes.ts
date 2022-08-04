interface DataValue {
  label: string;
  value: string;
}

interface DataWithShortcut extends DataValue {
  label: string;
  value: string;
  shortcut?: string;
}

interface ValidationProps {
  customMessage?: string;
  pattern?: RegExp;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

interface FormioComponent {
  defaultValue?: string | boolean | unknown[];
  description?: string;
  disableOnInvalid?: boolean;
  disabled?: boolean;
  input?: boolean;
  key?: string;
  label?: string;
  multiple?: boolean;
  placeholder?: string;
  type?:
    | "textfield"
    | "checkbox"
    | "selectboxes"
    | "number"
    | "email"
    | "phoneNumber"
    | "datetime"
    | "textarea"
    | "button"
    | "select"
    | "radio"
    | "panel"
    | "url"
    | "currency"
    | "password"
    | "file";
  validate?: ValidationProps;
  validateOn?: "change" | "blur";

  data?: {
    values: DataValue[];
  };
  widget?: unknown;
  inputMask?: string;
  action?: "next" | "save" | "callback" | "triggerProcess";
  enableTime?: boolean;
  variableValue?: unknown;
  values?: DataWithShortcut[];
  components?: FormioComponent[];
  mask?: boolean;
  currency?: string;
  spellcheck?: boolean;
  storage?: string;
  webcam?: boolean;
  fileTypes?: DataValue[];
}

export interface FormioSchema {
  display?: string;
  components?: FormioComponent | [];
}

export interface FormProps {
  id: string;
  name: string;
  version: string;
  components: FormioSchema;
}
