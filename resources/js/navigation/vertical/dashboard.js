export default [
  {
    title: 'Pv Comité',
    icon: { icon: 'tabler-align-box-left-top' },
    children: [
      {
        title: 'Ajouter',
        to: 'pv-add',
      },
      {
        title: 'En attente de contrat',
        to: 'pv',
      },
      {
        title: 'Historique',
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
        title: 'Ajouter',
        to: 'contract-add',
      },
      {
        title: 'En attente de signature',
        to: 'contract',
      },
      {
        title: 'En attente de CAT',
      },
      {
        title: 'Historique',
      },
    ],
  },
]
