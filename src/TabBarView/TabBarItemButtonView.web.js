'use strict'

const View = require('../Views/View.web')

class TabBarItemButtonView extends View {
  constructor (options, context) {
    options.tag = 'a'
    //
    super(options, context)
    const self = this
    self.isHorizontalBar = typeof options.isHorizontalBar !== 'undefined' ? options.isHorizontalBar : true
    self.tabBarView_thickness = options.tabBarView_thickness
    //
    self.layer_baseStyleTemplate = options.layer_baseStyleTemplate || false
    self.icon_baseStyleTemplate = options.icon_baseStyleTemplate || {}
    self.icon_selected_baseStyleTemplate = options.icon_selected_baseStyleTemplate || self.icon_baseStyleTemplate // fall back to non-selected
    self.numberOf_tabs = options.numberOf_tabs
    if (!self.numberOf_tabs) {
      throw Error(`${self.constructor.name} requires options.numberOf_tabs`)
    }
    self.isEnabled = true
    self.setup_views()
    self.Deselect() // also sets selected state
    console.log(self);
  }

  setup_views () {
    const self = this
    {
      console.log(self.layer_baseStyleTemplate);
      const layer = self.layer
      layer.classList.add('tabButton-layer') // disable highlight under Cordova/MobileSafari
      if (self.isHorizontalBar) {
        layer.style.width = `${100 / self.numberOf_tabs}%`
        layer.style.height = `${self.tabBarView_thickness}px`
      } else {
        layer.style.width = `${self.tabBarView_thickness}px`
        layer.style.height = '56px'
      }
      if (self.layer_baseStyleTemplate) {
        self.layer.classList.add(self.layer_baseStyleTemplate) // adds custom class for the container
      }
    }
    { // icon
      const layer = document.createElement('div')
      layer.style.webkitAppRegion = 'no-drag' // make clickable
      layer.style.width = '100%'
      layer.style.height = '100%'
      layer.style.border = 'none'
      self.iconImageLayer = layer
      self.layer.appendChild(self.iconImageLayer)
      console.log(self.icon_baseStyleTemplate);
      self.iconImageLayer.classList.add(self.icon_baseStyleTemplate)
      self.iconImageLayer.id = self.icon_baseStyleTemplate;
      if (self.icon_baseStyleTemplate == "tabButton-exchange") {
        let elem = document.getElementById("tabButton-exchange");
        console.log(elem);
        console.log(elem);
        //elem.addEventListener('click', this.MonitorForFirstExchangeInvocation())
      }
    }
    self.layer.addEventListener('click', function (e) {
      e.preventDefault()
      if (self.isEnabled !== false) {
        self.emit(self.EventName_clicked(), self)
      }
      return false
    }
    )
  }

  MonitorForFirstExchangeInvocation() {
    console.log("Invoked");
  }

  // Runtime - Accessors - Events
  EventName_clicked () {
    return 'EventName_clicked'
  }

  // Runtime - Accessors - State
  IsSelected () {
    const self = this
    return self.isSelected === true
  }

  IsEnabled () {
    const self = this
    return self.isEnabled === true
  }

  // Runtime - Imperatives - Selection
  Select () {
    const self = this
    if (self.isEnabled === false) {
      return
    }
    self.isSelected = true
    self.iconImageLayer.classList.add(self.icon_selected_baseStyleTemplate)
    self.iconImageLayer.classList.remove(self.icon_baseStyleTemplate)
  }

  Deselect () {
    const self = this
    self.isSelected = false
    self.iconImageLayer.classList.remove(self.icon_selected_baseStyleTemplate)
    self.iconImageLayer.classList.add(self.icon_baseStyleTemplate)
  }

  // Runtime - Imperatives - Selection
  Enable () {
    const self = this
    self.isEnabled = true
    self.iconImageLayer.style.opacity = '1.0'
  }

  Disable () {
    const self = this
    self.isEnabled = false
    self.iconImageLayer.style.opacity = '0.3'
  }
}
module.exports = TabBarItemButtonView
