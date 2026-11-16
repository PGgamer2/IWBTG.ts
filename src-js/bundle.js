/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AudioManager.ts"
/*!*****************************!*\
  !*** ./src/AudioManager.ts ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AudioManager)
/* harmony export */ });
const _AudioManager = class _AudioManager {
  static play(key, src, loop = false, volume = 1) {
    let audio = _AudioManager.audioMap.get(key);
    if (audio !== void 0) {
      audio.play();
      return audio;
    }
    if (src === void 0) audio = new Audio();
    else audio = new Audio(src);
    audio.loop = loop;
    audio.volume = volume;
    _AudioManager.audioMap.set(key, audio);
    audio.oncanplay = (e) => {
      audio.play().catch((err) => {
        console.warn(err);
        audio.setAttribute("muted", "");
        audio.muted = true;
      });
      audio.oncanplay = null;
    };
    return audio;
  }
  static playMusic(src, loop = true) {
    let audio = _AudioManager.audioMap.get("_music");
    if (audio !== void 0 && !audio.src.endsWith(src)) {
      _AudioManager.release("_music");
    }
    return _AudioManager.play("_music", src, loop, 0.75);
  }
  static pause(key) {
    let audio = _AudioManager.audioMap.get(key);
    if (audio !== void 0) {
      audio.pause();
      return true;
    }
    return false;
  }
  static release(key) {
    var _a;
    if (_AudioManager.pause(key)) {
      (_a = _AudioManager.audioMap.get(key)) == null ? void 0 : _a.remove();
      return _AudioManager.audioMap.delete(key);
    }
    return false;
  }
  static autoPlayFix() {
    if (!_AudioManager.autoPlayFixed) {
      console.info("Trying to fix autoplay...");
      _AudioManager.autoPlayFixed = true;
      _AudioManager.audioMap.forEach((val, key) => {
        if (val.muted) {
          val.removeAttribute("muted");
          val.muted = false;
          if (key == "_music") {
            val.play().catch((err) => {
              if (_AudioManager.autoPlayFixed) console.warn(err);
              _AudioManager.autoPlayFixed = false;
              val.setAttribute("muted", "");
              val.muted = true;
            });
          }
        }
      });
    }
  }
};
_AudioManager.audioMap = /* @__PURE__ */ new Map();
_AudioManager.autoPlayFixed = false;
let AudioManager = _AudioManager;



/***/ },

/***/ "./src/Camera.ts"
/*!***********************!*\
  !*** ./src/Camera.ts ***!
  \***********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Camera)
/* harmony export */ });
class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.sizeX = 1;
    this.sizeY = 1;
  }
}


/***/ },

/***/ "./src/Game.ts"
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _Camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Camera */ "./src/Camera.ts");
/* harmony import */ var _levels_SaveSelectMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./levels/SaveSelectMenu */ "./src/levels/SaveSelectMenu.ts");
/* harmony import */ var _levels_TestLevel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./levels/TestLevel */ "./src/levels/TestLevel.ts");



const _Game = class _Game {
  static update(timestamp) {
    _Game.DEBUG = _Game.isButtonDown("F2");
    let pageAspectRatio = document.body.offsetWidth / document.body.offsetHeight;
    let scale = Math.floor(25 / 19 < pageAspectRatio ? document.body.offsetHeight / 19 : document.body.offsetWidth / 25);
    if (document.getElementById("discrete-scale-checkbox").checked)
      scale = Math.max(1 << 31 - Math.clz32(scale), 1);
    _Game.canvas.width = scale * 25;
    _Game.canvas.height = scale * 19;
    let ctx = _Game.canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, _Game.canvas.width, _Game.canvas.height);
    ctx.save();
    ctx.translate(_Game.camera.x, _Game.camera.y);
    ctx.rotate(_Game.camera.angle);
    ctx.scale(_Game.camera.sizeX * (_Game.canvas.width / 800), _Game.camera.sizeY * (_Game.canvas.height / 608));
    try {
      _Game.level.update(ctx, (timestamp - _Game.lastTimestamp) / 1e3);
    } catch (e) {
      console.error(e);
    }
    ctx.restore();
    if (_Game.isButtonDown("r")) {
      if (!_Game.isPushingReload) {
        this.level.dispose();
        this.level = this.level.instantiate();
      }
      _Game.isPushingReload = true;
    } else _Game.isPushingReload = false;
    _Game.lastTimestamp = timestamp;
  }
  static loadSave(save) {
    this.level.dispose();
    this.level = new _levels_TestLevel__WEBPACK_IMPORTED_MODULE_2__["default"]();
  }
  static isButtonDown(keyName) {
    var _a;
    if (keyName.length == 1) keyName = keyName.toLowerCase();
    return (_a = _Game.keyMap.get(keyName)) != null ? _a : false;
  }
};
_Game.DEBUG = false;
_Game.canvas = document.getElementById("main-canvas");
_Game.lastTimestamp = performance.now();
_Game.level = new _levels_SaveSelectMenu__WEBPACK_IMPORTED_MODULE_1__["default"]();
_Game.camera = new _Camera__WEBPACK_IMPORTED_MODULE_0__["default"]();
_Game.keyMap = /* @__PURE__ */ new Map();
_Game.isPushingReload = false;
let Game = _Game;



/***/ },

/***/ "./src/SAT/Box.ts"
/*!************************!*\
  !*** ./src/SAT/Box.ts ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Box)
/* harmony export */ });
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ "./src/SAT/Vector.ts");
/* harmony import */ var _Polygon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Polygon */ "./src/SAT/Polygon.ts");


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
      new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](),
      new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](w, 0),
      new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](w, h),
      new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, h)
    ]);
  }
}


/***/ },

/***/ "./src/SAT/Polygon.ts"
/*!****************************!*\
  !*** ./src/SAT/Polygon.ts ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Polygon)
/* harmony export */ });
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ "./src/SAT/Vector.ts");
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Box */ "./src/SAT/Box.ts");


class Polygon {
  /**
   * Create a new polygon, passing in a position vector, and an array of points (represented by vectors 
   * relative to the position vector). If no position is passed in, the position of the polygon will be `(0,0)`.
   * 
   * @param {Vector} [pos=Vector] A vector representing the origin of the polygon (all other points are relative to this one)
   * @param {Array<Vector>} [points=[]] An array of vectors representing the points in the polygon, in counter-clockwise order.
   */
  constructor(pos = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](), points = []) {
    this.angle = 0;
    this.offset = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.points = [];
    this.calcPoints = [];
    this.edges = [];
    this.normals = [];
    this.pos = pos;
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
    const lengthChanged = !this.points || this.points.length !== points.length;
    if (lengthChanged) {
      let i;
      const calcPoints = this.calcPoints = [];
      const edges = this.edges = [];
      const normals = this.normals = [];
      for (i = 0; i < points.length; i++) {
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
    const calcPoints = this.calcPoints;
    const edges = this.edges;
    const normals = this.normals;
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
   * @returns {Polygon} Returns AABB.
   */
  getAABB() {
    const points = this.calcPoints;
    let xMin = points[0].x;
    let yMin = points[0].y;
    let xMax = points[0].x;
    let yMax = points[0].y;
    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      if (point.x < xMin) xMin = point.x;
      else if (point.x > xMax) xMax = point.x;
      if (point.y < yMin) yMin = point.y;
      else if (point.y > yMax) yMax = point.y;
    }
    return new _Box__WEBPACK_IMPORTED_MODULE_1__["default"](this.pos.clone().add(new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](xMin, yMin)), xMax - xMin, yMax - yMin).toPolygon();
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
      const p2 = i === len - 1 ? points[0] : points[i + 1];
      const a = p1.x * p2.y - p2.x * p1.y;
      cx += (p1.x + p2.x) * a;
      cy += (p1.y + p2.y) * a;
      ar += a;
    }
    ar = ar * 3;
    cx = cx / ar;
    cy = cy / ar;
    return new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](cx, cy);
  }
}


/***/ },

/***/ "./src/SAT/Response.ts"
/*!*****************************!*\
  !*** ./src/SAT/Response.ts ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Response)
/* harmony export */ });
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector */ "./src/SAT/Vector.ts");

class Response {
  constructor() {
    this.a = null;
    this.b = null;
    this.overlapN = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.overlapV = new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.aInB = true;
    this.bInA = true;
    this.overlap = Number.MAX_VALUE;
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


/***/ },

/***/ "./src/SAT/SAT.ts"
/*!************************!*\
  !*** ./src/SAT/SAT.ts ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SAT)
/* harmony export */ });
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Box */ "./src/SAT/Box.ts");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vector */ "./src/SAT/Vector.ts");
/* harmony import */ var _Response__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Response */ "./src/SAT/Response.ts");
/*!
* sat-js (or SAT.js) made by Jim Riecken and released under the MIT license
* Modified by Robert Corponoi and me (SonoPG)
* Changes made by me: Bug fixes and conversion to TypeScript
*/



const T_VECTORS = [];
for (let i = 0; i < 10; i++) T_VECTORS.push(new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"]());
const T_ARRAYS = [];
for (let i = 0; i < 5; i++) T_ARRAYS.push([]);
const T_RESPONSE = new _Response__WEBPACK_IMPORTED_MODULE_2__["default"]();
const TEST_POINT = new _Box__WEBPACK_IMPORTED_MODULE_0__["default"](new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](), 1e-6, 1e-6).toPolygon();
const LEFT_VORONOI_REGION = -1;
const MIDDLE_VORONOI_REGION = 0;
const RIGHT_VORONOI_REGION = 1;
function flattenPointsOn(points, normal, result) {
  let min = Number.MAX_VALUE;
  let max = -Number.MAX_VALUE;
  const len = points.length;
  for (let i = 0; i < len; i++) {
    const dot = points[i].dot(normal);
    if (dot < min) min = dot;
    if (dot > max) max = dot;
  }
  result[0] = min;
  result[1] = max;
}
function voronoiRegion(line, point) {
  const len2 = line.len2();
  const dp = point.dot(line);
  if (dp < 0) return LEFT_VORONOI_REGION;
  else if (dp > len2) return RIGHT_VORONOI_REGION;
  else return MIDDLE_VORONOI_REGION;
}
class SAT {
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
  static isSeparatingAxis(aPos, bPos, aPoints, bPoints, axis, response) {
    const rangeA = T_ARRAYS.pop();
    const rangeB = T_ARRAYS.pop();
    const offsetV = T_VECTORS.pop().copy(bPos).sub(aPos);
    const projectedOffset = offsetV.dot(axis);
    flattenPointsOn(aPoints, axis, rangeA);
    flattenPointsOn(bPoints, axis, rangeB);
    rangeB[0] += projectedOffset;
    rangeB[1] += projectedOffset;
    if (rangeA[0] > rangeB[1] || rangeB[0] > rangeA[1]) {
      T_VECTORS.push(offsetV);
      T_ARRAYS.push(rangeA);
      T_ARRAYS.push(rangeB);
      return true;
    }
    if (response) {
      let overlap = 0;
      if (rangeA[0] < rangeB[0]) {
        response.aInB = false;
        if (rangeA[1] < rangeB[1]) {
          overlap = rangeA[1] - rangeB[0];
          response.bInA = false;
        } else {
          const option1 = rangeA[1] - rangeB[0];
          const option2 = rangeB[1] - rangeA[0];
          overlap = option1 < option2 ? option1 : -option2;
        }
      } else {
        response.bInA = false;
        if (rangeA[1] > rangeB[1]) {
          overlap = rangeA[0] - rangeB[1];
          response.aInB = false;
        } else {
          const option1 = rangeA[1] - rangeB[0];
          const option2 = rangeB[1] - rangeA[0];
          overlap = option1 < option2 ? option1 : -option2;
        }
      }
      const absOverlap = Math.abs(overlap);
      if (absOverlap < response.overlap) {
        response.overlap = absOverlap;
        response.overlapN.copy(axis);
        if (overlap < 0) response.overlapN.reverse();
      }
    }
    T_VECTORS.push(offsetV);
    T_ARRAYS.push(rangeA);
    T_ARRAYS.push(rangeB);
    return false;
  }
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
  static pointInCircle(p, c) {
    const differenceV = T_VECTORS.pop().copy(p).sub(c.pos).sub(c.offset);
    const radiusSq = c.r * c.r;
    const distanceSq = differenceV.len2();
    T_VECTORS.push(differenceV);
    return distanceSq <= radiusSq;
  }
  /**
   * Check if a point is inside a convex polygon.
   * 
   * @param {Vector} p The point to test.
   * @param {Polygon} poly The polygon to test.
   * 
   * @returns {boolean} Returns true if the point is inside the polygon or false otherwise.
   */
  static pointInPolygon(p, poly) {
    TEST_POINT.pos.copy(p);
    T_RESPONSE.clear();
    let result = SAT.testPolygonPolygon(TEST_POINT, poly, T_RESPONSE);
    if (result) result = T_RESPONSE.aInB;
    return result;
  }
  /**
   * Check if two circles collide.
   * 
   * @param {Circle} a The first circle.
   * @param {Circle} b The second circle.
   * @param {Response} [response] An optional response object that will be populated if the circles intersect.
   * 
   * @returns {boolean} Returns true if the circles intersect or false otherwise.
   */
  static testCircleCircle(a, b, response) {
    const differenceV = T_VECTORS.pop().copy(b.pos).add(b.offset).sub(a.pos).sub(a.offset);
    const totalRadius = a.r + b.r;
    const totalRadiusSq = totalRadius * totalRadius;
    const distanceSq = differenceV.len2();
    if (distanceSq > totalRadiusSq) {
      T_VECTORS.push(differenceV);
      return false;
    }
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
  }
  /**
   * Check if a polygon and a circle collide.
   * 
   * @param {Polygon} polygon The polygon.
   * @param {Circle} circle The circle.
   * @param {Response} [response] An optional response object that will be populated if they intersect.
   * 
   * @returns {boolean} Returns true if they intersect or false otherwise.
   */
  static testPolygonCircle(polygon, circle, response) {
    const circlePos = T_VECTORS.pop().copy(circle.pos).add(circle.offset).sub(polygon.pos);
    const radius = circle.r;
    const radius2 = radius * radius;
    const points = polygon.calcPoints;
    const len = points.length;
    const edge = T_VECTORS.pop();
    const point = T_VECTORS.pop();
    for (var i = 0; i < len; i++) {
      const next = i === len - 1 ? 0 : i + 1;
      const prev = i === 0 ? len - 1 : i - 1;
      let overlap = 0;
      let overlapN = null;
      edge.copy(polygon.edges[i]);
      point.copy(circlePos).sub(points[i]);
      if (response && point.len2() > radius2) response.aInB = false;
      let region = voronoiRegion(edge, point);
      if (region === LEFT_VORONOI_REGION) {
        edge.copy(polygon.edges[prev]);
        const point2 = T_VECTORS.pop().copy(circlePos).sub(points[prev]);
        region = voronoiRegion(edge, point2);
        if (region === RIGHT_VORONOI_REGION) {
          const dist = point.len();
          if (dist > radius) {
            T_VECTORS.push(circlePos);
            T_VECTORS.push(edge);
            T_VECTORS.push(point);
            T_VECTORS.push(point2);
            return false;
          } else if (response) {
            response.bInA = false;
            overlapN = point.normalize();
            overlap = radius - dist;
          }
        }
        T_VECTORS.push(point2);
      } else if (region === RIGHT_VORONOI_REGION) {
        edge.copy(polygon.edges[next]);
        point.copy(circlePos).sub(points[next]);
        region = voronoiRegion(edge, point);
        if (region === LEFT_VORONOI_REGION) {
          const dist = point.len();
          if (dist > radius) {
            T_VECTORS.push(circlePos);
            T_VECTORS.push(edge);
            T_VECTORS.push(point);
            return false;
          } else if (response) {
            response.bInA = false;
            overlapN = point.normalize();
            overlap = radius - dist;
          }
        }
      } else {
        const normal = edge.perp().normalize();
        const dist = point.dot(normal);
        const distAbs = Math.abs(dist);
        if (dist > 0 && distAbs > radius) {
          T_VECTORS.push(circlePos);
          T_VECTORS.push(normal);
          T_VECTORS.push(point);
          return false;
        } else if (response) {
          overlapN = normal;
          overlap = radius - dist;
          if (dist >= 0 || overlap < 2 * radius) response.bInA = false;
        }
      }
      if (overlapN && response && Math.abs(overlap) < Math.abs(response.overlap)) {
        response.overlap = overlap;
        response.overlapN.copy(overlapN);
      }
    }
    if (response) {
      response.a = polygon;
      response.b = circle;
      response.overlapV.copy(response.overlapN).scale(response.overlap);
    }
    T_VECTORS.push(circlePos);
    T_VECTORS.push(edge);
    T_VECTORS.push(point);
    return true;
  }
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
  static testCirclePolygon(circle, polygon, response) {
    const result = SAT.testPolygonCircle(polygon, circle, response);
    if (result && response) {
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
  }
  /**
   * Checks whether polygons collide.
   * 
   * @param {Polygon} a The first polygon.
   * @param {Polygon} b The second polygon.
   * @param {Response} [response] An optional response object that will be populated if they intersect.
   * 
   * @returns {boolean} Returns true if they intersect or false otherwise.
   */
  static testPolygonPolygon(a, b, response) {
    const aPoints = a.calcPoints;
    const aLen = aPoints.length;
    const bPoints = b.calcPoints;
    const bLen = bPoints.length;
    for (let i = 0; i < aLen; i++) {
      if (SAT.isSeparatingAxis(a.pos, b.pos, aPoints, bPoints, a.normals[i], response)) {
        return false;
      }
    }
    for (let i = 0; i < bLen; i++) {
      if (SAT.isSeparatingAxis(a.pos, b.pos, aPoints, bPoints, b.normals[i], response)) {
        return false;
      }
    }
    if (response) {
      response.a = a;
      response.b = b;
      response.overlapV.copy(response.overlapN).scale(response.overlap);
    }
    return true;
  }
}


/***/ },

/***/ "./src/SAT/Vector.ts"
/*!***************************!*\
  !*** ./src/SAT/Vector.ts ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Vector)
/* harmony export */ });
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
   * @param {Vector} other The other Vector.
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
    this.y *= typeof y != "undefined" ? y : x;
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
   * @returns {number} Returns dot product.
   */
  dot(other) {
    return this.x * other.x + this.y * other.y;
  }
  /**
   * Get the squared length of this Vector.
   * 
   * @returns {number} Returns squared length.
   */
  len2() {
    return this.dot(this);
  }
  /**
   * Get the length of this Vector.
   * 
   * @returns {number} Returns length.
   */
  len() {
    return Math.sqrt(this.len2());
  }
}


/***/ },

/***/ "./src/SpriteManager.ts"
/*!******************************!*\
  !*** ./src/SpriteManager.ts ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageList: () => (/* binding */ ImageList),
/* harmony export */   Sprite: () => (/* binding */ Sprite),
/* harmony export */   Sprites: () => (/* binding */ Sprites)
/* harmony export */ });
const _ImageList = class _ImageList {
  static register(src) {
    let img = new Image();
    img.src = src;
    _ImageList.IMAGES.push(img);
    return img;
  }
};
_ImageList.IMAGES = [];
_ImageList.TILEMAP_MASTER = _ImageList.register("assets/textures/objects/tileMaster.png");
_ImageList.SPIKE = _ImageList.register("assets/textures/objects/sprSpike.png");
_ImageList.BROCCOLI = _ImageList.register("assets/textures/objects/bgBroccoli.png");
_ImageList.KUMO_PLATFORM = _ImageList.register("assets/textures/objects/sprKumoPlatform.png");
_ImageList.PLAYER = _ImageList.register("assets/textures/objects/player/sprPlayer.png");
_ImageList.GORE = _ImageList.register("assets/textures/objects/player/sprGore.png");
_ImageList.BULLET = _ImageList.register("assets/textures/objects/player/sprBullet.png");
_ImageList.GAMEOVER = _ImageList.register("assets/textures/ui/sprGameOver.png");
let ImageList = _ImageList;
class Sprite {
  constructor(source, x = 0, y = 0, w, h) {
    this.source = source;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}
var Sprites;
((Sprites2) => {
  Sprites2.RedBlock = new Sprite(ImageList.TILEMAP_MASTER, 32, 32, 32, 32);
  Sprites2.GrassRedBlock = new Sprite(ImageList.TILEMAP_MASTER, 0, 32, 32, 32);
  Sprites2.SimpleVBeam = new Sprite(ImageList.TILEMAP_MASTER, 32, 64, 32, 32);
  Sprites2.SimpleHBeam = new Sprite(ImageList.TILEMAP_MASTER, 0, 96, 32, 32);
  Sprites2.SimpleBlock = new Sprite(ImageList.TILEMAP_MASTER, 32, 96, 32, 32);
  Sprites2.Broccoli = new Sprite(ImageList.BROCCOLI, 0, 0, 111, 175);
  Sprites2.KraidgiefBroccoli = new Sprite(ImageList.BROCCOLI, 112, 0, 111, 175);
  Sprites2.BigBroccoli = new Sprite(ImageList.BROCCOLI, 0, 175, 213, 331);
  Sprites2.SpikeUp = new Sprite(ImageList.SPIKE, 0, 0, 32, 32);
  Sprites2.SpikeRight = new Sprite(ImageList.SPIKE, 32, 0, 32, 32);
  Sprites2.SpikeDown = new Sprite(ImageList.SPIKE, 64, 0, 32, 32);
  Sprites2.SpikeLeft = new Sprite(ImageList.SPIKE, 96, 0, 32, 32);
  Sprites2.Cloud = [new Sprite(ImageList.KUMO_PLATFORM, 0, 0, 112, 32), new Sprite(ImageList.KUMO_PLATFORM, 112, 0, 112, 32)];
  Sprites2.DeathMessage = new Sprite(ImageList.GAMEOVER, 0, 0, 800, 188);
})(Sprites || (Sprites = {}));


/***/ },

/***/ "./src/levels/BasicLevel.ts"
/*!**********************************!*\
  !*** ./src/levels/BasicLevel.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BasicLevel)
/* harmony export */ });
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Game */ "./src/Game.ts");

class BasicLevel {
  constructor() {
    this.objects = [];
    this.removeQueue = [];
  }
  update(ctx, delta) {
    for (let i = 0; i < this.objects.length; i++) {
      this.objects[i].update(delta);
    }
    while (this.removeQueue.length != 0) {
      for (let o = 0; o < this.objects.length; o++) {
        if (this.objects[o].id == this.removeQueue[0]) {
          this.objects[o].dispose();
          this.objects.splice(o, 1);
          break;
        }
      }
      this.removeQueue.splice(0, 1);
    }
    for (let i = 0; i < this.objects.length; i++) {
      this.objects[i].draw(ctx, delta);
    }
    if (_Game__WEBPACK_IMPORTED_MODULE_0__["default"].DEBUG) {
      this.drawCollisionLines(ctx);
    }
  }
  removeObject(id) {
    this.removeQueue.push(id);
  }
  isRemoved(id) {
    return this.removeQueue.indexOf(id) !== -1;
  }
  drawCollisionLines(ctx) {
    ctx.save();
    for (let i = 0; i < this.objects.length; i++) {
      const points = this.objects[i].polygon.points;
      ctx.beginPath();
      ctx.moveTo(this.objects[i].polygon.pos.x + points[0].x, this.objects[i].polygon.pos.y + points[0].y);
      for (let p = 1; p < points.length; p++) {
        ctx.lineTo(this.objects[i].polygon.pos.x + points[p].x, this.objects[i].polygon.pos.y + points[p].y);
      }
      ctx.lineTo(this.objects[i].polygon.pos.x + points[0].x, this.objects[i].polygon.pos.y + points[0].y);
      ctx.lineWidth = 1;
      ctx.strokeStyle = this.objects[i].collision ? "#ff0000" : "#0000ff";
      ctx.stroke();
    }
    ctx.restore();
  }
  dispose() {
    while (this.objects.length != 0) {
      this.objects[0].dispose();
      this.objects.splice(0, 1);
    }
  }
}


/***/ },

/***/ "./src/levels/SaveSelectMenu.ts"
/*!**************************************!*\
  !*** ./src/levels/SaveSelectMenu.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SaveSelectMenu)
/* harmony export */ });
/* harmony import */ var _AudioManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AudioManager */ "./src/AudioManager.ts");
/* harmony import */ var _objects_player_FakePlayerObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../objects/player/FakePlayerObject */ "./src/objects/player/FakePlayerObject.ts");
/* harmony import */ var _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../objects/SpriteObject */ "./src/objects/SpriteObject.ts");
/* harmony import */ var _objects_TileObject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../objects/TileObject */ "./src/objects/TileObject.ts");
/* harmony import */ var _SpriteManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../SpriteManager */ "./src/SpriteManager.ts");
/* harmony import */ var _BasicLevel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BasicLevel */ "./src/levels/BasicLevel.ts");






const _SaveSelectMenu = class _SaveSelectMenu extends _BasicLevel__WEBPACK_IMPORTED_MODULE_5__["default"] {
  constructor() {
    super();
    _AudioManager__WEBPACK_IMPORTED_MODULE_0__["default"].playMusic("assets/music/saveselect.ogg");
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_3__["default"]("grass", 0, 17, 26, 1, [_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.GrassRedBlock]));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_3__["default"]("ground", 0, 18, 26, 1, [_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.RedBlock]));
    for (let i = 0; i < 7; i++) {
      let obj = new _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__.SpriteObject("tree" + i, Math.random() * 800 | 0, 369, 111, 175, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.Broccoli);
      obj.collision = false;
      this.objects.push(obj);
    }
    for (let i = 0; i < 6; i++) {
      let obj = new _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__.AnimatedSpriteObject("cloud" + i, Math.random() * 800 | 0, 96 + Math.random() * 210 | 0, 112, 32, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.Cloud, 0.5);
      obj.collision = false;
      this.objects.push(obj);
    }
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_3__["default"]("top0", 0, 0, 1, 3, [_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleBlock, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleVBeam], [0, 1, 0]));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_3__["default"]("top1", 24, 0, 1, 3, [_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleBlock, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleVBeam], [0, 1, 0]));
    this.objects.push(new _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__.SpriteObject("top2", 32, 0, 736, 32, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleHBeam));
    this.objects.push(new _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__.SpriteObject("top2", 32, 64, 736, 32, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleHBeam));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_3__["default"]("save0_0", 1, 4, 6, 1, [_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleBlock, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleHBeam], [0, 1, 1, 1, 1, 0]));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_3__["default"]("save0_1", 1, 14, 6, 1, [_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleBlock, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleHBeam], [0, 1, 1, 1, 1, 0]));
    this.objects.push(new _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__.SpriteObject("save0_2", 32, 160, 32, 288, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleVBeam));
    this.objects.push(new _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__.SpriteObject("save0_3", 192, 160, 32, 288, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleVBeam));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_3__["default"]("save1_0", 9, 4, 6, 1, [_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleBlock, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleHBeam], [0, 1, 1, 1, 1, 0]));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_3__["default"]("save1_1", 9, 14, 6, 1, [_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleBlock, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleHBeam], [0, 1, 1, 1, 1, 0]));
    this.objects.push(new _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__.SpriteObject("save1_2", 288, 160, 32, 288, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleVBeam));
    this.objects.push(new _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__.SpriteObject("save1_3", 448, 160, 32, 288, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleVBeam));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_3__["default"]("save2_0", 17, 4, 6, 1, [_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleBlock, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleHBeam], [0, 1, 1, 1, 1, 0]));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_3__["default"]("save2_1", 17, 14, 6, 1, [_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleBlock, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleHBeam], [0, 1, 1, 1, 1, 0]));
    this.objects.push(new _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__.SpriteObject("save2_2", 544, 160, 32, 288, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleVBeam));
    this.objects.push(new _objects_SpriteObject__WEBPACK_IMPORTED_MODULE_2__.SpriteObject("save2_3", 704, 160, 32, 288, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SimpleVBeam));
    this.objects.push(new _objects_player_FakePlayerObject__WEBPACK_IMPORTED_MODULE_1__["default"]());
  }
  update(ctx, delta) {
    for (let i = 0; i < 2; i++) {
      this.objects[i].polygon.pos.x -= _SaveSelectMenu.scrollVel * delta;
      if (this.objects[i].polygon.pos.x < -64)
        this.objects[i].polygon.pos.x = 0;
      else if (this.objects[i].polygon.pos.x < -32)
        this.objects[i].polygon.pos.x += 32;
    }
    for (let i = 2; i < 9; i++) {
      this.objects[i].polygon.pos.x -= _SaveSelectMenu.scrollVel * delta;
      if (this.objects[i].polygon.pos.x < -111)
        this.objects[i].polygon.pos.x = 850 + (Math.random() - 0.5) * 100 | 0;
    }
    for (let i = 9; i < 15; i++) {
      this.objects[i].polygon.pos.x -= _SaveSelectMenu.scrollVel * delta;
      if (this.objects[i].polygon.pos.x < -112) {
        this.objects[i].polygon.pos.x = 850 + (Math.random() - 0.5) * 100 | 0;
        this.objects[i].polygon.pos.y = 96 + Math.random() * 210 | 0;
      }
    }
    ctx.fillStyle = "#C4D7F7";
    ctx.fillRect(0, 0, 800, 608);
    ctx.fillStyle = "#88391E";
    ctx.fillRect(0, 544, 800, 64);
    ctx.fillStyle = "#000000";
    super.update(ctx, delta);
    this.drawUI(ctx, delta);
  }
  drawUI(ctx, delta) {
    ctx.fillStyle = "#000000";
    ctx.fillRect(32, 32, 736, 32);
    ctx.fillRect(64, 160, 128, 288);
    ctx.fillRect(320, 160, 128, 288);
    ctx.fillRect(576, 160, 128, 288);
  }
  instantiate() {
    return new _SaveSelectMenu();
  }
};
_SaveSelectMenu.scrollVel = 75;
let SaveSelectMenu = _SaveSelectMenu;



/***/ },

/***/ "./src/levels/TestLevel.ts"
/*!*********************************!*\
  !*** ./src/levels/TestLevel.ts ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TestLevel)
/* harmony export */ });
/* harmony import */ var _BasicLevel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicLevel */ "./src/levels/BasicLevel.ts");
/* harmony import */ var _objects_player_PlayerObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../objects/player/PlayerObject */ "./src/objects/player/PlayerObject.ts");
/* harmony import */ var _objects_SpikeObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../objects/SpikeObject */ "./src/objects/SpikeObject.ts");
/* harmony import */ var _AudioManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AudioManager */ "./src/AudioManager.ts");
/* harmony import */ var _objects_TileObject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../objects/TileObject */ "./src/objects/TileObject.ts");
/* harmony import */ var _SpriteManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../SpriteManager */ "./src/SpriteManager.ts");






class TestLevel extends _BasicLevel__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    _AudioManager__WEBPACK_IMPORTED_MODULE_3__["default"].playMusic("assets/music/begins.ogg");
    this.objects.push(new _objects_player_PlayerObject__WEBPACK_IMPORTED_MODULE_1__["default"](32, 512));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_4__["default"]("ground0", 0, 18, 25, 1, [_SpriteManager__WEBPACK_IMPORTED_MODULE_5__.Sprites.RedBlock]));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_4__["default"]("wall0", 8, 14, 1, 4, [_SpriteManager__WEBPACK_IMPORTED_MODULE_5__.Sprites.RedBlock]));
    this.objects.push(new _objects_TileObject__WEBPACK_IMPORTED_MODULE_4__["default"]("wall1", 9, 12, 1, 6, [_SpriteManager__WEBPACK_IMPORTED_MODULE_5__.Sprites.RedBlock]));
    this.objects.push(new _objects_SpikeObject__WEBPACK_IMPORTED_MODULE_2__["default"]("spike0", 320, 416, 1));
    this.objects.push(new _objects_SpikeObject__WEBPACK_IMPORTED_MODULE_2__["default"]("spike1", 320, 384, 1));
    this.objects.push(new _objects_SpikeObject__WEBPACK_IMPORTED_MODULE_2__["default"]("spike2", 288, 352, 0));
  }
  instantiate() {
    return new TestLevel();
  }
}


/***/ },

/***/ "./src/objects/BasicObject.ts"
/*!************************************!*\
  !*** ./src/objects/BasicObject.ts ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BasicObject)
/* harmony export */ });
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Game */ "./src/Game.ts");
/* harmony import */ var _SAT_SAT__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SAT/SAT */ "./src/SAT/SAT.ts");
/* harmony import */ var _SAT_Response__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SAT/Response */ "./src/SAT/Response.ts");
/* harmony import */ var _SAT_Polygon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../SAT/Polygon */ "./src/SAT/Polygon.ts");
/* harmony import */ var _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../SAT/Vector */ "./src/SAT/Vector.ts");





class BasicObject {
  constructor(id, x, y, w, h) {
    this.collision = true;
    this.id = id;
    if (w == 0 && h == 0) this.collision = false;
    this.polygon = new _SAT_Polygon__WEBPACK_IMPORTED_MODULE_3__["default"](new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](x, y), [
      new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](),
      new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](0, h),
      new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](w, h),
      new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](w, 0)
    ]);
  }
  moveBy(x, y) {
    let collided = false;
    this.polygon.pos.add(new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](x, y));
    let response = new _SAT_Response__WEBPACK_IMPORTED_MODULE_2__["default"]();
    for (let i = 0; i < _Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.objects.length; i++) {
      if (!_Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.objects[i].collision || _Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.objects[i].id == this.id) continue;
      response.clear();
      if (_SAT_SAT__WEBPACK_IMPORTED_MODULE_1__["default"].testPolygonPolygon(this.polygon, _Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.objects[i].polygon, response)) {
        collided = true;
        let aColl = this.onCollision(response, _Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.objects[i]);
        let bColl = _Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.objects[i].onCollision(response, this);
        if (aColl && bColl && this.collision) this.polygon.pos.sub(response.overlapV);
      }
    }
    return collided;
  }
  onCollision(info, obj) {
    return true;
  }
  dispose() {
  }
}


/***/ },

/***/ "./src/objects/SpikeObject.ts"
/*!************************************!*\
  !*** ./src/objects/SpikeObject.ts ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SpikeDirection: () => (/* binding */ SpikeDirection),
/* harmony export */   "default": () => (/* binding */ SpikeObject)
/* harmony export */ });
/* harmony import */ var _SAT_Polygon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../SAT/Polygon */ "./src/SAT/Polygon.ts");
/* harmony import */ var _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SAT/Vector */ "./src/SAT/Vector.ts");
/* harmony import */ var _SpriteObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SpriteObject */ "./src/objects/SpriteObject.ts");
/* harmony import */ var _player_PlayerObject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player/PlayerObject */ "./src/objects/player/PlayerObject.ts");
/* harmony import */ var _SpriteManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../SpriteManager */ "./src/SpriteManager.ts");





var SpikeDirection = /* @__PURE__ */ ((SpikeDirection2) => {
  SpikeDirection2[SpikeDirection2["Up"] = 0] = "Up";
  SpikeDirection2[SpikeDirection2["Right"] = 1] = "Right";
  SpikeDirection2[SpikeDirection2["Down"] = 2] = "Down";
  SpikeDirection2[SpikeDirection2["Left"] = 3] = "Left";
  return SpikeDirection2;
})(SpikeDirection || {});
class SpikeObject extends _SpriteObject__WEBPACK_IMPORTED_MODULE_2__.SpriteObject {
  constructor(id, x, y, direction = 0) {
    super(id, x, y, 32, 32, SpikeObject.getDirSprite(direction));
    this.direction = direction;
    switch (this.direction) {
      case 3 /* Left */:
        this.polygon = new _SAT_Polygon__WEBPACK_IMPORTED_MODULE_0__["default"](new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](x, y), [
          new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](1, 16),
          new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](31, 31),
          new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](31, 1)
        ]);
        break;
      case 2 /* Down */:
        this.polygon = new _SAT_Polygon__WEBPACK_IMPORTED_MODULE_0__["default"](new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](x, y), [
          new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](1, 1),
          new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](16, 31),
          new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](31, 1)
        ]);
        break;
      case 1 /* Right */:
        this.polygon = new _SAT_Polygon__WEBPACK_IMPORTED_MODULE_0__["default"](new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](x, y), [
          new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](1, 1),
          new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](1, 31),
          new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](31, 16)
        ]);
        break;
      default:
        this.polygon = new _SAT_Polygon__WEBPACK_IMPORTED_MODULE_0__["default"](new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](x, y), [
          new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](16, 1),
          new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](1, 31),
          new _SAT_Vector__WEBPACK_IMPORTED_MODULE_1__["default"](31, 31)
        ]);
    }
  }
  onCollision(info, obj) {
    if (obj instanceof _player_PlayerObject__WEBPACK_IMPORTED_MODULE_3__["default"]) {
      obj.die();
    }
    return false;
  }
  static getDirSprite(dir) {
    const spikeDirSprites = [_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SpikeUp, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SpikeRight, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SpikeDown, _SpriteManager__WEBPACK_IMPORTED_MODULE_4__.Sprites.SpikeLeft];
    return spikeDirSprites[dir];
  }
}


/***/ },

/***/ "./src/objects/SpriteObject.ts"
/*!*************************************!*\
  !*** ./src/objects/SpriteObject.ts ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnimatedSpriteObject: () => (/* binding */ AnimatedSpriteObject),
/* harmony export */   SpriteObject: () => (/* binding */ SpriteObject)
/* harmony export */ });
/* harmony import */ var _BasicObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicObject */ "./src/objects/BasicObject.ts");

class SpriteObject extends _BasicObject__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(id, x, y, w, h, sprite) {
    super(id, x, y, w, h);
    this.sprite = sprite;
    this.width = w;
    this.height = h;
  }
  update(delta) {
  }
  draw(ctx, delta) {
    ctx.drawImage(this.sprite.source, this.sprite.x, this.sprite.y, this.sprite.w, this.sprite.h, this.polygon.pos.x, this.polygon.pos.y, this.width, this.height);
  }
}
class AnimatedSpriteObject extends _BasicObject__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(id, x, y, w, h, sprites, animDuration) {
    super(id, x, y, w, h);
    this.frameTimer = 0;
    this.sprites = sprites;
    this.width = w;
    this.height = h;
    this.animDuration = animDuration;
  }
  update(delta) {
  }
  draw(ctx, delta) {
    this.frameTimer = (this.frameTimer + delta) % this.animDuration;
    let i = Math.floor(this.frameTimer * this.sprites.length / this.animDuration);
    ctx.drawImage(this.sprites[i].source, this.sprites[i].x, this.sprites[i].y, this.sprites[i].w, this.sprites[i].h, this.polygon.pos.x, this.polygon.pos.y, this.width, this.height);
  }
}


/***/ },

/***/ "./src/objects/TileObject.ts"
/*!***********************************!*\
  !*** ./src/objects/TileObject.ts ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TileObject)
/* harmony export */ });
/* harmony import */ var _BasicObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicObject */ "./src/objects/BasicObject.ts");

class TileObject extends _BasicObject__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(id, x, y, xRepeat, yRepeat, sprites, order, tileWidth = sprites[0].w, tileHeight = sprites[0].h) {
    super(id, x * tileWidth, y * tileHeight, xRepeat * tileWidth, yRepeat * tileHeight);
    this.order = [];
    this.xRepeat = xRepeat;
    this.yRepeat = yRepeat;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.spriteList = sprites;
    if (order !== void 0) this.order = order;
  }
  update(delta) {
  }
  draw(ctx, delta) {
    for (let i = 0; i < this.xRepeat * this.yRepeat; i++) {
      let sprite = this.spriteList[i < this.order.length ? this.order[i] : 0];
      ctx.drawImage(
        sprite.source,
        sprite.x,
        sprite.y,
        sprite.w,
        sprite.h,
        this.polygon.pos.x + i % this.xRepeat * this.tileWidth,
        this.polygon.pos.y + Math.floor(i / this.xRepeat) * this.tileHeight,
        this.tileWidth,
        this.tileHeight
      );
    }
  }
}


/***/ },

/***/ "./src/objects/player/BloodParticle.ts"
/*!*********************************************!*\
  !*** ./src/objects/player/BloodParticle.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BloodParticle)
/* harmony export */ });
/* harmony import */ var _SAT_Response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../SAT/Response */ "./src/SAT/Response.ts");
/* harmony import */ var _SAT_SAT__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../SAT/SAT */ "./src/SAT/SAT.ts");
/* harmony import */ var _PlayerObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PlayerObject */ "./src/objects/player/PlayerObject.ts");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Game */ "./src/Game.ts");
/* harmony import */ var _BasicObject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../BasicObject */ "./src/objects/BasicObject.ts");
/* harmony import */ var _SpikeObject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../SpikeObject */ "./src/objects/SpikeObject.ts");
/* harmony import */ var _SAT_Vector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../SAT/Vector */ "./src/SAT/Vector.ts");
/* harmony import */ var _SpriteManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../SpriteManager */ "./src/SpriteManager.ts");








class BloodParticle extends _BasicObject__WEBPACK_IMPORTED_MODULE_4__["default"] {
  constructor(x, y, dx, dy, id) {
    super(id, x, y, 2, 2);
    this.dx = 0;
    this.dy = 0;
    this.stuck = false;
    this.type = 0;
    this.dx = dx;
    this.dy = dy;
    this.type = Math.round(Math.random() * 3);
    this.collision = false;
  }
  update(delta) {
    if (this.stuck) return;
    this.dy += _PlayerObject__WEBPACK_IMPORTED_MODULE_2__["default"].gravity * delta;
    if (this.dx > 0) {
      this.dx -= delta;
      if (this.dx < 0) this.dx = 0;
    } else if (this.dx < 0) {
      this.dx += delta;
      if (this.dx > 0) this.dx = 0;
    }
    if (this.moveBy(this.dx, this.dy)) {
      this.dx = 0;
      this.dy = 0;
      this.stuck = true;
    }
  }
  moveBy(x, y) {
    let collided = false;
    this.polygon.pos.add(new _SAT_Vector__WEBPACK_IMPORTED_MODULE_6__["default"](x, y));
    let response = new _SAT_Response__WEBPACK_IMPORTED_MODULE_0__["default"]();
    for (let i = 0; i < _Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects.length; i++) {
      if (!_Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects[i].collision || _Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects[i].id == this.id) continue;
      response.clear();
      if (_SAT_SAT__WEBPACK_IMPORTED_MODULE_1__["default"].testPolygonPolygon(this.polygon, _Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects[i].polygon, response)) {
        let aColl = this.onCollision(response, _Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects[i]);
        _Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects[i].onCollision(response, this);
        if (aColl) {
          this.polygon.pos.sub(response.overlapV);
          collided = true;
        }
      }
    }
    return collided;
  }
  onCollision(info, obj) {
    if (obj instanceof _PlayerObject__WEBPACK_IMPORTED_MODULE_2__["default"]) return false;
    if (obj instanceof _SpikeObject__WEBPACK_IMPORTED_MODULE_5__["default"]) return Math.random() < 0.5;
    return true;
  }
  draw(ctx, delta) {
    ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_7__.ImageList.GORE, this.type * 3, 34, 3, 4, this.polygon.pos.x - 1, this.polygon.pos.y - 1, 3, 4);
  }
}


/***/ },

/***/ "./src/objects/player/BulletObject.ts"
/*!********************************************!*\
  !*** ./src/objects/player/BulletObject.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BulletObject)
/* harmony export */ });
/* harmony import */ var _PlayerObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlayerObject */ "./src/objects/player/PlayerObject.ts");
/* harmony import */ var _BasicObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BasicObject */ "./src/objects/BasicObject.ts");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Game */ "./src/Game.ts");
/* harmony import */ var _SpikeObject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../SpikeObject */ "./src/objects/SpikeObject.ts");
/* harmony import */ var _SpriteManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../SpriteManager */ "./src/SpriteManager.ts");





class BulletObject extends _BasicObject__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(x, y, direction, id) {
    super(id, x - 5, y - 1, 10, 2);
    this.frameTime = 0;
    this.direction = direction;
  }
  update(delta) {
    this.moveBy(this.direction * 750 * delta, 0);
  }
  onCollision(info, obj) {
    if (obj instanceof _SpikeObject__WEBPACK_IMPORTED_MODULE_3__["default"]) return false;
    if (obj instanceof _PlayerObject__WEBPACK_IMPORTED_MODULE_0__["default"]) return false;
    _Game__WEBPACK_IMPORTED_MODULE_2__["default"].level.removeObject(this.id);
    return false;
  }
  draw(ctx, delta) {
    this.frameTime += delta;
    while (this.frameTime >= 0.2) this.frameTime -= 0.2;
    ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.ImageList.BULLET, Math.floor(this.frameTime / 0.1) * 4, 0, 4, 4, this.polygon.pos.x + 3, this.polygon.pos.y - 1, 4, 4);
  }
}


/***/ },

/***/ "./src/objects/player/FakePlayerObject.ts"
/*!************************************************!*\
  !*** ./src/objects/player/FakePlayerObject.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FakePlayerObject)
/* harmony export */ });
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Game */ "./src/Game.ts");
/* harmony import */ var _PlayerObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PlayerObject */ "./src/objects/player/PlayerObject.ts");


class FakePlayerObject extends _PlayerObject__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(x = 112, y = 512, id = "fake_player") {
    super(x, y, id);
    this.selectedSave = 0;
    this.collision = false;
    this.onGround = true;
    this.dx = Number.EPSILON;
  }
  update(delta) {
    if (_Game__WEBPACK_IMPORTED_MODULE_0__["default"].isButtonDown("ArrowRight")) {
      if (this.rightKeyTime++ == 0) {
        this.selectedSave = (this.selectedSave + 1) % 3;
      }
    } else this.rightKeyTime = 0;
    if (_Game__WEBPACK_IMPORTED_MODULE_0__["default"].isButtonDown("ArrowLeft")) {
      if (this.leftKeyTime++ == 0) {
        this.selectedSave = (this.selectedSave - 1 + 3) % 3;
      }
    } else this.leftKeyTime = 0;
    if (_Game__WEBPACK_IMPORTED_MODULE_0__["default"].isButtonDown("x")) {
      if (this.shootKeyTime++ == 0)
        this.shoot();
    } else this.shootKeyTime = 0;
    if (_Game__WEBPACK_IMPORTED_MODULE_0__["default"].isButtonDown("Shift") || _Game__WEBPACK_IMPORTED_MODULE_0__["default"].isButtonDown("z")) {
      if (this.jumpKeyTime++ == 0)
        _Game__WEBPACK_IMPORTED_MODULE_0__["default"].loadSave(this.selectedSave);
    } else this.jumpKeyTime = 0;
    let targetPos = 112 + this.selectedSave * 32 * 8;
    let dx = Math.min(Math.abs(this.polygon.pos.x - targetPos), _PlayerObject__WEBPACK_IMPORTED_MODULE_1__["default"].velocity * 4 * delta);
    this.moveBy(this.polygon.pos.x > targetPos ? -dx : dx, 0);
  }
  die() {
  }
}


/***/ },

/***/ "./src/objects/player/GibParticle.ts"
/*!*******************************************!*\
  !*** ./src/objects/player/GibParticle.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GibParticle)
/* harmony export */ });
/* harmony import */ var _SAT_Response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../SAT/Response */ "./src/SAT/Response.ts");
/* harmony import */ var _SAT_SAT__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../SAT/SAT */ "./src/SAT/SAT.ts");
/* harmony import */ var _PlayerObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PlayerObject */ "./src/objects/player/PlayerObject.ts");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Game */ "./src/Game.ts");
/* harmony import */ var _BasicObject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../BasicObject */ "./src/objects/BasicObject.ts");
/* harmony import */ var _SpikeObject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../SpikeObject */ "./src/objects/SpikeObject.ts");
/* harmony import */ var _SAT_Vector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../SAT/Vector */ "./src/SAT/Vector.ts");
/* harmony import */ var _SpriteManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../SpriteManager */ "./src/SpriteManager.ts");








class GibParticle extends _BasicObject__WEBPACK_IMPORTED_MODULE_4__["default"] {
  /**
   * Type 0: body,
   * type 1: body stoned,
   * type 2: head,
   * type 3: head stoned,
   * type 4: arm,
   * type 5: arm stoned,
   * type 6: feet,
   * type 7: feet stoned
   */
  constructor(x, y, dx, dy, type, id) {
    super(id, x, y, 8, 8);
    this.dx = 0;
    this.dy = 0;
    this.type = 0;
    this.bodyVariant = 0;
    this.dx = dx;
    this.dy = dy;
    this.type = type;
    this.collision = false;
    if (this.type == 0 || this.type == 1) {
      this.bodyVariant = Math.round(Math.random() * 32);
    }
  }
  update(delta) {
    this.dy += _PlayerObject__WEBPACK_IMPORTED_MODULE_2__["default"].gravity * Math.min(delta, 0.3);
    if (this.dx > 0) {
      this.dx -= delta;
      if (this.dx < 0) this.dx = 0;
    } else if (this.dx < 0) {
      this.dx += delta;
      if (this.dx > 0) this.dx = 0;
    }
    this.moveBy(this.dx, this.dy);
  }
  moveBy(x, y) {
    let collided = false;
    let thisAABB = this.polygon.getAABB();
    this.polygon.pos.add(new _SAT_Vector__WEBPACK_IMPORTED_MODULE_6__["default"](x, y));
    let response = new _SAT_Response__WEBPACK_IMPORTED_MODULE_0__["default"]();
    for (let i = 0; i < _Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects.length; i++) {
      if (!_Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects[i].collision || _Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects[i].id == this.id) continue;
      response.clear();
      if (_SAT_SAT__WEBPACK_IMPORTED_MODULE_1__["default"].testPolygonPolygon(this.polygon, _Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects[i].polygon, response)) {
        let aColl = this.onCollision(response, _Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects[i]);
        _Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects[i].onCollision(response, this);
        if (aColl) {
          this.polygon.pos.sub(response.overlapV);
          collided = true;
          let objtAABB = _Game__WEBPACK_IMPORTED_MODULE_3__["default"].level.objects[i].polygon.getAABB();
          if (thisAABB.pos.y + thisAABB.points[2].y <= objtAABB.pos.y || thisAABB.pos.y >= objtAABB.pos.y + objtAABB.points[2].y) {
            this.dy *= -0.75;
          } else {
            this.dx *= -0.75;
          }
        }
      }
    }
    return collided;
  }
  onCollision(info, obj) {
    if (obj instanceof _PlayerObject__WEBPACK_IMPORTED_MODULE_2__["default"] || obj instanceof _SpikeObject__WEBPACK_IMPORTED_MODULE_5__["default"]) return false;
    return true;
  }
  draw(ctx, delta) {
    switch (this.type) {
      case 0:
        ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_7__.ImageList.GORE, this.bodyVariant * 2, 0, 2, 9, this.polygon.pos.x + 4, this.polygon.pos.y, 2, 9);
        break;
      case 1:
        ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_7__.ImageList.GORE, this.bodyVariant * 2, 9, 2, 9, this.polygon.pos.x + 4, this.polygon.pos.y, 2, 9);
        break;
      case 2:
        ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_7__.ImageList.GORE, 0, 18, 10, 16, this.polygon.pos.x, this.polygon.pos.y, 10, 16);
        break;
      case 3:
        ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_7__.ImageList.GORE, 10, 18, 10, 16, this.polygon.pos.x, this.polygon.pos.y, 10, 16);
        break;
      case 4:
        ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_7__.ImageList.GORE, 20, 18, 8, 8, this.polygon.pos.x, this.polygon.pos.y, 8, 8);
        break;
      case 5:
        ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_7__.ImageList.GORE, 28, 18, 8, 8, this.polygon.pos.x, this.polygon.pos.y, 8, 8);
        break;
      case 6:
        ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_7__.ImageList.GORE, 36, 18, 4, 4, this.polygon.pos.x + 2, this.polygon.pos.y + 4, 4, 4);
        break;
      case 7:
        ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_7__.ImageList.GORE, 36, 22, 4, 4, this.polygon.pos.x + 2, this.polygon.pos.y + 4, 4, 4);
    }
  }
}


/***/ },

/***/ "./src/objects/player/PlayerObject.ts"
/*!********************************************!*\
  !*** ./src/objects/player/PlayerObject.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PlayerObject)
/* harmony export */ });
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Game */ "./src/Game.ts");
/* harmony import */ var _BasicObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BasicObject */ "./src/objects/BasicObject.ts");
/* harmony import */ var _BulletObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BulletObject */ "./src/objects/player/BulletObject.ts");
/* harmony import */ var _utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/CommonUtils */ "./src/utils/CommonUtils.ts");
/* harmony import */ var _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../SAT/Vector */ "./src/SAT/Vector.ts");
/* harmony import */ var _BloodParticle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BloodParticle */ "./src/objects/player/BloodParticle.ts");
/* harmony import */ var _GibParticle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GibParticle */ "./src/objects/player/GibParticle.ts");
/* harmony import */ var _AudioManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../AudioManager */ "./src/AudioManager.ts");
/* harmony import */ var _SAT_Polygon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../SAT/Polygon */ "./src/SAT/Polygon.ts");
/* harmony import */ var _SpriteManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../SpriteManager */ "./src/SpriteManager.ts");
/* harmony import */ var _SpriteObject__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../SpriteObject */ "./src/objects/SpriteObject.ts");











const _PlayerObject = class _PlayerObject extends _BasicObject__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(x, y, id = "player") {
    super(id, x, y, 32, 32);
    this.frameTimer = 0;
    this.lookingDirection = 1;
    this.rightKeyTime = 0;
    this.leftKeyTime = 0;
    this.jumpKeyTime = 0;
    this.shootKeyTime = 0;
    this.dx = 0;
    this.dy = 1;
    this.onGround = false;
    this.availableJumps = 0;
    this.polygon = new _SAT_Polygon__WEBPACK_IMPORTED_MODULE_8__["default"](new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](x, y), [
      new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](9, 11),
      new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](9, 32),
      new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](23, 32),
      new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](23, 11)
    ]);
  }
  update(delta) {
    this.dy += _PlayerObject.gravity * delta;
    this.dx = 0;
    if (_Game__WEBPACK_IMPORTED_MODULE_0__["default"].isButtonDown("ArrowRight")) {
      this.rightKeyTime++;
      if (this.leftKeyTime == 0 || this.rightKeyTime < this.leftKeyTime) {
        this.dx = _PlayerObject.velocity * delta;
      }
    } else this.rightKeyTime = 0;
    if (_Game__WEBPACK_IMPORTED_MODULE_0__["default"].isButtonDown("ArrowLeft")) {
      this.leftKeyTime++;
      if (this.rightKeyTime == 0 || this.leftKeyTime < this.rightKeyTime) {
        this.dx = -_PlayerObject.velocity * delta;
      }
    } else this.leftKeyTime = 0;
    if (_Game__WEBPACK_IMPORTED_MODULE_0__["default"].isButtonDown("x")) {
      if (this.shootKeyTime++ == 0)
        this.shoot();
    } else this.shootKeyTime = 0;
    if ((_Game__WEBPACK_IMPORTED_MODULE_0__["default"].isButtonDown("Shift") || _Game__WEBPACK_IMPORTED_MODULE_0__["default"].isButtonDown("z")) && (this.availableJumps != 0 || this.jumpKeyTime != 0)) {
      if (this.jumpKeyTime == 0) {
        this.availableJumps--;
        if (this.availableJumps == 1) _AudioManager__WEBPACK_IMPORTED_MODULE_7__["default"].play("jump1", "assets/sounds/jump1.wav");
        else _AudioManager__WEBPACK_IMPORTED_MODULE_7__["default"].play("jump2", "assets/sounds/jump2.wav");
      }
      this.jumpKeyTime += delta;
      if (this.jumpKeyTime < 0.3) {
        if (this.availableJumps == 1) this.dy = -220 * delta;
        else this.dy = -180 * delta;
      }
    } else this.jumpKeyTime = 0;
    if (this.dx != 0) this.lookingDirection = Math.sign(this.dx);
    this.dy = Math.max(Math.min(this.dy, 10.666), -10.666);
    let previousPos = new _SAT_Vector__WEBPACK_IMPORTED_MODULE_4__["default"]().copy(this.polygon.pos);
    this.onGround = false;
    if (this.moveBy(this.dx, this.dy)) {
      if (this.dy > 0 && this.polygon.pos.y == previousPos.y) {
        this.dy = 1;
        this.onGround = true;
        this.availableJumps = 2;
      }
    }
    if (!this.onGround && this.availableJumps > 1) this.availableJumps = 1;
  }
  shoot() {
    let bulletId = "bullet" + (0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.randomUnsecureUUID)();
    _AudioManager__WEBPACK_IMPORTED_MODULE_7__["default"].play(bulletId, "assets/sounds/fire.wav").onended = (e) => {
      _AudioManager__WEBPACK_IMPORTED_MODULE_7__["default"].release(bulletId);
    };
    _Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.objects.push(
      new _BulletObject__WEBPACK_IMPORTED_MODULE_2__["default"](
        this.polygon.pos.x + 16 + 10 * this.lookingDirection,
        this.polygon.pos.y + 21,
        this.lookingDirection,
        bulletId
      )
    );
  }
  die() {
    if (_Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.isRemoved(this.id)) return;
    _Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.removeObject(this.id);
    let center = this.polygon.getCentroid().add(this.polygon.pos);
    for (let i = 0; i < 128; i++) {
      _Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.objects.push(
        new _BloodParticle__WEBPACK_IMPORTED_MODULE_5__["default"](
          center.x,
          center.y,
          Math.cos(Math.PI * 2 / 48 * i) * Math.random() * 6,
          Math.sin(Math.PI * 2 / 48 * i) * Math.random() * 10,
          "blood_" + this.id + "_" + i
        )
      );
    }
    for (let i = 0; i < 8; i += 2) {
      for (let o = 0; o < (i > 3 ? 2 : 1); o++) {
        _Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.objects.push(
          new _GibParticle__WEBPACK_IMPORTED_MODULE_6__["default"](
            center.x,
            center.y,
            Math.cos(Math.random() * Math.PI * 2) * Math.random() * 4,
            Math.sin(Math.random() * Math.PI * 2) * Math.random() * 4,
            i,
            "gib_" + this.id + "_" + (i + o)
          )
        );
      }
    }
    _AudioManager__WEBPACK_IMPORTED_MODULE_7__["default"].playMusic("assets/music/gameover.ogg", false);
    let deathMessage = new _SpriteObject__WEBPACK_IMPORTED_MODULE_10__.SpriteObject("death_message", 400 - 350, 304 - 82, 700, 164, _SpriteManager__WEBPACK_IMPORTED_MODULE_9__.Sprites.DeathMessage);
    deathMessage.collision = false;
    _Game__WEBPACK_IMPORTED_MODULE_0__["default"].level.objects.push(deathMessage);
  }
  draw(ctx, delta) {
    this.frameTimer = (this.frameTimer + delta) % 0.4;
    let frame = Math.floor(this.frameTimer / 0.1);
    ctx.save();
    if (this.lookingDirection == -1) {
      ctx.translate(_Game__WEBPACK_IMPORTED_MODULE_0__["default"].canvas.width - this.polygon.pos.x, this.polygon.pos.y);
      ctx.scale(-1, 1);
      ctx.translate(_Game__WEBPACK_IMPORTED_MODULE_0__["default"].canvas.width - this.polygon.pos.x * 2 - 32, 0);
    } else {
      ctx.translate(this.polygon.pos.x, this.polygon.pos.y);
    }
    if (this.dy < 0) {
      if (this.jumpKeyTime != 0 && this.jumpKeyTime < 0.02) {
        ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_9__.ImageList.PLAYER, 0, 64, 32, 32), 0, 0, 32, 32);
      } else if (this.jumpKeyTime != 0 && this.jumpKeyTime < 0.04) {
        ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_9__.ImageList.PLAYER, 32, 64, 32, 32), 0, 0, 32, 32);
      } else {
        ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_9__.ImageList.PLAYER, frame % 2 * 32 + 64, 64, 32, 32), 0, 0, 32, 32);
      }
    } else if (!this.onGround) {
      ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_9__.ImageList.PLAYER, frame % 2 * 32, 96, 32, 32), 0, 0, 32, 32);
    } else if (this.dx != 0) {
      ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_9__.ImageList.PLAYER, frame * 32, 32, 32, 32), 0, 0, 32, 32);
    } else {
      ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_9__.ImageList.PLAYER, frame * 32, 0, 32, 32), 0, 0, 32, 32);
    }
    ctx.restore();
  }
};
_PlayerObject.velocity = 175;
_PlayerObject.gravity = 24;
let PlayerObject = _PlayerObject;



/***/ },

/***/ "./src/utils/CommonUtils.ts"
/*!**********************************!*\
  !*** ./src/utils/CommonUtils.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bufferDrawImage: () => (/* binding */ bufferDrawImage),
/* harmony export */   randomUnsecureUUID: () => (/* binding */ randomUnsecureUUID)
/* harmony export */ });
function randomUnsecureUUID() {
  return "xxxx-xxxx-xxx-xxxx".replace(/[x]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    return r.toString(16);
  });
}
const bufferCanvas = document.getElementById("buffer-canvas");
const bufferCtx = (() => {
  let ctx = bufferCanvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  return ctx;
})();
function bufferDrawImage(image, sx, sy, sw, sh) {
  bufferCanvas.width = sw;
  bufferCanvas.height = sh;
  bufferCtx.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
  bufferCtx.drawImage(image, sx, sy, sw, sh, 0, 0, sw, sh);
  return bufferCanvas;
}


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/Main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AudioManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AudioManager */ "./src/AudioManager.ts");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Game */ "./src/Game.ts");
/*!
* I Wanna Be The Guy: The Movie: The Game
* TypeScript remake made by PGgamer2 (aka SonoPG).
* You can find the source code here: https://github.com/PGgamer2/IWBTG.ts
* Original game made by Kayin: https://kayin.moe/iwbtg/
*/


function frame(timestamp) {
  if (!document.hidden)
    _Game__WEBPACK_IMPORTED_MODULE_1__["default"].update(timestamp);
  window.requestAnimationFrame(frame);
}
window.requestAnimationFrame(frame);
onkeydown = function(e) {
  _Game__WEBPACK_IMPORTED_MODULE_1__["default"].keyMap.set(e.key.length == 1 ? e.key.toLowerCase() : e.key, true);
  _AudioManager__WEBPACK_IMPORTED_MODULE_0__["default"].autoPlayFix();
};
onkeyup = function(e) {
  _Game__WEBPACK_IMPORTED_MODULE_1__["default"].keyMap.set(e.key.length == 1 ? e.key.toLowerCase() : e.key, false);
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7VUFDQSxFOzs7VUNQQSx5Rjs7O1VDQUE7VUFDQTtVQUNBLHNEQUFzRCxpQkFBaUI7VUFDdkUsZ0RBQWdELGFBQWE7VUFDN0QsRTs7Ozs7Ozs7Ozs7O0FDSkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTzBDO0FBQ2hCO0FBRTFCLFNBQVMsTUFBTSxXQUFnQztBQUMzQyxNQUFJLENBQUMsU0FBUztBQUNWLGlEQUFJLENBQUMsT0FBTyxTQUFTO0FBQ3pCLFNBQU8sc0JBQXNCLEtBQUs7QUFDdEM7QUFDQSxPQUFPLHNCQUFzQixLQUFLO0FBRWxDLFlBQVksU0FBUyxHQUFHO0FBQ3BCLCtDQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsSUFBSSxVQUFVLElBQUksRUFBRSxJQUFJLFlBQVksSUFBSSxFQUFFLEtBQUssSUFBSTtBQUNyRSx1REFBWSxDQUFDLFlBQVk7QUFDN0I7QUFDQSxVQUFVLFNBQVMsR0FBRztBQUFFLCtDQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsSUFBSSxVQUFVLElBQUksRUFBRSxJQUFJLFlBQVksSUFBSSxFQUFFLEtBQUssS0FBSztBQUFHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL0F1ZGlvTWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2FtZXJhLnRzIiwid2VicGFjazovLy8uL3NyYy9HYW1lLnRzIiwid2VicGFjazovLy8uL3NyYy9TQVQvQm94LnRzIiwid2VicGFjazovLy8uL3NyYy9TQVQvUG9seWdvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0FUL1Jlc3BvbnNlLnRzIiwid2VicGFjazovLy8uL3NyYy9TQVQvU0FULnRzIiwid2VicGFjazovLy8uL3NyYy9TQVQvVmVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9TcHJpdGVNYW5hZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9sZXZlbHMvQmFzaWNMZXZlbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGV2ZWxzL1NhdmVTZWxlY3RNZW51LnRzIiwid2VicGFjazovLy8uL3NyYy9sZXZlbHMvVGVzdExldmVsLnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL0Jhc2ljT2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL1NwaWtlT2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL1Nwcml0ZU9iamVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9UaWxlT2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL3BsYXllci9CbG9vZFBhcnRpY2xlLnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL3BsYXllci9CdWxsZXRPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvcGxheWVyL0Zha2VQbGF5ZXJPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvcGxheWVyL0dpYlBhcnRpY2xlLnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL3BsYXllci9QbGF5ZXJPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL0NvbW1vblV0aWxzLnRzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9NYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1ZGlvTWFuYWdlciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGF1ZGlvTWFwOiBNYXA8c3RyaW5nLCBIVE1MQXVkaW9FbGVtZW50PiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHBsYXkoa2V5OiBzdHJpbmcsIHNyYz86IHN0cmluZywgbG9vcDogYm9vbGVhbiA9IGZhbHNlLCB2b2x1bWU6IG51bWJlciA9IDEuMCk6IEhUTUxBdWRpb0VsZW1lbnQge1xyXG4gICAgICAgIGxldCBhdWRpbzogSFRNTEF1ZGlvRWxlbWVudCB8IHVuZGVmaW5lZCA9IEF1ZGlvTWFuYWdlci5hdWRpb01hcC5nZXQoa2V5KTtcclxuICAgICAgICBpZiAoYXVkaW8gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBhdWRpby5wbGF5KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBhdWRpbztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNyYyA9PT0gdW5kZWZpbmVkKSBhdWRpbyA9IG5ldyBBdWRpbygpO1xyXG4gICAgICAgIGVsc2UgYXVkaW8gPSBuZXcgQXVkaW8oc3JjKTtcclxuICAgICAgICBhdWRpby5sb29wID0gbG9vcDtcclxuICAgICAgICBhdWRpby52b2x1bWUgPSB2b2x1bWU7XHJcbiAgICAgICAgQXVkaW9NYW5hZ2VyLmF1ZGlvTWFwLnNldChrZXksIGF1ZGlvKTtcclxuICAgICAgICBhdWRpby5vbmNhbnBsYXkgPSBlID0+IHtcclxuICAgICAgICAgICAgYXVkaW8hLnBsYXkoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGVycik7XHJcbiAgICAgICAgICAgICAgICBhdWRpbyEuc2V0QXR0cmlidXRlKCdtdXRlZCcsICcnKTtcclxuICAgICAgICAgICAgICAgIGF1ZGlvIS5tdXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhdWRpbyEub25jYW5wbGF5ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGF1ZGlvO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcGxheU11c2ljKHNyYzogc3RyaW5nLCBsb29wOiBib29sZWFuID0gdHJ1ZSk6IEhUTUxBdWRpb0VsZW1lbnQge1xyXG4gICAgICAgIGxldCBhdWRpbzogSFRNTEF1ZGlvRWxlbWVudCB8IHVuZGVmaW5lZCA9IEF1ZGlvTWFuYWdlci5hdWRpb01hcC5nZXQoXCJfbXVzaWNcIik7XHJcbiAgICAgICAgaWYgKGF1ZGlvICE9PSB1bmRlZmluZWQgJiYgIWF1ZGlvLnNyYy5lbmRzV2l0aChzcmMpKSB7XHJcbiAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5yZWxlYXNlKFwiX211c2ljXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQXVkaW9NYW5hZ2VyLnBsYXkoXCJfbXVzaWNcIiwgc3JjLCBsb29wLCAwLjc1KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHBhdXNlKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGF1ZGlvOiBIVE1MQXVkaW9FbGVtZW50IHwgdW5kZWZpbmVkID0gQXVkaW9NYW5hZ2VyLmF1ZGlvTWFwLmdldChrZXkpO1xyXG4gICAgICAgIGlmIChhdWRpbyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGF1ZGlvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWxlYXNlKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKEF1ZGlvTWFuYWdlci5wYXVzZShrZXkpKSB7XHJcbiAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5hdWRpb01hcC5nZXQoa2V5KT8ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBBdWRpb01hbmFnZXIuYXVkaW9NYXAuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBhdXRvUGxheUZpeGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgc3RhdGljIGF1dG9QbGF5Rml4KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghQXVkaW9NYW5hZ2VyLmF1dG9QbGF5Rml4ZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5pbmZvKFwiVHJ5aW5nIHRvIGZpeCBhdXRvcGxheS4uLlwiKTtcclxuICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLmF1dG9QbGF5Rml4ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBBdWRpb01hbmFnZXIuYXVkaW9NYXAuZm9yRWFjaCgodmFsLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWwubXV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWwucmVtb3ZlQXR0cmlidXRlKCdtdXRlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbC5tdXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gXCJfbXVzaWNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwucGxheSgpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXVkaW9NYW5hZ2VyLmF1dG9QbGF5Rml4ZWQpIGNvbnNvbGUud2FybihlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLmF1dG9QbGF5Rml4ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbC5zZXRBdHRyaWJ1dGUoJ211dGVkJywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsLm11dGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDYW1lcmEge1xyXG4gICAgcHVibGljIHg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgeTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBhbmdsZTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzaXplWDogbnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyBzaXplWTogbnVtYmVyID0gMTtcclxufSIsImltcG9ydCBCYXNpY0xldmVsIGZyb20gJy4vbGV2ZWxzL0Jhc2ljTGV2ZWwnO1xyXG5pbXBvcnQgQ2FtZXJhIGZyb20gJy4vQ2FtZXJhJztcclxuaW1wb3J0IFNhdmVTZWxlY3RNZW51IGZyb20gJy4vbGV2ZWxzL1NhdmVTZWxlY3RNZW51JztcclxuaW1wb3J0IFRlc3RMZXZlbCBmcm9tICcuL2xldmVscy9UZXN0TGV2ZWwnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgREVCVUc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbi1jYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBwdWJsaWMgc3RhdGljIGxhc3RUaW1lc3RhbXA6IERPTUhpZ2hSZXNUaW1lU3RhbXAgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxldmVsOiBCYXNpY0xldmVsID0gbmV3IFNhdmVTZWxlY3RNZW51KCk7XHJcbiAgICBwdWJsaWMgc3RhdGljIGNhbWVyYTogQ2FtZXJhID0gbmV3IENhbWVyYSgpO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMga2V5TWFwOiBNYXA8c3RyaW5nLCBib29sZWFuPiA9IG5ldyBNYXA8c3RyaW5nLCBib29sZWFuPigpO1xyXG4gICAgcHVibGljIHN0YXRpYyBpc1B1c2hpbmdSZWxvYWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHVwZGF0ZSh0aW1lc3RhbXA6IERPTUhpZ2hSZXNUaW1lU3RhbXApIHtcclxuICAgICAgICBHYW1lLkRFQlVHID0gR2FtZS5pc0J1dHRvbkRvd24oXCJGMlwiKTtcclxuICAgICAgICAvLyBSZXNpemUga2VlcGluZyBhc3BlY3QgcmF0aW9cclxuICAgICAgICBsZXQgcGFnZUFzcGVjdFJhdGlvID0gZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aCAvIGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgIGxldCBzY2FsZSA9IE1hdGguZmxvb3IoMjUgLyAxOSA8IHBhZ2VBc3BlY3RSYXRpbyA/IGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0IC8gMTkgOiBkb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoIC8gMjUpO1xyXG5cdFx0aWYgKChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpc2NyZXRlLXNjYWxlLWNoZWNrYm94XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQpXHJcblx0XHRcdHNjYWxlID0gTWF0aC5tYXgoMSA8PCAoMzEgLSBNYXRoLmNsejMyKHNjYWxlKSksIDEpO1x0Ly8gU2V0IHNjYWxlIHRvIGEgcG93ZXIgb2YgdHdvXHJcbiAgICAgICAgR2FtZS5jYW52YXMud2lkdGggPSBzY2FsZSAqIDI1O1xyXG4gICAgICAgIEdhbWUuY2FudmFzLmhlaWdodCA9IHNjYWxlICogMTk7XHJcbiAgICAgICAgLy8gR2V0IGNvbnRleHQgYW5kIGNsZWFyXHJcbiAgICAgICAgbGV0IGN0eCA9IEdhbWUuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSE7XHJcbiAgICAgICAgY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgR2FtZS5jYW52YXMud2lkdGgsIEdhbWUuY2FudmFzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgY3R4LnRyYW5zbGF0ZShHYW1lLmNhbWVyYS54LCBHYW1lLmNhbWVyYS55KTtcclxuICAgICAgICBjdHgucm90YXRlKEdhbWUuY2FtZXJhLmFuZ2xlKTtcclxuICAgICAgICBjdHguc2NhbGUoR2FtZS5jYW1lcmEuc2l6ZVggKiAoR2FtZS5jYW52YXMud2lkdGggLyA4MDApLCBHYW1lLmNhbWVyYS5zaXplWSAqIChHYW1lLmNhbnZhcy5oZWlnaHQgLyA2MDgpKTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBHYW1lLmxldmVsLnVwZGF0ZShjdHgsICh0aW1lc3RhbXAgLSBHYW1lLmxhc3RUaW1lc3RhbXApIC8gMTAwMCk7XHJcbiAgICAgICAgfSBjYXRjaChlOiB1bmtub3duKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcblxyXG4gICAgICAgIC8vIFJlbG9hZCBsZXZlbFxyXG4gICAgICAgIGlmIChHYW1lLmlzQnV0dG9uRG93bigncicpKSB7XHJcbiAgICAgICAgICAgIGlmICghR2FtZS5pc1B1c2hpbmdSZWxvYWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWwuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbCA9IHRoaXMubGV2ZWwuaW5zdGFudGlhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBHYW1lLmlzUHVzaGluZ1JlbG9hZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIEdhbWUuaXNQdXNoaW5nUmVsb2FkID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgR2FtZS5sYXN0VGltZXN0YW1wID0gdGltZXN0YW1wO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZFNhdmUoc2F2ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sZXZlbC5kaXNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5sZXZlbCA9IG5ldyBUZXN0TGV2ZWwoKTsgLy9UT0RPXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpc0J1dHRvbkRvd24oa2V5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGtleU5hbWUubGVuZ3RoID09IDEpIGtleU5hbWUgPSBrZXlOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgcmV0dXJuIEdhbWUua2V5TWFwLmdldChrZXlOYW1lKSA/PyBmYWxzZTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgVmVjdG9yIGZyb20gJy4vVmVjdG9yJztcclxuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi9Qb2x5Z29uJztcclxuXHJcbi8qKlxyXG4gKiAjIyBCb3hcclxuICogXHJcbiAqIFJlcHJlc2VudHMgYW4gYXhpcy1hbGlnbmVkIGJveCwgd2l0aCBhIHdpZHRoIGFuZCBoZWlnaHQuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3gge1xyXG4gIHB1YmxpYyBwb3M6IFZlY3RvcjtcclxuICBwdWJsaWMgdzogbnVtYmVyO1xyXG4gIHB1YmxpYyBoOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBuZXcgQm94LCB3aXRoIHRoZSBzcGVjaWZpZWQgcG9zaXRpb24sIHdpZHRoLCBhbmQgaGVpZ2h0LlxyXG4gICAqIFxyXG4gICAqIElmIG5vIHBvc2l0aW9uIGlzIGdpdmVuLCB0aGUgcG9zaXRpb24gd2lsbCBiZSBgKDAsIDApYC4gSWYgbm8gd2lkdGggb3IgaGVpZ2h0IGFyZSBnaXZlbiwgdGhleSB3aWxsXHJcbiAgICogYmUgc2V0IHRvIGAwYC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gW3Bvcz1uZXcgVmVjdG9yKCldIEEgVmVjdG9yIHJlcHJlc2VudGluZyB0aGUgYm90dG9tLWxlZnQgb2YgdGhlIGJveChpLmUuIHRoZSBzbWFsbGVzdCB4IGFuZCBzbWFsbGVzdCB5IHZhbHVlKS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW3c9MF0gVGhlIHdpZHRoIG9mIHRoZSBCb3guXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtoPTBdIFRoZSBoZWlnaHQgb2YgdGhlIEJveC5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihwb3MgPSBuZXcgVmVjdG9yKCksIHcgPSAwLCBoID0gMCkge1xyXG4gICAgdGhpcy5wb3MgPSBwb3M7XHJcbiAgICB0aGlzLncgPSB3O1xyXG4gICAgdGhpcy5oID0gaDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYSBQb2x5Z29uIHdob3NlIGVkZ2VzIGFyZSB0aGUgc2FtZSBhcyB0aGlzIEJveC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gQSBuZXcgUG9seWdvbiB0aGF0IHJlcHJlc2VudHMgdGhpcyBCb3guXHJcbiAgICovXHJcbiAgcHVibGljIHRvUG9seWdvbigpOiBQb2x5Z29uIHtcclxuICAgIGNvbnN0IHBvcyA9IHRoaXMucG9zO1xyXG4gICAgY29uc3QgdyA9IHRoaXMudztcclxuICAgIGNvbnN0IGggPSB0aGlzLmg7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQb2x5Z29uKG5ldyBWZWN0b3IocG9zLngsIHBvcy55KSwgW1xyXG4gICAgICBuZXcgVmVjdG9yKCksIG5ldyBWZWN0b3IodywgMCksXHJcbiAgICAgIG5ldyBWZWN0b3IodywgaCksIG5ldyBWZWN0b3IoMCwgaClcclxuICAgIF0pO1xyXG4gIH1cclxufSIsImltcG9ydCBWZWN0b3IgZnJvbSAnLi9WZWN0b3InO1xyXG5pbXBvcnQgQm94IGZyb20gJy4vQm94JztcclxuXHJcbi8qKlxyXG4gKiAjIyBQb2x5Z29uXHJcbiAqIFxyXG4gKiBSZXByZXNlbnRzIGEgKmNvbnZleCogcG9seWdvbiB3aXRoIGFueSBudW1iZXIgb2YgcG9pbnRzIChzcGVjaWZpZWQgaW4gY291bnRlci1jbG9ja3dpc2Ugb3JkZXIpLlxyXG4gKiBcclxuICogTm90ZTogRG8gX25vdF8gbWFudWFsbHkgY2hhbmdlIHRoZSBgcG9pbnRzYCwgYGFuZ2xlYCwgb3IgYG9mZnNldGAgcHJvcGVydGllcy4gVXNlIHRoZSBwcm92aWRlZCBcclxuICogc2V0dGVycy4gT3RoZXJ3aXNlIHRoZSBjYWxjdWxhdGVkIHByb3BlcnRpZXMgd2lsbCBub3QgYmUgdXBkYXRlZCBjb3JyZWN0bHkuXHJcbiAqIFxyXG4gKiBgcG9zYCBjYW4gYmUgY2hhbmdlZCBkaXJlY3RseS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvbHlnb24ge1xyXG4gIHB1YmxpYyBwb3M6IFZlY3RvcjtcclxuICBwdWJsaWMgYW5nbGU6IG51bWJlciA9IDA7XHJcbiAgcHVibGljIG9mZnNldDogVmVjdG9yID0gbmV3IFZlY3RvcigpO1xyXG4gIHB1YmxpYyBwb2ludHM6IEFycmF5PFZlY3Rvcj4gPSBbXTtcclxuICBwdWJsaWMgY2FsY1BvaW50czogQXJyYXk8VmVjdG9yPiA9IFtdO1xyXG4gIHB1YmxpYyBlZGdlczogQXJyYXk8VmVjdG9yPiA9IFtdO1xyXG4gIHB1YmxpYyBub3JtYWxzOiBBcnJheTxWZWN0b3I+ID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIG5ldyBwb2x5Z29uLCBwYXNzaW5nIGluIGEgcG9zaXRpb24gdmVjdG9yLCBhbmQgYW4gYXJyYXkgb2YgcG9pbnRzIChyZXByZXNlbnRlZCBieSB2ZWN0b3JzIFxyXG4gICAqIHJlbGF0aXZlIHRvIHRoZSBwb3NpdGlvbiB2ZWN0b3IpLiBJZiBubyBwb3NpdGlvbiBpcyBwYXNzZWQgaW4sIHRoZSBwb3NpdGlvbiBvZiB0aGUgcG9seWdvbiB3aWxsIGJlIGAoMCwwKWAuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IFtwb3M9VmVjdG9yXSBBIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIG9yaWdpbiBvZiB0aGUgcG9seWdvbiAoYWxsIG90aGVyIHBvaW50cyBhcmUgcmVsYXRpdmUgdG8gdGhpcyBvbmUpXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBbcG9pbnRzPVtdXSBBbiBhcnJheSBvZiB2ZWN0b3JzIHJlcHJlc2VudGluZyB0aGUgcG9pbnRzIGluIHRoZSBwb2x5Z29uLCBpbiBjb3VudGVyLWNsb2Nrd2lzZSBvcmRlci5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihwb3MgPSBuZXcgVmVjdG9yKCksIHBvaW50czogQXJyYXk8VmVjdG9yPiA9IFtdKSB7XHJcbiAgICB0aGlzLnBvcyA9IHBvcztcclxuICAgIHRoaXMuc2V0UG9pbnRzKHBvaW50cyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIHBvaW50cyBvZiB0aGUgcG9seWdvbi4gQW55IGNvbnNlY3V0aXZlIGR1cGxpY2F0ZSBwb2ludHMgd2lsbCBiZSBjb21iaW5lZC5cclxuICAgKiBcclxuICAgKiBOb3RlOiBUaGUgcG9pbnRzIGFyZSBjb3VudGVyLWNsb2Nrd2lzZSAqd2l0aCByZXNwZWN0IHRvIHRoZSBjb29yZGluYXRlIHN5c3RlbSouIElmIHlvdSBkaXJlY3RseSBkcmF3IHRoZSBwb2ludHMgb24gYSBzY3JlZW4gXHJcbiAgICogdGhhdCBoYXMgdGhlIG9yaWdpbiBhdCB0aGUgdG9wLWxlZnQgY29ybmVyIGl0IHdpbGwgX2FwcGVhcl8gdmlzdWFsbHkgdGhhdCB0aGUgcG9pbnRzIGFyZSBiZWluZyBzcGVjaWZpZWQgY2xvY2t3aXNlLiBUaGlzIGlzIFxyXG4gICAqIGp1c3QgYmVjYXVzZSBvZiB0aGUgaW52ZXJzaW9uIG9mIHRoZSBZLWF4aXMgd2hlbiBiZWluZyBkaXNwbGF5ZWQuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBwb2ludHMgQW4gYXJyYXkgb2YgdmVjdG9ycyByZXByZXNlbnRpbmcgdGhlIHBvaW50cyBpbiB0aGUgcG9seWdvbiwgaW4gY291bnRlci1jbG9ja3dpc2Ugb3JkZXIuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHNldFBvaW50cyhwb2ludHM6IEFycmF5PFZlY3Rvcj4pOiBQb2x5Z29uIHtcclxuICAgIC8vIE9ubHkgcmUtYWxsb2NhdGUgaWYgdGhpcyBpcyBhIG5ldyBwb2x5Z29uIG9yIHRoZSBudW1iZXIgb2YgcG9pbnRzIGhhcyBjaGFuZ2VkLlxyXG4gICAgY29uc3QgbGVuZ3RoQ2hhbmdlZCA9ICF0aGlzLnBvaW50cyB8fCB0aGlzLnBvaW50cy5sZW5ndGggIT09IHBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgaWYgKGxlbmd0aENoYW5nZWQpIHtcclxuICAgICAgbGV0IGk7XHJcblxyXG4gICAgICBjb25zdCBjYWxjUG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gdGhpcy5jYWxjUG9pbnRzID0gW107XHJcbiAgICAgIGNvbnN0IGVkZ2VzOiBBcnJheTxWZWN0b3I+ID0gdGhpcy5lZGdlcyA9IFtdO1xyXG4gICAgICBjb25zdCBub3JtYWxzOiBBcnJheTxWZWN0b3I+ID0gdGhpcy5ub3JtYWxzID0gW107XHJcblxyXG4gICAgICAvLyBBbGxvY2F0ZSB0aGUgdmVjdG9yIGFycmF5cyBmb3IgdGhlIGNhbGN1bGF0ZWQgcHJvcGVydGllc1xyXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gUmVtb3ZlIGNvbnNlY3V0aXZlIGR1cGxpY2F0ZSBwb2ludHNcclxuICAgICAgICBjb25zdCBwMSA9IHBvaW50c1tpXTtcclxuICAgICAgICBjb25zdCBwMiA9IGkgPCBwb2ludHMubGVuZ3RoIC0gMSA/IHBvaW50c1tpICsgMV0gOiBwb2ludHNbMF07XHJcblxyXG4gICAgICAgIGlmIChwMSAhPT0gcDIgJiYgcDEueCA9PT0gcDIueCAmJiBwMS55ID09PSBwMi55KSB7XHJcbiAgICAgICAgICBwb2ludHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgaSAtPSAxO1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYWxjUG9pbnRzLnB1c2gobmV3IFZlY3RvcigpKTtcclxuICAgICAgICBlZGdlcy5wdXNoKG5ldyBWZWN0b3IoKSk7XHJcbiAgICAgICAgbm9ybWFscy5wdXNoKG5ldyBWZWN0b3IoKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnBvaW50cyA9IHBvaW50cztcclxuXHJcbiAgICB0aGlzLl9yZWNhbGMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgY3VycmVudCByb3RhdGlvbiBhbmdsZSBvZiB0aGUgcG9seWdvbi5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgVGhlIGN1cnJlbnQgcm90YXRpb24gYW5nbGUgKGluIHJhZGlhbnMpLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXRBbmdsZShhbmdsZTogbnVtYmVyKTogUG9seWdvbiB7XHJcbiAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XHJcblxyXG4gICAgdGhpcy5fcmVjYWxjKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGN1cnJlbnQgb2Zmc2V0IHRvIGFwcGx5IHRvIHRoZSBgcG9pbnRzYCBiZWZvcmUgYXBwbHlpbmcgdGhlIGBhbmdsZWAgcm90YXRpb24uXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG9mZnNldCBUaGUgbmV3IG9mZnNldCBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHNldE9mZnNldChvZmZzZXQ6IFZlY3Rvcik6IFBvbHlnb24ge1xyXG4gICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XHJcblxyXG4gICAgdGhpcy5fcmVjYWxjKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSb3RhdGVzIHRoaXMgUG9seWdvbiBjb3VudGVyLWNsb2Nrd2lzZSBhcm91bmQgdGhlIG9yaWdpbiBvZiAqaXRzIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtKiAoaS5lLiBgcG9zYCkuXHJcbiAgICogXHJcbiAgICogTm90ZTogVGhpcyBjaGFuZ2VzIHRoZSAqKm9yaWdpbmFsKiogcG9pbnRzIChzbyBhbnkgYGFuZ2xlYCB3aWxsIGJlIGFwcGxpZWQgb24gdG9wIG9mIHRoaXMgcm90YXRpb24pLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBUaGUgYW5nbGUgdG8gcm90YXRlIChpbiByYWRpYW5zKS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcm90YXRlKGFuZ2xlOiBudW1iZXIpOiBQb2x5Z29uIHtcclxuICAgIGNvbnN0IHBvaW50cyA9IHRoaXMucG9pbnRzO1xyXG4gICAgY29uc3QgbGVuID0gcG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSBwb2ludHNbaV0ucm90YXRlKGFuZ2xlKTtcclxuXHJcbiAgICB0aGlzLl9yZWNhbGMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYW5zbGF0ZXMgdGhlIHBvaW50cyBvZiB0aGlzIHBvbHlnb24gYnkgYSBzcGVjaWZpZWQgYW1vdW50IHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4gb2YgKml0cyBvd24gY29vcmRpbmF0ZSBzeXN0ZW0qIChpLmUuIGBwb3NgKS5cclxuICAgKiBcclxuICAgKiBOb3RlOiBUaGlzIGNoYW5nZXMgdGhlICoqb3JpZ2luYWwqKiBwb2ludHMgKHNvIGFueSBgb2Zmc2V0YCB3aWxsIGJlIGFwcGxpZWQgb24gdG9wIG9mIHRoaXMgdHJhbnNsYXRpb24pXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHggVGhlIGhvcml6b250YWwgYW1vdW50IHRvIHRyYW5zbGF0ZS5cclxuICAgKiBAcGFyYW0ge251bWJlcn0geSBUaGUgdmVydGljYWwgYW1vdW50IHRvIHRyYW5zbGF0ZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgdHJhbnNsYXRlKHg6IG51bWJlciwgeTogbnVtYmVyKTogUG9seWdvbiB7XHJcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLnBvaW50cztcclxuICAgIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBwb2ludHNbaV0ueCArPSB4O1xyXG4gICAgICBwb2ludHNbaV0ueSArPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3JlY2FsYygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcHV0ZXMgdGhlIGNhbGN1bGF0ZWQgY29sbGlzaW9uIFBvbHlnb24uXHJcbiAgICogXHJcbiAgICogVGhpcyBhcHBsaWVzIHRoZSBgYW5nbGVgIGFuZCBgb2Zmc2V0YCB0byB0aGUgb3JpZ2luYWwgcG9pbnRzIHRoZW4gcmVjYWxjdWxhdGVzIHRoZSBlZGdlcyBhbmQgbm9ybWFscyBvZiB0aGUgY29sbGlzaW9uIFBvbHlnb24uXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwcml2YXRlIF9yZWNhbGMoKTogUG9seWdvbiB7XHJcbiAgICAvLyBDYWxjdWxhdGVkIHBvaW50cyAtIHRoaXMgaXMgd2hhdCBpcyB1c2VkIGZvciB1bmRlcmx5aW5nIGNvbGxpc2lvbnMgYW5kIHRha2VzIGludG8gYWNjb3VudFxyXG4gICAgLy8gdGhlIGFuZ2xlL29mZnNldCBzZXQgb24gdGhlIHBvbHlnb24uXHJcbiAgICBjb25zdCBjYWxjUG9pbnRzID0gdGhpcy5jYWxjUG9pbnRzO1xyXG5cclxuICAgIC8vIFRoZSBlZGdlcyBoZXJlIGFyZSB0aGUgZGlyZWN0aW9uIG9mIHRoZSBgbmB0aCBlZGdlIG9mIHRoZSBwb2x5Z29uLCByZWxhdGl2ZSB0b1xyXG4gICAgLy8gdGhlIGBuYHRoIHBvaW50LiBJZiB5b3Ugd2FudCB0byBkcmF3IGEgZ2l2ZW4gZWRnZSBmcm9tIHRoZSBlZGdlIHZhbHVlLCB5b3UgbXVzdFxyXG4gICAgLy8gZmlyc3QgdHJhbnNsYXRlIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgc3RhcnRpbmcgcG9pbnQuXHJcbiAgICBjb25zdCBlZGdlcyA9IHRoaXMuZWRnZXM7XHJcblxyXG4gICAgLy8gVGhlIG5vcm1hbHMgaGVyZSBhcmUgdGhlIGRpcmVjdGlvbiBvZiB0aGUgbm9ybWFsIGZvciB0aGUgYG5gdGggZWRnZSBvZiB0aGUgcG9seWdvbiwgcmVsYXRpdmVcclxuICAgIC8vIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgYG5gdGggcG9pbnQuIElmIHlvdSB3YW50IHRvIGRyYXcgYW4gZWRnZSBub3JtYWwsIHlvdSBtdXN0IGZpcnN0XHJcbiAgICAvLyB0cmFuc2xhdGUgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBzdGFydGluZyBwb2ludC5cclxuICAgIGNvbnN0IG5vcm1hbHMgPSB0aGlzLm5vcm1hbHM7XHJcblxyXG4gICAgLy8gQ29weSB0aGUgb3JpZ2luYWwgcG9pbnRzIGFycmF5IGFuZCBhcHBseSB0aGUgb2Zmc2V0L2FuZ2xlXHJcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLnBvaW50cztcclxuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMub2Zmc2V0O1xyXG4gICAgY29uc3QgYW5nbGUgPSB0aGlzLmFuZ2xlO1xyXG5cclxuICAgIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XHJcbiAgICBsZXQgaTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgY29uc3QgY2FsY1BvaW50ID0gY2FsY1BvaW50c1tpXS5jb3B5KHBvaW50c1tpXSk7XHJcblxyXG4gICAgICBjYWxjUG9pbnQueCArPSBvZmZzZXQueDtcclxuICAgICAgY2FsY1BvaW50LnkgKz0gb2Zmc2V0Lnk7XHJcblxyXG4gICAgICBpZiAoYW5nbGUgIT09IDApIGNhbGNQb2ludC5yb3RhdGUoYW5nbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENhbGN1bGF0ZSB0aGUgZWRnZXMvbm9ybWFsc1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHAxID0gY2FsY1BvaW50c1tpXTtcclxuICAgICAgY29uc3QgcDIgPSBpIDwgbGVuIC0gMSA/IGNhbGNQb2ludHNbaSArIDFdIDogY2FsY1BvaW50c1swXTtcclxuXHJcbiAgICAgIGNvbnN0IGUgPSBlZGdlc1tpXS5jb3B5KHAyKS5zdWIocDEpO1xyXG5cclxuICAgICAgbm9ybWFsc1tpXS5jb3B5KGUpLnBlcnAoKS5ub3JtYWxpemUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXB1dGUgdGhlIGF4aXMtYWxpZ25lZCBib3VuZGluZyBib3guXHJcbiAgICogXHJcbiAgICogQW55IGN1cnJlbnQgc3RhdGUgKHRyYW5zbGF0aW9ucy9yb3RhdGlvbnMpIHdpbGwgYmUgYXBwbGllZCBiZWZvcmUgY29uc3RydWN0aW5nIHRoZSBBQUJCLlxyXG4gICAqIFxyXG4gICAqIE5vdGU6IFJldHVybnMgYSBfbmV3XyBgUG9seWdvbmAgZWFjaCB0aW1lIHlvdSBjYWxsIHRoaXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgQUFCQi5cclxuICAgKi9cclxuICBwdWJsaWMgZ2V0QUFCQigpOiBQb2x5Z29uIHtcclxuICAgIGNvbnN0IHBvaW50cyA9IHRoaXMuY2FsY1BvaW50cztcclxuXHJcbiAgICBsZXQgeE1pbiA9IHBvaW50c1swXS54O1xyXG4gICAgbGV0IHlNaW4gPSBwb2ludHNbMF0ueTtcclxuXHJcbiAgICBsZXQgeE1heCA9IHBvaW50c1swXS54O1xyXG4gICAgbGV0IHlNYXggPSBwb2ludHNbMF0ueTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBwb2ludCA9IHBvaW50c1tpXTtcclxuXHJcbiAgICAgIGlmIChwb2ludC54IDwgeE1pbikgeE1pbiA9IHBvaW50Lng7XHJcbiAgICAgIGVsc2UgaWYgKHBvaW50LnggPiB4TWF4KSB4TWF4ID0gcG9pbnQueDtcclxuXHJcbiAgICAgIGlmIChwb2ludC55IDwgeU1pbikgeU1pbiA9IHBvaW50Lnk7XHJcbiAgICAgIGVsc2UgaWYgKHBvaW50LnkgPiB5TWF4KSB5TWF4ID0gcG9pbnQueTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IEJveCh0aGlzLnBvcy5jbG9uZSgpLmFkZChuZXcgVmVjdG9yKHhNaW4sIHlNaW4pKSwgeE1heCAtIHhNaW4sIHlNYXggLSB5TWluKS50b1BvbHlnb24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXB1dGUgdGhlIGNlbnRyb2lkIChnZW9tZXRyaWMgY2VudGVyKSBvZiB0aGUgUG9seWdvbi5cclxuICAgKiBcclxuICAgKiBBbnkgY3VycmVudCBzdGF0ZSAodHJhbnNsYXRpb25zL3JvdGF0aW9ucykgd2lsbCBiZSBhcHBsaWVkIGJlZm9yZSBjb21wdXRpbmcgdGhlIGNlbnRyb2lkLlxyXG4gICAqIFxyXG4gICAqIFNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9DZW50cm9pZCNDZW50cm9pZF9vZl9hX3BvbHlnb25cclxuICAgKiBcclxuICAgKiBOb3RlOiBSZXR1cm5zIGEgX25ld18gYFZlY3RvcmAgZWFjaCB0aW1lIHlvdSBjYWxsIHRoaXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyBhIFZlY3RvciB0aGF0IGNvbnRhaW5zIHRoZSBjb29yZGluYXRlcyBvZiB0aGUgY2VudHJvaWQuXHJcbiAgICovXHJcbiAgcHVibGljIGdldENlbnRyb2lkKCk6IFZlY3RvciB7XHJcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLmNhbGNQb2ludHM7XHJcbiAgICBjb25zdCBsZW4gPSBwb2ludHMubGVuZ3RoO1xyXG5cclxuICAgIGxldCBjeCA9IDA7XHJcbiAgICBsZXQgY3kgPSAwO1xyXG4gICAgbGV0IGFyID0gMDtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHAxID0gcG9pbnRzW2ldO1xyXG4gICAgICBjb25zdCBwMiA9IGkgPT09IGxlbiAtIDEgPyBwb2ludHNbMF0gOiBwb2ludHNbaSArIDFdOyAvLyBMb29wIGFyb3VuZCBpZiBsYXN0IHBvaW50XHJcblxyXG4gICAgICBjb25zdCBhID0gcDEueCAqIHAyLnkgLSBwMi54ICogcDEueTtcclxuXHJcbiAgICAgIGN4ICs9IChwMS54ICsgcDIueCkgKiBhO1xyXG4gICAgICBjeSArPSAocDEueSArIHAyLnkpICogYTtcclxuICAgICAgYXIgKz0gYTtcclxuICAgIH1cclxuXHJcbiAgICBhciA9IGFyICogMzsgLy8gd2Ugd2FudCAxIC8gNiB0aGUgYXJlYSBhbmQgd2UgY3VycmVudGx5IGhhdmUgMiphcmVhXHJcbiAgICBjeCA9IGN4IC8gYXI7XHJcbiAgICBjeSA9IGN5IC8gYXI7XHJcbiAgICBcclxuICAgIHJldHVybiBuZXcgVmVjdG9yKGN4LCBjeSk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IFZlY3RvciBmcm9tICcuL1ZlY3Rvcic7XHJcblxyXG4vKipcclxuICogIyMgUmVzcG9uc2VcclxuICogXHJcbiAqIEFuIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHJlc3VsdCBvZiBhbiBpbnRlcnNlY3Rpb24uIENvbnRhaW5zOlxyXG4gKiAtIFRoZSB0d28gb2JqZWN0cyBwYXJ0aWNpcGF0aW5nIGluIHRoZSBpbnRlcnNlY3Rpb25cclxuICogLSBUaGUgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgbWluaW11bSBjaGFuZ2UgbmVjZXNzYXJ5IHRvIGV4dHJhY3QgdGhlIGZpcnN0IG9iamVjdCBmcm9tIHRoZSBzZWNvbmQgb25lIChhcyB3ZWxsIGFzIGEgdW5pdCB2ZWN0b3IgaW4gdGhhdCBkaXJlY3Rpb24gYW5kIHRoZSBtYWduaXR1ZGUgb2YgdGhlIG92ZXJsYXApXHJcbiAqIC0gV2hldGhlciB0aGUgZmlyc3Qgb2JqZWN0IGlzIGVudGlyZWx5IGluc2lkZSB0aGUgc2Vjb25kLCBhbmQgdmljZSB2ZXJzYS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BvbnNlIHtcclxuICBwdWJsaWMgYTogYW55ID0gbnVsbDtcclxuICBwdWJsaWMgYjogYW55ID0gbnVsbDtcclxuICBwdWJsaWMgb3ZlcmxhcE4gPSBuZXcgVmVjdG9yKCk7XHJcbiAgcHVibGljIG92ZXJsYXBWID0gbmV3IFZlY3RvcigpO1xyXG5cclxuICBwdWJsaWMgYUluQjogYm9vbGVhbiA9IHRydWU7XHJcbiAgcHVibGljIGJJbkE6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHB1YmxpYyBvdmVybGFwOiBudW1iZXIgPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG5cclxuICAvKipcclxuICAgKiBTZXQgc29tZSB2YWx1ZXMgb2YgdGhlIHJlc3BvbnNlIGJhY2sgdG8gdGhlaXIgZGVmYXVsdHMuXHJcbiAgICogXHJcbiAgICogQ2FsbCB0aGlzIGJldHdlZW4gdGVzdHMgaWYgeW91IGFyZSBnb2luZyB0byByZXVzZSBhIHNpbmdsZSBSZXNwb25zZSBvYmplY3QgZm9yIG11bHRpcGxlIGludGVyc2VjdGlvbiB0ZXN0cyAocmVjb21tZW5kZWQgYXMgaXQgd2lsbCBhdm9pZCBhbGxjYXRpbmcgZXh0cmEgbWVtb3J5KVxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtSZXNwb25zZX0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgY2xlYXIoKTogUmVzcG9uc2Uge1xyXG4gICAgdGhpcy5hSW5CID0gdHJ1ZTtcclxuICAgIHRoaXMuYkluQSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5vdmVybGFwID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn0iLCIvKiFcclxuKiBzYXQtanMgKG9yIFNBVC5qcykgbWFkZSBieSBKaW0gUmllY2tlbiBhbmQgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiogTW9kaWZpZWQgYnkgUm9iZXJ0IENvcnBvbm9pIGFuZCBtZSAoU29ub1BHKVxyXG4qIENoYW5nZXMgbWFkZSBieSBtZTogQnVnIGZpeGVzIGFuZCBjb252ZXJzaW9uIHRvIFR5cGVTY3JpcHRcclxuKi9cclxuXHJcbmltcG9ydCBCb3ggZnJvbSAnLi9Cb3gnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4vVmVjdG9yJztcclxuaW1wb3J0IENpcmNsZSBmcm9tICcuL0NpcmNsZSc7XHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4vUG9seWdvbic7XHJcbmltcG9ydCBSZXNwb25zZSBmcm9tICcuL1Jlc3BvbnNlJztcclxuXHJcbi8qKlxyXG4gKiAjIyBPYmplY3QgUG9vbHNcclxuICovXHJcblxyXG4vKipcclxuICogQSBwb29sIG9mIGBWZWN0b3Igb2JqZWN0cyB0aGF0IGFyZSB1c2VkIGluIGNhbGN1bGF0aW9ucyB0byBhdm9pZCBhbGxvY2F0aW5nIG1lbW9yeS5cclxuICogXHJcbiAqIEB0eXBlIHtBcnJheTxWZWN0b3I+fVxyXG4gKi9cclxuIGNvbnN0IFRfVkVDVE9SUzogQXJyYXk8VmVjdG9yPiA9IFtdO1xyXG4gZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSBUX1ZFQ1RPUlMucHVzaChuZXcgVmVjdG9yKCkpO1xyXG4gXHJcbiAvKipcclxuICAqIEEgcG9vbCBvZiBhcnJheXMgb2YgbnVtYmVycyB1c2VkIGluIGNhbGN1bGF0aW9ucyB0byBhdm9pZCBhbGxvY2F0aW5nIG1lbW9yeS5cclxuICAqIFxyXG4gICogQHR5cGUge0FycmF5PEFycmF5PG51bWJlcj4+fVxyXG4gICovXHJcbiBjb25zdCBUX0FSUkFZUzogQXJyYXk8QXJyYXk8bnVtYmVyPj4gPSBbXTtcclxuIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSBUX0FSUkFZUy5wdXNoKFtdKTtcclxuIFxyXG5cclxuLyoqXHJcbiAqIFRlbXBvcmFyeSByZXNwb25zZSB1c2VkIGZvciBQb2x5Z29uIGhpdCBkZXRlY3Rpb24uXHJcbiAqIFxyXG4gKiBAdHlwZSB7UmVzcG9uc2V9XHJcbiAqL1xyXG5jb25zdCBUX1JFU1BPTlNFID0gbmV3IFJlc3BvbnNlKCk7XHJcblxyXG4vKipcclxuICogVGlueSBcInBvaW50XCIgUG9seWdvbiB1c2VkIGZvciBQb2x5Z29uIGhpdCBkZXRlY3Rpb24uXHJcbiAqIFxyXG4gKiBAdHlwZSB7UG9seWdvbn1cclxuICovXHJcbmNvbnN0IFRFU1RfUE9JTlQgPSBuZXcgQm94KG5ldyBWZWN0b3IoKSwgMC4wMDAwMDEsIDAuMDAwMDAxKS50b1BvbHlnb24oKTtcclxuXHJcbi8qKlxyXG4gKiAjIyBDb25zdGFudHMgZm9yIFZvcm9ub2kgcmVnaW9ucy5cclxuICovXHJcbmNvbnN0IExFRlRfVk9ST05PSV9SRUdJT04gPSAtMTtcclxuY29uc3QgTUlERExFX1ZPUk9OT0lfUkVHSU9OID0gMDtcclxuY29uc3QgUklHSFRfVk9ST05PSV9SRUdJT04gPSAxO1xyXG5cclxuLyoqXHJcbiAqICMjIEhlbHBlciBGdW5jdGlvbnNcclxuICovXHJcblxyXG4vKipcclxuICogRmxhdHRlbnMgdGhlIHNwZWNpZmllZCBhcnJheSBvZiBwb2ludHMgb250byBhIHVuaXQgdmVjdG9yIGF4aXMgcmVzdWx0aW5nIGluIGEgb25lIGRpbWVuc2lvbnNsXHJcbiAqIHJhbmdlIG9mIHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlIG9uIHRoYXQgYXhpcy5cclxuICogXHJcbiAqIEBwYXJhbSB7QXJyYXk8VmVjdG9yPn0gcG9pbnRzIFRoZSBwb2ludHMgdG8gZmxhdHRlbi5cclxuICogQHBhcmFtIHtWZWN0b3J9IG5vcm1hbCBUaGUgdW5pdCB2ZWN0b3IgYXhpcyB0byBmbGF0dGVuIG9uLlxyXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IHJlc3VsdCBBbiBhcnJheS4gQWZ0ZXIgY2FsbGluZyB0aGlzIGZ1bmN0aW9uLCByZXN1bHRbMF0gd2lsbCBiZSB0aGUgbWluaW11bSB2YWx1ZSwgcmVzdWx0WzFdIHdpbGwgYmUgdGhlIG1heGltdW0gdmFsdWUuXHJcbiAqL1xyXG5mdW5jdGlvbiBmbGF0dGVuUG9pbnRzT24ocG9pbnRzOiBBcnJheTxWZWN0b3I+LCBub3JtYWw6IFZlY3RvciwgcmVzdWx0OiBBcnJheTxudW1iZXI+KTogdm9pZCB7XHJcbiAgbGV0IG1pbiA9IE51bWJlci5NQVhfVkFMVUU7XHJcbiAgbGV0IG1heCA9IC1OdW1iZXIuTUFYX1ZBTFVFO1xyXG5cclxuICBjb25zdCBsZW4gPSBwb2ludHMubGVuZ3RoO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAvLyBUaGUgbWFnbml0dWRlIG9mIHRoZSBwcm9qZWN0aW9uIG9mIHRoZSBwb2ludCBvbnRvIHRoZSBub3JtYWwuXHJcbiAgICBjb25zdCBkb3QgPSBwb2ludHNbaV0uZG90KG5vcm1hbCk7XHJcblxyXG4gICAgaWYgKGRvdCA8IG1pbikgbWluID0gZG90O1xyXG4gICAgaWYgKGRvdCA+IG1heCkgbWF4ID0gZG90O1xyXG4gIH1cclxuXHJcbiAgcmVzdWx0WzBdID0gbWluO1xyXG4gIHJlc3VsdFsxXSA9IG1heDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgd2hpY2ggVm9yb25vaSByZWdpb24gYSBwb2ludCBpcyBvbiBhIGxpbmUgc2VnbWVudC5cclxuICogXHJcbiAqIEl0IGlzIGFzc3VtZWQgdGhhdCBib3RoIHRoZSBsaW5lIGFuZCB0aGUgcG9pbnQgYXJlIHJlbGF0aXZlIHRvIGAoMCwwKWBcclxuICogXHJcbiAqICAgICAgICAgICAgIHwgICAgICAgKDApICAgICAgfFxyXG4gKiAgICAgICgtMSkgIFtTXS0tLS0tLS0tLS0tLS0tW0VdICAoMSlcclxuICogICAgICAgICAgICB8ICAgICAgICgwKSAgICAgIHxcclxuICogXHJcbiAqIEBwYXJhbSB7VmVjdG9yfSBsaW5lIFRoZSBsaW5lIHNlZ21lbnQuXHJcbiAqIEBwYXJhbSB7VmVjdG9yfSBwb2ludCBUaGUgcG9pbnQuXHJcbiAqIEByZXR1cm4ge251bWJlcn0gTEVGVF9WT1JPTk9JX1JFR0lPTiAoLTEpIGlmIGl0IGlzIHRoZSBsZWZ0IHJlZ2lvbixcclxuICogICAgICAgICAgICAgICAgICBNSURETEVfVk9ST05PSV9SRUdJT04gKDApIGlmIGl0IGlzIHRoZSBtaWRkbGUgcmVnaW9uLFxyXG4gKiAgICAgICAgICAgICAgICAgIFJJR0hUX1ZPUk9OT0lfUkVHSU9OICgxKSBpZiBpdCBpcyB0aGUgcmlnaHQgcmVnaW9uLlxyXG4gKi9cclxuZnVuY3Rpb24gdm9yb25vaVJlZ2lvbihsaW5lOiBWZWN0b3IsIHBvaW50OiBWZWN0b3IpOiBudW1iZXIge1xyXG4gIGNvbnN0IGxlbjIgPSBsaW5lLmxlbjIoKTtcclxuICBjb25zdCBkcCA9IHBvaW50LmRvdChsaW5lKTtcclxuXHJcbiAgLy8gSWYgdGhlIHBvaW50IGlzIGJleW9uZCB0aGUgc3RhcnQgb2YgdGhlIGxpbmUsIGl0IGlzIGluIHRoZSBsZWZ0IHZvcm9ub2kgcmVnaW9uLlxyXG4gIGlmIChkcCA8IDApIHJldHVybiBMRUZUX1ZPUk9OT0lfUkVHSU9OO1xyXG5cclxuICAvLyBJZiB0aGUgcG9pbnQgaXMgYmV5b25kIHRoZSBlbmQgb2YgdGhlIGxpbmUsIGl0IGlzIGluIHRoZSByaWdodCB2b3Jvbm9pIHJlZ2lvbi5cclxuICBlbHNlIGlmIChkcCA+IGxlbjIpIHJldHVybiBSSUdIVF9WT1JPTk9JX1JFR0lPTjtcclxuXHJcbiAgLy8gT3RoZXJ3aXNlLCBpdCdzIGluIHRoZSBtaWRkbGUgb25lLlxyXG4gIGVsc2UgcmV0dXJuIE1JRERMRV9WT1JPTk9JX1JFR0lPTjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU0FUIHtcclxuICAvKipcclxuICAgKiBDaGVjayB3aGV0aGVyIHR3byBjb252ZXggcG9seWdvbnMgYXJlIHNlcGFyYXRlZCBieSB0aGUgc3BlY2lmaWVkIGF4aXMgKG11c3QgYmUgYSB1bml0IHZlY3RvcikuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGFQb3MgVGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBiUG9zIFRoZSBwb3NpdGlvbiBvZiB0aGUgc2Vjb25kIHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBhUG9pbnRzIFRoZSBwb2ludHMgaW4gdGhlIGZpcnN0IHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBiUG9pbnRzIFRoZSBwb2ludHMgaW4gdGhlIHNlY29uZCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBheGlzIFRoZSBheGlzICh1bml0IHNpemVkKSB0byB0ZXN0IGFnYWluc3QuICBUaGUgcG9pbnRzIG9mIGJvdGggcG9seWdvbnMgd2lsbCBiZSBwcm9qZWN0ZWQgb250byB0aGlzIGF4aXMuXHJcbiAgICogQHBhcmFtIHtSZXNwb25zZT19IHJlc3BvbnNlIEEgUmVzcG9uc2Ugb2JqZWN0IChvcHRpb25hbCkgd2hpY2ggd2lsbCBiZSBwb3B1bGF0ZWQgaWYgdGhlIGF4aXMgaXMgbm90IGEgc2VwYXJhdGluZyBheGlzLlxyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgaXQgaXMgYSBzZXBhcmF0aW5nIGF4aXMsIGZhbHNlIG90aGVyd2lzZS4gIElmIGZhbHNlLCBhbmQgYSByZXNwb25zZSBpcyBwYXNzZWQgaW4sIGluZm9ybWF0aW9uIGFib3V0IGhvdyBtdWNoIG92ZXJsYXAgYW5kIHRoZSBkaXJlY3Rpb24gb2YgdGhlIG92ZXJsYXAgd2lsbCBiZSBwb3B1bGF0ZWQuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBpc1NlcGFyYXRpbmdBeGlzKGFQb3M6IFZlY3RvciwgYlBvczogVmVjdG9yLCBhUG9pbnRzOiBBcnJheTxWZWN0b3I+LCBiUG9pbnRzOiBBcnJheTxWZWN0b3I+LCBheGlzOiBWZWN0b3IsIHJlc3BvbnNlPzogUmVzcG9uc2UpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHJhbmdlQSA9IFRfQVJSQVlTLnBvcCgpITtcclxuICAgIGNvbnN0IHJhbmdlQiA9IFRfQVJSQVlTLnBvcCgpITtcclxuICBcclxuICAgIC8vIFRoZSBtYWduaXR1ZGUgb2YgdGhlIG9mZnNldCBiZXR3ZWVuIHRoZSB0d28gcG9seWdvbnNcclxuICAgIGNvbnN0IG9mZnNldFYgPSBUX1ZFQ1RPUlMucG9wKCkhLmNvcHkoYlBvcykuc3ViKGFQb3MpO1xyXG4gICAgY29uc3QgcHJvamVjdGVkT2Zmc2V0ID0gb2Zmc2V0Vi5kb3QoYXhpcyk7XHJcbiAgXHJcbiAgICAvLyBQcm9qZWN0IHRoZSBwb2x5Z29ucyBvbnRvIHRoZSBheGlzLlxyXG4gICAgZmxhdHRlblBvaW50c09uKGFQb2ludHMsIGF4aXMsIHJhbmdlQSk7XHJcbiAgICBmbGF0dGVuUG9pbnRzT24oYlBvaW50cywgYXhpcywgcmFuZ2VCKTtcclxuICBcclxuICAgIC8vIE1vdmUgQidzIHJhbmdlIHRvIGl0cyBwb3NpdGlvbiByZWxhdGl2ZSB0byBBLlxyXG4gICAgcmFuZ2VCWzBdICs9IHByb2plY3RlZE9mZnNldDtcclxuICAgIHJhbmdlQlsxXSArPSBwcm9qZWN0ZWRPZmZzZXQ7XHJcbiAgXHJcbiAgICAvLyBDaGVjayBpZiB0aGVyZSBpcyBhIGdhcC4gSWYgdGhlcmUgaXMsIHRoaXMgaXMgYSBzZXBhcmF0aW5nIGF4aXMgYW5kIHdlIGNhbiBzdG9wXHJcbiAgICBpZiAocmFuZ2VBWzBdID4gcmFuZ2VCWzFdIHx8IHJhbmdlQlswXSA+IHJhbmdlQVsxXSkge1xyXG4gICAgICBUX1ZFQ1RPUlMucHVzaChvZmZzZXRWKTtcclxuICBcclxuICAgICAgVF9BUlJBWVMucHVzaChyYW5nZUEpO1xyXG4gICAgICBUX0FSUkFZUy5wdXNoKHJhbmdlQik7XHJcbiAgXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gVGhpcyBpcyBub3QgYSBzZXBhcmF0aW5nIGF4aXMuIElmIHdlJ3JlIGNhbGN1bGF0aW5nIGEgcmVzcG9uc2UsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICBsZXQgb3ZlcmxhcCA9IDA7XHJcbiAgXHJcbiAgICAgIC8vIEEgc3RhcnRzIGZ1cnRoZXIgbGVmdCB0aGFuIEJcclxuICAgICAgaWYgKHJhbmdlQVswXSA8IHJhbmdlQlswXSkge1xyXG4gICAgICAgIHJlc3BvbnNlLmFJbkIgPSBmYWxzZTtcclxuICBcclxuICAgICAgICAvLyBBIGVuZHMgYmVmb3JlIEIgZG9lcy4gV2UgaGF2ZSB0byBwdWxsIEEgb3V0IG9mIEJcclxuICAgICAgICBpZiAocmFuZ2VBWzFdIDwgcmFuZ2VCWzFdKSB7XHJcbiAgICAgICAgICBvdmVybGFwID0gcmFuZ2VBWzFdIC0gcmFuZ2VCWzBdO1xyXG4gIFxyXG4gICAgICAgICAgcmVzcG9uc2UuYkluQSA9IGZhbHNlO1xyXG4gICAgICAgICAgLy8gQiBpcyBmdWxseSBpbnNpZGUgQS4gIFBpY2sgdGhlIHNob3J0ZXN0IHdheSBvdXQuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IG9wdGlvbjEgPSByYW5nZUFbMV0gLSByYW5nZUJbMF07XHJcbiAgICAgICAgICBjb25zdCBvcHRpb24yID0gcmFuZ2VCWzFdIC0gcmFuZ2VBWzBdO1xyXG4gIFxyXG4gICAgICAgICAgb3ZlcmxhcCA9IG9wdGlvbjEgPCBvcHRpb24yID8gb3B0aW9uMSA6IC1vcHRpb24yO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBCIHN0YXJ0cyBmdXJ0aGVyIGxlZnQgdGhhbiBBXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcG9uc2UuYkluQSA9IGZhbHNlO1xyXG4gIFxyXG4gICAgICAgIC8vIEIgZW5kcyBiZWZvcmUgQSBlbmRzLiBXZSBoYXZlIHRvIHB1c2ggQSBvdXQgb2YgQlxyXG4gICAgICAgIGlmIChyYW5nZUFbMV0gPiByYW5nZUJbMV0pIHtcclxuICAgICAgICAgIG92ZXJsYXAgPSByYW5nZUFbMF0gLSByYW5nZUJbMV07XHJcbiAgXHJcbiAgICAgICAgICByZXNwb25zZS5hSW5CID0gZmFsc2U7XHJcbiAgICAgICAgICAvLyBBIGlzIGZ1bGx5IGluc2lkZSBCLiAgUGljayB0aGUgc2hvcnRlc3Qgd2F5IG91dC5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3Qgb3B0aW9uMSA9IHJhbmdlQVsxXSAtIHJhbmdlQlswXTtcclxuICAgICAgICAgIGNvbnN0IG9wdGlvbjIgPSByYW5nZUJbMV0gLSByYW5nZUFbMF07XHJcbiAgXHJcbiAgICAgICAgICBvdmVybGFwID0gb3B0aW9uMSA8IG9wdGlvbjIgPyBvcHRpb24xIDogLW9wdGlvbjI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIC8vIElmIHRoaXMgaXMgdGhlIHNtYWxsZXN0IGFtb3VudCBvZiBvdmVybGFwIHdlJ3ZlIHNlZW4gc28gZmFyLCBzZXQgaXQgYXMgdGhlIG1pbmltdW0gb3ZlcmxhcC5cclxuICAgICAgY29uc3QgYWJzT3ZlcmxhcCA9IE1hdGguYWJzKG92ZXJsYXApO1xyXG4gIFxyXG4gICAgICBpZiAoYWJzT3ZlcmxhcCA8IHJlc3BvbnNlLm92ZXJsYXApIHtcclxuICAgICAgICByZXNwb25zZS5vdmVybGFwID0gYWJzT3ZlcmxhcDtcclxuICAgICAgICByZXNwb25zZS5vdmVybGFwTi5jb3B5KGF4aXMpO1xyXG4gIFxyXG4gICAgICAgIGlmIChvdmVybGFwIDwgMCkgcmVzcG9uc2Uub3ZlcmxhcE4ucmV2ZXJzZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgICBUX1ZFQ1RPUlMucHVzaChvZmZzZXRWKTtcclxuICBcclxuICAgIFRfQVJSQVlTLnB1c2gocmFuZ2VBKTtcclxuICAgIFRfQVJSQVlTLnB1c2gocmFuZ2VCKTtcclxuICBcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqICMjIENvbGxpc2lvbiBUZXN0c1xyXG4gICAqL1xyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBhIHBvaW50IGlzIGluc2lkZSBhIGNpcmNsZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gcCBUaGUgcG9pbnQgdG8gdGVzdC5cclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gYyBUaGUgY2lyY2xlIHRvIHRlc3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgcG9pbnQgaXMgaW5zaWRlIHRoZSBjaXJjbGUgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgcG9pbnRJbkNpcmNsZShwOiBWZWN0b3IsIGM6IENpcmNsZSk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgZGlmZmVyZW5jZVYgPSBUX1ZFQ1RPUlMucG9wKCkhLmNvcHkocCkuc3ViKGMucG9zKS5zdWIoYy5vZmZzZXQpO1xyXG5cclxuICAgIGNvbnN0IHJhZGl1c1NxID0gYy5yICogYy5yO1xyXG4gICAgY29uc3QgZGlzdGFuY2VTcSA9IGRpZmZlcmVuY2VWLmxlbjIoKTtcclxuXHJcbiAgICBUX1ZFQ1RPUlMucHVzaChkaWZmZXJlbmNlVik7XHJcblxyXG4gICAgLy8gSWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gaXMgc21hbGxlciB0aGFuIHRoZSByYWRpdXMgdGhlbiB0aGUgcG9pbnQgaXMgaW5zaWRlIHRoZSBjaXJjbGUuXHJcbiAgICByZXR1cm4gZGlzdGFuY2VTcSA8PSByYWRpdXNTcTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIGEgcG9pbnQgaXMgaW5zaWRlIGEgY29udmV4IHBvbHlnb24uXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IHAgVGhlIHBvaW50IHRvIHRlc3QuXHJcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBwb2x5IFRoZSBwb2x5Z29uIHRvIHRlc3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgcG9pbnQgaXMgaW5zaWRlIHRoZSBwb2x5Z29uIG9yIGZhbHNlIG90aGVyd2lzZS5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIHBvaW50SW5Qb2x5Z29uKHA6IFZlY3RvciwgcG9seTogUG9seWdvbik6IGJvb2xlYW4ge1xyXG4gICAgVEVTVF9QT0lOVC5wb3MuY29weShwKTtcclxuICAgIFRfUkVTUE9OU0UuY2xlYXIoKTtcclxuXHJcbiAgICBsZXQgcmVzdWx0ID0gU0FULnRlc3RQb2x5Z29uUG9seWdvbihURVNUX1BPSU5ULCBwb2x5LCBUX1JFU1BPTlNFKTtcclxuXHJcbiAgICBpZiAocmVzdWx0KSByZXN1bHQgPSBUX1JFU1BPTlNFLmFJbkI7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIHR3byBjaXJjbGVzIGNvbGxpZGUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtDaXJjbGV9IGEgVGhlIGZpcnN0IGNpcmNsZS5cclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gYiBUaGUgc2Vjb25kIGNpcmNsZS5cclxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSBbcmVzcG9uc2VdIEFuIG9wdGlvbmFsIHJlc3BvbnNlIG9iamVjdCB0aGF0IHdpbGwgYmUgcG9wdWxhdGVkIGlmIHRoZSBjaXJjbGVzIGludGVyc2VjdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBjaXJjbGVzIGludGVyc2VjdCBvciBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyB0ZXN0Q2lyY2xlQ2lyY2xlKGE6IENpcmNsZSwgYjogQ2lyY2xlLCByZXNwb25zZT86IFJlc3BvbnNlKTogYm9vbGVhbiB7XHJcbiAgICAvLyBDaGVjayBpZiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgY2VudGVycyBvZiB0aGUgdHdvIGNpcmNsZXMgaXMgZ3JlYXRlciB0aGFuIHRoZWlyIGNvbWJpbmVkIHJhZGl1cy5cclxuICAgIGNvbnN0IGRpZmZlcmVuY2VWID0gVF9WRUNUT1JTLnBvcCgpIS5jb3B5KGIucG9zKS5hZGQoYi5vZmZzZXQpLnN1YihhLnBvcykuc3ViKGEub2Zmc2V0KTtcclxuXHJcbiAgICBjb25zdCB0b3RhbFJhZGl1cyA9IGEuciArIGIucjtcclxuICAgIGNvbnN0IHRvdGFsUmFkaXVzU3EgPSB0b3RhbFJhZGl1cyAqIHRvdGFsUmFkaXVzO1xyXG4gICAgY29uc3QgZGlzdGFuY2VTcSA9IGRpZmZlcmVuY2VWLmxlbjIoKTtcclxuXHJcbiAgICAvLyBJZiB0aGUgZGlzdGFuY2UgaXMgYmlnZ2VyIHRoYW4gdGhlIGNvbWJpbmVkIHJhZGl1cywgdGhleSBkb24ndCBpbnRlcnNlY3QuXHJcbiAgICBpZiAoZGlzdGFuY2VTcSA+IHRvdGFsUmFkaXVzU3EpIHtcclxuICAgICAgVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xyXG5cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoZXkgaW50ZXJzZWN0LiAgSWYgd2UncmUgY2FsY3VsYXRpbmcgYSByZXNwb25zZSwgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxyXG4gICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoZGlzdGFuY2VTcSk7XHJcblxyXG4gICAgICByZXNwb25zZS5hID0gYTtcclxuICAgICAgcmVzcG9uc2UuYiA9IGI7XHJcblxyXG4gICAgICByZXNwb25zZS5vdmVybGFwID0gdG90YWxSYWRpdXMgLSBkaXN0O1xyXG4gICAgICByZXNwb25zZS5vdmVybGFwTi5jb3B5KGRpZmZlcmVuY2VWLm5vcm1hbGl6ZSgpKTtcclxuICAgICAgcmVzcG9uc2Uub3ZlcmxhcFYuY29weShkaWZmZXJlbmNlVikuc2NhbGUocmVzcG9uc2Uub3ZlcmxhcCk7XHJcblxyXG4gICAgICByZXNwb25zZS5hSW5CID0gYS5yIDw9IGIuciAmJiBkaXN0IDw9IGIuciAtIGEucjtcclxuICAgICAgcmVzcG9uc2UuYkluQSA9IGIuciA8PSBhLnIgJiYgZGlzdCA8PSBhLnIgLSBiLnI7XHJcbiAgICB9XHJcblxyXG4gICAgVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgYSBwb2x5Z29uIGFuZCBhIGNpcmNsZSBjb2xsaWRlLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gcG9seWdvbiBUaGUgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gY2lyY2xlIFRoZSBjaXJjbGUuXHJcbiAgICogQHBhcmFtIHtSZXNwb25zZX0gW3Jlc3BvbnNlXSBBbiBvcHRpb25hbCByZXNwb25zZSBvYmplY3QgdGhhdCB3aWxsIGJlIHBvcHVsYXRlZCBpZiB0aGV5IGludGVyc2VjdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZXkgaW50ZXJzZWN0IG9yIGZhbHNlIG90aGVyd2lzZS5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIHRlc3RQb2x5Z29uQ2lyY2xlKHBvbHlnb246IFBvbHlnb24sIGNpcmNsZTogQ2lyY2xlLCByZXNwb25zZT86IFJlc3BvbnNlKTogYm9vbGVhbiB7XHJcbiAgICAvLyBHZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBjaXJjbGUgcmVsYXRpdmUgdG8gdGhlIHBvbHlnb24uXHJcbiAgICBjb25zdCBjaXJjbGVQb3MgPSBUX1ZFQ1RPUlMucG9wKCkhLmNvcHkoY2lyY2xlLnBvcykuYWRkKGNpcmNsZS5vZmZzZXQpLnN1Yihwb2x5Z29uLnBvcyk7XHJcblxyXG4gICAgY29uc3QgcmFkaXVzID0gY2lyY2xlLnI7XHJcbiAgICBjb25zdCByYWRpdXMyID0gcmFkaXVzICogcmFkaXVzO1xyXG5cclxuICAgIGNvbnN0IHBvaW50cyA9IHBvbHlnb24uY2FsY1BvaW50cztcclxuICAgIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgY29uc3QgZWRnZSA9IFRfVkVDVE9SUy5wb3AoKSE7XHJcbiAgICBjb25zdCBwb2ludCA9IFRfVkVDVE9SUy5wb3AoKSE7XHJcblxyXG4gICAgLy8gRm9yIGVhY2ggZWRnZSBpbiB0aGUgcG9seWdvbjpcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgY29uc3QgbmV4dCA9IGkgPT09IGxlbiAtIDEgPyAwIDogaSArIDE7XHJcbiAgICAgIGNvbnN0IHByZXYgPSBpID09PSAwID8gbGVuIC0gMSA6IGkgLSAxO1xyXG5cclxuICAgICAgbGV0IG92ZXJsYXAgPSAwO1xyXG4gICAgICBsZXQgb3ZlcmxhcE4gPSBudWxsO1xyXG5cclxuICAgICAgLy8gR2V0IHRoZSBlZGdlLlxyXG4gICAgICBlZGdlLmNvcHkocG9seWdvbi5lZGdlc1tpXSk7XHJcblxyXG4gICAgICAvLyBDYWxjdWxhdGUgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRvIHRoZSBzdGFydGluZyBwb2ludCBvZiB0aGUgZWRnZS5cclxuICAgICAgcG9pbnQuY29weShjaXJjbGVQb3MpLnN1Yihwb2ludHNbaV0pO1xyXG5cclxuICAgICAgLy8gSWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGFuZCB0aGUgcG9pbnQgaXMgYmlnZ2VyIHRoYW4gdGhlIHJhZGl1cywgdGhlIHBvbHlnb24gaXMgZGVmaW5pdGVseSBub3QgZnVsbHkgaW4gdGhlIGNpcmNsZS5cclxuICAgICAgaWYgKHJlc3BvbnNlICYmIHBvaW50LmxlbjIoKSA+IHJhZGl1czIpIHJlc3BvbnNlLmFJbkIgPSBmYWxzZTtcclxuXHJcbiAgICAgIC8vIENhbGN1bGF0ZSB3aGljaCBWb3Jvbm9pIHJlZ2lvbiB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgaXMgaW4uXHJcbiAgICAgIGxldCByZWdpb24gPSB2b3Jvbm9pUmVnaW9uKGVkZ2UsIHBvaW50KTtcclxuXHJcbiAgICAgIC8vIElmIGl0J3MgdGhlIGxlZnQgcmVnaW9uOlxyXG4gICAgICBpZiAocmVnaW9uID09PSBMRUZUX1ZPUk9OT0lfUkVHSU9OKSB7XHJcbiAgICAgICAgLy8gV2UgbmVlZCB0byBtYWtlIHN1cmUgd2UncmUgaW4gdGhlIFJJR0hUX1ZPUk9OT0lfUkVHSU9OIG9mIHRoZSBwcmV2aW91cyBlZGdlLlxyXG4gICAgICAgIGVkZ2UuY29weShwb2x5Z29uLmVkZ2VzW3ByZXZdKTtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIHByZXZpb3VzIGVkZ2VcclxuICAgICAgICBjb25zdCBwb2ludDIgPSBUX1ZFQ1RPUlMucG9wKCkhLmNvcHkoY2lyY2xlUG9zKS5zdWIocG9pbnRzW3ByZXZdKTtcclxuXHJcbiAgICAgICAgcmVnaW9uID0gdm9yb25vaVJlZ2lvbihlZGdlLCBwb2ludDIpO1xyXG5cclxuICAgICAgICBpZiAocmVnaW9uID09PSBSSUdIVF9WT1JPTk9JX1JFR0lPTikge1xyXG4gICAgICAgICAgLy8gSXQncyBpbiB0aGUgcmVnaW9uIHdlIHdhbnQuICBDaGVjayBpZiB0aGUgY2lyY2xlIGludGVyc2VjdHMgdGhlIHBvaW50LlxyXG4gICAgICAgICAgY29uc3QgZGlzdCA9IHBvaW50LmxlbigpO1xyXG5cclxuICAgICAgICAgIGlmIChkaXN0ID4gcmFkaXVzKSB7XHJcbiAgICAgICAgICAgIC8vIE5vIGludGVyc2VjdGlvblxyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpO1xyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChlZGdlKTtcclxuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQpO1xyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludDIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAvLyBJdCBpbnRlcnNlY3RzLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmJJbkEgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIG92ZXJsYXBOID0gcG9pbnQubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIG92ZXJsYXAgPSByYWRpdXMgLSBkaXN0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQyKTtcclxuXHJcbiAgICAgICAgLy8gSWYgaXQncyB0aGUgcmlnaHQgcmVnaW9uOlxyXG4gICAgICB9IGVsc2UgaWYgKHJlZ2lvbiA9PT0gUklHSFRfVk9ST05PSV9SRUdJT04pIHtcclxuICAgICAgICAvLyBXZSBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSdyZSBpbiB0aGUgbGVmdCByZWdpb24gb24gdGhlIG5leHQgZWRnZVxyXG4gICAgICAgIGVkZ2UuY29weShwb2x5Z29uLmVkZ2VzW25leHRdKTtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0byB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIG5leHQgZWRnZS5cclxuICAgICAgICBwb2ludC5jb3B5KGNpcmNsZVBvcykuc3ViKHBvaW50c1tuZXh0XSk7XHJcblxyXG4gICAgICAgIHJlZ2lvbiA9IHZvcm9ub2lSZWdpb24oZWRnZSwgcG9pbnQpO1xyXG5cclxuICAgICAgICBpZiAocmVnaW9uID09PSBMRUZUX1ZPUk9OT0lfUkVHSU9OKSB7XHJcbiAgICAgICAgICAvLyBJdCdzIGluIHRoZSByZWdpb24gd2Ugd2FudC4gIENoZWNrIGlmIHRoZSBjaXJjbGUgaW50ZXJzZWN0cyB0aGUgcG9pbnQuXHJcbiAgICAgICAgICBjb25zdCBkaXN0ID0gcG9pbnQubGVuKCk7XHJcblxyXG4gICAgICAgICAgaWYgKGRpc3QgPiByYWRpdXMpIHtcclxuICAgICAgICAgICAgLy8gTm8gaW50ZXJzZWN0aW9uXHJcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XHJcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGVkZ2UpO1xyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgICAgICAgICAgcmVzcG9uc2UuYkluQSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgb3ZlcmxhcE4gPSBwb2ludC5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE90aGVyd2lzZSwgaXQncyB0aGUgbWlkZGxlIHJlZ2lvbjpcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBOZWVkIHRvIGNoZWNrIGlmIHRoZSBjaXJjbGUgaXMgaW50ZXJzZWN0aW5nIHRoZSBlZGdlLCBjaGFuZ2UgdGhlIGVkZ2UgaW50byBpdHMgXCJlZGdlIG5vcm1hbFwiLlxyXG4gICAgICAgIGNvbnN0IG5vcm1hbCA9IGVkZ2UucGVycCgpLm5vcm1hbGl6ZSgpO1xyXG5cclxuICAgICAgICAvLyBGaW5kIHRoZSBwZXJwZW5kaWN1bGFyIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGFuZCB0aGUgZWRnZS5cclxuICAgICAgICBjb25zdCBkaXN0ID0gcG9pbnQuZG90KG5vcm1hbCk7XHJcbiAgICAgICAgY29uc3QgZGlzdEFicyA9IE1hdGguYWJzKGRpc3QpO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGUgY2lyY2xlIGlzIG9uIHRoZSBvdXRzaWRlIG9mIHRoZSBlZGdlLCB0aGVyZSBpcyBubyBpbnRlcnNlY3Rpb24uXHJcbiAgICAgICAgaWYgKGRpc3QgPiAwICYmIGRpc3RBYnMgPiByYWRpdXMpIHtcclxuICAgICAgICAgIC8vIE5vIGludGVyc2VjdGlvblxyXG4gICAgICAgICAgVF9WRUNUT1JTLnB1c2goY2lyY2xlUG9zKTtcclxuICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKG5vcm1hbCk7XHJcbiAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgICAgICAgIG92ZXJsYXBOID0gbm9ybWFsO1xyXG4gICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XHJcblxyXG4gICAgICAgICAgLy8gSWYgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGlzIG9uIHRoZSBvdXRzaWRlIG9mIHRoZSBlZGdlLCBvciBwYXJ0IG9mIHRoZSBjaXJjbGUgaXMgb24gdGhlIG91dHNpZGUsIHRoZSBjaXJjbGUgaXMgbm90IGZ1bGx5IGluc2lkZSB0aGUgcG9seWdvbi5cclxuICAgICAgICAgIGlmIChkaXN0ID49IDAgfHwgb3ZlcmxhcCA8IDIgKiByYWRpdXMpIHJlc3BvbnNlLmJJbkEgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIElmIHRoaXMgaXMgdGhlIHNtYWxsZXN0IG92ZXJsYXAgd2UndmUgc2Vlbiwga2VlcCBpdC5cclxuICAgICAgLy8gKG92ZXJsYXBOIG1heSBiZSBudWxsIGlmIHRoZSBjaXJjbGUgd2FzIGluIHRoZSB3cm9uZyBWb3Jvbm9pIHJlZ2lvbikuXHJcbiAgICAgIGlmIChvdmVybGFwTiAmJiByZXNwb25zZSAmJiBNYXRoLmFicyhvdmVybGFwKSA8IE1hdGguYWJzKHJlc3BvbnNlLm92ZXJsYXApKSB7XHJcbiAgICAgICAgcmVzcG9uc2Uub3ZlcmxhcCA9IG92ZXJsYXA7XHJcbiAgICAgICAgcmVzcG9uc2Uub3ZlcmxhcE4uY29weShvdmVybGFwTik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgdGhlIGZpbmFsIG92ZXJsYXAgdmVjdG9yIC0gYmFzZWQgb24gdGhlIHNtYWxsZXN0IG92ZXJsYXAuXHJcbiAgICBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgcmVzcG9uc2UuYSA9IHBvbHlnb247XHJcbiAgICAgIHJlc3BvbnNlLmIgPSBjaXJjbGU7XHJcblxyXG4gICAgICByZXNwb25zZS5vdmVybGFwVi5jb3B5KHJlc3BvbnNlLm92ZXJsYXBOKS5zY2FsZShyZXNwb25zZS5vdmVybGFwKTtcclxuICAgIH1cclxuXHJcbiAgICBUX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpO1xyXG4gICAgVF9WRUNUT1JTLnB1c2goZWRnZSk7XHJcbiAgICBUX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBhIGNpcmNsZSBhbmQgYSBwb2x5Z29uIGNvbGxpZGUuXHJcbiAgICogXHJcbiAgICogKipOT1RFOioqIFRoaXMgaXMgc2xpZ2h0bHkgbGVzcyBlZmZpY2llbnQgdGhhbiBwb2x5Z29uQ2lyY2xlIGFzIGl0IGp1c3QgcnVucyBwb2x5Z29uQ2lyY2xlIGFuZCByZXZlcnNlcyBldmVyeXRoaW5nXHJcbiAgICogYXQgdGhlIGVuZC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gY2lyY2xlIFRoZSBjaXJjbGUuXHJcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBwb2x5Z29uIFRoZSBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7UmVzcG9uc2V9IFtyZXNwb25zZV0gQW4gb3B0aW9uYWwgcmVzcG9uc2Ugb2JqZWN0IHRoYXQgd2lsbCBiZSBwb3B1bGF0ZWQgaWYgdGhleSBpbnRlcnNlY3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGV5IGludGVyc2VjdCBvciBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyB0ZXN0Q2lyY2xlUG9seWdvbihjaXJjbGU6IENpcmNsZSwgcG9seWdvbjogUG9seWdvbiwgcmVzcG9uc2U/OiBSZXNwb25zZSk6IGJvb2xlYW4ge1xyXG4gICAgLy8gVGVzdCB0aGUgcG9seWdvbiBhZ2FpbnN0IHRoZSBjaXJjbGUuXHJcbiAgICBjb25zdCByZXN1bHQgPSBTQVQudGVzdFBvbHlnb25DaXJjbGUocG9seWdvbiwgY2lyY2xlLCByZXNwb25zZSk7XHJcblxyXG4gICAgaWYgKHJlc3VsdCAmJiByZXNwb25zZSkge1xyXG4gICAgICAvLyBTd2FwIEEgYW5kIEIgaW4gdGhlIHJlc3BvbnNlLlxyXG4gICAgICBjb25zdCBhID0gcmVzcG9uc2UuYTtcclxuICAgICAgY29uc3QgYUluQiA9IHJlc3BvbnNlLmFJbkI7XHJcblxyXG4gICAgICByZXNwb25zZS5vdmVybGFwTi5yZXZlcnNlKCk7XHJcbiAgICAgIHJlc3BvbnNlLm92ZXJsYXBWLnJldmVyc2UoKTtcclxuXHJcbiAgICAgIHJlc3BvbnNlLmEgPSByZXNwb25zZS5iO1xyXG4gICAgICByZXNwb25zZS5iID0gYTtcclxuXHJcbiAgICAgIHJlc3BvbnNlLmFJbkIgPSByZXNwb25zZS5iSW5BO1xyXG4gICAgICByZXNwb25zZS5iSW5BID0gYUluQjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIHdoZXRoZXIgcG9seWdvbnMgY29sbGlkZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1BvbHlnb259IGEgVGhlIGZpcnN0IHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBiIFRoZSBzZWNvbmQgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSBbcmVzcG9uc2VdIEFuIG9wdGlvbmFsIHJlc3BvbnNlIG9iamVjdCB0aGF0IHdpbGwgYmUgcG9wdWxhdGVkIGlmIHRoZXkgaW50ZXJzZWN0LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhleSBpbnRlcnNlY3Qgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgdGVzdFBvbHlnb25Qb2x5Z29uKGE6IFBvbHlnb24sIGI6IFBvbHlnb24sIHJlc3BvbnNlPzogUmVzcG9uc2UpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IGFQb2ludHMgPSBhLmNhbGNQb2ludHM7XHJcbiAgICBjb25zdCBhTGVuID0gYVBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgY29uc3QgYlBvaW50cyA9IGIuY2FsY1BvaW50cztcclxuICAgIGNvbnN0IGJMZW4gPSBiUG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICAvLyBJZiBhbnkgb2YgdGhlIGVkZ2Ugbm9ybWFscyBvZiBBIGlzIGEgc2VwYXJhdGluZyBheGlzLCBubyBpbnRlcnNlY3Rpb24uXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFMZW47IGkrKykge1xyXG4gICAgICBpZiAoU0FULmlzU2VwYXJhdGluZ0F4aXMoYS5wb3MsIGIucG9zLCBhUG9pbnRzLCBiUG9pbnRzLCBhLm5vcm1hbHNbaV0sIHJlc3BvbnNlKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIGFueSBvZiB0aGUgZWRnZSBub3JtYWxzIG9mIEIgaXMgYSBzZXBhcmF0aW5nIGF4aXMsIG5vIGludGVyc2VjdGlvbi5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYkxlbjsgaSsrKSB7XHJcbiAgICAgIGlmIChTQVQuaXNTZXBhcmF0aW5nQXhpcyhhLnBvcywgYi5wb3MsIGFQb2ludHMsIGJQb2ludHMsIGIubm9ybWFsc1tpXSwgcmVzcG9uc2UpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2luY2Ugbm9uZSBvZiB0aGUgZWRnZSBub3JtYWxzIG9mIEEgb3IgQiBhcmUgYSBzZXBhcmF0aW5nIGF4aXMsIHRoZXJlIGlzIGFuIGludGVyc2VjdGlvblxyXG4gICAgLy8gYW5kIHdlJ3ZlIGFscmVhZHkgY2FsY3VsYXRlZCB0aGUgc21hbGxlc3Qgb3ZlcmxhcCAoaW4gaXNTZXBhcmF0aW5nQXhpcykuIFxyXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBmaW5hbCBvdmVybGFwIHZlY3Rvci5cclxuICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICByZXNwb25zZS5hID0gYTtcclxuICAgICAgcmVzcG9uc2UuYiA9IGI7XHJcblxyXG4gICAgICByZXNwb25zZS5vdmVybGFwVi5jb3B5KHJlc3BvbnNlLm92ZXJsYXBOKS5zY2FsZShyZXNwb25zZS5vdmVybGFwKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn0iLCIvKipcclxuICogIyMgVmVjdG9yXHJcbiAqIFxyXG4gKiBSZXByZXNlbnRzIGEgdmVjdG9yIGluIHR3byBkaW1lbnNpb25zIHdpdGggYHhgIGFuZCBgeWAgcHJvcGVydGllcy5cclxuICogXHJcbiAqIENyZWF0ZSBhIG5ldyBWZWN0b3IsIG9wdGlvbmFsbHkgcGFzc2luZyBpbiB0aGUgYHhgIGFuZCBgeWAgY29vcmRpbmF0ZXMuIElmIGEgY29vcmRpbmF0ZSBpcyBub3Qgc3BlY2lmaWVkLCBcclxuICogaXQgd2lsbCBiZSBzZXQgdG8gYDBgLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yIHtcclxuICBwdWJsaWMgeDogbnVtYmVyO1xyXG4gIHB1YmxpYyB5OiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeD0wXSBUaGUgeCBjb29yZGluYXRlIG9mIHRoaXMgVmVjdG9yLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeT0wXSBUaGUgeSBjb29yZGluYXRlIG9mIHRoaXMgVmVjdG9yLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCkge1xyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb3B5IHRoZSB2YWx1ZXMgb2YgYW5vdGhlciBWZWN0b3IgaW50byB0aGlzIG9uZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIG90aGVyIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb3B5KG90aGVyOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54ID0gb3RoZXIueDtcclxuICAgIHRoaXMueSA9IG90aGVyLnk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBuZXcgVmVjdG9yIHdpdGggdGhlIHNhbWUgY29vcmRpbmF0ZXMgYXMgdGhlIG9uZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBUaGUgbmV3IGNsb25lZCBWZWN0b3IuXHJcbiAgICovXHJcbiAgcHVibGljIGNsb25lKCk6IFZlY3RvciB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLngsIHRoaXMueSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGFuZ2UgdGhpcyBWZWN0b3IgdG8gYmUgcGVycGVuZGljdWxhciB0byB3aGF0IGl0IHdhcyBiZWZvcmUuXHJcbiAgICogXHJcbiAgICogRWZmZWN0aXZlbHkgdGhpcyByb3RhdGVzIGl0IDkwIGRlZ3JlZXMgaW4gYSBjbG9ja3dpc2UgZGlyZWN0aW9uLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHBlcnAoKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IHggPSB0aGlzLng7XHJcblxyXG4gICAgdGhpcy54ID0gdGhpcy55O1xyXG4gICAgdGhpcy55ID0gLXg7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSb3RhdGUgdGhpcyBWZWN0b3IgKGNvdW50ZXItY2xvY2t3aXNlKSBieSB0aGUgc3BlY2lmaWVkIGFuZ2xlIChpbiByYWRpYW5zKS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgVGhlIGFuZ2xlIHRvIHJvdGF0ZSAoaW4gcmFkaWFucykuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcm90YXRlKGFuZ2xlOiBudW1iZXIpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgeCA9IHRoaXMueDtcclxuICAgIGNvbnN0IHkgPSB0aGlzLnk7XHJcblxyXG4gICAgdGhpcy54ID0geCAqIE1hdGguY29zKGFuZ2xlKSAtIHkgKiBNYXRoLnNpbihhbmdsZSk7XHJcbiAgICB0aGlzLnkgPSB4ICogTWF0aC5zaW4oYW5nbGUpICsgeSAqIE1hdGguY29zKGFuZ2xlKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldmVyc2UgdGhpcyBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcmV2ZXJzZSgpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54ID0gLXRoaXMueDtcclxuICAgIHRoaXMueSA9IC10aGlzLnk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBOb3JtYWxpemUgdGhpcyB2ZWN0b3IgKG1ha2UgaXQgaGF2ZSBhIGxlbmd0aCBvZiBgMWApLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIG5vcm1hbGl6ZSgpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgZCA9IHRoaXMubGVuKCk7XHJcblxyXG4gICAgaWYgKGQgPiAwKSB7XHJcbiAgICAgIHRoaXMueCA9IHRoaXMueCAvIGQ7XHJcbiAgICAgIHRoaXMueSA9IHRoaXMueSAvIGQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYW5vdGhlciBWZWN0b3IgdG8gdGhpcyBvbmUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBvdGhlciBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgYWRkKG90aGVyOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54ICs9IG90aGVyLng7XHJcbiAgICB0aGlzLnkgKz0gb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnRyYWN0IGFub3RoZXIgVmVjdG9yIGZyb20gdGhpcyBvbmUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBvdGhlciBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgc3ViKG90aGVyOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54IC09IG90aGVyLng7XHJcbiAgICB0aGlzLnkgLT0gb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNjYWxlIHRoaXMgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEFuIGluZGVwZW5kZW50IHNjYWxpbmcgZmFjdG9yIGNhbiBiZSBwcm92aWRlZCBmb3IgZWFjaCBheGlzLCBvciBhIHNpbmdsZSBzY2FsaW5nIGZhY3RvciB3aWxsIHNjYWxlXHJcbiAgICogYm90aCBgeGAgYW5kIGB5YC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0geCBUaGUgc2NhbGluZyBmYWN0b3IgaW4gdGhlIHggZGlyZWN0aW9uLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeV0gVGhlIHNjYWxpbmcgZmFjdG9yIGluIHRoZSB5IGRpcmVjdGlvbi5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzY2FsZSh4OiBudW1iZXIsIHk/OiBudW1iZXIpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy54ICo9IHg7XHJcbiAgICB0aGlzLnkgKj0gdHlwZW9mIHkgIT0gJ3VuZGVmaW5lZCcgPyB5IDogeDtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb2plY3QgdGhpcyBWZWN0b3Igb250byBhbm90aGVyIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIFZlY3RvciB0byBwcm9qZWN0IG9udG8uXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcHJvamVjdChvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IGFtdCA9IHRoaXMuZG90KG90aGVyKSAvIG90aGVyLmxlbjIoKTtcclxuXHJcbiAgICB0aGlzLnggPSBhbXQgKiBvdGhlci54O1xyXG4gICAgdGhpcy55ID0gYW10ICogb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb2plY3QgdGhpcyBWZWN0b3Igb250byBhIFZlY3RvciBvZiB1bml0IGxlbmd0aC5cclxuICAgKiBcclxuICAgKiBUaGlzIGlzIHNsaWdodGx5IG1vcmUgZWZmaWNpZW50IHRoYW4gYHByb2plY3RgIHdoZW4gZGVhbGluZyB3aXRoIHVuaXQgdmVjdG9ycy5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIHVuaXQgdmVjdG9yIHRvIHByb2plY3Qgb250by5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBwcm9qZWN0TihvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IGFtdCA9IHRoaXMuZG90KG90aGVyKTtcclxuXHJcbiAgICB0aGlzLnggPSBhbXQgKiBvdGhlci54O1xyXG4gICAgdGhpcy55ID0gYW10ICogb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZmxlY3QgdGhpcyBWZWN0b3Igb24gYW4gYXJiaXRyYXJ5IGF4aXMuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGF4aXMgVGhlIFZlY3RvciByZXByZXNlbnRpbmcgdGhlIGF4aXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcmVmbGVjdChheGlzOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgeCA9IHRoaXMueDtcclxuICAgIGNvbnN0IHkgPSB0aGlzLnk7XHJcblxyXG4gICAgdGhpcy5wcm9qZWN0KGF4aXMpLnNjYWxlKDIpO1xyXG5cclxuICAgIHRoaXMueCAtPSB4O1xyXG4gICAgdGhpcy55IC09IHk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWZsZWN0IHRoaXMgVmVjdG9yIG9uIGFuIGFyYml0cmFyeSBheGlzLlxyXG4gICAqIFxyXG4gICAqIFRoaXMgaXMgc2xpZ2h0bHkgbW9yZSBlZmZpY2llbnQgdGhhbiBgcmVmbGVjdGAgd2hlbiBkZWFsaW5nIHdpdGggYW4gYXhpcyB0aGF0IGlzIGEgdW5pdCB2ZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGF4aXMgVGhlIFZlY3RvciByZXByZXNlbnRpbmcgdGhlIGF4aXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcmVmbGVjdE4oYXhpczogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IHggPSB0aGlzLng7XHJcbiAgICBjb25zdCB5ID0gdGhpcy55O1xyXG5cclxuICAgIHRoaXMucHJvamVjdE4oYXhpcykuc2NhbGUoMik7XHJcblxyXG4gICAgdGhpcy54IC09IHg7XHJcbiAgICB0aGlzLnkgLT0geTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZG90IHByb2R1Y3Qgb2YgdGhpcyBWZWN0b3IgYW5kIGFub3RoZXIuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBWZWN0b3IgdG8gZG90IHRoaXMgb25lIGFnYWluc3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBkb3QgcHJvZHVjdC5cclxuICAgKi9cclxuICBwdWJsaWMgZG90KG90aGVyOiBWZWN0b3IpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMueCAqIG90aGVyLnggKyB0aGlzLnkgKiBvdGhlci55O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGlzIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHNxdWFyZWQgbGVuZ3RoLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBsZW4yKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5kb3QodGhpcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGxlbmd0aCBvZiB0aGlzIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIGxlbmd0aC5cclxuICAgKi9cclxuICBwdWJsaWMgbGVuKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuMigpKTtcclxuICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgSW1hZ2VMaXN0IHtcclxuICAgIHByaXZhdGUgc3RhdGljIElNQUdFUzogSFRNTEltYWdlRWxlbWVudFtdIHwgdW5kZWZpbmVkID0gW107XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWdpc3RlcihzcmM6IHN0cmluZyk6IEhUTUxJbWFnZUVsZW1lbnQge1xyXG4gICAgICAgIGxldCBpbWc6IEhUTUxJbWFnZUVsZW1lbnQgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWcuc3JjID0gc3JjO1xyXG4gICAgICAgIEltYWdlTGlzdC5JTUFHRVMhLnB1c2goaW1nKTtcclxuICAgICAgICByZXR1cm4gaW1nO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgVElMRU1BUF9NQVNURVI6IEhUTUxJbWFnZUVsZW1lbnQgPSBJbWFnZUxpc3QucmVnaXN0ZXIoXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy90aWxlTWFzdGVyLnBuZ1wiKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgU1BJS0U6IEhUTUxJbWFnZUVsZW1lbnQgPSBJbWFnZUxpc3QucmVnaXN0ZXIoXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy9zcHJTcGlrZS5wbmdcIik7XHJcbiAgICBwdWJsaWMgc3RhdGljIEJST0NDT0xJOiBIVE1MSW1hZ2VFbGVtZW50ID0gSW1hZ2VMaXN0LnJlZ2lzdGVyKFwiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvYmdCcm9jY29saS5wbmdcIik7XHJcbiAgICBwdWJsaWMgc3RhdGljIEtVTU9fUExBVEZPUk06IEhUTUxJbWFnZUVsZW1lbnQgPSBJbWFnZUxpc3QucmVnaXN0ZXIoXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy9zcHJLdW1vUGxhdGZvcm0ucG5nXCIpO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgUExBWUVSOiBIVE1MSW1hZ2VFbGVtZW50ID0gSW1hZ2VMaXN0LnJlZ2lzdGVyKFwiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvcGxheWVyL3NwclBsYXllci5wbmdcIik7XHJcbiAgICBwdWJsaWMgc3RhdGljIEdPUkU6IEhUTUxJbWFnZUVsZW1lbnQgPSBJbWFnZUxpc3QucmVnaXN0ZXIoXCJhc3NldHMvdGV4dHVyZXMvb2JqZWN0cy9wbGF5ZXIvc3ByR29yZS5wbmdcIik7XHJcbiAgICBwdWJsaWMgc3RhdGljIEJVTExFVDogSFRNTEltYWdlRWxlbWVudCA9IEltYWdlTGlzdC5yZWdpc3RlcihcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3BsYXllci9zcHJCdWxsZXQucG5nXCIpO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgR0FNRU9WRVI6IEhUTUxJbWFnZUVsZW1lbnQgPSBJbWFnZUxpc3QucmVnaXN0ZXIoXCJhc3NldHMvdGV4dHVyZXMvdWkvc3ByR2FtZU92ZXIucG5nXCIpO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3ByaXRlIHtcclxuICAgIHB1YmxpYyBzb3VyY2U6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgeDogbnVtYmVyO1xyXG4gICAgcHVibGljIHk6IG51bWJlcjtcclxuICAgIHB1YmxpYyB3OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNvdXJjZTogSFRNTEltYWdlRWxlbWVudCwgeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCwgdzogbnVtYmVyLCBoOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy53ID0gdztcclxuICAgICAgICB0aGlzLmggPSBoO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgbmFtZXNwYWNlIFNwcml0ZXMge1xyXG4gICAgZXhwb3J0IGNvbnN0IFJlZEJsb2NrOiBTcHJpdGUgPSBuZXcgU3ByaXRlKEltYWdlTGlzdC5USUxFTUFQX01BU1RFUiwgMzIsIDMyLCAzMiwgMzIpO1xyXG4gICAgZXhwb3J0IGNvbnN0IEdyYXNzUmVkQmxvY2s6IFNwcml0ZSA9IG5ldyBTcHJpdGUoSW1hZ2VMaXN0LlRJTEVNQVBfTUFTVEVSLCAwLCAzMiwgMzIsIDMyKTtcclxuICAgIGV4cG9ydCBjb25zdCBTaW1wbGVWQmVhbTogU3ByaXRlID0gbmV3IFNwcml0ZShJbWFnZUxpc3QuVElMRU1BUF9NQVNURVIsIDMyLCA2NCwgMzIsIDMyKTtcclxuICAgIGV4cG9ydCBjb25zdCBTaW1wbGVIQmVhbTogU3ByaXRlID0gbmV3IFNwcml0ZShJbWFnZUxpc3QuVElMRU1BUF9NQVNURVIsIDAsIDk2LCAzMiwgMzIpO1xyXG4gICAgZXhwb3J0IGNvbnN0IFNpbXBsZUJsb2NrOiBTcHJpdGUgPSBuZXcgU3ByaXRlKEltYWdlTGlzdC5USUxFTUFQX01BU1RFUiwgMzIsIDk2LCAzMiwgMzIpO1xyXG5cclxuICAgIGV4cG9ydCBjb25zdCBCcm9jY29saTogU3ByaXRlID0gbmV3IFNwcml0ZShJbWFnZUxpc3QuQlJPQ0NPTEksIDAsIDAsIDExMSwgMTc1KTtcclxuICAgIGV4cG9ydCBjb25zdCBLcmFpZGdpZWZCcm9jY29saTogU3ByaXRlID0gbmV3IFNwcml0ZShJbWFnZUxpc3QuQlJPQ0NPTEksIDExMiwgMCwgMTExLCAxNzUpO1xyXG4gICAgZXhwb3J0IGNvbnN0IEJpZ0Jyb2Njb2xpOiBTcHJpdGUgPSBuZXcgU3ByaXRlKEltYWdlTGlzdC5CUk9DQ09MSSwgMCwgMTc1LCAyMTMsIDMzMSk7XHJcbiAgICBcclxuICAgIGV4cG9ydCBjb25zdCBTcGlrZVVwOiBTcHJpdGUgPSBuZXcgU3ByaXRlKEltYWdlTGlzdC5TUElLRSwgMCwgMCwgMzIsIDMyKTtcclxuICAgIGV4cG9ydCBjb25zdCBTcGlrZVJpZ2h0OiBTcHJpdGUgPSBuZXcgU3ByaXRlKEltYWdlTGlzdC5TUElLRSwgMzIsIDAsIDMyLCAzMik7XHJcbiAgICBleHBvcnQgY29uc3QgU3Bpa2VEb3duOiBTcHJpdGUgPSBuZXcgU3ByaXRlKEltYWdlTGlzdC5TUElLRSwgNjQsIDAsIDMyLCAzMik7XHJcbiAgICBleHBvcnQgY29uc3QgU3Bpa2VMZWZ0OiBTcHJpdGUgPSBuZXcgU3ByaXRlKEltYWdlTGlzdC5TUElLRSwgOTYsIDAsIDMyLCAzMik7XHJcblxyXG4gICAgZXhwb3J0IGNvbnN0IENsb3VkOiBTcHJpdGVbXSA9IFtuZXcgU3ByaXRlKEltYWdlTGlzdC5LVU1PX1BMQVRGT1JNLCAwLCAwLCAxMTIsIDMyKSwgbmV3IFNwcml0ZShJbWFnZUxpc3QuS1VNT19QTEFURk9STSwgMTEyLCAwLCAxMTIsIDMyKV07XHJcbiAgICBcclxuICAgIGV4cG9ydCBjb25zdCBEZWF0aE1lc3NhZ2U6IFNwcml0ZSA9IG5ldyBTcHJpdGUoSW1hZ2VMaXN0LkdBTUVPVkVSLCAwLCAwLCA4MDAsIDE4OCk7XHJcbn0iLCJpbXBvcnQgQmFzaWNPYmplY3QgZnJvbSAnLi4vb2JqZWN0cy9CYXNpY09iamVjdCc7XHJcbmltcG9ydCBHYW1lIGZyb20gJy4uL0dhbWUnO1xyXG5pbXBvcnQgeyBJRGlzcG9zYWJsZSwgSW5zdGFuY2VGYWJyaWMgfSBmcm9tICcuLi91dGlscy9JbnRlcmZhY2VzJztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi9TQVQvVmVjdG9yJztcclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzaWNMZXZlbCBpbXBsZW1lbnRzIElEaXNwb3NhYmxlLCBJbnN0YW5jZUZhYnJpYzxCYXNpY0xldmVsPiB7XHJcbiAgICBwdWJsaWMgb2JqZWN0czogQXJyYXk8QmFzaWNPYmplY3Q+ID0gW107XHJcbiAgICBwcm90ZWN0ZWQgcmVtb3ZlUXVldWU6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RzW2ldLnVwZGF0ZShkZWx0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aGlsZSh0aGlzLnJlbW92ZVF1ZXVlLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG8gPSAwOyBvIDwgdGhpcy5vYmplY3RzLmxlbmd0aDsgbysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vYmplY3RzW29dLmlkID09IHRoaXMucmVtb3ZlUXVldWVbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHNbb10uZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0cy5zcGxpY2UobywgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVRdWV1ZS5zcGxpY2UoMCwgMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZW5kZXJpbmdcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLm9iamVjdHNbaV0uZHJhdyhjdHgsIGRlbHRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEdhbWUuREVCVUcpIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3Q29sbGlzaW9uTGluZXMoY3R4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZU9iamVjdChpZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVRdWV1ZS5wdXNoKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNSZW1vdmVkKGlkOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVRdWV1ZS5pbmRleE9mKGlkKSAhPT0gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGRyYXdDb2xsaXNpb25MaW5lcyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xyXG4gICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgcG9pbnRzOiBWZWN0b3JbXSA9IHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvaW50cztcclxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjdHgubW92ZVRvKHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54ICsgcG9pbnRzWzBdLngsIHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy55ICsgcG9pbnRzWzBdLnkpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBwID0gMTsgcCA8IHBvaW50cy5sZW5ndGg7IHArKykge1xyXG4gICAgICAgICAgICAgICAgY3R4LmxpbmVUbyh0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCArIHBvaW50c1twXS54LCB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueSArIHBvaW50c1twXS55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdHgubGluZVRvKHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54ICsgcG9pbnRzWzBdLngsIHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy55ICsgcG9pbnRzWzBdLnkpO1xyXG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcclxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5vYmplY3RzW2ldLmNvbGxpc2lvbiA/ICcjZmYwMDAwJyA6ICcjMDAwMGZmJztcclxuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHdoaWxlKHRoaXMub2JqZWN0cy5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm9iamVjdHNbMF0uZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm9iamVjdHMuc3BsaWNlKDAsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgaW5zdGFudGlhdGUoKTogQmFzaWNMZXZlbDtcclxufSIsImltcG9ydCBBdWRpb01hbmFnZXIgZnJvbSBcIi4uL0F1ZGlvTWFuYWdlclwiO1xyXG5pbXBvcnQgRmFrZVBsYXllck9iamVjdCBmcm9tIFwiLi4vb2JqZWN0cy9wbGF5ZXIvRmFrZVBsYXllck9iamVjdFwiO1xyXG5pbXBvcnQgeyBTcHJpdGVPYmplY3QsIEFuaW1hdGVkU3ByaXRlT2JqZWN0IH0gZnJvbSBcIi4uL29iamVjdHMvU3ByaXRlT2JqZWN0XCI7XHJcbmltcG9ydCBUaWxlT2JqZWN0IGZyb20gXCIuLi9vYmplY3RzL1RpbGVPYmplY3RcIjtcclxuaW1wb3J0IHsgU3ByaXRlcyB9IGZyb20gXCIuLi9TcHJpdGVNYW5hZ2VyXCI7XHJcbmltcG9ydCBCYXNpY0xldmVsIGZyb20gXCIuL0Jhc2ljTGV2ZWxcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNhdmVTZWxlY3RNZW51IGV4dGVuZHMgQmFzaWNMZXZlbCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHNjcm9sbFZlbDogbnVtYmVyID0gNzU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBBdWRpb01hbmFnZXIucGxheU11c2ljKFwiYXNzZXRzL211c2ljL3NhdmVzZWxlY3Qub2dnXCIpO1xyXG5cclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgVGlsZU9iamVjdChcImdyYXNzXCIsIDAsIDE3LCAyNiwgMSwgW1Nwcml0ZXMuR3Jhc3NSZWRCbG9ja10pKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgVGlsZU9iamVjdChcImdyb3VuZFwiLCAwLCAxOCwgMjYsIDEsIFtTcHJpdGVzLlJlZEJsb2NrXSkpO1xyXG5cclxuICAgICAgICAvLyBUcmVlc1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvYmo6IFNwcml0ZU9iamVjdCA9IG5ldyBTcHJpdGVPYmplY3QoXCJ0cmVlXCIgKyBpLCAoTWF0aC5yYW5kb20oKSAqIDgwMCkgfCAwLCAzNjksIDExMSwgMTc1LCBTcHJpdGVzLkJyb2Njb2xpKTtcclxuICAgICAgICAgICAgb2JqLmNvbGxpc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm9iamVjdHMucHVzaChvYmopO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2xvdWRzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG9iajogQW5pbWF0ZWRTcHJpdGVPYmplY3QgPSBuZXcgQW5pbWF0ZWRTcHJpdGVPYmplY3QoXCJjbG91ZFwiICsgaSwgKE1hdGgucmFuZG9tKCkgKiA4MDApIHwgMCwgKDk2ICsgTWF0aC5yYW5kb20oKSAqIDIxMCkgfCAwLCAxMTIsIDMyLCBTcHJpdGVzLkNsb3VkLCAwLjUpO1xyXG4gICAgICAgICAgICBvYmouY29sbGlzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG9iaik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVSVxyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwidG9wMFwiLCAwLCAwLCAxLCAzLCBbU3ByaXRlcy5TaW1wbGVCbG9jaywgU3ByaXRlcy5TaW1wbGVWQmVhbV0sIFswLCAxLCAwXSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwidG9wMVwiLCAyNCwgMCwgMSwgMywgW1Nwcml0ZXMuU2ltcGxlQmxvY2ssIFNwcml0ZXMuU2ltcGxlVkJlYW1dLCBbMCwgMSwgMF0pKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgU3ByaXRlT2JqZWN0KFwidG9wMlwiLCAzMiwgMCwgNzM2LCAzMiwgU3ByaXRlcy5TaW1wbGVIQmVhbSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBTcHJpdGVPYmplY3QoXCJ0b3AyXCIsIDMyLCA2NCwgNzM2LCAzMiwgU3ByaXRlcy5TaW1wbGVIQmVhbSkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwic2F2ZTBfMFwiLCAxLCA0LCA2LCAxLCBbU3ByaXRlcy5TaW1wbGVCbG9jaywgU3ByaXRlcy5TaW1wbGVIQmVhbV0sIFswLCAxLCAxLCAxLCAxLCAwXSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwic2F2ZTBfMVwiLCAxLCAxNCwgNiwgMSwgW1Nwcml0ZXMuU2ltcGxlQmxvY2ssIFNwcml0ZXMuU2ltcGxlSEJlYW1dLCBbMCwgMSwgMSwgMSwgMSwgMF0pKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgU3ByaXRlT2JqZWN0KFwic2F2ZTBfMlwiLCAzMiwgMTYwLCAzMiwgMjg4LCBTcHJpdGVzLlNpbXBsZVZCZWFtKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFNwcml0ZU9iamVjdChcInNhdmUwXzNcIiwgMTkyLCAxNjAsIDMyLCAyODgsIFNwcml0ZXMuU2ltcGxlVkJlYW0pKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgVGlsZU9iamVjdChcInNhdmUxXzBcIiwgOSwgNCwgNiwgMSwgW1Nwcml0ZXMuU2ltcGxlQmxvY2ssIFNwcml0ZXMuU2ltcGxlSEJlYW1dLCBbMCwgMSwgMSwgMSwgMSwgMF0pKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgVGlsZU9iamVjdChcInNhdmUxXzFcIiwgOSwgMTQsIDYsIDEsIFtTcHJpdGVzLlNpbXBsZUJsb2NrLCBTcHJpdGVzLlNpbXBsZUhCZWFtXSwgWzAsIDEsIDEsIDEsIDEsIDBdKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFNwcml0ZU9iamVjdChcInNhdmUxXzJcIiwgMjg4LCAxNjAsIDMyLCAyODgsIFNwcml0ZXMuU2ltcGxlVkJlYW0pKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgU3ByaXRlT2JqZWN0KFwic2F2ZTFfM1wiLCA0NDgsIDE2MCwgMzIsIDI4OCwgU3ByaXRlcy5TaW1wbGVWQmVhbSkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwic2F2ZTJfMFwiLCAxNywgNCwgNiwgMSwgW1Nwcml0ZXMuU2ltcGxlQmxvY2ssIFNwcml0ZXMuU2ltcGxlSEJlYW1dLCBbMCwgMSwgMSwgMSwgMSwgMF0pKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgVGlsZU9iamVjdChcInNhdmUyXzFcIiwgMTcsIDE0LCA2LCAxLCBbU3ByaXRlcy5TaW1wbGVCbG9jaywgU3ByaXRlcy5TaW1wbGVIQmVhbV0sIFswLCAxLCAxLCAxLCAxLCAwXSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBTcHJpdGVPYmplY3QoXCJzYXZlMl8yXCIsIDU0NCwgMTYwLCAzMiwgMjg4LCBTcHJpdGVzLlNpbXBsZVZCZWFtKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFNwcml0ZU9iamVjdChcInNhdmUyXzNcIiwgNzA0LCAxNjAsIDMyLCAyODgsIFNwcml0ZXMuU2ltcGxlVkJlYW0pKTtcclxuXHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IEZha2VQbGF5ZXJPYmplY3QoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54IC09IFNhdmVTZWxlY3RNZW51LnNjcm9sbFZlbCAqIGRlbHRhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggPCAtNjQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCA9IDA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54IDwgLTMyKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggKz0gMzI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAyOyBpIDwgOTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54IC09IFNhdmVTZWxlY3RNZW51LnNjcm9sbFZlbCAqIGRlbHRhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggPCAtMTExKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggPSAoODUwICsgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMTAwKSB8IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSA5OyBpIDwgMTU7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCAtPSBTYXZlU2VsZWN0TWVudS5zY3JvbGxWZWwgKiBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54IDwgLTExMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggPSAoODUwICsgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMTAwKSB8IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueSA9ICg5NiArIE1hdGgucmFuZG9tKCkgKiAyMTApIHwgMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI0M0RDdGN1wiO1xyXG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCA4MDAsIDYwOCk7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzg4MzkxRVwiO1xyXG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCA1NDQsIDgwMCwgNjQpO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiMwMDAwMDBcIjtcclxuICAgICAgICBzdXBlci51cGRhdGUoY3R4LCBkZWx0YSk7XHJcbiAgICAgICAgdGhpcy5kcmF3VUkoY3R4LCBkZWx0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXdVSShjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiMwMDAwMDBcIjtcclxuICAgICAgICBjdHguZmlsbFJlY3QoMzIsIDMyLCA3MzYsIDMyKTsgICAgICAvLyB0b3BcclxuICAgICAgICBjdHguZmlsbFJlY3QoNjQsIDE2MCwgMTI4LCAyODgpOyAgICAvLyBzYXZlMFxyXG4gICAgICAgIGN0eC5maWxsUmVjdCgzMjAsIDE2MCwgMTI4LCAyODgpOyAgIC8vIHNhdmUxXHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KDU3NiwgMTYwLCAxMjgsIDI4OCk7ICAgLy8gc2F2ZTJcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5zdGFudGlhdGUoKTogQmFzaWNMZXZlbCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTYXZlU2VsZWN0TWVudSgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJhc2ljTGV2ZWwgZnJvbSAnLi9CYXNpY0xldmVsJztcclxuaW1wb3J0IFBsYXllck9iamVjdCBmcm9tICcuLi9vYmplY3RzL3BsYXllci9QbGF5ZXJPYmplY3QnO1xyXG5pbXBvcnQgU3Bpa2VPYmplY3QgZnJvbSAnLi4vb2JqZWN0cy9TcGlrZU9iamVjdCc7XHJcbmltcG9ydCBBdWRpb01hbmFnZXIgZnJvbSAnLi4vQXVkaW9NYW5hZ2VyJztcclxuaW1wb3J0IFRpbGVPYmplY3QgZnJvbSAnLi4vb2JqZWN0cy9UaWxlT2JqZWN0JztcclxuaW1wb3J0IHsgU3ByaXRlcyB9IGZyb20gJy4uL1Nwcml0ZU1hbmFnZXInO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0TGV2ZWwgZXh0ZW5kcyBCYXNpY0xldmVsIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgQXVkaW9NYW5hZ2VyLnBsYXlNdXNpYyhcImFzc2V0cy9tdXNpYy9iZWdpbnMub2dnXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBQbGF5ZXJPYmplY3QoMzIsIDUxMikpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwiZ3JvdW5kMFwiLCAwLCAxOCwgMjUsIDEsIFtTcHJpdGVzLlJlZEJsb2NrXSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwid2FsbDBcIiwgOCwgMTQsIDEsIDQsIFtTcHJpdGVzLlJlZEJsb2NrXSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwid2FsbDFcIiwgOSwgMTIsIDEsIDYsIFtTcHJpdGVzLlJlZEJsb2NrXSkpO1xyXG5cclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgU3Bpa2VPYmplY3QoXCJzcGlrZTBcIiwgMzIwLCA0MTYsIDEpKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgU3Bpa2VPYmplY3QoXCJzcGlrZTFcIiwgMzIwLCAzODQsIDEpKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgU3Bpa2VPYmplY3QoXCJzcGlrZTJcIiwgMjg4LCAzNTIsIDApKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5zdGFudGlhdGUoKTogQmFzaWNMZXZlbCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUZXN0TGV2ZWwoKTtcclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lIGZyb20gJy4uL0dhbWUnO1xyXG5pbXBvcnQgeyBJRGlzcG9zYWJsZSB9IGZyb20gJy4uL3V0aWxzL0ludGVyZmFjZXMnO1xyXG5pbXBvcnQgU0FUIGZyb20gJy4uL1NBVC9TQVQnO1xyXG5pbXBvcnQgUmVzcG9uc2UgZnJvbSAnLi4vU0FUL1Jlc3BvbnNlJztcclxuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi4vU0FUL1BvbHlnb24nO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uL1NBVC9WZWN0b3InO1xyXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNpY09iamVjdCBpbXBsZW1lbnRzIElEaXNwb3NhYmxlIHtcclxuICAgIHB1YmxpYyBwb2x5Z29uOiBQb2x5Z29uO1xyXG4gICAgcHVibGljIGNvbGxpc2lvbjogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgaWQ6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgdzogbnVtYmVyLCBoOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgaWYgKHcgPT0gMCAmJiBoID09IDApIHRoaXMuY29sbGlzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wb2x5Z29uID0gbmV3IFBvbHlnb24obmV3IFZlY3Rvcih4LCB5KSwgW1xyXG4gICAgICAgICAgICBuZXcgVmVjdG9yKCksIG5ldyBWZWN0b3IoMCwgaCksXHJcbiAgICAgICAgICAgIG5ldyBWZWN0b3IodywgaCksIG5ldyBWZWN0b3IodywgMClcclxuICAgICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW92ZUJ5KHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGNvbGxpZGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wb2x5Z29uLnBvcy5hZGQobmV3IFZlY3Rvcih4LCB5KSk7XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZSA9IG5ldyBSZXNwb25zZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2FtZS5sZXZlbC5vYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghR2FtZS5sZXZlbC5vYmplY3RzW2ldLmNvbGxpc2lvbiB8fCBHYW1lLmxldmVsLm9iamVjdHNbaV0uaWQgPT0gdGhpcy5pZCkgY29udGludWU7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGlmIChTQVQudGVzdFBvbHlnb25Qb2x5Z29uKHRoaXMucG9seWdvbiwgR2FtZS5sZXZlbC5vYmplY3RzW2ldLnBvbHlnb24sIHJlc3BvbnNlKSkge1xyXG4gICAgICAgICAgICAgICAgY29sbGlkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFDb2xsOiBib29sZWFuID0gdGhpcy5vbkNvbGxpc2lvbihyZXNwb25zZSwgR2FtZS5sZXZlbC5vYmplY3RzW2ldKTtcclxuICAgICAgICAgICAgICAgIGxldCBiQ29sbDogYm9vbGVhbiA9IEdhbWUubGV2ZWwub2JqZWN0c1tpXS5vbkNvbGxpc2lvbihyZXNwb25zZSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYUNvbGwgJiYgYkNvbGwgJiYgdGhpcy5jb2xsaXNpb24pIHRoaXMucG9seWdvbi5wb3Muc3ViKHJlc3BvbnNlLm92ZXJsYXBWKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29sbGlkZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ29sbGlzaW9uKGluZm86IFJlc3BvbnNlLCBvYmo6IEJhc2ljT2JqZWN0KTogYm9vbGVhbiB7IHJldHVybiB0cnVlOyB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZDtcclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQ7XHJcblxyXG4gICAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7fVxyXG59IiwiaW1wb3J0IFBvbHlnb24gZnJvbSAnLi4vU0FUL1BvbHlnb24nO1xyXG5pbXBvcnQgUmVzcG9uc2UgZnJvbSAnLi4vU0FUL1Jlc3BvbnNlJztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi9TQVQvVmVjdG9yJztcclxuaW1wb3J0IEJhc2ljT2JqZWN0IGZyb20gJy4vQmFzaWNPYmplY3QnO1xyXG5pbXBvcnQgeyBTcHJpdGVPYmplY3QgfSBmcm9tICcuL1Nwcml0ZU9iamVjdCc7XHJcbmltcG9ydCBQbGF5ZXJPYmplY3QgZnJvbSAnLi9wbGF5ZXIvUGxheWVyT2JqZWN0JztcclxuaW1wb3J0IHsgU3ByaXRlLCBTcHJpdGVzIH0gZnJvbSAnLi4vU3ByaXRlTWFuYWdlcic7XHJcblxyXG5leHBvcnQgY29uc3QgZW51bSBTcGlrZURpcmVjdGlvbiB7XHJcbiAgICBVcCwgUmlnaHQsIERvd24sIExlZnRcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3Bpa2VPYmplY3QgZXh0ZW5kcyBTcHJpdGVPYmplY3Qge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGRpcmVjdGlvbjogU3Bpa2VEaXJlY3Rpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIGRpcmVjdGlvbjogU3Bpa2VEaXJlY3Rpb24gPSAwKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHgsIHksIDMyLCAzMiwgU3Bpa2VPYmplY3QuZ2V0RGlyU3ByaXRlKGRpcmVjdGlvbikpO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLmRpcmVjdGlvbikge1xyXG4gICAgICAgIGNhc2UgU3Bpa2VEaXJlY3Rpb24uTGVmdDpcclxuICAgICAgICAgICAgdGhpcy5wb2x5Z29uID0gbmV3IFBvbHlnb24obmV3IFZlY3Rvcih4LCB5KSwgW1xyXG4gICAgICAgICAgICAgICAgbmV3IFZlY3RvcigxLCAxNiksIG5ldyBWZWN0b3IoMzEsIDMxKSwgbmV3IFZlY3RvcigzMSwgMSlcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgU3Bpa2VEaXJlY3Rpb24uRG93bjpcclxuICAgICAgICAgICAgdGhpcy5wb2x5Z29uID0gbmV3IFBvbHlnb24obmV3IFZlY3Rvcih4LCB5KSwgW1xyXG4gICAgICAgICAgICAgICAgbmV3IFZlY3RvcigxLCAxKSwgbmV3IFZlY3RvcigxNiwgMzEpLCBuZXcgVmVjdG9yKDMxLCAxKVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBTcGlrZURpcmVjdGlvbi5SaWdodDpcclxuICAgICAgICAgICAgdGhpcy5wb2x5Z29uID0gbmV3IFBvbHlnb24obmV3IFZlY3Rvcih4LCB5KSwgW1xyXG4gICAgICAgICAgICAgICAgbmV3IFZlY3RvcigxLCAxKSwgbmV3IFZlY3RvcigxLCAzMSksIG5ldyBWZWN0b3IoMzEsIDE2KVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGhpcy5wb2x5Z29uID0gbmV3IFBvbHlnb24obmV3IFZlY3Rvcih4LCB5KSwgW1xyXG4gICAgICAgICAgICAgICAgbmV3IFZlY3RvcigxNiwgMSksIG5ldyBWZWN0b3IoMSwgMzEpLCBuZXcgVmVjdG9yKDMxLCAzMSlcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbGxpc2lvbihpbmZvOiBSZXNwb25zZSwgb2JqOiBCYXNpY09iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBQbGF5ZXJPYmplY3QpIHtcclxuICAgICAgICAgICAgKG9iaiBhcyBQbGF5ZXJPYmplY3QpLmRpZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXREaXJTcHJpdGUoZGlyOiBTcGlrZURpcmVjdGlvbik6IFNwcml0ZSB7XHJcbiAgICAgICAgY29uc3Qgc3Bpa2VEaXJTcHJpdGVzOiBTcHJpdGVbXSA9IFtTcHJpdGVzLlNwaWtlVXAsIFNwcml0ZXMuU3Bpa2VSaWdodCwgU3ByaXRlcy5TcGlrZURvd24sIFNwcml0ZXMuU3Bpa2VMZWZ0XTtcclxuICAgICAgICByZXR1cm4gc3Bpa2VEaXJTcHJpdGVzW2Rpcl07XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTcHJpdGUgfSBmcm9tICcuLi9TcHJpdGVNYW5hZ2VyJztcclxuaW1wb3J0IEJhc2ljT2JqZWN0IGZyb20gJy4vQmFzaWNPYmplY3QnO1xyXG5leHBvcnQgY2xhc3MgU3ByaXRlT2JqZWN0IGV4dGVuZHMgQmFzaWNPYmplY3Qge1xyXG4gICAgcHVibGljIHNwcml0ZTogU3ByaXRlO1xyXG4gICAgcHVibGljIHdpZHRoOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaGVpZ2h0OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHc6IG51bWJlciwgaDogbnVtYmVyLCBzcHJpdGU6IFNwcml0ZSkge1xyXG4gICAgICAgIHN1cGVyKGlkLCB4LCB5LCB3LCBoKTtcclxuICAgICAgICB0aGlzLnNwcml0ZSA9IHNwcml0ZTtcclxuICAgICAgICB0aGlzLndpZHRoID0gdztcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7fVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKSB7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLnNwcml0ZS5zb3VyY2UsIHRoaXMuc3ByaXRlLngsIHRoaXMuc3ByaXRlLnksIHRoaXMuc3ByaXRlLncsIHRoaXMuc3ByaXRlLmgsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBbmltYXRlZFNwcml0ZU9iamVjdCBleHRlbmRzIEJhc2ljT2JqZWN0IHtcclxuICAgIHB1YmxpYyBzcHJpdGVzOiBTcHJpdGVbXTtcclxuICAgIHB1YmxpYyB3aWR0aDogbnVtYmVyO1xyXG4gICAgcHVibGljIGhlaWdodDogbnVtYmVyO1xyXG4gICAgcHVibGljIGFuaW1EdXJhdGlvbjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBmcmFtZVRpbWVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlciwgc3ByaXRlczogU3ByaXRlW10sIGFuaW1EdXJhdGlvbjogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHgsIHksIHcsIGgpO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlcyA9IHNwcml0ZXM7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHc7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoO1xyXG4gICAgICAgIHRoaXMuYW5pbUR1cmF0aW9uID0gYW5pbUR1cmF0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge31cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZnJhbWVUaW1lciA9ICh0aGlzLmZyYW1lVGltZXIgKyBkZWx0YSkgJSB0aGlzLmFuaW1EdXJhdGlvbjtcclxuICAgICAgICBsZXQgaTogbnVtYmVyID0gTWF0aC5mbG9vcih0aGlzLmZyYW1lVGltZXIgKiB0aGlzLnNwcml0ZXMubGVuZ3RoIC8gdGhpcy5hbmltRHVyYXRpb24pO1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5zcHJpdGVzW2ldLnNvdXJjZSwgdGhpcy5zcHJpdGVzW2ldLngsIHRoaXMuc3ByaXRlc1tpXS55LCB0aGlzLnNwcml0ZXNbaV0udywgdGhpcy5zcHJpdGVzW2ldLmgsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi4vU3ByaXRlTWFuYWdlclwiO1xyXG5pbXBvcnQgQmFzaWNPYmplY3QgZnJvbSBcIi4vQmFzaWNPYmplY3RcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlsZU9iamVjdCBleHRlbmRzIEJhc2ljT2JqZWN0IHtcclxuICAgIHB1YmxpYyBzcHJpdGVMaXN0OiBTcHJpdGVbXTtcclxuICAgIHB1YmxpYyB4UmVwZWF0OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgeVJlcGVhdDogbnVtYmVyO1xyXG4gICAgcHVibGljIHRpbGVXaWR0aDogbnVtYmVyO1xyXG4gICAgcHVibGljIHRpbGVIZWlnaHQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBvcmRlcjogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgeFJlcGVhdDogbnVtYmVyLCB5UmVwZWF0OiBudW1iZXIsIHNwcml0ZXM6IFNwcml0ZVtdLCBvcmRlcj86IG51bWJlcltdLCB0aWxlV2lkdGg6IG51bWJlciA9IHNwcml0ZXNbMF0udywgdGlsZUhlaWdodDogbnVtYmVyID0gc3ByaXRlc1swXS5oKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHggKiB0aWxlV2lkdGgsIHkgKiB0aWxlSGVpZ2h0LCB4UmVwZWF0ICogdGlsZVdpZHRoLCB5UmVwZWF0ICogdGlsZUhlaWdodCk7XHJcbiAgICAgICAgdGhpcy54UmVwZWF0ID0geFJlcGVhdDtcclxuICAgICAgICB0aGlzLnlSZXBlYXQgPSB5UmVwZWF0O1xyXG4gICAgICAgIHRoaXMudGlsZVdpZHRoID0gdGlsZVdpZHRoO1xyXG4gICAgICAgIHRoaXMudGlsZUhlaWdodCA9IHRpbGVIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVMaXN0ID0gc3ByaXRlcztcclxuICAgICAgICBpZiAob3JkZXIgIT09IHVuZGVmaW5lZCkgdGhpcy5vcmRlciA9IG9yZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge31cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy54UmVwZWF0ICogdGhpcy55UmVwZWF0OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNwcml0ZTogU3ByaXRlID0gdGhpcy5zcHJpdGVMaXN0W2kgPCB0aGlzLm9yZGVyLmxlbmd0aCA/IHRoaXMub3JkZXJbaV0gOiAwXTtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShzcHJpdGUuc291cmNlLCBzcHJpdGUueCwgc3ByaXRlLnksIHNwcml0ZS53LCBzcHJpdGUuaCxcclxuICAgICAgICAgICAgICAgIHRoaXMucG9seWdvbi5wb3MueCArIChpICUgdGhpcy54UmVwZWF0KSAqIHRoaXMudGlsZVdpZHRoLCB0aGlzLnBvbHlnb24ucG9zLnkgKyBNYXRoLmZsb29yKGkgLyB0aGlzLnhSZXBlYXQpICogdGhpcy50aWxlSGVpZ2h0LCB0aGlzLnRpbGVXaWR0aCwgdGhpcy50aWxlSGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVzcG9uc2UgZnJvbSAnLi4vLi4vU0FUL1Jlc3BvbnNlJztcclxuaW1wb3J0IFNBVCBmcm9tICcuLi8uLi9TQVQvU0FUJztcclxuaW1wb3J0IFBsYXllck9iamVjdCBmcm9tICcuL1BsYXllck9iamVjdCc7XHJcbmltcG9ydCBHYW1lIGZyb20gJy4uLy4uL0dhbWUnO1xyXG5pbXBvcnQgQmFzaWNPYmplY3QgZnJvbSAnLi4vQmFzaWNPYmplY3QnO1xyXG5pbXBvcnQgU3Bpa2VPYmplY3QgZnJvbSAnLi4vU3Bpa2VPYmplY3QnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uLy4uL1NBVC9WZWN0b3InO1xyXG5pbXBvcnQgeyBJbWFnZUxpc3QgfSBmcm9tICcuLi8uLi9TcHJpdGVNYW5hZ2VyJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmxvb2RQYXJ0aWNsZSBleHRlbmRzIEJhc2ljT2JqZWN0IHtcclxuICAgIHB1YmxpYyBkeDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBkeTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzdHVjazogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHR5cGU6IG51bWJlciA9IDA7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCBkeDogbnVtYmVyLCBkeTogbnVtYmVyLCBpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHgsIHksIDIsIDIpO1xyXG4gICAgICAgIHRoaXMuZHggPSBkeDtcclxuICAgICAgICB0aGlzLmR5ID0gZHk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMyk7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb24gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5zdHVjaykgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZHkgKz0gUGxheWVyT2JqZWN0LmdyYXZpdHkgKiBkZWx0YTtcclxuICAgICAgICBpZiAodGhpcy5keCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5keCAtPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZHggPCAwKSB0aGlzLmR4ID0gMDtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZHggPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHggKz0gZGVsdGE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmR4ID4gMCkgdGhpcy5keCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm1vdmVCeSh0aGlzLmR4LCB0aGlzLmR5KSkge1xyXG4gICAgICAgICAgICB0aGlzLmR4ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5keSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc3R1Y2sgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW92ZUJ5KHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGNvbGxpZGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wb2x5Z29uLnBvcy5hZGQobmV3IFZlY3Rvcih4LCB5KSk7XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZSA9IG5ldyBSZXNwb25zZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2FtZS5sZXZlbC5vYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghR2FtZS5sZXZlbC5vYmplY3RzW2ldLmNvbGxpc2lvbiB8fCBHYW1lLmxldmVsLm9iamVjdHNbaV0uaWQgPT0gdGhpcy5pZCkgY29udGludWU7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGlmIChTQVQudGVzdFBvbHlnb25Qb2x5Z29uKHRoaXMucG9seWdvbiwgR2FtZS5sZXZlbC5vYmplY3RzW2ldLnBvbHlnb24sIHJlc3BvbnNlKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFDb2xsOiBib29sZWFuID0gdGhpcy5vbkNvbGxpc2lvbihyZXNwb25zZSwgR2FtZS5sZXZlbC5vYmplY3RzW2ldKTtcclxuICAgICAgICAgICAgICAgIEdhbWUubGV2ZWwub2JqZWN0c1tpXS5vbkNvbGxpc2lvbihyZXNwb25zZSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYUNvbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvbHlnb24ucG9zLnN1YihyZXNwb25zZS5vdmVybGFwVik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGlkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb2xsaWRlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Db2xsaXNpb24oaW5mbzogUmVzcG9uc2UsIG9iajogQmFzaWNPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgUGxheWVyT2JqZWN0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFNwaWtlT2JqZWN0KSByZXR1cm4gTWF0aC5yYW5kb20oKSA8IDAuNTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIHRoaXMudHlwZSAqIDMsIDM0LCAzLCA0LCB0aGlzLnBvbHlnb24ucG9zLnggLSAxLCB0aGlzLnBvbHlnb24ucG9zLnkgLSAxLCAzLCA0KTtcclxuICAgIH1cclxufSIsImltcG9ydCBQbGF5ZXJPYmplY3QgZnJvbSAnLi9QbGF5ZXJPYmplY3QnO1xyXG5pbXBvcnQgUmVzcG9uc2UgZnJvbSAnLi4vLi4vU0FUL1Jlc3BvbnNlJztcclxuaW1wb3J0IEJhc2ljT2JqZWN0IGZyb20gJy4uL0Jhc2ljT2JqZWN0JztcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi4vLi4vR2FtZSc7XHJcbmltcG9ydCBTcGlrZU9iamVjdCBmcm9tICcuLi9TcGlrZU9iamVjdCc7XHJcbmltcG9ydCB7IEltYWdlTGlzdCB9IGZyb20gJy4uLy4uL1Nwcml0ZU1hbmFnZXInO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsZXRPYmplY3QgZXh0ZW5kcyBCYXNpY09iamVjdCB7XHJcbiAgICBwcm90ZWN0ZWQgZnJhbWVUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHJvdGVjdGVkIGRpcmVjdGlvbjogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCBkaXJlY3Rpb246IG51bWJlciwgaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGlkLCB4IC0gNSwgeSAtIDEsIDEwLCAyKTtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1vdmVCeSh0aGlzLmRpcmVjdGlvbiAqIDc1MCAqIGRlbHRhLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Db2xsaXNpb24oaW5mbzogUmVzcG9uc2UsIG9iajogQmFzaWNPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgU3Bpa2VPYmplY3QpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgUGxheWVyT2JqZWN0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgR2FtZS5sZXZlbC5yZW1vdmVPYmplY3QodGhpcy5pZCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mcmFtZVRpbWUgKz0gZGVsdGE7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuZnJhbWVUaW1lID49IDAuMjApIHRoaXMuZnJhbWVUaW1lIC09IDAuMjA7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZShJbWFnZUxpc3QuQlVMTEVULCBNYXRoLmZsb29yKHRoaXMuZnJhbWVUaW1lIC8gMC4xMCkgKiA0LCAwLCA0LCA0LCB0aGlzLnBvbHlnb24ucG9zLnggKyAzLCB0aGlzLnBvbHlnb24ucG9zLnkgLSAxLCA0LCA0KTtcclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lIGZyb20gXCIuLi8uLi9HYW1lXCI7XHJcbmltcG9ydCBQbGF5ZXJPYmplY3QgZnJvbSBcIi4vUGxheWVyT2JqZWN0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGYWtlUGxheWVyT2JqZWN0IGV4dGVuZHMgUGxheWVyT2JqZWN0IHtcclxuICAgIHB1YmxpYyBzZWxlY3RlZFNhdmU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyID0gMTEyLCB5OiBudW1iZXIgPSA1MTIsIGlkOiBzdHJpbmcgPSBcImZha2VfcGxheWVyXCIpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCBpZCk7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9uR3JvdW5kID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmR4ID0gTnVtYmVyLkVQU0lMT047XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCdBcnJvd1JpZ2h0JykpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmlnaHRLZXlUaW1lKysgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNhdmUgPSAodGhpcy5zZWxlY3RlZFNhdmUgKyAxKSAlIDM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgdGhpcy5yaWdodEtleVRpbWUgPSAwO1xyXG4gICAgICAgIGlmIChHYW1lLmlzQnV0dG9uRG93bignQXJyb3dMZWZ0JykpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGVmdEtleVRpbWUrKyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2F2ZSA9ICh0aGlzLnNlbGVjdGVkU2F2ZSAtIDEgKyAzKSAlIDM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgdGhpcy5sZWZ0S2V5VGltZSA9IDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCd4JykpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvb3RLZXlUaW1lKysgPT0gMClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3QoKTtcclxuICAgICAgICB9IGVsc2UgdGhpcy5zaG9vdEtleVRpbWUgPSAwO1xyXG5cclxuICAgICAgICBpZiAoR2FtZS5pc0J1dHRvbkRvd24oJ1NoaWZ0JykgfHwgR2FtZS5pc0J1dHRvbkRvd24oJ3onKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5qdW1wS2V5VGltZSsrID09IDApXHJcbiAgICAgICAgICAgICAgICBHYW1lLmxvYWRTYXZlKHRoaXMuc2VsZWN0ZWRTYXZlKTtcclxuICAgICAgICB9IGVsc2UgdGhpcy5qdW1wS2V5VGltZSA9IDA7XHJcblxyXG4gICAgICAgIGxldCB0YXJnZXRQb3MgPSAxMTIgKyB0aGlzLnNlbGVjdGVkU2F2ZSAqIDMyICogODtcclxuICAgICAgICBsZXQgZHggPSBNYXRoLm1pbihNYXRoLmFicyh0aGlzLnBvbHlnb24ucG9zLnggLSB0YXJnZXRQb3MpLCBQbGF5ZXJPYmplY3QudmVsb2NpdHkgKiA0ICogZGVsdGEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubW92ZUJ5KHRoaXMucG9seWdvbi5wb3MueCA+IHRhcmdldFBvcyA/IC1keCA6IGR4LCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGllKCk6IHZvaWQge31cclxufSIsImltcG9ydCBSZXNwb25zZSBmcm9tICcuLi8uLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgU0FUIGZyb20gJy4uLy4uL1NBVC9TQVQnO1xyXG5pbXBvcnQgUGxheWVyT2JqZWN0IGZyb20gJy4vUGxheWVyT2JqZWN0JztcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi4vLi4vR2FtZSc7XHJcbmltcG9ydCBCYXNpY09iamVjdCBmcm9tICcuLi9CYXNpY09iamVjdCc7XHJcbmltcG9ydCBTcGlrZU9iamVjdCBmcm9tICcuLi9TcGlrZU9iamVjdCc7XHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4uLy4uL1NBVC9Qb2x5Z29uJztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi8uLi9TQVQvVmVjdG9yJztcclxuaW1wb3J0IHsgSW1hZ2VMaXN0IH0gZnJvbSAnLi4vLi4vU3ByaXRlTWFuYWdlcic7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdpYlBhcnRpY2xlIGV4dGVuZHMgQmFzaWNPYmplY3Qge1xyXG4gICAgcHVibGljIGR4OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGR5OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHR5cGU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgYm9keVZhcmlhbnQ6IG51bWJlciA9IDA7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogVHlwZSAwOiBib2R5LFxyXG4gICAgICogdHlwZSAxOiBib2R5IHN0b25lZCxcclxuICAgICAqIHR5cGUgMjogaGVhZCxcclxuICAgICAqIHR5cGUgMzogaGVhZCBzdG9uZWQsXHJcbiAgICAgKiB0eXBlIDQ6IGFybSxcclxuICAgICAqIHR5cGUgNTogYXJtIHN0b25lZCxcclxuICAgICAqIHR5cGUgNjogZmVldCxcclxuICAgICAqIHR5cGUgNzogZmVldCBzdG9uZWRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIGR4OiBudW1iZXIsIGR5OiBudW1iZXIsIHR5cGU6IG51bWJlciwgaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGlkLCB4LCB5LCA4LCA4KTtcclxuICAgICAgICB0aGlzLmR4ID0gZHg7XHJcbiAgICAgICAgdGhpcy5keSA9IGR5O1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb24gPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy50eXBlID09IDAgfHwgdGhpcy50eXBlID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5ib2R5VmFyaWFudCA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDMyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5keSArPSBQbGF5ZXJPYmplY3QuZ3Jhdml0eSAqIE1hdGgubWluKGRlbHRhLCAwLjMpO1xyXG4gICAgICAgIGlmICh0aGlzLmR4ID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmR4IC09IGRlbHRhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5keCA8IDApIHRoaXMuZHggPSAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5keCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5keCArPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZHggPiAwKSB0aGlzLmR4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb3ZlQnkodGhpcy5keCwgdGhpcy5keSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vdmVCeSh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBjb2xsaWRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB0aGlzQUFCQjogUG9seWdvbiA9IHRoaXMucG9seWdvbi5nZXRBQUJCKCk7XHJcbiAgICAgICAgdGhpcy5wb2x5Z29uLnBvcy5hZGQobmV3IFZlY3Rvcih4LCB5KSk7XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZSA9IG5ldyBSZXNwb25zZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2FtZS5sZXZlbC5vYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghR2FtZS5sZXZlbC5vYmplY3RzW2ldLmNvbGxpc2lvbiB8fCBHYW1lLmxldmVsLm9iamVjdHNbaV0uaWQgPT0gdGhpcy5pZCkgY29udGludWU7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGlmIChTQVQudGVzdFBvbHlnb25Qb2x5Z29uKHRoaXMucG9seWdvbiwgR2FtZS5sZXZlbC5vYmplY3RzW2ldLnBvbHlnb24sIHJlc3BvbnNlKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFDb2xsOiBib29sZWFuID0gdGhpcy5vbkNvbGxpc2lvbihyZXNwb25zZSwgR2FtZS5sZXZlbC5vYmplY3RzW2ldKTtcclxuICAgICAgICAgICAgICAgIEdhbWUubGV2ZWwub2JqZWN0c1tpXS5vbkNvbGxpc2lvbihyZXNwb25zZSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYUNvbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvbHlnb24ucG9zLnN1YihyZXNwb25zZS5vdmVybGFwVik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGlkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvYmp0QUFCQjogUG9seWdvbiA9IEdhbWUubGV2ZWwub2JqZWN0c1tpXS5wb2x5Z29uLmdldEFBQkIoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc0FBQkIucG9zLnkgKyB0aGlzQUFCQi5wb2ludHNbMl0ueSA8PSBvYmp0QUFCQi5wb3MueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCB0aGlzQUFCQi5wb3MueSA+PSBvYmp0QUFCQi5wb3MueSArIG9ianRBQUJCLnBvaW50c1syXS55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHkgKj0gLTAuNzU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5keCAqPSAtMC43NTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbGxpZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbGxpc2lvbihpbmZvOiBSZXNwb25zZSwgb2JqOiBCYXNpY09iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBQbGF5ZXJPYmplY3QgfHwgb2JqIGluc3RhbmNlb2YgU3Bpa2VPYmplY3QpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLnR5cGUpIHtcclxuICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIHRoaXMuYm9keVZhcmlhbnQgKiAyLCAwLCAyLCA5LCB0aGlzLnBvbHlnb24ucG9zLnggKyA0LCB0aGlzLnBvbHlnb24ucG9zLnksIDIsIDkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIHRoaXMuYm9keVZhcmlhbnQgKiAyLCA5LCAyLCA5LCB0aGlzLnBvbHlnb24ucG9zLnggKyA0LCB0aGlzLnBvbHlnb24ucG9zLnksIDIsIDkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIDAsIDE4LCAxMCwgMTYsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCAxMCwgMTYpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIDEwLCAxOCwgMTAsIDE2LCB0aGlzLnBvbHlnb24ucG9zLngsIHRoaXMucG9seWdvbi5wb3MueSwgMTAsIDE2KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKEltYWdlTGlzdC5HT1JFLCAyMCwgMTgsIDgsIDgsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCA4LCA4KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKEltYWdlTGlzdC5HT1JFLCAyOCwgMTgsIDgsIDgsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCA4LCA4KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKEltYWdlTGlzdC5HT1JFLCAzNiwgMTgsIDQsIDQsIHRoaXMucG9seWdvbi5wb3MueCArIDIsIHRoaXMucG9seWdvbi5wb3MueSArIDQsIDQsIDQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIDM2LCAyMiwgNCwgNCwgdGhpcy5wb2x5Z29uLnBvcy54ICsgMiwgdGhpcy5wb2x5Z29uLnBvcy55ICsgNCwgNCwgNCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi4vLi4vR2FtZSc7XHJcbmltcG9ydCBCYXNpY09iamVjdCBmcm9tICcuLi9CYXNpY09iamVjdCc7XHJcbmltcG9ydCBCdWxsZXRPYmplY3QgZnJvbSAnLi9CdWxsZXRPYmplY3QnO1xyXG5pbXBvcnQgeyByYW5kb21VbnNlY3VyZVVVSUQsIGJ1ZmZlckRyYXdJbWFnZSB9IGZyb20gJy4uLy4uL3V0aWxzL0NvbW1vblV0aWxzJztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi8uLi9TQVQvVmVjdG9yJztcclxuaW1wb3J0IEJsb29kUGFydGljbGUgZnJvbSAnLi9CbG9vZFBhcnRpY2xlJztcclxuaW1wb3J0IEdpYlBhcnRpY2xlIGZyb20gJy4vR2liUGFydGljbGUnO1xyXG5pbXBvcnQgQXVkaW9NYW5hZ2VyIGZyb20gJy4uLy4uL0F1ZGlvTWFuYWdlcic7XHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4uLy4uL1NBVC9Qb2x5Z29uJztcclxuaW1wb3J0IHsgSW1hZ2VMaXN0LCBTcHJpdGVzIH0gZnJvbSAnLi4vLi4vU3ByaXRlTWFuYWdlcic7XHJcbmltcG9ydCB7IFNwcml0ZU9iamVjdCB9IGZyb20gJy4uL1Nwcml0ZU9iamVjdCc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllck9iamVjdCBleHRlbmRzIEJhc2ljT2JqZWN0IHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdmVsb2NpdHk6IG51bWJlciA9IDE3NTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZ3Jhdml0eTogbnVtYmVyID0gMjQ7XHJcblxyXG4gICAgcHVibGljIGZyYW1lVGltZXI6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgbG9va2luZ0RpcmVjdGlvbjogbnVtYmVyID0gMTtcclxuXHJcbiAgICBwdWJsaWMgcmlnaHRLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGxlZnRLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGp1bXBLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHNob290S2V5VGltZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwdWJsaWMgZHg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgZHk6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgb25Hcm91bmQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBhdmFpbGFibGVKdW1wczogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgaWQ6IHN0cmluZyA9IFwicGxheWVyXCIpIHtcclxuICAgICAgICBzdXBlcihpZCwgeCwgeSwgMzIsIDMyKTtcclxuICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHgsIHkpLCBbXHJcbiAgICAgICAgICAgIG5ldyBWZWN0b3IoOSwgMTEpLCBuZXcgVmVjdG9yKDksIDMyKSxcclxuICAgICAgICAgICAgbmV3IFZlY3RvcigyMywgMzIpLCBuZXcgVmVjdG9yKDIzLCAxMSlcclxuICAgICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmR5ICs9IFBsYXllck9iamVjdC5ncmF2aXR5ICogZGVsdGE7XHJcbiAgICAgICAgdGhpcy5keCA9IDA7XHJcblxyXG4gICAgICAgIGlmIChHYW1lLmlzQnV0dG9uRG93bignQXJyb3dSaWdodCcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHRLZXlUaW1lKys7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxlZnRLZXlUaW1lID09IDAgfHwgdGhpcy5yaWdodEtleVRpbWUgPCB0aGlzLmxlZnRLZXlUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmR4ID0gUGxheWVyT2JqZWN0LnZlbG9jaXR5ICogZGVsdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgdGhpcy5yaWdodEtleVRpbWUgPSAwO1xyXG4gICAgICAgIGlmIChHYW1lLmlzQnV0dG9uRG93bignQXJyb3dMZWZ0JykpIHtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0S2V5VGltZSsrO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yaWdodEtleVRpbWUgPT0gMCB8fCB0aGlzLmxlZnRLZXlUaW1lIDwgdGhpcy5yaWdodEtleVRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHggPSAtUGxheWVyT2JqZWN0LnZlbG9jaXR5ICogZGVsdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgdGhpcy5sZWZ0S2V5VGltZSA9IDA7XHJcblxyXG4gICAgICAgIGlmIChHYW1lLmlzQnV0dG9uRG93bigneCcpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNob290S2V5VGltZSsrID09IDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290KCk7XHJcbiAgICAgICAgfSBlbHNlIHRoaXMuc2hvb3RLZXlUaW1lID0gMDtcclxuXHJcbiAgICAgICAgaWYgKChHYW1lLmlzQnV0dG9uRG93bignU2hpZnQnKSB8fCBHYW1lLmlzQnV0dG9uRG93bigneicpKSAmJiAodGhpcy5hdmFpbGFibGVKdW1wcyAhPSAwIHx8IHRoaXMuanVtcEtleVRpbWUgIT0gMCkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuanVtcEtleVRpbWUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVKdW1wcy0tO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXZhaWxhYmxlSnVtcHMgPT0gMSkgQXVkaW9NYW5hZ2VyLnBsYXkoXCJqdW1wMVwiLCBcImFzc2V0cy9zb3VuZHMvanVtcDEud2F2XCIpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBBdWRpb01hbmFnZXIucGxheShcImp1bXAyXCIsIFwiYXNzZXRzL3NvdW5kcy9qdW1wMi53YXZcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5qdW1wS2V5VGltZSArPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuanVtcEtleVRpbWUgPCAwLjMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF2YWlsYWJsZUp1bXBzID09IDEpIHRoaXMuZHkgPSAtMjIwICogZGVsdGE7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMuZHkgPSAtMTgwICogZGVsdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgdGhpcy5qdW1wS2V5VGltZSA9IDA7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmR4ICE9IDApIHRoaXMubG9va2luZ0RpcmVjdGlvbiA9IE1hdGguc2lnbih0aGlzLmR4KTtcclxuICAgICAgICB0aGlzLmR5ID0gTWF0aC5tYXgoTWF0aC5taW4odGhpcy5keSwgMTAuNjY2KSwgLTEwLjY2Nik7XHJcbiAgICAgICAgbGV0IHByZXZpb3VzUG9zOiBWZWN0b3IgPSAobmV3IFZlY3RvcigpKS5jb3B5KHRoaXMucG9seWdvbi5wb3MpO1xyXG4gICAgICAgIHRoaXMub25Hcm91bmQgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5tb3ZlQnkodGhpcy5keCwgdGhpcy5keSkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZHkgPiAwICYmIHRoaXMucG9seWdvbi5wb3MueSA9PSBwcmV2aW91c1Bvcy55KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBPbiBncm91bmRcclxuICAgICAgICAgICAgICAgIHRoaXMuZHkgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkdyb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF2YWlsYWJsZUp1bXBzID0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMub25Hcm91bmQgJiYgdGhpcy5hdmFpbGFibGVKdW1wcyA+IDEpIHRoaXMuYXZhaWxhYmxlSnVtcHMgPSAxOyBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvb3QoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGJ1bGxldElkOiBzdHJpbmcgPSBcImJ1bGxldFwiICsgcmFuZG9tVW5zZWN1cmVVVUlEKCk7XHJcbiAgICAgICAgQXVkaW9NYW5hZ2VyLnBsYXkoYnVsbGV0SWQsIFwiYXNzZXRzL3NvdW5kcy9maXJlLndhdlwiKS5vbmVuZGVkID0gZSA9PiB7IEF1ZGlvTWFuYWdlci5yZWxlYXNlKGJ1bGxldElkKTsgfTtcclxuICAgICAgICBHYW1lLmxldmVsLm9iamVjdHMucHVzaChcclxuICAgICAgICAgICAgbmV3IEJ1bGxldE9iamVjdCh0aGlzLnBvbHlnb24ucG9zLnggKyAxNiArIDEwICogdGhpcy5sb29raW5nRGlyZWN0aW9uLCB0aGlzLnBvbHlnb24ucG9zLnkgKyAyMSxcclxuICAgICAgICAgICAgICAgIHRoaXMubG9va2luZ0RpcmVjdGlvbiwgYnVsbGV0SWRcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoR2FtZS5sZXZlbC5pc1JlbW92ZWQodGhpcy5pZCkpIHJldHVybjtcclxuICAgICAgICBHYW1lLmxldmVsLnJlbW92ZU9iamVjdCh0aGlzLmlkKTtcclxuICAgICAgICBsZXQgY2VudGVyOiBWZWN0b3IgPSB0aGlzLnBvbHlnb24uZ2V0Q2VudHJvaWQoKS5hZGQodGhpcy5wb2x5Z29uLnBvcyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMjg7IGkrKykge1xyXG4gICAgICAgICAgICBHYW1lLmxldmVsLm9iamVjdHMucHVzaChuZXcgQmxvb2RQYXJ0aWNsZShjZW50ZXIueCwgY2VudGVyLnksXHJcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5jb3MoTWF0aC5QSSAqIDIgLyA0OCAqIGkpICogTWF0aC5yYW5kb20oKSAqIDYsIE1hdGguc2luKE1hdGguUEkgKiAyIC8gNDggKiBpKSAqIE1hdGgucmFuZG9tKCkgKiAxMCxcclxuICAgICAgICAgICAgICAgICAgICBcImJsb29kX1wiICsgdGhpcy5pZCArIFwiX1wiICsgaVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkgKz0gMikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBvID0gMDsgbyA8IChpID4gMyA/IDIgOiAxKTsgbysrKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lLmxldmVsLm9iamVjdHMucHVzaChuZXcgR2liUGFydGljbGUoY2VudGVyLngsIGNlbnRlci55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmNvcyhNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDIpICogTWF0aC5yYW5kb20oKSAqIDQsIE1hdGguc2luKE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMikgKiBNYXRoLnJhbmRvbSgpICogNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSwgXCJnaWJfXCIgKyB0aGlzLmlkICsgXCJfXCIgKyAoaSArIG8pXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBBdWRpb01hbmFnZXIucGxheU11c2ljKFwiYXNzZXRzL211c2ljL2dhbWVvdmVyLm9nZ1wiLCBmYWxzZSk7XHJcbiAgICAgICAgbGV0IGRlYXRoTWVzc2FnZTogU3ByaXRlT2JqZWN0ID0gbmV3IFNwcml0ZU9iamVjdChcImRlYXRoX21lc3NhZ2VcIiwgNDAwIC0gMzUwLCAzMDQgLSA4MiwgNzAwLCAxNjQsIFNwcml0ZXMuRGVhdGhNZXNzYWdlKTtcclxuICAgICAgICBkZWF0aE1lc3NhZ2UuY29sbGlzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgR2FtZS5sZXZlbC5vYmplY3RzLnB1c2goZGVhdGhNZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZnJhbWVUaW1lciA9ICh0aGlzLmZyYW1lVGltZXIgKyBkZWx0YSkgJSAwLjQwO1xyXG4gICAgICAgIGxldCBmcmFtZTogbnVtYmVyID0gTWF0aC5mbG9vcih0aGlzLmZyYW1lVGltZXIgLyAwLjEwKTtcclxuXHJcbiAgICAgICAgY3R4LnNhdmUoKTtcclxuICAgICAgICBpZiAodGhpcy5sb29raW5nRGlyZWN0aW9uID09IC0xKSB7XHJcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoR2FtZS5jYW52YXMud2lkdGggLSB0aGlzLnBvbHlnb24ucG9zLngsIHRoaXMucG9seWdvbi5wb3MueSk7XHJcbiAgICAgICAgICAgIGN0eC5zY2FsZSgtMSwgMSk7XHJcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoR2FtZS5jYW52YXMud2lkdGggLSB0aGlzLnBvbHlnb24ucG9zLnggKiAyIC0gMzIsIDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUodGhpcy5wb2x5Z29uLnBvcy54LCB0aGlzLnBvbHlnb24ucG9zLnkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZHkgPCAwKSB7XHJcbiAgICAgICAgICAgIC8vIEp1bXBpbmdcclxuICAgICAgICAgICAgaWYgKHRoaXMuanVtcEtleVRpbWUgIT0gMCAmJiB0aGlzLmp1bXBLZXlUaW1lIDwgMC4wMikge1xyXG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShidWZmZXJEcmF3SW1hZ2UoSW1hZ2VMaXN0LlBMQVlFUiwgMCwgNjQsIDMyLCAzMiksIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5qdW1wS2V5VGltZSAhPSAwICYmIHRoaXMuanVtcEtleVRpbWUgPCAwLjA0KSB7XHJcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGJ1ZmZlckRyYXdJbWFnZShJbWFnZUxpc3QuUExBWUVSLCAzMiwgNjQsIDMyLCAzMiksIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGJ1ZmZlckRyYXdJbWFnZShJbWFnZUxpc3QuUExBWUVSLCAoZnJhbWUgJSAyKSAqIDMyICsgNjQsIDY0LCAzMiwgMzIpLCAwLCAwLCAzMiwgMzIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5vbkdyb3VuZCkge1xyXG4gICAgICAgICAgICAvLyBGYWxsaW5nXHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoYnVmZmVyRHJhd0ltYWdlKEltYWdlTGlzdC5QTEFZRVIsIChmcmFtZSAlIDIpICogMzIsIDk2LCAzMiwgMzIpLCAwLCAwLCAzMiwgMzIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5keCAhPSAwKSB7XHJcbiAgICAgICAgICAgIC8vIFJ1bm5pbmdcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShidWZmZXJEcmF3SW1hZ2UoSW1hZ2VMaXN0LlBMQVlFUiwgZnJhbWUgKiAzMiwgMzIsIDMyLCAzMiksIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gSWRsZVxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGJ1ZmZlckRyYXdJbWFnZShJbWFnZUxpc3QuUExBWUVSLCBmcmFtZSAqIDMyLCAwLCAzMiwgMzIpLCAwLCAwLCAzMiwgMzIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgfVxyXG59IiwiLyoqXHJcbiAqIEdlbmVyYXRlcyBhIHJhbmRvbSBVVUlELiBUaGUgSUQgbWlnaHQgbm90IGJlIHVuaXF1ZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByYW5kb21VbnNlY3VyZVVVSUQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAneHh4eC14eHh4LXh4eC14eHh4Jy5yZXBsYWNlKC9beF0vZywgKGMpID0+IHsgIFxyXG4gICAgICAgIGNvbnN0IHIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNik7ICBcclxuICAgICAgICByZXR1cm4gci50b1N0cmluZygxNik7ICBcclxuICAgIH0pO1xyXG59XHJcblxyXG5jb25zdCBidWZmZXJDYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidWZmZXItY2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG5jb25zdCBidWZmZXJDdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9ICgoKSA9PiB7XHJcbiAgICBsZXQgY3R4ID0gYnVmZmVyQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKSE7XHJcbiAgICBjdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XHJcbiAgICByZXR1cm4gY3R4O1xyXG59KSgpO1xyXG5cclxuLyoqXHJcbiAqIERyYXdzIGFuIGltYWdlIHRvIHRoZSAoY2xlYW5lZCkgYnVmZmVyIGNhbnZhcyBhbmQgcmV0dXJucyB0aGUgY2FudmFzIGl0c2VsZi4gQ2FuIGJlIHVzZWQgdG8gZHJhdyBhIHBhcnQgb2YgYW4gaW1hZ2UgdG8gdGhlIG1haW4gY2FudmFzIHdpdGhvdXQgdHJhbnNmb3JtLWNhdXNlZCBhcnRpZmFjdHMuXHJcbiAqIEBwYXJhbSBpbWFnZSBhbiBlbGVtZW50IHRvIGRyYXcgaW50byB0aGUgY29udGV4dC5cclxuICogQHBhcmFtIHN4IHgtYXhpcyBjb29yZGluYXRlIG9mIHRoZSBzb3VyY2UgaW1hZ2UncyB0b3AgbGVmdCBjb3JuZXJcclxuICogQHBhcmFtIHN5IHktYXhpcyBjb29yZGluYXRlIG9mIHRoZSBzb3VyY2UgaW1hZ2UncyB0b3AgbGVmdCBjb3JuZXJcclxuICogQHBhcmFtIHN3IHdpZHRoIG9mIHRoZSBzb3VyY2UgaW1hZ2UgcmVnaW9uIHRvIGRyYXdcclxuICogQHBhcmFtIHNoIGhlaWdodCBvZiB0aGUgc291cmNlIGltYWdlIHJlZ2lvbiB0byBkcmF3XHJcbiAqIEByZXR1cm5zIFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGJ1ZmZlckRyYXdJbWFnZShpbWFnZTogQ2FudmFzSW1hZ2VTb3VyY2UsIHN4OiBudW1iZXIsIHN5OiBudW1iZXIsIHN3OiBudW1iZXIsIHNoOiBudW1iZXIpOiBIVE1MQ2FudmFzRWxlbWVudCB7XHJcbiAgICBidWZmZXJDYW52YXMud2lkdGggPSBzdztcclxuICAgIGJ1ZmZlckNhbnZhcy5oZWlnaHQgPSBzaDtcclxuICAgIGJ1ZmZlckN0eC5jbGVhclJlY3QoMCwgMCwgYnVmZmVyQ2FudmFzLndpZHRoLCBidWZmZXJDYW52YXMuaGVpZ2h0KTtcclxuICAgIGJ1ZmZlckN0eC5kcmF3SW1hZ2UoaW1hZ2UsIHN4LCBzeSwgc3csIHNoLCAwLCAwLCBzdywgc2gpO1xyXG4gICAgcmV0dXJuIGJ1ZmZlckNhbnZhcztcclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbmNvbnN0IF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0Y29uc3QgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdGNvbnN0IG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHRjb25zdCBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlci92YWx1ZSBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyohXHJcbiogSSBXYW5uYSBCZSBUaGUgR3V5OiBUaGUgTW92aWU6IFRoZSBHYW1lXHJcbiogVHlwZVNjcmlwdCByZW1ha2UgbWFkZSBieSBQR2dhbWVyMiAoYWthIFNvbm9QRykuXHJcbiogWW91IGNhbiBmaW5kIHRoZSBzb3VyY2UgY29kZSBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vUEdnYW1lcjIvSVdCVEcudHNcclxuKiBPcmlnaW5hbCBnYW1lIG1hZGUgYnkgS2F5aW46IGh0dHBzOi8va2F5aW4ubW9lL2l3YnRnL1xyXG4qL1xyXG5cclxuaW1wb3J0IEF1ZGlvTWFuYWdlciBmcm9tIFwiLi9BdWRpb01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWUgZnJvbSBcIi4vR2FtZVwiO1xyXG5cclxuZnVuY3Rpb24gZnJhbWUodGltZXN0YW1wOiBET01IaWdoUmVzVGltZVN0YW1wKSB7XHJcbiAgICBpZiAoIWRvY3VtZW50LmhpZGRlbilcclxuICAgICAgICBHYW1lLnVwZGF0ZSh0aW1lc3RhbXApO1xyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmcmFtZSk7XHJcbn1cclxud2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmcmFtZSk7XHJcblxyXG5vbmtleWRvd24gPSBmdW5jdGlvbihlKSB7XHJcbiAgICBHYW1lLmtleU1hcC5zZXQoZS5rZXkubGVuZ3RoID09IDEgPyBlLmtleS50b0xvd2VyQ2FzZSgpIDogZS5rZXksIHRydWUpO1xyXG4gICAgQXVkaW9NYW5hZ2VyLmF1dG9QbGF5Rml4KCk7XHJcbn07XHJcbm9ua2V5dXAgPSBmdW5jdGlvbihlKSB7IEdhbWUua2V5TWFwLnNldChlLmtleS5sZW5ndGggPT0gMSA/IGUua2V5LnRvTG93ZXJDYXNlKCkgOiBlLmtleSwgZmFsc2UpOyB9OyJdLCJuYW1lcyI6WyJTcHJpdGVzIiwiU3Bpa2VEaXJlY3Rpb24iXSwic291cmNlUm9vdCI6IiJ9