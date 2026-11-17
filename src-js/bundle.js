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
    let ctx = _Game.canvas.getContext("2d", { desynchronized: true, alpha: false });
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = _Game.level.backgroundStyle || "#000000";
    ctx.fillRect(0, 0, _Game.canvas.width, _Game.canvas.height);
    ctx.save();
    ctx.translate(_Game.camera.x, _Game.camera.y);
    ctx.scale(_Game.camera.sizeX * (_Game.canvas.width / 800), _Game.camera.sizeY * (_Game.canvas.height / 608));
    try {
      _Game.level.update(ctx, (timestamp - _Game.lastTimestamp) / 1e3);
    } catch (e) {
      console.error(e);
    }
    ctx.restore();
    if (_Game.isButtonDown("r")) {
      if (!_Game.isPushingReload) {
        this.loadSave();
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
_ImageList.GAMEOVER = _ImageList.register("assets/textures/ui/sprGameOver.png");
_ImageList.NEWGAME = _ImageList.register("assets/textures/ui/sprNewFile.png");
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
    this.backgroundStyle = "#000000";
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
    this.backgroundStyle = "#C4D7F7";
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
    ctx.fillStyle = "#88391E";
    ctx.fillRect(0, 544, 800, 64);
    super.update(ctx, delta);
    this.drawUI(ctx, delta);
  }
  drawUI(ctx, delta) {
    ctx.font = "19px comicsans";
    ctx.textAlign = "center";
    ctx.fillStyle = "#000000";
    ctx.fillRect(32, 32, 736, 32);
    ctx.fillStyle = "#ffffff";
    ctx.fillText("* Select Your Saved Game *", 384, 56);
    ctx.font = "16px comicsans";
    ctx.fillStyle = "#000000";
    ctx.fillRect(64, 160, 128, 288);
    ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.ImageList.NEWGAME, 64, 192);
    ctx.fillStyle = "#ffffff";
    ctx.fillText("SAVE GAME 1", 128, 182);
    ctx.fillStyle = "#000000";
    ctx.fillRect(320, 160, 128, 288);
    ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.ImageList.NEWGAME, 320, 192);
    ctx.fillStyle = "#ffffff";
    ctx.fillText("SAVE GAME 2", 384, 182);
    ctx.fillStyle = "#000000";
    ctx.fillRect(576, 160, 128, 288);
    ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.ImageList.NEWGAME, 576, 192);
    ctx.fillStyle = "#ffffff";
    ctx.fillText("SAVE GAME 3", 640, 182);
  }
  instantiate() {
    return new _SaveSelectMenu();
  }
};
_SaveSelectMenu.scrollVel = 40;
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
    this.backgroundStyle = "#C4D7F7";
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
    ctx.drawImage(this.sprite.source, this.sprite.x, this.sprite.y, this.sprite.w, this.sprite.h, this.polygon.pos.x | 0, this.polygon.pos.y | 0, this.width, this.height);
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
    ctx.drawImage(this.sprites[i].source, this.sprites[i].x, this.sprites[i].y, this.sprites[i].w, this.sprites[i].h, this.polygon.pos.x | 0, this.polygon.pos.y | 0, this.width, this.height);
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
    this.frameTime = (this.frameTime + delta) % 0.2;
    ctx.drawImage(_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.ImageList.PLAYER, Math.floor(this.frameTime / 0.1) * 4, 160, 4, 4, (this.polygon.pos.x | 0) + 3, (this.polygon.pos.y | 0) - 1, 4, 4);
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
        if (this.availableJumps == 1) this.dy = -235 * delta;
        else this.dy = -170 * delta;
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
    let slowFrame = Math.floor(this.frameTimer * 4 / 0.4);
    let fastFrame = Math.floor(this.frameTimer * 2 / 0.1);
    ctx.save();
    if (this.lookingDirection == -1) {
      ctx.translate(_Game__WEBPACK_IMPORTED_MODULE_0__["default"].canvas.width - this.polygon.pos.x | 0, this.polygon.pos.y | 0);
      ctx.scale(-1, 1);
      ctx.translate(_Game__WEBPACK_IMPORTED_MODULE_0__["default"].canvas.width - (this.polygon.pos.x | 0) * 2 - 32, 0);
    } else {
      ctx.translate(this.polygon.pos.x | 0, this.polygon.pos.y | 0);
    }
    if (this.dy < 0) {
      if (this.jumpKeyTime != 0 && this.jumpKeyTime < 0.02) {
        ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_9__.ImageList.PLAYER, 0, 64, 32, 32), 0, 0, 32, 32);
      } else if (this.jumpKeyTime != 0 && this.jumpKeyTime < 0.04) {
        ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_9__.ImageList.PLAYER, 32, 64, 32, 32), 0, 0, 32, 32);
      } else {
        ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_9__.ImageList.PLAYER, fastFrame % 2 * 32 + 64, 64, 32, 32), 0, 0, 32, 32);
      }
    } else if (!this.onGround) {
      ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_9__.ImageList.PLAYER, fastFrame % 2 * 32, 96, 32, 32), 0, 0, 32, 32);
    } else if (this.dx != 0) {
      ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_9__.ImageList.PLAYER, fastFrame % 4 * 32, 32, 32, 32), 0, 0, 32, 32);
    } else {
      ctx.drawImage((0,_utils_CommonUtils__WEBPACK_IMPORTED_MODULE_3__.bufferDrawImage)(_SpriteManager__WEBPACK_IMPORTED_MODULE_9__.ImageList.PLAYER, slowFrame * 32, 0, 32, 32), 0, 0, 32, 32);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBcUIsZ0JBQXJCLE1BQXFCLGNBQWE7QUFBQSxFQUc5QixPQUFjLEtBQUssS0FBYSxLQUFjLE9BQWdCLE9BQU8sU0FBaUIsR0FBdUI7QUFDekcsUUFBSSxRQUFzQyxjQUFhLFNBQVMsSUFBSSxHQUFHO0FBQ3ZFLFFBQUksVUFBVSxRQUFXO0FBQ3JCLFlBQU0sS0FBSztBQUNYLGFBQU87QUFBQSxJQUNYO0FBQ0EsUUFBSSxRQUFRLE9BQVcsU0FBUSxJQUFJLE1BQU07QUFBQSxRQUNwQyxTQUFRLElBQUksTUFBTSxHQUFHO0FBQzFCLFVBQU0sT0FBTztBQUNiLFVBQU0sU0FBUztBQUNmLGtCQUFhLFNBQVMsSUFBSSxLQUFLLEtBQUs7QUFDcEMsVUFBTSxZQUFZLE9BQUs7QUFDbkIsWUFBTyxLQUFLLEVBQUUsTUFBTSxTQUFPO0FBQ3ZCLGdCQUFRLEtBQUssR0FBRztBQUNoQixjQUFPLGFBQWEsU0FBUyxFQUFFO0FBQy9CLGNBQU8sUUFBUTtBQUFBLE1BQ25CLENBQUM7QUFDRCxZQUFPLFlBQVk7QUFBQSxJQUN2QjtBQUNBLFdBQU87QUFBQSxFQUNYO0FBQUEsRUFFQSxPQUFjLFVBQVUsS0FBYSxPQUFnQixNQUF3QjtBQUN6RSxRQUFJLFFBQXNDLGNBQWEsU0FBUyxJQUFJLFFBQVE7QUFDNUUsUUFBSSxVQUFVLFVBQWEsQ0FBQyxNQUFNLElBQUksU0FBUyxHQUFHLEdBQUc7QUFDakQsb0JBQWEsUUFBUSxRQUFRO0FBQUEsSUFDakM7QUFDQSxXQUFPLGNBQWEsS0FBSyxVQUFVLEtBQUssTUFBTSxJQUFJO0FBQUEsRUFDdEQ7QUFBQSxFQUVBLE9BQWMsTUFBTSxLQUFzQjtBQUN0QyxRQUFJLFFBQXNDLGNBQWEsU0FBUyxJQUFJLEdBQUc7QUFDdkUsUUFBSSxVQUFVLFFBQVc7QUFDckIsWUFBTSxNQUFNO0FBQ1osYUFBTztBQUFBLElBQ1g7QUFDQSxXQUFPO0FBQUEsRUFDWDtBQUFBLEVBRUEsT0FBYyxRQUFRLEtBQXNCO0FBMUNoRDtBQTJDUSxRQUFJLGNBQWEsTUFBTSxHQUFHLEdBQUc7QUFDekIsMEJBQWEsU0FBUyxJQUFJLEdBQUcsTUFBN0IsbUJBQWdDO0FBQ2hDLGFBQU8sY0FBYSxTQUFTLE9BQU8sR0FBRztBQUFBLElBQzNDO0FBQ0EsV0FBTztBQUFBLEVBQ1g7QUFBQSxFQUdBLE9BQWMsY0FBb0I7QUFDOUIsUUFBSSxDQUFDLGNBQWEsZUFBZTtBQUM3QixjQUFRLEtBQUssMkJBQTJCO0FBQ3hDLG9CQUFhLGdCQUFnQjtBQUM3QixvQkFBYSxTQUFTLFFBQVEsQ0FBQyxLQUFLLFFBQVE7QUFDeEMsWUFBSSxJQUFJLE9BQU87QUFDWCxjQUFJLGdCQUFnQixPQUFPO0FBQzNCLGNBQUksUUFBUTtBQUNaLGNBQUksT0FBTyxVQUFVO0FBQ2pCLGdCQUFJLEtBQUssRUFBRSxNQUFNLFNBQU87QUFDcEIsa0JBQUksY0FBYSxjQUFlLFNBQVEsS0FBSyxHQUFHO0FBQ2hELDRCQUFhLGdCQUFnQjtBQUM3QixrQkFBSSxhQUFhLFNBQVMsRUFBRTtBQUM1QixrQkFBSSxRQUFRO0FBQUEsWUFDaEIsQ0FBQztBQUFBLFVBQ0w7QUFBQSxRQUNKO0FBQUEsTUFDSixDQUFDO0FBQUEsSUFDTDtBQUFBLEVBQ0o7QUFDSjtBQXZFcUIsY0FDSCxXQUEwQyxvQkFBSSxJQUFJO0FBRC9DLGNBa0RGLGdCQUF5QjtBQWxENUMsSUFBcUIsZUFBckI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FDQWUsTUFBTSxPQUFPO0FBQUEsRUFBNUI7QUFDSSxTQUFPLElBQVk7QUFDbkIsU0FBTyxJQUFZO0FBQ25CLFNBQU8sUUFBZ0I7QUFDdkIsU0FBTyxRQUFnQjtBQUFBO0FBQzNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKbUI7QUFDUTtBQUNMO0FBQ3RCLE1BQXFCLFFBQXJCLE1BQXFCLE1BQUs7QUFBQSxFQVd0QixPQUFjLE9BQU8sV0FBZ0M7QUFDakQsVUFBSyxRQUFRLE1BQUssYUFBYSxJQUFJO0FBRW5DLFFBQUksa0JBQWtCLFNBQVMsS0FBSyxjQUFjLFNBQVMsS0FBSztBQUNoRSxRQUFJLFFBQVEsS0FBSyxNQUFNLEtBQUssS0FBSyxrQkFBa0IsU0FBUyxLQUFLLGVBQWUsS0FBSyxTQUFTLEtBQUssY0FBYyxFQUFFO0FBQ3pILFFBQUssU0FBUyxlQUFlLHlCQUF5QixFQUF1QjtBQUM1RSxjQUFRLEtBQUssSUFBSSxLQUFNLEtBQUssS0FBSyxNQUFNLEtBQUssR0FBSSxDQUFDO0FBQzVDLFVBQUssT0FBTyxRQUFRLFFBQVE7QUFDNUIsVUFBSyxPQUFPLFNBQVMsUUFBUTtBQUU3QixRQUFJLE1BQU0sTUFBSyxPQUFPLFdBQVcsTUFBTSxFQUFDLGdCQUFnQixNQUFNLE9BQU8sTUFBSyxDQUFDO0FBQzNFLFFBQUksd0JBQXdCO0FBQzVCLFFBQUksWUFBWSxNQUFLLE1BQU0sbUJBQW1CO0FBQzlDLFFBQUksU0FBUyxHQUFHLEdBQUcsTUFBSyxPQUFPLE9BQU8sTUFBSyxPQUFPLE1BQU07QUFFeEQsUUFBSSxLQUFLO0FBQ1QsUUFBSSxVQUFVLE1BQUssT0FBTyxHQUFHLE1BQUssT0FBTyxDQUFDO0FBQzFDLFFBQUksTUFBTSxNQUFLLE9BQU8sU0FBUyxNQUFLLE9BQU8sUUFBUSxNQUFNLE1BQUssT0FBTyxTQUFTLE1BQUssT0FBTyxTQUFTLElBQUk7QUFDdkcsUUFBSTtBQUNBLFlBQUssTUFBTSxPQUFPLE1BQU0sWUFBWSxNQUFLLGlCQUFpQixHQUFJO0FBQUEsSUFDbEUsU0FBUSxHQUFZO0FBQ2hCLGNBQVEsTUFBTSxDQUFDO0FBQUEsSUFDbkI7QUFDQSxRQUFJLFFBQVE7QUFHWixRQUFJLE1BQUssYUFBYSxHQUFHLEdBQUc7QUFDeEIsVUFBSSxDQUFDLE1BQUssaUJBQWlCO0FBQ3ZCLGFBQUssU0FBUztBQUFBLE1BQ2xCO0FBQ0EsWUFBSyxrQkFBa0I7QUFBQSxJQUMzQixNQUFPLE9BQUssa0JBQWtCO0FBRTlCLFVBQUssZ0JBQWdCO0FBQUEsRUFDekI7QUFBQSxFQUVBLE9BQWMsU0FBUyxNQUFxQjtBQUN4QyxTQUFLLE1BQU0sUUFBUTtBQUNuQixTQUFLLFFBQVEsSUFBSSx5REFBUyxDQUFDO0FBQUEsRUFDL0I7QUFBQSxFQUVBLE9BQWMsYUFBYSxTQUEwQjtBQXhEekQ7QUF5RFEsUUFBSSxRQUFRLFVBQVUsRUFBRyxXQUFVLFFBQVEsWUFBWTtBQUN2RCxZQUFPLFdBQUssT0FBTyxJQUFJLE9BQU8sTUFBdkIsWUFBNEI7QUFBQSxFQUN2QztBQUNKO0FBeERxQixNQUNILFFBQWlCO0FBRGQsTUFFSCxTQUE0QixTQUFTLGVBQWUsYUFBYTtBQUY5RCxNQUdILGdCQUFxQyxZQUFZLElBQUk7QUFIbEQsTUFLSCxRQUFvQixJQUFJLDhEQUFjLENBQUM7QUFMcEMsTUFNSCxTQUFpQixJQUFJLCtDQUFNLENBQUM7QUFOekIsTUFRSCxTQUErQixvQkFBSSxJQUFxQjtBQVJyRCxNQVNILGtCQUEyQjtBQVQ3QyxJQUFxQixPQUFyQjtBQUpBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FtQjtBQUNDO0FBT0wsTUFBTSxJQUFJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQWV2QixZQUFZLE1BQU0sSUFBSSwrQ0FBTSxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRztBQUM1QyxTQUFLLE1BQU07QUFDWCxTQUFLLElBQUk7QUFDVCxTQUFLLElBQUk7QUFBQSxFQUNYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBT08sWUFBcUI7QUFDMUIsVUFBTSxNQUFNLEtBQUs7QUFDakIsVUFBTSxJQUFJLEtBQUs7QUFDZixVQUFNLElBQUksS0FBSztBQUVmLFdBQU8sSUFBSSxnREFBTyxDQUFDLElBQUksK0NBQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUc7QUFBQSxNQUMzQyxJQUFJLCtDQUFNLENBQUM7QUFBQSxNQUFHLElBQUksK0NBQU0sQ0FBQyxHQUFHLENBQUM7QUFBQSxNQUM3QixJQUFJLCtDQUFNLENBQUMsR0FBRyxDQUFDO0FBQUEsTUFBRyxJQUFJLCtDQUFNLENBQUMsR0FBRyxDQUFDO0FBQUEsSUFDbkMsQ0FBQztBQUFBLEVBQ0g7QUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q21CO0FBQ0g7QUFZRCxNQUFNLFFBQVE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBZ0IzQixZQUFZLE1BQU0sSUFBSSwrQ0FBTSxDQUFDLEdBQUcsU0FBd0IsQ0FBQyxHQUFHO0FBZDVELFNBQU8sUUFBZ0I7QUFDdkIsU0FBTyxTQUFpQixJQUFJLCtDQUFNLENBQUM7QUFDbkMsU0FBTyxTQUF3QixDQUFDO0FBQ2hDLFNBQU8sYUFBNEIsQ0FBQztBQUNwQyxTQUFPLFFBQXVCLENBQUM7QUFDL0IsU0FBTyxVQUF5QixDQUFDO0FBVS9CLFNBQUssTUFBTTtBQUNYLFNBQUssVUFBVSxNQUFNO0FBQUEsRUFDdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFhTyxVQUFVLFFBQWdDO0FBRS9DLFVBQU0sZ0JBQWdCLENBQUMsS0FBSyxVQUFVLEtBQUssT0FBTyxXQUFXLE9BQU87QUFFcEUsUUFBSSxlQUFlO0FBQ2pCLFVBQUk7QUFFSixZQUFNLGFBQTRCLEtBQUssYUFBYSxDQUFDO0FBQ3JELFlBQU0sUUFBdUIsS0FBSyxRQUFRLENBQUM7QUFDM0MsWUFBTSxVQUF5QixLQUFLLFVBQVUsQ0FBQztBQUcvQyxXQUFLLElBQUksR0FBRyxJQUFJLE9BQU8sUUFBUSxLQUFLO0FBRWxDLGNBQU0sS0FBSyxPQUFPLENBQUM7QUFDbkIsY0FBTSxLQUFLLElBQUksT0FBTyxTQUFTLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUM7QUFFM0QsWUFBSSxPQUFPLE1BQU0sR0FBRyxNQUFNLEdBQUcsS0FBSyxHQUFHLE1BQU0sR0FBRyxHQUFHO0FBQy9DLGlCQUFPLE9BQU8sR0FBRyxDQUFDO0FBQ2xCLGVBQUs7QUFDTDtBQUFBLFFBQ0Y7QUFFQSxtQkFBVyxLQUFLLElBQUksK0NBQU0sQ0FBQyxDQUFDO0FBQzVCLGNBQU0sS0FBSyxJQUFJLCtDQUFNLENBQUMsQ0FBQztBQUN2QixnQkFBUSxLQUFLLElBQUksK0NBQU0sQ0FBQyxDQUFDO0FBQUEsTUFDM0I7QUFBQSxJQUNGO0FBRUEsU0FBSyxTQUFTO0FBRWQsU0FBSyxRQUFRO0FBRWIsV0FBTztBQUFBLEVBQ1Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBU08sU0FBUyxPQUF3QjtBQUN0QyxTQUFLLFFBQVE7QUFFYixTQUFLLFFBQVE7QUFFYixXQUFPO0FBQUEsRUFDVDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFTTyxVQUFVLFFBQXlCO0FBQ3hDLFNBQUssU0FBUztBQUVkLFNBQUssUUFBUTtBQUViLFdBQU87QUFBQSxFQUNUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFXTyxPQUFPLE9BQXdCO0FBQ3BDLFVBQU0sU0FBUyxLQUFLO0FBQ3BCLFVBQU0sTUFBTSxPQUFPO0FBRW5CLGFBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxJQUFLLFFBQU8sQ0FBQyxFQUFFLE9BQU8sS0FBSztBQUVwRCxTQUFLLFFBQVE7QUFFYixXQUFPO0FBQUEsRUFDVDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFZTyxVQUFVLEdBQVcsR0FBb0I7QUFDOUMsVUFBTSxTQUFTLEtBQUs7QUFDcEIsVUFBTSxNQUFNLE9BQU87QUFFbkIsYUFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLEtBQUs7QUFDNUIsYUFBTyxDQUFDLEVBQUUsS0FBSztBQUNmLGFBQU8sQ0FBQyxFQUFFLEtBQUs7QUFBQSxJQUNqQjtBQUVBLFNBQUssUUFBUTtBQUViLFdBQU87QUFBQSxFQUNUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFXUSxVQUFtQjtBQUd6QixVQUFNLGFBQWEsS0FBSztBQUt4QixVQUFNLFFBQVEsS0FBSztBQUtuQixVQUFNLFVBQVUsS0FBSztBQUdyQixVQUFNLFNBQVMsS0FBSztBQUNwQixVQUFNLFNBQVMsS0FBSztBQUNwQixVQUFNLFFBQVEsS0FBSztBQUVuQixVQUFNLE1BQU0sT0FBTztBQUNuQixRQUFJO0FBRUosU0FBSyxJQUFJLEdBQUcsSUFBSSxLQUFLLEtBQUs7QUFDeEIsWUFBTSxZQUFZLFdBQVcsQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLENBQUM7QUFFOUMsZ0JBQVUsS0FBSyxPQUFPO0FBQ3RCLGdCQUFVLEtBQUssT0FBTztBQUV0QixVQUFJLFVBQVUsRUFBRyxXQUFVLE9BQU8sS0FBSztBQUFBLElBQ3pDO0FBR0EsU0FBSyxJQUFJLEdBQUcsSUFBSSxLQUFLLEtBQUs7QUFDeEIsWUFBTSxLQUFLLFdBQVcsQ0FBQztBQUN2QixZQUFNLEtBQUssSUFBSSxNQUFNLElBQUksV0FBVyxJQUFJLENBQUMsSUFBSSxXQUFXLENBQUM7QUFFekQsWUFBTSxJQUFJLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRTtBQUVsQyxjQUFRLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVTtBQUFBLElBQ3RDO0FBRUEsV0FBTztBQUFBLEVBQ1Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVdPLFVBQW1CO0FBQ3hCLFVBQU0sU0FBUyxLQUFLO0FBRXBCLFFBQUksT0FBTyxPQUFPLENBQUMsRUFBRTtBQUNyQixRQUFJLE9BQU8sT0FBTyxDQUFDLEVBQUU7QUFFckIsUUFBSSxPQUFPLE9BQU8sQ0FBQyxFQUFFO0FBQ3JCLFFBQUksT0FBTyxPQUFPLENBQUMsRUFBRTtBQUVyQixhQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sUUFBUSxLQUFLO0FBQ3RDLFlBQU0sUUFBUSxPQUFPLENBQUM7QUFFdEIsVUFBSSxNQUFNLElBQUksS0FBTSxRQUFPLE1BQU07QUFBQSxlQUN4QixNQUFNLElBQUksS0FBTSxRQUFPLE1BQU07QUFFdEMsVUFBSSxNQUFNLElBQUksS0FBTSxRQUFPLE1BQU07QUFBQSxlQUN4QixNQUFNLElBQUksS0FBTSxRQUFPLE1BQU07QUFBQSxJQUN4QztBQUVBLFdBQU8sSUFBSSw0Q0FBRyxDQUFDLEtBQUssSUFBSSxNQUFNLEVBQUUsSUFBSSxJQUFJLCtDQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxPQUFPLE1BQU0sT0FBTyxJQUFJLEVBQUUsVUFBVTtBQUFBLEVBQ25HO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBYU8sY0FBc0I7QUFDM0IsVUFBTSxTQUFTLEtBQUs7QUFDcEIsVUFBTSxNQUFNLE9BQU87QUFFbkIsUUFBSSxLQUFLO0FBQ1QsUUFBSSxLQUFLO0FBQ1QsUUFBSSxLQUFLO0FBRVQsYUFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLEtBQUs7QUFDNUIsWUFBTSxLQUFLLE9BQU8sQ0FBQztBQUNuQixZQUFNLEtBQUssTUFBTSxNQUFNLElBQUksT0FBTyxDQUFDLElBQUksT0FBTyxJQUFJLENBQUM7QUFFbkQsWUFBTSxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUc7QUFFbEMsYUFBTyxHQUFHLElBQUksR0FBRyxLQUFLO0FBQ3RCLGFBQU8sR0FBRyxJQUFJLEdBQUcsS0FBSztBQUN0QixZQUFNO0FBQUEsSUFDUjtBQUVBLFNBQUssS0FBSztBQUNWLFNBQUssS0FBSztBQUNWLFNBQUssS0FBSztBQUVWLFdBQU8sSUFBSSwrQ0FBTSxDQUFDLElBQUksRUFBRTtBQUFBLEVBQzFCO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwUm1CO0FBVUosTUFBTSxTQUFTO0FBQUEsRUFBOUI7QUFDRSxTQUFPLElBQVM7QUFDaEIsU0FBTyxJQUFTO0FBQ2hCLFNBQU8sV0FBVyxJQUFJLCtDQUFNLENBQUM7QUFDN0IsU0FBTyxXQUFXLElBQUksK0NBQU0sQ0FBQztBQUU3QixTQUFPLE9BQWdCO0FBQ3ZCLFNBQU8sT0FBZ0I7QUFDdkIsU0FBTyxVQUFrQixPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBU3pCLFFBQWtCO0FBQ3ZCLFNBQUssT0FBTztBQUNaLFNBQUssT0FBTztBQUVaLFNBQUssVUFBVSxPQUFPO0FBRXRCLFdBQU87QUFBQSxFQUNUO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25DQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTWdCO0FBQ0c7QUFHRTtBQVdwQixNQUFNLFlBQTJCLENBQUM7QUFDbEMsU0FBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUssV0FBVSxLQUFLLElBQUksK0NBQU0sQ0FBQyxDQUFDO0FBT3hELE1BQU0sV0FBaUMsQ0FBQztBQUN4QyxTQUFTLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSyxVQUFTLEtBQUssQ0FBQyxDQUFDO0FBUTdDLE1BQU0sYUFBYSxJQUFJLGlEQUFRLENBQUM7QUFPaEMsTUFBTSxhQUFhLElBQUksNENBQUcsQ0FBQyxJQUFJLCtDQUFNLENBQUMsR0FBRyxNQUFVLElBQVEsRUFBRSxVQUFVO0FBS3ZFLE1BQU0sc0JBQXNCO0FBQzVCLE1BQU0sd0JBQXdCO0FBQzlCLE1BQU0sdUJBQXVCO0FBYzdCLFNBQVMsZ0JBQWdCLFFBQXVCLFFBQWdCLFFBQTZCO0FBQzNGLE1BQUksTUFBTSxPQUFPO0FBQ2pCLE1BQUksTUFBTSxDQUFDLE9BQU87QUFFbEIsUUFBTSxNQUFNLE9BQU87QUFFbkIsV0FBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLEtBQUs7QUFFNUIsVUFBTSxNQUFNLE9BQU8sQ0FBQyxFQUFFLElBQUksTUFBTTtBQUVoQyxRQUFJLE1BQU0sSUFBSyxPQUFNO0FBQ3JCLFFBQUksTUFBTSxJQUFLLE9BQU07QUFBQSxFQUN2QjtBQUVBLFNBQU8sQ0FBQyxJQUFJO0FBQ1osU0FBTyxDQUFDLElBQUk7QUFDZDtBQWlCQSxTQUFTLGNBQWMsTUFBYyxPQUF1QjtBQUMxRCxRQUFNLE9BQU8sS0FBSyxLQUFLO0FBQ3ZCLFFBQU0sS0FBSyxNQUFNLElBQUksSUFBSTtBQUd6QixNQUFJLEtBQUssRUFBRyxRQUFPO0FBQUEsV0FHVixLQUFLLEtBQU0sUUFBTztBQUFBLE1BR3RCLFFBQU87QUFDZDtBQUVlLE1BQU0sSUFBSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVl2QixPQUFjLGlCQUFpQixNQUFjLE1BQWMsU0FBd0IsU0FBd0IsTUFBYyxVQUE4QjtBQUNySixVQUFNLFNBQVMsU0FBUyxJQUFJO0FBQzVCLFVBQU0sU0FBUyxTQUFTLElBQUk7QUFHNUIsVUFBTSxVQUFVLFVBQVUsSUFBSSxFQUFHLEtBQUssSUFBSSxFQUFFLElBQUksSUFBSTtBQUNwRCxVQUFNLGtCQUFrQixRQUFRLElBQUksSUFBSTtBQUd4QyxvQkFBZ0IsU0FBUyxNQUFNLE1BQU07QUFDckMsb0JBQWdCLFNBQVMsTUFBTSxNQUFNO0FBR3JDLFdBQU8sQ0FBQyxLQUFLO0FBQ2IsV0FBTyxDQUFDLEtBQUs7QUFHYixRQUFJLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxHQUFHO0FBQ2xELGdCQUFVLEtBQUssT0FBTztBQUV0QixlQUFTLEtBQUssTUFBTTtBQUNwQixlQUFTLEtBQUssTUFBTTtBQUVwQixhQUFPO0FBQUEsSUFDVDtBQUdBLFFBQUksVUFBVTtBQUNaLFVBQUksVUFBVTtBQUdkLFVBQUksT0FBTyxDQUFDLElBQUksT0FBTyxDQUFDLEdBQUc7QUFDekIsaUJBQVMsT0FBTztBQUdoQixZQUFJLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxHQUFHO0FBQ3pCLG9CQUFVLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQztBQUU5QixtQkFBUyxPQUFPO0FBQUEsUUFFbEIsT0FBTztBQUNMLGdCQUFNLFVBQVUsT0FBTyxDQUFDLElBQUksT0FBTyxDQUFDO0FBQ3BDLGdCQUFNLFVBQVUsT0FBTyxDQUFDLElBQUksT0FBTyxDQUFDO0FBRXBDLG9CQUFVLFVBQVUsVUFBVSxVQUFVLENBQUM7QUFBQSxRQUMzQztBQUFBLE1BRUYsT0FBTztBQUNMLGlCQUFTLE9BQU87QUFHaEIsWUFBSSxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsR0FBRztBQUN6QixvQkFBVSxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUM7QUFFOUIsbUJBQVMsT0FBTztBQUFBLFFBRWxCLE9BQU87QUFDTCxnQkFBTSxVQUFVLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQztBQUNwQyxnQkFBTSxVQUFVLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQztBQUVwQyxvQkFBVSxVQUFVLFVBQVUsVUFBVSxDQUFDO0FBQUEsUUFDM0M7QUFBQSxNQUNGO0FBR0EsWUFBTSxhQUFhLEtBQUssSUFBSSxPQUFPO0FBRW5DLFVBQUksYUFBYSxTQUFTLFNBQVM7QUFDakMsaUJBQVMsVUFBVTtBQUNuQixpQkFBUyxTQUFTLEtBQUssSUFBSTtBQUUzQixZQUFJLFVBQVUsRUFBRyxVQUFTLFNBQVMsUUFBUTtBQUFBLE1BQzdDO0FBQUEsSUFDRjtBQUVBLGNBQVUsS0FBSyxPQUFPO0FBRXRCLGFBQVMsS0FBSyxNQUFNO0FBQ3BCLGFBQVMsS0FBSyxNQUFNO0FBRXBCLFdBQU87QUFBQSxFQUNUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBY0EsT0FBYyxjQUFjLEdBQVcsR0FBb0I7QUFDekQsVUFBTSxjQUFjLFVBQVUsSUFBSSxFQUFHLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU07QUFFcEUsVUFBTSxXQUFXLEVBQUUsSUFBSSxFQUFFO0FBQ3pCLFVBQU0sYUFBYSxZQUFZLEtBQUs7QUFFcEMsY0FBVSxLQUFLLFdBQVc7QUFHMUIsV0FBTyxjQUFjO0FBQUEsRUFDdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFVQSxPQUFjLGVBQWUsR0FBVyxNQUF3QjtBQUM5RCxlQUFXLElBQUksS0FBSyxDQUFDO0FBQ3JCLGVBQVcsTUFBTTtBQUVqQixRQUFJLFNBQVMsSUFBSSxtQkFBbUIsWUFBWSxNQUFNLFVBQVU7QUFFaEUsUUFBSSxPQUFRLFVBQVMsV0FBVztBQUVoQyxXQUFPO0FBQUEsRUFDVDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBV0EsT0FBYyxpQkFBaUIsR0FBVyxHQUFXLFVBQThCO0FBRWpGLFVBQU0sY0FBYyxVQUFVLElBQUksRUFBRyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTTtBQUV0RixVQUFNLGNBQWMsRUFBRSxJQUFJLEVBQUU7QUFDNUIsVUFBTSxnQkFBZ0IsY0FBYztBQUNwQyxVQUFNLGFBQWEsWUFBWSxLQUFLO0FBR3BDLFFBQUksYUFBYSxlQUFlO0FBQzlCLGdCQUFVLEtBQUssV0FBVztBQUUxQixhQUFPO0FBQUEsSUFDVDtBQUdBLFFBQUksVUFBVTtBQUNaLFlBQU0sT0FBTyxLQUFLLEtBQUssVUFBVTtBQUVqQyxlQUFTLElBQUk7QUFDYixlQUFTLElBQUk7QUFFYixlQUFTLFVBQVUsY0FBYztBQUNqQyxlQUFTLFNBQVMsS0FBSyxZQUFZLFVBQVUsQ0FBQztBQUM5QyxlQUFTLFNBQVMsS0FBSyxXQUFXLEVBQUUsTUFBTSxTQUFTLE9BQU87QUFFMUQsZUFBUyxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssUUFBUSxFQUFFLElBQUksRUFBRTtBQUM5QyxlQUFTLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxRQUFRLEVBQUUsSUFBSSxFQUFFO0FBQUEsSUFDaEQ7QUFFQSxjQUFVLEtBQUssV0FBVztBQUUxQixXQUFPO0FBQUEsRUFDVDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBV0EsT0FBYyxrQkFBa0IsU0FBa0IsUUFBZ0IsVUFBOEI7QUFFOUYsVUFBTSxZQUFZLFVBQVUsSUFBSSxFQUFHLEtBQUssT0FBTyxHQUFHLEVBQUUsSUFBSSxPQUFPLE1BQU0sRUFBRSxJQUFJLFFBQVEsR0FBRztBQUV0RixVQUFNLFNBQVMsT0FBTztBQUN0QixVQUFNLFVBQVUsU0FBUztBQUV6QixVQUFNLFNBQVMsUUFBUTtBQUN2QixVQUFNLE1BQU0sT0FBTztBQUVuQixVQUFNLE9BQU8sVUFBVSxJQUFJO0FBQzNCLFVBQU0sUUFBUSxVQUFVLElBQUk7QUFHNUIsYUFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLEtBQUs7QUFDNUIsWUFBTSxPQUFPLE1BQU0sTUFBTSxJQUFJLElBQUksSUFBSTtBQUNyQyxZQUFNLE9BQU8sTUFBTSxJQUFJLE1BQU0sSUFBSSxJQUFJO0FBRXJDLFVBQUksVUFBVTtBQUNkLFVBQUksV0FBVztBQUdmLFdBQUssS0FBSyxRQUFRLE1BQU0sQ0FBQyxDQUFDO0FBRzFCLFlBQU0sS0FBSyxTQUFTLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQztBQUduQyxVQUFJLFlBQVksTUFBTSxLQUFLLElBQUksUUFBUyxVQUFTLE9BQU87QUFHeEQsVUFBSSxTQUFTLGNBQWMsTUFBTSxLQUFLO0FBR3RDLFVBQUksV0FBVyxxQkFBcUI7QUFFbEMsYUFBSyxLQUFLLFFBQVEsTUFBTSxJQUFJLENBQUM7QUFHN0IsY0FBTSxTQUFTLFVBQVUsSUFBSSxFQUFHLEtBQUssU0FBUyxFQUFFLElBQUksT0FBTyxJQUFJLENBQUM7QUFFaEUsaUJBQVMsY0FBYyxNQUFNLE1BQU07QUFFbkMsWUFBSSxXQUFXLHNCQUFzQjtBQUVuQyxnQkFBTSxPQUFPLE1BQU0sSUFBSTtBQUV2QixjQUFJLE9BQU8sUUFBUTtBQUVqQixzQkFBVSxLQUFLLFNBQVM7QUFDeEIsc0JBQVUsS0FBSyxJQUFJO0FBQ25CLHNCQUFVLEtBQUssS0FBSztBQUNwQixzQkFBVSxLQUFLLE1BQU07QUFFckIsbUJBQU87QUFBQSxVQUNULFdBQVcsVUFBVTtBQUVuQixxQkFBUyxPQUFPO0FBRWhCLHVCQUFXLE1BQU0sVUFBVTtBQUMzQixzQkFBVSxTQUFTO0FBQUEsVUFDckI7QUFBQSxRQUNGO0FBRUEsa0JBQVUsS0FBSyxNQUFNO0FBQUEsTUFHdkIsV0FBVyxXQUFXLHNCQUFzQjtBQUUxQyxhQUFLLEtBQUssUUFBUSxNQUFNLElBQUksQ0FBQztBQUc3QixjQUFNLEtBQUssU0FBUyxFQUFFLElBQUksT0FBTyxJQUFJLENBQUM7QUFFdEMsaUJBQVMsY0FBYyxNQUFNLEtBQUs7QUFFbEMsWUFBSSxXQUFXLHFCQUFxQjtBQUVsQyxnQkFBTSxPQUFPLE1BQU0sSUFBSTtBQUV2QixjQUFJLE9BQU8sUUFBUTtBQUVqQixzQkFBVSxLQUFLLFNBQVM7QUFDeEIsc0JBQVUsS0FBSyxJQUFJO0FBQ25CLHNCQUFVLEtBQUssS0FBSztBQUVwQixtQkFBTztBQUFBLFVBQ1QsV0FBVyxVQUFVO0FBRW5CLHFCQUFTLE9BQU87QUFFaEIsdUJBQVcsTUFBTSxVQUFVO0FBQzNCLHNCQUFVLFNBQVM7QUFBQSxVQUNyQjtBQUFBLFFBQ0Y7QUFBQSxNQUVGLE9BQU87QUFFTCxjQUFNLFNBQVMsS0FBSyxLQUFLLEVBQUUsVUFBVTtBQUdyQyxjQUFNLE9BQU8sTUFBTSxJQUFJLE1BQU07QUFDN0IsY0FBTSxVQUFVLEtBQUssSUFBSSxJQUFJO0FBRzdCLFlBQUksT0FBTyxLQUFLLFVBQVUsUUFBUTtBQUVoQyxvQkFBVSxLQUFLLFNBQVM7QUFDeEIsb0JBQVUsS0FBSyxNQUFNO0FBQ3JCLG9CQUFVLEtBQUssS0FBSztBQUVwQixpQkFBTztBQUFBLFFBQ1QsV0FBVyxVQUFVO0FBRW5CLHFCQUFXO0FBQ1gsb0JBQVUsU0FBUztBQUduQixjQUFJLFFBQVEsS0FBSyxVQUFVLElBQUksT0FBUSxVQUFTLE9BQU87QUFBQSxRQUN6RDtBQUFBLE1BQ0Y7QUFJQSxVQUFJLFlBQVksWUFBWSxLQUFLLElBQUksT0FBTyxJQUFJLEtBQUssSUFBSSxTQUFTLE9BQU8sR0FBRztBQUMxRSxpQkFBUyxVQUFVO0FBQ25CLGlCQUFTLFNBQVMsS0FBSyxRQUFRO0FBQUEsTUFDakM7QUFBQSxJQUNGO0FBR0EsUUFBSSxVQUFVO0FBQ1osZUFBUyxJQUFJO0FBQ2IsZUFBUyxJQUFJO0FBRWIsZUFBUyxTQUFTLEtBQUssU0FBUyxRQUFRLEVBQUUsTUFBTSxTQUFTLE9BQU87QUFBQSxJQUNsRTtBQUVBLGNBQVUsS0FBSyxTQUFTO0FBQ3hCLGNBQVUsS0FBSyxJQUFJO0FBQ25CLGNBQVUsS0FBSyxLQUFLO0FBRXBCLFdBQU87QUFBQSxFQUNUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFjQSxPQUFjLGtCQUFrQixRQUFnQixTQUFrQixVQUE4QjtBQUU5RixVQUFNLFNBQVMsSUFBSSxrQkFBa0IsU0FBUyxRQUFRLFFBQVE7QUFFOUQsUUFBSSxVQUFVLFVBQVU7QUFFdEIsWUFBTSxJQUFJLFNBQVM7QUFDbkIsWUFBTSxPQUFPLFNBQVM7QUFFdEIsZUFBUyxTQUFTLFFBQVE7QUFDMUIsZUFBUyxTQUFTLFFBQVE7QUFFMUIsZUFBUyxJQUFJLFNBQVM7QUFDdEIsZUFBUyxJQUFJO0FBRWIsZUFBUyxPQUFPLFNBQVM7QUFDekIsZUFBUyxPQUFPO0FBQUEsSUFDbEI7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBV0EsT0FBYyxtQkFBbUIsR0FBWSxHQUFZLFVBQThCO0FBQ3JGLFVBQU0sVUFBVSxFQUFFO0FBQ2xCLFVBQU0sT0FBTyxRQUFRO0FBRXJCLFVBQU0sVUFBVSxFQUFFO0FBQ2xCLFVBQU0sT0FBTyxRQUFRO0FBR3JCLGFBQVMsSUFBSSxHQUFHLElBQUksTUFBTSxLQUFLO0FBQzdCLFVBQUksSUFBSSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsS0FBSyxTQUFTLFNBQVMsRUFBRSxRQUFRLENBQUMsR0FBRyxRQUFRLEdBQUc7QUFDaEYsZUFBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBR0EsYUFBUyxJQUFJLEdBQUcsSUFBSSxNQUFNLEtBQUs7QUFDN0IsVUFBSSxJQUFJLGlCQUFpQixFQUFFLEtBQUssRUFBRSxLQUFLLFNBQVMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxHQUFHLFFBQVEsR0FBRztBQUNoRixlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFLQSxRQUFJLFVBQVU7QUFDWixlQUFTLElBQUk7QUFDYixlQUFTLElBQUk7QUFFYixlQUFTLFNBQVMsS0FBSyxTQUFTLFFBQVEsRUFBRSxNQUFNLFNBQVMsT0FBTztBQUFBLElBQ2xFO0FBRUEsV0FBTztBQUFBLEVBQ1Q7QUFDRjs7Ozs7Ozs7Ozs7Ozs7O0FDcmdCZSxNQUFNLE9BQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBUTFCLFlBQVksSUFBSSxHQUFHLElBQUksR0FBRztBQUN4QixTQUFLLElBQUk7QUFDVCxTQUFLLElBQUk7QUFBQSxFQUNYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVNPLEtBQUssT0FBdUI7QUFDakMsU0FBSyxJQUFJLE1BQU07QUFDZixTQUFLLElBQUksTUFBTTtBQUVmLFdBQU87QUFBQSxFQUNUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBT08sUUFBZ0I7QUFDckIsV0FBTyxJQUFJLE9BQU8sS0FBSyxHQUFHLEtBQUssQ0FBQztBQUFBLEVBQ2xDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVNPLE9BQWU7QUFDcEIsVUFBTSxJQUFJLEtBQUs7QUFFZixTQUFLLElBQUksS0FBSztBQUNkLFNBQUssSUFBSSxDQUFDO0FBRVYsV0FBTztBQUFBLEVBQ1Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBU08sT0FBTyxPQUF1QjtBQUNuQyxVQUFNLElBQUksS0FBSztBQUNmLFVBQU0sSUFBSSxLQUFLO0FBRWYsU0FBSyxJQUFJLElBQUksS0FBSyxJQUFJLEtBQUssSUFBSSxJQUFJLEtBQUssSUFBSSxLQUFLO0FBQ2pELFNBQUssSUFBSSxJQUFJLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxLQUFLLElBQUksS0FBSztBQUVqRCxXQUFPO0FBQUEsRUFDVDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQU9PLFVBQWtCO0FBQ3ZCLFNBQUssSUFBSSxDQUFDLEtBQUs7QUFDZixTQUFLLElBQUksQ0FBQyxLQUFLO0FBRWYsV0FBTztBQUFBLEVBQ1Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFPTyxZQUFvQjtBQUN6QixVQUFNLElBQUksS0FBSyxJQUFJO0FBRW5CLFFBQUksSUFBSSxHQUFHO0FBQ1QsV0FBSyxJQUFJLEtBQUssSUFBSTtBQUNsQixXQUFLLElBQUksS0FBSyxJQUFJO0FBQUEsSUFDcEI7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFTTyxJQUFJLE9BQXVCO0FBQ2hDLFNBQUssS0FBSyxNQUFNO0FBQ2hCLFNBQUssS0FBSyxNQUFNO0FBRWhCLFdBQU87QUFBQSxFQUNUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVNPLElBQUksT0FBdUI7QUFDaEMsU0FBSyxLQUFLLE1BQU07QUFDaEIsU0FBSyxLQUFLLE1BQU07QUFFaEIsV0FBTztBQUFBLEVBQ1Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFhTyxNQUFNLEdBQVcsR0FBb0I7QUFDMUMsU0FBSyxLQUFLO0FBQ1YsU0FBSyxLQUFLLE9BQU8sS0FBSyxjQUFjLElBQUk7QUFFeEMsV0FBTztBQUFBLEVBQ1Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBU08sUUFBUSxPQUF1QjtBQUNwQyxVQUFNLE1BQU0sS0FBSyxJQUFJLEtBQUssSUFBSSxNQUFNLEtBQUs7QUFFekMsU0FBSyxJQUFJLE1BQU0sTUFBTTtBQUNyQixTQUFLLElBQUksTUFBTSxNQUFNO0FBRXJCLFdBQU87QUFBQSxFQUNUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFXTyxTQUFTLE9BQXVCO0FBQ3JDLFVBQU0sTUFBTSxLQUFLLElBQUksS0FBSztBQUUxQixTQUFLLElBQUksTUFBTSxNQUFNO0FBQ3JCLFNBQUssSUFBSSxNQUFNLE1BQU07QUFFckIsV0FBTztBQUFBLEVBQ1Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBU08sUUFBUSxNQUFzQjtBQUNuQyxVQUFNLElBQUksS0FBSztBQUNmLFVBQU0sSUFBSSxLQUFLO0FBRWYsU0FBSyxRQUFRLElBQUksRUFBRSxNQUFNLENBQUM7QUFFMUIsU0FBSyxLQUFLO0FBQ1YsU0FBSyxLQUFLO0FBRVYsV0FBTztBQUFBLEVBQ1Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVdPLFNBQVMsTUFBc0I7QUFDcEMsVUFBTSxJQUFJLEtBQUs7QUFDZixVQUFNLElBQUksS0FBSztBQUVmLFNBQUssU0FBUyxJQUFJLEVBQUUsTUFBTSxDQUFDO0FBRTNCLFNBQUssS0FBSztBQUNWLFNBQUssS0FBSztBQUVWLFdBQU87QUFBQSxFQUNUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVNPLElBQUksT0FBdUI7QUFDaEMsV0FBTyxLQUFLLElBQUksTUFBTSxJQUFJLEtBQUssSUFBSSxNQUFNO0FBQUEsRUFDM0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFPTyxPQUFlO0FBQ3BCLFdBQU8sS0FBSyxJQUFJLElBQUk7QUFBQSxFQUN0QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQU9PLE1BQWM7QUFDbkIsV0FBTyxLQUFLLEtBQUssS0FBSyxLQUFLLENBQUM7QUFBQSxFQUM5QjtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7OztBQzdQTyxNQUFNLGFBQU4sTUFBTSxXQUFVO0FBQUEsRUFHbkIsT0FBYyxTQUFTLEtBQStCO0FBQ2xELFFBQUksTUFBd0IsSUFBSSxNQUFNO0FBQ3RDLFFBQUksTUFBTTtBQUNWLGVBQVUsT0FBUSxLQUFLLEdBQUc7QUFDMUIsV0FBTztBQUFBLEVBQ1g7QUFZSjtBQXBCYSxXQUNNLFNBQXlDLENBQUM7QUFEaEQsV0FVSyxpQkFBbUMsV0FBVSxTQUFTLHdDQUF3QztBQVZuRyxXQVdLLFFBQTBCLFdBQVUsU0FBUyxzQ0FBc0M7QUFYeEYsV0FZSyxXQUE2QixXQUFVLFNBQVMsd0NBQXdDO0FBWjdGLFdBYUssZ0JBQWtDLFdBQVUsU0FBUyw2Q0FBNkM7QUFidkcsV0FlSyxTQUEyQixXQUFVLFNBQVMsOENBQThDO0FBZmpHLFdBZ0JLLE9BQXlCLFdBQVUsU0FBUyw0Q0FBNEM7QUFoQjdGLFdBa0JLLFdBQTZCLFdBQVUsU0FBUyxvQ0FBb0M7QUFsQnpGLFdBbUJLLFVBQTRCLFdBQVUsU0FBUyxtQ0FBbUM7QUFuQjdGLElBQU0sWUFBTjtBQXNCQSxNQUFNLE9BQU87QUFBQSxFQU9oQixZQUFZLFFBQTBCLElBQVksR0FBRyxJQUFZLEdBQUcsR0FBVyxHQUFXO0FBQ3RGLFNBQUssU0FBUztBQUNkLFNBQUssSUFBSTtBQUNULFNBQUssSUFBSTtBQUNULFNBQUssSUFBSTtBQUNULFNBQUssSUFBSTtBQUFBLEVBQ2I7QUFDSjtBQUVPLElBQVU7QUFBQSxDQUFWLENBQVVBLGFBQVY7QUFDSSxFQUFNQSxTQUFBLFdBQW1CLElBQUksT0FBTyxVQUFVLGdCQUFnQixJQUFJLElBQUksSUFBSSxFQUFFO0FBQzVFLEVBQU1BLFNBQUEsZ0JBQXdCLElBQUksT0FBTyxVQUFVLGdCQUFnQixHQUFHLElBQUksSUFBSSxFQUFFO0FBQ2hGLEVBQU1BLFNBQUEsY0FBc0IsSUFBSSxPQUFPLFVBQVUsZ0JBQWdCLElBQUksSUFBSSxJQUFJLEVBQUU7QUFDL0UsRUFBTUEsU0FBQSxjQUFzQixJQUFJLE9BQU8sVUFBVSxnQkFBZ0IsR0FBRyxJQUFJLElBQUksRUFBRTtBQUM5RSxFQUFNQSxTQUFBLGNBQXNCLElBQUksT0FBTyxVQUFVLGdCQUFnQixJQUFJLElBQUksSUFBSSxFQUFFO0FBRS9FLEVBQU1BLFNBQUEsV0FBbUIsSUFBSSxPQUFPLFVBQVUsVUFBVSxHQUFHLEdBQUcsS0FBSyxHQUFHO0FBQ3RFLEVBQU1BLFNBQUEsb0JBQTRCLElBQUksT0FBTyxVQUFVLFVBQVUsS0FBSyxHQUFHLEtBQUssR0FBRztBQUNqRixFQUFNQSxTQUFBLGNBQXNCLElBQUksT0FBTyxVQUFVLFVBQVUsR0FBRyxLQUFLLEtBQUssR0FBRztBQUUzRSxFQUFNQSxTQUFBLFVBQWtCLElBQUksT0FBTyxVQUFVLE9BQU8sR0FBRyxHQUFHLElBQUksRUFBRTtBQUNoRSxFQUFNQSxTQUFBLGFBQXFCLElBQUksT0FBTyxVQUFVLE9BQU8sSUFBSSxHQUFHLElBQUksRUFBRTtBQUNwRSxFQUFNQSxTQUFBLFlBQW9CLElBQUksT0FBTyxVQUFVLE9BQU8sSUFBSSxHQUFHLElBQUksRUFBRTtBQUNuRSxFQUFNQSxTQUFBLFlBQW9CLElBQUksT0FBTyxVQUFVLE9BQU8sSUFBSSxHQUFHLElBQUksRUFBRTtBQUVuRSxFQUFNQSxTQUFBLFFBQWtCLENBQUMsSUFBSSxPQUFPLFVBQVUsZUFBZSxHQUFHLEdBQUcsS0FBSyxFQUFFLEdBQUcsSUFBSSxPQUFPLFVBQVUsZUFBZSxLQUFLLEdBQUcsS0FBSyxFQUFFLENBQUM7QUFFakksRUFBTUEsU0FBQSxlQUF1QixJQUFJLE9BQU8sVUFBVSxVQUFVLEdBQUcsR0FBRyxLQUFLLEdBQUc7QUFBQSxHQWxCcEU7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQ0E7QUFHRixNQUFlLFdBQThEO0FBQUEsRUFBNUY7QUFDSSxTQUFPLGtCQUEyRDtBQUNsRSxTQUFPLFVBQXlCLENBQUM7QUFDakMsU0FBVSxjQUF3QixDQUFDO0FBQUE7QUFBQSxFQUU1QixPQUFPLEtBQStCLE9BQXFCO0FBQzlELGFBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxRQUFRLFFBQVEsS0FBSztBQUMxQyxXQUFLLFFBQVEsQ0FBQyxFQUFFLE9BQU8sS0FBSztBQUFBLElBQ2hDO0FBRUEsV0FBTSxLQUFLLFlBQVksVUFBVSxHQUFHO0FBQ2hDLGVBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxRQUFRLFFBQVEsS0FBSztBQUMxQyxZQUFJLEtBQUssUUFBUSxDQUFDLEVBQUUsTUFBTSxLQUFLLFlBQVksQ0FBQyxHQUFHO0FBQzNDLGVBQUssUUFBUSxDQUFDLEVBQUUsUUFBUTtBQUN4QixlQUFLLFFBQVEsT0FBTyxHQUFHLENBQUM7QUFDeEI7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUNBLFdBQUssWUFBWSxPQUFPLEdBQUcsQ0FBQztBQUFBLElBQ2hDO0FBR0EsYUFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLFFBQVEsUUFBUSxLQUFLO0FBQzFDLFdBQUssUUFBUSxDQUFDLEVBQUUsS0FBSyxLQUFLLEtBQUs7QUFBQSxJQUNuQztBQUNBLFFBQUksNkNBQUksQ0FBQyxPQUFPO0FBQ1osV0FBSyxtQkFBbUIsR0FBRztBQUFBLElBQy9CO0FBQUEsRUFDSjtBQUFBLEVBRU8sYUFBYSxJQUFrQjtBQUNsQyxTQUFLLFlBQVksS0FBSyxFQUFFO0FBQUEsRUFDNUI7QUFBQSxFQUVPLFVBQVUsSUFBcUI7QUFDbEMsV0FBTyxLQUFLLFlBQVksUUFBUSxFQUFFLE1BQU07QUFBQSxFQUM1QztBQUFBLEVBRVUsbUJBQW1CLEtBQXFDO0FBQzlELFFBQUksS0FBSztBQUNULGFBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxRQUFRLFFBQVEsS0FBSztBQUMxQyxZQUFNLFNBQW1CLEtBQUssUUFBUSxDQUFDLEVBQUUsUUFBUTtBQUNqRCxVQUFJLFVBQVU7QUFDZCxVQUFJLE9BQU8sS0FBSyxRQUFRLENBQUMsRUFBRSxRQUFRLElBQUksSUFBSSxPQUFPLENBQUMsRUFBRSxHQUFHLEtBQUssUUFBUSxDQUFDLEVBQUUsUUFBUSxJQUFJLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQztBQUNuRyxlQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sUUFBUSxLQUFLO0FBQ3BDLFlBQUksT0FBTyxLQUFLLFFBQVEsQ0FBQyxFQUFFLFFBQVEsSUFBSSxJQUFJLE9BQU8sQ0FBQyxFQUFFLEdBQUcsS0FBSyxRQUFRLENBQUMsRUFBRSxRQUFRLElBQUksSUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDO0FBQUEsTUFDdkc7QUFDQSxVQUFJLE9BQU8sS0FBSyxRQUFRLENBQUMsRUFBRSxRQUFRLElBQUksSUFBSSxPQUFPLENBQUMsRUFBRSxHQUFHLEtBQUssUUFBUSxDQUFDLEVBQUUsUUFBUSxJQUFJLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQztBQUNuRyxVQUFJLFlBQVk7QUFDaEIsVUFBSSxjQUFjLEtBQUssUUFBUSxDQUFDLEVBQUUsWUFBWSxZQUFZO0FBQzFELFVBQUksT0FBTztBQUFBLElBQ2Y7QUFDQSxRQUFJLFFBQVE7QUFBQSxFQUNoQjtBQUFBLEVBRU8sVUFBZ0I7QUFDbkIsV0FBTSxLQUFLLFFBQVEsVUFBVSxHQUFHO0FBQzVCLFdBQUssUUFBUSxDQUFDLEVBQUUsUUFBUTtBQUN4QixXQUFLLFFBQVEsT0FBTyxHQUFHLENBQUM7QUFBQSxJQUM1QjtBQUFBLEVBQ0o7QUFHSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkUyQztBQUN1QjtBQUNXO0FBQzlCO0FBQ087QUFDaEI7QUFFdEMsTUFBcUIsa0JBQXJCLE1BQXFCLHdCQUF1QixtREFBVSxDQUFDO0FBQUEsRUFHbkQsY0FBYztBQUNWLFVBQU07QUFDTixTQUFLLGtCQUFrQjtBQUN2Qix5REFBWSxDQUFDLFVBQVUsNkJBQTZCO0FBRXBELFNBQUssUUFBUSxLQUFLLElBQUksMkRBQVUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEdBQUcsQ0FBQyxtREFBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2hGLFNBQUssUUFBUSxLQUFLLElBQUksMkRBQVUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxJQUFJLEdBQUcsQ0FBQyxtREFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRzVFLGFBQVMsSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLO0FBQ3hCLFVBQUksTUFBb0IsSUFBSSwrREFBWSxDQUFDLFNBQVMsR0FBSSxLQUFLLE9BQU8sSUFBSSxNQUFPLEdBQUcsS0FBSyxLQUFLLEtBQUssbURBQU8sQ0FBQyxRQUFRO0FBQy9HLFVBQUksWUFBWTtBQUNoQixXQUFLLFFBQVEsS0FBSyxHQUFHO0FBQUEsSUFDekI7QUFHQSxhQUFTLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSztBQUN4QixVQUFJLE1BQTRCLElBQUksdUVBQW9CLENBQUMsVUFBVSxHQUFJLEtBQUssT0FBTyxJQUFJLE1BQU8sR0FBSSxLQUFLLEtBQUssT0FBTyxJQUFJLE1BQU8sR0FBRyxLQUFLLElBQUksbURBQU8sQ0FBQyxPQUFPLEdBQUc7QUFDNUosVUFBSSxZQUFZO0FBQ2hCLFdBQUssUUFBUSxLQUFLLEdBQUc7QUFBQSxJQUN6QjtBQUdBLFNBQUssUUFBUSxLQUFLLElBQUksMkRBQVUsQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxtREFBTyxDQUFDLGFBQWEsbURBQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDM0csU0FBSyxRQUFRLEtBQUssSUFBSSwyREFBVSxDQUFDLFFBQVEsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLG1EQUFPLENBQUMsYUFBYSxtREFBTyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM1RyxTQUFLLFFBQVEsS0FBSyxJQUFJLCtEQUFZLENBQUMsUUFBUSxJQUFJLEdBQUcsS0FBSyxJQUFJLG1EQUFPLENBQUMsV0FBVyxDQUFDO0FBQy9FLFNBQUssUUFBUSxLQUFLLElBQUksK0RBQVksQ0FBQyxRQUFRLElBQUksSUFBSSxLQUFLLElBQUksbURBQU8sQ0FBQyxXQUFXLENBQUM7QUFFaEYsU0FBSyxRQUFRLEtBQUssSUFBSSwyREFBVSxDQUFDLFdBQVcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLG1EQUFPLENBQUMsYUFBYSxtREFBTyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN2SCxTQUFLLFFBQVEsS0FBSyxJQUFJLDJEQUFVLENBQUMsV0FBVyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsbURBQU8sQ0FBQyxhQUFhLG1EQUFPLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3hILFNBQUssUUFBUSxLQUFLLElBQUksK0RBQVksQ0FBQyxXQUFXLElBQUksS0FBSyxJQUFJLEtBQUssbURBQU8sQ0FBQyxXQUFXLENBQUM7QUFDcEYsU0FBSyxRQUFRLEtBQUssSUFBSSwrREFBWSxDQUFDLFdBQVcsS0FBSyxLQUFLLElBQUksS0FBSyxtREFBTyxDQUFDLFdBQVcsQ0FBQztBQUVyRixTQUFLLFFBQVEsS0FBSyxJQUFJLDJEQUFVLENBQUMsV0FBVyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsbURBQU8sQ0FBQyxhQUFhLG1EQUFPLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3ZILFNBQUssUUFBUSxLQUFLLElBQUksMkRBQVUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxtREFBTyxDQUFDLGFBQWEsbURBQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDeEgsU0FBSyxRQUFRLEtBQUssSUFBSSwrREFBWSxDQUFDLFdBQVcsS0FBSyxLQUFLLElBQUksS0FBSyxtREFBTyxDQUFDLFdBQVcsQ0FBQztBQUNyRixTQUFLLFFBQVEsS0FBSyxJQUFJLCtEQUFZLENBQUMsV0FBVyxLQUFLLEtBQUssSUFBSSxLQUFLLG1EQUFPLENBQUMsV0FBVyxDQUFDO0FBRXJGLFNBQUssUUFBUSxLQUFLLElBQUksMkRBQVUsQ0FBQyxXQUFXLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxtREFBTyxDQUFDLGFBQWEsbURBQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDeEgsU0FBSyxRQUFRLEtBQUssSUFBSSwyREFBVSxDQUFDLFdBQVcsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLG1EQUFPLENBQUMsYUFBYSxtREFBTyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6SCxTQUFLLFFBQVEsS0FBSyxJQUFJLCtEQUFZLENBQUMsV0FBVyxLQUFLLEtBQUssSUFBSSxLQUFLLG1EQUFPLENBQUMsV0FBVyxDQUFDO0FBQ3JGLFNBQUssUUFBUSxLQUFLLElBQUksK0RBQVksQ0FBQyxXQUFXLEtBQUssS0FBSyxJQUFJLEtBQUssbURBQU8sQ0FBQyxXQUFXLENBQUM7QUFFckYsU0FBSyxRQUFRLEtBQUssSUFBSSx3RUFBZ0IsQ0FBQyxDQUFDO0FBQUEsRUFDNUM7QUFBQSxFQUVPLE9BQU8sS0FBK0IsT0FBcUI7QUFDOUQsYUFBUyxJQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUs7QUFDeEIsV0FBSyxRQUFRLENBQUMsRUFBRSxRQUFRLElBQUksS0FBSyxnQkFBZSxZQUFZO0FBQzVELFVBQUksS0FBSyxRQUFRLENBQUMsRUFBRSxRQUFRLElBQUksSUFBSTtBQUNoQyxhQUFLLFFBQVEsQ0FBQyxFQUFFLFFBQVEsSUFBSSxJQUFJO0FBQUEsZUFDM0IsS0FBSyxRQUFRLENBQUMsRUFBRSxRQUFRLElBQUksSUFBSTtBQUNyQyxhQUFLLFFBQVEsQ0FBQyxFQUFFLFFBQVEsSUFBSSxLQUFLO0FBQUEsSUFDekM7QUFDQSxhQUFTLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSztBQUN4QixXQUFLLFFBQVEsQ0FBQyxFQUFFLFFBQVEsSUFBSSxLQUFLLGdCQUFlLFlBQVk7QUFDNUQsVUFBSSxLQUFLLFFBQVEsQ0FBQyxFQUFFLFFBQVEsSUFBSSxJQUFJO0FBQ2hDLGFBQUssUUFBUSxDQUFDLEVBQUUsUUFBUSxJQUFJLElBQUssT0FBTyxLQUFLLE9BQU8sSUFBSSxPQUFPLE1BQU87QUFBQSxJQUM5RTtBQUNBLGFBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLO0FBQ3pCLFdBQUssUUFBUSxDQUFDLEVBQUUsUUFBUSxJQUFJLEtBQUssZ0JBQWUsWUFBWTtBQUM1RCxVQUFJLEtBQUssUUFBUSxDQUFDLEVBQUUsUUFBUSxJQUFJLElBQUksTUFBTTtBQUN0QyxhQUFLLFFBQVEsQ0FBQyxFQUFFLFFBQVEsSUFBSSxJQUFLLE9BQU8sS0FBSyxPQUFPLElBQUksT0FBTyxNQUFPO0FBQ3RFLGFBQUssUUFBUSxDQUFDLEVBQUUsUUFBUSxJQUFJLElBQUssS0FBSyxLQUFLLE9BQU8sSUFBSSxNQUFPO0FBQUEsTUFDakU7QUFBQSxJQUNKO0FBRUEsUUFBSSxZQUFZO0FBQ2hCLFFBQUksU0FBUyxHQUFHLEtBQUssS0FBSyxFQUFFO0FBQzVCLFVBQU0sT0FBTyxLQUFLLEtBQUs7QUFDdkIsU0FBSyxPQUFPLEtBQUssS0FBSztBQUFBLEVBQzFCO0FBQUEsRUFFTyxPQUFPLEtBQStCLE9BQXFCO0FBQzlELFFBQUksT0FBTztBQUNYLFFBQUksWUFBWTtBQUVoQixRQUFJLFlBQVk7QUFDaEIsUUFBSSxTQUFTLElBQUksSUFBSSxLQUFLLEVBQUU7QUFDNUIsUUFBSSxZQUFZO0FBQ2hCLFFBQUksU0FBUyw4QkFBOEIsS0FBSyxFQUFFO0FBQ2xELFFBQUksT0FBTztBQUVYLFFBQUksWUFBWTtBQUNoQixRQUFJLFNBQVMsSUFBSSxLQUFLLEtBQUssR0FBRztBQUM5QixRQUFJLFVBQVUscURBQVMsQ0FBQyxTQUFTLElBQUksR0FBRztBQUN4QyxRQUFJLFlBQVk7QUFDaEIsUUFBSSxTQUFTLGVBQWUsS0FBSyxHQUFHO0FBRXBDLFFBQUksWUFBWTtBQUNoQixRQUFJLFNBQVMsS0FBSyxLQUFLLEtBQUssR0FBRztBQUMvQixRQUFJLFVBQVUscURBQVMsQ0FBQyxTQUFTLEtBQUssR0FBRztBQUN6QyxRQUFJLFlBQVk7QUFDaEIsUUFBSSxTQUFTLGVBQWUsS0FBSyxHQUFHO0FBRXBDLFFBQUksWUFBWTtBQUNoQixRQUFJLFNBQVMsS0FBSyxLQUFLLEtBQUssR0FBRztBQUMvQixRQUFJLFVBQVUscURBQVMsQ0FBQyxTQUFTLEtBQUssR0FBRztBQUN6QyxRQUFJLFlBQVk7QUFDaEIsUUFBSSxTQUFTLGVBQWUsS0FBSyxHQUFHO0FBQUEsRUFDeEM7QUFBQSxFQUVPLGNBQTBCO0FBQzdCLFdBQU8sSUFBSSxnQkFBZTtBQUFBLEVBQzlCO0FBQ0o7QUE1R3FCLGdCQUNNLFlBQW9CO0FBRC9DLElBQXFCLGlCQUFyQjtBQVBBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBdUI7QUFDRTtBQUNEO0FBQ0M7QUFDRjtBQUNDO0FBQ1QsTUFBTSxrQkFBa0IsbURBQVUsQ0FBQztBQUFBLEVBQzlDLGNBQWM7QUFDVixVQUFNO0FBQ04sU0FBSyxrQkFBa0I7QUFDdkIseURBQVksQ0FBQyxVQUFVLHlCQUF5QjtBQUVoRCxTQUFLLFFBQVEsS0FBSyxJQUFJLG9FQUFZLENBQUMsSUFBSSxHQUFHLENBQUM7QUFDM0MsU0FBSyxRQUFRLEtBQUssSUFBSSwyREFBVSxDQUFDLFdBQVcsR0FBRyxJQUFJLElBQUksR0FBRyxDQUFDLG1EQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDN0UsU0FBSyxRQUFRLEtBQUssSUFBSSwyREFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDLG1EQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUUsU0FBSyxRQUFRLEtBQUssSUFBSSwyREFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDLG1EQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFMUUsU0FBSyxRQUFRLEtBQUssSUFBSSw0REFBVyxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsQ0FBQztBQUN4RCxTQUFLLFFBQVEsS0FBSyxJQUFJLDREQUFXLENBQUMsVUFBVSxLQUFLLEtBQUssQ0FBQyxDQUFDO0FBQ3hELFNBQUssUUFBUSxLQUFLLElBQUksNERBQVcsQ0FBQyxVQUFVLEtBQUssS0FBSyxDQUFDLENBQUM7QUFBQSxFQUM1RDtBQUFBLEVBRU8sY0FBMEI7QUFDN0IsV0FBTyxJQUFJLFVBQVU7QUFBQSxFQUN6QjtBQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCaUI7QUFFRDtBQUNLO0FBQ0Q7QUFDRDtBQUNKLE1BQWUsWUFBbUM7QUFBQSxFQUs3RCxZQUFZLElBQVksR0FBVyxHQUFXLEdBQVcsR0FBVztBQUhwRSxTQUFPLFlBQXFCO0FBSXhCLFNBQUssS0FBSztBQUNWLFFBQUksS0FBSyxLQUFLLEtBQUssRUFBRyxNQUFLLFlBQVk7QUFDdkMsU0FBSyxVQUFVLElBQUksb0RBQU8sQ0FBQyxJQUFJLG1EQUFNLENBQUMsR0FBRyxDQUFDLEdBQUc7QUFBQSxNQUN6QyxJQUFJLG1EQUFNLENBQUM7QUFBQSxNQUFHLElBQUksbURBQU0sQ0FBQyxHQUFHLENBQUM7QUFBQSxNQUM3QixJQUFJLG1EQUFNLENBQUMsR0FBRyxDQUFDO0FBQUEsTUFBRyxJQUFJLG1EQUFNLENBQUMsR0FBRyxDQUFDO0FBQUEsSUFDckMsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUVPLE9BQU8sR0FBVyxHQUFvQjtBQUN6QyxRQUFJLFdBQW9CO0FBQ3hCLFNBQUssUUFBUSxJQUFJLElBQUksSUFBSSxtREFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JDLFFBQUksV0FBcUIsSUFBSSxxREFBUSxDQUFDO0FBQ3RDLGFBQVMsSUFBSSxHQUFHLElBQUksNkNBQUksQ0FBQyxNQUFNLFFBQVEsUUFBUSxLQUFLO0FBQ2hELFVBQUksQ0FBQyw2Q0FBSSxDQUFDLE1BQU0sUUFBUSxDQUFDLEVBQUUsYUFBYSw2Q0FBSSxDQUFDLE1BQU0sUUFBUSxDQUFDLEVBQUUsTUFBTSxLQUFLLEdBQUk7QUFDN0UsZUFBUyxNQUFNO0FBQ2YsVUFBSSxnREFBRyxDQUFDLG1CQUFtQixLQUFLLFNBQVMsNkNBQUksQ0FBQyxNQUFNLFFBQVEsQ0FBQyxFQUFFLFNBQVMsUUFBUSxHQUFHO0FBQy9FLG1CQUFXO0FBQ1gsWUFBSSxRQUFpQixLQUFLLFlBQVksVUFBVSw2Q0FBSSxDQUFDLE1BQU0sUUFBUSxDQUFDLENBQUM7QUFDckUsWUFBSSxRQUFpQiw2Q0FBSSxDQUFDLE1BQU0sUUFBUSxDQUFDLEVBQUUsWUFBWSxVQUFVLElBQUk7QUFDckUsWUFBSSxTQUFTLFNBQVMsS0FBSyxVQUFXLE1BQUssUUFBUSxJQUFJLElBQUksU0FBUyxRQUFRO0FBQUEsTUFDaEY7QUFBQSxJQUNKO0FBQ0EsV0FBTztBQUFBLEVBQ1g7QUFBQSxFQUVPLFlBQVksTUFBZ0IsS0FBMkI7QUFBRSxXQUFPO0FBQUEsRUFBTTtBQUFBLEVBTXRFLFVBQWdCO0FBQUEsRUFBQztBQUM1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUNvQjtBQUVEO0FBRVU7QUFDSjtBQUNPO0FBRXpCLElBQVcsaUJBQVgsa0JBQVdDLG9CQUFYO0FBQ0gsRUFBQUEsZ0NBQUE7QUFBSSxFQUFBQSxnQ0FBQTtBQUFPLEVBQUFBLGdDQUFBO0FBQU0sRUFBQUEsZ0NBQUE7QUFESCxTQUFBQTtBQUFBO0FBSUgsTUFBTSxvQkFBb0IsdURBQVksQ0FBQztBQUFBLEVBR2xELFlBQVksSUFBWSxHQUFXLEdBQVcsWUFBNEIsR0FBRztBQUN6RSxVQUFNLElBQUksR0FBRyxHQUFHLElBQUksSUFBSSxZQUFZLGFBQWEsU0FBUyxDQUFDO0FBQzNELFNBQUssWUFBWTtBQUNqQixZQUFPLEtBQUssV0FBVztBQUFBLE1BQ3ZCLEtBQUs7QUFDRCxhQUFLLFVBQVUsSUFBSSxvREFBTyxDQUFDLElBQUksbURBQU0sQ0FBQyxHQUFHLENBQUMsR0FBRztBQUFBLFVBQ3pDLElBQUksbURBQU0sQ0FBQyxHQUFHLEVBQUU7QUFBQSxVQUFHLElBQUksbURBQU0sQ0FBQyxJQUFJLEVBQUU7QUFBQSxVQUFHLElBQUksbURBQU0sQ0FBQyxJQUFJLENBQUM7QUFBQSxRQUMzRCxDQUFDO0FBQ0Q7QUFBQSxNQUNKLEtBQUs7QUFDRCxhQUFLLFVBQVUsSUFBSSxvREFBTyxDQUFDLElBQUksbURBQU0sQ0FBQyxHQUFHLENBQUMsR0FBRztBQUFBLFVBQ3pDLElBQUksbURBQU0sQ0FBQyxHQUFHLENBQUM7QUFBQSxVQUFHLElBQUksbURBQU0sQ0FBQyxJQUFJLEVBQUU7QUFBQSxVQUFHLElBQUksbURBQU0sQ0FBQyxJQUFJLENBQUM7QUFBQSxRQUMxRCxDQUFDO0FBQ0Q7QUFBQSxNQUNKLEtBQUs7QUFDRCxhQUFLLFVBQVUsSUFBSSxvREFBTyxDQUFDLElBQUksbURBQU0sQ0FBQyxHQUFHLENBQUMsR0FBRztBQUFBLFVBQ3pDLElBQUksbURBQU0sQ0FBQyxHQUFHLENBQUM7QUFBQSxVQUFHLElBQUksbURBQU0sQ0FBQyxHQUFHLEVBQUU7QUFBQSxVQUFHLElBQUksbURBQU0sQ0FBQyxJQUFJLEVBQUU7QUFBQSxRQUMxRCxDQUFDO0FBQ0Q7QUFBQSxNQUNKO0FBQ0ksYUFBSyxVQUFVLElBQUksb0RBQU8sQ0FBQyxJQUFJLG1EQUFNLENBQUMsR0FBRyxDQUFDLEdBQUc7QUFBQSxVQUN6QyxJQUFJLG1EQUFNLENBQUMsSUFBSSxDQUFDO0FBQUEsVUFBRyxJQUFJLG1EQUFNLENBQUMsR0FBRyxFQUFFO0FBQUEsVUFBRyxJQUFJLG1EQUFNLENBQUMsSUFBSSxFQUFFO0FBQUEsUUFDM0QsQ0FBQztBQUFBLElBQ0w7QUFBQSxFQUNKO0FBQUEsRUFFTyxZQUFZLE1BQWdCLEtBQTJCO0FBQzFELFFBQUksZUFBZSw0REFBWSxFQUFFO0FBQzdCLE1BQUMsSUFBcUIsSUFBSTtBQUFBLElBQzlCO0FBQ0EsV0FBTztBQUFBLEVBQ1g7QUFBQSxFQUVBLE9BQWMsYUFBYSxLQUE2QjtBQUNwRCxVQUFNLGtCQUE0QixDQUFDLG1EQUFPLENBQUMsU0FBUyxtREFBTyxDQUFDLFlBQVksbURBQU8sQ0FBQyxXQUFXLG1EQUFPLENBQUMsU0FBUztBQUM1RyxXQUFPLGdCQUFnQixHQUFHO0FBQUEsRUFDOUI7QUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRHdCO0FBQ2pCLE1BQU0scUJBQXFCLG9EQUFXLENBQUM7QUFBQSxFQUsxQyxZQUFZLElBQVksR0FBVyxHQUFXLEdBQVcsR0FBVyxRQUFnQjtBQUNoRixVQUFNLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNwQixTQUFLLFNBQVM7QUFDZCxTQUFLLFFBQVE7QUFDYixTQUFLLFNBQVM7QUFBQSxFQUNsQjtBQUFBLEVBRU8sT0FBTyxPQUFxQjtBQUFBLEVBQUM7QUFBQSxFQUU3QixLQUFLLEtBQStCLE9BQWU7QUFDdEQsUUFBSSxVQUFVLEtBQUssT0FBTyxRQUFRLEtBQUssT0FBTyxHQUFHLEtBQUssT0FBTyxHQUFHLEtBQUssT0FBTyxHQUFHLEtBQUssT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLElBQUksR0FBRyxLQUFLLFFBQVEsSUFBSSxJQUFJLEdBQUcsS0FBSyxPQUFPLEtBQUssTUFBTTtBQUFBLEVBQ3pLO0FBQ0o7QUFFTyxNQUFNLDZCQUE2QixvREFBVyxDQUFDO0FBQUEsRUFPbEQsWUFBWSxJQUFZLEdBQVcsR0FBVyxHQUFXLEdBQVcsU0FBbUIsY0FBc0I7QUFDekcsVUFBTSxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFIeEIsU0FBUSxhQUFxQjtBQUl6QixTQUFLLFVBQVU7QUFDZixTQUFLLFFBQVE7QUFDYixTQUFLLFNBQVM7QUFDZCxTQUFLLGVBQWU7QUFBQSxFQUN4QjtBQUFBLEVBRU8sT0FBTyxPQUFxQjtBQUFBLEVBQUM7QUFBQSxFQUU3QixLQUFLLEtBQStCLE9BQWU7QUFDdEQsU0FBSyxjQUFjLEtBQUssYUFBYSxTQUFTLEtBQUs7QUFDbkQsUUFBSSxJQUFZLEtBQUssTUFBTSxLQUFLLGFBQWEsS0FBSyxRQUFRLFNBQVMsS0FBSyxZQUFZO0FBQ3BGLFFBQUksVUFBVSxLQUFLLFFBQVEsQ0FBQyxFQUFFLFFBQVEsS0FBSyxRQUFRLENBQUMsRUFBRSxHQUFHLEtBQUssUUFBUSxDQUFDLEVBQUUsR0FBRyxLQUFLLFFBQVEsQ0FBQyxFQUFFLEdBQUcsS0FBSyxRQUFRLENBQUMsRUFBRSxHQUFHLEtBQUssUUFBUSxJQUFJLElBQUksR0FBRyxLQUFLLFFBQVEsSUFBSSxJQUFJLEdBQUcsS0FBSyxPQUFPLEtBQUssTUFBTTtBQUFBLEVBQzdMO0FBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQ3dDO0FBQ3pCLE1BQU0sbUJBQW1CLG9EQUFXLENBQUM7QUFBQSxFQVFoRCxZQUFZLElBQVksR0FBVyxHQUFXLFNBQWlCLFNBQWlCLFNBQW1CLE9BQWtCLFlBQW9CLFFBQVEsQ0FBQyxFQUFFLEdBQUcsYUFBcUIsUUFBUSxDQUFDLEVBQUUsR0FBRztBQUN0TCxVQUFNLElBQUksSUFBSSxXQUFXLElBQUksWUFBWSxVQUFVLFdBQVcsVUFBVSxVQUFVO0FBSHRGLFNBQU8sUUFBa0IsQ0FBQztBQUl0QixTQUFLLFVBQVU7QUFDZixTQUFLLFVBQVU7QUFDZixTQUFLLFlBQVk7QUFDakIsU0FBSyxhQUFhO0FBQ2xCLFNBQUssYUFBYTtBQUNsQixRQUFJLFVBQVUsT0FBVyxNQUFLLFFBQVE7QUFBQSxFQUMxQztBQUFBLEVBRU8sT0FBTyxPQUFxQjtBQUFBLEVBQUM7QUFBQSxFQUU3QixLQUFLLEtBQStCLE9BQXFCO0FBQzVELGFBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxVQUFVLEtBQUssU0FBUyxLQUFLO0FBQ2xELFVBQUksU0FBaUIsS0FBSyxXQUFXLElBQUksS0FBSyxNQUFNLFNBQVMsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQzlFLFVBQUk7QUFBQSxRQUFVLE9BQU87QUFBQSxRQUFRLE9BQU87QUFBQSxRQUFHLE9BQU87QUFBQSxRQUFHLE9BQU87QUFBQSxRQUFHLE9BQU87QUFBQSxRQUM5RCxLQUFLLFFBQVEsSUFBSSxJQUFLLElBQUksS0FBSyxVQUFXLEtBQUs7QUFBQSxRQUFXLEtBQUssUUFBUSxJQUFJLElBQUksS0FBSyxNQUFNLElBQUksS0FBSyxPQUFPLElBQUksS0FBSztBQUFBLFFBQVksS0FBSztBQUFBLFFBQVcsS0FBSztBQUFBLE1BQVU7QUFBQSxJQUN0SztBQUFBLEVBQ0o7QUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QnFCO0FBQ0w7QUFDUztBQUNSO0FBQ087QUFDQTtBQUNMO0FBQ087QUFDWCxNQUFNLHNCQUFzQixvREFBVyxDQUFDO0FBQUEsRUFNbkQsWUFBWSxHQUFXLEdBQVcsSUFBWSxJQUFZLElBQVk7QUFDbEUsVUFBTSxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFOeEIsU0FBTyxLQUFhO0FBQ3BCLFNBQU8sS0FBYTtBQUNwQixTQUFPLFFBQWlCO0FBQ3hCLFNBQU8sT0FBZTtBQUlsQixTQUFLLEtBQUs7QUFDVixTQUFLLEtBQUs7QUFDVixTQUFLLE9BQU8sS0FBSyxNQUFNLEtBQUssT0FBTyxJQUFJLENBQUM7QUFDeEMsU0FBSyxZQUFZO0FBQUEsRUFDckI7QUFBQSxFQUVPLE9BQU8sT0FBcUI7QUFDL0IsUUFBSSxLQUFLLE1BQU87QUFFaEIsU0FBSyxNQUFNLHFEQUFZLENBQUMsVUFBVTtBQUNsQyxRQUFJLEtBQUssS0FBSyxHQUFHO0FBQ2IsV0FBSyxNQUFNO0FBQ1gsVUFBSSxLQUFLLEtBQUssRUFBRyxNQUFLLEtBQUs7QUFBQSxJQUMvQixXQUFXLEtBQUssS0FBSyxHQUFHO0FBQ3BCLFdBQUssTUFBTTtBQUNYLFVBQUksS0FBSyxLQUFLLEVBQUcsTUFBSyxLQUFLO0FBQUEsSUFDL0I7QUFDQSxRQUFJLEtBQUssT0FBTyxLQUFLLElBQUksS0FBSyxFQUFFLEdBQUc7QUFDL0IsV0FBSyxLQUFLO0FBQ1YsV0FBSyxLQUFLO0FBQ1YsV0FBSyxRQUFRO0FBQUEsSUFDakI7QUFBQSxFQUNKO0FBQUEsRUFFTyxPQUFPLEdBQVcsR0FBb0I7QUFDekMsUUFBSSxXQUFvQjtBQUN4QixTQUFLLFFBQVEsSUFBSSxJQUFJLElBQUksbURBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQyxRQUFJLFdBQXFCLElBQUkscURBQVEsQ0FBQztBQUN0QyxhQUFTLElBQUksR0FBRyxJQUFJLDZDQUFJLENBQUMsTUFBTSxRQUFRLFFBQVEsS0FBSztBQUNoRCxVQUFJLENBQUMsNkNBQUksQ0FBQyxNQUFNLFFBQVEsQ0FBQyxFQUFFLGFBQWEsNkNBQUksQ0FBQyxNQUFNLFFBQVEsQ0FBQyxFQUFFLE1BQU0sS0FBSyxHQUFJO0FBQzdFLGVBQVMsTUFBTTtBQUNmLFVBQUksZ0RBQUcsQ0FBQyxtQkFBbUIsS0FBSyxTQUFTLDZDQUFJLENBQUMsTUFBTSxRQUFRLENBQUMsRUFBRSxTQUFTLFFBQVEsR0FBRztBQUMvRSxZQUFJLFFBQWlCLEtBQUssWUFBWSxVQUFVLDZDQUFJLENBQUMsTUFBTSxRQUFRLENBQUMsQ0FBQztBQUNyRSxxREFBSSxDQUFDLE1BQU0sUUFBUSxDQUFDLEVBQUUsWUFBWSxVQUFVLElBQUk7QUFDaEQsWUFBSSxPQUFPO0FBQ1AsZUFBSyxRQUFRLElBQUksSUFBSSxTQUFTLFFBQVE7QUFDdEMscUJBQVc7QUFBQSxRQUNmO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFDQSxXQUFPO0FBQUEsRUFDWDtBQUFBLEVBRU8sWUFBWSxNQUFnQixLQUEyQjtBQUMxRCxRQUFJLGVBQWUscURBQVksQ0FBRSxRQUFPO0FBQ3hDLFFBQUksZUFBZSxvREFBVyxDQUFFLFFBQU8sS0FBSyxPQUFPLElBQUk7QUFDdkQsV0FBTztBQUFBLEVBQ1g7QUFBQSxFQUVPLEtBQUssS0FBK0IsT0FBcUI7QUFDNUQsUUFBSSxVQUFVLHFEQUFTLENBQUMsTUFBTSxLQUFLLE9BQU8sR0FBRyxJQUFJLEdBQUcsR0FBRyxLQUFLLFFBQVEsSUFBSSxJQUFJLEdBQUcsS0FBSyxRQUFRLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQy9HO0FBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEV5QjtBQUVEO0FBQ1A7QUFDTztBQUNFO0FBQ1gsTUFBTSxxQkFBcUIsb0RBQVcsQ0FBQztBQUFBLEVBSWxELFlBQVksR0FBVyxHQUFXLFdBQW1CLElBQVk7QUFDN0QsVUFBTSxJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBSmpDLFNBQVUsWUFBb0I7QUFLMUIsU0FBSyxZQUFZO0FBQUEsRUFDckI7QUFBQSxFQUVPLE9BQU8sT0FBcUI7QUFDL0IsU0FBSyxPQUFPLEtBQUssWUFBWSxNQUFNLE9BQU8sQ0FBQztBQUFBLEVBQy9DO0FBQUEsRUFFTyxZQUFZLE1BQWdCLEtBQTJCO0FBQzFELFFBQUksZUFBZSxvREFBVyxDQUFFLFFBQU87QUFDdkMsUUFBSSxlQUFlLHFEQUFZLENBQUUsUUFBTztBQUN4QyxpREFBSSxDQUFDLE1BQU0sYUFBYSxLQUFLLEVBQUU7QUFDL0IsV0FBTztBQUFBLEVBQ1g7QUFBQSxFQUVPLEtBQUssS0FBK0IsT0FBcUI7QUFDNUQsU0FBSyxhQUFhLEtBQUssWUFBWSxTQUFTO0FBQzVDLFFBQUksVUFBVSxxREFBUyxDQUFDLFFBQVEsS0FBSyxNQUFNLEtBQUssWUFBWSxHQUFJLElBQUksR0FBRyxLQUFLLEdBQUcsSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUM7QUFBQSxFQUN0SjtBQUNKOzs7Ozs7Ozs7Ozs7Ozs7OztBQzlCOEI7QUFDWTtBQUUzQixNQUFNLHlCQUF5QixxREFBWSxDQUFDO0FBQUEsRUFHdkQsWUFBWSxJQUFZLEtBQUssSUFBWSxLQUFLLEtBQWEsZUFBZTtBQUN0RSxVQUFNLEdBQUcsR0FBRyxFQUFFO0FBSGxCLFNBQU8sZUFBdUI7QUFJMUIsU0FBSyxZQUFZO0FBQ2pCLFNBQUssV0FBVztBQUNoQixTQUFLLEtBQUssT0FBTztBQUFBLEVBQ3JCO0FBQUEsRUFFTyxPQUFPLE9BQXFCO0FBQy9CLFFBQUksNkNBQUksQ0FBQyxhQUFhLFlBQVksR0FBRztBQUNqQyxVQUFJLEtBQUssa0JBQWtCLEdBQUc7QUFDMUIsYUFBSyxnQkFBZ0IsS0FBSyxlQUFlLEtBQUs7QUFBQSxNQUNsRDtBQUFBLElBQ0osTUFBTyxNQUFLLGVBQWU7QUFDM0IsUUFBSSw2Q0FBSSxDQUFDLGFBQWEsV0FBVyxHQUFHO0FBQ2hDLFVBQUksS0FBSyxpQkFBaUIsR0FBRztBQUN6QixhQUFLLGdCQUFnQixLQUFLLGVBQWUsSUFBSSxLQUFLO0FBQUEsTUFDdEQ7QUFBQSxJQUNKLE1BQU8sTUFBSyxjQUFjO0FBRTFCLFFBQUksNkNBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRztBQUN4QixVQUFJLEtBQUssa0JBQWtCO0FBQ3ZCLGFBQUssTUFBTTtBQUFBLElBQ25CLE1BQU8sTUFBSyxlQUFlO0FBRTNCLFFBQUksNkNBQUksQ0FBQyxhQUFhLE9BQU8sS0FBSyw2Q0FBSSxDQUFDLGFBQWEsR0FBRyxHQUFHO0FBQ3RELFVBQUksS0FBSyxpQkFBaUI7QUFDdEIscURBQUksQ0FBQyxTQUFTLEtBQUssWUFBWTtBQUFBLElBQ3ZDLE1BQU8sTUFBSyxjQUFjO0FBRTFCLFFBQUksWUFBWSxNQUFNLEtBQUssZUFBZSxLQUFLO0FBQy9DLFFBQUksS0FBSyxLQUFLLElBQUksS0FBSyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksU0FBUyxHQUFHLHFEQUFZLENBQUMsV0FBVyxJQUFJLEtBQUs7QUFFN0YsU0FBSyxPQUFPLEtBQUssUUFBUSxJQUFJLElBQUksWUFBWSxDQUFDLEtBQUssSUFBSSxDQUFDO0FBQUEsRUFDNUQ7QUFBQSxFQUVPLE1BQVk7QUFBQSxFQUFDO0FBQ3hCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFDcUI7QUFDTDtBQUNTO0FBQ1I7QUFDTztBQUNBO0FBRUw7QUFDTztBQUNYLE1BQU0sb0JBQW9CLG9EQUFXLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBZ0JqRCxZQUFZLEdBQVcsR0FBVyxJQUFZLElBQVksTUFBYyxJQUFZO0FBQ2hGLFVBQU0sSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBaEJ4QixTQUFPLEtBQWE7QUFDcEIsU0FBTyxLQUFhO0FBQ3BCLFNBQU8sT0FBZTtBQUN0QixTQUFPLGNBQXNCO0FBY3pCLFNBQUssS0FBSztBQUNWLFNBQUssS0FBSztBQUNWLFNBQUssT0FBTztBQUNaLFNBQUssWUFBWTtBQUNqQixRQUFJLEtBQUssUUFBUSxLQUFLLEtBQUssUUFBUSxHQUFHO0FBQ2xDLFdBQUssY0FBYyxLQUFLLE1BQU0sS0FBSyxPQUFPLElBQUksRUFBRTtBQUFBLElBQ3BEO0FBQUEsRUFDSjtBQUFBLEVBRU8sT0FBTyxPQUFxQjtBQUMvQixTQUFLLE1BQU0scURBQVksQ0FBQyxVQUFVLEtBQUssSUFBSSxPQUFPLEdBQUc7QUFDckQsUUFBSSxLQUFLLEtBQUssR0FBRztBQUNiLFdBQUssTUFBTTtBQUNYLFVBQUksS0FBSyxLQUFLLEVBQUcsTUFBSyxLQUFLO0FBQUEsSUFDL0IsV0FBVyxLQUFLLEtBQUssR0FBRztBQUNwQixXQUFLLE1BQU07QUFDWCxVQUFJLEtBQUssS0FBSyxFQUFHLE1BQUssS0FBSztBQUFBLElBQy9CO0FBQ0EsU0FBSyxPQUFPLEtBQUssSUFBSSxLQUFLLEVBQUU7QUFBQSxFQUNoQztBQUFBLEVBRU8sT0FBTyxHQUFXLEdBQW9CO0FBQ3pDLFFBQUksV0FBb0I7QUFDeEIsUUFBSSxXQUFvQixLQUFLLFFBQVEsUUFBUTtBQUM3QyxTQUFLLFFBQVEsSUFBSSxJQUFJLElBQUksbURBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQyxRQUFJLFdBQXFCLElBQUkscURBQVEsQ0FBQztBQUN0QyxhQUFTLElBQUksR0FBRyxJQUFJLDZDQUFJLENBQUMsTUFBTSxRQUFRLFFBQVEsS0FBSztBQUNoRCxVQUFJLENBQUMsNkNBQUksQ0FBQyxNQUFNLFFBQVEsQ0FBQyxFQUFFLGFBQWEsNkNBQUksQ0FBQyxNQUFNLFFBQVEsQ0FBQyxFQUFFLE1BQU0sS0FBSyxHQUFJO0FBQzdFLGVBQVMsTUFBTTtBQUNmLFVBQUksZ0RBQUcsQ0FBQyxtQkFBbUIsS0FBSyxTQUFTLDZDQUFJLENBQUMsTUFBTSxRQUFRLENBQUMsRUFBRSxTQUFTLFFBQVEsR0FBRztBQUMvRSxZQUFJLFFBQWlCLEtBQUssWUFBWSxVQUFVLDZDQUFJLENBQUMsTUFBTSxRQUFRLENBQUMsQ0FBQztBQUNyRSxxREFBSSxDQUFDLE1BQU0sUUFBUSxDQUFDLEVBQUUsWUFBWSxVQUFVLElBQUk7QUFDaEQsWUFBSSxPQUFPO0FBQ1AsZUFBSyxRQUFRLElBQUksSUFBSSxTQUFTLFFBQVE7QUFDdEMscUJBQVc7QUFDWCxjQUFJLFdBQW9CLDZDQUFJLENBQUMsTUFBTSxRQUFRLENBQUMsRUFBRSxRQUFRLFFBQVE7QUFDOUQsY0FBSSxTQUFTLElBQUksSUFBSSxTQUFTLE9BQU8sQ0FBQyxFQUFFLEtBQUssU0FBUyxJQUFJLEtBQ25ELFNBQVMsSUFBSSxLQUFLLFNBQVMsSUFBSSxJQUFJLFNBQVMsT0FBTyxDQUFDLEVBQUUsR0FBRztBQUM1RCxpQkFBSyxNQUFNO0FBQUEsVUFDZixPQUFPO0FBQ0gsaUJBQUssTUFBTTtBQUFBLFVBQ2Y7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFDQSxXQUFPO0FBQUEsRUFDWDtBQUFBLEVBRU8sWUFBWSxNQUFnQixLQUEyQjtBQUMxRCxRQUFJLGVBQWUscURBQVksSUFBSSxlQUFlLG9EQUFXLENBQUUsUUFBTztBQUN0RSxXQUFPO0FBQUEsRUFDWDtBQUFBLEVBRU8sS0FBSyxLQUErQixPQUFxQjtBQUM1RCxZQUFPLEtBQUssTUFBTTtBQUFBLE1BQ2xCLEtBQUs7QUFDRCxZQUFJLFVBQVUscURBQVMsQ0FBQyxNQUFNLEtBQUssY0FBYyxHQUFHLEdBQUcsR0FBRyxHQUFHLEtBQUssUUFBUSxJQUFJLElBQUksR0FBRyxLQUFLLFFBQVEsSUFBSSxHQUFHLEdBQUcsQ0FBQztBQUM3RztBQUFBLE1BQ0osS0FBSztBQUNELFlBQUksVUFBVSxxREFBUyxDQUFDLE1BQU0sS0FBSyxjQUFjLEdBQUcsR0FBRyxHQUFHLEdBQUcsS0FBSyxRQUFRLElBQUksSUFBSSxHQUFHLEtBQUssUUFBUSxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQzdHO0FBQUEsTUFDSixLQUFLO0FBQ0QsWUFBSSxVQUFVLHFEQUFTLENBQUMsTUFBTSxHQUFHLElBQUksSUFBSSxJQUFJLEtBQUssUUFBUSxJQUFJLEdBQUcsS0FBSyxRQUFRLElBQUksR0FBRyxJQUFJLEVBQUU7QUFDM0Y7QUFBQSxNQUNKLEtBQUs7QUFDRCxZQUFJLFVBQVUscURBQVMsQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLElBQUksS0FBSyxRQUFRLElBQUksR0FBRyxLQUFLLFFBQVEsSUFBSSxHQUFHLElBQUksRUFBRTtBQUM1RjtBQUFBLE1BQ0osS0FBSztBQUNELFlBQUksVUFBVSxxREFBUyxDQUFDLE1BQU0sSUFBSSxJQUFJLEdBQUcsR0FBRyxLQUFLLFFBQVEsSUFBSSxHQUFHLEtBQUssUUFBUSxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQ3hGO0FBQUEsTUFDSixLQUFLO0FBQ0QsWUFBSSxVQUFVLHFEQUFTLENBQUMsTUFBTSxJQUFJLElBQUksR0FBRyxHQUFHLEtBQUssUUFBUSxJQUFJLEdBQUcsS0FBSyxRQUFRLElBQUksR0FBRyxHQUFHLENBQUM7QUFDeEY7QUFBQSxNQUNKLEtBQUs7QUFDRCxZQUFJLFVBQVUscURBQVMsQ0FBQyxNQUFNLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxRQUFRLElBQUksSUFBSSxHQUFHLEtBQUssUUFBUSxJQUFJLElBQUksR0FBRyxHQUFHLENBQUM7QUFDaEc7QUFBQSxNQUNKLEtBQUs7QUFDRCxZQUFJLFVBQVUscURBQVMsQ0FBQyxNQUFNLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxRQUFRLElBQUksSUFBSSxHQUFHLEtBQUssUUFBUSxJQUFJLElBQUksR0FBRyxHQUFHLENBQUM7QUFBQSxJQUNwRztBQUFBLEVBQ0o7QUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzR2lCO0FBQ087QUFDQztBQUMyQjtBQUNqQztBQUNPO0FBQ0Y7QUFDQztBQUNMO0FBQ2U7QUFDTjtBQUM3QixNQUFxQixnQkFBckIsTUFBcUIsc0JBQXFCLG9EQUFXLENBQUM7QUFBQSxFQWlCbEQsWUFBWSxHQUFXLEdBQVcsS0FBYSxVQUFVO0FBQ3JELFVBQU0sSUFBSSxHQUFHLEdBQUcsSUFBSSxFQUFFO0FBZDFCLFNBQU8sYUFBcUI7QUFDNUIsU0FBTyxtQkFBMkI7QUFFbEMsU0FBTyxlQUF1QjtBQUM5QixTQUFPLGNBQXNCO0FBQzdCLFNBQU8sY0FBc0I7QUFDN0IsU0FBTyxlQUF1QjtBQUU5QixTQUFPLEtBQWE7QUFDcEIsU0FBTyxLQUFhO0FBQ3BCLFNBQU8sV0FBb0I7QUFDM0IsU0FBTyxpQkFBeUI7QUFJNUIsU0FBSyxVQUFVLElBQUksb0RBQU8sQ0FBQyxJQUFJLG1EQUFNLENBQUMsR0FBRyxDQUFDLEdBQUc7QUFBQSxNQUN6QyxJQUFJLG1EQUFNLENBQUMsR0FBRyxFQUFFO0FBQUEsTUFBRyxJQUFJLG1EQUFNLENBQUMsR0FBRyxFQUFFO0FBQUEsTUFDbkMsSUFBSSxtREFBTSxDQUFDLElBQUksRUFBRTtBQUFBLE1BQUcsSUFBSSxtREFBTSxDQUFDLElBQUksRUFBRTtBQUFBLElBQ3pDLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFFTyxPQUFPLE9BQXFCO0FBQy9CLFNBQUssTUFBTSxjQUFhLFVBQVU7QUFDbEMsU0FBSyxLQUFLO0FBRVYsUUFBSSw2Q0FBSSxDQUFDLGFBQWEsWUFBWSxHQUFHO0FBQ2pDLFdBQUs7QUFDTCxVQUFJLEtBQUssZUFBZSxLQUFLLEtBQUssZUFBZSxLQUFLLGFBQWE7QUFDL0QsYUFBSyxLQUFLLGNBQWEsV0FBVztBQUFBLE1BQ3RDO0FBQUEsSUFDSixNQUFPLE1BQUssZUFBZTtBQUMzQixRQUFJLDZDQUFJLENBQUMsYUFBYSxXQUFXLEdBQUc7QUFDaEMsV0FBSztBQUNMLFVBQUksS0FBSyxnQkFBZ0IsS0FBSyxLQUFLLGNBQWMsS0FBSyxjQUFjO0FBQ2hFLGFBQUssS0FBSyxDQUFDLGNBQWEsV0FBVztBQUFBLE1BQ3ZDO0FBQUEsSUFDSixNQUFPLE1BQUssY0FBYztBQUUxQixRQUFJLDZDQUFJLENBQUMsYUFBYSxHQUFHLEdBQUc7QUFDeEIsVUFBSSxLQUFLLGtCQUFrQjtBQUN2QixhQUFLLE1BQU07QUFBQSxJQUNuQixNQUFPLE1BQUssZUFBZTtBQUUzQixTQUFLLDZDQUFJLENBQUMsYUFBYSxPQUFPLEtBQUssNkNBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxLQUFLLGtCQUFrQixLQUFLLEtBQUssZUFBZSxJQUFJO0FBQy9HLFVBQUksS0FBSyxlQUFlLEdBQUc7QUFDdkIsYUFBSztBQUNMLFlBQUksS0FBSyxrQkFBa0IsRUFBRyxzREFBWSxDQUFDLEtBQUssU0FBUyx5QkFBeUI7QUFBQSxZQUM3RSxzREFBWSxDQUFDLEtBQUssU0FBUyx5QkFBeUI7QUFBQSxNQUM3RDtBQUNBLFdBQUssZUFBZTtBQUNwQixVQUFJLEtBQUssY0FBYyxLQUFLO0FBQ3hCLFlBQUksS0FBSyxrQkFBa0IsRUFBRyxNQUFLLEtBQUssT0FBTztBQUFBLFlBQzFDLE1BQUssS0FBSyxPQUFPO0FBQUEsTUFDMUI7QUFBQSxJQUNKLE1BQU8sTUFBSyxjQUFjO0FBRTFCLFFBQUksS0FBSyxNQUFNLEVBQUcsTUFBSyxtQkFBbUIsS0FBSyxLQUFLLEtBQUssRUFBRTtBQUMzRCxTQUFLLEtBQUssS0FBSyxJQUFJLEtBQUssSUFBSSxLQUFLLElBQUksTUFBTSxHQUFHLE9BQU87QUFDckQsUUFBSSxjQUF1QixJQUFJLG1EQUFNLENBQUMsRUFBRyxLQUFLLEtBQUssUUFBUSxHQUFHO0FBQzlELFNBQUssV0FBVztBQUNoQixRQUFJLEtBQUssT0FBTyxLQUFLLElBQUksS0FBSyxFQUFFLEdBQUc7QUFDL0IsVUFBSSxLQUFLLEtBQUssS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLFlBQVksR0FBRztBQUVwRCxhQUFLLEtBQUs7QUFDVixhQUFLLFdBQVc7QUFDaEIsYUFBSyxpQkFBaUI7QUFBQSxNQUMxQjtBQUFBLElBQ0o7QUFDQSxRQUFJLENBQUMsS0FBSyxZQUFZLEtBQUssaUJBQWlCLEVBQUcsTUFBSyxpQkFBaUI7QUFBQSxFQUN6RTtBQUFBLEVBRU8sUUFBYztBQUNqQixRQUFJLFdBQW1CLFdBQVcsc0VBQWtCLENBQUM7QUFDckQseURBQVksQ0FBQyxLQUFLLFVBQVUsd0JBQXdCLEVBQUUsVUFBVSxPQUFLO0FBQUUsMkRBQVksQ0FBQyxRQUFRLFFBQVE7QUFBQSxJQUFHO0FBQ3ZHLGlEQUFJLENBQUMsTUFBTSxRQUFRO0FBQUEsTUFDZixJQUFJLHFEQUFZO0FBQVosUUFBYSxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssS0FBSyxLQUFLO0FBQUEsUUFBa0IsS0FBSyxRQUFRLElBQUksSUFBSTtBQUFBLFFBQ3hGLEtBQUs7QUFBQSxRQUFrQjtBQUFBLE1BQzNCO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQUVPLE1BQVk7QUFDZixRQUFJLDZDQUFJLENBQUMsTUFBTSxVQUFVLEtBQUssRUFBRSxFQUFHO0FBQ25DLGlEQUFJLENBQUMsTUFBTSxhQUFhLEtBQUssRUFBRTtBQUMvQixRQUFJLFNBQWlCLEtBQUssUUFBUSxZQUFZLEVBQUUsSUFBSSxLQUFLLFFBQVEsR0FBRztBQUNwRSxhQUFTLElBQUksR0FBRyxJQUFJLEtBQUssS0FBSztBQUMxQixtREFBSSxDQUFDLE1BQU0sUUFBUTtBQUFBLFFBQUssSUFBSSxzREFBYTtBQUFiLFVBQWMsT0FBTztBQUFBLFVBQUcsT0FBTztBQUFBLFVBQ25ELEtBQUssSUFBSSxLQUFLLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSTtBQUFBLFVBQUcsS0FBSyxJQUFJLEtBQUssS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJO0FBQUEsVUFDckcsV0FBVyxLQUFLLEtBQUssTUFBTTtBQUFBLFFBQy9CO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFDQSxhQUFTLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHO0FBQzNCLGVBQVMsSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLElBQUksSUFBSSxLQUFLO0FBQ3RDLHFEQUFJLENBQUMsTUFBTSxRQUFRO0FBQUEsVUFBSyxJQUFJLG9EQUFXO0FBQVgsWUFBWSxPQUFPO0FBQUEsWUFBRyxPQUFPO0FBQUEsWUFDakQsS0FBSyxJQUFJLEtBQUssT0FBTyxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLElBQUk7QUFBQSxZQUFHLEtBQUssSUFBSSxLQUFLLE9BQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJO0FBQUEsWUFDbkg7QUFBQSxZQUFHLFNBQVMsS0FBSyxLQUFLLE9BQU8sSUFBSTtBQUFBLFVBQ3JDO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQ0EseURBQVksQ0FBQyxVQUFVLDZCQUE2QixLQUFLO0FBQ3pELFFBQUksZUFBNkIsSUFBSSx3REFBWSxDQUFDLGlCQUFpQixNQUFNLEtBQUssTUFBTSxJQUFJLEtBQUssS0FBSyxtREFBTyxDQUFDLFlBQVk7QUFDdEgsaUJBQWEsWUFBWTtBQUN6QixpREFBSSxDQUFDLE1BQU0sUUFBUSxLQUFLLFlBQVk7QUFBQSxFQUN4QztBQUFBLEVBRU8sS0FBSyxLQUErQixPQUFxQjtBQUM1RCxTQUFLLGNBQWMsS0FBSyxhQUFhLFNBQVM7QUFDOUMsUUFBSSxZQUFvQixLQUFLLE1BQU0sS0FBSyxhQUFhLElBQUksR0FBSTtBQUM3RCxRQUFJLFlBQW9CLEtBQUssTUFBTSxLQUFLLGFBQWEsSUFBSSxHQUFJO0FBRTdELFFBQUksS0FBSztBQUNULFFBQUksS0FBSyxvQkFBb0IsSUFBSTtBQUM3QixVQUFJLFVBQVUsNkNBQUksQ0FBQyxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksSUFBSSxHQUFHLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQztBQUNoRixVQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ2YsVUFBSSxVQUFVLDZDQUFJLENBQUMsT0FBTyxTQUFTLEtBQUssUUFBUSxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQztBQUFBLElBQzFFLE9BQU87QUFDSCxVQUFJLFVBQVUsS0FBSyxRQUFRLElBQUksSUFBSSxHQUFHLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQztBQUFBLElBQ2hFO0FBRUEsUUFBSSxLQUFLLEtBQUssR0FBRztBQUViLFVBQUksS0FBSyxlQUFlLEtBQUssS0FBSyxjQUFjLE1BQU07QUFDbEQsWUFBSSxVQUFVLG1FQUFlLENBQUMscURBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxFQUFFO0FBQUEsTUFDaEYsV0FBVyxLQUFLLGVBQWUsS0FBSyxLQUFLLGNBQWMsTUFBTTtBQUN6RCxZQUFJLFVBQVUsbUVBQWUsQ0FBQyxxREFBUyxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLEVBQUU7QUFBQSxNQUNqRixPQUFPO0FBQ0gsWUFBSSxVQUFVLG1FQUFlLENBQUMscURBQVMsQ0FBQyxRQUFTLFlBQVksSUFBSyxLQUFLLElBQUksSUFBSSxJQUFJLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxFQUFFO0FBQUEsTUFDeEc7QUFBQSxJQUNKLFdBQVcsQ0FBQyxLQUFLLFVBQVU7QUFFdkIsVUFBSSxVQUFVLG1FQUFlLENBQUMscURBQVMsQ0FBQyxRQUFTLFlBQVksSUFBSyxJQUFJLElBQUksSUFBSSxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksRUFBRTtBQUFBLElBQ25HLFdBQVcsS0FBSyxNQUFNLEdBQUc7QUFFckIsVUFBSSxVQUFVLG1FQUFlLENBQUMscURBQVMsQ0FBQyxRQUFTLFlBQVksSUFBSyxJQUFJLElBQUksSUFBSSxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksRUFBRTtBQUFBLElBQ25HLE9BQU87QUFFSCxVQUFJLFVBQVUsbUVBQWUsQ0FBQyxxREFBUyxDQUFDLFFBQVEsWUFBWSxJQUFJLEdBQUcsSUFBSSxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksRUFBRTtBQUFBLElBQzVGO0FBQ0EsUUFBSSxRQUFRO0FBQUEsRUFDaEI7QUFDSjtBQWxKcUIsY0FDTSxXQUFtQjtBQUR6QixjQUVNLFVBQWtCO0FBRjdDLElBQXFCLGVBQXJCO0FBWEE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNHTyxTQUFTLHFCQUE2QjtBQUN6QyxTQUFPLHFCQUFxQixRQUFRLFFBQVEsQ0FBQyxNQUFNO0FBQy9DLFVBQU0sSUFBSSxLQUFLLE1BQU0sS0FBSyxPQUFPLElBQUksRUFBRTtBQUN2QyxXQUFPLEVBQUUsU0FBUyxFQUFFO0FBQUEsRUFDeEIsQ0FBQztBQUNMO0FBRUEsTUFBTSxlQUFrQyxTQUFTLGVBQWUsZUFBZTtBQUMvRSxNQUFNLGFBQXVDLE1BQU07QUFDL0MsTUFBSSxNQUFNLGFBQWEsV0FBVyxJQUFJO0FBQ3RDLE1BQUksd0JBQXdCO0FBQzVCLFNBQU87QUFDWCxHQUFHO0FBV0ksU0FBUyxnQkFBZ0IsT0FBMEIsSUFBWSxJQUFZLElBQVksSUFBK0I7QUFDekgsZUFBYSxRQUFRO0FBQ3JCLGVBQWEsU0FBUztBQUN0QixZQUFVLFVBQVUsR0FBRyxHQUFHLGFBQWEsT0FBTyxhQUFhLE1BQU07QUFDakUsWUFBVSxVQUFVLE9BQU8sSUFBSSxJQUFJLElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSSxFQUFFO0FBQ3ZELFNBQU87QUFDWDs7Ozs7OztVQ2hDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VDNUJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0EsRTs7O1VDUEEseUY7OztVQ0FBO1VBQ0E7VUFDQSxzREFBc0QsaUJBQWlCO1VBQ3ZFLGdEQUFnRCxhQUFhO1VBQzdELEU7Ozs7Ozs7Ozs7OztBQ0pBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU8wQztBQUNoQjtBQUUxQixTQUFTLE1BQU0sV0FBZ0M7QUFDM0MsTUFBSSxDQUFDLFNBQVM7QUFDVixpREFBSSxDQUFDLE9BQU8sU0FBUztBQUN6QixTQUFPLHNCQUFzQixLQUFLO0FBQ3RDO0FBQ0EsT0FBTyxzQkFBc0IsS0FBSztBQUVsQyxZQUFZLFNBQVMsR0FBRztBQUNwQiwrQ0FBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLElBQUksVUFBVSxJQUFJLEVBQUUsSUFBSSxZQUFZLElBQUksRUFBRSxLQUFLLElBQUk7QUFDckUsdURBQVksQ0FBQyxZQUFZO0FBQzdCO0FBQ0EsVUFBVSxTQUFTLEdBQUc7QUFBRSwrQ0FBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLElBQUksVUFBVSxJQUFJLEVBQUUsSUFBSSxZQUFZLElBQUksRUFBRSxLQUFLLEtBQUs7QUFBRyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9BdWRpb01hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NhbWVyYS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvR2FtZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0FUL0JveC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0FUL1BvbHlnb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NBVC9SZXNwb25zZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0FUL1NBVC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU0FUL1ZlY3Rvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU3ByaXRlTWFuYWdlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGV2ZWxzL0Jhc2ljTGV2ZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xldmVscy9TYXZlU2VsZWN0TWVudS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGV2ZWxzL1Rlc3RMZXZlbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9CYXNpY09iamVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9TcGlrZU9iamVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9TcHJpdGVPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdHMvVGlsZU9iamVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9wbGF5ZXIvQmxvb2RQYXJ0aWNsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9wbGF5ZXIvQnVsbGV0T2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL3BsYXllci9GYWtlUGxheWVyT2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3RzL3BsYXllci9HaWJQYXJ0aWNsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0cy9wbGF5ZXIvUGxheWVyT2JqZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9Db21tb25VdGlscy50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9zcmMvTWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBBdWRpb01hbmFnZXIge1xyXG4gICAgcHVibGljIHN0YXRpYyBhdWRpb01hcDogTWFwPHN0cmluZywgSFRNTEF1ZGlvRWxlbWVudD4gPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBwbGF5KGtleTogc3RyaW5nLCBzcmM/OiBzdHJpbmcsIGxvb3A6IGJvb2xlYW4gPSBmYWxzZSwgdm9sdW1lOiBudW1iZXIgPSAxLjApOiBIVE1MQXVkaW9FbGVtZW50IHtcclxuICAgICAgICBsZXQgYXVkaW86IEhUTUxBdWRpb0VsZW1lbnQgfCB1bmRlZmluZWQgPSBBdWRpb01hbmFnZXIuYXVkaW9NYXAuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYgKGF1ZGlvICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgYXVkaW8ucGxheSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gYXVkaW87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzcmMgPT09IHVuZGVmaW5lZCkgYXVkaW8gPSBuZXcgQXVkaW8oKTtcclxuICAgICAgICBlbHNlIGF1ZGlvID0gbmV3IEF1ZGlvKHNyYyk7XHJcbiAgICAgICAgYXVkaW8ubG9vcCA9IGxvb3A7XHJcbiAgICAgICAgYXVkaW8udm9sdW1lID0gdm9sdW1lO1xyXG4gICAgICAgIEF1ZGlvTWFuYWdlci5hdWRpb01hcC5zZXQoa2V5LCBhdWRpbyk7XHJcbiAgICAgICAgYXVkaW8ub25jYW5wbGF5ID0gZSA9PiB7XHJcbiAgICAgICAgICAgIGF1ZGlvIS5wbGF5KCkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihlcnIpO1xyXG4gICAgICAgICAgICAgICAgYXVkaW8hLnNldEF0dHJpYnV0ZSgnbXV0ZWQnLCAnJyk7XHJcbiAgICAgICAgICAgICAgICBhdWRpbyEubXV0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYXVkaW8hLm9uY2FucGxheSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhdWRpbztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHBsYXlNdXNpYyhzcmM6IHN0cmluZywgbG9vcDogYm9vbGVhbiA9IHRydWUpOiBIVE1MQXVkaW9FbGVtZW50IHtcclxuICAgICAgICBsZXQgYXVkaW86IEhUTUxBdWRpb0VsZW1lbnQgfCB1bmRlZmluZWQgPSBBdWRpb01hbmFnZXIuYXVkaW9NYXAuZ2V0KFwiX211c2ljXCIpO1xyXG4gICAgICAgIGlmIChhdWRpbyAhPT0gdW5kZWZpbmVkICYmICFhdWRpby5zcmMuZW5kc1dpdGgoc3JjKSkge1xyXG4gICAgICAgICAgICBBdWRpb01hbmFnZXIucmVsZWFzZShcIl9tdXNpY1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEF1ZGlvTWFuYWdlci5wbGF5KFwiX211c2ljXCIsIHNyYywgbG9vcCwgMC43NSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBwYXVzZShrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBhdWRpbzogSFRNTEF1ZGlvRWxlbWVudCB8IHVuZGVmaW5lZCA9IEF1ZGlvTWFuYWdlci5hdWRpb01hcC5nZXQoa2V5KTtcclxuICAgICAgICBpZiAoYXVkaW8gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBhdWRpby5wYXVzZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVsZWFzZShrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChBdWRpb01hbmFnZXIucGF1c2Uoa2V5KSkge1xyXG4gICAgICAgICAgICBBdWRpb01hbmFnZXIuYXVkaW9NYXAuZ2V0KGtleSk/LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gQXVkaW9NYW5hZ2VyLmF1ZGlvTWFwLmRlbGV0ZShrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXV0b1BsYXlGaXhlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHN0YXRpYyBhdXRvUGxheUZpeCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIUF1ZGlvTWFuYWdlci5hdXRvUGxheUZpeGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIlRyeWluZyB0byBmaXggYXV0b3BsYXkuLi5cIik7XHJcbiAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5hdXRvUGxheUZpeGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgQXVkaW9NYW5hZ2VyLmF1ZGlvTWFwLmZvckVhY2goKHZhbCwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsLm11dGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsLnJlbW92ZUF0dHJpYnV0ZSgnbXV0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YWwubXV0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ID09IFwiX211c2ljXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsLnBsYXkoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEF1ZGlvTWFuYWdlci5hdXRvUGxheUZpeGVkKSBjb25zb2xlLndhcm4oZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF1ZGlvTWFuYWdlci5hdXRvUGxheUZpeGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwuc2V0QXR0cmlidXRlKCdtdXRlZCcsICcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbC5tdXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FtZXJhIHtcclxuICAgIHB1YmxpYyB4OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHk6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgc2l6ZVg6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgc2l6ZVk6IG51bWJlciA9IDE7XHJcbn0iLCJpbXBvcnQgQmFzaWNMZXZlbCBmcm9tICcuL2xldmVscy9CYXNpY0xldmVsJztcclxuaW1wb3J0IENhbWVyYSBmcm9tICcuL0NhbWVyYSc7XHJcbmltcG9ydCBTYXZlU2VsZWN0TWVudSBmcm9tICcuL2xldmVscy9TYXZlU2VsZWN0TWVudSc7XHJcbmltcG9ydCBUZXN0TGV2ZWwgZnJvbSAnLi9sZXZlbHMvVGVzdExldmVsJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIERFQlVHOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgc3RhdGljIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW4tY2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgcHVibGljIHN0YXRpYyBsYXN0VGltZXN0YW1wOiBET01IaWdoUmVzVGltZVN0YW1wID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBsZXZlbDogQmFzaWNMZXZlbCA9IG5ldyBTYXZlU2VsZWN0TWVudSgpO1xyXG4gICAgcHVibGljIHN0YXRpYyBjYW1lcmE6IENhbWVyYSA9IG5ldyBDYW1lcmEoKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGtleU1hcDogTWFwPHN0cmluZywgYm9vbGVhbj4gPSBuZXcgTWFwPHN0cmluZywgYm9vbGVhbj4oKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgaXNQdXNoaW5nUmVsb2FkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB1cGRhdGUodGltZXN0YW1wOiBET01IaWdoUmVzVGltZVN0YW1wKSB7XHJcbiAgICAgICAgR2FtZS5ERUJVRyA9IEdhbWUuaXNCdXR0b25Eb3duKFwiRjJcIik7XHJcbiAgICAgICAgLy8gUmVzaXplIGtlZXBpbmcgYXNwZWN0IHJhdGlvXHJcbiAgICAgICAgbGV0IHBhZ2VBc3BlY3RSYXRpbyA9IGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGggLyBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodDtcclxuICAgICAgICBsZXQgc2NhbGUgPSBNYXRoLmZsb29yKDI1IC8gMTkgPCBwYWdlQXNwZWN0UmF0aW8gPyBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCAvIDE5IDogZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aCAvIDI1KTtcclxuXHRcdGlmICgoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXNjcmV0ZS1zY2FsZS1jaGVja2JveFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5jaGVja2VkKVxyXG5cdFx0XHRzY2FsZSA9IE1hdGgubWF4KDEgPDwgKDMxIC0gTWF0aC5jbHozMihzY2FsZSkpLCAxKTtcdC8vIFNldCBzY2FsZSB0byBhIHBvd2VyIG9mIHR3b1xyXG4gICAgICAgIEdhbWUuY2FudmFzLndpZHRoID0gc2NhbGUgKiAyNTtcclxuICAgICAgICBHYW1lLmNhbnZhcy5oZWlnaHQgPSBzY2FsZSAqIDE5O1xyXG4gICAgICAgIC8vIEdldCBjb250ZXh0IGFuZCBjbGVhclxyXG4gICAgICAgIGxldCBjdHggPSBHYW1lLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiwge2Rlc3luY2hyb25pemVkOiB0cnVlLCBhbHBoYTogZmFsc2V9KSE7XHJcbiAgICAgICAgY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBHYW1lLmxldmVsLmJhY2tncm91bmRTdHlsZSB8fCBcIiMwMDAwMDBcIjtcclxuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgR2FtZS5jYW52YXMud2lkdGgsIEdhbWUuY2FudmFzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgY3R4LnRyYW5zbGF0ZShHYW1lLmNhbWVyYS54LCBHYW1lLmNhbWVyYS55KTtcclxuICAgICAgICBjdHguc2NhbGUoR2FtZS5jYW1lcmEuc2l6ZVggKiAoR2FtZS5jYW52YXMud2lkdGggLyA4MDApLCBHYW1lLmNhbWVyYS5zaXplWSAqIChHYW1lLmNhbnZhcy5oZWlnaHQgLyA2MDgpKTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBHYW1lLmxldmVsLnVwZGF0ZShjdHgsICh0aW1lc3RhbXAgLSBHYW1lLmxhc3RUaW1lc3RhbXApIC8gMTAwMCk7XHJcbiAgICAgICAgfSBjYXRjaChlOiB1bmtub3duKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcblxyXG4gICAgICAgIC8vIFJlbG9hZCBsZXZlbFxyXG4gICAgICAgIGlmIChHYW1lLmlzQnV0dG9uRG93bigncicpKSB7XHJcbiAgICAgICAgICAgIGlmICghR2FtZS5pc1B1c2hpbmdSZWxvYWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZFNhdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBHYW1lLmlzUHVzaGluZ1JlbG9hZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIEdhbWUuaXNQdXNoaW5nUmVsb2FkID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgR2FtZS5sYXN0VGltZXN0YW1wID0gdGltZXN0YW1wO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbG9hZFNhdmUoc2F2ZT86IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubGV2ZWwuZGlzcG9zZSgpO1xyXG4gICAgICAgIHRoaXMubGV2ZWwgPSBuZXcgVGVzdExldmVsKCk7IC8vVE9ET1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNCdXR0b25Eb3duKGtleU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChrZXlOYW1lLmxlbmd0aCA9PSAxKSBrZXlOYW1lID0ga2V5TmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHJldHVybiBHYW1lLmtleU1hcC5nZXQoa2V5TmFtZSkgPz8gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IFZlY3RvciBmcm9tICcuL1ZlY3Rvcic7XHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4vUG9seWdvbic7XHJcblxyXG4vKipcclxuICogIyMgQm94XHJcbiAqIFxyXG4gKiBSZXByZXNlbnRzIGFuIGF4aXMtYWxpZ25lZCBib3gsIHdpdGggYSB3aWR0aCBhbmQgaGVpZ2h0LlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm94IHtcclxuICBwdWJsaWMgcG9zOiBWZWN0b3I7XHJcbiAgcHVibGljIHc6IG51bWJlcjtcclxuICBwdWJsaWMgaDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgbmV3IEJveCwgd2l0aCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uLCB3aWR0aCwgYW5kIGhlaWdodC5cclxuICAgKiBcclxuICAgKiBJZiBubyBwb3NpdGlvbiBpcyBnaXZlbiwgdGhlIHBvc2l0aW9uIHdpbGwgYmUgYCgwLCAwKWAuIElmIG5vIHdpZHRoIG9yIGhlaWdodCBhcmUgZ2l2ZW4sIHRoZXkgd2lsbFxyXG4gICAqIGJlIHNldCB0byBgMGAuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IFtwb3M9bmV3IFZlY3RvcigpXSBBIFZlY3RvciByZXByZXNlbnRpbmcgdGhlIGJvdHRvbS1sZWZ0IG9mIHRoZSBib3goaS5lLiB0aGUgc21hbGxlc3QgeCBhbmQgc21hbGxlc3QgeSB2YWx1ZSkuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFt3PTBdIFRoZSB3aWR0aCBvZiB0aGUgQm94LlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbaD0wXSBUaGUgaGVpZ2h0IG9mIHRoZSBCb3guXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IocG9zID0gbmV3IFZlY3RvcigpLCB3ID0gMCwgaCA9IDApIHtcclxuICAgIHRoaXMucG9zID0gcG9zO1xyXG4gICAgdGhpcy53ID0gdztcclxuICAgIHRoaXMuaCA9IGg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGEgUG9seWdvbiB3aG9zZSBlZGdlcyBhcmUgdGhlIHNhbWUgYXMgdGhpcyBCb3guXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IEEgbmV3IFBvbHlnb24gdGhhdCByZXByZXNlbnRzIHRoaXMgQm94LlxyXG4gICAqL1xyXG4gIHB1YmxpYyB0b1BvbHlnb24oKTogUG9seWdvbiB7XHJcbiAgICBjb25zdCBwb3MgPSB0aGlzLnBvcztcclxuICAgIGNvbnN0IHcgPSB0aGlzLnc7XHJcbiAgICBjb25zdCBoID0gdGhpcy5oO1xyXG5cclxuICAgIHJldHVybiBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHBvcy54LCBwb3MueSksIFtcclxuICAgICAgbmV3IFZlY3RvcigpLCBuZXcgVmVjdG9yKHcsIDApLFxyXG4gICAgICBuZXcgVmVjdG9yKHcsIGgpLCBuZXcgVmVjdG9yKDAsIGgpXHJcbiAgICBdKTtcclxuICB9XHJcbn0iLCJpbXBvcnQgVmVjdG9yIGZyb20gJy4vVmVjdG9yJztcclxuaW1wb3J0IEJveCBmcm9tICcuL0JveCc7XHJcblxyXG4vKipcclxuICogIyMgUG9seWdvblxyXG4gKiBcclxuICogUmVwcmVzZW50cyBhICpjb252ZXgqIHBvbHlnb24gd2l0aCBhbnkgbnVtYmVyIG9mIHBvaW50cyAoc3BlY2lmaWVkIGluIGNvdW50ZXItY2xvY2t3aXNlIG9yZGVyKS5cclxuICogXHJcbiAqIE5vdGU6IERvIF9ub3RfIG1hbnVhbGx5IGNoYW5nZSB0aGUgYHBvaW50c2AsIGBhbmdsZWAsIG9yIGBvZmZzZXRgIHByb3BlcnRpZXMuIFVzZSB0aGUgcHJvdmlkZWQgXHJcbiAqIHNldHRlcnMuIE90aGVyd2lzZSB0aGUgY2FsY3VsYXRlZCBwcm9wZXJ0aWVzIHdpbGwgbm90IGJlIHVwZGF0ZWQgY29ycmVjdGx5LlxyXG4gKiBcclxuICogYHBvc2AgY2FuIGJlIGNoYW5nZWQgZGlyZWN0bHkuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2x5Z29uIHtcclxuICBwdWJsaWMgcG9zOiBWZWN0b3I7XHJcbiAgcHVibGljIGFuZ2xlOiBudW1iZXIgPSAwO1xyXG4gIHB1YmxpYyBvZmZzZXQ6IFZlY3RvciA9IG5ldyBWZWN0b3IoKTtcclxuICBwdWJsaWMgcG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gW107XHJcbiAgcHVibGljIGNhbGNQb2ludHM6IEFycmF5PFZlY3Rvcj4gPSBbXTtcclxuICBwdWJsaWMgZWRnZXM6IEFycmF5PFZlY3Rvcj4gPSBbXTtcclxuICBwdWJsaWMgbm9ybWFsczogQXJyYXk8VmVjdG9yPiA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBuZXcgcG9seWdvbiwgcGFzc2luZyBpbiBhIHBvc2l0aW9uIHZlY3RvciwgYW5kIGFuIGFycmF5IG9mIHBvaW50cyAocmVwcmVzZW50ZWQgYnkgdmVjdG9ycyBcclxuICAgKiByZWxhdGl2ZSB0byB0aGUgcG9zaXRpb24gdmVjdG9yKS4gSWYgbm8gcG9zaXRpb24gaXMgcGFzc2VkIGluLCB0aGUgcG9zaXRpb24gb2YgdGhlIHBvbHlnb24gd2lsbCBiZSBgKDAsMClgLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBbcG9zPVZlY3Rvcl0gQSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBvcmlnaW4gb2YgdGhlIHBvbHlnb24gKGFsbCBvdGhlciBwb2ludHMgYXJlIHJlbGF0aXZlIHRvIHRoaXMgb25lKVxyXG4gICAqIEBwYXJhbSB7QXJyYXk8VmVjdG9yPn0gW3BvaW50cz1bXV0gQW4gYXJyYXkgb2YgdmVjdG9ycyByZXByZXNlbnRpbmcgdGhlIHBvaW50cyBpbiB0aGUgcG9seWdvbiwgaW4gY291bnRlci1jbG9ja3dpc2Ugb3JkZXIuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IocG9zID0gbmV3IFZlY3RvcigpLCBwb2ludHM6IEFycmF5PFZlY3Rvcj4gPSBbXSkge1xyXG4gICAgdGhpcy5wb3MgPSBwb3M7XHJcbiAgICB0aGlzLnNldFBvaW50cyhwb2ludHMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBwb2ludHMgb2YgdGhlIHBvbHlnb24uIEFueSBjb25zZWN1dGl2ZSBkdXBsaWNhdGUgcG9pbnRzIHdpbGwgYmUgY29tYmluZWQuXHJcbiAgICogXHJcbiAgICogTm90ZTogVGhlIHBvaW50cyBhcmUgY291bnRlci1jbG9ja3dpc2UgKndpdGggcmVzcGVjdCB0byB0aGUgY29vcmRpbmF0ZSBzeXN0ZW0qLiBJZiB5b3UgZGlyZWN0bHkgZHJhdyB0aGUgcG9pbnRzIG9uIGEgc2NyZWVuIFxyXG4gICAqIHRoYXQgaGFzIHRoZSBvcmlnaW4gYXQgdGhlIHRvcC1sZWZ0IGNvcm5lciBpdCB3aWxsIF9hcHBlYXJfIHZpc3VhbGx5IHRoYXQgdGhlIHBvaW50cyBhcmUgYmVpbmcgc3BlY2lmaWVkIGNsb2Nrd2lzZS4gVGhpcyBpcyBcclxuICAgKiBqdXN0IGJlY2F1c2Ugb2YgdGhlIGludmVyc2lvbiBvZiB0aGUgWS1heGlzIHdoZW4gYmVpbmcgZGlzcGxheWVkLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7QXJyYXk8VmVjdG9yPn0gcG9pbnRzIEFuIGFycmF5IG9mIHZlY3RvcnMgcmVwcmVzZW50aW5nIHRoZSBwb2ludHMgaW4gdGhlIHBvbHlnb24sIGluIGNvdW50ZXItY2xvY2t3aXNlIG9yZGVyLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXRQb2ludHMocG9pbnRzOiBBcnJheTxWZWN0b3I+KTogUG9seWdvbiB7XHJcbiAgICAvLyBPbmx5IHJlLWFsbG9jYXRlIGlmIHRoaXMgaXMgYSBuZXcgcG9seWdvbiBvciB0aGUgbnVtYmVyIG9mIHBvaW50cyBoYXMgY2hhbmdlZC5cclxuICAgIGNvbnN0IGxlbmd0aENoYW5nZWQgPSAhdGhpcy5wb2ludHMgfHwgdGhpcy5wb2ludHMubGVuZ3RoICE9PSBwb2ludHMubGVuZ3RoO1xyXG5cclxuICAgIGlmIChsZW5ndGhDaGFuZ2VkKSB7XHJcbiAgICAgIGxldCBpO1xyXG5cclxuICAgICAgY29uc3QgY2FsY1BvaW50czogQXJyYXk8VmVjdG9yPiA9IHRoaXMuY2FsY1BvaW50cyA9IFtdO1xyXG4gICAgICBjb25zdCBlZGdlczogQXJyYXk8VmVjdG9yPiA9IHRoaXMuZWRnZXMgPSBbXTtcclxuICAgICAgY29uc3Qgbm9ybWFsczogQXJyYXk8VmVjdG9yPiA9IHRoaXMubm9ybWFscyA9IFtdO1xyXG5cclxuICAgICAgLy8gQWxsb2NhdGUgdGhlIHZlY3RvciBhcnJheXMgZm9yIHRoZSBjYWxjdWxhdGVkIHByb3BlcnRpZXNcclxuICAgICAgZm9yIChpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vIFJlbW92ZSBjb25zZWN1dGl2ZSBkdXBsaWNhdGUgcG9pbnRzXHJcbiAgICAgICAgY29uc3QgcDEgPSBwb2ludHNbaV07XHJcbiAgICAgICAgY29uc3QgcDIgPSBpIDwgcG9pbnRzLmxlbmd0aCAtIDEgPyBwb2ludHNbaSArIDFdIDogcG9pbnRzWzBdO1xyXG5cclxuICAgICAgICBpZiAocDEgIT09IHAyICYmIHAxLnggPT09IHAyLnggJiYgcDEueSA9PT0gcDIueSkge1xyXG4gICAgICAgICAgcG9pbnRzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgIGkgLT0gMTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FsY1BvaW50cy5wdXNoKG5ldyBWZWN0b3IoKSk7XHJcbiAgICAgICAgZWRnZXMucHVzaChuZXcgVmVjdG9yKCkpO1xyXG4gICAgICAgIG5vcm1hbHMucHVzaChuZXcgVmVjdG9yKCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wb2ludHMgPSBwb2ludHM7XHJcblxyXG4gICAgdGhpcy5fcmVjYWxjKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGN1cnJlbnQgcm90YXRpb24gYW5nbGUgb2YgdGhlIHBvbHlnb24uXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIFRoZSBjdXJyZW50IHJvdGF0aW9uIGFuZ2xlIChpbiByYWRpYW5zKS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgc2V0QW5nbGUoYW5nbGU6IG51bWJlcik6IFBvbHlnb24ge1xyXG4gICAgdGhpcy5hbmdsZSA9IGFuZ2xlO1xyXG5cclxuICAgIHRoaXMuX3JlY2FsYygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBjdXJyZW50IG9mZnNldCB0byBhcHBseSB0byB0aGUgYHBvaW50c2AgYmVmb3JlIGFwcGx5aW5nIHRoZSBgYW5nbGVgIHJvdGF0aW9uLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvZmZzZXQgVGhlIG5ldyBvZmZzZXQgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXRPZmZzZXQob2Zmc2V0OiBWZWN0b3IpOiBQb2x5Z29uIHtcclxuICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xyXG5cclxuICAgIHRoaXMuX3JlY2FsYygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUm90YXRlcyB0aGlzIFBvbHlnb24gY291bnRlci1jbG9ja3dpc2UgYXJvdW5kIHRoZSBvcmlnaW4gb2YgKml0cyBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSogKGkuZS4gYHBvc2ApLlxyXG4gICAqIFxyXG4gICAqIE5vdGU6IFRoaXMgY2hhbmdlcyB0aGUgKipvcmlnaW5hbCoqIHBvaW50cyAoc28gYW55IGBhbmdsZWAgd2lsbCBiZSBhcHBsaWVkIG9uIHRvcCBvZiB0aGlzIHJvdGF0aW9uKS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgVGhlIGFuZ2xlIHRvIHJvdGF0ZSAoaW4gcmFkaWFucykuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHJvdGF0ZShhbmdsZTogbnVtYmVyKTogUG9seWdvbiB7XHJcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLnBvaW50cztcclxuICAgIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykgcG9pbnRzW2ldLnJvdGF0ZShhbmdsZSk7XHJcblxyXG4gICAgdGhpcy5fcmVjYWxjKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmFuc2xhdGVzIHRoZSBwb2ludHMgb2YgdGhpcyBwb2x5Z29uIGJ5IGEgc3BlY2lmaWVkIGFtb3VudCByZWxhdGl2ZSB0byB0aGUgb3JpZ2luIG9mICppdHMgb3duIGNvb3JkaW5hdGUgc3lzdGVtKiAoaS5lLiBgcG9zYCkuXHJcbiAgICogXHJcbiAgICogTm90ZTogVGhpcyBjaGFuZ2VzIHRoZSAqKm9yaWdpbmFsKiogcG9pbnRzIChzbyBhbnkgYG9mZnNldGAgd2lsbCBiZSBhcHBsaWVkIG9uIHRvcCBvZiB0aGlzIHRyYW5zbGF0aW9uKVxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IFRoZSBob3Jpem9udGFsIGFtb3VudCB0byB0cmFuc2xhdGUuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgVGhlIHZlcnRpY2FsIGFtb3VudCB0byB0cmFuc2xhdGUuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHRyYW5zbGF0ZSh4OiBudW1iZXIsIHk6IG51bWJlcik6IFBvbHlnb24ge1xyXG4gICAgY29uc3QgcG9pbnRzID0gdGhpcy5wb2ludHM7XHJcbiAgICBjb25zdCBsZW4gPSBwb2ludHMubGVuZ3RoO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgcG9pbnRzW2ldLnggKz0geDtcclxuICAgICAgcG9pbnRzW2ldLnkgKz0geTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9yZWNhbGMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXB1dGVzIHRoZSBjYWxjdWxhdGVkIGNvbGxpc2lvbiBQb2x5Z29uLlxyXG4gICAqIFxyXG4gICAqIFRoaXMgYXBwbGllcyB0aGUgYGFuZ2xlYCBhbmQgYG9mZnNldGAgdG8gdGhlIG9yaWdpbmFsIHBvaW50cyB0aGVuIHJlY2FsY3VsYXRlcyB0aGUgZWRnZXMgYW5kIG5vcm1hbHMgb2YgdGhlIGNvbGxpc2lvbiBQb2x5Z29uLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcmVjYWxjKCk6IFBvbHlnb24ge1xyXG4gICAgLy8gQ2FsY3VsYXRlZCBwb2ludHMgLSB0aGlzIGlzIHdoYXQgaXMgdXNlZCBmb3IgdW5kZXJseWluZyBjb2xsaXNpb25zIGFuZCB0YWtlcyBpbnRvIGFjY291bnRcclxuICAgIC8vIHRoZSBhbmdsZS9vZmZzZXQgc2V0IG9uIHRoZSBwb2x5Z29uLlxyXG4gICAgY29uc3QgY2FsY1BvaW50cyA9IHRoaXMuY2FsY1BvaW50cztcclxuXHJcbiAgICAvLyBUaGUgZWRnZXMgaGVyZSBhcmUgdGhlIGRpcmVjdGlvbiBvZiB0aGUgYG5gdGggZWRnZSBvZiB0aGUgcG9seWdvbiwgcmVsYXRpdmUgdG9cclxuICAgIC8vIHRoZSBgbmB0aCBwb2ludC4gSWYgeW91IHdhbnQgdG8gZHJhdyBhIGdpdmVuIGVkZ2UgZnJvbSB0aGUgZWRnZSB2YWx1ZSwgeW91IG11c3RcclxuICAgIC8vIGZpcnN0IHRyYW5zbGF0ZSB0byB0aGUgcG9zaXRpb24gb2YgdGhlIHN0YXJ0aW5nIHBvaW50LlxyXG4gICAgY29uc3QgZWRnZXMgPSB0aGlzLmVkZ2VzO1xyXG5cclxuICAgIC8vIFRoZSBub3JtYWxzIGhlcmUgYXJlIHRoZSBkaXJlY3Rpb24gb2YgdGhlIG5vcm1hbCBmb3IgdGhlIGBuYHRoIGVkZ2Ugb2YgdGhlIHBvbHlnb24sIHJlbGF0aXZlXHJcbiAgICAvLyB0byB0aGUgcG9zaXRpb24gb2YgdGhlIGBuYHRoIHBvaW50LiBJZiB5b3Ugd2FudCB0byBkcmF3IGFuIGVkZ2Ugbm9ybWFsLCB5b3UgbXVzdCBmaXJzdFxyXG4gICAgLy8gdHJhbnNsYXRlIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgc3RhcnRpbmcgcG9pbnQuXHJcbiAgICBjb25zdCBub3JtYWxzID0gdGhpcy5ub3JtYWxzO1xyXG5cclxuICAgIC8vIENvcHkgdGhlIG9yaWdpbmFsIHBvaW50cyBhcnJheSBhbmQgYXBwbHkgdGhlIG9mZnNldC9hbmdsZVxyXG4gICAgY29uc3QgcG9pbnRzID0gdGhpcy5wb2ludHM7XHJcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLm9mZnNldDtcclxuICAgIGNvbnN0IGFuZ2xlID0gdGhpcy5hbmdsZTtcclxuXHJcbiAgICBjb25zdCBsZW4gPSBwb2ludHMubGVuZ3RoO1xyXG4gICAgbGV0IGk7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGNhbGNQb2ludCA9IGNhbGNQb2ludHNbaV0uY29weShwb2ludHNbaV0pO1xyXG5cclxuICAgICAgY2FsY1BvaW50LnggKz0gb2Zmc2V0Lng7XHJcbiAgICAgIGNhbGNQb2ludC55ICs9IG9mZnNldC55O1xyXG5cclxuICAgICAgaWYgKGFuZ2xlICE9PSAwKSBjYWxjUG9pbnQucm90YXRlKGFuZ2xlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgdGhlIGVkZ2VzL25vcm1hbHNcclxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBjb25zdCBwMSA9IGNhbGNQb2ludHNbaV07XHJcbiAgICAgIGNvbnN0IHAyID0gaSA8IGxlbiAtIDEgPyBjYWxjUG9pbnRzW2kgKyAxXSA6IGNhbGNQb2ludHNbMF07XHJcblxyXG4gICAgICBjb25zdCBlID0gZWRnZXNbaV0uY29weShwMikuc3ViKHAxKTtcclxuXHJcbiAgICAgIG5vcm1hbHNbaV0uY29weShlKS5wZXJwKCkubm9ybWFsaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb21wdXRlIHRoZSBheGlzLWFsaWduZWQgYm91bmRpbmcgYm94LlxyXG4gICAqIFxyXG4gICAqIEFueSBjdXJyZW50IHN0YXRlICh0cmFuc2xhdGlvbnMvcm90YXRpb25zKSB3aWxsIGJlIGFwcGxpZWQgYmVmb3JlIGNvbnN0cnVjdGluZyB0aGUgQUFCQi5cclxuICAgKiBcclxuICAgKiBOb3RlOiBSZXR1cm5zIGEgX25ld18gYFBvbHlnb25gIGVhY2ggdGltZSB5b3UgY2FsbCB0aGlzLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIEFBQkIuXHJcbiAgICovXHJcbiAgcHVibGljIGdldEFBQkIoKTogUG9seWdvbiB7XHJcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLmNhbGNQb2ludHM7XHJcblxyXG4gICAgbGV0IHhNaW4gPSBwb2ludHNbMF0ueDtcclxuICAgIGxldCB5TWluID0gcG9pbnRzWzBdLnk7XHJcblxyXG4gICAgbGV0IHhNYXggPSBwb2ludHNbMF0ueDtcclxuICAgIGxldCB5TWF4ID0gcG9pbnRzWzBdLnk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgcG9pbnQgPSBwb2ludHNbaV07XHJcblxyXG4gICAgICBpZiAocG9pbnQueCA8IHhNaW4pIHhNaW4gPSBwb2ludC54O1xyXG4gICAgICBlbHNlIGlmIChwb2ludC54ID4geE1heCkgeE1heCA9IHBvaW50Lng7XHJcblxyXG4gICAgICBpZiAocG9pbnQueSA8IHlNaW4pIHlNaW4gPSBwb2ludC55O1xyXG4gICAgICBlbHNlIGlmIChwb2ludC55ID4geU1heCkgeU1heCA9IHBvaW50Lnk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBCb3godGhpcy5wb3MuY2xvbmUoKS5hZGQobmV3IFZlY3Rvcih4TWluLCB5TWluKSksIHhNYXggLSB4TWluLCB5TWF4IC0geU1pbikudG9Qb2x5Z29uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb21wdXRlIHRoZSBjZW50cm9pZCAoZ2VvbWV0cmljIGNlbnRlcikgb2YgdGhlIFBvbHlnb24uXHJcbiAgICogXHJcbiAgICogQW55IGN1cnJlbnQgc3RhdGUgKHRyYW5zbGF0aW9ucy9yb3RhdGlvbnMpIHdpbGwgYmUgYXBwbGllZCBiZWZvcmUgY29tcHV0aW5nIHRoZSBjZW50cm9pZC5cclxuICAgKiBcclxuICAgKiBTZWUgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ2VudHJvaWQjQ2VudHJvaWRfb2ZfYV9wb2x5Z29uXHJcbiAgICogXHJcbiAgICogTm90ZTogUmV0dXJucyBhIF9uZXdfIGBWZWN0b3JgIGVhY2ggdGltZSB5b3UgY2FsbCB0aGlzLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgYSBWZWN0b3IgdGhhdCBjb250YWlucyB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIGNlbnRyb2lkLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRDZW50cm9pZCgpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgcG9pbnRzID0gdGhpcy5jYWxjUG9pbnRzO1xyXG4gICAgY29uc3QgbGVuID0gcG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICBsZXQgY3ggPSAwO1xyXG4gICAgbGV0IGN5ID0gMDtcclxuICAgIGxldCBhciA9IDA7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBjb25zdCBwMSA9IHBvaW50c1tpXTtcclxuICAgICAgY29uc3QgcDIgPSBpID09PSBsZW4gLSAxID8gcG9pbnRzWzBdIDogcG9pbnRzW2kgKyAxXTsgLy8gTG9vcCBhcm91bmQgaWYgbGFzdCBwb2ludFxyXG5cclxuICAgICAgY29uc3QgYSA9IHAxLnggKiBwMi55IC0gcDIueCAqIHAxLnk7XHJcblxyXG4gICAgICBjeCArPSAocDEueCArIHAyLngpICogYTtcclxuICAgICAgY3kgKz0gKHAxLnkgKyBwMi55KSAqIGE7XHJcbiAgICAgIGFyICs9IGE7XHJcbiAgICB9XHJcblxyXG4gICAgYXIgPSBhciAqIDM7IC8vIHdlIHdhbnQgMSAvIDYgdGhlIGFyZWEgYW5kIHdlIGN1cnJlbnRseSBoYXZlIDIqYXJlYVxyXG4gICAgY3ggPSBjeCAvIGFyO1xyXG4gICAgY3kgPSBjeSAvIGFyO1xyXG4gICAgXHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcihjeCwgY3kpO1xyXG4gIH1cclxufSIsImltcG9ydCBWZWN0b3IgZnJvbSAnLi9WZWN0b3InO1xyXG5cclxuLyoqXHJcbiAqICMjIFJlc3BvbnNlXHJcbiAqIFxyXG4gKiBBbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSByZXN1bHQgb2YgYW4gaW50ZXJzZWN0aW9uLiBDb250YWluczpcclxuICogLSBUaGUgdHdvIG9iamVjdHMgcGFydGljaXBhdGluZyBpbiB0aGUgaW50ZXJzZWN0aW9uXHJcbiAqIC0gVGhlIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIG1pbmltdW0gY2hhbmdlIG5lY2Vzc2FyeSB0byBleHRyYWN0IHRoZSBmaXJzdCBvYmplY3QgZnJvbSB0aGUgc2Vjb25kIG9uZSAoYXMgd2VsbCBhcyBhIHVuaXQgdmVjdG9yIGluIHRoYXQgZGlyZWN0aW9uIGFuZCB0aGUgbWFnbml0dWRlIG9mIHRoZSBvdmVybGFwKVxyXG4gKiAtIFdoZXRoZXIgdGhlIGZpcnN0IG9iamVjdCBpcyBlbnRpcmVseSBpbnNpZGUgdGhlIHNlY29uZCwgYW5kIHZpY2UgdmVyc2EuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNwb25zZSB7XHJcbiAgcHVibGljIGE6IGFueSA9IG51bGw7XHJcbiAgcHVibGljIGI6IGFueSA9IG51bGw7XHJcbiAgcHVibGljIG92ZXJsYXBOID0gbmV3IFZlY3RvcigpO1xyXG4gIHB1YmxpYyBvdmVybGFwViA9IG5ldyBWZWN0b3IoKTtcclxuXHJcbiAgcHVibGljIGFJbkI6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHB1YmxpYyBiSW5BOiBib29sZWFuID0gdHJ1ZTtcclxuICBwdWJsaWMgb3ZlcmxhcDogbnVtYmVyID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHNvbWUgdmFsdWVzIG9mIHRoZSByZXNwb25zZSBiYWNrIHRvIHRoZWlyIGRlZmF1bHRzLlxyXG4gICAqIFxyXG4gICAqIENhbGwgdGhpcyBiZXR3ZWVuIHRlc3RzIGlmIHlvdSBhcmUgZ29pbmcgdG8gcmV1c2UgYSBzaW5nbGUgUmVzcG9uc2Ugb2JqZWN0IGZvciBtdWx0aXBsZSBpbnRlcnNlY3Rpb24gdGVzdHMgKHJlY29tbWVuZGVkIGFzIGl0IHdpbGwgYXZvaWQgYWxsY2F0aW5nIGV4dHJhIG1lbW9yeSlcclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UmVzcG9uc2V9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIGNsZWFyKCk6IFJlc3BvbnNlIHtcclxuICAgIHRoaXMuYUluQiA9IHRydWU7XHJcbiAgICB0aGlzLmJJbkEgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMub3ZlcmxhcCA9IE51bWJlci5NQVhfVkFMVUU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG59IiwiLyohXHJcbiogc2F0LWpzIChvciBTQVQuanMpIG1hZGUgYnkgSmltIFJpZWNrZW4gYW5kIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxyXG4qIE1vZGlmaWVkIGJ5IFJvYmVydCBDb3Jwb25vaSBhbmQgbWUgKFNvbm9QRylcclxuKiBDaGFuZ2VzIG1hZGUgYnkgbWU6IEJ1ZyBmaXhlcyBhbmQgY29udmVyc2lvbiB0byBUeXBlU2NyaXB0XHJcbiovXHJcblxyXG5pbXBvcnQgQm94IGZyb20gJy4vQm94JztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuL1ZlY3Rvcic7XHJcbmltcG9ydCBDaXJjbGUgZnJvbSAnLi9DaXJjbGUnO1xyXG5pbXBvcnQgUG9seWdvbiBmcm9tICcuL1BvbHlnb24nO1xyXG5pbXBvcnQgUmVzcG9uc2UgZnJvbSAnLi9SZXNwb25zZSc7XHJcblxyXG4vKipcclxuICogIyMgT2JqZWN0IFBvb2xzXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEEgcG9vbCBvZiBgVmVjdG9yIG9iamVjdHMgdGhhdCBhcmUgdXNlZCBpbiBjYWxjdWxhdGlvbnMgdG8gYXZvaWQgYWxsb2NhdGluZyBtZW1vcnkuXHJcbiAqIFxyXG4gKiBAdHlwZSB7QXJyYXk8VmVjdG9yPn1cclxuICovXHJcbiBjb25zdCBUX1ZFQ1RPUlM6IEFycmF5PFZlY3Rvcj4gPSBbXTtcclxuIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykgVF9WRUNUT1JTLnB1c2gobmV3IFZlY3RvcigpKTtcclxuIFxyXG4gLyoqXHJcbiAgKiBBIHBvb2wgb2YgYXJyYXlzIG9mIG51bWJlcnMgdXNlZCBpbiBjYWxjdWxhdGlvbnMgdG8gYXZvaWQgYWxsb2NhdGluZyBtZW1vcnkuXHJcbiAgKiBcclxuICAqIEB0eXBlIHtBcnJheTxBcnJheTxudW1iZXI+Pn1cclxuICAqL1xyXG4gY29uc3QgVF9BUlJBWVM6IEFycmF5PEFycmF5PG51bWJlcj4+ID0gW107XHJcbiBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykgVF9BUlJBWVMucHVzaChbXSk7XHJcbiBcclxuXHJcbi8qKlxyXG4gKiBUZW1wb3JhcnkgcmVzcG9uc2UgdXNlZCBmb3IgUG9seWdvbiBoaXQgZGV0ZWN0aW9uLlxyXG4gKiBcclxuICogQHR5cGUge1Jlc3BvbnNlfVxyXG4gKi9cclxuY29uc3QgVF9SRVNQT05TRSA9IG5ldyBSZXNwb25zZSgpO1xyXG5cclxuLyoqXHJcbiAqIFRpbnkgXCJwb2ludFwiIFBvbHlnb24gdXNlZCBmb3IgUG9seWdvbiBoaXQgZGV0ZWN0aW9uLlxyXG4gKiBcclxuICogQHR5cGUge1BvbHlnb259XHJcbiAqL1xyXG5jb25zdCBURVNUX1BPSU5UID0gbmV3IEJveChuZXcgVmVjdG9yKCksIDAuMDAwMDAxLCAwLjAwMDAwMSkudG9Qb2x5Z29uKCk7XHJcblxyXG4vKipcclxuICogIyMgQ29uc3RhbnRzIGZvciBWb3Jvbm9pIHJlZ2lvbnMuXHJcbiAqL1xyXG5jb25zdCBMRUZUX1ZPUk9OT0lfUkVHSU9OID0gLTE7XHJcbmNvbnN0IE1JRERMRV9WT1JPTk9JX1JFR0lPTiA9IDA7XHJcbmNvbnN0IFJJR0hUX1ZPUk9OT0lfUkVHSU9OID0gMTtcclxuXHJcbi8qKlxyXG4gKiAjIyBIZWxwZXIgRnVuY3Rpb25zXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEZsYXR0ZW5zIHRoZSBzcGVjaWZpZWQgYXJyYXkgb2YgcG9pbnRzIG9udG8gYSB1bml0IHZlY3RvciBheGlzIHJlc3VsdGluZyBpbiBhIG9uZSBkaW1lbnNpb25zbFxyXG4gKiByYW5nZSBvZiB0aGUgbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZSBvbiB0aGF0IGF4aXMuXHJcbiAqIFxyXG4gKiBAcGFyYW0ge0FycmF5PFZlY3Rvcj59IHBvaW50cyBUaGUgcG9pbnRzIHRvIGZsYXR0ZW4uXHJcbiAqIEBwYXJhbSB7VmVjdG9yfSBub3JtYWwgVGhlIHVuaXQgdmVjdG9yIGF4aXMgdG8gZmxhdHRlbiBvbi5cclxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSByZXN1bHQgQW4gYXJyYXkuIEFmdGVyIGNhbGxpbmcgdGhpcyBmdW5jdGlvbiwgcmVzdWx0WzBdIHdpbGwgYmUgdGhlIG1pbmltdW0gdmFsdWUsIHJlc3VsdFsxXSB3aWxsIGJlIHRoZSBtYXhpbXVtIHZhbHVlLlxyXG4gKi9cclxuZnVuY3Rpb24gZmxhdHRlblBvaW50c09uKHBvaW50czogQXJyYXk8VmVjdG9yPiwgbm9ybWFsOiBWZWN0b3IsIHJlc3VsdDogQXJyYXk8bnVtYmVyPik6IHZvaWQge1xyXG4gIGxldCBtaW4gPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG4gIGxldCBtYXggPSAtTnVtYmVyLk1BWF9WQUxVRTtcclxuXHJcbiAgY29uc3QgbGVuID0gcG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgLy8gVGhlIG1hZ25pdHVkZSBvZiB0aGUgcHJvamVjdGlvbiBvZiB0aGUgcG9pbnQgb250byB0aGUgbm9ybWFsLlxyXG4gICAgY29uc3QgZG90ID0gcG9pbnRzW2ldLmRvdChub3JtYWwpO1xyXG5cclxuICAgIGlmIChkb3QgPCBtaW4pIG1pbiA9IGRvdDtcclxuICAgIGlmIChkb3QgPiBtYXgpIG1heCA9IGRvdDtcclxuICB9XHJcblxyXG4gIHJlc3VsdFswXSA9IG1pbjtcclxuICByZXN1bHRbMV0gPSBtYXg7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHdoaWNoIFZvcm9ub2kgcmVnaW9uIGEgcG9pbnQgaXMgb24gYSBsaW5lIHNlZ21lbnQuXHJcbiAqIFxyXG4gKiBJdCBpcyBhc3N1bWVkIHRoYXQgYm90aCB0aGUgbGluZSBhbmQgdGhlIHBvaW50IGFyZSByZWxhdGl2ZSB0byBgKDAsMClgXHJcbiAqIFxyXG4gKiAgICAgICAgICAgICB8ICAgICAgICgwKSAgICAgIHxcclxuICogICAgICAoLTEpICBbU10tLS0tLS0tLS0tLS0tLVtFXSAgKDEpXHJcbiAqICAgICAgICAgICAgfCAgICAgICAoMCkgICAgICB8XHJcbiAqIFxyXG4gKiBAcGFyYW0ge1ZlY3Rvcn0gbGluZSBUaGUgbGluZSBzZWdtZW50LlxyXG4gKiBAcGFyYW0ge1ZlY3Rvcn0gcG9pbnQgVGhlIHBvaW50LlxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IExFRlRfVk9ST05PSV9SRUdJT04gKC0xKSBpZiBpdCBpcyB0aGUgbGVmdCByZWdpb24sXHJcbiAqICAgICAgICAgICAgICAgICAgTUlERExFX1ZPUk9OT0lfUkVHSU9OICgwKSBpZiBpdCBpcyB0aGUgbWlkZGxlIHJlZ2lvbixcclxuICogICAgICAgICAgICAgICAgICBSSUdIVF9WT1JPTk9JX1JFR0lPTiAoMSkgaWYgaXQgaXMgdGhlIHJpZ2h0IHJlZ2lvbi5cclxuICovXHJcbmZ1bmN0aW9uIHZvcm9ub2lSZWdpb24obGluZTogVmVjdG9yLCBwb2ludDogVmVjdG9yKTogbnVtYmVyIHtcclxuICBjb25zdCBsZW4yID0gbGluZS5sZW4yKCk7XHJcbiAgY29uc3QgZHAgPSBwb2ludC5kb3QobGluZSk7XHJcblxyXG4gIC8vIElmIHRoZSBwb2ludCBpcyBiZXlvbmQgdGhlIHN0YXJ0IG9mIHRoZSBsaW5lLCBpdCBpcyBpbiB0aGUgbGVmdCB2b3Jvbm9pIHJlZ2lvbi5cclxuICBpZiAoZHAgPCAwKSByZXR1cm4gTEVGVF9WT1JPTk9JX1JFR0lPTjtcclxuXHJcbiAgLy8gSWYgdGhlIHBvaW50IGlzIGJleW9uZCB0aGUgZW5kIG9mIHRoZSBsaW5lLCBpdCBpcyBpbiB0aGUgcmlnaHQgdm9yb25vaSByZWdpb24uXHJcbiAgZWxzZSBpZiAoZHAgPiBsZW4yKSByZXR1cm4gUklHSFRfVk9ST05PSV9SRUdJT047XHJcblxyXG4gIC8vIE90aGVyd2lzZSwgaXQncyBpbiB0aGUgbWlkZGxlIG9uZS5cclxuICBlbHNlIHJldHVybiBNSURETEVfVk9ST05PSV9SRUdJT047XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNBVCB7XHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgd2hldGhlciB0d28gY29udmV4IHBvbHlnb25zIGFyZSBzZXBhcmF0ZWQgYnkgdGhlIHNwZWNpZmllZCBheGlzIChtdXN0IGJlIGEgdW5pdCB2ZWN0b3IpLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBhUG9zIFRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYlBvcyBUaGUgcG9zaXRpb24gb2YgdGhlIHNlY29uZCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7QXJyYXk8VmVjdG9yPn0gYVBvaW50cyBUaGUgcG9pbnRzIGluIHRoZSBmaXJzdCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7QXJyYXk8VmVjdG9yPn0gYlBvaW50cyBUaGUgcG9pbnRzIGluIHRoZSBzZWNvbmQgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYXhpcyBUaGUgYXhpcyAodW5pdCBzaXplZCkgdG8gdGVzdCBhZ2FpbnN0LiAgVGhlIHBvaW50cyBvZiBib3RoIHBvbHlnb25zIHdpbGwgYmUgcHJvamVjdGVkIG9udG8gdGhpcyBheGlzLlxyXG4gICAqIEBwYXJhbSB7UmVzcG9uc2U9fSByZXNwb25zZSBBIFJlc3BvbnNlIG9iamVjdCAob3B0aW9uYWwpIHdoaWNoIHdpbGwgYmUgcG9wdWxhdGVkIGlmIHRoZSBheGlzIGlzIG5vdCBhIHNlcGFyYXRpbmcgYXhpcy5cclxuICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGl0IGlzIGEgc2VwYXJhdGluZyBheGlzLCBmYWxzZSBvdGhlcndpc2UuICBJZiBmYWxzZSwgYW5kIGEgcmVzcG9uc2UgaXMgcGFzc2VkIGluLCBpbmZvcm1hdGlvbiBhYm91dCBob3cgbXVjaCBvdmVybGFwIGFuZCB0aGUgZGlyZWN0aW9uIG9mIHRoZSBvdmVybGFwIHdpbGwgYmUgcG9wdWxhdGVkLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgaXNTZXBhcmF0aW5nQXhpcyhhUG9zOiBWZWN0b3IsIGJQb3M6IFZlY3RvciwgYVBvaW50czogQXJyYXk8VmVjdG9yPiwgYlBvaW50czogQXJyYXk8VmVjdG9yPiwgYXhpczogVmVjdG9yLCByZXNwb25zZT86IFJlc3BvbnNlKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCByYW5nZUEgPSBUX0FSUkFZUy5wb3AoKSE7XHJcbiAgICBjb25zdCByYW5nZUIgPSBUX0FSUkFZUy5wb3AoKSE7XHJcbiAgXHJcbiAgICAvLyBUaGUgbWFnbml0dWRlIG9mIHRoZSBvZmZzZXQgYmV0d2VlbiB0aGUgdHdvIHBvbHlnb25zXHJcbiAgICBjb25zdCBvZmZzZXRWID0gVF9WRUNUT1JTLnBvcCgpIS5jb3B5KGJQb3MpLnN1YihhUG9zKTtcclxuICAgIGNvbnN0IHByb2plY3RlZE9mZnNldCA9IG9mZnNldFYuZG90KGF4aXMpO1xyXG4gIFxyXG4gICAgLy8gUHJvamVjdCB0aGUgcG9seWdvbnMgb250byB0aGUgYXhpcy5cclxuICAgIGZsYXR0ZW5Qb2ludHNPbihhUG9pbnRzLCBheGlzLCByYW5nZUEpO1xyXG4gICAgZmxhdHRlblBvaW50c09uKGJQb2ludHMsIGF4aXMsIHJhbmdlQik7XHJcbiAgXHJcbiAgICAvLyBNb3ZlIEIncyByYW5nZSB0byBpdHMgcG9zaXRpb24gcmVsYXRpdmUgdG8gQS5cclxuICAgIHJhbmdlQlswXSArPSBwcm9qZWN0ZWRPZmZzZXQ7XHJcbiAgICByYW5nZUJbMV0gKz0gcHJvamVjdGVkT2Zmc2V0O1xyXG4gIFxyXG4gICAgLy8gQ2hlY2sgaWYgdGhlcmUgaXMgYSBnYXAuIElmIHRoZXJlIGlzLCB0aGlzIGlzIGEgc2VwYXJhdGluZyBheGlzIGFuZCB3ZSBjYW4gc3RvcFxyXG4gICAgaWYgKHJhbmdlQVswXSA+IHJhbmdlQlsxXSB8fCByYW5nZUJbMF0gPiByYW5nZUFbMV0pIHtcclxuICAgICAgVF9WRUNUT1JTLnB1c2gob2Zmc2V0Vik7XHJcbiAgXHJcbiAgICAgIFRfQVJSQVlTLnB1c2gocmFuZ2VBKTtcclxuICAgICAgVF9BUlJBWVMucHVzaChyYW5nZUIpO1xyXG4gIFxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICBcclxuICAgIC8vIFRoaXMgaXMgbm90IGEgc2VwYXJhdGluZyBheGlzLiBJZiB3ZSdyZSBjYWxjdWxhdGluZyBhIHJlc3BvbnNlLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXHJcbiAgICBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgbGV0IG92ZXJsYXAgPSAwO1xyXG4gIFxyXG4gICAgICAvLyBBIHN0YXJ0cyBmdXJ0aGVyIGxlZnQgdGhhbiBCXHJcbiAgICAgIGlmIChyYW5nZUFbMF0gPCByYW5nZUJbMF0pIHtcclxuICAgICAgICByZXNwb25zZS5hSW5CID0gZmFsc2U7XHJcbiAgXHJcbiAgICAgICAgLy8gQSBlbmRzIGJlZm9yZSBCIGRvZXMuIFdlIGhhdmUgdG8gcHVsbCBBIG91dCBvZiBCXHJcbiAgICAgICAgaWYgKHJhbmdlQVsxXSA8IHJhbmdlQlsxXSkge1xyXG4gICAgICAgICAgb3ZlcmxhcCA9IHJhbmdlQVsxXSAtIHJhbmdlQlswXTtcclxuICBcclxuICAgICAgICAgIHJlc3BvbnNlLmJJbkEgPSBmYWxzZTtcclxuICAgICAgICAgIC8vIEIgaXMgZnVsbHkgaW5zaWRlIEEuICBQaWNrIHRoZSBzaG9ydGVzdCB3YXkgb3V0LlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCBvcHRpb24xID0gcmFuZ2VBWzFdIC0gcmFuZ2VCWzBdO1xyXG4gICAgICAgICAgY29uc3Qgb3B0aW9uMiA9IHJhbmdlQlsxXSAtIHJhbmdlQVswXTtcclxuICBcclxuICAgICAgICAgIG92ZXJsYXAgPSBvcHRpb24xIDwgb3B0aW9uMiA/IG9wdGlvbjEgOiAtb3B0aW9uMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQiBzdGFydHMgZnVydGhlciBsZWZ0IHRoYW4gQVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3BvbnNlLmJJbkEgPSBmYWxzZTtcclxuICBcclxuICAgICAgICAvLyBCIGVuZHMgYmVmb3JlIEEgZW5kcy4gV2UgaGF2ZSB0byBwdXNoIEEgb3V0IG9mIEJcclxuICAgICAgICBpZiAocmFuZ2VBWzFdID4gcmFuZ2VCWzFdKSB7XHJcbiAgICAgICAgICBvdmVybGFwID0gcmFuZ2VBWzBdIC0gcmFuZ2VCWzFdO1xyXG4gIFxyXG4gICAgICAgICAgcmVzcG9uc2UuYUluQiA9IGZhbHNlO1xyXG4gICAgICAgICAgLy8gQSBpcyBmdWxseSBpbnNpZGUgQi4gIFBpY2sgdGhlIHNob3J0ZXN0IHdheSBvdXQuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IG9wdGlvbjEgPSByYW5nZUFbMV0gLSByYW5nZUJbMF07XHJcbiAgICAgICAgICBjb25zdCBvcHRpb24yID0gcmFuZ2VCWzFdIC0gcmFuZ2VBWzBdO1xyXG4gIFxyXG4gICAgICAgICAgb3ZlcmxhcCA9IG9wdGlvbjEgPCBvcHRpb24yID8gb3B0aW9uMSA6IC1vcHRpb24yO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gIFxyXG4gICAgICAvLyBJZiB0aGlzIGlzIHRoZSBzbWFsbGVzdCBhbW91bnQgb2Ygb3ZlcmxhcCB3ZSd2ZSBzZWVuIHNvIGZhciwgc2V0IGl0IGFzIHRoZSBtaW5pbXVtIG92ZXJsYXAuXHJcbiAgICAgIGNvbnN0IGFic092ZXJsYXAgPSBNYXRoLmFicyhvdmVybGFwKTtcclxuICBcclxuICAgICAgaWYgKGFic092ZXJsYXAgPCByZXNwb25zZS5vdmVybGFwKSB7XHJcbiAgICAgICAgcmVzcG9uc2Uub3ZlcmxhcCA9IGFic092ZXJsYXA7XHJcbiAgICAgICAgcmVzcG9uc2Uub3ZlcmxhcE4uY29weShheGlzKTtcclxuICBcclxuICAgICAgICBpZiAob3ZlcmxhcCA8IDApIHJlc3BvbnNlLm92ZXJsYXBOLnJldmVyc2UoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgVF9WRUNUT1JTLnB1c2gob2Zmc2V0Vik7XHJcbiAgXHJcbiAgICBUX0FSUkFZUy5wdXNoKHJhbmdlQSk7XHJcbiAgICBUX0FSUkFZUy5wdXNoKHJhbmdlQik7XHJcbiAgXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiAjIyBDb2xsaXNpb24gVGVzdHNcclxuICAgKi9cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgYSBwb2ludCBpcyBpbnNpZGUgYSBjaXJjbGUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IHAgVGhlIHBvaW50IHRvIHRlc3QuXHJcbiAgICogQHBhcmFtIHtDaXJjbGV9IGMgVGhlIGNpcmNsZSB0byB0ZXN0LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIHBvaW50IGlzIGluc2lkZSB0aGUgY2lyY2xlIG9yIGZhbHNlIG90aGVyd2lzZS5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIHBvaW50SW5DaXJjbGUocDogVmVjdG9yLCBjOiBDaXJjbGUpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IGRpZmZlcmVuY2VWID0gVF9WRUNUT1JTLnBvcCgpIS5jb3B5KHApLnN1YihjLnBvcykuc3ViKGMub2Zmc2V0KTtcclxuXHJcbiAgICBjb25zdCByYWRpdXNTcSA9IGMuciAqIGMucjtcclxuICAgIGNvbnN0IGRpc3RhbmNlU3EgPSBkaWZmZXJlbmNlVi5sZW4yKCk7XHJcblxyXG4gICAgVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xyXG5cclxuICAgIC8vIElmIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIGlzIHNtYWxsZXIgdGhhbiB0aGUgcmFkaXVzIHRoZW4gdGhlIHBvaW50IGlzIGluc2lkZSB0aGUgY2lyY2xlLlxyXG4gICAgcmV0dXJuIGRpc3RhbmNlU3EgPD0gcmFkaXVzU3E7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBhIHBvaW50IGlzIGluc2lkZSBhIGNvbnZleCBwb2x5Z29uLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBwIFRoZSBwb2ludCB0byB0ZXN0LlxyXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gcG9seSBUaGUgcG9seWdvbiB0byB0ZXN0LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIHBvaW50IGlzIGluc2lkZSB0aGUgcG9seWdvbiBvciBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBwb2ludEluUG9seWdvbihwOiBWZWN0b3IsIHBvbHk6IFBvbHlnb24pOiBib29sZWFuIHtcclxuICAgIFRFU1RfUE9JTlQucG9zLmNvcHkocCk7XHJcbiAgICBUX1JFU1BPTlNFLmNsZWFyKCk7XHJcblxyXG4gICAgbGV0IHJlc3VsdCA9IFNBVC50ZXN0UG9seWdvblBvbHlnb24oVEVTVF9QT0lOVCwgcG9seSwgVF9SRVNQT05TRSk7XHJcblxyXG4gICAgaWYgKHJlc3VsdCkgcmVzdWx0ID0gVF9SRVNQT05TRS5hSW5CO1xyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiB0d28gY2lyY2xlcyBjb2xsaWRlLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7Q2lyY2xlfSBhIFRoZSBmaXJzdCBjaXJjbGUuXHJcbiAgICogQHBhcmFtIHtDaXJjbGV9IGIgVGhlIHNlY29uZCBjaXJjbGUuXHJcbiAgICogQHBhcmFtIHtSZXNwb25zZX0gW3Jlc3BvbnNlXSBBbiBvcHRpb25hbCByZXNwb25zZSBvYmplY3QgdGhhdCB3aWxsIGJlIHBvcHVsYXRlZCBpZiB0aGUgY2lyY2xlcyBpbnRlcnNlY3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgY2lyY2xlcyBpbnRlcnNlY3Qgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgdGVzdENpcmNsZUNpcmNsZShhOiBDaXJjbGUsIGI6IENpcmNsZSwgcmVzcG9uc2U/OiBSZXNwb25zZSk6IGJvb2xlYW4ge1xyXG4gICAgLy8gQ2hlY2sgaWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlcnMgb2YgdGhlIHR3byBjaXJjbGVzIGlzIGdyZWF0ZXIgdGhhbiB0aGVpciBjb21iaW5lZCByYWRpdXMuXHJcbiAgICBjb25zdCBkaWZmZXJlbmNlViA9IFRfVkVDVE9SUy5wb3AoKSEuY29weShiLnBvcykuYWRkKGIub2Zmc2V0KS5zdWIoYS5wb3MpLnN1YihhLm9mZnNldCk7XHJcblxyXG4gICAgY29uc3QgdG90YWxSYWRpdXMgPSBhLnIgKyBiLnI7XHJcbiAgICBjb25zdCB0b3RhbFJhZGl1c1NxID0gdG90YWxSYWRpdXMgKiB0b3RhbFJhZGl1cztcclxuICAgIGNvbnN0IGRpc3RhbmNlU3EgPSBkaWZmZXJlbmNlVi5sZW4yKCk7XHJcblxyXG4gICAgLy8gSWYgdGhlIGRpc3RhbmNlIGlzIGJpZ2dlciB0aGFuIHRoZSBjb21iaW5lZCByYWRpdXMsIHRoZXkgZG9uJ3QgaW50ZXJzZWN0LlxyXG4gICAgaWYgKGRpc3RhbmNlU3EgPiB0b3RhbFJhZGl1c1NxKSB7XHJcbiAgICAgIFRfVkVDVE9SUy5wdXNoKGRpZmZlcmVuY2VWKTtcclxuXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGV5IGludGVyc2VjdC4gIElmIHdlJ3JlIGNhbGN1bGF0aW5nIGEgcmVzcG9uc2UsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICBjb25zdCBkaXN0ID0gTWF0aC5zcXJ0KGRpc3RhbmNlU3EpO1xyXG5cclxuICAgICAgcmVzcG9uc2UuYSA9IGE7XHJcbiAgICAgIHJlc3BvbnNlLmIgPSBiO1xyXG5cclxuICAgICAgcmVzcG9uc2Uub3ZlcmxhcCA9IHRvdGFsUmFkaXVzIC0gZGlzdDtcclxuICAgICAgcmVzcG9uc2Uub3ZlcmxhcE4uY29weShkaWZmZXJlbmNlVi5ub3JtYWxpemUoKSk7XHJcbiAgICAgIHJlc3BvbnNlLm92ZXJsYXBWLmNvcHkoZGlmZmVyZW5jZVYpLnNjYWxlKHJlc3BvbnNlLm92ZXJsYXApO1xyXG5cclxuICAgICAgcmVzcG9uc2UuYUluQiA9IGEuciA8PSBiLnIgJiYgZGlzdCA8PSBiLnIgLSBhLnI7XHJcbiAgICAgIHJlc3BvbnNlLmJJbkEgPSBiLnIgPD0gYS5yICYmIGRpc3QgPD0gYS5yIC0gYi5yO1xyXG4gICAgfVxyXG5cclxuICAgIFRfVkVDVE9SUy5wdXNoKGRpZmZlcmVuY2VWKTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIGEgcG9seWdvbiBhbmQgYSBjaXJjbGUgY29sbGlkZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1BvbHlnb259IHBvbHlnb24gVGhlIHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtDaXJjbGV9IGNpcmNsZSBUaGUgY2lyY2xlLlxyXG4gICAqIEBwYXJhbSB7UmVzcG9uc2V9IFtyZXNwb25zZV0gQW4gb3B0aW9uYWwgcmVzcG9uc2Ugb2JqZWN0IHRoYXQgd2lsbCBiZSBwb3B1bGF0ZWQgaWYgdGhleSBpbnRlcnNlY3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGV5IGludGVyc2VjdCBvciBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyB0ZXN0UG9seWdvbkNpcmNsZShwb2x5Z29uOiBQb2x5Z29uLCBjaXJjbGU6IENpcmNsZSwgcmVzcG9uc2U/OiBSZXNwb25zZSk6IGJvb2xlYW4ge1xyXG4gICAgLy8gR2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRvIHRoZSBwb2x5Z29uLlxyXG4gICAgY29uc3QgY2lyY2xlUG9zID0gVF9WRUNUT1JTLnBvcCgpIS5jb3B5KGNpcmNsZS5wb3MpLmFkZChjaXJjbGUub2Zmc2V0KS5zdWIocG9seWdvbi5wb3MpO1xyXG5cclxuICAgIGNvbnN0IHJhZGl1cyA9IGNpcmNsZS5yO1xyXG4gICAgY29uc3QgcmFkaXVzMiA9IHJhZGl1cyAqIHJhZGl1cztcclxuXHJcbiAgICBjb25zdCBwb2ludHMgPSBwb2x5Z29uLmNhbGNQb2ludHM7XHJcbiAgICBjb25zdCBsZW4gPSBwb2ludHMubGVuZ3RoO1xyXG5cclxuICAgIGNvbnN0IGVkZ2UgPSBUX1ZFQ1RPUlMucG9wKCkhO1xyXG4gICAgY29uc3QgcG9pbnQgPSBUX1ZFQ1RPUlMucG9wKCkhO1xyXG5cclxuICAgIC8vIEZvciBlYWNoIGVkZ2UgaW4gdGhlIHBvbHlnb246XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IG5leHQgPSBpID09PSBsZW4gLSAxID8gMCA6IGkgKyAxO1xyXG4gICAgICBjb25zdCBwcmV2ID0gaSA9PT0gMCA/IGxlbiAtIDEgOiBpIC0gMTtcclxuXHJcbiAgICAgIGxldCBvdmVybGFwID0gMDtcclxuICAgICAgbGV0IG92ZXJsYXBOID0gbnVsbDtcclxuXHJcbiAgICAgIC8vIEdldCB0aGUgZWRnZS5cclxuICAgICAgZWRnZS5jb3B5KHBvbHlnb24uZWRnZXNbaV0pO1xyXG5cclxuICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0byB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIGVkZ2UuXHJcbiAgICAgIHBvaW50LmNvcHkoY2lyY2xlUG9zKS5zdWIocG9pbnRzW2ldKTtcclxuXHJcbiAgICAgIC8vIElmIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSBhbmQgdGhlIHBvaW50IGlzIGJpZ2dlciB0aGFuIHRoZSByYWRpdXMsIHRoZSBwb2x5Z29uIGlzIGRlZmluaXRlbHkgbm90IGZ1bGx5IGluIHRoZSBjaXJjbGUuXHJcbiAgICAgIGlmIChyZXNwb25zZSAmJiBwb2ludC5sZW4yKCkgPiByYWRpdXMyKSByZXNwb25zZS5hSW5CID0gZmFsc2U7XHJcblxyXG4gICAgICAvLyBDYWxjdWxhdGUgd2hpY2ggVm9yb25vaSByZWdpb24gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGlzIGluLlxyXG4gICAgICBsZXQgcmVnaW9uID0gdm9yb25vaVJlZ2lvbihlZGdlLCBwb2ludCk7XHJcblxyXG4gICAgICAvLyBJZiBpdCdzIHRoZSBsZWZ0IHJlZ2lvbjpcclxuICAgICAgaWYgKHJlZ2lvbiA9PT0gTEVGVF9WT1JPTk9JX1JFR0lPTikge1xyXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gbWFrZSBzdXJlIHdlJ3JlIGluIHRoZSBSSUdIVF9WT1JPTk9JX1JFR0lPTiBvZiB0aGUgcHJldmlvdXMgZWRnZS5cclxuICAgICAgICBlZGdlLmNvcHkocG9seWdvbi5lZGdlc1twcmV2XSk7XHJcblxyXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgcmVsYXRpdmUgdGhlIHN0YXJ0aW5nIHBvaW50IG9mIHRoZSBwcmV2aW91cyBlZGdlXHJcbiAgICAgICAgY29uc3QgcG9pbnQyID0gVF9WRUNUT1JTLnBvcCgpIS5jb3B5KGNpcmNsZVBvcykuc3ViKHBvaW50c1twcmV2XSk7XHJcblxyXG4gICAgICAgIHJlZ2lvbiA9IHZvcm9ub2lSZWdpb24oZWRnZSwgcG9pbnQyKTtcclxuXHJcbiAgICAgICAgaWYgKHJlZ2lvbiA9PT0gUklHSFRfVk9ST05PSV9SRUdJT04pIHtcclxuICAgICAgICAgIC8vIEl0J3MgaW4gdGhlIHJlZ2lvbiB3ZSB3YW50LiAgQ2hlY2sgaWYgdGhlIGNpcmNsZSBpbnRlcnNlY3RzIHRoZSBwb2ludC5cclxuICAgICAgICAgIGNvbnN0IGRpc3QgPSBwb2ludC5sZW4oKTtcclxuXHJcbiAgICAgICAgICBpZiAoZGlzdCA+IHJhZGl1cykge1xyXG4gICAgICAgICAgICAvLyBObyBpbnRlcnNlY3Rpb25cclxuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2goY2lyY2xlUG9zKTtcclxuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2goZWRnZSk7XHJcbiAgICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKHBvaW50KTtcclxuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQyKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgLy8gSXQgaW50ZXJzZWN0cywgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxyXG4gICAgICAgICAgICByZXNwb25zZS5iSW5BID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBvdmVybGFwTiA9IHBvaW50Lm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBvdmVybGFwID0gcmFkaXVzIC0gZGlzdDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRfVkVDVE9SUy5wdXNoKHBvaW50Mik7XHJcblxyXG4gICAgICAgIC8vIElmIGl0J3MgdGhlIHJpZ2h0IHJlZ2lvbjpcclxuICAgICAgfSBlbHNlIGlmIChyZWdpb24gPT09IFJJR0hUX1ZPUk9OT0lfUkVHSU9OKSB7XHJcbiAgICAgICAgLy8gV2UgbmVlZCB0byBtYWtlIHN1cmUgd2UncmUgaW4gdGhlIGxlZnQgcmVnaW9uIG9uIHRoZSBuZXh0IGVkZ2VcclxuICAgICAgICBlZGdlLmNvcHkocG9seWdvbi5lZGdlc1tuZXh0XSk7XHJcblxyXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgcmVsYXRpdmUgdG8gdGhlIHN0YXJ0aW5nIHBvaW50IG9mIHRoZSBuZXh0IGVkZ2UuXHJcbiAgICAgICAgcG9pbnQuY29weShjaXJjbGVQb3MpLnN1Yihwb2ludHNbbmV4dF0pO1xyXG5cclxuICAgICAgICByZWdpb24gPSB2b3Jvbm9pUmVnaW9uKGVkZ2UsIHBvaW50KTtcclxuXHJcbiAgICAgICAgaWYgKHJlZ2lvbiA9PT0gTEVGVF9WT1JPTk9JX1JFR0lPTikge1xyXG4gICAgICAgICAgLy8gSXQncyBpbiB0aGUgcmVnaW9uIHdlIHdhbnQuICBDaGVjayBpZiB0aGUgY2lyY2xlIGludGVyc2VjdHMgdGhlIHBvaW50LlxyXG4gICAgICAgICAgY29uc3QgZGlzdCA9IHBvaW50LmxlbigpO1xyXG5cclxuICAgICAgICAgIGlmIChkaXN0ID4gcmFkaXVzKSB7XHJcbiAgICAgICAgICAgIC8vIE5vIGludGVyc2VjdGlvblxyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpO1xyXG4gICAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChlZGdlKTtcclxuICAgICAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAvLyBJdCBpbnRlcnNlY3RzLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmJJbkEgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIG92ZXJsYXBOID0gcG9pbnQubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIG92ZXJsYXAgPSByYWRpdXMgLSBkaXN0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBPdGhlcndpc2UsIGl0J3MgdGhlIG1pZGRsZSByZWdpb246XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gTmVlZCB0byBjaGVjayBpZiB0aGUgY2lyY2xlIGlzIGludGVyc2VjdGluZyB0aGUgZWRnZSwgY2hhbmdlIHRoZSBlZGdlIGludG8gaXRzIFwiZWRnZSBub3JtYWxcIi5cclxuICAgICAgICBjb25zdCBub3JtYWwgPSBlZGdlLnBlcnAoKS5ub3JtYWxpemUoKTtcclxuXHJcbiAgICAgICAgLy8gRmluZCB0aGUgcGVycGVuZGljdWxhciBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSBhbmQgdGhlIGVkZ2UuXHJcbiAgICAgICAgY29uc3QgZGlzdCA9IHBvaW50LmRvdChub3JtYWwpO1xyXG4gICAgICAgIGNvbnN0IGRpc3RBYnMgPSBNYXRoLmFicyhkaXN0KTtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIGNpcmNsZSBpcyBvbiB0aGUgb3V0c2lkZSBvZiB0aGUgZWRnZSwgdGhlcmUgaXMgbm8gaW50ZXJzZWN0aW9uLlxyXG4gICAgICAgIGlmIChkaXN0ID4gMCAmJiBkaXN0QWJzID4gcmFkaXVzKSB7XHJcbiAgICAgICAgICAvLyBObyBpbnRlcnNlY3Rpb25cclxuICAgICAgICAgIFRfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XHJcbiAgICAgICAgICBUX1ZFQ1RPUlMucHVzaChub3JtYWwpO1xyXG4gICAgICAgICAgVF9WRUNUT1JTLnB1c2gocG9pbnQpO1xyXG5cclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAvLyBJdCBpbnRlcnNlY3RzLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXHJcbiAgICAgICAgICBvdmVybGFwTiA9IG5vcm1hbDtcclxuICAgICAgICAgIG92ZXJsYXAgPSByYWRpdXMgLSBkaXN0O1xyXG5cclxuICAgICAgICAgIC8vIElmIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSBpcyBvbiB0aGUgb3V0c2lkZSBvZiB0aGUgZWRnZSwgb3IgcGFydCBvZiB0aGUgY2lyY2xlIGlzIG9uIHRoZSBvdXRzaWRlLCB0aGUgY2lyY2xlIGlzIG5vdCBmdWxseSBpbnNpZGUgdGhlIHBvbHlnb24uXHJcbiAgICAgICAgICBpZiAoZGlzdCA+PSAwIHx8IG92ZXJsYXAgPCAyICogcmFkaXVzKSByZXNwb25zZS5iSW5BID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBJZiB0aGlzIGlzIHRoZSBzbWFsbGVzdCBvdmVybGFwIHdlJ3ZlIHNlZW4sIGtlZXAgaXQuXHJcbiAgICAgIC8vIChvdmVybGFwTiBtYXkgYmUgbnVsbCBpZiB0aGUgY2lyY2xlIHdhcyBpbiB0aGUgd3JvbmcgVm9yb25vaSByZWdpb24pLlxyXG4gICAgICBpZiAob3ZlcmxhcE4gJiYgcmVzcG9uc2UgJiYgTWF0aC5hYnMob3ZlcmxhcCkgPCBNYXRoLmFicyhyZXNwb25zZS5vdmVybGFwKSkge1xyXG4gICAgICAgIHJlc3BvbnNlLm92ZXJsYXAgPSBvdmVybGFwO1xyXG4gICAgICAgIHJlc3BvbnNlLm92ZXJsYXBOLmNvcHkob3ZlcmxhcE4pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBmaW5hbCBvdmVybGFwIHZlY3RvciAtIGJhc2VkIG9uIHRoZSBzbWFsbGVzdCBvdmVybGFwLlxyXG4gICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgIHJlc3BvbnNlLmEgPSBwb2x5Z29uO1xyXG4gICAgICByZXNwb25zZS5iID0gY2lyY2xlO1xyXG5cclxuICAgICAgcmVzcG9uc2Uub3ZlcmxhcFYuY29weShyZXNwb25zZS5vdmVybGFwTikuc2NhbGUocmVzcG9uc2Uub3ZlcmxhcCk7XHJcbiAgICB9XHJcblxyXG4gICAgVF9WRUNUT1JTLnB1c2goY2lyY2xlUG9zKTtcclxuICAgIFRfVkVDVE9SUy5wdXNoKGVkZ2UpO1xyXG4gICAgVF9WRUNUT1JTLnB1c2gocG9pbnQpO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgYSBjaXJjbGUgYW5kIGEgcG9seWdvbiBjb2xsaWRlLlxyXG4gICAqIFxyXG4gICAqICoqTk9URToqKiBUaGlzIGlzIHNsaWdodGx5IGxlc3MgZWZmaWNpZW50IHRoYW4gcG9seWdvbkNpcmNsZSBhcyBpdCBqdXN0IHJ1bnMgcG9seWdvbkNpcmNsZSBhbmQgcmV2ZXJzZXMgZXZlcnl0aGluZ1xyXG4gICAqIGF0IHRoZSBlbmQuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtDaXJjbGV9IGNpcmNsZSBUaGUgY2lyY2xlLlxyXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gcG9seWdvbiBUaGUgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge1Jlc3BvbnNlfSBbcmVzcG9uc2VdIEFuIG9wdGlvbmFsIHJlc3BvbnNlIG9iamVjdCB0aGF0IHdpbGwgYmUgcG9wdWxhdGVkIGlmIHRoZXkgaW50ZXJzZWN0LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhleSBpbnRlcnNlY3Qgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgdGVzdENpcmNsZVBvbHlnb24oY2lyY2xlOiBDaXJjbGUsIHBvbHlnb246IFBvbHlnb24sIHJlc3BvbnNlPzogUmVzcG9uc2UpOiBib29sZWFuIHtcclxuICAgIC8vIFRlc3QgdGhlIHBvbHlnb24gYWdhaW5zdCB0aGUgY2lyY2xlLlxyXG4gICAgY29uc3QgcmVzdWx0ID0gU0FULnRlc3RQb2x5Z29uQ2lyY2xlKHBvbHlnb24sIGNpcmNsZSwgcmVzcG9uc2UpO1xyXG5cclxuICAgIGlmIChyZXN1bHQgJiYgcmVzcG9uc2UpIHtcclxuICAgICAgLy8gU3dhcCBBIGFuZCBCIGluIHRoZSByZXNwb25zZS5cclxuICAgICAgY29uc3QgYSA9IHJlc3BvbnNlLmE7XHJcbiAgICAgIGNvbnN0IGFJbkIgPSByZXNwb25zZS5hSW5CO1xyXG5cclxuICAgICAgcmVzcG9uc2Uub3ZlcmxhcE4ucmV2ZXJzZSgpO1xyXG4gICAgICByZXNwb25zZS5vdmVybGFwVi5yZXZlcnNlKCk7XHJcblxyXG4gICAgICByZXNwb25zZS5hID0gcmVzcG9uc2UuYjtcclxuICAgICAgcmVzcG9uc2UuYiA9IGE7XHJcblxyXG4gICAgICByZXNwb25zZS5hSW5CID0gcmVzcG9uc2UuYkluQTtcclxuICAgICAgcmVzcG9uc2UuYkluQSA9IGFJbkI7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyB3aGV0aGVyIHBvbHlnb25zIGNvbGxpZGUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBhIFRoZSBmaXJzdCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gYiBUaGUgc2Vjb25kIHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtSZXNwb25zZX0gW3Jlc3BvbnNlXSBBbiBvcHRpb25hbCByZXNwb25zZSBvYmplY3QgdGhhdCB3aWxsIGJlIHBvcHVsYXRlZCBpZiB0aGV5IGludGVyc2VjdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZXkgaW50ZXJzZWN0IG9yIGZhbHNlIG90aGVyd2lzZS5cclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIHRlc3RQb2x5Z29uUG9seWdvbihhOiBQb2x5Z29uLCBiOiBQb2x5Z29uLCByZXNwb25zZT86IFJlc3BvbnNlKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBhUG9pbnRzID0gYS5jYWxjUG9pbnRzO1xyXG4gICAgY29uc3QgYUxlbiA9IGFQb2ludHMubGVuZ3RoO1xyXG5cclxuICAgIGNvbnN0IGJQb2ludHMgPSBiLmNhbGNQb2ludHM7XHJcbiAgICBjb25zdCBiTGVuID0gYlBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgLy8gSWYgYW55IG9mIHRoZSBlZGdlIG5vcm1hbHMgb2YgQSBpcyBhIHNlcGFyYXRpbmcgYXhpcywgbm8gaW50ZXJzZWN0aW9uLlxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhTGVuOyBpKyspIHtcclxuICAgICAgaWYgKFNBVC5pc1NlcGFyYXRpbmdBeGlzKGEucG9zLCBiLnBvcywgYVBvaW50cywgYlBvaW50cywgYS5ub3JtYWxzW2ldLCByZXNwb25zZSkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiBhbnkgb2YgdGhlIGVkZ2Ugbm9ybWFscyBvZiBCIGlzIGEgc2VwYXJhdGluZyBheGlzLCBubyBpbnRlcnNlY3Rpb24uXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJMZW47IGkrKykge1xyXG4gICAgICBpZiAoU0FULmlzU2VwYXJhdGluZ0F4aXMoYS5wb3MsIGIucG9zLCBhUG9pbnRzLCBiUG9pbnRzLCBiLm5vcm1hbHNbaV0sIHJlc3BvbnNlKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFNpbmNlIG5vbmUgb2YgdGhlIGVkZ2Ugbm9ybWFscyBvZiBBIG9yIEIgYXJlIGEgc2VwYXJhdGluZyBheGlzLCB0aGVyZSBpcyBhbiBpbnRlcnNlY3Rpb25cclxuICAgIC8vIGFuZCB3ZSd2ZSBhbHJlYWR5IGNhbGN1bGF0ZWQgdGhlIHNtYWxsZXN0IG92ZXJsYXAgKGluIGlzU2VwYXJhdGluZ0F4aXMpLiBcclxuICAgIC8vIENhbGN1bGF0ZSB0aGUgZmluYWwgb3ZlcmxhcCB2ZWN0b3IuXHJcbiAgICBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgcmVzcG9uc2UuYSA9IGE7XHJcbiAgICAgIHJlc3BvbnNlLmIgPSBiO1xyXG5cclxuICAgICAgcmVzcG9uc2Uub3ZlcmxhcFYuY29weShyZXNwb25zZS5vdmVybGFwTikuc2NhbGUocmVzcG9uc2Uub3ZlcmxhcCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59IiwiLyoqXHJcbiAqICMjIFZlY3RvclxyXG4gKiBcclxuICogUmVwcmVzZW50cyBhIHZlY3RvciBpbiB0d28gZGltZW5zaW9ucyB3aXRoIGB4YCBhbmQgYHlgIHByb3BlcnRpZXMuXHJcbiAqIFxyXG4gKiBDcmVhdGUgYSBuZXcgVmVjdG9yLCBvcHRpb25hbGx5IHBhc3NpbmcgaW4gdGhlIGB4YCBhbmQgYHlgIGNvb3JkaW5hdGVzLiBJZiBhIGNvb3JkaW5hdGUgaXMgbm90IHNwZWNpZmllZCwgXHJcbiAqIGl0IHdpbGwgYmUgc2V0IHRvIGAwYC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvciB7XHJcbiAgcHVibGljIHg6IG51bWJlcjtcclxuICBwdWJsaWMgeTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge251bWJlcn0gW3g9MF0gVGhlIHggY29vcmRpbmF0ZSBvZiB0aGlzIFZlY3Rvci5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW3k9MF0gVGhlIHkgY29vcmRpbmF0ZSBvZiB0aGlzIFZlY3Rvci5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDApIHtcclxuICAgIHRoaXMueCA9IHg7XHJcbiAgICB0aGlzLnkgPSB5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29weSB0aGUgdmFsdWVzIG9mIGFub3RoZXIgVmVjdG9yIGludG8gdGhpcyBvbmUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBvdGhlciBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgY29weShvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIHRoaXMueCA9IG90aGVyLng7XHJcbiAgICB0aGlzLnkgPSBvdGhlci55O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbmV3IFZlY3RvciB3aXRoIHRoZSBzYW1lIGNvb3JkaW5hdGVzIGFzIHRoZSBvbmUuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gVGhlIG5ldyBjbG9uZWQgVmVjdG9yLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBjbG9uZSgpOiBWZWN0b3Ige1xyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54LCB0aGlzLnkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hhbmdlIHRoaXMgVmVjdG9yIHRvIGJlIHBlcnBlbmRpY3VsYXIgdG8gd2hhdCBpdCB3YXMgYmVmb3JlLlxyXG4gICAqIFxyXG4gICAqIEVmZmVjdGl2ZWx5IHRoaXMgcm90YXRlcyBpdCA5MCBkZWdyZWVzIGluIGEgY2xvY2t3aXNlIGRpcmVjdGlvbi5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBwZXJwKCk6IFZlY3RvciB7XHJcbiAgICBjb25zdCB4ID0gdGhpcy54O1xyXG5cclxuICAgIHRoaXMueCA9IHRoaXMueTtcclxuICAgIHRoaXMueSA9IC14O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUm90YXRlIHRoaXMgVmVjdG9yIChjb3VudGVyLWNsb2Nrd2lzZSkgYnkgdGhlIHNwZWNpZmllZCBhbmdsZSAoaW4gcmFkaWFucykuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIFRoZSBhbmdsZSB0byByb3RhdGUgKGluIHJhZGlhbnMpLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHJvdGF0ZShhbmdsZTogbnVtYmVyKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IHggPSB0aGlzLng7XHJcbiAgICBjb25zdCB5ID0gdGhpcy55O1xyXG5cclxuICAgIHRoaXMueCA9IHggKiBNYXRoLmNvcyhhbmdsZSkgLSB5ICogTWF0aC5zaW4oYW5nbGUpO1xyXG4gICAgdGhpcy55ID0geCAqIE1hdGguc2luKGFuZ2xlKSArIHkgKiBNYXRoLmNvcyhhbmdsZSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXZlcnNlIHRoaXMgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHJldmVyc2UoKTogVmVjdG9yIHtcclxuICAgIHRoaXMueCA9IC10aGlzLng7XHJcbiAgICB0aGlzLnkgPSAtdGhpcy55O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTm9ybWFsaXplIHRoaXMgdmVjdG9yIChtYWtlIGl0IGhhdmUgYSBsZW5ndGggb2YgYDFgKS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBub3JtYWxpemUoKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IGQgPSB0aGlzLmxlbigpO1xyXG5cclxuICAgIGlmIChkID4gMCkge1xyXG4gICAgICB0aGlzLnggPSB0aGlzLnggLyBkO1xyXG4gICAgICB0aGlzLnkgPSB0aGlzLnkgLyBkO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGFub3RoZXIgVmVjdG9yIHRvIHRoaXMgb25lLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgb3RoZXIgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIGFkZChvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIHRoaXMueCArPSBvdGhlci54O1xyXG4gICAgdGhpcy55ICs9IG90aGVyLnk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJ0cmFjdCBhbm90aGVyIFZlY3RvciBmcm9tIHRoaXMgb25lLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgb3RoZXIgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHN1YihvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIHRoaXMueCAtPSBvdGhlci54O1xyXG4gICAgdGhpcy55IC09IG90aGVyLnk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTY2FsZSB0aGlzIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBBbiBpbmRlcGVuZGVudCBzY2FsaW5nIGZhY3RvciBjYW4gYmUgcHJvdmlkZWQgZm9yIGVhY2ggYXhpcywgb3IgYSBzaW5nbGUgc2NhbGluZyBmYWN0b3Igd2lsbCBzY2FsZVxyXG4gICAqIGJvdGggYHhgIGFuZCBgeWAuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHggVGhlIHNjYWxpbmcgZmFjdG9yIGluIHRoZSB4IGRpcmVjdGlvbi5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW3ldIFRoZSBzY2FsaW5nIGZhY3RvciBpbiB0aGUgeSBkaXJlY3Rpb24uXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgc2NhbGUoeDogbnVtYmVyLCB5PzogbnVtYmVyKTogVmVjdG9yIHtcclxuICAgIHRoaXMueCAqPSB4O1xyXG4gICAgdGhpcy55ICo9IHR5cGVvZiB5ICE9ICd1bmRlZmluZWQnID8geSA6IHg7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQcm9qZWN0IHRoaXMgVmVjdG9yIG9udG8gYW5vdGhlciBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBWZWN0b3IgdG8gcHJvamVjdCBvbnRvLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHByb2plY3Qob3RoZXI6IFZlY3Rvcik6IFZlY3RvciB7XHJcbiAgICBjb25zdCBhbXQgPSB0aGlzLmRvdChvdGhlcikgLyBvdGhlci5sZW4yKCk7XHJcblxyXG4gICAgdGhpcy54ID0gYW10ICogb3RoZXIueDtcclxuICAgIHRoaXMueSA9IGFtdCAqIG90aGVyLnk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQcm9qZWN0IHRoaXMgVmVjdG9yIG9udG8gYSBWZWN0b3Igb2YgdW5pdCBsZW5ndGguXHJcbiAgICogXHJcbiAgICogVGhpcyBpcyBzbGlnaHRseSBtb3JlIGVmZmljaWVudCB0aGFuIGBwcm9qZWN0YCB3aGVuIGRlYWxpbmcgd2l0aCB1bml0IHZlY3RvcnMuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSB1bml0IHZlY3RvciB0byBwcm9qZWN0IG9udG8uXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwdWJsaWMgcHJvamVjdE4ob3RoZXI6IFZlY3Rvcik6IFZlY3RvciB7XHJcbiAgICBjb25zdCBhbXQgPSB0aGlzLmRvdChvdGhlcik7XHJcblxyXG4gICAgdGhpcy54ID0gYW10ICogb3RoZXIueDtcclxuICAgIHRoaXMueSA9IGFtdCAqIG90aGVyLnk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWZsZWN0IHRoaXMgVmVjdG9yIG9uIGFuIGFyYml0cmFyeSBheGlzLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBheGlzIFRoZSBWZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBheGlzLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHJlZmxlY3QoYXhpczogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IHggPSB0aGlzLng7XHJcbiAgICBjb25zdCB5ID0gdGhpcy55O1xyXG5cclxuICAgIHRoaXMucHJvamVjdChheGlzKS5zY2FsZSgyKTtcclxuXHJcbiAgICB0aGlzLnggLT0geDtcclxuICAgIHRoaXMueSAtPSB5O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVmbGVjdCB0aGlzIFZlY3RvciBvbiBhbiBhcmJpdHJhcnkgYXhpcy5cclxuICAgKiBcclxuICAgKiBUaGlzIGlzIHNsaWdodGx5IG1vcmUgZWZmaWNpZW50IHRoYW4gYHJlZmxlY3RgIHdoZW4gZGVhbGluZyB3aXRoIGFuIGF4aXMgdGhhdCBpcyBhIHVuaXQgdmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBheGlzIFRoZSBWZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBheGlzLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHVibGljIHJlZmxlY3ROKGF4aXM6IFZlY3Rvcik6IFZlY3RvciB7XHJcbiAgICBjb25zdCB4ID0gdGhpcy54O1xyXG4gICAgY29uc3QgeSA9IHRoaXMueTtcclxuXHJcbiAgICB0aGlzLnByb2plY3ROKGF4aXMpLnNjYWxlKDIpO1xyXG5cclxuICAgIHRoaXMueCAtPSB4O1xyXG4gICAgdGhpcy55IC09IHk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGRvdCBwcm9kdWN0IG9mIHRoaXMgVmVjdG9yIGFuZCBhbm90aGVyLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgVmVjdG9yIHRvIGRvdCB0aGlzIG9uZSBhZ2FpbnN0LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgZG90IHByb2R1Y3QuXHJcbiAgICovXHJcbiAgcHVibGljIGRvdChvdGhlcjogVmVjdG9yKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnggKiBvdGhlci54ICsgdGhpcy55ICogb3RoZXIueTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgc3F1YXJlZCBsZW5ndGggb2YgdGhpcyBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBzcXVhcmVkIGxlbmd0aC5cclxuICAgKi9cclxuICBwdWJsaWMgbGVuMigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuZG90KHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBsZW5ndGggb2YgdGhpcyBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBsZW5ndGguXHJcbiAgICovXHJcbiAgcHVibGljIGxlbigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmxlbjIoKSk7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIEltYWdlTGlzdCB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBJTUFHRVM6IEhUTUxJbWFnZUVsZW1lbnRbXSB8IHVuZGVmaW5lZCA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVnaXN0ZXIoc3JjOiBzdHJpbmcpOiBIVE1MSW1hZ2VFbGVtZW50IHtcclxuICAgICAgICBsZXQgaW1nOiBIVE1MSW1hZ2VFbGVtZW50ID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaW1nLnNyYyA9IHNyYztcclxuICAgICAgICBJbWFnZUxpc3QuSU1BR0VTIS5wdXNoKGltZyk7XHJcbiAgICAgICAgcmV0dXJuIGltZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFRJTEVNQVBfTUFTVEVSOiBIVE1MSW1hZ2VFbGVtZW50ID0gSW1hZ2VMaXN0LnJlZ2lzdGVyKFwiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvdGlsZU1hc3Rlci5wbmdcIik7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNQSUtFOiBIVE1MSW1hZ2VFbGVtZW50ID0gSW1hZ2VMaXN0LnJlZ2lzdGVyKFwiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvc3ByU3Bpa2UucG5nXCIpO1xyXG4gICAgcHVibGljIHN0YXRpYyBCUk9DQ09MSTogSFRNTEltYWdlRWxlbWVudCA9IEltYWdlTGlzdC5yZWdpc3RlcihcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL2JnQnJvY2NvbGkucG5nXCIpO1xyXG4gICAgcHVibGljIHN0YXRpYyBLVU1PX1BMQVRGT1JNOiBIVE1MSW1hZ2VFbGVtZW50ID0gSW1hZ2VMaXN0LnJlZ2lzdGVyKFwiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvc3ByS3Vtb1BsYXRmb3JtLnBuZ1wiKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFBMQVlFUjogSFRNTEltYWdlRWxlbWVudCA9IEltYWdlTGlzdC5yZWdpc3RlcihcImFzc2V0cy90ZXh0dXJlcy9vYmplY3RzL3BsYXllci9zcHJQbGF5ZXIucG5nXCIpO1xyXG4gICAgcHVibGljIHN0YXRpYyBHT1JFOiBIVE1MSW1hZ2VFbGVtZW50ID0gSW1hZ2VMaXN0LnJlZ2lzdGVyKFwiYXNzZXRzL3RleHR1cmVzL29iamVjdHMvcGxheWVyL3NwckdvcmUucG5nXCIpO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgR0FNRU9WRVI6IEhUTUxJbWFnZUVsZW1lbnQgPSBJbWFnZUxpc3QucmVnaXN0ZXIoXCJhc3NldHMvdGV4dHVyZXMvdWkvc3ByR2FtZU92ZXIucG5nXCIpO1xyXG4gICAgcHVibGljIHN0YXRpYyBORVdHQU1FOiBIVE1MSW1hZ2VFbGVtZW50ID0gSW1hZ2VMaXN0LnJlZ2lzdGVyKFwiYXNzZXRzL3RleHR1cmVzL3VpL3Nwck5ld0ZpbGUucG5nXCIpO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3ByaXRlIHtcclxuICAgIHB1YmxpYyBzb3VyY2U6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgICBwdWJsaWMgeDogbnVtYmVyO1xyXG4gICAgcHVibGljIHk6IG51bWJlcjtcclxuICAgIHB1YmxpYyB3OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNvdXJjZTogSFRNTEltYWdlRWxlbWVudCwgeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCwgdzogbnVtYmVyLCBoOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy53ID0gdztcclxuICAgICAgICB0aGlzLmggPSBoO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgbmFtZXNwYWNlIFNwcml0ZXMge1xyXG4gICAgZXhwb3J0IGNvbnN0IFJlZEJsb2NrOiBTcHJpdGUgPSBuZXcgU3ByaXRlKEltYWdlTGlzdC5USUxFTUFQX01BU1RFUiwgMzIsIDMyLCAzMiwgMzIpO1xyXG4gICAgZXhwb3J0IGNvbnN0IEdyYXNzUmVkQmxvY2s6IFNwcml0ZSA9IG5ldyBTcHJpdGUoSW1hZ2VMaXN0LlRJTEVNQVBfTUFTVEVSLCAwLCAzMiwgMzIsIDMyKTtcclxuICAgIGV4cG9ydCBjb25zdCBTaW1wbGVWQmVhbTogU3ByaXRlID0gbmV3IFNwcml0ZShJbWFnZUxpc3QuVElMRU1BUF9NQVNURVIsIDMyLCA2NCwgMzIsIDMyKTtcclxuICAgIGV4cG9ydCBjb25zdCBTaW1wbGVIQmVhbTogU3ByaXRlID0gbmV3IFNwcml0ZShJbWFnZUxpc3QuVElMRU1BUF9NQVNURVIsIDAsIDk2LCAzMiwgMzIpO1xyXG4gICAgZXhwb3J0IGNvbnN0IFNpbXBsZUJsb2NrOiBTcHJpdGUgPSBuZXcgU3ByaXRlKEltYWdlTGlzdC5USUxFTUFQX01BU1RFUiwgMzIsIDk2LCAzMiwgMzIpO1xyXG5cclxuICAgIGV4cG9ydCBjb25zdCBCcm9jY29saTogU3ByaXRlID0gbmV3IFNwcml0ZShJbWFnZUxpc3QuQlJPQ0NPTEksIDAsIDAsIDExMSwgMTc1KTtcclxuICAgIGV4cG9ydCBjb25zdCBLcmFpZGdpZWZCcm9jY29saTogU3ByaXRlID0gbmV3IFNwcml0ZShJbWFnZUxpc3QuQlJPQ0NPTEksIDExMiwgMCwgMTExLCAxNzUpO1xyXG4gICAgZXhwb3J0IGNvbnN0IEJpZ0Jyb2Njb2xpOiBTcHJpdGUgPSBuZXcgU3ByaXRlKEltYWdlTGlzdC5CUk9DQ09MSSwgMCwgMTc1LCAyMTMsIDMzMSk7XHJcbiAgICBcclxuICAgIGV4cG9ydCBjb25zdCBTcGlrZVVwOiBTcHJpdGUgPSBuZXcgU3ByaXRlKEltYWdlTGlzdC5TUElLRSwgMCwgMCwgMzIsIDMyKTtcclxuICAgIGV4cG9ydCBjb25zdCBTcGlrZVJpZ2h0OiBTcHJpdGUgPSBuZXcgU3ByaXRlKEltYWdlTGlzdC5TUElLRSwgMzIsIDAsIDMyLCAzMik7XHJcbiAgICBleHBvcnQgY29uc3QgU3Bpa2VEb3duOiBTcHJpdGUgPSBuZXcgU3ByaXRlKEltYWdlTGlzdC5TUElLRSwgNjQsIDAsIDMyLCAzMik7XHJcbiAgICBleHBvcnQgY29uc3QgU3Bpa2VMZWZ0OiBTcHJpdGUgPSBuZXcgU3ByaXRlKEltYWdlTGlzdC5TUElLRSwgOTYsIDAsIDMyLCAzMik7XHJcblxyXG4gICAgZXhwb3J0IGNvbnN0IENsb3VkOiBTcHJpdGVbXSA9IFtuZXcgU3ByaXRlKEltYWdlTGlzdC5LVU1PX1BMQVRGT1JNLCAwLCAwLCAxMTIsIDMyKSwgbmV3IFNwcml0ZShJbWFnZUxpc3QuS1VNT19QTEFURk9STSwgMTEyLCAwLCAxMTIsIDMyKV07XHJcbiAgICBcclxuICAgIGV4cG9ydCBjb25zdCBEZWF0aE1lc3NhZ2U6IFNwcml0ZSA9IG5ldyBTcHJpdGUoSW1hZ2VMaXN0LkdBTUVPVkVSLCAwLCAwLCA4MDAsIDE4OCk7XHJcbn0iLCJpbXBvcnQgQmFzaWNPYmplY3QgZnJvbSAnLi4vb2JqZWN0cy9CYXNpY09iamVjdCc7XHJcbmltcG9ydCBHYW1lIGZyb20gJy4uL0dhbWUnO1xyXG5pbXBvcnQgeyBJRGlzcG9zYWJsZSwgSW5zdGFuY2VGYWJyaWMgfSBmcm9tICcuLi91dGlscy9JbnRlcmZhY2VzJztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi9TQVQvVmVjdG9yJztcclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzaWNMZXZlbCBpbXBsZW1lbnRzIElEaXNwb3NhYmxlLCBJbnN0YW5jZUZhYnJpYzxCYXNpY0xldmVsPiB7XHJcbiAgICBwdWJsaWMgYmFja2dyb3VuZFN0eWxlOiBzdHJpbmcgfCBDYW52YXNHcmFkaWVudCB8IENhbnZhc1BhdHRlcm4gPSBcIiMwMDAwMDBcIjtcclxuICAgIHB1YmxpYyBvYmplY3RzOiBCYXNpY09iamVjdFtdID0gW107XHJcbiAgICBwcm90ZWN0ZWQgcmVtb3ZlUXVldWU6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JqZWN0c1tpXS51cGRhdGUoZGVsdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2hpbGUodGhpcy5yZW1vdmVRdWV1ZS5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBvID0gMDsgbyA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IG8rKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub2JqZWN0c1tvXS5pZCA9PSB0aGlzLnJlbW92ZVF1ZXVlWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzW29dLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHMuc3BsaWNlKG8sIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlUXVldWUuc3BsaWNlKDAsIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVuZGVyaW5nXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RzW2ldLmRyYXcoY3R4LCBkZWx0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChHYW1lLkRFQlVHKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0NvbGxpc2lvbkxpbmVzKGN0eCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVPYmplY3QoaWQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlUXVldWUucHVzaChpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzUmVtb3ZlZChpZDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlUXVldWUuaW5kZXhPZihpZCkgIT09IC0xO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkcmF3Q29sbGlzaW9uTGluZXMoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcclxuICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvaW50czogVmVjdG9yW10gPSB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb2ludHM7XHJcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY3R4Lm1vdmVUbyh0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCArIHBvaW50c1swXS54LCB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueSArIHBvaW50c1swXS55KTtcclxuICAgICAgICAgICAgZm9yIChsZXQgcCA9IDE7IHAgPCBwb2ludHMubGVuZ3RoOyBwKyspIHtcclxuICAgICAgICAgICAgICAgIGN0eC5saW5lVG8odGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggKyBwb2ludHNbcF0ueCwgdGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnkgKyBwb2ludHNbcF0ueSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3R4LmxpbmVUbyh0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCArIHBvaW50c1swXS54LCB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueSArIHBvaW50c1swXS55KTtcclxuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHRoaXMub2JqZWN0c1tpXS5jb2xsaXNpb24gPyAnI2ZmMDAwMCcgOiAnIzAwMDBmZic7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB3aGlsZSh0aGlzLm9iamVjdHMubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RzWzBdLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RzLnNwbGljZSgwLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IGluc3RhbnRpYXRlKCk6IEJhc2ljTGV2ZWw7XHJcbn0iLCJpbXBvcnQgQXVkaW9NYW5hZ2VyIGZyb20gXCIuLi9BdWRpb01hbmFnZXJcIjtcclxuaW1wb3J0IEZha2VQbGF5ZXJPYmplY3QgZnJvbSBcIi4uL29iamVjdHMvcGxheWVyL0Zha2VQbGF5ZXJPYmplY3RcIjtcclxuaW1wb3J0IHsgU3ByaXRlT2JqZWN0LCBBbmltYXRlZFNwcml0ZU9iamVjdCB9IGZyb20gXCIuLi9vYmplY3RzL1Nwcml0ZU9iamVjdFwiO1xyXG5pbXBvcnQgVGlsZU9iamVjdCBmcm9tIFwiLi4vb2JqZWN0cy9UaWxlT2JqZWN0XCI7XHJcbmltcG9ydCB7IEltYWdlTGlzdCwgU3ByaXRlcyB9IGZyb20gXCIuLi9TcHJpdGVNYW5hZ2VyXCI7XHJcbmltcG9ydCBCYXNpY0xldmVsIGZyb20gXCIuL0Jhc2ljTGV2ZWxcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNhdmVTZWxlY3RNZW51IGV4dGVuZHMgQmFzaWNMZXZlbCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHNjcm9sbFZlbDogbnVtYmVyID0gNDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmJhY2tncm91bmRTdHlsZSA9IFwiI0M0RDdGN1wiO1xyXG4gICAgICAgIEF1ZGlvTWFuYWdlci5wbGF5TXVzaWMoXCJhc3NldHMvbXVzaWMvc2F2ZXNlbGVjdC5vZ2dcIik7XHJcblxyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwiZ3Jhc3NcIiwgMCwgMTcsIDI2LCAxLCBbU3ByaXRlcy5HcmFzc1JlZEJsb2NrXSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwiZ3JvdW5kXCIsIDAsIDE4LCAyNiwgMSwgW1Nwcml0ZXMuUmVkQmxvY2tdKSk7XHJcblxyXG4gICAgICAgIC8vIFRyZWVzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG9iajogU3ByaXRlT2JqZWN0ID0gbmV3IFNwcml0ZU9iamVjdChcInRyZWVcIiArIGksIChNYXRoLnJhbmRvbSgpICogODAwKSB8IDAsIDM2OSwgMTExLCAxNzUsIFNwcml0ZXMuQnJvY2NvbGkpO1xyXG4gICAgICAgICAgICBvYmouY29sbGlzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG9iaik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDbG91ZHNcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgb2JqOiBBbmltYXRlZFNwcml0ZU9iamVjdCA9IG5ldyBBbmltYXRlZFNwcml0ZU9iamVjdChcImNsb3VkXCIgKyBpLCAoTWF0aC5yYW5kb20oKSAqIDgwMCkgfCAwLCAoOTYgKyBNYXRoLnJhbmRvbSgpICogMjEwKSB8IDAsIDExMiwgMzIsIFNwcml0ZXMuQ2xvdWQsIDAuNSk7XHJcbiAgICAgICAgICAgIG9iai5jb2xsaXNpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gob2JqKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVJXHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFRpbGVPYmplY3QoXCJ0b3AwXCIsIDAsIDAsIDEsIDMsIFtTcHJpdGVzLlNpbXBsZUJsb2NrLCBTcHJpdGVzLlNpbXBsZVZCZWFtXSwgWzAsIDEsIDBdKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFRpbGVPYmplY3QoXCJ0b3AxXCIsIDI0LCAwLCAxLCAzLCBbU3ByaXRlcy5TaW1wbGVCbG9jaywgU3ByaXRlcy5TaW1wbGVWQmVhbV0sIFswLCAxLCAwXSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBTcHJpdGVPYmplY3QoXCJ0b3AyXCIsIDMyLCAwLCA3MzYsIDMyLCBTcHJpdGVzLlNpbXBsZUhCZWFtKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFNwcml0ZU9iamVjdChcInRvcDJcIiwgMzIsIDY0LCA3MzYsIDMyLCBTcHJpdGVzLlNpbXBsZUhCZWFtKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFRpbGVPYmplY3QoXCJzYXZlMF8wXCIsIDEsIDQsIDYsIDEsIFtTcHJpdGVzLlNpbXBsZUJsb2NrLCBTcHJpdGVzLlNpbXBsZUhCZWFtXSwgWzAsIDEsIDEsIDEsIDEsIDBdKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFRpbGVPYmplY3QoXCJzYXZlMF8xXCIsIDEsIDE0LCA2LCAxLCBbU3ByaXRlcy5TaW1wbGVCbG9jaywgU3ByaXRlcy5TaW1wbGVIQmVhbV0sIFswLCAxLCAxLCAxLCAxLCAwXSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBTcHJpdGVPYmplY3QoXCJzYXZlMF8yXCIsIDMyLCAxNjAsIDMyLCAyODgsIFNwcml0ZXMuU2ltcGxlVkJlYW0pKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgU3ByaXRlT2JqZWN0KFwic2F2ZTBfM1wiLCAxOTIsIDE2MCwgMzIsIDI4OCwgU3ByaXRlcy5TaW1wbGVWQmVhbSkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwic2F2ZTFfMFwiLCA5LCA0LCA2LCAxLCBbU3ByaXRlcy5TaW1wbGVCbG9jaywgU3ByaXRlcy5TaW1wbGVIQmVhbV0sIFswLCAxLCAxLCAxLCAxLCAwXSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwic2F2ZTFfMVwiLCA5LCAxNCwgNiwgMSwgW1Nwcml0ZXMuU2ltcGxlQmxvY2ssIFNwcml0ZXMuU2ltcGxlSEJlYW1dLCBbMCwgMSwgMSwgMSwgMSwgMF0pKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgU3ByaXRlT2JqZWN0KFwic2F2ZTFfMlwiLCAyODgsIDE2MCwgMzIsIDI4OCwgU3ByaXRlcy5TaW1wbGVWQmVhbSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBTcHJpdGVPYmplY3QoXCJzYXZlMV8zXCIsIDQ0OCwgMTYwLCAzMiwgMjg4LCBTcHJpdGVzLlNpbXBsZVZCZWFtKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFRpbGVPYmplY3QoXCJzYXZlMl8wXCIsIDE3LCA0LCA2LCAxLCBbU3ByaXRlcy5TaW1wbGVCbG9jaywgU3ByaXRlcy5TaW1wbGVIQmVhbV0sIFswLCAxLCAxLCAxLCAxLCAwXSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBUaWxlT2JqZWN0KFwic2F2ZTJfMVwiLCAxNywgMTQsIDYsIDEsIFtTcHJpdGVzLlNpbXBsZUJsb2NrLCBTcHJpdGVzLlNpbXBsZUhCZWFtXSwgWzAsIDEsIDEsIDEsIDEsIDBdKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFNwcml0ZU9iamVjdChcInNhdmUyXzJcIiwgNTQ0LCAxNjAsIDMyLCAyODgsIFNwcml0ZXMuU2ltcGxlVkJlYW0pKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgU3ByaXRlT2JqZWN0KFwic2F2ZTJfM1wiLCA3MDQsIDE2MCwgMzIsIDI4OCwgU3ByaXRlcy5TaW1wbGVWQmVhbSkpO1xyXG5cclxuICAgICAgICB0aGlzLm9iamVjdHMucHVzaChuZXcgRmFrZVBsYXllck9iamVjdCgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggLT0gU2F2ZVNlbGVjdE1lbnUuc2Nyb2xsVmVsICogZGVsdGE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCA8IC02NClcclxuICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54ID0gMDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggPCAtMzIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCArPSAzMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDI7IGkgPCA5OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggLT0gU2F2ZVNlbGVjdE1lbnUuc2Nyb2xsVmVsICogZGVsdGE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCA8IC0xMTEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCA9ICg4NTAgKyAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAxMDApIHwgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDk7IGkgPCAxNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy54IC09IFNhdmVTZWxlY3RNZW51LnNjcm9sbFZlbCAqIGRlbHRhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vYmplY3RzW2ldLnBvbHlnb24ucG9zLnggPCAtMTEyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHNbaV0ucG9seWdvbi5wb3MueCA9ICg4NTAgKyAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAxMDApIHwgMDtcclxuICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0c1tpXS5wb2x5Z29uLnBvcy55ID0gKDk2ICsgTWF0aC5yYW5kb20oKSAqIDIxMCkgfCAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjODgzOTFFXCI7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDU0NCwgODAwLCA2NCk7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKGN0eCwgZGVsdGEpO1xyXG4gICAgICAgIHRoaXMuZHJhd1VJKGN0eCwgZGVsdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3VUkoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjdHguZm9udCA9IFwiMTlweCBjb21pY3NhbnNcIjtcclxuICAgICAgICBjdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICAvLyB0b3BcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjMDAwMDAwXCI7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KDMyLCAzMiwgNzM2LCAzMik7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmZmZlwiO1xyXG4gICAgICAgIGN0eC5maWxsVGV4dChcIiogU2VsZWN0IFlvdXIgU2F2ZWQgR2FtZSAqXCIsIDM4NCwgNTYpO1xyXG4gICAgICAgIGN0eC5mb250ID0gXCIxNnB4IGNvbWljc2Fuc1wiO1xyXG4gICAgICAgIC8vIHNhdmUwXHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMDAwMFwiO1xyXG4gICAgICAgIGN0eC5maWxsUmVjdCg2NCwgMTYwLCAxMjgsIDI4OCk7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZShJbWFnZUxpc3QuTkVXR0FNRSwgNjQsIDE5Mik7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmZmZlwiO1xyXG4gICAgICAgIGN0eC5maWxsVGV4dChcIlNBVkUgR0FNRSAxXCIsIDEyOCwgMTgyKTtcclxuICAgICAgICAvLyBzYXZlMVxyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiMwMDAwMDBcIjtcclxuICAgICAgICBjdHguZmlsbFJlY3QoMzIwLCAxNjAsIDEyOCwgMjg4KTtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKEltYWdlTGlzdC5ORVdHQU1FLCAzMjAsIDE5Mik7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmZmZlwiO1xyXG4gICAgICAgIGN0eC5maWxsVGV4dChcIlNBVkUgR0FNRSAyXCIsIDM4NCwgMTgyKTtcclxuICAgICAgICAvLyBzYXZlMlxyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiMwMDAwMDBcIjtcclxuICAgICAgICBjdHguZmlsbFJlY3QoNTc2LCAxNjAsIDEyOCwgMjg4KTtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKEltYWdlTGlzdC5ORVdHQU1FLCA1NzYsIDE5Mik7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmZmZlwiO1xyXG4gICAgICAgIGN0eC5maWxsVGV4dChcIlNBVkUgR0FNRSAzXCIsIDY0MCwgMTgyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5zdGFudGlhdGUoKTogQmFzaWNMZXZlbCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTYXZlU2VsZWN0TWVudSgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJhc2ljTGV2ZWwgZnJvbSAnLi9CYXNpY0xldmVsJztcclxuaW1wb3J0IFBsYXllck9iamVjdCBmcm9tICcuLi9vYmplY3RzL3BsYXllci9QbGF5ZXJPYmplY3QnO1xyXG5pbXBvcnQgU3Bpa2VPYmplY3QgZnJvbSAnLi4vb2JqZWN0cy9TcGlrZU9iamVjdCc7XHJcbmltcG9ydCBBdWRpb01hbmFnZXIgZnJvbSAnLi4vQXVkaW9NYW5hZ2VyJztcclxuaW1wb3J0IFRpbGVPYmplY3QgZnJvbSAnLi4vb2JqZWN0cy9UaWxlT2JqZWN0JztcclxuaW1wb3J0IHsgU3ByaXRlcyB9IGZyb20gJy4uL1Nwcml0ZU1hbmFnZXInO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0TGV2ZWwgZXh0ZW5kcyBCYXNpY0xldmVsIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kU3R5bGUgPSBcIiNDNEQ3RjdcIjtcclxuICAgICAgICBBdWRpb01hbmFnZXIucGxheU11c2ljKFwiYXNzZXRzL211c2ljL2JlZ2lucy5vZ2dcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFBsYXllck9iamVjdCgzMiwgNTEyKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFRpbGVPYmplY3QoXCJncm91bmQwXCIsIDAsIDE4LCAyNSwgMSwgW1Nwcml0ZXMuUmVkQmxvY2tdKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFRpbGVPYmplY3QoXCJ3YWxsMFwiLCA4LCAxNCwgMSwgNCwgW1Nwcml0ZXMuUmVkQmxvY2tdKSk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gobmV3IFRpbGVPYmplY3QoXCJ3YWxsMVwiLCA5LCAxMiwgMSwgNiwgW1Nwcml0ZXMuUmVkQmxvY2tdKSk7XHJcblxyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBTcGlrZU9iamVjdChcInNwaWtlMFwiLCAzMjAsIDQxNiwgMSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBTcGlrZU9iamVjdChcInNwaWtlMVwiLCAzMjAsIDM4NCwgMSkpO1xyXG4gICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKG5ldyBTcGlrZU9iamVjdChcInNwaWtlMlwiLCAyODgsIDM1MiwgMCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnN0YW50aWF0ZSgpOiBCYXNpY0xldmVsIHtcclxuICAgICAgICByZXR1cm4gbmV3IFRlc3RMZXZlbCgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi4vR2FtZSc7XHJcbmltcG9ydCB7IElEaXNwb3NhYmxlIH0gZnJvbSAnLi4vdXRpbHMvSW50ZXJmYWNlcyc7XHJcbmltcG9ydCBTQVQgZnJvbSAnLi4vU0FUL1NBVCc7XHJcbmltcG9ydCBSZXNwb25zZSBmcm9tICcuLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgUG9seWdvbiBmcm9tICcuLi9TQVQvUG9seWdvbic7XHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi4vU0FUL1ZlY3Rvcic7XHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2ljT2JqZWN0IGltcGxlbWVudHMgSURpc3Bvc2FibGUge1xyXG4gICAgcHVibGljIHBvbHlnb246IFBvbHlnb247XHJcbiAgICBwdWJsaWMgY29sbGlzaW9uOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICBpZiAodyA9PSAwICYmIGggPT0gMCkgdGhpcy5jb2xsaXNpb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHgsIHkpLCBbXHJcbiAgICAgICAgICAgIG5ldyBWZWN0b3IoKSwgbmV3IFZlY3RvcigwLCBoKSxcclxuICAgICAgICAgICAgbmV3IFZlY3Rvcih3LCBoKSwgbmV3IFZlY3Rvcih3LCAwKVxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb3ZlQnkoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgY29sbGlkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBvbHlnb24ucG9zLmFkZChuZXcgVmVjdG9yKHgsIHkpKTtcclxuICAgICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHYW1lLmxldmVsLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCFHYW1lLmxldmVsLm9iamVjdHNbaV0uY29sbGlzaW9uIHx8IEdhbWUubGV2ZWwub2JqZWN0c1tpXS5pZCA9PSB0aGlzLmlkKSBjb250aW51ZTtcclxuICAgICAgICAgICAgcmVzcG9uc2UuY2xlYXIoKTtcclxuICAgICAgICAgICAgaWYgKFNBVC50ZXN0UG9seWdvblBvbHlnb24odGhpcy5wb2x5Z29uLCBHYW1lLmxldmVsLm9iamVjdHNbaV0ucG9seWdvbiwgcmVzcG9uc2UpKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xsaWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgYUNvbGw6IGJvb2xlYW4gPSB0aGlzLm9uQ29sbGlzaW9uKHJlc3BvbnNlLCBHYW1lLmxldmVsLm9iamVjdHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJDb2xsOiBib29sZWFuID0gR2FtZS5sZXZlbC5vYmplY3RzW2ldLm9uQ29sbGlzaW9uKHJlc3BvbnNlLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIGlmIChhQ29sbCAmJiBiQ29sbCAmJiB0aGlzLmNvbGxpc2lvbikgdGhpcy5wb2x5Z29uLnBvcy5zdWIocmVzcG9uc2Uub3ZlcmxhcFYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb2xsaWRlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Db2xsaXNpb24oaW5mbzogUmVzcG9uc2UsIG9iajogQmFzaWNPYmplY3QpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZDtcclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHt9XHJcbn0iLCJpbXBvcnQgUG9seWdvbiBmcm9tICcuLi9TQVQvUG9seWdvbic7XHJcbmltcG9ydCBSZXNwb25zZSBmcm9tICcuLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uL1NBVC9WZWN0b3InO1xyXG5pbXBvcnQgQmFzaWNPYmplY3QgZnJvbSAnLi9CYXNpY09iamVjdCc7XHJcbmltcG9ydCB7IFNwcml0ZU9iamVjdCB9IGZyb20gJy4vU3ByaXRlT2JqZWN0JztcclxuaW1wb3J0IFBsYXllck9iamVjdCBmcm9tICcuL3BsYXllci9QbGF5ZXJPYmplY3QnO1xyXG5pbXBvcnQgeyBTcHJpdGUsIFNwcml0ZXMgfSBmcm9tICcuLi9TcHJpdGVNYW5hZ2VyJztcclxuXHJcbmV4cG9ydCBjb25zdCBlbnVtIFNwaWtlRGlyZWN0aW9uIHtcclxuICAgIFVwLCBSaWdodCwgRG93biwgTGVmdFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGlrZU9iamVjdCBleHRlbmRzIFNwcml0ZU9iamVjdCB7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZGlyZWN0aW9uOiBTcGlrZURpcmVjdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgZGlyZWN0aW9uOiBTcGlrZURpcmVjdGlvbiA9IDApIHtcclxuICAgICAgICBzdXBlcihpZCwgeCwgeSwgMzIsIDMyLCBTcGlrZU9iamVjdC5nZXREaXJTcHJpdGUoZGlyZWN0aW9uKSk7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XHJcbiAgICAgICAgc3dpdGNoKHRoaXMuZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgY2FzZSBTcGlrZURpcmVjdGlvbi5MZWZ0OlxyXG4gICAgICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHgsIHkpLCBbXHJcbiAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKDEsIDE2KSwgbmV3IFZlY3RvcigzMSwgMzEpLCBuZXcgVmVjdG9yKDMxLCAxKVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBTcGlrZURpcmVjdGlvbi5Eb3duOlxyXG4gICAgICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHgsIHkpLCBbXHJcbiAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKDEsIDEpLCBuZXcgVmVjdG9yKDE2LCAzMSksIG5ldyBWZWN0b3IoMzEsIDEpXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFNwaWtlRGlyZWN0aW9uLlJpZ2h0OlxyXG4gICAgICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHgsIHkpLCBbXHJcbiAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKDEsIDEpLCBuZXcgVmVjdG9yKDEsIDMxKSwgbmV3IFZlY3RvcigzMSwgMTYpXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHgsIHkpLCBbXHJcbiAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKDE2LCAxKSwgbmV3IFZlY3RvcigxLCAzMSksIG5ldyBWZWN0b3IoMzEsIDMxKVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQ29sbGlzaW9uKGluZm86IFJlc3BvbnNlLCBvYmo6IEJhc2ljT2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFBsYXllck9iamVjdCkge1xyXG4gICAgICAgICAgICAob2JqIGFzIFBsYXllck9iamVjdCkuZGllKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldERpclNwcml0ZShkaXI6IFNwaWtlRGlyZWN0aW9uKTogU3ByaXRlIHtcclxuICAgICAgICBjb25zdCBzcGlrZURpclNwcml0ZXM6IFNwcml0ZVtdID0gW1Nwcml0ZXMuU3Bpa2VVcCwgU3ByaXRlcy5TcGlrZVJpZ2h0LCBTcHJpdGVzLlNwaWtlRG93biwgU3ByaXRlcy5TcGlrZUxlZnRdO1xyXG4gICAgICAgIHJldHVybiBzcGlrZURpclNwcml0ZXNbZGlyXTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNwcml0ZSB9IGZyb20gJy4uL1Nwcml0ZU1hbmFnZXInO1xyXG5pbXBvcnQgQmFzaWNPYmplY3QgZnJvbSAnLi9CYXNpY09iamVjdCc7XHJcbmV4cG9ydCBjbGFzcyBTcHJpdGVPYmplY3QgZXh0ZW5kcyBCYXNpY09iamVjdCB7XHJcbiAgICBwdWJsaWMgc3ByaXRlOiBTcHJpdGU7XHJcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBoZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgdzogbnVtYmVyLCBoOiBudW1iZXIsIHNwcml0ZTogU3ByaXRlKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHgsIHksIHcsIGgpO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlID0gc3ByaXRlO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3O1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHt9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpIHtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuc3ByaXRlLnNvdXJjZSwgdGhpcy5zcHJpdGUueCwgdGhpcy5zcHJpdGUueSwgdGhpcy5zcHJpdGUudywgdGhpcy5zcHJpdGUuaCwgdGhpcy5wb2x5Z29uLnBvcy54IHwgMCwgdGhpcy5wb2x5Z29uLnBvcy55IHwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQW5pbWF0ZWRTcHJpdGVPYmplY3QgZXh0ZW5kcyBCYXNpY09iamVjdCB7XHJcbiAgICBwdWJsaWMgc3ByaXRlczogU3ByaXRlW107XHJcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBoZWlnaHQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBhbmltRHVyYXRpb246IG51bWJlcjtcclxuICAgIHByaXZhdGUgZnJhbWVUaW1lcjogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgdzogbnVtYmVyLCBoOiBudW1iZXIsIHNwcml0ZXM6IFNwcml0ZVtdLCBhbmltRHVyYXRpb246IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKGlkLCB4LCB5LCB3LCBoKTtcclxuICAgICAgICB0aGlzLnNwcml0ZXMgPSBzcHJpdGVzO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3O1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaDtcclxuICAgICAgICB0aGlzLmFuaW1EdXJhdGlvbiA9IGFuaW1EdXJhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHt9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGRlbHRhOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmZyYW1lVGltZXIgPSAodGhpcy5mcmFtZVRpbWVyICsgZGVsdGEpICUgdGhpcy5hbmltRHVyYXRpb247XHJcbiAgICAgICAgbGV0IGk6IG51bWJlciA9IE1hdGguZmxvb3IodGhpcy5mcmFtZVRpbWVyICogdGhpcy5zcHJpdGVzLmxlbmd0aCAvIHRoaXMuYW5pbUR1cmF0aW9uKTtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuc3ByaXRlc1tpXS5zb3VyY2UsIHRoaXMuc3ByaXRlc1tpXS54LCB0aGlzLnNwcml0ZXNbaV0ueSwgdGhpcy5zcHJpdGVzW2ldLncsIHRoaXMuc3ByaXRlc1tpXS5oLCB0aGlzLnBvbHlnb24ucG9zLnggfCAwLCB0aGlzLnBvbHlnb24ucG9zLnkgfCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTcHJpdGUgfSBmcm9tIFwiLi4vU3ByaXRlTWFuYWdlclwiO1xyXG5pbXBvcnQgQmFzaWNPYmplY3QgZnJvbSBcIi4vQmFzaWNPYmplY3RcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlsZU9iamVjdCBleHRlbmRzIEJhc2ljT2JqZWN0IHtcclxuICAgIHB1YmxpYyBzcHJpdGVMaXN0OiBTcHJpdGVbXTtcclxuICAgIHB1YmxpYyB4UmVwZWF0OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgeVJlcGVhdDogbnVtYmVyO1xyXG4gICAgcHVibGljIHRpbGVXaWR0aDogbnVtYmVyO1xyXG4gICAgcHVibGljIHRpbGVIZWlnaHQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBvcmRlcjogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgeFJlcGVhdDogbnVtYmVyLCB5UmVwZWF0OiBudW1iZXIsIHNwcml0ZXM6IFNwcml0ZVtdLCBvcmRlcj86IG51bWJlcltdLCB0aWxlV2lkdGg6IG51bWJlciA9IHNwcml0ZXNbMF0udywgdGlsZUhlaWdodDogbnVtYmVyID0gc3ByaXRlc1swXS5oKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHggKiB0aWxlV2lkdGgsIHkgKiB0aWxlSGVpZ2h0LCB4UmVwZWF0ICogdGlsZVdpZHRoLCB5UmVwZWF0ICogdGlsZUhlaWdodCk7XHJcbiAgICAgICAgdGhpcy54UmVwZWF0ID0geFJlcGVhdDtcclxuICAgICAgICB0aGlzLnlSZXBlYXQgPSB5UmVwZWF0O1xyXG4gICAgICAgIHRoaXMudGlsZVdpZHRoID0gdGlsZVdpZHRoO1xyXG4gICAgICAgIHRoaXMudGlsZUhlaWdodCA9IHRpbGVIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVMaXN0ID0gc3ByaXRlcztcclxuICAgICAgICBpZiAob3JkZXIgIT09IHVuZGVmaW5lZCkgdGhpcy5vcmRlciA9IG9yZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZGVsdGE6IG51bWJlcik6IHZvaWQge31cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy54UmVwZWF0ICogdGhpcy55UmVwZWF0OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNwcml0ZTogU3ByaXRlID0gdGhpcy5zcHJpdGVMaXN0W2kgPCB0aGlzLm9yZGVyLmxlbmd0aCA/IHRoaXMub3JkZXJbaV0gOiAwXTtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShzcHJpdGUuc291cmNlLCBzcHJpdGUueCwgc3ByaXRlLnksIHNwcml0ZS53LCBzcHJpdGUuaCxcclxuICAgICAgICAgICAgICAgIHRoaXMucG9seWdvbi5wb3MueCArIChpICUgdGhpcy54UmVwZWF0KSAqIHRoaXMudGlsZVdpZHRoLCB0aGlzLnBvbHlnb24ucG9zLnkgKyBNYXRoLmZsb29yKGkgLyB0aGlzLnhSZXBlYXQpICogdGhpcy50aWxlSGVpZ2h0LCB0aGlzLnRpbGVXaWR0aCwgdGhpcy50aWxlSGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUmVzcG9uc2UgZnJvbSAnLi4vLi4vU0FUL1Jlc3BvbnNlJztcclxuaW1wb3J0IFNBVCBmcm9tICcuLi8uLi9TQVQvU0FUJztcclxuaW1wb3J0IFBsYXllck9iamVjdCBmcm9tICcuL1BsYXllck9iamVjdCc7XHJcbmltcG9ydCBHYW1lIGZyb20gJy4uLy4uL0dhbWUnO1xyXG5pbXBvcnQgQmFzaWNPYmplY3QgZnJvbSAnLi4vQmFzaWNPYmplY3QnO1xyXG5pbXBvcnQgU3Bpa2VPYmplY3QgZnJvbSAnLi4vU3Bpa2VPYmplY3QnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uLy4uL1NBVC9WZWN0b3InO1xyXG5pbXBvcnQgeyBJbWFnZUxpc3QgfSBmcm9tICcuLi8uLi9TcHJpdGVNYW5hZ2VyJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmxvb2RQYXJ0aWNsZSBleHRlbmRzIEJhc2ljT2JqZWN0IHtcclxuICAgIHB1YmxpYyBkeDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBkeTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzdHVjazogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHR5cGU6IG51bWJlciA9IDA7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCBkeDogbnVtYmVyLCBkeTogbnVtYmVyLCBpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoaWQsIHgsIHksIDIsIDIpO1xyXG4gICAgICAgIHRoaXMuZHggPSBkeDtcclxuICAgICAgICB0aGlzLmR5ID0gZHk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMyk7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb24gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5zdHVjaykgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZHkgKz0gUGxheWVyT2JqZWN0LmdyYXZpdHkgKiBkZWx0YTtcclxuICAgICAgICBpZiAodGhpcy5keCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5keCAtPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZHggPCAwKSB0aGlzLmR4ID0gMDtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZHggPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHggKz0gZGVsdGE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmR4ID4gMCkgdGhpcy5keCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm1vdmVCeSh0aGlzLmR4LCB0aGlzLmR5KSkge1xyXG4gICAgICAgICAgICB0aGlzLmR4ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5keSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc3R1Y2sgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbW92ZUJ5KHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGNvbGxpZGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wb2x5Z29uLnBvcy5hZGQobmV3IFZlY3Rvcih4LCB5KSk7XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZSA9IG5ldyBSZXNwb25zZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2FtZS5sZXZlbC5vYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghR2FtZS5sZXZlbC5vYmplY3RzW2ldLmNvbGxpc2lvbiB8fCBHYW1lLmxldmVsLm9iamVjdHNbaV0uaWQgPT0gdGhpcy5pZCkgY29udGludWU7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGlmIChTQVQudGVzdFBvbHlnb25Qb2x5Z29uKHRoaXMucG9seWdvbiwgR2FtZS5sZXZlbC5vYmplY3RzW2ldLnBvbHlnb24sIHJlc3BvbnNlKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFDb2xsOiBib29sZWFuID0gdGhpcy5vbkNvbGxpc2lvbihyZXNwb25zZSwgR2FtZS5sZXZlbC5vYmplY3RzW2ldKTtcclxuICAgICAgICAgICAgICAgIEdhbWUubGV2ZWwub2JqZWN0c1tpXS5vbkNvbGxpc2lvbihyZXNwb25zZSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYUNvbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvbHlnb24ucG9zLnN1YihyZXNwb25zZS5vdmVybGFwVik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGlkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb2xsaWRlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Db2xsaXNpb24oaW5mbzogUmVzcG9uc2UsIG9iajogQmFzaWNPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgUGxheWVyT2JqZWN0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIFNwaWtlT2JqZWN0KSByZXR1cm4gTWF0aC5yYW5kb20oKSA8IDAuNTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIHRoaXMudHlwZSAqIDMsIDM0LCAzLCA0LCB0aGlzLnBvbHlnb24ucG9zLnggLSAxLCB0aGlzLnBvbHlnb24ucG9zLnkgLSAxLCAzLCA0KTtcclxuICAgIH1cclxufSIsImltcG9ydCBQbGF5ZXJPYmplY3QgZnJvbSAnLi9QbGF5ZXJPYmplY3QnO1xyXG5pbXBvcnQgUmVzcG9uc2UgZnJvbSAnLi4vLi4vU0FUL1Jlc3BvbnNlJztcclxuaW1wb3J0IEJhc2ljT2JqZWN0IGZyb20gJy4uL0Jhc2ljT2JqZWN0JztcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi4vLi4vR2FtZSc7XHJcbmltcG9ydCBTcGlrZU9iamVjdCBmcm9tICcuLi9TcGlrZU9iamVjdCc7XHJcbmltcG9ydCB7IEltYWdlTGlzdCB9IGZyb20gJy4uLy4uL1Nwcml0ZU1hbmFnZXInO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsZXRPYmplY3QgZXh0ZW5kcyBCYXNpY09iamVjdCB7XHJcbiAgICBwcm90ZWN0ZWQgZnJhbWVUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHJvdGVjdGVkIGRpcmVjdGlvbjogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCBkaXJlY3Rpb246IG51bWJlciwgaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGlkLCB4IC0gNSwgeSAtIDEsIDEwLCAyKTtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1vdmVCeSh0aGlzLmRpcmVjdGlvbiAqIDc1MCAqIGRlbHRhLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Db2xsaXNpb24oaW5mbzogUmVzcG9uc2UsIG9iajogQmFzaWNPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgU3Bpa2VPYmplY3QpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgUGxheWVyT2JqZWN0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgR2FtZS5sZXZlbC5yZW1vdmVPYmplY3QodGhpcy5pZCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mcmFtZVRpbWUgPSAodGhpcy5mcmFtZVRpbWUgKyBkZWx0YSkgJSAwLjIwO1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LlBMQVlFUiwgTWF0aC5mbG9vcih0aGlzLmZyYW1lVGltZSAvIDAuMTApICogNCwgMTYwLCA0LCA0LCAodGhpcy5wb2x5Z29uLnBvcy54IHwgMCkgKyAzLCAodGhpcy5wb2x5Z29uLnBvcy55IHwgMCkgLSAxLCA0LCA0KTtcclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lIGZyb20gXCIuLi8uLi9HYW1lXCI7XHJcbmltcG9ydCBQbGF5ZXJPYmplY3QgZnJvbSBcIi4vUGxheWVyT2JqZWN0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGYWtlUGxheWVyT2JqZWN0IGV4dGVuZHMgUGxheWVyT2JqZWN0IHtcclxuICAgIHB1YmxpYyBzZWxlY3RlZFNhdmU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyID0gMTEyLCB5OiBudW1iZXIgPSA1MTIsIGlkOiBzdHJpbmcgPSBcImZha2VfcGxheWVyXCIpIHtcclxuICAgICAgICBzdXBlcih4LCB5LCBpZCk7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9uR3JvdW5kID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmR4ID0gTnVtYmVyLkVQU0lMT047XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCdBcnJvd1JpZ2h0JykpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmlnaHRLZXlUaW1lKysgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFNhdmUgPSAodGhpcy5zZWxlY3RlZFNhdmUgKyAxKSAlIDM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgdGhpcy5yaWdodEtleVRpbWUgPSAwO1xyXG4gICAgICAgIGlmIChHYW1lLmlzQnV0dG9uRG93bignQXJyb3dMZWZ0JykpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGVmdEtleVRpbWUrKyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkU2F2ZSA9ICh0aGlzLnNlbGVjdGVkU2F2ZSAtIDEgKyAzKSAlIDM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgdGhpcy5sZWZ0S2V5VGltZSA9IDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKEdhbWUuaXNCdXR0b25Eb3duKCd4JykpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvb3RLZXlUaW1lKysgPT0gMClcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3QoKTtcclxuICAgICAgICB9IGVsc2UgdGhpcy5zaG9vdEtleVRpbWUgPSAwO1xyXG5cclxuICAgICAgICBpZiAoR2FtZS5pc0J1dHRvbkRvd24oJ1NoaWZ0JykgfHwgR2FtZS5pc0J1dHRvbkRvd24oJ3onKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5qdW1wS2V5VGltZSsrID09IDApXHJcbiAgICAgICAgICAgICAgICBHYW1lLmxvYWRTYXZlKHRoaXMuc2VsZWN0ZWRTYXZlKTtcclxuICAgICAgICB9IGVsc2UgdGhpcy5qdW1wS2V5VGltZSA9IDA7XHJcblxyXG4gICAgICAgIGxldCB0YXJnZXRQb3MgPSAxMTIgKyB0aGlzLnNlbGVjdGVkU2F2ZSAqIDMyICogODtcclxuICAgICAgICBsZXQgZHggPSBNYXRoLm1pbihNYXRoLmFicyh0aGlzLnBvbHlnb24ucG9zLnggLSB0YXJnZXRQb3MpLCBQbGF5ZXJPYmplY3QudmVsb2NpdHkgKiA0ICogZGVsdGEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubW92ZUJ5KHRoaXMucG9seWdvbi5wb3MueCA+IHRhcmdldFBvcyA/IC1keCA6IGR4LCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGllKCk6IHZvaWQge31cclxufSIsImltcG9ydCBSZXNwb25zZSBmcm9tICcuLi8uLi9TQVQvUmVzcG9uc2UnO1xyXG5pbXBvcnQgU0FUIGZyb20gJy4uLy4uL1NBVC9TQVQnO1xyXG5pbXBvcnQgUGxheWVyT2JqZWN0IGZyb20gJy4vUGxheWVyT2JqZWN0JztcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi4vLi4vR2FtZSc7XHJcbmltcG9ydCBCYXNpY09iamVjdCBmcm9tICcuLi9CYXNpY09iamVjdCc7XHJcbmltcG9ydCBTcGlrZU9iamVjdCBmcm9tICcuLi9TcGlrZU9iamVjdCc7XHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4uLy4uL1NBVC9Qb2x5Z29uJztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi8uLi9TQVQvVmVjdG9yJztcclxuaW1wb3J0IHsgSW1hZ2VMaXN0IH0gZnJvbSAnLi4vLi4vU3ByaXRlTWFuYWdlcic7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdpYlBhcnRpY2xlIGV4dGVuZHMgQmFzaWNPYmplY3Qge1xyXG4gICAgcHVibGljIGR4OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGR5OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHR5cGU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgYm9keVZhcmlhbnQ6IG51bWJlciA9IDA7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogVHlwZSAwOiBib2R5LFxyXG4gICAgICogdHlwZSAxOiBib2R5IHN0b25lZCxcclxuICAgICAqIHR5cGUgMjogaGVhZCxcclxuICAgICAqIHR5cGUgMzogaGVhZCBzdG9uZWQsXHJcbiAgICAgKiB0eXBlIDQ6IGFybSxcclxuICAgICAqIHR5cGUgNTogYXJtIHN0b25lZCxcclxuICAgICAqIHR5cGUgNjogZmVldCxcclxuICAgICAqIHR5cGUgNzogZmVldCBzdG9uZWRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIGR4OiBudW1iZXIsIGR5OiBudW1iZXIsIHR5cGU6IG51bWJlciwgaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGlkLCB4LCB5LCA4LCA4KTtcclxuICAgICAgICB0aGlzLmR4ID0gZHg7XHJcbiAgICAgICAgdGhpcy5keSA9IGR5O1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb24gPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy50eXBlID09IDAgfHwgdGhpcy50eXBlID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5ib2R5VmFyaWFudCA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDMyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5keSArPSBQbGF5ZXJPYmplY3QuZ3Jhdml0eSAqIE1hdGgubWluKGRlbHRhLCAwLjMpO1xyXG4gICAgICAgIGlmICh0aGlzLmR4ID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmR4IC09IGRlbHRhO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5keCA8IDApIHRoaXMuZHggPSAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5keCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5keCArPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZHggPiAwKSB0aGlzLmR4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb3ZlQnkodGhpcy5keCwgdGhpcy5keSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vdmVCeSh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBjb2xsaWRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB0aGlzQUFCQjogUG9seWdvbiA9IHRoaXMucG9seWdvbi5nZXRBQUJCKCk7XHJcbiAgICAgICAgdGhpcy5wb2x5Z29uLnBvcy5hZGQobmV3IFZlY3Rvcih4LCB5KSk7XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZSA9IG5ldyBSZXNwb25zZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR2FtZS5sZXZlbC5vYmplY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghR2FtZS5sZXZlbC5vYmplY3RzW2ldLmNvbGxpc2lvbiB8fCBHYW1lLmxldmVsLm9iamVjdHNbaV0uaWQgPT0gdGhpcy5pZCkgY29udGludWU7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIGlmIChTQVQudGVzdFBvbHlnb25Qb2x5Z29uKHRoaXMucG9seWdvbiwgR2FtZS5sZXZlbC5vYmplY3RzW2ldLnBvbHlnb24sIHJlc3BvbnNlKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFDb2xsOiBib29sZWFuID0gdGhpcy5vbkNvbGxpc2lvbihyZXNwb25zZSwgR2FtZS5sZXZlbC5vYmplY3RzW2ldKTtcclxuICAgICAgICAgICAgICAgIEdhbWUubGV2ZWwub2JqZWN0c1tpXS5vbkNvbGxpc2lvbihyZXNwb25zZSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYUNvbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvbHlnb24ucG9zLnN1YihyZXNwb25zZS5vdmVybGFwVik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGlkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvYmp0QUFCQjogUG9seWdvbiA9IEdhbWUubGV2ZWwub2JqZWN0c1tpXS5wb2x5Z29uLmdldEFBQkIoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc0FBQkIucG9zLnkgKyB0aGlzQUFCQi5wb2ludHNbMl0ueSA8PSBvYmp0QUFCQi5wb3MueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCB0aGlzQUFCQi5wb3MueSA+PSBvYmp0QUFCQi5wb3MueSArIG9ianRBQUJCLnBvaW50c1syXS55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHkgKj0gLTAuNzU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5keCAqPSAtMC43NTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbGxpZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbGxpc2lvbihpbmZvOiBSZXNwb25zZSwgb2JqOiBCYXNpY09iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBQbGF5ZXJPYmplY3QgfHwgb2JqIGluc3RhbmNlb2YgU3Bpa2VPYmplY3QpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLnR5cGUpIHtcclxuICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIHRoaXMuYm9keVZhcmlhbnQgKiAyLCAwLCAyLCA5LCB0aGlzLnBvbHlnb24ucG9zLnggKyA0LCB0aGlzLnBvbHlnb24ucG9zLnksIDIsIDkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIHRoaXMuYm9keVZhcmlhbnQgKiAyLCA5LCAyLCA5LCB0aGlzLnBvbHlnb24ucG9zLnggKyA0LCB0aGlzLnBvbHlnb24ucG9zLnksIDIsIDkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIDAsIDE4LCAxMCwgMTYsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCAxMCwgMTYpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIDEwLCAxOCwgMTAsIDE2LCB0aGlzLnBvbHlnb24ucG9zLngsIHRoaXMucG9seWdvbi5wb3MueSwgMTAsIDE2KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKEltYWdlTGlzdC5HT1JFLCAyMCwgMTgsIDgsIDgsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCA4LCA4KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKEltYWdlTGlzdC5HT1JFLCAyOCwgMTgsIDgsIDgsIHRoaXMucG9seWdvbi5wb3MueCwgdGhpcy5wb2x5Z29uLnBvcy55LCA4LCA4KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKEltYWdlTGlzdC5HT1JFLCAzNiwgMTgsIDQsIDQsIHRoaXMucG9seWdvbi5wb3MueCArIDIsIHRoaXMucG9seWdvbi5wb3MueSArIDQsIDQsIDQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoSW1hZ2VMaXN0LkdPUkUsIDM2LCAyMiwgNCwgNCwgdGhpcy5wb2x5Z29uLnBvcy54ICsgMiwgdGhpcy5wb2x5Z29uLnBvcy55ICsgNCwgNCwgNCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWUgZnJvbSAnLi4vLi4vR2FtZSc7XHJcbmltcG9ydCBCYXNpY09iamVjdCBmcm9tICcuLi9CYXNpY09iamVjdCc7XHJcbmltcG9ydCBCdWxsZXRPYmplY3QgZnJvbSAnLi9CdWxsZXRPYmplY3QnO1xyXG5pbXBvcnQgeyByYW5kb21VbnNlY3VyZVVVSUQsIGJ1ZmZlckRyYXdJbWFnZSB9IGZyb20gJy4uLy4uL3V0aWxzL0NvbW1vblV0aWxzJztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuLi8uLi9TQVQvVmVjdG9yJztcclxuaW1wb3J0IEJsb29kUGFydGljbGUgZnJvbSAnLi9CbG9vZFBhcnRpY2xlJztcclxuaW1wb3J0IEdpYlBhcnRpY2xlIGZyb20gJy4vR2liUGFydGljbGUnO1xyXG5pbXBvcnQgQXVkaW9NYW5hZ2VyIGZyb20gJy4uLy4uL0F1ZGlvTWFuYWdlcic7XHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4uLy4uL1NBVC9Qb2x5Z29uJztcclxuaW1wb3J0IHsgSW1hZ2VMaXN0LCBTcHJpdGVzIH0gZnJvbSAnLi4vLi4vU3ByaXRlTWFuYWdlcic7XHJcbmltcG9ydCB7IFNwcml0ZU9iamVjdCB9IGZyb20gJy4uL1Nwcml0ZU9iamVjdCc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllck9iamVjdCBleHRlbmRzIEJhc2ljT2JqZWN0IHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdmVsb2NpdHk6IG51bWJlciA9IDE3NTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZ3Jhdml0eTogbnVtYmVyID0gMjQ7XHJcblxyXG4gICAgcHVibGljIGZyYW1lVGltZXI6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgbG9va2luZ0RpcmVjdGlvbjogbnVtYmVyID0gMTtcclxuXHJcbiAgICBwdWJsaWMgcmlnaHRLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGxlZnRLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGp1bXBLZXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHNob290S2V5VGltZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwdWJsaWMgZHg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgZHk6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgb25Hcm91bmQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBhdmFpbGFibGVKdW1wczogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgaWQ6IHN0cmluZyA9IFwicGxheWVyXCIpIHtcclxuICAgICAgICBzdXBlcihpZCwgeCwgeSwgMzIsIDMyKTtcclxuICAgICAgICB0aGlzLnBvbHlnb24gPSBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHgsIHkpLCBbXHJcbiAgICAgICAgICAgIG5ldyBWZWN0b3IoOSwgMTEpLCBuZXcgVmVjdG9yKDksIDMyKSxcclxuICAgICAgICAgICAgbmV3IFZlY3RvcigyMywgMzIpLCBuZXcgVmVjdG9yKDIzLCAxMSlcclxuICAgICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmR5ICs9IFBsYXllck9iamVjdC5ncmF2aXR5ICogZGVsdGE7XHJcbiAgICAgICAgdGhpcy5keCA9IDA7XHJcblxyXG4gICAgICAgIGlmIChHYW1lLmlzQnV0dG9uRG93bignQXJyb3dSaWdodCcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHRLZXlUaW1lKys7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxlZnRLZXlUaW1lID09IDAgfHwgdGhpcy5yaWdodEtleVRpbWUgPCB0aGlzLmxlZnRLZXlUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmR4ID0gUGxheWVyT2JqZWN0LnZlbG9jaXR5ICogZGVsdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgdGhpcy5yaWdodEtleVRpbWUgPSAwO1xyXG4gICAgICAgIGlmIChHYW1lLmlzQnV0dG9uRG93bignQXJyb3dMZWZ0JykpIHtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0S2V5VGltZSsrO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yaWdodEtleVRpbWUgPT0gMCB8fCB0aGlzLmxlZnRLZXlUaW1lIDwgdGhpcy5yaWdodEtleVRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHggPSAtUGxheWVyT2JqZWN0LnZlbG9jaXR5ICogZGVsdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgdGhpcy5sZWZ0S2V5VGltZSA9IDA7XHJcblxyXG4gICAgICAgIGlmIChHYW1lLmlzQnV0dG9uRG93bigneCcpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNob290S2V5VGltZSsrID09IDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290KCk7XHJcbiAgICAgICAgfSBlbHNlIHRoaXMuc2hvb3RLZXlUaW1lID0gMDtcclxuXHJcbiAgICAgICAgaWYgKChHYW1lLmlzQnV0dG9uRG93bignU2hpZnQnKSB8fCBHYW1lLmlzQnV0dG9uRG93bigneicpKSAmJiAodGhpcy5hdmFpbGFibGVKdW1wcyAhPSAwIHx8IHRoaXMuanVtcEtleVRpbWUgIT0gMCkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuanVtcEtleVRpbWUgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVKdW1wcy0tO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXZhaWxhYmxlSnVtcHMgPT0gMSkgQXVkaW9NYW5hZ2VyLnBsYXkoXCJqdW1wMVwiLCBcImFzc2V0cy9zb3VuZHMvanVtcDEud2F2XCIpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBBdWRpb01hbmFnZXIucGxheShcImp1bXAyXCIsIFwiYXNzZXRzL3NvdW5kcy9qdW1wMi53YXZcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5qdW1wS2V5VGltZSArPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuanVtcEtleVRpbWUgPCAwLjMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF2YWlsYWJsZUp1bXBzID09IDEpIHRoaXMuZHkgPSAtMjM1ICogZGVsdGE7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMuZHkgPSAtMTcwICogZGVsdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgdGhpcy5qdW1wS2V5VGltZSA9IDA7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmR4ICE9IDApIHRoaXMubG9va2luZ0RpcmVjdGlvbiA9IE1hdGguc2lnbih0aGlzLmR4KTtcclxuICAgICAgICB0aGlzLmR5ID0gTWF0aC5tYXgoTWF0aC5taW4odGhpcy5keSwgMTAuNjY2KSwgLTEwLjY2Nik7XHJcbiAgICAgICAgbGV0IHByZXZpb3VzUG9zOiBWZWN0b3IgPSAobmV3IFZlY3RvcigpKS5jb3B5KHRoaXMucG9seWdvbi5wb3MpO1xyXG4gICAgICAgIHRoaXMub25Hcm91bmQgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5tb3ZlQnkodGhpcy5keCwgdGhpcy5keSkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZHkgPiAwICYmIHRoaXMucG9seWdvbi5wb3MueSA9PSBwcmV2aW91c1Bvcy55KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBPbiBncm91bmRcclxuICAgICAgICAgICAgICAgIHRoaXMuZHkgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkdyb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF2YWlsYWJsZUp1bXBzID0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMub25Hcm91bmQgJiYgdGhpcy5hdmFpbGFibGVKdW1wcyA+IDEpIHRoaXMuYXZhaWxhYmxlSnVtcHMgPSAxOyBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvb3QoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGJ1bGxldElkOiBzdHJpbmcgPSBcImJ1bGxldFwiICsgcmFuZG9tVW5zZWN1cmVVVUlEKCk7XHJcbiAgICAgICAgQXVkaW9NYW5hZ2VyLnBsYXkoYnVsbGV0SWQsIFwiYXNzZXRzL3NvdW5kcy9maXJlLndhdlwiKS5vbmVuZGVkID0gZSA9PiB7IEF1ZGlvTWFuYWdlci5yZWxlYXNlKGJ1bGxldElkKTsgfTtcclxuICAgICAgICBHYW1lLmxldmVsLm9iamVjdHMucHVzaChcclxuICAgICAgICAgICAgbmV3IEJ1bGxldE9iamVjdCh0aGlzLnBvbHlnb24ucG9zLnggKyAxNiArIDEwICogdGhpcy5sb29raW5nRGlyZWN0aW9uLCB0aGlzLnBvbHlnb24ucG9zLnkgKyAyMSxcclxuICAgICAgICAgICAgICAgIHRoaXMubG9va2luZ0RpcmVjdGlvbiwgYnVsbGV0SWRcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoR2FtZS5sZXZlbC5pc1JlbW92ZWQodGhpcy5pZCkpIHJldHVybjtcclxuICAgICAgICBHYW1lLmxldmVsLnJlbW92ZU9iamVjdCh0aGlzLmlkKTtcclxuICAgICAgICBsZXQgY2VudGVyOiBWZWN0b3IgPSB0aGlzLnBvbHlnb24uZ2V0Q2VudHJvaWQoKS5hZGQodGhpcy5wb2x5Z29uLnBvcyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMjg7IGkrKykge1xyXG4gICAgICAgICAgICBHYW1lLmxldmVsLm9iamVjdHMucHVzaChuZXcgQmxvb2RQYXJ0aWNsZShjZW50ZXIueCwgY2VudGVyLnksXHJcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5jb3MoTWF0aC5QSSAqIDIgLyA0OCAqIGkpICogTWF0aC5yYW5kb20oKSAqIDYsIE1hdGguc2luKE1hdGguUEkgKiAyIC8gNDggKiBpKSAqIE1hdGgucmFuZG9tKCkgKiAxMCxcclxuICAgICAgICAgICAgICAgICAgICBcImJsb29kX1wiICsgdGhpcy5pZCArIFwiX1wiICsgaVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkgKz0gMikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBvID0gMDsgbyA8IChpID4gMyA/IDIgOiAxKTsgbysrKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lLmxldmVsLm9iamVjdHMucHVzaChuZXcgR2liUGFydGljbGUoY2VudGVyLngsIGNlbnRlci55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmNvcyhNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDIpICogTWF0aC5yYW5kb20oKSAqIDQsIE1hdGguc2luKE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMikgKiBNYXRoLnJhbmRvbSgpICogNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaSwgXCJnaWJfXCIgKyB0aGlzLmlkICsgXCJfXCIgKyAoaSArIG8pXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBBdWRpb01hbmFnZXIucGxheU11c2ljKFwiYXNzZXRzL211c2ljL2dhbWVvdmVyLm9nZ1wiLCBmYWxzZSk7XHJcbiAgICAgICAgbGV0IGRlYXRoTWVzc2FnZTogU3ByaXRlT2JqZWN0ID0gbmV3IFNwcml0ZU9iamVjdChcImRlYXRoX21lc3NhZ2VcIiwgNDAwIC0gMzUwLCAzMDQgLSA4MiwgNzAwLCAxNjQsIFNwcml0ZXMuRGVhdGhNZXNzYWdlKTtcclxuICAgICAgICBkZWF0aE1lc3NhZ2UuY29sbGlzaW9uID0gZmFsc2U7XHJcbiAgICAgICAgR2FtZS5sZXZlbC5vYmplY3RzLnB1c2goZGVhdGhNZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZnJhbWVUaW1lciA9ICh0aGlzLmZyYW1lVGltZXIgKyBkZWx0YSkgJSAwLjQwO1xyXG4gICAgICAgIGxldCBzbG93RnJhbWU6IG51bWJlciA9IE1hdGguZmxvb3IodGhpcy5mcmFtZVRpbWVyICogNCAvIDAuNDApO1xyXG4gICAgICAgIGxldCBmYXN0RnJhbWU6IG51bWJlciA9IE1hdGguZmxvb3IodGhpcy5mcmFtZVRpbWVyICogMiAvIDAuMTApO1xyXG5cclxuICAgICAgICBjdHguc2F2ZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmxvb2tpbmdEaXJlY3Rpb24gPT0gLTEpIHtcclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShHYW1lLmNhbnZhcy53aWR0aCAtIHRoaXMucG9seWdvbi5wb3MueCB8IDAsIHRoaXMucG9seWdvbi5wb3MueSB8IDApO1xyXG4gICAgICAgICAgICBjdHguc2NhbGUoLTEsIDEpO1xyXG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKEdhbWUuY2FudmFzLndpZHRoIC0gKHRoaXMucG9seWdvbi5wb3MueCB8IDApICogMiAtIDMyLCAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKHRoaXMucG9seWdvbi5wb3MueCB8IDAsIHRoaXMucG9seWdvbi5wb3MueSB8IDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZHkgPCAwKSB7XHJcbiAgICAgICAgICAgIC8vIEp1bXBpbmdcclxuICAgICAgICAgICAgaWYgKHRoaXMuanVtcEtleVRpbWUgIT0gMCAmJiB0aGlzLmp1bXBLZXlUaW1lIDwgMC4wMikge1xyXG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShidWZmZXJEcmF3SW1hZ2UoSW1hZ2VMaXN0LlBMQVlFUiwgMCwgNjQsIDMyLCAzMiksIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5qdW1wS2V5VGltZSAhPSAwICYmIHRoaXMuanVtcEtleVRpbWUgPCAwLjA0KSB7XHJcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGJ1ZmZlckRyYXdJbWFnZShJbWFnZUxpc3QuUExBWUVSLCAzMiwgNjQsIDMyLCAzMiksIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGJ1ZmZlckRyYXdJbWFnZShJbWFnZUxpc3QuUExBWUVSLCAoZmFzdEZyYW1lICUgMikgKiAzMiArIDY0LCA2NCwgMzIsIDMyKSwgMCwgMCwgMzIsIDMyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMub25Hcm91bmQpIHtcclxuICAgICAgICAgICAgLy8gRmFsbGluZ1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGJ1ZmZlckRyYXdJbWFnZShJbWFnZUxpc3QuUExBWUVSLCAoZmFzdEZyYW1lICUgMikgKiAzMiwgOTYsIDMyLCAzMiksIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmR4ICE9IDApIHtcclxuICAgICAgICAgICAgLy8gUnVubmluZ1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGJ1ZmZlckRyYXdJbWFnZShJbWFnZUxpc3QuUExBWUVSLCAoZmFzdEZyYW1lICUgNCkgKiAzMiwgMzIsIDMyLCAzMiksIDAsIDAsIDMyLCAzMik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gSWRsZVxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGJ1ZmZlckRyYXdJbWFnZShJbWFnZUxpc3QuUExBWUVSLCBzbG93RnJhbWUgKiAzMiwgMCwgMzIsIDMyKSwgMCwgMCwgMzIsIDMyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcclxuICAgIH1cclxufSIsIi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gVVVJRC4gVGhlIElEIG1pZ2h0IG5vdCBiZSB1bmlxdWUuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tVW5zZWN1cmVVVUlEKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gJ3h4eHgteHh4eC14eHgteHh4eCcucmVwbGFjZSgvW3hdL2csIChjKSA9PiB7ICBcclxuICAgICAgICBjb25zdCByID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTYpOyAgXHJcbiAgICAgICAgcmV0dXJuIHIudG9TdHJpbmcoMTYpOyAgXHJcbiAgICB9KTtcclxufVxyXG5cclxuY29uc3QgYnVmZmVyQ2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnVmZmVyLWNhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxuY29uc3QgYnVmZmVyQ3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSAoKCkgPT4ge1xyXG4gICAgbGV0IGN0eCA9IGJ1ZmZlckNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikhO1xyXG4gICAgY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgcmV0dXJuIGN0eDtcclxufSkoKTtcclxuXHJcbi8qKlxyXG4gKiBEcmF3cyBhbiBpbWFnZSB0byB0aGUgKGNsZWFuZWQpIGJ1ZmZlciBjYW52YXMuIENhbiBiZSB1c2VkIHRvIGRyYXcgYSBwYXJ0IG9mIGFuIGltYWdlIHRvIHRoZSBtYWluIGNhbnZhcyB3aXRob3V0IHRyYW5zZm9ybS1jYXVzZWQgYXJ0aWZhY3RzLlxyXG4gKiBAcGFyYW0gaW1hZ2UgYW4gZWxlbWVudCB0byBkcmF3IGludG8gdGhlIGNvbnRleHQuXHJcbiAqIEBwYXJhbSBzeCB4LWF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgc291cmNlIGltYWdlJ3MgdG9wIGxlZnQgY29ybmVyXHJcbiAqIEBwYXJhbSBzeSB5LWF4aXMgY29vcmRpbmF0ZSBvZiB0aGUgc291cmNlIGltYWdlJ3MgdG9wIGxlZnQgY29ybmVyXHJcbiAqIEBwYXJhbSBzdyB3aWR0aCBvZiB0aGUgc291cmNlIGltYWdlIHJlZ2lvbiB0byBkcmF3XHJcbiAqIEBwYXJhbSBzaCBoZWlnaHQgb2YgdGhlIHNvdXJjZSBpbWFnZSByZWdpb24gdG8gZHJhd1xyXG4gKiBAcmV0dXJucyB0aGUgYnVmZmVyIGNhbnZhc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGJ1ZmZlckRyYXdJbWFnZShpbWFnZTogQ2FudmFzSW1hZ2VTb3VyY2UsIHN4OiBudW1iZXIsIHN5OiBudW1iZXIsIHN3OiBudW1iZXIsIHNoOiBudW1iZXIpOiBIVE1MQ2FudmFzRWxlbWVudCB7XHJcbiAgICBidWZmZXJDYW52YXMud2lkdGggPSBzdztcclxuICAgIGJ1ZmZlckNhbnZhcy5oZWlnaHQgPSBzaDtcclxuICAgIGJ1ZmZlckN0eC5jbGVhclJlY3QoMCwgMCwgYnVmZmVyQ2FudmFzLndpZHRoLCBidWZmZXJDYW52YXMuaGVpZ2h0KTtcclxuICAgIGJ1ZmZlckN0eC5kcmF3SW1hZ2UoaW1hZ2UsIHN4LCBzeSwgc3csIHNoLCAwLCAwLCBzdywgc2gpO1xyXG4gICAgcmV0dXJuIGJ1ZmZlckNhbnZhcztcclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbmNvbnN0IF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0Y29uc3QgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdGNvbnN0IG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHRjb25zdCBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlci92YWx1ZSBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyohXHJcbiogSSBXYW5uYSBCZSBUaGUgR3V5OiBUaGUgTW92aWU6IFRoZSBHYW1lXHJcbiogVHlwZVNjcmlwdCByZW1ha2UgbWFkZSBieSBQR2dhbWVyMiAoYWthIFNvbm9QRykuXHJcbiogWW91IGNhbiBmaW5kIHRoZSBzb3VyY2UgY29kZSBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vUEdnYW1lcjIvSVdCVEcudHNcclxuKiBPcmlnaW5hbCBnYW1lIG1hZGUgYnkgS2F5aW46IGh0dHBzOi8va2F5aW4ubW9lL2l3YnRnL1xyXG4qL1xyXG5cclxuaW1wb3J0IEF1ZGlvTWFuYWdlciBmcm9tIFwiLi9BdWRpb01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWUgZnJvbSBcIi4vR2FtZVwiO1xyXG5cclxuZnVuY3Rpb24gZnJhbWUodGltZXN0YW1wOiBET01IaWdoUmVzVGltZVN0YW1wKSB7XHJcbiAgICBpZiAoIWRvY3VtZW50LmhpZGRlbilcclxuICAgICAgICBHYW1lLnVwZGF0ZSh0aW1lc3RhbXApO1xyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmcmFtZSk7XHJcbn1cclxud2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmcmFtZSk7XHJcblxyXG5vbmtleWRvd24gPSBmdW5jdGlvbihlKSB7XHJcbiAgICBHYW1lLmtleU1hcC5zZXQoZS5rZXkubGVuZ3RoID09IDEgPyBlLmtleS50b0xvd2VyQ2FzZSgpIDogZS5rZXksIHRydWUpO1xyXG4gICAgQXVkaW9NYW5hZ2VyLmF1dG9QbGF5Rml4KCk7XHJcbn07XHJcbm9ua2V5dXAgPSBmdW5jdGlvbihlKSB7IEdhbWUua2V5TWFwLnNldChlLmtleS5sZW5ndGggPT0gMSA/IGUua2V5LnRvTG93ZXJDYXNlKCkgOiBlLmtleSwgZmFsc2UpOyB9OyJdLCJuYW1lcyI6WyJTcHJpdGVzIiwiU3Bpa2VEaXJlY3Rpb24iXSwic291cmNlUm9vdCI6IiJ9