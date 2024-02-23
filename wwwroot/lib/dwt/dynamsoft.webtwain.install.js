/*! 20230315181423333
* Dynamsoft JavaScript Library
* Product: Dynamic Web TWAIN
* Web Site: https://www.dynamsoft.com
*
* Copyright 2023, Dynamsoft Corporation
* Author: Dynamsoft Support Team
* Version: 18.4.2
*/
//Dynamsoft.On{actionName} It is a callback function called by Web-TWAIN product. The contents of this function are the default templates of the WebTWAIN. Users can modify the fucntions, but be aware that the function name itself cannot be modified
//Dynamsoft._{functionName} It is a private function used by Dynamsoft.On{actionName}. Users can modify and delete according to their needs.
(function () {
  "use strict";
  var screenW = screen.width,
    promptDlgWidth = screenW > 550 ? 550 : (screenW - 10),
    promptDlgWidth2 = screenW > 680 ? 680 : (screenW - 10);


  //----------------------start Install Dialog---------------------------

  //Web TWAIN Service is not detected dialogs
  //Windows
  Dynamsoft.OnWebTwainNotFoundOnWindowsCallback = function (ProductName, InstallerUrl, bHTML5, bIE, bSafari, bSSL, strIEVersion) {
    var _this = Dynamsoft,
      objUrl = {
        'default': InstallerUrl
      };
    _this._show_install_dialog(ProductName, objUrl, bHTML5, Dynamsoft.DWT.EnumDWT_PlatformType.enumWindow, bIE, bSafari, bSSL, strIEVersion, false);
  };

  //Linux
  Dynamsoft.OnWebTwainNotFoundOnLinuxCallback = function (ProductName, strDebUrl, strRpmUrl, bHTML5, bIE, bSafari, bSSL, strIEVersion, iPlatform) {
    var _this = Dynamsoft,
      objUrl = {
        'default': strDebUrl,
        'deb': strDebUrl,
        'rpm': strRpmUrl
      };
    if (!iPlatform) iPlatform = Dynamsoft.DWT.EnumDWT_PlatformType.enumLinux;
    if (iPlatform == Dynamsoft.DWT.EnumDWT_PlatformType.enumAndroid) {
      objUrl.default = "intent://dynamsoft.com/#Intent;scheme=http;package=com.dynamsoft.mobilescan;end";
    }
    _this._show_install_dialog(ProductName, objUrl, bHTML5, iPlatform, bIE, bSafari, bSSL, strIEVersion, false);
  };

  //MacOS
  Dynamsoft.OnWebTwainNotFoundOnMacCallback = function (ProductName, InstallerUrl, bHTML5, bIE, bSafari, bSSL, strIEVersion) {
    var _this = Dynamsoft,
      objUrl = {
        'default': InstallerUrl
      };
    _this._show_install_dialog(ProductName, objUrl, bHTML5, Dynamsoft.DWT.EnumDWT_PlatformType.enumMac, bIE, bSafari, bSSL, strIEVersion, false);
  };

  //Android
  Dynamsoft.OnWebTwainNotFoundOnAndroidCallback = function (ProductName, InstallerUrl, bSSL, bUpgrade) {
    var objUrl = {
      'default': 'https://demo.dynamsoft.com/DWT/Resources/dist/DynamsoftServiceSetup.apk'
    }, dt = Math.random();

    var _path = Dynamsoft.DWT.ServiceInstallerLocation;
    if (Dynamsoft.Lib.isString(_path) && _path.length > 0) {
      var sep = '';

      if (_path[_path.length - 1] != '/') {
        sep = '/';
      }

      objUrl.default = [_path, sep, 'DynamsoftServiceSetup.apk'].join('');
    }

    objUrl.openService = "intent://dynamsoft.com/#Intent;scheme=http;package=com.dynamsoft.mobilescan;S.timestamp=" + dt + ";end";
    Dynamsoft.DWT.Host = 'local.dynamsoft.com';
    Dynamsoft._show_android_install_dialog(objUrl, bUpgrade);
  };

  //Web TWAIN Service is not supported dialogs
  //Mobile Browsers
  Dynamsoft.OnMobileNotSupportCallback = function () {
    var ObjString = [];

    if (Dynamsoft.DWT) {

      ObjString.push('<div class="ds-dwt-ui-dlg-android" style="padding-bottom:30px">');
      ObjString.push('Service Mode does not support your Operating System, please contact the site administrator.');
      ObjString.push('</div>');

      Dynamsoft.DWT.ShowMessage(ObjString.join(''), {
        width: 335,
        headerStyle: 1,
        backgroundStyle: 1
      });
    } else {
      console.log("The Dynamsoft namespace is missing");
    }

  };

  //Error Message - HTTPS is required to allow CORS to function. This error appears when HTTP is detected. (See: https://www.dynamsoft.com/web-twain/docs/faq/http-insecure-websites-in-chromium-browser.html?ver=latest)
  Dynamsoft.OnHTTPCorsError = function (msg) {

    var ObjString = [
      "<div>", msg, "</div>",
      '<div style="margin-top:10px">To fix the issue, please update your website to HTTPS or refer to <br /><a target="_blank" href="https://www.dynamsoft.com/web-twain/docs/faq/http-insecure-websites-in-chromium-browser.html?ver=latest">this article</a> for other workarounds.</div>'
    ].join('');

    Dynamsoft.DWT.ShowMessage(ObjString, {
      width: promptDlgWidth2,
      headerStyle: 2
    });
  };

  Dynamsoft._show_install_dialog = function (ProductName, objInstallerUrl, bHTML5, iPlatform, bIE, bSafari, bSSL, strIEVersion, bNeedUpgrade) {
    var _this = Dynamsoft,
      ObjString, title, browserActionNeeded,
      EnumPlatform = Dynamsoft.DWT.EnumDWT_PlatformType,
      bAndroid = (iPlatform == EnumPlatform.enumAndroid),
      bMobile = bAndroid,
      bUnix = (iPlatform == EnumPlatform.enumLinux || iPlatform == EnumPlatform.enumEmbed ||
        iPlatform == EnumPlatform.enumChromeOS || iPlatform == EnumPlatform.enumHarmonyOS ||
        bAndroid),
      imagesInBase64 = {
        icn_download: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAgCAYAAAAMq2gFAAABOklEQVRIie2WTW6DMBCFH4h1l22VqmqPVUEvEJa9gRt6FDhDpfx0FdJj+Arx3nldhEjEdchgWlaM9CSwMZ/fzMgQvX0TwvA+ePOpIsniRIwZGIl/n/8AGs3RWKB4JA4STjUKBo1EivLtGakEkP7Ru6vbpcpONzFxPFsazQloZyxEmkDepsYk0JIhkZGwzngfWRKvd0u1Pwf93k1NoBjg5uN+pbZuHn0gEFgQ2AVAdgTefQVzU9e2nzaplKbMkEhnK2W9oAOAC9IHIO+Yd5U/rJX2QbocnVSSqARuqse1Ki9BumrUp+U1gXkXRAoyBDIC1jNnCWRPG2Wug2SFrkkUnvHieaPqaxCpo3bL104rLySQviDbpNA0Sgl4W9kXfU9vjWPho+ZaHCHfo6r/kumfYUBEL1/jeJpqFBw/d5aBU2kHOMQAAAAASUVORK5CYII=',
        icn_install: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAA+klEQVRIid2SMWoCQRiFv3GnW7BII6ZPqeAlorewtBELsZdFOz2Q0VYkXQ6QA9iaIqU+mx2Y3QRd12WKffCY4WdmPt5jzPRT5PQOfOSHnky6/rnoqd/cJFt/0FB6I3UkWOVmZbz+GcyjLEjgeSjRzc3KuCMxzIC8fQwsbtTxqJan/jz+r7qZ4LWC2pzbgpkDmclBAG3gO011T0U+g9Mv8PayTY4u0UIQV5jGORYsAcz4oA7wBWR+SUWJAM5Az17E6gFIGUXA2goGJR8wAK1dUuiwVdECnpQZ7cOggiWy5zCcgIkCcbCX2iUKB6pfdfVLFAwUiNS4f6QaXQHE5K75dPBEiQAAAABJRU5ErkJggg==',
        icn_scan: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAADI0lEQVRIibWXTUhUURTHf+/NsxRCp3QGwhKT/MDoAyNo1apmNhYkodGmaFOWmUXQcpgo2gRN5kerllEGLWqjBqZGFH2BlSRJRVqCjpNjYOaUc1q80fnovZmnMx34w+Odc+///u+9595zlbPPBAuWBbiBPcAOoASwR3xB4BPwAngIdOV2en+n6lA5k5zYDjQBJwCHlRECk0Ar4Mvr9AbNglQRMMFBEYZE8IjgSBKXiIJIm6Gg23PQVHHT038U24DrQL1FhamsHThl7/LOxysGYmAT6BCoT/ifDuoFOqbcHlsyYp9ATQZJF1AjcC2OOMZbh9CQacYYnPzu8tQlKrYLNP8/zkU0B1weeyxxk4AzkySqYvjfKXp6opx8IiuAr1jP05S2bQ3sL4a29zA++4/bD6xTBVwCjkwp3eGAo+WQnw1b8w1jHAIuTQRXppTuWgt1JaAA90egc9Q01K0JVGWCdHch1BTr33c/Q89Y0vAqLQxl6ZJWF8He9RAWuPURHo+nbFKqiZC3XEIFOLAB9hTqpDc/wHO/paZ5ahgwQtEqOFIGNtXYD3Boo076R+DGe3jmN441gibCNAmplKXA8QooyAb7CmgZhLlw1G9T4GgZ7HRCKAytg/DO9AI0tGlVYDhxy4cEmgdhOgSVdjizGXI03acpcKxCJ/01D1ffwdvgktNuWBV4ZeQc/QmX30BgDkpz4dxmWL0SGjbB9gKY+QNX3sLQ9LLy/bVyuE+qgQdmc5K/Es5vAWcO/A5Dlgo/QjrpyMySpjfW9qkC3QIBs9FNzsGlARj7qZNOzcHlAfgys+zTzS/QpYq+pC3JgqdCOvnLSbg4AN9m0zpW20oeeUMLNZdPhIlktdSPEFwbhIlZ8xgL8Ivgg+i1GBRoTEOFVTRu7NUrz9gq844IrWmoSYXW0l7v7YXdpUn8bjsNrAVqLO9Pa3Yv0veiJRZ78wK1Au0ZnN52gdryvvjyVjMY3Tz6y6EfvTJ0LlPlBHC6oi86vfGKzdfktgjlIlwQIbCEtQxE2pSbkQIotT1i5ou1hUebi+ijbXXEN0X00dYNdFf2e0OpOvwLFunYK2i9bNwAAAAASUVORK5CYII='
      };

    // npm file mode
    if (bNeedUpgrade)
      title = 'Please update your document scanning service'; //'Please follow the steps below to upgrade your local document scanning service.';
    else
      title = 'Please complete one-time setup';
    ObjString = [
      '<div class="dynamsoft-dwt-dlg-title">',
      title,
      '</div>'
    ];

    if (_this.DWT) {

      var bFirefox = Dynamsoft.navInfoSync.bFirefox;
      if (bUnix || bFirefox) {
        browserActionNeeded = 'RESTART';
      } else {
        browserActionNeeded = 'REFRESH';
      }
      ObjString.push('<div class="dynamsoft-dwt-installdlg-iconholder"> ');

      var left = '125px';
      if (bMobile) {
        left = '60px';
      }
      ObjString.push('<div class="dynamsoft-dwt-installdlg-splitline" style="left: ' + left + '"></div>');

      if (!bMobile) {
        ObjString.push('<div class="dynamsoft-dwt-installdlg-splitline" style="left: 283px"></div>');
      }

      var marginRight = '133px';
      if (bMobile) {
        marginRight = '50px';
      }
      ObjString.push('<img style="margin: 0px ' + marginRight + ' 0px 0px" src=' + imagesInBase64.icn_download + ' alt="download">');
      ObjString.push('<img style="margin: 2px ' + marginRight + ' 2px 0px" src=' + imagesInBase64.icn_install + ' alt="install">');
      ObjString.push('<img src=' + imagesInBase64.icn_scan + ' alt="scan">');
      ObjString.push('<div><span class="dynamsoft-dwt-installdlg-text" style="right: 125px">Download</span>');
      ObjString.push('<span class="dynamsoft-dwt-installdlg-text" style="right: 18px">Install</span>');
      ObjString.push('<span class="dynamsoft-dwt-installdlg-text" style="left: 105px">Scan</span>');
      ObjString.push('</div>');
      ObjString.push('</div>');

      if (bHTML5 && bUnix) {
        ObjString.push('<div style="margin:10px 0 0 60px;">');
        ObjString.push('<div id="dwt-install-url-div">');

        var arm64 = Dynamsoft.navInfo.bArm64,
          mips64 = Dynamsoft.navInfo.bMips64,
          chromeOS = Dynamsoft.navInfoSync.bChromeOS,
          harmonyOS = Dynamsoft.navInfoSync.bHarmonyOS;

        if (arm64 || mips64 || chromeOS || harmonyOS || bAndroid) { } else {
          ObjString.push('<div><input id="dwt-install-url-deb" name="dwt-install-url" type="radio" onclick="Dynamsoft._dwt_change_install_url(\'' + objInstallerUrl.deb + '\')" checked="checked" /><label for="dwt-install-url-deb">64 bit .deb (For Ubuntu/Debian)</label></div>');
          ObjString.push('<div><input id="dwt-install-url-rpm" name="dwt-install-url" type="radio" onclick="Dynamsoft._dwt_change_install_url(\'' + objInstallerUrl.rpm + '\')" /><label for="dwt-install-url-rpm">64 bit .rpm (For Fedora)</label></div>');
        }
        ObjString.push('</div></div>');
      }

      ObjString.push('<div><a id="dwt-btn-install" target="_blank" href="');
      ObjString.push(objInstallerUrl['default']);
      ObjString.push('"');
      if (bHTML5) {
        ObjString.push(' html5="1"');
      } else {
        ObjString.push(' html5="0"');
      }

      ObjString.push(' onclick="Dynamsoft._dcp_dwt_onclickInstallButton()"><div class="dynamsoft-dwt-dlg-button">Download</div></a></div>');
      if (bHTML5) {
        if (bIE) {
          ObjString.push('<div class="dynamsoft-dwt-dlg-tail" style="text-align:left; padding-left: 80px">');
          ObjString.push('If you still see the dialog after installing the Dynamsoft Service, please<br />');
          ObjString.push('1. Add the website to the zone of trusted sites.<br />');
          ObjString.push('IE | Tools | Internet Options | Security | Trusted Sites.<br />');
          ObjString.push('2. Refresh your browser.');
          ObjString.push('</div>');

        } else {

          if (bUnix) {
            ObjString.push('<div class="dynamsoft-dwt-dlg-tail">');
            ObjString.push('<div class="dynamsoft-dwt-dlg-red">After the installation, please <strong>' + browserActionNeeded + '</strong>  your browser.</div>');
            ObjString.push('</div>');
          } else if (bAndroid) {

            ObjString.push('<div class="dynamsoft-dwt-dlg-tail">');
            ObjString.push('<div class="dynamsoft-dwt-dlg">Failed to connect to the service, have you finished the setup?</div>');
            ObjString.push('<div class="dynamsoft-dwt-dlg">Please make sure the setup is done and <a href="#">click here</a> to connect again.</div>');
            ObjString.push('<div class="dynamsoft-dwt-dlg">If the connection continues to fail, please refer to <a href="#">this article</a>.</div>');
            ObjString.push('</div>');

          }

        }

      } else {
        ObjString.push('<div class="dynamsoft-dwt-dlg-tail" style="text-align:left; padding-left: 80px">');
        if (bIE) {
          ObjString.push('After the installation, please<br />');
          ObjString.push('1. Restart the browser<br />');
          ObjString.push('2. Allow "DynamicWebTWAIN" add-on to run by right clicking on the Information Bar in the browser.');
        } else {
          ObjString.push('<div class="dynamsoft-dwt-dlg-red">After installation, please <strong>REFRESH</strong> your browser.</div>');
        }
        ObjString.push('</div>');
      }
      _this.DWT.ShowMessage(ObjString.join(''), {
        width: promptDlgWidth,
        headerStyle: 1
      });
    } else {
      console.log("The Dynamsoft namespace is missing");
    }

    if (Dynamsoft.DWT && Dynamsoft.DWT.OnWebTwainNotFound) {
      Dynamsoft.DWT.OnWebTwainNotFound();
    }
  };

  Dynamsoft._dwt_change_install_url = function (url) {
    var install = document.getElementById('dwt-btn-install');
    if (install)
      install.href = url;
  };

  var reconnectTime = 0;
  Dynamsoft._dcp_dwt_onclickInstallButton = function () {
    var btnInstall = document.getElementById('dwt-btn-install');
    if (btnInstall) {
      setTimeout(function () {
        var install = document.getElementById('dwt-install-url-div');
        if (install)
          install.style.display = 'none';
        var el = document.getElementById('dwt-btn-install');
        if (el && el.getAttribute("html5") == "1") {
          var pel = el.parentNode,
            newDiv = document.createElement('div');
          newDiv.id = 'dwt-btn-install';
          newDiv.style.textAlign = "center";
          newDiv.style.paddingBottom = '15px';
          newDiv.innerHTML = 'Connecting to the service...';
          newDiv.setAttribute("html5", "1");
          pel.removeChild(el);
          pel.appendChild(newDiv);
          reconnectTime = new Date();
          setTimeout(Dynamsoft._dwt_Reconnect, 10);
        } else {
          var pel = el.parentNode;
          pel.removeChild(el);
        }
      }, 10);
    }
    return true;
  };

  Dynamsoft._dwt_Reconnect = function () {
    var _this = Dynamsoft;
    if (((new Date() - reconnectTime) / 1000) > 30) {
      // change prompt
      var el = document.getElementById('dwt-btn-install');
      if (el) {
        el.innerHTML = 'Failed to connect to the service, have you run the setup?<br />If not, please run the setup and <a href="javascript:void(0)" onclick="Dynamsoft._dcp_dwt_onclickInstallButton()">click here to connect again</a>.';
      }
      return;
    }
    if (_this.DWT) {

      var _timeSpan = 500;
      if (navigator.userAgent.indexOf("Safari") > -1) {
        _timeSpan = 2000;
      }

      _this.DWT.CheckConnectToTheService(function () {
        Dynamsoft.DWT.CloseDialog();
        Dynamsoft.DWT.ConnectToTheService();
      }, function () {
        if (Dynamsoft.DWT.NeedCheckWebTwainBySocket()) {
          Dynamsoft.DWT.CheckWebTwainBySocket(function () {
            Dynamsoft.OnHTTPCorsError();
          }, function () {
            setTimeout(Dynamsoft._dwt_Reconnect, _timeSpan);
          }, function () {
            setTimeout(Dynamsoft._dwt_Reconnect, _timeSpan);
          });
          return;
        }
        setTimeout(Dynamsoft._dwt_Reconnect, _timeSpan);
      });
    } else {
      console.log("The Dynamsoft namespace is missing");
    }
  };

  Dynamsoft._show_android_install_dialog = function (objInstallerUrl, bUpgrade) {
    var ObjString;

    if (Dynamsoft.DWT.bNpm && Dynamsoft.navInfoSync.bFileSystem) {
      return Dynamsoft._show_online_download_dialog(objInstallerUrl, bHTML5, iPlatform);
    }

    ObjString = [];

    if (Dynamsoft.DWT) {

      ObjString.push('<div class="ds-dwt-ui-dlg-android">');

      ObjString.push('<div>Please download and ');

      if(bUpgrade) {
        ObjString.push('update');
      } else {
        ObjString.push('install');
      }

      ObjString.push(' the <strong>DYNAMSOFT SERVICE</strong> app via the </div>');

      ObjString.push('<div><a target="_blank" href="');
      ObjString.push(objInstallerUrl['default']);
      ObjString.push('" onclick="Dynamsoft._dwt_ReconnectForAndroid()">direct APK download link</a>.</div>');
      ObjString.push('</div>');

      ObjString.push('<div class="dynamsoft-dwt-dlg-tail" style="text-align:left">');
      ObjString.push('If you have ');
      
      if(bUpgrade) {
        ObjString.push('updated');
      } else {
        ObjString.push('installed');
      }
      
      ObjString.push(' it, please click on the button below to initiate the connection.');

      ObjString.push('<a target="_blank" href="');
      ObjString.push(objInstallerUrl.openService);
      ObjString.push('" onclick="Dynamsoft._dwt_ReconnectForAndroid()"><div class="dynamsoft-dwt-dlg-button-android">Open Service</div></a>');

      ObjString.push('</div>');

      ObjString.push('</div>');

      Dynamsoft.DWT.ShowMessage(ObjString.join(''), {
        width: 335,
        headerStyle: 1,
        backgroundStyle: 1
      });
    } else {
      console.log("The Dynamsoft namespace is missing");
    }

    if (Dynamsoft.DWT && Dynamsoft.DWT.OnWebTwainNotFound) {
      Dynamsoft.DWT.OnWebTwainNotFound();
    }
  };

  Dynamsoft._dwt_ReconnectForAndroid = function () {
    Dynamsoft.DWT.CheckConnectToTheService(function (bConnected) {
      if (bConnected) {
        Dynamsoft.DWT.CloseDialog();
        Dynamsoft.DWT.ConnectToTheService();
      } else {
        setTimeout(Dynamsoft._dwt_ReconnectForAndroid, 500);
      }

    }, function () {
      setTimeout(Dynamsoft._dwt_ReconnectForAndroid, 500);
    });
  }

  //Dynamsoft.OnWebTwainNotFoundOnAndroidCallback = Dynamsoft.MobileNotSupportCallback;
  //------------------------end Install Dilaog---------------------------


  //----------------------start Upgrade Dialog---------------------------

  Dynamsoft.OnWebTwainNeedUpgradeCallback = function (ProductName, objInstallerUrl, bHTML5, iPlatform, bIE, bSafari, bSSL, strIEVersion) {
    Dynamsoft._show_install_dialog(ProductName, objInstallerUrl, bHTML5, iPlatform, bIE, bSafari, bSSL, strIEVersion, true, true);
  };

  Dynamsoft.OnWebTwainNeedUpgradeOnAndroidCallback = function (ProductName, InstallerUrl, bSSL) {
    Dynamsoft.OnWebTwainNotFoundOnAndroidCallback(ProductName, InstallerUrl, bSSL, true);
  };

  //----------------------end Upgrade Dialog---------------------------

  //----------------------start DLS License -----------------------
  Dynamsoft.OnLTSLicenseError = function (message, code) {

    var addMessage = '',
      ObjString;

    if (code == -2440 || // NetworkError
      code == -2441 || // Timedout
      code == -2443 || // CorsError
      code == -2446 || // LtsJsLoadError
      message.indexOf('Internet connection') > -1 ||
      message.indexOf('Storage') > -1) {

      var purchaseUrl = 'https://www.dynamsoft.com/customer/license/trialLicense?product=dwt&deploymenttype=js';
      addMessage = '<div>You can register for a free 30-day trial <a href="' + purchaseUrl + '" target="_blank" class="dynamsoft-major-color">here</a>. Make sure to select the product Dynamic Web TWAIN.</div>';
    }

    ObjString = [
      message,
      addMessage
    ];

    Dynamsoft.DWT.ShowMessage(ObjString.join(''), {
      width: promptDlgWidth2,
      headerStyle: 2
    });
  };

  Dynamsoft.OnLTSConnectionWarning = function () {

    var ObjString = [
      'Warning: You are seeing this dialog because Dynamic Web TWAIN has failed to connect to the License Tracking Server. ',
      'A cached authorization is being used, and you can continue to use the software as usual. ',
      'Please get connected to the network as soon as possible. ',
      Dynamsoft.DWT.isPublicLicense() ? '<a class="dynamsoft-major-color" href="https://www.dynamsoft.com/company/contact/">Contact Dynamsoft</a> ' : 'Contact the site administrator ',
      'for more information.'
    ].join('');

    Dynamsoft.DWT.ShowMessage(ObjString, {
      width: promptDlgWidth2,
      caption: 'Warning',
      headerStyle: 2
    });
  };

  Dynamsoft.OnLTSPublicLicenseWarning = function (message) {

    Dynamsoft.DWT.ShowMessage(message, {
      width: promptDlgWidth2,
      caption: 'Warning',
      headerStyle: 2
    });
  };

  //--------------------end DLS License-------------------------------

  //----------------------start Product Key -----------------------
  Dynamsoft.OnLicenseExpiredWarning = function (strExpiredDate, remain, trial) {

    var ObjString, strCaption,
      a_contact_us = '<a target="_blank" href="https://www.dynamsoft.com/company/contact/">contact us</a>',
      a_online_store = '<a target="_blank" href="https://www.dynamsoft.com/store/dynamic-web-twain/#DynamicWebTWAIN">online store</a>',
      a_new_key_href = 'https://www.dynamsoft.com/customer/license/trialLicense?product=dwt&utm_source=in-product',
      a_renew_key_href = 'https://www.dynamsoft.com/customer/order/renewalList';

    if (remain > 5) {

    } else if (trial && remain > 0) { // 1~5

      var strDays;

      if (remain <= 1) {
        strDays = '1 day';
      } else {
        strDays = parseInt(remain) + ' days';
      }

      strCaption = 'Warning';
      ObjString = [
        '<div style="padding:0 0 10px 0">Kindly note your trial key is expiring in ', strDays, '. Two quick steps to extend your trial:</div>',
        '<div style="margin:0 0 0 10px">1. <a target="_blank" href="', a_new_key_href, '">Request a new trial key</a> and follow the instructions to set the new key</div>',
        '<div style="margin:0 0 0 10px">2. Refresh your scan page and try again</div>',
        '<div style="padding:10px 0 0 0">If you run into any issues, please ', a_contact_us, '.</div>',
        '<div style="padding:0">If you are ready to purchase a full license, please go to the ', a_online_store, ' or ', a_contact_us, '.</div>'
      ].join('');

    } else {
      
      if(trial) {
        // Trial remain<=0 Expired
        ObjString = [
          '<div style="padding:0">Sorry. Your product key has expired on ', strExpiredDate, '. You can purchase a full license at the ', a_online_store, '.</div>',
          '<div style="padding:0">Or, you can try requesting a new product key at <a target="_blank" href="', a_new_key_href, '">this page</a>.</div>',
          '<div style="padding:0">If you need any help, please ', a_contact_us, '.</div>'
        ].join('');
      } else {

        ObjString = [
          '<div style="padding:0">You are seeing this message because the license for doc scanning support has expired on ', strExpiredDate, '.</div>',
          '<div style="padding:0"><ul>',
          "<li><strong>If you are the owner of the website</strong>, please <a class='dynamsoft-major-color' href='", a_renew_key_href, "' target='_blank'>renew your license</a> and follow the instructions to set the new key. ",
          'Please ', a_contact_us, ' if you need any help.</li>',
          '<li><strong>If you are an end-user</strong>, please inform the owner or developer of this website.</li>',
          '</ul></div>'
        ].join('');
      }

    }

    if (ObjString) {
      Dynamsoft.DWT.ShowMessage(ObjString, {
        width: promptDlgWidth2,
        caption: strCaption,
        headerStyle: 2
      });
    }
  };

  Dynamsoft.OnLicenseError = Dynamsoft.OnLicenseError || function (message, errorCode) {

    Dynamsoft.DWT.ShowMessage(message, {
      width: promptDlgWidth2,
      headerStyle: 2
    });

  };
  //--------------------end Product Key-------------------------------


})();