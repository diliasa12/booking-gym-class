# Gym Class Booking API Documentation

API untuk sistem booking kelas gym dengan autentikasi dan otorisasi berbasis role (Admin & User).

## Cara Mnejalankan Server

```
npm run dev
```

## Base URL

```
http://localhost:3000/api
```

## Authentication

API ini menggunakan JWT (JSON Web Token) untuk autentikasi. Token harus disertakan di header untuk endpoint yang memerlukan authorization:

```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### 🔐 Authentication Routes

#### 1. Register

Mendaftarkan user baru.

- **URL:** `/auth/register`
- **Method:** `POST`
- **Auth Required:** No
- **Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

- **Success Response:**
  - **Code:** 201
  - **Content:**

```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### 2. Login

Login untuk mendapatkan JWT token.

- **URL:** `/auth/login`
- **Method:** `POST`
- **Auth Required:** No
- **Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

- **Success Response:**
  - **Code:** 200
  - **Content:**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 👨‍💼 Admin Routes

**Semua endpoint memerlukan role: `admin`**

#### 3. Create Class

Membuat kelas gym baru.

- **URL:** `/class`
- **Method:** `POST`
- **Auth Required:** Yes (Admin only)
- **Request Body:**

```json
{
  "name": "Yoga Morning",
  "description": "Morning yoga class for beginners",
  "date": "2024-12-01T07:00:00Z",
  "capacity": 20
}
```

- **Success Response:**
  - **Code:** 201
  - **Content:**

```json
{
  "success": true,
  "message": "Class created successfully",
  "data": {
    "title": "Yoga Morning",
    "description": "Morning yoga class for beginners",
    "date": "2024-12-01T07:00:00Z",
    "capacity": 20,
    "members": []
  }
}
```

#### 4. Get All Classes

Mendapatkan daftar semua kelas.

- **URL:** `/class`
- **Method:** `GET`
- **Auth Required:** Yes (Admin only)
- **Success Response:**
  - **Code:** 200
  - **Content:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "class_id",
      "title": "Yoga Morning",
      "date": "2024-12-01T07:00:00Z",
      "capacity": 20,
      "members": ["user1", "user2"]
    }
  ]
}
```

#### 5. Get Class by ID

Mendapatkan detail kelas berdasarkan ID.

- **URL:** `/class/:id`
- **Method:** `GET`
- **Auth Required:** Yes (Admin only)
- **URL Parameters:** `id=[string]` - Class ID
- **Success Response:**
  - **Code:** 200
  - **Content:**

```json
{
  "success": true,
  "data": {
    "_id": "class_id",
    "title": "Yoga Morning",
    "description": "Morning yoga class for beginners",
    "date": "2024-12-01T07:00:00Z",
    "capacity": 20,
    "members": []
  }
}
```

#### 6. Update Class

Mengupdate informasi kelas.

- **URL:** `/class/:id`
- **Method:** `PATCH`
- **Auth Required:** Yes (Admin only)
- **URL Parameters:** `id=[string]` - Class ID
- **Request Body:**

```json
{
  "title": "Yoga Evening",
  "capacity": 25,
  "date": "2024-12-01T18:00:00Z"
}
```

- **Success Response:**
  - **Code:** 200
  - **Content:**

```json
{
  "success": true,
  "message": "Class updated successfully",
  "data": {
    "_id": "class_id",
    "title": "Yoga Evening",
    "capacity": 25,
    "date": "2024-12-01T18:00:00Z"
  }
}
```

#### 7. Delete Class

Menghapus kelas.

- **URL:** `/class/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes (Admin only)
- **URL Parameters:** `id=[string]` - Class ID
- **Success Response:**
  - **Code:** 200
  - **Content:**

```json
{
  "success": true,
  "message": "Class deleted successfully"
}
```

---

### 👤 User Routes

**Semua endpoint memerlukan role: `user`**

#### 8. Get User Profile

Mendapatkan profil user yang sedang login.

- **URL:** `/user/profile`
- **Method:** `GET`
- **Auth Required:** Yes (User only)
- **Success Response:**
  - **Code:** 200
  - **Content:**

```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "joinedClass": ["class_id_1", "class_id_2"]
  }
}
```

#### 9. Get My Booked Classes

Mendapatkan daftar kelas yang sudah dibooking oleh user.

- **URL:** `/user/classes`
- **Method:** `GET`
- **Auth Required:** Yes (User only)
- **Success Response:**
  - **Code:** 200
  - **Content:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "class_id",
      "title": "Yoga Morning",
      "date": "2024-12-01T07:00:00Z"
    }
  ]
}
```

#### 10. Get Available Classes

Mendapatkan daftar kelas yang masih tersedia (belum penuh).

- **URL:** `/user/availableclass`
- **Method:** `GET`
- **Auth Required:** Yes (User only)
- **Success Response:**
  - **Code:** 200
  - **Content:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "class_id",
      "title": "Yoga Morning",
      "date": "2024-12-01T07:00:00Z",
      "capacity": 20
    }
  ]
}
```

#### 11. Book a Class

Mendaftar ke kelas tertentu.

- **URL:** `/user/book/:classId`
- **Method:** `POST`
- **Auth Required:** Yes (User only)
- **URL Parameters:** `classId=[string]` - Class ID
- **Success Response:**
  - **Code:** 200
  - **Content:**

```json
{
  "success": true,
  "message": "Successfully booked the class",
  "data": {
    "_id_": "class_id",
    "title": "Yoga Morning",
    "date": "2024-12-01T07:00:00Z"
  }
}
```

#### 12. Cancel Booking

Membatalkan booking kelas.

- **URL:** `/user/book/:classId`
- **Method:** `DELETE`
- **Auth Required:** Yes (User only)
- **URL Parameters:** `classId=[string]` - Class ID
- **Success Response:**
  - **Code:** 200
  - **Content:**

```json
{
  "success": true,
  "message": "Booking cancelled successfully"
}
```

---

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "message": "Invalid input data"
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Authentication required"
}
```

### 403 Forbidden

```json
{
  "success": false,
  "message": "Access denied. Insufficient permissions"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 409 Conflict

```json
{
  "success": false,
  "message": "Resources already exist"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error"
}
```
