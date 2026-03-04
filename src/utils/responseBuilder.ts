export function buildResponse(contacts: any[]) {
  const primary = contacts.find(c => c.linkPrecedence === "primary");

  const emails = [...new Set(contacts.map(c => c.email).filter(Boolean))];
  const phoneNumbers = [...new Set(contacts.map(c => c.phoneNumber).filter(Boolean))];

  const secondaryContactIds = contacts
    .filter(c => c.linkPrecedence === "secondary")
    .map(c => c.id);

  return {
    contact: {
      primaryContatctId: primary.id,
      emails,
      phoneNumbers,
      secondaryContactIds,
    },
  };
}