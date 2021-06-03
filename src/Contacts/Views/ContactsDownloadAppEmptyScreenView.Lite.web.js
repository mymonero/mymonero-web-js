'use strict'
//
const View = require('../../Views/View.web')

class ContactsDownloadAppEmptyScreenView extends View {
  constructor (options, context) {
    super(options, context)
    //
    const self = this
    self.layer.style.width = '100%'
    self.layer.style.height = '100%'
    //
    const view = new View({}, self.context)
    const layer = view.layer
    layer.style.marginTop = `56px`
    layer.style.marginLeft = '16px'
    layer.style.width = `calc(100% - 32px)`
    layer.style.height = `calc(100% - 56px - 15px)`

    const emptyStateMessageContainerView = new View({}, self.context)
      
    const layerEmpty = emptyStateMessageContainerView.layer
    layerEmpty.classList.add('emptyScreens')
    layerEmpty.style.width = `calc(100% - 2 * 0px - 2px)` // -2px for border
    layerEmpty.style.height = `calc(100% - 2 * 0px - 2px)` // -2px for border
    layerEmpty.style.margin = `0px 0px`
  
    const contentContainerLayer = document.createElement('div')
    contentContainerLayer.classList.add('content-container')
    contentContainerLayer.style.display = 'table-cell'
    contentContainerLayer.style.verticalAlign = 'middle'
    const translateY_px = -16
    contentContainerLayer.style.transform = 'translateY(' + translateY_px + 'px)' // pull everything up per design
    emptyStateMessageContainerView.layer.appendChild(contentContainerLayer)
  
    const emojiLayer = document.createElement('div')
    emojiLayer.classList.add('emoji-label')
    emojiLayer.innerHTML = `<div href='#' class="pointing-down">&nbsp;</div>`
    contentContainerLayer.appendChild(emojiLayer)
  
    const messageLayer = document.createElement('div')
    messageLayer.classList.add('message-label')
    messageLayer.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
    messageLayer.style.letterSpacing = '0'
    messageLayer.style.fontSize = '13px'
    if (self.context.isMobile === true) {
      messageLayer.style.fontWeight = 'normal'
    } else {
      messageLayer.style.webkitFontSmoothing = 'subpixel-antialiased'
      messageLayer.style.fontWeight = '300'
    }
    messageLayer.innerHTML = "To create Contacts,<br/><a href=\"https://mymonero.com\" target=\"_blank\" style='color: #11bbec; cursor: pointer; -webkit-user-select: none; text-decoration: none;'>download the app</a>."
  
    contentContainerLayer.appendChild(messageLayer)
    view.addSubview(emptyStateMessageContainerView)
    self.addSubview(view)
  }

  //
  // Runtime - Accessors - Navigation
  Navigation_Title () {
    return 'Contacts'
  }
}
module.exports = ContactsDownloadAppEmptyScreenView
