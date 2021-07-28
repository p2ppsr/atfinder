const getServerConfig = require('./getServerConfig')
const axios = require('axios')

/**
 * Use this function to get a payment invoice for a P2P or SPV transaction
 *
 * @param {String} paymail the handle of the target
 * @param {Number} satoshis the amount of satoshis to send
 * @param {Object} [config] optional configuration options
 * @param {String} [config.dohServer=https://dns.google.com/resolve] DNS-over-HTTPS resolver
 *
 * @returns {Promise<Object>} response from the Paymail server
 *
 * @throws appropriate errors if the request did not succeed
 */
module.exports = async (paymail, satoshis, config) => {
  const [alias, domain] = paymail.split('@')
  const serverConfig = await getServerConfig(paymail, config)
  const url = serverConfig.capabilities['2a40af698840']
    .replace('{alias}', alias)
    .replace('{domain.tld}', domain)
  const { data } = await axios.post(url, { satoshis })
  return data
}
