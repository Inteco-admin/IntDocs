/*!
 * LMV v7.64.1
 *
 * Copyright 2022 Autodesk, Inc.
 * All rights reserved.
 *
 * This computer source code and related instructions and comments are the
 * unpublished confidential and proprietary information of Autodesk, Inc.
 * and are protected under Federal copyright and state trade secret law.
 * They may not be disclosed to, copied or used by any third party without
 * the prior written consent of Autodesk, Inc.
 *
 * Autodesk Forge Viewer Usage Limitations:
 *
 * The Autodesk Forge Viewer JavaScript must be delivered from an
 * Autodesk-hosted URL.
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!./node_modules/sass-loader/dist/cjs.js!./extensions/LayerManager/ui/LayersPanel.css":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!./node_modules/sass-loader/dist/cjs.js!./extensions/LayerManager/ui/LayersPanel.css ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".adsk-viewing-viewer .layers-panel {\n  left: 0px;\n  top: 0px;\n  min-width: 320px;\n  min-height: 100px;\n  height: calc(100% - 55px);\n  /* compensate for the toolbar */\n  width: 350px; }\n\n.adsk-viewing-viewer .layers-panel .visibility {\n  right: 40px;\n  top: 0px;\n  width: 25px;\n  height: 50px;\n  border: none;\n  outline: none;\n  margin: 0;\n  padding: 0;\n  background-position: 2px 19px;\n  background-repeat: no-repeat;\n  position: absolute;\n  cursor: pointer;\n  z-index: 1; }\n\n.adsk-viewing-viewer .layers-panel .visibility.dim {\n  background-position: 2px 16px; }\n\n.adsk-viewing-viewer .layers-panel .treeview {\n  height: 100%; }\n\n.adsk-viewing-viewer .layers-panel .exclude > lmvheader {\n  display: none; }\n\n.adsk-viewing-viewer .layers-panel .exclude {\n  padding-left: 0;\n  left: 0; }\n\n.adsk-viewing-viewer .layers-panel .treeview label {\n  padding-left: 17px; }\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var _i = 0; _i < this.length; _i++) {
        var id = this[_i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i2 = 0; _i2 < modules.length; _i2++) {
      var item = [].concat(modules[_i2]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ "./extensions/LayerManager/ui/LayersPanel.js":
/*!***************************************************!*\
  !*** ./extensions/LayerManager/ui/LayersPanel.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LayersPanel": () => (/* binding */ LayersPanel)
/* harmony export */ });
/* harmony import */ var _LayersPanel_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LayersPanel.css */ "./extensions/LayerManager/ui/LayersPanel.css");

var debounce = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");

var av = Autodesk.Viewing;
var avu = Autodesk.Viewing.UI;
var avp = Autodesk.Viewing.Private;

var i18n = av.i18n;
var DockingPanel = avu.DockingPanel;
var TreeDelegate = avu.TreeDelegate;
var Filterbox = avu.Filterbox;
var Tree = avu.Tree;
/**
 * The Layer Panel allows users to explore and set the visibility state of the different layers in the loaded model.
 * A layer is identified by a string label and represents a collection of geometry grouped by some criteria.
 * 
 * @alias Autodesk.Viewing.UI.LayersPanel
 * @augments Autodesk.Viewing.UI.DockingPanel
 * @param {Viewer} viewer - The parent viewer.
 * @param {HTMLElement} parentContainer - The container for this panel.
 * @param {string} id - The id for this panel.
 * @param {object} [options] - An optional dictionary of options.
 * @constructor
 */
function LayersPanel(viewer, parentContainer, id, options) {

  this.viewer = viewer;
  this.setGlobalManager(viewer.globalManager);
  this.tree = null;
  this.layersRoot = null;
  this.visibilityImages = {};
  this.isMac = navigator.userAgent.search("Mac OS") !== -1;

  var title = "Layers"; // Gets translated by DockingPanel's constructor

  DockingPanel.call(this, viewer.container, id, title, options);
  this.container.classList.add('layers-panel');
  this.container.style.top = "10px";
  this.container.style.left = "10px";

  var that = this;
  if (viewer.model) {
    that.build();
  } else {
    that.addEventListener(viewer, av.GEOMETRY_LOADED_EVENT, function () {
      that.build();
    });
  }

  var shown = false;
  this.addVisibilityListener(function () {
    if (!shown) {
      shown = true;
      that.resizeToContent();
    }
  });
}

LayersPanel.prototype = Object.create(DockingPanel.prototype);
LayersPanel.prototype.constructor = LayersPanel;

/**
 * Clean up when the layers panel is about to be removed.
 * @override
 */
LayersPanel.prototype.uninitialize = function () {
  DockingPanel.prototype.uninitialize.call(this);

  this.viewer = null;
  this.tree = null;
  this.layersRoot = null;
  this.scrollContainer = null;
};

/**
 * Builds the layers panel.
 */
LayersPanel.prototype.build = function () {
  var that = this;
  var sendAnalyticsDebounced = debounce(function (from, action) {
    avp.analytics.track('viewer.layers', {
      from: from,
      action: action });

  }, 2000);

  function createDelegate() {
    var delegate = new TreeDelegate();
    delegate.setGlobalManager(that.globalManager);

    delegate.getTreeNodeId = function (node) {
      return node.id;
    };

    delegate.getTreeNodeLabel = function (node) {
      return that.getNodeLabel(node);
    };

    delegate.getTreeNodeClass = function (node) {
      return that.getNodeClass(node);
    };

    delegate.isTreeNodeGroup = function (node) {
      return that.isGroupNode(node);
    };

    delegate.shouldCreateTreeNode = function (node) {
      return that.shouldInclude(node);
    };

    delegate.onTreeNodeClick = function (tree, node, event) {
      that.onClick(node, event);
      avp.analytics.track('viewer.layers', {
        from: 'Panel.TreeNode',
        action: 'Toggle Visibility' });

    };

    delegate.onTreeNodeRightClick = function (tree, node, event) {
      that.onRightClick(node, event);
    };

    delegate.onTreeNodeDoubleClick = function (tree, node, event) {
      that.onDoubleClick(node, event);
    };

    delegate.onTreeNodeIconClick = function (tree, node, event)
    {
      that.onIconClick(node, event);
    };

    delegate.createTreeNode = function (node, parent) {
      that.createNode(node, parent);
    };

    return delegate;
  }

  // All visibility button.
  var _document = this.getDocument();
  var button = _document.createElement('div');

  button.classList.add('visibility');
  button.title = i18n.translate('Show/hide all layers');

  button.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    this.viewer.setLayerVisible(null, this.viewer.allLayersHidden());
    avp.analytics.track('viewer.layers', {
      from: 'Panel',
      action: this.viewer.allLayersHidden() ? 'Show All' : 'Hide All' });

  }.bind(this));

  this.container.appendChild(button);
  this.toogleAllVisibleButton = button;

  // Add filterbox.
  var searchTimer = null;
  var searchText = "";
  var viewer = that.viewer;

  function doFiltering() {

    function getMatches(node) {
      var matches = [];
      if (node.name.toLowerCase().indexOf(searchText) !== -1) {
        matches.push(node);
      } else if (!node.isLayer) {
        var children = node.children;
        for (var i = 0; i < children.length; ++i) {
          matches = matches.concat(getMatches(children[i]));
        }
      }
      return matches;
    }

    if (searchText) {
      if (layersRoot && 0 < layersRoot.childCount) {
        that.lockoutClearFilter = true;
        viewer.setLayerVisible(getMatches(layersRoot), true, true);
        that.lockoutClearFilter = false;
      }
    } else {
      // Make all the layers visible.
      viewer.setLayerVisible(null, true);
    }

    sendAnalyticsDebounced('Panel', 'Search');

    searchTimer = null;
  }

  function doIncrementalFiltering(text) {

    if (searchTimer) {
      clearTimeout(searchTimer);
    }
    searchText = text ? text.toLowerCase() : text;
    searchTimer = setTimeout(doFiltering, 500);
  }

  this.filterbox = new Filterbox(this.viewer.container.id + 'LayersPanel' + '-Filterbox', { filterFunction: doIncrementalFiltering });
  this.filterbox.setGlobalManager(this.globalManager);
  this.container.appendChild(this.filterbox.container);

  // Layer tree.
  this.createScrollContainer({ heightAdjustment: 104, marginTop: 0 });

  var scrollContainerBackground = _document.createElement('div');
  scrollContainerBackground.classList.add('docking-panel-container-gradient');
  scrollContainerBackground.style.width = '100%';
  scrollContainerBackground.style.height = '100%';
  this.scrollContainer.appendChild(scrollContainerBackground);
  /*
      filterBox.addEventListener('keyup', function (e) {
          doIncrementalSearch();
      });
  
      // This is to detect when the user clicks on the 'x' to clear.
      filterBox.addEventListener('click', function (e) {
          if (filterBox.value === '') {
              viewer.setLayerVisible(null, true);
              return;
          }
  
          // When this event is fired after clicking on the clear button
          // the value is not cleared yet. We have to wait for it.
          setTimeout(function () {
              if (filterBox.value === '') {
                  viewer.setLayerVisible(null, true);
                  e.preventDefault();
              }
          }, 1);
      });
  */
  var delegate = createDelegate(),
  layersRoot = that.layersRoot = that.viewer.impl.getLayersRoot();

  if (layersRoot) {
    that.tree = new Tree(delegate, layersRoot, scrollContainerBackground, { excludeRoot: true });
    that.tree.setGlobalManager(that.globalManager);

    that.update();

    that.addEventListener(that.viewer, av.LAYER_VISIBILITY_CHANGED_EVENT, function () {
      that.update();
    });
  }
};

/**
 * Updates the visibility states for the layers in the panel.
 */
LayersPanel.prototype.update = function () {
  var that = this;

  function updateLook(node, state) {
    if (state === 0) {
      that.tree.addClass(node.id, 'dim');
    } else {// state === 1 || state === -1
      that.tree.removeClass(node.id, "dim");
    }
  }

  function traverse(layerNode) {
    if (layerNode.isLayer) {
      var visible = that.viewer.isLayerVisible(layerNode) ? 1 : 0;
      updateLook(layerNode, visible);
      return visible;
    } else {
      var children = layerNode.children;
      var dadVisible = 0;
      for (var i = 0; i < children.length; ++i) {
        var childVisible = traverse(children[i]);
        dadVisible = dadVisible || childVisible;
      }
      updateLook(layerNode, dadVisible);
    }
  }

  // Updatea visibility buttons.
  if (this.layersRoot && 0 < this.layersRoot.childCount) {
    traverse(that.layersRoot);
  }

  if (this.viewer.allLayersHidden()) {
    this.toogleAllVisibleButton.classList.add('dim');
  } else {
    this.toogleAllVisibleButton.classList.remove('dim');
  }
};

/**
 * Toggle or isolate the visibility state for a layer node.
 * @param {?Object} node
 * @param {boolean=} [isolate=false] true to isolate, false to toggle
 */
LayersPanel.prototype.setLayerVisible = function (node, isolate) {
  var visible = isolate;

  if (node !== null && !isolate) {
    visible = !this.viewer.impl.layers.isLayerVisible(node);
  }

  this.viewer.setLayerVisible(node, visible, isolate);
  //   this.filterBox.value = '';

  // Clear selection for better UX
  // Apply at the end so that it can be worked around if needed.
  this.viewer.clearSelection();
};

/**
 * Override this method to specify the label for a node.
 * @param {Object} node
 * @returns {string} Label of the tree node
 */
LayersPanel.prototype.getNodeLabel = function (node) {
  return node.isLayer || 0 === node.childCount ? node.name : node.name + " (" + node.childCount + ")";
};

/**
 * Override this to specify the CSS classes of a node. This way, in CSS, the designer
 * can specify custom styling per type.
 * By default, an empty string is returned.
 * @param {Object} node
 * @returns {string} CSS classes for the node
 */
LayersPanel.prototype.getNodeClass = function (node) {
  return '';
};

/**
 * Override this method to specify whether or not a node is a group node.
 * @param {Object} node
 * @returns {boolean} true if this node is a group node, false otherwise
 */
LayersPanel.prototype.isGroupNode = function (node) {
  return !node.isLayer;
};

/**
 * Override this method to specify if a tree node should be created for this node.
 * By default, every node will be displayed.
 * @param {Object} node
 * @returns {boolean} true if a node should be created, false otherwise
 */
LayersPanel.prototype.shouldInclude = function (node) {
  return true;
};

/**
 * Override this to do something when the user clicks on a tree node's icon.
 * By default, groups will be expanded/collapsed.
 * @param {Object} node
 * @param {Event} event
 */
LayersPanel.prototype.onIconClick = function (node, event) {
  this.setGroupCollapsed(node, !this.isGroupCollapsed(node));
};

/**
 * Collapse/expand a group node.
 * @param {Object} node - A node to collapse/expand in the tree.
 * @param {boolean} collapse - true to collapse the group, false to expand it.
 */
LayersPanel.prototype.setGroupCollapsed = function (node, collapse) {
  var delegate = this.tree.delegate();
  if (delegate.isTreeNodeGroup(node)) {
    var id = delegate.getTreeNodeId(node);
    this.tree.setCollapsed(id, collapse);
  }
};

/**
 * Returns true if the group is collapsed.
 * @param {Object} node - The node in the tree.
 * @returns {boolean} - true if the group is collapsed, false otherwise.
 */
LayersPanel.prototype.isGroupCollapsed = function (node) {
  var delegate = this.tree.delegate();
  if (delegate.isTreeNodeGroup(node)) {
    var id = delegate.getTreeNodeId(node);
    return this.tree.isCollapsed(id);
  }
  return false;
};
/**
 * Override this method to do something when the user clicks on a tree node
 * @param {Object} node
 * @param {Event} event
 */
LayersPanel.prototype.onClick = function (node, event) {
};

/**
 * Override this to do something when the user double-clicks on a tree node
 * @param {Object} node
 * @param {Event} event
 */
LayersPanel.prototype.onDoubleClick = function (node, event) {
};

/**
 * Override this to do something when the user right-clicks on a tree node
 * @param {Object} node
 * @param {Event} event
 */
LayersPanel.prototype.onRightClick = function (node, event) {
};

/**
 * Override this to do something when the user clicks on an image
 * @param {Object} node
 * @param {Event} event
 */
LayersPanel.prototype.onImageClick = function (node, event) {
};

/**
 * Returns the width and height to be used when resizing the panel to the content.
 *
 * @returns {{height: number, width: number}}
 */
LayersPanel.prototype.getContentSize = function () {

  var size = { width: 0, height: this.options.heightAdjustment || 0 };

  // Add filter size.
  var filter = this.filterbox.container;

  size.width += filter.clientWidth;
  size.height += filter.clientHeight;

  // Add treeview size.
  var layers = this.container.querySelectorAll('leaf');
  if (layers.length > 0) {
    size.height += layers[0].clientHeight * layers.length;
  }

  return size;
};

/**
 * Override this to create the HTMLContent for this node for appending to the
 * parent.  By default, a label and a visibility image are created.
 * @param {Object} node
 * @param {HTMLElement} parent
 */
LayersPanel.prototype.createNode = function (node, parent) {

  // Add visibility button.
  var _document = this.getDocument();
  var button = _document.createElement('div');

  button.dbId = node;
  button.classList.add('visibility');
  button.title = i18n.translate("Show/hide this layer");

  button.addEventListener('mousedown', function (event) {
    event.preventDefault();
    event.stopPropagation();
  }.bind(this));

  button.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    this.onImageClick(node, event);
    avp.analytics.track('viewer.layers', {
      from: 'Panel.TreeIcon',
      action: 'Toggle Visibility' });

  }.bind(this));

  parent.appendChild(button);

  // Add label.
  var label = _document.createElement('label');
  label.textContent = this.getNodeLabel(node);
  parent.appendChild(label);
};

/***/ }),

/***/ "./extensions/LayerManager/ui/ViewerLayersPanel.js":
/*!*********************************************************!*\
  !*** ./extensions/LayerManager/ui/ViewerLayersPanel.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewerLayersPanel": () => (/* binding */ ViewerLayersPanel)
/* harmony export */ });
/* harmony import */ var _LayersPanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LayersPanel */ "./extensions/LayerManager/ui/LayersPanel.js");


var av = Autodesk.Viewing;
var ave = av.Extensions;

var ViewerPanelMixin = ave.ViewerPanelMixin;

/**
 * ViewerLayersPanel
 * This is a panel for displaying the layers in a file.
 * @class
 * @augments Autodesk.Viewing.UI.LayersPanel
 *
 * @param {Viewer} viewer - The parent viewer.
 * @constructor
 */
function ViewerLayersPanel(viewer) {
  var parentContainer = viewer.container;
  _LayersPanel__WEBPACK_IMPORTED_MODULE_0__.LayersPanel.call(this, viewer, parentContainer, parentContainer.id + "ViewerLayersPanel", { heightAdjustment: 55 });

  this.onRestoreStateBinded = this.onRestoreState.bind(this);
  this.viewer.addEventListener(av.VIEWER_STATE_RESTORED_EVENT, this.onRestoreStateBinded);
}

ViewerLayersPanel.prototype = Object.create(_LayersPanel__WEBPACK_IMPORTED_MODULE_0__.LayersPanel.prototype);
ViewerLayersPanel.prototype.constructor = ViewerLayersPanel;
ViewerPanelMixin.call(ViewerLayersPanel.prototype);


ViewerLayersPanel.prototype.uninitialize = function () {
  if (this.onRestoreStateBinded) {
    this.viewer.removeEventListener(av.VIEWER_STATE_RESTORED_EVENT, this.onRestoreStateBinded);
    this.onRestoreStateBinded = null;
  }
  _LayersPanel__WEBPACK_IMPORTED_MODULE_0__.LayersPanel.prototype.uninitialize.call(this);
};

ViewerLayersPanel.prototype.onRestoreState = function () {
  this.update();
};

/**
 * Override this method to do something when the user clicks on a tree node
 * @override
 * @param {Object} node
 * @param {Event} event
 */
ViewerLayersPanel.prototype.onClick = function (node, event) {
  if (this.isMac && event.ctrlKey) {
    return;
  }
  var isolate = !(event.shiftKey || event.metaKey || event.ctrlKey);
  this.setLayerVisible(node, isolate);
};

/**
 * Override this to do something when the user right-clicks on a tree node
 * @param {Object} node
 * @param {Event} event
 */
ViewerLayersPanel.prototype.onRightClick = function (node, event) {
  var isolate = !(event.shiftKey || event.metaKey || event.ctrlKey);
  this.setLayerVisible(node, isolate);
};

/**
 * Override this to do something when the user clicks on an image
 * @override
 * @param {Object} node
 * @param {Event} event
 */
ViewerLayersPanel.prototype.onImageClick = function (node, event) {
  if (this.isMac && event.ctrlKey) {
    return;
  }
  this.setLayerVisible(node);
};

/**
 * Override this method to be notified when the user clicks on the title.
 * @override
 * @param {Event} event
 */
ViewerLayersPanel.prototype.onTitleClick = function (event) {
  this.viewer.setLayerVisible(null, true);
};

/**
 * Override this method to be notified when the user double-clicks on the title.
 * @override
 * @param {Event} event
 */
ViewerLayersPanel.prototype.onTitleDoubleClick = function (event) {
  this.viewer.fitToView();
};

/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "./node_modules/lodash/_baseTrim.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseTrim.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var trimmedEndIndex = __webpack_require__(/*! ./_trimmedEndIndex */ "./node_modules/lodash/_trimmedEndIndex.js");

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

module.exports = baseTrim;


/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "./node_modules/lodash/_trimmedEndIndex.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_trimmedEndIndex.js ***!
  \*************************************************/
/***/ ((module) => {

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

module.exports = trimmedEndIndex;


/***/ }),

/***/ "./node_modules/lodash/debounce.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/debounce.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    now = __webpack_require__(/*! ./now */ "./node_modules/lodash/now.js"),
    toNumber = __webpack_require__(/*! ./toNumber */ "./node_modules/lodash/toNumber.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/***/ ((module) => {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ "./node_modules/lodash/now.js":
/*!************************************!*\
  !*** ./node_modules/lodash/now.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ "./node_modules/lodash/toNumber.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toNumber.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTrim = __webpack_require__(/*! ./_baseTrim */ "./node_modules/lodash/_baseTrim.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ "./extensions/LayerManager/ui/LayersPanel.css":
/*!****************************************************!*\
  !*** ./extensions/LayerManager/ui/LayersPanel.css ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_5_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_5_use_2_node_modules_sass_loader_dist_cjs_js_LayersPanel_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../node_modules/sass-loader/dist/cjs.js!./LayersPanel.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!./node_modules/sass-loader/dist/cjs.js!./extensions/LayerManager/ui/LayersPanel.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_5_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_5_use_2_node_modules_sass_loader_dist_cjs_js_LayersPanel_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_5_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_5_use_2_node_modules_sass_loader_dist_cjs_js_LayersPanel_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_5_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_5_use_2_node_modules_sass_loader_dist_cjs_js_LayersPanel_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_5_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_5_use_2_node_modules_sass_loader_dist_cjs_js_LayersPanel_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var style = document.createElement("style");
  options.setAttributes(style, options.attributes);
  options.insert(style);
  return style;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(style) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    style.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute("media", media);
  } else {
    style.removeAttribute("media");
  }

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, style);
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


function domAPI(options) {
  var style = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(style, options, obj);
    },
    remove: function remove() {
      removeStyleElement(style);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, style) {
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************************************!*\
  !*** ./extensions/LayerManager/LayerManager.js ***!
  \*************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LayerManagerExtension": () => (/* binding */ LayerManagerExtension)
/* harmony export */ });
/* harmony import */ var _ui_ViewerLayersPanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui/ViewerLayersPanel */ "./extensions/LayerManager/ui/ViewerLayersPanel.js");


var av = Autodesk.Viewing;
var avu = Autodesk.Viewing.UI;
var avp = Autodesk.Viewing.Private;

/**
 * Use its `activate()` method to open the LayersPanel UI.
 * Layers are usually present in 2D models, but some 3D models may support
 * layers as well, for example: AutoCAD.
 *
 * The extension id is: `Autodesk.LayerManager`
 *
 * @param {Viewer3D} viewer - Viewer instance
 * @param {object} options - Configurations for the extension
 * @example 
 * viewer.loadExtension('Autodesk.LayerManager')
 * @memberof Autodesk.Viewing.Extensions
 * @alias Autodesk.Viewing.Extensions.LayerManagerExtension
 * @see {@link Autodesk.Viewing.Extension} for common inherited methods.
 * @class
 */
function LayerManagerExtension(viewer) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  av.Extension.call(this, viewer, options);
  this.viewer = viewer;
  this.options = options;
  this.name = "layermanager";

  // event callbacks
  this.onModelLayersInit = this.onModelLayersInit.bind(this);
  this.onModelAdded = this.onModelAdded.bind(this);

  // ui
  this.layersPanel = null;
}
LayerManagerExtension.prototype = Object.create(av.Extension.prototype);
LayerManagerExtension.prototype.constructor = LayerManagerExtension;

var proto = LayerManagerExtension.prototype;

/**
 * Invoked by the Viewer when when loading the extension.
 *
 * @returns {boolean} true if the extension is loaded successfully.
 */
proto.load = function () {
  this.viewer.addEventListener(av.MODEL_ADDED_EVENT, this.onModelAdded);
  if (this.viewer.model) {
    this.onModelAdded({ model: this.viewer.model });
  }

  return true;
};

/**
 * Invoked by the Viewer when when unloading the extension.
 */
proto.unload = function () {
  this.destroyUI();

  this.viewer.removeEventListener(av.MODEL_LAYERS_LOADED_EVENT, this.onModelLayersInit);
  this.viewer.removeEventListener(av.MODEL_ADDED_EVENT, this.onModelAdded);

  return true;
};

proto.addToolbarButton = function () {var _this = this;
  if (this.viewer.settingsTools.layerButton) {
    if (this.layersPanel) {
      var isVisible = this.viewer.settingsTools.layerButton.getState() === avu.Button.State.ACTIVE;
      this.layersPanel.setVisible(isVisible);
    }
    return;
  }

  var layerButton = new avu.Button('toolbar-layers-tool');
  layerButton.setToolTip('Layer Manager');
  layerButton.setIcon("adsk-icon-layers");
  layerButton.onClick = function () {
    // Toggle
    _this.layersPanel.setVisible(!_this.layersPanel.isVisible());
    avp.analytics.track('viewer.layers', {
      from: 'Panel',
      action: 'View List' });

  };

  var index = this.viewer.settingsTools.indexOf('toolbar-modelStructureTool');
  index = index !== -1 ? index : 0;

  this.viewer.settingsTools.addControl(layerButton, { index: index + 1 });
  this.viewer.settingsTools.layerButton = layerButton;

};

proto.createUI = function () {
  this.setLayersPanel(new _ui_ViewerLayersPanel__WEBPACK_IMPORTED_MODULE_0__.ViewerLayersPanel(this.viewer));
  this.addToolbarButton();
};

proto.removeLayersPanel = function () {
  if (this.layersPanel) {
    this.viewer.removePanel(this.layersPanel);

    this.layersPanel.uninitialize();
    this.layersPanel = null;
  }
};

proto.removeToolbarButton = function () {
  if (this.viewer.settingsTools && this.viewer.settingsTools.layerButton) {
    this.viewer.settingsTools.removeControl(this.viewer.settingsTools.layerButton.getId());
    this.viewer.settingsTools.layerButton = null;
  }
};

proto.destroyUI = function () {
  this.removeLayersPanel();
  this.removeToolbarButton();
};

/**
 * Callback function MODEL_ADDED_EVENT
 *
 * @param evt
 * @private
 */
proto.onModelAdded = function (evt) {
  // 2D models are already added through addModel in Viewer3DImpl. Only 3D is deferred to this extension
  // See addModel in ModelLayers.js
  if (evt.model.is3d()) {
    var layers = this.viewer.impl.layers;
    layers && layers.addModel(evt.model);
  }
};

/**
 * @private
 */
proto.onToolbarCreated = function () {
  if (!this.viewer.hasEventListener(av.MODEL_LAYERS_LOADED_EVENT, this.onModelLayersInit)) {
    this.viewer.addEventListener(av.MODEL_LAYERS_LOADED_EVENT, this.onModelLayersInit);
  }
  if (this.viewer.impl.layers && this.viewer.impl.layers.initialized) {
    this.onModelLayersInit();
  }
};

/**
 * Set the layerspanel and initialize it
 *
 * @param {object} layersPanel Instance of ViewerLayersPanel
 * @private
 */
proto.setLayersPanel = function (layersPanel) {var _this2 = this;
  this.layersPanel = layersPanel;
  this.viewer.addPanel(layersPanel);
  layersPanel.addVisibilityListener(function (visible) {
    if (visible) {
      _this2.viewer.onPanelVisible(layersPanel, _this2.viewer);
    }
    _this2.viewer.settingsTools.layerButton.setState(
    visible ? avu.Button.State.ACTIVE : avu.Button.State.INACTIVE);

  });
};

/**
 * Initialize model layers panel
 *
 * @private
 */
proto.onModelLayersInit = function () {
  // Disable UI in case of external UI used, such as Alloy component
  if (this.options.disableLayersUi) {
    return;
  }
  var layersRoot = this.viewer.impl.layers.getRoot();
  if (layersRoot && layersRoot.childCount > 0) {
    this.removeLayersPanel();
    this.createUI();
  } else {
    this.destroyUI();
  }
};

/**
 * Opens the Layers Panel UI.
 * 
 * @memberof Autodesk.Viewing.Extensions.LayerManagerExtension
 * @alias Autodesk.Viewing.Extensions.LayerManagerExtension#activate
 */
proto.activate = function () {
  if (this.layersPanel) {
    this.layersPanel.setVisible(true);
    return true;
  }

  return false;
};

/**
 * Closes the Layers Panel UI.
 * 
 * @memberof Autodesk.Viewing.Extensions.LayerManagerExtension
 * @alias Autodesk.Viewing.Extensions.LayerManagerExtension#deactivate
 */
proto.deactivate = function () {
  if (this.layersPanel) {
    this.layersPanel.setVisible(false);
  }
  return true;
};

/**
 * Checks whether the Layers Panel UI is opened.
 * 
 * @returns {boolean} true if the Layers Panel UI is currently opened.
 * 
 * @memberof Autodesk.Viewing.Extensions.LayerManagerExtension
 * @alias Autodesk.Viewing.Extensions.LayerManagerExtension#isActive
 */
proto.isActive = function () {
  return !!this.layersPanel && this.layersPanel.isVisible();
};

av.theExtensionManager.registerExtension('Autodesk.LayerManager', LayerManagerExtension);
})();

Autodesk.Extensions.LayerManager = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=LayerManager.js.map