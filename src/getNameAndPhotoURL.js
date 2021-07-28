const getServerConfig = require('./getServerConfig')
const axios = require('axios')

/**
 * Use this function to get the name nad avatar photo URL of a handle.
 *
 * @param {String} paymail the handle of the target
 * @param {Object} [config] optional configuration options
 * @param {String} [config.dohServer=https://dns.google.com/resolve] DNS-over-HTTPS resolver
 *
 * @returns {Promise<Object>} response from the Paymail server
 *
 * @throws appropriate errors if the request did not succeed
 */
module.exports = async (paymail, config) => {
  const [alias, domain] = paymail.split('@')
  const serverConfig = await getServerConfig(paymail, config)
  const url = serverConfig.capabilities.f12f968c92d6
    .replace('{alias}', alias)
    .replace('{domain.tld}', domain)
  const { data } = await axios.get(url)
  return data
}
