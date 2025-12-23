class CalendarSync {
      static CALENDAR_TAGS_KEY = "gemox-calendar-tags";
        static CALENDAR_CONTEXTS_KEY = "gemox-calendar-contexts";
        static CALENDAR_SETTINGS_KEY = "gemox-calendar-settings";
        static SYNC_INTERVAL = 15 * 60 * 1000;
        static syncTimer = null;
      static isInitialized = false;
      static async initialize() {
            if (this.isInitialized) return;
            try {
                  const settings = await this.getCalendarSettings();
                  if (settings.clientId && settings.apiKey) {
                        const initialized = await CalendarService.initialize(settings.clientId, settings.apiKey);
                        if (initialized) {
                              console.log('Gemox: Calendar sync initialized');
                              this.startPeriodicSync();
        }
      }
                  this.isInitialized = true;
    }
        catch (error) {
                  console.error('Gemox: Failed to initialize calendar sync:', error);
    }
  }
      static async getCalendarSettings() {
            try {
                  const {
                [this.CALENDAR_SETTINGS_KEY]: settings = {}
      }
            =
        await chrome.storage.local.get(this.CALENDAR_SETTINGS_KEY);
                  return settings;
    }
        catch (error) {
                  console.error('Gemox: Error getting calendar settings:', error);
                  return {};
    }
  }
      static async saveCalendarSettings(settings) {
            try {
                  await chrome.storage.local.set({
                [this.CALENDAR_SETTINGS_KEY]: settings
      });
                  console.log('Gemox: Calendar settings saved');
    }
        catch (error) {
                  console.error('Gemox: Error saving calendar settings:', error);
                  throw error;
    }
  }
      static async createCalendarTag(tagName,
  calendarConfig) {
            try {
                  const {
                createTag
      }
            = await import('./storage.js');
                  const tag = await createTag(tagName);
                  if (!tag) {
                        throw new Error('Tag with that name already exists');
      }
                  const {
                [this.CALENDAR_TAGS_KEY]: calendarTags = {}
      }
            =
        await chrome.storage.local.get(this.CALENDAR_TAGS_KEY);
                  calendarTags[tag.id] = {
                        tagId: tag.id,
                  tagName: tag.name,
                  type: calendarConfig.type || 'upcoming',
                  autoSync: calendarConfig.autoSync !== false,
                  lastSynced: null,
                  createdAt: new Date().toISOString(),
                  ...calendarConfig
      };
                  await chrome.storage.local.set({
                [this.CALENDAR_TAGS_KEY]: calendarTags
      });
                  await this.syncCalendarTag(tag.id);
                  console.log(`Gemox: Created calendar tag @${tag.name}`);
                  return tag;
    }
        catch (error) {
                  console.error('Gemox: Error creating calendar tag:', error);
                  throw error;
    }
  }
      static async getCalendarTags() {
            try {
                  const {
                [this.CALENDAR_TAGS_KEY]: calendarTags = {}
      }
            =
        await chrome.storage.local.get(this.CALENDAR_TAGS_KEY);
                  return calendarTags;
    }
        catch (error) {
                  console.error('Gemox: Error getting calendar tags:', error);
                  return {};
    }
  }
      static async isCalendarTag(tagId) {
            const calendarTags = await this.getCalendarTags();
            return !!calendarTags[tagId];
  }
      static async syncCalendarTag(tagId) {
            try {
                  const calendarTags = await this.getCalendarTags();
                  const calendarConfig = calendarTags[tagId];
                  if (!calendarConfig) {
                        console.warn(`Gemox: No calendar config found for tag ${tagId}`);
                        return;
      }
                  if (!CalendarService.isSignedIn()) {
                        console.warn('Gemox: Not signed in to Google Calendar, skipping sync');
                        return;
      }
                  console.log(`Gemox: Syncing calendar tag @${calendarConfig.tagName}`);
                  let events = [];
                  switch (calendarConfig.type) {
                        case 'today':
          events = await CalendarService.getTodayEvents();
                          break;
                        case 'upcoming':
        default:
          events = await CalendarService.getUpcomingEvents();
                          break;
      }
                  const formattedEvents = events.map(event => CalendarService.formatEventForContext(event));
                  const {
                [this.CALENDAR_CONTEXTS_KEY]: calendarContexts = {}
      }
            =
        await chrome.storage.local.get(this.CALENDAR_CONTEXTS_KEY);
                  calendarContexts[tagId] = formattedEvents;
                  await chrome.storage.local.set({
                [this.CALENDAR_CONTEXTS_KEY]: calendarContexts
      });
                  calendarTags[tagId].lastSynced = new Date().toISOString();
                  await chrome.storage.local.set({
                [this.CALENDAR_TAGS_KEY]: calendarTags
      });
                  console.log(`Gemox: Synced ${formattedEvents.length} events for @${calendarConfig.tagName}`);
    }
        catch (error) {
                  console.error(`Gemox: Error syncing calendar tag ${tagId}:`, error);
    }
  }
      static async getCalendarContexts(tagId) {
            try {
                  const {
                [this.CALENDAR_CONTEXTS_KEY]: calendarContexts = {}
      }
            =
        await chrome.storage.local.get(this.CALENDAR_CONTEXTS_KEY);
                  return calendarContexts[tagId] || [];
    }
        catch (error) {
                  console.error('Gemox: Error getting calendar contexts:', error);
                  return [];
    }
  }
      static async syncAllCalendarTags() {
            try {
                  const calendarTags = await this.getCalendarTags();
                  const tagIds = Object.keys(calendarTags).filter(tagId =>
        calendarTags[tagId].autoSync !== false
      );
                  console.log(`Gemox: Syncing ${tagIds.length} calendar tags`);
                  for (const tagId of tagIds) {
                        await this.syncCalendarTag(tagId);
                        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
        catch (error) {
                  console.error('Gemox: Error syncing all calendar tags:', error);
    }
  }
      static startPeriodicSync() {
            if (this.syncTimer) {
                  clearInterval(this.syncTimer);
    }
            this.syncTimer = setInterval(async () => {
                  if (CalendarService.isSignedIn()) {
                        await this.syncAllCalendarTags();
      }
    },
    this.SYNC_INTERVAL);
            console.log('Gemox: Started periodic calendar sync');
  }
      static stopPeriodicSync() {
            if (this.syncTimer) {
                  clearInterval(this.syncTimer);
                  this.syncTimer = null;
                  console.log('Gemox: Stopped periodic calendar sync');
    }
  }
      static async deleteCalendarTag(tagId) {
            try {
                  const {
                [this.CALENDAR_TAGS_KEY]: calendarTags = {}
      }
            =
        await chrome.storage.local.get(this.CALENDAR_TAGS_KEY);
                  delete calendarTags[tagId];
                  await chrome.storage.local.set({
                [this.CALENDAR_TAGS_KEY]: calendarTags
      });
                  const {
                [this.CALENDAR_CONTEXTS_KEY]: calendarContexts = {}
      }
            =
        await chrome.storage.local.get(this.CALENDAR_CONTEXTS_KEY);
                  delete calendarContexts[tagId];
                  await chrome.storage.local.set({
                [this.CALENDAR_CONTEXTS_KEY]: calendarContexts
      });
                  console.log(`Gemox: Deleted calendar tag ${tagId}`);
    }
        catch (error) {
                  console.error('Gemox: Error deleting calendar tag:', error);
                  throw error;
    }
  }
      static formatCalendarContextsForAI(events) {
            if (!events || events.length === 0) {
                  return "No calendar events found.";
    }
            const eventTexts = events.map(event => {
                  const parts = [];
                  parts.push(`**${event.title}**`);
                  if (event.startTimeFormatted && event.endTimeFormatted) {
                        parts.push(`Time: ${event.startTimeFormatted} - ${event.endTimeFormatted}`);
      }
                  if (event.description) {
                        parts.push(`Description: ${event.description.substring(0, 200)}${event.description.length > 200 ? '...' : ''}`);
      }
                  if (event.location) {
                        parts.push(`Location: ${event.location}`);
      }
                  if (event.attendees) {
                        parts.push(`Attendees: ${event.attendees}`);
      }
                  if (event.meetingLinks && event.meetingLinks.length > 0) {
                        parts.push(`Meeting Link: ${event.meetingLinks[0]}`);
      }
                  return parts.join('\n');
    });
            return eventTexts.join('\n\n---\n\n');
  }
      static async manualSync() {
            try {
                  if (!CalendarService.isSignedIn()) {
                        throw new Error('Not signed in to Google Calendar');
      }
                  await this.syncAllCalendarTags();
                  return true;
    }
        catch (error) {
                  console.error('Gemox: Manual sync failed:', error);
                  throw error;
    }
  }
}
if (typeof module !== 'undefined' && module.exports) {
      module.exports = CalendarSync;
}
else if (typeof window !== 'undefined') {
      window.CalendarSync = CalendarSync;
}