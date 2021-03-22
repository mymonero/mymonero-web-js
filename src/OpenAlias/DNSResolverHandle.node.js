'use strict'

class DNSResolverHandle {
  constructor (options) {
    const self = this
    self.options = options
    self.abort_called_fn = options.abort_called_fn
    self.dnsResolver = options.dnsResolver // from node 'dns'
  }

  //
  // Imperatives - Overrides
  abort () {
    const self = this
    self.abort_called_fn()
  }
}
module.exports = DNSResolverHandle
