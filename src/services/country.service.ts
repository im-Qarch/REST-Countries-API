import type { AxiosRequestConfig } from 'axios'
import service from './service'

class CountryService {
  /**
   * @description get countries list
   */
  public getCountries(params: AxiosRequestConfig = {}) {
    return (
      service({
        url: '/all?fields=capital,population,region,name,flags',
        method: 'GET',
        params,
      })
    )
  }

  /**
   * @description get countries filtered list
   */
  public getFilteredCountries(property = 'name', value = '') {
    return (
      service({
        url: `/${property}/${value}?fields=capital,population,region,name,flags`,
        method: 'GET',
      })
    )
  }

  /**
   * @description get one country information
   */
  public getCountry(country_name: string) {
    return (
      service({
        url: `https://restcountries.com/v3.1/name/${country_name}`,
        method: 'GET',
      })
    )
  }
}

export default new CountryService()
