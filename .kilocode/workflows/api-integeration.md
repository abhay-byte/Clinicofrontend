# 🔗 *API Integration Workflow - Agent Instructions*

*Trigger Command:* /integrate-api [feature-name] [platform]

---

## 📋 *Overview*

Integrate specific API endpoint into UI screen. Agent will implement service layer, connect to UI, write tests, wait for confirmation, fix issues, and commit only after approval.

*Platforms:* Flutter, React

---

## 🎯 *Phase 1: Requirements Gathering*

### *1.1 - Collect Integration Details*

*Agent Asks:*

📋 Integration Request

Provide:
1. Feature name
2. Platform (flutter/react)
3. Screen/Component name
4. Endpoints (method + path)


*Agent Actions:*
- ✅ Parse user input
- ✅ Confirm understanding
- ✅ Wait for approval to proceed

### *1.2 - Extract Endpoint Specs*

bash
grep -A 20 "POST /api/endpoint" server/src/api.md


*Agent Actions:*
- ✅ Extract request/response schemas
- ✅ Note auth requirements
- ✅ Note error responses

### *1.3 - Locate Target Files*

*Flutter:*
bash
find lib -name "*screen*.dart"
find lib/services -name "*service*.dart"


*React:*
bash
find src -name "*.jsx" -o -name "*.tsx"
find src/services -name "*.js" -o -name "*.ts"


*Agent Actions:*
- ✅ Locate target files
- ✅ List files to modify
- ✅ Show user and wait for confirmation

---

## 🛠️ *Phase 2: Implementation*

### *2.1 - Create Service Layer*

#### *Flutter Structure:*

lib/
  services/
    api_service.dart          # Base HTTP service
    [feature]_service.dart    # Feature-specific service
  models/
    [feature]_model.dart      # Data models


*Agent Creates:*
- Base API service with HTTP client
- Token management (get/save/clear)
- HTTP methods (GET, POST, PUT, DELETE)
- Feature-specific service with business logic
- Data models with fromJson/toJson
- Error handling

#### *React Structure:*

src/
  services/
    api.service.ts            # Base axios service
    [feature].service.ts      # Feature-specific service
  types/
    [feature].types.ts        # TypeScript interfaces


*Agent Creates:*
- Base API service with axios
- Request/response interceptors
- Token management
- HTTP methods
- Feature-specific service
- TypeScript interfaces
- Error handling

*Agent Actions:*
- ✅ Create/update service files
- ✅ Implement all endpoints
- ✅ Add error handling
- ✅ Log: "Service layer created"

---

### *2.2 - Integrate with UI*

#### *Flutter:*

*Agent Updates:*
- Import service
- Add state variables (loading, error)
- Add controllers for forms
- Implement handler methods
- Add validation
- Add error display
- Add loading indicators
- Add navigation on success

#### *React:*

*Agent Updates:*
- Import service
- Add state hooks (useState)
- Add form handlers
- Implement submit logic
- Add validation
- Add error display
- Add loading states
- Add navigation on success

*Agent Actions:*
- ✅ Connect UI to service
- ✅ Add loading/error states
- ✅ Add form validation
- ✅ Log: "UI integrated"

---

### *2.3 - Add Dependencies*

#### *Flutter:*
yaml
dependencies:
  http: ^1.1.0
  shared_preferences: ^2.2.2
dev_dependencies:
  mockito: ^5.4.4
  build_runner: ^2.4.7


#### *React:*
json
{
  "dependencies": {
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "@testing-library/react": "^14.1.2"
  }
}


*Agent Actions:*
- ✅ Add to dependency file
- ✅ Install dependencies
- ✅ Log: "Dependencies installed"

---

## 🧪 *Phase 3: Testing*

### *3.1 - Write Unit Tests*

#### *Flutter Tests:*

test/
  services/
    [feature]_service_test.dart
  widgets/
    [feature]_screen_test.dart


*Test Coverage:*
- Service methods with mock responses
- Success cases
- Error cases
- Network failures
- Token management
- Widget rendering
- User interactions

#### *React Tests:*

src/
  services/
    __tests__/
      [feature].service.test.ts
  components/
    __tests__/
      [Feature].test.tsx


*Test Coverage:*
- Service methods with mocked axios
- Success responses
- Error responses
- Network failures
- Component rendering
- Form submission
- Error display

*Agent Actions:*
- ✅ Create test files
- ✅ Write comprehensive tests
- ✅ Mock dependencies
- ✅ Test success/error paths
- ✅ Log: "Tests created"

---

### *3.2 - Run Tests*

bash
# Flutter
flutter test

# React
npm test


*Agent Actions:*
- ✅ Execute tests
- ✅ Capture results
- ✅ Fix failing tests
- ✅ Show results to user

---

## ✅ *Phase 4: User Verification*

### *4.1 - Summary Report*

*Agent Shows:*
markdown
## 🎉 Integration Complete

### Files Modified:
- lib/services/auth_service.dart
- lib/screens/login_screen.dart
- lib/models/user_model.dart
- test/services/auth_service_test.dart

### Tests:
- Total: 8
- Passed: 8
- Failed: 0

### Endpoints Integrated:
✅ POST /api/auth/login
✅ POST /api/auth/register

### Next Steps:
1. Test the feature manually
2. Confirm it's working
3. I'll commit the changes


### *4.2 - Wait for Confirmation*

*Agent Asks:*

Please test the integration manually.

Type:
- "working" → I'll commit changes
- "issue: [description]" → I'll fix it
- "cancel" → I'll revert changes


*Agent Actions:*
- ⏸️ Pause and wait
- ✅ Listen for user response
- ⚠️ Don't commit yet

---

## 🔧 *Phase 5: Issue Resolution* (if needed)

### *5.1 - Analyze Issue*

*Agent Actions:*
- ✅ Parse issue description
- ✅ Identify problem type:
  - Network error
  - Response parsing error
  - UI bug
  - Validation issue
  - Navigation issue

### *5.2 - Apply Fix*

*Common Fixes:*
- Update endpoint URL
- Fix request/response mapping
- Adjust error handling
- Fix form validation
- Fix navigation logic
- Update UI feedback

*Agent Actions:*
- ✅ Make targeted fix
- ✅ Re-run tests
- ✅ Show changes
- ✅ Ask for re-test

### *5.3 - Iterate Until Working*

*Agent Loop:*

Fix issue → Run tests → Show changes → Wait for confirmation


*Agent Actions:*
- ✅ Continue until user confirms working
- ✅ Track iteration count
- ⚠️ After 3 iterations, suggest review

---

## 💾 *Phase 6: Commit Changes*

### *6.1 - Prepare Commit*

*Agent Actions:*
- ✅ Stage modified files
- ✅ Generate commit message:

feat(platform): integrate [feature] API

- Add [feature] service layer
- Integrate with [Screen/Component]
- Add unit tests
- Add error handling

Endpoints:
- METHOD /api/endpoint1
- METHOD /api/endpoint2


### *6.2 - Show Commit Preview*

*Agent Shows:*

📝 Ready to commit:

Files to commit:
  M lib/services/auth_service.dart
  A lib/models/user_model.dart
  M lib/screens/login_screen.dart
  A test/services/auth_service_test.dart

Commit message:
feat(flutter): integrate login API
...

Proceed? (yes/no)


### *6.3 - Execute Commit*

bash
git add [files]
git commit -m "[message]"


*Agent Actions:*
- ✅ Commit changes
- ✅ Show commit hash
- ✅ Log: "Changes committed"

---

## 🎯 *Decision Tree*


START
  ↓
Gather Requirements → User provides details
  ↓
Extract Specs → Parse API docs
  ↓
Locate Files → Show user → Confirmed?
  ↓ YES
Implement Service → Create/update files
  ↓
Integrate UI → Connect to service
  ↓
Add Dependencies → Install packages
  ↓
Write Tests → Create test files
  ↓
Run Tests → All pass?
  ↓ YES
Show Summary → Wait for user
  ↓
User Response:
  "working" → Commit changes → DONE
  "issue: X" → Fix issue → Re-test → Loop back
  "cancel" → Revert changes → STOP


---

## 🚨 *Error Handling*

| Issue | Action |
|-------|--------|
| Missing API docs | Ask user for specs |
| File not found | Ask user for path |
| Test fails | Show error, fix, re-run |
| Dependency error | Check version, reinstall |
| Network error | Check server status |
| User reports bug | Analyze, fix, re-test |

---

## 💡 *Agent Guidelines*

*DO:*
- ✅ Wait for user confirmation before committing
- ✅ Show all changes before committing
- ✅ Write comprehensive tests
- ✅ Add proper error handling
- ✅ Follow existing code patterns
- ✅ Log all actions
- ✅ Ask when uncertain

*DON'T:*
- ❌ Commit without approval
- ❌ Skip tests
- ❌ Ignore errors
- ❌ Make assumptions
- ❌ Modify unrelated files
- ❌ Push changes (only commit)

---

## ✅ *Success Criteria*

Integration succeeds when:
- ✅ Service layer implemented
- ✅ UI integrated
- ✅ Tests pass
- ✅ User confirms working
- ✅ Changes committed
- ✅ No unrelated files modified

---

*End of Integration Workflow*