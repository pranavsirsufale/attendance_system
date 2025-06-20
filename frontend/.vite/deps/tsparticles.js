import "./chunk-EWTE5DHJ.js";

// node_modules/@tsparticles/engine/browser/Core/Utils/Constants.js
var generatedAttribute = "generated";
var mouseDownEvent = "pointerdown";
var mouseUpEvent = "pointerup";
var mouseLeaveEvent = "pointerleave";
var mouseOutEvent = "pointerout";
var mouseMoveEvent = "pointermove";
var touchStartEvent = "touchstart";
var touchEndEvent = "touchend";
var touchMoveEvent = "touchmove";
var touchCancelEvent = "touchcancel";
var resizeEvent = "resize";
var visibilityChangeEvent = "visibilitychange";
var errorPrefix = "tsParticles - Error";
var percentDenominator = 100;
var half = 0.5;
var millisecondsToSeconds = 1e3;
var originPoint = {
  x: 0,
  y: 0,
  z: 0
};
var defaultTransform = {
  a: 1,
  b: 0,
  c: 0,
  d: 1
};
var randomColorValue = "random";
var midColorValue = "mid";
var double = 2;
var doublePI = Math.PI * double;
var defaultFps = 60;
var generatedTrue = "true";
var generatedFalse = "false";
var canvasTag = "canvas";
var defaultRetryCount = 0;
var squareExp = 2;
var qTreeCapacity = 4;
var defaultRemoveQuantity = 1;
var defaultRatio = 1;
var defaultReduceFactor = 1;
var subdivideCount = 4;
var inverseFactorNumerator = 1;
var rgbMax = 255;
var hMax = 360;
var sMax = 100;
var lMax = 100;
var hMin = 0;
var sMin = 0;
var hPhase = 60;
var empty = 0;
var quarter = 0.25;
var threeQuarter = half + quarter;
var minVelocity = 0;
var defaultTransformValue = 1;
var minimumSize = 0;
var minimumLength = 0;
var zIndexFactorOffset = 1;
var defaultOpacity = 1;
var clickRadius = 1;
var touchEndLengthOffset = 1;
var minCoordinate = 0;
var removeDeleteCount = 1;
var removeMinIndex = 0;
var defaultFpsLimit = 120;
var minFpsLimit = 0;
var canvasFirstIndex = 0;
var loadRandomFactor = 1e4;
var loadMinIndex = 0;
var one = 1;
var none = 0;
var decayOffset = 1;
var tryCountIncrement = 1;
var minRetries = 0;
var rollFactor = 1;
var minZ = 0;
var defaultRadius = 0;
var posOffset = -quarter;
var sizeFactor = 1.5;
var minLimit = 0;
var countOffset = 1;
var minCount = 0;
var minIndex = 0;
var manualCount = 0;
var lengthOffset = 1;
var defaultDensityFactor = 1;
var deleteCount = 1;
var touchDelay = 500;
var manualDefaultPosition = 50;
var defaultAngle = 0;
var identity = 1;
var minStrokeWidth = 0;
var lFactor = 1;
var lMin = 0;
var rgbFactor = 255;
var triple = 3;
var sextuple = 6;
var sNormalizedOffset = 1;
var phaseNumerator = 1;
var defaultRgbMin = 0;
var defaultVelocity = 0;
var defaultLoops = 0;
var defaultTime = 0;

// node_modules/@tsparticles/engine/browser/Enums/Directions/MoveDirection.js
var MoveDirection;
(function(MoveDirection2) {
  MoveDirection2["bottom"] = "bottom";
  MoveDirection2["bottomLeft"] = "bottom-left";
  MoveDirection2["bottomRight"] = "bottom-right";
  MoveDirection2["left"] = "left";
  MoveDirection2["none"] = "none";
  MoveDirection2["right"] = "right";
  MoveDirection2["top"] = "top";
  MoveDirection2["topLeft"] = "top-left";
  MoveDirection2["topRight"] = "top-right";
  MoveDirection2["outside"] = "outside";
  MoveDirection2["inside"] = "inside";
})(MoveDirection || (MoveDirection = {}));

// node_modules/@tsparticles/engine/browser/Utils/TypeUtils.js
function isBoolean(arg) {
  return typeof arg === "boolean";
}
function isString(arg) {
  return typeof arg === "string";
}
function isNumber(arg) {
  return typeof arg === "number";
}
function isObject(arg) {
  return typeof arg === "object" && arg !== null;
}
function isArray(arg) {
  return Array.isArray(arg);
}
function isNull(arg) {
  return arg === null || arg === void 0;
}

// node_modules/@tsparticles/engine/browser/Core/Utils/Vectors.js
var Vector3d = class _Vector3d {
  constructor(xOrCoords, y, z) {
    this._updateFromAngle = (angle, length) => {
      this.x = Math.cos(angle) * length;
      this.y = Math.sin(angle) * length;
    };
    if (!isNumber(xOrCoords) && xOrCoords) {
      this.x = xOrCoords.x;
      this.y = xOrCoords.y;
      const coords3d = xOrCoords;
      this.z = coords3d.z ? coords3d.z : originPoint.z;
    } else if (xOrCoords !== void 0 && y !== void 0) {
      this.x = xOrCoords;
      this.y = y;
      this.z = z ?? originPoint.z;
    } else {
      throw new Error(`${errorPrefix} Vector3d not initialized correctly`);
    }
  }
  static get origin() {
    return _Vector3d.create(originPoint.x, originPoint.y, originPoint.z);
  }
  get angle() {
    return Math.atan2(this.y, this.x);
  }
  set angle(angle) {
    this._updateFromAngle(angle, this.length);
  }
  get length() {
    return Math.sqrt(this.getLengthSq());
  }
  set length(length) {
    this._updateFromAngle(this.angle, length);
  }
  static clone(source) {
    return _Vector3d.create(source.x, source.y, source.z);
  }
  static create(x, y, z) {
    return new _Vector3d(x, y, z);
  }
  add(v) {
    return _Vector3d.create(this.x + v.x, this.y + v.y, this.z + v.z);
  }
  addTo(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
  }
  copy() {
    return _Vector3d.clone(this);
  }
  distanceTo(v) {
    return this.sub(v).length;
  }
  distanceToSq(v) {
    return this.sub(v).getLengthSq();
  }
  div(n) {
    return _Vector3d.create(this.x / n, this.y / n, this.z / n);
  }
  divTo(n) {
    this.x /= n;
    this.y /= n;
    this.z /= n;
  }
  getLengthSq() {
    return this.x ** squareExp + this.y ** squareExp;
  }
  mult(n) {
    return _Vector3d.create(this.x * n, this.y * n, this.z * n);
  }
  multTo(n) {
    this.x *= n;
    this.y *= n;
    this.z *= n;
  }
  normalize() {
    const length = this.length;
    if (length != none) {
      this.multTo(inverseFactorNumerator / length);
    }
  }
  rotate(angle) {
    return _Vector3d.create(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle), originPoint.z);
  }
  setTo(c) {
    this.x = c.x;
    this.y = c.y;
    const v3d = c;
    this.z = v3d.z ? v3d.z : originPoint.z;
  }
  sub(v) {
    return _Vector3d.create(this.x - v.x, this.y - v.y, this.z - v.z);
  }
  subFrom(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
  }
};
var Vector = class _Vector extends Vector3d {
  constructor(xOrCoords, y) {
    super(xOrCoords, y, originPoint.z);
  }
  static get origin() {
    return _Vector.create(originPoint.x, originPoint.y);
  }
  static clone(source) {
    return _Vector.create(source.x, source.y);
  }
  static create(x, y) {
    return new _Vector(x, y);
  }
};

// node_modules/@tsparticles/engine/browser/Utils/NumberUtils.js
var _random = Math.random;
var _animationLoop = {
  nextFrame: (cb) => requestAnimationFrame(cb),
  cancel: (idx) => cancelAnimationFrame(idx)
};
function getRandom() {
  const min = 0, max = 1;
  return clamp(_random(), min, max - Number.EPSILON);
}
function animate(fn) {
  return _animationLoop.nextFrame(fn);
}
function cancelAnimation(handle) {
  _animationLoop.cancel(handle);
}
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function mix(comp1, comp2, weight1, weight2) {
  return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
}
function randomInRange(r) {
  const max = getRangeMax(r), minOffset = 0;
  let min = getRangeMin(r);
  if (max === min) {
    min = minOffset;
  }
  return getRandom() * (max - min) + min;
}
function getRangeValue(value) {
  return isNumber(value) ? value : randomInRange(value);
}
function getRangeMin(value) {
  return isNumber(value) ? value : value.min;
}
function getRangeMax(value) {
  return isNumber(value) ? value : value.max;
}
function setRangeValue(source, value) {
  if (source === value || value === void 0 && isNumber(source)) {
    return source;
  }
  const min = getRangeMin(source), max = getRangeMax(source);
  return value !== void 0 ? {
    min: Math.min(min, value),
    max: Math.max(max, value)
  } : setRangeValue(min, max);
}
function getDistances(pointA, pointB) {
  const dx = pointA.x - pointB.x, dy = pointA.y - pointB.y, squareExp5 = 2;
  return { dx, dy, distance: Math.sqrt(dx ** squareExp5 + dy ** squareExp5) };
}
function getDistance(pointA, pointB) {
  return getDistances(pointA, pointB).distance;
}
function degToRad(degrees) {
  const PIDeg = 180;
  return degrees * Math.PI / PIDeg;
}
function getParticleDirectionAngle(direction, position, center) {
  if (isNumber(direction)) {
    return degToRad(direction);
  }
  switch (direction) {
    case MoveDirection.top:
      return -Math.PI * half;
    case MoveDirection.topRight:
      return -Math.PI * quarter;
    case MoveDirection.right:
      return empty;
    case MoveDirection.bottomRight:
      return Math.PI * quarter;
    case MoveDirection.bottom:
      return Math.PI * half;
    case MoveDirection.bottomLeft:
      return Math.PI * threeQuarter;
    case MoveDirection.left:
      return Math.PI;
    case MoveDirection.topLeft:
      return -Math.PI * threeQuarter;
    case MoveDirection.inside:
      return Math.atan2(center.y - position.y, center.x - position.x);
    case MoveDirection.outside:
      return Math.atan2(position.y - center.y, position.x - center.x);
    default:
      return getRandom() * doublePI;
  }
}
function getParticleBaseVelocity(direction) {
  const baseVelocity = Vector.origin;
  baseVelocity.length = 1;
  baseVelocity.angle = direction;
  return baseVelocity;
}
function collisionVelocity(v1, v2, m1, m2) {
  return Vector.create(v1.x * (m1 - m2) / (m1 + m2) + v2.x * double * m2 / (m1 + m2), v1.y);
}
function calcPositionOrRandomFromSize(data) {
  var _a, _b;
  return {
    x: (((_a = data.position) == null ? void 0 : _a.x) ?? getRandom() * percentDenominator) * data.size.width / percentDenominator,
    y: (((_b = data.position) == null ? void 0 : _b.y) ?? getRandom() * percentDenominator) * data.size.height / percentDenominator
  };
}
function calcPositionOrRandomFromSizeRanged(data) {
  var _a, _b;
  const position = {
    x: ((_a = data.position) == null ? void 0 : _a.x) !== void 0 ? getRangeValue(data.position.x) : void 0,
    y: ((_b = data.position) == null ? void 0 : _b.y) !== void 0 ? getRangeValue(data.position.y) : void 0
  };
  return calcPositionOrRandomFromSize({ size: data.size, position });
}
function calcExactPositionOrRandomFromSize(data) {
  var _a, _b;
  return {
    x: ((_a = data.position) == null ? void 0 : _a.x) ?? getRandom() * data.size.width,
    y: ((_b = data.position) == null ? void 0 : _b.y) ?? getRandom() * data.size.height
  };
}
function parseAlpha(input) {
  const defaultAlpha3 = 1;
  if (!input) {
    return defaultAlpha3;
  }
  return input.endsWith("%") ? parseFloat(input) / percentDenominator : parseFloat(input);
}

// node_modules/@tsparticles/engine/browser/Enums/Modes/AnimationMode.js
var AnimationMode;
(function(AnimationMode2) {
  AnimationMode2["auto"] = "auto";
  AnimationMode2["increase"] = "increase";
  AnimationMode2["decrease"] = "decrease";
  AnimationMode2["random"] = "random";
})(AnimationMode || (AnimationMode = {}));

// node_modules/@tsparticles/engine/browser/Enums/AnimationStatus.js
var AnimationStatus;
(function(AnimationStatus2) {
  AnimationStatus2["increasing"] = "increasing";
  AnimationStatus2["decreasing"] = "decreasing";
})(AnimationStatus || (AnimationStatus = {}));

// node_modules/@tsparticles/engine/browser/Enums/Types/DestroyType.js
var DestroyType;
(function(DestroyType2) {
  DestroyType2["none"] = "none";
  DestroyType2["max"] = "max";
  DestroyType2["min"] = "min";
})(DestroyType || (DestroyType = {}));

// node_modules/@tsparticles/engine/browser/Enums/Directions/OutModeDirection.js
var OutModeDirection;
(function(OutModeDirection2) {
  OutModeDirection2["bottom"] = "bottom";
  OutModeDirection2["left"] = "left";
  OutModeDirection2["right"] = "right";
  OutModeDirection2["top"] = "top";
})(OutModeDirection || (OutModeDirection = {}));

// node_modules/@tsparticles/engine/browser/Enums/Modes/PixelMode.js
var PixelMode;
(function(PixelMode2) {
  PixelMode2["precise"] = "precise";
  PixelMode2["percent"] = "percent";
})(PixelMode || (PixelMode = {}));

// node_modules/@tsparticles/engine/browser/Enums/Types/StartValueType.js
var StartValueType;
(function(StartValueType2) {
  StartValueType2["max"] = "max";
  StartValueType2["min"] = "min";
  StartValueType2["random"] = "random";
})(StartValueType || (StartValueType = {}));

// node_modules/@tsparticles/engine/browser/Utils/Utils.js
var _logger = {
  debug: console.debug,
  error: console.error,
  info: console.info,
  log: console.log,
  verbose: console.log,
  warning: console.warn
};
function getLogger() {
  return _logger;
}
function memoize(fn) {
  const cache = /* @__PURE__ */ new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
function rectSideBounce(data) {
  const res = { bounced: false }, { pSide, pOtherSide, rectSide, rectOtherSide, velocity, factor } = data;
  if (pOtherSide.min < rectOtherSide.min || pOtherSide.min > rectOtherSide.max || pOtherSide.max < rectOtherSide.min || pOtherSide.max > rectOtherSide.max) {
    return res;
  }
  if (pSide.max >= rectSide.min && pSide.max <= (rectSide.max + rectSide.min) * half && velocity > minVelocity || pSide.min <= rectSide.max && pSide.min > (rectSide.max + rectSide.min) * half && velocity < minVelocity) {
    res.velocity = velocity * -factor;
    res.bounced = true;
  }
  return res;
}
function checkSelector(element, selectors) {
  const res = executeOnSingleOrMultiple(selectors, (selector) => {
    return element.matches(selector);
  });
  return isArray(res) ? res.some((t) => t) : res;
}
function isSsr() {
  return typeof window === "undefined" || !window || typeof window.document === "undefined" || !window.document;
}
function hasMatchMedia() {
  return !isSsr() && typeof matchMedia !== "undefined";
}
function safeMatchMedia(query) {
  if (!hasMatchMedia()) {
    return;
  }
  return matchMedia(query);
}
function safeIntersectionObserver(callback) {
  if (isSsr() || typeof IntersectionObserver === "undefined") {
    return;
  }
  return new IntersectionObserver(callback);
}
function safeMutationObserver(callback) {
  if (isSsr() || typeof MutationObserver === "undefined") {
    return;
  }
  return new MutationObserver(callback);
}
function isInArray(value, array) {
  const invalidIndex = -1;
  return value === array || isArray(array) && array.indexOf(value) > invalidIndex;
}
async function loadFont(font, weight) {
  try {
    await document.fonts.load(`${weight ?? "400"} 36px '${font ?? "Verdana"}'`);
  } catch {
  }
}
function arrayRandomIndex(array) {
  return Math.floor(getRandom() * array.length);
}
function itemFromArray(array, index, useIndex = true) {
  return array[index !== void 0 && useIndex ? index % array.length : arrayRandomIndex(array)];
}
function isPointInside(point, size, offset, radius, direction) {
  const minRadius6 = 0;
  return areBoundsInside(calculateBounds(point, radius ?? minRadius6), size, offset, direction);
}
function areBoundsInside(bounds, size, offset, direction) {
  let inside = true;
  if (!direction || direction === OutModeDirection.bottom) {
    inside = bounds.top < size.height + offset.x;
  }
  if (inside && (!direction || direction === OutModeDirection.left)) {
    inside = bounds.right > offset.x;
  }
  if (inside && (!direction || direction === OutModeDirection.right)) {
    inside = bounds.left < size.width + offset.y;
  }
  if (inside && (!direction || direction === OutModeDirection.top)) {
    inside = bounds.bottom > offset.y;
  }
  return inside;
}
function calculateBounds(point, radius) {
  return {
    bottom: point.y + radius,
    left: point.x - radius,
    right: point.x + radius,
    top: point.y - radius
  };
}
function deepExtend(destination, ...sources) {
  for (const source of sources) {
    if (source === void 0 || source === null) {
      continue;
    }
    if (!isObject(source)) {
      destination = source;
      continue;
    }
    const sourceIsArray = Array.isArray(source);
    if (sourceIsArray && (isObject(destination) || !destination || !Array.isArray(destination))) {
      destination = [];
    } else if (!sourceIsArray && (isObject(destination) || !destination || Array.isArray(destination))) {
      destination = {};
    }
    for (const key in source) {
      if (key === "__proto__") {
        continue;
      }
      const sourceDict = source, value = sourceDict[key], destDict = destination;
      destDict[key] = isObject(value) && Array.isArray(value) ? value.map((v) => deepExtend(destDict[key], v)) : deepExtend(destDict[key], value);
    }
  }
  return destination;
}
function isDivModeEnabled(mode, divs) {
  return !!findItemFromSingleOrMultiple(divs, (t) => t.enable && isInArray(mode, t.mode));
}
function divModeExecute(mode, divs, callback) {
  executeOnSingleOrMultiple(divs, (div) => {
    const divMode2 = div.mode, divEnabled = div.enable;
    if (divEnabled && isInArray(mode, divMode2)) {
      singleDivModeExecute(div, callback);
    }
  });
}
function singleDivModeExecute(div, callback) {
  const selectors = div.selectors;
  executeOnSingleOrMultiple(selectors, (selector) => {
    callback(selector, div);
  });
}
function divMode(divs, element) {
  if (!element || !divs) {
    return;
  }
  return findItemFromSingleOrMultiple(divs, (div) => {
    return checkSelector(element, div.selectors);
  });
}
function circleBounceDataFromParticle(p) {
  return {
    position: p.getPosition(),
    radius: p.getRadius(),
    mass: p.getMass(),
    velocity: p.velocity,
    factor: Vector.create(getRangeValue(p.options.bounce.horizontal.value), getRangeValue(p.options.bounce.vertical.value))
  };
}
function circleBounce(p1, p2) {
  const { x: xVelocityDiff, y: yVelocityDiff } = p1.velocity.sub(p2.velocity), [pos1, pos2] = [p1.position, p2.position], { dx: xDist, dy: yDist } = getDistances(pos2, pos1), minimumDistance = 0;
  if (xVelocityDiff * xDist + yVelocityDiff * yDist < minimumDistance) {
    return;
  }
  const angle = -Math.atan2(yDist, xDist), m1 = p1.mass, m2 = p2.mass, u1 = p1.velocity.rotate(angle), u2 = p2.velocity.rotate(angle), v1 = collisionVelocity(u1, u2, m1, m2), v2 = collisionVelocity(u2, u1, m1, m2), vFinal1 = v1.rotate(-angle), vFinal2 = v2.rotate(-angle);
  p1.velocity.x = vFinal1.x * p1.factor.x;
  p1.velocity.y = vFinal1.y * p1.factor.y;
  p2.velocity.x = vFinal2.x * p2.factor.x;
  p2.velocity.y = vFinal2.y * p2.factor.y;
}
function rectBounce(particle, divBounds) {
  const pPos = particle.getPosition(), size = particle.getRadius(), bounds = calculateBounds(pPos, size), bounceOptions = particle.options.bounce, resH = rectSideBounce({
    pSide: {
      min: bounds.left,
      max: bounds.right
    },
    pOtherSide: {
      min: bounds.top,
      max: bounds.bottom
    },
    rectSide: {
      min: divBounds.left,
      max: divBounds.right
    },
    rectOtherSide: {
      min: divBounds.top,
      max: divBounds.bottom
    },
    velocity: particle.velocity.x,
    factor: getRangeValue(bounceOptions.horizontal.value)
  });
  if (resH.bounced) {
    if (resH.velocity !== void 0) {
      particle.velocity.x = resH.velocity;
    }
    if (resH.position !== void 0) {
      particle.position.x = resH.position;
    }
  }
  const resV = rectSideBounce({
    pSide: {
      min: bounds.top,
      max: bounds.bottom
    },
    pOtherSide: {
      min: bounds.left,
      max: bounds.right
    },
    rectSide: {
      min: divBounds.top,
      max: divBounds.bottom
    },
    rectOtherSide: {
      min: divBounds.left,
      max: divBounds.right
    },
    velocity: particle.velocity.y,
    factor: getRangeValue(bounceOptions.vertical.value)
  });
  if (resV.bounced) {
    if (resV.velocity !== void 0) {
      particle.velocity.y = resV.velocity;
    }
    if (resV.position !== void 0) {
      particle.position.y = resV.position;
    }
  }
}
function executeOnSingleOrMultiple(obj, callback) {
  const defaultIndex2 = 0;
  return isArray(obj) ? obj.map((item, index) => callback(item, index)) : callback(obj, defaultIndex2);
}
function itemFromSingleOrMultiple(obj, index, useIndex) {
  return isArray(obj) ? itemFromArray(obj, index, useIndex) : obj;
}
function findItemFromSingleOrMultiple(obj, callback) {
  if (isArray(obj)) {
    return obj.find((t, index) => callback(t, index));
  }
  const defaultIndex2 = 0;
  return callback(obj, defaultIndex2) ? obj : void 0;
}
function initParticleNumericAnimationValue(options, pxRatio) {
  const valueRange = options.value, animationOptions = options.animation, res = {
    delayTime: getRangeValue(animationOptions.delay) * millisecondsToSeconds,
    enable: animationOptions.enable,
    value: getRangeValue(options.value) * pxRatio,
    max: getRangeMax(valueRange) * pxRatio,
    min: getRangeMin(valueRange) * pxRatio,
    loops: 0,
    maxLoops: getRangeValue(animationOptions.count),
    time: 0
  }, decayOffset2 = 1;
  if (animationOptions.enable) {
    res.decay = decayOffset2 - getRangeValue(animationOptions.decay);
    switch (animationOptions.mode) {
      case AnimationMode.increase:
        res.status = AnimationStatus.increasing;
        break;
      case AnimationMode.decrease:
        res.status = AnimationStatus.decreasing;
        break;
      case AnimationMode.random:
        res.status = getRandom() >= half ? AnimationStatus.increasing : AnimationStatus.decreasing;
        break;
    }
    const autoStatus = animationOptions.mode === AnimationMode.auto;
    switch (animationOptions.startValue) {
      case StartValueType.min:
        res.value = res.min;
        if (autoStatus) {
          res.status = AnimationStatus.increasing;
        }
        break;
      case StartValueType.max:
        res.value = res.max;
        if (autoStatus) {
          res.status = AnimationStatus.decreasing;
        }
        break;
      case StartValueType.random:
      default:
        res.value = randomInRange(res);
        if (autoStatus) {
          res.status = getRandom() >= half ? AnimationStatus.increasing : AnimationStatus.decreasing;
        }
        break;
    }
  }
  res.initialValue = res.value;
  return res;
}
function getPositionOrSize(positionOrSize, canvasSize) {
  const isPercent = positionOrSize.mode === PixelMode.percent;
  if (!isPercent) {
    const { mode: _, ...rest } = positionOrSize;
    return rest;
  }
  const isPosition = "x" in positionOrSize;
  if (isPosition) {
    return {
      x: positionOrSize.x / percentDenominator * canvasSize.width,
      y: positionOrSize.y / percentDenominator * canvasSize.height
    };
  } else {
    return {
      width: positionOrSize.width / percentDenominator * canvasSize.width,
      height: positionOrSize.height / percentDenominator * canvasSize.height
    };
  }
}
function getPosition(position, canvasSize) {
  return getPositionOrSize(position, canvasSize);
}
function getSize(size, canvasSize) {
  return getPositionOrSize(size, canvasSize);
}
function checkDestroy(particle, destroyType, value, minValue, maxValue) {
  switch (destroyType) {
    case DestroyType.max:
      if (value >= maxValue) {
        particle.destroy();
      }
      break;
    case DestroyType.min:
      if (value <= minValue) {
        particle.destroy();
      }
      break;
  }
}
function updateAnimation(particle, data, changeDirection, destroyType, delta) {
  const minLoops2 = 0, minDelay = 0, identity8 = 1, minVelocity8 = 0, minDecay = 1;
  if (particle.destroyed || !data || !data.enable || (data.maxLoops ?? minLoops2) > minLoops2 && (data.loops ?? minLoops2) > (data.maxLoops ?? minLoops2)) {
    return;
  }
  const velocity = (data.velocity ?? minVelocity8) * delta.factor, minValue = data.min, maxValue = data.max, decay = data.decay ?? minDecay;
  if (!data.time) {
    data.time = 0;
  }
  if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {
    data.time += delta.value;
  }
  if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {
    return;
  }
  switch (data.status) {
    case AnimationStatus.increasing:
      if (data.value >= maxValue) {
        if (changeDirection) {
          data.status = AnimationStatus.decreasing;
        } else {
          data.value -= maxValue;
        }
        if (!data.loops) {
          data.loops = minLoops2;
        }
        data.loops++;
      } else {
        data.value += velocity;
      }
      break;
    case AnimationStatus.decreasing:
      if (data.value <= minValue) {
        if (changeDirection) {
          data.status = AnimationStatus.increasing;
        } else {
          data.value += maxValue;
        }
        if (!data.loops) {
          data.loops = minLoops2;
        }
        data.loops++;
      } else {
        data.value -= velocity;
      }
  }
  if (data.velocity && decay !== identity8) {
    data.velocity *= decay;
  }
  checkDestroy(particle, destroyType, data.value, minValue, maxValue);
  if (!particle.destroyed) {
    data.value = clamp(data.value, minValue, maxValue);
  }
}
function cloneStyle(style) {
  var _a, _b, _c, _d;
  const clonedStyle = document.createElement("div").style;
  if (!style) {
    return clonedStyle;
  }
  for (const key in style) {
    const styleKey = style[key];
    if (!Object.prototype.hasOwnProperty.call(style, key) || isNull(styleKey)) {
      continue;
    }
    const styleValue = (_a = style.getPropertyValue) == null ? void 0 : _a.call(style, styleKey);
    if (!styleValue) {
      continue;
    }
    const stylePriority = (_b = style.getPropertyPriority) == null ? void 0 : _b.call(style, styleKey);
    if (!stylePriority) {
      (_c = clonedStyle.setProperty) == null ? void 0 : _c.call(clonedStyle, styleKey, styleValue);
    } else {
      (_d = clonedStyle.setProperty) == null ? void 0 : _d.call(clonedStyle, styleKey, styleValue, stylePriority);
    }
  }
  return clonedStyle;
}
function computeFullScreenStyle(zIndex) {
  const fullScreenStyle = document.createElement("div").style, radix = 10, style = {
    width: "100%",
    height: "100%",
    margin: "0",
    padding: "0",
    borderWidth: "0",
    position: "fixed",
    zIndex: zIndex.toString(radix),
    "z-index": zIndex.toString(radix),
    top: "0",
    left: "0"
  };
  for (const key in style) {
    const value = style[key];
    fullScreenStyle.setProperty(key, value);
  }
  return fullScreenStyle;
}
var getFullScreenStyle = memoize(computeFullScreenStyle);

// node_modules/@tsparticles/engine/browser/Enums/Types/AlterType.js
var AlterType;
(function(AlterType2) {
  AlterType2["darken"] = "darken";
  AlterType2["enlighten"] = "enlighten";
})(AlterType || (AlterType = {}));

// node_modules/@tsparticles/engine/browser/Utils/ColorUtils.js
function stringToRgba(engine, input) {
  if (!input) {
    return;
  }
  for (const manager of engine.colorManagers.values()) {
    if (input.startsWith(manager.stringPrefix)) {
      return manager.parseString(input);
    }
  }
}
function rangeColorToRgb(engine, input, index, useIndex = true) {
  if (!input) {
    return;
  }
  const color = isString(input) ? { value: input } : input;
  if (isString(color.value)) {
    return colorToRgb(engine, color.value, index, useIndex);
  }
  if (isArray(color.value)) {
    return rangeColorToRgb(engine, {
      value: itemFromArray(color.value, index, useIndex)
    });
  }
  for (const manager of engine.colorManagers.values()) {
    const res = manager.handleRangeColor(color);
    if (res) {
      return res;
    }
  }
}
function colorToRgb(engine, input, index, useIndex = true) {
  if (!input) {
    return;
  }
  const color = isString(input) ? { value: input } : input;
  if (isString(color.value)) {
    return color.value === randomColorValue ? getRandomRgbColor() : stringToRgb(engine, color.value);
  }
  if (isArray(color.value)) {
    return colorToRgb(engine, {
      value: itemFromArray(color.value, index, useIndex)
    });
  }
  for (const manager of engine.colorManagers.values()) {
    const res = manager.handleColor(color);
    if (res) {
      return res;
    }
  }
}
function rangeColorToHsl(engine, color, index, useIndex = true) {
  const rgb = rangeColorToRgb(engine, color, index, useIndex);
  return rgb ? rgbToHsl(rgb) : void 0;
}
function rgbToHsl(color) {
  const r1 = color.r / rgbMax, g1 = color.g / rgbMax, b1 = color.b / rgbMax, max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1), res = {
    h: hMin,
    l: (max + min) * half,
    s: sMin
  };
  if (max !== min) {
    res.s = res.l < half ? (max - min) / (max + min) : (max - min) / (double - max - min);
    res.h = r1 === max ? (g1 - b1) / (max - min) : res.h = g1 === max ? double + (b1 - r1) / (max - min) : double * double + (r1 - g1) / (max - min);
  }
  res.l *= lMax;
  res.s *= sMax;
  res.h *= hPhase;
  if (res.h < hMin) {
    res.h += hMax;
  }
  if (res.h >= hMax) {
    res.h -= hMax;
  }
  return res;
}
function stringToRgb(engine, input) {
  return stringToRgba(engine, input);
}
function hslToRgb(hsl) {
  const h = (hsl.h % hMax + hMax) % hMax, s = Math.max(sMin, Math.min(sMax, hsl.s)), l = Math.max(lMin, Math.min(lMax, hsl.l)), hNormalized = h / hMax, sNormalized = s / sMax, lNormalized = l / lMax;
  if (s === sMin) {
    const grayscaleValue = Math.round(lNormalized * rgbFactor);
    return { r: grayscaleValue, g: grayscaleValue, b: grayscaleValue };
  }
  const channel = (temp12, temp22, temp3) => {
    const temp3Min = 0, temp3Max = 1;
    if (temp3 < temp3Min) {
      temp3++;
    }
    if (temp3 > temp3Max) {
      temp3--;
    }
    if (temp3 * sextuple < temp3Max) {
      return temp12 + (temp22 - temp12) * sextuple * temp3;
    }
    if (temp3 * double < temp3Max) {
      return temp22;
    }
    if (temp3 * triple < temp3Max * double) {
      const temp3Offset = double / triple;
      return temp12 + (temp22 - temp12) * (temp3Offset - temp3) * sextuple;
    }
    return temp12;
  }, temp1 = lNormalized < half ? lNormalized * (sNormalizedOffset + sNormalized) : lNormalized + sNormalized - lNormalized * sNormalized, temp2 = double * lNormalized - temp1, phaseThird = phaseNumerator / triple, red = Math.min(rgbFactor, rgbFactor * channel(temp2, temp1, hNormalized + phaseThird)), green = Math.min(rgbFactor, rgbFactor * channel(temp2, temp1, hNormalized)), blue = Math.min(rgbFactor, rgbFactor * channel(temp2, temp1, hNormalized - phaseThird));
  return { r: Math.round(red), g: Math.round(green), b: Math.round(blue) };
}
function hslaToRgba(hsla) {
  const rgbResult = hslToRgb(hsla);
  return {
    a: hsla.a,
    b: rgbResult.b,
    g: rgbResult.g,
    r: rgbResult.r
  };
}
function getRandomRgbColor(min) {
  const fixedMin = min ?? defaultRgbMin, fixedMax = rgbMax + identity;
  return {
    b: Math.floor(randomInRange(setRangeValue(fixedMin, fixedMax))),
    g: Math.floor(randomInRange(setRangeValue(fixedMin, fixedMax))),
    r: Math.floor(randomInRange(setRangeValue(fixedMin, fixedMax)))
  };
}
function getStyleFromRgb(color, opacity) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity ?? defaultOpacity})`;
}
function getStyleFromHsl(color, opacity) {
  return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity ?? defaultOpacity})`;
}
function colorMix(color1, color2, size1, size2) {
  let rgb1 = color1, rgb2 = color2;
  if (rgb1.r === void 0) {
    rgb1 = hslToRgb(color1);
  }
  if (rgb2.r === void 0) {
    rgb2 = hslToRgb(color2);
  }
  return {
    b: mix(rgb1.b, rgb2.b, size1, size2),
    g: mix(rgb1.g, rgb2.g, size1, size2),
    r: mix(rgb1.r, rgb2.r, size1, size2)
  };
}
function getLinkColor(p1, p2, linkColor) {
  if (linkColor === randomColorValue) {
    return getRandomRgbColor();
  } else if (linkColor === midColorValue) {
    const sourceColor = p1.getFillColor() ?? p1.getStrokeColor(), destColor = (p2 == null ? void 0 : p2.getFillColor()) ?? (p2 == null ? void 0 : p2.getStrokeColor());
    if (sourceColor && destColor && p2) {
      return colorMix(sourceColor, destColor, p1.getRadius(), p2.getRadius());
    } else {
      const hslColor = sourceColor ?? destColor;
      if (hslColor) {
        return hslToRgb(hslColor);
      }
    }
  } else {
    return linkColor;
  }
}
function getLinkRandomColor(engine, optColor, blink, consent) {
  const color = isString(optColor) ? optColor : optColor.value;
  if (color === randomColorValue) {
    if (consent) {
      return rangeColorToRgb(engine, {
        value: color
      });
    }
    if (blink) {
      return randomColorValue;
    }
    return midColorValue;
  } else if (color === midColorValue) {
    return midColorValue;
  } else {
    return rangeColorToRgb(engine, {
      value: color
    });
  }
}
function getHslFromAnimation(animation) {
  return animation !== void 0 ? {
    h: animation.h.value,
    s: animation.s.value,
    l: animation.l.value
  } : void 0;
}
function getHslAnimationFromHsl(hsl, animationOptions, reduceFactor) {
  const resColor = {
    h: {
      enable: false,
      value: hsl.h
    },
    s: {
      enable: false,
      value: hsl.s
    },
    l: {
      enable: false,
      value: hsl.l
    }
  };
  if (animationOptions) {
    setColorAnimation(resColor.h, animationOptions.h, reduceFactor);
    setColorAnimation(resColor.s, animationOptions.s, reduceFactor);
    setColorAnimation(resColor.l, animationOptions.l, reduceFactor);
  }
  return resColor;
}
function setColorAnimation(colorValue, colorAnimation, reduceFactor) {
  colorValue.enable = colorAnimation.enable;
  if (colorValue.enable) {
    colorValue.velocity = getRangeValue(colorAnimation.speed) / percentDenominator * reduceFactor;
    colorValue.decay = decayOffset - getRangeValue(colorAnimation.decay);
    colorValue.status = AnimationStatus.increasing;
    colorValue.loops = defaultLoops;
    colorValue.maxLoops = getRangeValue(colorAnimation.count);
    colorValue.time = defaultTime;
    colorValue.delayTime = getRangeValue(colorAnimation.delay) * millisecondsToSeconds;
    if (!colorAnimation.sync) {
      colorValue.velocity *= getRandom();
      colorValue.value *= getRandom();
    }
    colorValue.initialValue = colorValue.value;
    colorValue.offset = setRangeValue(colorAnimation.offset);
  } else {
    colorValue.velocity = defaultVelocity;
  }
}
function updateColorValue(data, range, decrease, delta) {
  const minLoops2 = 0, minDelay = 0, identity8 = 1, minVelocity8 = 0, minOffset = 0, velocityFactor = 3.6;
  if (!data || !data.enable || (data.maxLoops ?? minLoops2) > minLoops2 && (data.loops ?? minLoops2) > (data.maxLoops ?? minLoops2)) {
    return;
  }
  if (!data.time) {
    data.time = 0;
  }
  if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {
    data.time += delta.value;
  }
  if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {
    return;
  }
  const offset = data.offset ? randomInRange(data.offset) : minOffset, velocity = (data.velocity ?? minVelocity8) * delta.factor + offset * velocityFactor, decay = data.decay ?? identity8, max = getRangeMax(range), min = getRangeMin(range);
  if (!decrease || data.status === AnimationStatus.increasing) {
    data.value += velocity;
    if (data.value > max) {
      if (!data.loops) {
        data.loops = 0;
      }
      data.loops++;
      if (decrease) {
        data.status = AnimationStatus.decreasing;
      } else {
        data.value -= max;
      }
    }
  } else {
    data.value -= velocity;
    const minValue = 0;
    if (data.value < minValue) {
      if (!data.loops) {
        data.loops = 0;
      }
      data.loops++;
      data.status = AnimationStatus.increasing;
    }
  }
  if (data.velocity && decay !== identity8) {
    data.velocity *= decay;
  }
  data.value = clamp(data.value, min, max);
}
function updateColor(color, delta) {
  if (!color) {
    return;
  }
  const { h, s, l } = color, ranges = {
    h: { min: 0, max: 360 },
    s: { min: 0, max: 100 },
    l: { min: 0, max: 100 }
  };
  if (h) {
    updateColorValue(h, ranges.h, false, delta);
  }
  if (s) {
    updateColorValue(s, ranges.s, true, delta);
  }
  if (l) {
    updateColorValue(l, ranges.l, true, delta);
  }
}

// node_modules/@tsparticles/engine/browser/Utils/CanvasUtils.js
function drawLine(context, begin, end) {
  context.beginPath();
  context.moveTo(begin.x, begin.y);
  context.lineTo(end.x, end.y);
  context.closePath();
}
function paintBase(context, dimension, baseColor) {
  context.fillStyle = baseColor ?? "rgba(0,0,0,0)";
  context.fillRect(originPoint.x, originPoint.y, dimension.width, dimension.height);
}
function paintImage(context, dimension, image, opacity) {
  if (!image) {
    return;
  }
  context.globalAlpha = opacity;
  context.drawImage(image, originPoint.x, originPoint.y, dimension.width, dimension.height);
  context.globalAlpha = 1;
}
function clear(context, dimension) {
  context.clearRect(originPoint.x, originPoint.y, dimension.width, dimension.height);
}
function drawParticle(data) {
  const { container, context, particle, delta, colorStyles, backgroundMask, composite, radius, opacity, shadow, transform } = data, pos = particle.getPosition(), angle = particle.rotation + (particle.pathRotation ? particle.velocity.angle : defaultAngle), rotateData = {
    sin: Math.sin(angle),
    cos: Math.cos(angle)
  }, rotating = !!angle, transformData = {
    a: rotateData.cos * (transform.a ?? defaultTransform.a),
    b: rotating ? rotateData.sin * (transform.b ?? identity) : transform.b ?? defaultTransform.b,
    c: rotating ? -rotateData.sin * (transform.c ?? identity) : transform.c ?? defaultTransform.c,
    d: rotateData.cos * (transform.d ?? defaultTransform.d)
  };
  context.setTransform(transformData.a, transformData.b, transformData.c, transformData.d, pos.x, pos.y);
  if (backgroundMask) {
    context.globalCompositeOperation = composite;
  }
  const shadowColor = particle.shadowColor;
  if (shadow.enable && shadowColor) {
    context.shadowBlur = shadow.blur;
    context.shadowColor = getStyleFromRgb(shadowColor);
    context.shadowOffsetX = shadow.offset.x;
    context.shadowOffsetY = shadow.offset.y;
  }
  if (colorStyles.fill) {
    context.fillStyle = colorStyles.fill;
  }
  const strokeWidth = particle.strokeWidth ?? minStrokeWidth;
  context.lineWidth = strokeWidth;
  if (colorStyles.stroke) {
    context.strokeStyle = colorStyles.stroke;
  }
  const drawData = {
    container,
    context,
    particle,
    radius,
    opacity,
    delta,
    transformData,
    strokeWidth
  };
  drawShape(drawData);
  drawShapeAfterDraw(drawData);
  drawEffect(drawData);
  context.globalCompositeOperation = "source-over";
  context.resetTransform();
}
function drawEffect(data) {
  const { container, context, particle, radius, opacity, delta, transformData } = data;
  if (!particle.effect) {
    return;
  }
  const drawer = container.effectDrawers.get(particle.effect);
  if (!drawer) {
    return;
  }
  drawer.draw({
    context,
    particle,
    radius,
    opacity,
    delta,
    pixelRatio: container.retina.pixelRatio,
    transformData: { ...transformData }
  });
}
function drawShape(data) {
  const { container, context, particle, radius, opacity, delta, strokeWidth, transformData } = data;
  if (!particle.shape) {
    return;
  }
  const drawer = container.shapeDrawers.get(particle.shape);
  if (!drawer) {
    return;
  }
  context.beginPath();
  drawer.draw({
    context,
    particle,
    radius,
    opacity,
    delta,
    pixelRatio: container.retina.pixelRatio,
    transformData: { ...transformData }
  });
  if (particle.shapeClose) {
    context.closePath();
  }
  if (strokeWidth > minStrokeWidth) {
    context.stroke();
  }
  if (particle.shapeFill) {
    context.fill();
  }
}
function drawShapeAfterDraw(data) {
  const { container, context, particle, radius, opacity, delta, transformData } = data;
  if (!particle.shape) {
    return;
  }
  const drawer = container.shapeDrawers.get(particle.shape);
  if (!(drawer == null ? void 0 : drawer.afterDraw)) {
    return;
  }
  drawer.afterDraw({
    context,
    particle,
    radius,
    opacity,
    delta,
    pixelRatio: container.retina.pixelRatio,
    transformData: { ...transformData }
  });
}
function drawPlugin(context, plugin, delta) {
  if (!plugin.draw) {
    return;
  }
  plugin.draw(context, delta);
}
function drawParticlePlugin(context, plugin, particle, delta) {
  if (!plugin.drawParticle) {
    return;
  }
  plugin.drawParticle(context, particle, delta);
}
function alterHsl(color, type, value) {
  return {
    h: color.h,
    s: color.s,
    l: color.l + (type === AlterType.darken ? -lFactor : lFactor) * value
  };
}

// node_modules/@tsparticles/engine/browser/Core/Canvas.js
function setTransformValue(factor, newFactor, key) {
  const newValue = newFactor[key];
  if (newValue !== void 0) {
    factor[key] = (factor[key] ?? defaultTransformValue) * newValue;
  }
}
function setStyle(canvas, style, important = false) {
  if (!style) {
    return;
  }
  const element = canvas;
  if (!element) {
    return;
  }
  const elementStyle = element.style;
  if (!elementStyle) {
    return;
  }
  const keys = /* @__PURE__ */ new Set();
  for (const key in elementStyle) {
    if (!Object.prototype.hasOwnProperty.call(elementStyle, key)) {
      continue;
    }
    keys.add(elementStyle[key]);
  }
  for (const key in style) {
    if (!Object.prototype.hasOwnProperty.call(style, key)) {
      continue;
    }
    keys.add(style[key]);
  }
  for (const key of keys) {
    const value = style.getPropertyValue(key);
    if (!value) {
      elementStyle.removeProperty(key);
    } else {
      elementStyle.setProperty(key, value, important ? "important" : "");
    }
  }
}
var Canvas = class {
  constructor(container, engine) {
    this.container = container;
    this._applyPostDrawUpdaters = (particle) => {
      var _a;
      for (const updater of this._postDrawUpdaters) {
        (_a = updater.afterDraw) == null ? void 0 : _a.call(updater, particle);
      }
    };
    this._applyPreDrawUpdaters = (ctx, particle, radius, zOpacity, colorStyles, transform) => {
      var _a;
      for (const updater of this._preDrawUpdaters) {
        if (updater.getColorStyles) {
          const { fill, stroke } = updater.getColorStyles(particle, ctx, radius, zOpacity);
          if (fill) {
            colorStyles.fill = fill;
          }
          if (stroke) {
            colorStyles.stroke = stroke;
          }
        }
        if (updater.getTransformValues) {
          const updaterTransform = updater.getTransformValues(particle);
          for (const key in updaterTransform) {
            setTransformValue(transform, updaterTransform, key);
          }
        }
        (_a = updater.beforeDraw) == null ? void 0 : _a.call(updater, particle);
      }
    };
    this._applyResizePlugins = () => {
      var _a;
      for (const plugin of this._resizePlugins) {
        (_a = plugin.resize) == null ? void 0 : _a.call(plugin);
      }
    };
    this._getPluginParticleColors = (particle) => {
      let fColor, sColor;
      for (const plugin of this._colorPlugins) {
        if (!fColor && plugin.particleFillColor) {
          fColor = rangeColorToHsl(this._engine, plugin.particleFillColor(particle));
        }
        if (!sColor && plugin.particleStrokeColor) {
          sColor = rangeColorToHsl(this._engine, plugin.particleStrokeColor(particle));
        }
        if (fColor && sColor) {
          break;
        }
      }
      return [fColor, sColor];
    };
    this._initCover = async () => {
      const options = this.container.actualOptions, cover = options.backgroundMask.cover, color = cover.color;
      if (color) {
        const coverRgb = rangeColorToRgb(this._engine, color);
        if (coverRgb) {
          const coverColor = {
            ...coverRgb,
            a: cover.opacity
          };
          this._coverColorStyle = getStyleFromRgb(coverColor, coverColor.a);
        }
      } else {
        await new Promise((resolve, reject) => {
          if (!cover.image) {
            return;
          }
          const img = document.createElement("img");
          img.addEventListener("load", () => {
            this._coverImage = {
              image: img,
              opacity: cover.opacity
            };
            resolve();
          });
          img.addEventListener("error", (evt) => {
            reject(evt.error);
          });
          img.src = cover.image;
        });
      }
    };
    this._initStyle = () => {
      const element = this.element, options = this.container.actualOptions;
      if (!element) {
        return;
      }
      if (this._fullScreen) {
        this._setFullScreenStyle();
      } else {
        this._resetOriginalStyle();
      }
      for (const key in options.style) {
        if (!key || !options.style || !Object.prototype.hasOwnProperty.call(options.style, key)) {
          continue;
        }
        const value = options.style[key];
        if (!value) {
          continue;
        }
        element.style.setProperty(key, value, "important");
      }
    };
    this._initTrail = async () => {
      const options = this.container.actualOptions, trail = options.particles.move.trail, trailFill = trail.fill;
      if (!trail.enable) {
        return;
      }
      const opacity = inverseFactorNumerator / trail.length;
      if (trailFill.color) {
        const fillColor = rangeColorToRgb(this._engine, trailFill.color);
        if (!fillColor) {
          return;
        }
        this._trailFill = {
          color: {
            ...fillColor
          },
          opacity
        };
      } else {
        await new Promise((resolve, reject) => {
          if (!trailFill.image) {
            return;
          }
          const img = document.createElement("img");
          img.addEventListener("load", () => {
            this._trailFill = {
              image: img,
              opacity
            };
            resolve();
          });
          img.addEventListener("error", (evt) => {
            reject(evt.error);
          });
          img.src = trailFill.image;
        });
      }
    };
    this._paintBase = (baseColor) => {
      this.draw((ctx) => paintBase(ctx, this.size, baseColor));
    };
    this._paintImage = (image, opacity) => {
      this.draw((ctx) => paintImage(ctx, this.size, image, opacity));
    };
    this._repairStyle = () => {
      const element = this.element;
      if (!element) {
        return;
      }
      this._safeMutationObserver((observer) => observer.disconnect());
      this._initStyle();
      this.initBackground();
      this._safeMutationObserver((observer) => {
        if (!element || !(element instanceof Node)) {
          return;
        }
        observer.observe(element, { attributes: true });
      });
    };
    this._resetOriginalStyle = () => {
      const element = this.element, originalStyle = this._originalStyle;
      if (!element || !originalStyle) {
        return;
      }
      setStyle(element, originalStyle, true);
    };
    this._safeMutationObserver = (callback) => {
      if (!this._mutationObserver) {
        return;
      }
      callback(this._mutationObserver);
    };
    this._setFullScreenStyle = () => {
      const element = this.element;
      if (!element) {
        return;
      }
      setStyle(element, getFullScreenStyle(this.container.actualOptions.fullScreen.zIndex), true);
    };
    this._engine = engine;
    this._standardSize = {
      height: 0,
      width: 0
    };
    const pxRatio = container.retina.pixelRatio, stdSize = this._standardSize;
    this.size = {
      height: stdSize.height * pxRatio,
      width: stdSize.width * pxRatio
    };
    this._context = null;
    this._generated = false;
    this._preDrawUpdaters = [];
    this._postDrawUpdaters = [];
    this._resizePlugins = [];
    this._colorPlugins = [];
  }
  get _fullScreen() {
    return this.container.actualOptions.fullScreen.enable;
  }
  clear() {
    const options = this.container.actualOptions, trail = options.particles.move.trail, trailFill = this._trailFill;
    if (options.backgroundMask.enable) {
      this.paint();
    } else if (trail.enable && trail.length > minimumLength && trailFill) {
      if (trailFill.color) {
        this._paintBase(getStyleFromRgb(trailFill.color, trailFill.opacity));
      } else if (trailFill.image) {
        this._paintImage(trailFill.image, trailFill.opacity);
      }
    } else if (options.clear) {
      this.draw((ctx) => {
        clear(ctx, this.size);
      });
    }
  }
  destroy() {
    this.stop();
    if (this._generated) {
      const element = this.element;
      element == null ? void 0 : element.remove();
      this.element = void 0;
    } else {
      this._resetOriginalStyle();
    }
    this._preDrawUpdaters = [];
    this._postDrawUpdaters = [];
    this._resizePlugins = [];
    this._colorPlugins = [];
  }
  draw(cb) {
    const ctx = this._context;
    if (!ctx) {
      return;
    }
    return cb(ctx);
  }
  drawAsync(cb) {
    const ctx = this._context;
    if (!ctx) {
      return void 0;
    }
    return cb(ctx);
  }
  drawParticle(particle, delta) {
    if (particle.spawning || particle.destroyed) {
      return;
    }
    const radius = particle.getRadius();
    if (radius <= minimumSize) {
      return;
    }
    const pfColor = particle.getFillColor(), psColor = particle.getStrokeColor() ?? pfColor;
    let [fColor, sColor] = this._getPluginParticleColors(particle);
    if (!fColor) {
      fColor = pfColor;
    }
    if (!sColor) {
      sColor = psColor;
    }
    if (!fColor && !sColor) {
      return;
    }
    this.draw((ctx) => {
      var _a;
      const container = this.container, options = container.actualOptions, zIndexOptions = particle.options.zIndex, zIndexFactor = zIndexFactorOffset - particle.zIndexFactor, zOpacityFactor = zIndexFactor ** zIndexOptions.opacityRate, opacity = particle.bubble.opacity ?? ((_a = particle.opacity) == null ? void 0 : _a.value) ?? defaultOpacity, strokeOpacity = particle.strokeOpacity ?? opacity, zOpacity = opacity * zOpacityFactor, zStrokeOpacity = strokeOpacity * zOpacityFactor, transform = {}, colorStyles = {
        fill: fColor ? getStyleFromHsl(fColor, zOpacity) : void 0
      };
      colorStyles.stroke = sColor ? getStyleFromHsl(sColor, zStrokeOpacity) : colorStyles.fill;
      this._applyPreDrawUpdaters(ctx, particle, radius, zOpacity, colorStyles, transform);
      drawParticle({
        container,
        context: ctx,
        particle,
        delta,
        colorStyles,
        backgroundMask: options.backgroundMask.enable,
        composite: options.backgroundMask.composite,
        radius: radius * zIndexFactor ** zIndexOptions.sizeRate,
        opacity: zOpacity,
        shadow: particle.options.shadow,
        transform
      });
      this._applyPostDrawUpdaters(particle);
    });
  }
  drawParticlePlugin(plugin, particle, delta) {
    this.draw((ctx) => drawParticlePlugin(ctx, plugin, particle, delta));
  }
  drawPlugin(plugin, delta) {
    this.draw((ctx) => drawPlugin(ctx, plugin, delta));
  }
  async init() {
    this._safeMutationObserver((obs) => obs.disconnect());
    this._mutationObserver = safeMutationObserver((records) => {
      for (const record of records) {
        if (record.type === "attributes" && record.attributeName === "style") {
          this._repairStyle();
        }
      }
    });
    this.resize();
    this._initStyle();
    await this._initCover();
    try {
      await this._initTrail();
    } catch (e) {
      getLogger().error(e);
    }
    this.initBackground();
    this._safeMutationObserver((obs) => {
      if (!this.element || !(this.element instanceof Node)) {
        return;
      }
      obs.observe(this.element, { attributes: true });
    });
    this.initUpdaters();
    this.initPlugins();
    this.paint();
  }
  initBackground() {
    const options = this.container.actualOptions, background = options.background, element = this.element;
    if (!element) {
      return;
    }
    const elementStyle = element.style;
    if (!elementStyle) {
      return;
    }
    if (background.color) {
      const color = rangeColorToRgb(this._engine, background.color);
      elementStyle.backgroundColor = color ? getStyleFromRgb(color, background.opacity) : "";
    } else {
      elementStyle.backgroundColor = "";
    }
    elementStyle.backgroundImage = background.image || "";
    elementStyle.backgroundPosition = background.position || "";
    elementStyle.backgroundRepeat = background.repeat || "";
    elementStyle.backgroundSize = background.size || "";
  }
  initPlugins() {
    this._resizePlugins = [];
    for (const plugin of this.container.plugins.values()) {
      if (plugin.resize) {
        this._resizePlugins.push(plugin);
      }
      if (plugin.particleFillColor ?? plugin.particleStrokeColor) {
        this._colorPlugins.push(plugin);
      }
    }
  }
  initUpdaters() {
    this._preDrawUpdaters = [];
    this._postDrawUpdaters = [];
    for (const updater of this.container.particles.updaters) {
      if (updater.afterDraw) {
        this._postDrawUpdaters.push(updater);
      }
      if (updater.getColorStyles ?? updater.getTransformValues ?? updater.beforeDraw) {
        this._preDrawUpdaters.push(updater);
      }
    }
  }
  loadCanvas(canvas) {
    if (this._generated && this.element) {
      this.element.remove();
    }
    this._generated = canvas.dataset && generatedAttribute in canvas.dataset ? canvas.dataset[generatedAttribute] === "true" : this._generated;
    this.element = canvas;
    this.element.ariaHidden = "true";
    this._originalStyle = cloneStyle(this.element.style);
    const standardSize = this._standardSize;
    standardSize.height = canvas.offsetHeight;
    standardSize.width = canvas.offsetWidth;
    const pxRatio = this.container.retina.pixelRatio, retinaSize = this.size;
    canvas.height = retinaSize.height = standardSize.height * pxRatio;
    canvas.width = retinaSize.width = standardSize.width * pxRatio;
    this._context = this.element.getContext("2d");
    this._safeMutationObserver((obs) => obs.disconnect());
    this.container.retina.init();
    this.initBackground();
    this._safeMutationObserver((obs) => {
      if (!this.element || !(this.element instanceof Node)) {
        return;
      }
      obs.observe(this.element, { attributes: true });
    });
  }
  paint() {
    const options = this.container.actualOptions;
    this.draw((ctx) => {
      if (options.backgroundMask.enable && options.backgroundMask.cover) {
        clear(ctx, this.size);
        if (this._coverImage) {
          this._paintImage(this._coverImage.image, this._coverImage.opacity);
        } else if (this._coverColorStyle) {
          this._paintBase(this._coverColorStyle);
        } else {
          this._paintBase();
        }
      } else {
        this._paintBase();
      }
    });
  }
  resize() {
    if (!this.element) {
      return false;
    }
    const container = this.container, currentSize = container.canvas._standardSize, newSize = {
      width: this.element.offsetWidth,
      height: this.element.offsetHeight
    }, pxRatio = container.retina.pixelRatio, retinaSize = {
      width: newSize.width * pxRatio,
      height: newSize.height * pxRatio
    };
    if (newSize.height === currentSize.height && newSize.width === currentSize.width && retinaSize.height === this.element.height && retinaSize.width === this.element.width) {
      return false;
    }
    const oldSize = { ...currentSize };
    currentSize.height = newSize.height;
    currentSize.width = newSize.width;
    const canvasSize = this.size;
    this.element.width = canvasSize.width = retinaSize.width;
    this.element.height = canvasSize.height = retinaSize.height;
    if (this.container.started) {
      container.particles.setResizeFactor({
        width: currentSize.width / oldSize.width,
        height: currentSize.height / oldSize.height
      });
    }
    return true;
  }
  stop() {
    this._safeMutationObserver((obs) => obs.disconnect());
    this._mutationObserver = void 0;
    this.draw((ctx) => clear(ctx, this.size));
  }
  async windowResize() {
    if (!this.element || !this.resize()) {
      return;
    }
    const container = this.container, needsRefresh = container.updateActualOptions();
    container.particles.setDensity();
    this._applyResizePlugins();
    if (needsRefresh) {
      await container.refresh();
    }
  }
};

// node_modules/@tsparticles/engine/browser/Enums/InteractivityDetect.js
var InteractivityDetect;
(function(InteractivityDetect2) {
  InteractivityDetect2["canvas"] = "canvas";
  InteractivityDetect2["parent"] = "parent";
  InteractivityDetect2["window"] = "window";
})(InteractivityDetect || (InteractivityDetect = {}));

// node_modules/@tsparticles/engine/browser/Core/Utils/EventListeners.js
function manageListener(element, event, handler, add, options) {
  if (add) {
    let addOptions = { passive: true };
    if (isBoolean(options)) {
      addOptions.capture = options;
    } else if (options !== void 0) {
      addOptions = options;
    }
    element.addEventListener(event, handler, addOptions);
  } else {
    const removeOptions = options;
    element.removeEventListener(event, handler, removeOptions);
  }
}
var EventListeners = class {
  constructor(container) {
    this.container = container;
    this._doMouseTouchClick = (e) => {
      const container2 = this.container, options = container2.actualOptions;
      if (this._canPush) {
        const mouseInteractivity = container2.interactivity.mouse, mousePos = mouseInteractivity.position;
        if (!mousePos) {
          return;
        }
        mouseInteractivity.clickPosition = { ...mousePos };
        mouseInteractivity.clickTime = (/* @__PURE__ */ new Date()).getTime();
        const onClick = options.interactivity.events.onClick;
        executeOnSingleOrMultiple(onClick.mode, (mode) => this.container.handleClickMode(mode));
      }
      if (e.type === "touchend") {
        setTimeout(() => this._mouseTouchFinish(), touchDelay);
      }
    };
    this._handleThemeChange = (e) => {
      const mediaEvent = e, container2 = this.container, options = container2.options, defaultThemes = options.defaultThemes, themeName = mediaEvent.matches ? defaultThemes.dark : defaultThemes.light, theme = options.themes.find((theme2) => theme2.name === themeName);
      if (theme == null ? void 0 : theme.default.auto) {
        void container2.loadTheme(themeName);
      }
    };
    this._handleVisibilityChange = () => {
      const container2 = this.container, options = container2.actualOptions;
      this._mouseTouchFinish();
      if (!options.pauseOnBlur) {
        return;
      }
      if (document == null ? void 0 : document.hidden) {
        container2.pageHidden = true;
        container2.pause();
      } else {
        container2.pageHidden = false;
        if (container2.animationStatus) {
          void container2.play(true);
        } else {
          void container2.draw(true);
        }
      }
    };
    this._handleWindowResize = () => {
      if (this._resizeTimeout) {
        clearTimeout(this._resizeTimeout);
        delete this._resizeTimeout;
      }
      const handleResize = async () => {
        const canvas = this.container.canvas;
        await (canvas == null ? void 0 : canvas.windowResize());
      };
      this._resizeTimeout = setTimeout(() => void handleResize(), this.container.actualOptions.interactivity.events.resize.delay * millisecondsToSeconds);
    };
    this._manageInteractivityListeners = (mouseLeaveTmpEvent, add) => {
      const handlers = this._handlers, container2 = this.container, options = container2.actualOptions, interactivityEl = container2.interactivity.element;
      if (!interactivityEl) {
        return;
      }
      const html = interactivityEl, canvasEl = container2.canvas.element;
      if (canvasEl) {
        canvasEl.style.pointerEvents = html === canvasEl ? "initial" : "none";
      }
      if (!(options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable)) {
        return;
      }
      manageListener(interactivityEl, mouseMoveEvent, handlers.mouseMove, add);
      manageListener(interactivityEl, touchStartEvent, handlers.touchStart, add);
      manageListener(interactivityEl, touchMoveEvent, handlers.touchMove, add);
      if (!options.interactivity.events.onClick.enable) {
        manageListener(interactivityEl, touchEndEvent, handlers.touchEnd, add);
      } else {
        manageListener(interactivityEl, touchEndEvent, handlers.touchEndClick, add);
        manageListener(interactivityEl, mouseUpEvent, handlers.mouseUp, add);
        manageListener(interactivityEl, mouseDownEvent, handlers.mouseDown, add);
      }
      manageListener(interactivityEl, mouseLeaveTmpEvent, handlers.mouseLeave, add);
      manageListener(interactivityEl, touchCancelEvent, handlers.touchCancel, add);
    };
    this._manageListeners = (add) => {
      const handlers = this._handlers, container2 = this.container, options = container2.actualOptions, detectType = options.interactivity.detectsOn, canvasEl = container2.canvas.element;
      let mouseLeaveTmpEvent = mouseLeaveEvent;
      if (detectType === InteractivityDetect.window) {
        container2.interactivity.element = window;
        mouseLeaveTmpEvent = mouseOutEvent;
      } else if (detectType === InteractivityDetect.parent && canvasEl) {
        container2.interactivity.element = canvasEl.parentElement ?? canvasEl.parentNode;
      } else {
        container2.interactivity.element = canvasEl;
      }
      this._manageMediaMatch(add);
      this._manageResize(add);
      this._manageInteractivityListeners(mouseLeaveTmpEvent, add);
      if (document) {
        manageListener(document, visibilityChangeEvent, handlers.visibilityChange, add, false);
      }
    };
    this._manageMediaMatch = (add) => {
      const handlers = this._handlers, mediaMatch = safeMatchMedia("(prefers-color-scheme: dark)");
      if (!mediaMatch) {
        return;
      }
      if (mediaMatch.addEventListener !== void 0) {
        manageListener(mediaMatch, "change", handlers.themeChange, add);
        return;
      }
      if (mediaMatch.addListener === void 0) {
        return;
      }
      if (add) {
        mediaMatch.addListener(handlers.oldThemeChange);
      } else {
        mediaMatch.removeListener(handlers.oldThemeChange);
      }
    };
    this._manageResize = (add) => {
      const handlers = this._handlers, container2 = this.container, options = container2.actualOptions;
      if (!options.interactivity.events.resize) {
        return;
      }
      if (typeof ResizeObserver === "undefined") {
        manageListener(window, resizeEvent, handlers.resize, add);
        return;
      }
      const canvasEl = container2.canvas.element;
      if (this._resizeObserver && !add) {
        if (canvasEl) {
          this._resizeObserver.unobserve(canvasEl);
        }
        this._resizeObserver.disconnect();
        delete this._resizeObserver;
      } else if (!this._resizeObserver && add && canvasEl) {
        this._resizeObserver = new ResizeObserver((entries) => {
          const entry = entries.find((e) => e.target === canvasEl);
          if (!entry) {
            return;
          }
          this._handleWindowResize();
        });
        this._resizeObserver.observe(canvasEl);
      }
    };
    this._mouseDown = () => {
      const { interactivity } = this.container;
      if (!interactivity) {
        return;
      }
      const { mouse } = interactivity;
      mouse.clicking = true;
      mouse.downPosition = mouse.position;
    };
    this._mouseTouchClick = (e) => {
      const container2 = this.container, options = container2.actualOptions, { mouse } = container2.interactivity;
      mouse.inside = true;
      let handled = false;
      const mousePosition = mouse.position;
      if (!mousePosition || !options.interactivity.events.onClick.enable) {
        return;
      }
      for (const plugin of container2.plugins.values()) {
        if (!plugin.clickPositionValid) {
          continue;
        }
        handled = plugin.clickPositionValid(mousePosition);
        if (handled) {
          break;
        }
      }
      if (!handled) {
        this._doMouseTouchClick(e);
      }
      mouse.clicking = false;
    };
    this._mouseTouchFinish = () => {
      const interactivity = this.container.interactivity;
      if (!interactivity) {
        return;
      }
      const mouse = interactivity.mouse;
      delete mouse.position;
      delete mouse.clickPosition;
      delete mouse.downPosition;
      interactivity.status = mouseLeaveEvent;
      mouse.inside = false;
      mouse.clicking = false;
    };
    this._mouseTouchMove = (e) => {
      const container2 = this.container, options = container2.actualOptions, interactivity = container2.interactivity, canvasEl = container2.canvas.element;
      if (!(interactivity == null ? void 0 : interactivity.element)) {
        return;
      }
      interactivity.mouse.inside = true;
      let pos;
      if (e.type.startsWith("pointer")) {
        this._canPush = true;
        const mouseEvent = e;
        if (interactivity.element === window) {
          if (canvasEl) {
            const clientRect = canvasEl.getBoundingClientRect();
            pos = {
              x: mouseEvent.clientX - clientRect.left,
              y: mouseEvent.clientY - clientRect.top
            };
          }
        } else if (options.interactivity.detectsOn === InteractivityDetect.parent) {
          const source = mouseEvent.target, target = mouseEvent.currentTarget;
          if (source && target && canvasEl) {
            const sourceRect = source.getBoundingClientRect(), targetRect = target.getBoundingClientRect(), canvasRect = canvasEl.getBoundingClientRect();
            pos = {
              x: mouseEvent.offsetX + double * sourceRect.left - (targetRect.left + canvasRect.left),
              y: mouseEvent.offsetY + double * sourceRect.top - (targetRect.top + canvasRect.top)
            };
          } else {
            pos = {
              x: mouseEvent.offsetX ?? mouseEvent.clientX,
              y: mouseEvent.offsetY ?? mouseEvent.clientY
            };
          }
        } else if (mouseEvent.target === canvasEl) {
          pos = {
            x: mouseEvent.offsetX ?? mouseEvent.clientX,
            y: mouseEvent.offsetY ?? mouseEvent.clientY
          };
        }
      } else {
        this._canPush = e.type !== "touchmove";
        if (canvasEl) {
          const touchEvent = e, lastTouch = touchEvent.touches[touchEvent.touches.length - lengthOffset], canvasRect = canvasEl.getBoundingClientRect();
          pos = {
            x: lastTouch.clientX - (canvasRect.left ?? minCoordinate),
            y: lastTouch.clientY - (canvasRect.top ?? minCoordinate)
          };
        }
      }
      const pxRatio = container2.retina.pixelRatio;
      if (pos) {
        pos.x *= pxRatio;
        pos.y *= pxRatio;
      }
      interactivity.mouse.position = pos;
      interactivity.status = mouseMoveEvent;
    };
    this._touchEnd = (e) => {
      const evt = e, touches = Array.from(evt.changedTouches);
      for (const touch of touches) {
        this._touches.delete(touch.identifier);
      }
      this._mouseTouchFinish();
    };
    this._touchEndClick = (e) => {
      const evt = e, touches = Array.from(evt.changedTouches);
      for (const touch of touches) {
        this._touches.delete(touch.identifier);
      }
      this._mouseTouchClick(e);
    };
    this._touchStart = (e) => {
      const evt = e, touches = Array.from(evt.changedTouches);
      for (const touch of touches) {
        this._touches.set(touch.identifier, performance.now());
      }
      this._mouseTouchMove(e);
    };
    this._canPush = true;
    this._touches = /* @__PURE__ */ new Map();
    this._handlers = {
      mouseDown: () => this._mouseDown(),
      mouseLeave: () => this._mouseTouchFinish(),
      mouseMove: (e) => this._mouseTouchMove(e),
      mouseUp: (e) => this._mouseTouchClick(e),
      touchStart: (e) => this._touchStart(e),
      touchMove: (e) => this._mouseTouchMove(e),
      touchEnd: (e) => this._touchEnd(e),
      touchCancel: (e) => this._touchEnd(e),
      touchEndClick: (e) => this._touchEndClick(e),
      visibilityChange: () => this._handleVisibilityChange(),
      themeChange: (e) => this._handleThemeChange(e),
      oldThemeChange: (e) => this._handleThemeChange(e),
      resize: () => {
        this._handleWindowResize();
      }
    };
  }
  addListeners() {
    this._manageListeners(true);
  }
  removeListeners() {
    this._manageListeners(false);
  }
};

// node_modules/@tsparticles/engine/browser/Enums/Types/EventType.js
var EventType;
(function(EventType2) {
  EventType2["configAdded"] = "configAdded";
  EventType2["containerInit"] = "containerInit";
  EventType2["particlesSetup"] = "particlesSetup";
  EventType2["containerStarted"] = "containerStarted";
  EventType2["containerStopped"] = "containerStopped";
  EventType2["containerDestroyed"] = "containerDestroyed";
  EventType2["containerPaused"] = "containerPaused";
  EventType2["containerPlay"] = "containerPlay";
  EventType2["containerBuilt"] = "containerBuilt";
  EventType2["particleAdded"] = "particleAdded";
  EventType2["particleDestroyed"] = "particleDestroyed";
  EventType2["particleRemoved"] = "particleRemoved";
})(EventType || (EventType = {}));

// node_modules/@tsparticles/engine/browser/Options/Classes/OptionsColor.js
var OptionsColor = class _OptionsColor {
  constructor() {
    this.value = "";
  }
  static create(source, data) {
    const color = new _OptionsColor();
    color.load(source);
    if (data !== void 0) {
      if (isString(data) || isArray(data)) {
        color.load({ value: data });
      } else {
        color.load(data);
      }
    }
    return color;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (!isNull(data.value)) {
      this.value = data.value;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Background/Background.js
var Background = class {
  constructor() {
    this.color = new OptionsColor();
    this.color.value = "";
    this.image = "";
    this.position = "";
    this.repeat = "";
    this.size = "";
    this.opacity = 1;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.image !== void 0) {
      this.image = data.image;
    }
    if (data.position !== void 0) {
      this.position = data.position;
    }
    if (data.repeat !== void 0) {
      this.repeat = data.repeat;
    }
    if (data.size !== void 0) {
      this.size = data.size;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/BackgroundMask/BackgroundMaskCover.js
var BackgroundMaskCover = class {
  constructor() {
    this.opacity = 1;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.image !== void 0) {
      this.image = data.image;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/BackgroundMask/BackgroundMask.js
var BackgroundMask = class {
  constructor() {
    this.composite = "destination-out";
    this.cover = new BackgroundMaskCover();
    this.enable = false;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.composite !== void 0) {
      this.composite = data.composite;
    }
    if (data.cover !== void 0) {
      const cover = data.cover, color = isString(data.cover) ? { color: data.cover } : data.cover;
      this.cover.load(cover.color !== void 0 || cover.image !== void 0 ? cover : { color });
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/FullScreen/FullScreen.js
var FullScreen = class {
  constructor() {
    this.enable = true;
    this.zIndex = 0;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.zIndex !== void 0) {
      this.zIndex = data.zIndex;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Interactivity/Events/ClickEvent.js
var ClickEvent = class {
  constructor() {
    this.enable = false;
    this.mode = [];
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Enums/Types/DivType.js
var DivType;
(function(DivType2) {
  DivType2["circle"] = "circle";
  DivType2["rectangle"] = "rectangle";
})(DivType || (DivType = {}));

// node_modules/@tsparticles/engine/browser/Options/Classes/Interactivity/Events/DivEvent.js
var DivEvent = class {
  constructor() {
    this.selectors = [];
    this.enable = false;
    this.mode = [];
    this.type = DivType.circle;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.selectors !== void 0) {
      this.selectors = data.selectors;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    if (data.type !== void 0) {
      this.type = data.type;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Interactivity/Events/Parallax.js
var Parallax = class {
  constructor() {
    this.enable = false;
    this.force = 2;
    this.smooth = 10;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.force !== void 0) {
      this.force = data.force;
    }
    if (data.smooth !== void 0) {
      this.smooth = data.smooth;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Interactivity/Events/HoverEvent.js
var HoverEvent = class {
  constructor() {
    this.enable = false;
    this.mode = [];
    this.parallax = new Parallax();
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    this.parallax.load(data.parallax);
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Interactivity/Events/ResizeEvent.js
var ResizeEvent = class {
  constructor() {
    this.delay = 0.5;
    this.enable = true;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.delay !== void 0) {
      this.delay = data.delay;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Interactivity/Events/Events.js
var Events = class {
  constructor() {
    this.onClick = new ClickEvent();
    this.onDiv = new DivEvent();
    this.onHover = new HoverEvent();
    this.resize = new ResizeEvent();
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    this.onClick.load(data.onClick);
    const onDiv = data.onDiv;
    if (onDiv !== void 0) {
      this.onDiv = executeOnSingleOrMultiple(onDiv, (t) => {
        const tmp = new DivEvent();
        tmp.load(t);
        return tmp;
      });
    }
    this.onHover.load(data.onHover);
    this.resize.load(data.resize);
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Interactivity/Modes/Modes.js
var Modes = class {
  constructor(engine, container) {
    this._engine = engine;
    this._container = container;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (!this._container) {
      return;
    }
    const interactors = this._engine.interactors.get(this._container);
    if (!interactors) {
      return;
    }
    for (const interactor of interactors) {
      if (!interactor.loadModeOptions) {
        continue;
      }
      interactor.loadModeOptions(this, data);
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Interactivity/Interactivity.js
var Interactivity = class {
  constructor(engine, container) {
    this.detectsOn = InteractivityDetect.window;
    this.events = new Events();
    this.modes = new Modes(engine, container);
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    const detectsOn = data.detectsOn;
    if (detectsOn !== void 0) {
      this.detectsOn = detectsOn;
    }
    this.events.load(data.events);
    this.modes.load(data.modes);
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/ManualParticle.js
var ManualParticle = class {
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.position) {
      this.position = {
        x: data.position.x ?? manualDefaultPosition,
        y: data.position.y ?? manualDefaultPosition,
        mode: data.position.mode ?? PixelMode.percent
      };
    }
    if (data.options) {
      this.options = deepExtend({}, data.options);
    }
  }
};

// node_modules/@tsparticles/engine/browser/Enums/Modes/ResponsiveMode.js
var ResponsiveMode;
(function(ResponsiveMode2) {
  ResponsiveMode2["screen"] = "screen";
  ResponsiveMode2["canvas"] = "canvas";
})(ResponsiveMode || (ResponsiveMode = {}));

// node_modules/@tsparticles/engine/browser/Options/Classes/Responsive.js
var Responsive = class {
  constructor() {
    this.maxWidth = Infinity;
    this.options = {};
    this.mode = ResponsiveMode.canvas;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (!isNull(data.maxWidth)) {
      this.maxWidth = data.maxWidth;
    }
    if (!isNull(data.mode)) {
      if (data.mode === ResponsiveMode.screen) {
        this.mode = ResponsiveMode.screen;
      } else {
        this.mode = ResponsiveMode.canvas;
      }
    }
    if (!isNull(data.options)) {
      this.options = deepExtend({}, data.options);
    }
  }
};

// node_modules/@tsparticles/engine/browser/Enums/Modes/ThemeMode.js
var ThemeMode;
(function(ThemeMode2) {
  ThemeMode2["any"] = "any";
  ThemeMode2["dark"] = "dark";
  ThemeMode2["light"] = "light";
})(ThemeMode || (ThemeMode = {}));

// node_modules/@tsparticles/engine/browser/Options/Classes/Theme/ThemeDefault.js
var ThemeDefault = class {
  constructor() {
    this.auto = false;
    this.mode = ThemeMode.any;
    this.value = false;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.auto !== void 0) {
      this.auto = data.auto;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    if (data.value !== void 0) {
      this.value = data.value;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Theme/Theme.js
var Theme = class {
  constructor() {
    this.name = "";
    this.default = new ThemeDefault();
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.name !== void 0) {
      this.name = data.name;
    }
    this.default.load(data.default);
    if (data.options !== void 0) {
      this.options = deepExtend({}, data.options);
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/AnimationOptions.js
var AnimationOptions = class {
  constructor() {
    this.count = 0;
    this.enable = false;
    this.speed = 1;
    this.decay = 0;
    this.delay = 0;
    this.sync = false;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.count !== void 0) {
      this.count = setRangeValue(data.count);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.speed !== void 0) {
      this.speed = setRangeValue(data.speed);
    }
    if (data.decay !== void 0) {
      this.decay = setRangeValue(data.decay);
    }
    if (data.delay !== void 0) {
      this.delay = setRangeValue(data.delay);
    }
    if (data.sync !== void 0) {
      this.sync = data.sync;
    }
  }
};
var RangedAnimationOptions = class extends AnimationOptions {
  constructor() {
    super();
    this.mode = AnimationMode.auto;
    this.startValue = StartValueType.random;
  }
  load(data) {
    super.load(data);
    if (isNull(data)) {
      return;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    if (data.startValue !== void 0) {
      this.startValue = data.startValue;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/ColorAnimation.js
var ColorAnimation = class extends AnimationOptions {
  constructor() {
    super();
    this.offset = 0;
    this.sync = true;
  }
  load(data) {
    super.load(data);
    if (isNull(data)) {
      return;
    }
    if (data.offset !== void 0) {
      this.offset = setRangeValue(data.offset);
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/HslAnimation.js
var HslAnimation = class {
  constructor() {
    this.h = new ColorAnimation();
    this.s = new ColorAnimation();
    this.l = new ColorAnimation();
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    this.h.load(data.h);
    this.s.load(data.s);
    this.l.load(data.l);
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/AnimatableColor.js
var AnimatableColor = class _AnimatableColor extends OptionsColor {
  constructor() {
    super();
    this.animation = new HslAnimation();
  }
  static create(source, data) {
    const color = new _AnimatableColor();
    color.load(source);
    if (data !== void 0) {
      if (isString(data) || isArray(data)) {
        color.load({ value: data });
      } else {
        color.load(data);
      }
    }
    return color;
  }
  load(data) {
    super.load(data);
    if (isNull(data)) {
      return;
    }
    const colorAnimation = data.animation;
    if (colorAnimation !== void 0) {
      if (colorAnimation.enable !== void 0) {
        this.animation.h.load(colorAnimation);
      } else {
        this.animation.load(data.animation);
      }
    }
  }
};

// node_modules/@tsparticles/engine/browser/Enums/Modes/CollisionMode.js
var CollisionMode;
(function(CollisionMode2) {
  CollisionMode2["absorb"] = "absorb";
  CollisionMode2["bounce"] = "bounce";
  CollisionMode2["destroy"] = "destroy";
})(CollisionMode || (CollisionMode = {}));

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Collisions/CollisionsAbsorb.js
var CollisionsAbsorb = class {
  constructor() {
    this.speed = 2;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.speed !== void 0) {
      this.speed = data.speed;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Collisions/CollisionsOverlap.js
var CollisionsOverlap = class {
  constructor() {
    this.enable = true;
    this.retries = 0;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.retries !== void 0) {
      this.retries = data.retries;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/ValueWithRandom.js
var ValueWithRandom = class {
  constructor() {
    this.value = 0;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (!isNull(data.value)) {
      this.value = setRangeValue(data.value);
    }
  }
};
var AnimationValueWithRandom = class extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new AnimationOptions();
  }
  load(data) {
    super.load(data);
    if (isNull(data)) {
      return;
    }
    const animation = data.animation;
    if (animation !== void 0) {
      this.animation.load(animation);
    }
  }
};
var RangedAnimationValueWithRandom = class extends AnimationValueWithRandom {
  constructor() {
    super();
    this.animation = new RangedAnimationOptions();
  }
  load(data) {
    super.load(data);
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Bounce/ParticlesBounceFactor.js
var ParticlesBounceFactor = class extends ValueWithRandom {
  constructor() {
    super();
    this.value = 1;
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Bounce/ParticlesBounce.js
var ParticlesBounce = class {
  constructor() {
    this.horizontal = new ParticlesBounceFactor();
    this.vertical = new ParticlesBounceFactor();
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    this.horizontal.load(data.horizontal);
    this.vertical.load(data.vertical);
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Collisions/Collisions.js
var Collisions = class {
  constructor() {
    this.absorb = new CollisionsAbsorb();
    this.bounce = new ParticlesBounce();
    this.enable = false;
    this.maxSpeed = 50;
    this.mode = CollisionMode.bounce;
    this.overlap = new CollisionsOverlap();
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    this.absorb.load(data.absorb);
    this.bounce.load(data.bounce);
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.maxSpeed !== void 0) {
      this.maxSpeed = setRangeValue(data.maxSpeed);
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    this.overlap.load(data.overlap);
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Effect/Effect.js
var Effect = class {
  constructor() {
    this.close = true;
    this.fill = true;
    this.options = {};
    this.type = [];
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    const options = data.options;
    if (options !== void 0) {
      for (const effect in options) {
        const item = options[effect];
        if (item) {
          this.options[effect] = deepExtend(this.options[effect] ?? {}, item);
        }
      }
    }
    if (data.close !== void 0) {
      this.close = data.close;
    }
    if (data.fill !== void 0) {
      this.fill = data.fill;
    }
    if (data.type !== void 0) {
      this.type = data.type;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Move/MoveAngle.js
var MoveAngle = class {
  constructor() {
    this.offset = 0;
    this.value = 90;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.offset !== void 0) {
      this.offset = setRangeValue(data.offset);
    }
    if (data.value !== void 0) {
      this.value = setRangeValue(data.value);
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Move/MoveAttract.js
var MoveAttract = class {
  constructor() {
    this.distance = 200;
    this.enable = false;
    this.rotate = {
      x: 3e3,
      y: 3e3
    };
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = setRangeValue(data.distance);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.rotate) {
      const rotateX = data.rotate.x;
      if (rotateX !== void 0) {
        this.rotate.x = rotateX;
      }
      const rotateY = data.rotate.y;
      if (rotateY !== void 0) {
        this.rotate.y = rotateY;
      }
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Move/MoveCenter.js
var MoveCenter = class {
  constructor() {
    this.x = 50;
    this.y = 50;
    this.mode = PixelMode.percent;
    this.radius = 0;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.x !== void 0) {
      this.x = data.x;
    }
    if (data.y !== void 0) {
      this.y = data.y;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    if (data.radius !== void 0) {
      this.radius = data.radius;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Move/MoveGravity.js
var MoveGravity = class {
  constructor() {
    this.acceleration = 9.81;
    this.enable = false;
    this.inverse = false;
    this.maxSpeed = 50;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.acceleration !== void 0) {
      this.acceleration = setRangeValue(data.acceleration);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.inverse !== void 0) {
      this.inverse = data.inverse;
    }
    if (data.maxSpeed !== void 0) {
      this.maxSpeed = setRangeValue(data.maxSpeed);
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Move/Path/MovePath.js
var MovePath = class {
  constructor() {
    this.clamp = true;
    this.delay = new ValueWithRandom();
    this.enable = false;
    this.options = {};
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.clamp !== void 0) {
      this.clamp = data.clamp;
    }
    this.delay.load(data.delay);
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    this.generator = data.generator;
    if (data.options) {
      this.options = deepExtend(this.options, data.options);
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Move/MoveTrailFill.js
var MoveTrailFill = class {
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.image !== void 0) {
      this.image = data.image;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Move/MoveTrail.js
var MoveTrail = class {
  constructor() {
    this.enable = false;
    this.length = 10;
    this.fill = new MoveTrailFill();
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.fill !== void 0) {
      this.fill.load(data.fill);
    }
    if (data.length !== void 0) {
      this.length = data.length;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Enums/Modes/OutMode.js
var OutMode;
(function(OutMode2) {
  OutMode2["bounce"] = "bounce";
  OutMode2["none"] = "none";
  OutMode2["out"] = "out";
  OutMode2["destroy"] = "destroy";
  OutMode2["split"] = "split";
})(OutMode || (OutMode = {}));

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Move/OutModes.js
var OutModes = class {
  constructor() {
    this.default = OutMode.out;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.default !== void 0) {
      this.default = data.default;
    }
    this.bottom = data.bottom ?? data.default;
    this.left = data.left ?? data.default;
    this.right = data.right ?? data.default;
    this.top = data.top ?? data.default;
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Move/Spin.js
var Spin = class {
  constructor() {
    this.acceleration = 0;
    this.enable = false;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.acceleration !== void 0) {
      this.acceleration = setRangeValue(data.acceleration);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.position) {
      this.position = deepExtend({}, data.position);
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Move/Move.js
var Move = class {
  constructor() {
    this.angle = new MoveAngle();
    this.attract = new MoveAttract();
    this.center = new MoveCenter();
    this.decay = 0;
    this.distance = {};
    this.direction = MoveDirection.none;
    this.drift = 0;
    this.enable = false;
    this.gravity = new MoveGravity();
    this.path = new MovePath();
    this.outModes = new OutModes();
    this.random = false;
    this.size = false;
    this.speed = 2;
    this.spin = new Spin();
    this.straight = false;
    this.trail = new MoveTrail();
    this.vibrate = false;
    this.warp = false;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    this.angle.load(isNumber(data.angle) ? { value: data.angle } : data.angle);
    this.attract.load(data.attract);
    this.center.load(data.center);
    if (data.decay !== void 0) {
      this.decay = setRangeValue(data.decay);
    }
    if (data.direction !== void 0) {
      this.direction = data.direction;
    }
    if (data.distance !== void 0) {
      this.distance = isNumber(data.distance) ? {
        horizontal: data.distance,
        vertical: data.distance
      } : { ...data.distance };
    }
    if (data.drift !== void 0) {
      this.drift = setRangeValue(data.drift);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    this.gravity.load(data.gravity);
    const outModes = data.outModes;
    if (outModes !== void 0) {
      if (isObject(outModes)) {
        this.outModes.load(outModes);
      } else {
        this.outModes.load({
          default: outModes
        });
      }
    }
    this.path.load(data.path);
    if (data.random !== void 0) {
      this.random = data.random;
    }
    if (data.size !== void 0) {
      this.size = data.size;
    }
    if (data.speed !== void 0) {
      this.speed = setRangeValue(data.speed);
    }
    this.spin.load(data.spin);
    if (data.straight !== void 0) {
      this.straight = data.straight;
    }
    this.trail.load(data.trail);
    if (data.vibrate !== void 0) {
      this.vibrate = data.vibrate;
    }
    if (data.warp !== void 0) {
      this.warp = data.warp;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Opacity/OpacityAnimation.js
var OpacityAnimation = class extends RangedAnimationOptions {
  constructor() {
    super();
    this.destroy = DestroyType.none;
    this.speed = 2;
  }
  load(data) {
    super.load(data);
    if (isNull(data)) {
      return;
    }
    if (data.destroy !== void 0) {
      this.destroy = data.destroy;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Opacity/Opacity.js
var Opacity = class extends RangedAnimationValueWithRandom {
  constructor() {
    super();
    this.animation = new OpacityAnimation();
    this.value = 1;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    super.load(data);
    const animation = data.animation;
    if (animation !== void 0) {
      this.animation.load(animation);
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Number/ParticlesDensity.js
var ParticlesDensity = class {
  constructor() {
    this.enable = false;
    this.width = 1920;
    this.height = 1080;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    const width = data.width;
    if (width !== void 0) {
      this.width = width;
    }
    const height = data.height;
    if (height !== void 0) {
      this.height = height;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Enums/Modes/LimitMode.js
var LimitMode;
(function(LimitMode2) {
  LimitMode2["delete"] = "delete";
  LimitMode2["wait"] = "wait";
})(LimitMode || (LimitMode = {}));

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Number/ParticlesNumberLimit.js
var ParticlesNumberLimit = class {
  constructor() {
    this.mode = LimitMode.delete;
    this.value = 0;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    if (data.value !== void 0) {
      this.value = data.value;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Number/ParticlesNumber.js
var ParticlesNumber = class {
  constructor() {
    this.density = new ParticlesDensity();
    this.limit = new ParticlesNumberLimit();
    this.value = 0;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    this.density.load(data.density);
    this.limit.load(data.limit);
    if (data.value !== void 0) {
      this.value = data.value;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Shadow.js
var Shadow = class {
  constructor() {
    this.blur = 0;
    this.color = new OptionsColor();
    this.enable = false;
    this.offset = {
      x: 0,
      y: 0
    };
    this.color.value = "#000";
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.blur !== void 0) {
      this.blur = data.blur;
    }
    this.color = OptionsColor.create(this.color, data.color);
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.offset === void 0) {
      return;
    }
    if (data.offset.x !== void 0) {
      this.offset.x = data.offset.x;
    }
    if (data.offset.y !== void 0) {
      this.offset.y = data.offset.y;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Shape/Shape.js
var Shape = class {
  constructor() {
    this.close = true;
    this.fill = true;
    this.options = {};
    this.type = "circle";
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    const options = data.options;
    if (options !== void 0) {
      for (const shape in options) {
        const item = options[shape];
        if (item) {
          this.options[shape] = deepExtend(this.options[shape] ?? {}, item);
        }
      }
    }
    if (data.close !== void 0) {
      this.close = data.close;
    }
    if (data.fill !== void 0) {
      this.fill = data.fill;
    }
    if (data.type !== void 0) {
      this.type = data.type;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Size/SizeAnimation.js
var SizeAnimation = class extends RangedAnimationOptions {
  constructor() {
    super();
    this.destroy = DestroyType.none;
    this.speed = 5;
  }
  load(data) {
    super.load(data);
    if (isNull(data)) {
      return;
    }
    if (data.destroy !== void 0) {
      this.destroy = data.destroy;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Size/Size.js
var Size = class extends RangedAnimationValueWithRandom {
  constructor() {
    super();
    this.animation = new SizeAnimation();
    this.value = 3;
  }
  load(data) {
    super.load(data);
    if (isNull(data)) {
      return;
    }
    const animation = data.animation;
    if (animation !== void 0) {
      this.animation.load(animation);
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/Stroke.js
var Stroke = class {
  constructor() {
    this.width = 0;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.color !== void 0) {
      this.color = AnimatableColor.create(this.color, data.color);
    }
    if (data.width !== void 0) {
      this.width = setRangeValue(data.width);
    }
    if (data.opacity !== void 0) {
      this.opacity = setRangeValue(data.opacity);
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/ZIndex/ZIndex.js
var ZIndex = class extends ValueWithRandom {
  constructor() {
    super();
    this.opacityRate = 1;
    this.sizeRate = 1;
    this.velocityRate = 1;
  }
  load(data) {
    super.load(data);
    if (isNull(data)) {
      return;
    }
    if (data.opacityRate !== void 0) {
      this.opacityRate = data.opacityRate;
    }
    if (data.sizeRate !== void 0) {
      this.sizeRate = data.sizeRate;
    }
    if (data.velocityRate !== void 0) {
      this.velocityRate = data.velocityRate;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Options/Classes/Particles/ParticlesOptions.js
var ParticlesOptions = class {
  constructor(engine, container) {
    this._engine = engine;
    this._container = container;
    this.bounce = new ParticlesBounce();
    this.collisions = new Collisions();
    this.color = new AnimatableColor();
    this.color.value = "#fff";
    this.effect = new Effect();
    this.groups = {};
    this.move = new Move();
    this.number = new ParticlesNumber();
    this.opacity = new Opacity();
    this.reduceDuplicates = false;
    this.shadow = new Shadow();
    this.shape = new Shape();
    this.size = new Size();
    this.stroke = new Stroke();
    this.zIndex = new ZIndex();
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.groups !== void 0) {
      for (const group of Object.keys(data.groups)) {
        if (!Object.hasOwn(data.groups, group)) {
          continue;
        }
        const item = data.groups[group];
        if (item !== void 0) {
          this.groups[group] = deepExtend(this.groups[group] ?? {}, item);
        }
      }
    }
    if (data.reduceDuplicates !== void 0) {
      this.reduceDuplicates = data.reduceDuplicates;
    }
    this.bounce.load(data.bounce);
    this.color.load(AnimatableColor.create(this.color, data.color));
    this.effect.load(data.effect);
    this.move.load(data.move);
    this.number.load(data.number);
    this.opacity.load(data.opacity);
    this.shape.load(data.shape);
    this.size.load(data.size);
    this.shadow.load(data.shadow);
    this.zIndex.load(data.zIndex);
    this.collisions.load(data.collisions);
    if (data.interactivity !== void 0) {
      this.interactivity = deepExtend({}, data.interactivity);
    }
    const strokeToLoad = data.stroke;
    if (strokeToLoad) {
      this.stroke = executeOnSingleOrMultiple(strokeToLoad, (t) => {
        const tmp = new Stroke();
        tmp.load(t);
        return tmp;
      });
    }
    if (this._container) {
      const updaters = this._engine.updaters.get(this._container);
      if (updaters) {
        for (const updater of updaters) {
          if (updater.loadOptions) {
            updater.loadOptions(this, data);
          }
        }
      }
      const interactors = this._engine.interactors.get(this._container);
      if (interactors) {
        for (const interactor of interactors) {
          if (interactor.loadParticlesOptions) {
            interactor.loadParticlesOptions(this, data);
          }
        }
      }
    }
  }
};

// node_modules/@tsparticles/engine/browser/Utils/OptionsUtils.js
function loadOptions(options, ...sourceOptionsArr) {
  for (const sourceOptions of sourceOptionsArr) {
    options.load(sourceOptions);
  }
}
function loadParticlesOptions(engine, container, ...sourceOptionsArr) {
  const options = new ParticlesOptions(engine, container);
  loadOptions(options, ...sourceOptionsArr);
  return options;
}

// node_modules/@tsparticles/engine/browser/Options/Classes/Options.js
var Options = class {
  constructor(engine, container) {
    this._findDefaultTheme = (mode) => {
      return this.themes.find((theme) => theme.default.value && theme.default.mode === mode) ?? this.themes.find((theme) => theme.default.value && theme.default.mode === ThemeMode.any);
    };
    this._importPreset = (preset) => {
      this.load(this._engine.getPreset(preset));
    };
    this._engine = engine;
    this._container = container;
    this.autoPlay = true;
    this.background = new Background();
    this.backgroundMask = new BackgroundMask();
    this.clear = true;
    this.defaultThemes = {};
    this.delay = 0;
    this.fullScreen = new FullScreen();
    this.detectRetina = true;
    this.duration = 0;
    this.fpsLimit = 120;
    this.interactivity = new Interactivity(engine, container);
    this.manualParticles = [];
    this.particles = loadParticlesOptions(this._engine, this._container);
    this.pauseOnBlur = true;
    this.pauseOnOutsideViewport = true;
    this.responsive = [];
    this.smooth = false;
    this.style = {};
    this.themes = [];
    this.zLayers = 100;
  }
  load(data) {
    var _a, _b;
    if (isNull(data)) {
      return;
    }
    if (data.preset !== void 0) {
      executeOnSingleOrMultiple(data.preset, (preset) => this._importPreset(preset));
    }
    if (data.autoPlay !== void 0) {
      this.autoPlay = data.autoPlay;
    }
    if (data.clear !== void 0) {
      this.clear = data.clear;
    }
    if (data.key !== void 0) {
      this.key = data.key;
    }
    if (data.name !== void 0) {
      this.name = data.name;
    }
    if (data.delay !== void 0) {
      this.delay = setRangeValue(data.delay);
    }
    const detectRetina = data.detectRetina;
    if (detectRetina !== void 0) {
      this.detectRetina = detectRetina;
    }
    if (data.duration !== void 0) {
      this.duration = setRangeValue(data.duration);
    }
    const fpsLimit = data.fpsLimit;
    if (fpsLimit !== void 0) {
      this.fpsLimit = fpsLimit;
    }
    if (data.pauseOnBlur !== void 0) {
      this.pauseOnBlur = data.pauseOnBlur;
    }
    if (data.pauseOnOutsideViewport !== void 0) {
      this.pauseOnOutsideViewport = data.pauseOnOutsideViewport;
    }
    if (data.zLayers !== void 0) {
      this.zLayers = data.zLayers;
    }
    this.background.load(data.background);
    const fullScreen = data.fullScreen;
    if (isBoolean(fullScreen)) {
      this.fullScreen.enable = fullScreen;
    } else {
      this.fullScreen.load(fullScreen);
    }
    this.backgroundMask.load(data.backgroundMask);
    this.interactivity.load(data.interactivity);
    if (data.manualParticles) {
      this.manualParticles = data.manualParticles.map((t) => {
        const tmp = new ManualParticle();
        tmp.load(t);
        return tmp;
      });
    }
    this.particles.load(data.particles);
    this.style = deepExtend(this.style, data.style);
    this._engine.loadOptions(this, data);
    if (data.smooth !== void 0) {
      this.smooth = data.smooth;
    }
    const interactors = this._engine.interactors.get(this._container);
    if (interactors) {
      for (const interactor of interactors) {
        if (interactor.loadOptions) {
          interactor.loadOptions(this, data);
        }
      }
    }
    if (data.responsive !== void 0) {
      for (const responsive of data.responsive) {
        const optResponsive = new Responsive();
        optResponsive.load(responsive);
        this.responsive.push(optResponsive);
      }
    }
    this.responsive.sort((a, b) => a.maxWidth - b.maxWidth);
    if (data.themes !== void 0) {
      for (const theme of data.themes) {
        const existingTheme = this.themes.find((t) => t.name === theme.name);
        if (!existingTheme) {
          const optTheme = new Theme();
          optTheme.load(theme);
          this.themes.push(optTheme);
        } else {
          existingTheme.load(theme);
        }
      }
    }
    this.defaultThemes.dark = (_a = this._findDefaultTheme(ThemeMode.dark)) == null ? void 0 : _a.name;
    this.defaultThemes.light = (_b = this._findDefaultTheme(ThemeMode.light)) == null ? void 0 : _b.name;
  }
  setResponsive(width, pxRatio, defaultOptions) {
    this.load(defaultOptions);
    const responsiveOptions = this.responsive.find((t) => t.mode === ResponsiveMode.screen && screen ? t.maxWidth > screen.availWidth : t.maxWidth * pxRatio > width);
    this.load(responsiveOptions == null ? void 0 : responsiveOptions.options);
    return responsiveOptions == null ? void 0 : responsiveOptions.maxWidth;
  }
  setTheme(name) {
    if (name) {
      const chosenTheme = this.themes.find((theme) => theme.name === name);
      if (chosenTheme) {
        this.load(chosenTheme.options);
      }
    } else {
      const mediaMatch = safeMatchMedia("(prefers-color-scheme: dark)"), clientDarkMode = mediaMatch == null ? void 0 : mediaMatch.matches, defaultTheme = this._findDefaultTheme(clientDarkMode ? ThemeMode.dark : ThemeMode.light);
      if (defaultTheme) {
        this.load(defaultTheme.options);
      }
    }
  }
};

// node_modules/@tsparticles/engine/browser/Enums/Types/InteractorType.js
var InteractorType;
(function(InteractorType2) {
  InteractorType2["external"] = "external";
  InteractorType2["particles"] = "particles";
})(InteractorType || (InteractorType = {}));

// node_modules/@tsparticles/engine/browser/Core/Utils/InteractionManager.js
var InteractionManager = class {
  constructor(engine, container) {
    this.container = container;
    this._engine = engine;
    this._interactors = [];
    this._externalInteractors = [];
    this._particleInteractors = [];
  }
  externalInteract(delta) {
    for (const interactor of this._externalInteractors) {
      if (interactor.isEnabled()) {
        interactor.interact(delta);
      }
    }
  }
  handleClickMode(mode) {
    var _a;
    for (const interactor of this._externalInteractors) {
      (_a = interactor.handleClickMode) == null ? void 0 : _a.call(interactor, mode);
    }
  }
  async init() {
    this._interactors = await this._engine.getInteractors(this.container, true);
    this._externalInteractors = [];
    this._particleInteractors = [];
    for (const interactor of this._interactors) {
      switch (interactor.type) {
        case InteractorType.external:
          this._externalInteractors.push(interactor);
          break;
        case InteractorType.particles:
          this._particleInteractors.push(interactor);
          break;
      }
      interactor.init();
    }
  }
  particlesInteract(particle, delta) {
    for (const interactor of this._externalInteractors) {
      interactor.clear(particle, delta);
    }
    for (const interactor of this._particleInteractors) {
      if (interactor.isEnabled(particle)) {
        interactor.interact(particle, delta);
      }
    }
  }
  reset(particle) {
    for (const interactor of this._externalInteractors) {
      if (interactor.isEnabled()) {
        interactor.reset(particle);
      }
    }
    for (const interactor of this._particleInteractors) {
      if (interactor.isEnabled(particle)) {
        interactor.reset(particle);
      }
    }
  }
};

// node_modules/@tsparticles/engine/browser/Enums/Types/ParticleOutType.js
var ParticleOutType;
(function(ParticleOutType2) {
  ParticleOutType2["normal"] = "normal";
  ParticleOutType2["inside"] = "inside";
  ParticleOutType2["outside"] = "outside";
})(ParticleOutType || (ParticleOutType = {}));

// node_modules/@tsparticles/engine/browser/Core/Particle.js
function loadEffectData(effect, effectOptions, id, reduceDuplicates) {
  const effectData = effectOptions.options[effect];
  if (!effectData) {
    return;
  }
  return deepExtend({
    close: effectOptions.close,
    fill: effectOptions.fill
  }, itemFromSingleOrMultiple(effectData, id, reduceDuplicates));
}
function loadShapeData(shape, shapeOptions, id, reduceDuplicates) {
  const shapeData = shapeOptions.options[shape];
  if (!shapeData) {
    return;
  }
  return deepExtend({
    close: shapeOptions.close,
    fill: shapeOptions.fill
  }, itemFromSingleOrMultiple(shapeData, id, reduceDuplicates));
}
function fixOutMode(data) {
  if (!isInArray(data.outMode, data.checkModes)) {
    return;
  }
  const diameter = data.radius * double;
  if (data.coord > data.maxCoord - diameter) {
    data.setCb(-data.radius);
  } else if (data.coord < diameter) {
    data.setCb(data.radius);
  }
}
var Particle = class {
  constructor(engine, container) {
    this.container = container;
    this._calcPosition = (container2, position, zIndex, tryCount = defaultRetryCount) => {
      for (const plugin of container2.plugins.values()) {
        const pluginPos = plugin.particlePosition !== void 0 ? plugin.particlePosition(position, this) : void 0;
        if (pluginPos) {
          return Vector3d.create(pluginPos.x, pluginPos.y, zIndex);
        }
      }
      const canvasSize = container2.canvas.size, exactPosition = calcExactPositionOrRandomFromSize({
        size: canvasSize,
        position
      }), pos = Vector3d.create(exactPosition.x, exactPosition.y, zIndex), radius = this.getRadius(), outModes = this.options.move.outModes, fixHorizontal = (outMode) => {
        fixOutMode({
          outMode,
          checkModes: [OutMode.bounce],
          coord: pos.x,
          maxCoord: container2.canvas.size.width,
          setCb: (value) => pos.x += value,
          radius
        });
      }, fixVertical = (outMode) => {
        fixOutMode({
          outMode,
          checkModes: [OutMode.bounce],
          coord: pos.y,
          maxCoord: container2.canvas.size.height,
          setCb: (value) => pos.y += value,
          radius
        });
      };
      fixHorizontal(outModes.left ?? outModes.default);
      fixHorizontal(outModes.right ?? outModes.default);
      fixVertical(outModes.top ?? outModes.default);
      fixVertical(outModes.bottom ?? outModes.default);
      if (this._checkOverlap(pos, tryCount)) {
        return this._calcPosition(container2, void 0, zIndex, tryCount + tryCountIncrement);
      }
      return pos;
    };
    this._calculateVelocity = () => {
      const baseVelocity = getParticleBaseVelocity(this.direction), res = baseVelocity.copy(), moveOptions = this.options.move;
      if (moveOptions.direction === MoveDirection.inside || moveOptions.direction === MoveDirection.outside) {
        return res;
      }
      const rad = degToRad(getRangeValue(moveOptions.angle.value)), radOffset = degToRad(getRangeValue(moveOptions.angle.offset)), range = {
        left: radOffset - rad * half,
        right: radOffset + rad * half
      };
      if (!moveOptions.straight) {
        res.angle += randomInRange(setRangeValue(range.left, range.right));
      }
      if (moveOptions.random && typeof moveOptions.speed === "number") {
        res.length *= getRandom();
      }
      return res;
    };
    this._checkOverlap = (pos, tryCount = defaultRetryCount) => {
      const collisionsOptions = this.options.collisions, radius = this.getRadius();
      if (!collisionsOptions.enable) {
        return false;
      }
      const overlapOptions = collisionsOptions.overlap;
      if (overlapOptions.enable) {
        return false;
      }
      const retries = overlapOptions.retries;
      if (retries >= minRetries && tryCount > retries) {
        throw new Error(`${errorPrefix} particle is overlapping and can't be placed`);
      }
      return !!this.container.particles.find((particle) => getDistance(pos, particle.position) < radius + particle.getRadius());
    };
    this._getRollColor = (color) => {
      if (!color || !this.roll || !this.backColor && !this.roll.alter) {
        return color;
      }
      const backFactor = this.roll.horizontal && this.roll.vertical ? double * rollFactor : rollFactor, backSum = this.roll.horizontal ? Math.PI * half : none, rolled = Math.floor(((this.roll.angle ?? none) + backSum) / (Math.PI / backFactor)) % double;
      if (!rolled) {
        return color;
      }
      if (this.backColor) {
        return this.backColor;
      }
      if (this.roll.alter) {
        return alterHsl(color, this.roll.alter.type, this.roll.alter.value);
      }
      return color;
    };
    this._initPosition = (position) => {
      const container2 = this.container, zIndexValue = getRangeValue(this.options.zIndex.value);
      this.position = this._calcPosition(container2, position, clamp(zIndexValue, minZ, container2.zLayers));
      this.initialPosition = this.position.copy();
      const canvasSize = container2.canvas.size;
      this.moveCenter = {
        ...getPosition(this.options.move.center, canvasSize),
        radius: this.options.move.center.radius ?? defaultRadius,
        mode: this.options.move.center.mode ?? PixelMode.percent
      };
      this.direction = getParticleDirectionAngle(this.options.move.direction, this.position, this.moveCenter);
      switch (this.options.move.direction) {
        case MoveDirection.inside:
          this.outType = ParticleOutType.inside;
          break;
        case MoveDirection.outside:
          this.outType = ParticleOutType.outside;
          break;
      }
      this.offset = Vector.origin;
    };
    this._engine = engine;
  }
  destroy(override) {
    var _a, _b, _c;
    if (this.unbreakable || this.destroyed) {
      return;
    }
    this.destroyed = true;
    this.bubble.inRange = false;
    this.slow.inRange = false;
    const container = this.container, pathGenerator = this.pathGenerator, shapeDrawer = container.shapeDrawers.get(this.shape);
    (_a = shapeDrawer == null ? void 0 : shapeDrawer.particleDestroy) == null ? void 0 : _a.call(shapeDrawer, this);
    for (const plugin of container.plugins.values()) {
      (_b = plugin.particleDestroyed) == null ? void 0 : _b.call(plugin, this, override);
    }
    for (const updater of container.particles.updaters) {
      (_c = updater.particleDestroyed) == null ? void 0 : _c.call(updater, this, override);
    }
    pathGenerator == null ? void 0 : pathGenerator.reset(this);
    this._engine.dispatchEvent(EventType.particleDestroyed, {
      container: this.container,
      data: {
        particle: this
      }
    });
  }
  draw(delta) {
    const container = this.container, canvas = container.canvas;
    for (const plugin of container.plugins.values()) {
      canvas.drawParticlePlugin(plugin, this, delta);
    }
    canvas.drawParticle(this, delta);
  }
  getFillColor() {
    return this._getRollColor(this.bubble.color ?? getHslFromAnimation(this.color));
  }
  getMass() {
    return this.getRadius() ** squareExp * Math.PI * half;
  }
  getPosition() {
    return {
      x: this.position.x + this.offset.x,
      y: this.position.y + this.offset.y,
      z: this.position.z
    };
  }
  getRadius() {
    return this.bubble.radius ?? this.size.value;
  }
  getStrokeColor() {
    return this._getRollColor(this.bubble.color ?? getHslFromAnimation(this.strokeColor));
  }
  init(id, position, overrideOptions, group) {
    var _a, _b, _c, _d, _e, _f;
    const container = this.container, engine = this._engine;
    this.id = id;
    this.group = group;
    this.effectClose = true;
    this.effectFill = true;
    this.shapeClose = true;
    this.shapeFill = true;
    this.pathRotation = false;
    this.lastPathTime = 0;
    this.destroyed = false;
    this.unbreakable = false;
    this.isRotating = false;
    this.rotation = 0;
    this.misplaced = false;
    this.retina = {
      maxDistance: {}
    };
    this.outType = ParticleOutType.normal;
    this.ignoresResizeRatio = true;
    const pxRatio = container.retina.pixelRatio, mainOptions = container.actualOptions, particlesOptions = loadParticlesOptions(this._engine, container, mainOptions.particles), { reduceDuplicates } = particlesOptions, effectType = particlesOptions.effect.type, shapeType = particlesOptions.shape.type;
    this.effect = itemFromSingleOrMultiple(effectType, this.id, reduceDuplicates);
    this.shape = itemFromSingleOrMultiple(shapeType, this.id, reduceDuplicates);
    const effectOptions = particlesOptions.effect, shapeOptions = particlesOptions.shape;
    if (overrideOptions) {
      if ((_a = overrideOptions.effect) == null ? void 0 : _a.type) {
        const overrideEffectType = overrideOptions.effect.type, effect = itemFromSingleOrMultiple(overrideEffectType, this.id, reduceDuplicates);
        if (effect) {
          this.effect = effect;
          effectOptions.load(overrideOptions.effect);
        }
      }
      if ((_b = overrideOptions.shape) == null ? void 0 : _b.type) {
        const overrideShapeType = overrideOptions.shape.type, shape = itemFromSingleOrMultiple(overrideShapeType, this.id, reduceDuplicates);
        if (shape) {
          this.shape = shape;
          shapeOptions.load(overrideOptions.shape);
        }
      }
    }
    if (this.effect === randomColorValue) {
      const availableEffects = [...this.container.effectDrawers.keys()];
      this.effect = availableEffects[Math.floor(Math.random() * availableEffects.length)];
    }
    if (this.shape === randomColorValue) {
      const availableShapes = [...this.container.shapeDrawers.keys()];
      this.shape = availableShapes[Math.floor(Math.random() * availableShapes.length)];
    }
    this.effectData = loadEffectData(this.effect, effectOptions, this.id, reduceDuplicates);
    this.shapeData = loadShapeData(this.shape, shapeOptions, this.id, reduceDuplicates);
    particlesOptions.load(overrideOptions);
    const effectData = this.effectData;
    if (effectData) {
      particlesOptions.load(effectData.particles);
    }
    const shapeData = this.shapeData;
    if (shapeData) {
      particlesOptions.load(shapeData.particles);
    }
    const interactivity = new Interactivity(engine, container);
    interactivity.load(container.actualOptions.interactivity);
    interactivity.load(particlesOptions.interactivity);
    this.interactivity = interactivity;
    this.effectFill = (effectData == null ? void 0 : effectData.fill) ?? particlesOptions.effect.fill;
    this.effectClose = (effectData == null ? void 0 : effectData.close) ?? particlesOptions.effect.close;
    this.shapeFill = (shapeData == null ? void 0 : shapeData.fill) ?? particlesOptions.shape.fill;
    this.shapeClose = (shapeData == null ? void 0 : shapeData.close) ?? particlesOptions.shape.close;
    this.options = particlesOptions;
    const pathOptions = this.options.move.path;
    this.pathDelay = getRangeValue(pathOptions.delay.value) * millisecondsToSeconds;
    if (pathOptions.generator) {
      this.pathGenerator = this._engine.getPathGenerator(pathOptions.generator);
      if (this.pathGenerator && container.addPath(pathOptions.generator, this.pathGenerator)) {
        this.pathGenerator.init(container);
      }
    }
    container.retina.initParticle(this);
    this.size = initParticleNumericAnimationValue(this.options.size, pxRatio);
    this.bubble = {
      inRange: false
    };
    this.slow = {
      inRange: false,
      factor: 1
    };
    this._initPosition(position);
    this.initialVelocity = this._calculateVelocity();
    this.velocity = this.initialVelocity.copy();
    this.moveDecay = decayOffset - getRangeValue(this.options.move.decay);
    const particles = container.particles;
    particles.setLastZIndex(this.position.z);
    this.zIndexFactor = this.position.z / container.zLayers;
    this.sides = 24;
    let effectDrawer = container.effectDrawers.get(this.effect);
    if (!effectDrawer) {
      effectDrawer = this._engine.getEffectDrawer(this.effect);
      if (effectDrawer) {
        container.effectDrawers.set(this.effect, effectDrawer);
      }
    }
    if (effectDrawer == null ? void 0 : effectDrawer.loadEffect) {
      effectDrawer.loadEffect(this);
    }
    let shapeDrawer = container.shapeDrawers.get(this.shape);
    if (!shapeDrawer) {
      shapeDrawer = this._engine.getShapeDrawer(this.shape);
      if (shapeDrawer) {
        container.shapeDrawers.set(this.shape, shapeDrawer);
      }
    }
    if (shapeDrawer == null ? void 0 : shapeDrawer.loadShape) {
      shapeDrawer.loadShape(this);
    }
    const sideCountFunc = shapeDrawer == null ? void 0 : shapeDrawer.getSidesCount;
    if (sideCountFunc) {
      this.sides = sideCountFunc(this);
    }
    this.spawning = false;
    this.shadowColor = rangeColorToRgb(this._engine, this.options.shadow.color);
    for (const updater of particles.updaters) {
      updater.init(this);
    }
    for (const mover of particles.movers) {
      (_c = mover.init) == null ? void 0 : _c.call(mover, this);
    }
    (_d = effectDrawer == null ? void 0 : effectDrawer.particleInit) == null ? void 0 : _d.call(effectDrawer, container, this);
    (_e = shapeDrawer == null ? void 0 : shapeDrawer.particleInit) == null ? void 0 : _e.call(shapeDrawer, container, this);
    for (const plugin of container.plugins.values()) {
      (_f = plugin.particleCreated) == null ? void 0 : _f.call(plugin, this);
    }
  }
  isInsideCanvas() {
    const radius = this.getRadius(), canvasSize = this.container.canvas.size, position = this.position;
    return position.x >= -radius && position.y >= -radius && position.y <= canvasSize.height + radius && position.x <= canvasSize.width + radius;
  }
  isVisible() {
    return !this.destroyed && !this.spawning && this.isInsideCanvas();
  }
  reset() {
    var _a;
    for (const updater of this.container.particles.updaters) {
      (_a = updater.reset) == null ? void 0 : _a.call(updater, this);
    }
  }
};

// node_modules/@tsparticles/engine/browser/Core/Utils/Point.js
var Point = class {
  constructor(position, particle) {
    this.position = position;
    this.particle = particle;
  }
};

// node_modules/@tsparticles/engine/browser/Types/RangeType.js
var RangeType;
(function(RangeType2) {
  RangeType2["circle"] = "circle";
  RangeType2["rectangle"] = "rectangle";
})(RangeType || (RangeType = {}));

// node_modules/@tsparticles/engine/browser/Core/Utils/Ranges.js
var BaseRange = class {
  constructor(x, y, type) {
    this.position = {
      x,
      y
    };
    this.type = type;
  }
};
var Circle = class _Circle extends BaseRange {
  constructor(x, y, radius) {
    super(x, y, RangeType.circle);
    this.radius = radius;
  }
  contains(point) {
    return getDistance(point, this.position) <= this.radius;
  }
  intersects(range) {
    const pos1 = this.position, pos2 = range.position, distPos = { x: Math.abs(pos2.x - pos1.x), y: Math.abs(pos2.y - pos1.y) }, r = this.radius;
    if (range instanceof _Circle || range.type === RangeType.circle) {
      const circleRange = range, rSum = r + circleRange.radius, dist = Math.sqrt(distPos.x ** squareExp + distPos.y ** squareExp);
      return rSum > dist;
    } else if (range instanceof Rectangle || range.type === RangeType.rectangle) {
      const rectRange = range, { width, height } = rectRange.size, edges = Math.pow(distPos.x - width, squareExp) + Math.pow(distPos.y - height, squareExp);
      return edges <= r ** squareExp || distPos.x <= r + width && distPos.y <= r + height || distPos.x <= width || distPos.y <= height;
    }
    return false;
  }
};
var Rectangle = class _Rectangle extends BaseRange {
  constructor(x, y, width, height) {
    super(x, y, RangeType.rectangle);
    this.size = {
      height,
      width
    };
  }
  contains(point) {
    const w = this.size.width, h = this.size.height, pos = this.position;
    return point.x >= pos.x && point.x <= pos.x + w && point.y >= pos.y && point.y <= pos.y + h;
  }
  intersects(range) {
    if (range instanceof Circle) {
      return range.intersects(this);
    }
    const w = this.size.width, h = this.size.height, pos1 = this.position, pos2 = range.position, size2 = range instanceof _Rectangle ? range.size : { width: 0, height: 0 }, w2 = size2.width, h2 = size2.height;
    return pos2.x < pos1.x + w && pos2.x + w2 > pos1.x && pos2.y < pos1.y + h && pos2.y + h2 > pos1.y;
  }
};

// node_modules/@tsparticles/engine/browser/Core/Utils/QuadTree.js
var QuadTree = class _QuadTree {
  constructor(rectangle, capacity) {
    this.rectangle = rectangle;
    this.capacity = capacity;
    this._subdivide = () => {
      const { x, y } = this.rectangle.position, { width, height } = this.rectangle.size, { capacity: capacity2 } = this;
      for (let i = 0; i < subdivideCount; i++) {
        const fixedIndex = i % double;
        this._subs.push(new _QuadTree(new Rectangle(x + width * half * fixedIndex, y + height * half * (Math.round(i * half) - fixedIndex), width * half, height * half), capacity2));
      }
      this._divided = true;
    };
    this._points = [];
    this._divided = false;
    this._subs = [];
  }
  insert(point) {
    if (!this.rectangle.contains(point.position)) {
      return false;
    }
    if (this._points.length < this.capacity) {
      this._points.push(point);
      return true;
    }
    if (!this._divided) {
      this._subdivide();
    }
    return this._subs.some((sub) => sub.insert(point));
  }
  query(range, check) {
    const res = [];
    if (!range.intersects(this.rectangle)) {
      return [];
    }
    for (const p of this._points) {
      if (!range.contains(p.position) && getDistance(range.position, p.position) > p.particle.getRadius() && (!check || check(p.particle))) {
        continue;
      }
      res.push(p.particle);
    }
    if (this._divided) {
      for (const sub of this._subs) {
        res.push(...sub.query(range, check));
      }
    }
    return res;
  }
  queryCircle(position, radius, check) {
    return this.query(new Circle(position.x, position.y, radius), check);
  }
  queryRectangle(position, size, check) {
    return this.query(new Rectangle(position.x, position.y, size.width, size.height), check);
  }
};

// node_modules/@tsparticles/engine/browser/Core/Particles.js
var qTreeRectangle = (canvasSize) => {
  const { height, width } = canvasSize;
  return new Rectangle(posOffset * width, posOffset * height, sizeFactor * width, sizeFactor * height);
};
var Particles = class {
  constructor(engine, container) {
    this._addToPool = (...particles) => {
      this._pool.push(...particles);
    };
    this._applyDensity = (options, manualCount2, group) => {
      var _a;
      const numberOptions = options.number;
      if (!((_a = options.number.density) == null ? void 0 : _a.enable)) {
        if (group === void 0) {
          this._limit = numberOptions.limit.value;
        } else if (numberOptions.limit) {
          this._groupLimits.set(group, numberOptions.limit.value);
        }
        return;
      }
      const densityFactor = this._initDensityFactor(numberOptions.density), optParticlesNumber = numberOptions.value, optParticlesLimit = numberOptions.limit.value > minLimit ? numberOptions.limit.value : optParticlesNumber, particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * densityFactor + manualCount2, particlesCount = Math.min(this.count, this.filter((t) => t.group === group).length);
      if (group === void 0) {
        this._limit = numberOptions.limit.value * densityFactor;
      } else {
        this._groupLimits.set(group, numberOptions.limit.value * densityFactor);
      }
      if (particlesCount < particlesNumber) {
        this.push(Math.abs(particlesNumber - particlesCount), void 0, options, group);
      } else if (particlesCount > particlesNumber) {
        this.removeQuantity(particlesCount - particlesNumber, group);
      }
    };
    this._initDensityFactor = (densityOptions) => {
      const container2 = this._container;
      if (!container2.canvas.element || !densityOptions.enable) {
        return defaultDensityFactor;
      }
      const canvas = container2.canvas.element, pxRatio = container2.retina.pixelRatio;
      return canvas.width * canvas.height / (densityOptions.height * densityOptions.width * pxRatio ** squareExp);
    };
    this._pushParticle = (position, overrideOptions, group, initializer) => {
      try {
        let particle = this._pool.pop();
        if (!particle) {
          particle = new Particle(this._engine, this._container);
        }
        particle.init(this._nextId, position, overrideOptions, group);
        let canAdd = true;
        if (initializer) {
          canAdd = initializer(particle);
        }
        if (!canAdd) {
          return;
        }
        this._array.push(particle);
        this._zArray.push(particle);
        this._nextId++;
        this._engine.dispatchEvent(EventType.particleAdded, {
          container: this._container,
          data: {
            particle
          }
        });
        return particle;
      } catch (e) {
        getLogger().warning(`${errorPrefix} adding particle: ${e}`);
      }
    };
    this._removeParticle = (index, group, override) => {
      const particle = this._array[index];
      if (!particle || particle.group !== group) {
        return false;
      }
      const zIdx = this._zArray.indexOf(particle);
      this._array.splice(index, deleteCount);
      this._zArray.splice(zIdx, deleteCount);
      particle.destroy(override);
      this._engine.dispatchEvent(EventType.particleRemoved, {
        container: this._container,
        data: {
          particle
        }
      });
      this._addToPool(particle);
      return true;
    };
    this._engine = engine;
    this._container = container;
    this._nextId = 0;
    this._array = [];
    this._zArray = [];
    this._pool = [];
    this._limit = 0;
    this._groupLimits = /* @__PURE__ */ new Map();
    this._needsSort = false;
    this._lastZIndex = 0;
    this._interactionManager = new InteractionManager(engine, container);
    this._pluginsInitialized = false;
    const canvasSize = container.canvas.size;
    this.quadTree = new QuadTree(qTreeRectangle(canvasSize), qTreeCapacity);
    this.movers = [];
    this.updaters = [];
  }
  get count() {
    return this._array.length;
  }
  addManualParticles() {
    const container = this._container, options = container.actualOptions;
    options.manualParticles.forEach((p) => this.addParticle(p.position ? getPosition(p.position, container.canvas.size) : void 0, p.options));
  }
  addParticle(position, overrideOptions, group, initializer) {
    const limitMode = this._container.actualOptions.particles.number.limit.mode, limit = group === void 0 ? this._limit : this._groupLimits.get(group) ?? this._limit, currentCount = this.count;
    if (limit > minLimit) {
      switch (limitMode) {
        case LimitMode.delete: {
          const countToRemove = currentCount + countOffset - limit;
          if (countToRemove > minCount) {
            this.removeQuantity(countToRemove);
          }
          break;
        }
        case LimitMode.wait:
          if (currentCount >= limit) {
            return;
          }
          break;
      }
    }
    return this._pushParticle(position, overrideOptions, group, initializer);
  }
  clear() {
    this._array = [];
    this._zArray = [];
    this._pluginsInitialized = false;
  }
  destroy() {
    this._array = [];
    this._zArray = [];
    this.movers = [];
    this.updaters = [];
  }
  draw(delta) {
    const container = this._container, canvas = container.canvas;
    canvas.clear();
    this.update(delta);
    for (const plugin of container.plugins.values()) {
      canvas.drawPlugin(plugin, delta);
    }
    for (const p of this._zArray) {
      p.draw(delta);
    }
  }
  filter(condition) {
    return this._array.filter(condition);
  }
  find(condition) {
    return this._array.find(condition);
  }
  get(index) {
    return this._array[index];
  }
  handleClickMode(mode) {
    this._interactionManager.handleClickMode(mode);
  }
  async init() {
    var _a, _b;
    const container = this._container, options = container.actualOptions;
    this._lastZIndex = 0;
    this._needsSort = false;
    await this.initPlugins();
    let handled = false;
    for (const plugin of container.plugins.values()) {
      handled = ((_a = plugin.particlesInitialization) == null ? void 0 : _a.call(plugin)) ?? handled;
      if (handled) {
        break;
      }
    }
    this.addManualParticles();
    if (!handled) {
      const particlesOptions = options.particles, groups = particlesOptions.groups;
      for (const group in groups) {
        const groupOptions = groups[group];
        for (let i = this.count, j = 0; j < ((_b = groupOptions.number) == null ? void 0 : _b.value) && i < particlesOptions.number.value; i++, j++) {
          this.addParticle(void 0, groupOptions, group);
        }
      }
      for (let i = this.count; i < particlesOptions.number.value; i++) {
        this.addParticle();
      }
    }
  }
  async initPlugins() {
    if (this._pluginsInitialized) {
      return;
    }
    const container = this._container;
    this.movers = await this._engine.getMovers(container, true);
    this.updaters = await this._engine.getUpdaters(container, true);
    await this._interactionManager.init();
    for (const pathGenerator of container.pathGenerators.values()) {
      pathGenerator.init(container);
    }
  }
  push(nb, mouse, overrideOptions, group) {
    for (let i = 0; i < nb; i++) {
      this.addParticle(mouse == null ? void 0 : mouse.position, overrideOptions, group);
    }
  }
  async redraw() {
    this.clear();
    await this.init();
    this.draw({ value: 0, factor: 0 });
  }
  remove(particle, group, override) {
    this.removeAt(this._array.indexOf(particle), void 0, group, override);
  }
  removeAt(index, quantity = defaultRemoveQuantity, group, override) {
    if (index < minIndex || index > this.count) {
      return;
    }
    let deleted = 0;
    for (let i = index; deleted < quantity && i < this.count; i++) {
      if (this._removeParticle(i, group, override)) {
        i--;
        deleted++;
      }
    }
  }
  removeQuantity(quantity, group) {
    this.removeAt(minIndex, quantity, group);
  }
  setDensity() {
    const options = this._container.actualOptions, groups = options.particles.groups;
    for (const group in groups) {
      this._applyDensity(groups[group], manualCount, group);
    }
    this._applyDensity(options.particles, options.manualParticles.length);
  }
  setLastZIndex(zIndex) {
    this._lastZIndex = zIndex;
    this._needsSort = this._needsSort || this._lastZIndex < zIndex;
  }
  setResizeFactor(factor) {
    this._resizeFactor = factor;
  }
  update(delta) {
    var _a, _b;
    const container = this._container, particlesToDelete = /* @__PURE__ */ new Set();
    this.quadTree = new QuadTree(qTreeRectangle(container.canvas.size), qTreeCapacity);
    for (const pathGenerator of container.pathGenerators.values()) {
      pathGenerator.update();
    }
    for (const plugin of container.plugins.values()) {
      (_a = plugin.update) == null ? void 0 : _a.call(plugin, delta);
    }
    const resizeFactor = this._resizeFactor;
    for (const particle of this._array) {
      if (resizeFactor && !particle.ignoresResizeRatio) {
        particle.position.x *= resizeFactor.width;
        particle.position.y *= resizeFactor.height;
        particle.initialPosition.x *= resizeFactor.width;
        particle.initialPosition.y *= resizeFactor.height;
      }
      particle.ignoresResizeRatio = false;
      this._interactionManager.reset(particle);
      for (const plugin of this._container.plugins.values()) {
        if (particle.destroyed) {
          break;
        }
        (_b = plugin.particleUpdate) == null ? void 0 : _b.call(plugin, particle, delta);
      }
      for (const mover of this.movers) {
        if (mover.isEnabled(particle)) {
          mover.move(particle, delta);
        }
      }
      if (particle.destroyed) {
        particlesToDelete.add(particle);
        continue;
      }
      this.quadTree.insert(new Point(particle.getPosition(), particle));
    }
    if (particlesToDelete.size) {
      const checkDelete = (p) => !particlesToDelete.has(p);
      this._array = this.filter(checkDelete);
      this._zArray = this._zArray.filter(checkDelete);
      for (const particle of particlesToDelete) {
        this._engine.dispatchEvent(EventType.particleRemoved, {
          container: this._container,
          data: {
            particle
          }
        });
      }
      this._addToPool(...particlesToDelete);
    }
    this._interactionManager.externalInteract(delta);
    for (const particle of this._array) {
      for (const updater of this.updaters) {
        updater.update(particle, delta);
      }
      if (!particle.destroyed && !particle.spawning) {
        this._interactionManager.particlesInteract(particle, delta);
      }
    }
    delete this._resizeFactor;
    if (this._needsSort) {
      const zArray = this._zArray;
      zArray.sort((a, b) => b.position.z - a.position.z || a.id - b.id);
      this._lastZIndex = zArray[zArray.length - lengthOffset].position.z;
      this._needsSort = false;
    }
  }
};

// node_modules/@tsparticles/engine/browser/Core/Retina.js
var Retina = class {
  constructor(container) {
    this.container = container;
    this.pixelRatio = defaultRatio;
    this.reduceFactor = defaultReduceFactor;
  }
  init() {
    const container = this.container, options = container.actualOptions;
    this.pixelRatio = !options.detectRetina || isSsr() ? defaultRatio : window.devicePixelRatio;
    this.reduceFactor = defaultReduceFactor;
    const ratio = this.pixelRatio, canvas = container.canvas;
    if (canvas.element) {
      const element = canvas.element;
      canvas.size.width = element.offsetWidth * ratio;
      canvas.size.height = element.offsetHeight * ratio;
    }
    const particles = options.particles, moveOptions = particles.move;
    this.maxSpeed = getRangeValue(moveOptions.gravity.maxSpeed) * ratio;
    this.sizeAnimationSpeed = getRangeValue(particles.size.animation.speed) * ratio;
  }
  initParticle(particle) {
    const options = particle.options, ratio = this.pixelRatio, moveOptions = options.move, moveDistance = moveOptions.distance, props = particle.retina;
    props.moveDrift = getRangeValue(moveOptions.drift) * ratio;
    props.moveSpeed = getRangeValue(moveOptions.speed) * ratio;
    props.sizeAnimationSpeed = getRangeValue(options.size.animation.speed) * ratio;
    const maxDistance = props.maxDistance;
    maxDistance.horizontal = moveDistance.horizontal !== void 0 ? moveDistance.horizontal * ratio : void 0;
    maxDistance.vertical = moveDistance.vertical !== void 0 ? moveDistance.vertical * ratio : void 0;
    props.maxSpeed = getRangeValue(moveOptions.gravity.maxSpeed) * ratio;
  }
};

// node_modules/@tsparticles/engine/browser/Core/Container.js
function guardCheck(container) {
  return container && !container.destroyed;
}
function initDelta(value, fpsLimit = defaultFps, smooth = false) {
  return {
    value,
    factor: smooth ? defaultFps / fpsLimit : defaultFps * value / millisecondsToSeconds
  };
}
function loadContainerOptions(engine, container, ...sourceOptionsArr) {
  const options = new Options(engine, container);
  loadOptions(options, ...sourceOptionsArr);
  return options;
}
var Container = class {
  constructor(engine, id, sourceOptions) {
    this._intersectionManager = (entries) => {
      if (!guardCheck(this) || !this.actualOptions.pauseOnOutsideViewport) {
        return;
      }
      for (const entry of entries) {
        if (entry.target !== this.interactivity.element) {
          continue;
        }
        if (entry.isIntersecting) {
          void this.play();
        } else {
          this.pause();
        }
      }
    };
    this._nextFrame = (timestamp) => {
      try {
        if (!this._smooth && this._lastFrameTime !== void 0 && timestamp < this._lastFrameTime + millisecondsToSeconds / this.fpsLimit) {
          this.draw(false);
          return;
        }
        this._lastFrameTime ?? (this._lastFrameTime = timestamp);
        const delta = initDelta(timestamp - this._lastFrameTime, this.fpsLimit, this._smooth);
        this.addLifeTime(delta.value);
        this._lastFrameTime = timestamp;
        if (delta.value > millisecondsToSeconds) {
          this.draw(false);
          return;
        }
        this.particles.draw(delta);
        if (!this.alive()) {
          this.destroy();
          return;
        }
        if (this.animationStatus) {
          this.draw(false);
        }
      } catch (e) {
        getLogger().error(`${errorPrefix} in animation loop`, e);
      }
    };
    this._engine = engine;
    this.id = Symbol(id);
    this.fpsLimit = 120;
    this._smooth = false;
    this._delay = 0;
    this._duration = 0;
    this._lifeTime = 0;
    this._firstStart = true;
    this.started = false;
    this.destroyed = false;
    this._paused = true;
    this._lastFrameTime = 0;
    this.zLayers = 100;
    this.pageHidden = false;
    this._clickHandlers = /* @__PURE__ */ new Map();
    this._sourceOptions = sourceOptions;
    this._initialSourceOptions = sourceOptions;
    this.retina = new Retina(this);
    this.canvas = new Canvas(this, this._engine);
    this.particles = new Particles(this._engine, this);
    this.pathGenerators = /* @__PURE__ */ new Map();
    this.interactivity = {
      mouse: {
        clicking: false,
        inside: false
      }
    };
    this.plugins = /* @__PURE__ */ new Map();
    this.effectDrawers = /* @__PURE__ */ new Map();
    this.shapeDrawers = /* @__PURE__ */ new Map();
    this._options = loadContainerOptions(this._engine, this);
    this.actualOptions = loadContainerOptions(this._engine, this);
    this._eventListeners = new EventListeners(this);
    this._intersectionObserver = safeIntersectionObserver((entries) => this._intersectionManager(entries));
    this._engine.dispatchEvent(EventType.containerBuilt, { container: this });
  }
  get animationStatus() {
    return !this._paused && !this.pageHidden && guardCheck(this);
  }
  get options() {
    return this._options;
  }
  get sourceOptions() {
    return this._sourceOptions;
  }
  addClickHandler(callback) {
    if (!guardCheck(this)) {
      return;
    }
    const el = this.interactivity.element;
    if (!el) {
      return;
    }
    const clickOrTouchHandler = (e, pos, radius) => {
      if (!guardCheck(this)) {
        return;
      }
      const pxRatio = this.retina.pixelRatio, posRetina = {
        x: pos.x * pxRatio,
        y: pos.y * pxRatio
      }, particles = this.particles.quadTree.queryCircle(posRetina, radius * pxRatio);
      callback(e, particles);
    }, clickHandler = (e) => {
      if (!guardCheck(this)) {
        return;
      }
      const mouseEvent = e, pos = {
        x: mouseEvent.offsetX || mouseEvent.clientX,
        y: mouseEvent.offsetY || mouseEvent.clientY
      };
      clickOrTouchHandler(e, pos, clickRadius);
    }, touchStartHandler = () => {
      if (!guardCheck(this)) {
        return;
      }
      touched = true;
      touchMoved = false;
    }, touchMoveHandler = () => {
      if (!guardCheck(this)) {
        return;
      }
      touchMoved = true;
    }, touchEndHandler = (e) => {
      if (!guardCheck(this)) {
        return;
      }
      if (touched && !touchMoved) {
        const touchEvent = e;
        let lastTouch = touchEvent.touches[touchEvent.touches.length - touchEndLengthOffset];
        if (!lastTouch) {
          lastTouch = touchEvent.changedTouches[touchEvent.changedTouches.length - touchEndLengthOffset];
          if (!lastTouch) {
            return;
          }
        }
        const element = this.canvas.element, canvasRect = element ? element.getBoundingClientRect() : void 0, pos = {
          x: lastTouch.clientX - (canvasRect ? canvasRect.left : minCoordinate),
          y: lastTouch.clientY - (canvasRect ? canvasRect.top : minCoordinate)
        };
        clickOrTouchHandler(e, pos, Math.max(lastTouch.radiusX, lastTouch.radiusY));
      }
      touched = false;
      touchMoved = false;
    }, touchCancelHandler = () => {
      if (!guardCheck(this)) {
        return;
      }
      touched = false;
      touchMoved = false;
    };
    let touched = false, touchMoved = false;
    this._clickHandlers.set("click", clickHandler);
    this._clickHandlers.set("touchstart", touchStartHandler);
    this._clickHandlers.set("touchmove", touchMoveHandler);
    this._clickHandlers.set("touchend", touchEndHandler);
    this._clickHandlers.set("touchcancel", touchCancelHandler);
    for (const [key, handler] of this._clickHandlers) {
      el.addEventListener(key, handler);
    }
  }
  addLifeTime(value) {
    this._lifeTime += value;
  }
  addPath(key, generator, override = false) {
    if (!guardCheck(this) || !override && this.pathGenerators.has(key)) {
      return false;
    }
    this.pathGenerators.set(key, generator);
    return true;
  }
  alive() {
    return !this._duration || this._lifeTime <= this._duration;
  }
  clearClickHandlers() {
    var _a;
    if (!guardCheck(this)) {
      return;
    }
    for (const [key, handler] of this._clickHandlers) {
      (_a = this.interactivity.element) == null ? void 0 : _a.removeEventListener(key, handler);
    }
    this._clickHandlers.clear();
  }
  destroy(remove = true) {
    var _a, _b;
    if (!guardCheck(this)) {
      return;
    }
    this.stop();
    this.clearClickHandlers();
    this.particles.destroy();
    this.canvas.destroy();
    for (const effectDrawer of this.effectDrawers.values()) {
      (_a = effectDrawer.destroy) == null ? void 0 : _a.call(effectDrawer, this);
    }
    for (const shapeDrawer of this.shapeDrawers.values()) {
      (_b = shapeDrawer.destroy) == null ? void 0 : _b.call(shapeDrawer, this);
    }
    for (const key of this.effectDrawers.keys()) {
      this.effectDrawers.delete(key);
    }
    for (const key of this.shapeDrawers.keys()) {
      this.shapeDrawers.delete(key);
    }
    this._engine.clearPlugins(this);
    this.destroyed = true;
    if (remove) {
      const mainArr = this._engine.items, idx = mainArr.findIndex((t) => t === this);
      if (idx >= removeMinIndex) {
        mainArr.splice(idx, removeDeleteCount);
      }
    }
    this._engine.dispatchEvent(EventType.containerDestroyed, { container: this });
  }
  draw(force) {
    if (!guardCheck(this)) {
      return;
    }
    let refreshTime = force;
    const frame = (timestamp) => {
      if (refreshTime) {
        this._lastFrameTime = void 0;
        refreshTime = false;
      }
      this._nextFrame(timestamp);
    };
    this._drawAnimationFrame = animate((timestamp) => frame(timestamp));
  }
  async export(type, options = {}) {
    for (const plugin of this.plugins.values()) {
      if (!plugin.export) {
        continue;
      }
      const res = await plugin.export(type, options);
      if (!res.supported) {
        continue;
      }
      return res.blob;
    }
    getLogger().error(`${errorPrefix} - Export plugin with type ${type} not found`);
  }
  handleClickMode(mode) {
    var _a;
    if (!guardCheck(this)) {
      return;
    }
    this.particles.handleClickMode(mode);
    for (const plugin of this.plugins.values()) {
      (_a = plugin.handleClickMode) == null ? void 0 : _a.call(plugin, mode);
    }
  }
  async init() {
    var _a, _b, _c, _d;
    if (!guardCheck(this)) {
      return;
    }
    const effects = this._engine.getSupportedEffects();
    for (const type of effects) {
      const drawer = this._engine.getEffectDrawer(type);
      if (drawer) {
        this.effectDrawers.set(type, drawer);
      }
    }
    const shapes = this._engine.getSupportedShapes();
    for (const type of shapes) {
      const drawer = this._engine.getShapeDrawer(type);
      if (drawer) {
        this.shapeDrawers.set(type, drawer);
      }
    }
    await this.particles.initPlugins();
    this._options = loadContainerOptions(this._engine, this, this._initialSourceOptions, this.sourceOptions);
    this.actualOptions = loadContainerOptions(this._engine, this, this._options);
    const availablePlugins = await this._engine.getAvailablePlugins(this);
    for (const [id, plugin] of availablePlugins) {
      this.plugins.set(id, plugin);
    }
    this.retina.init();
    await this.canvas.init();
    this.updateActualOptions();
    this.canvas.initBackground();
    this.canvas.resize();
    const { zLayers, duration, delay, fpsLimit, smooth } = this.actualOptions;
    this.zLayers = zLayers;
    this._duration = getRangeValue(duration) * millisecondsToSeconds;
    this._delay = getRangeValue(delay) * millisecondsToSeconds;
    this._lifeTime = 0;
    this.fpsLimit = fpsLimit > minFpsLimit ? fpsLimit : defaultFpsLimit;
    this._smooth = smooth;
    for (const drawer of this.effectDrawers.values()) {
      await ((_a = drawer.init) == null ? void 0 : _a.call(drawer, this));
    }
    for (const drawer of this.shapeDrawers.values()) {
      await ((_b = drawer.init) == null ? void 0 : _b.call(drawer, this));
    }
    for (const plugin of this.plugins.values()) {
      await ((_c = plugin.init) == null ? void 0 : _c.call(plugin));
    }
    this._engine.dispatchEvent(EventType.containerInit, { container: this });
    await this.particles.init();
    this.particles.setDensity();
    for (const plugin of this.plugins.values()) {
      (_d = plugin.particlesSetup) == null ? void 0 : _d.call(plugin);
    }
    this._engine.dispatchEvent(EventType.particlesSetup, { container: this });
  }
  async loadTheme(name) {
    if (!guardCheck(this)) {
      return;
    }
    this._currentTheme = name;
    await this.refresh();
  }
  pause() {
    var _a;
    if (!guardCheck(this)) {
      return;
    }
    if (this._drawAnimationFrame !== void 0) {
      cancelAnimation(this._drawAnimationFrame);
      delete this._drawAnimationFrame;
    }
    if (this._paused) {
      return;
    }
    for (const plugin of this.plugins.values()) {
      (_a = plugin.pause) == null ? void 0 : _a.call(plugin);
    }
    if (!this.pageHidden) {
      this._paused = true;
    }
    this._engine.dispatchEvent(EventType.containerPaused, { container: this });
  }
  play(force) {
    if (!guardCheck(this)) {
      return;
    }
    const needsUpdate = this._paused || force;
    if (this._firstStart && !this.actualOptions.autoPlay) {
      this._firstStart = false;
      return;
    }
    if (this._paused) {
      this._paused = false;
    }
    if (needsUpdate) {
      for (const plugin of this.plugins.values()) {
        if (plugin.play) {
          plugin.play();
        }
      }
    }
    this._engine.dispatchEvent(EventType.containerPlay, { container: this });
    this.draw(needsUpdate ?? false);
  }
  async refresh() {
    if (!guardCheck(this)) {
      return;
    }
    this.stop();
    return this.start();
  }
  async reset(sourceOptions) {
    if (!guardCheck(this)) {
      return;
    }
    this._initialSourceOptions = sourceOptions;
    this._sourceOptions = sourceOptions;
    this._options = loadContainerOptions(this._engine, this, this._initialSourceOptions, this.sourceOptions);
    this.actualOptions = loadContainerOptions(this._engine, this, this._options);
    return this.refresh();
  }
  async start() {
    if (!guardCheck(this) || this.started) {
      return;
    }
    await this.init();
    this.started = true;
    await new Promise((resolve) => {
      const start = async () => {
        var _a;
        this._eventListeners.addListeners();
        if (this.interactivity.element instanceof HTMLElement && this._intersectionObserver) {
          this._intersectionObserver.observe(this.interactivity.element);
        }
        for (const plugin of this.plugins.values()) {
          await ((_a = plugin.start) == null ? void 0 : _a.call(plugin));
        }
        this._engine.dispatchEvent(EventType.containerStarted, { container: this });
        this.play();
        resolve();
      };
      this._delayTimeout = setTimeout(() => void start(), this._delay);
    });
  }
  stop() {
    var _a;
    if (!guardCheck(this) || !this.started) {
      return;
    }
    if (this._delayTimeout) {
      clearTimeout(this._delayTimeout);
      delete this._delayTimeout;
    }
    this._firstStart = true;
    this.started = false;
    this._eventListeners.removeListeners();
    this.pause();
    this.particles.clear();
    this.canvas.stop();
    if (this.interactivity.element instanceof HTMLElement && this._intersectionObserver) {
      this._intersectionObserver.unobserve(this.interactivity.element);
    }
    for (const plugin of this.plugins.values()) {
      (_a = plugin.stop) == null ? void 0 : _a.call(plugin);
    }
    for (const key of this.plugins.keys()) {
      this.plugins.delete(key);
    }
    this._sourceOptions = this._options;
    this._engine.dispatchEvent(EventType.containerStopped, { container: this });
  }
  updateActualOptions() {
    this.actualOptions.responsive = [];
    const newMaxWidth = this.actualOptions.setResponsive(this.canvas.size.width, this.retina.pixelRatio, this._options);
    this.actualOptions.setTheme(this._currentTheme);
    if (this._responsiveMaxWidth === newMaxWidth) {
      return false;
    }
    this._responsiveMaxWidth = newMaxWidth;
    return true;
  }
};

// node_modules/@tsparticles/engine/browser/Utils/EventDispatcher.js
var EventDispatcher = class {
  constructor() {
    this._listeners = /* @__PURE__ */ new Map();
  }
  addEventListener(type, listener) {
    this.removeEventListener(type, listener);
    let arr = this._listeners.get(type);
    if (!arr) {
      arr = [];
      this._listeners.set(type, arr);
    }
    arr.push(listener);
  }
  dispatchEvent(type, args) {
    const listeners = this._listeners.get(type);
    listeners == null ? void 0 : listeners.forEach((handler) => handler(args));
  }
  hasEventListener(type) {
    return !!this._listeners.get(type);
  }
  removeAllEventListeners(type) {
    if (!type) {
      this._listeners = /* @__PURE__ */ new Map();
    } else {
      this._listeners.delete(type);
    }
  }
  removeEventListener(type, listener) {
    const arr = this._listeners.get(type);
    if (!arr) {
      return;
    }
    const length = arr.length, idx = arr.indexOf(listener);
    if (idx < minIndex) {
      return;
    }
    if (length === deleteCount) {
      this._listeners.delete(type);
    } else {
      arr.splice(idx, deleteCount);
    }
  }
};

// node_modules/@tsparticles/engine/browser/Core/Engine.js
async function getItemsFromInitializer(container, map, initializers, force = false) {
  let res = map.get(container);
  if (!res || force) {
    res = await Promise.all([...initializers.values()].map((t) => t(container)));
    map.set(container, res);
  }
  return res;
}
async function getDataFromUrl(data) {
  const url = itemFromSingleOrMultiple(data.url, data.index);
  if (!url) {
    return data.fallback;
  }
  const response = await fetch(url);
  if (response.ok) {
    return await response.json();
  }
  getLogger().error(`${errorPrefix} ${response.status} while retrieving config file`);
  return data.fallback;
}
var getCanvasFromContainer = (domContainer) => {
  let canvasEl;
  if (domContainer instanceof HTMLCanvasElement || domContainer.tagName.toLowerCase() === canvasTag) {
    canvasEl = domContainer;
    if (!canvasEl.dataset[generatedAttribute]) {
      canvasEl.dataset[generatedAttribute] = generatedFalse;
    }
  } else {
    const existingCanvases = domContainer.getElementsByTagName(canvasTag);
    if (existingCanvases.length) {
      canvasEl = existingCanvases[canvasFirstIndex];
      canvasEl.dataset[generatedAttribute] = generatedFalse;
    } else {
      canvasEl = document.createElement(canvasTag);
      canvasEl.dataset[generatedAttribute] = generatedTrue;
      domContainer.appendChild(canvasEl);
    }
  }
  const fullPercent = "100%";
  if (!canvasEl.style.width) {
    canvasEl.style.width = fullPercent;
  }
  if (!canvasEl.style.height) {
    canvasEl.style.height = fullPercent;
  }
  return canvasEl;
};
var getDomContainer = (id, source) => {
  let domContainer = source ?? document.getElementById(id);
  if (domContainer) {
    return domContainer;
  }
  domContainer = document.createElement("div");
  domContainer.id = id;
  domContainer.dataset[generatedAttribute] = generatedTrue;
  document.body.append(domContainer);
  return domContainer;
};
var Engine = class {
  constructor() {
    this._configs = /* @__PURE__ */ new Map();
    this._domArray = [];
    this._eventDispatcher = new EventDispatcher();
    this._initialized = false;
    this.plugins = [];
    this.colorManagers = /* @__PURE__ */ new Map();
    this.easingFunctions = /* @__PURE__ */ new Map();
    this._initializers = {
      interactors: /* @__PURE__ */ new Map(),
      movers: /* @__PURE__ */ new Map(),
      updaters: /* @__PURE__ */ new Map()
    };
    this.interactors = /* @__PURE__ */ new Map();
    this.movers = /* @__PURE__ */ new Map();
    this.updaters = /* @__PURE__ */ new Map();
    this.presets = /* @__PURE__ */ new Map();
    this.effectDrawers = /* @__PURE__ */ new Map();
    this.shapeDrawers = /* @__PURE__ */ new Map();
    this.pathGenerators = /* @__PURE__ */ new Map();
  }
  get configs() {
    const res = {};
    for (const [name, config] of this._configs) {
      res[name] = config;
    }
    return res;
  }
  get items() {
    return this._domArray;
  }
  get version() {
    return "3.8.1";
  }
  async addColorManager(manager, refresh = true) {
    this.colorManagers.set(manager.key, manager);
    await this.refresh(refresh);
  }
  addConfig(config) {
    const key = config.key ?? config.name ?? "default";
    this._configs.set(key, config);
    this._eventDispatcher.dispatchEvent(EventType.configAdded, { data: { name: key, config } });
  }
  async addEasing(name, easing, refresh = true) {
    if (this.getEasing(name)) {
      return;
    }
    this.easingFunctions.set(name, easing);
    await this.refresh(refresh);
  }
  async addEffect(effect, drawer, refresh = true) {
    executeOnSingleOrMultiple(effect, (type) => {
      if (!this.getEffectDrawer(type)) {
        this.effectDrawers.set(type, drawer);
      }
    });
    await this.refresh(refresh);
  }
  addEventListener(type, listener) {
    this._eventDispatcher.addEventListener(type, listener);
  }
  async addInteractor(name, interactorInitializer, refresh = true) {
    this._initializers.interactors.set(name, interactorInitializer);
    await this.refresh(refresh);
  }
  async addMover(name, moverInitializer, refresh = true) {
    this._initializers.movers.set(name, moverInitializer);
    await this.refresh(refresh);
  }
  async addParticleUpdater(name, updaterInitializer, refresh = true) {
    this._initializers.updaters.set(name, updaterInitializer);
    await this.refresh(refresh);
  }
  async addPathGenerator(name, generator, refresh = true) {
    if (!this.getPathGenerator(name)) {
      this.pathGenerators.set(name, generator);
    }
    await this.refresh(refresh);
  }
  async addPlugin(plugin, refresh = true) {
    if (!this.getPlugin(plugin.id)) {
      this.plugins.push(plugin);
    }
    await this.refresh(refresh);
  }
  async addPreset(preset, options, override = false, refresh = true) {
    if (override || !this.getPreset(preset)) {
      this.presets.set(preset, options);
    }
    await this.refresh(refresh);
  }
  async addShape(drawer, refresh = true) {
    for (const validType of drawer.validTypes) {
      if (this.getShapeDrawer(validType)) {
        continue;
      }
      this.shapeDrawers.set(validType, drawer);
    }
    await this.refresh(refresh);
  }
  checkVersion(pluginVersion) {
    if (this.version === pluginVersion) {
      return;
    }
    throw new Error(`The tsParticles version is different from the loaded plugins version. Engine version: ${this.version}. Plugin version: ${pluginVersion}`);
  }
  clearPlugins(container) {
    this.updaters.delete(container);
    this.movers.delete(container);
    this.interactors.delete(container);
  }
  dispatchEvent(type, args) {
    this._eventDispatcher.dispatchEvent(type, args);
  }
  dom() {
    return this.items;
  }
  domItem(index) {
    return this.item(index);
  }
  async getAvailablePlugins(container) {
    const res = /* @__PURE__ */ new Map();
    for (const plugin of this.plugins) {
      if (plugin.needsPlugin(container.actualOptions)) {
        res.set(plugin.id, await plugin.getPlugin(container));
      }
    }
    return res;
  }
  getEasing(name) {
    return this.easingFunctions.get(name) ?? ((value) => value);
  }
  getEffectDrawer(type) {
    return this.effectDrawers.get(type);
  }
  async getInteractors(container, force = false) {
    return getItemsFromInitializer(container, this.interactors, this._initializers.interactors, force);
  }
  async getMovers(container, force = false) {
    return getItemsFromInitializer(container, this.movers, this._initializers.movers, force);
  }
  getPathGenerator(type) {
    return this.pathGenerators.get(type);
  }
  getPlugin(plugin) {
    return this.plugins.find((t) => t.id === plugin);
  }
  getPreset(preset) {
    return this.presets.get(preset);
  }
  getShapeDrawer(type) {
    return this.shapeDrawers.get(type);
  }
  getSupportedEffects() {
    return this.effectDrawers.keys();
  }
  getSupportedShapes() {
    return this.shapeDrawers.keys();
  }
  async getUpdaters(container, force = false) {
    return getItemsFromInitializer(container, this.updaters, this._initializers.updaters, force);
  }
  init() {
    if (this._initialized) {
      return;
    }
    this._initialized = true;
  }
  item(index) {
    const { items } = this, item = items[index];
    if (!item || item.destroyed) {
      items.splice(index, removeDeleteCount);
      return;
    }
    return item;
  }
  async load(params) {
    var _a;
    const id = params.id ?? ((_a = params.element) == null ? void 0 : _a.id) ?? `tsparticles${Math.floor(getRandom() * loadRandomFactor)}`, { index, url } = params, options = url ? await getDataFromUrl({ fallback: params.options, url, index }) : params.options;
    const currentOptions = itemFromSingleOrMultiple(options, index), { items } = this, oldIndex = items.findIndex((v) => v.id.description === id), newItem = new Container(this, id, currentOptions);
    if (oldIndex >= loadMinIndex) {
      const old = this.item(oldIndex), deleteCount2 = old ? one : none;
      if (old && !old.destroyed) {
        old.destroy(false);
      }
      items.splice(oldIndex, deleteCount2, newItem);
    } else {
      items.push(newItem);
    }
    const domContainer = getDomContainer(id, params.element), canvasEl = getCanvasFromContainer(domContainer);
    newItem.canvas.loadCanvas(canvasEl);
    await newItem.start();
    return newItem;
  }
  loadOptions(options, sourceOptions) {
    this.plugins.forEach((plugin) => {
      var _a;
      return (_a = plugin.loadOptions) == null ? void 0 : _a.call(plugin, options, sourceOptions);
    });
  }
  loadParticlesOptions(container, options, ...sourceOptions) {
    const updaters = this.updaters.get(container);
    if (!updaters) {
      return;
    }
    updaters.forEach((updater) => {
      var _a;
      return (_a = updater.loadOptions) == null ? void 0 : _a.call(updater, options, ...sourceOptions);
    });
  }
  async refresh(refresh = true) {
    if (!refresh) {
      return;
    }
    await Promise.all(this.items.map((t) => t.refresh()));
  }
  removeEventListener(type, listener) {
    this._eventDispatcher.removeEventListener(type, listener);
  }
  setOnClickHandler(callback) {
    const { items } = this;
    if (!items.length) {
      throw new Error(`${errorPrefix} can only set click handlers after calling tsParticles.load()`);
    }
    items.forEach((item) => item.addClickHandler(callback));
  }
};

// node_modules/@tsparticles/engine/browser/init.js
function init() {
  const engine = new Engine();
  engine.init();
  return engine;
}

// node_modules/@tsparticles/engine/browser/Core/Utils/ExternalInteractorBase.js
var ExternalInteractorBase = class {
  constructor(container) {
    this.type = InteractorType.external;
    this.container = container;
  }
};

// node_modules/@tsparticles/engine/browser/Core/Utils/ParticlesInteractorBase.js
var ParticlesInteractorBase = class {
  constructor(container) {
    this.type = InteractorType.particles;
    this.container = container;
  }
};

// node_modules/@tsparticles/engine/browser/Enums/Directions/RotateDirection.js
var RotateDirection;
(function(RotateDirection2) {
  RotateDirection2["clockwise"] = "clockwise";
  RotateDirection2["counterClockwise"] = "counter-clockwise";
  RotateDirection2["random"] = "random";
})(RotateDirection || (RotateDirection = {}));

// node_modules/@tsparticles/engine/browser/Enums/Types/GradientType.js
var GradientType;
(function(GradientType2) {
  GradientType2["linear"] = "linear";
  GradientType2["radial"] = "radial";
  GradientType2["random"] = "random";
})(GradientType || (GradientType = {}));

// node_modules/@tsparticles/engine/browser/Enums/Types/EasingType.js
var EasingType;
(function(EasingType2) {
  EasingType2["easeInBack"] = "ease-in-back";
  EasingType2["easeInCirc"] = "ease-in-circ";
  EasingType2["easeInCubic"] = "ease-in-cubic";
  EasingType2["easeInLinear"] = "ease-in-linear";
  EasingType2["easeInQuad"] = "ease-in-quad";
  EasingType2["easeInQuart"] = "ease-in-quart";
  EasingType2["easeInQuint"] = "ease-in-quint";
  EasingType2["easeInExpo"] = "ease-in-expo";
  EasingType2["easeInSine"] = "ease-in-sine";
  EasingType2["easeOutBack"] = "ease-out-back";
  EasingType2["easeOutCirc"] = "ease-out-circ";
  EasingType2["easeOutCubic"] = "ease-out-cubic";
  EasingType2["easeOutLinear"] = "ease-out-linear";
  EasingType2["easeOutQuad"] = "ease-out-quad";
  EasingType2["easeOutQuart"] = "ease-out-quart";
  EasingType2["easeOutQuint"] = "ease-out-quint";
  EasingType2["easeOutExpo"] = "ease-out-expo";
  EasingType2["easeOutSine"] = "ease-out-sine";
  EasingType2["easeInOutBack"] = "ease-in-out-back";
  EasingType2["easeInOutCirc"] = "ease-in-out-circ";
  EasingType2["easeInOutCubic"] = "ease-in-out-cubic";
  EasingType2["easeInOutLinear"] = "ease-in-out-linear";
  EasingType2["easeInOutQuad"] = "ease-in-out-quad";
  EasingType2["easeInOutQuart"] = "ease-in-out-quart";
  EasingType2["easeInOutQuint"] = "ease-in-out-quint";
  EasingType2["easeInOutExpo"] = "ease-in-out-expo";
  EasingType2["easeInOutSine"] = "ease-in-out-sine";
})(EasingType || (EasingType = {}));

// node_modules/@tsparticles/engine/browser/index.js
var tsParticles = init();
if (!isSsr()) {
  window.tsParticles = tsParticles;
}

// node_modules/@tsparticles/plugin-absorbers/browser/Options/Classes/AbsorberSizeLimit.js
var AbsorberSizeLimit = class {
  constructor() {
    this.radius = 0;
    this.mass = 0;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.mass !== void 0) {
      this.mass = data.mass;
    }
    if (data.radius !== void 0) {
      this.radius = data.radius;
    }
  }
};

// node_modules/@tsparticles/plugin-absorbers/browser/Options/Classes/AbsorberSize.js
var AbsorberSize = class extends ValueWithRandom {
  constructor() {
    super();
    this.density = 5;
    this.value = 50;
    this.limit = new AbsorberSizeLimit();
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    super.load(data);
    if (data.density !== void 0) {
      this.density = data.density;
    }
    if (isNumber(data.limit)) {
      this.limit.radius = data.limit;
    } else {
      this.limit.load(data.limit);
    }
  }
};

// node_modules/@tsparticles/plugin-absorbers/browser/Options/Classes/Absorber.js
var Absorber = class {
  constructor() {
    this.color = new OptionsColor();
    this.color.value = "#000000";
    this.draggable = false;
    this.opacity = 1;
    this.destroy = true;
    this.orbits = false;
    this.size = new AbsorberSize();
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.draggable !== void 0) {
      this.draggable = data.draggable;
    }
    this.name = data.name;
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
    if (data.position !== void 0) {
      this.position = {};
      if (data.position.x !== void 0) {
        this.position.x = setRangeValue(data.position.x);
      }
      if (data.position.y !== void 0) {
        this.position.y = setRangeValue(data.position.y);
      }
    }
    if (data.size !== void 0) {
      this.size.load(data.size);
    }
    if (data.destroy !== void 0) {
      this.destroy = data.destroy;
    }
    if (data.orbits !== void 0) {
      this.orbits = data.orbits;
    }
  }
};

// node_modules/@tsparticles/plugin-absorbers/browser/Enums/AbsorberClickMode.js
var AbsorberClickMode;
(function(AbsorberClickMode2) {
  AbsorberClickMode2["absorber"] = "absorber";
})(AbsorberClickMode || (AbsorberClickMode = {}));

// node_modules/@tsparticles/plugin-absorbers/browser/AbsorberInstance.js
var squareExp2 = 2;
var absorbFactor = 0.033;
var minOrbitLength = 0;
var minRadius = 0;
var minMass = 0;
var minAngle = 0;
var double2 = 2;
var maxAngle = Math.PI * double2;
var minVelocity2 = 0;
var AbsorberInstance = class {
  constructor(absorbers, container, engine, options, position) {
    var _a;
    this._calcPosition = () => {
      const exactPosition = calcPositionOrRandomFromSizeRanged({
        size: this._container.canvas.size,
        position: this.options.position
      });
      return Vector.create(exactPosition.x, exactPosition.y);
    };
    this._updateParticlePosition = (particle, v) => {
      if (particle.destroyed) {
        return;
      }
      const container2 = this._container, canvasSize = container2.canvas.size;
      if (particle.needsNewPosition) {
        const newPosition = calcPositionOrRandomFromSize({ size: canvasSize });
        particle.position.setTo(newPosition);
        particle.velocity.setTo(particle.initialVelocity);
        particle.absorberOrbit = void 0;
        particle.needsNewPosition = false;
      }
      if (this.options.orbits) {
        if (particle.absorberOrbit === void 0) {
          particle.absorberOrbit = Vector.origin;
          particle.absorberOrbit.length = getDistance(particle.getPosition(), this.position);
          particle.absorberOrbit.angle = getRandom() * maxAngle;
        }
        if (particle.absorberOrbit.length <= this.size && !this.options.destroy) {
          const minSize = Math.min(canvasSize.width, canvasSize.height), offset = 1, randomOffset = 0.1, randomFactor = 0.2;
          particle.absorberOrbit.length = minSize * (offset + (getRandom() * randomFactor - randomOffset));
        }
        if (particle.absorberOrbitDirection === void 0) {
          particle.absorberOrbitDirection = particle.velocity.x >= minVelocity2 ? RotateDirection.clockwise : RotateDirection.counterClockwise;
        }
        const orbitRadius = particle.absorberOrbit.length, orbitAngle = particle.absorberOrbit.angle, orbitDirection = particle.absorberOrbitDirection;
        particle.velocity.setTo(Vector.origin);
        const updateFunc = {
          x: orbitDirection === RotateDirection.clockwise ? Math.cos : Math.sin,
          y: orbitDirection === RotateDirection.clockwise ? Math.sin : Math.cos
        };
        particle.position.x = this.position.x + orbitRadius * updateFunc.x(orbitAngle);
        particle.position.y = this.position.y + orbitRadius * updateFunc.y(orbitAngle);
        particle.absorberOrbit.length -= v.length;
        particle.absorberOrbit.angle += (particle.retina.moveSpeed ?? minVelocity2) * container2.retina.pixelRatio / percentDenominator * container2.retina.reduceFactor;
      } else {
        const addV = Vector.origin;
        addV.length = v.length;
        addV.angle = v.angle;
        particle.velocity.addTo(addV);
      }
    };
    this._absorbers = absorbers;
    this._container = container;
    this._engine = engine;
    this.initialPosition = position ? Vector.create(position.x, position.y) : void 0;
    if (options instanceof Absorber) {
      this.options = options;
    } else {
      this.options = new Absorber();
      this.options.load(options);
    }
    this.dragging = false;
    this.name = this.options.name;
    this.opacity = this.options.opacity;
    this.size = getRangeValue(this.options.size.value) * container.retina.pixelRatio;
    this.mass = this.size * this.options.size.density * container.retina.reduceFactor;
    const limit = this.options.size.limit;
    this.limit = {
      radius: limit.radius * container.retina.pixelRatio * container.retina.reduceFactor,
      mass: limit.mass
    };
    this.color = rangeColorToRgb(this._engine, this.options.color) ?? {
      b: 0,
      g: 0,
      r: 0
    };
    this.position = ((_a = this.initialPosition) == null ? void 0 : _a.copy()) ?? this._calcPosition();
  }
  attract(particle) {
    const container = this._container, options = this.options;
    if (options.draggable) {
      const mouse = container.interactivity.mouse;
      if (mouse.clicking && mouse.downPosition) {
        const mouseDist = getDistance(this.position, mouse.downPosition);
        if (mouseDist <= this.size) {
          this.dragging = true;
        }
      } else {
        this.dragging = false;
      }
      if (this.dragging && mouse.position) {
        this.position.x = mouse.position.x;
        this.position.y = mouse.position.y;
      }
    }
    const pos = particle.getPosition(), { dx, dy, distance } = getDistances(this.position, pos), v = Vector.create(dx, dy);
    v.length = this.mass / Math.pow(distance, squareExp2) * container.retina.reduceFactor;
    if (distance < this.size + particle.getRadius()) {
      const sizeFactor2 = particle.getRadius() * absorbFactor * container.retina.pixelRatio;
      if (this.size > particle.getRadius() && distance < this.size - particle.getRadius() || particle.absorberOrbit !== void 0 && particle.absorberOrbit.length < minOrbitLength) {
        if (options.destroy) {
          particle.destroy();
        } else {
          particle.needsNewPosition = true;
          this._updateParticlePosition(particle, v);
        }
      } else {
        if (options.destroy) {
          particle.size.value -= sizeFactor2;
        }
        this._updateParticlePosition(particle, v);
      }
      if (this.limit.radius <= minRadius || this.size < this.limit.radius) {
        this.size += sizeFactor2;
      }
      if (this.limit.mass <= minMass || this.mass < this.limit.mass) {
        this.mass += sizeFactor2 * this.options.size.density * container.retina.reduceFactor;
      }
    } else {
      this._updateParticlePosition(particle, v);
    }
  }
  draw(context) {
    context.translate(this.position.x, this.position.y);
    context.beginPath();
    context.arc(originPoint.x, originPoint.y, this.size, minAngle, maxAngle, false);
    context.closePath();
    context.fillStyle = getStyleFromRgb(this.color, this.opacity);
    context.fill();
  }
  resize() {
    const initialPosition = this.initialPosition;
    this.position = initialPosition && isPointInside(initialPosition, this._container.canvas.size, Vector.origin) ? initialPosition : this._calcPosition();
  }
};

// node_modules/@tsparticles/plugin-absorbers/browser/Absorbers.js
var defaultIndex = 0;
var Absorbers = class {
  constructor(container, engine) {
    this._container = container;
    this._engine = engine;
    this.array = [];
    this.absorbers = [];
    this.interactivityAbsorbers = [];
    container.getAbsorber = (idxOrName) => idxOrName === void 0 || isNumber(idxOrName) ? this.array[idxOrName ?? defaultIndex] : this.array.find((t) => t.name === idxOrName);
    container.addAbsorber = async (options, position) => this.addAbsorber(options, position);
  }
  async addAbsorber(options, position) {
    const absorber = new AbsorberInstance(this, this._container, this._engine, options, position);
    this.array.push(absorber);
    return Promise.resolve(absorber);
  }
  draw(context) {
    for (const absorber of this.array) {
      absorber.draw(context);
    }
  }
  handleClickMode(mode) {
    const absorberOptions = this.absorbers, modeAbsorbers = this.interactivityAbsorbers;
    if (mode === AbsorberClickMode.absorber) {
      const absorbersModeOptions = itemFromSingleOrMultiple(modeAbsorbers), absorbersOptions = absorbersModeOptions ?? itemFromSingleOrMultiple(absorberOptions), aPosition = this._container.interactivity.mouse.clickPosition;
      void this.addAbsorber(absorbersOptions, aPosition);
    }
  }
  async init() {
    this.absorbers = this._container.actualOptions.absorbers;
    this.interactivityAbsorbers = this._container.actualOptions.interactivity.modes.absorbers;
    const promises = executeOnSingleOrMultiple(this.absorbers, async (absorber) => {
      await this.addAbsorber(absorber);
    });
    if (promises instanceof Array) {
      await Promise.all(promises);
    } else {
      await promises;
    }
  }
  particleUpdate(particle) {
    for (const absorber of this.array) {
      absorber.attract(particle);
      if (particle.destroyed) {
        break;
      }
    }
  }
  removeAbsorber(absorber) {
    const index = this.array.indexOf(absorber), deleteCount2 = 1;
    if (index >= defaultIndex) {
      this.array.splice(index, deleteCount2);
    }
  }
  resize() {
    for (const absorber of this.array) {
      absorber.resize();
    }
  }
  stop() {
    this.array = [];
  }
};

// node_modules/@tsparticles/plugin-absorbers/browser/AbsorbersPlugin.js
var AbsorbersPlugin = class {
  constructor(engine) {
    this.id = "absorbers";
    this._engine = engine;
  }
  async getPlugin(container) {
    return Promise.resolve(new Absorbers(container, this._engine));
  }
  loadOptions(options, source) {
    var _a, _b;
    if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
      return;
    }
    if (source == null ? void 0 : source.absorbers) {
      options.absorbers = executeOnSingleOrMultiple(source.absorbers, (absorber) => {
        const tmp = new Absorber();
        tmp.load(absorber);
        return tmp;
      });
    }
    options.interactivity.modes.absorbers = executeOnSingleOrMultiple((_b = (_a = source == null ? void 0 : source.interactivity) == null ? void 0 : _a.modes) == null ? void 0 : _b.absorbers, (absorber) => {
      const tmp = new Absorber();
      tmp.load(absorber);
      return tmp;
    });
  }
  needsPlugin(options) {
    var _a, _b, _c;
    if (!options) {
      return false;
    }
    const absorbers = options.absorbers;
    if (isArray(absorbers)) {
      return !!absorbers.length;
    } else if (absorbers) {
      return true;
    } else if (((_c = (_b = (_a = options.interactivity) == null ? void 0 : _a.events) == null ? void 0 : _b.onClick) == null ? void 0 : _c.mode) && isInArray(AbsorberClickMode.absorber, options.interactivity.events.onClick.mode)) {
      return true;
    }
    return false;
  }
};

// node_modules/@tsparticles/plugin-absorbers/browser/index.js
async function loadAbsorbersPlugin(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addPlugin(new AbsorbersPlugin(engine), refresh);
}

// node_modules/@tsparticles/updater-destroy/browser/Options/Classes/DestroyBounds.js
var DestroyBounds = class {
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.bottom !== void 0) {
      this.bottom = setRangeValue(data.bottom);
    }
    if (data.left !== void 0) {
      this.left = setRangeValue(data.left);
    }
    if (data.right !== void 0) {
      this.right = setRangeValue(data.right);
    }
    if (data.top !== void 0) {
      this.top = setRangeValue(data.top);
    }
  }
};

// node_modules/@tsparticles/updater-destroy/browser/Enums/DestroyMode.js
var DestroyMode;
(function(DestroyMode2) {
  DestroyMode2["none"] = "none";
  DestroyMode2["split"] = "split";
})(DestroyMode || (DestroyMode = {}));

// node_modules/@tsparticles/updater-destroy/browser/Options/Classes/SplitFactor.js
var SplitFactor = class extends ValueWithRandom {
  constructor() {
    super();
    this.value = 3;
  }
};

// node_modules/@tsparticles/updater-destroy/browser/Options/Classes/SplitRate.js
var SplitRate = class extends ValueWithRandom {
  constructor() {
    super();
    this.value = { min: 4, max: 9 };
  }
};

// node_modules/@tsparticles/updater-destroy/browser/Options/Classes/Split.js
var Split = class {
  constructor() {
    this.count = 1;
    this.factor = new SplitFactor();
    this.rate = new SplitRate();
    this.sizeOffset = true;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.count !== void 0) {
      this.count = data.count;
    }
    this.factor.load(data.factor);
    this.rate.load(data.rate);
    this.particles = executeOnSingleOrMultiple(data.particles, (particles) => {
      return deepExtend({}, particles);
    });
    if (data.sizeOffset !== void 0) {
      this.sizeOffset = data.sizeOffset;
    }
    if (data.colorOffset) {
      this.colorOffset = this.colorOffset ?? {};
      if (data.colorOffset.h !== void 0) {
        this.colorOffset.h = data.colorOffset.h;
      }
      if (data.colorOffset.s !== void 0) {
        this.colorOffset.s = data.colorOffset.s;
      }
      if (data.colorOffset.l !== void 0) {
        this.colorOffset.l = data.colorOffset.l;
      }
    }
  }
};

// node_modules/@tsparticles/updater-destroy/browser/Options/Classes/Destroy.js
var Destroy = class {
  constructor() {
    this.bounds = new DestroyBounds();
    this.mode = DestroyMode.none;
    this.split = new Split();
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.mode) {
      this.mode = data.mode;
    }
    if (data.bounds) {
      this.bounds.load(data.bounds);
    }
    this.split.load(data.split);
  }
};

// node_modules/@tsparticles/updater-destroy/browser/Utils.js
var defaultOffset = 0;
var minDestroySize = 0.5;
var defaultSplitCount = 0;
var increment = 1;
var unbreakableTime = 500;
var minSplitCount = 0;
function addSplitParticle(engine, container, parent, splitParticlesOptions) {
  const destroyOptions = parent.options.destroy;
  if (!destroyOptions) {
    return;
  }
  const splitOptions = destroyOptions.split, options = loadParticlesOptions(engine, container, parent.options), factor = getRangeValue(splitOptions.factor.value), parentColor = parent.getFillColor();
  if (splitOptions.color) {
    options.color.load(splitOptions.color);
  } else if (splitOptions.colorOffset && parentColor) {
    options.color.load({
      value: {
        hsl: {
          h: parentColor.h + getRangeValue(splitOptions.colorOffset.h ?? defaultOffset),
          s: parentColor.s + getRangeValue(splitOptions.colorOffset.s ?? defaultOffset),
          l: parentColor.l + getRangeValue(splitOptions.colorOffset.l ?? defaultOffset)
        }
      }
    });
  } else {
    options.color.load({
      value: {
        hsl: parent.getFillColor()
      }
    });
  }
  options.move.load({
    center: {
      x: parent.position.x,
      y: parent.position.y,
      mode: PixelMode.precise
    }
  });
  if (isNumber(options.size.value)) {
    options.size.value /= factor;
  } else {
    options.size.value.min /= factor;
    options.size.value.max /= factor;
  }
  options.load(splitParticlesOptions);
  const offset = splitOptions.sizeOffset ? setRangeValue(-parent.size.value, parent.size.value) : defaultOffset, position = {
    x: parent.position.x + randomInRange(offset),
    y: parent.position.y + randomInRange(offset)
  };
  return container.particles.addParticle(position, options, parent.group, (particle) => {
    if (particle.size.value < minDestroySize) {
      return false;
    }
    particle.velocity.length = randomInRange(setRangeValue(parent.velocity.length, particle.velocity.length));
    particle.splitCount = (parent.splitCount ?? defaultSplitCount) + increment;
    particle.unbreakable = true;
    setTimeout(() => {
      particle.unbreakable = false;
    }, unbreakableTime);
    return true;
  });
}
function split(engine, container, particle) {
  const destroyOptions = particle.options.destroy;
  if (!destroyOptions) {
    return;
  }
  const splitOptions = destroyOptions.split;
  if (splitOptions.count >= minSplitCount && (particle.splitCount === void 0 || particle.splitCount++ > splitOptions.count)) {
    return;
  }
  const rate = getRangeValue(splitOptions.rate.value), particlesSplitOptions = itemFromSingleOrMultiple(splitOptions.particles);
  for (let i = 0; i < rate; i++) {
    addSplitParticle(engine, container, particle, particlesSplitOptions);
  }
}

// node_modules/@tsparticles/updater-destroy/browser/DestroyUpdater.js
var DestroyUpdater = class {
  constructor(engine, container) {
    this.container = container;
    this.engine = engine;
  }
  init(particle) {
    const container = this.container, particlesOptions = particle.options, destroyOptions = particlesOptions.destroy;
    if (!destroyOptions) {
      return;
    }
    particle.splitCount = 0;
    const destroyBoundsOptions = destroyOptions.bounds;
    if (!particle.destroyBounds) {
      particle.destroyBounds = {};
    }
    const { bottom, left, right, top } = destroyBoundsOptions, { destroyBounds } = particle, canvasSize = container.canvas.size;
    if (bottom) {
      destroyBounds.bottom = getRangeValue(bottom) * canvasSize.height / percentDenominator;
    }
    if (left) {
      destroyBounds.left = getRangeValue(left) * canvasSize.width / percentDenominator;
    }
    if (right) {
      destroyBounds.right = getRangeValue(right) * canvasSize.width / percentDenominator;
    }
    if (top) {
      destroyBounds.top = getRangeValue(top) * canvasSize.height / percentDenominator;
    }
  }
  isEnabled(particle) {
    return !particle.destroyed;
  }
  loadOptions(options, ...sources) {
    if (!options.destroy) {
      options.destroy = new Destroy();
    }
    for (const source of sources) {
      options.destroy.load(source == null ? void 0 : source.destroy);
    }
  }
  particleDestroyed(particle, override) {
    if (override) {
      return;
    }
    const destroyOptions = particle.options.destroy;
    if (destroyOptions && destroyOptions.mode === DestroyMode.split) {
      split(this.engine, this.container, particle);
    }
  }
  update(particle) {
    if (!this.isEnabled(particle)) {
      return;
    }
    const position = particle.getPosition(), bounds = particle.destroyBounds;
    if (!bounds) {
      return;
    }
    if (bounds.bottom !== void 0 && position.y >= bounds.bottom || bounds.left !== void 0 && position.x <= bounds.left || bounds.right !== void 0 && position.x >= bounds.right || bounds.top !== void 0 && position.y <= bounds.top) {
      particle.destroy();
    }
  }
};

// node_modules/@tsparticles/updater-destroy/browser/index.js
async function loadDestroyUpdater(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addParticleUpdater("destroy", (container) => {
    return Promise.resolve(new DestroyUpdater(engine, container));
  }, refresh);
}

// node_modules/@tsparticles/plugin-emitters/browser/Options/Classes/EmitterLife.js
var EmitterLife = class {
  constructor() {
    this.wait = false;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.count !== void 0) {
      this.count = data.count;
    }
    if (data.delay !== void 0) {
      this.delay = setRangeValue(data.delay);
    }
    if (data.duration !== void 0) {
      this.duration = setRangeValue(data.duration);
    }
    if (data.wait !== void 0) {
      this.wait = data.wait;
    }
  }
};

// node_modules/@tsparticles/plugin-emitters/browser/Options/Classes/EmitterRate.js
var EmitterRate = class {
  constructor() {
    this.quantity = 1;
    this.delay = 0.1;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.quantity !== void 0) {
      this.quantity = setRangeValue(data.quantity);
    }
    if (data.delay !== void 0) {
      this.delay = setRangeValue(data.delay);
    }
  }
};

// node_modules/@tsparticles/plugin-emitters/browser/Options/Classes/EmitterShapeReplace.js
var EmitterShapeReplace = class {
  constructor() {
    this.color = false;
    this.opacity = false;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.color !== void 0) {
      this.color = data.color;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
  }
};

// node_modules/@tsparticles/plugin-emitters/browser/Options/Classes/EmitterShape.js
var EmitterShape = class {
  constructor() {
    this.options = {};
    this.replace = new EmitterShapeReplace();
    this.type = "square";
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.options !== void 0) {
      this.options = deepExtend({}, data.options ?? {});
    }
    this.replace.load(data.replace);
    if (data.type !== void 0) {
      this.type = data.type;
    }
  }
};

// node_modules/@tsparticles/plugin-emitters/browser/Options/Classes/EmitterSize.js
var EmitterSize = class {
  constructor() {
    this.mode = PixelMode.percent;
    this.height = 0;
    this.width = 0;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    if (data.height !== void 0) {
      this.height = data.height;
    }
    if (data.width !== void 0) {
      this.width = data.width;
    }
  }
};

// node_modules/@tsparticles/plugin-emitters/browser/Options/Classes/Emitter.js
var Emitter = class {
  constructor() {
    this.autoPlay = true;
    this.fill = true;
    this.life = new EmitterLife();
    this.rate = new EmitterRate();
    this.shape = new EmitterShape();
    this.startCount = 0;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.autoPlay !== void 0) {
      this.autoPlay = data.autoPlay;
    }
    if (data.size !== void 0) {
      if (!this.size) {
        this.size = new EmitterSize();
      }
      this.size.load(data.size);
    }
    if (data.direction !== void 0) {
      this.direction = data.direction;
    }
    this.domId = data.domId;
    if (data.fill !== void 0) {
      this.fill = data.fill;
    }
    this.life.load(data.life);
    this.name = data.name;
    this.particles = executeOnSingleOrMultiple(data.particles, (particles) => {
      return deepExtend({}, particles);
    });
    this.rate.load(data.rate);
    this.shape.load(data.shape);
    if (data.position !== void 0) {
      this.position = {};
      if (data.position.x !== void 0) {
        this.position.x = setRangeValue(data.position.x);
      }
      if (data.position.y !== void 0) {
        this.position.y = setRangeValue(data.position.y);
      }
    }
    if (data.spawnColor !== void 0) {
      if (this.spawnColor === void 0) {
        this.spawnColor = new AnimatableColor();
      }
      this.spawnColor.load(data.spawnColor);
    }
    if (data.startCount !== void 0) {
      this.startCount = data.startCount;
    }
  }
};

// node_modules/@tsparticles/plugin-emitters/browser/Enums/EmitterClickMode.js
var EmitterClickMode;
(function(EmitterClickMode2) {
  EmitterClickMode2["emitter"] = "emitter";
})(EmitterClickMode || (EmitterClickMode = {}));

// node_modules/@tsparticles/plugin-emitters/browser/EmitterInstance.js
var half2 = 0.5;
var defaultLifeDelay = 0;
var minLifeCount = 0;
var defaultSpawnDelay = 0;
var defaultEmitDelay = 0;
var defaultLifeCount = -1;
var defaultColorAnimationFactor = 1;
function setParticlesOptionsColor(particlesOptions, color) {
  if (particlesOptions.color) {
    particlesOptions.color.value = color;
  } else {
    particlesOptions.color = {
      value: color
    };
  }
}
var EmitterInstance = class {
  constructor(engine, emitters, container, options, position) {
    var _a, _b;
    this.emitters = emitters;
    this.container = container;
    this._destroy = () => {
      var _a2, _b2;
      (_a2 = this._mutationObserver) == null ? void 0 : _a2.disconnect();
      this._mutationObserver = void 0;
      (_b2 = this._resizeObserver) == null ? void 0 : _b2.disconnect();
      this._resizeObserver = void 0;
      this.emitters.removeEmitter(this);
      this._engine.dispatchEvent("emitterDestroyed", {
        container: this.container,
        data: {
          emitter: this
        }
      });
    };
    this._prepareToDie = () => {
      var _a2;
      if (this._paused) {
        return;
      }
      const duration = ((_a2 = this.options.life) == null ? void 0 : _a2.duration) !== void 0 ? getRangeValue(this.options.life.duration) : void 0, minDuration = 0, minLifeCount2 = 0;
      if (this.container.retina.reduceFactor && (this._lifeCount > minLifeCount2 || this._immortal) && duration !== void 0 && duration > minDuration) {
        this._duration = duration * millisecondsToSeconds;
      }
    };
    this._setColorAnimation = (animation, initValue, maxValue, factor = defaultColorAnimationFactor) => {
      const container2 = this.container;
      if (!animation.enable) {
        return initValue;
      }
      const colorOffset = randomInRange(animation.offset), delay = getRangeValue(this.options.rate.delay), emitFactor = delay * millisecondsToSeconds / container2.retina.reduceFactor, defaultColorSpeed = 0, colorSpeed = getRangeValue(animation.speed ?? defaultColorSpeed);
      return (initValue + colorSpeed * container2.fpsLimit / emitFactor + colorOffset * factor) % maxValue;
    };
    this._engine = engine;
    this._currentDuration = 0;
    this._currentEmitDelay = 0;
    this._currentSpawnDelay = 0;
    this._initialPosition = position;
    if (options instanceof Emitter) {
      this.options = options;
    } else {
      this.options = new Emitter();
      this.options.load(options);
    }
    this._spawnDelay = getRangeValue(this.options.life.delay ?? defaultLifeDelay) * millisecondsToSeconds / this.container.retina.reduceFactor;
    this.position = this._initialPosition ?? this._calcPosition();
    this.name = this.options.name;
    this.fill = this.options.fill;
    this._firstSpawn = !this.options.life.wait;
    this._startParticlesAdded = false;
    let particlesOptions = deepExtend({}, this.options.particles);
    particlesOptions ?? (particlesOptions = {});
    particlesOptions.move ?? (particlesOptions.move = {});
    (_a = particlesOptions.move).direction ?? (_a.direction = this.options.direction);
    if (this.options.spawnColor) {
      this.spawnColor = rangeColorToHsl(this._engine, this.options.spawnColor);
    }
    this._paused = !this.options.autoPlay;
    this._particlesOptions = particlesOptions;
    this._size = this._calcSize();
    this.size = getSize(this._size, this.container.canvas.size);
    this._lifeCount = this.options.life.count ?? defaultLifeCount;
    this._immortal = this._lifeCount <= minLifeCount;
    if (this.options.domId) {
      const element = document.getElementById(this.options.domId);
      if (element) {
        this._mutationObserver = new MutationObserver(() => {
          this.resize();
        });
        this._resizeObserver = new ResizeObserver(() => {
          this.resize();
        });
        this._mutationObserver.observe(element, {
          attributes: true,
          attributeFilter: ["style", "width", "height"]
        });
        this._resizeObserver.observe(element);
      }
    }
    const shapeOptions = this.options.shape, shapeGenerator = (_b = this._engine.emitterShapeManager) == null ? void 0 : _b.getShapeGenerator(shapeOptions.type);
    if (shapeGenerator) {
      this._shape = shapeGenerator.generate(this.position, this.size, this.fill, shapeOptions.options);
    }
    this._engine.dispatchEvent("emitterCreated", {
      container,
      data: {
        emitter: this
      }
    });
    this.play();
  }
  externalPause() {
    this._paused = true;
    this.pause();
  }
  externalPlay() {
    this._paused = false;
    this.play();
  }
  async init() {
    var _a;
    await ((_a = this._shape) == null ? void 0 : _a.init());
  }
  pause() {
    if (this._paused) {
      return;
    }
    delete this._emitDelay;
  }
  play() {
    if (this._paused) {
      return;
    }
    if (!(this.container.retina.reduceFactor && (this._lifeCount > minLifeCount || this._immortal || !this.options.life.count) && (this._firstSpawn || this._currentSpawnDelay >= (this._spawnDelay ?? defaultSpawnDelay)))) {
      return;
    }
    if (this._emitDelay === void 0) {
      const delay = getRangeValue(this.options.rate.delay);
      this._emitDelay = delay * millisecondsToSeconds / this.container.retina.reduceFactor;
    }
    if (this._lifeCount > minLifeCount || this._immortal) {
      this._prepareToDie();
    }
  }
  resize() {
    var _a;
    const initialPosition = this._initialPosition;
    this.position = initialPosition && isPointInside(initialPosition, this.container.canvas.size, Vector.origin) ? initialPosition : this._calcPosition();
    this._size = this._calcSize();
    this.size = getSize(this._size, this.container.canvas.size);
    (_a = this._shape) == null ? void 0 : _a.resize(this.position, this.size);
  }
  update(delta) {
    var _a;
    if (this._paused) {
      return;
    }
    if (this._firstSpawn) {
      this._firstSpawn = false;
      this._currentSpawnDelay = this._spawnDelay ?? defaultSpawnDelay;
      this._currentEmitDelay = this._emitDelay ?? defaultEmitDelay;
    }
    if (!this._startParticlesAdded) {
      this._startParticlesAdded = true;
      this._emitParticles(this.options.startCount);
    }
    if (this._duration !== void 0) {
      this._currentDuration += delta.value;
      if (this._currentDuration >= this._duration) {
        this.pause();
        if (this._spawnDelay !== void 0) {
          delete this._spawnDelay;
        }
        if (!this._immortal) {
          this._lifeCount--;
        }
        if (this._lifeCount > minLifeCount || this._immortal) {
          this.position = this._calcPosition();
          (_a = this._shape) == null ? void 0 : _a.resize(this.position, this.size);
          this._spawnDelay = getRangeValue(this.options.life.delay ?? defaultLifeDelay) * millisecondsToSeconds / this.container.retina.reduceFactor;
        } else {
          this._destroy();
        }
        this._currentDuration -= this._duration;
        delete this._duration;
      }
    }
    if (this._spawnDelay !== void 0) {
      this._currentSpawnDelay += delta.value;
      if (this._currentSpawnDelay >= this._spawnDelay) {
        this._engine.dispatchEvent("emitterPlay", {
          container: this.container
        });
        this.play();
        this._currentSpawnDelay -= this._currentSpawnDelay;
        delete this._spawnDelay;
      }
    }
    if (this._emitDelay !== void 0) {
      this._currentEmitDelay += delta.value;
      if (this._currentEmitDelay >= this._emitDelay) {
        this._emit();
        this._currentEmitDelay -= this._emitDelay;
      }
    }
  }
  _calcPosition() {
    if (this.options.domId) {
      const element = document.getElementById(this.options.domId);
      if (element) {
        const elRect = element.getBoundingClientRect(), pxRatio = this.container.retina.pixelRatio;
        return {
          x: (elRect.x + elRect.width * half2) * pxRatio,
          y: (elRect.y + elRect.height * half2) * pxRatio
        };
      }
    }
    return calcPositionOrRandomFromSizeRanged({
      size: this.container.canvas.size,
      position: this.options.position
    });
  }
  _calcSize() {
    const container = this.container;
    if (this.options.domId) {
      const element = document.getElementById(this.options.domId);
      if (element) {
        const elRect = element.getBoundingClientRect();
        return {
          width: elRect.width * container.retina.pixelRatio,
          height: elRect.height * container.retina.pixelRatio,
          mode: PixelMode.precise
        };
      }
    }
    return this.options.size ?? (() => {
      const size = new EmitterSize();
      size.load({
        height: 0,
        mode: PixelMode.percent,
        width: 0
      });
      return size;
    })();
  }
  _emit() {
    if (this._paused) {
      return;
    }
    const quantity = getRangeValue(this.options.rate.quantity);
    this._emitParticles(quantity);
  }
  _emitParticles(quantity) {
    var _a;
    const singleParticlesOptions = itemFromSingleOrMultiple(this._particlesOptions);
    for (let i = 0; i < quantity; i++) {
      const particlesOptions = deepExtend({}, singleParticlesOptions);
      if (this.spawnColor) {
        const hslAnimation = (_a = this.options.spawnColor) == null ? void 0 : _a.animation;
        if (hslAnimation) {
          const maxValues = {
            h: 360,
            s: 100,
            l: 100
          }, colorFactor = 3.6;
          this.spawnColor.h = this._setColorAnimation(hslAnimation.h, this.spawnColor.h, maxValues.h, colorFactor);
          this.spawnColor.s = this._setColorAnimation(hslAnimation.s, this.spawnColor.s, maxValues.s);
          this.spawnColor.l = this._setColorAnimation(hslAnimation.l, this.spawnColor.l, maxValues.l);
        }
        setParticlesOptionsColor(particlesOptions, this.spawnColor);
      }
      const shapeOptions = this.options.shape;
      let position = this.position;
      if (this._shape) {
        const shapePosData = this._shape.randomPosition();
        if (shapePosData) {
          position = shapePosData.position;
          const replaceData = shapeOptions.replace;
          if (replaceData.color && shapePosData.color) {
            setParticlesOptionsColor(particlesOptions, shapePosData.color);
          }
          if (replaceData.opacity) {
            if (particlesOptions.opacity) {
              particlesOptions.opacity.value = shapePosData.opacity;
            } else {
              particlesOptions.opacity = {
                value: shapePosData.opacity
              };
            }
          }
        } else {
          position = null;
        }
      }
      if (position) {
        this.container.particles.addParticle(position, particlesOptions);
      }
    }
  }
};

// node_modules/@tsparticles/plugin-emitters/browser/Emitters.js
var Emitters = class {
  constructor(engine, container) {
    this.container = container;
    this._engine = engine;
    this.array = [];
    this.emitters = [];
    this.interactivityEmitters = {
      random: {
        count: 1,
        enable: false
      },
      value: []
    };
    const defaultIndex2 = 0;
    container.getEmitter = (idxOrName) => idxOrName === void 0 || isNumber(idxOrName) ? this.array[idxOrName ?? defaultIndex2] : this.array.find((t) => t.name === idxOrName);
    container.addEmitter = async (options, position) => this.addEmitter(options, position);
    container.removeEmitter = (idxOrName) => {
      const emitter = container.getEmitter(idxOrName);
      if (emitter) {
        this.removeEmitter(emitter);
      }
    };
    container.playEmitter = (idxOrName) => {
      const emitter = container.getEmitter(idxOrName);
      if (emitter) {
        emitter.externalPlay();
      }
    };
    container.pauseEmitter = (idxOrName) => {
      const emitter = container.getEmitter(idxOrName);
      if (emitter) {
        emitter.externalPause();
      }
    };
  }
  async addEmitter(options, position) {
    const emitterOptions = new Emitter();
    emitterOptions.load(options);
    const emitter = new EmitterInstance(this._engine, this, this.container, emitterOptions, position);
    await emitter.init();
    this.array.push(emitter);
    return emitter;
  }
  handleClickMode(mode) {
    const emitterOptions = this.emitters, modeEmitters = this.interactivityEmitters;
    if (mode !== EmitterClickMode.emitter) {
      return;
    }
    let emittersModeOptions;
    if (modeEmitters && isArray(modeEmitters.value)) {
      const minLength = 0;
      if (modeEmitters.value.length > minLength && modeEmitters.random.enable) {
        emittersModeOptions = [];
        const usedIndexes = [];
        for (let i = 0; i < modeEmitters.random.count; i++) {
          const idx = arrayRandomIndex(modeEmitters.value);
          if (usedIndexes.includes(idx) && usedIndexes.length < modeEmitters.value.length) {
            i--;
            continue;
          }
          usedIndexes.push(idx);
          emittersModeOptions.push(itemFromArray(modeEmitters.value, idx));
        }
      } else {
        emittersModeOptions = modeEmitters.value;
      }
    } else {
      emittersModeOptions = modeEmitters == null ? void 0 : modeEmitters.value;
    }
    const emittersOptions = emittersModeOptions ?? emitterOptions, ePosition = this.container.interactivity.mouse.clickPosition;
    void executeOnSingleOrMultiple(emittersOptions, async (emitter) => {
      await this.addEmitter(emitter, ePosition);
    });
  }
  async init() {
    this.emitters = this.container.actualOptions.emitters;
    this.interactivityEmitters = this.container.actualOptions.interactivity.modes.emitters;
    if (!this.emitters) {
      return;
    }
    if (isArray(this.emitters)) {
      for (const emitterOptions of this.emitters) {
        await this.addEmitter(emitterOptions);
      }
    } else {
      await this.addEmitter(this.emitters);
    }
  }
  pause() {
    for (const emitter of this.array) {
      emitter.pause();
    }
  }
  play() {
    for (const emitter of this.array) {
      emitter.play();
    }
  }
  removeEmitter(emitter) {
    const index = this.array.indexOf(emitter), minIndex2 = 0, deleteCount2 = 1;
    if (index >= minIndex2) {
      this.array.splice(index, deleteCount2);
    }
  }
  resize() {
    for (const emitter of this.array) {
      emitter.resize();
    }
  }
  stop() {
    this.array = [];
  }
  update(delta) {
    for (const emitter of this.array) {
      emitter.update(delta);
    }
  }
};

// node_modules/@tsparticles/plugin-emitters/browser/EmittersPlugin.js
var EmittersPlugin = class {
  constructor(engine) {
    this._engine = engine;
    this.id = "emitters";
  }
  getPlugin(container) {
    return Promise.resolve(new Emitters(this._engine, container));
  }
  loadOptions(options, source) {
    var _a, _b;
    if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
      return;
    }
    if (source == null ? void 0 : source.emitters) {
      options.emitters = executeOnSingleOrMultiple(source.emitters, (emitter) => {
        const tmp = new Emitter();
        tmp.load(emitter);
        return tmp;
      });
    }
    const interactivityEmitters = (_b = (_a = source == null ? void 0 : source.interactivity) == null ? void 0 : _a.modes) == null ? void 0 : _b.emitters;
    if (interactivityEmitters) {
      if (isArray(interactivityEmitters)) {
        options.interactivity.modes.emitters = {
          random: {
            count: 1,
            enable: true
          },
          value: interactivityEmitters.map((s) => {
            const tmp = new Emitter();
            tmp.load(s);
            return tmp;
          })
        };
      } else {
        const emitterMode = interactivityEmitters;
        if (emitterMode.value !== void 0) {
          const defaultCount = 1;
          if (isArray(emitterMode.value)) {
            options.interactivity.modes.emitters = {
              random: {
                count: emitterMode.random.count ?? defaultCount,
                enable: emitterMode.random.enable ?? false
              },
              value: emitterMode.value.map((s) => {
                const tmp = new Emitter();
                tmp.load(s);
                return tmp;
              })
            };
          } else {
            const tmp = new Emitter();
            tmp.load(emitterMode.value);
            options.interactivity.modes.emitters = {
              random: {
                count: emitterMode.random.count ?? defaultCount,
                enable: emitterMode.random.enable ?? false
              },
              value: tmp
            };
          }
        } else {
          const emitterOptions = options.interactivity.modes.emitters = {
            random: {
              count: 1,
              enable: false
            },
            value: new Emitter()
          };
          emitterOptions.value.load(interactivityEmitters);
        }
      }
    }
  }
  needsPlugin(options) {
    var _a, _b, _c;
    if (!options) {
      return false;
    }
    const emitters = options.emitters;
    return isArray(emitters) && !!emitters.length || emitters !== void 0 || !!((_c = (_b = (_a = options.interactivity) == null ? void 0 : _a.events) == null ? void 0 : _b.onClick) == null ? void 0 : _c.mode) && isInArray(EmitterClickMode.emitter, options.interactivity.events.onClick.mode);
  }
};

// node_modules/@tsparticles/plugin-emitters/browser/ShapeManager.js
var shapeGeneratorss = /* @__PURE__ */ new Map();
var ShapeManager = class {
  constructor(engine) {
    this._engine = engine;
  }
  addShapeGenerator(name, generator) {
    if (!this.getShapeGenerator(name)) {
      shapeGeneratorss.set(name, generator);
    }
  }
  getShapeGenerator(name) {
    return shapeGeneratorss.get(name);
  }
  getSupportedShapeGenerators() {
    return shapeGeneratorss.keys();
  }
};

// node_modules/@tsparticles/plugin-emitters/browser/EmitterShapeBase.js
var EmitterShapeBase = class {
  constructor(position, size, fill, options) {
    this.position = position;
    this.size = size;
    this.fill = fill;
    this.options = options;
  }
  resize(position, size) {
    this.position = position;
    this.size = size;
  }
};

// node_modules/@tsparticles/plugin-emitters/browser/index.js
async function loadEmittersPlugin(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  if (!engine.emitterShapeManager) {
    engine.emitterShapeManager = new ShapeManager(engine);
  }
  if (!engine.addEmitterShapeGenerator) {
    engine.addEmitterShapeGenerator = (name, generator) => {
      var _a;
      (_a = engine.emitterShapeManager) == null ? void 0 : _a.addShapeGenerator(name, generator);
    };
  }
  const plugin = new EmittersPlugin(engine);
  await engine.addPlugin(plugin, refresh);
}

// node_modules/@tsparticles/plugin-emitters-shape-circle/browser/EmittersCircleShape.js
var quarter2 = 0.25;
var double3 = 2;
var doublePI2 = Math.PI * double3;
var squareExp3 = 2;
var half3 = 0.5;
var EmittersCircleShape = class extends EmitterShapeBase {
  constructor(position, size, fill, options) {
    super(position, size, fill, options);
  }
  async init() {
  }
  randomPosition() {
    const size = this.size, fill = this.fill, position = this.position, generateTheta = (x, y) => {
      const u = getRandom() * quarter2, theta = Math.atan(y / x * Math.tan(doublePI2 * u)), v = getRandom();
      if (v < quarter2) {
        return theta;
      } else if (v < double3 * quarter2) {
        return Math.PI - theta;
      } else if (v < double3 * quarter2 + quarter2) {
        return Math.PI + theta;
      } else {
        return -theta;
      }
    }, radius = (x, y, theta) => x * y / Math.sqrt((y * Math.cos(theta)) ** squareExp3 + (x * Math.sin(theta)) ** squareExp3), [a, b] = [size.width * half3, size.height * half3], randomTheta = generateTheta(a, b), maxRadius = radius(a, b, randomTheta), randomRadius = fill ? maxRadius * Math.sqrt(getRandom()) : maxRadius;
    return {
      position: {
        x: position.x + randomRadius * Math.cos(randomTheta),
        y: position.y + randomRadius * Math.sin(randomTheta)
      }
    };
  }
};

// node_modules/@tsparticles/plugin-emitters-shape-circle/browser/EmittersCircleShapeGenerator.js
var EmittersCircleShapeGenerator = class {
  generate(position, size, fill, options) {
    return new EmittersCircleShape(position, size, fill, options);
  }
};

// node_modules/@tsparticles/plugin-emitters-shape-circle/browser/index.js
async function loadEmittersShapeCircle(engine, refresh = true) {
  var _a;
  const emittersEngine = engine;
  emittersEngine.checkVersion("3.8.1");
  (_a = emittersEngine.addEmitterShapeGenerator) == null ? void 0 : _a.call(emittersEngine, "circle", new EmittersCircleShapeGenerator());
  await emittersEngine.refresh(refresh);
}

// node_modules/@tsparticles/plugin-emitters-shape-square/browser/EmittersSquareShape.js
var sides = 4;
var Sides;
(function(Sides2) {
  Sides2[Sides2["TopLeft"] = 0] = "TopLeft";
  Sides2[Sides2["TopRight"] = 1] = "TopRight";
  Sides2[Sides2["BottomRight"] = 2] = "BottomRight";
  Sides2[Sides2["BottomLeft"] = 3] = "BottomLeft";
})(Sides || (Sides = {}));
function randomSquareCoordinate(position, offset) {
  return position + offset * (getRandom() - half);
}
var EmittersSquareShape = class extends EmitterShapeBase {
  constructor(position, size, fill, options) {
    super(position, size, fill, options);
  }
  async init() {
  }
  randomPosition() {
    const fill = this.fill, position = this.position, size = this.size;
    if (fill) {
      return {
        position: {
          x: randomSquareCoordinate(position.x, size.width),
          y: randomSquareCoordinate(position.y, size.height)
        }
      };
    } else {
      const halfW = size.width * half, halfH = size.height * half, side = Math.floor(getRandom() * sides), v = (getRandom() - half) * double;
      switch (side) {
        case Sides.TopLeft:
          return {
            position: {
              x: position.x + v * halfW,
              y: position.y - halfH
            }
          };
        case Sides.TopRight:
          return {
            position: {
              x: position.x - halfW,
              y: position.y + v * halfH
            }
          };
        case Sides.BottomRight:
          return {
            position: {
              x: position.x + v * halfW,
              y: position.y + halfH
            }
          };
        case Sides.BottomLeft:
        default:
          return {
            position: {
              x: position.x + halfW,
              y: position.y + v * halfH
            }
          };
      }
    }
  }
};

// node_modules/@tsparticles/plugin-emitters-shape-square/browser/EmittersSquareShapeGenerator.js
var EmittersSquareShapeGenerator = class {
  generate(position, size, fill, options) {
    return new EmittersSquareShape(position, size, fill, options);
  }
};

// node_modules/@tsparticles/plugin-emitters-shape-square/browser/index.js
async function loadEmittersShapeSquare(engine, refresh = true) {
  var _a;
  const emittersEngine = engine;
  emittersEngine.checkVersion("3.8.1");
  (_a = emittersEngine.addEmitterShapeGenerator) == null ? void 0 : _a.call(emittersEngine, "square", new EmittersSquareShapeGenerator());
  await emittersEngine.refresh(refresh);
}

// node_modules/@tsparticles/interaction-external-trail/browser/Options/Classes/Trail.js
var Trail = class {
  constructor() {
    this.delay = 1;
    this.pauseOnStop = false;
    this.quantity = 1;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.delay !== void 0) {
      this.delay = data.delay;
    }
    if (data.quantity !== void 0) {
      this.quantity = data.quantity;
    }
    if (data.particles !== void 0) {
      this.particles = deepExtend({}, data.particles);
    }
    if (data.pauseOnStop !== void 0) {
      this.pauseOnStop = data.pauseOnStop;
    }
  }
};

// node_modules/@tsparticles/interaction-external-trail/browser/TrailMaker.js
var trailMode = "trail";
var TrailMaker = class extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this._delay = 0;
  }
  clear() {
  }
  init() {
  }
  interact(delta) {
    var _a, _b, _c, _d;
    const container = this.container, { interactivity } = container;
    if (!container.retina.reduceFactor) {
      return;
    }
    const options = container.actualOptions, trailOptions = options.interactivity.modes.trail;
    if (!trailOptions) {
      return;
    }
    const optDelay = trailOptions.delay * millisecondsToSeconds / this.container.retina.reduceFactor;
    if (this._delay < optDelay) {
      this._delay += delta.value;
    }
    if (this._delay < optDelay) {
      return;
    }
    const canEmit = !(trailOptions.pauseOnStop && (interactivity.mouse.position === this._lastPosition || ((_a = interactivity.mouse.position) == null ? void 0 : _a.x) === ((_b = this._lastPosition) == null ? void 0 : _b.x) && ((_c = interactivity.mouse.position) == null ? void 0 : _c.y) === ((_d = this._lastPosition) == null ? void 0 : _d.y)));
    const mousePos = container.interactivity.mouse.position;
    if (mousePos) {
      this._lastPosition = { ...mousePos };
    } else {
      delete this._lastPosition;
    }
    if (canEmit) {
      container.particles.push(trailOptions.quantity, container.interactivity.mouse, trailOptions.particles);
    }
    this._delay -= optDelay;
  }
  isEnabled(particle) {
    const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = ((particle == null ? void 0 : particle.interactivity) ?? options.interactivity).events;
    return mouse.clicking && mouse.inside && !!mouse.position && isInArray(trailMode, events.onClick.mode) || mouse.inside && !!mouse.position && isInArray(trailMode, events.onHover.mode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.trail) {
      options.trail = new Trail();
    }
    for (const source of sources) {
      options.trail.load(source == null ? void 0 : source.trail);
    }
  }
  reset() {
  }
};

// node_modules/@tsparticles/interaction-external-trail/browser/index.js
async function loadExternalTrailInteraction(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addInteractor("externalTrail", (container) => {
    return Promise.resolve(new TrailMaker(container));
  }, refresh);
}

// node_modules/@tsparticles/updater-roll/browser/RollMode.js
var RollMode;
(function(RollMode2) {
  RollMode2["both"] = "both";
  RollMode2["horizontal"] = "horizontal";
  RollMode2["vertical"] = "vertical";
})(RollMode || (RollMode = {}));

// node_modules/@tsparticles/updater-roll/browser/Utils.js
var double4 = 2;
var doublePI3 = Math.PI * double4;
var maxAngle2 = 360;
function initParticle(engine, particle) {
  const rollOpt = particle.options.roll;
  if (!(rollOpt == null ? void 0 : rollOpt.enable)) {
    particle.roll = {
      enable: false,
      horizontal: false,
      vertical: false,
      angle: 0,
      speed: 0
    };
    return;
  }
  particle.roll = {
    enable: rollOpt.enable,
    horizontal: rollOpt.mode === RollMode.horizontal || rollOpt.mode === RollMode.both,
    vertical: rollOpt.mode === RollMode.vertical || rollOpt.mode === RollMode.both,
    angle: getRandom() * doublePI3,
    speed: getRangeValue(rollOpt.speed) / maxAngle2
  };
  if (rollOpt.backColor) {
    particle.backColor = rangeColorToHsl(engine, rollOpt.backColor);
  } else if (rollOpt.darken.enable && rollOpt.enlighten.enable) {
    const alterType = getRandom() >= half ? AlterType.darken : AlterType.enlighten;
    particle.roll.alter = {
      type: alterType,
      value: getRangeValue(alterType === AlterType.darken ? rollOpt.darken.value : rollOpt.enlighten.value)
    };
  } else if (rollOpt.darken.enable) {
    particle.roll.alter = {
      type: AlterType.darken,
      value: getRangeValue(rollOpt.darken.value)
    };
  } else if (rollOpt.enlighten.enable) {
    particle.roll.alter = {
      type: AlterType.enlighten,
      value: getRangeValue(rollOpt.enlighten.value)
    };
  }
}
function updateRoll(particle, delta) {
  const roll = particle.options.roll, data = particle.roll;
  if (!data || !(roll == null ? void 0 : roll.enable)) {
    return;
  }
  const speed = data.speed * delta.factor, max = doublePI3;
  data.angle += speed;
  if (data.angle > max) {
    data.angle -= max;
  }
}

// node_modules/@tsparticles/updater-roll/browser/Options/Classes/RollLight.js
var RollLight = class {
  constructor() {
    this.enable = false;
    this.value = 0;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.value !== void 0) {
      this.value = setRangeValue(data.value);
    }
  }
};

// node_modules/@tsparticles/updater-roll/browser/Options/Classes/Roll.js
var Roll = class {
  constructor() {
    this.darken = new RollLight();
    this.enable = false;
    this.enlighten = new RollLight();
    this.mode = RollMode.vertical;
    this.speed = 25;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.backColor !== void 0) {
      this.backColor = OptionsColor.create(this.backColor, data.backColor);
    }
    this.darken.load(data.darken);
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    this.enlighten.load(data.enlighten);
    if (data.mode !== void 0) {
      this.mode = data.mode;
    }
    if (data.speed !== void 0) {
      this.speed = setRangeValue(data.speed);
    }
  }
};

// node_modules/@tsparticles/updater-roll/browser/RollUpdater.js
var RollUpdater = class {
  constructor(engine) {
    this._engine = engine;
  }
  getTransformValues(particle) {
    var _a;
    const roll = ((_a = particle.roll) == null ? void 0 : _a.enable) && particle.roll, rollHorizontal = roll && roll.horizontal, rollVertical = roll && roll.vertical;
    return {
      a: rollHorizontal ? Math.cos(roll.angle) : void 0,
      d: rollVertical ? Math.sin(roll.angle) : void 0
    };
  }
  init(particle) {
    initParticle(this._engine, particle);
  }
  isEnabled(particle) {
    const roll = particle.options.roll;
    return !particle.destroyed && !particle.spawning && !!(roll == null ? void 0 : roll.enable);
  }
  loadOptions(options, ...sources) {
    if (!options.roll) {
      options.roll = new Roll();
    }
    for (const source of sources) {
      options.roll.load(source == null ? void 0 : source.roll);
    }
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateRoll(particle, delta);
  }
};

// node_modules/@tsparticles/updater-roll/browser/index.js
async function loadRollUpdater(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addParticleUpdater("roll", () => {
    return Promise.resolve(new RollUpdater(engine));
  }, refresh);
}

// node_modules/@tsparticles/move-base/browser/Utils.js
var half4 = 0.5;
var double5 = 2;
var minVelocity3 = 0;
var identity2 = 1;
var moveSpeedFactor = 60;
var minSpinRadius = 0;
var spinFactor = 0.01;
var doublePI4 = Math.PI * double5;
function applyDistance(particle) {
  const initialPosition = particle.initialPosition, { dx, dy } = getDistances(initialPosition, particle.position), dxFixed = Math.abs(dx), dyFixed = Math.abs(dy), { maxDistance } = particle.retina, hDistance = maxDistance.horizontal, vDistance = maxDistance.vertical;
  if (!hDistance && !vDistance) {
    return;
  }
  const hasHDistance = (hDistance && dxFixed >= hDistance) ?? false, hasVDistance = (vDistance && dyFixed >= vDistance) ?? false;
  if ((hasHDistance || hasVDistance) && !particle.misplaced) {
    particle.misplaced = !!hDistance && dxFixed > hDistance || !!vDistance && dyFixed > vDistance;
    if (hDistance) {
      particle.velocity.x = particle.velocity.y * half4 - particle.velocity.x;
    }
    if (vDistance) {
      particle.velocity.y = particle.velocity.x * half4 - particle.velocity.y;
    }
  } else if ((!hDistance || dxFixed < hDistance) && (!vDistance || dyFixed < vDistance) && particle.misplaced) {
    particle.misplaced = false;
  } else if (particle.misplaced) {
    const pos = particle.position, vel = particle.velocity;
    if (hDistance && (pos.x < initialPosition.x && vel.x < minVelocity3 || pos.x > initialPosition.x && vel.x > minVelocity3)) {
      vel.x *= -getRandom();
    }
    if (vDistance && (pos.y < initialPosition.y && vel.y < minVelocity3 || pos.y > initialPosition.y && vel.y > minVelocity3)) {
      vel.y *= -getRandom();
    }
  }
}
function move(particle, moveOptions, moveSpeed, maxSpeed, moveDrift, delta) {
  applyPath(particle, delta);
  const gravityOptions = particle.gravity, gravityFactor = (gravityOptions == null ? void 0 : gravityOptions.enable) && gravityOptions.inverse ? -identity2 : identity2;
  if (moveDrift && moveSpeed) {
    particle.velocity.x += moveDrift * delta.factor / (moveSpeedFactor * moveSpeed);
  }
  if ((gravityOptions == null ? void 0 : gravityOptions.enable) && moveSpeed) {
    particle.velocity.y += gravityFactor * (gravityOptions.acceleration * delta.factor) / (moveSpeedFactor * moveSpeed);
  }
  const decay = particle.moveDecay;
  particle.velocity.multTo(decay);
  const velocity = particle.velocity.mult(moveSpeed);
  if ((gravityOptions == null ? void 0 : gravityOptions.enable) && maxSpeed > minVelocity3 && (!gravityOptions.inverse && velocity.y >= minVelocity3 && velocity.y >= maxSpeed || gravityOptions.inverse && velocity.y <= minVelocity3 && velocity.y <= -maxSpeed)) {
    velocity.y = gravityFactor * maxSpeed;
    if (moveSpeed) {
      particle.velocity.y = velocity.y / moveSpeed;
    }
  }
  const zIndexOptions = particle.options.zIndex, zVelocityFactor = (identity2 - particle.zIndexFactor) ** zIndexOptions.velocityRate;
  velocity.multTo(zVelocityFactor);
  const { position } = particle;
  position.addTo(velocity);
  if (moveOptions.vibrate) {
    position.x += Math.sin(position.x * Math.cos(position.y));
    position.y += Math.cos(position.y * Math.sin(position.x));
  }
}
function spin(particle, moveSpeed) {
  const container = particle.container;
  if (!particle.spin) {
    return;
  }
  const spinClockwise = particle.spin.direction === RotateDirection.clockwise, updateFunc = {
    x: spinClockwise ? Math.cos : Math.sin,
    y: spinClockwise ? Math.sin : Math.cos
  };
  particle.position.x = particle.spin.center.x + particle.spin.radius * updateFunc.x(particle.spin.angle);
  particle.position.y = particle.spin.center.y + particle.spin.radius * updateFunc.y(particle.spin.angle);
  particle.spin.radius += particle.spin.acceleration;
  const maxCanvasSize = Math.max(container.canvas.size.width, container.canvas.size.height), halfMaxSize = maxCanvasSize * half4;
  if (particle.spin.radius > halfMaxSize) {
    particle.spin.radius = halfMaxSize;
    particle.spin.acceleration *= -identity2;
  } else if (particle.spin.radius < minSpinRadius) {
    particle.spin.radius = minSpinRadius;
    particle.spin.acceleration *= -identity2;
  }
  particle.spin.angle += moveSpeed * spinFactor * (identity2 - particle.spin.radius / maxCanvasSize);
}
function applyPath(particle, delta) {
  var _a;
  const particlesOptions = particle.options, pathOptions = particlesOptions.move.path, pathEnabled = pathOptions.enable;
  if (!pathEnabled) {
    return;
  }
  if (particle.lastPathTime <= particle.pathDelay) {
    particle.lastPathTime += delta.value;
    return;
  }
  const path = (_a = particle.pathGenerator) == null ? void 0 : _a.generate(particle, delta);
  if (path) {
    particle.velocity.addTo(path);
  }
  if (pathOptions.clamp) {
    particle.velocity.x = clamp(particle.velocity.x, -identity2, identity2);
    particle.velocity.y = clamp(particle.velocity.y, -identity2, identity2);
  }
  particle.lastPathTime -= particle.pathDelay;
}
function getProximitySpeedFactor(particle) {
  return particle.slow.inRange ? particle.slow.factor : identity2;
}
function initSpin(particle) {
  const container = particle.container, options = particle.options, spinOptions = options.move.spin;
  if (!spinOptions.enable) {
    return;
  }
  const spinPos = spinOptions.position ?? { x: 50, y: 50 }, spinFactor2 = 0.01, spinCenter = {
    x: spinPos.x * spinFactor2 * container.canvas.size.width,
    y: spinPos.y * spinFactor2 * container.canvas.size.height
  }, pos = particle.getPosition(), distance = getDistance(pos, spinCenter), spinAcceleration = getRangeValue(spinOptions.acceleration);
  particle.retina.spinAcceleration = spinAcceleration * container.retina.pixelRatio;
  particle.spin = {
    center: spinCenter,
    direction: particle.velocity.x >= minVelocity3 ? RotateDirection.clockwise : RotateDirection.counterClockwise,
    angle: getRandom() * doublePI4,
    radius: distance,
    acceleration: particle.retina.spinAcceleration
  };
}

// node_modules/@tsparticles/move-base/browser/BaseMover.js
var diffFactor = 2;
var defaultSizeFactor = 1;
var defaultDeltaFactor = 1;
var BaseMover = class {
  init(particle) {
    const options = particle.options, gravityOptions = options.move.gravity;
    particle.gravity = {
      enable: gravityOptions.enable,
      acceleration: getRangeValue(gravityOptions.acceleration),
      inverse: gravityOptions.inverse
    };
    initSpin(particle);
  }
  isEnabled(particle) {
    return !particle.destroyed && particle.options.move.enable;
  }
  move(particle, delta) {
    var _a, _b;
    const particleOptions = particle.options, moveOptions = particleOptions.move;
    if (!moveOptions.enable) {
      return;
    }
    const container = particle.container, pxRatio = container.retina.pixelRatio;
    (_a = particle.retina).moveSpeed ?? (_a.moveSpeed = getRangeValue(moveOptions.speed) * pxRatio);
    (_b = particle.retina).moveDrift ?? (_b.moveDrift = getRangeValue(particle.options.move.drift) * pxRatio);
    const slowFactor = getProximitySpeedFactor(particle), baseSpeed = particle.retina.moveSpeed * container.retina.reduceFactor, moveDrift = particle.retina.moveDrift, maxSize = getRangeMax(particleOptions.size.value) * pxRatio, sizeFactor2 = moveOptions.size ? particle.getRadius() / maxSize : defaultSizeFactor, deltaFactor = delta.factor || defaultDeltaFactor, moveSpeed = baseSpeed * sizeFactor2 * slowFactor * deltaFactor / diffFactor, maxSpeed = particle.retina.maxSpeed ?? container.retina.maxSpeed;
    if (moveOptions.spin.enable) {
      spin(particle, moveSpeed);
    } else {
      move(particle, moveOptions, moveSpeed, maxSpeed, moveDrift, delta);
    }
    applyDistance(particle);
  }
};

// node_modules/@tsparticles/move-base/browser/index.js
async function loadBaseMover(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addMover("base", () => {
    return Promise.resolve(new BaseMover());
  }, refresh);
}

// node_modules/@tsparticles/shape-circle/browser/Utils.js
var double6 = 2;
var doublePI5 = Math.PI * double6;
var minAngle2 = 0;
var origin = { x: 0, y: 0 };
function drawCircle(data) {
  const { context, particle, radius } = data;
  if (!particle.circleRange) {
    particle.circleRange = { min: minAngle2, max: doublePI5 };
  }
  const circleRange = particle.circleRange;
  context.arc(origin.x, origin.y, radius, circleRange.min, circleRange.max, false);
}

// node_modules/@tsparticles/shape-circle/browser/CircleDrawer.js
var sides2 = 12;
var maxAngle3 = 360;
var minAngle3 = 0;
var CircleDrawer = class {
  constructor() {
    this.validTypes = ["circle"];
  }
  draw(data) {
    drawCircle(data);
  }
  getSidesCount() {
    return sides2;
  }
  particleInit(container, particle) {
    const shapeData = particle.shapeData, angle = (shapeData == null ? void 0 : shapeData.angle) ?? {
      max: maxAngle3,
      min: minAngle3
    };
    particle.circleRange = !isObject(angle) ? {
      min: minAngle3,
      max: degToRad(angle)
    } : { min: degToRad(angle.min), max: degToRad(angle.max) };
  }
};

// node_modules/@tsparticles/shape-circle/browser/index.js
async function loadCircleShape(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addShape(new CircleDrawer(), refresh);
}

// node_modules/@tsparticles/updater-color/browser/ColorUpdater.js
var ColorUpdater = class {
  constructor(container, engine) {
    this._container = container;
    this._engine = engine;
  }
  init(particle) {
    const hslColor = rangeColorToHsl(this._engine, particle.options.color, particle.id, particle.options.reduceDuplicates);
    if (hslColor) {
      particle.color = getHslAnimationFromHsl(hslColor, particle.options.color.animation, this._container.retina.reduceFactor);
    }
  }
  isEnabled(particle) {
    const { h: hAnimation, s: sAnimation, l: lAnimation } = particle.options.color.animation, { color } = particle;
    return !particle.destroyed && !particle.spawning && ((color == null ? void 0 : color.h.value) !== void 0 && hAnimation.enable || (color == null ? void 0 : color.s.value) !== void 0 && sAnimation.enable || (color == null ? void 0 : color.l.value) !== void 0 && lAnimation.enable);
  }
  update(particle, delta) {
    updateColor(particle.color, delta);
  }
};

// node_modules/@tsparticles/updater-color/browser/index.js
async function loadColorUpdater(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addParticleUpdater("color", (container) => {
    return Promise.resolve(new ColorUpdater(container, engine));
  }, refresh);
}

// node_modules/@tsparticles/plugin-hex-color/browser/HexColorManager.js
var RgbIndexes;
(function(RgbIndexes3) {
  RgbIndexes3[RgbIndexes3["r"] = 1] = "r";
  RgbIndexes3[RgbIndexes3["g"] = 2] = "g";
  RgbIndexes3[RgbIndexes3["b"] = 3] = "b";
  RgbIndexes3[RgbIndexes3["a"] = 4] = "a";
})(RgbIndexes || (RgbIndexes = {}));
var shorthandHexRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
var hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
var hexRadix = 16;
var defaultAlpha = 1;
var alphaFactor = 255;
var HexColorManager = class {
  constructor() {
    this.key = "hex";
    this.stringPrefix = "#";
  }
  handleColor(color) {
    return this._parseString(color.value);
  }
  handleRangeColor(color) {
    return this._parseString(color.value);
  }
  parseString(input) {
    return this._parseString(input);
  }
  _parseString(hexColor) {
    if (typeof hexColor !== "string") {
      return;
    }
    if (!(hexColor == null ? void 0 : hexColor.startsWith(this.stringPrefix))) {
      return;
    }
    const hexFixed = hexColor.replace(shorthandHexRegex, (_, r, g, b, a) => {
      return r + r + g + g + b + b + (a !== void 0 ? a + a : "");
    }), result = hexRegex.exec(hexFixed);
    return result ? {
      a: result[RgbIndexes.a] !== void 0 ? parseInt(result[RgbIndexes.a], hexRadix) / alphaFactor : defaultAlpha,
      b: parseInt(result[RgbIndexes.b], hexRadix),
      g: parseInt(result[RgbIndexes.g], hexRadix),
      r: parseInt(result[RgbIndexes.r], hexRadix)
    } : void 0;
  }
};

// node_modules/@tsparticles/plugin-hex-color/browser/index.js
async function loadHexColorPlugin(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addColorManager(new HexColorManager(), refresh);
}

// node_modules/@tsparticles/plugin-hsl-color/browser/HslColorManager.js
var HslIndexes;
(function(HslIndexes2) {
  HslIndexes2[HslIndexes2["h"] = 1] = "h";
  HslIndexes2[HslIndexes2["s"] = 2] = "s";
  HslIndexes2[HslIndexes2["l"] = 3] = "l";
  HslIndexes2[HslIndexes2["a"] = 5] = "a";
})(HslIndexes || (HslIndexes = {}));
var HslColorManager = class {
  constructor() {
    this.key = "hsl";
    this.stringPrefix = "hsl";
  }
  handleColor(color) {
    const colorValue = color.value, hslColor = colorValue.hsl ?? color.value;
    if (hslColor.h !== void 0 && hslColor.s !== void 0 && hslColor.l !== void 0) {
      return hslToRgb(hslColor);
    }
  }
  handleRangeColor(color) {
    const colorValue = color.value, hslColor = colorValue.hsl ?? color.value;
    if (hslColor.h !== void 0 && hslColor.l !== void 0) {
      return hslToRgb({
        h: getRangeValue(hslColor.h),
        l: getRangeValue(hslColor.l),
        s: getRangeValue(hslColor.s)
      });
    }
  }
  parseString(input) {
    if (!input.startsWith("hsl")) {
      return;
    }
    const regex = /hsla?\(\s*(\d+)\s*[\s,]\s*(\d+)%\s*[\s,]\s*(\d+)%\s*([\s,]\s*(0|1|0?\.\d+|(\d{1,3})%)\s*)?\)/i, result = regex.exec(input), minLength = 4, defaultAlpha3 = 1, radix = 10;
    return result ? hslaToRgba({
      a: result.length > minLength ? parseAlpha(result[HslIndexes.a]) : defaultAlpha3,
      h: parseInt(result[HslIndexes.h], radix),
      l: parseInt(result[HslIndexes.l], radix),
      s: parseInt(result[HslIndexes.s], radix)
    }) : void 0;
  }
};

// node_modules/@tsparticles/plugin-hsl-color/browser/index.js
async function loadHslColorPlugin(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addColorManager(new HslColorManager(), refresh);
}

// node_modules/@tsparticles/updater-opacity/browser/OpacityUpdater.js
var OpacityUpdater = class {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const opacityOptions = particle.options.opacity, pxRatio = 1;
    particle.opacity = initParticleNumericAnimationValue(opacityOptions, pxRatio);
    const opacityAnimation = opacityOptions.animation;
    if (opacityAnimation.enable) {
      particle.opacity.velocity = getRangeValue(opacityAnimation.speed) / percentDenominator * this.container.retina.reduceFactor;
      if (!opacityAnimation.sync) {
        particle.opacity.velocity *= getRandom();
      }
    }
  }
  isEnabled(particle) {
    const none2 = 0;
    return !particle.destroyed && !particle.spawning && !!particle.opacity && particle.opacity.enable && ((particle.opacity.maxLoops ?? none2) <= none2 || (particle.opacity.maxLoops ?? none2) > none2 && (particle.opacity.loops ?? none2) < (particle.opacity.maxLoops ?? none2));
  }
  reset(particle) {
    if (particle.opacity) {
      particle.opacity.time = 0;
      particle.opacity.loops = 0;
    }
  }
  update(particle, delta) {
    if (!this.isEnabled(particle) || !particle.opacity) {
      return;
    }
    updateAnimation(particle, particle.opacity, true, particle.options.opacity.animation.destroy, delta);
  }
};

// node_modules/@tsparticles/updater-opacity/browser/index.js
async function loadOpacityUpdater(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addParticleUpdater("opacity", (container) => {
    return Promise.resolve(new OpacityUpdater(container));
  }, refresh);
}

// node_modules/@tsparticles/updater-out-modes/browser/Utils.js
var minVelocity4 = 0;
var boundsMin = 0;
function bounceHorizontal(data) {
  if (data.outMode !== OutMode.bounce && data.outMode !== OutMode.split || data.direction !== OutModeDirection.left && data.direction !== OutModeDirection.right) {
    return;
  }
  if (data.bounds.right < boundsMin && data.direction === OutModeDirection.left) {
    data.particle.position.x = data.size + data.offset.x;
  } else if (data.bounds.left > data.canvasSize.width && data.direction === OutModeDirection.right) {
    data.particle.position.x = data.canvasSize.width - data.size - data.offset.x;
  }
  const velocity = data.particle.velocity.x;
  let bounced = false;
  if (data.direction === OutModeDirection.right && data.bounds.right >= data.canvasSize.width && velocity > minVelocity4 || data.direction === OutModeDirection.left && data.bounds.left <= boundsMin && velocity < minVelocity4) {
    const newVelocity = getRangeValue(data.particle.options.bounce.horizontal.value);
    data.particle.velocity.x *= -newVelocity;
    bounced = true;
  }
  if (!bounced) {
    return;
  }
  const minPos = data.offset.x + data.size;
  if (data.bounds.right >= data.canvasSize.width && data.direction === OutModeDirection.right) {
    data.particle.position.x = data.canvasSize.width - minPos;
  } else if (data.bounds.left <= boundsMin && data.direction === OutModeDirection.left) {
    data.particle.position.x = minPos;
  }
  if (data.outMode === OutMode.split) {
    data.particle.destroy();
  }
}
function bounceVertical(data) {
  if (data.outMode !== OutMode.bounce && data.outMode !== OutMode.split || data.direction !== OutModeDirection.bottom && data.direction !== OutModeDirection.top) {
    return;
  }
  if (data.bounds.bottom < boundsMin && data.direction === OutModeDirection.top) {
    data.particle.position.y = data.size + data.offset.y;
  } else if (data.bounds.top > data.canvasSize.height && data.direction === OutModeDirection.bottom) {
    data.particle.position.y = data.canvasSize.height - data.size - data.offset.y;
  }
  const velocity = data.particle.velocity.y;
  let bounced = false;
  if (data.direction === OutModeDirection.bottom && data.bounds.bottom >= data.canvasSize.height && velocity > minVelocity4 || data.direction === OutModeDirection.top && data.bounds.top <= boundsMin && velocity < minVelocity4) {
    const newVelocity = getRangeValue(data.particle.options.bounce.vertical.value);
    data.particle.velocity.y *= -newVelocity;
    bounced = true;
  }
  if (!bounced) {
    return;
  }
  const minPos = data.offset.y + data.size;
  if (data.bounds.bottom >= data.canvasSize.height && data.direction === OutModeDirection.bottom) {
    data.particle.position.y = data.canvasSize.height - minPos;
  } else if (data.bounds.top <= boundsMin && data.direction === OutModeDirection.top) {
    data.particle.position.y = minPos;
  }
  if (data.outMode === OutMode.split) {
    data.particle.destroy();
  }
}

// node_modules/@tsparticles/updater-out-modes/browser/BounceOutMode.js
var BounceOutMode = class {
  constructor(container) {
    this.container = container;
    this.modes = [
      OutMode.bounce,
      OutMode.split
    ];
  }
  update(particle, direction, delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }
    const container = this.container;
    let handled = false;
    for (const plugin of container.plugins.values()) {
      if (plugin.particleBounce !== void 0) {
        handled = plugin.particleBounce(particle, delta, direction);
      }
      if (handled) {
        break;
      }
    }
    if (handled) {
      return;
    }
    const pos = particle.getPosition(), offset = particle.offset, size = particle.getRadius(), bounds = calculateBounds(pos, size), canvasSize = container.canvas.size;
    bounceHorizontal({ particle, outMode, direction, bounds, canvasSize, offset, size });
    bounceVertical({ particle, outMode, direction, bounds, canvasSize, offset, size });
  }
};

// node_modules/@tsparticles/updater-out-modes/browser/DestroyOutMode.js
var minVelocity5 = 0;
var DestroyOutMode = class {
  constructor(container) {
    this.container = container;
    this.modes = [OutMode.destroy];
  }
  update(particle, direction, _delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }
    const container = this.container;
    switch (particle.outType) {
      case ParticleOutType.normal:
      case ParticleOutType.outside:
        if (isPointInside(particle.position, container.canvas.size, Vector.origin, particle.getRadius(), direction)) {
          return;
        }
        break;
      case ParticleOutType.inside: {
        const { dx, dy } = getDistances(particle.position, particle.moveCenter), { x: vx, y: vy } = particle.velocity;
        if (vx < minVelocity5 && dx > particle.moveCenter.radius || vy < minVelocity5 && dy > particle.moveCenter.radius || vx >= minVelocity5 && dx < -particle.moveCenter.radius || vy >= minVelocity5 && dy < -particle.moveCenter.radius) {
          return;
        }
        break;
      }
    }
    container.particles.remove(particle, particle.group, true);
  }
};

// node_modules/@tsparticles/updater-out-modes/browser/NoneOutMode.js
var minVelocity6 = 0;
var NoneOutMode = class {
  constructor(container) {
    this.container = container;
    this.modes = [OutMode.none];
  }
  update(particle, direction, delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }
    if ((particle.options.move.distance.horizontal && (direction === OutModeDirection.left || direction === OutModeDirection.right)) ?? (particle.options.move.distance.vertical && (direction === OutModeDirection.top || direction === OutModeDirection.bottom))) {
      return;
    }
    const gravityOptions = particle.options.move.gravity, container = this.container, canvasSize = container.canvas.size, pRadius = particle.getRadius();
    if (!gravityOptions.enable) {
      if (particle.velocity.y > minVelocity6 && particle.position.y <= canvasSize.height + pRadius || particle.velocity.y < minVelocity6 && particle.position.y >= -pRadius || particle.velocity.x > minVelocity6 && particle.position.x <= canvasSize.width + pRadius || particle.velocity.x < minVelocity6 && particle.position.x >= -pRadius) {
        return;
      }
      if (!isPointInside(particle.position, container.canvas.size, Vector.origin, pRadius, direction)) {
        container.particles.remove(particle);
      }
    } else {
      const position = particle.position;
      if (!gravityOptions.inverse && position.y > canvasSize.height + pRadius && direction === OutModeDirection.bottom || gravityOptions.inverse && position.y < -pRadius && direction === OutModeDirection.top) {
        container.particles.remove(particle);
      }
    }
  }
};

// node_modules/@tsparticles/updater-out-modes/browser/OutOutMode.js
var minVelocity7 = 0;
var minDistance = 0;
var OutOutMode = class {
  constructor(container) {
    this.container = container;
    this.modes = [OutMode.out];
  }
  update(particle, direction, delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }
    const container = this.container;
    switch (particle.outType) {
      case ParticleOutType.inside: {
        const { x: vx, y: vy } = particle.velocity;
        const circVec = Vector.origin;
        circVec.length = particle.moveCenter.radius;
        circVec.angle = particle.velocity.angle + Math.PI;
        circVec.addTo(Vector.create(particle.moveCenter));
        const { dx, dy } = getDistances(particle.position, circVec);
        if (vx <= minVelocity7 && dx >= minDistance || vy <= minVelocity7 && dy >= minDistance || vx >= minVelocity7 && dx <= minDistance || vy >= minVelocity7 && dy <= minDistance) {
          return;
        }
        particle.position.x = Math.floor(randomInRange({
          min: 0,
          max: container.canvas.size.width
        }));
        particle.position.y = Math.floor(randomInRange({
          min: 0,
          max: container.canvas.size.height
        }));
        const { dx: newDx, dy: newDy } = getDistances(particle.position, particle.moveCenter);
        particle.direction = Math.atan2(-newDy, -newDx);
        particle.velocity.angle = particle.direction;
        break;
      }
      default: {
        if (isPointInside(particle.position, container.canvas.size, Vector.origin, particle.getRadius(), direction)) {
          return;
        }
        switch (particle.outType) {
          case ParticleOutType.outside: {
            particle.position.x = Math.floor(randomInRange({
              min: -particle.moveCenter.radius,
              max: particle.moveCenter.radius
            })) + particle.moveCenter.x;
            particle.position.y = Math.floor(randomInRange({
              min: -particle.moveCenter.radius,
              max: particle.moveCenter.radius
            })) + particle.moveCenter.y;
            const { dx, dy } = getDistances(particle.position, particle.moveCenter);
            if (particle.moveCenter.radius) {
              particle.direction = Math.atan2(dy, dx);
              particle.velocity.angle = particle.direction;
            }
            break;
          }
          case ParticleOutType.normal: {
            const warp = particle.options.move.warp, canvasSize = container.canvas.size, newPos = {
              bottom: canvasSize.height + particle.getRadius() + particle.offset.y,
              left: -particle.getRadius() - particle.offset.x,
              right: canvasSize.width + particle.getRadius() + particle.offset.x,
              top: -particle.getRadius() - particle.offset.y
            }, sizeValue = particle.getRadius(), nextBounds = calculateBounds(particle.position, sizeValue);
            if (direction === OutModeDirection.right && nextBounds.left > canvasSize.width + particle.offset.x) {
              particle.position.x = newPos.left;
              particle.initialPosition.x = particle.position.x;
              if (!warp) {
                particle.position.y = getRandom() * canvasSize.height;
                particle.initialPosition.y = particle.position.y;
              }
            } else if (direction === OutModeDirection.left && nextBounds.right < -particle.offset.x) {
              particle.position.x = newPos.right;
              particle.initialPosition.x = particle.position.x;
              if (!warp) {
                particle.position.y = getRandom() * canvasSize.height;
                particle.initialPosition.y = particle.position.y;
              }
            }
            if (direction === OutModeDirection.bottom && nextBounds.top > canvasSize.height + particle.offset.y) {
              if (!warp) {
                particle.position.x = getRandom() * canvasSize.width;
                particle.initialPosition.x = particle.position.x;
              }
              particle.position.y = newPos.top;
              particle.initialPosition.y = particle.position.y;
            } else if (direction === OutModeDirection.top && nextBounds.bottom < -particle.offset.y) {
              if (!warp) {
                particle.position.x = getRandom() * canvasSize.width;
                particle.initialPosition.x = particle.position.x;
              }
              particle.position.y = newPos.bottom;
              particle.initialPosition.y = particle.position.y;
            }
            break;
          }
        }
        break;
      }
    }
  }
};

// node_modules/@tsparticles/updater-out-modes/browser/OutOfCanvasUpdater.js
var checkOutMode = (outModes, outMode) => {
  return outModes.default === outMode || outModes.bottom === outMode || outModes.left === outMode || outModes.right === outMode || outModes.top === outMode;
};
var OutOfCanvasUpdater = class {
  constructor(container) {
    this._addUpdaterIfMissing = (particle, outMode, getUpdater) => {
      const outModes = particle.options.move.outModes;
      if (!this.updaters.has(outMode) && checkOutMode(outModes, outMode)) {
        this.updaters.set(outMode, getUpdater(this.container));
      }
    };
    this._updateOutMode = (particle, delta, outMode, direction) => {
      for (const updater of this.updaters.values()) {
        updater.update(particle, direction, delta, outMode);
      }
    };
    this.container = container;
    this.updaters = /* @__PURE__ */ new Map();
  }
  init(particle) {
    this._addUpdaterIfMissing(particle, OutMode.bounce, (container) => new BounceOutMode(container));
    this._addUpdaterIfMissing(particle, OutMode.out, (container) => new OutOutMode(container));
    this._addUpdaterIfMissing(particle, OutMode.destroy, (container) => new DestroyOutMode(container));
    this._addUpdaterIfMissing(particle, OutMode.none, (container) => new NoneOutMode(container));
  }
  isEnabled(particle) {
    return !particle.destroyed && !particle.spawning;
  }
  update(particle, delta) {
    const outModes = particle.options.move.outModes;
    this._updateOutMode(particle, delta, outModes.bottom ?? outModes.default, OutModeDirection.bottom);
    this._updateOutMode(particle, delta, outModes.left ?? outModes.default, OutModeDirection.left);
    this._updateOutMode(particle, delta, outModes.right ?? outModes.default, OutModeDirection.right);
    this._updateOutMode(particle, delta, outModes.top ?? outModes.default, OutModeDirection.top);
  }
};

// node_modules/@tsparticles/updater-out-modes/browser/index.js
async function loadOutModesUpdater(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addParticleUpdater("outModes", (container) => {
    return Promise.resolve(new OutOfCanvasUpdater(container));
  }, refresh);
}

// node_modules/@tsparticles/plugin-rgb-color/browser/RgbColorManager.js
var RgbIndexes2;
(function(RgbIndexes3) {
  RgbIndexes3[RgbIndexes3["r"] = 1] = "r";
  RgbIndexes3[RgbIndexes3["g"] = 2] = "g";
  RgbIndexes3[RgbIndexes3["b"] = 3] = "b";
  RgbIndexes3[RgbIndexes3["a"] = 5] = "a";
})(RgbIndexes2 || (RgbIndexes2 = {}));
var RgbColorManager = class {
  constructor() {
    this.key = "rgb";
    this.stringPrefix = "rgb";
  }
  handleColor(color) {
    const colorValue = color.value, rgbColor = colorValue.rgb ?? color.value;
    if (rgbColor.r !== void 0) {
      return rgbColor;
    }
  }
  handleRangeColor(color) {
    const colorValue = color.value, rgbColor = colorValue.rgb ?? color.value;
    if (rgbColor.r !== void 0) {
      return {
        r: getRangeValue(rgbColor.r),
        g: getRangeValue(rgbColor.g),
        b: getRangeValue(rgbColor.b)
      };
    }
  }
  parseString(input) {
    if (!input.startsWith(this.stringPrefix)) {
      return;
    }
    const regex = /rgba?\(\s*(\d{1,3})\s*[\s,]\s*(\d{1,3})\s*[\s,]\s*(\d{1,3})\s*([\s,]\s*(0|1|0?\.\d+|(\d{1,3})%)\s*)?\)/i, result = regex.exec(input), radix = 10, minLength = 4, defaultAlpha3 = 1;
    return result ? {
      a: result.length > minLength ? parseAlpha(result[RgbIndexes2.a]) : defaultAlpha3,
      b: parseInt(result[RgbIndexes2.b], radix),
      g: parseInt(result[RgbIndexes2.g], radix),
      r: parseInt(result[RgbIndexes2.r], radix)
    } : void 0;
  }
};

// node_modules/@tsparticles/plugin-rgb-color/browser/index.js
async function loadRgbColorPlugin(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addColorManager(new RgbColorManager(), refresh);
}

// node_modules/@tsparticles/updater-size/browser/SizeUpdater.js
var minLoops = 0;
var SizeUpdater = class {
  init(particle) {
    const container = particle.container, sizeOptions = particle.options.size, sizeAnimation = sizeOptions.animation;
    if (sizeAnimation.enable) {
      particle.size.velocity = (particle.retina.sizeAnimationSpeed ?? container.retina.sizeAnimationSpeed) / percentDenominator * container.retina.reduceFactor;
      if (!sizeAnimation.sync) {
        particle.size.velocity *= getRandom();
      }
    }
  }
  isEnabled(particle) {
    return !particle.destroyed && !particle.spawning && particle.size.enable && ((particle.size.maxLoops ?? minLoops) <= minLoops || (particle.size.maxLoops ?? minLoops) > minLoops && (particle.size.loops ?? minLoops) < (particle.size.maxLoops ?? minLoops));
  }
  reset(particle) {
    particle.size.loops = minLoops;
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateAnimation(particle, particle.size, true, particle.options.size.animation.destroy, delta);
  }
};

// node_modules/@tsparticles/updater-size/browser/index.js
async function loadSizeUpdater(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addParticleUpdater("size", () => {
    return Promise.resolve(new SizeUpdater());
  }, refresh);
}

// node_modules/@tsparticles/basic/browser/index.js
async function loadBasic(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await loadHexColorPlugin(engine, false);
  await loadHslColorPlugin(engine, false);
  await loadRgbColorPlugin(engine, false);
  await loadBaseMover(engine, false);
  await loadCircleShape(engine, false);
  await loadColorUpdater(engine, false);
  await loadOpacityUpdater(engine, false);
  await loadOutModesUpdater(engine, false);
  await loadSizeUpdater(engine, false);
  await engine.refresh(refresh);
}

// node_modules/@tsparticles/plugin-easing-quad/browser/index.js
async function loadEasingQuadPlugin(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addEasing(EasingType.easeInQuad, (value) => value ** 2, false);
  await engine.addEasing(EasingType.easeOutQuad, (value) => 1 - (1 - value) ** 2, false);
  await engine.addEasing(EasingType.easeInOutQuad, (value) => value < 0.5 ? 2 * value ** 2 : 1 - (-2 * value + 2) ** 2 / 2, false);
  await engine.refresh(refresh);
}

// node_modules/@tsparticles/shape-emoji/browser/Utils.js
function drawEmoji(data, image) {
  const { context, opacity } = data, half13 = 0.5, previousAlpha = context.globalAlpha;
  if (!image) {
    return;
  }
  const diameter = image.width, radius = diameter * half13;
  context.globalAlpha = opacity;
  context.drawImage(image, -radius, -radius, diameter, diameter);
  context.globalAlpha = previousAlpha;
}

// node_modules/@tsparticles/shape-emoji/browser/EmojiDrawer.js
var defaultFont = '"Twemoji Mozilla", Apple Color Emoji, "Segoe UI Emoji", "Noto Color Emoji", "EmojiOne Color"';
var noPadding = 0;
var EmojiDrawer = class {
  constructor() {
    this.validTypes = ["emoji"];
    this._emojiShapeDict = /* @__PURE__ */ new Map();
  }
  destroy() {
    for (const [key, data] of this._emojiShapeDict) {
      if (data instanceof ImageBitmap) {
        data == null ? void 0 : data.close();
      }
      this._emojiShapeDict.delete(key);
    }
  }
  draw(data) {
    const key = data.particle.emojiDataKey;
    if (!key) {
      return;
    }
    const image = this._emojiShapeDict.get(key);
    if (!image) {
      return;
    }
    drawEmoji(data, image);
  }
  async init(container) {
    const options = container.actualOptions, { validTypes } = this;
    if (!validTypes.find((t) => isInArray(t, options.particles.shape.type))) {
      return;
    }
    const promises = [loadFont(defaultFont)], shapeOptions = validTypes.map((t) => options.particles.shape.options[t]).find((t) => !!t);
    if (shapeOptions) {
      executeOnSingleOrMultiple(shapeOptions, (shape) => {
        if (shape.font) {
          promises.push(loadFont(shape.font));
        }
      });
    }
    await Promise.all(promises);
  }
  particleDestroy(particle) {
    particle.emojiDataKey = void 0;
  }
  particleInit(_container, particle) {
    const double19 = 2, shapeData = particle.shapeData;
    if (!(shapeData == null ? void 0 : shapeData.value)) {
      return;
    }
    const emoji = itemFromSingleOrMultiple(shapeData.value, particle.randomIndexData);
    if (!emoji) {
      return;
    }
    const emojiOptions = typeof emoji === "string" ? {
      font: shapeData.font ?? defaultFont,
      padding: shapeData.padding ?? noPadding,
      value: emoji
    } : {
      font: defaultFont,
      padding: noPadding,
      ...shapeData,
      ...emoji
    }, font = emojiOptions.font, value = emojiOptions.value;
    const key = `${value}_${font}`;
    if (this._emojiShapeDict.has(key)) {
      particle.emojiDataKey = key;
      return;
    }
    const padding = emojiOptions.padding * double19, maxSize = getRangeMax(particle.size.value), fullSize = maxSize + padding, canvasSize = fullSize * double19;
    let image;
    if (typeof OffscreenCanvas !== "undefined") {
      const canvas = new OffscreenCanvas(canvasSize, canvasSize), context = canvas.getContext("2d");
      if (!context) {
        return;
      }
      context.font = `400 ${maxSize * double19}px ${font}`;
      context.textBaseline = "middle";
      context.textAlign = "center";
      context.fillText(value, fullSize, fullSize);
      image = canvas.transferToImageBitmap();
    } else {
      const canvas = document.createElement("canvas");
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      const context = canvas.getContext("2d");
      if (!context) {
        return;
      }
      context.font = `400 ${maxSize * double19}px ${font}`;
      context.textBaseline = "middle";
      context.textAlign = "center";
      context.fillText(value, fullSize, fullSize);
      image = canvas;
    }
    this._emojiShapeDict.set(key, image);
    particle.emojiDataKey = key;
  }
};

// node_modules/@tsparticles/shape-emoji/browser/index.js
async function loadEmojiShape(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addShape(new EmojiDrawer(), refresh);
}

// node_modules/@tsparticles/interaction-external-attract/browser/Utils.js
var minFactor = 1;
var identity3 = 1;
var minRadius2 = 0;
function processAttract(engine, container, position, attractRadius, area, queryCb) {
  const attractOptions = container.actualOptions.interactivity.modes.attract;
  if (!attractOptions) {
    return;
  }
  const query = container.particles.quadTree.query(area, queryCb);
  for (const particle of query) {
    const { dx, dy, distance } = getDistances(particle.position, position), velocity = attractOptions.speed * attractOptions.factor, attractFactor2 = clamp(engine.getEasing(attractOptions.easing)(identity3 - distance / attractRadius) * velocity, minFactor, attractOptions.maxSpeed), normVec = Vector.create(!distance ? velocity : dx / distance * attractFactor2, !distance ? velocity : dy / distance * attractFactor2);
    particle.position.subFrom(normVec);
  }
}
function clickAttract(engine, container, enabledCb) {
  if (!container.attract) {
    container.attract = { particles: [] };
  }
  const { attract } = container;
  if (!attract.finish) {
    if (!attract.count) {
      attract.count = 0;
    }
    attract.count++;
    if (attract.count === container.particles.count) {
      attract.finish = true;
    }
  }
  if (attract.clicking) {
    const mousePos = container.interactivity.mouse.clickPosition, attractRadius = container.retina.attractModeDistance;
    if (!attractRadius || attractRadius < minRadius2 || !mousePos) {
      return;
    }
    processAttract(engine, container, mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius), (p) => enabledCb(p));
  } else if (attract.clicking === false) {
    attract.particles = [];
  }
}
function hoverAttract(engine, container, enabledCb) {
  const mousePos = container.interactivity.mouse.position, attractRadius = container.retina.attractModeDistance;
  if (!attractRadius || attractRadius < minRadius2 || !mousePos) {
    return;
  }
  processAttract(engine, container, mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius), (p) => enabledCb(p));
}

// node_modules/@tsparticles/interaction-external-attract/browser/Options/Classes/Attract.js
var Attract = class {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.easing = EasingType.easeOutQuad;
    this.factor = 1;
    this.maxSpeed = 50;
    this.speed = 1;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    if (data.duration !== void 0) {
      this.duration = data.duration;
    }
    if (data.easing !== void 0) {
      this.easing = data.easing;
    }
    if (data.factor !== void 0) {
      this.factor = data.factor;
    }
    if (data.maxSpeed !== void 0) {
      this.maxSpeed = data.maxSpeed;
    }
    if (data.speed !== void 0) {
      this.speed = data.speed;
    }
  }
};

// node_modules/@tsparticles/interaction-external-attract/browser/Attractor.js
var attractMode = "attract";
var Attractor = class extends ExternalInteractorBase {
  constructor(engine, container) {
    super(container);
    this._engine = engine;
    if (!container.attract) {
      container.attract = { particles: [] };
    }
    this.handleClickMode = (mode) => {
      const options = this.container.actualOptions, attract = options.interactivity.modes.attract;
      if (!attract || mode !== attractMode) {
        return;
      }
      if (!container.attract) {
        container.attract = { particles: [] };
      }
      container.attract.clicking = true;
      container.attract.count = 0;
      for (const particle of container.attract.particles) {
        if (!this.isEnabled(particle)) {
          continue;
        }
        particle.velocity.setTo(particle.initialVelocity);
      }
      container.attract.particles = [];
      container.attract.finish = false;
      setTimeout(() => {
        if (container.destroyed) {
          return;
        }
        if (!container.attract) {
          container.attract = { particles: [] };
        }
        container.attract.clicking = false;
      }, attract.duration * millisecondsToSeconds);
    };
  }
  clear() {
  }
  init() {
    const container = this.container, attract = container.actualOptions.interactivity.modes.attract;
    if (!attract) {
      return;
    }
    container.retina.attractModeDistance = attract.distance * container.retina.pixelRatio;
  }
  interact() {
    const container = this.container, options = container.actualOptions, mouseMoveStatus = container.interactivity.status === mouseMoveEvent, events = options.interactivity.events, { enable: hoverEnabled, mode: hoverMode } = events.onHover, { enable: clickEnabled, mode: clickMode } = events.onClick;
    if (mouseMoveStatus && hoverEnabled && isInArray(attractMode, hoverMode)) {
      hoverAttract(this._engine, this.container, (p) => this.isEnabled(p));
    } else if (clickEnabled && isInArray(attractMode, clickMode)) {
      clickAttract(this._engine, this.container, (p) => this.isEnabled(p));
    }
  }
  isEnabled(particle) {
    const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = ((particle == null ? void 0 : particle.interactivity) ?? options.interactivity).events;
    if ((!mouse.position || !events.onHover.enable) && (!mouse.clickPosition || !events.onClick.enable)) {
      return false;
    }
    const hoverMode = events.onHover.mode, clickMode = events.onClick.mode;
    return isInArray(attractMode, hoverMode) || isInArray(attractMode, clickMode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.attract) {
      options.attract = new Attract();
    }
    for (const source of sources) {
      options.attract.load(source == null ? void 0 : source.attract);
    }
  }
  reset() {
  }
};

// node_modules/@tsparticles/interaction-external-attract/browser/index.js
async function loadExternalAttractInteraction(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addInteractor("externalAttract", (container) => {
    return Promise.resolve(new Attractor(engine, container));
  }, refresh);
}

// node_modules/@tsparticles/interaction-external-bounce/browser/Utils.js
var squareExp4 = 2;
var half5 = 0.5;
var halfPI = Math.PI * half5;
var double7 = 2;
var toleranceFactor = 10;
var minRadius3 = 0;
function processBounce(container, position, radius, area, enabledCb) {
  const query = container.particles.quadTree.query(area, enabledCb);
  for (const particle of query) {
    if (area instanceof Circle) {
      circleBounce(circleBounceDataFromParticle(particle), {
        position,
        radius,
        mass: radius ** squareExp4 * halfPI,
        velocity: Vector.origin,
        factor: Vector.origin
      });
    } else if (area instanceof Rectangle) {
      rectBounce(particle, calculateBounds(position, radius));
    }
  }
}
function singleSelectorBounce(container, selector, div, bounceCb) {
  const query = document.querySelectorAll(selector);
  if (!query.length) {
    return;
  }
  query.forEach((item) => {
    const elem = item, pxRatio = container.retina.pixelRatio, pos = {
      x: (elem.offsetLeft + elem.offsetWidth * half5) * pxRatio,
      y: (elem.offsetTop + elem.offsetHeight * half5) * pxRatio
    }, radius = elem.offsetWidth * half5 * pxRatio, tolerance = toleranceFactor * pxRatio, area = div.type === DivType.circle ? new Circle(pos.x, pos.y, radius + tolerance) : new Rectangle(elem.offsetLeft * pxRatio - tolerance, elem.offsetTop * pxRatio - tolerance, elem.offsetWidth * pxRatio + tolerance * double7, elem.offsetHeight * pxRatio + tolerance * double7);
    bounceCb(pos, radius, area);
  });
}
function divBounce(container, divs, bounceMode2, enabledCb) {
  divModeExecute(bounceMode2, divs, (selector, div) => singleSelectorBounce(container, selector, div, (pos, radius, area) => processBounce(container, pos, radius, area, enabledCb)));
}
function mouseBounce(container, enabledCb) {
  const pxRatio = container.retina.pixelRatio, tolerance = toleranceFactor * pxRatio, mousePos = container.interactivity.mouse.position, radius = container.retina.bounceModeDistance;
  if (!radius || radius < minRadius3 || !mousePos) {
    return;
  }
  processBounce(container, mousePos, radius, new Circle(mousePos.x, mousePos.y, radius + tolerance), enabledCb);
}

// node_modules/@tsparticles/interaction-external-bounce/browser/Options/Classes/Bounce.js
var Bounce = class {
  constructor() {
    this.distance = 200;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
  }
};

// node_modules/@tsparticles/interaction-external-bounce/browser/Bouncer.js
var bounceMode = "bounce";
var Bouncer = class extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {
  }
  init() {
    const container = this.container, bounce2 = container.actualOptions.interactivity.modes.bounce;
    if (!bounce2) {
      return;
    }
    container.retina.bounceModeDistance = bounce2.distance * container.retina.pixelRatio;
  }
  interact() {
    const container = this.container, options = container.actualOptions, events = options.interactivity.events, mouseMoveStatus = container.interactivity.status === mouseMoveEvent, hoverEnabled = events.onHover.enable, hoverMode = events.onHover.mode, divs = events.onDiv;
    if (mouseMoveStatus && hoverEnabled && isInArray(bounceMode, hoverMode)) {
      mouseBounce(this.container, (p) => this.isEnabled(p));
    } else {
      divBounce(this.container, divs, bounceMode, (p) => this.isEnabled(p));
    }
  }
  isEnabled(particle) {
    const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = ((particle == null ? void 0 : particle.interactivity) ?? options.interactivity).events, divs = events.onDiv;
    return !!mouse.position && events.onHover.enable && isInArray(bounceMode, events.onHover.mode) || isDivModeEnabled(bounceMode, divs);
  }
  loadModeOptions(options, ...sources) {
    if (!options.bounce) {
      options.bounce = new Bounce();
    }
    for (const source of sources) {
      options.bounce.load(source == null ? void 0 : source.bounce);
    }
  }
  reset() {
  }
};

// node_modules/@tsparticles/interaction-external-bounce/browser/index.js
async function loadExternalBounceInteraction(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addInteractor("externalBounce", (container) => {
    return Promise.resolve(new Bouncer(container));
  }, refresh);
}

// node_modules/@tsparticles/interaction-external-bubble/browser/Options/Classes/BubbleBase.js
var BubbleBase = class {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.mix = false;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    if (data.duration !== void 0) {
      this.duration = data.duration;
    }
    if (data.mix !== void 0) {
      this.mix = data.mix;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
    if (data.color !== void 0) {
      const sourceColor = isArray(this.color) ? void 0 : this.color;
      this.color = executeOnSingleOrMultiple(data.color, (color) => {
        return OptionsColor.create(sourceColor, color);
      });
    }
    if (data.size !== void 0) {
      this.size = data.size;
    }
  }
};

// node_modules/@tsparticles/interaction-external-bubble/browser/Options/Classes/BubbleDiv.js
var BubbleDiv = class extends BubbleBase {
  constructor() {
    super();
    this.selectors = [];
  }
  load(data) {
    super.load(data);
    if (isNull(data)) {
      return;
    }
    if (data.selectors !== void 0) {
      this.selectors = data.selectors;
    }
  }
};

// node_modules/@tsparticles/interaction-external-bubble/browser/Options/Classes/Bubble.js
var Bubble = class extends BubbleBase {
  load(data) {
    super.load(data);
    if (isNull(data)) {
      return;
    }
    this.divs = executeOnSingleOrMultiple(data.divs, (div) => {
      const tmp = new BubbleDiv();
      tmp.load(div);
      return tmp;
    });
  }
};

// node_modules/@tsparticles/interaction-external-bubble/browser/Enums.js
var ProcessBubbleType;
(function(ProcessBubbleType2) {
  ProcessBubbleType2["color"] = "color";
  ProcessBubbleType2["opacity"] = "opacity";
  ProcessBubbleType2["size"] = "size";
})(ProcessBubbleType || (ProcessBubbleType = {}));

// node_modules/@tsparticles/interaction-external-bubble/browser/Utils.js
function calculateBubbleValue(particleValue, modeValue, optionsValue, ratio) {
  if (modeValue >= optionsValue) {
    const value = particleValue + (modeValue - optionsValue) * ratio;
    return clamp(value, particleValue, modeValue);
  } else if (modeValue < optionsValue) {
    const value = particleValue - (optionsValue - modeValue) * ratio;
    return clamp(value, modeValue, particleValue);
  }
}

// node_modules/@tsparticles/interaction-external-bubble/browser/Bubbler.js
var bubbleMode = "bubble";
var minDistance2 = 0;
var defaultClickTime = 0;
var double8 = 2;
var defaultOpacity2 = 1;
var ratioOffset = 1;
var defaultBubbleValue = 0;
var minRatio = 0;
var half6 = 0.5;
var defaultRatio2 = 1;
var Bubbler = class extends ExternalInteractorBase {
  constructor(container, engine) {
    super(container);
    this._clickBubble = () => {
      var _a;
      const container2 = this.container, options = container2.actualOptions, mouseClickPos = container2.interactivity.mouse.clickPosition, bubbleOptions = options.interactivity.modes.bubble;
      if (!bubbleOptions || !mouseClickPos) {
        return;
      }
      if (!container2.bubble) {
        container2.bubble = {};
      }
      const distance = container2.retina.bubbleModeDistance;
      if (!distance || distance < minDistance2) {
        return;
      }
      const query = container2.particles.quadTree.queryCircle(mouseClickPos, distance, (p) => this.isEnabled(p)), { bubble } = container2;
      for (const particle of query) {
        if (!bubble.clicking) {
          continue;
        }
        particle.bubble.inRange = !bubble.durationEnd;
        const pos = particle.getPosition(), distMouse = getDistance(pos, mouseClickPos), timeSpent = ((/* @__PURE__ */ new Date()).getTime() - (container2.interactivity.mouse.clickTime ?? defaultClickTime)) / millisecondsToSeconds;
        if (timeSpent > bubbleOptions.duration) {
          bubble.durationEnd = true;
        }
        if (timeSpent > bubbleOptions.duration * double8) {
          bubble.clicking = false;
          bubble.durationEnd = false;
        }
        const sizeData = {
          bubbleObj: {
            optValue: container2.retina.bubbleModeSize,
            value: particle.bubble.radius
          },
          particlesObj: {
            optValue: getRangeMax(particle.options.size.value) * container2.retina.pixelRatio,
            value: particle.size.value
          },
          type: ProcessBubbleType.size
        };
        this._process(particle, distMouse, timeSpent, sizeData);
        const opacityData = {
          bubbleObj: {
            optValue: bubbleOptions.opacity,
            value: particle.bubble.opacity
          },
          particlesObj: {
            optValue: getRangeMax(particle.options.opacity.value),
            value: ((_a = particle.opacity) == null ? void 0 : _a.value) ?? defaultOpacity2
          },
          type: ProcessBubbleType.opacity
        };
        this._process(particle, distMouse, timeSpent, opacityData);
        if (!bubble.durationEnd && distMouse <= distance) {
          this._hoverBubbleColor(particle, distMouse);
        } else {
          delete particle.bubble.color;
        }
      }
    };
    this._hoverBubble = () => {
      const container2 = this.container, mousePos = container2.interactivity.mouse.position, distance = container2.retina.bubbleModeDistance;
      if (!distance || distance < minDistance2 || !mousePos) {
        return;
      }
      const query = container2.particles.quadTree.queryCircle(mousePos, distance, (p) => this.isEnabled(p));
      for (const particle of query) {
        particle.bubble.inRange = true;
        const pos = particle.getPosition(), pointDistance = getDistance(pos, mousePos), ratio = ratioOffset - pointDistance / distance;
        if (pointDistance <= distance) {
          if (ratio >= minRatio && container2.interactivity.status === mouseMoveEvent) {
            this._hoverBubbleSize(particle, ratio);
            this._hoverBubbleOpacity(particle, ratio);
            this._hoverBubbleColor(particle, ratio);
          }
        } else {
          this.reset(particle);
        }
        if (container2.interactivity.status === mouseLeaveEvent) {
          this.reset(particle);
        }
      }
    };
    this._hoverBubbleColor = (particle, ratio, divBubble) => {
      const options = this.container.actualOptions, bubbleOptions = divBubble ?? options.interactivity.modes.bubble;
      if (!bubbleOptions) {
        return;
      }
      if (!particle.bubble.finalColor) {
        const modeColor = bubbleOptions.color;
        if (!modeColor) {
          return;
        }
        const bubbleColor = itemFromSingleOrMultiple(modeColor);
        particle.bubble.finalColor = rangeColorToHsl(this._engine, bubbleColor);
      }
      if (!particle.bubble.finalColor) {
        return;
      }
      if (bubbleOptions.mix) {
        particle.bubble.color = void 0;
        const pColor = particle.getFillColor();
        particle.bubble.color = pColor ? rgbToHsl(colorMix(pColor, particle.bubble.finalColor, ratioOffset - ratio, ratio)) : particle.bubble.finalColor;
      } else {
        particle.bubble.color = particle.bubble.finalColor;
      }
    };
    this._hoverBubbleOpacity = (particle, ratio, divBubble) => {
      var _a, _b;
      const container2 = this.container, options = container2.actualOptions, modeOpacity = (divBubble == null ? void 0 : divBubble.opacity) ?? ((_a = options.interactivity.modes.bubble) == null ? void 0 : _a.opacity);
      if (!modeOpacity) {
        return;
      }
      const optOpacity = particle.options.opacity.value, pOpacity = ((_b = particle.opacity) == null ? void 0 : _b.value) ?? defaultOpacity2, opacity = calculateBubbleValue(pOpacity, modeOpacity, getRangeMax(optOpacity), ratio);
      if (opacity !== void 0) {
        particle.bubble.opacity = opacity;
      }
    };
    this._hoverBubbleSize = (particle, ratio, divBubble) => {
      const container2 = this.container, modeSize = (divBubble == null ? void 0 : divBubble.size) ? divBubble.size * container2.retina.pixelRatio : container2.retina.bubbleModeSize;
      if (modeSize === void 0) {
        return;
      }
      const optSize = getRangeMax(particle.options.size.value) * container2.retina.pixelRatio, pSize = particle.size.value, size = calculateBubbleValue(pSize, modeSize, optSize, ratio);
      if (size !== void 0) {
        particle.bubble.radius = size;
      }
    };
    this._process = (particle, distMouse, timeSpent, data) => {
      const container2 = this.container, bubbleParam = data.bubbleObj.optValue, options = container2.actualOptions, bubbleOptions = options.interactivity.modes.bubble;
      if (!bubbleOptions || bubbleParam === void 0) {
        return;
      }
      const bubbleDuration = bubbleOptions.duration, bubbleDistance = container2.retina.bubbleModeDistance, particlesParam = data.particlesObj.optValue, pObjBubble = data.bubbleObj.value, pObj = data.particlesObj.value ?? defaultBubbleValue, type = data.type;
      if (!bubbleDistance || bubbleDistance < minDistance2 || bubbleParam === particlesParam) {
        return;
      }
      if (!container2.bubble) {
        container2.bubble = {};
      }
      if (container2.bubble.durationEnd) {
        if (pObjBubble) {
          if (type === ProcessBubbleType.size) {
            delete particle.bubble.radius;
          }
          if (type === ProcessBubbleType.opacity) {
            delete particle.bubble.opacity;
          }
        }
      } else {
        if (distMouse <= bubbleDistance) {
          const obj = pObjBubble ?? pObj;
          if (obj !== bubbleParam) {
            const value = pObj - timeSpent * (pObj - bubbleParam) / bubbleDuration;
            if (type === ProcessBubbleType.size) {
              particle.bubble.radius = value;
            }
            if (type === ProcessBubbleType.opacity) {
              particle.bubble.opacity = value;
            }
          }
        } else {
          if (type === ProcessBubbleType.size) {
            delete particle.bubble.radius;
          }
          if (type === ProcessBubbleType.opacity) {
            delete particle.bubble.opacity;
          }
        }
      }
    };
    this._singleSelectorHover = (delta, selector, div) => {
      const container2 = this.container, selectors = document.querySelectorAll(selector), bubble = container2.actualOptions.interactivity.modes.bubble;
      if (!bubble || !selectors.length) {
        return;
      }
      selectors.forEach((item) => {
        const elem = item, pxRatio = container2.retina.pixelRatio, pos = {
          x: (elem.offsetLeft + elem.offsetWidth * half6) * pxRatio,
          y: (elem.offsetTop + elem.offsetHeight * half6) * pxRatio
        }, repulseRadius = elem.offsetWidth * half6 * pxRatio, area = div.type === DivType.circle ? new Circle(pos.x, pos.y, repulseRadius) : new Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio), query = container2.particles.quadTree.query(area, (p) => this.isEnabled(p));
        for (const particle of query) {
          if (!area.contains(particle.getPosition())) {
            continue;
          }
          particle.bubble.inRange = true;
          const divs = bubble.divs, divBubble = divMode(divs, elem);
          if (!particle.bubble.div || particle.bubble.div !== elem) {
            this.clear(particle, delta, true);
            particle.bubble.div = elem;
          }
          this._hoverBubbleSize(particle, defaultRatio2, divBubble);
          this._hoverBubbleOpacity(particle, defaultRatio2, divBubble);
          this._hoverBubbleColor(particle, defaultRatio2, divBubble);
        }
      });
    };
    this._engine = engine;
    if (!container.bubble) {
      container.bubble = {};
    }
    this.handleClickMode = (mode) => {
      if (mode !== bubbleMode) {
        return;
      }
      if (!container.bubble) {
        container.bubble = {};
      }
      container.bubble.clicking = true;
    };
  }
  clear(particle, delta, force) {
    if (particle.bubble.inRange && !force) {
      return;
    }
    delete particle.bubble.div;
    delete particle.bubble.opacity;
    delete particle.bubble.radius;
    delete particle.bubble.color;
  }
  init() {
    const container = this.container, bubble = container.actualOptions.interactivity.modes.bubble;
    if (!bubble) {
      return;
    }
    container.retina.bubbleModeDistance = bubble.distance * container.retina.pixelRatio;
    if (bubble.size !== void 0) {
      container.retina.bubbleModeSize = bubble.size * container.retina.pixelRatio;
    }
  }
  interact(delta) {
    const options = this.container.actualOptions, events = options.interactivity.events, onHover = events.onHover, onClick = events.onClick, hoverEnabled = onHover.enable, hoverMode = onHover.mode, clickEnabled = onClick.enable, clickMode = onClick.mode, divs = events.onDiv;
    if (hoverEnabled && isInArray(bubbleMode, hoverMode)) {
      this._hoverBubble();
    } else if (clickEnabled && isInArray(bubbleMode, clickMode)) {
      this._clickBubble();
    } else {
      divModeExecute(bubbleMode, divs, (selector, div) => this._singleSelectorHover(delta, selector, div));
    }
  }
  isEnabled(particle) {
    const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = ((particle == null ? void 0 : particle.interactivity) ?? options.interactivity).events, { onClick, onDiv, onHover } = events, divBubble = isDivModeEnabled(bubbleMode, onDiv);
    if (!(divBubble || onHover.enable && !!mouse.position || onClick.enable && mouse.clickPosition)) {
      return false;
    }
    return isInArray(bubbleMode, onHover.mode) || isInArray(bubbleMode, onClick.mode) || divBubble;
  }
  loadModeOptions(options, ...sources) {
    if (!options.bubble) {
      options.bubble = new Bubble();
    }
    for (const source of sources) {
      options.bubble.load(source == null ? void 0 : source.bubble);
    }
  }
  reset(particle) {
    particle.bubble.inRange = false;
  }
};

// node_modules/@tsparticles/interaction-external-bubble/browser/index.js
async function loadExternalBubbleInteraction(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addInteractor("externalBubble", (container) => {
    return Promise.resolve(new Bubbler(container, engine));
  }, refresh);
}

// node_modules/@tsparticles/interaction-external-connect/browser/Options/Classes/ConnectLinks.js
var ConnectLinks = class {
  constructor() {
    this.opacity = 0.5;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
  }
};

// node_modules/@tsparticles/interaction-external-connect/browser/Options/Classes/Connect.js
var Connect = class {
  constructor() {
    this.distance = 80;
    this.links = new ConnectLinks();
    this.radius = 60;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    this.links.load(data.links);
    if (data.radius !== void 0) {
      this.radius = data.radius;
    }
  }
};

// node_modules/@tsparticles/interaction-external-connect/browser/Utils.js
var gradientMin = 0;
var gradientMax = 1;
var defaultLinksWidth = 0;
function gradient(context, p1, p2, opacity) {
  const gradStop = Math.floor(p2.getRadius() / p1.getRadius()), color1 = p1.getFillColor(), color2 = p2.getFillColor();
  if (!color1 || !color2) {
    return;
  }
  const sourcePos = p1.getPosition(), destPos = p2.getPosition(), midRgb = colorMix(color1, color2, p1.getRadius(), p2.getRadius()), grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);
  grad.addColorStop(gradientMin, getStyleFromHsl(color1, opacity));
  grad.addColorStop(clamp(gradStop, gradientMin, gradientMax), getStyleFromRgb(midRgb, opacity));
  grad.addColorStop(gradientMax, getStyleFromHsl(color2, opacity));
  return grad;
}
function drawConnectLine(context, width, lineStyle2, begin, end) {
  drawLine(context, begin, end);
  context.lineWidth = width;
  context.strokeStyle = lineStyle2;
  context.stroke();
}
function lineStyle(container, ctx, p1, p2) {
  const options = container.actualOptions, connectOptions = options.interactivity.modes.connect;
  if (!connectOptions) {
    return;
  }
  return gradient(ctx, p1, p2, connectOptions.links.opacity);
}
function drawConnection(container, p1, p2) {
  container.canvas.draw((ctx) => {
    const ls = lineStyle(container, ctx, p1, p2);
    if (!ls) {
      return;
    }
    const pos1 = p1.getPosition(), pos2 = p2.getPosition();
    drawConnectLine(ctx, p1.retina.linksWidth ?? defaultLinksWidth, ls, pos1, pos2);
  });
}

// node_modules/@tsparticles/interaction-external-connect/browser/Connector.js
var connectMode = "connect";
var minDistance3 = 0;
var Connector = class extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {
  }
  init() {
    const container = this.container, connect = container.actualOptions.interactivity.modes.connect;
    if (!connect) {
      return;
    }
    container.retina.connectModeDistance = connect.distance * container.retina.pixelRatio;
    container.retina.connectModeRadius = connect.radius * container.retina.pixelRatio;
  }
  interact() {
    const container = this.container, options = container.actualOptions;
    if (options.interactivity.events.onHover.enable && container.interactivity.status === "pointermove") {
      const mousePos = container.interactivity.mouse.position, { connectModeDistance, connectModeRadius } = container.retina;
      if (!connectModeDistance || connectModeDistance < minDistance3 || !connectModeRadius || connectModeRadius < minDistance3 || !mousePos) {
        return;
      }
      const distance = Math.abs(connectModeRadius), query = container.particles.quadTree.queryCircle(mousePos, distance, (p) => this.isEnabled(p));
      query.forEach((p1, i) => {
        const pos1 = p1.getPosition(), indexOffset = 1;
        for (const p2 of query.slice(i + indexOffset)) {
          const pos2 = p2.getPosition(), distMax = Math.abs(connectModeDistance), xDiff = Math.abs(pos1.x - pos2.x), yDiff = Math.abs(pos1.y - pos2.y);
          if (xDiff < distMax && yDiff < distMax) {
            drawConnection(container, p1, p2);
          }
        }
      });
    }
  }
  isEnabled(particle) {
    const container = this.container, mouse = container.interactivity.mouse, events = ((particle == null ? void 0 : particle.interactivity) ?? container.actualOptions.interactivity).events;
    if (!(events.onHover.enable && mouse.position)) {
      return false;
    }
    return isInArray(connectMode, events.onHover.mode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.connect) {
      options.connect = new Connect();
    }
    for (const source of sources) {
      options.connect.load(source == null ? void 0 : source.connect);
    }
  }
  reset() {
  }
};

// node_modules/@tsparticles/interaction-external-connect/browser/index.js
async function loadExternalConnectInteraction(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addInteractor("externalConnect", (container) => {
    return Promise.resolve(new Connector(container));
  }, refresh);
}

// node_modules/@tsparticles/interaction-external-grab/browser/Options/Classes/GrabLinks.js
var GrabLinks = class {
  constructor() {
    this.blink = false;
    this.consent = false;
    this.opacity = 1;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.blink !== void 0) {
      this.blink = data.blink;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.consent !== void 0) {
      this.consent = data.consent;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
  }
};

// node_modules/@tsparticles/interaction-external-grab/browser/Options/Classes/Grab.js
var Grab = class {
  constructor() {
    this.distance = 100;
    this.links = new GrabLinks();
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    this.links.load(data.links);
  }
};

// node_modules/@tsparticles/interaction-external-grab/browser/Utils.js
var defaultWidth = 0;
function drawGrabLine(context, width, begin, end, colorLine, opacity) {
  drawLine(context, begin, end);
  context.strokeStyle = getStyleFromRgb(colorLine, opacity);
  context.lineWidth = width;
  context.stroke();
}
function drawGrab(container, particle, lineColor, opacity, mousePos) {
  container.canvas.draw((ctx) => {
    const beginPos = particle.getPosition();
    drawGrabLine(ctx, particle.retina.linksWidth ?? defaultWidth, beginPos, mousePos, lineColor, opacity);
  });
}

// node_modules/@tsparticles/interaction-external-grab/browser/Grabber.js
var grabMode = "grab";
var minDistance4 = 0;
var minOpacity = 0;
var Grabber = class extends ExternalInteractorBase {
  constructor(container, engine) {
    super(container);
    this._engine = engine;
  }
  clear() {
  }
  init() {
    const container = this.container, grab = container.actualOptions.interactivity.modes.grab;
    if (!grab) {
      return;
    }
    container.retina.grabModeDistance = grab.distance * container.retina.pixelRatio;
  }
  interact() {
    var _a;
    const container = this.container, options = container.actualOptions, interactivity = options.interactivity;
    if (!interactivity.modes.grab || !interactivity.events.onHover.enable || container.interactivity.status !== mouseMoveEvent) {
      return;
    }
    const mousePos = container.interactivity.mouse.position;
    if (!mousePos) {
      return;
    }
    const distance = container.retina.grabModeDistance;
    if (!distance || distance < minDistance4) {
      return;
    }
    const query = container.particles.quadTree.queryCircle(mousePos, distance, (p) => this.isEnabled(p));
    for (const particle of query) {
      const pos = particle.getPosition(), pointDistance = getDistance(pos, mousePos);
      if (pointDistance > distance) {
        continue;
      }
      const grabLineOptions = interactivity.modes.grab.links, lineOpacity = grabLineOptions.opacity, opacityLine = lineOpacity - pointDistance * lineOpacity / distance;
      if (opacityLine <= minOpacity) {
        continue;
      }
      const optColor = grabLineOptions.color ?? ((_a = particle.options.links) == null ? void 0 : _a.color);
      if (!container.particles.grabLineColor && optColor) {
        const linksOptions = interactivity.modes.grab.links;
        container.particles.grabLineColor = getLinkRandomColor(this._engine, optColor, linksOptions.blink, linksOptions.consent);
      }
      const colorLine = getLinkColor(particle, void 0, container.particles.grabLineColor);
      if (!colorLine) {
        continue;
      }
      drawGrab(container, particle, colorLine, opacityLine, mousePos);
    }
  }
  isEnabled(particle) {
    const container = this.container, mouse = container.interactivity.mouse, events = ((particle == null ? void 0 : particle.interactivity) ?? container.actualOptions.interactivity).events;
    return events.onHover.enable && !!mouse.position && isInArray(grabMode, events.onHover.mode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.grab) {
      options.grab = new Grab();
    }
    for (const source of sources) {
      options.grab.load(source == null ? void 0 : source.grab);
    }
  }
  reset() {
  }
};

// node_modules/@tsparticles/interaction-external-grab/browser/index.js
async function loadExternalGrabInteraction(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addInteractor("externalGrab", (container) => {
    return Promise.resolve(new Grabber(container, engine));
  }, refresh);
}

// node_modules/@tsparticles/interaction-external-pause/browser/Pauser.js
var pauseMode = "pause";
var Pauser = class extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this.handleClickMode = (mode) => {
      if (mode !== pauseMode) {
        return;
      }
      const container2 = this.container;
      if (container2.animationStatus) {
        container2.pause();
      } else {
        container2.play();
      }
    };
  }
  clear() {
  }
  init() {
  }
  interact() {
  }
  isEnabled() {
    return true;
  }
  reset() {
  }
};

// node_modules/@tsparticles/interaction-external-pause/browser/index.js
async function loadExternalPauseInteraction(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addInteractor("externalPause", (container) => {
    return Promise.resolve(new Pauser(container));
  }, refresh);
}

// node_modules/@tsparticles/interaction-external-push/browser/Options/Classes/Push.js
var Push = class {
  constructor() {
    this.default = true;
    this.groups = [];
    this.quantity = 4;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.default !== void 0) {
      this.default = data.default;
    }
    if (data.groups !== void 0) {
      this.groups = data.groups.map((t) => t);
    }
    if (!this.groups.length) {
      this.default = true;
    }
    const quantity = data.quantity;
    if (quantity !== void 0) {
      this.quantity = setRangeValue(quantity);
    }
  }
};

// node_modules/@tsparticles/interaction-external-push/browser/Pusher.js
var pushMode = "push";
var minQuantity = 0;
var Pusher = class extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this.handleClickMode = (mode) => {
      if (mode !== pushMode) {
        return;
      }
      const container2 = this.container, options = container2.actualOptions, pushOptions = options.interactivity.modes.push;
      if (!pushOptions) {
        return;
      }
      const quantity = getRangeValue(pushOptions.quantity);
      if (quantity <= minQuantity) {
        return;
      }
      const group = itemFromArray([void 0, ...pushOptions.groups]), groupOptions = group !== void 0 ? container2.actualOptions.particles.groups[group] : void 0;
      void container2.particles.push(quantity, container2.interactivity.mouse, groupOptions, group);
    };
  }
  clear() {
  }
  init() {
  }
  interact() {
  }
  isEnabled() {
    return true;
  }
  loadModeOptions(options, ...sources) {
    if (!options.push) {
      options.push = new Push();
    }
    for (const source of sources) {
      options.push.load(source == null ? void 0 : source.push);
    }
  }
  reset() {
  }
};

// node_modules/@tsparticles/interaction-external-push/browser/index.js
async function loadExternalPushInteraction(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addInteractor("externalPush", (container) => {
    return Promise.resolve(new Pusher(container));
  }, refresh);
}

// node_modules/@tsparticles/interaction-external-remove/browser/Options/Classes/Remove.js
var Remove = class {
  constructor() {
    this.quantity = 2;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    const quantity = data.quantity;
    if (quantity !== void 0) {
      this.quantity = setRangeValue(quantity);
    }
  }
};

// node_modules/@tsparticles/interaction-external-remove/browser/Remover.js
var removeMode = "remove";
var Remover = class extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this.handleClickMode = (mode) => {
      const container2 = this.container, options = container2.actualOptions;
      if (!options.interactivity.modes.remove || mode !== removeMode) {
        return;
      }
      const removeNb = getRangeValue(options.interactivity.modes.remove.quantity);
      container2.particles.removeQuantity(removeNb);
    };
  }
  clear() {
  }
  init() {
  }
  interact() {
  }
  isEnabled() {
    return true;
  }
  loadModeOptions(options, ...sources) {
    if (!options.remove) {
      options.remove = new Remove();
    }
    for (const source of sources) {
      options.remove.load(source == null ? void 0 : source.remove);
    }
  }
  reset() {
  }
};

// node_modules/@tsparticles/interaction-external-remove/browser/index.js
async function loadExternalRemoveInteraction(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addInteractor("externalRemove", (container) => {
    return Promise.resolve(new Remover(container));
  }, refresh);
}

// node_modules/@tsparticles/interaction-external-repulse/browser/Options/Classes/RepulseBase.js
var RepulseBase = class {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.factor = 100;
    this.speed = 1;
    this.maxSpeed = 50;
    this.easing = EasingType.easeOutQuad;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    if (data.duration !== void 0) {
      this.duration = data.duration;
    }
    if (data.easing !== void 0) {
      this.easing = data.easing;
    }
    if (data.factor !== void 0) {
      this.factor = data.factor;
    }
    if (data.speed !== void 0) {
      this.speed = data.speed;
    }
    if (data.maxSpeed !== void 0) {
      this.maxSpeed = data.maxSpeed;
    }
  }
};

// node_modules/@tsparticles/interaction-external-repulse/browser/Options/Classes/RepulseDiv.js
var RepulseDiv = class extends RepulseBase {
  constructor() {
    super();
    this.selectors = [];
  }
  load(data) {
    super.load(data);
    if (isNull(data)) {
      return;
    }
    if (data.selectors !== void 0) {
      this.selectors = data.selectors;
    }
  }
};

// node_modules/@tsparticles/interaction-external-repulse/browser/Options/Classes/Repulse.js
var Repulse = class extends RepulseBase {
  load(data) {
    super.load(data);
    if (isNull(data)) {
      return;
    }
    this.divs = executeOnSingleOrMultiple(data.divs, (div) => {
      const tmp = new RepulseDiv();
      tmp.load(div);
      return tmp;
    });
  }
};

// node_modules/@tsparticles/interaction-external-repulse/browser/Repulser.js
var repulseMode = "repulse";
var minDistance5 = 0;
var repulseRadiusFactor = 6;
var repulseRadiusPower = 3;
var squarePower = 2;
var minRadius4 = 0;
var minSpeed = 0;
var easingOffset = 1;
var half7 = 0.5;
var Repulser = class extends ExternalInteractorBase {
  constructor(engine, container) {
    super(container);
    this._clickRepulse = () => {
      const container2 = this.container, repulseOptions = container2.actualOptions.interactivity.modes.repulse;
      if (!repulseOptions) {
        return;
      }
      const repulse = container2.repulse ?? { particles: [] };
      if (!repulse.finish) {
        if (!repulse.count) {
          repulse.count = 0;
        }
        repulse.count++;
        if (repulse.count === container2.particles.count) {
          repulse.finish = true;
        }
      }
      if (repulse.clicking) {
        const repulseDistance = container2.retina.repulseModeDistance;
        if (!repulseDistance || repulseDistance < minDistance5) {
          return;
        }
        const repulseRadius = Math.pow(repulseDistance / repulseRadiusFactor, repulseRadiusPower), mouseClickPos = container2.interactivity.mouse.clickPosition;
        if (mouseClickPos === void 0) {
          return;
        }
        const range = new Circle(mouseClickPos.x, mouseClickPos.y, repulseRadius), query = container2.particles.quadTree.query(range, (p) => this.isEnabled(p));
        for (const particle of query) {
          const { dx, dy, distance } = getDistances(mouseClickPos, particle.position), d = distance ** squarePower, velocity = repulseOptions.speed, force = -repulseRadius * velocity / d;
          if (d <= repulseRadius) {
            repulse.particles.push(particle);
            const vect = Vector.create(dx, dy);
            vect.length = force;
            particle.velocity.setTo(vect);
          }
        }
      } else if (repulse.clicking === false) {
        for (const particle of repulse.particles) {
          particle.velocity.setTo(particle.initialVelocity);
        }
        repulse.particles = [];
      }
    };
    this._hoverRepulse = () => {
      const container2 = this.container, mousePos = container2.interactivity.mouse.position, repulseRadius = container2.retina.repulseModeDistance;
      if (!repulseRadius || repulseRadius < minRadius4 || !mousePos) {
        return;
      }
      this._processRepulse(mousePos, repulseRadius, new Circle(mousePos.x, mousePos.y, repulseRadius));
    };
    this._processRepulse = (position, repulseRadius, area, divRepulse) => {
      const container2 = this.container, query = container2.particles.quadTree.query(area, (p) => this.isEnabled(p)), repulseOptions = container2.actualOptions.interactivity.modes.repulse;
      if (!repulseOptions) {
        return;
      }
      const { easing, speed, factor, maxSpeed } = repulseOptions, easingFunc = this._engine.getEasing(easing), velocity = ((divRepulse == null ? void 0 : divRepulse.speed) ?? speed) * factor;
      for (const particle of query) {
        const { dx, dy, distance } = getDistances(particle.position, position), repulseFactor = clamp(easingFunc(easingOffset - distance / repulseRadius) * velocity, minSpeed, maxSpeed), normVec = Vector.create(!distance ? velocity : dx / distance * repulseFactor, !distance ? velocity : dy / distance * repulseFactor);
        particle.position.addTo(normVec);
      }
    };
    this._singleSelectorRepulse = (selector, div) => {
      const container2 = this.container, repulse = container2.actualOptions.interactivity.modes.repulse;
      if (!repulse) {
        return;
      }
      const query = document.querySelectorAll(selector);
      if (!query.length) {
        return;
      }
      query.forEach((item) => {
        const elem = item, pxRatio = container2.retina.pixelRatio, pos = {
          x: (elem.offsetLeft + elem.offsetWidth * half7) * pxRatio,
          y: (elem.offsetTop + elem.offsetHeight * half7) * pxRatio
        }, repulseRadius = elem.offsetWidth * half7 * pxRatio, area = div.type === DivType.circle ? new Circle(pos.x, pos.y, repulseRadius) : new Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio), divs = repulse.divs, divRepulse = divMode(divs, elem);
        this._processRepulse(pos, repulseRadius, area, divRepulse);
      });
    };
    this._engine = engine;
    if (!container.repulse) {
      container.repulse = { particles: [] };
    }
    this.handleClickMode = (mode) => {
      const options = this.container.actualOptions, repulseOpts = options.interactivity.modes.repulse;
      if (!repulseOpts || mode !== repulseMode) {
        return;
      }
      if (!container.repulse) {
        container.repulse = { particles: [] };
      }
      const repulse = container.repulse;
      repulse.clicking = true;
      repulse.count = 0;
      for (const particle of container.repulse.particles) {
        if (!this.isEnabled(particle)) {
          continue;
        }
        particle.velocity.setTo(particle.initialVelocity);
      }
      repulse.particles = [];
      repulse.finish = false;
      setTimeout(() => {
        if (container.destroyed) {
          return;
        }
        repulse.clicking = false;
      }, repulseOpts.duration * millisecondsToSeconds);
    };
  }
  clear() {
  }
  init() {
    const container = this.container, repulse = container.actualOptions.interactivity.modes.repulse;
    if (!repulse) {
      return;
    }
    container.retina.repulseModeDistance = repulse.distance * container.retina.pixelRatio;
  }
  interact() {
    const container = this.container, options = container.actualOptions, mouseMoveStatus = container.interactivity.status === mouseMoveEvent, events = options.interactivity.events, hover = events.onHover, hoverEnabled = hover.enable, hoverMode = hover.mode, click = events.onClick, clickEnabled = click.enable, clickMode = click.mode, divs = events.onDiv;
    if (mouseMoveStatus && hoverEnabled && isInArray(repulseMode, hoverMode)) {
      this._hoverRepulse();
    } else if (clickEnabled && isInArray(repulseMode, clickMode)) {
      this._clickRepulse();
    } else {
      divModeExecute(repulseMode, divs, (selector, div) => this._singleSelectorRepulse(selector, div));
    }
  }
  isEnabled(particle) {
    const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = ((particle == null ? void 0 : particle.interactivity) ?? options.interactivity).events, divs = events.onDiv, hover = events.onHover, click = events.onClick, divRepulse = isDivModeEnabled(repulseMode, divs);
    if (!(divRepulse || hover.enable && !!mouse.position || click.enable && mouse.clickPosition)) {
      return false;
    }
    const hoverMode = hover.mode, clickMode = click.mode;
    return isInArray(repulseMode, hoverMode) || isInArray(repulseMode, clickMode) || divRepulse;
  }
  loadModeOptions(options, ...sources) {
    if (!options.repulse) {
      options.repulse = new Repulse();
    }
    for (const source of sources) {
      options.repulse.load(source == null ? void 0 : source.repulse);
    }
  }
  reset() {
  }
};

// node_modules/@tsparticles/interaction-external-repulse/browser/index.js
async function loadExternalRepulseInteraction(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addInteractor("externalRepulse", (container) => {
    return Promise.resolve(new Repulser(engine, container));
  }, refresh);
}

// node_modules/@tsparticles/interaction-external-slow/browser/Options/Classes/Slow.js
var Slow = class {
  constructor() {
    this.factor = 3;
    this.radius = 200;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.factor !== void 0) {
      this.factor = data.factor;
    }
    if (data.radius !== void 0) {
      this.radius = data.radius;
    }
  }
};

// node_modules/@tsparticles/interaction-external-slow/browser/Slower.js
var slowMode = "slow";
var minRadius5 = 0;
var Slower = class extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }
  clear(particle, delta, force) {
    if (particle.slow.inRange && !force) {
      return;
    }
    particle.slow.factor = 1;
  }
  init() {
    const container = this.container, slow = container.actualOptions.interactivity.modes.slow;
    if (!slow) {
      return;
    }
    container.retina.slowModeRadius = slow.radius * container.retina.pixelRatio;
  }
  interact() {
  }
  isEnabled(particle) {
    const container = this.container, mouse = container.interactivity.mouse, events = ((particle == null ? void 0 : particle.interactivity) ?? container.actualOptions.interactivity).events;
    return events.onHover.enable && !!mouse.position && isInArray(slowMode, events.onHover.mode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.slow) {
      options.slow = new Slow();
    }
    for (const source of sources) {
      options.slow.load(source == null ? void 0 : source.slow);
    }
  }
  reset(particle) {
    particle.slow.inRange = false;
    const container = this.container, options = container.actualOptions, mousePos = container.interactivity.mouse.position, radius = container.retina.slowModeRadius, slowOptions = options.interactivity.modes.slow;
    if (!slowOptions || !radius || radius < minRadius5 || !mousePos) {
      return;
    }
    const particlePos = particle.getPosition(), dist = getDistance(mousePos, particlePos), proximityFactor = dist / radius, slowFactor = slowOptions.factor, { slow } = particle;
    if (dist > radius) {
      return;
    }
    slow.inRange = true;
    slow.factor = proximityFactor / slowFactor;
  }
};

// node_modules/@tsparticles/interaction-external-slow/browser/index.js
async function loadExternalSlowInteraction(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addInteractor("externalSlow", (container) => {
    return Promise.resolve(new Slower(container));
  }, refresh);
}

// node_modules/@tsparticles/shape-image/browser/Utils.js
var stringStart = 0;
var defaultOpacity3 = 1;
var currentColorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))|currentcolor/gi;
function replaceColorSvg(imageShape, color, opacity) {
  const { svgData } = imageShape;
  if (!svgData) {
    return "";
  }
  const colorStyle = getStyleFromHsl(color, opacity);
  if (svgData.includes("fill")) {
    return svgData.replace(currentColorRegex, () => colorStyle);
  }
  const preFillIndex = svgData.indexOf(">");
  return `${svgData.substring(stringStart, preFillIndex)} fill="${colorStyle}"${svgData.substring(preFillIndex)}`;
}
async function loadImage(image) {
  return new Promise((resolve) => {
    image.loading = true;
    const img = new Image();
    image.element = img;
    img.addEventListener("load", () => {
      image.loading = false;
      resolve();
    });
    img.addEventListener("error", () => {
      image.element = void 0;
      image.error = true;
      image.loading = false;
      getLogger().error(`${errorPrefix} loading image: ${image.source}`);
      resolve();
    });
    img.src = image.source;
  });
}
async function downloadSvgImage(image) {
  if (image.type !== "svg") {
    await loadImage(image);
    return;
  }
  image.loading = true;
  const response = await fetch(image.source);
  if (!response.ok) {
    getLogger().error(`${errorPrefix} Image not found`);
    image.error = true;
  } else {
    image.svgData = await response.text();
  }
  image.loading = false;
}
function replaceImageColor(image, imageData, color, particle) {
  var _a;
  const svgColoredData = replaceColorSvg(image, color, ((_a = particle.opacity) == null ? void 0 : _a.value) ?? defaultOpacity3), imageRes = {
    color,
    gif: imageData.gif,
    data: {
      ...image,
      svgData: svgColoredData
    },
    loaded: false,
    ratio: imageData.width / imageData.height,
    replaceColor: imageData.replaceColor,
    source: imageData.src
  };
  return new Promise((resolve) => {
    const svg = new Blob([svgColoredData], { type: "image/svg+xml" }), domUrl = URL || window.URL || window.webkitURL || window, url = domUrl.createObjectURL(svg), img = new Image();
    img.addEventListener("load", () => {
      imageRes.loaded = true;
      imageRes.element = img;
      resolve(imageRes);
      domUrl.revokeObjectURL(url);
    });
    const errorHandler = async () => {
      domUrl.revokeObjectURL(url);
      const img2 = {
        ...image,
        error: false,
        loading: true
      };
      await loadImage(img2);
      imageRes.loaded = true;
      imageRes.element = img2.element;
      resolve(imageRes);
    };
    img.addEventListener("error", () => void errorHandler());
    img.src = url;
  });
}

// node_modules/@tsparticles/shape-image/browser/GifUtils/Constants.js
var InterlaceOffsets = [0, 4, 2, 1];
var InterlaceSteps = [8, 8, 4, 2];

// node_modules/@tsparticles/shape-image/browser/GifUtils/ByteStream.js
var ByteStream = class {
  constructor(bytes) {
    this.pos = 0;
    this.data = new Uint8ClampedArray(bytes);
  }
  getString(count) {
    const slice = this.data.slice(this.pos, this.pos + count);
    this.pos += slice.length;
    return slice.reduce((acc, curr) => acc + String.fromCharCode(curr), "");
  }
  nextByte() {
    return this.data[this.pos++];
  }
  nextTwoBytes() {
    const increment2 = 2, previous = 1, shift = 8;
    this.pos += increment2;
    return this.data[this.pos - increment2] + (this.data[this.pos - previous] << shift);
  }
  readSubBlocks() {
    let blockString = "", size = 0;
    const minCount2 = 0, emptySize = 0;
    do {
      size = this.data[this.pos++];
      for (let count = size; --count >= minCount2; blockString += String.fromCharCode(this.data[this.pos++])) {
      }
    } while (size !== emptySize);
    return blockString;
  }
  readSubBlocksBin() {
    let size = this.data[this.pos], len = 0;
    const emptySize = 0, increment2 = 1;
    for (let offset = 0; size !== emptySize; offset += size + increment2, size = this.data[this.pos + offset]) {
      len += size;
    }
    const blockData = new Uint8Array(len);
    size = this.data[this.pos++];
    for (let i = 0; size !== emptySize; size = this.data[this.pos++]) {
      for (let count = size; --count >= emptySize; blockData[i++] = this.data[this.pos++]) {
      }
    }
    return blockData;
  }
  skipSubBlocks() {
    for (const increment2 = 1, noData = 0; this.data[this.pos] !== noData; this.pos += this.data[this.pos] + increment2) {
    }
    this.pos++;
  }
};

// node_modules/@tsparticles/shape-image/browser/GifUtils/Enums/DisposalMethod.js
var DisposalMethod;
(function(DisposalMethod2) {
  DisposalMethod2[DisposalMethod2["Replace"] = 0] = "Replace";
  DisposalMethod2[DisposalMethod2["Combine"] = 1] = "Combine";
  DisposalMethod2[DisposalMethod2["RestoreBackground"] = 2] = "RestoreBackground";
  DisposalMethod2[DisposalMethod2["RestorePrevious"] = 3] = "RestorePrevious";
  DisposalMethod2[DisposalMethod2["UndefinedA"] = 4] = "UndefinedA";
  DisposalMethod2[DisposalMethod2["UndefinedB"] = 5] = "UndefinedB";
  DisposalMethod2[DisposalMethod2["UndefinedC"] = 6] = "UndefinedC";
  DisposalMethod2[DisposalMethod2["UndefinedD"] = 7] = "UndefinedD";
})(DisposalMethod || (DisposalMethod = {}));

// node_modules/@tsparticles/shape-image/browser/GifUtils/Types/GIFDataHeaders.js
var GIFDataHeaders;
(function(GIFDataHeaders2) {
  GIFDataHeaders2[GIFDataHeaders2["Extension"] = 33] = "Extension";
  GIFDataHeaders2[GIFDataHeaders2["ApplicationExtension"] = 255] = "ApplicationExtension";
  GIFDataHeaders2[GIFDataHeaders2["GraphicsControlExtension"] = 249] = "GraphicsControlExtension";
  GIFDataHeaders2[GIFDataHeaders2["PlainTextExtension"] = 1] = "PlainTextExtension";
  GIFDataHeaders2[GIFDataHeaders2["CommentExtension"] = 254] = "CommentExtension";
  GIFDataHeaders2[GIFDataHeaders2["Image"] = 44] = "Image";
  GIFDataHeaders2[GIFDataHeaders2["EndOfFile"] = 59] = "EndOfFile";
})(GIFDataHeaders || (GIFDataHeaders = {}));

// node_modules/@tsparticles/shape-image/browser/GifUtils/Utils.js
var origin2 = {
  x: 0,
  y: 0
};
var defaultFrame = 0;
var half8 = 0.5;
var initialTime = 0;
var firstIndex = 0;
var defaultLoopCount = 0;
function parseColorTable(byteStream, count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push({
      r: byteStream.data[byteStream.pos],
      g: byteStream.data[byteStream.pos + 1],
      b: byteStream.data[byteStream.pos + 2]
    });
    byteStream.pos += 3;
  }
  return colors;
}
function parseExtensionBlock(byteStream, gif, getFrameIndex, getTransparencyIndex) {
  switch (byteStream.nextByte()) {
    case GIFDataHeaders.GraphicsControlExtension: {
      const frame = gif.frames[getFrameIndex(false)];
      byteStream.pos++;
      const packedByte = byteStream.nextByte();
      frame.GCreserved = (packedByte & 224) >>> 5;
      frame.disposalMethod = (packedByte & 28) >>> 2;
      frame.userInputDelayFlag = (packedByte & 2) === 2;
      const transparencyFlag = (packedByte & 1) === 1;
      frame.delayTime = byteStream.nextTwoBytes() * 10;
      const transparencyIndex = byteStream.nextByte();
      if (transparencyFlag) {
        getTransparencyIndex(transparencyIndex);
      }
      byteStream.pos++;
      break;
    }
    case GIFDataHeaders.ApplicationExtension: {
      byteStream.pos++;
      const applicationExtension = {
        identifier: byteStream.getString(8),
        authenticationCode: byteStream.getString(3),
        data: byteStream.readSubBlocksBin()
      };
      gif.applicationExtensions.push(applicationExtension);
      break;
    }
    case GIFDataHeaders.CommentExtension: {
      gif.comments.push([getFrameIndex(false), byteStream.readSubBlocks()]);
      break;
    }
    case GIFDataHeaders.PlainTextExtension: {
      if (gif.globalColorTable.length === 0) {
        throw new EvalError("plain text extension without global color table");
      }
      byteStream.pos++;
      gif.frames[getFrameIndex(false)].plainTextData = {
        left: byteStream.nextTwoBytes(),
        top: byteStream.nextTwoBytes(),
        width: byteStream.nextTwoBytes(),
        height: byteStream.nextTwoBytes(),
        charSize: {
          width: byteStream.nextTwoBytes(),
          height: byteStream.nextTwoBytes()
        },
        foregroundColor: byteStream.nextByte(),
        backgroundColor: byteStream.nextByte(),
        text: byteStream.readSubBlocks()
      };
      break;
    }
    default:
      byteStream.skipSubBlocks();
      break;
  }
}
async function parseImageBlock(byteStream, gif, avgAlpha, getFrameIndex, getTransparencyIndex, progressCallback) {
  const frame = gif.frames[getFrameIndex(true)];
  frame.left = byteStream.nextTwoBytes();
  frame.top = byteStream.nextTwoBytes();
  frame.width = byteStream.nextTwoBytes();
  frame.height = byteStream.nextTwoBytes();
  const packedByte = byteStream.nextByte(), localColorTableFlag = (packedByte & 128) === 128, interlacedFlag = (packedByte & 64) === 64;
  frame.sortFlag = (packedByte & 32) === 32;
  frame.reserved = (packedByte & 24) >>> 3;
  const localColorCount = 1 << (packedByte & 7) + 1;
  if (localColorTableFlag) {
    frame.localColorTable = parseColorTable(byteStream, localColorCount);
  }
  const getColor = (index) => {
    const { r, g, b } = (localColorTableFlag ? frame.localColorTable : gif.globalColorTable)[index];
    if (index !== getTransparencyIndex(null)) {
      return { r, g, b, a: 255 };
    }
    return { r, g, b, a: avgAlpha ? ~~((r + g + b) / 3) : 0 };
  };
  const image = (() => {
    try {
      return new ImageData(frame.width, frame.height, { colorSpace: "srgb" });
    } catch (error) {
      if (error instanceof DOMException && error.name === "IndexSizeError") {
        return null;
      }
      throw error;
    }
  })();
  if (image == null) {
    throw new EvalError("GIF frame size is to large");
  }
  const minCodeSize = byteStream.nextByte(), imageData = byteStream.readSubBlocksBin(), clearCode = 1 << minCodeSize;
  const readBits = (pos, len) => {
    const bytePos = pos >>> 3, bitPos = pos & 7;
    return (imageData[bytePos] + (imageData[bytePos + 1] << 8) + (imageData[bytePos + 2] << 16) & (1 << len) - 1 << bitPos) >>> bitPos;
  };
  if (interlacedFlag) {
    for (let code = 0, size = minCodeSize + 1, pos = 0, dic = [[0]], pass = 0; pass < 4; pass++) {
      if (InterlaceOffsets[pass] < frame.height) {
        let pixelPos = 0, lineIndex = 0, exit = false;
        while (!exit) {
          const last = code;
          code = readBits(pos, size);
          pos += size + 1;
          if (code === clearCode) {
            size = minCodeSize + 1;
            dic.length = clearCode + 2;
            for (let i = 0; i < dic.length; i++) {
              dic[i] = i < clearCode ? [i] : [];
            }
          } else {
            if (code >= dic.length) {
              dic.push(dic[last].concat(dic[last][0]));
            } else if (last !== clearCode) {
              dic.push(dic[last].concat(dic[code][0]));
            }
            for (const item of dic[code]) {
              const { r, g, b, a } = getColor(item);
              image.data.set([r, g, b, a], InterlaceOffsets[pass] * frame.width + InterlaceSteps[pass] * lineIndex + pixelPos % (frame.width * 4));
              pixelPos += 4;
            }
            if (dic.length === 1 << size && size < 12) {
              size++;
            }
          }
          if (pixelPos === frame.width * 4 * (lineIndex + 1)) {
            lineIndex++;
            if (InterlaceOffsets[pass] + InterlaceSteps[pass] * lineIndex >= frame.height) {
              exit = true;
            }
          }
        }
      }
      progressCallback == null ? void 0 : progressCallback(byteStream.pos / (byteStream.data.length - 1), getFrameIndex(false) + 1, image, { x: frame.left, y: frame.top }, { width: gif.width, height: gif.height });
    }
    frame.image = image;
    frame.bitmap = await createImageBitmap(image);
  } else {
    let code = 0, size = minCodeSize + 1, pos = 0, pixelPos = -4, exit = false;
    const dic = [[0]];
    while (!exit) {
      const last = code;
      code = readBits(pos, size);
      pos += size;
      if (code === clearCode) {
        size = minCodeSize + 1;
        dic.length = clearCode + 2;
        for (let i = 0; i < dic.length; i++) {
          dic[i] = i < clearCode ? [i] : [];
        }
      } else {
        if (code === clearCode + 1) {
          exit = true;
          break;
        }
        if (code >= dic.length) {
          dic.push(dic[last].concat(dic[last][0]));
        } else if (last !== clearCode) {
          dic.push(dic[last].concat(dic[code][0]));
        }
        for (const item of dic[code]) {
          const { r, g, b, a } = getColor(item);
          image.data.set([r, g, b, a], pixelPos += 4);
        }
        if (dic.length >= 1 << size && size < 12) {
          size++;
        }
      }
    }
    frame.image = image;
    frame.bitmap = await createImageBitmap(image);
    progressCallback == null ? void 0 : progressCallback((byteStream.pos + 1) / byteStream.data.length, getFrameIndex(false) + 1, frame.image, { x: frame.left, y: frame.top }, { width: gif.width, height: gif.height });
  }
}
async function parseBlock(byteStream, gif, avgAlpha, getFrameIndex, getTransparencyIndex, progressCallback) {
  switch (byteStream.nextByte()) {
    case GIFDataHeaders.EndOfFile:
      return true;
    case GIFDataHeaders.Image:
      await parseImageBlock(byteStream, gif, avgAlpha, getFrameIndex, getTransparencyIndex, progressCallback);
      break;
    case GIFDataHeaders.Extension:
      parseExtensionBlock(byteStream, gif, getFrameIndex, getTransparencyIndex);
      break;
    default:
      throw new EvalError("undefined block found");
  }
  return false;
}
function getGIFLoopAmount(gif) {
  for (const extension of gif.applicationExtensions) {
    if (extension.identifier + extension.authenticationCode !== "NETSCAPE2.0") {
      continue;
    }
    return extension.data[1] + (extension.data[2] << 8);
  }
  return NaN;
}
async function decodeGIF(gifURL, progressCallback, avgAlpha) {
  if (!avgAlpha)
    avgAlpha = false;
  const res = await fetch(gifURL);
  if (!res.ok && res.status === 404) {
    throw new EvalError("file not found");
  }
  const buffer = await res.arrayBuffer();
  const gif = {
    width: 0,
    height: 0,
    totalTime: 0,
    colorRes: 0,
    pixelAspectRatio: 0,
    frames: [],
    sortFlag: false,
    globalColorTable: [],
    backgroundImage: new ImageData(1, 1, { colorSpace: "srgb" }),
    comments: [],
    applicationExtensions: []
  }, byteStream = new ByteStream(new Uint8ClampedArray(buffer));
  if (byteStream.getString(6) !== "GIF89a") {
    throw new Error("not a supported GIF file");
  }
  gif.width = byteStream.nextTwoBytes();
  gif.height = byteStream.nextTwoBytes();
  const packedByte = byteStream.nextByte(), globalColorTableFlag = (packedByte & 128) === 128;
  gif.colorRes = (packedByte & 112) >>> 4;
  gif.sortFlag = (packedByte & 8) === 8;
  const globalColorCount = 1 << (packedByte & 7) + 1, backgroundColorIndex = byteStream.nextByte();
  gif.pixelAspectRatio = byteStream.nextByte();
  if (gif.pixelAspectRatio !== 0) {
    gif.pixelAspectRatio = (gif.pixelAspectRatio + 15) / 64;
  }
  if (globalColorTableFlag) {
    gif.globalColorTable = parseColorTable(byteStream, globalColorCount);
  }
  const backgroundImage = (() => {
    try {
      return new ImageData(gif.width, gif.height, { colorSpace: "srgb" });
    } catch (error) {
      if (error instanceof DOMException && error.name === "IndexSizeError") {
        return null;
      }
      throw error;
    }
  })();
  if (backgroundImage == null) {
    throw new Error("GIF frame size is to large");
  }
  const { r, g, b } = gif.globalColorTable[backgroundColorIndex];
  backgroundImage.data.set(globalColorTableFlag ? [r, g, b, 255] : [0, 0, 0, 0]);
  for (let i = 4; i < backgroundImage.data.length; i *= 2) {
    backgroundImage.data.copyWithin(i, 0, i);
  }
  gif.backgroundImage = backgroundImage;
  let frameIndex = -1, incrementFrameIndex = true, transparencyIndex = -1;
  const getframeIndex = (increment2) => {
    if (increment2) {
      incrementFrameIndex = true;
    }
    return frameIndex;
  };
  const getTransparencyIndex = (newValue) => {
    if (newValue != null) {
      transparencyIndex = newValue;
    }
    return transparencyIndex;
  };
  try {
    do {
      if (incrementFrameIndex) {
        gif.frames.push({
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          disposalMethod: DisposalMethod.Replace,
          image: new ImageData(1, 1, { colorSpace: "srgb" }),
          plainTextData: null,
          userInputDelayFlag: false,
          delayTime: 0,
          sortFlag: false,
          localColorTable: [],
          reserved: 0,
          GCreserved: 0
        });
        frameIndex++;
        transparencyIndex = -1;
        incrementFrameIndex = false;
      }
    } while (!await parseBlock(byteStream, gif, avgAlpha, getframeIndex, getTransparencyIndex, progressCallback));
    gif.frames.length--;
    for (const frame of gif.frames) {
      if (frame.userInputDelayFlag && frame.delayTime === 0) {
        gif.totalTime = Infinity;
        break;
      }
      gif.totalTime += frame.delayTime;
    }
    return gif;
  } catch (error) {
    if (error instanceof EvalError) {
      throw new Error(`error while parsing frame ${frameIndex} "${error.message}"`);
    }
    throw error;
  }
}
function drawGif(data) {
  const { context, radius, particle, delta } = data, image = particle.image;
  if (!(image == null ? void 0 : image.gifData) || !image.gif) {
    return;
  }
  const offscreenCanvas = new OffscreenCanvas(image.gifData.width, image.gifData.height), offscreenContext = offscreenCanvas.getContext("2d");
  if (!offscreenContext) {
    throw new Error("could not create offscreen canvas context");
  }
  offscreenContext.imageSmoothingQuality = "low";
  offscreenContext.imageSmoothingEnabled = false;
  offscreenContext.clearRect(origin2.x, origin2.y, offscreenCanvas.width, offscreenCanvas.height);
  if (particle.gifLoopCount === void 0) {
    particle.gifLoopCount = image.gifLoopCount ?? defaultLoopCount;
  }
  let frameIndex = particle.gifFrame ?? defaultFrame;
  const pos = { x: -image.gifData.width * half8, y: -image.gifData.height * half8 }, frame = image.gifData.frames[frameIndex];
  if (particle.gifTime === void 0) {
    particle.gifTime = initialTime;
  }
  if (!frame.bitmap) {
    return;
  }
  context.scale(radius / image.gifData.width, radius / image.gifData.height);
  switch (frame.disposalMethod) {
    case DisposalMethod.UndefinedA:
    case DisposalMethod.UndefinedB:
    case DisposalMethod.UndefinedC:
    case DisposalMethod.UndefinedD:
    case DisposalMethod.Replace:
      offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
      context.drawImage(offscreenCanvas, pos.x, pos.y);
      offscreenContext.clearRect(origin2.x, origin2.y, offscreenCanvas.width, offscreenCanvas.height);
      break;
    case DisposalMethod.Combine:
      offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
      context.drawImage(offscreenCanvas, pos.x, pos.y);
      break;
    case DisposalMethod.RestoreBackground:
      offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
      context.drawImage(offscreenCanvas, pos.x, pos.y);
      offscreenContext.clearRect(origin2.x, origin2.y, offscreenCanvas.width, offscreenCanvas.height);
      if (!image.gifData.globalColorTable.length) {
        offscreenContext.putImageData(image.gifData.frames[firstIndex].image, pos.x + frame.left, pos.y + frame.top);
      } else {
        offscreenContext.putImageData(image.gifData.backgroundImage, pos.x, pos.y);
      }
      break;
    case DisposalMethod.RestorePrevious:
      {
        const previousImageData = offscreenContext.getImageData(origin2.x, origin2.y, offscreenCanvas.width, offscreenCanvas.height);
        offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
        context.drawImage(offscreenCanvas, pos.x, pos.y);
        offscreenContext.clearRect(origin2.x, origin2.y, offscreenCanvas.width, offscreenCanvas.height);
        offscreenContext.putImageData(previousImageData, origin2.x, origin2.y);
      }
      break;
  }
  particle.gifTime += delta.value;
  if (particle.gifTime > frame.delayTime) {
    particle.gifTime -= frame.delayTime;
    if (++frameIndex >= image.gifData.frames.length) {
      if (--particle.gifLoopCount <= defaultLoopCount) {
        return;
      }
      frameIndex = firstIndex;
      offscreenContext.clearRect(origin2.x, origin2.y, offscreenCanvas.width, offscreenCanvas.height);
    }
    particle.gifFrame = frameIndex;
  }
  context.scale(image.gifData.width / radius, image.gifData.height / radius);
}
async function loadGifImage(image) {
  if (image.type !== "gif") {
    await loadImage(image);
    return;
  }
  image.loading = true;
  try {
    image.gifData = await decodeGIF(image.source);
    image.gifLoopCount = getGIFLoopAmount(image.gifData) ?? defaultLoopCount;
    if (!image.gifLoopCount) {
      image.gifLoopCount = Infinity;
    }
  } catch {
    image.error = true;
  }
  image.loading = false;
}

// node_modules/@tsparticles/shape-image/browser/ImageDrawer.js
var double9 = 2;
var defaultAlpha2 = 1;
var sides3 = 12;
var defaultRatio3 = 1;
var ImageDrawer = class {
  constructor(engine) {
    this.validTypes = ["image", "images"];
    this.loadImageShape = async (imageShape) => {
      if (!this._engine.loadImage) {
        throw new Error(`${errorPrefix} image shape not initialized`);
      }
      await this._engine.loadImage({
        gif: imageShape.gif,
        name: imageShape.name,
        replaceColor: imageShape.replaceColor ?? false,
        src: imageShape.src
      });
    };
    this._engine = engine;
  }
  addImage(image) {
    if (!this._engine.images) {
      this._engine.images = [];
    }
    this._engine.images.push(image);
  }
  draw(data) {
    const { context, radius, particle, opacity } = data, image = particle.image, element = image == null ? void 0 : image.element;
    if (!image) {
      return;
    }
    context.globalAlpha = opacity;
    if (image.gif && image.gifData) {
      drawGif(data);
    } else if (element) {
      const ratio = image.ratio, pos = {
        x: -radius,
        y: -radius
      }, diameter = radius * double9;
      context.drawImage(element, pos.x, pos.y, diameter, diameter / ratio);
    }
    context.globalAlpha = defaultAlpha2;
  }
  getSidesCount() {
    return sides3;
  }
  async init(container) {
    const options = container.actualOptions;
    if (!options.preload || !this._engine.loadImage) {
      return;
    }
    for (const imageData of options.preload) {
      await this._engine.loadImage(imageData);
    }
  }
  loadShape(particle) {
    if (particle.shape !== "image" && particle.shape !== "images") {
      return;
    }
    if (!this._engine.images) {
      this._engine.images = [];
    }
    const imageData = particle.shapeData;
    if (!imageData) {
      return;
    }
    const image = this._engine.images.find((t) => t.name === imageData.name || t.source === imageData.src);
    if (!image) {
      void this.loadImageShape(imageData).then(() => {
        this.loadShape(particle);
      });
    }
  }
  particleInit(container, particle) {
    if (particle.shape !== "image" && particle.shape !== "images") {
      return;
    }
    if (!this._engine.images) {
      this._engine.images = [];
    }
    const images = this._engine.images, imageData = particle.shapeData;
    if (!imageData) {
      return;
    }
    const color = particle.getFillColor(), image = images.find((t) => t.name === imageData.name || t.source === imageData.src);
    if (!image) {
      return;
    }
    const replaceColor = imageData.replaceColor ?? image.replaceColor;
    if (image.loading) {
      setTimeout(() => {
        this.particleInit(container, particle);
      });
      return;
    }
    void (async () => {
      let imageRes;
      if (image.svgData && color) {
        imageRes = await replaceImageColor(image, imageData, color, particle);
      } else {
        imageRes = {
          color,
          data: image,
          element: image.element,
          gif: image.gif,
          gifData: image.gifData,
          gifLoopCount: image.gifLoopCount,
          loaded: true,
          ratio: imageData.width && imageData.height ? imageData.width / imageData.height : image.ratio ?? defaultRatio3,
          replaceColor,
          source: imageData.src
        };
      }
      if (!imageRes.ratio) {
        imageRes.ratio = 1;
      }
      const fill = imageData.fill ?? particle.shapeFill, close = imageData.close ?? particle.shapeClose, imageShape = {
        image: imageRes,
        fill,
        close
      };
      particle.image = imageShape.image;
      particle.shapeFill = imageShape.fill;
      particle.shapeClose = imageShape.close;
    })();
  }
};

// node_modules/@tsparticles/shape-image/browser/Options/Classes/Preload.js
var Preload = class {
  constructor() {
    this.src = "";
    this.gif = false;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.gif !== void 0) {
      this.gif = data.gif;
    }
    if (data.height !== void 0) {
      this.height = data.height;
    }
    if (data.name !== void 0) {
      this.name = data.name;
    }
    if (data.replaceColor !== void 0) {
      this.replaceColor = data.replaceColor;
    }
    if (data.src !== void 0) {
      this.src = data.src;
    }
    if (data.width !== void 0) {
      this.width = data.width;
    }
  }
};

// node_modules/@tsparticles/shape-image/browser/ImagePreloader.js
var ImagePreloaderPlugin = class {
  constructor(engine) {
    this.id = "imagePreloader";
    this._engine = engine;
  }
  async getPlugin() {
    await Promise.resolve();
    return {};
  }
  loadOptions(options, source) {
    if (!(source == null ? void 0 : source.preload)) {
      return;
    }
    if (!options.preload) {
      options.preload = [];
    }
    const preloadOptions = options.preload;
    for (const item of source.preload) {
      const existing = preloadOptions.find((t) => t.name === item.name || t.src === item.src);
      if (existing) {
        existing.load(item);
      } else {
        const preload = new Preload();
        preload.load(item);
        preloadOptions.push(preload);
      }
    }
  }
  needsPlugin() {
    return true;
  }
};

// node_modules/@tsparticles/shape-image/browser/index.js
var extLength = 3;
function addLoadImageToEngine(engine) {
  if (engine.loadImage) {
    return;
  }
  engine.loadImage = async (data) => {
    if (!data.name && !data.src) {
      throw new Error(`${errorPrefix} no image source provided`);
    }
    if (!engine.images) {
      engine.images = [];
    }
    if (engine.images.find((t) => t.name === data.name || t.source === data.src)) {
      return;
    }
    try {
      const image = {
        gif: data.gif ?? false,
        name: data.name ?? data.src,
        source: data.src,
        type: data.src.substring(data.src.length - extLength),
        error: false,
        loading: true,
        replaceColor: data.replaceColor,
        ratio: data.width && data.height ? data.width / data.height : void 0
      };
      engine.images.push(image);
      let imageFunc;
      if (data.gif) {
        imageFunc = loadGifImage;
      } else {
        imageFunc = data.replaceColor ? downloadSvgImage : loadImage;
      }
      await imageFunc(image);
    } catch {
      throw new Error(`${errorPrefix} ${data.name ?? data.src} not found`);
    }
  };
}
async function loadImageShape(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  addLoadImageToEngine(engine);
  const preloader = new ImagePreloaderPlugin(engine);
  await engine.addPlugin(preloader, refresh);
  await engine.addShape(new ImageDrawer(engine), refresh);
}

// node_modules/@tsparticles/updater-life/browser/Options/Classes/LifeDelay.js
var LifeDelay = class extends ValueWithRandom {
  constructor() {
    super();
    this.sync = false;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    super.load(data);
    if (data.sync !== void 0) {
      this.sync = data.sync;
    }
  }
};

// node_modules/@tsparticles/updater-life/browser/Options/Classes/LifeDuration.js
var LifeDuration = class extends ValueWithRandom {
  constructor() {
    super();
    this.sync = false;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    super.load(data);
    if (data.sync !== void 0) {
      this.sync = data.sync;
    }
  }
};

// node_modules/@tsparticles/updater-life/browser/Options/Classes/Life.js
var Life = class {
  constructor() {
    this.count = 0;
    this.delay = new LifeDelay();
    this.duration = new LifeDuration();
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.count !== void 0) {
      this.count = data.count;
    }
    this.delay.load(data.delay);
    this.duration.load(data.duration);
  }
};

// node_modules/@tsparticles/updater-life/browser/Utils.js
var noTime = 0;
var infiniteValue = -1;
var noLife = 0;
var minCanvasSize = 0;
function updateLife(particle, delta, canvasSize) {
  if (!particle.life) {
    return;
  }
  const life = particle.life;
  let justSpawned = false;
  if (particle.spawning) {
    life.delayTime += delta.value;
    if (life.delayTime >= particle.life.delay) {
      justSpawned = true;
      particle.spawning = false;
      life.delayTime = noTime;
      life.time = noTime;
    } else {
      return;
    }
  }
  if (life.duration === infiniteValue) {
    return;
  }
  if (particle.spawning) {
    return;
  }
  if (justSpawned) {
    life.time = noTime;
  } else {
    life.time += delta.value;
  }
  if (life.time < life.duration) {
    return;
  }
  life.time = noTime;
  if (particle.life.count > noLife) {
    particle.life.count--;
  }
  if (particle.life.count === noLife) {
    particle.destroy();
    return;
  }
  const widthRange = setRangeValue(minCanvasSize, canvasSize.width), heightRange = setRangeValue(minCanvasSize, canvasSize.width);
  particle.position.x = randomInRange(widthRange);
  particle.position.y = randomInRange(heightRange);
  particle.spawning = true;
  life.delayTime = noTime;
  life.time = noTime;
  particle.reset();
  const lifeOptions = particle.options.life;
  if (lifeOptions) {
    life.delay = getRangeValue(lifeOptions.delay.value) * millisecondsToSeconds;
    life.duration = getRangeValue(lifeOptions.duration.value) * millisecondsToSeconds;
  }
}

// node_modules/@tsparticles/updater-life/browser/LifeUpdater.js
var noTime2 = 0;
var identity4 = 1;
var infiniteValue2 = -1;
var LifeUpdater = class {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const container = this.container, particlesOptions = particle.options, lifeOptions = particlesOptions.life;
    if (!lifeOptions) {
      return;
    }
    particle.life = {
      delay: container.retina.reduceFactor ? getRangeValue(lifeOptions.delay.value) * (lifeOptions.delay.sync ? identity4 : getRandom()) / container.retina.reduceFactor * millisecondsToSeconds : noTime2,
      delayTime: noTime2,
      duration: container.retina.reduceFactor ? getRangeValue(lifeOptions.duration.value) * (lifeOptions.duration.sync ? identity4 : getRandom()) / container.retina.reduceFactor * millisecondsToSeconds : noTime2,
      time: noTime2,
      count: lifeOptions.count
    };
    if (particle.life.duration <= noTime2) {
      particle.life.duration = infiniteValue2;
    }
    if (particle.life.count <= noTime2) {
      particle.life.count = infiniteValue2;
    }
    if (particle.life) {
      particle.spawning = particle.life.delay > noTime2;
    }
  }
  isEnabled(particle) {
    return !particle.destroyed;
  }
  loadOptions(options, ...sources) {
    if (!options.life) {
      options.life = new Life();
    }
    for (const source of sources) {
      options.life.load(source == null ? void 0 : source.life);
    }
  }
  update(particle, delta) {
    if (!this.isEnabled(particle) || !particle.life) {
      return;
    }
    updateLife(particle, delta, this.container.canvas.size);
  }
};

// node_modules/@tsparticles/updater-life/browser/index.js
async function loadLifeUpdater(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addParticleUpdater("life", async (container) => {
    return Promise.resolve(new LifeUpdater(container));
  }, refresh);
}

// node_modules/@tsparticles/shape-line/browser/Utils.js
function drawLine2(data) {
  const { context, particle, radius } = data, shapeData = particle.shapeData, centerY = 0;
  context.moveTo(-radius, centerY);
  context.lineTo(radius, centerY);
  context.lineCap = (shapeData == null ? void 0 : shapeData.cap) ?? "butt";
}

// node_modules/@tsparticles/shape-line/browser/LineDrawer.js
var sides4 = 1;
var LineDrawer = class {
  constructor() {
    this.validTypes = ["line"];
  }
  draw(data) {
    drawLine2(data);
  }
  getSidesCount() {
    return sides4;
  }
};

// node_modules/@tsparticles/shape-line/browser/index.js
async function loadLineShape(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addShape(new LineDrawer(), refresh);
}

// node_modules/@tsparticles/move-parallax/browser/ParallaxMover.js
var half9 = 0.5;
var ParallaxMover = class {
  init() {
  }
  isEnabled(particle) {
    return !isSsr() && !particle.destroyed && particle.container.actualOptions.interactivity.events.onHover.parallax.enable;
  }
  move(particle) {
    const container = particle.container, options = container.actualOptions, parallaxOptions = options.interactivity.events.onHover.parallax;
    if (isSsr() || !parallaxOptions.enable) {
      return;
    }
    const parallaxForce = parallaxOptions.force, mousePos = container.interactivity.mouse.position;
    if (!mousePos) {
      return;
    }
    const canvasSize = container.canvas.size, canvasCenter = {
      x: canvasSize.width * half9,
      y: canvasSize.height * half9
    }, parallaxSmooth = parallaxOptions.smooth, factor = particle.getRadius() / parallaxForce, centerDistance = {
      x: (mousePos.x - canvasCenter.x) * factor,
      y: (mousePos.y - canvasCenter.y) * factor
    }, { offset } = particle;
    offset.x += (centerDistance.x - offset.x) / parallaxSmooth;
    offset.y += (centerDistance.y - offset.y) / parallaxSmooth;
  }
};

// node_modules/@tsparticles/move-parallax/browser/index.js
async function loadParallaxMover(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addMover("parallax", () => {
    return Promise.resolve(new ParallaxMover());
  }, refresh);
}

// node_modules/@tsparticles/interaction-particles-attract/browser/Attractor.js
var attractFactor = 1e3;
var identity5 = 1;
var Attractor2 = class extends ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {
  }
  init() {
  }
  interact(p1) {
    const container = this.container;
    if (p1.attractDistance === void 0) {
      p1.attractDistance = getRangeValue(p1.options.move.attract.distance) * container.retina.pixelRatio;
    }
    const distance = p1.attractDistance, pos1 = p1.getPosition(), query = container.particles.quadTree.queryCircle(pos1, distance);
    for (const p2 of query) {
      if (p1 === p2 || !p2.options.move.attract.enable || p2.destroyed || p2.spawning) {
        continue;
      }
      const pos2 = p2.getPosition(), { dx, dy } = getDistances(pos1, pos2), rotate = p1.options.move.attract.rotate, ax = dx / (rotate.x * attractFactor), ay = dy / (rotate.y * attractFactor), p1Factor = p2.size.value / p1.size.value, p2Factor = identity5 / p1Factor;
      p1.velocity.x -= ax * p1Factor;
      p1.velocity.y -= ay * p1Factor;
      p2.velocity.x += ax * p2Factor;
      p2.velocity.y += ay * p2Factor;
    }
  }
  isEnabled(particle) {
    return particle.options.move.attract.enable;
  }
  reset() {
  }
};

// node_modules/@tsparticles/interaction-particles-attract/browser/index.js
async function loadParticlesAttractInteraction(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addInteractor("particlesAttract", (container) => {
    return Promise.resolve(new Attractor2(container));
  }, refresh);
}

// node_modules/@tsparticles/interaction-particles-collisions/browser/Absorb.js
var half10 = 0.5;
var absorbFactor2 = 10;
var minAbsorbFactor = 0;
function updateAbsorb(p1, r1, p2, r2, delta, pixelRatio) {
  const factor = clamp(p1.options.collisions.absorb.speed * delta.factor / absorbFactor2, minAbsorbFactor, r2);
  p1.size.value += factor * half10;
  p2.size.value -= factor;
  if (r2 <= pixelRatio) {
    p2.size.value = 0;
    p2.destroy();
  }
}
function absorb(p1, p2, delta, pixelRatio) {
  const r1 = p1.getRadius(), r2 = p2.getRadius();
  if (r1 === void 0 && r2 !== void 0) {
    p1.destroy();
  } else if (r1 !== void 0 && r2 === void 0) {
    p2.destroy();
  } else if (r1 !== void 0 && r2 !== void 0) {
    if (r1 >= r2) {
      updateAbsorb(p1, r1, p2, r2, delta, pixelRatio);
    } else {
      updateAbsorb(p2, r2, p1, r1, delta, pixelRatio);
    }
  }
}

// node_modules/@tsparticles/interaction-particles-collisions/browser/Bounce.js
var fixBounceSpeed = (p) => {
  if (p.collisionMaxSpeed === void 0) {
    p.collisionMaxSpeed = getRangeValue(p.options.collisions.maxSpeed);
  }
  if (p.velocity.length > p.collisionMaxSpeed) {
    p.velocity.length = p.collisionMaxSpeed;
  }
};
function bounce(p1, p2) {
  circleBounce(circleBounceDataFromParticle(p1), circleBounceDataFromParticle(p2));
  fixBounceSpeed(p1);
  fixBounceSpeed(p2);
}

// node_modules/@tsparticles/interaction-particles-collisions/browser/Destroy.js
function destroy(p1, p2) {
  if (!p1.unbreakable && !p2.unbreakable) {
    bounce(p1, p2);
  }
  if (p1.getRadius() === void 0 && p2.getRadius() !== void 0) {
    p1.destroy();
  } else if (p1.getRadius() !== void 0 && p2.getRadius() === void 0) {
    p2.destroy();
  } else if (p1.getRadius() !== void 0 && p2.getRadius() !== void 0) {
    const deleteP = p1.getRadius() >= p2.getRadius() ? p2 : p1;
    deleteP.destroy();
  }
}

// node_modules/@tsparticles/interaction-particles-collisions/browser/ResolveCollision.js
function resolveCollision(p1, p2, delta, pixelRatio) {
  switch (p1.options.collisions.mode) {
    case CollisionMode.absorb: {
      absorb(p1, p2, delta, pixelRatio);
      break;
    }
    case CollisionMode.bounce: {
      bounce(p1, p2);
      break;
    }
    case CollisionMode.destroy: {
      destroy(p1, p2);
      break;
    }
  }
}

// node_modules/@tsparticles/interaction-particles-collisions/browser/Collider.js
var double10 = 2;
var Collider = class extends ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {
  }
  init() {
  }
  interact(p1, delta) {
    if (p1.destroyed || p1.spawning) {
      return;
    }
    const container = this.container, pos1 = p1.getPosition(), radius1 = p1.getRadius(), query = container.particles.quadTree.queryCircle(pos1, radius1 * double10);
    for (const p2 of query) {
      if (p1 === p2 || !p2.options.collisions.enable || p1.options.collisions.mode !== p2.options.collisions.mode || p2.destroyed || p2.spawning) {
        continue;
      }
      const pos2 = p2.getPosition(), radius2 = p2.getRadius();
      if (Math.abs(Math.round(pos1.z) - Math.round(pos2.z)) > radius1 + radius2) {
        continue;
      }
      const dist = getDistance(pos1, pos2), distP = radius1 + radius2;
      if (dist > distP) {
        continue;
      }
      resolveCollision(p1, p2, delta, container.retina.pixelRatio);
    }
  }
  isEnabled(particle) {
    return particle.options.collisions.enable;
  }
  reset() {
  }
};

// node_modules/@tsparticles/interaction-particles-collisions/browser/index.js
async function loadParticlesCollisionsInteraction(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addInteractor("particlesCollisions", (container) => {
    return Promise.resolve(new Collider(container));
  }, refresh);
}

// node_modules/@tsparticles/interaction-particles-links/browser/CircleWarp.js
var double11 = 2;
var CircleWarp = class extends Circle {
  constructor(x, y, radius, canvasSize) {
    super(x, y, radius);
    this.canvasSize = canvasSize;
    this.canvasSize = { ...canvasSize };
  }
  contains(point) {
    const { width, height } = this.canvasSize, { x, y } = point;
    return super.contains(point) || super.contains({ x: x - width, y }) || super.contains({ x: x - width, y: y - height }) || super.contains({ x, y: y - height });
  }
  intersects(range) {
    if (super.intersects(range)) {
      return true;
    }
    const rect = range, circle = range, newPos = {
      x: range.position.x - this.canvasSize.width,
      y: range.position.y - this.canvasSize.height
    };
    if (circle.radius !== void 0) {
      const biggerCircle = new Circle(newPos.x, newPos.y, circle.radius * double11);
      return super.intersects(biggerCircle);
    } else if (rect.size !== void 0) {
      const rectSW = new Rectangle(newPos.x, newPos.y, rect.size.width * double11, rect.size.height * double11);
      return super.intersects(rectSW);
    }
    return false;
  }
};

// node_modules/@tsparticles/interaction-particles-links/browser/Options/Classes/LinksShadow.js
var LinksShadow = class {
  constructor() {
    this.blur = 5;
    this.color = new OptionsColor();
    this.color.value = "#000";
    this.enable = false;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.blur !== void 0) {
      this.blur = data.blur;
    }
    this.color = OptionsColor.create(this.color, data.color);
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
  }
};

// node_modules/@tsparticles/interaction-particles-links/browser/Options/Classes/LinksTriangle.js
var LinksTriangle = class {
  constructor() {
    this.enable = false;
    this.frequency = 1;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.frequency !== void 0) {
      this.frequency = data.frequency;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
  }
};

// node_modules/@tsparticles/interaction-particles-links/browser/Options/Classes/Links.js
var Links = class {
  constructor() {
    this.blink = false;
    this.color = new OptionsColor();
    this.color.value = "#fff";
    this.consent = false;
    this.distance = 100;
    this.enable = false;
    this.frequency = 1;
    this.opacity = 1;
    this.shadow = new LinksShadow();
    this.triangles = new LinksTriangle();
    this.width = 1;
    this.warp = false;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.id !== void 0) {
      this.id = data.id;
    }
    if (data.blink !== void 0) {
      this.blink = data.blink;
    }
    this.color = OptionsColor.create(this.color, data.color);
    if (data.consent !== void 0) {
      this.consent = data.consent;
    }
    if (data.distance !== void 0) {
      this.distance = data.distance;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.frequency !== void 0) {
      this.frequency = data.frequency;
    }
    if (data.opacity !== void 0) {
      this.opacity = data.opacity;
    }
    this.shadow.load(data.shadow);
    this.triangles.load(data.triangles);
    if (data.width !== void 0) {
      this.width = data.width;
    }
    if (data.warp !== void 0) {
      this.warp = data.warp;
    }
  }
};

// node_modules/@tsparticles/interaction-particles-links/browser/Linker.js
var squarePower2 = 2;
var opacityOffset = 1;
var origin3 = {
  x: 0,
  y: 0
};
var minDistance6 = 0;
function getLinkDistance(pos1, pos2, optDistance, canvasSize, warp) {
  const { dx, dy, distance } = getDistances(pos1, pos2);
  if (!warp || distance <= optDistance) {
    return distance;
  }
  const absDiffs = {
    x: Math.abs(dx),
    y: Math.abs(dy)
  }, warpDistances = {
    x: Math.min(absDiffs.x, canvasSize.width - absDiffs.x),
    y: Math.min(absDiffs.y, canvasSize.height - absDiffs.y)
  };
  return Math.sqrt(warpDistances.x ** squarePower2 + warpDistances.y ** squarePower2);
}
var Linker = class extends ParticlesInteractorBase {
  constructor(container, engine) {
    super(container);
    this._setColor = (p1) => {
      if (!p1.options.links) {
        return;
      }
      const container2 = this._linkContainer, linksOptions = p1.options.links;
      let linkColor = linksOptions.id === void 0 ? container2.particles.linksColor : container2.particles.linksColors.get(linksOptions.id);
      if (linkColor) {
        return;
      }
      const optColor = linksOptions.color;
      linkColor = getLinkRandomColor(this._engine, optColor, linksOptions.blink, linksOptions.consent);
      if (linksOptions.id === void 0) {
        container2.particles.linksColor = linkColor;
      } else {
        container2.particles.linksColors.set(linksOptions.id, linkColor);
      }
    };
    this._linkContainer = container;
    this._engine = engine;
  }
  clear() {
  }
  init() {
    this._linkContainer.particles.linksColor = void 0;
    this._linkContainer.particles.linksColors = /* @__PURE__ */ new Map();
  }
  interact(p1) {
    if (!p1.options.links) {
      return;
    }
    p1.links = [];
    const pos1 = p1.getPosition(), container = this.container, canvasSize = container.canvas.size;
    if (pos1.x < origin3.x || pos1.y < origin3.y || pos1.x > canvasSize.width || pos1.y > canvasSize.height) {
      return;
    }
    const linkOpt1 = p1.options.links, optOpacity = linkOpt1.opacity, optDistance = p1.retina.linksDistance ?? minDistance6, warp = linkOpt1.warp;
    let range;
    if (warp) {
      range = new CircleWarp(pos1.x, pos1.y, optDistance, canvasSize);
    } else {
      range = new Circle(pos1.x, pos1.y, optDistance);
    }
    const query = container.particles.quadTree.query(range);
    for (const p2 of query) {
      const linkOpt2 = p2.options.links;
      if (p1 === p2 || !(linkOpt2 == null ? void 0 : linkOpt2.enable) || linkOpt1.id !== linkOpt2.id || p2.spawning || p2.destroyed || !p2.links || p1.links.some((t) => t.destination === p2) || p2.links.some((t) => t.destination === p1)) {
        continue;
      }
      const pos2 = p2.getPosition();
      if (pos2.x < origin3.x || pos2.y < origin3.y || pos2.x > canvasSize.width || pos2.y > canvasSize.height) {
        continue;
      }
      const distance = getLinkDistance(pos1, pos2, optDistance, canvasSize, warp && linkOpt2.warp);
      if (distance > optDistance) {
        continue;
      }
      const opacityLine = (opacityOffset - distance / optDistance) * optOpacity;
      this._setColor(p1);
      p1.links.push({
        destination: p2,
        opacity: opacityLine
      });
    }
  }
  isEnabled(particle) {
    var _a;
    return !!((_a = particle.options.links) == null ? void 0 : _a.enable);
  }
  loadParticlesOptions(options, ...sources) {
    if (!options.links) {
      options.links = new Links();
    }
    for (const source of sources) {
      options.links.load(source == null ? void 0 : source.links);
    }
  }
  reset() {
  }
};

// node_modules/@tsparticles/interaction-particles-links/browser/interaction.js
async function loadLinksInteraction(engine, refresh = true) {
  await engine.addInteractor("particlesLinks", async (container) => {
    return Promise.resolve(new Linker(container, engine));
  }, refresh);
}

// node_modules/@tsparticles/interaction-particles-links/browser/Utils.js
function drawTriangle(context, p1, p2, p3) {
  context.beginPath();
  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
  context.lineTo(p3.x, p3.y);
  context.closePath();
}
function drawLinkLine(params) {
  let drawn = false;
  const { begin, end, engine, maxDistance, context, canvasSize, width, backgroundMask, colorLine, opacity, links } = params;
  if (getDistance(begin, end) <= maxDistance) {
    drawLine(context, begin, end);
    drawn = true;
  } else if (links.warp) {
    let pi1;
    let pi2;
    const endNE = {
      x: end.x - canvasSize.width,
      y: end.y
    };
    const d1 = getDistances(begin, endNE);
    if (d1.distance <= maxDistance) {
      const yi = begin.y - d1.dy / d1.dx * begin.x;
      pi1 = { x: 0, y: yi };
      pi2 = { x: canvasSize.width, y: yi };
    } else {
      const endSW = {
        x: end.x,
        y: end.y - canvasSize.height
      };
      const d2 = getDistances(begin, endSW);
      if (d2.distance <= maxDistance) {
        const yi = begin.y - d2.dy / d2.dx * begin.x;
        const xi = -yi / (d2.dy / d2.dx);
        pi1 = { x: xi, y: 0 };
        pi2 = { x: xi, y: canvasSize.height };
      } else {
        const endSE = {
          x: end.x - canvasSize.width,
          y: end.y - canvasSize.height
        };
        const d3 = getDistances(begin, endSE);
        if (d3.distance <= maxDistance) {
          const yi = begin.y - d3.dy / d3.dx * begin.x;
          const xi = -yi / (d3.dy / d3.dx);
          pi1 = { x: xi, y: yi };
          pi2 = { x: pi1.x + canvasSize.width, y: pi1.y + canvasSize.height };
        }
      }
    }
    if (pi1 && pi2) {
      drawLine(context, begin, pi1);
      drawLine(context, end, pi2);
      drawn = true;
    }
  }
  if (!drawn) {
    return;
  }
  context.lineWidth = width;
  if (backgroundMask.enable) {
    context.globalCompositeOperation = backgroundMask.composite;
  }
  context.strokeStyle = getStyleFromRgb(colorLine, opacity);
  const { shadow } = links;
  if (shadow.enable) {
    const shadowColor = rangeColorToRgb(engine, shadow.color);
    if (shadowColor) {
      context.shadowBlur = shadow.blur;
      context.shadowColor = getStyleFromRgb(shadowColor);
    }
  }
  context.stroke();
}
function drawLinkTriangle(params) {
  const { context, pos1, pos2, pos3, backgroundMask, colorTriangle, opacityTriangle } = params;
  drawTriangle(context, pos1, pos2, pos3);
  if (backgroundMask.enable) {
    context.globalCompositeOperation = backgroundMask.composite;
  }
  context.fillStyle = getStyleFromRgb(colorTriangle, opacityTriangle);
  context.fill();
}
function getLinkKey(ids) {
  ids.sort((a, b) => a - b);
  return ids.join("_");
}
function setLinkFrequency(particles, dictionary) {
  const key = getLinkKey(particles.map((t) => t.id));
  let res = dictionary.get(key);
  if (res === void 0) {
    res = getRandom();
    dictionary.set(key, res);
  }
  return res;
}

// node_modules/@tsparticles/interaction-particles-links/browser/LinkInstance.js
var minOpacity2 = 0;
var minWidth = 0;
var minDistance7 = 0;
var half11 = 0.5;
var maxFrequency = 1;
var LinkInstance = class {
  constructor(container, engine) {
    this._drawLinkLine = (p1, link) => {
      const p1LinksOptions = p1.options.links;
      if (!(p1LinksOptions == null ? void 0 : p1LinksOptions.enable)) {
        return;
      }
      const container2 = this._container, options = container2.actualOptions, p2 = link.destination, pos1 = p1.getPosition(), pos2 = p2.getPosition();
      let opacity = link.opacity;
      container2.canvas.draw((ctx) => {
        var _a;
        let colorLine;
        const twinkle = (_a = p1.options.twinkle) == null ? void 0 : _a.lines;
        if (twinkle == null ? void 0 : twinkle.enable) {
          const twinkleFreq = twinkle.frequency, twinkleRgb = rangeColorToRgb(this._engine, twinkle.color), twinkling = getRandom() < twinkleFreq;
          if (twinkling && twinkleRgb) {
            colorLine = twinkleRgb;
            opacity = getRangeValue(twinkle.opacity);
          }
        }
        if (!colorLine) {
          const linkColor = p1LinksOptions.id !== void 0 ? container2.particles.linksColors.get(p1LinksOptions.id) : container2.particles.linksColor;
          colorLine = getLinkColor(p1, p2, linkColor);
        }
        if (!colorLine) {
          return;
        }
        const width = p1.retina.linksWidth ?? minWidth, maxDistance = p1.retina.linksDistance ?? minDistance7, { backgroundMask } = options;
        drawLinkLine({
          context: ctx,
          width,
          begin: pos1,
          end: pos2,
          engine: this._engine,
          maxDistance,
          canvasSize: container2.canvas.size,
          links: p1LinksOptions,
          backgroundMask,
          colorLine,
          opacity
        });
      });
    };
    this._drawLinkTriangle = (p1, link1, link2) => {
      const linksOptions = p1.options.links;
      if (!(linksOptions == null ? void 0 : linksOptions.enable)) {
        return;
      }
      const triangleOptions = linksOptions.triangles;
      if (!triangleOptions.enable) {
        return;
      }
      const container2 = this._container, options = container2.actualOptions, p2 = link1.destination, p3 = link2.destination, opacityTriangle = triangleOptions.opacity ?? (link1.opacity + link2.opacity) * half11;
      if (opacityTriangle <= minOpacity2) {
        return;
      }
      container2.canvas.draw((ctx) => {
        const pos1 = p1.getPosition(), pos2 = p2.getPosition(), pos3 = p3.getPosition(), linksDistance = p1.retina.linksDistance ?? minDistance7;
        if (getDistance(pos1, pos2) > linksDistance || getDistance(pos3, pos2) > linksDistance || getDistance(pos3, pos1) > linksDistance) {
          return;
        }
        let colorTriangle = rangeColorToRgb(this._engine, triangleOptions.color);
        if (!colorTriangle) {
          const linkColor = linksOptions.id !== void 0 ? container2.particles.linksColors.get(linksOptions.id) : container2.particles.linksColor;
          colorTriangle = getLinkColor(p1, p2, linkColor);
        }
        if (!colorTriangle) {
          return;
        }
        drawLinkTriangle({
          context: ctx,
          pos1,
          pos2,
          pos3,
          backgroundMask: options.backgroundMask,
          colorTriangle,
          opacityTriangle
        });
      });
    };
    this._drawTriangles = (options, p1, link, p1Links) => {
      var _a, _b, _c;
      const p2 = link.destination;
      if (!(((_a = options.links) == null ? void 0 : _a.triangles.enable) && ((_b = p2.options.links) == null ? void 0 : _b.triangles.enable))) {
        return;
      }
      const vertices = (_c = p2.links) == null ? void 0 : _c.filter((t) => {
        const linkFreq = this._getLinkFrequency(p2, t.destination), minCount2 = 0;
        return p2.options.links && linkFreq <= p2.options.links.frequency && p1Links.findIndex((l) => l.destination === t.destination) >= minCount2;
      });
      if (!(vertices == null ? void 0 : vertices.length)) {
        return;
      }
      for (const vertex of vertices) {
        const p3 = vertex.destination, triangleFreq = this._getTriangleFrequency(p1, p2, p3);
        if (triangleFreq > options.links.triangles.frequency) {
          continue;
        }
        this._drawLinkTriangle(p1, link, vertex);
      }
    };
    this._getLinkFrequency = (p1, p2) => {
      return setLinkFrequency([p1, p2], this._freqs.links);
    };
    this._getTriangleFrequency = (p1, p2, p3) => {
      return setLinkFrequency([p1, p2, p3], this._freqs.triangles);
    };
    this._container = container;
    this._engine = engine;
    this._freqs = {
      links: /* @__PURE__ */ new Map(),
      triangles: /* @__PURE__ */ new Map()
    };
  }
  drawParticle(context, particle) {
    const { links, options } = particle;
    if (!(links == null ? void 0 : links.length)) {
      return;
    }
    const p1Links = links.filter((l) => options.links && (options.links.frequency >= maxFrequency || this._getLinkFrequency(particle, l.destination) <= options.links.frequency));
    for (const link of p1Links) {
      this._drawTriangles(options, particle, link, p1Links);
      if (link.opacity > minOpacity2 && (particle.retina.linksWidth ?? minWidth) > minWidth) {
        this._drawLinkLine(particle, link);
      }
    }
  }
  async init() {
    this._freqs.links = /* @__PURE__ */ new Map();
    this._freqs.triangles = /* @__PURE__ */ new Map();
    await Promise.resolve();
  }
  particleCreated(particle) {
    particle.links = [];
    if (!particle.options.links) {
      return;
    }
    const ratio = this._container.retina.pixelRatio, { retina } = particle, { distance, width } = particle.options.links;
    retina.linksDistance = distance * ratio;
    retina.linksWidth = width * ratio;
  }
  particleDestroyed(particle) {
    particle.links = [];
  }
};

// node_modules/@tsparticles/interaction-particles-links/browser/LinksPlugin.js
var LinksPlugin = class {
  constructor(engine) {
    this.id = "links";
    this._engine = engine;
  }
  getPlugin(container) {
    return Promise.resolve(new LinkInstance(container, this._engine));
  }
  loadOptions() {
  }
  needsPlugin() {
    return true;
  }
};

// node_modules/@tsparticles/interaction-particles-links/browser/plugin.js
async function loadLinksPlugin(engine, refresh = true) {
  const plugin = new LinksPlugin(engine);
  await engine.addPlugin(plugin, refresh);
}

// node_modules/@tsparticles/interaction-particles-links/browser/index.js
async function loadParticlesLinksInteraction(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await loadLinksInteraction(engine, refresh);
  await loadLinksPlugin(engine, refresh);
}

// node_modules/@tsparticles/shape-polygon/browser/Utils.js
var piDeg = 180;
var origin4 = { x: 0, y: 0 };
var sidesOffset = 2;
function drawPolygon(data, start, side) {
  const { context } = data, sideCount = side.count.numerator * side.count.denominator, decimalSides = side.count.numerator / side.count.denominator, interiorAngleDegrees = piDeg * (decimalSides - sidesOffset) / decimalSides, interiorAngle = Math.PI - degToRad(interiorAngleDegrees);
  if (!context) {
    return;
  }
  context.beginPath();
  context.translate(start.x, start.y);
  context.moveTo(origin4.x, origin4.y);
  for (let i = 0; i < sideCount; i++) {
    context.lineTo(side.length, origin4.y);
    context.translate(side.length, origin4.y);
    context.rotate(interiorAngle);
  }
}

// node_modules/@tsparticles/shape-polygon/browser/PolygonDrawerBase.js
var defaultSides = 5;
var PolygonDrawerBase = class {
  draw(data) {
    const { particle, radius } = data, start = this.getCenter(particle, radius), side = this.getSidesData(particle, radius);
    drawPolygon(data, start, side);
  }
  getSidesCount(particle) {
    const polygon = particle.shapeData;
    return Math.round(getRangeValue((polygon == null ? void 0 : polygon.sides) ?? defaultSides));
  }
};

// node_modules/@tsparticles/shape-polygon/browser/PolygonDrawer.js
var sidesCenterFactor = 3.5;
var yFactor = 2.66;
var sidesFactor = 3;
var PolygonDrawer = class extends PolygonDrawerBase {
  constructor() {
    super(...arguments);
    this.validTypes = ["polygon"];
  }
  getCenter(particle, radius) {
    return {
      x: -radius / (particle.sides / sidesCenterFactor),
      y: -radius / (yFactor / sidesCenterFactor)
    };
  }
  getSidesData(particle, radius) {
    const sides7 = particle.sides;
    return {
      count: {
        denominator: 1,
        numerator: sides7
      },
      length: radius * yFactor / (sides7 / sidesFactor)
    };
  }
};

// node_modules/@tsparticles/shape-polygon/browser/TriangleDrawer.js
var yFactor2 = 1.66;
var sides5 = 3;
var double12 = 2;
var TriangleDrawer = class extends PolygonDrawerBase {
  constructor() {
    super(...arguments);
    this.validTypes = ["triangle"];
  }
  getCenter(particle, radius) {
    return {
      x: -radius,
      y: radius / yFactor2
    };
  }
  getSidesCount() {
    return sides5;
  }
  getSidesData(particle, radius) {
    const diameter = radius * double12;
    return {
      count: {
        denominator: 2,
        numerator: 3
      },
      length: diameter
    };
  }
};

// node_modules/@tsparticles/shape-polygon/browser/index.js
async function loadGenericPolygonShape(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addShape(new PolygonDrawer(), refresh);
}
async function loadTriangleShape(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addShape(new TriangleDrawer(), refresh);
}
async function loadPolygonShape(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await loadGenericPolygonShape(engine, refresh);
  await loadTriangleShape(engine, refresh);
}

// node_modules/@tsparticles/updater-rotate/browser/Options/Classes/RotateAnimation.js
var RotateAnimation = class {
  constructor() {
    this.enable = false;
    this.speed = 0;
    this.decay = 0;
    this.sync = false;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.speed !== void 0) {
      this.speed = setRangeValue(data.speed);
    }
    if (data.decay !== void 0) {
      this.decay = setRangeValue(data.decay);
    }
    if (data.sync !== void 0) {
      this.sync = data.sync;
    }
  }
};

// node_modules/@tsparticles/updater-rotate/browser/Options/Classes/Rotate.js
var Rotate = class extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new RotateAnimation();
    this.direction = RotateDirection.clockwise;
    this.path = false;
    this.value = 0;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    super.load(data);
    if (data.direction !== void 0) {
      this.direction = data.direction;
    }
    this.animation.load(data.animation);
    if (data.path !== void 0) {
      this.path = data.path;
    }
  }
};

// node_modules/@tsparticles/updater-rotate/browser/RotateUpdater.js
var double13 = 2;
var doublePI6 = Math.PI * double13;
var identity6 = 1;
var doublePIDeg = 360;
var RotateUpdater = class {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const rotateOptions = particle.options.rotate;
    if (!rotateOptions) {
      return;
    }
    particle.rotate = {
      enable: rotateOptions.animation.enable,
      value: degToRad(getRangeValue(rotateOptions.value)),
      min: 0,
      max: doublePI6
    };
    particle.pathRotation = rotateOptions.path;
    let rotateDirection = rotateOptions.direction;
    if (rotateDirection === RotateDirection.random) {
      const index = Math.floor(getRandom() * double13), minIndex2 = 0;
      rotateDirection = index > minIndex2 ? RotateDirection.counterClockwise : RotateDirection.clockwise;
    }
    switch (rotateDirection) {
      case RotateDirection.counterClockwise:
      case "counterClockwise":
        particle.rotate.status = AnimationStatus.decreasing;
        break;
      case RotateDirection.clockwise:
        particle.rotate.status = AnimationStatus.increasing;
        break;
    }
    const rotateAnimation = rotateOptions.animation;
    if (rotateAnimation.enable) {
      particle.rotate.decay = identity6 - getRangeValue(rotateAnimation.decay);
      particle.rotate.velocity = getRangeValue(rotateAnimation.speed) / doublePIDeg * this.container.retina.reduceFactor;
      if (!rotateAnimation.sync) {
        particle.rotate.velocity *= getRandom();
      }
    }
    particle.rotation = particle.rotate.value;
  }
  isEnabled(particle) {
    const rotate = particle.options.rotate;
    if (!rotate) {
      return false;
    }
    return !particle.destroyed && !particle.spawning && (!!rotate.value || rotate.animation.enable || rotate.path);
  }
  loadOptions(options, ...sources) {
    if (!options.rotate) {
      options.rotate = new Rotate();
    }
    for (const source of sources) {
      options.rotate.load(source == null ? void 0 : source.rotate);
    }
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    particle.isRotating = !!particle.rotate;
    if (!particle.rotate) {
      return;
    }
    updateAnimation(particle, particle.rotate, false, DestroyType.none, delta);
    particle.rotation = particle.rotate.value;
  }
};

// node_modules/@tsparticles/updater-rotate/browser/index.js
async function loadRotateUpdater(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addParticleUpdater("rotate", (container) => {
    return Promise.resolve(new RotateUpdater(container));
  }, refresh);
}

// node_modules/@tsparticles/shape-square/browser/Utils.js
var fixFactorSquared = 2;
var fixFactor = Math.sqrt(fixFactorSquared);
var double14 = 2;
function drawSquare(data) {
  const { context, radius } = data, fixedRadius = radius / fixFactor, fixedDiameter = fixedRadius * double14;
  context.rect(-fixedRadius, -fixedRadius, fixedDiameter, fixedDiameter);
}

// node_modules/@tsparticles/shape-square/browser/SquareDrawer.js
var sides6 = 4;
var SquareDrawer = class {
  constructor() {
    this.validTypes = ["edge", "square"];
  }
  draw(data) {
    drawSquare(data);
  }
  getSidesCount() {
    return sides6;
  }
};

// node_modules/@tsparticles/shape-square/browser/index.js
async function loadSquareShape(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addShape(new SquareDrawer(), refresh);
}

// node_modules/@tsparticles/shape-star/browser/Utils.js
var defaultInset = 2;
var origin5 = { x: 0, y: 0 };
function drawStar(data) {
  const { context, particle, radius } = data, sides7 = particle.sides, inset = particle.starInset ?? defaultInset;
  context.moveTo(origin5.x, origin5.y - radius);
  for (let i = 0; i < sides7; i++) {
    context.rotate(Math.PI / sides7);
    context.lineTo(origin5.x, origin5.y - radius * inset);
    context.rotate(Math.PI / sides7);
    context.lineTo(origin5.x, origin5.y - radius);
  }
}

// node_modules/@tsparticles/shape-star/browser/StarDrawer.js
var defaultInset2 = 2;
var defaultSides2 = 5;
var StarDrawer = class {
  constructor() {
    this.validTypes = ["star"];
  }
  draw(data) {
    drawStar(data);
  }
  getSidesCount(particle) {
    const star = particle.shapeData;
    return Math.round(getRangeValue((star == null ? void 0 : star.sides) ?? defaultSides2));
  }
  particleInit(container, particle) {
    const star = particle.shapeData;
    particle.starInset = getRangeValue((star == null ? void 0 : star.inset) ?? defaultInset2);
  }
};

// node_modules/@tsparticles/shape-star/browser/index.js
async function loadStarShape(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addShape(new StarDrawer(), refresh);
}

// node_modules/@tsparticles/updater-stroke-color/browser/StrokeColorUpdater.js
var defaultOpacity4 = 1;
var StrokeColorUpdater = class {
  constructor(container, engine) {
    this._container = container;
    this._engine = engine;
  }
  init(particle) {
    var _a;
    const container = this._container, options = particle.options;
    const stroke = itemFromSingleOrMultiple(options.stroke, particle.id, options.reduceDuplicates);
    particle.strokeWidth = getRangeValue(stroke.width) * container.retina.pixelRatio;
    particle.strokeOpacity = getRangeValue(stroke.opacity ?? defaultOpacity4);
    particle.strokeAnimation = (_a = stroke.color) == null ? void 0 : _a.animation;
    const strokeHslColor = rangeColorToHsl(this._engine, stroke.color) ?? particle.getFillColor();
    if (strokeHslColor) {
      particle.strokeColor = getHslAnimationFromHsl(strokeHslColor, particle.strokeAnimation, container.retina.reduceFactor);
    }
  }
  isEnabled(particle) {
    const color = particle.strokeAnimation, { strokeColor } = particle;
    return !particle.destroyed && !particle.spawning && !!color && ((strokeColor == null ? void 0 : strokeColor.h.value) !== void 0 && strokeColor.h.enable || (strokeColor == null ? void 0 : strokeColor.s.value) !== void 0 && strokeColor.s.enable || (strokeColor == null ? void 0 : strokeColor.l.value) !== void 0 && strokeColor.l.enable);
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateColor(particle.strokeColor, delta);
  }
};

// node_modules/@tsparticles/updater-stroke-color/browser/index.js
async function loadStrokeColorUpdater(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addParticleUpdater("strokeColor", (container) => {
    return Promise.resolve(new StrokeColorUpdater(container, engine));
  }, refresh);
}

// node_modules/@tsparticles/slim/browser/index.js
async function loadSlim(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await loadParallaxMover(engine, false);
  await loadExternalAttractInteraction(engine, false);
  await loadExternalBounceInteraction(engine, false);
  await loadExternalBubbleInteraction(engine, false);
  await loadExternalConnectInteraction(engine, false);
  await loadExternalGrabInteraction(engine, false);
  await loadExternalPauseInteraction(engine, false);
  await loadExternalPushInteraction(engine, false);
  await loadExternalRemoveInteraction(engine, false);
  await loadExternalRepulseInteraction(engine, false);
  await loadExternalSlowInteraction(engine, false);
  await loadParticlesAttractInteraction(engine, false);
  await loadParticlesCollisionsInteraction(engine, false);
  await loadParticlesLinksInteraction(engine, false);
  await loadEasingQuadPlugin(engine, false);
  await loadEmojiShape(engine, false);
  await loadImageShape(engine, false);
  await loadLineShape(engine, false);
  await loadPolygonShape(engine, false);
  await loadSquareShape(engine, false);
  await loadStarShape(engine, false);
  await loadLifeUpdater(engine, false);
  await loadRotateUpdater(engine, false);
  await loadStrokeColorUpdater(engine, false);
  await loadBasic(engine, refresh);
}

// node_modules/@tsparticles/shape-text/browser/Utils.js
var double15 = 2;
var half12 = 0.5;
function drawText(data) {
  const { context, particle, radius, opacity } = data, character = particle.shapeData;
  if (!character) {
    return;
  }
  const textData = character.value;
  if (textData === void 0) {
    return;
  }
  if (particle.text === void 0) {
    particle.text = itemFromSingleOrMultiple(textData, particle.randomIndexData);
  }
  const text = particle.text, style = character.style ?? "", weight = character.weight ?? "400", size = Math.round(radius) * double15, font = character.font ?? "Verdana", fill = particle.shapeFill;
  const lines = text == null ? void 0 : text.split("\n");
  if (!lines) {
    return;
  }
  context.font = `${style} ${weight} ${size}px "${font}"`;
  context.globalAlpha = opacity;
  for (let i = 0; i < lines.length; i++) {
    drawLine3(context, lines[i], radius, opacity, i, fill);
  }
  context.globalAlpha = 1;
}
function drawLine3(context, line, radius, opacity, index, fill) {
  const offsetX = line.length * radius * half12, pos = {
    x: -offsetX,
    y: radius * half12
  }, diameter = radius * double15;
  if (fill) {
    context.fillText(line, pos.x, pos.y + diameter * index);
  } else {
    context.strokeText(line, pos.x, pos.y + diameter * index);
  }
}

// node_modules/@tsparticles/shape-text/browser/TextDrawer.js
var TextDrawer = class {
  constructor() {
    this.validTypes = ["text", "character", "char", "multiline-text"];
  }
  draw(data) {
    drawText(data);
  }
  async init(container) {
    const options = container.actualOptions, { validTypes } = this;
    if (validTypes.find((t) => isInArray(t, options.particles.shape.type))) {
      const shapeOptions = validTypes.map((t) => options.particles.shape.options[t]).find((t) => !!t), promises = [];
      executeOnSingleOrMultiple(shapeOptions, (shape) => {
        promises.push(loadFont(shape.font, shape.weight));
      });
      await Promise.all(promises);
    }
  }
  particleInit(container, particle) {
    if (!particle.shape || !this.validTypes.includes(particle.shape)) {
      return;
    }
    const character = particle.shapeData;
    if (character === void 0) {
      return;
    }
    const textData = character.value;
    if (textData === void 0) {
      return;
    }
    particle.text = itemFromSingleOrMultiple(textData, particle.randomIndexData);
  }
};

// node_modules/@tsparticles/shape-text/browser/index.js
async function loadTextShape(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addShape(new TextDrawer(), refresh);
}

// node_modules/@tsparticles/updater-tilt/browser/TiltDirection.js
var TiltDirection;
(function(TiltDirection2) {
  TiltDirection2["clockwise"] = "clockwise";
  TiltDirection2["counterClockwise"] = "counter-clockwise";
  TiltDirection2["random"] = "random";
})(TiltDirection || (TiltDirection = {}));

// node_modules/@tsparticles/updater-tilt/browser/Options/Classes/TiltAnimation.js
var TiltAnimation = class {
  constructor() {
    this.enable = false;
    this.speed = 0;
    this.decay = 0;
    this.sync = false;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.speed !== void 0) {
      this.speed = setRangeValue(data.speed);
    }
    if (data.decay !== void 0) {
      this.decay = setRangeValue(data.decay);
    }
    if (data.sync !== void 0) {
      this.sync = data.sync;
    }
  }
};

// node_modules/@tsparticles/updater-tilt/browser/Options/Classes/Tilt.js
var Tilt = class extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new TiltAnimation();
    this.direction = TiltDirection.clockwise;
    this.enable = false;
    this.value = 0;
  }
  load(data) {
    super.load(data);
    if (isNull(data)) {
      return;
    }
    this.animation.load(data.animation);
    if (data.direction !== void 0) {
      this.direction = data.direction;
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
  }
};

// node_modules/@tsparticles/updater-tilt/browser/TiltUpdater.js
var identity7 = 1;
var double16 = 2;
var doublePI7 = Math.PI * double16;
var maxAngle4 = 360;
var TiltUpdater = class {
  constructor(container) {
    this.container = container;
  }
  getTransformValues(particle) {
    var _a;
    const tilt = ((_a = particle.tilt) == null ? void 0 : _a.enable) && particle.tilt;
    return {
      b: tilt ? Math.cos(tilt.value) * tilt.cosDirection : void 0,
      c: tilt ? Math.sin(tilt.value) * tilt.sinDirection : void 0
    };
  }
  init(particle) {
    var _a;
    const tiltOptions = particle.options.tilt;
    if (!tiltOptions) {
      return;
    }
    particle.tilt = {
      enable: tiltOptions.enable,
      value: degToRad(getRangeValue(tiltOptions.value)),
      sinDirection: getRandom() >= half ? identity7 : -identity7,
      cosDirection: getRandom() >= half ? identity7 : -identity7,
      min: 0,
      max: doublePI7
    };
    let tiltDirection = tiltOptions.direction;
    if (tiltDirection === TiltDirection.random) {
      const index = Math.floor(getRandom() * double16), minIndex2 = 0;
      tiltDirection = index > minIndex2 ? TiltDirection.counterClockwise : TiltDirection.clockwise;
    }
    switch (tiltDirection) {
      case TiltDirection.counterClockwise:
      case "counterClockwise":
        particle.tilt.status = AnimationStatus.decreasing;
        break;
      case TiltDirection.clockwise:
        particle.tilt.status = AnimationStatus.increasing;
        break;
    }
    const tiltAnimation = (_a = particle.options.tilt) == null ? void 0 : _a.animation;
    if (tiltAnimation == null ? void 0 : tiltAnimation.enable) {
      particle.tilt.decay = identity7 - getRangeValue(tiltAnimation.decay);
      particle.tilt.velocity = getRangeValue(tiltAnimation.speed) / maxAngle4 * this.container.retina.reduceFactor;
      if (!tiltAnimation.sync) {
        particle.tilt.velocity *= getRandom();
      }
    }
  }
  isEnabled(particle) {
    var _a;
    const tiltAnimation = (_a = particle.options.tilt) == null ? void 0 : _a.animation;
    return !particle.destroyed && !particle.spawning && !!(tiltAnimation == null ? void 0 : tiltAnimation.enable);
  }
  loadOptions(options, ...sources) {
    if (!options.tilt) {
      options.tilt = new Tilt();
    }
    for (const source of sources) {
      options.tilt.load(source == null ? void 0 : source.tilt);
    }
  }
  async update(particle, delta) {
    if (!this.isEnabled(particle) || !particle.tilt) {
      return;
    }
    updateAnimation(particle, particle.tilt, false, DestroyType.none, delta);
    await Promise.resolve();
  }
};

// node_modules/@tsparticles/updater-tilt/browser/index.js
async function loadTiltUpdater(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addParticleUpdater("tilt", (container) => {
    return Promise.resolve(new TiltUpdater(container));
  }, refresh);
}

// node_modules/@tsparticles/updater-twinkle/browser/Options/Classes/TwinkleValues.js
var TwinkleValues = class {
  constructor() {
    this.enable = false;
    this.frequency = 0.05;
    this.opacity = 1;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.color !== void 0) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.frequency !== void 0) {
      this.frequency = data.frequency;
    }
    if (data.opacity !== void 0) {
      this.opacity = setRangeValue(data.opacity);
    }
  }
};

// node_modules/@tsparticles/updater-twinkle/browser/Options/Classes/Twinkle.js
var Twinkle = class {
  constructor() {
    this.lines = new TwinkleValues();
    this.particles = new TwinkleValues();
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    this.lines.load(data.lines);
    this.particles.load(data.particles);
  }
};

// node_modules/@tsparticles/updater-twinkle/browser/TwinkleUpdater.js
var TwinkleUpdater = class {
  constructor(engine) {
    this._engine = engine;
  }
  getColorStyles(particle, context, radius, opacity) {
    const pOptions = particle.options, twinkleOptions = pOptions.twinkle;
    if (!twinkleOptions) {
      return {};
    }
    const twinkle = twinkleOptions.particles, twinkling = twinkle.enable && getRandom() < twinkle.frequency, zIndexOptions = particle.options.zIndex, zOffset = 1, zOpacityFactor = (zOffset - particle.zIndexFactor) ** zIndexOptions.opacityRate, twinklingOpacity = twinkling ? getRangeValue(twinkle.opacity) * zOpacityFactor : opacity, twinkleRgb = rangeColorToHsl(this._engine, twinkle.color), twinkleStyle = twinkleRgb ? getStyleFromHsl(twinkleRgb, twinklingOpacity) : void 0, res = {}, needsTwinkle = twinkling && twinkleStyle;
    res.fill = needsTwinkle ? twinkleStyle : void 0;
    res.stroke = needsTwinkle ? twinkleStyle : void 0;
    return res;
  }
  async init() {
    await Promise.resolve();
  }
  isEnabled(particle) {
    const pOptions = particle.options, twinkleOptions = pOptions.twinkle;
    if (!twinkleOptions) {
      return false;
    }
    return twinkleOptions.particles.enable;
  }
  loadOptions(options, ...sources) {
    if (!options.twinkle) {
      options.twinkle = new Twinkle();
    }
    for (const source of sources) {
      options.twinkle.load(source == null ? void 0 : source.twinkle);
    }
  }
  async update() {
    await Promise.resolve();
  }
};

// node_modules/@tsparticles/updater-twinkle/browser/index.js
async function loadTwinkleUpdater(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addParticleUpdater("twinkle", () => {
    return Promise.resolve(new TwinkleUpdater(engine));
  }, refresh);
}

// node_modules/@tsparticles/updater-wobble/browser/Options/Classes/WobbleSpeed.js
var WobbleSpeed = class {
  constructor() {
    this.angle = 50;
    this.move = 10;
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.angle !== void 0) {
      this.angle = setRangeValue(data.angle);
    }
    if (data.move !== void 0) {
      this.move = setRangeValue(data.move);
    }
  }
};

// node_modules/@tsparticles/updater-wobble/browser/Options/Classes/Wobble.js
var Wobble = class {
  constructor() {
    this.distance = 5;
    this.enable = false;
    this.speed = new WobbleSpeed();
  }
  load(data) {
    if (isNull(data)) {
      return;
    }
    if (data.distance !== void 0) {
      this.distance = setRangeValue(data.distance);
    }
    if (data.enable !== void 0) {
      this.enable = data.enable;
    }
    if (data.speed !== void 0) {
      if (isNumber(data.speed)) {
        this.speed.load({ angle: data.speed });
      } else {
        const rangeSpeed = data.speed;
        if (rangeSpeed.min !== void 0) {
          this.speed.load({ angle: rangeSpeed });
        } else {
          this.speed.load(data.speed);
        }
      }
    }
  }
};

// node_modules/@tsparticles/updater-wobble/browser/Utils.js
var defaultDistance = 0;
var double17 = 2;
var doublePI8 = Math.PI * double17;
var distanceFactor = 60;
function updateWobble(particle, delta) {
  const { wobble: wobbleOptions } = particle.options, { wobble } = particle;
  if (!(wobbleOptions == null ? void 0 : wobbleOptions.enable) || !wobble) {
    return;
  }
  const angleSpeed = wobble.angleSpeed * delta.factor, moveSpeed = wobble.moveSpeed * delta.factor, distance = moveSpeed * ((particle.retina.wobbleDistance ?? defaultDistance) * delta.factor) / (millisecondsToSeconds / distanceFactor), max = doublePI8, { position } = particle;
  wobble.angle += angleSpeed;
  if (wobble.angle > max) {
    wobble.angle -= max;
  }
  position.x += distance * Math.cos(wobble.angle);
  position.y += distance * Math.abs(Math.sin(wobble.angle));
}

// node_modules/@tsparticles/updater-wobble/browser/WobbleUpdater.js
var double18 = 2;
var doublePI9 = Math.PI * double18;
var maxAngle5 = 360;
var moveSpeedFactor2 = 10;
var defaultDistance2 = 0;
var WobbleUpdater = class {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const wobbleOpt = particle.options.wobble;
    if (wobbleOpt == null ? void 0 : wobbleOpt.enable) {
      particle.wobble = {
        angle: getRandom() * doublePI9,
        angleSpeed: getRangeValue(wobbleOpt.speed.angle) / maxAngle5,
        moveSpeed: getRangeValue(wobbleOpt.speed.move) / moveSpeedFactor2
      };
    } else {
      particle.wobble = {
        angle: 0,
        angleSpeed: 0,
        moveSpeed: 0
      };
    }
    particle.retina.wobbleDistance = getRangeValue((wobbleOpt == null ? void 0 : wobbleOpt.distance) ?? defaultDistance2) * this.container.retina.pixelRatio;
  }
  isEnabled(particle) {
    var _a;
    return !particle.destroyed && !particle.spawning && !!((_a = particle.options.wobble) == null ? void 0 : _a.enable);
  }
  loadOptions(options, ...sources) {
    if (!options.wobble) {
      options.wobble = new Wobble();
    }
    for (const source of sources) {
      options.wobble.load(source == null ? void 0 : source.wobble);
    }
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateWobble(particle, delta);
  }
};

// node_modules/@tsparticles/updater-wobble/browser/index.js
async function loadWobbleUpdater(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await engine.addParticleUpdater("wobble", (container) => {
    return Promise.resolve(new WobbleUpdater(container));
  }, refresh);
}

// node_modules/tsparticles/browser/index.js
async function loadFull(engine, refresh = true) {
  engine.checkVersion("3.8.1");
  await loadDestroyUpdater(engine, false);
  await loadRollUpdater(engine, false);
  await loadTiltUpdater(engine, false);
  await loadTwinkleUpdater(engine, false);
  await loadWobbleUpdater(engine, false);
  await loadTextShape(engine, false);
  await loadExternalTrailInteraction(engine, false);
  await loadAbsorbersPlugin(engine, false);
  await loadEmittersPlugin(engine, false);
  await loadEmittersShapeCircle(engine, false);
  await loadEmittersShapeSquare(engine, false);
  await loadSlim(engine, refresh);
}
export {
  loadFull
};
//# sourceMappingURL=tsparticles.js.map
