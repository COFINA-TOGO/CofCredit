export default [
  {
    title: 'Pv Comité',
    icon: { icon: 'tabler-align-box-left-top' },
    children: [
      {
        title: 'Ajouter',
        to: 'pv-add',
        action: 'create',
        subject: 'pv',
      },
      {
        title: 'En attente de contrat',
        to: 'pv',
        action: 'read',
        subject: 'pv',
      },
      {
        title: 'Historique',
        to: 'pv-historical',
        action: 'historical',
        subject: 'pv',
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
        title: 'Ajouter',
        to: 'contract-add',
        action: 'create',
        subject: 'contract',
      },
      {
        title: 'En attente de signature',
        to: 'contract',
        action: 'read',
        subject: 'contract',
      },
      {
        title: 'En attente de CAT',
        to: 'contract-waiting-cat',
        action: 'waiting_cat',
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
  {
    title: 'CAT',
    icon: { icon: 'tabler-align-box-left-top' },
    children: [
      {
        title: 'Ajouter',
        to: 'cat-add',
        action: 'create',
        subject: 'cat',
      },
      {
        title: 'Historique',
        to: 'cat',
        action: 'read',
        subject: 'cat',
      },
    ],
  },
]
