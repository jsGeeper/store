import { createSlice, Dispatch } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { push, replace } from 'connected-react-router';
import { IJobs } from './IJobs';
import { ClientRequestHandler } from '../../../utils/api.generate.client';
import { BASE_URL } from '../../../__api__/api';

const SendRequest = new ClientRequestHandler(BASE_URL);

const initialState: IJobs = {
  loading: false,
  error: '',
  farmerActiveJobs: [],
  farmerCompletedJobs: [],
  farmerArchivedJobs: [],
  farmerDraftJobs: [],
  createJob: {
    activeStep: 0,
    jobStageOne: {
      title: '',
      description: '',
      tags: '',
      images: []
    },
    jobStageTwo: {
      location: '',
      duration: '',
      state: '',
      lga: ''
    },
    jobStageThree: {
      job_budget: '',
      job_budget_amount: '',
      createdAt: ''
    },
    submitJob: {}
  },
  jobDetails: null,
  applicants: [],
  exploreList: [],
  expertActiveJobs: [],
  expertCompletedJobs: []
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    // STARTS LOADING
    startLoading: (state) => {
      state.loading = true;
    },

    // HAS ERROR
    hasError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // GET JOBS
    getFarmerActiveJobs: (state, action) => {
      state.loading = false;
      state.farmerActiveJobs = action.payload;
    },

    // ON NEXT STEP
    onNextStep: (state) => {
      state.createJob.activeStep += 1;
    },

    // ON PREVIOUS STEP
    onPreviousStep: (state) => {
      state.createJob.activeStep -= 1;
    },

    // INIT STAGE ONE
    initStageOne: (state, action) => {
      state.loading = false;
      state.createJob.jobStageOne = action.payload;
    },

    // INIT STAGE TWO
    initStageTwo: (state, action) => {
      state.loading = false;
      state.createJob.jobStageTwo = action.payload;
    },

    // INIT STAGE THREE
    initStageThree: (state, action) => {
      state.loading = false;
      state.createJob.jobStageThree = action.payload;
    },

    // SUBMIT JOB
    submitJob: (state, action) => {
      state.loading = false;
      // reset all other createJob state
      state.createJob = {
        activeStep: 0,
        jobStageOne: {
          title: '',
          description: '',
          tags: '',
          images: []
        },
        jobStageTwo: {
          location: '',
          duration: '',
          state: '',
          lga: ''
        },
        jobStageThree: {
          job_budget: '',
          job_budget_amount: '',
          createdAt: ''
        },
        submitJob: {}
      };
      state.createJob.submitJob = action.payload;
    },

    // GET FARMER COMPLETED JOBS
    getFarmerCompletedJobs: (state, action) => {
      state.loading = false;
      state.farmerCompletedJobs = action.payload;
    },

    // GET FARMER ARCHIVED JOBS
    getFarmerArchivedJobs: (state, action) => {
      state.loading = false;
      state.farmerArchivedJobs = action.payload;
    },

    // GET FARMER DRAFT JOBS
    getFarmerDraftJobs: (state, action) => {
      state.loading = false;
      state.farmerDraftJobs = action.payload;
    },

    // GET JOB PER ID
    getJobPerId: (state, action) => {
      state.loading = false;
      state.jobDetails = action.payload;
    },

    //  GET APPLICANTS
    getApplicants: (state, action) => {
      state.loading = false;
      state.applicants = action.payload;
    },

    // GET EXPLORE LIST
    getExploreList: (state, action) => {
      state.loading = false;
      state.exploreList = action.payload;
    },

    // GET EXPERT ACTIVE JOBS
    getExpertActiveJobs: (state, action) => {
      state.loading = false;
      state.expertActiveJobs = action.payload;
    },

    // GET EXPERT COMPLETED JOBS
    getExpertCompletedJobs: (state, action) => {
      state.loading = false;
      state.expertCompletedJobs = action.payload;
    }
  }
});

const { reducer: jobsReducer, actions: jobsActions } = jobsSlice;

export { jobsReducer };

export const onNextStep = (): any => (dispatch: any) => {
  dispatch(jobsActions.onNextStep());
};

export const onPreviousStep = (): any => (dispatch: any) => {
  dispatch(jobsActions.onPreviousStep());
};

export const initStageOne =
  (data: any): any =>
  (dispatch: any) => {
    dispatch(jobsActions.initStageOne(data));
  };

export const initStageTwo =
  (data: any): any =>
  (dispatch: any) => {
    dispatch(jobsActions.initStageTwo(data));
  };

export const initStageThree =
  (data: any): any =>
  (dispatch: any) => {
    dispatch(jobsActions.initStageThree(data));
  };

export const submitJob =
  (data: any): any =>
  (dispatch: any) => {
    dispatch(jobsActions.startLoading());
    try {
      const body = {
        title: data.jobStageOne.title,
        description: data.jobStageOne.description,
        tags: data.jobStageOne.tags,
        location: data.jobStageTwo.location,
        duration: data.jobStageTwo.duration,
        state: data.jobStageTwo.state,
        lga: data.jobStageTwo.lga,
        budget: data.jobStageThree.job_budget,
        budget_amount: data.jobStageThree.job_budget_amount,
        jobImageOne: data.jobStageOne.images[0],
        jobImageTwo: data.jobStageOne.images[1],
        jobImageThree: data.jobStageOne.images[2],
        jobImageFour: data.jobStageOne.images[3],
        jobImageFive: data.jobStageOne.images[4]
      };
      SendRequest.post('/jobs/create/setup', body, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      }).then((res) => {
        dispatch(jobsActions.submitJob(res.data));
        dispatch(fetchFarmerActiveJobs());
        dispatch(replace('/dashboard/jobs'));
      });
    } catch (error: any) {
      dispatch(jobsActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

// ++++++++++++++++++++++++++++ farmers ++++++++++++++++++++++++
export const fetchFarmerActiveJobs = (): any => async (dispatch: any) => {
  dispatch(jobsActions.startLoading());
  try {
    const response = await SendRequest.get('/jobs/activeJobs', {
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`
      }
    });
    dispatch(jobsActions.getFarmerActiveJobs(response.data.data));
  } catch (error: any) {
    dispatch(jobsActions.hasError(error ? error?.response?.data : 'Something went wrong'));
  }
};

export const fetchFarmerCompletedJobs = (): any => async (dispatch: any) => {
  dispatch(jobsActions.startLoading());
  try {
    const response = await SendRequest.get('/jobs/completedJobs', {
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`
      }
    });
    dispatch(jobsActions.getFarmerCompletedJobs(response.data.data));
  } catch (error: any) {
    dispatch(jobsActions.hasError(error ? error?.response?.data : 'Something went wrong'));
  }
};

export const fetchFarmerArchivedJobs = (): any => async (dispatch: any) => {
  dispatch(jobsActions.startLoading());
  try {
    const response = await SendRequest.get('/jobs/archievedJobs', {
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`
      }
    });
    dispatch(jobsActions.getFarmerArchivedJobs(response.data.data));
  } catch (error: any) {
    dispatch(jobsActions.hasError(error ? error?.response?.data : 'Something went wrong'));
  }
};

export const fetchFarmerDraftJobs = (): any => async (dispatch: any) => {
  dispatch(jobsActions.startLoading());
  try {
    const response = await SendRequest.get('/jobs/draftJobs', {
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`
      }
    });
    dispatch(jobsActions.getFarmerDraftJobs(response.data.data));
  } catch (error: any) {
    dispatch(jobsActions.hasError(error ? error?.response?.data : 'Something went wrong'));
  }
};

export const getJobPerId =
  (id: any): any =>
  async (dispatch: any) => {
    dispatch(jobsActions.startLoading());
    try {
      const response = await SendRequest.get(`/jobs/getCreatedjobs/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });

      dispatch(jobsActions.getJobPerId(response.data.data));
    } catch (error: any) {
      dispatch(jobsActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const markJobAsComplete =
  (id: string): any =>
  async (dispatch: Dispatch) => {
    dispatch(jobsActions.startLoading());
    try {
      await SendRequest.post(
        `/jobs/changeStatusComplete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`
          }
        }
      );
      dispatch(fetchFarmerActiveJobs());
    } catch (error: any) {
      dispatch(jobsActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const markJobAsArchive =
  (id: string): any =>
  async (dispatch: Dispatch) => {
    dispatch(jobsActions.startLoading());
    try {
      await SendRequest.post(
        `/jobs/changeStatusArchieve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`
          }
        }
      );
      dispatch(fetchFarmerActiveJobs());
    } catch (error: any) {
      dispatch(jobsActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const deleteJobPost =
  (id: string): any =>
  async (dispatch: Dispatch) => {
    dispatch(jobsActions.startLoading());
    try {
      await SendRequest.get(`/jobs/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
      dispatch(fetchFarmerActiveJobs());
      dispatch(fetchFarmerCompletedJobs());
      dispatch(fetchFarmerArchivedJobs());
      dispatch(fetchFarmerDraftJobs());
    } catch (error: any) {
      dispatch(jobsActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const getAllApplicants =
  ({ jobId }: { jobId: any }): any =>
  async (dispatch: Dispatch) => {
    dispatch(jobsActions.startLoading());
    try {
      const response = await SendRequest.get(`/jobs/viewApplicantPerJob/${jobId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
      dispatch(jobsActions.getApplicants(response.data.data));
    } catch (error: any) {
      dispatch(jobsActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const handleAssignApplicant =
  ({ applicant_id, jobId }: { applicant_id: string; jobId: any }): any =>
  async (dispatch: Dispatch) => {
    dispatch(jobsActions.startLoading());
    try {
      await SendRequest.post(
        `/jobs/changeStatusAssigned`,
        { applicant_id, jobId },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`
          }
        }
      );
    } catch (error: any) {
      dispatch(jobsActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const handleDeclineApplicant =
  ({ applicant_id, jobId }: { applicant_id: string; jobId: any }): any =>
  async (dispatch: Dispatch) => {
    dispatch(jobsActions.startLoading());
    try {
      await SendRequest.post(
        `/jobs/changeStatusDeclined`,
        { applicant_id, jobId },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`
          }
        }
      );
    } catch (error: any) {
      dispatch(jobsActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

export const handleRemoveApplicant =
  ({ user_id, jobId }: { user_id: string; jobId: any }): any =>
  async (dispatch: Dispatch) => {
    dispatch(jobsActions.startLoading());
    try {
      await SendRequest.get(
        `jobs/removeJobApplicant/${user_id}/${jobId}`,
        // { user_id, jobId },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`
          }
        }
      );
      dispatch(getAllApplicants({ jobId }));
    } catch (error: any) {
      dispatch(jobsActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };

// ++++++++++++++++++++++++++++ experts ++++++++++++++++++++++++
export const getExploreList = (): any => async (dispatch: Dispatch) => {
  dispatch(jobsActions.startLoading());
  try {
    const response = await SendRequest.get('/jobs/expert/getListOfJobsAvailable', {
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`
      }
    });
    dispatch(jobsActions.getExploreList(response.data.data));
  } catch (error: any) {
    dispatch(jobsActions.hasError(error ? error?.response?.data : 'Something went wrong'));
  }
};

export const getExpertActiveJobs = (): any => async (dispatch: Dispatch) => {
  dispatch(jobsActions.startLoading());
  try {
    const response = await SendRequest.get('/jobs/expert/activeJobs', {
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`
      }
    });
    dispatch(jobsActions.getExpertActiveJobs(response.data.data));
  } catch (error: any) {
    dispatch(jobsActions.hasError(error ? error?.response?.data : 'Something went wrong'));
  }
};

export const getExpertCompletedJobs = (): any => async (dispatch: Dispatch) => {
  dispatch(jobsActions.startLoading());
  try {
    const response = await SendRequest.get('/jobs/expert/completedJobs', {
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`
      }
    });
    dispatch(jobsActions.getExpertCompletedJobs(response.data.data));
  } catch (error: any) {
    dispatch(jobsActions.hasError(error ? error?.response?.data : 'Something went wrong'));
  }
};

export const applyForJob =
  (id: string): any =>
  async (dispatch: Dispatch) => {
    try {
      const response = await SendRequest.post(
        `/jobs/applyByApplicant/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`
          }
        }
      );
      console.log(response);
    } catch (error: any) {
      dispatch(jobsActions.hasError(error ? error?.response?.data : 'Something went wrong'));
    }
  };
