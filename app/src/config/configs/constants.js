module.exports = {
  DEFAULT_QUERY_PARAMS: {
    limit: 20,
    offset: 0,
  },

  SENDGRID_EMAIL: process.env.SENDGRID_EMAIL,

  SENDGRID_TEMPLATE_ID: {
    welcome_email: process.env.WELCOME_EMAIL,
    forgot_password: process.env.FORGOT_PASSWORD
  },

  USER_TYPES: {
    Admin: 1,
    User: 2,
  },

  USER_CASHWITHDRAW_STATUS: {
    Pending: 1,
    UnderProcess: 2,
    Approved: 3,
    Rejected: 4,
  },

  SOCIAL_LOGINS: {
    Twitter: 1,
    Facebook: 2,
    GooglePlus: 3,
  },

  PAYMENT_GATEWAYS: {
    Wallet: 1,
    ZazPay: 2,
    PayPalREST: 3,
  },

  QUOTE_STATUS: {
    NewBid: 1,
    UnderDiscussion: 2,
    Hired: 3,
    Completed: 4,
    NotInterested: 5,
    Closed: 6,
    NotCompleted: 7,
  },

  CONTEST_STATUS: {
    PaymentPending: 1,
    PendingApproval: 2,
    Open: 3,
    Rejected: 4,
    RefundRequest: 5,
    CanceledByAdmin: 6,
    Judging: 7,
    WinnerSelected: 8,
    WinnerSelectedByAdmin: 9,
    ChangeRequested: 10,
    ChangeCompleted: 11,
    ExpectingDeliverables: 12,
    DeliveryFilesUploaded: 13,
    Completed: 14,
    PaidToParticipant: 15,
    PendingActionToAdmin: 16,
  },

  CONTEST_USER_STATUS: {
    Active: 1,
    Won: 2,
    Lost: 3,
    Withdrawn: 4,
    Eliminated: 5,
    Deleted: 6,
  },

  Resource: {
    Image: 1,
    Video: 2,
    Audio: 3,
    Text: 4,
  },

  UPLOAD_SERVICE_TYPEploadServiceType: {
    Direct: 1,
    Normal: 2,
  },

  UPLOAD_SERVICE: {
    Vimeo: 1,
    YouTube: 2,
    SoundCloud: 3,
  },

  UPLOAD_STATUS: {
    Success: 1,
    Processing: 2,
    Failure: 3,
  },

  JOB_STATUS: {
    Draft: 1,
    PaymentPending: 2,
    PendingApproval: 3,
    Open: 4,
    CanceledByEmployer: 5,
    Expired: 6,
    Archived: 7,
    CanceledByAdmin: 8,
  },

  ACTIVITY_TYPE: {
    ReviewPosted: 2,
    Notification: 3,
    JobApply: 5,
    FollowerPosted: 7,
    QuoteBidPosted: 9,
    QuoteBidStatusChanged: 10,
    QuoteBidAmountChanged: 11,
    ProjectStatusChanged: 13,
    ProjectWinnerSelected: 14,
    ProjectDisputePosted: 15,
    ProjectBidInvoicePosted: 16,
    ProjectBidInvoicePaid: 17,
    MilestonePosted: 18,
    MilestoneStatuschanged: 19,
    ContestStatusChanged: 20,
    ProjectMutualCancelAccept: 23,
    ProjectMutualCancelReject: 24,
    ProjectMutualCancelRequest: 25,
    ProjectBidPosted: 26,
    ProjectBidFreelancerWithdrawn: 27,
    ProjectBidStatusChanged: 28,
    PortfolioComment: 29,
    ProjectConversation: 30,
    QuoteConversation: 31,
    ContestConversation: 32,
    QuoteBidNotInterestedStatusChanged: 34,
    ProjectAcceptedToWork: 35,
    ProjectRejectedToWork: 36,
    ProjectAttachmentPosted: 37,
    ProjectDisputeStatusChanged: 38,
    JobStatusChanged: 39,
    BidInvite: 40,
    WithdrawRequested: 41,
    WithdrawRequestStatusChange: 42,
  },

  TRANSACTION_TYPE: {
    AmountAddedToWallet: 1,
    AdminAddedAmountToUserWallet: 2,
    AdminDeductedAmountToUserWallet: 3,
    ProjectListingFee: 4,
    ProjectMilestonePaymentPaid: 5,
    ProjectMilestonePaymentReleased: 6,
    ProjectInvoicePayment: 7,
    AmountRefundedToWalletForCanceledProjectPayment: 8,
    ContestListingFee: 9,
    AmountRefundedToWalletForCanceledContest: 10,
    AmountRefundedToWalletForRejectedContest: 11,
    ContestFeaturesUpdatedFee: 12,
    ContestTimeExtendedFee: 13,
    AmountMovedToParticipant: 14,
    JobListingFee: 15,
    QuoteSubscriptionPlan: 16,
    ExamFee: 17,
    WithdrawRequested: 18,
    WithdrawRequestApproved: 19,
    WithdrawRequestRejected: 20,
    WithdrawRequestCommission: 21,
  },

  EXAM_STATUS: {
    Inprogress: 1,
    Incomplete: 2,
    Passed: 3,
    Failed: 4,
    ExamFeePaymentPending: 5,
    FeePaidOrNotStarted: 6,
    SuspendedDueToTakingOvertime: 7,
  },

  PROJECT_STATUS: {
    Draft: 1,
    PaymentPending: 2,
    PendingForApproval: 3,
    OpenForBidding: 4,
    BiddingExpired: 5,
    WinnerSelected: 6,
    BiddingClosed: 9,
    EmployerCanceled: 10,
    UnderDevelopment: 11,
    MutuallyCanceled: 12,
    CanceledByAdmin: 13,
    FinalReviewPending: 14,
    Completed: 15,
    Closed: 16,
  },

  BID_STATUS: {
    Pending: 1,
    Won: 2,
    Lost: 3,
  },

  MILESTONE_STATUS: {
    Pending: 1,
    Approved: 2,
    RequestedForEscrow: 3,
    EscrowFunded: 4,
    Completed: 5,
    RequestedForRelease: 6,
    EscrowReleased: 7,
    Canceled: 8,
  },

  DISCOUNT_TYPES: {
    Percentage: 1,
    Amount: 2,
  },

  DisputeStatus: {
    Open: 1,
    UnderDiscussion: 2,
    WaitingForAdministratorDecision: 3,
    Closed: 4,
  },

  DisputeOpenType: {
    EmployerGiveMoreWorks: 1,
    EmployerGivePoorRating: 2,
    FreelancerWorkNotMatchesRequirement: 3,
    FreelancerGivePoorRating: 4,
  },

  DisputeCloseType: {
    EmployerGivingMoreWork: 1,
    CompletGivenWork: 2,
    EmployerGivenPoorFeedback: 3,
    EmployerGivenProperFeedback: 4,
    ItemMatchedProjectDescription: 5,
    ItemNotMatchedProjectDescription: 6,
    FreelancerGivenPoorFeedback: 8,
    FreelancerGivenProperFeedback: 7,
  }
};
