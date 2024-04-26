const uuid=require("uuid");


function get_authCookies(username){
    let distintc_csrfTok=`FAKE_API_${username}_${uuid.v4()}`
    
    const AUTH_COOKIES=[
        `csrftoken=${distintc_csrfTok}; Domain=.instagram.com; expires=Fri, 25-Apr-2025 01:00:41 GMT; Max-Age=31449600; Path=/; Secure`,
        'rur="NCG\\05463141326590\\0541745629241:01f7084a1d129621c7e82de1f898ddba0e3df36a2e5ae328c1863f0caf89b84d25c94811"; Domain=.instagram.com; HttpOnly; Path=/; SameSite=Lax; Secure',
        'ds_user_id=63141326590; Domain=.instagram.com; expires=Thu, 25-Jul-2024 01:00:41 GMT; Max-Age=7776000; Path=/; Secure',
        'th_eu_pref=""; Domain=instagram.com; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/',
        'th_eu_pref=""; Domain=.instagram.com; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/',
        'th_eu_pref=""; Domain=i.instagram.com; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/',
        'th_eu_pref=""; Domain=.i.instagram.com; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/',
        'th_eu_pref=""; Domain=www.instagram.com; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/',
        'th_eu_pref=""; Domain=.www.instagram.com; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/',
        'th_eu_pref=""; Domain=.threads.net; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/',
        'th_eu_pref=""; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/',
        'sessionid=63141326590%3AUOyCyEysoHltrv%3A3%3AAYc89X2xdQFiPhO2rvWRi2HOkd6hn2eG85ftcvilpQ; Domain=.instagram.com; expires=Sat, 26-Apr-2025 01:00:41 GMT; HttpOnly; Max-Age=31536000; Path=/; Secure'
    ];

    return AUTH_COOKIES;


}

module.exports={get_authCookies};