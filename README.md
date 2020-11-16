# MERN Stack Front to Back Udemy Course

## Setup

1. Create _.gitignore_ and type _node_modules_
2. Run

```bash
npm init
```

3. Install dependencies

```bash
npm install --save express express-validator bcryptjs config gravatar jsonwebtoken mongoose request body-parser
```

_body-parser_ is no longer needed, as it comes together with latest version of express. Just call:

```javascript
app.use(express.json({ extended: false }));
```

4. Install Dev dependencies (Optional)

```bash
npm install -D nodemon
```
