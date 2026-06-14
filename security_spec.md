# Security Specification & Threat Model - Shadharat Firebase Rules

## 1. Data Invariants
- **Administration Rule**: Only the verified admin with the specific email address `mhdhk240@gmail.com` can create, update, or delete system properties, write authors profiles, publish printed magazine issues, or read action logs.
- **Auditing Integrity**: System audit logs (`action_logs`) can never be altered or retrieved without active administrator privileges.
- **Public Interactivity limit**: Unauthenticated or general readers may view articles, authors, and print archives, but can only mutate statistics counters (`views`, `likes`, `downloadCount`) without administrative access. Any other key alteration is strictly blocked.

---

## 2. The "Dirty Dozen" Payloads (Red Team Security Test Cases)

| Test Case ID | Target Collection | Payload Description | Expected Result | Mitigation Rule |
| ------------ | ----------------- | ------------------- | --------------- | --------------- |
| TC-01 | `/settings` | Create core settings object as unauthenticated user | `PERMISSION_DENIED` | Global safety net & setting write auth wall (`isAdmin()`) |
| TC-02 | `/settings` | Modify siteName or theme attributes as unauthenticated user | `PERMISSION_DENIED` | Validation check for settings requires `isAdmin()` |
| TC-03 | `/authors` | Create profile without required role or name field | `PERMISSION_DENIED` | `isValidAuthor()` schema match verification |
| TC-04 | `/authors` | Inject a massive string (1MB) as the author name | `PERMISSION_DENIED` | String length bound restriction inside `isValidAuthor()` |
| TC-05 | `/articles` | Update article title, content, or authorId as non-admin | `PERMISSION_DENIED` | `affectedKeys().hasOnly(...)` guards for views/likes |
| TC-06 | `/articles` | Increment views and simultaneously change article body/text | `PERMISSION_DENIED` | Strict exclusion of draft changes if non-admin |
| TC-07 | `/articles` | Create or update an article with negative views count | `PERMISSION_DENIED` | bounds assertion check `data.views >= 0` |
| TC-08 | `/issues` | Mutate downloadCount and cover page image URL together | `PERMISSION_DENIED` | `affectedKeys().hasOnly(['downloadCount'])` isolation |
| TC-09 | `/action_logs` | Retrieve database logs of administrator mutations | `PERMISSION_DENIED` | Read protection mapped strictly to `isAdmin()` |
| TC-10 | `/action_logs` | Write a faux administration log trace without auth | `PERMISSION_DENIED` | Write logs restricted strictly to `isAdmin()` |
| TC-11 | `/articles/poison-doc`| Inject un-sanitized script tags in title or content | `PERMISSION_DENIED` | Length constraints on parameters & admin authentication controls |
| TC-12 | `/authors/spoof` | Update someone's profile with fake data fields | `PERMISSION_DENIED` | Strict verification checks `isValidAuthor` + `isAdmin` |

---

## 3. Conflict Report & Threat Vulnerability Evaluation

| Field / Feature | Identity Spoofing | State Shortcutting | Resource Poisoning | Status |
| --------------- | ----------------- | ------------------ | ------------------ | ------ |
| **Settings** | Protected (`isAdmin`) | Protected (`isAdmin`) | Protected (`isAdmin` & size) | **SAFE** |
| **Authors** | Protected (`isAdmin`) | Protected (`isAdmin`) | Protected (`isValidAuthor`) | **SAFE** |
| **Articles** | Protected (Admin lock) | Protected (Strict fields)| Protected (`isValidArticle`) | **SAFE** |
| **Issues** | Protected (`isAdmin`) | Protected (No public paths) | Protected (`isValidIssue`) | **SAFE** |
| **Action Logs** | Protected (Log secure) | Protected (Log lock) | Protected (`isValidActionLog`) | **SAFE** |

---

All security assertions have been analyzed, and no logic leaks are found.
