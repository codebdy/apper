const ValidatorFormats = [
  { label: 'URL', value: 'url' },
  { label: 'Email', value: 'email' },
  { label: 'Number', value: 'number' },
  { label: 'Integer', value: 'integer' },
  { label: 'ID', value: 'idcard' },
  { label: 'Phone Number', value: 'phone' },
  { label: 'Currency', value: 'money' },
  { label: 'Chinese', value: 'zh' },
  { label: 'Date', value: 'date' },
  { label: 'Zip', value: 'zip' },
]

const locales = {
  'en-US': {
    settings: {
      'x-validator': {
        title: 'Validator',
        addValidatorRules: 'Add Validator Rules',
        drawer: 'Edit Rules',
        triggerType: {
          title: 'Trigger Type',
          placeholder: 'Please Select',
          dataSource: ['onInput', 'onFocus', 'onBlur'],
        },
        format: {
          title: 'Format',
          placeholder: 'Please Select',
          dataSource: ValidatorFormats,
        },
        validator: {
          title: 'Custom Validator',
          tooltip: 'Format: function (value){ return "Error Message"}',
        },
        pattern: 'RegExp',
        len: 'Length Limit',
        max: 'Length/Value Lt',
        min: 'Length/Value Gt',
        exclusiveMaximum: 'Length/Value Lte',
        exclusiveMinimum: 'Length/Value Gte',
        whitespace: 'No Whitespace',
        required: 'Required',
        message: {
          title: 'Error Message',
          tooltip:
            'The error message is only effective for one built-in rule of the current rule set. If you need to customize the error message for different built-in rules, please split into multiple rules',
        },
      },
    },
    SettingComponents: {
      DataSourceSetter: {
        nodeProperty: 'Node Property',
        pleaseSelectNode: 'please select node from the tree on the left',
        addKeyValuePair: 'Add Key Value Pair',
        configureDataSource: 'Configure',
        dataSource: 'Options',
        defaultTitle: 'Default Title',
        dataSourceTree: 'Options Tree',
        addNode: 'Add Node',
        label: 'label',
        value: 'value',
        item: 'Item',
      },
      ReactionsSetter: {
        configureReactions: 'Configure',
        relationsFields: 'Associated Fields',
        variableName: 'Variable Name',
        variableNameValidateMessage: 'This is not a standard variable name',
        pleaseInput: 'Please Input',
        sourceField: 'Source Field',
        sourceProperty: 'Field Property',
        variableType: 'Variable Type',
        operations: 'Operations',
        addRelationField: 'Add Associated Field',
        propertyReactions:
          'Property Reactions(Only Support Javascript Expression)',
        actionReactions:
          'Action Reactions(Optional, Support Javascript Statement)',
        visible: 'Show/None',
        hidden: 'Show/UI Hidden',
        display: 'Display',
        pattern: 'Pattern',
        title: 'Title',
        description: 'Description',
        value: 'Value',
        initialValue: 'InitialValue',
        dataSource: 'Options',
        required: 'Required',
        component: 'Component',
        componentProps: 'Component Props',
        decorator: 'Decorator',
        decoratorProps: 'Decorator Props',
        pleaseSelect: 'Please Select',
        expressionValueTypeIs: 'Expression value type is',
      },
      ValidatorSetter: {
        pleaseSelect: 'Please Select',
        formats: ValidatorFormats,
      },
    },
  },
}

export default locales