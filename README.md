# crud_ionic_app

Description:
This is an Ionic application that implements Google login functionality and Simple login 
(userName : testApp and Password: testAppPassword) using state management, performs CRUD operations with a fake API, and includes a caching mechanism for API responses.

Features
Login Functionality: Login with username/password or Google OAuth.
State Management: Manage authentication and application state using NgRx.
CRUD Operations: Create, Read, Update, and Delete items using a fake API.
Caching Mechanism: Cache API responses locally and clear cache manually.
Responsive UI: Works well on both mobile and desktop devices.

Tech Stack
Ionic: Framework for building cross-platform mobile and web apps.
Angular: Framework for building the frontend.
NgRx: State management library for Angular applications.
angular-oauth2-oidc: Library for OAuth2 authentication.
jsonplaceholder: Fake API for performing CRUD operations.

Getting Started
1. Clone the Repository
bash
Copy code
git clone https://github.com/atuldonode/crud_ionic_app.git

switch branch to : assignment

cd your-repository
2. Install Dependencies
bash
Copy code

npm install

API_BASE_URL=https://jsonplaceholder.typicode.com
3. Configure OAuth (Optional)
If using Google OAuth, set up the OAuth configuration in src/app/app.module.ts:

AuthService

 const authConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    redirectUri: this.platform.is('capacitor') ? 'yourapp://callback' : 'redirect URL',
    clientId: environment.clientId,                  // add client Id
    dummyClientSecret: environment.client_secret,   //client_secret add 
    responseType: 'code',
    scope: 'openid profile email',
    showDebugInformation: true,
    requireHttps: true,
    strictDiscoveryDocumentValidation: false,
    disableAtHashCheck: true,
};

5. Run the Application
For Web:
bash
Copy code
ionic serve
For Mobile:
Android:

bash
Copy code
ionic capacitor run android
iOS:

bash
Copy code
ionic capacitor run ios

Usage
1. Login
Go to the /login page.
Enter credentials or use Google login.
Redirected to the home page upon successful login or see an error message if login fails.
2. Home Page
View the list of items (posts) after logging in.
And Three menu in tabs 
Home           Create Post          Profile
3. CRUD Operations
Create: Navigate to the "Create Post" page, fill out the form, and submit.
Read: View the list of posts on the home page.
Update: Edit existing posts by navigating to the edit page.
Delete: Remove posts directly from the home page.
4. Caching
The application caches API responses for better performance.
Clear the cache manually via the settings page.
Development

Contact
Atul Donode 
atuldonode72@gmail.com