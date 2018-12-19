import axios from "axios";

class CaseService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/community`,
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