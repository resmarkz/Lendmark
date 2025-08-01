# 💼 LENDMARK – Lending Management System

LENDMARK is a Laravel-based lending application designed to manage users, loan processing, payments, and role-based workflows. It supports loan assignments to collectors and tracks the entire lifecycle of a client's borrowing journey.

---

## 🚀 Features

-   Role-based access: Admin, Collector, Client
-   Loan application, approval, and payment tracking
-   User profile management
-   Responsive dashboard and clean architecture

---

## 🧑‍🤝‍🧑 User Roles & Permissions

### 🛡️ Admin

-   Manage users (Admins, Collectors, Clients)
-   Assign loans to collectors
-   View all loans and payments
-   Configure system permissions

### 🧑‍💼 Collector

-   Manages assigned clients and loans
-   Views payment schedules
-   Follows up on payments

### 👨‍💼 Client

-   Registers and applies for loans
-   Tracks loan status and makes payments

---

## 🔁 Workflow Overview

1.  **Client signs up** and applies for a loan.
2.  **Admin** reviews the loan application and assigns it to a **Collector**.
3.  Payments are scheduled and tracked.
4.  **Collectors** follow up on payments.

---

## 🧩 Database Tables

### `users`

-   `name`, `email`, `password`, `role`: admin | collector | client

### `admin_profiles`

-   `user_id`

### `collector_profiles`

-   `user_id`, `contact_number`, `date_of_birth`

### `client_profiles`

-   `user_id`, `address`, `contact_number`, `date_of_birth`, `source_of_income`

### `contact_references`

-   `client_profile_id`, `name`, `contact_number`, `relationship`, `source_of_income`

### `loans`

-   `client_profile_id`, `collector_profile_id`, `marketing_id`, `amount`, `term`, `interest_rate`, `status`, `disbursement_date`

### `payments`

-   `loan_id`, `collector_profile_id`, `due_date`, `paid_at`, `amount_paid`, `status`

---

## ⚙️ Tech Stack

-   **Backend**: Laravel 11+
-   **Frontend**: React Inertia
-   **Database**: MySQL
-   **Auth**: Laravel Breeze
-   **UI**: TailwindCSS

---

## 📂 Setup Instructions

1.  Clone the repository:

    ```bash
    git clone https://github.com/resmarkz/Lendmark.git
    cd lendmark
    ```

2.  Install dependencies:

    ```bash
    composer install
    npm install && npm run dev
    ```

3.  Setup environment:

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4.  Run migrations:

    ```bash
    php artisan migrate
    ```

5.  Seed initial data (optional):

    ```bash
    php artisan db:seed
    ```

---

## 📌 License

MIT License © 2025 LENDMARK Team

---

## ✍️ Notes

-   This app is currently in development. Features are subject to change.
