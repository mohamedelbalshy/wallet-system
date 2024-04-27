# Wallet Management System

Welcome to the Wallet Management System! This project aims to provide a convenient and secure platform for managing your finances digitally.

## Features

### 1. Deposit Money to Wallet
Users can deposit money into their digital wallets using various payment methods such as credit/debit cards, bank transfers, or digital payment services like Stripe.

### 2. Send Money from User to Another User
This feature allows users to transfer money from their wallet to another user's wallet within the system. Users can easily send funds to friends, family, or other contacts.

### 3. Save Card to Database
Users have the option to securely save their credit/debit card details to the system's database for quicker and more convenient transactions in the future. The system ensures the safety of card information through encryption and secure storage practices using Prisma and PostgreSQL.

### 4. Check Wallet Balance
Users can check their wallet balance at any time to keep track of their finances. This feature provides users with real-time updates on their available funds, ensuring transparency and financial awareness.

### 5. Withdraw Money from Wallet to Bank Account or Card
Users can withdraw funds from their digital wallet and transfer them to their linked bank account or credit/debit card. This feature offers flexibility and convenience for users to access their funds in the way that best suits their needs, ensuring ACID transactions with PostgreSQL.

## Getting Started

To get started with the Wallet Management System, follow these steps:

1. Clone the repository to your local machine.
2. Install any necessary dependencies specified in the project's documentation.
3. Set up a PostgreSQL database for storing user information, wallet balances, and transaction history, ensuring ACID transactions.
4. Configure the project settings, including database connection details and security measures.
5. Run the application locally using NestJS, Prisma, and Stripe for payment integration, or deploy it to a server for production use.

## Technologies Used

- Framework: [NestJS](https://nestjs.com/)
- ORM: [Prisma](https://www.prisma.io/)
- Database: [PostgreSQL](https://www.postgresql.org/)
- Payment Integration: [Stripe](https://stripe.com/)
- Frontend: HTML, CSS, JavaScript

## Contributors

- [Mohamed Elbalshy](https://github.com/mohamedelbalshy) - Project Lead & Developer


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
