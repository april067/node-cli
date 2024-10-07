const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);
}

async function getContactById(contactId) {
	const contacts = await listContacts();
	const contact = contacts.find((item) => item.id === contactId);

	return contact || null;
}

async function removeContact(contactId) {
	const contacts = await listContacts();
	const index = contacts.findIndex((item) => item.id === contactId);
	if (!index === -1) return null;

	const [contact] = contacts.splice(index, 1);

	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

	return contact;
}

async function addContact(data) {
	const contacts = await listContacts();
	const newContact = { id: uuidv4(), ...data };
	contacts.push(newContact);

	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

	return newContact;
}

async function updateContactById(contactId, data) {
	const contacts = await listContacts();
	const index = contacts.findIndex((item) => item.id === contactId);
	if (index === -1) return null;

	/** second solution
   const [contact] = contacts.splice(index, 1);
   const newContact = { ...contact, ...data };
   contacts.push(newContact);
   
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

   return newContact; 
   */

	contacts[index] = { id: contactId, ...data };

	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

	return contacts[index];
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContactById,
};
