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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
