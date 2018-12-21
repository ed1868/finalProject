import axios from "axios";

class Lexigram {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true
    })
  }

  search = (query) => {
    let a = query.query.query;
    console.log(query);
    console.log(a);
    return this.service.get(`/auth/search/${a}`)
    .then(response => {
      let payload= JSON.parse(response.data.body);
      let cleanPayload= payload.conceptSearchHits;
      return cleanPayload.map(concept => {
        return concept.concept.label;
      })
    })
  }

}

export default Lexigram;