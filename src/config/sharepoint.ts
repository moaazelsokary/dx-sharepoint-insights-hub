
// SharePoint configuration
export const SHAREPOINT_CONFIG = {
  // Replace these with your actual values from Azure App Registration
  clientId: "YOUR_CLIENT_ID_HERE", // Azure App Registration Client ID
  tenantId: "YOUR_TENANT_ID_HERE", // Your Azure tenant ID
  sharePointSiteUrl: "https://yourtenant.sharepoint.com/sites/YourSiteName", // Your SharePoint site URL
  libraryName: "4DXData", // Your document library name
  
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
    authority: `https://login.microsoftonline.com/${SHAREPOINT_CONFIG.tenantId}`,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage" as const,
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
