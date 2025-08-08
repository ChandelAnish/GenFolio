# Server Module Development Notes 🐍

For this server module, the below are the important details, notes of some libraries, functions used and how some errors were debugged which I think should be referred for better understanding of this server module.

## 🔧 Python Sets vs Dictionaries

### The Problem
```python
return {updatedHeroData}  # updatedHeroData is python dict
```

**Issue**: `{updatedHeroData}` is not a dictionary, it is a **set** instead.

### Why This Happens
- You're trying to return a set containing a dictionary (`updatedHeroData` appears to be a dictionary)
- In Python, dictionaries are **mutable** and therefore can't be used as elements in a set or as keys in another dictionary since they're **unhashable**
- Set items are **unordered**, **unchangeable**, and **do not allow duplicate values**

---

## 🤖 Understanding Token Limits

### max_tokens Configuration
```
🤖 max_tokens=4096 in your code
```
That setting limits how many tokens the model can generate in its response, even if the model supports more.

### Token Capacity Breakdown
```
🧠 Model token capacity vs max_tokens
```
- **Model capacity** (like 32,768 for llama-3.3-70b-versatile) = max total tokens for input + output
- **max_tokens=4096** = you're allowing the model to generate up to 4096 output tokens, even if it could generate more

---

## 📦 Package Management with pip

### Essential Commands

#### Freeze Dependencies
```bash
pip freeze
```
Outputs a list of all installed Python packages in your current environment along with their versions.

#### Save to Requirements File
```bash
pip freeze > requirements.txt
```
Saves the list of all installed Python packages in the `requirements.txt` file.

---

## 🎭 Poetry: Modern Python Package Management

### Creating a New Project
```bash
poetry new hello
```
Generates a new basic Python project called `hello` with a ready-to-use folder structure:

```
hello/                   ← project root
├── hello/
│   └── __init__.py      ← Python package, same name as project (your code goes here)
├── tests/
│   └── __init__.py      ← Test folder (empty, ready for unit tests)
├── pyproject.toml       ← Like package.json (defines dependencies & project info)
└── README.rst           ← A basic README file
```

## 🚀 Important Poetry Commands

### Initialize Poetry in Existing Project

#### Interactive Setup
```bash
poetry init
```
- Asks you questions about project name, version, dependencies, etc.
- You can press Enter to accept defaults
- At the end, it generates a `pyproject.toml` file

#### Skip Questions
```bash
poetry init --no-interaction
```
Skip questions and generate directly.

### Managing Dependencies

#### Install from Requirements
```bash
poetry add $(pip freeze)
```
If you already have a `requirements.txt` file.

#### Add Dependencies Manually
```bash
poetry add fastapi uvicorn
```

#### Add Development Dependencies
```bash
poetry add --dev black pytest
```
For dev dependencies (e.g., black, pytest).

### What does `poetry add fastapi uvicorn` do?
- Add fastapi and uvicorn as dependencies to your project
- Automatically install them into your virtual environment
- Update `pyproject.toml` with the packages under `[tool.poetry.dependencies]`
- Update `poetry.lock` to lock the exact versions

## 🌐 Virtual Environment Management

### Poetry's Virtual Environment Strategy
Poetry creates and manages a virtual environment automatically, but stores it outside your project folder by default — in a centralized location:

- **Default location**: `C:\Users\<YourUsername>\AppData\Local\pypoetry\Cache\virtualenvs\`
- **Naming pattern**: `projectname-<random-hash>`
- **Example**: `C:\Users\chand\AppData\Local\pypoetry\Cache\virtualenvs\genfolio-server-KF92Ddlm-py3.11\`

### Check Virtual Environment Path
```bash
poetry env info --path
```
Run this command inside your project directory.

### Create .venv in Project Directory
```bash
poetry config virtualenvs.in-project true
```
If you want the virtual environment to be created inside your project directory (like `.venv/`).

### Environment Commands

#### Remove Virtual Environment
```bash
poetry env remove python
```
Removes the virtual environment associated with your current project.

#### Activate Environment
```bash
poetry shell
```
- Opens a shell inside the virtual environment
- You'll see your prompt change like: `(server-MEZzi639-py3.13) PS C:\Users\chand\Desktop\server>`
- Now any Python or pip commands will use the Poetry environment

#### Get Environment Info
```bash
poetry env info
```
Get detailed environment info.

#### List Environments
```bash
poetry env list
```
Check available environments.

#### Deactivate Environment
```bash
exit
```
Deactivate the virtual environment.

### Dependency Management Commands

#### Update Dependencies
```bash
poetry update
```
Updates your installed dependencies to the latest versions allowed by your `pyproject.toml` version rules.

#### Regenerate Lock File
```bash
poetry lock
```
Regenerates the `poetry.lock` file based on your current `pyproject.toml`.

## ✅ Best Practices: poetry add vs pip install

### ✅ Recommended: Use `poetry add fastapi`

`poetry add fastapi` does 3 things:
- ✅ Installs fastapi in the current Poetry-managed virtual environment
- ✅ Adds it to your `pyproject.toml` under `[tool.poetry.dependencies]`
- ✅ Locks it in `poetry.lock` to ensure consistent installs across environments

### ⚠️ What happens if you use `pip install fastapi`?

```bash
poetry shell
pip install fastapi
```

- ✅ It does install FastAPI inside the virtual environment
- ❌ But it does NOT update your `pyproject.toml` or `poetry.lock`
- So your dependency tracking becomes incomplete and harder to reproduce

**💡 Always use `poetry add`, even inside the poetry shell. It keeps your project clean, trackable, and easy to reinstall.**

### Install All Dependencies
```bash
poetry install
```
If you already have a `pyproject.toml` file in your project (created by Poetry), you can install all the dependencies listed using this command.

✅ This will install all dependencies exactly as listed in the lock file.

---

## 📦 Package Mode in Poetry

### ✅ Package Mode = ON (default)
Poetry treats your project like a real Python package — something you could publish or reuse elsewhere.

**It expects:**
- `pyproject.toml` with:
  - name
  - version
  - readme
- A package folder (like `my_project/`)
- Your code to be installable via `import my_project`

🔁 Think of it like you're building your own version of pandas, sqlmodel, or numpy.

### 💡 Package Mode = OFF
Poetry only installs dependencies, and does not treat your code as a package.

- Your code won't be installed into the virtual environment
- You can still run your scripts like `python main.py`
- You don't need to write a README.md or make your project "publishable"

🛠 **This is perfect for:**
- FastAPI apps
- Scripts
- Small internal tools

### ✅ Summary Table

| Feature | Package Mode ON | Package Mode OFF (package-mode = false) |
|---------|----------------|------------------------------------------|
| Installs your project as a package | ✅ Yes | ❌ No |
| Requires README.md, name, etc | ✅ Yes | ❌ No |
| Use import my_project | ✅ Yes | ❌ No (use relative imports) |
| Good for building libraries | ✅ Yes | ❌ Not needed |
| Good for apps/scripts | ⚠️ Overkill | ✅ Yes |
| Command | `poetry install` | `poetry install` or `poetry install --no-root` |

### 🛠️ How to Turn Package Mode OFF
In your `pyproject.toml`, set:

```toml
[tool.poetry]
name = "myapp"
version = "0.1.0"
package-mode = false
```

Now Poetry won't expect a README, won't install your project as a package, and just installs dependencies.

## ✅ Understanding --no-root in Poetry

`--no-root` tells Poetry: "Don't install my own project as a package — just install the dependencies listed in pyproject.toml."

### When you run: `poetry install`

Poetry does two things:
1. Installs the dependencies from `pyproject.toml`
2. Installs your own project as a package (called the "root" package)

But if you're not building a library or package (just writing scripts or a FastAPI app), installing your own project isn't needed. So you can skip it with:

```bash
poetry install --no-root
```

---

## 🧠 Understanding PEP 621

### What is PEP 621?
Think of PEP 621 as a universal rulebook that says:

*"Here's the standard way to describe a Python project (its name, version, dependencies, etc.) in pyproject.toml — so all Python tools (like pip, build, flit, etc.) can understand it."*

It uses the `[project]` section like this:

```toml
[project]
name = "myapp"
version = "0.1.0"
dependencies = [
    "sqlmodel"
]
```

- ✅ Good for standardization
- ❌ But limited — It does not support Poetry-only features like `package-mode = false`

### 🛠 What is the Poetry-specific section?
Poetry has its own section called: `[tool.poetry]`

This is where Poetry puts its extra features — like:
- `package-mode = false`
- `[tool.poetry.dependencies]`
- `[tool.poetry.scripts]`

Think of it as: *"Poetry's personal control panel."*

### 📦 Why do you need the Poetry section?
- Because if you want to use Poetry-specific features (like turning off packaging), you must use `[tool.poetry]`
- The `[project]` section (from PEP 621) is standard, but it doesn't know about Poetry's extra options

### 🎯 Simple Analogy

| Thing | Like... |
|-------|---------|
| `[project]` (PEP 621) | A general form used by everyone |
| `[tool.poetry]` | A custom Poetry-only form with bonuses |

If you want the extra features Poetry gives, like:
- `package-mode = false`
- `poetry add` working smoothly
- Project not treated like a package

👉 **You need `[tool.poetry]`**

### ✅ Summary

| Feature | `[project]` (PEP 621) | `[tool.poetry]` |
|---------|----------------------|-----------------|
| Standard across Python tools | ✅ Yes | ❌ No |
| Works with Poetry features | ❌ No | ✅ Yes |
| Supports `package-mode = false` | ❌ No | ✅ Yes |
| Best for apps/scripts with no packaging | ❌ Limited | ✅ Recommended |

---

## 🗂️ Git Repository Best Practices

### What to Keep in Git?

| File/Folder | Keep in Git? | Why |
|-------------|--------------|-----|
| `pyproject.toml` | ✅ Yes | This is like `package.json` — defines your project & deps |
| `poetry.lock` | ✅ Yes | Ensures consistent dependency versions across machines |
| `.venv/` | ❌ No | Virtual environment — machine-specific and large |
| `.python-version` *(if present)* | ❌ Optional | If you use `pyenv`, ignore this unless team needs it |

---

*This guide covers essential Python development concepts, Poetry package management, and best practices for modern Python projects. Keep it handy for quick reference!* 🚀