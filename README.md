# Social-Network-API

## 📖 Description
The **Social Network API** is a backend application that enables users to:
- Create and manage user accounts.
- Add, update, and delete thoughts.
- React to thoughts with comments.
- Manage friend lists by adding or removing friends.

This API is built using **Node.js, Express.js, MongoDB, and Mongoose** 

---

## 📌 Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [License](#license)
- [Walkthrough](#walkthrough)
- [Questions](#questions)

---

## 💾 Installation

To install the required dependencies, run the following command:
```sh
npm install
```
## 🚀 Usage

To start the server in development mode using **ts-node**:
```sh
npx ts-node src/server.ts
```
To build and run the compiled JavaScript version:
```sh
npm run build
npm start
```
Once the server is running, use Insomnia or Postman to test the API by making requests to the appropriate endpoints.

Make sure MongoDB is running before starting the server. If using a local MongoDB database, start it with:
```sh
mongod
```
## 📡 API Routes

### **Users**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/users` | Get all users |
| `GET` | `/api/users/:userId` | Get a user by ID |
| `POST` | `/api/users` | Create a new user |
| `PUT` | `/api/users/:userId` | Update a user |
| `DELETE` | `/api/users/:userId` | Delete a user and associated thoughts |

### **Friends**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/users/:userId/friends/:friendId` | Add a friend |
| `DELETE` | `/api/users/:userId/friends/:friendId` | Remove a friend |

### **Thoughts**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/thoughts` | Get all thoughts |
| `GET` | `/api/thoughts/:thoughtId` | Get a thought by ID |
| `POST` | `/api/thoughts` | Create a thought |
| `PUT` | `/api/thoughts/:thoughtId` | Update a thought |
| `DELETE` | `/api/thoughts/:thoughtId` | Delete a thought |

### **Reactions**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/thoughts/:thoughtId/reactions` | Add a reaction to a thought |
| `DELETE` | `/api/thoughts/:thoughtId/reactions/:reactionId` | Remove a reaction |

## 🎥 Walkthrough

[Walkthrough Video ](https://github.com/user-attachments/assets/0bc4e8d3-6b8f-4456-ac3d-a3da7d0eacdb)

### 📌 Steps Covered in the Walkthrough:
1. **Starting the Server**  
   - Running the application using `npx ts-node src/server.ts` or `npm start`.

2. **Testing User Routes (`/api/users`)**  
   - Creating, updating, deleting users.  
   - Fetching all users and a single user by ID.  
   - Adding and removing friends.

3. **Testing Thought Routes (`/api/thoughts`)**  
   - Creating a new thought and associating it with a user.  
   - Updating and deleting thoughts.  
   - Fetching all thoughts and a single thought by ID.

4. **Testing Reaction Routes (`/api/thoughts/:thoughtId/reactions`)**  
   - Adding reactions to a thought.  
   - Deleting a reaction by ID.

5. **Database Verification (Optional)**  
   - Viewing users, thoughts, and reactions in **MongoDB Compass** or using **`mongosh`**.

### 📌 Video Link:
📺 **[Insert Walkthrough Video Link Here]**

## 📝 License

This project is licensed under the **MIT License**.

## ❓ Questions

If you have any questions about this project, feel free to reach out:
 
🐙 GitHub: **[Narupo](https://github.com/Narupo)**  

If you like this project, consider giving it a ⭐ on GitHub!




