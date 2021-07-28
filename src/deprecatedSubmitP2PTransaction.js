const getServerConfig = require('./getServerConfig')
const axios = require('axios')

/**
 * Use this function to submit a P2P transaction to a Paymail server.
 *
 * As of July 2021, this is how MoneyButton and HandCash handle P2P transactions. However, it is deprecated in favor of using submitSPVTransaction instead where possible.
 *
 * Note that [hashwrap](https://github.com/p2ppsr/hashwrap) can be used to create SPV envelopes.
 *
 * @param {String} paymail the handle of the recipient
 * @param {String} reference the reference number provided by requestOutputsForP2PTransaction
 * @param {String} hex the signed Bitcoin transaction
 * @param {Object} [metadata] optional information about the payment
 * @param {String} [metadata.note] a human-readable note about the payment
 * @param {String} [metadata.sender] the handle of the sender
 * @param {String} [metadata.pubkey] an identity key of the sender
 * @param {String} [metadata.signature] a signature on the TXID from the provided identity key
 * @param {Object} [config] optional configuration options
 * @param {String} [config.dohServer=https://dns.google.com/resolve] DNS-over-HTTPS resolver
 *
 * @returns {Promise<Object>} response from the Paymail server
 *
 * @throws appropriate errors if the request did not succeed
 */
module.exports = async (paymail, reference, hex, metadata, config) => {
  const [alias, domain] = paymail.split('@')
  const serverConfig = await getServerConfig(paymail, config)
  const url = serverConfig.capabilities['5f1323cddf31']
    .replace('{alias}', alias)
    .replace('{domain.tld}', domain)
  const { data } = await axios.post(url, { reference, hex, metadata })
  return data
}
