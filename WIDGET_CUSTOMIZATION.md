# Chat Widget Customization Documentation

## Overview

This document describes the customization implemented for the **Microsoft Dynamics 365 Omnichannel Live Chat Widget (LCW v2)** used in the KHL Webchat POC.

The implementation supports:

- Multiple widget configurations (Web App + Conversational)
- Dynamic styling via customization callbacks
- Context variable injection
- Queue behaviour control
- Widget lifecycle management

---

# Customizations Implemented

## 1. Dynamic Widget Loading

The widget is loaded dynamically using:

- Primary CDN
- Fallback CDN

Handled via:
```
js/khl-prechat.js
```

---

## 2. Widget Cleanup & Reload

Before loading a new POC:

- Existing script removed
- Iframes removed
- Containers removed
- SDK reset

Ensures:
- Clean state
- No duplicate widgets

---

## 3. Customization Callback

Two callbacks used:

| POC | Callback |
|-----|--------|
| Web App | `lcwCustomizationCallback` |
| Conversational | `conversationalLcwCustomizationCallback` |

---

## 4. UI Customization

### Header

- Dynamic title:
  - "Kids Helpline"
  - "Conversational - KHL"
- Custom logo from SharePoint
- Styled buttons (minimize / close)

---

### Chat Panel

#### Web App Mode

- Floating panel
- Rounded corners
- Shadowed container

#### Conversational Mode

- Fullscreen layout
- No borders or shadows
- Embedded experience

---

### Chat Launcher

- Custom icon (logo)
- Styled button
- Fixed position

---

### Message Styling

- Bot messages: light background
- User messages: brand color
- Rounded bubbles

---

### Suggested Actions

- Pill-shaped buttons
- Hover effects
- Conversational mode uses stacked layout

---

## 5. Responsive Behaviour

Dynamic sizing based on:

- Desktop
- Tablet
- Mobile

Handled via:
```
getResponsiveChatPanelSize()
getWebAppWidgetSize()
```

---

## 6. Context Injection

### Web App Context

Includes:
- Form inputs
- Browser info
- IP address
- Location data

### Conversational Context

Includes:
- Browser + device info
- IP address
- Coordinates

Registered using:
```
SDK.setContextProvider()
```

---

## 7. Queue Lock System

Custom overlay implemented to control user input.

### Features

- Detects LCW iframe dynamically
- Positions overlay over message composer
- Blocks typing when required

### Trigger Conditions

- Queue events
- Agent joined
- Conversation ended
- Counsellor left

---

## 8. Event Handling

Handled using LCW events:

- `lcw:ready`
- `lcw:startChat`
- `lcw:onMessageReceived`
- `lcw:onMinimize`
- `lcw:onMaximize`
- `lcw:closeChat`

Used for:
- Queue detection
- State management
- Cleanup

---

## 9. LCW Visibility Control

Before form submission:
```
body.lcw-hidden
```

Used to:
- Hide launcher
- Prevent early chat interaction

---

## 10. Security (CSP)

Defined in `index.html`:

- Allows LCW CDN
- Allows Omnichannel domain
- Allows IP/location APIs
- Allows SharePoint images

---

## 11. Browser & Device Detection

Captured using:
```
navigator.userAgent
navigator.userAgentData
```

Used to populate context variables.

---

## 12. Abuse Filtering Integration

Connected to form inputs:

- Real-time masking
- Prevents invalid submissions

---

# Files Involved
- `index.html`
- `css/chat-widget.css`
- `js/utils.js`
- `js/khl-prechat.js`
- `js/utils.js`
- `js/poc-selector.js`
- `js/conversational-khl.js`
- `js/lcw-common.js`
- `images/`
- `README.md`
- `WIDGET_CUSTOMIZATION.md`


---

# Future Enhancements

- OTP validation before chat
- Queue capacity checks
- Advanced moderation
- Session analytics
- Improved mobile UI

---

# References

Microsoft Documentation:

Customize Live Chat Widget  
https://learn.microsoft.com/en-us/dynamics365/customer-service/develop/customize-chat-widget

Develop Live Chat Widget  
https://learn.microsoft.com/en-us/dynamics365/customer-service/develop/develop-live-chat-widget