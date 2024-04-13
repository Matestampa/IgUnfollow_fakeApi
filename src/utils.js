const fs=require("fs");
const {join}=require("path")

//Acceso facil a los archivos json que tengamos
class JsonFile_Access{
    constructor(){
    }
    
    //Esto traeria todo lo q hay en el file
    read(filePath){
        let absFilePath=join(__dirname,filePath)

        let jsonString_data=fs.readFileSync(absFilePath);

        return JSON.parse(jsonString_data);
    }
    
    //Aca le pasariamos el coso en memoria, y lo meteria al json
    write(filePath,data){

        let jsonString_data=JSON.stringify(data);

        fs.writeFile(filePath,jsonString_data,(err)=>{
            if (err){
                console.log(err);
            }
        })

    }
}

const Storage_Access=new JsonFile_Access();

let names_id_mapData;

//let followersData;

function load_allData(ret){
    names_id_mapData=Storage_Access.read('../jsons/namesId_map.json');

    //followersData=Storage_Access.read("C:/Users/Matew/Desktop/Instagram Unfollow/IG Fake Api/jsons/followers.json");
}

function get_namesIdMapData(username){
    return names_id_mapData[username];
}

function get_followersData(user_id){
    return followersData[user_id];
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports={JsonFile_Access,
                load_allData,
               get_namesIdMapData,
               get_followersData,
            sleep};