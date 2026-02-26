/// <reference lib="webworker" />

// Minimal DOM stubs for Three.js / Spline runtime in Worker context
const noop = () => {}
const stubEl: any = {
  style: { setProperty: noop, getPropertyValue: () => "" },
  addEventListener: noop,
  removeEventListener: noop,
  getBoundingClientRect: () => ({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
  }),
  setAttribute: noop,
  getAttribute: () => null,
  appendChild: noop,
  removeChild: noop,
  parentNode: null,
  ownerDocument: null,
  tagName: "CANVAS",
  classList: { add: noop, remove: noop, contains: () => false },
}

if (typeof (self as any).document === "undefined") {
  ;(self as any).document = {
    createElement: (tag: string) => ({
      ...stubEl,
      tagName: tag.toUpperCase(),
      style: {},
    }),
    createElementNS: (_ns: string, tag: string) => ({
      ...stubEl,
      tagName: tag.toUpperCase(),
      style: {},
    }),
    addEventListener: noop,
    removeEventListener: noop,
    documentElement: { ...stubEl, style: {} },
    body: stubEl,
    head: stubEl,
  }
}

if (typeof (self as any).window === "undefined") {
  ;(self as any).window = self
}

if (typeof (self as any).HTMLCanvasElement === "undefined") {
  ;(self as any).HTMLCanvasElement = OffscreenCanvas
}

let app: any = null

self.onmessage = async (e: MessageEvent) => {
  const { type } = e.data

  if (type === "init") {
    const { canvas, scene, width, height, dpr } = e.data

    try {
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)

      const { Application } = await import("@splinetool/runtime")

      app = new Application(canvas)
      await app.load(scene)

      self.postMessage({ type: "loaded" })
    } catch (err: any) {
      self.postMessage({ type: "error", message: err?.message || String(err) })
    }
  }

  if (type === "resize" && app) {
    const { width, height, dpr } = e.data
    try {
      app.setSize?.(Math.round(width * dpr), Math.round(height * dpr))
    } catch {}
  }

  if (type === "play") app?.play?.()
  if (type === "stop") app?.stop?.()

  if (type === "dispose") {
    try {
      app?.dispose?.()
    } catch {}
    app = null
    self.close()
  }
}
