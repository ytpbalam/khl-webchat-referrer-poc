# khl-webchat-referrer-poc
Proof-of-concept web application demonstrating a **Kids Helpline (KHL) Webchat experience** using a **custom pre-chat flow and Microsoft Dynamics 365 Omnichannel Live Chat Widget (LCW v2)**.

This project provides a configurable webchat environment to showcase:

- Branching POC selection (Web App vs Conversational)
- Multi-step pre-chat form experience
- Conversational full-screen chat experience
- Context variable integration with Dynamics 365
- Advanced LCW customization and behaviour control

---

# Features

## POC Selection Experience

Users can select between two experiences:

| POC Type | Description |
|----------|------------|
| **Web Application POC** | Form-based pre-chat experience |
| **Conversational POC** | Fullscreen conversational chat experience |

Handled via:
```
poc-selector.js
```

Key behaviour:
- Dynamic section switching
- Branding toggle (`brand-khl` vs `brand-conversational`)
- Widget cleanup before switching
- Fullscreen conversational mode

---

## Web Application POC (Pre-chat Flow)

A structured multi-step form collects user data before launching chat.

### Pages

- Page 1 → Basic details (Name, Age, Pronouns, Gender)
- Page 2 → Location & contact details
- Page 3 → Counsellor preference

### Features

- Progress bar tracking
- Field-level validation
- Conditional fields (e.g., gender description)
- Skip-friendly inputs
- Error summary handling

---

## Conversational POC

- Fullscreen chat experience
- No form-based interaction
- Immediate chat engagement
- Stacked suggested actions

### Behaviour

- Expands to full viewport
- Removes container styling
- Loads LCW directly with conversational config

---

## Context Variable Injection

Both POCs inject context into Dynamics 365.

### Web App Context

Includes:
- User form data (name, age, state, etc.)
- Browser details
- IP address
- Location (if permitted)

### Conversational Context

Includes:
- Browser + device info
- IP address
- Location coordinates

Implemented using:
```
setContextProvider()
```

---

## Input Validation & Filtering

Implemented in:
```
utils.js
```

### Features

- Field validation (name, age, postcode, email, phone)
- Controlled input length
- Skip options supported
- Abusive word detection and masking

Example:
```Idiot → ***```


---

## Queue Lock Overlay

Custom overlay prevents user input during queue states.

### Behaviour

| Scenario | Result |
|--------|--------|
| Waiting in queue | Input disabled |
| Agent joins | Input enabled |
| Counsellor leaves | Input disabled |
| Conversation closed | Overlay removed |

### Implementation

- DOM observer for LCW iframe
- Overlay positioned dynamically
- Session persistence via `sessionStorage`

---

## Session Persistence

Stores:
```lcwQueueLocked```


Allows:
- Queue state restoration
- Widget behaviour consistency after refresh

---

## UI & Branding

Dynamic themes based on POC:

| Mode | Theme |
|------|------|
| Web App | Purple (KHL) |
| Conversational | Olive/Green |

Defined in:
```styles.css
```

Includes:
- Responsive layout
- Bootstrap integration
- Split screen conversational layout
- Hidden LCW before submission

---

# Project Structure
khl-webchat-referrer-poc/
│
├── index.html
├── README.md
├── WIDGET_CUSTOMIZATION.md
│
├── css/
│ └── styles.css
│
├── js/
│ ├── poc-selector.js
│ ├── conversational-khl.js
│ ├── khl-prechat.js
│ ├── utils.js
│ └── chat-widget.js
│
└── images/


---

# Chat Widget Integration

The widget is dynamically loaded using:
``` index.html```


Supports:
- Primary CDN
- Fallback CDN

---

# GitHub Pages Setup

- Hosted via GitHub Pages
- Auto-deploy from `main` branch
- Root `index.html` used as entry point

---

## Demo URL

`https://ytpbalam.github.io/khl-webchat-referrer-poc/`

### Test URLs
- Default KHL: `https://ytpbalam.github.io/khl-webchat-referrer-poc/`
- Dolly: `https://ytpbalam.github.io/khl-webchat-referrer-poc/?referrer=dolly`
- eSafety: `https://ytpbalam.github.io/khl-webchat-referrer-poc/?referrer=esafety`

---

# Deployment Notes

- Ensure Omnichannel App IDs are correct
- Verify CSP allows required domains
- Confirm SharePoint image access
- Test both POCs before sharing

---

# Future Improvements

- OTP validation before chat
- Queue capacity validation
- Enhanced moderation logic
- Analytics tracking
- Accessibility improvements

---

# Author

Praveen Sai Balam  
Dynamics 365 Developer | yourtown