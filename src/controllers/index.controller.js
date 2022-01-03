const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "123456",
  database: "nodeblog",
  //default port 5432
  port: 5432,
});

// const getUsers = async (req, res) => {
//   const response = await pool.query('SELECT * FROM users')
//   res.status(200)
//   res.json(response.rows)
// }

// const createUsers = async (req, res) => {
//   const {name, email} = req.body
//   const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email])
//   res.json({
//     msg: 'user created',
//     body: {
//       user: {name, email},

//     }
//   })
// }

// const getUserById = async (req, res) => {
//   const id = req.params.id
//   const response = await pool.query('select * from users where id = $1', [id])
//   res.json(response.rows)
// }

// const deleteUser = async (req, res) => {
//   const id = req.params.id
//   const response = await pool.query('DELETE FROM users WHERE id = $1', [id])
//   res.json({msg: 'user deleted'})
// }

// const editUser = async(req, res) => {
//   const id = req.params.id
//   const {name, email} = req.body

//   const response = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id])

//   res.json({msg: 'user updated successfully'})

// }

const getPosts = async (req, res) => {
  const response = await pool.query("SELECT * FROM posts");
  const posts = response.rows;
  res.render("./posts/index.pug", { title: "POSTS", posts });
};

const getCreatePostForm = (req, res) => {
  res.render("./posts/create.pug", {title: 'CREATE', method: 'POST', action: '/create-post'});
};

const createPost = async (req, res) => {
  const { title, content } = req.body;
  let date = new Date().toISOString();
  const post = {
    title,
    content,
    date,
  };
  const response = await pool.query(
    "INSERT INTO posts (title, content, date) VALUES ($1, $2, $3)",
    [title, content, date]
  );
  res.redirect("/posts");
};

const getPost = async (req, res) => {
  const id = req.params.id
  const response = await pool.query('SELECT * FROM posts WHERE id = $1', [id])
  const post = response.rows[0]
  const date = post.date.toLocaleDateString()
  console.log(post)
  res.render(`./posts/post.pug`, {post, date})
}

const deletePost = async (req, res) => {
  const id = req.params.id
  const response = await pool.query('DELETE FROM posts WHERE id = $1', [id])
}

const editPost = async (req, res) => {
  const id = req.params.id
  const {title, content, image_url} = req.body
  const response = await pool.query('UPDATE posts SET title = $1, content = $2, image_url = $3 WHERE id = $4', [title, content, image_url, id])

  res.redirect(`/posts/${id}`)

}

const getEditPostForm = async (req, res) => {
  const id = req.params.id
  res.render("./posts/create.pug", {title: 'EDIT', method: 'PUT', action: `/posts/${id}`});
}


module.exports = {
  getPosts,
  getCreatePostForm,
  createPost,
  getPost,
  deletePost,
  editPost,
  getEditPostForm
};
