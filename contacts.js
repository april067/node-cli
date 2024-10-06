const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);
}

async function getContactById(contactId) {
	const contacts = await listContacts();
	const contact = contacts.find((item) => item.id === contactId);
	if (!contact) return null;
	return contact;
}

async function removeContact(contactId) {
	const contacts = await listContacts();
}

async function addContact(name, email, phone) {}

async function updateContact(contactId, name, email, phone) {}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
