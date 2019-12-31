/*
 * @Author: anytao
 * @Description: 后端api代理配置
 * @Last Modified by: anytao
 */

var apiProxyConfig = {

    dev: [
        '^/eop-node/(.*)$ http://eopsit.eptison.com/eop-node/$1 [P]', 
        '^/eop-boot/(.*)$ http://newweb.eptison.com/eop-boot/$1 [P]',
        // '^/eop-node/(.*)$ http://127.0.0.1:8360/eop-node/$1 [P]',
        '^/eop/(.*)$ http://eopsit.eptison.com:8080/eop/$1 [P]',
        '^/WebReport/(.*)$ http://192.168.30.202:8080/WebReport/$1 [P]',
        '^/local_api/(.*)$ http://127.0.0.1:8091/$1 [P]',
        '^/uploadFile_api/(.*)$ http://localhost:8091/$1 [P]'
    ],
    cit: [
        //'^/eop-node/(.*)$ http://eopsit.eptison.com/eop-node/$1 [P]',
         '^/eop-node/(.*)$ http://127.0.0.1:8360/eop-node/$1 [P]',
        '^/eop/(.*)$ http://eopsit.eptison.com:8080/eop/$1 [P]',
        '^/WebReport/(.*)$ http://eopsit.eptison.com/WebReport/$1 [P]',
        '^/local_api/(.*)$ http://127.0.0.1:8091/$1 [P]'
    ],
    uat: [
        '^/eop-node/(.*)$ http://eopuat.eptison.com/eop-node/$1 [P]',
        '^/eop/(.*)$ http://eopuat.eptison.com/eop/$1 [P]',
        '^/WebReport/(.*)$ http://eop.eptison.com/WebReport/$1 [P]',
        '^/local_api/(.*)$ http://127.0.0.1:8091/$1 [P]',
    ],
    pro: [
        '^/eop-boot/(.*)$ http://http://cloud.eptison.com:8888/eop-boot/$1 [P]',
        '^/eop-node/(.*)$ http://eop.quanshangtech.com:888/eop-node/$1 [P]',
        '^/eop/(.*)$ http://eop.quanshangtech.com:888/eop/$1 [P]',
        '^/WebReport/(.*)$ http://eop.quanshangtech.com:888/WebReport/$1 [P]',
        '^/local_api/(.*)$ http://127.0.0.1:8091/$1 [P]'
    ],
};

module.exports = apiProxyConfig;
