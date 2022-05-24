const getServerConfig = require('./getServerConfig')

/**
 * Use this function to get the Authrite type-42 certified key for a Paymail
 * handle. Requires an initialized Authrite client as a parameter.
 *
 * @param {String} paymail the handle of the target
 * @param {Object} authriteClient the initialized Authrite client to use
 * @param {Object} [config] optional configuration options
 * @param {String} [config.dohServer=https://dns.google.com/resolve] DNS-over-HTTPS resolver
 *
 * @returns {Promise<Object>} response from the Paymail server
 *
 * @throws appropriate errors if the request did not succeed
 */
module.exports = async (paymail, authriteClient, config) => {
  const [alias, domain] = paymail.split('@')
  const serverConfig = await getServerConfig(paymail, config)
  const url = serverConfig.capabilities['747a1532f8fd']['cc7e1ab66d10']
    .replace('{alias}', alias)
    .replace('{domain.tld}', domain)
  const { body } = await authriteClient.request(url, { method: 'GET' })
  return JSON.parse(Buffer.from(body).toString('utf8'))
}
