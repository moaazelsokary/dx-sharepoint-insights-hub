
// SharePoint configuration
export const SHAREPOINT_CONFIG = {
  clientId: "your-app-registration-client-id", // Replace with your Azure App Registration Client ID
  authority: "https://login.microsoftonline.com/your-tenant-id", // Replace with your tenant ID
  redirectUri: window.location.origin,
  sharePointSiteUrl: "https://yourtenant.sharepoint.com/sites/YourSiteName", // Replace with your site URL
  libraryName: "4DXData", // Replace with your document library name
  
  // Excel file names in SharePoint
  files: {
    lagMeasures: "LAG_Measures.xlsx",
    leadMeasures: "LEAD_Measures.xlsx", 
    wigMetrics: "WIG_Metrics.xlsx",
    activityData: "Activity_Data.xlsx"
  },
  
  // Sheet names within Excel files
  sheets: {
    lagMeasures: "LAG Data",
    leadMeasures: "LEAD Data",
    wigMetrics: "WIG Data", 
    activityData: "Activity Data"
  }
};

// MSAL configuration
export const msalConfig = {
  auth: {
    clientId: SHAREPOINT_CONFIG.clientId,
    authority: SHAREPOINT_CONFIG.authority,
    redirectUri: SHAREPOINT_CONFIG.redirectUri,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

// Required permissions for SharePoint access
export const loginRequest = {
  scopes: [
    "https://graph.microsoft.com/Sites.Read.All",
    "https://graph.microsoft.com/Files.Read.All",
    "User.Read"
  ],
};
