const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function getContactsList() {
  try {
    const data = await fs.readFile(contactsPath);

    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}
// TODO: задокументувати кожну функцію
async function listContacts() {
  const contactList = await getContactsList();
  console.table(contactList);
}

async function getContactById(contactId) {
  const contactList = await getContactsList();

  const filteredContact = contactList.find(
    (item) => item.id === contactId.toString()
  );
  console.table(filteredContact);
}

async function removeContact(contactId) {
  const contactList = await getContactsList();

  const filteredContact = contactList.filter(
    (item) => item.id !== contactId.toString()
  );

  await fs.writeFile(contactsPath, JSON.stringify(filteredContact));

  console.table(filteredContact);
}

async function addContact(name, email, phone) {
  const contactList = await getContactsList();

  const id = (contactList.length + 1).toString();
  const updatedContacts = [...contactList, { id, name, email, phone }];

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));

  console.table(updatedContacts);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
