
import { PublicClientApplication, AccountInfo } from "@azure/msal-browser";
import { msalConfig, loginRequest, SHAREPOINT_CONFIG } from "@/config/sharepoint";

class SharePointService {
  private msalInstance: PublicClientApplication;
  private account: AccountInfo | null = null;

  constructor() {
    this.msalInstance = new PublicClientApplication(msalConfig);
  }

  async initialize() {
    await this.msalInstance.initialize();
    const accounts = this.msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      this.account = accounts[0];
    }
  }

  async signIn(): Promise<boolean> {
    try {
      const response = await this.msalInstance.loginPopup(loginRequest);
      this.account = response.account;
      return true;
    } catch (error) {
      console.error("SharePoint sign-in failed:", error);
      return false;
    }
  }

  async signOut() {
    if (this.account) {
      await this.msalInstance.logoutPopup({
        account: this.account,
      });
      this.account = null;
    }
  }

  isSignedIn(): boolean {
    return this.account !== null;
  }

  private async getAccessToken(): Promise<string | null> {
    if (!this.account) return null;

    try {
      const response = await this.msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: this.account,
      });
      return response.accessToken;
    } catch (error) {
      console.error("Failed to acquire access token:", error);
      return null;
    }
  }

  private async callGraphAPI(endpoint: string): Promise<any> {
    const token = await this.getAccessToken();
    if (!token) throw new Error("No access token available");

    const response = await fetch(`https://graph.microsoft.com/v1.0${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Graph API call failed: ${response.statusText}`);
    }

    return response.json();
  }

  private async getExcelWorkbook(fileName: string): Promise<any> {
    const siteId = await this.getSiteId();
    const driveId = await this.getDriveId(siteId);
    
    // Get the Excel file
    const fileEndpoint = `/sites/${siteId}/drives/${driveId}/root:/${fileName}`;
    return this.callGraphAPI(fileEndpoint);
  }

  private async getSiteId(): Promise<string> {
    const url = new URL(SHAREPOINT_CONFIG.sharePointSiteUrl);
    const hostname = url.hostname;
    const sitePath = url.pathname.replace('/sites/', '');
    
    const site = await this.callGraphAPI(`/sites/${hostname}:/sites/${sitePath}`);
    return site.id;
  }

  private async getDriveId(siteId: string): Promise<string> {
    const drives = await this.callGraphAPI(`/sites/${siteId}/drives`);
    const targetDrive = drives.value.find((drive: any) => 
      drive.name === SHAREPOINT_CONFIG.libraryName
    );
    
    if (!targetDrive) {
      throw new Error(`Document library '${SHAREPOINT_CONFIG.libraryName}' not found`);
    }
    
    return targetDrive.id;
  }

  private async getWorksheetData(fileName: string, sheetName: string): Promise<any[]> {
    try {
      const siteId = await this.getSiteId();
      const driveId = await this.getDriveId(siteId);
      
      // Get worksheet data using Excel API
      const endpoint = `/sites/${siteId}/drives/${driveId}/root:/${fileName}:/workbook/worksheets('${sheetName}')/usedRange`;
      const response = await this.callGraphAPI(endpoint);
      
      if (!response.values || response.values.length === 0) {
        return [];
      }

      // Convert array of arrays to objects using first row as headers
      const headers = response.values[0];
      const rows = response.values.slice(1);
      
      return rows.map((row: any[]) => {
        const obj: any = {};
        headers.forEach((header: string, index: number) => {
          obj[header] = row[index] || '';
        });
        return obj;
      });
    } catch (error) {
      console.error(`Error fetching data from ${fileName}/${sheetName}:`, error);
      return [];
    }
  }

  async getLagMeasures(): Promise<any[]> {
    return this.getWorksheetData(
      SHAREPOINT_CONFIG.files.lagMeasures,
      SHAREPOINT_CONFIG.sheets.lagMeasures
    );
  }

  async getLeadMeasures(): Promise<any[]> {
    return this.getWorksheetData(
      SHAREPOINT_CONFIG.files.leadMeasures,
      SHAREPOINT_CONFIG.sheets.leadMeasures
    );
  }

  async getWigMetrics(): Promise<any[]> {
    return this.getWorksheetData(
      SHAREPOINT_CONFIG.files.wigMetrics,
      SHAREPOINT_CONFIG.sheets.wigMetrics
    );
  }

  async getActivityData(): Promise<any[]> {
    return this.getWorksheetData(
      SHAREPOINT_CONFIG.files.activityData,
      SHAREPOINT_CONFIG.sheets.activityData
    );
  }

  getUserInfo(): any {
    return this.account;
  }
}

export const sharePointService = new SharePointService();
