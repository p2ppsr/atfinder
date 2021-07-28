const getServerConfig = require('./getServerConfig')
const axios = require('axios')

/**
 * Use this function to verify that a given identity key belongs to a handle.
 *
 * @param {String} paymail the handle of the target
 * @param {String} publicKey the DER-encoded public key to verify
 * @param {Object} [config] optional configuration options
 * @param {String} [config.dohServer=https://dns.google.com/resolve] DNS-over-HTTPS resolver
 *
 * @returns {Promise<Object>} response from the Paymail server
 *
 * @throws appropriate errors if the request did not succeed
 */
module.exports = async (paymail, publicKey, config) => {
  const [alias, domain] = paymail.split('@')
  const serverConfig = await getServerConfig(paymail, config)
  const url = serverConfig.capabilities.a9f510c16bde
    .replace('{alias}', alias)
    .replace('{domain.tld}', domain)
    .replace('{pubkey}', publicKey)
  const { data } = await axios.get(url)
  return data
}
