export default [
  {
    title: 'Contrat',
    children: [
      {
        title: 'Pv Comité',
        children: [
          {
            title: 'Ajouter',
            to: 'pv-add',
            action: 'create',
            subject: 'pv',
          },
          {
            title: 'Sans contrat',
            to: 'pv',
            action: 'read',
            subject: 'pv',
          },
          {
            title: 'Historique',
            to: { name: 'pv-historical' },
            action: 'historical',
            subject: 'pv',
            // badgeContent: historicalVpCount.value,
            // badgeClass: 'bg-global-primary',
          },
        ],
      },
      {
        title: 'Contract',
        children: [
          {
            title: 'Ajouter',
            to: 'contract-add',
            action: 'create',
            subject: 'contract',
          },
          {
            title: 'Sans signature',
            to: 'contract',
            action: 'read',
            subject: 'contract',
          },
          {
            title: 'Historique',
            to: 'contract-historical',
            action: 'historical',
            subject: 'contract',
          },
        ],
      },
    ]
  },
  {
    title: 'Contrat Hypothécaire',
    children: [
      {
        title: 'Pv Comité',
        children: [
          {
            title: 'Sans notification',
            to: 'pv-without-notification',
            action: 'read',
            subject: 'pv',
          },
          {
            title: 'Historique',
            to: { name: 'pv-historical-mortgage' },
            action: 'historical',
            subject: 'pv',
          },
        ],
      },
      {
        title: 'Notification',
        children: [
          {
            title: 'Ajouter',
            // to: 'contract-add',
            action: 'create',
            subject: 'contract',
          },
          {
            title: 'Sans validation head',
            // to: 'contract',
            action: 'without-head-validation',
            subject: 'contract',
          },
          {
            title: 'Sans contrat notarié',
            // to: 'contract',
            action: 'read',
            subject: 'contract',
          },
          {
            title: 'Historique',
            // to: 'contract-historical',
            action: 'historical',
            subject: 'contract',
          },
        ],
      },
    ]
  },
  {
    title: 'CAT',
    children: [
      {
        title: 'Ajouter',
        // to: 'cat-add',
        action: 'create',
        subject: 'cat',
      },
      {
        title: 'Historique',
        // to: 'cat',
        action: 'read',
        subject: 'cat',
      },
    ],
  },
  // {
  //   title: 'Report d\'échéance'
  // },
  // {
  //   title: 'Remboursement anticipé'
  // },
  // {
  //   title: 'Lettre de mise en demeure'
  // },
  // {
  //   title: 'Checking post-deblocage'
  // },
]
