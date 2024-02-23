// @2023/04/25

* Product: Dynamic Web TWAIN SDK v18.x
* Summary: this Readme.txt is to help you understand the files under the Resources folder

====== Dynamsoft JavaScript Libraries ======

- dynamsoft.webtwain.config.js
This file is used to make basic configuration of the Dynamic Web TWAIN library. It's where you enter the product key for the product and to change the initial viewer size, etc.

- dynamsoft.webtwain.initiate.js
This file is the core of the Dynamic Web TWAIN library. You're not supposed to change it without consulting the Dynamsoft Support Team.

- dynamsoft.webtwain.install.js
This file is used to configure the dialogs which are shown when the Dynamic Web TWAIN library is not installed or needs to be upgraded. This file is already referenced inside the dynamsoft.webtwain.initiate.js

- src/dynamsoft.lts.js
This file contains the functionalities for Dynamsoft License Server.

- addon/dynamsoft.webtwain.addon.barcode.js
This file contains the functionalities of the Barcode addon. You're not supposed to change it without consulting the Dynamsoft Support Team.

- addon/dynamsoft.webtwain.addon.ocr.js
This file contains the functionalities of the OCR Basic addon. You're not supposed to change it without consulting the Dynamsoft Support Team.

- addon/dynamsoft.webtwain.addon.ocrpro.js
This file contains the functionalities of the OCR Professional addon. You're not supposed to change it without consulting the Dynamsoft Support Team.

- addon/dynamsoft.webtwain.addon.pdf.js
This file contains the functionalities of the PDF Rasterizer addon. You're not supposed to change it without consulting the Dynamsoft Support Team.

- addon/dynamsoft.webtwain.addon.webcam.js
This file contains the functionalities of the Webcam addon. You're not supposed to change it without consulting the Dynamsoft Support Team.

- addon/dynamsoft.upload.js
This file contains the functionalities of the Dynamsoft Upload Module. You're not supposed to change it without consulting the Dynamsoft Support Team.

- src/dynamsoft.webtwain.activex.js
This file contains the functionalities of the ActiveX edition

- src/dynamsoft.webtwain.viewer.css & dynamsoft.webtwain.viewer.js
These files are for buidling the UI of the Dynamic Web TWAIN library

- src/dynamsoft.webtwain.css
This file contains the style definitions for the general HTML elements created and used by the Dynamic Web TWAIN library


====== End-user Distribution files ======

Under dist/

Under this directory are the installers for the Dynamsoft Service which needs to be manually installed on each client machine that uses the Dynamic Web TWAIN library as a service.

- DynamsoftServiceSetup.msi
For Windows

- DynamsoftServiceSetup.pkg
For macOS

- DynamsoftServiceSetup.rpm
- DynamsoftServiceSetup.deb
- DynamsoftServiceSetup-arm64.deb
For Linux

There is also a file for the license declaration

- LICENSE

