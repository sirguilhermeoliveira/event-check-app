export interface EventSummaryProps {
    checkedInCount: number;
    notCheckedInCount: number;
    companyBreakdown: any;
  }

export  type GroupedCompanies = {
    [companyName: string]: number;
  };
  