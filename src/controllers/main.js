const {get_namesIdMapData,get_followersData,sleep}=require("../utils.js")

const {get_authCookies}=require("../../data/auth_cookies.js");

const {ResponseMode}=require("../config/index.js");

const RESP_DELAY=1600;

async function fakeApi_userInfo(req,res){
    let username=req.params.username;

    let data=get_namesIdMapData(username);
    //console.log(data);

    let jsonReturnedByMode=ResponseMode.get_json(data,username);

    res.status(200).json(jsonReturnedByMode);
    //res.status(200).json({bann_error:true}) //para ban
    //res.status(200).json({require_login:true}) //para not auth
}

async function fakeApi_followers(req,res){

    let {user_id,cursor}=req.params;
    
    //######### ESTO PARA SACAR LO DEL ID ############
    let userId_value=user_id;
    
    userId_value=userId_value.split("");
    username=userId_value.splice(0,userId_value.length-2,2).join("");
    //#########################################################

    //Data para frenar traer followers de mas
    let prev_data=get_namesIdMapData(username);
    
    if (!cursor){cursor=1};

    cursor=parseInt(cursor);
    
    //Generamos followers al momento de la llamada
    let next_followers={};
    let next_cursor;

    let foll_id;
    let foll_name;
    //Empezamos el id y el name, a partir del cursor mandado
    for (let i=cursor; i<cursor+44;i++){
        foll_id=i+user_id;
        foll_name=user_id+"_"+i+"_name"
        next_followers[foll_id]=foll_name;
        next_cursor=i+1
        
        //FRenar traer followerrs de mas
        if (next_cursor>=prev_data.cant_followers){
            break;
        }
    }
    

    let data={
        next_cursor,
        next_followers
    }

    await sleep(RESP_DELAY);

    let jsonReturnedByMode=ResponseMode.get_json(data,user_id);

    res.status(200).json(jsonReturnedByMode);
}


async function fakeApi_login(req,res){

    let {username,password}=req.params;
    
    let data=get_authCookies(username);

    let jsonReturnedByMode=ResponseMode.get_json(data,username);

    res.status(200).json(jsonReturnedByMode);
}

module.exports={fakeApi_userInfo,fakeApi_followers,fakeApi_login}