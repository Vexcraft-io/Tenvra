# GitHub Projects Kanban Setup Guide for Tenvra

This guide walks you through setting up a GitHub Projects (v2) Kanban board for the Tenvra repository.

## Prerequisites

- GitHub account with write access to `Vexcraft-io/Tenvra`
- Existing issues #12-16 created in the repository

---

## Step 1: Create the Project Board

1. Navigate to the Tenvra repository: https://github.com/Vexcraft-io/Tenvra
2. Click on the **Projects** tab (top navigation bar)
3. Click **Link a project** → **New project**
4. Select **Board** template (Kanban-style)
5. Name the project: `Tenvra Development`
6. Click **Create project**

> **Note:** GitHub Projects v2 uses a spreadsheet-style interface. The Board view provides the Kanban functionality.

---

## Step 2: Configure Board Columns

Set up the following columns to track work through your development workflow:

| Column          | Purpose                                          |
| --------------- | ------------------------------------------------ |
| **Backlog**     | New ideas, future work, untriaged issues         |
| **Ready**       | Prioritized, ready to start (clear requirements) |
| **In Progress** | Actively being worked on                         |
| **In Review**   | Pull request opened, awaiting review             |
| **Done**        | Completed and merged                             |

### How to Add Columns:

1. In your Project Board, click **⋮** (three dots) → **Board settings**
2. Under **Status** field, click **Edit**
3. Add each column name as a status option
4. Save changes

---

## Step 3: Configure Essential Fields

Enable the following fields for rich issue tracking:

| Field         | Type          | Purpose                                          |
| ------------- | ------------- | ------------------------------------------------ |
| **Status**    | Single Select | Tracks column position (Backlog → Done)          |
| **Priority**  | Single Select | P0 (Critical), P1 (High), P2 (Medium), P3 (Low)  |
| **Size**      | Single Select | XS, S, M, L, XL (effort estimation)              |
| **Iteration** | Iteration     | Sprint/cycle tracking (e.g., Sprint 1, Sprint 2) |
| **Assignee**  | People        | Who is working on the item                       |
| **Labels**    | Labels        | GitHub labels (bug, enhancement, etc.)           |

### How to Add Fields:

1. In Project view, click **⋮** → **Board settings**
2. Under **Fields**, click **Add field**
3. Select field type and configure options
4. Repeat for each field above

---

## Step 4: Set Up Automation Rules

Automate workflow transitions to reduce manual updates.

### Recommended Automation Rules:

| Trigger              | Action                |
| -------------------- | --------------------- |
| When issue is opened | Move to **Backlog**   |
| When PR is opened    | Move to **In Review** |
| When PR is merged    | Move to **Done**      |
| When issue is closed | Move to **Done**      |

### How to Configure Automation:

1. In Project view, click **⋮** → **Automations**
2. Click **New automation rule**
3. Configure trigger and action:
   - **Trigger:** `Pull request opened`
   - **Action:** `Move item to status` → `In Review`
4. Click **Save**
5. Repeat for each rule above

---

## Step 5: Create Custom Views

Set up different views for different stakeholders.

### View 1: Developer View

**Purpose:** Daily standup and task management for developers

**Configuration:**

- **Layout:** Board
- **Group by:** Status
- **Filter:** `Assignee: @me OR Assignee: none`
- **Sort:** Priority (descending), then Created (ascending)
- **Visible fields:** Status, Priority, Size, Assignee, Labels

### View 2: Management View

**Purpose:** High-level progress tracking for stakeholders

**Configuration:**

- **Layout:** Board
- **Group by:** Status
- **Filter:** None (show all items)
- **Sort:** Priority (descending)
- **Visible fields:** Status, Priority, Assignee, Labels
- **Hide:** Size, Iteration (reduce clutter)

### View 3: Roadmap View

**Purpose:** Long-term planning and iteration tracking

**Configuration:**

- **Layout:** Roadmap (timeline view)
- **Group by:** Iteration
- **Filter:** None
- **Sort:** Iteration (ascending)
- **Visible fields:** Status, Iteration, Priority, Assignee

### How to Create Views:

1. In Project view, click **Views** dropdown (top left)
2. Click **+ Add view**
3. Name the view (e.g., "Developer View")
4. Configure layout, grouping, filters, and fields
5. Click **Save**

---

## Step 6: Link Existing Issues

Add the following issues to your project board:

| Issue # | Title           | Initial Status |
| ------- | --------------- | -------------- |
| #12     | (Link to issue) | Backlog        |
| #13     | (Link to issue) | Backlog        |
| #14     | (Link to issue) | Backlog        |
| #15     | (Link to issue) | Backlog        |
| #16     | (Link to issue) | Backlog        |

### How to Add Issues to Project:

**Method 1 - From Issue Page:**

1. Open the issue (e.g., https://github.com/Vexcraft-io/Tenvra/issues/12)
2. In the right sidebar, under **Projects**, click **Add to project**
3. Select `Tenvra Development`
4. Set initial status to **Backlog**

**Method 2 - From Project Board:**

1. In Project Board, click **Add item** (top right)
2. Type `#12` and select the issue
3. Set status to **Backlog**

---

## Quick Reference

### Project Board URL

Once created, your board will be accessible at:

```
https://github.com/orgs/Vexcraft-io/projects/<PROJECT_NUMBER>
```

or from the repo:

```
https://github.com/Vexcraft-io/Tenvra/projects/<PROJECT_NUMBER>
```

### Keyboard Shortcuts

- `b` - Switch to Board view
- `t` - Switch to Table view
- `r` - Switch to Roadmap view
- `/` - Focus search

### Best Practices

- Update issue status daily during standup
- Use Priority field to guide what to work on next
- Keep Backlog groomed (remove stale items, refine estimates)
- Review automation rules monthly to ensure they still match workflow

---

## Troubleshooting

| Issue                       | Solution                                                          |
| --------------------------- | ----------------------------------------------------------------- |
| Can't see Projects tab      | Ensure you have write access to the repository                    |
| Automation not triggering   | Check that the rule is enabled and trigger conditions match       |
| Fields not showing          | Add fields in Board settings, then customize view to display them |
| Can't add issues to project | Issues must exist before adding to project                        |

---

## Additional Resources

- [GitHub Projects Documentation](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
- [GitHub Projects v2 Features](https://github.blog/changelog/2022-06-23-issues-are-now-available-in-projects/)
- [Automation Rules Reference](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/using-the-built-in-automations)

---

_Document created for Tenvra project setup - Vexcraft-io/Tenvra_
