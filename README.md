# Expense Buddy

Expense Buddy is a simple and intuitive expense tracking application designed to help you manage your finances effortlessly. Whether you're tracking personal expenses or managing a budget for a project, Expense Buddy has got you covered.

Our website is hosted on [Expense Buddy](https://expense-buddy-zeta.vercel.app)

## Features

- **Expense Tracking**: Easily log your expenses on the go with clean card representation.
- **Visual Reports**: Gain insights into your spending habits with visual charts and graphs.
- **Multi-Platform**: Access Expense Buddy from your desktop, tablet, or smartphone for convenience.
- **Reminders**: Set reminders for recurring expenses to ensure you never miss a payment.
- **Real-Time Social Interaction**: Communicate with other users by adding them in their friend List.

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB account (for database storage)

### Installation


1. Clone the repository:

   ```bash
   git clone https://github.com/smt96700/CodeSangamProject.git

2. Navigate to the project directory:

   ```bash
   cd CodeSangamProject
   cd backend
   npm i
   npm run dev
   
   cd..
   cd frontend_V
   npm i
   npm run dev

3. Create a .env file in the backend directory having three environment variables :
   PORT, MONGO_URI (your connection string) and a SECRET variable (String for token generation).

4. In the same directory, in server.js file, write your frontend localhost address in the Socket CORS-ORIGIN Field

The application should now be running locally. Visit http://localhost:5173 in your web browser to access Expense Buddy.

## Usage

1. **Create an account or log in if you already have one.**
   - If you're new to Expense Buddy, click on the "Sign Up" button and follow the registration process. If you already have an account, simply log in using your credentials.

2. **Start adding your expenses and categorize them accordingly.**
   - Once logged in, navigate to the "Add Expense" section. Enter the details of your expense, including the amount, category, and any additional notes. This helps in organizing your spending.

3. **Set up budgets and track your spending habits over time.**
   - Visit the "Budgets" section to define monthly or project-based budgets. This feature assists in managing your expenses by providing a clear overview of your financial goals.

4. **Explore visual reports to gain insights into your financial patterns.**
   - Head to the "Reports" or "Analytics" section to view visual representations of your spending patterns. Charts and graphs offer a quick understanding of where your money is going, helping you make informed financial decisions.

## Contributing

If you'd like to contribute to Expense Buddy, we welcome your input! Please follow these steps:

1. **Fork the repository.**
   - Click on the "Fork" button at the top-right corner of the GitHub page to create your copy of the repository.

2. **Create a new branch for your feature:**
   ```bash
   git checkout -b feature-name

