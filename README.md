# AtFinder

Paymail Client

The code is hosted [on GitHub](https://github.com/p2ppsr/atfinder) and the package is available [through NPM](https://www.npmjs.com/package/atfinder).

## Installation

```sh
npm i atfinder
```

## Example Usage

```js
const atfinder = require('atfinder')
const paymail = 'ty@tyweb.us'

// Get the bsvalias config file for the domain host
await atfinder.getServerConfig(paymail)

// Get the name and photo URL
await atfinder.getNameAndPhotoURL(paymail)

// Request transaction outputs
const satoshis = 1337
await atfinder.requestOutputsForP2PTransaction(paymail, satoshis)

// Submit an SPV transaction
// Note that the envelope contains the reference number
await atfinder.submitSPVTransaction(paymail, envelope)
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

*   [getServerConfig](#getserverconfig)
    *   [Parameters](#parameters)
*   [getNameAndPhotoURL](#getnameandphotourl)
    *   [Parameters](#parameters-1)
*   [requestOutputsForP2PTransaction](#requestoutputsforp2ptransaction)
    *   [Parameters](#parameters-2)
*   [submitSPVTransaction](#submitspvtransaction)
    *   [Parameters](#parameters-3)
*   [deprecatedSubmitP2PTransaction](#deprecatedsubmitp2ptransaction)
    *   [Parameters](#parameters-4)
*   [verifyPublicKeyForPaymail](#verifypublickeyforpaymail)
    *   [Parameters](#parameters-5)
*   [getIdentityKeyForPaymail](#getidentitykeyforpaymail)
    *   [Parameters](#parameters-6)

### getServerConfig

Use this function to get the well-known bsvalias configuration object for the server that hosts a handle.

This is a low-level utility.

#### Parameters

*   `paymail` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** the handle of the target
*   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** optional configuration options (optional, default `{}`)

    *   `config.dohServer` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** DNS-over-HTTPS resolver (optional, default `https://dns.google.com/resolve`)

<!---->

*   Throws **any** appropriate errors if the request did not succeed

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** response from the Paymail server

### getNameAndPhotoURL

Use this function to get the name nad avatar photo URL of a handle.

#### Parameters

*   `paymail` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** the handle of the target
*   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** optional configuration options

    *   `config.dohServer` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** DNS-over-HTTPS resolver (optional, default `https://dns.google.com/resolve`)

<!---->

*   Throws **any** appropriate errors if the request did not succeed

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** response from the Paymail server

### requestOutputsForP2PTransaction

Use this function to get a payment invoice for a P2P or SPV transaction

#### Parameters

*   `paymail` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** the handle of the target
*   `satoshis` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** the amount of satoshis to send
*   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** optional configuration options

    *   `config.dohServer` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** DNS-over-HTTPS resolver (optional, default `https://dns.google.com/resolve`)

<!---->

*   Throws **any** appropriate errors if the request did not succeed

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** response from the Paymail server

### submitSPVTransaction

Use this function to submit an SPV transaction to a Paymail server.

Note that [hashwrap](https://github.com/p2ppsr/hashwrap) can be used to create SPV envelopes.

#### Parameters

*   `paymail` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** the handle of the recipient
*   `envelope` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** the SPV envelope containing the transaction, which must include all specified envelope fields in addition to those listed

    *   `envelope.reference` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** the reference number provided by requestOutputsForP2PTransaction
    *   `envelope.metadata` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** optional information about the payment

        *   `envelope.metadata.note` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** a human-readable note about the payment
        *   `envelope.metadata.sender` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** the handle of the sender
        *   `envelope.metadata.pubkey` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** an identity key of the sender
        *   `envelope.metadata.signature` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** a signature on the TXID from the provided identity key
*   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** optional configuration options

    *   `config.dohServer` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** DNS-over-HTTPS resolver (optional, default `https://dns.google.com/resolve`)

<!---->

*   Throws **any** appropriate errors if the request did not succeed

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** response from the Paymail server

### deprecatedSubmitP2PTransaction

Use this function to submit a P2P transaction to a Paymail server.

As of July 2021, this is how MoneyButton and HandCash handle P2P transactions. However, it is deprecated in favor of using submitSPVTransaction instead where possible.

Note that [hashwrap](https://github.com/p2ppsr/hashwrap) can be used to create SPV envelopes.

#### Parameters

*   `paymail` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** the handle of the recipient
*   `reference` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** the reference number provided by requestOutputsForP2PTransaction
*   `hex` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** the signed Bitcoin transaction
*   `metadata` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** optional information about the payment

    *   `metadata.note` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** a human-readable note about the payment
    *   `metadata.sender` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** the handle of the sender
    *   `metadata.pubkey` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** an identity key of the sender
    *   `metadata.signature` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** a signature on the TXID from the provided identity key
*   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** optional configuration options

    *   `config.dohServer` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** DNS-over-HTTPS resolver (optional, default `https://dns.google.com/resolve`)

<!---->

*   Throws **any** appropriate errors if the request did not succeed

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** response from the Paymail server

### verifyPublicKeyForPaymail

Use this function to verify that a given identity key belongs to a handle.

#### Parameters

*   `paymail` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** the handle of the target
*   `publicKey` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** the DER-encoded public key to verify
*   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** optional configuration options

    *   `config.dohServer` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** DNS-over-HTTPS resolver (optional, default `https://dns.google.com/resolve`)

<!---->

*   Throws **any** appropriate errors if the request did not succeed

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** response from the Paymail server

### getIdentityKeyForPaymail

Use this function to get the identity key of a handle.

#### Parameters

*   `paymail` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** the handle of the target
*   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** optional configuration options

    *   `config.dohServer` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** DNS-over-HTTPS resolver (optional, default `https://dns.google.com/resolve`)

<!---->

*   Throws **any** appropriate errors if the request did not succeed

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** response from the Paymail server

## License

The license for the code in this repository is the Open BSV License.