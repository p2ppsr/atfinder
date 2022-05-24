const atfinder = require('../index')
const axios = require('axios')

jest.mock('axios')

const VALID_DNS_RESPONSE = {
  data: {
    Answer: [{ data: '10 10 443 mock.host.' }]
  }
}

const VALID_BSVALIAS = {
  data: {
    bsvalias: '1.0',
    capabilities: {
      '2a40af698840': '2a40af698840/{alias}@{domain.tld}',
      '5f1323cddf31': '5f1323cddf31/{alias}@{domain.tld}',
      a9f510c16bde: 'a9f510c16bde/{alias}@{domain.tld}/{pubkey}',
      f12f968c92d6: 'f12f968c92d6/{alias}@{domain.tld}',
      pki: 'pki/{alias}@{domain.tld}',
      e70928472537: 'e70928472537/{alias}@{domain.tld}',
      "747a1532f8fd": {
        "initialRequest": "/authrite/initialRequest",
        "cc7e1ab66d10": "/getCertifiedKey/{alias}@{domain.tld}",
        "92be59b59616": {
          "protocols": {
            "3241645161d8": true
          },
          "paymentURL": "/submitSPVTransaction/{alias}@{domain.tld}"
        }
      }
    }
  }
}

describe('atfinder', () => {
  beforeEach(() => {
    axios.get.mockReturnValueOnce(VALID_DNS_RESPONSE)
      .mockReturnValueOnce(VALID_BSVALIAS)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('getServerConfig', async () => {
    const result = await atfinder.getServerConfig('ty@tyweb.us')
    expect(result).toEqual(VALID_BSVALIAS.data)
    expect(axios.get.mock.calls).toEqual([
      ['https://dns.google.com/resolve?name=_bsvalias._tcp.tyweb.us&type=SRV&cd=0'],
      ['https://mock.host/.well-known/bsvalias']
    ])
  })
  it('getNameAndPhotoURL', async () => {
    axios.get.mockReturnValueOnce({
      data: {
        name: 'Ty Everett',
        photoURL: 'MOCK_URL'
      }
    })
    const result = await atfinder.getNameAndPhotoURL('ty@tyweb.us')
    expect(result).toEqual({
      name: 'Ty Everett',
      photoURL: 'MOCK_URL'
    })
    expect(axios.get.mock.calls[2]).toEqual([
      'f12f968c92d6/ty@tyweb.us'
    ])
  })
  it('getIdentityKeyForPaymail', async () => {
    axios.get.mockReturnValueOnce({
      data: 'MOCK_GET_ID_KEY'
    })
    const result = await atfinder.getIdentityKeyForPaymail('ty@tyweb.us')
    expect(result).toEqual('MOCK_GET_ID_KEY')
    expect(axios.get.mock.calls[2]).toEqual([
      'pki/ty@tyweb.us'
    ])
  })
  it('verifyPublicKeyForPaymail', async () => {
    axios.get.mockReturnValueOnce({
      data: 'MOCK_VERIFY_KEY'
    })
    const result = await atfinder.verifyPublicKeyForPaymail(
      'ty@tyweb.us',
      'MOCK_KEY'
    )
    expect(result).toEqual('MOCK_VERIFY_KEY')
    expect(axios.get.mock.calls[2]).toEqual([
      'a9f510c16bde/ty@tyweb.us/MOCK_KEY'
    ])
  })
  it('requestOutputsForP2PTransaction', async () => {
    axios.post.mockReturnValueOnce({
      data: 'MOCK_TX_INVOICE'
    })
    const result = await atfinder.requestOutputsForP2PTransaction(
      'ty@tyweb.us',
      1337
    )
    expect(result).toEqual('MOCK_TX_INVOICE')
    expect(axios.post.mock.calls[0]).toEqual([
      '2a40af698840/ty@tyweb.us',
      {
        satoshis: 1337
      }
    ])
  })
  it('submitSPVTransaction', async () => {
    axios.post.mockReturnValueOnce({
      data: 'MOCK_SUBMIT_SPV'
    })
    const result = await atfinder.submitSPVTransaction(
      'ty@tyweb.us',
      {
        envelopeField: 'MOCK_VALUE'
      }
    )
    expect(result).toEqual('MOCK_SUBMIT_SPV')
    expect(axios.post.mock.calls[0]).toEqual([
      'e70928472537/ty@tyweb.us',
      {
        envelopeField: 'MOCK_VALUE'
      }
    ])
  })
  it('getCertifiedKey', async () => {
    const authriteClient = {
      request: jest.fn((url, config) => {
        return {
          body: Buffer.from(JSON.stringify({
            server: 'response'
          }), 'utf8')
        }
      })
    }
    const result = await atfinder.getCertifiedKey(
      'ty@tyweb.us',
      authriteClient
    )
    expect(result).toEqual({ server: 'response' })
    expect(authriteClient.request)
      .toHaveBeenLastCalledWith(
        '/getCertifiedKey/ty@tyweb.us',
        { method: 'GET' }
      )
  })
  it('submitType42Payment', async () => {
    const authriteClient = {
      request: jest.fn((url, config) => {
        return {
          body: Buffer.from(JSON.stringify({
            server: 'response'
          }), 'utf8')
        }
      })
    }
    const result = await atfinder.submitType42Payment(
      'ty@tyweb.us',
      { test: 'body' },
      authriteClient
    )
    expect(result).toEqual({ server: 'response' })
    expect(authriteClient.request)
      .toHaveBeenLastCalledWith(
        '/submitSPVTransaction/ty@tyweb.us',
        { method: 'POST', body: { test: 'body' } }
      )
  })
  it('deprecatedSubmitP2PTransaction', async () => {
    axios.post.mockReturnValueOnce({
      data: 'MOCK_SUBMIT_P2P'
    })
    const result = await atfinder.deprecatedSubmitP2PTransaction(
      'ty@tyweb.us',
      'MOCK_REFNO',
      'MOCK_TX',
      { sender: 'l@tyweb.us' }
    )
    expect(result).toEqual('MOCK_SUBMIT_P2P')
    expect(axios.post.mock.calls[0]).toEqual([
      '5f1323cddf31/ty@tyweb.us',
      {
        reference: 'MOCK_REFNO',
        hex: 'MOCK_TX',
        metadata: {
          sender: 'l@tyweb.us'
        }
      }
    ])
  })
})
