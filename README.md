# 💼 LENDMARK – Lending Management System

LENDMARK is a Laravel-based lending application designed to manage users, loan processing, payments, and role-based workflows. It supports referral-based loan assignments and tracks the entire lifecycle of a client's borrowing journey.

---

## 🚀 Features

-   Role-based access: Admin, Agent, Client
-   Agent referrals with custom referral codes
-   Loan application, approval, and payment tracking
-   Department and user profile management
-   Responsive dashboard and clean architecture

---

## 🧑‍🤝‍🧑 User Roles & Permissions

### 🛡️ Admin

-   Manage users (Admins, Agents, Clients)
-   Assign loans and departments
-   View all loans and payments
-   Configure system permissions

### 🧑‍💼 Agent

-   Assigned by role: `telemarketer` or `collector`
-   Manages assigned clients and loans
-   Views payment schedules
-   Works through referrals or admin assignments

### 👨‍💼 Client

-   Registers and applies for loans
-   Can input referral code during sign-up or loan application
-   Tracks loan status and makes payments

---

## 🔁 Workflow Overview

1. **Client signs up**, enters optional referral code.
2. Referral is stored and linked to an `agent_profile`.
3. Client applies for a loan.
4. Loan is auto-assigned (via referral) or manually assigned by admin.
5. Payments are scheduled and tracked.
6. Collectors follow up on payments.

---

## 🧩 Database Tables

### `users`

-   `name`, `email`, `password`, `role`: admin | agent | client

### `agent_profiles`

-   `user_id`, `referral_code` (unique), `contact_number`, `department_id`, `region`, `hired_at`, `notes`

### `admin_profiles`

-   `user_id`, `position`

### `client_profiles`

-   `user_id`, `address`, `source_of_income`, `date_of_birth`, etc.

### `departments`

-   `name`: TELEMARKETER | COLLECTIONS

### `loans`

-   `client_profile_id`, `amount`, `term`, `interest_rate`, `status`

### `payments`

-   `loan_id`, `due_date`, `paid_at`, `amount_paid`, `status`

### `loan_assignments`

-   `loan_id`, `agent_profile_id`, `role`: telemarketer | collector

### `referrals`

-   `referral_code` (FK to `agent_profiles`), `client_profile_id`

---

## ⚙️ Tech Stack

-   **Backend**: Laravel 11+
-   **Frontend**: React Inertia
-   **Database**: MySQL
-   **Auth**: Laravel Breeze
-   **UI**: TailwindCSS

---

## 📂 Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/resmarkz/Lendmark.git
    cd lendmark
    ```

2. Install dependencies:

    ```bash
    composer install
    npm install && npm run dev
    ```

3. Setup environment:

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4. Run migrations:

    ```bash
    php artisan migrate
    ```

5. Seed initial data (optional):
    ```bash
    php artisan db:seed
    ```

---

## 📌 License

MIT License © 2025 LENDMARK Team

---

## ✍️ Notes

-   This app is currently in development. Features are subject to change.
-   Referral flow can be extended with tracking analytics, rewards, or performance metrics.
