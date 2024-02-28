export default [
  {
    title: 'VP COMMITTEE',
    icon: { icon: 'tabler-align-box-left-top' },
    children: [
      {
        title: 'Add',
        to: 'pv-add',
      },
      {
        title: 'Waiting for contract',
        to: 'pv',
      },
      {
        title: 'Historical',
        to: 'pv-historical',

        // badgeContent: historicalVpCount.value,
        // badgeClass: 'bg-global-primary',
      },
    ],
  },
  {
    title: 'Contract',
    icon: { icon: 'tabler-align-box-left-top' },
    children: [
      {
        title: 'Add',
        to: 'contract-add',
      },
      {
        title: 'contract',
        to: 'contract',
      },
    ],
  },
]
