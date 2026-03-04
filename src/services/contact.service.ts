import { prisma } from "../config/prisma";
import { LinkPrecedence } from "@prisma/client";
import { buildResponse } from "../utils/responseBuilder";

export async function identifyContact(
  email?: string,
  phoneNumber?: string
) {
  if (!email && !phoneNumber) {
    throw new Error("Either email or phoneNumber must be provided.");
  }

  // 1️⃣ Find matching contacts
  const matchedContacts = await prisma.contact.findMany({
    where: {
      OR: [
        email ? { email } : undefined,
        phoneNumber ? { phoneNumber } : undefined,
      ].filter(Boolean) as any,
    },
    orderBy: { createdAt: "asc" },
  });

  // 2️⃣ No match → create primary
  if (matchedContacts.length === 0) {
    const newContact = await prisma.contact.create({
      data: {
        email,
        phoneNumber,
        linkPrecedence: LinkPrecedence.primary,
      },
    });

    return buildResponse([newContact]);
  }

  // 3️⃣ Find oldest primary
  let primaryContact = matchedContacts
    .filter(c => c.linkPrecedence === "primary")
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())[0];

  if (!primaryContact) {
    primaryContact = matchedContacts[0];
  }

  // 4️⃣ Create secondary if new info
  const emailExists = matchedContacts.some(c => c.email === email);
  const phoneExists = matchedContacts.some(c => c.phoneNumber === phoneNumber);

  if (!emailExists || !phoneExists) {
    await prisma.contact.create({
      data: {
        email,
        phoneNumber,
        linkedId: primaryContact.id,
        linkPrecedence: LinkPrecedence.secondary,
      },
    });
  }

  // 5️⃣ Fetch all linked contacts
  const allContacts = await prisma.contact.findMany({
    where: {
      OR: [
        { id: primaryContact.id },
        { linkedId: primaryContact.id },
      ],
    },
    orderBy: { createdAt: "asc" },
  });

  return buildResponse(allContacts);
}