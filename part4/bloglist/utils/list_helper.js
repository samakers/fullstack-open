// Load the full build.
const _ = require("lodash");

// function that receives an array of blog posts as a parameter and always returns the value 1.
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  return total;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    // If the array is empty, return an empty object
    return {};
  }

  const favorite = blogs.reduce((maxLikesBlog, currentBlog) => {
    // Compare the current blog's likes with the likes of the current maximum likes blog
    if (currentBlog.likes > maxLikesBlog.likes) {
      // If the current blog has more likes, update the maximum likes blog
      return currentBlog;
    } else {
      // Otherwise, keep the current maximum likes blog
      return maxLikesBlog;
    }
  });

  // Return the favorite blog in the desired format
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  // First, use _.groupBy() to group the blogs by author
  const blogsByAuthor = _.groupBy(blogs, "author");

  // Next, use _.maxBy() to find the author with the largest number of blogs
  const topAuthor = _.maxBy(
    Object.keys(blogsByAuthor),
    (author) => blogsByAuthor[author].length
  );

  // Return the result in the specified format
  return {
    author: topAuthor,
    blogs: blogsByAuthor[topAuthor].length,
  };
};

const mostLikes = (blogs) => {
  const likesByAuthor = _.groupBy(blogs, "author");

  // Calculate the total likes for each author
  const authorsWithLikes = Object.keys(likesByAuthor).map((author) => {
    return {
      author,
      likes: totalLikes(likesByAuthor[author]), // Using the previously defined totalLikes function
    };
  });

  // Find the author with the most likes
  const topAuthor = _.maxBy(authorsWithLikes, (author) => author.likes);

  return {
    author: topAuthor.author,
    likes: topAuthor.likes,
  };
};


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
