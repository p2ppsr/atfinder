const getServerConfig = require('./getServerConfig')
const axios = require('axios')

/**
 * Use this function to submit an SPV transaction to a Paymail server.
 *
 * Note that [hashwrap](https://github.com/p2ppsr/hashwrap) can be used to create SPV envelopes.
 *
 * @param {String} paymail the handle of the recipient
 * @param {Object} envelope the SPV envelope containing the transaction, which must include all specified envelope fields in addition to those listed
 * @param {String} envelope.reference the reference number provided by requestOutputsForP2PTransaction
 * @param {Object} [envelope.metadata] optional information about the payment
 * @param {String} [envelope.metadata.note] a human-readable note about the payment
 * @param {String} [envelope.metadata.sender] the handle of the sender
 * @param {String} [envelope.metadata.pubkey] an identity key of the sender
 * @param {String} [envelope.metadata.signature] a signature on the TXID from the provided identity key
 * @param {Object} [config] optional configuration options
 * @param {String} [config.dohServer=https://dns.google.com/resolve] DNS-over-HTTPS resolver
 *
 * @returns {Promise<Object>} response from the Paymail server
 *
 * @throws appropriate errors if the request did not succeed
 */
module.exports = async (paymail, envelope, config) => {
  const [alias, domain] = paymail.split('@')
  const serverConfig = await getServerConfig(paymail, config)
  const url = serverConfig.capabilities.e70928472537
    .replace('{alias}', alias)
    .replace('{domain.tld}', domain)
  const { data } = await axios.post(url, envelope)
  return data
}
