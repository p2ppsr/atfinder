const atfinder = require('../index')

/*

This integration test suite uses real HTTPS requests. Thus, it will need to be updated if:
- ty@tyweb.us changes its identity key
- tyweb.us significantly changes its well-known configuration
- tye tyweb.us domain expires, or other related events happen

*/

const TYS_PUBKEY = '032a0e522c34060279995dd2bf698871fc6bd35ad4efc4423edd8903fb68c4052c'

describe('atfinder', () => {
  it('getServerConfig', async () => {
    const result = await atfinder.getServerConfig('ty@tyweb.us')
    expect(result).toEqual(expect.objectContaining({
      bsvalias: '1.0',
      capabilities: expect.objectContaining({
        a9f510c16bde: 'https://dojo.babbage.systems/verifyPublicKeyForPaymail/{alias}@{domain.tld}/{pubkey}',
        f12f968c92d6: 'https://dojo.babbage.systems/getAvatarForPaymail/{alias}@{domain.tld}',
        pki: 'https://dojo.babbage.systems/getIdentityKeyForPaymail/{alias}@{domain.tld}'
      })
    }))
  })
  it('getNameAndPhotoURL', async () => {
    const result = await atfinder.getNameAndPhotoURL('ty@tyweb.us')
    expect(result).toEqual({
      name: 'Ty Everett',
      photoURL: 'https://tyweb.us/ty.jpg'
    })
  })
  it('getIdentityKeyForPaymail', async () => {
    const result = await atfinder.getIdentityKeyForPaymail('ty@tyweb.us')
    expect(result).toEqual({
      bsvalias: '1.0',
      handle: 'ty@tyweb.us',
      pubkey: TYS_PUBKEY
    })
  })
  it('verifyPublicKeyForPaymail', async () => {
    const result = await atfinder.verifyPublicKeyForPaymail(
      'ty@tyweb.us',
      TYS_PUBKEY
    )
    expect(result).toEqual({
      handle: 'ty@tyweb.us',
      match: true,
      pubkey: TYS_PUBKEY
    })
  })
})
