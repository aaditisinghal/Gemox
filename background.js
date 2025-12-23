console.log("Gemox: Background script loaded");
importScripts('calendar-service-v3.js', 'calendar-sync.js',
'gmail-service.js',
'gmail-sync.js');
chrome.runtime.onStartup.addListener(async () => {
      console.log("Gemox: Extension startup - initializing services");
      await initializeAutoSync();
});
chrome.runtime.onInstalled.addListener(async () => {
      console.log("Gemox: Extension installed - initializing services");
      try {
            chrome.contextMenus.create({
                  id: "gemox-save-selection", title: "Save text to tag…",
              contexts: ["selection"]
    });
            chrome.contextMenus.create({
                  id: "gemox-save-image",
              title: "Save image to tag…",
              contexts: ["image"]
    });
            chrome.contextMenus.create({
                  id: "gemox-save-audio",
              title: "Transcribe audio to @tag",
              contexts: ["audio",
      "video",
      "link"]
    });
            console.log("Gemox: Context menus created successfully");
  }
    catch (error) {
            console.error("Gemox: Error creating context menus:", error);
  }
      await initializeAutoSync();
});
async function initializeAutoSync() {
      try {
            const { 'gemox-calendar-settings': settings = {} } = await chrome.storage.local.get('gemox-calendar-settings');
            if (settings.clientId) {
                  console.log("Gemox: Initializing services in background");
                  await CalendarService.initialize(settings.clientId);
                  await GmailService.initialize(settings.clientId);
                  const storageData = await chrome.storage.local.get(['gemox-calendar-tags', 'gemox-gmail-tags']);
                  const calendarTags = storageData['gemox-calendar-tags'] || {};
                  const gmailTags = storageData['gemox-gmail-tags'] || {};
                  if (Object.keys(calendarTags).length > 0 || Object.keys(gmailTags).length > 0) {
                        console.log("Gemox: Starting background auto-sync");
                        startBackgroundAutoSync();
      }
    }
  }
    catch (error) {
            console.warn("Gemox: Could not initialize auto-sync:", error);
  }
}
let backgroundSyncTimer = null;
function startBackgroundAutoSync() {
      if (backgroundSyncTimer) {
            clearInterval(backgroundSyncTimer);
  }
      backgroundSyncTimer = setInterval(async () => {
            try {
                  console.log("Gemox: Background auto-sync running...");
                  const storageData = await chrome.storage.local.get(['gemox-calendar-settings', 'gemox-calendar-tags', 'gemox-gmail-tags']);
                  const settings = storageData['gemox-calendar-settings'] || {};
                  const calendarTags = storageData['gemox-calendar-tags'] || {};
                  const gmailTags = storageData['gemox-gmail-tags'] || {};
                  if (settings.clientId && (Object.keys(calendarTags).length > 0 || Object.keys(gmailTags).length > 0)) {
                        if (!CalendarService.isInitialized) {
                              await CalendarService.initialize(settings.clientId);
        }
                        if (!GmailService.isInitialized) {
                              await GmailService.initialize(settings.clientId);
        }
                        if (!CalendarService.isSignedIn() || !GmailService.isSignedIn()) {
                              try {
                                    const token = await chrome.identity.getAuthToken({
                            interactive: false
            });
                                    if (token) {
                                          const accessToken = typeof token === 'object' && token.token ? token.token : token;
                                          if (!CalendarService.isSignedIn()) {
                                                CalendarService.accessToken = accessToken;
              }
                                          if (!GmailService.isSignedIn()) {
                                                GmailService.accessToken = accessToken;
              }
                                          console.log("Gemox: Background auth successful");
            }
          }
                    catch (authError) {
                                    console.log("Gemox: Background auth failed (user needs to sign in manually)");
                                    return;
          }
        }
                        if (Object.keys(calendarTags).length > 0 && CalendarService.isSignedIn()) {
                              await CalendarSync.syncAllCalendarTags();
        }
                        if (Object.keys(gmailTags).length > 0 && GmailService.isSignedIn()) {
                              await GmailSync.syncAllGmailTags();
        }
      }
    }
        catch (error) {
                  console.warn("Gemox: Background sync error:", error);
    }
  },
  15 * 60 * 1000);
        console.log("Gemox: Background auto-sync timer started (15 min interval)");
}
chrome.action.onClicked.addListener(async () => {
      await openGemoxWindow();
});
chrome.commands.onCommand.addListener(async (command) => {
      if (command === "_execute_action") {
            await openGemoxWindow();
  }
      else if (command === "open-tag-selector") {
            // Send message to content script to open tag selector
            try {
                  const tabs = await chrome.tabs.query({
                        active: true,
            currentWindow: true
      });
                  if (tabs.length > 0) {
                        // Try to send message first
                        try {
                              await chrome.tabs.sendMessage(tabs[0].id, {
                                    action: 'openTagSelector'
            });
            }
                        catch (messageError) {
                              // If message fails, inject script directly
                              console.log("Gemox: Message failed, injecting script directly");
                              await chrome.scripting.executeScript({
                                    target: {
                                          tabId: tabs[0].id
                    },
                    func: () => {
                                          // Find editable element and trigger tag selector
                                          function activeEditable() {
                                                  if (window.location.hostname === 'mail.google.com') {
                                                          const gmailCompose = document.querySelector('div[contenteditable="true"][aria-label*="Message Body"], div[contenteditable="true"][aria-label*="Compose"], div[g_editable="true"]');
                                                          if (gmailCompose) return gmailCompose;
                        }
                                                  const el = document.activeElement;
                                                  if (el && (el.isContentEditable || el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && el.type !== "password"))) {
                                                          return el;
                        }
                                                  return document.querySelector('input[type="text"], textarea, [contenteditable="true"]');
                }
                                          const el = activeEditable();
                                          if (el && window.showTagSelector) {
                                                  el.focus();
                                                  window.showTagSelector(el);
                        }
                                          else if (el) {
                                                  // Trigger Ctrl+Q event
                                                  const event = new KeyboardEvent('keydown', {
                                                        key: 'q',
                            code: 'KeyQ',
                            ctrlKey: true,
                            bubbles: true,
                            cancelable: true
                          });
                                                  document.dispatchEvent(event);
                        }
                }
                  });
            }
      }
            }
            catch (error) {
                  console.error("Gemox: Error opening tag selector:", error);
            }
      }
      else if (command === "send-to-gemini") {
            // Send message to content script to execute prompt
            try {
                  const tabs = await chrome.tabs.query({
                        active: true,
            currentWindow: true
      });
                  if (tabs.length > 0) {
                        try {
                              await chrome.tabs.sendMessage(tabs[0].id, {
                                    action: 'executePrompt'
            });
            }
                        catch (messageError) {
                              // If message fails, inject script to trigger Ctrl+Space
                              console.log("Gemox: Message failed, injecting script to trigger Ctrl+Space");
                              await chrome.scripting.executeScript({
                                    target: {
                                          tabId: tabs[0].id
                    },
                    func: () => {
                                          // Trigger Ctrl+Space event
                                          const event = new KeyboardEvent('keydown', {
                                                key: ' ',
                            code: 'Space',
                            ctrlKey: true,
                            bubbles: true,
                            cancelable: true
                          });
                                          document.dispatchEvent(event);
                }
                  });
            }
      }
            }
            catch (error) {
                  console.error("Gemox: Error executing prompt:", error);
            }
      }
});
async function openGemoxWindow() {
      try {
            const existingWindows = await chrome.windows.getAll();
            const taggleWindow = existingWindows.find(w => w.type === 'popup' && w.state === 'maximized');
            if (taggleWindow) {
                  await chrome.windows.update(taggleWindow.id, {
                focused: true
      });
                  return;
    }
            const currentWindow = await chrome.windows.getCurrent();
            const newWindow = await chrome.windows.create({
                  url: chrome.runtime.getURL('popup.html'),
              type: 'popup',
              state: 'maximized',
              focused: true
    });
            console.log("Gemox: Opened fullscreen window:", newWindow.id);
  }
    catch (error) {
            console.error("Gemox: Error opening window:", error);
  }
}
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
      try {
            if (!tab || !tab.id) return;
            let contextData = {};
            if (info.menuItemId === "gemox-save-selection") {
                  const selectedText = info.selectionText || "";
                  if (!selectedText.trim()) return;
                  console.log("Gemox: Text context menu clicked, selected text:",
      selectedText.substring(0,
      50) + "...");
                  contextData = {
                          type: "text",
                  selection: selectedText,
                  url: tab.url || "",
                  title: tab.title || ""
      };
    }
        else if (info.menuItemId === "gemox-save-image") {
                  const imageUrl = info.srcUrl || "";
                  if (!imageUrl) return;
                  console.log("Gemox: Image context menu clicked, image URL:",
      imageUrl);
                  try {
                        const response = await fetch(imageUrl);
                        const blob = await response.blob();
                        const base64 = await blobToBase64(blob);
                        contextData = {
                              type: "image",
                      imageUrl: imageUrl,
                      imageData: base64,
                      mimeType: blob.type,
                      url: tab.url || "",
                      title: tab.title || ""
        };
      }
            catch (fetchError) {
                        console.error("Gemox: Error fetching image:", fetchError);
                        contextData = {
                              type: "image",
                      imageUrl: imageUrl,
                      url: tab.url || "",
                      title: tab.title || ""
        };
      }
    }
        else if (info.menuItemId === "gemox-save-audio") {
                  const audioContext = await chrome.storage.local.get('gemox-audio-context');
                  let audioUrl = null;
                  if (audioContext['gemox-audio-context']) {
                        const context = audioContext['gemox-audio-context'];
                        if (Date.now() - context.timestamp < 2000) {
                              audioUrl = context.audioUrl;
                              console.log('Gemox: Using audio URL from content script:', audioUrl);
        }
      }
                  if (!audioUrl) {
                        audioUrl = info.srcUrl || info.linkUrl || "";
      }
                  if (!audioUrl) {
                        console.log("Gemox: No audio URL found");
                        return;
      }
                  const audioExtensions = ['.mp3',
      '.wav',
      '.ogg',
      '.m4a',
      '.aac',
      '.flac',
      '.wma',
      '.opus',
      '.webm'];
                  const isAudioFile = audioExtensions.some(ext => audioUrl.toLowerCase().includes(ext));
                  const isGmailAttachment = audioUrl.includes('mail.google.com') &&
                                (audioUrl.includes('view=att') || audioUrl.includes('&attid='));
                  if (info.linkUrl && !isAudioFile && !isGmailAttachment) {
                        console.log("Gemox: Link is not an audio file, skipping");
                        return;
      }
                  console.log("Gemox: Audio context menu clicked, audio URL:",
      audioUrl);
                  contextData = {
                        type: "audio",
                  audioUrl: audioUrl,
                  url: tab.url || "",
                  title: tab.title || "",
                  pendingTranscription: true
      };
                  await chrome.storage.local.remove('gemox-audio-context');
    }
        else {
                  return;
    }
            const channel = `gemox-picker-${Date.now()}`;
            await chrome.storage.local.set({
            [channel]: contextData
    });
            console.log("Gemox: Data stored with channel:", channel);
            const window = await chrome.windows.create({
                  url: chrome.runtime.getURL(`picker.html?ch=${encodeURIComponent(channel)}`),
              type: "popup",
              width: 420,
              height: 520
    });
            console.log("Gemox: Picker window created:", window.id);
  }
    catch (error) {
            console.error("Gemox: Error in context menu handler:", error);
  }
});
function blobToBase64(blob) {
      return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
  });
}
chrome.runtime.onMessage.addListener((message,
sender,
sendResponse) => {
      if (message.action === 'openPopup') {
            openGemoxWindow();
            sendResponse({
            success: true
    });
  }
      return true;
});