'use strict'

const TXTRecordResolver = require('../../OpenAlias/TXTResolver.web')
const txtRecordResolver = new TXTRecordResolver({})

const FilesystemUI = require('../../FilesystemUI/FilesystemUI.browser')
const WindowDialogs = require('../../WindowDialogs/WindowDialogs.browser')
const CCyConversionRates = require('../../CcyConversionRates/Controller')
const StringCryptor = require('../../symmetric_cryptor/BackgroundStringCryptor.noOp')
const Persister = require('../../DocumentPersister/DocumentPersister.InMemory')
const BackgroundAPIResponseParser = require('@mymonero/mymonero-response-parser-utils')
const HostedMoneroAPIClient = require('@mymonero/mymonero-hosted-api')
const OpenAliasResolver = require('../../OpenAlias/OpenAliasResolver')
const PasswordController = require('../../Passwords/Controllers/PasswordController.Lite')
const SettingsController = require('../../Settings/Controllers/SettingsController')
const UserIdleInWindowController = require('../../UserIdle/UserIdleInWindowController')
const WalletsListController = require('../../WalletsList/Controllers/WalletsListController.Lite')
const WalletAppCoordinator = require('../../WalletAppCoordinator/WalletAppCoordinator')
const ExceptionAlerting = require('../../MainWindow/Controllers/ExceptionAlerting.browser.web.js')
const ClipboardJS = require('clipboard')

function NewHydratedContext (initialContext) {
  initialContext = initialContext || {}

  const context = initialContext != null ? initialContext : {}

  context.clipboard = new ClipboardJS('.copy-trigger')
  context.filesystemUI = new FilesystemUI({}, context)
  context.windowDialogs = new WindowDialogs({}, context)
  context.CcyConversionRates_Controller_shared = new CCyConversionRates({}, context)
  context.string_cryptor__background = new StringCryptor({}, context)
  context.persister = new Persister({}, context)
  context.backgroundAPIResponseParser = new BackgroundAPIResponseParser({
    coreBridge_instance: context.monero_utils // the same as coreBridge_instance
  }, context)
  context.hostedMoneroAPIClient = new HostedMoneroAPIClient({
    appUserAgent_product: context.name,
    appUserAgent_version: context.version,
    apiUrl: context.apiUrl,
    request_conformant_module: require('xhr')
  }, context)
  context.openAliasResolver = new OpenAliasResolver({
    txtRecordResolver: txtRecordResolver
  }, context)
  context.passwordController = new PasswordController({}, context)
  context.settingsController = new SettingsController({}, context)
  context.userIdleInWindowController = new UserIdleInWindowController({}, context)
  context.walletsListController = new WalletsListController({}, context)
  context.walletAppCoordinator = new WalletAppCoordinator({}, context)
  context.exceptionAlerting = new ExceptionAlerting({}, context)

  const contextKeys = Object.keys(context)
  for (const i in contextKeys) {
    const contextKey = contextKeys[i]
    const instance = context[contextKey]
    // This calls an optional function that classes can implement to get control after the whole context is set up
    const postWholeContextInit_setup__fn = instance.RuntimeContext_postWholeContextInit_setup
    if (typeof postWholeContextInit_setup__fn !== 'undefined') {
      postWholeContextInit_setup__fn.call(instance) // using 'call' so the function's "this" is instance
    }
  }

  return context
}
module.exports.NewHydratedContext = NewHydratedContext
