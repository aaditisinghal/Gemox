import {
    getAllTags,
  createTag,
  deleteTag,
  getContexts,
  addContext,
  updateContext,
  getAllFolders,
  addFolderWatch,
  removeFolderWatch
}
from "./storage.js";
const els = {
      openaiKey: document.getElementById("openai-key"),
      saveOpenaiKey: document.getElementById("save-openai-key"),
      openaiKeyStatus: document.getElementById("openai-key-status"),
      geminiKey: document.getElementById("gemini-key"),
      saveGeminiKey: document.getElementById("save-gemini-key"),
      geminiKeyStatus: document.getElementById("gemini-key-status"),
      name: document.getElementById("tag-name"),
      create: document.getElementById("create"),
      list: document.getElementById("list"),
      refresh: document.getElementById("refresh"),
      pdfFile: document.getElementById("pdf-file"),
      pdfTagSelect: document.getElementById("pdf-tag-select"),
      uploadPdf: document.getElementById("upload-pdf"),
      uploadStatus: document.getElementById("upload-status"),
      audioFile: document.getElementById("audio-file"),
      audioTagSelect: document.getElementById("audio-tag-select"),
      uploadAudio: document.getElementById("upload-audio"),
      audioUploadStatus: document.getElementById("audio-upload-status"),
      calendarClientId: document.getElementById("calendar-client-id"),
      calendarSaveSettings: document.getElementById("calendar-save-settings"),
      calendarSignin: document.getElementById("calendar-signin"),
      calendarSignout: document.getElementById("calendar-signout"),
      calendarAuthStatus: document.getElementById("calendar-auth-status"),
      calendarTagCreation: document.getElementById("calendar-tag-creation"),
      calendarTagName: document.getElementById("calendar-tag-name"),
      calendarTagType: document.getElementById("calendar-tag-type"),
      createCalendarTag: document.getElementById("create-calendar-tag"),
      calendarTagsSection: document.getElementById("calendar-tags-section"),
      calendarTagsList: document.getElementById("calendar-tags-list"),
      calendarSyncAll: document.getElementById("calendar-sync-all"),
      gmailSignin: document.getElementById("gmail-signin"),
      gmailSignout: document.getElementById("gmail-signout"),
      gmailAuthStatus: document.getElementById("gmail-auth-status"),
      gmailTagCreation: document.getElementById("gmail-tag-creation"),
      gmailTagName: document.getElementById("gmail-tag-name"),
      createGmailTag: document.getElementById("create-gmail-tag"),
      gmailTagsSection: document.getElementById("gmail-tags-section"),
      gmailTagsList: document.getElementById("gmail-tags-list"),
      gmailSyncAll: document.getElementById("gmail-sync-all"),
      calendarConnect: document.getElementById("calendar-connect"),
      calendarDisconnect: document.getElementById("calendar-disconnect"),
      calendarStatus: document.getElementById("calendar-status"),
      gmailConnect: document.getElementById("gmail-connect"),
      gmailDisconnect: document.getElementById("gmail-disconnect"),
      gmailStatus: document.getElementById("gmail-status"),
      notionSetup: document.getElementById("notion-setup"),
      notionDisconnect: document.getElementById("notion-disconnect"),
      notionStatus: document.getElementById("notion-status"),
      notionSetupModal: document.getElementById("notion-setup-modal"),
      notionToken: document.getElementById("notion-token"),
      notionPageId: document.getElementById("notion-page-id"),
      notionTagName: document.getElementById("notion-tag-name"),
      notionSave: document.getElementById("notion-save"),
      notionCancel: document.getElementById("notion-cancel"),
      notionSetupStatus: document.getElementById("notion-setup-status"),
      notionTagsSection: document.getElementById("notion-tags-section"),
      notionTagsList: document.getElementById("notion-tags-list"),
      pinterestSetup: document.getElementById("pinterest-setup"),
      pinterestDisconnect: document.getElementById("pinterest-disconnect"),
      pinterestStatus: document.getElementById("pinterest-status"),
      pinterestSetupModal: document.getElementById("pinterest-setup-modal"),
      pinterestBoardUrl: document.getElementById("pinterest-board-url"),
      pinterestTagName: document.getElementById("pinterest-tag-name"),
      pinterestSave: document.getElementById("pinterest-save"),
      pinterestCancel: document.getElementById("pinterest-cancel"),
      pinterestSetupStatus: document.getElementById("pinterest-setup-status"),
      pinterestTagsSection: document.getElementById("pinterest-tags-section"),
      pinterestTagsList: document.getElementById("pinterest-tags-list"),
      githubSetup: document.getElementById("github-setup"),
      githubDisconnect: document.getElementById("github-disconnect"),
      githubStatus: document.getElementById("github-status"),
      githubSetupModal: document.getElementById("github-setup-modal"),
      githubUrl: document.getElementById("github-url"),
      githubTagName: document.getElementById("github-tag-name"),
      githubSave: document.getElementById("github-save"),
      githubCancel: document.getElementById("github-cancel"),
      githubSetupStatus: document.getElementById("github-setup-status"),
      githubTagsSection: document.getElementById("github-tags-section"),
      githubTagsList: document.getElementById("github-tags-list"),
};
els.saveOpenaiKey.onclick = onSaveOpenAIKey;
els.saveGeminiKey.onclick = onSaveGeminiKey;
els.create.onclick = onCreate;
els.refresh.onclick = render;
els.pdfFile.onchange = onPdfFileChange;
els.pdfTagSelect.onchange = onPdfTagChange;
els.uploadPdf.onclick = onUploadPdf;
els.audioFile.onchange = onAudioFileChange;
els.audioTagSelect.onchange = onAudioTagChange;
els.uploadAudio.onclick = onUploadAudio;
els.calendarSaveSettings.onclick = onCalendarSaveSettings;
els.calendarSignin.onclick = onCalendarSignin;
els.calendarSignout.onclick = onCalendarSignout;
els.createCalendarTag.onclick = onCreateCalendarTag;
els.calendarSyncAll.onclick = onCalendarSyncAll;
els.gmailSignin.onclick = onGmailSignin;
els.gmailSignout.onclick = onGmailSignout;
els.createGmailTag.onclick = onCreateGmailTag;
els.gmailSyncAll.onclick = onGmailSyncAll;
els.calendarConnect.onclick = onCalendarConnect;
els.calendarDisconnect.onclick = onCalendarDisconnect;
els.gmailConnect.onclick = onGmailConnect;
els.gmailDisconnect.onclick = onGmailDisconnect;
els.notionSetup.onclick = onNotionSetup;
els.notionDisconnect.onclick = onNotionDisconnect;
els.notionSave.onclick = onNotionSave;
els.notionCancel.onclick = onNotionCancel;
els.pinterestSetup.onclick = onPinterestSetup;
els.pinterestDisconnect.onclick = onPinterestDisconnect;
els.pinterestSave.onclick = onPinterestSave;
els.pinterestCancel.onclick = onPinterestCancel;
els.githubSetup.onclick = onGitHubSetup;
els.githubDisconnect.onclick = onGitHubDisconnect;
els.githubSave.onclick = onGitHubSave;
els.githubCancel.onclick = onGitHubCancel;
const pdfScript = document.createElement('script');
pdfScript.src = 'pdf-extractor.js';
document.head.appendChild(pdfScript);
const calendarServiceScript = document.createElement('script');
calendarServiceScript.src = 'calendar-service-v3.js';
document.head.appendChild(calendarServiceScript);
const calendarSyncScript = document.createElement('script');
calendarSyncScript.src = 'calendar-sync.js';
document.head.appendChild(calendarSyncScript);
const gmailServiceScript = document.createElement('script');
gmailServiceScript.src = 'gmail-service.js';
document.head.appendChild(gmailServiceScript);
const gmailSyncScript = document.createElement('script');
gmailSyncScript.src = 'gmail-sync.js';
document.head.appendChild(gmailSyncScript);
const notionServiceScript = document.createElement('script');
notionServiceScript.src = 'notion-service.js';
notionServiceScript.onload = () => console.log('Gemox: notion-service.js loaded');
notionServiceScript.onerror = (e) => console.error('Gemox: Failed to load notion-service.js',
e);
document.head.appendChild(notionServiceScript);
const notionSyncScript = document.createElement('script');
notionSyncScript.src = 'notion-sync.js';
notionSyncScript.onload = () => console.log('Gemox: notion-sync.js loaded');
notionSyncScript.onerror = (e) => console.error('Gemox: Failed to load notion-sync.js',
e);
document.head.appendChild(notionSyncScript);
const pinterestServiceScript = document.createElement('script');
pinterestServiceScript.src = 'pinterest-service.js';
pinterestServiceScript.onload = () => console.log('Gemox: pinterest-service.js loaded');
pinterestServiceScript.onerror = (e) => console.error('Gemox: Failed to load pinterest-service.js',
e);
document.head.appendChild(pinterestServiceScript);
const pinterestSyncScript = document.createElement('script');
pinterestSyncScript.src = 'pinterest-sync.js';
pinterestSyncScript.onload = () => console.log('Gemox: pinterest-sync.js loaded');
pinterestSyncScript.onerror = (e) => console.error('Gemox: Failed to load pinterest-sync.js',
e);
document.head.appendChild(pinterestSyncScript);
const browserUseServiceScript = document.createElement('script');
browserUseServiceScript.src = 'browser-use-service.js';
browserUseServiceScript.onload = () => console.log('Gemox: browser-use-service.js loaded');
browserUseServiceScript.onerror = (e) => console.error('Gemox: Failed to load browser-use-service.js',
e);
document.head.appendChild(browserUseServiceScript);
const ragScript = document.createElement('script');
ragScript.src = 'rag-system.js';
document.head.appendChild(ragScript);
let ragSystem = null;
async function initializeRAG() {
      try {
            let attempts = 0;
            while (!window.RAGSystem && attempts < 50) {
                  await new Promise(resolve => setTimeout(resolve, 100));
                  attempts++;
    }
            if (!window.RAGSystem) {
                  console.warn('Gemox RAG: RAG system not loaded');
                  return null;
    }
            ragSystem = new window.RAGSystem();
            await ragSystem.initialize();
            console.log('Gemox RAG: System initialized successfully');
            return ragSystem;
  }
    catch (error) {
            console.error('Gemox RAG: Initialization failed:',
    error);
            return null;
  }
}
render();
async function checkApiKeyStatus() {
      try {
            const result = await chrome.storage.local.get(['gemox-openai-key']);
            const hasKey = !!result['gemox-openai-key'];
            if (hasKey) {
                  els.openaiKeyStatus.textContent = '✓ API key configured (RAG enabled for large contexts)';
                  els.openaiKeyStatus.style.color = '#28a745';
    }
        else {
                  els.openaiKeyStatus.textContent = 'Required for semantic search on large contexts (25k+ chars)';
                  els.openaiKeyStatus.style.color = '#6c757d';
    }
  }
    catch (error) {
            console.error('Failed to check API key status:',
    error);
  }
}
checkApiKeyStatus();
async function onSaveOpenAIKey() {
      const apiKey = els.openaiKey.value.trim();
      if (!apiKey) {
            els.openaiKeyStatus.textContent = 'Please enter an API key';
            return;
  }
      if (!apiKey.startsWith('sk-')) {
            els.openaiKeyStatus.textContent = 'API key should start with "sk-"';
            return;
  }
      try {
            els.saveOpenaiKey.disabled = true;
            els.openaiKeyStatus.textContent = 'Saving...';
            await chrome.storage.local.set({
                    'gemox-openai-key': apiKey
    });
            if (ragSystem) {
                  await ragSystem.setOpenAIKey(apiKey);
    }
            els.openaiKeyStatus.textContent = '✓ API key saved (for semantic search)';
            els.openaiKey.value = '';
              setTimeout(() => {
                  checkApiKeyStatus();
    },
    2000);
  }
      catch (error) {
            console.error('Error saving OpenAI API key:', error);
            els.openaiKeyStatus.textContent = 'Error saving API key';
  }
      finally {
            els.saveOpenaiKey.disabled = false;
  }
}
async function onSaveGeminiKey() {
      const apiKey = els.geminiKey.value.trim();
      if (!apiKey) {
            els.geminiKeyStatus.textContent = 'Please enter an API key';
            return;
  }
      if (!apiKey.startsWith('AIza')) {
            els.geminiKeyStatus.textContent = 'API key should start with "AIza"';
            return;
  }
      try {
            els.saveGeminiKey.disabled = true;
            els.geminiKeyStatus.textContent = 'Saving...';
            await chrome.storage.local.set({
                    'gemox-gemini-api-key': apiKey
    });
            els.geminiKeyStatus.textContent = '✓ API key saved (for image generation & audio transcription)';
            els.geminiKey.value = '';
              setTimeout(() => {
                  checkGeminiKeyStatus();
    },
    2000);
  }
    catch (error) {
            console.error('Error saving Gemini API key:', error);
            els.geminiKeyStatus.textContent = 'Error saving API key';
  }
    finally {
            els.saveGeminiKey.disabled = false;
  }
}
async function checkGeminiKeyStatus() {
      try {
            const result = await chrome.storage.local.get('gemox-gemini-api-key');
            if (result['gemox-gemini-api-key']) {
                  els.geminiKeyStatus.textContent = '✓ API key configured';
    }
              else {
                  els.geminiKeyStatus.textContent = 'Required for image generation & audio transcription';
    }
  }
    catch (error) {
            console.error('Error checking Gemini API key status:', error);
  }
}
checkGeminiKeyStatus();
async function onCreate() {
      const raw = (els.name.value || "").trim();
      if (!raw) return;
      const made = await createTag(raw.replace(/^@+/, ""));
      if (!made) {
            alert("A tag with that name already exists.");
  }
    else {
            els.name.value = "";
  }
      render();
}
async function render() {
      const tags = await getAllTags();
      updatePdfTagSelector(tags);
      try {
            await renderCalendarComponents();
  }
    catch (error) {
            console.warn('Could not render calendar components:',
    error);
  }
      try {
            await renderGmailComponents();
  }
    catch (error) {
            console.warn('Could not render Gmail components:',
    error);
  }
      try {
            await renderNotionComponents();
  }
    catch (error) {
            console.warn('Could not render Notion components:',
    error);
  }
      try {
            await renderPinterestComponents();
  }
    catch (error) {
            console.warn('Could not render Pinterest components:',
    error);
  }
      try {
            await renderGitHubComponents();
  }
    catch (error) {
            console.warn('Could not render GitHub components:',
    error);
  }
      updateIntegrationStatuses();
      if (!tags.length) {
            els.list.innerHTML = `<p class="muted">No tags yet. Create one above.</p>`;
            return;
  }
      const parts = [];
      for (const t of tags) {
            const ctx = await getContexts(t.id);
            const largeContexts = ctx.filter(c => {
                  const textLength = (c.text || c.selection || '').length;
                  return textLength > 25000;
    });
            if (largeContexts.length > 0) {
                  await processLargeContextsForTag(t.id, t.name, largeContexts);
    }
            const totalTextLength = ctx.reduce((sum,
    c) => {
                  return sum + (c.text || c.selection || '').length;
    },
    0);
            const hasAudio = ctx.some(c => c.type === 'audio');
            parts.push(`
      <div class="tag-item">
        <div class="tag-header">
          <div style="display: flex; align-items: center; gap: 6px;">
            ${hasAudio ? '<img src="Images/audio-logo.png" alt="Audio" style="width: 14px; height: 14px;" />' : ''}
            <div>
              <span class="tag-name">@${t.name}</span>
              <span class="tag-count">${ctx.length} context${ctx.length !== 1 ? 's' : ''}</span>
              ${totalTextLength > 25000 ? `<div style="font-size: 10px; color: #6b7280; margin-top: 2px;">${
            Math.round(totalTextLength/1000)
    }
        k chars</div>` : ''}
            </div>
          </div>
          <button data-del="${t.id}" class="btn btn-small">Delete</button>
        </div>
        ${ctx.slice(0, 2).map(c => `
          <div class="context-item">
            ${
            c.title ? `<div class="context-title">${c.title.substring(0, 40) + (c.title.length > 40 ? '...' : '')}</div>` : ''
    }
                    <div>
              ${
            c.type === 'image' ? 
                `<strong>Image:</strong> ${(c.imageUrl || 'Uploaded image').substring(0, 30)}...` :
                c.type === 'audio' ?
                `<strong>🎙️ Audio:</strong> ${escapeHtml((c.transcription || 'Transcribed audio').substring(0, 100) + (c.transcription && c.transcription.length > 100 ? '...' : ''))}` :
                escapeHtml((c.text || c.selection || '').substring(0,
      120) + (c.text && c.text.length > 120 ? '...' : ''))
    }
                    </div>
          </div>
        `).join("")}
        ${ctx.length > 2 ? `<div class="status-text" style="text-align: center; margin-top: auto; padding-top: 8px;">+${
            ctx.length - 2
    }
        more</div>` : ''}
      </div>
    `);
  }
      els.list.innerHTML = parts.join("");
      els.list.querySelectorAll("button[data-del]").forEach(btn => {
            btn.onclick = async () => {
                  if (confirm("Delete this tag and all its contexts?")) {
                        await deleteTag(btn.dataset.del);
                        render();
      }
    };
  });
}
async function updatePdfTagSelector(tags) {
      const options = ['<option value="">Select tag...</option>'];
      for (const tag of tags) {
            const ctx = await getContexts(tag.id);
            const hasAudio = ctx.some(c => c.type === 'audio');
            const audioIcon = hasAudio ? '🎙️ ' : '';
            options.push(`<option value="${tag.id}">${audioIcon}@${tag.name}</option>`);
  }
      els.pdfTagSelect.innerHTML = options.join('');
      els.audioTagSelect.innerHTML = options.join('');
}
function onPdfFileChange() {
      updateUploadButton();
      const file = els.pdfFile.files[0];
      if (file) {
            const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
            els.uploadStatus.textContent = `${file.name} (${sizeInMB}MB)`;
  }
    else {
            els.uploadStatus.textContent = '';
  }
}
function onPdfTagChange() {
      updateUploadButton();
}
function updateUploadButton() {
      const hasFile = els.pdfFile.files.length > 0;
      const hasTag = els.pdfTagSelect.value !== '';
      els.uploadPdf.disabled = !(hasFile && hasTag);
}
async function onUploadPdf() {
      const file = els.pdfFile.files[0];
      const tagId = els.pdfTagSelect.value;
      if (!file || !tagId) {
            els.uploadStatus.textContent = 'Select PDF and tag.';
            return;
  }
      try {
            els.uploadPdf.disabled = true;
            els.uploadStatus.textContent = 'Extracting...';
            let attempts = 0;
            while (!window.PDFExtractor && attempts < 50) {
                  await new Promise(resolve => setTimeout(resolve, 100));
                  attempts++;
    }
            if (!window.PDFExtractor) {
                  throw new Error('PDF extractor not loaded. Please refresh and try again.');
    }
            const extractedText = await window.PDFExtractor.extractText(file);
            if (!extractedText.trim()) {
                  throw new Error('No text found in PDF.');
    }
            els.uploadStatus.textContent = 'Saving...';
            await addContext(tagId, {
                  type: 'text',
              text: extractedText,
              title: `PDF: ${file.name}`,
              url: `file://${file.name}`,
              source: 'pdf-upload'
    });
            els.uploadStatus.textContent = `✓ Saved ${(extractedText.length/1000).toFixed(1)}k chars`;
            els.pdfFile.value = '';
            els.pdfTagSelect.value = '';
            updateUploadButton();
            render();
            setTimeout(() => {
                  els.uploadStatus.textContent = '';
    },
    2000);
  }
    catch (error) {
            console.error('PDF upload failed:',
    error);
            els.uploadStatus.textContent = `❌ ${error.message}`;
            setTimeout(() => {
                  els.uploadStatus.textContent = '';
    },
    3000);
  }
    finally {
            els.uploadPdf.disabled = false;
            updateUploadButton();
  }
}
function escapeHtml(s) {
      return (s || "").replace(/[&<>"]/g, ch =>
            ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;" }[ch])
      );
}
async function processLargeContextsForTag(tagId, tagName, largeContexts) {
      try {
            if (!ragSystem) {
                  ragSystem = await initializeRAG();
                  if (!ragSystem) {
                        console.warn('Gemox RAG: Cannot process large contexts - RAG system not available');
                        return;
      }
    }
            for (const context of largeContexts) {
                  if (context.ragProcessed) {
                        continue;
      }
                  const textContent = context.text || context.selection || '';
                  if (textContent.length <= 25000) {
                        continue;
      }
                  console.log(`Gemox RAG: Processing large context for @${tagName} (${textContent.length} chars)`);
                  try {
                        const fullTextEmbedding = await ragSystem.generateFullTextEmbedding(textContent);
                        const contextId = `tag_${tagId}_context_${context.id || Date.now()}`;
                        const chunks = await ragSystem.chunkText(textContent, contextId);
                        const embeddings = new Array(chunks.length).fill(fullTextEmbedding);
                        await ragSystem.storeChunksWithEmbeddings(chunks, embeddings, tagId);
                        const updates = {
                              ragProcessed: true,
                      ragChunks: chunks.length,
                      ragEmbeddingDimensions: fullTextEmbedding.length
        };
                        await updateContext(tagId, context.id, updates);
                        console.log(`Gemox RAG: Successfully processed context - ${chunks.length} chunks created`);
      }
            catch (error) {
                        console.error(`Gemox RAG: Failed to process context for @${tagName}:`,
        error);
      }
    }
  }
    catch (error) {
            console.error('Gemox RAG: Error in processLargeContextsForTag:',
    error);
  }
}
async function searchRAGForTag(tagId, query, topK = 3) {
      try {
            if (!ragSystem) {
                  ragSystem = await initializeRAG();
                  if (!ragSystem) {
                        return [];
      }
    }
            const results = await ragSystem.searchChunks(query, tagId, topK);
            return results.map(result => ({
                  text: result.chunk.text,
              similarity: result.score,
              chunkIndex: result.chunk.chunkIndex,
              contextId: result.chunk.contextId
    }));
  }
    catch (error) {
            console.error('Gemox RAG: Search failed:',
    error);
            return [];
  }
}
async function onCalendarSaveSettings() {
      try {
            const clientId = els.calendarClientId.value.trim();
            if (!clientId) {
                  alert('Please enter a Google Client ID');
                  return;
    }
            const settings = {
            clientId
    };
            await chrome.storage.local.set({
            'gemox-calendar-settings': settings
    });
            await waitForCalendarService();
            await CalendarService.initialize(clientId);
            els.calendarSignin.disabled = false;
            els.calendarAuthStatus.textContent = 'Settings saved. You can now sign in.';
            updateIntegrationStatuses();
            console.log('Gemox: Calendar settings saved');
  }
    catch (error) {
            console.error('Error saving calendar settings:',
    error);
            els.calendarAuthStatus.textContent = 'Error saving settings: ' + error.message;
  }
}
async function onCalendarSignin() {
      try {
            await waitForCalendarService();
            const success = await CalendarService.signIn();
            if (success) {
                  els.calendarAuthStatus.textContent = 'Successfully signed in to Google Calendar!';
                  els.calendarSignin.style.display = 'none';
                  els.calendarSignout.style.display = 'inline-flex';
                  els.calendarTagCreation.style.display = 'block';
                  els.calendarSyncAll.style.display = 'inline-flex';
                  await renderCalendarComponents();
    }
  }
    catch (error) {
            console.error('Calendar sign-in failed:',
    error);
            els.calendarAuthStatus.textContent = 'Sign-in failed: ' + error.message;
  }
}
async function onCalendarSignout() {
      try {
            await waitForCalendarService();
            await CalendarService.signOut();
            els.calendarAuthStatus.textContent = 'Signed out from Google Account.';
            els.calendarSignin.style.display = 'inline-flex';
            els.calendarSignout.style.display = 'none';
            els.calendarTagCreation.style.display = 'none';
            els.calendarSyncAll.style.display = 'none';
            updateIntegrationStatuses();
            await renderCalendarComponents();
  }
    catch (error) {
            console.error('Calendar sign-out failed:',
    error);
            els.calendarAuthStatus.textContent = 'Sign-out failed: ' + error.message;
  }
}
async function onCreateCalendarTag() {
      try {
            const tagName = els.calendarTagName.value.trim();
            const tagType = els.calendarTagType.value;
            if (!tagName) {
                  alert('Please enter a tag name');
                  return;
    }
            await waitForCalendarSync();
            await CalendarSync.createCalendarTag(tagName, tagType);
            els.calendarTagName.value = '';
            els.calendarAuthStatus.textContent = `Calendar tag @${tagName} created successfully!`;
            await renderCalendarComponents();
            await render();
  }
    catch (error) {
            console.error('Error creating calendar tag:',
    error);
            els.calendarAuthStatus.textContent = 'Error creating calendar tag: ' + error.message;
  }
}
async function onCalendarSyncAll() {
      try {
            els.calendarSyncAll.textContent = 'Syncing...';
            els.calendarSyncAll.disabled = true;
            await waitForCalendarSync();
            await CalendarSync.syncAllCalendarTags();
            els.calendarAuthStatus.textContent = 'All calendar tags synced successfully!';
            await renderCalendarComponents();
            await render();
  }
    catch (error) {
            console.error('Error syncing calendar tags:',
    error);
            els.calendarAuthStatus.textContent = 'Sync failed: ' + error.message;
  }
    finally {
            els.calendarSyncAll.textContent = 'Sync All';
            els.calendarSyncAll.disabled = false;
  }
}
async function renderCalendarComponents() {
      try {
            const {
            'gemox-calendar-settings': settings = {}
    }
        = 
      await chrome.storage.local.get('gemox-calendar-settings');
            els.calendarClientId.value = settings.clientId || '';
            await waitForCalendarService();
            const isSignedIn = CalendarService.isSignedIn();
            if (isSignedIn) {
                  els.calendarAuthStatus.textContent = 'Signed in Google Account';
                  els.calendarSignin.style.display = 'none';
                  els.calendarSignout.style.display = 'inline-flex';
                  els.calendarTagCreation.style.display = 'block';
                  updateIntegrationStatuses();
                  els.calendarSyncAll.style.display = 'inline-flex';
    }
        else {
                  els.calendarAuthStatus.textContent = settings.clientId ? 'Ready to sign in' : 'Enter credentials to get started';
                  els.calendarSignin.style.display = 'inline-flex';
                  els.calendarSignin.disabled = !settings.clientId;
                  els.calendarSignout.style.display = 'none';
                  els.calendarTagCreation.style.display = 'none';
                  els.calendarSyncAll.style.display = 'none';
    }
            await waitForCalendarSync();
            const calendarTags = await CalendarSync.getCalendarTags();
            if (Object.keys(calendarTags).length > 0) {
                  els.calendarTagsSection.style.display = 'block';
                  const tagItems = Object.entries(calendarTags).map(([tagId,
      tag]) => {
                        const lastSynced = tag.lastSynced ? new Date(tag.lastSynced).toLocaleString() : 'Never';
                        return `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; margin-bottom: 8px;">
            <div>
              <strong>@${tag.tagName}</strong>
              <div style="font-size: 11px; color: #64748b;">
                ${tag.type === 'today' ? "Today's Meetings" : 'Next 30 Days'} • Last synced: ${lastSynced}
              </div>
            </div>
            <div>
              <button data-sync-calendar="${tagId}" class="sync-calendar-btn" style="font-size: 12px; padding: 4px 8px; margin-right: 4px;">Sync</button>
              <button data-delete-calendar="${tagId}" class="delete-calendar-btn" style="font-size: 12px; padding: 4px 8px;">Delete</button>
            </div>
          </div>
        `;
      }).join('');
                  els.calendarTagsList.innerHTML = tagItems;
                  els.calendarTagsList.querySelectorAll('.sync-calendar-btn').forEach(btn => {
                        btn.onclick = async () => {
                              const tagId = btn.dataset.syncCalendar;
                              try {
                                    await waitForCalendarSync();
                                    await CalendarSync.syncCalendarTag(tagId);
                                    await renderCalendarComponents();
                                    await render();
                                    els.calendarAuthStatus.textContent = 'Calendar tag synced successfully!';
          }
                    catch (error) {
                                    console.error("Error syncing calendar tag:",
            error);
                                    els.calendarAuthStatus.textContent = 'Sync failed: ' + error.message;
          }
        };
      });
                  els.calendarTagsList.querySelectorAll('.delete-calendar-btn').forEach(btn => {
                        btn.onclick = async () => {
                              const tagId = btn.dataset.deleteCalendar;
                              if (!confirm("Delete this calendar tag? This will also delete the regular tag and all its contexts.")) {
                                    return;
          }
                              try {
                                    await waitForCalendarSync();
                                    await CalendarSync.deleteCalendarTag(tagId);
                                    await deleteTag(tagId);
                                    await renderCalendarComponents();
                                    await render();
                                    els.calendarAuthStatus.textContent = 'Calendar tag deleted successfully!';
          }
                    catch (error) {
                                    console.error("Error deleting calendar tag:",
            error);
                                    els.calendarAuthStatus.textContent = 'Delete failed: ' + error.message;
          }
        };
      });
    }
        else {
                  els.calendarTagsSection.style.display = 'none';
    }
  }
    catch (error) {
            console.error("Error rendering calendar components:",
    error);
            els.calendarTagsList.innerHTML = '<p style="color: #ef4444;">Error loading calendar tags.</p>';
  }
}
async function waitForCalendarService() {
      let attempts = 0;
      while (!window.CalendarService && attempts < 50) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
  }
      if (!window.CalendarService) {
            throw new Error('Calendar service not loaded. Please refresh and try again.');
  }
}
async function waitForCalendarSync() {
      let attempts = 0;
      while (!window.CalendarSync && attempts < 50) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
  }
      if (!window.CalendarSync) {
            throw new Error('Calendar sync not loaded. Please refresh and try again.');
  }
}
async function onGmailSignin() {
      try {
            await waitForGmailService();
            await waitForGmailSync();
            const calendarSettings = await CalendarSync.getCalendarSettings();
            if (!calendarSettings.clientId) {
                  els.gmailAuthStatus.textContent = "Please set up Google Client ID in Calendar integration first.";
                  els.gmailAuthStatus.style.color = "#ef4444";
                  return;
    }
            await GmailService.initialize(calendarSettings.clientId);
            await GmailService.signIn();
            els.gmailAuthStatus.textContent = "Gmail sign-in successful!";
            els.gmailAuthStatus.style.color = "#10b981";
            await renderGmailComponents();
  }
    catch (error) {
            console.error("Gmail sign-in error:",
    error);
            els.gmailAuthStatus.textContent = "Gmail sign-in failed: " + error.message;
            els.gmailAuthStatus.style.color = "#ef4444";
  }
}
async function onGmailSignout() {
      try {
            await waitForGmailService();
            await GmailService.signOut();
            els.gmailAuthStatus.textContent = "Signed out of Gmail.";
            els.gmailAuthStatus.style.color = "#6b7280";
            updateIntegrationStatuses();
            await renderGmailComponents();
  }
    catch (error) {
            console.error("Gmail sign-out error:",
    error);
            els.gmailAuthStatus.textContent = "Sign-out failed: " + error.message;
            els.gmailAuthStatus.style.color = "#ef4444";
  }
}
async function onCreateGmailTag() {
      try {
            await waitForGmailSync();
            const tagName = els.gmailTagName.value.trim();
            if (!tagName) {
                  els.gmailAuthStatus.textContent = "Please enter a tag name.";
                  els.gmailAuthStatus.style.color = "#ef4444";
                  return;
    }
            const gmailConfig = {
                  type: 'recent',
              maxResults: 5
    };
            await GmailSync.createGmailTag(tagName, gmailConfig);
            els.gmailTagName.value = '';
            els.gmailAuthStatus.textContent = `Gmail tag @${tagName} created successfully!`;
            els.gmailAuthStatus.style.color = "#10b981";
            await renderGmailComponents();
            await render();
  }
    catch (error) {
            console.error("Error creating Gmail tag:",
    error);
            els.gmailAuthStatus.textContent = "Failed to create Gmail tag: " + error.message;
            els.gmailAuthStatus.style.color = "#ef4444";
  }
}
async function onGmailSyncAll() {
      try {
            await waitForGmailSync();
            els.gmailSyncAll.disabled = true;
            els.gmailSyncAll.textContent = "Syncing...";
            await GmailSync.syncAllGmailTags();
            els.gmailAuthStatus.textContent = "All Gmail tags synced successfully!";
            els.gmailAuthStatus.style.color = "#10b981";
            await renderGmailComponents();
            await render();
  }
    catch (error) {
            console.error("Error syncing Gmail tags:",
    error);
            els.gmailAuthStatus.textContent = "Sync failed: " + error.message;
            els.gmailAuthStatus.style.color = "#ef4444";
  }
    finally {
            els.gmailSyncAll.disabled = false;
            els.gmailSyncAll.textContent = "Sync All";
  }
}
async function renderGmailComponents() {
      try {
            if (typeof GmailService === 'undefined' || typeof GmailSync === 'undefined') {
                  els.gmailTagsList.innerHTML = '<p style="color: #6b7280;">Gmail services loading...</p>';
                  return;
    }
            const isSignedIn = GmailService.isSignedIn();
            els.gmailSignin.style.display = isSignedIn ? 'none' : 'inline-block';
            els.gmailSignout.style.display = isSignedIn ? 'inline-block' : 'none';
            els.gmailSignin.disabled = false;
              els.gmailTagCreation.style.display = isSignedIn ? 'block' : 'none';
            els.gmailTagsSection.style.display = isSignedIn ? 'block' : 'none';
            els.gmailSyncAll.style.display = isSignedIn ? 'inline-block' : 'none';
            if (isSignedIn) {
                  try {
                        const userInfo = await GmailService.getUserInfo();
                        els.gmailAuthStatus.textContent = `Signed in as: ${userInfo.email}`;
                        els.gmailAuthStatus.style.color = "#10b981";
                        updateIntegrationStatuses();
      }
            catch (error) {
                        els.gmailAuthStatus.textContent = "Signed in to Gmail";
                        els.gmailAuthStatus.style.color = "#10b981";
                        updateIntegrationStatuses();
      }
    }
            const gmailTags = await GmailSync.getGmailTags();
            const gmailTagIds = Object.keys(gmailTags);
            if (gmailTagIds.length === 0) {
                  els.gmailTagsList.innerHTML = '<p style="color: #6b7280;">No Gmail tags created yet.</p>';
                  return;
    }
            let html = '';
            for (const tagId of gmailTagIds) {
                  const config = gmailTags[tagId];
                  const lastSynced = config.lastSynced ? new Date(config.lastSynced).toLocaleString() : 'Never';
                  const typeDescription = 'Recent Emails (5)';
                  html += `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px;">
          <div>
            <div style="font-weight: 500; color: #1f2937;">@${config.tagName}</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">${typeDescription}</div>
            <div style="font-size: 11px; color: #9ca3af; margin-top: 2px;">Last synced: ${lastSynced}</div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-small gmail-sync-btn" data-tag-id="${tagId}">Sync</button>
            <button class="btn btn-small gmail-delete-btn" data-tag-id="${tagId}" style="background: #ef4444; color: white; border-color: #ef4444;">Delete</button>
          </div>
        </div>
      `;
    }
            els.gmailTagsList.innerHTML = html;
            els.gmailTagsList.querySelectorAll('.gmail-sync-btn').forEach(btn => {
                  btn.onclick = async () => {
                        const tagId = btn.dataset.tagId;
                        try {
                              btn.disabled = true;
                              btn.textContent = 'Syncing...';
                              await GmailSync.syncGmailTag(tagId);
                              await renderGmailComponents();
                              await render();
                              els.gmailAuthStatus.textContent = 'Gmail tag synced successfully!';
                              els.gmailAuthStatus.style.color = "#10b981";
        }
                catch (error) {
                              console.error("Error syncing Gmail tag:",
          error);
                              els.gmailAuthStatus.textContent = 'Sync failed: ' + error.message;
                              els.gmailAuthStatus.style.color = "#ef4444";
        }
                finally {
                              btn.disabled = false;
                              btn.textContent = 'Sync';
        }
      };
    });
            els.gmailTagsList.querySelectorAll('.gmail-delete-btn').forEach(btn => {
                  btn.onclick = async () => {
                        if (!confirm("Delete this Gmail tag? This will also delete the regular tag and all its contexts.")) {
                              return;
        }
                        const tagId = btn.dataset.tagId;
                        try {
                              await GmailSync.deleteGmailTag(tagId);
                              await deleteTag(tagId);
                              await renderGmailComponents();
                              await render();
                              els.gmailAuthStatus.textContent = 'Gmail tag deleted successfully!';
                              els.gmailAuthStatus.style.color = "#10b981";
        }
                catch (error) {
                              console.error("Error deleting Gmail tag:",
          error);
                              els.gmailAuthStatus.textContent = 'Delete failed: ' + error.message;
                              els.gmailAuthStatus.style.color = "#ef4444";
        }
      };
    });
  }
    catch (error) {
            console.error("Error rendering Gmail components:",
    error);
            els.gmailTagsList.innerHTML = '<p style="color: #ef4444;">Error loading Gmail tags.</p>';
  }
}
async function waitForGmailService() {
      let attempts = 0;
      while (!window.GmailService && attempts < 50) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
  }
      if (!window.GmailService) {
            throw new Error('Gmail service not loaded. Please refresh and try again.');
  }
}
async function waitForGmailSync() {
      let attempts = 0;
      while (!window.GmailSync && attempts < 50) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
  }
      if (!window.GmailSync) {
            throw new Error('Gmail sync not loaded. Please refresh and try again.');
  }
}
function updateIntegrationStatuses() {
      updateCalendarStatus();
      updateGmailStatus();
      updateNotionStatus();
      updatePinterestStatus();
      updateGitHubStatus();
}
function updateCalendarStatus() {
      const statusEl = els.calendarStatus;
      if (!statusEl) return;
      const clientId = els.calendarClientId.value.trim();
      if (!clientId) {
            statusEl.textContent = 'Setup required';
            statusEl.className = 'integration-status';
            els.calendarConnect.style.display = 'none';
            els.calendarDisconnect.style.display = 'none';
            return;
  }
      let isSignedIn = false;
      if (window.CalendarService && window.CalendarService.isSignedIn && window.CalendarService.isSignedIn()) {
            isSignedIn = true;
  }
      if (isSignedIn) {
            statusEl.textContent = 'Connected';
            statusEl.className = 'integration-status connected';
            els.calendarConnect.style.display = 'none';
            els.calendarDisconnect.style.display = 'inline-flex';
  }
    else {
            statusEl.textContent = 'Ready';
            statusEl.className = 'integration-status';
            els.calendarConnect.style.display = 'inline-flex';
            els.calendarDisconnect.style.display = 'none';
  }
}
function updateGmailStatus() {
      const statusEl = els.gmailStatus;
      if (!statusEl) return;
      const clientId = els.calendarClientId.value.trim();
      if (!clientId) {
            statusEl.textContent = 'Setup required';
            statusEl.className = 'integration-status';
            els.gmailConnect.style.display = 'inline-flex';
              els.gmailDisconnect.style.display = 'none';
            return;
  }
      let isSignedIn = false;
      if (window.GmailService && window.GmailService.isSignedIn && window.GmailService.isSignedIn()) {
            isSignedIn = true;
  }
      if (isSignedIn) {
            statusEl.textContent = 'Connected';
            statusEl.className = 'integration-status connected';
            els.gmailConnect.style.display = 'none';
            els.gmailDisconnect.style.display = 'inline-flex';
  }
    else {
            statusEl.textContent = 'Ready';
            statusEl.className = 'integration-status';
            els.gmailConnect.style.display = 'inline-flex';
            els.gmailDisconnect.style.display = 'none';
  }
}
async function onCalendarConnect() {
      try {
            await onCalendarSaveSettings();
            await onCalendarSignin();
            await createDefaultCalendarTag();
            updateIntegrationStatuses();
  }
    catch (error) {
            console.error('Calendar connect failed:',
    error);
            els.calendarAuthStatus.textContent = 'Connection failed: ' + error.message;
  }
}
async function onCalendarDisconnect() {
      try {
            await onCalendarSignout();
            updateIntegrationStatuses();
  }
    catch (error) {
            console.error('Calendar disconnect failed:',
    error);
  }
}
async function onGmailConnect() {
      console.log('Gmail Connect button clicked!');
      try {
            const clientId = els.calendarClientId.value.trim();
            if (!clientId) {
                  alert('Please enter a Google Client ID and click Save first');
                  return;
    }
            console.log('Gmail: Client ID found, initializing service...');
            await waitForGmailService();
            if (!window.GmailService.isInitialized) {
                  await window.GmailService.initialize(clientId);
    }
            console.log('Gmail: Service initialized, signing in...');
            await onGmailSignin();
            console.log('Gmail: Signed in, creating default tag...');
            await createDefaultGmailTag();
            console.log('Gmail: Default tag created, updating status...');
            updateIntegrationStatuses();
            console.log('Gmail: Connect process completed successfully!');
  }
    catch (error) {
            console.error('Gmail connect failed:',
    error);
            els.gmailAuthStatus.textContent = 'Connection failed: ' + error.message;
            alert('Gmail connection failed: ' + error.message);
  }
}
async function onGmailDisconnect() {
      try {
            await onGmailSignout();
            updateIntegrationStatuses();
  }
    catch (error) {
            console.error('Gmail disconnect failed:',
    error);
  }
}
async function createDefaultCalendarTag() {
      try {
            await waitForCalendarSync();
            const calendarConfig = {
                  type: 'upcoming'
    };
            await CalendarSync.createCalendarTag('myCalendar', calendarConfig);
            console.log('Created default calendar tag: @myCalendar');
  }
    catch (error) {
            console.error('Failed to create default calendar tag:',
    error);
  }
}
async function createDefaultGmailTag() {
      try {
            await waitForGmailSync();
            const gmailConfig = {
                  type: 'recent',
              maxResults: 50
    };
            await GmailSync.createGmailTag('myEmails', gmailConfig);
            console.log('Created default Gmail tag: @myEmails');
  }
    catch (error) {
            console.error('Failed to create default Gmail tag:',
    error);
  }
}
function onNotionSetup() {
      els.notionSetupModal.style.display = 'block';
      els.notionSetupStatus.textContent = '';
}
function onNotionCancel() {
      els.notionSetupModal.style.display = 'none';
      els.notionToken.value = '';
      els.notionPageId.value = '';
      els.notionTagName.value = '';
      els.notionSetupStatus.textContent = '';
}
async function onNotionSave() {
      try {
            const token = els.notionToken.value.trim();
            const pageId = els.notionPageId.value.trim();
            const tagName = els.notionTagName.value.trim() || 'myNotion';
            if (!token) {
                  els.notionSetupStatus.textContent = 'Please enter an integration token';
                  els.notionSetupStatus.style.color = '#ef4444';
                  return;
    }
            if (!pageId) {
                  els.notionSetupStatus.textContent = 'Please enter a page URL or ID';
                  els.notionSetupStatus.style.color = '#ef4444';
                  return;
    }
            els.notionSave.disabled = true;
            els.notionSetupStatus.textContent = 'Testing connection...';
            els.notionSetupStatus.style.color = '#6b7280';
            await waitForNotionService();
            await waitForNotionSync();
            const testResult = await window.NotionSync.testConnection(token);
            if (!testResult.success) {
                  els.notionSetupStatus.textContent = 'Connection failed: ' + testResult.error;
                  els.notionSetupStatus.style.color = '#ef4444';
                  els.notionSave.disabled = false;
                  return;
    }
            els.notionSetupStatus.textContent = 'Saving settings...';
            await window.NotionSync.saveSettings({
            token
    });
            await window.NotionSync.initialize();
            els.notionSetupStatus.textContent = 'Creating tag...';
            const tag = await createTag(tagName);
            if (!tag) {
                  els.notionSetupStatus.textContent = 'Tag name already exists';
                  els.notionSetupStatus.style.color = '#ef4444';
                  els.notionSave.disabled = false;
                  return;
    }
            const result = await window.NotionSync.createNotionTag(tag.id, pageId, tagName);
            if (result.success) {
                  els.notionSetupStatus.textContent = '✓ Connected successfully!';
                  els.notionSetupStatus.style.color = '#10b981';
                  window.NotionSync.startAutoSync();
                  setTimeout(() => {
                        onNotionCancel();
                        render();
                        renderNotionComponents();
                        updateIntegrationStatuses();
      },
      1500);
    }
        else {
                  els.notionSetupStatus.textContent = 'Failed: ' + result.error;
                  els.notionSetupStatus.style.color = '#ef4444';
                  await deleteTag(tag.id);
    }
  }
    catch (error) {
            console.error('Notion setup failed:',
    error);
            els.notionSetupStatus.textContent = 'Setup failed: ' + error.message;
            els.notionSetupStatus.style.color = '#ef4444';
  }
    finally {
            els.notionSave.disabled = false;
  }
}
async function onNotionDisconnect() {
      if (!confirm('Disconnect Notion? This will delete all Notion tags and their contexts.')) {
            return;
  }
      try {
            await waitForNotionSync();
            const notionTags = await window.NotionSync.getAllNotionTags();
            for (const tagId of Object.keys(notionTags)) {
                  await window.NotionSync.deleteNotionTag(tagId);
                  await deleteTag(tagId);
    }
            await window.NotionSync.saveSettings({});
            window.NotionSync.stopAutoSync();
            await render();
            await renderNotionComponents();
            updateIntegrationStatuses();
  }
    catch (error) {
            console.error('Notion disconnect failed:',
    error);
            alert('Disconnect failed: ' + error.message);
  }
}
async function renderNotionComponents() {
      try {
            if (typeof window.NotionSync === 'undefined') {
                  console.log('Gemox: NotionSync not loaded yet, skipping render');
                  return;
    }
            const notionTags = await window.NotionSync.getAllNotionTags();
            if (!notionTags) {
                  console.log('Gemox: No Notion tags found');
                  return;
    }
            const notionTagIds = Object.keys(notionTags);
            if (notionTagIds.length === 0) {
                  els.notionTagsSection.style.display = 'none';
                  return;
    }
            els.notionTagsSection.style.display = 'block';
            let html = '';
            for (const tagId of notionTagIds) {
                  const config = notionTags[tagId];
                  const lastSynced = config.lastSynced ? new Date(config.lastSynced).toLocaleString() : 'Never';
                  const pageIdDisplay = config.pageId ? config.pageId.substring(0,
      8) + '...' : 'Unknown';
                  html += `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px;">
          <div>
            <div style="font-weight: 500; color: #1f2937;">@${config.tagName || 'Unnamed'}</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">Page ID: ${pageIdDisplay}</div>
            <div style="font-size: 11px; color: #9ca3af; margin-top: 2px;">Last synced: ${lastSynced}</div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-small notion-sync-btn" data-tag-id="${tagId}">Sync</button>
            <button class="btn btn-small notion-delete-btn" data-tag-id="${tagId}" style="background: #ef4444; color: white; border-color: #ef4444;">Delete</button>
          </div>
        </div>
      `;
    }
            els.notionTagsList.innerHTML = html;
            els.notionTagsList.querySelectorAll('.notion-sync-btn').forEach(btn => {
                  btn.onclick = async () => {
                        const tagId = btn.dataset.tagId;
                        try {
                              btn.disabled = true;
                              btn.textContent = 'Syncing...';
                              await window.NotionSync.syncNotionTag(tagId);
                              await renderNotionComponents();
                              await render();
        }
                catch (error) {
                              console.error('Error syncing Notion tag:',
          error);
                              alert('Sync failed: ' + error.message);
        }
                finally {
                              btn.disabled = false;
                              btn.textContent = 'Sync';
        }
      };
    });
            els.notionTagsList.querySelectorAll('.notion-delete-btn').forEach(btn => {
                  btn.onclick = async () => {
                        if (!confirm('Delete this Notion tag? This will also delete the regular tag and all its contexts.')) {
                              return;
        }
                        const tagId = btn.dataset.tagId;
                        try {
                              await window.NotionSync.deleteNotionTag(tagId);
                              await deleteTag(tagId);
                              await renderNotionComponents();
                              await render();
        }
                catch (error) {
                              console.error('Error deleting Notion tag:',
          error);
                              alert('Delete failed: ' + error.message);
        }
      };
    });
  }
    catch (error) {
            console.error('Error rendering Notion components:',
    error);
  }
}
function updateNotionStatus() {
      const statusEl = els.notionStatus;
      if (!statusEl) return;
      try {
            if (typeof window.NotionSync === 'undefined') {
                  statusEl.textContent = 'Not connected';
                  statusEl.className = 'integration-status';
                  els.notionSetup.style.display = 'inline-flex';
                  els.notionDisconnect.style.display = 'none';
                  return;
    }
            window.NotionSync.getSettings().then(settings => {
                  window.NotionSync.getAllNotionTags().then(notionTags => {
                        const hasToken = !!settings.token;
                        const hasTag = Object.keys(notionTags).length > 0;
                        if (hasToken && hasTag) {
                              statusEl.textContent = 'Connected';
                              statusEl.className = 'integration-status connected';
                              els.notionSetup.style.display = 'none';
                              els.notionDisconnect.style.display = 'inline-flex';
        }
                else {
                              statusEl.textContent = 'Not connected';
                              statusEl.className = 'integration-status';
                              els.notionSetup.style.display = 'inline-flex';
                              els.notionDisconnect.style.display = 'none';
        }
      }).catch(err => {
                        console.warn('Gemox: Error getting Notion tags:',
        err);
                        statusEl.textContent = 'Not connected';
                        statusEl.className = 'integration-status';
      });
    }).catch(err => {
                  console.warn('Gemox: Error getting Notion settings:',
      err);
                  statusEl.textContent = 'Not connected';
                  statusEl.className = 'integration-status';
    });
  }
    catch (error) {
            console.warn('Gemox: Error updating Notion status:',
    error);
            statusEl.textContent = 'Not connected';
            statusEl.className = 'integration-status';
  }
}
async function waitForNotionService() {
      let attempts = 0;
      while (!window.NotionService && attempts < 100) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
  }
      if (!window.NotionService) {
            console.error('NotionService not found after waiting');
            throw new Error('Notion service not loaded. Please refresh and try again.');
  }
      return window.NotionService;
}
async function waitForNotionSync() {
      let attempts = 0;
      while (!window.NotionSync && attempts < 100) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
  }
      if (!window.NotionSync) {
            console.error('NotionSync not found after waiting');
            throw new Error('Notion sync not loaded. Please refresh and try again.');
  }
      return window.NotionSync;
}
function onPinterestSetup() {
      els.pinterestSetupModal.style.display = 'block';
      els.pinterestSetupStatus.textContent = '';
}
function onPinterestCancel() {
      els.pinterestSetupModal.style.display = 'none';
      els.pinterestBoardUrl.value = '';
      els.pinterestTagName.value = '';
      els.pinterestSetupStatus.textContent = '';
}
async function onPinterestSave() {
      try {
            const boardUrl = els.pinterestBoardUrl.value.trim();
            const tagName = els.pinterestTagName.value.trim() || 'myBoard';
            if (!boardUrl) {
                  els.pinterestSetupStatus.textContent = 'Please enter a board URL';
                  els.pinterestSetupStatus.style.color = '#ef4444';
                  return;
    }
            els.pinterestSave.disabled = true;
            els.pinterestSetupStatus.textContent = 'Connecting to Pinterest...';
            els.pinterestSetupStatus.style.color = '#6b7280';
            await waitForPinterestService();
            await waitForPinterestSync();
            await window.PinterestSync.initialize();
            els.pinterestSetupStatus.textContent = 'Creating tag...';
            const tag = await createTag(tagName);
            if (!tag) {
                  els.pinterestSetupStatus.textContent = 'Tag name already exists';
                  els.pinterestSetupStatus.style.color = '#ef4444';
                  els.pinterestSave.disabled = false;
                  return;
    }
            els.pinterestSetupStatus.textContent = 'Fetching pins (this may take a moment)...';
            const result = await window.PinterestSync.createPinterestTag(tag.id, boardUrl, tagName);
            if (result.success) {
                  els.pinterestSetupStatus.textContent = '✓ Connected successfully!';
                  els.pinterestSetupStatus.style.color = '#10b981';
                  setTimeout(() => {
                        onPinterestCancel();
                        render();
                        renderPinterestComponents();
                        updateIntegrationStatuses();
      },
      1500);
    }
        else {
                  els.pinterestSetupStatus.textContent = 'Failed: ' + result.error;
                  els.pinterestSetupStatus.style.color = '#ef4444';
                  await deleteTag(tag.id);
    }
  }
    catch (error) {
            console.error('Pinterest setup failed:',
    error);
            els.pinterestSetupStatus.textContent = 'Setup failed: ' + error.message;
            els.pinterestSetupStatus.style.color = '#ef4444';
  }
    finally {
            els.pinterestSave.disabled = false;
  }
}
async function onPinterestDisconnect() {
      if (!confirm('Disconnect Pinterest? This will delete all Pinterest tags and their contexts.')) {
            return;
  }
      try {
            await waitForPinterestSync();
            const pinterestTags = await window.PinterestSync.getAllPinterestTags();
            for (const tagId of Object.keys(pinterestTags)) {
                  await window.PinterestSync.deletePinterestTag(tagId);
                  await deleteTag(tagId);
    }
            await render();
            await renderPinterestComponents();
            updateIntegrationStatuses();
  }
    catch (error) {
            console.error('Pinterest disconnect failed:',
    error);
            alert('Disconnect failed: ' + error.message);
  }
}
async function renderPinterestComponents() {
      try {
            if (typeof window.PinterestSync === 'undefined') {
                  console.log('Gemox: PinterestSync not loaded yet, skipping render');
                  return;
    }
            const pinterestTags = await window.PinterestSync.getAllPinterestTags();
            if (!pinterestTags) {
                  console.log('Gemox: No Pinterest tags found');
                  return;
    }
            const tagIds = Object.keys(pinterestTags);
            if (tagIds.length === 0) {
                  els.pinterestTagsSection.style.display = 'none';
                  return;
    }
            els.pinterestTagsSection.style.display = 'block';
            let html = '';
            for (const tagId of tagIds) {
                  const config = pinterestTags[tagId];
                  const lastSynced = config.lastSynced 
        ? new Date(config.lastSynced).toLocaleString()
        : 'Never';
                  const pinCount = config.pinCount || 0;
                  html += `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px;">
          <div>
            <div style="font-weight: 500; color: #1f2937;">@${config.tagName || 'Unnamed'}</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">${config.username}/${config.boardName}</div>
            <div style="font-size: 11px; color: #9ca3af; margin-top: 2px;">${pinCount} pins • Last synced: ${lastSynced}</div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-small pinterest-sync-btn" data-tag-id="${tagId}">Sync</button>
            <button class="btn btn-small pinterest-delete-btn" data-tag-id="${tagId}" style="background: #ef4444; color: white; border-color: #ef4444;">Delete</button>
          </div>
        </div>
      `;
    }
            els.pinterestTagsList.innerHTML = html;
            els.pinterestTagsList.querySelectorAll('.pinterest-sync-btn').forEach(btn => {
                  btn.onclick = async () => {
                        const tagId = btn.dataset.tagId;
                        try {
                              btn.disabled = true;
                              btn.textContent = 'Syncing...';
                              await window.PinterestSync.syncPinterestTag(tagId);
                              await renderPinterestComponents();
                              await render();
        }
                catch (error) {
                              console.error('Error syncing Pinterest tag:',
          error);
                              alert('Sync failed: ' + error.message);
        }
                finally {
                              btn.disabled = false;
                              btn.textContent = 'Sync';
        }
      };
    });
            els.pinterestTagsList.querySelectorAll('.pinterest-delete-btn').forEach(btn => {
                  btn.onclick = async () => {
                        if (!confirm('Delete this Pinterest tag? This will also delete the regular tag and all its contexts.')) {
                              return;
        }
                        const tagId = btn.dataset.tagId;
                        try {
                              await window.PinterestSync.deletePinterestTag(tagId);
                              await deleteTag(tagId);
                              await renderPinterestComponents();
                              await render();
        }
                catch (error) {
                              console.error('Error deleting Pinterest tag:',
          error);
                              alert('Delete failed: ' + error.message);
        }
      };
    });
  }
    catch (error) {
            console.error('Error rendering Pinterest components:',
    error);
  }
}
function updatePinterestStatus() {
      const statusEl = els.pinterestStatus;
      if (!statusEl) return;
      try {
            if (typeof window.PinterestSync === 'undefined') {
                  statusEl.textContent = 'Not connected';
                  statusEl.className = 'integration-status';
                  els.pinterestSetup.style.display = 'inline-flex';
                  els.pinterestDisconnect.style.display = 'none';
                  return;
    }
            window.PinterestSync.getAllPinterestTags().then(pinterestTags => {
                  const hasTag = Object.keys(pinterestTags).length > 0;
                  if (hasTag) {
                        statusEl.textContent = 'Connected';
                        statusEl.className = 'integration-status connected';
                        els.pinterestSetup.style.display = 'none';
                        els.pinterestDisconnect.style.display = 'inline-flex';
      }
            else {
                        statusEl.textContent = 'Not connected';
                        statusEl.className = 'integration-status';
                        els.pinterestSetup.style.display = 'inline-flex';
                        els.pinterestDisconnect.style.display = 'none';
      }
    }).catch(err => {
                  console.warn('Gemox: Error getting Pinterest tags:',
      err);
                  statusEl.textContent = 'Not connected';
                  statusEl.className = 'integration-status';
    });
  }
    catch (error) {
            console.warn('Gemox: Error updating Pinterest status:',
    error);
            statusEl.textContent = 'Not connected';
            statusEl.className = 'integration-status';
  }
}
async function waitForPinterestService() {
      let attempts = 0;
      while (!window.PinterestService && attempts < 100) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
  }
      if (!window.PinterestService) {
            console.error('PinterestService not found after waiting');
            throw new Error('Pinterest service not loaded. Please refresh and try again.');
  }
      return window.PinterestService;
}
async function getAllGitHubTags() {
      try {
            const result = await chrome.storage.local.get('gemox-github-tags');
            return result['gemox-github-tags'] || {};
  }
      catch (error) {
            console.error('Error getting GitHub tags:', error);
            return {};
  }
}
async function saveGitHubTag(tagId, githubUrl, tagName) {
      try {
            const tags = await getAllGitHubTags();
            tags[tagId] = {
                  githubUrl: githubUrl,
                  tagName: tagName,
                  createdAt: Date.now(),
                  lastSynced: Date.now()
        };
            await chrome.storage.local.set({ 'gemox-github-tags': tags });
            return true;
  }
      catch (error) {
            console.error('Error saving GitHub tag:', error);
            return false;
  }
}
async function deleteGitHubTag(tagId) {
      try {
            const tags = await getAllGitHubTags();
            delete tags[tagId];
            await chrome.storage.local.set({ 'gemox-github-tags': tags });
            return true;
  }
      catch (error) {
            console.error('Error deleting GitHub tag:', error);
            return false;
  }
}
function onGitHubSetup() {
      els.githubSetupModal.style.display = 'block';
      els.githubSetupStatus.textContent = '';
}
function onGitHubCancel() {
      els.githubSetupModal.style.display = 'none';
      els.githubUrl.value = '';
      els.githubTagName.value = '';
      els.githubSetupStatus.textContent = '';
}
async function onGitHubSave() {
      let tag = null;
      try {
            const githubUrl = els.githubUrl.value.trim();
            const tagName = els.githubTagName.value.trim() || 'myGitHub';
            if (!githubUrl) {
                  els.githubSetupStatus.textContent = 'Please enter a GitHub URL or username';
                  els.githubSetupStatus.style.color = '#ef4444';
                  return;
        }
            els.githubSave.disabled = true;
            els.githubSetupStatus.textContent = 'Creating tag...';
            els.githubSetupStatus.style.color = '#6b7280';
            tag = await createTag(tagName);
            if (!tag) {
                  els.githubSetupStatus.textContent = 'Tag name already exists';
                  els.githubSetupStatus.style.color = '#ef4444';
                  els.githubSave.disabled = false;
                  return;
        }
            els.githubSetupStatus.textContent = 'Fetching GitHub profile (this may take a moment)...';
            await waitForBrowserUseService();
            const profileData = await window.BrowserUseService.getGitHubProfile(githubUrl);
            els.githubSetupStatus.textContent = 'Saving profile data...';
            const profileText = formatGitHubProfile(profileData);
            const context = {
                  type: 'text',
                  text: profileText,
                  source: 'github',
                  githubUrl: githubUrl,
                  profileData: profileData,
                  timestamp: Date.now()
        };
            await addContext(tag.id, context);
            await saveGitHubTag(tag.id, githubUrl, tagName);
            els.githubSetupStatus.textContent = '✓ Connected successfully!';
            els.githubSetupStatus.style.color = '#10b981';
            setTimeout(() => {
                  onGitHubCancel();
                  render();
                  renderGitHubComponents();
                  updateIntegrationStatuses();
        },
        1500);
  }
      catch (error) {
            console.error('GitHub setup failed:', error);
            els.githubSetupStatus.textContent = 'Setup failed: ' + error.message;
            els.githubSetupStatus.style.color = '#ef4444';
            if (tag && tag.id) {
                  await deleteTag(tag.id);
        }
  }
      finally {
            els.githubSave.disabled = false;
  }
}
function formatGitHubProfile(profileData) {
      let text = `GitHub Profile: ${profileData.username || 'Unknown'}\n\n`;
      if (profileData.name) text += `Name: ${profileData.name}\n`;
      if (profileData.bio) text += `Bio: ${profileData.bio}\n`;
      if (profileData.company) text += `Company: ${profileData.company}\n`;
      if (profileData.location) text += `Location: ${profileData.location}\n`;
      if (profileData.blog) text += `Website: ${profileData.blog}\n`;
      if (profileData.twitter_username) text += `Twitter: @${profileData.twitter_username}\n`;
      text += `\nStats:\n`;
      text += `- Public Repositories: ${profileData.public_repos || 0}\n`;
      text += `- Followers: ${profileData.followers || 0}\n`;
      text += `- Following: ${profileData.following || 0}\n`;
      if (profileData.contributions_last_year) text += `- Contributions (last year): ${profileData.contributions_last_year}\n`;
      if (profileData.total_stars) text += `- Total Stars: ${profileData.total_stars}\n`;
      if (profileData.total_forks) text += `- Total Forks: ${profileData.total_forks}\n`;
      if (profileData.languages && profileData.languages.length > 0) {
            text += `\nLanguages: ${profileData.languages.join(', ')}\n`;
      }
      if (profileData.repositories && profileData.repositories.length > 0) {
            text += `\nRepositories (${profileData.repositories.length}):\n`;
            profileData.repositories.slice(0, 20).forEach(repo => {
                  text += `- ${repo.name} (${repo.language || 'N/A'}) - ${repo.stars || 0} stars\n`;
                  if (repo.description) text += `  ${repo.description}\n`;
            });
      }
      if (profileData.created_at) text += `\nAccount created: ${profileData.created_at}\n`;
      return text;
}
async function onGitHubDisconnect() {
      if (!confirm('Disconnect GitHub? This will delete all GitHub tags and their contexts.')) {
            return;
  }
      try {
            const githubTags = await getAllGitHubTags();
            for (const tagId of Object.keys(githubTags)) {
                  await deleteGitHubTag(tagId);
                  await deleteTag(tagId);
        }
            await render();
            await renderGitHubComponents();
            updateIntegrationStatuses();
  }
      catch (error) {
            console.error('GitHub disconnect failed:', error);
            alert('Disconnect failed: ' + error.message);
  }
}
async function renderGitHubComponents() {
      try {
            const githubTags = await getAllGitHubTags();
            const githubTagIds = Object.keys(githubTags);
            if (githubTagIds.length === 0) {
                  els.githubTagsSection.style.display = 'none';
                  return;
        }
            els.githubTagsSection.style.display = 'block';
            let html = '';
            for (const tagId of githubTagIds) {
                  const config = githubTags[tagId];
                  const lastSynced = config.lastSynced ? new Date(config.lastSynced).toLocaleString() : 'Never';
                  html += `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px;">
          <div>
            <div style="font-weight: 500; color: #1f2937;">@${config.tagName || 'Unnamed'}</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">${config.githubUrl}</div>
            <div style="font-size: 11px; color: #9ca3af; margin-top: 2px;">Last synced: ${lastSynced}</div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-small github-sync-btn" data-tag-id="${tagId}">Refresh</button>
            <button class="btn btn-small github-delete-btn" data-tag-id="${tagId}" style="background: #ef4444; color: white; border-color: #ef4444;">Delete</button>
          </div>
        </div>
      `;
        }
            els.githubTagsList.innerHTML = html;
            els.githubTagsList.querySelectorAll('.github-sync-btn').forEach(btn => {
                  btn.onclick = async () => {
                        const tagId = btn.dataset.tagId;
                        try {
                              btn.disabled = true;
                              btn.textContent = 'Refreshing...';
                              const githubTags = await getAllGitHubTags();
                              const config = githubTags[tagId];
                              if (!config) {
                                    alert('GitHub tag not found');
                                    return;
                        }
                              await waitForBrowserUseService();
                              const profileData = await window.BrowserUseService.getGitHubProfile(config.githubUrl);
                              const profileText = formatGitHubProfile(profileData);
                              const context = {
                                    type: 'text',
                                    text: profileText,
                                    source: 'github',
                                    githubUrl: config.githubUrl,
                                    profileData: profileData,
                                    timestamp: Date.now()
                        };
                              await addContext(tagId, context);
                              config.lastSynced = Date.now();
                              await chrome.storage.local.set({ 'gemox-github-tags': githubTags });
                              await renderGitHubComponents();
                              await render();
                              alert('GitHub profile refreshed successfully!');
                    }
                        catch (error) {
                              console.error('Error refreshing GitHub tag:', error);
                              alert('Refresh failed: ' + error.message);
                    }
                        finally {
                              btn.disabled = false;
                              btn.textContent = 'Refresh';
                    }
              };
        });
            els.githubTagsList.querySelectorAll('.github-delete-btn').forEach(btn => {
                  btn.onclick = async () => {
                        if (!confirm('Delete this GitHub tag? This will also delete the regular tag and all its contexts.')) {
                              return;
                    }
                        const tagId = btn.dataset.tagId;
                        try {
                              await deleteGitHubTag(tagId);
                              await deleteTag(tagId);
                              await renderGitHubComponents();
                              await render();
                    }
                        catch (error) {
                              console.error('Error deleting GitHub tag:', error);
                              alert('Delete failed: ' + error.message);
                    }
              };
        });
  }
      catch (error) {
            console.error('Error rendering GitHub components:', error);
  }
}
function updateGitHubStatus() {
      const statusEl = els.githubStatus;
      if (!statusEl) return;
      try {
            getAllGitHubTags().then(githubTags => {
                  const hasTag = Object.keys(githubTags).length > 0;
                  if (hasTag) {
                        statusEl.textContent = 'Connected';
                        statusEl.className = 'integration-status connected';
                        els.githubSetup.style.display = 'none';
                        els.githubDisconnect.style.display = 'inline-flex';
              }
                  else {
                        statusEl.textContent = 'Not connected';
                        statusEl.className = 'integration-status';
                        els.githubSetup.style.display = 'inline-flex';
                        els.githubDisconnect.style.display = 'none';
              }
        }).catch(err => {
                  console.warn('Gemox: Error getting GitHub tags:', err);
                  statusEl.textContent = 'Not connected';
                  statusEl.className = 'integration-status';
        });
  }
      catch (error) {
            console.warn('Gemox: Error updating GitHub status:', error);
            statusEl.textContent = 'Not connected';
            statusEl.className = 'integration-status';
  }
}
async function waitForBrowserUseService() {
      let attempts = 0;
      while (!window.BrowserUseService && attempts < 100) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
  }
      if (!window.BrowserUseService) {
            console.error('BrowserUseService not found after waiting');
            throw new Error('Browser Use service not loaded. Please refresh and try again.');
  }
      return window.BrowserUseService;
}
function onAudioFileChange() {
      els.uploadAudio.disabled = !els.audioFile.files.length || !els.audioTagSelect.value;
}
function onAudioTagChange() {
      els.uploadAudio.disabled = !els.audioFile.files.length || !els.audioTagSelect.value;
}
async function onUploadAudio() {
      const file = els.audioFile.files[0];
      const tagId = els.audioTagSelect.value;
      if (!file || !tagId) return;
      try {
            els.uploadAudio.disabled = true;
            els.audioUploadStatus.textContent = '🎙️ Transcribing audio...';
            els.audioUploadStatus.style.color = '#3b82f6';
            if (typeof AudioService === 'undefined') {
                  await new Promise((resolve, reject) => {
                        const script = document.createElement('script');
                        script.src = chrome.runtime.getURL('audio-service.js');
                        script.onload = resolve;
                        script.onerror = reject;
                        document.head.appendChild(script);
      });
    }
            const transcription = await AudioService.transcribeAudio(file);
            const audioData = await AudioService.blobToBase64(file);
            const context = {
                  type: 'audio',
              text: transcription,
              transcription: transcription,
              audioData: audioData,
              filename: file.name,
              mimeType: file.type,
              size: file.size,
              timestamp: Date.now()
    };
            console.log('Audio upload: Saving context:',
    context);
            console.log('Audio upload: Tag ID:', tagId);
            await addContext(tagId, context);
            console.log('Audio upload: Context saved successfully');
            const contexts = await getContexts(tagId);
            console.log('Audio upload: Contexts in tag:',
    contexts);
            els.audioUploadStatus.textContent = '✅ Audio transcribed and saved!';
            els.audioUploadStatus.style.color = '#10b981';
            els.audioFile.value = '';
            els.uploadAudio.disabled = true;
            await render();
  }
    catch (error) {
            console.error('Audio upload error:',
    error);
            els.audioUploadStatus.textContent = `❌ ${error.message}`;
            els.audioUploadStatus.style.color = '#ef4444';
  }
    finally {
            els.uploadAudio.disabled = false;
  }
}
async function waitForPinterestSync() {
      let attempts = 0;
      while (!window.PinterestSync && attempts < 100) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
  }
      if (!window.PinterestSync) {
            console.error('PinterestSync not found after waiting');
            throw new Error('Pinterest sync not loaded. Please refresh and try again.');
  }
      return window.PinterestSync;
}