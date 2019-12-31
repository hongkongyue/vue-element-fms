import Cookies from 'js-cookie';
import JSEncrypt from 'jsencrypt/bin/jsencrypt';
import socket from 'libs/socket';
import util from '@/libs/util.js';
import axios from 'axios';
 const  getParams=()=> {
    var qs = (location.search.length > 0 ? location.search.substring(1) : ''),
        arsg = {},
        items = qs.length ? qs.split('&') : [],
        item = null,
        name = null,
        value = null,
        len = items.length;
        for (var i = 0; i < len; i++) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            arsg[name] = value;
        }
    }
    return arsg;
}
export default getParams