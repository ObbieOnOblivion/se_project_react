const baseUrl = 'http://localhost:3001';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

const getCards = () => {
  return fetch(`${baseUrl}/items`)
    .then((response) => {
      return checkResponse(response);
    })

};

const addCard = (data, auth) => {
  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return checkResponse(response);
    })

};

const deleteCard = (id, token) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
  })
    .then((response) => {
      return checkResponse(response);
    })

};

const registerUser = (email, password, name, avatar) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "name": name, "avatar": avatar, "email": email, "password": password })
  }).then(res => {
    return checkResponse(res);
  })
}

const loginUser = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "email": email, "password": password })
  }).then(response => checkResponse(response))
}

const checkUser = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    }
  })
    .then(response => checkResponse(response))
}

const updateUser = (data, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  })
    .then(response => checkResponse(response))
}

const addCardLike = (itemId, token) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    }
  })
    .then(response => checkResponse(response))
}

const removeCardLike = (itemId, token) =>{
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    }
  })
    .then(response => checkResponse(response))
}


export { getCards, addCard, deleteCard, checkResponse, registerUser, loginUser, checkUser, updateUser,
  addCardLike, removeCardLike
};

