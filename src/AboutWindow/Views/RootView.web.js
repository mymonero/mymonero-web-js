'use strict'

const View = require('../../Views/View.web')

class RootView extends View {
  constructor (options, context) {
    super(options, context)
    //
    const self = this
    self.setup()
  }

  setup () {
    const self = this
    self.setup_views()
  }

  setup_views () {
    const self = this
    const container = self.layer
    container.classList.add('about-container')
    // about logo link
    const logoLink = document.createElement('a')
    logoLink.classList.add('about-logo')
    logoLink.href = self.context.appDownloadLink_domainAndPath
    logoLink.addEventListener('click', function (e) {
      e.preventDefault()
      window.open(this.href, '_blank')
      return false
    })
    self.layer.appendChild(logoLink)
    // version text
    const version = document.createElement('div')
    version.classList.add('about-version')
    version.innerHTML = `Version ${self.context.version}`
    self.layer.appendChild(version)
    // github release link
    const release = document.createElement('a')
    release.classList.add('about-release')
    release.innerHTML = 'View on GitHub'
    release.href = self.context.appRepoLink
    release.addEventListener('mouseenter', function (e) {
      release.classList.add('about-release-underline')
    })
    release.addEventListener('mouseleave', function (e) {
      release.classList.remove('about-release-underline')
    })
    release.addEventListener('click', function (e) {
      e.preventDefault()
      window.open(this.href, '_blank')
      return false
    })
    self.layer.appendChild(release)
  }
}
module.exports = RootView
