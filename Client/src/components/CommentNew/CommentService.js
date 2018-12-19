import axios from "axios";

class commentService {
  constructor() {

    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/comments`,
      withCredentials: true
    })
  }

  createComment = (comment,id) => {
    
    const formData = new FormData();
    Object.keys(comment).forEach(key => formData.append(key, comment[key]));
    console.log(comment)
    
    return this.service.post(`/${comment.caseId}`, comment,{
    }
    
       
    
  ).then(response => response.data)
    }

  }
  

export default commentService;