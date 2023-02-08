import { Contacts } from '@/prisma/client';
import { Contact } from '@prisma/client';

export default function InMemoryRepo(): any {
  function addContact(contact: Contact): boolean {
    try {
      Contacts.push(contact);
      return true;
    } catch (error) {
      return false;
    }
  }

  function getContacts(): Contact[] {
    return Contacts.length === 0 ? [] : Contacts;
  }
  function getLastId(): number {
    if (Contacts.length === 0) return 0;
    return Contacts[Contacts.length - 1].id;
  }

  return {
    addContact: addContact,
    getContacts: getContacts,
    getLastId: getLastId,
  };
}
