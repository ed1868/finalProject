import axios from "axios";

class CaseService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:5000/cases",
      withCredentials: true
    })
  }

  addCase = (cases) => {
    const formData = new FormData();
    Object.keys(cases).forEach(key => formData.append(key, cases[key]));
    console.log(cases)
    
    return this.service.post('/new', formData,{
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
    
       
    
  ).then(response => response.data)
    }

  }
  

export default CaseService;