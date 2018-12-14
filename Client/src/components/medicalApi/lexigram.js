import axios from "axios";

class Lexigram {
  constructor() {
    this.service = axios.create({
      baseURL: "https://api.lexigram.io/v1/extract/entities",
      withCredentials: true
    })
  }

  search = (query) => {
    
    return this.service.post('/, query){
    .then(response => response.data)
  }

}

export default Lexigram;