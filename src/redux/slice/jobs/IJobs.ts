export interface IJobs {
  loading: boolean;
  error: string;
  farmerActiveJobs: any[];
  farmerCompletedJobs: any[];
  farmerArchivedJobs: any[];
  farmerDraftJobs: any[];
  createJob: {
    activeStep: number;
    jobStageOne: {
      title: string;
      description: string;
      tags: string;
      images?: any[];
    };
    jobStageTwo: {
      location: string;
      duration: string;
      state?: string;
      lga?: string;
    };
    jobStageThree: {
      job_budget: string;
      job_budget_amount: string | number;
      createdAt: string;
    };
    submitJob: any;
  };
  jobDetails: any;
  applicants: any[];
  exploreList: any[];
  expertActiveJobs: any[];
  expertCompletedJobs: any[];
}
