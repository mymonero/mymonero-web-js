'use strict'

const View = require('../Views/View.web')

function New_ActionButtonsContainerView (margin_fromWindowLeft, margin_fromWindowRight, context) {
  const view = new View({}, context)
  const layer = view.layer
  layer.style.position = 'fixed'
  layer.style.top = 'calc(100% - 32px - 8px - 32px)'
  layer.style.width = `calc(100% - ${margin_fromWindowLeft}px - ${margin_fromWindowRight}px)`
  layer.style.height = '32px'
  layer.style.zIndex = 1000
  return view
}
exports.New_ActionButtonsContainerView = New_ActionButtonsContainerView

function New_Stacked_ActionButtonsContainerView (margin_left, margin_right, margin_top, context) {
  const view = new View({}, context)
  const layer = view.layer
  layer.style.position = 'relative'
  layer.style.width = `calc(100% - ${margin_left}px - ${margin_right}px)`
  layer.style.marginLeft = `${margin_left}px`
  layer.style.marginTop = `${margin_top}px`
  layer.style.height = '40px'
  return view
}
exports.New_Stacked_ActionButtonsContainerView = New_Stacked_ActionButtonsContainerView
//
function New_ActionButtonView (
  title,
  iconimage_filename,
  isRightmostButtonInContainer,
  clicked_fn, // (clickedLayer, e) -> Void
  context,
  optl_icon_bgPos_top,
  optl_colorType, // "blue", "grey", "red"
  optl_icon_bgSize // e.g. "12px 14px"
) {
  const hasImage = iconimage_filename !== null && typeof iconimage_filename !== 'undefined'
  const icon_bgPos_top = typeof optl_icon_bgPos_top === 'undefined' ? 8 : optl_icon_bgPos_top
  //
  const view = new View({ tag: 'a' }, context)
  const layer = view.layer
  layer.ondragstart = function (e) { e.preventDefault(); return false } // disable link dragging
  view.Disable = function () { // is this going to create a retain cycle?
    view.isDisabled = true
    layer.href = '' // to make it non-clickable
    layer.style.opacity = '0.5'
    layer.classList.add('disabled')
  }
  view.Enable = function () { // is this going to create a retain cycle?
    view.isDisabled = false
    layer.href = '#' // to make it clickable
    layer.style.opacity = '1.0'
    layer.classList.remove('disabled')
  }
  view.SetColorType = function (colorType) {
    layer.classList.remove('utility')
    layer.classList.remove('action')
    layer.classList.remove('destructive')
    //
    if (colorType === 'grey') {
      layer.classList.add('utility')
      layer.style.color = '#FCFBFC'
      layer.style.backgroundColor = '#383638'
      layer.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
      if (context.isMobile === true) {
        layer.style.fontSize = '13px'
        layer.style.letterSpacing = '0'
        layer.style.fontWeight = '600'
        layer.style.lineHeight = '32px' // reset/set on mobile - cause font size is consistent
        layer.style.boxShadow = 'inset 0 0.5px 0 0 #494749'
      } else { // chrome/desktop/electron:
        layer.style.webkitFontSmoothing = 'subpixel-antialiased'
        layer.style.fontSize = '12px' // appears slightly too small but 13 is far to big
        layer.style.letterSpacing = '0.5px'
        layer.style.fontWeight = '400'
        layer.style.lineHeight = '34px' // set for smaller font size so layout isn't messed
        layer.style.boxShadow = '0 0.5px 1px 0 #161416, inset 0 0.5px 0 0 #494749'
      }
    } else if (colorType == 'blue') {
      layer.classList.add('action')
      layer.style.color = '#161416'
      layer.style.backgroundColor = '#00C6FF'
      if (context.isMobile !== true) {
        layer.style.boxShadow = 'inset 0 0.5px 0 0 rgba(255,255,255,0.20)'
        layer.style.webkitFontSmoothing = 'subpixel-antialiased'
      } else {
        // TODO: add replacement box shadow w/effective color and 1.0 opacity
        layer.style.boxShadow = 'none' // temporary until replaced - to reset potential 'grey'
      }
      layer.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
      layer.style.fontSize = '13px' // appears /slightly/ too bug but waygd
      layer.style.letterSpacing = '0'
      layer.style.fontWeight = '600'
      layer.style.transform = 'none' // reset
      layer.style.lineHeight = '32px' // reset/set
    } else if (colorType === 'red') {
      layer.classList.add('destructive')
      layer.style.color = '#161416'
      layer.style.backgroundColor = '#f97777'
      layer.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
      if (context.isMobile === true) {
        layer.style.fontSize = '13px'
        layer.style.letterSpacing = '0'
        layer.style.fontWeight = '600'
        layer.style.boxShadow = 'none' // temporary until replaced - to reset potential 'grey'
      } else { // chrome/desktop/electron:
        layer.style.webkitFontSmoothing = 'subpixel-antialiased'
        layer.style.fontSize = '13px' // appears /slightly/ too bug but waygd
        layer.style.letterSpacing = '0'
        layer.style.fontWeight = '600'
        layer.style.boxShadow = 'inset 0 0.5px 0 0 rgba(255,255,255,0.20)'
      }
      layer.style.lineHeight = '32px' // reset/set
    } else {
      throw Error('unrecognized colorType ' + colorType)
    }
  }
  { // setup/style
    const layer = view.layer
    view.Enable()
    layer.innerHTML = title
    if (hasImage) {
      layer.style.backgroundImage = 'url(' + iconimage_filename + ')'
      layer.style.backgroundPosition = `17px ${icon_bgPos_top}px`
      layer.style.backgroundRepeat = 'no-repeat'
      if (optl_icon_bgSize && typeof optl_icon_bgSize !== 'undefined') {
        layer.style.backgroundSize = optl_icon_bgSize
      }
      layer.style.textIndent = '10px' // to prevent visual weirdness as button gets so small text may overlap image… would be nice to have a better solution which takes into account size of text and maybe size of button
    }
    layer.style.display = 'inline-block'
    layer.style.width = `calc(50% - ${9/ 2}px` // we're assuming there are only two buttons
    layer.style.height = '32px'
    layer.style.boxSizing = 'border-box'
    layer.style.borderRadius = '3px'
    layer.classList.add('hoverable-cell')
    layer.classList.add('disableable')
    view.SetColorType(optl_colorType || 'grey')
    layer.style.textDecoration = 'none'
    layer.style.textAlign = 'center'
    layer.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
    if (isRightmostButtonInContainer !== true) {
      layer.style.marginRight = '9px'
    }
  }
  layer.addEventListener('click', function (e) {
    e.preventDefault()
    if (view.isDisabled === true) {
      return false
    }
    const clickedLayer = this
    clicked_fn(clickedLayer, e)
    return false
  })
  return view
}
exports.New_ActionButtonView = New_ActionButtonView
