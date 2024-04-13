const RESPONSE_MODES={
    NORMAL:(behav)=>new Normal_ResponseMode(),
    ERR_AUTH:(behav)=>new ErrAuth_ResponseMode(behav),
    ERR_BAN:(behav)=>new ErrBan_ResponseMode(behav),
    ERR_UNKN:(behav)=>new ErrUnknown_ResponseMode()
}

const ERROR_BEHAVIOURS={
    0:"always",
    1:"fail_1",
    2:"fail_2"
}


//---------------------------- Clases ----------------------------------

//Clase base
class ResponseMode {
    constructor(){

    }
    get_json(data,reqId){
       return this.p__get_json(data);
    }

    p__get_json(){}
}

class Normal_ResponseMode extends ResponseMode{
    constructor(){
        super();
    }

    p__get_json(data){
        return {data:data};
    }
}

class ErrAuth_ResponseMode extends ResponseMode{
    constructor(behavRule){
        super(behavRule);
        if (behavRule){
            this.MidError_Mode=new InMidError_Mode(behavRule);
        }
    }

    p__get_json(data,reqId){
        if (this.MidError_Mode.should_retError(reqId)){
            return {require_login:true};
        }
        else{
            return {data:data};
        }
    }
}

class ErrBan_ResponseMode extends ResponseMode{
    constructor(behavRule){
        super(behavRule);
        if (behavRule){
            this.MidError_Mode=new InMidError_Mode(behavRule);
        }

    }

    p__get_json(data,reqId){
        if (this.MidError_Mode.should_retError(reqId)){
            return {require_login:true};
        }
        else{
            return {data:data};
        }
    }
}

class ErrUnknown_ResponseMode extends ResponseMode{
    constructor(){
        super();
    }

    p__get_json(data,reqId){
        return {unknown_error:true};
    }
}


//------ Clase q ejecuta el behaviour de los errors q lo tengan -------------------
//Por ahora solo la usan "Auth" y "Bann"
class InMidError_Mode{
    constructor(activeRule){
      this.requests={}
      
      this.activeRule=activeRule;
      
      this.RULES={
        always:(trie)=>true, //falla siempre
        fail_1:(trie)=>trie==1 ? true : false, //para q falle en la 1er serie de req
        fail_2:(trie)=>trie==7 ? true :false, //para q falle en la 2da serie de req
      }
    }

    should_retError(reqId){
      let req=this.requests[reqId];

      if (!req){
         this.requests[reqId]={tries:1}
      }
      else{
        req.tries++;
      }
      return this.__checkRules(this.requests[reqId].tries);
    }

    __checkRules(tries){
      return this.RULES[this.activeRule](tries);
    }

}


module.exports={RESPONSE_MODES,ERROR_BEHAVIOURS};