import React from 'react';
import Axios from 'axios';


export default class axiostest extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
                    }
         }
             
         handleclick2(){
       
            let msg2 = "message from click2"
            var result;
            let formdata =new FormData();
            formdata.append('message2',msg2);

           
            Axios.post("http://localhost:8000/click2",formdata)
            .then(res=>{console.log(res.statusText)
            result =res.data;
            console.log(result);

        })
    }

      handleclick(){
         
          let msg1 = "message1 from click1"
          let msg2 = "message2 from click1"


          var result;
          let formdata =new FormData();
          formdata.append('message1',msg1);
          formdata.append('message2',msg2);

                Axios.post("http://localhost:8000/click",formdata)
                .then(res=>{console.log(res.statusText)
                result =res.data;  
                    console.log(result);
          })
        
        }



    render() { 
        return ( 
        <div >
                    <button  id="submit"  onClick={() => this.handleclick()}>Click </button>
                    <button  id="submit" onClick={() => this.handleclick2()}>Click 2</button>
    </div> )
    }
      }

