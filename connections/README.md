# Connections

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.5.

### Development server

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Description

### Task
[Link](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/connections/README.md)

### Deploy
[connections-priteev-rs2023q3a.netlify.app](https://connections-priteev-rs2023q3a.netlify.app/)

### Screenshots
1. Registration [Light](https://joxi.ru/ZrJj80vikYXLWr.jpg) 
2. Login [Dark](https://joxi.ru/1A5JNaVtwgVdMr.jpg)
3. Profile [Light](https://joxi.ru/v29yjnVfj18652.jpg), [Dark](https://joxi.ru/n2Y0KVjt0q3xMm.jpg)
4. People and group sections [Light](https://joxi.ru/12MxGNvc8eZjym.jpg), [Dark](https://joxi.ru/ZrJj80vikYXpWr.jpg)
5. Group dialog [Light](https://joxi.ru/RmzQpV3uV18oPr.jpg) 
6. People conversation [Dark](https://joxi.ru/Vm63qRVHKwGGj2.jpg)
7. 404 page [Light](https://joxi.ru/L21JndVtDPEEJA.jpg), [Dark](https://joxi.ru/82381KVUwVPPXA.jpg)

[Figma reference](https://www.figma.com/file/7PfGFqgtPyY7p3ka8DnSDh/YouTube-client-(Copy)?type=design&node-id=35220-5563&mode=design&t=Zzb4cQUKqt4e6N64-4) *Some UI elements have been modified to match the assignment specs

### Score: 800 / 800

#### Registration (60 / 60)
- [x] page with dedicated url: 5 points
- [x] validation for name and email fields with error messages: 5 points
- [x] validation for password field with error messages: 5 points
- [x] redirection to sign-in page after successful registration: 5 points
- [x] toast messages with appropriate text are displayed if http-request fails or succeed: 10 points
- [x] Submit button is disabled if form is invalid. Also, it should be disabled after http error with type PrimaryDuplicationException until the user changes the field value: 10 points
- [x] Submit button is disabled and email field has error message of taken account if user type the same email address that he tried to send before and got an error PrimaryDuplicationException: 10 points
- [x] Submit button is disabled after clicking while http-request is in progress: 10 points

#### Login (70 / 70)
- [x] default page for unauthorized user: 10 points
- [x] validation for email field with error messages: 5 points
- [x] validation for password field with error messages: 5 points
- [x] redirection to the main page after successful authentication: 10 points
- [x] toast messages with appropriate text are displayed if http-request fails or succeed: 10 points
- [x] Submit button is disabled if form is invalid. Also, it should be disabled after http error with type NotFoundException until the user changes email or password field value: 10 points
- [x] Submit button is disabled after clicking while http-request is in progress: 10 points
- [x] token, uid and email value is saved in localStorage after successful sign in and used again in the following http-requests even after page reloading (it allows user to omit sign in again after page reloading): 10 points

#### Profile (40 / 40)
- [x] user id, email, creation time, user name data of current user is displayed on the page: 30 points
- [x]  error message with appropriate text are displayed on the page if loading http-request fails (for instance, if internet connection is lost): 10 points

#### Update profile (55 / 55)
- [x] button Edit makes name field editable: 10 points
- [x] button Cancel returns initial page state (static appearance): 5 points
- [x] clicking the button Save sends 1 http-request to save new data without the ability to click it again (along with Cancel button) until process is end: 20 points
- [x] buttons Cancel and Save are visible ony for editable form: 5 points
- [x] button Edit is visible only for static page: 5 points
- [x] toast messages with appropriate text are displayed if http-request fails or succeed: 10 points

#### Logout (40 / 40)
- [x] clicking on Logout button the http-request is sent with DELETE method: 10 points
- [x] user is redirected to Sign-In page after successful logout process: 10 points
- [x] all data in cookies, localStorage is deleted: 10 points
- [x] toast messages with appropriate text are displayed if http-request fails or succeed: 10 points

#### People and group sections (175 / 175)
- [x] default page for authorized user: 10 points
- [x] page is divided on 2 vertical sections with independent content: 5 points

**Group section (left)**
- [x] the list of available groups is loaded if user opens this page first time: 5 points
- [x] the list item created by current user should contain Delete button: 10 points
- [x] the confirmation modal appears after clicking on Delete button on list item with Cancel, Delete button inside. If user clicks Cancel the modal disappears. If user clicks Delete the http-request is sent and item is removed from the list after succeeded response: 15 points
- [x] clicking on Update button sends corresponding http-request and update group list if succeeded: 10 points
- [x] countdown appears for 1 minute after clicking on Update button (except if error occurs): 10 points
- [x] Update button is disabled after clicking during updating and until the timer is active: 5 points
- [x] clicking on Create button the modal window is opened. There is form with validation and submit button: 10 points
- [x] submit button in modal window should be disabled until form is valid: 5 points
- [x] clicking on submit button in modal window the appropriate http-request is sent to create new group. Modal window is closed only if http-request succeeded: 15 points
- [x] toast messages with appropriate text are displayed if http-request fails or succeed: 10 points
- [x] clicking on list item the user is redirected to group dialog page: 5 points

**People list (right)**
- [x] the list of people is loaded if user opens this page first time: 10 points
- [x] the list item with which current user already has active conversation has special background: 10 points
- [x] clicking on Update button sends corresponding http-request and update people list if succeeded: 10 points
- [x] countdown appears for 1 minute after clicking on Update button (except if error occurs): 10 points
- [x] Update button is disabled after clicking during updating and until the timer is active: 5 points
- [x] clicking on list item the user is redirected to personal conversation page. New conversation (via certain http-request) is created if it has not already created before transition: 15 points

#### Group dialog (140 / 140)
- [x] the page is protected by a guard only for authorized user: 5 points
- [x] the error message is displayed if group with provided id does not exist: 10 points
- [x] Return back is a link, not a button: 5 points
- [x] the full message history is loaded if user visit this page first time: 10 points
- [x] only the last messages (using since parameter) are loaded if user opens this group conversation again: 20 points
- [x] only the last messages (using since parameter) are loaded if user clicks on Update button: 20 points
- [x] messages in corresponding area are sorted by time. New messages are appended at the bottom: 5 points
- [x] message item contains readable time, user name and text. Own messages are displayed on the right. Other messages are displayed on the left: 10 points
- [x] countdown appears for 1 minute after clicking on Update button (except if error occurs): 10 points
- [x] Update button is disabled after clicking during updating and until the timer is active: 5 points
- [x] group is created by current user should contain Delete button: 10 points
- [x] the confirmation modal appears after clicking on Delete button with Cancel, Delete button inside. If user clicks Cancel the modal disappears. If user clicks Delete the http-request is sent and the user is redirected to main page after succeeded response: 10 points
- [x] form field has required validator. Send new message button is disabled until field has text: 5 points
- [x] new messages are loaded (using since parameter) after successful sending new message: 15 points

#### People conversation (140 / 140)
- [x] the page is protected by a guard only for authorized user: 5 points
- [x] the error message is displayed if conversation with provided id does not exist: 10 points
- [x] Return back is a link, not a button: 5 points
- [x] the full message history is loaded if user visit this page first time: 10 points
- [x] only the last messages (using since parameter) are loaded if user opens this group conversation again: 25 points
- [x] only the last messages (using since parameter) are loaded if user clicks on Update button: 25 points
- [x] messages in corresponding area are sorted by time. New messages are appended at the bottom: 5 points
- [x] message item contains readable time, user name and text. Own messages are displayed on the right. Other messages are displayed on the left: 10 points
- [x] countdown appears for 1 minute after clicking on Update button (except if error occurs): 10 points
- [x] Update button is disabled after clicking during updating and until the timer is active: 5 points
- [x] the confirmation modal appears after clicking on Delete button with Cancel, Delete button inside. If user clicks Cancel the modal disappears. If user clicks Delete the http-request is sent and the user is redirected to main page after succeeded response: 10 points
- [x] form field has required validator. Send new message button is disabled until field has text: 5 points
- [x] new messages are loaded (using since parameter) after successful sending new message: 15 points

#### 404 page (30 / 30)
- [x] error message is displayed about wrong url/page: 30 points

#### Bonus: Style theme (50 / 50)
- [x] Bchosen state is saved in localStorage and used/applied after reloading. User can refresh the page and see the same theme: 20 points
- [x] light/dark styles are applied to main page: 10 points
- [x] light/dark styles are applied to group dialog page: 10 points
- [x] light/dark styles are applied to personal conversation page: 10 points
