import axios from "axios";

class CaseService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:5000/community",
      withCredentials: true
    })
  }

  createMessage = (message) => {
    
    const formData = new FormData();
    Object.keys(message).forEach(key => formData.append(key, message[key]));
    console.log(message)
    
    return this.service.post('/messages/new', message,{
    }
    
       
    
  ).then(response => response.data)
    }

  }
  

export default CaseService;