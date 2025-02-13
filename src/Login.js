import React from 'react';
import Axios from 'axios';

import loginimg from './images/login-img.jpg';
// import loginimg1 from './images/molecular-background.jpg';
// import loginimg2 from './images/login-img.jpg';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { errormsg:'',
                        sucessmsg:'',
                        loginbox: true,
                        registerbox:false,
                    }
         }

         
         
    componentDidMount(){
        this.loginpopup();

    }
    loginpopup(){
        document.getElementById('LoginPopup').style.display='block';
    }

    validateUser(){
       
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            var result;
            let formdata =new FormData();
            formdata.append('user_name',username);
            formdata.append('user_pwd',password);
           
            Axios.post("http://192.168.0.5:8000/user_validate",formdata)
            .then(res=>{console.log(res.statusText)
            result =res.data;
            //this.sendData(username);
            if(result===1){
                sessionStorage.setItem("loaded",true)
                this.sendData(username);
                window.location.reload();
                this.setState({errormsg:''})
            }
            else
            {
                this.setState({errormsg:result})
                document.getElementById("username").value ='';
                document.getElementById("password").value ='';
              
            }
        })
    }
    sendData = (username) => {
        this.props.parentCallback("true",username);
        //console.log("to_parent")
      }
      handlenewuser(){
        this.setState({sucessmsg: ''});
          let username = document.getElementById("uname_register").value;
          let password = document.getElementById("pwd_register").value;
          //let confirmpwd = document.getElementById("pwd_cnfrm").value;
          let eamilid = document.getElementById("email_id").value;
          let contactnumber = document.getElementById("cont_No").value;

          var result;
          var users=[];
          Axios.get("http://192.168.0.5:8000/getusers")
          .then(res=>{    users = res.data;
                        // console.log(users)
          })
          .then(()=>{ 
      
              var usernmae_check = username;
             
            var   userthere = users.filter(tempuname => tempuname.toLowerCase().indexOf(usernmae_check.toLowerCase()) !== -1)
            //  console.log(users)
              if(userthere.length!==0){
              this.setState({errormsg: 'User Already Exists'});
              this.DoInputsEmpty();
              return 0;  
              }

              
         

          let formdata =new FormData();
          formdata.append('user_name',username);
          formdata.append('user_pwd',password);
          formdata.append('user_email_id',eamilid);
          formdata.append('user_cont_no',contactnumber);

        //  if( ){
        // if(username!==''&&password!==''&&eamilid!=='' && password===confirmpwd ){     
            if(username!==''&& password!==''&& this.state.errormsg===''){   


                Axios.post("http://192.168.0.5:8000/user_register",formdata)
                .then(res=>{console.log(res.statusText) 
                this.setState({sucessmsg: 'Registered successfully.'});
                this.DoInputsEmpty();
          })
        }
        else{
        
            this.setState({errormsg: 'Please Enter the Correct Details'});

                this.DoInputsEmpty();
            return;  
        }
  //  }
  //  else{

  //  }
}) 
      }
      DoInputsEmpty(){
        document.getElementById("uname_register").value ='';
        document.getElementById("pwd_register").value ='';
        document.getElementById("pwd_cnfrm").value ='';
        document.getElementById("email_id").value ='';
        document.getElementById("cont_No").value ='';
      }
      TologinUser(){
        this.setState({registerbox:false,loginbox:true,errormsg:'',sucessmsg: ''})
      }
      Tocreateuser(){
        this.setState({registerbox:true,loginbox:false,errormsg:'',sucessmsg: ''})
      }
      handlecnfmpwd(){
        this.setState({errormsg:'',sucessmsg: ''});
        let password = document.getElementById("pwd_register").value;
        let confirmpwd = document.getElementById("pwd_cnfrm").value;

        if(password!==confirmpwd)
        {
        this.setState({errormsg:'Password does not match'});
        document.getElementById("pwd_register").value ='';
        document.getElementById("pwd_cnfrm").value ='';
        }
      }
      handleemailId(){
          this.setState({errormsg:'',sucessmsg: ''})
        let eamilid = document.getElementById("email_id").value;
        var regEmail= /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        var validate= regEmail.test(eamilid)
        if(!validate){
            this.setState({errormsg:'please enter valid EmailId'});
            document.getElementById("email_id").value ='';
            return;
        }
      }
      handlecontactnumber(e){
        this.setState({errormsg:'',sucessmsg: ''});
                var length = e.target.value.length
                console.log("length is: ",length)
               // if( (length>1 && length<10) || length>10)  
                if(length!=10)
                {
                    this.setState({errormsg:'please enter valid contact number'});
                     document.getElementById("cont_No").value ='';
                     return;
                }
      }
      handleusername(){
        this.setState({errormsg:'',sucessmsg: ''});
      }
      handlepassword(){
        this.setState({errormsg:'',sucessmsg: ''});
      }
    render() { 
        return ( 
        <div id="LoginPopup"  className="login-wrapper">
            
                    <div className="imgcontainer">
                        <button  id="submit" value="Login" onClick={() => this.TologinUser()}>Login </button> &nbsp;
                        <button  id="submit" value="Login" onClick={() => this.Tocreateuser()}>New User </button>
                        <strong></strong>
                    </div>

          {this.state.loginbox &&  <div className="Login-box row">
                                    <div className="login-img col-sm-6 col-md-6 col-lg-6">
                            <img src={loginimg} className="login-img-tag" alt={"hi"} />
                    </div>
                <table className="login col-sm-6 col-md-6 col-lg-6">
                    <tr>
                        <input className="input100" type="text"name="username" id="username" title="Enter User Name" placeholder="Enter UserName"/>
                    </tr>
                    <tr><input type="password" className="input100" name="password" id="password" placeholder="Enter Password" /> </tr>
                    <tr><button  id="submit" value="Login" onClick={(e) => this.validateUser(e)}>Login </button></tr>
                    <tr><span style={{color:"red"}} > {this.state.errormsg} </span></tr>
                </table>

            </div > }
            
            {this.state.registerbox && <div className="Register-box">
                    <table className="login">
                    <tr><input type="text" className="input100" name="username" id="uname_register" title="Enter User Name" onBlur={(e)=>this.handleusername(e)}  placeholder="Enter UserName" /></tr>
                    <tr><input type="text"  className="input100" name="email_id" id="email_id"  placeholder="Enter Email ID" onBlur={()=>this.handleemailId()}/></tr>
                    <tr><input type="password" className="input100"  name="pwd_register" id="pwd_register" onBlur={(e)=>this.handlepassword(e)} placeholder="Enter Password" /></tr>
                    <tr><input type="password" className="input100"  name="pwd_cnfrm" id="pwd_cnfrm" onBlur={()=>this.handlecnfmpwd()} placeholder="Confirm Password" /></tr>
                    <tr><input type="number" className="input100 contact_num" name="cont_No" id="cont_No" onBlur={(e)=>this.handlecontactnumber(e)} placeholder="Enter Contact Number" /></tr>
                    <tr><button  id="submit" value="Login" onClick={() => this.handlenewuser()}>Register </button></tr>
                    <tr><span style={{color:"red"}}> {this.state.errormsg}</span></tr>
                    <tr><span style={{color:"green"}}> {this.state.sucessmsg}</span></tr>
            </table> 
            {/* {this.state.errormsg} */}

            </div >}

         
    </div> );
    }
}

