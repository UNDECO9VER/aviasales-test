export default class AviasalesService{
  _baseURL = 'https://aviasales-test-api.kata.academy/'
  _searchId


  getResource = async  (url) =>{
    const link = `${this._baseURL}${url}`
    const res = await fetch(link)
    if(!res.ok){
      throw new Error(res.status)
    }
    return await res.json()
  }

  getSearchId = async () =>{
    const res = await this.getResource('search')
    this._searchId = res.searchId
  }

  getTickets = async () =>{
    if (this._searchId) {
      const res = await this.getResource(`tickets?searchId=${this._searchId}`)
      return res
    }else(
      await this.getSearchId(),
      await this.getTickets()
    )
  }

}