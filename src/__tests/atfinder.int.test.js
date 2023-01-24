/* global expect it describe */

const atfinder = require('../index')

/*

This integration test suite uses real HTTPS requests. Thus, it will need to be updated if:
- ty@tyweb.us changes its identity key
- tyweb.us significantly changes its well-known configuration
- tye tyweb.us domain expires, or other related events happen

*/

// const TYS_PUBKEY = '032a0e522c34060279995dd2bf698871fc6bd35ad4efc4423edd8903fb68c4052c'

describe('atfinder', () => {
  it('getServerConfig', async () => {
    const result = await atfinder.getServerConfig('ty@tyweb.us')
    expect(result).toEqual(
      expect.objectContaining({
        bsvalias: '1.0',
        capabilities: expect.objectContaining({
          '747a1532f8fd': {
            '5ffa478a0102': {
              changePaymail: 'https://dojo.babbage.systems/changePaymail',
              createTransaction:
                'https://dojo.babbage.systems/createTransaction',
              dojoURL: 'https://dojo.babbage.systems',
              getCurrentPaymails:
                'https://dojo.babbage.systems/getCurrentPaymails',
              getCurrentReceivePolicy:
                'https://dojo.babbage.systems/getCurrentReceivePolicy',
              getPendingTransactions:
                'https://dojo.babbage.systems/getPendingTransactions',
              getTotalOfAmounts:
                'https://dojo.babbage.systems/getTotalOfAmounts',
              getTotalOfUnspentOutputs:
                'https://dojo.babbage.systems/getTotalOfUnspentOutputs',
              getTransactionOutputs:
                'https://dojo.babbage.systems/getTransactionOutputs',
              getTransactions: 'https://dojo.babbage.systems/getTransactions',
              processTransaction:
                'https://dojo.babbage.systems/processTransaction',
              setNameAndPhotoURL:
                'https://dojo.babbage.systems/setNameAndPhotoURL',
              setReceivePolicy: 'https://dojo.babbage.systems/setReceivePolicy',
              updateOutpointStatus:
                'https://dojo.babbage.systems/updateOutpointStatus',
              updateTransactionStatus:
                'https://dojo.babbage.systems/updateTransactionStatus',
              version: '0.1'
            },
            '92be59b59616': {
              paymentURL:
                'https://dojo.babbage.systems/submitSPVTransaction/{alias}@{domain.tld}',
              protocols: { '3241645161d8': true }
            },
            cc7e1ab66d10:
              'https://dojo.babbage.systems/getCertifiedKey/{alias}@{domain.tld}',
            initialRequest:
              'https://dojo.babbage.systems/authrite/initialRequest'
          },
          f12f968c92d6:
            'https://dojo.babbage.systems/getAvatarForPaymail/{alias}@{domain.tld}'
        })
      })
    )
  })
  // it("getNameAndPhotoURL", async () => {
  //   const result = await atfinder.getNameAndPhotoURL("ty@tyweb.us");
  //   expect(result).toEqual({
  //     name: "Ty Everett",
  //     photoURL: "https://tyweb.us/ty.jpg",
  //   });
  // });
  // it("getIdentityKeyForPaymail", async () => {
  //   const result = await atfinder.getIdentityKeyForPaymail("ty@tyweb.us");
  //   expect(result).toEqual({
  //     bsvalias: "1.0",
  //     handle: "ty@tyweb.us",
  //     pubkey: TYS_PUBKEY,
  //   });
  // });
  // it("verifyPublicKeyForPaymail", async () => {
  //   const result = await atfinder.verifyPublicKeyForPaymail(
  //     "ty@tyweb.us",
  //     TYS_PUBKEY
  //   );
  //   expect(result).toEqual({
  //     handle: "ty@tyweb.us",
  //     match: true,
  //     pubkey: TYS_PUBKEY,
  //   });
  // });
  it('moneybutton.com getNameAndPhotoURL', async () => {
    const result = await atfinder.getNameAndPhotoURL('1@moneybutton.com')
    expect(result).toEqual({
      avatar:
        'https://www.gravatar.com/avatar/5d354bfcf442c94d3b16fc5065f22eb0?d=identicon',
      name: 'Name'
    })
  })
  it('handcash.io getNameAndPhotoURL', async () => {
    const result = await atfinder.getNameAndPhotoURL('alex@handcash.io')
    expect(result).toEqual({
      avatar: 'https://cloud.handcash.io/v2/users/profilePicture/alex',
      name: 'Alex'
    })
  })
  it('relayx.io getIdentityKeyForPaymail', async () => {
    const result = await atfinder.getIdentityKeyForPaymail('jack@relayx.io')
    expect(result).toEqual({
      bsvalias: '1.0',
      handle: 'jack@relayx.io',
      pubkey:
        '02c53a88890ed8cb23fe14174b5aab3494ad76285fa6be8ecc4369870826a7109a'
    })
  })
  it('canonic.xyz getIdentityKeyForPaymail', async () => {
    const result = await atfinder.getIdentityKeyForPaymail(
      'canonic@canonic.xyz'
    )
    expect(result).toEqual({
      bsvalias: '1.0',
      handle: 'canonic@canonic.xyz',
      pubkey:
        '0271d0234990c987cce5776efba77443dea90b7d285a73aeb75a8a9b52cc1bdf5a'
    })
  })
})
