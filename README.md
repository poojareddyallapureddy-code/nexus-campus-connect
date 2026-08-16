# Nexus- Campus-Connect

Build a complete, polished, interactive frontend web application called "Nexus".

==================================================

APP IDENTITY

==================================================

APP NAME:

Nexus

TAGLINE:

"Stay in the loop. Stay connected."

CORE CONCEPT:

Nexus is a centralized student opportunity and resource platform.

It helps college students:

1. DISCOVER opportunities and important information

2. CONNECT with students, teammates, clubs, mentors and experts

3. UTILIZE resources and expertise available inside and outside the college

4. ACT on opportunities instead of simply receiving notifications

Nexus should NOT feel like a basic notification app.

It should feel like a complete student ecosystem where information leads to action.

Example:

Opportunity → Student → Team → Resource → Action

==================================================

COLOR PALETTE

==================================================

Use a dark premium technology theme.

PRIMARY:

Deep Navy / Midnight

#0B1020

SECONDARY:

Dark Blue

#111A2E

ACCENT:

Electric Indigo

#6366F1

SECONDARY ACCENT:

Cyan

#22D3EE

PRIMARY TEXT:

Soft White

#F8FAFC

SECONDARY TEXT:

Slate

#94A3B8

CARD BACKGROUND:

#151E32

STATUS COLORS:

Success: Green

Warning: Amber

Urgent/Error: Red

Use the colors consistently throughout the application.

The overall visual ratio should be approximately:

80% dark backgrounds/cards

15% white/slate text

5% indigo/cyan accents

Do not make the entire interface neon.

Use subtle indigo/cyan gradients and glows only where appropriate.

The interface should feel:

- Premium

- Modern

- Professional

- Futuristic

- Clean

- Student-focused

- Tech-oriented

Avoid making it look like a gaming website.

==================================================

IMPORTANT — THIS MUST BE A REAL INTERACTIVE FRONTEND

==================================================

This is a frontend prototype for a live demonstration.

DO NOT create a static UI mockup.

Every important button, card, navigation item, filter, tab and interactive element must actually work on the frontend.

Use mock data and local state.

No backend, database, authentication system or real API is required at this stage.

However, simulate realistic functionality using frontend state.

When a user clicks something:

- The selected navigation item should become highlighted.

- The relevant page/section should open.

- Cards should open detailed views.

- Buttons should trigger appropriate frontend interactions.

- Filters should actually filter displayed content.

- Search should return matching mock data.

- Save buttons should change state.

- Reminder buttons should add items to reminders.

- Dismiss buttons should remove reminders.

- Forms should accept input and show a success state.

- Tabs should switch content.

- Back buttons should return to the previous relevant screen.

- Modals/drawers should open and close properly.

- Dropdowns should work.

- Notifications should open their relevant content.

Do not leave major buttons as dead/non-functional buttons.

==================================================

GLOBAL NAVIGATION

==================================================

Create a persistent sidebar on desktop and responsive navigation on mobile.

Sidebar should contain:

Nexus logo

"Stay in the loop. Stay connected."

Navigation:

Home

Discover

Academic Updates

Clubs

Teams

Resources

Experts & Mentors

R&D / Innovation

Certifications

My Activity

At the bottom:

Notifications

Profile

Settings

When the user clicks a navigation item:

1. It must become visually highlighted using Electric Indigo.

2. The corresponding page must open.

3. The active navigation state must remain visible.

Use smooth transitions between pages.

==================================================

LANDING PAGE

==================================================

Create a premium dark landing page.

Hero:

Nexus

"Stay in the loop. Stay connected."

Supporting text:

"One platform to discover opportunities, connect with the right people, and make better use of the resources around you."

Buttons:

[Explore Nexus]

[See How It Works]

"Explore Nexus" should open the main dashboard.

"See How It Works" should scroll/open a section explaining:

DISCOVER → CONNECT → UTILIZE → ACT

Create four feature cards:

DISCOVER

Find opportunities beyond the classroom.

CONNECT

Find students, teammates, mentors and clubs.

UTILIZE

Make use of expertise and resources already available.

ACT

Turn information into participation and results.

Add a subtle visual flow:

Opportunity → Student → Team → Resource → Action

==================================================

LOGIN / DEMO ENTRY

==================================================

Since this is a frontend prototype, do not require real authentication.

Create a simple demo entry screen.

Button:

"Continue as Student"

Clicking it should open the dashboard immediately.

Use a sample student:

Name: Aarav Sharma

Branch: CSE - AIML

Year: 2nd Year

==================================================

HOME DASHBOARD

==================================================

Dashboard header:

"Good morning, Aarav 👋"

"Stay in the loop. Stay connected."

Add a universal search bar:

"Search opportunities, clubs, people, resources..."

Search should actually filter/search the mock data.

Add quick action buttons:

Find Opportunities

Find Teammates

Share an Opportunity

Ask for Guidance

Submit an Idea

Each button must open the corresponding page/modal.

==================================================

LIVE DEADLINE NEWS TICKER

==================================================

This is a VERY IMPORTANT feature.

Create a prominent section near the top of the dashboard:

🔴 LIVE DEADLINES

It should behave visually like a professional television news-channel breaking-news ticker.

Deadlines should continuously move horizontally from right to left.

Example:

"Google Cloud Certification — Registration closes Aug 12"

"XYZ Hackathon — Team registration closes Aug 15"

"AI Ideathon — Submission deadline Aug 18"

"Project Expo — Registration closes Aug 20"

Requirements:

- Continuous smooth horizontal scrolling

- Pause scrolling when hovered

- Small animated LIVE indicator

- Urgent deadlines should have red/amber indicators

- Clicking a ticker item must open the corresponding opportunity/detail page

- Show deadline date clearly

Urgency categories:

DUE TODAY

DUE TOMORROW

DUE THIS WEEK

UPCOMING

Make this look like a news ticker, NOT a normal card.

==================================================

RECENT REMINDERS

==================================================

Create a prominent "Recent Reminders" section.

Example:

🔔 Hackathon registration closes tomorrow

🔔 Python certification exam on Aug 14

🔔 Team meeting at 6:00 PM

🔔 R&D idea submission deadline in 3 days

🔔 Club registration closes tonight

Organize reminders into:

Today

Tomorrow

This Week

Each reminder should contain:

Icon

Title

Related activity

Date/time

Priority

View button

Dismiss button

"View" should open the relevant detail page.

"Dismiss" should remove the reminder using frontend state.

Add:

[View All Reminders]

which opens the complete reminders page.

Allow opportunities/certifications to add reminders.

When "Add Reminder" is clicked, visually change it to:

✓ Reminder Added

and add the item to Recent Reminders.

==================================================

IMPORTANT UPDATES

==================================================

Create an Important Updates section.

Categories:

Academic

Club

College

Workshop

Event

Each update card:

Title

Category

Date

Source

Description

Deadline if applicable

Button:

[View Details]

Clicking it opens a detailed update view.

==================================================

DISCOVER OPPORTUNITIES

==================================================

Create a complete Opportunities page.

Categories:

All

Hackathons

Ideathons

Project Expos

Competitions

Internships

Research

Workshops

Certifications

Each opportunity card should contain:

Event name

Organizer

Date

Registration deadline

Eligibility

Location

Relevant skills

Short description

Buttons:

[View Details]

[Save]

[Add Reminder]

Interactions:

Save → changes to "Saved ✓"

Add Reminder → adds to reminder list

View Details → opens detailed opportunity page

Create filters that actually work.

Example:

Click "Hackathons"

→ only hackathon opportunities appear.

Click "All"

→ all opportunities appear.

==================================================

OPPORTUNITY DETAILS PAGE

==================================================

When a user clicks an opportunity, open a complete detail page.

Show:

Event name

Organizer

Description

Date

Registration deadline

Eligibility

Location

Skills required

Prize/details

Registration information

Buttons:

[Register]

[Save Opportunity]

[Add Reminder]

[Find Teammates]

Register should show a frontend confirmation state:

"Registration initiated successfully."

Find Teammates should open the Team Finder filtered for that opportunity.

==================================================

TEAM FINDER

==================================================

Create a complete Team Finder page.

Header:

"Find Your Team"

Supporting text:

"Have an opportunity but need the right people?"

Show team requirement posts.

Example:

LOOKING FOR:

Python Developer

EVENT:

XYZ Hackathon

CURRENT TEAM:

2 / 4

SKILLS NEEDED:

Python

UI/UX

DEADLINE:

Aug 20

Buttons:

[View Team]

[Join Team]

Create filters:

Python

Java

C

AI/ML

Web Development

UI/UX

Cloud

Data Science

Cybersecurity

Hardware

Filters must work.

==================================================

CREATE TEAM REQUEST

==================================================

Create a functional form:

Event

Team name

Current team size

Members required

Required skills

Description

Contact preference

Button:

[Post Team Requirement]

After submission show:

"Team requirement posted successfully."

Add the new post to the Team Finder using local state.

==================================================

CAMPUS RESOURCES

==================================================

Create a Resources page.

Title:

"Utilize What Already Exists."

Categories:

Industrial Experts

Faculty Mentors

R&D Cell

Patent Support

Innovation Support

Labs

Clubs

Alumni

Entrepreneurship Support

Each resource card:

Name

Category

Expertise

Description

Availability

Button:

[Explore]

[Request Guidance]

Clicking Explore opens the resource details.

==================================================

EXPERTS & MENTORS

==================================================

Create an Experts & Mentors page.

Cards should show:

Name

Role

Expertise

Experience

Available for

Mentorship

Project Guidance

Career Guidance

Research

Buttons:

[View Profile]

[Request Guidance]

Request Guidance should open a small form/modal:

Reason for request

Message

Preferred time

Button:

[Send Request]

After submission:

"Mentorship request sent successfully."

==================================================

R&D / INNOVATION

==================================================

Create a dedicated R&D / Innovation page.

Hero:

"Have an Idea?"

"Turn your idea into something real."

Show:

Idea

↓

Guidance

↓

Team

↓

Development

↓

Innovation

Create a functional idea submission form:

Idea title

Problem statement

Proposed solution

Domain

Skills required

Support needed

Support options:

Mentor

Team

Research Guidance

Patent Guidance

Technical Support

Button:

[Submit Idea]

After submission:

"Your idea has been submitted to the R&D support pipeline."

Show the submitted idea in "My Activity."

==================================================

CLUB DIRECTORY

==================================================

Create a Clubs page.

Searchable club directory.

Each card:

Club name

Category

President

Faculty Coordinator

Number of members

Upcoming event

Button:

[View Club]

Club details page should contain:

About

Leadership

Members

Events

Announcements

Contact

Buttons:

[Join Club]

[View Events]

Join Club should change to:

✓ Joined

==================================================

CERTIFICATIONS

==================================================

Create a Certifications page.

Cards:

Certification name

Provider

Registration deadline

Exam date

Validity

Difficulty

Relevant skills

Buttons:

[View]

[Set Reminder]

Filters:

AI/ML

Programming

Cloud

Data Science

Cybersecurity

Management

Other

Filters must work.

Set Reminder must update Recent Reminders.

==================================================

ACADEMIC UPDATES

==================================================

Create an Academic Updates page.

Show:

Academic circulars

Exam notifications

Assignment deadlines

Department announcements

Important college notices

Use categories and date filters.

Each item should open a detailed view.

==================================================

MY ACTIVITY

==================================================

Create a complete personal activity dashboard.

Sections:

Saved Opportunities

Registered Events

Upcoming Deadlines

Recent Reminders

Team Requests

Submitted Ideas

Mentorship Requests

Certificates

Show realistic statuses such as:

Saved

Registered

Pending

Completed

Upcoming

Clicking each activity should open its relevant details.

==================================================

NOTIFICATION CENTER

==================================================

Create a notification bell in the top navigation.

Show unread count.

Clicking the bell opens a notification panel.

Categories:

Academic

Clubs

Opportunities

Teams

Deadlines

Mentorship

R&D

Reminders

Clicking a notification opens its related page.

Add:

Mark as Read

Mark All as Read

==================================================

PROFILE

==================================================

Create a student profile.

Show:

Name

Branch

Year

Skills

Interests

Clubs

Projects

Certifications

Achievements

Allow editing profile information.

Create a skills section.

Example:

Java

Python

C

AI/ML

Web Development

DSA

Skills should be used visually in team matching and opportunity cards.

==================================================

UNIVERSAL SEARCH

==================================================

Create a global search.

Search across:

Opportunities

Students

Teams

Clubs

Resources

Experts

Certifications

Academic Updates

When the user types a query, show categorized results.

Example:

Search: "Python"

Results:

Opportunities

Teams

Students with Python skill

Certifications

Experts

==================================================

INTERACTIVE UI REQUIREMENTS

==================================================

Every major interaction must have a visible response.

Examples:

Navigation click

→ active item highlighted

→ correct page opens

Opportunity Save

→ button becomes "Saved ✓"

Add Reminder

→ button becomes "Reminder Added ✓"

→ reminder appears in Recent Reminders

Join Team

→ confirmation message

→ team status updates

Join Club

→ button becomes "Joined ✓"

Submit Idea

→ success message

→ idea appears in My Activity

Send Mentorship Request

→ success message

→ request appears in My Activity

Dismiss Reminder

→ reminder disappears

Search

→ results update

Filters

→ displayed cards update

Tabs

→ content changes

Notifications

→ open relevant information

Back button

→ returns to previous page

==================================================

TOASTS / FEEDBACK

==================================================

Use elegant toast notifications for actions.

Examples:

"Opportunity saved."

"Reminder added."

"Team request posted."

"Idea submitted successfully."

"Mentorship request sent."

"You joined the club."

"Registration initiated."

==================================================

RESPONSIVE DESIGN

==================================================

Desktop:

Persistent sidebar + dashboard.

Tablet:

Collapsible sidebar.

Mobile:

Bottom navigation or hamburger menu.

All cards, forms, ticker and pages must remain usable on mobile.

==================================================

MOCK DATA

==================================================

Populate the application with enough realistic demo data to make every page look complete.

Include:

10+ opportunities

5+ certifications

5+ academic updates

5+ clubs

5+ team requests

5+ experts

5+ resources

5+ reminders

5+ notifications

Use realistic student-oriented examples.

Do not leave empty pages.

==================================================

VISUAL DETAILS

==================================================

Use:

- Dark glassmorphism-inspired cards where appropriate

- Subtle borders

- Soft shadows

- Indigo active states

- Cyan highlights

- Rounded corners

- Smooth hover effects

- Skeleton/loading states where appropriate

- Small status badges

- Progress indicators

- Clean icons

Do not overuse gradients.

Use subtle animations only.

The application must remain professional and easy to understand.

==================================================

FINAL DEMO REQUIREMENT

==================================================

The final application must look and behave like a COMPLETE working frontend product.

A person should be able to open Nexus and demonstrate a realistic journey:

1. Open Nexus

2. Enter as Student

3. See the dashboard

4. See the LIVE DEADLINES ticker

5. See Recent Reminders

6. Click an opportunity

7. Open its full details

8. Save the opportunity

9. Add a reminder

10. Find teammates

11. Filter team members by skill

12. Open a team request

13. Navigate to Resources

14. Open an expert profile

15. Request guidance

16. Navigate to R&D

17. Submit an idea

18. Open My Activity

19. See the submitted idea and reminder

20. Open notifications

21. Search for an opportunity

22. Navigate between pages

All of these interactions should work in the frontend using mock data/local state.

PRIORITY:

FUNCTIONALITY + POLISHED UI + REALISTIC USER FLOW

Do not create a static visual prototype.

Build Nexus as a convincing, interactive frontend demo that could realistically be presented as a student startup/product concept.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d9a6b7fd-635c-4d55-958f-af48ee80f0b8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
