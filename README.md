# Requirements 📝

App for real-time managing event check-ins.

## Core Features 🎯

### Event Selector

- Dropdown displaying event names from the communities collection.
- If a event changes, change the registered people from event.
- Default placeholder text: "Select an event".

### Registered People List

- Fetched from the people collection.
- Displayed information includes:
  - Full name (first + last name)
  - Company name
  - Job title
  - Check-in date (MM/DD/YYYY, HH:mm or N/A)
  - Check-out date (MM/DD/YYYY, HH:mm or N/A)
- Action buttons:
  - Check-in {person name}
  - Check-out {person name} (appears 5 seconds after check-in)

### Event Summary

- Current number of attendees.
- Company-wise breakdown of current attendees.
- Number of people not yet checked in.

### Real-Time Updates ⚡

The page must update dynamically in real time without requiring a page refresh.

# How to Run the Project 🚀

## Using Docker

1. Make sure you have Docker installed on your machine.  
2. Use the command in the terminal: `docker build -t event-check-app .`  
3. Use the command in the terminal: `docker run -p 3000:3000 event-check-app`  

## Opening the project via terminal  

1. `npm install -g meteor`  
2. `meteor npm install`  
3. `meteor`  