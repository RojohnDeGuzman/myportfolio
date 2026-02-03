# Push this project to GitHub

Your project is already committed locally. Follow these steps to put it on GitHub.

---

## 1. Create a new repository on GitHub

1. Go to **https://github.com/new**
2. **Repository name:** `myportfolio` (or any name you like)
3. **Description:** optional (e.g. "Personal portfolio – React, Vite, TypeScript")
4. Choose **Public**
5. **Do not** check "Add a README", "Add .gitignore", or "Choose a license" (this project already has them)
6. Click **Create repository**

---

## 2. Add the remote and push

GitHub will show you commands. Use these from your project folder (`c:\Users\rodeguzman\myportfolio`).

```powershell
cd c:\Users\rodeguzman\myportfolio

git remote add origin https://github.com/RojohnDeGuzman/myportfolio.git

git branch -M main

git push -u origin main
```

If your repo name is different on GitHub, change `myportfolio` in the URL to match.

---

## 3. (Optional) Use SSH instead of HTTPS

If you use SSH keys with GitHub:

```powershell
git remote add origin git@github.com:RojohnDeGuzman/myportfolio.git
git branch -M main
git push -u origin main
```

---

After the first push, you can use `git push` for future updates.
