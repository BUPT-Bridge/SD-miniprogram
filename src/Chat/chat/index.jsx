/* global requirePlugin, wx */
import { useEffect, useRef, useState } from "react";
import Taro, { useLoad } from "@tarojs/taro";
import { View, Text, ScrollView, Textarea, RichText } from "@tarojs/components";
import Button from "@taroify/core/button";
import Arrow from "@taroify/icons/Arrow";
import Stop from "@taroify/icons/Stop";
import SmileOutlined from "@taroify/icons/SmileOutlined";
import FontOutlined from "@taroify/icons/FontOutlined";
import UserOutlined from "@taroify/icons/UserOutlined";
import ChatOutlined from "@taroify/icons/ChatOutlined";
import AddOutlined from "@taroify/icons/AddOutlined";
import {
  sendMessageStream,
  saveChatHistory,
  getChatById,
  generateChatId,
  generateSmartTitle,
} from "../api/bailian";
import {
  saveChatMessage,
  getChatSessions,
  getChatSessionDetail,
  getUserInfo,
} from "../../api";
import { BAILIAN_CONFIG } from "../config/bailian";
import "./index.scss";

const WELCOME_MESSAGE =
  "你好！我是上地街道 AI 助手，可以为您提供社区服务、政策咨询和生活指引。";
const NEW_CHAT_TITLE = "新对话";
const STREAM_INTERVAL = 30;
const TTS_CHUNK_MAX_LENGTH = 150;
const VOICE_RECOGNITION_TIMEOUT = 12000;

const VOICE_STATUS = {
  IDLE: "idle",
  RECORDING: "recording",
  RECOGNIZING: "recognizing",
};

const TTS_STATUS = {
  IDLE: "idle",
  SYNTHESIZING: "synthesizing",
  PLAYING: "playing",
  PAUSED: "paused",
};

const ttsStatusLabelMap = {
  [TTS_STATUS.IDLE]: "未播放",
  [TTS_STATUS.SYNTHESIZING]: "语音生成中",
  [TTS_STATUS.PLAYING]: "正在播放",
  [TTS_STATUS.PAUSED]: "暂停中",
};

const voiceDebugLog = (step, data = {}) => {
  const payload = {
    step,
    time: new Date().toISOString(),
    env: process.env.TARO_ENV,
    ...data,
  };

  console.info("[ChatVoice]", payload);
};

const voiceDebugWarn = (step, data = {}) => {
  const payload = {
    step,
    time: new Date().toISOString(),
    env: process.env.TARO_ENV,
    ...data,
  };

  console.warn("[ChatVoice]", payload);
};

const getWechatSIPlugin = () => {
  if (process.env.TARO_ENV !== "weapp") {
    voiceDebugWarn("plugin.skip.non-weapp");
    return null;
  }

  try {
    const pluginLoader =
      typeof requirePlugin === "function"
        ? requirePlugin
        : typeof wx !== "undefined" && typeof wx.requirePlugin === "function"
          ? wx.requirePlugin
          : typeof window !== "undefined" &&
              typeof window.requirePlugin === "function"
            ? window.requirePlugin
            : null;
    voiceDebugLog("plugin.loader.check", {
      hasRequirePlugin: typeof requirePlugin === "function",
      hasWxRequirePlugin:
        typeof wx !== "undefined" && typeof wx.requirePlugin === "function",
      hasWindowRequirePlugin:
        typeof window !== "undefined" &&
        typeof window.requirePlugin === "function",
      hasPluginLoader: typeof pluginLoader === "function",
    });

    if (typeof pluginLoader !== "function") return null;

    const plugin = pluginLoader("WechatSI");
    voiceDebugLog("plugin.load.result", {
      hasPlugin: Boolean(plugin),
      hasRecordManager: Boolean(plugin?.getRecordRecognitionManager),
      hasTextToSpeech: Boolean(plugin?.textToSpeech),
    });
    return plugin;
  } catch (error) {
    voiceDebugWarn("plugin.load.error", {
      errMsg: error?.errMsg,
      message: error?.message,
      error,
    });
    return null;
  }
};

const getRecordRecognitionManager = () => {
  const plugin = getWechatSIPlugin();
  const manager = plugin?.getRecordRecognitionManager?.() || null;
  voiceDebugLog("manager.get.result", {
    hasPlugin: Boolean(plugin),
    hasManager: Boolean(manager),
    managerKeys: manager ? Object.keys(manager) : [],
  });
  return manager;
};

const bindManagerEvent = (manager, eventName, handler) => {
  if (!manager) return;

  // WechatSI's official sample uses property callbacks:
  // manager.onStop = function (res) {}
  // Some docs list them as methods, but assigning is the reliable behavior on
  // real devices for this plugin.
  manager[eventName] = handler;
  voiceDebugLog("manager.event.bound", {
    eventName,
    eventTypeAfterBind: typeof manager[eventName],
  });
};

const escapeHtml = (text = "") =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const renderInlineMarkdown = (line = "") => {
  let html = escapeHtml(line);
  html = html.replace(/`([^`]+)`/g, '<code class="md-inline-code">$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2">$1</a>',
  );
  return html;
};

const renderMarkdownToHtml = (markdown = "") => {
  const normalized = markdown.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");
  const blocks = [];
  let inCode = false;
  let codeLines = [];
  let listItems = [];

  const flushList = () => {
    if (!listItems.length) return;
    blocks.push(`<ul>${listItems.join("")}</ul>`);
    listItems = [];
  };

  lines.forEach((rawLine) => {
    const line = rawLine || "";

    if (line.trim().startsWith("```")) {
      flushList();
      if (!inCode) {
        inCode = true;
        codeLines = [];
      } else {
        blocks.push(
          `<pre class="md-code-block"><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`,
        );
        inCode = false;
        codeLines = [];
      }
      return;
    }

    if (inCode) {
      codeLines.push(line);
      return;
    }

    const listMatch = line.match(/^\s*[-*+]\s+(.+)/);
    if (listMatch) {
      listItems.push(`<li>${renderInlineMarkdown(listMatch[1])}</li>`);
      return;
    }

    flushList();

    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      blocks.push(
        `<h${level}>${renderInlineMarkdown(headingMatch[2])}</h${level}>`,
      );
      return;
    }

    if (!line.trim()) {
      blocks.push("<br />");
      return;
    }

    blocks.push(`<p>${renderInlineMarkdown(line)}</p>`);
  });

  if (inCode && codeLines.length) {
    blocks.push(
      `<pre class="md-code-block"><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`,
    );
  }
  flushList();

  return blocks.join("");
};

const normalizeSpeechText = (content = "") =>
  content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\r\n/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .replace(/\s+/g, " ")
    .trim();

const splitTextForTTS = (text = "", maxLength = TTS_CHUNK_MAX_LENGTH) => {
  const normalized = normalizeSpeechText(text);
  if (!normalized) return [];

  const segments = [];
  let current = "";
  const punctuation = "，。！？；：,.;!?、\n";

  for (const char of normalized) {
    current += char;

    if (current.length >= maxLength) {
      let splitIndex = -1;
      for (let i = current.length - 1; i >= 0; i -= 1) {
        if (punctuation.includes(current[i])) {
          splitIndex = i + 1;
          break;
        }
      }

      if (splitIndex <= 0 || splitIndex < maxLength * 0.45) {
        splitIndex = maxLength;
      }

      const chunk = current.slice(0, splitIndex).trim();
      if (chunk) segments.push(chunk);
      current = current.slice(splitIndex).trimStart();
    }
  }

  if (current.trim()) {
    segments.push(current.trim());
  }

  return segments;
};

const createTTSState = () => ({
  status: TTS_STATUS.IDLE,
  audioSources: [],
  currentIndex: 0,
});

export default function Chat() {
  const [chatId, setChatId] = useState("");
  const [chatTitle, setChatTitle] = useState(NEW_CHAT_TITLE);
  const [messages, setMessages] = useState([
    { id: "welcome", type: "ai", content: WELCOME_MESSAGE, isWelcome: true },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [streamingId, setStreamingId] = useState(null);
  const [fontSize, setFontSize] = useState("normal");
  const [apiKey, setApiKey] = useState("");
  const [voiceStatus, setVoiceStatus] = useState(VOICE_STATUS.IDLE);
  const [ttsStateMap, setTtsStateMap] = useState({});

  const abortFnRef = useRef(null);
  const textBufferRef = useRef([]);
  const isStreamActiveRef = useRef(false);
  const streamTimerRef = useRef(null);
  const scrollIntoViewId = useRef("");
  const audioContextRef = useRef(null);
  const triggerChatRef = useRef(null);
  const playCurrentSegmentRef = useRef(null);
  const resetTTSStateRef = useRef(null);
  const activePlaybackRef = useRef({
    messageId: "",
    index: 0,
    audioSources: [],
  });
  const pendingTTSMessageIdRef = useRef("");
  const recordRecognitionManagerRef = useRef(null);
  const recognitionTimeoutRef = useRef(null);
  const speechResultRef = useRef("");
  const isRecognitionBoundRef = useRef(false);

  const quickQuestions = [
    "如何办理居住证？",
    "社区医院在哪里？",
    "养老服务有哪些？",
    "垃圾分类怎么分？",
  ];

  const fontSizeOptions = [
    { label: "小", value: "small", size: "14px" },
    { label: "中", value: "normal", size: "18px" },
    { label: "大", value: "large", size: "26px" },
  ];
  const currentFontSize = fontSizeOptions.find(
    (item) => item.value === fontSize,
  );

  const patchTTSState = (messageId, patch) => {
    if (!messageId) return;

    setTtsStateMap((prev) => ({
      ...prev,
      [messageId]: {
        ...(prev[messageId] || createTTSState()),
        ...patch,
      },
    }));
  };

  const resetTTSState = (messageId) => {
    if (!messageId) return;
    patchTTSState(messageId, createTTSState());
  };

  const getVoiceButtonLabel = () => {
    if (voiceStatus === VOICE_STATUS.RECORDING) return "结束";
    if (voiceStatus === VOICE_STATUS.RECOGNIZING) return "识别中";
    return "语音";
  };

  const getInputTipText = () => {
    if (voiceStatus === VOICE_STATUS.RECORDING) {
      return "正在聆听，点击语音按钮结束录音并自动发送";
    }

    if (voiceStatus === VOICE_STATUS.RECOGNIZING) {
      return "正在将语音转换成文字，请稍候";
    }

    return "AI 助手回答仅供参考，具体政策以官方发布为准。";
  };

  const clearRecognitionTimeout = () => {
    if (!recognitionTimeoutRef.current) return;
    clearTimeout(recognitionTimeoutRef.current);
    recognitionTimeoutRef.current = null;
    voiceDebugLog("timeout.clear");
  };

  const setupRecordRecognitionManager = () => {
    const recordRecognitionManager =
      recordRecognitionManagerRef.current || getRecordRecognitionManager();
    recordRecognitionManagerRef.current = recordRecognitionManager;

    if (!recordRecognitionManager) {
      voiceDebugWarn("manager.unavailable");
    }

    if (!recordRecognitionManager || isRecognitionBoundRef.current) {
      voiceDebugLog("manager.setup.skip", {
        hasManager: Boolean(recordRecognitionManager),
        alreadyBound: isRecognitionBoundRef.current,
      });
      return recordRecognitionManager;
    }

    const handleStop = (res) => {
      voiceDebugLog("event.stop", {
        duration: res?.duration,
        fileSize: res?.fileSize,
        hasResult: Boolean(res?.result),
        resultLength: res?.result?.length || 0,
        hasFallbackResult: Boolean(speechResultRef.current),
        fallbackResultLength: speechResultRef.current.length,
        msg: res?.msg,
        retcode: res?.retcode,
        tempFilePath: res?.tempFilePath,
      });
      clearRecognitionTimeout();
      setVoiceStatus(VOICE_STATUS.IDLE);

      const result = (res?.result || speechResultRef.current || "").trim();
      speechResultRef.current = "";
      if (!result) {
        voiceDebugWarn("event.stop.empty-result", {
          rawResult: res?.result,
          duration: res?.duration,
          fileSize: res?.fileSize,
        });
        Taro.showToast({
          title: "没有识别到有效语音",
          icon: "none",
        });
        return;
      }

      setInputValue(result);
      voiceDebugLog("event.stop.send-result", {
        resultLength: result.length,
        preview: result.slice(0, 30),
      });
      triggerChatRef.current?.(result);
    };

    const handleError = (res) => {
      voiceDebugWarn("event.error", {
        retcode: res?.retcode,
        msg: res?.msg,
        errMsg: res?.errMsg,
        raw: res,
      });
      clearRecognitionTimeout();
      speechResultRef.current = "";
      setVoiceStatus(VOICE_STATUS.IDLE);
      Taro.showToast({
        title: res?.msg || "语音识别失败",
        icon: "none",
      });
    };

    bindManagerEvent(recordRecognitionManager, "onStart", () => {
      voiceDebugLog("event.start", {
        statusBefore: voiceStatus,
      });
      clearRecognitionTimeout();
      speechResultRef.current = "";
      setVoiceStatus(VOICE_STATUS.RECORDING);
    });
    bindManagerEvent(recordRecognitionManager, "onStop", handleStop);
    bindManagerEvent(recordRecognitionManager, "onError", handleError);
    bindManagerEvent(recordRecognitionManager, "onRecognize", (res) => {
      const result = res?.result?.trim();
      if (!result) return;
      voiceDebugLog("event.recognize.partial", {
        resultLength: result.length,
        preview: result.slice(0, 30),
      });
      speechResultRef.current = result;
      setInputValue(result);
    });

    isRecognitionBoundRef.current = true;
    voiceDebugLog("manager.setup.done");
    return recordRecognitionManager;
  };

  const stopPlayback = (nextStatus = TTS_STATUS.IDLE) => {
    const currentMessageId = activePlaybackRef.current.messageId;
    if (audioContextRef.current) {
      try {
        audioContextRef.current.stop();
      } catch (error) {
        console.warn("[Chat] 停止音频失败:", error);
      }
    }

    if (currentMessageId) {
      patchTTSState(currentMessageId, {
        status: nextStatus,
        currentIndex: 0,
      });
    }

    activePlaybackRef.current = {
      messageId: "",
      index: 0,
      audioSources: [],
    };
  };

  const playCurrentSegment = (messageId, index) => {
    const context = audioContextRef.current;
    const playback = activePlaybackRef.current;
    const src = playback.audioSources[index];

    if (!context || !src) {
      stopPlayback(TTS_STATUS.IDLE);
      return;
    }

    playback.messageId = messageId;
    playback.index = index;

    patchTTSState(messageId, {
      status: TTS_STATUS.PLAYING,
      currentIndex: index,
      audioSources: playback.audioSources,
    });

    context.autoplay = false;
    context.src = src;
    context.play();
  };

  const startPlayback = (messageId, audioSources, startIndex = 0) => {
    stopPlayback(TTS_STATUS.IDLE);
    activePlaybackRef.current = {
      messageId,
      index: startIndex,
      audioSources,
    };
    playCurrentSegment(messageId, startIndex);
  };

  playCurrentSegmentRef.current = playCurrentSegment;
  resetTTSStateRef.current = resetTTSState;

  const requestTextToSpeech = (content) =>
    new Promise((resolve, reject) => {
      const wechatSIPlugin = getWechatSIPlugin();
      if (!wechatSIPlugin?.textToSpeech) {
        reject(new Error("微信文字转语音插件未就绪"));
        return;
      }

      wechatSIPlugin.textToSpeech({
        lang: "zh_CN",
        content,
        success: (res) => {
          if (res?.retcode === 0 && res.filename) {
            resolve(res.filename);
            return;
          }

          reject(
            new Error(
              res?.msg ||
                (typeof res?.retcode === "number"
                  ? `语音合成失败(${res.retcode})`
                  : "语音合成失败"),
            ),
          );
        },
        fail: (error) => {
          reject(new Error(error?.msg || error?.errMsg || "语音合成请求失败"));
        },
      });
    });

  const handlePlayAITTS = async (message) => {
    const messageId = message?.id;
    if (!messageId) return;

    if (!audioContextRef.current) {
      Taro.showToast({
        title: "当前环境不支持语音播放",
        icon: "none",
      });
      return;
    }

    const currentState = ttsStateMap[messageId] || createTTSState();
    const isCurrentActive = activePlaybackRef.current.messageId === messageId;

    if (currentState.status === TTS_STATUS.SYNTHESIZING) {
      return;
    }

    if (isCurrentActive && currentState.status === TTS_STATUS.PLAYING) {
      audioContextRef.current.pause();
      patchTTSState(messageId, { status: TTS_STATUS.PAUSED });
      return;
    }

    if (isCurrentActive && currentState.status === TTS_STATUS.PAUSED) {
      audioContextRef.current.play();
      patchTTSState(messageId, { status: TTS_STATUS.PLAYING });
      return;
    }

    if (currentState.audioSources?.length) {
      startPlayback(messageId, currentState.audioSources, 0);
      return;
    }

    const chunks = splitTextForTTS(message.content);
    if (!chunks.length) {
      Taro.showToast({
        title: "当前消息没有可播放内容",
        icon: "none",
      });
      return;
    }

    pendingTTSMessageIdRef.current = messageId;
    patchTTSState(messageId, {
      status: TTS_STATUS.SYNTHESIZING,
      currentIndex: 0,
      audioSources: [],
    });

    try {
      const audioSources = [];

      for (const chunk of chunks) {
        if (pendingTTSMessageIdRef.current !== messageId) {
          return;
        }

        const audioUrl = await requestTextToSpeech(chunk);
        audioSources.push(audioUrl);
      }

      patchTTSState(messageId, {
        status: TTS_STATUS.IDLE,
        currentIndex: 0,
        audioSources,
      });

      if (pendingTTSMessageIdRef.current === messageId) {
        startPlayback(messageId, audioSources, 0);
      }
    } catch (error) {
      resetTTSState(messageId);
      Taro.showToast({
        title: error.message || "语音生成失败",
        icon: "none",
      });
    } finally {
      if (pendingTTSMessageIdRef.current === messageId) {
        pendingTTSMessageIdRef.current = "";
      }
    }
  };

  const initNewChat = () => {
    const newChatId = generateChatId();
    stopPlayback(TTS_STATUS.IDLE);
    pendingTTSMessageIdRef.current = "";
    setTtsStateMap({});
    setChatId(newChatId);
    setChatTitle(NEW_CHAT_TITLE);
    setMessages([
      {
        id: "welcome",
        type: "ai",
        content: WELCOME_MESSAGE,
        isWelcome: true,
      },
    ]);
    setInputValue("");
    setStreamingText("");
    setStreamingId(null);
  };

  useLoad(() => {
    const { chatId: urlChatId } =
      Taro.getCurrentInstance().router?.params || {};

    if (urlChatId) {
      const chatData = getChatById(urlChatId);
      if (chatData) {
        setChatId(urlChatId);
        setChatTitle(chatData.title || NEW_CHAT_TITLE);
        setMessages(chatData.messages?.length ? chatData.messages : []);
      } else {
        initNewChat();
      }
    } else {
      initNewChat();
    }

    if (!BAILIAN_CONFIG.API_URL) {
      Taro.showModal({
        title: "配置提示",
        content: "百炼 API URL 未配置，请先完成环境配置。",
        showCancel: false,
      });
    }

    const loadApiKey = async () => {
      const token = Taro.getStorageSync("token");
      if (!token) {
        setApiKey("");
        return;
      }

      try {
        const res = await getUserInfo();
        const key = res?.user?.xApiKey || res?.user?.x_api_key || "";
        setApiKey(key);
      } catch (error) {
        console.error("[Chat] 获取用户 API Key 失败:", error);
        setApiKey("");
      }
    };

    loadApiKey();
  });

  useEffect(() => {
    if (!audioContextRef.current && Taro.createInnerAudioContext) {
      const context = Taro.createInnerAudioContext({
        useWebAudioImplement: true,
      });
      context.obeyMuteSwitch = false;
      context.onEnded(() => {
        const { messageId, index, audioSources } = activePlaybackRef.current;
        if (!messageId || !audioSources.length) return;

        const nextIndex = index + 1;
        if (nextIndex < audioSources.length) {
          playCurrentSegmentRef.current?.(messageId, nextIndex);
          return;
        }

        resetTTSStateRef.current?.(messageId);
        activePlaybackRef.current = {
          messageId: "",
          index: 0,
          audioSources: [],
        };
      });
      context.onPause(() => {
        const { messageId } = activePlaybackRef.current;
        if (messageId) {
          patchTTSState(messageId, { status: TTS_STATUS.PAUSED });
        }
      });
      context.onStop(() => {
        const { messageId } = activePlaybackRef.current;
        if (messageId) {
          resetTTSStateRef.current?.(messageId);
        }
        activePlaybackRef.current = {
          messageId: "",
          index: 0,
          audioSources: [],
        };
      });
      context.onError((error) => {
        const { messageId } = activePlaybackRef.current;
        if (messageId) {
          resetTTSStateRef.current?.(messageId);
        }
        activePlaybackRef.current = {
          messageId: "",
          index: 0,
          audioSources: [],
        };
        Taro.showToast({
          title: error?.errMsg || "语音播放失败",
          icon: "none",
        });
      });
      audioContextRef.current = context;
    }

    return () => {
      pendingTTSMessageIdRef.current = "";
      if (recognitionTimeoutRef.current) {
        clearTimeout(recognitionTimeoutRef.current);
        recognitionTimeoutRef.current = null;
      }

      if (recordRecognitionManagerRef.current) {
        try {
          recordRecognitionManagerRef.current.stop();
        } catch (error) {
          console.warn("[Chat] 页面卸载时停止录音失败:", error);
        }
      }
      isRecognitionBoundRef.current = false;
      recordRecognitionManagerRef.current = null;

      if (audioContextRef.current) {
        try {
          audioContextRef.current.destroy();
        } catch (error) {
          console.warn("[Chat] 销毁音频上下文失败:", error);
        }
        audioContextRef.current = null;
      }
    };
  }, []);

  const resolveApiKey = async () => {
    if (apiKey) return apiKey;

    const token = Taro.getStorageSync("token");
    if (!token) return "";

    try {
      const res = await getUserInfo();
      const key = res?.user?.xApiKey || res?.user?.x_api_key || "";
      setApiKey(key);
      return key;
    } catch (error) {
      console.error("[Chat] 获取 API Key 失败:", error);
      return "";
    }
  };

  const saveCurrentChat = (newMessages, title = null) => {
    if (!chatId) return;
    const finalTitle = title || chatTitle;
    const messagesToSave = newMessages.filter((item) => !item.isWelcome);
    if (messagesToSave.length > 0) {
      saveChatHistory(chatId, finalTitle, messagesToSave);
    }
  };

  const handleFontSizeChange = () => {
    const currentIndex = fontSizeOptions.findIndex(
      (item) => item.value === fontSize,
    );
    const nextIndex = (currentIndex + 1) % fontSizeOptions.length;
    setFontSize(fontSizeOptions[nextIndex].value);
    Taro.showToast({
      title: `字体已切换为${fontSizeOptions[nextIndex].label}`,
      icon: "none",
      duration: 1500,
    });
  };

  const handleNewChat = () => {
    initNewChat();
    Taro.showToast({
      title: "已创建新对话",
      icon: "success",
      duration: 1500,
    });
  };

  const handleStopGenerating = () => {
    isStreamActiveRef.current = false;
    textBufferRef.current = [];

    if (streamTimerRef.current) {
      clearInterval(streamTimerRef.current);
      streamTimerRef.current = null;
    }

    if (abortFnRef.current) {
      abortFnRef.current();
      abortFnRef.current = null;
    }

    setIsLoading(false);
    setStreamingId(null);
    setStreamingText("");
  };

  const finishStream = async (
    fullText,
    streamId,
    userContent,
    runtimeApiKey,
  ) => {
    const aiMessage = { id: streamId, type: "ai", content: fullText };

    setMessages((prev) => {
      const newMessages = [...prev, aiMessage];
      saveCurrentChat(newMessages, chatTitle);
      return newMessages;
    });

    setStreamingId(null);
    setStreamingText("");
    setIsLoading(false);
    abortFnRef.current = null;
    isStreamActiveRef.current = false;
    textBufferRef.current = [];

    if (streamTimerRef.current) {
      clearInterval(streamTimerRef.current);
      streamTimerRef.current = null;
    }

    let currentTitle = chatTitle;
    if (chatTitle === NEW_CHAT_TITLE || chatTitle === "New Chat") {
      try {
        const smartTitle = await generateSmartTitle(
          userContent,
          fullText,
          runtimeApiKey,
        );
        if (smartTitle) {
          setChatTitle(smartTitle);
          currentTitle = smartTitle;
          setMessages((prev) => {
            saveCurrentChat(prev, smartTitle);
            return prev;
          });
        }
      } catch (error) {
        console.error("[Chat] 智能标题生成失败:", error);
      }
    }

    try {
      const payload = {
        session_id: chatId.startsWith("session_") ? chatId : "",
        title: currentTitle,
        user_message: userContent,
        ai_response: fullText,
      };
      const res = await saveChatMessage(payload);

      if (
        res &&
        res.code === 200 &&
        res.session_id &&
        res.session_id !== chatId
      ) {
        setChatId(res.session_id);
      }
    } catch (error) {
      console.error("[Chat] 同步对话到后端失败:", error);
    }
  };

  const handleStreamError = (error, streamId) => {
    isStreamActiveRef.current = false;
    textBufferRef.current = [];

    if (streamTimerRef.current) {
      clearInterval(streamTimerRef.current);
      streamTimerRef.current = null;
    }

    Taro.showToast({
      title: error.message || "请求失败",
      icon: "none",
      duration: 2000,
    });

    const errorMessage = {
      id: streamId,
      type: "ai",
      content: `抱歉，发生错误：${error.message || "未知错误"}`,
    };

    setMessages((prev) => {
      const newMessages = [...prev, errorMessage];
      saveCurrentChat(newMessages);
      return newMessages;
    });

    setStreamingId(null);
    setStreamingText("");
    setIsLoading(false);
    abortFnRef.current = null;
  };

  const handleStreamAbort = (streamId) => {
    isStreamActiveRef.current = false;
    textBufferRef.current = [];

    if (streamTimerRef.current) {
      clearInterval(streamTimerRef.current);
      streamTimerRef.current = null;
    }

    if (streamingText) {
      const partialMessage = {
        id: streamId,
        type: "ai",
        content: streamingText || "已停止生成",
      };
      setMessages((prev) => {
        const newMessages = [...prev, partialMessage];
        saveCurrentChat(newMessages);
        return newMessages;
      });
    }

    setStreamingId(null);
    setStreamingText("");
    setIsLoading(false);
    abortFnRef.current = null;
  };

  const triggerChat = async (content) => {
    if (!content?.trim() || isLoading) return;

    if (!BAILIAN_CONFIG.API_URL) {
      Taro.showToast({
        title: "请先配置百炼 API URL",
        icon: "none",
        duration: 2000,
      });
      return;
    }

    const runtimeApiKey = await resolveApiKey();
    if (!runtimeApiKey) {
      Taro.showToast({
        title: "请先登录后再使用 AI 助手",
        icon: "none",
        duration: 2000,
      });
      return;
    }

    const userMessage = {
      id: Date.now().toString(),
      type: "user",
      content,
    };

    setMessages((prev) => {
      const newMessages = [...prev, userMessage];
      saveCurrentChat(newMessages);
      return newMessages;
    });

    setInputValue("");
    setIsLoading(true);

    const streamId = `${Date.now() + 1}`;
    setStreamingId(streamId);
    setStreamingText("");

    textBufferRef.current = [];
    isStreamActiveRef.current = true;
    let currentDisplayedText = "";

    if (streamTimerRef.current) {
      clearInterval(streamTimerRef.current);
    }

    streamTimerRef.current = setInterval(() => {
      if (textBufferRef.current.length > 0) {
        const bufferLength = textBufferRef.current.length;
        let takeCount = 2;
        if (bufferLength > 50) takeCount = 5;
        else if (bufferLength > 20) takeCount = 3;

        const chunk = textBufferRef.current.splice(0, takeCount).join("");
        currentDisplayedText += chunk;
        setStreamingText(currentDisplayedText);
        return;
      }

      if (!isStreamActiveRef.current && currentDisplayedText.length > 0) {
        if (streamTimerRef.current) {
          clearInterval(streamTimerRef.current);
          streamTimerRef.current = null;
        }
        finishStream(currentDisplayedText, streamId, content, runtimeApiKey);
      }
    }, STREAM_INTERVAL);

    const history = messages
      .filter((item) => !item.isWelcome && item.type !== "error")
      .map((item) => ({
        role: item.type === "user" ? "user" : "assistant",
        content: item.content,
      }));

    abortFnRef.current = sendMessageStream(
      content,
      history,
      {
        onChunk: (chunk) => {
          if (chunk) textBufferRef.current.push(...chunk.split(""));
        },
        onDone: () => {
          isStreamActiveRef.current = false;
        },
        onError: (error) => handleStreamError(error, streamId),
        onAbort: () => handleStreamAbort(streamId),
      },
      { apiKey: runtimeApiKey },
    );
  };

  triggerChatRef.current = triggerChat;

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    triggerChat(inputValue.trim());
  };

  const handleQuickQuestion = (question) => {
    triggerChat(question);
  };

  const handleInputChange = (e) => {
    setInputValue(e.detail.value);
  };

  const ensureRecordPermission = async () => {
    try {
      voiceDebugLog("permission.get-setting.request");
      const setting = await Taro.getSetting();
      voiceDebugLog("permission.get-setting.result", {
        record: setting.authSetting?.["scope.record"],
        authSetting: setting.authSetting,
      });
      if (setting.authSetting?.["scope.record"]) {
        return true;
      }

      voiceDebugLog("permission.authorize.request");
      await Taro.authorize({ scope: "scope.record" });
      voiceDebugLog("permission.authorize.success");
      return true;
    } catch (error) {
      voiceDebugWarn("permission.authorize.fail", {
        errMsg: error?.errMsg,
        message: error?.message,
        error,
      });
      const modal = await Taro.showModal({
        title: "需要麦克风权限",
        content: "开启麦克风权限后，才能使用语音输入。",
        confirmText: "去设置",
      });

      voiceDebugLog("permission.modal.result", {
        confirm: modal.confirm,
        cancel: modal.cancel,
      });

      if (modal.confirm) {
        voiceDebugLog("permission.open-setting.request");
        await Taro.openSetting();
      }

      return false;
    }
  };

  const handleVoiceInput = async () => {
    voiceDebugLog("button.tap", {
      voiceStatus,
      isLoading,
      hasCachedManager: Boolean(recordRecognitionManagerRef.current),
      hasFallbackResult: Boolean(speechResultRef.current),
      inputLength: inputValue.length,
    });

    if (voiceStatus === VOICE_STATUS.RECOGNIZING || isLoading) {
      voiceDebugLog("button.tap.ignored", {
        voiceStatus,
        isLoading,
      });
      return;
    }

    const recordRecognitionManager = setupRecordRecognitionManager();

    if (!recordRecognitionManager) {
      voiceDebugWarn("button.no-manager");
      Taro.showToast({
        title: "当前环境未接入语音转文字插件",
        icon: "none",
      });
      return;
    }

    if (voiceStatus === VOICE_STATUS.RECORDING) {
      setVoiceStatus(VOICE_STATUS.RECOGNIZING);
      clearRecognitionTimeout();
      voiceDebugLog("timeout.arm", {
        timeoutMs: VOICE_RECOGNITION_TIMEOUT,
        fallbackResultLength: speechResultRef.current.length,
      });
      recognitionTimeoutRef.current = setTimeout(() => {
        const fallbackResult = speechResultRef.current.trim();
        voiceDebugWarn("timeout.fire", {
          fallbackResultLength: fallbackResult.length,
          hasFallbackResult: Boolean(fallbackResult),
        });
        setVoiceStatus(VOICE_STATUS.IDLE);
        speechResultRef.current = "";

        if (fallbackResult) {
          setInputValue(fallbackResult);
          voiceDebugLog("timeout.send-fallback", {
            resultLength: fallbackResult.length,
            preview: fallbackResult.slice(0, 30),
          });
          triggerChatRef.current?.(fallbackResult);
          return;
        }

        Taro.showToast({
          title: "语音识别超时，请重试",
          icon: "none",
        });
      }, VOICE_RECOGNITION_TIMEOUT);

      try {
        voiceDebugLog("manager.stop.request");
        recordRecognitionManager.stop();
        voiceDebugLog("manager.stop.called");
      } catch (error) {
        voiceDebugWarn("manager.stop.throw", {
          errMsg: error?.errMsg,
          message: error?.message,
          error,
        });
        clearRecognitionTimeout();
        setVoiceStatus(VOICE_STATUS.IDLE);
        Taro.showToast({
          title: error?.errMsg || "结束录音失败",
          icon: "none",
        });
      }
      return;
    }

    const runtimeApiKey = await resolveApiKey();
    voiceDebugLog("api-key.resolve.result", {
      hasApiKey: Boolean(runtimeApiKey),
      apiKeyLength: runtimeApiKey?.length || 0,
    });
    if (!runtimeApiKey) {
      Taro.showToast({
        title: "请先登录后再使用语音输入",
        icon: "none",
      });
      return;
    }

    const hasPermission = await ensureRecordPermission();
    voiceDebugLog("permission.final", {
      hasPermission,
    });
    if (!hasPermission) return;

    try {
      clearRecognitionTimeout();
      speechResultRef.current = "";
      setVoiceStatus(VOICE_STATUS.RECORDING);
      const startOptions = {
        duration: 30000,
        lang: "zh_CN",
      };
      voiceDebugLog("manager.start.request", startOptions);
      recordRecognitionManager.start(startOptions);
      voiceDebugLog("manager.start.called");
    } catch (error) {
      voiceDebugWarn("manager.start.throw", {
        errMsg: error?.errMsg,
        message: error?.message,
        error,
      });
      setVoiceStatus(VOICE_STATUS.IDLE);
      Taro.showToast({
        title: error?.errMsg || "启动录音失败",
        icon: "none",
      });
    }
  };

  const handleOpenHistory = async () => {
    const token = Taro.getStorageSync("token");
    if (!token) {
      Taro.showToast({ title: "请先登录", icon: "none" });
      return;
    }

    try {
      Taro.showLoading({ title: "加载历史中..." });
      const res = await getChatSessions(1, 20);
      Taro.hideLoading();

      if (!res || res.code !== 200) {
        Taro.showToast({ title: res?.message || "获取历史失败", icon: "none" });
        return;
      }

      const sessions = res.sessions || [];
      if (!sessions.length) {
        Taro.showToast({ title: "暂无历史记录", icon: "none" });
        return;
      }

      const itemList = sessions.map((item) => item.title || "未命名对话");
      const pick = await Taro.showActionSheet({ itemList });
      const selected = sessions[pick.tapIndex];
      const selectedSessionId = selected?.sessionId || selected?.session_id;
      if (!selectedSessionId) return;

      Taro.showLoading({ title: "加载对话中..." });
      const detail = await getChatSessionDetail(selectedSessionId);
      Taro.hideLoading();

      if (!detail || detail.code !== 200) {
        Taro.showToast({
          title: detail?.message || "获取历史详情失败",
          icon: "none",
        });
        return;
      }

      const loadedMessages = (detail.messages || [])
        .map((item) => [
          {
            id: `usr_${item.id}`,
            type: "user",
            content: item.userMessage || item.user_message,
          },
          {
            id: `ai_${item.id}`,
            type: "ai",
            content: item.aiResponse || item.ai_response,
          },
        ])
        .flat();

      stopPlayback(TTS_STATUS.IDLE);
      pendingTTSMessageIdRef.current = "";
      setTtsStateMap({});

      setChatId(detail.sessionId || detail.session_id || selectedSessionId);
      setChatTitle(detail.title || selected.title || "历史对话");
      setMessages(
        loadedMessages.length
          ? loadedMessages
          : [
              {
                id: "welcome",
                type: "ai",
                content: "该历史对话暂无消息。",
                isWelcome: true,
              },
            ],
      );
    } catch (error) {
      Taro.hideLoading();
      if (error?.errMsg && /cancel/i.test(error.errMsg)) {
        return;
      }

      console.error("[Chat] 获取历史记录失败:", error);
      Taro.showToast({ title: "历史记录加载失败", icon: "none" });
    }
  };

  useEffect(() => {
    if (!messages.length) return;
    const lastMessage = messages[messages.length - 1];
    scrollIntoViewId.current = `msg-${lastMessage.id}`;
  }, [messages, streamingText]);

  return (
    <View className="chat-page">
      <View className="chat-toolbar">
        <View className="toolbar-left" onClick={handleOpenHistory}>
          <ChatOutlined className="toolbar-icon" />
          <View className="toolbar-title-wrapper">
            <Text className="toolbar-title">{chatTitle}</Text>
            <Text className="toolbar-subtitle">
              {messages.filter((item) => item.type === "user").length} 条对话
            </Text>
          </View>
        </View>
        <View className="toolbar-right">
          <View className="toolbar-btn" onClick={handleNewChat}>
            <AddOutlined className="toolbar-btn-icon" />
            <Text className="toolbar-btn-text">新对话</Text>
          </View>
          <View className="toolbar-btn" onClick={handleFontSizeChange}>
            <FontOutlined className="toolbar-btn-icon" />
            <Text className="toolbar-btn-text">{currentFontSize?.label}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        className="chat-messages"
        scrollY
        scrollWithAnimation
        scrollIntoView={scrollIntoViewId.current}
        enhanced
        showScrollbar={false}
      >
        <View className="messages-wrapper">
          {messages.map((msg) => {
            const ttsState = ttsStateMap[msg.id] || createTTSState();
            const ttsStatusLabel = ttsStatusLabelMap[ttsState.status];

            return (
              <View key={msg.id} id={`msg-${msg.id}`}>
                {msg.isWelcome ? (
                  <View className="welcome-container">
                    <View className="ai-avatar">
                      <SmileOutlined className="avatar-icon" />
                    </View>
                    <View className="welcome-content">
                      <View className="message-bubble ai-message">
                        <Text
                          className="message-text"
                          style={{ fontSize: currentFontSize?.size }}
                        >
                          {msg.content}
                        </Text>
                      </View>
                      <View className="quick-questions">
                        <Text className="quick-title">您可以这样问我</Text>
                        <View className="quick-tags">
                          {quickQuestions.map((question) => (
                            <View
                              key={question}
                              className="quick-tag"
                              onClick={() => handleQuickQuestion(question)}
                            >
                              <Text className="quick-tag-text">{question}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View
                    className={`message-row ${msg.type === "user" ? "user-row" : "ai-row"}`}
                  >
                    {msg.type === "ai" ? (
                      <>
                        <View className="ai-avatar small">
                          <SmileOutlined className="avatar-icon" />
                        </View>
                        <View className="ai-message-group">
                          <View className="message-bubble ai-message">
                            <View
                              className={`message-markdown font-${fontSize}`}
                            >
                              <RichText
                                nodes={renderMarkdownToHtml(msg.content || "")}
                              />
                            </View>
                          </View>
                          <View className="ai-message-meta">
                            <View
                              className={`tts-action-btn status-${ttsState.status}`}
                              onClick={() => handlePlayAITTS(msg)}
                            />
                            <Text
                              className={`tts-status-tag status-${ttsState.status}`}
                            >
                              {ttsStatusLabel}
                            </Text>
                          </View>
                        </View>
                      </>
                    ) : (
                      <>
                        <View className="message-bubble user-message">
                          <Text
                            className="message-text"
                            style={{ fontSize: currentFontSize?.size }}
                            selectable
                          >
                            {msg.content}
                          </Text>
                        </View>
                        <View className="user-avatar small">
                          <UserOutlined className="avatar-icon" />
                        </View>
                      </>
                    )}
                  </View>
                )}
              </View>
            );
          })}

          {streamingId && (
            <View
              className="message-row ai-row loading-row"
              id={`msg-${streamingId}`}
            >
              <View className="ai-avatar small">
                <SmileOutlined className="avatar-icon" />
              </View>
              <View className="ai-message-group">
                <View className="message-bubble ai-message streaming-message">
                  <Text
                    className="message-text"
                    style={{ fontSize: currentFontSize?.size }}
                  >
                    {streamingText}
                    <Text className="streaming-cursor">|</Text>
                  </Text>
                </View>
              </View>
            </View>
          )}

          {isLoading && !streamingId && (
            <View className="message-row ai-row loading-row">
              <View className="ai-avatar small">
                <SmileOutlined className="avatar-icon" />
              </View>
              <View className="message-bubble ai-message loading-bubble">
                <View className="loading-dots">
                  <View className="dot" />
                  <View className="dot" />
                  <View className="dot" />
                </View>
              </View>
            </View>
          )}

          <View className="messages-bottom-padding" />
        </View>
      </ScrollView>

      <View className="chat-input-area">
        <View className="input-wrapper">
          <View
            className={`voice-button voice-${voiceStatus} ${isLoading ? "disabled" : ""}`}
            onClick={handleVoiceInput}
          >
            <View className="voice-button-core">
              <View className="voice-button-icon" />
            </View>
            <Text className="voice-button-text">{getVoiceButtonLabel()}</Text>
          </View>

          <Textarea
            className="text-input"
            value={inputValue}
            onInput={handleInputChange}
            placeholder="请输入您的问题..."
            placeholderClass="input-placeholder"
            maxlength={500}
            autoHeight
            disabled={isLoading || voiceStatus === VOICE_STATUS.RECORDING}
            confirmType="send"
            onConfirm={handleSendMessage}
          />

          {isLoading ? (
            <Button
              className="send-button stop-button"
              onClick={handleStopGenerating}
            >
              <Stop className="send-icon" />
            </Button>
          ) : (
            <Button
              className={`send-button ${!inputValue.trim() ? "disabled" : ""}`}
              disabled={!inputValue.trim()}
              onClick={handleSendMessage}
            >
              <Arrow className="send-icon" />
            </Button>
          )}
        </View>

        <View className="input-tip">
          <Text className="tip-text">{getInputTipText()}</Text>
        </View>
      </View>

      <View className="safe-area-bottom" />
    </View>
  );
}
