// COPYRIGHT © 2016 Esri
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
// See http://js.arcgis.com/4.1/esri/copyright.txt for details.

define(["dojo/Deferred","dojo/when","./TileUtils","./TerrainConst","./TileGeometryFactory","../support/PreallocArray","../support/ObjectPool","../webgl-engine/lib/ShaderVariations","dojo/text!./TerrainMaterial.xml","../webgl-engine/materials/internal/MaterialUtil","../webgl-engine/lib/Util","../lib/glMatrix","../webgl-engine/lib/RenderPass","../webgl-engine/lib/RenderSlot","../webgl-engine/lib/tracer","../../webgl/Texture","../../webgl/FramebufferObject","../../webgl/VertexArrayObject","../../webgl/BufferObject","../../webgl/Program","../webgl-engine/lib/DefaultVertexAttributeLocations","../webgl-engine/lib/DefaultVertexBufferLayouts","../../webgl/Util"],function(e,t,r,i,n,a,s,o,l,d,f,u,c,h,m,p,g,v,T,y,x,b,R){var E,S=f.assert,A=u.vec2d,D=u.vec3d,w=u.vec4d,_=u.mat4d.identity(),O=4,I=[2,2],L=h.OPAQUE_TERRAIN,U=h.TRANSPARENT_TERRAIN,M=[0,0],N=D.create(),P=7,C=10,B=A.create(),G=function(){this.overlayTexOffset=A.create(),this.texOffset=A.create(),this.geometryInfo={geometry:null,numSurfaceIndices:0,numSkirtIndices:0,numWithoutSkirtIndices:0,numVertsPerRow:0},this.init()};G.prototype.init=function(){this.geometryInfo.geometry=null,this.geometryInfo.numSurfaceIndices=0,this.geometryInfo.numSkirtIndices=0,this.geometryInfo.numWithoutSkirtIndices=0,this.geometryInfo.numVertsPerRow=0,this.geometryState=null,this.vao=null,this.texture=null,this.textureReference=null,A.set2(0,0,this.texOffset),this.texScale=1,this.overlayTexId=null,this.overlayTexScale=[1,1],this.overlayOpacity=1,this.localOrigin=null},G.prototype.updateGeometryState=function(e){return this.geometryState=e.geometryState(this.geometryState),this.geometryState};var V=function(f,u){function h(){for(;we.length<we.data.length&&Oe.length>0;){var e=Oe.pop();we.push(e)}_e=we.length}function V(){for(var e=0;e<we.length;e++){var t=we.data[e];Ie.release(t),t.callback(e>=_e),t.callback=null}we.clear()}function F(e,t){var r=e.screenDepth,i=t.screenDepth;return i>r?-ce:r>i?ce:0}function j(e,t){return 0===e.tiles.length?-ce:0===t.tiles.length?ce:F(e.tiles.data[0],t.tiles.data[0])}function H(e,t){return void 0===t&&(t=le.subdivisionReduceLevels),0===t?e:0>t?Math.floor((e-1)*(1<<-t))+1:Math.floor((e-1)/(1<<t))+1}function k(e){for(var t=e.extent,r=e.lij[0],i=0;_e>i;){var n=we.data[i],a=n.extent;r>=n.minLevel&&r<=n.maxLevel&&a[0]<=t[2]&&a[2]>=t[0]&&a[1]<=t[3]&&a[3]>=t[1]?(we.swap(i,_e-1),_e--):i++}}u=u||256;var W,X,Y,z,q,Q,Z,J=!1,K=null,$=null,ee=null,te={},re=new s(100,G),ie=new a(10,function(){return{root:null,tiles:new a(300)}}),ne=new r.IteratorPreorder,ae=!0,se=1,oe=!0,le={mode:"none",width:1.5,falloff:1.5,wireOpacity:1,surfaceOpacity:0,color:[1,1,1,0],subdivision:"geometry",subdivisionReduceLevels:0},de=!1,fe=!1,ue=!1,ce=1,he=!0,me=!0,pe=null,ge=null,ve=null,Te=null,ye=null,xe=null,be=[];this.updateTileBackground=function(t){ye&&ye.reject(),xe=t;var r=new e;if(ye=r,t){var i=new Image;t instanceof Image?i.src=t.src:i.src=t,i.onload=function(){r.isFulfilled()||r.resolve(i)}}else r.resolve(null);return this.renderTileBackground(),r.promise};var Re=0,Ee=0,Se=0,Ae=0;this.numTileTexturesComposited=0,this.castShadows=!1,this.loaded=function(){};var De=!1;this.needsRender=!0,this.didRender=!1,this.receiveShadows=!1;var we=new a(10),_e=0,Oe=new a(30),Ie=new s(10,function(){this.extent=w.create(),this.minLevel=0,this.maxLevel=0,this.callback=null});this.renderTileBackground=function(){return X&&ye?ye.then(function(e){ve=this._buildTexture(e),K&&r.traverseTilesPreorder(K,function(e){this.updateTileTexture(e)}.bind(this))}.bind(this)):void 0},this.initializeRenderContext=function(e){X=e.rctx,Y=e.rctx.gl,q=X.extensions.textureFilterAnisotropic,S(!E||E===q.TEXTURE_MAX_ANISOTROPY_EXT,"contexts have different definitions afExt.TEXTURE_MAX_ANISOTROPY_EXT"),null!=q&&(E=q.TEXTURE_MAX_ANISOTROPY_EXT,Q=X.parameters.maxMaxAnisotropy,Z=Math.min(8,Q));var r=X.extensions.elementIndexUint;n.setSupportsUintIndices(!!r),t(this.renderTileBackground(),function(){J=!0,this.setNeedsRender()}.bind(this));var i=new Float32Array(20);i[0]=-1,i[1]=-1,i[2]=0,i[3]=0,i[4]=0,i[5]=1,i[6]=-1,i[7]=0,i[8]=1,i[9]=0,i[10]=-1,i[11]=1,i[12]=0,i[13]=0,i[14]=1,i[15]=1,i[16]=1,i[17]=0,i[18]=1,i[19]=1,ge=new v(X,x.Default3D,{geometry:b.Pos3Tex},{geometry:T.createVertex(X,Y.STATIC_DRAW,i)}),W=e.textureRep;var a=e.shaderSnippets,s=e.shaderRep,d=e.programRep;a.vsTerrain||a._parse(l),X.extensions.standardDerivatives;var f=new o("terrain",["vsTerrain","fsTerrain"],null,d,s,a,X);f.addDefine("Spherical","SPHERICAL"),f.addDefine("Overlay","OVERLAY"),f.addDefine("Atmosphere","ATMOSPHERE"),f.addDefine("Wireframe","WIREFRAME"),f.addDefine("TileBorders","TILE_BORDERS"),f.addBinaryShaderSnippetSuffix("Wireframe","Wireframe",[!1,!0]),f.addDefine("ReceiveShadows","RECEIVE_SHADOWS");var u=new o("terrainNormal",["vsTerrainNormal","fsNormal"],null,d,s,a,X);u.addDefine("Spherical","SPHERICAL"),u.addDefine("AlphaZero","ALPHA_ZERO"),ee={depth:d.get("depth"),depthShadowMap:d.get("depthShadowMap"),depthOnly:new y(X,a.vsTerrainDepthOnly,a.fsTerrainDepthOnly,x.Default3D),blendLayers:new y(X,a.vertexShaderBlendLayers,a.fragmentShaderBlendLayers,x.Default3D)},$={color:f,normal:u},this._updatePrograms(),Te=new p(X,{target:Y.TEXTURE_2D,pixelFormat:Y.RGBA,dataType:Y.UNSIGNED_BYTE,samplingMode:Y.NEAREST,width:4,height:4})},this.uninitializeRenderContext=function(e){null!=ge&&(ge.dispose(!0),ge=null),null!=Te&&(Te.dispose(),Te=null),null!=ve&&(ve.dispose(),ve=null),null!=pe&&(pe.dispose(),pe=null)},this._updatePrograms=function(){var e="spherical"===f,t="shader"===le.mode;ee.color=$.color.getProgram([e,!0,e&&me,t,de,t||de,this.receiveShadows]),ee.normal=$.normal.getProgram([e,!0])},this.install=function(e){e.addExternalRenderer([L,U],this)},this.uninstall=function(e){e.removeExternalRenderer(this)},this.setRootTiles=function(e){K=e},this.isStencilEnabledLayerExtent=function(e){return be.some(function(t){return e===t.id})},this.addStencilEnabledLayerExtent=function(e,t){be.push({id:e,extent:[t[0],t[1],t[3],t[4]]})},this.removeStencilEnabledLayerExtent=function(e){for(var t=0;t<be.length;t++)if(e===be[t].id)return void be.splice(t,1)},this.setTileSize=function(e){u=e},this.loadTile=function(e){S(null===e.renderData),e.renderData=re.acquire(),e.renderData.init();var t=this.getLocalOriginOfTile(e),r=e.createGeometry(e.renderData.updateGeometryState(e),t,"debug"===le.mode,e.renderData.geometryInfo);e.renderData.localOrigin=t,this._setTileGeometry(e,r),this.updateTileTexture(e)},this.queryVisibleLevelRange=function(e,t,r,i){var n=Ie.acquire();w.set(e,n.extent),t?n.minLevel=t:n.minLevel=-Number.MAX_VALUE,null!=r?n.maxLevel=r:n.maxLevel=Number.MAX_VALUE,n.callback=i,Oe.push(n),this.setNeedsRender()},this._buildTexture=function(e){var t,r={target:Y.TEXTURE_2D,pixelFormat:Y.RGBA,dataType:Y.UNSIGNED_BYTE,wrapMode:Y.CLAMP_TO_EDGE,samplingMode:Y.LINEAR,maxAnisotropy:Z,flipped:!0,hasMipmap:!0};if(e)try{t=new p(X,r,e)}catch(i){r.width=r.height=u,t=new p(X,r),console.warn("TerrainRenderer: failed to execute 'texImage2D', cross-origin image may not be loaded.")}else r.width=r.height=u,t=new p(X,r);return X.bindTexture(t),t.generateMipmap(),t},this._composeTexture=function(e,t,r){X.bindTexture(e,0),ee.blendLayers.setUniform1f("scale",t),ee.blendLayers.setUniform2fv("offset",r),X.bindVAO(ge),X.drawArrays(Y.TRIANGLE_STRIP,0,R.vertexCount(ge,"geometry"))},this._composeMapLayers=function(e,t,r,n,a){var s=i.LayerClass.MAP;e.renderData.texture||(e.renderData.texture=this._buildTexture());var o=e.renderData.texture;null===pe||pe.width!==o.descriptor.width||pe.height!==o.descriptor.height?pe=g.createWithAttachments(X,o,{colorTarget:0,depthStencilTarget:0}):(pe.detachColorTexture(),pe.attachColorTexture(o)),X.bindFramebuffer(pe),X.setViewport(0,0,u,u),X.setClearColor(0,0,0,0),X.clear(Y.COLOR_BUFFER_BIT),X.setBlendingEnabled(!0),X.setBlendFunctionSeparate(Y.ONE_MINUS_DST_ALPHA,Y.DST_ALPHA,Y.ONE_MINUS_DST_ALPHA,Y.ONE),X.bindProgram(ee.blendLayers),ee.blendLayers.setUniform1i("tex",0),X.bindVAO(ge),R.assertCompatibleVertexAttributeLocations(ge,ee.blendLayers);for(var l=0;r>=l;l++){var d,f,c=t[l],h=null;if(c.data)h=c,d=M,f=1;else if(c.upsampleFromTile){var m=c.upsampleFromTile;h=m.tile.layerInfo[s][l],d=m.offset,f=m.scale}h&&(h.data instanceof Image&&(h.data=this._buildTexture(h.data)),ee.blendLayers.setUniform1f("opacity",a[l]),this._composeTexture(h.data,f,d))}n&&this._composeTexture(ve,1,M),X.bindTexture(e.renderData.texture),e.renderData.texture.generateMipmap(),X.bindFramebuffer(null),X.setBlendFunctionSeparate(Y.SRC_ALPHA,Y.ONE_MINUS_SRC_ALPHA,Y.ONE,Y.ONE_MINUS_SRC_ALPHA),X.setBlendingEnabled(!1),this.numTileTexturesComposited++};var Le=new Array(20);this.updateTileTexture=function(e){for(var t=e.layerInfo[i.LayerClass.MAP],r=0;r<t.length;r++)t[r].pendingUpdates&=~i.TileUpdateTypes.UPDATE_TEXTURE;if(e.renderData){var n,a,s,o,l=i.LayerClass.MAP,d=e.renderData,f=0;for(o=0;o<t.length;o++){n=t[o];var u=e.parentSurface.layerViewByIndex(o,l),c=u.fullOpacity;if(Le[o]=c,(n.data||n.upsampleFromTile)&&(f++,!u.isTransparent()&&c>=1))break}var h=!1;o===t.length&&(h=!0,o--),0===f?(d.textureReference=ve,A.set2(0,0,d.texOffset),d.texScale=1):1!==f||h?(this._composeMapLayers(e,t,o,h,Le),d.textureReference=null,A.set2(0,0,d.texOffset),d.texScale=1):(n=t[o],n.data?(a=n,A.set2(0,0,d.texOffset),d.texScale=1):(s=n.upsampleFromTile,a=s.tile.layerInfo[l][o],A.set(s.offset,d.texOffset),d.texScale=s.scale),a&&(a.data instanceof Image&&(a.data=this._buildTexture(a.data)),d.textureReference=a.data)),this.setNeedsRender()}},this.releaseTileTexture=function(e){e.dispose()},this.releaseTileTextures=function(e){for(var t=e.layerInfo[i.LayerClass.MAP],r=0;r<t.length;r++){var n=t[r];n&&n.data instanceof window.WebGLTexture&&n.data.dispose()}},this.updateTileGeometryNeedsUpdate=function(e){return e.renderData.updateGeometryState(e).needsUpdate},this._updateTileGeometry=function(e){for(var t=e.renderData.geometryState,r=e.layerInfo[i.LayerClass.ELEVATION],n=0;n<r.length;n++)r[n].pendingUpdates&=~i.TileUpdateTypes.UPDATE_GEOMETRY;if(t.needsUpdate){e.renderData.vao&&this._releaseTileGeometry(e);var a=e.createGeometry(t,e.renderData.localOrigin,"debug"===le.mode,e.renderData.geometryInfo);return this._setTileGeometry(e,a),!0}return!1},this.updateTileGeometry=function(e){return e.renderData.updateGeometryState(e),this._updateTileGeometry(e)},this.unloadTile=function(e){this._releaseTileGeometry(e),e.renderData.texture&&e.renderData.texture.dispose(),re.release(e.renderData),e.renderData=null},this.getLocalOriginOfTile=function(e){if(e.lij[0]>=C){for(;e.lij[0]>P;)e=e.parent;return e.centerAtSeaLevel}if("spherical"===f)return N;for(;e.parent;)e=e.parent;return e.centerAtSeaLevel},this.setVisibility=function(e){ae=e,this.setNeedsRender()},this.getStats=function(){return{numTilesRendered:Ee,numTilesCulled:Se,numTrianglesRendered:Re,numOriginsRendered:Ae}},this.setDisableRendering=function(e){fe=!!e,this.setNeedsRender()},this.getOpacity=function(){return se},this.getWireframeEnabled=function(){return"shader"===le.mode},this.setWireframe=function(e){if(e&&e!==!0||(e={mode:e?"shader":"none"}),void 0!==e.mode&&le.mode!==e.mode){var t="debug"===le.mode,i="debug"===e.mode;le.mode=e.mode,this._updatePrograms(),t!==i&&K&&r.traverseTilesPreorder(K,function(e){if(e.renderData){e.renderData.vao&&this._releaseTileGeometry(e);var t=e.createGeometry(e.renderData.updateGeometryState(e),e.renderData.localOrigin,i,e.renderData.geometryInfo);this._setTileGeometry(e,t)}}.bind(this)),this.setNeedsRender()}for(var n in e)le.hasOwnProperty(n)&&(le[n]=e[n]),this.setNeedsRender()},this.setOpacity=function(e){se=e,this.setNeedsRender()},this.setDrawSkirts=function(e){oe=e,this.setNeedsRender()},this.setCullBackFaces=function(e){ue=e,this.setNeedsRender()},this.setRenderOrder=function(e){ce=e,this.setNeedsRender()},this.setBorders=function(e){de!==e&&(de=e,"none"===le.mode&&(le.transitionTime=0),this._updatePrograms(),this.setNeedsRender())},this.setFrontMostTransparent=function(e){he!==e&&(he=e,this.setNeedsRender())},this.setVelvetOverground=function(e){me!==e&&(me=e,this._updatePrograms(),this.setNeedsRender())},this.setNeedsRender=function(){this.needsRender=!0,this.didRender=!1},this.resetNeedsRender=function(){this.didRender&&(this.needsRender=0!==Oe.length,this.didRender=!1)};var Ue=D.create();this.isTransparent=function(){return 1>se||"shader"===le.mode&&(le.wireOpacity<1||le.surfaceOpacity<1)||!xe},this.render=function(e){if(J&&!fe&&ae&&K){var t=this.isTransparent(),r=t?U:L;if(e.slot===r){if(m.trace("# BEGIN RENDER TERRAIN"),ie.clear(),z=null,this._renderCollectOrigins(),0!==ce){for(var i=0;i<ie.length;i++)this._sortFrontToBack(ie.data[i].tiles,F);this._sortFrontToBack(ie,j)}var n,a=!1,s=!1,o=e.pass,l=e.camera;if(X.setBlendFunctionSeparate(Y.SRC_ALPHA,Y.ONE_MINUS_SRC_ALPHA,Y.ONE,Y.ONE_MINUS_SRC_ALPHA),X.setFaceCullingEnabled(ue),o===c.MATERIAL){s=t;var f=e.shadowMap&&e.shadowMap.getEnableState();if(this.receiveShadows!=f&&(this.receiveShadows=f,this._updatePrograms()),t&&he){var u=ee.depthOnly;X.bindProgram(u),X.setColorMask(!1,!1,!1,!1),X.setDepthTestEnabled(!0),this._renderTilesDepthOnly(l,X,u),X.setColorMask(!0,!0,!0,!0),X.setDepthFunction(Y.EQUAL),X.setDepthWriteEnabled(!1)}n=ee.color,a=!0,X.bindProgram(n),n.setUniform1f("opacity",se),X.setBlendingEnabled(s),("shader"===le.mode||de)&&(n.setUniform1f("wireframe.width",le.width),n.setUniform1f("wireframe.falloff",Math.min(le.width,le.falloff)),n.setUniform1f("wireframe.wireOpacity",le.wireOpacity*se),n.setUniform1f("wireframe.surfaceOpacity",le.surfaceOpacity*se),n.setUniform4fv("wireframe.color",le.color),n.setUniform1f("wireframe.near",l.near),n.setUniform1f("wireframe.far",l.far),"geometry"!==le.subdivision&&"constant"!==le.subdivision&&n.setUniform1f("wireframe.subdivision",H(le.subdivision)))}else if(o===c.MATERIAL_DEPTH_SHADOWMAP&&this.castShadows||o===c.MATERIAL_DEPTH)n=o===c.MATERIAL_DEPTH_SHADOWMAP?ee.depthShadowMap:ee.depth,X.bindProgram(n),n.setUniformMatrix4fv("model",_),B[0]=l.near,B[1]=l.far,n.setUniform2fv("nearFar",B);else{if(o!==c.MATERIAL_NORMAL)return;n=ee.normal,X.bindProgram(n)}e.shadowMap&&e.shadowMap.bind(n),e.ssaoHelper&&e.ssaoHelper.setUniforms(n),a&&(n.setUniform1i("tex",O),n.setUniform1i("overlayTex",O+1)),n.setUniformMatrix4fv("viewNormal",l.viewInverseTransposeMatrix),n.setUniformMatrix4fv("proj",l.projectionMatrix),n.setUniform3fv("lightDirection",e.lightingData.direction);var p=l.viewMatrix;for(D.set3(p[12],p[13],p[14],Ue),D.normalize(Ue),n.setUniform3fv("viewDirection",Ue),Ee=0,Se=0,Re=0,Ae=0,h(),i=0;i<ie.length;i++){var g=ie.data[i];n.setUniform3fv("origin",g.origin),d.bindView(g.origin,p,n),e.shadowMap&&e.shadowMap.bindView(n,g.origin),Ae++,this._renderTiles(g.tiles,n,a,e)}return s&&X.setBlendingEnabled(!1),t&&he&&(X.setDepthFunction(Y.LESS),X.setDepthWriteEnabled(!0)),ue&&X.setFaceCullingEnabled(!1),e.stencilRenderingHelper&&e.stencilRenderingHelper.getEnableState()&&e.stencilRenderingHelper.prepareStencilDisabledPass(),V(),Ee>0&&!De&&(De=!0,this.loaded&&this.loaded()),m.trace("# END RENDER TERRAIN"),!0}}},this._renderCollectOrigins=function(){for(var e=0;e<K.length;e++){var t=K[e],r=ie.next();r.root=t,"spherical"===f?r.origin=N:r.origin=t.centerAtSeaLevel,r.tiles.clear(),this._renderCollectOriginsForRoot(r)}},this._renderCollectOriginsForRoot=function(e){for(ne.reset(e.root);!ne.done;){var t=ne.next(),r=t.renderData;if(!r||t.visible){var i=ie.peek();if(t.lij[0]===P&&((i===e||0!==i.tiles.length)&&(i=ie.next(),i.tiles.clear()),i.root=t,i.origin=t.centerAtSeaLevel),r){var n=t.lij[0];n>=C?ie.peek().tiles.push(t):e.tiles.push(t),(null===z||z.lij[0]<n)&&(z=t),ne.skip()}}else Se++,ne.skip()}},this._sortFrontToBack=function(e,t){e.sort(t)},this._renderTilesDepthOnly=function(e,t,r){var i=e.viewMatrix;r.setUniformMatrix4fv("proj",e.projectionMatrix);for(var n=0;n<ie.length;n++){var a=ie.data[n];r.setUniform3fv("origin",a.origin),d.bindView(a.origin,i,r);for(var s=0;s<a.tiles.length;s++){var o=a.tiles.data[s],l=o.renderData;t.bindVAO(l.vao),R.assertCompatibleVertexAttributeLocations(l.vao,r);var f=l.vao.indexBuffer.size;oe||(f=l.geometryInfo.numWithoutSkirtIndices),t.drawElements(Y.TRIANGLES,f,l.vao.indexBuffer.indexType,0)}}t.bindVAO(null)},this._renderTiles=function(e,t,r,i){if(0!==e.length){var n=Y.TRIANGLES;"debug"===le.mode&&(n=Y.LINES);var a,s,o="geometry"===le.subdivision,l="constant"===le.subdivision,d=z,f=!1;d?(a=d.lij[0],s=H(d.renderData.geometryInfo.numVertsPerRow)):(a=16,s=16),X.setDepthTestEnabled(!0),X.setBlendingEnabled(this.isTransparent());for(var u=0;u<e.length;u++){var c=e.data[u],h=c.renderData;if(i.stencilRenderingHelper&&i.stencilRenderingHelper.getEnableState()){for(var p=!1,g=0;g<be.length;g++)if(c.intersectsExtent(be[g].extent)){p=!0;break}p&&!f?(i.stencilRenderingHelper.prepareStencilReadPass(),f=!0):!p&&f&&(i.stencilRenderingHelper.prepareStencilDisabledPass(),f=!1)}if(m.trace("# RENDER TILE "+c.lij[0]+"/"+c.lij[1]+"/"+c.lij[2]+", screenDepth:"+c.screenDepth),r){t.setUniform2fv("texOffset",h.texOffset),t.setUniform1f("texScale",h.texScale);var v=h.textureReference||h.texture;if(X.bindTexture(v,O),h.overlayTexId?Me(t,h):(t.setUniform2fv("overlayTexOffset",I),X.bindTexture(Te,O+1)),("shader"===le.mode||de)&&(o||l))if(o)t.setUniform1f("wireframe.subdivision",H(h.geometryInfo.numVertsPerRow));else{var T=H(s,c.lij[0]-a);t.setUniform1f("wireframe.subdivision",T)}}var y=h.vao.indexBuffer.size;oe||(y=h.geometryInfo.numWithoutSkirtIndices),X.bindVAO(h.vao),R.assertCompatibleVertexAttributeLocations(h.vao,t),X.drawElements(n,y,h.vao.indexBuffer.indexType,0),c.renderOrder=Ee,Ee++,Re+=y/3,k(c)}X.bindVAO(null)}};var Me=function(e,t){var r=t.overlayTexId,i=te[r];i||(i=W.aquire(r).getGLTexture(),S(i),te[r]=i),e.setUniform2fv("overlayTexOffset",t.overlayTexOffset),e.setUniform2fv("overlayTexScale",t.overlayTexScale),e.setUniform1f("overlayOpacity",t.overlayOpacity),X.bindTexture(i,O+1)},Ne=D.create(),Pe=D.create(),Ce=D.create();this.intersect=function(e,t,i,n){if(K&&("select"!==e.mode||!this.isTransparent())){D.subtract(i,t,Ne);var a=e.getMinResult(),s=e.getMaxResult();for(ne.reset(K);!ne.done;){var o=ne.next();if(null!==o.renderData){var l=o.renderData.geometryInfo.geometry,f=o.renderData.localOrigin;D.subtract(t,f,Pe),D.subtract(i,f,Ce),d.intersectTriangleGeometry(l,0,void 0,n,t,i,Pe,Ce,void 0,e.tolerance,function(e,t){if(e>=0){var i;(void 0===a.dist||e<a.dist)&&(i=r.lij2str(o.lij[0],o.lij[1],o.lij[2]),a.set(void 0,i,e,t,void 0),a.setIntersector("terrain")),(void 0===s.dist||e>s.dist)&&(i=r.lij2str(o.lij[0],o.lij[1],o.lij[2]),s.set(void 0,i,e,t,void 0),s.setIntersector("terrain"))}})}}}},this._setTileGeometry=function(e,t){var r=e.renderData,i=t.geometry.getData(),a=i.getVertexAttr().terrain.data,s=i.getFaces()[0].indices.terrain;r.vao=new v(X,x.Default3D,{geometry:b.Pos3Tex},{geometry:T.createVertex(X,Y.STATIC_DRAW,a)},T.createIndex(X,Y.STATIC_DRAW,s)),r.geometryInfo.geometry&&n.releaseGeometry(r.geometryInfo.geometry),r.geometryInfo=t,this.setNeedsRender()},this._releaseTileGeometry=function(e){var t=e.renderData;t.vao.dispose(!0),t.vao=null,t.geometryInfo.geometry&&n.releaseGeometry(t.geometryInfo.geometry),t.geometryInfo.geometry=null,this.setNeedsRender()}};return V.TileRenderData=G,V});