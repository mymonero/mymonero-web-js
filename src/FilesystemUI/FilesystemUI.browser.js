'use strict'
class FilesytemUI {

  PresentDialogToSaveTextFile (contentString, title, defaultFilename_sansExt, ext, fn, optl_uriContentPrefix) {
    if (typeof optl_uriContentPrefix === 'undefined' || !optl_uriContentPrefix) {
      throw Error('PresentDialogToSaveTextFile expected optl_uriContentPrefix')
    }
    const uriContent = optl_uriContentPrefix + contentString
    const encodedUri = encodeURI(uriContent)
    const link = document.createElement('a')
    link.style.visibility = 'hidden'
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `${defaultFilename_sansExt}.${ext}`)
    document.body.appendChild(link) // Required for FF
    //
    link.click()
    //
    link.parentNode.removeChild(link)
  }
}
module.exports = FilesytemUI
