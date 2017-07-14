function selectMembershipType(membershipType, plusStatus) {
  const membership = {
      "membershipType": null,
      "autoRenew": "YEARLY",
      "issuingClubId": 6279,
      "plusStatus": null
  };
  sessionStorage.clear();
  sessionStorage.setItem('membership-type', JSON.stringify(Object.assign(membership,
    {"membershipType": membershipType, "plusStatus": plusStatus })));
}

