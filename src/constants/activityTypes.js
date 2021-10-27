// These types are defined by the API
const API_TYPES = {
  docUpdate: 'doc-update',
  docCreated: 'doc-create',
  docCount: 'doc-count',
  accountCreated: 'account-create',
  sharingGet: 'sharing-get',
  sharingCreate: 'sharing-create',
  careTeamAccept: 'care-team-accept',
  careTeamAdded: 'care-team-be-added',
  careTeamInvite: 'care-team-invite',
  linkImport: 'link-import-med',
};

// These types are defined by the client
const CLIENT_TYPES = {
  docAddThreeTypes: 'doc-add-three-types',
};

// Users shouldn't see certain events if it was their action that created
// the activity. Add any of those to this object
export const ignoreCurrentUser = {
  [API_TYPES.docCreated]: true,
  [API_TYPES.careTeamInvite]: true,
  [API_TYPES.docUpdate]: true,
};

export default {
  ...API_TYPES,
  ...CLIENT_TYPES,
};
