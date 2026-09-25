---
title: "TableTap — Real-Time Restaurant Ordering Platform"
tags: ["project", "React", "Node.js", "Express.js", "PostgreSQL", "WebSockets"]
---

# TableTap

TableTap is Sujib Shrestha's QR-based restaurant ordering platform. Customers scan a table's QR code to browse the menu, place orders, and pay from their phones. Orders synchronize with the kitchen through WebSockets.

## Problem and approach

TableTap digitizes menu browsing and order delivery to the kitchen, addressing the delays and miscommunication associated with paper menus and manual order relay.

## Features and implementation

- Real-time order synchronization between customers, waiters, and kitchen staff using WebSockets.
- Dedicated dashboards for waiters, kitchen staff, cashiers, and administrators, each with scoped permissions and views of live order state.
- QR code generation for individual tables.
- Sales analytics and profit tracking, including revenue aggregation by item, table, and shift.
- PostgreSQL schemas for menus, tables, orders, and payments, with relational integrity across multi-table transactions.
- JWT authentication and role-based access control for staff routes and data.

Technology stack: React, Node.js, Express.js, PostgreSQL, and WebSockets.

Repository: https://github.com/SujibShrestha/TableTap

