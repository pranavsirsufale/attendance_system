import {
  require_react_dom
} from "./chunk-CJK34UIW.js";
import {
  clsx_default
} from "./chunk-2KHBIA62.js";
import {
  require_react
} from "./chunk-W24JOBID.js";
import {
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/@react-aria/utils/dist/useLayoutEffect.mjs
var import_react = __toESM(require_react(), 1);
var $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c = typeof document !== "undefined" ? (0, import_react.default).useLayoutEffect : () => {
};

// node_modules/@react-aria/utils/dist/useEffectEvent.mjs
var import_react2 = __toESM(require_react(), 1);
function $8ae05eaa5c114e9c$export$7f54fc3180508a52(fn) {
  const ref = (0, import_react2.useRef)(null);
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    ref.current = fn;
  }, [
    fn
  ]);
  return (0, import_react2.useCallback)((...args) => {
    const f21 = ref.current;
    return f21 === null || f21 === void 0 ? void 0 : f21(...args);
  }, []);
}

// node_modules/@react-aria/utils/dist/useValueEffect.mjs
var import_react3 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/useId.mjs
var import_react5 = __toESM(require_react(), 1);

// node_modules/@react-aria/ssr/dist/SSRProvider.mjs
var import_react4 = __toESM(require_react(), 1);
var $b5e257d569688ac6$var$defaultContext = {
  prefix: String(Math.round(Math.random() * 1e10)),
  current: 0
};
var $b5e257d569688ac6$var$SSRContext = (0, import_react4.default).createContext($b5e257d569688ac6$var$defaultContext);
var $b5e257d569688ac6$var$IsSSRContext = (0, import_react4.default).createContext(false);
var $b5e257d569688ac6$var$canUseDOM = Boolean(typeof window !== "undefined" && window.document && window.document.createElement);
var $b5e257d569688ac6$var$componentIds = /* @__PURE__ */ new WeakMap();
function $b5e257d569688ac6$var$useCounter(isDisabled2 = false) {
  let ctx = (0, import_react4.useContext)($b5e257d569688ac6$var$SSRContext);
  let ref = (0, import_react4.useRef)(null);
  if (ref.current === null && !isDisabled2) {
    var _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner, _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    let currentOwner = (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = (0, import_react4.default).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) === null || _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === void 0 ? void 0 : (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner = _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner) === null || _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner === void 0 ? void 0 : _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner.current;
    if (currentOwner) {
      let prevComponentValue = $b5e257d569688ac6$var$componentIds.get(currentOwner);
      if (prevComponentValue == null)
        $b5e257d569688ac6$var$componentIds.set(currentOwner, {
          id: ctx.current,
          state: currentOwner.memoizedState
        });
      else if (currentOwner.memoizedState !== prevComponentValue.state) {
        ctx.current = prevComponentValue.id;
        $b5e257d569688ac6$var$componentIds.delete(currentOwner);
      }
    }
    ref.current = ++ctx.current;
  }
  return ref.current;
}
function $b5e257d569688ac6$var$useLegacySSRSafeId(defaultId) {
  let ctx = (0, import_react4.useContext)($b5e257d569688ac6$var$SSRContext);
  if (ctx === $b5e257d569688ac6$var$defaultContext && !$b5e257d569688ac6$var$canUseDOM && true) console.warn("When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.");
  let counter = $b5e257d569688ac6$var$useCounter(!!defaultId);
  let prefix = ctx === $b5e257d569688ac6$var$defaultContext && false ? "react-aria" : `react-aria${ctx.prefix}`;
  return defaultId || `${prefix}-${counter}`;
}
function $b5e257d569688ac6$var$useModernSSRSafeId(defaultId) {
  let id = (0, import_react4.default).useId();
  let [didSSR] = (0, import_react4.useState)($b5e257d569688ac6$export$535bd6ca7f90a273());
  let prefix = didSSR || false ? "react-aria" : `react-aria${$b5e257d569688ac6$var$defaultContext.prefix}`;
  return defaultId || `${prefix}-${id}`;
}
var $b5e257d569688ac6$export$619500959fc48b26 = typeof (0, import_react4.default)["useId"] === "function" ? $b5e257d569688ac6$var$useModernSSRSafeId : $b5e257d569688ac6$var$useLegacySSRSafeId;
function $b5e257d569688ac6$var$getSnapshot() {
  return false;
}
function $b5e257d569688ac6$var$getServerSnapshot() {
  return true;
}
function $b5e257d569688ac6$var$subscribe(onStoreChange) {
  return () => {
  };
}
function $b5e257d569688ac6$export$535bd6ca7f90a273() {
  if (typeof (0, import_react4.default)["useSyncExternalStore"] === "function") return (0, import_react4.default)["useSyncExternalStore"]($b5e257d569688ac6$var$subscribe, $b5e257d569688ac6$var$getSnapshot, $b5e257d569688ac6$var$getServerSnapshot);
  return (0, import_react4.useContext)($b5e257d569688ac6$var$IsSSRContext);
}

// node_modules/@react-aria/utils/dist/useId.mjs
var $bdb11010cef70236$var$canUseDOM = Boolean(typeof window !== "undefined" && window.document && window.document.createElement);
var $bdb11010cef70236$export$d41a04c74483c6ef = /* @__PURE__ */ new Map();
var $bdb11010cef70236$var$registry;
if (typeof FinalizationRegistry !== "undefined") $bdb11010cef70236$var$registry = new FinalizationRegistry((heldValue) => {
  $bdb11010cef70236$export$d41a04c74483c6ef.delete(heldValue);
});
function $bdb11010cef70236$export$cd8c9cb68f842629(idA, idB) {
  if (idA === idB) return idA;
  let setIdsA = $bdb11010cef70236$export$d41a04c74483c6ef.get(idA);
  if (setIdsA) {
    setIdsA.forEach((ref) => ref.current = idB);
    return idB;
  }
  let setIdsB = $bdb11010cef70236$export$d41a04c74483c6ef.get(idB);
  if (setIdsB) {
    setIdsB.forEach((ref) => ref.current = idA);
    return idA;
  }
  return idB;
}

// node_modules/@react-aria/utils/dist/chain.mjs
function $ff5963eb1fccf552$export$e08e3b67e392101e(...callbacks) {
  return (...args) => {
    for (let callback of callbacks) if (typeof callback === "function") callback(...args);
  };
}

// node_modules/@react-aria/utils/dist/domHelpers.mjs
var $431fbd86ca7dc216$export$b204af158042fbac = (el) => {
  var _el_ownerDocument;
  return (_el_ownerDocument = el === null || el === void 0 ? void 0 : el.ownerDocument) !== null && _el_ownerDocument !== void 0 ? _el_ownerDocument : document;
};
var $431fbd86ca7dc216$export$f21a1ffae260145a = (el) => {
  if (el && "window" in el && el.window === el) return el;
  const doc = $431fbd86ca7dc216$export$b204af158042fbac(el);
  return doc.defaultView || window;
};
function $431fbd86ca7dc216$var$isNode(value) {
  return value !== null && typeof value === "object" && "nodeType" in value && typeof value.nodeType === "number";
}
function $431fbd86ca7dc216$export$af51f0f06c0f328a(node) {
  return $431fbd86ca7dc216$var$isNode(node) && node.nodeType === Node.DOCUMENT_FRAGMENT_NODE && "host" in node;
}

// node_modules/@react-stately/flags/dist/import.mjs
var $f4e2df6bd15f8569$var$_shadowDOM = false;
function $f4e2df6bd15f8569$export$98658e8c59125e6a() {
  return $f4e2df6bd15f8569$var$_shadowDOM;
}

// node_modules/@react-aria/utils/dist/DOMFunctions.mjs
function $d4ee10de306f2510$export$4282f70798064fe0(node, otherNode) {
  if (!(0, $f4e2df6bd15f8569$export$98658e8c59125e6a)()) return otherNode && node ? node.contains(otherNode) : false;
  if (!node || !otherNode) return false;
  let currentNode = otherNode;
  while (currentNode !== null) {
    if (currentNode === node) return true;
    if (currentNode.tagName === "SLOT" && currentNode.assignedSlot)
      currentNode = currentNode.assignedSlot.parentNode;
    else if ((0, $431fbd86ca7dc216$export$af51f0f06c0f328a)(currentNode))
      currentNode = currentNode.host;
    else currentNode = currentNode.parentNode;
  }
  return false;
}
var $d4ee10de306f2510$export$cd4e5573fbe2b576 = (doc = document) => {
  var _activeElement_shadowRoot;
  if (!(0, $f4e2df6bd15f8569$export$98658e8c59125e6a)()) return doc.activeElement;
  let activeElement2 = doc.activeElement;
  while (activeElement2 && "shadowRoot" in activeElement2 && ((_activeElement_shadowRoot = activeElement2.shadowRoot) === null || _activeElement_shadowRoot === void 0 ? void 0 : _activeElement_shadowRoot.activeElement)) activeElement2 = activeElement2.shadowRoot.activeElement;
  return activeElement2;
};
function $d4ee10de306f2510$export$e58f029f0fbfdb29(event) {
  if ((0, $f4e2df6bd15f8569$export$98658e8c59125e6a)() && event.target.shadowRoot) {
    if (event.composedPath) return event.composedPath()[0];
  }
  return event.target;
}

// node_modules/@react-aria/utils/dist/mergeProps.mjs
function $3ef42575df84b30b$export$9d1611c77c2fe928(...args) {
  let result = {
    ...args[0]
  };
  for (let i15 = 1; i15 < args.length; i15++) {
    let props = args[i15];
    for (let key in props) {
      let a20 = result[key];
      let b9 = props[key];
      if (typeof a20 === "function" && typeof b9 === "function" && // This is a lot faster than a regex.
      key[0] === "o" && key[1] === "n" && key.charCodeAt(2) >= /* 'A' */
      65 && key.charCodeAt(2) <= /* 'Z' */
      90) result[key] = (0, $ff5963eb1fccf552$export$e08e3b67e392101e)(a20, b9);
      else if ((key === "className" || key === "UNSAFE_className") && typeof a20 === "string" && typeof b9 === "string") result[key] = (0, clsx_default)(a20, b9);
      else if (key === "id" && a20 && b9) result.id = (0, $bdb11010cef70236$export$cd8c9cb68f842629)(a20, b9);
      else result[key] = b9 !== void 0 ? b9 : a20;
    }
  }
  return result;
}

// node_modules/@react-aria/utils/dist/mergeRefs.mjs
function $5dc95899b306f630$export$c9058316764c140e(...refs) {
  if (refs.length === 1 && refs[0]) return refs[0];
  return (value) => {
    for (let ref of refs) {
      if (typeof ref === "function") ref(value);
      else if (ref != null) ref.current = value;
    }
  };
}

// node_modules/@react-aria/utils/dist/focusWithoutScrolling.mjs
function $7215afc6de606d6b$export$de79e2c695e052f3(element) {
  if ($7215afc6de606d6b$var$supportsPreventScroll()) element.focus({
    preventScroll: true
  });
  else {
    let scrollableElements = $7215afc6de606d6b$var$getScrollableElements(element);
    element.focus();
    $7215afc6de606d6b$var$restoreScrollPosition(scrollableElements);
  }
}
var $7215afc6de606d6b$var$supportsPreventScrollCached = null;
function $7215afc6de606d6b$var$supportsPreventScroll() {
  if ($7215afc6de606d6b$var$supportsPreventScrollCached == null) {
    $7215afc6de606d6b$var$supportsPreventScrollCached = false;
    try {
      let focusElem = document.createElement("div");
      focusElem.focus({
        get preventScroll() {
          $7215afc6de606d6b$var$supportsPreventScrollCached = true;
          return true;
        }
      });
    } catch {
    }
  }
  return $7215afc6de606d6b$var$supportsPreventScrollCached;
}
function $7215afc6de606d6b$var$getScrollableElements(element) {
  let parent = element.parentNode;
  let scrollableElements = [];
  let rootScrollingElement = document.scrollingElement || document.documentElement;
  while (parent instanceof HTMLElement && parent !== rootScrollingElement) {
    if (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth) scrollableElements.push({
      element: parent,
      scrollTop: parent.scrollTop,
      scrollLeft: parent.scrollLeft
    });
    parent = parent.parentNode;
  }
  if (rootScrollingElement instanceof HTMLElement) scrollableElements.push({
    element: rootScrollingElement,
    scrollTop: rootScrollingElement.scrollTop,
    scrollLeft: rootScrollingElement.scrollLeft
  });
  return scrollableElements;
}
function $7215afc6de606d6b$var$restoreScrollPosition(scrollableElements) {
  for (let { element, scrollTop, scrollLeft } of scrollableElements) {
    element.scrollTop = scrollTop;
    element.scrollLeft = scrollLeft;
  }
}

// node_modules/@react-aria/utils/dist/platform.mjs
function $c87311424ea30a05$var$testUserAgent(re4) {
  var _window_navigator_userAgentData;
  if (typeof window === "undefined" || window.navigator == null) return false;
  return ((_window_navigator_userAgentData = window.navigator["userAgentData"]) === null || _window_navigator_userAgentData === void 0 ? void 0 : _window_navigator_userAgentData.brands.some((brand) => re4.test(brand.brand))) || re4.test(window.navigator.userAgent);
}
function $c87311424ea30a05$var$testPlatform(re4) {
  var _window_navigator_userAgentData;
  return typeof window !== "undefined" && window.navigator != null ? re4.test(((_window_navigator_userAgentData = window.navigator["userAgentData"]) === null || _window_navigator_userAgentData === void 0 ? void 0 : _window_navigator_userAgentData.platform) || window.navigator.platform) : false;
}
function $c87311424ea30a05$var$cached(fn) {
  if (false) return fn;
  let res = null;
  return () => {
    if (res == null) res = fn();
    return res;
  };
}
var $c87311424ea30a05$export$9ac100e40613ea10 = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$var$testPlatform(/^Mac/i);
});
var $c87311424ea30a05$export$186c6964ca17d99 = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$var$testPlatform(/^iPhone/i);
});
var $c87311424ea30a05$export$7bef049ce92e4224 = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$var$testPlatform(/^iPad/i) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
  $c87311424ea30a05$export$9ac100e40613ea10() && navigator.maxTouchPoints > 1;
});
var $c87311424ea30a05$export$fedb369cb70207f1 = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$export$186c6964ca17d99() || $c87311424ea30a05$export$7bef049ce92e4224();
});
var $c87311424ea30a05$export$e1865c3bedcd822b = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$export$9ac100e40613ea10() || $c87311424ea30a05$export$fedb369cb70207f1();
});
var $c87311424ea30a05$export$78551043582a6a98 = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$var$testUserAgent(/AppleWebKit/i) && !$c87311424ea30a05$export$6446a186d09e379e();
});
var $c87311424ea30a05$export$6446a186d09e379e = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$var$testUserAgent(/Chrome/i);
});
var $c87311424ea30a05$export$a11b0059900ceec8 = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$var$testUserAgent(/Android/i);
});
var $c87311424ea30a05$export$b7d78993b74f766d = $c87311424ea30a05$var$cached(function() {
  return $c87311424ea30a05$var$testUserAgent(/Firefox/i);
});

// node_modules/@react-aria/utils/dist/openLink.mjs
var import_react6 = __toESM(require_react(), 1);
var $ea8dcbcb9ea1b556$var$RouterContext = (0, import_react6.createContext)({
  isNative: true,
  open: $ea8dcbcb9ea1b556$var$openSyntheticLink,
  useHref: (href) => href
});
function $ea8dcbcb9ea1b556$export$95185d699e05d4d7(target, modifiers, setOpening = true) {
  var _window_event_type, _window_event;
  let { metaKey, ctrlKey, altKey, shiftKey } = modifiers;
  if ((0, $c87311424ea30a05$export$b7d78993b74f766d)() && ((_window_event = window.event) === null || _window_event === void 0 ? void 0 : (_window_event_type = _window_event.type) === null || _window_event_type === void 0 ? void 0 : _window_event_type.startsWith("key")) && target.target === "_blank") {
    if ((0, $c87311424ea30a05$export$9ac100e40613ea10)()) metaKey = true;
    else ctrlKey = true;
  }
  let event = (0, $c87311424ea30a05$export$78551043582a6a98)() && (0, $c87311424ea30a05$export$9ac100e40613ea10)() && !(0, $c87311424ea30a05$export$7bef049ce92e4224)() && true ? new KeyboardEvent("keydown", {
    keyIdentifier: "Enter",
    metaKey,
    ctrlKey,
    altKey,
    shiftKey
  }) : new MouseEvent("click", {
    metaKey,
    ctrlKey,
    altKey,
    shiftKey,
    bubbles: true,
    cancelable: true
  });
  $ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening = setOpening;
  (0, $7215afc6de606d6b$export$de79e2c695e052f3)(target);
  target.dispatchEvent(event);
  $ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening = false;
}
$ea8dcbcb9ea1b556$export$95185d699e05d4d7.isOpening = false;
function $ea8dcbcb9ea1b556$var$getSyntheticLink(target, open) {
  if (target instanceof HTMLAnchorElement) open(target);
  else if (target.hasAttribute("data-href")) {
    let link = document.createElement("a");
    link.href = target.getAttribute("data-href");
    if (target.hasAttribute("data-target")) link.target = target.getAttribute("data-target");
    if (target.hasAttribute("data-rel")) link.rel = target.getAttribute("data-rel");
    if (target.hasAttribute("data-download")) link.download = target.getAttribute("data-download");
    if (target.hasAttribute("data-ping")) link.ping = target.getAttribute("data-ping");
    if (target.hasAttribute("data-referrer-policy")) link.referrerPolicy = target.getAttribute("data-referrer-policy");
    target.appendChild(link);
    open(link);
    target.removeChild(link);
  }
}
function $ea8dcbcb9ea1b556$var$openSyntheticLink(target, modifiers) {
  $ea8dcbcb9ea1b556$var$getSyntheticLink(target, (link) => $ea8dcbcb9ea1b556$export$95185d699e05d4d7(link, modifiers));
}

// node_modules/@react-aria/utils/dist/runAfterTransition.mjs
var $bbed8b41f857bcc0$var$transitionsByElement = /* @__PURE__ */ new Map();
var $bbed8b41f857bcc0$var$transitionCallbacks = /* @__PURE__ */ new Set();
function $bbed8b41f857bcc0$var$setupGlobalEvents() {
  if (typeof window === "undefined") return;
  function isTransitionEvent(event) {
    return "propertyName" in event;
  }
  let onTransitionStart = (e8) => {
    if (!isTransitionEvent(e8) || !e8.target) return;
    let transitions = $bbed8b41f857bcc0$var$transitionsByElement.get(e8.target);
    if (!transitions) {
      transitions = /* @__PURE__ */ new Set();
      $bbed8b41f857bcc0$var$transitionsByElement.set(e8.target, transitions);
      e8.target.addEventListener("transitioncancel", onTransitionEnd, {
        once: true
      });
    }
    transitions.add(e8.propertyName);
  };
  let onTransitionEnd = (e8) => {
    if (!isTransitionEvent(e8) || !e8.target) return;
    let properties = $bbed8b41f857bcc0$var$transitionsByElement.get(e8.target);
    if (!properties) return;
    properties.delete(e8.propertyName);
    if (properties.size === 0) {
      e8.target.removeEventListener("transitioncancel", onTransitionEnd);
      $bbed8b41f857bcc0$var$transitionsByElement.delete(e8.target);
    }
    if ($bbed8b41f857bcc0$var$transitionsByElement.size === 0) {
      for (let cb of $bbed8b41f857bcc0$var$transitionCallbacks) cb();
      $bbed8b41f857bcc0$var$transitionCallbacks.clear();
    }
  };
  document.body.addEventListener("transitionrun", onTransitionStart);
  document.body.addEventListener("transitionend", onTransitionEnd);
}
if (typeof document !== "undefined") {
  if (document.readyState !== "loading") $bbed8b41f857bcc0$var$setupGlobalEvents();
  else document.addEventListener("DOMContentLoaded", $bbed8b41f857bcc0$var$setupGlobalEvents);
}
function $bbed8b41f857bcc0$export$24490316f764c430(fn) {
  requestAnimationFrame(() => {
    if ($bbed8b41f857bcc0$var$transitionsByElement.size === 0) fn();
    else $bbed8b41f857bcc0$var$transitionCallbacks.add(fn);
  });
}

// node_modules/@react-aria/utils/dist/useDrag1D.mjs
var import_react7 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/useGlobalListeners.mjs
var import_react8 = __toESM(require_react(), 1);
function $03deb23ff14920c4$export$4eaf04e54aa8eed6() {
  let globalListeners = (0, import_react8.useRef)(/* @__PURE__ */ new Map());
  let addGlobalListener = (0, import_react8.useCallback)((eventTarget, type, listener, options) => {
    let fn = (options === null || options === void 0 ? void 0 : options.once) ? (...args) => {
      globalListeners.current.delete(listener);
      listener(...args);
    } : listener;
    globalListeners.current.set(listener, {
      type,
      eventTarget,
      fn,
      options
    });
    eventTarget.addEventListener(type, fn, options);
  }, []);
  let removeGlobalListener = (0, import_react8.useCallback)((eventTarget, type, listener, options) => {
    var _globalListeners_current_get;
    let fn = ((_globalListeners_current_get = globalListeners.current.get(listener)) === null || _globalListeners_current_get === void 0 ? void 0 : _globalListeners_current_get.fn) || listener;
    eventTarget.removeEventListener(type, fn, options);
    globalListeners.current.delete(listener);
  }, []);
  let removeAllGlobalListeners = (0, import_react8.useCallback)(() => {
    globalListeners.current.forEach((value, key) => {
      removeGlobalListener(value.eventTarget, value.type, key, value.options);
    });
  }, [
    removeGlobalListener
  ]);
  (0, import_react8.useEffect)(() => {
    return removeAllGlobalListeners;
  }, [
    removeAllGlobalListeners
  ]);
  return {
    addGlobalListener,
    removeGlobalListener,
    removeAllGlobalListeners
  };
}

// node_modules/@react-aria/utils/dist/useObjectRef.mjs
var import_react9 = __toESM(require_react(), 1);
function $df56164dff5785e2$export$4338b53315abf666(forwardedRef) {
  const objRef = (0, import_react9.useRef)(null);
  return (0, import_react9.useMemo)(() => ({
    get current() {
      return objRef.current;
    },
    set current(value) {
      objRef.current = value;
      if (typeof forwardedRef === "function") forwardedRef(value);
      else if (forwardedRef) forwardedRef.current = value;
    }
  }), [
    forwardedRef
  ]);
}

// node_modules/@react-aria/utils/dist/useUpdateEffect.mjs
var import_react10 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/useUpdateLayoutEffect.mjs
var import_react11 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/useResizeObserver.mjs
var import_react12 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/useSyncRef.mjs
function $e7801be82b4b2a53$export$4debdb1a3f0fa79e(context, ref) {
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    if (context && context.ref && ref) {
      context.ref.current = ref.current;
      return () => {
        if (context.ref) context.ref.current = null;
      };
    }
  });
}

// node_modules/@react-aria/utils/dist/useViewportSize.mjs
var import_react13 = __toESM(require_react(), 1);
var $5df64b3807dc15ee$var$visualViewport = typeof document !== "undefined" && window.visualViewport;

// node_modules/@react-aria/utils/dist/useDescription.mjs
var import_react14 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/useEvent.mjs
var import_react15 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/isVirtualEvent.mjs
function $6a7db85432448f7f$export$60278871457622de(event) {
  if (event.mozInputSource === 0 && event.isTrusted) return true;
  if ((0, $c87311424ea30a05$export$a11b0059900ceec8)() && event.pointerType) return event.type === "click" && event.buttons === 1;
  return event.detail === 0 && !event.pointerType;
}
function $6a7db85432448f7f$export$29bf1b5f2c56cf63(event) {
  return !(0, $c87311424ea30a05$export$a11b0059900ceec8)() && event.width === 0 && event.height === 0 || event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === "mouse";
}

// node_modules/@react-aria/utils/dist/useDeepMemo.mjs
var import_react16 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/useFormReset.mjs
var import_react17 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/useLoadMore.mjs
var import_react18 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/inertValue.mjs
var import_react19 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/animation.mjs
var import_react_dom = __toESM(require_react_dom(), 1);
var import_react20 = __toESM(require_react(), 1);

// node_modules/@react-aria/utils/dist/isFocusable.mjs
var $b4b717babfbb907b$var$focusableElements = [
  "input:not([disabled]):not([type=hidden])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "a[href]",
  "area[href]",
  "summary",
  "iframe",
  "object",
  "embed",
  "audio[controls]",
  "video[controls]",
  '[contenteditable]:not([contenteditable^="false"])'
];
var $b4b717babfbb907b$var$FOCUSABLE_ELEMENT_SELECTOR = $b4b717babfbb907b$var$focusableElements.join(":not([hidden]),") + ",[tabindex]:not([disabled]):not([hidden])";
$b4b717babfbb907b$var$focusableElements.push('[tabindex]:not([tabindex="-1"]):not([disabled])');
var $b4b717babfbb907b$var$TABBABLE_ELEMENT_SELECTOR = $b4b717babfbb907b$var$focusableElements.join(':not([hidden]):not([tabindex="-1"]),');
function $b4b717babfbb907b$export$4c063cf1350e6fed(element) {
  return element.matches($b4b717babfbb907b$var$FOCUSABLE_ELEMENT_SELECTOR);
}

// node_modules/@react-stately/utils/dist/useControlledState.mjs
var import_react21 = __toESM(require_react(), 1);

// node_modules/@react-aria/interactions/dist/utils.mjs
var import_react22 = __toESM(require_react(), 1);
function $8a9cb279dc87e130$export$525bc4921d56d4a(nativeEvent) {
  let event = nativeEvent;
  event.nativeEvent = nativeEvent;
  event.isDefaultPrevented = () => event.defaultPrevented;
  event.isPropagationStopped = () => event.cancelBubble;
  event.persist = () => {
  };
  return event;
}
function $8a9cb279dc87e130$export$c2b7abe5d61ec696(event, target) {
  Object.defineProperty(event, "target", {
    value: target
  });
  Object.defineProperty(event, "currentTarget", {
    value: target
  });
}
function $8a9cb279dc87e130$export$715c682d09d639cc(onBlur) {
  let stateRef = (0, import_react22.useRef)({
    isFocused: false,
    observer: null
  });
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    const state = stateRef.current;
    return () => {
      if (state.observer) {
        state.observer.disconnect();
        state.observer = null;
      }
    };
  }, []);
  let dispatchBlur = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)((e8) => {
    onBlur === null || onBlur === void 0 ? void 0 : onBlur(e8);
  });
  return (0, import_react22.useCallback)((e8) => {
    if (e8.target instanceof HTMLButtonElement || e8.target instanceof HTMLInputElement || e8.target instanceof HTMLTextAreaElement || e8.target instanceof HTMLSelectElement) {
      stateRef.current.isFocused = true;
      let target = e8.target;
      let onBlurHandler = (e9) => {
        stateRef.current.isFocused = false;
        if (target.disabled) {
          let event = $8a9cb279dc87e130$export$525bc4921d56d4a(e9);
          dispatchBlur(event);
        }
        if (stateRef.current.observer) {
          stateRef.current.observer.disconnect();
          stateRef.current.observer = null;
        }
      };
      target.addEventListener("focusout", onBlurHandler, {
        once: true
      });
      stateRef.current.observer = new MutationObserver(() => {
        if (stateRef.current.isFocused && target.disabled) {
          var _stateRef_current_observer;
          (_stateRef_current_observer = stateRef.current.observer) === null || _stateRef_current_observer === void 0 ? void 0 : _stateRef_current_observer.disconnect();
          let relatedTargetEl = target === document.activeElement ? null : document.activeElement;
          target.dispatchEvent(new FocusEvent("blur", {
            relatedTarget: relatedTargetEl
          }));
          target.dispatchEvent(new FocusEvent("focusout", {
            bubbles: true,
            relatedTarget: relatedTargetEl
          }));
        }
      });
      stateRef.current.observer.observe(target, {
        attributes: true,
        attributeFilter: [
          "disabled"
        ]
      });
    }
  }, [
    dispatchBlur
  ]);
}
var $8a9cb279dc87e130$export$fda7da73ab5d4c48 = false;
function $8a9cb279dc87e130$export$cabe61c495ee3649(target) {
  while (target && !(0, $b4b717babfbb907b$export$4c063cf1350e6fed)(target)) target = target.parentElement;
  let window2 = (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(target);
  let activeElement2 = window2.document.activeElement;
  if (!activeElement2 || activeElement2 === target) return;
  $8a9cb279dc87e130$export$fda7da73ab5d4c48 = true;
  let isRefocusing = false;
  let onBlur = (e8) => {
    if (e8.target === activeElement2 || isRefocusing) e8.stopImmediatePropagation();
  };
  let onFocusOut = (e8) => {
    if (e8.target === activeElement2 || isRefocusing) {
      e8.stopImmediatePropagation();
      if (!target && !isRefocusing) {
        isRefocusing = true;
        (0, $7215afc6de606d6b$export$de79e2c695e052f3)(activeElement2);
        cleanup2();
      }
    }
  };
  let onFocus = (e8) => {
    if (e8.target === target || isRefocusing) e8.stopImmediatePropagation();
  };
  let onFocusIn = (e8) => {
    if (e8.target === target || isRefocusing) {
      e8.stopImmediatePropagation();
      if (!isRefocusing) {
        isRefocusing = true;
        (0, $7215afc6de606d6b$export$de79e2c695e052f3)(activeElement2);
        cleanup2();
      }
    }
  };
  window2.addEventListener("blur", onBlur, true);
  window2.addEventListener("focusout", onFocusOut, true);
  window2.addEventListener("focusin", onFocusIn, true);
  window2.addEventListener("focus", onFocus, true);
  let cleanup2 = () => {
    cancelAnimationFrame(raf);
    window2.removeEventListener("blur", onBlur, true);
    window2.removeEventListener("focusout", onFocusOut, true);
    window2.removeEventListener("focusin", onFocusIn, true);
    window2.removeEventListener("focus", onFocus, true);
    $8a9cb279dc87e130$export$fda7da73ab5d4c48 = false;
    isRefocusing = false;
  };
  let raf = requestAnimationFrame(cleanup2);
  return cleanup2;
}

// node_modules/@react-aria/interactions/dist/textSelection.mjs
var $14c0b72509d70225$var$state = "default";
var $14c0b72509d70225$var$savedUserSelect = "";
var $14c0b72509d70225$var$modifiedElementMap = /* @__PURE__ */ new WeakMap();
function $14c0b72509d70225$export$16a4697467175487(target) {
  if ((0, $c87311424ea30a05$export$fedb369cb70207f1)()) {
    if ($14c0b72509d70225$var$state === "default") {
      const documentObject = (0, $431fbd86ca7dc216$export$b204af158042fbac)(target);
      $14c0b72509d70225$var$savedUserSelect = documentObject.documentElement.style.webkitUserSelect;
      documentObject.documentElement.style.webkitUserSelect = "none";
    }
    $14c0b72509d70225$var$state = "disabled";
  } else if (target instanceof HTMLElement || target instanceof SVGElement) {
    let property = "userSelect" in target.style ? "userSelect" : "webkitUserSelect";
    $14c0b72509d70225$var$modifiedElementMap.set(target, target.style[property]);
    target.style[property] = "none";
  }
}
function $14c0b72509d70225$export$b0d6fa1ab32e3295(target) {
  if ((0, $c87311424ea30a05$export$fedb369cb70207f1)()) {
    if ($14c0b72509d70225$var$state !== "disabled") return;
    $14c0b72509d70225$var$state = "restoring";
    setTimeout(() => {
      (0, $bbed8b41f857bcc0$export$24490316f764c430)(() => {
        if ($14c0b72509d70225$var$state === "restoring") {
          const documentObject = (0, $431fbd86ca7dc216$export$b204af158042fbac)(target);
          if (documentObject.documentElement.style.webkitUserSelect === "none") documentObject.documentElement.style.webkitUserSelect = $14c0b72509d70225$var$savedUserSelect || "";
          $14c0b72509d70225$var$savedUserSelect = "";
          $14c0b72509d70225$var$state = "default";
        }
      });
    }, 300);
  } else if (target instanceof HTMLElement || target instanceof SVGElement) {
    if (target && $14c0b72509d70225$var$modifiedElementMap.has(target)) {
      let targetOldUserSelect = $14c0b72509d70225$var$modifiedElementMap.get(target);
      let property = "userSelect" in target.style ? "userSelect" : "webkitUserSelect";
      if (target.style[property] === "none") target.style[property] = targetOldUserSelect;
      if (target.getAttribute("style") === "") target.removeAttribute("style");
      $14c0b72509d70225$var$modifiedElementMap.delete(target);
    }
  }
}

// node_modules/@react-aria/interactions/dist/context.mjs
var import_react23 = __toESM(require_react(), 1);
var $ae1eeba8b9eafd08$export$5165eccb35aaadb5 = (0, import_react23.default).createContext({
  register: () => {
  }
});
$ae1eeba8b9eafd08$export$5165eccb35aaadb5.displayName = "PressResponderContext";

// node_modules/@swc/helpers/esm/_class_apply_descriptor_get.js
function _class_apply_descriptor_get(receiver, descriptor) {
  if (descriptor.get) return descriptor.get.call(receiver);
  return descriptor.value;
}

// node_modules/@swc/helpers/esm/_class_extract_field_descriptor.js
function _class_extract_field_descriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) throw new TypeError("attempted to " + action + " private field on non-instance");
  return privateMap.get(receiver);
}

// node_modules/@swc/helpers/esm/_class_private_field_get.js
function _class_private_field_get(receiver, privateMap) {
  var descriptor = _class_extract_field_descriptor(receiver, privateMap, "get");
  return _class_apply_descriptor_get(receiver, descriptor);
}

// node_modules/@swc/helpers/esm/_check_private_redeclaration.js
function _check_private_redeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}

// node_modules/@swc/helpers/esm/_class_private_field_init.js
function _class_private_field_init(obj, privateMap, value) {
  _check_private_redeclaration(obj, privateMap);
  privateMap.set(obj, value);
}

// node_modules/@swc/helpers/esm/_class_apply_descriptor_set.js
function _class_apply_descriptor_set(receiver, descriptor, value) {
  if (descriptor.set) descriptor.set.call(receiver, value);
  else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    descriptor.value = value;
  }
}

// node_modules/@swc/helpers/esm/_class_private_field_set.js
function _class_private_field_set(receiver, privateMap, value) {
  var descriptor = _class_extract_field_descriptor(receiver, privateMap, "set");
  _class_apply_descriptor_set(receiver, descriptor, value);
  return value;
}

// node_modules/@react-aria/interactions/dist/usePress.mjs
var import_react_dom2 = __toESM(require_react_dom(), 1);
var import_react24 = __toESM(require_react(), 1);
function $f6c31cce2adf654f$var$usePressResponderContext(props) {
  let context = (0, import_react24.useContext)((0, $ae1eeba8b9eafd08$export$5165eccb35aaadb5));
  if (context) {
    let { register, ...contextProps } = context;
    props = (0, $3ef42575df84b30b$export$9d1611c77c2fe928)(contextProps, props);
    register();
  }
  (0, $e7801be82b4b2a53$export$4debdb1a3f0fa79e)(context, props.ref);
  return props;
}
var $f6c31cce2adf654f$var$_shouldStopPropagation = /* @__PURE__ */ new WeakMap();
var $f6c31cce2adf654f$var$PressEvent = class {
  continuePropagation() {
    (0, _class_private_field_set)(this, $f6c31cce2adf654f$var$_shouldStopPropagation, false);
  }
  get shouldStopPropagation() {
    return (0, _class_private_field_get)(this, $f6c31cce2adf654f$var$_shouldStopPropagation);
  }
  constructor(type, pointerType, originalEvent, state) {
    (0, _class_private_field_init)(this, $f6c31cce2adf654f$var$_shouldStopPropagation, {
      writable: true,
      value: void 0
    });
    (0, _class_private_field_set)(this, $f6c31cce2adf654f$var$_shouldStopPropagation, true);
    var _state_target;
    let currentTarget = (_state_target = state === null || state === void 0 ? void 0 : state.target) !== null && _state_target !== void 0 ? _state_target : originalEvent.currentTarget;
    const rect = currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.getBoundingClientRect();
    let x11, y7 = 0;
    let clientX, clientY = null;
    if (originalEvent.clientX != null && originalEvent.clientY != null) {
      clientX = originalEvent.clientX;
      clientY = originalEvent.clientY;
    }
    if (rect) {
      if (clientX != null && clientY != null) {
        x11 = clientX - rect.left;
        y7 = clientY - rect.top;
      } else {
        x11 = rect.width / 2;
        y7 = rect.height / 2;
      }
    }
    this.type = type;
    this.pointerType = pointerType;
    this.target = originalEvent.currentTarget;
    this.shiftKey = originalEvent.shiftKey;
    this.metaKey = originalEvent.metaKey;
    this.ctrlKey = originalEvent.ctrlKey;
    this.altKey = originalEvent.altKey;
    this.x = x11;
    this.y = y7;
  }
};
var $f6c31cce2adf654f$var$LINK_CLICKED = Symbol("linkClicked");
function $f6c31cce2adf654f$export$45712eceda6fad21(props) {
  let { onPress, onPressChange, onPressStart, onPressEnd, onPressUp, onClick, isDisabled: isDisabled2, isPressed: isPressedProp, preventFocusOnPress, shouldCancelOnPointerExit, allowTextSelectionOnPress, ref: domRef, ...domProps } = $f6c31cce2adf654f$var$usePressResponderContext(props);
  let [isPressed, setPressed] = (0, import_react24.useState)(false);
  let ref = (0, import_react24.useRef)({
    isPressed: false,
    ignoreEmulatedMouseEvents: false,
    didFirePressStart: false,
    isTriggeringEvent: false,
    activePointerId: null,
    target: null,
    isOverTarget: false,
    pointerType: null,
    disposables: []
  });
  let { addGlobalListener, removeAllGlobalListeners } = (0, $03deb23ff14920c4$export$4eaf04e54aa8eed6)();
  let triggerPressStart = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)((originalEvent, pointerType) => {
    let state = ref.current;
    if (isDisabled2 || state.didFirePressStart) return false;
    let shouldStopPropagation = true;
    state.isTriggeringEvent = true;
    if (onPressStart) {
      let event = new $f6c31cce2adf654f$var$PressEvent("pressstart", pointerType, originalEvent);
      onPressStart(event);
      shouldStopPropagation = event.shouldStopPropagation;
    }
    if (onPressChange) onPressChange(true);
    state.isTriggeringEvent = false;
    state.didFirePressStart = true;
    setPressed(true);
    return shouldStopPropagation;
  });
  let triggerPressEnd = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)((originalEvent, pointerType, wasPressed = true) => {
    let state = ref.current;
    if (!state.didFirePressStart) return false;
    state.didFirePressStart = false;
    state.isTriggeringEvent = true;
    let shouldStopPropagation = true;
    if (onPressEnd) {
      let event = new $f6c31cce2adf654f$var$PressEvent("pressend", pointerType, originalEvent);
      onPressEnd(event);
      shouldStopPropagation = event.shouldStopPropagation;
    }
    if (onPressChange) onPressChange(false);
    setPressed(false);
    if (onPress && wasPressed && !isDisabled2) {
      let event = new $f6c31cce2adf654f$var$PressEvent("press", pointerType, originalEvent);
      onPress(event);
      shouldStopPropagation && (shouldStopPropagation = event.shouldStopPropagation);
    }
    state.isTriggeringEvent = false;
    return shouldStopPropagation;
  });
  let triggerPressUp = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)((originalEvent, pointerType) => {
    let state = ref.current;
    if (isDisabled2) return false;
    if (onPressUp) {
      state.isTriggeringEvent = true;
      let event = new $f6c31cce2adf654f$var$PressEvent("pressup", pointerType, originalEvent);
      onPressUp(event);
      state.isTriggeringEvent = false;
      return event.shouldStopPropagation;
    }
    return true;
  });
  let cancel = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)((e8) => {
    let state = ref.current;
    if (state.isPressed && state.target) {
      if (state.didFirePressStart && state.pointerType != null) triggerPressEnd($f6c31cce2adf654f$var$createEvent(state.target, e8), state.pointerType, false);
      state.isPressed = false;
      state.isOverTarget = false;
      state.activePointerId = null;
      state.pointerType = null;
      removeAllGlobalListeners();
      if (!allowTextSelectionOnPress) (0, $14c0b72509d70225$export$b0d6fa1ab32e3295)(state.target);
      for (let dispose of state.disposables) dispose();
      state.disposables = [];
    }
  });
  let cancelOnPointerExit = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)((e8) => {
    if (shouldCancelOnPointerExit) cancel(e8);
  });
  let triggerClick = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)((e8) => {
    onClick === null || onClick === void 0 ? void 0 : onClick(e8);
  });
  let triggerSyntheticClick = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)((e8, target) => {
    if (onClick) {
      let event = new MouseEvent("click", e8);
      (0, $8a9cb279dc87e130$export$c2b7abe5d61ec696)(event, target);
      onClick((0, $8a9cb279dc87e130$export$525bc4921d56d4a)(event));
    }
  });
  let pressProps = (0, import_react24.useMemo)(() => {
    let state = ref.current;
    let pressProps2 = {
      onKeyDown(e8) {
        if ($f6c31cce2adf654f$var$isValidKeyboardEvent(e8.nativeEvent, e8.currentTarget) && (0, $d4ee10de306f2510$export$4282f70798064fe0)(e8.currentTarget, (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e8.nativeEvent))) {
          var _state_metaKeyEvents;
          if ($f6c31cce2adf654f$var$shouldPreventDefaultKeyboard((0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e8.nativeEvent), e8.key)) e8.preventDefault();
          let shouldStopPropagation = true;
          if (!state.isPressed && !e8.repeat) {
            state.target = e8.currentTarget;
            state.isPressed = true;
            state.pointerType = "keyboard";
            shouldStopPropagation = triggerPressStart(e8, "keyboard");
            let originalTarget = e8.currentTarget;
            let pressUp = (e9) => {
              if ($f6c31cce2adf654f$var$isValidKeyboardEvent(e9, originalTarget) && !e9.repeat && (0, $d4ee10de306f2510$export$4282f70798064fe0)(originalTarget, (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e9)) && state.target) triggerPressUp($f6c31cce2adf654f$var$createEvent(state.target, e9), "keyboard");
            };
            addGlobalListener((0, $431fbd86ca7dc216$export$b204af158042fbac)(e8.currentTarget), "keyup", (0, $ff5963eb1fccf552$export$e08e3b67e392101e)(pressUp, onKeyUp), true);
          }
          if (shouldStopPropagation) e8.stopPropagation();
          if (e8.metaKey && (0, $c87311424ea30a05$export$9ac100e40613ea10)()) (_state_metaKeyEvents = state.metaKeyEvents) === null || _state_metaKeyEvents === void 0 ? void 0 : _state_metaKeyEvents.set(e8.key, e8.nativeEvent);
        } else if (e8.key === "Meta") state.metaKeyEvents = /* @__PURE__ */ new Map();
      },
      onClick(e8) {
        if (e8 && !(0, $d4ee10de306f2510$export$4282f70798064fe0)(e8.currentTarget, (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e8.nativeEvent))) return;
        if (e8 && e8.button === 0 && !state.isTriggeringEvent && !(0, $ea8dcbcb9ea1b556$export$95185d699e05d4d7).isOpening) {
          let shouldStopPropagation = true;
          if (isDisabled2) e8.preventDefault();
          if (!state.ignoreEmulatedMouseEvents && !state.isPressed && (state.pointerType === "virtual" || (0, $6a7db85432448f7f$export$60278871457622de)(e8.nativeEvent))) {
            let stopPressStart = triggerPressStart(e8, "virtual");
            let stopPressUp = triggerPressUp(e8, "virtual");
            let stopPressEnd = triggerPressEnd(e8, "virtual");
            triggerClick(e8);
            shouldStopPropagation = stopPressStart && stopPressUp && stopPressEnd;
          } else if (state.isPressed && state.pointerType !== "keyboard") {
            let pointerType = state.pointerType || e8.nativeEvent.pointerType || "virtual";
            shouldStopPropagation = triggerPressEnd($f6c31cce2adf654f$var$createEvent(e8.currentTarget, e8), pointerType, true);
            state.isOverTarget = false;
            triggerClick(e8);
            cancel(e8);
          }
          state.ignoreEmulatedMouseEvents = false;
          if (shouldStopPropagation) e8.stopPropagation();
        }
      }
    };
    let onKeyUp = (e8) => {
      var _state_metaKeyEvents;
      if (state.isPressed && state.target && $f6c31cce2adf654f$var$isValidKeyboardEvent(e8, state.target)) {
        var _state_metaKeyEvents1;
        if ($f6c31cce2adf654f$var$shouldPreventDefaultKeyboard((0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e8), e8.key)) e8.preventDefault();
        let target = (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e8);
        let wasPressed = (0, $d4ee10de306f2510$export$4282f70798064fe0)(state.target, (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e8));
        triggerPressEnd($f6c31cce2adf654f$var$createEvent(state.target, e8), "keyboard", wasPressed);
        if (wasPressed) triggerSyntheticClick(e8, state.target);
        removeAllGlobalListeners();
        if (e8.key !== "Enter" && $f6c31cce2adf654f$var$isHTMLAnchorLink(state.target) && (0, $d4ee10de306f2510$export$4282f70798064fe0)(state.target, target) && !e8[$f6c31cce2adf654f$var$LINK_CLICKED]) {
          e8[$f6c31cce2adf654f$var$LINK_CLICKED] = true;
          (0, $ea8dcbcb9ea1b556$export$95185d699e05d4d7)(state.target, e8, false);
        }
        state.isPressed = false;
        (_state_metaKeyEvents1 = state.metaKeyEvents) === null || _state_metaKeyEvents1 === void 0 ? void 0 : _state_metaKeyEvents1.delete(e8.key);
      } else if (e8.key === "Meta" && ((_state_metaKeyEvents = state.metaKeyEvents) === null || _state_metaKeyEvents === void 0 ? void 0 : _state_metaKeyEvents.size)) {
        var _state_target;
        let events = state.metaKeyEvents;
        state.metaKeyEvents = void 0;
        for (let event of events.values()) (_state_target = state.target) === null || _state_target === void 0 ? void 0 : _state_target.dispatchEvent(new KeyboardEvent("keyup", event));
      }
    };
    if (typeof PointerEvent !== "undefined") {
      pressProps2.onPointerDown = (e8) => {
        if (e8.button !== 0 || !(0, $d4ee10de306f2510$export$4282f70798064fe0)(e8.currentTarget, (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e8.nativeEvent))) return;
        if ((0, $6a7db85432448f7f$export$29bf1b5f2c56cf63)(e8.nativeEvent)) {
          state.pointerType = "virtual";
          return;
        }
        state.pointerType = e8.pointerType;
        let shouldStopPropagation = true;
        if (!state.isPressed) {
          state.isPressed = true;
          state.isOverTarget = true;
          state.activePointerId = e8.pointerId;
          state.target = e8.currentTarget;
          if (!allowTextSelectionOnPress) (0, $14c0b72509d70225$export$16a4697467175487)(state.target);
          shouldStopPropagation = triggerPressStart(e8, state.pointerType);
          let target = (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e8.nativeEvent);
          if ("releasePointerCapture" in target) target.releasePointerCapture(e8.pointerId);
          addGlobalListener((0, $431fbd86ca7dc216$export$b204af158042fbac)(e8.currentTarget), "pointerup", onPointerUp, false);
          addGlobalListener((0, $431fbd86ca7dc216$export$b204af158042fbac)(e8.currentTarget), "pointercancel", onPointerCancel, false);
        }
        if (shouldStopPropagation) e8.stopPropagation();
      };
      pressProps2.onMouseDown = (e8) => {
        if (!(0, $d4ee10de306f2510$export$4282f70798064fe0)(e8.currentTarget, (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e8.nativeEvent))) return;
        if (e8.button === 0) {
          if (preventFocusOnPress) {
            let dispose = (0, $8a9cb279dc87e130$export$cabe61c495ee3649)(e8.target);
            if (dispose) state.disposables.push(dispose);
          }
          e8.stopPropagation();
        }
      };
      pressProps2.onPointerUp = (e8) => {
        if (!(0, $d4ee10de306f2510$export$4282f70798064fe0)(e8.currentTarget, (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e8.nativeEvent)) || state.pointerType === "virtual") return;
        if (e8.button === 0) triggerPressUp(e8, state.pointerType || e8.pointerType);
      };
      pressProps2.onPointerEnter = (e8) => {
        if (e8.pointerId === state.activePointerId && state.target && !state.isOverTarget && state.pointerType != null) {
          state.isOverTarget = true;
          triggerPressStart($f6c31cce2adf654f$var$createEvent(state.target, e8), state.pointerType);
        }
      };
      pressProps2.onPointerLeave = (e8) => {
        if (e8.pointerId === state.activePointerId && state.target && state.isOverTarget && state.pointerType != null) {
          state.isOverTarget = false;
          triggerPressEnd($f6c31cce2adf654f$var$createEvent(state.target, e8), state.pointerType, false);
          cancelOnPointerExit(e8);
        }
      };
      let onPointerUp = (e8) => {
        if (e8.pointerId === state.activePointerId && state.isPressed && e8.button === 0 && state.target) {
          if ((0, $d4ee10de306f2510$export$4282f70798064fe0)(state.target, (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e8)) && state.pointerType != null) {
            let clicked = false;
            let timeout = setTimeout(() => {
              if (state.isPressed && state.target instanceof HTMLElement) {
                if (clicked) cancel(e8);
                else {
                  (0, $7215afc6de606d6b$export$de79e2c695e052f3)(state.target);
                  state.target.click();
                }
              }
            }, 80);
            addGlobalListener(e8.currentTarget, "click", () => clicked = true, true);
            state.disposables.push(() => clearTimeout(timeout));
          } else cancel(e8);
          state.isOverTarget = false;
        }
      };
      let onPointerCancel = (e8) => {
        cancel(e8);
      };
      pressProps2.onDragStart = (e8) => {
        if (!(0, $d4ee10de306f2510$export$4282f70798064fe0)(e8.currentTarget, (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e8.nativeEvent))) return;
        cancel(e8);
      };
    } else if (false) {
      pressProps2.onMouseDown = (e8) => {
        if (e8.button !== 0 || !(0, $d4ee10de306f2510$export$4282f70798064fe0)(e8.currentTarget, (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e8.nativeEvent))) return;
        if (state.ignoreEmulatedMouseEvents) {
          e8.stopPropagation();
          return;
        }
        state.isPressed = true;
        state.isOverTarget = true;
        state.target = e8.currentTarget;
        state.pointerType = (0, $6a7db85432448f7f$export$60278871457622de)(e8.nativeEvent) ? "virtual" : "mouse";
        let shouldStopPropagation = (0, import_react_dom2.flushSync)(() => triggerPressStart(e8, state.pointerType));
        if (shouldStopPropagation) e8.stopPropagation();
        if (preventFocusOnPress) {
          let dispose = (0, $8a9cb279dc87e130$export$cabe61c495ee3649)(e8.target);
          if (dispose) state.disposables.push(dispose);
        }
        addGlobalListener((0, $431fbd86ca7dc216$export$b204af158042fbac)(e8.currentTarget), "mouseup", onMouseUp, false);
      };
      pressProps2.onMouseEnter = (e8) => {
        if (!(0, $d4ee10de306f2510$export$4282f70798064fe0)(e8.currentTarget, (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e8.nativeEvent))) return;
        let shouldStopPropagation = true;
        if (state.isPressed && !state.ignoreEmulatedMouseEvents && state.pointerType != null) {
          state.isOverTarget = true;
          shouldStopPropagation = triggerPressStart(e8, state.pointerType);
        }
        if (shouldStopPropagation) e8.stopPropagation();
      };
      pressProps2.onMouseLeave = (e8) => {
        if (!(0, $d4ee10de306f2510$export$4282f70798064fe0)(e8.currentTarget, (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e8.nativeEvent))) return;
        let shouldStopPropagation = true;
        if (state.isPressed && !state.ignoreEmulatedMouseEvents && state.pointerType != null) {
          state.isOverTarget = false;
          shouldStopPropagation = triggerPressEnd(e8, state.pointerType, false);
          cancelOnPointerExit(e8);
        }
        if (shouldStopPropagation) e8.stopPropagation();
      };
      pressProps2.onMouseUp = (e8) => {
        if (!(0, $d4ee10de306f2510$export$4282f70798064fe0)(e8.currentTarget, (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e8.nativeEvent))) return;
        if (!state.ignoreEmulatedMouseEvents && e8.button === 0) triggerPressUp(e8, state.pointerType || "mouse");
      };
      let onMouseUp = (e8) => {
        if (e8.button !== 0) return;
        if (state.ignoreEmulatedMouseEvents) {
          state.ignoreEmulatedMouseEvents = false;
          return;
        }
        if (state.target && state.target.contains(e8.target) && state.pointerType != null) ;
        else cancel(e8);
        state.isOverTarget = false;
      };
      pressProps2.onTouchStart = (e8) => {
        if (!(0, $d4ee10de306f2510$export$4282f70798064fe0)(e8.currentTarget, (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e8.nativeEvent))) return;
        let touch = $f6c31cce2adf654f$var$getTouchFromEvent(e8.nativeEvent);
        if (!touch) return;
        state.activePointerId = touch.identifier;
        state.ignoreEmulatedMouseEvents = true;
        state.isOverTarget = true;
        state.isPressed = true;
        state.target = e8.currentTarget;
        state.pointerType = "touch";
        if (!allowTextSelectionOnPress) (0, $14c0b72509d70225$export$16a4697467175487)(state.target);
        let shouldStopPropagation = triggerPressStart($f6c31cce2adf654f$var$createTouchEvent(state.target, e8), state.pointerType);
        if (shouldStopPropagation) e8.stopPropagation();
        addGlobalListener((0, $431fbd86ca7dc216$export$f21a1ffae260145a)(e8.currentTarget), "scroll", onScroll, true);
      };
      pressProps2.onTouchMove = (e8) => {
        if (!(0, $d4ee10de306f2510$export$4282f70798064fe0)(e8.currentTarget, (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e8.nativeEvent))) return;
        if (!state.isPressed) {
          e8.stopPropagation();
          return;
        }
        let touch = $f6c31cce2adf654f$var$getTouchById(e8.nativeEvent, state.activePointerId);
        let shouldStopPropagation = true;
        if (touch && $f6c31cce2adf654f$var$isOverTarget(touch, e8.currentTarget)) {
          if (!state.isOverTarget && state.pointerType != null) {
            state.isOverTarget = true;
            shouldStopPropagation = triggerPressStart($f6c31cce2adf654f$var$createTouchEvent(state.target, e8), state.pointerType);
          }
        } else if (state.isOverTarget && state.pointerType != null) {
          state.isOverTarget = false;
          shouldStopPropagation = triggerPressEnd($f6c31cce2adf654f$var$createTouchEvent(state.target, e8), state.pointerType, false);
          cancelOnPointerExit($f6c31cce2adf654f$var$createTouchEvent(state.target, e8));
        }
        if (shouldStopPropagation) e8.stopPropagation();
      };
      pressProps2.onTouchEnd = (e8) => {
        if (!(0, $d4ee10de306f2510$export$4282f70798064fe0)(e8.currentTarget, (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e8.nativeEvent))) return;
        if (!state.isPressed) {
          e8.stopPropagation();
          return;
        }
        let touch = $f6c31cce2adf654f$var$getTouchById(e8.nativeEvent, state.activePointerId);
        let shouldStopPropagation = true;
        if (touch && $f6c31cce2adf654f$var$isOverTarget(touch, e8.currentTarget) && state.pointerType != null) {
          triggerPressUp($f6c31cce2adf654f$var$createTouchEvent(state.target, e8), state.pointerType);
          shouldStopPropagation = triggerPressEnd($f6c31cce2adf654f$var$createTouchEvent(state.target, e8), state.pointerType);
          triggerSyntheticClick(e8.nativeEvent, state.target);
        } else if (state.isOverTarget && state.pointerType != null) shouldStopPropagation = triggerPressEnd($f6c31cce2adf654f$var$createTouchEvent(state.target, e8), state.pointerType, false);
        if (shouldStopPropagation) e8.stopPropagation();
        state.isPressed = false;
        state.activePointerId = null;
        state.isOverTarget = false;
        state.ignoreEmulatedMouseEvents = true;
        if (state.target && !allowTextSelectionOnPress) (0, $14c0b72509d70225$export$b0d6fa1ab32e3295)(state.target);
        removeAllGlobalListeners();
      };
      pressProps2.onTouchCancel = (e8) => {
        if (!(0, $d4ee10de306f2510$export$4282f70798064fe0)(e8.currentTarget, (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e8.nativeEvent))) return;
        e8.stopPropagation();
        if (state.isPressed) cancel($f6c31cce2adf654f$var$createTouchEvent(state.target, e8));
      };
      let onScroll = (e8) => {
        if (state.isPressed && (0, $d4ee10de306f2510$export$4282f70798064fe0)((0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e8), state.target)) cancel({
          currentTarget: state.target,
          shiftKey: false,
          ctrlKey: false,
          metaKey: false,
          altKey: false
        });
      };
      pressProps2.onDragStart = (e8) => {
        if (!(0, $d4ee10de306f2510$export$4282f70798064fe0)(e8.currentTarget, (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e8.nativeEvent))) return;
        cancel(e8);
      };
    }
    return pressProps2;
  }, [
    addGlobalListener,
    isDisabled2,
    preventFocusOnPress,
    removeAllGlobalListeners,
    allowTextSelectionOnPress,
    cancel,
    cancelOnPointerExit,
    triggerPressEnd,
    triggerPressStart,
    triggerPressUp,
    triggerClick,
    triggerSyntheticClick
  ]);
  (0, import_react24.useEffect)(() => {
    let element = domRef === null || domRef === void 0 ? void 0 : domRef.current;
    if (element && element instanceof (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(element).Element) {
      let style = (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(element).getComputedStyle(element);
      if (style.touchAction === "auto")
        element.style.touchAction = "pan-x pan-y pinch-zoom";
    }
  }, [
    domRef
  ]);
  (0, import_react24.useEffect)(() => {
    let state = ref.current;
    return () => {
      var _state_target;
      if (!allowTextSelectionOnPress) (0, $14c0b72509d70225$export$b0d6fa1ab32e3295)((_state_target = state.target) !== null && _state_target !== void 0 ? _state_target : void 0);
      for (let dispose of state.disposables) dispose();
      state.disposables = [];
    };
  }, [
    allowTextSelectionOnPress
  ]);
  return {
    isPressed: isPressedProp || isPressed,
    pressProps: (0, $3ef42575df84b30b$export$9d1611c77c2fe928)(domProps, pressProps)
  };
}
function $f6c31cce2adf654f$var$isHTMLAnchorLink(target) {
  return target.tagName === "A" && target.hasAttribute("href");
}
function $f6c31cce2adf654f$var$isValidKeyboardEvent(event, currentTarget) {
  const { key, code } = event;
  const element = currentTarget;
  const role = element.getAttribute("role");
  return (key === "Enter" || key === " " || key === "Spacebar" || code === "Space") && !(element instanceof (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(element).HTMLInputElement && !$f6c31cce2adf654f$var$isValidInputKey(element, key) || element instanceof (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(element).HTMLTextAreaElement || element.isContentEditable) && // Links should only trigger with Enter key
  !((role === "link" || !role && $f6c31cce2adf654f$var$isHTMLAnchorLink(element)) && key !== "Enter");
}
function $f6c31cce2adf654f$var$createEvent(target, e8) {
  let clientX = e8.clientX;
  let clientY = e8.clientY;
  return {
    currentTarget: target,
    shiftKey: e8.shiftKey,
    ctrlKey: e8.ctrlKey,
    metaKey: e8.metaKey,
    altKey: e8.altKey,
    clientX,
    clientY
  };
}
function $f6c31cce2adf654f$var$shouldPreventDefaultUp(target) {
  if (target instanceof HTMLInputElement) return false;
  if (target instanceof HTMLButtonElement) return target.type !== "submit" && target.type !== "reset";
  if ($f6c31cce2adf654f$var$isHTMLAnchorLink(target)) return false;
  return true;
}
function $f6c31cce2adf654f$var$shouldPreventDefaultKeyboard(target, key) {
  if (target instanceof HTMLInputElement) return !$f6c31cce2adf654f$var$isValidInputKey(target, key);
  return $f6c31cce2adf654f$var$shouldPreventDefaultUp(target);
}
var $f6c31cce2adf654f$var$nonTextInputTypes = /* @__PURE__ */ new Set([
  "checkbox",
  "radio",
  "range",
  "color",
  "file",
  "image",
  "button",
  "submit",
  "reset"
]);
function $f6c31cce2adf654f$var$isValidInputKey(target, key) {
  return target.type === "checkbox" || target.type === "radio" ? key === " " : $f6c31cce2adf654f$var$nonTextInputTypes.has(target.type);
}

// node_modules/@react-aria/interactions/dist/useFocusVisible.mjs
var import_react25 = __toESM(require_react(), 1);
var $507fabe10e71c6fb$var$currentModality = null;
var $507fabe10e71c6fb$var$changeHandlers = /* @__PURE__ */ new Set();
var $507fabe10e71c6fb$export$d90243b58daecda7 = /* @__PURE__ */ new Map();
var $507fabe10e71c6fb$var$hasEventBeforeFocus = false;
var $507fabe10e71c6fb$var$hasBlurredWindowRecently = false;
var $507fabe10e71c6fb$var$FOCUS_VISIBLE_INPUT_KEYS = {
  Tab: true,
  Escape: true
};
function $507fabe10e71c6fb$var$triggerChangeHandlers(modality, e8) {
  for (let handler of $507fabe10e71c6fb$var$changeHandlers) handler(modality, e8);
}
function $507fabe10e71c6fb$var$isValidKey(e8) {
  return !(e8.metaKey || !(0, $c87311424ea30a05$export$9ac100e40613ea10)() && e8.altKey || e8.ctrlKey || e8.key === "Control" || e8.key === "Shift" || e8.key === "Meta");
}
function $507fabe10e71c6fb$var$handleKeyboardEvent(e8) {
  $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
  if ($507fabe10e71c6fb$var$isValidKey(e8)) {
    $507fabe10e71c6fb$var$currentModality = "keyboard";
    $507fabe10e71c6fb$var$triggerChangeHandlers("keyboard", e8);
  }
}
function $507fabe10e71c6fb$var$handlePointerEvent(e8) {
  $507fabe10e71c6fb$var$currentModality = "pointer";
  if (e8.type === "mousedown" || e8.type === "pointerdown") {
    $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
    $507fabe10e71c6fb$var$triggerChangeHandlers("pointer", e8);
  }
}
function $507fabe10e71c6fb$var$handleClickEvent(e8) {
  if ((0, $6a7db85432448f7f$export$60278871457622de)(e8)) {
    $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
    $507fabe10e71c6fb$var$currentModality = "virtual";
  }
}
function $507fabe10e71c6fb$var$handleFocusEvent(e8) {
  if (e8.target === window || e8.target === document || (0, $8a9cb279dc87e130$export$fda7da73ab5d4c48) || !e8.isTrusted) return;
  if (!$507fabe10e71c6fb$var$hasEventBeforeFocus && !$507fabe10e71c6fb$var$hasBlurredWindowRecently) {
    $507fabe10e71c6fb$var$currentModality = "virtual";
    $507fabe10e71c6fb$var$triggerChangeHandlers("virtual", e8);
  }
  $507fabe10e71c6fb$var$hasEventBeforeFocus = false;
  $507fabe10e71c6fb$var$hasBlurredWindowRecently = false;
}
function $507fabe10e71c6fb$var$handleWindowBlur() {
  if (0, $8a9cb279dc87e130$export$fda7da73ab5d4c48) return;
  $507fabe10e71c6fb$var$hasEventBeforeFocus = false;
  $507fabe10e71c6fb$var$hasBlurredWindowRecently = true;
}
function $507fabe10e71c6fb$var$setupGlobalFocusEvents(element) {
  if (typeof window === "undefined" || $507fabe10e71c6fb$export$d90243b58daecda7.get((0, $431fbd86ca7dc216$export$f21a1ffae260145a)(element))) return;
  const windowObject = (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(element);
  const documentObject = (0, $431fbd86ca7dc216$export$b204af158042fbac)(element);
  let focus = windowObject.HTMLElement.prototype.focus;
  windowObject.HTMLElement.prototype.focus = function() {
    $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
    focus.apply(this, arguments);
  };
  documentObject.addEventListener("keydown", $507fabe10e71c6fb$var$handleKeyboardEvent, true);
  documentObject.addEventListener("keyup", $507fabe10e71c6fb$var$handleKeyboardEvent, true);
  documentObject.addEventListener("click", $507fabe10e71c6fb$var$handleClickEvent, true);
  windowObject.addEventListener("focus", $507fabe10e71c6fb$var$handleFocusEvent, true);
  windowObject.addEventListener("blur", $507fabe10e71c6fb$var$handleWindowBlur, false);
  if (typeof PointerEvent !== "undefined") {
    documentObject.addEventListener("pointerdown", $507fabe10e71c6fb$var$handlePointerEvent, true);
    documentObject.addEventListener("pointermove", $507fabe10e71c6fb$var$handlePointerEvent, true);
    documentObject.addEventListener("pointerup", $507fabe10e71c6fb$var$handlePointerEvent, true);
  } else if (false) {
    documentObject.addEventListener("mousedown", $507fabe10e71c6fb$var$handlePointerEvent, true);
    documentObject.addEventListener("mousemove", $507fabe10e71c6fb$var$handlePointerEvent, true);
    documentObject.addEventListener("mouseup", $507fabe10e71c6fb$var$handlePointerEvent, true);
  }
  windowObject.addEventListener("beforeunload", () => {
    $507fabe10e71c6fb$var$tearDownWindowFocusTracking(element);
  }, {
    once: true
  });
  $507fabe10e71c6fb$export$d90243b58daecda7.set(windowObject, {
    focus
  });
}
var $507fabe10e71c6fb$var$tearDownWindowFocusTracking = (element, loadListener) => {
  const windowObject = (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(element);
  const documentObject = (0, $431fbd86ca7dc216$export$b204af158042fbac)(element);
  if (loadListener) documentObject.removeEventListener("DOMContentLoaded", loadListener);
  if (!$507fabe10e71c6fb$export$d90243b58daecda7.has(windowObject)) return;
  windowObject.HTMLElement.prototype.focus = $507fabe10e71c6fb$export$d90243b58daecda7.get(windowObject).focus;
  documentObject.removeEventListener("keydown", $507fabe10e71c6fb$var$handleKeyboardEvent, true);
  documentObject.removeEventListener("keyup", $507fabe10e71c6fb$var$handleKeyboardEvent, true);
  documentObject.removeEventListener("click", $507fabe10e71c6fb$var$handleClickEvent, true);
  windowObject.removeEventListener("focus", $507fabe10e71c6fb$var$handleFocusEvent, true);
  windowObject.removeEventListener("blur", $507fabe10e71c6fb$var$handleWindowBlur, false);
  if (typeof PointerEvent !== "undefined") {
    documentObject.removeEventListener("pointerdown", $507fabe10e71c6fb$var$handlePointerEvent, true);
    documentObject.removeEventListener("pointermove", $507fabe10e71c6fb$var$handlePointerEvent, true);
    documentObject.removeEventListener("pointerup", $507fabe10e71c6fb$var$handlePointerEvent, true);
  } else if (false) {
    documentObject.removeEventListener("mousedown", $507fabe10e71c6fb$var$handlePointerEvent, true);
    documentObject.removeEventListener("mousemove", $507fabe10e71c6fb$var$handlePointerEvent, true);
    documentObject.removeEventListener("mouseup", $507fabe10e71c6fb$var$handlePointerEvent, true);
  }
  $507fabe10e71c6fb$export$d90243b58daecda7.delete(windowObject);
};
function $507fabe10e71c6fb$export$2f1888112f558a7d(element) {
  const documentObject = (0, $431fbd86ca7dc216$export$b204af158042fbac)(element);
  let loadListener;
  if (documentObject.readyState !== "loading") $507fabe10e71c6fb$var$setupGlobalFocusEvents(element);
  else {
    loadListener = () => {
      $507fabe10e71c6fb$var$setupGlobalFocusEvents(element);
    };
    documentObject.addEventListener("DOMContentLoaded", loadListener);
  }
  return () => $507fabe10e71c6fb$var$tearDownWindowFocusTracking(element, loadListener);
}
if (typeof document !== "undefined") $507fabe10e71c6fb$export$2f1888112f558a7d();
function $507fabe10e71c6fb$export$b9b3dfddab17db27() {
  return $507fabe10e71c6fb$var$currentModality !== "pointer";
}
function $507fabe10e71c6fb$export$630ff653c5ada6a9() {
  return $507fabe10e71c6fb$var$currentModality;
}
var $507fabe10e71c6fb$var$nonTextInputTypes = /* @__PURE__ */ new Set([
  "checkbox",
  "radio",
  "range",
  "color",
  "file",
  "image",
  "button",
  "submit",
  "reset"
]);
function $507fabe10e71c6fb$var$isKeyboardFocusEvent(isTextInput, modality, e8) {
  let document1 = (0, $431fbd86ca7dc216$export$b204af158042fbac)(e8 === null || e8 === void 0 ? void 0 : e8.target);
  const IHTMLInputElement = typeof window !== "undefined" ? (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(e8 === null || e8 === void 0 ? void 0 : e8.target).HTMLInputElement : HTMLInputElement;
  const IHTMLTextAreaElement = typeof window !== "undefined" ? (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(e8 === null || e8 === void 0 ? void 0 : e8.target).HTMLTextAreaElement : HTMLTextAreaElement;
  const IHTMLElement = typeof window !== "undefined" ? (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(e8 === null || e8 === void 0 ? void 0 : e8.target).HTMLElement : HTMLElement;
  const IKeyboardEvent = typeof window !== "undefined" ? (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(e8 === null || e8 === void 0 ? void 0 : e8.target).KeyboardEvent : KeyboardEvent;
  isTextInput = isTextInput || document1.activeElement instanceof IHTMLInputElement && !$507fabe10e71c6fb$var$nonTextInputTypes.has(document1.activeElement.type) || document1.activeElement instanceof IHTMLTextAreaElement || document1.activeElement instanceof IHTMLElement && document1.activeElement.isContentEditable;
  return !(isTextInput && modality === "keyboard" && e8 instanceof IKeyboardEvent && !$507fabe10e71c6fb$var$FOCUS_VISIBLE_INPUT_KEYS[e8.key]);
}
function $507fabe10e71c6fb$export$ec71b4b83ac08ec3(fn, deps, opts) {
  $507fabe10e71c6fb$var$setupGlobalFocusEvents();
  (0, import_react25.useEffect)(() => {
    let handler = (modality, e8) => {
      if (!$507fabe10e71c6fb$var$isKeyboardFocusEvent(!!(opts === null || opts === void 0 ? void 0 : opts.isTextInput), modality, e8)) return;
      fn($507fabe10e71c6fb$export$b9b3dfddab17db27());
    };
    $507fabe10e71c6fb$var$changeHandlers.add(handler);
    return () => {
      $507fabe10e71c6fb$var$changeHandlers.delete(handler);
    };
  }, deps);
}

// node_modules/@react-aria/interactions/dist/focusSafely.mjs
function $3ad3f6e1647bc98d$export$80f3e147d781571c(element) {
  const ownerDocument = (0, $431fbd86ca7dc216$export$b204af158042fbac)(element);
  const activeElement2 = (0, $d4ee10de306f2510$export$cd4e5573fbe2b576)(ownerDocument);
  if ((0, $507fabe10e71c6fb$export$630ff653c5ada6a9)() === "virtual") {
    let lastFocusedElement = activeElement2;
    (0, $bbed8b41f857bcc0$export$24490316f764c430)(() => {
      if ((0, $d4ee10de306f2510$export$cd4e5573fbe2b576)(ownerDocument) === lastFocusedElement && element.isConnected) (0, $7215afc6de606d6b$export$de79e2c695e052f3)(element);
    });
  } else (0, $7215afc6de606d6b$export$de79e2c695e052f3)(element);
}

// node_modules/@react-aria/interactions/dist/useFocus.mjs
var import_react26 = __toESM(require_react(), 1);
function $a1ea59d68270f0dd$export$f8168d8dd8fd66e6(props) {
  let { isDisabled: isDisabled2, onFocus: onFocusProp, onBlur: onBlurProp, onFocusChange } = props;
  const onBlur = (0, import_react26.useCallback)((e8) => {
    if (e8.target === e8.currentTarget) {
      if (onBlurProp) onBlurProp(e8);
      if (onFocusChange) onFocusChange(false);
      return true;
    }
  }, [
    onBlurProp,
    onFocusChange
  ]);
  const onSyntheticFocus = (0, $8a9cb279dc87e130$export$715c682d09d639cc)(onBlur);
  const onFocus = (0, import_react26.useCallback)((e8) => {
    const ownerDocument = (0, $431fbd86ca7dc216$export$b204af158042fbac)(e8.target);
    const activeElement2 = ownerDocument ? (0, $d4ee10de306f2510$export$cd4e5573fbe2b576)(ownerDocument) : (0, $d4ee10de306f2510$export$cd4e5573fbe2b576)();
    if (e8.target === e8.currentTarget && activeElement2 === (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e8.nativeEvent)) {
      if (onFocusProp) onFocusProp(e8);
      if (onFocusChange) onFocusChange(true);
      onSyntheticFocus(e8);
    }
  }, [
    onFocusChange,
    onFocusProp,
    onSyntheticFocus
  ]);
  return {
    focusProps: {
      onFocus: !isDisabled2 && (onFocusProp || onFocusChange || onBlurProp) ? onFocus : void 0,
      onBlur: !isDisabled2 && (onBlurProp || onFocusChange) ? onBlur : void 0
    }
  };
}

// node_modules/@react-aria/interactions/dist/createEventHandler.mjs
function $93925083ecbb358c$export$48d1ea6320830260(handler) {
  if (!handler) return void 0;
  let shouldStopPropagation = true;
  return (e8) => {
    let event = {
      ...e8,
      preventDefault() {
        e8.preventDefault();
      },
      isDefaultPrevented() {
        return e8.isDefaultPrevented();
      },
      stopPropagation() {
        if (shouldStopPropagation && true) console.error("stopPropagation is now the default behavior for events in React Spectrum. You can use continuePropagation() to revert this behavior.");
        else shouldStopPropagation = true;
      },
      continuePropagation() {
        shouldStopPropagation = false;
      },
      isPropagationStopped() {
        return shouldStopPropagation;
      }
    };
    handler(event);
    if (shouldStopPropagation) e8.stopPropagation();
  };
}

// node_modules/@react-aria/interactions/dist/useKeyboard.mjs
function $46d819fcbaf35654$export$8f71654801c2f7cd(props) {
  return {
    keyboardProps: props.isDisabled ? {} : {
      onKeyDown: (0, $93925083ecbb358c$export$48d1ea6320830260)(props.onKeyDown),
      onKeyUp: (0, $93925083ecbb358c$export$48d1ea6320830260)(props.onKeyUp)
    }
  };
}

// node_modules/@react-aria/interactions/dist/useFocusable.mjs
var import_react27 = __toESM(require_react(), 1);
var $f645667febf57a63$export$f9762fab77588ecb = (0, import_react27.default).createContext(null);
function $f645667febf57a63$var$useFocusableContext(ref) {
  let context = (0, import_react27.useContext)($f645667febf57a63$export$f9762fab77588ecb) || {};
  (0, $e7801be82b4b2a53$export$4debdb1a3f0fa79e)(context, ref);
  let { ref: _8, ...otherProps } = context;
  return otherProps;
}
var $f645667febf57a63$export$13f3202a3e5ddd5 = (0, import_react27.default).forwardRef(function FocusableProvider(props, ref) {
  let { children, ...otherProps } = props;
  let objRef = (0, $df56164dff5785e2$export$4338b53315abf666)(ref);
  let context = {
    ...otherProps,
    ref: objRef
  };
  return (0, import_react27.default).createElement($f645667febf57a63$export$f9762fab77588ecb.Provider, {
    value: context
  }, children);
});
function $f645667febf57a63$export$4c014de7c8940b4c(props, domRef) {
  let { focusProps } = (0, $a1ea59d68270f0dd$export$f8168d8dd8fd66e6)(props);
  let { keyboardProps } = (0, $46d819fcbaf35654$export$8f71654801c2f7cd)(props);
  let interactions = (0, $3ef42575df84b30b$export$9d1611c77c2fe928)(focusProps, keyboardProps);
  let domProps = $f645667febf57a63$var$useFocusableContext(domRef);
  let interactionProps = props.isDisabled ? {} : domProps;
  let autoFocusRef = (0, import_react27.useRef)(props.autoFocus);
  (0, import_react27.useEffect)(() => {
    if (autoFocusRef.current && domRef.current) (0, $3ad3f6e1647bc98d$export$80f3e147d781571c)(domRef.current);
    autoFocusRef.current = false;
  }, [
    domRef
  ]);
  let tabIndex = props.excludeFromTabOrder ? -1 : 0;
  if (props.isDisabled) tabIndex = void 0;
  return {
    focusableProps: (0, $3ef42575df84b30b$export$9d1611c77c2fe928)({
      ...interactions,
      tabIndex
    }, interactionProps)
  };
}
var $f645667febf57a63$export$35a3bebf7ef2d934 = (0, import_react27.forwardRef)(({ children, ...props }, ref) => {
  ref = (0, $df56164dff5785e2$export$4338b53315abf666)(ref);
  let { focusableProps } = $f645667febf57a63$export$4c014de7c8940b4c(props, ref);
  let child = (0, import_react27.default).Children.only(children);
  (0, import_react27.useEffect)(() => {
    if (false) return;
    let el = ref.current;
    if (!el || !(el instanceof (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(el).Element)) {
      console.error("<Focusable> child must forward its ref to a DOM element.");
      return;
    }
    if (!props.isDisabled && !(0, $b4b717babfbb907b$export$4c063cf1350e6fed)(el)) {
      console.warn("<Focusable> child must be focusable. Please ensure the tabIndex prop is passed through.");
      return;
    }
    if (el.localName !== "button" && el.localName !== "input" && el.localName !== "select" && el.localName !== "textarea" && el.localName !== "a" && el.localName !== "area" && el.localName !== "summary" && el.localName !== "img" && el.localName !== "svg") {
      let role = el.getAttribute("role");
      if (!role) console.warn("<Focusable> child must have an interactive ARIA role.");
      else if (
        // https://w3c.github.io/aria/#widget_roles
        role !== "application" && role !== "button" && role !== "checkbox" && role !== "combobox" && role !== "gridcell" && role !== "link" && role !== "menuitem" && role !== "menuitemcheckbox" && role !== "menuitemradio" && role !== "option" && role !== "radio" && role !== "searchbox" && role !== "separator" && role !== "slider" && role !== "spinbutton" && role !== "switch" && role !== "tab" && role !== "tabpanel" && role !== "textbox" && role !== "treeitem" && // aria-describedby is also announced on these roles
        role !== "img" && role !== "meter" && role !== "progressbar"
      ) console.warn(`<Focusable> child must have an interactive ARIA role. Got "${role}".`);
    }
  }, [
    ref,
    props.isDisabled
  ]);
  let childRef = parseInt((0, import_react27.default).version, 10) < 19 ? child.ref : child.props.ref;
  return (0, import_react27.default).cloneElement(child, {
    ...(0, $3ef42575df84b30b$export$9d1611c77c2fe928)(focusableProps, child.props),
    // @ts-ignore
    ref: (0, $5dc95899b306f630$export$c9058316764c140e)(childRef, ref)
  });
});

// node_modules/@react-aria/interactions/dist/Pressable.mjs
var import_react28 = __toESM(require_react(), 1);
var $3b117e43dc0ca95d$export$27c701ed9e449e99 = (0, import_react28.default).forwardRef(({ children, ...props }, ref) => {
  ref = (0, $df56164dff5785e2$export$4338b53315abf666)(ref);
  let { pressProps } = (0, $f6c31cce2adf654f$export$45712eceda6fad21)({
    ...props,
    ref
  });
  let { focusableProps } = (0, $f645667febf57a63$export$4c014de7c8940b4c)(props, ref);
  let child = (0, import_react28.default).Children.only(children);
  (0, import_react28.useEffect)(() => {
    if (false) return;
    let el = ref.current;
    if (!el || !(el instanceof (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(el).Element)) {
      console.error("<Pressable> child must forward its ref to a DOM element.");
      return;
    }
    if (!(0, $b4b717babfbb907b$export$4c063cf1350e6fed)(el)) {
      console.warn("<Pressable> child must be focusable. Please ensure the tabIndex prop is passed through.");
      return;
    }
    if (el.localName !== "button" && el.localName !== "input" && el.localName !== "select" && el.localName !== "textarea" && el.localName !== "a" && el.localName !== "area" && el.localName !== "summary") {
      let role = el.getAttribute("role");
      if (!role) console.warn("<Pressable> child must have an interactive ARIA role.");
      else if (
        // https://w3c.github.io/aria/#widget_roles
        role !== "application" && role !== "button" && role !== "checkbox" && role !== "combobox" && role !== "gridcell" && role !== "link" && role !== "menuitem" && role !== "menuitemcheckbox" && role !== "menuitemradio" && role !== "option" && role !== "radio" && role !== "searchbox" && role !== "separator" && role !== "slider" && role !== "spinbutton" && role !== "switch" && role !== "tab" && role !== "textbox" && role !== "treeitem"
      ) console.warn(`<Pressable> child must have an interactive ARIA role. Got "${role}".`);
    }
  }, [
    ref
  ]);
  let childRef = parseInt((0, import_react28.default).version, 10) < 19 ? child.ref : child.props.ref;
  return (0, import_react28.default).cloneElement(child, {
    ...(0, $3ef42575df84b30b$export$9d1611c77c2fe928)(pressProps, focusableProps, child.props),
    // @ts-ignore
    ref: (0, $5dc95899b306f630$export$c9058316764c140e)(childRef, ref)
  });
});

// node_modules/@react-aria/interactions/dist/PressResponder.mjs
var import_react29 = __toESM(require_react(), 1);
var $f1ab8c75478c6f73$export$3351871ee4b288b8 = (0, import_react29.default).forwardRef(({ children, ...props }, ref) => {
  let isRegistered = (0, import_react29.useRef)(false);
  let prevContext = (0, import_react29.useContext)((0, $ae1eeba8b9eafd08$export$5165eccb35aaadb5));
  ref = (0, $df56164dff5785e2$export$4338b53315abf666)(ref || (prevContext === null || prevContext === void 0 ? void 0 : prevContext.ref));
  let context = (0, $3ef42575df84b30b$export$9d1611c77c2fe928)(prevContext || {}, {
    ...props,
    ref,
    register() {
      isRegistered.current = true;
      if (prevContext) prevContext.register();
    }
  });
  (0, $e7801be82b4b2a53$export$4debdb1a3f0fa79e)(prevContext, ref);
  (0, import_react29.useEffect)(() => {
    if (!isRegistered.current) {
      if (true) console.warn("A PressResponder was rendered without a pressable child. Either call the usePress hook, or wrap your DOM node with <Pressable> component.");
      isRegistered.current = true;
    }
  }, []);
  return (0, import_react29.default).createElement((0, $ae1eeba8b9eafd08$export$5165eccb35aaadb5).Provider, {
    value: context
  }, children);
});

// node_modules/@react-aria/interactions/dist/useFocusWithin.mjs
var import_react30 = __toESM(require_react(), 1);
function $9ab94262bd0047c7$export$420e68273165f4ec(props) {
  let { isDisabled: isDisabled2, onBlurWithin, onFocusWithin, onFocusWithinChange } = props;
  let state = (0, import_react30.useRef)({
    isFocusWithin: false
  });
  let { addGlobalListener, removeAllGlobalListeners } = (0, $03deb23ff14920c4$export$4eaf04e54aa8eed6)();
  let onBlur = (0, import_react30.useCallback)((e8) => {
    if (!e8.currentTarget.contains(e8.target)) return;
    if (state.current.isFocusWithin && !e8.currentTarget.contains(e8.relatedTarget)) {
      state.current.isFocusWithin = false;
      removeAllGlobalListeners();
      if (onBlurWithin) onBlurWithin(e8);
      if (onFocusWithinChange) onFocusWithinChange(false);
    }
  }, [
    onBlurWithin,
    onFocusWithinChange,
    state,
    removeAllGlobalListeners
  ]);
  let onSyntheticFocus = (0, $8a9cb279dc87e130$export$715c682d09d639cc)(onBlur);
  let onFocus = (0, import_react30.useCallback)((e8) => {
    if (!e8.currentTarget.contains(e8.target)) return;
    const ownerDocument = (0, $431fbd86ca7dc216$export$b204af158042fbac)(e8.target);
    const activeElement2 = (0, $d4ee10de306f2510$export$cd4e5573fbe2b576)(ownerDocument);
    if (!state.current.isFocusWithin && activeElement2 === (0, $d4ee10de306f2510$export$e58f029f0fbfdb29)(e8.nativeEvent)) {
      if (onFocusWithin) onFocusWithin(e8);
      if (onFocusWithinChange) onFocusWithinChange(true);
      state.current.isFocusWithin = true;
      onSyntheticFocus(e8);
      let currentTarget = e8.currentTarget;
      addGlobalListener(ownerDocument, "focus", (e9) => {
        if (state.current.isFocusWithin && !(0, $d4ee10de306f2510$export$4282f70798064fe0)(currentTarget, e9.target)) {
          let nativeEvent = new ownerDocument.defaultView.FocusEvent("blur", {
            relatedTarget: e9.target
          });
          (0, $8a9cb279dc87e130$export$c2b7abe5d61ec696)(nativeEvent, currentTarget);
          let event = (0, $8a9cb279dc87e130$export$525bc4921d56d4a)(nativeEvent);
          onBlur(event);
        }
      }, {
        capture: true
      });
    }
  }, [
    onFocusWithin,
    onFocusWithinChange,
    onSyntheticFocus,
    addGlobalListener,
    onBlur
  ]);
  if (isDisabled2) return {
    focusWithinProps: {
      // These cannot be null, that would conflict in mergeProps
      onFocus: void 0,
      onBlur: void 0
    }
  };
  return {
    focusWithinProps: {
      onFocus,
      onBlur
    }
  };
}

// node_modules/@react-aria/interactions/dist/useHover.mjs
var import_react31 = __toESM(require_react(), 1);
var $6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents = false;
var $6179b936705e76d3$var$hoverCount = 0;
function $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents() {
  $6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents = true;
  setTimeout(() => {
    $6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents = false;
  }, 50);
}
function $6179b936705e76d3$var$handleGlobalPointerEvent(e8) {
  if (e8.pointerType === "touch") $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents();
}
function $6179b936705e76d3$var$setupGlobalTouchEvents() {
  if (typeof document === "undefined") return;
  if (typeof PointerEvent !== "undefined") document.addEventListener("pointerup", $6179b936705e76d3$var$handleGlobalPointerEvent);
  else if (false) document.addEventListener("touchend", $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents);
  $6179b936705e76d3$var$hoverCount++;
  return () => {
    $6179b936705e76d3$var$hoverCount--;
    if ($6179b936705e76d3$var$hoverCount > 0) return;
    if (typeof PointerEvent !== "undefined") document.removeEventListener("pointerup", $6179b936705e76d3$var$handleGlobalPointerEvent);
    else if (false) document.removeEventListener("touchend", $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents);
  };
}
function $6179b936705e76d3$export$ae780daf29e6d456(props) {
  let { onHoverStart, onHoverChange, onHoverEnd, isDisabled: isDisabled2 } = props;
  let [isHovered, setHovered] = (0, import_react31.useState)(false);
  let state = (0, import_react31.useRef)({
    isHovered: false,
    ignoreEmulatedMouseEvents: false,
    pointerType: "",
    target: null
  }).current;
  (0, import_react31.useEffect)($6179b936705e76d3$var$setupGlobalTouchEvents, []);
  let { addGlobalListener, removeAllGlobalListeners } = (0, $03deb23ff14920c4$export$4eaf04e54aa8eed6)();
  let { hoverProps, triggerHoverEnd } = (0, import_react31.useMemo)(() => {
    let triggerHoverStart = (event, pointerType) => {
      state.pointerType = pointerType;
      if (isDisabled2 || pointerType === "touch" || state.isHovered || !event.currentTarget.contains(event.target)) return;
      state.isHovered = true;
      let target = event.currentTarget;
      state.target = target;
      addGlobalListener((0, $431fbd86ca7dc216$export$b204af158042fbac)(event.target), "pointerover", (e8) => {
        if (state.isHovered && state.target && !(0, $d4ee10de306f2510$export$4282f70798064fe0)(state.target, e8.target)) triggerHoverEnd2(e8, e8.pointerType);
      }, {
        capture: true
      });
      if (onHoverStart) onHoverStart({
        type: "hoverstart",
        target,
        pointerType
      });
      if (onHoverChange) onHoverChange(true);
      setHovered(true);
    };
    let triggerHoverEnd2 = (event, pointerType) => {
      let target = state.target;
      state.pointerType = "";
      state.target = null;
      if (pointerType === "touch" || !state.isHovered || !target) return;
      state.isHovered = false;
      removeAllGlobalListeners();
      if (onHoverEnd) onHoverEnd({
        type: "hoverend",
        target,
        pointerType
      });
      if (onHoverChange) onHoverChange(false);
      setHovered(false);
    };
    let hoverProps2 = {};
    if (typeof PointerEvent !== "undefined") {
      hoverProps2.onPointerEnter = (e8) => {
        if ($6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents && e8.pointerType === "mouse") return;
        triggerHoverStart(e8, e8.pointerType);
      };
      hoverProps2.onPointerLeave = (e8) => {
        if (!isDisabled2 && e8.currentTarget.contains(e8.target)) triggerHoverEnd2(e8, e8.pointerType);
      };
    } else if (false) {
      hoverProps2.onTouchStart = () => {
        state.ignoreEmulatedMouseEvents = true;
      };
      hoverProps2.onMouseEnter = (e8) => {
        if (!state.ignoreEmulatedMouseEvents && !$6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents) triggerHoverStart(e8, "mouse");
        state.ignoreEmulatedMouseEvents = false;
      };
      hoverProps2.onMouseLeave = (e8) => {
        if (!isDisabled2 && e8.currentTarget.contains(e8.target)) triggerHoverEnd2(e8, "mouse");
      };
    }
    return {
      hoverProps: hoverProps2,
      triggerHoverEnd: triggerHoverEnd2
    };
  }, [
    onHoverStart,
    onHoverChange,
    onHoverEnd,
    isDisabled2,
    state,
    addGlobalListener,
    removeAllGlobalListeners
  ]);
  (0, import_react31.useEffect)(() => {
    if (isDisabled2) triggerHoverEnd({
      currentTarget: state.target
    }, state.pointerType);
  }, [
    isDisabled2
  ]);
  return {
    hoverProps,
    isHovered
  };
}

// node_modules/@react-aria/interactions/dist/useInteractOutside.mjs
var import_react32 = __toESM(require_react(), 1);

// node_modules/@react-aria/interactions/dist/useMove.mjs
var import_react33 = __toESM(require_react(), 1);

// node_modules/@react-aria/interactions/dist/useScrollWheel.mjs
var import_react34 = __toESM(require_react(), 1);

// node_modules/@react-aria/interactions/dist/useLongPress.mjs
var import_react35 = __toESM(require_react(), 1);

// node_modules/@react-aria/focus/dist/FocusScope.mjs
var import_react36 = __toESM(require_react(), 1);
var $9bf71ea28793e738$var$FocusContext = (0, import_react36.default).createContext(null);
function $9bf71ea28793e738$var$isElementInScope(element, scope) {
  if (!element) return false;
  if (!scope) return false;
  return scope.some((node) => node.contains(element));
}
var $9bf71ea28793e738$var$Tree = class _$9bf71ea28793e738$var$Tree {
  get size() {
    return this.fastMap.size;
  }
  getTreeNode(data) {
    return this.fastMap.get(data);
  }
  addTreeNode(scopeRef, parent, nodeToRestore) {
    let parentNode = this.fastMap.get(parent !== null && parent !== void 0 ? parent : null);
    if (!parentNode) return;
    let node = new $9bf71ea28793e738$var$TreeNode({
      scopeRef
    });
    parentNode.addChild(node);
    node.parent = parentNode;
    this.fastMap.set(scopeRef, node);
    if (nodeToRestore) node.nodeToRestore = nodeToRestore;
  }
  addNode(node) {
    this.fastMap.set(node.scopeRef, node);
  }
  removeTreeNode(scopeRef) {
    if (scopeRef === null) return;
    let node = this.fastMap.get(scopeRef);
    if (!node) return;
    let parentNode = node.parent;
    for (let current of this.traverse()) if (current !== node && node.nodeToRestore && current.nodeToRestore && node.scopeRef && node.scopeRef.current && $9bf71ea28793e738$var$isElementInScope(current.nodeToRestore, node.scopeRef.current)) current.nodeToRestore = node.nodeToRestore;
    let children = node.children;
    if (parentNode) {
      parentNode.removeChild(node);
      if (children.size > 0) children.forEach((child) => parentNode && parentNode.addChild(child));
    }
    this.fastMap.delete(node.scopeRef);
  }
  // Pre Order Depth First
  *traverse(node = this.root) {
    if (node.scopeRef != null) yield node;
    if (node.children.size > 0) for (let child of node.children) yield* this.traverse(child);
  }
  clone() {
    var _node_parent;
    let newTree = new _$9bf71ea28793e738$var$Tree();
    var _node_parent_scopeRef;
    for (let node of this.traverse()) newTree.addTreeNode(node.scopeRef, (_node_parent_scopeRef = (_node_parent = node.parent) === null || _node_parent === void 0 ? void 0 : _node_parent.scopeRef) !== null && _node_parent_scopeRef !== void 0 ? _node_parent_scopeRef : null, node.nodeToRestore);
    return newTree;
  }
  constructor() {
    this.fastMap = /* @__PURE__ */ new Map();
    this.root = new $9bf71ea28793e738$var$TreeNode({
      scopeRef: null
    });
    this.fastMap.set(null, this.root);
  }
};
var $9bf71ea28793e738$var$TreeNode = class {
  addChild(node) {
    this.children.add(node);
    node.parent = this;
  }
  removeChild(node) {
    this.children.delete(node);
    node.parent = void 0;
  }
  constructor(props) {
    this.children = /* @__PURE__ */ new Set();
    this.contain = false;
    this.scopeRef = props.scopeRef;
  }
};
var $9bf71ea28793e738$export$d06fae2ee68b101e = new $9bf71ea28793e738$var$Tree();

// node_modules/@react-aria/focus/dist/useFocusRing.mjs
var import_react37 = __toESM(require_react(), 1);
function $f7dceffc5ad7768b$export$4e328f61c538687f(props = {}) {
  let { autoFocus = false, isTextInput, within } = props;
  let state = (0, import_react37.useRef)({
    isFocused: false,
    isFocusVisible: autoFocus || (0, $507fabe10e71c6fb$export$b9b3dfddab17db27)()
  });
  let [isFocused, setFocused] = (0, import_react37.useState)(false);
  let [isFocusVisibleState, setFocusVisible] = (0, import_react37.useState)(() => state.current.isFocused && state.current.isFocusVisible);
  let updateState = (0, import_react37.useCallback)(() => setFocusVisible(state.current.isFocused && state.current.isFocusVisible), []);
  let onFocusChange = (0, import_react37.useCallback)((isFocused2) => {
    state.current.isFocused = isFocused2;
    setFocused(isFocused2);
    updateState();
  }, [
    updateState
  ]);
  (0, $507fabe10e71c6fb$export$ec71b4b83ac08ec3)((isFocusVisible) => {
    state.current.isFocusVisible = isFocusVisible;
    updateState();
  }, [], {
    isTextInput
  });
  let { focusProps } = (0, $a1ea59d68270f0dd$export$f8168d8dd8fd66e6)({
    isDisabled: within,
    onFocusChange
  });
  let { focusWithinProps } = (0, $9ab94262bd0047c7$export$420e68273165f4ec)({
    isDisabled: !within,
    onFocusWithinChange: onFocusChange
  });
  return {
    isFocused,
    isFocusVisible: isFocusVisibleState,
    focusProps: within ? focusWithinProps : focusProps
  };
}

// node_modules/@react-aria/focus/dist/FocusRing.mjs
var import_react38 = __toESM(require_react(), 1);

// node_modules/@react-aria/focus/dist/useHasTabbableChild.mjs
var import_react39 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/components/button/button.js
var import_react47 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-active-press.js
var import_react44 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/env.js
var i = Object.defineProperty;
var d = (t11, e8, n13) => e8 in t11 ? i(t11, e8, { enumerable: true, configurable: true, writable: true, value: n13 }) : t11[e8] = n13;
var r = (t11, e8, n13) => (d(t11, typeof e8 != "symbol" ? e8 + "" : e8, n13), n13);
var o = class {
  constructor() {
    r(this, "current", this.detect());
    r(this, "handoffState", "pending");
    r(this, "currentId", 0);
  }
  set(e8) {
    this.current !== e8 && (this.handoffState = "pending", this.currentId = 0, this.current = e8);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window == "undefined" || typeof document == "undefined" ? "server" : "client";
  }
  handoff() {
    this.handoffState === "pending" && (this.handoffState = "complete");
  }
  get isHandoffComplete() {
    return this.handoffState === "complete";
  }
};
var s = new o();

// node_modules/@headlessui/react/dist/utils/owner.js
function o2(n13) {
  var e8, r17;
  return s.isServer ? null : n13 ? "ownerDocument" in n13 ? n13.ownerDocument : "current" in n13 ? (r17 = (e8 = n13.current) == null ? void 0 : e8.ownerDocument) != null ? r17 : document : null : document;
}

// node_modules/@headlessui/react/dist/hooks/use-disposables.js
var import_react40 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/micro-task.js
function t(e8) {
  typeof queueMicrotask == "function" ? queueMicrotask(e8) : Promise.resolve().then(e8).catch((o18) => setTimeout(() => {
    throw o18;
  }));
}

// node_modules/@headlessui/react/dist/utils/disposables.js
function o3() {
  let n13 = [], r17 = { addEventListener(e8, t11, s13, a20) {
    return e8.addEventListener(t11, s13, a20), r17.add(() => e8.removeEventListener(t11, s13, a20));
  }, requestAnimationFrame(...e8) {
    let t11 = requestAnimationFrame(...e8);
    return r17.add(() => cancelAnimationFrame(t11));
  }, nextFrame(...e8) {
    return r17.requestAnimationFrame(() => r17.requestAnimationFrame(...e8));
  }, setTimeout(...e8) {
    let t11 = setTimeout(...e8);
    return r17.add(() => clearTimeout(t11));
  }, microTask(...e8) {
    let t11 = { current: true };
    return t(() => {
      t11.current && e8[0]();
    }), r17.add(() => {
      t11.current = false;
    });
  }, style(e8, t11, s13) {
    let a20 = e8.style.getPropertyValue(t11);
    return Object.assign(e8.style, { [t11]: s13 }), this.add(() => {
      Object.assign(e8.style, { [t11]: a20 });
    });
  }, group(e8) {
    let t11 = o3();
    return e8(t11), this.add(() => t11.dispose());
  }, add(e8) {
    return n13.includes(e8) || n13.push(e8), () => {
      let t11 = n13.indexOf(e8);
      if (t11 >= 0) for (let s13 of n13.splice(t11, 1)) s13();
    };
  }, dispose() {
    for (let e8 of n13.splice(0)) e8();
  } };
  return r17;
}

// node_modules/@headlessui/react/dist/hooks/use-disposables.js
function p() {
  let [e8] = (0, import_react40.useState)(o3);
  return (0, import_react40.useEffect)(() => () => e8.dispose(), [e8]), e8;
}

// node_modules/@headlessui/react/dist/hooks/use-event.js
var import_react43 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-latest-value.js
var import_react42 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js
var import_react41 = __toESM(require_react(), 1);
var n = (e8, t11) => {
  s.isServer ? (0, import_react41.useEffect)(e8, t11) : (0, import_react41.useLayoutEffect)(e8, t11);
};

// node_modules/@headlessui/react/dist/hooks/use-latest-value.js
function s3(e8) {
  let r17 = (0, import_react42.useRef)(e8);
  return n(() => {
    r17.current = e8;
  }, [e8]), r17;
}

// node_modules/@headlessui/react/dist/hooks/use-event.js
var o5 = function(t11) {
  let e8 = s3(t11);
  return import_react43.default.useCallback((...r17) => e8.current(...r17), [e8]);
};

// node_modules/@headlessui/react/dist/hooks/use-active-press.js
function E(e8) {
  let t11 = e8.width / 2, n13 = e8.height / 2;
  return { top: e8.clientY - n13, right: e8.clientX + t11, bottom: e8.clientY + n13, left: e8.clientX - t11 };
}
function P(e8, t11) {
  return !(!e8 || !t11 || e8.right < t11.left || e8.left > t11.right || e8.bottom < t11.top || e8.top > t11.bottom);
}
function w({ disabled: e8 = false } = {}) {
  let t11 = (0, import_react44.useRef)(null), [n13, l14] = (0, import_react44.useState)(false), r17 = p(), o18 = o5(() => {
    t11.current = null, l14(false), r17.dispose();
  }), f21 = o5((s13) => {
    if (r17.dispose(), t11.current === null) {
      t11.current = s13.currentTarget, l14(true);
      {
        let i15 = o2(s13.currentTarget);
        r17.addEventListener(i15, "pointerup", o18, false), r17.addEventListener(i15, "pointermove", (c15) => {
          if (t11.current) {
            let p6 = E(c15);
            l14(P(p6, t11.current.getBoundingClientRect()));
          }
        }, false), r17.addEventListener(i15, "pointercancel", o18, false);
      }
    }
  });
  return { pressed: n13, pressProps: e8 ? {} : { onPointerDown: f21, onPointerUp: o18, onClick: o18 } };
}

// node_modules/@headlessui/react/dist/internal/disabled.js
var import_react45 = __toESM(require_react(), 1);
var e = (0, import_react45.createContext)(void 0);
function a3() {
  return (0, import_react45.useContext)(e);
}
function l({ value: t11, children: o18 }) {
  return import_react45.default.createElement(e.Provider, { value: t11 }, o18);
}

// node_modules/@headlessui/react/dist/utils/render.js
var import_react46 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/class-names.js
function t3(...r17) {
  return Array.from(new Set(r17.flatMap((n13) => typeof n13 == "string" ? n13.split(" ") : []))).filter(Boolean).join(" ");
}

// node_modules/@headlessui/react/dist/utils/match.js
function u(r17, n13, ...a20) {
  if (r17 in n13) {
    let e8 = n13[r17];
    return typeof e8 == "function" ? e8(...a20) : e8;
  }
  let t11 = new Error(`Tried to handle "${r17}" but there is no handler defined. Only defined handlers are: ${Object.keys(n13).map((e8) => `"${e8}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(t11, u), t11;
}

// node_modules/@headlessui/react/dist/utils/render.js
var O = ((a20) => (a20[a20.None = 0] = "None", a20[a20.RenderStrategy = 1] = "RenderStrategy", a20[a20.Static = 2] = "Static", a20))(O || {});
var A = ((e8) => (e8[e8.Unmount = 0] = "Unmount", e8[e8.Hidden = 1] = "Hidden", e8))(A || {});
function L() {
  let n13 = U();
  return (0, import_react46.useCallback)((r17) => C({ mergeRefs: n13, ...r17 }), [n13]);
}
function C({ ourProps: n13, theirProps: r17, slot: e8, defaultTag: a20, features: s13, visible: t11 = true, name: l14, mergeRefs: i15 }) {
  i15 = i15 != null ? i15 : $;
  let o18 = P2(r17, n13);
  if (t11) return F(o18, e8, a20, l14, i15);
  let y7 = s13 != null ? s13 : 0;
  if (y7 & 2) {
    let { static: f21 = false, ...u16 } = o18;
    if (f21) return F(u16, e8, a20, l14, i15);
  }
  if (y7 & 1) {
    let { unmount: f21 = true, ...u16 } = o18;
    return u(f21 ? 0 : 1, { [0]() {
      return null;
    }, [1]() {
      return F({ ...u16, hidden: true, style: { display: "none" } }, e8, a20, l14, i15);
    } });
  }
  return F(o18, e8, a20, l14, i15);
}
function F(n13, r17 = {}, e8, a20, s13) {
  let { as: t11 = e8, children: l14, refName: i15 = "ref", ...o18 } = h(n13, ["unmount", "static"]), y7 = n13.ref !== void 0 ? { [i15]: n13.ref } : {}, f21 = typeof l14 == "function" ? l14(r17) : l14;
  "className" in o18 && o18.className && typeof o18.className == "function" && (o18.className = o18.className(r17)), o18["aria-labelledby"] && o18["aria-labelledby"] === o18.id && (o18["aria-labelledby"] = void 0);
  let u16 = {};
  if (r17) {
    let d14 = false, p6 = [];
    for (let [c15, T10] of Object.entries(r17)) typeof T10 == "boolean" && (d14 = true), T10 === true && p6.push(c15.replace(/([A-Z])/g, (g6) => `-${g6.toLowerCase()}`));
    if (d14) {
      u16["data-headlessui-state"] = p6.join(" ");
      for (let c15 of p6) u16[`data-${c15}`] = "";
    }
  }
  if (t11 === import_react46.Fragment && (Object.keys(m2(o18)).length > 0 || Object.keys(m2(u16)).length > 0)) if (!(0, import_react46.isValidElement)(f21) || Array.isArray(f21) && f21.length > 1) {
    if (Object.keys(m2(o18)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${a20} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(m2(o18)).concat(Object.keys(m2(u16))).map((d14) => `  - ${d14}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((d14) => `  - ${d14}`).join(`
`)].join(`
`));
  } else {
    let d14 = f21.props, p6 = d14 == null ? void 0 : d14.className, c15 = typeof p6 == "function" ? (...R8) => t3(p6(...R8), o18.className) : t3(p6, o18.className), T10 = c15 ? { className: c15 } : {}, g6 = P2(f21.props, m2(h(o18, ["ref"])));
    for (let R8 in u16) R8 in g6 && delete u16[R8];
    return (0, import_react46.cloneElement)(f21, Object.assign({}, g6, u16, y7, { ref: s13(H(f21), y7.ref) }, T10));
  }
  return (0, import_react46.createElement)(t11, Object.assign({}, h(o18, ["ref"]), t11 !== import_react46.Fragment && y7, t11 !== import_react46.Fragment && u16), f21);
}
function U() {
  let n13 = (0, import_react46.useRef)([]), r17 = (0, import_react46.useCallback)((e8) => {
    for (let a20 of n13.current) a20 != null && (typeof a20 == "function" ? a20(e8) : a20.current = e8);
  }, []);
  return (...e8) => {
    if (!e8.every((a20) => a20 == null)) return n13.current = e8, r17;
  };
}
function $(...n13) {
  return n13.every((r17) => r17 == null) ? void 0 : (r17) => {
    for (let e8 of n13) e8 != null && (typeof e8 == "function" ? e8(r17) : e8.current = r17);
  };
}
function P2(...n13) {
  var a20;
  if (n13.length === 0) return {};
  if (n13.length === 1) return n13[0];
  let r17 = {}, e8 = {};
  for (let s13 of n13) for (let t11 in s13) t11.startsWith("on") && typeof s13[t11] == "function" ? ((a20 = e8[t11]) != null || (e8[t11] = []), e8[t11].push(s13[t11])) : r17[t11] = s13[t11];
  if (r17.disabled || r17["aria-disabled"]) for (let s13 in e8) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(s13) && (e8[s13] = [(t11) => {
    var l14;
    return (l14 = t11 == null ? void 0 : t11.preventDefault) == null ? void 0 : l14.call(t11);
  }]);
  for (let s13 in e8) Object.assign(r17, { [s13](t11, ...l14) {
    let i15 = e8[s13];
    for (let o18 of i15) {
      if ((t11 instanceof Event || (t11 == null ? void 0 : t11.nativeEvent) instanceof Event) && t11.defaultPrevented) return;
      o18(t11, ...l14);
    }
  } });
  return r17;
}
function _(...n13) {
  var a20;
  if (n13.length === 0) return {};
  if (n13.length === 1) return n13[0];
  let r17 = {}, e8 = {};
  for (let s13 of n13) for (let t11 in s13) t11.startsWith("on") && typeof s13[t11] == "function" ? ((a20 = e8[t11]) != null || (e8[t11] = []), e8[t11].push(s13[t11])) : r17[t11] = s13[t11];
  for (let s13 in e8) Object.assign(r17, { [s13](...t11) {
    let l14 = e8[s13];
    for (let i15 of l14) i15 == null || i15(...t11);
  } });
  return r17;
}
function K(n13) {
  var r17;
  return Object.assign((0, import_react46.forwardRef)(n13), { displayName: (r17 = n13.displayName) != null ? r17 : n13.name });
}
function m2(n13) {
  let r17 = Object.assign({}, n13);
  for (let e8 in r17) r17[e8] === void 0 && delete r17[e8];
  return r17;
}
function h(n13, r17 = []) {
  let e8 = Object.assign({}, n13);
  for (let a20 of r17) a20 in e8 && delete e8[a20];
  return e8;
}
function H(n13) {
  return import_react46.default.version.split(".")[0] >= "19" ? n13.props.ref : n13.ref;
}

// node_modules/@headlessui/react/dist/components/button/button.js
var R = "button";
function v2(a20, u16) {
  var p6;
  let l14 = a3(), { disabled: e8 = l14 || false, autoFocus: t11 = false, ...o18 } = a20, { isFocusVisible: r17, focusProps: i15 } = $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: t11 }), { isHovered: s13, hoverProps: T10 } = $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: e8 }), { pressed: n13, pressProps: d14 } = w({ disabled: e8 }), f21 = _({ ref: u16, type: (p6 = o18.type) != null ? p6 : "button", disabled: e8 || void 0, autoFocus: t11 }, i15, T10, d14), m10 = (0, import_react47.useMemo)(() => ({ disabled: e8, hover: s13, focus: r17, active: n13, autofocus: t11 }), [e8, s13, r17, n13, t11]);
  return L()({ ourProps: f21, theirProps: o18, slot: m10, defaultTag: R, name: "Button" });
}
var H2 = K(v2);

// node_modules/@headlessui/react/dist/components/checkbox/checkbox.js
var import_react56 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-controllable.js
var import_react48 = __toESM(require_react(), 1);
function T(l14, r17, c15) {
  let [i15, s13] = (0, import_react48.useState)(c15), e8 = l14 !== void 0, t11 = (0, import_react48.useRef)(e8), u16 = (0, import_react48.useRef)(false), d14 = (0, import_react48.useRef)(false);
  return e8 && !t11.current && !u16.current ? (u16.current = true, t11.current = e8, console.error("A component is changing from uncontrolled to controlled. This may be caused by the value changing from undefined to a defined value, which should not happen.")) : !e8 && t11.current && !d14.current && (d14.current = true, t11.current = e8, console.error("A component is changing from controlled to uncontrolled. This may be caused by the value changing from a defined value to undefined, which should not happen.")), [e8 ? l14 : i15, o5((n13) => (e8 || s13(n13), r17 == null ? void 0 : r17(n13)))];
}

// node_modules/@headlessui/react/dist/hooks/use-default-value.js
var import_react49 = __toESM(require_react(), 1);
function l2(e8) {
  let [t11] = (0, import_react49.useState)(e8);
  return t11;
}

// node_modules/@headlessui/react/dist/hooks/use-id.js
var import_react50 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/internal/form-fields.js
var import_react51 = __toESM(require_react(), 1);
var import_react_dom3 = __toESM(require_react_dom(), 1);

// node_modules/@headlessui/react/dist/utils/form.js
function e2(i15 = {}, s13 = null, t11 = []) {
  for (let [r17, n13] of Object.entries(i15)) o7(t11, f3(s13, r17), n13);
  return t11;
}
function f3(i15, s13) {
  return i15 ? i15 + "[" + s13 + "]" : s13;
}
function o7(i15, s13, t11) {
  if (Array.isArray(t11)) for (let [r17, n13] of t11.entries()) o7(i15, f3(s13, r17.toString()), n13);
  else t11 instanceof Date ? i15.push([s13, t11.toISOString()]) : typeof t11 == "boolean" ? i15.push([s13, t11 ? "1" : "0"]) : typeof t11 == "string" ? i15.push([s13, t11]) : typeof t11 == "number" ? i15.push([s13, `${t11}`]) : t11 == null ? i15.push([s13, ""]) : e2(t11, s13, i15);
}
function p2(i15) {
  var t11, r17;
  let s13 = (t11 = i15 == null ? void 0 : i15.form) != null ? t11 : i15.closest("form");
  if (s13) {
    for (let n13 of s13.elements) if (n13 !== i15 && (n13.tagName === "INPUT" && n13.type === "submit" || n13.tagName === "BUTTON" && n13.type === "submit" || n13.nodeName === "INPUT" && n13.type === "image")) {
      n13.click();
      return;
    }
    (r17 = s13.requestSubmit) == null || r17.call(s13);
  }
}

// node_modules/@headlessui/react/dist/internal/hidden.js
var a4 = "span";
var s4 = ((e8) => (e8[e8.None = 1] = "None", e8[e8.Focusable = 2] = "Focusable", e8[e8.Hidden = 4] = "Hidden", e8))(s4 || {});
function l3(t11, r17) {
  var n13;
  let { features: d14 = 1, ...e8 } = t11, o18 = { ref: r17, "aria-hidden": (d14 & 2) === 2 ? true : (n13 = e8["aria-hidden"]) != null ? n13 : void 0, hidden: (d14 & 4) === 4 ? true : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(d14 & 4) === 4 && (d14 & 2) !== 2 && { display: "none" } } };
  return L()({ ourProps: o18, theirProps: e8, slot: {}, defaultTag: a4, name: "Hidden" });
}
var f4 = K(l3);

// node_modules/@headlessui/react/dist/internal/form-fields.js
var f5 = (0, import_react51.createContext)(null);
function W(t11) {
  let [e8, r17] = (0, import_react51.useState)(null);
  return import_react51.default.createElement(f5.Provider, { value: { target: e8 } }, t11.children, import_react51.default.createElement(f4, { features: s4.Hidden, ref: r17 }));
}
function c2({ children: t11 }) {
  let e8 = (0, import_react51.useContext)(f5);
  if (!e8) return import_react51.default.createElement(import_react51.default.Fragment, null, t11);
  let { target: r17 } = e8;
  return r17 ? (0, import_react_dom3.createPortal)(import_react51.default.createElement(import_react51.default.Fragment, null, t11), r17) : null;
}
function j2({ data: t11, form: e8, disabled: r17, onReset: n13, overrides: F6 }) {
  let [i15, a20] = (0, import_react51.useState)(null), p6 = p();
  return (0, import_react51.useEffect)(() => {
    if (n13 && i15) return p6.addEventListener(i15, "reset", n13);
  }, [i15, e8, n13]), import_react51.default.createElement(c2, null, import_react51.default.createElement(C2, { setForm: a20, formId: e8 }), e2(t11).map(([s13, v3]) => import_react51.default.createElement(f4, { features: s4.Hidden, ...m2({ key: s13, as: "input", type: "hidden", hidden: true, readOnly: true, form: e8, disabled: r17, name: s13, value: v3, ...F6 }) })));
}
function C2({ setForm: t11, formId: e8 }) {
  return (0, import_react51.useEffect)(() => {
    if (e8) {
      let r17 = document.getElementById(e8);
      r17 && t11(r17);
    }
  }, [t11, e8]), e8 ? null : import_react51.default.createElement(f4, { features: s4.Hidden, as: "input", type: "hidden", hidden: true, readOnly: true, ref: (r17) => {
    if (!r17) return;
    let n13 = r17.closest("form");
    n13 && t11(n13);
  } });
}

// node_modules/@headlessui/react/dist/internal/id.js
var import_react52 = __toESM(require_react(), 1);
var e3 = (0, import_react52.createContext)(void 0);
function u4() {
  return (0, import_react52.useContext)(e3);
}
function f6({ id: t11, children: r17 }) {
  return import_react52.default.createElement(e3.Provider, { value: t11 }, r17);
}

// node_modules/@headlessui/react/dist/utils/bugs.js
function r4(n13) {
  let e8 = n13.parentElement, l14 = null;
  for (; e8 && !(e8 instanceof HTMLFieldSetElement); ) e8 instanceof HTMLLegendElement && (l14 = e8), e8 = e8.parentElement;
  let t11 = (e8 == null ? void 0 : e8.getAttribute("disabled")) === "";
  return t11 && i4(l14) ? false : t11;
}
function i4(n13) {
  if (!n13) return false;
  let e8 = n13.previousElementSibling;
  for (; e8 !== null; ) {
    if (e8 instanceof HTMLLegendElement) return false;
    e8 = e8.previousElementSibling;
  }
  return true;
}

// node_modules/@headlessui/react/dist/components/description/description.js
var import_react54 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-sync-refs.js
var import_react53 = __toESM(require_react(), 1);
var u5 = Symbol();
function T2(t11, n13 = true) {
  return Object.assign(t11, { [u5]: n13 });
}
function y(...t11) {
  let n13 = (0, import_react53.useRef)(t11);
  (0, import_react53.useEffect)(() => {
    n13.current = t11;
  }, [t11]);
  let c15 = o5((e8) => {
    for (let o18 of n13.current) o18 != null && (typeof o18 == "function" ? o18(e8) : o18.current = e8);
  });
  return t11.every((e8) => e8 == null || (e8 == null ? void 0 : e8[u5])) ? void 0 : c15;
}

// node_modules/@headlessui/react/dist/components/description/description.js
var a5 = (0, import_react54.createContext)(null);
a5.displayName = "DescriptionContext";
function f7() {
  let r17 = (0, import_react54.useContext)(a5);
  if (r17 === null) {
    let e8 = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(e8, f7), e8;
  }
  return r17;
}
function U2() {
  var r17, e8;
  return (e8 = (r17 = (0, import_react54.useContext)(a5)) == null ? void 0 : r17.value) != null ? e8 : void 0;
}
function w3() {
  let [r17, e8] = (0, import_react54.useState)([]);
  return [r17.length > 0 ? r17.join(" ") : void 0, (0, import_react54.useMemo)(() => function(t11) {
    let i15 = o5((n13) => (e8((s13) => [...s13, n13]), () => e8((s13) => {
      let o18 = s13.slice(), p6 = o18.indexOf(n13);
      return p6 !== -1 && o18.splice(p6, 1), o18;
    }))), l14 = (0, import_react54.useMemo)(() => ({ register: i15, slot: t11.slot, name: t11.name, props: t11.props, value: t11.value }), [i15, t11.slot, t11.name, t11.props, t11.value]);
    return import_react54.default.createElement(a5.Provider, { value: l14 }, t11.children);
  }, [e8])];
}
var S2 = "p";
function C3(r17, e8) {
  let d14 = (0, import_react50.useId)(), t11 = a3(), { id: i15 = `headlessui-description-${d14}`, ...l14 } = r17, n13 = f7(), s13 = y(e8);
  n(() => n13.register(i15), [i15, n13.register]);
  let o18 = t11 || false, p6 = (0, import_react54.useMemo)(() => ({ ...n13.slot, disabled: o18 }), [n13.slot, o18]), D8 = { ref: s13, ...n13.props, id: i15 };
  return L()({ ourProps: D8, theirProps: l14, slot: p6, defaultTag: S2, name: n13.name || "Description" });
}
var _2 = K(C3);
var H4 = Object.assign(_2, {});

// node_modules/@headlessui/react/dist/components/keyboard.js
var o9 = ((r17) => (r17.Space = " ", r17.Enter = "Enter", r17.Escape = "Escape", r17.Backspace = "Backspace", r17.Delete = "Delete", r17.ArrowLeft = "ArrowLeft", r17.ArrowUp = "ArrowUp", r17.ArrowRight = "ArrowRight", r17.ArrowDown = "ArrowDown", r17.Home = "Home", r17.End = "End", r17.PageUp = "PageUp", r17.PageDown = "PageDown", r17.Tab = "Tab", r17))(o9 || {});

// node_modules/@headlessui/react/dist/components/label/label.js
var import_react55 = __toESM(require_react(), 1);
var c4 = (0, import_react55.createContext)(null);
c4.displayName = "LabelContext";
function P5() {
  let r17 = (0, import_react55.useContext)(c4);
  if (r17 === null) {
    let l14 = new Error("You used a <Label /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(l14, P5), l14;
  }
  return r17;
}
function I(r17) {
  var a20, e8, o18;
  let l14 = (e8 = (a20 = (0, import_react55.useContext)(c4)) == null ? void 0 : a20.value) != null ? e8 : void 0;
  return ((o18 = r17 == null ? void 0 : r17.length) != null ? o18 : 0) > 0 ? [l14, ...r17].filter(Boolean).join(" ") : l14;
}
function K2({ inherit: r17 = false } = {}) {
  let l14 = I(), [a20, e8] = (0, import_react55.useState)([]), o18 = r17 ? [l14, ...a20].filter(Boolean) : a20;
  return [o18.length > 0 ? o18.join(" ") : void 0, (0, import_react55.useMemo)(() => function(t11) {
    let s13 = o5((i15) => (e8((p6) => [...p6, i15]), () => e8((p6) => {
      let u16 = p6.slice(), d14 = u16.indexOf(i15);
      return d14 !== -1 && u16.splice(d14, 1), u16;
    }))), m10 = (0, import_react55.useMemo)(() => ({ register: s13, slot: t11.slot, name: t11.name, props: t11.props, value: t11.value }), [s13, t11.slot, t11.name, t11.props, t11.value]);
    return import_react55.default.createElement(c4.Provider, { value: m10 }, t11.children);
  }, [e8])];
}
var N = "label";
function G(r17, l14) {
  var y7;
  let a20 = (0, import_react50.useId)(), e8 = P5(), o18 = u4(), g6 = a3(), { id: t11 = `headlessui-label-${a20}`, htmlFor: s13 = o18 != null ? o18 : (y7 = e8.props) == null ? void 0 : y7.htmlFor, passive: m10 = false, ...i15 } = r17, p6 = y(l14);
  n(() => e8.register(t11), [t11, e8.register]);
  let u16 = o5((L6) => {
    let b9 = L6.currentTarget;
    if (b9 instanceof HTMLLabelElement && L6.preventDefault(), e8.props && "onClick" in e8.props && typeof e8.props.onClick == "function" && e8.props.onClick(L6), b9 instanceof HTMLLabelElement) {
      let n13 = document.getElementById(b9.htmlFor);
      if (n13) {
        let E13 = n13.getAttribute("disabled");
        if (E13 === "true" || E13 === "") return;
        let x11 = n13.getAttribute("aria-disabled");
        if (x11 === "true" || x11 === "") return;
        (n13 instanceof HTMLInputElement && (n13.type === "radio" || n13.type === "checkbox") || n13.role === "radio" || n13.role === "checkbox" || n13.role === "switch") && n13.click(), n13.focus({ preventScroll: true });
      }
    }
  }), d14 = g6 || false, C9 = (0, import_react55.useMemo)(() => ({ ...e8.slot, disabled: d14 }), [e8.slot, d14]), f21 = { ref: p6, ...e8.props, id: t11, htmlFor: s13, onClick: u16 };
  return m10 && ("onClick" in f21 && (delete f21.htmlFor, delete f21.onClick), "onClick" in i15 && delete i15.onClick), L()({ ourProps: f21, theirProps: i15, slot: C9, defaultTag: s13 ? N : "div", name: e8.name || "Label" });
}
var U3 = K(G);
var Q = Object.assign(U3, {});

// node_modules/@headlessui/react/dist/components/checkbox/checkbox.js
var de = "span";
function pe(T10, h8) {
  let C9 = (0, import_react50.useId)(), k5 = u4(), x11 = a3(), { id: g6 = k5 || `headlessui-checkbox-${C9}`, disabled: e8 = x11 || false, autoFocus: s13 = false, checked: E13, defaultChecked: v3, onChange: P7, name: d14, value: D8, form: R8, indeterminate: n13 = false, tabIndex: A6 = 0, ...F6 } = T10, r17 = l2(v3), [a20, t11] = T(E13, P7, r17 != null ? r17 : false), K4 = I(), _8 = U2(), H14 = p(), [p6, c15] = (0, import_react56.useState)(false), u16 = o5(() => {
    c15(true), t11 == null || t11(!a20), H14.nextFrame(() => {
      c15(false);
    });
  }), B5 = o5((o18) => {
    if (r4(o18.currentTarget)) return o18.preventDefault();
    o18.preventDefault(), u16();
  }), I6 = o5((o18) => {
    o18.key === o9.Space ? (o18.preventDefault(), u16()) : o18.key === o9.Enter && p2(o18.currentTarget);
  }), L6 = o5((o18) => o18.preventDefault()), { isFocusVisible: m10, focusProps: M8 } = $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: s13 }), { isHovered: b9, hoverProps: U7 } = $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: e8 }), { pressed: f21, pressProps: O8 } = w({ disabled: e8 }), X5 = _({ ref: h8, id: g6, role: "checkbox", "aria-checked": n13 ? "mixed" : a20 ? "true" : "false", "aria-labelledby": K4, "aria-describedby": _8, "aria-disabled": e8 ? true : void 0, indeterminate: n13 ? "true" : void 0, tabIndex: e8 ? void 0 : A6, onKeyUp: e8 ? void 0 : I6, onKeyPress: e8 ? void 0 : L6, onClick: e8 ? void 0 : B5 }, M8, U7, O8), G7 = (0, import_react56.useMemo)(() => ({ checked: a20, disabled: e8, hover: b9, focus: m10, active: f21, indeterminate: n13, changing: p6, autofocus: s13 }), [a20, n13, e8, b9, m10, f21, p6, s13]), S6 = (0, import_react56.useCallback)(() => {
    if (r17 !== void 0) return t11 == null ? void 0 : t11(r17);
  }, [t11, r17]), W4 = L();
  return import_react56.default.createElement(import_react56.default.Fragment, null, d14 != null && import_react56.default.createElement(j2, { disabled: e8, data: { [d14]: D8 || "on" }, overrides: { type: "checkbox", checked: a20 }, form: R8, onReset: S6 }), W4({ ourProps: X5, theirProps: F6, slot: G7, defaultTag: de, name: "Checkbox" }));
}
var Fe = K(pe);

// node_modules/@headlessui/react/dist/components/close-button/close-button.js
var import_react58 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/internal/close-provider.js
var import_react57 = __toESM(require_react(), 1);
var e4 = (0, import_react57.createContext)(() => {
});
function u7() {
  return (0, import_react57.useContext)(e4);
}
function C4({ value: t11, children: o18 }) {
  return import_react57.default.createElement(e4.Provider, { value: t11 }, o18);
}

// node_modules/@headlessui/react/dist/components/close-button/close-button.js
function l5(t11, e8) {
  let o18 = u7();
  return import_react58.default.createElement(H2, { ref: e8, ..._({ onClick: o18 }, t11) });
}
var y2 = K(l5);

// node_modules/@tanstack/react-virtual/dist/esm/index.js
var React = __toESM(require_react());
var import_react_dom4 = __toESM(require_react_dom());

// node_modules/@tanstack/virtual-core/dist/esm/utils.js
function memo(getDeps, fn, opts) {
  let deps = opts.initialDeps ?? [];
  let result;
  function memoizedFunction() {
    var _a, _b, _c, _d;
    let depTime;
    if (opts.key && ((_a = opts.debug) == null ? void 0 : _a.call(opts))) depTime = Date.now();
    const newDeps = getDeps();
    const depsChanged = newDeps.length !== deps.length || newDeps.some((dep, index3) => deps[index3] !== dep);
    if (!depsChanged) {
      return result;
    }
    deps = newDeps;
    let resultTime;
    if (opts.key && ((_b = opts.debug) == null ? void 0 : _b.call(opts))) resultTime = Date.now();
    result = fn(...newDeps);
    if (opts.key && ((_c = opts.debug) == null ? void 0 : _c.call(opts))) {
      const depEndTime = Math.round((Date.now() - depTime) * 100) / 100;
      const resultEndTime = Math.round((Date.now() - resultTime) * 100) / 100;
      const resultFpsPercentage = resultEndTime / 16;
      const pad = (str, num) => {
        str = String(str);
        while (str.length < num) {
          str = " " + str;
        }
        return str;
      };
      console.info(
        `%c⏱ ${pad(resultEndTime, 5)} /${pad(depEndTime, 5)} ms`,
        `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(
          0,
          Math.min(120 - 120 * resultFpsPercentage, 120)
        )}deg 100% 31%);`,
        opts == null ? void 0 : opts.key
      );
    }
    (_d = opts == null ? void 0 : opts.onChange) == null ? void 0 : _d.call(opts, result);
    return result;
  }
  memoizedFunction.updateDeps = (newDeps) => {
    deps = newDeps;
  };
  return memoizedFunction;
}
function notUndefined(value, msg) {
  if (value === void 0) {
    throw new Error(`Unexpected undefined${msg ? `: ${msg}` : ""}`);
  } else {
    return value;
  }
}
var approxEqual = (a20, b9) => Math.abs(a20 - b9) < 1;
var debounce = (targetWindow, fn, ms) => {
  let timeoutId2;
  return function(...args) {
    targetWindow.clearTimeout(timeoutId2);
    timeoutId2 = targetWindow.setTimeout(() => fn.apply(this, args), ms);
  };
};

// node_modules/@tanstack/virtual-core/dist/esm/index.js
var defaultKeyExtractor = (index3) => index3;
var defaultRangeExtractor = (range) => {
  const start = Math.max(range.startIndex - range.overscan, 0);
  const end = Math.min(range.endIndex + range.overscan, range.count - 1);
  const arr = [];
  for (let i15 = start; i15 <= end; i15++) {
    arr.push(i15);
  }
  return arr;
};
var observeElementRect = (instance, cb) => {
  const element = instance.scrollElement;
  if (!element) {
    return;
  }
  const targetWindow = instance.targetWindow;
  if (!targetWindow) {
    return;
  }
  const handler = (rect) => {
    const { width, height } = rect;
    cb({ width: Math.round(width), height: Math.round(height) });
  };
  handler(element.getBoundingClientRect());
  if (!targetWindow.ResizeObserver) {
    return () => {
    };
  }
  const observer = new targetWindow.ResizeObserver((entries) => {
    const run = () => {
      const entry = entries[0];
      if (entry == null ? void 0 : entry.borderBoxSize) {
        const box = entry.borderBoxSize[0];
        if (box) {
          handler({ width: box.inlineSize, height: box.blockSize });
          return;
        }
      }
      handler(element.getBoundingClientRect());
    };
    instance.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(run) : run();
  });
  observer.observe(element, { box: "border-box" });
  return () => {
    observer.unobserve(element);
  };
};
var addEventListenerOptions = {
  passive: true
};
var supportsScrollend = typeof window == "undefined" ? true : "onscrollend" in window;
var observeElementOffset = (instance, cb) => {
  const element = instance.scrollElement;
  if (!element) {
    return;
  }
  const targetWindow = instance.targetWindow;
  if (!targetWindow) {
    return;
  }
  let offset4 = 0;
  const fallback = instance.options.useScrollendEvent && supportsScrollend ? () => void 0 : debounce(
    targetWindow,
    () => {
      cb(offset4, false);
    },
    instance.options.isScrollingResetDelay
  );
  const createHandler = (isScrolling) => () => {
    const { horizontal, isRtl } = instance.options;
    offset4 = horizontal ? element["scrollLeft"] * (isRtl && -1 || 1) : element["scrollTop"];
    fallback();
    cb(offset4, isScrolling);
  };
  const handler = createHandler(true);
  const endHandler = createHandler(false);
  endHandler();
  element.addEventListener("scroll", handler, addEventListenerOptions);
  const registerScrollendEvent = instance.options.useScrollendEvent && supportsScrollend;
  if (registerScrollendEvent) {
    element.addEventListener("scrollend", endHandler, addEventListenerOptions);
  }
  return () => {
    element.removeEventListener("scroll", handler);
    if (registerScrollendEvent) {
      element.removeEventListener("scrollend", endHandler);
    }
  };
};
var measureElement = (element, entry, instance) => {
  if (entry == null ? void 0 : entry.borderBoxSize) {
    const box = entry.borderBoxSize[0];
    if (box) {
      const size4 = Math.round(
        box[instance.options.horizontal ? "inlineSize" : "blockSize"]
      );
      return size4;
    }
  }
  return Math.round(
    element.getBoundingClientRect()[instance.options.horizontal ? "width" : "height"]
  );
};
var elementScroll = (offset4, {
  adjustments = 0,
  behavior
}, instance) => {
  var _a, _b;
  const toOffset = offset4 + adjustments;
  (_b = (_a = instance.scrollElement) == null ? void 0 : _a.scrollTo) == null ? void 0 : _b.call(_a, {
    [instance.options.horizontal ? "left" : "top"]: toOffset,
    behavior
  });
};
var Virtualizer = class {
  constructor(opts) {
    this.unsubs = [];
    this.scrollElement = null;
    this.targetWindow = null;
    this.isScrolling = false;
    this.scrollToIndexTimeoutId = null;
    this.measurementsCache = [];
    this.itemSizeCache = /* @__PURE__ */ new Map();
    this.pendingMeasuredCacheIndexes = [];
    this.scrollRect = null;
    this.scrollOffset = null;
    this.scrollDirection = null;
    this.scrollAdjustments = 0;
    this.elementsCache = /* @__PURE__ */ new Map();
    this.observer = /* @__PURE__ */ (() => {
      let _ro = null;
      const get = () => {
        if (_ro) {
          return _ro;
        }
        if (!this.targetWindow || !this.targetWindow.ResizeObserver) {
          return null;
        }
        return _ro = new this.targetWindow.ResizeObserver((entries) => {
          entries.forEach((entry) => {
            const run = () => {
              this._measureElement(entry.target, entry);
            };
            this.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(run) : run();
          });
        });
      };
      return {
        disconnect: () => {
          var _a;
          (_a = get()) == null ? void 0 : _a.disconnect();
          _ro = null;
        },
        observe: (target) => {
          var _a;
          return (_a = get()) == null ? void 0 : _a.observe(target, { box: "border-box" });
        },
        unobserve: (target) => {
          var _a;
          return (_a = get()) == null ? void 0 : _a.unobserve(target);
        }
      };
    })();
    this.range = null;
    this.setOptions = (opts2) => {
      Object.entries(opts2).forEach(([key, value]) => {
        if (typeof value === "undefined") delete opts2[key];
      });
      this.options = {
        debug: false,
        initialOffset: 0,
        overscan: 1,
        paddingStart: 0,
        paddingEnd: 0,
        scrollPaddingStart: 0,
        scrollPaddingEnd: 0,
        horizontal: false,
        getItemKey: defaultKeyExtractor,
        rangeExtractor: defaultRangeExtractor,
        onChange: () => {
        },
        measureElement,
        initialRect: { width: 0, height: 0 },
        scrollMargin: 0,
        gap: 0,
        indexAttribute: "data-index",
        initialMeasurementsCache: [],
        lanes: 1,
        isScrollingResetDelay: 150,
        enabled: true,
        isRtl: false,
        useScrollendEvent: false,
        useAnimationFrameWithResizeObserver: false,
        ...opts2
      };
    };
    this.notify = (sync) => {
      var _a, _b;
      (_b = (_a = this.options).onChange) == null ? void 0 : _b.call(_a, this, sync);
    };
    this.maybeNotify = memo(
      () => {
        this.calculateRange();
        return [
          this.isScrolling,
          this.range ? this.range.startIndex : null,
          this.range ? this.range.endIndex : null
        ];
      },
      (isScrolling) => {
        this.notify(isScrolling);
      },
      {
        key: "maybeNotify",
        debug: () => this.options.debug,
        initialDeps: [
          this.isScrolling,
          this.range ? this.range.startIndex : null,
          this.range ? this.range.endIndex : null
        ]
      }
    );
    this.cleanup = () => {
      this.unsubs.filter(Boolean).forEach((d14) => d14());
      this.unsubs = [];
      this.observer.disconnect();
      this.scrollElement = null;
      this.targetWindow = null;
    };
    this._didMount = () => {
      return () => {
        this.cleanup();
      };
    };
    this._willUpdate = () => {
      var _a;
      const scrollElement = this.options.enabled ? this.options.getScrollElement() : null;
      if (this.scrollElement !== scrollElement) {
        this.cleanup();
        if (!scrollElement) {
          this.maybeNotify();
          return;
        }
        this.scrollElement = scrollElement;
        if (this.scrollElement && "ownerDocument" in this.scrollElement) {
          this.targetWindow = this.scrollElement.ownerDocument.defaultView;
        } else {
          this.targetWindow = ((_a = this.scrollElement) == null ? void 0 : _a.window) ?? null;
        }
        this.elementsCache.forEach((cached) => {
          this.observer.observe(cached);
        });
        this._scrollToOffset(this.getScrollOffset(), {
          adjustments: void 0,
          behavior: void 0
        });
        this.unsubs.push(
          this.options.observeElementRect(this, (rect) => {
            this.scrollRect = rect;
            this.maybeNotify();
          })
        );
        this.unsubs.push(
          this.options.observeElementOffset(this, (offset4, isScrolling) => {
            this.scrollAdjustments = 0;
            this.scrollDirection = isScrolling ? this.getScrollOffset() < offset4 ? "forward" : "backward" : null;
            this.scrollOffset = offset4;
            this.isScrolling = isScrolling;
            this.maybeNotify();
          })
        );
      }
    };
    this.getSize = () => {
      if (!this.options.enabled) {
        this.scrollRect = null;
        return 0;
      }
      this.scrollRect = this.scrollRect ?? this.options.initialRect;
      return this.scrollRect[this.options.horizontal ? "width" : "height"];
    };
    this.getScrollOffset = () => {
      if (!this.options.enabled) {
        this.scrollOffset = null;
        return 0;
      }
      this.scrollOffset = this.scrollOffset ?? (typeof this.options.initialOffset === "function" ? this.options.initialOffset() : this.options.initialOffset);
      return this.scrollOffset;
    };
    this.getFurthestMeasurement = (measurements, index3) => {
      const furthestMeasurementsFound = /* @__PURE__ */ new Map();
      const furthestMeasurements = /* @__PURE__ */ new Map();
      for (let m10 = index3 - 1; m10 >= 0; m10--) {
        const measurement = measurements[m10];
        if (furthestMeasurementsFound.has(measurement.lane)) {
          continue;
        }
        const previousFurthestMeasurement = furthestMeasurements.get(
          measurement.lane
        );
        if (previousFurthestMeasurement == null || measurement.end > previousFurthestMeasurement.end) {
          furthestMeasurements.set(measurement.lane, measurement);
        } else if (measurement.end < previousFurthestMeasurement.end) {
          furthestMeasurementsFound.set(measurement.lane, true);
        }
        if (furthestMeasurementsFound.size === this.options.lanes) {
          break;
        }
      }
      return furthestMeasurements.size === this.options.lanes ? Array.from(furthestMeasurements.values()).sort((a20, b9) => {
        if (a20.end === b9.end) {
          return a20.index - b9.index;
        }
        return a20.end - b9.end;
      })[0] : void 0;
    };
    this.getMeasurementOptions = memo(
      () => [
        this.options.count,
        this.options.paddingStart,
        this.options.scrollMargin,
        this.options.getItemKey,
        this.options.enabled
      ],
      (count2, paddingStart, scrollMargin, getItemKey, enabled) => {
        this.pendingMeasuredCacheIndexes = [];
        return {
          count: count2,
          paddingStart,
          scrollMargin,
          getItemKey,
          enabled
        };
      },
      {
        key: false
      }
    );
    this.getMeasurements = memo(
      () => [this.getMeasurementOptions(), this.itemSizeCache],
      ({ count: count2, paddingStart, scrollMargin, getItemKey, enabled }, itemSizeCache) => {
        if (!enabled) {
          this.measurementsCache = [];
          this.itemSizeCache.clear();
          return [];
        }
        if (this.measurementsCache.length === 0) {
          this.measurementsCache = this.options.initialMeasurementsCache;
          this.measurementsCache.forEach((item) => {
            this.itemSizeCache.set(item.key, item.size);
          });
        }
        const min2 = this.pendingMeasuredCacheIndexes.length > 0 ? Math.min(...this.pendingMeasuredCacheIndexes) : 0;
        this.pendingMeasuredCacheIndexes = [];
        const measurements = this.measurementsCache.slice(0, min2);
        for (let i15 = min2; i15 < count2; i15++) {
          const key = getItemKey(i15);
          const furthestMeasurement = this.options.lanes === 1 ? measurements[i15 - 1] : this.getFurthestMeasurement(measurements, i15);
          const start = furthestMeasurement ? furthestMeasurement.end + this.options.gap : paddingStart + scrollMargin;
          const measuredSize = itemSizeCache.get(key);
          const size4 = typeof measuredSize === "number" ? measuredSize : this.options.estimateSize(i15);
          const end = start + size4;
          const lane = furthestMeasurement ? furthestMeasurement.lane : i15 % this.options.lanes;
          measurements[i15] = {
            index: i15,
            start,
            size: size4,
            end,
            key,
            lane
          };
        }
        this.measurementsCache = measurements;
        return measurements;
      },
      {
        key: "getMeasurements",
        debug: () => this.options.debug
      }
    );
    this.calculateRange = memo(
      () => [
        this.getMeasurements(),
        this.getSize(),
        this.getScrollOffset(),
        this.options.lanes
      ],
      (measurements, outerSize, scrollOffset, lanes) => {
        return this.range = measurements.length > 0 && outerSize > 0 ? calculateRange({
          measurements,
          outerSize,
          scrollOffset,
          lanes
        }) : null;
      },
      {
        key: "calculateRange",
        debug: () => this.options.debug
      }
    );
    this.getVirtualIndexes = memo(
      () => {
        let startIndex = null;
        let endIndex = null;
        const range = this.calculateRange();
        if (range) {
          startIndex = range.startIndex;
          endIndex = range.endIndex;
        }
        this.maybeNotify.updateDeps([this.isScrolling, startIndex, endIndex]);
        return [
          this.options.rangeExtractor,
          this.options.overscan,
          this.options.count,
          startIndex,
          endIndex
        ];
      },
      (rangeExtractor, overscan, count2, startIndex, endIndex) => {
        return startIndex === null || endIndex === null ? [] : rangeExtractor({
          startIndex,
          endIndex,
          overscan,
          count: count2
        });
      },
      {
        key: "getVirtualIndexes",
        debug: () => this.options.debug
      }
    );
    this.indexFromElement = (node) => {
      const attributeName = this.options.indexAttribute;
      const indexStr = node.getAttribute(attributeName);
      if (!indexStr) {
        console.warn(
          `Missing attribute name '${attributeName}={index}' on measured element.`
        );
        return -1;
      }
      return parseInt(indexStr, 10);
    };
    this._measureElement = (node, entry) => {
      const index3 = this.indexFromElement(node);
      const item = this.measurementsCache[index3];
      if (!item) {
        return;
      }
      const key = item.key;
      const prevNode = this.elementsCache.get(key);
      if (prevNode !== node) {
        if (prevNode) {
          this.observer.unobserve(prevNode);
        }
        this.observer.observe(node);
        this.elementsCache.set(key, node);
      }
      if (node.isConnected) {
        this.resizeItem(index3, this.options.measureElement(node, entry, this));
      }
    };
    this.resizeItem = (index3, size4) => {
      const item = this.measurementsCache[index3];
      if (!item) {
        return;
      }
      const itemSize = this.itemSizeCache.get(item.key) ?? item.size;
      const delta = size4 - itemSize;
      if (delta !== 0) {
        if (this.shouldAdjustScrollPositionOnItemSizeChange !== void 0 ? this.shouldAdjustScrollPositionOnItemSizeChange(item, delta, this) : item.start < this.getScrollOffset() + this.scrollAdjustments) {
          if (this.options.debug) {
            console.info("correction", delta);
          }
          this._scrollToOffset(this.getScrollOffset(), {
            adjustments: this.scrollAdjustments += delta,
            behavior: void 0
          });
        }
        this.pendingMeasuredCacheIndexes.push(item.index);
        this.itemSizeCache = new Map(this.itemSizeCache.set(item.key, size4));
        this.notify(false);
      }
    };
    this.measureElement = (node) => {
      if (!node) {
        this.elementsCache.forEach((cached, key) => {
          if (!cached.isConnected) {
            this.observer.unobserve(cached);
            this.elementsCache.delete(key);
          }
        });
        return;
      }
      this._measureElement(node, void 0);
    };
    this.getVirtualItems = memo(
      () => [this.getVirtualIndexes(), this.getMeasurements()],
      (indexes, measurements) => {
        const virtualItems = [];
        for (let k5 = 0, len = indexes.length; k5 < len; k5++) {
          const i15 = indexes[k5];
          const measurement = measurements[i15];
          virtualItems.push(measurement);
        }
        return virtualItems;
      },
      {
        key: "getVirtualItems",
        debug: () => this.options.debug
      }
    );
    this.getVirtualItemForOffset = (offset4) => {
      const measurements = this.getMeasurements();
      if (measurements.length === 0) {
        return void 0;
      }
      return notUndefined(
        measurements[findNearestBinarySearch(
          0,
          measurements.length - 1,
          (index3) => notUndefined(measurements[index3]).start,
          offset4
        )]
      );
    };
    this.getOffsetForAlignment = (toOffset, align, itemSize = 0) => {
      const size4 = this.getSize();
      const scrollOffset = this.getScrollOffset();
      if (align === "auto") {
        align = toOffset >= scrollOffset + size4 ? "end" : "start";
      }
      if (align === "center") {
        toOffset += (itemSize - size4) / 2;
      } else if (align === "end") {
        toOffset -= size4;
      }
      const scrollSizeProp = this.options.horizontal ? "scrollWidth" : "scrollHeight";
      const scrollSize = this.scrollElement ? "document" in this.scrollElement ? this.scrollElement.document.documentElement[scrollSizeProp] : this.scrollElement[scrollSizeProp] : 0;
      const maxOffset = scrollSize - size4;
      return Math.max(Math.min(maxOffset, toOffset), 0);
    };
    this.getOffsetForIndex = (index3, align = "auto") => {
      index3 = Math.max(0, Math.min(index3, this.options.count - 1));
      const item = this.measurementsCache[index3];
      if (!item) {
        return void 0;
      }
      const size4 = this.getSize();
      const scrollOffset = this.getScrollOffset();
      if (align === "auto") {
        if (item.end >= scrollOffset + size4 - this.options.scrollPaddingEnd) {
          align = "end";
        } else if (item.start <= scrollOffset + this.options.scrollPaddingStart) {
          align = "start";
        } else {
          return [scrollOffset, align];
        }
      }
      const toOffset = align === "end" ? item.end + this.options.scrollPaddingEnd : item.start - this.options.scrollPaddingStart;
      return [
        this.getOffsetForAlignment(toOffset, align, item.size),
        align
      ];
    };
    this.isDynamicMode = () => this.elementsCache.size > 0;
    this.cancelScrollToIndex = () => {
      if (this.scrollToIndexTimeoutId !== null && this.targetWindow) {
        this.targetWindow.clearTimeout(this.scrollToIndexTimeoutId);
        this.scrollToIndexTimeoutId = null;
      }
    };
    this.scrollToOffset = (toOffset, { align = "start", behavior } = {}) => {
      this.cancelScrollToIndex();
      if (behavior === "smooth" && this.isDynamicMode()) {
        console.warn(
          "The `smooth` scroll behavior is not fully supported with dynamic size."
        );
      }
      this._scrollToOffset(this.getOffsetForAlignment(toOffset, align), {
        adjustments: void 0,
        behavior
      });
    };
    this.scrollToIndex = (index3, { align: initialAlign = "auto", behavior } = {}) => {
      index3 = Math.max(0, Math.min(index3, this.options.count - 1));
      this.cancelScrollToIndex();
      if (behavior === "smooth" && this.isDynamicMode()) {
        console.warn(
          "The `smooth` scroll behavior is not fully supported with dynamic size."
        );
      }
      const offsetAndAlign = this.getOffsetForIndex(index3, initialAlign);
      if (!offsetAndAlign) return;
      const [offset4, align] = offsetAndAlign;
      this._scrollToOffset(offset4, { adjustments: void 0, behavior });
      if (behavior !== "smooth" && this.isDynamicMode() && this.targetWindow) {
        this.scrollToIndexTimeoutId = this.targetWindow.setTimeout(() => {
          this.scrollToIndexTimeoutId = null;
          const elementInDOM = this.elementsCache.has(
            this.options.getItemKey(index3)
          );
          if (elementInDOM) {
            const [latestOffset] = notUndefined(
              this.getOffsetForIndex(index3, align)
            );
            if (!approxEqual(latestOffset, this.getScrollOffset())) {
              this.scrollToIndex(index3, { align, behavior });
            }
          } else {
            this.scrollToIndex(index3, { align, behavior });
          }
        });
      }
    };
    this.scrollBy = (delta, { behavior } = {}) => {
      this.cancelScrollToIndex();
      if (behavior === "smooth" && this.isDynamicMode()) {
        console.warn(
          "The `smooth` scroll behavior is not fully supported with dynamic size."
        );
      }
      this._scrollToOffset(this.getScrollOffset() + delta, {
        adjustments: void 0,
        behavior
      });
    };
    this.getTotalSize = () => {
      var _a;
      const measurements = this.getMeasurements();
      let end;
      if (measurements.length === 0) {
        end = this.options.paddingStart;
      } else if (this.options.lanes === 1) {
        end = ((_a = measurements[measurements.length - 1]) == null ? void 0 : _a.end) ?? 0;
      } else {
        const endByLane = Array(this.options.lanes).fill(null);
        let endIndex = measurements.length - 1;
        while (endIndex >= 0 && endByLane.some((val) => val === null)) {
          const item = measurements[endIndex];
          if (endByLane[item.lane] === null) {
            endByLane[item.lane] = item.end;
          }
          endIndex--;
        }
        end = Math.max(...endByLane.filter((val) => val !== null));
      }
      return Math.max(
        end - this.options.scrollMargin + this.options.paddingEnd,
        0
      );
    };
    this._scrollToOffset = (offset4, {
      adjustments,
      behavior
    }) => {
      this.options.scrollToFn(offset4, { behavior, adjustments }, this);
    };
    this.measure = () => {
      this.itemSizeCache = /* @__PURE__ */ new Map();
      this.notify(false);
    };
    this.setOptions(opts);
  }
};
var findNearestBinarySearch = (low, high, getCurrentValue, value) => {
  while (low <= high) {
    const middle = (low + high) / 2 | 0;
    const currentValue = getCurrentValue(middle);
    if (currentValue < value) {
      low = middle + 1;
    } else if (currentValue > value) {
      high = middle - 1;
    } else {
      return middle;
    }
  }
  if (low > 0) {
    return low - 1;
  } else {
    return 0;
  }
};
function calculateRange({
  measurements,
  outerSize,
  scrollOffset,
  lanes
}) {
  const lastIndex = measurements.length - 1;
  const getOffset = (index3) => measurements[index3].start;
  if (measurements.length <= lanes) {
    return {
      startIndex: 0,
      endIndex: lastIndex
    };
  }
  let startIndex = findNearestBinarySearch(
    0,
    lastIndex,
    getOffset,
    scrollOffset
  );
  let endIndex = startIndex;
  if (lanes === 1) {
    while (endIndex < lastIndex && measurements[endIndex].end < scrollOffset + outerSize) {
      endIndex++;
    }
  } else if (lanes > 1) {
    const endPerLane = Array(lanes).fill(0);
    while (endIndex < lastIndex && endPerLane.some((pos) => pos < scrollOffset + outerSize)) {
      const item = measurements[endIndex];
      endPerLane[item.lane] = item.end;
      endIndex++;
    }
    const startPerLane = Array(lanes).fill(scrollOffset + outerSize);
    while (startIndex >= 0 && startPerLane.some((pos) => pos >= scrollOffset)) {
      const item = measurements[startIndex];
      startPerLane[item.lane] = item.start;
      startIndex--;
    }
    startIndex = Math.max(0, startIndex - startIndex % lanes);
    endIndex = Math.min(lastIndex, endIndex + (lanes - 1 - endIndex % lanes));
  }
  return { startIndex, endIndex };
}

// node_modules/@tanstack/react-virtual/dist/esm/index.js
var useIsomorphicLayoutEffect = typeof document !== "undefined" ? React.useLayoutEffect : React.useEffect;
function useVirtualizerBase(options) {
  const rerender = React.useReducer(() => ({}), {})[1];
  const resolvedOptions = {
    ...options,
    onChange: (instance2, sync) => {
      var _a;
      if (sync) {
        (0, import_react_dom4.flushSync)(rerender);
      } else {
        rerender();
      }
      (_a = options.onChange) == null ? void 0 : _a.call(options, instance2, sync);
    }
  };
  const [instance] = React.useState(
    () => new Virtualizer(resolvedOptions)
  );
  instance.setOptions(resolvedOptions);
  useIsomorphicLayoutEffect(() => {
    return instance._didMount();
  }, []);
  useIsomorphicLayoutEffect(() => {
    return instance._willUpdate();
  });
  return instance;
}
function useVirtualizer(options) {
  return useVirtualizerBase({
    observeElementRect,
    observeElementOffset,
    scrollToFn: elementScroll,
    ...options
  });
}

// node_modules/@headlessui/react/dist/components/combobox/combobox.js
var import_react85 = __toESM(require_react(), 1);
var import_react_dom8 = __toESM(require_react_dom(), 1);

// node_modules/@headlessui/react/dist/hooks/use-by-comparator.js
var import_react59 = __toESM(require_react(), 1);
function l6(e8, r17) {
  return e8 !== null && r17 !== null && typeof e8 == "object" && typeof r17 == "object" && "id" in e8 && "id" in r17 ? e8.id === r17.id : e8 === r17;
}
function u8(e8 = l6) {
  return (0, import_react59.useCallback)((r17, t11) => {
    if (typeof e8 == "string") {
      let o18 = e8;
      return (r17 == null ? void 0 : r17[o18]) === (t11 == null ? void 0 : t11[o18]);
    }
    return e8(r17, t11);
  }, [e8]);
}

// node_modules/@headlessui/react/dist/hooks/use-element-size.js
var import_react60 = __toESM(require_react(), 1);
function f8(e8) {
  if (e8 === null) return { width: 0, height: 0 };
  let { width: t11, height: r17 } = e8.getBoundingClientRect();
  return { width: t11, height: r17 };
}
function d3(e8, t11 = false) {
  let [r17, u16] = (0, import_react60.useReducer)(() => ({}), {}), i15 = (0, import_react60.useMemo)(() => f8(e8), [e8, r17]);
  return n(() => {
    if (!e8) return;
    let n13 = new ResizeObserver(u16);
    return n13.observe(e8), () => {
      n13.disconnect();
    };
  }, [e8]), t11 ? { width: `${i15.width}px`, height: `${i15.height}px` } : i15;
}

// node_modules/@headlessui/react/dist/hooks/use-is-top-layer.js
var import_react62 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/default-map.js
var a6 = class extends Map {
  constructor(t11) {
    super();
    this.factory = t11;
  }
  get(t11) {
    let e8 = super.get(t11);
    return e8 === void 0 && (e8 = this.factory(t11), this.set(t11, e8)), e8;
  }
};

// node_modules/@headlessui/react/dist/utils/store.js
function a7(o18, r17) {
  let t11 = o18(), n13 = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return t11;
  }, subscribe(e8) {
    return n13.add(e8), () => n13.delete(e8);
  }, dispatch(e8, ...s13) {
    let i15 = r17[e8].call(t11, ...s13);
    i15 && (t11 = i15, n13.forEach((c15) => c15()));
  } };
}

// node_modules/@headlessui/react/dist/hooks/use-store.js
var import_react61 = __toESM(require_react(), 1);
function o11(t11) {
  return (0, import_react61.useSyncExternalStore)(t11.subscribe, t11.getSnapshot, t11.getSnapshot);
}

// node_modules/@headlessui/react/dist/hooks/use-is-top-layer.js
var p3 = new a6(() => a7(() => [], { ADD(r17) {
  return this.includes(r17) ? this : [...this, r17];
}, REMOVE(r17) {
  let e8 = this.indexOf(r17);
  if (e8 === -1) return this;
  let t11 = this.slice();
  return t11.splice(e8, 1), t11;
} }));
function x2(r17, e8) {
  let t11 = p3.get(e8), i15 = (0, import_react62.useId)(), h8 = o11(t11);
  if (n(() => {
    if (r17) return t11.dispatch("ADD", i15), () => t11.dispatch("REMOVE", i15);
  }, [t11, r17]), !r17) return false;
  let s13 = h8.indexOf(i15), o18 = h8.length;
  return s13 === -1 && (s13 = o18, o18 += 1), s13 === o18 - 1;
}

// node_modules/@headlessui/react/dist/hooks/use-inert-others.js
var f9 = /* @__PURE__ */ new Map();
var u9 = /* @__PURE__ */ new Map();
function h4(t11) {
  var e8;
  let r17 = (e8 = u9.get(t11)) != null ? e8 : 0;
  return u9.set(t11, r17 + 1), r17 !== 0 ? () => m5(t11) : (f9.set(t11, { "aria-hidden": t11.getAttribute("aria-hidden"), inert: t11.inert }), t11.setAttribute("aria-hidden", "true"), t11.inert = true, () => m5(t11));
}
function m5(t11) {
  var i15;
  let r17 = (i15 = u9.get(t11)) != null ? i15 : 1;
  if (r17 === 1 ? u9.delete(t11) : u9.set(t11, r17 - 1), r17 !== 1) return;
  let e8 = f9.get(t11);
  e8 && (e8["aria-hidden"] === null ? t11.removeAttribute("aria-hidden") : t11.setAttribute("aria-hidden", e8["aria-hidden"]), t11.inert = e8.inert, f9.delete(t11));
}
function y3(t11, { allowed: r17, disallowed: e8 } = {}) {
  let i15 = x2(t11, "inert-others");
  n(() => {
    var d14, c15;
    if (!i15) return;
    let a20 = o3();
    for (let n13 of (d14 = e8 == null ? void 0 : e8()) != null ? d14 : []) n13 && a20.add(h4(n13));
    let s13 = (c15 = r17 == null ? void 0 : r17()) != null ? c15 : [];
    for (let n13 of s13) {
      if (!n13) continue;
      let l14 = o2(n13);
      if (!l14) continue;
      let o18 = n13.parentElement;
      for (; o18 && o18 !== l14.body; ) {
        for (let p6 of o18.children) s13.some((E13) => p6.contains(E13)) || a20.add(h4(p6));
        o18 = o18.parentElement;
      }
    }
    return a20.dispose;
  }, [i15, r17, e8]);
}

// node_modules/@headlessui/react/dist/hooks/use-on-disappear.js
var import_react63 = __toESM(require_react(), 1);
function m6(s13, n13, l14) {
  let i15 = s3((t11) => {
    let e8 = t11.getBoundingClientRect();
    e8.x === 0 && e8.y === 0 && e8.width === 0 && e8.height === 0 && l14();
  });
  (0, import_react63.useEffect)(() => {
    if (!s13) return;
    let t11 = n13 === null ? null : n13 instanceof HTMLElement ? n13 : n13.current;
    if (!t11) return;
    let e8 = o3();
    if (typeof ResizeObserver != "undefined") {
      let r17 = new ResizeObserver(() => i15.current(t11));
      r17.observe(t11), e8.add(() => r17.disconnect());
    }
    if (typeof IntersectionObserver != "undefined") {
      let r17 = new IntersectionObserver(() => i15.current(t11));
      r17.observe(t11), e8.add(() => r17.disconnect());
    }
    return () => e8.dispose();
  }, [n13, i15, s13]);
}

// node_modules/@headlessui/react/dist/hooks/use-outside-click.js
var import_react66 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/focus-management.js
var f10 = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e8) => `${e8}:not([tabindex='-1'])`).join(",");
var p4 = ["[data-autofocus]"].map((e8) => `${e8}:not([tabindex='-1'])`).join(",");
var F2 = ((n13) => (n13[n13.First = 1] = "First", n13[n13.Previous = 2] = "Previous", n13[n13.Next = 4] = "Next", n13[n13.Last = 8] = "Last", n13[n13.WrapAround = 16] = "WrapAround", n13[n13.NoScroll = 32] = "NoScroll", n13[n13.AutoFocus = 64] = "AutoFocus", n13))(F2 || {});
var T5 = ((o18) => (o18[o18.Error = 0] = "Error", o18[o18.Overflow = 1] = "Overflow", o18[o18.Success = 2] = "Success", o18[o18.Underflow = 3] = "Underflow", o18))(T5 || {});
var y4 = ((t11) => (t11[t11.Previous = -1] = "Previous", t11[t11.Next = 1] = "Next", t11))(y4 || {});
function b2(e8 = document.body) {
  return e8 == null ? [] : Array.from(e8.querySelectorAll(f10)).sort((r17, t11) => Math.sign((r17.tabIndex || Number.MAX_SAFE_INTEGER) - (t11.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function S3(e8 = document.body) {
  return e8 == null ? [] : Array.from(e8.querySelectorAll(p4)).sort((r17, t11) => Math.sign((r17.tabIndex || Number.MAX_SAFE_INTEGER) - (t11.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var h5 = ((t11) => (t11[t11.Strict = 0] = "Strict", t11[t11.Loose = 1] = "Loose", t11))(h5 || {});
function A2(e8, r17 = 0) {
  var t11;
  return e8 === ((t11 = o2(e8)) == null ? void 0 : t11.body) ? false : u(r17, { [0]() {
    return e8.matches(f10);
  }, [1]() {
    let u16 = e8;
    for (; u16 !== null; ) {
      if (u16.matches(f10)) return true;
      u16 = u16.parentElement;
    }
    return false;
  } });
}
function G2(e8) {
  let r17 = o2(e8);
  o3().nextFrame(() => {
    r17 && !A2(r17.activeElement, 0) && I2(e8);
  });
}
var H5 = ((t11) => (t11[t11.Keyboard = 0] = "Keyboard", t11[t11.Mouse = 1] = "Mouse", t11))(H5 || {});
typeof window != "undefined" && typeof document != "undefined" && (document.addEventListener("keydown", (e8) => {
  e8.metaKey || e8.altKey || e8.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, true), document.addEventListener("click", (e8) => {
  e8.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e8.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, true));
function I2(e8) {
  e8 == null || e8.focus({ preventScroll: true });
}
var w5 = ["textarea", "input"].join(",");
function O2(e8) {
  var r17, t11;
  return (t11 = (r17 = e8 == null ? void 0 : e8.matches) == null ? void 0 : r17.call(e8, w5)) != null ? t11 : false;
}
function _3(e8, r17 = (t11) => t11) {
  return e8.slice().sort((t11, u16) => {
    let o18 = r17(t11), c15 = r17(u16);
    if (o18 === null || c15 === null) return 0;
    let l14 = o18.compareDocumentPosition(c15);
    return l14 & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : l14 & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function j3(e8, r17) {
  return P6(b2(), r17, { relativeTo: e8 });
}
function P6(e8, r17, { sorted: t11 = true, relativeTo: u16 = null, skipElements: o18 = [] } = {}) {
  let c15 = Array.isArray(e8) ? e8.length > 0 ? e8[0].ownerDocument : document : e8.ownerDocument, l14 = Array.isArray(e8) ? t11 ? _3(e8) : e8 : r17 & 64 ? S3(e8) : b2(e8);
  o18.length > 0 && l14.length > 1 && (l14 = l14.filter((s13) => !o18.some((a20) => a20 != null && "current" in a20 ? (a20 == null ? void 0 : a20.current) === s13 : a20 === s13))), u16 = u16 != null ? u16 : c15.activeElement;
  let n13 = (() => {
    if (r17 & 5) return 1;
    if (r17 & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), x11 = (() => {
    if (r17 & 1) return 0;
    if (r17 & 2) return Math.max(0, l14.indexOf(u16)) - 1;
    if (r17 & 4) return Math.max(0, l14.indexOf(u16)) + 1;
    if (r17 & 8) return l14.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), M8 = r17 & 32 ? { preventScroll: true } : {}, m10 = 0, d14 = l14.length, i15;
  do {
    if (m10 >= d14 || m10 + d14 <= 0) return 0;
    let s13 = x11 + m10;
    if (r17 & 16) s13 = (s13 + d14) % d14;
    else {
      if (s13 < 0) return 3;
      if (s13 >= d14) return 1;
    }
    i15 = l14[s13], i15 == null || i15.focus(M8), m10 += n13;
  } while (i15 !== c15.activeElement);
  return r17 & 6 && O2(i15) && i15.select(), 2;
}

// node_modules/@headlessui/react/dist/utils/platform.js
function t4() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function i8() {
  return /Android/gi.test(window.navigator.userAgent);
}
function n8() {
  return t4() || i8();
}

// node_modules/@headlessui/react/dist/hooks/use-document-event.js
var import_react64 = __toESM(require_react(), 1);
function i9(t11, e8, o18, n13) {
  let u16 = s3(o18);
  (0, import_react64.useEffect)(() => {
    if (!t11) return;
    function r17(m10) {
      u16.current(m10);
    }
    return document.addEventListener(e8, r17, n13), () => document.removeEventListener(e8, r17, n13);
  }, [t11, e8, n13]);
}

// node_modules/@headlessui/react/dist/hooks/use-window-event.js
var import_react65 = __toESM(require_react(), 1);
function s5(t11, e8, o18, n13) {
  let i15 = s3(o18);
  (0, import_react65.useEffect)(() => {
    if (!t11) return;
    function r17(d14) {
      i15.current(d14);
    }
    return window.addEventListener(e8, r17, n13), () => window.removeEventListener(e8, r17, n13);
  }, [t11, e8, n13]);
}

// node_modules/@headlessui/react/dist/hooks/use-outside-click.js
var E4 = 30;
function R3(p6, f21, C9) {
  let u16 = x2(p6, "outside-click"), m10 = s3(C9), s13 = (0, import_react66.useCallback)(function(e8, n13) {
    if (e8.defaultPrevented) return;
    let r17 = n13(e8);
    if (r17 === null || !r17.getRootNode().contains(r17) || !r17.isConnected) return;
    let h8 = function l14(o18) {
      return typeof o18 == "function" ? l14(o18()) : Array.isArray(o18) || o18 instanceof Set ? o18 : [o18];
    }(f21);
    for (let l14 of h8) if (l14 !== null && (l14.contains(r17) || e8.composed && e8.composedPath().includes(l14))) return;
    return !A2(r17, h5.Loose) && r17.tabIndex !== -1 && e8.preventDefault(), m10.current(e8, r17);
  }, [m10, f21]), i15 = (0, import_react66.useRef)(null);
  i9(u16, "pointerdown", (t11) => {
    var e8, n13;
    i15.current = ((n13 = (e8 = t11.composedPath) == null ? void 0 : e8.call(t11)) == null ? void 0 : n13[0]) || t11.target;
  }, true), i9(u16, "mousedown", (t11) => {
    var e8, n13;
    i15.current = ((n13 = (e8 = t11.composedPath) == null ? void 0 : e8.call(t11)) == null ? void 0 : n13[0]) || t11.target;
  }, true), i9(u16, "click", (t11) => {
    n8() || i15.current && (s13(t11, () => i15.current), i15.current = null);
  }, true);
  let a20 = (0, import_react66.useRef)({ x: 0, y: 0 });
  i9(u16, "touchstart", (t11) => {
    a20.current.x = t11.touches[0].clientX, a20.current.y = t11.touches[0].clientY;
  }, true), i9(u16, "touchend", (t11) => {
    let e8 = { x: t11.changedTouches[0].clientX, y: t11.changedTouches[0].clientY };
    if (!(Math.abs(e8.x - a20.current.x) >= E4 || Math.abs(e8.y - a20.current.y) >= E4)) return s13(t11, () => t11.target instanceof HTMLElement ? t11.target : null);
  }, true), s5(u16, "blur", (t11) => s13(t11, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), true);
}

// node_modules/@headlessui/react/dist/hooks/use-owner.js
var import_react67 = __toESM(require_react(), 1);
function n9(...e8) {
  return (0, import_react67.useMemo)(() => o2(...e8), [...e8]);
}

// node_modules/@headlessui/react/dist/hooks/use-refocusable-input.js
var import_react69 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-event-listener.js
var import_react68 = __toESM(require_react(), 1);
function E5(n13, e8, a20, t11) {
  let i15 = s3(a20);
  (0, import_react68.useEffect)(() => {
    n13 = n13 != null ? n13 : window;
    function r17(o18) {
      i15.current(o18);
    }
    return n13.addEventListener(e8, r17, t11), () => n13.removeEventListener(e8, r17, t11);
  }, [n13, e8, t11]);
}

// node_modules/@headlessui/react/dist/hooks/use-refocusable-input.js
function i10(e8) {
  let n13 = (0, import_react69.useRef)({ value: "", selectionStart: null, selectionEnd: null });
  return E5(e8, "blur", (l14) => {
    let t11 = l14.target;
    t11 instanceof HTMLInputElement && (n13.current = { value: t11.value, selectionStart: t11.selectionStart, selectionEnd: t11.selectionEnd });
  }), o5(() => {
    if (document.activeElement !== e8 && e8 instanceof HTMLInputElement && e8.isConnected) {
      if (e8.focus({ preventScroll: true }), e8.value !== n13.current.value) e8.setSelectionRange(e8.value.length, e8.value.length);
      else {
        let { selectionStart: l14, selectionEnd: t11 } = n13.current;
        l14 !== null && t11 !== null && e8.setSelectionRange(l14, t11);
      }
      n13.current = { value: "", selectionStart: null, selectionEnd: null };
    }
  });
}

// node_modules/@headlessui/react/dist/hooks/use-resolve-button-type.js
var import_react70 = __toESM(require_react(), 1);
function e6(t11, u16) {
  return (0, import_react70.useMemo)(() => {
    var n13;
    if (t11.type) return t11.type;
    let r17 = (n13 = t11.as) != null ? n13 : "button";
    if (typeof r17 == "string" && r17.toLowerCase() === "button" || (u16 == null ? void 0 : u16.tagName) === "BUTTON" && !u16.hasAttribute("type")) return "button";
  }, [t11.type, t11.as, u16]);
}

// node_modules/@headlessui/react/dist/hooks/document-overflow/adjust-scrollbar-padding.js
function d6() {
  let r17;
  return { before({ doc: e8 }) {
    var l14;
    let o18 = e8.documentElement, t11 = (l14 = e8.defaultView) != null ? l14 : window;
    r17 = Math.max(0, t11.innerWidth - o18.clientWidth);
  }, after({ doc: e8, d: o18 }) {
    let t11 = e8.documentElement, l14 = Math.max(0, t11.clientWidth - t11.offsetWidth), n13 = Math.max(0, r17 - l14);
    o18.style(t11, "paddingRight", `${n13}px`);
  } };
}

// node_modules/@headlessui/react/dist/hooks/document-overflow/handle-ios-locking.js
function d7() {
  return t4() ? { before({ doc: r17, d: n13, meta: c15 }) {
    function o18(a20) {
      return c15.containers.flatMap((l14) => l14()).some((l14) => l14.contains(a20));
    }
    n13.microTask(() => {
      var s13;
      if (window.getComputedStyle(r17.documentElement).scrollBehavior !== "auto") {
        let t11 = o3();
        t11.style(r17.documentElement, "scrollBehavior", "auto"), n13.add(() => n13.microTask(() => t11.dispose()));
      }
      let a20 = (s13 = window.scrollY) != null ? s13 : window.pageYOffset, l14 = null;
      n13.addEventListener(r17, "click", (t11) => {
        if (t11.target instanceof HTMLElement) try {
          let e8 = t11.target.closest("a");
          if (!e8) return;
          let { hash: f21 } = new URL(e8.href), i15 = r17.querySelector(f21);
          i15 && !o18(i15) && (l14 = i15);
        } catch {
        }
      }, true), n13.addEventListener(r17, "touchstart", (t11) => {
        if (t11.target instanceof HTMLElement) if (o18(t11.target)) {
          let e8 = t11.target;
          for (; e8.parentElement && o18(e8.parentElement); ) e8 = e8.parentElement;
          n13.style(e8, "overscrollBehavior", "contain");
        } else n13.style(t11.target, "touchAction", "none");
      }), n13.addEventListener(r17, "touchmove", (t11) => {
        if (t11.target instanceof HTMLElement) {
          if (t11.target.tagName === "INPUT") return;
          if (o18(t11.target)) {
            let e8 = t11.target;
            for (; e8.parentElement && e8.dataset.headlessuiPortal !== "" && !(e8.scrollHeight > e8.clientHeight || e8.scrollWidth > e8.clientWidth); ) e8 = e8.parentElement;
            e8.dataset.headlessuiPortal === "" && t11.preventDefault();
          } else t11.preventDefault();
        }
      }, { passive: false }), n13.add(() => {
        var e8;
        let t11 = (e8 = window.scrollY) != null ? e8 : window.pageYOffset;
        a20 !== t11 && window.scrollTo(0, a20), l14 && l14.isConnected && (l14.scrollIntoView({ block: "nearest" }), l14 = null);
      });
    });
  } } : {};
}

// node_modules/@headlessui/react/dist/hooks/document-overflow/prevent-scroll.js
function r7() {
  return { before({ doc: e8, d: o18 }) {
    o18.style(e8.documentElement, "overflow", "hidden");
  } };
}

// node_modules/@headlessui/react/dist/hooks/document-overflow/overflow-store.js
function m7(e8) {
  let n13 = {};
  for (let t11 of e8) Object.assign(n13, t11(n13));
  return n13;
}
var a10 = a7(() => /* @__PURE__ */ new Map(), { PUSH(e8, n13) {
  var o18;
  let t11 = (o18 = this.get(e8)) != null ? o18 : { doc: e8, count: 0, d: o3(), meta: /* @__PURE__ */ new Set() };
  return t11.count++, t11.meta.add(n13), this.set(e8, t11), this;
}, POP(e8, n13) {
  let t11 = this.get(e8);
  return t11 && (t11.count--, t11.meta.delete(n13)), this;
}, SCROLL_PREVENT({ doc: e8, d: n13, meta: t11 }) {
  let o18 = { doc: e8, d: n13, meta: m7(t11) }, c15 = [d7(), d6(), r7()];
  c15.forEach(({ before: r17 }) => r17 == null ? void 0 : r17(o18)), c15.forEach(({ after: r17 }) => r17 == null ? void 0 : r17(o18));
}, SCROLL_ALLOW({ d: e8 }) {
  e8.dispose();
}, TEARDOWN({ doc: e8 }) {
  this.delete(e8);
} });
a10.subscribe(() => {
  let e8 = a10.getSnapshot(), n13 = /* @__PURE__ */ new Map();
  for (let [t11] of e8) n13.set(t11, t11.documentElement.style.overflow);
  for (let t11 of e8.values()) {
    let o18 = n13.get(t11.doc) === "hidden", c15 = t11.count !== 0;
    (c15 && !o18 || !c15 && o18) && a10.dispatch(t11.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", t11), t11.count === 0 && a10.dispatch("TEARDOWN", t11);
  }
});

// node_modules/@headlessui/react/dist/hooks/document-overflow/use-document-overflow.js
function a11(r17, e8, n13 = () => ({ containers: [] })) {
  let f21 = o11(a10), o18 = e8 ? f21.get(e8) : void 0, i15 = o18 ? o18.count > 0 : false;
  return n(() => {
    if (!(!e8 || !r17)) return a10.dispatch("PUSH", e8, n13), () => a10.dispatch("POP", e8, n13);
  }, [r17, e8]), i15;
}

// node_modules/@headlessui/react/dist/hooks/use-scroll-lock.js
function f11(e8, c15, n13 = () => [document.body]) {
  let r17 = x2(e8, "scroll-lock");
  a11(r17, c15, (t11) => {
    var o18;
    return { containers: [...(o18 = t11.containers) != null ? o18 : [], n13] };
  });
}

// node_modules/@headlessui/react/dist/hooks/use-tracked-pointer.js
var import_react71 = __toESM(require_react(), 1);
function t6(e8) {
  return [e8.screenX, e8.screenY];
}
function u10() {
  let e8 = (0, import_react71.useRef)([-1, -1]);
  return { wasMoved(r17) {
    let n13 = t6(r17);
    return e8.current[0] === n13[0] && e8.current[1] === n13[1] ? false : (e8.current = n13, true);
  }, update(r17) {
    e8.current = t6(r17);
  } };
}

// node_modules/@headlessui/react/dist/hooks/use-transition.js
var import_react73 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-flags.js
var import_react72 = __toESM(require_react(), 1);
function c6(u16 = 0) {
  let [t11, l14] = (0, import_react72.useState)(u16), g6 = (0, import_react72.useCallback)((e8) => l14(e8), [t11]), s13 = (0, import_react72.useCallback)((e8) => l14((a20) => a20 | e8), [t11]), m10 = (0, import_react72.useCallback)((e8) => (t11 & e8) === e8, [t11]), n13 = (0, import_react72.useCallback)((e8) => l14((a20) => a20 & ~e8), [l14]), F6 = (0, import_react72.useCallback)((e8) => l14((a20) => a20 ^ e8), [l14]);
  return { flags: t11, setFlag: g6, addFlag: s13, hasFlag: m10, removeFlag: n13, toggleFlag: F6 };
}

// node_modules/@headlessui/react/dist/hooks/use-transition.js
var T7;
var b4;
typeof process != "undefined" && typeof globalThis != "undefined" && typeof Element != "undefined" && ((T7 = process == null ? void 0 : process.env) == null ? void 0 : T7["NODE_ENV"]) === "test" && typeof ((b4 = Element == null ? void 0 : Element.prototype) == null ? void 0 : b4.getAnimations) == "undefined" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var L2 = ((r17) => (r17[r17.None = 0] = "None", r17[r17.Closed = 1] = "Closed", r17[r17.Enter = 2] = "Enter", r17[r17.Leave = 4] = "Leave", r17))(L2 || {});
function R4(t11) {
  let n13 = {};
  for (let e8 in t11) t11[e8] === true && (n13[`data-${e8}`] = "");
  return n13;
}
function x3(t11, n13, e8, i15) {
  let [r17, o18] = (0, import_react73.useState)(e8), { hasFlag: s13, addFlag: a20, removeFlag: l14 } = c6(t11 && r17 ? 3 : 0), u16 = (0, import_react73.useRef)(false), f21 = (0, import_react73.useRef)(false), E13 = p();
  return n(() => {
    var d14;
    if (t11) {
      if (e8 && o18(true), !n13) {
        e8 && a20(3);
        return;
      }
      return (d14 = i15 == null ? void 0 : i15.start) == null || d14.call(i15, e8), C5(n13, { inFlight: u16, prepare() {
        f21.current ? f21.current = false : f21.current = u16.current, u16.current = true, !f21.current && (e8 ? (a20(3), l14(4)) : (a20(4), l14(2)));
      }, run() {
        f21.current ? e8 ? (l14(3), a20(4)) : (l14(4), a20(3)) : e8 ? l14(1) : a20(1);
      }, done() {
        var p6;
        f21.current && typeof n13.getAnimations == "function" && n13.getAnimations().length > 0 || (u16.current = false, l14(7), e8 || o18(false), (p6 = i15 == null ? void 0 : i15.end) == null || p6.call(i15, e8));
      } });
    }
  }, [t11, e8, n13, E13]), t11 ? [r17, { closed: s13(1), enter: s13(2), leave: s13(4), transition: s13(2) || s13(4) }] : [e8, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function C5(t11, { prepare: n13, run: e8, done: i15, inFlight: r17 }) {
  let o18 = o3();
  return j4(t11, { prepare: n13, inFlight: r17 }), o18.nextFrame(() => {
    e8(), o18.requestAnimationFrame(() => {
      o18.add(M(t11, i15));
    });
  }), o18.dispose;
}
function M(t11, n13) {
  var o18, s13;
  let e8 = o3();
  if (!t11) return e8.dispose;
  let i15 = false;
  e8.add(() => {
    i15 = true;
  });
  let r17 = (s13 = (o18 = t11.getAnimations) == null ? void 0 : o18.call(t11).filter((a20) => a20 instanceof CSSTransition)) != null ? s13 : [];
  return r17.length === 0 ? (n13(), e8.dispose) : (Promise.allSettled(r17.map((a20) => a20.finished)).then(() => {
    i15 || n13();
  }), e8.dispose);
}
function j4(t11, { inFlight: n13, prepare: e8 }) {
  if (n13 != null && n13.current) {
    e8();
    return;
  }
  let i15 = t11.style.transition;
  t11.style.transition = "none", e8(), t11.offsetHeight, t11.style.transition = i15;
}

// node_modules/@headlessui/react/dist/hooks/use-tree-walker.js
var import_react74 = __toESM(require_react(), 1);
function F3(c15, { container: e8, accept: t11, walk: r17 }) {
  let o18 = (0, import_react74.useRef)(t11), l14 = (0, import_react74.useRef)(r17);
  (0, import_react74.useEffect)(() => {
    o18.current = t11, l14.current = r17;
  }, [t11, r17]), n(() => {
    if (!e8 || !c15) return;
    let n13 = o2(e8);
    if (!n13) return;
    let f21 = o18.current, p6 = l14.current, i15 = Object.assign((m10) => f21(m10), { acceptNode: f21 }), u16 = n13.createTreeWalker(e8, NodeFilter.SHOW_ELEMENT, i15, false);
    for (; u16.nextNode(); ) p6(u16.currentNode);
  }, [e8, c15, o18, l14]);
}

// node_modules/@headlessui/react/dist/hooks/use-watch.js
var import_react75 = __toESM(require_react(), 1);
function m8(u16, t11) {
  let e8 = (0, import_react75.useRef)([]), r17 = o5(u16);
  (0, import_react75.useEffect)(() => {
    let o18 = [...e8.current];
    for (let [a20, l14] of t11.entries()) if (e8.current[a20] !== l14) {
      let n13 = r17(t11, o18);
      return e8.current = t11, n13;
    }
  }, [r17, ...t11]);
}

// node_modules/@floating-ui/react/dist/floating-ui.react.mjs
var React3 = __toESM(require_react(), 1);
var import_react77 = __toESM(require_react(), 1);

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [":popover-open", ":modal"].some((selector) => {
    try {
      return element.matches(selector);
    } catch (e8) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((value) => css[value] ? css[value] !== "none" : false) || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

// node_modules/@floating-ui/react/dist/floating-ui.react.utils.mjs
function getPlatform() {
  const uaData = navigator.userAgentData;
  if (uaData != null && uaData.platform) {
    return uaData.platform;
  }
  return navigator.platform;
}
function getUserAgent() {
  const uaData = navigator.userAgentData;
  if (uaData && Array.isArray(uaData.brands)) {
    return uaData.brands.map((_ref) => {
      let {
        brand,
        version
      } = _ref;
      return brand + "/" + version;
    }).join(" ");
  }
  return navigator.userAgent;
}
function isSafari() {
  return /apple/i.test(navigator.vendor);
}
function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sides = ["top", "right", "bottom", "left"];
var alignments = ["start", "end"];
var placements = sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v3) => ({
  x: v3,
  y: v3
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
var oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt3 = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt3;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x: x11,
    y: y7,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y7,
    left: x11,
    right: x11 + width,
    bottom: y7 + height,
    x: x11,
    y: y7
  };
}

// node_modules/tabbable/dist/index.esm.js
var candidateSelectors = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"];
var candidateSelector = candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
  var _element$getRootNode;
  return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
} : function(element) {
  return element === null || element === void 0 ? void 0 : element.ownerDocument;
};
var focusableCandidateSelector = candidateSelectors.concat("iframe").join(",");

// node_modules/@floating-ui/react/dist/floating-ui.react.mjs
var ReactDOM2 = __toESM(require_react_dom(), 1);

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x: x11,
    y: y7
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i15 = 0; i15 < validMiddleware.length; i15++) {
    const {
      name,
      fn
    } = validMiddleware[i15];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x: x11,
      y: y7,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x11 = nextX != null ? nextX : x11;
    y7 = nextY != null ? nextY : y7;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x: x11,
          y: y7
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i15 = -1;
    }
  }
  return {
    x: x11,
    y: y7,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x: x11,
    y: y7,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x: x11,
    y: y7,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d14) => d14.overflows[0] <= 0).sort((a20, b9) => a20.overflows[1] - b9.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d14) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d14.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d14) => [d14.placement, d14.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a20, b9) => a20[1] - b9[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x: x11,
        y: y7,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x11 + diffCoords.x,
        y: y7 + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x: x11,
        y: y7,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x12,
              y: y8
            } = _ref;
            return {
              x: x12,
              y: y8
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x: x11,
        y: y7
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x11,
          y: limitedCoords.y - y7,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
var size = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $: $5
  } = getCssDimensions(domElement);
  let x11 = ($5 ? round(rect.width) : rect.width) / width;
  let y7 = ($5 ? round(rect.height) : rect.height) / height;
  if (!x11 || !Number.isFinite(x11)) {
    x11 = 1;
  }
  if (!y7 || !Number.isFinite(y7)) {
    y7 = 1;
  }
  return {
    x: x11,
    y: y7
  };
}
var noOffsets = createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x11 = (clientRect.left + visualOffsets.x) / scale.x;
  let y7 = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x11 *= iframeScale.x;
      y7 *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x11 += left;
      y7 += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x: x11,
    y: y7
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
  if (ignoreScrollbarX === void 0) {
    ignoreScrollbarX = false;
  }
  const htmlRect = documentElement.getBoundingClientRect();
  const x11 = htmlRect.left + scroll.scrollLeft - (ignoreScrollbarX ? 0 : (
    // RTL <body> scrollbar.
    getWindowScrollBarX(documentElement, htmlRect)
  ));
  const y7 = htmlRect.top + scroll.scrollTop;
  return {
    x: x11,
    y: y7
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll, true) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x11 = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y7 = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x11 += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x: x11,
    y: y7
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x11 = 0;
  let y7 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x11 = visualViewport.offsetLeft;
      y7 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x11,
    y: y7
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x11 = left * scale.x;
  const y7 = top * scale.y;
  return {
    width,
    height,
    x: x11,
    y: y7
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x11 = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y7 = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x: x11,
    y: y7,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a20, b9) {
  return a20.x === b9.x && a20.y === b9.y && a20.width === b9.width && a20.height === b9.height;
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId2;
  const root = getDocumentElement(element);
  function cleanup2() {
    var _io;
    clearTimeout(timeoutId2);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup2();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId2 = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e8) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup2;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var detectOverflow2 = detectOverflow;
var offset2 = offset;
var shift2 = shift;
var flip2 = flip;
var size2 = size;
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

// node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
var React2 = __toESM(require_react(), 1);
var import_react76 = __toESM(require_react(), 1);
var ReactDOM = __toESM(require_react_dom(), 1);
var index = typeof document !== "undefined" ? import_react76.useLayoutEffect : import_react76.useEffect;
function deepEqual(a20, b9) {
  if (a20 === b9) {
    return true;
  }
  if (typeof a20 !== typeof b9) {
    return false;
  }
  if (typeof a20 === "function" && a20.toString() === b9.toString()) {
    return true;
  }
  let length;
  let i15;
  let keys;
  if (a20 && b9 && typeof a20 === "object") {
    if (Array.isArray(a20)) {
      length = a20.length;
      if (length !== b9.length) return false;
      for (i15 = length; i15-- !== 0; ) {
        if (!deepEqual(a20[i15], b9[i15])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a20);
    length = keys.length;
    if (length !== Object.keys(b9).length) {
      return false;
    }
    for (i15 = length; i15-- !== 0; ) {
      if (!{}.hasOwnProperty.call(b9, keys[i15])) {
        return false;
      }
    }
    for (i15 = length; i15-- !== 0; ) {
      const key = keys[i15];
      if (key === "_owner" && a20.$$typeof) {
        continue;
      }
      if (!deepEqual(a20[key], b9[key])) {
        return false;
      }
    }
    return true;
  }
  return a20 !== a20 && b9 !== b9;
}
function getDPR(element) {
  if (typeof window === "undefined") {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function useLatestRef(value) {
  const ref = React2.useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2,
    elements: {
      reference: externalReference,
      floating: externalFloating
    } = {},
    transform = true,
    whileElementsMounted,
    open
  } = options;
  const [data, setData] = React2.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  });
  const [latestMiddleware, setLatestMiddleware] = React2.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const [_reference, _setReference] = React2.useState(null);
  const [_floating, _setFloating] = React2.useState(null);
  const setReference = React2.useCallback((node) => {
    if (node !== referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);
  const setFloating = React2.useCallback((node) => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const referenceRef = React2.useRef(null);
  const floatingRef = React2.useRef(null);
  const dataRef = React2.useRef(data);
  const hasWhileElementsMounted = whileElementsMounted != null;
  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const platformRef = useLatestRef(platform2);
  const openRef = useLatestRef(open);
  const update = React2.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware
    };
    if (platformRef.current) {
      config.platform = platformRef.current;
    }
    computePosition2(referenceRef.current, floatingRef.current, config).then((data2) => {
      const fullData = {
        ...data2,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: openRef.current !== false
      };
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData;
        ReactDOM.flushSync(() => {
          setData(fullData);
        });
      }
    });
  }, [latestMiddleware, placement, strategy, platformRef, openRef]);
  index(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData((data2) => ({
        ...data2,
        isPositioned: false
      }));
    }
  }, [open]);
  const isMountedRef = React2.useRef(false);
  index(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index(() => {
    if (referenceEl) referenceRef.current = referenceEl;
    if (floatingEl) floatingRef.current = floatingEl;
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(referenceEl, floatingEl, update);
      }
      update();
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
  const refs = React2.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating
  }), [setReference, setFloating]);
  const elements = React2.useMemo(() => ({
    reference: referenceEl,
    floating: floatingEl
  }), [referenceEl, floatingEl]);
  const floatingStyles = React2.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0
    };
    if (!elements.floating) {
      return initialStyles;
    }
    const x11 = roundByDPR(elements.floating, data.x);
    const y7 = roundByDPR(elements.floating, data.y);
    if (transform) {
      return {
        ...initialStyles,
        transform: "translate(" + x11 + "px, " + y7 + "px)",
        ...getDPR(elements.floating) >= 1.5 && {
          willChange: "transform"
        }
      };
    }
    return {
      position: strategy,
      left: x11,
      top: y7
    };
  }, [strategy, transform, elements.floating, data.x, data.y]);
  return React2.useMemo(() => ({
    ...data,
    update,
    refs,
    elements,
    floatingStyles
  }), [data, update, refs, elements, floatingStyles]);
}
var offset3 = (options, deps) => ({
  ...offset2(options),
  options: [options, deps]
});
var shift3 = (options, deps) => ({
  ...shift2(options),
  options: [options, deps]
});
var flip3 = (options, deps) => ({
  ...flip2(options),
  options: [options, deps]
});
var size3 = (options, deps) => ({
  ...size2(options),
  options: [options, deps]
});

// node_modules/@floating-ui/react/dist/floating-ui.react.mjs
function useMergeRefs(refs) {
  return React3.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }
    return (value) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(value);
        } else if (ref != null) {
          ref.current = value;
        }
      });
    };
  }, refs);
}
var SafeReact = {
  ...React3
};
var useInsertionEffect = SafeReact.useInsertionEffect;
var useSafeInsertionEffect = useInsertionEffect || ((fn) => fn());
function useEffectEvent(callback) {
  const ref = React3.useRef(() => {
    if (true) {
      throw new Error("Cannot call an event handler while rendering.");
    }
  });
  useSafeInsertionEffect(() => {
    ref.current = callback;
  });
  return React3.useCallback(function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return ref.current == null ? void 0 : ref.current(...args);
  }, []);
}
var ARROW_UP = "ArrowUp";
var ARROW_DOWN = "ArrowDown";
var ARROW_LEFT = "ArrowLeft";
var ARROW_RIGHT = "ArrowRight";
function isDifferentRow(index3, cols, prevRow) {
  return Math.floor(index3 / cols) !== prevRow;
}
function isIndexOutOfBounds(listRef, index3) {
  return index3 < 0 || index3 >= listRef.current.length;
}
function getMinIndex(listRef, disabledIndices) {
  return findNonDisabledIndex(listRef, {
    disabledIndices
  });
}
function getMaxIndex(listRef, disabledIndices) {
  return findNonDisabledIndex(listRef, {
    decrement: true,
    startingIndex: listRef.current.length,
    disabledIndices
  });
}
function findNonDisabledIndex(listRef, _temp) {
  let {
    startingIndex = -1,
    decrement = false,
    disabledIndices,
    amount = 1
  } = _temp === void 0 ? {} : _temp;
  const list = listRef.current;
  let index3 = startingIndex;
  do {
    index3 += decrement ? -amount : amount;
  } while (index3 >= 0 && index3 <= list.length - 1 && isDisabled(list, index3, disabledIndices));
  return index3;
}
function getGridNavigatedIndex(elementsRef, _ref) {
  let {
    event,
    orientation,
    loop,
    rtl,
    cols,
    disabledIndices,
    minIndex,
    maxIndex,
    prevIndex,
    stopEvent: stop = false
  } = _ref;
  let nextIndex = prevIndex;
  if (event.key === ARROW_UP) {
    stop && stopEvent(event);
    if (prevIndex === -1) {
      nextIndex = maxIndex;
    } else {
      nextIndex = findNonDisabledIndex(elementsRef, {
        startingIndex: nextIndex,
        amount: cols,
        decrement: true,
        disabledIndices
      });
      if (loop && (prevIndex - cols < minIndex || nextIndex < 0)) {
        const col = prevIndex % cols;
        const maxCol = maxIndex % cols;
        const offset4 = maxIndex - (maxCol - col);
        if (maxCol === col) {
          nextIndex = maxIndex;
        } else {
          nextIndex = maxCol > col ? offset4 : offset4 - cols;
        }
      }
    }
    if (isIndexOutOfBounds(elementsRef, nextIndex)) {
      nextIndex = prevIndex;
    }
  }
  if (event.key === ARROW_DOWN) {
    stop && stopEvent(event);
    if (prevIndex === -1) {
      nextIndex = minIndex;
    } else {
      nextIndex = findNonDisabledIndex(elementsRef, {
        startingIndex: prevIndex,
        amount: cols,
        disabledIndices
      });
      if (loop && prevIndex + cols > maxIndex) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex % cols - cols,
          amount: cols,
          disabledIndices
        });
      }
    }
    if (isIndexOutOfBounds(elementsRef, nextIndex)) {
      nextIndex = prevIndex;
    }
  }
  if (orientation === "both") {
    const prevRow = floor(prevIndex / cols);
    if (event.key === (rtl ? ARROW_LEFT : ARROW_RIGHT)) {
      stop && stopEvent(event);
      if (prevIndex % cols !== cols - 1) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex,
          disabledIndices
        });
        if (loop && isDifferentRow(nextIndex, cols, prevRow)) {
          nextIndex = findNonDisabledIndex(elementsRef, {
            startingIndex: prevIndex - prevIndex % cols - 1,
            disabledIndices
          });
        }
      } else if (loop) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex - prevIndex % cols - 1,
          disabledIndices
        });
      }
      if (isDifferentRow(nextIndex, cols, prevRow)) {
        nextIndex = prevIndex;
      }
    }
    if (event.key === (rtl ? ARROW_RIGHT : ARROW_LEFT)) {
      stop && stopEvent(event);
      if (prevIndex % cols !== 0) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex,
          decrement: true,
          disabledIndices
        });
        if (loop && isDifferentRow(nextIndex, cols, prevRow)) {
          nextIndex = findNonDisabledIndex(elementsRef, {
            startingIndex: prevIndex + (cols - prevIndex % cols),
            decrement: true,
            disabledIndices
          });
        }
      } else if (loop) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex + (cols - prevIndex % cols),
          decrement: true,
          disabledIndices
        });
      }
      if (isDifferentRow(nextIndex, cols, prevRow)) {
        nextIndex = prevIndex;
      }
    }
    const lastRow = floor(maxIndex / cols) === prevRow;
    if (isIndexOutOfBounds(elementsRef, nextIndex)) {
      if (loop && lastRow) {
        nextIndex = event.key === (rtl ? ARROW_RIGHT : ARROW_LEFT) ? maxIndex : findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex - prevIndex % cols - 1,
          disabledIndices
        });
      } else {
        nextIndex = prevIndex;
      }
    }
  }
  return nextIndex;
}
function buildCellMap(sizes, cols, dense) {
  const cellMap = [];
  let startIndex = 0;
  sizes.forEach((_ref2, index3) => {
    let {
      width,
      height
    } = _ref2;
    if (width > cols) {
      if (true) {
        throw new Error("[Floating UI]: Invalid grid - item width at index " + index3 + " is greater than grid columns");
      }
    }
    let itemPlaced = false;
    if (dense) {
      startIndex = 0;
    }
    while (!itemPlaced) {
      const targetCells = [];
      for (let i15 = 0; i15 < width; i15++) {
        for (let j9 = 0; j9 < height; j9++) {
          targetCells.push(startIndex + i15 + j9 * cols);
        }
      }
      if (startIndex % cols + width <= cols && targetCells.every((cell) => cellMap[cell] == null)) {
        targetCells.forEach((cell) => {
          cellMap[cell] = index3;
        });
        itemPlaced = true;
      } else {
        startIndex++;
      }
    }
  });
  return [...cellMap];
}
function getCellIndexOfCorner(index3, sizes, cellMap, cols, corner) {
  if (index3 === -1) return -1;
  const firstCellIndex = cellMap.indexOf(index3);
  const sizeItem = sizes[index3];
  switch (corner) {
    case "tl":
      return firstCellIndex;
    case "tr":
      if (!sizeItem) {
        return firstCellIndex;
      }
      return firstCellIndex + sizeItem.width - 1;
    case "bl":
      if (!sizeItem) {
        return firstCellIndex;
      }
      return firstCellIndex + (sizeItem.height - 1) * cols;
    case "br":
      return cellMap.lastIndexOf(index3);
  }
}
function getCellIndices(indices, cellMap) {
  return cellMap.flatMap((index3, cellIndex) => indices.includes(index3) ? [cellIndex] : []);
}
function isDisabled(list, index3, disabledIndices) {
  if (disabledIndices) {
    return disabledIndices.includes(index3);
  }
  const element = list[index3];
  return element == null || element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true";
}
var index2 = typeof document !== "undefined" ? import_react77.useLayoutEffect : import_react77.useEffect;
function sortByDocumentPosition(a20, b9) {
  const position = a20.compareDocumentPosition(b9);
  if (position & Node.DOCUMENT_POSITION_FOLLOWING || position & Node.DOCUMENT_POSITION_CONTAINED_BY) {
    return -1;
  }
  if (position & Node.DOCUMENT_POSITION_PRECEDING || position & Node.DOCUMENT_POSITION_CONTAINS) {
    return 1;
  }
  return 0;
}
function areMapsEqual(map1, map2) {
  if (map1.size !== map2.size) {
    return false;
  }
  for (const [key, value] of map1.entries()) {
    if (value !== map2.get(key)) {
      return false;
    }
  }
  return true;
}
var FloatingListContext = React3.createContext({
  register: () => {
  },
  unregister: () => {
  },
  map: /* @__PURE__ */ new Map(),
  elementsRef: {
    current: []
  }
});
function FloatingList(props) {
  const {
    children,
    elementsRef,
    labelsRef
  } = props;
  const [map, setMap] = React3.useState(() => /* @__PURE__ */ new Map());
  const register = React3.useCallback((node) => {
    setMap((prevMap) => new Map(prevMap).set(node, null));
  }, []);
  const unregister = React3.useCallback((node) => {
    setMap((prevMap) => {
      const map2 = new Map(prevMap);
      map2.delete(node);
      return map2;
    });
  }, []);
  index2(() => {
    const newMap = new Map(map);
    const nodes = Array.from(newMap.keys()).sort(sortByDocumentPosition);
    nodes.forEach((node, index3) => {
      newMap.set(node, index3);
    });
    if (!areMapsEqual(map, newMap)) {
      setMap(newMap);
    }
  }, [map]);
  return React3.createElement(FloatingListContext.Provider, {
    value: React3.useMemo(() => ({
      register,
      unregister,
      map,
      elementsRef,
      labelsRef
    }), [register, unregister, map, elementsRef, labelsRef])
  }, children);
}
function useListItem(props) {
  if (props === void 0) {
    props = {};
  }
  const {
    label
  } = props;
  const {
    register,
    unregister,
    map,
    elementsRef,
    labelsRef
  } = React3.useContext(FloatingListContext);
  const [index$1, setIndex] = React3.useState(null);
  const componentRef = React3.useRef(null);
  const ref = React3.useCallback((node) => {
    componentRef.current = node;
    if (index$1 !== null) {
      elementsRef.current[index$1] = node;
      if (labelsRef) {
        var _node$textContent;
        const isLabelDefined = label !== void 0;
        labelsRef.current[index$1] = isLabelDefined ? label : (_node$textContent = node == null ? void 0 : node.textContent) != null ? _node$textContent : null;
      }
    }
  }, [index$1, elementsRef, labelsRef, label]);
  index2(() => {
    const node = componentRef.current;
    if (node) {
      register(node);
      return () => {
        unregister(node);
      };
    }
  }, [register, unregister]);
  index2(() => {
    const index3 = componentRef.current ? map.get(componentRef.current) : null;
    if (index3 != null) {
      setIndex(index3);
    }
  }, [map]);
  return React3.useMemo(() => ({
    ref,
    index: index$1 == null ? -1 : index$1
  }), [index$1, ref]);
}
function renderJsx(render, computedProps) {
  if (typeof render === "function") {
    return render(computedProps);
  }
  if (render) {
    return React3.cloneElement(render, computedProps);
  }
  return React3.createElement("div", computedProps);
}
var CompositeContext = React3.createContext({
  activeIndex: 0,
  onNavigate: () => {
  }
});
var horizontalKeys = [ARROW_LEFT, ARROW_RIGHT];
var verticalKeys = [ARROW_UP, ARROW_DOWN];
var allKeys = [...horizontalKeys, ...verticalKeys];
var Composite = React3.forwardRef(function Composite2(props, forwardedRef) {
  const {
    render,
    orientation = "both",
    loop = true,
    rtl = false,
    cols = 1,
    disabledIndices,
    activeIndex: externalActiveIndex,
    onNavigate: externalSetActiveIndex,
    itemSizes,
    dense = false,
    ...domProps
  } = props;
  const [internalActiveIndex, internalSetActiveIndex] = React3.useState(0);
  const activeIndex = externalActiveIndex != null ? externalActiveIndex : internalActiveIndex;
  const onNavigate = useEffectEvent(externalSetActiveIndex != null ? externalSetActiveIndex : internalSetActiveIndex);
  const elementsRef = React3.useRef([]);
  const renderElementProps = render && typeof render !== "function" ? render.props : {};
  const contextValue = React3.useMemo(() => ({
    activeIndex,
    onNavigate
  }), [activeIndex, onNavigate]);
  const isGrid = cols > 1;
  function handleKeyDown(event) {
    if (!allKeys.includes(event.key)) return;
    let nextIndex = activeIndex;
    const minIndex = getMinIndex(elementsRef, disabledIndices);
    const maxIndex = getMaxIndex(elementsRef, disabledIndices);
    const horizontalEndKey = rtl ? ARROW_LEFT : ARROW_RIGHT;
    const horizontalStartKey = rtl ? ARROW_RIGHT : ARROW_LEFT;
    if (isGrid) {
      const sizes = itemSizes || Array.from({
        length: elementsRef.current.length
      }, () => ({
        width: 1,
        height: 1
      }));
      const cellMap = buildCellMap(sizes, cols, dense);
      const minGridIndex = cellMap.findIndex((index3) => index3 != null && !isDisabled(elementsRef.current, index3, disabledIndices));
      const maxGridIndex = cellMap.reduce((foundIndex, index3, cellIndex) => index3 != null && !isDisabled(elementsRef.current, index3, disabledIndices) ? cellIndex : foundIndex, -1);
      const maybeNextIndex = cellMap[getGridNavigatedIndex({
        current: cellMap.map((itemIndex) => itemIndex ? elementsRef.current[itemIndex] : null)
      }, {
        event,
        orientation,
        loop,
        rtl,
        cols,
        // treat undefined (empty grid spaces) as disabled indices so we
        // don't end up in them
        disabledIndices: getCellIndices([...disabledIndices || elementsRef.current.map((_8, index3) => isDisabled(elementsRef.current, index3) ? index3 : void 0), void 0], cellMap),
        minIndex: minGridIndex,
        maxIndex: maxGridIndex,
        prevIndex: getCellIndexOfCorner(
          activeIndex > maxIndex ? minIndex : activeIndex,
          sizes,
          cellMap,
          cols,
          // use a corner matching the edge closest to the direction we're
          // moving in so we don't end up in the same item. Prefer
          // top/left over bottom/right.
          event.key === ARROW_DOWN ? "bl" : event.key === horizontalEndKey ? "tr" : "tl"
        )
      })];
      if (maybeNextIndex != null) {
        nextIndex = maybeNextIndex;
      }
    }
    const toEndKeys = {
      horizontal: [horizontalEndKey],
      vertical: [ARROW_DOWN],
      both: [horizontalEndKey, ARROW_DOWN]
    }[orientation];
    const toStartKeys = {
      horizontal: [horizontalStartKey],
      vertical: [ARROW_UP],
      both: [horizontalStartKey, ARROW_UP]
    }[orientation];
    const preventedKeys = isGrid ? allKeys : {
      horizontal: horizontalKeys,
      vertical: verticalKeys,
      both: allKeys
    }[orientation];
    if (nextIndex === activeIndex && [...toEndKeys, ...toStartKeys].includes(event.key)) {
      if (loop && nextIndex === maxIndex && toEndKeys.includes(event.key)) {
        nextIndex = minIndex;
      } else if (loop && nextIndex === minIndex && toStartKeys.includes(event.key)) {
        nextIndex = maxIndex;
      } else {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: nextIndex,
          decrement: toStartKeys.includes(event.key),
          disabledIndices
        });
      }
    }
    if (nextIndex !== activeIndex && !isIndexOutOfBounds(elementsRef, nextIndex)) {
      var _elementsRef$current$;
      event.stopPropagation();
      if (preventedKeys.includes(event.key)) {
        event.preventDefault();
      }
      onNavigate(nextIndex);
      (_elementsRef$current$ = elementsRef.current[nextIndex]) == null || _elementsRef$current$.focus();
    }
  }
  const computedProps = {
    ...domProps,
    ...renderElementProps,
    ref: forwardedRef,
    "aria-orientation": orientation === "both" ? void 0 : orientation,
    onKeyDown(e8) {
      domProps.onKeyDown == null || domProps.onKeyDown(e8);
      renderElementProps.onKeyDown == null || renderElementProps.onKeyDown(e8);
      handleKeyDown(e8);
    }
  };
  return React3.createElement(CompositeContext.Provider, {
    value: contextValue
  }, React3.createElement(FloatingList, {
    elementsRef
  }, renderJsx(render, computedProps)));
});
var CompositeItem = React3.forwardRef(function CompositeItem2(props, forwardedRef) {
  const {
    render,
    ...domProps
  } = props;
  const renderElementProps = render && typeof render !== "function" ? render.props : {};
  const {
    activeIndex,
    onNavigate
  } = React3.useContext(CompositeContext);
  const {
    ref,
    index: index3
  } = useListItem();
  const mergedRef = useMergeRefs([ref, forwardedRef, renderElementProps.ref]);
  const isActive = activeIndex === index3;
  const computedProps = {
    ...domProps,
    ...renderElementProps,
    ref: mergedRef,
    tabIndex: isActive ? 0 : -1,
    "data-active": isActive ? "" : void 0,
    onFocus(e8) {
      domProps.onFocus == null || domProps.onFocus(e8);
      renderElementProps.onFocus == null || renderElementProps.onFocus(e8);
      onNavigate(index3);
    }
  };
  return renderJsx(render, computedProps);
});
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i15 = 1; i15 < arguments.length; i15++) {
      var source = arguments[i15];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var serverHandoffComplete = false;
var count = 0;
var genId = () => (
  // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + count++
);
function useFloatingId() {
  const [id, setId] = React3.useState(() => serverHandoffComplete ? genId() : void 0);
  index2(() => {
    if (id == null) {
      setId(genId());
    }
  }, []);
  React3.useEffect(() => {
    serverHandoffComplete = true;
  }, []);
  return id;
}
var useReactId = SafeReact.useId;
var useId = useReactId || useFloatingId;
var devMessageSet;
if (true) {
  devMessageSet = /* @__PURE__ */ new Set();
}
function warn() {
  var _devMessageSet;
  for (var _len = arguments.length, messages = new Array(_len), _key = 0; _key < _len; _key++) {
    messages[_key] = arguments[_key];
  }
  const message = "Floating UI: " + messages.join(" ");
  if (!((_devMessageSet = devMessageSet) != null && _devMessageSet.has(message))) {
    var _devMessageSet2;
    (_devMessageSet2 = devMessageSet) == null || _devMessageSet2.add(message);
    console.warn(message);
  }
}
function error() {
  var _devMessageSet3;
  for (var _len2 = arguments.length, messages = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    messages[_key2] = arguments[_key2];
  }
  const message = "Floating UI: " + messages.join(" ");
  if (!((_devMessageSet3 = devMessageSet) != null && _devMessageSet3.has(message))) {
    var _devMessageSet4;
    (_devMessageSet4 = devMessageSet) == null || _devMessageSet4.add(message);
    console.error(message);
  }
}
var FloatingArrow = React3.forwardRef(function FloatingArrow2(props, ref) {
  const {
    context: {
      placement,
      elements: {
        floating
      },
      middlewareData: {
        arrow: arrow4,
        shift: shift4
      }
    },
    width = 14,
    height = 7,
    tipRadius = 0,
    strokeWidth = 0,
    staticOffset,
    stroke,
    d: d14,
    style: {
      transform,
      ...restStyle
    } = {},
    ...rest
  } = props;
  if (true) {
    if (!ref) {
      warn("The `ref` prop is required for `FloatingArrow`.");
    }
  }
  const clipPathId = useId();
  const [isRTL2, setIsRTL] = React3.useState(false);
  index2(() => {
    if (!floating) return;
    const isRTL3 = getComputedStyle2(floating).direction === "rtl";
    if (isRTL3) {
      setIsRTL(true);
    }
  }, [floating]);
  if (!floating) {
    return null;
  }
  const [side, alignment] = placement.split("-");
  const isVerticalSide = side === "top" || side === "bottom";
  let computedStaticOffset = staticOffset;
  if (isVerticalSide && shift4 != null && shift4.x || !isVerticalSide && shift4 != null && shift4.y) {
    computedStaticOffset = null;
  }
  const computedStrokeWidth = strokeWidth * 2;
  const halfStrokeWidth = computedStrokeWidth / 2;
  const svgX = width / 2 * (tipRadius / -8 + 1);
  const svgY = height / 2 * tipRadius / 4;
  const isCustomShape = !!d14;
  const yOffsetProp = computedStaticOffset && alignment === "end" ? "bottom" : "top";
  let xOffsetProp = computedStaticOffset && alignment === "end" ? "right" : "left";
  if (computedStaticOffset && isRTL2) {
    xOffsetProp = alignment === "end" ? "left" : "right";
  }
  const arrowX = (arrow4 == null ? void 0 : arrow4.x) != null ? computedStaticOffset || arrow4.x : "";
  const arrowY = (arrow4 == null ? void 0 : arrow4.y) != null ? computedStaticOffset || arrow4.y : "";
  const dValue = d14 || "M0,0" + (" H" + width) + (" L" + (width - svgX) + "," + (height - svgY)) + (" Q" + width / 2 + "," + height + " " + svgX + "," + (height - svgY)) + " Z";
  const rotation = {
    top: isCustomShape ? "rotate(180deg)" : "",
    left: isCustomShape ? "rotate(90deg)" : "rotate(-90deg)",
    bottom: isCustomShape ? "" : "rotate(180deg)",
    right: isCustomShape ? "rotate(-90deg)" : "rotate(90deg)"
  }[side];
  return React3.createElement("svg", _extends({}, rest, {
    "aria-hidden": true,
    ref,
    width: isCustomShape ? width : width + computedStrokeWidth,
    height: width,
    viewBox: "0 0 " + width + " " + (height > width ? height : width),
    style: {
      position: "absolute",
      pointerEvents: "none",
      [xOffsetProp]: arrowX,
      [yOffsetProp]: arrowY,
      [side]: isVerticalSide || isCustomShape ? "100%" : "calc(100% - " + computedStrokeWidth / 2 + "px)",
      transform: [rotation, transform].filter((t11) => !!t11).join(" "),
      ...restStyle
    }
  }), computedStrokeWidth > 0 && React3.createElement("path", {
    clipPath: "url(#" + clipPathId + ")",
    fill: "none",
    stroke,
    strokeWidth: computedStrokeWidth + (d14 ? 0 : 1),
    d: dValue
  }), React3.createElement("path", {
    stroke: computedStrokeWidth && !d14 ? rest.fill : "none",
    d: dValue
  }), React3.createElement("clipPath", {
    id: clipPathId
  }, React3.createElement("rect", {
    x: -halfStrokeWidth,
    y: halfStrokeWidth * (isCustomShape ? -1 : 1),
    width: width + computedStrokeWidth,
    height: width
  })));
});
function createPubSub() {
  const map = /* @__PURE__ */ new Map();
  return {
    emit(event, data) {
      var _map$get;
      (_map$get = map.get(event)) == null || _map$get.forEach((handler) => handler(data));
    },
    on(event, listener) {
      map.set(event, [...map.get(event) || [], listener]);
    },
    off(event, listener) {
      var _map$get2;
      map.set(event, ((_map$get2 = map.get(event)) == null ? void 0 : _map$get2.filter((l14) => l14 !== listener)) || []);
    }
  };
}
var FloatingNodeContext = React3.createContext(null);
var FloatingTreeContext = React3.createContext(null);
var useFloatingParentNodeId = () => {
  var _React$useContext;
  return ((_React$useContext = React3.useContext(FloatingNodeContext)) == null ? void 0 : _React$useContext.id) || null;
};
var useFloatingTree = () => React3.useContext(FloatingTreeContext);
function createAttribute(name) {
  return "data-floating-ui-" + name;
}
var safePolygonIdentifier = createAttribute("safe-polygon");
var NOOP = () => {
};
var FloatingDelayGroupContext = React3.createContext({
  delay: 0,
  initialDelay: 0,
  timeoutMs: 0,
  currentId: null,
  setCurrentId: NOOP,
  setState: NOOP,
  isInstantPhase: false
});
var HIDDEN_STYLES = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "fixed",
  whiteSpace: "nowrap",
  width: "1px",
  top: 0,
  left: 0
};
var timeoutId;
function setActiveElementOnTab(event) {
  if (event.key === "Tab") {
    event.target;
    clearTimeout(timeoutId);
  }
}
var FocusGuard = React3.forwardRef(function FocusGuard2(props, ref) {
  const [role, setRole] = React3.useState();
  index2(() => {
    if (isSafari()) {
      setRole("button");
    }
    document.addEventListener("keydown", setActiveElementOnTab);
    return () => {
      document.removeEventListener("keydown", setActiveElementOnTab);
    };
  }, []);
  const restProps = {
    ref,
    tabIndex: 0,
    // Role is only for VoiceOver
    role,
    "aria-hidden": role ? void 0 : true,
    [createAttribute("focus-guard")]: "",
    style: HIDDEN_STYLES
  };
  return React3.createElement("span", _extends({}, props, restProps));
});
var PortalContext = React3.createContext(null);
var attr = createAttribute("portal");
var FOCUSABLE_ATTRIBUTE = "data-floating-ui-focusable";
var VisuallyHiddenDismiss = React3.forwardRef(function VisuallyHiddenDismiss2(props, ref) {
  return React3.createElement("button", _extends({}, props, {
    type: "button",
    ref,
    tabIndex: -1,
    style: HIDDEN_STYLES
  }));
});
var lockCount = 0;
function enableScrollLock() {
  const isIOS = /iP(hone|ad|od)|iOS/.test(getPlatform());
  const bodyStyle = document.body.style;
  const scrollbarX = Math.round(document.documentElement.getBoundingClientRect().left) + document.documentElement.scrollLeft;
  const paddingProp = scrollbarX ? "paddingLeft" : "paddingRight";
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  const scrollX = bodyStyle.left ? parseFloat(bodyStyle.left) : window.scrollX;
  const scrollY = bodyStyle.top ? parseFloat(bodyStyle.top) : window.scrollY;
  bodyStyle.overflow = "hidden";
  if (scrollbarWidth) {
    bodyStyle[paddingProp] = scrollbarWidth + "px";
  }
  if (isIOS) {
    var _window$visualViewpor, _window$visualViewpor2;
    const offsetLeft = ((_window$visualViewpor = window.visualViewport) == null ? void 0 : _window$visualViewpor.offsetLeft) || 0;
    const offsetTop = ((_window$visualViewpor2 = window.visualViewport) == null ? void 0 : _window$visualViewpor2.offsetTop) || 0;
    Object.assign(bodyStyle, {
      position: "fixed",
      top: -(scrollY - Math.floor(offsetTop)) + "px",
      left: -(scrollX - Math.floor(offsetLeft)) + "px",
      right: "0"
    });
  }
  return () => {
    Object.assign(bodyStyle, {
      overflow: "",
      [paddingProp]: ""
    });
    if (isIOS) {
      Object.assign(bodyStyle, {
        position: "",
        top: "",
        left: "",
        right: ""
      });
      window.scrollTo(scrollX, scrollY);
    }
  };
}
var cleanup = () => {
};
var FloatingOverlay = React3.forwardRef(function FloatingOverlay2(props, ref) {
  const {
    lockScroll = false,
    ...rest
  } = props;
  index2(() => {
    if (!lockScroll) return;
    lockCount++;
    if (lockCount === 1) {
      cleanup = enableScrollLock();
    }
    return () => {
      lockCount--;
      if (lockCount === 0) {
        cleanup();
      }
    };
  }, [lockScroll]);
  return React3.createElement("div", _extends({
    ref
  }, rest, {
    style: {
      position: "fixed",
      overflow: "auto",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...rest.style
    }
  }));
});
function useFloatingRootContext(options) {
  const {
    open = false,
    onOpenChange: onOpenChangeProp,
    elements: elementsProp
  } = options;
  const floatingId = useId();
  const dataRef = React3.useRef({});
  const [events] = React3.useState(() => createPubSub());
  const nested = useFloatingParentNodeId() != null;
  if (true) {
    const optionDomReference = elementsProp.reference;
    if (optionDomReference && !isElement(optionDomReference)) {
      error("Cannot pass a virtual element to the `elements.reference` option,", "as it must be a real DOM element. Use `refs.setPositionReference()`", "instead.");
    }
  }
  const [positionReference, setPositionReference] = React3.useState(elementsProp.reference);
  const onOpenChange = useEffectEvent((open2, event, reason) => {
    dataRef.current.openEvent = open2 ? event : void 0;
    events.emit("openchange", {
      open: open2,
      event,
      reason,
      nested
    });
    onOpenChangeProp == null || onOpenChangeProp(open2, event, reason);
  });
  const refs = React3.useMemo(() => ({
    setPositionReference
  }), []);
  const elements = React3.useMemo(() => ({
    reference: positionReference || elementsProp.reference || null,
    floating: elementsProp.floating || null,
    domReference: elementsProp.reference
  }), [positionReference, elementsProp.reference, elementsProp.floating]);
  return React3.useMemo(() => ({
    dataRef,
    open,
    onOpenChange,
    elements,
    events,
    floatingId,
    refs
  }), [open, onOpenChange, elements, events, floatingId, refs]);
}
function useFloating2(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    nodeId
  } = options;
  const internalRootContext = useFloatingRootContext({
    ...options,
    elements: {
      reference: null,
      floating: null,
      ...options.elements
    }
  });
  const rootContext = options.rootContext || internalRootContext;
  const computedElements = rootContext.elements;
  const [_domReference, setDomReference] = React3.useState(null);
  const [positionReference, _setPositionReference] = React3.useState(null);
  const optionDomReference = computedElements == null ? void 0 : computedElements.domReference;
  const domReference = optionDomReference || _domReference;
  const domReferenceRef = React3.useRef(null);
  const tree = useFloatingTree();
  index2(() => {
    if (domReference) {
      domReferenceRef.current = domReference;
    }
  }, [domReference]);
  const position = useFloating({
    ...options,
    elements: {
      ...computedElements,
      ...positionReference && {
        reference: positionReference
      }
    }
  });
  const setPositionReference = React3.useCallback((node) => {
    const computedPositionReference = isElement(node) ? {
      getBoundingClientRect: () => node.getBoundingClientRect(),
      contextElement: node
    } : node;
    _setPositionReference(computedPositionReference);
    position.refs.setReference(computedPositionReference);
  }, [position.refs]);
  const setReference = React3.useCallback((node) => {
    if (isElement(node) || node === null) {
      domReferenceRef.current = node;
      setDomReference(node);
    }
    if (isElement(position.refs.reference.current) || position.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    node !== null && !isElement(node)) {
      position.refs.setReference(node);
    }
  }, [position.refs]);
  const refs = React3.useMemo(() => ({
    ...position.refs,
    setReference,
    setPositionReference,
    domReference: domReferenceRef
  }), [position.refs, setReference, setPositionReference]);
  const elements = React3.useMemo(() => ({
    ...position.elements,
    domReference
  }), [position.elements, domReference]);
  const context = React3.useMemo(() => ({
    ...position,
    ...rootContext,
    refs,
    elements,
    nodeId
  }), [position, refs, elements, nodeId, rootContext]);
  index2(() => {
    rootContext.dataRef.current.floatingContext = context;
    const node = tree == null ? void 0 : tree.nodesRef.current.find((node2) => node2.id === nodeId);
    if (node) {
      node.context = context;
    }
  });
  return React3.useMemo(() => ({
    ...position,
    context,
    refs,
    elements
  }), [position, refs, elements, context]);
}
var ACTIVE_KEY = "active";
var SELECTED_KEY = "selected";
function mergeProps(userProps, propsList, elementKey) {
  const map = /* @__PURE__ */ new Map();
  const isItem = elementKey === "item";
  let domUserProps = userProps;
  if (isItem && userProps) {
    const {
      [ACTIVE_KEY]: _8,
      [SELECTED_KEY]: __,
      ...validProps
    } = userProps;
    domUserProps = validProps;
  }
  return {
    ...elementKey === "floating" && {
      tabIndex: -1,
      [FOCUSABLE_ATTRIBUTE]: ""
    },
    ...domUserProps,
    ...propsList.map((value) => {
      const propsOrGetProps = value ? value[elementKey] : null;
      if (typeof propsOrGetProps === "function") {
        return userProps ? propsOrGetProps(userProps) : null;
      }
      return propsOrGetProps;
    }).concat(userProps).reduce((acc, props) => {
      if (!props) {
        return acc;
      }
      Object.entries(props).forEach((_ref) => {
        let [key, value] = _ref;
        if (isItem && [ACTIVE_KEY, SELECTED_KEY].includes(key)) {
          return;
        }
        if (key.indexOf("on") === 0) {
          if (!map.has(key)) {
            map.set(key, []);
          }
          if (typeof value === "function") {
            var _map$get;
            (_map$get = map.get(key)) == null || _map$get.push(value);
            acc[key] = function() {
              var _map$get2;
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }
              return (_map$get2 = map.get(key)) == null ? void 0 : _map$get2.map((fn) => fn(...args)).find((val) => val !== void 0);
            };
          }
        } else {
          acc[key] = value;
        }
      });
      return acc;
    }, {})
  };
}
function useInteractions(propsList) {
  if (propsList === void 0) {
    propsList = [];
  }
  const referenceDeps = propsList.map((key) => key == null ? void 0 : key.reference);
  const floatingDeps = propsList.map((key) => key == null ? void 0 : key.floating);
  const itemDeps = propsList.map((key) => key == null ? void 0 : key.item);
  const getReferenceProps = React3.useCallback(
    (userProps) => mergeProps(userProps, propsList, "reference"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    referenceDeps
  );
  const getFloatingProps = React3.useCallback(
    (userProps) => mergeProps(userProps, propsList, "floating"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    floatingDeps
  );
  const getItemProps = React3.useCallback(
    (userProps) => mergeProps(userProps, propsList, "item"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    itemDeps
  );
  return React3.useMemo(() => ({
    getReferenceProps,
    getFloatingProps,
    getItemProps
  }), [getReferenceProps, getFloatingProps, getItemProps]);
}
function getArgsWithCustomFloatingHeight(state, height) {
  return {
    ...state,
    rects: {
      ...state.rects,
      floating: {
        ...state.rects.floating,
        height
      }
    }
  };
}
var inner = (props) => ({
  name: "inner",
  options: props,
  async fn(state) {
    const {
      listRef,
      overflowRef,
      onFallbackChange,
      offset: innerOffset = 0,
      index: index3 = 0,
      minItemsVisible = 4,
      referenceOverflowThreshold = 0,
      scrollRef,
      ...detectOverflowOptions
    } = evaluate(props, state);
    const {
      rects,
      elements: {
        floating
      }
    } = state;
    const item = listRef.current[index3];
    const scrollEl = (scrollRef == null ? void 0 : scrollRef.current) || floating;
    const clientTop = floating.clientTop || scrollEl.clientTop;
    const floatingIsBordered = floating.clientTop !== 0;
    const scrollElIsBordered = scrollEl.clientTop !== 0;
    const floatingIsScrollEl = floating === scrollEl;
    if (true) {
      if (!state.placement.startsWith("bottom")) {
        warn('`placement` side must be "bottom" when using the `inner`', "middleware.");
      }
    }
    if (!item) {
      return {};
    }
    const nextArgs = {
      ...state,
      ...await offset3(-item.offsetTop - floating.clientTop - rects.reference.height / 2 - item.offsetHeight / 2 - innerOffset).fn(state)
    };
    const overflow = await detectOverflow2(getArgsWithCustomFloatingHeight(nextArgs, scrollEl.scrollHeight + clientTop + floating.clientTop), detectOverflowOptions);
    const refOverflow = await detectOverflow2(nextArgs, {
      ...detectOverflowOptions,
      elementContext: "reference"
    });
    const diffY = max(0, overflow.top);
    const nextY = nextArgs.y + diffY;
    const isScrollable = scrollEl.scrollHeight > scrollEl.clientHeight;
    const rounder = isScrollable ? (v3) => v3 : round;
    const maxHeight = rounder(max(0, scrollEl.scrollHeight + (floatingIsBordered && floatingIsScrollEl || scrollElIsBordered ? clientTop * 2 : 0) - diffY - max(0, overflow.bottom)));
    scrollEl.style.maxHeight = maxHeight + "px";
    scrollEl.scrollTop = diffY;
    if (onFallbackChange) {
      const shouldFallback = scrollEl.offsetHeight < item.offsetHeight * min(minItemsVisible, listRef.current.length) - 1 || refOverflow.top >= -referenceOverflowThreshold || refOverflow.bottom >= -referenceOverflowThreshold;
      ReactDOM2.flushSync(() => onFallbackChange(shouldFallback));
    }
    if (overflowRef) {
      overflowRef.current = await detectOverflow2(getArgsWithCustomFloatingHeight({
        ...nextArgs,
        y: nextY
      }, scrollEl.offsetHeight + clientTop + floating.clientTop), detectOverflowOptions);
    }
    return {
      y: nextY
    };
  }
});
function useInnerOffset(context, props) {
  const {
    open,
    elements
  } = context;
  const {
    enabled = true,
    overflowRef,
    scrollRef,
    onChange: unstable_onChange
  } = props;
  const onChange = useEffectEvent(unstable_onChange);
  const controlledScrollingRef = React3.useRef(false);
  const prevScrollTopRef = React3.useRef(null);
  const initialOverflowRef = React3.useRef(null);
  React3.useEffect(() => {
    if (!enabled) return;
    function onWheel(e8) {
      if (e8.ctrlKey || !el || overflowRef.current == null) {
        return;
      }
      const dY = e8.deltaY;
      const isAtTop = overflowRef.current.top >= -0.5;
      const isAtBottom = overflowRef.current.bottom >= -0.5;
      const remainingScroll = el.scrollHeight - el.clientHeight;
      const sign = dY < 0 ? -1 : 1;
      const method = dY < 0 ? "max" : "min";
      if (el.scrollHeight <= el.clientHeight) {
        return;
      }
      if (!isAtTop && dY > 0 || !isAtBottom && dY < 0) {
        e8.preventDefault();
        ReactDOM2.flushSync(() => {
          onChange((d14) => d14 + Math[method](dY, remainingScroll * sign));
        });
      } else if (/firefox/i.test(getUserAgent())) {
        el.scrollTop += dY;
      }
    }
    const el = (scrollRef == null ? void 0 : scrollRef.current) || elements.floating;
    if (open && el) {
      el.addEventListener("wheel", onWheel);
      requestAnimationFrame(() => {
        prevScrollTopRef.current = el.scrollTop;
        if (overflowRef.current != null) {
          initialOverflowRef.current = {
            ...overflowRef.current
          };
        }
      });
      return () => {
        prevScrollTopRef.current = null;
        initialOverflowRef.current = null;
        el.removeEventListener("wheel", onWheel);
      };
    }
  }, [enabled, open, elements.floating, overflowRef, scrollRef, onChange]);
  const floating = React3.useMemo(() => ({
    onKeyDown() {
      controlledScrollingRef.current = true;
    },
    onWheel() {
      controlledScrollingRef.current = false;
    },
    onPointerMove() {
      controlledScrollingRef.current = false;
    },
    onScroll() {
      const el = (scrollRef == null ? void 0 : scrollRef.current) || elements.floating;
      if (!overflowRef.current || !el || !controlledScrollingRef.current) {
        return;
      }
      if (prevScrollTopRef.current !== null) {
        const scrollDiff = el.scrollTop - prevScrollTopRef.current;
        if (overflowRef.current.bottom < -0.5 && scrollDiff < -1 || overflowRef.current.top < -0.5 && scrollDiff > 1) {
          ReactDOM2.flushSync(() => onChange((d14) => d14 + scrollDiff));
        }
      }
      requestAnimationFrame(() => {
        prevScrollTopRef.current = el.scrollTop;
      });
    }
  }), [elements.floating, onChange, overflowRef, scrollRef]);
  return React3.useMemo(() => enabled ? {
    floating
  } : {}, [enabled, floating]);
}

// node_modules/@headlessui/react/dist/internal/floating.js
var j5 = __toESM(require_react(), 1);
var import_react79 = __toESM(require_react(), 1);
var y5 = (0, import_react79.createContext)({ styles: void 0, setReference: () => {
}, setFloating: () => {
}, getReferenceProps: () => ({}), getFloatingProps: () => ({}), slot: {} });
y5.displayName = "FloatingContext";
var H6 = (0, import_react79.createContext)(null);
H6.displayName = "PlacementContext";
function xe(e8) {
  return (0, import_react79.useMemo)(() => e8 ? typeof e8 == "string" ? { to: e8 } : e8 : null, [e8]);
}
function ye() {
  return (0, import_react79.useContext)(y5).setReference;
}
function Fe2() {
  return (0, import_react79.useContext)(y5).getReferenceProps;
}
function be() {
  let { getFloatingProps: e8, slot: t11 } = (0, import_react79.useContext)(y5);
  return (0, import_react79.useCallback)((...n13) => Object.assign({}, e8(...n13), { "data-anchor": t11.anchor }), [e8, t11]);
}
function Re(e8 = null) {
  e8 === false && (e8 = null), typeof e8 == "string" && (e8 = { to: e8 });
  let t11 = (0, import_react79.useContext)(H6), n13 = (0, import_react79.useMemo)(() => e8, [JSON.stringify(e8, (r17, o18) => {
    var u16;
    return (u16 = o18 == null ? void 0 : o18.outerHTML) != null ? u16 : o18;
  })]);
  n(() => {
    t11 == null || t11(n13 != null ? n13 : null);
  }, [t11, n13]);
  let l14 = (0, import_react79.useContext)(y5);
  return (0, import_react79.useMemo)(() => [l14.setFloating, e8 ? l14.styles : {}], [l14.setFloating, e8, l14.styles]);
}
var q = 4;
function Me({ children: e8, enabled: t11 = true }) {
  let [n13, l14] = (0, import_react79.useState)(null), [r17, o18] = (0, import_react79.useState)(0), u16 = (0, import_react79.useRef)(null), [f21, s13] = (0, import_react79.useState)(null);
  pe2(f21);
  let i15 = t11 && n13 !== null && f21 !== null, { to: F6 = "bottom", gap: E13 = 0, offset: v3 = 0, padding: c15 = 0, inner: P7 } = ce(n13, f21), [a20, p6 = "center"] = F6.split(" ");
  n(() => {
    i15 && o18(0);
  }, [i15]);
  let { refs: b9, floatingStyles: w11, context: g6 } = useFloating2({ open: i15, placement: a20 === "selection" ? p6 === "center" ? "bottom" : `bottom-${p6}` : p6 === "center" ? `${a20}` : `${a20}-${p6}`, strategy: "absolute", transform: false, middleware: [offset3({ mainAxis: a20 === "selection" ? 0 : E13, crossAxis: v3 }), shift3({ padding: c15 }), a20 !== "selection" && flip3({ padding: c15 }), a20 === "selection" && P7 ? inner({ ...P7, padding: c15, overflowRef: u16, offset: r17, minItemsVisible: q, referenceOverflowThreshold: c15, onFallbackChange(h8) {
    var O8, W4;
    if (!h8) return;
    let d14 = g6.elements.floating;
    if (!d14) return;
    let T10 = parseFloat(getComputedStyle(d14).scrollPaddingBottom) || 0, $5 = Math.min(q, d14.childElementCount), L6 = 0, N4 = 0;
    for (let m10 of (W4 = (O8 = g6.elements.floating) == null ? void 0 : O8.childNodes) != null ? W4 : []) if (m10 instanceof HTMLElement) {
      let x11 = m10.offsetTop, k5 = x11 + m10.clientHeight + T10, S6 = d14.scrollTop, U7 = S6 + d14.clientHeight;
      if (x11 >= S6 && k5 <= U7) $5--;
      else {
        N4 = Math.max(0, Math.min(k5, U7) - Math.max(x11, S6)), L6 = m10.clientHeight;
        break;
      }
    }
    $5 >= 1 && o18((m10) => {
      let x11 = L6 * $5 - N4 + T10;
      return m10 >= x11 ? m10 : x11;
    });
  } }) : null, size3({ padding: c15, apply({ availableWidth: h8, availableHeight: d14, elements: T10 }) {
    Object.assign(T10.floating.style, { overflow: "auto", maxWidth: `${h8}px`, maxHeight: `min(var(--anchor-max-height, 100vh), ${d14}px)` });
  } })].filter(Boolean), whileElementsMounted: autoUpdate }), [I6 = a20, B5 = p6] = g6.placement.split("-");
  a20 === "selection" && (I6 = "selection");
  let G7 = (0, import_react79.useMemo)(() => ({ anchor: [I6, B5].filter(Boolean).join(" ") }), [I6, B5]), K4 = useInnerOffset(g6, { overflowRef: u16, onChange: o18 }), { getReferenceProps: Q4, getFloatingProps: X5 } = useInteractions([K4]), Y5 = o5((h8) => {
    s13(h8), b9.setFloating(h8);
  });
  return j5.createElement(H6.Provider, { value: l14 }, j5.createElement(y5.Provider, { value: { setFloating: Y5, setReference: b9.setReference, styles: w11, getReferenceProps: Q4, getFloatingProps: X5, slot: G7 } }, e8));
}
function pe2(e8) {
  n(() => {
    if (!e8) return;
    let t11 = new MutationObserver(() => {
      let n13 = window.getComputedStyle(e8).maxHeight, l14 = parseFloat(n13);
      if (isNaN(l14)) return;
      let r17 = parseInt(n13);
      isNaN(r17) || l14 !== r17 && (e8.style.maxHeight = `${Math.ceil(l14)}px`);
    });
    return t11.observe(e8, { attributes: true, attributeFilter: ["style"] }), () => {
      t11.disconnect();
    };
  }, [e8]);
}
function ce(e8, t11) {
  var o18, u16, f21;
  let n13 = V((o18 = e8 == null ? void 0 : e8.gap) != null ? o18 : "var(--anchor-gap, 0)", t11), l14 = V((u16 = e8 == null ? void 0 : e8.offset) != null ? u16 : "var(--anchor-offset, 0)", t11), r17 = V((f21 = e8 == null ? void 0 : e8.padding) != null ? f21 : "var(--anchor-padding, 0)", t11);
  return { ...e8, gap: n13, offset: l14, padding: r17 };
}
function V(e8, t11, n13 = void 0) {
  let l14 = p(), r17 = o5((s13, i15) => {
    if (s13 == null) return [n13, null];
    if (typeof s13 == "number") return [s13, null];
    if (typeof s13 == "string") {
      if (!i15) return [n13, null];
      let F6 = J2(s13, i15);
      return [F6, (E13) => {
        let v3 = D2(s13);
        {
          let c15 = v3.map((P7) => window.getComputedStyle(i15).getPropertyValue(P7));
          l14.requestAnimationFrame(function P7() {
            l14.nextFrame(P7);
            let a20 = false;
            for (let [b9, w11] of v3.entries()) {
              let g6 = window.getComputedStyle(i15).getPropertyValue(w11);
              if (c15[b9] !== g6) {
                c15[b9] = g6, a20 = true;
                break;
              }
            }
            if (!a20) return;
            let p6 = J2(s13, i15);
            F6 !== p6 && (E13(p6), F6 = p6);
          });
        }
        return l14.dispose;
      }];
    }
    return [n13, null];
  }), o18 = (0, import_react79.useMemo)(() => r17(e8, t11)[0], [e8, t11]), [u16 = o18, f21] = (0, import_react79.useState)();
  return n(() => {
    let [s13, i15] = r17(e8, t11);
    if (f21(s13), !!i15) return i15(f21);
  }, [e8, t11]), u16;
}
function D2(e8) {
  let t11 = /var\((.*)\)/.exec(e8);
  if (t11) {
    let n13 = t11[1].indexOf(",");
    if (n13 === -1) return [t11[1]];
    let l14 = t11[1].slice(0, n13).trim(), r17 = t11[1].slice(n13 + 1).trim();
    return r17 ? [l14, ...D2(r17)] : [l14];
  }
  return [];
}
function J2(e8, t11) {
  let n13 = document.createElement("div");
  t11.appendChild(n13), n13.style.setProperty("margin-top", "0px", "important"), n13.style.setProperty("margin-top", e8, "important");
  let l14 = parseFloat(window.getComputedStyle(n13).marginTop) || 0;
  return t11.removeChild(n13), l14;
}

// node_modules/@headlessui/react/dist/internal/frozen.js
var import_react80 = __toESM(require_react(), 1);
function f13({ children: o18, freeze: e8 }) {
  let n13 = l7(e8, o18);
  return import_react80.default.createElement(import_react80.default.Fragment, null, n13);
}
function l7(o18, e8) {
  let [n13, t11] = (0, import_react80.useState)(e8);
  return !o18 && n13 !== e8 && t11(e8), o18 ? n13 : e8;
}

// node_modules/@headlessui/react/dist/internal/open-closed.js
var import_react81 = __toESM(require_react(), 1);
var n10 = (0, import_react81.createContext)(null);
n10.displayName = "OpenClosedContext";
var i11 = ((e8) => (e8[e8.Open = 1] = "Open", e8[e8.Closed = 2] = "Closed", e8[e8.Closing = 4] = "Closing", e8[e8.Opening = 8] = "Opening", e8))(i11 || {});
function u12() {
  return (0, import_react81.useContext)(n10);
}
function c8({ value: o18, children: t11 }) {
  return import_react81.default.createElement(n10.Provider, { value: o18 }, t11);
}
function s7({ children: o18 }) {
  return import_react81.default.createElement(n10.Provider, { value: null }, o18);
}

// node_modules/@headlessui/react/dist/utils/document-ready.js
function t7(n13) {
  function e8() {
    document.readyState !== "loading" && (n13(), document.removeEventListener("DOMContentLoaded", e8));
  }
  typeof window != "undefined" && typeof document != "undefined" && (document.addEventListener("DOMContentLoaded", e8), e8());
}

// node_modules/@headlessui/react/dist/utils/active-element-history.js
var r11 = [];
t7(() => {
  function e8(t11) {
    if (!(t11.target instanceof HTMLElement) || t11.target === document.body || r11[0] === t11.target) return;
    let n13 = t11.target;
    n13 = n13.closest(f10), r11.unshift(n13 != null ? n13 : t11.target), r11 = r11.filter((o18) => o18 != null && o18.isConnected), r11.splice(10);
  }
  window.addEventListener("click", e8, { capture: true }), window.addEventListener("mousedown", e8, { capture: true }), window.addEventListener("focus", e8, { capture: true }), document.body.addEventListener("click", e8, { capture: true }), document.body.addEventListener("mousedown", e8, { capture: true }), document.body.addEventListener("focus", e8, { capture: true });
});

// node_modules/@headlessui/react/dist/utils/calculate-active-index.js
function u13(l14) {
  throw new Error("Unexpected object: " + l14);
}
var c9 = ((i15) => (i15[i15.First = 0] = "First", i15[i15.Previous = 1] = "Previous", i15[i15.Next = 2] = "Next", i15[i15.Last = 3] = "Last", i15[i15.Specific = 4] = "Specific", i15[i15.Nothing = 5] = "Nothing", i15))(c9 || {});
function f14(l14, n13) {
  let t11 = n13.resolveItems();
  if (t11.length <= 0) return null;
  let r17 = n13.resolveActiveIndex(), s13 = r17 != null ? r17 : -1;
  switch (l14.focus) {
    case 0: {
      for (let e8 = 0; e8 < t11.length; ++e8) if (!n13.resolveDisabled(t11[e8], e8, t11)) return e8;
      return r17;
    }
    case 1: {
      s13 === -1 && (s13 = t11.length);
      for (let e8 = s13 - 1; e8 >= 0; --e8) if (!n13.resolveDisabled(t11[e8], e8, t11)) return e8;
      return r17;
    }
    case 2: {
      for (let e8 = s13 + 1; e8 < t11.length; ++e8) if (!n13.resolveDisabled(t11[e8], e8, t11)) return e8;
      return r17;
    }
    case 3: {
      for (let e8 = t11.length - 1; e8 >= 0; --e8) if (!n13.resolveDisabled(t11[e8], e8, t11)) return e8;
      return r17;
    }
    case 4: {
      for (let e8 = 0; e8 < t11.length; ++e8) if (n13.resolveId(t11[e8], e8, t11) === l14.id) return e8;
      return r17;
    }
    case 5:
      return null;
    default:
      u13(l14);
  }
}

// node_modules/@headlessui/react/dist/components/mouse.js
var g2 = ((f21) => (f21[f21.Left = 0] = "Left", f21[f21.Right = 2] = "Right", f21))(g2 || {});

// node_modules/@headlessui/react/dist/components/portal/portal.js
var import_react84 = __toESM(require_react(), 1);
var import_react_dom7 = __toESM(require_react_dom(), 1);

// node_modules/@headlessui/react/dist/hooks/use-on-unmount.js
var import_react82 = __toESM(require_react(), 1);
function c10(t11) {
  let r17 = o5(t11), e8 = (0, import_react82.useRef)(false);
  (0, import_react82.useEffect)(() => (e8.current = false, () => {
    e8.current = true, t(() => {
      e8.current && r17();
    });
  }), [r17]);
}

// node_modules/@headlessui/react/dist/hooks/use-server-handoff-complete.js
var t8 = __toESM(require_react(), 1);
function s8() {
  let r17 = typeof document == "undefined";
  return "useSyncExternalStore" in t8 ? ((o18) => o18.useSyncExternalStore)(t8)(() => () => {
  }, () => false, () => !r17) : false;
}
function l9() {
  let r17 = s8(), [e8, n13] = t8.useState(s.isHandoffComplete);
  return e8 && s.isHandoffComplete === false && n13(false), t8.useEffect(() => {
    e8 !== true && n13(true);
  }, [e8]), t8.useEffect(() => s.handoff(), []), r17 ? false : e8;
}

// node_modules/@headlessui/react/dist/internal/portal-force-root.js
var import_react83 = __toESM(require_react(), 1);
var e7 = (0, import_react83.createContext)(false);
function a12() {
  return (0, import_react83.useContext)(e7);
}
function l10(o18) {
  return import_react83.default.createElement(e7.Provider, { value: o18.force }, o18.children);
}

// node_modules/@headlessui/react/dist/components/portal/portal.js
function j6(e8) {
  let l14 = a12(), o18 = (0, import_react84.useContext)(H7), [r17, u16] = (0, import_react84.useState)(() => {
    var i15;
    if (!l14 && o18 !== null) return (i15 = o18.current) != null ? i15 : null;
    if (s.isServer) return null;
    let t11 = e8 == null ? void 0 : e8.getElementById("headlessui-portal-root");
    if (t11) return t11;
    if (e8 === null) return null;
    let a20 = e8.createElement("div");
    return a20.setAttribute("id", "headlessui-portal-root"), e8.body.appendChild(a20);
  });
  return (0, import_react84.useEffect)(() => {
    r17 !== null && (e8 != null && e8.body.contains(r17) || e8 == null || e8.body.appendChild(r17));
  }, [r17, e8]), (0, import_react84.useEffect)(() => {
    l14 || o18 !== null && u16(o18.current);
  }, [o18, u16, l14]), r17;
}
var M3 = import_react84.Fragment;
var I3 = K(function(l14, o18) {
  let { ownerDocument: r17 = null, ...u16 } = l14, t11 = (0, import_react84.useRef)(null), a20 = y(T2((s13) => {
    t11.current = s13;
  }), o18), i15 = n9(t11), f21 = r17 != null ? r17 : i15, p6 = j6(f21), [n13] = (0, import_react84.useState)(() => {
    var s13;
    return s.isServer ? null : (s13 = f21 == null ? void 0 : f21.createElement("div")) != null ? s13 : null;
  }), P7 = (0, import_react84.useContext)(g3), b9 = l9();
  n(() => {
    !p6 || !n13 || p6.contains(n13) || (n13.setAttribute("data-headlessui-portal", ""), p6.appendChild(n13));
  }, [p6, n13]), n(() => {
    if (n13 && P7) return P7.register(n13);
  }, [P7, n13]), c10(() => {
    var s13;
    !p6 || !n13 || (n13 instanceof Node && p6.contains(n13) && p6.removeChild(n13), p6.childNodes.length <= 0 && ((s13 = p6.parentElement) == null || s13.removeChild(p6)));
  });
  let h8 = L();
  return b9 ? !p6 || !n13 ? null : (0, import_react_dom7.createPortal)(h8({ ourProps: { ref: a20 }, theirProps: u16, slot: {}, defaultTag: M3, name: "Portal" }), n13) : null;
});
function J3(e8, l14) {
  let o18 = y(l14), { enabled: r17 = true, ownerDocument: u16, ...t11 } = e8, a20 = L();
  return r17 ? import_react84.default.createElement(I3, { ...t11, ownerDocument: u16, ref: o18 }) : a20({ ourProps: { ref: o18 }, theirProps: t11, slot: {}, defaultTag: M3, name: "Portal" });
}
var X = import_react84.Fragment;
var H7 = (0, import_react84.createContext)(null);
function k3(e8, l14) {
  let { target: o18, ...r17 } = e8, t11 = { ref: y(l14) }, a20 = L();
  return import_react84.default.createElement(H7.Provider, { value: o18 }, a20({ ourProps: t11, theirProps: r17, defaultTag: X, name: "Popover.Group" }));
}
var g3 = (0, import_react84.createContext)(null);
function le() {
  let e8 = (0, import_react84.useContext)(g3), l14 = (0, import_react84.useRef)([]), o18 = o5((t11) => (l14.current.push(t11), e8 && e8.register(t11), () => r17(t11))), r17 = o5((t11) => {
    let a20 = l14.current.indexOf(t11);
    a20 !== -1 && l14.current.splice(a20, 1), e8 && e8.unregister(t11);
  }), u16 = (0, import_react84.useMemo)(() => ({ register: o18, unregister: r17, portals: l14 }), [o18, r17, l14]);
  return [l14, (0, import_react84.useMemo)(() => function({ children: a20 }) {
    return import_react84.default.createElement(g3.Provider, { value: u16 }, a20);
  }, [u16])];
}
var B = K(J3);
var D3 = K(k3);
var oe = Object.assign(B, { Group: D3 });

// node_modules/@headlessui/react/dist/components/combobox/combobox.js
var Et = ((e8) => (e8[e8.Open = 0] = "Open", e8[e8.Closed = 1] = "Closed", e8))(Et || {});
var St = ((e8) => (e8[e8.Single = 0] = "Single", e8[e8.Multi = 1] = "Multi", e8))(St || {});
var It = ((o18) => (o18[o18.Pointer = 0] = "Pointer", o18[o18.Focus = 1] = "Focus", o18[o18.Other = 2] = "Other", o18))(It || {});
var Pt = ((r17) => (r17[r17.OpenCombobox = 0] = "OpenCombobox", r17[r17.CloseCombobox = 1] = "CloseCombobox", r17[r17.GoToOption = 2] = "GoToOption", r17[r17.SetTyping = 3] = "SetTyping", r17[r17.RegisterOption = 4] = "RegisterOption", r17[r17.UnregisterOption = 5] = "UnregisterOption", r17[r17.SetActivationTrigger = 6] = "SetActivationTrigger", r17[r17.UpdateVirtualConfiguration = 7] = "UpdateVirtualConfiguration", r17[r17.SetInputElement = 8] = "SetInputElement", r17[r17.SetButtonElement = 9] = "SetButtonElement", r17[r17.SetOptionsElement = 10] = "SetOptionsElement", r17))(Pt || {});
function ye2(t11, i15 = (e8) => e8) {
  let e8 = t11.activeOptionIndex !== null ? t11.options[t11.activeOptionIndex] : null, o18 = i15(t11.options.slice()), c15 = o18.length > 0 && o18[0].dataRef.current.order !== null ? o18.sort((b9, d14) => b9.dataRef.current.order - d14.dataRef.current.order) : _3(o18, (b9) => b9.dataRef.current.domRef.current), f21 = e8 ? c15.indexOf(e8) : null;
  return f21 === -1 && (f21 = null), { options: c15, activeOptionIndex: f21 };
}
var At = { [1](t11) {
  var i15;
  return (i15 = t11.dataRef.current) != null && i15.disabled || t11.comboboxState === 1 ? t11 : { ...t11, activeOptionIndex: null, comboboxState: 1, isTyping: false, activationTrigger: 2, __demoMode: false };
}, [0](t11) {
  var i15, e8;
  if ((i15 = t11.dataRef.current) != null && i15.disabled || t11.comboboxState === 0) return t11;
  if ((e8 = t11.dataRef.current) != null && e8.value) {
    let o18 = t11.dataRef.current.calculateIndex(t11.dataRef.current.value);
    if (o18 !== -1) return { ...t11, activeOptionIndex: o18, comboboxState: 0, __demoMode: false };
  }
  return { ...t11, comboboxState: 0, __demoMode: false };
}, [3](t11, i15) {
  return t11.isTyping === i15.isTyping ? t11 : { ...t11, isTyping: i15.isTyping };
}, [2](t11, i15) {
  var f21, b9, d14, T10;
  if ((f21 = t11.dataRef.current) != null && f21.disabled || t11.optionsElement && !((b9 = t11.dataRef.current) != null && b9.optionsPropsRef.current.static) && t11.comboboxState === 1) return t11;
  if (t11.virtual) {
    let { options: s13, disabled: n13 } = t11.virtual, r17 = i15.focus === c9.Specific ? i15.idx : f14(i15, { resolveItems: () => s13, resolveActiveIndex: () => {
      var S6, F6;
      return (F6 = (S6 = t11.activeOptionIndex) != null ? S6 : s13.findIndex((a20) => !n13(a20))) != null ? F6 : null;
    }, resolveDisabled: n13, resolveId() {
      throw new Error("Function not implemented.");
    } }), E13 = (d14 = i15.trigger) != null ? d14 : 2;
    return t11.activeOptionIndex === r17 && t11.activationTrigger === E13 ? t11 : { ...t11, activeOptionIndex: r17, activationTrigger: E13, isTyping: false, __demoMode: false };
  }
  let e8 = ye2(t11);
  if (e8.activeOptionIndex === null) {
    let s13 = e8.options.findIndex((n13) => !n13.dataRef.current.disabled);
    s13 !== -1 && (e8.activeOptionIndex = s13);
  }
  let o18 = i15.focus === c9.Specific ? i15.idx : f14(i15, { resolveItems: () => e8.options, resolveActiveIndex: () => e8.activeOptionIndex, resolveId: (s13) => s13.id, resolveDisabled: (s13) => s13.dataRef.current.disabled }), c15 = (T10 = i15.trigger) != null ? T10 : 2;
  return t11.activeOptionIndex === o18 && t11.activationTrigger === c15 ? t11 : { ...t11, ...e8, isTyping: false, activeOptionIndex: o18, activationTrigger: c15, __demoMode: false };
}, [4]: (t11, i15) => {
  var f21, b9, d14;
  if ((f21 = t11.dataRef.current) != null && f21.virtual) return { ...t11, options: [...t11.options, i15.payload] };
  let e8 = i15.payload, o18 = ye2(t11, (T10) => (T10.push(e8), T10));
  t11.activeOptionIndex === null && (b9 = t11.dataRef.current) != null && b9.isSelected(i15.payload.dataRef.current.value) && (o18.activeOptionIndex = o18.options.indexOf(e8));
  let c15 = { ...t11, ...o18, activationTrigger: 2 };
  return (d14 = t11.dataRef.current) != null && d14.__demoMode && t11.dataRef.current.value === void 0 && (c15.activeOptionIndex = 0), c15;
}, [5]: (t11, i15) => {
  var o18;
  if ((o18 = t11.dataRef.current) != null && o18.virtual) return { ...t11, options: t11.options.filter((c15) => c15.id !== i15.id) };
  let e8 = ye2(t11, (c15) => {
    let f21 = c15.findIndex((b9) => b9.id === i15.id);
    return f21 !== -1 && c15.splice(f21, 1), c15;
  });
  return { ...t11, ...e8, activationTrigger: 2 };
}, [6]: (t11, i15) => t11.activationTrigger === i15.trigger ? t11 : { ...t11, activationTrigger: i15.trigger }, [7]: (t11, i15) => {
  var o18, c15;
  if (t11.virtual === null) return { ...t11, virtual: { options: i15.options, disabled: (o18 = i15.disabled) != null ? o18 : () => false } };
  if (t11.virtual.options === i15.options && t11.virtual.disabled === i15.disabled) return t11;
  let e8 = t11.activeOptionIndex;
  if (t11.activeOptionIndex !== null) {
    let f21 = i15.options.indexOf(t11.virtual.options[t11.activeOptionIndex]);
    f21 !== -1 ? e8 = f21 : e8 = null;
  }
  return { ...t11, activeOptionIndex: e8, virtual: { options: i15.options, disabled: (c15 = i15.disabled) != null ? c15 : () => false } };
}, [8]: (t11, i15) => t11.inputElement === i15.element ? t11 : { ...t11, inputElement: i15.element }, [9]: (t11, i15) => t11.buttonElement === i15.element ? t11 : { ...t11, buttonElement: i15.element }, [10]: (t11, i15) => t11.optionsElement === i15.element ? t11 : { ...t11, optionsElement: i15.element } };
var Oe = (0, import_react85.createContext)(null);
Oe.displayName = "ComboboxActionsContext";
function ae2(t11) {
  let i15 = (0, import_react85.useContext)(Oe);
  if (i15 === null) {
    let e8 = new Error(`<${t11} /> is missing a parent <Combobox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(e8, ae2), e8;
  }
  return i15;
}
var ke = (0, import_react85.createContext)(null);
function Rt(t11) {
  let i15 = ie("VirtualProvider"), e8 = p(), { options: o18 } = i15.virtual, [c15, f21] = (0, import_react85.useMemo)(() => {
    let n13 = i15.optionsElement;
    if (!n13) return [0, 0];
    let r17 = window.getComputedStyle(n13);
    return [parseFloat(r17.paddingBlockStart || r17.paddingTop), parseFloat(r17.paddingBlockEnd || r17.paddingBottom)];
  }, [i15.optionsElement]), b9 = useVirtualizer({ enabled: o18.length !== 0, scrollPaddingStart: c15, scrollPaddingEnd: f21, count: o18.length, estimateSize() {
    return 40;
  }, getScrollElement() {
    return i15.optionsElement;
  }, overscan: 12 }), [d14, T10] = (0, import_react85.useState)(0);
  n(() => {
    T10((n13) => n13 + 1);
  }, [o18]);
  let s13 = b9.getVirtualItems();
  return s13.length === 0 ? null : import_react85.default.createElement(ke.Provider, { value: b9 }, import_react85.default.createElement("div", { style: { position: "relative", width: "100%", height: `${b9.getTotalSize()}px` }, ref: (n13) => {
    if (!n13) {
      e8.dispose();
      return;
    }
    i15.activationTrigger !== 0 && e8.nextFrame(() => {
      i15.activeOptionIndex !== null && o18.length > i15.activeOptionIndex && b9.scrollToIndex(i15.activeOptionIndex);
    });
  } }, s13.map((n13) => {
    var r17;
    return import_react85.default.createElement(import_react85.Fragment, { key: n13.key }, import_react85.default.cloneElement((r17 = t11.children) == null ? void 0 : r17.call(t11, { ...t11.slot, option: o18[n13.index] }), { key: `${d14}-${n13.key}`, "data-index": n13.index, "aria-setsize": o18.length, "aria-posinset": n13.index + 1, style: { position: "absolute", top: 0, left: 0, transform: `translateY(${n13.start}px)`, overflowAnchor: "none" } }));
  })));
}
var ue2 = (0, import_react85.createContext)(null);
ue2.displayName = "ComboboxDataContext";
function ie(t11) {
  let i15 = (0, import_react85.useContext)(ue2);
  if (i15 === null) {
    let e8 = new Error(`<${t11} /> is missing a parent <Combobox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(e8, ie), e8;
  }
  return i15;
}
function _t(t11, i15) {
  return u(i15.type, At, t11, i15);
}
var ht = import_react85.Fragment;
function Mt(t11, i15) {
  var Ce5, Ee4;
  let e8 = a3(), { value: o18, defaultValue: c15, onChange: f21, form: b9, name: d14, by: T10, invalid: s13 = false, disabled: n13 = e8 || false, onClose: r17, __demoMode: E13 = false, multiple: S6 = false, immediate: F6 = false, virtual: a20 = null, nullable: U7, ...N4 } = t11, _8 = l2(c15), [I6 = S6 ? [] : void 0, A6] = T(o18, f21, _8), [O8, x11] = (0, import_react85.useReducer)(_t, { dataRef: (0, import_react85.createRef)(), comboboxState: E13 ? 0 : 1, isTyping: false, options: [], virtual: a20 ? { options: a20.options, disabled: (Ce5 = a20.disabled) != null ? Ce5 : () => false } : null, activeOptionIndex: null, activationTrigger: 2, inputElement: null, buttonElement: null, optionsElement: null, __demoMode: E13 }), M8 = (0, import_react85.useRef)(false), y7 = (0, import_react85.useRef)({ static: false, hold: false }), B5 = u8(T10), X5 = o5((u16) => a20 ? T10 === null ? a20.options.indexOf(u16) : a20.options.findIndex((v3) => B5(v3, u16)) : O8.options.findIndex((v3) => B5(v3.dataRef.current.value, u16))), J7 = (0, import_react85.useCallback)((u16) => u(p6.mode, { [1]: () => I6.some((v3) => B5(v3, u16)), [0]: () => B5(I6, u16) }), [I6]), k5 = o5((u16) => O8.activeOptionIndex === X5(u16)), p6 = (0, import_react85.useMemo)(() => ({ ...O8, immediate: F6, optionsPropsRef: y7, value: I6, defaultValue: _8, disabled: n13, invalid: s13, mode: S6 ? 1 : 0, virtual: a20 ? O8.virtual : null, get activeOptionIndex() {
    if (M8.current && O8.activeOptionIndex === null && (a20 ? a20.options.length > 0 : O8.options.length > 0)) {
      if (a20) {
        let v3 = a20.options.findIndex((K4) => {
          var se3, Se6;
          return !((Se6 = (se3 = a20.disabled) == null ? void 0 : se3.call(a20, K4)) != null && Se6);
        });
        if (v3 !== -1) return v3;
      }
      let u16 = O8.options.findIndex((v3) => !v3.dataRef.current.disabled);
      if (u16 !== -1) return u16;
    }
    return O8.activeOptionIndex;
  }, calculateIndex: X5, compare: B5, isSelected: J7, isActive: k5 }), [I6, _8, n13, s13, S6, E13, O8, a20]);
  n(() => {
    var u16;
    a20 && x11({ type: 7, options: a20.options, disabled: (u16 = a20.disabled) != null ? u16 : null });
  }, [a20, a20 == null ? void 0 : a20.options, a20 == null ? void 0 : a20.disabled]), n(() => {
    O8.dataRef.current = p6;
  }, [p6]);
  let j9 = p6.comboboxState === 0;
  R3(j9, [p6.buttonElement, p6.inputElement, p6.optionsElement], () => V5.closeCombobox());
  let G7 = (0, import_react85.useMemo)(() => {
    var u16, v3, K4;
    return { open: p6.comboboxState === 0, disabled: n13, invalid: s13, activeIndex: p6.activeOptionIndex, activeOption: p6.activeOptionIndex === null ? null : p6.virtual ? p6.virtual.options[(u16 = p6.activeOptionIndex) != null ? u16 : 0] : (K4 = (v3 = p6.options[p6.activeOptionIndex]) == null ? void 0 : v3.dataRef.current.value) != null ? K4 : null, value: I6 };
  }, [p6, n13, I6, s13]), g6 = o5(() => {
    if (p6.activeOptionIndex !== null) {
      if (V5.setIsTyping(false), p6.virtual) W4(p6.virtual.options[p6.activeOptionIndex]);
      else {
        let { dataRef: u16 } = p6.options[p6.activeOptionIndex];
        W4(u16.current.value);
      }
      V5.goToOption(c9.Specific, p6.activeOptionIndex);
    }
  }), z4 = o5(() => {
    x11({ type: 0 }), M8.current = true;
  }), pe5 = o5(() => {
    x11({ type: 1 }), M8.current = false, r17 == null || r17();
  }), ee4 = o5((u16) => {
    x11({ type: 3, isTyping: u16 });
  }), Q4 = o5((u16, v3, K4) => (M8.current = false, u16 === c9.Specific ? x11({ type: 2, focus: c9.Specific, idx: v3, trigger: K4 }) : x11({ type: 2, focus: u16, trigger: K4 }))), Z4 = o5((u16, v3) => (x11({ type: 4, payload: { id: u16, dataRef: v3 } }), () => {
    p6.isActive(v3.current.value) && (M8.current = true), x11({ type: 5, id: u16 });
  })), W4 = o5((u16) => u(p6.mode, { [0]() {
    return A6 == null ? void 0 : A6(u16);
  }, [1]() {
    let v3 = p6.value.slice(), K4 = v3.findIndex((se3) => B5(se3, u16));
    return K4 === -1 ? v3.push(u16) : v3.splice(K4, 1), A6 == null ? void 0 : A6(v3);
  } })), h8 = o5((u16) => {
    x11({ type: 6, trigger: u16 });
  }), l14 = o5((u16) => {
    x11({ type: 8, element: u16 });
  }), H14 = o5((u16) => {
    x11({ type: 9, element: u16 });
  }), R8 = o5((u16) => {
    x11({ type: 10, element: u16 });
  }), V5 = (0, import_react85.useMemo)(() => ({ onChange: W4, registerOption: Z4, goToOption: Q4, setIsTyping: ee4, closeCombobox: pe5, openCombobox: z4, setActivationTrigger: h8, selectActiveOption: g6, setInputElement: l14, setButtonElement: H14, setOptionsElement: R8 }), []), [C9, w11] = K2(), q4 = i15 === null ? {} : { ref: i15 }, He5 = (0, import_react85.useCallback)(() => {
    if (_8 !== void 0) return A6 == null ? void 0 : A6(_8);
  }, [A6, _8]), Ue4 = L();
  return import_react85.default.createElement(w11, { value: C9, props: { htmlFor: (Ee4 = p6.inputElement) == null ? void 0 : Ee4.id }, slot: { open: p6.comboboxState === 0, disabled: n13 } }, import_react85.default.createElement(Me, null, import_react85.default.createElement(Oe.Provider, { value: V5 }, import_react85.default.createElement(ue2.Provider, { value: p6 }, import_react85.default.createElement(c8, { value: u(p6.comboboxState, { [0]: i11.Open, [1]: i11.Closed }) }, d14 != null && import_react85.default.createElement(j2, { disabled: n13, data: I6 != null ? { [d14]: I6 } : {}, form: b9, onReset: He5 }), Ue4({ ourProps: q4, theirProps: N4, slot: G7, defaultTag: ht, name: "Combobox" }))))));
}
var Dt = "input";
function Ft(t11, i15) {
  var ee4, Q4, Z4, W4, h8;
  let e8 = ie("Combobox.Input"), o18 = ae2("Combobox.Input"), c15 = (0, import_react50.useId)(), f21 = u4(), { id: b9 = f21 || `headlessui-combobox-input-${c15}`, onChange: d14, displayValue: T10, disabled: s13 = e8.disabled || false, autoFocus: n13 = false, type: r17 = "text", ...E13 } = t11, S6 = (0, import_react85.useRef)(null), F6 = y(S6, i15, ye(), o18.setInputElement), a20 = n9(e8.inputElement), U7 = p(), N4 = o5(() => {
    o18.onChange(null), e8.optionsElement && (e8.optionsElement.scrollTop = 0), o18.goToOption(c9.Nothing);
  }), _8 = (0, import_react85.useMemo)(() => {
    var l14;
    return typeof T10 == "function" && e8.value !== void 0 ? (l14 = T10(e8.value)) != null ? l14 : "" : typeof e8.value == "string" ? e8.value : "";
  }, [e8.value, T10]);
  m8(([l14, H14], [R8, V5]) => {
    if (e8.isTyping) return;
    let C9 = S6.current;
    C9 && ((V5 === 0 && H14 === 1 || l14 !== R8) && (C9.value = l14), requestAnimationFrame(() => {
      if (e8.isTyping || !C9 || (a20 == null ? void 0 : a20.activeElement) !== C9) return;
      let { selectionStart: w11, selectionEnd: q4 } = C9;
      Math.abs((q4 != null ? q4 : 0) - (w11 != null ? w11 : 0)) === 0 && w11 === 0 && C9.setSelectionRange(C9.value.length, C9.value.length);
    }));
  }, [_8, e8.comboboxState, a20, e8.isTyping]), m8(([l14], [H14]) => {
    if (l14 === 0 && H14 === 1) {
      if (e8.isTyping) return;
      let R8 = S6.current;
      if (!R8) return;
      let V5 = R8.value, { selectionStart: C9, selectionEnd: w11, selectionDirection: q4 } = R8;
      R8.value = "", R8.value = V5, q4 !== null ? R8.setSelectionRange(C9, w11, q4) : R8.setSelectionRange(C9, w11);
    }
  }, [e8.comboboxState]);
  let I6 = (0, import_react85.useRef)(false), A6 = o5(() => {
    I6.current = true;
  }), O8 = o5(() => {
    U7.nextFrame(() => {
      I6.current = false;
    });
  }), x11 = o5((l14) => {
    switch (o18.setIsTyping(true), l14.key) {
      case o9.Enter:
        if (e8.comboboxState !== 0 || I6.current) return;
        if (l14.preventDefault(), l14.stopPropagation(), e8.activeOptionIndex === null) {
          o18.closeCombobox();
          return;
        }
        o18.selectActiveOption(), e8.mode === 0 && o18.closeCombobox();
        break;
      case o9.ArrowDown:
        return l14.preventDefault(), l14.stopPropagation(), u(e8.comboboxState, { [0]: () => o18.goToOption(c9.Next), [1]: () => o18.openCombobox() });
      case o9.ArrowUp:
        return l14.preventDefault(), l14.stopPropagation(), u(e8.comboboxState, { [0]: () => o18.goToOption(c9.Previous), [1]: () => {
          (0, import_react_dom8.flushSync)(() => o18.openCombobox()), e8.value || o18.goToOption(c9.Last);
        } });
      case o9.Home:
        if (l14.shiftKey) break;
        return l14.preventDefault(), l14.stopPropagation(), o18.goToOption(c9.First);
      case o9.PageUp:
        return l14.preventDefault(), l14.stopPropagation(), o18.goToOption(c9.First);
      case o9.End:
        if (l14.shiftKey) break;
        return l14.preventDefault(), l14.stopPropagation(), o18.goToOption(c9.Last);
      case o9.PageDown:
        return l14.preventDefault(), l14.stopPropagation(), o18.goToOption(c9.Last);
      case o9.Escape:
        return e8.comboboxState !== 0 ? void 0 : (l14.preventDefault(), e8.optionsElement && !e8.optionsPropsRef.current.static && l14.stopPropagation(), e8.mode === 0 && e8.value === null && N4(), o18.closeCombobox());
      case o9.Tab:
        if (e8.comboboxState !== 0) return;
        e8.mode === 0 && e8.activationTrigger !== 1 && o18.selectActiveOption(), o18.closeCombobox();
        break;
    }
  }), M8 = o5((l14) => {
    d14 == null || d14(l14), e8.mode === 0 && l14.target.value === "" && N4(), o18.openCombobox();
  }), y7 = o5((l14) => {
    var R8, V5, C9;
    let H14 = (R8 = l14.relatedTarget) != null ? R8 : r11.find((w11) => w11 !== l14.currentTarget);
    if (!((V5 = e8.optionsElement) != null && V5.contains(H14)) && !((C9 = e8.buttonElement) != null && C9.contains(H14)) && e8.comboboxState === 0) return l14.preventDefault(), e8.mode === 0 && e8.value === null && N4(), o18.closeCombobox();
  }), B5 = o5((l14) => {
    var R8, V5, C9;
    let H14 = (R8 = l14.relatedTarget) != null ? R8 : r11.find((w11) => w11 !== l14.currentTarget);
    (V5 = e8.buttonElement) != null && V5.contains(H14) || (C9 = e8.optionsElement) != null && C9.contains(H14) || e8.disabled || e8.immediate && e8.comboboxState !== 0 && U7.microTask(() => {
      (0, import_react_dom8.flushSync)(() => o18.openCombobox()), o18.setActivationTrigger(1);
    });
  }), X5 = I(), J7 = U2(), { isFocused: k5, focusProps: p6 } = $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: n13 }), { isHovered: j9, hoverProps: G7 } = $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: s13 }), g6 = (0, import_react85.useMemo)(() => ({ open: e8.comboboxState === 0, disabled: s13, invalid: e8.invalid, hover: j9, focus: k5, autofocus: n13 }), [e8, j9, k5, n13, s13, e8.invalid]), z4 = _({ ref: F6, id: b9, role: "combobox", type: r17, "aria-controls": (ee4 = e8.optionsElement) == null ? void 0 : ee4.id, "aria-expanded": e8.comboboxState === 0, "aria-activedescendant": e8.activeOptionIndex === null ? void 0 : e8.virtual ? (Q4 = e8.options.find((l14) => !l14.dataRef.current.disabled && e8.compare(l14.dataRef.current.value, e8.virtual.options[e8.activeOptionIndex]))) == null ? void 0 : Q4.id : (Z4 = e8.options[e8.activeOptionIndex]) == null ? void 0 : Z4.id, "aria-labelledby": X5, "aria-describedby": J7, "aria-autocomplete": "list", defaultValue: (h8 = (W4 = t11.defaultValue) != null ? W4 : e8.defaultValue !== void 0 ? T10 == null ? void 0 : T10(e8.defaultValue) : null) != null ? h8 : e8.defaultValue, disabled: s13 || void 0, autoFocus: n13, onCompositionStart: A6, onCompositionEnd: O8, onKeyDown: x11, onChange: M8, onFocus: B5, onBlur: y7 }, p6, G7);
  return L()({ ourProps: z4, theirProps: E13, slot: g6, defaultTag: Dt, name: "Combobox.Input" });
}
var Vt = "button";
function Lt(t11, i15) {
  var M8;
  let e8 = ie("Combobox.Button"), o18 = ae2("Combobox.Button"), c15 = y(i15, o18.setButtonElement), f21 = (0, import_react50.useId)(), { id: b9 = `headlessui-combobox-button-${f21}`, disabled: d14 = e8.disabled || false, autoFocus: T10 = false, ...s13 } = t11, n13 = i10(e8.inputElement), r17 = o5((y7) => {
    switch (y7.key) {
      case o9.Space:
      case o9.Enter:
        y7.preventDefault(), y7.stopPropagation(), e8.comboboxState === 1 && (0, import_react_dom8.flushSync)(() => o18.openCombobox()), n13();
        return;
      case o9.ArrowDown:
        y7.preventDefault(), y7.stopPropagation(), e8.comboboxState === 1 && ((0, import_react_dom8.flushSync)(() => o18.openCombobox()), e8.value || o18.goToOption(c9.First)), n13();
        return;
      case o9.ArrowUp:
        y7.preventDefault(), y7.stopPropagation(), e8.comboboxState === 1 && ((0, import_react_dom8.flushSync)(() => o18.openCombobox()), e8.value || o18.goToOption(c9.Last)), n13();
        return;
      case o9.Escape:
        if (e8.comboboxState !== 0) return;
        y7.preventDefault(), e8.optionsElement && !e8.optionsPropsRef.current.static && y7.stopPropagation(), (0, import_react_dom8.flushSync)(() => o18.closeCombobox()), n13();
        return;
      default:
        return;
    }
  }), E13 = o5((y7) => {
    y7.preventDefault(), !r4(y7.currentTarget) && (y7.button === g2.Left && (e8.comboboxState === 0 ? o18.closeCombobox() : o18.openCombobox()), n13());
  }), S6 = I([b9]), { isFocusVisible: F6, focusProps: a20 } = $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: T10 }), { isHovered: U7, hoverProps: N4 } = $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: d14 }), { pressed: _8, pressProps: I6 } = w({ disabled: d14 }), A6 = (0, import_react85.useMemo)(() => ({ open: e8.comboboxState === 0, active: _8 || e8.comboboxState === 0, disabled: d14, invalid: e8.invalid, value: e8.value, hover: U7, focus: F6 }), [e8, U7, F6, _8, d14]), O8 = _({ ref: c15, id: b9, type: e6(t11, e8.buttonElement), tabIndex: -1, "aria-haspopup": "listbox", "aria-controls": (M8 = e8.optionsElement) == null ? void 0 : M8.id, "aria-expanded": e8.comboboxState === 0, "aria-labelledby": S6, disabled: d14 || void 0, autoFocus: T10, onMouseDown: E13, onKeyDown: r17 }, a20, N4, I6);
  return L()({ ourProps: O8, theirProps: s13, slot: A6, defaultTag: Vt, name: "Combobox.Button" });
}
var wt = "div";
var Bt = O.RenderStrategy | O.Static;
function Nt(t11, i15) {
  var Q4, Z4, W4;
  let e8 = (0, import_react50.useId)(), { id: o18 = `headlessui-combobox-options-${e8}`, hold: c15 = false, anchor: f21, portal: b9 = false, modal: d14 = true, transition: T10 = false, ...s13 } = t11, n13 = ie("Combobox.Options"), r17 = ae2("Combobox.Options"), E13 = xe(f21);
  E13 && (b9 = true);
  let [S6, F6] = Re(E13), [a20, U7] = (0, import_react85.useState)(null), N4 = be(), _8 = y(i15, E13 ? S6 : null, r17.setOptionsElement, U7), I6 = n9(n13.buttonElement || n13.inputElement), A6 = n9(n13.optionsElement), O8 = u12(), [x11, M8] = x3(T10, a20, O8 !== null ? (O8 & i11.Open) === i11.Open : n13.comboboxState === 0);
  m6(x11, n13.inputElement, r17.closeCombobox);
  let y7 = n13.__demoMode ? false : d14 && n13.comboboxState === 0;
  f11(y7, A6);
  let B5 = n13.__demoMode ? false : d14 && n13.comboboxState === 0;
  y3(B5, { allowed: (0, import_react85.useCallback)(() => [n13.inputElement, n13.buttonElement, n13.optionsElement], [n13.inputElement, n13.buttonElement, n13.optionsElement]) }), n(() => {
    var h8;
    n13.optionsPropsRef.current.static = (h8 = t11.static) != null ? h8 : false;
  }, [n13.optionsPropsRef, t11.static]), n(() => {
    n13.optionsPropsRef.current.hold = c15;
  }, [n13.optionsPropsRef, c15]), F3(n13.comboboxState === 0, { container: n13.optionsElement, accept(h8) {
    return h8.getAttribute("role") === "option" ? NodeFilter.FILTER_REJECT : h8.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
  }, walk(h8) {
    h8.setAttribute("role", "none");
  } });
  let X5 = I([(Q4 = n13.buttonElement) == null ? void 0 : Q4.id]), J7 = (0, import_react85.useMemo)(() => ({ open: n13.comboboxState === 0, option: void 0 }), [n13.comboboxState]), k5 = o5(() => {
    r17.setActivationTrigger(0);
  }), p6 = o5((h8) => {
    h8.preventDefault(), r17.setActivationTrigger(0);
  }), j9 = _(E13 ? N4() : {}, { "aria-labelledby": X5, role: "listbox", "aria-multiselectable": n13.mode === 1 ? true : void 0, id: o18, ref: _8, style: { ...s13.style, ...F6, "--input-width": d3(n13.inputElement, true).width, "--button-width": d3(n13.buttonElement, true).width }, onWheel: n13.activationTrigger === 0 ? void 0 : k5, onMouseDown: p6, ...R4(M8) }), G7 = x11 && n13.comboboxState === 1, g6 = l7(G7, (Z4 = n13.virtual) == null ? void 0 : Z4.options), z4 = l7(G7, n13.value), pe5 = o5((h8) => n13.compare(z4, h8));
  if (n13.virtual) {
    if (g6 === void 0) throw new Error("Missing `options` in virtual mode");
    Object.assign(s13, { children: import_react85.default.createElement(ue2.Provider, { value: g6 !== n13.virtual.options ? { ...n13, virtual: { ...n13.virtual, options: g6 } } : n13 }, import_react85.default.createElement(Rt, { slot: J7 }, s13.children)) });
  }
  let ee4 = L();
  return import_react85.default.createElement(oe, { enabled: b9 ? t11.static || x11 : false, ownerDocument: I6 }, import_react85.default.createElement(ue2.Provider, { value: n13.mode === 1 ? n13 : { ...n13, isSelected: pe5 } }, ee4({ ourProps: j9, theirProps: { ...s13, children: import_react85.default.createElement(f13, { freeze: G7 }, typeof s13.children == "function" ? (W4 = s13.children) == null ? void 0 : W4.call(s13, J7) : s13.children) }, slot: J7, defaultTag: wt, features: Bt, visible: x11, name: "Combobox.Options" })));
}
var kt = "div";
function Ht(t11, i15) {
  var k5, p6, j9, G7;
  let e8 = ie("Combobox.Option"), o18 = ae2("Combobox.Option"), c15 = (0, import_react50.useId)(), { id: f21 = `headlessui-combobox-option-${c15}`, value: b9, disabled: d14 = (j9 = (p6 = (k5 = e8.virtual) == null ? void 0 : k5.disabled) == null ? void 0 : p6.call(k5, b9)) != null ? j9 : false, order: T10 = null, ...s13 } = t11, n13 = i10(e8.inputElement), r17 = e8.virtual ? e8.activeOptionIndex === e8.calculateIndex(b9) : e8.activeOptionIndex === null ? false : ((G7 = e8.options[e8.activeOptionIndex]) == null ? void 0 : G7.id) === f21, E13 = e8.isSelected(b9), S6 = (0, import_react85.useRef)(null), F6 = s3({ disabled: d14, value: b9, domRef: S6, order: T10 }), a20 = (0, import_react85.useContext)(ke), U7 = y(i15, S6, a20 ? a20.measureElement : null), N4 = o5(() => {
    o18.setIsTyping(false), o18.onChange(b9);
  });
  n(() => o18.registerOption(f21, F6), [F6, f21]);
  let _8 = (0, import_react85.useRef)(!(e8.virtual || e8.__demoMode));
  n(() => {
    if (!e8.virtual && !e8.__demoMode) return o3().requestAnimationFrame(() => {
      _8.current = true;
    });
  }, [e8.virtual, e8.__demoMode]), n(() => {
    if (_8.current && e8.comboboxState === 0 && r17 && e8.activationTrigger !== 0) return o3().requestAnimationFrame(() => {
      var g6, z4;
      (z4 = (g6 = S6.current) == null ? void 0 : g6.scrollIntoView) == null || z4.call(g6, { block: "nearest" });
    });
  }, [S6, r17, e8.comboboxState, e8.activationTrigger, e8.activeOptionIndex]);
  let I6 = o5((g6) => {
    g6.preventDefault(), g6.button === g2.Left && (d14 || (N4(), n8() || requestAnimationFrame(() => n13()), e8.mode === 0 && o18.closeCombobox()));
  }), A6 = o5(() => {
    if (d14) return o18.goToOption(c9.Nothing);
    let g6 = e8.calculateIndex(b9);
    o18.goToOption(c9.Specific, g6);
  }), O8 = u10(), x11 = o5((g6) => O8.update(g6)), M8 = o5((g6) => {
    if (!O8.wasMoved(g6) || d14 || r17) return;
    let z4 = e8.calculateIndex(b9);
    o18.goToOption(c9.Specific, z4, 0);
  }), y7 = o5((g6) => {
    O8.wasMoved(g6) && (d14 || r17 && (e8.optionsPropsRef.current.hold || o18.goToOption(c9.Nothing)));
  }), B5 = (0, import_react85.useMemo)(() => ({ active: r17, focus: r17, selected: E13, disabled: d14 }), [r17, E13, d14]), X5 = { id: f21, ref: U7, role: "option", tabIndex: d14 === true ? void 0 : -1, "aria-disabled": d14 === true ? true : void 0, "aria-selected": E13, disabled: void 0, onMouseDown: I6, onFocus: A6, onPointerEnter: x11, onMouseEnter: x11, onPointerMove: M8, onMouseMove: M8, onPointerLeave: y7, onMouseLeave: y7 };
  return L()({ ourProps: X5, theirProps: s13, slot: B5, defaultTag: kt, name: "Combobox.Option" });
}
var Ut = K(Mt);
var Gt = K(Lt);
var zt = K(Ft);
var Kt = Q;
var jt = K(Nt);
var Wt = K(Ht);
var Uo = Object.assign(Ut, { Input: zt, Button: Gt, Label: Kt, Options: jt, Option: Wt });

// node_modules/@headlessui/react/dist/components/data-interactive/data-interactive.js
var import_react86 = __toESM(require_react(), 1);
var E8 = import_react86.Fragment;
function d10(o18, n13) {
  let { ...s13 } = o18, e8 = false, { isFocusVisible: t11, focusProps: p6 } = $f7dceffc5ad7768b$export$4e328f61c538687f(), { isHovered: r17, hoverProps: i15 } = $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: e8 }), { pressed: a20, pressProps: T10 } = w({ disabled: e8 }), l14 = _({ ref: n13 }, p6, i15, T10), c15 = (0, import_react86.useMemo)(() => ({ hover: r17, focus: t11, active: a20 }), [r17, t11, a20]);
  return L()({ ourProps: l14, theirProps: s13, slot: c15, defaultTag: E8, name: "DataInteractive" });
}
var x5 = K(d10);

// node_modules/@headlessui/react/dist/components/dialog/dialog.js
var import_react93 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-escape.js
function a13(o18, r17 = typeof document != "undefined" ? document.defaultView : null, t11) {
  let n13 = x2(o18, "escape");
  E5(r17, "keydown", (e8) => {
    n13 && (e8.defaultPrevented || e8.key === o9.Escape && t11(e8));
  });
}

// node_modules/@headlessui/react/dist/hooks/use-is-touch-device.js
var import_react87 = __toESM(require_react(), 1);
function f16() {
  var t11;
  let [e8] = (0, import_react87.useState)(() => typeof window != "undefined" && typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)") : null), [o18, c15] = (0, import_react87.useState)((t11 = e8 == null ? void 0 : e8.matches) != null ? t11 : false);
  return n(() => {
    if (!e8) return;
    function n13(r17) {
      c15(r17.matches);
    }
    return e8.addEventListener("change", n13), () => e8.removeEventListener("change", n13);
  }, [e8]), o18;
}

// node_modules/@headlessui/react/dist/hooks/use-root-containers.js
var import_react88 = __toESM(require_react(), 1);
function R6({ defaultContainers: l14 = [], portals: n13, mainTreeNode: o18 } = {}) {
  let r17 = n9(o18), u16 = o5(() => {
    var i15, c15;
    let t11 = [];
    for (let e8 of l14) e8 !== null && (e8 instanceof HTMLElement ? t11.push(e8) : "current" in e8 && e8.current instanceof HTMLElement && t11.push(e8.current));
    if (n13 != null && n13.current) for (let e8 of n13.current) t11.push(e8);
    for (let e8 of (i15 = r17 == null ? void 0 : r17.querySelectorAll("html > *, body > *")) != null ? i15 : []) e8 !== document.body && e8 !== document.head && e8 instanceof HTMLElement && e8.id !== "headlessui-portal-root" && (o18 && (e8.contains(o18) || e8.contains((c15 = o18 == null ? void 0 : o18.getRootNode()) == null ? void 0 : c15.host)) || t11.some((m10) => e8.contains(m10)) || t11.push(e8));
    return t11;
  });
  return { resolveContainers: u16, contains: o5((t11) => u16().some((i15) => i15.contains(t11))) };
}
var a14 = (0, import_react88.createContext)(null);
function O4({ children: l14, node: n13 }) {
  let [o18, r17] = (0, import_react88.useState)(null), u16 = b5(n13 != null ? n13 : o18);
  return import_react88.default.createElement(a14.Provider, { value: u16 }, l14, u16 === null && import_react88.default.createElement(f4, { features: s4.Hidden, ref: (t11) => {
    var i15, c15;
    if (t11) {
      for (let e8 of (c15 = (i15 = o2(t11)) == null ? void 0 : i15.querySelectorAll("html > *, body > *")) != null ? c15 : []) if (e8 !== document.body && e8 !== document.head && e8 instanceof HTMLElement && e8 != null && e8.contains(t11)) {
        r17(e8);
        break;
      }
    }
  } }));
}
function b5(l14 = null) {
  var n13;
  return (n13 = (0, import_react88.useContext)(a14)) != null ? n13 : l14;
}

// node_modules/@headlessui/react/dist/components/focus-trap/focus-trap.js
var import_react91 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-is-mounted.js
var import_react89 = __toESM(require_react(), 1);
function f18() {
  let e8 = (0, import_react89.useRef)(false);
  return n(() => (e8.current = true, () => {
    e8.current = false;
  }), []), e8;
}

// node_modules/@headlessui/react/dist/hooks/use-tab-direction.js
var import_react90 = __toESM(require_react(), 1);
var a15 = ((r17) => (r17[r17.Forwards = 0] = "Forwards", r17[r17.Backwards = 1] = "Backwards", r17))(a15 || {});
function u15() {
  let e8 = (0, import_react90.useRef)(0);
  return s5(true, "keydown", (r17) => {
    r17.key === "Tab" && (e8.current = r17.shiftKey ? 1 : 0);
  }, true), e8;
}

// node_modules/@headlessui/react/dist/components/focus-trap/focus-trap.js
function U4(o18) {
  if (!o18) return /* @__PURE__ */ new Set();
  if (typeof o18 == "function") return new Set(o18());
  let e8 = /* @__PURE__ */ new Set();
  for (let t11 of o18.current) t11.current instanceof HTMLElement && e8.add(t11.current);
  return e8;
}
var Z = "div";
var x6 = ((n13) => (n13[n13.None = 0] = "None", n13[n13.InitialFocus = 1] = "InitialFocus", n13[n13.TabLock = 2] = "TabLock", n13[n13.FocusLock = 4] = "FocusLock", n13[n13.RestoreFocus = 8] = "RestoreFocus", n13[n13.AutoFocus = 16] = "AutoFocus", n13))(x6 || {});
function $4(o18, e8) {
  let t11 = (0, import_react91.useRef)(null), r17 = y(t11, e8), { initialFocus: s13, initialFocusFallback: a20, containers: n13, features: u16 = 15, ...f21 } = o18;
  l9() || (u16 = 0);
  let l14 = n9(t11);
  ee(u16, { ownerDocument: l14 });
  let i15 = te2(u16, { ownerDocument: l14, container: t11, initialFocus: s13, initialFocusFallback: a20 });
  re(u16, { ownerDocument: l14, container: t11, containers: n13, previousActiveElement: i15 });
  let R8 = u15(), g6 = o5((c15) => {
    let m10 = t11.current;
    if (!m10) return;
    ((G7) => G7())(() => {
      u(R8.current, { [a15.Forwards]: () => {
        P6(m10, F2.First, { skipElements: [c15.relatedTarget, a20] });
      }, [a15.Backwards]: () => {
        P6(m10, F2.Last, { skipElements: [c15.relatedTarget, a20] });
      } });
    });
  }), v3 = x2(!!(u16 & 2), "focus-trap#tab-lock"), N4 = p(), F6 = (0, import_react91.useRef)(false), k5 = { ref: r17, onKeyDown(c15) {
    c15.key == "Tab" && (F6.current = true, N4.requestAnimationFrame(() => {
      F6.current = false;
    }));
  }, onBlur(c15) {
    if (!(u16 & 4)) return;
    let m10 = U4(n13);
    t11.current instanceof HTMLElement && m10.add(t11.current);
    let d14 = c15.relatedTarget;
    d14 instanceof HTMLElement && d14.dataset.headlessuiFocusGuard !== "true" && (I4(m10, d14) || (F6.current ? P6(t11.current, u(R8.current, { [a15.Forwards]: () => F2.Next, [a15.Backwards]: () => F2.Previous }) | F2.WrapAround, { relativeTo: c15.target }) : c15.target instanceof HTMLElement && I2(c15.target)));
  } }, B5 = L();
  return import_react91.default.createElement(import_react91.default.Fragment, null, v3 && import_react91.default.createElement(f4, { as: "button", type: "button", "data-headlessui-focus-guard": true, onFocus: g6, features: s4.Focusable }), B5({ ourProps: k5, theirProps: f21, defaultTag: Z, name: "FocusTrap" }), v3 && import_react91.default.createElement(f4, { as: "button", type: "button", "data-headlessui-focus-guard": true, onFocus: g6, features: s4.Focusable }));
}
var D6 = K($4);
var ye3 = Object.assign(D6, { features: x6 });
function w6(o18 = true) {
  let e8 = (0, import_react91.useRef)(r11.slice());
  return m8(([t11], [r17]) => {
    r17 === true && t11 === false && t(() => {
      e8.current.splice(0);
    }), r17 === false && t11 === true && (e8.current = r11.slice());
  }, [o18, r11, e8]), o5(() => {
    var t11;
    return (t11 = e8.current.find((r17) => r17 != null && r17.isConnected)) != null ? t11 : null;
  });
}
function ee(o18, { ownerDocument: e8 }) {
  let t11 = !!(o18 & 8), r17 = w6(t11);
  m8(() => {
    t11 || (e8 == null ? void 0 : e8.activeElement) === (e8 == null ? void 0 : e8.body) && I2(r17());
  }, [t11]), c10(() => {
    t11 && I2(r17());
  });
}
function te2(o18, { ownerDocument: e8, container: t11, initialFocus: r17, initialFocusFallback: s13 }) {
  let a20 = (0, import_react91.useRef)(null), n13 = x2(!!(o18 & 1), "focus-trap#initial-focus"), u16 = f18();
  return m8(() => {
    if (o18 === 0) return;
    if (!n13) {
      s13 != null && s13.current && I2(s13.current);
      return;
    }
    let f21 = t11.current;
    f21 && t(() => {
      if (!u16.current) return;
      let l14 = e8 == null ? void 0 : e8.activeElement;
      if (r17 != null && r17.current) {
        if ((r17 == null ? void 0 : r17.current) === l14) {
          a20.current = l14;
          return;
        }
      } else if (f21.contains(l14)) {
        a20.current = l14;
        return;
      }
      if (r17 != null && r17.current) I2(r17.current);
      else {
        if (o18 & 16) {
          if (P6(f21, F2.First | F2.AutoFocus) !== T5.Error) return;
        } else if (P6(f21, F2.First) !== T5.Error) return;
        if (s13 != null && s13.current && (I2(s13.current), (e8 == null ? void 0 : e8.activeElement) === s13.current)) return;
        console.warn("There are no focusable elements inside the <FocusTrap />");
      }
      a20.current = e8 == null ? void 0 : e8.activeElement;
    });
  }, [s13, n13, o18]), a20;
}
function re(o18, { ownerDocument: e8, container: t11, containers: r17, previousActiveElement: s13 }) {
  let a20 = f18(), n13 = !!(o18 & 4);
  E5(e8 == null ? void 0 : e8.defaultView, "focus", (u16) => {
    if (!n13 || !a20.current) return;
    let f21 = U4(r17);
    t11.current instanceof HTMLElement && f21.add(t11.current);
    let l14 = s13.current;
    if (!l14) return;
    let i15 = u16.target;
    i15 && i15 instanceof HTMLElement ? I4(f21, i15) ? (s13.current = i15, I2(i15)) : (u16.preventDefault(), u16.stopPropagation(), I2(l14)) : I2(s13.current);
  }, true);
}
function I4(o18, e8) {
  for (let t11 of o18) if (t11.contains(e8)) return true;
  return false;
}

// node_modules/@headlessui/react/dist/components/transition/transition.js
var import_react92 = __toESM(require_react(), 1);
function ue3(e8) {
  var t11;
  return !!(e8.enter || e8.enterFrom || e8.enterTo || e8.leave || e8.leaveFrom || e8.leaveTo) || ((t11 = e8.as) != null ? t11 : de2) !== import_react92.Fragment || import_react92.default.Children.count(e8.children) === 1;
}
var w7 = (0, import_react92.createContext)(null);
w7.displayName = "TransitionContext";
var _e = ((n13) => (n13.Visible = "visible", n13.Hidden = "hidden", n13))(_e || {});
function De() {
  let e8 = (0, import_react92.useContext)(w7);
  if (e8 === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e8;
}
function He() {
  let e8 = (0, import_react92.useContext)(M6);
  if (e8 === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e8;
}
var M6 = (0, import_react92.createContext)(null);
M6.displayName = "NestingContext";
function U5(e8) {
  return "children" in e8 ? U5(e8.children) : e8.current.filter(({ el: t11 }) => t11.current !== null).filter(({ state: t11 }) => t11 === "visible").length > 0;
}
function Te2(e8, t11) {
  let n13 = s3(e8), l14 = (0, import_react92.useRef)([]), S6 = f18(), R8 = p(), d14 = o5((o18, i15 = A.Hidden) => {
    let a20 = l14.current.findIndex(({ el: s13 }) => s13 === o18);
    a20 !== -1 && (u(i15, { [A.Unmount]() {
      l14.current.splice(a20, 1);
    }, [A.Hidden]() {
      l14.current[a20].state = "hidden";
    } }), R8.microTask(() => {
      var s13;
      !U5(l14) && S6.current && ((s13 = n13.current) == null || s13.call(n13));
    }));
  }), y7 = o5((o18) => {
    let i15 = l14.current.find(({ el: a20 }) => a20 === o18);
    return i15 ? i15.state !== "visible" && (i15.state = "visible") : l14.current.push({ el: o18, state: "visible" }), () => d14(o18, A.Unmount);
  }), p6 = (0, import_react92.useRef)([]), c15 = (0, import_react92.useRef)(Promise.resolve()), C9 = (0, import_react92.useRef)({ enter: [], leave: [] }), h8 = o5((o18, i15, a20) => {
    p6.current.splice(0), t11 && (t11.chains.current[i15] = t11.chains.current[i15].filter(([s13]) => s13 !== o18)), t11 == null || t11.chains.current[i15].push([o18, new Promise((s13) => {
      p6.current.push(s13);
    })]), t11 == null || t11.chains.current[i15].push([o18, new Promise((s13) => {
      Promise.all(C9.current[i15].map(([r17, f21]) => f21)).then(() => s13());
    })]), i15 === "enter" ? c15.current = c15.current.then(() => t11 == null ? void 0 : t11.wait.current).then(() => a20(i15)) : a20(i15);
  }), g6 = o5((o18, i15, a20) => {
    Promise.all(C9.current[i15].splice(0).map(([s13, r17]) => r17)).then(() => {
      var s13;
      (s13 = p6.current.shift()) == null || s13();
    }).then(() => a20(i15));
  });
  return (0, import_react92.useMemo)(() => ({ children: l14, register: y7, unregister: d14, onStart: h8, onStop: g6, wait: c15, chains: C9 }), [y7, d14, l14, h8, g6, C9, c15]);
}
var de2 = import_react92.Fragment;
var fe2 = O.RenderStrategy;
function Ae2(e8, t11) {
  var ee4, te6;
  let { transition: n13 = true, beforeEnter: l14, afterEnter: S6, beforeLeave: R8, afterLeave: d14, enter: y7, enterFrom: p6, enterTo: c15, entered: C9, leave: h8, leaveFrom: g6, leaveTo: o18, ...i15 } = e8, [a20, s13] = (0, import_react92.useState)(null), r17 = (0, import_react92.useRef)(null), f21 = ue3(e8), j9 = y(...f21 ? [r17, t11, s13] : t11 === null ? [] : [t11]), H14 = (ee4 = i15.unmount) == null || ee4 ? A.Unmount : A.Hidden, { show: u16, appear: z4, initial: K4 } = De(), [v3, G7] = (0, import_react92.useState)(u16 ? "visible" : "hidden"), Q4 = He(), { register: A6, unregister: I6 } = Q4;
  n(() => A6(r17), [A6, r17]), n(() => {
    if (H14 === A.Hidden && r17.current) {
      if (u16 && v3 !== "visible") {
        G7("visible");
        return;
      }
      return u(v3, { ["hidden"]: () => I6(r17), ["visible"]: () => A6(r17) });
    }
  }, [v3, r17, A6, I6, u16, H14]);
  let B5 = l9();
  n(() => {
    if (f21 && B5 && v3 === "visible" && r17.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [r17, v3, B5, f21]);
  let ce5 = K4 && !z4, Y5 = z4 && u16 && K4, W4 = (0, import_react92.useRef)(false), L6 = Te2(() => {
    W4.current || (G7("hidden"), I6(r17));
  }, Q4), Z4 = o5((k5) => {
    W4.current = true;
    let F6 = k5 ? "enter" : "leave";
    L6.onStart(r17, F6, (_8) => {
      _8 === "enter" ? l14 == null || l14() : _8 === "leave" && (R8 == null || R8());
    });
  }), $5 = o5((k5) => {
    let F6 = k5 ? "enter" : "leave";
    W4.current = false, L6.onStop(r17, F6, (_8) => {
      _8 === "enter" ? S6 == null || S6() : _8 === "leave" && (d14 == null || d14());
    }), F6 === "leave" && !U5(L6) && (G7("hidden"), I6(r17));
  });
  (0, import_react92.useEffect)(() => {
    f21 && n13 || (Z4(u16), $5(u16));
  }, [u16, f21, n13]);
  let pe5 = /* @__PURE__ */ (() => !(!n13 || !f21 || !B5 || ce5))(), [, T10] = x3(pe5, a20, u16, { start: Z4, end: $5 }), Ce5 = m2({ ref: j9, className: ((te6 = t3(i15.className, Y5 && y7, Y5 && p6, T10.enter && y7, T10.enter && T10.closed && p6, T10.enter && !T10.closed && c15, T10.leave && h8, T10.leave && !T10.closed && g6, T10.leave && T10.closed && o18, !T10.transition && u16 && C9)) == null ? void 0 : te6.trim()) || void 0, ...R4(T10) }), N4 = 0;
  v3 === "visible" && (N4 |= i11.Open), v3 === "hidden" && (N4 |= i11.Closed), T10.enter && (N4 |= i11.Opening), T10.leave && (N4 |= i11.Closing);
  let he4 = L();
  return import_react92.default.createElement(M6.Provider, { value: L6 }, import_react92.default.createElement(c8, { value: N4 }, he4({ ourProps: Ce5, theirProps: i15, defaultTag: de2, features: fe2, visible: v3 === "visible", name: "Transition.Child" })));
}
function Ie(e8, t11) {
  let { show: n13, appear: l14 = false, unmount: S6 = true, ...R8 } = e8, d14 = (0, import_react92.useRef)(null), y7 = ue3(e8), p6 = y(...y7 ? [d14, t11] : t11 === null ? [] : [t11]);
  l9();
  let c15 = u12();
  if (n13 === void 0 && c15 !== null && (n13 = (c15 & i11.Open) === i11.Open), n13 === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [C9, h8] = (0, import_react92.useState)(n13 ? "visible" : "hidden"), g6 = Te2(() => {
    n13 || h8("hidden");
  }), [o18, i15] = (0, import_react92.useState)(true), a20 = (0, import_react92.useRef)([n13]);
  n(() => {
    o18 !== false && a20.current[a20.current.length - 1] !== n13 && (a20.current.push(n13), i15(false));
  }, [a20, n13]);
  let s13 = (0, import_react92.useMemo)(() => ({ show: n13, appear: l14, initial: o18 }), [n13, l14, o18]);
  n(() => {
    n13 ? h8("visible") : !U5(g6) && d14.current !== null && h8("hidden");
  }, [n13, g6]);
  let r17 = { unmount: S6 }, f21 = o5(() => {
    var u16;
    o18 && i15(false), (u16 = e8.beforeEnter) == null || u16.call(e8);
  }), j9 = o5(() => {
    var u16;
    o18 && i15(false), (u16 = e8.beforeLeave) == null || u16.call(e8);
  }), H14 = L();
  return import_react92.default.createElement(M6.Provider, { value: g6 }, import_react92.default.createElement(w7.Provider, { value: s13 }, H14({ ourProps: { ...r17, as: import_react92.Fragment, children: import_react92.default.createElement(me, { ref: p6, ...r17, ...R8, beforeEnter: f21, beforeLeave: j9 }) }, theirProps: {}, defaultTag: import_react92.Fragment, features: fe2, visible: C9 === "visible", name: "Transition" })));
}
function Le(e8, t11) {
  let n13 = (0, import_react92.useContext)(w7) !== null, l14 = u12() !== null;
  return import_react92.default.createElement(import_react92.default.Fragment, null, !n13 && l14 ? import_react92.default.createElement(X2, { ref: t11, ...e8 }) : import_react92.default.createElement(me, { ref: t11, ...e8 }));
}
var X2 = K(Ie);
var me = K(Ae2);
var Fe3 = K(Le);
var ze2 = Object.assign(X2, { Child: Fe3, Root: X2 });

// node_modules/@headlessui/react/dist/components/dialog/dialog.js
var Oe2 = ((o18) => (o18[o18.Open = 0] = "Open", o18[o18.Closed = 1] = "Closed", o18))(Oe2 || {});
var he = ((t11) => (t11[t11.SetTitleId = 0] = "SetTitleId", t11))(he || {});
var Se = { [0](e8, t11) {
  return e8.titleId === t11.id ? e8 : { ...e8, titleId: t11.id };
} };
var k4 = (0, import_react93.createContext)(null);
k4.displayName = "DialogContext";
function O6(e8) {
  let t11 = (0, import_react93.useContext)(k4);
  if (t11 === null) {
    let o18 = new Error(`<${e8} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(o18, O6), o18;
  }
  return t11;
}
function Ie2(e8, t11) {
  return u(t11.type, Se, e8, t11);
}
var V3 = K(function(t11, o18) {
  let a20 = (0, import_react50.useId)(), { id: l14 = `headlessui-dialog-${a20}`, open: i15, onClose: p6, initialFocus: d14, role: s13 = "dialog", autoFocus: f21 = true, __demoMode: u16 = false, unmount: P7 = false, ...h8 } = t11, R8 = (0, import_react93.useRef)(false);
  s13 = function() {
    return s13 === "dialog" || s13 === "alertdialog" ? s13 : (R8.current || (R8.current = true, console.warn(`Invalid role [${s13}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
  }();
  let c15 = u12();
  i15 === void 0 && c15 !== null && (i15 = (c15 & i11.Open) === i11.Open);
  let T10 = (0, import_react93.useRef)(null), S6 = y(T10, o18), F6 = n9(T10), g6 = i15 ? 0 : 1, [b9, q4] = (0, import_react93.useReducer)(Ie2, { titleId: null, descriptionId: null, panelRef: (0, import_react93.createRef)() }), m10 = o5(() => p6(false)), w11 = o5((r17) => q4({ type: 0, id: r17 })), D8 = l9() ? g6 === 0 : false, [z4, Q4] = le(), Z4 = { get current() {
    var r17;
    return (r17 = b9.panelRef.current) != null ? r17 : T10.current;
  } }, v3 = b5(), { resolveContainers: I6 } = R6({ mainTreeNode: v3, portals: z4, defaultContainers: [Z4] }), B5 = c15 !== null ? (c15 & i11.Closing) === i11.Closing : false;
  y3(u16 || B5 ? false : D8, { allowed: o5(() => {
    var r17, H14;
    return [(H14 = (r17 = T10.current) == null ? void 0 : r17.closest("[data-headlessui-portal]")) != null ? H14 : null];
  }), disallowed: o5(() => {
    var r17;
    return [(r17 = v3 == null ? void 0 : v3.closest("body > *:not(#headlessui-portal-root)")) != null ? r17 : null];
  }) }), R3(D8, I6, (r17) => {
    r17.preventDefault(), m10();
  }), a13(D8, F6 == null ? void 0 : F6.defaultView, (r17) => {
    r17.preventDefault(), r17.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), m10();
  }), f11(u16 || B5 ? false : D8, F6, I6), m6(D8, T10, m10);
  let [ee4, te6] = w3(), oe4 = (0, import_react93.useMemo)(() => [{ dialogState: g6, close: m10, setTitleId: w11, unmount: P7 }, b9], [g6, b9, m10, w11, P7]), U7 = (0, import_react93.useMemo)(() => ({ open: g6 === 0 }), [g6]), ne3 = { ref: S6, id: l14, role: s13, tabIndex: -1, "aria-modal": u16 ? void 0 : g6 === 0 ? true : void 0, "aria-labelledby": b9.titleId, "aria-describedby": ee4, unmount: P7 }, re4 = !f16(), y7 = x6.None;
  D8 && !u16 && (y7 |= x6.RestoreFocus, y7 |= x6.TabLock, f21 && (y7 |= x6.AutoFocus), re4 && (y7 |= x6.InitialFocus));
  let le4 = L();
  return import_react93.default.createElement(s7, null, import_react93.default.createElement(l10, { force: true }, import_react93.default.createElement(oe, null, import_react93.default.createElement(k4.Provider, { value: oe4 }, import_react93.default.createElement(D3, { target: T10 }, import_react93.default.createElement(l10, { force: false }, import_react93.default.createElement(te6, { slot: U7 }, import_react93.default.createElement(Q4, null, import_react93.default.createElement(ye3, { initialFocus: d14, initialFocusFallback: T10, containers: I6, features: y7 }, import_react93.default.createElement(C4, { value: m10 }, le4({ ourProps: ne3, theirProps: h8, slot: U7, defaultTag: Me2, features: Ge, visible: g6 === 0, name: "Dialog" })))))))))));
});
var Me2 = "div";
var Ge = O.RenderStrategy | O.Static;
function ke2(e8, t11) {
  let { transition: o18 = false, open: a20, ...l14 } = e8, i15 = u12(), p6 = e8.hasOwnProperty("open") || i15 !== null, d14 = e8.hasOwnProperty("onClose");
  if (!p6 && !d14) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
  if (!p6) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
  if (!d14) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
  if (!i15 && typeof e8.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e8.open}`);
  if (typeof e8.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e8.onClose}`);
  return (a20 !== void 0 || o18) && !l14.static ? import_react93.default.createElement(O4, null, import_react93.default.createElement(ze2, { show: a20, transition: o18, unmount: l14.unmount }, import_react93.default.createElement(V3, { ref: t11, ...l14 }))) : import_react93.default.createElement(O4, null, import_react93.default.createElement(V3, { ref: t11, open: a20, ...l14 }));
}
var we = "div";
function Be(e8, t11) {
  let o18 = (0, import_react50.useId)(), { id: a20 = `headlessui-dialog-panel-${o18}`, transition: l14 = false, ...i15 } = e8, [{ dialogState: p6, unmount: d14 }, s13] = O6("Dialog.Panel"), f21 = y(t11, s13.panelRef), u16 = (0, import_react93.useMemo)(() => ({ open: p6 === 0 }), [p6]), P7 = o5((S6) => {
    S6.stopPropagation();
  }), h8 = { ref: f21, id: a20, onClick: P7 }, R8 = l14 ? Fe3 : import_react93.Fragment, c15 = l14 ? { unmount: d14 } : {}, T10 = L();
  return import_react93.default.createElement(R8, { ...c15 }, T10({ ourProps: h8, theirProps: i15, slot: u16, defaultTag: we, name: "Dialog.Panel" }));
}
var Ue = "div";
function He2(e8, t11) {
  let { transition: o18 = false, ...a20 } = e8, [{ dialogState: l14, unmount: i15 }] = O6("Dialog.Backdrop"), p6 = (0, import_react93.useMemo)(() => ({ open: l14 === 0 }), [l14]), d14 = { ref: t11, "aria-hidden": true }, s13 = o18 ? Fe3 : import_react93.Fragment, f21 = o18 ? { unmount: i15 } : {}, u16 = L();
  return import_react93.default.createElement(s13, { ...f21 }, u16({ ourProps: d14, theirProps: a20, slot: p6, defaultTag: Ue, name: "Dialog.Backdrop" }));
}
var Ne = "h2";
function We(e8, t11) {
  let o18 = (0, import_react50.useId)(), { id: a20 = `headlessui-dialog-title-${o18}`, ...l14 } = e8, [{ dialogState: i15, setTitleId: p6 }] = O6("Dialog.Title"), d14 = y(t11);
  (0, import_react93.useEffect)(() => (p6(a20), () => p6(null)), [a20, p6]);
  let s13 = (0, import_react93.useMemo)(() => ({ open: i15 === 0 }), [i15]), f21 = { ref: d14, id: a20 };
  return L()({ ourProps: f21, theirProps: l14, slot: s13, defaultTag: Ne, name: "Dialog.Title" });
}
var $e = K(ke2);
var je = K(Be);
var Dt2 = K(He2);
var Ye = K(We);
var Pt2 = H4;
var yt = Object.assign($e, { Panel: je, Title: Ye, Description: H4 });

// node_modules/@headlessui/react/dist/components/disclosure/disclosure.js
var import_react95 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/start-transition.js
var import_react94 = __toESM(require_react(), 1);
var t10;
var a16 = (t10 = import_react94.default.startTransition) != null ? t10 : function(i15) {
  i15();
};

// node_modules/@headlessui/react/dist/components/disclosure/disclosure.js
var ce3 = ((l14) => (l14[l14.Open = 0] = "Open", l14[l14.Closed = 1] = "Closed", l14))(ce3 || {});
var de4 = ((n13) => (n13[n13.ToggleDisclosure = 0] = "ToggleDisclosure", n13[n13.CloseDisclosure = 1] = "CloseDisclosure", n13[n13.SetButtonId = 2] = "SetButtonId", n13[n13.SetPanelId = 3] = "SetPanelId", n13[n13.SetButtonElement = 4] = "SetButtonElement", n13[n13.SetPanelElement = 5] = "SetPanelElement", n13))(de4 || {});
var Te3 = { [0]: (e8) => ({ ...e8, disclosureState: u(e8.disclosureState, { [0]: 1, [1]: 0 }) }), [1]: (e8) => e8.disclosureState === 1 ? e8 : { ...e8, disclosureState: 1 }, [2](e8, t11) {
  return e8.buttonId === t11.buttonId ? e8 : { ...e8, buttonId: t11.buttonId };
}, [3](e8, t11) {
  return e8.panelId === t11.panelId ? e8 : { ...e8, panelId: t11.panelId };
}, [4](e8, t11) {
  return e8.buttonElement === t11.element ? e8 : { ...e8, buttonElement: t11.element };
}, [5](e8, t11) {
  return e8.panelElement === t11.element ? e8 : { ...e8, panelElement: t11.element };
} };
var _5 = (0, import_react95.createContext)(null);
_5.displayName = "DisclosureContext";
function M7(e8) {
  let t11 = (0, import_react95.useContext)(_5);
  if (t11 === null) {
    let l14 = new Error(`<${e8} /> is missing a parent <Disclosure /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(l14, M7), l14;
  }
  return t11;
}
var F4 = (0, import_react95.createContext)(null);
F4.displayName = "DisclosureAPIContext";
function J4(e8) {
  let t11 = (0, import_react95.useContext)(F4);
  if (t11 === null) {
    let l14 = new Error(`<${e8} /> is missing a parent <Disclosure /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(l14, J4), l14;
  }
  return t11;
}
var H9 = (0, import_react95.createContext)(null);
H9.displayName = "DisclosurePanelContext";
function fe3() {
  return (0, import_react95.useContext)(H9);
}
function me2(e8, t11) {
  return u(t11.type, Te3, e8, t11);
}
var De2 = import_react95.Fragment;
function ye4(e8, t11) {
  let { defaultOpen: l14 = false, ...p6 } = e8, i15 = (0, import_react95.useRef)(null), c15 = y(t11, T2((a20) => {
    i15.current = a20;
  }, e8.as === void 0 || e8.as === import_react95.Fragment)), n13 = (0, import_react95.useReducer)(me2, { disclosureState: l14 ? 0 : 1, buttonElement: null, panelElement: null, buttonId: null, panelId: null }), [{ disclosureState: o18, buttonId: r17 }, m10] = n13, s13 = o5((a20) => {
    m10({ type: 1 });
    let d14 = o2(i15);
    if (!d14 || !r17) return;
    let T10 = (() => a20 ? a20 instanceof HTMLElement ? a20 : a20.current instanceof HTMLElement ? a20.current : d14.getElementById(r17) : d14.getElementById(r17))();
    T10 == null || T10.focus();
  }), E13 = (0, import_react95.useMemo)(() => ({ close: s13 }), [s13]), f21 = (0, import_react95.useMemo)(() => ({ open: o18 === 0, close: s13 }), [o18, s13]), D8 = { ref: c15 }, S6 = L();
  return import_react95.default.createElement(_5.Provider, { value: n13 }, import_react95.default.createElement(F4.Provider, { value: E13 }, import_react95.default.createElement(C4, { value: s13 }, import_react95.default.createElement(c8, { value: u(o18, { [0]: i11.Open, [1]: i11.Closed }) }, S6({ ourProps: D8, theirProps: p6, slot: f21, defaultTag: De2, name: "Disclosure" })))));
}
var Pe = "button";
function Ee(e8, t11) {
  let l14 = (0, import_react50.useId)(), { id: p6 = `headlessui-disclosure-button-${l14}`, disabled: i15 = false, autoFocus: c15 = false, ...n13 } = e8, [o18, r17] = M7("Disclosure.Button"), m10 = fe3(), s13 = m10 === null ? false : m10 === o18.panelId, E13 = (0, import_react95.useRef)(null), f21 = y(E13, t11, o5((u16) => {
    if (!s13) return r17({ type: 4, element: u16 });
  }));
  (0, import_react95.useEffect)(() => {
    if (!s13) return r17({ type: 2, buttonId: p6 }), () => {
      r17({ type: 2, buttonId: null });
    };
  }, [p6, r17, s13]);
  let D8 = o5((u16) => {
    var g6;
    if (s13) {
      if (o18.disclosureState === 1) return;
      switch (u16.key) {
        case o9.Space:
        case o9.Enter:
          u16.preventDefault(), u16.stopPropagation(), r17({ type: 0 }), (g6 = o18.buttonElement) == null || g6.focus();
          break;
      }
    } else switch (u16.key) {
      case o9.Space:
      case o9.Enter:
        u16.preventDefault(), u16.stopPropagation(), r17({ type: 0 });
        break;
    }
  }), S6 = o5((u16) => {
    switch (u16.key) {
      case o9.Space:
        u16.preventDefault();
        break;
    }
  }), a20 = o5((u16) => {
    var g6;
    r4(u16.currentTarget) || i15 || (s13 ? (r17({ type: 0 }), (g6 = o18.buttonElement) == null || g6.focus()) : r17({ type: 0 }));
  }), { isFocusVisible: d14, focusProps: T10 } = $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: c15 }), { isHovered: b9, hoverProps: h8 } = $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: i15 }), { pressed: U7, pressProps: N4 } = w({ disabled: i15 }), X5 = (0, import_react95.useMemo)(() => ({ open: o18.disclosureState === 0, hover: b9, active: U7, disabled: i15, focus: d14, autofocus: c15 }), [o18, b9, U7, d14, i15, c15]), k5 = e6(e8, o18.buttonElement), V5 = s13 ? _({ ref: f21, type: k5, disabled: i15 || void 0, autoFocus: c15, onKeyDown: D8, onClick: a20 }, T10, h8, N4) : _({ ref: f21, id: p6, type: k5, "aria-expanded": o18.disclosureState === 0, "aria-controls": o18.panelElement ? o18.panelId : void 0, disabled: i15 || void 0, autoFocus: c15, onKeyDown: D8, onKeyUp: S6, onClick: a20 }, T10, h8, N4);
  return L()({ ourProps: V5, theirProps: n13, slot: X5, defaultTag: Pe, name: "Disclosure.Button" });
}
var Se2 = "div";
var ge2 = O.RenderStrategy | O.Static;
function Ae3(e8, t11) {
  let l14 = (0, import_react50.useId)(), { id: p6 = `headlessui-disclosure-panel-${l14}`, transition: i15 = false, ...c15 } = e8, [n13, o18] = M7("Disclosure.Panel"), { close: r17 } = J4("Disclosure.Panel"), [m10, s13] = (0, import_react95.useState)(null), E13 = y(t11, o5((b9) => {
    a16(() => o18({ type: 5, element: b9 }));
  }), s13);
  (0, import_react95.useEffect)(() => (o18({ type: 3, panelId: p6 }), () => {
    o18({ type: 3, panelId: null });
  }), [p6, o18]);
  let f21 = u12(), [D8, S6] = x3(i15, m10, f21 !== null ? (f21 & i11.Open) === i11.Open : n13.disclosureState === 0), a20 = (0, import_react95.useMemo)(() => ({ open: n13.disclosureState === 0, close: r17 }), [n13.disclosureState, r17]), d14 = { ref: E13, id: p6, ...R4(S6) }, T10 = L();
  return import_react95.default.createElement(s7, null, import_react95.default.createElement(H9.Provider, { value: n13.panelId }, T10({ ourProps: d14, theirProps: c15, slot: a20, defaultTag: Se2, features: ge2, visible: D8, name: "Disclosure.Panel" })));
}
var be2 = K(ye4);
var Ce = K(Ee);
var Re3 = K(Ae3);
var je2 = Object.assign(be2, { Button: Ce, Panel: Re3 });

// node_modules/@headlessui/react/dist/components/field/field.js
var import_react96 = __toESM(require_react(), 1);
var _6 = "div";
function c13(d14, l14) {
  let t11 = `headlessui-control-${(0, import_react50.useId)()}`, [s13, p6] = K2(), [n13, a20] = w3(), m10 = a3(), { disabled: e8 = m10 || false, ...i15 } = d14, o18 = (0, import_react96.useMemo)(() => ({ disabled: e8 }), [e8]), F6 = { ref: l14, disabled: e8 || void 0, "aria-disabled": e8 || void 0 }, T10 = L();
  return import_react96.default.createElement(l, { value: e8 }, import_react96.default.createElement(p6, { value: s13 }, import_react96.default.createElement(a20, { value: n13 }, import_react96.default.createElement(f6, { id: t11 }, T10({ ourProps: F6, theirProps: { ...i15, children: import_react96.default.createElement(W, null, typeof i15.children == "function" ? i15.children(o18) : i15.children) }, slot: o18, defaultTag: _6, name: "Field" })))));
}
var H10 = K(c13);

// node_modules/@headlessui/react/dist/components/fieldset/fieldset.js
var import_react98 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/hooks/use-resolved-tag.js
var import_react97 = __toESM(require_react(), 1);
function l11(t11) {
  let e8 = typeof t11 == "string" ? t11 : void 0, [s13, o18] = (0, import_react97.useState)(e8);
  return [e8 != null ? e8 : s13, (0, import_react97.useCallback)((n13) => {
    e8 || n13 instanceof HTMLElement && o18(n13.tagName.toLowerCase());
  }, [e8])];
}

// node_modules/@headlessui/react/dist/components/fieldset/fieldset.js
var d12 = "fieldset";
function _7(t11, a20) {
  var s13;
  let i15 = a3(), { disabled: e8 = i15 || false, ...p6 } = t11, [n13, T10] = l11((s13 = t11.as) != null ? s13 : d12), l14 = y(a20, T10), [r17, f21] = K2(), m10 = (0, import_react98.useMemo)(() => ({ disabled: e8 }), [e8]), y7 = n13 === "fieldset" ? { ref: l14, "aria-labelledby": r17, disabled: e8 || void 0 } : { ref: l14, role: "group", "aria-labelledby": r17, "aria-disabled": e8 || void 0 }, F6 = L();
  return import_react98.default.createElement(l, { value: e8 }, import_react98.default.createElement(f21, null, F6({ ourProps: y7, theirProps: p6, slot: m10, defaultTag: d12, name: "Fieldset" })));
}
var G5 = K(_7);

// node_modules/@headlessui/react/dist/components/input/input.js
var import_react99 = __toESM(require_react(), 1);
var x8 = "input";
function h6(p6, s13) {
  let a20 = (0, import_react50.useId)(), l14 = u4(), i15 = a3(), { id: d14 = l14 || `headlessui-input-${a20}`, disabled: e8 = i15 || false, autoFocus: o18 = false, invalid: t11 = false, ...u16 } = p6, f21 = I(), m10 = U2(), { isFocused: r17, focusProps: T10 } = $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: o18 }), { isHovered: n13, hoverProps: b9 } = $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: e8 }), y7 = _({ ref: s13, id: d14, "aria-labelledby": f21, "aria-describedby": m10, "aria-invalid": t11 ? "true" : void 0, disabled: e8 || void 0, autoFocus: o18 }, T10, b9), I6 = (0, import_react99.useMemo)(() => ({ disabled: e8, invalid: t11, hover: n13, focus: r17, autofocus: o18 }), [e8, t11, n13, r17, o18]);
  return L()({ ourProps: y7, theirProps: u16, slot: I6, defaultTag: x8, name: "Input" });
}
var S5 = K(h6);

// node_modules/@headlessui/react/dist/components/legend/legend.js
var import_react100 = __toESM(require_react(), 1);
function o16(t11, n13) {
  return import_react100.default.createElement(Q, { as: "div", ref: n13, ...t11 });
}
var d13 = K(o16);

// node_modules/@headlessui/react/dist/components/listbox/listbox.js
var import_react103 = __toESM(require_react(), 1);
var import_react_dom9 = __toESM(require_react_dom(), 1);

// node_modules/@headlessui/react/dist/hooks/use-did-element-move.js
var import_react101 = __toESM(require_react(), 1);
function s9(n13, t11) {
  let e8 = (0, import_react101.useRef)({ left: 0, top: 0 });
  if (n(() => {
    if (!t11) return;
    let r17 = t11.getBoundingClientRect();
    r17 && (e8.current = r17);
  }, [n13, t11]), t11 == null || !n13 || t11 === document.activeElement) return false;
  let o18 = t11.getBoundingClientRect();
  return o18.top !== e8.current.top || o18.left !== e8.current.left;
}

// node_modules/@headlessui/react/dist/hooks/use-text-value.js
var import_react102 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/utils/get-text-value.js
var a18 = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
function o17(e8) {
  var r17, i15;
  let n13 = (r17 = e8.innerText) != null ? r17 : "", t11 = e8.cloneNode(true);
  if (!(t11 instanceof HTMLElement)) return n13;
  let u16 = false;
  for (let f21 of t11.querySelectorAll('[hidden],[aria-hidden],[role="img"]')) f21.remove(), u16 = true;
  let l14 = u16 ? (i15 = t11.innerText) != null ? i15 : "" : n13;
  return a18.test(l14) && (l14 = l14.replace(a18, "")), l14;
}
function g5(e8) {
  let n13 = e8.getAttribute("aria-label");
  if (typeof n13 == "string") return n13.trim();
  let t11 = e8.getAttribute("aria-labelledby");
  if (t11) {
    let u16 = t11.split(" ").map((l14) => {
      let r17 = document.getElementById(l14);
      if (r17) {
        let i15 = r17.getAttribute("aria-label");
        return typeof i15 == "string" ? i15.trim() : o17(r17).trim();
      }
      return null;
    }).filter(Boolean);
    if (u16.length > 0) return u16.join(", ");
  }
  return o17(e8).trim();
}

// node_modules/@headlessui/react/dist/hooks/use-text-value.js
function s10(c15) {
  let t11 = (0, import_react102.useRef)(""), r17 = (0, import_react102.useRef)("");
  return o5(() => {
    let e8 = c15.current;
    if (!e8) return "";
    let u16 = e8.innerText;
    if (t11.current === u16) return r17.current;
    let n13 = g5(e8).trim().toLowerCase();
    return t11.current = u16, r17.current = n13, n13;
  });
}

// node_modules/@headlessui/react/dist/components/listbox/listbox.js
var gt = ((o18) => (o18[o18.Open = 0] = "Open", o18[o18.Closed = 1] = "Closed", o18))(gt || {});
var Lt2 = ((o18) => (o18[o18.Single = 0] = "Single", o18[o18.Multi = 1] = "Multi", o18))(Lt2 || {});
var St2 = ((o18) => (o18[o18.Pointer = 0] = "Pointer", o18[o18.Other = 1] = "Other", o18))(St2 || {});
var Et2 = ((n13) => (n13[n13.OpenListbox = 0] = "OpenListbox", n13[n13.CloseListbox = 1] = "CloseListbox", n13[n13.GoToOption = 2] = "GoToOption", n13[n13.Search = 3] = "Search", n13[n13.ClearSearch = 4] = "ClearSearch", n13[n13.RegisterOption = 5] = "RegisterOption", n13[n13.UnregisterOption = 6] = "UnregisterOption", n13[n13.SetButtonElement = 7] = "SetButtonElement", n13[n13.SetOptionsElement = 8] = "SetOptionsElement", n13))(Et2 || {});
function Te4(e8, i15 = (o18) => o18) {
  let o18 = e8.activeOptionIndex !== null ? e8.options[e8.activeOptionIndex] : null, r17 = _3(i15(e8.options.slice()), (m10) => m10.dataRef.current.domRef.current), a20 = o18 ? r17.indexOf(o18) : null;
  return a20 === -1 && (a20 = null), { options: r17, activeOptionIndex: a20 };
}
var Pt3 = { [1](e8) {
  return e8.dataRef.current.disabled || e8.listboxState === 1 ? e8 : { ...e8, activeOptionIndex: null, listboxState: 1, __demoMode: false };
}, [0](e8) {
  if (e8.dataRef.current.disabled || e8.listboxState === 0) return e8;
  let i15 = e8.activeOptionIndex, { isSelected: o18 } = e8.dataRef.current, r17 = e8.options.findIndex((a20) => o18(a20.dataRef.current.value));
  return r17 !== -1 && (i15 = r17), { ...e8, listboxState: 0, activeOptionIndex: i15, __demoMode: false };
}, [2](e8, i15) {
  var m10, O8, d14, p6, n13;
  if (e8.dataRef.current.disabled || e8.listboxState === 1) return e8;
  let o18 = { ...e8, searchQuery: "", activationTrigger: (m10 = i15.trigger) != null ? m10 : 1, __demoMode: false };
  if (i15.focus === c9.Nothing) return { ...o18, activeOptionIndex: null };
  if (i15.focus === c9.Specific) return { ...o18, activeOptionIndex: e8.options.findIndex((u16) => u16.id === i15.id) };
  if (i15.focus === c9.Previous) {
    let u16 = e8.activeOptionIndex;
    if (u16 !== null) {
      let P7 = e8.options[u16].dataRef.current.domRef, t11 = f14(i15, { resolveItems: () => e8.options, resolveActiveIndex: () => e8.activeOptionIndex, resolveId: (s13) => s13.id, resolveDisabled: (s13) => s13.dataRef.current.disabled });
      if (t11 !== null) {
        let s13 = e8.options[t11].dataRef.current.domRef;
        if (((O8 = P7.current) == null ? void 0 : O8.previousElementSibling) === s13.current || ((d14 = s13.current) == null ? void 0 : d14.previousElementSibling) === null) return { ...o18, activeOptionIndex: t11 };
      }
    }
  } else if (i15.focus === c9.Next) {
    let u16 = e8.activeOptionIndex;
    if (u16 !== null) {
      let P7 = e8.options[u16].dataRef.current.domRef, t11 = f14(i15, { resolveItems: () => e8.options, resolveActiveIndex: () => e8.activeOptionIndex, resolveId: (s13) => s13.id, resolveDisabled: (s13) => s13.dataRef.current.disabled });
      if (t11 !== null) {
        let s13 = e8.options[t11].dataRef.current.domRef;
        if (((p6 = P7.current) == null ? void 0 : p6.nextElementSibling) === s13.current || ((n13 = s13.current) == null ? void 0 : n13.nextElementSibling) === null) return { ...o18, activeOptionIndex: t11 };
      }
    }
  }
  let r17 = Te4(e8), a20 = f14(i15, { resolveItems: () => r17.options, resolveActiveIndex: () => r17.activeOptionIndex, resolveId: (u16) => u16.id, resolveDisabled: (u16) => u16.dataRef.current.disabled });
  return { ...o18, ...r17, activeOptionIndex: a20 };
}, [3]: (e8, i15) => {
  if (e8.dataRef.current.disabled || e8.listboxState === 1) return e8;
  let r17 = e8.searchQuery !== "" ? 0 : 1, a20 = e8.searchQuery + i15.value.toLowerCase(), O8 = (e8.activeOptionIndex !== null ? e8.options.slice(e8.activeOptionIndex + r17).concat(e8.options.slice(0, e8.activeOptionIndex + r17)) : e8.options).find((p6) => {
    var n13;
    return !p6.dataRef.current.disabled && ((n13 = p6.dataRef.current.textValue) == null ? void 0 : n13.startsWith(a20));
  }), d14 = O8 ? e8.options.indexOf(O8) : -1;
  return d14 === -1 || d14 === e8.activeOptionIndex ? { ...e8, searchQuery: a20 } : { ...e8, searchQuery: a20, activeOptionIndex: d14, activationTrigger: 1 };
}, [4](e8) {
  return e8.dataRef.current.disabled || e8.listboxState === 1 || e8.searchQuery === "" ? e8 : { ...e8, searchQuery: "" };
}, [5]: (e8, i15) => {
  let o18 = { id: i15.id, dataRef: i15.dataRef }, r17 = Te4(e8, (a20) => [...a20, o18]);
  return e8.activeOptionIndex === null && e8.dataRef.current.isSelected(i15.dataRef.current.value) && (r17.activeOptionIndex = r17.options.indexOf(o18)), { ...e8, ...r17 };
}, [6]: (e8, i15) => {
  let o18 = Te4(e8, (r17) => {
    let a20 = r17.findIndex((m10) => m10.id === i15.id);
    return a20 !== -1 && r17.splice(a20, 1), r17;
  });
  return { ...e8, ...o18, activationTrigger: 1 };
}, [7]: (e8, i15) => e8.buttonElement === i15.element ? e8 : { ...e8, buttonElement: i15.element }, [8]: (e8, i15) => e8.optionsElement === i15.element ? e8 : { ...e8, optionsElement: i15.element } };
var me3 = (0, import_react103.createContext)(null);
me3.displayName = "ListboxActionsContext";
function Y2(e8) {
  let i15 = (0, import_react103.useContext)(me3);
  if (i15 === null) {
    let o18 = new Error(`<${e8} /> is missing a parent <Listbox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(o18, Y2), o18;
  }
  return i15;
}
var Z2 = (0, import_react103.createContext)(null);
Z2.displayName = "ListboxDataContext";
function X3(e8) {
  let i15 = (0, import_react103.useContext)(Z2);
  if (i15 === null) {
    let o18 = new Error(`<${e8} /> is missing a parent <Listbox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(o18, X3), o18;
  }
  return i15;
}
function Rt2(e8, i15) {
  return u(i15.type, Pt3, e8, i15);
}
var At2 = import_react103.Fragment;
function ht2(e8, i15) {
  var xe3;
  let o18 = a3(), { value: r17, defaultValue: a20, form: m10, name: O8, onChange: d14, by: p6, invalid: n13 = false, disabled: u16 = o18 || false, horizontal: P7 = false, multiple: t11 = false, __demoMode: s13 = false, ...C9 } = e8;
  const w11 = P7 ? "horizontal" : "vertical";
  let F6 = y(i15), R8 = l2(a20), [y7 = t11 ? [] : void 0, g6] = T(r17, d14, R8), [A6, x11] = (0, import_react103.useReducer)(Rt2, { dataRef: (0, import_react103.createRef)(), listboxState: s13 ? 0 : 1, options: [], searchQuery: "", activeOptionIndex: null, activationTrigger: 1, optionsVisible: false, buttonElement: null, optionsElement: null, __demoMode: s13 }), k5 = (0, import_react103.useRef)({ static: false, hold: false }), M8 = (0, import_react103.useRef)(/* @__PURE__ */ new Map()), D8 = u8(p6), T10 = (0, import_react103.useCallback)((f21) => u(c15.mode, { [1]: () => y7.some((S6) => D8(S6, f21)), [0]: () => D8(y7, f21) }), [y7]), c15 = (0, import_react103.useMemo)(() => ({ ...A6, value: y7, disabled: u16, invalid: n13, mode: t11 ? 1 : 0, orientation: w11, compare: D8, isSelected: T10, optionsPropsRef: k5, listRef: M8 }), [y7, u16, n13, t11, A6, M8]);
  n(() => {
    A6.dataRef.current = c15;
  }, [c15]);
  let U7 = c15.listboxState === 0;
  R3(U7, [c15.buttonElement, c15.optionsElement], (f21, S6) => {
    var I6;
    x11({ type: 1 }), A2(S6, h5.Loose) || (f21.preventDefault(), (I6 = c15.buttonElement) == null || I6.focus());
  });
  let L6 = (0, import_react103.useMemo)(() => ({ open: c15.listboxState === 0, disabled: u16, invalid: n13, value: y7 }), [c15, u16, y7, n13]), H14 = o5((f21) => {
    let S6 = c15.options.find((I6) => I6.id === f21);
    S6 && j9(S6.dataRef.current.value);
  }), ee4 = o5(() => {
    if (c15.activeOptionIndex !== null) {
      let { dataRef: f21, id: S6 } = c15.options[c15.activeOptionIndex];
      j9(f21.current.value), x11({ type: 2, focus: c9.Specific, id: S6 });
    }
  }), te6 = o5(() => x11({ type: 0 })), oe4 = o5(() => x11({ type: 1 })), K4 = p(), ne3 = o5((f21, S6, I6) => {
    K4.dispose(), K4.microTask(() => f21 === c9.Specific ? x11({ type: 2, focus: c9.Specific, id: S6, trigger: I6 }) : x11({ type: 2, focus: f21, trigger: I6 }));
  }), ie5 = o5((f21, S6) => (x11({ type: 5, id: f21, dataRef: S6 }), () => x11({ type: 6, id: f21 }))), j9 = o5((f21) => u(c15.mode, { [0]() {
    return g6 == null ? void 0 : g6(f21);
  }, [1]() {
    let S6 = c15.value.slice(), I6 = S6.findIndex((Ae4) => D8(Ae4, f21));
    return I6 === -1 ? S6.push(f21) : S6.splice(I6, 1), g6 == null ? void 0 : g6(S6);
  } })), re4 = o5((f21) => x11({ type: 3, value: f21 })), le4 = o5(() => x11({ type: 4 })), J7 = o5((f21) => {
    x11({ type: 7, element: f21 });
  }), $5 = o5((f21) => {
    x11({ type: 8, element: f21 });
  }), l14 = (0, import_react103.useMemo)(() => ({ onChange: j9, registerOption: ie5, goToOption: ne3, closeListbox: oe4, openListbox: te6, selectActiveOption: ee4, selectOption: H14, search: re4, clearSearch: le4, setButtonElement: J7, setOptionsElement: $5 }), []), [_8, G7] = K2({ inherit: true }), ae6 = { ref: F6 }, Pe3 = (0, import_react103.useCallback)(() => {
    if (R8 !== void 0) return g6 == null ? void 0 : g6(R8);
  }, [g6, R8]), Re5 = L();
  return import_react103.default.createElement(G7, { value: _8, props: { htmlFor: (xe3 = c15.buttonElement) == null ? void 0 : xe3.id }, slot: { open: c15.listboxState === 0, disabled: u16 } }, import_react103.default.createElement(Me, null, import_react103.default.createElement(me3.Provider, { value: l14 }, import_react103.default.createElement(Z2.Provider, { value: c15 }, import_react103.default.createElement(c8, { value: u(c15.listboxState, { [0]: i11.Open, [1]: i11.Closed }) }, O8 != null && y7 != null && import_react103.default.createElement(j2, { disabled: u16, data: { [O8]: y7 }, form: m10, onReset: Pe3 }), Re5({ ourProps: ae6, theirProps: C9, slot: L6, defaultTag: At2, name: "Listbox" }))))));
}
var Dt3 = "button";
function _t2(e8, i15) {
  var U7;
  let o18 = X3("Listbox.Button"), r17 = Y2("Listbox.Button"), a20 = (0, import_react50.useId)(), m10 = u4(), { id: O8 = m10 || `headlessui-listbox-button-${a20}`, disabled: d14 = o18.disabled || false, autoFocus: p6 = false, ...n13 } = e8, u16 = y(i15, ye(), r17.setButtonElement), P7 = Fe2(), t11 = o5((L6) => {
    switch (L6.key) {
      case o9.Enter:
        p2(L6.currentTarget);
        break;
      case o9.Space:
      case o9.ArrowDown:
        L6.preventDefault(), (0, import_react_dom9.flushSync)(() => r17.openListbox()), o18.value || r17.goToOption(c9.First);
        break;
      case o9.ArrowUp:
        L6.preventDefault(), (0, import_react_dom9.flushSync)(() => r17.openListbox()), o18.value || r17.goToOption(c9.Last);
        break;
    }
  }), s13 = o5((L6) => {
    switch (L6.key) {
      case o9.Space:
        L6.preventDefault();
        break;
    }
  }), C9 = o5((L6) => {
    var H14;
    if (r4(L6.currentTarget)) return L6.preventDefault();
    o18.listboxState === 0 ? ((0, import_react_dom9.flushSync)(() => r17.closeListbox()), (H14 = o18.buttonElement) == null || H14.focus({ preventScroll: true })) : (L6.preventDefault(), r17.openListbox());
  }), w11 = o5((L6) => L6.preventDefault()), F6 = I([O8]), R8 = U2(), { isFocusVisible: y7, focusProps: g6 } = $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: p6 }), { isHovered: A6, hoverProps: x11 } = $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: d14 }), { pressed: k5, pressProps: M8 } = w({ disabled: d14 }), D8 = (0, import_react103.useMemo)(() => ({ open: o18.listboxState === 0, active: k5 || o18.listboxState === 0, disabled: d14, invalid: o18.invalid, value: o18.value, hover: A6, focus: y7, autofocus: p6 }), [o18.listboxState, o18.value, d14, A6, y7, k5, o18.invalid, p6]), T10 = _(P7(), { ref: u16, id: O8, type: e6(e8, o18.buttonElement), "aria-haspopup": "listbox", "aria-controls": (U7 = o18.optionsElement) == null ? void 0 : U7.id, "aria-expanded": o18.listboxState === 0, "aria-labelledby": F6, "aria-describedby": R8, disabled: d14 || void 0, autoFocus: p6, onKeyDown: t11, onKeyUp: s13, onKeyPress: w11, onClick: C9 }, g6, x11, M8);
  return L()({ ourProps: T10, theirProps: n13, slot: D8, defaultTag: Dt3, name: "Listbox.Button" });
}
var Ee2 = (0, import_react103.createContext)(false);
var It2 = "div";
var Ct = O.RenderStrategy | O.Static;
function Ft2(e8, i15) {
  var J7, $5;
  let o18 = (0, import_react50.useId)(), { id: r17 = `headlessui-listbox-options-${o18}`, anchor: a20, portal: m10 = false, modal: O8 = true, transition: d14 = false, ...p6 } = e8, n13 = xe(a20), [u16, P7] = (0, import_react103.useState)(null);
  n13 && (m10 = true);
  let t11 = X3("Listbox.Options"), s13 = Y2("Listbox.Options"), C9 = n9(t11.buttonElement), w11 = n9(t11.optionsElement), F6 = u12(), [R8, y7] = x3(d14, u16, F6 !== null ? (F6 & i11.Open) === i11.Open : t11.listboxState === 0);
  m6(R8, t11.buttonElement, s13.closeListbox);
  let g6 = t11.__demoMode ? false : O8 && t11.listboxState === 0;
  f11(g6, w11);
  let A6 = t11.__demoMode ? false : O8 && t11.listboxState === 0;
  y3(A6, { allowed: (0, import_react103.useCallback)(() => [t11.buttonElement, t11.optionsElement], [t11.buttonElement, t11.optionsElement]) });
  let x11 = t11.listboxState !== 0, M8 = s9(x11, t11.buttonElement) ? false : R8, D8 = R8 && t11.listboxState === 1, T10 = l7(D8, t11.value), c15 = o5((l14) => t11.compare(T10, l14)), U7 = (0, import_react103.useMemo)(() => {
    var _8;
    if (n13 == null || !((_8 = n13 == null ? void 0 : n13.to) != null && _8.includes("selection"))) return null;
    let l14 = t11.options.findIndex((G7) => c15(G7.dataRef.current.value));
    return l14 === -1 && (l14 = 0), l14;
  }, [n13, t11.options]), L6 = (() => {
    if (n13 == null) return;
    if (U7 === null) return { ...n13, inner: void 0 };
    let l14 = Array.from(t11.listRef.current.values());
    return { ...n13, inner: { listRef: { current: l14 }, index: U7 } };
  })(), [H14, ee4] = Re(L6), te6 = be(), oe4 = y(i15, n13 ? H14 : null, s13.setOptionsElement, P7), K4 = p();
  (0, import_react103.useEffect)(() => {
    var _8;
    let l14 = t11.optionsElement;
    l14 && t11.listboxState === 0 && l14 !== ((_8 = o2(l14)) == null ? void 0 : _8.activeElement) && (l14 == null || l14.focus({ preventScroll: true }));
  }, [t11.listboxState, t11.optionsElement]);
  let ne3 = o5((l14) => {
    var _8, G7;
    switch (K4.dispose(), l14.key) {
      case o9.Space:
        if (t11.searchQuery !== "") return l14.preventDefault(), l14.stopPropagation(), s13.search(l14.key);
      case o9.Enter:
        if (l14.preventDefault(), l14.stopPropagation(), t11.activeOptionIndex !== null) {
          let { dataRef: ae6 } = t11.options[t11.activeOptionIndex];
          s13.onChange(ae6.current.value);
        }
        t11.mode === 0 && ((0, import_react_dom9.flushSync)(() => s13.closeListbox()), (_8 = t11.buttonElement) == null || _8.focus({ preventScroll: true }));
        break;
      case u(t11.orientation, { vertical: o9.ArrowDown, horizontal: o9.ArrowRight }):
        return l14.preventDefault(), l14.stopPropagation(), s13.goToOption(c9.Next);
      case u(t11.orientation, { vertical: o9.ArrowUp, horizontal: o9.ArrowLeft }):
        return l14.preventDefault(), l14.stopPropagation(), s13.goToOption(c9.Previous);
      case o9.Home:
      case o9.PageUp:
        return l14.preventDefault(), l14.stopPropagation(), s13.goToOption(c9.First);
      case o9.End:
      case o9.PageDown:
        return l14.preventDefault(), l14.stopPropagation(), s13.goToOption(c9.Last);
      case o9.Escape:
        l14.preventDefault(), l14.stopPropagation(), (0, import_react_dom9.flushSync)(() => s13.closeListbox()), (G7 = t11.buttonElement) == null || G7.focus({ preventScroll: true });
        return;
      case o9.Tab:
        l14.preventDefault(), l14.stopPropagation(), (0, import_react_dom9.flushSync)(() => s13.closeListbox()), j3(t11.buttonElement, l14.shiftKey ? F2.Previous : F2.Next);
        break;
      default:
        l14.key.length === 1 && (s13.search(l14.key), K4.setTimeout(() => s13.clearSearch(), 350));
        break;
    }
  }), ie5 = (J7 = t11.buttonElement) == null ? void 0 : J7.id, j9 = (0, import_react103.useMemo)(() => ({ open: t11.listboxState === 0 }), [t11.listboxState]), re4 = _(n13 ? te6() : {}, { id: r17, ref: oe4, "aria-activedescendant": t11.activeOptionIndex === null || ($5 = t11.options[t11.activeOptionIndex]) == null ? void 0 : $5.id, "aria-multiselectable": t11.mode === 1 ? true : void 0, "aria-labelledby": ie5, "aria-orientation": t11.orientation, onKeyDown: ne3, role: "listbox", tabIndex: t11.listboxState === 0 ? 0 : void 0, style: { ...p6.style, ...ee4, "--button-width": d3(t11.buttonElement, true).width }, ...R4(y7) }), le4 = L();
  return import_react103.default.createElement(oe, { enabled: m10 ? e8.static || R8 : false, ownerDocument: C9 }, import_react103.default.createElement(Z2.Provider, { value: t11.mode === 1 ? t11 : { ...t11, isSelected: c15 } }, le4({ ourProps: re4, theirProps: p6, slot: j9, defaultTag: It2, features: Ct, visible: M8, name: "Listbox.Options" })));
}
var Mt2 = "div";
function Bt2(e8, i15) {
  let o18 = (0, import_react50.useId)(), { id: r17 = `headlessui-listbox-option-${o18}`, disabled: a20 = false, value: m10, ...O8 } = e8, d14 = (0, import_react103.useContext)(Ee2) === true, p6 = X3("Listbox.Option"), n13 = Y2("Listbox.Option"), u16 = p6.activeOptionIndex !== null ? p6.options[p6.activeOptionIndex].id === r17 : false, P7 = p6.isSelected(m10), t11 = (0, import_react103.useRef)(null), s13 = s10(t11), C9 = s3({ disabled: a20, value: m10, domRef: t11, get textValue() {
    return s13();
  } }), w11 = y(i15, t11, (T10) => {
    T10 ? p6.listRef.current.set(r17, T10) : p6.listRef.current.delete(r17);
  });
  n(() => {
    if (!p6.__demoMode && p6.listboxState === 0 && u16 && p6.activationTrigger !== 0) return o3().requestAnimationFrame(() => {
      var T10, c15;
      (c15 = (T10 = t11.current) == null ? void 0 : T10.scrollIntoView) == null || c15.call(T10, { block: "nearest" });
    });
  }, [t11, u16, p6.__demoMode, p6.listboxState, p6.activationTrigger, p6.activeOptionIndex]), n(() => {
    if (!d14) return n13.registerOption(r17, C9);
  }, [C9, r17, d14]);
  let F6 = o5((T10) => {
    var c15;
    if (a20) return T10.preventDefault();
    n13.onChange(m10), p6.mode === 0 && ((0, import_react_dom9.flushSync)(() => n13.closeListbox()), (c15 = p6.buttonElement) == null || c15.focus({ preventScroll: true }));
  }), R8 = o5(() => {
    if (a20) return n13.goToOption(c9.Nothing);
    n13.goToOption(c9.Specific, r17);
  }), y7 = u10(), g6 = o5((T10) => {
    y7.update(T10), !a20 && (u16 || n13.goToOption(c9.Specific, r17, 0));
  }), A6 = o5((T10) => {
    y7.wasMoved(T10) && (a20 || u16 || n13.goToOption(c9.Specific, r17, 0));
  }), x11 = o5((T10) => {
    y7.wasMoved(T10) && (a20 || u16 && n13.goToOption(c9.Nothing));
  }), k5 = (0, import_react103.useMemo)(() => ({ active: u16, focus: u16, selected: P7, disabled: a20, selectedOption: P7 && d14 }), [u16, P7, a20, d14]), M8 = d14 ? {} : { id: r17, ref: w11, role: "option", tabIndex: a20 === true ? void 0 : -1, "aria-disabled": a20 === true ? true : void 0, "aria-selected": P7, disabled: void 0, onClick: F6, onFocus: R8, onPointerEnter: g6, onMouseEnter: g6, onPointerMove: A6, onMouseMove: A6, onPointerLeave: x11, onMouseLeave: x11 }, D8 = L();
  return !P7 && d14 ? null : D8({ ourProps: M8, theirProps: O8, slot: k5, defaultTag: Mt2, name: "Listbox.Option" });
}
var wt2 = import_react103.Fragment;
function kt2(e8, i15) {
  let { options: o18, placeholder: r17, ...a20 } = e8, O8 = { ref: y(i15) }, d14 = X3("ListboxSelectedOption"), p6 = (0, import_react103.useMemo)(() => ({}), []), n13 = d14.value === void 0 || d14.value === null || d14.mode === 1 && Array.isArray(d14.value) && d14.value.length === 0, u16 = L();
  return import_react103.default.createElement(Ee2.Provider, { value: true }, u16({ ourProps: O8, theirProps: { ...a20, children: import_react103.default.createElement(import_react103.default.Fragment, null, r17 && n13 ? r17 : o18) }, slot: p6, defaultTag: wt2, name: "ListboxSelectedOption" }));
}
var Ut2 = K(ht2);
var Nt2 = K(_t2);
var Ht2 = Q;
var Gt2 = K(Ft2);
var Vt2 = K(Bt2);
var Kt2 = K(kt2);
var Mo = Object.assign(Ut2, { Button: Nt2, Label: Ht2, Options: Gt2, Option: Vt2, SelectedOption: Kt2 });

// node_modules/@headlessui/react/dist/components/menu/menu.js
var import_react104 = __toESM(require_react(), 1);
var import_react_dom10 = __toESM(require_react_dom(), 1);
var ze3 = ((r17) => (r17[r17.Open = 0] = "Open", r17[r17.Closed = 1] = "Closed", r17))(ze3 || {});
var Ye2 = ((r17) => (r17[r17.Pointer = 0] = "Pointer", r17[r17.Other = 1] = "Other", r17))(Ye2 || {});
var Ze = ((a20) => (a20[a20.OpenMenu = 0] = "OpenMenu", a20[a20.CloseMenu = 1] = "CloseMenu", a20[a20.GoToItem = 2] = "GoToItem", a20[a20.Search = 3] = "Search", a20[a20.ClearSearch = 4] = "ClearSearch", a20[a20.RegisterItem = 5] = "RegisterItem", a20[a20.UnregisterItem = 6] = "UnregisterItem", a20[a20.SetButtonElement = 7] = "SetButtonElement", a20[a20.SetItemsElement = 8] = "SetItemsElement", a20))(Ze || {});
function W3(e8, n13 = (r17) => r17) {
  let r17 = e8.activeItemIndex !== null ? e8.items[e8.activeItemIndex] : null, l14 = _3(n13(e8.items.slice()), (u16) => u16.dataRef.current.domRef.current), o18 = r17 ? l14.indexOf(r17) : null;
  return o18 === -1 && (o18 = null), { items: l14, activeItemIndex: o18 };
}
var et = { [1](e8) {
  return e8.menuState === 1 ? e8 : { ...e8, activeItemIndex: null, menuState: 1 };
}, [0](e8) {
  return e8.menuState === 0 ? e8 : { ...e8, __demoMode: false, menuState: 0 };
}, [2]: (e8, n13) => {
  var u16, p6, s13, m10, a20;
  if (e8.menuState === 1) return e8;
  let r17 = { ...e8, searchQuery: "", activationTrigger: (u16 = n13.trigger) != null ? u16 : 1, __demoMode: false };
  if (n13.focus === c9.Nothing) return { ...r17, activeItemIndex: null };
  if (n13.focus === c9.Specific) return { ...r17, activeItemIndex: e8.items.findIndex((t11) => t11.id === n13.id) };
  if (n13.focus === c9.Previous) {
    let t11 = e8.activeItemIndex;
    if (t11 !== null) {
      let d14 = e8.items[t11].dataRef.current.domRef, f21 = f14(n13, { resolveItems: () => e8.items, resolveActiveIndex: () => e8.activeItemIndex, resolveId: (c15) => c15.id, resolveDisabled: (c15) => c15.dataRef.current.disabled });
      if (f21 !== null) {
        let c15 = e8.items[f21].dataRef.current.domRef;
        if (((p6 = d14.current) == null ? void 0 : p6.previousElementSibling) === c15.current || ((s13 = c15.current) == null ? void 0 : s13.previousElementSibling) === null) return { ...r17, activeItemIndex: f21 };
      }
    }
  } else if (n13.focus === c9.Next) {
    let t11 = e8.activeItemIndex;
    if (t11 !== null) {
      let d14 = e8.items[t11].dataRef.current.domRef, f21 = f14(n13, { resolveItems: () => e8.items, resolveActiveIndex: () => e8.activeItemIndex, resolveId: (c15) => c15.id, resolveDisabled: (c15) => c15.dataRef.current.disabled });
      if (f21 !== null) {
        let c15 = e8.items[f21].dataRef.current.domRef;
        if (((m10 = d14.current) == null ? void 0 : m10.nextElementSibling) === c15.current || ((a20 = c15.current) == null ? void 0 : a20.nextElementSibling) === null) return { ...r17, activeItemIndex: f21 };
      }
    }
  }
  let l14 = W3(e8), o18 = f14(n13, { resolveItems: () => l14.items, resolveActiveIndex: () => l14.activeItemIndex, resolveId: (t11) => t11.id, resolveDisabled: (t11) => t11.dataRef.current.disabled });
  return { ...r17, ...l14, activeItemIndex: o18 };
}, [3]: (e8, n13) => {
  let l14 = e8.searchQuery !== "" ? 0 : 1, o18 = e8.searchQuery + n13.value.toLowerCase(), p6 = (e8.activeItemIndex !== null ? e8.items.slice(e8.activeItemIndex + l14).concat(e8.items.slice(0, e8.activeItemIndex + l14)) : e8.items).find((m10) => {
    var a20;
    return ((a20 = m10.dataRef.current.textValue) == null ? void 0 : a20.startsWith(o18)) && !m10.dataRef.current.disabled;
  }), s13 = p6 ? e8.items.indexOf(p6) : -1;
  return s13 === -1 || s13 === e8.activeItemIndex ? { ...e8, searchQuery: o18 } : { ...e8, searchQuery: o18, activeItemIndex: s13, activationTrigger: 1 };
}, [4](e8) {
  return e8.searchQuery === "" ? e8 : { ...e8, searchQuery: "", searchActiveItemIndex: null };
}, [5]: (e8, n13) => {
  let r17 = W3(e8, (l14) => [...l14, { id: n13.id, dataRef: n13.dataRef }]);
  return { ...e8, ...r17 };
}, [6]: (e8, n13) => {
  let r17 = W3(e8, (l14) => {
    let o18 = l14.findIndex((u16) => u16.id === n13.id);
    return o18 !== -1 && l14.splice(o18, 1), l14;
  });
  return { ...e8, ...r17, activationTrigger: 1 };
}, [7]: (e8, n13) => e8.buttonElement === n13.element ? e8 : { ...e8, buttonElement: n13.element }, [8]: (e8, n13) => e8.itemsElement === n13.element ? e8 : { ...e8, itemsElement: n13.element } };
var j7 = (0, import_react104.createContext)(null);
j7.displayName = "MenuContext";
function w9(e8) {
  let n13 = (0, import_react104.useContext)(j7);
  if (n13 === null) {
    let r17 = new Error(`<${e8} /> is missing a parent <Menu /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r17, w9), r17;
  }
  return n13;
}
function tt(e8, n13) {
  return u(n13.type, et, e8, n13);
}
var nt = import_react104.Fragment;
function rt(e8, n13) {
  let { __demoMode: r17 = false, ...l14 } = e8, o18 = (0, import_react104.useReducer)(tt, { __demoMode: r17, menuState: r17 ? 0 : 1, buttonElement: null, itemsElement: null, items: [], searchQuery: "", activeItemIndex: null, activationTrigger: 1 }), [{ menuState: u16, itemsElement: p6, buttonElement: s13 }, m10] = o18, a20 = y(n13);
  R3(u16 === 0, [s13, p6], (b9, M8) => {
    m10({ type: 1 }), A2(M8, h5.Loose) || (b9.preventDefault(), s13 == null || s13.focus());
  });
  let d14 = o5(() => {
    m10({ type: 1 });
  }), f21 = (0, import_react104.useMemo)(() => ({ open: u16 === 0, close: d14 }), [u16, d14]), c15 = { ref: a20 }, A6 = L();
  return import_react104.default.createElement(Me, null, import_react104.default.createElement(j7.Provider, { value: o18 }, import_react104.default.createElement(c8, { value: u(u16, { [0]: i11.Open, [1]: i11.Closed }) }, A6({ ourProps: c15, theirProps: l14, slot: f21, defaultTag: nt, name: "Menu" }))));
}
var ot = "button";
function at(e8, n13) {
  var C9;
  let r17 = (0, import_react50.useId)(), { id: l14 = `headlessui-menu-button-${r17}`, disabled: o18 = false, autoFocus: u16 = false, ...p6 } = e8, [s13, m10] = w9("Menu.Button"), a20 = Fe2(), t11 = y(n13, ye(), o5((T10) => m10({ type: 7, element: T10 }))), d14 = o5((T10) => {
    switch (T10.key) {
      case o9.Space:
      case o9.Enter:
      case o9.ArrowDown:
        T10.preventDefault(), T10.stopPropagation(), (0, import_react_dom10.flushSync)(() => m10({ type: 0 })), m10({ type: 2, focus: c9.First });
        break;
      case o9.ArrowUp:
        T10.preventDefault(), T10.stopPropagation(), (0, import_react_dom10.flushSync)(() => m10({ type: 0 })), m10({ type: 2, focus: c9.Last });
        break;
    }
  }), f21 = o5((T10) => {
    switch (T10.key) {
      case o9.Space:
        T10.preventDefault();
        break;
    }
  }), c15 = o5((T10) => {
    var F6;
    if (r4(T10.currentTarget)) return T10.preventDefault();
    o18 || (s13.menuState === 0 ? ((0, import_react_dom10.flushSync)(() => m10({ type: 1 })), (F6 = s13.buttonElement) == null || F6.focus({ preventScroll: true })) : (T10.preventDefault(), m10({ type: 0 })));
  }), { isFocusVisible: A6, focusProps: b9 } = $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: u16 }), { isHovered: M8, hoverProps: D8 } = $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: o18 }), { pressed: P7, pressProps: S6 } = w({ disabled: o18 }), h8 = (0, import_react104.useMemo)(() => ({ open: s13.menuState === 0, active: P7 || s13.menuState === 0, disabled: o18, hover: M8, focus: A6, autofocus: u16 }), [s13, M8, A6, P7, o18, u16]), v3 = _(a20(), { ref: t11, id: l14, type: e6(e8, s13.buttonElement), "aria-haspopup": "menu", "aria-controls": (C9 = s13.itemsElement) == null ? void 0 : C9.id, "aria-expanded": s13.menuState === 0, disabled: o18 || void 0, autoFocus: u16, onKeyDown: d14, onKeyUp: f21, onClick: c15 }, b9, D8, S6);
  return L()({ ourProps: v3, theirProps: p6, slot: h8, defaultTag: ot, name: "Menu.Button" });
}
var lt = "div";
var it = O.RenderStrategy | O.Static;
function st(e8, n13) {
  var J7, V5;
  let r17 = (0, import_react50.useId)(), { id: l14 = `headlessui-menu-items-${r17}`, anchor: o18, portal: u16 = false, modal: p6 = true, transition: s13 = false, ...m10 } = e8, a20 = xe(o18), [t11, d14] = w9("Menu.Items"), [f21, c15] = Re(a20), A6 = be(), [b9, M8] = (0, import_react104.useState)(null), D8 = y(n13, a20 ? f21 : null, o5((i15) => d14({ type: 8, element: i15 })), M8), P7 = n9(t11.buttonElement), S6 = n9(t11.itemsElement);
  a20 && (u16 = true);
  let h8 = u12(), [v3, G7] = x3(s13, b9, h8 !== null ? (h8 & i11.Open) === i11.Open : t11.menuState === 0);
  m6(v3, t11.buttonElement, () => {
    d14({ type: 1 });
  });
  let C9 = t11.__demoMode ? false : p6 && t11.menuState === 0;
  f11(C9, S6);
  let T10 = t11.__demoMode ? false : p6 && t11.menuState === 0;
  y3(T10, { allowed: (0, import_react104.useCallback)(() => [t11.buttonElement, t11.itemsElement], [t11.buttonElement, t11.itemsElement]) });
  let F6 = t11.menuState !== 0, g6 = s9(F6, t11.buttonElement) ? false : v3;
  (0, import_react104.useEffect)(() => {
    let i15 = t11.itemsElement;
    i15 && t11.menuState === 0 && i15 !== (S6 == null ? void 0 : S6.activeElement) && i15.focus({ preventScroll: true });
  }, [t11.menuState, t11.itemsElement, S6]), F3(t11.menuState === 0, { container: t11.itemsElement, accept(i15) {
    return i15.getAttribute("role") === "menuitem" ? NodeFilter.FILTER_REJECT : i15.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
  }, walk(i15) {
    i15.setAttribute("role", "none");
  } });
  let L6 = p(), le4 = o5((i15) => {
    var X5, $5, q4;
    switch (L6.dispose(), i15.key) {
      case o9.Space:
        if (t11.searchQuery !== "") return i15.preventDefault(), i15.stopPropagation(), d14({ type: 3, value: i15.key });
      case o9.Enter:
        if (i15.preventDefault(), i15.stopPropagation(), d14({ type: 1 }), t11.activeItemIndex !== null) {
          let { dataRef: me5 } = t11.items[t11.activeItemIndex];
          ($5 = (X5 = me5.current) == null ? void 0 : X5.domRef.current) == null || $5.click();
        }
        G2(t11.buttonElement);
        break;
      case o9.ArrowDown:
        return i15.preventDefault(), i15.stopPropagation(), d14({ type: 2, focus: c9.Next });
      case o9.ArrowUp:
        return i15.preventDefault(), i15.stopPropagation(), d14({ type: 2, focus: c9.Previous });
      case o9.Home:
      case o9.PageUp:
        return i15.preventDefault(), i15.stopPropagation(), d14({ type: 2, focus: c9.First });
      case o9.End:
      case o9.PageDown:
        return i15.preventDefault(), i15.stopPropagation(), d14({ type: 2, focus: c9.Last });
      case o9.Escape:
        i15.preventDefault(), i15.stopPropagation(), (0, import_react_dom10.flushSync)(() => d14({ type: 1 })), (q4 = t11.buttonElement) == null || q4.focus({ preventScroll: true });
        break;
      case o9.Tab:
        i15.preventDefault(), i15.stopPropagation(), (0, import_react_dom10.flushSync)(() => d14({ type: 1 })), j3(t11.buttonElement, i15.shiftKey ? F2.Previous : F2.Next);
        break;
      default:
        i15.key.length === 1 && (d14({ type: 3, value: i15.key }), L6.setTimeout(() => d14({ type: 4 }), 350));
        break;
    }
  }), ie5 = o5((i15) => {
    switch (i15.key) {
      case o9.Space:
        i15.preventDefault();
        break;
    }
  }), se3 = (0, import_react104.useMemo)(() => ({ open: t11.menuState === 0 }), [t11.menuState]), ue5 = _(a20 ? A6() : {}, { "aria-activedescendant": t11.activeItemIndex === null || (J7 = t11.items[t11.activeItemIndex]) == null ? void 0 : J7.id, "aria-labelledby": (V5 = t11.buttonElement) == null ? void 0 : V5.id, id: l14, onKeyDown: le4, onKeyUp: ie5, role: "menu", tabIndex: t11.menuState === 0 ? 0 : void 0, ref: D8, style: { ...m10.style, ...c15, "--button-width": d3(t11.buttonElement, true).width }, ...R4(G7) }), pe5 = L();
  return import_react104.default.createElement(oe, { enabled: u16 ? e8.static || v3 : false, ownerDocument: P7 }, pe5({ ourProps: ue5, theirProps: m10, slot: se3, defaultTag: lt, features: it, visible: g6, name: "Menu.Items" }));
}
var ut = import_react104.Fragment;
function pt(e8, n13) {
  let r17 = (0, import_react50.useId)(), { id: l14 = `headlessui-menu-item-${r17}`, disabled: o18 = false, ...u16 } = e8, [p6, s13] = w9("Menu.Item"), m10 = p6.activeItemIndex !== null ? p6.items[p6.activeItemIndex].id === l14 : false, a20 = (0, import_react104.useRef)(null), t11 = y(n13, a20);
  n(() => {
    if (!p6.__demoMode && p6.menuState === 0 && m10 && p6.activationTrigger !== 0) return o3().requestAnimationFrame(() => {
      var g6, L6;
      (L6 = (g6 = a20.current) == null ? void 0 : g6.scrollIntoView) == null || L6.call(g6, { block: "nearest" });
    });
  }, [p6.__demoMode, a20, m10, p6.menuState, p6.activationTrigger, p6.activeItemIndex]);
  let d14 = s10(a20), f21 = (0, import_react104.useRef)({ disabled: o18, domRef: a20, get textValue() {
    return d14();
  } });
  n(() => {
    f21.current.disabled = o18;
  }, [f21, o18]), n(() => (s13({ type: 5, id: l14, dataRef: f21 }), () => s13({ type: 6, id: l14 })), [f21, l14]);
  let c15 = o5(() => {
    s13({ type: 1 });
  }), A6 = o5((g6) => {
    if (o18) return g6.preventDefault();
    s13({ type: 1 }), G2(p6.buttonElement);
  }), b9 = o5(() => {
    if (o18) return s13({ type: 2, focus: c9.Nothing });
    s13({ type: 2, focus: c9.Specific, id: l14 });
  }), M8 = u10(), D8 = o5((g6) => {
    M8.update(g6), !o18 && (m10 || s13({ type: 2, focus: c9.Specific, id: l14, trigger: 0 }));
  }), P7 = o5((g6) => {
    M8.wasMoved(g6) && (o18 || m10 || s13({ type: 2, focus: c9.Specific, id: l14, trigger: 0 }));
  }), S6 = o5((g6) => {
    M8.wasMoved(g6) && (o18 || m10 && s13({ type: 2, focus: c9.Nothing }));
  }), [h8, v3] = K2(), [G7, C9] = w3(), T10 = (0, import_react104.useMemo)(() => ({ active: m10, focus: m10, disabled: o18, close: c15 }), [m10, o18, c15]), F6 = { id: l14, ref: t11, role: "menuitem", tabIndex: o18 === true ? void 0 : -1, "aria-disabled": o18 === true ? true : void 0, "aria-labelledby": h8, "aria-describedby": G7, disabled: void 0, onClick: A6, onFocus: b9, onPointerEnter: D8, onMouseEnter: D8, onPointerMove: P7, onMouseMove: P7, onPointerLeave: S6, onMouseLeave: S6 }, Q4 = L();
  return import_react104.default.createElement(v3, null, import_react104.default.createElement(C9, null, Q4({ ourProps: F6, theirProps: u16, slot: T10, defaultTag: ut, name: "Menu.Item" })));
}
var mt = "div";
function dt(e8, n13) {
  let [r17, l14] = K2(), o18 = e8, u16 = { ref: n13, "aria-labelledby": r17, role: "group" }, p6 = L();
  return import_react104.default.createElement(l14, null, p6({ ourProps: u16, theirProps: o18, slot: {}, defaultTag: mt, name: "Menu.Section" }));
}
var ct = "header";
function ft(e8, n13) {
  let r17 = (0, import_react50.useId)(), { id: l14 = `headlessui-menu-heading-${r17}`, ...o18 } = e8, u16 = P5();
  n(() => u16.register(l14), [l14, u16.register]);
  let p6 = { id: l14, ref: n13, role: "presentation", ...u16.props };
  return L()({ ourProps: p6, theirProps: o18, slot: {}, defaultTag: ct, name: "Menu.Heading" });
}
var Tt = "div";
function yt2(e8, n13) {
  let r17 = e8, l14 = { ref: n13, role: "separator" };
  return L()({ ourProps: l14, theirProps: r17, slot: {}, defaultTag: Tt, name: "Menu.Separator" });
}
var It3 = K(rt);
var gt2 = K(at);
var Et3 = K(st);
var Mt3 = K(pt);
var St3 = K(dt);
var At3 = K(ft);
var bt = K(yt2);
var on = Object.assign(It3, { Button: gt2, Items: Et3, Item: Mt3, Section: St3, Heading: At3, Separator: bt });

// node_modules/@headlessui/react/dist/components/popover/popover.js
var import_react105 = __toESM(require_react(), 1);
var at2 = ((P7) => (P7[P7.Open = 0] = "Open", P7[P7.Closed = 1] = "Closed", P7))(at2 || {});
var pt2 = ((s13) => (s13[s13.TogglePopover = 0] = "TogglePopover", s13[s13.ClosePopover = 1] = "ClosePopover", s13[s13.SetButton = 2] = "SetButton", s13[s13.SetButtonId = 3] = "SetButtonId", s13[s13.SetPanel = 4] = "SetPanel", s13[s13.SetPanelId = 5] = "SetPanelId", s13))(pt2 || {});
var st2 = { [0]: (t11) => ({ ...t11, popoverState: u(t11.popoverState, { [0]: 1, [1]: 0 }), __demoMode: false }), [1](t11) {
  return t11.popoverState === 1 ? t11 : { ...t11, popoverState: 1, __demoMode: false };
}, [2](t11, l14) {
  return t11.button === l14.button ? t11 : { ...t11, button: l14.button };
}, [3](t11, l14) {
  return t11.buttonId === l14.buttonId ? t11 : { ...t11, buttonId: l14.buttonId };
}, [4](t11, l14) {
  return t11.panel === l14.panel ? t11 : { ...t11, panel: l14.panel };
}, [5](t11, l14) {
  return t11.panelId === l14.panelId ? t11 : { ...t11, panelId: l14.panelId };
} };
var be3 = (0, import_react105.createContext)(null);
be3.displayName = "PopoverContext";
function ie4(t11) {
  let l14 = (0, import_react105.useContext)(be3);
  if (l14 === null) {
    let P7 = new Error(`<${t11} /> is missing a parent <Popover /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(P7, ie4), P7;
  }
  return l14;
}
var de6 = (0, import_react105.createContext)(null);
de6.displayName = "PopoverAPIContext";
function ge4(t11) {
  let l14 = (0, import_react105.useContext)(de6);
  if (l14 === null) {
    let P7 = new Error(`<${t11} /> is missing a parent <Popover /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(P7, ge4), P7;
  }
  return l14;
}
var Se3 = (0, import_react105.createContext)(null);
Se3.displayName = "PopoverGroupContext";
function Oe4() {
  return (0, import_react105.useContext)(Se3);
}
var Pe2 = (0, import_react105.createContext)(null);
Pe2.displayName = "PopoverPanelContext";
function ut2() {
  return (0, import_react105.useContext)(Pe2);
}
function it2(t11, l14) {
  return u(l14.type, st2, t11, l14);
}
var dt2 = "div";
function Pt4(t11, l14) {
  var q4;
  let { __demoMode: P7 = false, ...C9 } = t11, m10 = (0, import_react105.useRef)(null), A6 = y(l14, T2((a20) => {
    m10.current = a20;
  })), s13 = (0, import_react105.useRef)([]), n13 = (0, import_react105.useReducer)(it2, { __demoMode: P7, popoverState: P7 ? 0 : 1, buttons: s13, button: null, buttonId: null, panel: null, panelId: null, beforePanelSentinel: (0, import_react105.createRef)(), afterPanelSentinel: (0, import_react105.createRef)(), afterButtonSentinel: (0, import_react105.createRef)() }), [{ popoverState: v3, button: i15, buttonId: o18, panel: u16, panelId: R8, beforePanelSentinel: y7, afterPanelSentinel: h8, afterButtonSentinel: d14 }, r17] = n13, T10 = n9((q4 = m10.current) != null ? q4 : i15), g6 = (0, import_react105.useMemo)(() => {
    if (!i15 || !u16) return false;
    for (let S6 of document.querySelectorAll("body > *")) if (Number(S6 == null ? void 0 : S6.contains(i15)) ^ Number(S6 == null ? void 0 : S6.contains(u16))) return true;
    let a20 = b2(), e8 = a20.indexOf(i15), p6 = (e8 + a20.length - 1) % a20.length, f21 = (e8 + 1) % a20.length, c15 = a20[p6], O8 = a20[f21];
    return !u16.contains(c15) && !u16.contains(O8);
  }, [i15, u16]), _8 = s3(o18), L6 = s3(R8), I6 = (0, import_react105.useMemo)(() => ({ buttonId: _8, panelId: L6, close: () => r17({ type: 1 }) }), [_8, L6, r17]), M8 = Oe4(), k5 = M8 == null ? void 0 : M8.registerPopover, V5 = o5(() => {
    var a20;
    return (a20 = M8 == null ? void 0 : M8.isFocusWithinPopoverGroup()) != null ? a20 : (T10 == null ? void 0 : T10.activeElement) && ((i15 == null ? void 0 : i15.contains(T10.activeElement)) || (u16 == null ? void 0 : u16.contains(T10.activeElement)));
  });
  (0, import_react105.useEffect)(() => k5 == null ? void 0 : k5(I6), [k5, I6]);
  let [B5, U7] = le(), F6 = b5(i15), N4 = R6({ mainTreeNode: F6, portals: B5, defaultContainers: [i15, u16] });
  E5(T10 == null ? void 0 : T10.defaultView, "focus", (a20) => {
    var e8, p6, f21, c15, O8, S6;
    a20.target !== window && a20.target instanceof HTMLElement && v3 === 0 && (V5() || i15 && u16 && (N4.contains(a20.target) || (p6 = (e8 = y7.current) == null ? void 0 : e8.contains) != null && p6.call(e8, a20.target) || (c15 = (f21 = h8.current) == null ? void 0 : f21.contains) != null && c15.call(f21, a20.target) || (S6 = (O8 = d14.current) == null ? void 0 : O8.contains) != null && S6.call(O8, a20.target) || r17({ type: 1 })));
  }, true), R3(v3 === 0, N4.resolveContainers, (a20, e8) => {
    r17({ type: 1 }), A2(e8, h5.Loose) || (a20.preventDefault(), i15 == null || i15.focus());
  });
  let x11 = o5((a20) => {
    r17({ type: 1 });
    let e8 = (() => a20 ? a20 instanceof HTMLElement ? a20 : "current" in a20 && a20.current instanceof HTMLElement ? a20.current : i15 : i15)();
    e8 == null || e8.focus();
  }), ee4 = (0, import_react105.useMemo)(() => ({ close: x11, isPortalled: g6 }), [x11, g6]), $5 = (0, import_react105.useMemo)(() => ({ open: v3 === 0, close: x11 }), [v3, x11]), J7 = { ref: A6 }, X5 = L();
  return import_react105.default.createElement(O4, { node: F6 }, import_react105.default.createElement(Me, null, import_react105.default.createElement(Pe2.Provider, { value: null }, import_react105.default.createElement(be3.Provider, { value: n13 }, import_react105.default.createElement(de6.Provider, { value: ee4 }, import_react105.default.createElement(C4, { value: x11 }, import_react105.default.createElement(c8, { value: u(v3, { [0]: i11.Open, [1]: i11.Closed }) }, import_react105.default.createElement(U7, null, X5({ ourProps: J7, theirProps: C9, slot: $5, defaultTag: dt2, name: "Popover" })))))))));
}
var ft2 = "button";
function ct2(t11, l14) {
  let P7 = (0, import_react50.useId)(), { id: C9 = `headlessui-popover-button-${P7}`, disabled: m10 = false, autoFocus: A6 = false, ...s13 } = t11, [n13, v3] = ie4("Popover.Button"), { isPortalled: i15 } = ge4("Popover.Button"), o18 = (0, import_react105.useRef)(null), u16 = `headlessui-focus-sentinel-${(0, import_react50.useId)()}`, R8 = Oe4(), y7 = R8 == null ? void 0 : R8.closeOthers, d14 = ut2() !== null;
  (0, import_react105.useEffect)(() => {
    if (!d14) return v3({ type: 3, buttonId: C9 }), () => {
      v3({ type: 3, buttonId: null });
    };
  }, [d14, C9, v3]);
  let [r17] = (0, import_react105.useState)(() => Symbol()), T10 = y(o18, l14, ye(), o5((e8) => {
    if (!d14) {
      if (e8) n13.buttons.current.push(r17);
      else {
        let p6 = n13.buttons.current.indexOf(r17);
        p6 !== -1 && n13.buttons.current.splice(p6, 1);
      }
      n13.buttons.current.length > 1 && console.warn("You are already using a <Popover.Button /> but only 1 <Popover.Button /> is supported."), e8 && v3({ type: 2, button: e8 });
    }
  })), g6 = y(o18, l14), _8 = n9(o18), L6 = o5((e8) => {
    var p6, f21, c15;
    if (d14) {
      if (n13.popoverState === 1) return;
      switch (e8.key) {
        case o9.Space:
        case o9.Enter:
          e8.preventDefault(), (f21 = (p6 = e8.target).click) == null || f21.call(p6), v3({ type: 1 }), (c15 = n13.button) == null || c15.focus();
          break;
      }
    } else switch (e8.key) {
      case o9.Space:
      case o9.Enter:
        e8.preventDefault(), e8.stopPropagation(), n13.popoverState === 1 && (y7 == null || y7(n13.buttonId)), v3({ type: 0 });
        break;
      case o9.Escape:
        if (n13.popoverState !== 0) return y7 == null ? void 0 : y7(n13.buttonId);
        if (!o18.current || _8 != null && _8.activeElement && !o18.current.contains(_8.activeElement)) return;
        e8.preventDefault(), e8.stopPropagation(), v3({ type: 1 });
        break;
    }
  }), I6 = o5((e8) => {
    d14 || e8.key === o9.Space && e8.preventDefault();
  }), M8 = o5((e8) => {
    var p6, f21;
    r4(e8.currentTarget) || m10 || (d14 ? (v3({ type: 1 }), (p6 = n13.button) == null || p6.focus()) : (e8.preventDefault(), e8.stopPropagation(), n13.popoverState === 1 && (y7 == null || y7(n13.buttonId)), v3({ type: 0 }), (f21 = n13.button) == null || f21.focus()));
  }), k5 = o5((e8) => {
    e8.preventDefault(), e8.stopPropagation();
  }), { isFocusVisible: V5, focusProps: B5 } = $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: A6 }), { isHovered: U7, hoverProps: F6 } = $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: m10 }), { pressed: N4, pressProps: Z4 } = w({ disabled: m10 }), x11 = n13.popoverState === 0, ee4 = (0, import_react105.useMemo)(() => ({ open: x11, active: N4 || x11, disabled: m10, hover: U7, focus: V5, autofocus: A6 }), [x11, U7, V5, N4, m10, A6]), $5 = e6(t11, n13.button), J7 = d14 ? _({ ref: g6, type: $5, onKeyDown: L6, onClick: M8, disabled: m10 || void 0, autoFocus: A6 }, B5, F6, Z4) : _({ ref: T10, id: n13.buttonId, type: $5, "aria-expanded": n13.popoverState === 0, "aria-controls": n13.panel ? n13.panelId : void 0, disabled: m10 || void 0, autoFocus: A6, onKeyDown: L6, onKeyUp: I6, onClick: M8, onMouseDown: k5 }, B5, F6, Z4), X5 = u15(), q4 = o5(() => {
    let e8 = n13.panel;
    if (!e8) return;
    function p6() {
      u(X5.current, { [a15.Forwards]: () => P6(e8, F2.First), [a15.Backwards]: () => P6(e8, F2.Last) }) === T5.Error && P6(b2().filter((c15) => c15.dataset.headlessuiFocusGuard !== "true"), u(X5.current, { [a15.Forwards]: F2.Next, [a15.Backwards]: F2.Previous }), { relativeTo: n13.button });
    }
    p6();
  }), a20 = L();
  return import_react105.default.createElement(import_react105.default.Fragment, null, a20({ ourProps: J7, theirProps: s13, slot: ee4, defaultTag: ft2, name: "Popover.Button" }), x11 && !d14 && i15 && import_react105.default.createElement(f4, { id: u16, ref: n13.afterButtonSentinel, features: s4.Focusable, "data-headlessui-focus-guard": true, as: "button", type: "button", onFocus: q4 }));
}
var vt = "div";
var Tt2 = O.RenderStrategy | O.Static;
function Le2(t11, l14) {
  let P7 = (0, import_react50.useId)(), { id: C9 = `headlessui-popover-backdrop-${P7}`, transition: m10 = false, ...A6 } = t11, [{ popoverState: s13 }, n13] = ie4("Popover.Backdrop"), [v3, i15] = (0, import_react105.useState)(null), o18 = y(l14, i15), u16 = u12(), [R8, y7] = x3(m10, v3, u16 !== null ? (u16 & i11.Open) === i11.Open : s13 === 0), h8 = o5((g6) => {
    if (r4(g6.currentTarget)) return g6.preventDefault();
    n13({ type: 1 });
  }), d14 = (0, import_react105.useMemo)(() => ({ open: s13 === 0 }), [s13]), r17 = { ref: o18, id: C9, "aria-hidden": true, onClick: h8, ...R4(y7) };
  return L()({ ourProps: r17, theirProps: A6, slot: d14, defaultTag: vt, features: Tt2, visible: R8, name: "Popover.Backdrop" });
}
var mt2 = "div";
var yt3 = O.RenderStrategy | O.Static;
function Et4(t11, l14) {
  let P7 = (0, import_react50.useId)(), { id: C9 = `headlessui-popover-panel-${P7}`, focus: m10 = false, anchor: A6, portal: s13 = false, modal: n13 = false, transition: v3 = false, ...i15 } = t11, [o18, u16] = ie4("Popover.Panel"), { close: R8, isPortalled: y7 } = ge4("Popover.Panel"), h8 = `headlessui-focus-sentinel-before-${P7}`, d14 = `headlessui-focus-sentinel-after-${P7}`, r17 = (0, import_react105.useRef)(null), T10 = xe(A6), [g6, _8] = Re(T10), L6 = be();
  T10 && (s13 = true);
  let [I6, M8] = (0, import_react105.useState)(null), k5 = y(r17, l14, T10 ? g6 : null, o5((e8) => u16({ type: 4, panel: e8 })), M8), V5 = n9(o18.button), B5 = n9(r17);
  n(() => (u16({ type: 5, panelId: C9 }), () => {
    u16({ type: 5, panelId: null });
  }), [C9, u16]);
  let U7 = u12(), [F6, N4] = x3(v3, I6, U7 !== null ? (U7 & i11.Open) === i11.Open : o18.popoverState === 0);
  m6(F6, o18.button, () => {
    u16({ type: 1 });
  });
  let Z4 = o18.__demoMode ? false : n13 && F6;
  f11(Z4, B5);
  let x11 = o5((e8) => {
    var p6;
    switch (e8.key) {
      case o9.Escape:
        if (o18.popoverState !== 0 || !r17.current || B5 != null && B5.activeElement && !r17.current.contains(B5.activeElement)) return;
        e8.preventDefault(), e8.stopPropagation(), u16({ type: 1 }), (p6 = o18.button) == null || p6.focus();
        break;
    }
  });
  (0, import_react105.useEffect)(() => {
    var e8;
    t11.static || o18.popoverState === 1 && ((e8 = t11.unmount) == null || e8) && u16({ type: 4, panel: null });
  }, [o18.popoverState, t11.unmount, t11.static, u16]), (0, import_react105.useEffect)(() => {
    if (o18.__demoMode || !m10 || o18.popoverState !== 0 || !r17.current) return;
    let e8 = B5 == null ? void 0 : B5.activeElement;
    r17.current.contains(e8) || P6(r17.current, F2.First);
  }, [o18.__demoMode, m10, r17.current, o18.popoverState]);
  let ee4 = (0, import_react105.useMemo)(() => ({ open: o18.popoverState === 0, close: R8 }), [o18.popoverState, R8]), $5 = _(T10 ? L6() : {}, { ref: k5, id: C9, onKeyDown: x11, onBlur: m10 && o18.popoverState === 0 ? (e8) => {
    var f21, c15, O8, S6, w11;
    let p6 = e8.relatedTarget;
    p6 && r17.current && ((f21 = r17.current) != null && f21.contains(p6) || (u16({ type: 1 }), ((O8 = (c15 = o18.beforePanelSentinel.current) == null ? void 0 : c15.contains) != null && O8.call(c15, p6) || (w11 = (S6 = o18.afterPanelSentinel.current) == null ? void 0 : S6.contains) != null && w11.call(S6, p6)) && p6.focus({ preventScroll: true })));
  } : void 0, tabIndex: -1, style: { ...i15.style, ..._8, "--button-width": d3(o18.button, true).width }, ...R4(N4) }), J7 = u15(), X5 = o5(() => {
    let e8 = r17.current;
    if (!e8) return;
    function p6() {
      u(J7.current, { [a15.Forwards]: () => {
        var c15;
        P6(e8, F2.First) === T5.Error && ((c15 = o18.afterPanelSentinel.current) == null || c15.focus());
      }, [a15.Backwards]: () => {
        var f21;
        (f21 = o18.button) == null || f21.focus({ preventScroll: true });
      } });
    }
    p6();
  }), q4 = o5(() => {
    let e8 = r17.current;
    if (!e8) return;
    function p6() {
      u(J7.current, { [a15.Forwards]: () => {
        if (!o18.button) return;
        let f21 = b2(), c15 = f21.indexOf(o18.button), O8 = f21.slice(0, c15 + 1), w11 = [...f21.slice(c15 + 1), ...O8];
        for (let fe5 of w11.slice()) if (fe5.dataset.headlessuiFocusGuard === "true" || I6 != null && I6.contains(fe5)) {
          let Ae4 = w11.indexOf(fe5);
          Ae4 !== -1 && w11.splice(Ae4, 1);
        }
        P6(w11, F2.First, { sorted: false });
      }, [a15.Backwards]: () => {
        var c15;
        P6(e8, F2.Previous) === T5.Error && ((c15 = o18.button) == null || c15.focus());
      } });
    }
    p6();
  }), a20 = L();
  return import_react105.default.createElement(s7, null, import_react105.default.createElement(Pe2.Provider, { value: C9 }, import_react105.default.createElement(de6.Provider, { value: { close: R8, isPortalled: y7 } }, import_react105.default.createElement(oe, { enabled: s13 ? t11.static || F6 : false, ownerDocument: V5 }, F6 && y7 && import_react105.default.createElement(f4, { id: h8, ref: o18.beforePanelSentinel, features: s4.Focusable, "data-headlessui-focus-guard": true, as: "button", type: "button", onFocus: X5 }), a20({ ourProps: $5, theirProps: i15, slot: ee4, defaultTag: mt2, features: yt3, visible: F6, name: "Popover.Panel" }), F6 && y7 && import_react105.default.createElement(f4, { id: d14, ref: o18.afterPanelSentinel, features: s4.Focusable, "data-headlessui-focus-guard": true, as: "button", type: "button", onFocus: q4 })))));
}
var bt2 = "div";
function gt3(t11, l14) {
  let P7 = (0, import_react105.useRef)(null), C9 = y(P7, l14), [m10, A6] = (0, import_react105.useState)([]), s13 = o5((d14) => {
    A6((r17) => {
      let T10 = r17.indexOf(d14);
      if (T10 !== -1) {
        let g6 = r17.slice();
        return g6.splice(T10, 1), g6;
      }
      return r17;
    });
  }), n13 = o5((d14) => (A6((r17) => [...r17, d14]), () => s13(d14))), v3 = o5(() => {
    var T10;
    let d14 = o2(P7);
    if (!d14) return false;
    let r17 = d14.activeElement;
    return (T10 = P7.current) != null && T10.contains(r17) ? true : m10.some((g6) => {
      var _8, L6;
      return ((_8 = d14.getElementById(g6.buttonId.current)) == null ? void 0 : _8.contains(r17)) || ((L6 = d14.getElementById(g6.panelId.current)) == null ? void 0 : L6.contains(r17));
    });
  }), i15 = o5((d14) => {
    for (let r17 of m10) r17.buttonId.current !== d14 && r17.close();
  }), o18 = (0, import_react105.useMemo)(() => ({ registerPopover: n13, unregisterPopover: s13, isFocusWithinPopoverGroup: v3, closeOthers: i15 }), [n13, s13, v3, i15]), u16 = (0, import_react105.useMemo)(() => ({}), []), R8 = t11, y7 = { ref: C9 }, h8 = L();
  return import_react105.default.createElement(O4, null, import_react105.default.createElement(Se3.Provider, { value: o18 }, h8({ ourProps: y7, theirProps: R8, slot: u16, defaultTag: bt2, name: "Popover.Group" })));
}
var St4 = K(Pt4);
var At4 = K(ct2);
var Ct2 = K(Le2);
var Rt3 = K(Le2);
var Bt3 = K(Et4);
var _t3 = K(gt3);
var ao = Object.assign(St4, { Button: At4, Backdrop: Rt3, Overlay: Ct2, Panel: Bt3, Group: _t3 });

// node_modules/@headlessui/react/dist/components/radio-group/radio-group.js
var import_react106 = __toESM(require_react(), 1);
var Ie5 = ((e8) => (e8[e8.RegisterOption = 0] = "RegisterOption", e8[e8.UnregisterOption = 1] = "UnregisterOption", e8))(Ie5 || {});
var Fe5 = { [0](o18, t11) {
  let e8 = [...o18.options, { id: t11.id, element: t11.element, propsRef: t11.propsRef }];
  return { ...o18, options: _3(e8, (i15) => i15.element.current) };
}, [1](o18, t11) {
  let e8 = o18.options.slice(), i15 = o18.options.findIndex((v3) => v3.id === t11.id);
  return i15 === -1 ? o18 : (e8.splice(i15, 1), { ...o18, options: e8 });
} };
var J5 = (0, import_react106.createContext)(null);
J5.displayName = "RadioGroupDataContext";
function X4(o18) {
  let t11 = (0, import_react106.useContext)(J5);
  if (t11 === null) {
    let e8 = new Error(`<${o18} /> is missing a parent <RadioGroup /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(e8, X4), e8;
  }
  return t11;
}
var z2 = (0, import_react106.createContext)(null);
z2.displayName = "RadioGroupActionsContext";
function q3(o18) {
  let t11 = (0, import_react106.useContext)(z2);
  if (t11 === null) {
    let e8 = new Error(`<${o18} /> is missing a parent <RadioGroup /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(e8, q3), e8;
  }
  return t11;
}
function Ue2(o18, t11) {
  return u(t11.type, Fe5, o18, t11);
}
var Me3 = "div";
function Se4(o18, t11) {
  let e8 = (0, import_react50.useId)(), i15 = a3(), { id: v3 = `headlessui-radiogroup-${e8}`, value: m10, form: D8, name: n13, onChange: f21, by: u16, disabled: a20 = i15 || false, defaultValue: M8, tabIndex: T10 = 0, ...S6 } = o18, R8 = u8(u16), [A6, y7] = (0, import_react106.useReducer)(Ue2, { options: [] }), p6 = A6.options, [C9, _8] = K2(), [h8, L6] = w3(), k5 = (0, import_react106.useRef)(null), c15 = y(k5, t11), b9 = l2(M8), [l14, I6] = T(m10, f21, b9), g6 = (0, import_react106.useMemo)(() => p6.find((r17) => !r17.propsRef.current.disabled), [p6]), O8 = (0, import_react106.useMemo)(() => p6.some((r17) => R8(r17.propsRef.current.value, l14)), [p6, l14]), s13 = o5((r17) => {
    var d14;
    if (a20 || R8(r17, l14)) return false;
    let F6 = (d14 = p6.find((w11) => R8(w11.propsRef.current.value, r17))) == null ? void 0 : d14.propsRef.current;
    return F6 != null && F6.disabled ? false : (I6 == null || I6(r17), true);
  }), ue5 = o5((r17) => {
    let F6 = k5.current;
    if (!F6) return;
    let d14 = o2(F6), w11 = p6.filter((P7) => P7.propsRef.current.disabled === false).map((P7) => P7.element.current);
    switch (r17.key) {
      case o9.Enter:
        p2(r17.currentTarget);
        break;
      case o9.ArrowLeft:
      case o9.ArrowUp:
        if (r17.preventDefault(), r17.stopPropagation(), P6(w11, F2.Previous | F2.WrapAround) === T5.Success) {
          let E13 = p6.find((W4) => W4.element.current === (d14 == null ? void 0 : d14.activeElement));
          E13 && s13(E13.propsRef.current.value);
        }
        break;
      case o9.ArrowRight:
      case o9.ArrowDown:
        if (r17.preventDefault(), r17.stopPropagation(), P6(w11, F2.Next | F2.WrapAround) === T5.Success) {
          let E13 = p6.find((W4) => W4.element.current === (d14 == null ? void 0 : d14.activeElement));
          E13 && s13(E13.propsRef.current.value);
        }
        break;
      case o9.Space:
        {
          r17.preventDefault(), r17.stopPropagation();
          let P7 = p6.find((E13) => E13.element.current === (d14 == null ? void 0 : d14.activeElement));
          P7 && s13(P7.propsRef.current.value);
        }
        break;
    }
  }), Q4 = o5((r17) => (y7({ type: 0, ...r17 }), () => y7({ type: 1, id: r17.id }))), ce5 = (0, import_react106.useMemo)(() => ({ value: l14, firstOption: g6, containsCheckedOption: O8, disabled: a20, compare: R8, tabIndex: T10, ...A6 }), [l14, g6, O8, a20, R8, T10, A6]), fe5 = (0, import_react106.useMemo)(() => ({ registerOption: Q4, change: s13 }), [Q4, s13]), Te6 = { ref: c15, id: v3, role: "radiogroup", "aria-labelledby": C9, "aria-describedby": h8, onKeyDown: ue5 }, Re5 = (0, import_react106.useMemo)(() => ({ value: l14 }), [l14]), me5 = (0, import_react106.useCallback)(() => {
    if (b9 !== void 0) return s13(b9);
  }, [s13, b9]), ye6 = L();
  return import_react106.default.createElement(L6, { name: "RadioGroup.Description" }, import_react106.default.createElement(_8, { name: "RadioGroup.Label" }, import_react106.default.createElement(z2.Provider, { value: fe5 }, import_react106.default.createElement(J5.Provider, { value: ce5 }, n13 != null && import_react106.default.createElement(j2, { disabled: a20, data: { [n13]: l14 || "on" }, overrides: { type: "radio", checked: l14 != null }, form: D8, onReset: me5 }), ye6({ ourProps: Te6, theirProps: S6, slot: Re5, defaultTag: Me3, name: "RadioGroup" })))));
}
var He3 = "div";
function we2(o18, t11) {
  var g6;
  let e8 = X4("RadioGroup.Option"), i15 = q3("RadioGroup.Option"), v3 = (0, import_react50.useId)(), { id: m10 = `headlessui-radiogroup-option-${v3}`, value: D8, disabled: n13 = e8.disabled || false, autoFocus: f21 = false, ...u16 } = o18, a20 = (0, import_react106.useRef)(null), M8 = y(a20, t11), [T10, S6] = K2(), [R8, A6] = w3(), y7 = s3({ value: D8, disabled: n13 });
  n(() => i15.registerOption({ id: m10, element: a20, propsRef: y7 }), [m10, i15, a20, y7]);
  let p6 = o5((O8) => {
    var s13;
    if (r4(O8.currentTarget)) return O8.preventDefault();
    i15.change(D8) && ((s13 = a20.current) == null || s13.focus());
  }), C9 = ((g6 = e8.firstOption) == null ? void 0 : g6.id) === m10, { isFocusVisible: _8, focusProps: h8 } = $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: f21 }), { isHovered: L6, hoverProps: k5 } = $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: n13 }), c15 = e8.compare(e8.value, D8), b9 = _({ ref: M8, id: m10, role: "radio", "aria-checked": c15 ? "true" : "false", "aria-labelledby": T10, "aria-describedby": R8, "aria-disabled": n13 ? true : void 0, tabIndex: (() => n13 ? -1 : c15 || !e8.containsCheckedOption && C9 ? e8.tabIndex : -1)(), onClick: n13 ? void 0 : p6, autoFocus: f21 }, h8, k5), l14 = (0, import_react106.useMemo)(() => ({ checked: c15, disabled: n13, active: _8, hover: L6, focus: _8, autofocus: f21 }), [c15, n13, L6, _8, f21]), I6 = L();
  return import_react106.default.createElement(A6, { name: "RadioGroup.Description" }, import_react106.default.createElement(S6, { name: "RadioGroup.Label" }, I6({ ourProps: b9, theirProps: u16, slot: l14, defaultTag: He3, name: "RadioGroup.Option" })));
}
var Ne2 = "span";
function We2(o18, t11) {
  var g6;
  let e8 = X4("Radio"), i15 = q3("Radio"), v3 = (0, import_react50.useId)(), m10 = u4(), D8 = a3(), { id: n13 = m10 || `headlessui-radio-${v3}`, value: f21, disabled: u16 = e8.disabled || D8 || false, autoFocus: a20 = false, ...M8 } = o18, T10 = (0, import_react106.useRef)(null), S6 = y(T10, t11), R8 = I(), A6 = U2(), y7 = s3({ value: f21, disabled: u16 });
  n(() => i15.registerOption({ id: n13, element: T10, propsRef: y7 }), [n13, i15, T10, y7]);
  let p6 = o5((O8) => {
    var s13;
    if (r4(O8.currentTarget)) return O8.preventDefault();
    i15.change(f21) && ((s13 = T10.current) == null || s13.focus());
  }), { isFocusVisible: C9, focusProps: _8 } = $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: a20 }), { isHovered: h8, hoverProps: L6 } = $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: u16 }), k5 = ((g6 = e8.firstOption) == null ? void 0 : g6.id) === n13, c15 = e8.compare(e8.value, f21), b9 = _({ ref: S6, id: n13, role: "radio", "aria-checked": c15 ? "true" : "false", "aria-labelledby": R8, "aria-describedby": A6, "aria-disabled": u16 ? true : void 0, tabIndex: (() => u16 ? -1 : c15 || !e8.containsCheckedOption && k5 ? e8.tabIndex : -1)(), autoFocus: a20, onClick: u16 ? void 0 : p6 }, _8, L6), l14 = (0, import_react106.useMemo)(() => ({ checked: c15, disabled: u16, hover: h8, focus: C9, autofocus: a20 }), [c15, u16, h8, C9, a20]);
  return L()({ ourProps: b9, theirProps: M8, slot: l14, defaultTag: Ne2, name: "Radio" });
}
var Be2 = K(Se4);
var Ve = K(we2);
var Ke2 = K(We2);
var $e2 = Q;
var je3 = H4;
var mt3 = Object.assign(Be2, { Option: Ve, Radio: Ke2, Label: $e2, Description: je3 });

// node_modules/@headlessui/react/dist/components/select/select.js
var import_react107 = __toESM(require_react(), 1);
var H12 = "select";
function B4(a20, i15) {
  let p6 = (0, import_react50.useId)(), d14 = u4(), n13 = a3(), { id: c15 = d14 || `headlessui-select-${p6}`, disabled: e8 = n13 || false, invalid: t11 = false, autoFocus: o18 = false, ...f21 } = a20, m10 = I(), u16 = U2(), { isFocusVisible: r17, focusProps: T10 } = $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: o18 }), { isHovered: l14, hoverProps: b9 } = $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: e8 }), { pressed: s13, pressProps: y7 } = w({ disabled: e8 }), P7 = _({ ref: i15, id: c15, "aria-labelledby": m10, "aria-describedby": u16, "aria-invalid": t11 ? "true" : void 0, disabled: e8 || void 0, autoFocus: o18 }, T10, b9, y7), S6 = (0, import_react107.useMemo)(() => ({ disabled: e8, invalid: t11, hover: l14, focus: r17, active: s13, autofocus: o18 }), [e8, t11, l14, r17, s13, o18]);
  return L()({ ourProps: P7, theirProps: f21, slot: S6, defaultTag: H12, name: "Select" });
}
var j8 = K(B4);

// node_modules/@headlessui/react/dist/components/switch/switch.js
var import_react108 = __toESM(require_react(), 1);
var E11 = (0, import_react108.createContext)(null);
E11.displayName = "GroupContext";
var De3 = import_react108.Fragment;
function ge6(n13) {
  var u16;
  let [o18, s13] = (0, import_react108.useState)(null), [h8, b9] = K2(), [T10, t11] = w3(), p6 = (0, import_react108.useMemo)(() => ({ switch: o18, setSwitch: s13 }), [o18, s13]), y7 = {}, S6 = n13, c15 = L();
  return import_react108.default.createElement(t11, { name: "Switch.Description", value: T10 }, import_react108.default.createElement(b9, { name: "Switch.Label", value: h8, props: { htmlFor: (u16 = p6.switch) == null ? void 0 : u16.id, onClick(d14) {
    o18 && (d14.currentTarget instanceof HTMLLabelElement && d14.preventDefault(), o18.click(), o18.focus({ preventScroll: true }));
  } } }, import_react108.default.createElement(E11.Provider, { value: p6 }, c15({ ourProps: y7, theirProps: S6, slot: {}, defaultTag: De3, name: "Switch.Group" }))));
}
var ve = "button";
function xe2(n13, o18) {
  var L6;
  let s13 = (0, import_react50.useId)(), h8 = u4(), b9 = a3(), { id: T10 = h8 || `headlessui-switch-${s13}`, disabled: t11 = b9 || false, checked: p6, defaultChecked: y7, onChange: S6, name: c15, value: u16, form: d14, autoFocus: m10 = false, ...F6 } = n13, _8 = (0, import_react108.useContext)(E11), [H14, k5] = (0, import_react108.useState)(null), M8 = (0, import_react108.useRef)(null), U7 = y(M8, o18, _8 === null ? null : _8.setSwitch, k5), l14 = l2(y7), [a20, r17] = T(p6, S6, l14 != null ? l14 : false), I6 = p(), [P7, D8] = (0, import_react108.useState)(false), g6 = o5(() => {
    D8(true), r17 == null || r17(!a20), I6.nextFrame(() => {
      D8(false);
    });
  }), B5 = o5((e8) => {
    if (r4(e8.currentTarget)) return e8.preventDefault();
    e8.preventDefault(), g6();
  }), K4 = o5((e8) => {
    e8.key === o9.Space ? (e8.preventDefault(), g6()) : e8.key === o9.Enter && p2(e8.currentTarget);
  }), W4 = o5((e8) => e8.preventDefault()), O8 = I(), N4 = U2(), { isFocusVisible: v3, focusProps: J7 } = $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: m10 }), { isHovered: x11, hoverProps: V5 } = $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: t11 }), { pressed: C9, pressProps: X5 } = w({ disabled: t11 }), j9 = (0, import_react108.useMemo)(() => ({ checked: a20, disabled: t11, hover: x11, focus: v3, active: C9, autofocus: m10, changing: P7 }), [a20, x11, v3, C9, t11, P7, m10]), $5 = _({ id: T10, ref: U7, role: "switch", type: e6(n13, H14), tabIndex: n13.tabIndex === -1 ? 0 : (L6 = n13.tabIndex) != null ? L6 : 0, "aria-checked": a20, "aria-labelledby": O8, "aria-describedby": N4, disabled: t11 || void 0, autoFocus: m10, onClick: B5, onKeyUp: K4, onKeyPress: W4 }, J7, V5, X5), q4 = (0, import_react108.useCallback)(() => {
    if (l14 !== void 0) return r17 == null ? void 0 : r17(l14);
  }, [r17, l14]), z4 = L();
  return import_react108.default.createElement(import_react108.default.Fragment, null, c15 != null && import_react108.default.createElement(j2, { disabled: t11, data: { [c15]: u16 || "on" }, overrides: { type: "checkbox", checked: a20 }, form: d14, onReset: q4 }), z4({ ourProps: $5, theirProps: F6, slot: j9, defaultTag: ve, name: "Switch" }));
}
var Ce3 = K(xe2);
var Le3 = ge6;
var Re4 = Q;
var Ge2 = H4;
var Ye3 = Object.assign(Ce3, { Group: Le3, Label: Re4, Description: Ge2 });

// node_modules/@headlessui/react/dist/components/tabs/tabs.js
var import_react110 = __toESM(require_react(), 1);

// node_modules/@headlessui/react/dist/internal/focus-sentinel.js
var import_react109 = __toESM(require_react(), 1);
function b8({ onFocus: n13 }) {
  let [r17, o18] = (0, import_react109.useState)(true), u16 = f18();
  return r17 ? import_react109.default.createElement(f4, { as: "button", type: "button", features: s4.Focusable, onFocus: (a20) => {
    a20.preventDefault();
    let e8, i15 = 50;
    function t11() {
      if (i15-- <= 0) {
        e8 && cancelAnimationFrame(e8);
        return;
      }
      if (n13()) {
        if (cancelAnimationFrame(e8), !u16.current) return;
        o18(false);
        return;
      }
      e8 = requestAnimationFrame(t11);
    }
    e8 = requestAnimationFrame(t11);
  } }) : null;
}

// node_modules/@headlessui/react/dist/utils/stable-collection.js
var l13 = __toESM(require_react(), 1);
var s12 = l13.createContext(null);
function a19() {
  return { groups: /* @__PURE__ */ new Map(), get(o18, e8) {
    var i15;
    let t11 = this.groups.get(o18);
    t11 || (t11 = /* @__PURE__ */ new Map(), this.groups.set(o18, t11));
    let n13 = (i15 = t11.get(e8)) != null ? i15 : 0;
    t11.set(e8, n13 + 1);
    let r17 = Array.from(t11.keys()).indexOf(e8);
    function u16() {
      let c15 = t11.get(e8);
      c15 > 1 ? t11.set(e8, c15 - 1) : t11.delete(e8);
    }
    return [r17, u16];
  } };
}
function f20({ children: o18 }) {
  let e8 = l13.useRef(a19());
  return l13.createElement(s12.Provider, { value: e8 }, o18);
}
function C7(o18) {
  let e8 = l13.useContext(s12);
  if (!e8) throw new Error("You must wrap your component in a <StableCollection>");
  let t11 = l13.useId(), [n13, r17] = e8.current.get(o18, t11);
  return l13.useEffect(() => r17, []), n13;
}

// node_modules/@headlessui/react/dist/components/tabs/tabs.js
var Le4 = ((t11) => (t11[t11.Forwards = 0] = "Forwards", t11[t11.Backwards = 1] = "Backwards", t11))(Le4 || {});
var _e3 = ((l14) => (l14[l14.Less = -1] = "Less", l14[l14.Equal = 0] = "Equal", l14[l14.Greater = 1] = "Greater", l14))(_e3 || {});
var De4 = ((n13) => (n13[n13.SetSelectedIndex = 0] = "SetSelectedIndex", n13[n13.RegisterTab = 1] = "RegisterTab", n13[n13.UnregisterTab = 2] = "UnregisterTab", n13[n13.RegisterPanel = 3] = "RegisterPanel", n13[n13.UnregisterPanel = 4] = "UnregisterPanel", n13))(De4 || {});
var Se5 = { [0](e8, r17) {
  var d14;
  let t11 = _3(e8.tabs, (u16) => u16.current), l14 = _3(e8.panels, (u16) => u16.current), a20 = t11.filter((u16) => {
    var T10;
    return !((T10 = u16.current) != null && T10.hasAttribute("disabled"));
  }), n13 = { ...e8, tabs: t11, panels: l14 };
  if (r17.index < 0 || r17.index > t11.length - 1) {
    let u16 = u(Math.sign(r17.index - e8.selectedIndex), { [-1]: () => 1, [0]: () => u(Math.sign(r17.index), { [-1]: () => 0, [0]: () => 0, [1]: () => 1 }), [1]: () => 0 });
    if (a20.length === 0) return n13;
    let T10 = u(u16, { [0]: () => t11.indexOf(a20[0]), [1]: () => t11.indexOf(a20[a20.length - 1]) });
    return { ...n13, selectedIndex: T10 === -1 ? e8.selectedIndex : T10 };
  }
  let s13 = t11.slice(0, r17.index), b9 = [...t11.slice(r17.index), ...s13].find((u16) => a20.includes(u16));
  if (!b9) return n13;
  let f21 = (d14 = t11.indexOf(b9)) != null ? d14 : e8.selectedIndex;
  return f21 === -1 && (f21 = e8.selectedIndex), { ...n13, selectedIndex: f21 };
}, [1](e8, r17) {
  if (e8.tabs.includes(r17.tab)) return e8;
  let t11 = e8.tabs[e8.selectedIndex], l14 = _3([...e8.tabs, r17.tab], (n13) => n13.current), a20 = e8.selectedIndex;
  return e8.info.current.isControlled || (a20 = l14.indexOf(t11), a20 === -1 && (a20 = e8.selectedIndex)), { ...e8, tabs: l14, selectedIndex: a20 };
}, [2](e8, r17) {
  return { ...e8, tabs: e8.tabs.filter((t11) => t11 !== r17.tab) };
}, [3](e8, r17) {
  return e8.panels.includes(r17.panel) ? e8 : { ...e8, panels: _3([...e8.panels, r17.panel], (t11) => t11.current) };
}, [4](e8, r17) {
  return { ...e8, panels: e8.panels.filter((t11) => t11 !== r17.panel) };
} };
var V4 = (0, import_react110.createContext)(null);
V4.displayName = "TabsDataContext";
function C8(e8) {
  let r17 = (0, import_react110.useContext)(V4);
  if (r17 === null) {
    let t11 = new Error(`<${e8} /> is missing a parent <Tab.Group /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(t11, C8), t11;
  }
  return r17;
}
var Q3 = (0, import_react110.createContext)(null);
Q3.displayName = "TabsActionsContext";
function Y4(e8) {
  let r17 = (0, import_react110.useContext)(Q3);
  if (r17 === null) {
    let t11 = new Error(`<${e8} /> is missing a parent <Tab.Group /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(t11, Y4), t11;
  }
  return r17;
}
function Fe6(e8, r17) {
  return u(r17.type, Se5, e8, r17);
}
var Ie6 = "div";
function he3(e8, r17) {
  let { defaultIndex: t11 = 0, vertical: l14 = false, manual: a20 = false, onChange: n13, selectedIndex: s13 = null, ...g6 } = e8;
  const b9 = l14 ? "vertical" : "horizontal", f21 = a20 ? "manual" : "auto";
  let d14 = s13 !== null, u16 = s3({ isControlled: d14 }), T10 = y(r17), [p6, c15] = (0, import_react110.useReducer)(Fe6, { info: u16, selectedIndex: s13 != null ? s13 : t11, tabs: [], panels: [] }), h8 = (0, import_react110.useMemo)(() => ({ selectedIndex: p6.selectedIndex }), [p6.selectedIndex]), m10 = s3(n13 || (() => {
  })), M8 = s3(p6.tabs), S6 = (0, import_react110.useMemo)(() => ({ orientation: b9, activation: f21, ...p6 }), [b9, f21, p6]), P7 = o5((i15) => (c15({ type: 1, tab: i15 }), () => c15({ type: 2, tab: i15 }))), A6 = o5((i15) => (c15({ type: 3, panel: i15 }), () => c15({ type: 4, panel: i15 }))), E13 = o5((i15) => {
    _8.current !== i15 && m10.current(i15), d14 || c15({ type: 0, index: i15 });
  }), _8 = s3(d14 ? e8.selectedIndex : p6.selectedIndex), D8 = (0, import_react110.useMemo)(() => ({ registerTab: P7, registerPanel: A6, change: E13 }), []);
  n(() => {
    c15({ type: 0, index: s13 != null ? s13 : t11 });
  }, [s13]), n(() => {
    if (_8.current === void 0 || p6.tabs.length <= 0) return;
    let i15 = _3(p6.tabs, (R8) => R8.current);
    i15.some((R8, X5) => p6.tabs[X5] !== R8) && E13(i15.indexOf(p6.tabs[_8.current]));
  });
  let K4 = { ref: T10 }, J7 = L();
  return import_react110.default.createElement(f20, null, import_react110.default.createElement(Q3.Provider, { value: D8 }, import_react110.default.createElement(V4.Provider, { value: S6 }, S6.tabs.length <= 0 && import_react110.default.createElement(b8, { onFocus: () => {
    var i15, G7;
    for (let R8 of M8.current) if (((i15 = R8.current) == null ? void 0 : i15.tabIndex) === 0) return (G7 = R8.current) == null || G7.focus(), true;
    return false;
  } }), J7({ ourProps: K4, theirProps: g6, slot: h8, defaultTag: Ie6, name: "Tabs" }))));
}
var ve2 = "div";
function Ce4(e8, r17) {
  let { orientation: t11, selectedIndex: l14 } = C8("Tab.List"), a20 = y(r17), n13 = (0, import_react110.useMemo)(() => ({ selectedIndex: l14 }), [l14]), s13 = e8, g6 = { ref: a20, role: "tablist", "aria-orientation": t11 };
  return L()({ ourProps: g6, theirProps: s13, slot: n13, defaultTag: ve2, name: "Tabs.List" });
}
var Me4 = "button";
function Ge3(e8, r17) {
  var ee4, te6;
  let t11 = (0, import_react50.useId)(), { id: l14 = `headlessui-tabs-tab-${t11}`, disabled: a20 = false, autoFocus: n13 = false, ...s13 } = e8, { orientation: g6, activation: b9, selectedIndex: f21, tabs: d14, panels: u16 } = C8("Tab"), T10 = Y4("Tab"), p6 = C8("Tab"), [c15, h8] = (0, import_react110.useState)(null), m10 = (0, import_react110.useRef)(null), M8 = y(m10, r17, h8);
  n(() => T10.registerTab(m10), [T10, m10]);
  let S6 = C7("tabs"), P7 = d14.indexOf(m10);
  P7 === -1 && (P7 = S6);
  let A6 = P7 === f21, E13 = o5((o18) => {
    var $5;
    let L6 = o18();
    if (L6 === T5.Success && b9 === "auto") {
      let q4 = ($5 = o2(m10)) == null ? void 0 : $5.activeElement, re4 = p6.tabs.findIndex((ce5) => ce5.current === q4);
      re4 !== -1 && T10.change(re4);
    }
    return L6;
  }), _8 = o5((o18) => {
    let L6 = d14.map((q4) => q4.current).filter(Boolean);
    if (o18.key === o9.Space || o18.key === o9.Enter) {
      o18.preventDefault(), o18.stopPropagation(), T10.change(P7);
      return;
    }
    switch (o18.key) {
      case o9.Home:
      case o9.PageUp:
        return o18.preventDefault(), o18.stopPropagation(), E13(() => P6(L6, F2.First));
      case o9.End:
      case o9.PageDown:
        return o18.preventDefault(), o18.stopPropagation(), E13(() => P6(L6, F2.Last));
    }
    if (E13(() => u(g6, { vertical() {
      return o18.key === o9.ArrowUp ? P6(L6, F2.Previous | F2.WrapAround) : o18.key === o9.ArrowDown ? P6(L6, F2.Next | F2.WrapAround) : T5.Error;
    }, horizontal() {
      return o18.key === o9.ArrowLeft ? P6(L6, F2.Previous | F2.WrapAround) : o18.key === o9.ArrowRight ? P6(L6, F2.Next | F2.WrapAround) : T5.Error;
    } })) === T5.Success) return o18.preventDefault();
  }), D8 = (0, import_react110.useRef)(false), K4 = o5(() => {
    var o18;
    D8.current || (D8.current = true, (o18 = m10.current) == null || o18.focus({ preventScroll: true }), T10.change(P7), t(() => {
      D8.current = false;
    }));
  }), J7 = o5((o18) => {
    o18.preventDefault();
  }), { isFocusVisible: i15, focusProps: G7 } = $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: n13 }), { isHovered: R8, hoverProps: X5 } = $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: a20 }), { pressed: Z4, pressProps: ue5 } = w({ disabled: a20 }), Te6 = (0, import_react110.useMemo)(() => ({ selected: A6, hover: R8, active: Z4, focus: i15, autofocus: n13, disabled: a20 }), [A6, R8, i15, Z4, n13, a20]), de7 = _({ ref: M8, onKeyDown: _8, onMouseDown: J7, onClick: K4, id: l14, role: "tab", type: e6(e8, c15), "aria-controls": (te6 = (ee4 = u16[P7]) == null ? void 0 : ee4.current) == null ? void 0 : te6.id, "aria-selected": A6, tabIndex: A6 ? 0 : -1, disabled: a20 || void 0, autoFocus: n13 }, G7, X5, ue5);
  return L()({ ourProps: de7, theirProps: s13, slot: Te6, defaultTag: Me4, name: "Tabs.Tab" });
}
var Ue3 = "div";
function He4(e8, r17) {
  let { selectedIndex: t11 } = C8("Tab.Panels"), l14 = y(r17), a20 = (0, import_react110.useMemo)(() => ({ selectedIndex: t11 }), [t11]), n13 = e8, s13 = { ref: l14 };
  return L()({ ourProps: s13, theirProps: n13, slot: a20, defaultTag: Ue3, name: "Tabs.Panels" });
}
var we3 = "div";
var Oe5 = O.RenderStrategy | O.Static;
function Ne3(e8, r17) {
  var A6, E13, _8, D8;
  let t11 = (0, import_react50.useId)(), { id: l14 = `headlessui-tabs-panel-${t11}`, tabIndex: a20 = 0, ...n13 } = e8, { selectedIndex: s13, tabs: g6, panels: b9 } = C8("Tab.Panel"), f21 = Y4("Tab.Panel"), d14 = (0, import_react110.useRef)(null), u16 = y(d14, r17);
  n(() => f21.registerPanel(d14), [f21, d14]);
  let T10 = C7("panels"), p6 = b9.indexOf(d14);
  p6 === -1 && (p6 = T10);
  let c15 = p6 === s13, { isFocusVisible: h8, focusProps: m10 } = $f7dceffc5ad7768b$export$4e328f61c538687f(), M8 = (0, import_react110.useMemo)(() => ({ selected: c15, focus: h8 }), [c15, h8]), S6 = _({ ref: u16, id: l14, role: "tabpanel", "aria-labelledby": (E13 = (A6 = g6[p6]) == null ? void 0 : A6.current) == null ? void 0 : E13.id, tabIndex: c15 ? a20 : -1 }, m10), P7 = L();
  return !c15 && ((_8 = n13.unmount) == null || _8) && !((D8 = n13.static) != null && D8) ? import_react110.default.createElement(f4, { "aria-hidden": "true", ...S6 }) : P7({ ourProps: S6, theirProps: n13, slot: M8, defaultTag: we3, features: Oe5, visible: c15, name: "Tabs.Panel" });
}
var ke3 = K(Ge3);
var Be3 = K(he3);
var We3 = K(Ce4);
var je4 = K(He4);
var Ke3 = K(Ne3);
var Tt3 = Object.assign(ke3, { Group: Be3, List: We3, Panels: je4, Panel: Ke3 });

// node_modules/@headlessui/react/dist/components/textarea/textarea.js
var import_react111 = __toESM(require_react(), 1);
var L5 = "textarea";
function H13(s13, l14) {
  let i15 = (0, import_react50.useId)(), d14 = u4(), n13 = a3(), { id: p6 = d14 || `headlessui-textarea-${i15}`, disabled: e8 = n13 || false, autoFocus: r17 = false, invalid: a20 = false, ...T10 } = s13, f21 = I(), m10 = U2(), { isFocused: o18, focusProps: u16 } = $f7dceffc5ad7768b$export$4e328f61c538687f({ autoFocus: r17 }), { isHovered: t11, hoverProps: b9 } = $6179b936705e76d3$export$ae780daf29e6d456({ isDisabled: e8 }), y7 = _({ ref: l14, id: p6, "aria-labelledby": f21, "aria-describedby": m10, "aria-invalid": a20 ? "true" : void 0, disabled: e8 || void 0, autoFocus: r17 }, u16, b9), x11 = (0, import_react111.useMemo)(() => ({ disabled: e8, invalid: a20, hover: t11, focus: o18, autofocus: r17 }), [e8, a20, t11, o18, r17]);
  return L()({ ourProps: y7, theirProps: T10, slot: x11, defaultTag: L5, name: "Textarea" });
}
var J6 = K(H13);
export {
  H2 as Button,
  Fe as Checkbox,
  y2 as CloseButton,
  Uo as Combobox,
  Gt as ComboboxButton,
  zt as ComboboxInput,
  Kt as ComboboxLabel,
  Wt as ComboboxOption,
  jt as ComboboxOptions,
  x5 as DataInteractive,
  H4 as Description,
  yt as Dialog,
  Dt2 as DialogBackdrop,
  Pt2 as DialogDescription,
  je as DialogPanel,
  Ye as DialogTitle,
  je2 as Disclosure,
  Ce as DisclosureButton,
  Re3 as DisclosurePanel,
  H10 as Field,
  G5 as Fieldset,
  ye3 as FocusTrap,
  x6 as FocusTrapFeatures,
  S5 as Input,
  Q as Label,
  d13 as Legend,
  Mo as Listbox,
  Nt2 as ListboxButton,
  Ht2 as ListboxLabel,
  Vt2 as ListboxOption,
  Gt2 as ListboxOptions,
  Kt2 as ListboxSelectedOption,
  on as Menu,
  gt2 as MenuButton,
  At3 as MenuHeading,
  Mt3 as MenuItem,
  Et3 as MenuItems,
  St3 as MenuSection,
  bt as MenuSeparator,
  ao as Popover,
  Rt3 as PopoverBackdrop,
  At4 as PopoverButton,
  _t3 as PopoverGroup,
  Ct2 as PopoverOverlay,
  Bt3 as PopoverPanel,
  oe as Portal,
  Ke2 as Radio,
  mt3 as RadioGroup,
  je3 as RadioGroupDescription,
  $e2 as RadioGroupLabel,
  Ve as RadioGroupOption,
  j8 as Select,
  Ye3 as Switch,
  Ge2 as SwitchDescription,
  Le3 as SwitchGroup,
  Re4 as SwitchLabel,
  Tt3 as Tab,
  Be3 as TabGroup,
  We3 as TabList,
  Ke3 as TabPanel,
  je4 as TabPanels,
  J6 as Textarea,
  ze2 as Transition,
  Fe3 as TransitionChild,
  u7 as useClose
};
/*! Bundled license information:

tabbable/dist/index.esm.js:
  (*!
  * tabbable 6.2.0
  * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
  *)
*/
//# sourceMappingURL=@headlessui_react.js.map
