'use strict'

const View = require('../../Views/View.web')

class RootFooterView extends View {
  constructor (options, context) {
    super(options, context)

    const self = this
    self.setup()
  }

  setup () {
    const self = this
    const layer = self.layer
    layer.style.height = '32px'
    layer.style.backgroundColor = '#171416'
    const table = document.createElement('table')
    table.style.border = 'none'
    table.style.padding = '0'
    table.style.margin = '0'
    table.style.width = '100%'
    table.style.maxWidth = '400px'
    const tr = document.createElement('tr')
    table.appendChild(tr)
    layer.appendChild(table)
    //
    tr.appendChild(self._new_linkButtonLayerElement('Home', 'rgb(250, 246, 250)', function (e) {
      e.preventDefault()
      window.open('https://mymonero.com/', '_blank') // new tab
      return false
    }))
    tr.appendChild(self._new_linkButtonLayerElement('Privacy', 'rgb(140, 136, 140)', function (e) {
      e.preventDefault()
      window.open('https://mymonero.com/privacy', '_blank') // new tab
      return false
    }))
    tr.appendChild(self._new_linkButtonLayerElement('Terms', 'rgb(140, 136, 140)', function (e) {
      e.preventDefault()
      window.open('https://mymonero.com/terms', '_blank') // new tab
      return false
    }))
    tr.appendChild(self._new_linkButtonLayerElement('Support', '#11bbec', function (e) {
      e.preventDefault()
      window.open('https://mymonero.com/?open_support=1', '_blank')
      // shift to this when support can be brought directly back in:
      // window.Intercom('show')
      // previous:
      // window.Intercom('update', {
      // 	hide_default_launcher: false
      // })
      return false
    }))
  }

  _new_linkButtonLayerElement (title, colorValue, click_handler_fn) {
    const self = this
    //
    const td = document.createElement('td')
    td.style.maxWidth = '80px'
    td.width = '25%'
    td.align = 'center'
    //
    const a = document.createElement('a')
    a.innerHTML = `<span>${title}</span>`
    a.style.color = colorValue
    a.classList.add('footer-link')
    a.addEventListener('click', click_handler_fn)
    td.appendChild(a)
    //
    return td
  }
}
module.exports = RootFooterView
