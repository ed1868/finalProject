import axios from "axios";

class Lexigram {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true
    })
  }

  search = (query) => {
    return this.service.get(`/auth/search/?q=${query}&limit=20`)
    .then(response => {
      console.log(response);
    })
  }

}

export default Lexigram;