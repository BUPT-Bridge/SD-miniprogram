import { View, Text, Canvas } from "@tarojs/components";
import { useEffect, useMemo, useRef, useState } from "react";
import Taro from "@tarojs/taro";
import { getPolicyPdfBufferByUuid } from "../../api";
import "./index.scss";

const createAbortController = () => {
  if (typeof AbortController !== "undefined") {
    return new AbortController();
  }
  const listeners = new Set();
  const signal = {
    aborted: false,
    addEventListener: (_, listener) => listeners.add(listener),
    removeEventListener: (_, listener) => listeners.delete(listener),
  };
  return {
    signal,
    abort: () => {
      if (signal.aborted) return;
      signal.aborted = true;
      listeners.forEach((listener) => listener());
    },
  };
};

export default function PolicyPreview() {
  const routerParams = Taro.getCurrentInstance().router?.params || {};
  const uuid = useMemo(
    () => decodeURIComponent(routerParams.uuid || ""),
    [routerParams.uuid],
  );
  const title = useMemo(
    () => decodeURIComponent(routerParams.title || "政策文件预览"),
    [routerParams.title],
  );
  const [pageCount, setPageCount] = useState(0);
  const [pageHeights, setPageHeights] = useState({});
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [pdfError, setPdfError] = useState("");
  const [zoom, setZoom] = useState(1);
  const loadingUuidRef = useRef("");
  const abortRef = useRef(null);
  const pdfjsRef = useRef(null);
  const pinchStartDistanceRef = useRef(0);
  const pinchStartZoomRef = useRef(1);

  const clampZoom = (value) => {
    return Math.min(3, Math.max(1, value));
  };

  const getTouchDistance = (touches = []) => {
    if (touches.length < 2) {
      return 0;
    }
    const [first, second] = touches;
    const dx = Number(first.pageX || 0) - Number(second.pageX || 0);
    const dy = Number(first.pageY || 0) - Number(second.pageY || 0);
    return Math.sqrt(dx * dx + dy * dy);
  };

  const ensurePdfjs = async () => {
    if (pdfjsRef.current) {
      return pdfjsRef.current;
    }
    const globalObj = Function("return this")();
    if (typeof globalObj.DOMMatrix === "undefined") {
      class MiniDOMMatrix {
        constructor(init) {
          this.a = 1;
          this.b = 0;
          this.c = 0;
          this.d = 1;
          this.e = 0;
          this.f = 0;
          if (Array.isArray(init)) {
            this.a = Number(init[0] ?? 1);
            this.b = Number(init[1] ?? 0);
            this.c = Number(init[2] ?? 0);
            this.d = Number(init[3] ?? 1);
            this.e = Number(init[4] ?? 0);
            this.f = Number(init[5] ?? 0);
          } else if (init && typeof init === "object") {
            this.a = Number(init.a ?? 1);
            this.b = Number(init.b ?? 0);
            this.c = Number(init.c ?? 0);
            this.d = Number(init.d ?? 1);
            this.e = Number(init.e ?? 0);
            this.f = Number(init.f ?? 0);
          }
          this.m11 = this.a;
          this.m12 = this.b;
          this.m13 = 0;
          this.m14 = 0;
          this.m21 = this.c;
          this.m22 = this.d;
          this.m23 = 0;
          this.m24 = 0;
          this.m31 = 0;
          this.m32 = 0;
          this.m33 = 1;
          this.m34 = 0;
          this.m41 = this.e;
          this.m42 = this.f;
          this.m43 = 0;
          this.m44 = 1;
          this.is2D = true;
          this.isIdentity =
            this.a === 1 &&
            this.b === 0 &&
            this.c === 0 &&
            this.d === 1 &&
            this.e === 0 &&
            this.f === 0;
        }

        _sync() {
          this.m11 = this.a;
          this.m12 = this.b;
          this.m21 = this.c;
          this.m22 = this.d;
          this.m41 = this.e;
          this.m42 = this.f;
          this.isIdentity =
            this.a === 1 &&
            this.b === 0 &&
            this.c === 0 &&
            this.d === 1 &&
            this.e === 0 &&
            this.f === 0;
          return this;
        }

        multiplySelf(other) {
          const o =
            other instanceof MiniDOMMatrix ? other : new MiniDOMMatrix(other);
          const a = this.a * o.a + this.c * o.b;
          const b = this.b * o.a + this.d * o.b;
          const c = this.a * o.c + this.c * o.d;
          const d = this.b * o.c + this.d * o.d;
          const e = this.a * o.e + this.c * o.f + this.e;
          const f = this.b * o.e + this.d * o.f + this.f;
          this.a = a;
          this.b = b;
          this.c = c;
          this.d = d;
          this.e = e;
          this.f = f;
          return this._sync();
        }

        preMultiplySelf(other) {
          const o =
            other instanceof MiniDOMMatrix ? other : new MiniDOMMatrix(other);
          const a = o.a * this.a + o.c * this.b;
          const b = o.b * this.a + o.d * this.b;
          const c = o.a * this.c + o.c * this.d;
          const d = o.b * this.c + o.d * this.d;
          const e = o.a * this.e + o.c * this.f + o.e;
          const f = o.b * this.e + o.d * this.f + o.f;
          this.a = a;
          this.b = b;
          this.c = c;
          this.d = d;
          this.e = e;
          this.f = f;
          return this._sync();
        }

        multiply(other) {
          const clone = new MiniDOMMatrix(this);
          return clone.multiplySelf(other);
        }

        preMultiply(other) {
          const clone = new MiniDOMMatrix(this);
          return clone.preMultiplySelf(other);
        }

        translate(tx = 0, ty = 0) {
          const clone = new MiniDOMMatrix(this);
          return clone.translateSelf(tx, ty);
        }

        translateSelf(tx = 0, ty = 0) {
          return this.multiplySelf([1, 0, 0, 1, tx, ty]);
        }

        scale(scaleX = 1, scaleY = scaleX) {
          const clone = new MiniDOMMatrix(this);
          return clone.scaleSelf(scaleX, scaleY);
        }

        scaleSelf(scaleX = 1, scaleY = scaleX) {
          return this.multiplySelf([scaleX, 0, 0, scaleY, 0, 0]);
        }

        rotate(angle = 0) {
          const clone = new MiniDOMMatrix(this);
          return clone.rotateSelf(angle);
        }

        rotateSelf(angle = 0) {
          const rad = (angle * Math.PI) / 180;
          const cos = Math.cos(rad);
          const sin = Math.sin(rad);
          return this.multiplySelf([cos, sin, -sin, cos, 0, 0]);
        }

        inverse() {
          const clone = new MiniDOMMatrix(this);
          return clone.invertSelf();
        }

        invertSelf() {
          const det = this.a * this.d - this.b * this.c;
          if (!det) {
            this.a = NaN;
            this.b = NaN;
            this.c = NaN;
            this.d = NaN;
            this.e = NaN;
            this.f = NaN;
            return this._sync();
          }
          const a = this.d / det;
          const b = -this.b / det;
          const c = -this.c / det;
          const d = this.a / det;
          const e = (this.c * this.f - this.d * this.e) / det;
          const f = (this.b * this.e - this.a * this.f) / det;
          this.a = a;
          this.b = b;
          this.c = c;
          this.d = d;
          this.e = e;
          this.f = f;
          return this._sync();
        }

        transformPoint(point = { x: 0, y: 0 }) {
          const x = Number(point.x ?? 0);
          const y = Number(point.y ?? 0);
          return {
            x: this.a * x + this.c * y + this.e,
            y: this.b * x + this.d * y + this.f,
            z: Number(point.z ?? 0),
            w: Number(point.w ?? 1),
          };
        }
      }
      globalObj.DOMMatrix = MiniDOMMatrix;
      globalObj.WebKitCSSMatrix = MiniDOMMatrix;
    }
    if (typeof globalObj.ReadableStream === "undefined") {
      class MiniReadableStream {
        constructor(source = {}) {
          this._queue = [];
          this._closed = false;
          this._errored = null;
          this._pending = [];
          const controller = {
            enqueue: (chunk) => {
              if (this._closed || this._errored) return;
              if (this._pending.length > 0) {
                const resolver = this._pending.shift();
                resolver({ value: chunk, done: false });
                return;
              }
              this._queue.push(chunk);
            },
            close: () => {
              if (this._closed || this._errored) return;
              this._closed = true;
              while (this._pending.length > 0) {
                const resolver = this._pending.shift();
                resolver({ value: undefined, done: true });
              }
            },
            error: (error) => {
              if (this._closed || this._errored) return;
              this._errored = error || new Error("Stream error");
              while (this._pending.length > 0) {
                const resolver = this._pending.shift();
                resolver(Promise.reject(this._errored));
              }
            },
          };
          if (typeof source.start === "function") {
            source.start(controller);
          }
          this._source = source;
          this._controller = controller;
        }

        getReader() {
          return {
            read: () => {
              if (this._errored) {
                return Promise.reject(this._errored);
              }
              if (this._queue.length > 0) {
                return Promise.resolve({
                  value: this._queue.shift(),
                  done: false,
                });
              }
              if (this._closed) {
                return Promise.resolve({ value: undefined, done: true });
              }
              if (typeof this._source.pull === "function") {
                this._source.pull(this._controller);
              }
              return new Promise((resolve, reject) => {
                this._pending.push((result) => {
                  if (result && typeof result.then === "function") {
                    result.then(resolve).catch(reject);
                    return;
                  }
                  resolve(result);
                });
              });
            },
            cancel: (reason) => {
              this._closed = true;
              this._queue = [];
              if (typeof this._source.cancel === "function") {
                return Promise.resolve(this._source.cancel(reason));
              }
              return Promise.resolve();
            },
          };
        }
      }
      globalObj.ReadableStream = MiniReadableStream;
    }
    if (typeof globalObj.DOMException === "undefined") {
      class MiniDomException extends Error {
        constructor(message, name) {
          super(message || "");
          this.name = name || "Error";
        }
      }
      globalObj.DOMException = MiniDomException;
    }
    const module = await import("pdfjs-dist/legacy/build/pdf");
    const pdfjs = module?.getDocument ? module : module?.default;
    if (!pdfjs || typeof pdfjs.getDocument !== "function") {
      throw new Error("Load pdf.js failed");
    }
    pdfjsRef.current = pdfjs;
    return pdfjs;
  };

  const patchCanvasTextFallback = (context) => {
    if (!context || context.__pdfTextFallbackPatched) {
      return;
    }
    const pickSafeFont = (fontValue) => {
      const fontText = String(fontValue || "");
      const sizeMatch = fontText.match(/(\d+(\.\d+)?)px/);
      const px = sizeMatch ? sizeMatch[1] : "16";
      return `${px}px "PingFang SC","Microsoft YaHei","Helvetica Neue",Arial,sans-serif`;
    };
    const wrap = (methodName) => {
      const origin = context[methodName];
      if (typeof origin !== "function") {
        return;
      }
      context[methodName] = function patchedTextMethod(...args) {
        const originalFont = this.font;
        const shouldFallback =
          typeof originalFont === "string" &&
          /g_d\d+_f\d+|pdfjs|unknown/i.test(originalFont);
        if (shouldFallback) {
          this.font = pickSafeFont(originalFont);
        }
        const result = origin.apply(this, args);
        if (shouldFallback) {
          this.font = originalFont;
        }
        return result;
      };
    };
    wrap("fillText");
    wrap("strokeText");
    context.__pdfTextFallbackPatched = true;
  };

  const drawTextOverlay = async ({
    page,
    viewport,
    context,
    pdfjs,
    pixelRatio,
  }) => {
    const textContent = await page.getTextContent();
    const items = textContent?.items || [];
    if (!items.length) {
      return;
    }
    const fontFamily =
      '"PingFang SC","Microsoft YaHei","Noto Sans CJK SC","Helvetica Neue",Arial,sans-serif';
    context.save();
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.fillStyle = "#111";
    context.textBaseline = "alphabetic";
    for (const item of items) {
      const str = item?.str || "";
      if (!str) {
        continue;
      }
      const tx = pdfjs.Util.transform(viewport.transform, item.transform);
      context.save();
      context.transform(tx[0], tx[1], tx[2], tx[3], tx[4], tx[5]);
      context.scale(1, -1);
      context.font = `1px ${fontFamily}`;
      context.fillText(str, 0, 0);
      context.restore();
    }
    context.restore();
  };

  const renderPageWithoutBuiltinText = async ({ page, context, viewport }) => {
    const originFillText = context.fillText;
    const originStrokeText = context.strokeText;
    context.fillText = () => {};
    context.strokeText = () => {};
    try {
      await page.render({
        canvasContext: context,
        viewport,
      }).promise;
    } finally {
      context.fillText = originFillText;
      context.strokeText = originStrokeText;
    }
  };

  useEffect(() => {
    if (!uuid) {
      setPdfError("文件标识为空");
      return;
    }

    const controller = createAbortController();
    abortRef.current = controller;

    const getCanvasNode = (canvasId) => {
      return new Promise((resolve, reject) => {
        Taro.createSelectorQuery()
          .select(`#${canvasId}`)
          .fields({ node: true, size: true }, (res) => {
            if (res && res.node) {
              resolve(res);
              return;
            }
            reject(new Error(`Canvas not found: ${canvasId}`));
          })
          .exec();
      });
    };

    const renderPdf = async () => {
      try {
        loadingUuidRef.current = uuid;
        setLoadingPdf(true);
        setPdfError("");
        setPageCount(0);
        setPageHeights({});
        const pdfBinary = await getPolicyPdfBufferByUuid(uuid, {
          signal: controller.signal,
        });
        if (loadingUuidRef.current !== uuid || controller.signal.aborted) {
          return;
        }
        const data =
          pdfBinary instanceof Uint8Array
            ? pdfBinary
            : new Uint8Array(pdfBinary);
        const pdfjs = await ensurePdfjs();
        const loadingTask = pdfjs.getDocument({
          data,
          disableWorker: true,
          cMapUrl: "/cmaps/",
          cMapPacked: true,
          standardFontDataUrl: "/standard_fonts/",
          useSystemFonts: true,
          disableFontFace: false,
        });
        const pdf = await loadingTask.promise;
        if (loadingUuidRef.current !== uuid || controller.signal.aborted) {
          await loadingTask.destroy();
          return;
        }
        setPageCount(pdf.numPages);
        const useTextOverlay = true;
        await new Promise((resolve) => setTimeout(resolve, 0));
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          if (loadingUuidRef.current !== uuid || controller.signal.aborted) {
            break;
          }
          const page = await pdf.getPage(pageNumber);
          const canvasId = `pdf-canvas-${pageNumber}`;
          const canvasInfo = await getCanvasNode(canvasId);
          const canvas = canvasInfo.node;
          const context = canvas.getContext("2d");
          patchCanvasTextFallback(context);
          const baseViewport = page.getViewport({ scale: 1 });
          const scale = canvasInfo.width / baseViewport.width;
          const viewport = page.getViewport({ scale: scale > 0 ? scale : 1.2 });
          setPageHeights((prev) => {
            if (prev[pageNumber] === viewport.height) {
              return prev;
            }
            return {
              ...prev,
              [pageNumber]: viewport.height,
            };
          });
          const pixelRatio =
            Taro.getWindowInfo?.().pixelRatio ||
            Taro.getDeviceInfo?.().pixelRatio ||
            Taro.getSystemInfoSync().pixelRatio ||
            1;
          canvas.width = Math.floor(viewport.width * pixelRatio);
          canvas.height = Math.floor(viewport.height * pixelRatio);
          context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
          context.clearRect(0, 0, viewport.width, viewport.height);
          if (useTextOverlay) {
            await renderPageWithoutBuiltinText({
              page,
              context,
              viewport,
            });
            await drawTextOverlay({
              page,
              viewport,
              context,
              pdfjs,
              pixelRatio,
            });
          } else {
            await page.render({
              canvasContext: context,
              viewport,
            }).promise;
          }
        }
        await pdf.destroy();
      } catch (error) {
        if (error?.name === "AbortError") {
          return;
        }
        console.error("PDF render failed", error);
        setPdfError(error?.message || "PDF预览失败");
      } finally {
        if (loadingUuidRef.current === uuid && !controller.signal.aborted) {
          setLoadingPdf(false);
        }
      }
    };

    renderPdf();

    return () => {
      controller.abort();
      loadingUuidRef.current = "";
    };
  }, [uuid]);

  const goBack = () => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    Taro.navigateBack();
  };

  const handleTouchStart = (event) => {
    const touches = event?.touches || [];
    if (touches.length < 2) {
      return;
    }
    const distance = getTouchDistance(touches);
    if (!distance) {
      return;
    }
    pinchStartDistanceRef.current = distance;
    pinchStartZoomRef.current = zoom;
  };

  const handleTouchMove = (event) => {
    const touches = event?.touches || [];
    if (touches.length < 2 || !pinchStartDistanceRef.current) {
      return;
    }
    const nextDistance = getTouchDistance(touches);
    if (!nextDistance) {
      return;
    }
    const scaleRatio = nextDistance / pinchStartDistanceRef.current;
    const nextZoom = clampZoom(pinchStartZoomRef.current * scaleRatio);
    setZoom(nextZoom);
  };

  const handleTouchEnd = () => {
    pinchStartDistanceRef.current = 0;
  };

  const handleWheelZoom = (event) => {
    const nativeEvent = event?.nativeEvent || event;
    if (!nativeEvent?.ctrlKey && !nativeEvent?.metaKey) {
      return;
    }
    event?.preventDefault?.();
    const deltaY = Number(nativeEvent.deltaY || 0);
    const step = deltaY > 0 ? -0.1 : 0.1;
    setZoom((prev) => clampZoom(prev + step));
  };

  const totalBaseHeight = useMemo(() => {
    let total = 0;
    for (let i = 1; i <= pageCount; i += 1) {
      total += Math.max(pageHeights[i] || 320, 200) + 80;
    }
    return total;
  }, [pageCount, pageHeights]);

  return (
    <View className="policy-preview-page">
      <View className="custom-header">
        <View className="nav-bar">
          <View className="back-btn" onClick={goBack}>
            <Text>&lt; 返回</Text>
          </View>
        </View>
        <View className="header-content">
          <Text className="title">{title}</Text>
        </View>
      </View>

      <View className="pdf-preview-card">
        {loadingPdf && <Text className="pdf-status">正在加载PDF...</Text>}
        {!!pdfError && <Text className="pdf-status error">{pdfError}</Text>}
        {!loadingPdf && !pdfError && pageCount === 0 && (
          <Text className="pdf-status">PDF内容为空</Text>
        )}
        <View
          className="pdf-zoom-panel"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          onWheel={handleWheelZoom}
        >
          <View
            className="pdf-zoom-stage"
            style={{
              height: `${Math.max(totalBaseHeight * zoom, totalBaseHeight)}px`,
            }}
          >
            <View
              className="pdf-zoom-layer"
              style={{
                transform: `scale(${zoom})`,
              }}
            >
              {Array.from({ length: pageCount }).map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <View key={pageNumber} className="pdf-page">
                    <Text className="page-label">第 {pageNumber} 页</Text>
                    <View
                      className="pdf-canvas-box"
                      style={{
                        height: `${Math.max(pageHeights[pageNumber] || 320, 200)}px`,
                      }}
                    >
                      <Canvas
                        id={`pdf-canvas-${pageNumber}`}
                        canvasId={`pdf-canvas-${pageNumber}`}
                        type="2d"
                        className="pdf-canvas"
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </View>
      <View className="floating-back-btn" onClick={goBack}>
        <Text>返回上一级</Text>
      </View>
    </View>
  );
}
