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

/***/ "./extensions/Snapping/SnapMath.js":
/*!*****************************************!*\
  !*** ./extensions/Snapping/SnapMath.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nearestPointOnCircularArc": () => (/* binding */ nearestPointOnCircularArc),
/* harmony export */   "intersectLines": () => (/* binding */ intersectLines)
/* harmony export */ });

// Collection of static math functions used for snapping implementation

// Find closest point to p on a circular arc. 
//  @param {Vector2} center
//  @param {number} radius
//  @param {number} startAngle, endAngle - ccw angles in radians. 0 means direction x+
//  @param {Vector2} [outPoint]
//  @param {Vector2}
var nearestPointOnCircularArc = function nearestPointOnCircularArc(p, center, radius, startAngle, endAngle, outPoint) {

  outPoint = outPoint || new THREE.Vector2();

  // get normalized direction from circle center to p.
  // dir = (p-center).normalized()
  var dir = outPoint.copy(p).sub(center).normalize();

  // If the point is within the arc, we are done
  var angle = Math.atan2(dir.y, dir.x);
  var insideArc = Autodesk.Extensions.CompGeom.angleInsideArc(angle, startAngle, endAngle);
  if (insideArc) {
    // The ray from center towards p intersects the circle arc.
    // So, we obtain the closest point by projecting p onto the circle.
    //
    // Since dir is the normalized direction from center to p, we obtain the circle projection by:
    //  onCircleArc = center + dir * radius
    return dir.multiplyScalar(radius).add(center);
  }

  // The closest point on the circle is not on the arc.
  // Then the closest point must be one of the arc ends. Note that this conclusion
  // can only be made for circles, but not for ellipses with different radii.
  var pStart = Autodesk.Extensions.CompGeom.getEllipsePoint(startAngle, center.x, center.y, radius, radius);
  var pEnd = Autodesk.Extensions.CompGeom.getEllipsePoint(endAngle, center.x, center.y, radius, radius);

  var d2Start = pStart.distanceToSquared(p);
  var d2End = pEnd.distanceToSquared(p);
  var startIsCloser = d2Start <= d2End;

  outPoint.copy(startIsCloser ? pStart : pEnd);
  return outPoint;
};

// Compute intersection of two line segments
// based on http://www.paulbourke.net/geometry/pointlineplane/
//  @param {Vector2} p1, p2               - First line segment
//  @param {Vector2} p3, p4               - Second line segment
//  @param {bool}    [checkInsideSegment] - If true, we reject line intersections outside the segment ranges
//  @param {Vector2} [outPoint]           - Optional target vector
//  @param {number}  [epsilon]            - Nearly-zero threshold used to determine "nearly-parallel" resp. "nearly-zero-length line"
//  @param {Vector2|null}
var intersectLines = function intersectLines(p1, p2, p3, p4, checkInsideSegment, outPoint) {var epsilon = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0.00001;

  var denom = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);

  // Reject if lines are parallel or one of them has zero-length
  if (Math.abs(denom) < epsilon) {
    return null;
  }

  // ua denotes where to find the intersection point p along segment (p1, p2):
  //   For ua = 0, we have p = p1
  //   For ua = 1, we have p = p2
  var ua = (p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x);
  ua /= denom;

  // Apply segment check
  if (checkInsideSegment) {

    // ub denotes where to find the intersection point p along segment (p3, p4)
    var ub = (p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x);
    ub /= denom;

    // Intersection is within the segments if ua and ub are both in [0,1]
    if (ua < 0.0 || ua > 1.0 ||
    ub < 0.0 || ub > 1.0) {
      return null;
    }
  }

  outPoint = outPoint || new THREE.Vector2();

  outPoint.x = p1.x + ua * (p2.x - p1.x);
  outPoint.y = p1.y + ua * (p2.y - p1.y);
  return outPoint;
};

/***/ }),

/***/ "./extensions/Snapping/Snapper.js":
/*!****************************************!*\
  !*** ./extensions/Snapping/Snapper.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Snapper": () => (/* binding */ Snapper)
/* harmony export */ });
/* harmony import */ var _SnapperIndicator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SnapperIndicator.js */ "./extensions/Snapping/SnapperIndicator.js");
/* harmony import */ var _SnapMath_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SnapMath.js */ "./extensions/Snapping/SnapMath.js");
function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}



var MeasureCommon = Autodesk.Viewing.MeasureCommon;
var EPSILON = MeasureCommon.EPSILON;
var SnapType = MeasureCommon.SnapType;
var SnapResult = MeasureCommon.SnapResult;

var SNAP_PRECISION = 0.001;

var av = Autodesk.Viewing;
var avp = av.Private;
var VertexBufferReader = avp.VertexBufferReader;

/**
 * @param {number} a - First value to compare
 * @param {number} b - Second value to compare
 * @private
 */
function isEqualWithPrecision(a, b) {
  return Math.abs(a - b) <= SNAP_PRECISION;
}

/**
 * Are the vectors equal within SNAP_PRECISION?
 * @param {THREE.Vector3} v1 - vector
 * @param {THREE.Vector3} v2 - vector
 * @returns {boolean} - true when they are equal
 * @private
 */
function isEqualVectorsWithPrecision(v1, v2) {
  return Math.abs(v1.x - v2.x) <= SNAP_PRECISION &&
  Math.abs(v1.y - v2.y) <= SNAP_PRECISION &&
  Math.abs(v1.z - v2.z) <= SNAP_PRECISION;
}

/**
 * Are the vectors inverse of each other within SNAP_PRECISION?
 * @param {THREE.Vector3} v1 - vector
 * @param {THREE.Vector3} v2 - vector
 * @returns {boolean} - true when they are inverse of each other
 * @private
 */
function isInverseVectorsWithPrecision(v1, v2) {
  return Math.abs(v1.x + v2.x) <= SNAP_PRECISION &&
  Math.abs(v1.y + v2.y) <= SNAP_PRECISION &&
  Math.abs(v1.z + v2.z) <= SNAP_PRECISION;
}

/**
 * @param {THREE.Vector3} point - Point 
 * @param {THREE.Vector3} lineStart - Start of the line
 * @param {THREE.Vector3} lineEnd - End of the line
 * @returns {number} - distance from point to the line
 * @private
 */
function distancePointToLine(point, lineStart, lineEnd) {

  if (lineStart.equals(lineEnd)) {// Degenerate line
    return point.distanceTo(lineStart);
  }

  var X0 = new THREE.Vector3();
  var X1 = new THREE.Vector3();
  var distance;
  var param;

  X0.subVectors(lineStart, point);
  X1.subVectors(lineEnd, lineStart);
  param = X0.dot(X1);
  X0.subVectors(lineEnd, lineStart);
  param = -param / X0.dot(X0);

  if (param < 0) {
    distance = point.distanceTo(lineStart);
  } else if (param > 1) {
    distance = point.distanceTo(lineEnd);
  } else {
    X0.subVectors(point, lineStart);
    X1.subVectors(point, lineEnd);
    X0.cross(X1);
    X1.subVectors(lineEnd, lineStart);

    distance = Math.sqrt(X0.dot(X0)) / Math.sqrt(X1.dot(X1));
  }

  return distance;
}

var SnapCandidateType = {
  Unknown: 0,
  Line: 1,
  CircularArc: 2,
  EllipticalArc: 3 };


// A SnapCandidate references a single segment (line or arc) that we could snap to.
var SnapCandidate = /*#__PURE__*/function () {
  function SnapCandidate(viewportId) {_classCallCheck(this, SnapCandidate);

    this.type = SnapCandidateType.Unknown;
    this.viewportId = viewportId;

    // 2d distance between original (unsnapped) position and the geometry of this candidate.
    this.distance = 0;

    // {Vector2} Start/Endpoint - only for line segments
    this.lineStart = null;
    this.lineEnd = null;

    // Fixed radius - only for CircularArcs
    this.radius = 0;

    // Separate radii - only for ellipse arcs
    this.radiusX = 0; // = major radius - by convention
    this.radiusY = 0;

    // Center point as Vector2 (for arcs)
    this.center = null;

    // Start/end angle for arcs: Ccw angle in radians. Angle 0 corresponds to direction x+.
    this.startAngle = 0;
    this.endAngle = 0;
  }_createClass(SnapCandidate, [{ key: "fromLine", value:

    function fromLine(p1, p2) {
      this.type = SnapCandidateType.Line;
      this.lineStart = p1.clone();
      this.lineEnd = p2.clone();
      return this;
    } }, { key: "fromCircularArc", value:

    function fromCircularArc(center, radius, start, end) {
      this.type = SnapCandidateType.CircularArc;
      this.center = center.clone();
      this.radius = radius;
      this.start = start;
      this.end = end;
      return this;
    } }, { key: "fromEllipticalArc", value:

    function fromEllipticalArc(center, radiusX, radiusY, start, end) {
      this.type = SnapCandidateType.EllipticalArc;
      this.center = center.clone();
      this.radiusX = radiusX;
      this.radiusY = radiusY;
      this.start = start;
      this.end = end;
      return this;
    } }, { key: "isLine", value:

    function isLine() {return this.type === SnapCandidateType.Line;} }, { key: "isCircularArc", value:
    function isCircularArc() {return this.type === SnapCandidateType.CirularArc;} }, { key: "isEllipticalArc", value:
    function isEllipticalArc() {return this.type === SnapCandidateType.EllipticalArc;}

    // Checks if the snapGeometry of this candidate intersects with another one.
    //  @param {SnapCandidate} other
    //  @param {Vector2} [optionalTarget]
    //  @returns {THREE.Vector2|null} Returns intersection point if there is one.
  }, { key: "getIntersection", value: function getIntersection(other, optionalTarget) {

      if (this.isLine() && other.isLine()) {
        // Note: We do the intersections on the whole line - not just the intersections.
        // Reason is:
        //  a) Otherwise, it would not snap if you are slightly outline of one line segment
        //  b) By definition, we get only very close segment candidates anyway
        return (0,_SnapMath_js__WEBPACK_IMPORTED_MODULE_1__.intersectLines)(this.lineStart, this.lineEnd, other.lineStart, other.lineEnd, false, optionalTarget);
      }

      // TODO: Currently, we only support snapping to line-line intersections
    } }]);return SnapCandidate;}();


// Checks if we can snap to an intersection of two close segments (each can be a line or arcs).
//  @param {SnapCandidate[]} candidates     - Snap candidate geometries collected in GeometryCallback. Assumed to be within snapRadius.
//  @param {TREE.Vector3}    intersectPoint - Unsnapped original position
//  @param {number}          snapRadius
//  @returns {Object|null} If an intersection snap is found, the result contains:
//                    {
//                        viewportId  // number
//                        snapPoint   // (THREE.Vector3)
//                    }
var findIntersectionSnap = function findIntersectionSnap(candidates, intersectPoint, snapRadius) {

  // Sort snapping candidates by increasing distance
  // Strictly speaking, we just need the best two ones. But the number of candidates within the snapping
  // distance is generally small anyway - and working with a sorted array is more flexible to incrementally
  // make the snapping smarter later.
  var byDistance = function byDistance(ca, cb) {return ca.distance - cb.distance;};
  candidates.sort(byDistance);

  // Stop here if we don't have enough candidates for an intersection
  if (candidates.length < 2) {
    return null;
  }

  // Init result object
  var result = {
    // Just use the one of the first candidate. There is no unique viewportId when using an intersection.
    viewportId: candidates[0].viewportId,

    // Snapping happens in 2d - so we set z in advance and just keep the original value.
    // Note: Snapper generally needs some revision if we use it for planes that are not perpendicular to the viewing direction.
    snapPoint: new THREE.Vector3(0, 0, intersectPoint.z) };


  // Check for any candidate that intersects with the closest one we found
  var first = candidates[0];
  for (var i = 1; i < candidates.length; i++) {
    var second = candidates[i];

    // Do intersection test. If found, write it to result.snapPoint
    var found = first.getIntersection(second, result.snapPoint);
    if (!found) {
      continue;
    }

    // We found an intersection. Although we assume all candidates to be within
    // snap radius already, the intersection may still be somewhere else.
    // => Check if intersection is still within the snapRadius.
    var dist = THREE.Vector2.prototype.distanceTo.call(result.snapPoint, intersectPoint);
    if (dist < snapRadius) {
      // We found a valid intersection snap
      return result;
    }
  }
  return null;
};


/**
 * A tool that lets users attach pointer events to vertices and edges. It supports 2D and 3D models.
 *
 * @param {Viewer3D} viewer - Viewer instance
 * @param {object} options - Configurations for the extension
 * @memberof Autodesk.Viewing.Extensions.Snapping
 * @alias Autodesk.Viewing.Extensions.Snapping.Snapper
 * @class
 */
function Snapper(viewer, options) {

  var _snapResult = new SnapResult();

  var _viewer = viewer;
  this.setGlobalManager(viewer.globalManager);

  var _options = options || {};
  var _names;

  if (_options.markupMode) {
    _names = ["snapper-markup"];
  } else if (_options.toolName) {
    // Allow tools to use their own snapper
    _names = [_options.toolName];
  } else {
    _names = ["snapper"];
  }

  var _priority = 60;

  var _active = false;

  var _distanceToEdge = Number.MAX_VALUE;
  var _distanceToVertex = null;

  var _isDragging = false;
  var _isPressing = false;
  var _isSnapped = false;

  var _forcedVpId = null; // the viewport index of the first selection for 2D

  var _snapToPixel = false;

  var _snapFilter = null; // Optional snapping filter, based on snapResult. (snapResult) => boolean.

  this.indicator = new _SnapperIndicator_js__WEBPACK_IMPORTED_MODULE_0__.SnapperIndicator(viewer, this);

  this.markupMode = _options.markupMode;
  this.renderSnappedGeometry = _options.renderSnappedGeometry;
  this.renderSnappedTopology = _options.renderSnappedTopology;

  //Notice: The pixelSize should correspond to the amount of pixels per line in idAtPixels, the shape of
  //detection area is square in idAtPixels, but circle in snapper, should make their areas match roughly.
  this.detectRadiusInPixels = av.isMobileDevice() ? 50 : 10;

  /**
   * @returns {boolean} true when the tool is active
   *
   * @alias Autodesk.Viewing.Extensions.Snapping.Snapper#isActive
   */
  this.isActive = function () {
    return _active;
  };

  this.getNames = function () {
    return _names;
  };

  this.getName = function () {
    return _names[0];
  };

  this.getPriority = function () {
    return _priority;
  };

  /**
   * Starts intercepting pointer events.
   * Invoked automatically by the {@link ToolController}.
   *
   * @alias Autodesk.Viewing.Extensions.Snapping.Snapper#activate
   */
  this.activate = function () {
    _active = true;

    if (this.indicator.isNull()) {
      this.indicator = new _SnapperIndicator_js__WEBPACK_IMPORTED_MODULE_0__.SnapperIndicator(viewer, this);
    }
  };


  /**
   * Stops intercepting pointer events.
   * Invoked automatically by the {@link ToolController}.
   *
   * @alias Autodesk.Viewing.Extensions.Snapping.Snapper#deactivate
   */
  this.deactivate = function () {
    _active = false;

    if (!this.indicator.isNull()) {
      this.indicator.destroy();
      this.indicator = new _SnapperIndicator_js__WEBPACK_IMPORTED_MODULE_0__.NullSnapperIndicator();
    }
  };

  this.copyResults = function (destiny) {
    _snapResult.copyTo(destiny);
  };

  this.getEdge = function () {
    return _snapResult.geomEdge;
  };

  this.getVertex = function () {
    return _snapResult.geomVertex;
  };

  this.getGeometry = function () {
    return _snapResult.getGeometry();
  };

  this.getGeometryType = function () {
    return _snapResult.geomType;
  };

  this.getIntersectPoint = function () {
    return _snapResult.intersectPoint;
  };


  /**
   * @returns {SnapResult} The snapping status of the last pointer event performed.
   *
   * @alias Autodesk.Viewing.Extensions.Snapping.Snapper#getSnapResult
   */
  this.getSnapResult = function () {
    return _snapResult;
  };

  /**
   * Checks whether the tool's last update resulted on a snap.
   *
   * @returns {boolean} true when the last pointer event got snapped.
   *
   * @alias Autodesk.Viewing.Extensions.Snapping.Snapper#isSnapped
   */
  this.isSnapped = function () {
    return _isSnapped;
  };

  this.clearSnapped = function () {
    _snapResult.clear();
    _isSnapped = false;
  };

  this.setViewportId = function (vpId) {
    _forcedVpId = vpId;
  };

  this.setSnapToPixel = function (enable) {
    _snapToPixel = enable;
  };

  this.getSnapToPixel = function () {
    return _snapToPixel;
  };

  this.setSnapToArc = function (enable) {
    _snapResult.snapToArc = enable;
  };

  this.getSnapToArc = function () {
    return _snapResult.snapToArc;
  };

  this.setArc = function (isArc) {
    _snapResult.isArc = isArc;
  };

  this.getArc = function () {
    return _snapResult.isArc;
  };

  this.setSnapFilter = function (filter) {
    _snapFilter = filter;
  };

  /**
   * 3D Snapping
   *
   * @param result -Result of Hit Test.
   */
  this.snapping3D = function (result) {

    _snapResult.snapNode = result.dbId;
    _snapResult.intersectPoint = result.intersectPoint;
    _snapResult.modelId = result.model ? result.model.id : null;

    var face = result.face;

    if (!result.model || result.fragId === undefined) {
      // some non-model geometry was hit
      if (result.object instanceof THREE.Mesh) {
        // if it was a mesh, try to snap to it
        this.meshSnapping(face, result.object);
      }
    } else {
      var fragIds;

      if (result.fragId.length === undefined) {
        fragIds = [result.fragId];
      } else {
        fragIds = result.fragId;
      }

      // This is for Fusion model with topology data
      _snapResult.hasTopology = result.model.hasTopology();
      if (_snapResult.hasTopology) {
        this.snapping3DwithTopology(face, fragIds, result.model);
      } else {
        this.snapping3DtoMesh(face, fragIds, result.model);
      }
    }
  };


  /**
   * Returns a function that sets a vertex (Vector3 or LmvVector3) to the data read from a vertex buffer at idx
   * Signature: func(idx, vertex) -> vertex
   *            if vertex is null/undefined, a new THREE.Vector3 is created
   *
   * @param geometry - the geometry of mesh
   *
   * @private
   */

  this.makeReadVertexFunc = function (geometry) {
    var attributes = geometry.attributes;
    var positions = geometry.vb ? geometry.vb : attributes.position.array;
    var stride = geometry.vb ? geometry.vbstride : 3;

    // Get the offset to positions in the buffer. Be careful, 2D buffers
    // don't use the 'position' attribute for positions. Reject those.
    // meshes use vblayout for describing the buffer structure, BufferGeometry uses attributes.xx
    var poffset;
    if (geometry.vblayout) {
      if (!geometry.vblayout.position) {
        return function () {}; // No positions, what to do??
      }
      poffset = geometry.vblayout.position.offset;
    } else if (!attributes.position) {
      return function () {}; // No positions, what to do??
    } else {
      poffset = attributes.position.itemOffset || 0;
    }

    return function (idx, v) {
      var p = idx * stride + poffset;
      v = v || new THREE.Vector3();
      v.set(
      positions[p],
      positions[p + 1],
      positions[p + 2]);

      return v;
    };
  };

  /**
   * Snapping order is: 1st vertices, 2nd edges, 3rd and final faces.
   *
   * @param face
   * @param fragIds
   * @param model
   * @private
   */
  this.snapping3DwithTopology = function (face, fragIds, model) {

    // Because edge topology data may be in other fragments with same dbId, need to iterate all of them.
    if (_snapResult.snapNode) {
      fragIds = [];

      model.getData().instanceTree.enumNodeFragments(_snapResult.snapNode, function (fragId) {
        fragIds.push(fragId);
      }, true);
    }

    _snapResult.geomFace = _snapResult.geomEdge = _snapResult.geomVertex = null;
    _distanceToEdge = Number.MAX_VALUE;

    for (var fi = 0; fi < fragIds.length; ++fi) {

      var fragId = fragIds[fi];
      var mesh = _viewer.impl.getRenderProxy(model, fragId);
      var geometry = mesh.geometry;

      var topoIndex = model.getTopoIndex(fragId);
      var topology = model.getTopology(topoIndex);
      var facesTopology = topology.faces;
      var edgesTopology = topology.edges;

      if (!_snapResult.geomFace) {
        _snapResult.geomFace = this.faceSnappingWithTopology(face, geometry, facesTopology, mesh);

        if (_snapResult.geomFace) {
          _snapResult.geomFace.fragId = fragId;
        }

        var normalMatrix = new THREE.Matrix3().getNormalMatrix(mesh.matrixWorld);
        _snapResult.faceNormal = face.normal.applyMatrix3(normalMatrix).normalize();
      }

      // Need to iterate all frags with same dbId, because when meshes are attached with each other, 
      // edge-topology data will only be on one mesh.
      this.edgeSnappingWithTopology(_snapResult.intersectPoint, geometry, edgesTopology, mesh);

    }

    _snapResult.geomVertex = this.vertexSnappingWithTopology(_snapResult.geomEdge, _snapResult.intersectPoint);

    if (_snapResult.geomFace) {

      // Determine which one should be drawn: face , edge or vertex
      _snapResult.radius = this.setDetectRadius(_snapResult.intersectPoint);

      if ((_options.forceSnapVertices || _distanceToVertex < _snapResult.radius) && _snapResult.geomVertex) {
        _snapResult.geomType = SnapType.SNAP_VERTEX;
      } else
      if ((_options.forceSnapEdges || _distanceToEdge < _snapResult.radius) && _snapResult.geomEdge) {

        var center = this.edgeIsCircle(_snapResult.geomEdge);
        if (center) {
          _snapResult.circularArcCenter = center;
          _snapResult.circularArcRadius = center.distanceTo(_snapResult.geomEdge.vertices[0]);
          _snapResult.geomEdge.center = _snapResult.circularArcCenter;
          _snapResult.geomEdge.radius = _snapResult.circularArcRadius;
          _snapResult.geomType = SnapType.SNAP_CIRCULARARC;
        } else
        if (this.edgeIsCurved(_snapResult.geomEdge)) {
          _snapResult.geomType = SnapType.SNAP_CURVEDEDGE;
        } else
        {
          _snapResult.geomType = SnapType.SNAP_EDGE;
        }

      } else
      {

        if (this.faceIsCurved(_snapResult.geomFace)) {
          _snapResult.geomType = SnapType.SNAP_CURVEDFACE;
        } else
        {
          _snapResult.geomType = SnapType.SNAP_FACE;
        }

      }

      _isSnapped = true;
    }
  };

  this.meshSnapping = function (face, mesh) {
    var geometry = mesh.geometry;

    // Handle 3D line geometry
    var isLine = mesh.isLine || mesh.isWideLine;
    if (isLine && face) {

      // For line meshes, face is a line {a, b} instead of a Face3 instance (see lineRayCast(..) in VBIntersector.js,
      // where a, b are vertex indices into the line mesh vertex array.
      //
      // Note: Unlike edge intersection for faces, we just use the line segment itself and don't search for topology
      //       of connected line segments to identify polylines as one item. If we need this, we have to add the corresponding code first.
      _snapResult.geomEdge = this.extractLineGeometry(face, geometry);
      _snapResult.geomEdge.applyMatrix4(mesh.matrixWorld);

      _snapResult.geomVertex = this.vertexSnapping(_snapResult.geomEdge, _snapResult.intersectPoint);

      _snapResult.radius = this.setDetectRadius(_snapResult.intersectPoint);

      // Determine which one should be drawn: edge or vertex
      if (_options.forceSnapVertices || _distanceToVertex < _snapResult.radius) {
        _snapResult.geomType = SnapType.SNAP_VERTEX;
      } else
      {
        // Note: Since we got the edge as hit result, we can already assume the intersection to be close to the line.
        _snapResult.geomType = SnapType.SNAP_EDGE;
      }

      _isSnapped = true;
      return true;
    }

    // Note that face may also be a line {a, b} (see lineRayCast(..) in VBIntersector.js
    if (face instanceof THREE.Face3) {
      _snapResult.geomFace = this.faceSnapping(face, geometry);
    }

    if (!_snapResult.geomFace)
    return false;

    _snapResult.geomFace.applyMatrix4(mesh.matrixWorld);
    _snapResult.geomEdge = this.edgeSnapping(_snapResult.geomFace, _snapResult.intersectPoint);
    _snapResult.geomVertex = this.vertexSnapping(_snapResult.geomEdge, _snapResult.intersectPoint);

    var normalMatrix = new THREE.Matrix3().getNormalMatrix(mesh.matrixWorld);
    _snapResult.faceNormal = face.normal.applyMatrix3(normalMatrix).normalize();

    _snapResult.radius = this.setDetectRadius(_snapResult.intersectPoint);

    // Determine which one should be drawn: face, edge or vertex
    if (_options.forceSnapVertices || _distanceToVertex < _snapResult.radius) {
      _snapResult.geomType = SnapType.SNAP_VERTEX;
    } else
    if (_options.forceSnapEdges || _distanceToEdge < _snapResult.radius) {
      _snapResult.geomType = SnapType.SNAP_EDGE;
    } else
    {
      _snapResult.geomType = SnapType.SNAP_FACE;
    }

    _isSnapped = true;
    return true;
  };

  this.snapping3DtoMesh = function (face, fragIds, model) {
    for (var fi = 0; fi < fragIds.length; ++fi) {

      var fragId = fragIds[fi];
      var mesh = _viewer.impl.getRenderProxy(model, fragId);

      if (this.meshSnapping(face, mesh)) {
        break;
      }
    }
  };

  this.faceSnappingWithTopology = function (face, geometry, facesTopology, mesh) {

    var vA = new THREE.Vector3();
    var vB = new THREE.Vector3();
    var vC = new THREE.Vector3();

    var geom = new THREE.Geometry();

    if (geometry.index !== undefined) {

      // Find the index of face topology list which includes the intersect face(triangle)
      for (var i = 0; i < facesTopology.length; i++) {

        var indexList = facesTopology[i].indexList;
        var faceId = facesTopology[i].id;
        var j = 0;
        for (; j < indexList.length; j += 3) {

          if (face.a === indexList[j]) {
            if (face.b === indexList[j + 1] && face.c === indexList[j + 2] || face.b === indexList[j + 2] && face.c === indexList[j + 1]) {
              break;
            }
          } else
          if (face.a === indexList[j + 1]) {
            if (face.b === indexList[j] && face.c === indexList[j + 2] || face.b === indexList[j + 2] && face.c === indexList[j]) {
              break;
            }
          } else
          if (face.a === indexList[j + 2]) {
            if (face.b === indexList[j] && face.c === indexList[j + 1] || face.b === indexList[j + 1] && face.c === indexList[j]) {
              break;
            }
          }
        }

        if (j < indexList.length) {
          break;
        }
      }

      if (i < facesTopology.length) {

        var readVertex = this.makeReadVertexFunc(geometry);

        for (var _j = 0; _j < indexList.length; _j += 3) {
          readVertex(indexList[_j], vA);
          readVertex(indexList[_j + 1], vB);
          readVertex(indexList[_j + 2], vC);

          var vIndex = geom.vertices.length;

          geom.vertices.push(vA.clone());
          geom.vertices.push(vB.clone());
          geom.vertices.push(vC.clone());

          geom.faces.push(new THREE.Face3(vIndex, vIndex + 1, vIndex + 2));
        }
      }
    }

    if (geom.vertices.length > 0) {

      geom.faceId = faceId;
      geom.applyMatrix4(mesh.matrixWorld);
      return geom;
    } else
    {

      return null;
    }

  };

  /**
   * Find the closest face next to the cast ray
   *
   * @param {THREE.Face3} face - the intersect triangle of Hit Test.
   * @param geometry - the geometry of mesh
   *
   * @private
   */
  this.faceSnapping = function (face, geometry) {

    var vA = new THREE.Vector3();
    var vB = new THREE.Vector3();
    var vC = new THREE.Vector3();

    var geom = new THREE.Geometry(); //Geometry which includes all the triangles on the same plane.

    var indices = geometry.index && (geometry.index.array || geometry.ib);
    var offsets = geometry.groups;

    if (!offsets || offsets.length === 0) {

      var positions = geometry.vb ? geometry.vb : geometry.attributes.position.array;
      offsets = [{ start: 0, count: indices ? indices.length : positions.length, index: 0 }];

    }

    var readVertex = this.makeReadVertexFunc(geometry);

    var va = readVertex(face.a);

    for (var oi = 0; oi < offsets.length; ++oi) {

      var start = offsets[oi].start;
      var count = offsets[oi].count;
      var index = offsets[oi].index;

      for (var i = start; i < start + count; i += 3) {

        var a = index + (indices ? indices[i] : i);
        var b = index + (indices ? indices[i + 1] : i + 1);
        var c = index + (indices ? indices[i + 2] : i + 2);

        readVertex(a, vA);
        readVertex(b, vB);
        readVertex(c, vC);

        var faceNormal = new THREE.Vector3();
        THREE.Triangle.getNormal(vA, vB, vC, faceNormal);

        if (isEqualVectorsWithPrecision(faceNormal, face.normal) && isEqualWithPrecision(faceNormal.dot(vA), face.normal.dot(va)))
        {

          var vIndex = geom.vertices.length;

          geom.vertices.push(vA.clone());
          geom.vertices.push(vB.clone());
          geom.vertices.push(vC.clone());

          geom.faces.push(new THREE.Face3(vIndex, vIndex + 1, vIndex + 2));

        }
      }
    }

    if (geom.vertices.length > 0) {

      return this.getTrianglesOnSameFace(geom, face, readVertex);
    } else
    {

      return null;
    }
  };

  /**
   * Find triangles on the same face with the triangle intersected with the cast ray
   *
   * @param geom -Geometry which includes all the triangles on the same plane.
   * @param face -Triangle which intersects with the cast ray.
   * @param readVertexCB -Accessor function to read vertex data (see makeReadVertexFunc)
   *
   * @private
   */
  this.getTrianglesOnSameFace = function (geom, face, readVertexCB) {

    var isIncludeFace = false; // Check if the intersect face is in the mesh
    var vertexIndices = geom.vertices.slice();

    var va = readVertexCB(face.a);
    var vb = readVertexCB(face.b);
    var vc = readVertexCB(face.c);

    var intersectFace = new THREE.Geometry();
    intersectFace.vertices.push(va);
    intersectFace.vertices.push(vb);
    intersectFace.vertices.push(vc);
    intersectFace.faces.push(new THREE.Face3(0, 1, 2));

    var vCount = [];

    do {

      vCount = [];

      for (var j = 0; j < vertexIndices.length; j += 3) {

        // The triangle which is intersected with the ray
        if (vertexIndices[j].equals(va) && vertexIndices[j + 1].equals(vb) && vertexIndices[j + 2].equals(vc)) {

          isIncludeFace = true;
          vCount.push(j);
          continue;
        }

        for (var k = 0; k < intersectFace.vertices.length; k += 3) {

          // The triangles which are on the same face with the intersected triangle
          if (this.trianglesSharedEdge(vertexIndices[j], vertexIndices[j + 1], vertexIndices[j + 2],
          intersectFace.vertices[k], intersectFace.vertices[k + 1], intersectFace.vertices[k + 2])) {

            var vIndex = intersectFace.vertices.length;
            intersectFace.vertices.push(vertexIndices[j].clone());
            intersectFace.vertices.push(vertexIndices[j + 1].clone());
            intersectFace.vertices.push(vertexIndices[j + 2].clone());
            intersectFace.faces.push(new THREE.Face3(vIndex, vIndex + 1, vIndex + 2));

            vCount.push(j);
            break;
          }
        }
      }

      for (var ci = vCount.length - 1; ci >= 0; --ci) {

        vertexIndices.splice(vCount[ci], 3);

      }

    } while (vCount.length > 0);

    if (isIncludeFace) {
      return intersectFace;
    } else
    {
      return null;
    }

  };

  /**
   * Check if the two triangle share edge, the inputs are their vertices
   *
   * @param a1
   * @param a2
   * @param a3
   * @param b1
   * @param b2
   * @param b3
   * @private
   */
  this.trianglesSharedEdge = function (a1, a2, a3, b1, b2, b3) {

    var c1 = false;
    var c2 = false;
    var c3 = false;

    if (a1.equals(b1) || a1.equals(b2) || a1.equals(b3)) {
      c1 = true;
    }
    if (a2.equals(b1) || a2.equals(b2) || a2.equals(b3)) {
      c2 = true;
    }
    if (a3.equals(b1) || a3.equals(b2) || a3.equals(b3)) {
      c3 = true;
    }

    if (c1 & c2 || c1 & c3 || c2 & c3) {
      return true;
    }

    return false;
  };

  this.edgeSnappingWithTopology = function (intersectPoint, geometry, edgesTopology, mesh) {

    var edgeGeom = new THREE.Geometry();
    var minDistTopoIndex;
    var minDist = Number.MAX_VALUE;

    var vA = new THREE.Vector3();
    var vB = new THREE.Vector3();

    if (geometry.index !== undefined && edgesTopology != undefined) {

      var readVertex = this.makeReadVertexFunc(geometry);

      // Find the index of edge topology list which includes the nearest edge segment to the intersect point
      for (var i = 0; i < edgesTopology.length; i++) {

        var indexList = edgesTopology[i].indexList;
        // In edges topology index list the type is LineStrip
        for (var j = 0; j < indexList.length - 1; j++) {
          readVertex(indexList[j], vA);
          readVertex(indexList[j + 1], vB);

          vA.applyMatrix4(mesh.matrixWorld);
          vB.applyMatrix4(mesh.matrixWorld);

          var dist = distancePointToLine(intersectPoint, vA, vB);
          if (dist < minDist) {
            minDist = dist;
            minDistTopoIndex = i;
          }
        }
      }

      if (minDistTopoIndex) {
        indexList = edgesTopology[minDistTopoIndex].indexList;
        for (var k = 0; k < indexList.length - 1; k++) {
          var vK0 = readVertex(indexList[k]);
          var vK1 = readVertex(indexList[k + 1]);

          edgeGeom.vertices.push(vK0);
          // To make the line's type to LinePieces which is used by drawLine function
          edgeGeom.vertices.push(vK1);
        }
      }
    }

    if (_distanceToEdge >= minDist && edgeGeom.vertices.length > 0) {

      _distanceToEdge = minDist;
      edgeGeom.applyMatrix4(mesh.matrixWorld);
      _snapResult.geomEdge = edgeGeom;
    }
  };

  /**
   * Get Edge geometry for the case that the hittest result contained a 3D lines. For this case, we have no Face3, so
   * that faceSnapping and edgeSnapping don't work.
   * 
   *  @param {Object}         edge     - {a, b} with vertex indices a,b of lineStart/lineEnd vertex
   *  @param {GeometryBuffer} geometry
   *  @returns {EdgeGeometry} Geometry with simple line
   */
  this.extractLineGeometry = function (edge, geometry) {

    var readVertex = this.makeReadVertexFunc(geometry);
    var va = readVertex(edge.a);
    var vb = readVertex(edge.b);

    var edgeGeom = new THREE.Geometry();
    edgeGeom.vertices.push(va, vb);
    return edgeGeom;
  };

  /**
   * Find the closest edge next to the intersect point
   *
   * @param face -Face which is found by faceSnapping.
   * @param intersectPoint -IntersectPoint between cast ray and face.
   *
   * @private
   */
  this.edgeSnapping = function (face, intersectPoint) {

    var lineGeom = new THREE.Geometry();
    var isEdge_12 = true;
    var isEdge_13 = true;
    var isEdge_23 = true;

    for (var i = 0; i < face.vertices.length; i += 3) {

      for (var j = 0; j < face.vertices.length; j += 3) {

        if (i !== j) {
          // Check edge 12
          if ((face.vertices[i].equals(face.vertices[j]) || face.vertices[i].equals(face.vertices[j + 1]) ||
          face.vertices[i].equals(face.vertices[j + 2])) && (
          face.vertices[i + 1].equals(face.vertices[j]) || face.vertices[i + 1].equals(face.vertices[j + 1]) ||
          face.vertices[i + 1].equals(face.vertices[j + 2]))) {

            isEdge_12 = false;

          }
          // Check edge 13
          if ((face.vertices[i].equals(face.vertices[j]) || face.vertices[i].equals(face.vertices[j + 1]) ||
          face.vertices[i].equals(face.vertices[j + 2])) && (
          face.vertices[i + 2].equals(face.vertices[j]) || face.vertices[i + 2].equals(face.vertices[j + 1]) ||
          face.vertices[i + 2].equals(face.vertices[j + 2]))) {

            isEdge_13 = false;

          }
          // Check edge 23
          if ((face.vertices[i + 1].equals(face.vertices[j]) || face.vertices[i + 1].equals(face.vertices[j + 1]) ||
          face.vertices[i + 1].equals(face.vertices[j + 2])) && (
          face.vertices[i + 2].equals(face.vertices[j]) || face.vertices[i + 2].equals(face.vertices[j + 1]) ||
          face.vertices[i + 2].equals(face.vertices[j + 2]))) {

            isEdge_23 = false;

          }
        }
      }

      if (isEdge_12) {

        lineGeom.vertices.push(face.vertices[i].clone());
        lineGeom.vertices.push(face.vertices[i + 1].clone());

      }
      if (isEdge_13) {

        lineGeom.vertices.push(face.vertices[i].clone());
        lineGeom.vertices.push(face.vertices[i + 2].clone());

      }
      if (isEdge_23) {

        lineGeom.vertices.push(face.vertices[i + 1].clone());
        lineGeom.vertices.push(face.vertices[i + 2].clone());

      }

      isEdge_12 = true;
      isEdge_13 = true;
      isEdge_23 = true;

    }

    //return lineGeom;

    var edgeGeom = new THREE.Geometry();
    var minDistIndex;
    var minDist = Number.MAX_VALUE;

    for (var k = 0; k < lineGeom.vertices.length; k += 2) {

      var dist = distancePointToLine(intersectPoint, lineGeom.vertices[k], lineGeom.vertices[k + 1]);

      if (dist < minDist) {
        minDist = dist;
        minDistIndex = k;
      }

    }

    edgeGeom.vertices.push(lineGeom.vertices[minDistIndex].clone());
    edgeGeom.vertices.push(lineGeom.vertices[minDistIndex + 1].clone());

    edgeGeom.vertices = this.getConnectedLineSegmentsOnSameLine(lineGeom, edgeGeom.vertices);

    _distanceToEdge = minDist;

    return edgeGeom;

  };

  this.getConnectedLineSegmentsOnSameLine = function (lineGeom, edgeVertices) {

    var vertices = lineGeom.vertices.slice();
    var va = edgeVertices[0];
    var vb = edgeVertices[1];

    var vCount = [];

    do {

      vCount = [];

      for (var j = 0; j < vertices.length; j += 2) {

        // The line which has min distance to intersection point
        if (vertices[j].equals(va) && vertices[j + 1].equals(vb)) {

          continue;
        }

        for (var k = 0; k < edgeVertices.length; k += 2) {

          // The line segments which are connected on the same line
          if (vertices[j].equals(edgeVertices[k]) || vertices[j + 1].equals(edgeVertices[k]) ||
          vertices[j].equals(edgeVertices[k + 1]) || vertices[j + 1].equals(edgeVertices[k + 1])) {

            var V0 = new THREE.Vector3();
            var V1 = new THREE.Vector3();

            V0.subVectors(edgeVertices[k], edgeVertices[k + 1]);
            V0.normalize();
            V1.subVectors(vertices[j], vertices[j + 1]);
            V1.normalize();

            //if (V0.equals(V1) || V0.equals(V1.negate())) {
            if (isEqualVectorsWithPrecision(V0, V1) || isInverseVectorsWithPrecision(V0, V1))
            {

              vCount.push(j);
              break;

            }
          }
        }
      }

      for (var ci = vCount.length - 1; ci >= 0; --ci) {

        edgeVertices.push(vertices[vCount[ci]]);
        edgeVertices.push(vertices[vCount[ci] + 1]);
        vertices.splice(vCount[ci], 2);

      }

    } while (vCount.length > 0);

    return edgeVertices;

  };

  this.vertexSnappingWithTopology = function (edge, intersectPoint) {

    var minDist = Number.MAX_VALUE;
    var point = new THREE.Vector3();

    if (edge && edge.vertices.length > 1) {
      var dist1 = intersectPoint.distanceTo(edge.vertices[0]);
      var dist2 = intersectPoint.distanceTo(edge.vertices[edge.vertices.length - 1]);

      if (dist1 <= dist2) {
        minDist = dist1;
        point = edge.vertices[0].clone();
      } else
      {
        minDist = dist2;
        point = edge.vertices[edge.vertices.length - 1].clone();
      }
    }

    _distanceToVertex = minDist;

    return point;
  };

  /**
   * Find the closest vertex next to the intersect point
   *
   * @param edge -Edge which is found by edgeSnapping.
   * @param intersectPoint -IntersectPoint between cast ray and face.
   *
   * @private
   */
  this.vertexSnapping = function (edge, intersectPoint) {

    var minDist = Number.MAX_VALUE;
    var point = new THREE.Vector3();

    for (var i = 0; i < edge.vertices.length; ++i) {

      var dist = intersectPoint.distanceTo(edge.vertices[i]);

      if (dist < minDist - SNAP_PRECISION) {

        minDist = dist;
        point = edge.vertices[i].clone();

      }
    }

    _distanceToVertex = minDist;

    return point;
  };

  // This is only a workaround to detect if an edge is circle
  this.edgeIsCircle = function (edge) {

    var vertices = edge.vertices;

    // Exclude squares and regular polygons
    if (vertices.length < 8) {
      return false;
    }

    if (vertices[0].equals(vertices[vertices.length - 1])) {

      var center = new THREE.Vector3(0, 0, 0);
      for (var i = 0; i < vertices.length; i += 2) {
        center.add(vertices[i]);
      }
      center.divideScalar(vertices.length / 2.0);

      var radius = center.distanceTo(vertices[0]);
      for (var _i = 0; _i < vertices.length; _i += 2) {
        if (Math.abs(center.distanceTo(vertices[_i]) - radius) <= SNAP_PRECISION) {
          continue;
        } else
        {
          return false;
        }
      }
      return center;
    } else
    {
      return false;
    }
  };

  this.edgeIsCurved = function (edge) {

    var vertices = edge.vertices;

    if (vertices.length <= 2) {
      return false;
    } else
    if (vertices[0].equals(vertices[vertices.length - 1])) {
      return true;
    } else
    {
      var V1 = new THREE.Vector3();
      V1.subVectors(vertices[0], vertices[1]);

      var V2 = new THREE.Vector3();
      for (var i = 2; i < vertices.length; i += 2) {
        V2.subVectors(vertices[i], vertices[i + 1]);
        if (!isEqualVectorsWithPrecision(V1, V2)) {
          return true;
        }
      }

      return false;
    }
  };

  this.faceIsCurved = function (face) {

    var vertices = face.vertices;
    var faces = face.faces;

    if (faces.length <= 1) {
      return false;
    } else
    {
      var fN1 = new THREE.Vector3();
      THREE.Triangle.getNormal(vertices[faces[0].a], vertices[faces[0].b], vertices[faces[0].c], fN1);
      var vA1 = vertices[faces[0].a];

      var fN2 = new THREE.Vector3();
      for (var i = 1; i < faces.length; i++) {
        THREE.Triangle.getNormal(vertices[faces[i].a], vertices[faces[i].b], vertices[faces[i].c], fN2);
        var vA2 = vertices[faces[i].a];

        if (!isEqualVectorsWithPrecision(fN1, fN2) || !isEqualWithPrecision(fN1.dot(vA1), fN2.dot(vA2))) {
          return true;
        }
      }

      return false;
    }
  };

  this.angleVector2 = function (vector) {

    if (vector.x > 0 && vector.y >= 0) {
      return Math.atan(vector.y / vector.x);
    } else
    if (vector.x >= 0 && vector.y < 0) {
      return Math.atan(vector.y / vector.x) + Math.PI * 2;
    } else
    if (vector.x < 0 && vector.y <= 0) {
      return Math.atan(vector.y / vector.x) + Math.PI;
    } else
    if (vector.x <= 0 && vector.y > 0) {
      return Math.atan(vector.y / vector.x) + Math.PI;
    } else
    {// x = 0, y = 0
      return null;
    }
  };

  // Creates a THREE.Geometry that represents an approximation of a given elliptical arc in {z=0} plane.
  // Points are obtained by by uniform sampling of a given elliptical arc.
  //  @param {number} numPoints - The length number of points that the output geometry will contain. segments in which we subdivide the arc. Resulting point count is numSegments+1.
  // See getEllipseArcPoint() for param details.
  var createEllipticalArcGeometry = function createEllipticalArcGeometry(cx, cy, rx, ry, startAngle, endAngle, numPoints) {
    var geometry = new THREE.Geometry();
    for (var i = 0; i < numPoints; i++) {
      var p = new THREE.Vector3(0, 0, 0);
      var t = i / (numPoints - 1);
      Autodesk.Extensions.CompGeom.getEllipseArcPoint(t, cx, cy, rx, ry, startAngle, endAngle, 0.0, p);
      geometry.vertices.push(p);
    }
    return geometry;
  };

  /**
   * @param {Viewer3D} viewer - Viewer instance
   * @param snapper
   * @param aDetectRadius
   * @private
   */
  function GeometryCallback(viewer, snapper, aDetectRadius) {
    this.viewer = viewer;
    this.snapper = snapper;

    this.lineGeom = new THREE.Geometry();
    this.circularArc = null;
    this.circularArcCenter;
    this.circularArcRadius;
    this.ellipticalArc = null;
    this.ellipticalArcCenter;

    this.minDist = Number.MAX_VALUE;

    this.matrix = new THREE.Matrix4();

    this.vpIdLine = null;
    this.vpIdCircular = null;
    this.vpIdElliptical = null;

    this.detectRadius = aDetectRadius;

    // Collects candidate segments that we can snap to.
    // This is used to allow snapping to segment intersections.
    this.snapCandidates = []; // {SnappingCandidate[]}
  }

  GeometryCallback.prototype.onLineSegment = function (x1, y1, x2, y2, vpId) {
    var intersectPoint = this.snapper.getIntersectPoint();
    var vertices = this.lineGeom.vertices;
    var v1 = new THREE.Vector3(x1, y1, intersectPoint.z);
    var v2 = new THREE.Vector3(x2, y2, intersectPoint.z);

    // LMV-5515: Apply the supplied matrix to the line vector's
    if (this.matrix) {
      v1.applyMatrix4(this.matrix);
      v2.applyMatrix4(this.matrix);
    }

    // Skip segments outside detectRadius
    var dist = distancePointToLine(intersectPoint, v1, v2);
    if (dist > this.detectRadius) {
      return;
    }

    // Collect snap candidate
    this.snapCandidates.push(new SnapCandidate(vpId, dist).fromLine(v1, v2));

    // Track minDist and lineGeometry for best hit so far
    if (dist < this.minDist) {

      vertices.splice(0, 2, v1, v2);
      this.minDist = dist;

      this.vpIdLine = vpId;
    }
  };

  GeometryCallback.prototype.onCircularArc = function (cx, cy, start, end, radius, vpId) {
    var intersectPoint = this.snapper.getIntersectPoint();
    var point = new THREE.Vector2(intersectPoint.x, intersectPoint.y);

    var center = new THREE.Vector2(cx, cy);
    point.sub(center);

    // Compute closest point on arc
    var pointOnArc = (0,_SnapMath_js__WEBPACK_IMPORTED_MODULE_1__.nearestPointOnCircularArc)(intersectPoint, center, radius, start, end);
    var dist = pointOnArc.distanceTo(intersectPoint); // 2D distance

    // Collect snap candidate
    this.snapCandidates.push(new SnapCandidate(vpId, dist).fromCircularArc(center, radius, start, end));

    // Skip arcs outside detectRadius
    if (dist > this.detectRadius) {
      return;
    }

    // TODO: get rid of the CircleGeometry stuff below, because we computed the snapPoint above already.
    //       But this needs some refactoring, because the Geometry is passed around outside of snapper.

    var angle = this.snapper.angleVector2(point);

    var arc;
    if (end > start && angle >= start && angle <= end) {
      arc = new THREE.CircleGeometry(radius, 100, start, end - start);
    } else
    if (end < start && (angle >= start || angle <= end)) {
      arc = new THREE.CircleGeometry(radius, 100, start, Math.PI * 2 - start + end);
    } else
    {
      return;
    }
///////////////////////////////////
/////
/////////////////////////////////////////////////////////
/////
//////////////
    arc.vertices.splice(0, 1);
    arc.applyMatrix4(new THREE.Matrix4().makeTranslation(cx, cy, intersectPoint.z));
    this.circularArc = arc;
    this.circularArcCenter = new THREE.Vector3(cx, cy, intersectPoint.z);
    this.circularArcRadius = radius;

    this.snapPoint = new THREE.Vector3(pointOnArc.x, pointOnArc.y, intersectPoint.z);

    this.vpIdCircular = vpId;
  };

  GeometryCallback.prototype.onEllipticalArc = function (cx, cy, start, end, major, minor, tilt, vpId) {
    var intersectPoint = this.snapper.getIntersectPoint();
    var point = new THREE.Vector2(intersectPoint.x, intersectPoint.y);

    var major1 = major - this.detectRadius;
    var minor1 = minor - this.detectRadius;
    var major2 = major + this.detectRadius;
    var minor2 = minor + this.detectRadius;

    var equation1 = (point.x - cx) * (point.x - cx) / (major1 * major1) + (point.y - cy) * (point.y - cy) / (minor1 * minor1);
    var equation2 = (point.x - cx) * (point.x - cx) / (major2 * major2) + (point.y - cy) * (point.y - cy) / (minor2 * minor2);

    var center = new THREE.Vector2(cx, cy);
    point.sub(center);
    point.x *= minor;
    point.y *= major;
    var angle = this.snapper.angleVector2(point);

    if (end > Math.PI * 2) {
      end = Math.PI * 2;
    }

    if (equation1 >= 1 && equation2 <= 1) {

      if (end > start && angle >= start && angle <= end || end < start && (angle >= start || angle <= end)) {
        var arc = createEllipticalArcGeometry(cx, cy, major, minor, start, end, 50);
        if (!isEqualWithPrecision(end - start, Math.PI * 2))
        {
          arc.vertices.pop();
        }
        arc.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0, intersectPoint.z));

        // Compute distance between geometry and snapped point. 
        // We use the same way here as in getSnapResultPosition(). This will be replaced later by a more accurate solution.
        var nearestPoint = MeasureCommon.nearestVertexInVertexToEdge(intersectPoint, arc);
        var dist = THREE.Vector2.prototype.distanceTo.call(nearestPoint, intersectPoint); // only in x/y

        // Collect snap candidate
        var _center = new THREE.Vector2(cx, cy);
        this.snapCandidates.push(new SnapCandidate(vpId, dist).makeEllipticalArc(_center, major, minor, start, end));

        // Todo: Unlike for line-segments, arcs are currently collected by "last one wins" rule by the code for single-snapping. 
        //       We should consider the distance here as well.
        this.ellipticalArc = arc;
        this.ellipticalArcCenter = new THREE.Vector3(cx, cy, intersectPoint.z);

        this.vpIdElliptical = vpId;
      }
    }
  };

  /**
   * This method sets the matrix to identity if matrix is not supplied;
   *
   * @param {THREE.Matrix4} matrix - Matrix to set
   */
  GeometryCallback.prototype.setMatrix = function (matrix) {
    this.matrix = matrix || new THREE.Matrix4();
  };

  /**
   * Snap to a 2D model.
   * 
   * @param {object}      hitResult - a result of a ray intersection.
   * @param {object}      [options] - Options object.
   * @param {Function}    [options.enumSegments] - Enumerates all segments within a given bbox in model-space.
   *
   */
  this.snapping2D = function (hitResult) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!hitResult) {
      return;
    }

    // hitResult is a result of a ray intersection. it may contain the following:
    var
    dbId =



    hitResult.dbId,fragId = hitResult.fragId,intersectPoint = hitResult.intersectPoint,_hitResult$model = hitResult.model,model = _hitResult$model === void 0 ? _viewer.model : _hitResult$model;

    if (model.is3d()) {
      return;
    }
    _snapResult.modelId = hitResult.model ? hitResult.model.id : null;
    _snapResult.hasTopology = false;
    _snapResult.intersectPoint = intersectPoint;

    var tr,scale = 1;

    // The model that we are trying to snap is 2D, but the viewer is 3D. It means that we are in hypermodeling scenario!
    // For that, we'll need to apply the inversed transform of the 2D model to the intersect point first, in order to get it in local model coords.
    if (!_viewer.impl.is2d) {
      tr = model.getModelToViewerTransform();
      // If there's a transform, move point to original location in sheet (will be restored at the end)
      if (tr) {
        scale = tr.getMaxScaleOnAxis();
        _snapResult.intersectPoint = intersectPoint.clone();
        _snapResult.intersectPoint.applyMatrix4(model.getInverseModelToViewerTransform());
      }
    }

    // Determine which one should be drawn: line, circular arc or elliptical arc
    // Use the un-transformed point, but scale down the radius because we are comparing with the unscaled geometry
    _snapResult.radius = this.setDetectRadius(intersectPoint) / scale;

    // Geometry snapping is only possible if a fragment list is available to obtain geometry per fragment.
    var supportsGeomSnapping = model.getFragmentList() != null;
    if (!supportsGeomSnapping) {

      // If no snapping is available, just accept the hitpoint as a vertex hit. This allows to measure
      // distances between arbitrary points in rasters.
      _isSnapped = true;
      _snapResult.geomType = SnapType.SNAP_VERTEX;
      _snapResult.geomVertex = intersectPoint; // Use the un-transformed point
      tr && _snapResult.intersectPoint.applyMatrix4(tr); // Restore to original location
      return;
    }


    var gc = new GeometryCallback(_viewer, this, _snapResult.radius);

    // Performs 2D snapping to segments based on an enumSegments() callback, which enumerates all segments
    // within in a given bbox in model-space.
    if (options.enumSegments) {
      // enum all segments within the snapRadius around intersectPoint
      var minx = _snapResult.intersectPoint.x - _snapResult.radius;
      var miny = _snapResult.intersectPoint.y - _snapResult.radius;
      var maxx = _snapResult.intersectPoint.x + _snapResult.radius;
      var maxy = _snapResult.intersectPoint.y + _snapResult.radius;

      options.enumSegments(minx, miny, maxx, maxy, gc);
    } else {
      // Regular snapping - snap to the 2D model's geometry.
      var fragIds = fragId;

      if (typeof fragIds === "undefined") {
        // LMV-6082 Do not return out if the snap to pixel flag (free measure) is enabled.
        if (!_snapToPixel) {
          return;
        }
        fragIds = [];
      } else if (!Array.isArray(fragIds)) {
        fragIds = [fragIds];
      }

      for (var fi = 0; fi < fragIds.length; ++fi) {
        var mesh = _viewer.impl.getRenderProxy(model, fragIds[fi]);

        if (mesh && mesh.geometry) {
          gc.setMatrix(mesh.matrix);
          var vbr = new VertexBufferReader(mesh.geometry);
          vbr.enumGeomsForObject(model.reverseMapDbIdFor2D(dbId), gc);
          // Set the matrix back to identity after processing a mesh
          gc.setMatrix();
        }
      }
    }

    // _snapResult.intersectPoint contains the possibly transformed point
    this.finishSnapping2D(gc, _snapResult.intersectPoint);

    // Snap the unsnapped point only if the snapping fails
    if (!_isSnapped && _snapToPixel) {
      _isSnapped = true;
      _snapResult.geomType = SnapType.RASTER_PIXEL;
      _snapResult.geomVertex = _snapResult.intersectPoint;
    }

    // Now apply the transform matrix on the results, so we'll get the results in their final transformed position.
    if (tr) {var _snapResult$geomEdge, _snapResult$geomEdge2;
      var results = [_snapResult.snapPoint, _snapResult.geomVertex, _snapResult.intersectPoint, _snapResult.circularArcCenter, (_snapResult$geomEdge =
      _snapResult.geomEdge) === null || _snapResult$geomEdge === void 0 ? void 0 : _snapResult$geomEdge.vertices[0], (_snapResult$geomEdge2 = _snapResult.geomEdge) === null || _snapResult$geomEdge2 === void 0 ? void 0 : _snapResult$geomEdge2.vertices[1]];
      // Remove undefined and possibly shared vectors
      results = _toConsumableArray(new Set(results.filter(function (n) {return n;})));
      results.forEach(function (res) {return res.applyMatrix4(tr);});
      if (_snapResult.circularArcRadius) {
        _snapResult.circularArcRadius *= scale;
      }
      _snapResult.radius *= scale;
    }
  };

  // By default, snapper only considers model geometry that is written to ID buffer.
  // This function performs the 2D snapping on a set of given 2D meshes instead. It works similar to snapping2D() but 
  // enumerates the given meshes instead of getting them from the fragment list.
  //
  //  @param {THREE.Vector3}                 intersectPoint - click position in world-coords
  //  @param {function(dbId, layerId, vpId)} filter - Defines subset of primitives to be considered.
  //  @param {THREE.Mesh[]}                  meshes - The triangulated 2D shapes to be checked for snapping
  //  @param {number}                        [detectRadius] - Same coordinate system as the given geometry. Required if geometry is not in world-coords.

  this.snapping2DOverlay = function (intersectPoint, meshes, filter, detectRadius) {
    _snapResult.hasTopology = false;
    _snapResult.intersectPoint = intersectPoint;
    _snapResult.radius = detectRadius || this.setDetectRadius(intersectPoint);

    var gc = new GeometryCallback(_viewer, this, _snapResult.radius);

    for (var i = 0; i < meshes.length; i++) {
      var mesh = meshes[i];
      var vbr = new VertexBufferReader(mesh.geometry);
      vbr.enumGeoms(filter, gc);
    }

    this.finishSnapping2D(gc, intersectPoint);
  };

  // Finish 2D snapping operation - assuming that all candidate geometry for snapping has been processed by the geometryCallback gc already.
  this.finishSnapping2D = function (gc, intersectPoint) {

    // When restricting to a single viewport, exclude candidates of all other viewports
    if (_forcedVpId !== null) {
      var isSameViewport = function isSameViewport(c) {return c.viewportId === _forcedVpId;};
      gc.snapCandidates = gc.snapCandidates.filter(isSameViewport);
    }

    // Check if we can snap to an intersection of two close segments
    var intersectSnap = findIntersectionSnap(gc.snapCandidates, intersectPoint, gc.detectRadius);
    if (intersectSnap) {
      _snapResult.viewportIndex2d = intersectSnap.viewportId;
      _snapResult.snapPoint = intersectSnap.snapPoint;
      _snapResult.geomType = SnapType.SNAP_INTERSECTION;
      _snapResult.geomVertex = intersectSnap.snapPoint;
      _isSnapped = true;
      return;
    }

    if (gc.circularArc) {

      _snapResult.viewportIndex2d = gc.vpIdCircular;

      _snapResult.snapPoint = gc.snapPoint;

      // Only snap the geometries which belong to the same viewport as the first selection
      if (_forcedVpId !== null && _forcedVpId !== _snapResult.viewportIndex2d)
      return;

      if (intersectPoint.distanceTo(gc.circularArc.vertices[0]) < _snapResult.radius) {

        _snapResult.geomVertex = gc.circularArc.vertices[0];
        _snapResult.geomType = SnapType.SNAP_VERTEX;
      } else
      if (intersectPoint.distanceTo(gc.circularArc.vertices[gc.circularArc.vertices.length - 1]) < _snapResult.radius) {

        _snapResult.geomVertex = gc.circularArc.vertices[gc.circularArc.vertices.length - 1];
        _snapResult.geomType = SnapType.SNAP_VERTEX;
      } else
      {

        this.lineStripToPieces(gc.circularArc);
        _snapResult.geomEdge = gc.circularArc;
        _snapResult.circularArcCenter = gc.circularArcCenter;
        _snapResult.circularArcRadius = gc.circularArcRadius;
        _snapResult.geomType = SnapType.SNAP_CIRCULARARC;
      }

      _isSnapped = true;


    } else
    if (gc.ellipticalArc) {

      _snapResult.viewportIndex2d = gc.vpIdElliptical;

      // Only snap the geometries which belong to the same viewport as the first selection
      if (_forcedVpId !== null && _forcedVpId !== _snapResult.viewportIndex2d)
      return;

      if (intersectPoint.distanceTo(gc.ellipticalArc.vertices[0]) < _snapResult.radius) {

        _snapResult.geomVertex = gc.ellipticalArc.vertices[0];
        _snapResult.geomType = SnapType.SNAP_VERTEX;
      } else
      if (intersectPoint.distanceTo(gc.ellipticalArc.vertices[gc.ellipticalArc.vertices.length - 1]) < _snapResult.radius) {

        _snapResult.geomVertex = gc.ellipticalArc.vertices[gc.ellipticalArc.vertices.length - 1];
        _snapResult.geomType = SnapType.SNAP_VERTEX;
      } else
      {

        this.lineStripToPieces(gc.ellipticalArc);
        _snapResult.geomEdge = gc.ellipticalArc;
        // Before we have measure design for elliptical arc, measure the center for now
        _snapResult.circularArcCenter = gc.ellipticalArcCenter;
        _snapResult.circularArcRadius = null;
        _snapResult.geomType = SnapType.SNAP_CIRCULARARC;
      }

      _isSnapped = true;

    } else
    if (gc.lineGeom.vertices.length) {

      _snapResult.viewportIndex2d = gc.vpIdLine;

      // Only snap the geometries which belong to the same viewport as the first selection
      if (_forcedVpId !== null && _forcedVpId !== _snapResult.viewportIndex2d)
      return;

      // Always expose edge segment - no matter whether we snap to the edge or one of its vertices.
      // This allows us to combine it with other snap constraints later - as done by Edit2D.
      _snapResult.geomEdge = gc.lineGeom;

      if (this.markupMode) {// Markup mode
        var start = gc.lineGeom.vertices[0];
        var end = gc.lineGeom.vertices[1];
        var mid = new THREE.Vector3();
        mid.addVectors(start, end);
        mid.divideScalar(2);
        var md = intersectPoint.distanceTo(mid);
        var sd = intersectPoint.distanceTo(start);
        var ed = intersectPoint.distanceTo(end);

        // Store it for snapping to parallel/perpendicular of underlying vectors
        _snapResult.geomEdge = gc.lineGeom;

        if (md < _snapResult.radius) {
          _snapResult.geomVertex = mid;
          _snapResult.geomType = SnapType.SNAP_VERTEX;
        } else
        if (sd < _snapResult.radius) {
          _snapResult.geomVertex = start;
          _snapResult.geomType = SnapType.SNAP_VERTEX;
        } else
        if (ed < _snapResult.radius) {
          _snapResult.geomVertex = end;
          _snapResult.geomType = SnapType.SNAP_VERTEX;
        } else
        {
          _snapResult.geomType = SnapType.SNAP_EDGE;
        }

        // Circle center
        if (gc.lineGeom.vertices[0].distanceTo(gc.lineGeom.vertices[1]) < EPSILON) {
          _snapResult.geomType = SnapType.SNAP_CIRCLE_CENTER;
        }
      } else
      {// Measure mode
        if (intersectPoint.distanceTo(gc.lineGeom.vertices[0]) < _snapResult.radius) {

          if (gc.lineGeom.vertices[0].distanceTo(gc.lineGeom.vertices[1]) < EPSILON) {
            _snapResult.geomType = SnapType.SNAP_CIRCLE_CENTER;
          } else {
            _snapResult.geomType = SnapType.SNAP_VERTEX;
          }

          _snapResult.geomVertex = gc.lineGeom.vertices[0];
        } else
        if (_options.forceSnapVertices || intersectPoint.distanceTo(gc.lineGeom.vertices[1]) < _snapResult.radius) {

          _snapResult.geomVertex = gc.lineGeom.vertices[1];
          _snapResult.geomType = SnapType.SNAP_VERTEX;
        } else
        {
          _snapResult.geomType = SnapType.SNAP_EDGE;
        }
      }

      _isSnapped = true;
    }
  };

  this.snappingRasterPixel = function (result) {
    if (!result) {
      return;
    }

    var intersectPoint = result.intersectPoint;
    _snapResult.intersectPoint = intersectPoint;
    _snapResult.hasTopology = false;

    // Determine which one should be drawn: line, circular arc or elliptical arc
    _snapResult.radius = this.setDetectRadius(intersectPoint);
    _snapResult.geomType = SnapType.RASTER_PIXEL;
    _snapResult.geomVertex = intersectPoint;
    _isSnapped = true;
  };

  this.snapMidpoint = function () {
    _snapResult.isMidpoint = false;

    // Snap midpoint for edge
    if (_isSnapped) {
      if (_snapResult.geomType === SnapType.SNAP_EDGE) {
        var edge = _snapResult.geomEdge;
        var p1 = edge.vertices[0];
        var p2 = edge.vertices[1];

        var midpoint = new THREE.Vector3((p1.x + p2.x) / 2, (p1.y + p2.y) / 2, (p1.z + p2.z) / 2);

        var cutPlanes = _viewer.impl.getAllCutPlanes();
        if (cutPlanes !== null && cutPlanes !== void 0 && cutPlanes.length) {
          for (var i = 0; i < cutPlanes.length; ++i) {
            var p = cutPlanes[i];
            var dot = midpoint.x * p.x + midpoint.y * p.y + midpoint.z * p.z + p.w;
            if (dot > 1e-5) {
              // discard midpoint if clipped
              return;
            }
          }
        }

        if (_snapResult.intersectPoint.distanceTo(midpoint) < 2 * _snapResult.radius) {
          _snapResult.geomVertex = midpoint;
          _snapResult.geomType = SnapType.SNAP_MIDPOINT;
        }
      }
    }
  };

  this.setPerpendicular = function (isPerpendicular) {
    _snapResult.isPerpendicular = isPerpendicular;
  };

  this.lineStripToPieces = function (geom) {

    var vertices = geom.vertices;
    for (var i = vertices.length - 2; i > 0; i--) {
      vertices.splice(i, 0, vertices[i]);
    }
  };

  this.setDetectRadius = function (point) {

    var navapi = _viewer.navigation;
    var camera = navapi.getCamera();
    var position = navapi.getPosition();

    var p = point.clone();

    var distance = camera.isPerspective ? p.sub(position).length() :
    navapi.getEyeVector().length();

    var fov = navapi.getVerticalFov();
    var worldHeight = 2.0 * distance * Math.tan(THREE.Math.degToRad(fov * 0.5));

    var viewport = navapi.getScreenViewport();
    var _window = this.getWindow();
    var devicePixelRatio = _window.devicePixelRatio || 1;
    var radius = this.detectRadiusInPixels * worldHeight / (viewport.height * devicePixelRatio);

    return radius;
  };

  this.handleButtonDown = function () {
    _isDragging = true;
    return false;
  };

  this.handleButtonUp = function () {
    _isDragging = false;
    return false;
  };

  this.handleMouseMove = function (event) {

    if (_isDragging)
    return false;

    this.onMouseMove({
      x: event.canvasX,
      y: event.canvasY });


    return false;
  };

  this.handleSingleTap = function (event) {

    return this.handleMouseMove(event);
  };

  this.handlePressHold = function (event) {

    if (av.isMobileDevice()) {
      switch (event.type) {

        case "press":
          _isPressing = true;
          this.onMouseMove({ x: event.canvasX, y: event.canvasY });
          break;

        case "pressup":
          this.onMouseMove({ x: event.canvasX, y: event.canvasY });
          _isPressing = false;
          break;}

    }
    return false;

  };

  this.handleGesture = function (event)
  {
    if (av.isMobileDevice()) {
      if (_isPressing) {
        switch (event.type) {

          case "dragstart":
            this.onMouseMove({ x: event.canvasX, y: event.canvasY });
            break;

          case "dragmove":
            this.onMouseMove({ x: event.canvasX, y: event.canvasY });
            break;

          case "dragend":
            this.onMouseMove({ x: event.canvasX, y: event.canvasY });
            _isPressing = false;
            break;

          case "pinchstart":

            break;

          case "pinchmove":
            break;

          case "pinchend":
            break;}

      }
    }

    return false;
  };

  /**
   * Handler to mouse move events, used to snap in markup edit mode.
   *
   * @param mousePosition
   * @private
   */
  this.onMouseDown = function (mousePosition) {
    return this.onMouseMove(mousePosition);
  };

  /**
   * Handler to mouse move events, used to snap in markup edit mode.
   *
   * @param mousePosition
   * @private
   */
  this.onMouseMove = function (mousePosition) {var _result$model, _viewer$model;

    this.clearSnapped();

    var result = _viewer.impl.snappingHitTest(mousePosition.x, mousePosition.y, false);

    if (!result && _snapToPixel) {
      var vpVec = _viewer.impl.clientToViewport(mousePosition.x, mousePosition.y);
      var point = _viewer.impl.intersectGroundViewport(vpVec);
      result = { intersectPoint: point };
    }

    if (!result || !result.intersectPoint)
    return false;

    var isLeaflet = ((_result$model = result.model) === null || _result$model === void 0 ? void 0 : _result$model.isLeaflet()) || _viewer.impl.is2d && ((_viewer$model = _viewer.model) === null || _viewer$model === void 0 ? void 0 : _viewer$model.isLeaflet());
    // 3D Snapping
    if (result.face) {
      this.snapping3D(result);
    }
    // 2D Snapping
    else if ((result.dbId || result.dbId === 0) && !isLeaflet) {
      this.snapping2D(result);
    }
    // Pixel Snapping
    else {
      var isPixelSnap = _snapToPixel || isLeaflet;
      if (isPixelSnap) {
        this.snappingRasterPixel(result);
      }
    }

    this.snapMidpoint();

    if (_snapFilter && !_snapFilter(_snapResult)) {
      this.clearSnapped();
      return false;
    }

    return true;
  };
}

av.GlobalManagerMixin.call(Snapper.prototype);

/***/ }),

/***/ "./extensions/Snapping/SnapperIndicator.js":
/*!*************************************************!*\
  !*** ./extensions/Snapping/SnapperIndicator.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NullSnapperIndicator": () => (/* binding */ NullSnapperIndicator),
/* harmony export */   "SnapperIndicator": () => (/* binding */ SnapperIndicator)
/* harmony export */ });
function _typeof(obj) {"@babel/helpers - typeof";return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {return typeof obj;} : function (obj) {return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;}, _typeof(obj);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });Object.defineProperty(subClass, "prototype", { writable: false });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (_typeof(call) === "object" || typeof call === "function")) {return call;} else if (call !== void 0) {throw new TypeError("Derived constructors may only return object or undefined");}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}var MeasureCommon = Autodesk.Viewing.MeasureCommon;
var isEqualVectors = MeasureCommon.isEqualVectors;
var EPSILON = MeasureCommon.EPSILON;
var SnapType = MeasureCommon.SnapType;

var NO_OVERLAY = 0;
var FACE_OVERLAY = 1;
var EDGE_OVERLAY = 2;
var POINT_OVERLAY = 3;

var GEOMETRIES_OVERLAY = 'MeasureTool-snapper-geometries';
var INDICATOR_OVERLAY = 'MeasureTool-snapper-indicator';

var _geometryLineWidth = 0.3;
var _indicatorLineWidth = 0.2;
var _indicatorSize = 1.2;
var _indicatorColor = 0xff7700;
var _geometryColor = 0x00CC00;

var _point = null;

var NullSnapperIndicator = /*#__PURE__*/function () {function NullSnapperIndicator() {_classCallCheck(this, NullSnapperIndicator);}_createClass(NullSnapperIndicator, [{ key: "isNull", value:
    function isNull() {
      return true;
    } }, { key: "render", value:

    function render() {} }, { key: "removeOverlay", value:
    function removeOverlay(overlayName) {} }, { key: "clearOverlay", value:
    function clearOverlay(overlayName) {} }, { key: "clearOverlays", value:
    function clearOverlays() {} }, { key: "addOverlay", value:
    function addOverlay(overlayName, mesh) {} }, { key: "drawFace", value:
    function drawFace(geom, material, overlayName) {} }, { key: "cylinderMesh", value:
    function cylinderMesh(pointX, pointY, material, width) {
      return new THREE.Mesh();
    } }, { key: "renderGeometry", value:
    function renderGeometry(snapResult) {} }, { key: "renderVertexIndicator", value:
    function renderVertexIndicator(snapResult) {} }, { key: "renderMidpointIndicator", value:
    function renderMidpointIndicator(snapResult) {} }, { key: "renderEdgeIndicator", value:
    function renderEdgeIndicator(snapResult) {} }, { key: "renderCircleIndicator", value:
    function renderCircleIndicator(snapResult) {} }, { key: "renderPerpendicular", value:
    function renderPerpendicular(snapResult) {} }, { key: "renderPixelIndicator", value:
    function renderPixelIndicator(snapResult) {} }, { key: "renderIndicator", value:
    function renderIndicator(snapResult) {} }, { key: "drawLine", value:
    function drawLine(geom, material, width, overlayName) {} }, { key: "drawPoint", value:
    function drawPoint(point, material, overlayName) {} }, { key: "drawCircle", value:
    function drawCircle(point, material, overlayName) {} }, { key: "setScale", value:
    function setScale(point) {
      return 1;
    } }, { key: "setPointScale", value:
    function setPointScale(pointMesh) {} }, { key: "setCircleScale", value:
    function setCircleScale(torusMesh) {} }, { key: "setEdgeScale", value:
    function setEdgeScale(cylinderMesh) {} }, { key: "updatePointScale", value:
    function updatePointScale(overlayName) {} }, { key: "updateEdgeScale", value:
    function updateEdgeScale(overlayName) {} }, { key: "onCameraChange", value:
    function onCameraChange() {} }, { key: "destroy", value:
    function destroy() {} }]);return NullSnapperIndicator;}();


var SnapperIndicator = /*#__PURE__*/function (_NullSnapperIndicator) {_inherits(SnapperIndicator, _NullSnapperIndicator);var _super = _createSuper(SnapperIndicator);
  function SnapperIndicator(viewer, snapper) {var _this;_classCallCheck(this, SnapperIndicator);
    _this = _super.call(this);

    _this.viewer = viewer;
    _this.snapper = snapper;
    _this.overlayType = NO_OVERLAY;
    _this.previewsIntersectPoint = null;

    _this.viewer.impl.createOverlayScene(GEOMETRIES_OVERLAY);
    _this.viewer.impl.createOverlayScene(INDICATOR_OVERLAY);

    _this.geometryMaterial = new THREE.MeshPhongMaterial({
      color: _geometryColor,
      opacity: 0.5,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide });


    _this.indicatorMaterial = new THREE.MeshBasicMaterial({
      color: _indicatorColor,
      opacity: 1,
      transparent: false,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide });return _this;

  }_createClass(SnapperIndicator, [{ key: "isNull", value:

    function isNull() {
      return false;
    } }, { key: "render", value:

    function render() {

      var snapResult = this.snapper.getSnapResult();

      if (!isEqualVectors(this.previewsIntersectPoint, snapResult.intersectPoint, EPSILON)) {
        this.clearOverlay(GEOMETRIES_OVERLAY);
      }

      this.clearOverlay(INDICATOR_OVERLAY);

      if (snapResult.isEmpty())
      return;

      if (this.snapper.renderSnappedGeometry ||
      snapResult.hasTopology && this.snapper.renderSnappedTopology) {
        this.renderGeometry(snapResult);
      }
      this.renderIndicator(snapResult);

      this.previewsIntersectPoint = snapResult.intersectPoint.clone();
    } }, { key: "removeOverlay", value:

    function removeOverlay(overlayName) {

      this.viewer.impl.clearOverlay(overlayName);
      this.viewer.impl.removeOverlayScene(overlayName);

    } }, { key: "clearOverlay", value:

    function clearOverlay(overlayName) {

      this.removeOverlay(overlayName);
      this.viewer.impl.createOverlayScene(overlayName);

    } }, { key: "clearOverlays", value:

    function clearOverlays() {

      this.removeOverlay(GEOMETRIES_OVERLAY);
      this.viewer.impl.createOverlayScene(GEOMETRIES_OVERLAY);

      this.removeOverlay(INDICATOR_OVERLAY);
      this.viewer.impl.createOverlayScene(INDICATOR_OVERLAY);

      this.previewsIntersectPoint = null;

    } }, { key: "addOverlay", value:

    function addOverlay(overlayName, mesh) {

      this.viewer.impl.addOverlay(overlayName, mesh);

    }

    /**
     * Draw the planar face
     * @param geom - Geometry which needs to be draw.
     * @param material - Material for the geometry.
     * @param overlayName - Name of the overlay.
     */ }, { key: "drawFace", value:
    function drawFace(geom, material, overlayName) {

      var snapperPlane = new THREE.Mesh(geom, material, true);

      if (overlayName === GEOMETRIES_OVERLAY) {
        this.overlayType = FACE_OVERLAY;
      }

      this.addOverlay(overlayName, snapperPlane);

    } }, { key: "cylinderMesh", value:

    function cylinderMesh(pointX, pointY, material, width) {

      var direction = new THREE.Vector3().subVectors(pointY, pointX);
      var orientation = new THREE.Matrix4();
      orientation.lookAt(pointX, pointY, new THREE.Object3D().up);
      orientation.multiply(new THREE.Matrix4().set(1, 0, 0, 0,
      0, 0, 1, 0,
      0, -direction.length(), 0, 0,
      0, 0, 0, 1));

      width = width || 0.5;
      var cylinder = new THREE.CylinderGeometry(width, width, 1.0, 8, 1, true);
      var edge = new THREE.Mesh(cylinder, material);
      cylinder = null;

      edge.applyMatrix4(orientation);
      edge.position.x = (pointY.x + pointX.x) / 2;
      edge.position.y = (pointY.y + pointX.y) / 2;
      edge.position.z = (pointY.z + pointX.z) / 2;
      return edge;
    } }, { key: "renderGeometry", value:

    function renderGeometry(snapResult) {

      if (isEqualVectors(this.previewsIntersectPoint, snapResult.intersectPoint, EPSILON)) {
        return;
      }

      switch (snapResult.geomType) {
        case SnapType.SNAP_VERTEX:
          SnapType.RASTER_PIXEL;
          this.drawPoint(snapResult.geomVertex, this.geometryMaterial, GEOMETRIES_OVERLAY);
          break;

        case SnapType.SNAP_EDGE:
        case SnapType.SNAP_CURVEDEDGE:
        case SnapType.SNAP_CIRCULARARC:
        case SnapType.SNAP_MIDPOINT:
          this.drawLine(snapResult.geomEdge, this.geometryMaterial, _geometryLineWidth, GEOMETRIES_OVERLAY);
          break;

        case SnapType.SNAP_FACE:
        case SnapType.SNAP_CURVEDFACE:
          this.drawFace(snapResult.geomFace, this.geometryMaterial, GEOMETRIES_OVERLAY);
          break;}

    }

    /**
     * Renders a square around the given snap result.
     * Is used when you’re snapping on a vertex, intersection, circular
     * arc on a F2D sheet, and the curved face.
     * @param {Autodesk.Viewing.MeasureCommon.SnapResult} snapResult
     */ }, { key: "renderVertexIndicator", value:
    function renderVertexIndicator(snapResult) {

      var pos = MeasureCommon.getSnapResultPosition(snapResult, this.viewer);
      var scale = this.setScale(pos);
      var length = _indicatorSize * scale;

      var rightVec = this.viewer.navigation.getCameraRightVector().multiplyScalar(length);
      var upVec = this.viewer.navigation.getCameraUpVector().multiplyScalar(length);

      var geom = new THREE.Geometry();
      var p = new THREE.Vector3();

      // Upper line
      p.addVectors(pos, rightVec);
      p.addVectors(p, upVec);
      geom.vertices[0] = p.clone();
      p.subVectors(pos, rightVec);
      p.addVectors(p, upVec);
      geom.vertices[1] = p.clone();
      this.drawLine(geom, this.indicatorMaterial, _indicatorLineWidth, INDICATOR_OVERLAY);

      // Bottom line
      p.addVectors(pos, rightVec);
      p.subVectors(p, upVec);
      geom.vertices[0] = p.clone();
      p.subVectors(pos, rightVec);
      p.subVectors(p, upVec);
      geom.vertices[1] = p.clone();
      this.drawLine(geom, this.indicatorMaterial, _indicatorLineWidth, INDICATOR_OVERLAY);

      // Left line
      p.subVectors(pos, rightVec);
      p.subVectors(p, upVec);
      geom.vertices[0] = p.clone();
      p.subVectors(pos, rightVec);
      p.addVectors(p, upVec);
      geom.vertices[1] = p.clone();
      this.drawLine(geom, this.indicatorMaterial, _indicatorLineWidth, INDICATOR_OVERLAY);

      // Right line
      p.addVectors(pos, rightVec);
      p.subVectors(p, upVec);
      geom.vertices[0] = p.clone();
      p.addVectors(pos, rightVec);
      p.addVectors(p, upVec);
      geom.vertices[1] = p.clone();
      this.drawLine(geom, this.indicatorMaterial, _indicatorLineWidth, INDICATOR_OVERLAY);

    }

    /**
     * Renders a triangle around the given snap result
     * on a midpoint
     * @param {Autodesk.Viewing.MeasureCommon.SnapResult} snapResult
     */ }, { key: "renderMidpointIndicator", value:
    function renderMidpointIndicator(snapResult) {

      var pos = snapResult.geomVertex;
      var scale = this.setScale(pos);
      var length = _indicatorSize * scale;

      var rightVec = this.viewer.navigation.getCameraRightVector().multiplyScalar(length);
      var upVec = this.viewer.navigation.getCameraUpVector().multiplyScalar(length);

      var geom = new THREE.Geometry();
      var p = new THREE.Vector3();

      // Bottom line
      p.addVectors(pos, rightVec);
      p.subVectors(p, upVec);
      geom.vertices[0] = p.clone();
      p.subVectors(pos, rightVec);
      p.subVectors(p, upVec);
      geom.vertices[1] = p.clone();
      this.drawLine(geom, this.indicatorMaterial, _indicatorLineWidth, INDICATOR_OVERLAY);

      // Left line
      p.subVectors(pos, rightVec);
      p.subVectors(p, upVec);
      geom.vertices[0] = p.clone();
      p.addVectors(pos, upVec);
      geom.vertices[1] = p.clone();
      this.drawLine(geom, this.indicatorMaterial, _indicatorLineWidth, INDICATOR_OVERLAY);

      // Right line
      p.addVectors(pos, rightVec);
      p.subVectors(p, upVec);
      geom.vertices[0] = p.clone();
      p.addVectors(pos, upVec);
      geom.vertices[1] = p.clone();
      this.drawLine(geom, this.indicatorMaterial, _indicatorLineWidth, INDICATOR_OVERLAY);

    }

    /**
     * Renders an upside-down Y around the given snap result
     * on an edge or a curved edge..
     * @param {Autodesk.Viewing.MeasureCommon.SnapResult} snapResult
     */ }, { key: "renderEdgeIndicator", value:
    function renderEdgeIndicator(snapResult) {

      var pos = MeasureCommon.getSnapResultPosition(snapResult, this.viewer);
      var scale = this.setScale(pos);
      var length = _indicatorSize * scale;

      var rightVec = this.viewer.navigation.getCameraRightVector().multiplyScalar(length);
      var upVec = this.viewer.navigation.getCameraUpVector().multiplyScalar(length);

      var geom = new THREE.Geometry();
      var p = new THREE.Vector3();

      // Bottom line
      p.addVectors(pos, rightVec);
      p.subVectors(p, upVec);
      geom.vertices[0] = p.clone();
      geom.vertices[1] = pos.clone();
      this.drawLine(geom, this.indicatorMaterial, _indicatorLineWidth, INDICATOR_OVERLAY);

      // Left line
      p.subVectors(pos, rightVec);
      p.subVectors(p, upVec);
      geom.vertices[0] = p.clone();
      geom.vertices[1] = pos.clone();
      this.drawLine(geom, this.indicatorMaterial, _indicatorLineWidth, INDICATOR_OVERLAY);

      // Right line
      p.addVectors(pos, upVec);
      geom.vertices[0] = p.clone();
      geom.vertices[1] = pos.clone();
      this.drawLine(geom, this.indicatorMaterial, _indicatorLineWidth, INDICATOR_OVERLAY);

    }

    /**
     * Renders an circle on a center of a circle
     * and circular arc for other than F2D sheets.
     * @param {Autodesk.Viewing.MeasureCommon.SnapResult} snapResult
     */ }, { key: "renderCircleIndicator", value:
    function renderCircleIndicator(snapResult) {

      var pos = MeasureCommon.getSnapResultPosition(snapResult, this.viewer);
      this.drawCircle(pos, this.indicatorMaterial, INDICATOR_OVERLAY);

    }

    /**
     * Renders an right-angle ( |_ ) indicator around the given snap result
     * when the result is perpendicular.
     * @param {Autodesk.Viewing.MeasureCommon.SnapResult} snapResult
     */ }, { key: "renderPerpendicular", value:
    function renderPerpendicular(snapResult) {

      var pos = MeasureCommon.getSnapResultPosition(snapResult, this.viewer);
      var scale = this.setScale(pos);
      var length = _indicatorSize * scale;

      var rightVec = this.viewer.navigation.getCameraRightVector().multiplyScalar(length);
      var upVec = this.viewer.navigation.getCameraUpVector().multiplyScalar(length);

      var geom = new THREE.Geometry();
      var p = new THREE.Vector3();

      // Upper line
      geom.vertices[0] = pos.clone();
      p.subVectors(pos, rightVec);
      geom.vertices[1] = p.clone();
      this.drawLine(geom, this.indicatorMaterial, _indicatorLineWidth, INDICATOR_OVERLAY);

      // Bottom line
      p.addVectors(pos, rightVec);
      p.subVectors(p, upVec);
      geom.vertices[0] = p.clone();
      p.subVectors(pos, rightVec);
      p.subVectors(p, upVec);
      geom.vertices[1] = p.clone();
      this.drawLine(geom, this.indicatorMaterial, _indicatorLineWidth, INDICATOR_OVERLAY);

      // Left line
      p.subVectors(pos, rightVec);
      p.subVectors(p, upVec);
      geom.vertices[0] = p.clone();
      p.subVectors(pos, rightVec);
      p.addVectors(p, upVec);
      geom.vertices[1] = p.clone();
      this.drawLine(geom, this.indicatorMaterial, _indicatorLineWidth, INDICATOR_OVERLAY);

      // Right line
      geom.vertices[0] = pos.clone();
      p.subVectors(pos, upVec);
      geom.vertices[1] = p.clone();
      this.drawLine(geom, this.indicatorMaterial, _indicatorLineWidth, INDICATOR_OVERLAY);

    }

    /**
     * Renders an X around the given snap result.
     * Usually shown when using "Free Measure" mode is enabled.
     * @param {Autodesk.Viewing.MeasureCommon.SnapResult} snapResult
     */ }, { key: "renderPixelIndicator", value:
    function renderPixelIndicator(snapResult) {

      var pos = MeasureCommon.getSnapResultPosition(snapResult, this.viewer);
      var scale = this.setScale(pos);
      var length = _indicatorSize * scale;

      var rightVec = this.viewer.navigation.getCameraRightVector().multiplyScalar(length);
      var upVec = this.viewer.navigation.getCameraUpVector().multiplyScalar(length);

      var geom = new THREE.Geometry();
      var p = new THREE.Vector3();

      // Top-left line
      p.subVectors(pos, rightVec);
      p.addVectors(p, upVec);
      geom.vertices[0] = p.clone();
      geom.vertices[1] = pos.clone();
      this.drawLine(geom, this.indicatorMaterial, _indicatorLineWidth, INDICATOR_OVERLAY);

      // Top-right line
      p.addVectors(pos, rightVec);
      p.addVectors(p, upVec);
      geom.vertices[0] = p.clone();
      geom.vertices[1] = pos.clone();
      this.drawLine(geom, this.indicatorMaterial, _indicatorLineWidth, INDICATOR_OVERLAY);

      // Bottom-right line
      p.addVectors(pos, rightVec);
      p.subVectors(p, upVec);
      geom.vertices[0] = p.clone();
      geom.vertices[1] = pos.clone();
      this.drawLine(geom, this.indicatorMaterial, _indicatorLineWidth, INDICATOR_OVERLAY);

      // Bottom-left line
      p.subVectors(pos, rightVec);
      p.subVectors(p, upVec);
      geom.vertices[0] = p.clone();
      geom.vertices[1] = pos.clone();
      this.drawLine(geom, this.indicatorMaterial, _indicatorLineWidth, INDICATOR_OVERLAY);


    } }, { key: "renderIndicator", value:

    function renderIndicator(snapResult) {

      if (snapResult.isPerpendicular) {
        this.renderPerpendicular(snapResult);
        return;
      }

      if (snapResult.snapToArc) {
        if (snapResult.isArc && snapResult.geomType === SnapType.SNAP_CIRCULARARC && this.viewer.model.is2d() && !this.viewer.model.isPdf()) {
          this.renderVertexIndicator(snapResult);
        }
        return;
      }


      switch (snapResult.geomType) {
        case SnapType.SNAP_VERTEX:
        case SnapType.SNAP_INTERSECTION:
          this.renderVertexIndicator(snapResult);
          break;

        case SnapType.SNAP_MIDPOINT:
          this.renderMidpointIndicator(snapResult);
          break;

        case SnapType.SNAP_CIRCLE_CENTER:
          this.renderCircleIndicator(snapResult);
          break;

        case SnapType.SNAP_EDGE:
        case SnapType.SNAP_CURVEDEDGE:
          this.renderEdgeIndicator(snapResult);
          break;

        case SnapType.SNAP_CIRCULARARC:
          if (this.viewer.model.is2d()) {
            this.renderVertexIndicator(snapResult);
          } else {
            this.renderCircleIndicator(snapResult);
          }
          break;

        case SnapType.SNAP_FACE:
        case SnapType.SNAP_CURVEDFACE:
          this.renderVertexIndicator(snapResult);
          break;

        case SnapType.RASTER_PIXEL:
          this.renderPixelIndicator(snapResult);
          break;}

    } }, { key: "drawLine", value:

    function drawLine(geom, material, width, overlayName) {

      // Line Pieces
      if (overlayName === GEOMETRIES_OVERLAY) {
        this.overlayType = EDGE_OVERLAY;
      }

      for (var i = 0; i < geom.vertices.length; i += 2) {
        var cylinder = this.cylinderMesh(geom.vertices[i], geom.vertices[i + 1], material, width);
        this.setEdgeScale(cylinder);
        this.addOverlay(overlayName, cylinder);
      }
    } }, { key: "drawPoint", value:

    function drawPoint(point, material, overlayName) {

      // Because every point is snappable in PDFs, don't display the green dot for PDFs.
      if (this.viewer.model.isLeaflet()) {
        return;
      }

      if (!_point)
      _point = new THREE.SphereGeometry(1.0);

      var pointMesh = new THREE.Mesh(_point, material);
      pointMesh.position.set(point.x, point.y, point.z);

      this.setPointScale(pointMesh);

      if (overlayName === GEOMETRIES_OVERLAY) {
        this.overlayType = POINT_OVERLAY;
      }

      this.addOverlay(overlayName, pointMesh);

    } }, { key: "drawCircle", value:

    function drawCircle(point, material, overlayName) {

      var torus = new THREE.TorusGeometry(_indicatorSize, _indicatorLineWidth, 2, 20);
      var torusMesh = new THREE.Mesh(torus, material);
      torusMesh.lookAt(this.viewer.navigation.getEyeVector().normalize());
      torus = null;

      torusMesh.position.set(point.x, point.y, point.z);

      this.setCircleScale(torusMesh);

      this.addOverlay(overlayName, torusMesh);

    } }, { key: "setScale", value:

    function setScale(point) {

      var pixelSize = 5;

      var navapi = this.viewer.navigation;
      var camera = navapi.getCamera();
      var position = navapi.getPosition();

      var p = point.clone();

      var distance = camera.isPerspective ? p.sub(position).length() :
      navapi.getEyeVector().length();

      var fov = navapi.getVerticalFov();
      var worldHeight = 2.0 * distance * Math.tan(THREE.Math.degToRad(fov * 0.5));

      var viewport = navapi.getScreenViewport();
      var scale = pixelSize * worldHeight / viewport.height;

      return scale;
    } }, { key: "setPointScale", value:

    function setPointScale(pointMesh) {

      var scale = this.setScale(pointMesh.position);
      pointMesh.scale.x = scale;
      pointMesh.scale.y = scale;
      pointMesh.scale.z = scale;

    } }, { key: "setCircleScale", value:

    function setCircleScale(torusMesh) {

      var scale = this.setScale(torusMesh.position);
      torusMesh.scale.x = scale;
      torusMesh.scale.y = scale;
    } }, { key: "setEdgeScale", value:

    function setEdgeScale(cylinderMesh) {

      var scale = this.setScale(cylinderMesh.position);
      cylinderMesh.scale.x = scale;
      cylinderMesh.scale.z = scale;
    } }, { key: "updatePointScale", value:

    function updatePointScale(overlayName) {

      if (this.overlayType !== POINT_OVERLAY)
      return;

      var overlay = this.viewer.impl.overlayScenes[overlayName];
      if (overlay) {
        var scene = overlay.scene;

        for (var i = 0; i < scene.children.length; i++) {
          var pointMesh = scene.children[i];
          if (pointMesh) {

            this.setPointScale(pointMesh);
          }
        }
      }
    } }, { key: "updateEdgeScale", value:

    function updateEdgeScale(overlayName) {

      if (this.overlayType !== EDGE_OVERLAY)
      return;

      var overlay = this.viewer.impl.overlayScenes[overlayName];
      if (overlay) {
        var scene = overlay.scene;

        for (var i = 0; i < scene.children.length; i++) {
          var cylinderMesh = scene.children[i];
          if (cylinderMesh) {

            this.setEdgeScale(cylinderMesh);
          }
        }
      }
    } }, { key: "onCameraChange", value:

    function onCameraChange() {

      this.updatePointScale(GEOMETRIES_OVERLAY);
      this.updateEdgeScale(GEOMETRIES_OVERLAY);

      // if (!this.snapper.markupMode) {
      this.render();
      // }
    } }, { key: "destroy", value:

    function destroy() {

      this.removeOverlay(GEOMETRIES_OVERLAY);
      this.removeOverlay(INDICATOR_OVERLAY);

      if (_point) {
        _point.dispose();
        _point = null;
      }
    } }]);return SnapperIndicator;}(NullSnapperIndicator);

/***/ }),

/***/ "./extensions/Snapping/index.js":
/*!**************************************!*\
  !*** ./extensions/Snapping/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) {"@babel/helpers - typeof";return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {return typeof obj;} : function (obj) {return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;}, _typeof(obj);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });Object.defineProperty(subClass, "prototype", { writable: false });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (_typeof(call) === "object" || typeof call === "function")) {return call;} else if (call !== void 0) {throw new TypeError("Derived constructors may only return object or undefined");}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}
var av = Autodesk.Viewing;

/**
 * @namespace Autodesk.Viewing.Extensions.Snapping
 */
var namespace = AutodeskNamespace('Autodesk.Viewing.Extensions.Snapping');

/**
 * @param m
 * @param ns
 * @private
 */
function _export(m, ns) {
  for (var prop in m) {
    if (Object.prototype.hasOwnProperty.call(m, prop)) {
      //Export directly into the module (e.g. for node.js use, where LMV is used via require instead from global namespace)
      module.exports[prop] = m[prop];

      //Export into the desired viewer namespace
      ns[prop] = m[prop];
    }
  }
}

_export(__webpack_require__(/*! ./SnapMath.js */ "./extensions/Snapping/SnapMath.js"), namespace);
_export(__webpack_require__(/*! ./Snapper.js */ "./extensions/Snapping/Snapper.js"), namespace);
_export(__webpack_require__(/*! ./SnapperIndicator.js */ "./extensions/Snapping/SnapperIndicator.js"), namespace);


/**
 * Utility extension that provides access to the {@link Autodesk.Viewing.Extensions.Snapping.Snapper} tool.
 * 
 * The extension id is: `Autodesk.Snapping`
 * 
 * @example
 *   viewer.loadExtension('Autodesk.Snapping')
 *  
 * @memberof Autodesk.Viewing.Extensions
 * @alias Autodesk.Viewing.Extensions.SnappingExtension
 * @see {@link Autodesk.Viewing.Extension} for common inherited methods.
 * @class
 */var
SnappingExtension = /*#__PURE__*/function (_av$Extension) {"use strict";_inherits(SnappingExtension, _av$Extension);var _super = _createSuper(SnappingExtension);

  /**
   * @param {Viewer3D} viewer - Viewer instance
   * @param {object} options - Configurations for the extension
   * @alias Autodesk.Viewing.Extensions.SnappingExtension
   * @class
   */
  function SnappingExtension(viewer, options) {_classCallCheck(this, SnappingExtension);return _super.call(this,
    viewer, options);
  }

  /**
   * Load the extension.
   *
   * @returns {Promise} that resolves when dependent extension finishes loading.
   * 
   * @alias Autodesk.Viewing.Extensions.SnappingExtension#load
   */_createClass(SnappingExtension, [{ key: "load", value:
    function load() {
      // Load the required dependency (and return the pending load as the load completion Promise)
      return this.viewer.loadExtension('Autodesk.CompGeom');
    }

    /**
     * Unloads the extension.
     * It does not unload dependent extensions.
     *
     * @returns {boolean} Always returns true
     * 
     * @alias Autodesk.Viewing.Extensions.SnappingExtension#unload
     */ }, { key: "unload", value:
    function unload() {return true;}


    /**
     * Unused method.
     *
     * @returns {boolean} Always returns true
     * 
     * @alias Autodesk.Viewing.Extensions.SnappingExtension#activate
     */ }, { key: "activate", value:
    function activate() {return true;}

    /**
     * Unused method.
     *
     * @returns {boolean} Always returns false
     * 
     * @alias Autodesk.Viewing.Extensions.SnappingExtension#deactivate
     */ }, { key: "deactivate", value:
    function deactivate() {return false;} }]);return SnappingExtension;}(av.Extension);


// The ExtensionManager requires an extension to be registered.
av.theExtensionManager.registerExtension('Autodesk.Snapping', SnappingExtension);

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
/******/ 			// no module.id needed
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./extensions/Snapping/index.js");
/******/ 	Autodesk.Extensions.Snapping = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=Snapping.js.map