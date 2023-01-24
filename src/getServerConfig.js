const axios = require('axios')

/**
 * Use this function to get the well-known bsvalias configuration object for the server that hosts a handle.
 *
 * This is a low-level utility.
 *
 * @param {String} paymail the handle of the target
 * @param {Object} [config] optional configuration options
 * @param {String} [config.dohServer=https://dns.google.com/resolve] DNS-over-HTTPS resolver
 *
 * @returns {Promise<Object>} response from the Paymail server
 *
 * @throws appropriate errors if the request did not succeed
 */
module.exports = async (
  paymail,
  { dohServer = 'https://dns.google.com/resolve' } = {}
) => {
  const domain = paymail.split('@')[1]
  // Allow resolving Paymails when the server is running locally for testing
  if (domain === 'localhost' || domain.startsWith('localhost:')) {
    const { data: serverConfig } = await axios.get(
      `http://${domain}/.well-known/bsvalias`
    )
    return serverConfig
  }
  const { data: dohResponse } = await axios.get(
    `${dohServer}?name=_bsvalias._tcp.${domain}&type=SRV&cd=0`
  )
  let hostDomain
  if (dohResponse.Answer) {
    hostDomain = dohResponse.Answer[0].data.split(' ').pop()
    hostDomain = hostDomain.substr(0, hostDomain.length - 1)
  } else {
    hostDomain = domain
    if (hostDomain === 'moneybutton.com') hostDomain = 'www.moneybutton.com' // Browsers get CORS error on 302 redirect. Hard code this until moneybutton fixes it.
  }

  const { data: serverConfig } = await axios.get(
    `https://${hostDomain}/.well-known/bsvalias`
  )
  return serverConfig
}
