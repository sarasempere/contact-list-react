const url = "https://assets.breatheco.de/apis/fake/contact/";
const getState = ({ getStore, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			contactList: []
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			loadContact() {
				fetch(url + "agenda/sarasempere")
					.then(response => response.json())
					.then(result => {
						setStore({
							contactList: result
						});
					})
					.catch(e => console.error(e));
			},

			addContact: (fullname, phone, email, address) => {
				fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						full_name: fullname,
						phone: phone,
						email: email,
						address: address,
						agenda_slug: "sarasempere"
					})
				}).then(() => {
					fetch(url + "agenda/sarasempere")
						.then(response => response.json())
						.then(addData => {
							setStore({ contactList: addData });
						})
						.catch(e => console.error(e));
				});
			},

			updateContact: (id, fullname, phone, email, address) => {
				fetch(url + id, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						full_name: fullname,
						phone: phone,
						email: email,
						address: address,
						agenda_slug: "sarasempere"
					})
				}).then(() => {
					fetch(url + "agenda/sarasempere")
						.then(response => response.json())
						.then(updatedData => {
							setStore({ contactList: updatedData });
						})
						.catch(e => console.error(e));
				});
			},
			deleteContact: id => {
				fetch(url + id, {
					method: "DELETE"
				}).then(() => {
					fetch(url + "agenda/sarasempere")
						.then(response => response.json())
						.then(deleteData => {
							setStore({ contactList: deleteData });
						})
						.catch(e => console.error(e));
				});
			}
		}
	};
};

export default getState;
