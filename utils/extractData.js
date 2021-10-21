export function extractProfileData(rawProfileData) {
  const firstName = rawProfileData["firstName"]["localized"]["en_US"];
  const lastName = rawProfileData["lastName"]["localized"]["en_US"];
  const image = rawProfileData["profilePicture"]["displayImage~"]["elements"][2]["identifiers"][0]["identifier"];

  const profileData = { firstName, lastName, image };
  return profileData;
}

export function extractEmailData(rawEmailData) {
  return rawEmailData["elements"][0]["handle~"];
}
