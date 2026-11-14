export const site = {
  name: "DLP Playbook",
  tagline: "Cloudport operations guide for Digital Line Producers",
  toolName: "Cloudport",
  toolUrl: "https://cbsnews-east.cloudport.amagi.tv/",
  vendorName: "Amagi",
  program: "Streaming Rundown POC",
  slack: {
    workspaceUrl: "https://paramountglobal.enterprise.slack.com",
    /** Open channel for all DLPs: how-to and programming questions. */
    producingChat: {
      name: "#amagi-poc-producing-chat",
      id: "C0A80SKPE8K",
      url: "https://paramountglobal.enterprise.slack.com/archives/C0A80SKPE8K",
    },
  },
  team: "CBS Digital Stream Planning & Ops",
  /** Shown in the footer and on the dashboard so DLPs can find the originals. */
  externalLinks: [
    {
      label: "Google Site (original user guide)",
      href: "https://sites.google.com/paramount.com/baltimorepoc/home",
      description:
        "Source of truth for procedures. Being migrated into this dashboard page by page.",
    },
    {
      label: "SharePoint: Cloudport playbook & screenshots",
      href: "https://viacom.sharepoint.com/sites/PAR-Digital-CBSDigitalStreamPlanning-Ops/amagi/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FPAR%2DDigital%2DCBSDigitalStreamPlanning%2DOps%2Famagi%2FShared%20Documents%2Fcloudport%5Fplaybook%5Fsharepoint",
      description: "Source of truth for step text and screenshots.",
    },
  ],
};
