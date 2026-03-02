export const grants = [
  {
    id: 'grant-101',
    projectName: 'Student Startup Grant',
    sponsor: 'University Innovation Council',
    totalAmount: 180000,
    category: 'Startup',
    status: 'Active',
    completion: 60,
    createdAt: '2026-01-10',
    deadline: '2026-08-30',
    contractAddress: 'ALGO1CONTRACTX9Y2Z7B4C8D1E5F0G3H6J9K2L5M8N1P4Q7R0S',
    teamWallet: 'TEAMWALLETSTARTUPGRANT1234567890ABCDEF',
    description: 'Seed funding for student-led startups with milestone-based disbursement.',
    milestones: [
      { id: 'm1', name: 'Business Plan Approval', description: 'Submit and get approval for business plan.', amount: 30000, spent: 28000, status: 'Released', date: '2026-01-22' },
      { id: 'm2', name: 'MVP Development', description: 'Build and demo a minimum viable product.', amount: 50000, spent: 42000, status: 'Approved', date: '2026-03-15' },
      { id: 'm3', name: 'User Testing', description: 'Conduct user testing with 50+ participants.', amount: 45000, spent: 26000, status: 'Pending', date: '2026-05-12' },
      { id: 'm4', name: 'Market Launch', description: 'Launch product to initial target market.', amount: 55000, spent: 0, status: 'Pending', date: '2026-07-28' },
    ],
  },
  {
    id: 'grant-102',
    projectName: 'Campus Innovation Fund',
    sponsor: 'Academic Research Board',
    totalAmount: 240000,
    category: 'Innovation',
    status: 'Active',
    completion: 45,
    createdAt: '2025-12-05',
    deadline: '2026-10-12',
    contractAddress: 'ALGO1MEDICONTRACT4P8Q2R6S0T9U3V7W1X5Y8Z2A6B0C4D8E1F5G9H',
    teamWallet: 'TEAMWALLETCAMPUSINNOVATION1234567890',
    description: 'Fund for campus-based innovation projects solving real-world problems.',
    milestones: [
      { id: 'm1', name: 'Research Proposal', description: 'Submit validated research proposal.', amount: 70000, spent: 64000, status: 'Released', date: '2026-01-19' },
      { id: 'm2', name: 'Prototype Build', description: 'Develop working prototype and documentation.', amount: 90000, spent: 51000, status: 'Pending', date: '2026-04-01' },
      { id: 'm3', name: 'Peer Review & Validation', description: 'Submit to peer review and get external validation.', amount: 80000, spent: 0, status: 'Pending', date: '2026-07-16' },
    ],
  },
  {
    id: 'grant-103',
    projectName: 'Entrepreneurship Support Grant',
    sponsor: 'Student Entrepreneurship Cell',
    totalAmount: 120000,
    category: 'Entrepreneurship',
    status: 'Completed',
    completion: 100,
    createdAt: '2025-06-18',
    deadline: '2026-01-31',
    contractAddress: 'ALGO1EDUMESHCONTRACT3A7B1C5D9E2F6G0H4J8K1L5M9N2P6Q0R4S8T',
    teamWallet: 'TEAMWALLETENTREPRENEURSHIP12345678',
    description: 'Support for student entrepreneurs from ideation to market entry.',
    milestones: [
      { id: 'm1', name: 'Ideation Workshop', description: 'Complete structured ideation and validation.', amount: 40000, spent: 39000, status: 'Released', date: '2025-08-10' },
      { id: 'm2', name: 'Incubation Phase', description: 'Complete 3-month incubation program.', amount: 50000, spent: 49500, status: 'Released', date: '2025-11-03' },
      { id: 'm3', name: 'Demo Day & Report', description: 'Present at demo day and submit impact report.', amount: 30000, spent: 30000, status: 'Released', date: '2026-01-20' },
    ],
  },
  {
    id: 'grant-104',
    projectName: 'Young Innovators Grant',
    sponsor: 'National Youth Foundation',
    totalAmount: 300000,
    category: 'Innovation',
    status: 'Pending',
    completion: 10,
    createdAt: '2026-02-08',
    deadline: '2026-12-15',
    contractAddress: 'ALGO1SOLARCONTRACT5Z9Y3X7W1V5U9T3S7R1Q5P9N3M7L1K5J9H3G7',
    teamWallet: 'TEAMWALLETYOUNGINNOVATORS12345678',
    description: 'Grants for young innovators working on technology-driven social impact.',
    milestones: [
      { id: 'm1', name: 'Problem Statement', description: 'Define and validate the problem statement.', amount: 50000, spent: 7000, status: 'Approved', date: '2026-03-20' },
      { id: 'm2', name: 'Solution Development', description: 'Build and test the proposed solution.', amount: 170000, spent: 0, status: 'Pending', date: '2026-07-10' },
      { id: 'm3', name: 'Impact Assessment', description: 'Measure and report social impact metrics.', amount: 80000, spent: 0, status: 'Pending', date: '2026-10-05' },
    ],
  },
  {
    id: 'grant-105',
    projectName: 'Student Venture Grant',
    sponsor: 'Venture Capital Partners',
    totalAmount: 95000,
    category: 'Venture',
    status: 'Active',
    completion: 72,
    createdAt: '2025-11-24',
    deadline: '2026-06-18',
    contractAddress: 'ALGO1RIVERWATCHCONTRACT8Q2W6E0R4T8Y2U6I0O4P8A2S6D0F4G8H2J6K',
    teamWallet: 'TEAMWALLETSTUDENTVENTURE1234567890',
    description: 'Venture funding for student teams with scalable business models.',
    milestones: [
      { id: 'm1', name: 'Team Formation', description: 'Form team and submit venture proposal.', amount: 30000, spent: 29500, status: 'Released', date: '2025-12-30' },
      { id: 'm2', name: 'Traction Metrics', description: 'Achieve initial traction and user acquisition.', amount: 40000, spent: 35000, status: 'Approved', date: '2026-02-28' },
      { id: 'm3', name: 'Investor Pitch', description: 'Prepare and deliver investor pitch deck.', amount: 25000, spent: 3800, status: 'Pending', date: '2026-05-25' },
    ],
  },
]


export const transactionHistoryByGrant = {
  'grant-101': [
    { txHash: 'ALGO7HF9P0T1K2L3M4N5Q6R7S8V9W0X1Y2Z3A4B5C6D7E8F9', date: '2026-03-02', amount: 12000, milestone: 'MVP Development', status: 'Approved' },
    { txHash: 'ALGO1ZX2CV3BN4MA5SD6FG7HJ8KL9QW0ER1TY2UI3OP4AS5DF', date: '2026-02-10', amount: 18000, milestone: 'MVP Development', status: 'Released' },
    { txHash: 'ALGO0PL9OK8IJ7UH6YG5TF4RD3ES2WA1QZ0X9CV8BN7ML6KP', date: '2026-01-22', amount: 30000, milestone: 'Business Plan Approval', status: 'Released' },
  ],
  'grant-102': [
    { txHash: 'ALGO9MN8BV7CX6ZA5SD4FG3HJ2KL1PO0IU9YT8RE7WA6QS5D', date: '2026-02-16', amount: 51000, milestone: 'Prototype Build', status: 'Pending' },
    { txHash: 'ALGO3DF4GH5JK6LQ7WE8RT9YU0IO1PA2SD3FG4HJ5KL6ZX7CV', date: '2026-01-19', amount: 70000, milestone: 'Research Proposal', status: 'Released' },
  ],
  'grant-103': [
    { txHash: 'ALGO4PO5IU6YT7RE8WA9QS0DF1GH2JK3LZ4XC5VB6NM7AS8DF', date: '2026-01-20', amount: 30000, milestone: 'Demo Day & Report', status: 'Released' },
    { txHash: 'ALGO2ZA3SX4DC5FV6GB7HN8JM9KL0PO1IU2YT3RE4WA5QS6DF', date: '2025-11-03', amount: 50000, milestone: 'Incubation Phase', status: 'Released' },
  ],
}

export const daoProposals = [
  { id: 'p-1', title: 'Approve Campus Innovation Fund Milestone 2', description: 'Release remaining funds for prototype build after verifier confirms research deliverables.', yes: 72, no: 12, abstain: 8, deadline: '2026-03-14', status: 'Active' },
  { id: 'p-2', title: 'Onboard New Third-Party Audit Partner', description: 'Vote to onboard Sentinel Labs for quarterly compliance validation across grants.', yes: 55, no: 25, abstain: 10, deadline: '2026-03-09', status: 'Active' },
  { id: 'p-3', title: 'Extend Young Innovators Grant Deadline', description: 'Adjust project timeline due to additional validation requirements.', yes: 80, no: 9, abstain: 4, deadline: '2026-02-20', status: 'Passed' },
  { id: 'p-4', title: 'Rebalance Student Venture Grant Allocation', description: 'Rebalance treasury by adjusting unspent milestone allocation and reallocating to new ventures.', yes: 24, no: 61, abstain: 11, deadline: '2026-01-17', status: 'Rejected' },
]

export const analyticsData = {
  fundsOverTime: [
    { month: 'Oct', amount: 120000 },
    { month: 'Nov', amount: 180000 },
    { month: 'Dec', amount: 210000 },
    { month: 'Jan', amount: 260000 },
    { month: 'Feb', amount: 315000 },
    { month: 'Mar', amount: 358000 },
  ],
  milestoneCompletion: [
    { name: 'Completed', value: 68 },
    { name: 'Pending', value: 32 },
  ],
  topFundedProjects: [
    { project: 'Young Innovators Grant', value: 300000 },
    { project: 'Campus Innovation Fund', value: 240000 },
    { project: 'Student Startup Grant', value: 180000 },
    { project: 'Student Venture Grant', value: 95000 },
  ],
  categoryBreakdown: [
    { name: 'Innovation', value: 32 },
    { name: 'Startup', value: 25 },
    { name: 'Entrepreneurship', value: 20 },
    { name: 'Venture', value: 15 },
    { name: 'Research', value: 8 },
  ],
}

export const dashboardSummary = {
  totalReceived: 126500,
  pendingRelease: 54000,
  nextMilestoneDue: '2026-03-18',
  completionPercent: 64,
}

export const upcomingMilestones = [
  { id: 'u1', grant: 'Student Startup Grant', name: 'User Testing', dueDate: '2026-03-18', amount: 45000 },
  { id: 'u2', grant: 'Campus Innovation Fund', name: 'Prototype Build', dueDate: '2026-03-22', amount: 90000 },
  { id: 'u3', grant: 'Student Venture Grant', name: 'Investor Pitch', dueDate: '2026-03-27', amount: 25000 },
]

export const recentTransactions = [
  { id: 'r1', hash: 'ALGO1R2T3Y4U5I6O7P8A9S0D1F2G3H4J5K6L7Z8X9C0V1B2N', amount: 12000, grant: 'Student Startup Grant', date: '2026-03-02', status: 'Approved' },
  { id: 'r2', hash: 'ALGO3E4W5Q6A7S8D9F0G1H2J3K4L5Z6X7C8V9B0N1M2L3K4J', amount: 8500, grant: 'Student Venture Grant', date: '2026-02-28', status: 'Released' },
  { id: 'r3', hash: 'ALGO7U8I9O0P1A2S3D4F5G6H7J8K9L0Z1X2C3V4B5N6M7L8K', amount: 30000, grant: 'Young Innovators Grant', date: '2026-02-20', status: 'Pending' },
]

export const walletTransactions = [
  { id: 'w1', txHash: 'ALGO9A8S7D6F5G4H3J2K1L0P9O8I7U6Y5T4R3E2W1Q0Z9X8C', type: 'Inbound', amount: 3200, date: '2026-03-01', status: 'Confirmed' },
  { id: 'w2', txHash: 'ALGO5V6B7N8M9L0K1J2H3G4F5D6S7A8Q9W0E1R2T3Y4U5I6O', type: 'Outbound', amount: 780, date: '2026-02-27', status: 'Pending' },
  { id: 'w3', txHash: 'ALGO0Q9W8E7R6T5Y4U3I2O1P0A9S8D7F6G5H4J3K2L1Z0X9C', type: 'Inbound', amount: 1420, date: '2026-02-26', status: 'Confirmed' },
  { id: 'w4', txHash: 'ALGO1Z2X3C4V5B6N7M8L9K0J1H2G3F4D5S6A7Q8W9E0R1T2Y', type: 'Outbound', amount: 210, date: '2026-02-22', status: 'Confirmed' },
]

export const landingStats = {
  totalGrants: 128,
  totalFunded: 5290000,
  activeProjects: 43,
  milestonesCompleted: 362,
}
