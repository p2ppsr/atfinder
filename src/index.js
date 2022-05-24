module.exports = {
  getServerConfig: require('./getServerConfig'),
  getNameAndPhotoURL: require('./getNameAndPhotoURL'),
  requestOutputsForP2PTransaction: require('./requestOutputsForP2PTransaction'),
  submitSPVTransaction: require('./submitSPVTransaction'),
  deprecatedSubmitP2PTransaction: require('./deprecatedSubmitP2PTransaction'),
  verifyPublicKeyForPaymail: require('./verifyPublicKeyForPaymail'),
  getIdentityKeyForPaymail: require('./getIdentityKeyForPaymail'),
  getCertifiedKey: require('./getCertifiedKey'),
  submitType42Payment: require('./submitType42Payment')
}
