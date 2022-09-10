/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/SAT/Box.js":
/*!************************!*\
  !*** ./src/SAT/Box.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Box)
/* harmony export */ });
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ "./src/SAT/Vector.js");
/* harmony import */ var _Polygon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Polygon */ "./src/SAT/Polygon.js");


;


/**
 * ## Box
 * 
 * Represents an axis-aligned box, with a width and height.
 */
class Box {
  /**
   * Creates a new Box, with the specified position, width, and height.
   * 
   * If no position is given, the position will be `(0, 0)`. If no width or height are given, they will
   * be set to `0`.
   * 
   * @param {Vector} [pos=new Vector()] A Vector representing the bottom-left of the box(i.e. the smallest x and smallest y value).
   * @param {number} [w=0] The width of the Box.
   * @param {number} [h=0] The height of the Box.
   */
  constructor(pos = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](), w = 0, h = 0) {
    this.pos = pos;
    this.w = w;
    this.h = h;
  }

  /**
   * Returns a Polygon whose edges are the same as this Box.
   * 
   * @returns {Polygon} A new Polygon that represents this Box.
   */
  toPolygon() {
    const pos = this.pos;
    const w = this.w;
    const h = this.h;

    return new _Polygon__WEBPACK_IMPORTED_MODULE_1__["default"](new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](pos.x, pos.y), [
      new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](), new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](w, 0),
      new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](w, h), new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, h)
    ]);
  }
}

/***/ }),

/***/ "./src/SAT/Circle.js":
/*!***************************!*\
  !*** ./src/SAT/Circle.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Circle)
/* harmony export */ });
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ "./src/SAT/Vector.js");
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Box */ "./src/SAT/Box.js");


;


/**
 * ## Circle
 * 
 * Represents a circle with a position and a radius.
 * 
 * Creates a new Circle, optionally passing in a position and/or radius. If no position
 * is given, the Circle will be at `(0,0)`. If no radius is provided the circle will have
 * a radius of `0`.
 */
class Circle {
  /**
   * @param {Vector} pos A Vector representing the center of this Circle.
   * @param {number} r The radius of this Circle. 
   */
  constructor(pos = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](), r = 0) {
    this.pos = pos;
    this.r = r;
    this.offset = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  /**
   * Compute the axis-aligned bounding box (AABB) of this Circle.
   * 
   * Note: Returns a _new_ `Polygon` each time you call this.
   * 
   * @returns {Polygon} Returns the AABB.
   */
  getAABB() {
    const r = this.r;

    const corner = this.pos.clone().add(this.offset).sub(new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](r, r));

    return new _Box__WEBPACK_IMPORTED_MODULE_1__["default"](corner, r * 2, r * 2).toPolygon();
  }

  /**
   * Set the current offset to apply to the radius.
   * 
   * @param {Vector} offset The new offset Vector.
   * 
   * @returns {Circle} Returns this for chaining.
   */
  setOffset(offset) {
    this.offset = offset;

    return this;
  }
}

/***/ }),

/***/ "./src/SAT/Polygon.js":
/*!****************************!*\
  !*** ./src/SAT/Polygon.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Polygon)
/* harmony export */ });
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ "./src/SAT/Vector.js");
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Box */ "./src/SAT/Box.js");


;


/**
 * ## Polygon
 * 
 * Represents a *convex* polygon with any number of points (specified in counter-clockwise order).
 * 
 * Note: Do _not_ manually change the `points`, `angle`, or `offset` properties. Use the provided 
 * setters. Otherwise the calculated properties will not be updated correctly.
 * 
 * `pos` can be changed directly.
 */
class Polygon {
  /**
   * Create a new polygon, passing in a position vector, and an array of points (represented by vectors 
   * relative to the position vector). If no position is passed in, the position of the polygon will be `(0,0)`.
   * 
   * @param {Vector} [pos=Vector] A vector representing the origin of the polygon (all other points are relative to this one)
   * @param {Array<Vector>} [points=[]] An array of vectors representing the points in the polygon, in counter-clockwise order.
   */
  constructor(pos = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](), points = []) {
    this.pos = pos;
    this.angle = 0;
    this.offset = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"]();

    this.setPoints(points);
  }

  /**
   * Set the points of the polygon. Any consecutive duplicate points will be combined.
   * 
   * Note: The points are counter-clockwise *with respect to the coordinate system*. If you directly draw the points on a screen 
   * that has the origin at the top-left corner it will _appear_ visually that the points are being specified clockwise. This is 
   * just because of the inversion of the Y-axis when being displayed.
   * 
   * @param {Array<Vector>} points An array of vectors representing the points in the polygon, in counter-clockwise order.
   * 
   * @returns {Polygon} Returns this for chaining.
   */
  setPoints(points) {
    // Only re-allocate if this is a new polygon or the number of points has changed.
    const lengthChanged = !this.points || this.points.length !== points.length;

    if (lengthChanged) {
      let i;

      const calcPoints = this.calcPoints = [];
      const edges = this.edges = [];
      const normals = this.normals = [];

      // Allocate the vector arrays for the calculated properties
      for (i = 0; i < points.length; i++) {
        // Remove consecutive duplicate points
        const p1 = points[i];
        const p2 = i < points.length - 1 ? points[i + 1] : points[0];

        if (p1 !== p2 && p1.x === p2.x && p1.y === p2.y) {
          points.splice(i, 1);
          i -= 1;
          continue;
        }

        calcPoints.push(new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"]());
        edges.push(new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"]());
        normals.push(new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"]());
      }
    }

    this.points = points;

    this._recalc();

    return this;
  }

  /**
   * Set the current rotation angle of the polygon.
   * 
   * @param {number} angle The current rotation angle (in radians).
   * 
   * @returns {Polygon} Returns this for chaining.
   */
  setAngle(angle) {
    this.angle = angle;

    this._recalc();

    return this;
  }

  /**
   * Set the current offset to apply to the `points` before applying the `angle` rotation.
   * 
   * @param {Vector} offset The new offset Vector.
   * 
   * @returns {Polygon} Returns this for chaining.
   */
  setOffset(offset) {
    this.offset = offset;

    this._recalc();

    return this;
  }

  /**
   * Rotates this Polygon counter-clockwise around the origin of *its local coordinate system* (i.e. `pos`).
   * 
   * Note: This changes the **original** points (so any `angle` will be applied on top of this rotation).
   * 
   * @param {number} angle The angle to rotate (in radians).
   * 
   * @returns {Polygon} Returns this for chaining.
   */
  rotate(angle) {
    const points = this.points;
    const len = points.length;

    for (let i = 0; i < len; i++) points[i].rotate(angle);

    this._recalc();

    return this;
  }

  /**
   * Translates the points of this polygon by a specified amount relative to the origin of *its own coordinate system* (i.e. `pos`).
   * 
   * Note: This changes the **original** points (so any `offset` will be applied on top of this translation)
   * 
   * @param {number} x The horizontal amount to translate.
   * @param {number} y The vertical amount to translate.
   * 
   * @returns {Polygon} Returns this for chaining.
   */
  translate(x, y) {
    const points = this.points;
    const len = points.length;

    for (let i = 0; i < len; i++) {
      points[i].x += x;
      points[i].y += y;
    }

    this._recalc();

    return this;
  }

  /**
   * Computes the calculated collision Polygon.
   * 
   * This applies the `angle` and `offset` to the original points then recalculates the edges and normals of the collision Polygon.
   * 
   * @private
   * 
   * @returns {Polygon} Returns this for chaining.
   */
  _recalc() {
    // Calculated points - this is what is used for underlying collisions and takes into account
    // the angle/offset set on the polygon.
    const calcPoints = this.calcPoints;

    // The edges here are the direction of the `n`th edge of the polygon, relative to
    // the `n`th point. If you want to draw a given edge from the edge value, you must
    // first translate to the position of the starting point.
    const edges = this.edges;

    // The normals here are the direction of the normal for the `n`th edge of the polygon, relative
    // to the position of the `n`th point. If you want to draw an edge normal, you must first
    // translate to the position of the starting point.
    const normals = this.normals;

    // Copy the original points array and apply the offset/angle
    const points = this.points;
    const offset = this.offset;
    const angle = this.angle;

    const len = points.length;
    let i;

    for (i = 0; i < len; i++) {
      const calcPoint = calcPoints[i].copy(points[i]);

      calcPoint.x += offset.x;
      calcPoint.y += offset.y;

      if (angle !== 0) calcPoint.rotate(angle);
    }

    // Calculate the edges/normals
    for (i = 0; i < len; i++) {
      const p1 = calcPoints[i];
      const p2 = i < len - 1 ? calcPoints[i + 1] : calcPoints[0];

      const e = edges[i].copy(p2).sub(p1);

      normals[i].copy(e).perp().normalize();
    }

    return this;
  }

  /**
   * Compute the axis-aligned bounding box.
   * 
   * Any current state (translations/rotations) will be applied before constructing the AABB.
   * 
   * Note: Returns a _new_ `Polygon` each time you call this.
   * 
   * @returns {Polygon} Returns this for chaining.
   */
  getAABB() {
    const points = this.calcPoints;

    let xMin = points[0].x;
    let yMin = points[0].y;

    let xMax = points[0].x;
    let yMax = points[0].y;

    for (let i = 1; i < points.length; i++) {
      const point = points[i];

      if (point["x"] < xMin) xMin = point["x"];
      else if (point["x"] > xMax) xMax = point["x"];

      if (point["y"] < yMin) yMin = point["y"];
      else if (point["y"] > yMax) yMax = point["y"];
    }

    return new _Box__WEBPACK_IMPORTED_MODULE_1__["default"](this['pos'].clone().add(new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](xMin, yMin)), xMax - xMin, yMax - yMin).toPolygon();
  }

  /**
   * Compute the centroid (geometric center) of the Polygon.
   * 
   * Any current state (translations/rotations) will be applied before computing the centroid.
   * 
   * See https://en.wikipedia.org/wiki/Centroid#Centroid_of_a_polygon
   * 
   * Note: Returns a _new_ `Vector` each time you call this.
   * 
   * @returns {Vector} Returns a Vector that contains the coordinates of the centroid.
   */
  getCentroid() {
    const points = this.calcPoints;
    const len = points.length;

    let cx = 0;
    let cy = 0;
    let ar = 0;

    for (var i = 0; i < len; i++) {
      const p1 = points[i];
      const p2 = i === len - 1 ? points[0] : points[i + 1]; // Loop around if last point

      const a = p1["x"] * p2["y"] - p2["x"] * p1["y"];

      cx += (p1["x"] + p2["x"]) * a;
      cy += (p1["y"] + p2["y"]) * a;
      ar += a;
    }

    ar = ar * 3; // we want 1 / 6 the area and we currently have 2*area
    cx = cx / ar;
    cy = cy / ar;
    
    return new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](cx, cy);
  }
}

/***/ }),

/***/ "./src/SAT/Response.js":
/*!*****************************!*\
  !*** ./src/SAT/Response.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Response)
/* harmony export */ });
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ "./src/SAT/Vector.js");


;

/**
 * ## Response
 * 
 * An object representing the result of an intersection. Contains:
 * - The two objects participating in the intersection
 * - The vector representing the minimum change necessary to extract the first object from the second one (as well as a unit vector in that direction and the magnitude of the overlap)
 * - Whether the first object is entirely inside the second, and vice versa.
 */
class Response {
  constructor() {
    this.a = null;
    this.b = null;

    this.overlapN = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.overlapV = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"]();

    this.clear();
  }

  /**
   * Set some values of the response back to their defaults.
   * 
   * Call this between tests if you are going to reuse a single Response object for multiple intersection tests (recommended as it will avoid allcating extra memory)
   * 
   * @returns {Response} Returns this for chaining.
   */
  clear() {
    this.aInB = true;
    this.bInA = true;

    this.overlap = Number.MAX_VALUE;

    return this;
  }

  
}

/***/ }),

/***/ "./src/SAT/SAT.js":
/*!************************!*\
  !*** ./src/SAT/SAT.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Box */ "./src/SAT/Box.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vector */ "./src/SAT/Vector.js");
/* harmony import */ var _Circle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Circle */ "./src/SAT/Circle.js");
/* harmony import */ var _Polygon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Polygon */ "./src/SAT/Polygon.js");
/* harmony import */ var _Response__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Response */ "./src/SAT/Response.js");


/*!
* sat-js (or SAT.js) made by Jim Riecken and released under the MIT license
* Modified by Robert Corponoi and me (SonoPG)
*/

;





/**
 * ## Object Pools
 */

/**
 * A pool of `Vector objects that are used in calculations to avoid allocating memory.
 * 
 * @type {Array<Vector>}
 */
const T_VECTORS = [];
for (let i = 0; i < 10; i++) T_VECTORS.push(new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"]());

/**
 * A pool of arrays of numbers used in calculations to avoid allocating memory.
 * 
 * @type {Array<Array<number>>}
 */
const T_ARRAYS = [];
for (let i = 0; i < 5; i++) T_ARRAYS.push([]);

/**
 * Temporary response used for Polygon hit detection.
 * 
 * @type {Response}
 */
const T_RESPONSE = new _Response__WEBPACK_IMPORTED_MODULE_4__["default"]();

/**
 * Tiny "point" Polygon used for Polygon hit detection.
 * 
 * @type {Polygon}
 */
const TEST_POINT = new _Box__WEBPACK_IMPORTED_MODULE_0__["default"](new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](), 0.000001, 0.000001).toPolygon();

/**
 * ## Constants for Voronoi regions.
 */
const LEFT_VORONOI_REGION = -1;
const MIDDLE_VORONOI_REGION = 0;
const RIGHT_VORONOI_REGION = 1;

/**
 * ## Helper Functions
 */

/**
 * Flattens the specified array of points onto a unit vector axis resulting in a one dimensionsl
 * range of the minimum and maximum value on that axis.
 * 
 * @param {Array<Vector>} points The points to flatten.
 * @param {Vector} normal The unit vector axis to flatten on.
 * @param {Array<number>} result An array. After calling this function, result[0] will be the minimum value, result[1] will be the maximum value.
 */
function flattenPointsOn(points, normal, result) {
  let min = Number.MAX_VALUE;
  let max = -Number.MAX_VALUE;

  const len = points.length;

  for (let i = 0; i < len; i++) {
    // The magnitude of the projection of the point onto the normal.
    const dot = points[i].dot(normal);

    if (dot < min) min = dot;
    if (dot > max) max = dot;
  }

  result[0] = min;
  result[1] = max;
}

/**
 * Calculates which Voronoi region a point is on a line segment.
 * 
 * It is assumed that both the line and the point are relative to `(0,0)`
 * 
 *             |       (0)      |
 *      (-1)  [S]--------------[E]  (1)
 *            |       (0)      |
 * 
 * @param {Vector} line The line segment.
 * @param {Vector} point The point.
 * @return {number} LEFT_VORONOI_REGION (-1) if it is the left region,
 *                  MIDDLE_VORONOI_REGION (0) if it is the middle region,
 *                  RIGHT_VORONOI_REGION (1) if it is the right region.
 */
function voronoiRegion(line, point) {
  const len2 = line.len2();
  const dp = point.dot(line);

  // If the point is beyond the start of the line, it is in the left voronoi region.
  if (dp < 0) return LEFT_VORONOI_REGION;

  // If the point is beyond the end of the line, it is in the right voronoi region.
  else if (dp > len2) return RIGHT_VORONOI_REGION;

  // Otherwise, it's in the middle one.
  else return MIDDLE_VORONOI_REGION;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  Box: _Box__WEBPACK_IMPORTED_MODULE_0__["default"],
  Vector: _Vector__WEBPACK_IMPORTED_MODULE_1__["default"],
  Circle: _Circle__WEBPACK_IMPORTED_MODULE_2__["default"],
  Polygon: _Polygon__WEBPACK_IMPORTED_MODULE_3__["default"],
  Response: _Response__WEBPACK_IMPORTED_MODULE_4__["default"],
  V: _Vector__WEBPACK_IMPORTED_MODULE_1__["default"],
  
  /**
   * Check whether two convex polygons are separated by the specified axis (must be a unit vector).
   * 
   * @param {Vector} aPos The position of the first polygon.
   * @param {Vector} bPos The position of the second polygon.
   * @param {Array<Vector>} aPoints The points in the first polygon.
   * @param {Array<Vector>} bPoints The points in the second polygon.
   * @param {Vector} axis The axis (unit sized) to test against.  The points of both polygons will be projected onto this axis.
   * @param {Response=} response A Response object (optional) which will be populated if the axis is not a separating axis.
   * @return {boolean} true if it is a separating axis, false otherwise.  If false, and a response is passed in, information about how much overlap and the direction of the overlap will be populated.
   */
  isSeparatingAxis(aPos, bPos, aPoints, bPoints, axis, response) {
    const rangeA = T_ARRAYS.pop();
    const rangeB = T_ARRAYS.pop();
  
    // The magnitude of the offset between the two polygons
    const offsetV = T_VECTORS.pop().copy(bPos).sub(aPos);
    const projectedOffset = offsetV.dot(axis);
  
    // Project the polygons onto the axis.
    flattenPointsOn(aPoints, axis, rangeA);
    flattenPointsOn(bPoints, axis, rangeB);
  
    // Move B's range to its position relative to A.
    rangeB[0] += projectedOffset;
    rangeB[1] += projectedOffset;
  
    // Check if there is a gap. If there is, this is a separating axis and we can stop
    if (rangeA[0] > rangeB[1] || rangeB[0] > rangeA[1]) {
      T_VECTORS.push(offsetV);
  
      T_ARRAYS.push(rangeA);
      T_ARRAYS.push(rangeB);
  
      return true;
    }
  
    // This is not a separating axis. If we're calculating a response, calculate the overlap.
    if (response) {
      let overlap = 0;
  
      // A starts further left than B
      if (rangeA[0] < rangeB[0]) {
        response['aInB'] = false;
  
        // A ends before B does. We have to pull A out of B
        if (rangeA[1] < rangeB[1]) {
          overlap = rangeA[1] - rangeB[0];
  
          response['bInA'] = false;
          // B is fully inside A.  Pick the shortest way out.
        } else {
          const option1 = rangeA[1] - rangeB[0];
          const option2 = rangeB[1] - rangeA[0];
  
          overlap = option1 < option2 ? option1 : -option2;
        }
        // B starts further left than A
      } else {
        response['bInA'] = false;
  
        // B ends before A ends. We have to push A out of B
        if (rangeA[1] > rangeB[1]) {
          overlap = rangeA[0] - rangeB[1];
  
          response['aInB'] = false;
          // A is fully inside B.  Pick the shortest way out.
        } else {
          const option1 = rangeA[1] - rangeB[0];
          const option2 = rangeB[1] - rangeA[0];
  
          overlap = option1 < option2 ? option1 : -option2;
        }
      }
  
      // If this is the smallest amount of overlap we've seen so far, set it as the minimum overlap.
      const absOverlap = Math.abs(overlap);
  
      if (absOverlap < response['overlap']) {
        response['overlap'] = absOverlap;
        response['overlapN'].copy(axis);
  
        if (overlap < 0) response['overlapN'].reverse();
      }
    }
  
    T_VECTORS.push(offsetV);
  
    T_ARRAYS.push(rangeA);
    T_ARRAYS.push(rangeB);
  
    return false;
  },

  /**
   * ## Collision Tests
   */

  /**
   * Check if a point is inside a circle.
   * 
   * @param {Vector} p The point to test.
   * @param {Circle} c The circle to test.
   * 
   * @returns {boolean} Returns true if the point is inside the circle or false otherwise.
   */
  pointInCircle(p, c) {
    const differenceV = T_VECTORS.pop().copy(p).sub(c['pos']).sub(c['offset']);

    const radiusSq = c['r'] * c['r'];
    const distanceSq = differenceV.len2();

    T_VECTORS.push(differenceV);

    // If the distance between is smaller than the radius then the point is inside the circle.
    return distanceSq <= radiusSq;
  },

  /**
   * Check if a point is inside a convex polygon.
   * 
   * @param {Vector} p The point to test.
   * @param {Polygon} poly The polygon to test.
   * 
   * @returns {boolean} Returns true if the point is inside the polygon or false otherwise.
   */
  pointInPolygon(p, poly) {
    TEST_POINT['pos'].copy(p);
    T_RESPONSE.clear();

    let result = this.testPolygonPolygon(TEST_POINT, poly, T_RESPONSE);

    if (result) result = T_RESPONSE['aInB'];

    return result;
  },

  /**
   * Check if two circles collide.
   * 
   * @param {Circle} a The first circle.
   * @param {Circle} b The second circle.
   * @param {Response} [response] An optional response object that will be populated if the circles intersect.
   * 
   * @returns {boolean} Returns true if the circles intersect or false otherwise.
   */
  testCircleCircle(a, b, response) {
    // Check if the distance between the centers of the two circles is greater than their combined radius.
    const differenceV = T_VECTORS.pop().copy(b['pos']).add(b['offset']).sub(a['pos']).sub(a['offset']);

    const totalRadius = a['r'] + b['r'];
    const totalRadiusSq = totalRadius * totalRadius;
    const distanceSq = differenceV.len2();

    // If the distance is bigger than the combined radius, they don't intersect.
    if (distanceSq > totalRadiusSq) {
      T_VECTORS.push(differenceV);

      return false;
    }

    // They intersect.  If we're calculating a response, calculate the overlap.
    if (response) {
      const dist = Math.sqrt(distanceSq);

      response.a = a;
      response.b = b;

      response.overlap = totalRadius - dist;
      response.overlapN.copy(differenceV.normalize());
      response.overlapV.copy(differenceV).scale(response.overlap);

      response.aInB = a.r <= b.r && dist <= b.r - a.r;
      response.bInA = b.r <= a.r && dist <= a.r - b.r;
    }

    T_VECTORS.push(differenceV);

    return true;
  },

  /**
   * Check if a polygon and a circle collide.
   * 
   * @param {Polygon} polygon The polygon.
   * @param {Circle} circle The circle.
   * @param {Response} [response] An optional response object that will be populated if they intersect.
   * 
   * @returns {boolean} Returns true if they intersect or false otherwise.
   */
  testPolygonCircle(polygon, circle, response) {
    // Get the position of the circle relative to the polygon.
    const circlePos = T_VECTORS.pop().copy(circle.pos).add(circle.offset).sub(polygon.pos);

    const radius = circle.r;
    const radius2 = radius * radius;

    const points = polygon.calcPoints;
    const len = points.length;

    const edge = T_VECTORS.pop();
    const point = T_VECTORS.pop();

    // For each edge in the polygon:
    for (var i = 0; i < len; i++) {
      const next = i === len - 1 ? 0 : i + 1;
      const prev = i === 0 ? len - 1 : i - 1;

      let overlap = 0;
      let overlapN = null;

      // Get the edge.
      edge.copy(polygon.edges[i]);

      // Calculate the center of the circle relative to the starting point of the edge.
      point.copy(circlePos).sub(points[i]);

      // If the distance between the center of the circle and the point is bigger than the radius, the polygon is definitely not fully in the circle.
      if (response && point.len2() > radius2) response.aInB = false;

      // Calculate which Voronoi region the center of the circle is in.
      let region = voronoiRegion(edge, point);

      // If it's the left region:
      if (region === LEFT_VORONOI_REGION) {
        // We need to make sure we're in the RIGHT_VORONOI_REGION of the previous edge.
        edge.copy(polygon.edges[prev]);

        // Calculate the center of the circle relative the starting point of the previous edge
        const point2 = T_VECTORS.pop().copy(circlePos).sub(points[prev]);

        region = voronoiRegion(edge, point2);

        if (region === RIGHT_VORONOI_REGION) {
          // It's in the region we want.  Check if the circle intersects the point.
          const dist = point.len();

          if (dist > radius) {
            // No intersection
            T_VECTORS.push(circlePos);
            T_VECTORS.push(edge);
            T_VECTORS.push(point);
            T_VECTORS.push(point2);

            return false;
          } else if (response) {
            // It intersects, calculate the overlap.
            response.bInA = false;

            overlapN = point.normalize();
            overlap = radius - dist;
          }
        }

        T_VECTORS.push(point2);

        // If it's the right region:
      } else if (region === RIGHT_VORONOI_REGION) {
        // We need to make sure we're in the left region on the next edge
        edge.copy(polygon.edges[next]);

        // Calculate the center of the circle relative to the starting point of the next edge.
        point.copy(circlePos).sub(points[next]);

        region = voronoiRegion(edge, point);

        if (region === LEFT_VORONOI_REGION) {
          // It's in the region we want.  Check if the circle intersects the point.
          const dist = point.len();

          if (dist > radius) {
            // No intersection
            T_VECTORS.push(circlePos);
            T_VECTORS.push(edge);
            T_VECTORS.push(point);

            return false;
          } else if (response) {
            // It intersects, calculate the overlap.
            response.bInA = false;

            overlapN = point.normalize();
            overlap = radius - dist;
          }
        }
        // Otherwise, it's the middle region:
      } else {
        // Need to check if the circle is intersecting the edge, change the edge into its "edge normal".
        const normal = edge.perp().normalize();

        // Find the perpendicular distance between the center of the circle and the edge.
        const dist = point.dot(normal);
        const distAbs = Math.abs(dist);

        // If the circle is on the outside of the edge, there is no intersection.
        if (dist > 0 && distAbs > radius) {
          // No intersection
          T_VECTORS.push(circlePos);
          T_VECTORS.push(normal);
          T_VECTORS.push(point);

          return false;
        } else if (response) {
          // It intersects, calculate the overlap.
          overlapN = normal;
          overlap = radius - dist;

          // If the center of the circle is on the outside of the edge, or part of the circle is on the outside, the circle is not fully inside the polygon.
          if (dist >= 0 || overlap < 2 * radius) response.bInA = false;
        }
      }

      // If this is the smallest overlap we've seen, keep it.
      // (overlapN may be null if the circle was in the wrong Voronoi region).
      if (overlapN && response && Math.abs(overlap) < Math.abs(response.overlap)) {
        response.overlap = overlap;
        response.overlapN.copy(overlapN);
      }
    }

    // Calculate the final overlap vector - based on the smallest overlap.
    if (response) {
      response.a = polygon;
      response.b = circle;

      response.overlapV.copy(response.overlapN).scale(response.overlap);
    }

    T_VECTORS.push(circlePos);
    T_VECTORS.push(edge);
    T_VECTORS.push(point);

    return true;
  },

  /**
   * Check if a circle and a polygon collide.
   * 
   * **NOTE:** This is slightly less efficient than polygonCircle as it just runs polygonCircle and reverses everything
   * at the end.
   * 
   * @param {Circle} circle The circle.
   * @param {Polygon} polygon The polygon.
   * @param {Response} [response] An optional response object that will be populated if they intersect.
   * 
   * @returns {boolean} Returns true if they intersect or false otherwise.
   */
  testCirclePolygon(circle, polygon, response) {
    // Test the polygon against the circle.
    const result = testPolygonCircle(polygon, circle, response);

    if (result && response) {
      // Swap A and B in the response.
      const a = response.a;
      const aInB = response.aInB;

      response.overlapN.reverse();
      response.overlapV.reverse();

      response.a = response.b;
      response.b = a;

      response.aInB = response.bInA;
      response.bInA = aInB;
    }

    return result;
  },

  /**
   * Checks whether polygons collide.
   * 
   * @param {Polygon} a The first polygon.
   * @param {Polygon} b The second polygon.
   * @param {Response} [response] An optional response object that will be populated if they intersect.
   * 
   * @returns {boolean} Returns true if they intersect or false otherwise.
   */
  testPolygonPolygon(a, b, response) {
    const aPoints = a.calcPoints;
    const aLen = aPoints.length;

    const bPoints = b.calcPoints;
    const bLen = bPoints.length;

    // If any of the edge normals of A is a separating axis, no intersection.
    for (let i = 0; i < aLen; i++) {
      if (this.isSeparatingAxis(a.pos, b.pos, aPoints, bPoints, a.normals[i], response)) {
        return false;
      }
    }

    // If any of the edge normals of B is a separating axis, no intersection.
    for (let i = 0; i < bLen; i++) {
      if (this.isSeparatingAxis(a.pos, b.pos, aPoints, bPoints, b.normals[i], response)) {
        return false;
      }
    }

    // Since none of the edge normals of A or B are a separating axis, there is an intersection
    // and we've already calculated the smallest overlap (in isSeparatingAxis). 
    // Calculate the final overlap vector.
    if (response) {
      response['a'] = a;
      response['b'] = b;

      response['overlapV'].copy(response['overlapN']).scale(response['overlap']);
    }

    return true;
  }
});

/***/ }),

/***/ "./src/SAT/Vector.js":
/*!***************************!*\
  !*** ./src/SAT/Vector.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Vector)
/* harmony export */ });


/**
 * ## Vector
 * 
 * Represents a vector in two dimensions with `x` and `y` properties.
 * 
 * Create a new Vector, optionally passing in the `x` and `y` coordinates. If a coordinate is not specified, 
 * it will be set to `0`.
 */
class Vector {
  /**
   * @param {number} [x=0] The x coordinate of this Vector.
   * @param {number} [y=0] The y coordinate of this Vector.
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * Copy the values of another Vector into this one.
   * 
   * @param {*} other The other Vector.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  copy(other) {
    this.x = other.x;
    this.y = other.y;

    return this;
  }

  /**
   * Create a new Vector with the same coordinates as the one.
   * 
   * @returns {Vector} The new cloned Vector.
   */
  clone() {
    return new Vector(this.x, this.y);
  }

  /**
   * Change this Vector to be perpendicular to what it was before.
   * 
   * Effectively this rotates it 90 degrees in a clockwise direction.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  perp() {
    const x = this.x;

    this.x = this.y;
    this.y = -x;

    return this;
  }

  /**
   * Rotate this Vector (counter-clockwise) by the specified angle (in radians).
   * 
   * @param {number} angle The angle to rotate (in radians).
   * 
   * @returns {Vector} Returns this for chaining.
   */
  rotate(angle) {
    const x = this.x;
    const y = this.y;

    this.x = x * Math.cos(angle) - y * Math.sin(angle);
    this.y = x * Math.sin(angle) + y * Math.cos(angle);

    return this;
  }

  /**
   * Reverse this Vector.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  reverse() {
    this.x = -this.x;
    this.y = -this.y;

    return this;
  }

  /**
   * Normalize this vector (make it have a length of `1`).
   * 
   * @returns {Vector} Returns this for chaining.
   */
  normalize() {
    const d = this.len();

    if (d > 0) {
      this.x = this.x / d;
      this.y = this.y / d;
    }

    return this;
  }

  /**
   * Add another Vector to this one.
   * 
   * @param {Vector} other The other Vector.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  add(other) {
    this.x += other.x;
    this.y += other.y;

    return this;
  }

  /**
   * Subtract another Vector from this one.
   * 
   * @param {Vector} other The other Vector.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  sub(other) {
    this.x -= other.x;
    this.y -= other.y;

    return this;
  }

  /**
   * Scale this Vector.
   * 
   * An independent scaling factor can be provided for each axis, or a single scaling factor will scale
   * both `x` and `y`.
   * 
   * @param {number} x The scaling factor in the x direction.
   * @param {number} [y] The scaling factor in the y direction.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  scale(x, y) {
    this.x *= x;
    this.y *= typeof y != 'undefined' ? y : x;

    return this;
  }

  /**
   * Project this Vector onto another Vector.
   * 
   * @param {Vector} other The Vector to project onto.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  project(other) {
    const amt = this.dot(other) / other.len2();

    this.x = amt * other.x;
    this.y = amt * other.y;

    return this;
  }

  /**
   * Project this Vector onto a Vector of unit length.
   * 
   * This is slightly more efficient than `project` when dealing with unit vectors.
   * 
   * @param {Vector} other The unit vector to project onto.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  projectN(other) {
    const amt = this.dot(other);

    this.x = amt * other.x;
    this.y = amt * other.y;

    return this;
  }

  /**
   * Reflect this Vector on an arbitrary axis.
   * 
   * @param {Vector} axis The Vector representing the axis.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  reflect(axis) {
    const x = this.x;
    const y = this.y;

    this.project(axis).scale(2);

    this.x -= x;
    this.y -= y;

    return this;
  }

  /**
   * Reflect this Vector on an arbitrary axis.
   * 
   * This is slightly more efficient than `reflect` when dealing with an axis that is a unit vector.
   * 
   * @param {Vector} axis The Vector representing the axis.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  reflectN(axis) {
    const x = this.x;
    const y = this.y;

    this.projectN(axis).scale(2);

    this.x -= x;
    this.y -= y;

    return this;
  }

  /**
   * Get the dot product of this Vector and another.
   * 
   * @param {Vector} other The Vector to dot this one against.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  dot(other) {
    return this.x * other.x + this.y * other.y;
  }

  /**
   * Get the squared length of this Vector.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  len2() {
    return this.dot(this);
  }

  /**
   * Get the length of this Vector.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  len() {
    return Math.sqrt(this.len2());
  }
}

/***/ }),

/***/ "./src/AudioManager.ts":
/*!*****************************!*\
  !*** ./src/AudioManager.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AudioManager = void 0;
var AudioManager = (function () {
    function AudioManager() {
    }
    AudioManager.play = function (key, src, loop) {
        if (src === void 0) { src = undefined; }
        if (loop === void 0) { loop = false; }
        var audio = AudioManager.audioMap.get(key);
        if (audio === undefined) {
            if (src === undefined)
                audio = new Audio();
            else
                audio = new Audio(src);
            audio.loop = loop;
            AudioManager.audioMap.set(key, audio);
        }
        audio.play().catch(function (err) {
            console.warn(err);
            audio.setAttribute('muted', '');
            audio.muted = true;
        });
        return audio;
    };
    AudioManager.playMusic = function (src, loop) {
        if (loop === void 0) { loop = true; }
        var audio = AudioManager.audioMap.get("_music");
        if (audio !== undefined && !audio.src.endsWith(src)) {
            AudioManager.release("_music");
        }
        audio = AudioManager.play("_music", src, loop);
        audio.volume = 0.75;
        return audio;
    };
    AudioManager.pause = function (key) {
        var audio = AudioManager.audioMap.get(key);
        if (audio !== undefined) {
            audio.pause();
            return true;
        }
        return false;
    };
    AudioManager.release = function (key) {
        if (AudioManager.pause(key)) {
            AudioManager.audioMap.get(key).remove();
            return AudioManager.audioMap.delete(key);
        }
        return false;
    };
    AudioManager.autoPlayFix = function () {
        if (!AudioManager.autoPlayFixed) {
            console.info("This browser sux: trying to fix autoplay...");
            AudioManager.autoPlayFixed = true;
            AudioManager.audioMap.forEach(function (val, key) {
                if (val.muted) {
                    val.removeAttribute('muted');
                    val.muted = false;
                    if (key == "_music") {
                        val.play().catch(function (err) {
                            if (AudioManager.autoPlayFixed)
                                console.warn(err);
                            AudioManager.autoPlayFixed = false;
                            val.setAttribute('muted', '');
                            val.muted = true;
                        });
                    }
                }
            });
        }
    };
    AudioManager.audioMap = new Map();
    AudioManager.autoPlayFixed = false;
    return AudioManager;
}());
exports.AudioManager = AudioManager;


/***/ }),

/***/ "./src/Camera.ts":
/*!***********************!*\
  !*** ./src/Camera.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Camera = void 0;
var Camera = (function () {
    function Camera() {
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.sizeX = 1;
        this.sizeY = 1;
    }
    return Camera;
}());
exports.Camera = Camera;


/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Game = void 0;
var TestLevel_1 = __webpack_require__(/*! ./levels/TestLevel */ "./src/levels/TestLevel.ts");
var Camera_1 = __webpack_require__(/*! ./Camera */ "./src/Camera.ts");
var Game = (function () {
    function Game() {
    }
    Game.update = function (timestamp) {
        Game.DEBUG = Game.isButtonDown("F2");
        Game.canvas = document.getElementById("main-canvas");
        var pageAspectRatio = document.body.offsetWidth / document.body.offsetHeight;
        var scale = 25 / 19 < pageAspectRatio ? document.body.offsetHeight / 19 : document.body.offsetWidth / 25;
        Game.canvas.width = scale * 25;
        Game.canvas.height = scale * 19;
        var ctx = Game.canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
        ctx.save();
        ctx.translate(Game.camera.x, Game.camera.y);
        ctx.rotate(Game.camera.angle);
        ctx.scale(Game.camera.sizeX * (Game.canvas.width / 800), Game.camera.sizeY * (Game.canvas.height / 608));
        Game.level.update(ctx, (timestamp - Game.lastTimestamp) / 1000);
        ctx.restore();
        if (Game.isButtonDown('r')) {
            if (!Game.isPushingReload)
                this.level = this.level.instanceFabric();
            Game.isPushingReload = true;
        }
        else
            Game.isPushingReload = false;
        Game.lastTimestamp = timestamp;
    };
    Game.isButtonDown = function (keyName) {
        if (keyName.length == 1) {
            if (!Game.keyMap.has(keyName.toLowerCase()) || !Game.keyMap.get(keyName.toLowerCase())) {
                return Game.keyMap.has(keyName.toUpperCase()) && Game.keyMap.get(keyName.toUpperCase());
            }
            return true;
        }
        return Game.keyMap.has(keyName) && Game.keyMap.get(keyName);
    };
    Game.DEBUG = false;
    Game.lastTimestamp = performance.now();
    Game.level = new TestLevel_1.TestLevel();
    Game.camera = new Camera_1.Camera();
    Game.keyMap = new Map();
    Game.isPushingReload = false;
    return Game;
}());
exports.Game = Game;


/***/ }),

/***/ "./src/Utils.ts":
/*!**********************!*\
  !*** ./src/Utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.randomUnsecureUUID = void 0;
function randomUnsecureUUID() {
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
        var r = Math.floor(Math.random() * 16);
        return r.toString(16);
    });
}
exports.randomUnsecureUUID = randomUnsecureUUID;


/***/ }),

/***/ "./src/levels/BasicLevel.ts":
/*!**********************************!*\
  !*** ./src/levels/BasicLevel.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BasicLevel = void 0;
var Game_1 = __webpack_require__(/*! ../Game */ "./src/Game.ts");
var BasicLevel = (function () {
    function BasicLevel() {
        this.objects = [];
        this.removeQueue = [];
    }
    BasicLevel.prototype.update = function (ctx, delta) {
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].update(delta);
        }
        while (this.removeQueue.length != 0) {
            for (var o = 0; o < this.objects.length; o++) {
                if (this.objects[o].id == this.removeQueue[0]) {
                    this.objects.splice(o, 1);
                    break;
                }
            }
            this.removeQueue.splice(0, 1);
        }
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].draw(ctx, delta);
        }
        if (Game_1.Game.DEBUG) {
            this.drawCollisionLines(ctx);
        }
    };
    BasicLevel.prototype.removeObject = function (id) {
        this.removeQueue.push(id);
    };
    BasicLevel.prototype.isRemoved = function (id) {
        return this.removeQueue.includes(id);
    };
    BasicLevel.prototype.drawCollisionLines = function (ctx) {
        ctx.save();
        for (var i = 0; i < this.objects.length; i++) {
            var points = this.objects[i].polygon.points;
            ctx.beginPath();
            ctx.moveTo(this.objects[i].polygon.pos.x + points[0].x, this.objects[i].polygon.pos.y + points[0].y);
            for (var p = 0; p < points.length; p++) {
                if (p + 1 == points.length) {
                    ctx.lineTo(this.objects[i].polygon.pos.x + points[0].x, this.objects[i].polygon.pos.y + points[0].y);
                }
                else {
                    ctx.lineTo(this.objects[i].polygon.pos.x + points[p + 1].x, this.objects[i].polygon.pos.y + points[p + 1].y);
                }
            }
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#ff0000';
            ctx.stroke();
        }
        ctx.restore();
    };
    return BasicLevel;
}());
exports.BasicLevel = BasicLevel;


/***/ }),

/***/ "./src/levels/TestLevel.ts":
/*!*********************************!*\
  !*** ./src/levels/TestLevel.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TestLevel = void 0;
var BasicLevel_1 = __webpack_require__(/*! ./BasicLevel */ "./src/levels/BasicLevel.ts");
var PlayerObject_1 = __webpack_require__(/*! ../objects/player/PlayerObject */ "./src/objects/player/PlayerObject.ts");
var ImageObject_1 = __webpack_require__(/*! ../objects/ImageObject */ "./src/objects/ImageObject.ts");
var SpikeObject_1 = __webpack_require__(/*! ../objects/SpikeObject */ "./src/objects/SpikeObject.ts");
var AudioManager_1 = __webpack_require__(/*! ../AudioManager */ "./src/AudioManager.ts");
var TestLevel = (function (_super) {
    __extends(TestLevel, _super);
    function TestLevel() {
        var _this = _super.call(this) || this;
        AudioManager_1.AudioManager.playMusic("assets/music/begins.ogg");
        _this.objects.push(new PlayerObject_1.PlayerObject(32, 512));
        for (var i = 0; i < 25; i++) {
            _this.objects.push(new ImageObject_1.ImageObject("ground" + i, i * 32, 576, 32, 32, "assets/textures/objects/sprFallingBlock.png"));
        }
        _this.objects.push(new ImageObject_1.ImageObject("ground25", 256, 544, 32, 32, "assets/textures/objects/sprFallingBlock.png"));
        _this.objects.push(new ImageObject_1.ImageObject("ground26", 256, 512, 32, 32, "assets/textures/objects/sprFallingBlock.png"));
        _this.objects.push(new ImageObject_1.ImageObject("ground27", 256, 480, 32, 32, "assets/textures/objects/sprFallingBlock.png"));
        _this.objects.push(new ImageObject_1.ImageObject("ground28", 256, 448, 32, 32, "assets/textures/objects/sprFallingBlock.png"));
        _this.objects.push(new ImageObject_1.ImageObject("ground29", 288, 416, 32, 32, "assets/textures/objects/sprFallingBlock.png"));
        _this.objects.push(new ImageObject_1.ImageObject("ground30", 288, 384, 32, 32, "assets/textures/objects/sprFallingBlock.png"));
        _this.objects.push(new SpikeObject_1.SpikeObject("spike0", 320, 416, 1));
        _this.objects.push(new SpikeObject_1.SpikeObject("spike1", 320, 384, 1));
        _this.objects.push(new SpikeObject_1.SpikeObject("spike2", 288, 352, 0));
        return _this;
    }
    TestLevel.prototype.instanceFabric = function () {
        return new TestLevel();
    };
    return TestLevel;
}(BasicLevel_1.BasicLevel));
exports.TestLevel = TestLevel;


/***/ }),

/***/ "./src/objects/BasicObject.ts":
/*!************************************!*\
  !*** ./src/objects/BasicObject.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BasicObject = void 0;
var Game_1 = __webpack_require__(/*! ../Game */ "./src/Game.ts");
var SAT_1 = __webpack_require__(/*! ../SAT/SAT */ "./src/SAT/SAT.js");
var Response_1 = __webpack_require__(/*! ../SAT/Response */ "./src/SAT/Response.js");
var BasicObject = (function () {
    function BasicObject(id, x, y, w, h) {
        this.collision = true;
        this.id = id;
        if (w == 0 && h == 0)
            this.collision = false;
        this.polygon = new SAT_1.default.Polygon(new SAT_1.default.Vector(x, y), [
            new SAT_1.default.Vector(), new SAT_1.default.Vector(0, h),
            new SAT_1.default.Vector(w, h), new SAT_1.default.Vector(w, 0)
        ]);
    }
    BasicObject.prototype.moveBy = function (x, y) {
        var collided = false;
        this.polygon.pos.add(new SAT_1.default.Vector(x, y));
        var response = new Response_1.default();
        for (var i = 0; i < Game_1.Game.level.objects.length; i++) {
            if (!Game_1.Game.level.objects[i].collision || Game_1.Game.level.objects[i].id == this.id)
                continue;
            response.clear();
            if (SAT_1.default.testPolygonPolygon(this.polygon, Game_1.Game.level.objects[i].polygon, response)) {
                collided = true;
                var aColl = this.onCollision(response, Game_1.Game.level.objects[i]);
                var bColl = Game_1.Game.level.objects[i].onCollision(response, this);
                if (aColl && bColl && this.collision)
                    this.polygon.pos.sub(response.overlapV);
            }
        }
        return collided;
    };
    BasicObject.prototype.onCollision = function (info, obj) { return true; };
    return BasicObject;
}());
exports.BasicObject = BasicObject;


/***/ }),

/***/ "./src/objects/ImageObject.ts":
/*!************************************!*\
  !*** ./src/objects/ImageObject.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageObject = void 0;
var BasicObject_1 = __webpack_require__(/*! ./BasicObject */ "./src/objects/BasicObject.ts");
var ImageObject = (function (_super) {
    __extends(ImageObject, _super);
    function ImageObject(id, x, y, w, h, src) {
        var _this = _super.call(this, id, x, y, w, h) || this;
        _this.image = new Image();
        _this.image.src = src;
        _this.image.width = w;
        _this.image.height = h;
        return _this;
    }
    ImageObject.prototype.update = function (delta) { };
    ImageObject.prototype.draw = function (ctx, delta) {
        ctx.drawImage(this.image, this.polygon.pos.x, this.polygon.pos.y, this.image.width, this.image.height);
    };
    return ImageObject;
}(BasicObject_1.BasicObject));
exports.ImageObject = ImageObject;


/***/ }),

/***/ "./src/objects/SpikeObject.ts":
/*!************************************!*\
  !*** ./src/objects/SpikeObject.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpikeObject = void 0;
var SAT_1 = __webpack_require__(/*! ../SAT/SAT */ "./src/SAT/SAT.js");
var ImageObject_1 = __webpack_require__(/*! ./ImageObject */ "./src/objects/ImageObject.ts");
var PlayerObject_1 = __webpack_require__(/*! ./player/PlayerObject */ "./src/objects/player/PlayerObject.ts");
var SpikeObject = (function (_super) {
    __extends(SpikeObject, _super);
    function SpikeObject(id, x, y, direction) {
        var _this = _super.call(this, id, x, y, 32, 32, "assets/textures/objects/sprSpike.png") || this;
        _this.direction = direction;
        switch (_this.direction) {
            case 3:
                _this.polygon = new SAT_1.default.Polygon(new SAT_1.default.Vector(x, y), [
                    new SAT_1.default.Vector(1, 16), new SAT_1.default.Vector(31, 31), new SAT_1.default.Vector(31, 1)
                ]);
                break;
            case 2:
                _this.polygon = new SAT_1.default.Polygon(new SAT_1.default.Vector(x, y), [
                    new SAT_1.default.Vector(1, 1), new SAT_1.default.Vector(16, 31), new SAT_1.default.Vector(31, 1)
                ]);
                break;
            case 1:
                _this.polygon = new SAT_1.default.Polygon(new SAT_1.default.Vector(x, y), [
                    new SAT_1.default.Vector(1, 1), new SAT_1.default.Vector(1, 31), new SAT_1.default.Vector(31, 16)
                ]);
                break;
            default:
                _this.polygon = new SAT_1.default.Polygon(new SAT_1.default.Vector(x, y), [
                    new SAT_1.default.Vector(16, 1), new SAT_1.default.Vector(1, 31), new SAT_1.default.Vector(31, 31)
                ]);
        }
        return _this;
    }
    SpikeObject.prototype.onCollision = function (info, obj) {
        if (obj instanceof PlayerObject_1.PlayerObject) {
            obj.die();
        }
        return false;
    };
    SpikeObject.prototype.draw = function (ctx, delta) {
        ctx.drawImage(this.image, this.direction * 32, 0, 32, 32, this.polygon.pos.x, this.polygon.pos.y, 32, 32);
    };
    return SpikeObject;
}(ImageObject_1.ImageObject));
exports.SpikeObject = SpikeObject;


/***/ }),

/***/ "./src/objects/player/BloodParticle.ts":
/*!*********************************************!*\
  !*** ./src/objects/player/BloodParticle.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BloodParticle = void 0;
var Response_1 = __webpack_require__(/*! ../../SAT/Response */ "./src/SAT/Response.js");
var SAT_1 = __webpack_require__(/*! ../../SAT/SAT */ "./src/SAT/SAT.js");
var ImageObject_1 = __webpack_require__(/*! ../ImageObject */ "./src/objects/ImageObject.ts");
var PlayerObject_1 = __webpack_require__(/*! ./PlayerObject */ "./src/objects/player/PlayerObject.ts");
var Game_1 = __webpack_require__(/*! ../../Game */ "./src/Game.ts");
var SpikeObject_1 = __webpack_require__(/*! ../SpikeObject */ "./src/objects/SpikeObject.ts");
var BloodParticle = (function (_super) {
    __extends(BloodParticle, _super);
    function BloodParticle(x, y, dx, dy, id) {
        var _this = _super.call(this, id, x, y, 2, 2, "assets/textures/objects/player/sprBlood.png") || this;
        _this.dx = 0;
        _this.dy = 0;
        _this.stuck = false;
        _this.type = 0;
        _this.dx = dx;
        _this.dy = dy;
        _this.type = Math.round(Math.random() * 3);
        _this.collision = false;
        return _this;
    }
    BloodParticle.prototype.update = function (delta) {
        if (this.stuck)
            return;
        this.dy += PlayerObject_1.PlayerObject.gravity * delta;
        if (this.dx > 0) {
            this.dx -= delta;
            if (this.dx < 0)
                this.dx = 0;
        }
        else if (this.dx < 0) {
            this.dx += delta;
            if (this.dx > 0)
                this.dx = 0;
        }
        if (this.moveBy(this.dx, this.dy)) {
            this.dx = 0;
            this.dy = 0;
            this.stuck = true;
        }
    };
    BloodParticle.prototype.moveBy = function (x, y) {
        var collided = false;
        this.polygon.pos.add(new SAT_1.default.Vector(x, y));
        var response = new Response_1.default();
        for (var i = 0; i < Game_1.Game.level.objects.length; i++) {
            if (!Game_1.Game.level.objects[i].collision || Game_1.Game.level.objects[i].id == this.id)
                continue;
            response.clear();
            if (SAT_1.default.testPolygonPolygon(this.polygon, Game_1.Game.level.objects[i].polygon, response)) {
                var aColl = this.onCollision(response, Game_1.Game.level.objects[i]);
                Game_1.Game.level.objects[i].onCollision(response, this);
                if (aColl) {
                    this.polygon.pos.sub(response.overlapV);
                    collided = true;
                }
            }
        }
        return collided;
    };
    BloodParticle.prototype.onCollision = function (info, obj) {
        if (obj instanceof PlayerObject_1.PlayerObject)
            return false;
        if (obj instanceof SpikeObject_1.SpikeObject)
            return Math.random() < 0.5;
        return true;
    };
    BloodParticle.prototype.draw = function (ctx, delta) {
        ctx.drawImage(this.image, this.type * 3, 0, 3, 4, this.polygon.pos.x - 1, this.polygon.pos.y - 1, 3, 4);
    };
    return BloodParticle;
}(ImageObject_1.ImageObject));
exports.BloodParticle = BloodParticle;


/***/ }),

/***/ "./src/objects/player/BulletObject.ts":
/*!********************************************!*\
  !*** ./src/objects/player/BulletObject.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BulletObject = void 0;
var ImageObject_1 = __webpack_require__(/*! ../ImageObject */ "./src/objects/ImageObject.ts");
var PlayerObject_1 = __webpack_require__(/*! ./PlayerObject */ "./src/objects/player/PlayerObject.ts");
var Game_1 = __webpack_require__(/*! ../../Game */ "./src/Game.ts");
var SpikeObject_1 = __webpack_require__(/*! ../SpikeObject */ "./src/objects/SpikeObject.ts");
var BulletObject = (function (_super) {
    __extends(BulletObject, _super);
    function BulletObject(x, y, direction, id) {
        var _this = _super.call(this, id, x - 5, y - 1, 10, 2, "assets/textures/objects/player/sprBullet.png") || this;
        _this.frameTime = 0;
        _this.direction = direction;
        return _this;
    }
    BulletObject.prototype.update = function (delta) {
        this.moveBy(this.direction * 750 * delta, 0);
    };
    BulletObject.prototype.onCollision = function (info, obj) {
        if (obj instanceof SpikeObject_1.SpikeObject)
            return false;
        if (obj instanceof PlayerObject_1.PlayerObject)
            return false;
        Game_1.Game.level.removeObject(this.id);
        return false;
    };
    BulletObject.prototype.draw = function (ctx, delta) {
        this.frameTime += delta;
        while (this.frameTime >= 0.20)
            this.frameTime -= 0.20;
        ctx.drawImage(this.image, Math.floor(this.frameTime / 0.10) * 4, 0, 4, 4, this.polygon.pos.x + 3, this.polygon.pos.y - 1, 4, 4);
    };
    return BulletObject;
}(ImageObject_1.ImageObject));
exports.BulletObject = BulletObject;


/***/ }),

/***/ "./src/objects/player/DeathMessage.ts":
/*!********************************************!*\
  !*** ./src/objects/player/DeathMessage.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeathMessage = void 0;
var ImageObject_1 = __webpack_require__(/*! ../ImageObject */ "./src/objects/ImageObject.ts");
var DeathMessage = (function (_super) {
    __extends(DeathMessage, _super);
    function DeathMessage() {
        var _this = _super.call(this, "death_message", 400 - 350, 304 - 82, 700, 164, "assets/textures/ui/sprGameOver.png") || this;
        _this.collision = false;
        return _this;
    }
    return DeathMessage;
}(ImageObject_1.ImageObject));
exports.DeathMessage = DeathMessage;


/***/ }),

/***/ "./src/objects/player/GibParticle.ts":
/*!*******************************************!*\
  !*** ./src/objects/player/GibParticle.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GibParticle = void 0;
var Response_1 = __webpack_require__(/*! ../../SAT/Response */ "./src/SAT/Response.js");
var SAT_1 = __webpack_require__(/*! ../../SAT/SAT */ "./src/SAT/SAT.js");
var ImageObject_1 = __webpack_require__(/*! ../ImageObject */ "./src/objects/ImageObject.ts");
var PlayerObject_1 = __webpack_require__(/*! ./PlayerObject */ "./src/objects/player/PlayerObject.ts");
var Game_1 = __webpack_require__(/*! ../../Game */ "./src/Game.ts");
var SpikeObject_1 = __webpack_require__(/*! ../SpikeObject */ "./src/objects/SpikeObject.ts");
var GibParticle = (function (_super) {
    __extends(GibParticle, _super);
    function GibParticle(x, y, dx, dy, type, id) {
        var _this = _super.call(this, id, x, y, 8, 8, "assets/textures/objects/player/sprGibs.png") || this;
        _this.dx = 0;
        _this.dy = 0;
        _this.type = 0;
        _this.bodyType = 0;
        _this.dx = dx;
        _this.dy = dy;
        _this.type = type;
        _this.collision = false;
        if (_this.type == 0 || _this.type == 1) {
            _this.bodyType = Math.round(Math.random() * 32);
        }
        return _this;
    }
    GibParticle.prototype.update = function (delta) {
        this.dy += PlayerObject_1.PlayerObject.gravity * Math.min(delta, 0.3);
        if (this.dx > 0) {
            this.dx -= delta;
            if (this.dx < 0)
                this.dx = 0;
        }
        else if (this.dx < 0) {
            this.dx += delta;
            if (this.dx > 0)
                this.dx = 0;
        }
        this.moveBy(this.dx, this.dy);
    };
    GibParticle.prototype.moveBy = function (x, y) {
        var collided = false;
        var thisAABB = this.polygon.getAABB();
        this.polygon.pos.add(new SAT_1.default.Vector(x, y));
        var response = new Response_1.default();
        for (var i = 0; i < Game_1.Game.level.objects.length; i++) {
            if (!Game_1.Game.level.objects[i].collision || Game_1.Game.level.objects[i].id == this.id)
                continue;
            response.clear();
            if (SAT_1.default.testPolygonPolygon(this.polygon, Game_1.Game.level.objects[i].polygon, response)) {
                var aColl = this.onCollision(response, Game_1.Game.level.objects[i]);
                Game_1.Game.level.objects[i].onCollision(response, this);
                if (aColl) {
                    this.polygon.pos.sub(response.overlapV);
                    collided = true;
                    var objtAABB = Game_1.Game.level.objects[i].polygon.getAABB();
                    if (thisAABB.pos.y + thisAABB.points[2].y <= objtAABB.pos.y
                        || thisAABB.pos.y >= objtAABB.pos.y + objtAABB.points[2].y) {
                        this.dy *= -0.75;
                    }
                    else {
                        this.dx *= -0.75;
                    }
                }
            }
        }
        return collided;
    };
    GibParticle.prototype.onCollision = function (info, obj) {
        if (obj instanceof PlayerObject_1.PlayerObject || obj instanceof SpikeObject_1.SpikeObject)
            return false;
        return true;
    };
    GibParticle.prototype.draw = function (ctx, delta) {
        switch (this.type) {
            case 0:
                ctx.drawImage(this.image, this.bodyType * 2, 0, 2, 9, this.polygon.pos.x + 4, this.polygon.pos.y, 2, 9);
                break;
            case 1:
                ctx.drawImage(this.image, this.bodyType * 2, 9, 2, 9, this.polygon.pos.x + 4, this.polygon.pos.y, 2, 9);
                break;
            case 2:
                ctx.drawImage(this.image, 0, 18, 10, 16, this.polygon.pos.x, this.polygon.pos.y, 10, 16);
                break;
            case 3:
                ctx.drawImage(this.image, 10, 18, 10, 16, this.polygon.pos.x, this.polygon.pos.y, 10, 16);
                break;
            case 4:
                ctx.drawImage(this.image, 20, 18, 8, 8, this.polygon.pos.x, this.polygon.pos.y, 8, 8);
                break;
            case 5:
                ctx.drawImage(this.image, 28, 18, 8, 8, this.polygon.pos.x, this.polygon.pos.y, 8, 8);
                break;
            case 6:
                ctx.drawImage(this.image, 36, 18, 4, 4, this.polygon.pos.x + 2, this.polygon.pos.y + 4, 4, 4);
                break;
            case 7:
                ctx.drawImage(this.image, 36, 22, 4, 4, this.polygon.pos.x + 2, this.polygon.pos.y + 4, 4, 4);
        }
    };
    return GibParticle;
}(ImageObject_1.ImageObject));
exports.GibParticle = GibParticle;


/***/ }),

/***/ "./src/objects/player/PlayerObject.ts":
/*!********************************************!*\
  !*** ./src/objects/player/PlayerObject.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlayerObject = void 0;
var Game_1 = __webpack_require__(/*! ../../Game */ "./src/Game.ts");
var ImageObject_1 = __webpack_require__(/*! ../ImageObject */ "./src/objects/ImageObject.ts");
var BulletObject_1 = __webpack_require__(/*! ./BulletObject */ "./src/objects/player/BulletObject.ts");
var Utils_1 = __webpack_require__(/*! ../../Utils */ "./src/Utils.ts");
var SAT_1 = __webpack_require__(/*! ../../SAT/SAT */ "./src/SAT/SAT.js");
var Vector_1 = __webpack_require__(/*! ../../SAT/Vector */ "./src/SAT/Vector.js");
var BloodParticle_1 = __webpack_require__(/*! ./BloodParticle */ "./src/objects/player/BloodParticle.ts");
var GibParticle_1 = __webpack_require__(/*! ./GibParticle */ "./src/objects/player/GibParticle.ts");
var DeathMessage_1 = __webpack_require__(/*! ./DeathMessage */ "./src/objects/player/DeathMessage.ts");
var AudioManager_1 = __webpack_require__(/*! ../../AudioManager */ "./src/AudioManager.ts");
var PlayerObject = (function (_super) {
    __extends(PlayerObject, _super);
    function PlayerObject(x, y, id) {
        if (id === void 0) { id = "player"; }
        var _this = _super.call(this, id, x, y, 32, 32, "assets/textures/objects/player/sprPlayer.png") || this;
        _this.frameTime = 0;
        _this.lookingDirection = 1;
        _this.rightKeyTime = 0;
        _this.leftKeyTime = 0;
        _this.jumpKeyTime = 0;
        _this.shootKeyTime = 0;
        _this.dx = 0;
        _this.dy = 1;
        _this.onGround = false;
        _this.availableJumps = 0;
        _this.polygon = new SAT_1.default.Polygon(new SAT_1.default.Vector(x, y), [
            new SAT_1.default.Vector(9, 11), new SAT_1.default.Vector(9, 32),
            new SAT_1.default.Vector(23, 32), new SAT_1.default.Vector(23, 11)
        ]);
        return _this;
    }
    PlayerObject.prototype.update = function (delta) {
        this.dy += PlayerObject.gravity * delta;
        this.dx = 0;
        if (Game_1.Game.isButtonDown('ArrowRight')) {
            this.rightKeyTime++;
            if (this.leftKeyTime == 0 || this.rightKeyTime < this.leftKeyTime) {
                this.dx = PlayerObject.velocity * delta;
            }
        }
        else
            this.rightKeyTime = 0;
        if (Game_1.Game.isButtonDown('ArrowLeft')) {
            this.leftKeyTime++;
            if (this.rightKeyTime == 0 || this.leftKeyTime < this.rightKeyTime) {
                this.dx = -PlayerObject.velocity * delta;
            }
        }
        else
            this.leftKeyTime = 0;
        if (Game_1.Game.isButtonDown('z')) {
            if (this.shootKeyTime == 0) {
                var bulletId_1 = "bullet" + (0, Utils_1.randomUnsecureUUID)();
                AudioManager_1.AudioManager.play(bulletId_1, "assets/sounds/fire.wav").onended = function (e) { AudioManager_1.AudioManager.release(bulletId_1); };
                Game_1.Game.level.objects.push(new BulletObject_1.BulletObject(this.polygon.pos.x + 16 + 10 * this.lookingDirection, this.polygon.pos.y + 21, this.lookingDirection, bulletId_1));
            }
            this.shootKeyTime++;
        }
        else
            this.shootKeyTime = 0;
        if (Game_1.Game.isButtonDown('Shift') && (this.availableJumps != 0 || this.jumpKeyTime != 0)) {
            if (this.jumpKeyTime == 0) {
                this.availableJumps--;
                if (this.availableJumps == 1)
                    AudioManager_1.AudioManager.play("jump1", "assets/sounds/jump1.wav");
                else
                    AudioManager_1.AudioManager.play("jump2", "assets/sounds/jump2.wav");
            }
            this.jumpKeyTime += delta;
            if (this.jumpKeyTime - delta < 0.3) {
                if (this.jumpKeyTime < 0.3) {
                    if (this.availableJumps == 1)
                        this.dy = -220 * delta;
                    else
                        this.dy = -180 * delta;
                }
                else {
                    if (this.availableJumps == 1)
                        this.dy = -220 * (this.jumpKeyTime - 0.3);
                    else
                        this.dy = -180 * (this.jumpKeyTime - 0.3);
                }
            }
        }
        else
            this.jumpKeyTime = 0;
        if (this.dx != 0)
            this.lookingDirection = Math.sign(this.dx);
        this.dy = Math.max(Math.min(this.dy, 10.666), -10.666);
        var previousPos = (new Vector_1.default()).copy(this.polygon.pos);
        this.onGround = false;
        if (this.moveBy(this.dx, this.dy)) {
            if (this.dy > 0 && this.polygon.pos.y == previousPos.y) {
                this.dy = 1;
                this.onGround = true;
                this.availableJumps = 2;
            }
        }
        if (!this.onGround && this.availableJumps > 1)
            this.availableJumps = 1;
    };
    PlayerObject.prototype.die = function () {
        if (Game_1.Game.level.isRemoved(this.id))
            return;
        Game_1.Game.level.removeObject(this.id);
        var center = this.polygon.getCentroid().add(this.polygon.pos);
        for (var i = 0; i < 128; i++) {
            Game_1.Game.level.objects.push(new BloodParticle_1.BloodParticle(center.x, center.y, Math.cos(Math.PI * 2 / 48 * i) * Math.random() * 6, Math.sin(Math.PI * 2 / 48 * i) * Math.random() * 10, "blood" + (0, Utils_1.randomUnsecureUUID)()));
        }
        for (var i = 0; i < 8; i += 2) {
            for (var o = 0; o < (i > 3 ? 2 : 1); o++) {
                Game_1.Game.level.objects.push(new GibParticle_1.GibParticle(center.x, center.y, Math.cos(Math.random() * Math.PI * 2) * Math.random() * 4, Math.sin(Math.random() * Math.PI * 2) * Math.random() * 4, i, "gib" + (0, Utils_1.randomUnsecureUUID)()));
            }
        }
        AudioManager_1.AudioManager.playMusic("assets/music/gameover.ogg", false);
        Game_1.Game.level.objects.push(new DeathMessage_1.DeathMessage());
    };
    PlayerObject.prototype.draw = function (ctx, delta) {
        this.frameTime += delta;
        while (this.frameTime >= 0.40)
            this.frameTime -= 0.40;
        var frame = Math.floor(this.frameTime / 0.10);
        ctx.save();
        if (this.lookingDirection == -1) {
            ctx.translate(Game_1.Game.canvas.width - this.polygon.pos.x, this.polygon.pos.y);
            ctx.scale(-1, 1);
            ctx.translate(Game_1.Game.canvas.width - this.polygon.pos.x * 2 - 32, 0);
        }
        else {
            ctx.translate(this.polygon.pos.x, this.polygon.pos.y);
        }
        if (this.dy < 0) {
            if (this.jumpKeyTime != 0 && this.jumpKeyTime < 0.02) {
                ctx.drawImage(this.image, 0, 64, 32, 32, 0, 0, 32, 32);
            }
            else if (this.jumpKeyTime != 0 && this.jumpKeyTime < 0.04) {
                ctx.drawImage(this.image, 32, 64, 32, 32, 0, 0, 32, 32);
            }
            else {
                ctx.drawImage(this.image, (frame % 2) * 32 + 64, 64, 32, 32, 0, 0, 32, 32);
            }
        }
        else if (!this.onGround) {
            ctx.drawImage(this.image, (frame % 2) * 32, 96, 32, 32, 0, 0, 32, 32);
        }
        else if (this.dx != 0) {
            ctx.drawImage(this.image, frame * 32, 32, 32, 32, 0, 0, 32, 32);
        }
        else {
            ctx.drawImage(this.image, frame * 32, 0, 32, 32, 0, 0, 32, 32);
        }
        ctx.restore();
    };
    PlayerObject.velocity = 175;
    PlayerObject.gravity = 24;
    return PlayerObject;
}(ImageObject_1.ImageObject));
exports.PlayerObject = PlayerObject;


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/Main.ts ***!
  \*********************/

/*!
* I Wanna Be The Guy: The Movie: The Game
* TypeScript remake made by PGgamer2 (aka SonoPG).
* You can find the source code here: https://github.com/PGgamer2/IWBTG.ts
* Original game made by Kayin: https://kayin.moe/iwbtg/
*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
var AudioManager_1 = __webpack_require__(/*! ./AudioManager */ "./src/AudioManager.ts");
var Game_1 = __webpack_require__(/*! ./Game */ "./src/Game.ts");
function frame(timestamp) {
    Game_1.Game.update(timestamp);
    window.requestAnimationFrame(frame);
}
window.requestAnimationFrame(frame);
onkeydown = function (e) {
    Game_1.Game.keyMap.set(e.key, true);
    AudioManager_1.AudioManager.autoPlayFix();
};
onkeyup = function (e) { Game_1.Game.keyMap.set(e.key, false); };

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsVUFBVTtBQUN2QjtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEIsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsVUFBVTtBQUN2QjtBQUNBLGVBQWUsU0FBUztB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QUFDeEMsQ0FBQztBQUNELE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUVwQyxTQUFTLEdBQUcsVUFBUyxDQUFDO0lBQ2xCLFdBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0IsMkJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUMvQixDQUFDLENBQUM7QUFDRixPQUFPLEdBQUcsVUFBUyxDQUFDLElBQUksV0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9TQVQvQm94LmpzIiwid2VicGFjazovLy8uL3NyYy9TQVQvQ2lyY2xlLmpzIiwid2VicGFjazovLy8uL3NyYy9TQVQvUG9seWdvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvU0FUL1Jlc3BvbnNlLmpzIiwid2VicGFjazovLy8uL3NyYy9TQVQvU0FULmpzIiwid2VicGFjazovLy8uL3NyYy9TQVQvVmVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9BdWRpb01hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NhbWVyYS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvR2FtZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xldmVscy9CYXNpY0xldmVsLnRzIiwid2VicGFjazovLy8uL3NyYy9sZXZlbHMvVGVzdExldmVsLnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL0Jhc2ljT2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL0ltYWdlT2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL1NwaWtlT2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL3BsYXllci9CbG9vZFBhcnRpY2xlLnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL3BsYXllci9CdWxsZXRPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvcGxheWVyL0RlYXRoTWVzc2FnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9wbGF5ZXIvR2liUGFydGljbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvcGxheWVyL1BsYXllck9iamVjdC50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvTWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxuaW1wb3J0IFZlY3RvciBmcm9tICcuL1ZlY3Rvcic7XG5pbXBvcnQgUG9seWdvbiBmcm9tICcuL1BvbHlnb24nO1xuXG4vKipcbiAqICMjIEJveFxuICogXG4gKiBSZXByZXNlbnRzIGFuIGF4aXMtYWxpZ25lZCBib3gsIHdpdGggYSB3aWR0aCBhbmQgaGVpZ2h0LlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3gge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBCb3gsIHdpdGggdGhlIHNwZWNpZmllZCBwb3NpdGlvbiwgd2lkdGgsIGFuZCBoZWlnaHQuXG4gICAqIFxuICAgKiBJZiBubyBwb3NpdGlvbiBpcyBnaXZlbiwgdGhlIHBvc2l0aW9uIHdpbGwgYmUgYCgwLCAwKWAuIElmIG5vIHdpZHRoIG9yIGhlaWdodCBhcmUgZ2l2ZW4sIHRoZXkgd2lsbFxuICAgKiBiZSBzZXQgdG8gYDBgLlxuICAgKiBcbiAgICogQHBhcmFtIHtWZWN0b3J9IFtwb3M9bmV3IFZlY3RvcigpXSBBIFZlY3RvciByZXByZXNlbnRpbmcgdGhlIGJvdHRvbS1sZWZ0IG9mIHRoZSBib3goaS5lLiB0aGUgc21hbGxlc3QgeCBhbmQgc21hbGxlc3QgeSB2YWx1ZSkuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbdz0wXSBUaGUgd2lkdGggb2YgdGhlIEJveC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtoPTBdIFRoZSBoZWlnaHQgb2YgdGhlIEJveC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHBvcyA9IG5ldyBWZWN0b3IoKSwgdyA9IDAsIGggPSAwKSB7XG4gICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgdGhpcy53ID0gdztcbiAgICB0aGlzLmggPSBoO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBQb2x5Z29uIHdob3NlIGVkZ2VzIGFyZSB0aGUgc2FtZSBhcyB0aGlzIEJveC5cbiAgICogXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBBIG5ldyBQb2x5Z29uIHRoYXQgcmVwcmVzZW50cyB0aGlzIEJveC5cbiAgICovXG4gIHRvUG9seWdvbigpIHtcbiAgICBjb25zdCBwb3MgPSB0aGlzLnBvcztcbiAgICBjb25zdCB3ID0gdGhpcy53O1xuICAgIGNvbnN0IGggPSB0aGlzLmg7XG5cbiAgICByZXR1cm4gbmV3IFBvbHlnb24obmV3IFZlY3Rvcihwb3MueCwgcG9zLnkpLCBbXG4gICAgICBuZXcgVmVjdG9yKCksIG5ldyBWZWN0b3IodywgMCksXG4gICAgICBuZXcgVmVjdG9yKHcsIGgpLCBuZXcgVmVjdG9yKDAsIGgpXG4gICAgXSk7XG4gIH1cbn0iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IFZlY3RvciBmcm9tICcuL1ZlY3Rvcic7XG5pbXBvcnQgQm94IGZyb20gJy4vQm94JztcblxuLyoqXG4gKiAjIyBDaXJjbGVcbiAqIFxuICogUmVwcmVzZW50cyBhIGNpcmNsZSB3aXRoIGEgcG9zaXRpb24gYW5kIGEgcmFkaXVzLlxuICogXG4gKiBDcmVhdGVzIGEgbmV3IENpcmNsZSwgb3B0aW9uYWxseSBwYXNzaW5nIGluIGEgcG9zaXRpb24gYW5kL29yIHJhZGl1cy4gSWYgbm8gcG9zaXRpb25cbiAqIGlzIGdpdmVuLCB0aGUgQ2lyY2xlIHdpbGwgYmUgYXQgYCgwLDApYC4gSWYgbm8gcmFkaXVzIGlzIHByb3ZpZGVkIHRoZSBjaXJjbGUgd2lsbCBoYXZlXG4gKiBhIHJhZGl1cyBvZiBgMGAuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpcmNsZSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gcG9zIEEgVmVjdG9yIHJlcHJlc2VudGluZyB0aGUgY2VudGVyIG9mIHRoaXMgQ2lyY2xlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gciBUaGUgcmFkaXVzIG9mIHRoaXMgQ2lyY2xlLiBcbiAgICovXG4gIGNvbnN0cnVjdG9yKHBvcyA9IG5ldyBWZWN0b3IoKSwgciA9IDApIHtcbiAgICB0aGlzLnBvcyA9IHBvcztcbiAgICB0aGlzLnIgPSByO1xuICAgIHRoaXMub2Zmc2V0ID0gbmV3IFZlY3RvcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXB1dGUgdGhlIGF4aXMtYWxpZ25lZCBib3VuZGluZyBib3ggKEFBQkIpIG9mIHRoaXMgQ2lyY2xlLlxuICAgKiBcbiAgICogTm90ZTogUmV0dXJucyBhIF9uZXdfIGBQb2x5Z29uYCBlYWNoIHRpbWUgeW91IGNhbGwgdGhpcy5cbiAgICogXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIHRoZSBBQUJCLlxuICAgKi9cbiAgZ2V0QUFCQigpIHtcbiAgICBjb25zdCByID0gdGhpcy5yO1xuXG4gICAgY29uc3QgY29ybmVyID0gdGhpcy5wb3MuY2xvbmUoKS5hZGQodGhpcy5vZmZzZXQpLnN1YihuZXcgVmVjdG9yKHIsIHIpKTtcblxuICAgIHJldHVybiBuZXcgQm94KGNvcm5lciwgciAqIDIsIHIgKiAyKS50b1BvbHlnb24oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGN1cnJlbnQgb2Zmc2V0IHRvIGFwcGx5IHRvIHRoZSByYWRpdXMuXG4gICAqIFxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb2Zmc2V0IFRoZSBuZXcgb2Zmc2V0IFZlY3Rvci5cbiAgICogXG4gICAqIEByZXR1cm5zIHtDaXJjbGV9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBzZXRPZmZzZXQob2Zmc2V0KSB7XG4gICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufSIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4vVmVjdG9yJztcbmltcG9ydCBCb3ggZnJvbSAnLi9Cb3gnO1xuXG4vKipcbiAqICMjIFBvbHlnb25cbiAqIFxuICogUmVwcmVzZW50cyBhICpjb252ZXgqIHBvbHlnb24gd2l0aCBhbnkgbnVtYmVyIG9mIHBvaW50cyAoc3BlY2lmaWVkIGluIGNvdW50ZXItY2xvY2t3aXNlIG9yZGVyKS5cbiAqIFxuICogTm90ZTogRG8gX25vdF8gbWFudWFsbHkgY2hhbmdlIHRoZSBgcG9pbnRzYCwgYGFuZ2xlYCwgb3IgYG9mZnNldGAgcHJvcGVydGllcy4gVXNlIHRoZSBwcm92aWRlZCBcbiAqIHNldHRlcnMuIE90aGVyd2lzZSB0aGUgY2FsY3VsYXRlZCBwcm9wZXJ0aWVzIHdpbGwgbm90IGJlIHVwZGF0ZWQgY29ycmVjdGx5LlxuICogXG4gKiBgcG9zYCBjYW4gYmUgY2hhbmdlZCBkaXJlY3RseS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9seWdvbiB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgcG9seWdvbiwgcGFzc2luZyBpbiBhIHBvc2l0aW9uIHZlY3RvciwgYW5kIGFuIGFycmF5IG9mIHBvaW50cyAocmVwcmVzZW50ZWQgYnkgdmVjdG9ycyBcbiAgICogcmVsYXRpdmUgdG8gdGhlIHBvc2l0aW9uIHZlY3RvcikuIElmIG5vIHBvc2l0aW9uIGlzIHBhc3NlZCBpbiwgdGhlIHBvc2l0aW9uIG9mIHRoZSBwb2x5Z29uIHdpbGwgYmUgYCgwLDApYC5cbiAgICogXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBbcG9zPVZlY3Rvcl0gQSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBvcmlnaW4gb2YgdGhlIHBvbHlnb24gKGFsbCBvdGhlciBwb2ludHMgYXJlIHJlbGF0aXZlIHRvIHRoaXMgb25lKVxuICAgKiBAcGFyYW0ge0FycmF5PFZlY3Rvcj59IFtwb2ludHM9W11dIEFuIGFycmF5IG9mIHZlY3RvcnMgcmVwcmVzZW50aW5nIHRoZSBwb2ludHMgaW4gdGhlIHBvbHlnb24sIGluIGNvdW50ZXItY2xvY2t3aXNlIG9yZGVyLlxuICAgKi9cbiAgY29uc3RydWN0b3IocG9zID0gbmV3IFZlY3RvcigpLCBwb2ludHMgPSBbXSkge1xuICAgIHRoaXMucG9zID0gcG9zO1xuICAgIHRoaXMuYW5nbGUgPSAwO1xuICAgIHRoaXMub2Zmc2V0ID0gbmV3IFZlY3RvcigpO1xuXG4gICAgdGhpcy5zZXRQb2ludHMocG9pbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHBvaW50cyBvZiB0aGUgcG9seWdvbi4gQW55IGNvbnNlY3V0aXZlIGR1cGxpY2F0ZSBwb2ludHMgd2lsbCBiZSBjb21iaW5lZC5cbiAgICogXG4gICAqIE5vdGU6IFRoZSBwb2ludHMgYXJlIGNvdW50ZXItY2xvY2t3aXNlICp3aXRoIHJlc3BlY3QgdG8gdGhlIGNvb3JkaW5hdGUgc3lzdGVtKi4gSWYgeW91IGRpcmVjdGx5IGRyYXcgdGhlIHBvaW50cyBvbiBhIHNjcmVlbiBcbiAgICogdGhhdCBoYXMgdGhlIG9yaWdpbiBhdCB0aGUgdG9wLWxlZnQgY29ybmVyIGl0IHdpbGwgX2FwcGVhcl8gdmlzdWFsbHkgdGhhdCB0aGUgcG9pbnRzIGFyZSBiZWluZyBzcGVjaWZpZWQgY2xvY2t3aXNlLiBUaGlzIGlzIFxuICAgKiBqdXN0IGJlY2F1c2Ugb2YgdGhlIGludmVyc2lvbiBvZiB0aGUgWS1heGlzIHdoZW4gYmVpbmcgZGlzcGxheWVkLlxuICAgKiBcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBwb2ludHMgQW4gYXJyYXkgb2YgdmVjdG9ycyByZXByZXNlbnRpbmcgdGhlIHBvaW50cyBpbiB0aGUgcG9seWdvbiwgaW4gY291bnRlci1jbG9ja3dpc2Ugb3JkZXIuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIHNldFBvaW50cyhwb2ludHMpIHtcbiAgICAvLyBPbmx5IHJlLWFsbG9jYXRlIGlmIHRoaXMgaXMgYSBuZXcgcG9seWdvbiBvciB0aGUgbnVtYmVyIG9mIHBvaW50cyBoYXMgY2hhbmdlZC5cbiAgICBjb25zdCBsZW5ndGhDaGFuZ2VkID0gIXRoaXMucG9pbnRzIHx8IHRoaXMucG9pbnRzLmxlbmd0aCAhPT0gcG9pbnRzLmxlbmd0aDtcblxuICAgIGlmIChsZW5ndGhDaGFuZ2VkKSB7XG4gICAgICBsZXQgaTtcblxuICAgICAgY29uc3QgY2FsY1BvaW50cyA9IHRoaXMuY2FsY1BvaW50cyA9IFtdO1xuICAgICAgY29uc3QgZWRnZXMgPSB0aGlzLmVkZ2VzID0gW107XG4gICAgICBjb25zdCBub3JtYWxzID0gdGhpcy5ub3JtYWxzID0gW107XG5cbiAgICAgIC8vIEFsbG9jYXRlIHRoZSB2ZWN0b3IgYXJyYXlzIGZvciB0aGUgY2FsY3VsYXRlZCBwcm9wZXJ0aWVzXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIFJlbW92ZSBjb25zZWN1dGl2ZSBkdXBsaWNhdGUgcG9pbnRzXG4gICAgICAgIGNvbnN0IHAxID0gcG9pbnRzW2ldO1xuICAgICAgICBjb25zdCBwMiA9IGkgPCBwb2ludHMubGVuZ3RoIC0gMSA/IHBvaW50c1tpICsgMV0gOiBwb2ludHNbMF07XG5cbiAgICAgICAgaWYgKHAxICE9PSBwMiAmJiBwMS54ID09PSBwMi54ICYmIHAxLnkgPT09IHAyLnkpIHtcbiAgICAgICAgICBwb2ludHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGkgLT0gMTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGNQb2ludHMucHVzaChuZXcgVmVjdG9yKCkpO1xuICAgICAgICBlZGdlcy5wdXNoKG5ldyBWZWN0b3IoKSk7XG4gICAgICAgIG5vcm1hbHMucHVzaChuZXcgVmVjdG9yKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucG9pbnRzID0gcG9pbnRzO1xuXG4gICAgdGhpcy5fcmVjYWxjKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGN1cnJlbnQgcm90YXRpb24gYW5nbGUgb2YgdGhlIHBvbHlnb24uXG4gICAqIFxuICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgVGhlIGN1cnJlbnQgcm90YXRpb24gYW5nbGUgKGluIHJhZGlhbnMpLlxuICAgKiBcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBzZXRBbmdsZShhbmdsZSkge1xuICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcblxuICAgIHRoaXMuX3JlY2FsYygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBjdXJyZW50IG9mZnNldCB0byBhcHBseSB0byB0aGUgYHBvaW50c2AgYmVmb3JlIGFwcGx5aW5nIHRoZSBgYW5nbGVgIHJvdGF0aW9uLlxuICAgKiBcbiAgICogQHBhcmFtIHtWZWN0b3J9IG9mZnNldCBUaGUgbmV3IG9mZnNldCBWZWN0b3IuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIHNldE9mZnNldChvZmZzZXQpIHtcbiAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcblxuICAgIHRoaXMuX3JlY2FsYygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUm90YXRlcyB0aGlzIFBvbHlnb24gY291bnRlci1jbG9ja3dpc2UgYXJvdW5kIHRoZSBvcmlnaW4gb2YgKml0cyBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSogKGkuZS4gYHBvc2ApLlxuICAgKiBcbiAgICogTm90ZTogVGhpcyBjaGFuZ2VzIHRoZSAqKm9yaWdpbmFsKiogcG9pbnRzIChzbyBhbnkgYGFuZ2xlYCB3aWxsIGJlIGFwcGxpZWQgb24gdG9wIG9mIHRoaXMgcm90YXRpb24pLlxuICAgKiBcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIFRoZSBhbmdsZSB0byByb3RhdGUgKGluIHJhZGlhbnMpLlxuICAgKiBcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICByb3RhdGUoYW5nbGUpIHtcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLnBvaW50cztcbiAgICBjb25zdCBsZW4gPSBwb2ludHMubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykgcG9pbnRzW2ldLnJvdGF0ZShhbmdsZSk7XG5cbiAgICB0aGlzLl9yZWNhbGMoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zbGF0ZXMgdGhlIHBvaW50cyBvZiB0aGlzIHBvbHlnb24gYnkgYSBzcGVjaWZpZWQgYW1vdW50IHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4gb2YgKml0cyBvd24gY29vcmRpbmF0ZSBzeXN0ZW0qIChpLmUuIGBwb3NgKS5cbiAgICogXG4gICAqIE5vdGU6IFRoaXMgY2hhbmdlcyB0aGUgKipvcmlnaW5hbCoqIHBvaW50cyAoc28gYW55IGBvZmZzZXRgIHdpbGwgYmUgYXBwbGllZCBvbiB0b3Agb2YgdGhpcyB0cmFuc2xhdGlvbilcbiAgICogXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IFRoZSBob3Jpem9udGFsIGFtb3VudCB0byB0cmFuc2xhdGUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IFRoZSB2ZXJ0aWNhbCBhbW91bnQgdG8gdHJhbnNsYXRlLlxuICAgKiBcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICB0cmFuc2xhdGUoeCwgeSkge1xuICAgIGNvbnN0IHBvaW50cyA9IHRoaXMucG9pbnRzO1xuICAgIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBwb2ludHNbaV0ueCArPSB4O1xuICAgICAgcG9pbnRzW2ldLnkgKz0geTtcbiAgICB9XG5cbiAgICB0aGlzLl9yZWNhbGMoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXB1dGVzIHRoZSBjYWxjdWxhdGVkIGNvbGxpc2lvbiBQb2x5Z29uLlxuICAgKiBcbiAgICogVGhpcyBhcHBsaWVzIHRoZSBgYW5nbGVgIGFuZCBgb2Zmc2V0YCB0byB0aGUgb3JpZ2luYWwgcG9pbnRzIHRoZW4gcmVjYWxjdWxhdGVzIHRoZSBlZGdlcyBhbmQgbm9ybWFscyBvZiB0aGUgY29sbGlzaW9uIFBvbHlnb24uXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKiBcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBfcmVjYWxjKCkge1xuICAgIC8vIENhbGN1bGF0ZWQgcG9pbnRzIC0gdGhpcyBpcyB3aGF0IGlzIHVzZWQgZm9yIHVuZGVybHlpbmcgY29sbGlzaW9ucyBhbmQgdGFrZXMgaW50byBhY2NvdW50XG4gICAgLy8gdGhlIGFuZ2xlL29mZnNldCBzZXQgb24gdGhlIHBvbHlnb24uXG4gICAgY29uc3QgY2FsY1BvaW50cyA9IHRoaXMuY2FsY1BvaW50cztcblxuICAgIC8vIFRoZSBlZGdlcyBoZXJlIGFyZSB0aGUgZGlyZWN0aW9uIG9mIHRoZSBgbmB0aCBlZGdlIG9mIHRoZSBwb2x5Z29uLCByZWxhdGl2ZSB0b1xuICAgIC8vIHRoZSBgbmB0aCBwb2ludC4gSWYgeW91IHdhbnQgdG8gZHJhdyBhIGdpdmVuIGVkZ2UgZnJvbSB0aGUgZWRnZSB2YWx1ZSwgeW91IG11c3RcbiAgICAvLyBmaXJzdCB0cmFuc2xhdGUgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBzdGFydGluZyBwb2ludC5cbiAgICBjb25zdCBlZGdlcyA9IHRoaXMuZWRnZXM7XG5cbiAgICAvLyBUaGUgbm9ybWFscyBoZXJlIGFyZSB0aGUgZGlyZWN0aW9uIG9mIHRoZSBub3JtYWwgZm9yIHRoZSBgbmB0aCBlZGdlIG9mIHRoZSBwb2x5Z29uLCByZWxhdGl2ZVxuICAgIC8vIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgYG5gdGggcG9pbnQuIElmIHlvdSB3YW50IHRvIGRyYXcgYW4gZWRnZSBub3JtYWwsIHlvdSBtdXN0IGZpcnN0XG4gICAgLy8gdHJhbnNsYXRlIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgc3RhcnRpbmcgcG9pbnQuXG4gICAgY29uc3Qgbm9ybWFscyA9IHRoaXMubm9ybWFscztcblxuICAgIC8vIENvcHkgdGhlIG9yaWdpbmFsIHBvaW50cyBhcnJheSBhbmQgYXBwbHkgdGhlIG9mZnNldC9hbmdsZVxuICAgIGNvbnN0IHBvaW50cyA9IHRoaXMucG9pbnRzO1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgIGNvbnN0IGFuZ2xlID0gdGhpcy5hbmdsZTtcblxuICAgIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XG4gICAgbGV0IGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IGNhbGNQb2ludCA9IGNhbGNQb2ludHNbaV0uY29weShwb2ludHNbaV0pO1xuXG4gICAgICBjYWxjUG9pbnQueCArPSBvZmZzZXQueDtcbiAgICAgIGNhbGNQb2ludC55ICs9IG9mZnNldC55O1xuXG4gICAgICBpZiAoYW5nbGUgIT09IDApIGNhbGNQb2ludC5yb3RhdGUoYW5nbGUpO1xuICAgIH1cblxuICAgIC8vIENhbGN1bGF0ZSB0aGUgZWRnZXMvbm9ybWFsc1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgcDEgPSBjYWxjUG9pbnRzW2ldO1xuICAgICAgY29uc3QgcDIgPSBpIDwgbGVuIC0gMSA/IGNhbGNQb2ludHNbaSArIDFdIDogY2FsY1BvaW50c1swXTtcblxuICAgICAgY29uc3QgZSA9IGVkZ2VzW2ldLmNvcHkocDIpLnN1YihwMSk7XG5cbiAgICAgIG5vcm1hbHNbaV0uY29weShlKS5wZXJwKCkubm9ybWFsaXplKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQ29tcHV0ZSB0aGUgYXhpcy1hbGlnbmVkIGJvdW5kaW5nIGJveC5cbiAgICogXG4gICAqIEFueSBjdXJyZW50IHN0YXRlICh0cmFuc2xhdGlvbnMvcm90YXRpb25zKSB3aWxsIGJlIGFwcGxpZWQgYmVmb3JlIGNvbnN0cnVjdGluZyB0aGUgQUFCQi5cbiAgICogXG4gICAqIE5vdGU6IFJldHVybnMgYSBfbmV3XyBgUG9seWdvbmAgZWFjaCB0aW1lIHlvdSBjYWxsIHRoaXMuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIGdldEFBQkIoKSB7XG4gICAgY29uc3QgcG9pbnRzID0gdGhpcy5jYWxjUG9pbnRzO1xuXG4gICAgbGV0IHhNaW4gPSBwb2ludHNbMF0ueDtcbiAgICBsZXQgeU1pbiA9IHBvaW50c1swXS55O1xuXG4gICAgbGV0IHhNYXggPSBwb2ludHNbMF0ueDtcbiAgICBsZXQgeU1heCA9IHBvaW50c1swXS55O1xuXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHBvaW50ID0gcG9pbnRzW2ldO1xuXG4gICAgICBpZiAocG9pbnRbXCJ4XCJdIDwgeE1pbikgeE1pbiA9IHBvaW50W1wieFwiXTtcbiAgICAgIGVsc2UgaWYgKHBvaW50W1wieFwiXSA+IHhNYXgpIHhNYXggPSBwb2ludFtcInhcIl07XG5cbiAgICAgIGlmIChwb2ludFtcInlcIl0gPCB5TWluKSB5TWluID0gcG9pbnRbXCJ5XCJdO1xuICAgICAgZWxzZSBpZiAocG9pbnRbXCJ5XCJdID4geU1heCkgeU1heCA9IHBvaW50W1wieVwiXTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEJveCh0aGlzWydwb3MnXS5jbG9uZSgpLmFkZChuZXcgVmVjdG9yKHhNaW4sIHlNaW4pKSwgeE1heCAtIHhNaW4sIHlNYXggLSB5TWluKS50b1BvbHlnb24oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wdXRlIHRoZSBjZW50cm9pZCAoZ2VvbWV0cmljIGNlbnRlcikgb2YgdGhlIFBvbHlnb24uXG4gICAqIFxuICAgKiBBbnkgY3VycmVudCBzdGF0ZSAodHJhbnNsYXRpb25zL3JvdGF0aW9ucykgd2lsbCBiZSBhcHBsaWVkIGJlZm9yZSBjb21wdXRpbmcgdGhlIGNlbnRyb2lkLlxuICAgKiBcbiAgICogU2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NlbnRyb2lkI0NlbnRyb2lkX29mX2FfcG9seWdvblxuICAgKiBcbiAgICogTm90ZTogUmV0dXJucyBhIF9uZXdfIGBWZWN0b3JgIGVhY2ggdGltZSB5b3UgY2FsbCB0aGlzLlxuICAgKiBcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyBhIFZlY3RvciB0aGF0IGNvbnRhaW5zIHRoZSBjb29yZGluYXRlcyBvZiB0aGUgY2VudHJvaWQuXG4gICAqL1xuICBnZXRDZW50cm9pZCgpIHtcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLmNhbGNQb2ludHM7XG4gICAgY29uc3QgbGVuID0gcG9pbnRzLmxlbmd0aDtcblxuICAgIGxldCBjeCA9IDA7XG4gICAgbGV0IGN5ID0gMDtcbiAgICBsZXQgYXIgPSAwO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgcDEgPSBwb2ludHNbaV07XG4gICAgICBjb25zdCBwMiA9IGkgPT09IGxlbiAtIDEgPyBwb2ludHNbMF0gOiBwb2ludHNbaSArIDFdOyAvLyBMb29wIGFyb3VuZCBpZiBsYXN0IHBvaW50XG5cbiAgICAgIGNvbnN0IGEgPSBwMVtcInhcIl0gKiBwMltcInlcIl0gLSBwMltcInhcIl0gKiBwMVtcInlcIl07XG5cbiAgICAgIGN4ICs9IChwMVtcInhcIl0gKyBwMltcInhcIl0pICogYTtcbiAgICAgIGN5ICs9IChwMVtcInlcIl0gKyBwMltcInlcIl0pICogYTtcbiAgICAgIGFyICs9IGE7XG4gICAgfVxuXG4gICAgYXIgPSBhciAqIDM7IC8vIHdlIHdhbnQgMSAvIDYgdGhlIGFyZWEgYW5kIHdlIGN1cnJlbnRseSBoYXZlIDIqYXJlYVxuICAgIGN4ID0gY3ggLyBhcjtcbiAgICBjeSA9IGN5IC8gYXI7XG4gICAgXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoY3gsIGN5KTtcbiAgfVxufSIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4vVmVjdG9yJztcblxuLyoqXG4gKiAjIyBSZXNwb25zZVxuICogXG4gKiBBbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSByZXN1bHQgb2YgYW4gaW50ZXJzZWN0aW9uLiBDb250YWluczpcbiAqIC0gVGhlIHR3byBvYmplY3RzIHBhcnRpY2lwYXRpbmcgaW4gdGhlIGludGVyc2VjdGlvblxuICogLSBUaGUgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgbWluaW11bSBjaGFuZ2UgbmVjZXNzYXJ5IHRvIGV4dHJhY3QgdGhlIGZpcnN0IG9iamVjdCBmcm9tIHRoZSBzZWNvbmQgb25lIChhcyB3ZWxsIGFzIGEgdW5pdCB2ZWN0b3IgaW4gdGhhdCBkaXJlY3Rpb24gYW5kIHRoZSBtYWduaXR1ZGUgb2YgdGhlIG92ZXJsYXApXG4gKiAtIFdoZXRoZXIgdGhlIGZpcnN0IG9iamVjdCBpcyBlbnRpcmVseSBpbnNpZGUgdGhlIHNlY29uZCwgYW5kIHZpY2UgdmVyc2EuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BvbnNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hID0gbnVsbDtcbiAgICB0aGlzLmIgPSBudWxsO1xuXG4gICAgdGhpcy5vdmVybGFwTiA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLm92ZXJsYXBWID0gbmV3IFZlY3RvcigpO1xuXG4gICAgdGhpcy5jbGVhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBzb21lIHZhbHVlcyBvZiB0aGUgcmVzcG9uc2UgYmFjayB0byB0aGVpciBkZWZhdWx0cy5cbiAgICogXG4gICAqIENhbGwgdGhpcyBiZXR3ZWVuIHRlc3RzIGlmIHlvdSBhcmUgZ29pbmcgdG8gcmV1c2UgYSBzaW5nbGUgUmVzcG9uc2Ugb2JqZWN0IGZvciBtdWx0aXBsZSBpbnRlcnNlY3Rpb24gdGVzdHMgKHJlY29tbWVuZGVkIGFzIGl0IHdpbGwgYXZvaWQgYWxsY2F0aW5nIGV4dHJhIG1lbW9yeSlcbiAgICogXG4gICAqIEByZXR1cm5zIHtSZXNwb25zZX0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuYUluQiA9IHRydWU7XG4gICAgdGhpcy5iSW5BID0gdHJ1ZTtcblxuICAgIHRoaXMub3ZlcmxhcCA9IE51bWJlci5NQVhfVkFMVUU7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIFxufSIsIid1c2Ugc3RyaWN0J1xuXG4vKiFcbiogc2F0LWpzIChvciBTQVQuanMpIG1hZGUgYnkgSmltIFJpZWNrZW4gYW5kIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuKiBNb2RpZmllZCBieSBSb2JlcnQgQ29ycG9ub2kgYW5kIG1lIChTb25vUEcpXG4qL1xuXG5pbXBvcnQgQm94IGZyb20gJy4vQm94JztcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi9WZWN0b3InO1xuaW1wb3J0IENpcmNsZSBmcm9tICcuL0NpcmNsZSc7XG5pbXBvcnQgUG9seWdvbiBmcm9tICcuL1BvbHlnb24nO1xuaW1wb3J0IFJlc3BvbnNlIGZyb20gJy4vUmVzcG9uc2UnO1xuXG4vKipcbiAqICMjIE9iamVjdCBQb29sc1xuICovXG5cbi8qKlxuICogQSBwb29sIG9mIGBWZWN0b3Igb2JqZWN0cyB0aGF0IGFyZSB1c2VkIGluIGNhbGN1bGF0aW9ucyB0byBhdm9pZCBhbGxvY2F0aW5nIG1lbW9yeS5cbiAqIFxuICogQHR5cGUge0FycmF5PFZlY3Rvcj59XG4gKi9cbmNvbnN0IFRfVkVDVE9SUyA9IFtdO1xuZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSBUX1ZFQ1RPUlMucHVzaChuZXcgVmVjdG9yKCkpO1xuXG4vKipcbiAqIEEgcG9vbCBvZiBhcnJheXMgb2YgbnVtYmVycyB1c2VkIGluIGNhbGN1bGF0aW9ucyB0byBhdm9pZCBhbGxvY2F0aW5nIG1lbW9yeS5cbiAqIFxuICogQHR5cGUge0FycmF5PEFycmF5PG51bWJlcj4+fVxuICovXG5jb25zdCBUX0FSUkFZUyA9IFtdO1xuZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIFRfQVJSQVlTLnB1c2goW10pO1xuXG4vKipcbiAqIFRlbXBvcmFyeSByZXNwb25zZSB1c2VkIGZvciBQb2x5Z29uIGhpdCBkZXRlY3Rpb24uXG4gKiBcbiAqIEB0eXBlIHtSZXNwb25zZX1cbiAqL1xuY29uc3QgVF9SRVNQT05TRSA9IG5ldyBSZXNwb25zZSgpO1xuXG4vKipcbiAqIFRpbnkgXCJwb2ludFwiIFBvbHlnb24gdXNlZCBmb3IgUG9seWdvbiBoaXQgZGV0ZWN0aW9uLlxuICogXG4gKiBAdHlwZSB7UG9seWdvbn1cbiAqL1xuY29uc3QgVEVTVF9QT0lOVCA9IG5ldyBCb3gobmV3IFZlY3RvcigpLCAwLjAwMDAwMSwgMC4wMDAwMDEpLnRvUG9seWdvbigpO1xuXG4vKipcbiAqICMjIENvbnN0YW50cyBmb3IgVm9yb25vaSByZWdpb25zLlxuICovXG5jb25zdCBMRUZUX1ZPUk9OT0lfUkVHSU9OID0gLTE7XG5jb25zdCBNSURETEVfVk9ST05PSV9SRUdJT04gPSAwO1xuY29uc3QgUklHSFRfVk9ST05PSV9SRUdJT04gPSAxO1xuXG4vKipcbiAqICMjIEhlbHBlciBGdW5jdGlvbnNcbiAqL1xuXG4vKipcbiAqIEZsYXR0ZW5zIHRoZSBzcGVjaWZpZWQgYXJyYXkgb2YgcG9pbnRzIG9udG8gYSB1bml0IHZlY3RvciBheGlzIHJlc3VsdGluZyBpbiBhIG9uZSBkaW1lbnNpb25zbFxuICogcmFuZ2Ugb2YgdGhlIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWUgb24gdGhhdCBheGlzLlxuICogXG4gKiBAcGFyYW0ge0FycmF5PFZlY3Rvcj59IHBvaW50cyBUaGUgcG9pbnRzIHRvIGZsYXR0ZW4uXG4gKiBAcGFyYW0ge1ZlY3Rvcn0gbm9ybWFsIFRoZSB1bml0IHZlY3RvciBheGlzIHRvIGZsYXR0ZW4gb24uXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IHJlc3VsdCBBbiBhcnJheS4gQWZ0ZXIgY2FsbGluZyB0aGlzIGZ1bmN0aW9uLCByZXN1bHRbMF0gd2lsbCBiZSB0aGUgbWluaW11bSB2YWx1ZSwgcmVzdWx0WzFdIHdpbGwgYmUgdGhlIG1heGltdW0gdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGZsYXR0ZW5Qb2ludHNPbihwb2ludHMsIG5vcm1hbCwgcmVzdWx0KSB7XG4gIGxldCBtaW4gPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICBsZXQgbWF4ID0gLU51bWJlci5NQVhfVkFMVUU7XG5cbiAgY29uc3QgbGVuID0gcG9pbnRzLmxlbmd0aDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgLy8gVGhlIG1hZ25pdHVkZSBvZiB0aGUgcHJvamVjdGlvbiBvZiB0aGUgcG9pbnQgb250byB0aGUgbm9ybWFsLlxuICAgIGNvbnN0IGRvdCA9IHBvaW50c1tpXS5kb3Qobm9ybWFsKTtcblxuICAgIGlmIChkb3QgPCBtaW4pIG1pbiA9IGRvdDtcbiAgICBpZiAoZG90ID4gbWF4KSBtYXggPSBkb3Q7XG4gIH1cblxuICByZXN1bHRbMF0gPSBtaW47XG4gIHJlc3VsdFsxXSA9IG1heDtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHdoaWNoIFZvcm9ub2kgcmVnaW9uIGEgcG9pbnQgaXMgb24gYSBsaW5lIHNlZ21lbnQuXG4gKiBcbiAqIEl0IGlzIGFzc3VtZWQgdGhhdCBib3RoIHRoZSBsaW5lIGFuZCB0aGUgcG9pbnQgYXJlIHJlbGF0aXZlIHRvIGAoMCwwKWBcbiAqIFxuICogICAgICAgICAgICAgfCAgICAgICAoMCkgICAgICB8XG4gKiAgICAgICgtMSkgIFtTXS0tLS0tLS0tLS0tLS0tW0VdICAoMSlcbiAqICAgICAgICAgICAgfCAgICAgICAoMCkgICAgICB8XG4gKiBcbiAqIEBwYXJhbSB7VmVjdG9yfSBsaW5lIFRoZSBsaW5lIHNlZ21lbnQuXG4gKiBAcGFyYW0ge1ZlY3Rvcn0gcG9pbnQgVGhlIHBvaW50LlxuICogQHJldHVybiB7bnVtYmVyfSBMRUZUX1ZPUk9OT0lfUkVHSU9OICgtMSkgaWYgaXQgaXMgdGhlIGxlZnQgcmVnaW9uLFxuICogICAgICAgICAgICAgICAgICBNSURETEVfVk9ST05PSV9SRUdJT04gKDApIGlmIGl0IGlzIHRoZSBtaWRkbGUgcmVnaW9uLFxuICogICAgICAgICAgICAgICAgICBSSUdIVF9WT1JPTk9JX1JFR0lPTiAoMSkgaWYgaXQgaXMgdGhlIHJpZ2h0IHJlZ2lvbi5cbiAqL1xuZnVuY3Rpb24gdm9yb25vaVJlZ2lvbihsaW5lLCBwb2ludCkge1xuICBjb25zdCBsZW4yID0gbGluZS5sZW4yKCk7XG4gIGNvbnN0IGRwID0gcG9pbnQuZG90KGxpbmUpO1xuXG4gIC8vIElmIHRoZSBwb2ludCBpcyBiZXlvbmQgdGhlIHN0YXJ0IG9mIHRoZSBsaW5lLCBpdCBpcyBpbiB0aGUgbGVmdCB2b3Jvbm9pIHJlZ2lvbi5cbiAgaWYgKGRwIDwgMCkgcmV0dXJuIExFRlRfVk9ST05PSV9SRUdJT047XG5cbiAgLy8gSWYgdGhlIHBvaW50IGlzIGJleW9uZCB0aGUgZW5kIG9mIHRoZSBsaW5lLCBpdCBpcyBpbiB0aGUgcmlnaHQgdm9yb25vaSByZWdpb24uXG4gIGVsc2UgaWYgKGRwID4gbGVuMikgcmV0dXJuIFJJR0hUX1ZPUk9OT0lfUkVHSU9OO1xuXG4gIC8vIE90aGVyd2lzZSwgaXQncyBpbiB0aGUgbWlkZGxlIG9uZS5cbiAgZWxzZSByZXR1cm4gTUlERExFX1ZPUk9OT0lfUkVHSU9OO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEJveCxcbiAgVmVjdG9yLFxuICBDaXJjbGUsXG4gIFBvbHlnb24sXG4gIFJlc3BvbnNlLFxuICBWOiBWZWN0b3IsXG4gIFxuICAvKipcbiAgICogQ2hlY2sgd2hldGhlciB0d28gY29udmV4IHBvbHlnb25zIGFyZSBzZXBhcmF0ZWQgYnkgdGhlIHNwZWNpZmllZCBheGlzIChtdXN0IGJlIGEgdW5pdCB2ZWN0b3IpLlxuICAgKiBcbiAgICogQHBhcmFtIHtWZWN0b3J9IGFQb3MgVGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBwb2x5Z29uLlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYlBvcyBUaGUgcG9zaXRpb24gb2YgdGhlIHNlY29uZCBwb2x5Z29uLlxuICAgKiBAcGFyYW0ge0FycmF5PFZlY3Rvcj59IGFQb2ludHMgVGhlIHBvaW50cyBpbiB0aGUgZmlyc3QgcG9seWdvbi5cbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBiUG9pbnRzIFRoZSBwb2ludHMgaW4gdGhlIHNlY29uZCBwb2x5Z29uLlxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYXhpcyBUaGUgYXhpcyAodW5pdCBzaXplZCkgdG8gdGVzdCBhZ2FpbnN0LiAgVGhlIHBvaW50cyBvZiBib3RoIHBvbHlnb25zIHdpbGwgYmUgcHJvamVjdGVkIG9udG8gdGhpcyBheGlzLlxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlPX0gcmVzcG9uc2UgQSBSZXNwb25zZSBvYmplY3QgKG9wdGlvbmFsKSB3aGljaCB3aWxsIGJlIHBvcHVsYXRlZCBpZiB0aGUgYXhpcyBpcyBub3QgYSBzZXBhcmF0aW5nIGF4aXMuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgaXQgaXMgYSBzZXBhcmF0aW5nIGF4aXMsIGZhbHNlIG90aGVyd2lzZS4gIElmIGZhbHNlLCBhbmQgYSByZXNwb25zZSBpcyBwYXNzZWQgaW4sIGluZm9ybWF0aW9uIGFib3V0IGhvdyBtdWNoIG92ZXJsYXAgYW5kIHRoZSBkaXJlY3Rpb24gb2YgdGhlIG92ZXJsYXAgd2lsbCBiZSBwb3B1bGF0ZWQuXG4gICAqL1xuICBpc1NlcGFyYXRpbmdBeGlzKGFQb3MsIGJQb3MsIGFQb2ludHMsIGJQb2ludHMsIGF4aXMsIHJlc3BvbnNlKSB7XG4gICAgY29uc3QgcmFuZ2VBID0gVF9BUlJBWVMucG9wKCk7XG4gICAgY29uc3QgcmFuZ2VCID0gVF9BUlJBWVMucG9wKCk7XG4gIFxuICAgIC8vIFRoZSBtYWduaXR1ZGUgb2YgdGhlIG9mZnNldCBiZXR3ZWVuIHRoZSB0d28gcG9seWdvbnNcbiAgICBjb25zdCBvZmZzZXRWID0gVF9WRUNUT1JTLnBvcCgpLmNvcHkoYlBvcykuc3ViKGFQb3MpO1xuICAgIGNvbnN0IHByb2plY3RlZE9mZnNldCA9IG9mZnNldFYuZG90KGF4aXMpO1xuICBcbiAgICAvLyBQcm9qZWN0IHRoZSBwb2x5Z29ucyBvbnRvIHRoZSBheGlzLlxuICAgIGZsYXR0ZW5Qb2ludHNPbihhUG9pbnRzLCBheGlzLCByYW5nZUEpO1xuICAgIGZsYXR0ZW5Qb2ludHNPbihiUG9pbnRzLCBheGlzLCByYW5nZUIpO1xuICBcbiAgICAvLyBNb3ZlIEIncyByYW5nZSB0byBpdHMgcG9zaXRpb24gcmVsYXRpdmUgdG8gQS5cbiAgICByYW5nZUJbMF0gKz0gcHJvamVjdGVkT2Zmc2V0O1xuICAgIHJhbmdlQlsxXSArPSBwcm9qZWN0ZWRPZmZzZXQ7XG4gIFxuICAgIC8vIENoZWNrIGlmIHRoZXJlIGlzIGEgZ2FwLiBJZiB0aGVyZSBpcywgdGhpcyBpcyBhIHNlcGFyYXRpbmcgYXhpcyBhbmQgd2UgY2FuIHN0b3BcbiAgICBpZiAocmFuZ2VBWzBdID4gcmFuZ2VCWzFdIHx8IHJhbmdlQlswXSA+IHJhbmdlQVsxXSkge1xuICAgICAgVF9WRUNUT1JTLnB1c2gob2Zmc2V0Vik7XG4gIFxuICAgICAgVF9BUlJBWVMucHVzaChyYW5nZUEpO1xuICAgICAgVF9BUlJBWVMucHVzaChyYW5nZUIpO1xuICBcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgXG4gICAgLy8gVGhpcyBpcyBub3QgYSBzZXBhcmF0aW5nIGF4aXMuIElmIHdlJ3JlIGNhbGN1bGF0aW5nIGEgcmVzcG9uc2UsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cbiAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgIGxldCBvdmVybGFwID0gMDtcbiAgXG4gICAgICAvLyBBIHN0YXJ0cyBmdXJ0aGVyIGxlZnQgdGhhbiBCXG4gICAgICBpZiAocmFuZ2VBWzBdIDwgcmFuZ2VCWzBdKSB7XG4gICAgICAgIHJlc3BvbnNlWydhSW5CJ10gPSBmYWxzZTtcbiAgXG4gICAgICAgIC8vIEEgZW5kcyBiZWZvcmUgQiBkb2VzLiBXZSBoYXZlIHRvIHB1bGwgQSBvdXQgb2YgQlxuICAgICAgICBpZiAocmFuZ2VBWzFdIDwgcmFuZ2VCWzFdKSB7XG4gICAgICAgICAgb3ZlcmxhcCA9IHJhbmdlQVsxXSAtIHJhbmdlQlswXTtcbiAgXG4gICAgICAgICAgcmVzcG9uc2VbJ2JJbkEnXSA9IGZhbHNlO1xuICAgICAgICAgIC8vIEIgaXMgZnVsbHkgaW5zaWRlIEEuICBQaWNrIHRoZSBzaG9ydGVzdCB3YXkgb3V0LlxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IG9wdGlvbjEgPSByYW5nZUFbMV0gLSByYW5nZUJbMF07XG4gICAgICAgICAgY29uc3Qgb3B0aW9uMiA9IHJhbmdlQlsxXSAtIHJhbmdlQVswXTtcbiAgXG4gICAgICAgICAgb3ZlcmxhcCA9IG9wdGlvbjEgPCBvcHRpb24yID8gb3B0aW9uMSA6IC1vcHRpb24yO1xuICAgICAgICB9XG4gICAgICAgIC8vIEIgc3RhcnRzIGZ1cnRoZXIgbGVmdCB0aGFuIEFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3BvbnNlWydiSW5BJ10gPSBmYWxzZTtcbiAgXG4gICAgICAgIC8vIEIgZW5kcyBiZWZvcmUgQSBlbmRzLiBXZSBoYXZlIHRvIHB1c2ggQSBvdXQgb2YgQlxuICAgICAgICBpZiAocmFuZ2VBWzFdID4gcmFuZ2VCWzFdKSB7XG4gICAgICAgICAgb3ZlcmxhcCA9IHJhbmdlQVswXSAtIHJhbmdlQlsxXTtcbiAgXG4gICAgICAgICAgcmVzcG9uc2VbJ2FJbkInXSA9IGZhbHNlO1xuICAgICAgICAgIC8vIEEgaXMgZnVsbHkgaW5zaWRlIEIuICBQaWNrIHRoZSBzaG9ydGVzdCB3YXkgb3V0LlxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IG9wdGlvbjEgPSByYW5nZUFbMV0gLSByYW5nZUJbMF07XG4gICAgICAgICAgY29uc3Qgb3B0aW9uMiA9IHJhbmdlQlsxXSAtIHJhbmdlQVswXTtcbiAgXG4gICAgICAgICAgb3ZlcmxhcCA9IG9wdGlvbjEgPCBvcHRpb24yID8gb3B0aW9uMSA6IC1vcHRpb24yO1xuICAgICAgICB9XG4gICAgICB9XG4gIFxuICAgICAgLy8gSWYgdGhpcyBpcyB0aGUgc21hbGxlc3QgYW1vdW50IG9mIG92ZXJsYXAgd2UndmUgc2VlbiBzbyBmYXIsIHNldCBpdCBhcyB0aGUgbWluaW11bSBvdmVybGFwLlxuICAgICAgY29uc3QgYWJzT3ZlcmxhcCA9IE1hdGguYWJzKG92ZXJsYXApO1xuICBcbiAgICAgIGlmIChhYnNPdmVybGFwIDwgcmVzcG9uc2VbJ292ZXJsYXAnXSkge1xuICAgICAgICByZXNwb25zZVsnb3ZlcmxhcCddID0gYWJzT3ZlcmxhcDtcbiAgICAgICAgcmVzcG9uc2VbJ292ZXJsYXBOJ10uY29weShheGlzKTtcbiAgXG4gICAgICAgIGlmIChvdmVybGFwIDwgMCkgcmVzcG9uc2VbJ292ZXJsYXBOJ10ucmV2ZXJzZSgpO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgVF9WRUNUT1JTLnB1c2gob2Zmc2V0Vik7XG4gIFxuICAgIFRfQVJSQVlTLnB1c2gocmFuZ2VBKTtcbiAgICBUX0FSUkFZUy5wdXNoKHJhbmdlQik7XG4gIFxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICAvKipcbiAgICogIyMgQ29sbGlzaW9uIFRlc3RzXG4gICAqL1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHBvaW50IGlzIGluc2lkZSBhIGNpcmNsZS5cbiAgICogXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBwIFRoZSBwb2ludCB0byB0ZXN0LlxuICAgKiBAcGFyYW0ge0NpcmNsZX0gYyBUaGUgY2lyY2xlIHRvIHRlc3QuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBwb2ludCBpcyBpbnNpZGUgdGhlIGNpcmNsZSBvciBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuICBwb2ludEluQ2lyY2xlKHAsIGMpIHtcbiAgICBjb25zdCBkaWZmZXJlbmNlViA9IFRfVkVDVE9SUy5wb3AoKS5jb3B5KHApLnN1YihjWydwb3MnXSkuc3ViKGNbJ29mZnNldCddKTtcblxuICAgIGNvbnN0IHJhZGl1c1NxID0gY1snciddICogY1snciddO1xuICAgIGNvbnN0IGRpc3RhbmNlU3EgPSBkaWZmZXJlbmNlVi5sZW4yKCk7XG5cbiAgICBUX1ZFQ1RPUlMucHVzaChkaWZmZXJlbmNlVik7XG5cbiAgICAvLyBJZiB0aGUgZGlzdGFuY2UgYmV0d2VlbiBpcyBzbWFsbGVyIHRoYW4gdGhlIHJhZGl1cyB0aGVuIHRoZSBwb2ludCBpcyBpbnNpZGUgdGhlIGNpcmNsZS5cbiAgICByZXR1cm4gZGlzdGFuY2VTcSA8PSByYWRpdXNTcTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSBwb2ludCBpcyBpbnNpZGUgYSBjb252ZXggcG9seWdvbi5cbiAgICogXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBwIFRoZSBwb2ludCB0byB0ZXN0LlxuICAgKiBAcGFyYW0ge1BvbHlnb259IHBvbHkgVGhlIHBvbHlnb24gdG8gdGVzdC5cbiAgICogXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIHBvaW50IGlzIGluc2lkZSB0aGUgcG9seWdvbiBvciBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuICBwb2ludEluUG9seWdvbihwLCBwb2x5KSB7XG4gICAgVEVTVF9QT0lOVFsncG9zJ10uY29weShwKTtcbiAgICBUX1JFU1BPTlNFLmNsZWFyKCk7XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy50ZXN0UG9seWdvblBvbHlnb24oVEVTVF9QT0lOVCwgcG9seSwgVF9SRVNQT05TRSk7XG5cbiAgICBpZiAocmVzdWx0KSByZXN1bHQgPSBUX1JFU1BPTlNFWydhSW5CJ107XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0d28gY2lyY2xlcyBjb2xsaWRlLlxuICAgKiBcbiAgICogQHBhcmFtIHtDaXJjbGV9IGEgVGhlIGZpcnN0IGNpcmNsZS5cbiAgICogQHBhcmFtIHtDaXJjbGV9IGIgVGhlIHNlY29uZCBjaXJjbGUuXG4gICAqIEBwYXJhbSB7UmVzcG9uc2V9IFtyZXNwb25zZV0gQW4gb3B0aW9uYWwgcmVzcG9uc2Ugb2JqZWN0IHRoYXQgd2lsbCBiZSBwb3B1bGF0ZWQgaWYgdGhlIGNpcmNsZXMgaW50ZXJzZWN0LlxuICAgKiBcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgY2lyY2xlcyBpbnRlcnNlY3Qgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cbiAgdGVzdENpcmNsZUNpcmNsZShhLCBiLCByZXNwb25zZSkge1xuICAgIC8vIENoZWNrIGlmIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBjZW50ZXJzIG9mIHRoZSB0d28gY2lyY2xlcyBpcyBncmVhdGVyIHRoYW4gdGhlaXIgY29tYmluZWQgcmFkaXVzLlxuICAgIGNvbnN0IGRpZmZlcmVuY2VWID0gVF9WRUNUT1JTLnBvcCgpLmNvcHkoYlsncG9zJ10pLmFkZChiWydvZmZzZXQnXSkuc3ViKGFbJ3BvcyddKS5zdWIoYVsnb2Zmc2V0J10pO1xuXG4gICAgY29uc3QgdG90YWxSYWRpdXMgPSBhWydyJ10gKyBiWydyJ107XG4gICAgY29uc3QgdG90YWxSYWRpdXNTcSA9IHRvdGFsUmFkaXVzICogdG90YWxSYWRpdXM7XG4gICAgY29uc3QgZGlzdGFuY2VTcSA9IGRpZmZlcmVuY2VWLmxlbjIoKTtcblxuICAgIC8vIElmIHRoZSBkaXN0YW5jZSBpcyBiaWdnZXIgdGhhbiB0aGUgY29tYmluZWQgcmFkaXVzLCB0aGV5IGRvbid0IGludGVyc2VjdC5cbiAgICBpZiAoZGlzdGFuY2VTcSA+IHRvdGFsUmFkaXVzU3EpIHtcbiAgICAgIFRfVkVDVE9SUy5wdXNoKGRpZmZlcmVuY2VWKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFRoZXkgaW50ZXJzZWN0LiAgSWYgd2UncmUgY2FsY3VsYXRpbmcgYSByZXNwb25zZSwgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxuICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgY29uc3QgZGlzdCA9IE1hdGguc3FydChkaXN0YW5jZVNxKTtcblxuICAgICAgcmVzcG9uc2UuYSA9IGE7XG4gICAgICByZXNwb25zZS5iID0gYjtcblxuICAgICAgcmVzcG9uc2Uub3ZlcmxhcCA9IHRvdGFsUmFkaXVzIC0gZGlzdDtcbiAgICAgIHJlc3BvbnNlLm92ZXJsYXBOLmNvcHkoZGlmZmVyZW5jZVYubm9ybWFsaXplKCkpO1xuICAgICAgcmVzcG9uc2Uub3ZlcmxhcFYuY29weShkaWZmZXJlbmNlVikuc2NhbGUocmVzcG9uc2Uub3ZlcmxhcCk7XG5cbiAgICAgIHJlc3BvbnNlLmFJbkIgPSBhLnIgPD0gYi5yICYmIGRpc3QgPD0gYi5yIC0gYS5yO1xuICAgICAgcmVzcG9uc2UuYkluQSA9IGIuciA8PSBhLnIgJiYgZGlzdCA8PSBhLnIgLSBiLnI7XG4gICAgfVxuXG4gICAgVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgcG9seWdvbiBhbmQgYSBjaXJjbGUgY29sbGlkZS5cbiAgICogXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gcG9seWdvbiBUaGUgcG9seWdvbi5cbiAgICogQHBhcmFtIHtDaXJjbGV9IGNpcmNsZSBUaGUgY2lyY2xlLlxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSBbcmVzcG9uc2VdIEFuIG9wdGlvbmFsIHJlc3BvbnNlIG9iamVjdCB0aGF0IHdpbGwgYmUgcG9wdWxhdGVkIGlmIHRoZXkgaW50ZXJzZWN0LlxuICAgKiBcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGV5IGludGVyc2VjdCBvciBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuICB0ZXN0UG9seWdvbkNpcmNsZShwb2x5Z29uLCBjaXJjbGUsIHJlc3BvbnNlKSB7XG4gICAgLy8gR2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRvIHRoZSBwb2x5Z29uLlxuICAgIGNvbnN0IGNpcmNsZVBvcyA9IFRfVkVDVE9SUy5wb3AoKS5jb3B5KGNpcmNsZS5wb3MpLmFkZChjaXJjbGUub2Zmc2V0KS5zdWIocG9seWdvbi5wb3MpO1xuXG4gICAgY29uc3QgcmFkaXVzID0gY2lyY2xlLnI7XG4gICAgY29uc3QgcmFkaXVzMiA9IHJhZGl1cyAqIHJhZGl1cztcblxuICAgIGNvbnN0IHBvaW50cyA9IHBvbHlnb24uY2FsY1BvaW50cztcbiAgICBjb25zdCBsZW4gPSBwb2ludHMubGVuZ3RoO1xuXG4gICAgY29uc3QgZWRnZSA9IFRfVkVDVE9SUy5wb3AoKTtcbiAgICBjb25zdCBwb2ludCA9IFRfVkVDVE9SUy5wb3AoKTtcblxuICAgIC8vIEZvciBlYWNoIGVkZ2UgaW4gdGhlIHBvbHlnb246XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgbmV4dCA9IGkgPT09IGxlbiAtIDEgPyAwIDogaSArIDE7XG4gICAgICBjb25zdCBwcmV2ID0gaSA9PT0gMCA/IGxlbiAtIDEgOiBpIC0gMTtcblxuICAgICAgbGV0IG92ZXJsYXAgPSAwO1xuICAgICAgbGV0IG92ZXJsYXBOID0gbnVsbDtcblxuICAgICAgLy8gR2V0IHRoZSBlZGdlLlxuICAgICAgZWRnZS5jb3B5KHBvbHlnb24uZWRnZXNbaV0pO1xuXG4gICAgICAvLyBDYWxjdWxhdGUgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRvIHRoZSBzdGFydGluZyBwb2ludCBvZiB0aGUgZWRnZS5cbiAgICAgIHBvaW50LmNvcHkoY2lyY2xlUG9zKS5zdWIocG9pbnRzW2ldKTtcblxuICAgICAgLy8gSWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGFuZCB0aGUgcG9pbnQgaXMgYmlnZ2VyIHRoYW4gdGhlIHJhZGl1cywgdGhlIHBvbHlnb24gaXMgZGVmaW5pdGVseSBub3QgZnVsbHkgaW4gdGhlIGNpcmNsZS5cbiAgICAgIGlmIChyZXNwb25zZSAmJiBwb2ludC5sZW4yKCkgPiByYWRpdXMyKSByZXNwb25zZS5hSW5CID0gZmFsc2U7XG5cbiAgICAgIC8vIENhbGN1bGF0ZSB3aGljaCBWb3Jvbm9pIHJlZ2lvbiB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgaXMgaW4uXG4gICAgICBsZXQgcmVnaW9uID0gdm9yb25vaVJlZ2lvbihlZGdlLCBwb2ludCk7XG5cbiAgICAgIC8vIElmIGl0J3MgdGhlIGxlZnQgcmVnaW9uOlxuICAgICAgaWYgKHJlZ2lvbiA9PT0gTEVGVF9WT1JPTk9JX1JFR0lPTikge1xuICAgICAgICAvLyBXZSBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSdyZSBpbiB0aGUgUklHSFRfVk9ST05PSV9SRUdJT04gb2YgdGhlIHByZXZpb3VzIGVkZ2UuXG4gICAgICAgIGVkZ2UuY29weShwb2x5Z29uLmVkZ2VzW3ByZXZdKTtcblxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRoZSBzdGFydGluZyBwb2ludCBvZiB0aGUgcHJldmlvdXMgZWRnZVxuICAgICAgICBjb25zdCBwb2ludDIgPSBUX1ZFQ1RPUlMucG9wKCkuY29weShjaXJjbGVQb3MpLnN1Yihwb2ludHNbcHJldl0pO1xuXG4gICAgICAgIHJlZ2lvbiA9IHZvcm9ub2lSZWdpb24oZWRnZSwgcG9pbnQyKTtcblxuICAgICAgICBpZiAocmVnaW9uID09PSBSSUdIVF9WT1JPTk9JX1JFR0lPTikge1xuICAgICAgICAgIC8vIEl0J3MgaW4gdGhlIHJlZ2lvbiB3ZSB3YW50LiAgQ2hlY2sgaWYgdGhlIGNpcmNsZSBpbnRlcnNlY3RzIHRoZSBwb2ludC5cbiAgICAgICAgICBjb25zdCBkaXN0ID0gcG9pbnQubGVuKCk7XG5cbiAgICAgICAgICBpZiAoZGlzdCA+IHJhZGl1cykge1xuICAgICAgICAgICAgLy8gTm8gaW50ZXJzZWN0aW9uXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpO1xuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2goZWRnZSk7XG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludDIpO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgLy8gSXQgaW50ZXJzZWN0cywgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxuICAgICAgICAgICAgcmVzcG9uc2UuYkluQSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBvdmVybGFwTiA9IHBvaW50Lm5vcm1hbGl6ZSgpO1xuICAgICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQyKTtcblxuICAgICAgICAvLyBJZiBpdCdzIHRoZSByaWdodCByZWdpb246XG4gICAgICB9IGVsc2UgaWYgKHJlZ2lvbiA9PT0gUklHSFRfVk9ST05PSV9SRUdJT04pIHtcbiAgICAgICAgLy8gV2UgbmVlZCB0byBtYWtlIHN1cmUgd2UncmUgaW4gdGhlIGxlZnQgcmVnaW9uIG9uIHRoZSBuZXh0IGVkZ2VcbiAgICAgICAgZWRnZS5jb3B5KHBvbHlnb24uZWRnZXNbbmV4dF0pO1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgcmVsYXRpdmUgdG8gdGhlIHN0YXJ0aW5nIHBvaW50IG9mIHRoZSBuZXh0IGVkZ2UuXG4gICAgICAgIHBvaW50LmNvcHkoY2lyY2xlUG9zKS5zdWIocG9pbnRzW25leHRdKTtcblxuICAgICAgICByZWdpb24gPSB2b3Jvbm9pUmVnaW9uKGVkZ2UsIHBvaW50KTtcblxuICAgICAgICBpZiAocmVnaW9uID09PSBMRUZUX1ZPUk9OT0lfUkVHSU9OKSB7XG4gICAgICAgICAgLy8gSXQncyBpbiB0aGUgcmVnaW9uIHdlIHdhbnQuICBDaGVjayBpZiB0aGUgY2lyY2xlIGludGVyc2VjdHMgdGhlIHBvaW50LlxuICAgICAgICAgIGNvbnN0IGRpc3QgPSBwb2ludC5sZW4oKTtcblxuICAgICAgICAgIGlmIChkaXN0ID4gcmFkaXVzKSB7XG4gICAgICAgICAgICAvLyBObyBpbnRlcnNlY3Rpb25cbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChlZGdlKTtcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKHBvaW50KTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cbiAgICAgICAgICAgIHJlc3BvbnNlLmJJbkEgPSBmYWxzZTtcblxuICAgICAgICAgICAgb3ZlcmxhcE4gPSBwb2ludC5ub3JtYWxpemUoKTtcbiAgICAgICAgICAgIG92ZXJsYXAgPSByYWRpdXMgLSBkaXN0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBPdGhlcndpc2UsIGl0J3MgdGhlIG1pZGRsZSByZWdpb246XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBOZWVkIHRvIGNoZWNrIGlmIHRoZSBjaXJjbGUgaXMgaW50ZXJzZWN0aW5nIHRoZSBlZGdlLCBjaGFuZ2UgdGhlIGVkZ2UgaW50byBpdHMgXCJlZGdlIG5vcm1hbFwiLlxuICAgICAgICBjb25zdCBub3JtYWwgPSBlZGdlLnBlcnAoKS5ub3JtYWxpemUoKTtcblxuICAgICAgICAvLyBGaW5kIHRoZSBwZXJwZW5kaWN1bGFyIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGFuZCB0aGUgZWRnZS5cbiAgICAgICAgY29uc3QgZGlzdCA9IHBvaW50LmRvdChub3JtYWwpO1xuICAgICAgICBjb25zdCBkaXN0QWJzID0gTWF0aC5hYnMoZGlzdCk7XG5cbiAgICAgICAgLy8gSWYgdGhlIGNpcmNsZSBpcyBvbiB0aGUgb3V0c2lkZSBvZiB0aGUgZWRnZSwgdGhlcmUgaXMgbm8gaW50ZXJzZWN0aW9uLlxuICAgICAgICBpZiAoZGlzdCA+IDAgJiYgZGlzdEFicyA+IHJhZGl1cykge1xuICAgICAgICAgIC8vIE5vIGludGVyc2VjdGlvblxuICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XG4gICAgICAgICAgVF9WRUNUT1JTLnB1c2gobm9ybWFsKTtcbiAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XG5cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAvLyBJdCBpbnRlcnNlY3RzLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXG4gICAgICAgICAgb3ZlcmxhcE4gPSBub3JtYWw7XG4gICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XG5cbiAgICAgICAgICAvLyBJZiB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgaXMgb24gdGhlIG91dHNpZGUgb2YgdGhlIGVkZ2UsIG9yIHBhcnQgb2YgdGhlIGNpcmNsZSBpcyBvbiB0aGUgb3V0c2lkZSwgdGhlIGNpcmNsZSBpcyBub3QgZnVsbHkgaW5zaWRlIHRoZSBwb2x5Z29uLlxuICAgICAgICAgIGlmIChkaXN0ID49IDAgfHwgb3ZlcmxhcCA8IDIgKiByYWRpdXMpIHJlc3BvbnNlLmJJbkEgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGlzIGlzIHRoZSBzbWFsbGVzdCBvdmVybGFwIHdlJ3ZlIHNlZW4sIGtlZXAgaXQuXG4gICAgICAvLyAob3ZlcmxhcE4gbWF5IGJlIG51bGwgaWYgdGhlIGNpcmNsZSB3YXMgaW4gdGhlIHdyb25nIFZvcm9ub2kgcmVnaW9uKS5cbiAgICAgIGlmIChvdmVybGFwTiAmJiByZXNwb25zZSAmJiBNYXRoLmFicyhvdmVybGFwKSA8IE1hdGguYWJzKHJlc3BvbnNlLm92ZXJsYXApKSB7XG4gICAgICAgIHJlc3BvbnNlLm92ZXJsYXAgPSBvdmVybGFwO1xuICAgICAgICByZXNwb25zZS5vdmVybGFwTi5jb3B5KG92ZXJsYXBOKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIGZpbmFsIG92ZXJsYXAgdmVjdG9yIC0gYmFzZWQgb24gdGhlIHNtYWxsZXN0IG92ZXJsYXAuXG4gICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICByZXNwb25zZS5hID0gcG9seWdvbjtcbiAgICAgIHJlc3BvbnNlLmIgPSBjaXJjbGU7XG5cbiAgICAgIHJlc3BvbnNlLm92ZXJsYXBWLmNvcHkocmVzcG9uc2Uub3ZlcmxhcE4pLnNjYWxlKHJlc3BvbnNlLm92ZXJsYXApO1xuICAgIH1cblxuICAgIFRfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XG4gICAgVF9WRUNUT1JTLnB1c2goZWRnZSk7XG4gICAgVF9WRUNUT1JTLnB1c2gocG9pbnQpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgY2lyY2xlIGFuZCBhIHBvbHlnb24gY29sbGlkZS5cbiAgICogXG4gICAqICoqTk9URToqKiBUaGlzIGlzIHNsaWdodGx5IGxlc3MgZWZmaWNpZW50IHRoYW4gcG9seWdvbkNpcmNsZSBhcyBpdCBqdXN0IHJ1bnMgcG9seWdvbkNpcmNsZSBhbmQgcmV2ZXJzZXMgZXZlcnl0aGluZ1xuICAgKiBhdCB0aGUgZW5kLlxuICAgKiBcbiAgICogQHBhcmFtIHtDaXJjbGV9IGNpcmNsZSBUaGUgY2lyY2xlLlxuICAgKiBAcGFyYW0ge1BvbHlnb259IHBvbHlnb24gVGhlIHBvbHlnb24uXG4gICAqIEBwYXJhbSB7UmVzcG9uc2V9IFtyZXNwb25zZV0gQW4gb3B0aW9uYWwgcmVzcG9uc2Ugb2JqZWN0IHRoYXQgd2lsbCBiZSBwb3B1bGF0ZWQgaWYgdGhleSBpbnRlcnNlY3QuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZXkgaW50ZXJzZWN0IG9yIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG4gIHRlc3RDaXJjbGVQb2x5Z29uKGNpcmNsZSwgcG9seWdvbiwgcmVzcG9uc2UpIHtcbiAgICAvLyBUZXN0IHRoZSBwb2x5Z29uIGFnYWluc3QgdGhlIGNpcmNsZS5cbiAgICBjb25zdCByZXN1bHQgPSB0ZXN0UG9seWdvbkNpcmNsZShwb2x5Z29uLCBjaXJjbGUsIHJlc3BvbnNlKTtcblxuICAgIGlmIChyZXN1bHQgJiYgcmVzcG9uc2UpIHtcbiAgICAgIC8vIFN3YXAgQSBhbmQgQiBpbiB0aGUgcmVzcG9uc2UuXG4gICAgICBjb25zdCBhID0gcmVzcG9uc2UuYTtcbiAgICAgIGNvbnN0IGFJbkIgPSByZXNwb25zZS5hSW5CO1xuXG4gICAgICByZXNwb25zZS5vdmVybGFwTi5yZXZlcnNlKCk7XG4gICAgICByZXNwb25zZS5vdmVybGFwVi5yZXZlcnNlKCk7XG5cbiAgICAgIHJlc3BvbnNlLmEgPSByZXNwb25zZS5iO1xuICAgICAgcmVzcG9uc2UuYiA9IGE7XG5cbiAgICAgIHJlc3BvbnNlLmFJbkIgPSByZXNwb25zZS5iSW5BO1xuICAgICAgcmVzcG9uc2UuYkluQSA9IGFJbkI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgcG9seWdvbnMgY29sbGlkZS5cbiAgICogXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gYSBUaGUgZmlyc3QgcG9seWdvbi5cbiAgICogQHBhcmFtIHtQb2x5Z29ufSBiIFRoZSBzZWNvbmQgcG9seWdvbi5cbiAgICogQHBhcmFtIHtSZXNwb25zZX0gW3Jlc3BvbnNlXSBBbiBvcHRpb25hbCByZXNwb25zZSBvYmplY3QgdGhhdCB3aWxsIGJlIHBvcHVsYXRlZCBpZiB0aGV5IGludGVyc2VjdC5cbiAgICogXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhleSBpbnRlcnNlY3Qgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cbiAgdGVzdFBvbHlnb25Qb2x5Z29uKGEsIGIsIHJlc3BvbnNlKSB7XG4gICAgY29uc3QgYVBvaW50cyA9IGEuY2FsY1BvaW50cztcbiAgICBjb25zdCBhTGVuID0gYVBvaW50cy5sZW5ndGg7XG5cbiAgICBjb25zdCBiUG9pbnRzID0gYi5jYWxjUG9pbnRzO1xuICAgIGNvbnN0IGJMZW4gPSBiUG9pbnRzLmxlbmd0aDtcblxuICAgIC8vIElmIGFueSBvZiB0aGUgZWRnZSBub3JtYWxzIG9mIEEgaXMgYSBzZXBhcmF0aW5nIGF4aXMsIG5vIGludGVyc2VjdGlvbi5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFMZW47IGkrKykge1xuICAgICAgaWYgKHRoaXMuaXNTZXBhcmF0aW5nQXhpcyhhLnBvcywgYi5wb3MsIGFQb2ludHMsIGJQb2ludHMsIGEubm9ybWFsc1tpXSwgcmVzcG9uc2UpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiBhbnkgb2YgdGhlIGVkZ2Ugbm9ybWFscyBvZiBCIGlzIGEgc2VwYXJhdGluZyBheGlzLCBubyBpbnRlcnNlY3Rpb24uXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiTGVuOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmlzU2VwYXJhdGluZ0F4aXMoYS5wb3MsIGIucG9zLCBhUG9pbnRzLCBiUG9pbnRzLCBiLm5vcm1hbHNbaV0sIHJlc3BvbnNlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2luY2Ugbm9uZSBvZiB0aGUgZWRnZSBub3JtYWxzIG9mIEEgb3IgQiBhcmUgYSBzZXBhcmF0aW5nIGF4aXMsIHRoZXJlIGlzIGFuIGludGVyc2VjdGlvblxuICAgIC8vIGFuZCB3ZSd2ZSBhbHJlYWR5IGNhbGN1bGF0ZWQgdGhlIHNtYWxsZXN0IG92ZXJsYXAgKGluIGlzU2VwYXJhdGluZ0F4aXMpLiBcbiAgICAvLyBDYWxjdWxhdGUgdGhlIGZpbmFsIG92ZXJsYXAgdmVjdG9yLlxuICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgcmVzcG9uc2VbJ2EnXSA9IGE7XG4gICAgICByZXNwb25zZVsnYiddID0gYjtcblxuICAgICAgcmVzcG9uc2VbJ292ZXJsYXBWJ10uY29weShyZXNwb25zZVsnb3ZlcmxhcE4nXSkuc2NhbGUocmVzcG9uc2VbJ292ZXJsYXAnXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn0iLCIndXNlIHN0cmljdCdcblxuLyoqXG4gKiAjIyBWZWN0b3JcbiAqIFxuICogUmVwcmVzZW50cyBhIHZlY3RvciBpbiB0d28gZGltZW5zaW9ucyB3aXRoIGB4YCBhbmQgYHlgIHByb3BlcnRpZXMuXG4gKiBcbiAqIENyZWF0ZSBhIG5ldyBWZWN0b3IsIG9wdGlvbmFsbHkgcGFzc2luZyBpbiB0aGUgYHhgIGFuZCBgeWAgY29vcmRpbmF0ZXMuIElmIGEgY29vcmRpbmF0ZSBpcyBub3Qgc3BlY2lmaWVkLCBcbiAqIGl0IHdpbGwgYmUgc2V0IHRvIGAwYC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeD0wXSBUaGUgeCBjb29yZGluYXRlIG9mIHRoaXMgVmVjdG9yLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3k9MF0gVGhlIHkgY29vcmRpbmF0ZSBvZiB0aGlzIFZlY3Rvci5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3B5IHRoZSB2YWx1ZXMgb2YgYW5vdGhlciBWZWN0b3IgaW50byB0aGlzIG9uZS5cbiAgICogXG4gICAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIFZlY3Rvci5cbiAgICogXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBjb3B5KG90aGVyKSB7XG4gICAgdGhpcy54ID0gb3RoZXIueDtcbiAgICB0aGlzLnkgPSBvdGhlci55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFZlY3RvciB3aXRoIHRoZSBzYW1lIGNvb3JkaW5hdGVzIGFzIHRoZSBvbmUuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBUaGUgbmV3IGNsb25lZCBWZWN0b3IuXG4gICAqL1xuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLngsIHRoaXMueSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlIHRoaXMgVmVjdG9yIHRvIGJlIHBlcnBlbmRpY3VsYXIgdG8gd2hhdCBpdCB3YXMgYmVmb3JlLlxuICAgKiBcbiAgICogRWZmZWN0aXZlbHkgdGhpcyByb3RhdGVzIGl0IDkwIGRlZ3JlZXMgaW4gYSBjbG9ja3dpc2UgZGlyZWN0aW9uLlxuICAgKiBcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIHBlcnAoKSB7XG4gICAgY29uc3QgeCA9IHRoaXMueDtcblxuICAgIHRoaXMueCA9IHRoaXMueTtcbiAgICB0aGlzLnkgPSAteDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJvdGF0ZSB0aGlzIFZlY3RvciAoY291bnRlci1jbG9ja3dpc2UpIGJ5IHRoZSBzcGVjaWZpZWQgYW5nbGUgKGluIHJhZGlhbnMpLlxuICAgKiBcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIFRoZSBhbmdsZSB0byByb3RhdGUgKGluIHJhZGlhbnMpLlxuICAgKiBcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIHJvdGF0ZShhbmdsZSkge1xuICAgIGNvbnN0IHggPSB0aGlzLng7XG4gICAgY29uc3QgeSA9IHRoaXMueTtcblxuICAgIHRoaXMueCA9IHggKiBNYXRoLmNvcyhhbmdsZSkgLSB5ICogTWF0aC5zaW4oYW5nbGUpO1xuICAgIHRoaXMueSA9IHggKiBNYXRoLnNpbihhbmdsZSkgKyB5ICogTWF0aC5jb3MoYW5nbGUpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV2ZXJzZSB0aGlzIFZlY3Rvci5cbiAgICogXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICByZXZlcnNlKCkge1xuICAgIHRoaXMueCA9IC10aGlzLng7XG4gICAgdGhpcy55ID0gLXRoaXMueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZSB0aGlzIHZlY3RvciAobWFrZSBpdCBoYXZlIGEgbGVuZ3RoIG9mIGAxYCkuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgbm9ybWFsaXplKCkge1xuICAgIGNvbnN0IGQgPSB0aGlzLmxlbigpO1xuXG4gICAgaWYgKGQgPiAwKSB7XG4gICAgICB0aGlzLnggPSB0aGlzLnggLyBkO1xuICAgICAgdGhpcy55ID0gdGhpcy55IC8gZDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW5vdGhlciBWZWN0b3IgdG8gdGhpcyBvbmUuXG4gICAqIFxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIG90aGVyIFZlY3Rvci5cbiAgICogXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBhZGQob3RoZXIpIHtcbiAgICB0aGlzLnggKz0gb3RoZXIueDtcbiAgICB0aGlzLnkgKz0gb3RoZXIueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnRyYWN0IGFub3RoZXIgVmVjdG9yIGZyb20gdGhpcyBvbmUuXG4gICAqIFxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIG90aGVyIFZlY3Rvci5cbiAgICogXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBzdWIob3RoZXIpIHtcbiAgICB0aGlzLnggLT0gb3RoZXIueDtcbiAgICB0aGlzLnkgLT0gb3RoZXIueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjYWxlIHRoaXMgVmVjdG9yLlxuICAgKiBcbiAgICogQW4gaW5kZXBlbmRlbnQgc2NhbGluZyBmYWN0b3IgY2FuIGJlIHByb3ZpZGVkIGZvciBlYWNoIGF4aXMsIG9yIGEgc2luZ2xlIHNjYWxpbmcgZmFjdG9yIHdpbGwgc2NhbGVcbiAgICogYm90aCBgeGAgYW5kIGB5YC5cbiAgICogXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IFRoZSBzY2FsaW5nIGZhY3RvciBpbiB0aGUgeCBkaXJlY3Rpb24uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeV0gVGhlIHNjYWxpbmcgZmFjdG9yIGluIHRoZSB5IGRpcmVjdGlvbi5cbiAgICogXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBzY2FsZSh4LCB5KSB7XG4gICAgdGhpcy54ICo9IHg7XG4gICAgdGhpcy55ICo9IHR5cGVvZiB5ICE9ICd1bmRlZmluZWQnID8geSA6IHg7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9qZWN0IHRoaXMgVmVjdG9yIG9udG8gYW5vdGhlciBWZWN0b3IuXG4gICAqIFxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIFZlY3RvciB0byBwcm9qZWN0IG9udG8uXG4gICAqIFxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgcHJvamVjdChvdGhlcikge1xuICAgIGNvbnN0IGFtdCA9IHRoaXMuZG90KG90aGVyKSAvIG90aGVyLmxlbjIoKTtcblxuICAgIHRoaXMueCA9IGFtdCAqIG90aGVyLng7XG4gICAgdGhpcy55ID0gYW10ICogb3RoZXIueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2plY3QgdGhpcyBWZWN0b3Igb250byBhIFZlY3RvciBvZiB1bml0IGxlbmd0aC5cbiAgICogXG4gICAqIFRoaXMgaXMgc2xpZ2h0bHkgbW9yZSBlZmZpY2llbnQgdGhhbiBgcHJvamVjdGAgd2hlbiBkZWFsaW5nIHdpdGggdW5pdCB2ZWN0b3JzLlxuICAgKiBcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSB1bml0IHZlY3RvciB0byBwcm9qZWN0IG9udG8uXG4gICAqIFxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgcHJvamVjdE4ob3RoZXIpIHtcbiAgICBjb25zdCBhbXQgPSB0aGlzLmRvdChvdGhlcik7XG5cbiAgICB0aGlzLnggPSBhbXQgKiBvdGhlci54O1xuICAgIHRoaXMueSA9IGFtdCAqIG90aGVyLnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWZsZWN0IHRoaXMgVmVjdG9yIG9uIGFuIGFyYml0cmFyeSBheGlzLlxuICAgKiBcbiAgICogQHBhcmFtIHtWZWN0b3J9IGF4aXMgVGhlIFZlY3RvciByZXByZXNlbnRpbmcgdGhlIGF4aXMuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgcmVmbGVjdChheGlzKSB7XG4gICAgY29uc3QgeCA9IHRoaXMueDtcbiAgICBjb25zdCB5ID0gdGhpcy55O1xuXG4gICAgdGhpcy5wcm9qZWN0KGF4aXMpLnNjYWxlKDIpO1xuXG4gICAgdGhpcy54IC09IHg7XG4gICAgdGhpcy55IC09IHk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWZsZWN0IHRoaXMgVmVjdG9yIG9uIGFuIGFyYml0cmFyeSBheGlzLlxuICAgKiBcbiAgICogVGhpcyBpcyBzbGlnaHRseSBtb3JlIGVmZmljaWVudCB0aGFuIGByZWZsZWN0YCB3aGVuIGRlYWxpbmcgd2l0aCBhbiBheGlzIHRoYXQgaXMgYSB1bml0IHZlY3Rvci5cbiAgICogXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBheGlzIFRoZSBWZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBheGlzLlxuICAgKiBcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIHJlZmxlY3ROKGF4aXMpIHtcbiAgICBjb25zdCB4ID0gdGhpcy54O1xuICAgIGNvbnN0IHkgPSB0aGlzLnk7XG5cbiAgICB0aGlzLnByb2plY3ROKGF4aXMpLnNjYWxlKDIpO1xuXG4gICAgdGhpcy54IC09IHg7XG4gICAgdGhpcy55IC09IHk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGRvdCBwcm9kdWN0IG9mIHRoaXMgVmVjdG9yIGFuZCBhbm90aGVyLlxuICAgKiBcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBWZWN0b3IgdG8gZG90IHRoaXMgb25lIGFnYWluc3QuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgZG90KG90aGVyKSB7XG4gICAgcmV0dXJuIHRoaXMueCAqIG90aGVyLnggKyB0aGlzLnkgKiBvdGhlci55O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc3F1YXJlZCBsZW5ndGggb2YgdGhpcyBWZWN0b3IuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgbGVuMigpIHtcbiAgICByZXR1cm4gdGhpcy5kb3QodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBsZW5ndGggb2YgdGhpcyBWZWN0b3IuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgbGVuKCkge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5sZW4yKCkpO1xuICB9XG59IiwiZXhwb3J0IGNsYXNzIEF1ZGlvTWFuYWdlciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGF1ZGlvTWFwOiBNYXA8c3RyaW5nLCBIVE1MQXVkaW9FbGVtZW50PiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHBsYXkoa2V5OiBzdHJpbmcsIHNyYzogc3RyaW5nID0gdW5kZWZpbmVkLCBsb29wOiBib29sZWFuID0gZmFsc2UpOiBIVE1MQXVkaW9FbGVtZW50IHtcclxuICAgICAgICBsZXQgYXVkaW86IEhUTUxBdWRpb0VsZW1lbnQgPSBBdWRpb01hbmFnZXIuYXVkaW9NYXAuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYgKGF1ZGlvID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKHNyYyA9PT0gdW5kZWZpbmVkKSBhdWRpbyA9IG5ldyBBdWRpbygpO1xyXG4gICAgICAgICAgICBlbHNlIGF1ZGlvID0gbmV3IEF1ZGlvKHNyYyk7XHJcbiAgICAgICAgICAgIGF1ZGlvLmxvb3AgPSBsb29wO1xyXG4gICAgICAgICAgICBBdWRpb01hbmFnZXIuYXVkaW9NYXAuc2V0KGtleSwgYXVkaW8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhdWRpby5wbGF5KCkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGVycik7XHJcbiAgICAgICAgICAgIGF1ZGlvLnNldEF0dHJpYnV0ZSgnbXV0ZWQnLCAnJyk7XHJcbiAgICAgICAgICAgIGF1ZGlvLm11dGVkID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYXVkaW87XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBwbGF5TXVzaWMoc3JjOiBzdHJpbmcsIGxvb3A6IGJvb2xlYW4gPSB0cnVlKTogSFRNTEF1ZGlvRWxlbWVudCB7XHJcbiAgICAgICAgbGV0IGF1ZGlvOiBIVE1MQXVkaW9FbGVtZW50ID0gQXVkaW9NYW5hZ2VyLmF1ZGlvTWFwLmdldChcIl9tdXNpY1wiKTtcclxuICAgICAgICBpZiAoYXVkaW8gIT09IHVuZGVmaW5lZCAmJiAhYXVkaW8uc3JjLmVuZHNXaXRoKHNyYykpIHtcclxuICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLnJlbGVhc2UoXCJfbXVzaWNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGF1ZGlvID0gQXVkaW9NYW5hZ2VyLnBsYXkoXCJfbXVzaWNcIiwgc3JjLCBsb29wKTtcclxuICAgICAgICBhdWRpby52b2x1bWUgPSAwLjc1O1xyXG4gICAgICAgIHJldHVybiBhdWRpbztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHBhdXNlKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGF1ZGlvOiBIVE1MQXVkaW9FbGVtZW50ID0gQXVkaW9NYW5hZ2VyLmF1ZGlvTWFwLmdldChrZXkpO1xyXG4gICAgICAgIGlmIChhdWRpbyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGF1ZGlvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWxlYXNlKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKEF1ZGlvTWFuYWdlci5wYXVzZShrZXkpKSB7XHJcbiAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5hdWRpb01hcC5nZXQoa2V5KS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIEF1ZGlvTWFuYWdlci5hdWRpb01hcC5kZWxldGUoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGF1dG9QbGF5Rml4ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgYXV0b1BsYXlGaXgoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFBdWRpb01hbmFnZXIuYXV0b1BsYXlGaXhlZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oXCJUaGlzIGJyb3dzZXIgc3V4OiB0cnlpbmcgdG8gZml4IGF1dG9wbGF5Li4uXCIpO1xyXG4gICAgICAgICAgICBBdWRpb01hbmFnZXIuYXV0b1BsYXlGaXhlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5hdWRpb01hcC5mb3JFYWNoKCh2YWwsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbC5tdXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbC5yZW1vdmVBdHRyaWJ1dGUoJ211dGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsLm11dGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PSBcIl9tdXNpY1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbC5wbGF5KCkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBdWRpb01hbmFnZXIuYXV0b1BsYXlGaXhlZCkgY29uc29sZS53YXJuKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBdWRpb01hbmFnZXIuYXV0b1BsYXlGaXhlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsLnNldEF0dHJpYnV0ZSgnbXV0ZWQnLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwubXV0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBDYW1lcmEge1xyXG4gICAgcHVibGljIHg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgeTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBhbmdsZTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzaXplWDogbnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyBzaXplWTogbnVtYmVyID0gMTtcclxufSIsImltcG9ydCB7IEJhc2ljTGV2ZWwgfSBmcm9tICcuL2xldmVscy9CYXNpY0xldmVsJztcclxuaW1wb3J0IHsgVGVzdExldmVsIH0gZnJvbSAnLi9sZXZlbHMvVGVzdExldmVsJztcclxuaW1wb3J0IHsgQ2FtZXJhIH0gZnJvbSAnLi9DYW1lcmEnO1xyXG5leHBvcnQgY2xhc3MgR2FtZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIERFQlVHOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgc3RhdGljIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBwdWJsaWMgc3RhdGljIGxhc3RUaW1lc3RhbXA6IERPTUhpZ2hSZXNUaW1lU3RhbXAgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxldmVsOiBCYXNpY0xldmVsID0gbmV3IFRlc3RMZXZlbCgpO1xyXG4gICAgcHVibGljIHN0YXRpYyBjYW1lcmE6IENhbWVyYSA9IG5ldyBDYW1lcmEoKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGtleU1hcDogTWFwPHN0cmluZywgYm9vbGVhbj4gPSBuZXcgTWFwPHN0cmluZywgYm9vbGVhbj4oKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgaXNQdXNoaW5nUmVsb2FkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB1cGRhdGUodGltZXN0YW1wOiBET01IaWdoUmVzVGltZVN0YW1wKSB7XHJcbiAgICAgICAgR2FtZS5ERUJVRyA9IEdhbWUuaXNCdXR0b25Eb3duKFwiRjJcIik7XHJcbiAgICAgICAgR2FtZS5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW4tY2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgICAgIC8vIFJlc2l6ZSBrZWVwaW5nIGFzcGVjdCByYXRpb1xyXG4gICAgICAgIGxldCBwYWdlQXNwZWN0UmF0aW8gPSBkb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoIC8gZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgbGV0IHNjYWxlID0gMjUgLyAxOSA8IHBhZ2VBc3BlY3RSYXRpbyA/IGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0IC8gMTkgOiBkb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoIC8gMjU7XHJcbiAgICAgICAgR2FtZS5jYW52YXMud2lkdGggPSBzY2FsZSAqIDI1O1xyXG4gICAgICAgIEdhbWUuY2FudmFzLmhlaWdodCA9IHNjYWxlICogMTk7XHJcbiAgICAgICAgLy8gR2V0IGNvbnRleHQgYW5kIGNsZWFyXHJcbiAgICAgICAgbGV0IGN0eCA9IEdhbWUuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICBjdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBHYW1lLmNhbnZhcy53aWR0aCwgR2FtZS5jYW52YXMuaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgY3R4LnNhdmUoKTtcclxuICAgICAgICBjdHgudHJhbnNsYXRlKEdhbWUuY2FtZXJhLngsIEdhbWUuY2FtZXJhLnkpO1xyXG4gICAgICAgIGN0eC5yb3RhdGUoR2FtZS5jYW1lcmEuYW5nbGUpO1xyXG4gICAgICAgIGN0eC5zY2FsZShHYW1lLmNhbWVyYS5zaXplWCAqIChHYW1lLmNhbnZhcy53aWR0aCAvIDgwMCksIEdhbWUuY2FtZXJhLnNpemVZICogKEdhbWUuY2FudmFzLmhlaWdodCAvIDYwOCkpO1xyXG4gICAgICAgIEdhbWUubGV2ZWwudXBkYXRlKGN0eCwgKHRpbWVzdGFtcCAtIEdhbWUubGFzdFRpbWVzdGFtcCkgLyAxMDAwKTtcclxuICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG5cclxuICAgICAgICAvLyBSZWxvYWQgbGV2ZWxcclxuICAgICAgICBpZiAoR2FtZS5pc0J1dHRvbkRvd24oJ3InKSkge1xyXG4gICAgICAgICAgICBpZiAoIUdhbWUuaXNQdXNoaW5nUmVsb2FkKSB0aGlzLmxldmVsID0gdGhpcy5sZXZlbC5pbnN0YW5jZUZhYnJpYygpO1xyXG4gICAgICAgICAgICBHYW1lLmlzUHVzaGluZ1JlbG9hZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIEdhbWUuaXNQdXNoaW5nUmVsb2FkID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgR2FtZS5sYXN0VGltZXN0YW1wID0gdGltZXN0YW1wO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNCdXR0b25Eb3duKGtleU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChrZXlOYW1lLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGlmICghR2FtZS5rZXlNYXAuaGFzKGtleU5hbWUudG9Mb3dlckNhc2UoKSkgfHwgIUdhbWUua2V5TWFwLmdldChrZXlOYW1lLnRvTG93ZXJDYXNlKCkpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gR2FtZS5rZXlNYXAuaGFzKGtleU5hbWUudG9VcHBlckNhc2UoKSkgJiYgR2FtZS5rZXlNYXAuZ2V0KGtleU5hbWUudG9VcHBlckNhc2UoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHYW1lLmtleU1hcC5oYXMoa2V5TmFtZSkgJiYgR2FtZS5rZXlNYXAuZ2V0KGtleU5hbWUpO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiByYW5kb21VbnNlY3VyZVVVSUQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAneHh4eC14eHh4LXh4eC14eHh4Jy5yZXBsYWNlKC9beF0vZywgKGMpID0+IHsgIFxyXG4gICAgICAgIGNvbnN0IHIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNik7ICBcclxuICAgICAgICByZXR1cm4gci50b1N0cmluZygxNik7ICBcclxuICAgIH0pO1xyXG59IiwiaW1wb3J0IHsgQmFzaWNPYmplY3QgfSBmcm9tICcuLi9vYmplY3RzL0Jhc2ljT2JqZWN0JztcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4uL0dhbWUnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uL1NBVC9WZWN0b3InO1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzaWNMZXZlbCB7XHJcbiAgICBwdWJsaWMgb2JqZWN0czogQXJyYXk8QmFzaWNPYmplY3Q+ID0gW107XHJcbiAgICBwcm90ZWN0ZWQgcmVtb3ZlUXVldWU6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RzW2ldLnVwZGF0ZShkZWx0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aGlsZSh0aGlzLnJlbW92ZVF1ZXVlLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG8gPSAwOyBvIDwgdGhpcy5vYmplY3RzLmxlbmd0aDsgbysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vYmplY3RzW29dLmlkID09IHRoaXMucmVtb3ZlUXVldWVbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHMuc3BsaWNlKG8sIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlUXVldWUuc3BsaWNlKDAsIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVuZGVyaW5nXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RzW2ldLmRyYXcoY3R4LCBkZWx0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChHYW1lLkRFQlVHKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0NvbGxpc2lvbkxpbmVzKGN0eCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVPYmplY3QoaWQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlUXVldWUucHVzaChpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzUmVtb3ZlZChpZDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlUXVldWUuaW5jbHVkZXMoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkcmF3Q29sbGlzaW9uTGluZXMoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcclxuICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvaW50czogVmVjdG9yW10gPSB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb2ludHM7XHJcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY3R4Lm1vdmVUbyh0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCArIHBvaW50c1swXS54LCB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueSArIHBvaW50c1swXS55KTtcclxuICAgICAgICAgICAgZm9yIChsZXQgcCA9IDA7IHAgPCBwb2ludHMubGVuZ3RoOyBwKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChwICsgMSA9PSBwb2ludHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVUbyh0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCArIHBvaW50c1swXS54LCB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueSArIHBvaW50c1swXS55KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVUbyh0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCArIHBvaW50c1twICsgMV0ueCwgdGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnkgKyBwb2ludHNbcCArIDFdLnkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSAnI2ZmMDAwMCc7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgaW5zdGFuY2VGYWJyaWMoKTogQmFzaWNMZXZlbDtcclxufSIsImltcG9ydCB7IEJhc2ljTGV2ZWwgfSBmcm9tICcuL0Jhc2ljTGV2ZWwnO1xyXG5pbXBvcnQgeyBQbGF5ZXJPYmplY3QgfSBmcm9tICcuLi9vYmplY3RzL3BsYXllci9QbGF5ZXJPYmplY3QnO1xyXG5pbXBvcnQgeyBJbWFnZU9iamVjdCB9IGZyb20gJy4uL29iamVjdHMvSW1hZ2VPYmplY3QnO1xyXG5pbXBvcnQgeyBTcGlrZU9iamVjdCB9IGZyb20gJy4uL29iamVjdHMvU3Bpa2VPYmplY3QnO1xyXG5pbXBvcnQgeyBBdWRpb01hbmFnZXIgfSBmcm9tICcuLi9BdWRpb01hbmFnZXInO1xyXG5leHBvcnQgY2xhc3MgVGVzdExldmVsIGV4dGVuZHMgQmFzaWNMZXZlbCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIEF1ZGlvTWFuYWdlci5wbGF5TXVzaWMoXCJhc3NldHMvbXVzaWMvYmVnaW5zLm9nZ1wiKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgUGxheWVyT2JqZWN0KDMyLCA1MTIpKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI1OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IEltYWdlT2JqZWN0KFwiZ3JvdW5kXCIgKyBpLCBpICogMzIsIDU3NiwgMzIsIDMyLCBcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3NwckZhbGxpbmdCbG9jay5wbmdcIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgSW1hZ2VPYmplY3QoXCJncm91bmQyNVwiLCAyNTYsIDU0NCwgMzIsIDMyLCBcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3NwckZhbGxpbmdCbG9jay5wbmdcIikpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBJbWFnZU9iamVjdChcImdyb3VuZDI2XCIsIDI1NiwgNTEyLCAzMiwgMzIsIFwiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvc3ByRmFsbGluZ0Jsb2NrLnBuZ1wiKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IEltYWdlT2JqZWN0KFwiZ3JvdW5kMjdcIiwgMjU2LCA0ODAsIDMyLCAzMiwgXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy9zcHJGYWxsaW5nQmxvY2sucG5nXCIpKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgSW1hZ2VPYmplY3QoXCJncm91bmQyOFwiLCAyNTYsIDQ0OCwgMzIsIDMyLCBcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3NwckZhbGxpbmdCbG9jay5wbmdcIikpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBJbWFnZU9iamVjdChcImdyb3VuZDI5XCIsIDI4OCwgNDE2LCAzMiwgMzIsIFwiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvc3ByRmFsbGluZ0Jsb2NrLnBuZ1wiKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IEltYWdlT2JqZWN0KFwiZ3JvdW5kMzBcIiwgMjg4LCAzODQsIDMyLCAzMiwgXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy9zcHJGYWxsaW5nQmxvY2sucG5nXCIpKTtcclxuXHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFNwaWtlT2JqZWN0KFwic3Bpa2UwXCIsIDMyMCwgNDE2LCAxKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFNwaWtlT2JqZWN0KFwic3Bpa2UxXCIsIDMyMCwgMzg0LCAxKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFNwaWtlT2JqZWN0KFwic3Bpa2UyXCIsIDI4OCwgMzUyLCAwKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluc3RhbmNlRmFicmljKCk6IEJhc2ljTGV2ZWwge1xyXG4gICAgICAgIHJldHVybiBuZXcgVGVzdExldmVsKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi4vR2FtZSc7XHJcbmltcG9ydCBTQVQgZnJvbSAnLi4vU0FUL1NBVCc7XHJcbmltcG9ydCBSZXNwb25zZSBmcm9tICcuLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgUG9seWdvbiBmcm9tICcuLi9TQVQvUG9seWdvbic7XHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNpY09iamVjdCB7XHJcbiAgICBwdWJsaWMgcG9seWdvbjogUG9seWdvbjtcclxuICAgIHB1YmxpYyBjb2xsaXNpb246IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHc6IG51bWJlciwgaDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIGlmICh3ID09IDAgJiYgaCA9PSAwKSB0aGlzLmNvbGxpc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucG9seWdvbiA9IG5ldyBTQVQuUG9seWdvbihuZXcgU0FULlZlY3Rvcih4LCB5KSwgW1xyXG4gICAgICAgICAgICBuZXcgU0FULlZlY3RvcigpLCBuZXcgU0FULlZlY3RvcigwLCBoKSxcclxuICAgICAgICAgICAgbmV3IFNBVC5WZWN0b3IodywgaCksIG5ldyBTQVQuVmVjdG9yKHcsIDApXHJcbiAgICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vdmVCeSh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBjb2xsaWRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucG9seWdvbi5wb3MuYWRkKG5ldyBTQVQuVmVjdG9yKHgsIHkpKTtcclxuICAgICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHYW1lLmxldmVsLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCFHYW1lLmxldmVsLm9iamVjdHNbaV0uY29sbGlzaW9uIHx8IEdhbWUubGV2ZWwub2JqZWN0c1tpXS5pZCA9PSB0aGlzLmlkKSBjb250aW51ZTtcclxuICAgICAgICAgICAgcmVzcG9uc2UuY2xlYXIoKTtcclxuICAgICAgICAgICAgaWYgKFNBVC50ZXN0UG9seWdvblBvbHlnb24odGhpcy5wb2x5Z29uLCBHYW1lLmxldmVsLm9iamVjdHNbaV0ucG9seWdvbiwgcmVzcG9uc2UpKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xsaWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgYUNvbGw6IGJvb2xlYW4gPSB0aGlzLm9uQ29sbGlzaW9uKHJlc3BvbnNlLCBHYW1lLmxldmVsLm9iamVjdHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJDb2xsOiBib29sZWFuID0gR2FtZS5sZXZlbC5vYmplY3RzW2ldLm9uQ29sbGlzaW9uKHJlc3BvbnNlLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIGlmIChhQ29sbCAmJiBiQ29sbCAmJiB0aGlzLmNvbGxpc2lvbikgdGhpcy5wb2x5Z29uLnBvcy5zdWIocmVzcG9uc2Uub3ZlcmxhcFYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb2xsaWRlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Db2xsaXNpb24oaW5mbzogUmVzcG9uc2UsIG9iajogQmFzaWNPYmplY3QpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZDtcclxufSIsImltcG9ydCB7IEJhc2ljT2JqZWN0IH0gZnJvbSAnLi9CYXNpY09iamVjdCc7XHJcbmV4cG9ydCBjbGFzcyBJbWFnZU9iamVjdCBleHRlbmRzIEJhc2ljT2JqZWN0IHtcclxuICAgIHB1YmxpYyBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlciwgc3JjOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihpZCwgeCwgeSwgdywgaCk7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSBzcmM7XHJcbiAgICAgICAgdGhpcy5pbWFnZS53aWR0aCA9IHc7XHJcbiAgICAgICAgdGhpcy5pbWFnZS5oZWlnaHQgPSBoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge31cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcikge1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy5wb2x5Z29uLnBvcy54LCB0aGlzLnBvbHlnb24ucG9zLnksIHRoaXMuaW1hZ2Uud2lkdGgsIHRoaXMuaW1hZ2UuaGVpZ2h0KTtcclxuICAgIH1cclxufSIsImltcG9ydCBSZXNwb25zZSBmcm9tICcuLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgU0FUIGZyb20gJy4uL1NBVC9TQVQnO1xyXG5pbXBvcnQgeyBCYXNpY09iamVjdCB9IGZyb20gJy4vQmFzaWNPYmplY3QnO1xyXG5pbXBvcnQgeyBJbWFnZU9iamVjdCB9IGZyb20gJy4vSW1hZ2VPYmplY3QnO1xyXG5pbXBvcnQgeyBQbGF5ZXJPYmplY3QgfSBmcm9tICcuL3BsYXllci9QbGF5ZXJPYmplY3QnO1xyXG5leHBvcnQgY2xhc3MgU3Bpa2VPYmplY3QgZXh0ZW5kcyBJbWFnZU9iamVjdCB7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGlyZWN0aW9uOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIGRpcmVjdGlvbjogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHgsIHksIDMyLCAzMiwgXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy9zcHJTcGlrZS5wbmdcIik7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XHJcbiAgICAgICAgc3dpdGNoKHRoaXMuZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgU0FULlBvbHlnb24obmV3IFNBVC5WZWN0b3IoeCwgeSksIFtcclxuICAgICAgICAgICAgICAgIG5ldyBTQVQuVmVjdG9yKDEsIDE2KSwgbmV3IFNBVC5WZWN0b3IoMzEsIDMxKSwgbmV3IFNBVC5WZWN0b3IoMzEsIDEpXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIHRoaXMucG9seWdvbiA9IG5ldyBTQVQuUG9seWdvbihuZXcgU0FULlZlY3Rvcih4LCB5KSwgW1xyXG4gICAgICAgICAgICAgICAgbmV3IFNBVC5WZWN0b3IoMSwgMSksIG5ldyBTQVQuVmVjdG9yKDE2LCAzMSksIG5ldyBTQVQuVmVjdG9yKDMxLCAxKVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgU0FULlBvbHlnb24obmV3IFNBVC5WZWN0b3IoeCwgeSksIFtcclxuICAgICAgICAgICAgICAgIG5ldyBTQVQuVmVjdG9yKDEsIDEpLCBuZXcgU0FULlZlY3RvcigxLCAzMSksIG5ldyBTQVQuVmVjdG9yKDMxLCAxNilcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHRoaXMucG9seWdvbiA9IG5ldyBTQVQuUG9seWdvbihuZXcgU0FULlZlY3Rvcih4LCB5KSwgW1xyXG4gICAgICAgICAgICAgICAgbmV3IFNBVC5WZWN0b3IoMTYsIDEpLCBuZXcgU0FULlZlY3RvcigxLCAzMSksIG5ldyBTQVQuVmVjdG9yKDMxLCAzMSlcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbGxpc2lvbihpbmZvOiBSZXNwb25zZSwgb2JqOiBCYXNpY09iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBQbGF5ZXJPYmplY3QpIHtcclxuICAgICAgICAgICAgKG9iaiBhcyBQbGF5ZXJPYmplY3QpLmRpZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMuZGlyZWN0aW9uICogMzIsIDAsIDMyLCAzMiwgdGhpcy5wb2x5Z29uLnBvcy54LCB0aGlzLnBvbHlnb24ucG9zLnksIDMyLCAzMik7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVzcG9uc2UgZnJvbSAnLi4vLi4vU0FUL1Jlc3BvbnNlJztcclxuaW1wb3J0IFNBVCBmcm9tICcuLi8uLi9TQVQvU0FUJztcclxuaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tICcuLi9JbWFnZU9iamVjdCc7XHJcbmltcG9ydCB7IFBsYXllck9iamVjdCB9IGZyb20gJy4vUGxheWVyT2JqZWN0JztcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4uLy4uL0dhbWUnO1xyXG5pbXBvcnQgeyBCYXNpY09iamVjdCB9IGZyb20gJy4uL0Jhc2ljT2JqZWN0JztcclxuaW1wb3J0IHsgU3Bpa2VPYmplY3QgfSBmcm9tICcuLi9TcGlrZU9iamVjdCc7XHJcbmV4cG9ydCBjbGFzcyBCbG9vZFBhcnRpY2xlIGV4dGVuZHMgSW1hZ2VPYmplY3Qge1xyXG4gICAgcHVibGljIGR4OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGR5OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHN0dWNrOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgdHlwZTogbnVtYmVyID0gMDtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIGR4OiBudW1iZXIsIGR5OiBudW1iZXIsIGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihpZCwgeCwgeSwgMiwgMiwgXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy9wbGF5ZXIvc3ByQmxvb2QucG5nXCIpO1xyXG4gICAgICAgIHRoaXMuZHggPSBkeDtcclxuICAgICAgICB0aGlzLmR5ID0gZHk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMyk7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb24gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5zdHVjaykgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZHkgKz0gUGxheWVyT2JqZWN0LmdyYXZpdHkgKiBkZWx0YTtcclxuICAgICAgICBpZiAodGhpcy5keCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5keCAtPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZHggPCAwKSB0aGlzLmR4ID0gMDtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZHggPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHggKz0gZGVsdGE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmR4ID4gMCkgdGhpcy5keCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm1vdmVCeSh0aGlzLmR4LCB0aGlzLmR5KSkge1xyXG4gICAgICAgICAgICB0aGlzLmR4ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5keSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc3R1Y2sgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW92ZUJ5KHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGNvbGxpZGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wb2x5Z29uLnBvcy5hZGQobmV3IFNBVC5WZWN0b3IoeCwgeSkpO1xyXG4gICAgICAgIGxldCByZXNwb25zZTogUmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdhbWUubGV2ZWwub2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIUdhbWUubGV2ZWwub2JqZWN0c1tpXS5jb2xsaXNpb24gfHwgR2FtZS5sZXZlbC5vYmplY3RzW2ldLmlkID09IHRoaXMuaWQpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICByZXNwb25zZS5jbGVhcigpO1xyXG4gICAgICAgICAgICBpZiAoU0FULnRlc3RQb2x5Z29uUG9seWdvbih0aGlzLnBvbHlnb24sIEdhbWUubGV2ZWwub2JqZWN0c1tpXS5wb2x5Z29uLCByZXNwb25zZSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhQ29sbDogYm9vbGVhbiA9IHRoaXMub25Db2xsaXNpb24ocmVzcG9uc2UsIEdhbWUubGV2ZWwub2JqZWN0c1tpXSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lLmxldmVsLm9iamVjdHNbaV0ub25Db2xsaXNpb24ocmVzcG9uc2UsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFDb2xsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2x5Z29uLnBvcy5zdWIocmVzcG9uc2Uub3ZlcmxhcFYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxpZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29sbGlkZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ29sbGlzaW9uKGluZm86IFJlc3BvbnNlLCBvYmo6IEJhc2ljT2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFBsYXllck9iamVjdCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBTcGlrZU9iamVjdCkgcmV0dXJuIE1hdGgucmFuZG9tKCkgPCAwLjU7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMudHlwZSAqIDMsIDAsIDMsIDQsIHRoaXMucG9seWdvbi5wb3MueCAtIDEsIHRoaXMucG9seWdvbi5wb3MueSAtIDEsIDMsIDQpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tICcuLi9JbWFnZU9iamVjdCc7XHJcbmltcG9ydCB7IFBsYXllck9iamVjdCB9IGZyb20gJy4vUGxheWVyT2JqZWN0JztcclxuaW1wb3J0IFJlc3BvbnNlIGZyb20gJy4uLy4uL1NBVC9SZXNwb25zZSc7XHJcbmltcG9ydCB7IEJhc2ljT2JqZWN0IH0gZnJvbSAnLi4vQmFzaWNPYmplY3QnO1xyXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi4vLi4vR2FtZSc7XHJcbmltcG9ydCB7IFNwaWtlT2JqZWN0IH0gZnJvbSAnLi4vU3Bpa2VPYmplY3QnO1xyXG5leHBvcnQgY2xhc3MgQnVsbGV0T2JqZWN0IGV4dGVuZHMgSW1hZ2VPYmplY3Qge1xyXG4gICAgcHJvdGVjdGVkIGZyYW1lVGltZTogbnVtYmVyID0gMDtcclxuICAgIHByb3RlY3RlZCBkaXJlY3Rpb246IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgZGlyZWN0aW9uOiBudW1iZXIsIGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihpZCwgeCAtIDUsIHkgLSAxLCAxMCwgMiwgXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy9wbGF5ZXIvc3ByQnVsbGV0LnBuZ1wiKTtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1vdmVCeSh0aGlzLmRpcmVjdGlvbiAqIDc1MCAqIGRlbHRhLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Db2xsaXNpb24oaW5mbzogUmVzcG9uc2UsIG9iajogQmFzaWNPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgU3Bpa2VPYmplY3QpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgUGxheWVyT2JqZWN0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgR2FtZS5sZXZlbC5yZW1vdmVPYmplY3QodGhpcy5pZCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mcmFtZVRpbWUgKz0gZGVsdGE7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuZnJhbWVUaW1lID49IDAuMjApIHRoaXMuZnJhbWVUaW1lIC09IDAuMjA7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCBNYXRoLmZsb29yKHRoaXMuZnJhbWVUaW1lIC8gMC4xMCkgKiA0LCAwLCA0LCA0LCB0aGlzLnBvbHlnb24ucG9zLnggKyAzLCB0aGlzLnBvbHlnb24ucG9zLnkgLSAxLCA0LCA0KTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEltYWdlT2JqZWN0IH0gZnJvbSBcIi4uL0ltYWdlT2JqZWN0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGVhdGhNZXNzYWdlIGV4dGVuZHMgSW1hZ2VPYmplY3Qge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJkZWF0aF9tZXNzYWdlXCIsIDQwMCAtIDM1MCwgMzA0IC0gODIsIDcwMCwgMTY0LCBcImFzc2V0cy90ZXh0dXJlcy91aS9zcHJHYW1lT3Zlci5wbmdcIik7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb24gPSBmYWxzZTtcclxuICAgIH1cclxufSIsImltcG9ydCBSZXNwb25zZSBmcm9tICcuLi8uLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgU0FUIGZyb20gJy4uLy4uL1NBVC9TQVQnO1xyXG5pbXBvcnQgeyBJbWFnZU9iamVjdCB9IGZyb20gJy4uL0ltYWdlT2JqZWN0JztcclxuaW1wb3J0IHsgUGxheWVyT2JqZWN0IH0gZnJvbSAnLi9QbGF5ZXJPYmplY3QnO1xyXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi4vLi4vR2FtZSc7XHJcbmltcG9ydCB7IEJhc2ljT2JqZWN0IH0gZnJvbSAnLi4vQmFzaWNPYmplY3QnO1xyXG5pbXBvcnQgeyBTcGlrZU9iamVjdCB9IGZyb20gJy4uL1NwaWtlT2JqZWN0JztcclxuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi4vLi4vU0FUL1BvbHlnb24nO1xyXG5leHBvcnQgY2xhc3MgR2liUGFydGljbGUgZXh0ZW5kcyBJbWFnZU9iamVjdCB7XHJcbiAgICBwdWJsaWMgZHg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgZHk6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgdHlwZTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBib2R5VHlwZTogbnVtYmVyID0gMDtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBUeXBlIDA6IGJvZHksXHJcbiAgICAgKiB0eXBlIDE6IGJvZHkgc3RvbmVkLFxyXG4gICAgICogdHlwZSAyOiBoZWFkLFxyXG4gICAgICogdHlwZSAzOiBoZWFkIHN0b25lZCxcclxuICAgICAqIHR5cGUgNDogYXJtLFxyXG4gICAgICogdHlwZSA1OiBhcm0gc3RvbmVkLFxyXG4gICAgICogdHlwZSA2OiBmZWV0LFxyXG4gICAgICogdHlwZSA3OiBmZWV0IHN0b25lZFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgZHg6IG51bWJlciwgZHk6IG51bWJlciwgdHlwZTogbnVtYmVyLCBpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHgsIHksIDgsIDgsIFwiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvcGxheWVyL3NwckdpYnMucG5nXCIpO1xyXG4gICAgICAgIHRoaXMuZHggPSBkeDtcclxuICAgICAgICB0aGlzLmR5ID0gZHk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gMCB8fCB0aGlzLnR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmJvZHlUeXBlID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMzIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmR5ICs9IFBsYXllck9iamVjdC5ncmF2aXR5ICogTWF0aC5taW4oZGVsdGEsIDAuMyk7XHJcbiAgICAgICAgaWYgKHRoaXMuZHggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHggLT0gZGVsdGE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmR4IDwgMCkgdGhpcy5keCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmR4IDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLmR4ICs9IGRlbHRhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5keCA+IDApIHRoaXMuZHggPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vdmVCeSh0aGlzLmR4LCB0aGlzLmR5KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW92ZUJ5KHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGNvbGxpZGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHRoaXNBQUJCOiBQb2x5Z29uID0gdGhpcy5wb2x5Z29uLmdldEFBQkIoKTtcclxuICAgICAgICB0aGlzLnBvbHlnb24ucG9zLmFkZChuZXcgU0FULlZlY3Rvcih4LCB5KSk7XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZSA9IG5ldyBSZXNwb25zZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2FtZS5sZXZlbC5vYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghR2FtZS5sZXZlbC5vYmplY3RzW2ldLmNvbGxpc2lvbiB8fCBHYW1lLmxldmVsLm9iamVjdHNbaV0uaWQgPT0gdGhpcy5pZCkgY29udGludWU7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGlmIChTQVQudGVzdFBvbHlnb25Qb2x5Z29uKHRoaXMucG9seWdvbiwgR2FtZS5sZXZlbC5vYmplY3RzW2ldLnBvbHlnb24sIHJlc3BvbnNlKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFDb2xsOiBib29sZWFuID0gdGhpcy5vbkNvbGxpc2lvbihyZXNwb25zZSwgR2FtZS5sZXZlbC5vYmplY3RzW2ldKTtcclxuICAgICAgICAgICAgICAgIEdhbWUubGV2ZWwub2JqZWN0c1tpXS5vbkNvbGxpc2lvbihyZXNwb25zZSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYUNvbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvbHlnb24ucG9zLnN1YihyZXNwb25zZS5vdmVybGFwVik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGlkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvYmp0QUFCQjogUG9seWdvbiA9IEdhbWUubGV2ZWwub2JqZWN0c1tpXS5wb2x5Z29uLmdldEFBQkIoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc0FBQkIucG9zLnkgKyB0aGlzQUFCQi5wb2ludHNbMl0ueSA8PSBvYmp0QUFCQi5wb3MueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCB0aGlzQUFCQi5wb3MueSA+PSBvYmp0QUFCQi5wb3MueSArIG9ianRBQUJCLnBvaW50c1syXS55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHkgKj0gLTAuNzU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5keCAqPSAtMC43NTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbGxpZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbGxpc2lvbihpbmZvOiBSZXNwb25zZSwgb2JqOiBCYXNpY09iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBQbGF5ZXJPYmplY3QgfHwgb2JqIGluc3RhbmNlb2YgU3Bpa2VPYmplY3QpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLnR5cGUpIHtcclxuICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy5ib2R5VHlwZSAqIDIsIDAsIDIsIDksIHRoaXMucG9seWdvbi5wb3MueCArIDQsIHRoaXMucG9seWdvbi5wb3MueSwgMiwgOSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLmJvZHlUeXBlICogMiwgOSwgMiwgOSwgdGhpcy5wb2x5Z29uLnBvcy54ICsgNCwgdGhpcy5wb2x5Z29uLnBvcy55LCAyLCA5KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDAsIDE4LCAxMCwgMTYsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCAxMCwgMTYpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgMTAsIDE4LCAxMCwgMTYsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCAxMCwgMTYpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgMjAsIDE4LCA4LCA4LCB0aGlzLnBvbHlnb24ucG9zLngsIHRoaXMucG9seWdvbi5wb3MueSwgOCwgOCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAyOCwgMTgsIDgsIDgsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCA4LCA4KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDM2LCAxOCwgNCwgNCwgdGhpcy5wb2x5Z29uLnBvcy54ICsgMiwgdGhpcy5wb2x5Z29uLnBvcy55ICsgNCwgNCwgNCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAzNiwgMjIsIDQsIDQsIHRoaXMucG9seWdvbi5wb3MueCArIDIsIHRoaXMucG9seWdvbi5wb3MueSArIDQsIDQsIDQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IEdhbWUgfSBmcm9tICcuLi8uLi9HYW1lJztcclxuaW1wb3J0IHsgSW1hZ2VPYmplY3QgfSBmcm9tICcuLi9JbWFnZU9iamVjdCc7XHJcbmltcG9ydCB7IEJ1bGxldE9iamVjdCB9IGZyb20gJy4vQnVsbGV0T2JqZWN0JztcclxuaW1wb3J0IHsgcmFuZG9tVW5zZWN1cmVVVUlEIH0gZnJvbSAnLi4vLi4vVXRpbHMnO1xyXG5pbXBvcnQgU0FUIGZyb20gJy4uLy4uL1NBVC9TQVQnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uLy4uL1NBVC9WZWN0b3InO1xyXG5pbXBvcnQgeyBCbG9vZFBhcnRpY2xlIH0gZnJvbSAnLi9CbG9vZFBhcnRpY2xlJztcclxuaW1wb3J0IHsgR2liUGFydGljbGUgfSBmcm9tICcuL0dpYlBhcnRpY2xlJztcclxuaW1wb3J0IHsgRGVhdGhNZXNzYWdlIH0gZnJvbSAnLi9EZWF0aE1lc3NhZ2UnO1xyXG5pbXBvcnQgeyBBdWRpb01hbmFnZXIgfSBmcm9tICcuLi8uLi9BdWRpb01hbmFnZXInO1xyXG5leHBvcnQgY2xhc3MgUGxheWVyT2JqZWN0IGV4dGVuZHMgSW1hZ2VPYmplY3Qge1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSB2ZWxvY2l0eTogbnVtYmVyID0gMTc1O1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBncmF2aXR5OiBudW1iZXIgPSAyNDtcclxuXHJcbiAgICBwdWJsaWMgZnJhbWVUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGxvb2tpbmdEaXJlY3Rpb246IG51bWJlciA9IDE7XHJcblxyXG4gICAgcHVibGljIHJpZ2h0S2V5VGltZTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBsZWZ0S2V5VGltZTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBqdW1wS2V5VGltZTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzaG9vdEtleVRpbWU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHVibGljIGR4OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGR5OiBudW1iZXIgPSAxO1xyXG4gICAgcHVibGljIG9uR3JvdW5kOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgYXZhaWxhYmxlSnVtcHM6IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIGlkOiBzdHJpbmcgPSBcInBsYXllclwiKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHgsIHksIDMyLCAzMiwgXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy9wbGF5ZXIvc3ByUGxheWVyLnBuZ1wiKTtcclxuICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgU0FULlBvbHlnb24obmV3IFNBVC5WZWN0b3IoeCwgeSksIFtcclxuICAgICAgICAgICAgbmV3IFNBVC5WZWN0b3IoOSwgMTEpLCBuZXcgU0FULlZlY3Rvcig5LCAzMiksXHJcbiAgICAgICAgICAgIG5ldyBTQVQuVmVjdG9yKDIzLCAzMiksIG5ldyBTQVQuVmVjdG9yKDIzLCAxMSlcclxuICAgICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmR5ICs9IFBsYXllck9iamVjdC5ncmF2aXR5ICogZGVsdGE7XHJcbiAgICAgICAgdGhpcy5keCA9IDA7XHJcblxyXG4gICAgICAgIGlmIChHYW1lLmlzQnV0dG9uRG93bignQXJyb3dSaWdodCcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHRLZXlUaW1lKys7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxlZnRLZXlUaW1lID09IDAgfHwgdGhpcy5yaWdodEtleVRpbWUgPCB0aGlzLmxlZnRLZXlUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmR4ID0gUGxheWVyT2JqZWN0LnZlbG9jaXR5ICogZGVsdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgdGhpcy5yaWdodEtleVRpbWUgPSAwO1xyXG4gICAgICAgIGlmIChHYW1lLmlzQnV0dG9uRG93bignQXJyb3dMZWZ0JykpIHtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0S2V5VGltZSsrO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yaWdodEtleVRpbWUgPT0gMCB8fCB0aGlzLmxlZnRLZXlUaW1lIDwgdGhpcy5yaWdodEtleVRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHggPSAtUGxheWVyT2JqZWN0LnZlbG9jaXR5ICogZGVsdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgdGhpcy5sZWZ0S2V5VGltZSA9IDA7XHJcblxyXG4gICAgICAgIGlmIChHYW1lLmlzQnV0dG9uRG93bigneicpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNob290S2V5VGltZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVsbGV0SWQ6IHN0cmluZyA9IFwiYnVsbGV0XCIgKyByYW5kb21VbnNlY3VyZVVVSUQoKTtcclxuICAgICAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5wbGF5KGJ1bGxldElkLCBcImFzc2V0cy9zb3VuZHMvZmlyZS53YXZcIikub25lbmRlZCA9IGUgPT4geyBBdWRpb01hbmFnZXIucmVsZWFzZShidWxsZXRJZCk7IH07XHJcbiAgICAgICAgICAgICAgICBHYW1lLmxldmVsLm9iamVjdHMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICBuZXcgQnVsbGV0T2JqZWN0KHRoaXMucG9seWdvbi5wb3MueCArIDE2ICsgMTAgKiB0aGlzLmxvb2tpbmdEaXJlY3Rpb24sIHRoaXMucG9seWdvbi5wb3MueSArIDIxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb2tpbmdEaXJlY3Rpb24sIGJ1bGxldElkXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNob290S2V5VGltZSsrO1xyXG4gICAgICAgIH0gZWxzZSB0aGlzLnNob290S2V5VGltZSA9IDA7XHJcblxyXG4gICAgICAgIGlmIChHYW1lLmlzQnV0dG9uRG93bignU2hpZnQnKSAmJiAodGhpcy5hdmFpbGFibGVKdW1wcyAhPSAwIHx8IHRoaXMuanVtcEtleVRpbWUgIT0gMCkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuanVtcEtleVRpbWUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVKdW1wcy0tO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXZhaWxhYmxlSnVtcHMgPT0gMSkgQXVkaW9NYW5hZ2VyLnBsYXkoXCJqdW1wMVwiLCBcImFzc2V0cy9zb3VuZHMvanVtcDEud2F2XCIpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBBdWRpb01hbmFnZXIucGxheShcImp1bXAyXCIsIFwiYXNzZXRzL3NvdW5kcy9qdW1wMi53YXZcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5qdW1wS2V5VGltZSArPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuanVtcEtleVRpbWUgLSBkZWx0YSA8IDAuMykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuanVtcEtleVRpbWUgPCAwLjMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hdmFpbGFibGVKdW1wcyA9PSAxKSB0aGlzLmR5ID0gLTIyMCAqIGRlbHRhO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5keSA9IC0xODAgKiBkZWx0YTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYXZhaWxhYmxlSnVtcHMgPT0gMSkgdGhpcy5keSA9IC0yMjAgKiAodGhpcy5qdW1wS2V5VGltZSAtIDAuMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB0aGlzLmR5ID0gLTE4MCAqICh0aGlzLmp1bXBLZXlUaW1lIC0gMC4zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB0aGlzLmp1bXBLZXlUaW1lID0gMDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZHggIT0gMCkgdGhpcy5sb29raW5nRGlyZWN0aW9uID0gTWF0aC5zaWduKHRoaXMuZHgpO1xyXG4gICAgICAgIHRoaXMuZHkgPSBNYXRoLm1heChNYXRoLm1pbih0aGlzLmR5LCAxMC42NjYpLCAtMTAuNjY2KTtcclxuICAgICAgICBsZXQgcHJldmlvdXNQb3M6IFZlY3RvciA9IChuZXcgVmVjdG9yKCkpLmNvcHkodGhpcy5wb2x5Z29uLnBvcyk7XHJcbiAgICAgICAgdGhpcy5vbkdyb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLm1vdmVCeSh0aGlzLmR4LCB0aGlzLmR5KSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5keSA+IDAgJiYgdGhpcy5wb2x5Z29uLnBvcy55ID09IHByZXZpb3VzUG9zLnkpIHtcclxuICAgICAgICAgICAgICAgIC8vIE9uIGdyb3VuZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5keSA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uR3JvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlSnVtcHMgPSAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5vbkdyb3VuZCAmJiB0aGlzLmF2YWlsYWJsZUp1bXBzID4gMSkgdGhpcy5hdmFpbGFibGVKdW1wcyA9IDE7IFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaWUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKEdhbWUubGV2ZWwuaXNSZW1vdmVkKHRoaXMuaWQpKSByZXR1cm47XHJcbiAgICAgICAgR2FtZS5sZXZlbC5yZW1vdmVPYmplY3QodGhpcy5pZCk7XHJcbiAgICAgICAgbGV0IGNlbnRlcjogVmVjdG9yID0gdGhpcy5wb2x5Z29uLmdldENlbnRyb2lkKCkuYWRkKHRoaXMucG9seWdvbi5wb3MpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTI4OyBpKyspIHtcclxuICAgICAgICAgICAgR2FtZS5sZXZlbC5vYmplY3RzLnB1c2gobmV3IEJsb29kUGFydGljbGUoY2VudGVyLngsIGNlbnRlci55LFxyXG4gICAgICAgICAgICAgICAgICAgIE1hdGguY29zKE1hdGguUEkgKiAyIC8gNDggKiBpKSAqIE1hdGgucmFuZG9tKCkgKiA2LCBNYXRoLnNpbihNYXRoLlBJICogMiAvIDQ4ICogaSkgKiBNYXRoLnJhbmRvbSgpICogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJibG9vZFwiICsgcmFuZG9tVW5zZWN1cmVVVUlEKClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpICs9IDIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgbyA9IDA7IG8gPCAoaSA+IDMgPyAyIDogMSk7IG8rKykge1xyXG4gICAgICAgICAgICAgICAgR2FtZS5sZXZlbC5vYmplY3RzLnB1c2gobmV3IEdpYlBhcnRpY2xlKGNlbnRlci54LCBjZW50ZXIueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5jb3MoTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyKSAqIE1hdGgucmFuZG9tKCkgKiA0LCBNYXRoLnNpbihNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDIpICogTWF0aC5yYW5kb20oKSAqIDQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGksIFwiZ2liXCIgKyByYW5kb21VbnNlY3VyZVVVSUQoKVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgQXVkaW9NYW5hZ2VyLnBsYXlNdXNpYyhcImFzc2V0cy9tdXNpYy9nYW1lb3Zlci5vZ2dcIiwgZmFsc2UpO1xyXG4gICAgICAgIEdhbWUubGV2ZWwub2JqZWN0cy5wdXNoKG5ldyBEZWF0aE1lc3NhZ2UoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZyYW1lVGltZSArPSBkZWx0YTtcclxuICAgICAgICB3aGlsZSAodGhpcy5mcmFtZVRpbWUgPj0gMC40MCkgdGhpcy5mcmFtZVRpbWUgLT0gMC40MDtcclxuICAgICAgICBsZXQgZnJhbWU6IG51bWJlciA9IE1hdGguZmxvb3IodGhpcy5mcmFtZVRpbWUgLyAwLjEwKTtcclxuXHJcbiAgICAgICAgY3R4LnNhdmUoKTtcclxuICAgICAgICBpZiAodGhpcy5sb29raW5nRGlyZWN0aW9uID09IC0xKSB7XHJcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoR2FtZS5jYW52YXMud2lkdGggLSB0aGlzLnBvbHlnb24ucG9zLngsIHRoaXMucG9seWdvbi5wb3MueSk7XHJcbiAgICAgICAgICAgIGN0eC5zY2FsZSgtMSwgMSk7XHJcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoR2FtZS5jYW52YXMud2lkdGggLSB0aGlzLnBvbHlnb24ucG9zLnggKiAyIC0gMzIsIDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUodGhpcy5wb2x5Z29uLnBvcy54LCB0aGlzLnBvbHlnb24ucG9zLnkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZHkgPCAwKSB7XHJcbiAgICAgICAgICAgIC8vIEp1bXBpbmdcclxuICAgICAgICAgICAgaWYgKHRoaXMuanVtcEtleVRpbWUgIT0gMCAmJiB0aGlzLmp1bXBLZXlUaW1lIDwgMC4wMikge1xyXG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAwLCA2NCwgMzIsIDMyLCAwLCAwLCAzMiwgMzIpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuanVtcEtleVRpbWUgIT0gMCAmJiB0aGlzLmp1bXBLZXlUaW1lIDwgMC4wNCkge1xyXG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAzMiwgNjQsIDMyLCAzMiwgMCwgMCwgMzIsIDMyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgKGZyYW1lICUgMikgKiAzMiArIDY0LCA2NCwgMzIsIDMyLCAwLCAwLCAzMiwgMzIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5vbkdyb3VuZCkge1xyXG4gICAgICAgICAgICAvLyBGYWxsaW5nXHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgKGZyYW1lICUgMikgKiAzMiwgOTYsIDMyLCAzMiwgMCwgMCwgMzIsIDMyKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZHggIT0gMCkge1xyXG4gICAgICAgICAgICAvLyBSdW5uaW5nXHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgZnJhbWUgKiAzMiwgMzIsIDMyLCAzMiwgMCwgMCwgMzIsIDMyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBJZGxlXHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgZnJhbWUgKiAzMiwgMCwgMzIsIDMyLCAwLCAwLCAzMiwgMzIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKiFcclxuKiBJIFdhbm5hIEJlIFRoZSBHdXk6IFRoZSBNb3ZpZTogVGhlIEdhbWVcclxuKiBUeXBlU2NyaXB0IHJlbWFrZSBtYWRlIGJ5IFBHZ2FtZXIyIChha2EgU29ub1BHKS5cclxuKiBZb3UgY2FuIGZpbmQgdGhlIHNvdXJjZSBjb2RlIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9QR2dhbWVyMi9JV0JURy50c1xyXG4qIE9yaWdpbmFsIGdhbWUgbWFkZSBieSBLYXlpbjogaHR0cHM6Ly9rYXlpbi5tb2UvaXdidGcvXHJcbiovXHJcblxyXG5pbXBvcnQgeyBBdWRpb01hbmFnZXIgfSBmcm9tIFwiLi9BdWRpb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL0dhbWVcIjtcclxuXHJcbmZ1bmN0aW9uIGZyYW1lKHRpbWVzdGFtcDogRE9NSGlnaFJlc1RpbWVTdGFtcCkge1xyXG4gICAgR2FtZS51cGRhdGUodGltZXN0YW1wKTtcclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnJhbWUpO1xyXG59XHJcbndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnJhbWUpO1xyXG5cclxub25rZXlkb3duID0gZnVuY3Rpb24oZSkge1xyXG4gICAgR2FtZS5rZXlNYXAuc2V0KGUua2V5LCB0cnVlKTtcclxuICAgIEF1ZGlvTWFuYWdlci5hdXRvUGxheUZpeCgpO1xyXG59O1xyXG5vbmtleXVwID0gZnVuY3Rpb24oZSkgeyBHYW1lLmtleU1hcC5zZXQoZS5rZXksIGZhbHNlKTsgfTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=