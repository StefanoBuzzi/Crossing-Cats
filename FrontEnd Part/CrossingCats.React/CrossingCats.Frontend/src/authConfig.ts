export const msalConfig = {
    auth: {
        clientId: "e290bbb2-ee99-47d1-a407-d84fe9afc103",
        authority: "https://login.microsoftonline.com/6998af00-286c-4e5e-8b3e-713471e8487f",
        redirectUri: "http://localhost:3000/home",
        postLogoutRedirectUri: '/home',
        navigateToLoginRequestUrl: false
    },
    system: {
        allowNativeBroker: false
    }
};

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};

export const loginRequest = {
    scopes: ["openid", "profile", "User.Read", "api://9032a7e7-5c56-4180-9c5f-89239ffd3a74/access_as_user"]
};