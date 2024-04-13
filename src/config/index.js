const minimist=require("minimist");
const {RESPONSE_MODES,ERROR_BEHAVIOURS}=require("./modes.js");

let args=minimist(process.argv.slice(2));

//Conseguir response MODE, y behaviour de los args
let choosed_respMode= args.mode || "NORMAL";
let choosed_errBehav= args.behav || 0;
choosed_errBehav=ERROR_BEHAVIOURS[choosed_errBehav]

//Definir la clase usada para response mode
const ResponseMode=RESPONSE_MODES[choosed_respMode](choosed_errBehav);

console.log(`Using "${choosed_respMode}" Response Mode & "${choosed_errBehav}" Error Behav`)

module.exports={ResponseMode};