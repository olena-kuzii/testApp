import axios from 'axios'

const getConfig = async () => {
  const response = await axios.get(
    'https://gw.cds.amcn.com/config-cn/api/v1/amcplus-settings-ap/public/mobile/amc-plus/content.json'
  )

  return response.data.config
}

const getUnauthToken = async () => {
  const url = 'https://dev-gw.cds.amcn.com/auth-orchestration-id/api/vi/unauth'
  const headers = {
    'X-AMCN-TENANT': 'amcn',
    'X-AMCN-LANGUAGE': 'en',
    'X-COUNTRY-CODE': 'US',
    'X-AMCN-SERVICE-ID': 'amcplus',
    'X-AMCN-SERVICE-GROUP-ID': '10',
    'X-AMCN-NETWORK': 'amcplus',
    'X-CCPA-DO-NOT-SELL': 'default',
    'X-AMCN-DEVICE-AD-ID': 'GAID',
    'X-AMCN-DEVICE-ID': '15ecc87b-eb-5a-4b-36-a922-2075775cd298',
    'X-AMCN-PLATFORM': 'firetv',
    'Content-Type': 'application/json',
  }

  const response = await axios.post(url, {}, { headers })
  const token = response.data.data.access_token

  return token
}

const getGuestData = async (token, endpoint) => {
  const url = `https://qa-gw.cds.amcn.com/content-compiler-cr/api/v1/content/amcn/amcplus/${endpoint}?device=mobile`
  const headers = {
    'X-AMCN-TENANT': 'amcn',
    'X-AMCN-LANGUAGE': 'en',
    'X-COUNTRY-CODE': 'US',
    'X-AMCN-SERVICE-ID': 'amcplus',
    'X-AMCN-SERVICE-GROUP-ID': '10',
    'X-AMCN-NETWORK': 'amcplus',
    'X-CCPA-DO-NOT-SELL': 'default',
    'X-AMCN-DEVICE-AD-ID': 'GAID',
    'X-AMCN-DEVICE-ID': '15ecc87b-eb-5a-4b36-a922-2075775cd298',
    'X-AMCN-PLATFORM': 'firetv',
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  }

  const response = await axios.get(url, { headers })
  return response.data.data
}

const getFullGuestData = async () => {
  const config = await getConfig()
  const endpoint = config.unauth_entry_point.navigation.request.endpoint
  const token = await getUnauthToken()
  const data = await getGuestData(token, endpoint)

  return data.properties
}
export { getFullGuestData }
