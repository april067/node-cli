const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} = require('./contacts');

const { program } = require('commander');
program
	.option('-a, --action <type>', 'choose action')
	.option('-i, --id <type>', 'user id')
	.option('-n, --name <type>', 'user name')
	.option('-e, --email <type>', 'user email')
	.option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case 'list':
			console.log(await listContacts());
			break;

		case 'get':
			console.log(await getContactById(id));
			break;

		case 'add':
			console.log(await addContact(name, email, phone));
			break;

		case 'remove':
			console.log(await removeContact(id));
			break;

		case 'update':
			console.log(await updateContact(id, name, email, phone));
			break;

		default:
			console.warn('\x1B[31m Unknown action type!');
	}
}

invokeAction(options);
