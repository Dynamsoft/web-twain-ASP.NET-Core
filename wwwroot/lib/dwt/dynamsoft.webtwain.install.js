// @20220106 120302
(function () {
  "use strict";
  var screenW = screen.width,
    promptDlgWidth = screenW > 550 ? 550 : (screenW - 10),
    promptDlgWidth2 = screenW > 680 ? 680 : (screenW - 10),
    reconnectTime = 0,
    imagesInBase64 = {
      icn_download: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAgCAYAAAAMq2gFAAABOklEQVRIie2WTW6DMBCFH4h1l22VqmqPVUEvEJa9gRt6FDhDpfx0FdJj+Arx3nldhEjEdchgWlaM9CSwMZ/fzMgQvX0TwvA+ePOpIsniRIwZGIl/n/8AGs3RWKB4JA4STjUKBo1EivLtGakEkP7Ru6vbpcpONzFxPFsazQloZyxEmkDepsYk0JIhkZGwzngfWRKvd0u1Pwf93k1NoBjg5uN+pbZuHn0gEFgQ2AVAdgTefQVzU9e2nzaplKbMkEhnK2W9oAOAC9IHIO+Yd5U/rJX2QbocnVSSqARuqse1Ki9BumrUp+U1gXkXRAoyBDIC1jNnCWRPG2Wug2SFrkkUnvHieaPqaxCpo3bL104rLySQviDbpNA0Sgl4W9kXfU9vjWPho+ZaHCHfo6r/kumfYUBEL1/jeJpqFBw/d5aBU2kHOMQAAAAASUVORK5CYII=',
      icn_install: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAA+klEQVRIid2SMWoCQRiFv3GnW7BII6ZPqeAlorewtBELsZdFOz2Q0VYkXQ6QA9iaIqU+mx2Y3QRd12WKffCY4WdmPt5jzPRT5PQOfOSHnky6/rnoqd/cJFt/0FB6I3UkWOVmZbz+GcyjLEjgeSjRzc3KuCMxzIC8fQwsbtTxqJan/jz+r7qZ4LWC2pzbgpkDmclBAG3gO011T0U+g9Mv8PayTY4u0UIQV5jGORYsAcz4oA7wBWR+SUWJAM5Az17E6gFIGUXA2goGJR8wAK1dUuiwVdECnpQZ7cOggiWy5zCcgIkCcbCX2iUKB6pfdfVLFAwUiNS4f6QaXQHE5K75dPBEiQAAAABJRU5ErkJggg==',
      icn_scan: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAADI0lEQVRIibWXTUhUURTHf+/NsxRCp3QGwhKT/MDoAyNo1apmNhYkodGmaFOWmUXQcpgo2gRN5kerllEGLWqjBqZGFH2BlSRJRVqCjpNjYOaUc1q80fnovZmnMx34w+Odc+///u+9595zlbPPBAuWBbiBPcAOoASwR3xB4BPwAngIdOV2en+n6lA5k5zYDjQBJwCHlRECk0Ar4Mvr9AbNglQRMMFBEYZE8IjgSBKXiIJIm6Gg23PQVHHT038U24DrQL1FhamsHThl7/LOxysGYmAT6BCoT/ifDuoFOqbcHlsyYp9ATQZJF1AjcC2OOMZbh9CQacYYnPzu8tQlKrYLNP8/zkU0B1weeyxxk4AzkySqYvjfKXp6opx8IiuAr1jP05S2bQ3sL4a29zA++4/bD6xTBVwCjkwp3eGAo+WQnw1b8w1jHAIuTQRXppTuWgt1JaAA90egc9Q01K0JVGWCdHch1BTr33c/Q89Y0vAqLQxl6ZJWF8He9RAWuPURHo+nbFKqiZC3XEIFOLAB9hTqpDc/wHO/paZ5ahgwQtEqOFIGNtXYD3Boo076R+DGe3jmN441gibCNAmplKXA8QooyAb7CmgZhLlw1G9T4GgZ7HRCKAytg/DO9AI0tGlVYDhxy4cEmgdhOgSVdjizGXI03acpcKxCJ/01D1ffwdvgktNuWBV4ZeQc/QmX30BgDkpz4dxmWL0SGjbB9gKY+QNX3sLQ9LLy/bVyuE+qgQdmc5K/Es5vAWcO/A5Dlgo/QjrpyMySpjfW9qkC3QIBs9FNzsGlARj7qZNOzcHlAfgys+zTzS/QpYq+pC3JgqdCOvnLSbg4AN9m0zpW20oeeUMLNZdPhIlktdSPEFwbhIlZ8xgL8Ivgg+i1GBRoTEOFVTRu7NUrz9gq844IrWmoSYXW0l7v7YXdpUn8bjsNrAVqLO9Pa3Yv0veiJRZ78wK1Au0ZnN52gdryvvjyVjMY3Tz6y6EfvTJ0LlPlBHC6oi86vfGKzdfktgjlIlwQIbCEtQxE2pSbkQIotT1i5ou1hUebi+ijbXXEN0X00dYNdFf2e0OpOvwLFunYK2i9bNwAAAAASUVORK5CYII='
    },
    ua = navigator.userAgent.toLowerCase(),
    arm64 = (/arm64|aarch64/g).test(ua),
    mips64 = (/mips64/g).test(ua),
    chromeOS = (/cros/).test(ua),
    harmonyOS = (/harmonyos/g).test(ua);

  Dynamsoft.OnWebTwainNotFoundOnWindowsCallback = function (ProductName, InstallerUrl, bHTML5, bIE, bSafari, bSSL, strIEVersion) {
    var _this = Dynamsoft, objUrl = { 'default': InstallerUrl };
    _this._show_install_dialog(ProductName, objUrl, bHTML5, Dynamsoft.DWT.EnumDWT_PlatformType.enumWindow, bIE, bSafari, bSSL, strIEVersion, true);
  };

  Dynamsoft.OnWebTwainNotFoundOnLinuxCallback = function (ProductName, strDebUrl, strRpmUrl, bHTML5, bIE, bSafari, bSSL, strIEVersion, iPlatform) {
    var _this = Dynamsoft, objUrl = { 'default': strDebUrl, 'deb': strDebUrl, 'rpm': strRpmUrl };
    if (!iPlatform) iPlatform = Dynamsoft.DWT.EnumDWT_PlatformType.enumLinux;
    _this._show_install_dialog(ProductName, objUrl, bHTML5, iPlatform, bIE, bSafari, bSSL, strIEVersion, true);
  };

  Dynamsoft.OnWebTwainNotFoundOnMacCallback = function (ProductName, InstallerUrl, bHTML5, bIE, bSafari, bSSL, strIEVersion) {
    var _this = Dynamsoft, objUrl = { 'default': InstallerUrl };
    _this._show_install_dialog(ProductName, objUrl, bHTML5, Dynamsoft.DWT.EnumDWT_PlatformType.enumMac, bIE, bSafari, bSSL, strIEVersion, true);
  };

  Dynamsoft.dwt_change_install_url = function (url) {
    var install = document.getElementById('dwt-btn-install');
    if (install)
      install.href = url;
  };

  Dynamsoft.DWT_Reconnect = function () {
    var _this = Dynamsoft;
    if (((new Date() - reconnectTime) / 1000) > 30) {
      // change prompt
      var el = document.getElementById('dwt-btn-install');
      if (el) {
        el.innerHTML = 'Failed to connect to the service, have you run the setup?<br />If not, please run the setup and <a href="javascript:void(0)" onclick="Dynamsoft.DCP_DWT_onclickInstallButton()">click here to connect again</a>.';
      }
      return;
    }
    if (_this.DWT) {
      _this.DWT.CheckConnectToTheService(function () {
        Dynamsoft.DWT.ConnectToTheService();
      }, function () {

        if (!Dynamsoft.navInfoSync.bSSL && Dynamsoft._isChrome94plus()) {
          // check websocket
          var urls = Dynamsoft.Lib.detect.urls, ws;

          if (urls && urls.length > 0) {
            var o = urls[0];
            ws = Dynamsoft.Lib.getWS(o.host, o.port, o.ssl);
          } else {
            // default
            ws = Dynamsoft.Lib.getWS(Dynamsoft.Lib.product.host, 18622, false);
          }
          ws.onopen = function () {
            // alert must using https
            ws.close();
            Dynamsoft.OnHTTPCorsError();
          };

          ws.onerror = function () {
            setTimeout(Dynamsoft.DWT_Reconnect, 500);
          };

          return;
        }
        setTimeout(Dynamsoft.DWT_Reconnect, 500);
      });
    } else {
      console.log("The Dynamsoft namespace is missing");
    }
  };

  Dynamsoft.DCP_DWT_onclickInstallButton = function () {
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
          setTimeout(Dynamsoft.DWT_Reconnect, 10);
        } else {
          var pel = el.parentNode;
          pel.removeChild(el);
        }
      }, 10);
    }
    return true;
  };

  // chrome94+ or edge94+
  Dynamsoft._isChrome94plus = function () {
    var _nChrome = ua.indexOf('chrome/'), ver = 0, _tmp;

    if (_nChrome > -1) {
      ver = ua.slice(_nChrome + 7);
      _tmp = ver.indexOf(' ');
      if (_tmp > -1)
        ver = parseInt(ver.slice(0, _tmp));
    } else {
      _nChrome = ua.indexOf('crios/');
      if (_nChrome > -1) {
        ver = ua.slice(_nChrome + 6);
        _tmp = ver.indexOf(' ');
        if (_tmp > -1)
          ver = parseInt(ver.slice(0, _tmp));
      }
    }
    if (ver >= 94) {
      return true;
    }
    return false;
  };

  Dynamsoft._show_install_dialog = function (ProductName, objInstallerUrl, bHTML5, iPlatform, bIE, bSafari, bSSL, strIEVersion, bNeedCheckChrome) {
    var _this = Dynamsoft, ObjString, title, browserActionNeeded,
      EnumPlatform = Dynamsoft.DWT.EnumDWT_PlatformType,
      bUnix = (iPlatform == EnumPlatform.enumLinux || iPlatform == EnumPlatform.enumEmbed || iPlatform == EnumPlatform.enumChromeOS || iPlatform == EnumPlatform.enumHarmonyOS);
      
    if (Dynamsoft.DWT.bNpm && Dynamsoft.navInfoSync.bFileSystem) {
      return Dynamsoft._show_online_download_dialog(objInstallerUrl, bHTML5, iPlatform);
    }

    title = 'Please complete one-time setup';
    ObjString = [
      '<div class="dynamsoft-dwt-dlg-title">',
      title,
      '</div>'];

    if (_this.DWT) {

      if (bNeedCheckChrome && !Dynamsoft.navInfoSync.bSSL && Dynamsoft._isChrome94plus()) {
        // check websocket
        var urls = Dynamsoft.Lib.detect.urls, ws;

        if (urls && urls.length > 0) {
          var o = urls[0];
          ws = Dynamsoft.Lib.getWS(o.host, o.port, o.ssl);
        } else {
          // default
          ws = Dynamsoft.Lib.getWS(Dynamsoft.Lib.product.host, 18622, false);
        }
        ws.onopen = function () {
          // alert must using https
          ws.close();
          Dynamsoft.OnHTTPCorsError();
        };

        ws.onerror = function () {
          Dynamsoft._show_install_dialog(ProductName, objInstallerUrl, bHTML5, iPlatform, bIE, bSafari, bSSL, strIEVersion, false);
        };

        return;
      }

      if (bUnix || navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
        browserActionNeeded = 'RESTART';
      }
      else {
        browserActionNeeded = 'REFRESH';
      }
      ObjString.push('<div class="dynamsoft-dwt-installdlg-iconholder"> ');
      ObjString.push('<div class="dynamsoft-dwt-installdlg-splitline" style="left: 125px"></div>');
      ObjString.push('<div class="dynamsoft-dwt-installdlg-splitline" style="left: 283px"></div>');
      ObjString.push('<img style="margin: 0px 134px 0px 0px" src=' + imagesInBase64.icn_download + ' alt="download">');
      ObjString.push('<img style="margin: 2px 132px 2px 0px" src=' + imagesInBase64.icn_install + ' alt="install">');
      ObjString.push('<img src=' + imagesInBase64.icn_scan + ' alt="scan">');
      ObjString.push('<div><span class="dynamsoft-dwt-installdlg-text" style="right: 125px">Download</span>');
      ObjString.push('<span class="dynamsoft-dwt-installdlg-text" style="right: 18px">Install</span>');
      ObjString.push('<span class="dynamsoft-dwt-installdlg-text" style="left: 105px">Scan</span>');
      ObjString.push('</div>');
      ObjString.push('</div>');

      if (bHTML5 && bUnix) {
        ObjString.push('<div style="margin:10px 0 0 60px;">');
        ObjString.push('<div id="dwt-install-url-div">');

        if (arm64 || mips64 || chromeOS || harmonyOS) { } else {
          ObjString.push('<div><input id="dwt-install-url-deb" name="dwt-install-url" type="radio" onclick="Dynamsoft.dwt_change_install_url(\'' + objInstallerUrl.deb + '\')" checked="checked" /><label for="dwt-install-url-deb">64 bit .deb (For Ubuntu/Debian)</label></div>');
          ObjString.push('<div><input id="dwt-install-url-rpm" name="dwt-install-url" type="radio" onclick="Dynamsoft.dwt_change_install_url(\'' + objInstallerUrl.rpm + '\')" /><label for="dwt-install-url-rpm">64 bit .rpm (For Fedora)</label></div>');
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

      ObjString.push(' onclick="Dynamsoft.DCP_DWT_onclickInstallButton()"><div class="dynamsoft-dwt-dlg-button">Download</div></a></div>');
      if (bHTML5) {
        if (bIE) {
          ObjString.push('<div class="dynamsoft-dwt-dlg-tail" style="text-align:left; padding-left: 80px">');
          ObjString.push('If you still see the dialog after installing the scan service, please<br />');
          ObjString.push('1. Add the website to the zone of trusted sites.<br />');
          ObjString.push('IE | Tools | Internet Options | Security | Trusted Sites.<br />');
          ObjString.push('2. Refresh your browser.');
          ObjString.push('</div>');

        } else {

          if (bUnix) {
            ObjString.push('<div class="dynamsoft-dwt-dlg-tail">');
            ObjString.push('<div class="dynamsoft-dwt-dlg-red">After the installation, please <strong>' + browserActionNeeded + '</strong>  your browser.</div>');
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
      _this.DWT.ShowMessage(ObjString.join(''), { width: promptDlgWidth, headerStyle: 1, closeButton: false });
    } else {
      console.log("The Dynamsoft namespace is missing");
    }
  };

  Dynamsoft.OnWebTwainNeedUpgradeCallback = function (ProductName, objInstallerUrl, bHTML5, iPlatform, bIE, bSafari, bSSL, strIEVersion, bForceUpgrade, bError, strErrorString) {
    Dynamsoft._show_install_dialog(ProductName, objInstallerUrl, bHTML5, iPlatform, bIE, bSafari, bSSL, strIEVersion, false);
  };

  Dynamsoft.OnWebTwainPreExecuteCallback = function () {
    var _this = Dynamsoft;
    if (_this.DWT) {
      _this.DWT.OnWebTwainPreExecute();
    } else {
      console.log("The Dynamsoft namespace is missing");
    }
  };

  Dynamsoft.OnWebTwainPostExecuteCallback = function () {
    var _this = Dynamsoft;
    if (_this.DWT) {
      _this.DWT.OnWebTwainPostExecute();
    } else {
      console.log("The Dynamsoft namespace is missing");
    }
  };

  Dynamsoft.OnRemoteWebTwainNotFoundCallback = function (ProductName, ip, port, bSSL, bMobile) {
    var _this = Dynamsoft;
    var ObjString;

    if (bMobile) {
      ObjString = [
        '<div class="dynamsoft-dwt-dlg-tips" style="text-align:left;font-size:1.4em">',
        'Failed to connect to the Dynamsoft Service, please make sure that the certificate is valid.<br /><br />',
        '</div>'
      ];
    } else {
      ObjString = [
        '<div class="dynamsoft-dwt-dlg-tips" style="text-align:left">',
        'Failed to connect to the Dynamsoft Service.<br />',
        'Please make sure that the certificate is valid OR ',
        'If you change the Dynamsoft.DWT.Host to your own IP/domain, do not forget to update the certificate accordingly.',
        '</div>',
        '<div class="dynamsoft-dwt-dlg-tail">',
        '<div class="dynamsoft-dwt-dlg-red">After installation, please REFRESH your browser.</div></div>'
      ];
    }
    if (_this.DWT) {
      _this.DWT.ShowMessage(ObjString.join(''), { width: promptDlgWidth, headerStyle: 1, closeButton: false });
    } else {
      console.log("The Dynamsoft namespace is missing");
    }
  };



  Dynamsoft.OnRemoteWebTwainNeedUpgradeCallback = function (ProductName, ip, port, bSSL) {
    var _this = Dynamsoft;
    var ObjString = [
      '<div class="dynamsoft-dwt-dlg-tips">',
      'Dynamsoft Service is outdated on the PC with IP/domain <br />',
      '"', ip, '".<br />',
      'Please open the page on that PC to download and install it.',
      '</div>',
      '<div class="dynamsoft-dwt-dlg-tail">',
      '<div class="dynamsoft-dwt-dlg-red">After installation, please REFRESH your browser.</div></div>'
    ];
    if (_this.DWT) {
      _this.DWT.ShowMessage(ObjString.join(''), { width: promptDlgWidth, headerStyle: 1, closeButton: false });
    } else {
      console.log("The Dynamsoft namespace is missing");
    }
  };

  Dynamsoft.OnWebTWAINDllDownloadSuccessful = function () {
    console.log('The Web TWAIN Module was downloaded successfully!');
  };

  Dynamsoft.OnWebTWAINDllDownloadFailure = function (ProductName, errorCode, errorString) {
    var _this = Dynamsoft;
    if (_this.DWT) {
      if (errorCode == -2371/* EnumDWT_Error.ModuleNotExists*/) {
        var ObjString = [
          '<div class="dynamsoft-dwt-dlg-tips">',
          errorString,
          '</div>',
          '<div class="dynamsoft-dwt-dlg-tail">',
          '<div class="dynamsoft-dwt-dlg-red">You can try <strong>REFRESHING</strong> your browser to try again. <br /> If the issue persists, please contact the website administrator.</div></div>'
        ];

        _this.DWT.ShowMessage(ObjString.join(''), { width: promptDlgWidth, headerStyle: 1, closeButton: false });

      }
      return true;
    } else {
      console.log("The Dynamsoft namespace is missing");
    }
  };

  Dynamsoft.OnGetServiceUpdateStatus = function (bError, statusCode, statusString) {
    if (statusString != "Update skipped")
      console.log(statusString);
  };

  Dynamsoft.OnWebTWAINModuleDownloadManually = function (objInstallerUrl, iPlatform, bIE, bSafari, bSSL, strIEVersion) {
    var _this = Dynamsoft;
    return _this._show_install_dialog('', objInstallerUrl, true, iPlatform, bIE, bSafari, bSSL, strIEVersion, false);
  };


  Dynamsoft.OnLTSLicenseError = function (message) {

    var addMessage = '', ObjString, lexp = Dynamsoft.DWT.licenseException, code = 0;
    if (lexp)
      code = lexp.code;

    if (code == -2440 ||  // NetworkError
      code == -2441 ||  // Timedout
      code == -2443 ||  // CorsError
      code == -2446 ||  // LtsJsLoadError
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

  Dynamsoft.OnLTSConnectionFailure = Dynamsoft.OnLTSLicenseError;
  Dynamsoft.OnLTSReturnedAnError = Dynamsoft.OnLTSLicenseError;
  Dynamsoft.OnLTSUUIDError = Dynamsoft.OnLTSLicenseError;

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

  Dynamsoft.OnLTSPublicLicenseMessage = function (message) {

    Dynamsoft.DWT.ShowMessage(message, {
      width: promptDlgWidth2,
      caption: 'Warning',
      headerStyle: 2
    });
  };

  Dynamsoft.OnHTTPCorsError = function () {

    var ObjString = [
      "<div>The Connection from the insecure (HTTP) web page to the local 'Dynamsoft Service' failed!</div>",
      '<div style="margin-top:10px">To fix the issue, please update your website to HTTPS or refer to <br /><a target="_blank" href="https://www.dynamsoft.com/web-twain/docs/faq/http-insecure-websites-in-chromium-browser.html?ver=latest">this article</a> for other workarounds.</div>'
    ].join('');

    Dynamsoft.DWT.ShowMessage(ObjString, {
      width: promptDlgWidth2,
      headerStyle: 2
    });
  };


  Dynamsoft.OnLicenseExpiredMessage = function (strExpiredDate, remain) {

    var ObjString,
      a_contact_us = '<a target="_blank" href="https://www.dynamsoft.com/company/contact/">contact us</a>',
      a_online_store = '<a target="_blank" href="https://www.dynamsoft.com/store/dynamic-web-twain/#DynamicWebTWAIN">online store</a>',
      a_new_key_href = 'https://www.dynamsoft.com/customer/license/trialLicense?product=dwt&utm_source=in-product';

    if (remain > 5) {

    }
    else if (remain > 0) { // 1~5

      var strDays;

      if (remain <= 1) {
        strDays = '1 day';
      } else {
        strDays = parseInt(remain) + ' days';
      }

      ObjString = [
        '<div style="padding:0 0 10px 0">Kindly note your trial key is expiring in ', strDays, '. Two quick steps to extend your trial:</div>',
        '<div style="margin:0 0 0 10px">1. <a target="_blank" href="', a_new_key_href, '">Request a new trial key</a> and follow the instructions to set the new key</div>',
        '<div style="margin:0 0 0 10px">2. Refresh your scan page and try again</div>',
        '<div style="padding:10px 0 0 0">If you run into any issues, please ', a_contact_us, '.</div>',
        '<div style="padding:0">If you are ready to purchase a full license, please go to the ', a_online_store, ' or ', a_contact_us, '.</div>'
      ].join('');

    } else {
      // remain<=0 Expired
      ObjString = [
        '<div style="padding:0">Sorry. Your trial key has expired on ', strExpiredDate, '. You can purchase a full license at the ', a_online_store, '.</div>',
        '<div style="padding:0">Or, you can try requesting a new trial key at <a target="_blank" href="', a_new_key_href, '">this page</a>.</div>',
        '<div style="padding:0">If you need any help, please ', a_contact_us, '.</div>'
      ].join('');

    }

    if (ObjString) {
      Dynamsoft.DWT.ShowMessage(ObjString, {
        width: promptDlgWidth2,
        caption: 'Warning',
        headerStyle: 2
      });
    }
  };

  Dynamsoft.OnLicenseError = function (message, errorCode) {

    Dynamsoft.DWT.ShowMessage(message, {
      width: promptDlgWidth2,
      headerStyle: 2
    });

  };

  Dynamsoft.OnSSLCertInfo = function (sslExpiredDate) {

  };

Dynamsoft._show_online_download_dialog=function(a,b,c){};})();