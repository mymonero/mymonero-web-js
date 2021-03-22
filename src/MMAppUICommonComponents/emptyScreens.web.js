'use strict'

const View = require('../Views/View.web')
const EmojiWeb = require('../Emoji/emoji_web')

function New_EmptyStateMessageContainerView (optl_emoji, optl_messageText, context, optl_explicitMarginH, optl_explicitMarginV, optl_contentTranslateYPX) {
  const nativeEmoji = typeof optl_emoji === 'string' ? optl_emoji : '😀'
  const messageText = typeof optl_messageText === 'string' ? optl_messageText : ''
  const margin_h = typeof optl_explicitMarginH !== 'undefined' ? optl_explicitMarginH : 16
  const margin_v = typeof optl_explicitMarginV !== 'undefined' ? optl_explicitMarginV : 18
  const view = new View({}, context)
  view.__EmptyStateMessageContainerView_margin_h = margin_h
  view.__EmptyStateMessageContainerView_margin_v = margin_v

  const layer = view.layer
  layer.classList.add('emptyScreens')
  layer.style.width = `calc(100% - ${2 * margin_h}px - 2px)` // -2px for border
  layer.style.height = `calc(100% - ${2 * margin_v}px - 2px)` // -2px for border
  layer.style.margin = `${margin_v}px ${margin_h}px`

  const contentContainerLayer = document.createElement('div')
  contentContainerLayer.classList.add('content-container')
  contentContainerLayer.style.display = 'table-cell'
  contentContainerLayer.style.verticalAlign = 'middle'
  const translateY_px = typeof optl_contentTranslateYPX === 'undefined' ? -16 : optl_contentTranslateYPX
  contentContainerLayer.style.transform = 'translateY(' + translateY_px + 'px)' // pull everything up per design
  view.layer.appendChild(contentContainerLayer)

  const emojiLayer = document.createElement('div')
  emojiLayer.classList.add('emoji-label')
  emojiLayer.innerHTML = EmojiWeb.NativeEmojiTextToImageBackedEmojiText_orUnlessDisabled_NativeEmojiText(context, nativeEmoji)
  contentContainerLayer.appendChild(emojiLayer)

  const messageLayer = document.createElement('div')
  messageLayer.classList.add('message-label')
  context.themeController.StyleLayer_FontAsMiddlingNormalSansSerif(messageLayer)
  messageLayer.innerHTML = messageText

  contentContainerLayer.appendChild(messageLayer)
  view.SetContent = function (toEmoji, toMessage) {
    emojiLayer.innerHTML = EmojiWeb.NativeEmojiTextToImageBackedEmojiText_orUnlessDisabled_NativeEmojiText(context, toEmoji)
    messageLayer.innerHTML = toMessage
  }
  return view
}
exports.New_EmptyStateMessageContainerView = New_EmptyStateMessageContainerView
