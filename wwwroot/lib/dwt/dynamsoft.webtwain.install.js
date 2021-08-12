(function(){
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
  mips64 = (/mips64/g).test(ua);

function getDebPath (strSuffix) {
  var _path = Dynamsoft.DWT.ResourcesPath;
  if(Dynamsoft.Lib.isString(_path) && _path.length > 0) {
    if (_path[_path.length - 1] != '/') {
      _path = _path + '/';
    }                
  } else {
    _path = 'Resources/';
  }

  return  [
    _path, 
    'dist/DynamsoftServiceSetup-',
    strSuffix,
    '.deb'
  ].join('');
}

Dynamsoft.OnWebTwainNotFoundOnWindowsCallback = function (ProductName, InstallerUrl, bHTML5, bIE, bSafari, bSSL, strIEVersion) {
    var _this = Dynamsoft, objUrl = { 'default': InstallerUrl };
    _this._show_install_dialog(ProductName, objUrl, bHTML5, Dynamsoft.DWT.EnumDWT_PlatformType.enumWindow, bIE, bSafari, bSSL, strIEVersion);
};

Dynamsoft.OnWebTwainNotFoundOnLinuxCallback = function (ProductName, strDebUrl, strRpmUrl, bHTML5, bIE, bSafari, bSSL, strIEVersion) {
    var _this = Dynamsoft, objUrl = { 'default': strDebUrl, 'deb': strDebUrl, 'rpm': strRpmUrl };
    _this._show_install_dialog(ProductName, objUrl, bHTML5, Dynamsoft.DWT.EnumDWT_PlatformType.enumLinux, bIE, bSafari, bSSL, strIEVersion);
};

Dynamsoft.OnWebTwainNotFoundOnMacCallback = function (ProductName, InstallerUrl, bHTML5, bIE, bSafari, bSSL, strIEVersion) {
    var _this = Dynamsoft, objUrl = { 'default': InstallerUrl };
    _this._show_install_dialog(ProductName, objUrl, bHTML5, Dynamsoft.DWT.EnumDWT_PlatformType.enumMac, bIE, bSafari, bSSL, strIEVersion);
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
	        _this.DWT.ConnectToTheService();
		}, function () {
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

Dynamsoft._show_install_dialog = function (ProductName, objInstallerUrl, bHTML5, iPlatform, bIE, bSafari, bSSL, strIEVersion) {
    var _this = Dynamsoft, ObjString, title, browserActionNeeded;
	title = 'Please complete one-time setup';
	ObjString = [
		'<div class="dynamsoft-dwt-dlg-title">',
		title,
		'</div>'];
	if (_this.DWT) {
	    if (iPlatform == Dynamsoft.DWT.EnumDWT_PlatformType.enumLinux || navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
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
    
		if (bHTML5 && iPlatform == Dynamsoft.DWT.EnumDWT_PlatformType.enumLinux) {
      ObjString.push('<div style="margin:10px 0 0 60px;">');
      ObjString.push('<div id="dwt-install-url-div">');
      if(arm64 || mips64) {
        if(arm64)
          objInstallerUrl['default'] = getDebPath('arm64');
        else if(mips64)
          objInstallerUrl['default'] = getDebPath('mips64el');
      } else {
        ObjString.push('<div><input id="dwt-install-url-deb" name="dwt-install-url" type="radio" onclick="Dynamsoft.dwt_change_install_url(\'' + objInstallerUrl.deb + '\')" checked="checked" /><label for="dwt-install-url-deb">64 bit .deb (For Ubuntu/Debian/ChromeOS)</label></div>');
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
				
				if (iPlatform == Dynamsoft.DWT.EnumDWT_PlatformType.enumLinux) {
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
		_this.DWT.ShowDialog(promptDlgWidth, 0, ObjString.join(''));
	} else {
		console.log("The Dynamsoft namespace is missing");
	}
};

Dynamsoft.OnWebTwainOldPluginNotAllowedCallback = function (ProductName) {
    var _this = Dynamsoft;
    var ObjString = [
		'<div class="dynamsoft-dwt-dlg-title">',
		ProductName,
		' plugin is not allowed to run on this site.',
		'</div>',
		'<div class="dynamsoft-dwt-dlg-tail" style="margin-top:40px">',
		'Please click "<strong>Always run on this site</strong>" for the prompt that says <br />"<strong>',
		ProductName,
		' Plugin needs your permission to run</strong>"<br /><div class="dynamsoft-dwt-dlg-red">After that, you need to refresh or restart the browser.',
		'</div></div>'];

    if (_this.DWT) {
        _this.DWT.ShowDialog(promptDlgWidth, 0, ObjString.join(''));
	} else {
		console.log("The Dynamsoft namespace is missing");
	}
};

Dynamsoft.OnWebTwainNeedUpgradeCallback = function (ProductName, objInstallerUrl, bHTML5, iPlatform, bIE, bSafari, bSSL, strIEVersion, bForceUpgrade, bError, strErrorString) {
  Dynamsoft._show_install_dialog(ProductName, objInstallerUrl, bHTML5, iPlatform, bIE, bSafari, bSSL, strIEVersion);
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
	
	if(bMobile) {
		ObjString = [
			'<div class="dynamsoft-dwt-dlg-tips" style="font-size:1.5em">',
			'The Dynamsoft Service is not configured correctly on ',
			'"', ip, '". Please check.',
			'</div>'
		];
	} else {
		ObjString = [
			'<div class="dynamsoft-dwt-dlg-tips">',
			'Dynamsoft Service is missing a certificate for the following IP/domain <br />',
			'or isn\'t installed on the PC with the following IP/domain <br />',
			'"', ip, '".<br />',
			'Please make sure you have put the correct certificate <br />',
			'in the {Dynamsoft Service Directory}<br />',
			'or that Dynamsoft Service is installed on that specified PC.',
			'</div>',
			'<div class="dynamsoft-dwt-dlg-tail">',
			'<div class="dynamsoft-dwt-dlg-red">After installation, please REFRESH your browser.</div></div>'
		];
	}
	if (_this.DWT) {
	    _this.DWT.ShowDialog(promptDlgWidth, 0, ObjString.join(''));
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
        _this.DWT.ShowDialog(promptDlgWidth, 0, ObjString.join(''));
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

			_this.DWT.ShowDialog(promptDlgWidth, 0, ObjString.join(''));

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
    return _this._show_install_dialog('', objInstallerUrl, true, iPlatform, bIE, bSafari, bSSL, strIEVersion);
};


Dynamsoft.OnLTSLicenseError = function (message) {
  
  var ObjString = [
    '<div class="dynamsoft-dialog dynamsoft-dialog2">',
    '<div class="dynamsoft-dwt-ltsdlg-header"><span style="color:#FFF;line-height:30px;margin-left:10px">Error</span><div class="dynamsoft-dialog-close">x</div></div>',
    '<div class="dynamsoft-dwt-ltsdlg-body">',
    message,
    '</div></div>'
  ];

  Dynamsoft.Lib.ShowLicenseDialog(ObjString.join(''), {
    width: promptDlgWidth2,
    height: 0,
    bClose: true
  });
};

Dynamsoft.OnLTSConnectionFailure = Dynamsoft.OnLTSLicenseError;
Dynamsoft.OnLTSReturnedAnError = Dynamsoft.OnLTSLicenseError;
Dynamsoft.OnLTSUUIDError = Dynamsoft.OnLTSLicenseError;

Dynamsoft.OnLTSConnectionWarning = function () {
  
  var ObjString = [
    '<div class="dynamsoft-dialog dynamsoft-dialog2">',
    '<div class="dynamsoft-dwt-ltsdlg-header"><span style="color:#FFF;line-height:30px;margin-left:10px">Warning</span><div class="dynamsoft-dialog-close">x</div></div>',
    '<div class="dynamsoft-dwt-ltsdlg-body">',
    'Warning: You are seeing this dialog because Dynamic Web TWAIN has failed to connect to the License Tracking Server. ',
    'A cached authorization is being used, and you can continue to use the software as usual. ',
    'Please get connected to the network as soon as possible. ',
    Dynamsoft.DWT.isPublicLicense() ? '<a class="dynamsoft-major-color" href="https://www.dynamsoft.com/company/contact/">Contact Dynamsoft</a> ' :  'Contact the site administrator ',
	  'for more information.',
    '</div></div>'
  ].join('');
  
  Dynamsoft.Lib.ShowLicenseDialog(ObjString, {
    width: promptDlgWidth2,
    height: 0,
    bClose: true
  });
};

Dynamsoft.OnLTSPublicLicenseMessage = function (message) {
  
  var ObjString = [
    '<div class="dynamsoft-dialog dynamsoft-dialog2">',
    '<div class="dynamsoft-dwt-ltsdlg-header"><span style="color:#FFF;line-height:30px;margin-left:10px">Warning</span><div class="dynamsoft-dialog-close">x</div></div>',
    '<div class="dynamsoft-dwt-ltsdlg-body">',
    message,
    '</div></div>'
  ].join('');

  Dynamsoft.Lib.ShowLicenseDialog(ObjString, {
    width: promptDlgWidth2,
    height: 0,
    bClose: true
  });
};

})();
