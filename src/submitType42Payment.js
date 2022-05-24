const getServerConfig = require('./getServerConfig')

/**
 * Use this function to submit a type-42 payment to a Paymail server.
 *
 * Note that [hashwrap](https://github.com/p2ppsr/hashwrap) can be used to create SPV envelopes.
 *
 * @param {String} paymail the handle of the recipient
 * @param {Object} body the body of the request, including `protocol` and `transactions` fields
 * @param {Object} authriteClient an initialized Authrite client to use
 * @param {Object} [config] optional configuration options
 * @param {String} [config.dohServer=https://dns.google.com/resolve] DNS-over-HTTPS resolver
 *
 * @returns {Promise<Object>} response from the Paymail server
 *
 * @throws appropriate errors if the request did not succeed
 */
module.exports = async (paymail, body, authriteClient, config) => {
  const [alias, domain] = paymail.split('@')
  const serverConfig = await getServerConfig(paymail, config)
  const url = serverConfig.capabilities['747a1532f8fd']['92be59b59616']
    .paymentURL
    .replace('{alias}', alias)
    .replace('{domain.tld}', domain)
  const { body: responseBody } = await authriteClient.request(
    url,
    { method: 'POST', body }
  )
  return JSON.parse(Buffer.from(responseBody).toString('utf8'))
}
