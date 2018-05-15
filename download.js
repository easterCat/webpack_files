/**
 * Created by EmmaWu on 2016/11/28.
 */

//vendor
import './sass/vendor/grids-responsive-min.css';

//app
import './download.html';
import './sass/download.scss';
import empty_mid from './images/empty_mid.png';

console.log('download page');

$(function () {
    let hostname = 'cloud.ezbim.net';
    let url = `https://backstage.ezbim.net/api/private_servers?where={"host":"${hostname}"}`;
    let port = null;
    let lang = null;

    get(url)
        .then((result) => {
            getProducts(result[0]);
        });

    function getProducts(server) {
        let arr = ['pcPakage', 'revitPakage', 'nwPakage', 'iPhonePakage', 'iPadPakage', 'androidPakage'];
        arr.forEach(i => {
            if (i === 'pcPakage' && server['pcPakage']) {

            } else if (i === 'revitPakage' && server['revitPakage']) {
            } else if (i === 'nwPakage' && server['nwPakage']) {
            } else if (i === 'iPhonePakage' && server['iPhonePakage']) {
                _getPicture('iPhone', function (data) {
                    data ? $('.iphone-img').attr({src: data}) : $('.iphone-img').attr({src: empty_mid});
                });
            } else if (i === 'iPadPakage' && server['iPadPakage']) {
                _getPicture('iPad', function (data) {
                    data ? $('.ipad-img').attr({src: data}) : $('.ipad-img').attr({src: empty_mid});
                });
            } else if (i === 'androidPakage' && server['androidPakage']) {
                _getPicture('android', function (data) {
                    data ? $('.android-img').attr({src: data}) : $('.android-img').attr({src: empty_mid});
                });
            }
        });
    }


    function get(url) {
        return $.ajax({
            type: 'GET',
            url: url
        })
    }

    function _getPicture(device, callback) {
        let pic_url = `https://backstage.ezbim.net/api/mobile/qrimage?device=${device}&host=${hostname}&port=${port}&lang=${lang}`;
        $.ajax({
            type: 'GET',
            url: pic_url,
            success: function (msg) {
                callback(msg);
            }
        })
    }
});