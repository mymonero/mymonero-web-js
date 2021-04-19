'use strict'
class FilesytemUI {
  //
  //
  // Runtime - Accessors - Lookups - IPC - Main window
  //

  //
  //
  // Runtime - Imperatives - Dialogs - Save
  PresentDialogToSaveBase64ImageStringAsImageFile (
    imgData_base64String,
    title,
    defaultFilename_sansExt,
    fn // (err?) -> Void
  ) {
    alert('Code fault: PresentDialogToSaveBase64ImageStringAsImageFile not yet implemented')
  }

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

  //
  //
  // Runtime - Imperatives - Dialogs - Open
  //
  PresentDialogToOpenOneImageFile (
    title,
    fn // (err?, absoluteFilePath?) -> Void
  ) {
    alert('Code fault: PresentDialogToOpenOneImageFile not yet implemented')
  }
}
module.exports = FilesytemUI
