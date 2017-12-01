# MessageBox

## Methods

```js
MessageBox.success(options)
MessageBox.error(options)
MessageBox.warnning(options)
MessageBox.info(options)
```

## Usage

```js
// usage:
MessageBox.success({
  title: 'Congrats!',
  message: 'Text Text',
  buttons: MessageBox.OK
}).then(act => {
  if (act === 'ok') {
    // do something
  }
})
```

## Pre-defined buttons

```js
`MessageBox.OK` : default ok button
`MessageBox.Cancel` : default cancel button
`MessageBox.OKCancel` : default ok and cancel button as an array
```

## Contruct Options and Button config

- `options.title: String` : title of dialog
- `options.message: String | HTML` : message text or html string
- `options.buttons: Array<ButtonConfig>` : array of button config
- `ButtonConfig.name` : name of button, like 'ok', 'cancel', 'confirm'
- `ButtonConfig.text` : caption of button, like 'Ok', 'Cancel', 'Confirm'
- `ButtonConfig.type` : same as <el-button type="...">, can be 'primary','success', etc
