const fetch = require('node-fetch')
const axios = require('axios')

const Crypto = require('crypto')
const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}

module.exports = { getRandom }
