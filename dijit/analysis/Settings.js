// COPYRIGHT © 2017 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/Color","dojo/_base/json","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dojo/NodeList","dojo/NodeList-dom","dojo/_base/fx","dojo/fx/easing","dojo/Evented","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ToggleButton","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","dijit/Dialog","dijit/ConfirmDialog","dojox/mvc/at","dgrid1/OnDemandGrid","dgrid1/Tree","dgrid1/Editor","dgrid1/Keyboard","dgrid1/Selection","dgrid1/Selector","dgrid1/extensions/ColumnResizer","dgrid1/extensions/DijitRegistry","../../kernel","../../lang","../../geometry/Extent","../../SpatialReference","../../layers/ArcGISImageServiceLayer","./_Widget","./utils","./SettingsViewModel","dojo/i18n!../../nls/jsapi","dojo/text!./templates/Settings.html"],function(e,t,i,s,o,l,n,a,h,d,c,r,u,w,S,p,_,v,R,M,g,C,I,f,x,m,E,y,b,O,k,D,L,j,P,F,z,A,N,T,U,B,H,q,G,X,Y,W,V,K,J,Q,Z,$,ee){var te=t([A,U,B,H,T,N,q,G]),ie=J.createSubclass([g,C,I,f],{declaredClass:"esri.dijit.analysis.Settings",templateString:ee,widgetsInTemplate:!0,i18n:null,toolName:"Settings",helpFileName:"AnalysisEnvironments",viewModelType:Z,cssClass:{primaryButton:"btn calcite blue",button:"btn calcite"},constructor:function(e,t){this._pbConnects=[],e.containerNode&&(this.container=e.containerNode),this.cssClass=i.mixin({},this.cssClass)},destroy:function(){this.inherited(arguments),s.forEach(this._pbConnects,o.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),this.i18n={},i.mixin(this.i18n,$.common),i.mixin(this.i18n,$.analysisSettings),this._initModelWatchers()},postCreate:function(){this.inherited(arguments),this.initUI()},startup:function(){this._spatialRefGrid.startup()},initUI:function(){this._rasterUX=[this._snapLblRow,this._snapSelRow,this._rasterLblRow,this._cellLblRow,this._cellSelectRow,this._cellSelectNumRow,this._maskLblRow,this._maskSelRow],this._extentUX=[this._processExtLblRow,this._extentLblRow,this._extentRow],this._coordSysUX=[this._processSRRow,this._processSRLblRow,this._outSRLblRow,this._outSRRow,this._coordinateLblRow],Q.initHelpLinks(this.domNode,this.viewModel.showHelp),Q.updateDisplay(this._rasterUX,this.viewModel.showRasterSettings,"table-row"),Q.updateDisplay([this._overwriteRow],this.viewModel.showOverwriteResultOption,"table-row"),Q.updateDisplay([this._closeAnalysisRow],this.viewModel.showCloseAnalysisOption,"table-row"),Q.updateDisplay([this._storeAnalysisRow],this.viewModel.showStoreAnalysisOption,"table-row"),Q.updateDisplay(this._coordSysUX,this.viewModel.showCoordinateSystems,"table-row"),Q.updateDisplay([this._processSRRow,this._processSRLblRow],this.viewModel.showProcessSR,"table-row"),Q.updateDisplay([this._outSRLblRow,this._outSRRow],this.viewModel.showOutSR,"table-row"),Q.updateDisplay(this._extentUX,this.viewModel.showExtent,"table-row"),Q.updateDisplay([this._closeDiv],this.viewModel.showCloseIcon,"block"),Q.updateDisplay([this._settingsHeader],this.viewModel.showHeader,"block"),Q.updateDisplay([this._actionbuttonCtr],this.viewModel.showOkCancel,"block"),this._spatialRefGrid||(this._spatialRefGrid=new te({collection:this.viewModel.spatialRefStore,id:this.id+"_settingsgrid",showHeader:!1,columns:[{renderExpando:!0,label:"Name",field:"name",sortable:!1,resizable:!0}],"class":"esriAnalysisSpatialRefTree"},this._spatialRefGridNode),w(".dijitButton",this._coordDialog.domNode).forEach(function(e,t){0===t?S.add(e,this.cssClass.primaryButton):S.add(e,this.cssClass.button)},this)),this.viewModel.outSR&&this._outSRInput.set("value",this.viewModel.outSR.wkid),this.viewModel.processSR&&this._processSRInput.set("value",this.viewModel.processSR.wkid),this.viewModel.layers&&this._updateLayerOptions(this.viewModel.layers),this._extentSelect.set("value",this.viewModel.get("isCustomExtent")?"SPECIFIED":"DEFAULT"),this._outSRSelect.set("value",this.viewModel.get("isCustomOutSR")?"SPECIFIED":"DEFAULT"),this._processSRSelect.set("value",this.viewModel.get("isCustomProcessSR")?"SPECIFIED":"DEFAULT"),this.showOutSR&&this._handleSRSelectChange(this._outSRSelect.get("value")),this.showProcessSR&&this._handleProcessSRSelectChange(this._processSRSelect.get("value")),this.viewModel.get("isCustomExtent")&&this.viewModel.extent&&(this._xMinInput.set("value",this.viewModel.extent.xmin),this._xMaxInput.set("value",this.viewModel.extent.xmax),this._yMinInput.set("value",this.viewModel.extent.ymin),this._yMaxInput.set("value",this.viewModel.extent.ymax)),this._handleExtentOptionChange(this._extentSelect.get("value")),this._cellSizeSelect.set("value",this.viewModel.get("isCustomCellSize")?"SPECIFIED":this._cellSizeSelect.get("value")),this.viewModel.get("isCustomCellSize")&&this.viewModel.cellSize&&this._cellSizeInput.set("value",this.viewModel.cellSize),this._handleCellSizeSelectChange(this._cellSizeSelect.get("value")),this._handleSnapRasterSelectChange(this._snapRasterSelect.get("value")),this._handleMaskSelectChange(this._maskSelect.get("value"))},_initModelWatchers:function(){this.own(this.viewModel.watch("showCloseIcon",i.hitch(this,function(e,t,i){Q.updateDisplay([this._closeDiv],i,"block")})),this.viewModel.watch("showHelp",i.hitch(this,function(e,t,i){Q.initHelpLinks(this.domNode,i)})),this.viewModel.watch("showOverwriteResultOption",i.hitch(this,function(e,t,i){Q.updateDisplay([this._overwriteRow],i,"table-row")})),this.viewModel.watch("showCloseAnalysisOption",i.hitch(this,function(e,t,i){Q.updateDisplay([this._closeAnalysisRow],i,"table-row")})),this.viewModel.watch("showStoreAnalysisOption",i.hitch(this,function(e,t,i){Q.updateDisplay([this._storeAnalysisRow],i,"table-row")})),this.viewModel.watch("showCoordinateSystems",i.hitch(this,function(e,t,i){Q.updateDisplay(this._coordSysUX,i,"table-row")})),this.viewModel.watch("showProcessSR",i.hitch(this,function(e,t,i){Q.updateDisplay([this._processSRRow,this._processSRLblRow],i,"table-row"),this._handleProcessSRSelectChange(this._processSRSelect.get("value"))})),this.viewModel.watch("showOutSR",i.hitch(this,function(e,t,i){Q.updateDisplay([this._outSRLblRow,this._outSRRow],i,"table-row"),this._handleSRSelectChange(this._outSRSelect.get("value"))})),this.viewModel.watch("showExtent",i.hitch(this,function(e,t,i){Q.updateDisplay(this._extentUX,i,"table-row"),i&&this._handleExtentOptionChange(this._extentSelect.get("value"))})),this.viewModel.watch("showRasterSettings",i.hitch(this,function(e,t,i){Q.updateDisplay(this._rasterUX,i,"table-row"),this._handleCellSizeSelectChange(this._cellSizeSelect.get("value")),this._handleSnapRasterSelectChange(this._snapRasterSelect.get("value")),this._handleMaskSelectChange(this._maskSelect.get("value"))})),this.viewModel.watch("layers",i.hitch(this,function(e,t,i){this._updateLayerOptions(this.viewModel.layers)})),this.viewModel.watch("showHeader",i.hitch(this,function(e,t,i){Q.updateDisplay([this._settingsHeader],i,"block")})),this.viewModel.watch("showOkCancel",i.hitch(this,function(e,t,i){Q.updateDisplay([this._actionbuttonCtr],i,"block")})))},_handleSRSelectChange:function(e){var t,i;this._coordDialog.hide(),this._outSRBtn.set("disabled","SPECIFIED"!==e),Q.updateDisplay(this._outSRCustomRow,"SPECIFIED"===e&&this.viewModel.showOutSR,"table-row"),Q.updateDisplay(this._outSRCustomInputRow,"SPECIFIED"===e&&this.viewModel.showOutSR,"table-row"),this._outSRInput.set("required","SPECIFIED"===e),-1!==e.indexOf("LAYER_")&&(t=e.split("_")[1],i=this.viewModel.layers[t],this.viewModel.showOkCancel?this._outSR={wkid:parseInt(i.fullExtent.spatialReference.wkid,10)}:this.viewModel.set("outSR",{wkid:parseInt(i.fullExtent.spatialReference.wkid,10)}))},_handleProcessSRSelectChange:function(e){var t,i;this._coordDialog.hide(),this._processSRBtn.set("disabled","SPECIFIED"!==e),Q.updateDisplay(this._processSRCustomRow,"SPECIFIED"===e&&this.viewModel.showProcessSR,"table-row"),Q.updateDisplay(this._processSRCustomInputRow,"SPECIFIED"===e&&this.viewModel.showProcessSR,"table-row"),this._processSRInput.set("required","SPECIFIED"===e),-1!==e.indexOf("LAYER_")&&(t=e.split("_")[1],i=this.viewModel.layers[t],this.viewModel.showOkCancel?this._processSR={wkid:parseInt(i.fullExtent.spatialReference.wkid,10)}:this.viewModel.set("processSR",{wkid:parseInt(i.fullExtent.spatialReference.wkid,10)}))},_handleOutSRBtnClick:function(){this._outSRClick=!0,this._coordDialog.show()},_handleProcessSRBtnClick:function(){this._outSRClick=!1,this._coordDialog.show()},_handleExtentOptionChange:function(e){var t,i,s,o="SPECIFIED"===e;Q.updateDisplay([this._extentLbl,this._customExtentRow],this.viewModel.showExtent&&o,"table-row"),this._xMinInput.set("required",o),this._xMaxInput.set("required",o),this._yMinInput.set("required",o),this._yMaxInput.set("required",o),-1!==e.indexOf("LAYER_")?(t=e.split("_")[1],i=this.viewModel.layers[t],this.viewModel.showOkCancel?this._extent=i.fullExtent.shiftCentralMeridian():this.viewModel.set("extent",i.fullExtent.shiftCentralMeridian())):"SPECIFIED"===e?(s=new W(this._xMinInput.get("value"),this._yMinInput.get("value"),this._xMaxInput.get("value"),this._yMaxInput.get("value"),new V({wkid:102100})),this.viewModel.showOkCancel?this._extent=s:this.viewModel.set("extent",s)):"DEFAULT"===e&&(this._extent=null)},_handleSRDlgOk:function(){var e,t,i;for(var s in this._spatialRefGrid.get("selection"))this._spatialRefGrid.get("selection").hasOwnProperty(s)&&(e=s);t=this._spatialRefGrid.collection.getSync(e),i=t.sRef.wkid,this.viewModel.showOkCancel?this._outSRClick?this._outSR={wkid:parseInt(i,10)}:this._processSR={wkid:parseInt(i,10)}:this.viewModel.set(this._outSRClick?"outSR":"processSR",{wkid:parseInt(i,10)}),this._outSRClick?this._outSRInput.textbox.value=i:this._processSRInput.textbox.value=i,this._outSRClick?r.set(this._outSRLabel,"innerHTML",t.name):r.set(this._processSRLabel,"innerHTML",t.name)},_handleSRDlgCancel:function(){},_handleOutSRInputChange:function(e){e&&(r.set(this._outSRLabel,"innerHTML",""),Q.updateDisplay([this._outSRLabel],!1,"inline"),this.viewModel.showOkCancel?this._outSR={wkid:parseInt(e,10)}:this.viewModel.set("outSR",{wkid:parseInt(e,10)}))},_handleProcessSRInputChange:function(e){e&&(r.set(this._processSRLabel,"innerHTML",""),Q.updateDisplay([this._processSRLabel],!1,"inline"),this.viewModel.showOkCancel?this._processSR={wkid:parseInt(e,10)}:this.viewModel.set("processSR",{wkid:parseInt(e,10)}))},_handleCellSizeSelectChange:function(e){var t;Q.updateDisplay([this._cellSelectNumRow],"SPECIFIED"===e&&this.viewModel.showRasterSettings,"table-row"),-1!==e.indexOf("LAYER_")?(t=this._cellSizeSelect.getOptions(e),this.viewModel.showOkCancel?this._cellSize={url:t.url}:this.viewModel.set("cellSize",{url:t.url})):"SPECIFIED"===e?this.viewModel.showOkCancel?this._cellSize=this._cellSizeInput.get("value"):this.viewModel.set("cellSize",this._cellSizeInput.get("value")):this.viewModel.showOkCancel?this._cellSize=e:this.viewModel.set("cellSize",e)},_handleSnapRasterSelectChange:function(e){var t;-1!==e.indexOf("LAYER_")?(t=this._snapRasterSelect.getOptions(e),this.viewModel.showOkCancel?this._snapRaster={url:t.url}:this.viewModel.set("snapRaster",{url:t.url})):this.viewModel.showOkCancel?this._snapRaster="NONE"===e?void 0:e:this.viewModel.set("snapRaster","NONE"===e?void 0:e)},_handleMaskSelectChange:function(e){var t;-1!==e.indexOf("LAYER_")?(t=this._maskSelect.getOptions(e),this.viewModel.showOkCancel?this._mask={url:t.url}:this.viewModel.set("mask",{url:t.url})):this.viewModel.showOkCancel?this._mask="NONE"===e?void 0:e:this.viewModel.set("mask","NONE"===e?void 0:e)},_handleCellSizeInputChange:function(e){e&&"SPECIFIED"===this._cellSizeSelect.get("value")&&(this.viewModel.showOkCancel?this._cellSize=e:this.viewModel.set("cellSize",e))},_updateLayerOptions:function(e){var t,i,o,l,n=s.map(e,function(e,t){return{value:"LAYER_"+t,label:"Layer "+e.name,url:e.url}},this),a=[{value:"minof",label:this.i18n.minInputs},{value:"maxof",label:this.i18n.maxInputs,selected:!0},{value:"SPECIFIED",label:this.i18n.extentSpecfiedBelow}],h=[{value:"DEFAULT",label:this.i18n.defaultLabel},{value:"SPECIFIED",label:this.i18n.extentSpecfiedBelow}],d=[{value:"DEFAULT",label:this.i18n.defaultExtentLabel},{value:"SPECIFIED",label:this.i18n.extentSpecfiedBelow}];o=[].concat(d).concat(n),l=[].concat(h).concat(n),t=s.filter(e,function(e){return e instanceof K}),i=[].concat(s.map(t,function(e,t){return{value:"LAYER_"+t,label:"Layer "+e.name,url:e.url}},this)),this._outSRSelect.removeOption(this._outSRSelect.getOptions()),this._processSRSelect.removeOption(this._processSRSelect.getOptions()),this._extentSelect.removeOption(this._extentSelect.getOptions()),this._maskSelect.removeOption(this._maskSelect.getOptions()),this._cellSizeSelect.removeOption(this._cellSizeSelect.getOptions()),this._snapRasterSelect.removeOption(this._snapRasterSelect.getOptions()),this._outSRSelect.addOption(o),this._processSRSelect.addOption(o),this._extentSelect.addOption(l),this._extentSelect.set("value",this.viewModel.get("isCustomExtent")?"SPECIFIED":"DEFAULT"),this._maskSelect.addOption([{value:"NONE",label:""}].concat(n)),this._cellSizeSelect.addOption([].concat(a).concat(n)),this._snapRasterSelect.addOption([{value:"NONE",label:""}].concat(i))},_handleOkButtonClick:function(){this._form.validate()&&(this.viewModel.set("outSR",this._outSR),this.viewModel.set("processSR",this._processSR),this.viewModel.set("isCustomExtent","SPECIFIED"===this._extentSelect.get("value")),this.viewModel.set("isCustomOutSR","SPECIFIED"===this._outSRSelect.get("value")),this.viewModel.set("isCustomProcessSR","SPECIFIED"===this._processSRSelect.get("value")),this.viewModel.set("isCustomCellSize","SPECIFIED"===this._cellSizeSelect.get("value")),"SPECIFIED"===this._extentSelect.get("value")&&(this._extent=new W(this._xMinInput.get("value"),this._yMinInput.get("value"),this._xMaxInput.get("value"),this._yMaxInput.get("value"),new V({wkid:102100}))),this.viewModel.set("extent",this._extent),this.viewModel.set("mask",this._mask),this.viewModel.set("snapRaster",this._snapRaster),this.viewModel.set("cellSize",this._cellSize),this.viewModel.save(),this.emit("ok-settings",{viewMode:this.viewModel}))},_handleCancelButtonClick:function(){this._form.reset(),this.viewModel.reset(),this.reset(),this.emit("cancel-settings",{viewMode:this.viewModel})},reset:function(){this.initUI()},_showMessages:function(e){r.set(this._bodyNode,"innerHTML",e),v.fadeIn({node:this._errorMessagePane,easing:R.quadIn,onEnd:i.hitch(this,function(){c.set(this._errorMessagePane,{display:""})})}).play()},_handleCloseMsg:function(e){e&&e.preventDefault(),v.fadeOut({node:this._errorMessagePane,easing:R.quadOut,onEnd:i.hitch(this,function(){c.set(this._errorMessagePane,{display:"none"})})}).play()}});return a("extend-esri")&&i.setObject("dijit.analysis.Settings",ie,X),ie});